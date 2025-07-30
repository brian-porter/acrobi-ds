import * as React from 'react';
import { cn } from '../../lib/utils';
import { Input, type InputProps } from '../primitives/input';

export interface TextFieldProps extends Omit<InputProps, 'error'> {
  /**
   * Field label
   */
  label?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Additional description for accessibility
   */
  description?: string;
  /**
   * Layout orientation
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * Label width for horizontal layout
   */
  labelWidth?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      required = false,
      description,
      orientation = 'vertical',
      labelWidth = '120px',
      id,
      ...props
    },
    ref
  ) => {
    const fieldId = id || `text-field-${React.useId()}`;
    const helperTextId = `${fieldId}-helper-text`;
    const descriptionId = description ? `${fieldId}-description` : undefined;

    const isHorizontal = orientation === 'horizontal';
    const hasError = !!error;
    const inputVariant = hasError ? 'error' : props.variant;

    return (
      <div
        className={cn(
          'space-y-2',
          isHorizontal && 'flex items-start space-y-0 space-x-4',
          className
        )}
      >
        {/* Label */}
        {label && (
          <label
            htmlFor={fieldId}
            className={cn(
              'text-sm font-medium leading-none text-foreground',
              required &&
                "after:content-['*'] after:ml-0.5 after:text-destructive",
              props.disabled && 'text-muted-foreground cursor-not-allowed',
              isHorizontal && `flex-shrink-0 pt-2`
            )}
            style={isHorizontal ? { width: labelWidth } : undefined}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className={cn('space-y-2', isHorizontal && 'flex-1')}>
          {/* Description */}
          {description && (
            <p id={descriptionId} className='text-sm text-muted-foreground'>
              {description}
            </p>
          )}

          {/* Input */}
          <Input
            ref={ref}
            id={fieldId}
            variant={inputVariant}
            aria-describedby={cn(
              (error || helperText) && helperTextId,
              description && descriptionId
            )}
            aria-invalid={hasError}
            aria-required={required}
            {...props}
          />

          {/* Helper Text / Error */}
          {(error || helperText) && (
            <p
              id={helperTextId}
              className={cn(
                'text-sm',
                hasError ? 'text-destructive' : 'text-muted-foreground'
              )}
            >
              {error || helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export { TextField };
