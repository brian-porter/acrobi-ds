/**
 * @fileoverview Wake Lock Hook for Epic 55 - AAE Screen Wake Lock
 * Provides comprehensive screen wake lock management using the Screen Wake Lock API.
 * Handles wake lock requests, releases, and automatic re-acquisition on visibility changes.
 */

import { useState, useCallback, useRef, useEffect } from 'react';

// Wake lock types
export interface WakeLockOptions {
  /** Callback when wake lock is acquired */
  onAcquired?: () => void;
  /** Callback when wake lock is released */
  onReleased?: () => void;
  /** Callback when error occurs */
  onError?: (error: WakeLockError) => void;
  /** Auto re-acquire lock when document becomes visible */
  autoReacquire?: boolean;
  /** Type of wake lock to request */
  type?: 'screen';
}

export interface WakeLockError {
  type: 'not_supported' | 'permission_denied' | 'not_allowed' | 'general';
  message: string;
  originalError?: Error;
}

export interface WakeLockState {
  isLocked: boolean;
  isSupported: boolean;
  isRequesting: boolean;
  wasActiveBeforeHidden: boolean;
  acquisitionTime: number | null;
  releaseReason: string | null;
}

export interface UseWakeLockReturn {
  // State
  state: WakeLockState;
  error: WakeLockError | null;

  // Actions
  request: () => Promise<boolean>;
  release: () => Promise<boolean>;
  toggle: () => Promise<boolean>;

  // Utilities
  isSupported: boolean;
  getDuration: () => number;
  getStatus: () => 'locked' | 'unlocked' | 'requesting';
}

// Check if Wake Lock API is supported
const isWakeLockSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    'navigator' in window &&
    'wakeLock' in navigator &&
    typeof navigator.wakeLock.request === 'function'
  );
};

/**
 * Wake Lock Hook
 * Manages screen wake lock to prevent screen from sleeping during critical tasks
 */
export function useWakeLock(options: WakeLockOptions = {}): UseWakeLockReturn {
  const {
    onAcquired,
    onReleased,
    onError,
    autoReacquire = true,
    type = 'screen',
  } = options;

  // State
  const [state, setState] = useState<WakeLockState>({
    isLocked: false,
    isSupported: isWakeLockSupported(),
    isRequesting: false,
    wasActiveBeforeHidden: false,
    acquisitionTime: null,
    releaseReason: null,
  });

  const [error, setError] = useState<WakeLockError | null>(null);

  // Refs
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const isUnmountedRef = useRef(false);

  // Error handling
  const handleError = useCallback(
    (type: WakeLockError['type'], message: string, originalError?: Error) => {
      const wakeLockError: WakeLockError = { type, message, originalError };
      setError(wakeLockError);
      onError?.(wakeLockError);
    },
    [onError]
  );

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Request wake lock
  const request = useCallback(async (): Promise<boolean> => {
    if (!state.isSupported) {
      handleError(
        'not_supported',
        'Screen Wake Lock API is not supported in this browser'
      );
      return false;
    }

    if (state.isLocked || state.isRequesting) {
      return state.isLocked;
    }

    clearError();
    setState(prev => ({ ...prev, isRequesting: true, releaseReason: null }));

    try {
      const wakeLock = await navigator.wakeLock.request(type);

      if (isUnmountedRef.current) {
        // Component was unmounted during request
        await wakeLock.release();
        return false;
      }

      wakeLockRef.current = wakeLock;

      // Set up release handler
      wakeLock.addEventListener('release', event => {
        console.log('Wake lock released:', event);

        const releaseReason = (event as any).reason || 'unknown';

        setState(prev => ({
          ...prev,
          isLocked: false,
          isRequesting: false,
          acquisitionTime: null,
          releaseReason,
        }));

        wakeLockRef.current = null;
        onReleased?.();
      });

      setState(prev => ({
        ...prev,
        isLocked: true,
        isRequesting: false,
        acquisitionTime: Date.now(),
        releaseReason: null,
      }));

      onAcquired?.();
      return true;
    } catch (err) {
      const error = err as Error;

      setState(prev => ({ ...prev, isRequesting: false }));

      if (error.name === 'NotAllowedError') {
        handleError(
          'not_allowed',
          'Wake lock request not allowed. User interaction may be required.'
        );
      } else if (error.name === 'SecurityError') {
        handleError(
          'permission_denied',
          'Wake lock permission denied or blocked by security policy.'
        );
      } else {
        handleError(
          'general',
          `Failed to acquire wake lock: ${error.message}`,
          error
        );
      }

      return false;
    }
  }, [
    state.isSupported,
    state.isLocked,
    state.isRequesting,
    type,
    handleError,
    clearError,
    onAcquired,
    onReleased,
  ]);

  // Release wake lock
  const release = useCallback(async (): Promise<boolean> => {
    if (!wakeLockRef.current || !state.isLocked) {
      return true;
    }

    try {
      await wakeLockRef.current.release();

      // State will be updated by the release event handler
      return true;
    } catch (err) {
      const error = err as Error;
      handleError(
        'general',
        `Failed to release wake lock: ${error.message}`,
        error
      );
      return false;
    }
  }, [state.isLocked, handleError]);

  // Toggle wake lock
  const toggle = useCallback(async (): Promise<boolean> => {
    if (state.isLocked) {
      return await release();
    } else {
      return await request();
    }
  }, [state.isLocked, request, release]);

  // Get duration since acquisition
  const getDuration = useCallback((): number => {
    if (!state.acquisitionTime) return 0;
    return Date.now() - state.acquisitionTime;
  }, [state.acquisitionTime]);

  // Get current status
  const getStatus = useCallback((): 'locked' | 'unlocked' | 'requesting' => {
    if (state.isRequesting) return 'requesting';
    if (state.isLocked) return 'locked';
    return 'unlocked';
  }, [state.isRequesting, state.isLocked]);

  // Handle visibility change for auto re-acquisition
  useEffect(() => {
    if (!autoReacquire || !state.isSupported) return;

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        // Document became visible
        if (
          state.wasActiveBeforeHidden &&
          !state.isLocked &&
          !state.isRequesting
        ) {
          console.log('Re-acquiring wake lock after visibility change');
          await request();
        }

        setState(prev => ({ ...prev, wasActiveBeforeHidden: false }));
      } else if (document.visibilityState === 'hidden') {
        // Document became hidden
        if (state.isLocked) {
          setState(prev => ({ ...prev, wasActiveBeforeHidden: true }));
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [
    autoReacquire,
    state.isSupported,
    state.wasActiveBeforeHidden,
    state.isLocked,
    state.isRequesting,
    request,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isUnmountedRef.current = true;

      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(console.error);
        wakeLockRef.current = null;
      }
    };
  }, []);

  return {
    // State
    state,
    error,

    // Actions
    request,
    release,
    toggle,

    // Utilities
    isSupported: state.isSupported,
    getDuration,
    getStatus,
  };
}

// Utility functions
export const WakeLockUtils = {
  isSupported: isWakeLockSupported,

  /**
   * Format duration in human readable format
   */
  formatDuration: (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  },

  /**
   * Check if wake lock should be used based on context
   */
  shouldUseLock: (context: {
    isLongRunningTask?: boolean;
    isUserEngaged?: boolean;
    batteryLevel?: number;
    isPluggedIn?: boolean;
  }): boolean => {
    const {
      isLongRunningTask = false,
      isUserEngaged = true,
      batteryLevel = 100,
      isPluggedIn = false,
    } = context;

    // Don't use wake lock if battery is very low and not plugged in
    if (batteryLevel < 20 && !isPluggedIn) {
      return false;
    }

    // Use wake lock for long running tasks or when user is actively engaged
    return isLongRunningTask || isUserEngaged;
  },

  /**
   * Get recommended usage patterns for wake lock
   */
  getUsageTips: () => [
    'Only request wake lock in response to user interaction',
    'Release wake lock when task is complete or user navigates away',
    'Consider battery level and power state before requesting',
    'Use for video playback, presentations, or long-running tasks',
    'Avoid using wake lock for indefinite periods',
    'Provide user control to enable/disable wake lock',
    'Test on mobile devices where battery conservation is critical',
  ],

  /**
   * Check browser compatibility
   */
  getBrowserSupport: () => ({
    chrome: 'Supported since Chrome 84',
    firefox: 'Not supported',
    safari: 'Not supported',
    edge: 'Supported since Edge 84',
    mobile: 'Supported on Chrome/Edge mobile, not Safari iOS',
  }),

  /**
   * Create a wake lock manager for multiple contexts
   */
  createManager: () => {
    const contexts = new Map<string, boolean>();

    return {
      request: (contextId: string) => {
        contexts.set(contextId, true);
        return contexts.size > 0;
      },

      release: (contextId: string) => {
        contexts.delete(contextId);
        return contexts.size === 0;
      },

      hasActiveContexts: () => contexts.size > 0,

      getActiveContexts: () => Array.from(contexts.keys()),

      clear: () => {
        contexts.clear();
      },
    };
  },
};

export default useWakeLock;
