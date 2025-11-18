import * as React from 'react';
import { cn } from '@acrobi/primitives';
import { RadioGroup, type RadioGroupProps } from '@acrobi/primitives';

export interface RadioFieldProps extends Omit<RadioGroupProps, 'error'> {
  /**
   * Field label
   */
  label?: string;
  /**
   * Helper text to display below the radio group
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
   * Layout orientation for the field (not the radio group)
   */
  fieldOrientation?: 'vertical' | 'horizontal';
  /**
   * Label width for horizontal layout
   */
  labelWidth?: string;
}

const RadioField = React.forwardRef<HTMLDivElement, RadioFieldProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      required = false,
      description,
      fieldOrientation = 'vertical',
      labelWidth = '120px',
      name,
      ...props
    },
    ref
  ) => {
    const fieldId = `radio-field-${React.useId()}`;
    const helperTextId = `${fieldId}-helper-text`;
    const descriptionId = description ? `${fieldId}-description` : undefined;

    const isHorizontal = fieldOrientation === 'horizontal';
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
            className={cn(
              'text-sm font-medium leading-none text-foreground',
              required &&
                "after:content-['*'] after:ml-0.5 after:text-destructive",
              props.disabled && 'text-muted-foreground cursor-not-allowed',
              isHorizontal && `flex-shrink-0 pt-1`
            )}
            style={isHorizontal ? { width: labelWidth } : undefined}
          >
            {label}
          </label>
        )}

        {/* Radio Group Container */}
        <div className={cn('space-y-2', isHorizontal && 'flex-1')}>
          {/* Description */}
          {description && (
            <p id={descriptionId} className='text-sm text-muted-foreground'>
              {description}
            </p>
          )}

          {/* Radio Group */}
          <RadioGroup
            ref={ref}
            name={name}
            error={error}
            aria-describedby={cn(
              (error || helperText) && helperTextId,
              description && descriptionId
            )}
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

RadioField.displayName = 'RadioField';

export { RadioField };
