# PWA Performance Optimization Guide

A comprehensive guide to building lightning-fast Progressive Web Apps (PWAs) using the Acrobi Design System and Next.js. This guide covers performance metrics, optimization strategies, and monitoring techniques to achieve excellent Core Web Vitals scores.

## Overview

Performance is critical for PWA success. Users expect fast, responsive applications that work seamlessly across all devices and network conditions. This guide provides practical, production-tested optimization strategies to deliver exceptional user experiences.

## Table of Contents

1. [Core Web Vitals & PWA Metrics](#core-web-vitals--pwa-metrics)
2. [Service Worker Performance](#service-worker-performance)
3. [Network-Aware Optimizations](#network-aware-optimizations)
4. [Next.js Performance Features](#nextjs-performance-features)
5. [Asset Optimization](#asset-optimization)
6. [Code Splitting & Bundle Optimization](#code-splitting--bundle-optimization)
7. [Performance Monitoring](#performance-monitoring)
8. [Performance Testing](#performance-testing)
9. [Performance Budget & CI/CD](#performance-budget--cicd)
10. [Performance Checklist](#performance-checklist)

## Core Web Vitals & PWA Metrics

Core Web Vitals are essential metrics for measuring user experience. PWAs must excel in these areas to provide native-like performance.

### Understanding the Metrics

**Largest Contentful Paint (LCP)** - Loading Performance
- **Target**: < 2.5 seconds
- **Measures**: Time until largest content element is rendered
- **PWA Impact**: Critical for perceived loading speed

**First Input Delay (FID)** - Interactivity
- **Target**: < 100 milliseconds
- **Measures**: Time from first user interaction to browser response
- **PWA Impact**: Essential for app-like responsiveness

**Cumulative Layout Shift (CLS)** - Visual Stability
- **Target**: < 0.1
- **Measures**: Unexpected layout shifts during page lifecycle
- **PWA Impact**: Critical for user interface stability

### Additional PWA Metrics

**Time to Interactive (TTI)**
- **Target**: < 3.5 seconds
- **Measures**: Time until page is fully interactive
- **PWA Impact**: When Service Worker and main thread are ready

**Total Blocking Time (TBT)**
- **Target**: < 200 milliseconds
- **Measures**: Main thread blocking time during loading
- **PWA Impact**: Affects responsiveness during initial load

### Implementing Performance Monitoring

```typescript
// lib/performance-monitor.ts
interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  tti: number;
  tbt: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  
  constructor() {
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeTTI();
  }
  
  private observeLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      this.reportMetric('lcp', lastEntry.startTime);
    });
    
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  }
  
  private observeFID() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.metrics.fid = entry.processingStart - entry.startTime;
        this.reportMetric('fid', this.metrics.fid);
      }
    });
    
    observer.observe({ type: 'first-input', buffered: true });
  }
  
  private observeCLS() {
    let clsValue = 0;
    let clsEntries: LayoutShift[] = [];
    
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as LayoutShift[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      }
      
      this.metrics.cls = clsValue;
      this.reportMetric('cls', clsValue);
    });
    
    observer.observe({ type: 'layout-shift', buffered: true });
  }
  
  private observeTTI() {
    // TTI calculation (simplified)
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const navigationEntry = entries[0] as PerformanceNavigationTiming;
      
      // Estimate TTI based on load event and long tasks
      const estimatedTTI = navigationEntry.loadEventEnd - navigationEntry.fetchStart;
      this.metrics.tti = estimatedTTI;
      this.reportMetric('tti', estimatedTTI);
    });
    
    observer.observe({ type: 'navigation', buffered: true });
  }
  
  private reportMetric(name: string, value: number) {
    // Send to analytics service
    if (typeof window !== 'undefined' && 'gtag' in window) {
      gtag('event', 'web_vitals', {
        custom_map: { metric_id: 'dimension1' },
        metric_id: name,
        metric_value: Math.round(value),
        metric_delta: Math.round(value),
      });
    }
    
    // Log for debugging
    console.log(`${name.toUpperCase()}: ${Math.round(value)}ms`);
  }
  
  getMetrics(): PerformanceMetrics {
    return this.metrics as PerformanceMetrics;
  }
}

// Usage in your app
export const performanceMonitor = new PerformanceMonitor();
```

### React Hook for Performance Monitoring

```typescript
// hooks/use-performance.ts
import { useState, useEffect } from 'react';

interface PerformanceData {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  isLoading: boolean;
}

export function usePerformance(): PerformanceData {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    lcp: null,
    fid: null,
    cls: null,
    isLoading: true,
  });
  
  useEffect(() => {
    let lcpObserver: PerformanceObserver;
    let fidObserver: PerformanceObserver;
    let clsObserver: PerformanceObserver;
    
    // LCP Observer
    lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setPerformanceData(prev => ({ ...prev, lcp: lastEntry.startTime }));
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    
    // FID Observer
    fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fid = entry.processingStart - entry.startTime;
        setPerformanceData(prev => ({ ...prev, fid }));
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
    
    // CLS Observer
    let clsValue = 0;
    clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as LayoutShift[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      setPerformanceData(prev => ({ ...prev, cls: clsValue, isLoading: false }));
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    
    return () => {
      lcpObserver?.disconnect();
      fidObserver?.disconnect();
      clsObserver?.disconnect();
    };
  }, []);
  
  return performanceData;
}
```

## Service Worker Performance

Service Workers are crucial for PWA performance. Proper caching strategies can dramatically improve loading times and offline functionality.

### Optimized Caching Strategies

**1. Cache First (Static Assets)**
```javascript
// sw.js - Optimized cache-first strategy
const STATIC_CACHE = 'static-v1.2.0';
const STATIC_ASSETS = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json'
];

self.addEventListener('fetch', (event) => {
  if (isStaticAsset(event.request.url)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            // Serve from cache immediately
            return cachedResponse;
          }
          
          // Fetch and cache for next time
          return fetch(event.request).then(response => {
            if (response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        });
      })
    );
  }
});
```

**2. Stale While Revalidate (Dynamic Content)**
```javascript
// sw.js - SWR for optimal perceived performance
const API_CACHE = 'api-v1.2.0';

async function staleWhileRevalidate(request) {
  const cache = await caches.open(API_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Fetch fresh content in background
  const fetchPromise = fetch(request).then(response => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Wait for network if no cache
  return fetchPromise;
}
```

**3. Performance-Optimized Cache Management**
```javascript
// sw.js - Smart cache cleanup
const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
const CACHE_MAX_ENTRIES = 50;

async function cleanupCache(cacheName) {
  const cache = await caches.open(cacheName);
  const requests = await cache.keys();
  
  // Remove old entries
  const now = Date.now();
  for (const request of requests) {
    const response = await cache.match(request);
    const cacheDate = response.headers.get('sw-cache-timestamp');
    
    if (cacheDate && now - parseInt(cacheDate) > CACHE_MAX_AGE) {
      await cache.delete(request);
    }
  }
  
  // Limit cache size
  const remainingRequests = await cache.keys();
  if (remainingRequests.length > CACHE_MAX_ENTRIES) {
    const excessRequests = remainingRequests.slice(CACHE_MAX_ENTRIES);
    await Promise.all(excessRequests.map(req => cache.delete(req)));
  }
}
```

## Network-Aware Optimizations

Adapt your application's behavior based on network conditions to provide optimal performance across all connection types.

### Network Information Hook

```typescript
// hooks/use-network-status.ts
import { useState, useEffect } from 'react';

interface NetworkStatus {
  online: boolean;
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g' | undefined;
  downlink: number;
  saveData: boolean;
  rtt: number;
}

export function useNetworkStatus(): NetworkStatus {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
    effectiveType: undefined,
    downlink: 0,
    saveData: false,
    rtt: 0,
  });
  
  useEffect(() => {
    const updateNetworkStatus = () => {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;
      
      setNetworkStatus({
        online: navigator.onLine,
        effectiveType: connection?.effectiveType,
        downlink: connection?.downlink || 0,
        saveData: connection?.saveData || false,
        rtt: connection?.rtt || 0,
      });
    };
    
    // Initial check
    updateNetworkStatus();
    
    // Listen for changes
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    
    // Listen for connection changes
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateNetworkStatus);
    }
    
    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      if (connection) {
        connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);
  
  return networkStatus;
}
```

### Adaptive Loading Component

```typescript
// components/adaptive-image.tsx
import { useNetworkStatus } from '../hooks/use-network-status';
import Image from 'next/image';

interface AdaptiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  quality?: number;
}

export function AdaptiveImage({ 
  src, 
  alt, 
  width, 
  height, 
  quality = 75 
}: AdaptiveImageProps) {
  const { effectiveType, saveData } = useNetworkStatus();
  
  // Adjust quality based on network conditions
  const getOptimizedQuality = () => {
    if (saveData) return 40;
    
    switch (effectiveType) {
      case 'slow-2g':
      case '2g':
        return 50;
      case '3g':
        return 65;
      case '4g':
      default:
        return quality;
    }
  };
  
  // Adjust size for slow connections
  const getOptimizedDimensions = () => {
    if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
      return {
        width: Math.floor(width * 0.8),
        height: Math.floor(height * 0.8),
      };
    }
    
    return { width, height };
  };
  
  const optimizedQuality = getOptimizedQuality();
  const { width: optimizedWidth, height: optimizedHeight } = getOptimizedDimensions();
  
  return (
    <Image
      src={src}
      alt={alt}
      width={optimizedWidth}
      height={optimizedHeight}
      quality={optimizedQuality}
      priority={effectiveType === '4g'}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
    />
  );
}
```

### Network-Aware Feature Loading

```typescript
// components/network-aware-features.tsx
import { useNetworkStatus } from '../hooks/use-network-status';
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const FullFeaturedComponent = lazy(() => import('./full-featured-component'));
const LightweightComponent = lazy(() => import('./lightweight-component'));

export function NetworkAwareFeatures() {
  const { effectiveType, saveData, online } = useNetworkStatus();
  
  const shouldLoadFullFeatures = () => {
    if (!online || saveData) return false;
    return effectiveType === '4g' || effectiveType === '3g';
  };
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {shouldLoadFullFeatures() ? (
        <FullFeaturedComponent />
      ) : (
        <LightweightComponent />
      )}
    </Suspense>
  );
}
```

## Next.js Performance Features

Leverage Next.js built-in optimizations for maximum performance.

### Image Optimization

```tsx
// components/optimized-image.tsx
import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false 
}: OptimizedImageProps) {
  const [isLoading, setLoading] = useState(true);
  
  return (
    <div className="relative overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={85}
        placeholder="blur"
        blurDataURL="/placeholder-blur.jpg"
        className={`
          duration-700 ease-in-out group-hover:opacity-75
          ${isLoading 
            ? 'scale-110 blur-2xl grayscale' 
            : 'scale-100 blur-0 grayscale-0'
          }
        `}
        onLoadingComplete={() => setLoading(false)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
```

### Font Optimization

```tsx
// app/layout.tsx - Next.js 13+ App Router
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  preload: false, // Only preload critical fonts
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
```

### Dynamic Imports and Code Splitting

```tsx
// components/lazy-components.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Component-level code splitting
const HeavyChart = dynamic(() => import('./heavy-chart'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded" />,
  ssr: false, // Disable SSR for client-only components
});

const ConditionalFeature = dynamic(() => import('./conditional-feature'), {
  loading: () => <div>Loading feature...</div>,
});

// Conditional loading based on user interaction
export function DashboardLayout() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Always loaded - critical content */}
      <BasicStats />
      
      {/* Lazy loaded chart */}
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart />
      </Suspense>
      
      {/* Conditionally loaded feature */}
      <button onClick={() => setShowAdvanced(!showAdvanced)}>
        Toggle Advanced Features
      </button>
      
      {showAdvanced && (
        <Suspense fallback={<div>Loading advanced features...</div>}>
          <ConditionalFeature />
        </Suspense>
      )}
    </div>
  );
}
```

### Route-Level Optimization

```javascript
// next.config.js - Performance optimizations
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Compress images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Bundle analyzer
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Analyze bundle in development
    if (!dev && !isServer) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: `../analyze/client-${buildId}.html`,
        })
      );
    }
    
    return config;
  },
  
  // Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
```

## Asset Optimization

### Comprehensive Image Optimization

```typescript
// utils/image-optimization.ts
interface ImageOptimizationOptions {
  quality: number;
  format: 'webp' | 'avif' | 'jpeg' | 'png';
  width?: number;
  height?: number;
}

export class ImageOptimizer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }
  
  async optimizeImage(
    file: File, 
    options: ImageOptimizationOptions
  ): Promise<Blob> {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        // Calculate dimensions
        const { width, height } = this.calculateDimensions(
          img.width, 
          img.height, 
          options.width, 
          options.height
        );
        
        // Set canvas size
        this.canvas.width = width;
        this.canvas.height = height;
        
        // Draw and compress
        this.ctx.drawImage(img, 0, 0, width, height);
        
        this.canvas.toBlob(
          (blob) => resolve(blob!),
          `image/${options.format}`,
          options.quality / 100
        );
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
  
  private calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    targetWidth?: number,
    targetHeight?: number
  ) {
    if (!targetWidth && !targetHeight) {
      return { width: originalWidth, height: originalHeight };
    }
    
    if (targetWidth && targetHeight) {
      return { width: targetWidth, height: targetHeight };
    }
    
    const aspectRatio = originalWidth / originalHeight;
    
    if (targetWidth) {
      return { width: targetWidth, height: targetWidth / aspectRatio };
    }
    
    if (targetHeight) {
      return { width: targetHeight * aspectRatio, height: targetHeight };
    }
    
    return { width: originalWidth, height: originalHeight };
  }
}

// Usage
const optimizer = new ImageOptimizer();
const optimizedBlob = await optimizer.optimizeImage(file, {
  quality: 80,
  format: 'webp',
  width: 800
});
```

### Resource Preloading

```tsx
// components/resource-preloader.tsx
import Head from 'next/head';
import { useEffect } from 'react';

interface ResourcePreloaderProps {
  criticalImages: string[];
  fonts: string[];
  scripts: string[];
}

export function ResourcePreloader({ 
  criticalImages, 
  fonts, 
  scripts 
}: ResourcePreloaderProps) {
  useEffect(() => {
    // Preload critical resources programmatically
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, [criticalImages]);
  
  return (
    <Head>
      {/* Preload fonts */}
      {fonts.map(font => (
        <link
          key={font}
          rel="preload"
          href={font}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}
      
      {/* Preload critical scripts */}
      {scripts.map(script => (
        <link
          key={script}
          rel="preload"
          href={script}
          as="script"
        />
      ))}
      
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Preconnect to critical origins */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}
```

## Code Splitting & Bundle Optimization

### Advanced Dynamic Imports

```typescript
// utils/dynamic-loader.ts
interface LoaderOptions {
  retry?: number;
  timeout?: number;
  fallback?: () => Promise<any>;
}

export class DynamicLoader {
  private static cache = new Map();
  
  static async loadComponent<T>(
    importFn: () => Promise<T>,
    options: LoaderOptions = {}
  ): Promise<T> {
    const { retry = 3, timeout = 10000, fallback } = options;
    
    // Check cache first
    const cacheKey = importFn.toString();
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    let lastError: Error;
    
    for (let attempt = 1; attempt <= retry; attempt++) {
      try {
        const result = await Promise.race([
          importFn(),
          new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('Load timeout')), timeout);
          })
        ]);
        
        this.cache.set(cacheKey, result);
        return result;
        
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < retry) {
          // Exponential backoff
          await new Promise(resolve => 
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          );
        }
      }
    }
    
    // Try fallback if available
    if (fallback) {
      try {
        const fallbackResult = await fallback();
        this.cache.set(cacheKey, fallbackResult);
        return fallbackResult;
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    }
    
    throw lastError;
  }
}

// Usage in components
const LazyComponent = dynamic(() => 
  DynamicLoader.loadComponent(
    () => import('./heavy-component'),
    {
      retry: 3,
      timeout: 5000,
      fallback: () => import('./lightweight-fallback')
    }
  )
);
```

### Bundle Analysis and Optimization

```bash
# package.json - Analysis scripts
{
  "scripts": {
    "analyze": "cross-env ANALYZE=true next build",
    "analyze:server": "cross-env BUNDLE_ANALYZE=server next build",
    "analyze:browser": "cross-env BUNDLE_ANALYZE=browser next build"
  }
}
```

```javascript
// next.config.js - Bundle analysis configuration
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  webpack: (config, { buildId, dev, isServer }) => {
    // Optimize chunks
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    
    return config;
  },
});
```

## Performance Monitoring

### Real User Monitoring (RUM)

```typescript
// lib/rum-monitor.ts
interface RUMData {
  url: string;
  userAgent: string;
  connectionType: string;
  performanceMetrics: {
    navigationTiming: PerformanceNavigationTiming;
    paintTiming: PerformancePaintTiming[];
    resourceTiming: PerformanceResourceTiming[];
  };
  customMetrics: Record<string, number>;
}

export class RUMMonitor {
  private data: Partial<RUMData> = {};
  private sendBeacon: boolean;
  
  constructor() {
    this.sendBeacon = 'sendBeacon' in navigator;
    this.collectBasicInfo();
    this.setupObservers();
  }
  
  private collectBasicInfo() {
    this.data.url = window.location.href;
    this.data.userAgent = navigator.userAgent;
    
    const connection = (navigator as any).connection;
    this.data.connectionType = connection?.effectiveType || 'unknown';
  }
  
  private setupObservers() {
    // Navigation timing
    const navObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as PerformanceNavigationTiming[];
      this.data.performanceMetrics = {
        ...this.data.performanceMetrics,
        navigationTiming: entries[0],
      };
    });
    navObserver.observe({ type: 'navigation', buffered: true });
    
    // Paint timing
    const paintObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as PerformancePaintTiming[];
      this.data.performanceMetrics = {
        ...this.data.performanceMetrics,
        paintTiming: entries,
      };
    });
    paintObserver.observe({ type: 'paint', buffered: true });
    
    // Resource timing
    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as PerformanceResourceTiming[];
      this.data.performanceMetrics = {
        ...this.data.performanceMetrics,
        resourceTiming: entries,
      };
      
      // Send data periodically
      this.throttledSend();
    });
    resourceObserver.observe({ type: 'resource', buffered: true });
    
    // Send data on page unload
    window.addEventListener('beforeunload', () => this.sendData());
  }
  
  addCustomMetric(name: string, value: number) {
    this.data.customMetrics = {
      ...this.data.customMetrics,
      [name]: value,
    };
  }
  
  private throttledSend = this.throttle(() => this.sendData(), 30000);
  
  private sendData() {
    if (!this.data.performanceMetrics) return;
    
    const payload = JSON.stringify(this.data);
    
    if (this.sendBeacon) {
      navigator.sendBeacon('/api/rum', payload);
    } else {
      fetch('/api/rum', {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(console.error);
    }
  }
  
  private throttle(func: Function, limit: number) {
    let inThrottle: boolean;
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize RUM
export const rumMonitor = new RUMMonitor();
```

### Performance Budget Monitoring

```typescript
// lib/performance-budget.ts
interface PerformanceBudget {
  lcp: number;          // < 2500ms
  fid: number;          // < 100ms
  cls: number;          // < 0.1
  tti: number;          // < 3500ms
  bundleSize: number;   // < 500KB
  imageSize: number;    // < 1MB total
}

const PERFORMANCE_BUDGET: PerformanceBudget = {
  lcp: 2500,
  fid: 100,
  cls: 0.1,
  tti: 3500,
  bundleSize: 500 * 1024, // 500KB
  imageSize: 1024 * 1024, // 1MB
};

export class PerformanceBudgetMonitor {
  private violations: Array<{ metric: string; actual: number; budget: number }> = [];
  
  checkBudget(metrics: Partial<PerformanceBudget>) {
    this.violations = [];
    
    Object.entries(metrics).forEach(([metric, value]) => {
      const budget = PERFORMANCE_BUDGET[metric as keyof PerformanceBudget];
      if (value > budget) {
        this.violations.push({
          metric,
          actual: value,
          budget,
        });
      }
    });
    
    if (this.violations.length > 0) {
      this.reportViolations();
    }
    
    return this.violations.length === 0;
  }
  
  private reportViolations() {
    console.warn('Performance Budget Violations:', this.violations);
    
    // Send to monitoring service
    fetch('/api/performance-budget-violation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        violations: this.violations,
        url: window.location.href,
        timestamp: Date.now(),
      }),
    });
  }
  
  getViolations() {
    return this.violations;
  }
}
```

## Performance Testing

### Lighthouse CI Configuration

```yaml
# .github/workflows/lighthouse-ci.yml
name: Lighthouse CI
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
      
      - name: Start application
        run: npm start &
        
      - name: Wait for server
        run: npx wait-on http://localhost:3000
      
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.12.x
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/dashboard',
        'http://localhost:3000/profile',
      ],
      startServerCommand: 'npm start',
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:pwa': ['error', { minScore: 0.9 }],
        
        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-input-delay': ['error', { maxNumericValue: 100 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        
        // Additional metrics
        'speed-index': ['error', { maxNumericValue: 3000 }],
        'interactive': ['error', { maxNumericValue: 3500 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### WebPageTest API Integration

```typescript
// scripts/webpagetest-performance.ts
interface WebPageTestOptions {
  url: string;
  location: string;
  runs: number;
  firstViewOnly: boolean;
  video: boolean;
}

export class WebPageTestMonitor {
  private apiKey: string;
  private baseUrl = 'https://www.webpagetest.org';
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async runTest(options: WebPageTestOptions) {
    const params = new URLSearchParams({
      k: this.apiKey,
      url: options.url,
      location: options.location,
      runs: options.runs.toString(),
      fvonly: options.firstViewOnly ? '1' : '0',
      video: options.video ? '1' : '0',
      f: 'json',
    });
    
    const response = await fetch(
      `${this.baseUrl}/runtest.php?${params}`
    );
    
    const result = await response.json();
    
    if (result.statusCode === 200) {
      return this.pollForResults(result.data.testId);
    }
    
    throw new Error(`Test failed: ${result.statusText}`);
  }
  
  private async pollForResults(testId: string): Promise<any> {
    const maxAttempts = 60; // 10 minutes max
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
      
      const response = await fetch(
        `${this.baseUrl}/jsonResult.php?test=${testId}`
      );
      
      const result = await response.json();
      
      if (result.statusCode === 200) {
        return result.data;
      }
      
      attempts++;
    }
    
    throw new Error('Test timeout');
  }
  
  analyzeResults(data: any) {
    const firstView = data.runs[1].firstView;
    
    return {
      loadTime: firstView.loadTime,
      firstByte: firstView.TTFB,
      startRender: firstView.render,
      speedIndex: firstView.SpeedIndex,
      lcp: firstView['chromeUserTiming.LargestContentfulPaint'],
      cls: firstView['chromeUserTiming.CumulativeLayoutShift'],
      tbt: firstView.TotalBlockingTime,
    };
  }
}
```

## Performance Budget & CI/CD

### Performance Budget Configuration

```json
{
  "budget": [
    {
      "path": "/*",
      "timings": [
        {
          "metric": "interactive",
          "budget": 3500,
          "tolerance": 200
        },
        {
          "metric": "first-contentful-paint",
          "budget": 2000,
          "tolerance": 100
        }
      ],
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": "400kb",
          "tolerance": "50kb"
        },
        {
          "resourceType": "total",
          "budget": "2mb",
          "tolerance": "200kb"
        }
      ],
      "resourceCounts": [
        {
          "resourceType": "third-party",
          "budget": 10
        }
      ]
    }
  ]
}
```

### CI/CD Performance Gates

```yaml
# .github/workflows/performance-gate.yml
name: Performance Gate
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  performance-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build and analyze bundle
        run: |
          npm run build
          npm run analyze -- --json > bundle-analysis.json
      
      - name: Check performance budget
        run: node scripts/check-performance-budget.js
      
      - name: Comment PR with results
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const analysis = JSON.parse(fs.readFileSync('bundle-analysis.json', 'utf8'));
            
            const comment = `
            ## 📊 Performance Analysis
            
            **Bundle Size**: ${(analysis.bundleSize / 1024).toFixed(2)}KB
            **Performance Score**: ${analysis.performanceScore}/100
            
            ${analysis.budgetViolations.length > 0 
              ? `⚠️ **Budget Violations**:\n${analysis.budgetViolations.map(v => `- ${v.metric}: ${v.actual} (budget: ${v.budget})`).join('\n')}`
              : '✅ All performance budgets passed!'
            }
            `;
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
      
      - name: Fail if budget exceeded
        run: |
          if [ -f "budget-violations.json" ]; then
            echo "Performance budget violations found!"
            cat budget-violations.json
            exit 1
          fi
```

## Performance Checklist

### Pre-Launch Performance Audit

**🏗️ Build & Bundle**
- [ ] Bundle size < 500KB initial load
- [ ] Code splitting implemented for routes
- [ ] Dynamic imports for heavy components
- [ ] Tree shaking enabled and working
- [ ] Unused dependencies removed
- [ ] Bundle analyzer results reviewed

**🖼️ Assets & Media**
- [ ] Images optimized and responsive
- [ ] WebP/AVIF formats used where supported
- [ ] Critical images preloaded
- [ ] Lazy loading implemented for below-fold content
- [ ] Font loading optimized with font-display: swap
- [ ] Icon fonts replaced with SVG where possible

**🌐 Network & Caching**
- [ ] Service Worker caching strategy implemented
- [ ] Static assets cached with long TTL
- [ ] API responses cached appropriately
- [ ] Network-aware features implemented
- [ ] Offline functionality working
- [ ] Resource hints (preload, prefetch) added

**⚡ Core Web Vitals**
- [ ] LCP < 2.5 seconds on all key pages
- [ ] FID < 100ms across all interactions
- [ ] CLS < 0.1 with no layout shifts
- [ ] TTI < 3.5 seconds
- [ ] TBT < 200ms

**🔧 Technical Optimizations**
- [ ] Server-side rendering (SSR) or static generation (SSG) enabled
- [ ] Critical CSS inlined
- [ ] Non-critical CSS loaded asynchronously
- [ ] JavaScript minified and compressed
- [ ] Unused JavaScript eliminated
- [ ] Third-party scripts optimized or removed

**📱 PWA Performance**
- [ ] App shell loads instantly
- [ ] Installation prompt appears quickly
- [ ] Offline page loads without delay
- [ ] Service Worker updates seamlessly
- [ ] Push notifications work reliably

**🔍 Monitoring & Testing**
- [ ] Real User Monitoring (RUM) implemented
- [ ] Performance budgets configured
- [ ] Lighthouse CI in deployment pipeline
- [ ] Error tracking for performance issues
- [ ] A/B testing for performance improvements

### Performance Testing Tools

**Automated Testing**
- **Lighthouse CI**: Continuous performance monitoring
- **WebPageTest**: Detailed performance analysis
- **Bundle Analyzer**: JavaScript bundle optimization
- **Performance Budget**: Automated budget enforcement

**Manual Testing**
- **Chrome DevTools**: Performance profiling and debugging
- **Network Throttling**: Test on slow connections
- **Device Testing**: Verify on various devices
- **Real Device Testing**: Test on actual hardware

### Performance Monitoring Dashboard

```typescript
// components/performance-dashboard.tsx
import { usePerformance } from '../hooks/use-performance';
import { useNetworkStatus } from '../hooks/use-network-status';

export function PerformanceDashboard() {
  const { lcp, fid, cls, isLoading } = usePerformance();
  const { effectiveType, downlink } = useNetworkStatus();
  
  const getScoreColor = (value: number, thresholds: number[]) => {
    if (value <= thresholds[0]) return 'text-green-600';
    if (value <= thresholds[1]) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  if (isLoading) {
    return <div>Loading performance metrics...</div>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Largest Contentful Paint</h3>
        <div className={`text-3xl font-bold ${getScoreColor(lcp || 0, [2500, 4000])}`}>
          {lcp ? `${Math.round(lcp)}ms` : 'N/A'}
        </div>
        <div className="text-sm text-gray-500">Target: < 2.5s</div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">First Input Delay</h3>
        <div className={`text-3xl font-bold ${getScoreColor(fid || 0, [100, 300])}`}>
          {fid ? `${Math.round(fid)}ms` : 'N/A'}
        </div>
        <div className="text-sm text-gray-500">Target: < 100ms</div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Cumulative Layout Shift</h3>
        <div className={`text-3xl font-bold ${getScoreColor(cls || 0, [0.1, 0.25])}`}>
          {cls ? cls.toFixed(3) : 'N/A'}
        </div>
        <div className="text-sm text-gray-500">Target: < 0.1</div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Network Quality</h3>
        <div className="text-2xl font-bold">{effectiveType?.toUpperCase() || 'Unknown'}</div>
        <div className="text-sm text-gray-500">
          {downlink ? `${downlink} Mbps` : 'Speed unknown'}
        </div>
      </div>
    </div>
  );
}
```

## Related Performance Resources

### Internal Documentation
- [Service Worker Master Guide](./service-worker-guide) - Advanced caching strategies
- [Network Information Hook](../hooks/use-network-status) - Network-aware optimizations
- [Advanced Caching Guide](./advanced-caching-guide) - Comprehensive caching patterns

### External Performance Resources
- **Web.dev Performance**: https://web.dev/performance/
- **Core Web Vitals**: https://web.dev/vitals/
- **Lighthouse Documentation**: https://developers.google.com/web/tools/lighthouse
- **WebPageTest**: https://www.webpagetest.org/
- **Next.js Performance**: https://nextjs.org/docs/advanced-features/measuring-performance

### Performance Tools
- **Lighthouse**: Built into Chrome DevTools
- **WebPageTest**: Comprehensive performance testing
- **Bundle Analyzer**: JavaScript bundle optimization
- **Performance Observer API**: Real-time metrics collection

Building high-performance PWAs requires continuous monitoring, optimization, and testing. This guide provides the foundation for achieving excellent Core Web Vitals scores and delivering exceptional user experiences across all devices and network conditions.

Remember: Performance is not a one-time optimization but an ongoing commitment that requires regular monitoring, testing, and improvement.