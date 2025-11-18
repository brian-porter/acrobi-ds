/**
 * @fileoverview Advanced Caching Service Worker for Epic 67
 * Production-ready AAE Service Worker with multi-strategy caching
 *
 * Features:
 * - Cache First strategy for static assets
 * - Network First strategy for critical data
 * - Stale-While-Revalidate for non-critical data
 * - Offline fallback with custom pages
 * - Cache versioning and cleanup
 * - Background sync and update notifications
 */

// Cache configuration
const CACHE_VERSION = 'v1.0.0';
const CACHE_PREFIX = 'acrobi-aae';
const STATIC_CACHE = `${CACHE_PREFIX}-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `${CACHE_PREFIX}-dynamic-${CACHE_VERSION}`;
const API_CACHE = `${CACHE_PREFIX}-api-${CACHE_VERSION}`;

// Cache expiration settings (in milliseconds)
const CACHE_EXPIRATION = {
  static: 30 * 24 * 60 * 60 * 1000, // 30 days
  dynamic: 7 * 24 * 60 * 60 * 1000, // 7 days
  api: 60 * 60 * 1000, // 1 hour
};

// Pre-cache assets - customize this list based on your app
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  // Add your critical assets here
  '/css/main.css',
  '/js/main.js',
];

// Route patterns for different caching strategies
const ROUTE_PATTERNS = {
  // Cache First - Static assets
  static: [
    /\.(?:css|js|woff2?|ttf|eot|otf)$/,
    /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
    /\/static\//,
    /\/assets\//,
    /\/_next\/static\//,
  ],

  // Network First - Critical API endpoints
  networkFirst: [
    /\/api\/auth\//,
    /\/api\/user\/profile/,
    /\/api\/config/,
    /\/api\/health/,
  ],

  // Stale-While-Revalidate - Non-critical content
  staleWhileRevalidate: [
    /\/api\/posts\//,
    /\/api\/content\//,
    /\/api\/search/,
    /\/api\/recommendations/,
    /\.(?:json)$/,
  ],
};

// Utility functions
class CacheManager {
  /**
   * Check if a request matches any pattern in the given array
   */
  static matchesPattern(url: string, patterns: RegExp[]): boolean {
    return patterns.some(pattern => pattern.test(url));
  }

  /**
   * Get cache name based on request type
   */
  static getCacheName(request: Request): string {
    if (this.matchesPattern(request.url, ROUTE_PATTERNS.static)) {
      return STATIC_CACHE;
    }

    if (
      this.matchesPattern(request.url, [
        ...ROUTE_PATTERNS.networkFirst,
        ...ROUTE_PATTERNS.staleWhileRevalidate,
      ])
    ) {
      return API_CACHE;
    }

    return DYNAMIC_CACHE;
  }

  /**
   * Check if cached response is still valid
   */
  static isCacheValid(response: Response, maxAge: number): boolean {
    const cachedTime = response.headers.get('sw-cached-time');
    if (!cachedTime) return false;

    const age = Date.now() - parseInt(cachedTime, 10);
    return age < maxAge;
  }

  /**
   * Add timestamp header to response before caching
   */
  static addTimestamp(response: Response): Response {
    const responseWithTimestamp = response.clone();
    responseWithTimestamp.headers.set('sw-cached-time', Date.now().toString());
    return responseWithTimestamp;
  }

  /**
   * Clean up old caches
   */
  static async cleanupOldCaches(): Promise<void> {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(
      name =>
        name.startsWith(CACHE_PREFIX) &&
        ![STATIC_CACHE, DYNAMIC_CACHE, API_CACHE].includes(name)
    );

    await Promise.all(oldCaches.map(cacheName => caches.delete(cacheName)));

    console.log(`Cleaned up ${oldCaches.length} old caches`);
  }

  /**
   * Prune cache entries by age
   */
  static async pruneCacheByAge(
    cacheName: string,
    maxAge: number
  ): Promise<void> {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();

    const deletePromises = requests.map(async request => {
      const response = await cache.match(request);
      if (response && !this.isCacheValid(response, maxAge)) {
        return cache.delete(request);
      }
      return false;
    });

    const deleted = await Promise.all(deletePromises);
    const deletedCount = deleted.filter(Boolean).length;

    if (deletedCount > 0) {
      console.log(`Pruned ${deletedCount} expired entries from ${cacheName}`);
    }
  }
}

// Caching strategies
class CachingStrategies {
  /**
   * Cache First Strategy
   * Good for static assets that rarely change
   */
  static async cacheFirst(request: Request): Promise<Response> {
    const cacheName = CacheManager.getCacheName(request);
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      // Check if cached response is still valid for API cache
      if (cacheName === API_CACHE) {
        const maxAge = CACHE_EXPIRATION.api;
        if (CacheManager.isCacheValid(cachedResponse, maxAge)) {
          return cachedResponse;
        }
      } else {
        return cachedResponse;
      }
    }

    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        const responseToCache = CacheManager.addTimestamp(networkResponse);
        cache.put(request, responseToCache.clone());
        return networkResponse;
      }

      // Return cached response even if expired when network fails
      return cachedResponse || new Response('Network error', { status: 408 });
    } catch (error) {
      console.error('Cache First strategy failed:', error);
      return cachedResponse || new Response('Network error', { status: 408 });
    }
  }

  /**
   * Network First Strategy
   * Good for critical data that must be up-to-date
   */
  static async networkFirst(request: Request): Promise<Response> {
    const cacheName = CacheManager.getCacheName(request);
    const cache = await caches.open(cacheName);

    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        const responseToCache = CacheManager.addTimestamp(networkResponse);
        cache.put(request, responseToCache.clone());
        return networkResponse;
      }
    } catch (error) {
      console.warn('Network request failed, falling back to cache:', error);
    }

    // Fallback to cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response('No cached data available', { status: 503 });
  }

  /**
   * Stale While Revalidate Strategy
   * Good for non-critical data that benefits from instant loading
   */
  static async staleWhileRevalidate(request: Request): Promise<Response> {
    const cacheName = CacheManager.getCacheName(request);
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    // Always try to update in the background
    const networkPromise = fetch(request)
      .then(networkResponse => {
        if (networkResponse.ok) {
          const responseToCache = CacheManager.addTimestamp(networkResponse);
          cache.put(request, responseToCache.clone());
        }
        return networkResponse;
      })
      .catch(error => {
        console.warn('Background revalidation failed:', error);
        return null;
      });

    // Return cached response immediately if available
    if (cachedResponse) {
      // Don't await the network promise - let it run in background
      networkPromise;
      return cachedResponse;
    }

    // If no cache, wait for network
    try {
      const networkResponse = await networkPromise;
      return networkResponse || new Response('Network error', { status: 408 });
    } catch (error) {
      return new Response('Network error', { status: 408 });
    }
  }
}

// Service Worker event handlers
declare const self: ServiceWorkerGlobalScope;

/**
 * Install Event
 * Pre-cache critical assets
 */
self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('Service Worker installing...');

  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(STATIC_CACHE);
        await cache.addAll(
          PRECACHE_ASSETS.map(url => new Request(url, { cache: 'reload' }))
        );
        console.log('Pre-cached assets successfully');

        // Skip waiting to activate immediately
        await self.skipWaiting();
      } catch (error) {
        console.error('Pre-caching failed:', error);
        throw error;
      }
    })()
  );
});

/**
 * Activate Event
 * Clean up old caches and claim clients
 */
self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service Worker activating...');

  event.waitUntil(
    (async () => {
      try {
        // Clean up old caches
        await CacheManager.cleanupOldCaches();

        // Prune expired entries
        await CacheManager.pruneCacheByAge(API_CACHE, CACHE_EXPIRATION.api);
        await CacheManager.pruneCacheByAge(
          DYNAMIC_CACHE,
          CACHE_EXPIRATION.dynamic
        );

        // Claim all clients immediately
        await self.clients.claim();

        console.log('Service Worker activated successfully');
      } catch (error) {
        console.error('Service Worker activation failed:', error);
      }
    })()
  );
});

/**
 * Fetch Event
 * Apply appropriate caching strategy based on request
 */
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip extension requests
  if (
    url.protocol === 'chrome-extension:' ||
    url.protocol === 'moz-extension:'
  ) {
    return;
  }

  // Handle different request types
  event.respondWith(
    (async () => {
      try {
        // Static assets - Cache First
        if (CacheManager.matchesPattern(request.url, ROUTE_PATTERNS.static)) {
          return await CachingStrategies.cacheFirst(request);
        }

        // Critical API endpoints - Network First
        if (
          CacheManager.matchesPattern(request.url, ROUTE_PATTERNS.networkFirst)
        ) {
          return await CachingStrategies.networkFirst(request);
        }

        // Non-critical content - Stale While Revalidate
        if (
          CacheManager.matchesPattern(
            request.url,
            ROUTE_PATTERNS.staleWhileRevalidate
          )
        ) {
          return await CachingStrategies.staleWhileRevalidate(request);
        }

        // Navigation requests - handle offline fallback
        if (request.mode === 'navigate') {
          try {
            const networkResponse = await fetch(request);
            if (networkResponse.ok) {
              // Cache successful navigation responses
              const cache = await caches.open(DYNAMIC_CACHE);
              const responseToCache =
                CacheManager.addTimestamp(networkResponse);
              cache.put(request, responseToCache.clone());
            }
            return networkResponse;
          } catch (error) {
            // Return cached version or offline page
            const cache = await caches.open(DYNAMIC_CACHE);
            const cachedResponse = await cache.match(request);

            if (cachedResponse) {
              return cachedResponse;
            }

            // Return offline page
            const offlineResponse = await cache.match('/offline.html');
            return offlineResponse || new Response('Offline', { status: 503 });
          }
        }

        // Default - try network first, fallback to cache
        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            const responseToCache = CacheManager.addTimestamp(networkResponse);
            cache.put(request, responseToCache.clone());
          }
          return networkResponse;
        } catch (error) {
          const cache = await caches.open(DYNAMIC_CACHE);
          const cachedResponse = await cache.match(request);
          return (
            cachedResponse || new Response('Network error', { status: 408 })
          );
        }
      } catch (error) {
        console.error('Fetch handler error:', error);
        return new Response('Service Worker error', { status: 500 });
      }
    })()
  );
});

/**
 * Background Sync Event
 * Handle background synchronization
 */
self.addEventListener('sync', (event: any) => {
  console.log('Background sync triggered:', event.tag);

  event.waitUntil(
    (async () => {
      try {
        switch (event.tag) {
          case 'cache-cleanup':
            await CacheManager.pruneCacheByAge(API_CACHE, CACHE_EXPIRATION.api);
            await CacheManager.pruneCacheByAge(
              DYNAMIC_CACHE,
              CACHE_EXPIRATION.dynamic
            );
            console.log('Cache cleanup sync completed');
            break;

          case 'user-data-sync':
            await syncUserData();
            console.log('User data sync completed');
            break;

          case 'form-submission':
            await syncFormSubmissions();
            console.log('Form submission sync completed');
            break;

          case 'offline-actions':
            await syncOfflineActions();
            console.log('Offline actions sync completed');
            break;

          case 'analytics-data':
            await syncAnalyticsData();
            console.log('Analytics data sync completed');
            break;

          default:
            console.warn('Unknown sync tag:', event.tag);
            break;
        }
      } catch (error) {
        console.error(`Background sync failed for tag "${event.tag}":`, error);
        // Re-throw error to trigger browser retry
        throw error;
      }
    })()
  );
});

/**
 * Background Sync Functions
 * Example implementations for different sync tasks
 */

/**
 * Sync user data from IndexedDB to backend
 */
async function syncUserData(): Promise<void> {
  // Example: Sync pending user profile updates
  const pendingData = await getFromIndexedDB('pendingUserData');

  if (pendingData && pendingData.length > 0) {
    for (const data of pendingData) {
      try {
        const response = await fetch('/api/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data.payload),
        });

        if (response.ok) {
          // Remove successfully synced data
          await removeFromIndexedDB('pendingUserData', data.id);
        } else {
          throw new Error(`Server responded with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Failed to sync user data item:', error);
        throw error; // Re-throw to trigger retry
      }
    }
  }
}

/**
 * Sync form submissions from IndexedDB to backend
 */
async function syncFormSubmissions(): Promise<void> {
  // Example: Sync pending form submissions
  const pendingForms = await getFromIndexedDB('pendingFormSubmissions');

  if (pendingForms && pendingForms.length > 0) {
    for (const form of pendingForms) {
      try {
        const response = await fetch(form.endpoint, {
          method: form.method || 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...form.headers,
          },
          body: JSON.stringify(form.data),
        });

        if (response.ok) {
          // Remove successfully synced form
          await removeFromIndexedDB('pendingFormSubmissions', form.id);

          // Notify clients of successful sync
          const clients = await self.clients.matchAll();
          clients.forEach(client => {
            client.postMessage({
              type: 'SYNC_SUCCESS',
              tag: 'form-submission',
              formId: form.id,
            });
          });
        } else {
          throw new Error(`Form sync failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Failed to sync form submission:', error);
        throw error; // Re-throw to trigger retry
      }
    }
  }
}

/**
 * Sync offline actions from IndexedDB to backend
 */
async function syncOfflineActions(): Promise<void> {
  // Example: Sync actions performed while offline
  const offlineActions = await getFromIndexedDB('offlineActions');

  if (offlineActions && offlineActions.length > 0) {
    for (const action of offlineActions) {
      try {
        const response = await fetch('/api/actions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: action.type,
            payload: action.payload,
            timestamp: action.timestamp,
          }),
        });

        if (response.ok) {
          // Remove successfully synced action
          await removeFromIndexedDB('offlineActions', action.id);
        } else {
          throw new Error(`Action sync failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Failed to sync offline action:', error);
        throw error; // Re-throw to trigger retry
      }
    }
  }
}

/**
 * Sync analytics data from IndexedDB to backend
 */
async function syncAnalyticsData(): Promise<void> {
  // Example: Sync analytics events collected while offline
  const analyticsEvents = await getFromIndexedDB('analyticsEvents');

  if (analyticsEvents && analyticsEvents.length > 0) {
    try {
      const response = await fetch('/api/analytics/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events: analyticsEvents }),
      });

      if (response.ok) {
        // Clear all synced analytics events
        await clearIndexedDBStore('analyticsEvents');
      } else {
        throw new Error(
          `Analytics sync failed with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error('Failed to sync analytics data:', error);
      throw error; // Re-throw to trigger retry
    }
  }
}

/**
 * IndexedDB helper functions
 * These would typically be imported from a separate utility module
 */
async function getFromIndexedDB(storeName: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AcrobiAAEDB', 1);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(storeName)) {
        resolve([]);
        return;
      }

      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => resolve(getAllRequest.result || []);
      getAllRequest.onerror = () => reject(getAllRequest.error);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

async function removeFromIndexedDB(storeName: string, id: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AcrobiAAEDB', 1);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const deleteRequest = store.delete(id);

      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject(deleteRequest.error);
    };
  });
}

async function clearIndexedDBStore(storeName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AcrobiAAEDB', 1);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const clearRequest = store.clear();

      clearRequest.onsuccess = () => resolve();
      clearRequest.onerror = () => reject(clearRequest.error);
    };
  });
}

/**
 * Message Event
 * Handle messages from the main thread
 */
self.addEventListener('message', (event: ExtendableMessageEvent) => {
  const { data } = event;

  if (data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (data?.type === 'GET_CACHE_STATUS') {
    event.waitUntil(
      (async () => {
        const cacheNames = await caches.keys();
        const cacheStatus = await Promise.all(
          cacheNames.map(async name => {
            const cache = await caches.open(name);
            const keys = await cache.keys();
            return { name, count: keys.length };
          })
        );

        event.ports[0]?.postMessage({
          type: 'CACHE_STATUS',
          caches: cacheStatus,
          version: CACHE_VERSION,
        });
      })()
    );
  }

  if (data?.type === 'CLEAR_CACHE') {
    event.waitUntil(
      (async () => {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter(name => name.startsWith(CACHE_PREFIX))
            .map(name => caches.delete(name))
        );

        event.ports[0]?.postMessage({
          type: 'CACHE_CLEARED',
        });
      })()
    );
  }
});

/**
 * Notification Click Event
 * Handle notification interactions
 */
self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close();

  const url = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clients => {
      // Check if there's already a window/tab open with the target URL
      for (const client of clients) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      // If not, open a new window/tab
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});

/**
 * Push Event
 * Handle push notifications
 */
self.addEventListener('push', (event: PushEvent) => {
  const options = {
    body: 'You have a new update!',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    tag: 'update-notification',
    requireInteraction: false,
    data: {
      url: '/',
    },
  };

  if (event.data) {
    try {
      const pushData = event.data.json();
      Object.assign(options, pushData);
    } catch (error) {
      console.warn('Failed to parse push data:', error);
      options.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification('Acrobi AAE Update', options)
  );
});

/**
 * Background Fetch Event
 * Handle background fetch operations for large downloads
 */
self.addEventListener('backgroundfetch', (event: any) => {
  console.log('Background fetch event triggered:', event.tag);

  event.waitUntil(
    (async () => {
      try {
        const registration = event.registration;

        // Wait for the background fetch to complete
        await registration.responseReady;

        // Get the response records
        const records = await registration.matchAll();
        const successful = records.filter(
          (record: any) => record.response && record.response.ok
        );
        const failed = records.filter(
          (record: any) => !record.response || !record.response.ok
        );

        console.log(
          `Background fetch completed: ${successful.length} successful, ${failed.length} failed`
        );

        // Show notification based on results
        const notificationOptions = {
          icon: '/icon-192.png',
          badge: '/badge-72.png',
          requireInteraction: true,
          data: {
            tag: event.tag,
            successful: successful.length,
            failed: failed.length,
            totalSize: registration.totalBytes || 0,
          },
        };

        if (failed.length === 0) {
          // All downloads successful
          await self.registration.showNotification('✅ Download Complete', {
            ...notificationOptions,
            body: `Successfully downloaded ${successful.length} file${successful.length > 1 ? 's' : ''}`,
            tag: 'bg-fetch-success',
          });
        } else if (successful.length === 0) {
          // All downloads failed
          await self.registration.showNotification('❌ Download Failed', {
            ...notificationOptions,
            body: `Failed to download ${failed.length} file${failed.length > 1 ? 's' : ''}. Check your connection and try again.`,
            tag: 'bg-fetch-error',
          });
        } else {
          // Mixed results
          await self.registration.showNotification(
            '⚠️ Download Partially Complete',
            {
              ...notificationOptions,
              body: `Downloaded ${successful.length} of ${records.length} files. ${failed.length} failed.`,
              tag: 'bg-fetch-partial',
            }
          );
        }

        // Notify clients about completion
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
          client.postMessage({
            type: 'BACKGROUND_FETCH_COMPLETE',
            tag: event.tag,
            successful: successful.length,
            failed: failed.length,
            records: records.map((record: any) => ({
              request: {
                url: record.request.url,
                method: record.request.method,
              },
              response: record.response
                ? {
                    ok: record.response.ok,
                    status: record.response.status,
                    statusText: record.response.statusText,
                  }
                : null,
            })),
          });
        });

        // Store successful downloads in cache if needed
        if (successful.length > 0) {
          const cache = await caches.open(DYNAMIC_CACHE);

          for (const record of successful) {
            try {
              // Cache successful downloads for offline access
              await cache.put(record.request, record.response.clone());
              console.log(
                `Cached background fetch result: ${record.request.url}`
              );
            } catch (error) {
              console.warn('Failed to cache background fetch result:', error);
            }
          }
        }
      } catch (error) {
        console.error('Background fetch handler error:', error);

        // Show error notification
        await self.registration.showNotification('❌ Download Error', {
          body: 'An error occurred during the background download. Please try again.',
          icon: '/icon-192.png',
          badge: '/badge-72.png',
          tag: 'bg-fetch-error',
          requireInteraction: true,
          data: {
            tag: event.tag,
            error: error.message,
          },
        });
      }
    })()
  );
});

/**
 * Background Fetch Success Event
 * Handle successful background fetch completion
 */
self.addEventListener('backgroundfetchsuccess', (event: any) => {
  console.log('Background fetch success event:', event.tag);

  event.waitUntil(
    (async () => {
      try {
        const registration = event.registration;

        // Show success notification
        await self.registration.showNotification('✅ Download Complete', {
          body: `Background download "${registration.id}" completed successfully`,
          icon: '/icon-192.png',
          badge: '/badge-72.png',
          tag: 'bg-fetch-success',
          requireInteraction: false,
          data: {
            tag: event.tag,
            id: registration.id,
          },
        });

        // Notify clients
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
          client.postMessage({
            type: 'BACKGROUND_FETCH_SUCCESS',
            tag: event.tag,
            id: registration.id,
          });
        });
      } catch (error) {
        console.error('Background fetch success handler error:', error);
      }
    })()
  );
});

/**
 * Background Fetch Failure Event
 * Handle failed background fetch operations
 */
self.addEventListener('backgroundfetchfail', (event: any) => {
  console.log('Background fetch fail event:', event.tag);

  event.waitUntil(
    (async () => {
      try {
        const registration = event.registration;

        // Show failure notification
        await self.registration.showNotification('❌ Download Failed', {
          body: `Background download "${registration.id}" failed. Check your connection and try again.`,
          icon: '/icon-192.png',
          badge: '/badge-72.png',
          tag: 'bg-fetch-error',
          requireInteraction: true,
          data: {
            tag: event.tag,
            id: registration.id,
          },
        });

        // Notify clients
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
          client.postMessage({
            type: 'BACKGROUND_FETCH_FAIL',
            tag: event.tag,
            id: registration.id,
          });
        });
      } catch (error) {
        console.error('Background fetch fail handler error:', error);
      }
    })()
  );
});

/**
 * Background Fetch Abort Event
 * Handle aborted background fetch operations
 */
self.addEventListener('backgroundfetchabort', (event: any) => {
  console.log('Background fetch abort event:', event.tag);

  event.waitUntil(
    (async () => {
      try {
        const registration = event.registration;

        // Show abort notification
        await self.registration.showNotification('⚠️ Download Cancelled', {
          body: `Background download "${registration.id}" was cancelled`,
          icon: '/icon-192.png',
          badge: '/badge-72.png',
          tag: 'bg-fetch-abort',
          requireInteraction: false,
          data: {
            tag: event.tag,
            id: registration.id,
          },
        });

        // Notify clients
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
          client.postMessage({
            type: 'BACKGROUND_FETCH_ABORT',
            tag: event.tag,
            id: registration.id,
          });
        });
      } catch (error) {
        console.error('Background fetch abort handler error:', error);
      }
    })()
  );
});

/**
 * Background Fetch Click Event
 * Handle clicks on background fetch notifications
 */
self.addEventListener('backgroundfetchclick', (event: any) => {
  console.log('Background fetch click event:', event.tag);

  event.notification.close();

  event.waitUntil(
    (async () => {
      try {
        const registration = event.registration;
        const url = event.notification.data?.url || '/downloads';

        // Open or focus a window/tab
        const clients = await self.clients.matchAll({ type: 'window' });

        // Check if there's already a window/tab open with the target URL
        for (const client of clients) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }

        // If not, open a new window/tab
        if (self.clients.openWindow) {
          return self.clients.openWindow(url);
        }
      } catch (error) {
        console.error('Background fetch click handler error:', error);
      }
    })()
  );
});

/**
 * Periodic Background Sync Event
 * Handle periodic background sync for regular data updates
 */
self.addEventListener('periodicsync', (event: any) => {
  console.log('Periodic background sync triggered:', event.tag);

  event.waitUntil(
    (async () => {
      try {
        switch (event.tag) {
          case 'news-update':
            await syncNewsData();
            break;

          case 'weather-update':
            await syncWeatherData();
            break;

          case 'notifications-check':
            await checkNotifications();
            break;

          case 'content-refresh':
            await refreshContent();
            break;

          case 'analytics-upload':
            await uploadAnalytics();
            break;

          case 'cache-update':
            await updateCacheData();
            break;

          default:
            console.warn('Unknown periodic sync tag:', event.tag);
            break;
        }

        console.log(`Periodic sync completed for tag: ${event.tag}`);
      } catch (error) {
        console.error(`Periodic sync failed for tag "${event.tag}":`, error);
        // Re-throw error to trigger browser retry
        throw error;
      }
    })()
  );
});

/**
 * Periodic sync functions for different data types
 */

/**
 * Sync news data periodically
 */
async function syncNewsData(): Promise<void> {
  try {
    const response = await fetch('/api/news/latest', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`News sync failed: ${response.status}`);
    }

    const newsData = await response.json();

    // Store in cache for offline access
    const cache = await caches.open(API_CACHE);
    await cache.put(
      '/api/news/latest',
      new Response(JSON.stringify(newsData), {
        headers: {
          'Content-Type': 'application/json',
          'sw-cached-time': Date.now().toString(),
        },
      })
    );

    // Show notification if there are new articles
    if (newsData.articles && newsData.articles.length > 0) {
      await self.registration.showNotification('📰 News Update', {
        body: `${newsData.articles.length} new articles available`,
        icon: '/icon-192.png',
        badge: '/badge-72.png',
        tag: 'news-update',
        requireInteraction: false,
        data: {
          url: '/news',
          articles: newsData.articles.length,
        },
      });
    }

    // Notify clients
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'PERIODIC_SYNC_SUCCESS',
        tag: 'news-update',
        data: newsData,
      });
    });
  } catch (error) {
    console.error('News sync error:', error);
    throw error;
  }
}

/**
 * Sync weather data periodically
 */
async function syncWeatherData(): Promise<void> {
  try {
    const response = await fetch('/api/weather/current', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`Weather sync failed: ${response.status}`);
    }

    const weatherData = await response.json();

    // Store in cache
    const cache = await caches.open(API_CACHE);
    await cache.put(
      '/api/weather/current',
      new Response(JSON.stringify(weatherData), {
        headers: {
          'Content-Type': 'application/json',
          'sw-cached-time': Date.now().toString(),
        },
      })
    );

    // Show notification for severe weather alerts
    if (weatherData.alerts && weatherData.alerts.length > 0) {
      await self.registration.showNotification('🌩️ Weather Alert', {
        body: weatherData.alerts[0].description,
        icon: '/icon-192.png',
        badge: '/badge-72.png',
        tag: 'weather-alert',
        requireInteraction: true,
        data: {
          url: '/weather',
          severity: weatherData.alerts[0].severity,
        },
      });
    }

    // Notify clients
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'PERIODIC_SYNC_SUCCESS',
        tag: 'weather-update',
        data: weatherData,
      });
    });
  } catch (error) {
    console.error('Weather sync error:', error);
    throw error;
  }
}

/**
 * Check for new notifications periodically
 */
async function checkNotifications(): Promise<void> {
  try {
    const response = await fetch('/api/notifications/unread', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + ((await getStoredAuthToken()) || ''),
      },
    });

    if (!response.ok) {
      throw new Error(`Notifications check failed: ${response.status}`);
    }

    const notifications = await response.json();

    // Show notification for unread messages
    if (notifications.count > 0) {
      await self.registration.showNotification('🔔 New Notifications', {
        body: `You have ${notifications.count} unread notification${notifications.count > 1 ? 's' : ''}`,
        icon: '/icon-192.png',
        badge: '/badge-72.png',
        tag: 'notifications-check',
        requireInteraction: false,
        data: {
          url: '/notifications',
          count: notifications.count,
        },
      });
    }

    // Notify clients
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'PERIODIC_SYNC_SUCCESS',
        tag: 'notifications-check',
        data: notifications,
      });
    });
  } catch (error) {
    console.error('Notifications check error:', error);
    throw error;
  }
}

/**
 * Refresh content cache periodically
 */
async function refreshContent(): Promise<void> {
  try {
    const response = await fetch('/api/content/updated', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`Content refresh failed: ${response.status}`);
    }

    const contentData = await response.json();

    // Update cache with fresh content
    const cache = await caches.open(DYNAMIC_CACHE);

    if (contentData.pages && contentData.pages.length > 0) {
      for (const page of contentData.pages) {
        try {
          const pageResponse = await fetch(page.url);
          if (pageResponse.ok) {
            await cache.put(page.url, pageResponse);
          }
        } catch (error) {
          console.warn(`Failed to refresh page: ${page.url}`, error);
        }
      }
    }

    // Notify clients about content updates
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'PERIODIC_SYNC_SUCCESS',
        tag: 'content-refresh',
        data: contentData,
      });
    });
  } catch (error) {
    console.error('Content refresh error:', error);
    throw error;
  }
}

/**
 * Upload analytics data periodically
 */
async function uploadAnalytics(): Promise<void> {
  try {
    // Get pending analytics from IndexedDB
    const analyticsData = await getFromIndexedDB('analyticsEvents');

    if (analyticsData && analyticsData.length > 0) {
      const response = await fetch('/api/analytics/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ events: analyticsData }),
      });

      if (!response.ok) {
        throw new Error(`Analytics upload failed: ${response.status}`);
      }

      // Clear uploaded analytics
      await clearIndexedDBStore('analyticsEvents');

      console.log(`Uploaded ${analyticsData.length} analytics events`);
    }

    // Notify clients
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'PERIODIC_SYNC_SUCCESS',
        tag: 'analytics-upload',
        data: { uploaded: analyticsData?.length || 0 },
      });
    });
  } catch (error) {
    console.error('Analytics upload error:', error);
    throw error;
  }
}

/**
 * Update cache data periodically
 */
async function updateCacheData(): Promise<void> {
  try {
    // Prune expired cache entries
    await CacheManager.pruneCacheByAge(API_CACHE, CACHE_EXPIRATION.api);
    await CacheManager.pruneCacheByAge(DYNAMIC_CACHE, CACHE_EXPIRATION.dynamic);

    // Pre-fetch critical resources
    const criticalUrls = ['/', '/manifest.json', '/offline.html'];

    const cache = await caches.open(STATIC_CACHE);

    for (const url of criticalUrls) {
      try {
        const response = await fetch(url, { cache: 'reload' });
        if (response.ok) {
          await cache.put(url, response);
        }
      } catch (error) {
        console.warn(`Failed to update cache for: ${url}`, error);
      }
    }

    // Notify clients
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'PERIODIC_SYNC_SUCCESS',
        tag: 'cache-update',
        data: { updated: criticalUrls.length },
      });
    });
  } catch (error) {
    console.error('Cache update error:', error);
    throw error;
  }
}

/**
 * Helper function to get stored auth token
 */
async function getStoredAuthToken(): Promise<string | null> {
  try {
    // This would typically retrieve from secure storage
    return localStorage.getItem('auth_token');
  } catch (error) {
    console.warn('Failed to get auth token:', error);
    return null;
  }
}

// Export types for TypeScript support
export interface CacheStatus {
  name: string;
  count: number;
}

export interface ServiceWorkerMessage {
  type: 'SKIP_WAITING' | 'GET_CACHE_STATUS' | 'CLEAR_CACHE';
}

export interface ServiceWorkerResponse {
  type: 'CACHE_STATUS' | 'CACHE_CLEARED';
  caches?: CacheStatus[];
  version?: string;
}

// Log service worker registration
console.log('Advanced Caching Service Worker loaded', {
  version: CACHE_VERSION,
  caches: [STATIC_CACHE, DYNAMIC_CACHE, API_CACHE],
  precacheAssets: PRECACHE_ASSETS.length,
});
