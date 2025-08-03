# PWA Window Management Guide

This guide demonstrates how to implement multi-window functionality in your Acrobi PWA using the Window Management API and window.open() for managing multiple application windows.

## ⚠️ Experimental Feature Warning

**The Window Management API is experimental and has very limited browser support:**

- **Chrome 100+**: Behind experimental flag (`chrome://flags/#enable-experimental-web-platform-features`)
- **Edge**: Limited experimental support
- **Firefox/Safari**: Not supported
- **Mobile browsers**: Not supported

For production use, rely on basic `window.open()` functionality which has broader support.

## Overview

Window management in PWAs allows you to:

- Open multiple application windows
- Track and manage window states
- Create specialized window layouts
- Build multi-monitor applications
- Provide tabbed or windowed interfaces

## Browser Support

- **Basic window.open()**: Supported in all modern browsers
- **Window Management API**: Very limited experimental support
- **Multi-monitor features**: Experimental Chrome/Edge only

## Installation

The `useWindowManager` hook is available in the Acrobi UI package:

```typescript
import { useWindowManager } from '@acrobi/ui/hooks';
```

## Basic Usage

### Simple Window Management

```typescript
import { useWindowManager } from '@acrobi/ui/hooks';

function MultiWindowApp() {
  const { 
    support, 
    windows, 
    openWindow, 
    closeWindow, 
    closeAllWindows,
    error 
  } = useWindowManager();

  if (!support.isSupported) {
    return (
      <div className="p-4 bg-yellow-100 rounded">
        <p>Window management is not supported in this browser.</p>
      </div>
    );
  }

  const handleOpenDashboard = async () => {
    await openWindow('/dashboard', {
      name: 'Dashboard',
      features: 'width=1200,height=800,scrollbars=yes,resizable=yes'
    });
  };

  const handleOpenSettings = async () => {
    await openWindow('/settings', {
      name: 'Settings',
      features: 'width=600,height=400,scrollbars=yes,resizable=yes'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button 
          onClick={handleOpenDashboard}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Dashboard
        </button>
        
        <button 
          onClick={handleOpenSettings}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Open Settings
        </button>
        
        <button 
          onClick={closeAllWindows}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close All Windows
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Open Windows ({windows.length})</h3>
        
        {windows.length === 0 ? (
          <p className="text-gray-500">No windows open</p>
        ) : (
          <ul className="space-y-2">
            {windows.map(window => (
              <li 
                key={window.id} 
                className="flex items-center justify-between p-3 border rounded"
              >
                <div>
                  <span className="font-medium">{window.name}</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded ${
                    window.state === 'open' ? 'bg-green-100 text-green-800' :
                    window.state === 'closed' ? 'bg-gray-100 text-gray-800' :
                    window.state === 'opening' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {window.state}
                  </span>
                  <p className="text-sm text-gray-600">{window.url}</p>
                </div>
                
                <button 
                  onClick={() => closeWindow(window.id)}
                  disabled={window.state === 'closed'}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
                >
                  Close
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 rounded">
          <p className="text-red-700">Error: {error.message}</p>
        </div>
      )}
    </div>
  );
}
```

### Advanced Window Types

```typescript
import { useWindowManager, WindowManagerUtils } from '@acrobi/ui/hooks';

function AdvancedWindowManager() {
  const { openWindow } = useWindowManager();

  const openPopup = async () => {
    await openWindow('/popup-content', {
      name: 'Popup',
      features: WindowManagerUtils.getDefaultFeatures('popup')
    });
  };

  const openDialog = async () => {
    await openWindow('/dialog', {
      name: 'Dialog',
      features: WindowManagerUtils.getDefaultFeatures('dialog')
    });
  };

  const openCenteredWindow = async () => {
    const features = WindowManagerUtils.buildFeatures({
      width: 800,
      height: 600,
      ...WindowManagerUtils.centerWindow(800, 600),
      scrollbars: true,
      resizable: true,
      toolbar: false
    });

    await openWindow('/centered-app', {
      name: 'Centered App',
      features
    });
  };

  return (
    <div className="space-y-2">
      <button onClick={openPopup} className="block w-full p-2 bg-blue-500 text-white rounded">
        Open Popup Window
      </button>
      
      <button onClick={openDialog} className="block w-full p-2 bg-green-500 text-white rounded">
        Open Dialog Window
      </button>
      
      <button onClick={openCenteredWindow} className="block w-full p-2 bg-purple-500 text-white rounded">
        Open Centered Window
      </button>
    </div>
  );
}
```

## Hook API Reference

### Return Values

```typescript
interface UseWindowManagerReturn {
  support: WindowSupport;              // Browser support information
  windows: PwaWindow[];                // List of managed windows
  error: WindowError | null;           // Any error that occurred
  loading: boolean;                    // Whether operations are in progress
  openWindow: (url: string, options?: WindowOptions) => Promise<PwaWindow | null>;
  closeWindow: (windowId: string) => Promise<boolean>;
  closeAllWindows: () => Promise<void>;
  refreshWindows: () => Promise<void>;
  getWindow: (windowId: string) => PwaWindow | undefined;
  untrackWindow: (windowId: string) => void;
}
```

### Window Interface

```typescript
interface PwaWindow {
  id: string;                    // Unique identifier
  windowRef?: Window | null;     // Window reference
  url: string;                   // Window URL
  name: string;                  // Window name/title
  features?: string;             // Window features
  state: 'opening' | 'open' | 'closed' | 'error';
  createdAt: Date;               // Creation timestamp
  updatedAt: Date;               // Last update timestamp
  error?: string;                // Error message if any
}
```

### Window Options

```typescript
interface WindowOptions {
  name?: string;          // Window name
  features?: string;      // Window features string
  id?: string;           // Custom window ID
  track?: boolean;       // Whether to track window state
}
```

## Window Features

### Standard Features

```typescript
// Basic popup
const features = 'width=400,height=300,scrollbars=yes,resizable=yes';

// Dialog window
const features = 'width=600,height=400,toolbar=no,menubar=no,location=no';

// Full-featured window
const features = 'width=1200,height=800,scrollbars=yes,resizable=yes,toolbar=yes';
```

### Feature Builder

```typescript
import { WindowManagerUtils } from '@acrobi/ui/hooks';

const features = WindowManagerUtils.buildFeatures({
  width: 800,
  height: 600,
  left: 100,
  top: 100,
  scrollbars: true,
  resizable: true,
  toolbar: false,
  menubar: false,
  location: false,
  status: false
});
```

## Advanced Patterns

### Window Communication

```typescript
import { useWindowManager } from '@acrobi/ui/hooks';
import { useEffect } from 'react';

function WindowCommunicationExample() {
  const { windows, openWindow } = useWindowManager();

  useEffect(() => {
    // Listen for messages from child windows
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      console.log('Message from child window:', event.data);
      
      // Handle different message types
      switch (event.data.type) {
        case 'WINDOW_READY':
          console.log('Child window is ready');
          break;
        case 'DATA_UPDATE':
          console.log('Data updated in child window:', event.data.payload);
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const openCommunicatingWindow = async () => {
    const newWindow = await openWindow('/child-window', {
      name: 'Child Window',
      features: 'width=600,height=400'
    });

    // Send initial data to child window
    if (newWindow?.windowRef) {
      setTimeout(() => {
        newWindow.windowRef?.postMessage({
          type: 'INIT_DATA',
          payload: { userId: '123', theme: 'dark' }
        }, window.location.origin);
      }, 1000);
    }
  };

  const broadcastToAllWindows = () => {
    windows.forEach(window => {
      if (window.windowRef && !window.windowRef.closed) {
        window.windowRef.postMessage({
          type: 'BROADCAST',
          payload: 'Hello from parent window!'
        }, window.location.origin);
      }
    });
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={openCommunicatingWindow}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Communicating Window
      </button>
      
      <button 
        onClick={broadcastToAllWindows}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Broadcast to All Windows
      </button>
    </div>
  );
}
```

### Child Window Setup

```typescript
// In your child window component/page
import { useEffect } from 'react';

function ChildWindowPage() {
  useEffect(() => {
    // Notify parent that window is ready
    if (window.opener) {
      window.opener.postMessage({
        type: 'WINDOW_READY',
        payload: { windowId: 'child-1' }
      }, window.location.origin);
    }

    // Listen for messages from parent
    const handleParentMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      switch (event.data.type) {
        case 'INIT_DATA':
          console.log('Received init data:', event.data.payload);
          break;
        case 'BROADCAST':
          console.log('Broadcast message:', event.data.payload);
          break;
      }
    };

    window.addEventListener('message', handleParentMessage);

    return () => {
      window.removeEventListener('message', handleParentMessage);
    };
  }, []);

  const sendToParent = () => {
    if (window.opener) {
      window.opener.postMessage({
        type: 'DATA_UPDATE',
        payload: { status: 'completed', timestamp: Date.now() }
      }, window.location.origin);
    }
  };

  return (
    <div>
      <h1>Child Window</h1>
      <button onClick={sendToParent}>Send Data to Parent</button>
    </div>
  );
}
```

### Window Persistence

```typescript
import { useWindowManager } from '@acrobi/ui/hooks';
import { useLocalStorage } from '@acrobi/ui/hooks';

function PersistentWindowManager() {
  const { windows, openWindow, closeWindow } = useWindowManager();
  const [savedWindows, setSavedWindows] = useLocalStorage('app-windows', []);

  // Save window state
  useEffect(() => {
    const windowData = windows.map(window => ({
      id: window.id,
      url: window.url,
      name: window.name,
      features: window.features
    }));
    
    setSavedWindows(windowData);
  }, [windows, setSavedWindows]);

  // Restore windows on app load
  const restoreWindows = async () => {
    for (const windowData of savedWindows) {
      await openWindow(windowData.url, {
        name: windowData.name,
        features: windowData.features,
        id: windowData.id
      });
    }
  };

  return (
    <div>
      <button onClick={restoreWindows}>Restore Previous Windows</button>
      <p>Saved windows: {savedWindows.length}</p>
    </div>
  );
}
```

## Utility Functions

### Window Management Utils

```typescript
import { WindowManagerUtils } from '@acrobi/ui/hooks';

// Check support
if (WindowManagerUtils.isSupported()) {
  console.log('Window management supported');
}

// Check experimental API
if (WindowManagerUtils.hasWindowManagementAPI()) {
  console.log('Window Management API available');
}

// Get predefined features
const popupFeatures = WindowManagerUtils.getDefaultFeatures('popup');
const dialogFeatures = WindowManagerUtils.getDefaultFeatures('dialog');

// Center window
const { left, top } = WindowManagerUtils.centerWindow(800, 600);

// Open centered window
const centeredWindow = await WindowManagerUtils.openCenteredWindow(
  '/app',
  'MyApp',
  1000,
  700
);
```

## Security Considerations

### Popup Blockers

```typescript
function handleUserInitiatedOpen() {
  // Must be called from user gesture
  const openNewWindow = async () => {
    const newWindow = await openWindow('/secure-page', {
      name: 'Secure Page'
    });

    if (!newWindow) {
      // Handle popup blocker
      alert('Please allow popups for this site to open new windows');
    }
  };

  // Call immediately in user event handler
  openNewWindow();
}

// Good - called from button click
<button onClick={handleUserInitiatedOpen}>Open Window</button>

// Bad - called asynchronously or without user gesture
setTimeout(() => {
  openWindow('/auto-popup'); // Will likely be blocked
}, 1000);
```

### Cross-Origin Restrictions

```typescript
function secureWindowCommunication() {
  const handleMessage = (event: MessageEvent) => {
    // Always verify origin
    if (event.origin !== window.location.origin) {
      console.warn('Ignoring message from untrusted origin:', event.origin);
      return;
    }

    // Validate message structure
    if (typeof event.data !== 'object' || !event.data.type) {
      console.warn('Invalid message format');
      return;
    }

    // Process trusted message
    processMessage(event.data);
  };

  window.addEventListener('message', handleMessage);
}
```

### Content Security Policy

```typescript
// Ensure CSP allows window.open
// Content-Security-Policy: script-src 'self' 'unsafe-inline';

// For stricter CSP, avoid inline event handlers
function CSPCompliantWindowManager() {
  const { openWindow } = useWindowManager();

  useEffect(() => {
    const button = document.getElementById('open-window-btn');
    
    const handleClick = () => {
      openWindow('/new-window');
    };

    button?.addEventListener('click', handleClick);

    return () => {
      button?.removeEventListener('click', handleClick);
    };
  }, [openWindow]);

  return <button id="open-window-btn">Open Window</button>;
}
```

## Best Practices

### 1. User Experience

```typescript
function UserFriendlyWindowManager() {
  const { windows, openWindow, loading } = useWindowManager();

  const handleOpenWindow = async () => {
    // Show loading state
    setIsOpening(true);

    try {
      const newWindow = await openWindow('/dashboard');
      
      if (!newWindow) {
        // Handle failure gracefully
        showNotification('Failed to open window. Please check popup blocker settings.');
      } else {
        showNotification('Window opened successfully!');
      }
    } finally {
      setIsOpening(false);
    }
  };

  return (
    <button 
      onClick={handleOpenWindow}
      disabled={loading}
      className={`px-4 py-2 rounded ${
        loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
      } text-white`}
    >
      {loading ? 'Opening...' : 'Open Window'}
    </button>
  );
}
```

### 2. Resource Management

```typescript
function EfficientWindowManager() {
  const { windows, closeWindow } = useWindowManager();

  // Close inactive windows
  const closeInactiveWindows = useCallback(() => {
    const now = Date.now();
    const inactiveThreshold = 30 * 60 * 1000; // 30 minutes

    windows.forEach(window => {
      const inactiveTime = now - window.updatedAt.getTime();
      if (inactiveTime > inactiveThreshold && window.state === 'open') {
        closeWindow(window.id);
      }
    });
  }, [windows, closeWindow]);

  // Limit maximum windows
  const openWindow = async (url: string, options?: WindowOptions) => {
    if (windows.length >= 5) {
      // Close oldest window
      const oldestWindow = windows
        .filter(w => w.state === 'open')
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0];
      
      if (oldestWindow) {
        await closeWindow(oldestWindow.id);
      }
    }

    return originalOpenWindow(url, options);
  };
}
```

### 3. Error Handling

```typescript
function RobustWindowManager() {
  const { error, openWindow } = useWindowManager();

  useEffect(() => {
    if (error) {
      console.error('Window management error:', error);
      
      // Show user-friendly error messages
      switch (error.type) {
        case 'UNSUPPORTED':
          showNotification('Window management not supported in this browser');
          break;
        case 'OPEN_ERROR':
          showNotification('Failed to open window. Please check popup blocker.');
          break;
        case 'CLOSE_ERROR':
          showNotification('Failed to close window');
          break;
        default:
          showNotification('An error occurred with window management');
      }
    }
  }, [error]);
}
```

## Testing

### Unit Testing

```typescript
// test/use-window-manager.test.ts
import { renderHook, act } from '@testing-library/react';
import { useWindowManager } from '@acrobi/ui/hooks';

// Mock window.open
const mockWindowOpen = jest.fn();
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true
});

describe('useWindowManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should detect window support', () => {
    const { result } = renderHook(() => useWindowManager());
    
    expect(result.current.support.canOpenWindows).toBe(true);
    expect(result.current.support.isSupported).toBe(true);
  });

  it('should open window', async () => {
    const mockWindow = { closed: false, close: jest.fn() };
    mockWindowOpen.mockReturnValue(mockWindow);

    const { result } = renderHook(() => useWindowManager());
    
    await act(async () => {
      await result.current.openWindow('/test', { name: 'Test' });
    });

    expect(mockWindowOpen).toHaveBeenCalledWith(
      '/test',
      expect.any(String),
      expect.any(String)
    );
    expect(result.current.windows).toHaveLength(1);
  });

  it('should handle popup blocker', async () => {
    mockWindowOpen.mockReturnValue(null);

    const { result } = renderHook(() => useWindowManager());
    
    await act(async () => {
      const window = await result.current.openWindow('/test');
      expect(window).toBeNull();
    });

    expect(result.current.error?.type).toBe('OPEN_ERROR');
  });
});
```

## Troubleshooting

### Common Issues

1. **Popup blocked**: Windows must be opened from user gestures
2. **Cross-origin errors**: Expected when accessing external content
3. **Window not tracked**: Ensure `track: true` option is set
4. **Memory leaks**: Component cleanup is handled automatically

### Debug Tips

```typescript
// Add debug logging
function debugWindowOperation(operation: string, data?: any) {
  console.log('Window Debug:', {
    operation,
    data,
    support: WindowManagerUtils.isSupported(),
    userAgent: navigator.userAgent,
    popupBlocked: !window.open('', '_blank', 'width=1,height=1')?.close()
  });
}
```

## Conclusion

Window management in PWAs provides powerful multi-window capabilities, though browser support varies. The `useWindowManager` hook provides a robust foundation for managing multiple windows while handling the complexities of popup blockers, cross-origin restrictions, and browser limitations.

Remember that the Window Management API is experimental and should be used with appropriate fallbacks for production applications.