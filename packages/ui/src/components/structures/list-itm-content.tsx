import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Avatar } from '../primitives/avatar';
import { Badge } from '../primitives/badge';
import { Button, type ButtonProps } from '../primitives/button';

const listItmContentVariants = cva('flex items-center space-x-3 py-2', {
  variants: {
    variant: {
      default: '',
      card: 'p-4 bg-card border border-border rounded-lg',
      minimal: 'py-1 space-x-2',
      detailed: 'py-3 space-x-4',
    },
    alignment: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    },
  },
  defaultVariants: {
    variant: 'default',
    alignment: 'center',
  },
});

export interface ListItmContentAction {
  /**
   * Action content (text or icon)
   */
  children: React.ReactNode;
  /**
   * Action click handler
   */
  onClick?: ButtonProps['onClick'];
  /**
   * Button variant
   */
  variant?: ButtonProps['variant'];
  /**
   * Button size
   */
  size?: ButtonProps['size'];
  /**
   * Whether action is disabled
   */
  disabled?: boolean;
  /**
   * Additional button props
   */
  buttonProps?: Omit<
    ButtonProps,
    'children' | 'onClick' | 'variant' | 'size' | 'disabled'
  >;
}

export interface ListItmContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listItmContentVariants> {
  /**
   * Leading content (avatar, icon, etc.)
   */
  leading?: React.ReactNode;
  /**
   * Avatar source for leading content
   */
  avatar?: string;
  /**
   * Avatar fallback text
   */
  avatarFallback?: string;
  /**
   * Main title text
   */
  title: string;
  /**
   * Subtitle text
   */
  subtitle?: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Badge text or element
   */
  badge?: React.ReactNode;
  /**
   * Badge variant
   */
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  /**
   * Trailing content (actions, metadata, etc.)
   */
  trailing?: React.ReactNode;
  /**
   * Action buttons
   */
  actions?: ListItmContentAction[];
  /**
   * Item variant style
   * @default "default"
   */
  variant?: 'default' | 'card' | 'minimal' | 'detailed';
  /**
   * Content alignment
   * @default "center"
   */
  alignment?: 'start' | 'center' | 'end';
  /**
   * Whether the item is clickable
   */
  clickable?: boolean;
  /**
   * Click handler for the entire item
   */
  onItemClick?: () => void;
  /**
   * Whether the item is selected
   */
  selected?: boolean;
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
}

const ListItmContent = React.forwardRef<HTMLDivElement, ListItmContentProps>(
  (
    {
      className,
      leading,
      avatar,
      avatarFallback,
      title,
      subtitle,
      description,
      badge,
      badgeVariant = 'default',
      trailing,
      actions = [],
      variant,
      alignment,
      clickable = false,
      onItemClick,
      selected = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const hasActions = actions.length > 0;
    const hasLeading = leading || avatar;
    const hasTrailing = trailing || hasActions;

    const leadingContent = React.useMemo(() => {
      if (leading) return leading;
      if (avatar) {
        return (
          <Avatar>
            <img src={avatar} alt={avatarFallback || title} />
            {avatarFallback && <span>{avatarFallback}</span>}
          </Avatar>
        );
      }
      return null;
    }, [leading, avatar, avatarFallback, title]);

    const trailingContent = React.useMemo(() => {
      if (trailing) return trailing;
      if (hasActions) {
        return (
          <div className='flex items-center space-x-2'>
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'ghost'}
                size={action.size || 'sm'}
                disabled={disabled || action.disabled}
                onClick={action.onClick}
                {...action.buttonProps}
              >
                {action.children}
              </Button>
            ))}
          </div>
        );
      }
      return null;
    }, [trailing, hasActions, actions, disabled]);

    return (
      <div
        ref={ref}
        className={cn(
          listItmContentVariants({ variant, alignment }),
          clickable && 'cursor-pointer hover:bg-muted/50 transition-colors',
          selected && 'bg-muted ring-2 ring-ring ring-offset-2 rounded-md',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={clickable && !disabled ? onItemClick : undefined}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable && !disabled ? 0 : undefined}
        onKeyDown={
          clickable && !disabled
            ? e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onItemClick?.();
                }
              }
            : undefined
        }
        {...props}
      >
        {hasLeading && <div className='flex-shrink-0'>{leadingContent}</div>}

        <div className='flex-1 min-w-0'>
          <div className='flex items-center space-x-2'>
            <h3
              className={cn(
                'font-medium text-foreground truncate',
                variant === 'minimal' && 'text-sm',
                variant === 'detailed' && 'text-lg'
              )}
            >
              {title}
            </h3>

            {badge && (
              <Badge variant={badgeVariant} className='flex-shrink-0'>
                {badge}
              </Badge>
            )}
          </div>

          {subtitle && (
            <p
              className={cn(
                'text-sm text-muted-foreground truncate mt-1',
                variant === 'minimal' && 'text-xs',
                variant === 'detailed' && 'text-base'
              )}
            >
              {subtitle}
            </p>
          )}

          {description && (
            <p
              className={cn(
                'text-sm text-muted-foreground mt-1',
                variant === 'minimal' && 'text-xs',
                variant === 'detailed' && 'text-base',
                variant === 'card' && 'line-clamp-2'
              )}
            >
              {description}
            </p>
          )}
        </div>

        {hasTrailing && <div className='flex-shrink-0'>{trailingContent}</div>}
      </div>
    );
  }
);
ListItmContent.displayName = 'ListItmContent';

export { ListItmContent, listItmContentVariants };
