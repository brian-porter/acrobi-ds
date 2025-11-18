/**
 * useDeviceOrientation Hook
 * Epic 46 - AAE Device Orientation & Motion Toolkit
 *
 * Comprehensive device orientation and motion detection hook with DeviceOrientationEvent API,
 * motion tracking, compass heading, screen orientation, and gesture recognition.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// Types
export interface DeviceOrientationOptions {
  // Sensor options
  includeGravity?: boolean;
  frequencyHz?: number;
  enableCalibration?: boolean;
  enableNoiseFiltering?: boolean;

  // Motion detection
  enableMotionDetection?: boolean;
  motionThreshold?: number; // m/s²
  accelerationThreshold?: number; // m/s²

  // Shake detection
  enableShakeDetection?: boolean;
  shakeThreshold?: number; // m/s²
  shakeDuration?: number; // ms
  shakeCount?: number; // number of shakes required

  // Gesture recognition
  enableGestureRecognition?: boolean;
  tiltThreshold?: number; // degrees
  rotationThreshold?: number; // degrees/s

  // Screen orientation
  trackScreenOrientation?: boolean;

  // Callbacks
  onOrientationChange?: (orientation: DeviceOrientationData) => void;
  onMotionDetected?: (motion: DeviceMotionData) => void;
  onShakeDetected?: (shakeEvent: ShakeEvent) => void;
  onGestureDetected?: (gesture: GestureEvent) => void;
  onScreenOrientationChange?: (orientation: ScreenOrientationData) => void;
  onCalibrationComplete?: (calibration: CalibrationData) => void;
  onError?: (error: DeviceOrientationError) => void;
}

export interface DeviceOrientationData {
  // Device orientation (DeviceOrientationEvent)
  alpha: number | null; // Z axis rotation (0-360°)
  beta: number | null; // X axis rotation (-180 to 180°)
  gamma: number | null; // Y axis rotation (-90 to 90°)
  absolute: boolean; // Is compass-calibrated

  // Processed orientation
  heading: number | null; // Compass heading (0-360°)
  tilt: number | null; // Device tilt angle
  roll: number | null; // Device roll angle

  // Timestamp
  timestamp: number;
}

export interface DeviceMotionData {
  // Acceleration (DeviceMotionEvent)
  acceleration: {
    x: number | null;
    y: number | null;
    z: number | null;
  };

  // Acceleration including gravity
  accelerationIncludingGravity: {
    x: number | null;
    y: number | null;
    z: number | null;
  };

  // Rotation rate
  rotationRate: {
    alpha: number | null; // Z axis
    beta: number | null; // X axis
    gamma: number | null; // Y axis
  };

  // Processed motion
  totalAcceleration: number;
  movementDirection: string | null;
  isMoving: boolean;

  // Timestamp
  timestamp: number;
  interval: number;
}

export interface ScreenOrientationData {
  angle: number; // 0, 90, 180, 270
  type: string; // portrait-primary, landscape-primary, etc.
  isPortrait: boolean;
  isLandscape: boolean;
  timestamp: number;
}

export interface ShakeEvent {
  intensity: number; // Shake intensity (0-1)
  duration: number; // Total shake duration
  shakeCount: number; // Number of shake movements
  timestamp: number;
}

export interface GestureEvent {
  type:
    | 'tilt-left'
    | 'tilt-right'
    | 'tilt-forward'
    | 'tilt-backward'
    | 'rotate-cw'
    | 'rotate-ccw'
    | 'flip';
  intensity: number; // Gesture intensity (0-1)
  duration: number; // Gesture duration
  data: any; // Additional gesture data
  timestamp: number;
}

export interface CalibrationData {
  compassOffset: number;
  accelerometerBias: { x: number; y: number; z: number };
  gyroscopeBias: { x: number; y: number; z: number };
  isCalibrated: boolean;
  calibrationAccuracy: number; // 0-1
  timestamp: number;
}

export interface DeviceOrientationState {
  // Feature support
  isOrientationSupported: boolean;
  isMotionSupported: boolean;
  isCompassSupported: boolean;
  isScreenOrientationSupported: boolean;

  // Permissions
  hasOrientationPermission: boolean;
  hasMotionPermission: boolean;

  // Status
  isActive: boolean;
  isCalibrating: boolean;
  isCalibrated: boolean;

  // Current data
  orientation: DeviceOrientationData | null;
  motion: DeviceMotionData | null;
  screenOrientation: ScreenOrientationData | null;
  calibration: CalibrationData | null;

  // Sensor status
  sensorAccuracy: 'high' | 'medium' | 'low' | 'unreliable';
  lastUpdateTime: number | null;
}

export interface DeviceOrientationError {
  type: 'permission' | 'not-supported' | 'sensor' | 'calibration' | 'security';
  message: string;
  originalError?: Error;
}

export interface UseDeviceOrientationReturn {
  // State
  state: DeviceOrientationState;
  error: DeviceOrientationError | null;

  // Controls
  start: () => Promise<boolean>;
  stop: () => void;
  calibrate: () => Promise<boolean>;
  resetCalibration: () => void;

  // Permissions
  requestPermissions: () => Promise<boolean>;
  checkPermissions: () => Promise<{ orientation: boolean; motion: boolean }>;

  // Data access
  getCurrentOrientation: () => DeviceOrientationData | null;
  getCurrentMotion: () => DeviceMotionData | null;
  getCurrentScreenOrientation: () => ScreenOrientationData | null;

  // Utilities
  getCompassHeading: () => number | null;
  getTiltAngle: () => number | null;
  isDeviceFlat: () => boolean;
  isDeviceUpright: () => boolean;
  getMovementIntensity: () => number;

  // Gesture detection
  enableGesture: (gesture: string) => void;
  disableGesture: (gesture: string) => void;
  getActiveGestures: () => string[];

  // Screen orientation
  lockOrientation: (orientation: OrientationLockType) => Promise<boolean>;
  unlockOrientation: () => Promise<boolean>;

  // Calibration helpers
  isCompassAccurate: () => boolean;
  getSensorAccuracy: () => 'high' | 'medium' | 'low' | 'unreliable';

  // Data filtering
  enableNoiseFilter: (enabled: boolean) => void;
  setUpdateFrequency: (hz: number) => void;
}

// Default configuration
const DEFAULT_OPTIONS: Required<DeviceOrientationOptions> = {
  includeGravity: true,
  frequencyHz: 60,
  enableCalibration: true,
  enableNoiseFiltering: true,
  enableMotionDetection: true,
  motionThreshold: 0.5,
  accelerationThreshold: 1.0,
  enableShakeDetection: true,
  shakeThreshold: 15.0,
  shakeDuration: 1000,
  shakeCount: 2,
  enableGestureRecognition: true,
  tiltThreshold: 30,
  rotationThreshold: 90,
  trackScreenOrientation: true,
  onOrientationChange: () => {},
  onMotionDetected: () => {},
  onShakeDetected: () => {},
  onGestureDetected: () => {},
  onScreenOrientationChange: () => {},
  onCalibrationComplete: () => {},
  onError: () => {},
};

// Utility functions
const isDeviceOrientationSupported = (): boolean => {
  return typeof window !== 'undefined' && 'DeviceOrientationEvent' in window;
};

const isDeviceMotionSupported = (): boolean => {
  return typeof window !== 'undefined' && 'DeviceMotionEvent' in window;
};

const isScreenOrientationSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    'screen' in window &&
    'orientation' in screen
  );
};

const calculateTotalAcceleration = (acc: {
  x: number | null;
  y: number | null;
  z: number | null;
}): number => {
  const x = acc.x || 0;
  const y = acc.y || 0;
  const z = acc.z || 0;
  return Math.sqrt(x * x + y * y + z * z);
};

const normalizeAngle = (angle: number): number => {
  while (angle < 0) angle += 360;
  while (angle >= 360) angle -= 360;
  return angle;
};

const calculateCompassHeading = (
  alpha: number | null,
  absolute: boolean
): number | null => {
  if (alpha === null) return null;
  return absolute ? normalizeAngle(360 - alpha) : null;
};

const calculateTilt = (
  beta: number | null,
  gamma: number | null
): number | null => {
  if (beta === null || gamma === null) return null;
  return Math.sqrt(beta * beta + gamma * gamma);
};

const applyNoiseFilter = (
  value: number,
  previousValue: number,
  threshold: number = 0.1
): number => {
  const diff = Math.abs(value - previousValue);
  return diff < threshold ? previousValue : value;
};

// Noise filtering class
class NoiseFilter {
  private history: number[] = [];
  private readonly windowSize: number;
  private readonly threshold: number;

  constructor(windowSize: number = 5, threshold: number = 0.1) {
    this.windowSize = windowSize;
    this.threshold = threshold;
  }

  filter(value: number): number {
    this.history.push(value);
    if (this.history.length > this.windowSize) {
      this.history.shift();
    }

    // Calculate moving average
    const average =
      this.history.reduce((sum, val) => sum + val, 0) / this.history.length;

    // Apply threshold filter
    const diff = Math.abs(value - average);
    return diff < this.threshold ? average : value;
  }

  reset(): void {
    this.history = [];
  }
}

// Shake detection class
class ShakeDetector {
  private shakeHistory: number[] = [];
  private lastShakeTime: number = 0;
  private shakeCount: number = 0;
  private readonly threshold: number;
  private readonly duration: number;
  private readonly requiredCount: number;

  constructor(
    threshold: number = 15.0,
    duration: number = 1000,
    requiredCount: number = 2
  ) {
    this.threshold = threshold;
    this.duration = duration;
    this.requiredCount = requiredCount;
  }

  detect(acceleration: number): ShakeEvent | null {
    const now = Date.now();

    if (acceleration > this.threshold) {
      if (now - this.lastShakeTime > 100) {
        // Minimum 100ms between shakes
        this.shakeCount++;
        this.lastShakeTime = now;
        this.shakeHistory.push(now);
      }
    }

    // Clean old shake history
    this.shakeHistory = this.shakeHistory.filter(
      time => now - time < this.duration
    );
    this.shakeCount = this.shakeHistory.length;

    // Check if shake threshold is met
    if (this.shakeCount >= this.requiredCount) {
      const intensity = Math.min(acceleration / (this.threshold * 2), 1);
      const shakeDuration = now - this.shakeHistory[0];

      // Reset detector
      this.shakeHistory = [];
      this.shakeCount = 0;

      return {
        intensity,
        duration: shakeDuration,
        shakeCount: this.requiredCount,
        timestamp: now,
      };
    }

    return null;
  }

  reset(): void {
    this.shakeHistory = [];
    this.shakeCount = 0;
    this.lastShakeTime = 0;
  }
}

// Gesture detection class
class GestureDetector {
  private gestureThreshold: { tilt: number; rotation: number };
  private previousOrientation: DeviceOrientationData | null = null;
  private gestureStartTime: number = 0;
  private gestureInProgress: boolean = false;

  constructor(tiltThreshold: number = 30, rotationThreshold: number = 90) {
    this.gestureThreshold = {
      tilt: tiltThreshold,
      rotation: rotationThreshold,
    };
  }

  detect(orientation: DeviceOrientationData): GestureEvent | null {
    if (!this.previousOrientation) {
      this.previousOrientation = orientation;
      return null;
    }

    const now = Date.now();
    const prev = this.previousOrientation;

    // Calculate deltas
    const deltaBeta =
      orientation.beta !== null && prev.beta !== null
        ? Math.abs(orientation.beta - prev.beta)
        : 0;
    const deltaGamma =
      orientation.gamma !== null && prev.gamma !== null
        ? Math.abs(orientation.gamma - prev.gamma)
        : 0;
    const deltaAlpha =
      orientation.alpha !== null && prev.alpha !== null
        ? Math.abs(orientation.alpha - prev.alpha)
        : 0;

    // Detect tilt gestures
    if (deltaBeta > this.gestureThreshold.tilt) {
      const type =
        orientation.beta! > prev.beta! ? 'tilt-forward' : 'tilt-backward';
      const intensity = Math.min(
        deltaBeta / (this.gestureThreshold.tilt * 2),
        1
      );

      this.previousOrientation = orientation;
      return {
        type,
        intensity,
        duration: now - this.gestureStartTime,
        data: { deltaBeta },
        timestamp: now,
      };
    }

    if (deltaGamma > this.gestureThreshold.tilt) {
      const type =
        orientation.gamma! > prev.gamma! ? 'tilt-right' : 'tilt-left';
      const intensity = Math.min(
        deltaGamma / (this.gestureThreshold.tilt * 2),
        1
      );

      this.previousOrientation = orientation;
      return {
        type,
        intensity,
        duration: now - this.gestureStartTime,
        data: { deltaGamma },
        timestamp: now,
      };
    }

    // Detect rotation gestures
    if (deltaAlpha > this.gestureThreshold.rotation) {
      const type =
        orientation.alpha! > prev.alpha! ? 'rotate-cw' : 'rotate-ccw';
      const intensity = Math.min(
        deltaAlpha / (this.gestureThreshold.rotation * 2),
        1
      );

      this.previousOrientation = orientation;
      return {
        type,
        intensity,
        duration: now - this.gestureStartTime,
        data: { deltaAlpha },
        timestamp: now,
      };
    }

    // Detect flip gesture (180° beta change)
    if (orientation.beta !== null && prev.beta !== null) {
      const betaDiff = Math.abs(orientation.beta - prev.beta);
      if (betaDiff > 160 && betaDiff < 200) {
        this.previousOrientation = orientation;
        return {
          type: 'flip',
          intensity: 1,
          duration: now - this.gestureStartTime,
          data: { betaDiff },
          timestamp: now,
        };
      }
    }

    this.previousOrientation = orientation;
    return null;
  }

  reset(): void {
    this.previousOrientation = null;
    this.gestureStartTime = Date.now();
    this.gestureInProgress = false;
  }
}

export function useDeviceOrientation(
  options: DeviceOrientationOptions = {}
): UseDeviceOrientationReturn {
  const config = { ...DEFAULT_OPTIONS, ...options };

  // State
  const [state, setState] = useState<DeviceOrientationState>({
    isOrientationSupported: isDeviceOrientationSupported(),
    isMotionSupported: isDeviceMotionSupported(),
    isCompassSupported: false,
    isScreenOrientationSupported: isScreenOrientationSupported(),
    hasOrientationPermission: false,
    hasMotionPermission: false,
    isActive: false,
    isCalibrating: false,
    isCalibrated: false,
    orientation: null,
    motion: null,
    screenOrientation: null,
    calibration: null,
    sensorAccuracy: 'unreliable',
    lastUpdateTime: null,
  });

  const [error, setError] = useState<DeviceOrientationError | null>(null);

  // Refs for sensors and filters
  const orientationListenerRef = useRef<
    ((event: DeviceOrientationEvent) => void) | null
  >(null);
  const motionListenerRef = useRef<((event: DeviceMotionEvent) => void) | null>(
    null
  );
  const screenOrientationListenerRef = useRef<(() => void) | null>(null);
  const noiseFiltersRef = useRef<{ [key: string]: NoiseFilter }>({});
  const shakeDetectorRef = useRef<ShakeDetector | null>(null);
  const gestureDetectorRef = useRef<GestureDetector | null>(null);
  const calibrationRef = useRef<CalibrationData | null>(null);
  const activeGesturesRef = useRef<Set<string>>(new Set());
  const updateFrequencyRef = useRef<number>(config.frequencyHz);
  const lastUpdateRef = useRef<number>(0);

  // Initialize detectors
  useEffect(() => {
    if (config.enableShakeDetection) {
      shakeDetectorRef.current = new ShakeDetector(
        config.shakeThreshold,
        config.shakeDuration,
        config.shakeCount
      );
    }

    if (config.enableGestureRecognition) {
      gestureDetectorRef.current = new GestureDetector(
        config.tiltThreshold,
        config.rotationThreshold
      );
    }

    // Initialize noise filters
    if (config.enableNoiseFiltering) {
      noiseFiltersRef.current = {
        alpha: new NoiseFilter(),
        beta: new NoiseFilter(),
        gamma: new NoiseFilter(),
        accelerationX: new NoiseFilter(),
        accelerationY: new NoiseFilter(),
        accelerationZ: new NoiseFilter(),
        rotationAlpha: new NoiseFilter(),
        rotationBeta: new NoiseFilter(),
        rotationGamma: new NoiseFilter(),
      };
    }
  }, [config]);

  // Error handling
  const handleError = useCallback(
    (
      type: DeviceOrientationError['type'],
      message: string,
      originalError?: Error
    ) => {
      const orientationError: DeviceOrientationError = {
        type,
        message,
        originalError,
      };
      setError(orientationError);
      config.onError(orientationError);
    },
    [config]
  );

  // Permission management
  const requestPermissions = useCallback(async (): Promise<boolean> => {
    if (!state.isOrientationSupported && !state.isMotionSupported) {
      handleError(
        'not-supported',
        'Device orientation and motion are not supported'
      );
      return false;
    }

    try {
      setError(null);
      let orientationPermission = true;
      let motionPermission = true;

      // Request DeviceOrientationEvent permission (iOS 13+)
      if (
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        try {
          const permission = await (
            DeviceOrientationEvent as any
          ).requestPermission();
          orientationPermission = permission === 'granted';
        } catch (err) {
          handleError(
            'permission',
            'Failed to request device orientation permission',
            err as Error
          );
          orientationPermission = false;
        }
      }

      // Request DeviceMotionEvent permission (iOS 13+)
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        try {
          const permission = await (
            DeviceMotionEvent as any
          ).requestPermission();
          motionPermission = permission === 'granted';
        } catch (err) {
          handleError(
            'permission',
            'Failed to request device motion permission',
            err as Error
          );
          motionPermission = false;
        }
      }

      setState(prev => ({
        ...prev,
        hasOrientationPermission: orientationPermission,
        hasMotionPermission: motionPermission,
      }));

      return orientationPermission || motionPermission;
    } catch (err) {
      handleError('permission', 'Failed to request permissions', err as Error);
      return false;
    }
  }, [state.isOrientationSupported, state.isMotionSupported, handleError]);

  // Check current permissions
  const checkPermissions = useCallback(async (): Promise<{
    orientation: boolean;
    motion: boolean;
  }> => {
    // For browsers that don't require explicit permission, assume granted
    let orientationPermission = true;
    let motionPermission = true;

    // Check iOS 13+ permission status
    if (
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        orientationPermission = false; // Assume denied until proven otherwise
      } catch (err) {
        // Permission API not available, assume granted
      }
    }

    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      try {
        motionPermission = false; // Assume denied until proven otherwise
      } catch (err) {
        // Permission API not available, assume granted
      }
    }

    setState(prev => ({
      ...prev,
      hasOrientationPermission: orientationPermission,
      hasMotionPermission: motionPermission,
    }));

    return { orientation: orientationPermission, motion: motionPermission };
  }, []);

  // Apply noise filtering
  const applyNoiseFiltering = useCallback(
    (key: string, value: number | null): number | null => {
      if (!config.enableNoiseFiltering || value === null) return value;

      const filter = noiseFiltersRef.current[key];
      return filter ? filter.filter(value) : value;
    },
    [config.enableNoiseFiltering]
  );

  // Process device orientation data
  const processOrientationData = useCallback(
    (event: DeviceOrientationEvent): DeviceOrientationData => {
      const now = Date.now();

      // Apply frequency throttling
      if (now - lastUpdateRef.current < 1000 / updateFrequencyRef.current) {
        return state.orientation!;
      }
      lastUpdateRef.current = now;

      // Apply noise filtering
      const alpha = applyNoiseFiltering('alpha', event.alpha);
      const beta = applyNoiseFiltering('beta', event.beta);
      const gamma = applyNoiseFiltering('gamma', event.gamma);

      // Calculate processed values
      const heading = calculateCompassHeading(alpha, event.absolute);
      const tilt = calculateTilt(beta, gamma);
      const roll = gamma;

      // Apply calibration if available
      let calibratedAlpha = alpha;
      if (calibrationRef.current && alpha !== null) {
        calibratedAlpha = normalizeAngle(
          alpha - calibrationRef.current.compassOffset
        );
      }

      return {
        alpha: calibratedAlpha,
        beta,
        gamma,
        absolute: event.absolute,
        heading: calculateCompassHeading(calibratedAlpha, event.absolute),
        tilt,
        roll,
        timestamp: now,
      };
    },
    [state.orientation, applyNoiseFiltering]
  );

  // Process device motion data
  const processMotionData = useCallback(
    (event: DeviceMotionEvent): DeviceMotionData => {
      const now = Date.now();

      // Apply frequency throttling
      if (now - lastUpdateRef.current < 1000 / updateFrequencyRef.current) {
        return state.motion!;
      }

      const acc = event.acceleration || { x: null, y: null, z: null };
      const accGrav = event.accelerationIncludingGravity || {
        x: null,
        y: null,
        z: null,
      };
      const rotation = event.rotationRate || {
        alpha: null,
        beta: null,
        gamma: null,
      };

      // Apply noise filtering
      const filteredAcc = {
        x: applyNoiseFiltering('accelerationX', acc.x),
        y: applyNoiseFiltering('accelerationY', acc.y),
        z: applyNoiseFiltering('accelerationZ', acc.z),
      };

      const filteredRotation = {
        alpha: applyNoiseFiltering('rotationAlpha', rotation.alpha),
        beta: applyNoiseFiltering('rotationBeta', rotation.beta),
        gamma: applyNoiseFiltering('rotationGamma', rotation.gamma),
      };

      // Calculate total acceleration
      const totalAcceleration = calculateTotalAcceleration(filteredAcc);

      // Determine movement
      const isMoving = totalAcceleration > config.motionThreshold;
      const movementDirection = isMoving ? 'unknown' : null; // Could be enhanced with direction detection

      return {
        acceleration: filteredAcc,
        accelerationIncludingGravity: accGrav,
        rotationRate: filteredRotation,
        totalAcceleration,
        movementDirection,
        isMoving,
        timestamp: now,
        interval: event.interval || 16.67,
      };
    },
    [state.motion, config.motionThreshold, applyNoiseFiltering]
  );

  // Start orientation tracking
  const start = useCallback(async (): Promise<boolean> => {
    if (state.isActive) return true;

    // Check permissions first
    const permissions = await checkPermissions();
    if (!permissions.orientation && !permissions.motion) {
      const granted = await requestPermissions();
      if (!granted) {
        handleError('permission', 'Device orientation permissions not granted');
        return false;
      }
    }

    try {
      setError(null);

      // Device orientation listener
      if (
        state.isOrientationSupported &&
        (state.hasOrientationPermission || permissions.orientation)
      ) {
        orientationListenerRef.current = (event: DeviceOrientationEvent) => {
          const orientationData = processOrientationData(event);

          setState(prev => ({
            ...prev,
            orientation: orientationData,
            isCompassSupported: event.absolute,
            lastUpdateTime: Date.now(),
            sensorAccuracy: event.absolute ? 'high' : 'medium',
          }));

          config.onOrientationChange(orientationData);

          // Gesture detection
          if (config.enableGestureRecognition && gestureDetectorRef.current) {
            const gesture = gestureDetectorRef.current.detect(orientationData);
            if (gesture && activeGesturesRef.current.has(gesture.type)) {
              config.onGestureDetected(gesture);
            }
          }
        };

        window.addEventListener(
          'deviceorientation',
          orientationListenerRef.current,
          { passive: true }
        );
      }

      // Device motion listener
      if (
        state.isMotionSupported &&
        (state.hasMotionPermission || permissions.motion)
      ) {
        motionListenerRef.current = (event: DeviceMotionEvent) => {
          const motionData = processMotionData(event);

          setState(prev => ({
            ...prev,
            motion: motionData,
            lastUpdateTime: Date.now(),
          }));

          config.onMotionDetected(motionData);

          // Shake detection
          if (config.enableShakeDetection && shakeDetectorRef.current) {
            const shake = shakeDetectorRef.current.detect(
              motionData.totalAcceleration
            );
            if (shake) {
              config.onShakeDetected(shake);
            }
          }
        };

        window.addEventListener('devicemotion', motionListenerRef.current, {
          passive: true,
        });
      }

      // Screen orientation listener
      if (config.trackScreenOrientation && state.isScreenOrientationSupported) {
        const updateScreenOrientation = () => {
          const orientation = screen.orientation;
          const screenOrientationData: ScreenOrientationData = {
            angle: orientation.angle,
            type: orientation.type,
            isPortrait: orientation.type.includes('portrait'),
            isLandscape: orientation.type.includes('landscape'),
            timestamp: Date.now(),
          };

          setState(prev => ({
            ...prev,
            screenOrientation: screenOrientationData,
          }));
          config.onScreenOrientationChange(screenOrientationData);
        };

        screenOrientationListenerRef.current = updateScreenOrientation;
        screen.orientation.addEventListener('change', updateScreenOrientation);

        // Initial screen orientation
        updateScreenOrientation();
      }

      setState(prev => ({ ...prev, isActive: true }));
      return true;
    } catch (err) {
      handleError(
        'sensor',
        'Failed to start device orientation tracking',
        err as Error
      );
      return false;
    }
  }, [
    state.isActive,
    state.isOrientationSupported,
    state.isMotionSupported,
    state.isScreenOrientationSupported,
    state.hasOrientationPermission,
    state.hasMotionPermission,
    config,
    checkPermissions,
    requestPermissions,
    processOrientationData,
    processMotionData,
    handleError,
  ]);

  // Stop orientation tracking
  const stop = useCallback(() => {
    if (!state.isActive) return;

    // Remove event listeners
    if (orientationListenerRef.current) {
      window.removeEventListener(
        'deviceorientation',
        orientationListenerRef.current
      );
      orientationListenerRef.current = null;
    }

    if (motionListenerRef.current) {
      window.removeEventListener('devicemotion', motionListenerRef.current);
      motionListenerRef.current = null;
    }

    if (
      screenOrientationListenerRef.current &&
      state.isScreenOrientationSupported
    ) {
      screen.orientation.removeEventListener(
        'change',
        screenOrientationListenerRef.current
      );
      screenOrientationListenerRef.current = null;
    }

    // Reset detectors
    if (shakeDetectorRef.current) {
      shakeDetectorRef.current.reset();
    }

    if (gestureDetectorRef.current) {
      gestureDetectorRef.current.reset();
    }

    setState(prev => ({
      ...prev,
      isActive: false,
      orientation: null,
      motion: null,
    }));
  }, [state.isActive, state.isScreenOrientationSupported]);

  // Calibration
  const calibrate = useCallback(async (): Promise<boolean> => {
    if (!state.isActive || !state.orientation) {
      handleError(
        'calibration',
        'Cannot calibrate while device orientation is not active'
      );
      return false;
    }

    setState(prev => ({ ...prev, isCalibrating: true }));

    try {
      // Simple compass calibration - in a real implementation, this would involve
      // asking the user to rotate the device in a figure-8 pattern
      const compassOffset = state.orientation.alpha || 0;

      const calibrationData: CalibrationData = {
        compassOffset,
        accelerometerBias: { x: 0, y: 0, z: 0 },
        gyroscopeBias: { x: 0, y: 0, z: 0 },
        isCalibrated: true,
        calibrationAccuracy: 0.8, // Mock accuracy
        timestamp: Date.now(),
      };

      calibrationRef.current = calibrationData;

      setState(prev => ({
        ...prev,
        isCalibrating: false,
        isCalibrated: true,
        calibration: calibrationData,
        sensorAccuracy: 'high',
      }));

      config.onCalibrationComplete(calibrationData);
      return true;
    } catch (err) {
      handleError(
        'calibration',
        'Failed to calibrate device sensors',
        err as Error
      );
      setState(prev => ({ ...prev, isCalibrating: false }));
      return false;
    }
  }, [state.isActive, state.orientation, config, handleError]);

  // Reset calibration
  const resetCalibration = useCallback(() => {
    calibrationRef.current = null;
    setState(prev => ({
      ...prev,
      isCalibrated: false,
      calibration: null,
      sensorAccuracy: state.orientation?.absolute ? 'medium' : 'low',
    }));
  }, [state.orientation]);

  // Data access methods
  const getCurrentOrientation = useCallback(
    () => state.orientation,
    [state.orientation]
  );
  const getCurrentMotion = useCallback(() => state.motion, [state.motion]);
  const getCurrentScreenOrientation = useCallback(
    () => state.screenOrientation,
    [state.screenOrientation]
  );

  // Utility methods
  const getCompassHeading = useCallback(
    () => state.orientation?.heading || null,
    [state.orientation]
  );
  const getTiltAngle = useCallback(
    () => state.orientation?.tilt || null,
    [state.orientation]
  );

  const isDeviceFlat = useCallback(() => {
    if (!state.orientation || state.orientation.beta === null) return false;
    return Math.abs(state.orientation.beta) < 10; // Within 10 degrees of flat
  }, [state.orientation]);

  const isDeviceUpright = useCallback(() => {
    if (!state.orientation || state.orientation.gamma === null) return false;
    return Math.abs(state.orientation.gamma) < 10; // Within 10 degrees of upright
  }, [state.orientation]);

  const getMovementIntensity = useCallback(() => {
    return state.motion?.totalAcceleration || 0;
  }, [state.motion]);

  // Gesture management
  const enableGesture = useCallback((gesture: string) => {
    activeGesturesRef.current.add(gesture);
  }, []);

  const disableGesture = useCallback((gesture: string) => {
    activeGesturesRef.current.delete(gesture);
  }, []);

  const getActiveGestures = useCallback(() => {
    return Array.from(activeGesturesRef.current);
  }, []);

  // Screen orientation controls
  const lockOrientation = useCallback(
    async (orientation: OrientationLockType): Promise<boolean> => {
      if (!state.isScreenOrientationSupported) return false;

      try {
        await screen.orientation.lock(orientation);
        return true;
      } catch (err) {
        handleError(
          'sensor',
          'Failed to lock screen orientation',
          err as Error
        );
        return false;
      }
    },
    [state.isScreenOrientationSupported, handleError]
  );

  const unlockOrientation = useCallback(async (): Promise<boolean> => {
    if (!state.isScreenOrientationSupported) return false;

    try {
      screen.orientation.unlock();
      return true;
    } catch (err) {
      handleError(
        'sensor',
        'Failed to unlock screen orientation',
        err as Error
      );
      return false;
    }
  }, [state.isScreenOrientationSupported, handleError]);

  // Calibration helpers
  const isCompassAccurate = useCallback(() => {
    return (
      state.isCalibrated && (state.calibration?.calibrationAccuracy || 0) > 0.7
    );
  }, [state.isCalibrated, state.calibration]);

  const getSensorAccuracy = useCallback(
    () => state.sensorAccuracy,
    [state.sensorAccuracy]
  );

  // Data filtering controls
  const enableNoiseFilter = useCallback((enabled: boolean) => {
    if (enabled && !noiseFiltersRef.current.alpha) {
      // Initialize filters
      noiseFiltersRef.current = {
        alpha: new NoiseFilter(),
        beta: new NoiseFilter(),
        gamma: new NoiseFilter(),
        accelerationX: new NoiseFilter(),
        accelerationY: new NoiseFilter(),
        accelerationZ: new NoiseFilter(),
        rotationAlpha: new NoiseFilter(),
        rotationBeta: new NoiseFilter(),
        rotationGamma: new NoiseFilter(),
      };
    } else if (!enabled) {
      // Reset filters
      Object.values(noiseFiltersRef.current).forEach(filter => filter.reset());
    }
  }, []);

  const setUpdateFrequency = useCallback((hz: number) => {
    updateFrequencyRef.current = Math.max(1, Math.min(hz, 60)); // Clamp between 1-60 Hz
  }, []);

  // Initialize default gestures
  useEffect(() => {
    if (config.enableGestureRecognition) {
      activeGesturesRef.current = new Set([
        'tilt-left',
        'tilt-right',
        'tilt-forward',
        'tilt-backward',
        'rotate-cw',
        'rotate-ccw',
        'flip',
      ]);
    }
  }, [config.enableGestureRecognition]);

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

    // Controls
    start,
    stop,
    calibrate,
    resetCalibration,

    // Permissions
    requestPermissions,
    checkPermissions,

    // Data access
    getCurrentOrientation,
    getCurrentMotion,
    getCurrentScreenOrientation,

    // Utilities
    getCompassHeading,
    getTiltAngle,
    isDeviceFlat,
    isDeviceUpright,
    getMovementIntensity,

    // Gesture detection
    enableGesture,
    disableGesture,
    getActiveGestures,

    // Screen orientation
    lockOrientation,
    unlockOrientation,

    // Calibration helpers
    isCompassAccurate,
    getSensorAccuracy,

    // Data filtering
    enableNoiseFilter,
    setUpdateFrequency,
  };
}
