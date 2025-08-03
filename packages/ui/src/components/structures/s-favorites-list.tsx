import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';
import { Badge } from '../primitives/badge';
import { Icon } from '../primitives/icon';
import { Avatar } from '../primitives/avatar';

/**
 * S-FavoritesList variant styles using Acrobi Design System classes
 * List layout for displaying favorited items in a vertical list format
 */
const sFavoritesListVariants = cva(
  'favorites-list space-y-0',
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
        lg: 'text-base space-y-1',
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

const sFavoriteItemVariants = cva(
  'favorite-item flex items-center gap-4 p-4 border-b border-border/50 last:border-b-0 transition-colors',
  {
    variants: {
      variant: {
        default: '',
        compact: 'py-3 gap-3',
        spacious: 'py-6 gap-6',
        minimal: 'py-2 gap-2 border-b-0',
      },
      interactive: {
        true: 'hover:bg-accent/50 cursor-pointer',
        false: '',
      },
      selected: {
        true: 'bg-primary/5 border-primary/20',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: true,
      selected: false,
    },
  }
);

const sFavoriteContentVariants = cva(
  'favorite-content flex-1 min-w-0',
  {
    variants: {
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      alignment: 'left',
    },
  }
);

const sFavoriteActionsVariants = cva(
  'favorite-actions flex items-center gap-2 flex-shrink-0',
  {
    variants: {
      alignment: {
        start: 'justify-start',
        end: 'justify-end',
        center: 'justify-center',
      },
    },
    defaultVariants: {
      alignment: 'end',
    },
  }
);

export interface FavoriteListAction {
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
  onClick?: (itemId: string) => void;
}

export interface FavoriteListItem {
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Item title
   */
  title: string;
  /**
   * Item description/subtitle
   */
  description?: string;
  /**
   * Item type (for categorization)
   */
  type?: string;
  /**
   * Item thumbnail/image URL
   */
  imageUrl?: string;
  /**
   * Item avatar (for people/users)
   */
  avatarUrl?: string;
  /**
   * Avatar fallback text
   */
  avatarFallback?: string;
  /**
   * Item icon
   */
  icon?: string;
  /**
   * Icon color
   */
  iconColor?: 'p500' | 'n700' | 'n500' | 'n300' | 'inherit';
  /**
   * Item badges/tags
   */
  badges?: Array<{
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }>;
  /**
   * Item metadata (stats, date, etc.)
   */
  metadata?: Array<{
    label: string;
    value: string;
    icon?: string;
  }>;
  /**
   * When the item was favorited
   */
  favoritedAt?: Date;
  /**
   * Item URL/link
   */
  href?: string;
  /**
   * Whether the item is selected
   */
  selected?: boolean;
  /**
   * Whether the item is featured/pinned
   */
  featured?: boolean;
  /**
   * Custom click handler
   */
  onClick?: (item: FavoriteListItem) => void;
}

export interface SFavoritesListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sFavoritesListVariants> {
  /**
   * List of favorite items
   */
  items: FavoriteListItem[];
  /**
   * Item variant
   */
  itemVariant?: 'default' | 'compact' | 'spacious' | 'minimal';
  /**
   * Whether items are interactive
   */
  itemInteractive?: boolean;
  /**
   * Global actions for all items
   */
  actions?: FavoriteListAction[];
  /**
   * Whether to show item type
   */
  showType?: boolean;
  /**
   * Whether to show favorited date
   */
  showFavoritedDate?: boolean;
  /**
   * Whether to show item metadata
   */
  showMetadata?: boolean;
  /**
   * Whether to show featured badge
   */
  showFeatured?: boolean;
  /**
   * Whether list is in loading state
   */
  loading?: boolean;
  /**
   * Number of loading placeholder items
   */
  loadingCount?: number;
  /**
   * Whether to show empty state
   */
  showEmpty?: boolean;
  /**
   * Empty state message
   */
  emptyMessage?: string;
  /**
   * Empty state description
   */
  emptyDescription?: string;
  /**
   * Empty state action button
   */
  emptyAction?: {
    label: string;
    onClick: () => void;
  };
  /**
   * Selection mode
   */
  selectionMode?: 'none' | 'single' | 'multiple';
  /**
   * Selected item IDs
   */
  selectedIds?: string[];
  /**
   * Selection change handler
   */
  onSelectionChange?: (selectedIds: string[]) => void;
  /**
   * Item click handler
   */
  onItemClick?: (item: FavoriteListItem) => void;
  /**
   * Content alignment
   */
  contentAlignment?: 'left' | 'center' | 'right';
  /**
   * Actions alignment
   */
  actionsAlignment?: 'start' | 'end' | 'center';
  /**
   * Additional header content
   */
  header?: React.ReactNode;
  /**
   * Additional footer content
   */
  footer?: React.ReactNode;
}

/**
 * S-FavoritesList - List layout for favorites page
 *
 * This structure provides a vertical list layout for displaying favorited
 * items with detailed information, metadata, and actions. It's ideal for
 * showing more detailed information per item compared to the grid layout.
 *
 * Key features:
 * - Vertical list layout with consistent item structure
 * - Support for avatars, images, icons, and badges
 * - Item metadata display (stats, dates, etc.)
 * - Selection modes (single/multiple)
 * - Interactive items with hover effects
 * - Featured/pinned item support
 * - Loading and empty states
 * - Flexible spacing and sizing options
 * - Accessible keyboard navigation
 * - Responsive design with proper text truncation
 *
 * @example
 * ```tsx
 * <SFavoritesList
 *   items={[
 *     {
 *       id: "1",
 *       title: "Advanced React Patterns",
 *       description: "Collection of advanced React patterns and techniques",
 *       type: "snippet",
 *       avatarUrl: "/user.jpg",
 *       avatarFallback: "AR",
 *       badges: [
 *         { text: "React", variant: "secondary" },
 *         { text: "TypeScript", variant: "outline" }
 *       ],
 *       metadata: [
 *         { label: "Views", value: "2.3K", icon: "👁️" },
 *         { label: "Forks", value: "45", icon: "🔗" }
 *       ],
 *       favoritedAt: new Date(),
 *       featured: true
 *     }
 *   ]}
 *   itemVariant="spacious"
 *   showType
 *   showMetadata
 *   showFeatured
 *   actions={[
 *     { label: "Share", icon: "🔗", variant: "ghost" },
 *     { label: "Remove", icon: "❌", variant: "ghost" }
 *   ]}
 * />
 * ```
 */
const SFavoritesList = React.forwardRef<HTMLDivElement, SFavoritesListProps>(
  (
    {
      className,
      items,
      itemVariant = 'default',
      itemInteractive = true,
      actions = [],
      showType = true,
      showFavoritedDate = false,
      showMetadata = true,
      showFeatured = true,
      loading = false,
      loadingCount = 5,
      showEmpty = true,
      emptyMessage = 'No favorites yet',
      emptyDescription = 'Items you favorite will appear here',
      emptyAction,
      selectionMode = 'none',
      selectedIds = [],
      onSelectionChange,
      onItemClick,
      contentAlignment = 'left',
      actionsAlignment = 'end',
      header,
      footer,
      variant,
      size,
      spacing,
      ...props
    },
    ref
  ) => {
    const isSelectable = selectionMode !== 'none';
    const hasItems = items.length > 0;

    const handleItemClick = (item: FavoriteListItem, e: React.MouseEvent) => {
      if (e.defaultPrevented) return;

      // Handle selection if in selection mode
      if (isSelectable) {
        const isSelected = selectedIds.includes(item.id);
        let newSelectedIds: string[];

        if (selectionMode === 'single') {
          newSelectedIds = isSelected ? [] : [item.id];
        } else {
          newSelectedIds = isSelected
            ? selectedIds.filter(id => id !== item.id)
            : [...selectedIds, item.id];
        }

        onSelectionChange?.(newSelectedIds);
      }

      // Call custom click handler
      if (item.onClick) {
        item.onClick(item);
      } else {
        onItemClick?.(item);
      }
    };

    const formatDate = (date: Date) => {
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
      return `${Math.floor(diffDays / 365)} years ago`;
    };

    // Loading state
    if (loading) {
      const loadingItems = Array.from({ length: loadingCount }, (_, i) => (
        <div key={i} className={cn(sFavoriteItemVariants({ variant: itemVariant, interactive: false, selected: false }))}>
          <div className="animate-pulse flex items-center gap-4 w-full">
            <div className="w-12 h-12 bg-muted rounded-full flex-shrink-0"></div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
              <div className="flex gap-2">
                <div className="h-5 bg-muted rounded w-16"></div>
                <div className="h-5 bg-muted rounded w-20"></div>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <div className="h-8 w-8 bg-muted rounded"></div>
              <div className="h-8 w-8 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      ));

      return (
        <div
          ref={ref}
          className={cn(sFavoritesListVariants({ variant, size, spacing }), className)}
          {...props}
        >
          {header}
          <div className="space-y-0">
            {loadingItems}
          </div>
          {footer}
        </div>
      );
    }

    // Empty state
    if (!hasItems && showEmpty) {
      return (
        <div
          ref={ref}
          className={cn(sFavoritesListVariants({ variant, size, spacing }), className)}
          {...props}
        >
          {header}
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Icon name="heart" size="l" color="n300" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {emptyMessage}
            </h3>
            {emptyDescription && (
              <p className="text-muted-foreground mb-6 max-w-sm">
                {emptyDescription}
              </p>
            )}
            {emptyAction && (
              <Button onClick={emptyAction.onClick}>
                {emptyAction.label}
              </Button>
            )}
          </div>
          {footer}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(sFavoritesListVariants({ variant, size, spacing }), className)}
        {...props}
      >
        {header}

        <div className="space-y-0">
          {items.map((item) => {
            const isSelected = selectedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={cn(
                  sFavoriteItemVariants({
                    variant: itemVariant,
                    interactive: itemInteractive,
                    selected: isSelected && isSelectable,
                  })
                )}
                onClick={(e) => handleItemClick(item, e)}
                role={itemInteractive ? 'button' : undefined}
                tabIndex={itemInteractive ? 0 : undefined}
                onKeyDown={
                  itemInteractive
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleItemClick(item, e as any);
                        }
                      }
                    : undefined
                }
              >
                {/* Selection Checkbox */}
                {isSelectable && (
                  <div
                    className={cn(
                      'w-4 h-4 border border-border rounded flex items-center justify-center flex-shrink-0',
                      isSelected && 'bg-primary border-primary'
                    )}
                  >
                    {isSelected && (
                      <Icon name="check" size="xs" color="inherit" className="text-primary-foreground" />
                    )}
                  </div>
                )}

                {/* Avatar/Image/Icon */}
                <div className="flex-shrink-0">
                  {item.avatarUrl || item.avatarFallback ? (
                    <Avatar
                      src={item.avatarUrl}
                      fallback={item.avatarFallback || item.title.charAt(0)}
                      className="w-12 h-12"
                    />
                  ) : item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : item.icon ? (
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Icon
                        name={item.icon}
                        color={item.iconColor || 'p500'}
                        size="l"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name="heart" size="m" color="n300" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={cn(sFavoriteContentVariants({ alignment: contentAlignment }))}>
                  {/* Title and Featured Badge */}
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm leading-tight line-clamp-1 flex-1">
                      {item.title}
                    </h4>
                    {showFeatured && item.featured && (
                      <Badge variant="secondary" className="text-xs flex-shrink-0">
                        <Icon name="star" size="xs" color="inherit" className="mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-2">
                      {item.description}
                    </p>
                  )}

                  {/* Badges and Metadata Row */}
                  <div className="flex items-center gap-4 text-xs">
                    {/* Type */}
                    {showType && item.type && (
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    )}

                    {/* Badges */}
                    {item.badges && item.badges.length > 0 && (
                      <div className="flex gap-1">
                        {item.badges.slice(0, 3).map((badge, index) => (
                          <Badge
                            key={index}
                            variant={badge.variant || 'secondary'}
                            className="text-xs"
                          >
                            {badge.text}
                          </Badge>
                        ))}
                        {item.badges.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.badges.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Metadata */}
                    {showMetadata && item.metadata && (
                      <div className="flex items-center gap-3 text-muted-foreground">
                        {item.metadata.slice(0, 3).map((meta, index) => (
                          <div key={index} className="flex items-center gap-1">
                            {meta.icon && <span>{meta.icon}</span>}
                            <span>{meta.value} {meta.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Favorited Date */}
                    {showFavoritedDate && item.favoritedAt && (
                      <div className="text-muted-foreground">
                        Favorited {formatDate(item.favoritedAt)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {actions.length > 0 && (
                  <div className={cn(sFavoriteActionsVariants({ alignment: actionsAlignment }))}>
                    {actions.map((action, index) => (
                      <Button
                        key={index}
                        variant={action.variant || 'ghost'}
                        size={action.size || 'sm'}
                        disabled={action.disabled || action.loading}
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick?.(item.id);
                        }}
                        aria-label={action.label}
                      >
                        {action.loading && (
                          <div className="animate-spin rounded-full h-3 w-3 border border-current border-t-transparent mr-1" />
                        )}
                        {action.icon && !action.loading && (
                          <span className="text-sm">{action.icon}</span>
                        )}
                        {action.size !== 'icon' && action.size === 'lg' && action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {footer}
      </div>
    );
  }
);

SFavoritesList.displayName = 'SFavoritesList';

export { SFavoritesList, sFavoritesListVariants };
export type { FavoriteListItem, FavoriteListAction };