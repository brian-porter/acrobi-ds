// Export location map component
export * from './location-map';

// Re-export geolocation hook from aae-hooks
export { useGeolocation } from '@acrobi/aae-hooks';

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

export async function activate(context: ExtensionContext): Promise<void> {
  // Register location hooks
  context.hooks.addAction('location:requested', () => {
    context.logger.info('Location requested');
  });

  context.hooks.addAction('location:success', (position: any) => {
    context.logger.info('Location obtained', {
      lat: position?.coords?.latitude,
      lng: position?.coords?.longitude
    });
  });

  context.hooks.addAction('location:error', (error: any) => {
    context.logger.error('Location error', error);
  });

  context.logger.info('Location Services activated', { version: '1.0.0-alpha.1' });
}

export async function deactivate(): Promise<void> {}
