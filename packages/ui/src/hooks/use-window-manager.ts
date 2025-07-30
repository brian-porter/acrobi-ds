/**
 * @fileoverview Window Management Hook for Epic 73
 * AAE window management using the Window Management API
 * Provides multi-window functionality with automatic state management
 */

import { useState, useCallback, useEffect, useRef } from 'react';

// Window management types
export interface PwaWindow {
  /** Window ID (unique identifier) */
  id: string;
  /** Window reference */
  window: Window | null;
  /** Window name */
  name: string;
  /** Window URL */
  url: string;
  /** Window features used when opening */
  features?: string;
  /** Whether the window is currently closed */
  closed: boolean;
  /** When the window was opened */
  openedAt: number;
  /** When the window was last updated */
  lastUpdated: number;
}

export interface WindowManagerState {
  /** Whether Window Management API is supported */
  isSupported: boolean;
  /** List of managed windows */
  windows: PwaWindow[];
  /** Error state */
  error: string | null;
  /** Loading state */
  isLoading: boolean;
  /** Whether actively polling for window updates */
  isPolling: boolean;
}

export interface WindowOpenOptions {
  /** Window name */
  name?: string;
  /** Window features string */
  features?: string;
  /** Whether to focus the window after opening */
  focus?: boolean;
  /** Custom window ID (auto-generated if not provided) */
  customId?: string;
}

export interface WindowManagerOptions {
  /** Polling interval in milliseconds */
  pollInterval?: number;
  /** Whether to automatically start polling */
  autoStartPolling?: boolean;
  /** Maximum number of windows to track */
  maxWindows?: number;
  /** Callbacks */
  onWindowOpened?: (window: PwaWindow) => void;
  onWindowClosed?: (windowId: string) => void;
  onWindowUpdated?: (window: PwaWindow) => void;
  onError?: (error: string) => void;
}

export interface UseWindowManagerReturn extends WindowManagerState {
  /** Open a new window */
  openWindow: (
    url: string,
    options?: WindowOpenOptions
  ) => Promise<string | null>;
  /** Close a specific window */
  closeWindow: (windowId: string) => boolean;
  /** Close all windows */
  closeAllWindows: () => number;
  /** Focus a specific window */
  focusWindow: (windowId: string) => boolean;
  /** Get a specific window by ID */
  getWindow: (windowId: string) => PwaWindow | null;
  /** Refresh window states */
  refreshWindows: () => void;
  /** Start polling for window updates */
  startPolling: () => void;
  /** Stop polling for window updates */
  stopPolling: () => void;
  /** Clear error state */
  clearError: () => void;
  /** Get window count by status */
  getWindowCount: () => { total: number; open: number; closed: number };
}

/**
 * Hook for AAE window management
 */
export function useWindowManager(
  options: WindowManagerOptions = {}
): UseWindowManagerReturn {
  const {
    pollInterval = 1000,
    autoStartPolling = true,
    maxWindows = 50,
    onWindowOpened,
    onWindowClosed,
    onWindowUpdated,
    onError,
  } = options;

  const [state, setState] = useState<WindowManagerState>({
    isSupported: typeof window !== 'undefined' && 'getScreenDetails' in window,
    windows: [],
    error: null,
    isLoading: false,
    isPolling: false,
  });

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const windowCounterRef = useRef(0);

  // Generate unique window ID
  const generateWindowId = useCallback((customId?: string): string => {
    if (customId) return customId;
    windowCounterRef.current += 1;
    return `aae-window-${Date.now()}-${windowCounterRef.current}`;
  }, []);

  // Refresh window states
  const refreshWindows = useCallback(() => {
    setState(prev => {
      const updatedWindows = prev.windows.map(aaeWindow => {
        const now = Date.now();
        const wasClosed = aaeWindow.closed;
        const isClosed = !aaeWindow.window || aaeWindow.window.closed;

        // Check if window status changed
        if (!wasClosed && isClosed) {
          onWindowClosed?.(aaeWindow.id);
        }

        return {
          ...aaeWindow,
          closed: isClosed,
          lastUpdated: now,
        };
      });

      return {
        ...prev,
        windows: updatedWindows,
      };
    });
  }, [onWindowClosed]);

  // Start polling for window updates
  const startPolling = useCallback(() => {
    if (pollIntervalRef.current) return;

    setState(prev => ({ ...prev, isPolling: true }));

    pollIntervalRef.current = setInterval(() => {
      refreshWindows();
    }, pollInterval);
  }, [pollInterval, refreshWindows]);

  // Stop polling for window updates
  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    setState(prev => ({ ...prev, isPolling: false }));
  }, []);

  // Open a new window
  const openWindow = useCallback(
    async (
      url: string,
      options: WindowOpenOptions = {}
    ): Promise<string | null> => {
      const { name = '', features = '', focus = true, customId } = options;

      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        // Check if we've reached the maximum window limit
        const openWindowCount = state.windows.filter(w => !w.closed).length;
        if (openWindowCount >= maxWindows) {
          throw new Error(`Maximum window limit reached (${maxWindows})`);
        }

        // Open the window
        const newWindow = window.open(url, name, features);

        if (!newWindow) {
          throw new Error('Failed to open window - popup may be blocked');
        }

        // Generate unique ID for the window
        const windowId = generateWindowId(customId);
        const now = Date.now();

        const aaeWindow: PwaWindow = {
          id: windowId,
          window: newWindow,
          name: name || windowId,
          url,
          features,
          closed: false,
          openedAt: now,
          lastUpdated: now,
        };

        // Add to state
        setState(prev => ({
          ...prev,
          windows: [...prev.windows, aaeWindow],
          isLoading: false,
        }));

        // Focus the window if requested
        if (focus) {
          try {
            newWindow.focus();
          } catch (error) {
            console.warn('Failed to focus window:', error);
          }
        }

        onWindowOpened?.(aaeWindow);
        return windowId;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to open window';
        setState(prev => ({ ...prev, error: errorMessage, isLoading: false }));
        onError?.(errorMessage);
        return null;
      }
    },
    [state.windows, maxWindows, generateWindowId, onWindowOpened, onError]
  );

  // Close a specific window
  const closeWindow = useCallback(
    (windowId: string): boolean => {
      const aaeWindow = state.windows.find(w => w.id === windowId);

      if (!aaeWindow) {
        const error = `Window with ID "${windowId}" not found`;
        setState(prev => ({ ...prev, error }));
        onError?.(error);
        return false;
      }

      try {
        if (aaeWindow.window && !aaeWindow.window.closed) {
          aaeWindow.window.close();
        }

        // Update state to mark window as closed
        setState(prev => ({
          ...prev,
          windows: prev.windows.map(w =>
            w.id === windowId
              ? { ...w, closed: true, lastUpdated: Date.now() }
              : w
          ),
        }));

        onWindowClosed?.(windowId);
        return true;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to close window';
        setState(prev => ({ ...prev, error: errorMessage }));
        onError?.(errorMessage);
        return false;
      }
    },
    [state.windows, onWindowClosed, onError]
  );

  // Close all windows
  const closeAllWindows = useCallback((): number => {
    let closedCount = 0;

    state.windows.forEach(aaeWindow => {
      if (!aaeWindow.closed) {
        try {
          if (aaeWindow.window && !aaeWindow.window.closed) {
            aaeWindow.window.close();
            closedCount++;
          }
        } catch (error) {
          console.warn(`Failed to close window ${aaeWindow.id}:`, error);
        }
      }
    });

    // Update state to mark all windows as closed
    setState(prev => ({
      ...prev,
      windows: prev.windows.map(w => ({
        ...w,
        closed: true,
        lastUpdated: Date.now(),
      })),
    }));

    return closedCount;
  }, [state.windows]);

  // Focus a specific window
  const focusWindow = useCallback(
    (windowId: string): boolean => {
      const aaeWindow = state.windows.find(w => w.id === windowId);

      if (!aaeWindow || aaeWindow.closed || !aaeWindow.window) {
        return false;
      }

      try {
        aaeWindow.window.focus();
        return true;
      } catch (error) {
        console.warn(`Failed to focus window ${windowId}:`, error);
        return false;
      }
    },
    [state.windows]
  );

  // Get a specific window by ID
  const getWindow = useCallback(
    (windowId: string): PwaWindow | null => {
      return state.windows.find(w => w.id === windowId) || null;
    },
    [state.windows]
  );

  // Get window count by status
  const getWindowCount = useCallback(() => {
    const total = state.windows.length;
    const open = state.windows.filter(w => !w.closed).length;
    const closed = total - open;

    return { total, open, closed };
  }, [state.windows]);

  // Clear error state
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Setup effect for initialization and cleanup
  useEffect(() => {
    if (autoStartPolling && typeof window !== 'undefined') {
      startPolling();
    }

    // Cleanup function
    return () => {
      stopPolling();
    };
  }, [autoStartPolling, startPolling, stopPolling]);

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      // Close all windows when the component unmounts (optional)
      // Comment out if you want windows to persist
      // closeAllWindows();
    };
  }, []);

  return {
    ...state,
    openWindow,
    closeWindow,
    closeAllWindows,
    focusWindow,
    getWindow,
    refreshWindows,
    startPolling,
    stopPolling,
    clearError,
    getWindowCount,
  };
}

/**
 * Window management utilities
 */
export class WindowManagerUtils {
  /**
   * Check if Window Management API is supported
   */
  static isSupported(): boolean {
    return typeof window !== 'undefined' && 'getScreenDetails' in window;
  }

  /**
   * Get browser compatibility information
   */
  static getBrowserCompatibility(): {
    isSupported: boolean;
    browserInfo: string;
    limitations: string[];
  } {
    const isSupported = this.isSupported();

    let browserInfo = 'Unknown browser';
    const limitations: string[] = [];

    if (typeof navigator !== 'undefined') {
      const userAgent = navigator.userAgent;

      if (userAgent.includes('Chrome')) {
        browserInfo = 'Chrome';
        if (!isSupported) {
          limitations.push('Requires Chrome 100+ for Window Management API');
        } else {
          limitations.push('Requires user interaction to open windows');
          limitations.push('Subject to popup blockers');
        }
      } else if (userAgent.includes('Firefox')) {
        browserInfo = 'Firefox';
        limitations.push(
          'Window Management API not supported - basic window.open available'
        );
      } else if (userAgent.includes('Safari')) {
        browserInfo = 'Safari';
        limitations.push(
          'Window Management API not supported - basic window.open available'
        );
      } else if (userAgent.includes('Edge')) {
        browserInfo = 'Edge';
        if (!isSupported) {
          limitations.push('Requires Edge 100+ for Window Management API');
        } else {
          limitations.push('Requires user interaction to open windows');
        }
      }
    }

    limitations.push('Multi-window support depends on screen space');
    limitations.push('Windows may be blocked by popup blockers');

    return {
      isSupported,
      browserInfo,
      limitations,
    };
  }

  /**
   * Common window feature strings
   */
  static readonly WINDOW_FEATURES = {
    /** Small popup window */
    POPUP: 'width=400,height=300,scrollbars=yes,resizable=yes',
    /** Medium dialog window */
    DIALOG: 'width=600,height=400,scrollbars=yes,resizable=yes',
    /** Large application window */
    LARGE: 'width=1024,height=768,scrollbars=yes,resizable=yes',
    /** Full screen window */
    FULLSCREEN: 'fullscreen=yes',
    /** Minimal window (no toolbars) */
    MINIMAL:
      'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=400',
  };

  /**
   * Generate window features string
   */
  static createFeatures(options: {
    width?: number;
    height?: number;
    left?: number;
    top?: number;
    scrollbars?: boolean;
    resizable?: boolean;
    toolbar?: boolean;
    location?: boolean;
    status?: boolean;
    menubar?: boolean;
  }): string {
    const features: string[] = [];

    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === 'boolean') {
          features.push(`${key}=${value ? 'yes' : 'no'}`);
        } else {
          features.push(`${key}=${value}`);
        }
      }
    });

    return features.join(',');
  }

  /**
   * Calculate centered window position
   */
  static getCenteredPosition(
    width: number,
    height: number
  ): { left: number; top: number } {
    const left = Math.round((screen.width - width) / 2);
    const top = Math.round((screen.height - height) / 2);

    return { left, top };
  }

  /**
   * Validate window options
   */
  static validateWindowOptions(options: WindowOpenOptions): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (options.name && options.name.includes(' ')) {
      errors.push('Window name cannot contain spaces');
    }

    if (options.features) {
      // Basic validation of features string
      const invalidFeatures = options.features.split(',').filter(feature => {
        const [key] = feature.split('=');
        return !key || key.trim().length === 0;
      });

      if (invalidFeatures.length > 0) {
        errors.push('Invalid window features format');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Create a window configuration for common use cases
   */
  static createConfig(
    type: 'popup' | 'dialog' | 'large' | 'fullscreen' | 'minimal'
  ): {
    features: string;
    focus: boolean;
  } {
    const configs = {
      popup: {
        features: this.WINDOW_FEATURES.POPUP,
        focus: true,
      },
      dialog: {
        features: this.WINDOW_FEATURES.DIALOG,
        focus: true,
      },
      large: {
        features: this.WINDOW_FEATURES.LARGE,
        focus: false,
      },
      fullscreen: {
        features: this.WINDOW_FEATURES.FULLSCREEN,
        focus: true,
      },
      minimal: {
        features: this.WINDOW_FEATURES.MINIMAL,
        focus: true,
      },
    };

    return configs[type];
  }
}
