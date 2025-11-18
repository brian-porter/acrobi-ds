import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const tagVariants = cva(
  'inline-flex items-center gap-1 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        success:
          'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800',
        warning:
          'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800',
        error:
          'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs rounded',
        md: 'px-2.5 py-1 text-sm rounded-md',
        lg: 'px-3 py-1.5 text-base rounded-md',
      },
      interactive: {
        true: 'cursor-pointer',
        false: 'cursor-default',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /**
   * Tag variant for different styles
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';
  /**
   * Tag size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the tag is interactive (clickable)
   */
  interactive?: boolean;
  /**
   * Optional icon to display before text
   */
  icon?: React.ReactNode;
  /**
   * Tag content
   */
  children: React.ReactNode;
  /**
   * Whether the tag can be removed
   */
  removable?: boolean;
  /**
   * Callback when tag is removed
   */
  onRemove?: () => void;
  /**
   * Callback when tag is clicked (if interactive)
   */
  onSelect?: () => void;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant,
      size,
      interactive,
      icon,
      children,
      removable = false,
      onRemove,
      onSelect,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
      if (interactive && onSelect) {
        onSelect();
      }
      onClick?.(e);
    };

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onRemove?.();
    };

    const isInteractive = interactive || removable;

    if (interactive) {
      return (
        <button
          className={cn(
            tagVariants({
              variant,
              size,
              interactive: isInteractive,
              className,
            })
          )}
          onClick={handleClick}
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
          {...props}
        >
          {icon && <span className='shrink-0'>{icon}</span>}
          <span>{children}</span>
          {removable && (
            <button
              type='button'
              className='inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-current/20 focus:outline-none focus:ring-1 focus:ring-current'
              onClick={handleRemove}
              aria-label='Remove tag'
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
        </button>
      );
    }

    return (
      <span
        className={cn(
          tagVariants({ variant, size, interactive: isInteractive, className })
        )}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {icon && <span className='shrink-0'>{icon}</span>}
        <span>{children}</span>
        {removable && (
          <button
            type='button'
            className='inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-current/20 focus:outline-none focus:ring-1 focus:ring-current'
            onClick={handleRemove}
            aria-label='Remove tag'
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
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export { Tag, tagVariants };
