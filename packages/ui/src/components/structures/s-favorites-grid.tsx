import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';
import { Badge } from '../primitives/badge';
import { Icon } from '../primitives/icon';
import { Avatar } from '../primitives/avatar';

/**
 * S-FavoritesGrid variant styles using Acrobi Design System classes
 * Grid layout for displaying favorited items in a card-based grid
 */
const sFavoritesGridVariants = cva(
  'favorites-grid',
  {
    variants: {
      variant: {
        default: 'grid gap-4',
        compact: 'grid gap-3',
        spacious: 'grid gap-6',
        masonry: 'columns-1 space-y-4',
      },
      columns: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
        6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6',
      },
      size: {
        sm: '',
        default: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      columns: 3,
      size: 'default',
    },
  }
);

const sFavoriteCardVariants = cva(
  'favorite-card bg-card border border-border rounded-lg p-4 transition-all hover:shadow-md hover:border-border/80',
  {
    variants: {
      variant: {
        default: '',
        elevated: 'shadow-sm',
        flat: 'border-0 bg-muted/30',
        outlined: 'border-2',
      },
      size: {
        sm: 'p-3',
        default: 'p-4',
        lg: 'p-6',
      },
      interactive: {
        true: 'cursor-pointer hover:bg-accent/50',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      interactive: true,
    },
  }
);

const sFavoriteHeaderVariants = cva(
  'favorite-header flex items-start justify-between mb-3',
  {
    variants: {
      spacing: {
        tight: 'mb-2',
        default: 'mb-3',
        loose: 'mb-4',
      },
    },
    defaultVariants: {
      spacing: 'default',
    },
  }
);

const sFavoriteContentVariants = cva(
  'favorite-content space-y-2',
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

const sFavoriteFooterVariants = cva(
  'favorite-footer flex items-center justify-between mt-3 pt-3 border-t border-border/50',
  {
    variants: {
      spacing: {
        tight: 'mt-2 pt-2',
        default: 'mt-3 pt-3',
        loose: 'mt-4 pt-4',
      },
    },
    defaultVariants: {
      spacing: 'default',
    },
  }
);

export interface FavoriteAction {
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

export interface FavoriteItem {
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Item title
   */
  title: string;
  /**
   * Item description
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
   * Item badges
   */
  badges?: Array<{
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }>;
  /**
   * Item metadata (date, stats, etc.)
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
   * Custom click handler
   */
  onClick?: (item: FavoriteItem) => void;
}

export interface SFavoritesGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sFavoritesGridVariants> {
  /**
   * List of favorite items
   */
  items: FavoriteItem[];
  /**
   * Card variant
   */
  cardVariant?: 'default' | 'elevated' | 'flat' | 'outlined';
  /**
   * Card size
   */
  cardSize?: 'sm' | 'default' | 'lg';
  /**
   * Whether cards are interactive
   */
  cardInteractive?: boolean;
  /**
   * Global actions for all items
   */
  actions?: FavoriteAction[];
  /**
   * Whether to show item type badges
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
   * Whether grid is in loading state
   */
  loading?: boolean;
  /**
   * Number of loading placeholder cards
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
  onItemClick?: (item: FavoriteItem) => void;
  /**
   * Content alignment
   */
  contentAlignment?: 'left' | 'center' | 'right';
}

/**
 * S-FavoritesGrid - Grid layout for favorites page
 *
 * This structure provides a responsive grid layout for displaying favorited
 * items such as snippets, profiles, projects, or any other content type.
 * It supports various card layouts, selection modes, and interactive features.
 *
 * Key features:
 * - Responsive grid with configurable columns
 * - Multiple card variants and sizes
 * - Support for images, avatars, icons, and badges
 * - Item metadata display (date, stats, etc.)
 * - Selection modes (single/multiple)
 * - Interactive cards with hover effects
 * - Loading and empty states
 * - Masonry layout option for variable content heights
 * - Accessible keyboard navigation
 *
 * @example
 * ```tsx
 * <SFavoritesGrid
 *   items={[
 *     {
 *       id: "1",
 *       title: "React Hooks Cheatsheet",
 *       description: "Common React hooks with examples",
 *       type: "snippet",
 *       imageUrl: "/thumbnail.jpg",
 *       badges: [
 *         { text: "React", variant: "secondary" },
 *         { text: "JavaScript", variant: "outline" }
 *       ],
 *       metadata: [
 *         { label: "Views", value: "1.2K", icon: "👁️" },
 *         { label: "Stars", value: "89", icon: "⭐" }
 *       ],
 *       favoritedAt: new Date()
 *     }
 *   ]}
 *   columns={3}
 *   cardVariant="elevated"
 *   showType
 *   showMetadata
 *   actions={[
 *     { label: "Remove", icon: "❌", variant: "ghost" }
 *   ]}
 * />
 * ```
 */
const SFavoritesGrid = React.forwardRef<HTMLDivElement, SFavoritesGridProps>(
  (
    {
      className,
      items,
      cardVariant = 'default',
      cardSize = 'default',
      cardInteractive = true,
      actions = [],
      showType = true,
      showFavoritedDate = false,
      showMetadata = true,
      loading = false,
      loadingCount = 6,
      showEmpty = true,
      emptyMessage = 'No favorites yet',
      emptyDescription = 'Items you favorite will appear here',
      emptyAction,
      selectionMode = 'none',
      selectedIds = [],
      onSelectionChange,
      onItemClick,
      contentAlignment = 'left',
      variant,
      columns,
      size,
      ...props
    },
    ref
  ) => {
    const isSelectable = selectionMode !== 'none';
    const hasItems = items.length > 0;

    const handleItemClick = (item: FavoriteItem, e: React.MouseEvent) => {
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
        <div
          key={i}
          className={cn(sFavoriteCardVariants({ variant: cardVariant, size: cardSize, interactive: false }))}
        >
          <div className="animate-pulse">
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 bg-muted rounded"></div>
              <div className="w-4 h-4 bg-muted rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
              <div className="h-3 bg-muted rounded w-16"></div>
              <div className="h-6 bg-muted rounded w-12"></div>
            </div>
          </div>
        </div>
      ));

      return (
        <div
          ref={ref}
          className={cn(sFavoritesGridVariants({ variant, columns, size }), className)}
          {...props}
        >
          {loadingItems}
        </div>
      );
    }

    // Empty state
    if (!hasItems && showEmpty) {
      return (
        <div
          ref={ref}
          className={cn('flex flex-col items-center justify-center py-12 text-center', className)}
          {...props}
        >
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
      );
    }

    return (
      <div
        ref={ref}
        className={cn(sFavoritesGridVariants({ variant, columns, size }), className)}
        {...props}
      >
        {items.map((item) => {
          const isSelected = selectedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={cn(
                sFavoriteCardVariants({
                  variant: cardVariant,
                  size: cardSize,
                  interactive: cardInteractive,
                }),
                isSelected && isSelectable && 'ring-2 ring-primary bg-primary/5',
                variant === 'masonry' && 'break-inside-avoid'
              )}
              onClick={(e) => handleItemClick(item, e)}
              role={cardInteractive ? 'button' : undefined}
              tabIndex={cardInteractive ? 0 : undefined}
              onKeyDown={
                cardInteractive
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleItemClick(item, e as any);
                      }
                    }
                  : undefined
              }
            >
              {/* Header */}
              <div className={cn(sFavoriteHeaderVariants())}>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {/* Selection checkbox */}
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
                  {item.avatarUrl || item.avatarFallback ? (
                    <Avatar
                      src={item.avatarUrl}
                      fallback={item.avatarFallback || item.title.charAt(0)}
                      className="w-8 h-8 flex-shrink-0"
                    />
                  ) : item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-8 h-8 rounded object-cover flex-shrink-0"
                    />
                  ) : item.icon ? (
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <Icon
                        name={item.icon}
                        color={item.iconColor || 'p500'}
                        size="m"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center flex-shrink-0">
                      <Icon name="heart" size="s" color="n300" />
                    </div>
                  )}

                  {/* Type Badge */}
                  {showType && item.type && (
                    <Badge variant="outline" className="text-xs flex-shrink-0">
                      {item.type}
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                {actions.length > 0 && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {actions.map((action, index) => (
                      <Button
                        key={index}
                        variant={action.variant || 'ghost'}
                        size="sm"
                        disabled={action.disabled || action.loading}
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick?.(item.id);
                        }}
                      >
                        {action.loading && (
                          <div className="animate-spin rounded-full h-3 w-3 border border-current border-t-transparent" />
                        )}
                        {action.icon && !action.loading && (
                          <span className="text-sm">{action.icon}</span>
                        )}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={cn(sFavoriteContentVariants({ alignment: contentAlignment }))}>
                <h4 className="font-semibold text-sm leading-tight line-clamp-2">
                  {item.title}
                </h4>
                
                {item.description && (
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                )}

                {/* Badges */}
                {item.badges && item.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.badges.map((badge, index) => (
                      <Badge
                        key={index}
                        variant={badge.variant || 'secondary'}
                        className="text-xs"
                      >
                        {badge.text}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {(showMetadata && item.metadata) || showFavoritedDate ? (
                <div className={cn(sFavoriteFooterVariants())}>
                  {/* Metadata */}
                  {showMetadata && item.metadata && (
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {item.metadata.slice(0, 2).map((meta, index) => (
                        <div key={index} className="flex items-center gap-1">
                          {meta.icon && <span>{meta.icon}</span>}
                          <span>{meta.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Favorited Date */}
                  {showFavoritedDate && item.favoritedAt && (
                    <div className="text-xs text-muted-foreground">
                      {formatDate(item.favoritedAt)}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
);

SFavoritesGrid.displayName = 'SFavoritesGrid';

export { SFavoritesGrid, sFavoritesGridVariants };
export type { FavoriteItem, FavoriteAction };