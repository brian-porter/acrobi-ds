/**
 * @acrobi/service-worker
 * PWA service worker with advanced caching, background sync, and offline support
 */

// Export service worker registration
export { registerServiceWorker, unregisterServiceWorker } from './register';

// Export service worker utilities (browser-only)
export * from './sw';

// Acrobi Framework Extension Integration
export interface ExtensionContext {
  extensionId: string;
  config: Record<string, any>;
  storage: Map<string, any>;
  logger: {
    info: (message: string, meta?: any) => void;
    debug: (message: string, meta?: any) => void;
    warn: (message: string, meta?: any) => void;
    error: (message: string, error?: any) => void;
  };
  hooks: {
    addAction: (name: string, handler: Function, priority?: number) => void;
    addFilter: (name: string, handler: Function, priority?: number) => void;
    doAction: (name: string, ...args: any[]) => Promise<void>;
  };
}

/**
 * Activation function for Acrobi Framework
 * Called when the extension is loaded
 */
export async function activate(context: ExtensionContext): Promise<void> {
  const config = context.config;

  // Check if service workers are supported
  if (!('serviceWorker' in navigator)) {
    context.logger.warn('Service Workers not supported in this browser');
    return;
  }

  try {
    // Register service worker
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });

    context.logger.info('Service Worker registered', {
      scope: registration.scope,
      version: '1.0.0-alpha.1'
    });

    // Store registration in context
    context.storage.set('sw:registration', registration);

    // Set up update listener
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;

      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker available
            context.hooks.doAction('sw:updateAvailable', registration);
            context.logger.info('Service Worker update available');
          }
        });
      }

      context.hooks.doAction('sw:updateFound', registration);
    });

    // Set up offline/online listeners
    window.addEventListener('offline', () => {
      context.logger.warn('App is offline');
      context.hooks.doAction('app:offline');
    });

    window.addEventListener('online', () => {
      context.logger.info('App is online');
      context.hooks.doAction('app:online');
    });

    // Register background sync hook (if enabled)
    if (config.enableBackgroundSync && 'sync' in registration) {
      context.hooks.addAction('sw:backgroundSync', async (tag: string) => {
        try {
          await registration.sync.register(tag);
          context.logger.info('Background sync registered', { tag });
        } catch (error) {
          context.logger.error('Background sync registration failed', error);
        }
      });
    }

    // Emit service worker ready event
    await context.hooks.doAction('sw:ready', registration);

  } catch (error) {
    context.logger.error('Service Worker registration failed', error);
  }
}

/**
 * Deactivation function for Acrobi Framework
 * Called when the extension is being unloaded
 */
export async function deactivate(): Promise<void> {
  // Unregister service worker
  const registration = await navigator.serviceWorker.getRegistration();

  if (registration) {
    await registration.unregister();
  }
}
