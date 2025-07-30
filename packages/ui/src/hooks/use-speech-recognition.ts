/**
 * @fileoverview Speech Recognition Hook for Epic 59 - AAE Speech Recognition
 * Provides comprehensive speech-to-text capabilities using the Web Speech API.
 * Handles voice recognition with advanced controls and language support.
 */

import { useState, useCallback, useRef, useEffect } from 'react';

// Speech Recognition types
export interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  interpretation?: any;
  emma?: any;
}

export interface SpeechRecognitionErrorEvent extends Event {
  error:
    | 'no-speech'
    | 'aborted'
    | 'audio-capture'
    | 'network'
    | 'not-allowed'
    | 'service-not-allowed'
    | 'bad-grammar'
    | 'language-not-supported';
  message?: string;
}

export interface SpeechRecognitionResultItem {
  confidence: number;
  transcript: string;
}

export interface SpeechRecognitionResult {
  /** Whether this result is final */
  isFinal: boolean;
  /** Array of alternative interpretations */
  alternatives: SpeechRecognitionResultItem[];
  /** Best transcript */
  transcript: string;
  /** Confidence score (0-1) */
  confidence: number;
  /** Timestamp when recognition occurred */
  timestamp: number;
}

export interface SpeechRecognitionOptions {
  /** Language code (e.g., 'en-US') */
  lang?: string;
  /** Whether to return continuous results */
  continuous?: boolean;
  /** Whether to return interim results */
  interimResults?: boolean;
  /** Maximum number of alternative results */
  maxAlternatives?: number;
  /** Grammar to use for recognition */
  grammars?: SpeechGrammarList;
  /** Service URI for remote recognition */
  serviceURI?: string;
}

export interface SpeechRecognitionState {
  isSupported: boolean;
  isListening: boolean;
  isStarting: boolean;
  language: string;
  interimResult: string;
  finalResult: string;
  allResults: SpeechRecognitionResult[];
  error: SpeechRecognitionError | null;
  sessionCount: number;
  wordCount: number;
  lastStartTime: number | null;
  duration: number;
}

export interface SpeechRecognitionError {
  type:
    | 'not_supported'
    | 'permission_denied'
    | 'network'
    | 'no_speech'
    | 'aborted'
    | 'audio_capture'
    | 'service_not_allowed'
    | 'bad_grammar'
    | 'language_not_supported'
    | 'general';
  message: string;
  originalError?: Error;
}

export interface SpeechRecognitionHookOptions {
  /** Default language for recognition */
  defaultLanguage?: string;
  /** Whether to use continuous recognition */
  continuous?: boolean;
  /** Whether to return interim results */
  interimResults?: boolean;
  /** Maximum alternatives to return */
  maxAlternatives?: number;
  /** Auto-start recognition on mount */
  autoStart?: boolean;
  /** Timeout in milliseconds before stopping (0 = no timeout) */
  timeout?: number;
  /** Callback when recognition starts */
  onStart?: () => void;
  /** Callback when recognition ends */
  onEnd?: () => void;
  /** Callback when result is received */
  onResult?: (result: SpeechRecognitionResult) => void;
  /** Callback when interim result is received */
  onInterimResult?: (transcript: string) => void;
  /** Callback when final result is received */
  onFinalResult?: (transcript: string) => void;
  /** Callback when error occurs */
  onError?: (error: SpeechRecognitionError) => void;
  /** Callback when no speech is detected */
  onNoSpeech?: () => void;
  /** Callback when sound is detected (start of speech) */
  onSoundStart?: () => void;
  /** Callback when sound ends */
  onSoundEnd?: () => void;
  /** Callback when speech starts */
  onSpeechStart?: () => void;
  /** Callback when speech ends */
  onSpeechEnd?: () => void;
}

export interface UseSpeechRecognitionReturn {
  // State
  state: SpeechRecognitionState;
  error: SpeechRecognitionError | null;

  // Actions
  startListening: (options?: Partial<SpeechRecognitionOptions>) => void;
  stopListening: () => void;
  abortListening: () => void;
  restartListening: () => void;

  // Configuration
  setLanguage: (language: string) => void;
  setContinuous: (continuous: boolean) => void;
  setInterimResults: (interimResults: boolean) => void;

  // Utilities
  isSupported: boolean;
  isBrowserSupported: () => boolean;
  getLanguages: () => string[];
  clearResults: () => void;
  clearError: () => void;

  // Advanced features
  resetSession: () => void;
  exportResults: (format: 'text' | 'json' | 'srt') => string;
  getStatistics: () => SpeechRecognitionStatistics;
  testMicrophone: () => Promise<boolean>;
}

export interface SpeechRecognitionStatistics {
  totalSessions: number;
  totalWords: number;
  averageConfidence: number;
  totalDuration: number;
  wordsPerMinute: number;
  errorCount: number;
  successRate: number;
}

// Check if Speech Recognition API is supported
const isSpeechRecognitionSupported = (): boolean => {
  if (typeof window === 'undefined') return false;

  const SpeechRecognition =
    window.SpeechRecognition || (window as any).webkitSpeechRecognition;
  return Boolean(SpeechRecognition);
};

// Get the Speech Recognition constructor
const getSpeechRecognitionConstructor = () => {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || (window as any).webkitSpeechRecognition;
};

/**
 * Speech Recognition Hook
 * Manages speech-to-text conversion using the Web Speech API
 */
export function useSpeechRecognition(
  hookOptions: SpeechRecognitionHookOptions = {}
): UseSpeechRecognitionReturn {
  const {
    defaultLanguage = 'en-US',
    continuous = false,
    interimResults = true,
    maxAlternatives = 1,
    autoStart = false,
    timeout = 0,
    onStart,
    onEnd,
    onResult,
    onInterimResult,
    onFinalResult,
    onError,
    onNoSpeech,
    onSoundStart,
    onSoundEnd,
    onSpeechStart,
    onSpeechEnd,
  } = hookOptions;

  // State
  const [state, setState] = useState<SpeechRecognitionState>({
    isSupported: isSpeechRecognitionSupported(),
    isListening: false,
    isStarting: false,
    language: defaultLanguage,
    interimResult: '',
    finalResult: '',
    allResults: [],
    error: null,
    sessionCount: 0,
    wordCount: 0,
    lastStartTime: null,
    duration: 0,
  });

  const [error, setError] = useState<SpeechRecognitionError | null>(null);

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const configRef = useRef({
    language: defaultLanguage,
    continuous,
    interimResults,
    maxAlternatives,
  });

  // Error handling
  const handleError = useCallback(
    (
      type: SpeechRecognitionError['type'],
      message: string,
      originalError?: Error
    ) => {
      const speechError: SpeechRecognitionError = {
        type,
        message,
        originalError,
      };
      setError(speechError);
      setState(prev => ({
        ...prev,
        error: speechError,
        isListening: false,
        isStarting: false,
      }));
      onError?.(speechError);
    },
    [onError]
  );

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Create and configure recognition instance
  const createRecognition = useCallback(() => {
    if (!state.isSupported) return null;

    const SpeechRecognition = getSpeechRecognitionConstructor();
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();

    // Configure recognition
    recognition.lang = configRef.current.language;
    recognition.continuous = configRef.current.continuous;
    recognition.interimResults = configRef.current.interimResults;
    recognition.maxAlternatives = configRef.current.maxAlternatives;

    // Event handlers
    recognition.onstart = () => {
      startTimeRef.current = Date.now();
      setState(prev => ({
        ...prev,
        isListening: true,
        isStarting: false,
        lastStartTime: Date.now(),
        sessionCount: prev.sessionCount + 1,
      }));
      onStart?.();
    };

    recognition.onend = () => {
      if (startTimeRef.current) {
        const duration = Date.now() - startTimeRef.current;
        setState(prev => ({
          ...prev,
          isListening: false,
          isStarting: false,
          duration: prev.duration + duration,
        }));
      } else {
        setState(prev => ({ ...prev, isListening: false, isStarting: false }));
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      startTimeRef.current = null;
      onEnd?.();
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';
      const results: SpeechRecognitionResult[] = [];

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;

        const recognitionResult: SpeechRecognitionResult = {
          isFinal: result.isFinal,
          alternatives: Array.from(result).map(alt => ({
            transcript: alt.transcript,
            confidence: alt.confidence,
          })),
          transcript,
          confidence,
          timestamp: Date.now(),
        };

        results.push(recognitionResult);

        if (result.isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setState(prev => {
        const newFinalResult = prev.finalResult + finalTranscript;
        const wordCount = newFinalResult
          .trim()
          .split(/\s+/)
          .filter(word => word.length > 0).length;

        return {
          ...prev,
          interimResult: interimTranscript,
          finalResult: newFinalResult,
          allResults: [...prev.allResults, ...results],
          wordCount,
        };
      });

      // Call callbacks
      results.forEach(result => {
        onResult?.(result);
        if (result.isFinal) {
          onFinalResult?.(result.transcript);
        } else {
          onInterimResult?.(result.transcript);
        }
      });
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const errorType =
        event.error === 'no-speech'
          ? 'no_speech'
          : event.error === 'aborted'
            ? 'aborted'
            : event.error === 'audio-capture'
              ? 'audio_capture'
              : event.error === 'network'
                ? 'network'
                : event.error === 'not-allowed'
                  ? 'permission_denied'
                  : event.error === 'service-not-allowed'
                    ? 'service_not_allowed'
                    : event.error === 'bad-grammar'
                      ? 'bad_grammar'
                      : event.error === 'language-not-supported'
                        ? 'language_not_supported'
                        : 'general';

      handleError(
        errorType,
        `Speech recognition error: ${event.error}`,
        new Error(event.message)
      );
    };

    recognition.onnomatch = () => {
      console.log('No speech was recognized');
    };

    recognition.onsoundstart = () => {
      onSoundStart?.();
    };

    recognition.onsoundend = () => {
      onSoundEnd?.();
    };

    recognition.onspeechstart = () => {
      onSpeechStart?.();
    };

    recognition.onspeechend = () => {
      onSpeechEnd?.();
    };

    recognition.onnomatch = () => {
      onNoSpeech?.();
    };

    return recognition;
  }, [
    state.isSupported,
    handleError,
    onStart,
    onEnd,
    onResult,
    onInterimResult,
    onFinalResult,
    onNoSpeech,
    onSoundStart,
    onSoundEnd,
    onSpeechStart,
    onSpeechEnd,
  ]);

  // Start listening
  const startListening = useCallback(
    (options: Partial<SpeechRecognitionOptions> = {}) => {
      if (!state.isSupported) {
        handleError(
          'not_supported',
          'Speech recognition is not supported in this browser'
        );
        return;
      }

      if (state.isListening) {
        console.warn('Speech recognition is already active');
        return;
      }

      clearError();

      // Update configuration
      configRef.current = {
        ...configRef.current,
        ...options,
      };

      // Create new recognition instance
      const recognition = createRecognition();
      if (!recognition) {
        handleError(
          'not_supported',
          'Failed to create speech recognition instance'
        );
        return;
      }

      recognitionRef.current = recognition;

      // Set starting state
      setState(prev => ({
        ...prev,
        isStarting: true,
        interimResult: '',
        error: null,
      }));

      // Set timeout if specified
      if (timeout > 0) {
        timeoutRef.current = setTimeout(() => {
          stopListening();
        }, timeout);
      }

      try {
        recognition.start();
      } catch (err) {
        handleError(
          'general',
          `Failed to start speech recognition: ${err}`,
          err as Error
        );
      }
    },
    [
      state.isSupported,
      state.isListening,
      timeout,
      clearError,
      createRecognition,
      handleError,
    ]
  );

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current && state.isListening) {
      recognitionRef.current.stop();
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [state.isListening]);

  // Abort listening
  const abortListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setState(prev => ({ ...prev, isListening: false, isStarting: false }));
  }, []);

  // Restart listening
  const restartListening = useCallback(() => {
    stopListening();
    setTimeout(() => {
      startListening(configRef.current);
    }, 100);
  }, [stopListening, startListening]);

  // Configuration setters
  const setLanguage = useCallback((language: string) => {
    configRef.current.language = language;
    setState(prev => ({ ...prev, language }));
  }, []);

  const setContinuous = useCallback((continuous: boolean) => {
    configRef.current.continuous = continuous;
  }, []);

  const setInterimResults = useCallback((interimResults: boolean) => {
    configRef.current.interimResults = interimResults;
  }, []);

  // Utility functions
  const isBrowserSupported = useCallback((): boolean => {
    return isSpeechRecognitionSupported();
  }, []);

  const getLanguages = useCallback((): string[] => {
    // Common languages supported by most browsers
    return [
      'en-US',
      'en-GB',
      'en-AU',
      'en-CA',
      'en-IN',
      'en-NZ',
      'en-ZA',
      'es-ES',
      'es-MX',
      'es-AR',
      'es-CO',
      'es-PE',
      'es-VE',
      'fr-FR',
      'fr-CA',
      'fr-BE',
      'fr-CH',
      'de-DE',
      'de-AT',
      'de-CH',
      'it-IT',
      'pt-BR',
      'pt-PT',
      'ru-RU',
      'ja-JP',
      'ko-KR',
      'zh-CN',
      'zh-TW',
      'zh-HK',
      'ar-SA',
      'hi-IN',
      'th-TH',
      'nl-NL',
      'sv-SE',
      'da-DK',
      'no-NO',
      'fi-FI',
      'pl-PL',
    ];
  }, []);

  const clearResults = useCallback(() => {
    setState(prev => ({
      ...prev,
      interimResult: '',
      finalResult: '',
      allResults: [],
      wordCount: 0,
    }));
  }, []);

  const resetSession = useCallback(() => {
    abortListening();
    setState(prev => ({
      ...prev,
      interimResult: '',
      finalResult: '',
      allResults: [],
      wordCount: 0,
      sessionCount: 0,
      duration: 0,
      error: null,
    }));
    setError(null);
  }, [abortListening]);

  // Export results
  const exportResults = useCallback(
    (format: 'text' | 'json' | 'srt'): string => {
      switch (format) {
        case 'text':
          return state.finalResult;

        case 'json':
          return JSON.stringify(
            {
              finalResult: state.finalResult,
              allResults: state.allResults,
              statistics: {
                sessionCount: state.sessionCount,
                wordCount: state.wordCount,
                duration: state.duration,
              },
              timestamp: new Date().toISOString(),
            },
            null,
            2
          );

        case 'srt':
          return state.allResults
            .filter(result => result.isFinal)
            .map((result, index) => {
              const startTime = new Date(result.timestamp);
              const endTime = new Date(result.timestamp + 3000); // 3 second duration

              const formatTime = (date: Date) => {
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const seconds = date.getSeconds().toString().padStart(2, '0');
                const milliseconds = date
                  .getMilliseconds()
                  .toString()
                  .padStart(3, '0');
                return `${hours}:${minutes}:${seconds},${milliseconds}`;
              };

              return `${index + 1}\n${formatTime(startTime)} --> ${formatTime(endTime)}\n${result.transcript}\n`;
            })
            .join('\n');

        default:
          return state.finalResult;
      }
    },
    [state]
  );

  // Get statistics
  const getStatistics = useCallback((): SpeechRecognitionStatistics => {
    const finalResults = state.allResults.filter(result => result.isFinal);
    const averageConfidence =
      finalResults.length > 0
        ? finalResults.reduce((sum, result) => sum + result.confidence, 0) /
          finalResults.length
        : 0;

    const wordsPerMinute =
      state.duration > 0 ? (state.wordCount / (state.duration / 1000)) * 60 : 0;

    return {
      totalSessions: state.sessionCount,
      totalWords: state.wordCount,
      averageConfidence,
      totalDuration: state.duration,
      wordsPerMinute,
      errorCount: state.allResults.filter(result => result.confidence < 0.5)
        .length,
      successRate:
        finalResults.length > 0
          ? (finalResults.filter(result => result.confidence >= 0.5).length /
              finalResults.length) *
            100
          : 0,
    };
  }, [state]);

  // Test microphone access
  const testMicrophone = useCallback(async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (err) {
      console.error('Microphone test failed:', err);
      return false;
    }
  }, []);

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && state.isSupported) {
      startListening();
    }
  }, [autoStart, state.isSupported, startListening]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    state,
    error,

    // Actions
    startListening,
    stopListening,
    abortListening,
    restartListening,

    // Configuration
    setLanguage,
    setContinuous,
    setInterimResults,

    // Utilities
    isSupported: state.isSupported,
    isBrowserSupported,
    getLanguages,
    clearResults,
    clearError,

    // Advanced features
    resetSession,
    exportResults,
    getStatistics,
    testMicrophone,
  };
}

// Utility functions
export const SpeechRecognitionUtils = {
  isSupported: isSpeechRecognitionSupported,

  /**
   * Get browser support information
   */
  getBrowserSupport: () => ({
    chrome: 'Full support since Chrome 25',
    firefox: 'Not supported (Web Speech API not implemented)',
    safari: 'Full support since Safari 14.1',
    edge: 'Full support since Edge 79',
    mobile: 'Limited support - Chrome Android, Safari iOS 14.5+',
  }),

  /**
   * Get common language codes
   */
  getCommonLanguages: () => ({
    'en-US': 'English (United States)',
    'en-GB': 'English (United Kingdom)',
    'en-AU': 'English (Australia)',
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
   * Process transcript for better readability
   */
  processTranscript: (transcript: string): string => {
    return (
      transcript
        // Capitalize first letter of sentences
        .replace(
          /(^|[.!?]\s+)([a-z])/g,
          (match, prefix, letter) => prefix + letter.toUpperCase()
        )
        // Add periods to end of sentences that don't have punctuation
        .replace(/([^.!?])(\s*$)/g, '$1.')
        // Clean up extra spaces
        .replace(/\s+/g, ' ')
        .trim()
    );
  },

  /**
   * Calculate word count
   */
  getWordCount: (text: string): number => {
    return text
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0).length;
  },

  /**
   * Calculate reading speed (words per minute)
   */
  calculateWPM: (wordCount: number, durationMs: number): number => {
    if (durationMs === 0) return 0;
    return (wordCount / (durationMs / 1000)) * 60;
  },

  /**
   * Format duration for display
   */
  formatDuration: (durationMs: number): string => {
    const seconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${remainingSeconds}s`;
  },

  /**
   * Get confidence level description
   */
  getConfidenceLevel: (confidence: number): string => {
    if (confidence >= 0.9) return 'Very High';
    if (confidence >= 0.7) return 'High';
    if (confidence >= 0.5) return 'Medium';
    if (confidence >= 0.3) return 'Low';
    return 'Very Low';
  },

  /**
   * Get usage tips
   */
  getUsageTips: () => [
    'Speak clearly and at a moderate pace',
    'Reduce background noise for better accuracy',
    'Use a good quality microphone when possible',
    'Speak in the selected language consistently',
    'Pause briefly between sentences for better recognition',
    'Check microphone permissions if recognition fails',
    'Use continuous mode for longer dictation sessions',
  ],

  /**
   * Get privacy guidelines
   */
  getPrivacyGuidelines: () => [
    'Audio is processed locally by the browser when possible',
    'Some browsers may send audio to remote services',
    'No audio data is stored by this application',
    'Check browser privacy settings for speech recognition',
    'Be aware of sensitive information when using speech recognition',
    'Consider using push-to-talk for sensitive content',
  ],
};

export default useSpeechRecognition;
