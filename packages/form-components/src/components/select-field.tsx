import * as React from 'react';
import { cn } from '@acrobi/primitives';
import { Select, type SelectProps } from '@acrobi/primitives';

export interface SelectFieldProps
  extends Omit<SelectProps, 'error' | 'helperText'> {
  /**
   * Field label
   */
  label?: string;
  /**
   * Helper text to display below the select
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

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
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
    const fieldId = id || `select-field-${React.useId()}`;
    const helperTextId = `${fieldId}-helper-text`;
    const descriptionId = description ? `${fieldId}-description` : undefined;

    const isHorizontal = orientation === 'horizontal';
    const hasError = !!error;

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

        {/* Select Container */}
        <div className={cn('space-y-2', isHorizontal && 'flex-1')}>
          {/* Description */}
          {description && (
            <p id={descriptionId} className='text-sm text-muted-foreground'>
              {description}
            </p>
          )}

          {/* Select */}
          <Select
            ref={ref}
            id={fieldId}
            error={error}
            helperText={!error ? helperText : undefined}
            aria-describedby={cn(description && descriptionId)}
            aria-required={required}
            {...props}
          />
        </div>
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';

export { SelectField };
