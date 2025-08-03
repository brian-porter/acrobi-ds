import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Icon } from '../primitives/icon';
import { Badge } from '../primitives/badge';
import { Avatar } from '../primitives/avatar';

/**
 * S-ListItemLink variant styles using Acrobi Design System classes
 * Interactive list item structure with link behavior
 */
const sListItemLinkVariants = cva(
  'list-item-link group flex items-center justify-between w-full text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent/50 active:bg-accent/70',
        ghost: 'hover:bg-accent/30 active:bg-accent/50',
        subtle: 'hover:bg-muted/50 active:bg-muted/70',
        bordered: 'border border-border hover:border-border/70 hover:bg-accent/30',
        elevated: 'bg-card shadow-sm hover:shadow-md hover:bg-accent/20 border border-border/50',
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
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      spacing: 'default',
      alignment: 'center',
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

const sListItemMetaVariants = cva(
  'list-item-meta flex-shrink-0 flex items-center gap-2',
  {
    variants: {
      alignment: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
      },
    },
    defaultVariants: {
      alignment: 'end',
    },
  }
);

export interface ListItemLinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sListItemLinkVariants> {
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
   * Trailing icon (usually chevron or arrow)
   */
  trailingIcon?: string;
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
   * Whether item is in loading state
   */
  loading?: boolean;
  /**
   * Whether item is selected/active
   */
  selected?: boolean;
  /**
   * Content alignment
   */
  contentAlignment?: 'start' | 'center' | 'end';
  /**
   * Meta content alignment
   */
  metaAlignment?: 'start' | 'center' | 'end';
  /**
   * Icon size override
   */
  iconSize?: 'sm' | 'default' | 'lg' | 'xl';
  /**
   * Custom leading content
   */
  leadingContent?: React.ReactNode;
  /**
   * Custom trailing content
   */
  trailingContent?: React.ReactNode;
  /**
   * Link href (makes it behave as a link)
   */
  href?: string;
  /**
   * Link target
   */
  target?: string;
  /**
   * Link rel attribute
   */
  rel?: string;
  /**
   * External link indicator
   */
  external?: boolean;
  /**
   * Custom click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * S-ListItemLink - Interactive list item structure with link behavior
 *
 * This structure provides a consistent interactive list item that can function
 * as a button or link. It supports icons, avatars, badges, metadata, and
 * various visual states for navigation and selection interfaces.
 *
 * Key features:
 * - Button or link behavior with proper accessibility
 * - Support for icons, avatars, and trailing elements
 * - Badge and metadata display
 * - Multiple visual variants and sizes
 * - Loading and selected states
 * - Flexible content alignment options
 * - External link indicators
 * - Keyboard navigation support
 * - Hover and focus states
 * - Responsive design with proper spacing
 *
 * @example
 * ```tsx
 * <SListItemLink
 *   title="Account Settings"
 *   description="Manage your account preferences"
 *   icon="settings"
 *   trailingIcon="chevron-right"
 *   onClick={() => navigate('/settings')}
 * />
 * 
 * <SListItemLink
 *   title="Profile"
 *   description="View and edit your profile"
 *   avatar={{
 *     src: "/avatar.jpg",
 *     fallback: "JD",
 *     size: "md"
 *   }}
 *   badge={{
 *     text: "Premium",
 *     variant: "default"
 *   }}
 *   metadata="Last updated 2h ago"
 *   variant="elevated"
 *   selected={true}
 * />
 * 
 * <SListItemLink
 *   title="External Documentation"
 *   description="View our help documentation"
 *   icon="book"
 *   href="https://docs.example.com"
 *   external={true}
 *   target="_blank"
 * />
 * ```
 */
const SListItemLink = React.forwardRef<HTMLButtonElement, ListItemLinkProps>(
  (
    {
      className,
      title,
      description,
      icon,
      iconColor = 'default',
      avatar,
      trailingIcon = 'chevron-right',
      badge,
      metadata,
      loading = false,
      selected = false,
      contentAlignment = 'start',
      metaAlignment = 'end',
      iconSize,
      leadingContent,
      trailingContent,
      href,
      target,
      rel,
      external = false,
      onClick,
      disabled,
      variant,
      size,
      spacing,
      alignment,
      ...props
    },
    ref
  ) => {
    // Determine if this should render as a link
    const isLink = Boolean(href);
    const Component = isLink ? 'a' : 'button';

    // Handle click for both button and link behaviors
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      },
      [onClick, disabled, loading]
    );

    const linkProps = isLink ? {
      href,
      target: external ? '_blank' : target,
      rel: external ? 'noopener noreferrer' : rel,
      role: 'link',
    } : {};

    const buttonProps = !isLink ? {
      type: 'button' as const,
      disabled: disabled || loading,
      onClick: handleClick,
    } : {};

    const commonProps = {
      ref,
      className: cn(
        sListItemLinkVariants({ variant, size, spacing, alignment }),
        selected && 'bg-primary/10 border-primary/20',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      ),
      'aria-selected': selected,
      'aria-disabled': disabled || loading,
      ...props,
    };

    return (
      <Component
        {...commonProps}
        {...(isLink ? linkProps : buttonProps)}
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
        <div className={cn(sListItemMetaVariants({ alignment: metaAlignment }))}>
          {trailingContent || (
            <>
              {external && (
                <Icon
                  name="external-link"
                  className="w-3 h-3 text-muted-foreground"
                />
              )}
              {trailingIcon && (
                <Icon
                  name={trailingIcon}
                  className={cn(
                    'text-muted-foreground group-hover:text-foreground transition-colors',
                    size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
                  )}
                />
              )}
            </>
          )}
        </div>
      </Component>
    );
  }
);

SListItemLink.displayName = 'SListItemLink';

export { SListItemLink, sListItemLinkVariants };
export type { ListItemLinkProps };