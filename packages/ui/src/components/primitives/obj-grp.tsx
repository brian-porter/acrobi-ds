import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Avatar } from './avatar';
import { Icon } from './icon';

/**
 * ObjGrp variant styles using Acrobi Design System
 * This component creates visual clusters of overlapping objects (Avatars, AdaptIcons, Images)
 * with authentic Acrobi styling using CSS classes and data attributes
 */
const objGrpVariants = cva(
  // Base styles - using authentic Acrobi object group wrapper class
  'objgrp_wrap relative inline-flex items-center',
  {
    variants: {
      // These map to data-grp-sz values in Acrobi CSS
      size: {
        xs: '', // extra small
        s: '', // small
        m: '', // medium (default)
        l: '', // large
      },
      // These map to data-grp-shp values in Acrobi CSS
      shape: {
        c: '', // circle (default)
        s: '', // square
        r: '', // rectangle
        b: '', // rounded rectangle
      },
    },
    defaultVariants: {
      size: 'm',
      shape: 'c',
    },
  }
);

/**
 * Individual object styling within the group
 * Handles overlapping positioning with negative margins and z-index stacking
 */
const objItemVariants = cva(
  'objgrp-item relative transition-transform hover:z-10 hover:scale-105',
  {
    variants: {
      position: {
        first: '',
        overlapping: '',
      },
      size: {
        xs: '',
        s: '',
        m: '',
        l: '',
      },
      shape: {
        c: '',
        s: '',
        r: '',
        b: '',
      },
    },
    defaultVariants: {
      position: 'overlapping',
      size: 'm',
      shape: 'c',
    },
  }
);

export interface ObjGrpProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof objGrpVariants> {
  /**
   * Group size using Acrobi sizing system (GrpSz in Webflow)
   */
  size?: 'xs' | 's' | 'm' | 'l';
  /**
   * Group shape (GrpShp in Webflow)
   */
  shape?: 'c' | 's' | 'r' | 'b';
  /**
   * Object 1 source - Avatar image, AdaptIcon name, or Image URL (Obj1Src in Webflow)
   */
  obj1Src?: string;
  /**
   * Object 2 source (Obj2Src in Webflow)
   */
  obj2Src?: string;
  /**
   * Object 3 source (Obj3Src in Webflow)
   */
  obj3Src?: string;
  /**
   * Object 4 source (Obj4Src in Webflow)
   */
  obj4Src?: string;
  /**
   * Object 5 source (Obj5Src in Webflow)
   */
  obj5Src?: string;
  /**
   * Object 6 source (Obj6Src in Webflow)
   */
  obj6Src?: string;
  /**
   * Object 7 source (Obj7Src in Webflow)
   */
  obj7Src?: string;
  /**
   * Object 8 source (Obj8Src in Webflow)
   */
  obj8Src?: string;
  /**
   * Object 9 source (Obj9Src in Webflow)
   */
  obj9Src?: string;
  /**
   * Object 10 source (Obj10Src in Webflow)
   */
  obj10Src?: string;
  /**
   * Object types - 'avatar', 'icon', or 'image' for each object
   */
  obj1Type?: 'avatar' | 'icon' | 'image';
  obj2Type?: 'avatar' | 'icon' | 'image';
  obj3Type?: 'avatar' | 'icon' | 'image';
  obj4Type?: 'avatar' | 'icon' | 'image';
  obj5Type?: 'avatar' | 'icon' | 'image';
  obj6Type?: 'avatar' | 'icon' | 'image';
  obj7Type?: 'avatar' | 'icon' | 'image';
  obj8Type?: 'avatar' | 'icon' | 'image';
  obj9Type?: 'avatar' | 'icon' | 'image';
  obj10Type?: 'avatar' | 'icon' | 'image';
  /**
   * Overlap amount - how much objects overlap (overlapping spacing in pixels)
   */
  overlapAmount?: number;
  /**
   * Show object group (ObjGrp in Webflow)
   */
  visible?: boolean;
  /**
   * Maximum number of objects to display (remaining count shown as +N)
   */
  maxVisible?: number;
  /**
   * Show remaining count indicator when objects exceed maxVisible
   */
  showRemainingCount?: boolean;
}

// Map size names to Acrobi data-grp-sz values
const getObjGrpSize = (size: string | null | undefined): string => {
  const sizeMap: Record<string, string> = {
    xs: 'xs',
    s: 's',
    m: 'm',
    l: 'l',
  };
  return sizeMap[size || 'm'] || 'm';
};

// Map shape names to Acrobi data-grp-shp values
const getObjGrpShape = (shape: string | null | undefined): string => {
  const shapeMap: Record<string, string> = {
    c: 'c', // circle
    s: 's', // square
    r: 'r', // rectangle
    b: 'b', // rounded rectangle
  };
  return shapeMap[shape || 'c'] || 'c';
};

// Calculate overlap offset based on size and overlap amount
const getOverlapOffset = (size: string, overlapAmount: number = 12): number => {
  const sizeMultipliers: Record<string, number> = {
    xs: 0.6,
    s: 0.8,
    m: 1.0,
    l: 1.2,
  };
  return overlapAmount * (sizeMultipliers[size] || 1.0);
};

// Render individual object based on type
const renderObject = (
  src: string | undefined,
  type: 'avatar' | 'icon' | 'image' = 'avatar',
  size: string,
  shape: string,
  index: number,
  overlapOffset: number,
  isFirst: boolean
): React.ReactNode => {
  if (!src) return null;

  const itemStyle: React.CSSProperties = isFirst
    ? { zIndex: 10 - index }
    : {
        marginLeft: `-${overlapOffset}px`,
        zIndex: 10 - index,
      };

  const commonProps = {
    className: cn(
      objItemVariants({
        position: isFirst ? 'first' : 'overlapping',
        size: size as any,
        shape: shape as any,
      })
    ),
    style: itemStyle,
    key: `obj-${index}`,
  };

  switch (type) {
    case 'avatar':
      return (
        <div {...commonProps}>
          <Avatar
            src={src}
            size={size as any}
            shape={shape as any}
            group={true}
            data-obj-index={index}
          />
        </div>
      );
    case 'icon':
      return (
        <div {...commonProps}>
          <Icon name={src} size={size as any} data-obj-index={index} />
        </div>
      );
    case 'image':
      return (
        <div {...commonProps}>
          <img
            src={src}
            alt={`Object ${index + 1}`}
            className='objgrp-img'
            data-shape={shape}
            data-obj-size={size}
            data-obj-index={index}
            loading='lazy'
          />
        </div>
      );
    default:
      return null;
  }
};

/**
 * ObjGrp component using authentic Acrobi Design System styling
 *
 * This component creates visual clusters of overlapping objects with authentic
 * Acrobi styling using CSS classes and data attributes that match the design system.
 *
 * Key features:
 * - Uses .objgrp_wrap class for authentic styling
 * - Uses data-grp-sz for size control (xs, s, m, l)
 * - Uses data-grp-shp for shape control (c, s, r, b)
 * - Uses data-overlap for overlapping configuration
 * - Supports up to 10 objects (Obj1Src through Obj10Src)
 * - Mixed content types: Avatar, Icon, Image
 * - Hover effects with z-index stacking
 * - Remaining count indicator for overflow
 *
 * @example
 * ```tsx
 * <ObjGrp
 *   size="l"
 *   shape="c"
 *   obj1Src="https://example.com/avatar1.jpg"
 *   obj1Type="avatar"
 *   obj2Src="https://example.com/avatar2.jpg"
 *   obj2Type="avatar"
 *   obj3Src="star"
 *   obj3Type="icon"
 *   overlapAmount={16}
 *   maxVisible={3}
 *   showRemainingCount={true}
 * />
 * ```
 */
const ObjGrp = React.forwardRef<HTMLDivElement, ObjGrpProps>(
  (
    {
      className,
      size = 'm',
      shape = 'c',
      obj1Src,
      obj2Src,
      obj3Src,
      obj4Src,
      obj5Src,
      obj6Src,
      obj7Src,
      obj8Src,
      obj9Src,
      obj10Src,
      obj1Type = 'avatar',
      obj2Type = 'avatar',
      obj3Type = 'avatar',
      obj4Type = 'avatar',
      obj5Type = 'avatar',
      obj6Type = 'avatar',
      obj7Type = 'avatar',
      obj8Type = 'avatar',
      obj9Type = 'avatar',
      obj10Type = 'avatar',
      overlapAmount = 12,
      visible = true,
      maxVisible = 10,
      showRemainingCount = false,
      children,
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!visible) return null;

    // Collect objects data
    const objects = [
      { src: obj1Src, type: obj1Type },
      { src: obj2Src, type: obj2Type },
      { src: obj3Src, type: obj3Type },
      { src: obj4Src, type: obj4Type },
      { src: obj5Src, type: obj5Type },
      { src: obj6Src, type: obj6Type },
      { src: obj7Src, type: obj7Type },
      { src: obj8Src, type: obj8Type },
      { src: obj9Src, type: obj9Type },
      { src: obj10Src, type: obj10Type },
    ].filter(obj => obj.src); // Only include objects with sources

    // Calculate visible objects and remaining count
    const visibleObjects = objects.slice(0, maxVisible);
    const remainingCount = Math.max(0, objects.length - maxVisible);
    const showRemaining = showRemainingCount && remainingCount > 0;

    // Calculate overlap offset
    const overlapOffset = getOverlapOffset(size, overlapAmount);

    const objGrpSize = getObjGrpSize(size);
    const objGrpShape = getObjGrpShape(shape);

    return (
      <div
        ref={ref}
        className={cn(objGrpVariants({ size, shape }), className)}
        data-grp-sz={objGrpSize}
        data-grp-shp={objGrpShape}
        data-overlap='true'
        data-obj-count={visibleObjects.length}
        {...props}
      >
        {/* Render visible objects */}
        {visibleObjects.map((obj, index) =>
          renderObject(
            obj.src,
            obj.type,
            size,
            shape,
            index,
            overlapOffset,
            index === 0
          )
        )}

        {/* Render remaining count indicator */}
        {showRemaining && (
          <div
            className={cn(
              objItemVariants({
                position: 'overlapping',
                size: size as any,
                shape: shape as any,
              }),
              'objgrp-remaining flex items-center justify-center bg-gray-200 text-gray-600 font-medium'
            )}
            style={{
              marginLeft: `-${overlapOffset}px`,
              zIndex: 0,
            }}
            data-remaining-count={remainingCount}
          >
            <span className='text-xs'>+{remainingCount}</span>
          </div>
        )}

        {/* Support for children/custom content */}
        {children}
      </div>
    );
  }
);

ObjGrp.displayName = 'ObjGrp';

export { ObjGrp, objGrpVariants, objItemVariants };
export type { ObjGrpProps };
