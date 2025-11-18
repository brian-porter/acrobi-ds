import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
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
   * Warning threshold percentage (0-1) for character count
   * @default 0.8 (80%)
   */
  warningThreshold?: number;
  /**
   * Error threshold percentage (0-1) for character count
   * @default 1.0 (100%)
   */
  errorThreshold?: number;
  /**
   * Show visual feedback for character count status
   * @default true
   */
  showCounterFeedback?: boolean;
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
      warningThreshold = 0.8,
      errorThreshold = 1.0,
      showCounterFeedback = true,
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
    const isAtWarning = maxLength && currentLength >= maxLength * warningThreshold;
    const isAtError = maxLength && currentLength >= maxLength * errorThreshold;
    
    // Calculate character counter status for accessibility and styling
    const getCounterStatus = () => {
      if (!maxLength) return 'normal';
      if (isAtError) return 'error';
      if (isAtWarning) return 'warning';
      return 'normal';
    };
    
    const counterStatus = getCounterStatus();
    const hasCounterFeedback = showCount && maxLength && showCounterFeedback;

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

        {/* Enhanced Character Counter with Visual Feedback */}
        {showCount && maxLength && (
          <div className='character-count mt-1 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              {/* Visual feedback indicator */}
              {hasCounterFeedback && counterStatus !== 'normal' && (
                <div className='flex items-center gap-1'>
                  {counterStatus === 'warning' && (
                    <svg
                      className='h-3 w-3 text-amber-500'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                  {counterStatus === 'error' && (
                    <svg
                      className='h-3 w-3 text-red-500'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                  <span
                    className={cn(
                      'text-xs font-medium',
                      counterStatus === 'warning' && 'text-amber-600',
                      counterStatus === 'error' && 'text-red-600'
                    )}
                  >
                    {counterStatus === 'warning' && 'Approaching limit'}
                    {counterStatus === 'error' && 'Limit exceeded'}
                  </span>
                </div>
              )}
            </div>
            
            {/* Character count with ARIA live region */}
            <div className='text-right'>
              <span
                className={cn(
                  'text-xs',
                  counterStatus === 'normal' && 'text-muted-foreground',
                  counterStatus === 'warning' && 'text-amber-600 font-medium',
                  counterStatus === 'error' && 'text-red-600 font-medium'
                )}
                data-fs='r4'
                data-clr={
                  counterStatus === 'error'
                    ? 'fd500'
                    : counterStatus === 'warning'
                    ? 'fw500'
                    : 'n700'
                }
                aria-live='polite'
                aria-label={`${currentLength} of ${maxLength} characters used${counterStatus === 'error' ? ', limit exceeded' : counterStatus === 'warning' ? ', approaching limit' : ''}`}
              >
                {currentLength}/{maxLength}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
