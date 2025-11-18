/**
 * @fileoverview useAppBadge Hook for PWA App Badging API (Epic 74)
 * Provides a simple interface for managing PWA app icon badges
 */

import { useState, useCallback, useEffect } from 'react';

/**
 * Interface for badge API support detection
 */
interface BadgeSupport {
  /** Whether the Badging API is supported */
  isSupported: boolean;
  /** Specific capability detection */
  canSetBadge: boolean;
  /** Can clear badge */
  canClearBadge: boolean;
}

/**
 * Badge error types
 */
interface BadgeError {
  /** Error type */
  type: 'SET_ERROR' | 'CLEAR_ERROR' | 'UNSUPPORTED';
  /** Error message */
  message: string;
  /** Original error object */
  originalError?: Error;
}

/**
 * Hook return interface
 */
interface UseAppBadgeReturn {
  /** Current badge support status */
  support: BadgeSupport;
  /** Current badge count (local state) */
  count: number | null;
  /** Any error that occurred */
  error: BadgeError | null;
  /** Whether badge operation is in progress */
  loading: boolean;
  /** Set badge count */
  set: (count: number) => Promise<void>;
  /** Clear badge */
  clear: () => Promise<void>;
  /** Increment badge count */
  increment: () => Promise<void>;
  /** Decrement badge count */
  decrement: () => Promise<void>;
  /** Reset local count without affecting badge */
  resetCount: () => void;
}

/**
 * Custom hook for managing PWA app badge
 * Provides methods to set, clear, increment, and decrement the app icon badge
 * 
 * @example
 * ```typescript
 * function NotificationComponent() {
 *   const { support, count, set, clear, increment, error } = useAppBadge();
 *   
 *   if (!support.isSupported) {
 *     return <div>Badging not supported</div>;
 *   }
 *   
 *   return (
 *     <div>
 *       <p>Current badge: {count || 0}</p>
 *       <button onClick={() => set(5)}>Set to 5</button>
 *       <button onClick={increment}>Increment</button>
 *       <button onClick={clear}>Clear</button>
 *       {error && <p>Error: {error.message}</p>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useAppBadge(): UseAppBudgeReturn {
  // State management
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<BadgeError | null>(null);
  const [loading, setLoading] = useState(false);

  // Support detection
  const [support, setSupport] = useState<BadgeSupport>({
    isSupported: false,
    canSetBadge: false,
    canClearBadge: false,
  });

  // Detect badge API support on mount
  useEffect(() => {
    const detectSupport = () => {
      const hasNavigator = typeof navigator !== 'undefined';
      const canSetBadge = hasNavigator && 'setAppBadge' in navigator;
      const canClearBadge = hasNavigator && 'clearAppBadge' in navigator;
      const isSupported = canSetBadge && canClearBadge;

      setSupport({
        isSupported,
        canSetBadge,
        canClearBadge,
      });
    };

    detectSupport();
  }, []);

  /**
   * Set badge count
   */
  const set = useCallback(async (newCount: number): Promise<void> => {
    if (!support.canSetBadge) {
      const error: BadgeError = {
        type: 'UNSUPPORTED',
        message: 'Badge API not supported in this browser',
      };
      setError(error);
      return;
    }

    if (newCount < 0) {
      const error: BadgeError = {
        type: 'SET_ERROR',
        message: 'Badge count cannot be negative',
      };
      setError(error);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await navigator.setAppBadge(newCount);
      setCount(newCount);
    } catch (originalError) {
      const error: BadgeError = {
        type: 'SET_ERROR',
        message: `Failed to set badge: ${originalError instanceof Error ? originalError.message : 'Unknown error'}`,
        originalError: originalError instanceof Error ? originalError : new Error(String(originalError)),
      };
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [support.canSetBadge]);

  /**
   * Clear badge
   */
  const clear = useCallback(async (): Promise<void> => {
    if (!support.canClearBadge) {
      const error: BadgeError = {
        type: 'UNSUPPORTED',
        message: 'Badge clearing not supported in this browser',
      };
      setError(error);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await navigator.clearAppBadge();
      setCount(null);
    } catch (originalError) {
      const error: BadgeError = {
        type: 'CLEAR_ERROR',
        message: `Failed to clear badge: ${originalError instanceof Error ? originalError.message : 'Unknown error'}`,
        originalError: originalError instanceof Error ? originalError : new Error(String(originalError)),
      };
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [support.canClearBadge]);

  /**
   * Increment badge count
   */
  const increment = useCallback(async (): Promise<void> => {
    const currentCount = count || 0;
    await set(currentCount + 1);
  }, [count, set]);

  /**
   * Decrement badge count
   */
  const decrement = useCallback(async (): Promise<void> => {
    const currentCount = count || 0;
    if (currentCount <= 1) {
      await clear();
    } else {
      await set(currentCount - 1);
    }
  }, [count, set, clear]);

  /**
   * Reset local count without affecting actual badge
   */
  const resetCount = useCallback(() => {
    setCount(null);
    setError(null);
  }, []);

  return {
    support,
    count,
    error,
    loading,
    set,
    clear,
    increment,
    decrement,
    resetCount,
  };
}

/**
 * Utility functions for badge management
 */
export class BadgeUtils {
  /**
   * Check if Badging API is supported
   */
  static isSupported(): boolean {
    return typeof navigator !== 'undefined' && 
           'setAppBadge' in navigator && 
           'clearAppBadge' in navigator;
  }

  /**
   * Get browser support information
   */
  static getSupportInfo(): {
    supported: boolean;
    browser: string;
    limitations: string[];
  } {
    const supported = this.isSupported();
    let browser = 'Unknown';
    const limitations: string[] = [];

    if (typeof navigator !== 'undefined') {
      const userAgent = navigator.userAgent;

      if (userAgent.includes('Chrome')) {
        browser = 'Chrome';
        if (!supported) {
          limitations.push('Requires Chrome 81+ for Badging API support');
        }
        limitations.push('PWA must be installed to show badges');
      } else if (userAgent.includes('Edge')) {
        browser = 'Edge';
        if (!supported) {
          limitations.push('Requires Edge 81+ for Badging API support');
        }
        limitations.push('PWA must be installed to show badges');
      } else if (userAgent.includes('Firefox')) {
        browser = 'Firefox';
        limitations.push('Badging API not supported in Firefox');
      } else if (userAgent.includes('Safari')) {
        browser = 'Safari';
        limitations.push('Badging API not supported in Safari/iOS');
      }
    }

    return {
      supported,
      browser,
      limitations,
    };
  }

  /**
   * Set badge with error handling
   */
  static async setBadge(count: number): Promise<boolean> {
    if (!this.isSupported()) {
      return false;
    }

    try {
      await navigator.setAppBadge(count);
      return true;
    } catch (error) {
      console.warn('Failed to set app badge:', error);
      return false;
    }
  }

  /**
   * Clear badge with error handling
   */
  static async clearBadge(): Promise<boolean> {
    if (!this.isSupported()) {
      return false;
    }

    try {
      await navigator.clearAppBadge();
      return true;
    } catch (error) {
      console.warn('Failed to clear app badge:', error);
      return false;
    }
  }
}

/**
 * Badge API type declarations for TypeScript
 */
declare global {
  interface Navigator {
    setAppBadge(contents?: number): Promise<void>;
    clearAppBadge(): Promise<void>;
  }
}

export default useAppBadge;