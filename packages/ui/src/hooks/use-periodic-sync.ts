/**
 * @fileoverview Periodic background sync hook for Epic 70
 * Provides a React hook for registering periodic background sync tasks
 */

import { useState, useEffect, useCallback } from 'react';

// Periodic sync state interface
export interface PeriodicSyncState {
  isSupported: boolean;
  registration: ServiceWorkerRegistration | null;
  error: string | null;
  isRegistered: boolean;
  registeredTags: string[];
  isRegistering: boolean;
}

// Periodic sync options
export interface PeriodicSyncOptions {
  minInterval?: number; // Minimum interval in milliseconds
}

// Options for the periodic sync hook
export interface UsePeriodicSyncOptions {
  autoRegisterSW?: boolean;
  swUrl?: string;
  defaultTag?: string;
  onSyncSuccess?: (tag: string, data: any) => void;
  onSyncError?: (tag: string, error: Error) => void;
}

// Return type for the hook
export interface UsePeriodicSyncReturn extends PeriodicSyncState {
  register: (tag: string, options?: PeriodicSyncOptions) => Promise<boolean>;
  unregister: (tag: string) => Promise<boolean>;
  getTags: () => Promise<string[]>;
  clearError: () => void;
  isTagRegistered: (tag: string) => boolean;
}

/**
 * Periodic sync tags commonly used in AAEs
 */
export const PERIODIC_SYNC_TAGS = {
  NEWS_UPDATE: 'news-update',
  WEATHER_UPDATE: 'weather-update',
  NOTIFICATIONS_CHECK: 'notifications-check',
  CONTENT_REFRESH: 'content-refresh',
  ANALYTICS_UPLOAD: 'analytics-upload',
  CACHE_UPDATE: 'cache-update',
} as const;

export type PeriodicSyncTag =
  (typeof PERIODIC_SYNC_TAGS)[keyof typeof PERIODIC_SYNC_TAGS];

/**
 * Hook for managing periodic background sync functionality
 */
export function usePeriodicSync(
  options: UsePeriodicSyncOptions = {}
): UsePeriodicSyncReturn {
  const {
    autoRegisterSW = true,
    swUrl = '/sw.js',
    defaultTag,
    onSyncSuccess,
    onSyncError,
  } = options;

  const [state, setState] = useState<PeriodicSyncState>({
    isSupported: false,
    registration: null,
    error: null,
    isRegistered: false,
    registeredTags: [],
    isRegistering: false,
  });

  // Check if periodic background sync is supported
  const checkSupport = useCallback(() => {
    const isSupported =
      'serviceWorker' in navigator && 'PeriodicBackgroundSync' in window;

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

  // Get registered periodic sync tags
  const getTags = useCallback(async (): Promise<string[]> => {
    if (!state.isSupported) {
      return [];
    }

    try {
      const registration = await getRegistration();

      if (!registration || !registration.periodicSync) {
        return [];
      }

      const tags = await registration.periodicSync.getTags();
      const tagArray = Array.from(tags);

      setState(prev => ({
        ...prev,
        registeredTags: tagArray,
        isRegistered: tagArray.length > 0,
      }));

      return tagArray;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to get periodic sync tags';
      setState(prev => ({ ...prev, error: errorMessage }));
      return [];
    }
  }, [state.isSupported, getRegistration]);

  // Register a periodic sync task
  const register = useCallback(
    async (
      tag: string,
      options: PeriodicSyncOptions = {}
    ): Promise<boolean> => {
      if (!state.isSupported) {
        setState(prev => ({
          ...prev,
          error: 'Periodic background sync is not supported',
        }));
        return false;
      }

      setState(prev => ({ ...prev, isRegistering: true, error: null }));

      try {
        const registration = await getRegistration();

        if (!registration) {
          throw new Error('Service worker registration not available');
        }

        if (!registration.periodicSync) {
          throw new Error(
            'PeriodicBackgroundSync API not available in service worker registration'
          );
        }

        // Register the periodic sync task
        await registration.periodicSync.register(tag, {
          minInterval: options.minInterval || 24 * 60 * 60 * 1000, // Default 24 hours
        });

        // Update registered tags
        const updatedTags = await getTags();

        setState(prev => ({
          ...prev,
          isRegistering: false,
          isRegistered: updatedTags.length > 0,
        }));

        console.log(`Periodic sync registered for tag: ${tag}`);
        return true;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : `Failed to register periodic sync for tag: ${tag}`;
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
    [state.isSupported, getRegistration, getTags, onSyncError]
  );

  // Unregister a periodic sync task
  const unregister = useCallback(
    async (tag: string): Promise<boolean> => {
      if (!state.isSupported) {
        setState(prev => ({
          ...prev,
          error: 'Periodic background sync is not supported',
        }));
        return false;
      }

      try {
        const registration = await getRegistration();

        if (!registration || !registration.periodicSync) {
          throw new Error('PeriodicBackgroundSync API not available');
        }

        // Unregister the periodic sync task
        await registration.periodicSync.unregister(tag);

        // Update registered tags
        const updatedTags = await getTags();

        setState(prev => ({
          ...prev,
          isRegistered: updatedTags.length > 0,
        }));

        console.log(`Periodic sync unregistered for tag: ${tag}`);
        return true;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : `Failed to unregister periodic sync for tag: ${tag}`;
        setState(prev => ({ ...prev, error: errorMessage }));
        return false;
      }
    },
    [state.isSupported, getRegistration, getTags]
  );

  // Check if a specific tag is registered
  const isTagRegistered = useCallback(
    (tag: string): boolean => {
      return state.registeredTags.includes(tag);
    },
    [state.registeredTags]
  );

  // Clear error state
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Setup effect for initialization and service worker message handling
  useEffect(() => {
    checkSupport();

    if (state.isSupported) {
      // Load initial registered tags
      getTags();

      // Register default tag if provided
      if (defaultTag && !state.registeredTags.includes(defaultTag)) {
        register(defaultTag);
      }

      // Listen for service worker messages about periodic sync events
      const handleMessage = (event: MessageEvent) => {
        const { data } = event;

        if (data?.type === 'PERIODIC_SYNC_SUCCESS') {
          onSyncSuccess?.(data.tag, data.data);
          console.log(
            `Periodic sync completed successfully for tag: ${data.tag}`
          );
        }
      };

      navigator.serviceWorker.addEventListener('message', handleMessage);

      return () => {
        navigator.serviceWorker.removeEventListener('message', handleMessage);
      };
    }
  }, [
    state.isSupported,
    defaultTag,
    state.registeredTags,
    getTags,
    register,
    onSyncSuccess,
    checkSupport,
  ]);

  return {
    ...state,
    register,
    unregister,
    getTags,
    clearError,
    isTagRegistered,
  };
}

/**
 * Periodic sync utility class for common operations
 */
export class PeriodicSyncUtils {
  /**
   * Get recommended intervals for different sync types
   */
  static getRecommendedInterval(
    syncType:
      | 'news'
      | 'weather'
      | 'notifications'
      | 'content'
      | 'analytics'
      | 'cache'
  ): number {
    const intervals = {
      news: 60 * 60 * 1000, // 1 hour
      weather: 30 * 60 * 1000, // 30 minutes
      notifications: 15 * 60 * 1000, // 15 minutes
      content: 4 * 60 * 60 * 1000, // 4 hours
      analytics: 24 * 60 * 60 * 1000, // 24 hours
      cache: 12 * 60 * 60 * 1000, // 12 hours
    };

    return intervals[syncType];
  }

  /**
   * Register multiple periodic sync tasks
   */
  static async registerMultiple(
    hook: UsePeriodicSyncReturn,
    tasks: { tag: string; interval?: number }[]
  ): Promise<{ successful: string[]; failed: string[] }> {
    const successful: string[] = [];
    const failed: string[] = [];

    for (const task of tasks) {
      try {
        const success = await hook.register(task.tag, {
          minInterval: task.interval || 24 * 60 * 60 * 1000,
        });

        if (success) {
          successful.push(task.tag);
        } else {
          failed.push(task.tag);
        }
      } catch (error) {
        failed.push(task.tag);
      }
    }

    return { successful, failed };
  }

  /**
   * Check browser compatibility for periodic sync
   */
  static getBrowserCompatibility(): {
    isSupported: boolean;
    browserInfo: string;
    limitations: string[];
  } {
    const isSupported =
      'serviceWorker' in navigator && 'PeriodicBackgroundSync' in window;

    let browserInfo = 'Unknown browser';
    const limitations: string[] = [];

    if (typeof navigator !== 'undefined') {
      const userAgent = navigator.userAgent;

      if (userAgent.includes('Chrome')) {
        browserInfo = 'Chrome';
        if (!isSupported) {
          limitations.push(
            'Requires Chrome 80+ with experimental features enabled'
          );
        } else {
          limitations.push('May require user engagement and AAE installation');
          limitations.push('Subject to OS battery optimization settings');
        }
      } else if (userAgent.includes('Firefox')) {
        browserInfo = 'Firefox';
        limitations.push('Not supported in Firefox');
      } else if (userAgent.includes('Safari')) {
        browserInfo = 'Safari';
        limitations.push('Not supported in Safari');
      } else if (userAgent.includes('Edge')) {
        browserInfo = 'Edge';
        if (!isSupported) {
          limitations.push(
            'Requires Edge 80+ with experimental features enabled'
          );
        } else {
          limitations.push('May require user engagement and AAE installation');
        }
      }
    }

    return {
      isSupported,
      browserInfo,
      limitations,
    };
  }

  /**
   * Validate periodic sync configuration
   */
  static validateConfig(
    tag: string,
    options: PeriodicSyncOptions = {}
  ): {
    valid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate tag
    if (!tag || typeof tag !== 'string') {
      errors.push('Tag must be a non-empty string');
    } else if (tag.length > 64) {
      errors.push('Tag must be 64 characters or less');
    }

    // Validate interval
    if (options.minInterval !== undefined) {
      if (typeof options.minInterval !== 'number') {
        errors.push('minInterval must be a number');
      } else if (options.minInterval < 0) {
        errors.push('minInterval must be positive');
      } else if (options.minInterval < 12 * 60 * 60 * 1000) {
        warnings.push(
          'Intervals less than 12 hours may not be honored by the browser'
        );
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Get sync frequency statistics
   */
  static getSyncStats(registeredTags: string[]): {
    totalTags: number;
    categoryBreakdown: Record<string, number>;
    estimatedDailyRuns: number;
  } {
    const categoryBreakdown: Record<string, number> = {
      news: 0,
      weather: 0,
      notifications: 0,
      content: 0,
      analytics: 0,
      cache: 0,
      other: 0,
    };

    registeredTags.forEach(tag => {
      if (tag.includes('news')) categoryBreakdown.news++;
      else if (tag.includes('weather')) categoryBreakdown.weather++;
      else if (tag.includes('notification')) categoryBreakdown.notifications++;
      else if (tag.includes('content')) categoryBreakdown.content++;
      else if (tag.includes('analytics')) categoryBreakdown.analytics++;
      else if (tag.includes('cache')) categoryBreakdown.cache++;
      else categoryBreakdown.other++;
    });

    // Estimate daily runs (very rough approximation)
    const estimatedDailyRuns = registeredTags.length * 2; // Assume avg 2 runs per tag per day

    return {
      totalTags: registeredTags.length,
      categoryBreakdown,
      estimatedDailyRuns,
    };
  }
}
