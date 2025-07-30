import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const emptyStateVariants = cva(
  'flex flex-col items-center justify-center text-center py-12 px-6',
  {
    variants: {
      variant: {
        default: '',
        compact: 'py-8 px-4',
        spacious: 'py-16 px-8',
      },
      size: {
        sm: 'max-w-sm',
        default: 'max-w-md',
        lg: 'max-w-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const iconVariants = cva(
  'flex items-center justify-center rounded-full bg-muted/50 mb-4',
  {
    variants: {
      size: {
        sm: 'w-12 h-12 text-2xl',
        default: 'w-16 h-16 text-3xl',
        lg: 'w-20 h-20 text-4xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  /**
   * Icon to display (emoji or text)
   */
  icon?: string;
  /**
   * Icon size
   */
  iconSize?: 'sm' | 'default' | 'lg';
  /**
   * Main title
   */
  title: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Action element (usually a button)
   */
  action?: React.ReactNode;
  /**
   * Additional content
   */
  children?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      iconSize,
      title,
      description,
      action,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ variant, size }), className)}
        {...props}
      >
        {icon && (
          <div className={cn(iconVariants({ size: iconSize }))}>{icon}</div>
        )}

        <div className='space-y-2 mb-6'>
          <h3 className='text-lg font-semibold text-foreground'>{title}</h3>

          {description && (
            <p className='text-muted-foreground text-sm'>{description}</p>
          )}
        </div>

        {action && <div className='mb-4'>{action}</div>}

        {children}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export { EmptyState, emptyStateVariants, iconVariants };
