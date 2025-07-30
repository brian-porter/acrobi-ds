import * as React from 'react';
import { cn } from '../../lib/utils';
import { Input, type InputProps } from '../primitives/input';

export interface TextFieldProps extends Omit<InputProps, 'error'> {
  /**
   * Field label
   */
  label?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Success message to display
   */
  success?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Additional description for accessibility
   */
  description?: string;
  /**
   * Layout orientation
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * Label width for horizontal layout
   */
  labelWidth?: string;
  /**
   * Real-time validation function
   */
  validate?: (value: string) => string | null;
  /**
   * Async validation function (e.g., for checking handle availability)
   */
  validateAsync?: (value: string) => Promise<string | null>;
  /**
   * Debounce delay for async validation in milliseconds
   */
  validationDelay?: number;
  /**
   * Whether to hide validation messages on focus
   */
  hideValidationOnFocus?: boolean;
  /**
   * Whether to show validation immediately or wait for blur
   */
  validateOnChange?: boolean;
  /**
   * Custom validation rules
   */
  validationRules?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
  /**
   * Loading state for async validation
   */
  isValidating?: boolean;
  /**
   * Show loading indicator during validation
   */
  showValidationLoader?: boolean;
  /**
   * Callback when validation state changes
   */
  onValidationChange?: (isValid: boolean, message?: string) => void;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      label,
      helperText,
      error: externalError,
      success,
      required = false,
      description,
      orientation = 'vertical',
      labelWidth = '120px',
      validate,
      validateAsync,
      validationDelay = 500,
      hideValidationOnFocus = true,
      validateOnChange = true,
      validationRules,
      isValidating: externalIsValidating,
      showValidationLoader = true,
      onValidationChange,
      value: controlledValue,
      onChange,
      onFocus,
      onBlur,
      id,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(controlledValue || '');
    const [validationError, setValidationError] = React.useState<string>('');
    const [validationSuccess, setValidationSuccess] = React.useState<string>('');
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasBlurred, setHasBlurred] = React.useState(false);
    const [isValidating, setIsValidating] = React.useState(false);
    const [isAsyncValidating, setIsAsyncValidating] = React.useState(false);
    
    const debounceTimeoutRef = React.useRef<NodeJS.Timeout>();
    const asyncValidationRef = React.useRef<number>(0);
    
    const fieldId = id || `text-field-${React.useId()}`;
    const helperTextId = `${fieldId}-helper-text`;
    const descriptionId = description ? `${fieldId}-description` : undefined;
    
    const isHorizontal = orientation === 'horizontal';
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    
    // Determine which error/success to show
    const error = externalError || validationError;
    const successMessage = success || validationSuccess;
    const shouldShowValidation = !hideValidationOnFocus || !isFocused || hasBlurred;
    const shouldShowError = error && shouldShowValidation;
    const shouldShowSuccess = successMessage && !error && shouldShowValidation;
    const actualIsValidating = externalIsValidating || isValidating || isAsyncValidating;
    
    // Determine input variant
    const getInputVariant = () => {
      if (shouldShowError) return 'error';
      if (shouldShowSuccess) return 'success';
      return props.variant;
    };

    // Built-in validation rules
    const runValidationRules = React.useCallback((val: string): string | null => {
      if (!validationRules) return null;
      
      const { minLength, maxLength, pattern, custom } = validationRules;
      
      if (minLength && val.length < minLength) {
        return `Must be at least ${minLength} characters long`;
      }
      
      if (maxLength && val.length > maxLength) {
        return `Must be no more than ${maxLength} characters long`;
      }
      
      if (pattern && !pattern.test(val)) {
        return 'Invalid format';
      }
      
      if (custom) {
        return custom(val);
      }
      
      return null;
    }, [validationRules]);

    // Run synchronous validation
    const runSyncValidation = React.useCallback((val: string): string | null => {
      // Required field validation
      if (required && !val.trim()) {
        return 'This field is required';
      }
      
      // Built-in rules
      const rulesError = runValidationRules(val);
      if (rulesError) return rulesError;
      
      // Custom sync validation
      if (validate) {
        return validate(val);
      }
      
      return null;
    }, [required, validate, runValidationRules]);

    // Run async validation with debounce
    const runAsyncValidation = React.useCallback(async (val: string) => {
      if (!validateAsync || !val.trim()) return;
      
      const validationId = ++asyncValidationRef.current;
      setIsAsyncValidating(true);
      
      try {
        const result = await validateAsync(val);
        
        // Only update if this is still the latest validation
        if (validationId === asyncValidationRef.current) {
          if (result) {
            setValidationError(result);
            setValidationSuccess('');
          } else {
            setValidationError('');
            // Set success message for async validation (e.g., "Handle available!")
            if (val.trim()) {
              setValidationSuccess('Available!');
            }
          }
          onValidationChange?.(!result, result || undefined);
        }
      } catch (err) {
        if (validationId === asyncValidationRef.current) {
          setValidationError('Validation failed. Please try again.');
          setValidationSuccess('');
          onValidationChange?.(false, 'Validation failed');
        }
      } finally {
        if (validationId === asyncValidationRef.current) {
          setIsAsyncValidating(false);
        }
      }
    }, [validateAsync, onValidationChange]);

    // Debounced validation
    const performValidation = React.useCallback((val: string) => {
      // Clear previous debounce
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      
      // Run sync validation immediately
      const syncError = runSyncValidation(val);
      setValidationError(syncError || '');
      setValidationSuccess(syncError ? '' : validationSuccess);
      
      // Notify of sync validation result
      onValidationChange?.(!syncError, syncError || undefined);
      
      // If sync validation passes and we have async validation, run it
      if (!syncError && validateAsync && val.trim()) {
        debounceTimeoutRef.current = setTimeout(() => {
          runAsyncValidation(val);
        }, validationDelay);
      } else {
        setIsAsyncValidating(false);
      }
    }, [runSyncValidation, validateAsync, runAsyncValidation, validationDelay, onValidationChange, validationSuccess]);

    // Handle value changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      
      onChange?.(e);
      
      // Validate on change if enabled
      if (validateOnChange) {
        performValidation(newValue);
      }
    };

    // Handle focus
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    // Handle blur
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasBlurred(true);
      
      // Always validate on blur
      performValidation(value);
      
      onBlur?.(e);
    };

    // Clean up debounce timeout
    React.useEffect(() => {
      return () => {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
      };
    }, []);

    // Update internal value when controlled value changes
    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setInternalValue(controlledValue);
      }
    }, [controlledValue]);

    return (
      <div
        className={cn(
          'space-y-2',
          isHorizontal && 'flex items-start space-y-0 space-x-4',
          className
        )}
      >
        {/* Label */}
        {label && (
          <label
            htmlFor={fieldId}
            className={cn(
              'text-sm font-medium leading-none text-foreground',
              required &&
                "after:content-['*'] after:ml-0.5 after:text-destructive",
              props.disabled && 'text-muted-foreground cursor-not-allowed',
              isHorizontal && `flex-shrink-0 pt-2`
            )}
            style={isHorizontal ? { width: labelWidth } : undefined}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className={cn('space-y-2', isHorizontal && 'flex-1')}>
          {/* Description */}
          {description && (
            <p id={descriptionId} className='text-sm text-muted-foreground'>
              {description}
            </p>
          )}

          {/* Input with Validation Indicator */}
          <div className="relative">
            <Input
              ref={ref}
              id={fieldId}
              value={value}
              variant={getInputVariant()}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-describedby={cn(
                (shouldShowError || shouldShowSuccess || helperText) && helperTextId,
                description && descriptionId
              )}
              aria-invalid={shouldShowError}
              aria-required={required}
              {...props}
            />
            
            {/* Validation Loading Indicator */}
            {showValidationLoader && actualIsValidating && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full" />
              </div>
            )}
            
            {/* Success Indicator */}
            {shouldShowSuccess && !actualIsValidating && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>

          {/* Helper Text / Error / Success */}
          {(shouldShowError || shouldShowSuccess || helperText) && (
            <p
              id={helperTextId}
              className={cn(
                'text-sm flex items-center gap-1',
                shouldShowError && 'text-destructive',
                shouldShowSuccess && 'text-green-600',
                !shouldShowError && !shouldShowSuccess && 'text-muted-foreground'
              )}
            >
              {shouldShowError && (
                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {shouldShowSuccess && (
                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              <span>
                {shouldShowError ? error : shouldShowSuccess ? successMessage : helperText}
              </span>
            </p>
          )}
        </div>
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export { TextField };
