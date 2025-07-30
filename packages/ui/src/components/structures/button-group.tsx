import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonGroupVariants = cva('inline-flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    size: {
      sm: '[&>*]:h-9 [&>*]:px-3 [&>*]:text-sm',
      default: '[&>*]:h-10 [&>*]:px-4 [&>*]:text-sm',
      lg: '[&>*]:h-11 [&>*]:px-8 [&>*]:text-base',
    },
    variant: {
      default: '[&>*]:bg-background [&>*]:border-input hover:[&>*]:bg-accent',
      outline: '[&>*]:border [&>*]:bg-background hover:[&>*]:bg-accent',
      ghost: '[&>*]:bg-transparent hover:[&>*]:bg-accent',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'default',
    variant: 'outline',
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      className:
        '[&>*:first-child]:rounded-l-md [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-r-md [&>*:last-child]:rounded-l-none [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:not(:first-child)]:border-l-0',
    },
    {
      orientation: 'vertical',
      className:
        '[&>*:first-child]:rounded-t-md [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-b-md [&>*:last-child]:rounded-t-none [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:not(:first-child)]:border-t-0',
    },
  ],
});

export interface ButtonGroupOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface ButtonGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof buttonGroupVariants> {
  /**
   * Options for the button group
   */
  options?: ButtonGroupOption[];
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
   * Whether multiple selections are allowed
   */
  multiple?: boolean;
  /**
   * Selected values when multiple is true
   */
  values?: string[];
  /**
   * Default selected values for uncontrolled multiple selection
   */
  defaultValues?: string[];
  /**
   * Callback when multiple selection changes
   */
  onValuesChange?: (values: string[]) => void;
  /**
   * Whether the entire group is disabled
   */
  disabled?: boolean;
  /**
   * Custom children (alternative to options prop)
   */
  children?: React.ReactNode;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      orientation,
      size,
      variant,
      options,
      value,
      defaultValue,
      onValueChange,
      multiple = false,
      values,
      defaultValues,
      onValuesChange,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      value ?? defaultValue ?? ''
    );
    const [internalValues, setInternalValues] = React.useState<string[]>(
      values ?? defaultValues ?? []
    );

    const currentValue = value ?? internalValue;
    const currentValues = values ?? internalValues;

    const handleSingleSelect = (optionValue: string) => {
      if (disabled) return;

      setInternalValue(optionValue);
      onValueChange?.(optionValue);
    };

    const handleMultipleSelect = (optionValue: string) => {
      if (disabled) return;

      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];

      setInternalValues(newValues);
      onValuesChange?.(newValues);
    };

    const handleOptionClick = (optionValue: string) => {
      if (multiple) {
        handleMultipleSelect(optionValue);
      } else {
        handleSingleSelect(optionValue);
      }
    };

    // If children are provided, use them directly
    if (children) {
      return (
        <div
          className={cn(
            buttonGroupVariants({ orientation, size, variant }),
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Otherwise, render options
    return (
      <div
        className={cn(
          buttonGroupVariants({ orientation, size, variant }),
          className
        )}
        ref={ref}
        role={multiple ? 'group' : 'radiogroup'}
        {...props}
      >
        {options?.map(option => {
          const isSelected = multiple
            ? currentValues.includes(option.value)
            : currentValue === option.value;

          return (
            <button
              key={option.value}
              type='button'
              disabled={disabled || option.disabled}
              onClick={() => handleOptionClick(option.value)}
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                {
                  'bg-primary text-primary-foreground':
                    isSelected && variant === 'default',
                  'bg-accent text-accent-foreground':
                    isSelected && variant !== 'default',
                  border: variant === 'outline',
                }
              )}
              role={multiple ? 'checkbox' : 'radio'}
              aria-checked={isSelected}
              aria-pressed={isSelected}
            >
              {option.icon && (
                <span className='mr-2 h-4 w-4 flex-shrink-0'>
                  {option.icon}
                </span>
              )}
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup, buttonGroupVariants };
