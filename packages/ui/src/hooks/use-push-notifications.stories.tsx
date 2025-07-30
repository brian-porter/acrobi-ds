import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { usePushNotifications } from './use-push-notifications';
import type { NotificationData } from './use-push-notifications';

const meta: Meta = {
  title: '2. Hooks/usePushNotifications',
  parameters: {
    docs: {
      description: {
        component:
          'AAE Push Notifications hook that provides comprehensive push notification capabilities with service worker integration, subscription management, and notification handling. Perfect for AAE applications that need to send push notifications to users.',
      },
    },
  },
  argTypes: {
    vapidPublicKey: {
      control: 'text',
      description: 'VAPID public key for push subscription',
    },
    subscriptionEndpoint: {
      control: 'text',
      description: 'Backend endpoint for subscription management',
    },
    autoSubscribe: {
      control: 'boolean',
      description: 'Auto-subscribe on permission grant',
    },
    serviceWorkerUrl: {
      control: 'text',
      description: 'Custom service worker URL',
    },
  },
};

export default meta;
type Story = StoryObj;

// Demo component
const PushNotificationsDemo = ({
  vapidPublicKey = 'BF8Q8iVQBVL4iWzOGH5gP7QAJ0GnP9T2HWN8FQ2H8J7QO1K9L6M4R2S3T8Y9',
  subscriptionEndpoint = '/api/push/subscribe',
  autoSubscribe = false,
  serviceWorkerUrl = '/sw.js',
}: {
  vapidPublicKey?: string;
  subscriptionEndpoint?: string;
  autoSubscribe?: boolean;
  serviceWorkerUrl?: string;
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [notificationTitle, setNotificationTitle] =
    useState('Test Notification');
  const [notificationBody, setNotificationBody] = useState(
    'This is a test notification from the AAE'
  );

  const addLog = (message: string) => {
    setLogs(prev => [
      `${new Date().toLocaleTimeString()}: ${message}`,
      ...prev.slice(0, 9),
    ]);
  };

  const pushNotifications = usePushNotifications({
    vapidPublicKey,
    subscriptionEndpoint,
    autoSubscribe,
    serviceWorkerUrl,
    onSubscriptionChange: subscription => {
      addLog(subscription ? 'Subscription updated' : 'Subscription removed');
    },
    onNotificationReceived: notification => {
      addLog(`Notification received: ${JSON.stringify(notification)}`);
    },
    onNotificationClicked: notification => {
      addLog(`Notification clicked: ${JSON.stringify(notification)}`);
    },
    onError: error => {
      addLog(`Error: ${error.message}`);
    },
  });

  const {
    state,
    error,
    subscription,
    requestPermission,
    subscribe,
    unsubscribe,
    sendNotification,
    testNotification,
    registerServiceWorker,
    updateServiceWorker,
    getSubscriptionData,
    scheduleNotification,
    clearNotifications,
    isNotificationSupported,
    isPushSupported,
  } = pushNotifications;

  useEffect(() => {
    addLog('Push notifications hook initialized');
  }, []);

  const handleRequestPermission = async () => {
    addLog('Requesting notification permission...');
    const permission = await requestPermission();
    addLog(`Permission result: ${permission}`);
  };

  const handleSubscribe = async () => {
    addLog('Subscribing to push notifications...');
    const sub = await subscribe();
    addLog(sub ? 'Successfully subscribed' : 'Failed to subscribe');
  };

  const handleUnsubscribe = async () => {
    addLog('Unsubscribing from push notifications...');
    const success = await unsubscribe();
    addLog(success ? 'Successfully unsubscribed' : 'Failed to unsubscribe');
  };

  const handleSendNotification = async () => {
    const notificationData: NotificationData = {
      title: notificationTitle,
      body: notificationBody,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: 'demo-notification',
      data: { url: '/', timestamp: Date.now() },
      actions: [
        { action: 'open-app', title: 'Open App' },
        { action: 'dismiss', title: 'Dismiss' },
      ],
      requireInteraction: false,
      silent: false,
    };

    addLog('Sending notification...');
    const success = await sendNotification(notificationData);
    addLog(success ? 'Notification sent' : 'Failed to send notification');
  };

  const handleTestNotification = async () => {
    addLog('Sending test notification...');
    const success = await testNotification();
    addLog(
      success ? 'Test notification sent' : 'Failed to send test notification'
    );
  };

  const handleScheduleNotification = async () => {
    const notificationData: NotificationData = {
      title: 'Scheduled Notification',
      body: 'This notification was scheduled 5 seconds ago',
      icon: '/icon-192x192.png',
    };

    addLog('Scheduling notification for 5 seconds...');
    const id = await scheduleNotification(notificationData, 5000);
    addLog(`Notification scheduled with ID: ${id}`);
  };

  const handleRegisterServiceWorker = async () => {
    addLog('Registering service worker...');
    const registration = await registerServiceWorker();
    addLog(
      registration
        ? 'Service worker registered'
        : 'Failed to register service worker'
    );
  };

  const handleUpdateServiceWorker = async () => {
    addLog('Updating service worker...');
    const success = await updateServiceWorker();
    addLog(
      success ? 'Service worker updated' : 'Failed to update service worker'
    );
  };

  const handleClearNotifications = async () => {
    addLog('Clearing all notifications...');
    await clearNotifications();
    addLog('Notifications cleared');
  };

  const subscriptionData = getSubscriptionData();

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '800px',
      }}
    >
      <h2 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>
        🔔 Push Notifications Demo
      </h2>

      {/* Status Section */}
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
          Status
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
            <strong>Supported:</strong>
            <span
              style={{
                color: state.isSupported ? '#059669' : '#dc2626',
                marginLeft: '8px',
              }}
            >
              {state.isSupported ? '✅ Yes' : '❌ No'}
            </span>
          </div>
          <div>
            <strong>Permission:</strong>
            <span
              style={{
                color: state.hasPermission ? '#059669' : '#dc2626',
                marginLeft: '8px',
                textTransform: 'capitalize',
              }}
            >
              {state.permissionStatus}
            </span>
          </div>
          <div>
            <strong>Subscribed:</strong>
            <span
              style={{
                color: state.isSubscribed ? '#059669' : '#6b7280',
                marginLeft: '8px',
              }}
            >
              {state.isSubscribed ? '✅ Yes' : '❌ No'}
            </span>
          </div>
          <div>
            <strong>Service Worker:</strong>
            <span
              style={{
                color: state.serviceWorkerReady ? '#059669' : '#6b7280',
                marginLeft: '8px',
              }}
            >
              {state.serviceWorkerReady ? '✅ Ready' : '⏳ Loading'}
            </span>
          </div>
        </div>

        {/* Browser Support Info */}
        <div
          style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#e0f2fe',
            borderRadius: '6px',
          }}
        >
          <div style={{ fontSize: '12px', color: '#0369a1' }}>
            <strong>Browser Support:</strong>
            <br />• Notifications:{' '}
            {isNotificationSupported() ? '✅ Supported' : '❌ Not supported'}
            <br />• Push API:{' '}
            {isPushSupported() ? '✅ Supported' : '❌ Not supported'}
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
          <strong>Error ({error.type}):</strong> {error.message}
        </div>
      )}

      {/* Controls Section */}
      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#374151' }}
        >
          Controls
        </h3>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={handleRequestPermission}
            disabled={state.hasPermission}
            style={{
              padding: '8px 16px',
              backgroundColor: state.hasPermission ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: state.hasPermission ? 'not-allowed' : 'pointer',
              fontSize: '14px',
            }}
          >
            {state.hasPermission
              ? '✅ Permission Granted'
              : '🔐 Request Permission'}
          </button>

          <button
            onClick={handleSubscribe}
            disabled={
              !state.hasPermission || state.isSubscribed || state.isSubscribing
            }
            style={{
              padding: '8px 16px',
              backgroundColor:
                !state.hasPermission || state.isSubscribed
                  ? '#9ca3af'
                  : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor:
                !state.hasPermission || state.isSubscribed
                  ? 'not-allowed'
                  : 'pointer',
              fontSize: '14px',
            }}
          >
            {state.isSubscribing
              ? '⏳ Subscribing...'
              : state.isSubscribed
                ? '✅ Subscribed'
                : '🔔 Subscribe'}
          </button>

          <button
            onClick={handleUnsubscribe}
            disabled={!state.isSubscribed}
            style={{
              padding: '8px 16px',
              backgroundColor: !state.isSubscribed ? '#9ca3af' : '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: !state.isSubscribed ? 'not-allowed' : 'pointer',
              fontSize: '14px',
            }}
          >
            🔕 Unsubscribe
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button
            onClick={handleRegisterServiceWorker}
            disabled={state.serviceWorkerReady}
            style={{
              padding: '8px 16px',
              backgroundColor: state.serviceWorkerReady ? '#9ca3af' : '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: state.serviceWorkerReady ? 'not-allowed' : 'pointer',
              fontSize: '14px',
            }}
          >
            {state.serviceWorkerReady ? '✅ SW Registered' : '⚙️ Register SW'}
          </button>

          <button
            onClick={handleUpdateServiceWorker}
            disabled={!state.serviceWorkerReady}
            style={{
              padding: '8px 16px',
              backgroundColor: !state.serviceWorkerReady
                ? '#9ca3af'
                : '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: !state.serviceWorkerReady ? 'not-allowed' : 'pointer',
              fontSize: '14px',
            }}
          >
            🔄 Update SW
          </button>

          <button
            onClick={handleClearNotifications}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            🗑️ Clear Notifications
          </button>
        </div>
      </div>

      {/* Notification Testing */}
      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#374151' }}
        >
          Test Notifications
        </h3>

        <div style={{ marginBottom: '15px' }}>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '10px',
              flexWrap: 'wrap',
            }}
          >
            <input
              type='text'
              value={notificationTitle}
              onChange={e => setNotificationTitle(e.target.value)}
              placeholder='Notification title'
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
            <input
              type='text'
              value={notificationBody}
              onChange={e => setNotificationBody(e.target.value)}
              placeholder='Notification body'
              style={{
                flex: '2',
                minWidth: '300px',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={handleSendNotification}
              disabled={!state.hasPermission}
              style={{
                padding: '8px 16px',
                backgroundColor: !state.hasPermission ? '#9ca3af' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: !state.hasPermission ? 'not-allowed' : 'pointer',
                fontSize: '14px',
              }}
            >
              📤 Send Custom Notification
            </button>

            <button
              onClick={handleTestNotification}
              disabled={!state.hasPermission}
              style={{
                padding: '8px 16px',
                backgroundColor: !state.hasPermission ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: !state.hasPermission ? 'not-allowed' : 'pointer',
                fontSize: '14px',
              }}
            >
              🧪 Send Test Notification
            </button>

            <button
              onClick={handleScheduleNotification}
              disabled={!state.hasPermission}
              style={{
                padding: '8px 16px',
                backgroundColor: !state.hasPermission ? '#9ca3af' : '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: !state.hasPermission ? 'not-allowed' : 'pointer',
                fontSize: '14px',
              }}
            >
              ⏰ Schedule Notification (5s)
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Data */}
      {subscriptionData && (
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#374151' }}
          >
            Subscription Data
          </h3>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f1f5f9',
              borderRadius: '6px',
              fontSize: '12px',
              fontFamily: 'monospace',
              wordBreak: 'break-all',
            }}
          >
            <div>
              <strong>Endpoint:</strong> {subscriptionData.endpoint}
            </div>
            <div style={{ marginTop: '5px' }}>
              <strong>P256DH Key:</strong> {subscriptionData.keys.p256dh}
            </div>
            <div style={{ marginTop: '5px' }}>
              <strong>Auth Key:</strong> {subscriptionData.keys.auth}
            </div>
            {subscriptionData.expirationTime && (
              <div style={{ marginTop: '5px' }}>
                <strong>Expires:</strong>{' '}
                {new Date(subscriptionData.expirationTime).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Activity Log */}
      <div>
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

      {/* Instructions */}
      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#eff6ff',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#1e40af',
        }}
      >
        <strong>Instructions:</strong>
        <ol style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>
            First, click "Request Permission" to grant notification permissions
          </li>
          <li>Then click "Subscribe" to subscribe to push notifications</li>
          <li>Use the test buttons to send different types of notifications</li>
          <li>
            Check your browser's notification area to see the notifications
          </li>
          <li>Click on notifications to test the click handling</li>
        </ol>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#6366f1' }}>
          <strong>Note:</strong> This demo requires a service worker at /sw.js.
          In production, you'll need a proper VAPID key and backend endpoint for
          full functionality.
        </p>
      </div>
    </div>
  );
};

// Basic usage story
export const Default: Story = {
  render: () => <PushNotificationsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic push notifications implementation with service worker integration. Click through the workflow to test subscription, notification sending, and handling.',
      },
    },
  },
};

// Auto-subscribe story
export const AutoSubscribe: Story = {
  render: () => <PushNotificationsDemo autoSubscribe={true} />,
  parameters: {
    docs: {
      description: {
        story:
          'Push notifications with auto-subscribe enabled. Will automatically subscribe the user once permission is granted.',
      },
    },
  },
};

// Custom endpoint story
export const CustomEndpoint: Story = {
  render: () => (
    <PushNotificationsDemo
      subscriptionEndpoint='/api/custom/push'
      serviceWorkerUrl='/custom-sw.js'
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Push notifications with custom backend endpoint and service worker URL for advanced configurations.',
      },
    },
  },
};

// Hook usage example
const HookUsageExample = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h3>Hook Usage Example</h3>
      <pre
        style={{
          backgroundColor: '#f8fafc',
          padding: '15px',
          borderRadius: '6px',
          fontSize: '14px',
          overflow: 'auto',
        }}
      >
        {`import { usePushNotifications } from '@acrobi/ui';

function MyComponent() {
  const pushNotifications = usePushNotifications({
    vapidPublicKey: 'YOUR_VAPID_PUBLIC_KEY',
    subscriptionEndpoint: '/api/push/subscribe',
    autoSubscribe: false,
    onSubscriptionChange: (subscription) => {
      console.log('Subscription changed:', subscription);
    },
    onNotificationReceived: (notification) => {
      console.log('Notification received:', notification);
    },
    onError: (error) => {
      console.error('Push notification error:', error);
    }
  });

  const {
    state,
    requestPermission,
    subscribe,
    sendNotification
  } = pushNotifications;

  const handleSubscribe = async () => {
    if (!state.hasPermission) {
      await requestPermission();
    }
    await subscribe();
  };

  const handleSendNotification = async () => {
    await sendNotification({
      title: 'Hello!',
      body: 'This is a test notification',
      icon: '/icon-192x192.png'
    });
  };

  return (
    <div>
      <button onClick={handleSubscribe}>
        Subscribe to Notifications
      </button>
      <button onClick={handleSendNotification}>
        Send Test Notification
      </button>
    </div>
  );
}`}
      </pre>
    </div>
  );
};

export const HookUsage: Story = {
  render: () => <HookUsageExample />,
  parameters: {
    docs: {
      description: {
        story:
          'Example code showing how to use the usePushNotifications hook in your components.',
      },
    },
  },
};
