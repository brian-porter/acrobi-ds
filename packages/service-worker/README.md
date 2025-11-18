# @acrobi/service-worker

PWA service worker capabilities with multi-strategy caching, background sync, and offline support for Acrobi applications.

## Installation

```bash
npm install @acrobi/service-worker
# or
pnpm add @acrobi/service-worker
# or
yarn add @acrobi/service-worker
```

## Usage

### Basic Setup

```tsx
import { registerServiceWorker } from '@acrobi/service-worker';

// Register service worker on app mount
useEffect(() => {
  registerServiceWorker('/sw.js');
}, []);
```

### With Acrobi Framework

The package will automatically register the service worker when activated:

```typescript
import { activate } from '@acrobi/service-worker';

// Framework will call activate automatically
await activate(context);
```

## Features

### Caching Strategies

- **Cache First** - Serve from cache, fallback to network
- **Network First** - Fetch from network, fallback to cache
- **Stale While Revalidate** - Serve cached content while fetching fresh content

### Background Sync

Automatically sync data when connection is restored:

```tsx
// Queue data for background sync
await registration.sync.register('sync-posts');
```

### Offline Support

Automatic offline detection and fallback:

```tsx
window.addEventListener('offline', () => {
  console.log('App is offline');
});

window.addEventListener('online', () => {
  console.log('App is back online');
});
```

## Configuration

Configure via Acrobi Framework manifest:

```json
{
  "cacheStrategy": "networkFirst",
  "enableBackgroundSync": true,
  "cacheName": "my-app-cache-v1"
}
```

## Acrobi Framework Integration

### Hooks Available

- `sw:ready` - Service worker registered and ready
- `sw:updateAvailable` - New version of service worker available
- `sw:updateFound` - Service worker update in progress
- `app:offline` - App went offline
- `app:online` - App came online
- `sw:backgroundSync` - Trigger background sync

### Event Handlers

```typescript
// Listen for service worker updates
context.hooks.addAction('sw:updateAvailable', (registration) => {
  // Prompt user to reload
  if (confirm('New version available! Reload?')) {
    window.location.reload();
  }
});

// Handle offline mode
context.hooks.addAction('app:offline', () => {
  // Show offline banner
});
```

## API

### registerServiceWorker(swPath, options)

Register a service worker:

```tsx
registerServiceWorker('/sw.js', {
  scope: '/',
  updateViaCache: 'none'
});
```

### unregisterServiceWorker()

Unregister the current service worker:

```tsx
await unregisterServiceWorker();
```

## Browser Support

Requires browsers with Service Worker support:
- Chrome 40+
- Firefox 44+
- Safari 11.1+
- Edge 17+

## License

MIT © Acrobi
