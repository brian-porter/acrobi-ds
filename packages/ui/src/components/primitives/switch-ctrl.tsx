import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * SwitchCtrl variant styles using authentic Acrobi classes
 * This matches the devlink SwitchCtrl component structure for toggle switches
 */
const switchCtrlVariants = cva(
  // Base authentic Acrobi toggle control class
  'toggle-ctrl cursor-pointer',
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

// Toggle track styling
const toggleTrackVariants = cva(
  'toggletrack relative w-12 h-6 bg-gray-300 rounded-full transition-colors duration-200',
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

// Toggle drag handle styling
const toggleDragVariants = cva(
  'toggledrag absolute top-1 left-1 bg-white rounded-full shadow-md transition-transform duration-200',
  {
    variants: {
      checked: {
        true: '',
        false: '',
      },
      size: {
        sm: 'w-2 h-2',
        md: 'w-4 h-4',
        lg: 'w-6 h-6',
      },
    },
    defaultVariants: {
      checked: false,
      size: 'md',
    },
  }
);

export interface SwitchCtrlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof switchCtrlVariants> {
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
 * SwitchCtrl component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink SwitchCtrl component.
 *
 * Key features:
 * - Uses .toggle-ctrl, .toggletrack, .toggledrag classes for authentic styling
 * - Supports both devlink API (toglClick, onChange) and modern API (checked, onCheckedChange)
 * - Smooth toggle animations matching Webflow interactions
 * - Form integration via data attributes
 * - Keyboard navigation support
 * - Accessibility features with ARIA attributes
 *
 * @example
 * ```tsx
 * // Devlink API
 * <SwitchCtrl
 *   toglId="switch1"
 *   toglName="notifications"
 *   toglValue="enabled"
 *   toglClick={(e) => console.log('Toggle clicked')}
 * />
 *
 * // Modern API
 * <SwitchCtrl
 *   checked={isEnabled}
 *   onCheckedChange={setIsEnabled}
 *   aria-label="Enable notifications"
 *   size="lg"
 * />
 * ```
 */
const SwitchCtrl = React.forwardRef<HTMLDivElement, SwitchCtrlProps>(
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
          return 'translateX(16px)'; // 32px track - 8px handle - 4px padding = 20px, but 16px looks better
        case 'lg':
          return 'translateX(32px)'; // 64px track - 24px handle - 8px padding = 32px
        case 'md':
        default:
          return 'translateX(24px)'; // 48px track - 16px handle - 4px padding = 28px, but 24px matches devlink
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          switchCtrlVariants({
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
            toggleTrackVariants({ checked: isChecked, size }),
            showFocusRing &&
              'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2'
          )}
          data-w-id='toggle-track'
        >
          <div
            className={cn(toggleDragVariants({ checked: isChecked, size }))}
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

SwitchCtrl.displayName = 'SwitchCtrl';

export {
  SwitchCtrl,
  switchCtrlVariants,
  toggleTrackVariants,
  toggleDragVariants,
};
