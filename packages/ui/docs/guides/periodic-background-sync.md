# PWA Periodic Background Sync Guide

This guide demonstrates how to implement periodic background sync in your Acrobi PWA, enabling your application to automatically sync data in the background even when the app is closed.

## ⚠️ Experimental API Warning

**Periodic Background Sync is highly experimental with very limited support:**

- **Chrome 80+**: Behind experimental flag (`chrome://flags/#enable-experimental-web-platform-features`)
- **Other browsers**: Not supported
- **Mobile**: Very limited, subject to power management
- **Production**: Not recommended for critical functionality

## Overview

Periodic Background Sync allows your PWA to:

- Automatically sync data at regular intervals
- Update content in the background
- Provide fresh data when users return to the app
- Work even when the app is closed (with limitations)

## Key Limitations

### Browser Restrictions
- Only Chrome with experimental flags enabled
- Requires PWA to be installed and engaged with regularly
- Subject to browser power management policies
- No guaranteed execution frequency

### System Restrictions
- Disabled on low battery
- Disabled in data saver mode
- Affected by device sleep/hibernation
- Limited by OS background app policies

## Installation

The `usePeriodicSync` hook is available in the Acrobi UI package:

```typescript
import { usePeriodicSync } from '@acrobi/ui/hooks';
```

## Service Worker Implementation

First, implement the periodic sync handler in your service worker:

```typescript
// sw.ts or service-worker.ts
import { PeriodicSyncUtils } from '@acrobi/ui/hooks';

// Periodic sync event handler
self.addEventListener('periodicsync', (event: PeriodicSyncEvent) => {
  console.log('Periodic sync triggered:', event.tag);
  
  // Handle different sync types based on tag
  switch (event.tag) {
    case 'data-sync':
      event.waitUntil(syncApplicationData());
      break;
    case 'news-update':
      event.waitUntil(syncNewsContent());
      break;
    case 'cache-refresh':
      event.waitUntil(refreshCacheContent());
      break;
    default:
      console.warn('Unknown periodic sync tag:', event.tag);
  }
});

/**
 * Sync application data in background
 */
async function syncApplicationData() {
  try {
    console.log('Starting background data sync...');
    
    // Fetch fresh data from API
    const response = await fetch('/api/sync-data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Sync failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Store in IndexedDB or Cache API
    await storeDataInIndexedDB(data);
    
    // Update application cache
    await updateApplicationCache(data);
    
    // Show success notification (optional)
    await self.registration.showNotification('Data Synced', {
      body: 'Your app data has been updated in the background',
      icon: '/icon-192.png',
      badge: '/badge-72.png',
      tag: 'data-sync-success',
      silent: true, // Don't make sound for background sync
      data: {
        type: 'background-sync',
        timestamp: Date.now()
      }
    });

    console.log('Background data sync completed successfully');
  } catch (error) {
    console.error('Background data sync failed:', error);
    
    // Optional: Show error notification for debugging
    if (process.env.NODE_ENV === 'development') {
      await self.registration.showNotification('Sync Failed', {
        body: `Background sync failed: ${error.message}`,
        icon: '/icon-192.png',
        tag: 'data-sync-error'
      });
    }
    
    // Don't throw error - let browser retry later
  }
}

/**
 * Sync news content
 */
async function syncNewsContent() {
  try {
    console.log('Syncing news content...');
    
    const response = await fetch('/api/news/latest');
    const newsData = await response.json();
    
    // Store in cache
    const cache = await caches.open('news-cache-v1');
    await cache.put('/api/news/latest', new Response(JSON.stringify(newsData)));
    
    // Update IndexedDB
    await storeNewsInDB(newsData);
    
    console.log('News sync completed');
  } catch (error) {
    console.error('News sync failed:', error);
  }
}

/**
 * Refresh cached content
 */
async function refreshCacheContent() {
  try {
    console.log('Refreshing cache content...');
    
    const cache = await caches.open('app-cache-v1');
    const cacheUrls = [
      '/',
      '/dashboard',
      '/profile',
      '/api/user/profile'
    ];
    
    for (const url of cacheUrls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response.clone());
        }
      } catch (error) {
        console.warn(`Failed to refresh cache for ${url}:`, error);
      }
    }
    
    console.log('Cache refresh completed');
  } catch (error) {
    console.error('Cache refresh failed:', error);
  }
}

/**
 * Store data in IndexedDB
 */
async function storeDataInIndexedDB(data: any) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AppDatabase', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['sync-data'], 'readwrite');
      const store = transaction.objectStore('sync-data');
      
      store.put({
        id: 'latest',
        data,
        timestamp: Date.now()
      });
      
      transaction.oncomplete = () => resolve(undefined);
      transaction.onerror = () => reject(transaction.error);
    };
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('sync-data')) {
        db.createObjectStore('sync-data', { keyPath: 'id' });
      }
    };
  });
}

/**
 * Update application cache with fresh data
 */
async function updateApplicationCache(data: any) {
  const cache = await caches.open('app-data-v1');
  
  // Store data as cache response
  await cache.put('/api/cached-data', new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  }));
}
```

## Client-Side Usage

### Basic Sync Registration

```typescript
import { usePeriodicSync, PeriodicSyncUtils } from '@acrobi/ui/hooks';

function BackgroundSyncSettings() {
  const { 
    support, 
    isRegistered,
    registeredTags,
    register, 
    unregister,
    error,
    loading 
  } = usePeriodicSync();

  if (!support.isSupported) {
    return (
      <div className="p-4 bg-yellow-100 rounded">
        <h3 className="font-semibold mb-2">Background Sync Not Available</h3>
        <p className="text-sm mb-3">
          Periodic Background Sync requires Chrome 80+ with experimental features enabled.
        </p>
        <div className="text-sm">
          <p className="font-medium">Requirements:</p>
          <ul className="list-disc list-inside ml-2 mt-1">
            <li>Chrome browser with experimental flags enabled</li>
            <li>PWA must be installed</li>
            <li>Regular app usage required</li>
          </ul>
        </div>
      </div>
    );
  }

  const handleEnableSync = async () => {
    await register(PeriodicSyncUtils.COMMON_TAGS.DATA_SYNC, {
      minInterval: PeriodicSyncUtils.INTERVALS.DAILY
    });
  };

  const handleDisableSync = async () => {
    await unregister(PeriodicSyncUtils.COMMON_TAGS.DATA_SYNC);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-2">Background Data Sync</h2>
        <p className="text-gray-600 mb-4">
          Keep your app data up to date even when the app is closed.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {!isRegistered ? (
          <button 
            onClick={handleEnableSync}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Enabling...' : 'Enable Background Sync'}
          </button>
        ) : (
          <button 
            onClick={handleDisableSync}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
          >
            {loading ? 'Disabling...' : 'Disable Background Sync'}
          </button>
        )}
        
        <span className={`px-2 py-1 rounded text-sm ${
          isRegistered ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {isRegistered ? 'Active' : 'Inactive'}
        </span>
      </div>

      {registeredTags.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Active Sync Tasks:</h3>
          <ul className="space-y-1">
            {registeredTags.map(tag => (
              <li key={tag} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="font-mono text-sm">{tag}</span>
                <button 
                  onClick={() => unregister(tag)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 rounded">
          <p className="text-red-700 text-sm">Error: {error.message}</p>
        </div>
      )}

      <div className="text-xs text-gray-500">
        <p>⚠️ Background sync is experimental and may not work reliably.</p>
        <p>Frequency is controlled by the browser based on app usage patterns.</p>
      </div>
    </div>
  );
}
```

### Advanced Sync Management

```typescript
import { usePeriodicSync, PeriodicSyncUtils } from '@acrobi/ui/hooks';
import { useState } from 'react';

function AdvancedSyncManager() {
  const { 
    support,
    registrations, 
    register, 
    unregister, 
    isTagRegistered,
    error 
  } = usePeriodicSync();
  
  const [customTag, setCustomTag] = useState('');
  const [customInterval, setCustomInterval] = useState(24);

  const predefinedSyncs = [
    {
      tag: PeriodicSyncUtils.COMMON_TAGS.DATA_SYNC,
      name: 'App Data Sync',
      description: 'Sync user data and preferences',
      interval: PeriodicSyncUtils.INTERVALS.DAILY
    },
    {
      tag: PeriodicSyncUtils.COMMON_TAGS.NEWS_UPDATE,
      name: 'News Updates',
      description: 'Fetch latest news and updates',
      interval: PeriodicSyncUtils.INTERVALS.HOURLY * 6 // 6 hours
    },
    {
      tag: PeriodicSyncUtils.COMMON_TAGS.CACHE_REFRESH,
      name: 'Cache Refresh',
      description: 'Refresh cached content',
      interval: PeriodicSyncUtils.INTERVALS.DAILY
    }
  ];

  const handleToggleSync = async (tag: string, interval: number) => {
    if (isTagRegistered(tag)) {
      await unregister(tag);
    } else {
      await register(tag, { minInterval: interval });
    }
  };

  const handleRegisterCustom = async () => {
    if (!customTag.trim()) return;
    
    const errors = PeriodicSyncUtils.validateOptions({
      minInterval: customInterval * 60 * 60 * 1000
    });
    
    if (errors.length > 0) {
      alert(`Invalid options: ${errors.join(', ')}`);
      return;
    }

    await register(customTag.trim(), {
      minInterval: customInterval * 60 * 60 * 1000
    });
    
    setCustomTag('');
    setCustomInterval(24);
  };

  if (!support.isSupported) {
    return (
      <div className="p-4 bg-red-100 rounded">
        <h3 className="font-semibold text-red-800">Not Supported</h3>
        <p className="text-red-700">Periodic Background Sync is not supported in this browser.</p>
        <div className="mt-2 text-sm text-red-600">
          <p>Limitations:</p>
          <ul className="list-disc list-inside ml-2">
            {support.limitations.map((limitation, index) => (
              <li key={index}>{limitation}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Background Sync Management</h2>
        <p className="text-gray-600">
          Configure periodic background sync tasks for your application.
        </p>
      </div>

      {/* Predefined Syncs */}
      <div>
        <h3 className="font-semibold mb-3">Predefined Sync Tasks</h3>
        <div className="space-y-3">
          {predefinedSyncs.map(sync => {
            const isActive = isTagRegistered(sync.tag);
            return (
              <div key={sync.tag} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{sync.name}</h4>
                    <p className="text-sm text-gray-600">{sync.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Interval: {PeriodicSyncUtils.formatInterval(sync.interval)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      onClick={() => handleToggleSync(sync.tag, sync.interval)}
                      className={`px-3 py-1 rounded text-sm ${
                        isActive 
                          ? 'bg-red-500 text-white hover:bg-red-600' 
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {isActive ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Sync Registration */}
      <div>
        <h3 className="font-semibold mb-3">Custom Sync Task</h3>
        <div className="p-4 border rounded-lg">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Tag Name</label>
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="e.g., user-activity-sync"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Interval (hours)</label>
              <input
                type="number"
                value={customInterval}
                onChange={(e) => setCustomInterval(Math.max(12, parseInt(e.target.value) || 12))}
                min="12"
                max="8760"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 12 hours, maximum 1 year</p>
            </div>
            <button
              onClick={handleRegisterCustom}
              disabled={!customTag.trim()}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400"
            >
              Register Custom Sync
            </button>
          </div>
        </div>
      </div>

      {/* Active Registrations */}
      {registrations.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Active Registrations</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-2">
              {registrations.map(registration => (
                <div key={registration.tag} className="flex items-center justify-between py-2">
                  <div>
                    <span className="font-mono text-sm">{registration.tag}</span>
                    {registration.minInterval && (
                      <span className="text-xs text-gray-500 ml-2">
                        ({PeriodicSyncUtils.formatInterval(registration.minInterval)})
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => unregister(registration.tag)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Unregister
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 rounded">
          <p className="text-red-700">Error: {error.message}</p>
        </div>
      )}

      {/* Warnings */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Background sync is experimental and may not work reliably</li>
          <li>• Sync frequency is controlled by the browser, not your app</li>
          <li>• Requires regular app usage to maintain sync registration</li>
          <li>• Disabled on low battery or data saver mode</li>
          <li>• Only works when PWA is installed</li>
        </ul>
      </div>
    </div>
  );
}
```

## Testing and Debugging

### Development Testing

```typescript
// pages/sync-debug.tsx - Development testing page
import { usePeriodicSync, PeriodicSyncUtils } from '@acrobi/ui/hooks';
import { useState, useEffect } from 'react';

export default function SyncDebug() {
  const { support, registrations, register, unregister } = usePeriodicSync();
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [`${new Date().toLocaleTimeString()}: ${message}`, ...prev.slice(0, 49)]);
  };

  const testSync = async () => {
    addLog('Testing periodic sync registration...');
    
    try {
      const success = await register('test-sync', {
        minInterval: PeriodicSyncUtils.INTERVALS.MINIMUM
      });
      
      if (success) {
        addLog('✅ Test sync registered successfully');
        
        // Unregister after 5 seconds
        setTimeout(async () => {
          await unregister('test-sync');
          addLog('Test sync unregistered');
        }, 5000);
      } else {
        addLog('❌ Failed to register test sync');
      }
    } catch (error) {
      addLog(`❌ Error: ${error.message}`);
    }
  };

  const forceTriggerSync = () => {
    addLog('Note: Manual sync triggering not available in development');
    addLog('Background sync will be triggered by the browser based on usage patterns');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Periodic Sync Debug</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Support Info */}
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Support Status</h3>
            <div className="space-y-1 text-sm">
              <p>Supported: {support.isSupported ? '✅' : '❌'}</p>
              <p>Service Worker: {support.hasServiceWorker ? '✅' : '❌'}</p>
              <p>Periodic Sync API: {support.hasPeriodicSync ? '✅' : '❌'}</p>
            </div>
            
            {support.limitations.length > 0 && (
              <div className="mt-3">
                <p className="font-medium text-sm">Limitations:</p>
                <ul className="text-xs text-gray-600 list-disc list-inside">
                  {support.limitations.map((limitation, index) => (
                    <li key={index}>{limitation}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Test Controls */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-3">Test Controls</h3>
            <div className="space-y-2">
              <button
                onClick={testSync}
                disabled={!support.isSupported}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                Test Sync Registration
              </button>
              <button
                onClick={forceTriggerSync}
                className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                About Manual Triggering
              </button>
            </div>
          </div>

          {/* Active Registrations */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Active Registrations</h3>
            {registrations.length === 0 ? (
              <p className="text-gray-500 text-sm">No active sync registrations</p>
            ) : (
              <div className="space-y-1">
                {registrations.map(reg => (
                  <div key={reg.tag} className="text-sm font-mono bg-gray-100 p-2 rounded">
                    {reg.tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Debug Logs */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Debug Logs</h3>
          <div className="bg-black text-green-400 p-3 rounded font-mono text-xs h-80 overflow-y-auto">
            {logs.length === 0 ? (
              <p>No logs yet...</p>
            ) : (
              logs.map((log, index) => (
                <div key={index}>{log}</div>
              ))
            )}
          </div>
          <button
            onClick={() => setLogs([])}
            className="mt-2 px-3 py-1 bg-gray-500 text-white rounded text-sm"
          >
            Clear Logs
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Browser DevTools Testing

1. **Enable Experimental Features**:
   - Navigate to `chrome://flags/#enable-experimental-web-platform-features`
   - Enable the flag and restart Chrome

2. **Install Your PWA**:
   - Visit your PWA and install it
   - Use the app regularly to establish engagement

3. **Check Registration**:
   - Open DevTools → Application → Service Workers
   - Look for periodic sync registrations

4. **Monitor Sync Events**:
   - Check service worker console for sync events
   - Note that sync timing is controlled by the browser

## Best Practices

### 1. Graceful Degradation

```typescript
function SyncAwareComponent() {
  const { support } = usePeriodicSync();

  return (
    <div>
      {support.isSupported ? (
        <BackgroundSyncSettings />
      ) : (
        <ManualRefreshOption />
      )}
    </div>
  );
}

function ManualRefreshOption() {
  const handleManualSync = async () => {
    // Fallback manual sync logic
    await fetch('/api/sync-data');
    window.location.reload();
  };

  return (
    <div className="p-4 bg-blue-50 rounded">
      <h3>Manual Sync Available</h3>
      <p>Background sync is not supported. You can manually refresh your data.</p>
      <button onClick={handleManualSync}>Refresh Data</button>
    </div>
  );
}
```

### 2. Error Handling

```typescript
function RobustSyncManager() {
  const { register, error } = usePeriodicSync();

  const handleSyncRegistration = async () => {
    try {
      const success = await register('data-sync');
      
      if (!success) {
        // Show user-friendly message
        showNotification('Background sync could not be enabled');
        return;
      }
      
      showNotification('Background sync enabled successfully');
    } catch (err) {
      console.error('Sync registration failed:', err);
      showFallbackOptions();
    }
  };

  useEffect(() => {
    if (error) {
      console.error('Periodic sync error:', error);
      
      // Show appropriate user message based on error type
      switch (error.type) {
        case 'UNSUPPORTED':
          showNotification('Background sync not available in this browser');
          break;
        case 'REGISTRATION_ERROR':
          showNotification('Failed to enable background sync');
          break;
        default:
          showNotification('Background sync encountered an error');
      }
    }
  }, [error]);
}
```

### 3. Performance Optimization

```typescript
// Service worker - efficient sync implementation
async function syncApplicationData() {
  const startTime = performance.now();
  
  try {
    // Use efficient batch operations
    const [userData, appData, cacheData] = await Promise.all([
      fetchUserData(),
      fetchAppData(),
      refreshCriticalCache()
    ]);
    
    // Store efficiently
    await Promise.all([
      storeUserData(userData),
      storeAppData(appData),
      updateCache(cacheData)
    ]);
    
    const duration = performance.now() - startTime;
    console.log(`Background sync completed in ${duration.toFixed(2)}ms`);
    
  } catch (error) {
    console.error('Sync failed:', error);
    // Let browser retry later
  }
}
```

## Security Considerations

### Data Validation

```typescript
// Service worker - validate sync data
async function syncApplicationData() {
  try {
    const response = await fetch('/api/sync-data');
    const data = await response.json();
    
    // Validate data structure
    if (!isValidSyncData(data)) {
      throw new Error('Invalid sync data received');
    }
    
    // Sanitize before storing
    const sanitizedData = sanitizeSyncData(data);
    await storeData(sanitizedData);
    
  } catch (error) {
    console.error('Sync validation failed:', error);
  }
}

function isValidSyncData(data: any): boolean {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.version === 'string' &&
    Array.isArray(data.items)
  );
}

function sanitizeSyncData(data: any): any {
  // Remove any potentially dangerous content
  return {
    version: String(data.version).slice(0, 20),
    items: data.items.slice(0, 1000).map(sanitizeItem),
    timestamp: Date.now()
  };
}
```

### Rate Limiting

```typescript
// Service worker - implement rate limiting
const SYNC_RATE_LIMIT = {
  maxRequests: 10,
  windowMs: 60 * 60 * 1000 // 1 hour
};

let syncRequestCount = 0;
let windowStart = Date.now();

async function rateLimitedSync() {
  const now = Date.now();
  
  // Reset window if expired
  if (now - windowStart > SYNC_RATE_LIMIT.windowMs) {
    syncRequestCount = 0;
    windowStart = now;
  }
  
  // Check rate limit
  if (syncRequestCount >= SYNC_RATE_LIMIT.maxRequests) {
    console.warn('Sync rate limit exceeded');
    return;
  }
  
  syncRequestCount++;
  await syncApplicationData();
}
```

## Troubleshooting

### Common Issues

1. **Sync not triggering**: Check browser engagement requirements
2. **Registration fails**: Verify experimental flags are enabled
3. **Frequent unregistration**: App needs regular usage to maintain sync
4. **Performance issues**: Optimize sync logic and data size

### Debug Tips

```typescript
// Add comprehensive logging to service worker
self.addEventListener('periodicsync', (event) => {
  console.log('Periodic sync debug:', {
    tag: event.tag,
    timestamp: new Date().toISOString(),
    registration: self.registration,
    clients: self.clients
  });
  
  // Your sync logic here
});

// Client-side debugging
function debugPeriodicSync() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      console.log('Service Worker Registration:', registration);
      
      if ('periodicSync' in registration) {
        registration.periodicSync.getTags().then(tags => {
          console.log('Registered periodic sync tags:', tags);
        });
      } else {
        console.log('Periodic sync not supported');
      }
    });
  }
}
```

## Conclusion

Periodic Background Sync provides powerful capabilities for keeping your Acrobi PWA data fresh, but it comes with significant limitations and browser support restrictions. Use it as a progressive enhancement rather than a core feature, and always provide fallback mechanisms for unsupported browsers.

Remember that the browser controls when and how often sync events occur, so design your sync logic to be robust and efficient.