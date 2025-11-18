/**
 * @packageDocumentation
 * @module @acrobi/theme-system
 *
 * # Acrobi Theme System Package
 *
 * Dynamic theming system with CSS custom properties, dark mode support, and
 * runtime theme switching. Provides a consistent theming infrastructure for
 * all Acrobi applications.
 *
 * ## Package Contents
 *
 * ### Theme Management
 * - **Theme Switching** - Runtime theme changes via data attributes
 * - **Dark Mode** - Automatic dark mode with class-based toggle
 * - **CSS Variables** - Dynamic CSS custom properties
 * - **Theme Persistence** - Store current theme in extension storage
 *
 * ### Available Themes
 * - **Acrobi** - Default Acrobi brand theme
 * - **Light** - Clean light theme
 * - **Dark** - Professional dark theme
 * - **Custom** - Extensible custom theme support
 *
 * ## Dependencies
 *
 * **@acrobi Packages:**
 * - `@acrobi/primitives` (workspace:*) - Theme-aware components
 *
 * **Peer Dependencies:**
 * - `react@^18.0.0`
 * - `react-dom@^18.0.0`
 *
 * ## Usage Example
 *
 * ```typescript
 * import { activate } from '@acrobi/theme-system';
 *
 * // Framework activates automatically with config
 * await activate(context);
 *
 * // Switch theme at runtime
 * context.hooks.doAction('theme:switch', 'dark');
 *
 * // Toggle dark mode
 * context.hooks.doAction('theme:toggleDarkMode');
 *
 * // Listen for theme changes
 * context.hooks.addAction('theme:ready', (theme) => {
 *   console.log('Theme loaded:', theme);
 * });
 * ```
 *
 * ## Theme Structure
 *
 * Themes use CSS custom properties:
 * ```css
 * [data-theme="acrobi"] {
 *   --color-primary: ...;
 *   --color-background: ...;
 *   --color-foreground: ...;
 * }
 * ```
 *
 * ## Acrobi Framework Integration
 *
 * **Registered Hooks:**
 * - `theme:switch` - Switch to a different theme
 * - `theme:toggleDarkMode` - Toggle dark/light mode
 * - `theme:ready` - Emitted when theme system is initialized
 *
 * @version 1.0.0-alpha.1
 * @author Acrobi
 * @license MIT
 */

// ============================================================================
// THEME EXPORTS
// ============================================================================

/**
 * Export all theme definitions and utilities.
 *
 * Includes:
 * - Theme type definitions
 * - Pre-built theme configurations (Acrobi, Light, Dark)
 * - Theme utility functions
 * - CSS variable mappings
 */
export * from './themes';
export * from './theme';

// ============================================================================
// ACROBI FRAMEWORK INTEGRATION
// ============================================================================

/**
 * ExtensionContext interface for Acrobi Framework extensions.
 *
 * Provides access to framework services including logging, hooks, storage,
 * and configuration for the theme system.
 *
 * @interface ExtensionContext
 */
export interface ExtensionContext {
  /** Unique identifier for this extension (e.g., "acrobi.theme-system") */
  extensionId: string;

  /** Configuration object from acrobi.json manifest with theme settings */
  config: Record<string, any>;

  /** Persistent key-value storage for theme state */
  storage: Map<string, any>;

  /** Logging service for theme operations */
  logger: {
    /** Log informational messages */
    info: (message: string, meta?: any) => void;
    /** Log debug messages (development only) */
    debug: (message: string, meta?: any) => void;
    /** Log warning messages */
    warn: (message: string, meta?: any) => void;
    /** Log error messages */
    error: (message: string, error?: any) => void;
  };

  /** Hook system for theme events */
  hooks: {
    /** Register an action hook (fire-and-forget events) */
    addAction: (name: string, handler: Function, priority?: number) => void;
    /** Register a filter hook (transform data) */
    addFilter: (name: string, handler: Function, priority?: number) => void;
    /** Execute all registered action hooks */
    doAction: (name: string, ...args: any[]) => Promise<void>;
  };
}

/**
 * Apply a theme to the document root element.
 *
 * This function sets the `data-theme` attribute on the document root,
 * which triggers CSS custom property changes for the selected theme.
 *
 * **How It Works:**
 * 1. Checks if running in browser environment (document exists)
 * 2. Sets `data-theme` attribute on `<html>` element
 * 3. CSS selectors like `[data-theme="dark"]` apply theme variables
 *
 * **Browser Safety:**
 * - Safe to call in SSR environments (checks for document)
 * - No-op if document is undefined (Node.js/SSR)
 *
 * @param {string} themeName - Name of theme to apply (e.g., 'acrobi', 'dark', 'light')
 *
 * @example
 * ```typescript
 * // Switch to dark theme
 * applyTheme('dark');
 * // Results in: <html data-theme="dark">
 * ```
 *
 * @internal
 */
function applyTheme(themeName: string) {
  // Browser-only operation - safe for SSR
  if (typeof document !== 'undefined') {
    // Set theme attribute on root element
    // CSS: [data-theme="dark"] { --color-bg: black; }
    document.documentElement.setAttribute('data-theme', themeName);
  }
}

/**
 * Activation function called by Acrobi Framework when extension loads.
 *
 * Initializes the theme system, applies default theme, and registers
 * theme-related hooks for runtime theme management.
 *
 * **What This Does:**
 * 1. Reads default theme from config (or uses 'acrobi')
 * 2. Applies default theme to document
 * 3. Registers `theme:switch` action for theme changes
 * 4. Registers `theme:toggleDarkMode` action for dark mode toggle
 * 5. Stores theme state in extension storage
 * 6. Emits `theme:ready` event to notify other extensions
 *
 * **Configuration Options:**
 * - `defaultTheme`: Theme name to use on load (default: 'acrobi')
 * - `enableDarkMode`: Whether dark mode is available (default: true)
 *
 * **Registered Hooks:**
 * - `theme:switch`: Switch to a different theme by name
 * - `theme:toggleDarkMode`: Toggle between light and dark modes
 * - `theme:ready`: Emitted when theme system is initialized (filter)
 *
 * **Storage Keys:**
 * - `theme:current`: Currently active theme name
 * - `theme:darkModeEnabled`: Whether dark mode is enabled
 *
 * @param {ExtensionContext} context - Framework context with services
 * @returns {Promise<void>} Resolves when activation is complete
 *
 * @example
 * ```typescript
 * // Framework calls this automatically with config:
 * // acrobi.json: { "defaultTheme": "dark", "enableDarkMode": true }
 * await activate(context);
 *
 * // Later: Switch theme
 * await context.hooks.doAction('theme:switch', 'light');
 *
 * // Toggle dark mode
 * await context.hooks.doAction('theme:toggleDarkMode');
 * ```
 */
export async function activate(context: ExtensionContext): Promise<void> {
  // Read theme configuration from acrobi.json
  const config = context.config;

  // Determine default theme (fallback to 'acrobi' if not configured)
  const defaultTheme = config.defaultTheme || 'acrobi';

  // Apply the default theme to the document
  applyTheme(defaultTheme);

  // ============================================================================
  // HOOK REGISTRATION
  // ============================================================================

  /**
   * Register theme switching action hook.
   *
   * Allows any extension to trigger a theme change by dispatching:
   * `context.hooks.doAction('theme:switch', 'dark')`
   *
   * This is the primary mechanism for runtime theme changes.
   */
  context.hooks.addAction('theme:switch', (themeName: string) => {
    // Apply the new theme
    applyTheme(themeName);

    // Update stored theme
    context.storage.set('theme:current', themeName);

    // Log the theme change
    context.logger.info('Theme switched', { theme: themeName });
  });

  /**
   * Register dark mode toggle action hook.
   *
   * Allows toggling between light and dark modes by adding/removing
   * the 'dark' class on the document root element.
   *
   * Usage: `context.hooks.doAction('theme:toggleDarkMode')`
   */
  context.hooks.addAction('theme:toggleDarkMode', () => {
    if (typeof document !== 'undefined') {
      // Toggle 'dark' class and get new state
      const isDark = document.documentElement.classList.toggle('dark');

      // Update stored dark mode state
      context.storage.set('theme:darkModeEnabled', isDark);

      // Log the mode change
      context.logger.info('Dark mode toggled', { enabled: isDark });
    }
  });

  // ============================================================================
  // STATE INITIALIZATION
  // ============================================================================

  /**
   * Store initial theme state in extension storage.
   *
   * This allows other extensions to query the current theme state:
   * - `context.storage.get('theme:current')` - Get active theme
   * - `context.storage.get('theme:darkModeEnabled')` - Check dark mode
   */
  context.storage.set('theme:current', defaultTheme);
  context.storage.set('theme:darkModeEnabled', config.enableDarkMode !== false);

  // ============================================================================
  // READY EVENT
  // ============================================================================

  /**
   * Emit 'theme:ready' event to notify other extensions.
   *
   * This allows extensions that depend on theming to wait for
   * the theme system to be fully initialized before proceeding.
   *
   * Example listener:
   * ```typescript
   * context.hooks.addAction('theme:ready', (theme) => {
   *   console.log('Theme system ready with theme:', theme);
   * });
   * ```
   */
  await context.hooks.doAction('theme:ready', defaultTheme);

  // Log successful activation with theme details
  context.logger.info('Acrobi Theme System activated', {
    version: '1.0.0-alpha.1',
    defaultTheme,
    darkModeEnabled: config.enableDarkMode !== false,
    features: ['theme-switching', 'dark-mode', 'css-variables']
  });
}

/**
 * Deactivation function called by Acrobi Framework when extension unloads.
 *
 * Resets the theme system to default state by removing theme attributes
 * and dark mode classes from the document root.
 *
 * **What This Does:**
 * 1. Removes `data-theme` attribute from document root
 * 2. Removes `dark` class from document root
 * 3. Resets document to browser default styling
 *
 * **Browser Safety:**
 * - Safe to call in SSR environments (checks for document)
 * - Gracefully handles missing document object
 *
 * @returns {Promise<void>} Resolves when deactivation is complete
 *
 * @example
 * ```typescript
 * // Framework calls this automatically
 * await deactivate();
 * // Results in: <html> (no theme attributes)
 * ```
 */
export async function deactivate(): Promise<void> {
  // Reset theme system to browser defaults
  if (typeof document !== 'undefined') {
    // Remove theme attribute (resets CSS variables to defaults)
    document.documentElement.removeAttribute('data-theme');

    // Remove dark mode class (resets to light mode)
    document.documentElement.classList.remove('dark');
  }

  // Note: Hook cleanup is handled automatically by the framework
  // Note: Storage is managed by the framework and persists
}
