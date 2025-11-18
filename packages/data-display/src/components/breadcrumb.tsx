import * as React from 'react';
import { cva, type VariantProps } from '@acrobi/primitives';
import { cn } from '@acrobi/primitives';

const breadcrumbStructureVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
    variant: {
      default: '',
      contained: 'bg-muted rounded-lg px-3 py-2',
      bordered: 'border border-border rounded-lg px-3 py-2',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface BreadcrumbStructureProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbStructureVariants> {
  /**
   * Breadcrumb items
   */
  items: BreadcrumbItem[];
  /**
   * Custom separator
   */
  separator?: React.ReactNode;
  /**
   * Maximum number of items to show before collapsing
   */
  maxItems?: number;
  /**
   * Whether to show home icon for first item
   */
  showHome?: boolean;
  /**
   * Custom home icon
   */
  homeIcon?: React.ReactNode;
  /**
   * Whether to show icons for items
   */
  showIcons?: boolean;
  /**
   * Custom class for items
   */
  itemClassName?: string;
  /**
   * Custom class for separator
   */
  separatorClassName?: string;
  /**
   * Whether the breadcrumb is collapsible on mobile
   */
  collapsible?: boolean;
}

const defaultSeparator = (
  <svg
    className='h-4 w-4'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9 5l7 7-7 7'
    />
  </svg>
);

const defaultHomeIcon = (
  <svg
    className='h-4 w-4'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    />
  </svg>
);

const ellipsisIcon = (
  <svg
    className='h-4 w-4'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M5 12h.01M12 12h.01M19 12h.01'
    />
  </svg>
);

const BreadcrumbStructure = React.forwardRef<
  HTMLElement,
  BreadcrumbStructureProps
>(
  (
    {
      className,
      size,
      variant,
      items,
      separator = defaultSeparator,
      maxItems,
      showHome = false,
      homeIcon = defaultHomeIcon,
      showIcons = false,
      itemClassName,
      separatorClassName,
      collapsible = true,
      ...props
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    // Check if we need to collapse on mobile
    React.useEffect(() => {
      if (!collapsible) return;

      const checkCollapse = () => {
        setIsCollapsed(window.innerWidth < 640); // sm breakpoint
      };

      checkCollapse();
      window.addEventListener('resize', checkCollapse);
      return () => window.removeEventListener('resize', checkCollapse);
    }, [collapsible]);

    // Process items for display
    let displayItems = [...items];
    let showEllipsis = false;

    if (maxItems && items.length > maxItems) {
      if (maxItems <= 2) {
        // Show first and last only
        displayItems = [items[0], items[items.length - 1]];
      } else {
        // Show first, ellipsis, and last (maxItems - 1) items
        const lastItems = items.slice(-(maxItems - 1));
        displayItems = [items[0], ...lastItems];
      }
      showEllipsis = true;
    }

    // Mobile collapsed view
    if (isCollapsed && items.length > 2) {
      const currentItem = items[items.length - 1];
      const parentItem = items[items.length - 2];

      return (
        <nav
          className={cn(
            breadcrumbStructureVariants({ size, variant }),
            className
          )}
          aria-label='Breadcrumb'
          ref={ref}
          {...props}
        >
          <button
            type='button'
            className='inline-flex items-center text-muted-foreground hover:text-foreground transition-colors'
            onClick={() => setIsCollapsed(false)}
            aria-label='Show full breadcrumb'
          >
            {ellipsisIcon}
          </button>

          <span
            className={cn('mx-2 text-muted-foreground/50', separatorClassName)}
          >
            {separator}
          </span>

          {parentItem.href || parentItem.onClick ? (
            <button
              type='button'
              onClick={parentItem.onClick}
              disabled={parentItem.disabled}
              className={cn(
                'inline-flex items-center text-muted-foreground hover:text-foreground transition-colors',
                parentItem.disabled && 'opacity-50 cursor-not-allowed',
                itemClassName
              )}
            >
              {showIcons && parentItem.icon && (
                <span className='mr-1'>{parentItem.icon}</span>
              )}
              {parentItem.label}
            </button>
          ) : (
            <span className={cn('text-muted-foreground', itemClassName)}>
              {showIcons && parentItem.icon && (
                <span className='mr-1'>{parentItem.icon}</span>
              )}
              {parentItem.label}
            </span>
          )}

          <span
            className={cn('mx-2 text-muted-foreground/50', separatorClassName)}
          >
            {separator}
          </span>

          <span className={cn('text-foreground font-medium', itemClassName)}>
            {showIcons && currentItem.icon && (
              <span className='mr-1'>{currentItem.icon}</span>
            )}
            {currentItem.label}
          </span>
        </nav>
      );
    }

    return (
      <nav
        className={cn(
          breadcrumbStructureVariants({ size, variant }),
          className
        )}
        aria-label='Breadcrumb'
        ref={ref}
        {...props}
      >
        <ol className='flex items-center space-x-1'>
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isFirst = index === 0;
            const showEllipsisHere =
              showEllipsis && index === 1 && displayItems.length > 2;

            return (
              <React.Fragment key={index}>
                {showEllipsisHere && (
                  <>
                    <li>
                      <span
                        className={cn('text-muted-foreground', itemClassName)}
                      >
                        {ellipsisIcon}
                      </span>
                    </li>
                    <li aria-hidden='true'>
                      <span
                        className={cn(
                          'mx-2 text-muted-foreground/50',
                          separatorClassName
                        )}
                      >
                        {separator}
                      </span>
                    </li>
                  </>
                )}

                <li>
                  {isLast ? (
                    <span
                      className={cn(
                        'text-foreground font-medium',
                        itemClassName
                      )}
                      aria-current='page'
                    >
                      {showIcons && item.icon && (
                        <span className='mr-1'>{item.icon}</span>
                      )}
                      {showHome && isFirst ? homeIcon : item.label}
                    </span>
                  ) : item.href || item.onClick ? (
                    <button
                      type='button'
                      onClick={item.onClick}
                      disabled={item.disabled}
                      className={cn(
                        'inline-flex items-center text-muted-foreground hover:text-foreground transition-colors',
                        item.disabled && 'opacity-50 cursor-not-allowed',
                        itemClassName
                      )}
                    >
                      {showIcons && item.icon && (
                        <span className='mr-1'>{item.icon}</span>
                      )}
                      {showHome && isFirst ? homeIcon : item.label}
                    </button>
                  ) : (
                    <span
                      className={cn('text-muted-foreground', itemClassName)}
                    >
                      {showIcons && item.icon && (
                        <span className='mr-1'>{item.icon}</span>
                      )}
                      {showHome && isFirst ? homeIcon : item.label}
                    </span>
                  )}
                </li>

                {!isLast && (
                  <li aria-hidden='true'>
                    <span
                      className={cn(
                        'mx-2 text-muted-foreground/50',
                        separatorClassName
                      )}
                    >
                      {separator}
                    </span>
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

BreadcrumbStructure.displayName = 'BreadcrumbStructure';

export { BreadcrumbStructure, breadcrumbStructureVariants };
