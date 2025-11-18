/**
 * @packageDocumentation
 * @module @acrobi/primitives
 *
 * # Acrobi Primitives Package
 *
 * This package provides the foundational UI building blocks for all Acrobi applications.
 * It serves as the base layer in the Acrobi Design System package hierarchy.
 *
 * ## Package Contents
 *
 * ### Components (50+)
 * - **Form Controls**: Button, Input, Checkbox, Radio, Select, Slider, Switch, Textarea
 * - **Layout**: Card, Sheet, Dialog, Popover, Tooltip, Accordion, Tabs
 * - **Navigation**: Breadcrumb, Menu, DropdownMenu, NavigationMenu
 * - **Feedback**: Alert, Toast, Progress, Skeleton, Badge, Avatar
 * - **Data Display**: Table, DataTable, Separator
 * - **Typography**: Text, Label, Heading
 * - **Overlays**: Dialog, Sheet, Popover, HoverCard
 * - **Advanced**: Calendar, Command, ContextMenu, ScrollArea
 *
 * ### Utilities
 * - `cn()`: Tailwind class name merger (clsx + tailwind-merge)
 * - `cva()`: Class Variance Authority for variant management
 * - `FileSaver`: AAE file saving utilities
 *
 * ## Dependencies
 *
 * This package has NO dependencies on other @acrobi packages.
 * It is the foundation that all other packages build upon.
 *
 * **Direct Dependencies:**
 * - `class-variance-authority` - Variant management
 * - `clsx` - Class name composition
 * - `tailwind-merge` - Tailwind class deduplication
 *
 * **Peer Dependencies:**
 * - `react@^18.0.0`
 * - `react-dom@^18.0.0`
 * - `gsap@^3.12.0` (optional - for animations)
 * - `vaul@^1.0.0` (optional - for drawers)
 *
 * ## Usage Example
 *
 * ```typescript
 * import { Button, Input, Card, cn } from '@acrobi/primitives';
 *
 * function MyComponent() {
 *   return (
 *     <Card className={cn("p-4", "border")}>
 *       <Input placeholder="Enter text" />
 *       <Button variant="primary">Submit</Button>
 *     </Card>
 *   );
 * }
 * ```
 *
 * ## Acrobi Framework Integration
 *
 * This package integrates with the Acrobi Framework extension system.
 * When activated as an extension, it registers hooks for theme changes
 * and component lifecycle events.
 *
 * **Registered Hooks:**
 * - `theme:changed` - Responds to theme updates
 * - `component:beforeMount` - Tracks component mounting
 *
 * @version 1.0.0-alpha.1
 * @author Acrobi
 * @license MIT
 */

// ============================================================================
// COMPONENT EXPORTS
// ============================================================================

/**
 * Export all primitive UI components.
 *
 * This includes 50+ components organized into categories:
 * - Form controls (Button, Input, etc.)
 * - Layout components (Card, Sheet, etc.)
 * - Navigation (Breadcrumb, Menu, etc.)
 * - Feedback (Alert, Toast, etc.)
 * - Data display (Table, etc.)
 * - Typography (Text, Label, etc.)
 * - Overlays (Dialog, Popover, etc.)
 *
 * All components are built with:
 * - TypeScript for type safety
 * - Tailwind CSS for styling
 * - Radix UI primitives for accessibility
 * - CVA for variant management
 */
export * from './components/index';

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

/**
 * Export utility functions and helpers.
 *
 * Utilities included:
 * - `cn()` - Tailwind class merger (clsx + tailwind-merge)
 * - `cva()` - Class Variance Authority for variants
 * - `VariantProps` - Type helper for CVA variants
 * - FileSaver utilities for AAE file operations
 */
export * from './lib';

// ============================================================================
// ACROBI FRAMEWORK INTEGRATION
// ============================================================================

/**
 * ExtensionContext interface for Acrobi Framework extensions.
 *
 * This context is provided to all extension activation functions and
 * provides access to framework services.
 *
 * @interface ExtensionContext
 *
 * @property {string} extensionId - Unique identifier for this extension
 * @property {Record<string, any>} config - Extension configuration from acrobi.json
 * @property {Map<string, any>} storage - Persistent storage for extension data
 * @property {object} logger - Logging service with debug, info, warn, error
 * @property {object} hooks - Event system for actions and filters
 * @property {object} [shells] - Optional shell service access
 *
 * @example
 * ```typescript
 * export async function activate(context: ExtensionContext) {
 *   context.logger.info('Extension activated');
 *   context.hooks.addAction('theme:changed', handleThemeChange);
 * }
 * ```
 */
export interface ExtensionContext {
  /** Unique identifier for this extension (e.g., "acrobi.primitives") */
  extensionId: string;

  /** Configuration object from acrobi.json manifest */
  config: Record<string, any>;

  /** Persistent key-value storage for extension data */
  storage: Map<string, any>;

  /** Logging service for debugging and monitoring */
  logger: {
    /** Log informational messages */
    info: (message: string, meta?: any) => void;
    /** Log debug messages (only in development) */
    debug: (message: string, meta?: any) => void;
    /** Log warning messages */
    warn: (message: string, meta?: any) => void;
    /** Log error messages */
    error: (message: string, error?: any) => void;
  };

  /** Hook system for event-driven architecture */
  hooks: {
    /** Register an action hook (fire-and-forget events) */
    addAction: (name: string, handler: Function, priority?: number) => void;
    /** Register a filter hook (transform data) */
    addFilter: (name: string, handler: Function, priority?: number) => void;
    /** Execute all registered action hooks */
    doAction: (name: string, ...args: any[]) => Promise<void>;
  };

  /** Optional shell service access for inter-extension communication */
  shells?: {
    /** Get a shell instance by name */
    get: (name: string) => any;
  };
}

/**
 * Activation function called by Acrobi Framework when extension loads.
 *
 * This function is called once when the extension is first loaded.
 * It should register hooks, initialize services, and prepare the extension.
 *
 * **What This Does:**
 * 1. Registers `theme:changed` action hook to respond to theme updates
 * 2. Registers `component:beforeMount` filter for component lifecycle tracking
 * 3. Logs activation with version and component count
 *
 * **Registered Hooks:**
 * - `theme:changed`: Notified when application theme changes (light/dark/custom)
 * - `component:beforeMount`: Filter allowing component inspection before mount
 *
 * @param {ExtensionContext} context - Framework context with services
 * @returns {Promise<void>} Resolves when activation is complete
 *
 * @example
 * ```typescript
 * // Framework calls this automatically
 * await activate(context);
 * ```
 */
export async function activate(context: ExtensionContext): Promise<void> {
  // Register theme integration hook
  // This allows primitives to respond to theme changes across the application
  context.hooks.addAction('theme:changed', (theme: any) => {
    context.logger.debug('Theme changed, primitives components will adapt', { theme });
  });

  // Register component mount tracking (optional for analytics)
  // This filter allows inspection/modification of components before mounting
  context.hooks.addFilter('component:beforeMount', (component: any) => {
    context.logger.debug('Component mounting', { component: component?.name });
    return component;
  });

  // Log successful activation with metadata
  context.logger.info('Acrobi Primitives activated', {
    version: '1.0.0-alpha.1',
    components: 50,
    features: ['theme-aware', 'accessible', 'type-safe']
  });
}

/**
 * Deactivation function called by Acrobi Framework when extension unloads.
 *
 * This function is called when the extension is being removed or the application
 * is shutting down. It should clean up resources, remove event listeners, and
 * perform any necessary teardown.
 *
 * **What This Does:**
 * - Primitives are stateless, so minimal cleanup is needed
 * - Event listeners are automatically cleaned up by the framework
 * - No persistent resources to release
 *
 * @returns {Promise<void>} Resolves when deactivation is complete
 *
 * @example
 * ```typescript
 * // Framework calls this automatically
 * await deactivate();
 * ```
 */
export async function deactivate(): Promise<void> {
  // Cleanup: remove event listeners, clear caches, etc.
  // Primitives are stateless, so minimal cleanup needed
  // Hook cleanup is handled automatically by the framework
}
