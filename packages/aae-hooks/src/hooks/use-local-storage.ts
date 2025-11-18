/**
 * @fileoverview Local Storage Hook for Epic 64 - AAE Local Storage Toolkit
 * Provides useState-like functionality with automatic localStorage persistence.
 * Safely handles SSR and provides JSON serialization/deserialization.
 */

import { useState, useEffect, useCallback } from 'react';

// Local Storage types
export interface LocalStorageOptions<T> {
  /** Custom serializer function */
  serializer?: {
    serialize: (value: T) => string;
    deserialize: (value: string) => T;
  };
  /** Enable debug logging */
  debug?: boolean;
  /** Callback when storage operations fail */
  onError?: (error: LocalStorageError) => void;
  /** Callback when value changes */
  onChange?: (key: string, newValue: T, oldValue: T) => void;
  /** Whether to sync across tabs/windows */
  syncAcrossTabs?: boolean;
}

export interface LocalStorageError {
  type:
    | 'storage_not_available'
    | 'quota_exceeded'
    | 'parse_error'
    | 'serialize_error'
    | 'unknown_error';
  message: string;
  key: string;
  originalError?: Error;
}

export interface UseLocalStorageReturn<T> {
  // State
  value: T;

  // Actions
  setValue: (value: T | ((prevValue: T) => T)) => void;

  // Utilities
  remove: () => void;
  clear: () => void;
  getStorageValue: () => T;
  isSupported: boolean;
  error: LocalStorageError | null;
  clearError: () => void;
}

// Check if localStorage is available
const isLocalStorageAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const testKey = '__localStorage_test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

// Default JSON serializer
const defaultSerializer = {
  serialize: JSON.stringify,
  deserialize: JSON.parse,
};

/**
 * Local Storage Hook
 * Provides useState-like functionality with automatic localStorage persistence
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: LocalStorageOptions<T> = {}
): UseLocalStorageReturn<T> {
  const {
    serializer = defaultSerializer,
    debug = false,
    onError,
    onChange,
    syncAcrossTabs = false,
  } = options;

  // Check if localStorage is supported
  const isSupported = isLocalStorageAvailable();

  // State
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [error, setError] = useState<LocalStorageError | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Error handling
  const handleError = useCallback(
    (
      type: LocalStorageError['type'],
      message: string,
      originalError?: Error
    ) => {
      const storageError: LocalStorageError = {
        type,
        message,
        key,
        originalError,
      };
      setError(storageError);
      onError?.(storageError);

      if (debug) {
        console.error('LocalStorage Error:', storageError);
      }
    },
    [key, onError, debug]
  );

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Get value from localStorage
  const getStorageValue = useCallback((): T => {
    if (!isSupported) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      if (item === null) {
        return initialValue;
      }

      const deserializedValue = serializer.deserialize(item);

      if (debug) {
        console.log(`LocalStorage get "${key}":`, deserializedValue);
      }

      return deserializedValue;
    } catch (error) {
      handleError(
        'parse_error',
        `Failed to parse stored value for key "${key}"`,
        error as Error
      );
      return initialValue;
    }
  }, [key, initialValue, serializer, isSupported, debug, handleError]);

  // Set value in localStorage
  const setStorageValue = useCallback(
    (value: T) => {
      if (!isSupported) {
        if (debug) {
          console.warn('LocalStorage not available, value not persisted');
        }
        return;
      }

      try {
        const serializedValue = serializer.serialize(value);
        window.localStorage.setItem(key, serializedValue);

        if (debug) {
          console.log(`LocalStorage set "${key}":`, value);
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'QuotaExceededError') {
          handleError('quota_exceeded', 'localStorage quota exceeded', error);
        } else {
          handleError(
            'serialize_error',
            `Failed to serialize value for key "${key}"`,
            error as Error
          );
        }
      }
    },
    [key, serializer, isSupported, debug, handleError]
  );

  // Remove value from localStorage
  const remove = useCallback(() => {
    if (!isSupported) {
      return;
    }

    try {
      window.localStorage.removeItem(key);
      const oldValue = storedValue;
      setStoredValue(initialValue);

      onChange?.(key, initialValue, oldValue);

      if (debug) {
        console.log(`LocalStorage removed "${key}"`);
      }
    } catch (error) {
      handleError(
        'unknown_error',
        `Failed to remove key "${key}"`,
        error as Error
      );
    }
  }, [
    key,
    initialValue,
    storedValue,
    isSupported,
    debug,
    handleError,
    onChange,
  ]);

  // Clear all localStorage
  const clear = useCallback(() => {
    if (!isSupported) {
      return;
    }

    try {
      window.localStorage.clear();
      const oldValue = storedValue;
      setStoredValue(initialValue);

      onChange?.(key, initialValue, oldValue);

      if (debug) {
        console.log('LocalStorage cleared');
      }
    } catch (error) {
      handleError(
        'unknown_error',
        'Failed to clear localStorage',
        error as Error
      );
    }
  }, [
    initialValue,
    storedValue,
    key,
    isSupported,
    debug,
    handleError,
    onChange,
  ]);

  // Set value with support for functional updates
  const setValue = useCallback(
    (value: T | ((prevValue: T) => T)) => {
      try {
        clearError();

        const oldValue = storedValue;
        const newValue = value instanceof Function ? value(storedValue) : value;

        setStoredValue(newValue);
        setStorageValue(newValue);

        onChange?.(key, newValue, oldValue);
      } catch (error) {
        handleError(
          'unknown_error',
          `Failed to set value for key "${key}"`,
          error as Error
        );
      }
    },
    [storedValue, key, setStorageValue, clearError, handleError, onChange]
  );

  // Initialize from localStorage on mount
  useEffect(() => {
    if (!isSupported) {
      setIsInitialized(true);
      return;
    }

    try {
      const value = getStorageValue();
      setStoredValue(value);
      setIsInitialized(true);

      if (debug) {
        console.log(`LocalStorage initialized "${key}" with:`, value);
      }
    } catch (error) {
      handleError(
        'unknown_error',
        `Failed to initialize from localStorage for key "${key}"`,
        error as Error
      );
      setIsInitialized(true);
    }
  }, [key, getStorageValue, isSupported, debug, handleError]);

  // Sync across tabs/windows
  useEffect(() => {
    if (!isSupported || !syncAcrossTabs || !isInitialized) {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = serializer.deserialize(e.newValue);
          const oldValue = storedValue;
          setStoredValue(newValue);

          onChange?.(key, newValue, oldValue);

          if (debug) {
            console.log(
              `LocalStorage synced "${key}" from another tab:`,
              newValue
            );
          }
        } catch (error) {
          handleError(
            'parse_error',
            `Failed to sync value from another tab for key "${key}"`,
            error as Error
          );
        }
      } else if (e.key === key && e.newValue === null) {
        // Key was removed in another tab
        const oldValue = storedValue;
        setStoredValue(initialValue);
        onChange?.(key, initialValue, oldValue);

        if (debug) {
          console.log(`LocalStorage key "${key}" removed in another tab`);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [
    key,
    serializer,
    storedValue,
    initialValue,
    isSupported,
    syncAcrossTabs,
    isInitialized,
    debug,
    handleError,
    onChange,
  ]);

  return {
    // State
    value: storedValue,

    // Actions
    setValue,

    // Utilities
    remove,
    clear,
    getStorageValue,
    isSupported,
    error,
    clearError,
  };
}

// Utility functions
export const LocalStorageUtils = {
  isSupported: isLocalStorageAvailable,

  /**
   * Get storage info
   */
  getStorageInfo: () => {
    if (!isLocalStorageAvailable()) {
      return { used: 0, available: 0, total: 0, usage: 0 };
    }

    let used = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length;
      }
    }

    // Estimate total storage (typically 5-10MB)
    const total = 5 * 1024 * 1024; // 5MB estimate
    const available = total - used;
    const usage = (used / total) * 100;

    return { used, available, total, usage };
  },

  /**
   * Get all localStorage keys
   */
  getAllKeys: (): string[] => {
    if (!isLocalStorageAvailable()) {
      return [];
    }

    return Object.keys(localStorage);
  },

  /**
   * Get storage size for specific key
   */
  getKeySize: (key: string): number => {
    if (!isLocalStorageAvailable()) {
      return 0;
    }

    const value = localStorage.getItem(key);
    return value ? value.length + key.length : 0;
  },

  /**
   * Check if key exists in localStorage
   */
  hasKey: (key: string): boolean => {
    if (!isLocalStorageAvailable()) {
      return false;
    }

    return localStorage.getItem(key) !== null;
  },

  /**
   * Safe get item with fallback
   */
  getItem: <T>(key: string, fallback: T): T => {
    if (!isLocalStorageAvailable()) {
      return fallback;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },

  /**
   * Safe set item
   */
  setItem: <T>(key: string, value: T): boolean => {
    if (!isLocalStorageAvailable()) {
      return false;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Batch operations
   */
  batchSet: <T>(
    items: Record<string, T>
  ): { success: string[]; failed: string[] } => {
    const success: string[] = [];
    const failed: string[] = [];

    Object.entries(items).forEach(([key, value]) => {
      if (LocalStorageUtils.setItem(key, value)) {
        success.push(key);
      } else {
        failed.push(key);
      }
    });

    return { success, failed };
  },

  /**
   * Batch get operations
   */
  batchGet: <T>(keys: string[], fallback: T): Record<string, T> => {
    const result: Record<string, T> = {};

    keys.forEach(key => {
      result[key] = LocalStorageUtils.getItem(key, fallback);
    });

    return result;
  },

  /**
   * Clear keys by prefix
   */
  clearByPrefix: (prefix: string): string[] => {
    if (!isLocalStorageAvailable()) {
      return [];
    }

    const keysToRemove = Object.keys(localStorage).filter(key =>
      key.startsWith(prefix)
    );

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });

    return keysToRemove;
  },

  /**
   * Export localStorage data
   */
  exportData: (): Record<string, string> => {
    if (!isLocalStorageAvailable()) {
      return {};
    }

    const data: Record<string, string> = {};

    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        data[key] = localStorage[key];
      }
    }

    return data;
  },

  /**
   * Import localStorage data
   */
  importData: (
    data: Record<string, string>
  ): { success: number; failed: number } => {
    if (!isLocalStorageAvailable()) {
      return { success: 0, failed: Object.keys(data).length };
    }

    let success = 0;
    let failed = 0;

    Object.entries(data).forEach(([key, value]) => {
      try {
        localStorage.setItem(key, value);
        success++;
      } catch {
        failed++;
      }
    });

    return { success, failed };
  },

  /**
   * Create custom serializer for complex types
   */
  createCustomSerializer: <T>(
    serialize: (value: T) => string,
    deserialize: (value: string) => T
  ) => ({
    serialize,
    deserialize,
  }),

  /**
   * Date-aware serializer
   */
  dateSerializer: {
    serialize: (value: any) => {
      return JSON.stringify(value, (key, val) => {
        if (val instanceof Date) {
          return { __type: 'Date', value: val.toISOString() };
        }
        return val;
      });
    },
    deserialize: (value: string) => {
      return JSON.parse(value, (key, val) => {
        if (val && typeof val === 'object' && val.__type === 'Date') {
          return new Date(val.value);
        }
        return val;
      });
    },
  },

  /**
   * Get browser support information
   */
  getBrowserSupport: () => ({
    chrome: 'Full support since Chrome 4',
    firefox: 'Full support since Firefox 3.5',
    safari: 'Full support since Safari 4',
    edge: 'Full support since Edge 12',
    mobile: 'Widely supported across mobile browsers',
    storage: 'Typically 5-10MB per origin',
  }),

  /**
   * Get usage best practices
   */
  getBestPractices: () => [
    'Always check for browser support before using',
    'Handle quota exceeded errors gracefully',
    'Use compression for large objects',
    'Implement cache expiration for time-sensitive data',
    'Avoid storing sensitive information in localStorage',
    'Consider using IndexedDB for large amounts of data',
    'Implement proper error handling and fallbacks',
  ],
};

export default useLocalStorage;
