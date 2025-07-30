import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const objectGroupVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-center',
      vertical: 'flex-col',
    },
    align: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      stretch: 'justify-stretch',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      default: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    padding: {
      none: 'p-0',
      sm: 'p-2',
      default: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    },
    variant: {
      default: '',
      card: 'bg-card border border-border rounded-lg shadow-sm',
      outline: 'border border-border rounded-lg',
      ghost: 'hover:bg-accent/50 rounded-lg transition-colors',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    align: 'start',
    gap: 'default',
    padding: 'none',
    variant: 'default',
  },
  compoundVariants: [
    {
      variant: ['card', 'outline'],
      padding: 'none',
      className: 'p-4',
    },
    {
      orientation: 'vertical',
      align: ['start', 'center', 'end'],
      className: 'items-stretch',
    },
    {
      orientation: 'vertical',
      align: 'start',
      className: 'items-start',
    },
    {
      orientation: 'vertical',
      align: 'center',
      className: 'items-center',
    },
    {
      orientation: 'vertical',
      align: 'end',
      className: 'items-end',
    },
  ],
});

export interface ObjectGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof objectGroupVariants> {
  /**
   * Content to display in the group
   */
  children: React.ReactNode;
  /**
   * Optional title for the group
   */
  title?: React.ReactNode;
  /**
   * Optional subtitle or description
   */
  subtitle?: React.ReactNode;
  /**
   * Optional header content (appears above children)
   */
  header?: React.ReactNode;
  /**
   * Optional footer content (appears below children)
   */
  footer?: React.ReactNode;
  /**
   * Whether the group should be collapsible
   */
  collapsible?: boolean;
  /**
   * Default collapsed state for collapsible groups
   */
  defaultCollapsed?: boolean;
  /**
   * Controlled collapsed state
   */
  collapsed?: boolean;
  /**
   * Callback when collapse state changes
   */
  onCollapsedChange?: (collapsed: boolean) => void;
}

const ObjectGroup = React.forwardRef<HTMLDivElement, ObjectGroupProps>(
  (
    {
      className,
      orientation,
      align,
      gap,
      padding,
      variant,
      children,
      title,
      subtitle,
      header,
      footer,
      collapsible = false,
      defaultCollapsed = false,
      collapsed,
      onCollapsedChange,
      ...props
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = React.useState(
      collapsed ?? defaultCollapsed
    );

    const isCollapsed = collapsed ?? internalCollapsed;

    const handleToggleCollapse = () => {
      const newCollapsed = !isCollapsed;
      setInternalCollapsed(newCollapsed);
      onCollapsedChange?.(newCollapsed);
    };

    const hasHeader = title || subtitle || header;

    return (
      <div
        className={cn(
          objectGroupVariants({ orientation, align, gap, padding, variant }),
          className
        )}
        ref={ref}
        {...props}
      >
        {hasHeader && (
          <div
            className={cn(
              'flex flex-col',
              orientation === 'horizontal' ? 'flex-shrink-0' : 'w-full'
            )}
          >
            {(title || subtitle) && (
              <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                  {title && (
                    <h3 className='text-lg font-semibold leading-none tracking-tight'>
                      {title}
                    </h3>
                  )}
                  {subtitle && (
                    <p className='text-sm text-muted-foreground mt-1'>
                      {subtitle}
                    </p>
                  )}
                </div>
                {collapsible && (
                  <button
                    type='button'
                    onClick={handleToggleCollapse}
                    className='flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                    aria-label={isCollapsed ? 'Expand group' : 'Collapse group'}
                    aria-expanded={!isCollapsed}
                  >
                    <svg
                      className={cn(
                        'h-4 w-4 transition-transform',
                        isCollapsed ? 'rotate-0' : 'rotate-180'
                      )}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}
            {header && <div className='mt-2'>{header}</div>}
          </div>
        )}

        {!isCollapsed && (
          <div
            className={cn(
              'flex',
              orientation === 'horizontal'
                ? 'flex-row items-center flex-1'
                : 'flex-col w-full',
              gap === 'none' ? '' : `gap-${gap?.replace('default', '4') || '4'}`
            )}
          >
            {children}
          </div>
        )}

        {footer && !isCollapsed && (
          <div
            className={cn(
              'flex flex-col',
              orientation === 'horizontal' ? 'flex-shrink-0' : 'w-full'
            )}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }
);

ObjectGroup.displayName = 'ObjectGroup';

export { ObjectGroup, objectGroupVariants };
