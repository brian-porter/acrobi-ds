import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Label } from './label';

/**
 * Breadcrumb variant styles using Acrobi Design System classes
 * This matches the devlink Breadcrumb component pattern using authentic
 * Acrobi styling with specific CSS classes and data attributes
 */
const breadcrumbVariants = cva(
  // Base styles - using authentic Acrobi breadcrumb wrapper class
  'brdcrm_wrap w-full',
  {
    variants: {
      variant: {
        default: '',
        compact: '',
        large: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Breadcrumb list styling using authentic Acrobi patterns
const breadcrumbListVariants = cva('brdcrm_list flex items-center', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    color: {
      n700: '',
      n500: '',
      n300: '',
      inherit: '',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'n700',
  },
});

// Breadcrumb item styling
const breadcrumbItemVariants = cva(
  'brdcrm_itm flex items-center cursor-pointer',
  {
    variants: {
      type: {
        home: 'brdcrm_itm1',
        regular: 'brdcrm_itm',
      },
      active: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      type: 'regular',
      active: false,
    },
  }
);

// Breadcrumb separator line styling
const breadcrumbSeparatorVariants = cva('brdcrm_line mx-2', {
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

export interface BreadcrumbItem {
  id: string;
  text: string;
  href?: string;
  icon?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  /**
   * Breadcrumb component visibility toggle (breadcrumb in Webflow)
   */
  visible?: boolean;
  /**
   * Breadcrumb items array
   */
  items: BreadcrumbItem[];
  /**
   * Home button click handler (homeClick in Webflow)
   */
  onHomeClick?: () => void;
  /**
   * Item color (itmClr in Webflow)
   */
  itemColor?: 'n700' | 'n500' | 'n300' | 'inherit';
  /**
   * Item font size (itmSz in Webflow)
   */
  itemSize?:
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
   * Show home icon
   */
  showHomeIcon?: boolean;
  /**
   * Home icon name
   */
  homeIcon?: string;
  /**
   * Home text
   */
  homeText?: string;
  /**
   * @deprecated Use items prop instead
   */
  children?: React.ReactNode;
  /**
   * @deprecated Use itemSize prop instead
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * @deprecated Use built-in separator instead
   */
  separator?: React.ReactNode;
}

export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof breadcrumbItemVariants> {
  /**
   * Item text source (itmTxtSrc in Webflow)
   */
  itemText?: string;
  /**
   * Item click handler (itmClick in Webflow)
   */
  onItemClick?: () => void;
  /**
   * Item href for navigation
   */
  href?: string;
  /**
   * Show icon
   */
  showIcon?: boolean;
  /**
   * Icon name
   */
  icon?: string;
  /**
   * Whether this is the home item
   */
  isHome?: boolean;
  /**
   * Whether this is the current/active item
   */
  active?: boolean;
  /**
   * @deprecated Use itemText prop instead
   */
  children?: React.ReactNode;
}

// Map color names to Acrobi data attributes
const getBreadcrumbColor = (color: string | null | undefined): string => {
  const colorMap: Record<string, string> = {
    n700: 'n700',
    n500: 'n500',
    n300: 'n300',
    inherit: 'inherit',
  };
  return colorMap[color || 'n700'] || 'n700';
};

// Map size names to Acrobi font size values for backward compatibility
const getFontSizeFromSize = (
  size: string | null | undefined
):
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
  | 'h1b' => {
  const sizeMap: Record<
    string,
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
    | 'h1b'
  > = {
    sm: 'r4',
    md: 'r3',
    lg: 'r2',
  };
  return sizeMap[size || 'md'] || 'r3';
};

/**
 * Breadcrumb component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink Breadcrumb component.
 *
 * Key features:
 * - Uses .brdcrm_wrap and .brdcrm_list classes for authentic styling
 * - Uses .brdcrm_itm and .brdcrm_line for item and separator styling
 * - Uses data attributes for styling (data-clr, data-fs)
 * - Integrates with Label component for text and icon rendering
 * - Supports home icon and navigation functionality
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { id: 'home', text: 'Home', icon: 'home'},
 *     { id: 'category', text: 'Category', href: '/category' },
 *     { id: 'current', text: 'Current Page' }
 *   ]}
 *   itemColor="n700"
 *   itemSize="r3"
 *   showHomeIcon={true}
 * />
 * ```
 */
const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      className,
      visible = true,
      items,
      onHomeClick,
      itemColor = 'n700',
      itemSize = 'r3',
      showHomeIcon = true,
      homeIcon = 'home2',
      homeText = 'Home',
      // Deprecated props for backward compatibility
      children,
      size,
      separator,
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!visible) return null;

    // Handle backward compatibility
    const actualItemSize = size ? getFontSizeFromSize(size) : itemSize;
    const breadcrumbColor = getBreadcrumbColor(itemColor);

    return (
      <nav
        className={cn(breadcrumbVariants(), className)}
        aria-label='breadcrumb'
        ref={ref}
        {...props}
      >
        <ul
          className={cn(breadcrumbListVariants({ color: itemColor }))}
          data-clr={breadcrumbColor}
          data-fs={actualItemSize}
        >
          {items.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;

            return (
              <React.Fragment key={item.id}>
                <BreadcrumbItem
                  itemText={item.text}
                  href={item.href}
                  onItemClick={
                    item.onClick || (isFirst ? onHomeClick : undefined)
                  }
                  showIcon={isFirst && showHomeIcon}
                  icon={isFirst ? homeIcon : item.icon}
                  isHome={isFirst}
                  active={isLast}
                />

                {/* Separator line - shown between items but not after the last */}
                {!isLast && (
                  <li>
                    <div className={cn(breadcrumbSeparatorVariants())} />
                  </li>
                )}
              </React.Fragment>
            );
          })}

          {/* Backward compatibility - render children if items not provided */}
          {!items &&
            children &&
            React.Children.map(children, (child, index) => (
              <React.Fragment key={index}>
                <li>{child}</li>
                {index < React.Children.count(children) - 1 && (
                  <li>
                    <div className={cn(breadcrumbSeparatorVariants())} />
                  </li>
                )}
              </React.Fragment>
            ))}
        </ul>
      </nav>
    );
  }
);

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  (
    {
      className,
      itemText = 'NodeName',
      onItemClick,
      href,
      showIcon = false,
      icon = 'default',
      isHome = false,
      active = false,
      // Deprecated props for backward compatibility
      children,
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      onItemClick?.();
    };

    const content = (
      <Label
        text={children ? children.toString() : itemText}
        showIcon={showIcon}
        icon={icon}
        size='inherit'
        color='inherit'
        iconLocation='l'
      />
    );

    if (href) {
      return (
        <li
          className={cn(
            breadcrumbItemVariants({
              type: isHome ? 'home' : 'regular',
              active,
            }),
            className
          )}
          ref={ref}
          {...props}
        >
          <a href={href} onClick={handleClick}>
            {content}
          </a>
        </li>
      );
    }

    return (
      <li
        className={cn(
          breadcrumbItemVariants({
            type: isHome ? 'home' : 'regular',
            active,
          }),
          className
        )}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {content}
      </li>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';
BreadcrumbItem.displayName = 'BreadcrumbItem';

// Legacy separator component for backward compatibility
const BreadcrumbSeparator = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children = '/', ...props }, ref) => (
  <span ref={ref} className={cn('breadcrumb-separator', className)} {...props}>
    {children}
  </span>
));

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator, breadcrumbVariants };
export type BreadcrumbSeparatorProps = React.HTMLAttributes<HTMLSpanElement>;
