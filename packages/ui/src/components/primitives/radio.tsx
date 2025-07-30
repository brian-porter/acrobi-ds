import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const radioVariants = cva(
  'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
      variant: {
        default: 'border-primary',
        error: 'border-destructive',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const radioIndicatorVariants = cva(
  'flex items-center justify-center text-current',
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof radioVariants> {
  /**
   * Radio size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Radio variant
   */
  variant?: 'default' | 'error';
  /**
   * Radio label
   */
  label?: string;
  /**
   * Radio description
   */
  description?: string;
  /**
   * Error message
   */
  error?: string;
}

export interface RadioGroupProps {
  /**
   * Radio group options
   */
  options: RadioOption[];
  /**
   * Selected value
   */
  value?: string;
  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void;
  /**
   * Radio group name
   */
  name: string;
  /**
   * Radio size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Radio variant
   */
  variant?: 'default' | 'error';
  /**
   * Layout direction
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Whether the radio group is disabled
   */
  disabled?: boolean;
  /**
   * Error message for the group
   */
  error?: string;
  /**
   * Custom class name
   */
  className?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      size,
      variant,
      label,
      description,
      error,
      disabled,
      checked,
      ...props
    },
    ref
  ) => {
    const actualVariant = error ? 'error' : variant;

    return (
      <div className='flex items-start space-x-2'>
        <div className='relative'>
          <input
            type='radio'
            ref={ref}
            className={cn(
              radioVariants({ size, variant: actualVariant, className })
            )}
            disabled={disabled}
            checked={checked}
            {...props}
          />

          {/* Radio indicator */}
          {checked && (
            <div
              className={cn(
                radioIndicatorVariants({ size }),
                'absolute inset-0'
              )}
            >
              <div
                className={cn(
                  'rounded-full bg-primary',
                  size === 'sm' && 'h-1.5 w-1.5',
                  size === 'md' && 'h-2 w-2',
                  size === 'lg' && 'h-2.5 w-2.5',
                  actualVariant === 'error' && 'bg-destructive'
                )}
              />
            </div>
          )}
        </div>

        {(label || description || error) && (
          <div className='grid gap-1.5 leading-none'>
            {label && (
              <label
                htmlFor={props.id}
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
              >
                {label}
              </label>
            )}
            {description && (
              <p className='text-xs text-muted-foreground'>{description}</p>
            )}
            {error && <p className='text-xs text-destructive'>{error}</p>}
          </div>
        )}
      </div>
    );
  }
);

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onValueChange,
      name,
      size = 'md',
      variant = 'default',
      orientation = 'vertical',
      disabled = false,
      error,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid gap-2',
          orientation === 'horizontal'
            ? 'grid-flow-col auto-cols-max'
            : 'grid-flow-row',
          className
        )}
        role='radiogroup'
        {...props}
      >
        {options.map(option => (
          <Radio
            key={option.value}
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            size={size}
            variant={variant}
            label={option.label}
            description={option.description}
            error={error}
            checked={value === option.value}
            disabled={disabled || option.disabled}
            onChange={e => {
              if (e.target.checked) {
                onValueChange?.(option.value);
              }
            }}
          />
        ))}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
RadioGroup.displayName = 'RadioGroup';

export { Radio, RadioGroup, radioVariants };
