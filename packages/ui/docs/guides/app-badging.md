# PWA App Badging Guide

A comprehensive guide to implementing app badging in Progressive Web Apps using the Badging API to show notification counts, activity indicators, and enhance user engagement through visual cues on the app icon.

## Table of Contents

- [Overview](#overview)
- [Browser Support & Feature Detection](#browser-support--feature-detection)
- [Installation & Setup](#installation--setup)
- [Basic Usage](#basic-usage)
- [Advanced Implementations](#advanced-implementations)
- [Service Worker Integration](#service-worker-integration)
- [TypeScript Integration](#typescript-integration)
- [Real-World Examples](#real-world-examples)
- [Performance & Best Practices](#performance--best-practices)
- [Testing Strategies](#testing-strategies)
- [Troubleshooting](#troubleshooting)

## Overview

The App Badge API allows installed PWAs to set a badge on the app icon, providing users with visual cues about new activity, unread messages, or pending notifications. This powerful feature bridges the gap between web and native applications, enhancing user engagement and retention.

### Key Benefits

- **Visual Notifications**: Show unread counts without opening the app
- **Native-like Experience**: Behaves like native app badges
- **User Engagement**: Increases app interaction rates
- **Background Updates**: Works with service workers for offline updates
- **OS Integration**: Badges appear in taskbars, docks, and home screens

### When to Use App Badges

- **Messaging Apps**: Unread message counts
- **Email Clients**: New email indicators
- **Social Media**: Activity notifications
- **Task Managers**: Pending item counts
- **News Apps**: New article indicators
- **E-commerce**: Cart item counts

## Browser Support & Feature Detection

### Compatibility Matrix

| Platform | Browser | Version | Support Level | Notes |
|----------|---------|---------|---------------|-------|
| **Desktop** | Chrome | 81+ | ✅ Full | PWA installation required |
| **Desktop** | Edge | 81+ | ✅ Full | PWA installation required |
| **Desktop** | Firefox | All | ❌ None | Not supported |
| **Desktop** | Safari | All | ❌ None | Not supported |
| **Android** | Chrome | 81+ | ✅ Full | PWA installation required |
| **Android** | Edge | 81+ | ✅ Full | PWA installation required |
| **Android** | Firefox | All | ❌ None | Not supported |
| **iOS** | Safari | All | ❌ None | Not supported |
| **iOS** | Chrome | All | ❌ None | Uses Safari engine |

### Feature Detection

```typescript
/**
 * Comprehensive badge API feature detection
 */
export function getBadgeSupport(): {
  isSupported: boolean;
  canSetBadge: boolean;
  canClearBadge: boolean;
  isPWAInstalled: boolean;
  browserInfo: string;
  limitations: string[];
} {
  const hasNavigator = typeof navigator !== 'undefined';
  const canSetBadge = hasNavigator && 'setAppBadge' in navigator;
  const canClearBadge = hasNavigator && 'clearAppBadge' in navigator;
  const isPWAInstalled = window.matchMedia('(display-mode: standalone)').matches;
  
  let browserInfo = 'Unknown';
  const limitations: string[] = [];
  
  if (hasNavigator) {
    const userAgent = navigator.userAgent;
    
    if (userAgent.includes('Chrome')) {
      browserInfo = 'Chrome';
      if (!isPWAInstalled) {
        limitations.push('PWA must be installed for badges to work');
      }
    } else if (userAgent.includes('Edge')) {
      browserInfo = 'Edge';
      if (!isPWAInstalled) {
        limitations.push('PWA must be installed for badges to work');
      }
    } else if (userAgent.includes('Firefox')) {
      browserInfo = 'Firefox';
      limitations.push('Badge API not supported in Firefox');
    } else if (userAgent.includes('Safari')) {
      browserInfo = 'Safari';
      limitations.push('Badge API not supported in Safari');
    }
  }
  
  return {
    isSupported: canSetBadge && canClearBadge,
    canSetBadge,
    canClearBadge,
    isPWAInstalled,
    browserInfo,
    limitations
  };
}
```

## Installation & Setup

### Installing the Hook

The `useAppBadge` hook is available in the Acrobi UI package:

```typescript
import { useAppBadge } from '@acrobi/ui/hooks';
```

### Manifest Configuration

Ensure your PWA manifest includes proper app identification:

```json
{
  "name": "My App",
  "short_name": "MyApp",
  "display": "standalone",
  "start_url": "/",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

### Service Worker Registration

Register your service worker to enable background badge updates:

```typescript
// app/register-sw.ts
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('SW registered:', registration);
    })
    .catch(error => {
      console.log('SW registration failed:', error);
    });
}
```

### TypeScript Types

If using TypeScript, add badge API types to your project:

```typescript
// types/badge-api.d.ts
interface Navigator {
  setAppBadge?(count?: number): Promise<void>;
  clearAppBadge?(): Promise<void>;
}

interface ServiceWorkerGlobalScope {
  navigator: Navigator;
}
```

## Basic Usage

### Simple Badge Management

```typescript
import { useAppBadge } from '@acrobi/ui/hooks';

function NotificationComponent() {
  const { support, count, set, clear, increment, decrement, error } = useAppBadge();

  if (!support.isSupported) {
    return (
      <div className="p-4 bg-yellow-100 rounded">
        <p>App badging is not supported in this browser.</p>
        <p>Please use Chrome or Edge with an installed PWA.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Current Badge Count</h3>
        <p className="text-2xl font-bold">{count ?? 'No badge'}</p>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => set(5)}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Set to 5
        </button>
        
        <button 
          onClick={increment}
          className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Increment
        </button>
        
        <button 
          onClick={decrement}
          className="px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Decrement
        </button>
        
        <button 
          onClick={clear}
          className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Badge
        </button>
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

### Notification Integration

```typescript
import { useAppBadge } from '@acrobi/ui/hooks';
import { useEffect, useState } from 'react';

interface Notification {
  id: string;
  title: string;
  read: boolean;
}

function NotificationManager() {
  const { set, clear, support } = useAppBadge();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Update badge when notifications change
  useEffect(() => {
    if (!support.isSupported) return;

    const unreadCount = notifications.filter(n => !n.read).length;
    
    if (unreadCount > 0) {
      set(unreadCount);
    } else {
      clear();
    }
  }, [notifications, set, clear, support.isSupported]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const addNotification = (title: string) => {
    setNotifications(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
        read: false
      }
    ]);
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={() => addNotification('New message received')}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Notification
      </button>

      <div className="space-y-2">
        {notifications.map(notification => (
          <div 
            key={notification.id}
            className={`p-3 border rounded ${
              notification.read ? 'bg-gray-100' : 'bg-blue-50 border-blue-200'
            }`}
          >
            <p className="font-medium">{notification.title}</p>
            {!notification.read && (
              <button 
                onClick={() => markAsRead(notification.id)}
                className="text-sm text-blue-600 hover:underline"
              >
                Mark as read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Hook API Reference

### Return Values

```typescript
interface UseAppBadgeReturn {
  support: BadgeSupport;        // Browser support information
  count: number | null;         // Current badge count (local state)
  error: BadgeError | null;     // Any error that occurred
  loading: boolean;             // Whether operation is in progress
  set: (count: number) => Promise<void>;     // Set badge count
  clear: () => Promise<void>;                // Clear badge
  increment: () => Promise<void>;            // Increment count
  decrement: () => Promise<void>;            // Decrement count
  resetCount: () => void;                    // Reset local count
}
```

### Support Detection

```typescript
interface BadgeSupport {
  isSupported: boolean;    // Overall API support
  canSetBadge: boolean;    // Can set badge numbers
  canClearBadge: boolean;  // Can clear badges
}
```

### Error Handling

```typescript
interface BadgeError {
  type: 'SET_ERROR' | 'CLEAR_ERROR' | 'UNSUPPORTED';
  message: string;
  originalError?: Error;
}
```

## Service Worker Integration

### Push Notification Badge Updates

Add badge support to your service worker's push event handler:

```typescript
// sw.ts or service-worker.ts
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  
  // Handle badge updates from push notifications
  const handleBadgeUpdate = async () => {
    if ('badgeCount' in data) {
      try {
        if (data.badgeCount === 0) {
          await self.navigator.clearAppBadge();
        } else if (typeof data.badgeCount === 'number' && data.badgeCount > 0) {
          await self.navigator.setAppBadge(data.badgeCount);
        }
      } catch (error) {
        console.warn('Failed to update badge in service worker:', error);
      }
    }
  };

  // Show notification and update badge
  const showNotification = async () => {
    await handleBadgeUpdate();
    
    return self.registration.showNotification(data.title || 'New Message', {
      body: data.body || 'You have a new notification',
      icon: data.icon || '/icon-192.png',
      badge: data.badge || '/badge-72.png',
      tag: data.tag || 'general',
      data: data.data || {},
      actions: data.actions || []
    });
  };

  event.waitUntil(showNotification());
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // Update badge when user interacts with notifications
  const handleNotificationClick = async () => {
    // Optional: Clear or decrement badge when notification is clicked
    try {
      // Example: Clear badge on notification click
      await self.navigator.clearAppBadge();
    } catch (error) {
      console.warn('Failed to clear badge on notification click:', error);
    }

    // Handle notification click action
    const action = event.action;
    const notificationData = event.notification.data || {};

    if (action === 'reply') {
      // Handle reply action
    } else {
      // Default action - open app
      event.waitUntil(
        clients.openWindow('/')
      );
    }
  };

  event.waitUntil(handleNotificationClick());
});
```

### Background Badge Updates

```typescript
// sw.ts - Background sync for badge updates
self.addEventListener('sync', (event) => {
  if (event.tag === 'badge-update') {
    event.waitUntil(updateBadgeFromServer());
  }
});

async function updateBadgeFromServer() {
  try {
    // Fetch unread count from your API
    const response = await fetch('/api/notifications/unread-count');
    const { count } = await response.json();

    if (count > 0) {
      await self.navigator.setAppBadge(count);
    } else {
      await self.navigator.clearAppBadge();
    }
  } catch (error) {
    console.error('Failed to update badge from server:', error);
  }
}
```

## Advanced Usage Patterns

### Real-time Badge Updates

```typescript
import { useAppBadge } from '@acrobi/ui/hooks';
import { useWebSocket } from '@acrobi/ui/hooks'; // Assumed WebSocket hook

function RealTimeBadgeManager() {
  const { set, clear, support } = useAppBadge();
  const { lastMessage } = useWebSocket('/api/ws/notifications');

  useEffect(() => {
    if (!support.isSupported || !lastMessage) return;

    try {
      const data = JSON.parse(lastMessage.data);
      
      if (data.type === 'badge_update') {
        if (data.count > 0) {
          set(data.count);
        } else {
          clear();
        }
      }
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  }, [lastMessage, set, clear, support.isSupported]);

  return (
    <div>
      <p>Real-time badge updates enabled</p>
      {!support.isSupported && (
        <p className="text-orange-600">
          Badge updates require a supported browser and installed PWA
        </p>
      )}
    </div>
  );
}
```

### Badge Persistence

```typescript
import { useAppBadge } from '@acrobi/ui/hooks';
import { useLocalStorage } from '@acrobi/ui/hooks';

function PersistentBadgeManager() {
  const { set, clear, support } = useAppBadge();
  const [savedCount, setSavedCount] = useLocalStorage('app-badge-count', 0);

  // Restore badge on app load
  useEffect(() => {
    if (!support.isSupported) return;

    if (savedCount > 0) {
      set(savedCount);
    } else {
      clear();
    }
  }, [support.isSupported, savedCount, set, clear]);

  const updateBadge = useCallback(async (count: number) => {
    setSavedCount(count);
    
    if (count > 0) {
      await set(count);
    } else {
      await clear();
    }
  }, [set, clear, setSavedCount]);

  return {
    updateBadge,
    currentCount: savedCount
  };
}
```

## Utility Functions

### Manual Badge Management

```typescript
import { BadgeUtils } from '@acrobi/ui/hooks';

// Check support before using
if (BadgeUtils.isSupported()) {
  // Set badge
  await BadgeUtils.setBadge(5);
  
  // Clear badge
  await BadgeUtils.clearBadge();
}

// Get detailed support information
const supportInfo = BadgeUtils.getSupportInfo();
console.log('Browser:', supportInfo.browser);
console.log('Supported:', supportInfo.supported);
console.log('Limitations:', supportInfo.limitations);
```

## Best Practices

### 1. Graceful Degradation

Always check for support before using badge features:

```typescript
function BadgeAwareComponent() {
  const { support } = useAppBadge();

  return (
    <div>
      {support.isSupported ? (
        <BadgeControls />
      ) : (
        <AlternativeNotificationDisplay />
      )}
    </div>
  );
}
```

### 2. User Experience Guidelines

- **Keep counts reasonable**: Very large numbers (>999) may be truncated
- **Clear badges appropriately**: Remove badges when content is viewed
- **Provide alternatives**: Offer in-app indicators for unsupported browsers
- **Be consistent**: Badge should reflect actual unread/pending items

### 3. Performance Considerations

```typescript
// Debounce rapid badge updates
import { useDebouncedCallback } from 'use-debounce';

function EfficientBadgeManager() {
  const { set } = useAppBadge();
  
  const debouncedSetBadge = useDebouncedCallback(
    (count: number) => set(count),
    300 // 300ms delay
  );

  // Use debounced function for rapid updates
  useEffect(() => {
    debouncedSetBadge(notificationCount);
  }, [notificationCount, debouncedSetBadge]);
}
```

### 4. Error Handling

```typescript
function RobustBadgeManager() {
  const { set, error } = useAppBadge();

  const safeSetBadge = useCallback(async (count: number) => {
    try {
      await set(count);
    } catch (err) {
      // Fallback to in-app indicator
      console.warn('Badge update failed, using fallback');
      showInAppNotificationCount(count);
    }
  }, [set]);

  useEffect(() => {
    if (error) {
      // Log error and provide user feedback
      console.error('Badge error:', error);
      showUserFriendlyMessage('Notification badges temporarily unavailable');
    }
  }, [error]);
}
```

## Testing

### Unit Testing

```typescript
// test/use-app-badge.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAppBadge } from '@acrobi/ui/hooks';

// Mock navigator.setAppBadge and navigator.clearAppBadge
const mockSetAppBadge = jest.fn();
const mockClearAppBadge = jest.fn();

Object.defineProperty(navigator, 'setAppBadge', {
  value: mockSetAppBadge,
  writable: true
});

Object.defineProperty(navigator, 'clearAppBadge', {
  value: mockClearAppBadge,
  writable: true
});

describe('useAppBadge', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should detect badge API support', () => {
    const { result } = renderHook(() => useAppBadge());
    
    expect(result.current.support.isSupported).toBe(true);
    expect(result.current.support.canSetBadge).toBe(true);
    expect(result.current.support.canClearBadge).toBe(true);
  });

  it('should set badge count', async () => {
    const { result } = renderHook(() => useAppBadge());
    
    await act(async () => {
      await result.current.set(5);
    });

    expect(mockSetAppBadge).toHaveBeenCalledWith(5);
    expect(result.current.count).toBe(5);
  });

  it('should clear badge', async () => {
    const { result } = renderHook(() => useAppBadge());
    
    await act(async () => {
      await result.current.clear();
    });

    expect(mockClearAppBadge).toHaveBeenCalled();
    expect(result.current.count).toBe(null);
  });

  it('should handle errors gracefully', async () => {
    mockSetAppBadge.mockRejectedValue(new Error('Badge failed'));
    
    const { result } = renderHook(() => useAppBadge());
    
    await act(async () => {
      await result.current.set(5);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.error?.type).toBe('SET_ERROR');
  });
});
```

### Integration Testing

```typescript
// test/badge-integration.test.ts
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationComponent from '../components/NotificationComponent';

describe('Badge Integration', () => {
  it('should update badge when notifications change', async () => {
    render(<NotificationComponent />);
    
    const addButton = screen.getByText('Add Notification');
    fireEvent.click(addButton);

    // Verify badge was updated
    expect(navigator.setAppBadge).toHaveBeenCalledWith(1);
  });
});
```

## Troubleshooting

### Common Issues

1. **Badge not showing**: PWA must be installed on supported browsers
2. **API not available**: Check browser support and HTTPS requirement
3. **Badge not clearing**: Ensure clearAppBadge() is called correctly
4. **Service worker errors**: Verify SW registration and push permissions

### Debug Tips

```typescript
// Add debug logging
function debugBadgeOperation(operation: string, data?: any) {
  console.log('Badge Debug:', {
    operation,
    data,
    supported: BadgeUtils.isSupported(),
    userAgent: navigator.userAgent,
    isInstalled: window.matchMedia('(display-mode: standalone)').matches
  });
}

// Use in your badge operations
const { set } = useAppBadge();
const debugSet = async (count: number) => {
  debugBadgeOperation('set', { count });
  await set(count);
};
```

## Conclusion

The App Badge API provides a powerful way to enhance user engagement in your Acrobi PWA. By implementing proper error handling, graceful degradation, and following best practices, you can create a robust badging system that works reliably across supported browsers.

Remember that badge support is limited to Chrome/Edge on desktop and Android, so always provide alternative notification methods for broader compatibility.