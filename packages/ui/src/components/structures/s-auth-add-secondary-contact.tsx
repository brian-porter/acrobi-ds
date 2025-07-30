import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { TextField } from './text-field';
import { Button } from '../primitives/button';
import { Text } from '../primitives/text';
import { Card } from '../primitives/card';

/**
 * S-AuthAddSecondaryContact variant styles using Acrobi Design System classes
 * Secondary contact method addition structure for enhanced account security
 */
const authAddSecondaryContactVariants = cva(
  'auth-add-secondary-contact w-full max-w-md mx-auto space-y-6',
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

const contactMethodCardVariants = cva(
  'contact-method-card p-4 rounded-lg border transition-colors cursor-pointer',
  {
    variants: {
      selected: {
        true: 'border-primary bg-primary/5',
        false: 'border-border hover:border-primary/50 hover:bg-muted/50',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  }
);

export interface AuthAddSecondaryContactData {
  secondaryContactType: 'email' | 'phone' | null;
  secondaryContactValue: string;
  skipSecondaryContact?: boolean;
}

export interface AuthAddSecondaryContactProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof authAddSecondaryContactVariants> {
  /**
   * Current form data
   */
  data?: Partial<AuthAddSecondaryContactData>;
  /**
   * Primary contact method already in use
   */
  primaryContactType: 'email' | 'phone';
  /**
   * Primary contact value for display
   */
  primaryContactValue: string;
  /**
   * Callback when form data changes
   */
  onChange?: (data: Partial<AuthAddSecondaryContactData>) => void;
  /**
   * Callback when form is submitted
   */
  onSubmit?: (data: AuthAddSecondaryContactData) => void | Promise<void>;
  /**
   * Callback when user chooses to skip
   */
  onSkip?: () => void;
  /**
   * Whether form is in loading/submitting state
   */
  loading?: boolean;
  /**
   * Form validation errors
   */
  errors?: Partial<Record<keyof AuthAddSecondaryContactData, string>>;
  /**
   * Custom header content
   */
  header?: React.ReactNode;
  /**
   * Custom footer content
   */
  footer?: React.ReactNode;
  /**
   * Whether to allow skipping this step
   */
  allowSkip?: boolean;
  /**
   * Whether to validate secondary contact uniqueness
   */
  validateUnique?: boolean;
  /**
   * Custom benefits text for secondary contact
   */
  benefitsText?: string[];
}

/**
 * S-AuthAddSecondaryContact - Secondary contact method addition structure
 *
 * This structure allows users to add a secondary contact method (email or phone)
 * to their account for enhanced security and recovery options. It provides clear
 * benefits messaging and allows users to skip if they prefer.
 *
 * Key features:
 * - Add secondary email or phone number
 * - Clear benefits messaging for security
 * - Real-time validation with uniqueness checking
 * - Option to skip this step
 * - Responsive card-based selection UI
 * - Integration with enhanced TextField validation
 * - Accessibility-first design
 *
 * @example
 * ```tsx
 * <SAuthAddSecondaryContact
 *   primaryContactType="email"
 *   primaryContactValue="user@example.com"
 *   data={formData}
 *   onChange={setFormData}
 *   onSubmit={handleAddSecondary}
 *   onSkip={handleSkip}
 *   loading={isSubmitting}
 *   allowSkip
 *   validateUnique
 *   errors={validationErrors}
 * />
 * ```
 */
const SAuthAddSecondaryContact = React.forwardRef<HTMLDivElement, AuthAddSecondaryContactProps>(
  (
    {
      className,
      data = {},
      primaryContactType,
      primaryContactValue,
      onChange,
      onSubmit,
      onSkip,
      loading = false,
      errors = {},
      header,
      footer,
      allowSkip = true,
      validateUnique = true,
      benefitsText = [
        'Recover your account if you lose access to your primary contact',
        'Receive important security notifications',
        'Enable two-factor authentication for enhanced security',
        'Get notified about account changes from multiple channels'
      ],
      layout = 'default',
      alignment = 'center',
      ...props
    },
    ref
  ) => {
    const [formData, setFormData] = React.useState<Partial<AuthAddSecondaryContactData>>({
      secondaryContactType: null,
      secondaryContactValue: '',
      skipSecondaryContact: false,
      ...data,
    });
    const [validationStates, setValidationStates] = React.useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Update form data when data prop changes
    React.useEffect(() => {
      setFormData(prev => ({ ...prev, ...data }));
    }, [data]);

    // Update parent component when form data changes
    const updateField = (field: keyof AuthAddSecondaryContactData, value: string | boolean | null) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);
      onChange?.(newData);
    };

    // Track validation states
    const updateValidation = (field: string, isValid: boolean) => {
      setValidationStates(prev => ({ ...prev, [field]: isValid }));
    };

    // Determine secondary contact type
    const secondaryContactType = primaryContactType === 'email' ? 'phone' : 'email';
    
    // Contact method selection
    const handleContactMethodSelect = (method: 'email' | 'phone') => {
      updateField('secondaryContactType', method);
      if (formData.secondaryContactValue && formData.secondaryContactType !== method) {
        updateField('secondaryContactValue', ''); // Clear value when switching methods
      }
    };

    // Email validation
    const validateEmail = (value: string): string | null => {
      if (!value) return null;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
      
      // Check if same as primary contact
      if (validateUnique && value.toLowerCase() === primaryContactValue.toLowerCase()) {
        return 'Secondary contact cannot be the same as your primary contact';
      }
      
      return null;
    };

    // Phone validation
    const validatePhone = (value: string): string | null => {
      if (!value) return null;
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        return 'Please enter a valid phone number';
      }
      
      // Check if same as primary contact
      if (validateUnique && value.replace(/\D/g, '') === primaryContactValue.replace(/\D/g, '')) {
        return 'Secondary contact cannot be the same as your primary contact';
      }
      
      return null;
    };

    // Check uniqueness (simulate API call)
    const checkContactUnique = async (value: string): Promise<string | null> => {
      if (!validateUnique) return null;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // This would be replaced with actual API call
      const existingContacts = ['existing@example.com', '+1555123456'];
      
      const normalizedValue = formData.secondaryContactType === 'phone' 
        ? value.replace(/\D/g, '') 
        : value.toLowerCase();
      
      const normalizedExisting = existingContacts.map(contact => 
        contact.includes('@') ? contact.toLowerCase() : contact.replace(/\D/g, '')
      );
      
      return normalizedExisting.includes(normalizedValue) 
        ? 'This contact method is already in use' 
        : null;
    };

    // Handle form submission
    const handleSubmit = async (e?: React.FormEvent) => {
      e?.preventDefault();
      
      if (!formData.secondaryContactType || !formData.secondaryContactValue) {
        return;
      }
      
      // Check validation
      const isValid = validationStates.secondaryContact;
      if (!isValid) {
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        await onSubmit?.(formData as AuthAddSecondaryContactData);
      } catch (error) {
        console.error('Secondary contact addition failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    // Handle skip
    const handleSkip = () => {
      updateField('skipSecondaryContact', true);
      onSkip?.();
    };

    const actualLoading = loading || isSubmitting;
    const canSubmit = formData.secondaryContactType && formData.secondaryContactValue && validationStates.secondaryContact;

    return (
      <div
        ref={ref}
        className={cn(authAddSecondaryContactVariants({ layout, alignment }), className)}
        {...props}
      >
        {/* Header */}
        {header || (
          <div className={cn(authHeaderVariants({ alignment }))}>
            <h1 className="text-2xl font-bold text-foreground">Add Recovery Contact</h1>
            <p className="text-muted-foreground">
              Add a secondary contact method to keep your account secure
            </p>
          </div>
        )}

        {/* Current Primary Contact Info */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-2">
          <Text size="sm" weight="medium" color="foreground">
            Primary {primaryContactType === 'email' ? 'Email' : 'Phone'}:
          </Text>
          <Text size="sm" color="muted">
            {primaryContactValue}
          </Text>
        </div>

        {/* Benefits Section */}
        <div className="space-y-3">
          <Text size="sm" weight="medium" color="foreground">
            Why add a recovery contact?
          </Text>
          <ul className="space-y-2">
            {benefitsText.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <svg className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Method Selection */}
        <div className="space-y-4">
          <Text size="sm" weight="medium" color="foreground">
            Choose your secondary contact method:
          </Text>
          
          <div className="grid grid-cols-1 gap-3">
            {/* Email Option (if primary is phone) */}
            {primaryContactType === 'phone' && (
              <div
                className={cn(contactMethodCardVariants({
                  selected: formData.secondaryContactType === 'email',
                  disabled: actualLoading,
                }))}
                onClick={() => !actualLoading && handleContactMethodSelect('email')}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <Text size="sm" weight="medium" color="foreground">
                      Email Address
                    </Text>
                    <Text size="xs" color="muted">
                      Receive notifications and recovery codes via email
                    </Text>
                  </div>
                  {formData.secondaryContactType === 'email' && (
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Phone Option (if primary is email) */}
            {primaryContactType === 'email' && (
              <div
                className={cn(contactMethodCardVariants({
                  selected: formData.secondaryContactType === 'phone',
                  disabled: actualLoading,
                }))}
                onClick={() => !actualLoading && handleContactMethodSelect('phone')}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <Text size="sm" weight="medium" color="foreground">
                      Phone Number
                    </Text>
                    <Text size="xs" color="muted">
                      Receive SMS notifications and verification codes
                    </Text>
                  </div>
                  {formData.secondaryContactType === 'phone' && (
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Input */}
        {formData.secondaryContactType && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label={formData.secondaryContactType === 'email' ? 'Email Address' : 'Phone Number'}
              type={formData.secondaryContactType === 'email' ? 'email' : 'tel'}
              value={formData.secondaryContactValue || ''}
              onChange={(e) => updateField('secondaryContactValue', e.target.value)}
              required
              validate={formData.secondaryContactType === 'email' ? validateEmail : validatePhone}
              validateAsync={validateUnique ? checkContactUnique : undefined}
              onValidationChange={(isValid) => updateValidation('secondaryContact', isValid)}
              error={errors.secondaryContactValue}
              disabled={actualLoading}
              placeholder={
                formData.secondaryContactType === 'email' 
                  ? 'secondary@example.com' 
                  : '+1 (555) 123-4567'
              }
              autoComplete={formData.secondaryContactType === 'email' ? 'email' : 'tel'}
              helperText={
                formData.secondaryContactType === 'email'
                  ? 'We\'ll send a verification email to this address'
                  : 'We\'ll send a verification code to this number'
              }
            />

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full"
                disabled={!canSubmit || actualLoading}
                loading={actualLoading}
              >
                {actualLoading ? 'Adding Contact...' : 'Add Recovery Contact'}
              </Button>

              {allowSkip && (
                <button
                  type="button"
                  onClick={handleSkip}
                  disabled={actualLoading}
                  className="w-full text-sm text-muted-foreground hover:text-foreground underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Skip this step
                </button>
              )}
            </div>
          </form>
        )}

        {/* Footer */}
        {footer}
      </div>
    );
  }
);

SAuthAddSecondaryContact.displayName = 'SAuthAddSecondaryContact';

export { SAuthAddSecondaryContact, authAddSecondaryContactVariants, authHeaderVariants, contactMethodCardVariants };
export type { AuthAddSecondaryContactData };