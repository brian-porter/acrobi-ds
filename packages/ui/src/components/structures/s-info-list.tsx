import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Icon } from '../primitives/icon';
import { Button } from '../primitives/button';
import { Badge } from '../primitives/badge';

/**
 * S-InfoList variant styles using Acrobi Design System classes
 * Structure for displaying labeled data rows with consistent formatting
 */
const sInfoListVariants = cva(
  'info-list space-y-0',
  {
    variants: {
      variant: {
        default: '',
        card: 'bg-card border border-border rounded-lg p-4',
        bordered: 'border border-border rounded-lg',
        minimal: 'space-y-1',
      },
      size: {
        sm: 'text-sm',
        default: '',
        lg: 'text-base',
      },
      spacing: {
        tight: 'space-y-1',
        default: 'space-y-2',
        loose: 'space-y-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      spacing: 'default',
    },
  }
);

const sInfoItemVariants = cva(
  'info-list-item flex items-start justify-between py-3 border-b border-border/50 last:border-b-0',
  {
    variants: {
      variant: {
        default: '',
        compact: 'py-2',
        spacious: 'py-4',
        minimal: 'py-1 border-b-0',
      },
      alignment: {
        top: 'items-start',
        center: 'items-center',
        bottom: 'items-end',
      },
      interactive: {
        true: 'hover:bg-accent/50 cursor-pointer transition-colors rounded-sm px-2 -mx-2',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      alignment: 'center',
      interactive: false,
    },
  }
);

const sInfoLabelVariants = cva(
  'info-list-label flex items-center gap-2 text-muted-foreground font-medium flex-shrink-0',
  {
    variants: {
      size: {
        sm: 'text-xs min-w-[80px]',
        default: 'text-sm min-w-[100px]',
        lg: 'text-base min-w-[120px]',
      },
      weight: {
        normal: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      size: 'default',
      weight: 'normal',
    },
  }
);

const sInfoValueVariants = cva(
  'info-list-value flex items-center gap-2 text-right flex-1 min-w-0',
  {
    variants: {
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
      },
      alignment: {
        left: 'text-left justify-start',
        right: 'text-right justify-end',
        center: 'text-center justify-center',
      },
    },
    defaultVariants: {
      size: 'default',
      weight: 'normal',
      alignment: 'right',
    },
  }
);

export interface InfoListAction {
  /**
   * Action label (for accessibility)
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

export interface InfoListItem {
  /**
   * Unique identifier for the item
   */
  id?: string;
  /**
   * Item label
   */
  label: string;
  /**
   * Item value (can be string, number, or React node)
   */
  value: React.ReactNode;
  /**
   * Optional icon for the label
   */
  icon?: string;
  /**
   * Icon color
   */
  iconColor?: 'p500' | 'n700' | 'n500' | 'n300' | 'inherit';
  /**
   * Optional badge for the value
   */
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  /**
   * Item actions
   */
  actions?: InfoListAction[];
  /**
   * Whether the item is interactive
   */
  interactive?: boolean;
  /**
   * Item click handler
   */
  onClick?: () => void;
  /**
   * Custom CSS class for the item
   */
  className?: string;
  /**
   * Whether to hide the item
   */
  hidden?: boolean;
}

export interface SInfoListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sInfoListVariants> {
  /**
   * List of info items to display
   */
  items: InfoListItem[];
  /**
   * Item variant style
   */
  itemVariant?: 'default' | 'compact' | 'spacious' | 'minimal';
  /**
   * Item alignment
   */
  itemAlignment?: 'top' | 'center' | 'bottom';
  /**
   * Label size
   */
  labelSize?: 'sm' | 'default' | 'lg';
  /**
   * Label weight
   */
  labelWeight?: 'normal' | 'semibold' | 'bold';
  /**
   * Value size
   */
  valueSize?: 'sm' | 'default' | 'lg';
  /**
   * Value weight
   */
  valueWeight?: 'normal' | 'medium' | 'semibold';
  /**
   * Value alignment
   */
  valueAlignment?: 'left' | 'right' | 'center';
  /**
   * Whether to show loading state
   */
  loading?: boolean;
  /**
   * Whether to show empty state
   */
  showEmpty?: boolean;
  /**
   * Empty state message
   */
  emptyMessage?: string;
  /**
   * Additional content to render at the top
   */
  header?: React.ReactNode;
  /**
   * Additional content to render at the bottom
   */
  footer?: React.ReactNode;
}

/**
 * S-InfoList - Structure for displaying labeled data rows
 *
 * This structure provides a consistent way to display key-value pairs,
 * settings, metadata, and other structured information. It supports
 * icons, badges, actions, and interactive elements.
 *
 * Key features:
 * - Consistent label-value layout with proper alignment
 * - Support for icons, badges, and action buttons
 * - Multiple visual variants (card, bordered, minimal)
 * - Interactive items with click handlers
 * - Customizable sizing and spacing
 * - Loading and empty states
 * - Responsive design with proper text wrapping
 * - Accessibility support with proper ARIA labels
 *
 * @example
 * ```tsx
 * <SInfoList
 *   items={[
 *     {
 *       label: "Account Type",
 *       value: "Premium",
 *       icon: "crown",
 *       badge: { text: "Active", variant: "secondary" }
 *     },
 *     {
 *       label: "Email",
 *       value: "user@example.com",
 *       icon: "mail",
 *       actions: [
 *         { label: "Edit", icon: "✏️", variant: "ghost", size: "sm" }
 *       ]
 *     },
 *     {
 *       label: "Last Login",
 *       value: "2 hours ago",
 *       icon: "clock",
 *       interactive: true,
 *       onClick: () => console.log("Show login history")
 *     }
 *   ]}
 *   variant="card"
 *   labelWeight="semibold"
 *   valueAlignment="left"
 * />
 * ```
 */
const SInfoList = React.forwardRef<HTMLDivElement, SInfoListProps>(
  (
    {
      className,
      items,
      itemVariant = 'default',
      itemAlignment = 'center',
      labelSize = 'default',
      labelWeight = 'normal',
      valueSize = 'default',
      valueWeight = 'normal',
      valueAlignment = 'right',
      loading = false,
      showEmpty = true,
      emptyMessage = 'No information available',
      header,
      footer,
      variant,
      size,
      spacing,
      ...props
    },
    ref
  ) => {
    const visibleItems = items.filter(item => !item.hidden);
    const hasItems = visibleItems.length > 0;

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(sInfoListVariants({ variant, size, spacing }), className)}
          {...props}
        >
          {header}
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
          </div>
          {footer}
        </div>
      );
    }

    if (!hasItems && showEmpty) {
      return (
        <div
          ref={ref}
          className={cn(sInfoListVariants({ variant, size, spacing }), className)}
          {...props}
        >
          {header}
          <div className="flex items-center justify-center py-8 text-muted-foreground text-sm">
            {emptyMessage}
          </div>
          {footer}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(sInfoListVariants({ variant, size, spacing }), className)}
        {...props}
      >
        {header}
        
        <div className="space-y-0">
          {visibleItems.map((item, index) => {
            const isInteractive = item.interactive || Boolean(item.onClick);

            return (
              <div
                key={item.id || index}
                className={cn(
                  sInfoItemVariants({
                    variant: itemVariant,
                    alignment: itemAlignment,
                    interactive: isInteractive,
                  }),
                  item.className
                )}
                onClick={isInteractive ? item.onClick : undefined}
                role={isInteractive ? 'button' : undefined}
                tabIndex={isInteractive ? 0 : undefined}
                onKeyDown={
                  isInteractive
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          item.onClick?.();
                        }
                      }
                    : undefined
                }
              >
                {/* Label */}
                <div
                  className={cn(
                    sInfoLabelVariants({ size: labelSize, weight: labelWeight })
                  )}
                >
                  {item.icon && (
                    <Icon
                      name={item.icon}
                      color={item.iconColor || 'n500'}
                      size="sm"
                    />
                  )}
                  <span>{item.label}</span>
                </div>

                {/* Value */}
                <div
                  className={cn(
                    sInfoValueVariants({
                      size: valueSize,
                      weight: valueWeight,
                      alignment: valueAlignment,
                    }),
                    'ml-4'
                  )}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="truncate">{item.value}</span>
                    
                    {item.badge && (
                      <Badge
                        variant={item.badge.variant || 'secondary'}
                        className="text-xs flex-shrink-0"
                      >
                        {item.badge.text}
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  {item.actions && item.actions.length > 0 && (
                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                      {item.actions.map((action, actionIndex) => (
                        <Button
                          key={actionIndex}
                          variant={action.variant || 'ghost'}
                          size={action.size || 'sm'}
                          disabled={action.disabled || action.loading}
                          onClick={(e) => {
                            e.stopPropagation();
                            action.onClick?.();
                          }}
                          aria-label={action.label}
                        >
                          {action.loading && (
                            <div className="animate-spin rounded-full h-3 w-3 border border-current border-t-transparent" />
                          )}
                          {action.icon && !action.loading && (
                            <span className="text-sm">{action.icon}</span>
                          )}
                          {action.size !== 'icon' && action.size !== 'sm' && action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {footer}
      </div>
    );
  }
);

SInfoList.displayName = 'SInfoList';

export { SInfoList, sInfoListVariants };
export type { InfoListItem, InfoListAction };