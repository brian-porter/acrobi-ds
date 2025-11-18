/**
 * @fileoverview Background fetch hook for Epic 69
 * Provides a React hook for initiating background fetch operations for large downloads
 */

import { useState, useEffect, useCallback } from 'react';

// Background fetch state interface
export interface BackgroundFetchState {
  isSupported: boolean;
  registration: ServiceWorkerRegistration | null;
  error: string | null;
  isFetching: boolean;
  activeFetches: Map<string, BackgroundFetchRegistration>;
}

// Background fetch request options
export interface BackgroundFetchRequest {
  url: string;
  options?: RequestInit;
}

// Options for the background fetch hook
export interface UseBackgroundFetchOptions {
  autoRegisterSW?: boolean;
  swUrl?: string;
  onFetchComplete?: (tag: string, successful: number, failed: number) => void;
  onFetchSuccess?: (tag: string, id: string) => void;
  onFetchFail?: (tag: string, id: string) => void;
  onFetchAbort?: (tag: string, id: string) => void;
}

// Background fetch options
export interface BackgroundFetchOptions {
  icons?: { src: string; sizes?: string; type?: string }[];
  title?: string;
  totalBytes?: number;
  downloadTotal?: number;
}

// Return type for the hook
export interface UseBackgroundFetchReturn extends BackgroundFetchState {
  fetch: (
    id: string,
    requests: BackgroundFetchRequest[],
    options?: BackgroundFetchOptions
  ) => Promise<boolean>;
  abort: (id: string) => Promise<boolean>;
  getActive: () => string[];
  clearError: () => void;
  getRegistration: (id: string) => BackgroundFetchRegistration | null;
}

/**
 * Background fetch registration interface
 */
export interface BackgroundFetchRegistration {
  id: string;
  uploadTotal: number;
  uploaded: number;
  downloadTotal: number;
  downloaded: number;
  result: '' | 'success' | 'failure';
  failureReason:
    | ''
    | 'aborted'
    | 'bad-status'
    | 'fetch-error'
    | 'quota-exceeded'
    | 'total-download-exceeded';
  recordsAvailable: boolean;
  matchAll(): Promise<BackgroundFetchRecord[]>;
  match(request: RequestInfo): Promise<BackgroundFetchRecord | undefined>;
  abort(): Promise<boolean>;
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}

/**
 * Background fetch record interface
 */
export interface BackgroundFetchRecord {
  request: Request;
  response?: Response;
  responseReady: Promise<Response>;
}

/**
 * Hook for managing background fetch functionality
 */
export function useBackgroundFetch(
  options: UseBackgroundFetchOptions = {}
): UseBackgroundFetchReturn {
  const {
    autoRegisterSW = true,
    swUrl = '/sw.js',
    onFetchComplete,
    onFetchSuccess,
    onFetchFail,
    onFetchAbort,
  } = options;

  const [state, setState] = useState<BackgroundFetchState>({
    isSupported: false,
    registration: null,
    error: null,
    isFetching: false,
    activeFetches: new Map(),
  });

  // Check if background fetch is supported
  const checkSupport = useCallback(() => {
    const isSupported =
      'serviceWorker' in navigator && 'BackgroundFetch' in window;

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

  // Initiate a background fetch
  const fetch = useCallback(
    async (
      id: string,
      requests: BackgroundFetchRequest[],
      options: BackgroundFetchOptions = {}
    ): Promise<boolean> => {
      if (!state.isSupported) {
        setState(prev => ({
          ...prev,
          error: 'Background fetch is not supported',
        }));
        return false;
      }

      if (!requests || requests.length === 0) {
        setState(prev => ({
          ...prev,
          error: 'No requests provided for background fetch',
        }));
        return false;
      }

      setState(prev => ({ ...prev, isFetching: true, error: null }));

      try {
        const registration = await getRegistration();

        if (!registration) {
          throw new Error('Service worker registration not available');
        }

        // Check if background fetch manager is available
        if (!registration.backgroundFetch) {
          throw new Error(
            'BackgroundFetch API not available in service worker registration'
          );
        }

        // Prepare requests for background fetch
        const fetchRequests = requests.map(
          req => new Request(req.url, req.options)
        );

        // Calculate total download size if not provided
        const totalBytes = options.totalBytes || requests.length * 1024 * 1024; // Default 1MB per request

        // Start background fetch
        const bgFetchRegistration = await registration.backgroundFetch.fetch(
          id,
          fetchRequests,
          {
            icons: options.icons || [
              { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            ],
            title: options.title || 'Downloading files...',
            totalBytes,
            downloadTotal: options.downloadTotal || totalBytes,
          }
        );

        // Store the background fetch registration
        setState(prev => ({
          ...prev,
          isFetching: false,
          activeFetches: new Map(prev.activeFetches).set(
            id,
            bgFetchRegistration as any
          ),
        }));

        console.log(`Background fetch started with ID: ${id}`);
        return true;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : `Failed to start background fetch: ${id}`;
        setState(prev => ({
          ...prev,
          isFetching: false,
          error: errorMessage,
        }));

        return false;
      }
    },
    [state.isSupported, getRegistration]
  );

  // Abort a background fetch
  const abort = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const bgFetchReg = state.activeFetches.get(id);

        if (!bgFetchReg) {
          setState(prev => ({
            ...prev,
            error: `No active background fetch found with ID: ${id}`,
          }));
          return false;
        }

        const success = await bgFetchReg.abort();

        if (success) {
          setState(prev => {
            const newFetches = new Map(prev.activeFetches);
            newFetches.delete(id);
            return { ...prev, activeFetches: newFetches };
          });

          console.log(`Background fetch aborted: ${id}`);
        }

        return success;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : `Failed to abort background fetch: ${id}`;
        setState(prev => ({ ...prev, error: errorMessage }));
        return false;
      }
    },
    [state.activeFetches]
  );

  // Get active background fetch IDs
  const getActive = useCallback((): string[] => {
    return Array.from(state.activeFetches.keys());
  }, [state.activeFetches]);

  // Get background fetch registration by ID
  const getBackgroundFetchRegistration = useCallback(
    (id: string): BackgroundFetchRegistration | null => {
      return state.activeFetches.get(id) || null;
    },
    [state.activeFetches]
  );

  // Clear error state
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Setup effect for initialization and service worker message handling
  useEffect(() => {
    checkSupport();

    if (state.isSupported) {
      // Listen for service worker messages about background fetch events
      const handleMessage = (event: MessageEvent) => {
        const { data } = event;

        switch (data?.type) {
          case 'BACKGROUND_FETCH_COMPLETE':
            onFetchComplete?.(data.tag, data.successful, data.failed);
            // Remove from active fetches on completion
            setState(prev => {
              const newFetches = new Map(prev.activeFetches);
              newFetches.delete(data.tag);
              return { ...prev, activeFetches: newFetches };
            });
            break;

          case 'BACKGROUND_FETCH_SUCCESS':
            onFetchSuccess?.(data.tag, data.id);
            break;

          case 'BACKGROUND_FETCH_FAIL':
            onFetchFail?.(data.tag, data.id);
            break;

          case 'BACKGROUND_FETCH_ABORT':
            onFetchAbort?.(data.tag, data.id);
            break;
        }
      };

      navigator.serviceWorker.addEventListener('message', handleMessage);

      return () => {
        navigator.serviceWorker.removeEventListener('message', handleMessage);
      };
    }
  }, [
    state.isSupported,
    onFetchComplete,
    onFetchSuccess,
    onFetchFail,
    onFetchAbort,
    checkSupport,
  ]);

  return {
    ...state,
    fetch,
    abort,
    getActive,
    clearError,
    getRegistration: getBackgroundFetchRegistration,
  };
}

/**
 * Background fetch utility class for common operations
 */
export class BackgroundFetchUtils {
  /**
   * Create a background fetch request for file downloads
   */
  static createFileDownloadRequests(urls: string[]): BackgroundFetchRequest[] {
    return urls.map(url => ({
      url,
      options: {
        method: 'GET',
        headers: {
          Accept: '*/*',
        },
      },
    }));
  }

  /**
   * Create a background fetch request for API data
   */
  static createApiRequests(
    endpoints: {
      url: string;
      method?: string;
      body?: any;
      headers?: Record<string, string>;
    }[]
  ): BackgroundFetchRequest[] {
    return endpoints.map(endpoint => ({
      url: endpoint.url,
      options: {
        method: endpoint.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...endpoint.headers,
        },
        body: endpoint.body ? JSON.stringify(endpoint.body) : undefined,
      },
    }));
  }

  /**
   * Estimate download size for requests
   */
  static estimateDownloadSize(
    requests: BackgroundFetchRequest[],
    avgSizePerRequest = 1024 * 1024
  ): number {
    return requests.length * avgSizePerRequest; // Default 1MB per request
  }

  /**
   * Create background fetch options with sensible defaults
   */
  static createOptions(
    title: string,
    totalBytes?: number,
    icons?: { src: string; sizes?: string; type?: string }[]
  ): BackgroundFetchOptions {
    return {
      title,
      totalBytes,
      icons: icons || [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    };
  }

  /**
   * Check if a URL is suitable for background fetch
   */
  static isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }

  /**
   * Validate background fetch requests
   */
  static validateRequests(requests: BackgroundFetchRequest[]): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!requests || requests.length === 0) {
      errors.push('No requests provided');
    } else {
      requests.forEach((request, index) => {
        if (!this.isValidUrl(request.url)) {
          errors.push(`Invalid URL at index ${index}: ${request.url}`);
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
