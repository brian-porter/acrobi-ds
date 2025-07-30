import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const listStructureVariants = cva('flex flex-col', {
  variants: {
    variant: {
      default: '',
      bordered: 'border border-border rounded-lg',
      card: 'bg-card border border-border rounded-lg shadow-sm',
      striped: '[&>*:nth-child(even)]:bg-muted/50',
    },
    spacing: {
      none: 'space-y-0',
      sm: 'space-y-1',
      default: 'space-y-2',
      lg: 'space-y-3',
      xl: 'space-y-4',
    },
    padding: {
      none: 'p-0',
      sm: 'p-2',
      default: 'p-4',
      lg: 'p-6',
    },
    divider: {
      none: '',
      line: '[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-border',
      space: '[&>*:not(:last-child)]:mb-2 [&>*:not(:last-child)]:pb-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    spacing: 'default',
    padding: 'none',
    divider: 'none',
  },
  compoundVariants: [
    {
      variant: ['bordered', 'card'],
      padding: 'none',
      className: 'p-4',
    },
    {
      divider: 'line',
      spacing: 'none',
      className: '[&>*]:py-3 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0',
    },
  ],
});

export interface ListAction {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'ghost';
  disabled?: boolean;
}

export interface ListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof listStructureVariants> {
  /**
   * List items to display
   */
  children: React.ReactNode;
  /**
   * Optional title for the list
   */
  title?: React.ReactNode;
  /**
   * Optional subtitle or description
   */
  subtitle?: React.ReactNode;
  /**
   * Optional header actions
   */
  actions?: ListAction[];
  /**
   * Whether the list is loading
   */
  loading?: boolean;
  /**
   * Loading text
   */
  loadingText?: string;
  /**
   * Empty state content
   */
  emptyContent?: React.ReactNode;
  /**
   * Whether to show the empty state when no children
   */
  showEmpty?: boolean;
}

const List = React.forwardRef<HTMLDivElement, ListProps>(
  (
    {
      className,
      variant,
      spacing,
      padding,
      divider,
      children,
      title,
      subtitle,
      actions,
      loading = false,
      loadingText = 'Loading...',
      emptyContent,
      showEmpty = true,
      ...props
    },
    ref
  ) => {
    const hasHeader = title || subtitle || actions?.length;
    const childrenArray = React.Children.toArray(children);
    const hasContent = childrenArray.length > 0;

    if (loading) {
      return (
        <div
          className={cn('flex items-center justify-center p-8', className)}
          ref={ref}
        >
          <div className='flex items-center space-x-2'>
            <div className='h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent' />
            <span className='text-sm text-muted-foreground'>{loadingText}</span>
          </div>
        </div>
      );
    }

    if (!hasContent && showEmpty) {
      return (
        <div
          className={cn(
            'flex flex-col items-center justify-center p-8 text-center',
            className
          )}
          ref={ref}
        >
          {emptyContent || (
            <div className='space-y-2'>
              <div className='h-8 w-8 rounded-full bg-muted flex items-center justify-center'>
                <svg
                  className='h-4 w-4 text-muted-foreground'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
              </div>
              <p className='text-sm text-muted-foreground'>
                No items to display
              </p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className={cn('w-full', className)} ref={ref} {...props}>
        {hasHeader && (
          <div className='flex items-center justify-between mb-4'>
            <div className='space-y-1'>
              {title && (
                <h3 className='text-lg font-semibold leading-none tracking-tight'>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className='text-sm text-muted-foreground'>{subtitle}</p>
              )}
            </div>
            {actions && actions.length > 0 && (
              <div className='flex items-center space-x-2'>
                {actions.map((action, index) => (
                  <button
                    key={index}
                    type='button'
                    onClick={action.onClick}
                    disabled={action.disabled}
                    className={cn(
                      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                      {
                        'h-9 px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground':
                          action.variant === 'default' || !action.variant,
                        'h-9 px-3 bg-destructive text-destructive-foreground hover:bg-destructive/90':
                          action.variant === 'destructive',
                        'h-9 px-3 hover:bg-accent hover:text-accent-foreground':
                          action.variant === 'ghost',
                      }
                    )}
                  >
                    {action.icon && (
                      <span className='mr-2 h-4 w-4'>{action.icon}</span>
                    )}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div
          className={cn(
            listStructureVariants({ variant, spacing, padding, divider })
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

List.displayName = 'List';

export { List, listStructureVariants };
