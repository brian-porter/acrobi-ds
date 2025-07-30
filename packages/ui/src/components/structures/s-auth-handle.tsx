import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { TextField } from './text-field';
import { Button } from '../primitives/button';
import { Text } from '../primitives/text';
import { Badge } from '../primitives/badge';

/**
 * S-AuthHandle variant styles using Acrobi Design System classes
 * Handle/username selection structure for user identification
 */
const authHandleVariants = cva(
  'auth-handle w-full max-w-md mx-auto space-y-6',
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

const handlePreviewVariants = cva(
  'handle-preview p-4 rounded-lg border bg-card space-y-3',
  {
    variants: {
      status: {
        default: 'border-border',
        available: 'border-green-200 bg-green-50',
        unavailable: 'border-destructive bg-destructive/5',
        checking: 'border-primary bg-primary/5',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  }
);

const handleSuggestionVariants = cva(
  'handle-suggestion px-3 py-2 rounded-md border bg-card text-sm cursor-pointer transition-colors',
  {
    variants: {
      status: {
        available: 'border-green-200 bg-green-50 hover:bg-green-100 text-green-800',
        unavailable: 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed',
        loading: 'border-gray-200 bg-gray-50 text-gray-500 cursor-wait',
      },
    },
    defaultVariants: {
      status: 'available',
    },
  }
);

export interface AuthHandleData {
  handle: string;
  displayName?: string;
  handleAvailable?: boolean;
}

export interface HandleSuggestion {
  handle: string;
  available: boolean;
  type: 'generated' | 'similar' | 'recommended';
}

export interface AuthHandleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof authHandleVariants> {
  /**
   * Current handle data
   */
  data?: Partial<AuthHandleData>;
  /**
   * User's email for generating suggestions
   */
  userEmail?: string;
  /**
   * User's first name for generating suggestions
   */
  firstName?: string;
  /**
   * User's last name for generating suggestions
   */
  lastName?: string;
  /**
   * Callback when handle data changes
   */
  onChange?: (data: Partial<AuthHandleData>) => void;
  /**
   * Callback when handle is confirmed
   */
  onSubmit?: (data: AuthHandleData) => void | Promise<void>;
  /**
   * Whether form is in loading/submitting state
   */
  loading?: boolean;
  /**
   * Form validation errors
   */
  errors?: Partial<Record<keyof AuthHandleData, string>>;
  /**
   * Custom header content
   */
  header?: React.ReactNode;
  /**
   * Custom footer content
   */
  footer?: React.ReactNode;
  /**
   * Handle validation rules
   */
  handleRules?: {
    minLength?: number;
    maxLength?: number;
    allowedCharacters?: RegExp;
    reservedHandles?: string[];
  };
  /**
   * Whether to show handle suggestions
   */
  showSuggestions?: boolean;
  /**
   * Custom handle suggestions
   */
  suggestions?: HandleSuggestion[];
  /**
   * Whether to validate handle uniqueness
   */
  validateUnique?: boolean;
  /**
   * Handle prefix (e.g., "@")
   */
  handlePrefix?: string;
  /**
   * Custom help text
   */
  helpText?: string;
  /**
   * Whether to show handle preview
   */
  showPreview?: boolean;
}

/**
 * S-AuthHandle - Handle/username selection structure
 *
 * This structure allows users to choose a unique handle or username for their
 * account. It includes real-time availability checking, smart suggestions based
 * on user info, and comprehensive validation.
 *
 * Key features:
 * - Real-time handle availability checking
 * - Smart handle suggestions based on user data
 * - Comprehensive validation with custom rules
 * - Handle preview with availability status
 * - Support for handle prefixes (e.g., @username)
 * - Accessible form design with clear feedback
 * - Integration with enhanced TextField validation
 * - Professional handle recommendations
 *
 * @example
 * ```tsx
 * <SAuthHandle
 *   userEmail="john.doe@example.com"
 *   firstName="John"
 *   lastName="Doe"
 *   data={handleData}
 *   onChange={setHandleData}
 *   onSubmit={handleConfirmHandle}
 *   loading={isSubmitting}
 *   showSuggestions
 *   showPreview
 *   handlePrefix="@"
 *   validateUnique
 *   handleRules={{
 *     minLength: 3,
 *     maxLength: 20,
 *     allowedCharacters: /^[a-zA-Z0-9_-]+$/
 *   }}
 *   errors={validationErrors}
 * />
 * ```
 */
const SAuthHandle = React.forwardRef<HTMLDivElement, AuthHandleProps>(
  (
    {
      className,
      data = {},
      userEmail = '',
      firstName = '',
      lastName = '',
      onChange,
      onSubmit,
      loading = false,
      errors = {},
      header,
      footer,
      handleRules = {
        minLength: 3,
        maxLength: 20,
        allowedCharacters: /^[a-zA-Z0-9_-]+$/,
        reservedHandles: ['admin', 'root', 'api', 'www', 'mail', 'support', 'help', 'info', 'contact']
      },
      showSuggestions = true,
      suggestions: customSuggestions,
      validateUnique = true,
      handlePrefix = '@',
      helpText = 'Your handle is how others will find and mention you',
      showPreview = true,
      layout = 'default',
      alignment = 'center',
      ...props
    },
    ref
  ) => {
    const [formData, setFormData] = React.useState<Partial<AuthHandleData>>({
      handle: '',
      displayName: '',
      handleAvailable: undefined,
      ...data,
    });
    const [suggestions, setSuggestions] = React.useState<HandleSuggestion[]>([]);
    const [isValidating, setIsValidating] = React.useState(false);
    const [validationState, setValidationState] = React.useState<boolean | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Update form data when data prop changes
    React.useEffect(() => {
      setFormData(prev => ({ ...prev, ...data }));
    }, [data]);

    // Generate handle suggestions
    React.useEffect(() => {
      if (!showSuggestions || customSuggestions) {
        if (customSuggestions) setSuggestions(customSuggestions);
        return;
      }
      
      const generateSuggestions = () => {
        const baseSuggestions: string[] = [];
        
        // From email username
        if (userEmail) {
          const emailUser = userEmail.split('@')[0];
          baseSuggestions.push(emailUser);
          baseSuggestions.push(`${emailUser}${Math.floor(Math.random() * 100)}`);
        }
        
        // From first/last name
        if (firstName && lastName) {
          baseSuggestions.push(`${firstName.toLowerCase()}${lastName.toLowerCase()}`);
          baseSuggestions.push(`${firstName.toLowerCase()}_${lastName.toLowerCase()}`);
          baseSuggestions.push(`${firstName.toLowerCase()}-${lastName.toLowerCase()}`);
          baseSuggestions.push(`${firstName.toLowerCase()}${lastName.charAt(0).toLowerCase()}`);
          baseSuggestions.push(`${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}`);
        } else if (firstName) {
          baseSuggestions.push(`${firstName.toLowerCase()}`);
          baseSuggestions.push(`${firstName.toLowerCase()}${Math.floor(Math.random() * 1000)}`);
        }
        
        // Add some creative variations
        const creative = [
          `user${Math.floor(Math.random() * 10000)}`,
          `member${Math.floor(Math.random() * 1000)}`,
          `${firstName?.toLowerCase() || 'user'}${new Date().getFullYear()}`
        ];
        
        baseSuggestions.push(...creative);
        
        // Filter valid handles and remove duplicates
        const validSuggestions = [...new Set(baseSuggestions)]
          .filter(handle => {
            if (!handle) return false;
            const { minLength = 3, maxLength = 20, allowedCharacters } = handleRules;
            return handle.length >= minLength && 
                   handle.length <= maxLength && 
                   allowedCharacters?.test(handle);
          })
          .slice(0, 6)
          .map(handle => ({
            handle,
            available: true, // Will be checked async
            type: 'generated' as const
          }));
          
        setSuggestions(validSuggestions);
      };
      
      generateSuggestions();
    }, [userEmail, firstName, lastName, showSuggestions, customSuggestions, handleRules]);

    // Update parent component when form data changes
    const updateField = (field: keyof AuthHandleData, value: string | boolean) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);
      onChange?.(newData);
    };

    // Handle validation
    const validateHandle = (value: string): string | null => {
      if (!value) return null;
      
      const { minLength, maxLength, allowedCharacters, reservedHandles } = handleRules;
      
      if (minLength && value.length < minLength) {
        return `Handle must be at least ${minLength} characters`;
      }
      
      if (maxLength && value.length > maxLength) {
        return `Handle cannot exceed ${maxLength} characters`;
      }
      
      if (allowedCharacters && !allowedCharacters.test(value)) {
        return 'Handle can only contain letters, numbers, underscores, and hyphens';
      }
      
      if (reservedHandles?.includes(value.toLowerCase())) {
        return 'This handle is reserved and cannot be used';
      }
      
      return null;
    };

    // Check handle availability
    const checkHandleAvailability = async (value: string): Promise<string | null> => {
      if (!validateUnique) return null;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock unavailable handles
      const unavailableHandles = ['john', 'jane', 'admin', 'user', 'test', 'demo', 'example'];
      
      if (unavailableHandles.includes(value.toLowerCase())) {
        updateField('handleAvailable', false);
        return 'This handle is already taken';
      }
      
      updateField('handleAvailable', true);
      return null;
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toLowerCase().replace(/[^a-zA-Z0-9_-]/g, '');
      updateField('handle', value);
    };

    // Handle validation state changes
    const handleValidationChange = (isValid: boolean) => {
      setValidationState(isValid);
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion: HandleSuggestion) => {
      if (suggestion.available) {
        updateField('handle', suggestion.handle);
      }
    };

    // Handle form submission
    const handleSubmit = async (e?: React.FormEvent) => {
      e?.preventDefault();
      
      if (!formData.handle || !validationState) {
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        await onSubmit?.({
          handle: formData.handle,
          displayName: formData.displayName || formData.handle,
          handleAvailable: formData.handleAvailable,
        });
      } catch (error) {
        console.error('Handle submission failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const actualLoading = loading || isSubmitting;
    const canSubmit = formData.handle && validationState && formData.handleAvailable !== false;

    return (
      <div
        ref={ref}
        className={cn(authHandleVariants({ layout, alignment }), className)}
        {...props}
      >
        {/* Header */}
        {header || (
          <div className={cn(authHeaderVariants({ alignment }))}>
            <h1 className="text-2xl font-bold text-foreground">Choose Your Handle</h1>
            <p className="text-muted-foreground">
              Pick a unique handle that represents you
            </p>
          </div>
        )}

        {/* Handle Preview */}
        {showPreview && formData.handle && (
          <div className={cn(handlePreviewVariants({
            status: isValidating ? 'checking' : 
                   formData.handleAvailable === true ? 'available' :
                   formData.handleAvailable === false ? 'unavailable' : 'default'
          }))}>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Text size="sm" weight="medium" color="foreground">
                  Your handle will be:
                </Text>
                <div className="flex items-center gap-2">
                  <Text size="lg" weight="bold" color="foreground">
                    {handlePrefix}{formData.handle}
                  </Text>
                  {formData.handleAvailable === true && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      Available
                    </Badge>
                  )}
                  {formData.handleAvailable === false && (
                    <Badge variant="destructive" className="text-xs">
                      Taken
                    </Badge>
                  )}
                </div>
              </div>
              {isValidating && (
                <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
              )}
            </div>
          </div>
        )}

        {/* Handle Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Handle"
            value={formData.handle || ''}
            onChange={handleInputChange}
            required
            validate={validateHandle}
            validateAsync={validateUnique ? checkHandleAvailability : undefined}
            onValidationChange={handleValidationChange}
            validationDelay={600}
            error={errors.handle}
            disabled={actualLoading}
            placeholder="yourhandle"
            helperText={helpText}
            prefix={handlePrefix}
            autoComplete="username"
            maxLength={handleRules.maxLength}
          />

          {/* Handle Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="space-y-3">
              <Text size="sm" weight="medium" color="foreground">
                Suggestions:
              </Text>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={cn(handleSuggestionVariants({ 
                      status: suggestion.available ? 'available' : 'unavailable' 
                    }))}
                    disabled={!suggestion.available}
                  >
                    {handlePrefix}{suggestion.handle}
                    {suggestion.available && (
                      <svg className="inline-block ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!canSubmit || actualLoading}
            loading={actualLoading}
          >
            {actualLoading ? 'Confirming Handle...' : 'Confirm Handle'}
          </Button>
        </form>

        {/* Handle Guidelines */}
        <div className="space-y-2">
          <Text size="sm" weight="medium" color="foreground">
            Handle Guidelines:
          </Text>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• {handleRules.minLength}-{handleRules.maxLength} characters long</li>
            <li>• Letters, numbers, underscores (_), and hyphens (-) only</li>
            <li>• Must be unique across the platform</li>
            <li>• Cannot be changed later</li>
          </ul>
        </div>

        {/* Footer */}
        {footer}
      </div>
    );
  }
);

SAuthHandle.displayName = 'SAuthHandle';

export { SAuthHandle, authHandleVariants, authHeaderVariants, handlePreviewVariants, handleSuggestionVariants };
export type { AuthHandleData, HandleSuggestion };