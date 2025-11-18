import { renderHook } from '@testing-library/react';
import { usePlatform, PlatformUtils } from '../use-platform';

// Mock window and navigator
const mockNavigator = {
  userAgent: '',
  maxTouchPoints: 0,
  standalone: false,
};

const mockWindow = {
  navigator: mockNavigator,
  matchMedia: jest.fn(),
  screen: { width: 1920, height: 1080 },
};

Object.defineProperty(window, 'navigator', {
  value: mockNavigator,
  writable: true,
});

Object.defineProperty(window, 'matchMedia', {
  value: mockWindow.matchMedia,
  writable: true,
});

Object.defineProperty(window, 'screen', {
  value: mockWindow.screen,
  writable: true,
});

describe('usePlatform', () => {
  beforeEach(() => {
    mockNavigator.userAgent = '';
    mockNavigator.maxTouchPoints = 0;
    mockNavigator.standalone = false;
    mockWindow.matchMedia.mockClear();
    mockWindow.screen = { width: 1920, height: 1080 };
  });

  describe('Operating System Detection', () => {
    it('should detect iOS', () => {
      mockNavigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)';
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.os).toBe('iOS');
      expect(result.current.platform.isMobile).toBe(true);
      expect(result.current.platform.isDesktop).toBe(false);
    });

    it('should detect Android', () => {
      mockNavigator.userAgent = 'Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36';
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.os).toBe('Android');
      expect(result.current.platform.isMobile).toBe(true);
      expect(result.current.platform.isDesktop).toBe(false);
    });

    it('should detect macOS', () => {
      mockNavigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)';
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.os).toBe('macOS');
      expect(result.current.platform.isMobile).toBe(false);
      expect(result.current.platform.isDesktop).toBe(true);
    });

    it('should detect Windows', () => {
      mockNavigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.os).toBe('Windows');
      expect(result.current.platform.isMobile).toBe(false);
      expect(result.current.platform.isDesktop).toBe(true);
    });

    it('should detect Linux', () => {
      mockNavigator.userAgent = 'Mozilla/5.0 (X11; Linux x86_64)';
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.os).toBe('Linux');
      expect(result.current.platform.isMobile).toBe(false);
      expect(result.current.platform.isDesktop).toBe(true);
    });

    it('should return Unknown for unrecognized OS', () => {
      mockNavigator.userAgent = 'Mozilla/5.0 (UnknownOS)';
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.os).toBe('Unknown');
      expect(result.current.platform.isMobile).toBe(false);
      expect(result.current.platform.isDesktop).toBe(false);
    });
  });

  describe('Browser Detection', () => {
    it('should detect Chrome', () => {
      mockNavigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.browser).toBe('Chrome');
    });

    it('should detect Safari', () => {
      mockNavigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36';
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.browser).toBe('Safari');
    });

    it('should detect Firefox', () => {
      mockNavigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0';
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.browser).toBe('Firefox');
    });

    it('should detect Edge', () => {
      mockNavigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59';
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.browser).toBe('Edge');
    });

    it('should return Unknown for unrecognized browser', () => {
      mockNavigator.userAgent = 'UnknownBrowser/1.0';
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.browser).toBe('Unknown');
    });
  });

  describe('Device Type Detection', () => {
    it('should detect mobile device', () => {
      mockNavigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) Mobile/15E148';
      mockWindow.screen = { width: 375, height: 812 };
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.deviceType).toBe('mobile');
    });

    it('should detect tablet device', () => {
      mockNavigator.userAgent = 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X)';
      mockWindow.screen = { width: 768, height: 1024 };
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.deviceType).toBe('tablet');
    });

    it('should detect desktop device', () => {
      mockNavigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
      mockWindow.screen = { width: 1920, height: 1080 };
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.deviceType).toBe('desktop');
    });
  });

  describe('PWA Detection', () => {
    it('should detect PWA via standalone mode (iOS)', () => {
      mockNavigator.standalone = true;
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.isPWA).toBe(true);
    });

    it('should detect PWA via display mode', () => {
      mockWindow.matchMedia.mockImplementation((query: string) => ({
        matches: query === '(display-mode: standalone)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.isPWA).toBe(true);
    });

    it('should return false when not a PWA', () => {
      mockNavigator.standalone = false;
      mockWindow.matchMedia.mockImplementation(() => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.isPWA).toBe(false);
    });
  });

  describe('Touch Detection', () => {
    it('should detect touch via ontouchstart', () => {
      Object.defineProperty(window, 'ontouchstart', {
        value: null,
        writable: true,
      });
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.hasTouch).toBe(true);
    });

    it('should detect touch via maxTouchPoints', () => {
      mockNavigator.maxTouchPoints = 1;
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.hasTouch).toBe(true);
    });

    it('should return false when no touch support', () => {
      delete (window as any).ontouchstart;
      mockNavigator.maxTouchPoints = 0;
      
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.platform.hasTouch).toBe(false);
    });
  });

  describe('Ready State', () => {
    it('should set isReady to true after detection', () => {
      const { result } = renderHook(() => usePlatform());
      
      expect(result.current.isReady).toBe(true);
    });
  });
});

describe('PlatformUtils', () => {
  const mockPlatform = {
    os: 'iOS' as const,
    browser: 'Safari' as const,
    deviceType: 'mobile' as const,
    isPWA: true,
    hasTouch: true,
    isMobile: true,
    isDesktop: false,
    userAgent: 'test-ua',
  };

  describe('matches', () => {
    it('should return true when criteria match', () => {
      const result = PlatformUtils.matches({ os: 'iOS', isMobile: true }, mockPlatform);
      expect(result).toBe(true);
    });

    it('should return false when criteria do not match', () => {
      const result = PlatformUtils.matches({ os: 'Android' }, mockPlatform);
      expect(result).toBe(false);
    });
  });

  describe('getCSSClasses', () => {
    it('should generate correct CSS classes', () => {
      const classes = PlatformUtils.getCSSClasses(mockPlatform);
      
      expect(classes).toContain('os-ios');
      expect(classes).toContain('browser-safari');
      expect(classes).toContain('device-mobile');
      expect(classes).toContain('pwa');
      expect(classes).toContain('touch');
      expect(classes).toContain('mobile');
      expect(classes).not.toContain('desktop');
    });
  });

  describe('supportsAPI', () => {
    it('should check for API support', () => {
      // Mock service worker support
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {},
        writable: true,
      });
      
      const result = PlatformUtils.supportsAPI('serviceWorker');
      expect(result).toBe(true);
    });

    it('should return false for unsupported APIs', () => {
      const result = PlatformUtils.supportsAPI('nonexistentAPI');
      expect(result).toBe(false);
    });
  });

  describe('getInstallMethod', () => {
    it('should return iOS Safari install method', () => {
      const iosPlatform = { ...mockPlatform, os: 'iOS' as const, browser: 'Safari' as const };
      const method = PlatformUtils.getInstallMethod(iosPlatform);
      
      expect(method).toBe('Add to Home Screen via Safari share menu');
    });

    it('should return Android Chrome install method', () => {
      const androidPlatform = { ...mockPlatform, os: 'Android' as const, browser: 'Chrome' as const };
      const method = PlatformUtils.getInstallMethod(androidPlatform);
      
      expect(method).toBe('Install app prompt or Chrome menu');
    });

    it('should return desktop Chrome install method', () => {
      const desktopPlatform = { 
        ...mockPlatform, 
        os: 'Windows' as const, 
        browser: 'Chrome' as const,
        isDesktop: true,
        isMobile: false 
      };
      const method = PlatformUtils.getInstallMethod(desktopPlatform);
      
      expect(method).toBe('Install app via Chrome address bar icon');
    });

    it('should return generic method for unknown platforms', () => {
      const unknownPlatform = { ...mockPlatform, os: 'Unknown' as const, browser: 'Unknown' as const };
      const method = PlatformUtils.getInstallMethod(unknownPlatform);
      
      expect(method).toBe('Browser-specific installation method');
    });
  });
});