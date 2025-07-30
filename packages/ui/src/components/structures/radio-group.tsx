import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Radio } from '../primitives/radio';

const radioGroupVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-center flex-wrap',
      vertical: 'flex-col items-start',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-2',
      default: 'gap-3',
      lg: 'gap-4',
      xl: 'gap-6',
    },
    size: {
      sm: '[&_[data-radio]]:h-4 [&_[data-radio]]:w-4',
      default: '[&_[data-radio]]:h-5 [&_[data-radio]]:w-5',
      lg: '[&_[data-radio]]:h-6 [&_[data-radio]]:w-6',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    gap: 'default',
    size: 'default',
  },
});

export interface RadioGroupOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLFieldSetElement>, 'onChange'>,
    VariantProps<typeof radioGroupVariants> {
  /**
   * Options for the radio group
   */
  options?: RadioGroupOption[];
  /**
   * Current selected value
   */
  value?: string;
  /**
   * Default selected value for uncontrolled component
   */
  defaultValue?: string;
  /**
   * Callback when selection changes
   */
  onValueChange?: (value: string) => void;
  /**
   * Group label
   */
  label?: React.ReactNode;
  /**
   * Group description
   */
  description?: React.ReactNode;
  /**
   * Error message
   */
  error?: string;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Whether the group is required
   */
  required?: boolean;
  /**
   * Whether the entire group is disabled
   */
  disabled?: boolean;
  /**
   * Custom children (alternative to options prop)
   */
  children?: React.ReactNode;
  /**
   * Name attribute for form submission (required for radio groups)
   */
  name: string;
}

const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      className,
      orientation,
      gap,
      size,
      options,
      value,
      defaultValue,
      onValueChange,
      label,
      description,
      error,
      helperText,
      required = false,
      disabled = false,
      children,
      name,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      value ?? defaultValue ?? ''
    );

    const currentValue = value ?? internalValue;

    const handleValueChange = (optionValue: string) => {
      if (disabled) return;

      setInternalValue(optionValue);
      onValueChange?.(optionValue);
    };

    const hasError = Boolean(error);
    const hasHelper = Boolean(helperText) && !hasError;

    return (
      <fieldset
        className={cn('space-y-3', className)}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {label && (
          <legend className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            {label}
            {required && <span className='ml-1 text-destructive'>*</span>}
          </legend>
        )}

        {description && (
          <p className='text-sm text-muted-foreground'>{description}</p>
        )}

        <div
          className={cn(radioGroupVariants({ orientation, gap, size }))}
          role='radiogroup'
          aria-labelledby={label ? undefined : 'radio-group'}
          aria-describedby={
            hasError
              ? 'radio-group-error'
              : hasHelper
                ? 'radio-group-helper'
                : undefined
          }
          aria-required={required}
        >
          {children ||
            options?.map(option => {
              const isChecked = currentValue === option.value;

              return (
                <div key={option.value} className='flex items-top space-x-2'>
                  <Radio
                    id={`${name}-${option.value}`}
                    name={name}
                    value={option.value}
                    checked={isChecked}
                    disabled={disabled || option.disabled}
                    onChange={() => handleValueChange(option.value)}
                    data-radio
                  />
                  <div className='grid gap-1.5 leading-none'>
                    <label
                      htmlFor={`${name}-${option.value}`}
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
                    >
                      {option.label}
                    </label>
                    {option.description && (
                      <p className='text-xs text-muted-foreground'>
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {hasError && (
          <p id='radio-group-error' className='text-sm text-destructive'>
            {error}
          </p>
        )}

        {hasHelper && (
          <p id='radio-group-helper' className='text-sm text-muted-foreground'>
            {helperText}
          </p>
        )}
      </fieldset>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup, radioGroupVariants };
