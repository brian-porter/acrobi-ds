import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { useBluetooth } from './use-bluetooth';

const meta: Meta = {
  title: '2. Hooks/useBluetooth',
  parameters: {
    docs: {
      description: {
        component:
          'Bluetooth connectivity hook with Web Bluetooth API and Capacitor native platform support. Provides cross-platform Bluetooth device scanning, connection management, and GATT operations with automatic platform detection.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Main Bluetooth demo
const BluetoothDemo = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [
      `${new Date().toLocaleTimeString()}: ${message}`,
      ...prev.slice(0, 9),
    ]);
  };

  const bluetooth = useBluetooth();
  const {
    device,
    isConnected,
    isScanning,
    isLoading,
    error,
    platformInfo,
    scan,
    connect,
    disconnect,
    readCharacteristic,
    writeCharacteristic,
    startNotifications,
    stopNotifications,
  } = bluetooth;

  const handleScan = async () => {
    addLog('Starting Bluetooth scan...');
    try {
      const foundDevice = await scan({
        acceptAllDevices: true,
        optionalServices: ['battery_service', 'device_information'],
      });

      if (foundDevice) {
        addLog(`Device found: ${foundDevice.name || 'Unknown Device'}`);
      } else {
        addLog('No device selected');
      }
    } catch (err) {
      addLog(`Scan failed: ${err}`);
    }
  };

  const handleConnect = async () => {
    if (!device) {
      addLog('No device to connect to');
      return;
    }

    addLog(`Connecting to ${device.name || device.id}...`);
    try {
      const success = await connect(device);
      if (success) {
        addLog('Connected successfully!');
      } else {
        addLog('Connection failed');
      }
    } catch (err) {
      addLog(`Connection error: ${err}`);
    }
  };

  const handleDisconnect = async () => {
    addLog('Disconnecting...');
    try {
      await disconnect();
      addLog('Disconnected successfully');
    } catch (err) {
      addLog(`Disconnect error: ${err}`);
    }
  };

  const handleReadBattery = async () => {
    if (!isConnected) {
      addLog('Not connected to a device');
      return;
    }

    addLog('Reading battery level...');
    try {
      const data = await readCharacteristic('battery_service', 'battery_level');
      if (data) {
        const batteryLevel = data.getUint8(0);
        addLog(`Battery level: ${batteryLevel}%`);
      } else {
        addLog('Failed to read battery level');
      }
    } catch (err) {
      addLog(`Read error: ${err}`);
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '800px',
      }}
    >
      <h2 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>
        📶 Bluetooth Demo
      </h2>

      {/* Platform Info */}
      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <h3
          style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#374151' }}
        >
          Platform Information
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
            fontSize: '14px',
          }}
        >
          <div>
            <strong>Platform:</strong>
            <span style={{ marginLeft: '8px', textTransform: 'capitalize' }}>
              {platformInfo.platform}
            </span>
          </div>
          <div>
            <strong>Native App:</strong>
            <span
              style={{
                color: platformInfo.isNative ? '#059669' : '#6b7280',
                marginLeft: '8px',
              }}
            >
              {platformInfo.isNative ? '✅ Yes' : '❌ No'}
            </span>
          </div>
          <div>
            <strong>Web Bluetooth:</strong>
            <span
              style={{
                color: platformInfo.supportsWebBluetooth
                  ? '#059669'
                  : '#dc2626',
                marginLeft: '8px',
              }}
            >
              {platformInfo.supportsWebBluetooth
                ? '✅ Supported'
                : '❌ Not Supported'}
            </span>
          </div>
          <div>
            <strong>Requires Native:</strong>
            <span
              style={{
                color: platformInfo.requiresNativeApp ? '#d97706' : '#059669',
                marginLeft: '8px',
              }}
            >
              {platformInfo.requiresNativeApp ? '⚠️ Yes' : '✅ No'}
            </span>
          </div>
        </div>
      </div>

      {/* Device Status */}
      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <h3
          style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#374151' }}
        >
          Device Status
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '10px',
            fontSize: '14px',
          }}
        >
          <div>
            <strong>Device:</strong>
            <span style={{ marginLeft: '8px' }}>
              {device ? device.name || device.id : 'None'}
            </span>
          </div>
          <div>
            <strong>Connected:</strong>
            <span
              style={{
                color: isConnected ? '#059669' : '#6b7280',
                marginLeft: '8px',
              }}
            >
              {isConnected ? '✅ Yes' : '❌ No'}
            </span>
          </div>
          <div>
            <strong>Scanning:</strong>
            <span
              style={{
                color: isScanning ? '#d97706' : '#6b7280',
                marginLeft: '8px',
              }}
            >
              {isScanning ? '🔍 Yes' : '⭕ No'}
            </span>
          </div>
          <div>
            <strong>Loading:</strong>
            <span
              style={{
                color: isLoading ? '#d97706' : '#6b7280',
                marginLeft: '8px',
              }}
            >
              {isLoading ? '⏳ Yes' : '✅ No'}
            </span>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div
          style={{
            marginBottom: '20px',
            padding: '12px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            color: '#dc2626',
            fontSize: '14px',
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Control Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={handleScan}
          disabled={
            isScanning || isLoading || !platformInfo.supportsWebBluetooth
          }
          style={{
            padding: '8px 16px',
            backgroundColor:
              isScanning || isLoading || !platformInfo.supportsWebBluetooth
                ? '#9ca3af'
                : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor:
              isScanning || isLoading || !platformInfo.supportsWebBluetooth
                ? 'not-allowed'
                : 'pointer',
            fontSize: '14px',
          }}
        >
          {isScanning ? '🔍 Scanning...' : '📱 Scan Devices'}
        </button>

        <button
          onClick={handleConnect}
          disabled={!device || isConnected || isLoading}
          style={{
            padding: '8px 16px',
            backgroundColor:
              !device || isConnected || isLoading ? '#9ca3af' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor:
              !device || isConnected || isLoading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
          }}
        >
          🔗 Connect
        </button>

        <button
          onClick={handleDisconnect}
          disabled={!isConnected || isLoading}
          style={{
            padding: '8px 16px',
            backgroundColor: !isConnected || isLoading ? '#9ca3af' : '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: !isConnected || isLoading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
          }}
        >
          ❌ Disconnect
        </button>

        <button
          onClick={handleReadBattery}
          disabled={!isConnected || isLoading}
          style={{
            padding: '8px 16px',
            backgroundColor: !isConnected || isLoading ? '#9ca3af' : '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: !isConnected || isLoading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
          }}
        >
          🔋 Read Battery
        </button>
      </div>

      {/* Activity Log */}
      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#374151' }}
        >
          Activity Log
        </h3>
        <div
          style={{
            height: '200px',
            overflowY: 'auto',
            padding: '12px',
            backgroundColor: '#111827',
            borderRadius: '6px',
            color: '#f9fafb',
            fontSize: '12px',
            fontFamily: 'monospace',
          }}
        >
          {logs.length === 0 ? (
            <div style={{ color: '#6b7280' }}>No activity yet...</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '4px' }}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Platform Support Notice */}
      {!platformInfo.supportsWebBluetooth && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#fef3c7',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#92400e',
          }}
        >
          <strong>⚠️ Platform Notice:</strong> Web Bluetooth is not supported in
          this environment.
          {platformInfo.requiresNativeApp && (
            <>
              {' '}
              Consider using a native app with Capacitor for full Bluetooth
              functionality on iOS.
            </>
          )}
        </div>
      )}

      {/* Instructions */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#eff6ff',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#1e40af',
        }}
      >
        <strong>Instructions:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>Click "Scan Devices" to discover nearby Bluetooth devices</li>
          <li>Select a device from the browser's device picker</li>
          <li>Click "Connect" to establish connection</li>
          <li>Use "Read Battery" to test GATT characteristic reading</li>
          <li>Monitor the activity log for detailed information</li>
        </ul>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
          Note: Web Bluetooth requires HTTPS and user interaction. Some browsers
          may not support all features.
        </p>
      </div>
    </div>
  );
};

// Hook usage example
const HookUsageExample = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h3>Bluetooth Hook Usage Example</h3>
      <pre
        style={{
          backgroundColor: '#f8fafc',
          padding: '15px',
          borderRadius: '6px',
          fontSize: '14px',
          overflow: 'auto',
        }}
      >
        {`// Bluetooth Hook Usage
import { useBluetooth } from '@acrobi/ui';

function BluetoothComponent() {
  const {
    device,
    isConnected,
    isScanning,
    error,
    platformInfo,
    scan,
    connect,
    disconnect,
    readCharacteristic,
    writeCharacteristic,
    startNotifications,
    stopNotifications
  } = useBluetooth();

  // Check platform support
  if (!platformInfo.supportsWebBluetooth) {
    return <div>Bluetooth not supported on this platform</div>;
  }

  const handleScanAndConnect = async () => {
    try {
      // Scan for devices
      const device = await scan({
        filters: [{ services: ['battery_service'] }]
      });
      
      if (device) {
        // Connect to selected device
        const connected = await connect(device);
        
        if (connected) {
          // Read battery level
          const data = await readCharacteristic(
            'battery_service', 
            'battery_level'
          );
          
          if (data) {
            const batteryLevel = data.getUint8(0);
            console.log('Battery level:', batteryLevel + '%');
          }
        }
      }
    } catch (error) {
      console.error('Bluetooth operation failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleScanAndConnect} disabled={isScanning}>
        {isScanning ? 'Scanning...' : 'Scan & Connect'}
      </button>
      
      {isConnected && (
        <div>Connected to: {device?.name || 'Unknown Device'}</div>
      )}
      
      {error && <div>Error: {error}</div>}
    </div>
  );
}`}
      </pre>
    </div>
  );
};

// Stories
export const Default: Story = {
  render: () => <BluetoothDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive Bluetooth demo showing device scanning, connection management, and GATT operations with platform detection.',
      },
    },
  },
};

export const HookUsage: Story = {
  render: () => <HookUsageExample />,
  parameters: {
    docs: {
      description: {
        story:
          'Example code showing how to integrate Bluetooth functionality in your components.',
      },
    },
  },
};
