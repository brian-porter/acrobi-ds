import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import {
  SecHead,
  type SecHeadProps,
  type SecHeadAction,
} from '../structures/sec-head';
import { ListGrid, type ListGridProps } from '../structures/list-grid';
import { Card } from '../primitives/card';
import { Badge } from '../primitives/badge';
import { Button, type ButtonProps } from '../primitives/button';
import { EmptyState } from '../structures/empty-state';

const productGridVariants = cva('w-full space-y-6', {
  variants: {
    variant: {
      default: '',
      card: 'p-6 bg-card border border-border rounded-lg',
      section: 'py-8',
      contained: 'p-4 bg-muted/50 rounded-lg',
    },
    spacing: {
      none: 'space-y-0',
      sm: 'space-y-3',
      md: 'space-y-6',
      lg: 'space-y-8',
      xl: 'space-y-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    spacing: 'md',
  },
});

export interface ProductGridProduct {
  /**
   * Product ID
   */
  id: string;
  /**
   * Product name
   */
  name: string;
  /**
   * Product description
   */
  description?: string;
  /**
   * Product image URL
   */
  image?: string;
  /**
   * Product image alt text
   */
  imageAlt?: string;
  /**
   * Product price
   */
  price?: string;
  /**
   * Original price (for sales)
   */
  originalPrice?: string;
  /**
   * Product badge (sale, new, etc.)
   */
  badge?: string;
  /**
   * Badge variant
   */
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  /**
   * Product rating (0-5)
   */
  rating?: number;
  /**
   * Number of reviews
   */
  reviewCount?: number;
  /**
   * Whether the product is in stock
   */
  inStock?: boolean;
  /**
   * Product category
   */
  category?: string;
  /**
   * Custom product actions
   */
  actions?: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: ButtonProps['variant'];
    disabled?: boolean;
  }[];
  /**
   * Click handler for the product card
   */
  onClick?: () => void;
  /**
   * Whether the product is selected
   */
  selected?: boolean;
  /**
   * Custom content for the product card
   */
  customContent?: React.ReactNode;
}

export interface ProductGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof productGridVariants> {
  /**
   * Section title
   */
  title: string;
  /**
   * Section subtitle
   */
  subtitle?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Header actions
   */
  actions?: SecHeadAction[];
  /**
   * Products to display
   */
  products: ProductGridProduct[];
  /**
   * Grid configuration
   */
  gridProps?: Omit<ListGridProps, 'children'>;
  /**
   * Section variant style
   * @default "default"
   */
  variant?: 'default' | 'card' | 'section' | 'contained';
  /**
   * Spacing between header and content
   * @default "md"
   */
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Empty state configuration
   */
  emptyState?: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  /**
   * Whether to show the section header
   * @default true
   */
  showHeader?: boolean;
  /**
   * Header variant
   */
  headerVariant?: SecHeadProps['variant'];
  /**
   * Header size
   */
  headerSize?: SecHeadProps['size'];
  /**
   * Whether to show product ratings
   * @default true
   */
  showRatings?: boolean;
  /**
   * Whether to show product prices
   * @default true
   */
  showPrices?: boolean;
  /**
   * Whether to show product badges
   * @default true
   */
  showBadges?: boolean;
  /**
   * Whether to show product actions
   * @default true
   */
  showActions?: boolean;
  /**
   * Default action for products without custom actions
   */
  defaultAction?: {
    label: string;
    onClick: (product: ProductGridProduct) => void;
    variant?: ButtonProps['variant'];
  };
  /**
   * Whether to show loading state
   */
  loading?: boolean;
  /**
   * Loading placeholder count
   */
  loadingCount?: number;
  /**
   * Product card aspect ratio
   */
  aspectRatio?: '1:1' | '16:9' | '4:3' | '3:2';
}

const ProductGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  (
    {
      className,
      title,
      subtitle,
      description,
      actions = [],
      products = [],
      gridProps = {},
      variant,
      spacing,
      emptyState,
      showHeader = true,
      headerVariant = 'default',
      headerSize = 'md',
      showRatings = true,
      showPrices = true,
      showBadges = true,
      showActions = true,
      defaultAction,
      loading = false,
      loadingCount = 6,
      aspectRatio = '4:3',
      ...props
    },
    ref
  ) => {
    const hasProducts = products.length > 0;

    const renderStars = (rating: number) => {
      return (
        <div className='flex items-center space-x-1'>
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={cn(
                'w-4 h-4',
                i < Math.floor(rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              )}
              viewBox='0 0 20 20'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
          ))}
        </div>
      );
    };

    const renderProductCard = (product: ProductGridProduct, index: number) => {
      const hasCustomActions = product.actions && product.actions.length > 0;
      const shouldShowActions =
        showActions && (hasCustomActions || defaultAction);

      return (
        <Card
          key={product.id || index}
          className={cn(
            'group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]',
            product.selected && 'ring-2 ring-ring ring-offset-2',
            !product.inStock && 'opacity-60'
          )}
          onClick={product.onClick}
        >
          <div className='relative overflow-hidden rounded-t-lg'>
            {product.image && (
              <img
                src={product.image}
                alt={product.imageAlt || product.name}
                className={cn(
                  'w-full object-cover transition-transform duration-200 group-hover:scale-105',
                  aspectRatio === '1:1' && 'aspect-square',
                  aspectRatio === '16:9' && 'aspect-video',
                  aspectRatio === '4:3' && 'aspect-[4/3]',
                  aspectRatio === '3:2' && 'aspect-[3/2]'
                )}
              />
            )}

            {showBadges && product.badge && (
              <div className='absolute top-2 left-2'>
                <Badge variant={product.badgeVariant || 'default'}>
                  {product.badge}
                </Badge>
              </div>
            )}

            {!product.inStock && (
              <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
                <Badge color='fd500' text='Out of Stock' />
              </div>
            )}
          </div>

          <div className='p-4 space-y-3'>
            <div className='space-y-1'>
              <h3 className='font-semibold text-foreground line-clamp-2'>
                {product.name}
              </h3>
              {product.description && (
                <p className='text-sm text-muted-foreground line-clamp-2'>
                  {product.description}
                </p>
              )}
              {product.category && (
                <p className='text-xs text-muted-foreground uppercase tracking-wide'>
                  {product.category}
                </p>
              )}
            </div>

            {showRatings && product.rating !== undefined && (
              <div className='flex items-center justify-between'>
                {renderStars(product.rating)}
                {product.reviewCount && (
                  <span className='text-xs text-muted-foreground'>
                    ({product.reviewCount})
                  </span>
                )}
              </div>
            )}

            {showPrices && product.price && (
              <div className='flex items-center space-x-2'>
                <span className='font-semibold text-lg text-foreground'>
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className='text-sm text-muted-foreground line-through'>
                    {product.originalPrice}
                  </span>
                )}
              </div>
            )}

            {product.customContent}

            {shouldShowActions && (
              <div className='flex gap-2 pt-2'>
                {hasCustomActions ? (
                  product.actions?.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      variant={action.variant || 'outline'}
                      size='sm'
                      disabled={action.disabled || !product.inStock}
                      onClick={e => {
                        e.stopPropagation();
                        action.onClick?.();
                      }}
                      className='flex-1'
                    >
                      {action.children}
                    </Button>
                  ))
                ) : defaultAction ? (
                  <Button
                    variant={defaultAction.variant || 'outline'}
                    size='sm'
                    disabled={!product.inStock}
                    onClick={e => {
                      e.stopPropagation();
                      defaultAction.onClick(product);
                    }}
                    className='flex-1'
                  >
                    {defaultAction.label}
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        </Card>
      );
    };

    const loadingCards = Array.from({ length: loadingCount }, (_, index) => (
      <Card key={`loading-${index}`} className='animate-pulse'>
        <div
          className={cn(
            'bg-muted rounded-t-lg',
            aspectRatio === '1:1' && 'aspect-square',
            aspectRatio === '16:9' && 'aspect-video',
            aspectRatio === '4:3' && 'aspect-[4/3]',
            aspectRatio === '3:2' && 'aspect-[3/2]'
          )}
        />
        <div className='p-4 space-y-3'>
          <div className='h-4 bg-muted rounded w-3/4' />
          <div className='h-3 bg-muted rounded w-1/2' />
          <div className='h-6 bg-muted rounded w-1/3' />
        </div>
      </Card>
    ));

    // Show empty state if no products and not loading
    if (!loading && !hasProducts && emptyState) {
      return (
        <div
          ref={ref}
          className={cn(productGridVariants({ variant, spacing }), className)}
          {...props}
        >
          {showHeader && (
            <SecHead
              title={title}
              subtitle={subtitle}
              description={description}
              actions={actions}
              variant={headerVariant}
              size={headerSize}
            />
          )}

          <EmptyState
            title={emptyState.title}
            description={emptyState.description}
            icon={emptyState.icon}
            actions={emptyState.action ? [emptyState.action] : undefined}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(productGridVariants({ variant, spacing }), className)}
        {...props}
      >
        {showHeader && (
          <SecHead
            title={title}
            subtitle={subtitle}
            description={description}
            actions={actions}
            variant={headerVariant}
            size={headerSize}
          />
        )}

        <ListGrid
          columns='auto'
          minWidth={280}
          aspectRatio={aspectRatio}
          {...gridProps}
        >
          {loading ? loadingCards : products.map(renderProductCard)}
        </ListGrid>
      </div>
    );
  }
);
ProductGrid.displayName = 'ProductGrid';

export { ProductGrid, productGridVariants };
