/**
 * @fileoverview Haptic Feedback Hook for Epic 61 - AAE Haptic Feedback System
 * Provides theme-aware haptic feedback using the Vibration API with predefined patterns.
 * Enables consistent tactile feedback across applications through theme-based haptic tokens.
 */

import { useState, useCallback, useRef, useEffect } from 'react';

// Haptic pattern types
export type HapticPattern = number | number[];

export interface HapticTokens {
  click: string;
  success: string;
  error: string;
  warning: string;
  notification: string;
  long: string;
  short: string;
  double: string;
  pulse: string;
}

export interface HapticOptions {
  /** Whether to respect user's reduced motion preference */
  respectReducedMotion?: boolean;
  /** Whether to log haptic actions for debugging */
  debug?: boolean;
  /** Custom fallback patterns when theme patterns are not available */
  fallbackPatterns?: Partial<HapticTokens>;
}

export interface HapticState {
  isSupported: boolean;
  isVibrating: boolean;
  lastTriggered: string | null;
  lastPattern: HapticPattern | null;
  triggeredCount: number;
}

export interface UseHapticsReturn {
  // State
  state: HapticState;

  // Actions
  trigger: (hapticName: keyof HapticTokens) => void;
  triggerPattern: (pattern: HapticPattern) => void;
  cancel: () => void;

  // Utilities
  isSupported: boolean;
  getAvailableTokens: () => string[];
  getPatternForToken: (token: keyof HapticTokens) => HapticPattern | null;
  testPattern: (pattern: HapticPattern) => void;

  // Theme integration
  refreshThemePatterns: () => void;
}

// Check if Vibration API is supported
const isVibrationSupported = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return 'vibrate' in navigator && typeof navigator.vibrate === 'function';
};

// Check if user prefers reduced motion
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Default haptic patterns as fallbacks
const DEFAULT_PATTERNS: HapticTokens = {
  click: '10',
  success: '10,30,10',
  error: '50,20,50,20,50',
  warning: '30,20,30',
  notification: '20,10,20,10,20',
  long: '200',
  short: '10',
  double: '10,50,10',
  pulse: '100,50,100,50,100',
};

// Parse haptic pattern string to number array
const parseHapticPattern = (patternString: string): HapticPattern => {
  if (!patternString || patternString.trim() === '') {
    return [];
  }

  // Handle single number
  if (!patternString.includes(',')) {
    const single = parseInt(patternString.trim(), 10);
    return isNaN(single) ? [] : single;
  }

  // Handle comma-separated values
  const parts = patternString
    .split(',')
    .map(s => parseInt(s.trim(), 10))
    .filter(n => !isNaN(n));
  return parts.length === 0 ? [] : parts;
};

// Get haptic pattern from CSS custom property
const getHapticPatternFromTheme = (tokenName: string): HapticPattern | null => {
  if (typeof window === 'undefined') return null;

  try {
    const computedStyle = getComputedStyle(document.documentElement);
    const cssVar = `--haptic-${tokenName}`;
    const patternString = computedStyle.getPropertyValue(cssVar).trim();

    if (!patternString) {
      return null;
    }

    return parseHapticPattern(patternString);
  } catch (error) {
    console.warn(
      `Failed to get haptic pattern for token "${tokenName}":`,
      error
    );
    return null;
  }
};

// Validate haptic pattern
const isValidPattern = (pattern: HapticPattern): boolean => {
  if (typeof pattern === 'number') {
    return pattern >= 0 && pattern <= 10000; // Max vibration duration
  }

  if (Array.isArray(pattern)) {
    return (
      pattern.length > 0 &&
      pattern.length <= 50 && // Reasonable limit
      pattern.every(n => typeof n === 'number' && n >= 0 && n <= 10000)
    );
  }

  return false;
};

/**
 * Haptic Feedback Hook
 * Provides theme-aware haptic feedback using the Vibration API
 */
export function useHaptics(options: HapticOptions = {}): UseHapticsReturn {
  const {
    respectReducedMotion = true,
    debug = false,
    fallbackPatterns = {},
  } = options;

  // State
  const [state, setState] = useState<HapticState>({
    isSupported: isVibrationSupported(),
    isVibrating: false,
    lastTriggered: null,
    lastPattern: null,
    triggeredCount: 0,
  });

  // Refs
  const vibrationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const patternsCache = useRef<Map<string, HapticPattern>>(new Map());
  const reducedMotionRef = useRef<boolean>(prefersReducedMotion());

  // Update reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReducedMotion = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    mediaQuery.addEventListener('change', updateReducedMotion);
    return () => mediaQuery.removeEventListener('change', updateReducedMotion);
  }, []);

  // Clear vibration timeout on unmount
  useEffect(() => {
    return () => {
      if (vibrationTimeoutRef.current) {
        clearTimeout(vibrationTimeoutRef.current);
      }
    };
  }, []);

  // Get pattern for token (with caching)
  const getPatternForToken = useCallback(
    (token: keyof HapticTokens): HapticPattern | null => {
      // Check cache first
      if (patternsCache.current.has(token)) {
        return patternsCache.current.get(token) || null;
      }

      // Try to get from theme
      let pattern = getHapticPatternFromTheme(token);

      // Fall back to custom fallback patterns
      if (!pattern && fallbackPatterns[token]) {
        pattern = parseHapticPattern(fallbackPatterns[token]);
      }

      // Fall back to default patterns
      if (!pattern && DEFAULT_PATTERNS[token]) {
        pattern = parseHapticPattern(DEFAULT_PATTERNS[token]);
      }

      // Cache the result (even if null)
      if (pattern) {
        patternsCache.current.set(token, pattern);
      }

      return pattern;
    },
    [fallbackPatterns]
  );

  // Refresh theme patterns (clear cache)
  const refreshThemePatterns = useCallback(() => {
    patternsCache.current.clear();
    if (debug) {
      console.log('🔄 Haptic patterns cache cleared');
    }
  }, [debug]);

  // Cancel current vibration
  const cancel = useCallback(() => {
    if (!state.isSupported) return;

    try {
      if (navigator.vibrate) {
        navigator.vibrate(0); // Cancel vibration
      }

      if (vibrationTimeoutRef.current) {
        clearTimeout(vibrationTimeoutRef.current);
        vibrationTimeoutRef.current = null;
      }

      setState(prev => ({ ...prev, isVibrating: false }));

      if (debug) {
        console.log('⏹️ Haptic feedback cancelled');
      }
    } catch (error) {
      console.warn('Failed to cancel haptic feedback:', error);
    }
  }, [state.isSupported, debug]);

  // Trigger haptic pattern directly
  const triggerPattern = useCallback(
    (pattern: HapticPattern) => {
      if (!state.isSupported) {
        if (debug) {
          console.warn('🚫 Haptic feedback not supported');
        }
        return;
      }

      if (respectReducedMotion && reducedMotionRef.current) {
        if (debug) {
          console.log('🔇 Haptic feedback skipped (reduced motion preference)');
        }
        return;
      }

      if (!isValidPattern(pattern)) {
        console.warn('Invalid haptic pattern:', pattern);
        return;
      }

      try {
        cancel(); // Cancel any ongoing vibration

        const success = navigator.vibrate(pattern);

        if (success) {
          setState(prev => ({
            ...prev,
            isVibrating: true,
            lastPattern: pattern,
            triggeredCount: prev.triggeredCount + 1,
          }));

          // Calculate vibration duration
          let duration = 0;
          if (typeof pattern === 'number') {
            duration = pattern;
          } else if (Array.isArray(pattern)) {
            duration = pattern.reduce((sum, value) => sum + value, 0);
          }

          // Clear vibrating state after duration
          if (duration > 0) {
            vibrationTimeoutRef.current = setTimeout(() => {
              setState(prev => ({ ...prev, isVibrating: false }));
            }, duration);
          }

          if (debug) {
            console.log(
              '📳 Haptic feedback triggered:',
              pattern,
              `(${duration}ms)`
            );
          }
        } else {
          console.warn('Failed to trigger haptic feedback');
        }
      } catch (error) {
        console.warn('Error triggering haptic feedback:', error);
      }
    },
    [state.isSupported, respectReducedMotion, debug, cancel]
  );

  // Trigger haptic by token name
  const trigger = useCallback(
    (hapticName: keyof HapticTokens) => {
      const pattern = getPatternForToken(hapticName);

      if (!pattern) {
        console.warn(`No haptic pattern found for token "${hapticName}"`);
        return;
      }

      setState(prev => ({ ...prev, lastTriggered: hapticName }));
      triggerPattern(pattern);

      if (debug) {
        console.log(`🎯 Haptic token "${hapticName}" triggered:`, pattern);
      }
    },
    [getPatternForToken, triggerPattern, debug]
  );

  // Test pattern with validation
  const testPattern = useCallback(
    (pattern: HapticPattern) => {
      if (!isValidPattern(pattern)) {
        console.error('Invalid test pattern:', pattern);
        return;
      }

      if (debug) {
        console.log('🧪 Testing haptic pattern:', pattern);
      }

      triggerPattern(pattern);
    },
    [triggerPattern, debug]
  );

  // Get available haptic tokens
  const getAvailableTokens = useCallback((): string[] => {
    return Object.keys(DEFAULT_PATTERNS);
  }, []);

  return {
    // State
    state,

    // Actions
    trigger,
    triggerPattern,
    cancel,

    // Utilities
    isSupported: state.isSupported,
    getAvailableTokens,
    getPatternForToken,
    testPattern,

    // Theme integration
    refreshThemePatterns,
  };
}

// Utility functions
export const HapticUtils = {
  isSupported: isVibrationSupported,
  prefersReducedMotion,

  /**
   * Parse haptic pattern string
   */
  parsePattern: parseHapticPattern,

  /**
   * Validate haptic pattern
   */
  isValidPattern,

  /**
   * Get default patterns
   */
  getDefaultPatterns: (): HapticTokens => ({ ...DEFAULT_PATTERNS }),

  /**
   * Create custom pattern
   */
  createPattern: (durations: number[]): HapticPattern => {
    return durations.filter(d => d >= 0 && d <= 10000);
  },

  /**
   * Get pattern duration in milliseconds
   */
  getPatternDuration: (pattern: HapticPattern): number => {
    if (typeof pattern === 'number') {
      return pattern;
    }
    if (Array.isArray(pattern)) {
      return pattern.reduce((sum, value) => sum + value, 0);
    }
    return 0;
  },

  /**
   * Format pattern for display
   */
  formatPattern: (pattern: HapticPattern): string => {
    if (typeof pattern === 'number') {
      return `${pattern}ms`;
    }
    if (Array.isArray(pattern)) {
      return pattern.map(p => `${p}ms`).join(', ');
    }
    return 'Invalid pattern';
  },

  /**
   * Get browser support information
   */
  getBrowserSupport: () => ({
    chrome: 'Full support since Chrome 32',
    firefox: 'Full support since Firefox 16',
    safari: 'No support (iOS only via web app)',
    edge: 'Full support since Edge 79',
    mobile: 'Wide support on Android, iOS Safari only in AAE mode',
  }),

  /**
   * Get usage recommendations
   */
  getUsageRecommendations: () => [
    'Use subtle patterns for UI feedback (click, hover)',
    'Reserve strong patterns for important notifications',
    'Respect user preferences for reduced motion',
    'Test patterns on actual devices for best results',
    'Provide visual alternatives for accessibility',
    'Consider battery impact on mobile devices',
    'Use consistent patterns throughout your application',
  ],

  /**
   * Get accessibility guidelines
   */
  getAccessibilityGuidelines: () => [
    'Always provide visual or audio alternatives',
    'Respect prefers-reduced-motion preference',
    'Allow users to disable haptic feedback',
    'Use semantic haptic patterns (success, error, etc.)',
    'Avoid excessive or repetitive vibrations',
    'Consider users with motor impairments',
    'Test with assistive technologies',
  ],
};

export default useHaptics;
