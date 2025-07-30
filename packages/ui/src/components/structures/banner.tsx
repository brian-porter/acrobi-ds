import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Label } from '../primitives/label';

/**
 * Banner structure variant styles using Acrobi Design System classes
 * This matches the devlink OlBanner component pattern using authentic
 * Acrobi styling with specific CSS classes and data attributes
 */
const bannerStructureVariants = cva(
  // Base styles - using authentic Acrobi overlay banner wrapper class
  'ol_bnr_wrap',
  {
    variants: {
      visible: {
        true: '',
        false: 'hidden',
      },
      position: {
        inline: '',
        sticky: 'sticky top-0 z-50',
        fixed: 'fixed top-0 left-0 right-0 z-50',
      },
    },
    defaultVariants: {
      visible: true,
      position: 'inline',
    },
  }
);

export interface BannerStructureProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof bannerStructureVariants> {
  /**
   * Show banner (bnr in Webflow)
   */
  visible?: boolean;
  /**
   * Banner icon name (bnrIcnSrc in Webflow)
   */
  iconName?: string;
  /**
   * Banner text content (bnrTxtSrc in Webflow)
   */
  text?: string;
  /**
   * Banner size (bnrSz in Webflow)
   */
  size?: 's' | 'm' | 'l';
  /**
   * Banner location (bnrLoc in Webflow)
   */
  location?: 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br';
  /**
   * Banner color (bnrClr in Webflow)
   */
  color?: 'n' | 'p' | 'success' | 'warning' | 'error';
  /**
   * Enable dismissible functionality with close button
   */
  dismissible?: boolean;
  /**
   * Callback when banner is dismissed
   */
  onDismiss?: () => void;
  /**
   * Close button icon (defaults to "close")
   */
  closeIcon?: string;
  /**
   * @deprecated Use visible prop instead
   */
  bnr?: boolean;
  /**
   * @deprecated Use iconName prop instead
   */
  bnrIcnSrc?: string;
  /**
   * @deprecated Use text prop instead
   */
  bnrTxtSrc?: string;
  /**
   * @deprecated Use dismissible prop instead
   */
  _2ndLabel?: boolean;
  /**
   * @deprecated Use size prop instead
   */
  bnrSz?: 's' | 'm' | 'l';
  /**
   * @deprecated Use location prop instead
   */
  bnrLoc?: 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br';
  /**
   * @deprecated Use color prop instead
   */
  bnrClr?: 'n' | 'p' | 'success' | 'warning' | 'error';
  /**
   * @deprecated Use text and secondLabelText props instead
   */
  title?: React.ReactNode;
  /**
   * @deprecated Use text and secondLabelText props instead
   */
  description?: React.ReactNode;
  /**
   * @deprecated Use iconName prop instead
   */
  icon?: React.ReactNode;
  /**
   * @deprecated Use iconName prop instead
   */
  showIcon?: boolean;
  /**
   * @deprecated Not supported in Acrobi design
   */
  actions?: any[];
  /**
   * @deprecated Use dismissible prop instead
   */
  showSecondLabel?: boolean;
  /**
   * @deprecated Use dismissible prop instead
   */
  secondLabelText?: string;
  /**
   * @deprecated Use dismissible prop instead
   */
  secondLabelIcon?: string;
  /**
   * @deprecated Not supported in Acrobi design
   */
  autoDismiss?: number;
  /**
   * @deprecated Use text and secondLabelText props instead
   */
  children?: React.ReactNode;
}

// Map banner color names to Acrobi data attributes
const getBannerColor = (color: string | null | undefined): string => {
  const colorMap: Record<string, string> = {
    n: 'n',
    p: 'p',
    success: 'success',
    warning: 'warning',
    error: 'error',
  };
  return colorMap[color || 'n'] || 'n';
};

// Map banner size names to Acrobi values
const getBannerSize = (size: string | null | undefined): string => {
  const sizeMap: Record<string, string> = {
    s: 's',
    m: 'm',
    l: 'l',
    sm: 's',
    md: 'm',
    lg: 'l',
  };
  return sizeMap[size || 'm'] || 'm';
};

// Map banner location names to Acrobi values
const getBannerLocation = (location: string | null | undefined): string => {
  const locationMap: Record<string, string> = {
    tl: 'tl',
    tc: 'tc',
    tr: 'tr',
    ml: 'ml',
    mc: 'mc',
    mr: 'mr',
    bl: 'bl',
    bc: 'bc',
    br: 'br',
  };
  return locationMap[location || 'bl'] || 'bl';
};

/**
 * Banner structure component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink OlBanner component.
 *
 * Key features:
 * - Uses .ol_bnr_wrap class for authentic styling
 * - Uses data attributes for banner styling (data-bnr-size, data-bnr-loc, data-bnr-clr)
 * - Integrates with single Label component for text and icon rendering
 * - Supports dismissible functionality with close button
 * - Follows Acrobi overlay banner design patterns
 *
 * @example
 * ```tsx
 * <BannerStructure
 *   text="Primary banner message"
 *   iconName="info"
 *   dismissible={true}
 *   onDismiss={() => console.log('Banner dismissed')}
 *   size="m"
 *   location="bl"
 *   color="p"
 * />
 * ```
 */
const BannerStructure = React.forwardRef<HTMLDivElement, BannerStructureProps>(
  (
    {
      className,
      visible = true,
      iconName = 'Default',
      text = 'Label',
      size = 'm',
      location = 'bl',
      color = 'n',
      dismissible = true,
      onDismiss,
      closeIcon = 'close',
      position,
      // Deprecated props for backward compatibility
      bnr,
      bnrIcnSrc,
      bnrTxtSrc,
      _2ndLabel,
      bnrSz,
      bnrLoc,
      bnrClr,
      showSecondLabel,
      secondLabelText,
      secondLabelIcon,
      title,
      description,
      icon,
      showIcon,
      children,
      ...props
    },
    ref
  ) => {
    // Handle backward compatibility
    const actualVisible = bnr !== undefined ? bnr : visible;
    const actualIconName = bnrIcnSrc || iconName;
    const actualText = children
      ? children.toString()
      : title
        ? title.toString()
        : bnrTxtSrc || text;
    const actualDismissible =
      _2ndLabel !== undefined
        ? _2ndLabel
        : showSecondLabel !== undefined
          ? showSecondLabel
          : dismissible;
    const actualSize = getBannerSize(bnrSz || size);
    const actualLocation = getBannerLocation(bnrLoc || location);
    const actualColor = getBannerColor(bnrClr || color);

    // Handle dismiss functionality
    const handleDismiss = () => {
      if (onDismiss) {
        onDismiss();
      }
    };

    // Don't render if not visible
    if (!actualVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          bannerStructureVariants({
            visible: actualVisible,
            position,
          }),
          className
        )}
        data-bnr-size={actualSize}
        data-bnr-loc={actualLocation}
        data-bnr-clr={actualColor}
        {...props}
      >
        {/* Single integrated label with optional close functionality */}
        <Label icon={actualIconName} text={actualText} size='r4' color='n000' />

        {/* Close button for dismissible banners */}
        {actualDismissible && (
          <Label
            icon={closeIcon}
            size='r4'
            color='n000'
            onClick={handleDismiss}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
    );
  }
);

BannerStructure.displayName = 'BannerStructure';

export { BannerStructure, bannerStructureVariants };
