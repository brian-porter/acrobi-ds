import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Label } from './label';

/**
 * Checkbox variant styles using Acrobi Design System data attributes
 * This matches the devlink CboxCtrl component pattern where styling
 * is controlled via data attributes that map to CSS selectors
 */
const checkboxVariants = cva(
  // Base styles - minimal classes, let .itm_ctrl class handle most styling
  'itm_ctrl inline-flex items-center',
  {
    variants: {
      // These map to data-input-align values in Acrobi CSS
      align: {
        l: '', // left aligned (default)
        c: '', // center aligned
        r: '', // right aligned
      },
    },
    defaultVariants: {
      align: 'l',
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxVariants> {
  /**
   * Checkbox component visibility toggle (comp in Webflow)
   */
  visible?: boolean;
  /**
   * Text label visibility toggle (txt in Webflow)
   */
  showText?: boolean;
  /**
   * Link visibility toggle (link in Webflow)
   */
  showLink?: boolean;
  /**
   * Feedback visibility toggle (fbk in Webflow)
   */
  showFeedback?: boolean;
  /**
   * Checkbox ID (id in Webflow)
   */
  checkboxId?: string;
  /**
   * Item name attribute (itmName in Webflow)
   */
  itemName?: string;
  /**
   * Item value attribute (itmValue in Webflow)
   */
  itemValue?: string;
  /**
   * Item active state (itmActive in Webflow)
   */
  itemActive?: boolean;
  /**
   * Item label source text (itmLblSrc in Webflow)
   */
  itemLabelText?: string;
  /**
   * Item label size (itmLblSz in Webflow)
   */
  itemLabelSize?:
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
   * Label for attribute (lblFor in Webflow)
   */
  labelFor?: string;
  /**
   * Input alignment (align in Webflow)
   */
  align?: 'l' | 'c' | 'r';
  /**
   * Tab order (tabOrder in Webflow)
   */
  tabOrder?: string;
  /**
   * Link text source (linkTxtSrc in Webflow)
   */
  linkText?: string;
  /**
   * Link href (linkSrc in Webflow)
   */
  linkHref?: string;
  /**
   * Feedback text visibility (fbkFbkTxt in Webflow)
   */
  feedbackText?: boolean;
  /**
   * Feedback icon visibility (fbkFbkIcn in Webflow)
   */
  feedbackIcon?: boolean;
  /**
   * Feedback text source (fbkFbkTxtSrc in Webflow)
   */
  feedbackTextSrc?: string;
  /**
   * Feedback icon source (fbkFbkIcnSrc in Webflow)
   */
  feedbackIconSrc?: string;
  /**
   * Feedback color (fbkFbkClr in Webflow)
   */
  feedbackColor?: 'fd500' | 'fw500' | 'f500' | 'p500' | 'n500';
  /**
   * Feedback icon location (fbkFbkIcnLoc in Webflow)
   */
  feedbackIconLocation?: 'l' | 'r';
  /**
   * Label shadow (lblShdw in Webflow)
   */
  labelShadow?: string;
  /**
   * Link shadow (linkShdw in Webflow)
   */
  linkShadow?: string;
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;
  /**
   * Callback when checkbox state changes
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Whether the checkbox is indeterminate
   */
  indeterminate?: boolean;
  /**
   * @deprecated Use itemLabelText prop instead
   */
  label?: string;
  /**
   * @deprecated Use feedbackTextSrc prop instead
   */
  description?: string;
  /**
   * @deprecated Use feedbackTextSrc and showFeedback props instead
   */
  error?: string;
  /**
   * @deprecated Use itemLabelSize prop instead
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * @deprecated Use feedbackColor and showFeedback props instead
   */
  variant?: 'default' | 'error';
}

// Map alignment names to Acrobi data-input-align values
const getCheckboxAlign = (align: string | null | undefined): string => {
  const alignMap: Record<string, string> = {
    l: 'l',
    c: 'c',
    r: 'r',
  };
  return alignMap[align || 'l'] || 'l';
};

// Map size names to Acrobi label size values for backward compatibility
const getLabelSizeFromSize = (
  size: string | null | undefined
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
  const sizeMap: Record<
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
    sm: 'r4',
    md: 'r3',
    lg: 'r2',
  };
  return sizeMap[size || 'md'] || 'r3';
};

/**
 * Checkbox component using authentic Acrobi Design System styling
 *
 * This component uses data attributes that map directly to the CSS selectors
 * in the Acrobi design system, ensuring authentic styling that matches the
 * original devlink CboxCtrl component.
 *
 * Key features:
 * - Uses data-input-align for alignment (l, c, r)
 * - Uses authentic checkbox styling with .cbox class
 * - Uses .cbox-label class for label styling with data-lbl-size
 * - Supports link and feedback components through Label integration
 * - Maintains form input structure with proper name/value attributes
 *
 * @example
 * ```tsx
 * <Checkbox
 *   itemLabelText="Accept terms and conditions"
 *   itemActive={true}
 *   itemName="terms"
 *   itemValue="accepted"
 *   align="l"
 * />
 *
 * <Checkbox
 *   itemLabelText="Required field"
 *   showFeedback={true}
 *   feedbackTextSrc="This field is required"
 *   feedbackColor="fd500"
 * />
 * ```
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      visible = true,
      showText = true,
      showLink = false,
      showFeedback = false,
      checkboxId = 'cbox',
      itemName,
      itemValue,
      itemActive = false,
      itemLabelText = 'Label',
      itemLabelSize = 'r3',
      labelFor,
      align = 'l',
      tabOrder = '0',
      linkText = 'Link here',
      linkHref = '#',
      feedbackText = true,
      feedbackIcon = true,
      feedbackTextSrc = 'Feedback message',
      feedbackIconSrc = 'clearcirc',
      feedbackColor = 'fd500',
      feedbackIconLocation = 'r',
      labelShadow,
      linkShadow,
      checked = false,
      onCheckedChange,
      onChange,
      indeterminate = false,
      disabled,
      // Deprecated props for backward compatibility
      label,
      description,
      error,
      size,
      variant,
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!visible) return null;

    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!, []);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(event.target.checked);
      onChange?.(event);
    };

    // Handle backward compatibility
    const actualLabelText = label || itemLabelText;
    const actualChecked = checked || itemActive;
    const actualLabelSize = size ? getLabelSizeFromSize(size) : itemLabelSize;
    const actualShowFeedback = error || description ? true : showFeedback;
    const actualFeedbackText = error || description || feedbackTextSrc;
    const actualFeedbackColor = variant === 'error' ? 'fd500' : feedbackColor;
    const checkboxAlign = getCheckboxAlign(align);

    return (
      <div
        className={cn(checkboxVariants({ align }), className)}
        data-input-align={checkboxAlign}
      >
        <input
          type='checkbox'
          ref={inputRef}
          className='cbox'
          required={false}
          checked={actualChecked}
          tabIndex={parseInt(tabOrder) || 0}
          name={itemName}
          value={itemValue}
          onChange={handleChange}
          disabled={disabled}
          id={checkboxId}
          data-state={actualChecked ? 'checked' : 'unchecked'}
          {...props}
        />

        {showText && (
          <label
            className='cbox-label'
            data-lbl-size={actualLabelSize}
            data-ts={labelShadow}
            htmlFor={labelFor || checkboxId}
          >
            {actualLabelText}
          </label>
        )}

        {showLink && (
          <a href={linkHref} className='cbox-link'>
            <Label
              text={linkText}
              textShadow={linkShadow}
              size='r3'
              showIcon={false}
              iconLocation='r'
            />
          </a>
        )}

        {actualShowFeedback && (
          <div className='itm_fbk'>
            <Label
              color={actualFeedbackColor}
              icon={feedbackIconSrc}
              text={actualFeedbackText}
              showText={feedbackText}
              showIcon={feedbackIcon}
              iconLocation={feedbackIconLocation}
              size='r3'
            />
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };
