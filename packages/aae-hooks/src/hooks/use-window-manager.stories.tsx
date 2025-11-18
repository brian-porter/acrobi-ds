/**
 * @fileoverview Window Manager Stories for Epic 73
 * Interactive demonstrations of AAE window management functionality
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useWindowManager } from './use-window-manager';

// Mock WindowManagerUtils for story compatibility
const WindowManagerUtils = {
  getBrowserCompatibility: () => ({
    browserInfo: navigator.userAgent,
    isSupported: 'getScreenDetails' in window,
    limitations: [
      'Window Management API is experimental',
      'Limited browser support',
      'May require permission prompts'
    ]
  }),
  createConfig: (type: string) => {
    const configs = {
      popup: { features: 'width=400,height=300,resizable=yes', focus: true },
      dialog: { features: 'width=600,height=400,resizable=yes', focus: true },
      large: { features: 'width=1024,height=768,resizable=yes', focus: true },
      minimal: { features: 'width=500,height=400,toolbar=no,menubar=no', focus: true }
    };
    return configs[type as keyof typeof configs] || configs.popup;
  },
  WINDOW_FEATURES: {
    POPUP: 'width=400,height=300,resizable=yes'
  },
  getCenteredPosition: (width: number, height: number) => ({
    left: Math.round((screen.width - width) / 2),
    top: Math.round((screen.height - height) / 2)
  }),
  createFeatures: (options: any) => {
    return Object.entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join(',');
  }
};

const meta: Meta = {
  title: 'AAE/Window Management/useWindowManager',
  parameters: {
    docs: {
      description: {
        component:
          'AAE window management hook for creating and managing multiple application windows. Provides automatic state tracking and window lifecycle management.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Window Manager Status Demo
const WindowManagerStatusDemo: React.FC = () => {
  const windowManager = useWindowManager({
    pollInterval: 500,
    autoStartPolling: true,
    maxWindows: 10,
    onWindowOpened: window => {
      console.log('Window opened:', window.name, window.id);
    },
    onWindowClosed: windowId => {
      console.log('Window closed:', windowId);
    },
    onError: error => {
      console.error('Window manager error:', error);
    },
  });

  const [browserCompat, setBrowserCompat] = useState(
    WindowManagerUtils.getBrowserCompatibility()
  );
  const windowCount = windowManager.getWindowCount();

  const getStatusColor = (status: boolean | undefined) => {
    return status ? '#28a745' : '#dc3545';
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Window Manager Status</h2>

      {/* API Support Warning */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        ⚠️ <strong>Experimental API:</strong> Window Management API is
        experimental and has limited browser support. Most browsers support
        basic window.open() functionality as a fallback.
      </div>

      {/* Status Overview */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '20px',
        }}
      >
        <h3>Window Management Capabilities</h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(windowManager.isSupported),
              }}
            />
            <span>
              <strong>Native API:</strong>{' '}
              {windowManager.isSupported ? 'Supported' : 'Not Supported'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: windowManager.isPolling
                  ? '#28a745'
                  : '#6c757d',
              }}
            />
            <span>
              <strong>Polling:</strong>{' '}
              {windowManager.isPolling ? 'Active' : 'Inactive'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: windowManager.isLoading
                  ? '#ffc107'
                  : '#6c757d',
              }}
            />
            <span>
              <strong>Loading:</strong> {windowManager.isLoading ? 'Yes' : 'No'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: windowCount.open > 0 ? '#28a745' : '#6c757d',
              }}
            />
            <span>
              <strong>Open Windows:</strong> {windowCount.open}
            </span>
          </div>
        </div>

        {windowManager.error && (
          <div
            style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c6cb',
              borderRadius: '4px',
              color: '#721c24',
            }}
          >
            <strong>Error:</strong> {windowManager.error}
            <button
              onClick={windowManager.clearError}
              style={{
                marginLeft: '10px',
                padding: '2px 8px',
                fontSize: '12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Browser Compatibility */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#e7f3ff',
          borderRadius: '8px',
          border: '1px solid #b3d7ff',
          marginBottom: '20px',
        }}
      >
        <h3>Browser Compatibility</h3>

        <div style={{ marginBottom: '15px' }}>
          <strong>Current Browser:</strong> {browserCompat.browserInfo}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <strong>Window Management API:</strong>{' '}
          {browserCompat.isSupported
            ? '✅ Supported'
            : '❌ Not Supported (using fallback)'}
        </div>

        {browserCompat.limitations.length > 0 && (
          <div>
            <strong>Limitations:</strong>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              {browserCompat.limitations.map((limitation, index) => (
                <li
                  key={index}
                  style={{ marginBottom: '4px', fontSize: '14px' }}
                >
                  {limitation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Window Statistics */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f0f8ff',
          borderRadius: '8px',
          border: '1px solid #b6d7ff',
          marginBottom: '20px',
        }}
      >
        <h3>Window Statistics</h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '15px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}
            >
              {windowCount.total}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Total Windows</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}
            >
              {windowCount.open}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Open Windows</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{ fontSize: '24px', fontWeight: 'bold', color: '#6c757d' }}
            >
              {windowCount.closed}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Closed Windows
            </div>
          </div>
        </div>
      </div>

      {/* Active Windows List */}
      {windowManager.windows.length > 0 && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#d4edda',
            borderRadius: '8px',
            border: '1px solid #c3e6cb',
          }}
        >
          <h3>Managed Windows ({windowManager.windows.length})</h3>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {windowManager.windows.map(aaeWindow => (
              <div
                key={aaeWindow.id}
                style={{
                  padding: '12px',
                  backgroundColor: aaeWindow.closed ? '#f8f9fa' : 'white',
                  border: `1px solid ${aaeWindow.closed ? '#dee2e6' : '#28a745'}`,
                  borderRadius: '4px',
                  opacity: aaeWindow.closed ? 0.7 : 1,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                      {aaeWindow.closed ? '❌' : '✅'}{' '}
                      {aaeWindow.name || aaeWindow.id}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '4px',
                      }}
                    >
                      URL: {aaeWindow.url}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      Opened:{' '}
                      {new Date(aaeWindow.openedAt).toLocaleTimeString()}
                      {aaeWindow.closed &&
                        ` • Last Updated: ${new Date(aaeWindow.lastUpdated).toLocaleTimeString()}`}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {!aaeWindow.closed && (
                      <>
                        <button
                          onClick={() =>
                            windowManager.focusWindow(aaeWindow.id)
                          }
                          style={{
                            padding: '4px 8px',
                            fontSize: '12px',
                            backgroundColor: '#17a2b8',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                          }}
                        >
                          Focus
                        </button>
                        <button
                          onClick={() =>
                            windowManager.closeWindow(aaeWindow.id)
                          }
                          style={{
                            padding: '4px 8px',
                            fontSize: '12px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                          }}
                        >
                          Close
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Window Operations Demo
const WindowOperationsDemo: React.FC = () => {
  const windowManager = useWindowManager({
    maxWindows: 5,
    pollInterval: 1000,
  });

  const [newWindowUrl, setNewWindowUrl] = useState('https://www.example.com');
  const [windowName, setWindowName] = useState('');
  const [windowType, setWindowType] = useState<
    'popup' | 'dialog' | 'large' | 'minimal'
  >('popup');
  const [customFeatures, setCustomFeatures] = useState('');

  const handleOpenWindow = async () => {
    const config = WindowManagerUtils.createConfig(windowType);
    const features = customFeatures || config.features;

    await windowManager.openWindow(newWindowUrl, {
      name: windowName || undefined,
      features,
      focus: config.focus,
    });
  };

  const handleOpenMultipleWindows = async () => {
    const urls = [
      'https://www.google.com',
      'https://www.github.com',
      'https://www.stackoverflow.com',
    ];

    for (let i = 0; i < urls.length; i++) {
      await windowManager.openWindow(urls[i], {
        name: `window-${i + 1}`,
        features: WindowManagerUtils.WINDOW_FEATURES.POPUP,
      });

      // Small delay between opens
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  const handleOpenCenteredWindow = async () => {
    const { left, top } = WindowManagerUtils.getCenteredPosition(600, 400);
    const features = WindowManagerUtils.createFeatures({
      width: 600,
      height: 400,
      left,
      top,
      scrollbars: true,
      resizable: true,
      toolbar: false,
    });

    await windowManager.openWindow(newWindowUrl, {
      name: 'centered-window',
      features,
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Window Operations Demo</h2>

      {/* Window Opening Configuration */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '20px',
        }}
      >
        <h3>Open New Window</h3>

        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
            }}
          >
            Window URL:
          </label>
          <input
            type='url'
            value={newWindowUrl}
            onChange={e => setNewWindowUrl(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
            placeholder='https://www.example.com'
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
            }}
          >
            Window Name (optional):
          </label>
          <input
            type='text'
            value={windowName}
            onChange={e => setWindowName(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
            placeholder='my-window'
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
            }}
          >
            Window Type:
          </label>
          <select
            value={windowType}
            onChange={e => setWindowType(e.target.value as any)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
          >
            <option value='popup'>Popup (400x300)</option>
            <option value='dialog'>Dialog (600x400)</option>
            <option value='large'>Large (1024x768)</option>
            <option value='minimal'>Minimal (no toolbars)</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
            }}
          >
            Custom Features (overrides type):
          </label>
          <input
            type='text'
            value={customFeatures}
            onChange={e => setCustomFeatures(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
            placeholder='width=500,height=400,resizable=yes'
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleOpenWindow}
            disabled={windowManager.isLoading || !newWindowUrl}
            style={{
              padding: '10px 16px',
              backgroundColor:
                !newWindowUrl || windowManager.isLoading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !newWindowUrl || windowManager.isLoading
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            🪟 Open Window
          </button>

          <button
            onClick={handleOpenCenteredWindow}
            disabled={windowManager.isLoading || !newWindowUrl}
            style={{
              padding: '10px 16px',
              backgroundColor:
                !newWindowUrl || windowManager.isLoading ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !newWindowUrl || windowManager.isLoading
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            🎯 Open Centered
          </button>

          <button
            onClick={handleOpenMultipleWindows}
            disabled={windowManager.isLoading}
            style={{
              padding: '10px 16px',
              backgroundColor: windowManager.isLoading ? '#ccc' : '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: windowManager.isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            📱 Open Multiple
          </button>
        </div>
      </div>

      {/* Window Management Actions */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#e7f3ff',
          borderRadius: '8px',
          border: '1px solid #b3d7ff',
          marginBottom: '20px',
        }}
      >
        <h3>Window Management Actions</h3>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={windowManager.refreshWindows}
            style={{
              padding: '10px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🔄 Refresh Windows
          </button>

          <button
            onClick={() => {
              const count = windowManager.closeAllWindows();
              alert(`Closed ${count} windows`);
            }}
            disabled={windowManager.getWindowCount().open === 0}
            style={{
              padding: '10px 16px',
              backgroundColor:
                windowManager.getWindowCount().open === 0 ? '#ccc' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                windowManager.getWindowCount().open === 0
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            ❌ Close All Windows
          </button>

          <button
            onClick={
              windowManager.isPolling
                ? windowManager.stopPolling
                : windowManager.startPolling
            }
            style={{
              padding: '10px 16px',
              backgroundColor: windowManager.isPolling ? '#ffc107' : '#28a745',
              color: windowManager.isPolling ? 'black' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {windowManager.isPolling ? '⏸️ Stop Polling' : '▶️ Start Polling'}
          </button>
        </div>
      </div>

      {/* Current Window State */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fff8dc',
          borderRadius: '8px',
          border: '1px solid #ffeaa7',
        }}
      >
        <h3>Current State</h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
          }}
        >
          <div>
            <strong>Total Windows:</strong> {windowManager.windows.length}
          </div>
          <div>
            <strong>Open Windows:</strong> {windowManager.getWindowCount().open}
          </div>
          <div>
            <strong>Polling Status:</strong>{' '}
            {windowManager.isPolling ? 'Active' : 'Inactive'}
          </div>
          <div>
            <strong>Loading:</strong> {windowManager.isLoading ? 'Yes' : 'No'}
          </div>
        </div>

        {windowManager.error && (
          <div
            style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c6cb',
              borderRadius: '4px',
              color: '#721c24',
            }}
          >
            <strong>Error:</strong> {windowManager.error}
          </div>
        )}
      </div>
    </div>
  );
};

// Feature Examples Demo
const FeatureExamplesDemo: React.FC = () => {
  const windowManager = useWindowManager();
  const [examples] = useState([
    {
      title: 'Help Window',
      description: 'Small popup for help documentation',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window_Management_API',
      config: WindowManagerUtils.createConfig('popup'),
    },
    {
      title: 'Settings Dialog',
      description: 'Medium-sized dialog for application settings',
      url: 'https://web.dev/window-management/',
      config: WindowManagerUtils.createConfig('dialog'),
    },
    {
      title: 'Document Viewer',
      description: 'Large window for viewing documents',
      url: 'https://github.com/topics/window-management',
      config: WindowManagerUtils.createConfig('large'),
    },
    {
      title: 'Minimal Player',
      description: 'Clean window without browser UI',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      config: WindowManagerUtils.createConfig('minimal'),
    },
  ]);

  const handleOpenExample = async (example: (typeof examples)[0]) => {
    await windowManager.openWindow(example.url, {
      name: example.title.toLowerCase().replace(/\s+/g, '-'),
      features: example.config.features,
      focus: example.config.focus,
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Window Configuration Examples</h2>

      <div
        style={{
          padding: '15px',
          backgroundColor: '#d1ecf1',
          border: '1px solid #bee5eb',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        ℹ️ <strong>Note:</strong> These examples demonstrate different window
        configurations for common use cases. Click to open each example and see
        how they appear.
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {examples.map((example, index) => (
          <div
            key={index}
            style={{
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #dee2e6',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#007bff' }}>
                  {example.title}
                </h4>
                <p
                  style={{
                    margin: '0 0 12px 0',
                    color: '#666',
                    fontSize: '14px',
                  }}
                >
                  {example.description}
                </p>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    fontFamily: 'monospace',
                  }}
                >
                  <strong>Features:</strong> {example.config.features}
                </div>
                <div
                  style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}
                >
                  <strong>Focus:</strong> {example.config.focus ? 'Yes' : 'No'}
                </div>
              </div>

              <button
                onClick={() => handleOpenExample(example)}
                disabled={windowManager.isLoading}
                style={{
                  padding: '8px 16px',
                  backgroundColor: windowManager.isLoading ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: windowManager.isLoading ? 'not-allowed' : 'pointer',
                  marginLeft: '15px',
                  whiteSpace: 'nowrap',
                }}
              >
                Open Example
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fff8dc',
          borderRadius: '8px',
          border: '1px solid #ffeaa7',
          marginTop: '20px',
        }}
      >
        <h3>Configuration Tips</h3>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>
            <strong>Popup Windows:</strong> Best for help, notifications, or
            small interactions
          </li>
          <li>
            <strong>Dialog Windows:</strong> Good for forms, settings, or
            detailed information
          </li>
          <li>
            <strong>Large Windows:</strong> Suitable for document viewing or
            complex interfaces
          </li>
          <li>
            <strong>Minimal Windows:</strong> Great for media players or
            distraction-free content
          </li>
          <li>
            <strong>Centered Windows:</strong> Use
            WindowManagerUtils.getCenteredPosition() for better UX
          </li>
        </ul>
      </div>
    </div>
  );
};

export const WindowManagerStatus: Story = {
  render: () => <WindowManagerStatusDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Shows the current status of window management capabilities, browser compatibility, and active window tracking.',
      },
    },
  },
};

export const WindowOperations: Story = {
  render: () => <WindowOperationsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo for opening, managing, and controlling multiple application windows with various configurations.',
      },
    },
  },
};

export const FeatureExamples: Story = {
  render: () => <FeatureExamplesDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Examples of different window configurations for common use cases like help popups, settings dialogs, and document viewers.',
      },
    },
  },
};
