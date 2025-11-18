import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Icon } from './icon';

/**
 * Label component using Acrobi Design System data attributes
 * This matches the devlink Label component pattern where styling
 * is controlled via data attributes that map to CSS selectors
 */
const labelVariants = cva('label_wrap inline-flex justify-center', {
  variants: {
    // These map to data-lbl-size values in Acrobi CSS
    size: {
      inherit: '',
      r4: '',
      r4b: '',
      r3: '',
      r3b: '',
      r2: '',
      r2b: '',
      r1: '',
      r1b: '',
      h5: '',
      h5b: '',
      h4: '',
      h4b: '',
      h3: '',
      h3b: '',
      h2: '',
      h2b: '',
      h1: '',
      h1b: '',
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
    // These map to data-loc values for icon positioning
    iconPosition: {
      Left: 'flex-row items-center', // left - horizontal layout
      Right: 'flex-row-reverse items-center', // right - horizontal layout reversed
      Top: 'flex-col items-center', // top - vertical layout
      Bottom: 'flex-col-reverse items-center', // bottom - vertical layout reversed
    },
    // These map to data-gap values for spacing
    gap: {
      '4': '',
      '8': '',
      '16': '',
    },
    // These map to data-ts values for text shadow
    shadow: {
      none: '',
      xs: '',
      s: '',
      m: '',
      l: '',
      xl: '',
      bold: '',
      'bold-light': '',
    },
    // These map to data-lc values for label location/alignment
    location: {
      l: '', // left
      c: '', // center
      r: '', // right
    },
  },
  defaultVariants: {
    size: 'r2',
    color: 'inherit',
    iconPosition: 'Left',
    gap: '8',
    shadow: 'none',
    location: 'l',
  },
});

export interface LabelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof labelVariants> {
  /**
   * Label text content (TxtSrc in Webflow)
   */
  children?: React.ReactNode;
  /**
   * Text content (alternative to children)
   */
  text?: string;
  /**
   * Label visibility toggle (Lbl in Webflow)
   */
  visible?: boolean;
  /**
   * Text visibility toggle (Txt in Webflow)
   */
  textVisible?: boolean;
  /**
   * Show text content
   */
  showText?: boolean;
  /**
   * Icon visibility toggle (Icn in Webflow)
   */
  iconVisible?: boolean;
  /**
   * Show icon
   */
  showIcon?: boolean;
  /**
   * Icon name from BQ-Icons font (IcnSrc in Webflow)
   */
  icon?: string;
  /**
   * Icon size (if not provided, will match label size)
   */
  iconSize?: 'xxs' | 'xs' | 's' | 'sm' | 'm' | 'ml' | 'l' | 'xl' | '2xl';
  /**
   * Icon color override (IcnClr in Webflow)
   */
  iconColor?:
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
   * Label size using Acrobi typography scale (LblSz in Webflow)
   * Regular variants: r4, r3, r2, r1, h5, h4, h3, h2, h1
   * Bold variants: r4b, r3b, r2b, r1b, h5b, h4b, h3b, h2b, h1b
   */
  size?:
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
   * Label color using Acrobi color system (LblClr in Webflow)
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
   * Icon position relative to text (IcnLoc in Webflow)
   */
  iconPosition?: 'Left' | 'Right' | 'Top' | 'Bottom';
  /**
   * Icon location (alternative naming)
   */
  iconLocation?: 'l' | 'r' | 't' | 'b';
  /**
   * Gap between icon and text (LblGap in Webflow)
   */
  gap?: '4' | '8' | '16';
  /**
   * Text shadow (LblShad in Webflow)
   */
  shadow?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'bold' | 'bold-light';
  /**
   * Text shadow (alternative naming)
   */
  textShadow?: string;
  /**
   * Label location/alignment (LblLc in Webflow)
   */
  location?: 'l' | 'c' | 'r';
  /**
   * HTML for attribute for form labels (LblFor in Webflow)
   */
  htmlFor?: string;
  /**
   * Anchor name for in-page linking (Anchor in Webflow)
   */
  anchor?: string;
}

// Map size names to Acrobi data-lbl-size values
const getLabelSize = (size: string | null | undefined): string => {
  const sizeMap: Record<string, string> = {
    inherit: 'in',
    r4: 'r4',
    r4b: 'r4b',
    r3: 'r3',
    r3b: 'r3b',
    r2: 'r2',
    r2b: 'r2b',
    r1: 'r1',
    r1b: 'r1b',
    h5: 'h5',
    h5b: 'h5b',
    h4: 'h4',
    h4b: 'h4b',
    h3: 'h3',
    h3b: 'h3b',
    h2: 'h2',
    h2b: 'h2b',
    h1: 'h1',
    h1b: 'h1b',
  };
  return sizeMap[size || 'r2'] || 'r2';
};

// Map color names to Acrobi data-clr values
const getLabelColor = (color: string | null | undefined): string => {
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

// Map shadow names to Acrobi data-ts values
const getLabelShadow = (shadow: string | null | undefined): string => {
  const shadowMap: Record<string, string> = {
    none: 'n',
    xs: 'xs',
    s: 's',
    m: 'm',
    l: 'l',
    xl: 'xl',
    bold: 'bold',
    'bold-light': 'bold-light',
  };
  return shadowMap[shadow || 'none'] || 'n';
};

// Map iconPosition to data-loc values
const getIconPositionValue = (position: string | null | undefined): string => {
  const positionMap: Record<string, string> = {
    Left: 'l',
    Right: 'r',
    Top: 't',
    Bottom: 'b',
  };
  return positionMap[position || 'Left'] || 'l';
};

// Map label size to appropriate icon size
const getDefaultIconSize = (
  labelSize: string
): 'xxs' | 'xs' | 's' | 'sm' | 'm' | 'ml' | 'l' | 'xl' | '2xl' => {
  const iconSizeMap: Record<
    string,
    'xxs' | 'xs' | 's' | 'sm' | 'm' | 'ml' | 'l' | 'xl' | '2xl'
  > = {
    r4: 'xs', // smallest text → xs icon
    r4b: 'xs', // smallest text bold → xs icon
    r3: 's', // small text → s icon
    r3b: 's', // small text bold → s icon
    r2: 'sm', // regular text → sm icon
    r2b: 'sm', // regular text bold → sm icon
    r1: 'm', // large regular text → m icon
    r1b: 'm', // large regular text bold → m icon
    h5: 'm', // heading 5 → m icon
    h5b: 'm', // heading 5 bold → m icon
    h4: 'ml', // heading 4 → ml icon
    h4b: 'ml', // heading 4 bold → ml icon
    h3: 'l', // heading 3 → l icon
    h3b: 'l', // heading 3 bold → l icon
    h2: 'xl', // heading 2 → xl icon
    h2b: 'xl', // heading 2 bold → xl icon
    h1: '2xl', // heading 1 → 2xl icon
    h1b: '2xl', // heading 1 bold → 2xl icon
    inherit: 'sm', // fallback
  };
  return iconSizeMap[labelSize] || 'sm';
};

/**
 * Label component using authentic Acrobi Design System styling
 *
 * This component uses data attributes that map directly to the CSS selectors
 * in the Acrobi design system. It can be used standalone or nested within
 * other components like buttons, form fields, etc.
 *
 * Key features:
 * - Uses data-lbl-size for typography sizing (r4, r3, r2, r1, h5-h1)
 * - Uses data-clr for color theming
 * - Uses data-loc for icon positioning (l, r, t, b)
 * - Uses data-gap for spacing control
 * - Uses data-ts for text shadow effects
 * - Automatically sizes icons to match text
 * - Supports BQ-Icons font system
 *
 * @example
 * ```tsx
 * <Label size="h3" color="p500" icon="default" iconPosition="l">
 *   Primary Heading
 * </Label>
 *
 * <Label size="r2" icon="check" iconPosition="r">
 *   Completed Task
 * </Label>
 * ```
 */
const Label = React.forwardRef<HTMLDivElement, LabelProps>(
  (
    {
      className,
      children,
      text,
      visible = true,
      textVisible = true,
      showText = true,
      iconVisible = true,
      showIcon = true,
      icon,
      iconSize,
      iconColor,
      size = 'r2',
      color = 'inherit',
      iconPosition = 'Left',
      iconLocation,
      gap = '8',
      shadow = 'none',
      textShadow,
      location,
      htmlFor,
      anchor,
      style,
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!visible) return null;

    const labelSizeValue = getLabelSize(size);
    const defaultIconSize = iconSize || getDefaultIconSize(labelSizeValue);
    const defaultIconColor = iconColor || color;

    // Handle alternative prop names
    const actualIconPosition = iconLocation
      ? iconLocation === 'l'
        ? 'Left'
        : iconLocation === 'r'
          ? 'Right'
          : iconLocation === 't'
            ? 'Top'
            : 'Bottom'
      : iconPosition;
    const actualShadow = textShadow ? 'none' : shadow;
    const actualShowText = showText && textVisible;
    const actualShowIcon = showIcon && iconVisible;
    const actualText = text || children;

    const Component = htmlFor ? 'label' : 'div';

    const labelStyle = {
      ...(location === 'c' && { textAlign: 'center' as const }),
      ...(location === 'r' && { textAlign: 'right' as const }),
      ...(location === 'l' && { textAlign: 'left' as const }),
      ...style,
    };

    return (
      <Component
        ref={ref as any}
        className={cn(
          labelVariants({
            size,
            color,
            iconPosition: actualIconPosition,
            gap,
            shadow: actualShadow,
          }),
          className
        )}
        data-lbl-size={labelSizeValue}
        data-clr={getLabelColor(color)}
        data-loc={getIconPositionValue(actualIconPosition)}
        data-gap={gap}
        data-ts={textShadow || getLabelShadow(actualShadow)}
        data-lc={location}
        htmlFor={htmlFor}
        style={labelStyle}
        {...(anchor && { 'anchor-name': anchor })}
        {...props}
      >
        {actualIconPosition === 'Bottom' || actualIconPosition === 'Right' ? (
          <>
            {actualText && actualShowText && (
              <div className='txt'>{actualText}</div>
            )}
            {icon && actualShowIcon && (
              <Icon
                name={icon}
                size={defaultIconSize}
                color={defaultIconColor}
                visible={actualShowIcon}
              />
            )}
          </>
        ) : (
          <>
            {icon && actualShowIcon && (
              <Icon
                name={icon}
                size={defaultIconSize}
                color={defaultIconColor}
                visible={actualShowIcon}
              />
            )}
            {actualText && actualShowText && (
              <div className='txt'>{actualText}</div>
            )}
          </>
        )}
      </Component>
    );
  }
);

Label.displayName = 'Label';

export { Label, labelVariants };
