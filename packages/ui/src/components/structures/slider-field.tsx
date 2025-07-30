import * as React from 'react';
import { cn } from '../../lib/utils';
import { Slider, type SliderProps } from '../primitives/slider';

export interface SliderFieldProps extends SliderProps {
  /**
   * Field label
   */
  label?: string;
  /**
   * Helper text to display below the slider
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
   * Layout orientation for the field (not the slider)
   */
  fieldOrientation?: 'vertical' | 'horizontal';
  /**
   * Label width for horizontal layout
   */
  labelWidth?: string;
}

const SliderField = React.forwardRef<HTMLDivElement, SliderFieldProps>(
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
      id,
      ...props
    },
    ref
  ) => {
    const fieldId = id || `slider-field-${React.useId()}`;
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

        {/* Slider Container */}
        <div className={cn('space-y-2', isHorizontal && 'flex-1')}>
          {/* Description */}
          {description && (
            <p id={descriptionId} className='text-sm text-muted-foreground'>
              {description}
            </p>
          )}

          {/* Slider */}
          <Slider
            ref={ref}
            id={fieldId}
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

SliderField.displayName = 'SliderField';

export { SliderField };
