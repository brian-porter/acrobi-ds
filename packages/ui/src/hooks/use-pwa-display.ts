/**
 * @fileoverview AAE Display Context Hook for Epic 66
 * Detects AAE display mode (standalone, fullscreen, minimal-ui, browser)
 */

import { useState, useEffect, useCallback } from 'react';

// Display mode types based on AAE manifest specification
export type AAEDisplayMode = 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';

// AAE display state interface
export interface AAEDisplayState {
  displayMode: AAEDisplayMode;
  isStandalone: boolean;
  isFullscreen: boolean;
  isMinimalUI: boolean;
  isBrowser: boolean;
  isInstalled: boolean;
  isSupported: boolean;
  canInstall: boolean;
}

// Hook options
export interface UseAAEDisplayOptions {
  debug?: boolean;
  onDisplayModeChange?: (mode: AAEDisplayMode) => void;
  onInstallPrompt?: (canInstall: boolean) => void;
}

// Hook return interface
export interface UseAAEDisplayReturn {
  state: AAEDisplayState;
  displayMode: AAEDisplayMode;
  isStandalone: boolean;
  isFullscreen: boolean;
  isMinimalUI: boolean;
  isBrowser: boolean;
  isInstalled: boolean;
  isSupported: boolean;
  canInstall: boolean;
  getInstallPrompt: () => BeforeInstallPromptEvent | null;
  showInstallPrompt: () => Promise<boolean>;
  refresh: () => void;
}

// Utility functions
export class AAEDisplayUtils {
  static detectDisplayMode(): AAEDisplayMode {
    if (typeof window === 'undefined') {
      return 'browser';
    }

    try {
      // Check for fullscreen mode first (most specific)
      if (window.matchMedia('(display-mode: fullscreen)').matches) {
        return 'fullscreen';
      }

      // Check for standalone mode
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return 'standalone';
      }

      // Check for minimal-ui mode
      if (window.matchMedia('(display-mode: minimal-ui)').matches) {
        return 'minimal-ui';
      }

      // Fallback to browser mode
      return 'browser';
    } catch (error) {
      console.warn('Failed to detect display mode:', error);
      return 'browser';
    }
  }

  static isDisplayModeSupported(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      return 'matchMedia' in window && typeof window.matchMedia === 'function';
    } catch {
      return false;
    }
  }

  static isAAEInstalled(): boolean {
    const mode = AAEDisplayUtils.detectDisplayMode();
    return mode === 'standalone' || mode === 'fullscreen' || mode === 'minimal-ui';
  }

  static isMobile(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  static isIOS(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }

    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  static isAndroid(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }

    return /Android/.test(navigator.userAgent);
  }

  static getDisplayModeQuery(mode: AAEDisplayMode): string {
    return `(display-mode: ${mode})`;
  }

  static createDisplayState(displayMode: AAEDisplayMode): AAEDisplayState {
    const isSupported = AAEDisplayUtils.isDisplayModeSupported();
    const isInstalled = AAEDisplayUtils.isAAEInstalled();

    return {
      displayMode,
      isStandalone: displayMode === 'standalone',
      isFullscreen: displayMode === 'fullscreen',
      isMinimalUI: displayMode === 'minimal-ui',
      isBrowser: displayMode === 'browser',
      isInstalled,
      isSupported,
      canInstall: !isInstalled && isSupported
    };
  }

  static getManifestConfig(): Record<string, any> {
    return {
      name: 'AAE Application',
      short_name: 'AAE App',
      description: 'Acrobi\'s Advanced Experiences Application',
      display: 'standalone',
      orientation: 'portrait-primary',
      theme_color: '#000000',
      background_color: '#ffffff',
      start_url: '/',
      scope: '/',
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    };
  }

  static logDisplayInfo(debug: boolean = false): void {
    if (!debug || typeof window === 'undefined') {
      return;
    }

    const mode = AAEDisplayUtils.detectDisplayMode();
    const isInstalled = AAEDisplayUtils.isAAEInstalled();
    const isSupported = AAEDisplayUtils.isDisplayModeSupported();

    console.group('AAE Display Context');
    console.log('Display Mode:', mode);
    console.log('Is Installed:', isInstalled);
    console.log('Is Supported:', isSupported);
    console.log('Is Mobile:', AAEDisplayUtils.isMobile());
    console.log('Is iOS:', AAEDisplayUtils.isIOS());
    console.log('Is Android:', AAEDisplayUtils.isAndroid());
    console.log('User Agent:', navigator.userAgent);
    console.groupEnd();
  }
}

// Global interface for beforeinstallprompt event
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

/**
 * useAAEDisplay Hook
 * 
 * Detects AAE display mode and installation status
 * 
 * @param options - Configuration options for the hook
 * @returns Hook state and utility functions
 */
export function useAAEDisplay(options: UseAAEDisplayOptions = {}): UseAAEDisplayReturn {
  const {
    debug = false,
    onDisplayModeChange,
    onInstallPrompt
  } = options;

  // Initialize state
  const [state, setState] = useState<AAEDisplayState>(() => {
    const mode = AAEDisplayUtils.detectDisplayMode();
    return AAEDisplayUtils.createDisplayState(mode);
  });

  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  // Refresh display mode detection
  const refresh = useCallback(() => {
    const newMode = AAEDisplayUtils.detectDisplayMode();
    const newState = AAEDisplayUtils.createDisplayState(newMode);
    
    setState(prevState => {
      if (prevState.displayMode !== newMode) {
        if (debug) {
          console.log('AAE Display mode changed:', prevState.displayMode, '->', newMode);
        }
        onDisplayModeChange?.(newMode);
      }
      return newState;
    });
  }, [debug, onDisplayModeChange]);

  // Handle beforeinstallprompt event
  const handleBeforeInstallPrompt = useCallback((event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    setInstallPromptEvent(event);
    
    setState(prevState => ({
      ...prevState,
      canInstall: true
    }));

    if (debug) {
      console.log('AAE install prompt available');
    }
    
    onInstallPrompt?.(true);
  }, [debug, onInstallPrompt]);

  // Handle app installed event
  const handleAppInstalled = useCallback(() => {
    setInstallPromptEvent(null);
    
    setState(prevState => ({
      ...prevState,
      isInstalled: true,
      canInstall: false
    }));

    if (debug) {
      console.log('AAE app installed');
    }
  }, [debug]);

  // Set up media query listeners
  useEffect(() => {
    if (!AAEDisplayUtils.isDisplayModeSupported()) {
      return;
    }

    const mediaQueries = [
      window.matchMedia('(display-mode: standalone)'),
      window.matchMedia('(display-mode: fullscreen)'),
      window.matchMedia('(display-mode: minimal-ui)')
    ];

    const handleChange = () => {
      refresh();
    };

    // Add listeners
    mediaQueries.forEach(mq => {
      if (mq.addEventListener) {
        mq.addEventListener('change', handleChange);
      } else if (mq.addListener) {
        // Fallback for older browsers
        (mq as any).addListener(handleChange);
      }
    });

    // Initial refresh
    refresh();

    // Log debug info
    if (debug) {
      AAEDisplayUtils.logDisplayInfo(true);
    }

    // Cleanup
    return () => {
      mediaQueries.forEach(mq => {
        if (mq.removeEventListener) {
          mq.removeEventListener('change', handleChange);
        } else if (mq.removeListener) {
          // Fallback for older browsers
          (mq as any).removeListener(handleChange);
        }
      });
    };
  }, [refresh, debug]);

  // Handle install prompt events
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [handleBeforeInstallPrompt, handleAppInstalled]);

  // Get install prompt event
  const getInstallPrompt = useCallback((): BeforeInstallPromptEvent | null => {
    return installPromptEvent;
  }, [installPromptEvent]);

  // Show install prompt
  const showInstallPrompt = useCallback(async (): Promise<boolean> => {
    if (!installPromptEvent) {
      if (debug) {
        console.warn('No install prompt available');
      }
      return false;
    }

    try {
      await installPromptEvent.prompt();
      const { outcome } = await installPromptEvent.userChoice;
      
      if (debug) {
        console.log('Install prompt result:', outcome);
      }

      if (outcome === 'accepted') {
        setInstallPromptEvent(null);
        setState(prevState => ({
          ...prevState,
          canInstall: false
        }));
        return true;
      }

      return false;
    } catch (error) {
      if (debug) {
        console.error('Error showing install prompt:', error);
      }
      return false;
    }
  }, [installPromptEvent, debug]);

  // Return hook interface
  return {
    state,
    displayMode: state.displayMode,
    isStandalone: state.isStandalone,
    isFullscreen: state.isFullscreen,
    isMinimalUI: state.isMinimalUI,
    isBrowser: state.isBrowser,
    isInstalled: state.isInstalled,
    isSupported: state.isSupported,
    canInstall: state.canInstall,
    getInstallPrompt,
    showInstallPrompt,
    refresh
  };
}