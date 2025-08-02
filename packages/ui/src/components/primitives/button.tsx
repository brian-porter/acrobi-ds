import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Label } from './label';

/**
 * Button variant styles using Acrobi Design System data attributes
 * This approach matches the authentic devlink Button component pattern
 * where styling is controlled via data attributes that map to CSS selectors
 */
const buttonVariants = cva(
  // Base styles - minimal classes, let .btn class handle most styling
  'focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed',
  {
    variants: {
      // Button Type: Filled, Line, Text
      type: {
        filled: '', // BtnFill - solid background
        line: '', // BtnLine - outline/border style
        text: '', // BtnTxt - text only, no background
      },
      // Button Style: Prime, Neutral, Focus, Danger, Warn
      style: {
        prime: '', // Primary blue color
        neutral: '', // Neutral gray color
        focus: '', // Focus cyan color
        danger: '', // Danger red color
        warn: '', // Warning orange color
      },
      // These map to data-btn-size values in Acrobi CSS
      size: {
        xs: '', // 24px height, r4 label
        sm: '', // 32px height, r3 label
        md: '', // 36px height, r1 label
        lg: '', // 48px height, h5 label, 6px border radius
        dy: '', // dynamic: auto height, 8,10,8,10 padding, r2 label, 6px border radius, grows with content, normally has top icon
      },
      // These map to data-bs values for box shadow
      shadow: {
        n: '', // none
        xs: '',
        s: '',
        m: '',
        l: '',
        xl: '',
      },
      // These map to data-btn-hug values
      width: {
        auto: '',
        full: 'w-full',
        right: '', // align right
      },
    },
    defaultVariants: {
      type: 'filled',
      style: 'prime',
      size: 'md',
      shadow: 'n',
      width: 'auto',
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    Omit<VariantProps<typeof buttonVariants>, 'style'> {
  /**
   * HTML button type
   */
  htmlType?: 'button' | 'submit' | 'reset';
  /**
   * Button style variant
   */
  styling?: 'prime' | 'neutral' | 'focus' | 'danger' | 'warn';
  /**
   * Render as child component (requires Radix-style slot)
   */
  asChild?: boolean;
  /**
   * Show loading state with spinner
   */
  loading?: boolean;
  /**
   * Icon name from BQ-Icons font (e.g., 'default', 'close', 'check')
   */
  icon?: string;
  /**
   * Icon position relative to text
   */
  iconPosition?: 'Left' | 'Right' | 'Top' | 'Bottom';
  /**
   * Button text content
   */
  children?: React.ReactNode;
  /**
   * Button active state (matches devlink btnActive)
   */
  active?: boolean;
  /**
   * @deprecated Use type and style props instead
   */
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'link';
}

// Map type and style to Acrobi data-btn-style values
const getButtonStyle = (
  type: string | null | undefined,
  style: string | null | undefined,
  variant?: string | null | undefined // for backward compatibility
): string => {
  // Handle backward compatibility with old variant prop
  if (variant) {
    const legacyStyleMap: Record<string, string> = {
      default: 'nt', // neutral text
      primary: 'pf', // primary filled
      secondary: 'nf', // neutral filled
      outline: 'nl', // neutral line
      ghost: 'nt', // neutral text
      destructive: 'df', // danger filled
      link: 'in', // inherit
    };
    return legacyStyleMap[variant] || 'nt';
  }

  // New type + style system
  const typePrefix = type === 'filled' ? 'f' : type === 'line' ? 'l' : 't'; // filled, line, text
  const stylePrefix =
    style === 'prime'
      ? 'p'
      : style === 'neutral'
        ? 'n'
        : style === 'focus'
          ? 'f'
          : style === 'danger'
            ? 'd'
            : style === 'warn'
              ? 'w'
              : 'p'; // default to prime

  return `${stylePrefix}${typePrefix}`; // e.g., 'pf' for prime filled, 'nl' for neutral line
};

// Map size names to Acrobi data-btn-size values
const getButtonSize = (size: string | null | undefined): string => {
  const sizeMap: Record<string, string> = {
    xs: 'xs', // 24px height
    sm: 'sm', // 32px height
    md: 'md', // 36px height
    lg: 'lg', // 48px height, 6px border radius
    dy: 'dy', // dynamic: auto height, 8,10,8,10 padding, 6px border radius
  };
  return sizeMap[size || 'md'] || 'md';
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

/**
 * Button component using authentic Acrobi Design System styling
 *
 * This component uses data attributes that map directly to the CSS selectors
 * in the Acrobi design system, ensuring authentic styling that matches the
 * original devlink Button component.
 *
 * Key features:
 * - Uses data-btn-style for visual variants (pf, pl, pt, nf, nl, nt, df, dl, in)
 * - Uses data-btn-size for sizing (xs, s, m, l, d)
 * - Uses data-bs for box shadows (n, xs, s, m, l, xl)
 * - Uses data-btn-hug for width control
 * - Uses data-btn-active for active states
 * - Supports icons with data-loc positioning
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="l" icon="default" iconPosition="l">
 *   Search
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      type = 'filled',
      styling = 'prime',
      variant, // deprecated, for backward compatibility
      size = 'md',
      shadow = 'n',
      width = 'auto',
      htmlType = 'button',
      asChild = false,
      loading = false,
      icon,
      iconPosition = 'Left',
      children,
      disabled,
      active = false,
      style, // Extract style prop to prevent it from being passed to DOM
      ...props
    },
    ref
  ) => {
    // Handle loading and disabled states
    // Note: For disabled state, border color should always match the background color of the button in the disabled filled state
    const isDisabled = disabled || loading;

    // Map width to data-btn-hug values
    const getHugValue = (
      width: string | null | undefined
    ): string | undefined => {
      if (width === 'right') return 'r';
      return undefined; // auto and full don't need data-btn-hug
    };

    // Map button size to label size
    const getLabelSize = (
      buttonSize: string | null | undefined
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
      const labelSizeMap: Record<
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
        xs: 'r4', // 24px height -> r4 label
        sm: 'r3', // 32px height -> r3 label
        md: 'r1', // 36px height -> r1 label
        lg: 'h5', // 48px height -> h5 label
        dy: 'r2', // dynamic height -> r2 label
      };
      return labelSizeMap[getButtonSize(buttonSize)] || 'r1';
    };

    // Determine gap based on icon position and size
    const getGapForIconPosition = (position: string, buttonSize: string): '0' | '4' | '8' | '16' => {
      // For top and bottom positions, use 0 gap for tighter layout
      if (position === 'Top' || position === 'Bottom') {
        return '0';
      }
      // For dynamic buttons, use 0 gap
      if (buttonSize === 'dy') {
        return '0';
      }
      // Default gap for left/right positions
      return '8';
    };

    // Create the label content using Label component
    const labelContent = (
      <Label
        size={getLabelSize(size)}
        color='inherit'
        icon={icon}
        iconPosition={iconPosition}
        gap={getGapForIconPosition(iconPosition, size)}
      >
        {children}
      </Label>
    );

    // Loading spinner
    const loadingSpinner = (
      <svg
        className='animate-spin h-4 w-4'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    );

    return (
      <button
        ref={ref}
        type={htmlType}
        className={cn(
          'btn',
          buttonVariants({ type, style: styling, size, shadow, width }),
          className
        )}
        style={style}
        data-btn-style={getButtonStyle(type, styling, variant)}
        data-btn-size={getButtonSize(size)}
        data-bs={shadow}
        data-btn-hug={getHugValue(width)}
        data-btn-active={active ? 'true' : 'false'}
        data-loc={getIconPositionValue(iconPosition)}
        x-disabled={isDisabled ? 'true' : 'false'}
        disabled={isDisabled}
        {...props}
      >
        {loading ? loadingSpinner : labelContent}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
