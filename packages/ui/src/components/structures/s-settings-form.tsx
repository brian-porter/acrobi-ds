import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { TextField } from './text-field';
import { SelectField } from './select-field';
import { SwitchField } from './switch-field';
import { SliderField } from './slider-field';
import { Button } from '../primitives/button';
import { Badge } from '../primitives/badge';
import { Icon } from '../primitives/icon';

/**
 * S-SettingsForm variant styles using Acrobi Design System classes
 * Form layout structure for general settings page
 */
const sSettingsFormVariants = cva(
  'settings-form space-y-6',
  {
    variants: {
      variant: {
        default: '',
        card: 'bg-card border border-border rounded-lg p-6',
        minimal: 'space-y-4',
        compact: 'space-y-3',
      },
      size: {
        sm: 'max-w-md',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
        full: 'w-full',
      },
      layout: {
        vertical: 'flex flex-col',
        horizontal: 'grid grid-cols-1 md:grid-cols-2 gap-6',
        mixed: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      layout: 'vertical',
    },
  }
);

const sSettingsSectionVariants = cva(
  'settings-section space-y-4',
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border border-border rounded-lg p-4',
        minimal: 'space-y-2',
        highlighted: 'bg-primary/5 border border-primary/20 rounded-lg p-4',
      },
      spacing: {
        tight: 'space-y-2',
        default: 'space-y-4',
        loose: 'space-y-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      spacing: 'default',
    },
  }
);

const sSettingsItemVariants = cva(
  'settings-item',
  {
    variants: {
      layout: {
        inline: 'flex items-center justify-between',
        stacked: 'space-y-2',
        card: 'p-4 border border-border rounded-lg',
      },
      interactive: {
        true: 'hover:bg-accent/50 cursor-pointer transition-colors rounded-sm px-2 py-1 -mx-2 -my-1',
        false: '',
      },
    },
    defaultVariants: {
      layout: 'inline',
      interactive: false,
    },
  }
);

export interface SettingOption {
  /**
   * Option label
   */
  label: string;
  /**
   * Option value
   */
  value: string | number | boolean;
  /**
   * Option description
   */
  description?: string;
  /**
   * Option icon
   */
  icon?: string;
  /**
   * Whether option is disabled
   */
  disabled?: boolean;
}

export interface SettingField {
  /**
   * Field identifier
   */
  id: string;
  /**
   * Field label
   */
  label: string;
  /**
   * Field description
   */
  description?: string;
  /**
   * Field type
   */
  type: 'toggle' | 'select' | 'text' | 'number' | 'slider' | 'action' | 'info';
  /**
   * Current field value
   */
  value?: any;
  /**
   * Field placeholder (for text/number inputs)
   */
  placeholder?: string;
  /**
   * Field icon
   */
  icon?: string;
  /**
   * Icon color
   */
  iconColor?: 'p500' | 'n700' | 'n500' | 'n300' | 'inherit';
  /**
   * Select options (for select type)
   */
  options?: SettingOption[];
  /**
   * Slider configuration (for slider type)
   */
  slider?: {
    min: number;
    max: number;
    step?: number;
    unit?: string;
  };
  /**
   * Field layout style
   */
  layout?: 'inline' | 'stacked' | 'card';
  /**
   * Whether field is disabled
   */
  disabled?: boolean;
  /**
   * Whether field is loading
   */
  loading?: boolean;
  /**
   * Whether field is required
   */
  required?: boolean;
  /**
   * Field validation error
   */
  error?: string;
  /**
   * Action button configuration (for action type)
   */
  action?: {
    label: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    icon?: string;
    loading?: boolean;
    disabled?: boolean;
  };
  /**
   * Info badge configuration (for info type)
   */
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  /**
   * Field change handler
   */
  onChange?: (value: any) => void;
  /**
   * Action click handler (for action type)
   */
  onAction?: () => void;
}

export interface SettingsSection {
  /**
   * Section identifier
   */
  id: string;
  /**
   * Section title
   */
  title: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Section icon
   */
  icon?: string;
  /**
   * Section variant
   */
  variant?: 'default' | 'bordered' | 'minimal' | 'highlighted';
  /**
   * Section fields
   */
  fields: SettingField[];
  /**
   * Whether section is collapsible
   */
  collapsible?: boolean;
  /**
   * Whether section is initially collapsed
   */
  defaultCollapsed?: boolean;
  /**
   * Section actions
   */
  actions?: Array<{
    label: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    icon?: string;
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
  }>;
}

export interface SSettingsFormProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sSettingsFormVariants> {
  /**
   * Settings sections to display
   */
  sections: SettingsSection[];
  /**
   * Current form values
   */
  values?: Record<string, any>;
  /**
   * Form validation errors
   */
  errors?: Record<string, string>;
  /**
   * Whether form is in loading state
   */
  loading?: boolean;
  /**
   * Whether form is disabled
   */
  disabled?: boolean;
  /**
   * Form change handler
   */
  onChange?: (fieldId: string, value: any) => void;
  /**
   * Form save handler
   */
  onSave?: (values: Record<string, any>) => void;
  /**
   * Form reset handler
   */
  onReset?: () => void;
  /**
   * Additional header content
   */
  header?: React.ReactNode;
  /**
   * Additional footer content
   */
  footer?: React.ReactNode;
  /**
   * Whether to show save/reset actions
   */
  showActions?: boolean;
  /**
   * Actions alignment
   */
  actionsAlignment?: 'left' | 'center' | 'right';
}

/**
 * S-SettingsForm - Form layout structure for general settings page
 *
 * This structure provides a flexible interface for managing various application
 * and user settings. It supports different field types, section organization,
 * and customizable layouts for different types of settings.
 *
 * Key features:
 * - Multiple settings sections with different visual variants
 * - Support for various field types (toggle, select, text, slider, etc.)
 * - Flexible layouts (inline, stacked, card) for different field types
 * - Action buttons and info displays
 * - Collapsible sections for better organization
 * - Loading and disabled states
 * - Form validation and error handling
 * - Auto-save or manual save options
 * - Responsive design with proper spacing
 * - Accessibility support with proper labels and ARIA attributes
 *
 * @example
 * ```tsx
 * <SSettingsForm
 *   sections={[
 *     {
 *       id: "appearance",
 *       title: "Appearance",
 *       description: "Customize how the application looks",
 *       icon: "palette",
 *       fields: [
 *         {
 *           id: "theme",
 *           label: "Theme",
 *           description: "Choose your preferred color theme",
 *           type: "select",
 *           value: "dark",
 *           options: [
 *             { label: "Light", value: "light" },
 *             { label: "Dark", value: "dark" },
 *             { label: "Auto", value: "auto" }
 *           ]
 *         },
 *         {
 *           id: "animations",
 *           label: "Animations",
 *           description: "Enable interface animations",
 *           type: "toggle",
 *           value: true
 *         }
 *       ]
 *     },
 *     {
 *       id: "notifications",
 *       title: "Notifications",
 *       fields: [
 *         {
 *           id: "emailNotifications",
 *           label: "Email Notifications",
 *           type: "toggle",
 *           value: false
 *         },
 *         {
 *           id: "notificationVolume",
 *           label: "Notification Volume",
 *           type: "slider",
 *           value: 75,
 *           slider: { min: 0, max: 100, step: 5, unit: "%" }
 *         }
 *       ]
 *     }
 *   ]}
 *   onChange={(fieldId, value) => console.log('Setting changed:', fieldId, value)}
 *   onSave={(values) => console.log('Save settings:', values)}
 * />
 * ```
 */
const SSettingsForm = React.forwardRef<HTMLDivElement, SSettingsFormProps>(
  (
    {
      className,
      sections = [],
      values = {},
      errors = {},
      loading = false,
      disabled = false,
      onChange,
      onSave,
      onReset,
      header,
      footer,
      showActions = true,
      actionsAlignment = 'right',
      variant,
      size,
      layout,
      ...props
    },
    ref
  ) => {
    const [collapsedSections, setCollapsedSections] = React.useState<Set<string>>(
      new Set(sections.filter(s => s.defaultCollapsed).map(s => s.id))
    );

    const toggleSection = React.useCallback((sectionId: string) => {
      setCollapsedSections(prev => {
        const newSet = new Set(prev);
        if (newSet.has(sectionId)) {
          newSet.delete(sectionId);
        } else {
          newSet.add(sectionId);
        }
        return newSet;
      });
    }, []);

    const handleFieldChange = React.useCallback(
      (fieldId: string, value: any) => {
        onChange?.(fieldId, value);
      },
      [onChange]
    );

    const renderField = React.useCallback(
      (field: SettingField) => {
        const fieldValue = values[field.id] !== undefined ? values[field.id] : field.value;
        const fieldError = errors[field.id] || field.error;
        const isDisabled = disabled || field.disabled;
        const isLoading = loading || field.loading;

        const fieldContent = (() => {
          switch (field.type) {
            case 'toggle':
              return (
                <SwitchField
                  checked={Boolean(fieldValue)}
                  disabled={isDisabled || isLoading}
                  onChange={(checked) => handleFieldChange(field.id, checked)}
                  hideLabel
                />
              );

            case 'select':
              return (
                <SelectField
                  value={fieldValue}
                  options={field.options || []}
                  disabled={isDisabled || isLoading}
                  error={fieldError}
                  onChange={(value) => handleFieldChange(field.id, value)}
                  hideLabel
                  className="min-w-[150px]"
                />
              );

            case 'text':
            case 'number':
              return (
                <TextField
                  type={field.type}
                  value={fieldValue || ''}
                  placeholder={field.placeholder}
                  disabled={isDisabled || isLoading}
                  error={fieldError}
                  required={field.required}
                  onChange={(value) => handleFieldChange(field.id, value)}
                  hideLabel
                  className="min-w-[200px]"
                />
              );

            case 'slider':
              return (
                <div className="min-w-[200px]">
                  <SliderField
                    value={fieldValue || field.slider?.min || 0}
                    min={field.slider?.min || 0}
                    max={field.slider?.max || 100}
                    step={field.slider?.step || 1}
                    disabled={isDisabled || isLoading}
                    onChange={(value) => handleFieldChange(field.id, value)}
                    hideLabel
                  />
                  {field.slider?.unit && (
                    <div className="text-xs text-muted-foreground mt-1 text-right">
                      {fieldValue}{field.slider.unit}
                    </div>
                  )}
                </div>
              );

            case 'action':
              return field.action && (
                <Button
                  variant={field.action.variant || 'outline'}
                  size="sm"
                  disabled={isDisabled || isLoading || field.action.disabled}
                  loading={isLoading || field.action.loading}
                  onClick={field.onAction}
                >
                  {field.action.icon && (
                    <span className="mr-2">{field.action.icon}</span>
                  )}
                  {field.action.label}
                </Button>
              );

            case 'info':
              return (
                <div className="flex items-center gap-2">
                  <span className="text-sm">{fieldValue}</span>
                  {field.badge && (
                    <Badge
                      variant={field.badge.variant || 'secondary'}
                      className="text-xs"
                    >
                      {field.badge.text}
                    </Badge>
                  )}
                </div>
              );

            default:
              return null;
          }
        })();

        return (
          <div
            key={field.id}
            className={cn(
              sSettingsItemVariants({
                layout: field.layout || 'inline',
                interactive: Boolean(field.onAction && field.type !== 'action')
              })
            )}
            onClick={field.onAction && field.type !== 'action' ? field.onAction : undefined}
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {field.icon && (
                <Icon
                  name={field.icon}
                  size="s"
                  color={field.iconColor || 'n500'}
                  className="mt-0.5 flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{field.label}</h4>
                  {field.required && (
                    <Badge variant="outline" className="text-xs">Required</Badge>
                  )}
                </div>
                {field.description && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {field.description}
                  </p>
                )}
                {fieldError && (
                  <p className="text-sm text-red-600 mt-1">{fieldError}</p>
                )}
              </div>
            </div>

            {/* Field Control */}
            <div className="flex items-center flex-shrink-0 ml-4">
              {fieldContent}
            </div>
          </div>
        );
      },
      [values, errors, disabled, loading, handleFieldChange]
    );

    return (
      <div
        ref={ref}
        className={cn(sSettingsFormVariants({ variant, size, layout }), className)}
        {...props}
      >
        {header}

        {/* Settings Sections */}
        <div className="space-y-6">
          {sections.map((section) => {
            const isCollapsed = collapsedSections.has(section.id);

            return (
              <div
                key={section.id}
                className={cn(sSettingsSectionVariants({ 
                  variant: section.variant,
                  spacing: 'default'
                }))}
              >
                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {section.icon && (
                      <Icon name={section.icon} size="s" color="n500" />
                    )}
                    <div>
                      <h3 className="font-semibold text-base">{section.title}</h3>
                      {section.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {section.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Section Actions */}
                    {section.actions && section.actions.length > 0 && !isCollapsed && (
                      <div className="flex gap-2">
                        {section.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant={action.variant || 'ghost'}
                            size="sm"
                            disabled={disabled || loading || action.disabled}
                            loading={loading || action.loading}
                            onClick={action.onClick}
                          >
                            {action.icon && (
                              <span className="mr-2">{action.icon}</span>
                            )}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    {section.collapsible && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSection(section.id)}
                        disabled={disabled || loading}
                      >
                        {isCollapsed ? '▼' : '▲'}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Section Fields */}
                {!isCollapsed && (
                  <div className="space-y-4 mt-4">
                    {section.fields.map(renderField)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Form Actions */}
        {showActions && (onSave || onReset) && (
          <div
            className={cn(
              'flex gap-3 pt-4 border-t border-border',
              actionsAlignment === 'center' && 'justify-center',
              actionsAlignment === 'right' && 'justify-end',
              actionsAlignment === 'left' && 'justify-start'
            )}
          >
            {onReset && (
              <Button
                type="button"
                variant="outline"
                disabled={disabled || loading}
                onClick={onReset}
              >
                Reset
              </Button>
            )}
            {onSave && (
              <Button
                type="button"
                variant="default"
                disabled={disabled || loading}
                loading={loading}
                onClick={() => onSave(values)}
              >
                Save Changes
              </Button>
            )}
          </div>
        )}

        {footer}
      </div>
    );
  }
);

SSettingsForm.displayName = 'SSettingsForm';

export { SSettingsForm, sSettingsFormVariants };
export type { SettingField, SettingOption, SettingsSection };