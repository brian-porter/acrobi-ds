import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';
import { Text } from '../primitives/text';
import { Card } from '../primitives/card';
import { Badge } from '../primitives/badge';

/**
 * S-AuthPasskey variant styles using Acrobi Design System classes
 * Passkey setup structure for passwordless authentication
 */
const authPasskeyVariants = cva(
  'auth-passkey w-full max-w-md mx-auto space-y-6',
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
      step: {
        intro: '',
        creating: '',
        success: '',
        error: '',
      },
    },
    defaultVariants: {
      layout: 'default',
      alignment: 'center',
      step: 'intro',
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

const passkeyFeatureCardVariants = cva(
  'passkey-feature-card p-4 rounded-lg border bg-card space-y-3',
  {
    variants: {
      variant: {
        default: 'border-border',
        highlight: 'border-primary bg-primary/5',
        success: 'border-green-200 bg-green-50',
        error: 'border-destructive bg-destructive/5',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const passkeyStepIndicatorVariants = cva(
  'passkey-step-indicator flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium',
  {
    variants: {
      status: {
        pending: 'bg-muted text-muted-foreground',
        active: 'bg-primary text-primary-foreground animate-pulse',
        success: 'bg-green-600 text-white',
        error: 'bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      status: 'pending',
    },
  }
);

export interface PasskeyCredential {
  id: string;
  type: string;
  rawId: ArrayBuffer;
  response: {
    clientDataJSON: ArrayBuffer;
    attestationObject: ArrayBuffer;
  };
}

export interface AuthPasskeyData {
  passkeyEnabled: boolean;
  passkeyCredential?: PasskeyCredential;
  deviceName?: string;
  skipPasskey?: boolean;
}

export interface AuthPasskeyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof authPasskeyVariants> {
  /**
   * Current passkey setup data
   */
  data?: Partial<AuthPasskeyData>;
  /**
   * User's email for passkey creation
   */
  userEmail: string;
  /**
   * User's display name for passkey
   */
  userDisplayName?: string;
  /**
   * Callback when passkey data changes
   */
  onChange?: (data: Partial<AuthPasskeyData>) => void;
  /**
   * Callback when passkey is successfully created
   */
  onPasskeyCreated?: (data: AuthPasskeyData) => void | Promise<void>;
  /**
   * Callback when user chooses to skip passkey setup
   */
  onSkip?: () => void;
  /**
   * Whether passkey creation is in progress
   */
  loading?: boolean;
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
   * Whether to allow skipping passkey setup
   */
  allowSkip?: boolean;
  /**
   * Whether to show advanced passkey information
   */
  showAdvancedInfo?: boolean;
  /**
   * Custom benefits text for passkey
   */
  benefitsText?: string[];
  /**
   * Server challenge for passkey creation
   */
  challenge?: string;
  /**
   * Relying party information
   */
  relyingParty?: {
    id: string;
    name: string;
  };
}

/**
 * S-AuthPasskey - Passkey setup structure
 *
 * This structure guides users through setting up a passkey for passwordless
 * authentication. It provides clear benefits messaging, handles WebAuthn API
 * interactions, and offers graceful fallbacks for unsupported devices.
 *
 * Key features:
 * - WebAuthn/FIDO2 passkey creation flow
 * - Clear benefits and security messaging
 * - Device compatibility checking
 * - Step-by-step visual progress
 * - Option to skip for later setup
 * - Responsive design with feature cards
 * - Accessibility-first implementation
 * - Error handling for unsupported devices
 *
 * @example
 * ```tsx
 * <SAuthPasskey
 *   userEmail="user@example.com"
 *   userDisplayName="John Doe"
 *   data={passkeyData}
 *   onChange={setPasskeyData}
 *   onPasskeyCreated={handlePasskeyCreated}
 *   onSkip={handleSkip}
 *   loading={isCreatingPasskey}
 *   allowSkip
 *   showAdvancedInfo
 *   challenge={serverChallenge}
 *   relyingParty={{
 *     id: "example.com",
 *     name: "Example App"
 *   }}
 *   error={passkeyError}
 *   success={passkeySuccess}
 * />
 * ```
 */
const SAuthPasskey = React.forwardRef<HTMLDivElement, AuthPasskeyProps>(
  (
    {
      className,
      data = {},
      userEmail,
      userDisplayName = userEmail.split('@')[0],
      onChange,
      onPasskeyCreated,
      onSkip,
      loading = false,
      error,
      success,
      header,
      footer,
      allowSkip = true,
      showAdvancedInfo = false,
      benefitsText = [
        'Sign in faster without typing passwords',
        'Enhanced security with biometric authentication',
        'Works with Face ID, Touch ID, Windows Hello, and security keys',
        'Resistant to phishing and account takeover attacks'
      ],
      challenge,
      relyingParty = {
        id: window?.location?.hostname || 'localhost',
        name: 'Acrobi'
      },
      layout = 'default',
      alignment = 'center',
      step = 'intro',
      ...props
    },
    ref
  ) => {
    const [formData, setFormData] = React.useState<Partial<AuthPasskeyData>>({
      passkeyEnabled: false,
      skipPasskey: false,
      ...data,
    });
    const [currentStep, setCurrentStep] = React.useState<'intro' | 'creating' | 'success' | 'error'>('intro');
    const [isCreating, setIsCreating] = React.useState(false);
    const [isSupported, setIsSupported] = React.useState<boolean | null>(null);
    const [deviceInfo, setDeviceInfo] = React.useState<string>('');

    // Update form data when data prop changes
    React.useEffect(() => {
      setFormData(prev => ({ ...prev, ...data }));
    }, [data]);

    // Check WebAuthn support
    React.useEffect(() => {
      const checkSupport = async () => {
        if (!window.PublicKeyCredential) {
          setIsSupported(false);
          return;
        }

        try {
          const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
          setIsSupported(available);
          
          // Detect device type for better messaging
          const userAgent = navigator.userAgent;
          if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
            setDeviceInfo('Face ID or Touch ID');
          } else if (userAgent.includes('Mac')) {
            setDeviceInfo('Touch ID');
          } else if (userAgent.includes('Windows')) {
            setDeviceInfo('Windows Hello');
          } else if (userAgent.includes('Android')) {
            setDeviceInfo('fingerprint or face unlock');
          } else {
            setDeviceInfo('biometric authentication');
          }
        } catch (err) {
          setIsSupported(false);
        }
      };

      checkSupport();
    }, []);

    // Update parent component when form data changes
    const updateField = (field: keyof AuthPasskeyData, value: any) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);
      onChange?.(newData);
    };

    // Generate random challenge if not provided
    const getChallenge = (): Uint8Array => {
      if (challenge) {
        return new TextEncoder().encode(challenge);
      }
      
      // Generate random 32-byte challenge
      const challengeArray = new Uint8Array(32);
      crypto.getRandomValues(challengeArray);
      return challengeArray;
    };

    // Generate user ID
    const getUserId = (): Uint8Array => {
      return new TextEncoder().encode(userEmail);
    };

    // Create passkey
    const handleCreatePasskey = async () => {
      if (!isSupported) {
        setCurrentStep('error');
        return;
      }

      setIsCreating(true);
      setCurrentStep('creating');

      try {
        const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
          challenge: getChallenge(),
          rp: relyingParty,
          user: {
            id: getUserId(),
            name: userEmail,
            displayName: userDisplayName,
          },
          pubKeyCredParams: [
            { alg: -7, type: "public-key" }, // ES256
            { alg: -257, type: "public-key" }, // RS256
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
            requireResidentKey: true,
          },
          timeout: 60000,
          attestation: "direct"
        };

        const credential = await navigator.credentials.create({
          publicKey: publicKeyCredentialCreationOptions
        }) as PublicKeyCredential;

        if (!credential) {
          throw new Error('Failed to create passkey');
        }

        const passkeyData: AuthPasskeyData = {
          passkeyEnabled: true,
          passkeyCredential: {
            id: credential.id,
            type: credential.type,
            rawId: credential.rawId,
            response: {
              clientDataJSON: (credential.response as AuthenticatorAttestationResponse).clientDataJSON,
              attestationObject: (credential.response as AuthenticatorAttestationResponse).attestationObject,
            }
          },
          deviceName: deviceInfo,
        };

        updateField('passkeyEnabled', true);
        updateField('passkeyCredential', passkeyData.passkeyCredential);
        updateField('deviceName', deviceInfo);

        setCurrentStep('success');
        await onPasskeyCreated?.(passkeyData);

      } catch (err: any) {
        console.error('Passkey creation failed:', err);
        setCurrentStep('error');
        
        // Handle specific error cases
        if (err.name === 'NotSupportedError') {
          // Handle unsupported device
        } else if (err.name === 'NotAllowedError') {
          // Handle user cancellation
        } else {
          // Handle other errors
        }
      } finally {
        setIsCreating(false);
      }
    };

    // Handle skip
    const handleSkip = () => {
      updateField('skipPasskey', true);
      onSkip?.();
    };

    // Handle try again
    const handleTryAgain = () => {
      setCurrentStep('intro');
    };

    const actualLoading = loading || isCreating;

    // Render different content based on current step
    const renderContent = () => {
      switch (currentStep) {
        case 'creating':
          return (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className={cn(passkeyStepIndicatorVariants({ status: 'active' }))}>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-lg font-semibold">Creating Your Passkey</h2>
                  <p className="text-sm text-muted-foreground">
                    Please use your {deviceInfo} when prompted by your device
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <Text size="sm" color="foreground">
                    Follow your device's prompts to complete setup
                  </Text>
                </div>
              </div>
            </div>
          );
          
        case 'success':
          return (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className={cn(passkeyStepIndicatorVariants({ status: 'success' }))}>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-lg font-semibold text-green-600">Passkey Created Successfully!</h2>
                  <p className="text-sm text-muted-foreground">
                    You can now sign in using your {deviceInfo}
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <Text size="sm" weight="medium" color="foreground">
                      Passkey saved to this device
                    </Text>
                  </div>
                  <Text size="xs" color="muted">
                    Device: {deviceInfo}
                  </Text>
                </div>
              </div>
              
              <Button
                type="button"
                className="w-full"
                onClick={() => onPasskeyCreated?.(formData as AuthPasskeyData)}
              >
                Continue
              </Button>
            </div>
          );
          
        case 'error':
          return (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className={cn(passkeyStepIndicatorVariants({ status: 'error' }))}>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-lg font-semibold text-destructive">Passkey Setup Failed</h2>
                  <p className="text-sm text-muted-foreground">
                    {error || 'Unable to create passkey on this device'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleTryAgain}
                >
                  Try Again
                </Button>
                
                {allowSkip && (
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="w-full text-sm text-muted-foreground hover:text-foreground underline"
                  >
                    Skip and use password instead
                  </button>
                )}
              </div>
            </div>
          );
          
        default: // intro
          return (
            <div className="space-y-6">
              {/* Passkey Benefits */}
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Recommended
                  </Badge>
                </div>
                
                <ul className="space-y-3">
                  {benefitsText.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <Text size="sm" color="foreground">
                        {benefit}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Device Support Info */}
              {isSupported !== null && (
                <div className={cn(passkeyFeatureCardVariants({
                  variant: isSupported ? 'highlight' : 'error'
                }))}>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {isSupported ? (
                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <Text size="sm" weight="medium" color="foreground">
                        {isSupported 
                          ? `${deviceInfo} available on this device`
                          : 'Passkeys not supported on this device'
                        }
                      </Text>
                      {!isSupported && (
                        <Text size="xs" color="muted">
                          You can still use a password to sign in
                        </Text>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleCreatePasskey}
                  disabled={!isSupported || actualLoading}
                  loading={actualLoading}
                >
                  {actualLoading ? 'Setting up...' : 'Set Up Passkey'}
                </Button>

                {allowSkip && (
                  <button
                    type="button"
                    onClick={handleSkip}
                    disabled={actualLoading}
                    className="w-full text-sm text-muted-foreground hover:text-foreground underline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Skip and use password instead
                  </button>
                )}
              </div>

              {/* Advanced Info */}
              {showAdvancedInfo && isSupported && (
                <details className="text-xs text-muted-foreground">
                  <summary className="cursor-pointer hover:text-foreground">
                    Technical Details
                  </summary>
                  <div className="mt-2 space-y-1">
                    <p>• Uses FIDO2/WebAuthn standard</p>
                    <p>• Credential stored securely on device</p>
                    <p>• Private key never leaves your device</p>
                    <p>• Resistant to phishing attacks</p>
                  </div>
                </details>
              )}
            </div>
          );
      }
    };

    return (
      <div
        ref={ref}
        className={cn(authPasskeyVariants({ layout, alignment, step: currentStep }), className)}
        {...props}
      >
        {/* Header */}
        {header || (
          <div className={cn(authHeaderVariants({ alignment }))}>
            <h1 className="text-2xl font-bold text-foreground">Set Up Passkey</h1>
            <p className="text-muted-foreground">
              Enable passwordless sign-in for faster and more secure access
            </p>
          </div>
        )}

        {/* Dynamic Content */}
        {renderContent()}

        {/* Footer */}
        {footer}
      </div>
    );
  }
);

SAuthPasskey.displayName = 'SAuthPasskey';

export { SAuthPasskey, authPasskeyVariants, authHeaderVariants, passkeyFeatureCardVariants, passkeyStepIndicatorVariants };
export type { AuthPasskeyData, PasskeyCredential };