/**
 * useVideoRecorder Hook
 * Epic 44 - AAE Video Recording
 *
 * Comprehensive video recording hook with MediaRecorder API integration,
 * camera management, and real-time preview capabilities.
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  VideoRecorderOptions,
  VideoRecorderState,
  VideoRecorderError,
  VideoDeviceInfo,
  UseVideoRecorderReturn,
  CameraConstraints,
  VIDEO_FORMATS,
  VIDEO_QUALITY_PRESETS,
} from './types/video-recorder';

// Default configuration
const DEFAULT_OPTIONS: Partial<VideoRecorderOptions> = {
  mimeType: 'video/webm;codecs=vp9,opus',
  videoBitsPerSecond: 2500000,
  audioBitsPerSecond: 128000,
  width: 1280,
  height: 720,
  frameRate: 30,
  facingMode: 'user',
  includeAudio: true,
  maxDuration: 600000, // 10 minutes
};

export function useVideoRecorder(
  options: VideoRecorderOptions = {}
): UseVideoRecorderReturn {
  const config = { ...DEFAULT_OPTIONS, ...options };

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // State
  const [state, setState] = useState<VideoRecorderState>({
    isRecording: false,
    isPaused: false,
    isSupported: typeof MediaRecorder !== 'undefined',
    hasPermission: false,
    hasCameraPermission: false,
    hasMicrophonePermission: false,
    duration: 0,
    recordingSize: 0,
    currentDeviceId: null,
    currentResolution: {
      width: config.width || 1280,
      height: config.height || 720,
    },
    currentFrameRate: config.frameRate || 30,
  });

  const [error, setError] = useState<VideoRecorderError | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoChunks, setVideoChunks] = useState<Blob[]>([]);
  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null);
  const [availableDevices, setAvailableDevices] = useState<VideoDeviceInfo[]>(
    []
  );

  // Network status integration (Epic 41)
  const [isNetworkAvailable] = useState(navigator.onLine);

  // Keyboard shortcuts integration (Epic 40)
  const keyboardShortcuts = {
    spacebar: 'Toggle recording',
    escape: 'Stop recording',
    p: 'Pause/Resume recording',
    c: 'Capture frame',
    s: 'Switch camera',
  };

  // Clear error helper
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Create error helper
  const createError = useCallback(
    (
      type: VideoRecorderError['type'],
      message: string,
      originalError?: Error
    ): VideoRecorderError => {
      const errorObj: VideoRecorderError = { type, message, originalError };
      setError(errorObj);
      config.onError?.(errorObj);
      return errorObj;
    },
    [config]
  );

  // Get browser-supported MIME type
  const getSupportedMimeType = useCallback((): string => {
    const types = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
      'video/webm',
      'video/mp4',
    ];

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }

    return 'video/webm'; // Fallback
  }, []);

  // Check permissions
  const checkPermissions = useCallback(async (): Promise<boolean> => {
    try {
      const cameraPermission = await navigator.permissions.query({
        name: 'camera' as PermissionName,
      });
      const microphonePermission = await navigator.permissions.query({
        name: 'microphone' as PermissionName,
      });

      const hasCameraPermission = cameraPermission.state === 'granted';
      const hasMicrophonePermission = microphonePermission.state === 'granted';
      const hasPermission =
        hasCameraPermission &&
        (config.includeAudio ? hasMicrophonePermission : true);

      setState(prev => ({
        ...prev,
        hasCameraPermission,
        hasMicrophonePermission,
        hasPermission,
      }));

      return hasPermission;
    } catch (err) {
      createError('permission', 'Failed to check permissions', err as Error);
      return false;
    }
  }, [config.includeAudio, createError]);

  // Get available devices
  const getAvailableDevices = useCallback(async (): Promise<
    VideoDeviceInfo[]
  > => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices
        .filter(device => device.kind === 'videoinput')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${device.deviceId.slice(0, 8)}`,
          kind: 'videoinput' as const,
          facingMode: device.label.toLowerCase().includes('front')
            ? ('user' as const)
            : device.label.toLowerCase().includes('back')
              ? ('environment' as const)
              : undefined,
          groupId: device.groupId,
        }));

      setAvailableDevices(videoDevices);
      return videoDevices;
    } catch (err) {
      createError('device', 'Failed to enumerate devices', err as Error);
      return [];
    }
  }, [createError]);

  // Create camera constraints
  const createConstraints = useCallback(
    (deviceId?: string): CameraConstraints => {
      return {
        video: {
          width: { ideal: state.currentResolution.width },
          height: { ideal: state.currentResolution.height },
          frameRate: { ideal: state.currentFrameRate },
          facingMode: deviceId ? undefined : config.facingMode,
          deviceId: deviceId ? { exact: deviceId } : undefined,
          aspectRatio: config.aspectRatio,
        },
        audio: config.includeAudio
          ? {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            }
          : false,
      };
    },
    [
      state.currentResolution,
      state.currentFrameRate,
      config.facingMode,
      config.aspectRatio,
      config.includeAudio,
    ]
  );

  // Get user media stream
  const getUserMediaStream = useCallback(
    async (deviceId?: string): Promise<MediaStream | null> => {
      try {
        clearError();
        const constraints = createConstraints(deviceId);
        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        streamRef.current = stream;
        setPreviewStream(stream);

        // Set up preview
        if (previewRef.current) {
          previewRef.current.srcObject = stream;
        }

        setState(prev => ({
          ...prev,
          currentDeviceId: deviceId || null,
          hasPermission: true,
          hasCameraPermission: true,
          hasMicrophonePermission:
            config.includeAudio || prev.hasMicrophonePermission,
        }));

        return stream;
      } catch (err) {
        if ((err as DOMException).name === 'NotAllowedError') {
          createError('permission', 'Camera permission denied');
          config.onPermissionDenied?.();
        } else if ((err as DOMException).name === 'NotFoundError') {
          createError('device', 'No camera device found');
        } else {
          createError('stream', 'Failed to access camera', err as Error);
        }
        return null;
      }
    },
    [createConstraints, clearError, createError, config]
  );

  // Update timer
  const updateTimer = useCallback(() => {
    if (state.isRecording && !state.isPaused) {
      const currentTime = Date.now();
      const elapsed = Math.floor((currentTime - startTimeRef.current) / 1000);
      setState(prev => ({ ...prev, duration: elapsed }));

      // Check max duration
      if (config.maxDuration && elapsed >= config.maxDuration / 1000) {
        stopRecording();
      }
    }
  }, [state.isRecording, state.isPaused, config.maxDuration]);

  // Start recording
  const startRecording = useCallback(async (): Promise<boolean> => {
    try {
      clearError();

      if (!state.isSupported) {
        createError('recording', 'MediaRecorder not supported');
        return false;
      }

      // Get stream if not available
      let stream = streamRef.current;
      if (!stream) {
        stream = await getUserMediaStream(state.currentDeviceId || undefined);
        if (!stream) return false;
      }

      // Create MediaRecorder
      const mimeType = config.mimeType || getSupportedMimeType();
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: config.videoBitsPerSecond,
        audioBitsPerSecond: config.audioBitsPerSecond,
      });

      // Set up event handlers
      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
          config.onDataAvailable?.(event.data);

          // Update recording size
          const totalSize = chunksRef.current.reduce(
            (total, chunk) => total + chunk.size,
            0
          );
          setState(prev => ({ ...prev, recordingSize: totalSize }));
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setVideoBlob(blob);
        setVideoChunks([...chunksRef.current]);

        // Create object URL
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);

        config.onRecordingComplete?.(blob);

        setState(prev => ({
          ...prev,
          isRecording: false,
          isPaused: false,
        }));
      };

      mediaRecorder.onerror = event => {
        createError('recording', 'Recording failed', event.error);
      };

      // Start recording
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      startTimeRef.current = Date.now();

      mediaRecorder.start(1000); // Collect data every second

      setState(prev => ({
        ...prev,
        isRecording: true,
        isPaused: false,
        duration: 0,
        recordingSize: 0,
      }));

      // Start timer
      timerRef.current = setInterval(updateTimer, 1000);

      return true;
    } catch (err) {
      createError('recording', 'Failed to start recording', err as Error);
      return false;
    }
  }, [
    state.isSupported,
    state.currentDeviceId,
    getUserMediaStream,
    config,
    getSupportedMimeType,
    createError,
    clearError,
    updateTimer,
  ]);

  // Stop recording
  const stopRecording = useCallback(async (): Promise<Blob | null> => {
    try {
      if (mediaRecorderRef.current && state.isRecording) {
        mediaRecorderRef.current.stop();

        // Clear timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }

      return videoBlob;
    } catch (err) {
      createError('recording', 'Failed to stop recording', err as Error);
      return null;
    }
  }, [state.isRecording, videoBlob, createError]);

  // Pause recording
  const pauseRecording = useCallback(() => {
    try {
      if (mediaRecorderRef.current && state.isRecording && !state.isPaused) {
        mediaRecorderRef.current.pause();
        setState(prev => ({ ...prev, isPaused: true }));

        // Clear timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    } catch (err) {
      createError('recording', 'Failed to pause recording', err as Error);
    }
  }, [state.isRecording, state.isPaused, createError]);

  // Resume recording
  const resumeRecording = useCallback(() => {
    try {
      if (mediaRecorderRef.current && state.isRecording && state.isPaused) {
        mediaRecorderRef.current.resume();
        setState(prev => ({ ...prev, isPaused: false }));

        // Restart timer
        timerRef.current = setInterval(updateTimer, 1000);
      }
    } catch (err) {
      createError('recording', 'Failed to resume recording', err as Error);
    }
  }, [state.isRecording, state.isPaused, updateTimer, createError]);

  // Cancel recording
  const cancelRecording = useCallback(() => {
    try {
      if (mediaRecorderRef.current && state.isRecording) {
        mediaRecorderRef.current.stop();

        // Clear timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        // Clear chunks without creating blob
        chunksRef.current = [];

        setState(prev => ({
          ...prev,
          isRecording: false,
          isPaused: false,
          duration: 0,
          recordingSize: 0,
        }));
      }
    } catch (err) {
      createError('recording', 'Failed to cancel recording', err as Error);
    }
  }, [state.isRecording, createError]);

  // Switch camera
  const switchCamera = useCallback(
    async (deviceId?: string): Promise<boolean> => {
      try {
        const wasRecording = state.isRecording;

        if (wasRecording) {
          pauseRecording();
        }

        // Stop current stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }

        // Get new stream
        const stream = await getUserMediaStream(deviceId);

        if (wasRecording && stream) {
          resumeRecording();
        }

        return !!stream;
      } catch (err) {
        createError('device', 'Failed to switch camera', err as Error);
        return false;
      }
    },
    [
      state.isRecording,
      pauseRecording,
      resumeRecording,
      getUserMediaStream,
      createError,
    ]
  );

  // Switch to front camera
  const switchToFrontCamera = useCallback(async (): Promise<boolean> => {
    const devices = await getAvailableDevices();
    const frontCamera = devices.find(device => device.facingMode === 'user');
    return frontCamera ? switchCamera(frontCamera.deviceId) : false;
  }, [getAvailableDevices, switchCamera]);

  // Switch to back camera
  const switchToBackCamera = useCallback(async (): Promise<boolean> => {
    const devices = await getAvailableDevices();
    const backCamera = devices.find(
      device => device.facingMode === 'environment'
    );
    return backCamera ? switchCamera(backCamera.deviceId) : false;
  }, [getAvailableDevices, switchCamera]);

  // Capture frame
  const captureFrame = useCallback((): string | null => {
    try {
      if (!previewRef.current) return null;

      const canvas = document.createElement('canvas');
      const video = previewRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.drawImage(video, 0, 0);
      return canvas.toDataURL('image/png');
    } catch (err) {
      createError('recording', 'Failed to capture frame', err as Error);
      return null;
    }
  }, [createError]);

  // Generate thumbnail
  const generateThumbnail = useCallback((): string | null => {
    try {
      const frame = captureFrame();
      if (!frame) return null;

      // Create smaller thumbnail
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const img = new Image();
      img.onload = () => {
        canvas.width = 150;
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 150, 100);
      };
      img.src = frame;

      return canvas.toDataURL('image/jpeg', 0.8);
    } catch (err) {
      createError('recording', 'Failed to generate thumbnail', err as Error);
      return null;
    }
  }, [captureFrame, createError]);

  // Clear recording
  const clearRecording = useCallback(() => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoBlob(null);
    setVideoUrl(null);
    setVideoChunks([]);
    chunksRef.current = [];

    setState(prev => ({
      ...prev,
      duration: 0,
      recordingSize: 0,
    }));
  }, [videoUrl]);

  // Download recording
  const downloadRecording = useCallback(
    (filename?: string) => {
      if (!videoBlob) return;

      const url = URL.createObjectURL(videoBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || `video-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [videoBlob]
  );

  // Get recording duration
  const getRecordingDuration = useCallback((): number => {
    return state.duration;
  }, [state.duration]);

  // Format duration
  const formatDuration = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Set resolution
  const setResolution = useCallback(
    async (width: number, height: number): Promise<boolean> => {
      setState(prev => ({
        ...prev,
        currentResolution: { width, height },
      }));

      // If currently recording, restart with new resolution
      if (streamRef.current) {
        return switchCamera(state.currentDeviceId || undefined);
      }

      return true;
    },
    [state.currentDeviceId, switchCamera]
  );

  // Set frame rate
  const setFrameRate = useCallback(
    async (fps: number): Promise<boolean> => {
      setState(prev => ({
        ...prev,
        currentFrameRate: fps,
      }));

      // If currently recording, restart with new frame rate
      if (streamRef.current) {
        return switchCamera(state.currentDeviceId || undefined);
      }

      return true;
    },
    [state.currentDeviceId, switchCamera]
  );

  // Set quality preset
  const setQuality = useCallback(
    async (quality: 'low' | 'medium' | 'high' | 'ultra'): Promise<boolean> => {
      const preset = VIDEO_QUALITY_PRESETS[quality];
      if (!preset) return false;

      return (
        setResolution(preset.width, preset.height) &&
        setFrameRate(preset.frameRate)
      );
    },
    [setResolution, setFrameRate]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Stop recording if active
      if (state.isRecording) {
        stopRecording();
      }

      // Stop stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Clean up URLs
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Initialize devices on mount
  useEffect(() => {
    getAvailableDevices();
    checkPermissions();
  }, [getAvailableDevices, checkPermissions]);

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

    // Camera management
    getAvailableDevices,
    switchCamera,
    switchToFrontCamera,
    switchToBackCamera,

    // Video data
    videoBlob,
    videoUrl,
    videoChunks,
    previewStream,

    // Preview and capture
    captureFrame,
    generateThumbnail,
    previewRef,

    // Utilities
    clearRecording,
    downloadRecording,
    getRecordingDuration,
    formatDuration,

    // Quality controls
    setResolution,
    setFrameRate,
    setQuality,

    // Integration
    isNetworkAvailable,
    keyboardShortcuts,
  };
}

export default useVideoRecorder;
