import type { Meta, StoryObj } from '@storybook/react';
import { MAuthFlow } from './m-auth-flow';
import type { AuthFlowProps, AuthFlowState, AuthFlowType } from './m-auth-flow';

const meta: Meta<typeof MAuthFlow> = {
  title: 'Modules/M-AuthFlow',
  component: MAuthFlow,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# M-AuthFlow - Complete Authentication Flow State Machine

A comprehensive authentication flow orchestrator that manages sign-up, sign-in, and recovery flows using a state machine pattern. This module dynamically renders appropriate auth structures based on the current state and user selections.

## Features

- **State Machine Architecture**: Type-safe state transitions with comprehensive flow control
- **Dynamic Step Rendering**: Renders appropriate auth components based on current state
- **Multiple Flow Types**: Supports sign-up, sign-in, and recovery flows
- **Progress Persistence**: Saves progress in localStorage to resume interrupted flows
- **Flexible Path Configuration**: Express, comprehensive, or minimal onboarding paths
- **Error Handling**: Comprehensive error states with retry mechanisms
- **Skip/Back Navigation**: Contextual navigation where appropriate
- **Real-time Progress**: Visual progress tracking throughout the flow
- **Feature Flags**: Configurable features (passkeys, social connect, etc.)
- **Analytics Integration**: State change callbacks for tracking and debugging

## State Machine States

### Sign-Up Flow
- \`fork\` - Choose onboarding path (express/comprehensive/minimal)
- \`create-account\` - Initial account creation with email/password
- \`verify-contact\` - Email/phone verification with PIN
- \`choose-handle\` - Username/handle selection
- \`add-secondary\` - Optional backup contact (comprehensive path)
- \`setup-passkey\` - Optional passkey setup (comprehensive path)
- \`connect-socials\` - Optional social connections (comprehensive path)
- \`set-favorites\` - Initial preferences setup
- \`success\` - Completion state

### Sign-In Flow
- \`identify\` - Enter email/handle
- \`authenticate\` - Password/passkey authentication
- \`mfa-verify\` - Multi-factor authentication (if enabled)
- \`success\` - Completion state

### Recovery Flow
- \`recovery-identify\` - Identify account for recovery
- \`recovery-verify\` - Verify recovery method
- \`recovery-reset\` - Reset password/method
- \`success\` - Completion state

## Usage

\`\`\`tsx
<MAuthFlow
  flowType="sign-up"
  features={{
    passkeyEnabled: true,
    socialConnectEnabled: true,
    handleRequired: true,
    secondaryContactRequired: false,
    mfaEnabled: false
  }}
  onComplete={(context) => {
    console.log('Flow completed:', context);
    // Redirect to dashboard
  }}
  onError={(error, context) => {
    console.error('Flow error:', error);
    // Handle error
  }}
  showProgress
  persistProgress
  debug={process.env.NODE_ENV === 'development'}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    flowType: {
      control: { type: 'select' },
      options: ['sign-up', 'sign-in', 'recovery'],
      description: 'Type of authentication flow to run',
    },
    initialState: {
      control: { type: 'select' },
      options: [
        'fork',
        'create-account',
        'verify-contact',
        'choose-handle',
        'add-secondary',
        'setup-passkey',
        'connect-socials',
        'set-favorites',
        'identify',
        'authenticate',
        'mfa-verify',
        'recovery-identify',
        'recovery-verify',
        'recovery-reset',
        'success',
        'error',
      ],
      description: 'Initial state for resuming flows',
    },
    showProgress: {
      control: 'boolean',
      description: 'Whether to show progress indicator',
    },
    persistProgress: {
      control: 'boolean',
      description: 'Whether to persist progress in localStorage',
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug mode with state information',
    },
    layout: {
      control: { type: 'select' },
      options: ['default', 'fullscreen', 'centered'],
    },
    background: {
      control: { type: 'select' },
      options: ['default', 'gradient', 'branded'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MAuthFlow>;

// Default sign-up flow
export const Default: Story = {
  args: {
    flowType: 'sign-up',
    showProgress: true,
    persistProgress: false, // Disabled in Storybook
    debug: true,
    features: {
      passkeyEnabled: true,
      socialConnectEnabled: true,
      secondaryContactRequired: false,
      handleRequired: true,
      mfaEnabled: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default sign-up flow starting from the fork (path selection) step.',
      },
    },
  },
};

// Express sign-up path
export const ExpressSignUp: Story = {
  args: {
    ...Default.args,
    initialState: 'create-account',
    initialContext: {
      pathData: { selectedPath: 'express' },
      selectedPath: 'express',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Express sign-up path with minimal required steps for quick onboarding.',
      },
    },
  },
};

// Comprehensive sign-up path
export const ComprehensiveSignUp: Story = {
  args: {
    ...Default.args,
    initialState: 'create-account',
    initialContext: {
      pathData: { selectedPath: 'comprehensive' },
      selectedPath: 'comprehensive',
    },
    features: {
      passkeyEnabled: true,
      socialConnectEnabled: true,
      secondaryContactRequired: true,
      handleRequired: true,
      mfaEnabled: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive sign-up path with all security features and optional steps.',
      },
    },
  },
};

// Sign-in flow
export const SignIn: Story = {
  args: {
    flowType: 'sign-in',
    showProgress: true,
    persistProgress: false,
    debug: true,
    features: {
      mfaEnabled: false,
      passkeyEnabled: true,
      socialConnectEnabled: false,
      secondaryContactRequired: false,
      handleRequired: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Sign-in flow for existing users with email/password authentication.',
      },
    },
  },
};

// Sign-in with MFA
export const SignInWithMFA: Story = {
  args: {
    ...SignIn.args,
    features: {
      ...SignIn.args.features,
      mfaEnabled: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Sign-in flow with multi-factor authentication enabled.',
      },
    },
  },
};

// Recovery flow
export const Recovery: Story = {
  args: {
    flowType: 'recovery',
    showProgress: true,
    persistProgress: false,
    debug: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Password recovery flow for users who forgot their credentials.',
      },
    },
  },
};

// Resume from handle selection
export const ResumeFromHandle: Story = {
  args: {
    ...Default.args,
    initialState: 'choose-handle',
    initialContext: {
      pathData: { selectedPath: 'express' },
      selectedPath: 'express',
      accountData: {
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: '••••••••',
        confirmPassword: '••••••••',
        agreeToTerms: true,
      },
      contactData: {
        verificationCode: '123456',
        contactMethod: 'email',
        contactValue: 'john.doe@example.com',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Resume authentication flow from handle selection step with existing data.',
      },
    },
  },
};

// Success state
export const Success: Story = {
  args: {
    ...Default.args,
    initialState: 'success',
    initialContext: {
      pathData: { selectedPath: 'express' },
      selectedPath: 'express',
      accountData: {
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: '••••••••',
        confirmPassword: '••••••••',
        agreeToTerms: true,
      },
      handleData: {
        handle: 'johndoe',
        displayName: 'John Doe',
        handleAvailable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Success state shown when authentication flow completes successfully.',
      },
    },
  },
};

// Error state
export const Error: Story = {
  args: {
    ...Default.args,
    initialState: 'error',
    initialContext: {
      error: {
        message: 'Network connection failed. Please check your internet connection and try again.',
        code: 'NETWORK_ERROR',
      },
      retryCount: 1,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Error state with retry and exit options when something goes wrong.',
      },
    },
  },
};

// Custom auth paths
export const CustomAuthPaths: Story = {
  args: {
    ...Default.args,
    authPaths: [
      {
        id: 'developer',
        title: 'Developer Setup',
        description: 'Optimized for developers with advanced features',
        features: [
          'API key generation',
          'SSH key setup',
          'Advanced security settings',
          'Development environment integration'
        ],
        estimatedTime: '5 min',
        recommended: true,
        badge: 'Developer',
        icon: (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        ),
        steps: ['Create account', 'Verify email', 'Generate API keys', 'Configure SSH', 'Setup dev environment']
      },
      {
        id: 'business',
        title: 'Business Setup',
        description: 'Professional features for business users',
        features: [
          'Team management setup',
          'Billing configuration',
          'Compliance settings',
          'Enterprise integrations'
        ],
        estimatedTime: '7 min',
        badge: 'Business',
        icon: (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        ),
        steps: ['Create account', 'Verify business email', 'Setup team', 'Configure billing', 'Enterprise features']
      },
      {
        id: 'personal',
        title: 'Personal Use',
        description: 'Simple setup for personal projects',
        features: [
          'Basic account setup',
          'Personal preferences',
          'Privacy settings'
        ],
        estimatedTime: '2 min',
        icon: (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
        steps: ['Create account', 'Set preferences']
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom authentication paths tailored for different user types (developer, business, personal).',
      },
    },
  },
};

// Fullscreen layout
export const Fullscreen: Story = {
  args: {
    ...Default.args,
    layout: 'fullscreen',
    background: 'gradient',
  },
  parameters: {
    docs: {
      description: {
        story: 'Fullscreen layout with gradient background for immersive experience.',
      },
    },
  },
};

// Centered layout
export const Centered: Story = {
  args: {
    ...Default.args,
    layout: 'centered',
    background: 'branded',
  },
  parameters: {
    docs: {
      description: {
        story: 'Centered layout with branded background for marketing pages.',
      },
    },
  },
};

// No progress indicator
export const NoProgress: Story = {
  args: {
    ...Default.args,
    showProgress: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Authentication flow without progress indicator for cleaner UI.',
      },
    },
  },
};

// Interactive demo with all events
export const InteractiveDemo: Story = {
  args: {
    ...Default.args,
    debug: true,
  },
  play: async ({ canvasElement, step }) => {
    // This would be used for automated testing scenarios
    // For now, it serves as documentation of the interactive nature
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with debug mode enabled to see state machine transitions in real-time.',
      },
    },
  },
};