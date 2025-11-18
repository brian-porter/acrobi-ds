import { useState, useEffect, useCallback } from 'react';

// Types
export interface NetworkInfo {
  isOnline: boolean;
  effectiveType: '2g' | '3g' | '4g' | 'slow-2g' | 'unknown';
  downlink: number;
  rtt: number;
  saveData: boolean;
}

export interface NetworkOptions {
  onOnline?: () => void;
  onOffline?: () => void;
  onConnectionChange?: (info: NetworkInfo) => void;
  checkInterval?: number;
}

export interface UseNetworkReturn {
  // Network state
  isOnline: boolean;
  isOffline: boolean;
  networkInfo: NetworkInfo;

  // Connection quality
  connectionQuality: 'poor' | 'good' | 'excellent' | 'unknown';
  estimatedBandwidth: number;

  // Utilities
  checkConnection: () => Promise<boolean>;
  isSlowConnection: () => boolean;
  canUpload: (fileSize: number) => boolean;

  // Network awareness
  isNetworkSuitable: (minBandwidth?: number) => boolean;
  getSuggestedQuality: () => 'low' | 'medium' | 'high';

  // Browser support
  isSupported: boolean;
}

// Network quality thresholds (in Mbps)
const QUALITY_THRESHOLDS = {
  poor: 0.5,
  good: 2,
  excellent: 10,
} as const;

// Default network info
const getDefaultNetworkInfo = (): NetworkInfo => ({
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  effectiveType: 'unknown',
  downlink: 10,
  rtt: 100,
  saveData: false,
});

// Check if Network Information API is supported
const isNetworkInfoSupported = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return (
    'connection' in navigator ||
    'mozConnection' in navigator ||
    'webkitConnection' in navigator
  );
};

// Get network connection object
const getConnection = (): any => {
  if (typeof navigator === 'undefined') return null;
  return (
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection
  );
};

// Test network speed by making a small request
const testNetworkSpeed = async (): Promise<{
  downlink: number;
  rtt: number;
}> => {
  try {
    const startTime = performance.now();
    const response = await fetch('/favicon.ico', {
      method: 'HEAD',
      cache: 'no-cache',
    });
    const endTime = performance.now();

    const rtt = endTime - startTime;
    // Estimate downlink based on response time (rough approximation)
    const estimatedDownlink =
      rtt < 100 ? 10 : rtt < 300 ? 4 : rtt < 1000 ? 2 : 0.5;

    return {
      downlink: estimatedDownlink,
      rtt,
    };
  } catch (error) {
    return {
      downlink: 1,
      rtt: 500,
    };
  }
};

export function useNetwork(options: NetworkOptions = {}): UseNetworkReturn {
  const {
    onOnline,
    onOffline,
    onConnectionChange,
    checkInterval = 30000,
  } = options;

  // State
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>(
    getDefaultNetworkInfo()
  );

  // Browser support detection
  const isSupported = typeof navigator !== 'undefined' && 'onLine' in navigator;
  const isNetworkInfoAvailable = isNetworkInfoSupported();

  // Update network info from Network Information API
  const updateNetworkInfo = useCallback(() => {
    const connection = getConnection();
    if (!connection) return;

    const info: NetworkInfo = {
      isOnline: navigator.onLine,
      effectiveType: connection.effectiveType || 'unknown',
      downlink: connection.downlink || 10,
      rtt: connection.rtt || 100,
      saveData: connection.saveData || false,
    };

    setNetworkInfo(info);
    onConnectionChange?.(info);
  }, [onConnectionChange]);

  // Fallback network speed test when API is not available
  const updateNetworkInfoFallback = useCallback(async () => {
    const speedTest = await testNetworkSpeed();
    const info: NetworkInfo = {
      isOnline: navigator.onLine,
      effectiveType:
        speedTest.downlink > 4 ? '4g' : speedTest.downlink > 1 ? '3g' : '2g',
      downlink: speedTest.downlink,
      rtt: speedTest.rtt,
      saveData: false,
    };

    setNetworkInfo(info);
    onConnectionChange?.(info);
  }, [onConnectionChange]);

  // Handle online/offline events
  const handleOnline = useCallback(() => {
    setIsOnline(true);
    updateNetworkInfo();
    onOnline?.();
  }, [updateNetworkInfo, onOnline]);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
    setNetworkInfo(prev => ({ ...prev, isOnline: false }));
    onOffline?.();
  }, [onOffline]);

  // Check connection manually
  const checkConnection = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch('/favicon.ico', {
        method: 'HEAD',
        cache: 'no-cache',
      });
      const online = response.ok;
      setIsOnline(online);

      if (online && !isNetworkInfoAvailable) {
        await updateNetworkInfoFallback();
      }

      return online;
    } catch (error) {
      setIsOnline(false);
      return false;
    }
  }, [isNetworkInfoAvailable, updateNetworkInfoFallback]);

  // Utility functions
  const connectionQuality = (() => {
    if (!isOnline) return 'poor';
    if (networkInfo.downlink >= QUALITY_THRESHOLDS.excellent)
      return 'excellent';
    if (networkInfo.downlink >= QUALITY_THRESHOLDS.good) return 'good';
    if (networkInfo.downlink >= QUALITY_THRESHOLDS.poor) return 'poor';
    return 'unknown';
  })();

  const estimatedBandwidth = networkInfo.downlink;

  const isSlowConnection = useCallback((): boolean => {
    return (
      networkInfo.downlink < QUALITY_THRESHOLDS.poor ||
      networkInfo.effectiveType === 'slow-2g' ||
      networkInfo.effectiveType === '2g'
    );
  }, [networkInfo]);

  const canUpload = useCallback(
    (fileSize: number): boolean => {
      if (!isOnline) return false;

      // Estimate upload time based on file size and connection speed
      const fileSizeMB = fileSize / (1024 * 1024);
      const uploadTimeMins = fileSizeMB / (networkInfo.downlink * 0.8); // Assume 80% of downlink for upload

      // Don't allow uploads > 5 minutes on slow connections
      if (isSlowConnection() && uploadTimeMins > 5) return false;

      return true;
    },
    [isOnline, networkInfo.downlink, isSlowConnection]
  );

  const isNetworkSuitable = useCallback(
    (minBandwidth: number = 1): boolean => {
      return isOnline && networkInfo.downlink >= minBandwidth;
    },
    [isOnline, networkInfo.downlink]
  );

  const getSuggestedQuality = useCallback((): 'low' | 'medium' | 'high' => {
    if (!isOnline || isSlowConnection()) return 'low';
    if (connectionQuality === 'excellent') return 'high';
    return 'medium';
  }, [isOnline, isSlowConnection, connectionQuality]);

  // Set up event listeners
  useEffect(() => {
    if (!isSupported) return;

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set up Network Information API listeners
    const connection = getConnection();
    if (connection && 'addEventListener' in connection) {
      connection.addEventListener('change', updateNetworkInfo);
    }

    // Initial network info update
    if (isNetworkInfoAvailable) {
      updateNetworkInfo();
    } else if (isOnline) {
      updateNetworkInfoFallback();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);

      if (connection && 'removeEventListener' in connection) {
        connection.removeEventListener('change', updateNetworkInfo);
      }
    };
  }, [
    isSupported,
    isNetworkInfoAvailable,
    handleOnline,
    handleOffline,
    updateNetworkInfo,
    updateNetworkInfoFallback,
    isOnline,
  ]);

  // Periodic connection checks
  useEffect(() => {
    if (!checkInterval || checkInterval <= 0) return;

    const interval = setInterval(() => {
      if (!isNetworkInfoAvailable) {
        checkConnection();
      }
    }, checkInterval);

    return () => clearInterval(interval);
  }, [checkInterval, checkConnection, isNetworkInfoAvailable]);

  return {
    // Network state
    isOnline,
    isOffline: !isOnline,
    networkInfo,

    // Connection quality
    connectionQuality,
    estimatedBandwidth,

    // Utilities
    checkConnection,
    isSlowConnection,
    canUpload,

    // Network awareness
    isNetworkSuitable,
    getSuggestedQuality,

    // Browser support
    isSupported,
  };
}
