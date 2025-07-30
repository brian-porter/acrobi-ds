import { useState, useRef, useCallback, useEffect } from 'react';

export interface CameraOptions {
  width?: number;
  height?: number;
  facingMode?: 'user' | 'environment';
  audio?: boolean;
}

export interface CapturedPhoto {
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
  timestamp: number;
}

export interface UseCameraReturn {
  stream: MediaStream | null;
  isStreaming: boolean;
  isLoading: boolean;
  error: string | null;
  isSupported: boolean;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  capturePhoto: () => Promise<CapturedPhoto | null>;
  switchCamera: () => Promise<void>;
}

export function useCamera(options: CameraOptions = {}): UseCameraReturn {
  const {
    width = 1280,
    height = 720,
    facingMode = 'environment',
    audio = false,
  } = options;

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFacingMode, setCurrentFacingMode] = useState(facingMode);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isSupported =
    typeof navigator !== 'undefined' &&
    'mediaDevices' in navigator &&
    'getUserMedia' in navigator.mediaDevices;

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
      setIsStreaming(false);
    }
    setError(null);
  }, [stream]);

  const startCamera = useCallback(async () => {
    if (!isSupported) {
      setError('Camera access is not supported in this browser');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Stop existing stream if any
      if (stream) {
        stopCamera();
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: width },
          height: { ideal: height },
          facingMode: { ideal: currentFacingMode },
        },
        audio,
      });

      setStream(mediaStream);
      setIsStreaming(true);
      setIsLoading(false);

      // Set video source if video element is available
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        switch (err.name) {
          case 'NotAllowedError':
            setError('Camera access denied by user');
            break;
          case 'NotFoundError':
            setError('No camera device found');
            break;
          case 'NotReadableError':
            setError('Camera is already in use by another application');
            break;
          case 'OverconstrainedError':
            setError('Camera constraints could not be satisfied');
            break;
          case 'SecurityError':
            setError('Camera access blocked due to security restrictions');
            break;
          default:
            setError(`Camera error: ${err.message}`);
        }
      } else {
        setError('An unknown camera error occurred');
      }
    }
  }, [
    isSupported,
    stream,
    stopCamera,
    width,
    height,
    currentFacingMode,
    audio,
  ]);

  const switchCamera = useCallback(async () => {
    const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
    setCurrentFacingMode(newFacingMode);

    if (isStreaming) {
      await startCamera();
    }
  }, [currentFacingMode, isStreaming, startCamera]);

  const capturePhoto = useCallback(async (): Promise<CapturedPhoto | null> => {
    if (!stream || !isStreaming) {
      setError('Camera is not active');
      return null;
    }

    try {
      // Create video element if not exists
      if (!videoRef.current) {
        videoRef.current = document.createElement('video');
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Wait for video to be ready
      await new Promise<void>(resolve => {
        if (videoRef.current!.readyState >= 2) {
          resolve();
        } else {
          videoRef.current!.addEventListener('loadeddata', () => resolve(), {
            once: true,
          });
        }
      });

      const video = videoRef.current;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Create canvas if not exists
      if (!canvasRef.current) {
        canvasRef.current = document.createElement('canvas');
      }

      const canvas = canvasRef.current;
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Could not get canvas context');
      }

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, videoWidth, videoHeight);

      // Convert to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          blob => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create image blob'));
            }
          },
          'image/jpeg',
          0.9
        );
      });

      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

      return {
        dataUrl,
        blob,
        width: videoWidth,
        height: videoHeight,
        timestamp: Date.now(),
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to capture photo';
      setError(errorMessage);
      return null;
    }
  }, [stream, isStreaming]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    stream,
    isStreaming,
    isLoading,
    error,
    isSupported,
    startCamera,
    stopCamera,
    capturePhoto,
    switchCamera,
  };
}
