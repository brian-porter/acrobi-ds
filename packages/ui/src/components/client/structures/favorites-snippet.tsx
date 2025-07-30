import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { SecHead, type SecHeadAction } from '../../structures/sec-head';

const favoritesSnippetVariants = cva('w-full space-y-4', {
  variants: {
    variant: {
      default: '',
      card: 'bg-card border border-border rounded-lg p-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface FavoriteCategory {
  type: 'prod' | 'place' | 'creator' | 'store' | 'brand';
  label: string;
  quantity: number;
  visible: boolean;
  onClick?: () => void;
  icon?: string;
}

export interface FavoritesSnippetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof favoritesSnippetVariants> {
  /**
   * Section visibility control
   * @default true
   */
  sec?: boolean;
  /**
   * Section header visibility
   * @default true
   */
  secHead?: boolean;
  /**
   * Stats visibility at bottom
   * @default true
   */
  stats?: boolean;
  /**
   * Header title icon visibility
   * @default true
   */
  headTitleIcn?: boolean;
  /**
   * Header action 1 visibility
   * @default true
   */
  headAct1?: boolean;
  /**
   * Header title icon source
   */
  headTitleIcnSrc?: string;
  /**
   * Header title text
   */
  headTitleSrc?: string;
  /**
   * Header action 1 text
   */
  headAct1TxtSrc?: string;
  /**
   * Header action 1 click handler
   */
  headAct1Click?: () => void;
  /**
   * Side fade visibility
   * @default true
   */
  sideFade?: boolean;
  /**
   * Main favorites section visibility
   * @default true
   */
  fav?: boolean;
  /**
   * "All Favs" action in header visibility
   * @default true
   */
  favAll?: boolean;
  /**
   * Products favorites visibility
   * @default true
   */
  favProd?: boolean;
  /**
   * Places favorites visibility
   * @default true
   */
  favPlace?: boolean;
  /**
   * Creators favorites visibility
   * @default true
   */
  favCreator?: boolean;
  /**
   * Stores favorites visibility
   * @default true
   */
  favStore?: boolean;
  /**
   * Brands favorites visibility
   * @default true
   */
  favBrand?: boolean;
  /**
   * Products quantity
   */
  favProdQty?: number;
  /**
   * Places quantity
   */
  favPlaceQty?: number;
  /**
   * Creators quantity
   */
  favCreatorQty?: number;
  /**
   * Stores quantity
   */
  favStoreQty?: number;
  /**
   * Brands quantity
   */
  favBrandQty?: number;
  /**
   * Products click handler
   */
  favProdClick?: () => void;
  /**
   * Places click handler
   */
  favPlaceClick?: () => void;
  /**
   * Creators click handler
   */
  favCreatorClick?: () => void;
  /**
   * Stores click handler
   */
  favStoreClick?: () => void;
  /**
   * Brands click handler
   */
  favBrandClick?: () => void;
  /**
   * Stats data
   */
  statsData?: Array<{
    label: string;
    value: string | number;
    visible?: boolean;
  }>;
  /**
   * Component variant
   */
  variant?: 'default' | 'card';
}

const FavoritesSnippet = React.forwardRef<
  HTMLDivElement,
  FavoritesSnippetProps
>(
  (
    {
      className,
      sec = true,
      secHead = true,
      stats = true,
      headTitleIcn = true,
      headAct1 = true,
      headTitleIcnSrc = '❤️',
      headTitleSrc = 'Favorites',
      headAct1TxtSrc = 'View All',
      headAct1Click,
      sideFade = true,
      fav = true,
      favAll = true,
      favProd = true,
      favPlace = true,
      favCreator = true,
      favStore = true,
      favBrand = true,
      favProdQty = 0,
      favPlaceQty = 0,
      favCreatorQty = 0,
      favStoreQty = 0,
      favBrandQty = 0,
      favProdClick,
      favPlaceClick,
      favCreatorClick,
      favStoreClick,
      favBrandClick,
      statsData = [],
      variant,
      ...props
    },
    ref
  ) => {
    if (!sec) return null;

    const favoriteCategories: FavoriteCategory[] = [
      {
        type: 'prod',
        label: 'Products',
        quantity: favProdQty,
        visible: favProd,
        onClick: favProdClick,
        icon: '🛍️',
      },
      {
        type: 'place',
        label: 'Places',
        quantity: favPlaceQty,
        visible: favPlace,
        onClick: favPlaceClick,
        icon: '📍',
      },
      {
        type: 'creator',
        label: 'Creators',
        quantity: favCreatorQty,
        visible: favCreator,
        onClick: favCreatorClick,
        icon: '👤',
      },
      {
        type: 'store',
        label: 'Stores',
        quantity: favStoreQty,
        visible: favStore,
        onClick: favStoreClick,
        icon: '🏪',
      },
      {
        type: 'brand',
        label: 'Brands',
        quantity: favBrandQty,
        visible: favBrand,
        onClick: favBrandClick,
        icon: '🏷️',
      },
    ];

    const visibleCategories = favoriteCategories.filter(cat => cat.visible);

    const headerActions: SecHeadAction[] = [];
    if (headAct1 && headAct1TxtSrc && favAll) {
      headerActions.push({
        children: headAct1TxtSrc,
        onClick: headAct1Click || (() => {}),
        variant: 'ghost',
      });
    }

    const renderFavoriteCategory = (category: FavoriteCategory) => {
      const isClickable = Boolean(category.onClick);
      const Component = isClickable ? 'button' : 'div';

      return (
        <Component
          key={category.type}
          className={cn(
            'flex flex-col items-center gap-2 p-3 rounded-lg border border-border transition-all duration-200',
            isClickable &&
              'hover:bg-accent/50 hover:shadow-sm cursor-pointer active:scale-95'
          )}
          onClick={isClickable ? category.onClick : undefined}
        >
          <div className='text-2xl' aria-hidden='true'>
            {category.icon}
          </div>

          <div className='text-center'>
            <div className='text-lg font-semibold text-foreground'>
              {category.quantity}
            </div>
            <div className='text-xs text-muted-foreground'>
              {category.label}
            </div>
          </div>
        </Component>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(favoritesSnippetVariants({ variant }), className)}
        {...props}
      >
        {secHead && (
          <SecHead
            title={headTitleSrc || ''}
            titleIcon={headTitleIcn ? headTitleIcnSrc : undefined}
            actions={headerActions}
            size='sm'
          />
        )}

        {fav && (
          <div className='space-y-4'>
            {/* Side-scroll container with fade */}
            <div className={cn('relative', sideFade && 'overflow-hidden')}>
              {/* Fade gradients */}
              {sideFade && (
                <>
                  <div className='absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none' />
                  <div className='absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none' />
                </>
              )}

              {/* Scrollable content */}
              <div className='flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-1'>
                {visibleCategories.map(renderFavoriteCategory)}
              </div>
            </div>

            {/* Empty state */}
            {visibleCategories.length === 0 && (
              <div className='text-center py-6'>
                <div className='text-4xl mb-2' aria-hidden='true'>
                  💔
                </div>
                <div className='text-sm text-muted-foreground'>
                  No favorites yet
                </div>
              </div>
            )}

            {/* No favorites message when all quantities are 0 */}
            {visibleCategories.length > 0 &&
              visibleCategories.every(cat => cat.quantity === 0) && (
                <div className='text-center py-4'>
                  <div className='text-sm text-muted-foreground'>
                    Start adding favorites to see them here
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Stats */}
        {stats && statsData.length > 0 && (
          <div className='flex justify-between pt-4 border-t border-border'>
            {statsData.map(
              (stat, index) =>
                stat.visible !== false && (
                  <div key={index} className='text-center'>
                    <div className='text-lg font-semibold text-foreground'>
                      {stat.value}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      {stat.label}
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    );
  }
);

FavoritesSnippet.displayName = 'FavoritesSnippet';

export { FavoritesSnippet, favoritesSnippetVariants, type FavoriteCategory };
