import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * Icon component using BQ-Icons font system
 * This matches the devlink Icon component pattern where icon names
 * map to specific glyphs in the BQ-Icons font
 */
const iconVariants = cva('inline-flex shrink-0 items-center justify-center', {
  variants: {
    // These map to data-icn-size values in Acrobi CSS
    size: {
      xxs: '',
      xs: '',
      s: '',
      sm: '',
      m: '',
      ml: '',
      l: '',
      xl: '',
      '2xl': '',
    },
    // These map to data-clr values in Acrobi CSS
    color: {
      inherit: '',
      n000: '',
      n100: '',
      n200: '',
      n300: '',
      n500: '',
      n700: '',
      n900: '',
      n999: '',
      p100: '',
      p200: '',
      p300: '',
      p500: '',
      p700: '',
      p900: '',
      f500: '',
      fd500: '',
      fw500: '',
      t000: '',
    },
  },
  defaultVariants: {
    size: 'm',
    color: 'inherit',
  },
});

export interface IconProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof iconVariants> {
  /**
   * Icon name from BQ-Icons font (IcnSrc in Webflow)
   * Common icons: 'default' (X in box), 'close', 'check', 'arrow', etc.
   */
  name: string;
  /**
   * Icon size using Acrobi sizing system (IcnSz in Webflow)
   */
  size?: 'xxs' | 'xs' | 's' | 'sm' | 'm' | 'ml' | 'l' | 'xl' | '2xl';
  /**
   * Icon color using Acrobi color system (IcnClr in Webflow)
   */
  color?:
    | 'inherit'
    | 'n000'
    | 'n100'
    | 'n200'
    | 'n300'
    | 'n500'
    | 'n700'
    | 'n900'
    | 'n999'
    | 'p100'
    | 'p200'
    | 'p300'
    | 'p500'
    | 'p700'
    | 'p900'
    | 'f500'
    | 'fd500'
    | 'fw500'
    | 't000';
  /**
   * Icon visibility toggle (Icn in Webflow)
   */
  visible?: boolean;
  /**
   * Icon drop shadow (IcnDrpShdw in Webflow)
   */
  dropShadow?: boolean;
}


// Map size names to Acrobi data-icn-size values
const getIconSize = (size: string | null | undefined): string => {
  const sizeMap: Record<string, string> = {
    xxs: 'xxs',
    xs: 'xs',
    s: 's',
    sm: 'sm',
    m: 'm',
    ml: 'ml',
    l: 'l',
    xl: 'xl',
    '2xl': '2xl',
  };
  return sizeMap[size || 'm'] || 'm';
};

// Map color names to Acrobi data-clr values
const getIconColor = (color: string | null | undefined): string => {
  const colorMap: Record<string, string> = {
    inherit: 'in',
    n000: 'n000',
    n100: 'n100',
    n200: 'n200',
    n300: 'n300',
    n500: 'n500',
    n700: 'n700',
    n900: 'n900',
    n999: 'n999',
    p100: 'p100',
    p200: 'p200',
    p300: 'p300',
    p500: 'p500',
    p700: 'p700',
    p900: 'p900',
    f500: 'f500',
    fd500: 'fd500',
    fw500: 'fw500',
    t000: 't000',
  };
  return colorMap[color || 'inherit'] || 'in';
};

/**
 * Icon component using BQ-Icons font system
 *
 * This component renders icons using the BQ-Icons font, matching the
 * devlink Icon component pattern. Icon names map to specific glyphs
 * in the font file.
 *
 * @example
 * ```tsx
 * <Icon name="default" size="m" color="p500" />
 * <Icon name="close" size="l" color="fd500" />
 * ```
 */
const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  (
    {
      className,
      name,
      size = 'm',
      color = 'inherit',
      visible = true,
      dropShadow = false,
      style,
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!visible) return null;

    return (
      <span
        ref={ref}
        className={cn('icn', iconVariants({ size, color }), className)}
        data-icn-size={getIconSize(size)}
        data-clr={getIconColor(color)}
        style={{
          fontFamily: 'BQ-Icons, sans-serif',
          ...(dropShadow && {
            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
          }),
          ...style,
        }}
        {...props}
      >
        {name}
      </span>
    );
  }
);

Icon.displayName = 'Icon';

export { Icon, iconVariants };
