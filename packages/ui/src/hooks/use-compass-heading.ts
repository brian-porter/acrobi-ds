/**
 * @fileoverview Compass Heading Hook for Epic 63 - AAE Device Orientation & Motion
 * Provides compass heading using the Device Orientation API.
 * Enables compass navigation and directional features.
 */

import { useState, useCallback, useEffect, useRef } from 'react';

// Compass Heading types
export interface CompassHeadingData {
  heading: number; // 0-360 degrees, 0 = North
  accuracy: number | null; // Accuracy in degrees
  magneticHeading: number; // Raw magnetic heading
  trueHeading: number | null; // True heading (corrected for magnetic declination)
  timestamp: number;
}

export interface CompassState {
  isSupported: boolean;
  hasPermission: boolean | null;
  isActive: boolean;
  isCalibrated: boolean;
  heading: CompassHeadingData | null;
  lastUpdate: number | null;
}

export interface CompassError {
  type:
    | 'not_supported'
    | 'permission_denied'
    | 'permission_error'
    | 'calibration_needed'
    | 'unknown_error';
  message: string;
  originalError?: Error;
}

export interface CompassOptions {
  /** Enable debug logging */
  debug?: boolean;
  /** Enable automatic permission request */
  autoRequestPermission?: boolean;
  /** Smoothing factor for heading changes (0-1, 0 = no smoothing) */
  smoothing?: number;
  /** Magnetic declination offset in degrees */
  magneticDeclination?: number;
  /** Callback when heading updates */
  onHeadingUpdate?: (heading: CompassHeadingData) => void;
  /** Callback when permission is granted */
  onPermissionGranted?: () => void;
  /** Callback when permission is denied */
  onPermissionDenied?: () => void;
  /** Callback when calibration is needed */
  onCalibrationNeeded?: () => void;
  /** Callback when errors occur */
  onError?: (error: CompassError) => void;
}

export interface UseCompassHeadingReturn {
  // State
  state: CompassState;
  error: CompassError | null;

  // Actions
  requestPermission: () => Promise<boolean>;
  start: () => boolean;
  stop: () => void;
  calibrate: () => void;

  // Utilities
  isSupported: boolean;
  clearError: () => void;
  getHeading: () => number;

  // Direction helpers
  getCardinalDirection: () => string;
  getCompassDirection: (precision?: 'simple' | 'detailed') => string;
  getRelativeDirection: (
    targetHeading: number
  ) => 'left' | 'right' | 'straight';
  getAngularDifference: (targetHeading: number) => number;
}

// Check if Device Orientation API is supported
const isCompassSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'DeviceOrientationEvent' in window;
};

// Check if permission API is available
const hasPermissionAPI = (): boolean => {
  return (
    typeof (DeviceOrientationEvent as any)?.requestPermission === 'function'
  );
};

// Normalize heading to 0-360 range
const normalizeHeading = (heading: number): number => {
  let normalized = heading % 360;
  if (normalized < 0) normalized += 360;
  return normalized;
};

// Apply smoothing to heading changes
const smoothHeading = (
  current: number,
  previous: number,
  factor: number
): number => {
  if (factor <= 0) return current;
  if (factor >= 1) return previous;

  // Handle wrapping around 0/360
  let diff = current - previous;
  if (diff > 180) {
    diff -= 360;
  } else if (diff < -180) {
    diff += 360;
  }

  return normalizeHeading(previous + diff * (1 - factor));
};

/**
 * Compass Heading Hook
 * Manages compass heading using Device Orientation API with smoothing and calibration
 */
export function useCompassHeading(
  options: CompassOptions = {}
): UseCompassHeadingReturn {
  const {
    debug = false,
    autoRequestPermission = false,
    smoothing = 0.1,
    magneticDeclination = 0,
    onHeadingUpdate,
    onPermissionGranted,
    onPermissionDenied,
    onCalibrationNeeded,
    onError,
  } = options;

  // State
  const [state, setState] = useState<CompassState>({
    isSupported: isCompassSupported(),
    hasPermission: null,
    isActive: false,
    isCalibrated: true, // Assume calibrated initially
    heading: null,
    lastUpdate: null,
  });

  const [error, setError] = useState<CompassError | null>(null);

  // Refs for smoothing
  const previousHeadingRef = useRef<number | null>(null);
  const isActiveRef = useRef<boolean>(false);

  // Error handling
  const handleError = useCallback(
    (type: CompassError['type'], message: string, originalError?: Error) => {
      const compassError: CompassError = { type, message, originalError };
      setError(compassError);
      onError?.(compassError);

      if (debug) {
        console.error('Compass Error:', compassError);
      }
    },
    [onError, debug]
  );

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Request permission for device orientation
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!state.isSupported) {
      handleError(
        'not_supported',
        'Device Orientation API is not supported in this browser'
      );
      return false;
    }

    clearError();

    // Check if permission API is available (iOS 13+)
    if (hasPermissionAPI()) {
      try {
        const permission = await (
          DeviceOrientationEvent as any
        ).requestPermission();

        if (permission === 'granted') {
          setState(prev => ({ ...prev, hasPermission: true }));
          onPermissionGranted?.();

          if (debug) {
            console.log('Device orientation permission granted');
          }

          return true;
        } else {
          setState(prev => ({ ...prev, hasPermission: false }));
          handleError(
            'permission_denied',
            'Device orientation permission was denied'
          );
          onPermissionDenied?.();
          return false;
        }
      } catch (error: any) {
        setState(prev => ({ ...prev, hasPermission: false }));
        handleError(
          'permission_error',
          `Failed to request device orientation permission: ${error.message}`,
          error
        );
        onPermissionDenied?.();
        return false;
      }
    } else {
      // For browsers without permission API, assume permission is granted
      setState(prev => ({ ...prev, hasPermission: true }));
      onPermissionGranted?.();

      if (debug) {
        console.log(
          'Device orientation permission assumed (no permission API)'
        );
      }

      return true;
    }
  }, [
    state.isSupported,
    handleError,
    clearError,
    debug,
    onPermissionGranted,
    onPermissionDenied,
  ]);

  // Orientation event handler
  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      const { alpha, beta, gamma } = event;

      // Check for compass data availability
      if (alpha === null) {
        if (!state.isCalibrated) return; // Already handled

        setState(prev => ({ ...prev, isCalibrated: false }));
        handleError(
          'calibration_needed',
          'Compass calibration needed - alpha value is null'
        );
        onCalibrationNeeded?.();
        return;
      }

      // Ensure we're calibrated
      if (!state.isCalibrated) {
        setState(prev => ({ ...prev, isCalibrated: true }));
      }

      const now = Date.now();

      // Calculate magnetic heading (alpha is compass heading)
      let magneticHeading = normalizeHeading(360 - alpha); // Convert to compass bearing

      // Apply smoothing if enabled
      if (smoothing > 0 && previousHeadingRef.current !== null) {
        magneticHeading = smoothHeading(
          magneticHeading,
          previousHeadingRef.current,
          smoothing
        );
      }
      previousHeadingRef.current = magneticHeading;

      // Calculate true heading (add magnetic declination)
      const trueHeading = normalizeHeading(
        magneticHeading + magneticDeclination
      );

      // Create heading data
      const headingData: CompassHeadingData = {
        heading: trueHeading,
        accuracy: event.webkitCompassAccuracy || null,
        magneticHeading,
        trueHeading: magneticDeclination !== 0 ? trueHeading : null,
        timestamp: now,
      };

      // Update state
      setState(prev => ({
        ...prev,
        heading: headingData,
        lastUpdate: now,
      }));

      // Call callback
      onHeadingUpdate?.(headingData);

      if (debug) {
        console.log('Compass heading:', headingData);
      }
    },
    [
      state.isCalibrated,
      smoothing,
      magneticDeclination,
      debug,
      onHeadingUpdate,
      handleError,
      onCalibrationNeeded,
    ]
  );

  // Start compass tracking
  const start = useCallback((): boolean => {
    if (!state.isSupported) {
      handleError('not_supported', 'Device Orientation API is not supported');
      return false;
    }

    if (state.hasPermission === false) {
      handleError(
        'permission_denied',
        'Device orientation permission is required'
      );
      return false;
    }

    if (isActiveRef.current) {
      if (debug) {
        console.warn('Compass is already active');
      }
      return true;
    }

    try {
      window.addEventListener('deviceorientation', handleDeviceOrientation, {
        passive: true,
      });
      isActiveRef.current = true;
      setState(prev => ({ ...prev, isActive: true }));

      if (debug) {
        console.log('Compass tracking started');
      }

      return true;
    } catch (error: any) {
      handleError(
        'unknown_error',
        `Failed to start compass: ${error.message}`,
        error
      );
      return false;
    }
  }, [
    state.isSupported,
    state.hasPermission,
    debug,
    handleError,
    handleDeviceOrientation,
  ]);

  // Stop compass tracking
  const stop = useCallback(() => {
    if (!isActiveRef.current) return;

    try {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      isActiveRef.current = false;
      setState(prev => ({ ...prev, isActive: false }));
      previousHeadingRef.current = null;

      if (debug) {
        console.log('Compass tracking stopped');
      }
    } catch (error: any) {
      console.warn('Error stopping compass:', error);
    }
  }, [debug, handleDeviceOrientation]);

  // Trigger calibration
  const calibrate = useCallback(() => {
    setState(prev => ({ ...prev, isCalibrated: false }));
    onCalibrationNeeded?.();

    if (debug) {
      console.log('Compass calibration requested');
    }
  }, [debug, onCalibrationNeeded]);

  // Get current heading
  const getHeading = useCallback((): number => {
    return state.heading?.heading ?? 0;
  }, [state.heading]);

  // Get cardinal direction
  const getCardinalDirection = useCallback((): string => {
    const heading = getHeading();
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(heading / 45) % 8;
    return directions[index];
  }, [getHeading]);

  // Get compass direction with precision
  const getCompassDirection = useCallback(
    (precision: 'simple' | 'detailed' = 'simple'): string => {
      const heading = getHeading();

      if (precision === 'simple') {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(heading / 45) % 8;
        return directions[index];
      } else {
        const directions = [
          'N',
          'NNE',
          'NE',
          'ENE',
          'E',
          'ESE',
          'SE',
          'SSE',
          'S',
          'SSW',
          'SW',
          'WSW',
          'W',
          'WNW',
          'NW',
          'NNW',
        ];
        const index = Math.round(heading / 22.5) % 16;
        return directions[index];
      }
    },
    [getHeading]
  );

  // Get relative direction to target
  const getRelativeDirection = useCallback(
    (targetHeading: number): 'left' | 'right' | 'straight' => {
      const currentHeading = getHeading();
      let diff = targetHeading - currentHeading;

      // Normalize difference to -180 to 180
      if (diff > 180) {
        diff -= 360;
      } else if (diff < -180) {
        diff += 360;
      }

      if (Math.abs(diff) < 10) return 'straight';
      return diff > 0 ? 'right' : 'left';
    },
    [getHeading]
  );

  // Get angular difference to target
  const getAngularDifference = useCallback(
    (targetHeading: number): number => {
      const currentHeading = getHeading();
      let diff = Math.abs(targetHeading - currentHeading);

      // Take the shorter angle
      if (diff > 180) {
        diff = 360 - diff;
      }

      return diff;
    },
    [getHeading]
  );

  // Auto-request permission
  useEffect(() => {
    if (
      autoRequestPermission &&
      state.isSupported &&
      state.hasPermission === null
    ) {
      requestPermission();
    }
  }, [
    autoRequestPermission,
    state.isSupported,
    state.hasPermission,
    requestPermission,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    // State
    state,
    error,

    // Actions
    requestPermission,
    start,
    stop,
    calibrate,

    // Utilities
    isSupported: state.isSupported,
    clearError,
    getHeading,

    // Direction helpers
    getCardinalDirection,
    getCompassDirection,
    getRelativeDirection,
    getAngularDifference,
  };
}

// Utility functions
export const CompassUtils = {
  isSupported: isCompassSupported,
  hasPermissionAPI,
  normalizeHeading,

  /**
   * Calculate bearing between two coordinates
   */
  calculateBearing: (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;

    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x =
      Math.cos(lat1Rad) * Math.sin(lat2Rad) -
      Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);

    let bearing = (Math.atan2(y, x) * 180) / Math.PI;
    return normalizeHeading(bearing);
  },

  /**
   * Get magnetic declination for coordinates (simplified)
   */
  getMagneticDeclination: (lat: number, lon: number): number => {
    // This is a very simplified approximation
    // For production, use a proper declination service
    const declination =
      Math.sin((lat * Math.PI) / 180) * Math.cos((lon * Math.PI) / 180) * 15;
    return Math.max(-30, Math.min(30, declination));
  },

  /**
   * Convert degrees to radians
   */
  degreesToRadians: (degrees: number): number => {
    return (degrees * Math.PI) / 180;
  },

  /**
   * Convert radians to degrees
   */
  radiansToDegrees: (radians: number): number => {
    return (radians * 180) / Math.PI;
  },

  /**
   * Get all cardinal and intercardinal directions
   */
  getAllDirections: () => ({
    cardinal: ['N', 'E', 'S', 'W'],
    intercardinal: ['NE', 'SE', 'SW', 'NW'],
    halfWinds: ['NNE', 'ENE', 'ESE', 'SSE', 'SSW', 'WSW', 'WNW', 'NNW'],
    all: [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ],
  }),

  /**
   * Get browser support information
   */
  getBrowserSupport: () => ({
    chrome: 'Full support since Chrome 7, permission required on mobile',
    firefox: 'Full support since Firefox 3.6',
    safari: 'Full support since Safari 4.2, permission required since iOS 13',
    edge: 'Full support since Edge 12',
    mobile: 'Widely supported, permission required on iOS 13+',
  }),

  /**
   * Get calibration tips
   */
  getCalibrationTips: () => [
    'Move device in a figure-8 pattern',
    'Rotate device around all axes',
    'Keep away from magnetic interference',
    'Calibrate in the environment where compass will be used',
    'Some devices may require manual calibration in settings',
  ],

  /**
   * Get usage best practices
   */
  getBestPractices: () => [
    'Always check for browser support',
    'Request permission appropriately on iOS devices',
    'Implement compass calibration UI',
    'Apply smoothing to reduce jitter',
    'Account for magnetic declination in navigation apps',
    'Provide fallback when compass is unavailable',
    'Test on actual devices in different environments',
  ],
};

export default useCompassHeading;
