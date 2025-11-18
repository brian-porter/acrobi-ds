import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

/**
 * SwitchSqCtrl variant styles using authentic Acrobi classes
 * This matches the devlink SwitchSqCtrl component structure for square toggle switches
 */
const switchSqCtrlVariants = cva(
  // Base authentic Acrobi square toggle control class
  'togglesq-ctrl cursor-pointer',
  {
    variants: {
      variant: {
        default: '',
        compact: '',
        large: '',
      },
      state: {
        default: '',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
      state: 'default',
    },
  }
);

// Square toggle track styling
const toggleTrackSqVariants = cva(
  'toggletracksq relative w-12 h-6 bg-gray-300 rounded transition-colors duration-200',
  {
    variants: {
      checked: {
        true: 'bg-primary',
        false: 'bg-gray-300',
      },
      size: {
        sm: 'w-8 h-4',
        md: 'w-12 h-6',
        lg: 'w-16 h-8',
      },
    },
    defaultVariants: {
      checked: false,
      size: 'md',
    },
  }
);

// Square toggle drag handle styling
const toggleDragSqVariants = cva(
  'toggledragsq absolute top-0.5 left-0.5 bg-white shadow-md transition-transform duration-200',
  {
    variants: {
      checked: {
        true: '',
        false: '',
      },
      size: {
        sm: 'w-3 h-3 rounded-sm',
        md: 'w-5 h-5 rounded',
        lg: 'w-7 h-7 rounded-md',
      },
    },
    defaultVariants: {
      checked: false,
      size: 'md',
    },
  }
);

export interface SwitchSqCtrlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof switchSqCtrlVariants> {
  /**
   * Toggle ID for form integration
   */
  toglId?: string;
  /**
   * Toggle name for form integration
   */
  toglName?: string;
  /**
   * Toggle value for form integration
   */
  toglValue?: string | boolean;
  /**
   * Tab order for keyboard navigation
   */
  tabOrder?: number;
  /**
   * Change handler (devlink API)
   */
  onChange?: string | ((event: React.MouseEvent<HTMLDivElement>) => void);
  /**
   * Click handler for toggle interaction
   */
  toglClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Modern API - Checked state
   */
  checked?: boolean;
  /**
   * Modern API - Change handler
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Modern API - Default checked state
   */
  defaultChecked?: boolean;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Switch size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Show focus ring
   */
  showFocusRing?: boolean;
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  /**
   * ARIA labelledby for accessibility
   */
  'aria-labelledby'?: string;
  /**
   * ARIA describedby for accessibility
   */
  'aria-describedby'?: string;
}

/**
 * SwitchSqCtrl component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink SwitchSqCtrl component.
 *
 * Key features:
 * - Uses .togglesq-ctrl, .toggletracksq, .toggledragsq classes for authentic styling
 * - Square-shaped toggle design (unlike the rounded SwitchCtrl)
 * - Supports both devlink API (toglClick, onChange) and modern API (checked, onCheckedChange)
 * - Smooth toggle animations matching Webflow interactions
 * - Form integration via data attributes
 * - Keyboard navigation support
 * - Accessibility features with ARIA attributes
 *
 * @example
 * ```tsx
 * // Basic usage (devlink API)
 * <SwitchSqCtrl
 *   toglClick={(e) => console.log('Square toggle clicked')}
 * />
 *
 * // Modern API
 * <SwitchSqCtrl
 *   checked={isEnabled}
 *   onCheckedChange={setIsEnabled}
 *   aria-label="Enable square mode"
 *   size="lg"
 * />
 * ```
 */
const SwitchSqCtrl = React.forwardRef<HTMLDivElement, SwitchSqCtrlProps>(
  (
    {
      className,
      toglId,
      toglName,
      toglValue,
      tabOrder = 0,
      onChange = 'true',
      toglClick,
      // Modern API
      checked,
      onCheckedChange,
      defaultChecked = false,
      disabled = false,
      size = 'md',
      showFocusRing = true,
      variant = 'default',
      // Accessibility
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    ref
  ) => {
    // Determine if using modern API or devlink API
    const usingModernAPI =
      checked !== undefined || onCheckedChange !== undefined;

    // Internal state for controlled/uncontrolled behavior
    const [internalChecked, setInternalChecked] =
      React.useState(defaultChecked);

    const isChecked = usingModernAPI ? (checked ?? false) : internalChecked;

    // Handle toggle click
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;

      // Modern API handling
      if (usingModernAPI) {
        const newChecked = !checked;
        onCheckedChange?.(newChecked);
      } else {
        // Devlink API handling
        setInternalChecked(!internalChecked);
      }

      // Call devlink click handler
      toglClick?.(e);

      // Call devlink onChange if it's a function
      if (typeof onChange === 'function') {
        onChange(e);
      }
    };

    // Handle keyboard interaction
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleClick(e as any);
      }
    };

    // Calculate handle position based on size
    const getHandleTransform = () => {
      if (!isChecked) return 'translateX(0)';

      switch (size) {
        case 'sm':
          return 'translateX(16px)'; // 32px track - 12px handle - 4px padding = 16px
        case 'lg':
          return 'translateX(32px)'; // 64px track - 28px handle - 4px padding = 32px
        case 'md':
        default:
          return 'translateX(24px)'; // 48px track - 20px handle - 4px padding = 24px
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          switchSqCtrlVariants({
            variant,
            state: disabled ? 'disabled' : 'default',
          }),
          className
        )}
        tabIndex={disabled ? -1 : tabOrder}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role='switch'
        aria-checked={isChecked}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        data-togl-id={toglId}
        data-togl-value={toglValue}
        data-togl-name={toglName}
        {...props}
      >
        <div
          className={cn(
            toggleTrackSqVariants({ checked: isChecked, size }),
            showFocusRing &&
              'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2'
          )}
          data-w-id='square-toggle-track'
        >
          <div
            className={cn(toggleDragSqVariants({ checked: isChecked, size }))}
            style={{
              transform: getHandleTransform(),
            }}
          />
        </div>

        {/* Hidden input for form integration */}
        <input
          type='checkbox'
          name={toglName}
          value={toglValue?.toString()}
          checked={isChecked}
          onChange={() => {}} // Controlled by click handler
          className='sr-only'
          disabled={disabled}
          tabIndex={-1}
        />
      </div>
    );
  }
);

SwitchSqCtrl.displayName = 'SwitchSqCtrl';

export {
  SwitchSqCtrl,
  switchSqCtrlVariants,
  toggleTrackSqVariants,
  toggleDragSqVariants,
};
