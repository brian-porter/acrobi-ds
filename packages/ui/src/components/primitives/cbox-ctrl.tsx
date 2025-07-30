import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Label } from './label';

/**
 * CboxCtrl variant styles using authentic Acrobi classes
 * This matches the devlink CboxCtrl component structure for individual checkboxes
 */
const cboxCtrlVariants = cva(
  // Base authentic Acrobi item control class
  'itm_ctrl',
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

// Checkbox input styling
const cboxVariants = cva('cbox sr-only', {
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

// Checkbox label styling
const cboxLabelVariants = cva(
  'cbox-label cursor-pointer flex items-center gap-2',
  {
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
  }
);

// Custom checkbox visual styling
const checkboxVisualVariants = cva(
  'relative inline-flex items-center justify-center w-4 h-4 border-2 rounded transition-colors',
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

export interface CboxCtrlProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof cboxCtrlVariants> {
  /**
   * Show component
   */
  comp?: boolean;
  /**
   * Show text label
   */
  txt?: boolean;
  /**
   * Show link element
   */
  link?: boolean;
  /**
   * Show feedback
   */
  fbk?: boolean;
  /**
   * Checkbox ID
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
   * Item active state (devlink API)
   */
  itmActive?: string | boolean;
  /**
   * Item label source text
   */
  itmLblSrc?: string;
  /**
   * Item label size
   */
  itmLblSz?: 'r1' | 'r2' | 'r3' | 'r4';
  /**
   * Label for attribute
   */
  lblFor?: string;
  /**
   * Item click handler
   */
  itmClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Alignment (l = left, r = right)
   */
  align?: 'l' | 'r';
  /**
   * Tab order
   */
  tabOrder?: string | number;
  /**
   * Link text source
   */
  linkTxtSrc?: string;
  /**
   * Link href and options
   */
  linkSrc?: {
    href: string;
    target?: string;
    rel?: string;
  };
  /**
   * Link click handler
   */
  linkClick?: React.MouseEventHandler<HTMLAnchorElement>;
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
   * Label shadow
   */
  lblShdw?: string;
  /**
   * Link shadow
   */
  linkShdw?: string;
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
   * Checkbox size
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * CheckIcon component for checked state
 */
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn('w-3 h-3 text-white', className)}
    fill='currentColor'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
      clipRule='evenodd'
    />
  </svg>
);

/**
 * CboxCtrl component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink CboxCtrl component.
 *
 * Key features:
 * - Uses .itm_ctrl, .cbox, .cbox-label classes for authentic styling
 * - Supports both devlink API (itmActive, itmClick) and modern API (checked, onCheckedChange)
 * - Optional label, link, and feedback elements
 * - Form integration via name, value, and change handlers
 * - Flexible alignment and sizing options
 * - Accessibility features with proper labeling
 *
 * @example
 * ```tsx
 * // Devlink API
 * <CboxCtrl
 *   id="agree"
 *   itmName="agreement"
 *   itmValue="agreed"
 *   itmLblSrc="I agree to the terms"
 *   itmActive="False"
 *   itmClick={(e) => console.log('Checkbox clicked')}
 * />
 *
 * // Modern API
 * <CboxCtrl
 *   checked={isAgreed}
 *   onCheckedChange={setIsAgreed}
 *   itmLblSrc="I agree to the terms"
 *   link={true}
 *   linkTxtSrc="Read terms"
 *   linkSrc={{ href: "/terms" }}
 * />
 * ```
 */
const CboxCtrl = React.forwardRef<HTMLInputElement, CboxCtrlProps>(
  (
    {
      className,
      comp = true,
      txt = true,
      link = false,
      fbk = false,
      id = 'cbox',
      itmName,
      itmValue,
      itmActive = 'False',
      itmLblSrc = 'Label',
      itmLblSz = 'r3',
      lblFor,
      itmClick,
      align = 'l',
      tabOrder = '0',
      linkTxtSrc = 'Link here',
      linkSrc = { href: '#' },
      linkClick,
      fbkFbkTxt = true,
      fbkFbkIcn = true,
      fbkFbkTxtSrc = 'Feedback message',
      fbkFbkIcnSrc = 'clearcirc',
      fbkFbkClr = 'fd500',
      fbkFbkIcnLoc = 'r',
      lblShdw,
      linkShdw,
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
      ...props
    },
    ref
  ) => {
    // Don't render if comp is false
    if (!comp) return null;

    // Determine if using modern API or devlink API
    const usingModernAPI =
      checked !== undefined || onCheckedChange !== undefined;

    // Convert devlink itmActive to boolean
    const devlinkChecked =
      typeof itmActive === 'string'
        ? itmActive.toLowerCase() === 'true'
        : Boolean(itmActive);

    // Internal state for uncontrolled behavior
    const [internalChecked, setInternalChecked] = React.useState(
      usingModernAPI ? (checked ?? defaultChecked) : devlinkChecked
    );

    const isChecked = usingModernAPI ? (checked ?? false) : internalChecked;
    const actualLblFor = lblFor || id;

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
          cboxCtrlVariants({
            variant,
            alignment: align === 'r' ? 'right' : 'left',
          }),
          className
        )}
        data-input-align={align}
        onClick={handleContainerClick}
      >
        {/* Hidden checkbox input for form integration */}
        <input
          ref={ref}
          type='checkbox'
          className={cn(cboxVariants())}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          required={props.required}
          tabIndex={
            typeof tabOrder === 'string' ? parseInt(tabOrder) : tabOrder
          }
          name={itmName}
          value={itmValue}
          id={id}
          {...props}
        />

        {/* Visual checkbox and label */}
        <label
          className={cn(cboxLabelVariants({ size: itmLblSz as any, disabled }))}
          htmlFor={actualLblFor}
          data-lbl-size={itmLblSz}
          data-ts={lblShdw}
        >
          {/* Custom checkbox visual */}
          <div
            className={cn(
              checkboxVisualVariants({
                checked: isChecked,
                disabled,
                error: error || fbkFbkClr === 'fd500',
              })
            )}
          >
            {isChecked && <CheckIcon />}
          </div>

          {/* Label text */}
          {txt && <span className='select-none'>{itmLblSrc}</span>}
        </label>

        {/* Optional link */}
        {link && (
          <a
            href={linkSrc.href}
            target={linkSrc.target}
            rel={linkSrc.rel}
            className='cbox-link inline-block ml-2'
            onClick={linkClick}
          >
            <Label
              text={linkTxtSrc}
              size='r3'
              showIcon={false}
              className='text-primary hover:text-primary-foreground'
            />
          </a>
        )}

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

CboxCtrl.displayName = 'CboxCtrl';

export {
  CboxCtrl,
  cboxCtrlVariants,
  cboxVariants,
  cboxLabelVariants,
  checkboxVisualVariants,
};
