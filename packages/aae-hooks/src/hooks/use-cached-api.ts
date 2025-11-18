/**
 * @fileoverview Cached API Hook for Epic 64 - AAE Local Storage Toolkit
 * Provides stale-while-revalidate API caching using localStorage.
 * Enables offline-first data loading with background refresh.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocalStorage } from './use-local-storage';

// Cached API types
export interface CachedApiOptions<T> {
  /** Cache expiration time in milliseconds */
  cacheTime?: number;
  /** Enable stale-while-revalidate pattern */
  staleWhileRevalidate?: boolean;
  /** Enable debug logging */
  debug?: boolean;
  /** Enable automatic background refresh */
  backgroundRefresh?: boolean;
  /** Background refresh interval in milliseconds */
  refreshInterval?: number;
  /** Transform response data before caching */
  transform?: (data: any) => T;
  /** Validate cached data before using */
  validate?: (data: T) => boolean;
  /** Callback when data is fetched */
  onSuccess?: (data: T, fromCache: boolean) => void;
  /** Callback when fetch fails */
  onError?: (error: CachedApiError) => void;
  /** Custom headers for fetch requests */
  headers?: Record<string, string>;
  /** Request timeout in milliseconds */
  timeout?: number;
}

export interface CachedApiState<T> {
  data: T | null;
  isLoading: boolean;
  isValidating: boolean;
  isStale: boolean;
  error: CachedApiError | null;
  lastFetch: number | null;
  source: 'cache' | 'network' | null;
}

export interface CachedApiError {
  type:
    | 'network_error'
    | 'timeout_error'
    | 'parse_error'
    | 'validation_error'
    | 'transform_error'
    | 'unknown_error';
  message: string;
  status?: number;
  originalError?: Error;
}

export interface CachedData<T> {
  data: T;
  timestamp: number;
  etag?: string;
  expires?: number;
}

export interface UseCachedApiReturn<T> {
  // State
  state: CachedApiState<T>;

  // Actions
  refetch: () => Promise<T | null>;
  mutate: (data: T | null) => void;
  invalidate: () => void;

  // Utilities
  clearCache: () => void;
  getCacheInfo: () => { size: number; age: number; isExpired: boolean };
  isSupported: boolean;
}

// Create cache key with hash for long URLs
const createCacheKey = (baseKey: string, fetcherFunction: Function): string => {
  const functionString = fetcherFunction.toString();
  const hash = functionString.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  return `cached_api_${baseKey}_${Math.abs(hash)}`;
};

// Default fetcher timeout wrapper
const withTimeout = (
  promise: Promise<any>,
  timeoutMs: number
): Promise<any> => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`Request timeout after ${timeoutMs}ms`)),
        timeoutMs
      )
    ),
  ]);
};

/**
 * Cached API Hook
 * Implements stale-while-revalidate pattern with localStorage caching
 */
export function useCachedApi<T>(
  cacheKey: string,
  fetcherFunction: (...args: any[]) => Promise<T>,
  options: CachedApiOptions<T> = {}
): UseCachedApiReturn<T> {
  const {
    cacheTime = 5 * 60 * 1000, // 5 minutes default
    staleWhileRevalidate = true,
    debug = false,
    backgroundRefresh = false,
    refreshInterval = 30 * 60 * 1000, // 30 minutes default
    transform,
    validate,
    onSuccess,
    onError,
    headers = {},
    timeout = 10000, // 10 seconds default
  } = options;

  // Generate cache key based on function signature
  const finalCacheKey = createCacheKey(cacheKey, fetcherFunction);

  // Local storage for caching
  const {
    value: cachedData,
    setValue: setCachedData,
    remove: removeCachedData,
    isSupported,
  } = useLocalStorage<CachedData<T> | null>(finalCacheKey, null, {
    debug: debug && false, // Reduce noise
    syncAcrossTabs: true,
  });

  // Component state
  const [state, setState] = useState<CachedApiState<T>>({
    data: null,
    isLoading: false,
    isValidating: false,
    isStale: false,
    error: null,
    lastFetch: null,
    source: null,
  });

  // Refs for cleanup and control
  const abortControllerRef = useRef<AbortController | null>(null);
  const refreshIntervalRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  // Error handling
  const handleError = useCallback(
    (
      type: CachedApiError['type'],
      message: string,
      status?: number,
      originalError?: Error
    ) => {
      const apiError: CachedApiError = { type, message, status, originalError };

      if (isMountedRef.current) {
        setState(prev => ({
          ...prev,
          error: apiError,
          isLoading: false,
          isValidating: false,
        }));
      }

      onError?.(apiError);

      if (debug) {
        console.error('CachedAPI Error:', apiError);
      }
    },
    [onError, debug]
  );

  // Check if cached data is still valid
  const isCacheValid = useCallback(
    (cached: CachedData<T> | null): boolean => {
      if (!cached) return false;

      const now = Date.now();
      const age = now - cached.timestamp;

      // Check expiration
      if (cached.expires && now > cached.expires) {
        return false;
      }

      // Check cache time
      if (age > cacheTime) {
        return false;
      }

      // Custom validation
      if (validate && !validate(cached.data)) {
        return false;
      }

      return true;
    },
    [cacheTime, validate]
  );

  // Fetch data from network
  const fetchData = useCallback(
    async (isBackground = false): Promise<T | null> => {
      if (!isMountedRef.current) return null;

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      try {
        if (!isBackground) {
          setState(prev => ({
            ...prev,
            isLoading: !prev.data, // Don't show loading if we have cached data
            isValidating: true,
            error: null,
          }));
        }

        if (debug) {
          console.log(
            `CachedAPI fetching "${cacheKey}"${isBackground ? ' (background)' : ''}`
          );
        }

        // Add timeout wrapper if specified
        const fetchPromise =
          timeout > 0
            ? withTimeout(fetcherFunction(), timeout)
            : fetcherFunction();

        const response = await fetchPromise;

        // Transform data if transformer provided
        const transformedData = transform ? transform(response) : response;

        // Validate transformed data
        if (validate && !validate(transformedData)) {
          throw new Error('Data validation failed');
        }

        const now = Date.now();

        // Cache the response
        const cacheData: CachedData<T> = {
          data: transformedData,
          timestamp: now,
          expires: now + cacheTime,
        };

        setCachedData(cacheData);

        if (isMountedRef.current) {
          setState(prev => ({
            ...prev,
            data: transformedData,
            isLoading: false,
            isValidating: false,
            isStale: false,
            error: null,
            lastFetch: now,
            source: 'network',
          }));
        }

        onSuccess?.(transformedData, false);

        if (debug) {
          console.log(`CachedAPI fetched "${cacheKey}":`, transformedData);
        }

        return transformedData;
      } catch (error: any) {
        if (error.name === 'AbortError') {
          if (debug) {
            console.log(`CachedAPI fetch aborted for "${cacheKey}"`);
          }
          return null;
        }

        let errorType: CachedApiError['type'] = 'unknown_error';
        let status: number | undefined;

        if (error.message.includes('timeout')) {
          errorType = 'timeout_error';
        } else if (error.message.includes('Network')) {
          errorType = 'network_error';
        } else if (error.message.includes('validation')) {
          errorType = 'validation_error';
        } else if (transform && error.message.includes('transform')) {
          errorType = 'transform_error';
        }

        // Extract status code if available
        if (error.response?.status) {
          status = error.response.status;
        }

        handleError(errorType, error.message, status, error);
        return null;
      }
    },
    [
      cacheKey,
      fetcherFunction,
      timeout,
      transform,
      validate,
      cacheTime,
      setCachedData,
      onSuccess,
      debug,
      handleError,
    ]
  );

  // Manually refetch data
  const refetch = useCallback(async (): Promise<T | null> => {
    return fetchData(false);
  }, [fetchData]);

  // Mutate cached data
  const mutate = useCallback(
    (data: T | null) => {
      if (data === null) {
        removeCachedData();
        setState(prev => ({
          ...prev,
          data: null,
          isStale: false,
          source: null,
        }));
      } else {
        const now = Date.now();
        const cacheData: CachedData<T> = {
          data,
          timestamp: now,
          expires: now + cacheTime,
        };

        setCachedData(cacheData);
        setState(prev => ({
          ...prev,
          data,
          isStale: false,
          lastFetch: now,
          source: 'network',
        }));
      }
    },
    [removeCachedData, setCachedData, cacheTime]
  );

  // Invalidate cache and refetch
  const invalidate = useCallback(() => {
    removeCachedData();
    setState(prev => ({ ...prev, isStale: true }));
    fetchData(false);
  }, [removeCachedData, fetchData]);

  // Clear cache completely
  const clearCache = useCallback(() => {
    removeCachedData();
    setState(prev => ({
      ...prev,
      data: null,
      isStale: false,
      lastFetch: null,
      source: null,
    }));
  }, [removeCachedData]);

  // Get cache information
  const getCacheInfo = useCallback(() => {
    const cached = cachedData;
    if (!cached) {
      return { size: 0, age: 0, isExpired: true };
    }

    const now = Date.now();
    const age = now - cached.timestamp;
    const size = JSON.stringify(cached).length;
    const isExpired = cached.expires ? now > cached.expires : age > cacheTime;

    return { size, age, isExpired };
  }, [cachedData, cacheTime]);

  // Initialize with cached data if available
  useEffect(() => {
    if (!isSupported) return;

    const initializeFromCache = async () => {
      if (cachedData && isCacheValid(cachedData)) {
        // Use cached data
        setState(prev => ({
          ...prev,
          data: cachedData.data,
          lastFetch: cachedData.timestamp,
          source: 'cache',
          isStale: false,
        }));

        onSuccess?.(cachedData.data, true);

        if (debug) {
          console.log(
            `CachedAPI loaded from cache "${cacheKey}":`,
            cachedData.data
          );
        }

        // Fetch fresh data in background if stale-while-revalidate is enabled
        if (staleWhileRevalidate) {
          fetchData(true);
        }
      } else {
        // No valid cache, fetch immediately
        fetchData(false);
      }
    };

    initializeFromCache();
  }, [cacheKey]); // Only re-run when cache key changes

  // Background refresh
  useEffect(() => {
    if (!backgroundRefresh || refreshInterval <= 0) return;

    const startBackgroundRefresh = () => {
      refreshIntervalRef.current = window.setInterval(() => {
        if (state.data && !state.isValidating) {
          fetchData(true);
        }
      }, refreshInterval);
    };

    startBackgroundRefresh();

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [
    backgroundRefresh,
    refreshInterval,
    state.data,
    state.isValidating,
    fetchData,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  return {
    // State
    state,

    // Actions
    refetch,
    mutate,
    invalidate,

    // Utilities
    clearCache,
    getCacheInfo,
    isSupported,
  };
}

// Utility functions
export const CachedApiUtils = {
  /**
   * Create a simple fetcher function
   */
  createFetcher: (url: string, options: RequestInit = {}) => {
    return async () => {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    };
  },

  /**
   * Create a REST API fetcher
   */
  createRestFetcher: (
    baseUrl: string,
    defaultHeaders: Record<string, string> = {}
  ) => {
    return {
      get: (endpoint: string, headers = {}) =>
        CachedApiUtils.createFetcher(`${baseUrl}${endpoint}`, {
          method: 'GET',
          headers: { ...defaultHeaders, ...headers },
        }),
      post: (endpoint: string, data?: any, headers = {}) =>
        CachedApiUtils.createFetcher(`${baseUrl}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...defaultHeaders,
            ...headers,
          },
          body: data ? JSON.stringify(data) : undefined,
        }),
    };
  },

  /**
   * Create GraphQL fetcher
   */
  createGraphQLFetcher: (
    endpoint: string,
    defaultHeaders: Record<string, string> = {}
  ) => {
    return (query: string, variables?: Record<string, any>) => async () => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...defaultHeaders,
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data;
    };
  },

  /**
   * Cache invalidation helpers
   */
  invalidatePattern: (pattern: string) => {
    if (typeof window === 'undefined') return;

    const keys = Object.keys(localStorage).filter(
      key => key.includes('cached_api_') && key.includes(pattern)
    );

    keys.forEach(key => localStorage.removeItem(key));
    return keys.length;
  },

  /**
   * Cache statistics
   */
  getCacheStats: () => {
    if (typeof window === 'undefined') return { keys: 0, size: 0 };

    const cacheKeys = Object.keys(localStorage).filter(key =>
      key.startsWith('cached_api_')
    );

    const totalSize = cacheKeys.reduce((sum, key) => {
      return sum + (localStorage[key]?.length || 0);
    }, 0);

    return {
      keys: cacheKeys.length,
      size: totalSize,
      averageSize:
        cacheKeys.length > 0 ? Math.round(totalSize / cacheKeys.length) : 0,
    };
  },

  /**
   * Preload cache entries
   */
  preloadCache: async <T>(
    entries: Array<{
      key: string;
      fetcher: () => Promise<T>;
      options?: CachedApiOptions<T>;
    }>
  ) => {
    const results = await Promise.allSettled(
      entries.map(async ({ key, fetcher, options = {} }) => {
        try {
          const data = await fetcher();
          const cacheKey = createCacheKey(key, fetcher);
          const cacheData: CachedData<T> = {
            data,
            timestamp: Date.now(),
            expires: Date.now() + (options.cacheTime || 5 * 60 * 1000),
          };

          localStorage.setItem(cacheKey, JSON.stringify(cacheData));
          return { key, success: true };
        } catch (error) {
          return { key, success: false, error };
        }
      })
    );

    return results.map((result, index) => ({
      key: entries[index].key,
      success: result.status === 'fulfilled',
      error: result.status === 'rejected' ? result.reason : null,
    }));
  },

  /**
   * Get usage best practices
   */
  getBestPractices: () => [
    'Use appropriate cache times for your data freshness needs',
    'Enable stale-while-revalidate for better perceived performance',
    'Implement proper error handling and fallbacks',
    'Use cache invalidation for data that changes frequently',
    'Monitor cache storage usage to avoid quota issues',
    'Validate cached data before using in critical applications',
    'Consider using background refresh for frequently accessed data',
  ],
};

export default useCachedApi;
