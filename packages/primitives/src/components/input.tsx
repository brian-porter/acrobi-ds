import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

/**
 * Input variant styles using Acrobi Design System data attributes
 * This approach matches the authentic Acrobi component pattern
 * where styling is controlled via data attributes that map to CSS selectors
 */
const inputVariants = cva('text-input w-full bg-background text-foreground', {
  variants: {
    // Input size variants
    size: {
      xs: '',
      sm: '',
      default: '',
      lg: '',
      xl: '',
    },
    // Input style variants
    style: {
      default: '',
      filled: '',
      outlined: '',
      underlined: '',
    },
    // Input state variants
    state: {
      default: '',
      error: '',
      success: '',
      warning: '',
      focus: '',
    },
  },
  defaultVariants: {
    size: 'default',
    style: 'default',
    state: 'default',
  },
});

// Map size to Acrobi data attributes
const getInputSize = (size: string | null | undefined): string => {
  const sizeMap: Record<string, string> = {
    xs: 'xs',
    sm: 's',
    default: 'm',
    lg: 'l',
    xl: 'xl',
  };
  return sizeMap[size || 'default'] || 'm';
};

// Map style to Acrobi data attributes
const getInputStyle = (style: string | null | undefined): string => {
  const styleMap: Record<string, string> = {
    default: 'default',
    filled: 'filled',
    outlined: 'outlined',
    underlined: 'underlined',
  };
  return styleMap[style || 'default'] || 'default';
};

// Map state to Acrobi data attributes
const getInputState = (state: string | null | undefined): string => {
  const stateMap: Record<string, string> = {
    default: 'default',
    error: 'error',
    success: 'success',
    warning: 'warning',
    focus: 'focus',
  };
  return stateMap[state || 'default'] || 'default';
};

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<VariantProps<typeof inputVariants>, 'style'> {
  /**
   * Icon name from BQ-Icons font
   */
  icon?: string;
  /**
   * Icon position relative to input
   */
  iconPosition?: 'Left' | 'Right';
  /**
   * Input label text
   */
  label?: string;
  /**
   * Helper text below input
   */
  helperText?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Success message
   */
  success?: string;
  /**
   * Input style variant
   */
  styling?: 'default' | 'filled' | 'outlined' | 'underlined';
  /**
   * Input required state
   */
  required?: boolean;
  /**
   * Input loading state
   */
  loading?: boolean;
  /**
   * @deprecated Use inputStyle prop instead
   */
  variant?: 'default' | 'destructive' | 'success' | 'warning';
}

/**
 * Input component using authentic Acrobi Design System styling
 *
 * This component uses data attributes that map directly to the CSS selectors
 * in the Acrobi design system, ensuring authentic styling that matches the
 * original design specifications.
 *
 * Key features:
 * - Uses data-input-size for sizing (xs, s, m, l, xl)
 * - Uses data-input-style for visual variants
 * - Uses data-input-state for state management
 * - Supports BQ-Icons font system
 * - Integrated label and helper text
 *
 * @example
 * ```tsx
 * <Input
 *   placeholder="Search..."
 *   icon="search"
 *   iconPosition="Left"
 *   label="Search Query"
 *   helperText="Enter at least 3 characters"
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      size = 'default',
      styling = 'default',
      state = 'default',
      icon,
      iconPosition = 'Left',
      label,
      helperText,
      error,
      success,
      required = false,
      loading = false,
      disabled = false,
      variant, // deprecated
      style, // Extract style prop to prevent it from being passed to DOM
      ...props
    },
    ref
  ) => {
    // Handle backward compatibility
    const currentState = error ? 'error' : success ? 'success' : state;
    const currentStyle = variant
      ? variant === 'destructive'
        ? 'outlined'
        : 'default'
      : styling;

    // Determine helper text to show
    const displayHelperText = error || success || helperText;
    const helperTextColor = error ? 'fd500' : success ? 'fs500' : 'n700';

    return (
      <div className='input-field w-full'>
        {/* Label */}
        {label && (
          <label
            className='input-label'
            data-fs='r3'
            data-clr='n999'
            htmlFor={props.id}
          >
            {label}
            {required && <span className='text-destructive ml-1'>*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className='input-wrapper relative'>
          {/* Icon */}
          {icon && (
            <div
              className='input-icon'
              data-loc={iconPosition === 'Left' ? 'l' : 'r'}
            >
              <span
                className='icon'
                data-icn-size='sm'
                data-clr='n700'
                style={{ fontFamily: 'var(--_typography---icn1)' }}
              >
                {icon}
              </span>
            </div>
          )}

          {/* Input element */}
          <input
            ref={ref}
            type={type}
            className={cn(
              inputVariants({ size, style: currentStyle, state: currentState }),
              className
            )}
            style={style}
            data-input-size={getInputSize(size)}
            data-input-style={getInputStyle(currentStyle)}
            data-input-state={getInputState(currentState)}
            data-has-icon={icon ? 'true' : 'false'}
            data-icon-position={iconPosition === 'Left' ? 'l' : 'r'}
            disabled={disabled || loading}
            required={required}
            {...props}
          />

          {/* Loading indicator */}
          {loading && (
            <div className='input-loading absolute right-3 top-1/2 transform -translate-y-1/2'>
              <div className='animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full'></div>
            </div>
          )}
        </div>

        {/* Helper text */}
        {displayHelperText && (
          <div
            className='input-helper-text'
            data-fs='r4'
            data-clr={helperTextColor}
          >
            {error || success || helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
