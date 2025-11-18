import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const listVariants = cva('', {
  variants: {
    variant: {
      unordered: 'list-disc',
      ordered: 'list-decimal',
      none: 'list-none',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    spacing: {
      none: 'space-y-0',
      sm: 'space-y-1',
      md: 'space-y-2',
      lg: 'space-y-3',
    },
  },
  defaultVariants: {
    variant: 'unordered',
    size: 'md',
    spacing: 'sm',
  },
});

const listItemVariants = cva('flex items-start', {
  variants: {
    variant: {
      default: '',
      interactive:
        'hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1 cursor-pointer transition-colors',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ListProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof listVariants> {
  /**
   * List type
   */
  variant?: 'unordered' | 'ordered' | 'none';
  /**
   * Text size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Spacing between items
   */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * Whether to show inside the margin
   */
  inside?: boolean;
  /**
   * List items
   */
  children: React.ReactNode;
}

export interface ListItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  /**
   * List item variant
   */
  variant?: 'default' | 'interactive';
  /**
   * Optional icon to display before content
   */
  icon?: React.ReactNode;
  /**
   * Item content
   */
  children: React.ReactNode;
  /**
   * Click handler for interactive items
   */
  onSelect?: () => void;
}

const List = React.forwardRef<HTMLElement, ListProps>(
  (
    { className, variant, size, spacing, inside = false, children, ...props },
    ref
  ) => {
    const shouldShowMargin = !inside && variant !== 'none';

    if (variant === 'ordered') {
      return (
        <ol
          className={cn(
            listVariants({ variant, size, spacing }),
            inside && 'list-inside',
            shouldShowMargin && 'list-outside ml-6',
            className
          )}
          ref={ref as React.ForwardedRef<HTMLOListElement>}
          {...props}
        >
          {children}
        </ol>
      );
    }

    return (
      <ul
        className={cn(
          listVariants({ variant, size, spacing }),
          inside && 'list-inside',
          shouldShowMargin && 'list-outside ml-6',
          className
        )}
        ref={ref as React.ForwardedRef<HTMLUListElement>}
        {...props}
      >
        {children}
      </ul>
    );
  }
);

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (
    { className, variant, icon, children, onSelect, onClick, ...props },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
      if (variant === 'interactive' && onSelect) {
        onSelect();
      }
      onClick?.(e);
    };

    return (
      <li
        className={cn(listItemVariants({ variant, className }))}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {icon && <span className='shrink-0 mr-2 mt-0.5'>{icon}</span>}
        <span className='flex-1'>{children}</span>
      </li>
    );
  }
);

List.displayName = 'List';
ListItem.displayName = 'ListItem';

export { List, ListItem, listVariants };
