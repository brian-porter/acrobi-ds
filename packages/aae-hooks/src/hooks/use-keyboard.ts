import { useState, useEffect, useCallback, useRef } from 'react';

// Types
export interface KeyboardShortcut {
  keys: string | string[];
  callback: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  enabled?: boolean;
  global?: boolean;
  description?: string;
}

export interface KeyboardOptions {
  target?: HTMLElement | Document;
  shortcuts?: KeyboardShortcut[];
  preventDefaults?: boolean;
  enableSequences?: boolean;
  sequenceTimeout?: number;
}

export interface UseKeyboardReturn {
  // Event handlers
  addShortcut: (shortcut: KeyboardShortcut) => string;
  removeShortcut: (id: string) => void;
  clearShortcuts: () => void;

  // State
  pressedKeys: Set<string>;
  lastKeyPressed: string | null;
  isSequenceActive: boolean;

  // Utilities
  isKeyPressed: (key: string) => boolean;
  isKeyComboPressed: (combo: string) => boolean;

  // Platform detection
  isMac: boolean;
  modifierKey: 'Cmd' | 'Ctrl';
  isSupported: boolean;
}

// Platform detection
const isMacPlatform = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    /Mac|iPod|iPhone|iPad/.test(window.navigator.platform) ||
    window.navigator.platform === 'MacIntel'
  );
};

// Key normalization
const normalizeKey = (key: string): string => {
  const keyMap: Record<string, string> = {
    ' ': 'Space',
    ArrowLeft: 'Left',
    ArrowRight: 'Right',
    ArrowUp: 'Up',
    ArrowDown: 'Down',
    Escape: 'Esc',
  };
  return keyMap[key] || key;
};

// Parse shortcut string into components
const parseShortcut = (
  shortcut: string
): { modifiers: Set<string>; key: string } => {
  const parts = shortcut.split('+').map(part => part.trim());
  const key = parts[parts.length - 1];
  const modifiers = new Set(parts.slice(0, -1).map(mod => mod.toLowerCase()));

  return { modifiers, key };
};

// Check if keyboard event matches shortcut
const matchesShortcut = (
  event: KeyboardEvent,
  shortcut: string,
  isMac: boolean
): boolean => {
  // Handle platform-agnostic shortcuts
  let normalizedShortcut = shortcut;
  if (shortcut.includes('$mod')) {
    const modKey = isMac ? 'Cmd' : 'Ctrl';
    normalizedShortcut = shortcut.replace(/\$mod/g, modKey);
  }

  const { modifiers, key } = parseShortcut(normalizedShortcut);
  const eventKey = normalizeKey(event.key);

  // Check if key matches
  if (eventKey.toLowerCase() !== key.toLowerCase()) {
    return false;
  }

  // Check modifiers
  const requiredModifiers = new Set([...modifiers]);
  const pressedModifiers = new Set();

  if (event.ctrlKey) pressedModifiers.add('ctrl');
  if (event.altKey) pressedModifiers.add('alt');
  if (event.shiftKey) pressedModifiers.add('shift');
  if (event.metaKey) pressedModifiers.add('cmd');
  if (event.metaKey) pressedModifiers.add('meta');

  // Check if all required modifiers are pressed
  for (const mod of requiredModifiers) {
    if (!pressedModifiers.has(mod)) {
      return false;
    }
  }

  // Check if any extra modifiers are pressed
  for (const mod of pressedModifiers) {
    if (!requiredModifiers.has(mod)) {
      return false;
    }
  }

  return true;
};

// Generate unique ID for shortcuts
const generateShortcutId = (): string => {
  return `shortcut_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export function useKeyboard(options: KeyboardOptions = {}): UseKeyboardReturn {
  const {
    target = typeof window !== 'undefined' ? document : undefined,
    shortcuts: initialShortcuts = [],
    preventDefaults = false,
    enableSequences = false,
    sequenceTimeout = 1000,
  } = options;

  // State
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);
  const [isSequenceActive, setIsSequenceActive] = useState(false);

  // Refs
  const shortcutsRef = useRef<Map<string, KeyboardShortcut>>(new Map());
  const sequenceRef = useRef<string[]>([]);
  const sequenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Platform detection
  const isMac = isMacPlatform();
  const modifierKey = isMac ? 'Cmd' : 'Ctrl';
  const isSupported =
    typeof window !== 'undefined' && 'addEventListener' in window;

  // Initialize shortcuts
  useEffect(() => {
    initialShortcuts.forEach(shortcut => {
      const id = generateShortcutId();
      shortcutsRef.current.set(id, shortcut);
    });
  }, []);

  // Sequence timeout handler
  const resetSequence = useCallback(() => {
    sequenceRef.current = [];
    setIsSequenceActive(false);
    if (sequenceTimeoutRef.current) {
      clearTimeout(sequenceTimeoutRef.current);
      sequenceTimeoutRef.current = null;
    }
  }, []);

  // Handle sequence timeout
  useEffect(() => {
    if (enableSequences && sequenceRef.current.length > 0) {
      if (sequenceTimeoutRef.current) {
        clearTimeout(sequenceTimeoutRef.current);
      }

      sequenceTimeoutRef.current = setTimeout(() => {
        resetSequence();
      }, sequenceTimeout);
    }

    return () => {
      if (sequenceTimeoutRef.current) {
        clearTimeout(sequenceTimeoutRef.current);
      }
    };
  }, [enableSequences, sequenceTimeout, resetSequence]);

  // Keyboard event handlers
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = normalizeKey(event.key);
      setLastKeyPressed(key);

      setPressedKeys(prev => new Set([...prev, key]));

      // Check for shortcut matches
      for (const [id, shortcut] of shortcutsRef.current.entries()) {
        if (!shortcut.enabled && shortcut.enabled !== undefined) continue;

        // Handle array of key patterns (sequences)
        if (Array.isArray(shortcut.keys)) {
          if (enableSequences) {
            // Add current key combination to sequence
            const currentCombo = [];
            if (event.ctrlKey) currentCombo.push('Ctrl');
            if (event.altKey) currentCombo.push('Alt');
            if (event.shiftKey) currentCombo.push('Shift');
            if (event.metaKey) currentCombo.push(isMac ? 'Cmd' : 'Meta');
            currentCombo.push(key);

            sequenceRef.current.push(currentCombo.join('+'));
            setIsSequenceActive(true);

            // Check if sequence matches
            if (sequenceRef.current.length >= shortcut.keys.length) {
              const recentSequence = sequenceRef.current.slice(
                -shortcut.keys.length
              );
              const matches = shortcut.keys.every((pattern, index) =>
                matchesShortcut(event, recentSequence[index], isMac)
              );

              if (matches) {
                if (shortcut.preventDefault) event.preventDefault();
                if (shortcut.stopPropagation) event.stopPropagation();
                shortcut.callback(event);
                resetSequence();
              }
            }
          }
        } else {
          // Handle single shortcut pattern
          if (matchesShortcut(event, shortcut.keys, isMac)) {
            if (shortcut.preventDefault) event.preventDefault();
            if (shortcut.stopPropagation) event.stopPropagation();
            shortcut.callback(event);
          }
        }
      }

      if (preventDefaults) {
        event.preventDefault();
      }
    },
    [preventDefaults, enableSequences, isMac, resetSequence]
  );

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const key = normalizeKey(event.key);
    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  }, []);

  // Event listener management
  useEffect(() => {
    if (!isSupported || !target) return;

    const element = target as HTMLElement | Document;
    const keyDownHandler = (event: Event) =>
      handleKeyDown(event as KeyboardEvent);
    const keyUpHandler = (event: Event) => handleKeyUp(event as KeyboardEvent);

    element.addEventListener('keydown', keyDownHandler);
    element.addEventListener('keyup', keyUpHandler);

    return () => {
      element.removeEventListener('keydown', keyDownHandler);
      element.removeEventListener('keyup', keyUpHandler);
    };
  }, [target, handleKeyDown, handleKeyUp, isSupported]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sequenceTimeoutRef.current) {
        clearTimeout(sequenceTimeoutRef.current);
      }
    };
  }, []);

  // API methods
  const addShortcut = useCallback((shortcut: KeyboardShortcut): string => {
    const id = generateShortcutId();
    shortcutsRef.current.set(id, {
      ...shortcut,
      enabled: shortcut.enabled ?? true,
    });
    return id;
  }, []);

  const removeShortcut = useCallback((id: string): void => {
    shortcutsRef.current.delete(id);
  }, []);

  const clearShortcuts = useCallback((): void => {
    shortcutsRef.current.clear();
  }, []);

  const isKeyPressed = useCallback(
    (key: string): boolean => {
      return pressedKeys.has(normalizeKey(key));
    },
    [pressedKeys]
  );

  const isKeyComboPressed = useCallback(
    (combo: string): boolean => {
      const { modifiers, key } = parseShortcut(combo);

      if (!pressedKeys.has(key)) return false;

      const requiredModifiers = [...modifiers];
      return requiredModifiers.every(mod => {
        switch (mod) {
          case 'ctrl':
            return pressedKeys.has('Control');
          case 'alt':
            return pressedKeys.has('Alt');
          case 'shift':
            return pressedKeys.has('Shift');
          case 'cmd':
          case 'meta':
            return pressedKeys.has('Meta');
          default:
            return false;
        }
      });
    },
    [pressedKeys]
  );

  return {
    // Event handlers
    addShortcut,
    removeShortcut,
    clearShortcuts,

    // State
    pressedKeys,
    lastKeyPressed,
    isSequenceActive,

    // Utilities
    isKeyPressed,
    isKeyComboPressed,

    // Platform detection
    isMac,
    modifierKey,
    isSupported,
  };
}
