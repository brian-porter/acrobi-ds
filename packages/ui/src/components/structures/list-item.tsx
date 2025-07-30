import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const listItemVariants = cva('flex items-center', {
  variants: {
    variant: {
      default: '',
      interactive:
        'hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors',
      selected: 'bg-accent text-accent-foreground',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    size: {
      sm: 'min-h-8 px-2 py-1 text-sm',
      default: 'min-h-10 px-3 py-2',
      lg: 'min-h-12 px-4 py-3 text-lg',
    },
    alignment: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      default: 'rounded-md',
      lg: 'rounded-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    alignment: 'start',
    rounded: 'default',
  },
});

export interface ListItemAction {
  label: string;
  onClick: (event: React.MouseEvent) => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'ghost';
  disabled?: boolean;
}

export interface ListItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'content'>,
    VariantProps<typeof listItemVariants> {
  /**
   * Primary content of the list item
   */
  children?: React.ReactNode;
  /**
   * Leading content (e.g., avatar, icon)
   */
  leading?: React.ReactNode;
  /**
   * Trailing content (e.g., badge, chevron)
   */
  trailing?: React.ReactNode;
  /**
   * Primary text/title
   */
  title?: React.ReactNode;
  /**
   * Secondary text/subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Description text
   */
  description?: React.ReactNode;
  /**
   * Action buttons for the item
   */
  actions?: ListItemAction[];
  /**
   * Whether the item is selected
   */
  selected?: boolean;
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
  /**
   * Click handler for the entire item
   */
  onItemClick?: (event: React.MouseEvent) => void;
  /**
   * Whether to show actions on hover only
   */
  showActionsOnHover?: boolean;
  /**
   * Custom content instead of title/subtitle structure
   */
  content?: React.ReactNode;
  /**
   * Additional classes for different parts
   */
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
}

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      className,
      variant: variantProp,
      size,
      alignment,
      rounded,
      children,
      leading,
      trailing,
      title,
      subtitle,
      description,
      actions,
      selected = false,
      disabled = false,
      onItemClick,
      showActionsOnHover = false,
      content,
      titleClassName,
      subtitleClassName,
      descriptionClassName,
      ...props
    },
    ref
  ) => {
    // Determine variant based on props
    const variant = disabled ? 'disabled' : selected ? 'selected' : variantProp;
    const isInteractive = Boolean(onItemClick) && !disabled;
    const finalVariant =
      isInteractive && variant === 'default' ? 'interactive' : variant;

    const handleItemClick = (event: React.MouseEvent) => {
      if (disabled) return;
      onItemClick?.(event);
    };

    const handleActionClick =
      (action: ListItemAction) => (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent item click when clicking action
        if (action.disabled) return;
        action.onClick(event);
      };

    // If custom content is provided, use it
    if (content) {
      return (
        <div
          className={cn(
            listItemVariants({
              variant: finalVariant,
              size,
              alignment,
              rounded,
            }),
            className
          )}
          onClick={handleItemClick}
          ref={ref}
          role={isInteractive ? 'button' : undefined}
          tabIndex={isInteractive ? 0 : undefined}
          aria-selected={selected}
          aria-disabled={disabled}
          {...props}
        >
          {content}
        </div>
      );
    }

    // If children are provided, use them directly
    if (children) {
      return (
        <div
          className={cn(
            listItemVariants({
              variant: finalVariant,
              size,
              alignment,
              rounded,
            }),
            className
          )}
          onClick={handleItemClick}
          ref={ref}
          role={isInteractive ? 'button' : undefined}
          tabIndex={isInteractive ? 0 : undefined}
          aria-selected={selected}
          aria-disabled={disabled}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Otherwise, use the structured layout
    return (
      <div
        className={cn(
          listItemVariants({ variant: finalVariant, size, alignment, rounded }),
          'group',
          className
        )}
        onClick={handleItemClick}
        ref={ref}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-selected={selected}
        aria-disabled={disabled}
        {...props}
      >
        {leading && <div className='flex-shrink-0 mr-3'>{leading}</div>}

        <div className='flex-1 min-w-0'>
          {title && (
            <div className={cn('font-medium leading-none', titleClassName)}>
              {title}
            </div>
          )}
          {subtitle && (
            <div
              className={cn(
                'text-sm text-muted-foreground mt-1',
                subtitleClassName
              )}
            >
              {subtitle}
            </div>
          )}
          {description && (
            <div
              className={cn(
                'text-xs text-muted-foreground mt-2',
                descriptionClassName
              )}
            >
              {description}
            </div>
          )}
        </div>

        {(trailing || (actions && actions.length > 0)) && (
          <div className='flex-shrink-0 ml-3 flex items-center space-x-2'>
            {trailing}

            {actions && actions.length > 0 && (
              <div
                className={cn(
                  'flex items-center space-x-1',
                  showActionsOnHover &&
                    'opacity-0 group-hover:opacity-100 transition-opacity'
                )}
              >
                {actions.map((action, index) => (
                  <button
                    key={index}
                    type='button'
                    onClick={handleActionClick(action)}
                    disabled={action.disabled}
                    className={cn(
                      'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                      {
                        'h-8 w-8 border border-input bg-background hover:bg-accent hover:text-accent-foreground':
                          action.variant === 'default' || !action.variant,
                        'h-8 w-8 bg-destructive text-destructive-foreground hover:bg-destructive/90':
                          action.variant === 'destructive',
                        'h-8 w-8 hover:bg-accent hover:text-accent-foreground':
                          action.variant === 'ghost',
                      }
                    )}
                    title={action.label}
                  >
                    {action.icon}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

ListItem.displayName = 'ListItem';

export { ListItem, listItemVariants };
