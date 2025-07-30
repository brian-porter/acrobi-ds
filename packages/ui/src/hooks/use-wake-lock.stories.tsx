/**
 * Wake Lock Hook Stories
 * Epic 55 - AAE Screen Wake Lock
 *
 * Comprehensive Storybook stories demonstrating screen wake lock capabilities
 * with different configurations and use cases.
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useWakeLock, WakeLockUtils } from './use-wake-lock';
import { WakeLockOptions } from './use-wake-lock';

const meta: Meta = {
  title: 'Hooks/useWakeLock',
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive wake lock hook for preventing screen sleep during critical tasks. Manages the Screen Wake Lock API with automatic re-acquisition and visibility change handling.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Wake Lock Component for Stories
const WakeLockDemo: React.FC<{ options?: WakeLockOptions }> = ({ options }) => {
  const {
    state,
    error,
    request,
    release,
    toggle,
    isSupported,
    getDuration,
    getStatus,
  } = useWakeLock(options);

  const [taskProgress, setTaskProgress] = useState(0);
  const [isLongTask, setIsLongTask] = useState(false);
  const [duration, setDuration] = useState(0);
  const [batteryInfo, setBatteryInfo] = useState<{
    level: number;
    charging: boolean;
  } | null>(null);

  // Update duration display
  useEffect(() => {
    if (!state.isLocked) {
      setDuration(0);
      return;
    }

    const interval = setInterval(() => {
      setDuration(getDuration());
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isLocked, getDuration]);

  // Get battery info if available
  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBatteryInfo = () => {
          setBatteryInfo({
            level: Math.round(battery.level * 100),
            charging: battery.charging,
          });
        };

        updateBatteryInfo();
        battery.addEventListener('levelchange', updateBatteryInfo);
        battery.addEventListener('chargingchange', updateBatteryInfo);

        return () => {
          battery.removeEventListener('levelchange', updateBatteryInfo);
          battery.removeEventListener('chargingchange', updateBatteryInfo);
        };
      });
    }
  }, []);

  // Simulate long running task
  const startLongTask = async () => {
    setIsLongTask(true);
    setTaskProgress(0);

    const success = await request();
    if (!success) return;

    // Simulate task progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setTaskProgress(i);

      if (!state.isLocked) break; // Task was interrupted
    }

    setIsLongTask(false);
    await release();
  };

  const stopLongTask = async () => {
    setIsLongTask(false);
    setTaskProgress(0);
    await release();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>Wake Lock Demo</h2>

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
          ⚠️ Screen Wake Lock API is not supported in this browser. Please use
          Chrome or Edge.
        </div>
      )}

      {/* Firefox Warning */}
      {navigator.userAgent.includes('Firefox') && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#ffebee',
            border: '2px solid #f44336',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
          }}
        >
          <strong>Firefox Note:</strong> Wake Lock API is not supported in
          Firefox. This feature works in Chrome, Edge, and other Chromium-based
          browsers.
        </div>
      )}

      {/* Status Display */}
      <div
        style={{
          padding: '15px',
          backgroundColor: state.isLocked ? '#e8f5e8' : '#f5f5f5',
          border: `2px solid ${state.isLocked ? '#4caf50' : '#ddd'}`,
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h3>Wake Lock Status</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
          }}
        >
          <p>
            <strong>Status:</strong>{' '}
            {getStatus() === 'locked'
              ? '🔒 Locked'
              : getStatus() === 'requesting'
                ? '⏳ Requesting'
                : '🔓 Unlocked'}
          </p>
          <p>
            <strong>Supported:</strong> {isSupported ? '✅ Yes' : '❌ No'}
          </p>
          <p>
            <strong>Requesting:</strong>{' '}
            {state.isRequesting ? '⏳ Yes' : '✅ No'}
          </p>
          <p>
            <strong>Duration:</strong> {WakeLockUtils.formatDuration(duration)}
          </p>
          <p>
            <strong>Auto Reacquire:</strong>{' '}
            {state.wasActiveBeforeHidden ? '🔄 Pending' : '✅ Ready'}
          </p>
          {state.releaseReason && (
            <p>
              <strong>Last Release:</strong> {state.releaseReason}
            </p>
          )}
        </div>
      </div>

      {/* Battery Info */}
      {batteryInfo && (
        <div
          style={{
            padding: '15px',
            backgroundColor: batteryInfo.level < 20 ? '#ffebee' : '#f5f5f5',
            border: `2px solid ${batteryInfo.level < 20 ? '#f44336' : '#ddd'}`,
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <h3>Battery Status</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div>
              <strong>Level:</strong> {batteryInfo.level}%
            </div>
            <div>
              <strong>Charging:</strong>{' '}
              {batteryInfo.charging ? '🔌 Yes' : '🔋 No'}
            </div>
            {batteryInfo.level < 20 && !batteryInfo.charging && (
              <div style={{ color: '#f44336', fontWeight: 'bold' }}>
                ⚠️ Low battery - consider avoiding wake lock
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#ffebee',
            border: '2px solid #f44336',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <h3>Error</h3>
          <p>
            <strong>Type:</strong> {error.type}
          </p>
          <p>
            <strong>Message:</strong> {error.message}
          </p>
          {error.originalError && (
            <p>
              <strong>Details:</strong> {error.originalError.message}
            </p>
          )}
        </div>
      )}

      {/* Basic Controls */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Basic Controls</h3>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={request}
            disabled={state.isLocked || state.isRequesting || !isSupported}
            style={{
              padding: '10px 20px',
              backgroundColor:
                state.isLocked || state.isRequesting || !isSupported
                  ? '#ccc'
                  : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                state.isLocked || state.isRequesting || !isSupported
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            {state.isRequesting ? '⏳ Requesting...' : '🔒 Request Lock'}
          </button>

          <button
            onClick={release}
            disabled={!state.isLocked || state.isRequesting}
            style={{
              padding: '10px 20px',
              backgroundColor:
                !state.isLocked || state.isRequesting ? '#ccc' : '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !state.isLocked || state.isRequesting
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            🔓 Release Lock
          </button>

          <button
            onClick={toggle}
            disabled={state.isRequesting || !isSupported}
            style={{
              padding: '10px 20px',
              backgroundColor:
                state.isRequesting || !isSupported ? '#ccc' : '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                state.isRequesting || !isSupported ? 'not-allowed' : 'pointer',
            }}
          >
            🔄 Toggle Lock
          </button>
        </div>
      </div>

      {/* Long Task Simulation */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Long Running Task Demo</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
          Simulate a long-running task that benefits from keeping the screen
          awake (e.g., video playback, presentation, data processing).
        </p>

        {isLongTask && (
          <div style={{ marginBottom: '15px' }}>
            <div
              style={{
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                padding: '10px',
                border: '2px solid #ddd',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <span>
                  <strong>Task Progress:</strong> {taskProgress}%
                </span>
                <span>
                  <strong>Wake Lock:</strong>{' '}
                  {state.isLocked ? '🔒 Active' : '❌ Inactive'}
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${taskProgress}%`,
                    height: '100%',
                    backgroundColor: state.isLocked ? '#4caf50' : '#ff9800',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={startLongTask}
            disabled={isLongTask || !isSupported}
            style={{
              padding: '10px 20px',
              backgroundColor: isLongTask || !isSupported ? '#ccc' : '#9c27b0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLongTask || !isSupported ? 'not-allowed' : 'pointer',
            }}
          >
            🚀 Start Long Task
          </button>

          <button
            onClick={stopLongTask}
            disabled={!isLongTask}
            style={{
              padding: '10px 20px',
              backgroundColor: !isLongTask ? '#ccc' : '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !isLongTask ? 'not-allowed' : 'pointer',
            }}
          >
            ⏹️ Stop Task
          </button>
        </div>
      </div>

      {/* Usage Tips */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Usage Best Practices</h3>
        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {WakeLockUtils.getUsageTips().map((tip, index) => (
              <li key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Browser Support */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Browser Support</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
          }}
        >
          {Object.entries(WakeLockUtils.getBrowserSupport()).map(
            ([browser, support]) => (
              <div
                key={browser}
                style={{
                  padding: '10px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
                <strong style={{ textTransform: 'capitalize' }}>
                  {browser}:
                </strong>
                <br />
                {support}
              </div>
            )
          )}
        </div>
      </div>

      {/* Technical Details */}
      <div>
        <h3>Technical Details</h3>
        <div
          style={{
            fontSize: '14px',
            color: '#666',
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <p>
            <strong>API:</strong> Screen Wake Lock API
            (navigator.wakeLock.request)
          </p>
          <p>
            <strong>User Activation:</strong> Requires user gesture to activate
          </p>
          <p>
            <strong>Automatic Release:</strong> Released when tab is hidden or
            page is unloaded
          </p>
          <p>
            <strong>Re-acquisition:</strong> Can automatically re-acquire when
            tab becomes visible again
          </p>
          <p>
            <strong>Battery Impact:</strong> Prevents screen sleep, may impact
            battery life
          </p>
        </div>
      </div>
    </div>
  );
};

// Basic Wake Lock Story
export const BasicWakeLock: Story = {
  render: () => <WakeLockDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic wake lock functionality with manual request/release controls and long task simulation.',
      },
    },
  },
};

// Auto Re-acquire Wake Lock Story
export const AutoReacquireWakeLock: Story = {
  render: () => (
    <WakeLockDemo
      options={{
        autoReacquire: true,
        onAcquired: () => {
          console.log('Wake lock acquired');
        },
        onReleased: () => {
          console.log('Wake lock released');
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Wake lock with automatic re-acquisition when the tab becomes visible again after being hidden.',
      },
    },
  },
};

// Battery Aware Wake Lock Story
export const BatteryAwareWakeLock: Story = {
  render: () => {
    const BatteryAwareDemo: React.FC = () => {
      const [batteryLevel, setBatteryLevel] = useState(100);
      const [isPluggedIn, setIsPluggedIn] = useState(false);

      const shouldUseLock = WakeLockUtils.shouldUseLock({
        isLongRunningTask: true,
        batteryLevel,
        isPluggedIn,
      });

      const wakeLock = useWakeLock({
        onError: error => {
          if (error.type === 'not_allowed') {
            alert(
              'Wake lock requires user interaction. Please click a button first.'
            );
          }
        },
      });

      return (
        <div style={{ padding: '20px' }}>
          <h3>Battery-Aware Wake Lock</h3>

          {/* Battery Level Simulator */}
          <div
            style={{
              marginBottom: '20px',
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
            }}
          >
            <h4>Simulate Battery Status</h4>
            <div style={{ marginBottom: '10px' }}>
              <label>Battery Level: {batteryLevel}%</label>
              <input
                type='range'
                min='0'
                max='100'
                value={batteryLevel}
                onChange={e => setBatteryLevel(parseInt(e.target.value))}
                style={{ width: '100%', marginTop: '5px' }}
              />
            </div>
            <label>
              <input
                type='checkbox'
                checked={isPluggedIn}
                onChange={e => setIsPluggedIn(e.target.checked)}
              />
              Plugged in / Charging
            </label>
          </div>

          {/* Recommendation */}
          <div
            style={{
              padding: '15px',
              backgroundColor: shouldUseLock ? '#e8f5e8' : '#ffebee',
              border: `2px solid ${shouldUseLock ? '#4caf50' : '#f44336'}`,
              borderRadius: '8px',
              marginBottom: '20px',
            }}
          >
            <strong>Recommendation:</strong>{' '}
            {shouldUseLock
              ? '✅ Wake lock is recommended for this scenario'
              : '❌ Wake lock not recommended - battery conservation advised'}
          </div>

          <WakeLockDemo />
        </div>
      );
    };

    return <BatteryAwareDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Battery-aware wake lock that considers power state and battery level before recommending wake lock usage.',
      },
    },
  },
};

// Event Handling Wake Lock Story
export const EventHandlingWakeLock: Story = {
  render: () => (
    <WakeLockDemo
      options={{
        autoReacquire: true,
        onAcquired: () => {
          console.log('✅ Wake lock acquired successfully');
          // Could show notification, update UI, start task, etc.
        },
        onReleased: () => {
          console.log('🔓 Wake lock released');
          // Could pause task, show warning, etc.
        },
        onError: error => {
          console.error('❌ Wake lock error:', error);

          // Handle different error types
          switch (error.type) {
            case 'not_supported':
              alert(
                'Wake lock is not supported in this browser. Please use Chrome or Edge.'
              );
              break;
            case 'not_allowed':
              alert(
                'Wake lock requires user interaction. Please try clicking the button again.'
              );
              break;
            case 'permission_denied':
              alert(
                'Wake lock permission was denied or blocked by browser settings.'
              );
              break;
            default:
              alert(`Wake lock error: ${error.message}`);
          }
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Wake lock with comprehensive event handling for acquisition, release, and error scenarios.',
      },
    },
  },
};

// No Auto Re-acquire Wake Lock Story
export const ManualWakeLock: Story = {
  render: () => (
    <WakeLockDemo
      options={{
        autoReacquire: false,
        onReleased: () => {
          console.log('Wake lock released - no automatic re-acquisition');
          alert(
            'Wake lock was released. You may need to manually re-acquire it if needed.'
          );
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Wake lock without automatic re-acquisition. Requires manual management when tab visibility changes.',
      },
    },
  },
};
