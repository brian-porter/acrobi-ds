/**
 * @fileoverview Service Worker Registration Utility for Epic 67
 * Helper functions for registering and managing the AAE service worker
 */

// Service worker registration options
export interface ServiceWorkerOptions {
  swUrl?: string;
  onRegistered?: (registration: ServiceWorkerRegistration) => void;
  onUpdated?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: Error) => void;
  onOffline?: () => void;
  onOnline?: () => void;
  checkForUpdates?: boolean;
  updateCheckInterval?: number;
}

// Default configuration
const DEFAULT_OPTIONS: Required<ServiceWorkerOptions> = {
  swUrl: '/sw.js',
  onRegistered: () => {},
  onUpdated: () => {},
  onError: () => {},
  onOffline: () => {},
  onOnline: () => {},
  checkForUpdates: true,
  updateCheckInterval: 60000, // 1 minute
};

/**
 * Service Worker Manager Class
 */
export class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null;
  private options: Required<ServiceWorkerOptions>;
  private updateCheckTimer: NodeJS.Timeout | null = null;

  constructor(options: ServiceWorkerOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  /**
   * Register the service worker
   */
  async register(): Promise<ServiceWorkerRegistration | null> {
    if (!this.isSupported()) {
      console.warn('Service Workers are not supported in this browser');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.register(
        this.options.swUrl,
        {
          scope: '/',
        }
      );

      this.registration = registration;
      this.setupEventListeners(registration);
      this.options.onRegistered(registration);

      console.log('Service Worker registered successfully');

      // Check for updates
      if (this.options.checkForUpdates) {
        this.startUpdateChecks();
      }

      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      this.options.onError(error as Error);
      return null;
    }
  }

  /**
   * Unregister the service worker
   */
  async unregister(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      const result = await this.registration.unregister();
      this.cleanup();
      console.log('Service Worker unregistered successfully');
      return result;
    } catch (error) {
      console.error('Service Worker unregistration failed:', error);
      return false;
    }
  }

  /**
   * Check for service worker updates
   */
  async checkForUpdates(): Promise<void> {
    if (!this.registration) {
      return;
    }

    try {
      const registration = await this.registration.update();
      console.log('Checked for Service Worker updates');

      if (registration.waiting) {
        this.options.onUpdated(registration);
      }
    } catch (error) {
      console.error('Service Worker update check failed:', error);
    }
  }

  /**
   * Skip waiting and activate new service worker
   */
  async skipWaiting(): Promise<void> {
    if (!this.registration?.waiting) {
      return;
    }

    try {
      // Send message to service worker to skip waiting
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });

      // Wait for the new service worker to become active
      await new Promise(resolve => {
        const handleStateChange = () => {
          if (this.registration?.waiting?.state === 'activated') {
            this.registration.waiting.removeEventListener(
              'statechange',
              handleStateChange
            );
            resolve(void 0);
          }
        };

        this.registration.waiting.addEventListener(
          'statechange',
          handleStateChange
        );
      });

      // Reload the page to use the new service worker
      window.location.reload();
    } catch (error) {
      console.error('Failed to activate new service worker:', error);
    }
  }

  /**
   * Get cache status from service worker
   */
  async getCacheStatus(): Promise<any> {
    if (!this.registration?.active) {
      return null;
    }

    return new Promise(resolve => {
      const messageChannel = new MessageChannel();

      messageChannel.port1.onmessage = event => {
        if (event.data.type === 'CACHE_STATUS') {
          resolve(event.data);
        }
      };

      this.registration.active.postMessage({ type: 'GET_CACHE_STATUS' }, [
        messageChannel.port2,
      ]);

      // Timeout after 5 seconds
      setTimeout(() => resolve(null), 5000);
    });
  }

  /**
   * Clear all caches
   */
  async clearCaches(): Promise<boolean> {
    if (!this.registration?.active) {
      return false;
    }

    return new Promise(resolve => {
      const messageChannel = new MessageChannel();

      messageChannel.port1.onmessage = event => {
        if (event.data.type === 'CACHE_CLEARED') {
          resolve(true);
        }
      };

      this.registration.active.postMessage({ type: 'CLEAR_CACHE' }, [
        messageChannel.port2,
      ]);

      // Timeout after 10 seconds
      setTimeout(() => resolve(false), 10000);
    });
  }

  /**
   * Check if service workers are supported
   */
  isSupported(): boolean {
    return 'serviceWorker' in navigator;
  }

  /**
   * Check if the app is running standalone (installed AAE)
   */
  isStandalone(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    );
  }

  /**
   * Get the current registration
   */
  getRegistration(): ServiceWorkerRegistration | null {
    return this.registration;
  }

  /**
   * Setup event listeners for the service worker
   */
  private setupEventListeners(registration: ServiceWorkerRegistration): void {
    // Listen for new service worker installations
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // New update available
            this.options.onUpdated(registration);
          } else {
            // First time installation
            this.options.onRegistered(registration);
          }
        }
      });
    });

    // Listen for online/offline events
    window.addEventListener('online', this.options.onOnline);
    window.addEventListener('offline', this.options.onOffline);

    // Listen for service worker messages
    navigator.serviceWorker.addEventListener('message', event => {
      console.log('Message from Service Worker:', event.data);
    });
  }

  /**
   * Start periodic update checks
   */
  private startUpdateChecks(): void {
    this.updateCheckTimer = setInterval(() => {
      this.checkForUpdates();
    }, this.options.updateCheckInterval);
  }

  /**
   * Cleanup resources
   */
  private cleanup(): void {
    if (this.updateCheckTimer) {
      clearInterval(this.updateCheckTimer);
      this.updateCheckTimer = null;
    }

    window.removeEventListener('online', this.options.onOnline);
    window.removeEventListener('offline', this.options.onOffline);
  }
}

/**
 * Simple registration function for basic use cases
 */
export async function registerServiceWorker(
  options: ServiceWorkerOptions = {}
): Promise<ServiceWorkerRegistration | null> {
  const manager = new ServiceWorkerManager(options);
  return manager.register();
}

/**
 * Utility function to show update notification
 */
export function showUpdateNotification(
  registration: ServiceWorkerRegistration,
  onConfirm?: () => void
): void {
  const message = 'A new version of the app is available. Reload to update?';

  if (confirm(message)) {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
    onConfirm?.();
  }
}

/**
 * Hook for React applications
 */
export function useServiceWorker(options: ServiceWorkerOptions = {}) {
  const [manager] = React.useState(() => new ServiceWorkerManager(options));
  const [registration, setRegistration] =
    React.useState<ServiceWorkerRegistration | null>(null);
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = React.useState(false);

  React.useEffect(() => {
    const registerSW = async () => {
      const reg = await manager.register();
      setRegistration(reg);
    };

    registerSW();

    // Setup online/offline listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [manager]);

  // Setup update listener
  React.useEffect(() => {
    if (!registration) return;

    const handleUpdate = () => setUpdateAvailable(true);

    const originalOnUpdated = options.onUpdated || (() => {});
    manager['options'].onUpdated = reg => {
      handleUpdate();
      originalOnUpdated(reg);
    };
  }, [registration, options.onUpdated, manager]);

  const skipWaiting = React.useCallback(async () => {
    await manager.skipWaiting();
    setUpdateAvailable(false);
  }, [manager]);

  const checkForUpdates = React.useCallback(() => {
    return manager.checkForUpdates();
  }, [manager]);

  const getCacheStatus = React.useCallback(() => {
    return manager.getCacheStatus();
  }, [manager]);

  const clearCaches = React.useCallback(() => {
    return manager.clearCaches();
  }, [manager]);

  return {
    registration,
    isOnline,
    updateAvailable,
    isStandalone: manager.isStandalone(),
    isSupported: manager.isSupported(),
    skipWaiting,
    checkForUpdates,
    getCacheStatus,
    clearCaches,
  };
}

// Import React for the hook (will be tree-shaken if not used)
import * as React from 'react';
