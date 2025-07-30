import type { Meta, StoryObj } from '@storybook/react';
import { BarcodeFormat } from '@zxing/library';
import { useQRScanner } from './use-qr-scanner';
import React from 'react';

// Demo component to showcase the hook
function QRScannerDemo({
  continuous = true,
  formats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13],
  autoStart = false,
}: {
  continuous?: boolean;
  formats?: BarcodeFormat[];
  autoStart?: boolean;
}) {
  const scanner = useQRScanner({
    continuous,
    formats,
    scanInterval: 300,
  });

  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Set up video stream
  React.useEffect(() => {
    if (scanner.stream && videoRef.current) {
      videoRef.current.srcObject = scanner.stream;
    }
  }, [scanner.stream]);

  // Auto-start if requested
  React.useEffect(() => {
    if (autoStart && scanner.isSupported) {
      scanner.startScanning();
    }
  }, [autoStart, scanner.isSupported, scanner.startScanning]);

  if (!scanner.isSupported) {
    return (
      <div className='p-6 border border-red-200 rounded-lg bg-red-50'>
        <h3 className='text-lg font-medium text-red-800 mb-2'>
          Camera Not Supported
        </h3>
        <p className='text-red-600'>
          Your browser doesn't support camera access for QR scanning.
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-4 max-w-2xl'>
      {/* Video Preview */}
      <div className='relative bg-black rounded-lg overflow-hidden'>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className='w-full h-64 object-cover'
        />

        {scanner.isLoading && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
            <div className='text-white'>Starting camera...</div>
          </div>
        )}

        {scanner.error && (
          <div className='absolute inset-0 flex items-center justify-center bg-red-500/50'>
            <div className='text-white font-medium'>Error: {scanner.error}</div>
          </div>
        )}

        {scanner.isScanning && (
          <div className='absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-sm'>
            Scanning...
          </div>
        )}
      </div>

      {/* Controls */}
      <div className='flex gap-2'>
        <button
          onClick={
            scanner.isScanning ? scanner.stopScanning : scanner.startScanning
          }
          disabled={scanner.isLoading}
          className={`px-4 py-2 rounded font-medium ${
            scanner.isScanning
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          } disabled:opacity-50`}
        >
          {scanner.isScanning ? 'Stop' : 'Start'} Scanning
        </button>

        <button
          onClick={scanner.switchCamera}
          disabled={!scanner.isStreaming}
          className='px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-medium disabled:opacity-50'
        >
          Switch Camera
        </button>

        {scanner.results.length > 0 && (
          <button
            onClick={scanner.clearResults}
            className='px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded font-medium'
          >
            Clear Results
          </button>
        )}
      </div>

      {/* Format Controls */}
      <div className='space-y-2'>
        <h4 className='font-medium'>Enabled Formats:</h4>
        <div className='flex flex-wrap gap-2'>
          {scanner.supportedFormats.map(format => (
            <button
              key={format}
              onClick={() => {
                const isEnabled = scanner.enabledFormats.includes(format);
                if (isEnabled) {
                  scanner.setEnabledFormats(
                    scanner.enabledFormats.filter(f => f !== format)
                  );
                } else {
                  scanner.setEnabledFormats([
                    ...scanner.enabledFormats,
                    format,
                  ]);
                }
              }}
              className={`px-3 py-1 rounded text-sm font-medium ${
                scanner.enabledFormats.includes(format)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {format === BarcodeFormat.QR_CODE
                ? 'QR'
                : format === BarcodeFormat.EAN_13
                  ? 'EAN-13'
                  : format === BarcodeFormat.EAN_8
                    ? 'EAN-8'
                    : format === BarcodeFormat.CODE_128
                      ? 'Code 128'
                      : format === BarcodeFormat.CODE_39
                        ? 'Code 39'
                        : `Format ${format}`}
            </button>
          ))}
        </div>
      </div>

      {/* Last Result */}
      {scanner.lastResult && (
        <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
          <h4 className='font-medium text-green-800 mb-2'>Last Scan Result</h4>
          <div className='space-y-1'>
            <div className='text-sm'>
              <strong>Format:</strong> {scanner.lastResult.formatName}
            </div>
            <div className='text-sm'>
              <strong>Text:</strong>
              <code className='ml-2 bg-white px-2 py-1 rounded text-xs'>
                {scanner.lastResult.text}
              </code>
            </div>
            <div className='text-xs text-gray-600'>
              Detected at{' '}
              {new Date(scanner.lastResult.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}

      {/* Results History */}
      {scanner.results.length > 0 && (
        <div className='space-y-2'>
          <h4 className='font-medium'>
            Scan History ({scanner.results.length})
          </h4>
          <div className='max-h-40 overflow-y-auto space-y-1'>
            {scanner.results
              .slice()
              .reverse()
              .map((result, index) => (
                <div
                  key={`${result.timestamp}-${index}`}
                  className='p-2 bg-gray-50 rounded text-sm'
                >
                  <div className='flex justify-between items-start'>
                    <div>
                      <span className='font-medium'>{result.formatName}:</span>
                      <code className='ml-2 text-xs'>{result.text}</code>
                    </div>
                    <span className='text-xs text-gray-500'>
                      {new Date(result.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Debug Info */}
      <div className='text-xs text-gray-500 space-y-1'>
        <div>Supported: {scanner.isSupported ? 'Yes' : 'No'}</div>
        <div>Streaming: {scanner.isStreaming ? 'Yes' : 'No'}</div>
        <div>Scanning: {scanner.isScanning ? 'Yes' : 'No'}</div>
        <div>Loading: {scanner.isLoading ? 'Yes' : 'No'}</div>
        <div>Results Count: {scanner.results.length}</div>
      </div>
    </div>
  );
}

const meta: Meta<typeof QRScannerDemo> = {
  title: 'Hooks/useQRScanner',
  component: QRScannerDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Enhanced QR and barcode scanner hook with ZXing integration. Supports multiple barcode formats, camera management, and real-time scanning.',
      },
    },
  },
  argTypes: {
    continuous: {
      control: 'boolean',
      description: 'Whether to continue scanning after detecting a barcode',
      defaultValue: true,
    },
    formats: {
      control: 'object',
      description: 'Array of barcode formats to detect',
    },
    autoStart: {
      control: 'boolean',
      description: 'Whether to automatically start scanning',
      defaultValue: false,
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    continuous: true,
    formats: [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.EAN_13,
      BarcodeFormat.CODE_128,
    ],
    autoStart: false,
  },
};

export const QRCodeOnly: Story = {
  args: {
    continuous: true,
    formats: [BarcodeFormat.QR_CODE],
    autoStart: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Scanner configured to only detect QR codes.',
      },
    },
  },
};

export const RetailBarcodes: Story = {
  args: {
    continuous: true,
    formats: [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
    ],
    autoStart: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Scanner optimized for retail barcodes (EAN and UPC formats).',
      },
    },
  },
};

export const SingleShotMode: Story = {
  args: {
    continuous: false,
    formats: [BarcodeFormat.QR_CODE],
    autoStart: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Scanner that stops after detecting one barcode.',
      },
    },
  },
};

export const AutoStart: Story = {
  args: {
    continuous: true,
    formats: [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13],
    autoStart: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Scanner that automatically starts scanning when mounted.',
      },
    },
  },
};
