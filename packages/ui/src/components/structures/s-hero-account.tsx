import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Headline } from '../primitives/headline';
import { Button } from '../primitives/button';
import { Avatar } from '../primitives/avatar';
import { Badge } from '../primitives/badge';

/**
 * S-HeroAccount variant styles using Acrobi Design System classes
 * Main hero section for account pages with user avatar, name, and actions
 */
const sHeroAccountVariants = cva(
  'hero-account-wrap relative p-6 bg-gradient-to-br from-background to-muted/20 border border-border rounded-lg overflow-hidden',
  {
    variants: {
      variant: {
        default: '',
        premium: 'border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10',
        verified: 'border-success/20 bg-gradient-to-br from-success/5 to-success/10',
        compact: 'p-4',
      },
      size: {
        sm: 'min-h-[120px]',
        default: 'min-h-[160px]',
        lg: 'min-h-[200px]',
      },
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      alignment: 'left',
    },
  }
);

const sHeroAvatarVariants = cva('', {
  variants: {
    size: {
      sm: 'w-12 h-12',
      default: 'w-16 h-16',
      lg: 'w-20 h-20',
    },
    alignment: {
      left: '',
      center: 'mx-auto',
      right: 'ml-auto',
    },
  },
  defaultVariants: {
    size: 'default',
    alignment: 'left',
  },
});

const sHeroContentVariants = cva('flex flex-col', {
  variants: {
    alignment: {
      left: 'items-start text-left',
      center: 'items-center text-center',
      right: 'items-end text-right',
    },
    spacing: {
      tight: 'space-y-2',
      default: 'space-y-3',
      loose: 'space-y-4',
    },
  },
  defaultVariants: {
    alignment: 'left',
    spacing: 'default',
  },
});

const sHeroActionsVariants = cva('flex gap-2', {
  variants: {
    alignment: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    alignment: 'left',
    orientation: 'horizontal',
  },
});

export interface HeroAccountStats {
  /**
   * Stat label
   */
  label: string;
  /**
   * Stat value
   */
  value: string | number;
  /**
   * Optional icon for the stat
   */
  icon?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export interface HeroAccountAction {
  /**
   * Action label
   */
  label: string;
  /**
   * Action icon
   */
  icon?: string;
  /**
   * Button variant
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /**
   * Button size
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /**
   * Whether action is disabled
   */
  disabled?: boolean;
  /**
   * Whether action is loading
   */
  loading?: boolean;
  /**
   * Action click handler
   */
  onClick?: () => void;
}

export interface SHeroAccountProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sHeroAccountVariants> {
  /**
   * User's display name
   */
  displayName?: string;
  /**
   * User's username/handle
   */
  username?: string;
  /**
   * User's avatar URL
   */
  avatarUrl?: string;
  /**
   * User's avatar fallback initials
   */
  avatarFallback?: string;
  /**
   * User's bio or description
   */
  bio?: string;
  /**
   * User badges (verified, premium, etc.)
   */
  badges?: Array<{
    label: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    icon?: string;
  }>;
  /**
   * Account stats to display
   */
  stats?: HeroAccountStats[];
  /**
   * Action buttons
   */
  actions?: HeroAccountAction[];
  /**
   * Actions orientation
   */
  actionsOrientation?: 'horizontal' | 'vertical';
  /**
   * Content spacing
   */
  spacing?: 'tight' | 'default' | 'loose';
  /**
   * Whether to show a background pattern
   */
  showPattern?: boolean;
  /**
   * Custom background image URL
   */
  backgroundImage?: string;
  /**
   * Additional content to render
   */
  children?: React.ReactNode;
}

/**
 * S-HeroAccount - Main hero section for account pages
 *
 * This structure provides a prominent display area for user account information,
 * including avatar, name, bio, stats, and action buttons. It serves as the main
 * header for profile and account pages.
 *
 * Key features:
 * - User avatar with fallback initials
 * - Display name and username
 * - User bio or description
 * - Customizable badges (verified, premium, etc.)
 * - Account statistics display
 * - Action buttons for profile management
 * - Multiple layout variants and alignment options
 * - Support for background images and patterns
 * - Responsive design with proper spacing
 *
 * @example
 * ```tsx
 * <SHeroAccount
 *   displayName="John Doe"
 *   username="@johndoe"
 *   avatarUrl="/avatar.jpg"
 *   avatarFallback="JD"
 *   bio="Software developer passionate about creating amazing user experiences"
 *   badges={[
 *     { label: "Verified", variant: "secondary", icon: "✓" },
 *     { label: "Premium", variant: "default" }
 *   ]}
 *   stats={[
 *     { label: "Posts", value: 127 },
 *     { label: "Followers", value: "2.3K" },
 *     { label: "Following", value: 89 }
 *   ]}
 *   actions={[
 *     { label: "Edit Profile", variant: "outline" },
 *     { label: "Settings", variant: "ghost", icon: "⚙️" }
 *   ]}
 *   variant="verified"
 *   alignment="center"
 * />
 * ```
 */
const SHeroAccount = React.forwardRef<HTMLDivElement, SHeroAccountProps>(
  (
    {
      className,
      displayName,
      username,
      avatarUrl,
      avatarFallback,
      bio,
      badges = [],
      stats = [],
      actions = [],
      actionsOrientation = 'horizontal',
      spacing = 'default',
      showPattern = false,
      backgroundImage,
      variant,
      size,
      alignment = 'left',
      children,
      ...props
    },
    ref
  ) => {
    const isCenter = alignment === 'center';
    const hasStats = stats.length > 0;
    const hasActions = actions.length > 0;

    return (
      <div
        ref={ref}
        className={cn(sHeroAccountVariants({ variant, size, alignment }), className)}
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        }}
        {...props}
      >
        {/* Background Pattern */}
        {showPattern && (
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/10 to-transparent" />
          </div>
        )}

        {/* Main Content */}
        <div
          className={cn(
            sHeroContentVariants({ alignment, spacing }),
            'relative z-10'
          )}
        >
          {/* Avatar */}
          <Avatar
            src={avatarUrl}
            fallback={avatarFallback || displayName?.charAt(0) || '?'}
            className={cn(sHeroAvatarVariants({ size, alignment }), 'mb-3')}
          />

          {/* Name and Username */}
          <div className={cn('space-y-1', isCenter && 'text-center')}>
            {displayName && (
              <Headline
                title={displayName}
                titleSize="h3"
                className="font-semibold leading-tight"
              />
            )}
            {username && (
              <p className="text-muted-foreground text-sm font-medium">
                {username}
              </p>
            )}
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <div className={cn('flex flex-wrap gap-2', isCenter && 'justify-center')}>
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant={badge.variant || 'secondary'}
                  className="text-xs"
                >
                  {badge.icon && <span className="mr-1">{badge.icon}</span>}
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}

          {/* Bio */}
          {bio && (
            <p
              className={cn(
                'text-muted-foreground text-sm leading-relaxed max-w-lg',
                isCenter && 'text-center mx-auto'
              )}
            >
              {bio}
            </p>
          )}

          {/* Stats */}
          {hasStats && (
            <div
              className={cn(
                'flex gap-6',
                isCenter && 'justify-center',
                alignment === 'right' && 'justify-end'
              )}
            >
              {stats.map((stat, index) => (
                <button
                  key={index}
                  onClick={stat.onClick}
                  className={cn(
                    'flex flex-col items-center space-y-1 transition-colors',
                    stat.onClick && 'hover:text-primary cursor-pointer',
                    !stat.onClick && 'cursor-default'
                  )}
                  disabled={!stat.onClick}
                >
                  <div className="flex items-center gap-1">
                    {stat.icon && (
                      <span className="text-xs opacity-70">{stat.icon}</span>
                    )}
                    <span className="font-semibold text-sm">{stat.value}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Actions */}
          {hasActions && (
            <div
              className={cn(
                sHeroActionsVariants({
                  alignment,
                  orientation: actionsOrientation,
                }),
                'mt-4'
              )}
            >
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'outline'}
                  size={action.size || 'sm'}
                  disabled={action.disabled || action.loading}
                  onClick={action.onClick}
                  className={cn(
                    actionsOrientation === 'vertical' && 'w-full justify-center'
                  )}
                >
                  {action.loading && (
                    <div className="animate-spin rounded-full h-3 w-3 border border-current border-t-transparent mr-2" />
                  )}
                  {action.icon && !action.loading && (
                    <span className="mr-2 text-sm">{action.icon}</span>
                  )}
                  {action.label}
                </Button>
              ))}
            </div>
          )}

          {/* Custom Content */}
          {children}
        </div>
      </div>
    );
  }
);

SHeroAccount.displayName = 'SHeroAccount';

export { SHeroAccount, sHeroAccountVariants };
export type { HeroAccountStats, HeroAccountAction };