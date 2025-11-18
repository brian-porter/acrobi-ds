import { renderHook, act } from '@testing-library/react';
import {
  useVisualViewport,
  useVisualViewportMobile,
  isLikelyMobileDevice,
} from './use-visual-viewport';

// Mock window.visualViewport
const mockVisualViewport = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  height: 800,
  width: 400,
  scale: 1,
  offsetTop: 0,
  offsetLeft: 0,
};

// Helper to mock window properties
const mockWindow = (props: Partial<Window>) => {
  Object.defineProperty(global, 'window', {
    value: {
      ...window,
      ...props,
    },
    writable: true,
  });
};

// Helper to create resize event
const createResizeEvent = () => new Event('resize');

describe('useVisualViewport', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window to default state
    mockWindow({
      visualViewport: mockVisualViewport,
      innerHeight: 800,
      innerWidth: 400,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('API Support Detection', () => {
    it('should detect when Visual Viewport API is supported', () => {
      const { result } = renderHook(() => useVisualViewport());

      expect(result.current.isSupported).toBe(true);
    });

    it('should detect when Visual Viewport API is not supported', () => {
      mockWindow({ visualViewport: undefined as any });

      const { result } = renderHook(() => useVisualViewport());

      expect(result.current.isSupported).toBe(false);
    });

    it('should handle SSR environment gracefully', () => {
      // Mock SSR environment
      const originalWindow = global.window;
      delete (global as any).window;

      const { result } = renderHook(() => useVisualViewport());

      expect(result.current.isSupported).toBe(false);
      expect(result.current.isKeyboardOpen).toBe(false);
      expect(result.current.keyboardHeight).toBe(0);

      // Restore window
      global.window = originalWindow;
    });
  });

  describe('Keyboard Detection', () => {
    it('should detect keyboard is closed when viewport equals window height', () => {
      mockWindow({
        visualViewport: { ...mockVisualViewport, height: 800 },
        innerHeight: 800,
      });

      const { result } = renderHook(() => useVisualViewport());

      expect(result.current.isKeyboardOpen).toBe(false);
      expect(result.current.keyboardHeight).toBe(0);
    });

    it('should detect keyboard is open when viewport is smaller than window', () => {
      mockWindow({
        visualViewport: { ...mockVisualViewport, height: 500 },
        innerHeight: 800,
      });

      const { result } = renderHook(() => useVisualViewport());

      expect(result.current.isKeyboardOpen).toBe(true);
      expect(result.current.keyboardHeight).toBe(300);
    });

    it('should respect custom keyboard threshold', () => {
      mockWindow({
        visualViewport: { ...mockVisualViewport, height: 750 },
        innerHeight: 800,
      });

      // 50px difference, but threshold is 100px
      const { result } = renderHook(() =>
        useVisualViewport({ keyboardThreshold: 100 })
      );

      expect(result.current.isKeyboardOpen).toBe(false);
      expect(result.current.keyboardHeight).toBe(50);
    });

    it('should detect keyboard open when difference exceeds threshold', () => {
      mockWindow({
        visualViewport: { ...mockVisualViewport, height: 650 },
        innerHeight: 800,
      });

      // 150px difference exceeds default 150px threshold
      const { result } = renderHook(() => useVisualViewport());

      expect(result.current.isKeyboardOpen).toBe(true);
      expect(result.current.keyboardHeight).toBe(150);
    });
  });

  describe('Viewport Information', () => {
    it('should return correct viewport dimensions', () => {
      mockWindow({
        visualViewport: {
          ...mockVisualViewport,
          height: 600,
          width: 375,
          scale: 1.5,
          offsetTop: 20,
          offsetLeft: 10,
        },
        innerHeight: 800,
      });

      const { result } = renderHook(() => useVisualViewport());

      expect(result.current.viewportHeight).toBe(600);
      expect(result.current.viewportWidth).toBe(375);
      expect(result.current.scale).toBe(1.5);
      expect(result.current.offsetTop).toBe(20);
      expect(result.current.offsetLeft).toBe(10);
    });
  });

  describe('Event Listeners', () => {
    it('should add event listeners when supported', () => {
      renderHook(() => useVisualViewport());

      expect(mockVisualViewport.addEventListener).toHaveBeenCalledWith(
        'resize',
        expect.any(Function)
      );
      expect(mockVisualViewport.addEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );
    });

    it('should remove event listeners on unmount', () => {
      const { unmount } = renderHook(() => useVisualViewport());

      unmount();

      expect(mockVisualViewport.removeEventListener).toHaveBeenCalledWith(
        'resize',
        expect.any(Function)
      );
      expect(mockVisualViewport.removeEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );
    });

    it('should update state when resize event occurs', async () => {
      const { result } = renderHook(() => useVisualViewport());

      // Initial state
      expect(result.current.isKeyboardOpen).toBe(false);

      // Simulate keyboard opening
      mockVisualViewport.height = 500;

      await act(async () => {
        // Get the resize handler
        const resizeHandler =
          mockVisualViewport.addEventListener.mock.calls.find(
            call => call[0] === 'resize'
          )?.[1];

        // Trigger resize event
        if (resizeHandler) {
          // Mock requestAnimationFrame
          global.requestAnimationFrame = jest.fn(cb => {
            setTimeout(cb, 0);
            return 0;
          });

          resizeHandler(createResizeEvent());

          // Wait for requestAnimationFrame callback
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      });

      expect(result.current.isKeyboardOpen).toBe(true);
      expect(result.current.keyboardHeight).toBe(300);
    });
  });

  describe('Refresh Function', () => {
    it('should provide a refresh function that updates state', () => {
      const { result } = renderHook(() => useVisualViewport());

      expect(typeof result.current.refresh).toBe('function');

      // Change viewport height
      mockVisualViewport.height = 500;

      act(() => {
        result.current.refresh();
      });

      expect(result.current.isKeyboardOpen).toBe(true);
      expect(result.current.keyboardHeight).toBe(300);
    });
  });

  describe('Debug Mode', () => {
    it('should log debug information when enabled', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      renderHook(() => useVisualViewport({ debug: true }));

      // Should log initial state
      expect(consoleSpy).toHaveBeenCalledWith(
        'useVisualViewport state update:',
        expect.objectContaining({
          windowHeight: 800,
          viewportHeight: 800,
          heightDifference: 0,
        })
      );

      consoleSpy.mockRestore();
    });

    it('should not log when debug is disabled', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      renderHook(() => useVisualViewport({ debug: false }));

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('Fallback Behavior', () => {
    it('should handle missing visualViewport gracefully', () => {
      mockWindow({ visualViewport: null as any });

      const { result } = renderHook(() => useVisualViewport());

      expect(result.current.isSupported).toBe(false);
      expect(result.current.isKeyboardOpen).toBe(false);
      expect(result.current.keyboardHeight).toBe(0);
      expect(result.current.viewportHeight).toBe(800);
      expect(result.current.viewportWidth).toBe(400);
    });

    it('should use window resize as fallback when visualViewport not supported', () => {
      mockWindow({
        visualViewport: undefined as any,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });

      renderHook(() => useVisualViewport());

      expect(window.addEventListener).toHaveBeenCalledWith(
        'resize',
        expect.any(Function)
      );
    });
  });
});

describe('useVisualViewportMobile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockWindow({
      visualViewport: mockVisualViewport,
      innerHeight: 800,
      innerWidth: 400,
    });
  });

  it('should return active state on mobile devices', () => {
    // Mock mobile device
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 5,
      writable: true,
    });

    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      writable: true,
    });

    const { result } = renderHook(() => useVisualViewportMobile());

    expect(result.current.isSupported).toBe(true);
    expect(typeof result.current.refresh).toBe('function');
  });

  it('should return inactive state on desktop devices', () => {
    // Mock desktop device
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 0,
      writable: true,
    });

    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      writable: true,
    });

    mockWindow({ innerWidth: 1920 });

    const { result } = renderHook(() => useVisualViewportMobile());

    expect(result.current.isSupported).toBe(false);
    expect(result.current.isKeyboardOpen).toBe(false);
    expect(result.current.keyboardHeight).toBe(0);
  });
});

describe('isLikelyMobileDevice', () => {
  const originalNavigator = global.navigator;

  afterEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true,
    });
  });

  it('should detect mobile device by touch support', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        ...originalNavigator,
        maxTouchPoints: 5,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      },
      writable: true,
    });

    mockWindow({ innerWidth: 375 });

    expect(isLikelyMobileDevice()).toBe(true);
  });

  it('should detect desktop device', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        ...originalNavigator,
        maxTouchPoints: 0,
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
      writable: true,
    });

    mockWindow({ innerWidth: 1920 });

    expect(isLikelyMobileDevice()).toBe(false);
  });

  it('should handle SSR environment', () => {
    const originalWindow = global.window;
    delete (global as any).window;

    expect(isLikelyMobileDevice()).toBe(false);

    global.window = originalWindow;
  });

  it('should detect mobile by user agent', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        ...originalNavigator,
        maxTouchPoints: 5,
        userAgent:
          'Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36',
      },
      writable: true,
    });

    expect(isLikelyMobileDevice()).toBe(true);
  });

  it('should detect mobile by small screen size', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        ...originalNavigator,
        maxTouchPoints: 2,
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      writable: true,
    });

    mockWindow({ innerWidth: 600 }); // Small screen

    expect(isLikelyMobileDevice()).toBe(true);
  });
});
