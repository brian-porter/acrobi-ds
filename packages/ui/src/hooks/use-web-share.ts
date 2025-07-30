/**
 * @fileoverview Web Share Hook for Epic 56 - AAE Web Share
 * Provides comprehensive web sharing capabilities using the Web Share API.
 * Handles native OS sharing for text, URLs, and files with fallback mechanisms.
 */

import { useState, useCallback, useRef } from 'react';

// Web share types
export interface ShareData {
  /** Title of the content being shared */
  title?: string;
  /** Text content to share */
  text?: string;
  /** URL to share */
  url?: string;
  /** Files to share (if supported) */
  files?: File[];
}

export interface WebShareOptions {
  /** Callback when share is successful */
  onSuccess?: (data: ShareData) => void;
  /** Callback when share is cancelled/aborted */
  onAbort?: () => void;
  /** Callback when error occurs */
  onError?: (error: WebShareError) => void;
  /** Fallback behavior when Web Share API is not available */
  fallbackBehavior?: 'clipboard' | 'mailto' | 'custom' | 'none';
  /** Custom fallback handler */
  customFallback?: (data: ShareData) => Promise<boolean>;
}

export interface WebShareError {
  type: 'not_supported' | 'invalid_data' | 'not_allowed' | 'abort' | 'general';
  message: string;
  originalError?: Error;
}

export interface WebShareState {
  isSupported: boolean;
  isSharing: boolean;
  canShareFiles: boolean;
  lastSharedData: ShareData | null;
  shareCount: number;
}

export interface FallbackOptions {
  /** Whether to copy to clipboard as fallback */
  enableClipboard?: boolean;
  /** Whether to use mailto as fallback */
  enableMailto?: boolean;
  /** Custom share text for fallback */
  fallbackText?: string;
}

export interface UseWebShareReturn {
  // State
  state: WebShareState;
  error: WebShareError | null;

  // Actions
  share: (data: ShareData) => Promise<boolean>;
  canShare: (data: ShareData) => boolean;
  shareUrl: (url: string, title?: string) => Promise<boolean>;
  shareText: (text: string, title?: string) => Promise<boolean>;
  shareFiles: (files: File[], title?: string) => Promise<boolean>;

  // Utilities
  isSupported: boolean;
  getShareableUrl: (path?: string) => string;
  generateShareData: (
    type: 'page' | 'selection' | 'custom',
    customData?: Partial<ShareData>
  ) => ShareData;
  copyToClipboard: (data: ShareData) => Promise<boolean>;
  openMailto: (data: ShareData) => void;
  clearError: () => void;
}

// Check if Web Share API is supported
const isWebShareSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    'navigator' in window &&
    'share' in navigator &&
    typeof navigator.share === 'function'
  );
};

// Check if Web Share API supports files
const canShareFiles = (): boolean => {
  return (
    isWebShareSupported() &&
    'canShare' in navigator &&
    typeof navigator.canShare === 'function'
  );
};

// Utility functions
const formatShareableText = (data: ShareData): string => {
  const parts = [];
  if (data.title) parts.push(data.title);
  if (data.text) parts.push(data.text);
  if (data.url) parts.push(data.url);
  return parts.join('\n\n');
};

const validateShareData = (data: ShareData): boolean => {
  // At least one property must be provided
  return !!(
    data.title ||
    data.text ||
    data.url ||
    (data.files && data.files.length > 0)
  );
};

const sanitizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url, window.location.href);
    return urlObj.href;
  } catch {
    return url;
  }
};

/**
 * Web Share Hook
 * Manages native OS sharing using the Web Share API with fallback mechanisms
 */
export function useWebShare(options: WebShareOptions = {}): UseWebShareReturn {
  const {
    onSuccess,
    onAbort,
    onError,
    fallbackBehavior = 'clipboard',
    customFallback,
  } = options;

  // State
  const [state, setState] = useState<WebShareState>({
    isSupported: isWebShareSupported(),
    isSharing: false,
    canShareFiles: canShareFiles(),
    lastSharedData: null,
    shareCount: 0,
  });

  const [error, setError] = useState<WebShareError | null>(null);

  // Refs for cleanup
  const abortControllerRef = useRef<AbortController | null>(null);

  // Error handling
  const handleError = useCallback(
    (type: WebShareError['type'], message: string, originalError?: Error) => {
      const webShareError: WebShareError = { type, message, originalError };
      setError(webShareError);
      onError?.(webShareError);
    },
    [onError]
  );

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Copy to clipboard fallback
  const copyToClipboard = useCallback(
    async (data: ShareData): Promise<boolean> => {
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
          return false;
        }

        const text = formatShareableText(data);
        await navigator.clipboard.writeText(text);

        console.log('Content copied to clipboard as fallback');
        return true;
      } catch (err) {
        console.error('Clipboard fallback failed:', err);
        return false;
      }
    },
    []
  );

  // Mailto fallback
  const openMailto = useCallback((data: ShareData) => {
    const subject = encodeURIComponent(data.title || 'Shared content');
    const body = encodeURIComponent(formatShareableText(data));
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;

    window.open(mailtoUrl, '_blank');
  }, []);

  // Handle fallback behavior
  const handleFallback = useCallback(
    async (data: ShareData): Promise<boolean> => {
      switch (fallbackBehavior) {
        case 'clipboard':
          return await copyToClipboard(data);

        case 'mailto':
          openMailto(data);
          return true;

        case 'custom':
          if (customFallback) {
            return await customFallback(data);
          }
          return false;

        case 'none':
        default:
          return false;
      }
    },
    [fallbackBehavior, customFallback, copyToClipboard, openMailto]
  );

  // Check if data can be shared
  const canShare = useCallback(
    (data: ShareData): boolean => {
      if (!validateShareData(data)) {
        return false;
      }

      if (!state.isSupported) {
        // Check if fallback is available
        return fallbackBehavior !== 'none';
      }

      // Use navigator.canShare if available
      if ('canShare' in navigator && typeof navigator.canShare === 'function') {
        try {
          return navigator.canShare(data);
        } catch {
          return false;
        }
      }

      // Basic validation for older browsers
      return !!(data.title || data.text || data.url);
    },
    [state.isSupported, fallbackBehavior]
  );

  // Main share function
  const share = useCallback(
    async (data: ShareData): Promise<boolean> => {
      if (!validateShareData(data)) {
        handleError(
          'invalid_data',
          'Share data must contain at least title, text, url, or files'
        );
        return false;
      }

      clearError();
      setState(prev => ({ ...prev, isSharing: true }));

      // Abort previous share if still in progress
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      try {
        if (state.isSupported) {
          // Use native Web Share API
          await navigator.share(data);

          // Success
          setState(prev => ({
            ...prev,
            isSharing: false,
            lastSharedData: data,
            shareCount: prev.shareCount + 1,
          }));

          onSuccess?.(data);
          return true;
        } else {
          // Use fallback mechanism
          const fallbackSuccess = await handleFallback(data);

          setState(prev => ({
            ...prev,
            isSharing: false,
            lastSharedData: fallbackSuccess ? data : null,
            shareCount: fallbackSuccess ? prev.shareCount + 1 : prev.shareCount,
          }));

          if (fallbackSuccess) {
            onSuccess?.(data);
            return true;
          } else {
            handleError(
              'not_supported',
              'Web Share API not supported and no fallback available'
            );
            return false;
          }
        }
      } catch (err) {
        const error = err as Error;

        setState(prev => ({ ...prev, isSharing: false }));

        if (error.name === 'AbortError') {
          // User cancelled the share
          onAbort?.();
          return false;
        } else if (error.name === 'NotAllowedError') {
          handleError(
            'not_allowed',
            'Share permission denied or requires user gesture'
          );
          return false;
        } else {
          handleError('general', `Share failed: ${error.message}`, error);
          return false;
        }
      }
    },
    [
      state.isSupported,
      handleError,
      clearError,
      handleFallback,
      onSuccess,
      onAbort,
    ]
  );

  // Convenience function for sharing URLs
  const shareUrl = useCallback(
    async (url: string, title?: string): Promise<boolean> => {
      const sanitizedUrl = sanitizeUrl(url);
      return share({
        url: sanitizedUrl,
        title: title || document.title,
      });
    },
    [share]
  );

  // Convenience function for sharing text
  const shareText = useCallback(
    async (text: string, title?: string): Promise<boolean> => {
      return share({
        text,
        title: title || 'Shared text',
      });
    },
    [share]
  );

  // Convenience function for sharing files
  const shareFiles = useCallback(
    async (files: File[], title?: string): Promise<boolean> => {
      if (!state.canShareFiles) {
        handleError(
          'not_supported',
          'File sharing is not supported in this browser'
        );
        return false;
      }

      return share({
        files,
        title: title || 'Shared files',
      });
    },
    [share, state.canShareFiles, handleError]
  );

  // Get shareable URL for current page or custom path
  const getShareableUrl = useCallback((path?: string): string => {
    if (path) {
      try {
        return new URL(path, window.location.href).href;
      } catch {
        return path;
      }
    }
    return window.location.href;
  }, []);

  // Generate share data for common scenarios
  const generateShareData = useCallback(
    (
      type: 'page' | 'selection' | 'custom',
      customData?: Partial<ShareData>
    ): ShareData => {
      switch (type) {
        case 'page':
          return {
            title: document.title,
            url: getShareableUrl(),
            ...customData,
          };

        case 'selection':
          const selection = window.getSelection()?.toString() || '';
          return {
            title: `Selection from ${document.title}`,
            text: selection,
            url: getShareableUrl(),
            ...customData,
          };

        case 'custom':
        default:
          return {
            title: document.title,
            url: getShareableUrl(),
            ...customData,
          };
      }
    },
    [getShareableUrl]
  );

  return {
    // State
    state,
    error,

    // Actions
    share,
    canShare,
    shareUrl,
    shareText,
    shareFiles,

    // Utilities
    isSupported: state.isSupported,
    getShareableUrl,
    generateShareData,
    copyToClipboard,
    openMailto,
    clearError,
  };
}

// Utility functions
export const WebShareUtils = {
  isSupported: isWebShareSupported,
  canShareFiles,
  formatShareableText,
  validateShareData,
  sanitizeUrl,

  /**
   * Get browser support information
   */
  getBrowserSupport: () => ({
    chrome: 'Supported since Chrome 89 (Android), Chrome 93 (Desktop)',
    firefox: 'Not supported',
    safari: 'Supported since Safari 14 (iOS), Safari 12.1 (macOS)',
    edge: 'Supported since Edge 93',
    mobile: 'Widely supported on mobile browsers',
  }),

  /**
   * Check what can be shared on current platform
   */
  getCapabilities: () => ({
    text: isWebShareSupported(),
    url: isWebShareSupported(),
    files: canShareFiles(),
    title: isWebShareSupported(),
  }),

  /**
   * Get common share data templates
   */
  getTemplates: () => ({
    currentPage: (): ShareData => ({
      title: document.title,
      url: window.location.href,
    }),

    article: (title: string, excerpt?: string): ShareData => ({
      title,
      text: excerpt,
      url: window.location.href,
    }),

    quote: (text: string, author?: string): ShareData => ({
      title: author ? `Quote by ${author}` : 'Shared Quote',
      text: author ? `"${text}" - ${author}` : `"${text}"`,
      url: window.location.href,
    }),

    product: (
      name: string,
      description?: string,
      price?: string
    ): ShareData => ({
      title: `Check out: ${name}`,
      text: [description, price].filter(Boolean).join(' - '),
      url: window.location.href,
    }),
  }),

  /**
   * Create shareable links for social platforms (fallback)
   */
  createSocialLinks: (data: ShareData) => {
    const encodedUrl = encodeURIComponent(data.url || window.location.href);
    const encodedTitle = encodeURIComponent(data.title || document.title);
    const encodedText = encodeURIComponent(data.text || '');

    return {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%0A${encodedUrl}`,
    };
  },

  /**
   * Detect best sharing method for current platform
   */
  detectBestMethod: (): 'native' | 'clipboard' | 'social' => {
    if (isWebShareSupported()) {
      return 'native';
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      return 'clipboard';
    } else {
      return 'social';
    }
  },

  /**
   * Create a comprehensive fallback strategy
   */
  createFallbackStrategy: (data: ShareData) => {
    const strategies = [];

    // Try clipboard first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      strategies.push({
        name: 'clipboard',
        action: () => navigator.clipboard.writeText(formatShareableText(data)),
        description: 'Copy to clipboard',
      });
    }

    // Add social sharing links
    const socialLinks = WebShareUtils.createSocialLinks(data);
    Object.entries(socialLinks).forEach(([platform, url]) => {
      strategies.push({
        name: platform,
        action: () => window.open(url, '_blank', 'width=600,height=400'),
        description: `Share on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
      });
    });

    return strategies;
  },
};

export default useWebShare;
