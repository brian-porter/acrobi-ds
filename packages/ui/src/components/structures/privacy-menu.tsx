import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';
import { RadioGroup } from '../primitives/radio';
import { Label } from '../primitives/label';

const privacyMenuVariants = cva('w-full space-y-4', {
  variants: {
    layout: {
      vertical: 'flex flex-col',
      horizontal: 'flex flex-row gap-4',
      grid: 'grid grid-cols-1 sm:grid-cols-3 gap-4',
    },
  },
  defaultVariants: {
    layout: 'vertical',
  },
});

export type PrivacyLevel = 'public' | 'private' | 'confidential';

export interface PrivacyOption {
  /**
   * Privacy level identifier
   */
  value: PrivacyLevel;
  /**
   * Display label
   */
  label: string;
  /**
   * Description of privacy level
   */
  description: string;
  /**
   * Icon for privacy level
   */
  icon: string;
  /**
   * Whether this option is disabled
   * @default false
   */
  disabled?: boolean;
}

export interface PrivacyMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof privacyMenuVariants> {
  /**
   * Currently selected privacy level
   */
  value: PrivacyLevel;
  /**
   * Callback when privacy level changes
   */
  onValueChange: (value: PrivacyLevel) => void;
  /**
   * Available privacy options
   */
  options?: PrivacyOption[];
  /**
   * Whether to show detailed descriptions
   * @default true
   */
  showDescriptions?: boolean;
  /**
   * Whether to show icons
   * @default true
   */
  showIcons?: boolean;
  /**
   * Layout variant
   */
  layout?: 'vertical' | 'horizontal' | 'grid';
  /**
   * Size variant
   */
  size?: 'sm' | 'default' | 'lg';
}

// Default privacy options
const defaultOptions: PrivacyOption[] = [
  {
    value: 'public',
    label: 'Public',
    description: 'Anyone can see this collection',
    icon: '🌐',
  },
  {
    value: 'private',
    label: 'Private',
    description: 'Only you and people you invite can see this',
    icon: '🔒',
  },
  {
    value: 'confidential',
    label: 'Confidential',
    description: 'Only you can see this collection',
    icon: '🔐',
  },
];

const PrivacyMenu = React.forwardRef<HTMLDivElement, PrivacyMenuProps>(
  (
    {
      className,
      value,
      onValueChange,
      options = defaultOptions,
      showDescriptions = true,
      showIcons = true,
      layout = 'vertical',
      size = 'default',
      ...props
    },
    ref
  ) => {
    const handleValueChange = React.useCallback(
      (newValue: string) => {
        onValueChange(newValue as PrivacyLevel);
      },
      [onValueChange]
    );

    const renderOption = React.useCallback(
      (option: PrivacyOption) => {
        const isSelected = value === option.value;

        return (
          <label
            key={option.value}
            className={cn(
              'relative flex cursor-pointer rounded-lg border p-4 hover:bg-accent/50 transition-colors',
              isSelected && 'border-primary bg-primary/5',
              option.disabled && 'cursor-not-allowed opacity-50',
              size === 'sm' && 'p-3',
              size === 'lg' && 'p-6'
            )}
          >
            <input
              type='radio'
              name='privacy'
              value={option.value}
              checked={isSelected}
              onChange={e =>
                !option.disabled && handleValueChange(e.target.value)
              }
              disabled={option.disabled}
              className='sr-only'
            />

            <div className='flex w-full items-start gap-3'>
              {showIcons && (
                <div
                  className={cn(
                    'text-2xl',
                    size === 'sm' && 'text-xl',
                    size === 'lg' && 'text-3xl'
                  )}
                >
                  {option.icon}
                </div>
              )}

              <div className='flex-1 space-y-1'>
                <div className='flex items-center gap-2'>
                  <Label
                    className={cn(
                      'font-semibold',
                      size === 'sm' && 'text-sm',
                      size === 'lg' && 'text-lg'
                    )}
                  >
                    {option.label}
                  </Label>
                  {isSelected && (
                    <div className='h-2 w-2 rounded-full bg-primary' />
                  )}
                </div>

                {showDescriptions && (
                  <p
                    className={cn(
                      'text-muted-foreground',
                      size === 'sm' && 'text-xs',
                      size === 'lg' && 'text-base'
                    )}
                  >
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          </label>
        );
      },
      [value, handleValueChange, showIcons, showDescriptions, size]
    );

    return (
      <div
        ref={ref}
        className={cn(privacyMenuVariants({ layout }), className)}
        {...props}
      >
        <fieldset className='space-y-4'>
          <legend className='text-sm font-medium text-foreground'>
            Privacy Settings
          </legend>

          <div
            className={cn(
              layout === 'vertical' && 'space-y-2',
              layout === 'horizontal' && 'flex gap-2',
              layout === 'grid' && 'grid grid-cols-1 sm:grid-cols-3 gap-2'
            )}
          >
            {options.map(renderOption)}
          </div>
        </fieldset>
      </div>
    );
  }
);

PrivacyMenu.displayName = 'PrivacyMenu';

export { PrivacyMenu, privacyMenuVariants };
