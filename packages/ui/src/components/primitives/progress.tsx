import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * Progress component using Acrobi Design System patterns
 * This follows the devlink Progress component structure with authentic
 * Acrobi styling and data attributes
 */
const progressVariants = cva(
  // Base styles - minimal classes, let .progress-bar class handle most styling
  'progress-bar relative w-full overflow-hidden',
  {
    variants: {
      // These map to data-progress-size values in Acrobi CSS
      size: {
        xs: '', // extra small
        s: '', // small
        m: '', // medium (default)
        l: '', // large
        xl: '', // extra large
      },
      // These map to data-progress-style values in Acrobi CSS
      style: {
        prime: '', // primary (blue)
        neutral: '', // neutral (gray)
        focus: '', // focus (cyan)
        danger: '', // danger (red)
        warn: '', // warning (orange)
        success: '', // success (green)
      },
      // These map to data-progress-shape values
      shape: {
        r: '', // rounded
        s: '', // square
      },
    },
    defaultVariants: {
      size: 'm',
      style: 'prime',
      shape: 'r',
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /**
   * Progress value (0-100) (BarValue in Webflow)
   */
  value?: number;
  /**
   * Maximum value (default: 100)
   */
  max?: number;
  /**
   * Progress bar size using Acrobi sizing system
   */
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  /**
   * Progress bar style/color theme
   */
  styling?: 'prime' | 'neutral' | 'focus' | 'danger' | 'warn' | 'success';
  /**
   * Progress bar shape
   */
  shape?: 'r' | 's'; // rounded, square
  /**
   * Whether to show percentage text below progress bar
   */
  showValue?: boolean;
  /**
   * Progress bar visibility toggle
   */
  visible?: boolean;
  /**
   * Custom label for accessibility
   */
  'aria-label'?: string;
  /**
   * @deprecated Use style prop instead
   */
  variant?: 'default' | 'success' | 'warning' | 'error';
}

// Map size names to Acrobi data-progress-size values
const getProgressSize = (size: string | null | undefined): string => {
  const sizeMap: Record<string, string> = {
    xs: 'xs',
    s: 's',
    m: 'm',
    l: 'l',
    xl: 'xl',
  };
  return sizeMap[size || 'm'] || 'm';
};

// Map style names to Acrobi data-progress-style values
const getProgressStyle = (
  style: string | null | undefined,
  variant?: string | null | undefined
): string => {
  // Handle backward compatibility with old variant prop
  if (variant) {
    const legacyStyleMap: Record<string, string> = {
      default: 'prime',
      success: 'success',
      warning: 'warn',
      error: 'danger',
    };
    return legacyStyleMap[variant] || 'prime';
  }

  const styleMap: Record<string, string> = {
    prime: 'prime',
    neutral: 'neutral',
    focus: 'focus',
    danger: 'danger',
    warn: 'warn',
    success: 'success',
  };
  return styleMap[style || 'prime'] || 'prime';
};

// Map shape names to Acrobi data-progress-shape values
const getProgressShape = (shape: string | null | undefined): string => {
  const shapeMap: Record<string, string> = {
    r: 'r',
    s: 's',
  };
  return shapeMap[shape || 'r'] || 'r';
};

/**
 * Progress component using authentic Acrobi Design System styling
 *
 * This component uses the same structure as the devlink Progress component
 * with proper data attributes for Acrobi CSS styling.
 *
 * Key features:
 * - Uses data-progress-size for sizing (xs, s, m, l, xl)
 * - Uses data-progress-style for color theming
 * - Uses data-progress-shape for shape control (r, s)
 * - Follows authentic Acrobi progress-bar structure
 * - Supports percentage display
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <Progress
 *   value={75}
 *   size="m"
 *   style="prime"
 *   shape="r"
 *   showValue={true}
 * />
 * ```
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      size = 'm',
      styling = 'prime',
      shape = 'r',
      showValue = false,
      visible = true,
      variant, // deprecated, for backward compatibility
      'aria-label': ariaLabel,
      style, // Extract style prop to prevent it from being passed to DOM
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!visible) return null;

    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const progressSize = getProgressSize(size);
    const progressStyle = getProgressStyle(styling, variant);
    const progressShape = getProgressShape(shape);

    return (
      <div className='w-full'>
        <div
          ref={ref}
          className={cn(
            progressVariants({ size, style: styling, shape }),
            className
          )}
          data-progress-size={progressSize}
          data-progress-style={progressStyle}
          data-progress-shape={progressShape}
          role='progressbar'
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={ariaLabel || `Progress: ${Math.round(percentage)}%`}
          style={style}
          {...props}
        >
          {/* Progress track - matches devlink structure */}
          <div className='progress-track'>
            <div
              className='progress-indicator'
              style={{
                width: `${percentage}%`,
                transition: 'width 0.2s ease-in-out',
              }}
            />
          </div>
        </div>
        {showValue && (
          <div className='mt-2 text-sm text-muted-foreground text-right'>
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress, progressVariants };
