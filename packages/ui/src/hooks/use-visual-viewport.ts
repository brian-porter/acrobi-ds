import { useState, useEffect, useCallback } from 'react';

// Types
export interface VisualViewportState {
  /** Whether the on-screen keyboard is currently open */
  isKeyboardOpen: boolean;
  /** Height of the on-screen keyboard in pixels */
  keyboardHeight: number;
  /** Available viewport height when keyboard is open */
  viewportHeight: number;
  /** Available viewport width when keyboard is open */
  viewportWidth: number;
  /** Scale factor of the visual viewport */
  scale: number;
  /** Visual viewport top offset */
  offsetTop: number;
  /** Visual viewport left offset */
  offsetLeft: number;
}

export interface UseVisualViewportOptions {
  /** Threshold for detecting keyboard open state (default: 150px) */
  keyboardThreshold?: number;
  /** Whether to enable debug logging */
  debug?: boolean;
}

export interface UseVisualViewportReturn extends VisualViewportState {
  /** Whether the Visual Viewport API is supported */
  isSupported: boolean;
  /** Manually trigger a viewport check */
  refresh: () => void;
}

/**
 * Hook for detecting on-screen keyboard presence using the Visual Viewport API
 *
 * This hook is essential for AAEs that need to adapt their layout when the
 * on-screen keyboard appears on mobile devices. It uses the modern Visual Viewport
 * API to detect changes in the visible area.
 *
 * @param options Configuration options
 * @returns Visual viewport state and utilities
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isKeyboardOpen, keyboardHeight, isSupported } = useVisualViewport();
 *
 *   if (!isSupported) {
 *     return <div>Visual Viewport API not supported</div>;
 *   }
 *
 *   return (
 *     <div style={{ paddingBottom: isKeyboardOpen ? keyboardHeight : 0 }}>
 *       <input placeholder="Type here..." />
 *       {isKeyboardOpen && <p>Keyboard is open! Height: {keyboardHeight}px</p>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useVisualViewport(
  options: UseVisualViewportOptions = {}
): UseVisualViewportReturn {
  const { keyboardThreshold = 150, debug = false } = options;

  // Check if Visual Viewport API is supported
  const isSupported =
    typeof window !== 'undefined' &&
    'visualViewport' in window &&
    window.visualViewport !== null;

  // State
  const [state, setState] = useState<VisualViewportState>(() => {
    if (!isSupported) {
      return {
        isKeyboardOpen: false,
        keyboardHeight: 0,
        viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
        viewportWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
        scale: 1,
        offsetTop: 0,
        offsetLeft: 0,
      };
    }

    const viewport = window.visualViewport!;
    const windowHeight = window.innerHeight;
    const viewportHeight = viewport.height;
    const heightDifference = windowHeight - viewportHeight;

    return {
      isKeyboardOpen: heightDifference >= keyboardThreshold,
      keyboardHeight: Math.max(0, heightDifference),
      viewportHeight: viewport.height,
      viewportWidth: viewport.width,
      scale: viewport.scale,
      offsetTop: viewport.offsetTop,
      offsetLeft: viewport.offsetLeft,
    };
  });

  // Calculate viewport state
  const calculateViewportState = useCallback((): VisualViewportState => {
    if (!isSupported || !window.visualViewport) {
      return {
        isKeyboardOpen: false,
        keyboardHeight: 0,
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
        scale: 1,
        offsetTop: 0,
        offsetLeft: 0,
      };
    }

    const viewport = window.visualViewport;
    const windowHeight = window.innerHeight;
    const viewportHeight = viewport.height;
    const heightDifference = windowHeight - viewportHeight;

    const newState: VisualViewportState = {
      isKeyboardOpen: heightDifference >= keyboardThreshold,
      keyboardHeight: Math.max(0, heightDifference),
      viewportHeight: viewport.height,
      viewportWidth: viewport.width,
      scale: viewport.scale,
      offsetTop: viewport.offsetTop,
      offsetLeft: viewport.offsetLeft,
    };

    if (debug) {
      console.log('useVisualViewport state update:', {
        windowHeight,
        viewportHeight,
        heightDifference,
        keyboardThreshold,
        ...newState,
      });
    }

    return newState;
  }, [isSupported, keyboardThreshold, debug]);

  // Manual refresh function
  const refresh = useCallback(() => {
    const newState = calculateViewportState();
    setState(newState);
  }, [calculateViewportState]);

  // Event handler for viewport changes
  const handleViewportChange = useCallback(() => {
    // Use requestAnimationFrame to ensure we get the latest values
    requestAnimationFrame(() => {
      const newState = calculateViewportState();
      setState(prevState => {
        // Only update if something meaningful changed
        const hasChanged =
          prevState.isKeyboardOpen !== newState.isKeyboardOpen ||
          Math.abs(prevState.keyboardHeight - newState.keyboardHeight) > 1 ||
          Math.abs(prevState.viewportHeight - newState.viewportHeight) > 1 ||
          Math.abs(prevState.viewportWidth - newState.viewportWidth) > 1 ||
          Math.abs(prevState.scale - newState.scale) > 0.01;

        return hasChanged ? newState : prevState;
      });
    });
  }, [calculateViewportState]);

  // Set up event listeners
  useEffect(() => {
    if (!isSupported || !window.visualViewport) {
      return;
    }

    const viewport = window.visualViewport;

    // Listen for resize events (keyboard show/hide)
    viewport.addEventListener('resize', handleViewportChange);

    // Listen for scroll events (viewport position changes)
    viewport.addEventListener('scroll', handleViewportChange);

    // Cleanup
    return () => {
      viewport.removeEventListener('resize', handleViewportChange);
      viewport.removeEventListener('scroll', handleViewportChange);
    };
  }, [isSupported, handleViewportChange]);

  // Handle window resize as fallback
  useEffect(() => {
    if (isSupported) return; // Only use as fallback when Visual Viewport API is not available

    const handleWindowResize = () => {
      // Fallback behavior for browsers without Visual Viewport API
      // This is less accurate but provides some functionality
      setState(prevState => ({
        ...prevState,
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
      }));
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [isSupported]);

  return {
    ...state,
    isSupported,
    refresh,
  };
}

// Utility function to check if device likely has an on-screen keyboard
export const isLikelyMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Check for touch support
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Check user agent for mobile indicators
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileUA =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    );

  // Check screen size (rough mobile detection)
  const isSmallScreen = window.innerWidth <= 768;

  return hasTouch && (isMobileUA || isSmallScreen);
};

// Hook variant that only activates on likely mobile devices
export function useVisualViewportMobile(
  options: UseVisualViewportOptions = {}
): UseVisualViewportReturn {
  const isMobile = isLikelyMobileDevice();
  const viewportResult = useVisualViewport(options);

  // Return inactive state for non-mobile devices
  if (!isMobile) {
    return {
      isKeyboardOpen: false,
      keyboardHeight: 0,
      viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
      viewportWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
      scale: 1,
      offsetTop: 0,
      offsetLeft: 0,
      isSupported: false,
      refresh: () => {},
    };
  }

  return viewportResult;
}
