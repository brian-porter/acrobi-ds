export * from './components';

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
  context.logger.info('Form Components activated', { version: '1.0.0-alpha.1' });
}

export async function deactivate(): Promise<void> {}
