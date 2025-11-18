/**
 * @fileoverview Screen Orientation Hook for Epic 63 - AAE Device Orientation & Motion
 * Provides screen orientation management using the Screen Orientation API.
 * Enables orientation-aware layouts and features with lock/unlock capabilities.
 */

import { useState, useCallback, useEffect } from 'react';

// Screen Orientation types
export type OrientationType =
  | 'portrait-primary'
  | 'portrait-secondary'
  | 'landscape-primary'
  | 'landscape-secondary';
export type OrientationLockType =
  | 'any'
  | 'natural'
  | 'portrait'
  | 'landscape'
  | 'portrait-primary'
  | 'portrait-secondary'
  | 'landscape-primary'
  | 'landscape-secondary';

export interface ScreenOrientationState {
  type: OrientationType | null;
  angle: number;
  isSupported: boolean;
  isLocked: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
}

export interface ScreenOrientationError {
  type:
    | 'not_supported'
    | 'security_error'
    | 'invalid_state'
    | 'not_allowed'
    | 'unknown_error';
  message: string;
  originalError?: Error;
}

export interface ScreenOrientationOptions {
  /** Enable debug logging */
  debug?: boolean;
  /** Callback when orientation changes */
  onChange?: (orientation: ScreenOrientationState) => void;
  /** Callback when orientation lock fails */
  onLockError?: (error: ScreenOrientationError) => void;
  /** Callback when orientation lock succeeds */
  onLockSuccess?: (orientation: OrientationLockType) => void;
}

export interface UseScreenOrientationReturn {
  // State
  state: ScreenOrientationState;
  error: ScreenOrientationError | null;

  // Actions
  lock: (orientation: OrientationLockType) => Promise<boolean>;
  unlock: () => Promise<boolean>;

  // Utilities
  isSupported: boolean;
  clearError: () => void;
  getCurrentOrientation: () => ScreenOrientationState;
}

// Check if Screen Orientation API is supported
const isScreenOrientationSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!(window.screen && window.screen.orientation);
};

// Get current orientation state
const getCurrentOrientationState = (): ScreenOrientationState => {
  const isSupported = isScreenOrientationSupported();

  if (!isSupported) {
    return {
      type: null,
      angle: 0,
      isSupported: false,
      isLocked: false,
      isPortrait: false,
      isLandscape: false,
    };
  }

  const orientation = window.screen.orientation;
  const type = orientation.type as OrientationType;
  const angle = orientation.angle;

  const isPortrait = type.includes('portrait');
  const isLandscape = type.includes('landscape');

  return {
    type,
    angle,
    isSupported: true,
    isLocked: false, // We can't directly detect if locked, so we manage this in state
    isPortrait,
    isLandscape,
  };
};

/**
 * Screen Orientation Hook
 * Manages screen orientation and provides lock/unlock functionality
 */
export function useScreenOrientation(
  options: ScreenOrientationOptions = {}
): UseScreenOrientationReturn {
  const { debug = false, onChange, onLockError, onLockSuccess } = options;

  // State
  const [state, setState] = useState<ScreenOrientationState>(() =>
    getCurrentOrientationState()
  );
  const [error, setError] = useState<ScreenOrientationError | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  // Error handling
  const handleError = useCallback(
    (
      type: ScreenOrientationError['type'],
      message: string,
      originalError?: Error
    ) => {
      const orientationError: ScreenOrientationError = {
        type,
        message,
        originalError,
      };
      setError(orientationError);
      onLockError?.(orientationError);

      if (debug) {
        console.error('Screen Orientation Error:', orientationError);
      }
    },
    [onLockError, debug]
  );

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Update orientation state
  const updateOrientation = useCallback(() => {
    const newState = getCurrentOrientationState();
    setState(prev => ({
      ...newState,
      isLocked: prev.isLocked, // Preserve locked state
    }));

    if (debug) {
      console.log('Orientation changed:', newState);
    }

    onChange?.(newState);
  }, [debug, onChange]);

  // Lock orientation
  const lock = useCallback(
    async (orientation: OrientationLockType): Promise<boolean> => {
      if (!state.isSupported) {
        handleError(
          'not_supported',
          'Screen Orientation API is not supported in this browser'
        );
        return false;
      }

      clearError();

      try {
        await window.screen.orientation.lock(orientation);
        setIsLocked(true);
        setState(prev => ({ ...prev, isLocked: true }));

        if (debug) {
          console.log('Screen orientation locked to:', orientation);
        }

        onLockSuccess?.(orientation);
        return true;
      } catch (error: any) {
        setIsLocked(false);
        setState(prev => ({ ...prev, isLocked: false }));

        if (error.name === 'NotSupportedError') {
          handleError(
            'not_supported',
            'Orientation lock not supported or not available'
          );
        } else if (error.name === 'SecurityError') {
          handleError(
            'security_error',
            'Orientation lock blocked by security policy'
          );
        } else if (error.name === 'InvalidStateError') {
          handleError(
            'invalid_state',
            'Cannot lock orientation in current state'
          );
        } else if (error.name === 'NotAllowedError') {
          handleError(
            'not_allowed',
            'Orientation lock not allowed by user or policy'
          );
        } else {
          handleError(
            'unknown_error',
            `Failed to lock orientation: ${error.message}`,
            error
          );
        }

        return false;
      }
    },
    [state.isSupported, handleError, clearError, debug, onLockSuccess]
  );

  // Unlock orientation
  const unlock = useCallback(async (): Promise<boolean> => {
    if (!state.isSupported) {
      handleError(
        'not_supported',
        'Screen Orientation API is not supported in this browser'
      );
      return false;
    }

    clearError();

    try {
      window.screen.orientation.unlock();
      setIsLocked(false);
      setState(prev => ({ ...prev, isLocked: false }));

      if (debug) {
        console.log('Screen orientation unlocked');
      }

      return true;
    } catch (error: any) {
      handleError(
        'unknown_error',
        `Failed to unlock orientation: ${error.message}`,
        error
      );
      return false;
    }
  }, [state.isSupported, handleError, clearError, debug]);

  // Get current orientation (utility function)
  const getCurrentOrientation = useCallback((): ScreenOrientationState => {
    return getCurrentOrientationState();
  }, []);

  // Set up orientation change listener
  useEffect(() => {
    if (!state.isSupported) return;

    const handleOrientationChange = () => {
      updateOrientation();
    };

    // Add event listener
    window.screen.orientation.addEventListener(
      'change',
      handleOrientationChange
    );

    // Cleanup
    return () => {
      window.screen.orientation.removeEventListener(
        'change',
        handleOrientationChange
      );
    };
  }, [state.isSupported, updateOrientation]);

  // Update locked state in main state
  useEffect(() => {
    setState(prev => ({ ...prev, isLocked }));
  }, [isLocked]);

  return {
    // State
    state,
    error,

    // Actions
    lock,
    unlock,

    // Utilities
    isSupported: state.isSupported,
    clearError,
    getCurrentOrientation,
  };
}

// Utility functions
export const ScreenOrientationUtils = {
  isSupported: isScreenOrientationSupported,

  /**
   * Get current orientation without hook
   */
  getCurrentOrientation: getCurrentOrientationState,

  /**
   * Check if current orientation is portrait
   */
  isPortrait: (): boolean => {
    const state = getCurrentOrientationState();
    return state.isPortrait;
  },

  /**
   * Check if current orientation is landscape
   */
  isLandscape: (): boolean => {
    const state = getCurrentOrientationState();
    return state.isLandscape;
  },

  /**
   * Get orientation angle
   */
  getAngle: (): number => {
    const state = getCurrentOrientationState();
    return state.angle;
  },

  /**
   * Get browser support information
   */
  getBrowserSupport: () => ({
    chrome: 'Full support since Chrome 38',
    firefox: 'Full support since Firefox 43',
    safari: 'Full support since Safari 13',
    edge: 'Full support since Edge 79',
    mobile: 'Widely supported on mobile browsers',
  }),

  /**
   * Get available orientation types
   */
  getOrientationTypes: () => ({
    'portrait-primary': 'Primary portrait orientation',
    'portrait-secondary': 'Secondary portrait orientation (upside down)',
    'landscape-primary': 'Primary landscape orientation',
    'landscape-secondary': 'Secondary landscape orientation (rotated 180°)',
  }),

  /**
   * Get available lock types
   */
  getLockTypes: () => ({
    any: 'Allow any orientation',
    natural: 'Natural orientation of the device',
    portrait: 'Any portrait orientation',
    landscape: 'Any landscape orientation',
    'portrait-primary': 'Primary portrait orientation',
    'portrait-secondary': 'Secondary portrait orientation',
    'landscape-primary': 'Primary landscape orientation',
    'landscape-secondary': 'Secondary landscape orientation',
  }),

  /**
   * Check if orientation lock is likely to work
   */
  canLikelyLock: (): boolean => {
    // Check if we're in a secure context and have the API
    return (
      (isScreenOrientationSupported() &&
        window.isSecureContext &&
        document.fullscreenElement !== null) ||
      document.webkitFullscreenElement !== null
    );
  },

  /**
   * Get security requirements for orientation lock
   */
  getSecurityRequirements: () => [
    'Must be served over HTTPS (secure context)',
    'Document must be in fullscreen mode for some browsers',
    'User gesture may be required for some browsers',
    'May be blocked by browser security policies',
  ],

  /**
   * Get usage best practices
   */
  getBestPractices: () => [
    'Always check isSupported before using lock/unlock',
    'Handle errors gracefully with fallback behavior',
    'Consider requesting fullscreen before locking orientation',
    'Provide visual feedback when orientation is locked',
    'Remember to unlock orientation when leaving the feature',
    'Test on actual devices, not just desktop browsers',
  ],
};

export default useScreenOrientation;
