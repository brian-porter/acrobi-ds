/**
 * @fileoverview Background Sync Stories for Epic 68
 * Interactive demonstrations of background sync functionality
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  useBackgroundSync,
  BackgroundSyncUtils,
  SYNC_TAGS,
  saveForSync,
  getPendingSyncData,
} from './use-background-sync';

const meta: Meta = {
  title: 'AAE/Background Sync/useBackgroundSync',
  parameters: {
    docs: {
      description: {
        component:
          'Background sync hook for registering sync tasks that execute when connectivity is restored. Provides reliable offline-first functionality with IndexedDB storage.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Hook Status Demo
const BackgroundSyncStatusDemo: React.FC = () => {
  const backgroundSync = useBackgroundSync({
    onSyncSuccess: tag => {
      console.log(`Sync completed for tag: ${tag}`);
    },
    onSyncError: (tag, error) => {
      console.error(`Sync failed for tag ${tag}:`, error);
    },
  });

  const getStatusColor = (status: boolean | undefined) => {
    return status ? '#28a745' : '#dc3545';
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Background Sync Status</h2>

      {!backgroundSync.isSupported && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          ⚠️ Background Sync is not supported in this browser
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
        <h3>Background Sync Capabilities</h3>

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
                backgroundColor: getStatusColor(backgroundSync.isSupported),
              }}
            />
            <span>
              <strong>Supported:</strong>{' '}
              {backgroundSync.isSupported ? 'Yes' : 'No'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(!!backgroundSync.registration),
              }}
            />
            <span>
              <strong>SW Registered:</strong>{' '}
              {backgroundSync.registration ? 'Yes' : 'No'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: backgroundSync.isRegistering
                  ? '#ffc107'
                  : '#6c757d',
              }}
            />
            <span>
              <strong>Registering:</strong>{' '}
              {backgroundSync.isRegistering ? 'Yes' : 'No'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor:
                  backgroundSync.registeredTags.size > 0
                    ? '#28a745'
                    : '#6c757d',
              }}
            />
            <span>
              <strong>Active Tags:</strong> {backgroundSync.registeredTags.size}
            </span>
          </div>
        </div>

        {backgroundSync.error && (
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
            <strong>Error:</strong> {backgroundSync.error}
            <button
              onClick={backgroundSync.clearError}
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

      {/* Registered Tags */}
      {backgroundSync.registeredTags.size > 0 && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#e7f3ff',
            borderRadius: '8px',
            border: '1px solid #b3d7ff',
            marginBottom: '20px',
          }}
        >
          <h3>Registered Sync Tags</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {backgroundSync.getRegisteredTags().map(tag => (
              <span
                key={tag}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {tag}
                <button
                  onClick={() => backgroundSync.unregister(tag)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '10px',
                    padding: '0',
                    marginLeft: '4px',
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Available Sync Tags */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f0f8ff',
          borderRadius: '8px',
          border: '1px solid #b6d7ff',
        }}
      >
        <h3>Available Sync Tags</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {Object.entries(SYNC_TAGS).map(([key, tag]) => (
            <button
              key={tag}
              onClick={() => backgroundSync.register(tag)}
              disabled={
                !backgroundSync.isSupported ||
                backgroundSync.isTagRegistered(tag)
              }
              style={{
                padding: '8px 16px',
                backgroundColor: backgroundSync.isTagRegistered(tag)
                  ? '#6c757d'
                  : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor:
                  backgroundSync.isSupported &&
                  !backgroundSync.isTagRegistered(tag)
                    ? 'pointer'
                    : 'not-allowed',
                fontSize: '14px',
              }}
            >
              {key.replace('_', ' ')}{' '}
              {backgroundSync.isTagRegistered(tag) ? '✓' : ''}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
          💡 <strong>Note:</strong> Click a tag to register it for background
          sync. Registered tags will be processed when connectivity is restored.
        </div>
      </div>
    </div>
  );
};

// Form Submission Demo
const FormSubmissionDemo: React.FC = () => {
  const backgroundSync = useBackgroundSync();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [pendingSubmissions, setPendingSubmissions] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load pending submissions
  useEffect(() => {
    const loadPending = async () => {
      try {
        const pending = await getPendingSyncData('pendingFormSubmissions');
        setPendingSubmissions(pending);
      } catch (error) {
        console.error('Failed to load pending submissions:', error);
      }
    };

    loadPending();
    const interval = setInterval(loadPending, 2000); // Refresh every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    try {
      if (isOnline) {
        // Try normal submission first
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert('Form submitted successfully!');
          setFormData({ name: '', email: '', message: '' });
          return;
        }
      }

      // Fallback to background sync
      const success = await BackgroundSyncUtils.registerFormSubmission(
        backgroundSync,
        formData,
        '/api/contact'
      );

      if (success) {
        alert("Form queued for submission when you're back online!");
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to queue form submission');
      }
    } catch (error) {
      // Network error - use background sync
      const success = await BackgroundSyncUtils.registerFormSubmission(
        backgroundSync,
        formData,
        '/api/contact'
      );

      if (success) {
        alert(
          "Network error detected. Form queued for submission when you're back online!"
        );
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to queue form submission');
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Offline-First Form Submission</h2>

      {/* Network Status */}
      <div
        style={{
          padding: '15px',
          backgroundColor: isOnline ? '#d4edda' : '#f8d7da',
          border: `1px solid ${isOnline ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: isOnline ? '#28a745' : '#dc3545',
          }}
        />
        <span>
          <strong>Network Status:</strong> {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '20px',
        }}
      >
        <h3>Contact Form</h3>

        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
            }}
          >
            Name:
          </label>
          <input
            type='text'
            value={formData.name}
            onChange={e =>
              setFormData(prev => ({ ...prev, name: e.target.value }))
            }
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
            placeholder='Enter your name'
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
            Email:
          </label>
          <input
            type='email'
            value={formData.email}
            onChange={e =>
              setFormData(prev => ({ ...prev, email: e.target.value }))
            }
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
            placeholder='Enter your email'
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
            Message:
          </label>
          <textarea
            value={formData.message}
            onChange={e =>
              setFormData(prev => ({ ...prev, message: e.target.value }))
            }
            rows={4}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
              resize: 'vertical',
            }}
            placeholder='Enter your message'
          />
        </div>

        <button
          type='submit'
          disabled={!backgroundSync.isSupported}
          style={{
            padding: '10px 20px',
            backgroundColor: backgroundSync.isSupported ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: backgroundSync.isSupported ? 'pointer' : 'not-allowed',
            fontSize: '16px',
          }}
        >
          Submit Form
        </button>

        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          💡 <strong>How it works:</strong> If online, submits immediately. If
          offline or network fails, queues for background sync when connectivity
          is restored.
        </div>
      </form>

      {/* Pending Submissions */}
      {pendingSubmissions.length > 0 && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#fff8dc',
            borderRadius: '8px',
            border: '1px solid #ffeaa7',
          }}
        >
          <h3>Pending Submissions ({pendingSubmissions.length})</h3>
          <div style={{ fontSize: '14px', marginBottom: '15px' }}>
            These forms will be submitted automatically when you're back online:
          </div>

          {pendingSubmissions.map((submission, index) => (
            <div
              key={submission.id}
              style={{
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '4px',
                marginBottom: '8px',
                fontSize: '14px',
              }}
            >
              <div>
                <strong>Name:</strong> {submission.data.name}
              </div>
              <div>
                <strong>Email:</strong> {submission.data.email}
              </div>
              <div>
                <strong>Message:</strong>{' '}
                {submission.data.message.substring(0, 50)}...
              </div>
              <div
                style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}
              >
                Queued: {new Date(submission.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Offline Actions Demo
const OfflineActionsDemo: React.FC = () => {
  const backgroundSync = useBackgroundSync();
  const [actions, setActions] = useState<string[]>([]);
  const [pendingActions, setPendingActions] = useState<any[]>([]);

  // Load pending actions
  useEffect(() => {
    const loadPending = async () => {
      try {
        const pending = await getPendingSyncData('offlineActions');
        setPendingActions(pending);
      } catch (error) {
        console.error('Failed to load pending actions:', error);
      }
    };

    loadPending();
    const interval = setInterval(loadPending, 2000);

    return () => clearInterval(interval);
  }, []);

  const performAction = async (actionType: string, description: string) => {
    const action = `${actionType}: ${description} at ${new Date().toLocaleTimeString()}`;
    setActions(prev => [action, ...prev.slice(0, 9)]);

    try {
      // Try to send action immediately
      const response = await fetch('/api/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: actionType,
          description,
          timestamp: Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error('Network request failed');
      }
    } catch (error) {
      // Queue for background sync
      await BackgroundSyncUtils.registerOfflineAction(
        backgroundSync,
        actionType,
        { description, timestamp: Date.now() }
      );
    }
  };

  const actionButtons = [
    { type: 'like', description: 'Liked a post', icon: '👍' },
    { type: 'share', description: 'Shared content', icon: '🔄' },
    { type: 'bookmark', description: 'Bookmarked item', icon: '🔖' },
    { type: 'comment', description: 'Posted comment', icon: '💬' },
    { type: 'follow', description: 'Followed user', icon: '➕' },
    { type: 'vote', description: 'Voted on poll', icon: '🗳️' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Offline Actions Demo</h2>

      <div
        style={{
          padding: '15px',
          backgroundColor: '#e7f3ff',
          borderRadius: '8px',
          border: '1px solid #b3d7ff',
          marginBottom: '20px',
        }}
      >
        <strong>Try this:</strong> Disconnect from the internet and perform
        actions. They'll be queued and executed when you reconnect.
      </div>

      {/* Action Buttons */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '20px',
        }}
      >
        <h3>Perform Actions</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '10px',
          }}
        >
          {actionButtons.map(action => (
            <button
              key={action.type}
              onClick={() => performAction(action.type, action.description)}
              disabled={!backgroundSync.isSupported}
              style={{
                padding: '12px',
                backgroundColor: backgroundSync.isSupported
                  ? '#007bff'
                  : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: backgroundSync.isSupported ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'center',
              }}
            >
              <span>{action.icon}</span>
              <span>{action.type.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Actions */}
      {actions.length > 0 && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#f0f8ff',
            borderRadius: '8px',
            border: '1px solid #b6d7ff',
            marginBottom: '20px',
          }}
        >
          <h3>Recent Actions</h3>
          <div style={{ fontSize: '14px', fontFamily: 'monospace' }}>
            {actions.map((action, index) => (
              <div key={index} style={{ padding: '2px 0' }}>
                {action}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Actions */}
      {pendingActions.length > 0 && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#fff8dc',
            borderRadius: '8px',
            border: '1px solid #ffeaa7',
          }}
        >
          <h3>Pending Actions ({pendingActions.length})</h3>
          <div style={{ fontSize: '14px', marginBottom: '15px' }}>
            These actions will be executed when you're back online:
          </div>

          {pendingActions.map((action, index) => (
            <div
              key={action.id}
              style={{
                padding: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '4px',
                marginBottom: '6px',
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>
                <strong>{action.type}:</strong> {action.payload.description}
              </span>
              <span style={{ fontSize: '12px', color: '#666' }}>
                {new Date(action.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const BackgroundSyncStatus: Story = {
  render: () => <BackgroundSyncStatusDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Shows the current status of background sync capabilities, registered sync tags, and provides controls for registering different sync types.',
      },
    },
  },
};

export const FormSubmission: Story = {
  render: () => <FormSubmissionDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how to implement offline-first form submissions that automatically sync when connectivity is restored. Forms are saved to IndexedDB and processed via background sync.',
      },
    },
  },
};

export const OfflineActions: Story = {
  render: () => <OfflineActionsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Shows how to queue user actions (likes, shares, votes, etc.) for background sync when offline. Actions are stored in IndexedDB and executed when connectivity returns.',
      },
    },
  },
};
