import { useState, useEffect, useCallback, useRef } from 'react';
import { useKeyboard } from './use-keyboard';
import { useNetwork } from './use-network';

// Audio format configurations
export const AUDIO_FORMATS = {
  webm: {
    mimeType: 'audio/webm;codecs=opus',
    extension: '.webm',
    quality: 'high',
    compression: 'excellent',
  },
  mp4: {
    mimeType: 'audio/mp4;codecs=mp4a.40.2',
    extension: '.mp4',
    quality: 'high',
    compression: 'good',
  },
  ogg: {
    mimeType: 'audio/ogg;codecs=opus',
    extension: '.ogg',
    quality: 'high',
    compression: 'excellent',
  },
  wav: {
    mimeType: 'audio/wav',
    extension: '.wav',
    quality: 'highest',
    compression: 'none',
  },
} as const;

// Types
export interface AudioRecorderOptions {
  // Recording configuration
  mimeType?: string;
  audioBitsPerSecond?: number;
  sampleRate?: number;
  channelCount?: 1 | 2;

  // Stream options
  deviceId?: string;
  echoCancellation?: boolean;
  noiseSuppression?: boolean;
  autoGainControl?: boolean;

  // Behavior options
  maxDuration?: number;
  silenceThreshold?: number;
  onDataAvailable?: (chunk: Blob) => void;
  onRecordingComplete?: (audioBlob: Blob) => void;
  onError?: (error: AudioRecorderError) => void;
  onPermissionDenied?: () => void;
}

export interface AudioRecorderState {
  isRecording: boolean;
  isPaused: boolean;
  isSupported: boolean;
  hasPermission: boolean;
  duration: number;
  audioLevel: number;
  recordingSize: number;
  currentDeviceId: string | null;
}

export interface AudioDeviceInfo {
  deviceId: string;
  label: string;
  kind: 'audioinput';
  groupId: string;
}

export interface AudioRecorderError {
  type: 'permission' | 'device' | 'recording' | 'format' | 'network';
  message: string;
  originalError?: Error;
}

export interface UseAudioRecorderReturn {
  // State
  state: AudioRecorderState;
  error: AudioRecorderError | null;

  // Controls
  startRecording: () => Promise<boolean>;
  stopRecording: () => Promise<Blob | null>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  cancelRecording: () => void;

  // Device management
  getAvailableDevices: () => Promise<AudioDeviceInfo[]>;
  switchDevice: (deviceId: string) => Promise<boolean>;

  // Audio data
  audioBlob: Blob | null;
  audioUrl: string | null;
  audioChunks: Blob[];

  // Visualization
  audioLevels: number[];
  waveformData: number[];

  // Utilities
  clearRecording: () => void;
  downloadRecording: (filename?: string) => void;
  getRecordingDuration: () => number;
  formatDuration: (seconds: number) => string;

  // Integration (Epic 40 & 41)
  isNetworkAvailable: boolean;
  networkQuality: 'poor' | 'good' | 'excellent' | 'unknown';
  keyboardShortcuts: Record<string, string>;
  enableKeyboardShortcuts: (enabled: boolean) => void;
}

// Utility functions
const isMediaRecorderSupported = (): boolean => {
  return typeof window !== 'undefined' && 'MediaRecorder' in window;
};

const isMimeTypeSupported = (mimeType: string): boolean => {
  if (!isMediaRecorderSupported()) return false;
  return MediaRecorder.isTypeSupported(mimeType);
};

const getBestSupportedMimeType = (): string => {
  const preferredFormats = [
    AUDIO_FORMATS.webm.mimeType,
    AUDIO_FORMATS.mp4.mimeType,
    AUDIO_FORMATS.ogg.mimeType,
    AUDIO_FORMATS.wav.mimeType,
  ];

  for (const format of preferredFormats) {
    if (isMimeTypeSupported(format)) {
      return format;
    }
  }

  return 'audio/webm'; // fallback
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export function useAudioRecorder(
  options: AudioRecorderOptions = {}
): UseAudioRecorderReturn {
  const {
    mimeType = getBestSupportedMimeType(),
    audioBitsPerSecond = 128000,
    sampleRate = 44100,
    channelCount = 1,
    deviceId,
    echoCancellation = true,
    noiseSuppression = true,
    autoGainControl = true,
    maxDuration = 3600, // 1 hour default
    silenceThreshold = 0.01,
    onDataAvailable,
    onRecordingComplete,
    onError,
    onPermissionDenied,
  } = options;

  // Epic 40 (Keyboard) and Epic 41 (Network) integration
  const keyboard = useKeyboard();
  const network = useNetwork();

  // State
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    isPaused: false,
    isSupported: isMediaRecorderSupported(),
    hasPermission: false,
    duration: 0,
    audioLevel: 0,
    recordingSize: 0,
    currentDeviceId: null,
  });

  const [error, setError] = useState<AudioRecorderError | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [keyboardShortcutsEnabled, setKeyboardShortcutsEnabled] =
    useState(true);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const startTimeRef = useRef<number>(0);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const visualizationRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const keyboardShortcutIds = useRef<string[]>([]);

  // Error handling
  const handleError = useCallback(
    (
      type: AudioRecorderError['type'],
      message: string,
      originalError?: Error
    ) => {
      const audioError: AudioRecorderError = { type, message, originalError };
      setError(audioError);
      onError?.(audioError);
    },
    [onError]
  );

  // Clear previous recording
  const clearRecording = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setAudioChunks([]);
    chunksRef.current = [];
    setState(prev => ({ ...prev, duration: 0, recordingSize: 0 }));
  }, [audioUrl]);

  // Get available audio devices
  const getAvailableDevices = useCallback(async (): Promise<
    AudioDeviceInfo[]
  > => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices
        .filter(device => device.kind === 'audioinput')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Microphone ${device.deviceId.slice(0, 8)}`,
          kind: 'audioinput' as const,
          groupId: device.groupId,
        }));
    } catch (err) {
      handleError('device', 'Failed to enumerate audio devices', err as Error);
      return [];
    }
  }, [handleError]);

  // Initialize audio context and analyser for visualization
  const initializeAudioAnalysis = useCallback(
    (stream: MediaStream) => {
      try {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaStreamSource(stream);

        analyserRef.current.fftSize = 256;
        analyserRef.current.smoothingTimeConstant = 0.8;
        source.connect(analyserRef.current);

        return true;
      } catch (err) {
        handleError(
          'recording',
          'Failed to initialize audio analysis',
          err as Error
        );
        return false;
      }
    },
    [handleError]
  );

  // Update audio visualization
  const updateVisualization = useCallback(() => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Calculate average audio level
    const average =
      dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
    const normalizedLevel = average / 255;

    setState(prev => ({ ...prev, audioLevel: normalizedLevel }));
    setAudioLevels(prev => [...prev.slice(-99), normalizedLevel]); // Keep last 100 levels
    setWaveformData(Array.from(dataArray));
  }, []);

  // Start visualization loop
  const startVisualization = useCallback(() => {
    const animate = () => {
      updateVisualization();
      visualizationRef.current = setTimeout(animate, 100);
    };
    animate();
  }, [updateVisualization]);

  // Stop visualization loop
  const stopVisualization = useCallback(() => {
    if (visualizationRef.current) {
      clearTimeout(visualizationRef.current);
      visualizationRef.current = null;
    }
  }, []);

  // Update recording duration
  const updateDuration = useCallback(() => {
    if (startTimeRef.current > 0) {
      const currentDuration = (Date.now() - startTimeRef.current) / 1000;
      setState(prev => ({ ...prev, duration: currentDuration }));

      // Check max duration
      if (maxDuration && currentDuration >= maxDuration) {
        stopRecording();
      }
    }
  }, [maxDuration]);

  // Start recording
  const startRecording = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);
      clearRecording();

      // Request microphone permission
      const constraints: MediaStreamConstraints = {
        audio: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
          echoCancellation,
          noiseSuppression,
          autoGainControl,
          sampleRate,
          channelCount,
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      // Initialize audio analysis
      initializeAudioAnalysis(stream);

      // Create MediaRecorder
      const recorder = new MediaRecorder(stream, {
        mimeType: isMimeTypeSupported(mimeType)
          ? mimeType
          : getBestSupportedMimeType(),
        audioBitsPerSecond,
      });

      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      // Set up event handlers
      recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
          setAudioChunks(prev => [...prev, event.data]);

          // Calculate recording size
          const totalSize = chunksRef.current.reduce(
            (sum, chunk) => sum + chunk.size,
            0
          );
          setState(prev => ({ ...prev, recordingSize: totalSize }));

          onDataAvailable?.(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setAudioBlob(blob);

        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        onRecordingComplete?.(blob);
      };

      recorder.onerror = event => {
        handleError('recording', 'MediaRecorder error occurred', event.error);
      };

      // Start recording
      recorder.start(100); // Request data every 100ms
      startTimeRef.current = Date.now();

      // Start duration tracking
      durationIntervalRef.current = setInterval(updateDuration, 100);

      // Start visualization
      startVisualization();

      setState(prev => ({
        ...prev,
        isRecording: true,
        isPaused: false,
        hasPermission: true,
        currentDeviceId: deviceId || null,
      }));

      return true;
    } catch (err) {
      if ((err as Error).name === 'NotAllowedError') {
        handleError('permission', 'Microphone permission denied');
        onPermissionDenied?.();
      } else if ((err as Error).name === 'NotFoundError') {
        handleError('device', 'No audio input devices found');
      } else {
        handleError('recording', 'Failed to start recording', err as Error);
      }
      return false;
    }
  }, [
    deviceId,
    echoCancellation,
    noiseSuppression,
    autoGainControl,
    sampleRate,
    channelCount,
    mimeType,
    audioBitsPerSecond,
    clearRecording,
    initializeAudioAnalysis,
    updateDuration,
    startVisualization,
    handleError,
    onDataAvailable,
    onRecordingComplete,
    onPermissionDenied,
  ]);

  // Stop recording
  const stopRecording = useCallback(async (): Promise<Blob | null> => {
    if (!mediaRecorderRef.current) return null;

    return new Promise(resolve => {
      const recorder = mediaRecorderRef.current!;

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        resolve(blob);
      };

      if (recorder.state === 'recording' || recorder.state === 'paused') {
        recorder.stop();
      }

      // Cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }

      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }

      stopVisualization();

      setState(prev => ({
        ...prev,
        isRecording: false,
        isPaused: false,
        audioLevel: 0,
      }));
    });
  }, [mimeType, stopVisualization]);

  // Pause recording
  const pauseRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.pause();
      setState(prev => ({ ...prev, isPaused: true }));
      stopVisualization();
    }
  }, [stopVisualization]);

  // Resume recording
  const resumeRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'paused'
    ) {
      mediaRecorderRef.current.resume();
      setState(prev => ({ ...prev, isPaused: false }));
      startVisualization();
    }
  }, [startVisualization]);

  // Cancel recording
  const cancelRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    clearRecording();
  }, [clearRecording]);

  // Switch audio device
  const switchDevice = useCallback(
    async (newDeviceId: string): Promise<boolean> => {
      const wasRecording = state.isRecording;

      if (wasRecording) {
        await stopRecording();
      }

      setState(prev => ({ ...prev, currentDeviceId: newDeviceId }));

      if (wasRecording) {
        return await startRecording();
      }

      return true;
    },
    [state.isRecording, stopRecording, startRecording]
  );

  // Download recording
  const downloadRecording = useCallback(
    (filename?: string) => {
      if (!audioBlob) return;

      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download =
        filename ||
        `recording-${new Date().toISOString().slice(0, 19)}.${AUDIO_FORMATS.webm.extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [audioBlob]
  );

  // Get recording duration
  const getRecordingDuration = useCallback((): number => {
    return state.duration;
  }, [state.duration]);

  // Format duration
  const formatDuration = useCallback((seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Epic 40: Keyboard shortcuts integration
  const enableKeyboardShortcuts = useCallback((enabled: boolean) => {
    setKeyboardShortcutsEnabled(enabled);
  }, []);

  // Setup keyboard shortcuts
  useEffect(() => {
    if (!keyboardShortcutsEnabled || !keyboard.isSupported) return;

    // Clear existing shortcuts
    keyboardShortcutIds.current.forEach(id => keyboard.removeShortcut(id));
    keyboardShortcutIds.current = [];

    // Add audio recording shortcuts
    const shortcuts = [
      {
        keys: 'Space',
        callback: (event: KeyboardEvent) => {
          event.preventDefault();
          if (state.isRecording) {
            if (state.isPaused) {
              resumeRecording();
            } else {
              pauseRecording();
            }
          } else {
            startRecording();
          }
        },
        preventDefault: true,
        description: 'Toggle recording (start/pause/resume)',
      },
      {
        keys: 'Escape',
        callback: (event: KeyboardEvent) => {
          event.preventDefault();
          if (state.isRecording) {
            stopRecording();
          }
        },
        preventDefault: true,
        description: 'Stop recording',
      },
      {
        keys: '$mod+S',
        callback: (event: KeyboardEvent) => {
          event.preventDefault();
          if (audioBlob) {
            downloadRecording();
          }
        },
        preventDefault: true,
        description: 'Download recording',
      },
      {
        keys: '$mod+Delete',
        callback: (event: KeyboardEvent) => {
          event.preventDefault();
          if (!state.isRecording) {
            clearRecording();
          }
        },
        preventDefault: true,
        description: 'Clear recording',
      },
    ];

    // Register shortcuts and store IDs
    shortcuts.forEach(shortcut => {
      const id = keyboard.addShortcut(shortcut);
      keyboardShortcutIds.current.push(id);
    });

    return () => {
      keyboardShortcutIds.current.forEach(id => keyboard.removeShortcut(id));
      keyboardShortcutIds.current = [];
    };
  }, [
    keyboardShortcutsEnabled,
    keyboard,
    state.isRecording,
    state.isPaused,
    audioBlob,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    downloadRecording,
    clearRecording,
  ]);

  // Epic 41: Network-aware quality adjustment
  useEffect(() => {
    if (!network.isOnline) return;

    // Adjust audio quality based on network conditions
    const suggestedQuality = network.getSuggestedQuality();

    // This could be used to automatically adjust recording settings
    // based on network conditions for optimal upload performance
    if (suggestedQuality === 'low' && audioBitsPerSecond > 64000) {
      // Could adjust bitrate for slow connections
      console.log('Slow network detected - consider reducing audio quality');
    }
  }, [network.isOnline, network.getSuggestedQuality, audioBitsPerSecond]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      stopVisualization();
    };
  }, [audioUrl, stopVisualization]);

  return {
    // State
    state,
    error,

    // Controls
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,

    // Device management
    getAvailableDevices,
    switchDevice,

    // Audio data
    audioBlob,
    audioUrl,
    audioChunks,

    // Visualization
    audioLevels,
    waveformData,

    // Utilities
    clearRecording,
    downloadRecording,
    getRecordingDuration,
    formatDuration,

    // Integration (Epic 40 & 41)
    isNetworkAvailable: network.isOnline,
    networkQuality: network.connectionQuality,
    keyboardShortcuts: {
      Space: 'Toggle recording (start/pause/resume)',
      Escape: 'Stop recording',
      [`${keyboard.modifierKey}+S`]: 'Download recording',
      [`${keyboard.modifierKey}+Delete`]: 'Clear recording',
    },
    enableKeyboardShortcuts,
  };
}
