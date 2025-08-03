# Service Worker Master Guide

A comprehensive guide to implementing production-ready Service Workers for Progressive Web Apps (PWAs). This guide combines caching strategies, lifecycle management, and advanced background capabilities into a complete implementation reference.

## Overview

Service Workers are the backbone of modern PWAs, enabling offline functionality, background sync, push notifications, and sophisticated caching strategies. This guide provides production-ready code examples and best practices for implementing Service Workers in your applications.

## Table of Contents

1. [Service Worker Lifecycle](#service-worker-lifecycle)
2. [Service Worker Registration](#service-worker-registration)
3. [Intercepting Requests: The Fetch Event](#intercepting-requests-the-fetch-event)
4. [Advanced Background Capabilities](#advanced-background-capabilities)
5. [Production Deployment](#production-deployment)
6. [Troubleshooting](#troubleshooting)

## Service Worker Lifecycle

Understanding the Service Worker lifecycle is crucial for implementing reliable PWA functionality. Service Workers have distinct lifecycle events that control when they install, activate, and begin intercepting network requests.

### Install Event

The `install` event fires when a Service Worker is first downloaded or when a new version is detected. This is the perfect time to pre-cache critical resources.

```javascript
// sw.js - Service Worker file
const CACHE_NAME = 'my-pwa-v1.2.0';
const APP_SHELL_CACHE = [
  '/',
  '/index.html',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json',
  '/offline.html', // Offline fallback page
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching App Shell');
        return cache.addAll(APP_SHELL_CACHE);
      })
      .then(() => {
        console.log('Service Worker: App Shell cached successfully');
        // Skip waiting to activate immediately (optional)
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Cache installation failed:', error);
      })
  );
});
```

### Activate Event

The `activate` event fires when the Service Worker becomes active. Use this event to clean up old caches and perform any necessary migration tasks.

```javascript
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old caches that don't match current version
            if (cacheName !== CACHE_NAME && cacheName.startsWith('my-pwa-')) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Old caches cleaned up');
        // Take control of all pages immediately (optional)
        return self.clients.claim();
      })
      .catch((error) => {
        console.error('Service Worker: Activation failed:', error);
      })
  );
});
```

### Lifecycle Best Practices

- **Version your caches**: Include version numbers in cache names for easy cleanup
- **Pre-cache selectively**: Only cache essential resources during install
- **Handle errors gracefully**: Always include error handling in lifecycle events
- **Use skipWaiting() carefully**: Only skip waiting if you handle version conflicts properly
- **Clean up old caches**: Always remove outdated caches during activation

## Service Worker Registration

Proper Service Worker registration ensures your PWA works reliably across different frameworks and deployment scenarios.

### Next.js Registration (App Router)

For Next.js applications using the App Router (13+), register the Service Worker in your root layout:

```typescript
// app/layout.tsx
'use client';

import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      registerServiceWorker();
    }
  }, []);

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/', // Controls which pages the SW can intercept
    });

    console.log('Service Worker registered successfully:', registration);

    // Handle Service Worker updates
    registration.addEventListener('updatefound', () => {
      const installingWorker = registration.installing;
      if (installingWorker) {
        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New Service Worker available
              console.log('New Service Worker available');
              showUpdateAvailableNotification();
            } else {
              // Service Worker installed for the first time
              console.log('Service Worker installed for the first time');
              showOfflineCapabilityNotification();
            }
          }
        });
      }
    });

  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
}

function showUpdateAvailableNotification() {
  // Show user notification that an update is available
  if (confirm('New version available! Reload to update?')) {
    window.location.reload();
  }
}

function showOfflineCapabilityNotification() {
  // Notify user that offline functionality is now available
  console.log('App is ready for offline use!');
}
```

### Next.js Registration (Pages Router)

For Next.js applications using the Pages Router:

```typescript
// pages/_app.tsx
import { useEffect } from 'react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      registerServiceWorker();
    }
  }, []);

  return <Component {...pageProps} />;
}

async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    
    console.log('SW registered: ', registration);

    // Listen for Service Worker updates
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (installingWorker) {
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New update available
              notifyUserOfUpdate();
            }
          }
        };
      }
    };

  } catch (error) {
    console.log('SW registration failed: ', error);
  }
}

function notifyUserOfUpdate() {
  // Implementation depends on your UI framework
  // Could show a toast, banner, or modal
  const shouldUpdate = window.confirm(
    'A new version is available! Would you like to update?'
  );
  
  if (shouldUpdate) {
    window.location.reload();
  }
}
```

### React/Vite Registration

For React applications built with Vite:

```typescript
// src/main.tsx or src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      
      // Handle updates
      registration.addEventListener('updatefound', handleSWUpdate);
      
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  });
}

function handleSWUpdate(event: Event) {
  const registration = event.target as ServiceWorkerRegistration;
  const installingWorker = registration.installing;
  
  if (installingWorker) {
    installingWorker.addEventListener('statechange', () => {
      if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // Show update notification
        showUpdateNotification();
      }
    });
  }
}

function showUpdateNotification() {
  // Create and show update notification
  const notification = document.createElement('div');
  notification.innerHTML = `
    <div style="position: fixed; top: 20px; right: 20px; background: #007bff; color: white; padding: 16px; border-radius: 8px; z-index: 9999;">
      <p>New version available!</p>
      <button onclick="window.location.reload()" style="background: white; color: #007bff; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
        Update Now
      </button>
      <button onclick="this.parentElement.remove()" style="background: transparent; color: white; border: 1px solid white; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-left: 8px;">
        Later
      </button>
    </div>
  `;
  document.body.appendChild(notification);
}
```

### Registration Best Practices

- **Register after page load**: Avoid blocking the initial page render
- **Handle registration failures**: Always include error handling
- **Notify users of updates**: Provide clear update mechanisms
- **Test different scenarios**: Test first install, updates, and failures
- **Use appropriate scope**: Set the correct scope for your application structure

## Intercepting Requests: The Fetch Event

The `fetch` event is where Service Workers truly shine, allowing you to implement sophisticated caching strategies that dramatically improve performance and enable offline functionality.

### Multi-Strategy Fetch Handler

This production-ready fetch handler implements different caching strategies based on request type:

```javascript
// sw.js - Complete fetch event handler

// Cache configuration
const CACHE_NAME = 'my-pwa-v1.2.0';
const RUNTIME_CACHE = 'runtime-cache-v1.2.0';
const IMAGES_CACHE = 'images-cache-v1.2.0';
const API_CACHE = 'api-cache-v1.2.0';

// Cache duration in milliseconds
const CACHE_DURATION = {
  API: 5 * 60 * 1000, // 5 minutes
  IMAGES: 30 * 24 * 60 * 60 * 1000, // 30 days
  STATIC: 365 * 24 * 60 * 60 * 1000, // 1 year
};

self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  const url = new URL(event.request.url);
  
  // Route requests to appropriate caching strategy
  if (isAppShellRequest(url)) {
    event.respondWith(handleAppShell(event.request));
  } else if (isAPIRequest(url)) {
    event.respondWith(handleAPI(event.request));
  } else if (isImageRequest(url)) {
    event.respondWith(handleImages(event.request));
  } else if (isStaticAsset(url)) {
    event.respondWith(handleStaticAssets(event.request));
  } else {
    // Default: Network first with cache fallback
    event.respondWith(handleDefault(event.request));
  }
});

// Request type detection
function isAppShellRequest(url) {
  const appShellPaths = ['/', '/index.html', '/app', '/dashboard'];
  return appShellPaths.includes(url.pathname) || 
         url.pathname.endsWith('.html');
}

function isAPIRequest(url) {
  return url.pathname.startsWith('/api/') || 
         url.hostname !== self.location.hostname;
}

function isImageRequest(url) {
  return url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i);
}

function isStaticAsset(url) {
  return url.pathname.match(/\.(css|js|woff2|woff|ttf|json)$/i);
}

// Caching strategies

// 1. Cache First (App Shell) - For core app files
async function handleAppShell(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // If not in cache, fetch and cache
    const response = await fetch(request);
    if (response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;

  } catch (error) {
    console.error('App shell request failed:', error);
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    throw error;
  }
}

// 2. Network First (API) - For dynamic data with cache fallback
async function handleAPI(request) {
  try {
    const response = await fetch(request);
    
    if (response.status === 200) {
      const cache = await caches.open(API_CACHE);
      // Store with timestamp for cache expiration
      const responseToCache = response.clone();
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-timestamp', Date.now().toString());
      
      const cachedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      cache.put(request, cachedResponse);
    }
    
    return response;

  } catch (error) {
    console.log('Network failed, checking cache for API request');
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Check if cache is still valid
      const cacheTimestamp = cachedResponse.headers.get('sw-cache-timestamp');
      if (cacheTimestamp) {
        const age = Date.now() - parseInt(cacheTimestamp);
        if (age < CACHE_DURATION.API) {
          return cachedResponse;
        }
      }
    }
    
    throw error;
  }
}

// 3. Stale While Revalidate (Images) - Return cache immediately, update in background
async function handleImages(request) {
  const cache = await caches.open(IMAGES_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Always try to fetch fresh version in background
  const fetchPromise = fetch(request).then((response) => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch((error) => {
    console.log('Image fetch failed:', error);
    return cachedResponse;
  });

  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }

  // If no cached version, wait for network
  return fetchPromise;
}

// 4. Cache First with Network Fallback (Static Assets)
async function handleStaticAssets(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    if (response.status === 200) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Static asset request failed:', error);
    throw error;
  }
}

// 5. Default Network First
async function handleDefault(request) {
  try {
    const response = await fetch(request);
    
    // Cache successful responses
    if (response.status === 200) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // For navigation requests, return offline page
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}
```

### Offline Page Implementation

Create a compelling offline experience:

```html
<!-- public/offline.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're Offline</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .offline-container {
      text-align: center;
      max-width: 500px;
      padding: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      backdrop-filter: blur(10px);
    }
    .offline-icon {
      font-size: 64px;
      margin-bottom: 20px;
    }
    h1 {
      margin: 0 0 20px;
      font-size: 2.5em;
    }
    p {
      font-size: 1.2em;
      line-height: 1.6;
      margin-bottom: 30px;
      opacity: 0.9;
    }
    .retry-button {
      background: white;
      color: #667eea;
      border: none;
      padding: 15px 30px;
      font-size: 1.1em;
      border-radius: 30px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .retry-button:hover {
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <div class="offline-container">
    <div class="offline-icon">📡</div>
    <h1>You're Offline</h1>
    <p>
      It looks like you've lost your internet connection. 
      Don't worry – you can still browse the pages you've already visited!
    </p>
    <button class="retry-button" onclick="window.location.reload()">
      Try Again
    </button>
  </div>

  <script>
    // Auto-retry when connection is restored
    window.addEventListener('online', () => {
      window.location.reload();
    });
  </script>
</body>
</html>
```

### Fetch Event Best Practices

- **Implement multiple strategies**: Use appropriate caching strategies for different content types
- **Handle errors gracefully**: Always provide fallbacks for network failures
- **Cache selectively**: Don't cache everything – be strategic about what to store
- **Implement cache expiration**: Include timestamps and TTL for dynamic content
- **Provide offline feedback**: Create engaging offline pages and notifications
- **Monitor performance**: Track cache hit rates and loading times

## Advanced Background Capabilities

Service Workers enable powerful background capabilities that enhance the user experience even when the app isn't actively being used. This section covers the core background APIs and their integration patterns.

### Push Notifications

Enable real-time communication with users through push notifications. This example shows a complete push notification implementation:

```javascript
// In your Service Worker (sw.js)
self.addEventListener('push', (event) => {
  console.log('[SW] Push Received:', event);
  
  let notificationData = {
    title: 'New Notification',
    body: 'You have a new message',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    tag: 'default',
    requireInteraction: false,
    silent: false
  };

  // Parse push data if available
  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = { ...notificationData, ...data };
    } catch (error) {
      notificationData.body = event.data.text();
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    tag: notificationData.tag,
    requireInteraction: notificationData.requireInteraction,
    silent: notificationData.silent,
    vibrate: [100, 50, 100],
    data: {
      url: notificationData.url || '/',
      dateOfArrival: Date.now(),
      primaryKey: notificationData.id || crypto.randomUUID()
    },
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: '/icons/open.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/close.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click:', event);
  
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  switch (event.action) {
    case 'open':
      event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
          .then(windowClients => {
            // Focus existing window if available
            const existingClient = windowClients.find(client => 
              client.url === urlToOpen && 'focus' in client
            );
            
            if (existingClient) {
              return existingClient.focus();
            }
            
            // Open new window
            if (clients.openWindow) {
              return clients.openWindow(urlToOpen);
            }
          })
      );
      break;
    case 'dismiss':
      // Just close, no action needed
      break;
    default:
      // Default action - open the app
      event.waitUntil(
        clients.openWindow(urlToOpen)
      );
  }
});
```

**Client-side subscription management:**

```javascript
// In your main app - Push subscription management
async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;
  
  // Check if already subscribed
  let subscription = await registration.pushManager.getSubscription();
  
  if (!subscription) {
    try {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
    } catch (error) {
      console.error('Failed to subscribe:', error);
      return null;
    }
  }
  
  // Send subscription to your server
  await sendSubscriptionToServer(subscription);
  return subscription;
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
```

### Background Sync

Ensure data synchronization even when offline. This implementation provides a robust queuing system:

```javascript
// Service Worker - Background Sync Handler
self.addEventListener('sync', (event) => {
  console.log('[SW] Background Sync:', event.tag);
  
  switch (event.tag) {
    case 'background-sync':
      event.waitUntil(doBackgroundSync());
      break;
    case 'user-data-sync':
      event.waitUntil(syncUserData());
      break;
    case 'offline-actions':
      event.waitUntil(processOfflineActions());
      break;
    default:
      console.warn('Unknown sync tag:', event.tag);
  }
});

async function doBackgroundSync() {
  try {
    console.log('[SW] Starting background sync...');
    
    // Get pending data from IndexedDB
    const pendingData = await getPendingSyncData();
    console.log(`[SW] Found ${pendingData.length} items to sync`);
    
    const syncResults = [];
    
    for (const data of pendingData) {
      try {
        const response = await fetch('/api/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Background-Sync': 'true'
          },
          body: JSON.stringify(data.payload)
        });

        if (response.ok) {
          await removePendingSyncData(data.id);
          syncResults.push({ id: data.id, success: true });
        } else {
          syncResults.push({ id: data.id, success: false, error: response.statusText });
        }
      } catch (error) {
        console.error(`[SW] Sync failed for item ${data.id}:`, error);
        syncResults.push({ id: data.id, success: false, error: error.message });
      }
    }
    
    // Notify clients about sync results
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'BACKGROUND_SYNC_COMPLETE',
        results: syncResults
      });
    });
    
    console.log('[SW] Background sync completed:', syncResults);
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
    throw error; // Let browser retry
  }
}

// IndexedDB operations for sync queue
async function getPendingSyncData() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SyncDatabase', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['sync-queue'], 'readonly');
      const store = transaction.objectStore('sync-queue');
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
      getAllRequest.onerror = () => reject(getAllRequest.error);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('sync-queue')) {
        const store = db.createObjectStore('sync-queue', { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp');
      }
    };
  });
}

async function removePendingSyncData(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SyncDatabase', 1);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['sync-queue'], 'readwrite');
      const store = transaction.objectStore('sync-queue');
      const deleteRequest = store.delete(id);
      
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject(deleteRequest.error);
    };
  });
}
```

**Client-side queue management:**

```javascript
// Add data to sync queue when offline
async function queueForBackgroundSync(data) {
  const db = await openSyncDB();
  const transaction = db.transaction(['sync-queue'], 'readwrite');
  const store = transaction.objectStore('sync-queue');
  
  const syncItem = {
    id: crypto.randomUUID(),
    payload: data,
    timestamp: Date.now(),
    retryCount: 0
  };
  
  await store.add(syncItem);
  
  // Register background sync
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    const registration = await navigator.serviceWorker.ready;
    await registration.sync.register('background-sync');
  }
}
```

### Periodic Background Sync

Keep content fresh with periodic updates. Note: This is experimental and requires Chrome with flags enabled:

```javascript
// Service Worker - Periodic Sync Handler
self.addEventListener('periodicsync', (event) => {
  console.log('[SW] Periodic sync triggered:', event.tag);
  
  switch (event.tag) {
    case 'content-sync':
      event.waitUntil(updateContent());
      break;
    case 'news-refresh':
      event.waitUntil(refreshNews());
      break;
    case 'cache-maintenance':
      event.waitUntil(performCacheMaintenance());
      break;
    default:
      console.warn('Unknown periodic sync tag:', event.tag);
  }
});

async function updateContent() {
  try {
    console.log('[SW] Updating content via periodic sync...');
    
    const response = await fetch('/api/content/latest', {
      headers: { 'X-Periodic-Sync': 'true' }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const content = await response.json();
    
    // Update cache with fresh content
    const cache = await caches.open('content-cache-v1');
    await cache.put('/api/content/latest', new Response(JSON.stringify(content), {
      headers: { 'Content-Type': 'application/json' }
    }));
    
    // Store content update timestamp
    await cache.put('/content-last-updated', new Response(Date.now().toString()));
    
    // Notify open clients
    const clients = await self.clients.matchAll();
    if (clients.length > 0) {
      clients.forEach(client => {
        client.postMessage({
          type: 'CONTENT_UPDATED',
          payload: content,
          timestamp: Date.now()
        });
      });
    }
    
    console.log('[SW] Periodic content update completed');
  } catch (error) {
    console.error('[SW] Periodic content update failed:', error);
    // Don't throw - let browser handle retry
  }
}

async function performCacheMaintenance() {
  try {
    console.log('[SW] Starting cache maintenance...');
    
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
      name.includes('v1.1') || name.includes('old-') || name.includes('temp-')
    );
    
    // Clean up old caches
    await Promise.all(oldCaches.map(name => caches.delete(name)));
    
    // Refresh frequently accessed resources
    const importantUrls = ['/', '/dashboard', '/profile'];
    const cache = await caches.open('app-shell-v1.2.0');
    
    for (const url of importantUrls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response);
        }
      } catch (error) {
        console.warn(`Failed to refresh ${url}:`, error);
      }
    }
    
    console.log('[SW] Cache maintenance completed');
  } catch (error) {
    console.error('[SW] Cache maintenance failed:', error);
  }
}
```

### Background Fetch

Handle large downloads that continue even if the app is closed:

```javascript
// Service Worker - Background Fetch Handlers
self.addEventListener('backgroundfetch', (event) => {
  console.log('[SW] Background fetch:', event.tag);
  
  if (event.tag === 'large-download') {
    event.waitUntil(handleLargeDownload(event));
  }
});

async function handleLargeDownload(event) {
  try {
    const bgFetch = await self.registration.backgroundFetch.fetch(
      'large-download',
      '/api/large-file.zip',
      {
        icons: [{ 
          src: '/icons/download.png', 
          sizes: '256x256', 
          type: 'image/png' 
        }],
        title: 'Downloading content...',
        downloadTotal: 50 * 1024 * 1024, // 50MB
        text: 'Large file download in progress'
      }
    );
    
    console.log('[SW] Background fetch initiated:', bgFetch.id);
  } catch (error) {
    console.error('[SW] Background fetch failed to start:', error);
  }
}

self.addEventListener('backgroundfetchsuccess', (event) => {
  console.log('[SW] Background fetch success:', event.tag);
  
  event.waitUntil(
    (async () => {
      try {
        // Process downloaded content
        const cache = await caches.open('downloads-v1');
        const records = await event.registration.matchAll();
        
        let totalSize = 0;
        for (const record of records) {
          const response = await record.responseReady;
          if (response && response.ok) {
            await cache.put(record.request, response.clone());
            totalSize += parseInt(response.headers.get('content-length') || '0');
          }
        }
        
        // Update download UI
        await self.registration.showNotification('Download Complete', {
          body: `Downloaded ${Math.round(totalSize / 1024 / 1024)}MB successfully`,
          icon: '/icons/download-complete.png',
          tag: 'download-success'
        });
        
        // Notify clients
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
          client.postMessage({
            type: 'DOWNLOAD_COMPLETE',
            tag: event.tag,
            totalSize
          });
        });
      } catch (error) {
        console.error('[SW] Error processing background fetch success:', error);
      }
    })()
  );
});

self.addEventListener('backgroundfetchfail', (event) => {
  console.log('[SW] Background fetch failed:', event.tag);
  
  event.waitUntil(
    self.registration.showNotification('Download Failed', {
      body: 'Download could not be completed',
      icon: '/icons/download-error.png',
      tag: 'download-failed'
    })
  );
});

self.addEventListener('backgroundfetchabort', (event) => {
  console.log('[SW] Background fetch aborted:', event.tag);
  
  event.waitUntil(
    self.registration.showNotification('Download Cancelled', {
      body: 'Download was cancelled',
      icon: '/icons/download-cancelled.png',
      tag: 'download-cancelled'
    })
  );
});
```

**Client-side background fetch management:**

```javascript
// Initiate background fetch from client
async function startBackgroundDownload(url, options = {}) {
  const registration = await navigator.serviceWorker.ready;
  
  try {
    const bgFetch = await registration.backgroundFetch.fetch(
      'large-download',
      url,
      {
        icons: [{ src: '/icons/download.png', sizes: '256x256', type: 'image/png' }],
        title: options.title || 'Downloading...',
        downloadTotal: options.size || 0,
        ...options
      }
    );
    
    console.log('Background fetch started:', bgFetch.id);
    
    // Monitor progress
    bgFetch.addEventListener('progress', (event) => {
      const percent = Math.round((event.loaded / event.total) * 100);
      console.log(`Download progress: ${percent}%`);
    });
    
    return bgFetch;
  } catch (error) {
    console.error('Failed to start background fetch:', error);
    throw error;
  }
}
```

### Protocol Handlers Integration

Service Workers can enhance protocol handling for custom URL schemes:

```javascript
// Service Worker - Handle protocol requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Handle custom protocol redirects
  if (url.pathname.startsWith('/handle-')) {
    event.respondWith(handleProtocolRequest(event.request));
  }
});

async function handleProtocolRequest(request) {
  const url = new URL(request.url);
  const protocolData = url.searchParams.get('data');
  
  if (protocolData) {
    // Cache the protocol data for offline access
    const cache = await caches.open('protocol-cache-v1');
    const cacheKey = `/protocol-data/${Date.now()}`;
    
    await cache.put(cacheKey, new Response(protocolData, {
      headers: { 'Content-Type': 'text/plain' }
    }));
  }
  
  // Let the request continue to the page
  return fetch(request);
}
```

**Advanced Integration Patterns:**

For comprehensive implementations of these capabilities, explore the related guides:
- **[Advanced Fetch & Caching](./advanced-fetch-caching)** - Production-ready request handling patterns  
- **[Periodic Background Sync](./periodic-background-sync)** - Detailed implementation with fallback strategies
- **[Protocol Handlers](./protocol-handlers)** - Complete custom URL scheme handling

## Production Deployment

### Build Integration & Framework Setup

#### Next.js Integration

Configure Next.js for optimal Service Worker deployment:

```javascript
// next.config.js (Next.js App Router & Pages Router)
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Rewrite Service Worker requests
  async rewrites() {
    return [
      {
        source: '/sw.js',
        destination: '/_next/static/sw.js',
      },
      {
        source: '/service-worker.js',
        destination: '/_next/static/service-worker.js',
      }
    ];
  },
  
  // Service Worker specific headers
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
    ];
  },
  
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add Service Worker to build process
    if (!isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.BUILD_ID': JSON.stringify(buildId),
          'process.env.CACHE_NAME': JSON.stringify(`acrobi-pwa-${buildId}`),
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'process.env.VERSION': JSON.stringify(process.env.npm_package_version || '1.0.0'),
        })
      );
    }
    
    return config;
  },
};

module.exports = nextConfig;
```

#### Vite/React Integration

For Vite-based projects:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Acrobi PWA',
        short_name: 'AcrobiPWA',
        description: 'My Awesome Acrobi PWA',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      injectManifest: {
        swSrc: 'src/sw.js',
        swDest: 'dist/sw.js',
        globDirectory: 'dist',
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,woff2}'
        ]
      }
    })
  ]
});
```

### Cache Versioning Strategy

Implement robust cache versioning for production deployments:

```javascript
// sw.js - Production cache versioning
const VERSION = process.env.VERSION || '1.0.0';
const BUILD_ID = process.env.BUILD_ID || 'dev';
const CACHE_TIMESTAMP = Date.now();

// Cache name generation
const CACHE_NAMES = {
  STATIC: `acrobi-static-${VERSION}-${BUILD_ID}`,
  DYNAMIC: `acrobi-dynamic-${VERSION}`,
  API: `acrobi-api-${VERSION}`,
  IMAGES: `acrobi-images-${VERSION}`,
  RUNTIME: `acrobi-runtime-${BUILD_ID}`
};

// Cache configuration
const CACHE_CONFIG = {
  // Static assets - long cache duration
  STATIC: {
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    maxEntries: 100
  },
  // API responses - short cache duration
  API: {
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxEntries: 50
  },
  // Images - medium cache duration
  IMAGES: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxEntries: 200
  }
};

// Activation - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Get all cache names
      const cacheNames = await caches.keys();
      
      // Identify old caches
      const oldCaches = cacheNames.filter(cacheName => {
        // Keep current version caches
        const isCurrentCache = Object.values(CACHE_NAMES).includes(cacheName);
        
        // Remove old acrobi caches
        const isAcrobiCache = cacheName.startsWith('acrobi-');
        
        return isAcrobiCache && !isCurrentCache;
      });
      
      console.log(`[SW] Cleaning up ${oldCaches.length} old caches`);
      
      // Delete old caches
      await Promise.all(
        oldCaches.map(cacheName => {
          console.log(`[SW] Deleting cache: ${cacheName}`);
          return caches.delete(cacheName);
        })
      );
      
      // Take control of all pages
      await self.clients.claim();
      
      console.log('[SW] Cache cleanup completed, service worker activated');
    })()
  );
});
```

### Environment-Specific Configuration

Handle different environments properly:

```javascript
// sw.js - Environment configuration
const ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = ENV === 'production';
const IS_DEVELOPMENT = ENV === 'development';

// Development-specific features
if (IS_DEVELOPMENT) {
  // Enable detailed logging
  console.log('[SW] Development mode - verbose logging enabled');
  
  // Skip waiting for faster development
  self.addEventListener('install', () => {
    self.skipWaiting();
  });
  
  // Bypass cache for certain requests in development
  self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // Always fetch fresh in development for API routes
    if (url.pathname.startsWith('/api/') && IS_DEVELOPMENT) {
      event.respondWith(fetch(event.request));
      return;
    }
    
    // Continue with normal caching logic
  });
}

// Production optimizations
if (IS_PRODUCTION) {
  // Comprehensive error tracking
  self.addEventListener('error', (event) => {
    console.error('[SW] Error:', event.error);
    // Send to monitoring service
    reportError(event.error);
  });
  
  self.addEventListener('unhandledrejection', (event) => {
    console.error('[SW] Unhandled rejection:', event.reason);
    reportError(event.reason);
  });
}

// Cross-environment utilities
function reportError(error) {
  if (IS_PRODUCTION) {
    // Send to your error tracking service
    // e.g., Sentry, LogRocket, etc.
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
        timestamp: Date.now(),
        url: self.location.href
      })
    }).catch(() => {
      // Silently fail error reporting
    });
  }
}
```

### Performance Monitoring & Analytics

Implement comprehensive performance tracking:

```javascript
// sw.js - Performance monitoring
class ServiceWorkerAnalytics {
  constructor() {
    this.metrics = new Map();
    this.startTimes = new Map();
  }
  
  startTimer(requestId) {
    this.startTimes.set(requestId, performance.now());
  }
  
  endTimer(requestId, success = true, cacheHit = false) {
    const startTime = this.startTimes.get(requestId);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.recordMetric(requestId, duration, success, cacheHit);
      this.startTimes.delete(requestId);
    }
  }
  
  recordMetric(requestId, duration, success, cacheHit) {
    const metric = {
      requestId,
      duration: Math.round(duration),
      success,
      cacheHit,
      timestamp: Date.now()
    };
    
    this.metrics.set(requestId, metric);
    
    // Log slow requests
    if (duration > 1000) {
      console.warn(`[SW] Slow request (${duration}ms):`, requestId);
    }
    
    // Send to analytics (batch for efficiency)
    this.maybeSendMetrics();
  }
  
  maybeSendMetrics() {
    if (this.metrics.size >= 10) {
      this.sendMetrics();
    }
  }
  
  async sendMetrics() {
    if (this.metrics.size === 0) return;
    
    const metricsArray = Array.from(this.metrics.values());
    this.metrics.clear();
    
    try {
      await fetch('/api/sw-metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics: metricsArray,
          serviceWorkerVersion: VERSION,
          timestamp: Date.now()
        })
      });
    } catch (error) {
      console.error('[SW] Failed to send metrics:', error);
    }
  }
}

const analytics = new ServiceWorkerAnalytics();

// Enhanced fetch handler with analytics
self.addEventListener('fetch', (event) => {
  const requestId = crypto.randomUUID();
  const url = new URL(event.request.url);
  
  // Skip analytics for certain requests
  if (url.pathname.startsWith('/api/sw-metrics')) {
    return;
  }
  
  analytics.startTimer(requestId);
  
  event.respondWith(
    (async () => {
      try {
        const response = await handleRequest(event.request);
        const cacheHit = response.headers.get('x-cache') === 'HIT';
        
        analytics.endTimer(requestId, response.ok, cacheHit);
        
        return response;
      } catch (error) {
        analytics.endTimer(requestId, false, false);
        throw error;
      }
    })()
  );
});

// Periodic metrics flush
setInterval(() => {
  analytics.sendMetrics();
}, 30000); // Send metrics every 30 seconds
```

### Security Headers & CSP

Configure security headers for Service Worker deployment:

```javascript
// next.config.js - Security headers
const nextConfig = {
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "connect-src 'self' https:",
              "font-src 'self' data:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; '),
          },
        ],
      },
    ];
  },
};
```

### Deployment Checklist

**Pre-deployment verification:**

1. **Service Worker Registration**
   - [ ] SW registration code in main app
   - [ ] Proper error handling for registration failures
   - [ ] Update notification mechanism implemented

2. **Cache Strategy**
   - [ ] Appropriate caching strategies for different resource types
   - [ ] Cache versioning based on build ID
   - [ ] Old cache cleanup implemented

3. **Offline Experience**
   - [ ] Offline page created and cached
   - [ ] Critical app shell resources pre-cached
   - [ ] Network failure fallbacks implemented

4. **Performance**
   - [ ] Performance monitoring implemented
   - [ ] Critical resources prioritized
   - [ ] Large resources handled with background fetch

5. **Security**
   - [ ] HTTPS enabled (required for Service Workers)
   - [ ] Proper CSP headers configured
   - [ ] Input validation in Service Worker

6. **Browser Compatibility**
   - [ ] Feature detection implemented
   - [ ] Graceful fallbacks for unsupported browsers
   - [ ] Progressive enhancement approach

**Post-deployment monitoring:**

```javascript
// Client-side deployment monitoring
function monitorServiceWorkerDeployment() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[Client] Service Worker updated');
      
      // Track deployment success
      if (typeof gtag !== 'undefined') {
        gtag('event', 'sw_updated', {
          custom_map: { version: VERSION }
        });
      }
    });
    
    // Monitor Service Worker errors
    navigator.serviceWorker.addEventListener('error', (error) => {
      console.error('[Client] Service Worker error:', error);
      
      // Report critical errors
      if (typeof gtag !== 'undefined') {
        gtag('event', 'sw_error', {
          error_message: error.message
        });
      }
    });
  }
}

// Initialize monitoring
monitorServiceWorkerDeployment();
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Service Worker Not Registering

**Problem**: Service Worker fails to register or doesn't activate.

**Solutions**:

```javascript
// Enhanced registration with detailed error handling
async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.warn('[SW] Service Workers not supported');
    return false;
  }

  try {
    console.log('[SW] Attempting registration...');
    
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });

    console.log('[SW] Registration successful:', registration);

    // Wait for Service Worker to be ready
    const activeWorker = await navigator.serviceWorker.ready;
    console.log('[SW] Service Worker ready:', activeWorker);

    return registration;
  } catch (error) {
    console.error('[SW] Registration failed:', error);
    
    // Detailed error analysis
    if (error.name === 'SecurityError') {
      console.error('[SW] Security error - check HTTPS and Service Worker scope');
    } else if (error.name === 'TypeError') {
      console.error('[SW] Network error - check Service Worker file exists');
    }
    
    return false;
  }
}

// Check registration status
function checkServiceWorkerStatus() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      console.log('[SW] Current registrations:', registrations.length);
      
      registrations.forEach((reg, index) => {
        console.log(`[SW] Registration ${index}:`, {
          scope: reg.scope,
          active: !!reg.active,
          installing: !!reg.installing,
          waiting: !!reg.waiting
        });
      });
    });
  }
}
```

**Common causes**:
- Service Worker file not found (404 error)
- HTTPS not enabled in production
- Incorrect scope configuration
- Syntax errors in Service Worker file

#### 2. Service Worker Not Updating

**Problem**: New Service Worker versions don't activate or take control.

**Solutions**:

```javascript
// Client-side update handling
function handleServiceWorkerUpdate() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SW] New Service Worker took control');
      
      // Show user notification
      showUpdateNotification('App updated! Refresh to see changes.');
    });

    // Check for updates periodically
    setInterval(() => {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(reg => reg.update());
      });
    }, 60000); // Check every minute
  }
}

// Force update in development
if (process.env.NODE_ENV === 'development') {
  self.addEventListener('install', (event) => {
    console.log('[SW] Development mode - skipping waiting');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('[SW] Development mode - claiming clients');
    event.waitUntil(self.clients.claim());
  });
}

// Production update with user confirmation
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Received skip waiting message');
    self.skipWaiting();
  }
});

// Client-side update confirmation
function promptForUpdate() {
  if (confirm('A new version is available. Update now?')) {
    // Tell Service Worker to skip waiting
    navigator.serviceWorker.controller?.postMessage({
      type: 'SKIP_WAITING'
    });
  }
}
```

#### 3. Cache Issues

**Problem**: Resources not caching properly or cache not being used.

**Solutions**:

```javascript
// Debug cache operations
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  console.log(`[SW] Intercepting: ${event.request.method} ${url.pathname}`);
  
  event.respondWith(
    (async () => {
      try {
        // Check cache first
        const cachedResponse = await caches.match(event.request);
        
        if (cachedResponse) {
          console.log(`[SW] ✅ Cache HIT: ${url.pathname}`);
          
          // Add cache indicator header
          const response = cachedResponse.clone();
          response.headers.set('X-Cache', 'HIT');
          return response;
        }
        
        console.log(`[SW] ❌ Cache MISS: ${url.pathname}`);
        
        // Fetch from network
        const networkResponse = await fetch(event.request);
        
        // Cache successful responses
        if (networkResponse.ok) {
          const cache = await caches.open('runtime-cache-v1');
          console.log(`[SW] 💾 Caching: ${url.pathname}`);
          cache.put(event.request, networkResponse.clone());
        }
        
        return networkResponse;
      } catch (error) {
        console.error(`[SW] ❌ Fetch failed for ${url.pathname}:`, error);
        
        // Try to return cached version as fallback
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          console.log(`[SW] 🆘 Fallback to cache: ${url.pathname}`);
          return cachedResponse;
        }
        
        throw error;
      }
    })()
  );
});

// Cache inspection utilities
async function inspectCaches() {
  const cacheNames = await caches.keys();
  console.log('[SW] Available caches:', cacheNames);
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    console.log(`[SW] Cache "${cacheName}" contains ${requests.length} entries:`);
    
    requests.slice(0, 5).forEach(request => {
      console.log(`  - ${request.url}`);
    });
    
    if (requests.length > 5) {
      console.log(`  ... and ${requests.length - 5} more`);
    }
  }
}

// Clear specific cache
async function clearCache(cacheName) {
  const deleted = await caches.delete(cacheName);
  console.log(`[SW] Cache "${cacheName}" ${deleted ? 'deleted' : 'not found'}`);
}
```

#### 4. HTTPS and Security Issues

**Problem**: Service Worker fails due to security restrictions.

**Solutions**:

```javascript
// Environment-aware registration
function secureServiceWorkerRegistration() {
  const isLocalhost = location.hostname === 'localhost' || 
                     location.hostname === '127.0.0.1' ||
                     location.hostname === '[::1]';
  
  const isHTTPS = location.protocol === 'https:';
  
  if (isLocalhost || isHTTPS) {
    console.log('[SW] Secure context detected, registering Service Worker');
    registerServiceWorker();
  } else {
    console.warn('[SW] Service Worker requires HTTPS in production');
    showHTTPSWarning();
  }
}

function showHTTPSWarning() {
  const banner = document.createElement('div');
  banner.innerHTML = `
    <div style="background: #ff6b35; color: white; padding: 16px; text-align: center; position: fixed; top: 0; left: 0; right: 0; z-index: 9999;">
      <strong>HTTPS Required:</strong> Service Worker features require HTTPS for security.
      <button onclick="this.parentElement.remove()" style="float: right; background: none; border: 1px solid white; color: white; padding: 4px 8px; cursor: pointer;">×</button>
    </div>
  `;
  document.body.prepend(banner);
}
```

#### 5. Scope and Path Issues

**Problem**: Service Worker doesn't intercept requests from expected paths.

**Solutions**:

```javascript
// Verify and debug scope issues
async function debugServiceWorkerScope() {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    
    registrations.forEach((registration, index) => {
      console.log(`[SW] Registration ${index}:`);
      console.log(`  Scope: ${registration.scope}`);
      console.log(`  Active: ${!!registration.active}`);
      
      if (registration.active) {
        console.log(`  Script URL: ${registration.active.scriptURL}`);
      }
    });
    
    // Check current page scope coverage
    const currentUrl = location.href;
    const coveredByWorker = registrations.some(reg => 
      currentUrl.startsWith(reg.scope)
    );
    
    console.log(`[SW] Current page (${currentUrl}) covered: ${coveredByWorker}`);
  }
}

// Fix scope issues
navigator.serviceWorker.register('/sw.js', {
  scope: '/' // Explicit scope - must be at or below SW file location
}).then(registration => {
  console.log('[SW] Registered with scope:', registration.scope);
}).catch(error => {
  if (error.message.includes('scope')) {
    console.error('[SW] Scope error - Service Worker file must be at same level or above desired scope');
  }
});
```

### Advanced Debugging Techniques

#### Service Worker DevTools Debugging

```javascript
// Enhanced logging for debugging
const DEBUG = process.env.NODE_ENV === 'development';

function debugLog(message, data = null) {
  if (DEBUG) {
    const timestamp = new Date().toISOString();
    console.log(`[SW:${timestamp}] ${message}`, data || '');
  }
}

// Service Worker lifecycle debugging
self.addEventListener('install', (event) => {
  debugLog('Install event triggered');
  
  event.waitUntil(
    (async () => {
      debugLog('Starting installation...');
      
      try {
        const cache = await caches.open('app-shell-v1');
        const urls = ['/', '/offline.html', '/manifest.json'];
        
        await cache.addAll(urls);
        debugLog('App shell cached successfully');
        
        if (DEBUG) {
          self.skipWaiting();
          debugLog('Skipping waiting in development mode');
        }
      } catch (error) {
        debugLog('Installation failed:', error);
        throw error;
      }
    })()
  );
});

self.addEventListener('activate', (event) => {
  debugLog('Activate event triggered');
  
  event.waitUntil(
    (async () => {
      debugLog('Starting activation...');
      
      // Clean up old caches
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter(name => 
        name.startsWith('app-shell-') && name !== 'app-shell-v1'
      );
      
      if (oldCaches.length > 0) {
        debugLog('Cleaning up old caches:', oldCaches);
        await Promise.all(oldCaches.map(name => caches.delete(name)));
      }
      
      if (DEBUG) {
        await self.clients.claim();
        debugLog('Claimed all clients in development mode');
      }
      
      debugLog('Activation completed');
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  debugLog(`Fetch: ${event.request.method} ${url.pathname}`);
});
```

#### Network Debugging

```javascript
// Network request debugging
self.addEventListener('fetch', (event) => {
  const startTime = performance.now();
  const url = new URL(event.request.url);
  
  event.respondWith(
    (async () => {
      try {
        debugLog(`Starting fetch for: ${url.pathname}`);
        
        const response = await handleRequest(event.request);
        const duration = performance.now() - startTime;
        
        debugLog(`Fetch completed for: ${url.pathname} (${Math.round(duration)}ms)`, {
          status: response.status,
          fromCache: response.headers.get('x-cache') === 'HIT',
          size: response.headers.get('content-length')
        });
        
        return response;
      } catch (error) {
        const duration = performance.now() - startTime;
        debugLog(`Fetch failed for: ${url.pathname} (${Math.round(duration)}ms)`, error);
        throw error;
      }
    })()
  );
});
```

### Testing Service Workers

#### Unit Testing

```javascript
// Test Service Worker functionality
describe('Service Worker', () => {
  let mockSelf;
  let mockCaches;
  
  beforeEach(() => {
    // Mock Service Worker global scope
    mockSelf = {
      addEventListener: jest.fn(),
      registration: {
        showNotification: jest.fn()
      },
      clients: {
        matchAll: jest.fn().mockResolvedValue([]),
        claim: jest.fn().mockResolvedValue(),
        openWindow: jest.fn().mockResolvedValue()
      }
    };
    
    mockCaches = {
      open: jest.fn().mockResolvedValue({
        match: jest.fn(),
        put: jest.fn(),
        addAll: jest.fn()
      }),
      match: jest.fn(),
      keys: jest.fn().mockResolvedValue([]),
      delete: jest.fn()
    };
    
    global.self = mockSelf;
    global.caches = mockCaches;
  });
  
  test('should register event listeners', () => {
    require('./sw.js');
    
    expect(mockSelf.addEventListener).toHaveBeenCalledWith('install', expect.any(Function));
    expect(mockSelf.addEventListener).toHaveBeenCalledWith('activate', expect.any(Function));
    expect(mockSelf.addEventListener).toHaveBeenCalledWith('fetch', expect.any(Function));
  });
  
  test('should cache app shell on install', async () => {
    const cache = {
      addAll: jest.fn().mockResolvedValue()
    };
    mockCaches.open.mockResolvedValue(cache);
    
    require('./sw.js');
    
    // Simulate install event
    const installHandler = mockSelf.addEventListener.mock.calls
      .find(call => call[0] === 'install')[1];
    
    const event = {
      waitUntil: jest.fn()
    };
    
    installHandler(event);
    
    expect(event.waitUntil).toHaveBeenCalled();
    expect(mockCaches.open).toHaveBeenCalledWith(expect.stringContaining('app-shell'));
  });
});
```

#### Integration Testing

```javascript
// Integration test for Service Worker registration
async function testServiceWorkerIntegration() {
  console.log('[Test] Starting Service Worker integration test...');
  
  if (!('serviceWorker' in navigator)) {
    console.error('[Test] ❌ Service Worker not supported');
    return false;
  }
  
  try {
    // 1. Test registration
    console.log('[Test] 1. Testing registration...');
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('[Test] ✅ Registration successful');
    
    // 2. Wait for Service Worker to be active
    console.log('[Test] 2. Waiting for Service Worker to activate...');
    await new Promise((resolve) => {
      if (registration.active) {
        resolve();
      } else {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated') {
              resolve();
            }
          });
        });
      }
    });
    console.log('[Test] ✅ Service Worker activated');
    
    // 3. Test caching
    console.log('[Test] 3. Testing cache functionality...');
    const cache = await caches.open('test-cache');
    await cache.add('/');
    const cachedResponse = await cache.match('/');
    if (cachedResponse) {
      console.log('[Test] ✅ Cache working');
    } else {
      throw new Error('Cache test failed');
    }
    
    // 4. Test fetch interception
    console.log('[Test] 4. Testing fetch interception...');
    const response = await fetch('/test-endpoint');
    console.log('[Test] ✅ Fetch interception working');
    
    // 5. Clean up
    await caches.delete('test-cache');
    console.log('[Test] ✅ All tests passed!');
    
    return true;
  } catch (error) {
    console.error('[Test] ❌ Test failed:', error);
    return false;
  }
}

// Run integration test
testServiceWorkerIntegration().then(success => {
  if (success) {
    console.log('[Test] 🎉 Service Worker integration test completed successfully');
  } else {
    console.log('[Test] 💥 Service Worker integration test failed');
  }
});
```

#### Performance Testing

```javascript
// Performance testing utilities
class ServiceWorkerPerformanceTester {
  constructor() {
    this.metrics = [];
  }
  
  async testCachePerformance() {
    console.log('[Perf] Testing cache performance...');
    
    const testUrls = [
      '/',
      '/dashboard',
      '/profile',
      '/api/user',
      '/api/data'
    ];
    
    // Test cache miss (first request)
    const cacheMissResults = await this.measureRequests(testUrls, 'cache-miss');
    
    // Test cache hit (second request)
    const cacheHitResults = await this.measureRequests(testUrls, 'cache-hit');
    
    this.compareResults(cacheMissResults, cacheHitResults);
  }
  
  async measureRequests(urls, scenario) {
    const results = [];
    
    for (const url of urls) {
      const start = performance.now();
      
      try {
        const response = await fetch(url);
        const end = performance.now();
        
        results.push({
          url,
          duration: end - start,
          status: response.status,
          cacheHit: response.headers.get('x-cache') === 'HIT'
        });
      } catch (error) {
        results.push({
          url,
          duration: -1,
          error: error.message
        });
      }
    }
    
    console.log(`[Perf] ${scenario} results:`, results);
    return results;
  }
  
  compareResults(cacheMiss, cacheHit) {
    console.log('[Perf] Performance comparison:');
    
    const avgCacheMiss = cacheMiss.reduce((sum, r) => sum + r.duration, 0) / cacheMiss.length;
    const avgCacheHit = cacheHit.reduce((sum, r) => sum + r.duration, 0) / cacheHit.length;
    
    const improvement = ((avgCacheMiss - avgCacheHit) / avgCacheMiss * 100).toFixed(1);
    
    console.log(`  Cache Miss Average: ${avgCacheMiss.toFixed(2)}ms`);
    console.log(`  Cache Hit Average: ${avgCacheHit.toFixed(2)}ms`);
    console.log(`  Performance Improvement: ${improvement}%`);
    
    if (improvement > 50) {
      console.log('[Perf] ✅ Excellent cache performance!');
    } else if (improvement > 20) {
      console.log('[Perf] ✅ Good cache performance');
    } else {
      console.log('[Perf] ⚠️ Cache performance could be improved');
    }
  }
}

// Run performance tests
const perfTester = new ServiceWorkerPerformanceTester();
perfTester.testCachePerformance();
```

### Browser-Specific Issues

#### Chrome DevTools Integration

```javascript
// Chrome DevTools debugging enhancements
if (typeof chrome !== 'undefined' && chrome.runtime) {
  // Enhanced DevTools integration
  self.addEventListener('message', (event) => {
    if (event.data?.source === 'devtools') {
      switch (event.data.type) {
        case 'INSPECT_CACHES':
          inspectCaches().then(data => {
            event.ports[0].postMessage({ type: 'CACHE_DATA', data });
          });
          break;
        case 'CLEAR_CACHE':
          clearCache(event.data.cacheName).then(() => {
            event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
          });
          break;
      }
    }
  });
}
```

#### Firefox Debugging

```javascript
// Firefox-specific debugging
if (navigator.userAgent.includes('Firefox')) {
  // Firefox has different DevTools integration
  console.log('[SW] Firefox detected - using Firefox-optimized debugging');
  
  // Firefox-specific performance monitoring
  self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
      console.log('[SW] Firefox navigation request:', event.request.url);
    }
  });
}
```

#### Safari/iOS Debugging

```javascript
// Safari/iOS specific handling
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

if (isSafari || isIOS) {
  console.log('[SW] Safari/iOS detected - limited Service Worker features');
  
  // Safari has limited Service Worker support
  // Focus on essential caching strategies
  self.addEventListener('fetch', (event) => {
    // Simplified handling for Safari
    if (event.request.method === 'GET') {
      event.respondWith(
        caches.match(event.request)
          .then(response => response || fetch(event.request))
      );
    }
  });
}

## Next Steps

After implementing this comprehensive Service Worker foundation, you can enhance your PWA with advanced capabilities:

### 1. Advanced Capabilities Implementation
- **[Push Notifications](../hooks/use-push-notifications)**: Add real-time messaging with VAPID keys and subscription management
- **[Background Sync](../hooks/use-background-sync)**: Implement robust offline data synchronization queues
- **[Periodic Background Sync](./periodic-background-sync)**: Set up automatic content updates (experimental)
- **[Background Fetch](../hooks/use-background-fetch)**: Handle large file downloads that continue when app is closed

### 2. Enhanced PWA Features
- **[Protocol Handlers](./protocol-handlers)**: Register your PWA to handle custom URL schemes and deep linking
- **[App Badging](./app-badging)**: Display notification badges on your PWA icon
- **[File System Access](./file-system-access)**: Enable direct file system integration for desktop-like experiences
- **[Window Management](./window-management)**: Control multiple windows and display positioning

### 3. Performance & Optimization
- **[Advanced Fetch & Caching](./advanced-fetch-caching)**: Implement sophisticated request optimization and multi-strategy caching
- **[Performance Guide](./performance-guide)**: Optimize loading times and resource delivery
- **Cache Analytics**: Monitor cache hit rates, loading times, and Service Worker performance
- **Network Strategies**: Fine-tune caching strategies based on user behavior and usage patterns

### 4. Production Readiness
- **Security Hardening**: Implement CSP headers, input validation, and secure HTTPS deployment
- **Error Monitoring**: Set up comprehensive error tracking and reporting
- **A/B Testing**: Test different caching strategies and Service Worker configurations
- **Progressive Enhancement**: Ensure graceful fallbacks for unsupported browsers

### 5. Testing & Quality Assurance
- **Unit Testing**: Comprehensive test coverage for Service Worker functionality
- **Integration Testing**: End-to-end PWA feature testing
- **Performance Testing**: Cache performance benchmarking and optimization
- **Cross-browser Testing**: Ensure compatibility across different browsers and devices

### 6. Team Development
- **Documentation**: Keep Service Worker implementation docs updated as features evolve
- **Code Reviews**: Establish Service Worker-specific code review guidelines
- **Deployment Pipelines**: Integrate Service Worker validation into CI/CD processes
- **Monitoring Dashboards**: Set up real-time PWA performance monitoring

## Related PWA Guides

### Advanced Service Worker Capabilities
- [Advanced Fetch & Caching Patterns](./advanced-fetch-caching) - Sophisticated caching strategies and request optimization
- [Periodic Background Sync](./periodic-background-sync) - Automatic content updates in the background
- [PWA Protocol Handlers](./protocol-handlers) - Handle custom URL schemes and deep linking

### PWA Features & APIs
- [PWA App Badging](./app-badging) - Display notification badges on app icons
- [PWA Window Management](./window-management) - Multi-window and display control
- [PWA File System Access](./file-system-access) - Direct file system integration
- [PWA Web Share Target](./web-share-target) - Receive shared content from other apps

### Core Guides
- [Performance Optimization](./performance-guide) - Network performance and loading optimization
- [Security Best Practices](./security-guide) - Secure PWA implementation patterns
- [Accessibility Guide](./accessibility-guide) - Creating inclusive PWA experiences

### Hooks & Components
- [useFeatureDetection](../hooks/use-feature-detection) - Detect PWA capabilities
- [usePlatform](../hooks/use-platform) - Platform-specific functionality
- [useGeolocation](../hooks/use-geolocation) - Location services integration
- [useCamera](../hooks/use-camera) - Camera access and image capture
- [useBarcodeScanner](../hooks/use-barcode-scanner) - QR code and barcode scanning

This Service Worker implementation provides a robust foundation for building production-ready PWAs with excellent offline support, efficient caching, and advanced background capabilities.