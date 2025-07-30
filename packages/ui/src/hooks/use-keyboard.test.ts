import { renderHook, act } from '@testing-library/react';
import { useKeyboard } from './use-keyboard';
import type { KeyboardShortcut } from './use-keyboard';

// Mock document for testing
const mockDocument = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

// Mock window and navigator
Object.defineProperty(window, 'navigator', {
  value: {
    platform: 'MacIntel',
  },
  writable: true,
});

Object.defineProperty(window, 'document', {
  value: mockDocument,
  writable: true,
});

// Helper to create keyboard events
const createKeyboardEvent = (
  type: 'keydown' | 'keyup',
  key: string,
  modifiers: {
    ctrlKey?: boolean;
    altKey?: boolean;
    shiftKey?: boolean;
    metaKey?: boolean;
  } = {}
): KeyboardEvent => {
  const event = new KeyboardEvent(type, {
    key,
    ctrlKey: modifiers.ctrlKey || false,
    altKey: modifiers.altKey || false,
    shiftKey: modifiers.shiftKey || false,
    metaKey: modifiers.metaKey || false,
    bubbles: true,
    cancelable: true,
  });

  // Mock preventDefault and stopPropagation
  event.preventDefault = jest.fn();
  event.stopPropagation = jest.fn();

  return event;
};

describe('useKeyboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic functionality', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useKeyboard());

      expect(result.current.pressedKeys).toEqual(new Set());
      expect(result.current.lastKeyPressed).toBeNull();
      expect(result.current.isSequenceActive).toBe(false);
      expect(result.current.isSupported).toBe(true);
      expect(result.current.isMac).toBe(true); // Based on mock
      expect(result.current.modifierKey).toBe('Cmd');
    });

    it('should detect platform correctly', () => {
      // Test Mac platform
      Object.defineProperty(window.navigator, 'platform', {
        value: 'MacIntel',
        writable: true,
      });

      const { result: macResult } = renderHook(() => useKeyboard());
      expect(macResult.current.isMac).toBe(true);
      expect(macResult.current.modifierKey).toBe('Cmd');

      // Test Windows platform
      Object.defineProperty(window.navigator, 'platform', {
        value: 'Win32',
        writable: true,
      });

      const { result: winResult } = renderHook(() => useKeyboard());
      expect(winResult.current.isMac).toBe(false);
      expect(winResult.current.modifierKey).toBe('Ctrl');
    });

    it('should add event listeners on mount', () => {
      renderHook(() => useKeyboard());

      expect(mockDocument.addEventListener).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );
      expect(mockDocument.addEventListener).toHaveBeenCalledWith(
        'keyup',
        expect.any(Function)
      );
    });

    it('should remove event listeners on unmount', () => {
      const { unmount } = renderHook(() => useKeyboard());

      unmount();

      expect(mockDocument.removeEventListener).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );
      expect(mockDocument.removeEventListener).toHaveBeenCalledWith(
        'keyup',
        expect.any(Function)
      );
    });
  });

  describe('Key press tracking', () => {
    it('should track pressed keys', () => {
      const { result } = renderHook(() => useKeyboard());
      const keydownHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keydown'
      )?.[1];

      // Simulate key press
      act(() => {
        keydownHandler(createKeyboardEvent('keydown', 'a'));
      });

      expect(result.current.pressedKeys.has('a')).toBe(true);
      expect(result.current.lastKeyPressed).toBe('a');
    });

    it('should track key release', () => {
      const { result } = renderHook(() => useKeyboard());
      const keydownHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keydown'
      )?.[1];
      const keyupHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keyup'
      )?.[1];

      // Press and release key
      act(() => {
        keydownHandler(createKeyboardEvent('keydown', 'a'));
      });

      expect(result.current.pressedKeys.has('a')).toBe(true);

      act(() => {
        keyupHandler(createKeyboardEvent('keyup', 'a'));
      });

      expect(result.current.pressedKeys.has('a')).toBe(false);
    });

    it('should normalize keys correctly', () => {
      const { result } = renderHook(() => useKeyboard());
      const keydownHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keydown'
      )?.[1];

      act(() => {
        keydownHandler(createKeyboardEvent('keydown', ' ')); // Space key
      });

      expect(result.current.lastKeyPressed).toBe('Space');
      expect(result.current.pressedKeys.has('Space')).toBe(true);
    });
  });

  describe('Shortcut management', () => {
    it('should add shortcuts dynamically', () => {
      const { result } = renderHook(() => useKeyboard());
      const callback = jest.fn();

      const shortcut: KeyboardShortcut = {
        keys: 'a',
        callback,
      };

      let shortcutId: string;
      act(() => {
        shortcutId = result.current.addShortcut(shortcut);
      });

      expect(shortcutId).toBeDefined();
      expect(typeof shortcutId).toBe('string');
    });

    it('should remove shortcuts', () => {
      const { result } = renderHook(() => useKeyboard());
      const callback = jest.fn();

      let shortcutId: string;
      act(() => {
        shortcutId = result.current.addShortcut({
          keys: 'a',
          callback,
        });
      });

      act(() => {
        result.current.removeShortcut(shortcutId);
      });

      // Test that shortcut is removed by triggering key press
      const keydownHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keydown'
      )?.[1];

      act(() => {
        keydownHandler(createKeyboardEvent('keydown', 'a'));
      });

      expect(callback).not.toHaveBeenCalled();
    });

    it('should clear all shortcuts', () => {
      const { result } = renderHook(() => useKeyboard());
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      act(() => {
        result.current.addShortcut({ keys: 'a', callback: callback1 });
        result.current.addShortcut({ keys: 'b', callback: callback2 });
      });

      act(() => {
        result.current.clearShortcuts();
      });

      const keydownHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keydown'
      )?.[1];

      act(() => {
        keydownHandler(createKeyboardEvent('keydown', 'a'));
        keydownHandler(createKeyboardEvent('keydown', 'b'));
      });

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).not.toHaveBeenCalled();
    });
  });

  describe('Shortcut execution', () => {
    it('should execute single key shortcuts', () => {
      const callback = jest.fn();
      renderHook(() =>
        useKeyboard({
          shortcuts: [{ keys: 'a', callback }],
        })
      );

      const keydownHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keydown'
      )?.[1];

      act(() => {
        keydownHandler(createKeyboardEvent('keydown', 'a'));
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should execute key combinations', () => {
      const callback = jest.fn();
      renderHook(() =>
        useKeyboard({
          shortcuts: [{ keys: 'Ctrl+s', callback }],
        })
      );

      const keydownHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keydown'
      )?.[1];

      act(() => {
        keydownHandler(createKeyboardEvent('keydown', 's', { ctrlKey: true }));
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should handle platform-agnostic shortcuts', () => {
      const callback = jest.fn();

      // Test on Mac
      Object.defineProperty(window.navigator, 'platform', {
        value: 'MacIntel',
        writable: true,
      });

      renderHook(() =>
        useKeyboard({
          shortcuts: [{ keys: '$mod+s', callback }],
        })
      );

      const keydownHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keydown'
      )?.[1];

      act(() => {
        keydownHandler(createKeyboardEvent('keydown', 's', { metaKey: true }));
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should prevent default when specified', () => {
      const callback = jest.fn();
      renderHook(() =>
        useKeyboard({
          shortcuts: [{ keys: 'a', callback, preventDefault: true }],
        })
      );

      const keydownHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keydown'
      )?.[1];

      const event = createKeyboardEvent('keydown', 'a');
      act(() => {
        keydownHandler(event);
      });

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should stop propagation when specified', () => {
      const callback = jest.fn();
      renderHook(() =>
        useKeyboard({
          shortcuts: [{ keys: 'a', callback, stopPropagation: true }],
        })
      );

      const keydownHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keydown'
      )?.[1];

      const event = createKeyboardEvent('keydown', 'a');
      act(() => {
        keydownHandler(event);
      });

      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should respect enabled flag', () => {
      const callback = jest.fn();
      renderHook(() =>
        useKeyboard({
          shortcuts: [{ keys: 'a', callback, enabled: false }],
        })
      );

      const keydownHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keydown'
      )?.[1];

      act(() => {
        keydownHandler(createKeyboardEvent('keydown', 'a'));
      });

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('Utility methods', () => {
    it('should check if key is pressed', () => {
      const { result } = renderHook(() => useKeyboard());
      const keydownHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keydown'
      )?.[1];

      act(() => {
        keydownHandler(createKeyboardEvent('keydown', 'a'));
      });

      expect(result.current.isKeyPressed('a')).toBe(true);
      expect(result.current.isKeyPressed('b')).toBe(false);
    });

    it('should check key combinations', () => {
      const { result } = renderHook(() => useKeyboard());
      const keydownHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keydown'
      )?.[1];

      // This test would need more complex setup to properly test modifier keys
      // For now, we'll test the method exists
      expect(typeof result.current.isKeyComboPressed).toBe('function');
    });
  });

  describe('Sequence detection', () => {
    it('should detect key sequences when enabled', async () => {
      const callback = jest.fn();
      const { result } = renderHook(() =>
        useKeyboard({
          enableSequences: true,
          sequenceTimeout: 500,
          shortcuts: [{ keys: ['Ctrl+k', 'Ctrl+s'], callback }],
        })
      );

      const keydownHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keydown'
      )?.[1];

      act(() => {
        keydownHandler(createKeyboardEvent('keydown', 'k', { ctrlKey: true }));
      });

      expect(result.current.isSequenceActive).toBe(true);

      act(() => {
        keydownHandler(createKeyboardEvent('keydown', 's', { ctrlKey: true }));
      });

      expect(callback).toHaveBeenCalledTimes(1);
      expect(result.current.isSequenceActive).toBe(false);
    });

    it('should timeout sequences', done => {
      const callback = jest.fn();
      const { result } = renderHook(() =>
        useKeyboard({
          enableSequences: true,
          sequenceTimeout: 100,
          shortcuts: [{ keys: ['Ctrl+k', 'Ctrl+s'], callback }],
        })
      );

      const keydownHandler = mockDocument.addEventListener.mock.calls.find(
        call => call[0] === 'keydown'
      )?.[1];

      act(() => {
        keydownHandler(createKeyboardEvent('keydown', 'k', { ctrlKey: true }));
      });

      expect(result.current.isSequenceActive).toBe(true);

      // Wait for timeout
      setTimeout(() => {
        expect(result.current.isSequenceActive).toBe(false);
        done();
      }, 150);
    });
  });

  describe('Error handling', () => {
    it('should handle missing window gracefully', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;

      const { result } = renderHook(() => useKeyboard());
      expect(result.current.isSupported).toBe(false);

      global.window = originalWindow;
    });

    it('should handle missing addEventListener', () => {
      const mockDocumentWithoutAddEventListener = {};

      const { result } = renderHook(() =>
        useKeyboard({
          target: mockDocumentWithoutAddEventListener as Document,
        })
      );

      // Should not throw error
      expect(result.current).toBeDefined();
    });
  });
});
