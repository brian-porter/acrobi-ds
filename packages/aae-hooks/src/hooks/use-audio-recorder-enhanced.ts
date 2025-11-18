/**
 * @fileoverview Advanced AAE Audio Recording Hook (Epic 43)
 * Provides comprehensive audio recording capabilities with MediaRecorder API,
 * real-time visualization, multiple format support, and advanced processing.
 */

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

export type AudioFormat = keyof typeof AUDIO_FORMATS;

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
  visualizationEnabled?: boolean;
  keyboardShortcuts?: boolean;

  // Callbacks
  onDataAvailable?: (chunk: Blob) => void;
  onRecordingComplete?: (audioBlob: Blob) => void;
  onError?: (error: AudioRecorderError) => void;
  onPermissionDenied?: () => void;
  onSilenceDetected?: () => void;
  onVolumeChange?: (level: number) => void;
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
  format: AudioFormat | null;
  quality: 'low' | 'medium' | 'high' | 'highest';
}

export interface AudioDeviceInfo {
  deviceId: string;
  label: string;
  kind: 'audioinput';
  groupId: string;
}

export interface AudioRecorderError {
  type:
    | 'permission'
    | 'device'
    | 'recording'
    | 'format'
    | 'network'
    | 'browser';
  message: string;
  originalError?: Error;
  code?: string;
}

export interface AudioAnalytics {
  peakLevel: number;
  averageLevel: number;
  silenceDuration: number;
  recordingQuality: number;
  compressionRatio: number;
}

export interface AudioEffects {
  echo?: { delay: number; feedback: number; mix: number };
  reverb?: { roomSize: number; damping: number; mix: number };
  distortion?: { amount: number; oversample: OverSampleType };
  filter?: { type: BiquadFilterType; frequency: number; Q: number };
}

export interface AudioMetadata {
  duration: number;
  sampleRate: number;
  channels: number;
  bitRate: number;
  format: string;
  size: number;
  createdAt: Date;
  peakAmplitude: number;
  rmsLevel: number;
}

export interface UseAudioRecorderReturn {
  // State
  state: AudioRecorderState;
  error: AudioRecorderError | null;
  analytics: AudioAnalytics;

  // Controls
  startRecording: () => Promise<boolean>;
  stopRecording: () => Promise<Blob | null>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  cancelRecording: () => void;

  // Device management
  getAvailableDevices: () => Promise<AudioDeviceInfo[]>;
  switchDevice: (deviceId: string) => Promise<boolean>;
  refreshDevices: () => Promise<AudioDeviceInfo[]>;

  // Audio data
  audioBlob: Blob | null;
  audioUrl: string | null;
  audioChunks: Blob[];
  audioBuffer: AudioBuffer | null;

  // Visualization
  audioLevels: number[];
  waveformData: number[];
  frequencyData: Uint8Array;

  // Processing
  applyNoiseReduction: (enabled: boolean) => void;
  setAudioEffects: (effects: AudioEffects) => void;
  trimSilence: () => Promise<Blob | null>;

  // Utilities
  clearRecording: () => void;
  downloadRecording: (filename?: string) => void;
  getRecordingDuration: () => number;
  formatDuration: (seconds: number) => string;
  exportAs: (format: AudioFormat) => Promise<Blob | null>;

  // Integration
  isNetworkAvailable: boolean;
  keyboardShortcuts: Record<string, string>;

  // Advanced features
  getAudioMetadata: () => AudioMetadata;
  compressAudio: (quality: number) => Promise<Blob | null>;
  splitRecording: (intervals: number[]) => Promise<Blob[]>;
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

/**
 * Advanced AAE Audio Recording Hook
 * Provides comprehensive audio recording with real-time processing and visualization
 */
export function useAudioRecorder(
  options: AudioRecorderOptions = {}
): UseAudioRecorderReturn {
  const {
    mimeType = getBestSupportedMimeType(),
    audioBitsPerSecond = 128000,
    sampleRate = 44100,
    channelCount = 2,
    deviceId,
    echoCancellation = true,
    noiseSuppression = true,
    autoGainControl = true,
    maxDuration = 3600, // 1 hour
    silenceThreshold = 0.01,
    visualizationEnabled = true,
    keyboardShortcuts = true,
    onDataAvailable,
    onRecordingComplete,
    onError,
    onPermissionDenied,
    onSilenceDetected,
    onVolumeChange,
  } = options;

  // Dependencies
  const { isOnline } = useNetwork();
  const keyboard = useKeyboard();

  // Core state
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    isPaused: false,
    isSupported: typeof MediaRecorder !== 'undefined',
    hasPermission: false,
    duration: 0,
    audioLevel: 0,
    recordingSize: 0,
    currentDeviceId: null,
    format: null,
    quality: 'high',
  });

  const [error, setError] = useState<AudioRecorderError | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [frequencyData, setFrequencyData] = useState<Uint8Array>(
    new Uint8Array(256)
  );
  const [analytics, setAnalytics] = useState<AudioAnalytics>({
    peakLevel: 0,
    averageLevel: 0,
    silenceDuration: 0,
    recordingQuality: 0,
    compressionRatio: 0,
  });

  // Audio effects state
  const [audioEffects, setAudioEffects] = useState<AudioEffects>({});
  const [noiseReductionEnabled, setNoiseReductionEnabled] = useState(false);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const durationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const visualizationFrameRef = useRef<number | null>(null);
  const effectsChainRef = useRef<AudioNode[]>([]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
      durationTimerRef.current = null;
    }

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    if (visualizationFrameRef.current) {
      cancelAnimationFrame(visualizationFrameRef.current);
      visualizationFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current?.state !== 'closed') {
      audioContextRef.current?.close();
      audioContextRef.current = null;
    }

    mediaRecorderRef.current = null;
    analyserRef.current = null;
    sourceRef.current = null;
    processorRef.current = null;
  }, []);

  // Error handler
  const handleError = useCallback(
    (
      errorType: AudioRecorderError['type'],
      message: string,
      originalError?: Error
    ) => {
      const audioError: AudioRecorderError = {
        type: errorType,
        message,
        originalError,
        code: originalError?.name,
      };

      setError(audioError);
      onError?.(audioError);

      if (errorType === 'permission') {
        onPermissionDenied?.();
      }
    },
    [onError, onPermissionDenied]
  );

  // Initialize audio context and analyser
  const initializeAudioContext = useCallback(
    async (stream: MediaStream) => {
      try {
        audioContextRef.current = new AudioContext({ sampleRate });
        analyserRef.current = audioContextRef.current.createAnalyser();
        sourceRef.current =
          audioContextRef.current.createMediaStreamSource(stream);

        // Configure analyser
        analyserRef.current.fftSize = 512;
        analyserRef.current.smoothingTimeConstant = 0.8;

        // Create processor for real-time analysis
        processorRef.current = audioContextRef.current.createScriptProcessor(
          1024,
          channelCount,
          channelCount
        );

        // Connect audio nodes
        sourceRef.current.connect(analyserRef.current);

        if (visualizationEnabled) {
          analyserRef.current.connect(processorRef.current);
          processorRef.current.connect(audioContextRef.current.destination);
        }

        return true;
      } catch (err) {
        handleError(
          'recording',
          'Failed to initialize audio context',
          err as Error
        );
        return false;
      }
    },
    [sampleRate, channelCount, visualizationEnabled, handleError]
  );

  // Audio visualization and analysis
  const updateVisualization = useCallback(() => {
    if (!analyserRef.current || !state.isRecording) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const timeDataArray = new Uint8Array(bufferLength);

    analyserRef.current.getByteFrequencyData(dataArray);
    analyserRef.current.getByteTimeDomainData(timeDataArray);

    // Calculate audio level
    const sum = dataArray.reduce((acc, value) => acc + value, 0);
    const average = sum / bufferLength;
    const level = average / 255;

    // Update waveform data
    const waveform = Array.from(timeDataArray).map(
      value => (value - 128) / 128
    );

    // Calculate peak level
    const peak = Math.max(...waveform.map(Math.abs));

    setState(prev => ({ ...prev, audioLevel: level }));
    setAudioLevels(prev => [...prev.slice(-99), level]);
    setWaveformData(waveform);
    setFrequencyData(dataArray);

    // Update analytics
    setAnalytics(prev => ({
      ...prev,
      peakLevel: Math.max(prev.peakLevel, peak),
      averageLevel: (prev.averageLevel + level) / 2,
    }));

    // Silence detection
    if (level < silenceThreshold) {
      if (!silenceTimerRef.current) {
        silenceTimerRef.current = setTimeout(() => {
          setAnalytics(prev => ({
            ...prev,
            silenceDuration: prev.silenceDuration + 1,
          }));
          onSilenceDetected?.();
        }, 1000);
      }
    } else {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    }

    onVolumeChange?.(level);

    if (visualizationEnabled && state.isRecording) {
      visualizationFrameRef.current =
        requestAnimationFrame(updateVisualization);
    }
  }, [
    state.isRecording,
    silenceThreshold,
    visualizationEnabled,
    onSilenceDetected,
    onVolumeChange,
  ]);

  // Get available devices
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
          kind: device.kind as 'audioinput',
          groupId: device.groupId,
        }));
    } catch (err) {
      handleError('device', 'Failed to enumerate audio devices', err as Error);
      return [];
    }
  }, [handleError]);

  // Refresh devices
  const refreshDevices = useCallback(async (): Promise<AudioDeviceInfo[]> => {
    return await getAvailableDevices();
  }, [getAvailableDevices]);

  // Switch device
  const switchDevice = useCallback(
    async (newDeviceId: string): Promise<boolean> => {
      if (state.isRecording) {
        handleError('device', 'Cannot switch device while recording');
        return false;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: { exact: newDeviceId },
            echoCancellation,
            noiseSuppression,
            autoGainControl,
            sampleRate: { ideal: sampleRate },
            channelCount: { ideal: channelCount },
          },
        });

        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }

        streamRef.current = stream;
        setState(prev => ({ ...prev, currentDeviceId: newDeviceId }));

        return true;
      } catch (err) {
        handleError('device', 'Failed to switch audio device', err as Error);
        return false;
      }
    },
    [
      state.isRecording,
      echoCancellation,
      noiseSuppression,
      autoGainControl,
      sampleRate,
      channelCount,
      handleError,
    ]
  );

  // Start recording
  const startRecording = useCallback(async (): Promise<boolean> => {
    if (!state.isSupported) {
      handleError('browser', 'MediaRecorder API is not supported');
      return false;
    }

    if (state.isRecording) {
      return true;
    }

    try {
      setError(null);
      setAudioChunks([]);
      setAnalytics({
        peakLevel: 0,
        averageLevel: 0,
        silenceDuration: 0,
        recordingQuality: 0,
        compressionRatio: 0,
      });

      // Request microphone access
      const constraints: MediaStreamConstraints = {
        audio: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
          echoCancellation,
          noiseSuppression,
          autoGainControl,
          sampleRate: { ideal: sampleRate },
          channelCount: { ideal: channelCount },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      // Initialize audio context for analysis
      if (visualizationEnabled && !(await initializeAudioContext(stream))) {
        return false;
      }

      // Detect best supported format
      let selectedMimeType = mimeType;
      const formatKeys = Object.keys(AUDIO_FORMATS) as AudioFormat[];

      for (const format of formatKeys) {
        if (MediaRecorder.isTypeSupported(AUDIO_FORMATS[format].mimeType)) {
          selectedMimeType = AUDIO_FORMATS[format].mimeType;
          setState(prev => ({ ...prev, format }));
          break;
        }
      }

      // Create MediaRecorder
      const options: MediaRecorderOptions = {
        mimeType: selectedMimeType,
        audioBitsPerSecond,
      };

      mediaRecorderRef.current = new MediaRecorder(stream, options);

      // Set up event handlers
      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
          setState(prev => ({
            ...prev,
            recordingSize: prev.recordingSize + event.data.size,
          }));
          onDataAvailable?.(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunks, { type: selectedMimeType });
        setAudioBlob(blob);

        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }

        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        onRecordingComplete?.(blob);
      };

      mediaRecorderRef.current.onerror = event => {
        handleError('recording', 'MediaRecorder error', event as any);
      };

      // Start recording
      mediaRecorderRef.current.start(100); // Collect data every 100ms

      setState(prev => ({
        ...prev,
        isRecording: true,
        isPaused: false,
        hasPermission: true,
        duration: 0,
        currentDeviceId:
          stream.getAudioTracks()[0]?.getSettings().deviceId || null,
      }));

      // Start duration timer
      durationTimerRef.current = setInterval(() => {
        setState(prev => ({ ...prev, duration: prev.duration + 0.1 }));
      }, 100);

      // Start visualization
      if (visualizationEnabled) {
        updateVisualization();
      }

      // Auto-stop at max duration
      if (maxDuration > 0) {
        setTimeout(() => {
          if (state.isRecording) {
            stopRecording();
          }
        }, maxDuration * 1000);
      }

      return true;
    } catch (err) {
      if (err instanceof Error) {
        if (
          err.name === 'NotAllowedError' ||
          err.name === 'PermissionDeniedError'
        ) {
          handleError('permission', 'Microphone access denied');
        } else if (err.name === 'NotFoundError') {
          handleError('device', 'No microphone found');
        } else {
          handleError('recording', 'Failed to start recording', err);
        }
      }
      return false;
    }
  }, [
    state.isSupported,
    state.isRecording,
    deviceId,
    echoCancellation,
    noiseSuppression,
    autoGainControl,
    sampleRate,
    channelCount,
    visualizationEnabled,
    initializeAudioContext,
    mimeType,
    audioBitsPerSecond,
    audioChunks,
    audioUrl,
    onDataAvailable,
    onRecordingComplete,
    handleError,
    updateVisualization,
    maxDuration,
  ]);

  // Stop recording
  const stopRecording = useCallback(async (): Promise<Blob | null> => {
    if (!state.isRecording || !mediaRecorderRef.current) {
      return null;
    }

    return new Promise(resolve => {
      if (!mediaRecorderRef.current) {
        resolve(null);
        return;
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunks, {
          type:
            mediaRecorderRef.current?.mimeType || AUDIO_FORMATS.webm.mimeType,
        });
        setAudioBlob(blob);

        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }

        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        setState(prev => ({
          ...prev,
          isRecording: false,
          isPaused: false,
        }));

        cleanup();
        onRecordingComplete?.(blob);
        resolve(blob);
      };

      mediaRecorderRef.current.stop();
    });
  }, [state.isRecording, audioChunks, audioUrl, cleanup, onRecordingComplete]);

  // Pause recording
  const pauseRecording = useCallback(() => {
    if (state.isRecording && !state.isPaused && mediaRecorderRef.current) {
      mediaRecorderRef.current.pause();
      setState(prev => ({ ...prev, isPaused: true }));

      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current);
        durationTimerRef.current = null;
      }
    }
  }, [state.isRecording, state.isPaused]);

  // Resume recording
  const resumeRecording = useCallback(() => {
    if (state.isRecording && state.isPaused && mediaRecorderRef.current) {
      mediaRecorderRef.current.resume();
      setState(prev => ({ ...prev, isPaused: false }));

      // Restart duration timer
      durationTimerRef.current = setInterval(() => {
        setState(prev => ({ ...prev, duration: prev.duration + 0.1 }));
      }, 100);
    }
  }, [state.isRecording, state.isPaused]);

  // Cancel recording
  const cancelRecording = useCallback(() => {
    if (state.isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setState(prev => ({
        ...prev,
        isRecording: false,
        isPaused: false,
        duration: 0,
        recordingSize: 0,
      }));

      setAudioChunks([]);
      setAudioBlob(null);

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      cleanup();
    }
  }, [state.isRecording, audioUrl, cleanup]);

  // Clear recording
  const clearRecording = useCallback(() => {
    setAudioBlob(null);
    setAudioChunks([]);
    setAudioBuffer(null);
    setAudioLevels([]);
    setWaveformData([]);

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }

    setState(prev => ({
      ...prev,
      duration: 0,
      recordingSize: 0,
      audioLevel: 0,
    }));
  }, [audioUrl]);

  // Download recording
  const downloadRecording = useCallback(
    (filename?: string) => {
      if (!audioBlob) return;

      const format = state.format || 'webm';
      const extension = AUDIO_FORMATS[format].extension;
      const defaultFilename = `recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}${extension}`;

      const link = document.createElement('a');
      link.href = audioUrl || URL.createObjectURL(audioBlob);
      link.download = filename || defaultFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [audioBlob, audioUrl, state.format]
  );

  // Get recording duration
  const getRecordingDuration = useCallback((): number => {
    return state.duration;
  }, [state.duration]);

  // Format duration
  const formatDuration = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  // Export as different format
  const exportAs = useCallback(
    async (format: AudioFormat): Promise<Blob | null> => {
      if (!audioBlob) return null;

      try {
        // For now, return the original blob since browser-based format conversion is complex
        // In a real implementation, you'd use a library like FFmpeg.js or similar
        const newBlob = new Blob([audioBlob], {
          type: AUDIO_FORMATS[format].mimeType,
        });
        return newBlob;
      } catch (err) {
        handleError('format', 'Failed to export audio format', err as Error);
        return null;
      }
    },
    [audioBlob, handleError]
  );

  // Apply noise reduction
  const applyNoiseReduction = useCallback((enabled: boolean) => {
    setNoiseReductionEnabled(enabled);
    // Implementation would involve audio processing with Web Audio API
  }, []);

  // Set audio effects
  const setAudioEffectsHandler = useCallback((effects: AudioEffects) => {
    setAudioEffects(effects);
    // Implementation would involve creating and connecting Web Audio API effect nodes
  }, []);

  // Trim silence
  const trimSilence = useCallback(async (): Promise<Blob | null> => {
    if (!audioBlob) return null;

    try {
      // Implementation would analyze audio buffer and remove silent sections
      // For now, return the original blob
      return audioBlob;
    } catch (err) {
      handleError('recording', 'Failed to trim silence', err as Error);
      return null;
    }
  }, [audioBlob, handleError]);

  // Get audio metadata
  const getAudioMetadata = useCallback((): AudioMetadata => {
    const format = state.format
      ? AUDIO_FORMATS[state.format]
      : AUDIO_FORMATS.webm;

    return {
      duration: state.duration,
      sampleRate,
      channels: channelCount,
      bitRate: audioBitsPerSecond,
      format: format.mimeType,
      size: state.recordingSize,
      createdAt: new Date(),
      peakAmplitude: analytics.peakLevel,
      rmsLevel: analytics.averageLevel,
    };
  }, [
    state.duration,
    state.format,
    state.recordingSize,
    sampleRate,
    channelCount,
    audioBitsPerSecond,
    analytics,
  ]);

  // Compress audio
  const compressAudio = useCallback(
    async (quality: number): Promise<Blob | null> => {
      if (!audioBlob) return null;

      try {
        // Implementation would involve re-encoding with lower bitrate
        // For now, return the original blob
        return audioBlob;
      } catch (err) {
        handleError('recording', 'Failed to compress audio', err as Error);
        return null;
      }
    },
    [audioBlob, handleError]
  );

  // Split recording
  const splitRecording = useCallback(
    async (intervals: number[]): Promise<Blob[]> => {
      if (!audioBlob) return [];

      try {
        // Implementation would involve slicing audio buffer at specified intervals
        // For now, return array with original blob
        return [audioBlob];
      } catch (err) {
        handleError('recording', 'Failed to split recording', err as Error);
        return [];
      }
    },
    [audioBlob, handleError]
  );

  // Keyboard shortcuts
  const shortcuts = {
    Space: 'Toggle recording',
    Escape: 'Stop recording',
    p: 'Pause/Resume',
    c: 'Cancel recording',
    d: 'Download recording',
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!keyboardShortcuts) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return; // Don't handle shortcuts when typing in inputs
      }

      switch (event.code) {
        case 'Space':
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
          break;
        case 'Escape':
          event.preventDefault();
          if (state.isRecording) {
            stopRecording();
          }
          break;
        case 'KeyP':
          event.preventDefault();
          if (state.isRecording) {
            if (state.isPaused) {
              resumeRecording();
            } else {
              pauseRecording();
            }
          }
          break;
        case 'KeyC':
          event.preventDefault();
          if (state.isRecording) {
            cancelRecording();
          }
          break;
        case 'KeyD':
          event.preventDefault();
          if (audioBlob) {
            downloadRecording();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    keyboardShortcuts,
    state.isRecording,
    state.isPaused,
    audioBlob,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,
    downloadRecording,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [cleanup, audioUrl]);

  return {
    // State
    state,
    error,
    analytics,

    // Controls
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,

    // Device management
    getAvailableDevices,
    switchDevice,
    refreshDevices,

    // Audio data
    audioBlob,
    audioUrl,
    audioChunks,
    audioBuffer,

    // Visualization
    audioLevels,
    waveformData,
    frequencyData,

    // Processing
    applyNoiseReduction,
    setAudioEffects: setAudioEffectsHandler,
    trimSilence,

    // Utilities
    clearRecording,
    downloadRecording,
    getRecordingDuration,
    formatDuration,
    exportAs,

    // Integration
    isNetworkAvailable: isOnline,
    keyboardShortcuts: shortcuts,

    // Advanced features
    getAudioMetadata,
    compressAudio,
    splitRecording,
  };
}

export default useAudioRecorder;
