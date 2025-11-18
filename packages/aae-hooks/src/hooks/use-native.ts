/**
 * @fileoverview Native Platform Detection Hook for Capacitor Integration (Epic 47)
 * Provides platform detection capabilities for AAEs wrapped in Capacitor native shells,
 * enabling conditional rendering and platform-specific functionality.
 */

import { useState, useCallback, useEffect } from 'react';

export interface NativePlatformInfo {
  isNative: boolean;
  isWeb: boolean;
  platform: 'ios' | 'android' | 'web' | 'unknown';
  isCapacitor: boolean;
  hasCapacitorPlugins: boolean;
  canInstallApp: boolean;
  version?: string;
}

export interface UseNativeReturn {
  // Platform state
  platformInfo: NativePlatformInfo;
  isNative: boolean;
  isWeb: boolean;
  platform: NativePlatformInfo['platform'];

  // Capabilities
  isCapacitor: boolean;
  hasCapacitorPlugins: boolean;
  canInstallApp: boolean;

  // Utilities
  checkCapacitorPlugin: (pluginName: string) => boolean;
  getPlatformInfo: () => NativePlatformInfo;
  isIOSDevice: () => boolean;
  isAndroidDevice: () => boolean;
  isMobileDevice: () => boolean;
  isDesktopDevice: () => boolean;
  refresh: () => void;
}

// Utility functions for platform detection
const detectPlatform = (): NativePlatformInfo => {
  // Check if we're running in a browser environment
  if (typeof window === 'undefined') {
    return {
      isNative: false,
      isWeb: false,
      platform: 'unknown',
      isCapacitor: false,
      hasCapacitorPlugins: false,
      canInstallApp: false,
    };
  }

  // Check for Capacitor
  const hasCapacitor = typeof window.Capacitor !== 'undefined';
  const isCapacitorNative =
    hasCapacitor &&
    typeof window.Capacitor.isNativePlatform === 'function' &&
    window.Capacitor.isNativePlatform();

  // Determine platform
  let platform: NativePlatformInfo['platform'] = 'web';
  let version: string | undefined;

  if (hasCapacitor && isCapacitorNative) {
    // Get platform from Capacitor
    const capacitorPlatform = window.Capacitor.getPlatform?.();
    if (capacitorPlatform === 'ios' || capacitorPlatform === 'android') {
      platform = capacitorPlatform;
    }

    // Get version info if available
    version = window.Capacitor.getVersion?.();
  } else {
    // Fallback to user agent detection
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      platform = 'ios';
    } else if (/android/.test(userAgent)) {
      platform = 'android';
    }
  }

  // Check for Capacitor plugins availability
  const hasCapacitorPlugins =
    hasCapacitor &&
    typeof window.Capacitor.Plugins !== 'undefined' &&
    Object.keys(window.Capacitor.Plugins || {}).length > 0;

  // Check if app can be installed (AAE installability)
  const canInstallApp =
    !isCapacitorNative &&
    ('serviceWorker' in navigator ||
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true);

  return {
    isNative: isCapacitorNative,
    isWeb: !isCapacitorNative,
    platform,
    isCapacitor: hasCapacitor,
    hasCapacitorPlugins,
    canInstallApp,
    version,
  };
};

/**
 * Hook for detecting native platform and Capacitor environment
 * Useful for conditional rendering and platform-specific features
 */
export function useNative(): UseNativeReturn {
  const [platformInfo, setPlatformInfo] = useState<NativePlatformInfo>(() =>
    detectPlatform()
  );

  // Refresh platform info
  const refresh = useCallback(() => {
    setPlatformInfo(detectPlatform());
  }, []);

  // Check if a specific Capacitor plugin is available
  const checkCapacitorPlugin = useCallback(
    (pluginName: string): boolean => {
      if (!platformInfo.hasCapacitorPlugins) {
        return false;
      }

      return (
        typeof window !== 'undefined' &&
        window.Capacitor?.Plugins &&
        pluginName in window.Capacitor.Plugins
      );
    },
    [platformInfo.hasCapacitorPlugins]
  );

  // Get current platform info
  const getPlatformInfo = useCallback((): NativePlatformInfo => {
    return platformInfo;
  }, [platformInfo]);

  // Platform checks
  const isIOSDevice = useCallback((): boolean => {
    return platformInfo.platform === 'ios';
  }, [platformInfo.platform]);

  const isAndroidDevice = useCallback((): boolean => {
    return platformInfo.platform === 'android';
  }, [platformInfo.platform]);

  const isMobileDevice = useCallback((): boolean => {
    return (
      platformInfo.platform === 'ios' || platformInfo.platform === 'android'
    );
  }, [platformInfo.platform]);

  const isDesktopDevice = useCallback((): boolean => {
    return platformInfo.platform === 'web' && !isMobileDevice();
  }, [platformInfo.platform, isMobileDevice]);

  // Listen for platform changes (e.g., when Capacitor initializes)
  useEffect(() => {
    // Set up a listener for Capacitor ready event
    if (typeof window !== 'undefined' && !platformInfo.isCapacitor) {
      const checkCapacitorReady = () => {
        if (window.Capacitor) {
          refresh();
        }
      };

      // Check periodically for Capacitor initialization
      const interval = setInterval(checkCapacitorReady, 100);

      // Clean up after 5 seconds
      const timeout = setTimeout(() => {
        clearInterval(interval);
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [platformInfo.isCapacitor, refresh]);

  return {
    // Platform state
    platformInfo,
    isNative: platformInfo.isNative,
    isWeb: platformInfo.isWeb,
    platform: platformInfo.platform,

    // Capabilities
    isCapacitor: platformInfo.isCapacitor,
    hasCapacitorPlugins: platformInfo.hasCapacitorPlugins,
    canInstallApp: platformInfo.canInstallApp,

    // Utilities
    checkCapacitorPlugin,
    getPlatformInfo,
    isIOSDevice,
    isAndroidDevice,
    isMobileDevice,
    isDesktopDevice,
    refresh,
  };
}

// Export utility functions for standalone use
export const NativeUtils = {
  detectPlatform,

  /**
   * Check if running in Capacitor native environment
   */
  isCapacitorNative: (): boolean => {
    return (
      typeof window !== 'undefined' &&
      window.Capacitor &&
      typeof window.Capacitor.isNativePlatform === 'function' &&
      window.Capacitor.isNativePlatform()
    );
  },

  /**
   * Check if running in web environment
   */
  isWebEnvironment: (): boolean => {
    return typeof window !== 'undefined' && !NativeUtils.isCapacitorNative();
  },

  /**
   * Get Capacitor platform if available
   */
  getCapacitorPlatform: (): string | null => {
    if (typeof window !== 'undefined' && window.Capacitor?.getPlatform) {
      return window.Capacitor.getPlatform();
    }
    return null;
  },

  /**
   * Check if specific Capacitor plugin is available
   */
  hasCapacitorPlugin: (pluginName: string): boolean => {
    return (
      typeof window !== 'undefined' &&
      window.Capacitor?.Plugins &&
      pluginName in window.Capacitor.Plugins
    );
  },

  /**
   * Get device info string for debugging
   */
  getDeviceInfo: (): string => {
    const info = detectPlatform();
    return `Platform: ${info.platform}, Native: ${info.isNative}, Capacitor: ${info.isCapacitor}${info.version ? `, Version: ${info.version}` : ''}`;
  },
};

// Global type augmentation for Capacitor
declare global {
  interface Window {
    Capacitor?: {
      isNativePlatform?: () => boolean;
      getPlatform?: () => string;
      getVersion?: () => string;
      Plugins?: Record<string, any>;
    };
  }
}

export default useNative;
