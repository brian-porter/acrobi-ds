/**
 * @fileoverview Text-to-Speech Hook for Epic 58 - AAE Text-to-Speech (TTS)
 * Provides comprehensive text-to-speech capabilities using the Web Speech API.
 * Handles voice synthesis with advanced controls and cross-browser compatibility.
 */

import { useState, useCallback, useRef, useEffect } from 'react';

// TTS types
export interface TTSVoice {
  /** Voice display name */
  name: string;
  /** Language code (e.g., 'en-US') */
  lang: string;
  /** Whether voice is local or remote */
  localService: boolean;
  /** Whether this is the default voice */
  default: boolean;
  /** Voice URI identifier */
  voiceURI: string;
  /** Original SpeechSynthesisVoice object */
  originalVoice: SpeechSynthesisVoice;
}

export interface TTSOptions {
  /** Text to speak */
  text: string;
  /** Voice to use (voice object or voice name) */
  voice?: TTSVoice | string;
  /** Speech rate (0.1 to 10, default 1) */
  rate?: number;
  /** Speech pitch (0 to 2, default 1) */
  pitch?: number;
  /** Speech volume (0 to 1, default 1) */
  volume?: number;
  /** Language code override */
  lang?: string;
}

export interface TTSState {
  isSupported: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  isPending: boolean;
  voices: TTSVoice[];
  currentText: string | null;
  currentVoice: TTSVoice | null;
  speechCount: number;
  lastError: TTSError | null;
}

export interface TTSError {
  type:
    | 'not_supported'
    | 'network'
    | 'not_allowed'
    | 'interrupted'
    | 'synthesis_failed'
    | 'general';
  message: string;
  originalError?: Error;
}

export interface TTSHookOptions {
  /** Auto-load voices on mount */
  autoLoadVoices?: boolean;
  /** Default voice name or language preference */
  defaultVoice?: string;
  /** Default speech rate */
  defaultRate?: number;
  /** Default speech pitch */
  defaultPitch?: number;
  /** Default speech volume */
  defaultVolume?: number;
  /** Callback when speech starts */
  onStart?: () => void;
  /** Callback when speech ends */
  onEnd?: () => void;
  /** Callback when speech is paused */
  onPause?: () => void;
  /** Callback when speech is resumed */
  onResume?: () => void;
  /** Callback when error occurs */
  onError?: (error: TTSError) => void;
  /** Callback when boundary is reached (word/sentence) */
  onBoundary?: (event: SpeechSynthesisEvent) => void;
}

export interface UseTTSReturn {
  // State
  state: TTSState;
  error: TTSError | null;

  // Actions
  speak: (options: TTSOptions | string) => Promise<boolean>;
  stop: () => void;
  pause: () => void;
  resume: () => void;

  // Voice management
  getVoices: () => Promise<TTSVoice[]>;
  getVoicesByLanguage: (lang: string) => TTSVoice[];
  findVoice: (nameOrLang: string) => TTSVoice | null;
  setDefaultVoice: (voice: TTSVoice | string) => void;

  // Utilities
  isSupported: boolean;
  isBrowserSupported: () => boolean;
  getLanguages: () => string[];
  testVoice: (voice: TTSVoice, testText?: string) => Promise<boolean>;
  preloadVoices: () => Promise<void>;
  clearError: () => void;

  // Advanced features
  speakSentences: (
    text: string,
    options?: Partial<TTSOptions>
  ) => Promise<boolean>;
  speakWithHighlight: (
    text: string,
    onWordBoundary?: (word: string, index: number) => void
  ) => Promise<boolean>;
  estimateDuration: (text: string, rate?: number) => number;
  normalizeText: (text: string) => string;
}

// Check if Speech Synthesis API is supported
const isSpeechSynthesisSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window
  );
};

// Utility functions
const convertVoice = (voice: SpeechSynthesisVoice): TTSVoice => ({
  name: voice.name,
  lang: voice.lang,
  localService: voice.localService,
  default: voice.default,
  voiceURI: voice.voiceURI,
  originalVoice: voice,
});

const normalizeVoiceList = (voices: SpeechSynthesisVoice[]): TTSVoice[] => {
  // Remove duplicates and sort by language, then by name
  const uniqueVoices = voices.reduce((acc: TTSVoice[], voice) => {
    const existing = acc.find(v => v.voiceURI === voice.voiceURI);
    if (!existing) {
      acc.push(convertVoice(voice));
    }
    return acc;
  }, []);

  return uniqueVoices.sort((a, b) => {
    if (a.lang !== b.lang) {
      return a.lang.localeCompare(b.lang);
    }
    return a.name.localeCompare(b.name);
  });
};

const findBestVoice = (
  voices: TTSVoice[],
  preference: string
): TTSVoice | null => {
  if (voices.length === 0) return null;

  // Try exact name match
  let voice = voices.find(
    v => v.name.toLowerCase() === preference.toLowerCase()
  );
  if (voice) return voice;

  // Try language match
  voice = voices.find(v =>
    v.lang.toLowerCase().startsWith(preference.toLowerCase())
  );
  if (voice) return voice;

  // Try partial name match
  voice = voices.find(v =>
    v.name.toLowerCase().includes(preference.toLowerCase())
  );
  if (voice) return voice;

  // Return default voice or first available
  return voices.find(v => v.default) || voices[0];
};

const estimateTextDuration = (text: string, rate: number = 1): number => {
  // Average reading speed is about 150-200 words per minute
  // We'll use 180 WPM as baseline, adjusted by rate
  const wordsPerMinute = 180 * rate;
  const wordCount = text.trim().split(/\s+/).length;
  return (wordCount / wordsPerMinute) * 60 * 1000; // Return in milliseconds
};

const normalizeTextForSpeech = (text: string): string => {
  return (
    text
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      // Handle abbreviations
      .replace(/\bDr\./g, 'Doctor')
      .replace(/\bMr\./g, 'Mister')
      .replace(/\bMrs\./g, 'Missus')
      .replace(/\bMs\./g, 'Miss')
      // Handle common symbols
      .replace(/&/g, 'and')
      .replace(/@/g, 'at')
      .replace(/#/g, 'hash')
      .replace(/\$/g, 'dollar')
      .replace(/%/g, 'percent')
      // Clean up
      .trim()
  );
};

/**
 * Text-to-Speech Hook
 * Manages text-to-speech synthesis using the Web Speech API
 */
export function useTTS(hookOptions: TTSHookOptions = {}): UseTTSReturn {
  const {
    autoLoadVoices = true,
    defaultVoice,
    defaultRate = 1,
    defaultPitch = 1,
    defaultVolume = 1,
    onStart,
    onEnd,
    onPause,
    onResume,
    onError,
    onBoundary,
  } = hookOptions;

  // State
  const [state, setState] = useState<TTSState>({
    isSupported: isSpeechSynthesisSupported(),
    isSpeaking: false,
    isPaused: false,
    isPending: false,
    voices: [],
    currentText: null,
    currentVoice: null,
    speechCount: 0,
    lastError: null,
  });

  const [error, setError] = useState<TTSError | null>(null);

  // Refs
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const defaultVoiceRef = useRef<TTSVoice | null>(null);

  // Error handling
  const handleError = useCallback(
    (type: TTSError['type'], message: string, originalError?: Error) => {
      const ttsError: TTSError = { type, message, originalError };
      setError(ttsError);
      setState(prev => ({ ...prev, lastError: ttsError }));
      onError?.(ttsError);
    },
    [onError]
  );

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
    setState(prev => ({ ...prev, lastError: null }));
  }, []);

  // Load voices
  const getVoices = useCallback(async (): Promise<TTSVoice[]> => {
    if (!state.isSupported) {
      return [];
    }

    return new Promise(resolve => {
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        const normalizedVoices = normalizeVoiceList(voices);

        setState(prev => ({ ...prev, voices: normalizedVoices }));

        // Set default voice if specified
        if (defaultVoice && !defaultVoiceRef.current) {
          const preferredVoice = findBestVoice(normalizedVoices, defaultVoice);
          if (preferredVoice) {
            defaultVoiceRef.current = preferredVoice;
            setState(prev => ({ ...prev, currentVoice: preferredVoice }));
          }
        }

        resolve(normalizedVoices);
      };

      // Voices might not be loaded immediately
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        loadVoices();
      } else {
        speechSynthesis.addEventListener('voiceschanged', loadVoices, {
          once: true,
        });
        // Fallback timeout
        setTimeout(loadVoices, 1000);
      }
    });
  }, [state.isSupported, defaultVoice]);

  // Initialize voices on mount
  useEffect(() => {
    if (autoLoadVoices && state.isSupported) {
      getVoices();
    }
  }, [autoLoadVoices, state.isSupported, getVoices]);

  // Voice management functions
  const getVoicesByLanguage = useCallback(
    (lang: string): TTSVoice[] => {
      return state.voices.filter(voice =>
        voice.lang.toLowerCase().startsWith(lang.toLowerCase())
      );
    },
    [state.voices]
  );

  const findVoice = useCallback(
    (nameOrLang: string): TTSVoice | null => {
      return findBestVoice(state.voices, nameOrLang);
    },
    [state.voices]
  );

  const setDefaultVoice = useCallback(
    (voice: TTSVoice | string) => {
      const targetVoice = typeof voice === 'string' ? findVoice(voice) : voice;
      if (targetVoice) {
        defaultVoiceRef.current = targetVoice;
        setState(prev => ({ ...prev, currentVoice: targetVoice }));
      }
    },
    [findVoice]
  );

  // Speech control functions
  const stop = useCallback(() => {
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
      setState(prev => ({
        ...prev,
        isSpeaking: false,
        isPaused: false,
        isPending: false,
        currentText: null,
      }));
    }
  }, []);

  const pause = useCallback(() => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      setState(prev => ({ ...prev, isPaused: true }));
      onPause?.();
    }
  }, [onPause]);

  const resume = useCallback(() => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setState(prev => ({ ...prev, isPaused: false }));
      onResume?.();
    }
  }, [onResume]);

  // Main speak function
  const speak = useCallback(
    async (options: TTSOptions | string): Promise<boolean> => {
      if (!state.isSupported) {
        handleError(
          'not_supported',
          'Speech synthesis is not supported in this browser'
        );
        return false;
      }

      // Stop any current speech
      stop();
      clearError();

      // Parse options
      const speakOptions: TTSOptions =
        typeof options === 'string' ? { text: options } : options;

      const {
        text,
        voice,
        rate = defaultRate,
        pitch = defaultPitch,
        volume = defaultVolume,
        lang,
      } = speakOptions;

      if (!text || text.trim().length === 0) {
        handleError('general', 'No text provided for speech synthesis');
        return false;
      }

      // Normalize text
      const normalizedText = normalizeTextForSpeech(text);

      // Create utterance
      const utterance = new SpeechSynthesisUtterance(normalizedText);

      // Set voice
      let selectedVoice: TTSVoice | null = null;
      if (voice) {
        selectedVoice = typeof voice === 'string' ? findVoice(voice) : voice;
      } else if (defaultVoiceRef.current) {
        selectedVoice = defaultVoiceRef.current;
      } else if (state.voices.length > 0) {
        selectedVoice = state.voices.find(v => v.default) || state.voices[0];
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice.originalVoice;
      }

      // Set properties
      utterance.rate = Math.max(0.1, Math.min(10, rate));
      utterance.pitch = Math.max(0, Math.min(2, pitch));
      utterance.volume = Math.max(0, Math.min(1, volume));

      if (lang) {
        utterance.lang = lang;
      }

      // Set up event handlers
      return new Promise(resolve => {
        utterance.onstart = () => {
          setState(prev => ({
            ...prev,
            isSpeaking: true,
            isPending: false,
            currentText: normalizedText,
            currentVoice: selectedVoice,
          }));
          onStart?.();
        };

        utterance.onend = () => {
          setState(prev => ({
            ...prev,
            isSpeaking: false,
            isPaused: false,
            isPending: false,
            currentText: null,
            speechCount: prev.speechCount + 1,
          }));
          onEnd?.();
          resolve(true);
        };

        utterance.onerror = event => {
          const errorType =
            event.error === 'network'
              ? 'network'
              : event.error === 'not-allowed'
                ? 'not_allowed'
                : event.error === 'interrupted'
                  ? 'interrupted'
                  : event.error === 'synthesis-failed'
                    ? 'synthesis_failed'
                    : 'general';

          handleError(errorType, `Speech synthesis failed: ${event.error}`);

          setState(prev => ({
            ...prev,
            isSpeaking: false,
            isPaused: false,
            isPending: false,
            currentText: null,
          }));

          resolve(false);
        };

        utterance.onpause = () => {
          setState(prev => ({ ...prev, isPaused: true }));
          onPause?.();
        };

        utterance.onresume = () => {
          setState(prev => ({ ...prev, isPaused: false }));
          onResume?.();
        };

        utterance.onboundary = event => {
          onBoundary?.(event);
        };

        // Store reference and start speech
        currentUtteranceRef.current = utterance;

        setState(prev => ({ ...prev, isPending: true }));

        try {
          speechSynthesis.speak(utterance);
        } catch (err) {
          handleError('general', `Failed to start speech synthesis: ${err}`);
          resolve(false);
        }
      });
    },
    [
      state.isSupported,
      state.voices,
      defaultRate,
      defaultPitch,
      defaultVolume,
      findVoice,
      stop,
      clearError,
      handleError,
      onStart,
      onEnd,
      onPause,
      onResume,
      onBoundary,
    ]
  );

  // Advanced features
  const speakSentences = useCallback(
    async (
      text: string,
      options: Partial<TTSOptions> = {}
    ): Promise<boolean> => {
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

      for (const sentence of sentences) {
        const success = await speak({ ...options, text: sentence.trim() });
        if (!success) return false;

        // Wait for current sentence to finish
        while (state.isSpeaking) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      return true;
    },
    [speak, state.isSpeaking]
  );

  const speakWithHighlight = useCallback(
    async (
      text: string,
      onWordBoundary?: (word: string, index: number) => void
    ): Promise<boolean> => {
      if (!onWordBoundary) {
        return speak(text);
      }

      const words = text.split(/\s+/);
      let wordIndex = 0;

      const handleBoundary = (event: SpeechSynthesisEvent) => {
        if (event.name === 'word' && wordIndex < words.length) {
          onWordBoundary(words[wordIndex], wordIndex);
          wordIndex++;
        }
      };

      // Temporarily override the boundary handler
      const originalOnBoundary = onBoundary;
      const newOptions = { ...hookOptions, onBoundary: handleBoundary };

      return speak(text);
    },
    [speak, onBoundary, hookOptions]
  );

  const testVoice = useCallback(
    async (
      voice: TTSVoice,
      testText: string = 'Hello, this is a test.'
    ): Promise<boolean> => {
      return speak({
        text: testText,
        voice,
      });
    },
    [speak]
  );

  const preloadVoices = useCallback(async (): Promise<void> => {
    await getVoices();
  }, [getVoices]);

  // Utility functions
  const isBrowserSupported = useCallback((): boolean => {
    return isSpeechSynthesisSupported();
  }, []);

  const getLanguages = useCallback((): string[] => {
    const languages = new Set(state.voices.map(voice => voice.lang));
    return Array.from(languages).sort();
  }, [state.voices]);

  const estimateDuration = useCallback(
    (text: string, rate: number = defaultRate): number => {
      return estimateTextDuration(text, rate);
    },
    [defaultRate]
  );

  const normalizeText = useCallback((text: string): string => {
    return normalizeTextForSpeech(text);
  }, []);

  return {
    // State
    state,
    error,

    // Actions
    speak,
    stop,
    pause,
    resume,

    // Voice management
    getVoices,
    getVoicesByLanguage,
    findVoice,
    setDefaultVoice,

    // Utilities
    isSupported: state.isSupported,
    isBrowserSupported,
    getLanguages,
    testVoice,
    preloadVoices,
    clearError,

    // Advanced features
    speakSentences,
    speakWithHighlight,
    estimateDuration,
    normalizeText,
  };
}

// Utility functions
export const TTSUtils = {
  isSupported: isSpeechSynthesisSupported,

  /**
   * Get browser support information
   */
  getBrowserSupport: () => ({
    chrome: 'Full support since Chrome 33',
    firefox: 'Full support since Firefox 49',
    safari: 'Full support since Safari 7',
    edge: 'Full support since Edge 14',
    mobile: 'Widely supported on modern mobile browsers',
  }),

  /**
   * Get common language codes
   */
  getCommonLanguages: () => ({
    'en-US': 'English (United States)',
    'en-GB': 'English (United Kingdom)',
    'es-ES': 'Spanish (Spain)',
    'es-MX': 'Spanish (Mexico)',
    'fr-FR': 'French (France)',
    'de-DE': 'German (Germany)',
    'it-IT': 'Italian (Italy)',
    'pt-BR': 'Portuguese (Brazil)',
    'ru-RU': 'Russian (Russia)',
    'ja-JP': 'Japanese (Japan)',
    'ko-KR': 'Korean (South Korea)',
    'zh-CN': 'Chinese (Simplified)',
    'zh-TW': 'Chinese (Traditional)',
    'ar-SA': 'Arabic (Saudi Arabia)',
    'hi-IN': 'Hindi (India)',
  }),

  /**
   * Parse SSML-like markup (basic implementation)
   */
  parseSSML: (text: string): string => {
    return text
      .replace(/<break\s+time="(\d+)ms"\s*\/>/g, ' ')
      .replace(/<emphasis\s+level="strong">(.*?)<\/emphasis>/g, '$1')
      .replace(/<prosody\s+rate="(\w+)">(.*?)<\/prosody>/g, '$2')
      .replace(/<[^>]*>/g, ''); // Remove any remaining tags
  },

  /**
   * Split text into manageable chunks
   */
  chunkText: (text: string, maxLength: number = 200): string[] => {
    if (text.length <= maxLength) return [text];

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const chunks: string[] = [];
    let currentChunk = '';

    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      if (currentChunk.length + trimmedSentence.length + 1 <= maxLength) {
        currentChunk += (currentChunk ? '. ' : '') + trimmedSentence;
      } else {
        if (currentChunk) chunks.push(currentChunk + '.');
        currentChunk = trimmedSentence;
      }
    }

    if (currentChunk) chunks.push(currentChunk + '.');

    return chunks;
  },

  /**
   * Get voice quality score (heuristic)
   */
  getVoiceQuality: (voice: TTSVoice): number => {
    let score = 0;

    // Local voices are generally better quality
    if (voice.localService) score += 3;

    // Default voices are usually higher quality
    if (voice.default) score += 2;

    // Longer names often indicate premium voices
    if (voice.name.length > 20) score += 1;

    // Some known high-quality voice patterns
    if (voice.name.includes('Premium') || voice.name.includes('Enhanced'))
      score += 2;
    if (voice.name.includes('Neural') || voice.name.includes('HD')) score += 3;

    return score;
  },

  /**
   * Format speech rate for display
   */
  formatRate: (rate: number): string => {
    if (rate < 0.5) return 'Very Slow';
    if (rate < 0.8) return 'Slow';
    if (rate < 1.2) return 'Normal';
    if (rate < 1.5) return 'Fast';
    if (rate < 2) return 'Very Fast';
    return 'Extremely Fast';
  },

  /**
   * Format speech pitch for display
   */
  formatPitch: (pitch: number): string => {
    if (pitch < 0.5) return 'Very Low';
    if (pitch < 0.8) return 'Low';
    if (pitch < 1.2) return 'Normal';
    if (pitch < 1.5) return 'High';
    if (pitch < 2) return 'Very High';
    return 'Extremely High';
  },

  /**
   * Get speaking tips
   */
  getSpeakingTips: () => [
    'Use punctuation to control pacing and pauses',
    'Keep text chunks under 200 characters for better performance',
    'Test different voices to find the best one for your content',
    'Consider using slower rates for complex or technical content',
    'Provide visual feedback when speech is active',
    'Always provide text alternatives for accessibility',
    'Be mindful of data usage with remote voices',
  ],
};

export default useTTS;
