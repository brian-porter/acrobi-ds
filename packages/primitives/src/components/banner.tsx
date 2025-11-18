import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const bannerVariants = cva('flex items-start gap-3 p-4 rounded-lg border', {
  variants: {
    variant: {
      default: 'bg-background border-border text-foreground',
      info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100',
      success:
        'bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100',
      warning:
        'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100',
      error:
        'bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100',
    },
    size: {
      sm: 'p-3 text-sm',
      md: 'p-4 text-sm',
      lg: 'p-5 text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const bannerIconVariants = cva('shrink-0 mt-0.5', {
  variants: {
    variant: {
      default: 'text-muted-foreground',
      info: 'text-blue-600 dark:text-blue-400',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      error: 'text-red-600 dark:text-red-400',
    },
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  /**
   * Banner variant for different message types
   */
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  /**
   * Banner size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Optional icon to display
   */
  icon?: React.ReactNode;
  /**
   * Banner title
   */
  title?: string;
  /**
   * Banner content
   */
  children: React.ReactNode;
  /**
   * Optional action button or element
   */
  action?: React.ReactNode;
  /**
   * Whether the banner can be dismissed
   */
  dismissible?: boolean;
  /**
   * Callback when banner is dismissed
   */
  onDismiss?: () => void;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      title,
      children,
      action,
      dismissible = false,
      onDismiss,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(bannerVariants({ variant, size, className }))}
        role='alert'
        ref={ref}
        {...props}
      >
        {icon && (
          <div className={cn(bannerIconVariants({ variant, size }))}>
            {icon}
          </div>
        )}

        <div className='flex-1 min-w-0'>
          {title && <div className='font-semibold mb-1'>{title}</div>}
          <div>{children}</div>
        </div>

        <div className='flex items-center gap-2 shrink-0'>
          {action && <div>{action}</div>}
          {dismissible && (
            <button
              type='button'
              className='inline-flex h-5 w-5 items-center justify-center rounded-md text-current hover:bg-current/10 focus:outline-none focus:ring-2 focus:ring-current/20'
              onClick={onDismiss}
              aria-label='Dismiss'
            >
              <svg
                className='h-3 w-3'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Banner.displayName = 'Banner';

export { Banner, bannerVariants };
