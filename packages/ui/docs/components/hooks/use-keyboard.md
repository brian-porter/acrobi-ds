# useKeyboard Hook

React hook for advanced keyboard management in PWA applications, providing comprehensive shortcut handling, key combination detection, and cross-platform compatibility.

## 🎯 Overview

The `useKeyboard` hook is part of Epic 40 - PWA Advanced Keyboard Management, the foundational hook in the PWA series (40-79). It provides a robust interface for handling keyboard events, shortcuts, and sequences with full TypeScript support and accessibility features.

## 📦 Installation

```bash
npm install @acrobi/ui
```

## 🚀 Basic Usage

```tsx
import { useKeyboard } from '@acrobi/ui';

function App() {
  const { 
    pressedKeys, 
    lastKeyPressed, 
    addShortcut,
    isMac,
    modifierKey 
  } = useKeyboard({
    shortcuts: [
      {
        keys: 'Escape',
        callback: () => console.log('Escape pressed!'),
        description: 'Close modal'
      },
      {
        keys: '$mod+s',
        callback: () => console.log('Save command!'),
        preventDefault: true,
        description: 'Save document'
      }
    ]
  });

  return (
    <div>
      <p>Platform: {isMac ? 'Mac' : 'PC'}</p>
      <p>Modifier Key: {modifierKey}</p>
      <p>Last Key: {lastKeyPressed}</p>
      <p>Keys Pressed: {Array.from(pressedKeys).join(', ')}</p>
    </div>
  );
}
```

## 🔧 API Reference

### Hook Signature

```tsx
function useKeyboard(options?: KeyboardOptions): UseKeyboardReturn;
```

### KeyboardOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `target` | `HTMLElement \| Document` | `document` | Element to attach event listeners to |
| `shortcuts` | `KeyboardShortcut[]` | `[]` | Initial keyboard shortcuts |
| `preventDefaults` | `boolean` | `false` | Prevent default for all keyboard events |
| `enableSequences` | `boolean` | `false` | Enable multi-key sequence detection |
| `sequenceTimeout` | `number` | `1000` | Timeout in ms for sequence detection |

### KeyboardShortcut

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `keys` | `string \| string[]` | - | Key pattern(s) to match |
| `callback` | `(event: KeyboardEvent) => void` | - | Function to execute when matched |
| `preventDefault` | `boolean` | `false` | Prevent default browser behavior |
| `stopPropagation` | `boolean` | `false` | Stop event propagation |
| `enabled` | `boolean` | `true` | Whether shortcut is active |
| `global` | `boolean` | `false` | Global shortcut (future feature) |
| `description` | `string` | - | Human-readable description |

### UseKeyboardReturn

| Property | Type | Description |
|----------|------|-------------|
| `addShortcut` | `(shortcut: KeyboardShortcut) => string` | Add shortcut dynamically, returns ID |
| `removeShortcut` | `(id: string) => void` | Remove shortcut by ID |
| `clearShortcuts` | `() => void` | Remove all shortcuts |
| `pressedKeys` | `Set<string>` | Currently pressed keys |
| `lastKeyPressed` | `string \| null` | Most recently pressed key |
| `isSequenceActive` | `boolean` | Whether a sequence is in progress |
| `isKeyPressed` | `(key: string) => boolean` | Check if specific key is pressed |
| `isKeyComboPressed` | `(combo: string) => boolean` | Check if key combination is pressed |
| `isMac` | `boolean` | Whether running on Mac platform |
| `modifierKey` | `'Cmd' \| 'Ctrl'` | Platform-appropriate modifier key |
| `isSupported` | `boolean` | Whether keyboard APIs are supported |

## 🎹 Shortcut Patterns

### Single Keys
```tsx
const shortcuts = [
  { keys: 'Escape', callback: closeModal },
  { keys: 'Enter', callback: submitForm },
  { keys: 'Space', callback: pauseVideo },
  { keys: 'ArrowUp', callback: navigateUp }
];
```

### Key Combinations
```tsx
const shortcuts = [
  { keys: 'Ctrl+s', callback: save },
  { keys: 'Alt+Shift+d', callback: debug },
  { keys: 'Cmd+k', callback: openCommand } // Mac specific
];
```

### Platform-Agnostic Shortcuts
```tsx
const shortcuts = [
  { keys: '$mod+s', callback: save },        // Cmd+S on Mac, Ctrl+S elsewhere
  { keys: '$mod+Shift+p', callback: command }, // Works on all platforms
  { keys: '$mod+/', callback: help }
];
```

### Key Sequences
```tsx
const { } = useKeyboard({
  enableSequences: true,
  shortcuts: [
    { keys: ['Ctrl+k', 'Ctrl+s'], callback: saveAll },    // VS Code style
    { keys: ['g', 'g'], callback: goToTop },              // Vim style
    { keys: ['?', '?'], callback: showHelp }              // Custom sequence
  ]
});
```

## 🎨 Advanced Examples

### Dynamic Shortcut Management

```tsx
function ShortcutManager() {
  const { addShortcut, removeShortcut } = useKeyboard();
  const [shortcuts, setShortcuts] = useState<string[]>([]);

  const addNewShortcut = (keys: string, action: () => void) => {
    const id = addShortcut({
      keys,
      callback: action,
      description: `Dynamic shortcut: ${keys}`
    });
    
    setShortcuts(prev => [...prev, id]);
    return id;
  };

  const removeAll = () => {
    shortcuts.forEach(id => removeShortcut(id));
    setShortcuts([]);
  };

  return (
    <div>
      <button onClick={() => addNewShortcut('f1', () => alert('F1 pressed!'))}>
        Add F1 Shortcut
      </button>
      <button onClick={removeAll}>Remove All</button>
    </div>
  );
}
```

### Context-Aware Shortcuts

```tsx
function ContextualShortcuts() {
  const [mode, setMode] = useState<'edit' | 'view'>('view');
  
  const shortcuts = useMemo(() => {
    if (mode === 'edit') {
      return [
        { keys: 'Ctrl+s', callback: save, description: 'Save' },
        { keys: 'Escape', callback: () => setMode('view'), description: 'Exit edit' }
      ];
    } else {
      return [
        { keys: 'e', callback: () => setMode('edit'), description: 'Enter edit mode' },
        { keys: '/', callback: search, description: 'Search' }
      ];
    }
  }, [mode]);

  useKeyboard({ shortcuts });

  return (
    <div>
      <p>Mode: {mode}</p>
      <p>Available shortcuts change based on current mode</p>
    </div>
  );
}
```

### Accessibility Integration

```tsx
function AccessibleComponent() {
  const [focusIndex, setFocusIndex] = useState(0);
  const items = ['Item 1', 'Item 2', 'Item 3'];

  useKeyboard({
    shortcuts: [
      {
        keys: 'ArrowDown',
        callback: () => setFocusIndex(prev => 
          prev < items.length - 1 ? prev + 1 : prev
        ),
        description: 'Move focus down'
      },
      {
        keys: 'ArrowUp', 
        callback: () => setFocusIndex(prev => prev > 0 ? prev - 1 : prev),
        description: 'Move focus up'
      },
      {
        keys: 'Enter',
        callback: () => console.log(`Selected: ${items[focusIndex]}`),
        description: 'Select current item'
      }
    ]
  });

  return (
    <div role="listbox" aria-label="Navigable list">
      {items.map((item, index) => (
        <div
          key={item}
          role="option"
          aria-selected={index === focusIndex}
          style={{
            padding: '8px',
            backgroundColor: index === focusIndex ? '#007acc' : 'transparent',
            color: index === focusIndex ? 'white' : 'black'
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
```

### Performance Monitoring

```tsx
function PerformanceMonitor() {
  const [eventCount, setEventCount] = useState(0);
  
  const { pressedKeys, lastKeyPressed } = useKeyboard({
    shortcuts: [
      {
        keys: 'Ctrl+Shift+p',
        callback: () => {
          console.log('Performance stats:', {
            eventCount,
            pressedKeys: Array.from(pressedKeys),
            lastKey: lastKeyPressed,
            timestamp: Date.now()
          });
        },
        description: 'Show performance stats'
      }
    ]
  });

  // Count all keyboard events
  useEffect(() => {
    const handler = () => setEventCount(prev => prev + 1);
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div>
      <p>Keyboard Events: {eventCount}</p>
      <p>Press Ctrl+Shift+P to see performance stats in console</p>
    </div>
  );
}
```

## 🧪 Testing

### Basic Testing Setup

```tsx
import { renderHook, act } from '@testing-library/react';
import { useKeyboard } from '@acrobi/ui';

describe('useKeyboard', () => {
  it('should handle basic shortcuts', () => {
    const callback = jest.fn();
    
    renderHook(() => useKeyboard({
      shortcuts: [{ keys: 'a', callback }]
    }));

    // Simulate keydown event
    act(() => {
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'a' })
      );
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle key combinations', () => {
    const callback = jest.fn();
    
    renderHook(() => useKeyboard({
      shortcuts: [{ keys: 'Ctrl+s', callback }]
    }));

    act(() => {
      document.dispatchEvent(
        new KeyboardEvent('keydown', { 
          key: 's', 
          ctrlKey: true 
        })
      );
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
```

## 🔒 Security Considerations

### Input Validation
```tsx
const { addShortcut } = useKeyboard();

// Validate shortcut patterns
const addSafeShortcut = (keys: string, callback: () => void) => {
  // Only allow alphanumeric keys and common modifiers
  const safePattern = /^[a-zA-Z0-9+\-\s]*$/;
  
  if (!safePattern.test(keys)) {
    console.warn('Invalid shortcut pattern:', keys);
    return;
  }
  
  return addShortcut({ keys, callback });
};
```

### Event Prevention
```tsx
useKeyboard({
  shortcuts: [
    {
      keys: 'F12',
      callback: () => {
        if (process.env.NODE_ENV === 'production') {
          // Prevent dev tools in production
          return;
        }
        console.log('Dev tools shortcut');
      },
      preventDefault: process.env.NODE_ENV === 'production'
    }
  ]
});
```

## 🎯 Best Practices

### 1. Use Descriptive Shortcuts
```tsx
const shortcuts = [
  { 
    keys: '$mod+s', 
    callback: save,
    description: 'Save document' // Always include descriptions
  }
];
```

### 2. Handle Platform Differences
```tsx
const { isMac, modifierKey } = useKeyboard();

// Show appropriate help text
const helpText = `Press ${modifierKey}+K to open command palette`;
```

### 3. Provide Visual Feedback
```tsx
function VisualShortcuts() {
  const [showHints, setShowHints] = useState(false);
  
  useKeyboard({
    shortcuts: [
      {
        keys: '?',
        callback: () => setShowHints(!showHints),
        description: 'Toggle shortcut hints'
      }
    ]
  });

  return (
    <div>
      {showHints && <ShortcutHints />}
      <p>Press ? to toggle shortcut hints</p>
    </div>
  );
}
```

### 4. Clean Up Resources
```tsx
useEffect(() => {
  const { addShortcut } = useKeyboard();
  
  const shortcutId = addShortcut({
    keys: 'Ctrl+q',
    callback: handleQuit
  });

  // Clean up when component unmounts
  return () => {
    removeShortcut(shortcutId);
  };
}, []);
```

## 🌐 Browser Support

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| **Basic Shortcuts** | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Key Combinations** | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Sequence Detection** | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Platform Detection** | ✅ Full | ✅ Full | ✅ Full | ✅ Full |

## 🔗 Related Hooks

- [useGeolocation](./use-geolocation.md) - Location services
- [useCamera](./use-camera.md) - Camera access
- [useBarcodeScanner](./use-barcode-scanner.md) - Barcode scanning
- [useBluetooth](./use-bluetooth.md) - Bluetooth connectivity

## 📚 Additional Resources

- [Epic 40 Documentation](/docs/epics/epic-40.md) - Complete epic specification
- [PWA Best Practices](/docs/guides/pwa-best-practices.md) - Implementation guidelines
- [Accessibility Guide](/docs/guides/accessibility.md) - A11y patterns
- [Testing Guide](/docs/guides/testing-hooks.md) - Hook testing strategies

---

**Epic 40 Status**: ✅ Implemented  
**Next Epic**: [Epic 41 - Network Status](/docs/epics/epic-41.md)  
**Series**: PWA Foundation (40-79)

*This hook is part of the PWA Advanced Keyboard Management epic, providing the foundation for keyboard interactions across all PWA features.*