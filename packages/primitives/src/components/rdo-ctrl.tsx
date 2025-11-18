import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Label } from './label';

/**
 * RdoCtrl variant styles using authentic Acrobi classes
 * This matches the devlink RdoCtrl component structure for individual radio buttons
 */
const rdoCtrlVariants = cva(
  // Base authentic Acrobi radio control class
  'rdo_ctrl',
  {
    variants: {
      variant: {
        default: '',
        compact: '',
        large: '',
      },
      alignment: {
        left: '',
        right: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      alignment: 'left',
    },
  }
);

// Radio input styling
const rdoVariants = cva('rdo sr-only', {
  variants: {
    state: {
      default: '',
      checked: '',
      disabled: '',
      error: '',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

// Radio label styling
const radioLabelVariants = cva('label cursor-pointer flex items-center gap-2', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
  },
});

// Custom radio visual styling
const radioVisualVariants = cva(
  'relative inline-flex items-center justify-center w-4 h-4 border-2 rounded-full transition-colors',
  {
    variants: {
      checked: {
        true: 'bg-primary border-primary',
        false: 'bg-background border-input',
      },
      disabled: {
        true: 'opacity-50',
        false: '',
      },
      error: {
        true: 'border-destructive',
        false: '',
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
      error: false,
    },
  }
);

export interface RdoCtrlProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof rdoCtrlVariants> {
  /**
   * Show feedback
   */
  fbk?: boolean;
  /**
   * Radio ID
   */
  id?: string;
  /**
   * Item name for form integration
   */
  itmName?: string;
  /**
   * Item value for form integration
   */
  itmValue?: string;
  /**
   * Item label source text
   */
  itmLblSrc?: string;
  /**
   * Item label size
   */
  itmLblSz?: 'r1' | 'r2' | 'r3' | 'r4';
  /**
   * Alignment (l = left, r = right)
   */
  align?: 'l' | 'r';
  /**
   * Tab order
   */
  tabOrder?: string | number;
  /**
   * Feedback text visibility
   */
  fbkFbkTxt?: boolean;
  /**
   * Feedback icon visibility
   */
  fbkFbkIcn?: boolean;
  /**
   * Feedback text source
   */
  fbkFbkTxtSrc?: string;
  /**
   * Feedback icon source
   */
  fbkFbkIcnSrc?: string;
  /**
   * Feedback color
   */
  fbkFbkClr?: 'fd500' | 'fw500' | 'f500' | 'p500' | 'n500';
  /**
   * Feedback icon location
   */
  fbkFbkIcnLoc?: 'l' | 'r';
  /**
   * Item click handler
   */
  itmClick?: React.MouseEventHandler<HTMLDivElement>;
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
   * Error state
   */
  error?: boolean;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Radio size
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * RadioDot component for checked state
 */
const RadioDot: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('w-2 h-2 bg-white rounded-full', className)} />
);

/**
 * RdoCtrl component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink RdoCtrl component.
 *
 * Key features:
 * - Uses .rdo_ctrl, .rdo, .label classes for authentic styling
 * - Supports both devlink API (itmClick, onChange) and modern API (checked, onCheckedChange)
 * - Optional feedback element with icon and text
 * - Form integration via name, value, and change handlers
 * - Flexible alignment and sizing options
 * - Accessibility features with proper labeling
 *
 * @example
 * ```tsx
 * // Devlink API
 * <RdoCtrl
 *   id="option1"
 *   itmName="choice"
 *   itmValue="option1"
 *   itmLblSrc="Option 1"
 *   itmClick={(e) => console.log('Radio clicked')}
 * />
 *
 * // Modern API
 * <RdoCtrl
 *   checked={selectedValue === 'option1'}
 *   onCheckedChange={(checked) => checked && setSelectedValue('option1')}
 *   itmLblSrc="Option 1"
 *   name="choice"
 *   value="option1"
 * />
 * ```
 */
const RdoCtrl = React.forwardRef<HTMLInputElement, RdoCtrlProps>(
  (
    {
      className,
      fbk = false,
      id,
      itmName,
      itmValue,
      itmLblSrc = 'Label',
      itmLblSz = 'r3',
      align = 'l',
      tabOrder,
      fbkFbkTxt = true,
      fbkFbkIcn = true,
      fbkFbkTxtSrc = 'Feedback message',
      fbkFbkIcnSrc = 'clearcirc',
      fbkFbkClr = 'fd500',
      fbkFbkIcnLoc = 'r',
      itmClick,
      // Modern API
      checked,
      onCheckedChange,
      defaultChecked = false,
      disabled = false,
      error = false,
      helperText,
      size = 'md',
      variant = 'default',
      onChange,
      name = itmName,
      value = itmValue,
      ...props
    },
    ref
  ) => {
    // Determine if using modern API or devlink API
    const usingModernAPI =
      checked !== undefined || onCheckedChange !== undefined;

    // Internal state for uncontrolled behavior
    const [internalChecked, setInternalChecked] =
      React.useState(defaultChecked);

    const isChecked = usingModernAPI ? (checked ?? false) : internalChecked;

    // Handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const newChecked = e.target.checked;

      if (usingModernAPI) {
        onCheckedChange?.(newChecked);
      } else {
        setInternalChecked(newChecked);
      }

      onChange?.(e);
    };

    // Handle container click
    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      itmClick?.(e);
    };

    return (
      <div
        className={cn(
          rdoCtrlVariants({
            variant,
            alignment: align === 'r' ? 'right' : 'left',
          }),
          className
        )}
        data-input-align={align}
        onClick={handleContainerClick}
      >
        {/* Hidden radio input for form integration */}
        <input
          ref={ref}
          type='radio'
          className={cn(rdoVariants())}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          required={props.required}
          tabIndex={
            typeof tabOrder === 'string' ? parseInt(tabOrder) : tabOrder
          }
          name={name}
          value={value}
          id={id}
          {...props}
        />

        {/* Visual radio and label */}
        <label
          className={cn(
            radioLabelVariants({ size: itmLblSz as any, disabled })
          )}
          htmlFor={id}
          data-lbl-size={itmLblSz}
        >
          {/* Custom radio visual */}
          <div
            className={cn(
              radioVisualVariants({
                checked: isChecked,
                disabled,
                error: error || fbkFbkClr === 'fd500',
              })
            )}
          >
            {isChecked && <RadioDot />}
          </div>

          {/* Label text */}
          <span className='select-none'>{itmLblSrc}</span>
        </label>

        {/* Feedback */}
        {fbk && (
          <div className='itm_fbk mt-1'>
            <Label
              text={fbkFbkTxtSrc}
              showText={fbkFbkTxt}
              icon={fbkFbkIcnSrc}
              showIcon={fbkFbkIcn}
              iconLocation={fbkFbkIcnLoc === 'r' ? 'r' : 'l'}
              color={fbkFbkClr}
              size='r3'
            />
          </div>
        )}

        {/* Modern API helper text */}
        {helperText && !fbk && (
          <div className='mt-1 text-sm text-muted-foreground'>{helperText}</div>
        )}
      </div>
    );
  }
);

RdoCtrl.displayName = 'RdoCtrl';

export {
  RdoCtrl,
  rdoCtrlVariants,
  rdoVariants,
  radioLabelVariants,
  radioVisualVariants,
};
