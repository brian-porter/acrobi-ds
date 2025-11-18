// packages/ui/src/themes/base/haptics.ts

/**
 * Haptic feedback design tokens for cross-platform tactile feedback
 * Supports Web Vibration API, iOS UIImpactFeedbackGenerator, and Android VibrationEffect
 */

// Haptic intensity levels (0.0 to 1.0)
export interface HapticIntensity {
  subtle: number;
  light: number;
  medium: number;
  strong: number;
  intense: number;
}

// Haptic duration values in milliseconds
export interface HapticDuration {
  instant: number;
  brief: number;
  short: number;
  medium: number;
  long: number;
}

// Haptic pattern types with timing and intensity
export interface HapticPattern {
  type: 'single' | 'double' | 'triple' | 'sequence' | 'pulse' | 'wave';
  vibrations: number[];
  pauses: number[];
  intensity: number;
  repeat?: number;
}

// Platform-specific haptic feedback types
export interface HapticFeedbackTypes {
  impact: {
    light: HapticPattern;
    medium: HapticPattern;
    heavy: HapticPattern;
  };
  notification: {
    success: HapticPattern;
    warning: HapticPattern;
    error: HapticPattern;
  };
  selection: {
    tick: HapticPattern;
    click: HapticPattern;
    toggle: HapticPattern;
  };
  interaction: {
    buttonPress: HapticPattern;
    swipe: HapticPattern;
    drag: HapticPattern;
    drop: HapticPattern;
    scroll: HapticPattern;
    zoom: HapticPattern;
  };
  system: {
    focus: HapticPattern;
    confirm: HapticPattern;
    cancel: HapticPattern;
    alert: HapticPattern;
  };
}

// Accessibility and user preference settings
export interface HapticSettings {
  enabled: boolean;
  respectSystemSettings: boolean;
  intensityMultiplier: number;
  maxDuration: number;
  cooldownPeriod: number;
  reducedMotionFallback: boolean;
}

// Complete haptic token structure
export interface HapticTokens {
  intensity: HapticIntensity;
  duration: HapticDuration;
  feedback: HapticFeedbackTypes;
  settings: HapticSettings;
  patterns: {
    heartbeat: HapticPattern;
    pulse: HapticPattern;
    rhythm: HapticPattern;
    bounce: HapticPattern;
    fade: HapticPattern;
  };
}

// Default haptic token values
export const hapticTokens: HapticTokens = {
  intensity: {
    subtle: 0.1,
    light: 0.3,
    medium: 0.5,
    strong: 0.7,
    intense: 1.0,
  },
  duration: {
    instant: 10,
    brief: 25,
    short: 50,
    medium: 100,
    long: 200,
  },
  feedback: {
    impact: {
      light: {
        type: 'single',
        vibrations: [20],
        pauses: [],
        intensity: 0.3,
      },
      medium: {
        type: 'single',
        vibrations: [40],
        pauses: [],
        intensity: 0.5,
      },
      heavy: {
        type: 'single',
        vibrations: [60],
        pauses: [],
        intensity: 0.8,
      },
    },
    notification: {
      success: {
        type: 'double',
        vibrations: [30, 30],
        pauses: [50],
        intensity: 0.6,
      },
      warning: {
        type: 'triple',
        vibrations: [40, 40, 40],
        pauses: [30, 30],
        intensity: 0.7,
      },
      error: {
        type: 'sequence',
        vibrations: [80, 20, 80],
        pauses: [40, 40],
        intensity: 0.8,
      },
    },
    selection: {
      tick: {
        type: 'single',
        vibrations: [10],
        pauses: [],
        intensity: 0.2,
      },
      click: {
        type: 'single',
        vibrations: [25],
        pauses: [],
        intensity: 0.4,
      },
      toggle: {
        type: 'double',
        vibrations: [15, 15],
        pauses: [20],
        intensity: 0.3,
      },
    },
    interaction: {
      buttonPress: {
        type: 'single',
        vibrations: [30],
        pauses: [],
        intensity: 0.5,
      },
      swipe: {
        type: 'wave',
        vibrations: [20, 15, 10],
        pauses: [10, 10],
        intensity: 0.3,
      },
      drag: {
        type: 'pulse',
        vibrations: [15],
        pauses: [15],
        intensity: 0.2,
        repeat: 3,
      },
      drop: {
        type: 'single',
        vibrations: [50],
        pauses: [],
        intensity: 0.6,
      },
      scroll: {
        type: 'single',
        vibrations: [5],
        pauses: [],
        intensity: 0.1,
      },
      zoom: {
        type: 'double',
        vibrations: [20, 20],
        pauses: [15],
        intensity: 0.4,
      },
    },
    system: {
      focus: {
        type: 'single',
        vibrations: [15],
        pauses: [],
        intensity: 0.25,
      },
      confirm: {
        type: 'double',
        vibrations: [25, 35],
        pauses: [25],
        intensity: 0.5,
      },
      cancel: {
        type: 'single',
        vibrations: [40],
        pauses: [],
        intensity: 0.4,
      },
      alert: {
        type: 'sequence',
        vibrations: [50, 30, 50, 30, 50],
        pauses: [25, 25, 25, 25],
        intensity: 0.7,
      },
    },
  },
  settings: {
    enabled: true,
    respectSystemSettings: true,
    intensityMultiplier: 1.0,
    maxDuration: 1000,
    cooldownPeriod: 50,
    reducedMotionFallback: true,
  },
  patterns: {
    heartbeat: {
      type: 'sequence',
      vibrations: [30, 30],
      pauses: [100],
      intensity: 0.4,
      repeat: 2,
    },
    pulse: {
      type: 'pulse',
      vibrations: [20],
      pauses: [80],
      intensity: 0.3,
      repeat: 3,
    },
    rhythm: {
      type: 'sequence',
      vibrations: [15, 15, 30],
      pauses: [20, 20],
      intensity: 0.4,
      repeat: 2,
    },
    bounce: {
      type: 'wave',
      vibrations: [10, 20, 30, 20, 10],
      pauses: [15, 15, 15, 15],
      intensity: 0.5,
    },
    fade: {
      type: 'wave',
      vibrations: [50, 40, 30, 20, 10],
      pauses: [20, 20, 20, 20],
      intensity: 0.6,
    },
  },
};

// Helper function to check haptic support
export function isHapticSupported(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for Web Vibration API
  return 'vibrate' in navigator || 'webkitVibrate' in navigator;
}

// Helper function to check if haptics are enabled in system settings
export function areHapticsEnabled(): boolean {
  if (!isHapticSupported()) return false;
  
  // Check for reduced motion preference
  if (hapticTokens.settings.reducedMotionFallback) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return false;
  }
  
  return hapticTokens.settings.enabled;
}

// Helper function to trigger haptic feedback
export function triggerHaptic(pattern: HapticPattern): Promise<void> {
  return new Promise((resolve) => {
    if (!areHapticsEnabled()) {
      resolve();
      return;
    }

    try {
      const vibrate = navigator.vibrate || (navigator as any).webkitVibrate;
      if (!vibrate) {
        resolve();
        return;
      }

      // Build vibration pattern
      const vibrationPattern: number[] = [];
      
      for (let i = 0; i < pattern.vibrations.length; i++) {
        const duration = Math.round(pattern.vibrations[i] * pattern.intensity * hapticTokens.settings.intensityMultiplier);
        vibrationPattern.push(Math.min(duration, hapticTokens.settings.maxDuration));
        
        if (i < pattern.pauses.length) {
          vibrationPattern.push(pattern.pauses[i]);
        }
      }

      // Handle repeat
      if (pattern.repeat && pattern.repeat > 1) {
        const originalPattern = [...vibrationPattern];
        for (let r = 1; r < pattern.repeat; r++) {
          vibrationPattern.push(hapticTokens.settings.cooldownPeriod);
          vibrationPattern.push(...originalPattern);
        }
      }

      // Trigger vibration
      const success = vibrate.call(navigator, vibrationPattern);
      
      // Calculate total duration for promise resolution
      const totalDuration = vibrationPattern.reduce((sum, duration) => sum + duration, 0);
      setTimeout(resolve, totalDuration + 50);
      
      if (!success) {
        resolve();
      }
    } catch (error) {
      console.warn('Haptic feedback error:', error);
      resolve();
    }
  });
}

// Helper function to trigger predefined haptic feedback
export function triggerHapticFeedback(
  category: keyof HapticFeedbackTypes,
  type: string
): Promise<void> {
  const feedbackCategory = hapticTokens.feedback[category] as any;
  if (!feedbackCategory || !feedbackCategory[type]) {
    console.warn(`Haptic feedback not found: ${category}.${type}`);
    return Promise.resolve();
  }

  return triggerHaptic(feedbackCategory[type]);
}

// Helper function to create custom haptic pattern
export function createHapticPattern(
  vibrations: number[],
  pauses: number[] = [],
  intensity: number = 0.5,
  type: HapticPattern['type'] = 'sequence'
): HapticPattern {
  return {
    type,
    vibrations,
    pauses,
    intensity: Math.max(0, Math.min(1, intensity)),
  };
}

// Helper function to convert haptic tokens to CSS custom properties
export function hapticTokensToCSSProperties(tokens: HapticTokens): Record<string, string> {
  const properties: Record<string, string> = {};

  // Convert intensities
  Object.entries(tokens.intensity).forEach(([key, value]) => {
    properties[`--haptic-intensity-${key}`] = value.toString();
  });

  // Convert durations
  Object.entries(tokens.duration).forEach(([key, value]) => {
    properties[`--haptic-duration-${key}`] = `${value}ms`;
  });

  // Convert settings
  Object.entries(tokens.settings).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      properties[`--haptic-setting-${key}`] = value ? '1' : '0';
    } else {
      properties[`--haptic-setting-${key}`] = value.toString();
    }
  });

  return properties;
}

// Utility to stop all haptic feedback
export function stopHapticFeedback(): void {
  if (!isHapticSupported()) return;
  
  try {
    const vibrate = navigator.vibrate || (navigator as any).webkitVibrate;
    if (vibrate) {
      vibrate.call(navigator, 0);
    }
  } catch (error) {
    console.warn('Error stopping haptic feedback:', error);
  }
}