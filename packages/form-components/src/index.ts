/**
 * @packageDocumentation
 * @module @acrobi/form-components
 *
 * # Acrobi Form Components Package
 *
 * Complete form system with 8 field types, validation support, and full accessibility.
 * Built on top of @acrobi/primitives for consistent styling and behavior.
 *
 * ## Package Contents
 *
 * ### Form Field Components (8)
 * 1. **TextField** - Single-line text input with label and error states
 * 2. **TextareaField** - Multi-line text input with character counting
 * 3. **SelectField** - Dropdown select with search and multi-select
 * 4. **CheckboxField** - Single checkbox with label
 * 5. **RadioField** - Radio button group with multiple options
 * 6. **SwitchField** - Toggle switch with on/off states
 * 7. **SliderField** - Range slider with min/max values
 * 8. **UploadField** - File upload with drag-drop and preview
 *
 * Each component includes:
 * - Label with optional indicator
 * - Error message display
 * - Helper text support
 * - Disabled state handling
 * - Accessible markup (ARIA labels, roles)
 *
 * ## Dependencies
 *
 * **@acrobi Packages:**
 * - `@acrobi/primitives` (workspace:*) - Base UI components
 *
 * **Peer Dependencies:**
 * - `react@^18.0.0`
 * - `react-dom@^18.0.0`
 *
 * ## Usage Example
 *
 * ```typescript
 * import {
 *   TextField,
 *   SelectField,
 *   CheckboxField,
 *   Button
 * } from '@acrobi/form-components';
 *
 * function ContactForm() {
 *   return (
 *     <form>
 *       <TextField
 *         label="Full Name"
 *         required
 *         placeholder="John Doe"
 *       />
 *
 *       <TextField
 *         label="Email"
 *         type="email"
 *         required
 *         error="Please enter a valid email"
 *       />
 *
 *       <SelectField
 *         label="Department"
 *         options={[
 *           { value: 'sales', label: 'Sales' },
 *           { value: 'support', label: 'Support' }
 *         ]}
 *       />
 *
 *       <CheckboxField
 *         label="Subscribe to newsletter"
 *       />
 *
 *       <Button type="submit">Submit</Button>
 *     </form>
 *   );
 * }
 * ```
 *
 * ## Acrobi Framework Integration
 *
 * This package integrates with the Acrobi Framework extension system.
 * When activated, it provides hooks for form validation and submission.
 *
 * **Registered Hooks:**
 * - `form:validate` - Validate form data before submission
 * - `form:submit` - Handle form submission events
 * - `form:error` - Handle form validation errors
 *
 * @version 1.0.0-alpha.1
 * @author Acrobi
 * @license MIT
 */

// ============================================================================
// COMPONENT EXPORTS
// ============================================================================

/**
 * Export all form field components.
 *
 * Components included:
 * - TextField: Single-line text input
 * - TextareaField: Multi-line text input
 * - SelectField: Dropdown select
 * - CheckboxField: Checkbox input
 * - RadioField: Radio button group
 * - SwitchField: Toggle switch
 * - SliderField: Range slider
 * - UploadField: File upload with drag-drop
 *
 * All components follow consistent API patterns:
 * - `label` prop for field label
 * - `error` prop for error message
 * - `helperText` prop for additional help
 * - `required` prop for required indicator
 * - `disabled` prop for disabled state
 */
export * from './components';

// ============================================================================
// ACROBI FRAMEWORK INTEGRATION
// ============================================================================

/**
 * ExtensionContext interface for Acrobi Framework extensions.
 *
 * Provides access to framework services including logging, hooks, storage, and configuration.
 *
 * @interface ExtensionContext
 */
export interface ExtensionContext {
  /** Unique identifier for this extension (e.g., "acrobi.form-components") */
  extensionId: string;

  /** Configuration object from acrobi.json manifest */
  config: Record<string, any>;

  /** Persistent key-value storage for extension data */
  storage: Map<string, any>;

  /** Logging service for debugging and monitoring */
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

  /** Hook system for event-driven architecture */
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
 * Activation function called by Acrobi Framework when extension loads.
 *
 * This function registers form-related hooks and initializes the form system.
 *
 * **What This Does:**
 * 1. Registers `form:validate` filter for custom validation logic
 * 2. Registers `form:submit` action to track form submissions
 * 3. Registers `form:error` action to handle validation errors
 * 4. Logs activation with version information
 *
 * **Registered Hooks:**
 * - `form:validate`: Filter allowing custom validation before submission
 * - `form:submit`: Action fired when any form is submitted
 * - `form:error`: Action fired when form validation fails
 *
 * @param {ExtensionContext} context - Framework context with services
 * @returns {Promise<void>} Resolves when activation is complete
 *
 * @example
 * ```typescript
 * // Framework calls this automatically
 * await activate(context);
 *
 * // Example: Add custom validation
 * context.hooks.addFilter('form:validate', (formData, schema) => {
 *   // Custom validation logic
 *   return { valid: true, errors: {} };
 * });
 * ```
 */
export async function activate(context: ExtensionContext): Promise<void> {
  // Register form validation filter
  // This allows extensions to add custom validation logic
  context.hooks.addFilter('form:validate', async (formData: any, schema: any) => {
    context.logger.debug('Validating form', { fields: Object.keys(formData) });
    // Default: pass through, let other validators handle it
    return { valid: true, errors: {} };
  });

  // Register form submission action
  // This tracks when forms are submitted for analytics/logging
  context.hooks.addAction('form:submit', async (formData: any) => {
    context.logger.info('Form submitted', {
      fieldCount: Object.keys(formData).length
    });
  });

  // Register form error handler
  // This allows centralized error handling
  context.hooks.addAction('form:error', async (errors: any) => {
    context.logger.warn('Form validation errors', { errorCount: Object.keys(errors).length });
  });

  // Log successful activation
  context.logger.info('Form Components activated', {
    version: '1.0.0-alpha.1',
    components: 8,
    features: ['validation', 'accessibility', 'error-handling']
  });
}

/**
 * Deactivation function called by Acrobi Framework when extension unloads.
 *
 * Performs cleanup when the form components extension is being removed.
 *
 * **What This Does:**
 * - Form components are stateless, so minimal cleanup needed
 * - Hook cleanup is handled automatically by the framework
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
  // Cleanup: form components are stateless
  // Hook cleanup is handled automatically by the framework
}
