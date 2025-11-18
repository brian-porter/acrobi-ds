/**
 * @fileoverview Device Motion Hook for Epic 63 - AAE Device Orientation & Motion
 * Provides access to device's raw accelerometer and gyroscope data.
 * Enables custom motion-based interactions with comprehensive sensor data.
 */

import { useState, useCallback, useEffect, useRef } from 'react';

// Device Motion types
export interface AccelerationData {
  x: number | null;
  y: number | null;
  z: number | null;
}

export interface RotationRateData {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
}

export interface DeviceMotionData {
  acceleration: AccelerationData;
  accelerationIncludingGravity: AccelerationData;
  rotationRate: RotationRateData;
  interval: number | null;
  timestamp: number;
}

export interface DeviceMotionState {
  isSupported: boolean;
  hasPermission: boolean | null;
  isActive: boolean;
  data: DeviceMotionData | null;
  lastUpdate: number | null;
  frequency: number; // Updates per second
}

export interface DeviceMotionError {
  type:
    | 'not_supported'
    | 'permission_denied'
    | 'permission_error'
    | 'activation_failed'
    | 'unknown_error';
  message: string;
  originalError?: Error;
}

export interface DeviceMotionOptions {
  /** Enable debug logging */
  debug?: boolean;
  /** Sample rate throttling in milliseconds (minimum time between updates) */
  throttle?: number;
  /** Enable automatic permission request */
  autoRequestPermission?: boolean;
  /** Callback when motion data updates */
  onMotionUpdate?: (data: DeviceMotionData) => void;
  /** Callback when permission is granted */
  onPermissionGranted?: () => void;
  /** Callback when permission is denied */
  onPermissionDenied?: () => void;
  /** Callback when errors occur */
  onError?: (error: DeviceMotionError) => void;
}

export interface UseDeviceMotionReturn {
  // State
  state: DeviceMotionState;
  error: DeviceMotionError | null;

  // Actions
  requestPermission: () => Promise<boolean>;
  start: () => boolean;
  stop: () => void;

  // Utilities
  isSupported: boolean;
  clearError: () => void;
  getLatestData: () => DeviceMotionData | null;

  // Motion analysis helpers
  getAccelerationMagnitude: () => number;
  getRotationMagnitude: () => number;
  isStationary: (threshold?: number) => boolean;
}

// Check if Device Motion API is supported
const isDeviceMotionSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'DeviceMotionEvent' in window;
};

// Check if permission API is available
const hasPermissionAPI = (): boolean => {
  return typeof (DeviceMotionEvent as any)?.requestPermission === 'function';
};

// Create initial motion data
const createInitialMotionData = (): DeviceMotionData => ({
  acceleration: { x: null, y: null, z: null },
  accelerationIncludingGravity: { x: null, y: null, z: null },
  rotationRate: { alpha: null, beta: null, gamma: null },
  interval: null,
  timestamp: Date.now(),
});

/**
 * Device Motion Hook
 * Manages device motion sensors with permission handling and performance optimization
 */
export function useDeviceMotion(
  options: DeviceMotionOptions = {}
): UseDeviceMotionReturn {
  const {
    debug = false,
    throttle = 16, // ~60fps by default
    autoRequestPermission = false,
    onMotionUpdate,
    onPermissionGranted,
    onPermissionDenied,
    onError,
  } = options;

  // State
  const [state, setState] = useState<DeviceMotionState>({
    isSupported: isDeviceMotionSupported(),
    hasPermission: null,
    isActive: false,
    data: null,
    lastUpdate: null,
    frequency: 0,
  });

  const [error, setError] = useState<DeviceMotionError | null>(null);

  // Refs for performance optimization
  const lastUpdateRef = useRef<number>(0);
  const frequencyRef = useRef<{ count: number; startTime: number }>({
    count: 0,
    startTime: Date.now(),
  });
  const isActiveRef = useRef<boolean>(false);

  // Error handling
  const handleError = useCallback(
    (
      type: DeviceMotionError['type'],
      message: string,
      originalError?: Error
    ) => {
      const motionError: DeviceMotionError = { type, message, originalError };
      setError(motionError);
      onError?.(motionError);

      if (debug) {
        console.error('Device Motion Error:', motionError);
      }
    },
    [onError, debug]
  );

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Request permission for device motion
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!state.isSupported) {
      handleError(
        'not_supported',
        'Device Motion API is not supported in this browser'
      );
      return false;
    }

    clearError();

    // Check if permission API is available (iOS 13+)
    if (hasPermissionAPI()) {
      try {
        const permission = await (DeviceMotionEvent as any).requestPermission();

        if (permission === 'granted') {
          setState(prev => ({ ...prev, hasPermission: true }));
          onPermissionGranted?.();

          if (debug) {
            console.log('Device motion permission granted');
          }

          return true;
        } else {
          setState(prev => ({ ...prev, hasPermission: false }));
          handleError(
            'permission_denied',
            'Device motion permission was denied'
          );
          onPermissionDenied?.();
          return false;
        }
      } catch (error: any) {
        setState(prev => ({ ...prev, hasPermission: false }));
        handleError(
          'permission_error',
          `Failed to request device motion permission: ${error.message}`,
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
        console.log('Device motion permission assumed (no permission API)');
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

  // Motion event handler
  const handleDeviceMotion = useCallback(
    (event: DeviceMotionEvent) => {
      const now = Date.now();

      // Throttle updates if specified
      if (throttle > 0 && now - lastUpdateRef.current < throttle) {
        return;
      }

      lastUpdateRef.current = now;

      // Update frequency calculation
      frequencyRef.current.count++;
      if (now - frequencyRef.current.startTime >= 1000) {
        const frequency = frequencyRef.current.count;
        setState(prev => ({ ...prev, frequency }));
        frequencyRef.current = { count: 0, startTime: now };
      }

      // Create motion data from event
      const motionData: DeviceMotionData = {
        acceleration: {
          x: event.acceleration?.x ?? null,
          y: event.acceleration?.y ?? null,
          z: event.acceleration?.z ?? null,
        },
        accelerationIncludingGravity: {
          x: event.accelerationIncludingGravity?.x ?? null,
          y: event.accelerationIncludingGravity?.y ?? null,
          z: event.accelerationIncludingGravity?.z ?? null,
        },
        rotationRate: {
          alpha: event.rotationRate?.alpha ?? null,
          beta: event.rotationRate?.beta ?? null,
          gamma: event.rotationRate?.gamma ?? null,
        },
        interval: event.interval,
        timestamp: now,
      };

      // Update state
      setState(prev => ({
        ...prev,
        data: motionData,
        lastUpdate: now,
      }));

      // Call callback
      onMotionUpdate?.(motionData);

      if (debug && frequencyRef.current.count % 60 === 0) {
        console.log('Device motion data:', motionData);
      }
    },
    [throttle, debug, onMotionUpdate]
  );

  // Start motion tracking
  const start = useCallback((): boolean => {
    if (!state.isSupported) {
      handleError('not_supported', 'Device Motion API is not supported');
      return false;
    }

    if (state.hasPermission === false) {
      handleError('permission_denied', 'Device motion permission is required');
      return false;
    }

    if (isActiveRef.current) {
      if (debug) {
        console.warn('Device motion is already active');
      }
      return true;
    }

    try {
      window.addEventListener('devicemotion', handleDeviceMotion, {
        passive: true,
      });
      isActiveRef.current = true;
      setState(prev => ({ ...prev, isActive: true }));
      frequencyRef.current = { count: 0, startTime: Date.now() };

      if (debug) {
        console.log('Device motion tracking started');
      }

      return true;
    } catch (error: any) {
      handleError(
        'activation_failed',
        `Failed to start device motion: ${error.message}`,
        error
      );
      return false;
    }
  }, [
    state.isSupported,
    state.hasPermission,
    debug,
    handleError,
    handleDeviceMotion,
  ]);

  // Stop motion tracking
  const stop = useCallback(() => {
    if (!isActiveRef.current) return;

    try {
      window.removeEventListener('devicemotion', handleDeviceMotion);
      isActiveRef.current = false;
      setState(prev => ({ ...prev, isActive: false, frequency: 0 }));

      if (debug) {
        console.log('Device motion tracking stopped');
      }
    } catch (error: any) {
      console.warn('Error stopping device motion:', error);
    }
  }, [debug, handleDeviceMotion]);

  // Get latest motion data
  const getLatestData = useCallback((): DeviceMotionData | null => {
    return state.data;
  }, [state.data]);

  // Calculate acceleration magnitude
  const getAccelerationMagnitude = useCallback((): number => {
    if (!state.data?.acceleration) return 0;

    const { x, y, z } = state.data.acceleration;
    if (x === null || y === null || z === null) return 0;

    return Math.sqrt(x * x + y * y + z * z);
  }, [state.data]);

  // Calculate rotation magnitude
  const getRotationMagnitude = useCallback((): number => {
    if (!state.data?.rotationRate) return 0;

    const { alpha, beta, gamma } = state.data.rotationRate;
    if (alpha === null || beta === null || gamma === null) return 0;

    return Math.sqrt(alpha * alpha + beta * beta + gamma * gamma);
  }, [state.data]);

  // Check if device is stationary
  const isStationary = useCallback(
    (threshold: number = 0.1): boolean => {
      const accelMagnitude = getAccelerationMagnitude();
      const rotationMagnitude = getRotationMagnitude();

      return accelMagnitude < threshold && rotationMagnitude < threshold;
    },
    [getAccelerationMagnitude, getRotationMagnitude]
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

    // Utilities
    isSupported: state.isSupported,
    clearError,
    getLatestData,

    // Motion analysis helpers
    getAccelerationMagnitude,
    getRotationMagnitude,
    isStationary,
  };
}

// Utility functions
export const DeviceMotionUtils = {
  isSupported: isDeviceMotionSupported,
  hasPermissionAPI,

  /**
   * Calculate magnitude of 3D vector
   */
  calculateMagnitude: (
    x: number | null,
    y: number | null,
    z: number | null
  ): number => {
    if (x === null || y === null || z === null) return 0;
    return Math.sqrt(x * x + y * y + z * z);
  },

  /**
   * Calculate angle between two 3D vectors
   */
  calculateAngle: (
    v1: AccelerationData | RotationRateData,
    v2: AccelerationData | RotationRateData
  ): number => {
    if (!v1.x || !v1.y || !v1.z || !v2.x || !v2.y || !v2.z) return 0;

    const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
    const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z);

    return Math.acos(dot / (mag1 * mag2)) * (180 / Math.PI);
  },

  /**
   * Apply low-pass filter to reduce noise
   */
  lowPassFilter: (
    current: AccelerationData | RotationRateData,
    previous: AccelerationData | RotationRateData,
    alpha: number = 0.1
  ): AccelerationData | RotationRateData => {
    return {
      x:
        current.x !== null && previous.x !== null
          ? alpha * current.x + (1 - alpha) * previous.x
          : current.x,
      y:
        current.y !== null && previous.y !== null
          ? alpha * current.y + (1 - alpha) * previous.y
          : current.y,
      z:
        current.z !== null && previous.z !== null
          ? alpha * current.z + (1 - alpha) * previous.z
          : current.z,
    };
  },

  /**
   * Detect motion patterns
   */
  detectPattern: (
    history: DeviceMotionData[],
    patternLength: number = 10
  ): 'shake' | 'tilt' | 'rotation' | 'stationary' | 'unknown' => {
    if (history.length < patternLength) return 'unknown';

    const recent = history.slice(-patternLength);
    const accelerations = recent.map(d =>
      DeviceMotionUtils.calculateMagnitude(
        d.acceleration.x,
        d.acceleration.y,
        d.acceleration.z
      )
    );

    const rotations = recent.map(d =>
      DeviceMotionUtils.calculateMagnitude(
        d.rotationRate.alpha,
        d.rotationRate.beta,
        d.rotationRate.gamma
      )
    );

    const avgAccel =
      accelerations.reduce((a, b) => a + b, 0) / accelerations.length;
    const avgRotation = rotations.reduce((a, b) => a + b, 0) / rotations.length;

    if (avgAccel > 15) return 'shake';
    if (avgRotation > 200) return 'rotation';
    if (avgAccel < 0.1 && avgRotation < 1) return 'stationary';
    if (avgAccel > 2) return 'tilt';

    return 'unknown';
  },

  /**
   * Get browser support information
   */
  getBrowserSupport: () => ({
    chrome: 'Full support since Chrome 7',
    firefox: 'Full support since Firefox 6',
    safari: 'Full support since Safari 4.2, permission required since iOS 13',
    edge: 'Full support since Edge 12',
    mobile: 'Widely supported, permission required on iOS 13+',
  }),

  /**
   * Get security and privacy information
   */
  getSecurityInfo: () => ({
    permissions: 'iOS 13+ requires explicit permission',
    https: 'Secure context (HTTPS) required on some browsers',
    privacy: 'Motion data can be used for fingerprinting',
    throttling: 'Some browsers may throttle updates to preserve battery',
  }),

  /**
   * Get usage best practices
   */
  getBestPractices: () => [
    'Always check for browser support before using',
    'Request permission appropriately on iOS devices',
    'Implement throttling to avoid excessive updates',
    'Use low-pass filtering to reduce sensor noise',
    'Provide fallback behavior when sensors are unavailable',
    'Respect user privacy and explain why motion access is needed',
    'Test on actual devices, not browser dev tools',
  ],
};

export default useDeviceMotion;
