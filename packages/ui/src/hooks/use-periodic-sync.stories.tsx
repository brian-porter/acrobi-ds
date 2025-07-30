/**
 * @fileoverview Periodic Background Sync Stories for Epic 70
 * Interactive demonstrations of periodic background sync functionality
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  usePeriodicSync,
  PeriodicSyncUtils,
  PERIODIC_SYNC_TAGS,
} from './use-periodic-sync';

const meta: Meta = {
  title: 'AAE/Periodic Background Sync/usePeriodicSync',
  parameters: {
    docs: {
      description: {
        component:
          'Periodic background sync hook for registering tasks that run automatically at regular intervals, even when the app is closed. Note: This is an experimental API with limited browser support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Hook Status Demo
const PeriodicSyncStatusDemo: React.FC = () => {
  const periodicSync = usePeriodicSync({
    onSyncSuccess: (tag, data) => {
      console.log(`Periodic sync "${tag}" completed successfully:`, data);
    },
    onSyncError: (tag, error) => {
      console.error(`Periodic sync "${tag}" failed:`, error);
    },
  });

  const [browserCompat, setBrowserCompat] = useState(
    PeriodicSyncUtils.getBrowserCompatibility()
  );
  const [syncStats, setSyncStats] = useState(
    PeriodicSyncUtils.getSyncStats([])
  );

  useEffect(() => {
    if (periodicSync.registeredTags.length > 0) {
      setSyncStats(PeriodicSyncUtils.getSyncStats(periodicSync.registeredTags));
    }
  }, [periodicSync.registeredTags]);

  const getStatusColor = (status: boolean | undefined) => {
    return status ? '#28a745' : '#dc3545';
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Periodic Background Sync Status</h2>

      {/* Experimental Warning */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        ⚠️ <strong>Experimental API:</strong> Periodic Background Sync is highly
        experimental and has very limited browser support. It requires user
        engagement, AAE installation, and may be restricted by OS battery
        optimization settings.
      </div>

      {!periodicSync.isSupported && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          ❌ Periodic Background Sync is not supported in this browser
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
        <h3>Periodic Sync Capabilities</h3>

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
                backgroundColor: getStatusColor(periodicSync.isSupported),
              }}
            />
            <span>
              <strong>Supported:</strong>{' '}
              {periodicSync.isSupported ? 'Yes' : 'No'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(!!periodicSync.registration),
              }}
            />
            <span>
              <strong>SW Registered:</strong>{' '}
              {periodicSync.registration ? 'Yes' : 'No'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: periodicSync.isRegistering
                  ? '#ffc107'
                  : '#6c757d',
              }}
            />
            <span>
              <strong>Registering:</strong>{' '}
              {periodicSync.isRegistering ? 'Yes' : 'No'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: periodicSync.isRegistered
                  ? '#28a745'
                  : '#6c757d',
              }}
            />
            <span>
              <strong>Has Tasks:</strong>{' '}
              {periodicSync.isRegistered ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        {periodicSync.error && (
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
            <strong>Error:</strong> {periodicSync.error}
            <button
              onClick={periodicSync.clearError}
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
          <strong>Status:</strong>{' '}
          {browserCompat.isSupported ? '✅ Supported' : '❌ Not Supported'}
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

      {/* Registered Tasks */}
      {periodicSync.registeredTags.length > 0 && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#d4edda',
            borderRadius: '8px',
            border: '1px solid #c3e6cb',
            marginBottom: '20px',
          }}
        >
          <h3>
            Registered Periodic Tasks ({periodicSync.registeredTags.length})
          </h3>

          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '15px',
            }}
          >
            {periodicSync.registeredTags.map(tag => (
              <div
                key={tag}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>⏰ {tag}</span>
                <button
                  onClick={() => periodicSync.unregister(tag)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px',
                    padding: '2px 4px',
                    borderRadius: '2px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Sync Statistics */}
          <div style={{ fontSize: '14px' }}>
            <div>
              <strong>Total Tasks:</strong> {syncStats.totalTags}
            </div>
            <div>
              <strong>Estimated Daily Runs:</strong>{' '}
              {syncStats.estimatedDailyRuns}
            </div>
            <div style={{ marginTop: '8px' }}>
              <strong>Category Breakdown:</strong>
              <div style={{ marginLeft: '16px', marginTop: '4px' }}>
                {Object.entries(syncStats.categoryBreakdown)
                  .filter(([, count]) => count > 0)
                  .map(([category, count]) => (
                    <div key={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}:{' '}
                      {count}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Available Tasks */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f0f8ff',
          borderRadius: '8px',
          border: '1px solid #b6d7ff',
        }}
      >
        <h3>Available Periodic Tasks</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
          }}
        >
          {Object.entries(PERIODIC_SYNC_TAGS).map(([key, tag]) => {
            const isRegistered = periodicSync.isTagRegistered(tag);
            const interval = PeriodicSyncUtils.getRecommendedInterval(
              key.toLowerCase().replace('_', '') as any
            );

            return (
              <div
                key={tag}
                style={{
                  padding: '12px',
                  backgroundColor: isRegistered ? '#e7f3ff' : 'white',
                  border: `1px solid ${isRegistered ? '#007bff' : '#dee2e6'}`,
                  borderRadius: '4px',
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {key.replace('_', ' ')}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '8px',
                  }}
                >
                  Interval: {Math.round(interval / (60 * 1000))} min
                </div>
                <button
                  onClick={() => {
                    if (isRegistered) {
                      periodicSync.unregister(tag);
                    } else {
                      periodicSync.register(tag, { minInterval: interval });
                    }
                  }}
                  disabled={!periodicSync.isSupported}
                  style={{
                    width: '100%',
                    padding: '6px',
                    backgroundColor: !periodicSync.isSupported
                      ? '#ccc'
                      : isRegistered
                        ? '#dc3545'
                        : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: !periodicSync.isSupported
                      ? 'not-allowed'
                      : 'pointer',
                    fontSize: '12px',
                  }}
                >
                  {isRegistered ? 'Unregister' : 'Register'}
                </button>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
          💡 <strong>Note:</strong> Periodic tasks run automatically in the
          background. The actual frequency depends on user engagement, battery
          level, and OS settings.
        </div>
      </div>
    </div>
  );
};

// Configuration Demo
const PeriodicSyncConfigDemo: React.FC = () => {
  const periodicSync = usePeriodicSync();
  const [customTag, setCustomTag] = useState('');
  const [customInterval, setCustomInterval] = useState(60); // minutes
  const [validationResult, setValidationResult] = useState<any>(null);

  const handleValidate = () => {
    const result = PeriodicSyncUtils.validateConfig(customTag, {
      minInterval: customInterval * 60 * 1000, // Convert minutes to milliseconds
    });
    setValidationResult(result);
  };

  const handleRegisterCustom = async () => {
    if (!customTag) return;

    const result = PeriodicSyncUtils.validateConfig(customTag, {
      minInterval: customInterval * 60 * 1000,
    });

    if (!result.valid) {
      alert(`Validation failed: ${result.errors.join(', ')}`);
      return;
    }

    const success = await periodicSync.register(customTag, {
      minInterval: customInterval * 60 * 1000,
    });

    if (success) {
      setCustomTag('');
      setCustomInterval(60);
      setValidationResult(null);
    }
  };

  const presetTasks = [
    {
      name: 'News Updates',
      tag: 'news-feed',
      interval: 60,
      description: 'Fetch latest news articles',
    },
    {
      name: 'Weather Sync',
      tag: 'weather-data',
      interval: 30,
      description: 'Update weather information',
    },
    {
      name: 'Social Feed',
      tag: 'social-updates',
      interval: 15,
      description: 'Check social media updates',
    },
    {
      name: 'Email Check',
      tag: 'email-sync',
      interval: 20,
      description: 'Sync email messages',
    },
    {
      name: 'Calendar Sync',
      tag: 'calendar-events',
      interval: 120,
      description: 'Update calendar events',
    },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Periodic Sync Configuration</h2>

      <div
        style={{
          padding: '15px',
          backgroundColor: '#fff8dc',
          borderRadius: '8px',
          border: '1px solid #ffeaa7',
          marginBottom: '20px',
        }}
      >
        <strong>Important:</strong> Periodic sync requires significant user
        engagement with your AAE. The browser will only run these tasks if users
        regularly interact with your app.
      </div>

      {/* Custom Task Configuration */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '20px',
        }}
      >
        <h3>Create Custom Periodic Task</h3>

        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
            }}
          >
            Task Tag:
          </label>
          <input
            type='text'
            value={customTag}
            onChange={e => setCustomTag(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
            placeholder='my-custom-task'
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
            Minimum Interval (minutes):
          </label>
          <input
            type='number'
            value={customInterval}
            onChange={e => setCustomInterval(parseInt(e.target.value) || 60)}
            min='1'
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
          />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            Recommended minimum: 720 minutes (12 hours)
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button
            onClick={handleValidate}
            style={{
              padding: '8px 16px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Validate
          </button>

          <button
            onClick={handleRegisterCustom}
            disabled={!periodicSync.isSupported || !customTag}
            style={{
              padding: '8px 16px',
              backgroundColor:
                !periodicSync.isSupported || !customTag ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !periodicSync.isSupported || !customTag
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            Register Task
          </button>
        </div>

        {validationResult && (
          <div
            style={{
              padding: '10px',
              backgroundColor: validationResult.valid ? '#d4edda' : '#f8d7da',
              border: `1px solid ${validationResult.valid ? '#c3e6cb' : '#f5c6cb'}`,
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            <div>
              <strong>Validation Result:</strong>{' '}
              {validationResult.valid ? '✅ Valid' : '❌ Invalid'}
            </div>

            {validationResult.errors.length > 0 && (
              <div style={{ marginTop: '4px' }}>
                <strong>Errors:</strong>
                <ul style={{ marginTop: '4px', paddingLeft: '20px' }}>
                  {validationResult.errors.map(
                    (error: string, index: number) => (
                      <li key={index} style={{ color: '#721c24' }}>
                        {error}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {validationResult.warnings.length > 0 && (
              <div style={{ marginTop: '4px' }}>
                <strong>Warnings:</strong>
                <ul style={{ marginTop: '4px', paddingLeft: '20px' }}>
                  {validationResult.warnings.map(
                    (warning: string, index: number) => (
                      <li key={index} style={{ color: '#856404' }}>
                        {warning}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preset Tasks */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#e7f3ff',
          borderRadius: '8px',
          border: '1px solid #b3d7ff',
        }}
      >
        <h3>Quick Setup - Preset Tasks</h3>

        <div style={{ display: 'grid', gap: '12px' }}>
          {presetTasks.map((task, index) => {
            const isRegistered = periodicSync.isTagRegistered(task.tag);

            return (
              <div
                key={index}
                style={{
                  padding: '15px',
                  backgroundColor: isRegistered ? '#d4edda' : 'white',
                  border: `1px solid ${isRegistered ? '#c3e6cb' : '#dee2e6'}`,
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    {task.name} {isRegistered && '✅'}
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '4px',
                    }}
                  >
                    {task.description}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Interval: {task.interval} minutes • Tag: {task.tag}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (isRegistered) {
                      periodicSync.unregister(task.tag);
                    } else {
                      periodicSync.register(task.tag, {
                        minInterval: task.interval * 60 * 1000,
                      });
                    }
                  }}
                  disabled={!periodicSync.isSupported}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: !periodicSync.isSupported
                      ? '#ccc'
                      : isRegistered
                        ? '#dc3545'
                        : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: !periodicSync.isSupported
                      ? 'not-allowed'
                      : 'pointer',
                    marginLeft: '15px',
                  }}
                >
                  {isRegistered ? 'Remove' : 'Add'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Requirements Demo
const RequirementsDemo: React.FC = () => {
  const requirements = [
    {
      title: 'Browser Support',
      status: 'warning',
      description:
        'Only supported in Chrome 80+ and Edge 80+ with experimental features enabled',
      details: [
        'Chrome/Chromium-based browsers only',
        'Requires experimental web platform features flag',
        'Not available in Firefox or Safari',
        'Limited mobile browser support',
      ],
    },
    {
      title: 'AAE Installation',
      status: 'required',
      description: 'App must be installed as a AAE to enable periodic sync',
      details: [
        'User must install the AAE via browser prompt',
        'App must meet AAE installability criteria',
        'Requires valid web app manifest',
        'HTTPS connection required',
      ],
    },
    {
      title: 'User Engagement',
      status: 'critical',
      description: 'Requires regular user interaction with the app',
      details: [
        'User must actively use the app regularly',
        'Minimal engagement may disable periodic sync',
        'Browser tracks usage patterns',
        'Long periods of inactivity will suspend sync',
      ],
    },
    {
      title: 'System Resources',
      status: 'info',
      description: 'Subject to device battery and network conditions',
      details: [
        'May be throttled on low battery',
        'Disabled in battery saver mode',
        'Network connectivity required',
        'OS-level optimization may intervene',
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'required':
        return '#dc3545';
      case 'critical':
        return '#fd7e14';
      case 'warning':
        return '#ffc107';
      case 'info':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'required':
        return '🚫';
      case 'critical':
        return '⚠️';
      case 'warning':
        return '⚡';
      case 'info':
        return 'ℹ️';
      default:
        return '📋';
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Periodic Sync Requirements</h2>

      <div
        style={{
          padding: '15px',
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
          border: '1px solid #ffeaa7',
          marginBottom: '20px',
        }}
      >
        <strong>⚠️ Important Notice:</strong> Periodic Background Sync is a
        highly experimental API with strict requirements. Most users will not be
        able to use this feature due to browser limitations and system
        restrictions.
      </div>

      {/* Requirements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {requirements.map((req, index) => (
          <div
            key={index}
            style={{
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: `2px solid ${getStatusColor(req.status)}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
              }}
            >
              <span style={{ fontSize: '24px' }}>
                {getStatusIcon(req.status)}
              </span>
              <div>
                <h3 style={{ margin: 0, color: getStatusColor(req.status) }}>
                  {req.title}
                </h3>
                <div
                  style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}
                >
                  {req.description}
                </div>
              </div>
            </div>

            <ul
              style={{
                marginLeft: '36px',
                paddingLeft: '0',
                listStyle: 'none',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
            >
              {req.details.map((detail, detailIndex) => (
                <li key={detailIndex} style={{ marginBottom: '4px' }}>
                  • {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Alternative Solutions */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#e7f3ff',
          borderRadius: '8px',
          border: '1px solid #b3d7ff',
          marginTop: '20px',
        }}
      >
        <h3>Alternative Solutions</h3>
        <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <p>
            Since Periodic Background Sync has limited support, consider these
            alternatives:
          </p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>
              <strong>Push Notifications:</strong> Server-triggered updates when
              new content is available
            </li>
            <li>
              <strong>Background Sync:</strong> One-time sync when connectivity
              is restored
            </li>
            <li>
              <strong>Service Worker Fetch Events:</strong> Update content when
              users visit your app
            </li>
            <li>
              <strong>WebSockets:</strong> Real-time updates when the app is
              active
            </li>
            <li>
              <strong>Manual Refresh:</strong> User-initiated content updates
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const PeriodicSyncStatus: Story = {
  render: () => <PeriodicSyncStatusDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Shows the current status of periodic background sync capabilities, browser compatibility, and registered periodic tasks.',
      },
    },
  },
};

export const Configuration: Story = {
  render: () => <PeriodicSyncConfigDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive configuration interface for creating and managing periodic sync tasks with validation and preset options.',
      },
    },
  },
};

export const Requirements: Story = {
  render: () => <RequirementsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Detailed overview of the strict requirements and limitations of the Periodic Background Sync API, including alternative solutions.',
      },
    },
  },
};
