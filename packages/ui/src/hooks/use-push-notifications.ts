/**
 * @fileoverview AAE Push Notifications Hook (Epic 43)
 * Provides comprehensive push notification capabilities with service worker integration,
 * subscription management, and notification handling.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// Types
export interface PushNotificationOptions {
  /** VAPID public key for push subscription */
  vapidPublicKey: string;
  /** Backend endpoint for subscription management */
  subscriptionEndpoint?: string;
  /** User visible notification options */
  notificationOptions?: NotificationOptions;
  /** Auto-subscribe on permission grant */
  autoSubscribe?: boolean;
  /** Custom service worker URL */
  serviceWorkerUrl?: string;
  /** Callbacks */
  onSubscriptionChange?: (subscription: PushSubscription | null) => void;
  onNotificationReceived?: (notification: NotificationEvent) => void;
  onNotificationClicked?: (notification: NotificationEvent) => void;
  onError?: (error: PushNotificationError) => void;
}

export interface PushNotificationState {
  isSupported: boolean;
  hasPermission: boolean;
  isSubscribed: boolean;
  isSubscribing: boolean;
  serviceWorkerReady: boolean;
  permissionStatus: 'default' | 'granted' | 'denied';
}

export interface PushSubscriptionData {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  expirationTime?: number | null;
}

export interface PushNotificationError {
  type:
    | 'permission'
    | 'subscription'
    | 'service-worker'
    | 'network'
    | 'browser';
  message: string;
  originalError?: Error;
  code?: string;
}

export interface NotificationData {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  data?: any;
  actions?: NotificationAction[];
  requireInteraction?: boolean;
  silent?: boolean;
  timestamp?: number;
}

export interface UsePushNotificationsReturn {
  // State
  state: PushNotificationState;
  error: PushNotificationError | null;
  subscription: PushSubscription | null;

  // Actions
  requestPermission: () => Promise<NotificationPermission>;
  subscribe: () => Promise<PushSubscription | null>;
  unsubscribe: () => Promise<boolean>;
  sendNotification: (data: NotificationData) => Promise<boolean>;

  // Service Worker management
  registerServiceWorker: (
    url?: string
  ) => Promise<ServiceWorkerRegistration | null>;
  updateServiceWorker: () => Promise<boolean>;
  getServiceWorkerRegistration: () => Promise<ServiceWorkerRegistration | null>;

  // Utilities
  isNotificationSupported: () => boolean;
  isPushSupported: () => boolean;
  getSubscriptionData: () => PushSubscriptionData | null;
  testNotification: (
    title?: string,
    options?: NotificationOptions
  ) => Promise<boolean>;

  // Advanced features
  scheduleNotification: (
    data: NotificationData,
    delay: number
  ) => Promise<string>;
  cancelScheduledNotification: (id: string) => Promise<boolean>;
  getNotificationHistory: () => Promise<Notification[]>;
  clearNotifications: () => Promise<void>;
}

// Utility functions
const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const isNotificationSupported = (): boolean => {
  return 'Notification' in window;
};

const isPushSupported = (): boolean => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
};

const isServiceWorkerSupported = (): boolean => {
  return 'serviceWorker' in navigator;
};

/**
 * AAE Push Notifications Hook
 * Provides comprehensive push notification functionality with service worker integration
 */
export function usePushNotifications(
  options: PushNotificationOptions
): UsePushNotificationsReturn {
  const {
    vapidPublicKey,
    subscriptionEndpoint = '/api/push/subscribe',
    notificationOptions = {},
    autoSubscribe = false,
    serviceWorkerUrl = '/sw.js',
    onSubscriptionChange,
    onNotificationReceived,
    onNotificationClicked,
    onError,
  } = options;

  // State
  const [state, setState] = useState<PushNotificationState>({
    isSupported: isPushSupported() && isNotificationSupported(),
    hasPermission: false,
    isSubscribed: false,
    isSubscribing: false,
    serviceWorkerReady: false,
    permissionStatus: 'default',
  });

  const [error, setError] = useState<PushNotificationError | null>(null);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  // Refs
  const serviceWorkerRegistration = useRef<ServiceWorkerRegistration | null>(
    null
  );
  const scheduledNotifications = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Error handler
  const handleError = useCallback(
    (
      type: PushNotificationError['type'],
      message: string,
      originalError?: Error
    ) => {
      const pushError: PushNotificationError = {
        type,
        message,
        originalError,
        code: originalError?.name,
      };
      setError(pushError);
      onError?.(pushError);
    },
    [onError]
  );

  // Register service worker
  const registerServiceWorker = useCallback(
    async (url?: string): Promise<ServiceWorkerRegistration | null> => {
      if (!isServiceWorkerSupported()) {
        handleError('browser', 'Service Workers are not supported');
        return null;
      }

      try {
        const swUrl = url || serviceWorkerUrl;
        const registration = await navigator.serviceWorker.register(swUrl);

        serviceWorkerRegistration.current = registration;

        // Wait for service worker to be ready
        await navigator.serviceWorker.ready;

        setState(prev => ({ ...prev, serviceWorkerReady: true }));

        // Set up service worker event listeners
        if (registration.active) {
          setupServiceWorkerListeners(registration);
        }

        return registration;
      } catch (err) {
        handleError(
          'service-worker',
          'Failed to register service worker',
          err as Error
        );
        return null;
      }
    },
    [serviceWorkerUrl, handleError]
  );

  // Setup service worker event listeners
  const setupServiceWorkerListeners = useCallback(
    (registration: ServiceWorkerRegistration) => {
      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', event => {
        const { type, data } = event.data;

        switch (type) {
          case 'notification-received':
            onNotificationReceived?.(data);
            break;
          case 'notification-clicked':
            onNotificationClicked?.(data);
            break;
          default:
            break;
        }
      });

      // Listen for subscription changes
      registration.addEventListener('pushsubscriptionchange', async event => {
        try {
          const newSubscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
          });

          setSubscription(newSubscription);
          onSubscriptionChange?.(newSubscription);

          // Send new subscription to backend
          if (subscriptionEndpoint) {
            await sendSubscriptionToBackend(newSubscription, 'update');
          }
        } catch (err) {
          handleError(
            'subscription',
            'Failed to handle subscription change',
            err as Error
          );
        }
      });
    },
    [
      vapidPublicKey,
      subscriptionEndpoint,
      onNotificationReceived,
      onNotificationClicked,
      onSubscriptionChange,
      handleError,
    ]
  );

  // Request notification permission
  const requestPermission =
    useCallback(async (): Promise<NotificationPermission> => {
      if (!isNotificationSupported()) {
        handleError('browser', 'Notifications are not supported');
        return 'denied';
      }

      try {
        const permission = await Notification.requestPermission();

        setState(prev => ({
          ...prev,
          hasPermission: permission === 'granted',
          permissionStatus: permission,
        }));

        if (permission === 'granted' && autoSubscribe) {
          await subscribe();
        }

        return permission;
      } catch (err) {
        handleError(
          'permission',
          'Failed to request notification permission',
          err as Error
        );
        return 'denied';
      }
    }, [autoSubscribe, handleError]);

  // Send subscription to backend
  const sendSubscriptionToBackend = useCallback(
    async (
      sub: PushSubscription,
      action: 'subscribe' | 'unsubscribe' | 'update'
    ): Promise<boolean> => {
      if (!subscriptionEndpoint) return true;

      try {
        const response = await fetch(subscriptionEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action,
            subscription: {
              endpoint: sub.endpoint,
              keys: {
                p256dh: btoa(
                  String.fromCharCode(...new Uint8Array(sub.getKey('p256dh')!))
                ),
                auth: btoa(
                  String.fromCharCode(...new Uint8Array(sub.getKey('auth')!))
                ),
              },
              expirationTime: sub.expirationTime,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true;
      } catch (err) {
        handleError(
          'network',
          'Failed to send subscription to backend',
          err as Error
        );
        return false;
      }
    },
    [subscriptionEndpoint, handleError]
  );

  // Subscribe to push notifications
  const subscribe = useCallback(async (): Promise<PushSubscription | null> => {
    if (!state.isSupported) {
      handleError('browser', 'Push notifications are not supported');
      return null;
    }

    if (!state.hasPermission) {
      const permission = await requestPermission();
      if (permission !== 'granted') {
        handleError('permission', 'Notification permission denied');
        return null;
      }
    }

    if (!state.serviceWorkerReady) {
      const registration = await registerServiceWorker();
      if (!registration) {
        return null;
      }
    }

    setState(prev => ({ ...prev, isSubscribing: true }));
    setError(null);

    try {
      const registration =
        serviceWorkerRegistration.current ||
        (await navigator.serviceWorker.ready);

      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      setSubscription(pushSubscription);
      setState(prev => ({
        ...prev,
        isSubscribed: true,
        isSubscribing: false,
      }));

      // Send subscription to backend
      await sendSubscriptionToBackend(pushSubscription, 'subscribe');

      onSubscriptionChange?.(pushSubscription);

      return pushSubscription;
    } catch (err) {
      setState(prev => ({ ...prev, isSubscribing: false }));

      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          handleError('permission', 'Push subscription was denied');
        } else if (err.name === 'NotSupportedError') {
          handleError('browser', 'Push messaging is not supported');
        } else {
          handleError(
            'subscription',
            'Failed to subscribe to push notifications',
            err
          );
        }
      }

      return null;
    }
  }, [
    state.isSupported,
    state.hasPermission,
    state.serviceWorkerReady,
    vapidPublicKey,
    requestPermission,
    registerServiceWorker,
    sendSubscriptionToBackend,
    onSubscriptionChange,
    handleError,
  ]);

  // Unsubscribe from push notifications
  const unsubscribe = useCallback(async (): Promise<boolean> => {
    if (!subscription) {
      return true;
    }

    try {
      // Send unsubscribe to backend first
      await sendSubscriptionToBackend(subscription, 'unsubscribe');

      // Unsubscribe from push manager
      const success = await subscription.unsubscribe();

      if (success) {
        setSubscription(null);
        setState(prev => ({ ...prev, isSubscribed: false }));
        onSubscriptionChange?.(null);
      }

      return success;
    } catch (err) {
      handleError(
        'subscription',
        'Failed to unsubscribe from push notifications',
        err as Error
      );
      return false;
    }
  }, [
    subscription,
    sendSubscriptionToBackend,
    onSubscriptionChange,
    handleError,
  ]);

  // Send a local notification
  const sendNotification = useCallback(
    async (data: NotificationData): Promise<boolean> => {
      if (!isNotificationSupported()) {
        handleError('browser', 'Notifications are not supported');
        return false;
      }

      if (!state.hasPermission) {
        handleError('permission', 'Notification permission not granted');
        return false;
      }

      try {
        const options: NotificationOptions = {
          body: data.body,
          icon: data.icon,
          badge: data.badge,
          image: data.image,
          tag: data.tag,
          data: data.data,
          actions: data.actions,
          requireInteraction: data.requireInteraction,
          silent: data.silent,
          timestamp: data.timestamp || Date.now(),
          ...notificationOptions,
        };

        const notification = new Notification(data.title, options);

        // Handle notification click
        notification.onclick = event => {
          onNotificationClicked?.(event as any);
          window.focus();
          notification.close();
        };

        return true;
      } catch (err) {
        handleError('browser', 'Failed to show notification', err as Error);
        return false;
      }
    },
    [
      state.hasPermission,
      notificationOptions,
      onNotificationClicked,
      handleError,
    ]
  );

  // Update service worker
  const updateServiceWorker = useCallback(async (): Promise<boolean> => {
    if (!serviceWorkerRegistration.current) {
      return false;
    }

    try {
      const registration = await serviceWorkerRegistration.current.update();
      return !!registration;
    } catch (err) {
      handleError(
        'service-worker',
        'Failed to update service worker',
        err as Error
      );
      return false;
    }
  }, [handleError]);

  // Get service worker registration
  const getServiceWorkerRegistration =
    useCallback(async (): Promise<ServiceWorkerRegistration | null> => {
      if (!isServiceWorkerSupported()) {
        return null;
      }

      try {
        return await navigator.serviceWorker.ready;
      } catch (err) {
        handleError(
          'service-worker',
          'Failed to get service worker registration',
          err as Error
        );
        return null;
      }
    }, [handleError]);

  // Get subscription data
  const getSubscriptionData = useCallback((): PushSubscriptionData | null => {
    if (!subscription) return null;

    try {
      const p256dh = subscription.getKey('p256dh');
      const auth = subscription.getKey('auth');

      if (!p256dh || !auth) {
        return null;
      }

      return {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: btoa(String.fromCharCode(...new Uint8Array(p256dh))),
          auth: btoa(String.fromCharCode(...new Uint8Array(auth))),
        },
        expirationTime: subscription.expirationTime,
      };
    } catch (err) {
      handleError(
        'subscription',
        'Failed to get subscription data',
        err as Error
      );
      return null;
    }
  }, [subscription, handleError]);

  // Test notification
  const testNotification = useCallback(
    async (
      title = 'Test Notification',
      options: NotificationOptions = {}
    ): Promise<boolean> => {
      return await sendNotification({
        title,
        body: 'This is a test notification',
        icon: '/icon-192x192.png',
        ...options,
      });
    },
    [sendNotification]
  );

  // Schedule notification
  const scheduleNotification = useCallback(
    async (data: NotificationData, delay: number): Promise<string> => {
      const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const timeoutId = setTimeout(async () => {
        await sendNotification(data);
        scheduledNotifications.current.delete(id);
      }, delay);

      scheduledNotifications.current.set(id, timeoutId);

      return id;
    },
    [sendNotification]
  );

  // Cancel scheduled notification
  const cancelScheduledNotification = useCallback(
    async (id: string): Promise<boolean> => {
      const timeoutId = scheduledNotifications.current.get(id);

      if (timeoutId) {
        clearTimeout(timeoutId);
        scheduledNotifications.current.delete(id);
        return true;
      }

      return false;
    },
    []
  );

  // Get notification history (browser-dependent)
  const getNotificationHistory = useCallback(async (): Promise<
    Notification[]
  > => {
    // This is a placeholder as browsers don't provide a standard API for notification history
    // In a real implementation, you might track notifications in localStorage or IndexedDB
    return [];
  }, []);

  // Clear all notifications
  const clearNotifications = useCallback(async (): Promise<void> => {
    if (!state.serviceWorkerReady || !serviceWorkerRegistration.current) {
      return;
    }

    try {
      const notifications =
        await serviceWorkerRegistration.current.getNotifications();
      notifications.forEach(notification => notification.close());
    } catch (err) {
      handleError('browser', 'Failed to clear notifications', err as Error);
    }
  }, [state.serviceWorkerReady, handleError]);

  // Initialize on mount
  useEffect(() => {
    const initialize = async () => {
      if (!state.isSupported) return;

      // Check current permission status
      if (isNotificationSupported()) {
        setState(prev => ({
          ...prev,
          hasPermission: Notification.permission === 'granted',
          permissionStatus: Notification.permission,
        }));
      }

      // Register service worker
      if (isServiceWorkerSupported()) {
        await registerServiceWorker();
      }

      // Check existing subscription
      try {
        const registration = await navigator.serviceWorker.ready;
        const existingSubscription =
          await registration.pushManager.getSubscription();

        if (existingSubscription) {
          setSubscription(existingSubscription);
          setState(prev => ({ ...prev, isSubscribed: true }));
          onSubscriptionChange?.(existingSubscription);
        }
      } catch (err) {
        // Subscription check failed, but don't error out
      }
    };

    initialize();
  }, [state.isSupported, registerServiceWorker, onSubscriptionChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear all scheduled notifications
      scheduledNotifications.current.forEach(timeoutId => {
        clearTimeout(timeoutId);
      });
      scheduledNotifications.current.clear();
    };
  }, []);

  return {
    // State
    state,
    error,
    subscription,

    // Actions
    requestPermission,
    subscribe,
    unsubscribe,
    sendNotification,

    // Service Worker management
    registerServiceWorker,
    updateServiceWorker,
    getServiceWorkerRegistration,

    // Utilities
    isNotificationSupported,
    isPushSupported,
    getSubscriptionData,
    testNotification,

    // Advanced features
    scheduleNotification,
    cancelScheduledNotification,
    getNotificationHistory,
    clearNotifications,
  };
}

export default usePushNotifications;
