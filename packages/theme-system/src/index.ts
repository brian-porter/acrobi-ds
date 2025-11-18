/**
 * @acrobi/theme-system
 * Dynamic theming system with CSS custom properties
 */

// Export all themes
export * from './themes';
export * from './theme';

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
 * Apply theme to document
 */
function applyTheme(themeName: string) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', themeName);
  }
}

/**
 * Activation function for Acrobi Framework
 * Called when the extension is loaded
 */
export async function activate(context: ExtensionContext): Promise<void> {
  const config = context.config;

  // Apply default theme
  const defaultTheme = config.defaultTheme || 'acrobi';
  applyTheme(defaultTheme);

  // Register theme switching hook
  context.hooks.addAction('theme:switch', (themeName: string) => {
    applyTheme(themeName);
    context.logger.info('Theme switched', { theme: themeName });
  });

  // Register dark mode toggle hook
  context.hooks.addAction('theme:toggleDarkMode', () => {
    if (typeof document !== 'undefined') {
      const isDark = document.documentElement.classList.toggle('dark');
      context.logger.info('Dark mode toggled', { enabled: isDark });
    }
  });

  // Store theme manager in context
  context.storage.set('theme:current', defaultTheme);
  context.storage.set('theme:darkModeEnabled', config.enableDarkMode !== false);

  // Emit theme ready event
  await context.hooks.doAction('theme:ready', defaultTheme);

  context.logger.info('Acrobi Theme System activated', {
    version: '1.0.0-alpha.1',
    defaultTheme,
    darkModeEnabled: config.enableDarkMode !== false
  });
}

/**
 * Deactivation function for Acrobi Framework
 * Called when the extension is being unloaded
 */
export async function deactivate(): Promise<void> {
  // Reset to default theme
  if (typeof document !== 'undefined') {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark');
  }
}
