import { useState, useEffect, useCallback, useRef } from 'react';

// Types
export interface HapticFeedbackOptions {
  // Basic configuration
  enabled?: boolean;
  intensity?: number; // 0-1 scale
  respectBatteryLevel?: boolean;
  minBatteryLevel?: number; // 0-1 scale

  // Pattern configuration
  defaultPatterns?: Partial<HapticPatterns>;
  customPatterns?: Record<string, number[]>;

  // Performance options
  maxDuration?: number;
  cooldownTime?: number;
  maxFrequency?: number; // max vibrations per second

  // Callbacks
  onVibrationStart?: (pattern: string, duration: number) => void;
  onVibrationEnd?: (pattern: string) => void;
  onBatteryLow?: (level: number) => void;
  onError?: (error: HapticError) => void;
}

export interface HapticFeedbackState {
  isSupported: boolean;
  isEnabled: boolean;
  batteryLevel: number | null;
  isLowBattery: boolean;
  deviceType: 'mobile' | 'desktop' | 'tablet' | 'unknown';
  canVibrate: boolean;
  isVibrating: boolean;
  lastVibration: number | null;
  vibrationCount: number;
}

export interface HapticPatterns {
  // Basic feedback
  light: number[];
  medium: number[];
  heavy: number[];

  // UI feedback
  success: number[];
  error: number[];
  warning: number[];
  notification: number[];

  // Game feedback
  impact: number[];
  selection: number[];
  heartbeat: number[];
  explosion: number[];

  // Communication feedback
  incoming: number[];
  outgoing: number[];
  typing: number[];
  pulse: number[];
}

export interface HapticError {
  type:
    | 'not_supported'
    | 'permission_denied'
    | 'battery_low'
    | 'rate_limited'
    | 'invalid_pattern';
  message: string;
  originalError?: Error;
}

export interface UseHapticFeedbackReturn {
  // State
  state: HapticFeedbackState;
  error: HapticError | null;

  // Basic vibration control
  vibrate: (pattern: number | number[], repeat?: boolean) => Promise<boolean>;
  stop: () => void;

  // Pattern-based feedback
  patterns: HapticPatterns;
  playPattern: (patternName: keyof HapticPatterns | string) => Promise<boolean>;
  createPattern: (name: string, pattern: number[]) => void;
  removePattern: (name: string) => boolean;

  // Predefined feedback methods
  success: () => Promise<boolean>;
  error: () => Promise<boolean>;
  warning: () => Promise<boolean>;
  notification: () => Promise<boolean>;
  light: () => Promise<boolean>;
  medium: () => Promise<boolean>;
  heavy: () => Promise<boolean>;
  impact: () => Promise<boolean>;
  selection: () => Promise<boolean>;

  // Advanced controls
  setIntensity: (intensity: number) => void;
  enable: () => void;
  disable: () => void;
  toggle: () => void;

  // Battery and performance
  getBatteryInfo: () => Promise<{ level: number; charging: boolean } | null>;
  isRateLimited: () => boolean;
  getRemainingCooldown: () => number;

  // Integration points
  networkQuality: 'poor' | 'good' | 'excellent' | 'unknown';
  keyboardShortcuts: Record<string, string>;
}

// Default haptic patterns (in milliseconds)
const DEFAULT_PATTERNS: HapticPatterns = {
  // Basic feedback
  light: [50],
  medium: [100],
  heavy: [200],

  // UI feedback
  success: [100, 50, 100],
  error: [200, 100, 200, 100, 200],
  warning: [150, 75, 150],
  notification: [100, 100, 100],

  // Game feedback
  impact: [10, 10, 50],
  selection: [25],
  heartbeat: [100, 100, 100],
  explosion: [20, 20, 20, 20, 200],

  // Communication feedback
  incoming: [200, 200, 200],
  outgoing: [100],
  typing: [10],
  pulse: [500],
};

// Utility functions
const detectDeviceType = (): 'mobile' | 'desktop' | 'tablet' | 'unknown' => {
  if (typeof window === 'undefined') return 'unknown';

  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    );
  const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);

  if (isTablet) return 'tablet';
  if (isMobile) return 'mobile';
  return 'desktop';
};

const isVibrationSupported = (): boolean => {
  return typeof window !== 'undefined' && 'vibrate' in navigator;
};

const validatePattern = (pattern: number | number[]): boolean => {
  if (typeof pattern === 'number') {
    return pattern >= 0 && pattern <= 10000; // Max 10 seconds
  }

  if (Array.isArray(pattern)) {
    return (
      pattern.every(p => typeof p === 'number' && p >= 0 && p <= 10000) &&
      pattern.length <= 100
    ); // Max 100 segments
  }

  return false;
};

const adjustPatternForIntensity = (
  pattern: number[],
  intensity: number
): number[] => {
  if (intensity <= 0) return [];
  if (intensity >= 1) return pattern;

  return pattern.map((duration, index) => {
    // Only adjust vibration durations (odd indices), not pauses (even indices)
    if (index % 2 === 0) {
      return Math.max(10, Math.round(duration * intensity)); // Minimum 10ms
    }
    return duration; // Keep pause durations unchanged
  });
};

// Battery API interface
interface BatteryManager extends EventTarget {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}

declare global {
  interface Navigator {
    getBattery?: () => Promise<BatteryManager>;
  }
}

export function useHapticFeedback(
  options: HapticFeedbackOptions = {}
): UseHapticFeedbackReturn {
  const {
    enabled = true,
    intensity = 1,
    respectBatteryLevel = true,
    minBatteryLevel = 0.2,
    defaultPatterns = {},
    customPatterns = {},
    maxDuration = 5000,
    cooldownTime = 100,
    maxFrequency = 10,
    onVibrationStart,
    onVibrationEnd,
    onBatteryLow,
    onError,
  } = options;

  // State
  const [state, setState] = useState<HapticFeedbackState>({
    isSupported: isVibrationSupported(),
    isEnabled: enabled,
    batteryLevel: null,
    isLowBattery: false,
    deviceType: detectDeviceType(),
    canVibrate: false,
    isVibrating: false,
    lastVibration: null,
    vibrationCount: 0,
  });

  const [error, setError] = useState<HapticError | null>(null);
  const [currentIntensity, setCurrentIntensity] = useState(intensity);
  const [patterns, setPatterns] = useState<HapticPatterns>({
    ...DEFAULT_PATTERNS,
    ...defaultPatterns,
  });

  // Refs
  const vibrationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const batteryRef = useRef<BatteryManager | null>(null);
  const vibrationHistoryRef = useRef<number[]>([]);
  const customPatternsRef = useRef<Record<string, number[]>>(customPatterns);

  // Network and keyboard integration (mock implementations for now)
  const networkQuality = 'good' as const; // Would integrate with Epic 41
  const keyboardShortcuts = {}; // Would integrate with Epic 40

  // Clear error helper
  const clearError = useCallback(() => setError(null), []);

  // Battery monitoring
  const updateBatteryInfo = useCallback(async () => {
    try {
      if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        batteryRef.current = battery;

        const level = battery.level;
        const isLow = level < minBatteryLevel;

        setState(prev => ({
          ...prev,
          batteryLevel: level,
          isLowBattery: isLow,
          canVibrate:
            prev.isSupported &&
            prev.isEnabled &&
            (!respectBatteryLevel || !isLow),
        }));

        if (isLow && onBatteryLow) {
          onBatteryLow(level);
        }

        // Listen for battery changes
        const handleBatteryChange = () => updateBatteryInfo();
        battery.addEventListener('levelchange', handleBatteryChange);
        battery.addEventListener('chargingchange', handleBatteryChange);

        return () => {
          battery.removeEventListener('levelchange', handleBatteryChange);
          battery.removeEventListener('chargingchange', handleBatteryChange);
        };
      }
    } catch (err) {
      const hapticError: HapticError = {
        type: 'not_supported',
        message: 'Battery API not supported',
        originalError: err as Error,
      };
      setError(hapticError);
      if (onError) onError(hapticError);
    }
  }, [minBatteryLevel, respectBatteryLevel, onBatteryLow, onError]);

  // Rate limiting
  const isRateLimited = useCallback((): boolean => {
    const now = Date.now();
    const recentVibrations = vibrationHistoryRef.current.filter(
      time => now - time < 1000 // Last second
    );
    return recentVibrations.length >= maxFrequency;
  }, [maxFrequency]);

  const getRemainingCooldown = useCallback((): number => {
    if (!state.lastVibration) return 0;
    const elapsed = Date.now() - state.lastVibration;
    return Math.max(0, cooldownTime - elapsed);
  }, [state.lastVibration, cooldownTime]);

  // Core vibration function
  const vibrate = useCallback(
    async (
      pattern: number | number[],
      repeat: boolean = false
    ): Promise<boolean> => {
      clearError();

      // Validation checks
      if (!state.isSupported) {
        const hapticError: HapticError = {
          type: 'not_supported',
          message: 'Vibration API not supported on this device',
        };
        setError(hapticError);
        if (onError) onError(hapticError);
        return false;
      }

      if (!state.isEnabled) {
        return false;
      }

      if (state.isLowBattery && respectBatteryLevel) {
        const hapticError: HapticError = {
          type: 'battery_low',
          message: 'Vibration disabled due to low battery',
        };
        setError(hapticError);
        if (onError) onError(hapticError);
        return false;
      }

      if (isRateLimited()) {
        const hapticError: HapticError = {
          type: 'rate_limited',
          message: 'Vibration rate limit exceeded',
        };
        setError(hapticError);
        if (onError) onError(hapticError);
        return false;
      }

      if (getRemainingCooldown() > 0) {
        return false;
      }

      if (!validatePattern(pattern)) {
        const hapticError: HapticError = {
          type: 'invalid_pattern',
          message: 'Invalid vibration pattern provided',
        };
        setError(hapticError);
        if (onError) onError(hapticError);
        return false;
      }

      try {
        // Adjust pattern for intensity
        let adjustedPattern: number | number[];
        if (typeof pattern === 'number') {
          adjustedPattern = Math.max(
            10,
            Math.round(pattern * currentIntensity)
          );
        } else {
          adjustedPattern = adjustPatternForIntensity(
            pattern,
            currentIntensity
          );
        }

        // Calculate total duration
        const totalDuration =
          typeof adjustedPattern === 'number'
            ? adjustedPattern
            : adjustedPattern.reduce((sum, duration) => sum + duration, 0);

        if (totalDuration > maxDuration) {
          const hapticError: HapticError = {
            type: 'invalid_pattern',
            message: `Pattern duration (${totalDuration}ms) exceeds maximum (${maxDuration}ms)`,
          };
          setError(hapticError);
          if (onError) onError(hapticError);
          return false;
        }

        // Execute vibration
        const success = navigator.vibrate(adjustedPattern);

        if (success) {
          const now = Date.now();
          vibrationHistoryRef.current.push(now);

          // Clean old history
          vibrationHistoryRef.current = vibrationHistoryRef.current.filter(
            time => now - time < 1000
          );

          setState(prev => ({
            ...prev,
            isVibrating: true,
            lastVibration: now,
            vibrationCount: prev.vibrationCount + 1,
          }));

          if (onVibrationStart) {
            onVibrationStart('custom', totalDuration);
          }

          // Clear vibrating state after pattern completes
          if (vibrationTimeoutRef.current) {
            clearTimeout(vibrationTimeoutRef.current);
          }

          vibrationTimeoutRef.current = setTimeout(() => {
            setState(prev => ({ ...prev, isVibrating: false }));
            if (onVibrationEnd) {
              onVibrationEnd('custom');
            }
          }, totalDuration);

          return true;
        }

        return false;
      } catch (err) {
        const hapticError: HapticError = {
          type: 'permission_denied',
          message: 'Vibration permission denied or failed',
          originalError: err as Error,
        };
        setError(hapticError);
        if (onError) onError(hapticError);
        return false;
      }
    },
    [
      state.isSupported,
      state.isEnabled,
      state.isLowBattery,
      respectBatteryLevel,
      currentIntensity,
      maxDuration,
      isRateLimited,
      getRemainingCooldown,
      onVibrationStart,
      onVibrationEnd,
      onError,
      clearError,
    ]
  );

  // Stop vibration
  const stop = useCallback(() => {
    if (state.isSupported) {
      navigator.vibrate(0);
      setState(prev => ({ ...prev, isVibrating: false }));

      if (vibrationTimeoutRef.current) {
        clearTimeout(vibrationTimeoutRef.current);
        vibrationTimeoutRef.current = null;
      }
    }
  }, [state.isSupported]);

  // Pattern management
  const playPattern = useCallback(
    async (patternName: keyof HapticPatterns | string): Promise<boolean> => {
      const pattern =
        patterns[patternName as keyof HapticPatterns] ||
        customPatternsRef.current[patternName];

      if (!pattern) {
        const hapticError: HapticError = {
          type: 'invalid_pattern',
          message: `Pattern '${patternName}' not found`,
        };
        setError(hapticError);
        if (onError) onError(hapticError);
        return false;
      }

      const success = await vibrate(pattern);

      if (success && onVibrationStart) {
        const duration = pattern.reduce((sum, dur) => sum + dur, 0);
        onVibrationStart(patternName, duration);
      }

      return success;
    },
    [patterns, vibrate, onVibrationStart, onError]
  );

  const createPattern = useCallback((name: string, pattern: number[]) => {
    if (validatePattern(pattern)) {
      customPatternsRef.current[name] = pattern;
    }
  }, []);

  const removePattern = useCallback((name: string): boolean => {
    if (customPatternsRef.current[name]) {
      delete customPatternsRef.current[name];
      return true;
    }
    return false;
  }, []);

  // Predefined feedback methods
  const success = useCallback(() => playPattern('success'), [playPattern]);
  const error = useCallback(() => playPattern('error'), [playPattern]);
  const warning = useCallback(() => playPattern('warning'), [playPattern]);
  const notification = useCallback(
    () => playPattern('notification'),
    [playPattern]
  );
  const light = useCallback(() => playPattern('light'), [playPattern]);
  const medium = useCallback(() => playPattern('medium'), [playPattern]);
  const heavy = useCallback(() => playPattern('heavy'), [playPattern]);
  const impact = useCallback(() => playPattern('impact'), [playPattern]);
  const selection = useCallback(() => playPattern('selection'), [playPattern]);

  // Control methods
  const setIntensity = useCallback((newIntensity: number) => {
    setCurrentIntensity(Math.max(0, Math.min(1, newIntensity)));
  }, []);

  const enable = useCallback(() => {
    setState(prev => ({
      ...prev,
      isEnabled: true,
      canVibrate:
        prev.isSupported && (!respectBatteryLevel || !prev.isLowBattery),
    }));
  }, [respectBatteryLevel]);

  const disable = useCallback(() => {
    stop();
    setState(prev => ({ ...prev, isEnabled: false, canVibrate: false }));
  }, [stop]);

  const toggle = useCallback(() => {
    if (state.isEnabled) {
      disable();
    } else {
      enable();
    }
  }, [state.isEnabled, enable, disable]);

  // Battery info
  const getBatteryInfo = useCallback(async (): Promise<{
    level: number;
    charging: boolean;
  } | null> => {
    try {
      if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        return {
          level: battery.level,
          charging: battery.charging,
        };
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  // Initialize
  useEffect(() => {
    const initialize = async () => {
      await updateBatteryInfo();

      setState(prev => ({
        ...prev,
        canVibrate:
          prev.isSupported &&
          prev.isEnabled &&
          (!respectBatteryLevel || !prev.isLowBattery),
      }));
    };

    initialize();

    return () => {
      if (vibrationTimeoutRef.current) {
        clearTimeout(vibrationTimeoutRef.current);
      }
    };
  }, [updateBatteryInfo, respectBatteryLevel]);

  // Update patterns when defaultPatterns change
  useEffect(() => {
    setPatterns(prev => ({
      ...DEFAULT_PATTERNS,
      ...defaultPatterns,
    }));
  }, [defaultPatterns]);

  // Update custom patterns
  useEffect(() => {
    customPatternsRef.current = customPatterns;
  }, [customPatterns]);

  return {
    // State
    state,
    error,

    // Basic vibration control
    vibrate,
    stop,

    // Pattern-based feedback
    patterns,
    playPattern,
    createPattern,
    removePattern,

    // Predefined feedback methods
    success,
    error: error,
    warning,
    notification,
    light,
    medium,
    heavy,
    impact,
    selection,

    // Advanced controls
    setIntensity,
    enable,
    disable,
    toggle,

    // Battery and performance
    getBatteryInfo,
    isRateLimited,
    getRemainingCooldown,

    // Integration points
    networkQuality,
    keyboardShortcuts,
  };
}
