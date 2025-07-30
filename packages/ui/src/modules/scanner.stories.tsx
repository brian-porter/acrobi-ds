import type { Meta, StoryObj } from '@storybook/react';
import { BarcodeFormat } from '@zxing/library';
import { Scanner } from './scanner';
import { useState } from 'react';
import { BarcodeResult } from '../hooks/use-qr-scanner';

const meta: Meta<typeof Scanner> = {
  title: 'Modules/Scanner',
  component: Scanner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Enhanced AAE QR & Barcode Scanner module with ZXing integration, permission handling, and comprehensive feedback options.',
      },
    },
  },
  argTypes: {
    onResult: { action: 'result-scanned' },
    onError: { action: 'error-occurred' },
    formats: {
      control: { type: 'multi-select' },
      options: Object.values(BarcodeFormat).filter(f => typeof f === 'number'),
      mapping: {
        'QR Code': BarcodeFormat.QR_CODE,
        'EAN-13': BarcodeFormat.EAN_13,
        'EAN-8': BarcodeFormat.EAN_8,
        'Code 128': BarcodeFormat.CODE_128,
        'Code 39': BarcodeFormat.CODE_39,
        PDF417: BarcodeFormat.PDF_417,
        'Data Matrix': BarcodeFormat.DATA_MATRIX,
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'full', 'embedded'],
    },
    facingMode: {
      control: { type: 'select' },
      options: ['user', 'environment'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Scanner>;

// Template with result handling
const ScannerWithResults = (args: any) => {
  const [results, setResults] = useState<BarcodeResult[]>([]);
  const [lastError, setLastError] = useState<string | null>(null);

  const handleResult = (result: BarcodeResult) => {
    setResults(prev => [result, ...prev.slice(0, 4)]); // Keep last 5 results
    setLastError(null);
    if (args.onResult) args.onResult(result);
  };

  const handleError = (error: string) => {
    setLastError(error);
    if (args.onError) args.onError(error);
  };

  return (
    <div className='space-y-4'>
      <Scanner {...args} onResult={handleResult} onError={handleError} />

      {/* Results Display */}
      {results.length > 0 && (
        <div className='bg-gray-50 p-4 rounded-lg max-w-md'>
          <h4 className='font-medium mb-2'>Scan Results:</h4>
          {results.map((result, index) => (
            <div
              key={`${result.timestamp}-${index}`}
              className='text-sm mb-2 p-2 bg-white rounded'
            >
              <div className='font-mono text-xs text-gray-600'>
                {result.formatName}
              </div>
              <div className='font-mono'>{result.text}</div>
            </div>
          ))}
        </div>
      )}

      {/* Error Display */}
      {lastError && (
        <div className='bg-red-50 p-4 rounded-lg max-w-md'>
          <h4 className='font-medium text-red-800 mb-2'>Last Error:</h4>
          <div className='text-sm text-red-600'>{lastError}</div>
        </div>
      )}
    </div>
  );
};

export const Default: Story = {
  render: ScannerWithResults,
  args: {
    width: 400,
    height: 300,
    continuous: true,
    showHistory: true,
    showFormatSelector: true,
    showPermissionRequest: true,
    enableBeep: true,
    enableVibration: true,
  },
};

export const Minimal: Story = {
  render: ScannerWithResults,
  args: {
    variant: 'minimal',
    width: 320,
    height: 240,
    continuous: true,
    showHistory: false,
    showFormatSelector: false,
    enableBeep: false,
    enableVibration: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimal scanner variant with just the video feed and basic controls.',
      },
    },
  },
};

export const Embedded: Story = {
  render: ScannerWithResults,
  args: {
    variant: 'embedded',
    width: 280,
    height: 200,
    continuous: true,
    showHistory: false,
    showFormatSelector: false,
    autoStart: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Embedded scanner for integration within other components. No visible controls.',
      },
    },
  },
};

export const FullFeatured: Story = {
  render: ScannerWithResults,
  args: {
    variant: 'full',
    width: 500,
    height: 375,
    continuous: true,
    showHistory: true,
    showFormatSelector: true,
    enableBeep: true,
    enableVibration: true,
    maxResults: 20,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Full-featured scanner with all settings, statistics, and comprehensive history.',
      },
    },
  },
};

export const QROnly: Story = {
  render: ScannerWithResults,
  args: {
    formats: [BarcodeFormat.QR_CODE],
    width: 350,
    height: 350,
    continuous: true,
    showFormatSelector: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Scanner configured specifically for QR codes only.',
      },
    },
  },
};

export const BarcodeOnly: Story = {
  render: ScannerWithResults,
  args: {
    formats: [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.CODE_128,
      BarcodeFormat.CODE_39,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
    ],
    width: 450,
    height: 280,
    continuous: true,
    showFormatSelector: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Scanner optimized for traditional barcodes (no QR codes).',
      },
    },
  },
};

export const FrontCamera: Story = {
  render: ScannerWithResults,
  args: {
    facingMode: 'user',
    width: 350,
    height: 300,
    continuous: true,
    formats: [BarcodeFormat.QR_CODE],
  },
  parameters: {
    docs: {
      description: {
        story: 'Scanner using front-facing camera (selfie mode).',
      },
    },
  },
};

export const SingleScan: Story = {
  render: ScannerWithResults,
  args: {
    continuous: false,
    width: 400,
    height: 300,
    showHistory: true,
    enableBeep: true,
    enableVibration: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Scanner that stops after each successful scan (single-shot mode).',
      },
    },
  },
};

export const FastScanning: Story = {
  render: ScannerWithResults,
  args: {
    scanInterval: 100,
    width: 400,
    height: 300,
    continuous: true,
    enableBeep: false, // Disabled to avoid rapid beeping
    enableVibration: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'High-frequency scanning for maximum responsiveness (100ms intervals).',
      },
    },
  },
};

export const CustomOverlay: Story = {
  render: ScannerWithResults,
  args: {
    width: 400,
    height: 300,
    continuous: true,
    overlay: (
      <div className='text-white text-center'>
        <div className='w-48 h-48 border-2 border-white rounded-lg border-dashed flex items-center justify-center'>
          <div className='text-sm'>
            📱
            <br />
            Point camera at code
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Scanner with custom overlay for guided scanning experience.',
      },
    },
  },
};

export const WithPermissionFlow: Story = {
  render: ScannerWithResults,
  args: {
    width: 400,
    height: 300,
    showPermissionRequest: true,
    continuous: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Scanner that demonstrates the permission request flow integration with GrantPermissions module.',
      },
    },
  },
};

// Interactive demo story
export const InteractiveDemo: Story = {
  render: () => {
    const [config, setConfig] = useState({
      variant: 'default' as const,
      continuous: true,
      enableBeep: true,
      enableVibration: true,
      showHistory: true,
      showFormatSelector: true,
      width: 400,
      height: 300,
      formats: [
        BarcodeFormat.QR_CODE,
        BarcodeFormat.EAN_13,
        BarcodeFormat.CODE_128,
      ],
    });

    const [results, setResults] = useState<BarcodeResult[]>([]);

    const handleResult = (result: BarcodeResult) => {
      setResults(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
    };

    return (
      <div className='space-y-4 max-w-4xl'>
        {/* Configuration Panel */}
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-medium mb-3'>Scanner Configuration</h3>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Variant</label>
              <select
                value={config.variant}
                onChange={e =>
                  setConfig(prev => ({
                    ...prev,
                    variant: e.target.value as any,
                  }))
                }
                className='w-full p-2 border rounded'
              >
                <option value='default'>Default</option>
                <option value='minimal'>Minimal</option>
                <option value='full'>Full</option>
                <option value='embedded'>Embedded</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Size</label>
              <select
                value={`${config.width}x${config.height}`}
                onChange={e => {
                  const [width, height] = e.target.value.split('x').map(Number);
                  setConfig(prev => ({ ...prev, width, height }));
                }}
                className='w-full p-2 border rounded'
              >
                <option value='320x240'>Small (320×240)</option>
                <option value='400x300'>Medium (400×300)</option>
                <option value='500x375'>Large (500×375)</option>
                <option value='640x480'>Extra Large (640×480)</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4 mt-4'>
            <label className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={config.continuous}
                onChange={e =>
                  setConfig(prev => ({ ...prev, continuous: e.target.checked }))
                }
              />
              <span className='text-sm'>Continuous Scanning</span>
            </label>
            <label className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={config.enableBeep}
                onChange={e =>
                  setConfig(prev => ({ ...prev, enableBeep: e.target.checked }))
                }
              />
              <span className='text-sm'>Audio Feedback</span>
            </label>
            <label className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={config.showHistory}
                onChange={e =>
                  setConfig(prev => ({
                    ...prev,
                    showHistory: e.target.checked,
                  }))
                }
              />
              <span className='text-sm'>Show History</span>
            </label>
            <label className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={config.showFormatSelector}
                onChange={e =>
                  setConfig(prev => ({
                    ...prev,
                    showFormatSelector: e.target.checked,
                  }))
                }
              />
              <span className='text-sm'>Format Selector</span>
            </label>
          </div>
        </div>

        {/* Scanner */}
        <Scanner {...config} onResult={handleResult} />

        {/* Live Results */}
        {results.length > 0 && (
          <div className='bg-green-50 p-4 rounded-lg'>
            <h3 className='font-medium mb-3'>
              Live Scan Results ({results.length})
            </h3>
            <div className='space-y-2 max-h-40 overflow-y-auto'>
              {results.map((result, index) => (
                <div
                  key={`${result.timestamp}-${index}`}
                  className='bg-white p-2 rounded text-sm'
                >
                  <div className='flex justify-between items-center'>
                    <span className='font-medium text-green-700'>
                      {result.formatName}
                    </span>
                    <span className='text-xs text-gray-500'>
                      {new Date(result.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className='font-mono text-xs mt-1 break-all'>
                    {result.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo with live configuration changes and result display.',
      },
    },
  },
};

// Test patterns for demonstration (these would be rendered as images in a real scenario)
export const TestPatterns: Story = {
  render: () => (
    <div className='space-y-4 max-w-2xl'>
      <h3 className='text-lg font-medium'>Test QR Codes & Barcodes</h3>
      <p className='text-sm text-gray-600 mb-4'>
        Use these test patterns with the scanner above. Point your camera at any
        of these codes.
      </p>

      <div className='grid grid-cols-2 gap-4'>
        {/* QR Code examples */}
        <div className='bg-white p-4 border rounded-lg text-center'>
          <h4 className='font-medium mb-2'>QR Code - URL</h4>
          <div className='w-32 h-32 bg-gray-100 mx-auto mb-2 flex items-center justify-center text-xs'>
            QR Code
            <br />
            (https://example.com)
          </div>
          <p className='text-xs text-gray-500'>https://example.com</p>
        </div>

        <div className='bg-white p-4 border rounded-lg text-center'>
          <h4 className='font-medium mb-2'>QR Code - Text</h4>
          <div className='w-32 h-32 bg-gray-100 mx-auto mb-2 flex items-center justify-center text-xs'>
            QR Code
            <br />
            (Hello World!)
          </div>
          <p className='text-xs text-gray-500'>Hello World!</p>
        </div>

        <div className='bg-white p-4 border rounded-lg text-center'>
          <h4 className='font-medium mb-2'>EAN-13 Barcode</h4>
          <div className='w-32 h-16 bg-gray-100 mx-auto mb-2 flex items-center justify-center text-xs'>
            |||||||||||
            <br />
            EAN-13
          </div>
          <p className='text-xs text-gray-500'>1234567890123</p>
        </div>

        <div className='bg-white p-4 border rounded-lg text-center'>
          <h4 className='font-medium mb-2'>Code 128</h4>
          <div className='w-32 h-16 bg-gray-100 mx-auto mb-2 flex items-center justify-center text-xs'>
            ||||||||||||
            <br />
            Code 128
          </div>
          <p className='text-xs text-gray-500'>ABC123DEF456</p>
        </div>
      </div>

      <div className='bg-blue-50 p-4 rounded-lg'>
        <h4 className='font-medium mb-2'>Testing Tips</h4>
        <ul className='text-sm space-y-1'>
          <li>• Ensure good lighting for best scan results</li>
          <li>• Hold the camera steady and at appropriate distance</li>
          <li>• Try different angles if initial scan doesn't work</li>
          <li>• Use the format selector to optimize for specific code types</li>
          <li>• Enable audio/haptic feedback to know when scanning succeeds</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Test patterns and usage guidelines for scanner testing.',
      },
    },
  },
};
