import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Checkbox } from './checkbox';

/**
 * CheckboxField variant styles using Acrobi Design System classes
 * Enhanced checkbox component with integrated link support for Terms of Service
 */
const checkboxFieldVariants = cva(
  'checkbox-field flex items-start gap-3',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      alignment: {
        start: 'items-start',
        center: 'items-center',
        top: 'items-start',
      },
      spacing: {
        tight: 'gap-2',
        normal: 'gap-3',
        loose: 'gap-4',
      },
      state: {
        default: '',
        error: 'text-red-600',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'md',
      alignment: 'start',
      spacing: 'normal',
      state: 'default',
    },
  }
);

const checkboxLabelVariants = cva(
  'checkbox-field-label flex-1 leading-normal',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
      },
    },
    defaultVariants: {
      size: 'md',
      weight: 'normal',
    },
  }
);

const checkboxLinkVariants = cva(
  'checkbox-field-link inline cursor-pointer transition-colors underline',
  {
    variants: {
      variant: {
        default: 'text-blue-600 hover:text-blue-700 focus:text-blue-800',
        primary: 'text-blue-600 hover:text-blue-700 focus:text-blue-800',
        secondary: 'text-gray-600 hover:text-gray-700 focus:text-gray-800',
        accent: 'text-purple-600 hover:text-purple-700 focus:text-purple-800',
      },
      underline: {
        none: 'no-underline',
        hover: 'no-underline hover:underline',
        always: 'underline',
      },
    },
    defaultVariants: {
      variant: 'primary',
      underline: 'always',
    },
  }
);

export interface CheckboxFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof checkboxFieldVariants> {
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;
  /**
   * Callback when checkbox state changes
   */
  onChange?: (checked: boolean) => void;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Whether the checkbox is required
   */
  required?: boolean;
  /**
   * Checkbox label/description text
   */
  label?: React.ReactNode;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Help text to display below the label
   */
  helpText?: string;
  /**
   * Name attribute for the checkbox input
   */
  name?: string;
  /**
   * Value attribute for the checkbox input
   */
  value?: string;
  /**
   * Links configuration for integrated links in the label
   */
  links?: Array<{
    /**
     * Text content of the link
     */
    text: string;
    /**
     * Click handler for the link
     */
    onClick?: () => void;
    /**
     * href for the link (if it should be a real link)
     */
    href?: string;
    /**
     * Link variant styling
     */
    variant?: 'default' | 'primary' | 'secondary' | 'accent';
    /**
     * Underline behavior
     */
    underline?: 'none' | 'hover' | 'always';
    /**
     * Open link in new tab
     */
    target?: '_blank' | '_self';
    /**
     * Accessible label for the link
     */
    'aria-label'?: string;
  }>;
  /**
   * Checkbox size
   */
  checkboxSize?: 'sm' | 'md' | 'lg';
  /**
   * Checkbox variant
   */
  checkboxVariant?: 'default' | 'primary' | 'secondary';
  /**
   * Label weight
   */
  labelWeight?: 'normal' | 'medium' | 'semibold';
  /**
   * Custom checkbox component (for advanced use cases)
   */
  checkboxComponent?: React.ComponentType<any>;
  /**
   * Form validation state
   */
  validationState?: 'valid' | 'invalid' | 'pending';
  /**
   * Accessible description for screen readers
   */
  'aria-describedby'?: string;
  /**
   * Accessible label for the checkbox
   */
  'aria-label'?: string;
}

/**
 * CheckboxField component with integrated link support
 *
 * This component provides an enhanced checkbox experience with built-in support
 * for links within the label text, making it perfect for Terms of Service,
 * Privacy Policy, and other legal agreement checkboxes.
 *
 * Key features:
 * - Integrated link support within labels
 * - Configurable link styling and behavior
 * - Accessible keyboard navigation
 * - Error and validation states
 * - Flexible sizing and alignment options
 * - Support for required field indicators
 * - Help text and descriptions
 *
 * @example
 * ```tsx
 * // Terms of Service checkbox
 * <CheckboxField
 *   label="I agree to the Terms of Service and Privacy Policy"
 *   links={[
 *     {
 *       text: "Terms of Service",
 *       onClick: () => openTermsModal(),
 *       variant: "primary"
 *     },
 *     {
 *       text: "Privacy Policy", 
 *       href: "/privacy",
 *       target: "_blank"
 *     }
 *   ]}
 *   required
 *   error={error}
 *   checked={agreedToTerms}
 *   onChange={setAgreedToTerms}
 * />
 *
 * // Newsletter subscription
 * <CheckboxField
 *   label="Subscribe to our newsletter for updates"
 *   helpText="You can unsubscribe at any time"
 *   checked={subscribeNewsletter}
 *   onChange={setSubscribeNewsletter}
 * />
 * ```
 */
const CheckboxField = React.forwardRef<HTMLDivElement, CheckboxFieldProps>(
  (
    {
      className,
      checked = false,
      onChange,
      disabled = false,
      required = false,
      label,
      error,
      helpText,
      name,
      value,
      links = [],
      size = 'md',
      alignment = 'start',
      spacing = 'normal',
      state = 'default',
      checkboxSize = 'md',
      checkboxVariant = 'default',
      labelWeight = 'normal',
      checkboxComponent: CheckboxComponent = Checkbox,
      validationState,
      'aria-describedby': ariaDescribedBy,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = React.useState(checked);
    
    // Update internal state when checked prop changes
    React.useEffect(() => {
      setIsChecked(checked);
    }, [checked]);

    // Determine current state
    const currentState = error ? 'error' : disabled ? 'disabled' : state;

    // Generate unique IDs for accessibility
    const checkboxId = React.useId();
    const errorId = error ? `${checkboxId}-error` : undefined;
    const helpId = helpText ? `${checkboxId}-help` : undefined;
    const descriptionIds = [ariaDescribedBy, errorId, helpId].filter(Boolean).join(' ');

    const handleCheckboxChange = (newChecked: boolean) => {
      if (!disabled) {
        setIsChecked(newChecked);
        onChange?.(newChecked);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault();
        handleCheckboxChange(!isChecked);
      }
    };

    // Parse label text and insert links
    const renderLabelWithLinks = () => {
      if (!label || links.length === 0) {
        return label;
      }

      let labelText = typeof label === 'string' ? label : '';
      if (typeof label !== 'string') {
        // If label is not a string, return as-is
        return label;
      }

      // Sort links by position in text (longest first to avoid partial matches)
      const sortedLinks = [...links].sort((a, b) => b.text.length - a.text.length);
      
      const parts: React.ReactNode[] = [];
      let remainingText = labelText;
      let keyCounter = 0;

      sortedLinks.forEach((link) => {
        const linkIndex = remainingText.toLowerCase().indexOf(link.text.toLowerCase());
        if (linkIndex !== -1) {
          // Add text before the link
          if (linkIndex > 0) {
            parts.push(remainingText.substring(0, linkIndex));
          }

          // Add the link
          const linkElement = link.href ? (
            <a
              key={`link-${keyCounter++}`}
              href={link.href}
              target={link.target || '_self'}
              rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
              className={cn(
                checkboxLinkVariants({
                  variant: link.variant || 'primary',
                  underline: link.underline || 'always',
                })
              )}
              aria-label={link['aria-label']}
              onClick={(e) => {
                e.stopPropagation(); // Prevent checkbox toggle
                link.onClick?.();
              }}
            >
              {link.text}
            </a>
          ) : (
            <button
              key={`link-${keyCounter++}`}
              type="button"
              className={cn(
                checkboxLinkVariants({
                  variant: link.variant || 'primary',
                  underline: link.underline || 'always',
                }),
                'bg-transparent border-none p-0'
              )}
              aria-label={link['aria-label']}
              onClick={(e) => {
                e.stopPropagation(); // Prevent checkbox toggle
                link.onClick?.();
              }}
            >
              {link.text}
            </button>
          );

          parts.push(linkElement);

          // Update remaining text
          remainingText = remainingText.substring(linkIndex + link.text.length);
        }
      });

      // Add any remaining text
      if (remainingText) {
        parts.push(remainingText);
      }

      return parts.length > 0 ? parts : label;
    };

    return (
      <div
        ref={ref}
        className={cn(
          checkboxFieldVariants({ size, alignment, spacing, state: currentState }),
          className
        )}
        {...props}
      >
        <CheckboxComponent
          id={checkboxId}
          name={name}
          value={value}
          checked={isChecked}
          onChange={handleCheckboxChange}
          disabled={disabled}
          required={required}
          size={checkboxSize}
          variant={checkboxVariant}
          aria-describedby={descriptionIds || undefined}
          aria-label={ariaLabel}
          aria-invalid={error ? 'true' : undefined}
        />

        <div className="checkbox-field-content flex-1">
          <label
            htmlFor={checkboxId}
            className={cn(
              checkboxLabelVariants({ size, weight: labelWeight }),
              disabled && 'cursor-not-allowed',
              !disabled && 'cursor-pointer'
            )}
            onClick={(e) => {
              // Allow link clicks to propagate, but prevent checkbox toggle for links
              const target = e.target as HTMLElement;
              if (target.tagName === 'A' || target.tagName === 'BUTTON') {
                e.preventDefault();
              }
            }}
            onKeyDown={handleKeyDown}
            tabIndex={-1} // Let the checkbox handle focus
          >
            {renderLabelWithLinks()}
            {required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>

          {helpText && (
            <p
              id={helpId}
              className={cn(
                'mt-1 text-sm text-gray-600',
                disabled && 'text-gray-400'
              )}
            >
              {helpText}
            </p>
          )}

          {error && (
            <p
              id={errorId}
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

CheckboxField.displayName = 'CheckboxField';

export { CheckboxField, checkboxFieldVariants, checkboxLabelVariants, checkboxLinkVariants };