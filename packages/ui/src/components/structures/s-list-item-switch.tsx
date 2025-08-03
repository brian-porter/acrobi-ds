import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Icon } from '../primitives/icon';
import { Badge } from '../primitives/badge';
import { Avatar } from '../primitives/avatar';
import { SwitchField } from './switch-field';

/**
 * S-ListItemSwitch variant styles using Acrobi Design System classes
 * Interactive list item structure with switch toggle
 */
const sListItemSwitchVariants = cva(
  'list-item-switch group flex items-center justify-between w-full transition-colors rounded-lg',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent/30',
        ghost: 'hover:bg-accent/20',
        subtle: 'hover:bg-muted/30',
        bordered: 'border border-border hover:border-border/70 hover:bg-accent/20',
        elevated: 'bg-card shadow-sm hover:shadow-md hover:bg-accent/10 border border-border/50',
      },
      size: {
        sm: 'p-2 min-h-[40px]',
        default: 'p-3 min-h-[48px]',
        lg: 'p-4 min-h-[56px]',
        xl: 'p-5 min-h-[64px]',
      },
      spacing: {
        tight: 'gap-2',
        default: 'gap-3',
        loose: 'gap-4',
      },
      alignment: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
      },
      interactive: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      spacing: 'default',
      alignment: 'center',
      interactive: true,
    },
  }
);

const sListItemIconVariants = cva(
  'list-item-icon flex-shrink-0 transition-colors',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        default: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8',
      },
      color: {
        default: 'text-muted-foreground group-hover:text-foreground',
        primary: 'text-primary',
        muted: 'text-muted-foreground',
        inherit: 'text-inherit',
      },
    },
    defaultVariants: {
      size: 'default',
      color: 'default',
    },
  }
);

const sListItemContentVariants = cva(
  'list-item-content flex-1 min-w-0',
  {
    variants: {
      alignment: {
        start: 'text-left',
        center: 'text-center',
        end: 'text-right',
      },
    },
    defaultVariants: {
      alignment: 'start',
    },
  }
);

export interface ListItemSwitchProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sListItemSwitchVariants> {
  /**
   * Item title/label
   */
  title: string;
  /**
   * Item description/subtitle
   */
  description?: string;
  /**
   * Leading icon name
   */
  icon?: string;
  /**
   * Icon color
   */
  iconColor?: 'default' | 'primary' | 'muted' | 'inherit' | 'p500' | 'n700' | 'n500' | 'n300';
  /**
   * Avatar configuration (alternative to icon)
   */
  avatar?: {
    src?: string;
    fallback?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  };
  /**
   * Badge configuration
   */
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    count?: boolean;
  };
  /**
   * Additional metadata to display
   */
  metadata?: string;
  /**
   * Switch checked state
   */
  checked?: boolean;
  /**
   * Whether switch is disabled
   */
  disabled?: boolean;
  /**
   * Whether item is in loading state
   */
  loading?: boolean;
  /**
   * Whether the entire item is clickable to toggle switch
   */
  itemClickable?: boolean;
  /**
   * Content alignment
   */
  contentAlignment?: 'start' | 'center' | 'end';
  /**
   * Icon size override
   */
  iconSize?: 'sm' | 'default' | 'lg' | 'xl';
  /**
   * Custom leading content
   */
  leadingContent?: React.ReactNode;
  /**
   * Custom trailing content (replaces switch)
   */
  trailingContent?: React.ReactNode;
  /**
   * Switch change handler
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Item click handler (when itemClickable is true)
   */
  onItemClick?: () => void;
  /**
   * Switch size
   */
  switchSize?: 'sm' | 'default' | 'lg';
}

/**
 * S-ListItemSwitch - Interactive list item structure with switch toggle
 *
 * This structure provides a consistent list item with an integrated switch toggle.
 * It supports icons, avatars, badges, metadata, and can be configured to make
 * the entire item clickable or just the switch itself.
 *
 * Key features:
 * - Integrated switch toggle with customizable behavior
 * - Support for icons, avatars, and badges
 * - Optional clickable item area for easier interaction
 * - Metadata and description display
 * - Multiple visual variants and sizes
 * - Loading and disabled states
 * - Flexible content alignment options
 * - Keyboard navigation support
 * - Hover and focus states
 * - Responsive design with proper spacing
 * - Accessibility support with proper ARIA labels
 *
 * @example
 * ```tsx
 * <SListItemSwitch
 *   title="Push Notifications"
 *   description="Receive notifications on your device"
 *   icon="bell"
 *   checked={true}
 *   onCheckedChange={(checked) => console.log('Notifications:', checked)}
 *   itemClickable={true}
 * />
 * 
 * <SListItemSwitch
 *   title="Dark Mode"
 *   description="Use dark theme throughout the app"
 *   icon="moon"
 *   iconColor="primary"
 *   badge={{
 *     text: "Beta",
 *     variant: "secondary"
 *   }}
 *   metadata="Saves battery on OLED screens"
 *   checked={false}
 *   variant="elevated"
 *   size="lg"
 * />
 * 
 * <SListItemSwitch
 *   title="Profile Visibility"
 *   description="Make your profile visible to others"
 *   avatar={{
 *     src: "/avatar.jpg",
 *     fallback: "JD",
 *     size: "md"
 *   }}
 *   checked={true}
 *   disabled={false}
 *   loading={false}
 *   onCheckedChange={(checked) => updatePrivacy(checked)}
 * />
 * ```
 */
const SListItemSwitch = React.forwardRef<HTMLDivElement, ListItemSwitchProps>(
  (
    {
      className,
      title,
      description,
      icon,
      iconColor = 'default',
      avatar,
      badge,
      metadata,
      checked = false,
      disabled = false,
      loading = false,
      itemClickable = false,
      contentAlignment = 'start',
      iconSize,
      leadingContent,
      trailingContent,
      onCheckedChange,
      onItemClick,
      switchSize = 'default',
      variant,
      size,
      spacing,
      alignment,
      ...props
    },
    ref
  ) => {
    const handleItemClick = React.useCallback(() => {
      if (disabled || loading) return;
      
      if (itemClickable && onCheckedChange) {
        onCheckedChange(!checked);
      }
      onItemClick?.();
    }, [itemClickable, checked, disabled, loading, onCheckedChange, onItemClick]);

    const handleSwitchChange = React.useCallback((newChecked: boolean) => {
      if (disabled || loading) return;
      onCheckedChange?.(newChecked);
    }, [disabled, loading, onCheckedChange]);

    const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleItemClick();
      }
    }, [handleItemClick]);

    return (
      <div
        ref={ref}
        className={cn(
          sListItemSwitchVariants({
            variant,
            size,
            spacing,
            alignment,
            interactive: itemClickable,
          }),
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={itemClickable ? handleItemClick : undefined}
        onKeyDown={itemClickable ? handleKeyDown : undefined}
        tabIndex={itemClickable && !disabled ? 0 : undefined}
        role={itemClickable ? 'button' : undefined}
        aria-label={itemClickable ? `Toggle ${title}` : undefined}
        aria-pressed={itemClickable ? checked : undefined}
        aria-disabled={disabled}
        {...props}
      >
        {/* Leading Content */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Leading Icon/Avatar/Content */}
          {leadingContent || (
            <>
              {avatar && (
                <Avatar
                  src={avatar.src}
                  fallback={avatar.fallback}
                  size={avatar.size || (size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm')}
                  className="flex-shrink-0"
                />
              )}
              {icon && !avatar && (
                <Icon
                  name={icon}
                  className={cn(
                    sListItemIconVariants({
                      size: iconSize || (size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default'),
                      color: iconColor === 'p500' || iconColor === 'n700' || iconColor === 'n500' || iconColor === 'n300' ? 'inherit' : iconColor,
                    })
                  )}
                  color={iconColor === 'p500' || iconColor === 'n700' || iconColor === 'n500' || iconColor === 'n300' ? iconColor : undefined}
                />
              )}
            </>
          )}

          {/* Content */}
          <div className={cn(sListItemContentVariants({ alignment: contentAlignment }))}>
            <div className="flex items-center gap-2">
              <h4 className={cn(
                'font-medium truncate',
                size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-base' : 'text-sm'
              )}>
                {title}
              </h4>
              {badge && (
                <Badge
                  variant={badge.variant || 'secondary'}
                  className={cn(
                    'flex-shrink-0',
                    size === 'sm' ? 'text-xs' : 'text-xs'
                  )}
                >
                  {badge.text}
                </Badge>
              )}
              {loading && (
                <div className="animate-spin rounded-full h-3 w-3 border border-current border-t-transparent flex-shrink-0" />
              )}
            </div>
            
            {description && (
              <p className={cn(
                'text-muted-foreground truncate mt-0.5',
                size === 'sm' ? 'text-xs' : 'text-sm'
              )}>
                {description}
              </p>
            )}
            
            {metadata && (
              <p className={cn(
                'text-muted-foreground truncate mt-0.5',
                size === 'sm' ? 'text-xs' : 'text-xs'
              )}>
                {metadata}
              </p>
            )}
          </div>
        </div>

        {/* Trailing Content */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {trailingContent || (
            <SwitchField
              checked={checked}
              disabled={disabled || loading}
              onChange={handleSwitchChange}
              onClick={(e) => {
                // Prevent item click when clicking the switch directly
                if (itemClickable) {
                  e.stopPropagation();
                }
              }}
              size={switchSize}
              hideLabel
              aria-label={`Toggle ${title}`}
            />
          )}
        </div>
      </div>
    );
  }
);

SListItemSwitch.displayName = 'SListItemSwitch';

export { SListItemSwitch, sListItemSwitchVariants };
export type { ListItemSwitchProps };