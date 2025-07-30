/**
 * Video Recorder Types
 * Epic 44 - AAE Video Recording
 *
 * Comprehensive TypeScript interfaces for video recording functionality
 * with MediaRecorder API integration and advanced camera management.
 */

export interface VideoRecorderOptions {
  // Recording configuration
  mimeType?: string;
  videoBitsPerSecond?: number;
  audioBitsPerSecond?: number;
  width?: number;
  height?: number;
  frameRate?: number;

  // Camera options
  facingMode?: 'user' | 'environment';
  deviceId?: string;
  aspectRatio?: number;

  // Behavior options
  maxDuration?: number;
  includeAudio?: boolean;
  onDataAvailable?: (chunk: Blob) => void;
  onRecordingComplete?: (videoBlob: Blob) => void;
  onError?: (error: VideoRecorderError) => void;
  onPermissionDenied?: () => void;
}

export interface VideoRecorderState {
  isRecording: boolean;
  isPaused: boolean;
  isSupported: boolean;
  hasPermission: boolean;
  hasCameraPermission: boolean;
  hasMicrophonePermission: boolean;
  duration: number;
  recordingSize: number;
  currentDeviceId: string | null;
  currentResolution: { width: number; height: number };
  currentFrameRate: number;
}

export interface VideoDeviceInfo {
  deviceId: string;
  label: string;
  kind: 'videoinput';
  facingMode?: 'user' | 'environment';
  groupId: string;
}

export interface VideoRecorderError {
  type: 'permission' | 'device' | 'recording' | 'format' | 'network' | 'stream';
  message: string;
  originalError?: Error;
}

export interface VideoQualityPreset {
  width: number;
  height: number;
  frameRate: number;
  bitrate: number;
}

export interface VideoFormat {
  mimeType: string;
  extension: string;
  quality: string;
  compression: string;
  browserSupport: string[];
}

export interface UseVideoRecorderReturn {
  // State
  state: VideoRecorderState;
  error: VideoRecorderError | null;

  // Controls
  startRecording: () => Promise<boolean>;
  stopRecording: () => Promise<Blob | null>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  cancelRecording: () => void;

  // Camera management
  getAvailableDevices: () => Promise<VideoDeviceInfo[]>;
  switchCamera: (deviceId?: string) => Promise<boolean>;
  switchToFrontCamera: () => Promise<boolean>;
  switchToBackCamera: () => Promise<boolean>;

  // Video data
  videoBlob: Blob | null;
  videoUrl: string | null;
  videoChunks: Blob[];
  previewStream: MediaStream | null;

  // Preview and capture
  captureFrame: () => string | null; // base64 image
  generateThumbnail: () => string | null;
  previewRef: React.RefObject<HTMLVideoElement>;

  // Utilities
  clearRecording: () => void;
  downloadRecording: (filename?: string) => void;
  getRecordingDuration: () => number;
  formatDuration: (seconds: number) => string;

  // Quality controls
  setResolution: (width: number, height: number) => Promise<boolean>;
  setFrameRate: (fps: number) => Promise<boolean>;
  setQuality: (
    quality: 'low' | 'medium' | 'high' | 'ultra'
  ) => Promise<boolean>;

  // Integration
  isNetworkAvailable: boolean; // from Epic 41
  keyboardShortcuts: Record<string, string>; // from Epic 40
}

// Video format constants
export const VIDEO_FORMATS: Record<string, VideoFormat> = {
  webm: {
    mimeType: 'video/webm;codecs=vp9,opus',
    extension: '.webm',
    quality: 'high',
    compression: 'excellent',
    browserSupport: ['Chrome', 'Firefox', 'Edge'],
  },
  mp4: {
    mimeType: 'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
    extension: '.mp4',
    quality: 'high',
    compression: 'good',
    browserSupport: ['Chrome', 'Safari', 'Edge'],
  },
  avi: {
    mimeType: 'video/x-msvideo',
    extension: '.avi',
    quality: 'medium',
    compression: 'fair',
    browserSupport: ['Legacy support'],
  },
};

// Video quality presets
export const VIDEO_QUALITY_PRESETS: Record<string, VideoQualityPreset> = {
  low: { width: 480, height: 360, frameRate: 15, bitrate: 500000 },
  medium: { width: 720, height: 480, frameRate: 24, bitrate: 1000000 },
  high: { width: 1280, height: 720, frameRate: 30, bitrate: 2500000 },
  ultra: { width: 1920, height: 1080, frameRate: 60, bitrate: 5000000 },
};

// Camera constraints for different scenarios
export interface CameraConstraints {
  video: {
    width?: { min?: number; ideal?: number; max?: number };
    height?: { min?: number; ideal?: number; max?: number };
    frameRate?: { min?: number; ideal?: number; max?: number };
    facingMode?: 'user' | 'environment';
    deviceId?: string;
    aspectRatio?: number;
  };
  audio?:
    | boolean
    | {
        echoCancellation?: boolean;
        noiseSuppression?: boolean;
        autoGainControl?: boolean;
      };
}

// Recording events
export interface VideoRecordingEvents {
  onStart?: () => void;
  onStop?: (blob: Blob) => void;
  onPause?: () => void;
  onResume?: () => void;
  onDataAvailable?: (event: BlobEvent) => void;
  onError?: (event: Event) => void;
}

// Stream management
export interface StreamManager {
  currentStream: MediaStream | null;
  devices: VideoDeviceInfo[];
  selectedDeviceId: string | null;
  constraints: CameraConstraints;
}

export type VideoRecorderHook = (
  options?: VideoRecorderOptions
) => UseVideoRecorderReturn;
