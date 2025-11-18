// packages/ui/src/themes/base/audio.ts

/**
 * Audio design tokens for cross-platform audio feedback
 * Supports Web Audio API, iOS AudioSession, and Android AudioManager
 */

// Audio duration values in milliseconds
export interface AudioDuration {
  instant: number;
  short: number;
  medium: number;
  long: number;
  extended: number;
}

// Audio volume levels (0.0 to 1.0)
export interface AudioVolume {
  silent: number;
  quiet: number;
  normal: number;
  loud: number;
  maximum: number;
}

// Audio frequency values in Hz
export interface AudioFrequency {
  low: number;
  midLow: number;
  mid: number;
  midHigh: number;
  high: number;
}

// Audio feedback types with their characteristics
export interface AudioFeedback {
  success: {
    frequency: number;
    duration: number;
    volume: number;
    wave: 'sine' | 'square' | 'triangle' | 'sawtooth';
  };
  error: {
    frequency: number;
    duration: number;
    volume: number;
    wave: 'sine' | 'square' | 'triangle' | 'sawtooth';
  };
  warning: {
    frequency: number;
    duration: number;
    volume: number;
    wave: 'sine' | 'square' | 'triangle' | 'sawtooth';
  };
  notification: {
    frequency: number;
    duration: number;
    volume: number;
    wave: 'sine' | 'square' | 'triangle' | 'sawtooth';
  };
  interaction: {
    frequency: number;
    duration: number;
    volume: number;
    wave: 'sine' | 'square' | 'triangle' | 'sawtooth';
  };
  focus: {
    frequency: number;
    duration: number;
    volume: number;
    wave: 'sine' | 'square' | 'triangle' | 'sawtooth';
  };
}

// Audio categories for system sounds
export interface AudioCategories {
  system: {
    startup: string;
    shutdown: string;
    error: string;
    notification: string;
  };
  interaction: {
    click: string;
    hover: string;
    focus: string;
    blur: string;
    select: string;
    toggle: string;
  };
  feedback: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  navigation: {
    pageLoad: string;
    pageUnload: string;
    routeChange: string;
    backAction: string;
  };
}

// Complete audio token structure
export interface AudioTokens {
  duration: AudioDuration;
  volume: AudioVolume;
  frequency: AudioFrequency;
  feedback: AudioFeedback;
  categories: AudioCategories;
  settings: {
    enableSpatialAudio: boolean;
    enableDoppler: boolean;
    maxConcurrentSounds: number;
    defaultSampleRate: number;
    bufferSize: number;
  };
}

// Default audio token values
export const audioTokens: AudioTokens = {
  duration: {
    instant: 50,
    short: 150,
    medium: 300,
    long: 600,
    extended: 1200,
  },
  volume: {
    silent: 0.0,
    quiet: 0.2,
    normal: 0.5,
    loud: 0.8,
    maximum: 1.0,
  },
  frequency: {
    low: 200,
    midLow: 400,
    mid: 800,
    midHigh: 1600,
    high: 3200,
  },
  feedback: {
    success: {
      frequency: 800,
      duration: 150,
      volume: 0.5,
      wave: 'sine',
    },
    error: {
      frequency: 300,
      duration: 300,
      volume: 0.6,
      wave: 'triangle',
    },
    warning: {
      frequency: 600,
      duration: 200,
      volume: 0.5,
      wave: 'square',
    },
    notification: {
      frequency: 1000,
      duration: 100,
      volume: 0.4,
      wave: 'sine',
    },
    interaction: {
      frequency: 1200,
      duration: 50,
      volume: 0.3,
      wave: 'sine',
    },
    focus: {
      frequency: 900,
      duration: 75,
      volume: 0.25,
      wave: 'sine',
    },
  },
  categories: {
    system: {
      startup: 'system-startup.wav',
      shutdown: 'system-shutdown.wav',
      error: 'system-error.wav',
      notification: 'system-notification.wav',
    },
    interaction: {
      click: 'interaction-click.wav',
      hover: 'interaction-hover.wav',
      focus: 'interaction-focus.wav',
      blur: 'interaction-blur.wav',
      select: 'interaction-select.wav',
      toggle: 'interaction-toggle.wav',
    },
    feedback: {
      success: 'feedback-success.wav',
      warning: 'feedback-warning.wav',
      error: 'feedback-error.wav',
      info: 'feedback-info.wav',
    },
    navigation: {
      pageLoad: 'navigation-page-load.wav',
      pageUnload: 'navigation-page-unload.wav',
      routeChange: 'navigation-route-change.wav',
      backAction: 'navigation-back.wav',
    },
  },
  settings: {
    enableSpatialAudio: false,
    enableDoppler: false,
    maxConcurrentSounds: 8,
    defaultSampleRate: 44100,
    bufferSize: 1024,
  },
};

// Helper function to create audio context with fallback
export function createAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    return AudioContextClass ? new AudioContextClass() : null;
  } catch (error) {
    console.warn('AudioContext not supported:', error);
    return null;
  }
}

// Helper function to play audio feedback
export function playAudioFeedback(
  type: keyof AudioFeedback,
  audioContext?: AudioContext | null
): Promise<void> {
  return new Promise((resolve) => {
    if (!audioContext) {
      audioContext = createAudioContext();
    }
    
    if (!audioContext) {
      resolve();
      return;
    }

    const feedback = audioTokens.feedback[type];
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = feedback.wave;
    oscillator.frequency.setValueAtTime(feedback.frequency, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(feedback.volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + feedback.duration / 1000);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + feedback.duration / 1000);

    oscillator.onended = () => resolve();
    
    // Fallback timeout
    setTimeout(resolve, feedback.duration + 100);
  });
}

// Helper function to convert audio tokens to CSS custom properties
export function audioTokensToCSSProperties(tokens: AudioTokens): Record<string, string> {
  const properties: Record<string, string> = {};

  // Convert durations
  Object.entries(tokens.duration).forEach(([key, value]) => {
    properties[`--audio-duration-${key}`] = `${value}ms`;
  });

  // Convert volumes
  Object.entries(tokens.volume).forEach(([key, value]) => {
    properties[`--audio-volume-${key}`] = value.toString();
  });

  // Convert frequencies
  Object.entries(tokens.frequency).forEach(([key, value]) => {
    properties[`--audio-frequency-${key}`] = `${value}Hz`;
  });

  // Convert feedback settings
  Object.entries(tokens.feedback).forEach(([key, value]) => {
    properties[`--audio-feedback-${key}-freq`] = `${value.frequency}Hz`;
    properties[`--audio-feedback-${key}-duration`] = `${value.duration}ms`;
    properties[`--audio-feedback-${key}-volume`] = value.volume.toString();
    properties[`--audio-feedback-${key}-wave`] = value.wave;
  });

  return properties;
}