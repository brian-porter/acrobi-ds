import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Checkbox } from '../primitives/checkbox';

const checkboxGroupVariants = cva('flex', {
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
      sm: '[&_[data-checkbox]]:h-4 [&_[data-checkbox]]:w-4',
      default: '[&_[data-checkbox]]:h-5 [&_[data-checkbox]]:w-5',
      lg: '[&_[data-checkbox]]:h-6 [&_[data-checkbox]]:w-6',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    gap: 'default',
    size: 'default',
  },
});

export interface CheckboxGroupOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLFieldSetElement>, 'onChange'>,
    VariantProps<typeof checkboxGroupVariants> {
  /**
   * Options for the checkbox group
   */
  options?: CheckboxGroupOption[];
  /**
   * Current selected values
   */
  value?: string[];
  /**
   * Default selected values for uncontrolled component
   */
  defaultValue?: string[];
  /**
   * Callback when selection changes
   */
  onValueChange?: (value: string[]) => void;
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
   * Name attribute for form submission
   */
  name?: string;
}

const CheckboxGroup = React.forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
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
    const [internalValue, setInternalValue] = React.useState<string[]>(
      value ?? defaultValue ?? []
    );

    const currentValue = value ?? internalValue;

    const handleValueChange = (optionValue: string, checked: boolean) => {
      if (disabled) return;

      const newValue = checked
        ? [...currentValue, optionValue]
        : currentValue.filter(v => v !== optionValue);

      setInternalValue(newValue);
      onValueChange?.(newValue);
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
          className={cn(checkboxGroupVariants({ orientation, gap, size }))}
          role='group'
          aria-labelledby={label ? undefined : 'checkbox-group'}
          aria-describedby={
            hasError
              ? 'checkbox-group-error'
              : hasHelper
                ? 'checkbox-group-helper'
                : undefined
          }
        >
          {children ||
            options?.map(option => {
              const isChecked = currentValue.includes(option.value);

              return (
                <div key={option.value} className='flex items-top space-x-2'>
                  <Checkbox
                    id={`${name}-${option.value}`}
                    name={name}
                    value={option.value}
                    checked={isChecked}
                    disabled={disabled || option.disabled}
                    onCheckedChange={checked =>
                      handleValueChange(option.value, checked as boolean)
                    }
                    data-checkbox
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
          <p id='checkbox-group-error' className='text-sm text-destructive'>
            {error}
          </p>
        )}

        {hasHelper && (
          <p
            id='checkbox-group-helper'
            className='text-sm text-muted-foreground'
          >
            {helperText}
          </p>
        )}
      </fieldset>
    );
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';

export { CheckboxGroup, checkboxGroupVariants };
