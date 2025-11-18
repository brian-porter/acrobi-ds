import { useState, useEffect } from 'react';

/**
 * Supported feature APIs for detection
 */
export type FeatureAPI = 
  | 'serviceWorker'
  | 'pushManager'
  | 'backgroundSync'
  | 'periodicBackgroundSync'
  | 'backgroundFetch'
  | 'webShare'
  | 'webShareTarget'
  | 'clipboard'
  | 'clipboardWrite'
  | 'geolocation'
  | 'camera'
  | 'microphone'
  | 'bluetooth'
  | 'nfc'
  | 'webAuthn'
  | 'credentialManagement'
  | 'fileSystemAccess'
  | 'fileHandling'
  | 'badging'
  | 'wakeLock'
  | 'screenWakeLock'
  | 'deviceMotion'
  | 'deviceOrientation'
  | 'vibration'
  | 'contactPicker'
  | 'eyeDropper'
  | 'gamepad'
  | 'webHID'
  | 'webSerial'
  | 'webUSB'
  | 'screenCapture'
  | 'displayCapture'
  | 'mediaRecorder'
  | 'speechRecognition'
  | 'speechSynthesis'
  | 'paymentRequest'
  | 'launchQueue'
  | 'windowControlsOverlay'
  | 'documentPictureInPicture'
  | 'webCodecs'
  | 'webAssembly'
  | 'offscreenCanvas'
  | 'broadcastChannel'
  | 'sharedWorker'
  | 'webGL'
  | 'webGL2'
  | 'webGPU';

/**
 * Hook return type
 */
export interface UseFeatureDetectionReturn {
  /** Whether the feature is supported */
  isSupported: boolean;
  /** Whether detection is complete */
  isReady: boolean;
  /** Error during detection, if any */
  error?: Error;
}

/**
 * Feature detection functions mapped by API
 */
const featureDetectors: Record<FeatureAPI, () => boolean> = {
  // Service Worker APIs
  serviceWorker: () => 'serviceWorker' in navigator,
  pushManager: () => 'PushManager' in window && 'serviceWorker' in navigator,
  backgroundSync: () => 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype,
  periodicBackgroundSync: () => 'serviceWorker' in navigator && 'periodicSync' in window.ServiceWorkerRegistration.prototype,
  backgroundFetch: () => 'serviceWorker' in navigator && 'backgroundFetch' in window.ServiceWorkerRegistration.prototype,
  
  // Sharing APIs
  webShare: () => 'share' in navigator,
  webShareTarget: () => 'serviceWorker' in navigator, // Requires manifest + SW
  
  // Clipboard APIs
  clipboard: () => 'clipboard' in navigator,
  clipboardWrite: () => 'clipboard' in navigator && 'write' in navigator.clipboard,
  
  // Location & Sensors
  geolocation: () => 'geolocation' in navigator,
  deviceMotion: () => 'DeviceOrientationEvent' in window && 'DeviceMotionEvent' in window,
  deviceOrientation: () => 'DeviceOrientationEvent' in window,
  
  // Media APIs
  camera: () => 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
  microphone: () => 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
  mediaRecorder: () => 'MediaRecorder' in window,
  screenCapture: () => 'mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices,
  displayCapture: () => 'mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices,
  
  // Hardware APIs
  bluetooth: () => 'bluetooth' in navigator,
  nfc: () => 'nfc' in navigator,
  vibration: () => 'vibrate' in navigator,
  gamepad: () => 'getGamepads' in navigator,
  webHID: () => 'hid' in navigator,
  webSerial: () => 'serial' in navigator,
  webUSB: () => 'usb' in navigator,
  
  // Authentication & Security
  webAuthn: () => 'credentials' in navigator && 'create' in navigator.credentials,
  credentialManagement: () => 'credentials' in navigator,
  
  // File System APIs
  fileSystemAccess: () => 'showOpenFilePicker' in window,
  fileHandling: () => 'launchQueue' in window, // File handling requires launch queue
  
  // App APIs
  badging: () => 'setAppBadge' in navigator,
  wakeLock: () => 'wakeLock' in navigator,
  screenWakeLock: () => 'wakeLock' in navigator && 'request' in navigator.wakeLock,
  contactPicker: () => 'contacts' in navigator && 'select' in navigator.contacts,
  paymentRequest: () => 'PaymentRequest' in window,
  launchQueue: () => 'launchQueue' in window,
  windowControlsOverlay: () => 'windowControlsOverlay' in navigator,
  
  // Visual APIs
  eyeDropper: () => 'EyeDropper' in window,
  documentPictureInPicture: () => 'documentPictureInPicture' in window,
  offscreenCanvas: () => 'OffscreenCanvas' in window,
  
  // Audio APIs
  speechRecognition: () => 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window,
  speechSynthesis: () => 'speechSynthesis' in window,
  
  // Graphics & Compute APIs
  webGL: () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  },
  webGL2: () => {
    try {
      const canvas = document.createElement('canvas');
      return !!canvas.getContext('webgl2');
    } catch {
      return false;
    }
  },
  webGPU: () => 'gpu' in navigator,
  webCodecs: () => 'VideoEncoder' in window && 'VideoDecoder' in window,
  webAssembly: () => 'WebAssembly' in window,
  
  // Worker APIs
  sharedWorker: () => 'SharedWorker' in window,
  broadcastChannel: () => 'BroadcastChannel' in window,
};

/**
 * useFeatureDetection Hook
 * 
 * Detects whether a specific Web API is supported in the current browser.
 * Provides a reliable way to check for feature availability before using
 * advanced web capabilities.
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isSupported, isReady } = useFeatureDetection('webShare');
 *   
 *   if (!isReady) {
 *     return <div>Checking feature support...</div>;
 *   }
 *   
 *   return (
 *     <div>
 *       {isSupported ? (
 *         <button onClick={handleShare}>Share</button>
 *       ) : (
 *         <button onClick={handleFallbackShare}>Copy Link</button>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 * 
 * @param feature - The Web API to detect
 * @returns Feature support status and ready state
 */
export function useFeatureDetection(feature: FeatureAPI): UseFeatureDetectionReturn {
  const [isSupported, setIsSupported] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    // Only run detection on client-side
    if (typeof window === 'undefined') {
      setIsReady(true);
      return;
    }

    try {
      const detector = featureDetectors[feature];
      
      if (!detector) {
        throw new Error(`Unknown feature: ${feature}`);
      }

      const supported = detector();
      setIsSupported(supported);
      setError(undefined);
    } catch (err) {
      console.warn(`Feature detection failed for ${feature}:`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setIsSupported(false);
    } finally {
      setIsReady(true);
    }
  }, [feature]);

  return {
    isSupported,
    isReady,
    error,
  };
}

/**
 * Batch feature detection for multiple APIs
 */
export function useMultipleFeatureDetection(features: FeatureAPI[]): Record<FeatureAPI, UseFeatureDetectionReturn> {
  const results: Record<string, UseFeatureDetectionReturn> = {};
  
  features.forEach(feature => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    results[feature] = useFeatureDetection(feature);
  });
  
  return results as Record<FeatureAPI, UseFeatureDetectionReturn>;
}

/**
 * Feature detection utilities
 */
export const FeatureDetectionUtils = {
  /**
   * Check multiple features synchronously
   */
  checkFeatures: (features: FeatureAPI[]): Record<FeatureAPI, boolean> => {
    if (typeof window === 'undefined') {
      return features.reduce((acc, feature) => ({ ...acc, [feature]: false }), {} as Record<FeatureAPI, boolean>);
    }

    return features.reduce((acc, feature) => {
      try {
        const detector = featureDetectors[feature];
        acc[feature] = detector ? detector() : false;
      } catch {
        acc[feature] = false;
      }
      return acc;
    }, {} as Record<FeatureAPI, boolean>);
  },

  /**
   * Get all supported features
   */
  getSupportedFeatures: (): FeatureAPI[] => {
    if (typeof window === 'undefined') return [];

    return (Object.keys(featureDetectors) as FeatureAPI[]).filter(feature => {
      try {
        return featureDetectors[feature]();
      } catch {
        return false;
      }
    });
  },

  /**
   * Get feature support score (percentage of supported features)
   */
  getFeatureSupportScore: (features?: FeatureAPI[]): number => {
    const featuresToCheck = features || (Object.keys(featureDetectors) as FeatureAPI[]);
    const supportedCount = featuresToCheck.filter(feature => {
      try {
        return featureDetectors[feature]();
      } catch {
        return false;
      }
    }).length;

    return Math.round((supportedCount / featuresToCheck.length) * 100);
  },

  /**
   * Check if browser is considered "modern" based on key features
   */
  isModernBrowser: (): boolean => {
    const modernFeatures: FeatureAPI[] = [
      'serviceWorker',
      'webShare',
      'webAuthn',
      'badging',
      'wakeLock',
    ];

    const supportedCount = modernFeatures.filter(feature => {
      try {
        return featureDetectors[feature]();
      } catch {
        return false;
      }
    }).length;

    // Consider modern if 60% or more of key features are supported
    return supportedCount >= Math.ceil(modernFeatures.length * 0.6);
  },

  /**
   * Get browser capabilities summary
   */
  getBrowserCapabilities: () => {
    const categories = {
      'Service Worker': ['serviceWorker', 'pushManager', 'backgroundSync'] as FeatureAPI[],
      'Media': ['camera', 'microphone', 'mediaRecorder', 'screenCapture'] as FeatureAPI[],
      'Hardware': ['bluetooth', 'nfc', 'vibration', 'gamepad'] as FeatureAPI[],
      'File System': ['fileSystemAccess', 'fileHandling'] as FeatureAPI[],
      'Authentication': ['webAuthn', 'credentialManagement'] as FeatureAPI[],
      'App Integration': ['badging', 'wakeLock', 'webShare', 'paymentRequest'] as FeatureAPI[],
    };

    const capabilities: Record<string, { supported: number; total: number; features: Record<string, boolean> }> = {};

    Object.entries(categories).forEach(([category, features]) => {
      const featureSupport = FeatureDetectionUtils.checkFeatures(features);
      const supportedCount = Object.values(featureSupport).filter(Boolean).length;
      
      capabilities[category] = {
        supported: supportedCount,
        total: features.length,
        features: featureSupport,
      };
    });

    return capabilities;
  },
};