import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Label } from './label';

/**
 * Textarea variant styles using Acrobi Design System data attributes
 * This matches the TextfieldCtrl component pattern with textarea class
 * where styling is controlled via data attributes that map to CSS selectors
 */
const textareaVariants = cva(
  // Base styles - minimal classes, let .textarea and data attributes handle styling
  'textarea w-full bg-background text-foreground min-h-[80px]',
  {
    variants: {
      // Border color variants mapped to data-field-brd
      borderColor: {
        default: '',
        danger: '',
        warning: '',
        success: '',
      },
      // Icon display variants mapped to data-field-icn
      iconDisplay: {
        none: '',
        left: '',
      },
      // Resize behavior
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      borderColor: 'default',
      iconDisplay: 'none',
      resize: 'vertical',
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  /**
   * Textarea component visibility toggle (fldTxt in Webflow)
   */
  visible?: boolean;
  /**
   * Show feedback toggle (fbk in Webflow)
   */
  showFeedback?: boolean;
  /**
   * Field border color (fldBrdClr in Webflow)
   */
  fieldBorderColor?: 'd' | 'w' | 's';
  /**
   * Field ID (fldId in Webflow)
   */
  fieldId?: string;
  /**
   * Input name (inpName in Webflow)
   */
  inputName?: string;
  /**
   * Placeholder source (fldPholdSrc in Webflow)
   */
  placeholderSrc?: string;
  /**
   * Auto complete attribute (autoComp in Webflow)
   */
  autoComplete?: string;
  /**
   * Tab order (tabOrder in Webflow)
   */
  tabOrder?: string;
  /**
   * Auto focus (autoFocus in Webflow)
   */
  autoFocus?: boolean;
  /**
   * Read only (readOnly in Webflow)
   */
  readOnly?: boolean;
  /**
   * Required field (required in Webflow)
   */
  required?: boolean;
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
   * Resize behavior
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  /**
   * Whether to show character count
   */
  showCount?: boolean;
  /**
   * Maximum character count
   */
  maxLength?: number;
  /**
   * @deprecated Use fieldBorderColor and showFeedback props instead
   */
  variant?: 'default' | 'error' | 'success';
  /**
   * @deprecated Size is handled by CSS classes
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * @deprecated Use feedbackTextSrc and showFeedback props instead
   */
  error?: string;
  /**
   * @deprecated Use feedbackTextSrc prop instead
   */
  helperText?: string;
}

// Map border color names to Acrobi data-field-brd values
const getFieldBorderColor = (
  borderColor: string | null | undefined,
  variant?: string | null | undefined
): string => {
  // Handle backward compatibility
  if (variant) {
    const variantMap: Record<string, string> = {
      error: 'd',
      success: 's',
      default: '',
    };
    return variantMap[variant] || '';
  }

  const borderMap: Record<string, string> = {
    d: 'd', // danger
    w: 'w', // warning
    s: 's', // success
  };
  return borderMap[borderColor || ''] || '';
};

// Map icon display to Acrobi data-field-icn values
const getFieldIconDisplay = (hasIcon: boolean): string => {
  return hasIcon ? 'l' : 'n';
};

/**
 * Textarea component using authentic Acrobi Design System styling
 *
 * This component uses data attributes that map directly to the CSS selectors
 * in the Acrobi design system, ensuring authentic styling that matches the
 * original devlink TextfieldCtrl component with textarea functionality.
 *
 * Key features:
 * - Uses data-field-brd for border color styling (d, w, s)
 * - Uses data-field-icn for icon padding adjustments
 * - Uses .textarea class for authentic styling
 * - Uses Label component for feedback text with proper styling
 * - Supports character counting and validation
 * - Maintains form structure with proper name/value attributes
 *
 * @example
 * ```tsx
 * <Textarea
 *   placeholderSrc="Enter your message..."
 *   fieldBorderColor="d"
 *   showFeedback={true}
 *   feedbackTextSrc="Please enter at least 10 characters"
 *   feedbackColor="fd500"
 *   maxLength={500}
 *   showCount={true}
 * />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      visible = true,
      showFeedback = false,
      fieldBorderColor,
      fieldId = 'textarea',
      inputName = 'field',
      placeholderSrc = 'Enter text...',
      autoComplete = 'off',
      tabOrder = '0',
      autoFocus = false,
      readOnly = false,
      required = false,
      feedbackText = true,
      feedbackIcon = false,
      feedbackTextSrc = 'Feedback here',
      feedbackIconSrc = 'check_circle',
      feedbackColor = 'fd500',
      resize = 'vertical',
      showCount = false,
      maxLength,
      disabled = false,
      value,
      onChange,
      // Deprecated props for backward compatibility
      variant,
      size,
      error,
      helperText,
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!visible) return null;

    const currentLength = typeof value === 'string' ? value.length : 0;

    // Handle backward compatibility
    const actualFieldBorderColor = getFieldBorderColor(
      fieldBorderColor,
      variant
    );
    const actualShowFeedback = error || helperText ? true : showFeedback;
    const actualFeedbackText = error || helperText || feedbackTextSrc;
    const actualFeedbackColor = variant === 'error' ? 'fd500' : feedbackColor;
    const fieldIconDisplay = getFieldIconDisplay(false); // textarea typically doesn't have icons

    return (
      <div className='textfield_wrap w-full'>
        <div className='textfield_main'>
          <textarea
            ref={ref}
            className={cn(textareaVariants({ resize }), className)}
            autoFocus={autoFocus}
            maxLength={maxLength}
            name={inputName}
            disabled={disabled}
            required={required}
            tabIndex={parseInt(tabOrder) || 0}
            data-field-icn={fieldIconDisplay}
            data-field-brd={actualFieldBorderColor}
            onChange={onChange}
            autoComplete={autoComplete}
            readOnly={readOnly}
            placeholder={placeholderSrc}
            id={fieldId}
            value={value}
            {...props}
          />

          {actualShowFeedback && (
            <div className='feedback-txt'>
              <Label
                text={actualFeedbackText}
                showText={feedbackText}
                icon={feedbackIconSrc}
                color={actualFeedbackColor}
                showIcon={feedbackIcon}
                iconLocation='r'
                size='r3'
              />
            </div>
          )}
        </div>

        {/* Character count */}
        {showCount && maxLength && (
          <div className='character-count mt-1 text-right'>
            <span
              className={cn(
                'text-xs',
                currentLength > maxLength
                  ? 'text-destructive'
                  : 'text-muted-foreground'
              )}
              data-fs='r4'
              data-clr={currentLength > maxLength ? 'fd500' : 'n700'}
            >
              {currentLength}/{maxLength}
            </span>
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
