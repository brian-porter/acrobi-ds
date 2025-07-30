import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const labelVariants = cva('inline-flex items-center gap-1.5 font-medium', {
  variants: {
    size: {
      sm: 'text-xs px-2 py-1',
      md: 'text-sm px-2.5 py-1.5',
      lg: 'text-base px-3 py-2',
    },
    variant: {
      default: 'bg-secondary text-secondary-foreground',
      primary: 'bg-primary text-primary-foreground',
      success:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      warning:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      outline:
        'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
    },
    shape: {
      rounded: 'rounded-md',
      pill: 'rounded-full',
      square: 'rounded-none',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    shape: 'rounded',
  },
});

export interface LabelProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof labelVariants> {
  /**
   * Label size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Label style variant
   */
  variant?:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'outline';
  /**
   * Label shape
   */
  shape?: 'rounded' | 'pill' | 'square';
  /**
   * Optional icon to display before text
   */
  icon?: React.ReactNode;
  /**
   * Label text content
   */
  children: React.ReactNode;
}

const Label = React.forwardRef<HTMLSpanElement, LabelProps>(
  ({ className, size, variant, shape, icon, children, ...props }, ref) => {
    return (
      <span
        className={cn(labelVariants({ size, variant, shape, className }))}
        ref={ref}
        {...props}
      >
        {icon && <span className='shrink-0'>{icon}</span>}
        {children}
      </span>
    );
  }
);

Label.displayName = 'Label';

export { Label, labelVariants };
