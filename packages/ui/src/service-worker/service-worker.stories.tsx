/**
 * @fileoverview Service Worker Stories for Epic 67
 * Interactive demonstrations of AAE service worker functionality
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ServiceWorkerManager, useServiceWorker } from './register';

const meta: Meta = {
  title: 'AAE/Service Worker/Advanced Caching',
  parameters: {
    docs: {
      description: {
        component:
          'Advanced caching service worker with multi-strategy caching for AAE offline capabilities. Includes Cache First, Network First, and Stale-While-Revalidate strategies.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Service Worker Manager Demo
const ServiceWorkerManagerDemo: React.FC = () => {
  const {
    registration,
    isOnline,
    updateAvailable,
    isStandalone,
    isSupported,
    skipWaiting,
    checkForUpdates,
    getCacheStatus,
    clearCaches,
  } = useServiceWorker({
    swUrl: '/sw.js',
    onRegistered: reg => {
      console.log('Service Worker registered:', reg);
    },
    onUpdated: reg => {
      console.log('Service Worker updated:', reg);
    },
    onError: error => {
      console.error('Service Worker error:', error);
    },
    onOffline: () => {
      console.log('App went offline');
    },
    onOnline: () => {
      console.log('App came back online');
    },
  });

  const [cacheStatus, setCacheStatus] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [
      `${new Date().toLocaleTimeString()}: ${message}`,
      ...prev.slice(0, 9),
    ]);
  };

  const handleCheckUpdates = async () => {
    addLog('Checking for updates...');
    await checkForUpdates();
    addLog('Update check completed');
  };

  const handleSkipWaiting = async () => {
    addLog('Activating new service worker...');
    await skipWaiting();
  };

  const handleGetCacheStatus = async () => {
    addLog('Getting cache status...');
    const status = await getCacheStatus();
    setCacheStatus(status);
    addLog(`Cache status retrieved: ${status?.caches?.length || 0} caches`);
  };

  const handleClearCaches = async () => {
    addLog('Clearing all caches...');
    const success = await clearCaches();
    addLog(success ? 'Caches cleared successfully' : 'Failed to clear caches');
    if (success) {
      setCacheStatus(null);
    }
  };

  const getStatusColor = (status: boolean | undefined) => {
    return status ? '#28a745' : '#dc3545';
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Service Worker Manager</h2>

      {!isSupported && (
        <div
          style={{
            padding: '10px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          ⚠️ Service Workers are not supported in this browser
        </div>
      )}

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
        <h3>Service Worker Status</h3>

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
                backgroundColor: getStatusColor(isSupported),
              }}
            />
            <span>
              <strong>Supported:</strong> {isSupported ? 'Yes' : 'No'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(!!registration),
              }}
            />
            <span>
              <strong>Registered:</strong> {registration ? 'Yes' : 'No'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(isOnline),
              }}
            />
            <span>
              <strong>Online:</strong> {isOnline ? 'Yes' : 'No'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(isStandalone),
              }}
            />
            <span>
              <strong>Standalone:</strong> {isStandalone ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        {updateAvailable && (
          <div
            style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>🔄 A new version is available!</span>
            <button
              onClick={handleSkipWaiting}
              style={{
                padding: '6px 12px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Update Now
            </button>
          </div>
        )}
      </div>

      {/* Control Actions */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '1px solid #90caf9',
          marginBottom: '20px',
        }}
      >
        <h3>Service Worker Controls</h3>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={handleCheckUpdates}
            disabled={!registration}
            style={{
              padding: '8px 16px',
              backgroundColor: registration ? '#007bff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: registration ? 'pointer' : 'not-allowed',
            }}
          >
            Check for Updates
          </button>

          <button
            onClick={handleGetCacheStatus}
            disabled={!registration}
            style={{
              padding: '8px 16px',
              backgroundColor: registration ? '#17a2b8' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: registration ? 'pointer' : 'not-allowed',
            }}
          >
            Get Cache Status
          </button>

          <button
            onClick={handleClearCaches}
            disabled={!registration}
            style={{
              padding: '8px 16px',
              backgroundColor: registration ? '#dc3545' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: registration ? 'pointer' : 'not-allowed',
            }}
          >
            Clear All Caches
          </button>
        </div>

        <div style={{ fontSize: '12px', color: '#666' }}>
          💡 <strong>Tip:</strong> Use browser DevTools → Application → Service
          Workers to see detailed status
        </div>
      </div>

      {/* Cache Status Display */}
      {cacheStatus && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#f0f8ff',
            borderRadius: '8px',
            border: '1px solid #b6d7ff',
            marginBottom: '20px',
          }}
        >
          <h3>Cache Status</h3>

          <div style={{ marginBottom: '15px', fontSize: '14px' }}>
            <strong>Version:</strong> {cacheStatus.version}
          </div>

          {cacheStatus.caches && cacheStatus.caches.length > 0 ? (
            <div>
              <h4 style={{ marginBottom: '10px' }}>Active Caches:</h4>
              <div style={{ display: 'grid', gap: '8px' }}>
                {cacheStatus.caches.map((cache: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      padding: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      borderRadius: '4px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                        {cache.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {cache.name.includes('static')
                          ? '📄 Static Assets'
                          : cache.name.includes('api')
                            ? '🔗 API Data'
                            : cache.name.includes('dynamic')
                              ? '🌐 Dynamic Content'
                              : '💾 Cached Data'}
                      </div>
                    </div>
                    <div
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '12px',
                      }}
                    >
                      {cache.count} items
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                color: '#666',
                fontStyle: 'italic',
              }}
            >
              No active caches found
            </div>
          )}
        </div>
      )}

      {/* Activity Log */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
        }}
      >
        <h3>Activity Log</h3>

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
};

// Caching Strategies Demo
const CachingStrategiesDemo: React.FC = () => {
  const [testResults, setTestResults] = useState<any[]>([]);

  const testStrategies = [
    {
      name: 'Cache First',
      description: 'Good for static assets (CSS, JS, images)',
      url: '/static/test-image.jpg',
      icon: '📄',
    },
    {
      name: 'Network First',
      description: 'Good for critical data (auth, config)',
      url: '/api/auth/status',
      icon: '🔗',
    },
    {
      name: 'Stale While Revalidate',
      description: 'Good for non-critical content (feeds, posts)',
      url: '/api/posts/recent',
      icon: '🔄',
    },
  ];

  const testStrategy = async (strategy: (typeof testStrategies)[0]) => {
    const startTime = Date.now();

    try {
      const response = await fetch(strategy.url, {
        cache: 'no-cache', // Force through service worker
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      const result = {
        ...strategy,
        success: response.ok,
        status: response.status,
        duration,
        fromCache: response.headers.get('sw-cached-time') ? true : false,
        timestamp: new Date().toLocaleTimeString(),
      };

      setTestResults(prev => [result, ...prev.slice(0, 9)]);
    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;

      const result = {
        ...strategy,
        success: false,
        error: (error as Error).message,
        duration,
        fromCache: false,
        timestamp: new Date().toLocaleTimeString(),
      };

      setTestResults(prev => [result, ...prev.slice(0, 9)]);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Caching Strategies Testing</h2>

      <div
        style={{
          padding: '15px',
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
          border: '1px solid #ffeaa7',
          marginBottom: '20px',
          fontSize: '14px',
        }}
      >
        ℹ️ <strong>Note:</strong> This demo requires the service worker to be
        installed and active. The actual caching behavior depends on your
        service worker configuration and network conditions.
      </div>

      {/* Strategy Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        {testStrategies.map((strategy, index) => (
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
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px',
              }}
            >
              <div style={{ fontSize: '24px' }}>{strategy.icon}</div>
              <h3 style={{ margin: 0 }}>{strategy.name}</h3>
            </div>

            <p
              style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}
            >
              {strategy.description}
            </p>

            <div
              style={{
                marginBottom: '15px',
                fontSize: '12px',
                fontFamily: 'monospace',
              }}
            >
              <strong>Test URL:</strong> {strategy.url}
            </div>

            <button
              onClick={() => testStrategy(strategy)}
              style={{
                width: '100%',
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Test Strategy
            </button>
          </div>
        ))}
      </div>

      {/* Test Results */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f0f8ff',
          borderRadius: '8px',
          border: '1px solid #b6d7ff',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          <h3>Test Results</h3>
          <button
            onClick={clearResults}
            disabled={testResults.length === 0}
            style={{
              padding: '6px 12px',
              backgroundColor: testResults.length > 0 ? '#dc3545' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: testResults.length > 0 ? 'pointer' : 'not-allowed',
              fontSize: '12px',
            }}
          >
            Clear Results
          </button>
        </div>

        {testResults.length === 0 ? (
          <div
            style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}
          >
            No test results yet. Click "Test Strategy" buttons above to begin
            testing.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {testResults.map((result, index) => (
              <div
                key={index}
                style={{
                  padding: '10px',
                  backgroundColor: result.success ? '#d4edda' : '#f8d7da',
                  border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>{result.icon}</span>
                    <strong>{result.name}</strong>
                    {result.fromCache && (
                      <span
                        style={{
                          padding: '2px 6px',
                          backgroundColor: 'rgba(0, 123, 255, 0.1)',
                          color: '#007bff',
                          borderRadius: '3px',
                          fontSize: '10px',
                        }}
                      >
                        CACHED
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {result.timestamp}
                  </div>
                </div>

                <div style={{ marginTop: '4px', fontSize: '12px' }}>
                  <span style={{ marginRight: '15px' }}>
                    Status:{' '}
                    {result.success
                      ? `✅ ${result.status}`
                      : `❌ ${result.error}`}
                  </span>
                  <span>Duration: {result.duration}ms</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Basic Service Worker Registration Demo
const BasicRegistrationDemo: React.FC = () => {
  const [manager] = useState(
    () =>
      new ServiceWorkerManager({
        swUrl: '/sw.js',
        debug: true,
      })
  );

  const [status, setStatus] = useState('Not registered');
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  const handleRegister = async () => {
    setStatus('Registering...');
    try {
      const reg = await manager.register();
      setRegistration(reg);
      setStatus(reg ? 'Registered successfully' : 'Registration failed');
    } catch (error) {
      setStatus(`Registration failed: ${(error as Error).message}`);
    }
  };

  const handleUnregister = async () => {
    if (!registration) return;

    setStatus('Unregistering...');
    try {
      const success = await manager.unregister();
      if (success) {
        setRegistration(null);
        setStatus('Unregistered successfully');
      } else {
        setStatus('Unregistration failed');
      }
    } catch (error) {
      setStatus(`Unregistration failed: ${(error as Error).message}`);
    }
  };

  const isSupported = manager.isSupported();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Basic Service Worker Registration</h2>

      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '20px',
        }}
      >
        <h3>Registration Status</h3>

        <div style={{ marginBottom: '15px' }}>
          <div>
            <strong>Supported:</strong> {isSupported ? '✅ Yes' : '❌ No'}
          </div>
          <div>
            <strong>Status:</strong> {status}
          </div>
          <div>
            <strong>Registration:</strong>{' '}
            {registration ? '✅ Active' : '❌ None'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleRegister}
            disabled={!isSupported || !!registration}
            style={{
              padding: '8px 16px',
              backgroundColor:
                !isSupported || !!registration ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !isSupported || !!registration ? 'not-allowed' : 'pointer',
            }}
          >
            Register Service Worker
          </button>

          <button
            onClick={handleUnregister}
            disabled={!registration}
            style={{
              padding: '8px 16px',
              backgroundColor: !registration ? '#ccc' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !registration ? 'not-allowed' : 'pointer',
            }}
          >
            Unregister Service Worker
          </button>
        </div>
      </div>

      <div
        style={{
          padding: '15px',
          backgroundColor: '#e7f3ff',
          borderRadius: '8px',
          border: '1px solid #b3d7ff',
          fontSize: '14px',
        }}
      >
        <strong>Service Worker Features:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>
            🗄️ Multi-strategy caching (Cache First, Network First,
            Stale-While-Revalidate)
          </li>
          <li>📦 Automatic asset pre-caching</li>
          <li>🌐 Offline page fallback</li>
          <li>🔄 Background sync and updates</li>
          <li>📱 Push notification support</li>
          <li>🧹 Automatic cache cleanup</li>
        </ul>
      </div>
    </div>
  );
};

export const ManagerDemo: Story = {
  render: () => <ServiceWorkerManagerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive service worker management with registration, update handling, cache status monitoring, and control actions.',
      },
    },
  },
};

export const CachingStrategies: Story = {
  render: () => <CachingStrategiesDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive testing of different caching strategies: Cache First for static assets, Network First for critical data, and Stale-While-Revalidate for content feeds.',
      },
    },
  },
};

export const BasicRegistration: Story = {
  render: () => <BasicRegistrationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic service worker registration and unregistration with status monitoring for simple use cases.',
      },
    },
  },
};
