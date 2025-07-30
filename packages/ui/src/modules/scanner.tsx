import React, { useRef, useEffect, useState, useCallback } from 'react';
import { BarcodeFormat } from '@zxing/library';
import { useQRScanner, type BarcodeResult } from '../hooks/use-qr-scanner';
import { Button } from '../components/primitives/button';
import { Badge } from '../components/primitives/badge';
import { Card } from '../components/primitives/card';
import { Icon } from '../components/primitives/icon';
import { Alert } from '../components/primitives/alert';
import { Switch } from '../components/primitives/switch';
import { Select } from '../components/primitives/select';
import { GrantPermissions } from '../components/modules/grant-permissions';
import { EmptyState } from '../components/structures/empty-state';
import { clsx } from 'clsx';

export interface ScannerProps {
  className?: string;
  continuous?: boolean;
  formats?: BarcodeFormat[];
  onResult?: (result: BarcodeResult) => void;
  onError?: (error: string) => void;
  showHistory?: boolean;
  showFormatSelector?: boolean;
  showPermissionRequest?: boolean;
  autoStart?: boolean;
  overlay?: React.ReactNode;
  width?: number;
  height?: number;
  facingMode?: 'user' | 'environment';
  scanInterval?: number;
  enableBeep?: boolean;
  enableVibration?: boolean;
  maxResults?: number;
  variant?: 'default' | 'minimal' | 'full' | 'embedded';
}

// Permission configuration for camera access
const CAMERA_PERMISSION = {
  type: 'camera' as const,
  name: 'Camera Access',
  title: 'Camera Permission Required',
  description: 'Allow camera access to scan QR codes and barcodes',
  icon: '📷',
  feature: 'QR & Barcode Scanning',
  reason:
    'We need camera access to scan QR codes and barcodes from your device camera.',
  benefits: [
    'Instantly scan QR codes and barcodes',
    'Support for multiple barcode formats',
    'Real-time scanning with live preview',
    'Secure local processing',
  ],
  permissions: ['camera'] as const,
};

export function Scanner({
  className,
  continuous = true,
  formats,
  onResult,
  onError,
  showHistory = true,
  showFormatSelector = true,
  showPermissionRequest = true,
  autoStart = false,
  overlay,
  width = 640,
  height = 480,
  facingMode = 'environment',
  scanInterval = 300,
  enableBeep = true,
  enableVibration = true,
  maxResults = 50,
  variant = 'default',
}: ScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [selectedFormats, setSelectedFormats] = useState<BarcodeFormat[]>(
    formats || [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.EAN_13,
      BarcodeFormat.CODE_128,
    ]
  );
  const [permissionState, setPermissionState] = useState<
    'prompt' | 'granted' | 'denied'
  >('prompt');
  const [showPermissions, setShowPermissions] = useState(false);
  const [settings, setSettings] = useState({
    enableBeep,
    enableVibration,
    continuous,
  });

  // Enhanced result handler with audio/haptic feedback
  const handleResult = useCallback(
    (result: BarcodeResult) => {
      // Audio feedback
      if (settings.enableBeep && audioRef.current) {
        audioRef.current.play().catch(() => {
          // Ignore audio play errors (user interaction required)
        });
      }

      // Haptic feedback
      if (settings.enableVibration && 'vibrate' in navigator) {
        navigator.vibrate(100);
      }

      // Call external handler
      if (onResult) {
        onResult(result);
      }
    },
    [onResult, settings.enableBeep, settings.enableVibration]
  );

  // Enhanced error handler
  const handleError = useCallback(
    (error: string) => {
      if (
        error.includes('Permission denied') ||
        error.includes('NotAllowedError')
      ) {
        setPermissionState('denied');
        setShowPermissions(true);
      }

      if (onError) {
        onError(error);
      }
    },
    [onError]
  );

  const scanner = useQRScanner({
    continuous: settings.continuous,
    formats: selectedFormats,
    onResult: handleResult,
    onError: handleError,
    facingMode,
    scanInterval,
  });

  // Check permission state
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const result = await navigator.permissions.query({
          name: 'camera' as PermissionName,
        });
        setPermissionState(result.state as 'prompt' | 'granted' | 'denied');

        result.addEventListener('change', () => {
          setPermissionState(result.state as 'prompt' | 'granted' | 'denied');
        });
      } catch (err) {
        // Fallback for browsers that don't support permissions API
        setPermissionState('prompt');
      }
    };

    checkPermission();
  }, []);

  // Auto-start scanning if requested and permission granted
  useEffect(() => {
    if (autoStart && scanner.isSupported && permissionState === 'granted') {
      scanner.startScanning();
    }
  }, [autoStart, scanner.isSupported, permissionState, scanner.startScanning]);

  // Set up video element
  useEffect(() => {
    if (scanner.stream && videoRef.current) {
      videoRef.current.srcObject = scanner.stream;
    }
  }, [scanner.stream]);

  // Draw bounding box overlay for detected barcodes
  useEffect(() => {
    if (
      scanner.lastResult?.boundingBox &&
      overlayRef.current &&
      videoRef.current
    ) {
      const video = videoRef.current;
      const overlay = overlayRef.current;
      const { boundingBox } = scanner.lastResult;

      const scaleX = video.clientWidth / video.videoWidth;
      const scaleY = video.clientHeight / video.videoHeight;

      overlay.style.left = `${boundingBox.x * scaleX}px`;
      overlay.style.top = `${boundingBox.y * scaleY}px`;
      overlay.style.width = `${boundingBox.width * scaleX}px`;
      overlay.style.height = `${boundingBox.height * scaleY}px`;
      overlay.style.display = 'block';

      // Hide after 2 seconds
      setTimeout(() => {
        if (overlay) {
          overlay.style.display = 'none';
        }
      }, 2000);
    }
  }, [scanner.lastResult]);

  // Limit results to maxResults
  const limitedResults = scanner.results.slice(-maxResults);

  const handleFormatToggle = (format: BarcodeFormat) => {
    setSelectedFormats(prev => {
      const newFormats = prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format];
      return newFormats.length > 0 ? newFormats : [format];
    });
  };

  const handleGrantPermission = async () => {
    try {
      await scanner.startScanning();
      setPermissionState('granted');
      setShowPermissions(false);
    } catch (err) {
      setPermissionState('denied');
    }
  };

  const handleOpenSettings = () => {
    // For web apps, we can't directly open system settings
    // But we can provide instructions
    alert(
      'Please enable camera access in your browser settings and refresh the page.'
    );
  };

  const formatDisplayNames: Partial<Record<BarcodeFormat, string>> = {
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

  // Show permission request if needed
  if (
    showPermissionRequest &&
    showPermissions &&
    permissionState !== 'granted'
  ) {
    return (
      <div className={clsx('flex flex-col space-y-4', className)}>
        <GrantPermissions
          permission={CAMERA_PERMISSION}
          permissionState={permissionState}
          onGrant={handleGrantPermission}
          onOpenSettings={handleOpenSettings}
        />
      </div>
    );
  }

  // Show unsupported message
  if (!scanner.isSupported) {
    return (
      <div className={clsx('flex flex-col space-y-4', className)}>
        <EmptyState
          icon='📷'
          title='Camera Not Supported'
          description="Your browser or device doesn't support camera access for barcode scanning."
          action={
            <Button variant='outline' onClick={() => window.location.reload()}>
              <Icon name='refresh-cw' className='w-4 h-4 mr-2' />
              Refresh Page
            </Button>
          }
        />
      </div>
    );
  }

  const isMinimal = variant === 'minimal';
  const isEmbedded = variant === 'embedded';
  const isFull = variant === 'full';

  return (
    <div className={clsx('flex flex-col space-y-4', className)}>
      {/* Hidden audio element for beep sound */}
      <audio ref={audioRef} preload='auto' className='hidden'>
        <source
          src='data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFA=='
          type='audio/wav'
        />
      </audio>

      {/* Scanner Container */}
      <Card className='relative overflow-hidden'>
        <div className='relative' style={{ width, height }}>
          {/* Video Stream */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className='w-full h-full object-cover bg-black'
            style={{ width, height }}
          />

          {/* Custom Overlay */}
          {overlay && (
            <div className='absolute inset-0 flex items-center justify-center'>
              {overlay}
            </div>
          )}

          {/* Detection Overlay */}
          <div
            ref={overlayRef}
            className='absolute border-2 border-green-500 bg-green-500/20 hidden rounded-md'
            style={{ display: 'none' }}
          />

          {/* Scanning Status */}
          {scanner.isScanning && (
            <div className='absolute top-4 left-4'>
              <Badge className='bg-green-600 text-white'>
                <Icon name='scan' className='w-3 h-3 mr-1 animate-pulse' />
                Scanning...
              </Badge>
            </div>
          )}

          {/* Format Badge */}
          {!isMinimal && selectedFormats.length > 0 && (
            <div className='absolute top-4 right-4'>
              <Badge className='bg-black/50 text-white border-white/20'>
                {selectedFormats.length === 1
                  ? formatDisplayNames[selectedFormats[0]] || 'Unknown'
                  : `${selectedFormats.length} formats`}
              </Badge>
            </div>
          )}

          {/* Error Display */}
          {scanner.error && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
              <Card className='p-4 max-w-sm mx-4'>
                <div className='flex items-center space-x-2 text-red-600'>
                  <Icon name='alert-circle' className='w-5 h-5' />
                  <span className='font-medium'>Error</span>
                </div>
                <p className='mt-2 text-sm text-gray-600'>{scanner.error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className='mt-3 w-full'
                  size='sm'
                >
                  Retry
                </Button>
              </Card>
            </div>
          )}

          {/* Loading State */}
          {scanner.isLoading && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
              <div className='flex items-center space-x-2 text-white'>
                <Icon name='loader' className='w-5 h-5 animate-spin' />
                <span>Starting camera...</span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Controls */}
      {!isEmbedded && (
        <div className='flex justify-center space-x-2 flex-wrap'>
          <Button
            onClick={
              scanner.isScanning ? scanner.stopScanning : scanner.startScanning
            }
            disabled={scanner.isLoading}
            variant={scanner.isScanning ? 'destructive' : 'default'}
          >
            <Icon
              name={scanner.isScanning ? 'stop-circle' : 'play-circle'}
              className='w-4 h-4 mr-2'
            />
            {scanner.isScanning ? 'Stop' : 'Start'} Scanning
          </Button>

          <Button
            onClick={scanner.switchCamera}
            variant='outline'
            disabled={!scanner.isStreaming}
          >
            <Icon name='rotate-cw' className='w-4 h-4 mr-2' />
            Switch Camera
          </Button>

          {showHistory && limitedResults.length > 0 && (
            <Button onClick={scanner.clearResults} variant='outline'>
              <Icon name='trash-2' className='w-4 h-4 mr-2' />
              Clear History
            </Button>
          )}
        </div>
      )}

      {/* Settings Panel */}
      {isFull && (
        <Card className='p-4'>
          <h4 className='font-medium mb-3'>Scanner Settings</h4>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <label className='text-sm font-medium'>Continuous Scanning</label>
              <Switch
                checked={settings.continuous}
                onCheckedChange={checked =>
                  setSettings(prev => ({ ...prev, continuous: checked }))
                }
              />
            </div>
            <div className='flex items-center justify-between'>
              <label className='text-sm font-medium'>Audio Feedback</label>
              <Switch
                checked={settings.enableBeep}
                onCheckedChange={checked =>
                  setSettings(prev => ({ ...prev, enableBeep: checked }))
                }
              />
            </div>
            <div className='flex items-center justify-between'>
              <label className='text-sm font-medium'>Haptic Feedback</label>
              <Switch
                checked={settings.enableVibration}
                onCheckedChange={checked =>
                  setSettings(prev => ({ ...prev, enableVibration: checked }))
                }
                disabled={!('vibrate' in navigator)}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Format Selector */}
      {showFormatSelector && !isMinimal && (
        <Card className='p-4'>
          <h4 className='font-medium mb-3'>
            Barcode Formats ({selectedFormats.length} selected)
          </h4>
          <div className='flex flex-wrap gap-2'>
            {scanner.supportedFormats.map(format => (
              <Button
                key={format}
                onClick={() => handleFormatToggle(format)}
                variant={
                  selectedFormats.includes(format) ? 'default' : 'outline'
                }
                size='sm'
              >
                {formatDisplayNames[format] || format}
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Last Result */}
      {scanner.lastResult && !isMinimal && (
        <Card className='p-4'>
          <h4 className='font-medium mb-2'>Last Scan Result</h4>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Badge>{scanner.lastResult.formatName}</Badge>
              <span className='text-xs text-gray-500'>
                {new Date(scanner.lastResult.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className='p-3 bg-gray-50 rounded-md font-mono text-sm break-all'>
              {scanner.lastResult.text}
            </div>
            {scanner.lastResult.boundingBox && (
              <div className='text-xs text-gray-500'>
                Position: {Math.round(scanner.lastResult.boundingBox.x)},{' '}
                {Math.round(scanner.lastResult.boundingBox.y)}(
                {Math.round(scanner.lastResult.boundingBox.width)}×
                {Math.round(scanner.lastResult.boundingBox.height)})
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Scan History */}
      {showHistory && limitedResults.length > 0 && !isMinimal && (
        <Card className='p-4'>
          <h4 className='font-medium mb-3'>
            Scan History ({limitedResults.length}/{maxResults})
          </h4>
          <div className='space-y-2 max-h-48 overflow-y-auto'>
            {limitedResults
              .slice()
              .reverse()
              .map((result, index) => (
                <div
                  key={`${result.timestamp}-${index}`}
                  className='flex items-start justify-between p-2 bg-gray-50 rounded text-sm hover:bg-gray-100 transition-colors'
                >
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center space-x-2 mb-1'>
                      <Badge className='text-xs'>{result.formatName}</Badge>
                      <span className='text-xs text-gray-500'>
                        {new Date(result.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className='font-mono text-xs text-gray-700 truncate'>
                      {result.text}
                    </div>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => navigator.clipboard?.writeText(result.text)}
                    className='ml-2 h-6 w-6 p-0'
                  >
                    <Icon name='copy' className='w-3 h-3' />
                  </Button>
                </div>
              ))}
          </div>
        </Card>
      )}

      {/* Statistics */}
      {isFull && limitedResults.length > 0 && (
        <Card className='p-4'>
          <h4 className='font-medium mb-3'>Scan Statistics</h4>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <span className='text-gray-500'>Total Scans:</span>
              <span className='ml-2 font-medium'>{limitedResults.length}</span>
            </div>
            <div>
              <span className='text-gray-500'>Most Common:</span>
              <span className='ml-2 font-medium'>
                {Object.entries(
                  limitedResults.reduce(
                    (acc, result) => {
                      acc[result.formatName] =
                        (acc[result.formatName] || 0) + 1;
                      return acc;
                    },
                    {} as Record<string, number>
                  )
                ).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'}
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
