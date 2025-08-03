# Advanced Fetch & Caching Patterns

A comprehensive guide to implementing production-ready network requests and sophisticated caching strategies in Progressive Web Apps. This guide covers advanced `fetch` API options, Service Worker integration patterns, and multi-layered caching architectures.

## Overview

Modern PWAs require sophisticated network strategies to deliver fast, reliable experiences across varying network conditions. This guide provides advanced patterns for fetch operations, Service Worker caching, and request optimization that go beyond basic implementations.

## Table of Contents

1. [Advanced Fetch API Options](#advanced-fetch-api-options)
2. [Service Worker Integration Patterns](#service-worker-integration-patterns)
3. [Multi-Strategy Caching Architecture](#multi-strategy-caching-architecture)
4. [Request Optimization Patterns](#request-optimization-patterns)
5. [Error Handling & Retry Logic](#error-handling--retry-logic)
6. [Background Sync Integration](#background-sync-integration)
7. [Performance Monitoring](#performance-monitoring)
8. [Production Implementation Examples](#production-implementation-examples)

## Advanced Fetch API Options

The Fetch API provides powerful options for controlling request behavior, caching, credentials, and more. Understanding these options is crucial for implementing effective PWA network strategies.

### Core Fetch Options

#### Cache Control Options

```typescript
// Cache control strategies
interface FetchCacheOptions {
  cache: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached';
}

// 1. Default - Use HTTP caching rules
const defaultRequest = await fetch('/api/data', {
  cache: 'default' // Respects Cache-Control headers
});

// 2. No Store - Always fetch fresh, never cache
const freshData = await fetch('/api/live-data', {
  cache: 'no-store' // Bypasses all caching
});

// 3. Reload - Bypass cache, but allow caching of response
const reloadedData = await fetch('/api/data', {
  cache: 'reload' // Forces fresh fetch, updates cache
});

// 4. No Cache - Check cache validity with server
const validatedData = await fetch('/api/data', {
  cache: 'no-cache' // Conditional request (If-Modified-Since)
});

// 5. Force Cache - Use cache even if stale
const cachedData = await fetch('/api/data', {
  cache: 'force-cache' // Use cache regardless of freshness
});

// 6. Only If Cached - Fail if not in cache
const offlineData = await fetch('/api/data', {
  cache: 'only-if-cached' // Offline-only requests
});
```

#### Request Mode Options

```typescript
// Cross-origin request modes
interface FetchModeOptions {
  mode: 'cors' | 'no-cors' | 'same-origin' | 'navigate';
}

// 1. CORS - Full cross-origin support
const corsRequest = await fetch('https://api.external.com/data', {
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  }
});

// 2. No-CORS - Limited cross-origin (opaque responses)
const noCorsRequest = await fetch('https://cdn.example.com/image.jpg', {
  mode: 'no-cors' // Can't read response, but can cache
});

// 3. Same-Origin - Only same-origin requests
const sameOriginRequest = await fetch('/api/secure-data', {
  mode: 'same-origin' // Fails for cross-origin
});

// 4. Navigate - For navigation requests (Service Worker only)
// Used in Service Worker fetch handlers for page requests
```

#### Credentials Management

```typescript
// Credential handling options
interface FetchCredentialsOptions {
  credentials: 'same-origin' | 'include' | 'omit';
}

// 1. Same-Origin - Default behavior
const defaultAuth = await fetch('/api/user-data', {
  credentials: 'same-origin' // Include cookies for same-origin
});

// 2. Include - Always send credentials
const crossOriginAuth = await fetch('https://api.partner.com/data', {
  credentials: 'include', // Include cookies cross-origin
  mode: 'cors'
});

// 3. Omit - Never send credentials
const publicRequest = await fetch('/api/public-data', {
  credentials: 'omit' // No cookies or auth headers
});
```

#### Advanced Headers & Options

```typescript
// Comprehensive fetch configuration
interface AdvancedFetchOptions {
  method: string;
  headers: Record<string, string>;
  body?: string | FormData | URLSearchParams;
  signal?: AbortSignal;
  integrity?: string;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
}

// Production-ready fetch with all options
async function advancedFetch(url: string, options: Partial<AdvancedFetchOptions> = {}) {
  const controller = new AbortController();
  
  // Set timeout
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  
  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...options.headers
      },
      body: options.body,
      signal: controller.signal,
      cache: 'default',
      mode: 'cors',
      credentials: 'same-origin',
      referrerPolicy: 'strict-origin-when-cross-origin',
      ...options
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    
    throw error;
  }
}
```

### Security Considerations

```typescript
// Secure fetch implementation
class SecureFetch {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  
  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    };
    
    if (apiKey) {
      this.defaultHeaders['Authorization'] = `Bearer ${apiKey}`;
    }
  }
  
  async secureRequest(endpoint: string, options: RequestInit = {}) {
    const url = new URL(endpoint, this.baseUrl);
    
    // Validate URL to prevent SSRF
    if (!this.isUrlSafe(url)) {
      throw new Error('Unsafe URL detected');
    }
    
    // Add CSRF protection for state-changing requests
    const method = options.method?.toUpperCase() || 'GET';
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
      const csrfToken = this.getCSRFToken();
      if (csrfToken) {
        this.defaultHeaders['X-CSRF-Token'] = csrfToken;
      }
    }
    
    return fetch(url.toString(), {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      },
      credentials: 'same-origin', // Secure default
      mode: 'cors',
      cache: method === 'GET' ? 'default' : 'no-store'
    });
  }
  
  private isUrlSafe(url: URL): boolean {
    // Prevent internal network access
    const hostname = url.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') return false;
    if (hostname.startsWith('10.')) return false;
    if (hostname.startsWith('192.168.')) return false;
    if (hostname.startsWith('172.')) {
      const secondOctet = parseInt(hostname.split('.')[1]);
      if (secondOctet >= 16 && secondOctet <= 31) return false;
    }
    
    return true;
  }
  
  private getCSRFToken(): string | null {
    return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || null;
  }
}
```

## Service Worker Integration Patterns

Service Workers provide a powerful layer for intercepting and managing network requests. Understanding how client-side fetch options interact with Service Worker strategies is crucial.

### Multi-Strategy Fetch Handler

```javascript
// sw.js - Production-ready Service Worker with advanced routing
const CACHE_NAMES = {
  STATIC: 'static-cache-v1.2.0',
  DYNAMIC: 'dynamic-cache-v1.2.0',
  API: 'api-cache-v1.2.0',
  IMAGES: 'images-cache-v1.2.0'
};

const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Request routing configuration
const ROUTING_CONFIG = [
  {
    pattern: /\.(js|css|woff2|woff|ttf)$/,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    cache: CACHE_NAMES.STATIC,
    maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
  },
  {
    pattern: /\.(png|jpg|jpeg|gif|webp|svg|ico)$/,
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    cache: CACHE_NAMES.IMAGES,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  },
  {
    pattern: /\/api\/(users|posts|comments)/,
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    cache: CACHE_NAMES.API,
    maxAge: 5 * 60 * 1000 // 5 minutes
  },
  {
    pattern: /\/api\/(auth|payment|admin)/,
    strategy: CACHE_STRATEGIES.NETWORK_ONLY,
    cache: null
  }
];

self.addEventListener('fetch', (event) => {
  // Skip non-GET requests for caching
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }
  
  // Find matching route
  const route = findMatchingRoute(event.request.url);
  
  if (route) {
    event.respondWith(handleRequest(event.request, route));
  }
});

function findMatchingRoute(url) {
  return ROUTING_CONFIG.find(route => route.pattern.test(url));
}

async function handleRequest(request, route) {
  switch (route.strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return handleCacheFirst(request, route);
    case CACHE_STRATEGIES.NETWORK_FIRST:
      return handleNetworkFirst(request, route);
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      return handleStaleWhileRevalidate(request, route);
    case CACHE_STRATEGIES.NETWORK_ONLY:
      return handleNetworkOnly(request);
    case CACHE_STRATEGIES.CACHE_ONLY:
      return handleCacheOnly(request, route);
    default:
      return fetch(request);
  }
}

// 1. Cache First Strategy
async function handleCacheFirst(request, route) {
  try {
    const cache = await caches.open(route.cache);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Check if cache is still valid
      if (isCacheValid(cachedResponse, route.maxAge)) {
        return cachedResponse;
      }
    }
    
    // Fetch from network and cache
    const networkResponse = await fetch(request);
    
    if (networkResponse.status === 200) {
      const responseToCache = networkResponse.clone();
      addTimestampToResponse(responseToCache);
      cache.put(request, responseToCache);
    }
    
    return networkResponse;
  } catch (error) {
    // Return cached version as fallback
    const cache = await caches.open(route.cache);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// 2. Network First Strategy
async function handleNetworkFirst(request, route) {
  try {
    const networkResponse = await fetch(request, {
      signal: AbortSignal.timeout(3000) // 3 second timeout
    });
    
    if (networkResponse.status === 200) {
      const cache = await caches.open(route.cache);
      const responseToCache = networkResponse.clone();
      addTimestampToResponse(responseToCache);
      cache.put(request, responseToCache);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, checking cache:', error);
    
    const cache = await caches.open(route.cache);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse && isCacheValid(cachedResponse, route.maxAge)) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// 3. Stale While Revalidate Strategy
async function handleStaleWhileRevalidate(request, route) {
  const cache = await caches.open(route.cache);
  const cachedResponse = await cache.match(request);
  
  // Always try to fetch fresh version in background
  const fetchPromise = fetch(request)
    .then(response => {
      if (response.status === 200) {
        const responseToCache = response.clone();
        addTimestampToResponse(responseToCache);
        cache.put(request, responseToCache);
      }
      return response;
    })
    .catch(error => {
      console.log('Background fetch failed:', error);
      return cachedResponse;
    });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Wait for network if no cached version
  return fetchPromise;
}

// 4. Network Only Strategy
async function handleNetworkOnly(request) {
  return fetch(request);
}

// 5. Cache Only Strategy
async function handleCacheOnly(request, route) {
  const cache = await caches.open(route.cache);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  throw new Error('No cached response available');
}

// Utility functions
function addTimestampToResponse(response) {
  const headers = new Headers(response.headers);
  headers.set('sw-cache-timestamp', Date.now().toString());
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
}

function isCacheValid(response, maxAge) {
  const timestamp = response.headers.get('sw-cache-timestamp');
  if (!timestamp) return false;
  
  const age = Date.now() - parseInt(timestamp);
  return age < maxAge;
}
```

### Cache Strategy Recommendations

| Asset Type | Strategy | Cache Duration | Reasoning |
|------------|----------|----------------|-----------|
| **App Shell** (HTML, CSS, JS) | Cache First | 1 year | Core app files rarely change |
| **API Data** (User-specific) | Network First | 5 minutes | Fresh data preferred, cache as fallback |
| **Static Content** (Images, Icons) | Stale While Revalidate | 30 days | Good cached experience, background updates |
| **Authentication** (Login, JWT) | Network Only | Never cache | Security-critical, always fresh |
| **User-Generated Content** | Network First | 1 hour | Balance freshness with offline access |
| **Configuration** (App settings) | Cache First | 1 day | Infrequently updated, offline availability |

## Multi-Strategy Caching Architecture

Implement a sophisticated caching system that combines multiple strategies for optimal performance.

### Intelligent Cache Manager

```typescript
// lib/cache-manager.ts
interface CacheConfig {
  name: string;
  strategy: 'cache-first' | 'network-first' | 'stale-while-revalidate';
  maxAge: number;
  maxEntries: number;
  networkTimeoutMs: number;
}

interface RequestMetadata {
  timestamp: number;
  etag?: string;
  lastModified?: string;
  size: number;
}

class IntelligentCacheManager {
  private configs: Map<string, CacheConfig> = new Map();
  private metadata: Map<string, RequestMetadata> = new Map();
  
  constructor() {
    this.setupConfigs();
  }
  
  private setupConfigs() {
    // Static assets
    this.configs.set('static', {
      name: 'static-assets',
      strategy: 'cache-first',
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      maxEntries: 100,
      networkTimeoutMs: 5000
    });
    
    // API responses
    this.configs.set('api', {
      name: 'api-responses',
      strategy: 'network-first',
      maxAge: 5 * 60 * 1000, // 5 minutes
      maxEntries: 50,
      networkTimeoutMs: 3000
    });
    
    // Images
    this.configs.set('images', {
      name: 'image-cache',
      strategy: 'stale-while-revalidate',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      maxEntries: 200,
      networkTimeoutMs: 10000
    });
  }
  
  async fetch(request: Request, cacheType: string): Promise<Response> {
    const config = this.configs.get(cacheType);
    if (!config) {
      return fetch(request);
    }
    
    switch (config.strategy) {
      case 'cache-first':
        return this.cacheFirstFetch(request, config);
      case 'network-first':
        return this.networkFirstFetch(request, config);
      case 'stale-while-revalidate':
        return this.staleWhileRevalidateFetch(request, config);
      default:
        return fetch(request);
    }
  }
  
  private async cacheFirstFetch(request: Request, config: CacheConfig): Promise<Response> {
    const cache = await caches.open(config.name);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse && this.isCacheValid(request.url, config.maxAge)) {
      return cachedResponse;
    }
    
    try {
      const networkResponse = await this.fetchWithTimeout(request, config.networkTimeoutMs);
      
      if (networkResponse.ok) {
        await this.cacheResponse(cache, request, networkResponse.clone(), config);
      }
      
      return networkResponse;
    } catch (error) {
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  }
  
  private async networkFirstFetch(request: Request, config: CacheConfig): Promise<Response> {
    try {
      const networkResponse = await this.fetchWithTimeout(request, config.networkTimeoutMs);
      
      if (networkResponse.ok) {
        const cache = await caches.open(config.name);
        await this.cacheResponse(cache, request, networkResponse.clone(), config);
      }
      
      return networkResponse;
    } catch (error) {
      const cache = await caches.open(config.name);
      const cachedResponse = await cache.match(request);
      
      if (cachedResponse && this.isCacheValid(request.url, config.maxAge)) {
        return cachedResponse;
      }
      
      throw error;
    }
  }
  
  private async staleWhileRevalidateFetch(request: Request, config: CacheConfig): Promise<Response> {
    const cache = await caches.open(config.name);
    const cachedResponse = await cache.match(request);
    
    // Background fetch
    const fetchPromise = this.fetchWithTimeout(request, config.networkTimeoutMs)
      .then(response => {
        if (response.ok) {
          this.cacheResponse(cache, request, response.clone(), config);
        }
        return response;
      })
      .catch(error => {
        console.log('Background fetch failed:', error);
        return cachedResponse;
      });
    
    // Return cached immediately if available
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Wait for network if no cache
    return fetchPromise;
  }
  
  private async fetchWithTimeout(request: Request, timeoutMs: number): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
      const response = await fetch(request, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
  
  private async cacheResponse(
    cache: Cache, 
    request: Request, 
    response: Response, 
    config: CacheConfig
  ) {
    // Check cache size limit
    const keys = await cache.keys();
    if (keys.length >= config.maxEntries) {
      // Remove oldest entries
      const metadata = keys
        .map(key => ({ key, metadata: this.metadata.get(key.url) }))
        .filter(item => item.metadata)
        .sort((a, b) => a.metadata!.timestamp - b.metadata!.timestamp);
      
      const toDelete = metadata.slice(0, keys.length - config.maxEntries + 1);
      await Promise.all(toDelete.map(item => cache.delete(item.key)));
    }
    
    // Store response with metadata
    await cache.put(request, response);
    
    this.metadata.set(request.url, {
      timestamp: Date.now(),
      etag: response.headers.get('etag') || undefined,
      lastModified: response.headers.get('last-modified') || undefined,
      size: parseInt(response.headers.get('content-length') || '0')
    });
  }
  
  private isCacheValid(url: string, maxAge: number): boolean {
    const metadata = this.metadata.get(url);
    if (!metadata) return false;
    
    return Date.now() - metadata.timestamp < maxAge;
  }
  
  async clearCache(cacheType?: string) {
    if (cacheType) {
      const config = this.configs.get(cacheType);
      if (config) {
        await caches.delete(config.name);
      }
    } else {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
    }
    
    this.metadata.clear();
  }
  
  getCacheStats(): Record<string, any> {
    const stats: Record<string, any> = {};
    
    for (const [type, config] of this.configs) {
      stats[type] = {
        name: config.name,
        strategy: config.strategy,
        maxAge: config.maxAge,
        maxEntries: config.maxEntries,
        currentEntries: Array.from(this.metadata.keys()).filter(key => 
          key.startsWith(type)
        ).length
      };
    }
    
    return stats;
  }
}

// Global cache manager instance
export const cacheManager = new IntelligentCacheManager();
```

## Request Optimization Patterns

### Request Deduplication

```typescript
// lib/request-deduplicator.ts
class RequestDeduplicator {
  private pendingRequests: Map<string, Promise<Response>> = new Map();
  
  async fetch(request: Request): Promise<Response> {
    const key = this.getRequestKey(request);
    
    // Return existing promise if request is already in flight
    const existingPromise = this.pendingRequests.get(key);
    if (existingPromise) {
      return existingPromise.then(response => response.clone());
    }
    
    // Create new request promise
    const requestPromise = this.executeRequest(request);
    this.pendingRequests.set(key, requestPromise);
    
    try {
      const response = await requestPromise;
      return response.clone();
    } finally {
      // Clean up completed request
      this.pendingRequests.delete(key);
    }
  }
  
  private async executeRequest(request: Request): Promise<Response> {
    // Add request metadata
    const enhancedRequest = new Request(request, {
      headers: {
        ...Object.fromEntries(request.headers.entries()),
        'X-Request-ID': crypto.randomUUID(),
        'X-Request-Timestamp': Date.now().toString()
      }
    });
    
    return fetch(enhancedRequest);
  }
  
  private getRequestKey(request: Request): string {
    // Create unique key based on URL and relevant headers
    const url = request.url;
    const method = request.method;
    const contentType = request.headers.get('content-type') || '';
    const authorization = request.headers.get('authorization') || '';
    
    return `${method}:${url}:${contentType}:${authorization}`;
  }
  
  clearPendingRequests() {
    this.pendingRequests.clear();
  }
  
  getPendingRequestsCount(): number {
    return this.pendingRequests.size;
  }
}

export const requestDeduplicator = new RequestDeduplicator();
```

### Request Queue & Batching

```typescript
// lib/request-queue.ts
interface QueuedRequest {
  id: string;
  request: Request;
  resolve: (response: Response) => void;
  reject: (error: Error) => void;
  priority: number;
  timestamp: number;
}

class RequestQueue {
  private queue: QueuedRequest[] = [];
  private processing = false;
  private batchSize = 5;
  private batchDelayMs = 100;
  private maxRetries = 3;
  
  async enqueue(request: Request, priority = 0): Promise<Response> {
    return new Promise((resolve, reject) => {
      const queuedRequest: QueuedRequest = {
        id: crypto.randomUUID(),
        request,
        resolve,
        reject,
        priority,
        timestamp: Date.now()
      };
      
      this.queue.push(queuedRequest);
      this.queue.sort((a, b) => b.priority - a.priority || a.timestamp - b.timestamp);
      
      this.processQueue();
    });
  }
  
  private async processQueue() {
    if (this.processing || this.queue.length === 0) {
      return;
    }
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const batch = this.queue.splice(0, this.batchSize);
      
      // Process batch in parallel
      const batchPromises = batch.map(item => this.processRequest(item));
      
      await Promise.allSettled(batchPromises);
      
      // Small delay between batches to prevent overwhelming the server
      if (this.queue.length > 0) {
        await new Promise(resolve => setTimeout(resolve, this.batchDelayMs));
      }
    }
    
    this.processing = false;
  }
  
  private async processRequest(queuedRequest: QueuedRequest, retryCount = 0): Promise<void> {
    try {
      const response = await fetch(queuedRequest.request);
      queuedRequest.resolve(response);
    } catch (error) {
      if (retryCount < this.maxRetries) {
        // Exponential backoff
        const delay = Math.pow(2, retryCount) * 1000;
        setTimeout(() => {
          this.processRequest(queuedRequest, retryCount + 1);
        }, delay);
      } else {
        queuedRequest.reject(error as Error);
      }
    }
  }
  
  getQueueLength(): number {
    return this.queue.length;
  }
  
  clearQueue() {
    this.queue.forEach(item => {
      item.reject(new Error('Queue cleared'));
    });
    this.queue = [];
  }
}

export const requestQueue = new RequestQueue();
```

## Error Handling & Retry Logic

### Robust Error Handling

```typescript
// lib/robust-fetch.ts
interface RetryConfig {
  maxRetries: number;
  backoffFactor: number;
  retryableStatuses: number[];
  retryableErrors: string[];
}

interface FetchResult<T> {
  data?: T;
  error?: Error;
  status: 'success' | 'error' | 'timeout' | 'network-error';
  attempts: number;
  duration: number;
}

class RobustFetch {
  private defaultRetryConfig: RetryConfig = {
    maxRetries: 3,
    backoffFactor: 2,
    retryableStatuses: [408, 429, 500, 502, 503, 504],
    retryableErrors: ['NetworkError', 'TimeoutError', 'AbortError']
  };
  
  async fetchWithRetry<T>(
    url: string,
    options: RequestInit = {},
    retryConfig: Partial<RetryConfig> = {}
  ): Promise<FetchResult<T>> {
    const config = { ...this.defaultRetryConfig, ...retryConfig };
    const startTime = Date.now();
    let lastError: Error;
    
    for (let attempt = 1; attempt <= config.maxRetries + 1; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        // Check if status is retryable
        if (!response.ok && config.retryableStatuses.includes(response.status)) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        if (!response.ok) {
          return {
            error: new Error(`HTTP ${response.status}: ${response.statusText}`),
            status: 'error',
            attempts: attempt,
            duration: Date.now() - startTime
          };
        }
        
        const data = await response.json();
        
        return {
          data,
          status: 'success',
          attempts: attempt,
          duration: Date.now() - startTime
        };
        
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry if error is not retryable
        if (!this.isRetryableError(lastError, config)) {
          break;
        }
        
        // Don't wait after the last attempt
        if (attempt <= config.maxRetries) {
          const delay = this.calculateBackoffDelay(attempt, config.backoffFactor);
          await this.sleep(delay);
        }
      }
    }
    
    return {
      error: lastError,
      status: this.getErrorStatus(lastError),
      attempts: config.maxRetries + 1,
      duration: Date.now() - startTime
    };
  }
  
  private isRetryableError(error: Error, config: RetryConfig): boolean {
    return config.retryableErrors.some(retryableError => 
      error.name.includes(retryableError) || error.message.includes(retryableError)
    );
  }
  
  private calculateBackoffDelay(attempt: number, backoffFactor: number): number {
    // Exponential backoff with jitter
    const baseDelay = Math.pow(backoffFactor, attempt - 1) * 1000;
    const jitter = Math.random() * 0.1 * baseDelay;
    return baseDelay + jitter;
  }
  
  private getErrorStatus(error: Error): 'timeout' | 'network-error' | 'error' {
    if (error.name === 'AbortError' || error.message.includes('timeout')) {
      return 'timeout';
    }
    
    if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
      return 'network-error';
    }
    
    return 'error';
  }
  
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const robustFetch = new RobustFetch();
```

### Circuit Breaker Pattern

```typescript
// lib/circuit-breaker.ts
enum CircuitState {
  CLOSED = 'closed',
  OPEN = 'open',
  HALF_OPEN = 'half-open'
}

interface CircuitBreakerOptions {
  failureThreshold: number;
  recoveryTimeMs: number;
  monitoringWindowMs: number;
  minimumThroughput: number;
}

class CircuitBreaker {
  private state = CircuitState.CLOSED;
  private failures = 0;
  private lastFailureTime = 0;
  private successCount = 0;
  private requestCount = 0;
  private windowStart = Date.now();
  
  constructor(private options: CircuitBreakerOptions) {}
  
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (this.shouldAttemptReset()) {
        this.state = CircuitState.HALF_OPEN;
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess() {
    this.resetWindow();
    this.failures = 0;
    this.successCount++;
    
    if (this.state === CircuitState.HALF_OPEN) {
      this.state = CircuitState.CLOSED;
    }
  }
  
  private onFailure() {
    this.resetWindow();
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.shouldTrip()) {
      this.state = CircuitState.OPEN;
    }
  }
  
  private shouldTrip(): boolean {
    const failureRate = this.failures / this.requestCount;
    
    return (
      this.requestCount >= this.options.minimumThroughput &&
      this.failures >= this.options.failureThreshold &&
      failureRate >= 0.5
    );
  }
  
  private shouldAttemptReset(): boolean {
    return Date.now() - this.lastFailureTime >= this.options.recoveryTimeMs;
  }
  
  private resetWindow() {
    const now = Date.now();
    
    if (now - this.windowStart >= this.options.monitoringWindowMs) {
      this.windowStart = now;
      this.requestCount = 0;
      this.successCount = 0;
    }
    
    this.requestCount++;
  }
  
  getState(): CircuitState {
    return this.state;
  }
  
  getStats() {
    return {
      state: this.state,
      failures: this.failures,
      successCount: this.successCount,
      requestCount: this.requestCount,
      failureRate: this.requestCount > 0 ? this.failures / this.requestCount : 0
    };
  }
}

// Usage example
const apiCircuitBreaker = new CircuitBreaker({
  failureThreshold: 5,
  recoveryTimeMs: 60000, // 1 minute
  monitoringWindowMs: 120000, // 2 minutes
  minimumThroughput: 10
});

export { CircuitBreaker, apiCircuitBreaker };
```

## Background Sync Integration

### Background Sync Queue

```typescript
// lib/background-sync.ts
interface SyncRequest {
  id: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
  timestamp: number;
  retryCount: number;
}

class BackgroundSyncManager {
  private dbName = 'bg-sync-db';
  private storeName = 'sync-requests';
  private db: IDBDatabase | null = null;
  
  async init() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('timestamp', 'timestamp');
        }
      };
    });
  }
  
  async addRequest(url: string, options: RequestInit = {}): Promise<void> {
    if (!this.db) await this.init();
    
    const syncRequest: SyncRequest = {
      id: crypto.randomUUID(),
      url,
      method: options.method || 'GET',
      headers: this.serializeHeaders(options.headers),
      body: options.body as string,
      timestamp: Date.now(),
      retryCount: 0
    };
    
    const transaction = this.db!.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    
    await new Promise<void>((resolve, reject) => {
      const request = store.add(syncRequest);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    
    // Register background sync if available
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('background-sync');
    }
  }
  
  async processQueue(): Promise<void> {
    if (!this.db) await this.init();
    
    const requests = await this.getAllRequests();
    
    for (const request of requests) {
      try {
        const response = await fetch(request.url, {
          method: request.method,
          headers: request.headers,
          body: request.body
        });
        
        if (response.ok) {
          await this.removeRequest(request.id);
        } else {
          await this.incrementRetryCount(request.id);
        }
      } catch (error) {
        console.error('Background sync failed:', error);
        await this.incrementRetryCount(request.id);
      }
    }
  }
  
  private async getAllRequests(): Promise<SyncRequest[]> {
    const transaction = this.db!.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  private async removeRequest(id: string): Promise<void> {
    const transaction = this.db!.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    
    return new Promise<void>((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  
  private async incrementRetryCount(id: string): Promise<void> {
    const transaction = this.db!.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    
    const getRequest = store.get(id);
    
    getRequest.onsuccess = () => {
      const request = getRequest.result;
      if (request) {
        request.retryCount++;
        
        // Remove after too many retries
        if (request.retryCount > 5) {
          store.delete(id);
        } else {
          store.put(request);
        }
      }
    };
  }
  
  private serializeHeaders(headers?: HeadersInit): Record<string, string> {
    if (!headers) return {};
    
    if (headers instanceof Headers) {
      return Object.fromEntries(headers.entries());
    }
    
    if (Array.isArray(headers)) {
      return Object.fromEntries(headers);
    }
    
    return headers as Record<string, string>;
  }
}

export const backgroundSyncManager = new BackgroundSyncManager();
```

## Performance Monitoring

### Request Performance Tracker

```typescript
// lib/performance-tracker.ts
interface RequestMetrics {
  url: string;
  method: string;
  startTime: number;
  endTime: number;
  duration: number;
  status: number;
  cacheHit: boolean;
  size: number;
  networkTime?: number;
  cacheTime?: number;
}

class RequestPerformanceTracker {
  private metrics: RequestMetrics[] = [];
  private maxMetrics = 1000;
  
  trackRequest(request: Request): {
    complete: (response: Response, cacheHit?: boolean) => void;
  } {
    const startTime = performance.now();
    
    return {
      complete: (response: Response, cacheHit = false) => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        const metric: RequestMetrics = {
          url: request.url,
          method: request.method,
          startTime,
          endTime,
          duration,
          status: response.status,
          cacheHit,
          size: parseInt(response.headers.get('content-length') || '0')
        };
        
        this.addMetric(metric);
      }
    };
  }
  
  private addMetric(metric: RequestMetrics) {
    this.metrics.push(metric);
    
    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }
    
    // Send to analytics if configured
    this.sendToAnalytics(metric);
  }
  
  private sendToAnalytics(metric: RequestMetrics) {
    // Send to your analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', 'request_performance', {
        custom_map: { metric_name: 'dimension1' },
        metric_name: 'request_duration',
        metric_value: Math.round(metric.duration),
        url: metric.url,
        method: metric.method,
        status: metric.status,
        cache_hit: metric.cacheHit
      });
    }
  }
  
  getMetrics(filter?: { timeRange?: number; url?: string }): RequestMetrics[] {
    let filtered = this.metrics;
    
    if (filter?.timeRange) {
      const cutoff = Date.now() - filter.timeRange;
      filtered = filtered.filter(m => m.endTime >= cutoff);
    }
    
    if (filter?.url) {
      filtered = filtered.filter(m => m.url.includes(filter.url!));
    }
    
    return filtered;
  }
  
  getStats() {
    const metrics = this.metrics;
    
    if (metrics.length === 0) {
      return null;
    }
    
    const totalRequests = metrics.length;
    const cacheHits = metrics.filter(m => m.cacheHit).length;
    const avgDuration = metrics.reduce((sum, m) => sum + m.duration, 0) / totalRequests;
    const totalSize = metrics.reduce((sum, m) => sum + m.size, 0);
    
    const statusCounts = metrics.reduce((acc, m) => {
      acc[m.status] = (acc[m.status] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    return {
      totalRequests,
      cacheHitRate: cacheHits / totalRequests,
      avgDuration: Math.round(avgDuration),
      totalSize,
      statusCounts,
      errorRate: (statusCounts[400] || 0 + statusCounts[500] || 0) / totalRequests
    };
  }
  
  clearMetrics() {
    this.metrics = [];
  }
}

export const performanceTracker = new RequestPerformanceTracker();
```

## Production Implementation Examples

### Complete PWA Fetch Implementation

```typescript
// lib/pwa-fetch.ts
import { cacheManager } from './cache-manager';
import { requestDeduplicator } from './request-deduplicator';
import { robustFetch } from './robust-fetch';
import { performanceTracker } from './performance-tracker';
import { backgroundSyncManager } from './background-sync';

interface PWAFetchOptions extends RequestInit {
  cacheStrategy?: 'cache-first' | 'network-first' | 'stale-while-revalidate';
  retryConfig?: {
    maxRetries: number;
    backoffFactor: number;
  };
  backgroundSync?: boolean;
  timeout?: number;
}

class PWAFetch {
  async fetch(url: string, options: PWAFetchOptions = {}): Promise<Response> {
    const request = new Request(url, options);
    const tracker = performanceTracker.trackRequest(request);
    
    try {
      // Handle background sync for failed requests
      if (options.backgroundSync && !navigator.onLine) {
        await backgroundSyncManager.addRequest(url, options);
        throw new Error('Offline - request queued for background sync');
      }
      
      // Use request deduplication for GET requests
      if (request.method === 'GET') {
        const response = await requestDeduplicator.fetch(request);
        tracker.complete(response, false);
        return response;
      }
      
      // Use cache manager if strategy specified
      if (options.cacheStrategy) {
        const cacheType = this.getCacheType(url);
        const response = await cacheManager.fetch(request, cacheType);
        tracker.complete(response, true);
        return response;
      }
      
      // Use robust fetch with retry logic
      if (options.retryConfig) {
        const result = await robustFetch.fetchWithRetry(url, options, options.retryConfig);
        
        if (result.error) {
          throw result.error;
        }
        
        const response = new Response(JSON.stringify(result.data), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
        
        tracker.complete(response, false);
        return response;
      }
      
      // Standard fetch
      const response = await fetch(request);
      tracker.complete(response, false);
      return response;
      
    } catch (error) {
      // Handle offline scenarios
      if (!navigator.onLine && options.backgroundSync) {
        await backgroundSyncManager.addRequest(url, options);
      }
      
      throw error;
    }
  }
  
  private getCacheType(url: string): string {
    if (url.includes('/api/')) return 'api';
    if (url.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) return 'images';
    return 'static';
  }
  
  // Convenience methods
  async get(url: string, options: Omit<PWAFetchOptions, 'method'> = {}) {
    return this.fetch(url, { ...options, method: 'GET' });
  }
  
  async post(url: string, data: any, options: Omit<PWAFetchOptions, 'method' | 'body'> = {}) {
    return this.fetch(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data)
    });
  }
  
  async put(url: string, data: any, options: Omit<PWAFetchOptions, 'method' | 'body'> = {}) {
    return this.fetch(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data)
    });
  }
  
  async delete(url: string, options: Omit<PWAFetchOptions, 'method'> = {}) {
    return this.fetch(url, { ...options, method: 'DELETE' });
  }
}

// Global PWA fetch instance
export const pwaFetch = new PWAFetch();

// Usage examples
export const api = {
  // Cache-first for static data
  getConfig: () => pwaFetch.get('/api/config', {
    cacheStrategy: 'cache-first'
  }),
  
  // Network-first for dynamic data
  getUserData: (id: string) => pwaFetch.get(`/api/users/${id}`, {
    cacheStrategy: 'network-first',
    retryConfig: { maxRetries: 3, backoffFactor: 2 }
  }),
  
  // Background sync for offline mutations
  updateProfile: (data: any) => pwaFetch.post('/api/profile', data, {
    backgroundSync: true
  }),
  
  // Stale-while-revalidate for images
  getAvatar: (url: string) => pwaFetch.get(url, {
    cacheStrategy: 'stale-while-revalidate'
  })
};
```

### React Hook Integration

```typescript
// hooks/use-pwa-fetch.ts
import { useState, useEffect, useCallback } from 'react';
import { pwaFetch, PWAFetchOptions } from '../lib/pwa-fetch';

interface UsePWAFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function usePWAFetch<T>(
  url: string,
  options: PWAFetchOptions = {}
): UsePWAFetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await pwaFetch.fetch(url, options);
      const result = await response.json();
      
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [url, options]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

// Usage example
export function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error, refetch } = usePWAFetch<User>(
    `/api/users/${userId}`,
    {
      cacheStrategy: 'network-first',
      retryConfig: { maxRetries: 3, backoffFactor: 2 }
    }
  );
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;
  
  return (
    <div>
      <h1>{data.name}</h1>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

## Related Resources

### Internal Documentation
- [Service Worker Master Guide](./service-worker-guide) - Comprehensive Service Worker implementation
- [Performance Optimization Guide](./performance-guide) - Network performance optimization
- [Security Best Practices](./security-guide) - Secure request handling

### External Resources
- **Fetch API**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- **Service Worker**: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- **Cache API**: https://developer.mozilla.org/en-US/docs/Web/API/Cache
- **Background Sync**: https://developer.mozilla.org/en-US/docs/Web/API/Background_Sync_API

Advanced fetch and caching patterns are essential for building robust, performant PWAs. This guide provides production-ready implementations that handle network variability, offline scenarios, and performance optimization while maintaining security best practices.

Remember: Network strategies should be tailored to your specific use case, user behavior patterns, and performance requirements. Regular monitoring and optimization are key to maintaining excellent user experiences.