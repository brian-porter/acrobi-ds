// Export all components
export * from './components/data-table';
export * from './components/empty-state';
export * from './components/list-grid';
export * from './components/breadcrumb';

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
  // Register data display hooks
  context.hooks.addFilter('data:beforeRender', (data: any) => {
    context.logger.debug('Data rendering', { rowCount: data?.length });
    return data;
  });

  context.hooks.addAction('data:sorted', (sortConfig: any) => {
    context.logger.debug('Data sorted', sortConfig);
  });

  context.hooks.addAction('data:filtered', (filterConfig: any) => {
    context.logger.debug('Data filtered', filterConfig);
  });

  context.logger.info('Data Display activated', { version: '1.0.0-alpha.1' });
}

export async function deactivate(): Promise<void> {}
