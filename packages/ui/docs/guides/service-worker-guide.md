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

Service Workers enable powerful background capabilities that enhance the user experience even when the app isn't actively being used.

### Push Notifications

Enable real-time communication with users through push notifications:

```javascript
// In your Service Worker (sw.js)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore this new world',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    // Open specific page
    event.waitUntil(
      clients.openWindow('/explore')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
```

**Learn more**: [Push Notifications Guide](../hooks/use-push-notifications)

### Background Sync

Ensure data synchronization even when offline:

```javascript
// Register background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Get pending data from IndexedDB
    const pendingData = await getPendingSyncData();
    
    for (const data of pendingData) {
      await fetch('/api/sync', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Remove from pending sync after successful upload
      await removePendingSyncData(data.id);
    }
  } catch (error) {
    console.error('Background sync failed:', error);
    // Will retry on next sync event
  }
}
```

**Learn more**: [Background Sync Guide](../hooks/use-background-sync)

### Periodic Background Sync

Keep content fresh with periodic updates:

```javascript
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(updateContent());
  }
});

async function updateContent() {
  try {
    const response = await fetch('/api/content/latest');
    const content = await response.json();
    
    // Update cache with fresh content
    const cache = await caches.open('content-cache');
    await cache.put('/api/content/latest', new Response(JSON.stringify(content)));
    
    // Notify user of new content if app is open
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'CONTENT_UPDATED',
        payload: content
      });
    });
  } catch (error) {
    console.error('Periodic sync failed:', error);
  }
}
```

**Learn more**: [Periodic Background Sync Guide](../hooks/use-periodic-sync)

### Background Fetch

Handle large downloads that continue even if the app is closed:

```javascript
self.addEventListener('backgroundfetch', (event) => {
  if (event.tag === 'large-download') {
    event.waitUntil(
      (async () => {
        const bgFetch = await self.registration.backgroundFetch.fetch(
          'large-download',
          '/api/large-file',
          {
            icons: [{ src: '/icons/download.png', sizes: '256x256', type: 'image/png' }],
            title: 'Downloading large file...',
            downloadTotal: 50 * 1024 * 1024 // 50MB
          }
        );
      })()
    );
  }
});

self.addEventListener('backgroundfetchsuccess', (event) => {
  console.log('[SW]: Background Fetch Success', event.tag);
  
  event.waitUntil(
    (async () => {
      // Process the downloaded content
      const cache = await caches.open('downloads');
      const records = await event.registration.matchAll();
      
      for (const record of records) {
        const response = await record.responseReady;
        await cache.put(record.request, response);
      }
    })()
  );
});
```

**Learn more**: [Background Fetch Guide](../hooks/use-background-fetch)

## Production Deployment

### Build Integration

Ensure your Service Worker is properly built and deployed:

```javascript
// next.config.js (Next.js)
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Copy Service Worker to public directory during build
  async rewrites() {
    return [
      {
        source: '/sw.js',
        destination: '/_next/static/sw.js',
      },
    ];
  },
  
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add Service Worker to build process
    if (!isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.BUILD_ID': JSON.stringify(buildId),
          'process.env.CACHE_NAME': JSON.stringify(`my-pwa-${buildId}`),
        })
      );
    }
    
    return config;
  },
};

module.exports = nextConfig;
```

### Cache Versioning Strategy

Implement automatic cache versioning:

```javascript
// Use build-time variables for cache names
const BUILD_ID = process.env.BUILD_ID || 'dev';
const CACHE_NAME = `my-pwa-${BUILD_ID}`;
const RUNTIME_CACHE = `runtime-${BUILD_ID}`;

// This ensures new deployments create new caches
// and old caches are automatically cleaned up
```

### Performance Monitoring

Monitor Service Worker performance:

```javascript
// Add performance tracking to your Service Worker
self.addEventListener('fetch', (event) => {
  const startTime = performance.now();
  
  event.respondWith(
    handleRequest(event.request).then((response) => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Log performance metrics
      console.log(`[SW] ${event.request.url}: ${duration}ms`);
      
      // Send to analytics service
      if (duration > 1000) { // Log slow requests
        self.registration.sync.register('performance-log');
      }
      
      return response;
    })
  );
});
```

## Troubleshooting

### Common Issues and Solutions

**1. Service Worker not updating**
```javascript
// Force update in development
if (process.env.NODE_ENV === 'development') {
  self.addEventListener('install', () => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', () => {
    self.clients.claim();
  });
}
```

**2. Cache not working**
```javascript
// Debug cache issues
self.addEventListener('fetch', (event) => {
  console.log('[SW] Intercepting:', event.request.url);
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('[SW] Cache hit:', event.request.url);
      } else {
        console.log('[SW] Cache miss:', event.request.url);
      }
      return response || fetch(event.request);
    })
  );
});
```

**3. HTTPS requirement**
Service Workers require HTTPS in production. For development:
```javascript
// Development setup
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  // Service Worker will work on localhost
  registerServiceWorker();
} else if (location.protocol === 'https:') {
  // Only register on HTTPS in production
  registerServiceWorker();
} else {
  console.warn('Service Worker requires HTTPS');
}
```

### Testing Service Workers

```javascript
// Test Service Worker registration
async function testServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('✅ Service Worker registered');
      
      // Test cache
      const cache = await caches.open('test-cache');
      await cache.add('/');
      console.log('✅ Cache working');
      
      // Test offline
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'CACHE_UPDATED') {
          console.log('✅ Cache updated');
        }
      });
      
    } catch (error) {
      console.error('❌ Service Worker test failed:', error);
    }
  } else {
    console.error('❌ Service Worker not supported');
  }
}
```

## Next Steps

After implementing this Service Worker foundation:

1. **Add Push Notifications**: Implement real-time messaging
2. **Enable Background Sync**: Ensure data persistence when offline  
3. **Implement Periodic Sync**: Keep content automatically updated
4. **Add Background Fetch**: Handle large downloads
5. **Monitor Performance**: Track cache hit rates and loading times
6. **Test Thoroughly**: Test offline scenarios, updates, and edge cases

## Related Guides

- [Push Notifications Implementation](../hooks/use-push-notifications)
- [Background Sync Guide](../hooks/use-background-sync)
- [Periodic Background Sync](../hooks/use-periodic-sync)
- [Background Fetch Guide](../hooks/use-background-fetch)
- [PWA Feature Detection](../hooks/use-feature-detection)
- [Platform Detection](../hooks/use-platform)

This Service Worker implementation provides a robust foundation for building production-ready PWAs with excellent offline support, efficient caching, and advanced background capabilities.