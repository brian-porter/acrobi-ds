import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Icon } from './icon';
import { Label } from './label';

/**
 * TextfieldCtrl variant styles using authentic Acrobi classes
 * This matches the devlink TextfieldCtrl component structure
 */
const textfieldCtrlVariants = cva(
  // Base authentic Acrobi textfield wrapper class
  'textfield_wrap',
  {
    variants: {
      variant: {
        default: '',
        error: '',
        success: '',
        warning: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Textfield main container styling
const textfieldMainVariants = cva('textfield_main', {
  variants: {
    hasIcon: {
      true: '',
      false: '',
    },
    hasButton: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    hasIcon: false,
    hasButton: false,
  },
});

// Text input styling
const textInputVariants = cva('text-input', {
  variants: {
    variant: {
      default: '',
      error: '',
      success: '',
      warning: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface TextfieldCtrlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof textfieldCtrlVariants> {
  /**
   * Show textfield component
   */
  fldTxt?: boolean;
  /**
   * Show field icon
   */
  fldIcn?: boolean;
  /**
   * Show field button
   */
  fldBtn?: boolean;
  /**
   * Show feedback
   */
  fbk?: boolean;
  /**
   * Field icon source
   */
  fldIcnSrc?: string;
  /**
   * Field icon display mode
   */
  fldIcnDisp?: 'n' | 'y';
  /**
   * Field border color
   */
  fldBrdClr?: string;
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
  fbkFbkClr?: 'fd500' | 'fw500' | 'f500' | 'p500' | 'n500' | 'fs500';
  /**
   * Field placeholder source
   */
  fldPholdSrc?: string;
  /**
   * Field placeholder source X (alternative)
   */
  fldPholdSrcX?: string;
  /**
   * Field button icon source
   */
  fldBtnIcnSrc?: string;
  /**
   * Field button icon alt text
   */
  fldBtnIcnAlt?: string;
  /**
   * Auto complete attribute
   */
  autoComp?: string;
  /**
   * Tab order
   */
  tabOrder?: string | number;
  /**
   * Auto focus
   */
  autoFocus?: boolean;
  /**
   * Read only state
   */
  readOnly?: boolean;
  /**
   * Field ID
   */
  fldId?: string;
  /**
   * On change handler
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Field button click handler
   */
  fldBtnClick?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * Field click handler
   */
  fldClick?: React.HTMLAttributes<HTMLInputElement>;
  /**
   * Input name
   */
  inpName?: string;
  /**
   * Input type
   */
  inpType?: string;
  /**
   * Required field
   */
  required?: boolean;
  /**
   * Input value
   */
  value?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Component variant
   */
  variant?: 'default' | 'error' | 'success' | 'warning';
}

/**
 * TextfieldCtrl component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink TextfieldCtrl component.
 *
 * Key features:
 * - Uses .textfield_wrap and .textfield_main classes for authentic styling
 * - Uses .text-input class for input field styling
 * - Supports field icons, buttons, and feedback messages
 * - Integrates with existing Icon and Label components
 * - Supports all standard input attributes and form integration
 *
 * @example
 * ```tsx
 * // Basic textfield
 * <TextfieldCtrl
 *   fldPholdSrc="Enter your email"
 *   inpType="email"
 *   inpName="email"
 * />
 *
 * // With icon and feedback
 * <TextfieldCtrl
 *   fldIcn={true}
 *   fldIcnSrc="search"
 *   fldPholdSrc="Search..."
 *   fbk={true}
 *   fbkFbkTxtSrc="Enter search terms"
 * />
 *
 * // With button
 * <TextfieldCtrl
 *   fldBtn={true}
 *   fldBtnIcnSrc="mic"
 *   fldBtnIcnAlt="Voice input"
 *   fldPholdSrc="Speak or type..."
 * />
 * ```
 */
const TextfieldCtrl = React.forwardRef<HTMLInputElement, TextfieldCtrlProps>(
  (
    {
      className,
      fldTxt = true,
      fldIcn = false,
      fldBtn = false,
      fbk = false,
      fldIcnSrc = 'Search',
      fldIcnDisp = 'n',
      fldBrdClr,
      fbkFbkTxt = true,
      fbkFbkIcn = false,
      fbkFbkTxtSrc = 'Feedback here',
      fbkFbkIcnSrc = 'check_circle',
      fbkFbkClr = 'fd500',
      fldPholdSrc = 'Placeholder',
      fldPholdSrcX = 'PlaceholderX',
      fldBtnIcnSrc = 'mic',
      fldBtnIcnAlt = 'Microphone',
      autoComp = 'off',
      tabOrder,
      autoFocus,
      readOnly,
      fldId,
      onChange,
      fldBtnClick = {},
      fldClick = {},
      inpName,
      inpType,
      required,
      value,
      disabled = false,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!, []);

    // Don't render if not visible
    if (!fldTxt) return null;

    return (
      <div
        className={cn(textfieldCtrlVariants({ variant }), className)}
        {...props}
      >
        <div
          className={cn(
            textfieldMainVariants({
              hasIcon: fldIcn,
              hasButton: fldBtn,
            })
          )}
        >
          {/* Field Icon */}
          {fldIcn && (
            <div className='field-icon'>
              <Icon icon={fldIcnSrc} color='n500' />
            </div>
          )}

          {/* Text Input */}
          <input
            ref={inputRef}
            className={cn(textInputVariants({ variant }))}
            autoFocus={autoFocus || false}
            maxLength={256}
            name={inpName || 'field'}
            type={inpType || 'text'}
            disabled={disabled}
            required={required || false}
            placeholder={fldPholdSrcX || fldPholdSrc}
            tabIndex={
              typeof tabOrder === 'string' ? parseInt(tabOrder) : tabOrder
            }
            data-field-icn={fldIcnDisp}
            data-field-brd={fldBrdClr}
            onChange={onChange}
            autoComplete={autoComp}
            readOnly={readOnly}
            value={value}
            data-placeholder={fldPholdSrc}
            id={fldId}
            {...fldClick}
          />

          {/* Feedback Message */}
          {fbk && (
            <div className='feedback-txt'>
              <Label
                text={fbkFbkTxtSrc}
                showText={fbkFbkTxt}
                icon={fbkFbkIcnSrc}
                color={fbkFbkClr}
                showIcon={fbkFbkIcn}
                iconLocation='r'
                size='r3'
              />
            </div>
          )}

          {/* Field Button */}
          {fldBtn && (
            <nav className='field_btn_wrap'>
              <div className='field_btn_main' {...fldBtnClick}>
                <Label
                  text={fldBtnIcnAlt}
                  icon={fldBtnIcnSrc}
                  iconLocation='r'
                  showText={false}
                  showIcon={true}
                />
              </div>
            </nav>
          )}
        </div>
      </div>
    );
  }
);

TextfieldCtrl.displayName = 'TextfieldCtrl';

export {
  TextfieldCtrl,
  textfieldCtrlVariants,
  textfieldMainVariants,
  textInputVariants,
};
