/**
 * @fileoverview Shake Gesture Hook for Epic 63 - AAE Device Orientation & Motion
 * Provides shake gesture detection using the useDeviceMotion hook.
 * Enables shake-based interactions with customizable sensitivity and patterns.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { useDeviceMotion, DeviceMotionData } from './use-device-motion';

// Shake detection types
export interface ShakeEvent {
  intensity: number; // Shake intensity (0-1)
  duration: number; // Shake duration in milliseconds
  timestamp: number;
  direction: 'x' | 'y' | 'z' | 'multi'; // Primary shake direction
  pattern: 'single' | 'double' | 'triple' | 'continuous';
}

export interface ShakeState {
  isActive: boolean;
  isDetecting: boolean;
  lastShake: ShakeEvent | null;
  shakeCount: number;
  totalShakes: number;
}

export interface ShakeDetectionOptions {
  /** Shake sensitivity threshold (1-20, higher = less sensitive) */
  threshold?: number;
  /** Time window for detecting shake patterns in milliseconds */
  timeWindow?: number;
  /** Minimum time between shake detections in milliseconds */
  cooldown?: number;
  /** Minimum shake duration in milliseconds */
  minDuration?: number;
  /** Maximum shake duration in milliseconds */
  maxDuration?: number;
  /** Enable debug logging */
  debug?: boolean;
  /** Auto-start shake detection */
  autoStart?: boolean;
}

export interface ShakeCallbacks {
  /** Called when any shake is detected */
  onShake?: (event: ShakeEvent) => void;
  /** Called when a single shake is detected */
  onSingleShake?: (event: ShakeEvent) => void;
  /** Called when a double shake is detected */
  onDoubleShake?: (event: ShakeEvent) => void;
  /** Called when a triple shake is detected */
  onTripleShake?: (event: ShakeEvent) => void;
  /** Called when continuous shaking is detected */
  onContinuousShake?: (event: ShakeEvent) => void;
  /** Called when shake detection starts */
  onDetectionStart?: () => void;
  /** Called when shake detection stops */
  onDetectionStop?: () => void;
}

export interface UseShakeOptions
  extends ShakeDetectionOptions,
    ShakeCallbacks {}

export interface UseShakeReturn {
  // State
  state: ShakeState;
  isSupported: boolean;

  // Actions
  start: () => boolean;
  stop: () => void;
  reset: () => void;

  // Utilities
  getCurrentIntensity: () => number;
  getAverageIntensity: () => number;
  isShaking: () => boolean;

  // Configuration
  setThreshold: (threshold: number) => void;
  setTimeWindow: (timeWindow: number) => void;
}

// Shake detection algorithm
interface ShakeDetection {
  startTime: number;
  endTime: number;
  intensity: number;
  direction: 'x' | 'y' | 'z' | 'multi';
  samples: number;
}

/**
 * Shake Gesture Hook
 * Uses useDeviceMotion internally to detect shake gestures with pattern recognition
 */
export function useShake(options: UseShakeOptions = {}): UseShakeReturn {
  const {
    threshold = 12,
    timeWindow = 1000,
    cooldown = 100,
    minDuration = 50,
    maxDuration = 2000,
    debug = false,
    autoStart = false,
    onShake,
    onSingleShake,
    onDoubleShake,
    onTripleShake,
    onContinuousShake,
    onDetectionStart,
    onDetectionStop,
  } = options;

  // State
  const [state, setState] = useState<ShakeState>({
    isActive: false,
    isDetecting: false,
    lastShake: null,
    shakeCount: 0,
    totalShakes: 0,
  });

  // Configuration state
  const [currentThreshold, setCurrentThreshold] = useState(threshold);
  const [currentTimeWindow, setCurrentTimeWindow] = useState(timeWindow);

  // Refs for shake detection
  const shakeHistoryRef = useRef<ShakeDetection[]>([]);
  const lastShakeTimeRef = useRef<number>(0);
  const currentDetectionRef = useRef<ShakeDetection | null>(null);
  const intensityHistoryRef = useRef<number[]>([]);
  const isDetectingRef = useRef<boolean>(false);

  // Device motion hook
  const deviceMotion = useDeviceMotion({
    debug: debug && false, // Reduce noise in debug logs
    throttle: 16, // ~60fps for responsive shake detection
    onMotionUpdate: handleMotionUpdate,
  });

  // Handle motion data updates
  function handleMotionUpdate(motionData: DeviceMotionData) {
    if (!state.isActive) return;

    const { acceleration } = motionData;
    if (!acceleration.x || !acceleration.y || !acceleration.z) return;

    // Calculate acceleration magnitude
    const magnitude = Math.sqrt(
      acceleration.x * acceleration.x +
        acceleration.y * acceleration.y +
        acceleration.z * acceleration.z
    );

    // Store intensity for averaging
    intensityHistoryRef.current.push(magnitude);
    if (intensityHistoryRef.current.length > 100) {
      intensityHistoryRef.current.shift();
    }

    const now = Date.now();

    // Check if we're in cooldown period
    if (now - lastShakeTimeRef.current < cooldown) {
      return;
    }

    // Check if magnitude exceeds threshold
    if (magnitude > currentThreshold) {
      // Determine primary direction
      const maxAxis = Math.max(
        Math.abs(acceleration.x),
        Math.abs(acceleration.y),
        Math.abs(acceleration.z)
      );
      let direction: 'x' | 'y' | 'z' | 'multi' = 'multi';

      if (Math.abs(acceleration.x) === maxAxis) direction = 'x';
      else if (Math.abs(acceleration.y) === maxAxis) direction = 'y';
      else if (Math.abs(acceleration.z) === maxAxis) direction = 'z';

      // Start new detection or continue existing
      if (!currentDetectionRef.current) {
        currentDetectionRef.current = {
          startTime: now,
          endTime: now,
          intensity: magnitude,
          direction,
          samples: 1,
        };

        if (!isDetectingRef.current) {
          isDetectingRef.current = true;
          setState(prev => ({ ...prev, isDetecting: true }));
          onDetectionStart?.();
        }

        if (debug) {
          console.log('Shake detection started:', currentDetectionRef.current);
        }
      } else {
        // Update existing detection
        currentDetectionRef.current.endTime = now;
        currentDetectionRef.current.intensity = Math.max(
          currentDetectionRef.current.intensity,
          magnitude
        );
        currentDetectionRef.current.samples++;

        // Update direction if we have multi-axis movement
        if (
          currentDetectionRef.current.direction !== direction &&
          direction !== 'multi'
        ) {
          currentDetectionRef.current.direction = 'multi';
        }
      }
    } else if (currentDetectionRef.current) {
      // End of shake detection
      const detection = currentDetectionRef.current;
      const duration = detection.endTime - detection.startTime;

      if (duration >= minDuration && duration <= maxDuration) {
        // Valid shake detected
        const intensity = Math.min(
          1,
          (detection.intensity - currentThreshold) / (30 - currentThreshold)
        );

        const shakeEvent: ShakeEvent = {
          intensity,
          duration,
          timestamp: detection.startTime,
          direction: detection.direction,
          pattern: 'single', // Will be updated by pattern detection
        };

        // Add to history
        shakeHistoryRef.current.push(detection);
        lastShakeTimeRef.current = detection.endTime;

        // Clean old history
        const cutoff = now - currentTimeWindow;
        shakeHistoryRef.current = shakeHistoryRef.current.filter(
          s => s.startTime > cutoff
        );

        // Detect pattern
        const pattern = detectShakePattern(
          shakeHistoryRef.current,
          currentTimeWindow
        );
        shakeEvent.pattern = pattern;

        // Update state
        setState(prev => ({
          ...prev,
          lastShake: shakeEvent,
          shakeCount: shakeHistoryRef.current.length,
          totalShakes: prev.totalShakes + 1,
          isDetecting: false,
        }));

        // Call callbacks
        onShake?.(shakeEvent);

        switch (pattern) {
          case 'single':
            onSingleShake?.(shakeEvent);
            break;
          case 'double':
            onDoubleShake?.(shakeEvent);
            break;
          case 'triple':
            onTripleShake?.(shakeEvent);
            break;
          case 'continuous':
            onContinuousShake?.(shakeEvent);
            break;
        }

        if (debug) {
          console.log('Shake detected:', shakeEvent);
        }
      }

      // Reset detection
      currentDetectionRef.current = null;
      isDetectingRef.current = false;
      onDetectionStop?.();
    }
  }

  // Detect shake patterns
  const detectShakePattern = (
    history: ShakeDetection[],
    window: number
  ): ShakeEvent['pattern'] => {
    if (history.length === 0) return 'single';

    const now = Date.now();
    const recentShakes = history.filter(s => now - s.startTime <= window);

    if (recentShakes.length >= 5) return 'continuous';
    if (recentShakes.length >= 3) return 'triple';
    if (recentShakes.length >= 2) return 'double';
    return 'single';
  };

  // Start shake detection
  const start = useCallback((): boolean => {
    if (!deviceMotion.isSupported) {
      if (debug) {
        console.warn('Device motion not supported, cannot detect shakes');
      }
      return false;
    }

    // Request permission and start device motion
    const started = deviceMotion.start();
    if (started) {
      setState(prev => ({ ...prev, isActive: true }));

      if (debug) {
        console.log('Shake detection started');
      }
    }

    return started;
  }, [deviceMotion, debug]);

  // Stop shake detection
  const stop = useCallback(() => {
    deviceMotion.stop();
    setState(prev => ({ ...prev, isActive: false, isDetecting: false }));

    // Reset detection state
    currentDetectionRef.current = null;
    isDetectingRef.current = false;

    if (debug) {
      console.log('Shake detection stopped');
    }
  }, [deviceMotion, debug]);

  // Reset shake detection
  const reset = useCallback(() => {
    shakeHistoryRef.current = [];
    intensityHistoryRef.current = [];
    lastShakeTimeRef.current = 0;
    currentDetectionRef.current = null;
    isDetectingRef.current = false;

    setState(prev => ({
      ...prev,
      lastShake: null,
      shakeCount: 0,
      totalShakes: 0,
      isDetecting: false,
    }));

    if (debug) {
      console.log('Shake detection reset');
    }
  }, [debug]);

  // Get current shake intensity
  const getCurrentIntensity = useCallback((): number => {
    if (intensityHistoryRef.current.length === 0) return 0;
    return (
      intensityHistoryRef.current[intensityHistoryRef.current.length - 1] || 0
    );
  }, []);

  // Get average intensity
  const getAverageIntensity = useCallback((): number => {
    if (intensityHistoryRef.current.length === 0) return 0;
    const sum = intensityHistoryRef.current.reduce((a, b) => a + b, 0);
    return sum / intensityHistoryRef.current.length;
  }, []);

  // Check if currently shaking
  const isShaking = useCallback((): boolean => {
    return state.isDetecting || currentDetectionRef.current !== null;
  }, [state.isDetecting]);

  // Set threshold
  const setThreshold = useCallback((newThreshold: number) => {
    setCurrentThreshold(Math.max(1, Math.min(50, newThreshold)));
  }, []);

  // Set time window
  const setTimeWindow = useCallback((newTimeWindow: number) => {
    setCurrentTimeWindow(Math.max(100, Math.min(5000, newTimeWindow)));
  }, []);

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && deviceMotion.isSupported) {
      // Request permission first if needed
      if (deviceMotion.state.hasPermission === null) {
        deviceMotion.requestPermission().then(granted => {
          if (granted) {
            start();
          }
        });
      } else if (deviceMotion.state.hasPermission) {
        start();
      }
    }
  }, [autoStart, deviceMotion, start]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    // State
    state,
    isSupported: deviceMotion.isSupported,

    // Actions
    start,
    stop,
    reset,

    // Utilities
    getCurrentIntensity,
    getAverageIntensity,
    isShaking,

    // Configuration
    setThreshold,
    setTimeWindow,
  };
}

// Utility functions
export const ShakeUtils = {
  /**
   * Calculate optimal threshold based on device type
   */
  getOptimalThreshold: (
    deviceType: 'mobile' | 'tablet' | 'desktop' = 'mobile'
  ): number => {
    switch (deviceType) {
      case 'mobile':
        return 15;
      case 'tablet':
        return 12;
      case 'desktop':
        return 20;
      default:
        return 12;
    }
  },

  /**
   * Get recommended settings for different use cases
   */
  getPresets: () => ({
    gentle: { threshold: 8, timeWindow: 1500, cooldown: 200 },
    normal: { threshold: 12, timeWindow: 1000, cooldown: 100 },
    aggressive: { threshold: 20, timeWindow: 800, cooldown: 50 },
    gaming: { threshold: 15, timeWindow: 500, cooldown: 25 },
    accessibility: { threshold: 6, timeWindow: 2000, cooldown: 300 },
  }),

  /**
   * Calibrate threshold based on user testing
   */
  calibrateThreshold: (
    testShakes: number[],
    targetSensitivity: number = 0.7
  ): number => {
    if (testShakes.length === 0) return 12;

    const sorted = [...testShakes].sort((a, b) => a - b);
    const index = Math.floor(sorted.length * (1 - targetSensitivity));
    return Math.max(5, Math.min(25, sorted[index] || 12));
  },

  /**
   * Analyze shake patterns
   */
  analyzePattern: (
    shakes: ShakeEvent[]
  ): {
    averageIntensity: number;
    averageDuration: number;
    mostCommonDirection: string;
    mostCommonPattern: string;
  } => {
    if (shakes.length === 0) {
      return {
        averageIntensity: 0,
        averageDuration: 0,
        mostCommonDirection: 'multi',
        mostCommonPattern: 'single',
      };
    }

    const avgIntensity =
      shakes.reduce((sum, s) => sum + s.intensity, 0) / shakes.length;
    const avgDuration =
      shakes.reduce((sum, s) => sum + s.duration, 0) / shakes.length;

    // Find most common direction
    const directions = shakes.reduce(
      (acc, s) => {
        acc[s.direction] = (acc[s.direction] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const mostCommonDirection =
      Object.entries(directions).sort(([, a], [, b]) => b - a)[0]?.[0] ||
      'multi';

    // Find most common pattern
    const patterns = shakes.reduce(
      (acc, s) => {
        acc[s.pattern] = (acc[s.pattern] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const mostCommonPattern =
      Object.entries(patterns).sort(([, a], [, b]) => b - a)[0]?.[0] ||
      'single';

    return {
      averageIntensity: avgIntensity,
      averageDuration: avgDuration,
      mostCommonDirection,
      mostCommonPattern,
    };
  },

  /**
   * Get usage best practices
   */
  getBestPractices: () => [
    'Test shake sensitivity on actual devices',
    'Provide visual feedback when shake is detected',
    'Allow users to adjust sensitivity settings',
    'Implement cooldown periods to prevent false positives',
    'Consider battery impact of continuous motion monitoring',
    'Provide alternative input methods for accessibility',
    'Handle permission requests gracefully',
  ],

  /**
   * Get common use cases
   */
  getUseCases: () => ({
    'Undo Action': 'Single shake to undo last action',
    'Refresh Content': 'Double shake to refresh current view',
    'Emergency Alert': 'Triple shake to trigger emergency features',
    'Game Controls': 'Continuous shake for game interactions',
    Navigation: 'Shake to return to home screen',
    'Content Discovery': 'Shake to discover new content',
    Accessibility: 'Shake as alternative to complex gestures',
  }),
};

export default useShake;
