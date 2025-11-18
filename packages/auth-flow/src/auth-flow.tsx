import * as React from 'react';
import { cva, type VariantProps } from '@acrobi/primitives';
import { cn } from '@acrobi/primitives';

// Import existing auth structures
import { SAuthCreateAccount, type AuthCreateAccountData } from './screens/s-auth-create-account';
import { SAuthVerifyContact, type AuthVerifyContactData } from './screens/s-auth-verify-contact';
import { SAuthFork, type AuthForkData, type AuthForkPath } from './screens/s-auth-fork';
import { SAuthHandle, type AuthHandleData } from './screens/s-auth-handle';
import { SAuthAddSecondaryContact } from './screens/s-auth-add-secondary-contact';
import { SAuthPasskey } from './screens/s-auth-passkey';
import { SAuthConnectSocials } from './screens/s-auth-connect-socials';
import { SAuthSetFavorites } from './screens/s-auth-set-favorites';

/**
 * M-AuthFlow variant styles using Acrobi Design System classes
 * Complete authentication flow state machine
 */
const authFlowVariants = cva(
  'auth-flow w-full min-h-screen flex items-center justify-center',
  {
    variants: {
      layout: {
        default: 'p-4',
        fullscreen: 'p-0',
        centered: 'p-8',
      },
      background: {
        default: 'bg-background',
        gradient: 'bg-gradient-to-br from-background to-muted/20',
        branded: 'bg-gradient-to-br from-primary/5 to-background',
      },
    },
    defaultVariants: {
      layout: 'default',
      background: 'default',
    },
  }
);

const progressIndicatorVariants = cva(
  'progress-indicator flex items-center justify-center mb-8',
  {
    variants: {
      position: {
        top: 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
        inline: 'relative',
        hidden: 'hidden',
      },
    },
    defaultVariants: {
      position: 'inline',
    },
  }
);

// State machine types
export type AuthFlowState = 
  // Sign-up flow states
  | 'fork'              // Choose onboarding path
  | 'create-account'    // Initial account creation
  | 'verify-contact'    // Email/phone verification
  | 'choose-handle'     // Username selection
  | 'add-secondary'     // Optional backup contact
  | 'setup-passkey'     // Optional passkey setup
  | 'connect-socials'   // Optional social connections
  | 'set-favorites'     // Initial preferences
  | 'success'           // Completion state
  // Sign-in flow states
  | 'identify'          // Enter email/handle
  | 'authenticate'      // Password/passkey auth
  | 'mfa-verify'        // Multi-factor authentication
  // Recovery flow states
  | 'recovery-identify' // Identify account for recovery
  | 'recovery-verify'   // Verify recovery method
  | 'recovery-reset'    // Reset password/method
  // Error states
  | 'error'             // Error state
  | 'blocked';          // Account blocked state

export type AuthFlowType = 'sign-up' | 'sign-in' | 'recovery';

export type AuthFlowEvent = 
  | { type: 'START_SIGNUP' }
  | { type: 'START_SIGNIN' }
  | { type: 'START_RECOVERY' }
  | { type: 'SELECT_PATH'; payload: { pathId: string } }
  | { type: 'ACCOUNT_CREATED'; payload: AuthCreateAccountData }
  | { type: 'CONTACT_VERIFIED'; payload: AuthVerifyContactData }
  | { type: 'HANDLE_CHOSEN'; payload: AuthHandleData }
  | { type: 'SECONDARY_ADDED'; payload: any }
  | { type: 'PASSKEY_SETUP'; payload: any }
  | { type: 'SOCIALS_CONNECTED'; payload: any }
  | { type: 'FAVORITES_SET'; payload: any }
  | { type: 'IDENTITY_PROVIDED'; payload: { identifier: string } }
  | { type: 'AUTHENTICATION_SUCCESS'; payload: any }
  | { type: 'MFA_VERIFIED'; payload: any }
  | { type: 'RECOVERY_VERIFIED'; payload: any }
  | { type: 'PASSWORD_RESET'; payload: any }
  | { type: 'GO_BACK' }
  | { type: 'SKIP_STEP' }
  | { type: 'RETRY' }
  | { type: 'ERROR'; payload: { message: string; code?: string } }
  | { type: 'COMPLETE' };

export interface AuthFlowContext {
  // User data collected during flow
  accountData?: AuthCreateAccountData;
  contactData?: AuthVerifyContactData;
  handleData?: AuthHandleData;
  pathData?: AuthForkData;
  secondaryContactData?: any;
  passkeyData?: any;
  socialsData?: any;
  favoritesData?: any;
  
  // Flow metadata
  flowType: AuthFlowType;
  selectedPath?: string;
  steps: AuthFlowState[];
  currentStepIndex: number;
  
  // Error handling
  error?: { message: string; code?: string };
  retryCount: number;
  
  // Feature flags
  features: {
    passkeyEnabled: boolean;
    socialConnectEnabled: boolean;
    secondaryContactRequired: boolean;
    handleRequired: boolean;
    mfaEnabled: boolean;
  };
}

export interface AuthFlowMachine {
  state: AuthFlowState;
  context: AuthFlowContext;
  canGoBack: boolean;
  canSkip: boolean;
  progress: number;
}

export interface AuthFlowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof authFlowVariants> {
  /**
   * Initial flow type
   */
  flowType?: AuthFlowType;
  /**
   * Initial state (for resuming flows)
   */
  initialState?: AuthFlowState;
  /**
   * Initial context data (for resuming flows)
   */
  initialContext?: Partial<AuthFlowContext>;
  /**
   * Available authentication paths for fork step
   */
  authPaths?: AuthForkPath[];
  /**
   * Feature configuration
   */
  features?: Partial<AuthFlowContext['features']>;
  /**
   * Callback when flow completes successfully
   */
  onComplete?: (context: AuthFlowContext) => void | Promise<void>;
  /**
   * Callback when flow encounters an error
   */
  onError?: (error: { message: string; code?: string }, context: AuthFlowContext) => void;
  /**
   * Callback when user exits the flow
   */
  onExit?: (context: AuthFlowContext) => void;
  /**
   * Callback for state changes (for analytics/debugging)
   */
  onStateChange?: (machine: AuthFlowMachine) => void;
  /**
   * Whether to show progress indicator
   */
  showProgress?: boolean;
  /**
   * Whether to persist progress in localStorage
   */
  persistProgress?: boolean;
  /**
   * Storage key for progress persistence
   */
  storageKey?: string;
  /**
   * Custom step configurations
   */
  stepConfig?: Record<AuthFlowState, {
    required?: boolean;
    skippable?: boolean;
    title?: string;
    description?: string;
  }>;
  /**
   * Whether to enable debug mode
   */
  debug?: boolean;
}

/**
 * M-AuthFlow - Complete authentication flow state machine
 *
 * This module orchestrates the entire authentication experience using a state machine
 * pattern. It manages sign-up, sign-in, and recovery flows with dynamic step rendering
 * based on the current state and user selections.
 *
 * Key features:
 * - State machine-driven flow control with type safety
 * - Dynamic step rendering based on current state
 * - Progress persistence across browser sessions
 * - Flexible path configuration (express vs comprehensive)
 * - Error handling and retry mechanisms
 * - Skip/back navigation where appropriate
 * - Real-time progress tracking
 * - Integration with all existing auth structures
 * - Comprehensive context management
 * - Analytics and debugging support
 *
 * @example
 * ```tsx
 * <MAuthFlow
 *   flowType="sign-up"
 *   features={{
 *     passkeyEnabled: true,
 *     socialConnectEnabled: true,
 *     handleRequired: true
 *   }}
 *   onComplete={(context) => {
 *     console.log('User registered:', context.accountData);
 *     router.push('/dashboard');
 *   }}
 *   onError={(error) => {
 *     console.error('Auth flow error:', error);
 *   }}
 *   showProgress
 *   persistProgress
 *   authPaths={customAuthPaths}
 * />
 * ```
 */
const MAuthFlow = React.forwardRef<HTMLDivElement, AuthFlowProps>(
  (
    {
      className,
      flowType = 'sign-up',
      initialState,
      initialContext,
      authPaths,
      features: featureConfig,
      onComplete,
      onError,
      onExit,
      onStateChange,
      showProgress = true,
      persistProgress = true,
      storageKey = 'acrobi-auth-flow',
      stepConfig = {},
      debug = false,
      layout = 'default',
      background = 'default',
      ...props
    },
    ref
  ) => {
    // Default features configuration
    const defaultFeatures: AuthFlowContext['features'] = {
      passkeyEnabled: true,
      socialConnectEnabled: true,
      secondaryContactRequired: false,
      handleRequired: true,
      mfaEnabled: false,
    };

    // Initialize state machine
    const initializeMachine = (): AuthFlowMachine => {
      const features = { ...defaultFeatures, ...featureConfig };
      
      // Define flow steps based on type and features
      const getFlowSteps = (type: AuthFlowType, path?: string): AuthFlowState[] => {
        switch (type) {
          case 'sign-up':
            const baseSteps: AuthFlowState[] = ['fork', 'create-account', 'verify-contact'];
            
            if (features.handleRequired) baseSteps.push('choose-handle');
            
            // Add optional steps based on selected path
            if (path === 'comprehensive') {
              if (features.secondaryContactRequired) baseSteps.push('add-secondary');
              if (features.passkeyEnabled) baseSteps.push('setup-passkey');
              if (features.socialConnectEnabled) baseSteps.push('connect-socials');
              baseSteps.push('set-favorites');
            } else if (path === 'express') {
              baseSteps.push('set-favorites');
            }
            // minimal path skips optional steps
            
            baseSteps.push('success');
            return baseSteps;
            
          case 'sign-in':
            const signInSteps: AuthFlowState[] = ['identify', 'authenticate'];
            if (features.mfaEnabled) signInSteps.push('mfa-verify');
            signInSteps.push('success');
            return signInSteps;
            
          case 'recovery':
            return ['recovery-identify', 'recovery-verify', 'recovery-reset', 'success'];
            
          default:
            return ['error'];
        }
      };

      const steps = getFlowSteps(flowType);
      const state = initialState || steps[0];
      const currentStepIndex = steps.indexOf(state);

      const context: AuthFlowContext = {
        flowType,
        steps,
        currentStepIndex: Math.max(0, currentStepIndex),
        retryCount: 0,
        features,
        ...initialContext,
      };

      return {
        state,
        context,
        canGoBack: currentStepIndex > 0,
        canSkip: stepConfig[state]?.skippable ?? false,
        progress: ((currentStepIndex + 1) / steps.length) * 100,
      };
    };

    const [machine, setMachine] = React.useState<AuthFlowMachine>(() => {
      // Try to restore from localStorage if enabled
      if (persistProgress && typeof window !== 'undefined') {
        try {
          const saved = localStorage.getItem(storageKey);
          if (saved) {
            const parsed = JSON.parse(saved);
            return { ...initializeMachine(), ...parsed };
          }
        } catch (error) {
          console.warn('Failed to restore auth flow progress:', error);
        }
      }
      return initializeMachine();
    });

    // Persist machine state to localStorage
    React.useEffect(() => {
      if (persistProgress && typeof window !== 'undefined') {
        try {
          localStorage.setItem(storageKey, JSON.stringify(machine));
        } catch (error) {
          console.warn('Failed to persist auth flow progress:', error);
        }
      }
    }, [machine, persistProgress, storageKey]);

    // Notify parent of state changes
    React.useEffect(() => {
      onStateChange?.(machine);
      if (debug) {
        console.log('Auth Flow State Change:', machine);
      }
    }, [machine, onStateChange, debug]);

    // State transition function
    const transition = React.useCallback((event: AuthFlowEvent) => {
      setMachine(currentMachine => {
        const { state, context } = currentMachine;
        let newState = state;
        let newContext = { ...context };

        // Handle global events
        switch (event.type) {
          case 'GO_BACK':
            if (currentMachine.canGoBack) {
              const newIndex = Math.max(0, context.currentStepIndex - 1);
              newState = context.steps[newIndex];
              newContext.currentStepIndex = newIndex;
            }
            break;

          case 'SKIP_STEP':
            if (currentMachine.canSkip) {
              const newIndex = Math.min(context.steps.length - 1, context.currentStepIndex + 1);
              newState = context.steps[newIndex];
              newContext.currentStepIndex = newIndex;
            }
            break;

          case 'ERROR':
            newState = 'error';
            newContext.error = event.payload;
            newContext.retryCount += 1;
            break;

          case 'RETRY':
            newContext.retryCount = 0;
            newContext.error = undefined;
            // Go back to the step that failed
            break;

          default:
            // Handle state-specific transitions
            switch (state) {
              case 'fork':
                if (event.type === 'SELECT_PATH') {
                  newContext.pathData = { selectedPath: event.payload.pathId };
                  newContext.selectedPath = event.payload.pathId;
                  
                  // Recalculate steps based on selected path
                  const getFlowSteps = (type: AuthFlowType, path?: string): AuthFlowState[] => {
                    switch (type) {
                      case 'sign-up':
                        const baseSteps: AuthFlowState[] = ['fork', 'create-account', 'verify-contact'];
                        
                        if (context.features.handleRequired) baseSteps.push('choose-handle');
                        
                        if (path === 'comprehensive') {
                          if (context.features.secondaryContactRequired) baseSteps.push('add-secondary');
                          if (context.features.passkeyEnabled) baseSteps.push('setup-passkey');
                          if (context.features.socialConnectEnabled) baseSteps.push('connect-socials');
                          baseSteps.push('set-favorites');
                        } else if (path === 'express') {
                          baseSteps.push('set-favorites');
                        }
                        
                        baseSteps.push('success');
                        return baseSteps;
                      default:
                        return context.steps;
                    }
                  };
                  
                  newContext.steps = getFlowSteps(context.flowType, event.payload.pathId);
                  const nextIndex = newContext.currentStepIndex + 1;
                  newState = newContext.steps[nextIndex];
                  newContext.currentStepIndex = nextIndex;
                }
                break;

              case 'create-account':
                if (event.type === 'ACCOUNT_CREATED') {
                  newContext.accountData = event.payload;
                  const nextIndex = newContext.currentStepIndex + 1;
                  newState = newContext.steps[nextIndex];
                  newContext.currentStepIndex = nextIndex;
                }
                break;

              case 'verify-contact':
                if (event.type === 'CONTACT_VERIFIED') {
                  newContext.contactData = event.payload;
                  const nextIndex = newContext.currentStepIndex + 1;
                  newState = newContext.steps[nextIndex];
                  newContext.currentStepIndex = nextIndex;
                }
                break;

              case 'choose-handle':
                if (event.type === 'HANDLE_CHOSEN') {
                  newContext.handleData = event.payload;
                  const nextIndex = newContext.currentStepIndex + 1;
                  newState = newContext.steps[nextIndex];
                  newContext.currentStepIndex = nextIndex;
                }
                break;

              case 'add-secondary':
                if (event.type === 'SECONDARY_ADDED' || event.type === 'SKIP_STEP') {
                  if (event.type === 'SECONDARY_ADDED') {
                    newContext.secondaryContactData = event.payload;
                  }
                  const nextIndex = newContext.currentStepIndex + 1;
                  newState = newContext.steps[nextIndex];
                  newContext.currentStepIndex = nextIndex;
                }
                break;

              case 'setup-passkey':
                if (event.type === 'PASSKEY_SETUP' || event.type === 'SKIP_STEP') {
                  if (event.type === 'PASSKEY_SETUP') {
                    newContext.passkeyData = event.payload;
                  }
                  const nextIndex = newContext.currentStepIndex + 1;
                  newState = newContext.steps[nextIndex];
                  newContext.currentStepIndex = nextIndex;
                }
                break;

              case 'connect-socials':
                if (event.type === 'SOCIALS_CONNECTED' || event.type === 'SKIP_STEP') {
                  if (event.type === 'SOCIALS_CONNECTED') {
                    newContext.socialsData = event.payload;
                  }
                  const nextIndex = newContext.currentStepIndex + 1;
                  newState = newContext.steps[nextIndex];
                  newContext.currentStepIndex = nextIndex;
                }
                break;

              case 'set-favorites':
                if (event.type === 'FAVORITES_SET' || event.type === 'SKIP_STEP') {
                  if (event.type === 'FAVORITES_SET') {
                    newContext.favoritesData = event.payload;
                  }
                  const nextIndex = newContext.currentStepIndex + 1;
                  newState = newContext.steps[nextIndex];
                  newContext.currentStepIndex = nextIndex;
                }
                break;

              case 'identify':
                if (event.type === 'IDENTITY_PROVIDED') {
                  const nextIndex = newContext.currentStepIndex + 1;
                  newState = newContext.steps[nextIndex];
                  newContext.currentStepIndex = nextIndex;
                }
                break;

              case 'authenticate':
                if (event.type === 'AUTHENTICATION_SUCCESS') {
                  const nextIndex = newContext.currentStepIndex + 1;
                  newState = newContext.steps[nextIndex];
                  newContext.currentStepIndex = nextIndex;
                }
                break;

              case 'success':
                if (event.type === 'COMPLETE') {
                  onComplete?.(newContext);
                }
                break;
            }
        }

        // Calculate new machine state
        const newMachine: AuthFlowMachine = {
          state: newState,
          context: newContext,
          canGoBack: newContext.currentStepIndex > 0,
          canSkip: stepConfig[newState]?.skippable ?? false,
          progress: ((newContext.currentStepIndex + 1) / newContext.steps.length) * 100,
        };

        return newMachine;
      });
    }, [onComplete, stepConfig]);

    // Error handler
    const handleError = React.useCallback((error: { message: string; code?: string }) => {
      onError?.(error, machine.context);
      transition({ type: 'ERROR', payload: error });
    }, [onError, machine.context, transition]);

    // Render current step component
    const renderCurrentStep = () => {
      const { state, context } = machine;

      const commonProps = {
        onError: handleError,
      };

      switch (state) {
        case 'fork':
          return (
            <SAuthFork
              data={context.pathData}
              paths={authPaths}
              onChange={(data) => {
                // Update context immediately for UI feedback
                setMachine(prev => ({
                  ...prev,
                  context: { ...prev.context, pathData: data }
                }));
              }}
              onConfirm={(pathId, data) => {
                transition({ type: 'SELECT_PATH', payload: { pathId } });
              }}
              {...commonProps}
            />
          );

        case 'create-account':
          return (
            <SAuthCreateAccount
              data={context.accountData}
              onChange={(data) => {
                setMachine(prev => ({
                  ...prev,
                  context: { ...prev.context, accountData: data }
                }));
              }}
              onSubmit={(data) => {
                transition({ type: 'ACCOUNT_CREATED', payload: data });
              }}
              collectPhone={context.selectedPath === 'comprehensive'}
              collectName={true}
              showNewsletterOption={context.selectedPath !== 'minimal'}
              {...commonProps}
            />
          );

        case 'verify-contact':
          return (
            <SAuthVerifyContact
              contactMethod={context.accountData?.phone ? 'phone' : 'email'}
              contactValue={context.accountData?.phone || context.accountData?.email || ''}
              verificationCode={context.contactData?.verificationCode || ''}
              onChange={(code) => {
                setMachine(prev => ({
                  ...prev,
                  context: { 
                    ...prev.context, 
                    contactData: { ...prev.context.contactData, verificationCode: code }
                  }
                }));
              }}
              onVerify={(data) => {
                transition({ type: 'CONTACT_VERIFIED', payload: data });
              }}
              onResendCode={async () => {
                // Handle resend logic
                console.log('Resending verification code...');
              }}
              autoSubmit
              {...commonProps}
            />
          );

        case 'choose-handle':
          return (
            <SAuthHandle
              data={context.handleData}
              userEmail={context.accountData?.email}
              firstName={context.accountData?.firstName}
              lastName={context.accountData?.lastName}
              onChange={(data) => {
                setMachine(prev => ({
                  ...prev,
                  context: { ...prev.context, handleData: data }
                }));
              }}
              onSubmit={(data) => {
                transition({ type: 'HANDLE_CHOSEN', payload: data });
              }}
              showSuggestions
              showPreview
              validateUnique
              {...commonProps}
            />
          );

        case 'add-secondary':
          return (
            <SAuthAddSecondaryContact
              onSubmit={(data) => {
                transition({ type: 'SECONDARY_ADDED', payload: data });
              }}
              onSkip={() => {
                transition({ type: 'SKIP_STEP' });
              }}
              {...commonProps}
            />
          );

        case 'setup-passkey':
          return (
            <SAuthPasskey
              onSubmit={(data) => {
                transition({ type: 'PASSKEY_SETUP', payload: data });
              }}
              onSkip={() => {
                transition({ type: 'SKIP_STEP' });
              }}
              {...commonProps}
            />
          );

        case 'connect-socials':
          return (
            <SAuthConnectSocials
              onSubmit={(data) => {
                transition({ type: 'SOCIALS_CONNECTED', payload: data });
              }}
              onSkip={() => {
                transition({ type: 'SKIP_STEP' });
              }}
              {...commonProps}
            />
          );

        case 'set-favorites':
          return (
            <SAuthSetFavorites
              onSubmit={(data) => {
                transition({ type: 'FAVORITES_SET', payload: data });
              }}
              onSkip={() => {
                transition({ type: 'SKIP_STEP' });
              }}
              {...commonProps}
            />
          );

        case 'success':
          return (
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-foreground">Welcome to Acrobi!</h1>
                <p className="text-muted-foreground">
                  Your account has been created successfully. You're ready to get started.
                </p>
              </div>
              <button
                onClick={() => transition({ type: 'COMPLETE' })}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started
              </button>
            </div>
          );

        case 'error':
          return (
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
                <p className="text-muted-foreground">
                  {context.error?.message || 'An unexpected error occurred. Please try again.'}
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => transition({ type: 'RETRY' })}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => onExit?.(context)}
                  className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  Exit
                </button>
              </div>
            </div>
          );

        default:
          return (
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold text-foreground">Unknown State</h1>
              <p className="text-muted-foreground">
                The authentication flow encountered an unknown state: {state}
              </p>
            </div>
          );
      }
    };

    // Progress indicator component
    const ProgressIndicator = () => {
      if (!showProgress) return null;

      return (
        <div className={cn(progressIndicatorVariants({ position: 'inline' }))}>
          <div className="flex items-center space-x-4 p-4 bg-card rounded-lg border">
            <div className="text-sm text-muted-foreground">
              Step {machine.context.currentStepIndex + 1} of {machine.context.steps.length}
            </div>
            <div className="flex-1 bg-muted rounded-full h-2 w-48">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${machine.progress}%` }}
              />
            </div>
            <div className="text-sm font-medium text-foreground">
              {Math.round(machine.progress)}%
            </div>
          </div>
        </div>
      );
    };

    // Navigation buttons
    const NavigationButtons = () => {
      const showBack = machine.canGoBack && machine.state !== 'success' && machine.state !== 'error';
      const showSkip = machine.canSkip && machine.state !== 'success' && machine.state !== 'error';

      if (!showBack && !showSkip) return null;

      return (
        <div className="flex justify-between mt-6">
          {showBack ? (
            <button
              onClick={() => transition({ type: 'GO_BACK' })}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back
            </button>
          ) : <div />}
          
          {showSkip && (
            <button
              onClick={() => transition({ type: 'SKIP_STEP' })}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now →
            </button>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(authFlowVariants({ layout, background }), className)}
        {...props}
      >
        <div className="w-full max-w-md mx-auto space-y-6">
          <ProgressIndicator />
          {renderCurrentStep()}
          <NavigationButtons />
          
          {/* Debug Panel */}
          {debug && (
            <div className="mt-8 p-4 bg-muted rounded-lg text-xs">
              <div className="font-mono space-y-2">
                <div><strong>State:</strong> {machine.state}</div>
                <div><strong>Progress:</strong> {machine.progress.toFixed(1)}%</div>
                <div><strong>Can Go Back:</strong> {machine.canGoBack.toString()}</div>
                <div><strong>Can Skip:</strong> {machine.canSkip.toString()}</div>
                <div><strong>Steps:</strong> {machine.context.steps.join(' → ')}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

MAuthFlow.displayName = 'MAuthFlow';

export { MAuthFlow, authFlowVariants, progressIndicatorVariants };
export type { 
  AuthFlowState, 
  AuthFlowType, 
  AuthFlowEvent, 
  AuthFlowContext, 
  AuthFlowMachine 
};