import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Headline } from '../primitives/headline';
import { Button } from '../primitives/button';
import { Icon } from '../primitives/icon';
import { Badge } from '../primitives/badge';

/**
 * S-SectionCard variant styles using Acrobi Design System classes
 * Reusable card component for Snippet page sections with header, content, and actions
 */
const sSectionCardVariants = cva(
  'section-card bg-card border border-border rounded-lg transition-colors',
  {
    variants: {
      variant: {
        default: '',
        elevated: 'shadow-sm hover:shadow-md transition-shadow',
        flat: 'border-0 bg-muted/30',
        outlined: 'border-2',
        ghost: 'border-0 bg-transparent',
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
      interactive: {
        true: 'hover:bg-accent/50 cursor-pointer transition-colors',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      interactive: false,
    },
  }
);

const sSectionHeaderVariants = cva('section-card-header flex items-start justify-between', {
  variants: {
    spacing: {
      tight: 'mb-3',
      default: 'mb-4',
      loose: 'mb-6',
    },
  },
  defaultVariants: {
    spacing: 'default',
  },
});

const sSectionContentVariants = cva('section-card-content', {
  variants: {
    spacing: {
      tight: 'space-y-2',
      default: 'space-y-3',
      loose: 'space-y-4',
    },
  },
  defaultVariants: {
    spacing: 'default',
  },
});

const sSectionFooterVariants = cva('section-card-footer flex items-center justify-between', {
  variants: {
    spacing: {
      tight: 'mt-3',
      default: 'mt-4',
      loose: 'mt-6',
    },
  },
  defaultVariants: {
    spacing: 'default',
  },
});

export interface SectionCardAction {
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

export interface SectionCardBadge {
  /**
   * Badge text
   */
  text: string;
  /**
   * Badge variant
   */
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  /**
   * Badge icon
   */
  icon?: string;
}

export interface SSectionCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sSectionCardVariants> {
  /**
   * Card title
   */
  title?: string;
  /**
   * Card subtitle or description
   */
  subtitle?: string;
  /**
   * Card icon
   */
  icon?: string;
  /**
   * Icon color
   */
  iconColor?: 'p500' | 'n700' | 'n500' | 'n300' | 'inherit';
  /**
   * Icon size
   */
  iconSize?: 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl';
  /**
   * Header badges
   */
  badges?: SectionCardBadge[];
  /**
   * Header actions (small buttons/icons)
   */
  headerActions?: SectionCardAction[];
  /**
   * Footer actions (primary actions)
   */
  footerActions?: SectionCardAction[];
  /**
   * Content spacing
   */
  spacing?: 'tight' | 'default' | 'loose';
  /**
   * Whether the card is loading
   */
  loading?: boolean;
  /**
   * Whether the card has an error state
   */
  error?: boolean;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * Whether to show a divider between header and content
   */
  showDivider?: boolean;
  /**
   * Custom header content
   */
  headerContent?: React.ReactNode;
  /**
   * Custom footer content
   */
  footerContent?: React.ReactNode;
  /**
   * Card click handler (when interactive)
   */
  onCardClick?: () => void;
  /**
   * Additional content
   */
  children?: React.ReactNode;
}

/**
 * S-SectionCard - Reusable card for Snippet page sections
 *
 * This structure provides a flexible card component for organizing content
 * into sections on snippet and account pages. It includes configurable
 * headers, content areas, and action buttons.
 *
 * Key features:
 * - Flexible header with title, subtitle, icon, and badges
 * - Customizable content area with proper spacing
 * - Header and footer action buttons
 * - Multiple visual variants (elevated, flat, outlined, ghost)
 * - Interactive states with hover effects
 * - Loading and error states
 * - Responsive design with proper spacing
 * - Support for custom header and footer content
 *
 * @example
 * ```tsx
 * <SSectionCard
 *   title="Code Snippet"
 *   subtitle="JavaScript utility functions"
 *   icon="code"
 *   iconColor="p500"
 *   badges={[
 *     { text: "Public", variant: "secondary" },
 *     { text: "JavaScript", variant: "outline" }
 *   ]}
 *   headerActions={[
 *     { label: "Edit", icon: "✏️", variant: "ghost", size: "sm" },
 *     { label: "More", icon: "⋯", variant: "ghost", size: "sm" }
 *   ]}
 *   footerActions={[
 *     { label: "View", variant: "outline" },
 *     { label: "Copy", variant: "default" }
 *   ]}
 *   variant="elevated"
 *   interactive
 * >
 *   <p>Your snippet content goes here...</p>
 * </SSectionCard>
 * ```
 */
const SSectionCard = React.forwardRef<HTMLDivElement, SSectionCardProps>(
  (
    {
      className,
      title,
      subtitle,
      icon,
      iconColor = 'p500',
      iconSize = 'l',
      badges = [],
      headerActions = [],
      footerActions = [],
      spacing = 'default',
      loading = false,
      error = false,
      errorMessage,
      showDivider = false,
      headerContent,
      footerContent,
      onCardClick,
      variant,
      size,
      interactive,
      children,
      ...props
    },
    ref
  ) => {
    const hasHeader = title || subtitle || icon || badges.length > 0 || headerActions.length > 0 || headerContent;
    const hasFooter = footerActions.length > 0 || footerContent;
    const isInteractive = interactive || Boolean(onCardClick);

    const handleCardClick = () => {
      if (onCardClick && !loading) {
        onCardClick();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          sSectionCardVariants({ variant, size, interactive: isInteractive }),
          error && 'border-destructive bg-destructive/5',
          className
        )}
        onClick={isInteractive ? handleCardClick : undefined}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={
          isInteractive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick();
                }
              }
            : undefined
        }
        {...props}
      >
        {/* Header */}
        {hasHeader && (
          <>
            <div className={cn(sSectionHeaderVariants({ spacing }))}>
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* Icon */}
                {icon && (
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon name={icon} color={iconColor} size={iconSize} />
                  </div>
                )}

                {/* Title and Subtitle */}
                <div className="flex-1 min-w-0">
                  {title && (
                    <Headline
                      title={title}
                      titleSize="h4"
                      className="font-semibold leading-tight"
                    />
                  )}
                  {subtitle && (
                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                      {subtitle}
                    </p>
                  )}
                  
                  {/* Badges */}
                  {badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {badges.map((badge, index) => (
                        <Badge
                          key={index}
                          variant={badge.variant || 'secondary'}
                          className="text-xs"
                        >
                          {badge.icon && <span className="mr-1">{badge.icon}</span>}
                          {badge.text}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Header Actions */}
              {headerActions.length > 0 && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  {headerActions.map((action, index) => (
                    <Button
                      key={index}
                      variant={action.variant || 'ghost'}
                      size={action.size || 'sm'}
                      disabled={action.disabled || action.loading || loading}
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick?.();
                      }}
                    >
                      {action.loading && (
                        <div className="animate-spin rounded-full h-3 w-3 border border-current border-t-transparent mr-1" />
                      )}
                      {action.icon && !action.loading && (
                        <span className="text-sm">{action.icon}</span>
                      )}
                      {action.size !== 'icon' && action.label}
                    </Button>
                  ))}
                </div>
              )}

              {/* Custom Header Content */}
              {headerContent}
            </div>

            {/* Divider */}
            {showDivider && (
              <div className={cn('border-t border-border', spacing === 'tight' ? 'mb-3' : spacing === 'loose' ? 'mb-6' : 'mb-4')} />
            )}
          </>
        )}

        {/* Content */}
        <div className={cn(sSectionContentVariants({ spacing }))}>
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
            </div>
          )}

          {error && !loading && (
            <div className="flex items-center gap-2 text-destructive text-sm py-4">
              <Icon name="alert-circle" size="s" color="inherit" />
              <span>{errorMessage || 'Something went wrong'}</span>
            </div>
          )}

          {!loading && !error && children}
        </div>

        {/* Footer */}
        {hasFooter && !loading && (
          <div className={cn(sSectionFooterVariants({ spacing }))}>
            {/* Footer Actions */}
            {footerActions.length > 0 && (
              <div className="flex items-center gap-2 flex-1">
                {footerActions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || 'outline'}
                    size={action.size || 'sm'}
                    disabled={action.disabled || action.loading}
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onClick?.();
                    }}
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

            {/* Custom Footer Content */}
            {footerContent}
          </div>
        )}
      </div>
    );
  }
);

SSectionCard.displayName = 'SSectionCard';

export { SSectionCard, sSectionCardVariants };
export type { SectionCardAction, SectionCardBadge };