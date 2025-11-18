// packages/ui/src/themes/base/motion.ts

/**
 * Motion and animation design tokens for cross-platform animations
 * Supports CSS animations, Web Animations API, and React Native Animated
 */

// Animation duration values in milliseconds and seconds
export interface MotionDuration {
  instant: {
    ms: number;
    s: string;
  };
  fast: {
    ms: number;
    s: string;
  };
  normal: {
    ms: number;
    s: string;
  };
  slow: {
    ms: number;
    s: string;
  };
  slower: {
    ms: number;
    s: string;
  };
}

// Easing curves for different animation types
export interface MotionEasing {
  linear: string;
  ease: string;
  easeIn: string;
  easeOut: string;
  easeInOut: string;
  bounceIn: string;
  bounceOut: string;
  bounceInOut: string;
  elasticIn: string;
  elasticOut: string;
  elasticInOut: string;
  backIn: string;
  backOut: string;
  backInOut: string;
  circIn: string;
  circOut: string;
  circInOut: string;
}

// Animation distance and scale values
export interface MotionDistance {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface MotionScale {
  shrink: number;
  normal: number;
  grow: number;
  expand: number;
}

// Rotation values in degrees
export interface MotionRotation {
  quarter: string;
  half: string;
  full: string;
  double: string;
}

// Common animation presets
export interface MotionPresets {
  fadeIn: {
    duration: string;
    easing: string;
    keyframes: Record<string, any>;
  };
  fadeOut: {
    duration: string;
    easing: string;
    keyframes: Record<string, any>;
  };
  slideInUp: {
    duration: string;
    easing: string;
    keyframes: Record<string, any>;
  };
  slideInDown: {
    duration: string;
    easing: string;
    keyframes: Record<string, any>;
  };
  slideInLeft: {
    duration: string;
    easing: string;
    keyframes: Record<string, any>;
  };
  slideInRight: {
    duration: string;
    easing: string;
    keyframes: Record<string, any>;
  };
  scaleIn: {
    duration: string;
    easing: string;
    keyframes: Record<string, any>;
  };
  scaleOut: {
    duration: string;
    easing: string;
    keyframes: Record<string, any>;
  };
  bounce: {
    duration: string;
    easing: string;
    keyframes: Record<string, any>;
  };
  shake: {
    duration: string;
    easing: string;
    keyframes: Record<string, any>;
  };
  pulse: {
    duration: string;
    easing: string;
    keyframes: Record<string, any>;
  };
  spin: {
    duration: string;
    easing: string;
    keyframes: Record<string, any>;
  };
}

// Gesture-based animations
export interface MotionGestures {
  swipe: {
    threshold: number;
    velocity: number;
    resistance: number;
  };
  drag: {
    damping: number;
    tension: number;
    friction: number;
  };
  pinch: {
    minScale: number;
    maxScale: number;
    sensitivity: number;
  };
  scroll: {
    momentum: boolean;
    bounciness: number;
    decelerationRate: number;
  };
}

// Accessibility and performance settings
export interface MotionSettings {
  respectReducedMotion: boolean;
  enableHardwareAcceleration: boolean;
  maxFPS: number;
  willChange: string[];
  prefersReducedMotionFallback: {
    disableAnimations: boolean;
    reduceDuration: boolean;
    durationMultiplier: number;
  };
}

// Complete motion token structure
export interface MotionTokens {
  duration: MotionDuration;
  easing: MotionEasing;
  distance: MotionDistance;
  scale: MotionScale;
  rotation: MotionRotation;
  presets: MotionPresets;
  gestures: MotionGestures;
  settings: MotionSettings;
}

// Default motion token values
export const motionTokens: MotionTokens = {
  duration: {
    instant: {
      ms: 0,
      s: '0s',
    },
    fast: {
      ms: 150,
      s: '0.15s',
    },
    normal: {
      ms: 300,
      s: '0.3s',
    },
    slow: {
      ms: 500,
      s: '0.5s',
    },
    slower: {
      ms: 800,
      s: '0.8s',
    },
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounceIn: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
    bounceOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    bounceInOut: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elasticIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    elasticOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    elasticInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    backIn: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
    backOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    backInOut: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    circIn: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
    circOut: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
    circInOut: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
  },
  distance: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
  },
  scale: {
    shrink: 0.95,
    normal: 1.0,
    grow: 1.05,
    expand: 1.1,
  },
  rotation: {
    quarter: '90deg',
    half: '180deg',
    full: '360deg',
    double: '720deg',
  },
  presets: {
    fadeIn: {
      duration: '0.3s',
      easing: 'ease-out',
      keyframes: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
    },
    fadeOut: {
      duration: '0.3s',
      easing: 'ease-in',
      keyframes: {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
    },
    slideInUp: {
      duration: '0.3s',
      easing: 'ease-out',
      keyframes: {
        from: { transform: 'translateY(100%)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
      },
    },
    slideInDown: {
      duration: '0.3s',
      easing: 'ease-out',
      keyframes: {
        from: { transform: 'translateY(-100%)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
      },
    },
    slideInLeft: {
      duration: '0.3s',
      easing: 'ease-out',
      keyframes: {
        from: { transform: 'translateX(-100%)', opacity: 0 },
        to: { transform: 'translateX(0)', opacity: 1 },
      },
    },
    slideInRight: {
      duration: '0.3s',
      easing: 'ease-out',
      keyframes: {
        from: { transform: 'translateX(100%)', opacity: 0 },
        to: { transform: 'translateX(0)', opacity: 1 },
      },
    },
    scaleIn: {
      duration: '0.3s',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      keyframes: {
        from: { transform: 'scale(0)', opacity: 0 },
        to: { transform: 'scale(1)', opacity: 1 },
      },
    },
    scaleOut: {
      duration: '0.3s',
      easing: 'ease-in',
      keyframes: {
        from: { transform: 'scale(1)', opacity: 1 },
        to: { transform: 'scale(0)', opacity: 0 },
      },
    },
    bounce: {
      duration: '0.6s',
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      keyframes: {
        '0%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-20px)' },
        '100%': { transform: 'translateY(0)' },
      },
    },
    shake: {
      duration: '0.5s',
      easing: 'ease-in-out',
      keyframes: {
        '0%, 100%': { transform: 'translateX(0)' },
        '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
        '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
      },
    },
    pulse: {
      duration: '1s',
      easing: 'ease-in-out',
      keyframes: {
        '0%, 100%': { transform: 'scale(1)', opacity: 1 },
        '50%': { transform: 'scale(1.05)', opacity: 0.8 },
      },
    },
    spin: {
      duration: '1s',
      easing: 'linear',
      keyframes: {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
    },
  },
  gestures: {
    swipe: {
      threshold: 50, // pixels
      velocity: 0.3, // pixels per ms
      resistance: 0.5,
    },
    drag: {
      damping: 0.8,
      tension: 200,
      friction: 25,
    },
    pinch: {
      minScale: 0.5,
      maxScale: 3.0,
      sensitivity: 1.0,
    },
    scroll: {
      momentum: true,
      bounciness: 0.3,
      decelerationRate: 0.985,
    },
  },
  settings: {
    respectReducedMotion: true,
    enableHardwareAcceleration: true,
    maxFPS: 60,
    willChange: ['transform', 'opacity'],
    prefersReducedMotionFallback: {
      disableAnimations: false,
      reduceDuration: true,
      durationMultiplier: 0.1,
    },
  },
};

// Helper function to check if reduced motion is preferred
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

// Helper function to get adjusted duration based on user preferences
export function getAdjustedDuration(duration: string | number): string {
  if (!motionTokens.settings.respectReducedMotion) {
    return typeof duration === 'number' ? `${duration}ms` : duration;
  }

  if (prefersReducedMotion()) {
    const { disableAnimations, reduceDuration, durationMultiplier } = 
      motionTokens.settings.prefersReducedMotionFallback;
    
    if (disableAnimations) return '0s';
    
    if (reduceDuration) {
      const numValue = typeof duration === 'number' 
        ? duration 
        : parseFloat(duration);
      
      return `${Math.max(0, numValue * durationMultiplier)}${
        typeof duration === 'string' && duration.endsWith('s') ? 's' : 'ms'
      }`;
    }
  }

  return typeof duration === 'number' ? `${duration}ms` : duration;
}

// Helper function to create CSS animation keyframes
export function createKeyframes(name: string, keyframes: Record<string, any>): string {
  const keyframeEntries = Object.entries(keyframes)
    .map(([key, styles]) => {
      const styleEntries = Object.entries(styles)
        .map(([prop, value]) => `${prop}: ${value}`)
        .join('; ');
      return `  ${key} { ${styleEntries}; }`;
    })
    .join('\n');

  return `@keyframes ${name} {\n${keyframeEntries}\n}`;
}

// Helper function to apply animation preset
export function applyAnimationPreset(
  element: HTMLElement,
  presetName: keyof MotionPresets,
  options?: {
    duration?: string;
    easing?: string;
    delay?: string;
    fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
    iterationCount?: number | 'infinite';
  }
): Animation | null {
  if (typeof window === 'undefined' || !element) return null;

  const preset = motionTokens.presets[presetName];
  if (!preset) {
    console.warn(`Animation preset '${presetName}' not found`);
    return null;
  }

  try {
    const animation = element.animate(preset.keyframes, {
      duration: getAdjustedDuration(options?.duration || preset.duration),
      easing: options?.easing || preset.easing,
      delay: options?.delay || '0s',
      fill: options?.fillMode || 'both',
      iterations: options?.iterationCount || 1,
    });

    return animation;
  } catch (error) {
    console.warn('Error applying animation preset:', error);
    return null;
  }
}

// Helper function to convert motion tokens to CSS custom properties
export function motionTokensToCSSProperties(tokens: MotionTokens): Record<string, string> {
  const properties: Record<string, string> = {};

  // Convert durations
  Object.entries(tokens.duration).forEach(([key, value]) => {
    properties[`--motion-duration-${key}`] = value.s;
    properties[`--motion-duration-${key}-ms`] = `${value.ms}ms`;
  });

  // Convert easing
  Object.entries(tokens.easing).forEach(([key, value]) => {
    properties[`--motion-easing-${key}`] = value;
  });

  // Convert distances
  Object.entries(tokens.distance).forEach(([key, value]) => {
    properties[`--motion-distance-${key}`] = value;
  });

  // Convert scales
  Object.entries(tokens.scale).forEach(([key, value]) => {
    properties[`--motion-scale-${key}`] = value.toString();
  });

  // Convert rotations
  Object.entries(tokens.rotation).forEach(([key, value]) => {
    properties[`--motion-rotation-${key}`] = value;
  });

  // Convert gesture settings
  Object.entries(tokens.gestures).forEach(([gestureKey, gesture]) => {
    Object.entries(gesture).forEach(([propKey, propValue]) => {
      properties[`--motion-gesture-${gestureKey}-${propKey}`] = propValue.toString();
    });
  });

  return properties;
}

// Helper function to create smooth transitions
export function createTransition(
  properties: string[],
  duration: string = motionTokens.duration.normal.s,
  easing: string = motionTokens.easing.easeInOut,
  delay: string = '0s'
): string {
  const adjustedDuration = getAdjustedDuration(duration);
  return properties
    .map(prop => `${prop} ${adjustedDuration} ${easing} ${delay}`)
    .join(', ');
}

// Utility to stop all animations on an element
export function stopAnimations(element: HTMLElement): void {
  if (typeof window === 'undefined' || !element) return;
  
  try {
    const animations = element.getAnimations();
    animations.forEach(animation => {
      animation.cancel();
    });
  } catch (error) {
    console.warn('Error stopping animations:', error);
  }
}