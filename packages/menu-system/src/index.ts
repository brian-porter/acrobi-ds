// Export all menu components
export * from './menus/menu-actions';
export * from './menus/menu-posts';
export * from './menus/menu-admin';
export * from './menus/menu-view-style';
export * from './menus/menu-sort-style';
export * from './menus/menu-search';
export * from './menus/menu-privacy';

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
  // Register menu hooks
  context.hooks.addAction('menu:opened', (menuType: string) => {
    context.logger.debug(`Menu opened: ${menuType}`);
  });

  context.hooks.addAction('menu:itemSelected', (menuType: string, itemId: string) => {
    context.logger.info(`Menu item selected`, { menuType, itemId });
  });

  context.hooks.addFilter('menu:items', (items: any[], menuType: string) => {
    context.logger.debug(`Filtering menu items`, { menuType, count: items.length });
    return items;
  });

  context.logger.info('Menu System activated', { version: '1.0.0-alpha.1', menus: 7 });
}

export async function deactivate(): Promise<void> {}
