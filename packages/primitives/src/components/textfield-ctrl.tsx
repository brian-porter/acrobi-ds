import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
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
  
  // PRD v12 Enhanced Validation Features
  /**
   * Enable real-time validation feedback
   */
  realTimeValidation?: boolean;
  /**
   * Validation function for real-time feedback
   */
  validateFn?: (value: string) => { isValid: boolean; message?: string; };
  /**
   * Check handle/username availability
   */
  checkAvailability?: (value: string) => Promise<{ available: boolean; message?: string; }>;
  /**
   * Debounce delay for availability checking (ms)
   */
  availabilityDebounce?: number;
  /**
   * Show availability status
   */
  showAvailability?: boolean;
  /**
   * Custom validation rules
   */
  validationRules?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    required?: boolean;
    custom?: (value: string) => boolean;
  };
  /**
   * Validation state callback for external control
   */
  onValidationChange?: (isValid: boolean, message?: string) => void;
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
      // PRD v12 Enhanced Validation Features
      realTimeValidation = false,
      validateFn,
      checkAvailability,
      availabilityDebounce = 500,
      showAvailability = false,
      validationRules,
      onValidationChange,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [validationState, setValidationState] = React.useState<{
      isValid: boolean;
      message?: string;
      isChecking?: boolean;
    }>({ isValid: true });
    const [availabilityState, setAvailabilityState] = React.useState<{
      available?: boolean;
      message?: string;
      isChecking?: boolean;
    }>({});
    const debounceTimeoutRef = React.useRef<NodeJS.Timeout>();

    React.useImperativeHandle(ref, () => inputRef.current!, []);

    // PRD v12: Real-time validation logic
    const performValidation = React.useCallback((inputValue: string) => {
      if (!realTimeValidation) return;

      let isValid = true;
      let message = '';

      // Built-in validation rules
      if (validationRules) {
        if (validationRules.required && !inputValue.trim()) {
          isValid = false;
          message = 'This field is required';
        } else if (validationRules.minLength && inputValue.length < validationRules.minLength) {
          isValid = false;
          message = `Minimum ${validationRules.minLength} characters required`;
        } else if (validationRules.maxLength && inputValue.length > validationRules.maxLength) {
          isValid = false;
          message = `Maximum ${validationRules.maxLength} characters allowed`;
        } else if (validationRules.pattern && !validationRules.pattern.test(inputValue)) {
          isValid = false;
          message = 'Invalid format';
        } else if (validationRules.custom && !validationRules.custom(inputValue)) {
          isValid = false;
          message = 'Invalid input';
        }
      }

      // Custom validation function
      if (validateFn && isValid) {
        const result = validateFn(inputValue);
        isValid = result.isValid;
        message = result.message || message;
      }

      setValidationState({ isValid, message });
      onValidationChange?.(isValid, message);
    }, [realTimeValidation, validationRules, validateFn, onValidationChange]);

    // PRD v12: Handle availability checking with debounce
    const checkHandleAvailability = React.useCallback((inputValue: string) => {
      if (!checkAvailability || !showAvailability || !inputValue.trim()) {
        setAvailabilityState({});
        return;
      }

      // Clear previous timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      setAvailabilityState({ isChecking: true });

      // Debounced availability check
      debounceTimeoutRef.current = setTimeout(async () => {
        try {
          const result = await checkAvailability(inputValue);
          setAvailabilityState({
            available: result.available,
            message: result.message,
            isChecking: false,
          });
        } catch (error) {
          setAvailabilityState({
            available: false,
            message: 'Error checking availability',
            isChecking: false,
          });
        }
      }, availabilityDebounce);
    }, [checkAvailability, showAvailability, availabilityDebounce]);

    // Enhanced onChange handler with validation
    const handleInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      
      // Call original onChange if provided
      onChange?.(event);
      
      // Perform real-time validation
      performValidation(inputValue);
      
      // Check availability for username/handle fields
      checkHandleAvailability(inputValue);
    }, [onChange, performValidation, checkHandleAvailability]);

    // Determine current variant based on validation state
    const currentVariant = React.useMemo(() => {
      if (!realTimeValidation) return variant;
      
      if (!validationState.isValid) return 'error';
      if (showAvailability && availabilityState.available === false) return 'warning';
      if (showAvailability && availabilityState.available === true) return 'success';
      return variant;
    }, [variant, realTimeValidation, validationState.isValid, showAvailability, availabilityState.available]);

    // Determine feedback message and state
    const feedbackMessage = React.useMemo(() => {
      if (realTimeValidation && !validationState.isValid) {
        return validationState.message || 'Invalid input';
      }
      if (showAvailability && availabilityState.isChecking) {
        return 'Checking availability...';
      }
      if (showAvailability && availabilityState.message) {
        return availabilityState.message;
      }
      return fbkFbkTxtSrc;
    }, [realTimeValidation, validationState, showAvailability, availabilityState, fbkFbkTxtSrc]);

    const feedbackIcon = React.useMemo(() => {
      if (!realTimeValidation && !showAvailability) return fbkFbkIcnSrc;
      
      if (!validationState.isValid) return 'error';
      if (availabilityState.isChecking) return 'hourglass_empty';
      if (availabilityState.available === true) return 'check_circle';
      if (availabilityState.available === false) return 'cancel';
      return fbkFbkIcnSrc;
    }, [realTimeValidation, showAvailability, validationState.isValid, availabilityState, fbkFbkIcnSrc]);

    const feedbackColor = React.useMemo(() => {
      if (!realTimeValidation && !showAvailability) return fbkFbkClr;
      
      if (!validationState.isValid) return 'fd500'; // error red
      if (availabilityState.available === true) return 'fs500'; // success green
      if (availabilityState.available === false) return 'fw500'; // warning yellow
      return fbkFbkClr;
    }, [realTimeValidation, showAvailability, validationState.isValid, availabilityState, fbkFbkClr]);

    // Cleanup timeout on unmount
    React.useEffect(() => {
      return () => {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
      };
    }, []);

    // Don't render if not visible
    if (!fldTxt) return null;

    return (
      <div
        className={cn(textfieldCtrlVariants({ variant: currentVariant }), className)}
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
            className={cn(textInputVariants({ variant: currentVariant }))}
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
            onChange={handleInputChange}
            autoComplete={autoComp}
            readOnly={readOnly}
            value={value}
            data-placeholder={fldPholdSrc}
            id={fldId}
            {...fldClick}
          />

          {/* Enhanced Feedback Message with Real-time Validation */}
          {(fbk || realTimeValidation || showAvailability) && (
            <div className='feedback-txt'>
              <Label
                text={feedbackMessage}
                showText={fbkFbkTxt}
                icon={feedbackIcon}
                color={feedbackColor}
                showIcon={fbkFbkIcn || realTimeValidation || showAvailability}
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
