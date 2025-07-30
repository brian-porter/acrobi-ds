import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { useNative, NativeUtils } from './use-native';

const meta: Meta = {
  title: '2. Hooks/useNative',
  parameters: {
    docs: {
      description: {
        component:
          'Native platform detection hook for Capacitor integration. Provides platform detection capabilities for AAEs wrapped in Capacitor native shells, enabling conditional rendering and platform-specific functionality.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Main native platform demo
const NativePlatformDemo = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [
      `${new Date().toLocaleTimeString()}: ${message}`,
      ...prev.slice(0, 9),
    ]);
  };

  const native = useNative();
  const {
    platformInfo,
    isNative,
    isWeb,
    platform,
    isCapacitor,
    hasCapacitorPlugins,
    canInstallApp,
    checkCapacitorPlugin,
    getPlatformInfo,
    isIOSDevice,
    isAndroidDevice,
    isMobileDevice,
    isDesktopDevice,
    refresh,
  } = native;

  const handleRefresh = () => {
    addLog('Refreshing platform detection...');
    refresh();
    addLog('Platform info refreshed');
  };

  const handleCheckPlugin = (pluginName: string) => {
    const hasPlugin = checkCapacitorPlugin(pluginName);
    addLog(
      `Plugin "${pluginName}": ${hasPlugin ? 'Available' : 'Not Available'}`
    );
    return hasPlugin;
  };

  const handleGetDeviceInfo = () => {
    const deviceInfo = NativeUtils.getDeviceInfo();
    addLog(`Device Info: ${deviceInfo}`);
  };

  const testCapacitorPlugins = () => {
    addLog('Testing common Capacitor plugins...');
    const commonPlugins = [
      'Camera',
      'Geolocation',
      'Device',
      'StatusBar',
      'SplashScreen',
      'PushNotifications',
      'LocalNotifications',
      'Storage',
      'Filesystem',
      'Network',
    ];

    commonPlugins.forEach(plugin => {
      setTimeout(() => handleCheckPlugin(plugin), 100);
    });
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
        📱 Native Platform Demo
      </h2>

      {/* Platform Information */}
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
          style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#374151' }}
        >
          Platform Detection
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            fontSize: '14px',
          }}
        >
          <div
            style={{
              padding: '10px',
              backgroundColor: 'white',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
            }}
          >
            <strong>Environment:</strong>
            <div style={{ marginTop: '5px', fontSize: '18px' }}>
              {isNative ? '📱 Native App' : '🌐 Web Browser'}
            </div>
            <div
              style={{
                marginTop: '5px',
                color: isNative ? '#059669' : '#3b82f6',
              }}
            >
              {isNative ? 'Running in Capacitor' : 'Running in browser'}
            </div>
          </div>

          <div
            style={{
              padding: '10px',
              backgroundColor: 'white',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
            }}
          >
            <strong>Platform:</strong>
            <div
              style={{
                marginTop: '5px',
                fontSize: '18px',
                textTransform: 'capitalize',
              }}
            >
              {platform === 'ios'
                ? '🍎 iOS'
                : platform === 'android'
                  ? '🤖 Android'
                  : platform === 'web'
                    ? '💻 Web'
                    : '❓ Unknown'}
            </div>
            <div style={{ marginTop: '5px', color: '#6b7280' }}>
              {platformInfo.version && `Version: ${platformInfo.version}`}
            </div>
          </div>

          <div
            style={{
              padding: '10px',
              backgroundColor: 'white',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
            }}
          >
            <strong>Device Type:</strong>
            <div style={{ marginTop: '5px', fontSize: '18px' }}>
              {isMobileDevice() ? '📱 Mobile' : '🖥️ Desktop'}
            </div>
            <div style={{ marginTop: '5px', color: '#6b7280' }}>
              {isIOSDevice()
                ? 'iOS Device'
                : isAndroidDevice()
                  ? 'Android Device'
                  : 'Desktop/Web Device'}
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities */}
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
          style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#374151' }}
        >
          Platform Capabilities
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '10px',
            fontSize: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', marginRight: '8px' }}>
              {isCapacitor ? '✅' : '❌'}
            </span>
            <div>
              <strong>Capacitor:</strong>
              <div style={{ color: '#6b7280' }}>
                {isCapacitor ? 'Available' : 'Not Available'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', marginRight: '8px' }}>
              {hasCapacitorPlugins ? '✅' : '❌'}
            </span>
            <div>
              <strong>Plugins:</strong>
              <div style={{ color: '#6b7280' }}>
                {hasCapacitorPlugins ? 'Available' : 'Not Available'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', marginRight: '8px' }}>
              {canInstallApp ? '✅' : '❌'}
            </span>
            <div>
              <strong>AAE Install:</strong>
              <div style={{ color: '#6b7280' }}>
                {canInstallApp ? 'Can Install' : 'Cannot Install'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', marginRight: '8px' }}>
              {isWeb ? '🌐' : '📱'}
            </span>
            <div>
              <strong>Context:</strong>
              <div style={{ color: '#6b7280' }}>
                {isWeb ? 'Web Browser' : 'Native Shell'}
              </div>
            </div>
          </div>
        </div>
      </div>

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
          onClick={handleRefresh}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          🔄 Refresh Detection
        </button>

        <button
          onClick={handleGetDeviceInfo}
          style={{
            padding: '8px 16px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          📋 Get Device Info
        </button>

        <button
          onClick={testCapacitorPlugins}
          disabled={!hasCapacitorPlugins}
          style={{
            padding: '8px 16px',
            backgroundColor: !hasCapacitorPlugins ? '#9ca3af' : '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: !hasCapacitorPlugins ? 'not-allowed' : 'pointer',
            fontSize: '14px',
          }}
        >
          🔌 Test Plugins
        </button>
      </div>

      {/* Platform-Specific Features Demo */}
      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: isNative ? '#f0f9ff' : '#fef3c7',
          borderRadius: '8px',
          border: `1px solid ${isNative ? '#bae6fd' : '#fed7aa'}`,
        }}
      >
        <h3
          style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#374151' }}
        >
          {isNative
            ? '📱 Native Features Available'
            : '🌐 Web Features Available'}
        </h3>
        <div
          style={{ fontSize: '14px', color: isNative ? '#1e40af' : '#92400e' }}
        >
          {isNative ? (
            <div>
              <p>✅ Full device access (camera, contacts, etc.)</p>
              <p>✅ Native UI components and styling</p>
              <p>✅ App store distribution</p>
              <p>✅ Background processing</p>
              <p>✅ Push notifications</p>
            </div>
          ) : (
            <div>
              <p>🌐 Acrobi's Advanced Experiences features</p>
              <p>🔗 Web Share API (if supported)</p>
              <p>📲 Add to Home Screen</p>
              <p>🔔 Web Push Notifications</p>
              <p>💾 Service Worker caching</p>
            </div>
          )}
        </div>
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
            height: '150px',
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

      {/* Raw Platform Info */}
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
          Raw Platform Data
        </h3>
        <pre
          style={{
            margin: 0,
            fontSize: '12px',
            color: '#374151',
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto',
          }}
        >
          {JSON.stringify(platformInfo, null, 2)}
        </pre>
      </div>

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
          <li>
            This demo shows platform detection in your current environment
          </li>
          <li>Use "Refresh Detection" to re-scan platform capabilities</li>
          <li>
            In a Capacitor app, you'll see native features and plugin
            availability
          </li>
          <li>In a web browser, you'll see AAE capabilities</li>
          <li>
            The hook automatically adapts based on the runtime environment
          </li>
        </ul>
      </div>
    </div>
  );
};

// Hook usage example
const HookUsageExample = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h3>Native Platform Hook Usage Example</h3>
      <pre
        style={{
          backgroundColor: '#f8fafc',
          padding: '15px',
          borderRadius: '6px',
          fontSize: '14px',
          overflow: 'auto',
        }}
      >
        {`// Native Platform Hook Usage
import { useNative, NativeUtils } from '@acrobi/ui';

function PlatformAwareComponent() {
  const {
    isNative,
    isWeb,
    platform,
    isCapacitor,
    hasCapacitorPlugins,
    canInstallApp,
    checkCapacitorPlugin,
    isIOSDevice,
    isAndroidDevice,
    isMobileDevice
  } = useNative();

  // Conditional rendering based on platform
  if (isNative) {
    return (
      <div>
        <h2>Native App Features</h2>
        {isIOSDevice() && <IOSSpecificComponent />}
        {isAndroidDevice() && <AndroidSpecificComponent />}
        
        {checkCapacitorPlugin('Camera') && (
          <button onClick={takePicture}>
            📷 Take Picture (Native)
          </button>
        )}
      </div>
    );
  }

  // Web-specific features
  return (
    <div>
      <h2>Web App Features</h2>
      
      {canInstallApp && (
        <button onClick={promptInstall}>
          📲 Install as App
        </button>
      )}
      
      {isMobileDevice() ? (
        <MobileWebFeatures />
      ) : (
        <DesktopWebFeatures />
      )}
    </div>
  );
}

// Using utility functions
function PlatformCheck() {
  // Direct utility usage
  const isCapacitor = NativeUtils.isCapacitorNative();
  const deviceInfo = NativeUtils.getDeviceInfo();
  
  return (
    <div>
      <p>Capacitor: {isCapacitor ? 'Yes' : 'No'}</p>
      <p>Device: {deviceInfo}</p>
    </div>
  );
}

// Conditional imports based on platform
async function loadPlatformFeatures() {
  const { isNative } = useNative();
  
  if (isNative) {
    // Load native-specific code
    const nativeFeatures = await import('./native-features');
    return nativeFeatures;
  } else {
    // Load web-specific code
    const webFeatures = await import('./web-features');
    return webFeatures;
  }
}`}
      </pre>
    </div>
  );
};

// Stories
export const Default: Story = {
  render: () => <NativePlatformDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive platform detection demo showing Capacitor integration, platform capabilities, and conditional rendering.',
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
          'Example code showing how to use the native platform detection hook for conditional rendering and feature detection.',
      },
    },
  },
};
