import * as React from 'react';
import { cn } from '../../lib/utils';
import { Switch, type SwitchProps } from '../primitives/switch';

export interface SwitchFieldProps
  extends Omit<SwitchProps, 'label' | 'description'> {
  /**
   * Field label
   */
  label?: string;
  /**
   * Helper text to display below the switch
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

const SwitchField = React.forwardRef<HTMLButtonElement, SwitchFieldProps>(
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
    const fieldId = id || `switch-field-${React.useId()}`;
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
        {/* Label (for horizontal layout) */}
        {label && isHorizontal && (
          <label
            className={cn(
              'text-sm font-medium leading-none text-foreground flex-shrink-0 pt-1',
              required &&
                "after:content-['*'] after:ml-0.5 after:text-destructive",
              props.disabled && 'text-muted-foreground cursor-not-allowed'
            )}
            style={{ width: labelWidth }}
          >
            {label}
          </label>
        )}

        {/* Switch Container */}
        <div className={cn('space-y-2', isHorizontal && 'flex-1')}>
          {/* Description */}
          {description && (
            <p id={descriptionId} className='text-sm text-muted-foreground'>
              {description}
            </p>
          )}

          {/* Switch */}
          <Switch
            ref={ref}
            id={fieldId}
            label={!isHorizontal ? label : undefined}
            description={!isHorizontal ? undefined : undefined}
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

SwitchField.displayName = 'SwitchField';

export { SwitchField };
