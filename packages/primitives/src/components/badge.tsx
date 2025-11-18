import * as React from 'react';
import { cn } from '../lib/utils';
import { Label } from './label';

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'content'> {
  /**
   * Badge content
   */
  children?: React.ReactNode;
  /**
   * Badge visibility toggle (Bdg in Webflow)
   */
  visible?: boolean;
  /**
   * Badge color using Acrobi color system (BdgClr in Webflow)
   */
  color?:
    | 'fd500'
    | 'fw500'
    | 'f500'
    | 'p500'
    | 'n500'
    | 'n000'
    | 'n999'
    | 'd'
    | 'w'
    | 's'
    | 'p'
    | 'n'
    | 'on'
    | 'off'
    | 'busy';
  /**
   * Badge size using Acrobi sizing system (BdgSz in Webflow)
   */
  size?: 'xl' | 'l' | 'm' | 'sm' | 's';
  /**
   * Badge content visibility (BdgCont in Webflow)
   */
  content?: boolean;
  /**
   * Badge text visibility (BdgTxt in Webflow)
   */
  textVisible?: boolean;
  /**
   * Badge text content (BdgTxtSrc in Webflow)
   */
  text?: string;
  /**
   * Badge icon visibility (BdgIcn in Webflow)
   */
  iconVisible?: boolean;
  /**
   * Badge icon name (BdgIcnSrc in Webflow)
   */
  icon?: string;
  /**
   * Badge icon size (BdgIcnSz in Webflow)
   */
  iconSize?: 'r4' | 'r3' | 'r2' | 'r1';
  /**
   * Badge location (BdgLoc in Webflow)
   */
  location?: 'tl' | 'tr' | 'bl' | 'br';
  /**
   * Badge ID for targeting
   */
  badgeId?: string;

  // Legacy props for backward compatibility
  /**
   * @deprecated Use visible prop instead
   */
  bdg?: boolean;
  /**
   * @deprecated Use color prop instead
   */
  bdgClr?: string;
  /**
   * @deprecated Use size prop instead
   */
  bdgSz?: string;
  /**
   * @deprecated Use content prop instead
   */
  bdgCont?: boolean;
  /**
   * @deprecated Use textVisible prop instead
   */
  bdgTxt?: boolean;
  /**
   * @deprecated Use text prop instead
   */
  bdgTxtSrc?: string;
  /**
   * @deprecated Use iconVisible prop instead
   */
  bdgIcn?: boolean;
  /**
   * @deprecated Use icon prop instead
   */
  bdgIcnSrc?: string;
  /**
   * @deprecated Use iconSize prop instead
   */
  bdgIcnSz?: string;
  /**
   * @deprecated Use location prop instead
   */
  bdgLoc?: string;
  /**
   * @deprecated Use badgeId prop instead
   */
  bdgId?: string;
}

// Map size to Acrobi data attributes
const getBadgeSize = (size: string | null | undefined): string => {
  const sizeMap: Record<string, string> = {
    xs: 'xs',
    sm: 's',
    default: 'm',
    lg: 'l',
    xl: 'xl',
  };
  return sizeMap[size || 'default'] || 'm';
};

// Map color to Acrobi data-bg-clr values (matches devlink Badge pattern)
const getBadgeColor = (color: string | null | undefined): string => {
  const colorMap: Record<string, string> = {
    // Full color names (new API)
    fd500: 'fd500',
    fw500: 'fw500',
    f500: 'f500',
    p500: 'p500',
    n500: 'n500',
    n000: 'n000',
    n999: 'n999',
    // Short color names (legacy API)
    d: 'd', // danger
    w: 'w', // warning
    s: 's', // success
    p: 'p', // primary
    n: 'n', // neutral
    // Availability colors
    on: 'on', // online
    off: 'off', // offline
    busy: 'busy', // busy
  };
  return colorMap[color || 'fd500'] || 'fd500';
};

// Map location to Acrobi data-loc values (matches devlink Badge pattern)
const getBadgeLocation = (location: string | null | undefined): string => {
  const locationMap: Record<string, string> = {
    tl: 'tl', // top-left
    tr: 'tr', // top-right
    bl: 'bl', // bottom-left
    br: 'br', // bottom-right
  };
  return locationMap[location || 'br'] || 'br';
};

/**
 * Badge component using authentic Acrobi Design System styling
 *
 * This component uses data attributes that map directly to the CSS selectors
 * in the Acrobi design system, ensuring authentic styling that matches the
 * original design specifications.
 *
 * Key features:
 * - Uses data-badge-style for visual variants
 * - Uses data-badge-size for sizing
 * - Uses data-badge-type for semantic colors
 * - Uses data-badge-position for positioning
 * - Supports BQ-Icons font system
 * - Dot indicator mode
 *
 * @example
 * ```tsx
 * <Badge
 *   text="3"
 *   type="danger"
 *   size="default"
 *   position="top-right"
 * />
 *
 * <Badge
 *   icon="check"
 *   type="success"
 *   size="sm"
 *   position="top-left"
 * />
 * ```
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      children,
      // New API
      visible = true,
      color = 'fd500',
      size = 'm',
      content = true,
      textVisible = true,
      text,
      iconVisible = false,
      icon,
      iconSize = 'r4',
      location = 'br',
      badgeId,
      // Legacy API (deprecated but supported)
      bdg,
      bdgClr,
      bdgSz,
      bdgCont,
      bdgTxt,
      bdgTxtSrc,
      bdgIcn,
      bdgIcnSrc,
      bdgIcnSz,
      bdgLoc,
      bdgId,
      ...props
    },
    ref
  ) => {
    // Handle legacy props
    const actualVisible = bdg !== undefined ? bdg : visible;
    const actualColor = bdgClr || color;
    const actualSize = bdgSz || size;
    const actualContent = bdgCont !== undefined ? bdgCont : content;
    const actualTextVisible = bdgTxt !== undefined ? bdgTxt : textVisible;
    const actualText = bdgTxtSrc || text;
    const actualIconVisible = bdgIcn !== undefined ? bdgIcn : iconVisible;
    const actualIcon = bdgIcnSrc || icon;
    const actualIconSize = bdgIcnSz || iconSize;
    const actualLocation = bdgLoc || location;
    const actualBadgeId = bdgId || badgeId;

    // Don't render if not visible
    if (!actualVisible) return null;

    const badgeColorValue = getBadgeColor(actualColor);
    const badgeSizeValue = getBadgeSize(actualSize);
    const badgeLocationValue = getBadgeLocation(actualLocation);

    return (
      <div
        ref={ref}
        className={cn('badge_wrap', className)}
        data-bdg-size={badgeSizeValue}
        data-bg-clr={badgeColorValue}
        data-loc={badgeLocationValue}
        id={actualBadgeId}
        {...props}
      >
        {actualContent && (
          <Label
            className='bdg-label_wrap'
            size={actualIconSize as any}
            iconPosition='Left'
            color='n000'
            gap='8'
            icon={actualIconVisible ? actualIcon : undefined}
            iconVisible={actualIconVisible}
            textVisible={actualTextVisible}
            text={actualText}
          >
            {actualText || children}
          </Label>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
