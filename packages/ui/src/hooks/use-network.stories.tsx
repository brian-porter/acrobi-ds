/**
 * Network Information Hook Stories
 * Epic 60 - AAE Network Information
 *
 * Comprehensive Storybook stories demonstrating network status monitoring
 * and adaptive UI features based on connection quality.
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useNetwork, NetworkInfo } from './use-network';

const meta: Meta = {
  title: 'Hooks/useNetwork',
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive network information hook that provides real-time network status monitoring, connection quality assessment, and adaptive UI capabilities using the Network Information API.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Network Status Component for Stories
const NetworkStatusDemo: React.FC<{ options?: any }> = ({ options }) => {
  const {
    isOnline,
    isOffline,
    networkInfo,
    connectionQuality,
    estimatedBandwidth,
    checkConnection,
    isSlowConnection,
    canUpload,
    isNetworkSuitable,
    getSuggestedQuality,
    isSupported,
  } = useNetwork(options);

  const [connectionHistory, setConnectionHistory] = useState<
    Array<{
      timestamp: string;
      status: string;
      quality: string;
      info: NetworkInfo;
    }>
  >([]);

  const [testFileSize, setTestFileSize] = useState<number>(5); // MB
  const [minBandwidth, setMinBandwidth] = useState<number>(1); // Mbps
  const [isChecking, setIsChecking] = useState(false);

  // Track connection changes
  useEffect(() => {
    const newEntry = {
      timestamp: new Date().toLocaleTimeString(),
      status: isOnline ? 'Online' : 'Offline',
      quality: connectionQuality,
      info: networkInfo,
    };

    setConnectionHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
  }, [isOnline, connectionQuality, networkInfo]);

  const handleManualCheck = async () => {
    setIsChecking(true);
    const result = await checkConnection();
    setIsChecking(false);
    console.log('Manual connection check result:', result);
  };

  const formatBytes = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const getConnectionIcon = () => {
    if (isOffline) return '📵';
    switch (connectionQuality) {
      case 'excellent':
        return '📶';
      case 'good':
        return '📶';
      case 'poor':
        return '📶';
      default:
        return '❓';
    }
  };

  const getConnectionColor = () => {
    if (isOffline) return '#f44336';
    switch (connectionQuality) {
      case 'excellent':
        return '#4caf50';
      case 'good':
        return '#ff9800';
      case 'poor':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px' }}>
      <h2>Network Information Demo</h2>

      {/* Browser Support Warning */}
      {!isSupported && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#ffeb3b',
            border: '2px solid #ff9800',
            borderRadius: '8px',
            marginBottom: '20px',
            fontWeight: 'bold',
            color: '#e65100',
          }}
        >
          ⚠️ Network Information API is not fully supported in this browser.
          Basic online/offline detection is available.
        </div>
      )}

      {/* Current Network Status */}
      <div
        style={{
          padding: '20px',
          backgroundColor: getConnectionColor() + '20',
          border: `2px solid ${getConnectionColor()}`,
          borderRadius: '12px',
          marginBottom: '20px',
        }}
      >
        <h3
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '0 0 15px 0',
          }}
        >
          {getConnectionIcon()} Current Network Status
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
          }}
        >
          <div>
            <strong>Connection:</strong>
            <br />
            <span
              style={{
                color: getConnectionColor(),
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              {isOnline ? '✅ Online' : '❌ Offline'}
            </span>
          </div>

          <div>
            <strong>Quality:</strong>
            <br />
            <span
              style={{
                color: getConnectionColor(),
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
            >
              {connectionQuality}
            </span>
          </div>

          <div>
            <strong>Effective Type:</strong>
            <br />
            <span style={{ fontFamily: 'monospace', fontSize: '16px' }}>
              {networkInfo.effectiveType.toUpperCase()}
            </span>
          </div>

          <div>
            <strong>Downlink:</strong>
            <br />
            <span style={{ fontFamily: 'monospace', fontSize: '16px' }}>
              {networkInfo.downlink.toFixed(1)} Mbps
            </span>
          </div>

          <div>
            <strong>RTT (Latency):</strong>
            <br />
            <span style={{ fontFamily: 'monospace', fontSize: '16px' }}>
              {networkInfo.rtt} ms
            </span>
          </div>

          <div>
            <strong>Save Data:</strong>
            <br />
            <span
              style={{
                color: networkInfo.saveData ? '#ff9800' : '#4caf50',
                fontWeight: 'bold',
              }}
            >
              {networkInfo.saveData ? '💾 Enabled' : '🔄 Disabled'}
            </span>
          </div>
        </div>
      </div>

      {/* Network Quality Assessment */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Connection Analysis</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
          }}
        >
          <div
            style={{
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              border: '1px solid #ddd',
            }}
          >
            <h4>🐌 Slow Connection Check</h4>
            <p
              style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}
            >
              {isSlowConnection() ? '❌ Yes (Slow)' : '✅ No (Fast)'}
            </p>
            <small>
              Based on downlink &lt; 0.5 Mbps or 2G/slow-2G connection
            </small>
          </div>

          <div
            style={{
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              border: '1px solid #ddd',
            }}
          >
            <h4>🎯 Suggested Quality</h4>
            <p
              style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}
            >
              {getSuggestedQuality().toUpperCase()}
            </p>
            <small>Recommended content quality for current connection</small>
          </div>

          <div
            style={{
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              border: '1px solid #ddd',
            }}
          >
            <h4>🔗 Network Suitable</h4>
            <div style={{ marginBottom: '10px' }}>
              <label>Min Bandwidth (Mbps):</label>
              <input
                type='number'
                value={minBandwidth}
                onChange={e => setMinBandwidth(Number(e.target.value))}
                style={{
                  marginLeft: '10px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  width: '80px',
                }}
                min='0.1'
                max='100'
                step='0.1'
              />
            </div>
            <p
              style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}
            >
              {isNetworkSuitable(minBandwidth)
                ? '✅ Suitable'
                : '❌ Not Suitable'}
            </p>
          </div>
        </div>
      </div>

      {/* Upload Capability Test */}
      <div style={{ marginBottom: '20px' }}>
        <h3>📤 Upload Capability Test</h3>
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            border: '1px solid #ddd',
            display: 'inline-block',
            minWidth: '300px',
          }}
        >
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Test File Size:
            </label>
            <input
              type='range'
              min='1'
              max='100'
              value={testFileSize}
              onChange={e => setTestFileSize(Number(e.target.value))}
              style={{ width: '200px', marginRight: '10px' }}
            />
            <span style={{ fontFamily: 'monospace' }}>
              {formatBytes(testFileSize * 1024 * 1024)}
            </span>
          </div>

          <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}>
            Upload Recommended:{' '}
            <span
              style={{
                color: canUpload(testFileSize * 1024 * 1024)
                  ? '#4caf50'
                  : '#f44336',
              }}
            >
              {canUpload(testFileSize * 1024 * 1024) ? '✅ Yes' : '❌ No'}
            </span>
          </p>

          <small>Based on connection speed and estimated upload time</small>
        </div>
      </div>

      {/* Manual Connection Test */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🔍 Connection Testing</h3>
        <button
          onClick={handleManualCheck}
          disabled={isChecking}
          style={{
            padding: '12px 24px',
            backgroundColor: isChecking ? '#ccc' : '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isChecking ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {isChecking ? '🔄 Testing...' : '🧪 Test Connection'}
        </button>
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          Performs a manual connectivity test by fetching a small resource
        </p>
      </div>

      {/* Connection History */}
      <div style={{ marginBottom: '20px' }}>
        <h3>📊 Connection History</h3>
        <div
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        >
          {connectionHistory.map((entry, index) => (
            <div
              key={index}
              style={{
                padding: '12px',
                borderBottom:
                  index < connectionHistory.length - 1
                    ? '1px solid #eee'
                    : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              <div>
                <strong>{entry.timestamp}</strong> - {entry.status}
              </div>
              <div>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor:
                      entry.status === 'Online' ? '#e8f5e8' : '#ffebee',
                    color: entry.status === 'Online' ? '#2e7d32' : '#c62828',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {entry.quality.toUpperCase()}
                </span>
                <span style={{ marginLeft: '10px', fontFamily: 'monospace' }}>
                  {entry.info.downlink.toFixed(1)} Mbps
                </span>
              </div>
            </div>
          ))}

          {connectionHistory.length === 0 && (
            <div
              style={{
                padding: '20px',
                textAlign: 'center',
                color: '#666',
                fontStyle: 'italic',
              }}
            >
              Connection changes will appear here...
            </div>
          )}
        </div>
      </div>

      {/* Network Info Details */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🔧 Technical Details</h3>
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <strong>API Support:</strong>{' '}
            {isSupported ? '✅ Supported' : '❌ Limited Support'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Navigator Online:</strong>{' '}
            {navigator.onLine ? 'true' : 'false'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Connection Object:</strong>{' '}
            {typeof (navigator as any).connection !== 'undefined'
              ? 'Available'
              : 'Not Available'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Estimated Bandwidth:</strong>{' '}
            {estimatedBandwidth.toFixed(2)} Mbps
          </div>
          <div>
            <strong>Raw Network Info:</strong>
            <pre
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {JSON.stringify(networkInfo, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div>
        <h3>💡 Best Practices</h3>
        <div
          style={{
            fontSize: '14px',
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Respect Save Data:</strong> When `saveData` is true,
              reduce data usage by serving lower quality content
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Adaptive Loading:</strong> Use connection quality to
              determine what resources to load
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Progressive Enhancement:</strong> Provide fallbacks for
              browsers without Network Information API
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>User Experience:</strong> Show loading indicators on slow
              connections and optimize for performance
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Battery Awareness:</strong> Reduce background activity on
              slower connections to save battery
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Basic Network Status Story
export const BasicNetworkStatus: Story = {
  render: () => <NetworkStatusDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic network status monitoring with real-time connection information, quality assessment, and adaptive recommendations.',
      },
    },
  },
};

// Network Aware Features Story
export const NetworkAwareFeatures: Story = {
  render: () => {
    const AdaptiveContentDemo: React.FC = () => {
      const {
        connectionQuality,
        isSlowConnection,
        getSuggestedQuality,
        networkInfo,
        isOnline,
      } = useNetwork({
        onOnline: () => console.log('🟢 Connection restored'),
        onOffline: () => console.log('🔴 Connection lost'),
        onConnectionChange: info => console.log('📡 Network changed:', info),
      });

      const [contentType, setContentType] = useState<
        'auto' | 'low' | 'medium' | 'high'
      >('auto');

      const getContentForQuality = (quality: string) => {
        switch (quality) {
          case 'high':
            return {
              image: '🎬 4K Video Content',
              description: 'High-resolution media and rich animations',
              features: [
                '4K video streaming',
                'HD images',
                'Complex animations',
                'Real-time features',
              ],
            };
          case 'medium':
            return {
              image: '📺 HD Video Content',
              description: 'Standard quality media with good performance',
              features: [
                '1080p video streaming',
                'Compressed images',
                'Smooth animations',
                'Standard features',
              ],
            };
          case 'low':
            return {
              image: '📱 Mobile-Optimized Content',
              description: 'Lightweight content for slow connections',
              features: [
                'Audio-only streaming',
                'Thumbnail images',
                'Minimal animations',
                'Essential features only',
              ],
            };
          default:
            return {
              image: '❓ Unknown Quality',
              description: 'Unable to determine optimal content',
              features: ['Fallback content', 'Basic functionality'],
            };
        }
      };

      const currentQuality =
        contentType === 'auto' ? getSuggestedQuality() : contentType;
      const content = getContentForQuality(currentQuality);

      return (
        <div style={{ padding: '20px', maxWidth: '800px' }}>
          <h3>🎯 Adaptive Content Demo</h3>

          {!isOnline && (
            <div
              style={{
                padding: '15px',
                backgroundColor: '#ffebee',
                border: '2px solid #f44336',
                borderRadius: '8px',
                marginBottom: '20px',
                color: '#c62828',
              }}
            >
              <strong>📵 Offline Mode:</strong> Showing cached content only
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <h4>Content Quality Selection:</h4>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              {['auto', 'low', 'medium', 'high'].map(quality => (
                <button
                  key={quality}
                  onClick={() => setContentType(quality as any)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor:
                      contentType === quality ? '#2196f3' : '#f5f5f5',
                    color: contentType === quality ? 'white' : '#333',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {quality === 'auto'
                    ? `Auto (${getSuggestedQuality()})`
                    : quality}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#f5f5f5',
              borderRadius: '12px',
              border: '2px solid #ddd',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>
                {content.image}
              </div>
              <h4 style={{ margin: '0 0 10px 0' }}>
                {currentQuality.toUpperCase()} Quality Content
              </h4>
              <p style={{ color: '#666', margin: 0 }}>{content.description}</p>
            </div>

            <div>
              <h5>Enabled Features:</h5>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {content.features.map((feature, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            style={{
              marginTop: '20px',
              padding: '15px',
              backgroundColor: isSlowConnection() ? '#fff3e0' : '#e8f5e8',
              borderRadius: '8px',
              border: `2px solid ${isSlowConnection() ? '#ff9800' : '#4caf50'}`,
            }}
          >
            <h5>Current Network Assessment:</h5>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px',
              }}
            >
              <div>
                <strong>Connection Quality:</strong>
                <br />
                <span style={{ textTransform: 'capitalize' }}>
                  {connectionQuality}
                </span>
              </div>
              <div>
                <strong>Speed:</strong>
                <br />
                {networkInfo.downlink.toFixed(1)} Mbps
              </div>
              <div>
                <strong>Slow Connection:</strong>
                <br />
                {isSlowConnection() ? '⚠️ Yes' : '✅ No'}
              </div>
              <div>
                <strong>Save Data Mode:</strong>
                <br />
                {networkInfo.saveData ? '💾 Enabled' : '🔄 Disabled'}
              </div>
            </div>
          </div>
        </div>
      );
    };

    return <AdaptiveContentDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates adaptive content loading based on network conditions, with automatic quality selection and user override options.',
      },
    },
  },
};

// Offline Handling Story
export const OfflineHandling: Story = {
  render: () => {
    const OfflineDemo: React.FC = () => {
      const [offlineActions, setOfflineActions] = useState<string[]>([]);
      const [onlineActions, setOnlineActions] = useState<string[]>([]);

      const network = useNetwork({
        onOnline: () => {
          const action = `🟢 Connected at ${new Date().toLocaleTimeString()}`;
          setOnlineActions(prev => [action, ...prev.slice(0, 4)]);
          console.log('Network back online - syncing offline actions...');
        },
        onOffline: () => {
          const action = `🔴 Disconnected at ${new Date().toLocaleTimeString()}`;
          setOfflineActions(prev => [action, ...prev.slice(0, 4)]);
          console.log('Network went offline - queuing actions...');
        },
        onConnectionChange: info => {
          console.log('Network info changed:', info);
        },
        checkInterval: 5000, // Check every 5 seconds
      });

      const simulateOfflineAction = () => {
        const action = `📝 Action queued at ${new Date().toLocaleTimeString()}`;
        if (network.isOffline) {
          setOfflineActions(prev => [action, ...prev.slice(0, 9)]);
        } else {
          setOnlineActions(prev => [
            `✅ ${action} (executed immediately)`,
            ...prev.slice(0, 4),
          ]);
        }
      };

      return (
        <div style={{ padding: '20px', maxWidth: '800px' }}>
          <h3>📵 Offline Handling Demo</h3>

          <div
            style={{
              padding: '20px',
              backgroundColor: network.isOnline ? '#e8f5e8' : '#ffebee',
              border: `2px solid ${network.isOnline ? '#4caf50' : '#f44336'}`,
              borderRadius: '12px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            <h4 style={{ margin: '0 0 10px 0' }}>
              {network.isOnline ? '🟢 Online Mode' : '🔴 Offline Mode'}
            </h4>
            <p style={{ margin: '0' }}>
              {network.isOnline
                ? 'All actions will be executed immediately'
                : 'Actions will be queued until connection is restored'}
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={simulateOfflineAction}
              style={{
                padding: '12px 24px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              📝 Simulate User Action
            </button>
            <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              Try turning off your internet connection and clicking the button
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
            }}
          >
            {/* Offline Actions Queue */}
            <div>
              <h4>📋 Offline Actions Queue</h4>
              <div
                style={{
                  minHeight: '200px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff3e0',
                }}
              >
                {offlineActions.map((action, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '10px',
                      borderBottom:
                        index < offlineActions.length - 1
                          ? '1px solid #eee'
                          : 'none',
                      fontSize: '14px',
                    }}
                  >
                    {action}
                  </div>
                ))}

                {offlineActions.length === 0 && (
                  <div
                    style={{
                      padding: '20px',
                      textAlign: 'center',
                      color: '#666',
                      fontStyle: 'italic',
                    }}
                  >
                    No offline actions yet
                  </div>
                )}
              </div>
            </div>

            {/* Online Actions Log */}
            <div>
              <h4>✅ Online Actions Log</h4>
              <div
                style={{
                  minHeight: '200px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#e8f5e8',
                }}
              >
                {onlineActions.map((action, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '10px',
                      borderBottom:
                        index < onlineActions.length - 1
                          ? '1px solid #eee'
                          : 'none',
                      fontSize: '14px',
                    }}
                  >
                    {action}
                  </div>
                ))}

                {onlineActions.length === 0 && (
                  <div
                    style={{
                      padding: '20px',
                      textAlign: 'center',
                      color: '#666',
                      fontStyle: 'italic',
                    }}
                  >
                    No online actions yet
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: '20px',
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
            }}
          >
            <h5>📊 Connection Stats</h5>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '10px',
              }}
            >
              <div>
                <strong>Status:</strong>{' '}
                {network.isOnline ? 'Online' : 'Offline'}
              </div>
              <div>
                <strong>Quality:</strong> {network.connectionQuality}
              </div>
              <div>
                <strong>Speed:</strong>{' '}
                {network.networkInfo.downlink.toFixed(1)} Mbps
              </div>
              <div>
                <strong>Latency:</strong> {network.networkInfo.rtt} ms
              </div>
            </div>
          </div>
        </div>
      );
    };

    return <OfflineDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates offline handling patterns with action queuing, connection restoration detection, and state synchronization.',
      },
    },
  },
};

// Performance Optimization Story
export const PerformanceOptimization: Story = {
  render: () => {
    const PerformanceDemo: React.FC = () => {
      const network = useNetwork({
        checkInterval: 10000, // Check every 10 seconds
      });

      const [loadingStrategy, setLoadingStrategy] = useState<
        'aggressive' | 'conservative' | 'auto'
      >('auto');
      const [resourcesLoaded, setResourcesLoaded] = useState<string[]>([]);

      useEffect(() => {
        // Simulate loading resources based on network conditions
        const loadResources = () => {
          const strategy =
            loadingStrategy === 'auto'
              ? network.connectionQuality === 'excellent'
                ? 'aggressive'
                : 'conservative'
              : loadingStrategy;

          const resources =
            strategy === 'aggressive'
              ? [
                  'High-res images',
                  'Video content',
                  'Rich animations',
                  'Background prefetch',
                ]
              : [
                  'Compressed images',
                  'Audio only',
                  'Simple transitions',
                  'On-demand loading',
                ];

          setResourcesLoaded(resources);
        };

        loadResources();
      }, [network.connectionQuality, loadingStrategy]);

      const getOptimizations = () => {
        const optimizations = [];

        if (network.networkInfo.saveData) {
          optimizations.push('💾 Save Data mode: Reduced data usage');
        }

        if (network.isSlowConnection()) {
          optimizations.push('🐌 Slow connection: Lightweight assets');
        }

        if (network.connectionQuality === 'poor') {
          optimizations.push('📱 Poor quality: Mobile-first approach');
        }

        if (network.networkInfo.rtt > 500) {
          optimizations.push('⏱️ High latency: Reduced server requests');
        }

        if (optimizations.length === 0) {
          optimizations.push('⚡ Good connection: Full feature set');
        }

        return optimizations;
      };

      return (
        <div style={{ padding: '20px', maxWidth: '800px' }}>
          <h3>⚡ Performance Optimization Demo</h3>

          {/* Loading Strategy Selector */}
          <div style={{ marginBottom: '20px' }}>
            <h4>🎯 Loading Strategy:</h4>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              {['auto', 'aggressive', 'conservative'].map(strategy => (
                <button
                  key={strategy}
                  onClick={() => setLoadingStrategy(strategy as any)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor:
                      loadingStrategy === strategy ? '#2196f3' : '#f5f5f5',
                    color: loadingStrategy === strategy ? 'white' : '#333',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {strategy}
                </button>
              ))}
            </div>
          </div>

          {/* Current Optimizations */}
          <div style={{ marginBottom: '20px' }}>
            <h4>🔧 Active Optimizations:</h4>
            <div
              style={{
                padding: '15px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            >
              {getOptimizations().map((optimization, index) => (
                <div
                  key={index}
                  style={{ marginBottom: '8px', fontSize: '14px' }}
                >
                  {optimization}
                </div>
              ))}
            </div>
          </div>

          {/* Resource Loading Simulation */}
          <div style={{ marginBottom: '20px' }}>
            <h4>📦 Resources to Load:</h4>
            <div
              style={{
                padding: '15px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            >
              {resourcesLoaded.map((resource, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                    fontSize: '14px',
                  }}
                >
                  <span style={{ marginRight: '10px' }}>✅</span>
                  {resource}
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                padding: '15px',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                border: '1px solid #2196f3',
              }}
            >
              <h5>📊 Bandwidth Usage</h5>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {network.isSlowConnection() ? '📱 Minimized' : '🔄 Standard'}
              </div>
              <small>
                Current strategy:{' '}
                {network.networkInfo.saveData ? 'Data Saver' : 'Standard'}
              </small>
            </div>

            <div
              style={{
                padding: '15px',
                backgroundColor: '#f3e5f5',
                borderRadius: '8px',
                border: '1px solid #9c27b0',
              }}
            >
              <h5>⏱️ Load Time Estimate</h5>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {network.connectionQuality === 'excellent'
                  ? '< 1s'
                  : network.connectionQuality === 'good'
                    ? '< 3s'
                    : network.connectionQuality === 'poor'
                      ? '> 5s'
                      : 'Unknown'}
              </div>
              <small>
                Based on {network.networkInfo.downlink.toFixed(1)} Mbps
                connection
              </small>
            </div>

            <div
              style={{
                padding: '15px',
                backgroundColor: '#fff3e0',
                borderRadius: '8px',
                border: '1px solid #ff9800',
              }}
            >
              <h5>🔋 Battery Impact</h5>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {network.connectionQuality === 'poor'
                  ? '⚡ High'
                  : network.connectionQuality === 'good'
                    ? '🔋 Medium'
                    : '💚 Low'}
              </div>
              <small>
                {network.networkInfo.rtt} ms latency affects power usage
              </small>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4>💡 Performance Recommendations:</h4>
            <div
              style={{
                padding: '15px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            >
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {network.networkInfo.saveData && (
                  <li style={{ marginBottom: '8px' }}>
                    <strong>Respect Save Data:</strong> User has enabled data
                    saving mode
                  </li>
                )}
                {network.isSlowConnection() && (
                  <li style={{ marginBottom: '8px' }}>
                    <strong>Optimize for Speed:</strong> Connection is slow,
                    prioritize essential content
                  </li>
                )}
                {network.connectionQuality === 'excellent' && (
                  <li style={{ marginBottom: '8px' }}>
                    <strong>Rich Experience:</strong> Connection supports
                    high-quality content
                  </li>
                )}
                <li style={{ marginBottom: '8px' }}>
                  <strong>Adaptive Images:</strong> Serve images based on
                  connection speed
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Progressive Loading:</strong> Load critical content
                  first
                </li>
                <li>
                  <strong>Offline Support:</strong> Cache essential resources
                  for offline use
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    };

    return <PerformanceDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates performance optimization techniques based on network conditions, including adaptive loading strategies and resource management.',
      },
    },
  },
};
