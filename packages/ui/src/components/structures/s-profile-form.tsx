import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { TextField } from './text-field';
import { TextareaField } from './textarea-field';
import { SelectField } from './select-field';
import { Button } from '../primitives/button';
import { Avatar } from '../primitives/avatar';
import { Badge } from '../primitives/badge';

/**
 * S-ProfileForm variant styles using Acrobi Design System classes
 * Form layout structure for profile page editing
 */
const sProfileFormVariants = cva(
  'profile-form space-y-6',
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

const sProfileSectionVariants = cva(
  'profile-form-section space-y-4',
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border border-border rounded-lg p-4',
        minimal: 'space-y-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const sProfileAvatarSectionVariants = cva(
  'avatar-section flex items-center gap-4 p-4 bg-muted/30 rounded-lg',
  {
    variants: {
      alignment: {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
      },
      size: {
        sm: '',
        default: '',
        lg: '',
      },
    },
    defaultVariants: {
      alignment: 'left',
      size: 'default',
    },
  }
);

export interface ProfileFormField {
  /**
   * Field name/key
   */
  name: string;
  /**
   * Field label
   */
  label: string;
  /**
   * Field type
   */
  type: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select';
  /**
   * Field value
   */
  value?: string;
  /**
   * Field placeholder
   */
  placeholder?: string;
  /**
   * Whether field is required
   */
  required?: boolean;
  /**
   * Whether field is disabled
   */
  disabled?: boolean;
  /**
   * Field description/help text
   */
  description?: string;
  /**
   * Field error message
   */
  error?: string;
  /**
   * Field validation rules
   */
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
  /**
   * Select options (for select type)
   */
  options?: Array<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
  /**
   * Custom field component
   */
  component?: React.ComponentType<any>;
}

export interface ProfileFormSection {
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
   * Section fields
   */
  fields: ProfileFormField[];
  /**
   * Section variant
   */
  variant?: 'default' | 'bordered' | 'minimal';
  /**
   * Whether section is collapsible
   */
  collapsible?: boolean;
  /**
   * Whether section is initially collapsed
   */
  defaultCollapsed?: boolean;
}

export interface ProfileFormAction {
  /**
   * Action label
   */
  label: string;
  /**
   * Action type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Button variant
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /**
   * Button size
   */
  size?: 'default' | 'sm' | 'lg';
  /**
   * Action icon
   */
  icon?: string;
  /**
   * Whether action is disabled
   */
  disabled?: boolean;
  /**
   * Whether action is loading
   */
  loading?: boolean;
  /**
   * Action click handler
   */
  onClick?: () => void;
}

export interface SProfileFormProps
  extends React.FormHTMLAttributes<HTMLFormElement>,
    VariantProps<typeof sProfileFormVariants> {
  /**
   * Form sections to display
   */
  sections: ProfileFormSection[];
  /**
   * Current form values
   */
  values?: Record<string, any>;
  /**
   * Form validation errors
   */
  errors?: Record<string, string>;
  /**
   * Avatar configuration
   */
  avatar?: {
    src?: string;
    fallback?: string;
    editable?: boolean;
    size?: 'sm' | 'default' | 'lg';
  };
  /**
   * User badges to display
   */
  badges?: Array<{
    label: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    icon?: string;
  }>;
  /**
   * Form actions
   */
  actions?: ProfileFormAction[];
  /**
   * Actions alignment
   */
  actionsAlignment?: 'left' | 'center' | 'right';
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
  onChange?: (name: string, value: any) => void;
  /**
   * Form submit handler
   */
  onSubmit?: (values: Record<string, any>) => void;
  /**
   * Avatar change handler
   */
  onAvatarChange?: (file: File) => void;
  /**
   * Field validation handler
   */
  onValidate?: (name: string, value: any) => string | undefined;
  /**
   * Additional header content
   */
  header?: React.ReactNode;
  /**
   * Additional footer content
   */
  footer?: React.ReactNode;
}

/**
 * S-ProfileForm - Form layout structure for profile page editing
 *
 * This structure provides a comprehensive form layout for editing user profile
 * information. It supports multiple sections, field types, validation,
 * avatar editing, and flexible layouts.
 *
 * Key features:
 * - Multiple form sections with titles and descriptions
 * - Support for various field types (text, email, textarea, select, etc.)
 * - Avatar editing with preview
 * - User badges display
 * - Built-in validation and error handling
 * - Flexible layouts (vertical, horizontal, mixed)
 * - Loading and disabled states
 * - Customizable actions and buttons
 * - Responsive design with proper spacing
 * - Accessibility support with proper labels and ARIA attributes
 *
 * @example
 * ```tsx
 * <SProfileForm
 *   sections={[
 *     {
 *       id: "basic",
 *       title: "Basic Information",
 *       description: "Update your basic profile information",
 *       fields: [
 *         {
 *           name: "displayName",
 *           label: "Display Name",
 *           type: "text",
 *           required: true,
 *           placeholder: "Enter your display name"
 *         },
 *         {
 *           name: "bio",
 *           label: "Bio",
 *           type: "textarea",
 *           placeholder: "Tell us about yourself"
 *         }
 *       ]
 *     },
 *     {
 *       id: "contact",
 *       title: "Contact Information",
 *       fields: [
 *         {
 *           name: "email",
 *           label: "Email",
 *           type: "email",
 *           required: true
 *         }
 *       ]
 *     }
 *   ]}
 *   avatar={{
 *     src: "/avatar.jpg",
 *     fallback: "JD",
 *     editable: true
 *   }}
 *   badges={[
 *     { label: "Verified", variant: "secondary" },
 *     { label: "Premium", variant: "default" }
 *   ]}
 *   actions={[
 *     { label: "Cancel", variant: "outline" },
 *     { label: "Save Changes", type: "submit", variant: "default" }
 *   ]}
 *   onChange={(name, value) => console.log('Field changed:', name, value)}
 *   onSubmit={(values) => console.log('Form submitted:', values)}
 * />
 * ```
 */
const SProfileForm = React.forwardRef<HTMLFormElement, SProfileFormProps>(
  (
    {
      className,
      sections = [],
      values = {},
      errors = {},
      avatar,
      badges = [],
      actions = [],
      actionsAlignment = 'right',
      loading = false,
      disabled = false,
      onChange,
      onSubmit,
      onAvatarChange,
      onValidate,
      header,
      footer,
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

    const handleFieldChange = React.useCallback(
      (name: string, value: any) => {
        onChange?.(name, value);
      },
      [onChange]
    );

    const handleSubmit = React.useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (!disabled && !loading) {
          onSubmit?.(values);
        }
      },
      [disabled, loading, onSubmit, values]
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

    const renderField = React.useCallback(
      (field: ProfileFormField) => {
        const fieldValue = values[field.name] || field.value || '';
        const fieldError = errors[field.name] || field.error;
        const isDisabled = disabled || field.disabled;

        const commonProps = {
          id: field.name,
          name: field.name,
          label: field.label,
          value: fieldValue,
          placeholder: field.placeholder,
          required: field.required,
          disabled: isDisabled,
          error: fieldError,
          description: field.description,
          onChange: (value: any) => handleFieldChange(field.name, value),
        };

        if (field.component) {
          const Component = field.component;
          return <Component key={field.name} {...commonProps} />;
        }

        switch (field.type) {
          case 'textarea':
            return (
              <TextareaField
                key={field.name}
                {...commonProps}
                rows={4}
              />
            );
          case 'select':
            return (
              <SelectField
                key={field.name}
                {...commonProps}
                options={field.options || []}
              />
            );
          default:
            return (
              <TextField
                key={field.name}
                {...commonProps}
                type={field.type}
              />
            );
        }
      },
      [values, errors, disabled, handleFieldChange]
    );

    return (
      <form
        ref={ref}
        className={cn(sProfileFormVariants({ variant, size, layout }), className)}
        onSubmit={handleSubmit}
        {...props}
      >
        {header}

        {/* Avatar Section */}
        {avatar && (
          <div className={cn(sProfileAvatarSectionVariants({}))}>
            <Avatar
              src={avatar.src}
              fallback={avatar.fallback}
              size={avatar.size === 'lg' ? 'xl' : avatar.size === 'sm' ? 'md' : 'lg'}
              className="flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-sm">Profile Picture</h3>
                {badges.length > 0 && (
                  <div className="flex gap-1">
                    {badges.map((badge, index) => (
                      <Badge
                        key={index}
                        variant={badge.variant || 'secondary'}
                        className="text-xs"
                      >
                        {badge.icon && <span className="mr-1">{badge.icon}</span>}
                        {badge.label}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              {avatar.editable && (
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onAvatarChange?.(file);
                    }}
                    className="hidden"
                    id="avatar-upload"
                    disabled={disabled || loading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={disabled || loading}
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                  >
                    Change Photo
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={disabled || loading}
                    onClick={() => onAvatarChange?.(null as any)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form Sections */}
        <div className="space-y-6">
          {sections.map((section) => {
            const isCollapsed = collapsedSections.has(section.id);

            return (
              <div
                key={section.id}
                className={cn(sProfileSectionVariants({ variant: section.variant }))}
              >
                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-base">{section.title}</h3>
                    {section.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {section.description}
                      </p>
                    )}
                  </div>
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

                {/* Section Fields */}
                {!isCollapsed && (
                  <div className="grid grid-cols-1 gap-4">
                    {section.fields.map(renderField)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        {actions.length > 0 && (
          <div
            className={cn(
              'flex gap-3 pt-4 border-t border-border',
              actionsAlignment === 'center' && 'justify-center',
              actionsAlignment === 'right' && 'justify-end',
              actionsAlignment === 'left' && 'justify-start'
            )}
          >
            {actions.map((action, index) => (
              <Button
                key={index}
                type={action.type || 'button'}
                variant={action.variant || 'outline'}
                size={action.size || 'default'}
                disabled={disabled || loading || action.disabled}
                onClick={action.onClick}
              >
                {(loading || action.loading) && action.type === 'submit' && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                )}
                {action.icon && !(loading && action.type === 'submit') && (
                  <span className="mr-2">{action.icon}</span>
                )}
                {action.label}
              </Button>
            ))}
          </div>
        )}

        {footer}
      </form>
    );
  }
);

SProfileForm.displayName = 'SProfileForm';

export { SProfileForm, sProfileFormVariants };
export type { ProfileFormField, ProfileFormSection, ProfileFormAction };