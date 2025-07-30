import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * PinInputField variant styles using Acrobi Design System classes
 * Specialized input for verification codes with individual digit inputs
 */
const pinInputVariants = cva(
  'pin-input-container flex gap-2 items-center justify-center',
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
      variant: {
        default: '',
        filled: '',
        outline: '',
      },
      state: {
        default: '',
        error: '',
        success: '',
        disabled: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'outline',
      state: 'default',
    },
  }
);

const pinDigitVariants = cva(
  'pin-digit flex items-center justify-center text-center font-mono font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'w-10 h-10 text-lg rounded-md',
        md: 'w-12 h-12 text-xl rounded-lg',
        lg: 'w-14 h-14 text-2xl rounded-xl',
      },
      variant: {
        default: 'border-2 border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500',
        filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-blue-500',
        outline: 'border-2 border-gray-300 bg-transparent focus:border-blue-500 focus:ring-blue-500',
      },
      state: {
        default: '',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
        disabled: 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'outline',
      state: 'default',
    },
  }
);

export interface PinInputFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof pinInputVariants> {
  /**
   * Number of digits in the PIN
   */
  length?: number;
  /**
   * Current PIN value
   */
  value?: string;
  /**
   * Callback when PIN value changes
   */
  onChange?: (value: string) => void;
  /**
   * Callback when PIN is completed (all digits filled)
   */
  onComplete?: (value: string) => void;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Placeholder character for empty digits
   */
  placeholder?: string;
  /**
   * Whether to show asterisks instead of digits (for passwords)
   */
  mask?: boolean;
  /**
   * Custom validation pattern (regex)
   */
  pattern?: string;
  /**
   * Whether to auto-focus the first input on mount
   */
  autoFocus?: boolean;
  /**
   * Whether to auto-submit when all digits are filled
   */
  autoSubmit?: boolean;
  /**
   * Input type - numeric restricts to numbers only
   */
  type?: 'text' | 'numeric' | 'alphanumeric';
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Success message to display
   */
  success?: string;
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;
  /**
   * Description for assistive technology
   */
  'aria-describedby'?: string;
}

/**
 * PinInputField component for verification codes and secure PIN entry
 *
 * This component provides a specialized input interface for PIN codes, verification
 * codes, and other short numeric/alphanumeric sequences. It creates individual
 * input fields for each digit and handles navigation, validation, and accessibility.
 *
 * Key features:
 * - Individual digit inputs with automatic focus management
 * - Support for numeric, text, and alphanumeric input types
 * - Configurable length (2-10 digits)
 * - Built-in validation and error states
 * - Accessible keyboard navigation
 * - Auto-completion callback when all digits are filled
 * - Masking support for sensitive data
 * - Paste support for bulk entry
 *
 * @example
 * ```tsx
 * // Basic 6-digit verification code
 * <PinInputField
 *   length={6}
 *   type="numeric"
 *   value={pinValue}
 *   onChange={setPinValue}
 *   onComplete={(pin) => verifyCode(pin)}
 *   autoFocus
 * />
 *
 * // Secure PIN with masking
 * <PinInputField
 *   length={4}
 *   type="numeric"
 *   mask
 *   value={pinValue}
 *   onChange={setPinValue}
 *   state={error ? 'error' : 'default'}
 *   error={error}
 * />
 * ```
 */
const PinInputField = React.forwardRef<HTMLDivElement, PinInputFieldProps>(
  (
    {
      className,
      length = 6,
      value = '',
      onChange,
      onComplete,
      disabled = false,
      placeholder = '',
      mask = false,
      pattern,
      autoFocus = false,
      autoSubmit = false,
      type = 'numeric',
      error,
      success,
      size = 'md',
      variant = 'outline',
      state = 'default',
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const [digits, setDigits] = React.useState<string[]>(
      Array.from({ length }, (_, i) => value[i] || '')
    );
    const [focusedIndex, setFocusedIndex] = React.useState(-1);
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    // Update digits when value prop changes
    React.useEffect(() => {
      const newDigits = Array.from({ length }, (_, i) => value[i] || '');
      setDigits(newDigits);
    }, [value, length]);

    // Auto-focus first input on mount
    React.useEffect(() => {
      if (autoFocus && inputRefs.current[0] && !disabled) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus, disabled]);

    // Determine current state
    const currentState = error ? 'error' : success ? 'success' : disabled ? 'disabled' : state;

    // Input type restrictions
    const getInputProps = () => {
      switch (type) {
        case 'numeric':
          return {
            inputMode: 'numeric' as const,
            pattern: '[0-9]*',
          };
        case 'alphanumeric':
          return {
            inputMode: 'text' as const,
            pattern: '[A-Za-z0-9]*',
          };
        default:
          return {
            inputMode: 'text' as const,
          };
      }
    };

    const validateInput = (char: string): boolean => {
      if (pattern) {
        return new RegExp(pattern).test(char);
      }
      
      switch (type) {
        case 'numeric':
          return /^\d$/.test(char);
        case 'alphanumeric':
          return /^[A-Za-z0-9]$/.test(char);
        default:
          return char.length === 1;
      }
    };

    const updateDigit = (index: number, digit: string) => {
      const newDigits = [...digits];
      newDigits[index] = digit;
      setDigits(newDigits);
      
      const newValue = newDigits.join('');
      onChange?.(newValue);

      // Check if PIN is complete
      if (newValue.length === length && !newDigits.includes('')) {
        onComplete?.(newValue);
        if (autoSubmit) {
          // Blur all inputs to indicate completion
          inputRefs.current.forEach(input => input?.blur());
        }
      }
    };

    const handleInputChange = (index: number, inputValue: string) => {
      const char = inputValue.slice(-1); // Get last character
      
      if (char === '' || validateInput(char)) {
        updateDigit(index, char);
        
        // Move to next input if character was entered
        if (char && index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;
      
      if (key === 'Backspace') {
        if (digits[index] === '' && index > 0) {
          // Move to previous input if current is empty
          inputRefs.current[index - 1]?.focus();
        } else {
          // Clear current digit
          updateDigit(index, '');
        }
      } else if (key === 'Delete') {
        updateDigit(index, '');
      } else if (key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else if (key === 'Home') {
        inputRefs.current[0]?.focus();
      } else if (key === 'End') {
        inputRefs.current[length - 1]?.focus();
      }
    };

    const handlePaste = (event: React.ClipboardEvent) => {
      event.preventDefault();
      const pasteData = event.clipboardData.getData('text');
      const validChars = pasteData.split('').filter(validateInput).slice(0, length);
      
      const newDigits = Array.from({ length }, (_, i) => validChars[i] || '');
      setDigits(newDigits);
      
      const newValue = newDigits.join('');
      onChange?.(newValue);
      
      // Focus appropriate input after paste
      const nextEmptyIndex = newDigits.findIndex(digit => digit === '');
      const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
      
      // Check completion
      if (newValue.length === length && !newDigits.includes('')) {
        onComplete?.(newValue);
      }
    };

    const handleFocus = (index: number) => {
      setFocusedIndex(index);
    };

    const handleBlur = () => {
      setFocusedIndex(-1);
    };

    return (
      <div className="pin-input-wrapper w-full">
        <div
          ref={ref}
          className={cn(pinInputVariants({ size, variant, state: currentState }), className)}
          {...props}
        >
          {Array.from({ length }, (_, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              className={cn(
                pinDigitVariants({ size, variant, state: currentState }),
                focusedIndex === index && 'ring-2'
              )}
              type={mask ? 'password' : 'text'}
              value={mask && digits[index] ? '•' : digits[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={disabled}
              placeholder={placeholder}
              maxLength={1}
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              aria-label={ariaLabel || `Digit ${index + 1} of ${length}`}
              aria-describedby={ariaDescribedBy}
              {...getInputProps()}
            />
          ))}
        </div>
        
        {/* Error/Success Messages */}
        {error && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {success && !error && (
          <p className="mt-2 text-sm text-green-600" role="status">
            {success}
          </p>
        )}
      </div>
    );
  }
);

PinInputField.displayName = 'PinInputField';

export { PinInputField, pinInputVariants, pinDigitVariants };