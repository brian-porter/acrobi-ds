/**
 * @acrobi/primitives
 * Core UI building blocks for Acrobi applications
 */

// Export all primitive components
export * from './components/index';

// Export utilities
export * from './lib';

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
  shells?: {
    get: (name: string) => any;
  };
}

/**
 * Activation function for Acrobi Framework
 * Called when the extension is loaded
 */
export async function activate(context: ExtensionContext): Promise<void> {
  // Register theme integration hook
  context.hooks.addAction('theme:changed', (theme: any) => {
    context.logger.debug('Theme changed, primitives components will adapt', { theme });
  });

  // Register component mount tracking (optional for analytics)
  context.hooks.addFilter('component:beforeMount', (component: any) => {
    context.logger.debug('Component mounting', { component: component?.name });
    return component;
  });

  // Log activation
  context.logger.info('Acrobi Primitives activated', {
    version: '1.0.0-alpha.1',
    components: 50
  });
}

/**
 * Deactivation function for Acrobi Framework
 * Called when the extension is being unloaded
 */
export async function deactivate(): Promise<void> {
  // Cleanup: remove event listeners, clear caches, etc.
  // Primitives are stateless, so minimal cleanup needed
}
