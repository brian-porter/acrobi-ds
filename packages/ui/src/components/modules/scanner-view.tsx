import React, { useRef, useEffect, useState } from 'react';
import { BarcodeFormat } from '@zxing/library';
import { useQRScanner, type BarcodeResult } from '../../hooks/use-qr-scanner';
import { Button } from '../primitives/button';
import { Badge } from '../primitives/badge';
import { Card } from '../primitives/card';
import { Icon } from '../primitives/icon';
import { clsx } from 'clsx';

export interface ScannerViewProps {
  className?: string;
  continuous?: boolean;
  formats?: BarcodeFormat[];
  onResult?: (result: BarcodeResult) => void;
  onError?: (error: string) => void;
  showHistory?: boolean;
  showFormatSelector?: boolean;
  autoStart?: boolean;
  overlay?: React.ReactNode;
  width?: number;
  height?: number;
}

export function ScannerView({
  className,
  continuous = true,
  formats,
  onResult,
  onError,
  showHistory = true,
  showFormatSelector = true,
  autoStart = false,
  overlay,
  width = 640,
  height = 480,
}: ScannerViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [selectedFormats, setSelectedFormats] = useState<BarcodeFormat[]>(
    formats || [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.EAN_13,
      BarcodeFormat.CODE_128,
    ]
  );

  const scanner = useQRScanner({
    continuous,
    formats: selectedFormats,
    onResult,
    onError,
    facingMode: 'environment',
  });

  // Auto-start scanning if requested
  useEffect(() => {
    if (autoStart && scanner.isSupported) {
      scanner.startScanning();
    }
  }, [autoStart, scanner.isSupported, scanner.startScanning]);

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

  const handleFormatToggle = (format: BarcodeFormat) => {
    setSelectedFormats(prev => {
      const newFormats = prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format];
      return newFormats.length > 0 ? newFormats : [format];
    });
  };

  const formatDisplayNames: Record<BarcodeFormat, string> = {
    [BarcodeFormat.QR_CODE]: 'QR',
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

  if (!scanner.isSupported) {
    return (
      <Card className={clsx('p-6 text-center', className)}>
        <Icon
          name='camera-off'
          className='w-12 h-12 mx-auto mb-4 text-gray-400'
        />
        <h3 className='text-lg font-medium mb-2'>Camera Not Supported</h3>
        <p className='text-gray-600'>
          Your browser or device doesn't support camera access for barcode
          scanning.
        </p>
      </Card>
    );
  }

  return (
    <div className={clsx('flex flex-col space-y-4', className)}>
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
            className='absolute border-2 border-green-500 bg-green-500/20 hidden'
            style={{ display: 'none' }}
          />

          {/* Scanning Status */}
          {scanner.isScanning && (
            <div className='absolute top-4 left-4'>
              <Badge variant='default' className='bg-green-600'>
                <Icon name='scan' className='w-3 h-3 mr-1' />
                Scanning...
              </Badge>
            </div>
          )}

          {/* Error Display */}
          {scanner.error && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
              <Card className='p-4 max-w-sm'>
                <div className='flex items-center space-x-2 text-red-600'>
                  <Icon name='alert-circle' className='w-5 h-5' />
                  <span className='font-medium'>Error</span>
                </div>
                <p className='mt-2 text-sm text-gray-600'>{scanner.error}</p>
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
      <div className='flex justify-center space-x-2'>
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

        {showHistory && scanner.results.length > 0 && (
          <Button onClick={scanner.clearResults} variant='outline'>
            <Icon name='trash-2' className='w-4 h-4 mr-2' />
            Clear History
          </Button>
        )}
      </div>

      {/* Format Selector */}
      {showFormatSelector && (
        <Card className='p-4'>
          <h4 className='font-medium mb-3'>Barcode Formats</h4>
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
      {scanner.lastResult && (
        <Card className='p-4'>
          <h4 className='font-medium mb-2'>Last Scan Result</h4>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Badge variant='outline'>{scanner.lastResult.formatName}</Badge>
              <span className='text-xs text-gray-500'>
                {new Date(scanner.lastResult.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className='p-3 bg-gray-50 rounded-md font-mono text-sm break-all'>
              {scanner.lastResult.text}
            </div>
          </div>
        </Card>
      )}

      {/* Scan History */}
      {showHistory && scanner.results.length > 0 && (
        <Card className='p-4'>
          <h4 className='font-medium mb-3'>
            Scan History ({scanner.results.length})
          </h4>
          <div className='space-y-2 max-h-48 overflow-y-auto'>
            {scanner.results
              .slice()
              .reverse()
              .map((result, index) => (
                <div
                  key={`${result.timestamp}-${index}`}
                  className='flex items-start justify-between p-2 bg-gray-50 rounded text-sm'
                >
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center space-x-2 mb-1'>
                      <Badge variant='outline' className='text-xs'>
                        {result.formatName}
                      </Badge>
                      <span className='text-xs text-gray-500'>
                        {new Date(result.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className='font-mono text-xs text-gray-700 truncate'>
                      {result.text}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}
    </div>
  );
}
