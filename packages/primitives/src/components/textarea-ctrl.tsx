import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Label } from './label';

/**
 * TextareaCtrl variant styles using authentic Acrobi classes
 * This matches the devlink TextareaCtrl component structure
 */
const textareaCtrlVariants = cva(
  // Base authentic Acrobi textarea wrapper class
  'textarea_wrap',
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

// Textarea main container styling
const textareaMainVariants = cva('textarea_main', {
  variants: {
    hasFeedback: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    hasFeedback: false,
  },
});

// Textarea element styling
const textareaVariants = cva('textarea', {
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

export interface TextareaCtrlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof textareaCtrlVariants> {
  /**
   * Show feedback
   */
  fbk?: boolean;
  /**
   * Field ID
   */
  fldId?: string;
  /**
   * Field name
   */
  fldName?: string;
  /**
   * Field placeholder source
   */
  fldPholdSrc?: string;
  /**
   * Field border color
   */
  fldBrdClr?: string;
  /**
   * Field height
   */
  fldHeight?: string | number;
  /**
   * Feedback icon visibility
   */
  fbkFbkIcn?: boolean;
  /**
   * Feedback text visibility
   */
  fbkFbkTxt?: boolean;
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
   * Tab order
   */
  tabOrder?: string | number;
  /**
   * On change handler
   */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  /**
   * Field click handler
   */
  fldClick?: React.HTMLAttributes<HTMLTextAreaElement>;
  /**
   * Textarea value
   */
  value?: string;
  /**
   * Default value
   */
  defaultValue?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Required field
   */
  required?: boolean;
  /**
   * Read only state
   */
  readOnly?: boolean;
  /**
   * Auto focus
   */
  autoFocus?: boolean;
  /**
   * Max length
   */
  maxLength?: number;
  /**
   * Rows
   */
  rows?: number;
  /**
   * Columns
   */
  cols?: number;
  /**
   * Component variant
   */
  variant?: 'default' | 'error' | 'success' | 'warning';
}

/**
 * TextareaCtrl component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink TextareaCtrl component.
 *
 * Key features:
 * - Uses .textarea_wrap and .textarea_main classes for authentic styling
 * - Uses .textarea class for textarea element styling
 * - Supports feedback messages with Label integration
 * - Supports custom height, border colors, and all standard textarea attributes
 * - Integrates with form systems via name and value props
 *
 * @example
 * ```tsx
 * // Basic textarea
 * <TextareaCtrl
 *   fldPholdSrc="Enter your message..."
 *   fldName="message"
 *   rows={4}
 * />
 *
 * // With feedback
 * <TextareaCtrl
 *   fldPholdSrc="Describe your issue..."
 *   fbk={true}
 *   fbkFbkTxtSrc="Please provide as much detail as possible"
 *   fbkFbkClr="n500"
 * />
 *
 * // With custom height and validation
 * <TextareaCtrl
 *   fldPholdSrc="Comments (required)"
 *   fldHeight="200px"
 *   required={true}
 *   maxLength={500}
 *   fbk={true}
 *   fbkFbkTxtSrc="This field is required"
 *   fbkFbkClr="fd500"
 *   variant="error"
 * />
 * ```
 */
const TextareaCtrl = React.forwardRef<HTMLTextAreaElement, TextareaCtrlProps>(
  (
    {
      className,
      fbk = false,
      fldId,
      fldName,
      fldPholdSrc = 'Placeholder',
      fldBrdClr,
      fldHeight,
      fbkFbkIcn = false,
      fbkFbkTxt = true,
      fbkFbkTxtSrc = 'Feedback text',
      fbkFbkIcnSrc = 'act_check_circle',
      fbkFbkClr = 'fd500',
      tabOrder,
      onChange,
      fldClick = {},
      value,
      defaultValue,
      disabled = false,
      required = false,
      readOnly = false,
      autoFocus = false,
      maxLength = 5000,
      rows,
      cols,
      variant = 'default',
      style,
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useImperativeHandle(ref, () => textareaRef.current!, []);

    // Combine styles for height
    const combinedStyle = {
      ...style,
      ...(fldHeight && {
        height: typeof fldHeight === 'number' ? `${fldHeight}px` : fldHeight,
      }),
    };

    return (
      <div
        className={cn(textareaCtrlVariants({ variant }), className)}
        tabIndex={typeof tabOrder === 'string' ? parseInt(tabOrder) : tabOrder}
        id={fldId}
        style={combinedStyle}
        {...props}
      >
        <div
          className={cn(
            textareaMainVariants({
              hasFeedback: fbk,
            })
          )}
        >
          {/* Textarea Element */}
          <textarea
            ref={textareaRef}
            className={cn(textareaVariants({ variant }))}
            name={fldName || 'field'}
            maxLength={maxLength}
            required={required}
            autoFocus={autoFocus}
            data-field-brd={fldBrdClr}
            onChange={onChange}
            placeholder={fldPholdSrc}
            id={fldId || 'field'}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            rows={rows}
            cols={cols}
            {...fldClick}
          />

          {/* Feedback Message */}
          {fbk && (
            <div className='feedback-txtarea'>
              <Label
                color={fbkFbkClr}
                showIcon={fbkFbkIcn}
                showText={fbkFbkTxt}
                text={fbkFbkTxtSrc}
                icon={fbkFbkIcnSrc}
                iconLocation='r'
                size='r3'
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

TextareaCtrl.displayName = 'TextareaCtrl';

export {
  TextareaCtrl,
  textareaCtrlVariants,
  textareaMainVariants,
  textareaVariants,
};
