import type { Meta, StoryObj } from '@storybook/react';
import { BarcodeFormat } from '@zxing/library';
import { ScannerView } from './scanner-view';
import React from 'react';

const meta: Meta<typeof ScannerView> = {
  title: 'Modules/Scanner View',
  component: ScannerView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A comprehensive QR and barcode scanner component with ZXing integration, supporting multiple formats and camera management.',
      },
    },
  },
  argTypes: {
    continuous: {
      control: 'boolean',
      description: 'Whether to continue scanning after detecting a barcode',
    },
    formats: {
      control: 'object',
      description: 'Array of barcode formats to detect',
    },
    showHistory: {
      control: 'boolean',
      description: 'Whether to show scan result history',
    },
    showFormatSelector: {
      control: 'boolean',
      description: 'Whether to show format selector controls',
    },
    autoStart: {
      control: 'boolean',
      description: 'Whether to automatically start scanning on mount',
    },
    width: {
      control: 'number',
      description: 'Scanner viewport width in pixels',
    },
    height: {
      control: 'number',
      description: 'Scanner viewport height in pixels',
    },
    onResult: {
      action: 'barcode-detected',
      description: 'Callback fired when a barcode is detected',
    },
    onError: {
      action: 'scanner-error',
      description: 'Callback fired when an error occurs',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    continuous: true,
    showHistory: true,
    showFormatSelector: true,
    autoStart: false,
    width: 640,
    height: 480,
  },
};

export const QRCodeOnly: Story = {
  args: {
    ...Default.args,
    formats: [BarcodeFormat.QR_CODE],
    showFormatSelector: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Scanner configured to only detect QR codes with format selector hidden.',
      },
    },
  },
};

export const RetailBarcodes: Story = {
  args: {
    ...Default.args,
    formats: [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
    ],
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
    ...Default.args,
    continuous: false,
    showHistory: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Scanner stops after detecting one barcode, suitable for single-use scenarios.',
      },
    },
  },
};

export const CompactView: Story = {
  args: {
    ...Default.args,
    width: 320,
    height: 240,
    showHistory: false,
    showFormatSelector: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Compact scanner view suitable for mobile interfaces or space-constrained layouts.',
      },
    },
  },
};

export const WithCustomOverlay: Story = {
  args: {
    ...Default.args,
    overlay: (
      <div className='flex items-center justify-center'>
        <div className='border-2 border-white border-dashed w-48 h-48 rounded-lg flex items-center justify-center'>
          <span className='text-white text-sm font-medium bg-black/50 px-3 py-1 rounded'>
            Align barcode here
          </span>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Scanner with a custom overlay to guide users on barcode placement.',
      },
    },
  },
};

export const AutoStartEnabled: Story = {
  args: {
    ...Default.args,
    autoStart: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Scanner that automatically starts scanning when the component mounts.',
      },
    },
  },
};

export const AllFormats: Story = {
  args: {
    ...Default.args,
    formats: [
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
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Scanner configured to detect all supported barcode formats.',
      },
    },
  },
};

// Interactive playground story
export const Playground: Story = {
  args: Default.args,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test different scanner configurations. Use the controls to adjust settings and see the results.',
      },
    },
  },
  render: args => {
    const [results, setResults] = React.useState<any[]>([]);
    const [errors, setErrors] = React.useState<string[]>([]);

    const handleResult = (result: any) => {
      setResults(prev => [result, ...prev.slice(0, 4)]); // Keep last 5 results
      console.log('Barcode detected:', result);
    };

    const handleError = (error: string) => {
      setErrors(prev => [error, ...prev.slice(0, 2)]); // Keep last 3 errors
      console.error('Scanner error:', error);
    };

    return (
      <div className='space-y-4'>
        <ScannerView {...args} onResult={handleResult} onError={handleError} />

        {/* Debug information */}
        {(results.length > 0 || errors.length > 0) && (
          <div className='bg-gray-50 p-4 rounded-lg text-sm'>
            <h4 className='font-medium mb-2'>Debug Information</h4>

            {results.length > 0 && (
              <div className='mb-2'>
                <strong>Recent Results:</strong>
                <ul className='mt-1 space-y-1'>
                  {results.map((result, index) => (
                    <li
                      key={index}
                      className='font-mono text-xs bg-green-100 p-1 rounded'
                    >
                      {result.formatName}: {result.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {errors.length > 0 && (
              <div>
                <strong>Recent Errors:</strong>
                <ul className='mt-1 space-y-1'>
                  {errors.map((error, index) => (
                    <li
                      key={index}
                      className='font-mono text-xs bg-red-100 p-1 rounded'
                    >
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
};
