import { renderHook, act } from '@testing-library/react';
import {
  useKeyboard,
  isKeyboardDetectionSupported,
  getKeyboardHeight,
  isKeyboardOpen,
} from './use-keyboard-aae';

// Mock the useVisualViewport hook
jest.mock('./use-visual-viewport', () => ({
  useVisualViewport: jest.fn(),
}));

import { useVisualViewport } from './use-visual-viewport';

const mockUseVisualViewport = useVisualViewport as jest.MockedFunction<
  typeof useVisualViewport
>;

// Mock window.visualViewport
const mockVisualViewport = {
  height: 800,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
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

describe('useKeyboard (Epic 40 - AAE)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock return value
    mockUseVisualViewport.mockReturnValue({
      isKeyboardOpen: false,
      keyboardHeight: 0,
      viewportHeight: 800,
      viewportWidth: 400,
      scale: 1,
      offsetTop: 0,
      offsetLeft: 0,
      isSupported: true,
      refresh: jest.fn(),
    });

    mockWindow({
      visualViewport: mockVisualViewport,
      innerHeight: 800,
      innerWidth: 400,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Basic Functionality', () => {
    it('should return keyboard state with correct interface', () => {
      const { result } = renderHook(() => useKeyboard());

      expect(result.current).toHaveProperty('isOpen');
      expect(result.current).toHaveProperty('height');
      expect(result.current).toHaveProperty('isSupported');
      expect(result.current).toHaveProperty('refresh');
      expect(result.current).toHaveProperty('viewportHeight');
      expect(result.current).toHaveProperty('viewportWidth');
      expect(result.current).toHaveProperty('scale');
    });

    it('should return keyboard closed state initially', () => {
      const { result } = renderHook(() => useKeyboard());

      expect(result.current.isOpen).toBe(false);
      expect(result.current.height).toBe(0);
      expect(result.current.isSupported).toBe(true);
    });

    it('should detect keyboard open state', () => {
      mockUseVisualViewport.mockReturnValue({
        isKeyboardOpen: true,
        keyboardHeight: 300,
        viewportHeight: 500,
        viewportWidth: 400,
        scale: 1,
        offsetTop: 0,
        offsetLeft: 0,
        isSupported: true,
        refresh: jest.fn(),
      });

      const { result } = renderHook(() => useKeyboard());

      expect(result.current.isOpen).toBe(true);
      expect(result.current.height).toBe(300);
    });

    it('should pass options to useVisualViewport', () => {
      const options = { keyboardThreshold: 200, debug: true };
      
      renderHook(() => useKeyboard(options));

      expect(mockUseVisualViewport).toHaveBeenCalledWith({
        keyboardThreshold: 200,
        debug: true,
      });
    });

    it('should use default options when none provided', () => {
      renderHook(() => useKeyboard());

      expect(mockUseVisualViewport).toHaveBeenCalledWith({
        keyboardThreshold: 150,
        debug: false,
      });
    });
  });

  describe('Debug Logging', () => {
    it('should log debug information when enabled', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      renderHook(() => useKeyboard({ debug: true }));

      expect(consoleSpy).toHaveBeenCalledWith(
        'useKeyboard (Epic 40) state:',
        expect.objectContaining({
          isOpen: false,
          height: 0,
          viewportHeight: 800,
          isSupported: true,
        })
      );

      consoleSpy.mockRestore();
    });

    it('should not log when debug is disabled', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      renderHook(() => useKeyboard({ debug: false }));

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('API Support', () => {
    it('should indicate when API is not supported', () => {
      mockUseVisualViewport.mockReturnValue({
        isKeyboardOpen: false,
        keyboardHeight: 0,
        viewportHeight: 800,
        viewportWidth: 400,
        scale: 1,
        offsetTop: 0,
        offsetLeft: 0,
        isSupported: false,
        refresh: jest.fn(),
      });

      const { result } = renderHook(() => useKeyboard());

      expect(result.current.isSupported).toBe(false);
    });
  });

  describe('Refresh Function', () => {
    it('should provide a refresh function', () => {
      const mockRefresh = jest.fn();
      mockUseVisualViewport.mockReturnValue({
        isKeyboardOpen: false,
        keyboardHeight: 0,
        viewportHeight: 800,
        viewportWidth: 400,
        scale: 1,
        offsetTop: 0,
        offsetLeft: 0,
        isSupported: true,
        refresh: mockRefresh,
      });

      const { result } = renderHook(() => useKeyboard());

      expect(typeof result.current.refresh).toBe('function');

      act(() => {
        result.current.refresh();
      });

      expect(mockRefresh).toHaveBeenCalled();
    });
  });
});

describe('isKeyboardDetectionSupported', () => {
  beforeEach(() => {
    mockWindow({
      visualViewport: mockVisualViewport,
    });
  });

  it('should return true when Visual Viewport API is supported', () => {
    expect(isKeyboardDetectionSupported()).toBe(true);
  });

  it('should return false when Visual Viewport API is not supported', () => {
    mockWindow({ visualViewport: undefined as any });

    expect(isKeyboardDetectionSupported()).toBe(false);
  });

  it('should return false in SSR environment', () => {
    const originalWindow = global.window;
    delete (global as any).window;

    expect(isKeyboardDetectionSupported()).toBe(false);

    global.window = originalWindow;
  });
});

describe('getKeyboardHeight', () => {
  beforeEach(() => {
    mockWindow({
      visualViewport: { ...mockVisualViewport, height: 800 },
      innerHeight: 800,
    });
  });

  it('should return 0 when keyboard is closed', () => {
    expect(getKeyboardHeight()).toBe(0);
  });

  it('should return keyboard height when open', () => {
    mockWindow({
      visualViewport: { ...mockVisualViewport, height: 500 },
      innerHeight: 800,
    });

    expect(getKeyboardHeight()).toBe(300);
  });

  it('should respect custom threshold', () => {
    mockWindow({
      visualViewport: { ...mockVisualViewport, height: 750 },
      innerHeight: 800,
    });

    // 50px difference with 100px threshold
    expect(getKeyboardHeight(100)).toBe(0);
    
    // 50px difference with 25px threshold
    expect(getKeyboardHeight(25)).toBe(50);
  });

  it('should return 0 when API is not supported', () => {
    mockWindow({ visualViewport: undefined as any });

    expect(getKeyboardHeight()).toBe(0);
  });

  it('should handle SSR environment', () => {
    const originalWindow = global.window;
    delete (global as any).window;

    expect(getKeyboardHeight()).toBe(0);

    global.window = originalWindow;
  });
});

describe('isKeyboardOpen', () => {
  beforeEach(() => {
    mockWindow({
      visualViewport: { ...mockVisualViewport, height: 800 },
      innerHeight: 800,
    });
  });

  it('should return false when keyboard is closed', () => {
    expect(isKeyboardOpen()).toBe(false);
  });

  it('should return true when keyboard is open', () => {
    mockWindow({
      visualViewport: { ...mockVisualViewport, height: 500 },
      innerHeight: 800,
    });

    expect(isKeyboardOpen()).toBe(true);
  });

  it('should respect custom threshold', () => {
    mockWindow({
      visualViewport: { ...mockVisualViewport, height: 750 },
      innerHeight: 800,
    });

    expect(isKeyboardOpen(100)).toBe(false); // 50px < 100px threshold
    expect(isKeyboardOpen(25)).toBe(true);   // 50px > 25px threshold
  });

  it('should return false when API is not supported', () => {
    mockWindow({ visualViewport: undefined as any });

    expect(isKeyboardOpen()).toBe(false);
  });
});