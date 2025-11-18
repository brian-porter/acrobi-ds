// Export scanner view module
export * from './scanner-view';

// Re-export scanning hooks from aae-hooks
export { useBarcodeScanner, useQRScanner } from '@acrobi/aae-hooks';

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
  // Register scanning hooks
  context.hooks.addAction('scan:started', (type: string) => {
    context.logger.info(`Scanning started: ${type}`);
  });

  context.hooks.addAction('scan:success', (result: any) => {
    context.logger.info('Scan successful', { format: result?.format, text: result?.text?.substring(0, 50) });
  });

  context.hooks.addAction('scan:error', (error: any) => {
    context.logger.error('Scan error', error);
  });

  context.logger.info('Scanning activated', { version: '1.0.0-alpha.1' });
}

export async function deactivate(): Promise<void> {}
