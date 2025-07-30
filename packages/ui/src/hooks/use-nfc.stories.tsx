import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { useNFC } from './use-nfc';
import type { NFCData, WiFiCredentials, ContactInfo } from './types/nfc';

// Story wrapper component
function NFCDemo({
  onTagRead,
  onTagWrite,
  onError,
  validateData = true,
  backgroundScan = false,
}: {
  onTagRead?: (data: NFCData) => void;
  onTagWrite?: (success: boolean) => void;
  onError?: (error: any) => void;
  validateData?: boolean;
  backgroundScan?: boolean;
}) {
  const nfc = useNFC({
    onTagRead,
    onTagWrite,
    onError,
    validateData,
    backgroundScan,
  });

  const [textToWrite, setTextToWrite] = useState('Hello, NFC World!');
  const [urlToWrite, setUrlToWrite] = useState('https://example.com');
  const [wifiCredentials, setWifiCredentials] = useState<WiFiCredentials>({
    ssid: 'MyNetwork',
    password: 'password123',
    security: 'WPA2',
    hidden: false,
  });
  const [contact, setContact] = useState<ContactInfo>({
    name: 'John Doe',
    phone: '+1234567890',
    email: 'john@example.com',
    organization: 'Acme Corp',
  });

  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [
      `${new Date().toLocaleTimeString()}: ${message}`,
      ...prev.slice(0, 9),
    ]);
  };

  useEffect(() => {
    if (nfc.error) {
      addLog(`Error: ${nfc.error.message}`);
    }
  }, [nfc.error]);

  const handleStartScanning = async () => {
    try {
      addLog('Starting NFC scan...');
      await nfc.startScanning();
      addLog('NFC scanning started');
    } catch (error) {
      addLog(`Failed to start scanning: ${error}`);
    }
  };

  const handleStopScanning = () => {
    nfc.stopScanning();
    addLog('NFC scanning stopped');
  };

  const handleWriteText = async () => {
    try {
      addLog(`Writing text: "${textToWrite}"`);
      const success = await nfc.writeText(textToWrite);
      addLog(success ? 'Text written successfully' : 'Failed to write text');
    } catch (error) {
      addLog(`Error writing text: ${error}`);
    }
  };

  const handleWriteUrl = async () => {
    try {
      addLog(`Writing URL: "${urlToWrite}"`);
      const success = await nfc.writeUrl(urlToWrite);
      addLog(success ? 'URL written successfully' : 'Failed to write URL');
    } catch (error) {
      addLog(`Error writing URL: ${error}`);
    }
  };

  const handleWriteWiFi = async () => {
    try {
      addLog(`Writing WiFi credentials for: "${wifiCredentials.ssid}"`);
      const success = await nfc.writeWiFi(wifiCredentials);
      addLog(
        success
          ? 'WiFi credentials written successfully'
          : 'Failed to write WiFi credentials'
      );
    } catch (error) {
      addLog(`Error writing WiFi: ${error}`);
    }
  };

  const handleWriteContact = async () => {
    try {
      addLog(`Writing contact: "${contact.name}"`);
      const success = await nfc.writeContact(contact);
      addLog(
        success ? 'Contact written successfully' : 'Failed to write contact'
      );
    } catch (error) {
      addLog(`Error writing contact: ${error}`);
    }
  };

  const handleClearHistory = () => {
    nfc.clearHistory();
    addLog('Scan history cleared');
  };

  const handleExportJson = () => {
    const data = nfc.exportData('json');
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nfc-data.json';
    a.click();
    URL.revokeObjectURL(url);
    addLog('Data exported as JSON');
  };

  const handleExportCsv = () => {
    const data = nfc.exportData('csv');
    const blob = new Blob([data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nfc-data.csv';
    a.click();
    URL.revokeObjectURL(url);
    addLog('Data exported as CSV');
  };

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '800px',
        fontFamily: 'system-ui, sans-serif',
        display: 'grid',
        gap: '20px',
      }}
    >
      {/* Status Section */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          border: '1px solid #ddd',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0' }}>NFC Status</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
          }}
        >
          <div>
            <strong>Supported:</strong>{' '}
            {nfc.state.isSupported ? '✅ Yes' : '❌ No'}
          </div>
          <div>
            <strong>Permission:</strong>{' '}
            {nfc.state.isPermissionGranted ? '✅ Granted' : '⏳ Pending'}
          </div>
          <div>
            <strong>Scanning:</strong>{' '}
            {nfc.state.isScanning ? '🔄 Active' : '⏸️ Stopped'}
          </div>
          <div>
            <strong>Writing:</strong>{' '}
            {nfc.state.isWriting ? '✍️ Active' : '⏸️ Idle'}
          </div>
          <div>
            <strong>History:</strong> {nfc.state.scanHistory.length} items
          </div>
          <div>
            <strong>Network:</strong>{' '}
            {nfc.isNetworkAvailable ? '🌐 Online' : '📴 Offline'}
          </div>
        </div>
      </div>

      {/* Scanning Section */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#e8f4fd',
          borderRadius: '8px',
          border: '1px solid #b3d7ff',
        }}
      >
        <h3 style={{ margin: '0 0 15px 0' }}>NFC Scanning</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button
            onClick={handleStartScanning}
            disabled={!nfc.state.isSupported || nfc.state.isScanning}
            style={{
              padding: '8px 16px',
              backgroundColor: nfc.state.isScanning ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: nfc.state.isScanning ? 'not-allowed' : 'pointer',
            }}
          >
            {nfc.state.isScanning ? 'Scanning...' : 'Start Scan'}
          </button>
          <button
            onClick={handleStopScanning}
            disabled={!nfc.state.isScanning}
            style={{
              padding: '8px 16px',
              backgroundColor: nfc.state.isScanning ? '#dc3545' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: nfc.state.isScanning ? 'pointer' : 'not-allowed',
            }}
          >
            Stop Scan
          </button>
        </div>

        {nfc.state.lastReadData && (
          <div
            style={{
              padding: '10px',
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0' }}>Last Read Data:</h4>
            <div>
              <strong>Records:</strong>{' '}
              {nfc.state.lastReadData.metadata.recordCount}
            </div>
            <div>
              <strong>Size:</strong> {nfc.state.lastReadData.metadata.totalSize}{' '}
              bytes
            </div>
            <div>
              <strong>Time:</strong>{' '}
              {new Date(nfc.state.lastReadData.timestamp).toLocaleString()}
            </div>
            {nfc.state.lastReadData.records.map((record, index) => (
              <div
                key={index}
                style={{ marginTop: '8px', paddingLeft: '10px' }}
              >
                <strong>Record {index + 1}:</strong> {record.recordType} -{' '}
                {typeof record.data === 'string'
                  ? record.data.slice(0, 50) +
                    (record.data.length > 50 ? '...' : '')
                  : '[Binary Data]'}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Writing Section */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
        }}
      >
        <h3 style={{ margin: '0 0 15px 0' }}>NFC Writing</h3>

        {/* Text Writing */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Write Text</h4>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type='text'
              value={textToWrite}
              onChange={e => setTextToWrite(e.target.value)}
              style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
              placeholder='Enter text to write'
            />
            <button
              onClick={handleWriteText}
              disabled={!nfc.state.isSupported || nfc.state.isWriting}
              style={{
                padding: '8px 16px',
                backgroundColor: nfc.state.isWriting ? '#ccc' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: nfc.state.isWriting ? 'not-allowed' : 'pointer',
              }}
            >
              Write Text
            </button>
          </div>
        </div>

        {/* URL Writing */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Write URL</h4>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type='url'
              value={urlToWrite}
              onChange={e => setUrlToWrite(e.target.value)}
              style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
              placeholder='Enter URL to write'
            />
            <button
              onClick={handleWriteUrl}
              disabled={!nfc.state.isSupported || nfc.state.isWriting}
              style={{
                padding: '8px 16px',
                backgroundColor: nfc.state.isWriting ? '#ccc' : '#17a2b8',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: nfc.state.isWriting ? 'not-allowed' : 'pointer',
              }}
            >
              Write URL
            </button>
          </div>
        </div>

        {/* WiFi Writing */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Write WiFi Credentials</h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginBottom: '10px',
            }}
          >
            <input
              type='text'
              value={wifiCredentials.ssid}
              onChange={e =>
                setWifiCredentials(prev => ({ ...prev, ssid: e.target.value }))
              }
              placeholder='Network Name (SSID)'
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
            <input
              type='password'
              value={wifiCredentials.password || ''}
              onChange={e =>
                setWifiCredentials(prev => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder='Password'
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
            <select
              value={wifiCredentials.security}
              onChange={e =>
                setWifiCredentials(prev => ({
                  ...prev,
                  security: e.target.value as WiFiCredentials['security'],
                }))
              }
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <option value='OPEN'>Open</option>
              <option value='WEP'>WEP</option>
              <option value='WPA'>WPA</option>
              <option value='WPA2'>WPA2</option>
              <option value='WPA3'>WPA3</option>
            </select>
            <label
              style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <input
                type='checkbox'
                checked={wifiCredentials.hidden || false}
                onChange={e =>
                  setWifiCredentials(prev => ({
                    ...prev,
                    hidden: e.target.checked,
                  }))
                }
              />
              Hidden Network
            </label>
          </div>
          <button
            onClick={handleWriteWiFi}
            disabled={!nfc.state.isSupported || nfc.state.isWriting}
            style={{
              padding: '8px 16px',
              backgroundColor: nfc.state.isWriting ? '#ccc' : '#fd7e14',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: nfc.state.isWriting ? 'not-allowed' : 'pointer',
            }}
          >
            Write WiFi
          </button>
        </div>

        {/* Contact Writing */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Write Contact</h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginBottom: '10px',
            }}
          >
            <input
              type='text'
              value={contact.name || ''}
              onChange={e =>
                setContact(prev => ({ ...prev, name: e.target.value }))
              }
              placeholder='Full Name'
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
            <input
              type='tel'
              value={contact.phone || ''}
              onChange={e =>
                setContact(prev => ({ ...prev, phone: e.target.value }))
              }
              placeholder='Phone Number'
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
            <input
              type='email'
              value={contact.email || ''}
              onChange={e =>
                setContact(prev => ({ ...prev, email: e.target.value }))
              }
              placeholder='Email Address'
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
            <input
              type='text'
              value={contact.organization || ''}
              onChange={e =>
                setContact(prev => ({ ...prev, organization: e.target.value }))
              }
              placeholder='Organization'
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>
          <button
            onClick={handleWriteContact}
            disabled={!nfc.state.isSupported || nfc.state.isWriting}
            style={{
              padding: '8px 16px',
              backgroundColor: nfc.state.isWriting ? '#ccc' : '#6f42c1',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: nfc.state.isWriting ? 'not-allowed' : 'pointer',
            }}
          >
            Write Contact
          </button>
        </div>
      </div>

      {/* History Section */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
          border: '1px solid #ffeaa7',
        }}
      >
        <h3 style={{ margin: '0 0 15px 0' }}>Scan History & Export</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button
            onClick={handleClearHistory}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Clear History
          </button>
          <button
            onClick={handleExportJson}
            disabled={nfc.state.scanHistory.length === 0}
            style={{
              padding: '8px 16px',
              backgroundColor:
                nfc.state.scanHistory.length > 0 ? '#6c757d' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                nfc.state.scanHistory.length > 0 ? 'pointer' : 'not-allowed',
            }}
          >
            Export JSON
          </button>
          <button
            onClick={handleExportCsv}
            disabled={nfc.state.scanHistory.length === 0}
            style={{
              padding: '8px 16px',
              backgroundColor:
                nfc.state.scanHistory.length > 0 ? '#6c757d' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                nfc.state.scanHistory.length > 0 ? 'pointer' : 'not-allowed',
            }}
          >
            Export CSV
          </button>
        </div>

        <div style={{ fontSize: '14px' }}>
          <strong>History Count:</strong> {nfc.state.scanHistory.length} items
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#e2e3e5',
          borderRadius: '8px',
          border: '1px solid #c6c8ca',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0' }}>Keyboard Shortcuts</h3>
        <div style={{ fontSize: '14px' }}>
          {Object.entries(nfc.keyboardShortcuts).map(
            ([shortcut, description]) => (
              <div key={shortcut} style={{ marginBottom: '5px' }}>
                <code
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    border: '1px solid #dee2e6',
                  }}
                >
                  {shortcut}
                </code>
                {' - '}
                {description}
              </div>
            )
          )}
        </div>
      </div>

      {/* Activity Log */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0' }}>Activity Log</h3>
        <div
          style={{
            maxHeight: '200px',
            overflowY: 'auto',
            fontSize: '14px',
            fontFamily: 'monospace',
          }}
        >
          {logs.length === 0 ? (
            <div style={{ color: '#6c757d', fontStyle: 'italic' }}>
              No activity yet...
            </div>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                style={{
                  padding: '2px 0',
                  borderBottom:
                    index < logs.length - 1 ? '1px solid #eee' : 'none',
                }}
              >
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof NFCDemo> = {
  title: 'Hooks/useNFC',
  component: NFCDemo,
  parameters: {
    docs: {
      description: {
        component: `
The useNFC hook provides comprehensive NFC (Near Field Communication) functionality for Acrobi's Advanced Experienceslications.

## Features

- **Web NFC API Integration**: Complete support for reading and writing NFC tags
- **Multiple Data Formats**: Text, URLs, WiFi credentials, and contact information
- **NDEF Message Handling**: Full NDEF (NFC Data Exchange Format) parsing and creation
- **Security Validation**: Data sanitization and domain restrictions
- **History Management**: Scan history with export capabilities
- **Epic Integration**: Works with keyboard shortcuts, network status, and background sync

## Browser Support

Currently supported in:
- Chrome for Android (requires HTTPS)
- Samsung Internet Browser
- Other browsers may support NFC through polyfills

## Security Considerations

- All data is validated and sanitized before writing
- URL writing can be restricted to allowed domains
- Data size limits prevent memory issues
- Malicious content detection for text records

## Usage Examples

The hook supports various NFC operations including reading tags, writing different data types, and managing scan history. It integrates with other AAE hooks for enhanced functionality.
        `,
      },
    },
  },
  argTypes: {
    onTagRead: { action: 'tagRead' },
    onTagWrite: { action: 'tagWrite' },
    onError: { action: 'error' },
    validateData: {
      control: 'boolean',
      description: 'Enable data validation and sanitization',
    },
    backgroundScan: {
      control: 'boolean',
      description: 'Enable background scanning capabilities',
    },
  },
};

export default meta;

type Story = StoryObj<typeof NFCDemo>;

export const Default: Story = {
  args: {
    validateData: true,
    backgroundScan: false,
  },
};

export const BasicReading: Story = {
  args: {
    validateData: true,
    backgroundScan: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic NFC tag reading functionality. Start scanning to read any NFC tag that comes near your device.',
      },
    },
  },
};

export const TextWriting: Story = {
  args: {
    validateData: true,
    backgroundScan: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Write plain text to NFC tags. Supports different encodings and language codes.',
      },
    },
  },
};

export const URLSharing: Story = {
  args: {
    validateData: true,
    backgroundScan: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Write URLs to NFC tags for easy sharing. URLs are validated before writing.',
      },
    },
  },
};

export const WiFiCredentials: Story = {
  args: {
    validateData: true,
    backgroundScan: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Share WiFi network credentials via NFC. Supports various security types and hidden networks.',
      },
    },
  },
};

export const ContactSharing: Story = {
  args: {
    validateData: true,
    backgroundScan: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Share contact information using vCard format. Includes name, phone, email, and organization details.',
      },
    },
  },
};

export const WithValidation: Story = {
  args: {
    validateData: true,
    backgroundScan: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'NFC operations with data validation enabled. Text is sanitized and URLs are checked for security.',
      },
    },
  },
};

export const BackgroundScanning: Story = {
  args: {
    validateData: true,
    backgroundScan: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'NFC with background scanning enabled. Scan data is automatically synced when available.',
      },
    },
  },
};

export const ErrorHandling: Story = {
  args: {
    validateData: true,
    backgroundScan: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates error handling for various NFC scenarios including unsupported browsers and invalid data.',
      },
    },
  },
};
