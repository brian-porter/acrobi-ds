import { useState, useRef, useCallback, useEffect } from 'react';
import {
  BrowserMultiFormatReader,
  Result,
  BarcodeFormat,
  DecodeHintType,
} from '@zxing/library';
import { useCamera, type CameraOptions } from './use-camera';

// Enhanced barcode result interface with ZXing integration
export interface BarcodeResult {
  text: string;
  format: BarcodeFormat;
  formatName: string;
  timestamp: number;
  confidence?: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  metadata?: Record<string, any>;
}

export interface QRScannerOptions extends CameraOptions {
  continuous?: boolean;
  scanInterval?: number;
  formats?: BarcodeFormat[];
  tryHarder?: boolean;
  enabledDecoders?: string[];
  onResult?: (result: BarcodeResult) => void;
  onError?: (error: string) => void;
}

export interface UseQRScannerReturn {
  // Camera functionality
  stream: MediaStream | null;
  isStreaming: boolean;
  isLoading: boolean;
  error: string | null;
  isSupported: boolean;
  startScanning: () => Promise<void>;
  stopScanning: () => void;

  // QR/Barcode scanning
  isScanning: boolean;
  lastResult: BarcodeResult | null;
  results: BarcodeResult[];
  clearResults: () => void;

  // Scanner controls
  switchCamera: () => Promise<void>;
  captureFrame: () => Promise<string | null>;

  // Format management
  supportedFormats: BarcodeFormat[];
  enabledFormats: BarcodeFormat[];
  setEnabledFormats: (formats: BarcodeFormat[]) => void;
}

// Default supported barcode formats
const DEFAULT_FORMATS: BarcodeFormat[] = [
  BarcodeFormat.QR_CODE,
  BarcodeFormat.EAN_13,
  BarcodeFormat.EAN_8,
  BarcodeFormat.CODE_128,
  BarcodeFormat.CODE_39,
  BarcodeFormat.CODE_93,
  BarcodeFormat.CODABAR,
  BarcodeFormat.ITF,
  BarcodeFormat.PDF_417,
  BarcodeFormat.DATA_MATRIX,
  BarcodeFormat.AZTEC,
];

export function useQRScanner(
  options: QRScannerOptions = {}
): UseQRScannerReturn {
  const {
    continuous = true,
    scanInterval = 300,
    formats = DEFAULT_FORMATS,
    tryHarder = true,
    enabledDecoders,
    onResult,
    onError,
    ...cameraOptions
  } = options;

  const camera = useCamera(cameraOptions);
  const [isScanning, setIsScanning] = useState(false);
  const [lastResult, setLastResult] = useState<BarcodeResult | null>(null);
  const [results, setResults] = useState<BarcodeResult[]>([]);
  const [scanError, setScanError] = useState<string | null>(null);
  const [enabledFormats, setEnabledFormats] =
    useState<BarcodeFormat[]>(formats);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  // Initialize ZXing reader
  useEffect(() => {
    if (!readerRef.current) {
      const reader = new BrowserMultiFormatReader();

      // Configure decode hints
      const hints = new Map();
      hints.set(DecodeHintType.POSSIBLE_FORMATS, enabledFormats);
      hints.set(DecodeHintType.TRY_HARDER, tryHarder);

      if (enabledDecoders) {
        hints.set(DecodeHintType.ENABLED_DECODERS, enabledDecoders);
      }

      reader.setHints(hints);
      readerRef.current = reader;
    }
  }, [enabledFormats, tryHarder, enabledDecoders]);

  // Format name mapper
  const getFormatName = useCallback((format: BarcodeFormat): string => {
    const formatNames: Record<BarcodeFormat, string> = {
      [BarcodeFormat.QR_CODE]: 'QR Code',
      [BarcodeFormat.EAN_13]: 'EAN-13',
      [BarcodeFormat.EAN_8]: 'EAN-8',
      [BarcodeFormat.CODE_128]: 'Code 128',
      [BarcodeFormat.CODE_39]: 'Code 39',
      [BarcodeFormat.CODE_93]: 'Code 93',
      [BarcodeFormat.CODABAR]: 'Codabar',
      [BarcodeFormat.ITF]: 'ITF',
      [BarcodeFormat.PDF_417]: 'PDF417',
      [BarcodeFormat.DATA_MATRIX]: 'Data Matrix',
      [BarcodeFormat.AZTEC]: 'Aztec',
      [BarcodeFormat.UPC_A]: 'UPC-A',
      [BarcodeFormat.UPC_E]: 'UPC-E',
      [BarcodeFormat.RSS_14]: 'RSS-14',
      [BarcodeFormat.RSS_EXPANDED]: 'RSS Expanded',
      [BarcodeFormat.MAXICODE]: 'MaxiCode',
    };
    return formatNames[format] || 'Unknown';
  }, []);

  // Enhanced barcode detection with ZXing
  const detectBarcodes = useCallback(async (): Promise<BarcodeResult[]> => {
    if (!readerRef.current || !videoRef.current || !canvasRef.current) {
      return [];
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx || video.readyState < 2) {
      return [];
    }

    try {
      // Set canvas size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw current video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Use ZXing to decode
      const result: Result = await readerRef.current.decodeFromCanvas(canvas);

      if (result) {
        const barcodeResult: BarcodeResult = {
          text: result.getText(),
          format: result.getBarcodeFormat(),
          formatName: getFormatName(result.getBarcodeFormat()),
          timestamp: Date.now(),
          metadata: {},
        };

        // Add result points (bounding box) if available
        const resultPoints = result.getResultPoints();
        if (resultPoints && resultPoints.length > 0) {
          const points = resultPoints.map(p => ({ x: p.getX(), y: p.getY() }));
          const minX = Math.min(...points.map(p => p.x));
          const maxX = Math.max(...points.map(p => p.x));
          const minY = Math.min(...points.map(p => p.y));
          const maxY = Math.max(...points.map(p => p.y));

          barcodeResult.boundingBox = {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
          };
        }

        // Add metadata if available
        const resultMetadata = result.getResultMetadata();
        if (resultMetadata) {
          barcodeResult.metadata = Object.fromEntries(resultMetadata);
        }

        return [barcodeResult];
      }
    } catch (err) {
      // ZXing throws exceptions when no barcode is found, which is normal
      // Only log actual errors, not "not found" exceptions
      if (err instanceof Error && !err.message.includes('No')) {
        console.warn('ZXing decode error:', err);
      }
    }

    return [];
  }, [getFormatName]);

  // Scanning loop with ZXing integration
  const startScanningLoop = useCallback(() => {
    if (scanIntervalRef.current) return;

    scanIntervalRef.current = setInterval(async () => {
      if (isScanning && camera.isStreaming) {
        try {
          const detectedBarcodes = await detectBarcodes();

          if (detectedBarcodes.length > 0) {
            const newResult = detectedBarcodes[0];
            setLastResult(newResult);

            // Call onResult callback if provided
            if (onResult) {
              onResult(newResult);
            }

            if (continuous) {
              setResults(prev => {
                // Avoid duplicates within 2 seconds
                const isDuplicate = prev.some(
                  result =>
                    result.text === newResult.text &&
                    result.format === newResult.format &&
                    Math.abs(result.timestamp - newResult.timestamp) < 2000
                );

                if (!isDuplicate) {
                  return [...prev, newResult].slice(-20); // Keep last 20 results
                }
                return prev;
              });
            } else {
              setResults([newResult]);
              setIsScanning(false);
            }

            setScanError(null);
          }
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : 'Scanning failed';
          console.error('Scanning error:', err);
          setScanError(errorMessage);

          if (onError) {
            onError(errorMessage);
          }
        }
      }
    }, scanInterval);
  }, [
    isScanning,
    camera.isStreaming,
    detectBarcodes,
    continuous,
    scanInterval,
    onResult,
    onError,
  ]);

  const stopScanningLoop = useCallback(() => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  }, []);

  const startScanning = useCallback(async () => {
    setScanError(null);
    await camera.startCamera();
    setIsScanning(true);
  }, [camera]);

  const stopScanning = useCallback(() => {
    setIsScanning(false);
    stopScanningLoop();
    camera.stopCamera();
  }, [camera, stopScanningLoop]);

  const clearResults = useCallback(() => {
    setResults([]);
    setLastResult(null);
  }, []);

  const captureFrame = useCallback(async (): Promise<string | null> => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx || video.readyState < 2) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/jpeg', 0.9);
  }, []);

  // Set up video reference when stream is available
  useEffect(() => {
    if (camera.stream && !videoRef.current) {
      videoRef.current = document.createElement('video');
      videoRef.current.autoplay = true;
      videoRef.current.playsInline = true;
      videoRef.current.muted = true;
    }

    if (camera.stream && videoRef.current) {
      videoRef.current.srcObject = camera.stream;
    }
  }, [camera.stream]);

  // Set up canvas reference
  useEffect(() => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }
  }, []);

  // Start/stop scanning loop based on isScanning state
  useEffect(() => {
    if (isScanning && camera.isStreaming) {
      startScanningLoop();
    } else {
      stopScanningLoop();
    }

    return stopScanningLoop;
  }, [isScanning, camera.isStreaming, startScanningLoop, stopScanningLoop]);

  // Update reader hints when formats change
  useEffect(() => {
    if (readerRef.current) {
      const hints = new Map();
      hints.set(DecodeHintType.POSSIBLE_FORMATS, enabledFormats);
      hints.set(DecodeHintType.TRY_HARDER, tryHarder);

      if (enabledDecoders) {
        hints.set(DecodeHintType.ENABLED_DECODERS, enabledDecoders);
      }

      readerRef.current.setHints(hints);
    }
  }, [enabledFormats, tryHarder, enabledDecoders]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanningLoop();
      camera.stopCamera();
      if (readerRef.current) {
        try {
          readerRef.current.reset();
        } catch (err) {
          // Ignore cleanup errors
        }
      }
    };
  }, [stopScanningLoop, camera]);

  const isSupported = camera.isSupported && typeof window !== 'undefined';

  return {
    // Camera functionality
    stream: camera.stream,
    isStreaming: camera.isStreaming,
    isLoading: camera.isLoading,
    error: camera.error || scanError,
    isSupported,
    startScanning,
    stopScanning,

    // QR/Barcode scanning
    isScanning,
    lastResult,
    results,
    clearResults,

    // Scanner controls
    switchCamera: camera.switchCamera,
    captureFrame,

    // Format management
    supportedFormats: DEFAULT_FORMATS,
    enabledFormats,
    setEnabledFormats,
  };
}
