import { useState, useEffect } from 'react';

/**
 * Platform detection results
 */
export interface PlatformInfo {
  /** Operating system detected */
  os: 'iOS' | 'Android' | 'Windows' | 'macOS' | 'Linux' | 'Unknown';
  /** Browser engine detected */
  browser: 'Chrome' | 'Safari' | 'Firefox' | 'Edge' | 'Unknown';
  /** Device type classification */
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  /** Whether the app is running as a PWA */
  isPWA: boolean;
  /** Whether the device supports touch */
  hasTouch: boolean;
  /** Whether the platform is mobile (iOS or Android) */
  isMobile: boolean;
  /** Whether the platform is desktop (Windows, macOS, Linux) */
  isDesktop: boolean;
  /** Raw user agent string for advanced detection */
  userAgent: string;
}

/**
 * Hook return type
 */
export interface UsePlatformReturn {
  /** Detected platform information */
  platform: PlatformInfo;
  /** Whether platform detection is complete */
  isReady: boolean;
}

/**
 * Detect operating system from user agent
 */
function detectOS(userAgent: string): PlatformInfo['os'] {
  const ua = userAgent.toLowerCase();
  
  if (/iphone|ipad|ipod/.test(ua)) return 'iOS';
  if (/android/.test(ua)) return 'Android';
  if (/windows phone/.test(ua)) return 'Windows';
  if (/macintosh|mac os x/.test(ua)) return 'macOS';
  if (/linux/.test(ua)) return 'Linux';
  if (/windows/.test(ua)) return 'Windows';
  
  return 'Unknown';
}

/**
 * Detect browser from user agent
 */
function detectBrowser(userAgent: string): PlatformInfo['browser'] {
  const ua = userAgent.toLowerCase();
  
  // Check for Edge first (as it contains 'chrome' in UA)
  if (/edg\//.test(ua)) return 'Edge';
  
  // Check for Chrome (before Safari, as Safari UA contains 'chrome')
  if (/chrome/.test(ua) && !/edg\//.test(ua)) return 'Chrome';
  
  // Check for Safari
  if (/safari/.test(ua) && !/chrome/.test(ua)) return 'Safari';
  
  // Check for Firefox
  if (/firefox/.test(ua)) return 'Firefox';
  
  return 'Unknown';
}

/**
 * Detect device type from user agent and screen dimensions
 */
function detectDeviceType(userAgent: string): PlatformInfo['deviceType'] {
  const ua = userAgent.toLowerCase();
  
  // Mobile devices
  if (/mobile|iphone|ipod|android.*mobile/.test(ua)) {
    return 'mobile';
  }
  
  // Tablets
  if (/tablet|ipad|android(?!.*mobile)/.test(ua)) {
    return 'tablet';
  }
  
  // Desktop detection by elimination and screen size
  if (typeof window !== 'undefined') {
    const screenWidth = window.screen?.width || 0;
    const screenHeight = window.screen?.height || 0;
    
    // Consider large screens as desktop
    if (screenWidth >= 1024 || screenHeight >= 768) {
      return 'desktop';
    }
  }
  
  return 'unknown';
}

/**
 * Detect if running as PWA
 */
function detectPWA(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check if running in standalone mode (iOS Safari)
  if ('standalone' in window.navigator && window.navigator.standalone) {
    return true;
  }
  
  // Check display mode (modern browsers)
  if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }
  
  // Check if launched from home screen (Android Chrome)
  if (window.matchMedia && window.matchMedia('(display-mode: minimal-ui)').matches) {
    return true;
  }
  
  return false;
}

/**
 * Detect touch capability
 */
function detectTouch(): boolean {
  if (typeof window === 'undefined') return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - legacy property
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * usePlatform Hook
 * 
 * Provides reliable information about the user's platform environment including
 * operating system, browser, device type, and PWA status. Detection is performed
 * client-side only for SSR safety.
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { platform, isReady } = usePlatform();
 *   
 *   if (!isReady) {
 *     return <div>Detecting platform...</div>;
 *   }
 *   
 *   return (
 *     <div>
 *       <p>OS: {platform.os}</p>
 *       <p>Browser: {platform.browser}</p>
 *       <p>Device: {platform.deviceType}</p>
 *       <p>PWA: {platform.isPWA ? 'Yes' : 'No'}</p>
 *       {platform.isMobile && <MobileFeatures />}
 *       {platform.isDesktop && <DesktopFeatures />}
 *     </div>
 *   );
 * }
 * ```
 * 
 * @returns Platform detection results and ready state
 */
export function usePlatform(): UsePlatformReturn {
  const [platform, setPlatform] = useState<PlatformInfo>({
    os: 'Unknown',
    browser: 'Unknown',
    deviceType: 'unknown',
    isPWA: false,
    hasTouch: false,
    isMobile: false,
    isDesktop: false,
    userAgent: '',
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Only run detection on client-side
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }

    try {
      const userAgent = navigator.userAgent;
      const os = detectOS(userAgent);
      const browser = detectBrowser(userAgent);
      const deviceType = detectDeviceType(userAgent);
      const isPWA = detectPWA();
      const hasTouch = detectTouch();
      
      const detectedPlatform: PlatformInfo = {
        os,
        browser,
        deviceType,
        isPWA,
        hasTouch,
        isMobile: os === 'iOS' || os === 'Android',
        isDesktop: os === 'Windows' || os === 'macOS' || os === 'Linux',
        userAgent,
      };

      setPlatform(detectedPlatform);
      setIsReady(true);
    } catch (error) {
      console.warn('Platform detection failed:', error);
      setIsReady(true); // Still set ready even if detection fails
    }
  }, []);

  return {
    platform,
    isReady,
  };
}

/**
 * Platform utilities for advanced use cases
 */
export const PlatformUtils = {
  /**
   * Check if current platform matches given criteria
   */
  matches: (criteria: Partial<PlatformInfo>, platform: PlatformInfo): boolean => {
    return Object.entries(criteria).every(([key, value]) => {
      return platform[key as keyof PlatformInfo] === value;
    });
  },

  /**
   * Get platform-specific CSS class names
   */
  getCSSClasses: (platform: PlatformInfo): string[] => {
    const classes: string[] = [];
    
    classes.push(`os-${platform.os.toLowerCase()}`);
    classes.push(`browser-${platform.browser.toLowerCase()}`);
    classes.push(`device-${platform.deviceType}`);
    
    if (platform.isPWA) classes.push('pwa');
    if (platform.hasTouch) classes.push('touch');
    if (platform.isMobile) classes.push('mobile');
    if (platform.isDesktop) classes.push('desktop');
    
    return classes;
  },

  /**
   * Check if platform supports specific web APIs
   */
  supportsAPI: (api: string): boolean => {
    if (typeof window === 'undefined') return false;
    
    const apiMap: Record<string, () => boolean> = {
      serviceWorker: () => 'serviceWorker' in navigator,
      pushManager: () => 'PushManager' in window,
      backgroundSync: () => 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype,
      webShare: () => 'share' in navigator,
      clipboard: () => 'clipboard' in navigator,
      geolocation: () => 'geolocation' in navigator,
      camera: () => 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
      bluetooth: () => 'bluetooth' in navigator,
      nfc: () => 'nfc' in navigator,
      webAuthn: () => 'credentials' in navigator && 'create' in navigator.credentials,
      fileSystemAccess: () => 'showOpenFilePicker' in window,
      badging: () => 'setAppBadge' in navigator,
      wakeLock: () => 'wakeLock' in navigator,
    };
    
    const checker = apiMap[api];
    return checker ? checker() : false;
  },

  /**
   * Get recommended PWA installation method for current platform
   */
  getInstallMethod: (platform: PlatformInfo): string => {
    if (platform.os === 'iOS' && platform.browser === 'Safari') {
      return 'Add to Home Screen via Safari share menu';
    }
    
    if (platform.os === 'Android' && platform.browser === 'Chrome') {
      return 'Install app prompt or Chrome menu';
    }
    
    if (platform.isDesktop && platform.browser === 'Chrome') {
      return 'Install app via Chrome address bar icon';
    }
    
    if (platform.isDesktop && platform.browser === 'Edge') {
      return 'Install app via Edge address bar or menu';
    }
    
    return 'Browser-specific installation method';
  },
};