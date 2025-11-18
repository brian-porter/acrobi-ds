/**
 * @fileoverview Background sync hook for Epic 68
 * Provides a React hook for registering background sync tasks
 */

import { useState, useEffect, useCallback } from 'react';

// Background sync state interface
export interface BackgroundSyncState {
  isSupported: boolean;
  registration: ServiceWorkerRegistration | null;
  error: string | null;
  isRegistering: boolean;
  registeredTags: Set<string>;
}

// Options for the background sync hook
export interface UseBackgroundSyncOptions {
  autoRegisterSW?: boolean;
  swUrl?: string;
  onSyncSuccess?: (tag: string) => void;
  onSyncError?: (tag: string, error: Error) => void;
}

// Return type for the hook
export interface UseBackgroundSyncReturn extends BackgroundSyncState {
  register: (tag: string) => Promise<boolean>;
  unregister: (tag: string) => Promise<boolean>;
  isTagRegistered: (tag: string) => boolean;
  clearError: () => void;
  getRegisteredTags: () => string[];
}

/**
 * Background sync tags commonly used in AAEs
 */
export const SYNC_TAGS = {
  USER_DATA: 'user-data-sync',
  FORM_SUBMISSION: 'form-submission',
  OFFLINE_ACTIONS: 'offline-actions',
  ANALYTICS_DATA: 'analytics-data',
  CACHE_CLEANUP: 'cache-cleanup',
} as const;

export type SyncTag = (typeof SYNC_TAGS)[keyof typeof SYNC_TAGS];

/**
 * Hook for managing background sync functionality
 */
export function useBackgroundSync(
  options: UseBackgroundSyncOptions = {}
): UseBackgroundSyncReturn {
  const {
    autoRegisterSW = true,
    swUrl = '/sw.js',
    onSyncSuccess,
    onSyncError,
  } = options;

  const [state, setState] = useState<BackgroundSyncState>({
    isSupported: false,
    registration: null,
    error: null,
    isRegistering: false,
    registeredTags: new Set(),
  });

  // Check if background sync is supported
  const checkSupport = useCallback(() => {
    const isSupported =
      'serviceWorker' in navigator &&
      'sync' in window.ServiceWorkerRegistration.prototype;

    setState(prev => ({ ...prev, isSupported }));
    return isSupported;
  }, []);

  // Get service worker registration
  const getRegistration =
    useCallback(async (): Promise<ServiceWorkerRegistration | null> => {
      if (!checkSupport()) {
        return null;
      }

      try {
        let registration = state.registration;

        if (!registration) {
          if (autoRegisterSW) {
            registration = await navigator.serviceWorker.register(swUrl);
          } else {
            registration = await navigator.serviceWorker.ready;
          }

          setState(prev => ({ ...prev, registration }));
        }

        return registration;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to get service worker registration';
        setState(prev => ({ ...prev, error: errorMessage }));
        return null;
      }
    }, [autoRegisterSW, swUrl, state.registration, checkSupport]);

  // Register a background sync task
  const register = useCallback(
    async (tag: string): Promise<boolean> => {
      if (!state.isSupported) {
        setState(prev => ({
          ...prev,
          error: 'Background sync is not supported',
        }));
        return false;
      }

      setState(prev => ({ ...prev, isRegistering: true, error: null }));

      try {
        const registration = await getRegistration();

        if (!registration) {
          throw new Error('Service worker registration not available');
        }

        // Register the sync task
        await registration.sync.register(tag);

        setState(prev => ({
          ...prev,
          isRegistering: false,
          registeredTags: new Set([...prev.registeredTags, tag]),
        }));

        console.log(`Background sync registered for tag: ${tag}`);
        return true;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : `Failed to register sync for tag: ${tag}`;
        setState(prev => ({
          ...prev,
          isRegistering: false,
          error: errorMessage,
        }));

        onSyncError?.(
          tag,
          error instanceof Error ? error : new Error(errorMessage)
        );
        return false;
      }
    },
    [state.isSupported, getRegistration, onSyncError]
  );

  // Unregister a background sync task (note: this doesn't actually unregister, just removes from our tracking)
  const unregister = useCallback(async (tag: string): Promise<boolean> => {
    try {
      setState(prev => {
        const newTags = new Set(prev.registeredTags);
        newTags.delete(tag);
        return { ...prev, registeredTags: newTags };
      });

      console.log(`Removed tracking for sync tag: ${tag}`);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : `Failed to unregister sync for tag: ${tag}`;
      setState(prev => ({ ...prev, error: errorMessage }));
      return false;
    }
  }, []);

  // Check if a tag is registered
  const isTagRegistered = useCallback(
    (tag: string): boolean => {
      return state.registeredTags.has(tag);
    },
    [state.registeredTags]
  );

  // Get all registered tags
  const getRegisteredTags = useCallback((): string[] => {
    return Array.from(state.registeredTags);
  }, [state.registeredTags]);

  // Clear error state
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Setup effect for initialization and service worker message handling
  useEffect(() => {
    checkSupport();

    if (state.isSupported) {
      // Listen for service worker messages about sync success
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'SYNC_SUCCESS') {
          const { tag } = event.data;
          onSyncSuccess?.(tag);
          console.log(`Background sync completed successfully for tag: ${tag}`);
        }
      };

      navigator.serviceWorker.addEventListener('message', handleMessage);

      return () => {
        navigator.serviceWorker.removeEventListener('message', handleMessage);
      };
    }
  }, [state.isSupported, onSyncSuccess, checkSupport]);

  return {
    ...state,
    register,
    unregister,
    isTagRegistered,
    clearError,
    getRegisteredTags,
  };
}

/**
 * Utility function to save data to IndexedDB before registering sync
 */
export async function saveForSync(
  storeName: string,
  data: any
): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AcrobiAAEDB', 1);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);

      const dataWithTimestamp = {
        ...data,
        timestamp: Date.now(),
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };

      const addRequest = store.add(dataWithTimestamp);

      addRequest.onsuccess = () => resolve(dataWithTimestamp.id);
      addRequest.onerror = () => reject(addRequest.error);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: false,
        });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

/**
 * Utility function to get pending sync data from IndexedDB
 */
export async function getPendingSyncData(storeName: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AcrobiAAEDB', 1);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(storeName)) {
        resolve([]);
        return;
      }

      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => resolve(getAllRequest.result || []);
      getAllRequest.onerror = () => reject(getAllRequest.error);
    };
  });
}

/**
 * Background sync utility class for common operations
 */
export class BackgroundSyncUtils {
  /**
   * Register form submission for background sync
   */
  static async registerFormSubmission(
    hook: UseBackgroundSyncReturn,
    formData: any,
    endpoint: string,
    options: { method?: string; headers?: Record<string, string> } = {}
  ): Promise<boolean> {
    try {
      // Save form data to IndexedDB
      const formId = await saveForSync('pendingFormSubmissions', {
        data: formData,
        endpoint,
        method: options.method || 'POST',
        headers: options.headers || {},
      });

      // Register background sync
      const success = await hook.register(SYNC_TAGS.FORM_SUBMISSION);

      if (success) {
        console.log(`Form submission queued for sync with ID: ${formId}`);
      }

      return success;
    } catch (error) {
      console.error('Failed to register form submission for sync:', error);
      return false;
    }
  }

  /**
   * Register offline action for background sync
   */
  static async registerOfflineAction(
    hook: UseBackgroundSyncReturn,
    actionType: string,
    payload: any
  ): Promise<boolean> {
    try {
      // Save action to IndexedDB
      await saveForSync('offlineActions', {
        type: actionType,
        payload,
      });

      // Register background sync
      const success = await hook.register(SYNC_TAGS.OFFLINE_ACTIONS);

      if (success) {
        console.log(`Offline action "${actionType}" queued for sync`);
      }

      return success;
    } catch (error) {
      console.error('Failed to register offline action for sync:', error);
      return false;
    }
  }

  /**
   * Register analytics data for background sync
   */
  static async registerAnalyticsSync(
    hook: UseBackgroundSyncReturn,
    events: any[]
  ): Promise<boolean> {
    try {
      // Save events to IndexedDB
      for (const event of events) {
        await saveForSync('analyticsEvents', event);
      }

      // Register background sync
      const success = await hook.register(SYNC_TAGS.ANALYTICS_DATA);

      if (success) {
        console.log(`${events.length} analytics events queued for sync`);
      }

      return success;
    } catch (error) {
      console.error('Failed to register analytics data for sync:', error);
      return false;
    }
  }
}
