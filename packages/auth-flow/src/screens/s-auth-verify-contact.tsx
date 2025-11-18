import * as React from 'react';
import { cva, type VariantProps } from '@acrobi/primitives';
import { cn } from '@acrobi/primitives';
import { PinInputField } from '@acrobi/primitives';
import { Button } from '@acrobi/primitives';
import { Text } from '@acrobi/primitives';

/**
 * S-AuthVerifyContact variant styles using Acrobi Design System classes
 * Verification code input structure for email/phone verification
 */
const authVerifyContactVariants = cva(
  'auth-verify-contact w-full max-w-md mx-auto space-y-6',
  {
    variants: {
      layout: {
        default: '',
        compact: 'space-y-4',
        spacious: 'space-y-8',
      },
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      contactType: {
        email: '',
        phone: '',
        both: '',
      },
    },
    defaultVariants: {
      layout: 'default',
      alignment: 'center',
      contactType: 'email',
    },
  }
);

const authHeaderVariants = cva(
  'auth-header space-y-2',
  {
    variants: {
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      alignment: 'center',
    },
  }
);

const verificationInfoVariants = cva(
  'verification-info space-y-3',
  {
    variants: {
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      alignment: 'center',
    },
  }
);

export interface AuthVerifyContactData {
  verificationCode: string;
  contactMethod: 'email' | 'phone';
  contactValue: string;
}

export interface AuthVerifyContactProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof authVerifyContactVariants> {
  /**
   * Current verification code value
   */
  verificationCode?: string;
  /**
   * Contact method being verified
   */
  contactMethod?: 'email' | 'phone';
  /**
   * Email address or phone number being verified
   */
  contactValue: string;
  /**
   * Callback when verification code changes
   */
  onChange?: (code: string) => void;
  /**
   * Callback when verification is submitted
   */
  onVerify?: (data: AuthVerifyContactData) => void | Promise<void>;
  /**
   * Callback when resend code is requested
   */
  onResendCode?: (contactMethod: 'email' | 'phone', contactValue: string) => void | Promise<void>;
  /**
   * Callback when user wants to change contact method
   */
  onChangeContact?: () => void;
  /**
   * Whether form is in loading/submitting state
   */
  loading?: boolean;
  /**
   * Whether resend is in progress
   */
  resendLoading?: boolean;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Success message to display
   */
  success?: string;
  /**
   * Custom header content
   */
  header?: React.ReactNode;
  /**
   * Custom footer content
   */
  footer?: React.ReactNode;
  /**
   * Code length (typically 4-8 digits)
   */
  codeLength?: number;
  /**
   * Code input type
   */
  codeType?: 'numeric' | 'alphanumeric' | 'text';
  /**
   * Whether to auto-submit when code is complete
   */
  autoSubmit?: boolean;
  /**
   * Resend cooldown time in seconds
   */
  resendCooldown?: number;
  /**
   * Whether resend is currently disabled due to cooldown
   */
  resendDisabled?: boolean;
  /**
   * Time remaining for resend cooldown
   */
  resendTimeRemaining?: number;
}

/**
 * S-AuthVerifyContact - Verification code input structure
 *
 * This structure provides the verification step after account creation where users
 * enter the verification code sent to their email or phone. It includes a PIN input
 * field, resend functionality, and the ability to change contact methods.
 *
 * Key features:
 * - PIN input field for verification codes (4-8 digits)
 * - Support for both email and phone verification
 * - Resend code functionality with cooldown timer
 * - Option to change contact method
 * - Auto-submit when code is complete
 * - Clear error and success messaging
 * - Accessible keyboard navigation
 *
 * @example
 * ```tsx
 * <SAuthVerifyContact
 *   contactMethod="email"
 *   contactValue="user@example.com"
 *   verificationCode={code}
 *   onChange={setCode}
 *   onVerify={handleVerify}
 *   onResendCode={handleResend}
 *   onChangeContact={() => setStep('create-account')}
 *   loading={isVerifying}
 *   resendLoading={isResending}
 *   resendCooldown={60}
 *   resendTimeRemaining={timeLeft}
 *   error={verificationError}
 *   codeLength={6}
 *   autoSubmit
 * />
 * ```
 */
const SAuthVerifyContact = React.forwardRef<HTMLDivElement, AuthVerifyContactProps>(
  (
    {
      className,
      verificationCode = '',
      contactMethod = 'email',
      contactValue,
      onChange,
      onVerify,
      onResendCode,
      onChangeContact,
      loading = false,
      resendLoading = false,
      error,
      success,
      header,
      footer,
      codeLength = 6,
      codeType = 'numeric',
      autoSubmit = true,
      resendCooldown = 60,
      resendDisabled = false,
      resendTimeRemaining = 0,
      layout = 'default',
      alignment = 'center',
      contactType = 'email',
      ...props
    },
    ref
  ) => {
    const [code, setCode] = React.useState(verificationCode);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Update code when prop changes
    React.useEffect(() => {
      setCode(verificationCode);
    }, [verificationCode]);

    // Handle code changes
    const handleCodeChange = (newCode: string) => {
      setCode(newCode);
      onChange?.(newCode);

      // Auto-submit when code is complete
      if (autoSubmit && newCode.length === codeLength && !loading && !isSubmitting) {
        handleVerify(newCode);
      }
    };

    // Handle verification submission
    const handleVerify = async (codeToVerify?: string) => {
      const currentCode = codeToVerify || code;
      
      if (currentCode.length !== codeLength) {
        return;
      }

      setIsSubmitting(true);

      try {
        await onVerify?.({
          verificationCode: currentCode,
          contactMethod,
          contactValue,
        });
      } catch (error) {
        console.error('Verification failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    // Handle resend code
    const handleResendCode = async () => {
      if (resendDisabled || resendLoading) return;

      try {
        await onResendCode?.(contactMethod, contactValue);
      } catch (error) {
        console.error('Resend failed:', error);
      }
    };

    // Format contact value for display
    const formatContactValue = (value: string, method: 'email' | 'phone'): string => {
      if (method === 'email') {
        return value;
      }
      
      if (method === 'phone') {
        // Format phone number (show last 4 digits)
        const cleaned = value.replace(/\D/g, '');
        return `***-***-${cleaned.slice(-4)}`;
      }
      
      return value;
    };

    // Get contact method display text
    const getContactMethodText = () => {
      return contactMethod === 'email' ? 'email address' : 'phone number';
    };

    // Get resend button text
    const getResendButtonText = () => {
      if (resendLoading) return 'Sending...';
      if (resendDisabled && resendTimeRemaining > 0) {
        return `Resend in ${resendTimeRemaining}s`;
      }
      return 'Resend code';
    };

    const actualLoading = loading || isSubmitting;
    const canSubmit = code.length === codeLength && !actualLoading;
    const showResendButton = onResendCode && !actualLoading;

    return (
      <div
        ref={ref}
        className={cn(authVerifyContactVariants({ layout, alignment, contactType }), className)}
        {...props}
      >
        {/* Header */}
        {header || (
          <div className={cn(authHeaderVariants({ alignment }))}>
            <h1 className="text-2xl font-bold text-foreground">Verify Your Account</h1>
            <p className="text-muted-foreground">
              We've sent a verification code to confirm your identity
            </p>
          </div>
        )}

        {/* Verification Info */}
        <div className={cn(verificationInfoVariants({ alignment }))}>
          <div className="space-y-2">
            <Text size="sm" color="muted">
              A {codeLength}-digit verification code was sent to your {getContactMethodText()}:
            </Text>
            <Text size="sm" weight="medium" color="foreground">
              {formatContactValue(contactValue, contactMethod)}
            </Text>
          </div>

          {/* Change Contact Method */}
          {onChangeContact && (
            <button
              type="button"
              onClick={onChangeContact}
              disabled={actualLoading}
              className="text-sm text-primary hover:text-primary/80 underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Use a different {contactMethod === 'email' ? 'phone number' : 'email address'}
            </button>
          )}
        </div>

        {/* Verification Form */}
        <div className="space-y-6">
          {/* PIN Input */}
          <div className="space-y-2">
            <PinInputField
              length={codeLength}
              type={codeType}
              value={code}
              onChange={handleCodeChange}
              disabled={actualLoading}
              autoFocus
              aria-label="Verification code"
              aria-describedby={error ? 'verification-error' : success ? 'verification-success' : undefined}
            />

            {/* Error Message */}
            {error && (
              <div id="verification-error" className="flex items-center gap-2 text-sm text-destructive">
                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div id="verification-success" className="flex items-center gap-2 text-sm text-green-600">
                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{success}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Verify Button (if not auto-submit or manual verification needed) */}
            {(!autoSubmit || code.length === codeLength) && (
              <Button
                type="button"
                onClick={() => handleVerify()}
                disabled={!canSubmit}
                loading={actualLoading}
                className="w-full"
              >
                {actualLoading ? 'Verifying...' : 'Verify Code'}
              </Button>
            )}

            {/* Resend Code */}
            {showResendButton && (
              <div className="flex flex-col items-center space-y-2">
                <Text size="sm" color="muted">
                  Didn't receive the code?
                </Text>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendDisabled || resendLoading}
                  className="text-sm text-primary hover:text-primary/80 underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
                >
                  {getResendButtonText()}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {footer}
      </div>
    );
  }
);

SAuthVerifyContact.displayName = 'SAuthVerifyContact';

export { SAuthVerifyContact, authVerifyContactVariants, authHeaderVariants, verificationInfoVariants };
export type { AuthVerifyContactData };