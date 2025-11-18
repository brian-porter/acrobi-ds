// Export auth flow module
export * from './auth-flow';

// Export all screens
export * from './screens/s-auth-create-account';
export * from './screens/s-auth-verify-contact';
export * from './screens/s-auth-fork';
export * from './screens/s-auth-handle';
export * from './screens/s-auth-add-secondary-contact';
export * from './screens/s-auth-passkey';
export * from './screens/s-auth-connect-socials';
export * from './screens/s-auth-set-favorites';

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

export async function activate(context: ExtensionContext): Promise<void> {
  // Register authentication hooks
  context.hooks.addAction('auth:started', () => {
    context.logger.info('Auth flow started');
  });

  context.hooks.addAction('auth:completed', (user: any) => {
    context.logger.info('Auth flow completed', { userId: user?.id });
  });

  context.hooks.addFilter('auth:validateStep', (step: any, data: any) => {
    // Custom step validation
    return { valid: true, errors: [] };
  });

  // Integrate with shell auth system
  if (context.shells) {
    const authShell = context.shells.get('auth');
    if (authShell) {
      context.logger.info('Auth shell integration enabled');
    }
  }

  context.logger.info('Auth Flow activated', { version: '1.0.0-alpha.1' });
}

export async function deactivate(): Promise<void> {}
