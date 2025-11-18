import { renderHook } from '@testing-library/react';
import { useFeatureDetection, useMultipleFeatureDetection, FeatureDetectionUtils } from '../use-feature-detection';

// Mock various Web APIs
const mockNavigator = {
  serviceWorker: {},
  share: jest.fn(),
  clipboard: { write: jest.fn() },
  geolocation: {},
  mediaDevices: { getUserMedia: jest.fn(), getDisplayMedia: jest.fn() },
  bluetooth: {},
  credentials: { create: jest.fn() },
  wakeLock: { request: jest.fn() },
  contacts: { select: jest.fn() },
  vibrate: jest.fn(),
  getGamepads: jest.fn(),
};

const mockWindow = {
  PushManager: function() {},
  ServiceWorkerRegistration: {
    prototype: {
      sync: {},
      periodicSync: {},
      backgroundFetch: {},
    }
  },
  MediaRecorder: function() {},
  PaymentRequest: function() {},
  EyeDropper: function() {},
  OffscreenCanvas: function() {},
  SpeechRecognition: function() {},
  speechSynthesis: {},
  WebAssembly: {},
  BroadcastChannel: function() {},
  SharedWorker: function() {},
  DeviceOrientationEvent: function() {},
  DeviceMotionEvent: function() {},
  showOpenFilePicker: jest.fn(),
  launchQueue: {},
  windowControlsOverlay: {},
  documentPictureInPicture: {},
  VideoEncoder: function() {},
  VideoDecoder: function() {},
  gpu: {},
};

// Setup mocks
Object.defineProperty(window, 'navigator', {
  value: mockNavigator,
  writable: true,
});

Object.keys(mockWindow).forEach(key => {
  Object.defineProperty(window, key, {
    value: mockWindow[key as keyof typeof mockWindow],
    writable: true,
  });
});

describe('useFeatureDetection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.warn = jest.fn();
  });

  describe('Service Worker APIs', () => {
    it('should detect service worker support', () => {
      const { result } = renderHook(() => useFeatureDetection('serviceWorker'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
      expect(result.current.error).toBeUndefined();
    });

    it('should detect push manager support', () => {
      const { result } = renderHook(() => useFeatureDetection('pushManager'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });

    it('should detect background sync support', () => {
      const { result } = renderHook(() => useFeatureDetection('backgroundSync'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });
  });

  describe('Sharing APIs', () => {
    it('should detect web share support', () => {
      const { result } = renderHook(() => useFeatureDetection('webShare'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });
  });

  describe('Clipboard APIs', () => {
    it('should detect clipboard support', () => {
      const { result } = renderHook(() => useFeatureDetection('clipboard'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });

    it('should detect clipboard write support', () => {
      const { result } = renderHook(() => useFeatureDetection('clipboardWrite'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });
  });

  describe('Media APIs', () => {
    it('should detect camera support', () => {
      const { result } = renderHook(() => useFeatureDetection('camera'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });

    it('should detect microphone support', () => {
      const { result } = renderHook(() => useFeatureDetection('microphone'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });

    it('should detect media recorder support', () => {
      const { result } = renderHook(() => useFeatureDetection('mediaRecorder'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });

    it('should detect screen capture support', () => {
      const { result } = renderHook(() => useFeatureDetection('screenCapture'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });
  });

  describe('Hardware APIs', () => {
    it('should detect bluetooth support', () => {
      const { result } = renderHook(() => useFeatureDetection('bluetooth'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });

    it('should detect vibration support', () => {
      const { result } = renderHook(() => useFeatureDetection('vibration'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });

    it('should detect gamepad support', () => {
      const { result } = renderHook(() => useFeatureDetection('gamepad'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });
  });

  describe('Authentication APIs', () => {
    it('should detect webAuthn support', () => {
      const { result } = renderHook(() => useFeatureDetection('webAuthn'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });
  });

  describe('File System APIs', () => {
    it('should detect file system access support', () => {
      const { result } = renderHook(() => useFeatureDetection('fileSystemAccess'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });
  });

  describe('App APIs', () => {
    it('should detect wake lock support', () => {
      const { result } = renderHook(() => useFeatureDetection('wakeLock'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });

    it('should detect contact picker support', () => {
      const { result } = renderHook(() => useFeatureDetection('contactPicker'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });
  });

  describe('Graphics APIs', () => {
    it('should detect WebGL support', () => {
      // Mock canvas and WebGL context
      const mockCanvas = {
        getContext: jest.fn().mockReturnValue({}),
      };
      
      jest.spyOn(document, 'createElement').mockReturnValue(mockCanvas as any);
      
      const { result } = renderHook(() => useFeatureDetection('webGL'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });

    it('should detect WebGL2 support', () => {
      const mockCanvas = {
        getContext: jest.fn().mockReturnValue({}),
      };
      
      jest.spyOn(document, 'createElement').mockReturnValue(mockCanvas as any);
      
      const { result } = renderHook(() => useFeatureDetection('webGL2'));
      
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isReady).toBe(true);
    });

    it('should handle WebGL detection failure', () => {
      const mockCanvas = {
        getContext: jest.fn().mockImplementation(() => {
          throw new Error('WebGL not available');
        }),
      };
      
      jest.spyOn(document, 'createElement').mockReturnValue(mockCanvas as any);
      
      const { result } = renderHook(() => useFeatureDetection('webGL'));
      
      expect(result.current.isSupported).toBe(false);
      expect(result.current.isReady).toBe(true);
    });
  });

  describe('Unsupported features', () => {
    it('should return false for unsupported features', () => {
      // Remove a feature from navigator
      const originalShare = mockNavigator.share;
      delete (mockNavigator as any).share;
      
      const { result } = renderHook(() => useFeatureDetection('webShare'));
      
      expect(result.current.isSupported).toBe(false);
      expect(result.current.isReady).toBe(true);
      
      // Restore the feature
      mockNavigator.share = originalShare;
    });
  });

  describe('Error handling', () => {
    it('should handle unknown features', () => {
      const { result } = renderHook(() => useFeatureDetection('unknownFeature' as any));
      
      expect(result.current.isSupported).toBe(false);
      expect(result.current.isReady).toBe(true);
      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toContain('Unknown feature');
    });
  });
});

describe('useMultipleFeatureDetection', () => {
  it('should detect multiple features', () => {
    const features = ['serviceWorker', 'webShare', 'geolocation'] as const;
    const { result } = renderHook(() => useMultipleFeatureDetection([...features]));
    
    expect(result.current.serviceWorker.isSupported).toBe(true);
    expect(result.current.webShare.isSupported).toBe(true);
    expect(result.current.geolocation.isSupported).toBe(true);
    
    expect(result.current.serviceWorker.isReady).toBe(true);
    expect(result.current.webShare.isReady).toBe(true);
    expect(result.current.geolocation.isReady).toBe(true);
  });
});

describe('FeatureDetectionUtils', () => {
  describe('checkFeatures', () => {
    it('should check multiple features synchronously', () => {
      const features = ['serviceWorker', 'webShare', 'geolocation'] as const;
      const results = FeatureDetectionUtils.checkFeatures([...features]);
      
      expect(results.serviceWorker).toBe(true);
      expect(results.webShare).toBe(true);
      expect(results.geolocation).toBe(true);
    });

    it('should handle unsupported features', () => {
      // Remove features
      const originalShare = mockNavigator.share;
      delete (mockNavigator as any).share;
      
      const results = FeatureDetectionUtils.checkFeatures(['webShare']);
      expect(results.webShare).toBe(false);
      
      // Restore
      mockNavigator.share = originalShare;
    });
  });

  describe('getSupportedFeatures', () => {
    it('should return list of supported features', () => {
      const supported = FeatureDetectionUtils.getSupportedFeatures();
      
      expect(supported).toContain('serviceWorker');
      expect(supported).toContain('webShare');
      expect(supported).toContain('geolocation');
      expect(Array.isArray(supported)).toBe(true);
    });
  });

  describe('getFeatureSupportScore', () => {
    it('should calculate support score for all features', () => {
      const score = FeatureDetectionUtils.getFeatureSupportScore();
      
      expect(typeof score).toBe('number');
      expect(score >= 0 && score <= 100).toBe(true);
    });

    it('should calculate support score for specific features', () => {
      const features = ['serviceWorker', 'webShare'] as const;
      const score = FeatureDetectionUtils.getFeatureSupportScore([...features]);
      
      expect(score).toBe(100); // Both features are mocked as supported
    });
  });

  describe('isModernBrowser', () => {
    it('should detect modern browser capabilities', () => {
      const isModern = FeatureDetectionUtils.isModernBrowser();
      
      expect(typeof isModern).toBe('boolean');
      // With our mocks, it should detect as modern
      expect(isModern).toBe(true);
    });
  });

  describe('getBrowserCapabilities', () => {
    it('should return categorized capabilities', () => {
      const capabilities = FeatureDetectionUtils.getBrowserCapabilities();
      
      expect(capabilities).toHaveProperty('Service Worker');
      expect(capabilities).toHaveProperty('Media');
      expect(capabilities).toHaveProperty('Hardware');
      expect(capabilities).toHaveProperty('Authentication');
      
      expect(capabilities['Service Worker']).toHaveProperty('supported');
      expect(capabilities['Service Worker']).toHaveProperty('total');
      expect(capabilities['Service Worker']).toHaveProperty('features');
      
      expect(typeof capabilities['Service Worker'].supported).toBe('number');
      expect(typeof capabilities['Service Worker'].total).toBe('number');
      expect(typeof capabilities['Service Worker'].features).toBe('object');
    });
  });
});

// Test SSR safety
describe('SSR compatibility', () => {
  const originalWindow = global.window;
  const originalNavigator = global.navigator;

  beforeAll(() => {
    delete (global as any).window;
    delete (global as any).navigator;
  });

  afterAll(() => {
    global.window = originalWindow;
    global.navigator = originalNavigator;
  });

  it('should handle SSR environment gracefully', () => {
    const { result } = renderHook(() => useFeatureDetection('serviceWorker'));
    
    expect(result.current.isSupported).toBe(false);
    expect(result.current.isReady).toBe(true);
  });

  it('should handle SSR in utils', () => {
    const features = FeatureDetectionUtils.checkFeatures(['serviceWorker']);
    expect(features.serviceWorker).toBe(false);
    
    const supported = FeatureDetectionUtils.getSupportedFeatures();
    expect(supported).toEqual([]);
    
    const score = FeatureDetectionUtils.getFeatureSupportScore();
    expect(score).toBe(0);
  });
});