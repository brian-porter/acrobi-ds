import { useState, useEffect, useCallback, useRef } from 'react';
import { useKeyboard } from './use-keyboard';
import { useNetwork } from './use-network';
import { useAudioRecorder } from './use-audio-recorder';

// Screen capture format configurations
export const SCREEN_FORMATS = {
  webm: {
    video: 'video/webm;codecs=vp9',
    audio: 'audio/webm;codecs=opus',
    extension: '.webm',
    quality: 'high',
    compression: 'excellent',
  },
  mp4: {
    video: 'video/mp4;codecs=h264',
    audio: 'audio/mp4;codecs=mp4a.40.2',
    extension: '.mp4',
    quality: 'high',
    compression: 'good',
  },
  png: {
    mimeType: 'image/png',
    extension: '.png',
    quality: 'lossless',
    use: 'screenshots',
  },
  jpeg: {
    mimeType: 'image/jpeg',
    extension: '.jpg',
    quality: 'good',
    use: 'screenshots',
  },
  webp: {
    mimeType: 'image/webp',
    extension: '.webp',
    quality: 'high',
    use: 'screenshots',
  },
} as const;

// Types
export interface ScreenCaptureOptions {
  // Display selection
  video?: {
    mediaSource?: 'screen' | 'window' | 'tab';
    width?: ConstrainULong;
    height?: ConstrainULong;
    frameRate?: ConstrainDouble;
    cursor?: 'always' | 'motion' | 'never';
    displaySurface?: 'application' | 'browser' | 'monitor' | 'window';
  };

  // Audio options
  audio?: {
    suppressLocalAudioPlayback?: boolean;
    systemAudio?: 'include' | 'exclude';
    echoCancellation?: boolean;
    noiseSuppression?: boolean;
  };

  // Recording options
  mimeType?: string;
  videoBitsPerSecond?: number;
  audioBitsPerSecond?: number;
  maxDuration?: number;

  // Callbacks
  onStreamStart?: (stream: MediaStream) => void;
  onStreamEnd?: () => void;
  onRecordingComplete?: (blob: Blob) => void;
  onError?: (error: ScreenCaptureError) => void;
  onPermissionDenied?: () => void;
}

export interface ScreenCaptureState {
  isCapturing: boolean;
  isRecording: boolean;
  isPaused: boolean;
  isSupported: boolean;
  hasPermission: boolean;
  duration: number;
  recordingSize: number;
  activeDisplays: DisplayInfo[];
  currentStream: MediaStream | null;
}

export interface DisplayInfo {
  id: string;
  label: string;
  primary: boolean;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  scaleFactor: number;
}

export interface ScreenCaptureError {
  type: 'permission' | 'device' | 'recording' | 'format' | 'display';
  message: string;
  originalError?: Error;
}

export interface AnnotationType {
  type: 'rectangle' | 'circle' | 'arrow' | 'text' | 'highlight' | 'blur';
}

export interface AnnotationData {
  position: { x: number; y: number };
  size?: { width: number; height: number };
  style?: {
    color?: string;
    strokeWidth?: number;
    fillColor?: string;
    fontSize?: number;
  };
  text?: string;
}

export interface UseScreenCaptureReturn {
  // State
  state: ScreenCaptureState;
  error: ScreenCaptureError | null;

  // Screen capture controls
  startScreenCapture: (
    options?: MediaStreamConstraints
  ) => Promise<MediaStream | null>;
  stopScreenCapture: () => void;
  switchDisplay: (displayId: string) => Promise<boolean>;

  // Recording controls
  startRecording: () => Promise<boolean>;
  stopRecording: () => Promise<Blob | null>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  cancelRecording: () => void;

  // Screenshot capabilities
  takeScreenshot: (format?: 'png' | 'jpeg' | 'webp') => Promise<Blob | null>;
  captureArea: (
    x: number,
    y: number,
    width: number,
    height: number
  ) => Promise<Blob | null>;

  // Stream data
  mediaStream: MediaStream | null;
  recordingBlob: Blob | null;
  recordingUrl: string | null;
  screenshotBlob: Blob | null;

  // Display management
  getAvailableDisplays: () => Promise<DisplayInfo[]>;
  getCurrentDisplay: () => DisplayInfo | null;

  // Annotation tools
  enableAnnotation: () => void;
  disableAnnotation: () => void;
  addAnnotation: (type: AnnotationType, data: AnnotationData) => void;
  clearAnnotations: () => void;

  // Utilities
  downloadRecording: (filename?: string) => void;
  downloadScreenshot: (filename?: string) => void;
  getRecordingDuration: () => number;
  formatDuration: (seconds: number) => string;

  // Integration points
  isNetworkAvailable: boolean;
  networkQuality: 'poor' | 'good' | 'excellent' | 'unknown';
  keyboardShortcuts: Record<string, string>;
  audioRecorder: any;
  enableKeyboardShortcuts: (enabled: boolean) => void;
}

// Utility functions
const isScreenCaptureSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    'navigator' in window &&
    'mediaDevices' in navigator &&
    'getDisplayMedia' in navigator.mediaDevices
  );
};

const isMediaRecorderSupported = (): boolean => {
  return typeof window !== 'undefined' && 'MediaRecorder' in window;
};

const isMimeTypeSupported = (mimeType: string): boolean => {
  if (!isMediaRecorderSupported()) return false;
  return MediaRecorder.isTypeSupported(mimeType);
};

const getBestSupportedVideoMimeType = (): string => {
  const preferredFormats = [
    SCREEN_FORMATS.webm.video,
    SCREEN_FORMATS.mp4.video,
  ];

  for (const format of preferredFormats) {
    if (isMimeTypeSupported(format)) {
      return format;
    }
  }

  return 'video/webm'; // fallback
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Multi-monitor detection utility
const detectDisplays = async (): Promise<DisplayInfo[]> => {
  try {
    // Note: Real multi-monitor detection would require additional APIs
    // This is a simplified implementation
    const displays: DisplayInfo[] = [
      {
        id: 'primary',
        label: 'Primary Display',
        primary: true,
        bounds: {
          x: 0,
          y: 0,
          width: window.screen.width,
          height: window.screen.height,
        },
        scaleFactor: window.devicePixelRatio,
      },
    ];

    // Check for additional screens if available
    if ((window.screen as any).orientation) {
      // This would be expanded with proper multi-monitor API when available
    }

    return displays;
  } catch (error) {
    return [
      {
        id: 'primary',
        label: 'Primary Display',
        primary: true,
        bounds: {
          x: 0,
          y: 0,
          width: 1920,
          height: 1080,
        },
        scaleFactor: 1,
      },
    ];
  }
};

export function useScreenCapture(
  options: ScreenCaptureOptions = {}
): UseScreenCaptureReturn {
  const {
    video = {
      mediaSource: 'screen',
      width: { ideal: 1920 },
      height: { ideal: 1080 },
      frameRate: { ideal: 30 },
      cursor: 'always',
      displaySurface: 'monitor',
    },
    audio = {
      suppressLocalAudioPlayback: false,
      systemAudio: 'include',
      echoCancellation: false,
      noiseSuppression: false,
    },
    mimeType = getBestSupportedVideoMimeType(),
    videoBitsPerSecond = 2000000, // 2 Mbps
    audioBitsPerSecond = 128000,
    maxDuration = 3600, // 1 hour default
    onStreamStart,
    onStreamEnd,
    onRecordingComplete,
    onError,
    onPermissionDenied,
  } = options;

  // Epic integrations
  const keyboard = useKeyboard();
  const network = useNetwork();
  const audioRecorder = useAudioRecorder();

  // State
  const [state, setState] = useState<ScreenCaptureState>({
    isCapturing: false,
    isRecording: false,
    isPaused: false,
    isSupported: isScreenCaptureSupported(),
    hasPermission: false,
    duration: 0,
    recordingSize: 0,
    activeDisplays: [],
    currentStream: null,
  });

  const [error, setError] = useState<ScreenCaptureError | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [screenshotBlob, setScreenshotBlob] = useState<Blob | null>(null);
  const [annotations, setAnnotations] = useState<
    Array<AnnotationType & AnnotationData>
  >([]);
  const [annotationEnabled, setAnnotationEnabled] = useState(false);
  const [keyboardShortcutsEnabled, setKeyboardShortcutsEnabled] =
    useState(true);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startTimeRef = useRef<number>(0);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const keyboardShortcutIds = useRef<string[]>([]);

  // Error handling
  const handleError = useCallback(
    (
      type: ScreenCaptureError['type'],
      message: string,
      originalError?: Error
    ) => {
      const screenError: ScreenCaptureError = { type, message, originalError };
      setError(screenError);
      onError?.(screenError);
    },
    [onError]
  );

  // Clear previous recording
  const clearRecording = useCallback(() => {
    if (recordingUrl) {
      URL.revokeObjectURL(recordingUrl);
    }
    setRecordingBlob(null);
    setRecordingUrl(null);
    chunksRef.current = [];
    setState(prev => ({ ...prev, duration: 0, recordingSize: 0 }));
  }, [recordingUrl]);

  // Get available displays
  const getAvailableDisplays = useCallback(async (): Promise<DisplayInfo[]> => {
    try {
      const displays = await detectDisplays();
      setState(prev => ({ ...prev, activeDisplays: displays }));
      return displays;
    } catch (err) {
      handleError('display', 'Failed to enumerate displays', err as Error);
      return [];
    }
  }, [handleError]);

  // Get current display
  const getCurrentDisplay = useCallback((): DisplayInfo | null => {
    return (
      state.activeDisplays.find(display => display.primary) ||
      state.activeDisplays[0] ||
      null
    );
  }, [state.activeDisplays]);

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

  // Start screen capture
  const startScreenCapture = useCallback(
    async (
      customConstraints?: MediaStreamConstraints
    ): Promise<MediaStream | null> => {
      try {
        setError(null);

        const constraints: DisplayMediaStreamConstraints =
          customConstraints || {
            video: {
              ...video,
              width: video.width,
              height: video.height,
              frameRate: video.frameRate,
              cursor: video.cursor as any,
              displaySurface: video.displaySurface as any,
            },
            audio:
              audio.systemAudio === 'include'
                ? {
                    suppressLocalAudioPlayback:
                      audio.suppressLocalAudioPlayback,
                    echoCancellation: audio.echoCancellation,
                    noiseSuppression: audio.noiseSuppression,
                  }
                : false,
          };

        const stream =
          await navigator.mediaDevices.getDisplayMedia(constraints);

        setMediaStream(stream);
        setState(prev => ({
          ...prev,
          isCapturing: true,
          hasPermission: true,
          currentStream: stream,
        }));

        // Handle stream end events
        stream.getVideoTracks().forEach(track => {
          track.addEventListener('ended', () => {
            stopScreenCapture();
          });
        });

        onStreamStart?.(stream);
        return stream;
      } catch (err) {
        if ((err as Error).name === 'NotAllowedError') {
          handleError('permission', 'Screen capture permission denied');
          onPermissionDenied?.();
        } else if ((err as Error).name === 'NotSupportedError') {
          handleError('device', 'Screen capture not supported in this browser');
        } else {
          handleError(
            'recording',
            'Failed to start screen capture',
            err as Error
          );
        }
        return null;
      }
    },
    [video, audio, handleError, onStreamStart, onPermissionDenied]
  );

  // Stop screen capture
  const stopScreenCapture = useCallback(() => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }

    setState(prev => ({
      ...prev,
      isCapturing: false,
      currentStream: null,
    }));

    onStreamEnd?.();
  }, [mediaStream, onStreamEnd]);

  // Switch display
  const switchDisplay = useCallback(
    async (displayId: string): Promise<boolean> => {
      const wasCapturing = state.isCapturing;

      if (wasCapturing) {
        stopScreenCapture();
      }

      // In a real implementation, this would use specific display selection
      // For now, we'll restart capture with the same constraints
      if (wasCapturing) {
        const stream = await startScreenCapture();
        return stream !== null;
      }

      return true;
    },
    [state.isCapturing, stopScreenCapture, startScreenCapture]
  );

  // Start recording
  const startRecording = useCallback(async (): Promise<boolean> => {
    try {
      if (!mediaStream) {
        const stream = await startScreenCapture();
        if (!stream) return false;
      }

      setError(null);
      clearRecording();

      // Create MediaRecorder with screen stream
      const recorder = new MediaRecorder(mediaStream!, {
        mimeType: isMimeTypeSupported(mimeType)
          ? mimeType
          : getBestSupportedVideoMimeType(),
        videoBitsPerSecond,
        audioBitsPerSecond,
      });

      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      // Set up event handlers
      recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);

          // Calculate recording size
          const totalSize = chunksRef.current.reduce(
            (sum, chunk) => sum + chunk.size,
            0
          );
          setState(prev => ({ ...prev, recordingSize: totalSize }));
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setRecordingBlob(blob);

        const url = URL.createObjectURL(blob);
        setRecordingUrl(url);

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

      setState(prev => ({
        ...prev,
        isRecording: true,
        isPaused: false,
      }));

      return true;
    } catch (err) {
      handleError('recording', 'Failed to start recording', err as Error);
      return false;
    }
  }, [
    mediaStream,
    startScreenCapture,
    mimeType,
    videoBitsPerSecond,
    audioBitsPerSecond,
    clearRecording,
    updateDuration,
    handleError,
    onRecordingComplete,
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
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }

      setState(prev => ({
        ...prev,
        isRecording: false,
        isPaused: false,
      }));
    });
  }, [mimeType]);

  // Pause recording
  const pauseRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.pause();
      setState(prev => ({ ...prev, isPaused: true }));
    }
  }, []);

  // Resume recording
  const resumeRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'paused'
    ) {
      mediaRecorderRef.current.resume();
      setState(prev => ({ ...prev, isPaused: false }));
    }
  }, []);

  // Cancel recording
  const cancelRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    clearRecording();
  }, [clearRecording]);

  // Take screenshot
  const takeScreenshot = useCallback(
    async (format: 'png' | 'jpeg' | 'webp' = 'png'): Promise<Blob | null> => {
      try {
        if (!mediaStream) {
          handleError('recording', 'No active screen capture stream');
          return null;
        }

        // Create video element to capture frame
        const video = document.createElement('video');
        video.srcObject = mediaStream;
        video.play();

        return new Promise(resolve => {
          video.addEventListener('loadedmetadata', () => {
            // Create canvas to capture frame
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
              resolve(null);
              return;
            }

            ctx.drawImage(video, 0, 0);

            // Convert to blob
            canvas.toBlob(
              blob => {
                setScreenshotBlob(blob);
                resolve(blob);
              },
              SCREEN_FORMATS[format].mimeType,
              0.9
            );
          });
        });
      } catch (err) {
        handleError('recording', 'Failed to take screenshot', err as Error);
        return null;
      }
    },
    [mediaStream, handleError]
  );

  // Capture specific area
  const captureArea = useCallback(
    async (
      x: number,
      y: number,
      width: number,
      height: number
    ): Promise<Blob | null> => {
      try {
        if (!mediaStream) {
          handleError('recording', 'No active screen capture stream');
          return null;
        }

        // This would require more complex implementation for area selection
        // For now, we'll return a full screenshot
        return await takeScreenshot();
      } catch (err) {
        handleError('recording', 'Failed to capture area', err as Error);
        return null;
      }
    },
    [mediaStream, takeScreenshot, handleError]
  );

  // Annotation functions
  const enableAnnotation = useCallback(() => {
    setAnnotationEnabled(true);
  }, []);

  const disableAnnotation = useCallback(() => {
    setAnnotationEnabled(false);
  }, []);

  const addAnnotation = useCallback(
    (type: AnnotationType, data: AnnotationData) => {
      if (!annotationEnabled) return;

      setAnnotations(prev => [...prev, { ...type, ...data }]);
    },
    [annotationEnabled]
  );

  const clearAnnotations = useCallback(() => {
    setAnnotations([]);
  }, []);

  // Download functions
  const downloadRecording = useCallback(
    (filename?: string) => {
      if (!recordingBlob) return;

      const url = URL.createObjectURL(recordingBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download =
        filename ||
        `screen-recording-${new Date().toISOString().slice(0, 19)}.${SCREEN_FORMATS.webm.extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [recordingBlob]
  );

  const downloadScreenshot = useCallback(
    (filename?: string) => {
      if (!screenshotBlob) return;

      const url = URL.createObjectURL(screenshotBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download =
        filename ||
        `screenshot-${new Date().toISOString().slice(0, 19)}.${SCREEN_FORMATS.png.extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [screenshotBlob]
  );

  // Utility functions
  const getRecordingDuration = useCallback((): number => {
    return state.duration;
  }, [state.duration]);

  const formatDuration = useCallback((seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Keyboard shortcuts integration
  const enableKeyboardShortcuts = useCallback((enabled: boolean) => {
    setKeyboardShortcutsEnabled(enabled);
  }, []);

  // Setup keyboard shortcuts
  useEffect(() => {
    if (!keyboardShortcutsEnabled || !keyboard.isSupported) return;

    // Clear existing shortcuts
    keyboardShortcutIds.current.forEach(id => keyboard.removeShortcut(id));
    keyboardShortcutIds.current = [];

    // Add screen capture shortcuts
    const shortcuts = [
      {
        keys: 'F12',
        callback: (event: KeyboardEvent) => {
          event.preventDefault();
          if (state.isCapturing) {
            takeScreenshot();
          } else {
            startScreenCapture();
          }
        },
        preventDefault: true,
        description: 'Take screenshot or start screen capture',
      },
      {
        keys: '$mod+Shift+R',
        callback: (event: KeyboardEvent) => {
          event.preventDefault();
          if (state.isRecording) {
            stopRecording();
          } else {
            startRecording();
          }
        },
        preventDefault: true,
        description: 'Start/stop screen recording',
      },
      {
        keys: 'Space',
        callback: (event: KeyboardEvent) => {
          if (!state.isRecording) return;
          event.preventDefault();
          if (state.isPaused) {
            resumeRecording();
          } else {
            pauseRecording();
          }
        },
        preventDefault: true,
        description: 'Pause/resume recording',
      },
      {
        keys: 'Escape',
        callback: (event: KeyboardEvent) => {
          event.preventDefault();
          if (state.isRecording) {
            stopRecording();
          } else if (state.isCapturing) {
            stopScreenCapture();
          }
        },
        preventDefault: true,
        description: 'Stop capture/recording',
      },
      {
        keys: '$mod+S',
        callback: (event: KeyboardEvent) => {
          event.preventDefault();
          if (recordingBlob) {
            downloadRecording();
          } else if (screenshotBlob) {
            downloadScreenshot();
          }
        },
        preventDefault: true,
        description: 'Download recording or screenshot',
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
    state.isCapturing,
    state.isRecording,
    state.isPaused,
    recordingBlob,
    screenshotBlob,
    startScreenCapture,
    takeScreenshot,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    stopScreenCapture,
    downloadRecording,
    downloadScreenshot,
  ]);

  // Network-aware quality adjustment
  useEffect(() => {
    if (!network.isOnline) return;

    // Adjust recording quality based on network conditions
    const suggestedQuality = network.getSuggestedQuality();

    if (suggestedQuality === 'low' && videoBitsPerSecond > 1000000) {
      console.log('Slow network detected - consider reducing video quality');
    }
  }, [network.isOnline, network.getSuggestedQuality, videoBitsPerSecond]);

  // Initialize displays on mount
  useEffect(() => {
    getAvailableDisplays();
  }, [getAvailableDisplays]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
      if (recordingUrl) {
        URL.revokeObjectURL(recordingUrl);
      }
    };
  }, [mediaStream, recordingUrl]);

  return {
    // State
    state,
    error,

    // Screen capture controls
    startScreenCapture,
    stopScreenCapture,
    switchDisplay,

    // Recording controls
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,

    // Screenshot capabilities
    takeScreenshot,
    captureArea,

    // Stream data
    mediaStream,
    recordingBlob,
    recordingUrl,
    screenshotBlob,

    // Display management
    getAvailableDisplays,
    getCurrentDisplay,

    // Annotation tools
    enableAnnotation,
    disableAnnotation,
    addAnnotation,
    clearAnnotations,

    // Utilities
    downloadRecording,
    downloadScreenshot,
    getRecordingDuration,
    formatDuration,

    // Integration points
    isNetworkAvailable: network.isOnline,
    networkQuality: network.connectionQuality,
    keyboardShortcuts: {
      F12: 'Take screenshot or start screen capture',
      [`${keyboard.modifierKey}+Shift+R`]: 'Start/stop screen recording',
      Space: 'Pause/resume recording',
      Escape: 'Stop capture/recording',
      [`${keyboard.modifierKey}+S`]: 'Download recording or screenshot',
    },
    audioRecorder,
    enableKeyboardShortcuts,
  };
}
