import { useVisualViewport } from './use-visual-viewport';

// Types for Epic 40 - AAE Keyboard Management
export interface KeyboardState {
  /** Whether the on-screen keyboard is currently open */
  isOpen: boolean;
  /** Height of the on-screen keyboard in pixels */
  height: number;
}

export interface UseKeyboardOptions {
  /** Threshold for detecting keyboard open state (default: 150px) */
  keyboardThreshold?: number;
  /** Whether to enable debug logging */
  debug?: boolean;
}

export interface UseKeyboardReturn extends KeyboardState {
  /** Whether the Visual Viewport API is supported */
  isSupported: boolean;
  /** Manually trigger a keyboard state check */
  refresh: () => void;
  /** Additional viewport information */
  viewportHeight: number;
  viewportWidth: number;
  scale: number;
}

/**
 * Hook for detecting on-screen keyboard presence in AAE applications
 * 
 * This hook implements Epic 40 requirements for advanced keyboard management
 * in AAE (Advanced Application Experiences). It provides a simple interface
 * to detect when the on-screen keyboard is open and its height.
 *
 * @param options Configuration options
 * @returns Keyboard state and utilities
 *
 * @example
 * ```tsx
 * function MyAAEComponent() {
 *   const { isOpen, height, isSupported } = useKeyboard();
 *
 *   if (!isSupported) {
 *     return <div>Keyboard detection not supported</div>;
 *   }
 *
 *   return (
 *     <div style={{ paddingBottom: isOpen ? height : 0 }}>
 *       <input placeholder="Enter text..." />
 *       {isOpen && <p>Keyboard is open! Height: {height}px</p>}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With custom threshold
 * function MyForm() {
 *   const keyboard = useKeyboard({ keyboardThreshold: 100 });
 *   
 *   return (
 *     <form style={{ 
 *       transform: keyboard.isOpen ? `translateY(-${keyboard.height / 2}px)` : 'none',
 *       transition: 'transform 300ms ease-in-out'
 *     }}>
 *       <input type="email" placeholder="Email" />
 *       <input type="password" placeholder="Password" />
 *       <button>Sign In</button>
 *     </form>
 *   );
 * }
 * ```
 */
export function useKeyboard(options: UseKeyboardOptions = {}): UseKeyboardReturn {
  const { keyboardThreshold = 150, debug = false } = options;

  // Use the Visual Viewport API hook internally
  const viewport = useVisualViewport({
    keyboardThreshold,
    debug,
  });

  // Transform the viewport state to match Epic 40's simpler interface
  const keyboardState: KeyboardState = {
    isOpen: viewport.isKeyboardOpen,
    height: viewport.keyboardHeight,
  };

  if (debug) {
    console.log('useKeyboard (Epic 40) state:', {
      isOpen: keyboardState.isOpen,
      height: keyboardState.height,
      viewportHeight: viewport.viewportHeight,
      isSupported: viewport.isSupported,
    });
  }

  return {
    // Epic 40 required interface
    ...keyboardState,
    
    // Additional utilities
    isSupported: viewport.isSupported,
    refresh: viewport.refresh,
    viewportHeight: viewport.viewportHeight,
    viewportWidth: viewport.viewportWidth,
    scale: viewport.scale,
  };
}

/**
 * Utility function to check if the current environment supports keyboard detection
 * 
 * @returns True if Visual Viewport API is available
 */
export const isKeyboardDetectionSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    'visualViewport' in window &&
    window.visualViewport !== null
  );
};

/**
 * Utility function to get keyboard height without using the hook
 * Useful for one-time checks outside of React components
 * 
 * @param threshold Minimum height difference to consider keyboard open
 * @returns Keyboard height in pixels, or 0 if not detected
 */
export const getKeyboardHeight = (threshold: number = 150): number => {
  if (!isKeyboardDetectionSupported()) {
    return 0;
  }

  const viewport = window.visualViewport!;
  const windowHeight = window.innerHeight;
  const viewportHeight = viewport.height;
  const heightDifference = windowHeight - viewportHeight;

  return heightDifference >= threshold ? Math.max(0, heightDifference) : 0;
};

/**
 * Utility function to check if keyboard is open without using the hook
 * 
 * @param threshold Minimum height difference to consider keyboard open
 * @returns True if keyboard appears to be open
 */
export const isKeyboardOpen = (threshold: number = 150): boolean => {
  return getKeyboardHeight(threshold) > 0;
};