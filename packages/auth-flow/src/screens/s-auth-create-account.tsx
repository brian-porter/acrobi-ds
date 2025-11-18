import * as React from 'react';
import { cva, type VariantProps } from '@acrobi/primitives';
import { cn } from '@acrobi/primitives';
import { TextField } from '@acrobi/form-components';
import { CheckboxField } from '@acrobi/primitives';
import { Button } from '@acrobi/primitives';

/**
 * S-AuthCreateAccount variant styles using Acrobi Design System classes
 * Initial sign-up form structure for user registration
 */
const authCreateAccountVariants = cva(
  'auth-create-account w-full max-w-md mx-auto space-y-6',
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
    },
    defaultVariants: {
      layout: 'default',
      alignment: 'center',
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

export interface AuthCreateAccountData {
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  agreeToTerms: boolean;
  subscribeNewsletter?: boolean;
}

export interface AuthCreateAccountProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof authCreateAccountVariants> {
  /**
   * Current form data
   */
  data?: Partial<AuthCreateAccountData>;
  /**
   * Callback when form data changes
   */
  onChange?: (data: Partial<AuthCreateAccountData>) => void;
  /**
   * Callback when form is submitted
   */
  onSubmit?: (data: AuthCreateAccountData) => void | Promise<void>;
  /**
   * Callback when Terms of Service link is clicked
   */
  onTermsClick?: () => void;
  /**
   * Callback when Privacy Policy link is clicked
   */
  onPrivacyClick?: () => void;
  /**
   * Whether form is in loading/submitting state
   */
  loading?: boolean;
  /**
   * Form validation errors
   */
  errors?: Partial<Record<keyof AuthCreateAccountData, string>>;
  /**
   * Whether to show optional fields
   */
  showOptionalFields?: boolean;
  /**
   * Whether to collect phone number
   */
  collectPhone?: boolean;
  /**
   * Whether to collect first/last name
   */
  collectName?: boolean;
  /**
   * Whether to show newsletter subscription option
   */
  showNewsletterOption?: boolean;
  /**
   * Custom header content
   */
  header?: React.ReactNode;
  /**
   * Custom footer content
   */
  footer?: React.ReactNode;
  /**
   * Whether email validation should check for existing accounts
   */
  validateEmailUnique?: boolean;
  /**
   * Minimum password requirements
   */
  passwordRequirements?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  };
}

/**
 * S-AuthCreateAccount - Initial sign-up form structure
 *
 * This structure provides the first step in the authentication flow where users
 * create their account with basic information. It includes email/phone collection,
 * password creation, and terms agreement.
 *
 * Key features:
 * - Email and optional phone number collection
 * - Password creation with strength validation
 * - Terms of Service and Privacy Policy agreement
 * - Optional name fields and newsletter subscription
 * - Real-time validation with user-friendly feedback
 * - Integration with enhanced TextField validation
 * - Configurable field requirements
 *
 * @example
 * ```tsx
 * <SAuthCreateAccount
 *   data={formData}
 *   onChange={setFormData}
 *   onSubmit={handleCreateAccount}
 *   onTermsClick={() => setShowTerms(true)}
 *   onPrivacyClick={() => setShowPrivacy(true)}
 *   collectPhone
 *   collectName
 *   showNewsletterOption
 *   errors={validationErrors}
 *   loading={isSubmitting}
 * />
 * ```
 */
const SAuthCreateAccount = React.forwardRef<HTMLDivElement, AuthCreateAccountProps>(
  (
    {
      className,
      data = {},
      onChange,
      onSubmit,
      onTermsClick,
      onPrivacyClick,
      loading = false,
      errors = {},
      showOptionalFields = false,
      collectPhone = false,
      collectName = false,
      showNewsletterOption = true,
      header,
      footer,
      validateEmailUnique = true,
      passwordRequirements = {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: false,
      },
      layout = 'default',
      alignment = 'center',
      ...props
    },
    ref
  ) => {
    const [formData, setFormData] = React.useState<Partial<AuthCreateAccountData>>({
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      agreeToTerms: false,
      subscribeNewsletter: false,
      ...data,
    });

    const [validationStates, setValidationStates] = React.useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Update form data when data prop changes
    React.useEffect(() => {
      setFormData(prev => ({ ...prev, ...data }));
    }, [data]);

    // Update parent component when form data changes
    const updateField = (field: keyof AuthCreateAccountData, value: string | boolean) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);
      onChange?.(newData);
    };

    // Track validation states
    const updateValidation = (field: string, isValid: boolean) => {
      setValidationStates(prev => ({ ...prev, [field]: isValid }));
    };

    // Email validation
    const validateEmail = (value: string): string | null => {
      if (!value) return null;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : 'Please enter a valid email address';
    };

    // Simulate checking if email already exists
    const checkEmailExists = async (value: string): Promise<string | null> => {
      if (!validateEmailUnique) return null;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // This would be replaced with actual API call
      const existingEmails = ['admin@example.com', 'user@test.com', 'demo@acrobi.com'];
      return existingEmails.includes(value.toLowerCase()) 
        ? 'An account with this email already exists' 
        : null;
    };

    // Phone validation
    const validatePhone = (value: string): string | null => {
      if (!value) return collectPhone ? 'Phone number is required' : null;
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      return phoneRegex.test(value) ? null : 'Please enter a valid phone number';
    };

    // Password validation
    const validatePassword = (value: string): string | null => {
      if (!value) return null;
      
      const { minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars } = passwordRequirements;
      const errors = [];
      
      if (minLength && value.length < minLength) {
        errors.push(`at least ${minLength} characters`);
      }
      
      if (requireUppercase && !/[A-Z]/.test(value)) {
        errors.push('an uppercase letter');
      }
      
      if (requireLowercase && !/[a-z]/.test(value)) {
        errors.push('a lowercase letter');
      }
      
      if (requireNumbers && !/\d/.test(value)) {
        errors.push('a number');
      }
      
      if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        errors.push('a special character');
      }
      
      return errors.length > 0 ? `Password must contain ${errors.join(', ')}` : null;
    };

    // Confirm password validation
    const validateConfirmPassword = (value: string): string | null => {
      if (!value) return null;
      return value === formData.password ? null : 'Passwords do not match';
    };

    // Name validation
    const validateName = (value: string): string | null => {
      if (!collectName) return null;
      if (!value) return 'This field is required';
      if (value.length < 2) return 'Name must be at least 2 characters';
      if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Name contains invalid characters';
      return null;
    };

    // Handle form submission
    const handleSubmit = async (e?: React.FormEvent) => {
      e?.preventDefault();
      
      // Check if all required fields are valid
      const requiredFields = ['email', 'password', 'confirmPassword'];
      if (collectPhone) requiredFields.push('phone');
      if (collectName) requiredFields.push('firstName', 'lastName');
      
      const hasValidationErrors = requiredFields.some(field => !validationStates[field]);
      const missingRequiredData = requiredFields.some(field => !formData[field as keyof typeof formData]);
      
      if (!formData.agreeToTerms) {
        alert('You must agree to the Terms of Service and Privacy Policy to continue');
        return;
      }
      
      if (hasValidationErrors || missingRequiredData) {
        alert('Please fix all validation errors before submitting');
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        await onSubmit?.(formData as AuthCreateAccountData);
      } catch (error) {
        console.error('Account creation failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const actualLoading = loading || isSubmitting;

    return (
      <div
        ref={ref}
        className={cn(authCreateAccountVariants({ layout, alignment }), className)}
        {...props}
      >
        {/* Header */}
        {header || (
          <div className={cn(authHeaderVariants({ alignment }))}>
            <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground">
              Join us to get started with your personalized experience
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          {collectName && (
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="First Name"
                value={formData.firstName || ''}
                onChange={(e) => updateField('firstName', e.target.value)}
                required={collectName}
                validate={validateName}
                onValidationChange={(isValid) => updateValidation('firstName', isValid)}
                error={errors.firstName}
                disabled={actualLoading}
                placeholder="John"
              />
              
              <TextField
                label="Last Name"
                value={formData.lastName || ''}
                onChange={(e) => updateField('lastName', e.target.value)}
                required={collectName}
                validate={validateName}
                onValidationChange={(isValid) => updateValidation('lastName', isValid)}
                error={errors.lastName}
                disabled={actualLoading}
                placeholder="Doe"
              />
            </div>
          )}

          {/* Email */}
          <TextField
            label="Email Address"
            type="email"
            value={formData.email || ''}
            onChange={(e) => updateField('email', e.target.value)}
            required
            validate={validateEmail}
            validateAsync={validateEmailUnique ? checkEmailExists : undefined}
            onValidationChange={(isValid) => updateValidation('email', isValid)}
            error={errors.email}
            disabled={actualLoading}
            placeholder="your.email@example.com"
            autoComplete="email"
          />

          {/* Phone */}
          {collectPhone && (
            <TextField
              label="Phone Number"
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
              required={collectPhone}
              validate={validatePhone}
              onValidationChange={(isValid) => updateValidation('phone', isValid)}
              error={errors.phone}
              disabled={actualLoading}
              placeholder="+1 (555) 123-4567"
              autoComplete="tel"
            />
          )}

          {/* Password */}
          <TextField
            label="Password"
            type="password"
            value={formData.password || ''}
            onChange={(e) => updateField('password', e.target.value)}
            required
            validate={validatePassword}
            onValidationChange={(isValid) => updateValidation('password', isValid)}
            error={errors.password}
            disabled={actualLoading}
            placeholder="Create a secure password"
            autoComplete="new-password"
          />

          {/* Confirm Password */}
          <TextField
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword || ''}
            onChange={(e) => updateField('confirmPassword', e.target.value)}
            required
            validate={validateConfirmPassword}
            onValidationChange={(isValid) => updateValidation('confirmPassword', isValid)}
            error={errors.confirmPassword}
            disabled={actualLoading}
            placeholder="Confirm your password"
            autoComplete="new-password"
          />

          {/* Newsletter Subscription */}
          {showNewsletterOption && (
            <CheckboxField
              label="Subscribe to our newsletter for updates and tips"
              checked={formData.subscribeNewsletter || false}
              onChange={(checked) => updateField('subscribeNewsletter', checked)}
              disabled={actualLoading}
              helpText="You can unsubscribe at any time"
            />
          )}

          {/* Terms Agreement */}
          <CheckboxField
            label="I agree to the Terms of Service and Privacy Policy"
            links={[
              {
                text: "Terms of Service",
                onClick: onTermsClick,
                variant: "primary",
                "aria-label": "Open Terms of Service"
              },
              {
                text: "Privacy Policy",
                onClick: onPrivacyClick,
                variant: "primary",
                "aria-label": "Open Privacy Policy"
              }
            ]}
            checked={formData.agreeToTerms || false}
            onChange={(checked) => updateField('agreeToTerms', checked)}
            required
            error={errors.agreeToTerms}
            disabled={actualLoading}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={actualLoading || !formData.agreeToTerms}
            loading={actualLoading}
          >
            {actualLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        {/* Footer */}
        {footer}
      </div>
    );
  }
);

SAuthCreateAccount.displayName = 'SAuthCreateAccount';

export { SAuthCreateAccount, authCreateAccountVariants, authHeaderVariants };
export type { AuthCreateAccountData };