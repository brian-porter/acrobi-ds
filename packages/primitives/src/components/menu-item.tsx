import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Button } from './button';
import { Badge } from './badge';
import { Icon } from './icon';
import { Label } from './label';

/**
 * MenuItem variant styles using authentic Acrobi classes
 * This matches the devlink MenuItem component with Acrobi styling
 */
const menuItemVariants = cva(
  // Base authentic Acrobi menu item wrapper class
  'menu_item_wrap',
  {
    variants: {
      variant: {
        default: '',
        ghost: '',
        separated: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Menu link styling
const menuLinkVariants = cva('menu-link', {
  variants: {
    variant: {
      default: '',
      ghost: '',
      separated: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// Menu item lead section (left)
const menuLeadVariants = cva('mi-lead', {
  variants: {
    visible: {
      true: '',
      false: 'hidden',
    },
  },
  defaultVariants: {
    visible: true,
  },
});

// Menu item primary section (center)
const menuPrimaryVariants = cva('mi-primary', {
  variants: {
    variant: {
      default: '',
      ghost: '',
      separated: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// Menu item trail section (right)
const menuTrailVariants = cva('mi-trail', {
  variants: {
    variant: {
      default: '',
      ghost: '',
      separated: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface MenuItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof menuItemVariants> {
  // === Devlink-compatible API ===
  /**
   * Menu item visibility toggle
   */
  menuItm?: boolean;
  /**
   * Show leading icon
   */
  lIcn?: boolean;
  /**
   * Show subtitle text
   */
  pSubtext?: boolean;
  /**
   * Show trailing value
   */
  tValue?: boolean;
  /**
   * Show accordion arrow
   */
  tAcrdArrw?: boolean;
  /**
   * Selected state
   */
  tSelected?: boolean;
  /**
   * Leading icon source
   */
  lIcnSrc?: string;
  /**
   * Leading icon color
   */
  lIcnClr?:
    | 'fd500'
    | 'fw500'
    | 'f500'
    | 'p500'
    | 'n500'
    | 'n300'
    | 'n700'
    | 'n999'
    | 'inherit'
    | 'in';
  /**
   * Primary title text
   */
  pTitleSrc?: string;
  /**
   * Primary title size
   */
  pTitleSz?:
    | 'inherit'
    | 'r4'
    | 'r4b'
    | 'r3'
    | 'r3b'
    | 'r2'
    | 'r2b'
    | 'r1'
    | 'r1b'
    | 'h5'
    | 'h5b'
    | 'h4'
    | 'h4b'
    | 'h3'
    | 'h3b'
    | 'h2'
    | 'h2b'
    | 'h1'
    | 'h1b';
  /**
   * Subtitle text
   */
  pSubtxtSrc?: string;
  /**
   * Trailing value text
   */
  tValueSrc?: string;
  /**
   * Lead item divider
   */
  lItmDiv?: string;
  /**
   * Primary item divider
   */
  pItmDiv?: string;
  /**
   * Trail item divider
   */
  tItmDiv?: string;
  /**
   * Menu item link configuration
   */
  menuItmLink?: {
    href?: string;
    target?: string;
  };
  /**
   * Menu item click handler
   */
  menuItmClick?: React.HTMLAttributes<HTMLDivElement>;

  // === Legacy API (backward compatibility) ===
  /**
   * @deprecated Use pTitleSrc instead
   */
  label?: string;
  /**
   * @deprecated Use lIcnSrc instead
   */
  icon?: string;
  /**
   * @deprecated Use pSubtxtSrc instead
   */
  description?: string;
  /**
   * @deprecated Use tValueSrc instead
   */
  badge?: string | number;
  /**
   * @deprecated Badge is handled differently in devlink API
   */
  badgeVariant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'success'
    | 'warning';
  /**
   * @deprecated Use tValueSrc instead
   */
  shortcut?: string;
  /**
   * @deprecated Use tSelected instead
   */
  selected?: boolean;
  /**
   * @deprecated Loading state not supported in devlink API
   */
  loading?: boolean;
  /**
   * Custom content to render instead of default layout
   */
  children?: React.ReactNode;
  /**
   * @deprecated Use menuItmClick instead
   */
  onSelect?: () => void;
}

/**
 * MenuItem component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink MenuItem component.
 *
 * Key features:
 * - Uses .menu_item_wrap, .menu-link classes for authentic styling
 * - Uses .mi-lead, .mi-primary, .mi-trail for layout structure
 * - Integrates with Icon and Label components for consistency
 * - Supports accordion arrows and selection states
 * - Maintains backward compatibility with legacy API
 *
 * @example
 * ```tsx
 * <MenuItem
 *   menuItm={true}
 *   lIcn={true}
 *   lIcnSrc="user"
 *   lIcnClr="p500"
 *   pTitleSrc="User Profile"
 *   pTitleSz="r2"
 *   pSubtext={true}
 *   pSubtxtSrc="Manage your account"
 *   tSelected={true}
 * />
 * ```
 */
const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      className,
      variant = 'default',
      // Devlink API
      menuItm = true,
      lIcn = false,
      pSubtext = false,
      tValue = false,
      tAcrdArrw = false,
      tSelected = false,
      lIcnSrc = 'default',
      lIcnClr = 'in',
      pTitleSrc = 'Title',
      pTitleSz = 'r2',
      pSubtxtSrc = 'Subtitle copy here',
      tValueSrc = 'value',
      lItmDiv,
      pItmDiv = 'y',
      tItmDiv = 'y',
      menuItmLink = { href: '#' },
      menuItmClick = {},
      // Legacy API (backward compatibility)
      label,
      icon,
      description,
      badge,
      badgeVariant = 'n500',
      shortcut,
      selected = false,
      loading = false,
      children,
      onSelect,
      onClick,
      ...props
    },
    ref
  ) => {
    // Handle backward compatibility
    const finalPTitleSrc = pTitleSrc || label || 'Title';
    const finalLIcnSrc = lIcnSrc || icon || 'default';
    const finalPSubtxtSrc = pSubtxtSrc || description || 'Subtitle copy here';
    const finalTValueSrc =
      tValueSrc || shortcut || (badge ? String(badge) : 'value');
    const finalTSelected = tSelected || selected;
    const finalLIcn = lIcn || !!icon;
    const finalPSubtext = pSubtext || !!description;
    const finalTValue = tValue || !!shortcut || !!badge;

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        onSelect?.();
        onClick?.(e);
        menuItmClick?.onClick?.(e);
      },
      [onSelect, onClick, menuItmClick]
    );

    // Don't render if not visible
    if (!menuItm) return null;

    // Use custom children if provided
    if (children) {
      return (
        <div
          ref={ref}
          className={cn(menuItemVariants({ variant }), className)}
          onClick={handleClick}
          role='menuitem'
          {...menuItmClick}
          {...props}
        >
          {/* Hidden link for accessibility */}
          <a
            className={cn(menuLinkVariants({ variant }))}
            href={menuItmLink?.href || '#'}
            target={menuItmLink?.target}
            tabIndex={-1}
            aria-hidden='true'
          />
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(menuItemVariants({ variant }), className)}
        onClick={handleClick}
        role='menuitem'
        {...menuItmClick}
        {...props}
      >
        {/* Hidden link for accessibility */}
        <a
          className={cn(menuLinkVariants({ variant }))}
          href={menuItmLink?.href || '#'}
          target={menuItmLink?.target}
          tabIndex={-1}
          aria-hidden='true'
        />

        {/* Leading section */}
        <div
          className={cn(menuLeadVariants({ visible: finalLIcn }))}
          data-div={lItmDiv}
        >
          {finalLIcn && (
            <div className='mic-lead-icn'>
              <Icon
                icon={finalLIcnSrc}
                color={lIcnClr === 'in' ? 'inherit' : lIcnClr}
                visible={true}
              />
            </div>
          )}
        </div>

        {/* Primary section */}
        <div
          className={cn(menuPrimaryVariants({ variant }))}
          data-div={pItmDiv}
        >
          <Label
            text={finalPTitleSrc}
            size={pTitleSz}
            iconLocation='l'
            icon='default'
            showIcon={false}
            visible={true}
          />
          {finalPSubtext && (
            <Label
              text={finalPSubtxtSrc}
              visible={true}
              showIcon={false}
              icon='default'
              size='r3'
              color='n700'
            />
          )}
        </div>

        {/* Trailing section */}
        <div className={cn(menuTrailVariants({ variant }))} data-div={tItmDiv}>
          {tAcrdArrw && (
            <div className='mic-trail-acc'>
              <div className='acc_arrow' data-clr='n700'>
                nav_down
              </div>
            </div>
          )}
          {finalTSelected && (
            <div className='mic-trail-select'>
              <Icon icon='Checkfat' color='p500' visible={true} />
            </div>
          )}
          {finalTValue && (
            <div className='mic-trail-value'>
              <Label
                text={finalTValueSrc}
                showIcon={false}
                iconLocation='t'
                icon='default'
                size='r3'
                visible={true}
                color='n700'
              />
            </div>
          )}

          {/* Legacy badge support */}
          {badge && !finalTValue && (
            <Badge
              color={badgeVariant}
              text={String(badge)}
              size='s'
              visible={true}
            />
          )}
        </div>
      </div>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export {
  MenuItem,
  menuItemVariants,
  menuLinkVariants,
  menuLeadVariants,
  menuPrimaryVariants,
  menuTrailVariants,
};
