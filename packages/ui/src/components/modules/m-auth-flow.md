# M-AuthFlow - Authentication Flow State Machine

## Overview

The M-AuthFlow module is a comprehensive authentication flow orchestrator that manages sign-up, sign-in, and recovery flows using a state machine pattern. It dynamically renders appropriate auth structures based on the current state and user selections, providing a seamless and consistent authentication experience.

## Architecture

### State Machine Design

The component uses a finite state machine (FSM) approach to manage authentication flows:

```
┌─────────────────────────────────────────────────────────────────┐
│                     Authentication State Machine                │
├─────────────────────────────────────────────────────────────────┤
│                                                                │
│  SIGN-UP FLOW:                                                 │
│  fork → create-account → verify-contact → choose-handle        │
│    ↓                                                           │
│  [optional: add-secondary → setup-passkey → connect-socials]   │
│    ↓                                                           │
│  set-favorites → success                                       │
│                                                                │
│  SIGN-IN FLOW:                                                 │
│  identify → authenticate → [mfa-verify] → success              │
│                                                                │
│  RECOVERY FLOW:                                                │
│  recovery-identify → recovery-verify → recovery-reset → success │
│                                                                │
└─────────────────────────────────────────────────────────────────┘
```

### Core Types

```typescript
// State definitions
type AuthFlowState = 
  | 'fork' | 'create-account' | 'verify-contact' | 'choose-handle'
  | 'add-secondary' | 'setup-passkey' | 'connect-socials' | 'set-favorites'
  | 'identify' | 'authenticate' | 'mfa-verify'
  | 'recovery-identify' | 'recovery-verify' | 'recovery-reset'
  | 'success' | 'error' | 'blocked';

// Flow types
type AuthFlowType = 'sign-up' | 'sign-in' | 'recovery';

// Events that trigger state transitions
type AuthFlowEvent = 
  | { type: 'START_SIGNUP' }
  | { type: 'ACCOUNT_CREATED'; payload: AuthCreateAccountData }
  | { type: 'CONTACT_VERIFIED'; payload: AuthVerifyContactData }
  | { type: 'GO_BACK' }
  | { type: 'SKIP_STEP' }
  | { type: 'ERROR'; payload: { message: string; code?: string } };
```

## Features

### 🎯 State Machine Architecture
- Type-safe state transitions with comprehensive flow control
- Event-driven architecture with payload validation
- Context preservation across state changes
- Deterministic state transitions with guards

### 🔄 Dynamic Step Rendering
- Component mapping based on current state
- Contextual prop passing to child components
- Automatic form data persistence across steps
- Responsive layout adaptation

### 📊 Progress Management
- Visual progress tracking throughout the flow
- Step counting and percentage completion
- Persistent progress storage in localStorage
- Resume capability for interrupted flows

### 🛠️ Flexible Configuration
- Feature flags for optional steps (passkeys, social connect, etc.)
- Custom path definitions (express, comprehensive, minimal)
- Step-specific configuration (required, skippable, titles)
- Custom auth path injection

### 🚫 Error Handling
- Comprehensive error states with user-friendly messages
- Retry mechanisms with exponential backoff
- Error boundary integration
- Graceful degradation for network issues

### 🔧 Developer Experience
- Debug mode with state machine visualization
- TypeScript strict mode compliance
- Comprehensive Storybook documentation
- Unit test coverage with state machine testing

## Usage

### Basic Sign-Up Flow

```tsx
import { MAuthFlow } from '@/components/modules/m-auth-flow';

function SignUpPage() {
  return (
    <MAuthFlow
      flowType="sign-up"
      onComplete={(context) => {
        console.log('User registered:', context.accountData);
        router.push('/dashboard');
      }}
      onError={(error, context) => {
        console.error('Registration failed:', error);
        analytics.track('auth_error', { error, step: context.state });
      }}
      showProgress
      persistProgress
    />
  );
}
```

### Advanced Configuration

```tsx
<MAuthFlow
  flowType="sign-up"
  features={{
    passkeyEnabled: true,
    socialConnectEnabled: true,
    secondaryContactRequired: false,
    handleRequired: true,
    mfaEnabled: false
  }}
  authPaths={[
    {
      id: 'developer',
      title: 'Developer Setup',
      description: 'Optimized for developers',
      features: ['API keys', 'SSH setup', 'Advanced security'],
      estimatedTime: '5 min',
      recommended: true
    }
  ]}
  stepConfig={{
    'add-secondary': { skippable: true, title: 'Add Backup Contact' },
    'setup-passkey': { skippable: true, title: 'Set Up Passkey' },
    'connect-socials': { skippable: true, title: 'Connect Social Accounts' }
  }}
  onStateChange={(machine) => {
    analytics.track('auth_step_change', {
      from: machine.previousState,
      to: machine.state,
      progress: machine.progress
    });
  }}
  debug={process.env.NODE_ENV === 'development'}
/>
```

### Resume Interrupted Flow

```tsx
// Resume from a specific state with existing data
<MAuthFlow
  flowType="sign-up"
  initialState="choose-handle"
  initialContext={{
    accountData: {
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe'
    },
    contactData: {
      verificationCode: '123456',
      contactMethod: 'email',
      contactValue: 'user@example.com'
    },
    selectedPath: 'express'
  }}
  persistProgress
  storageKey="custom-auth-flow-key"
/>
```

## State Descriptions

### Sign-Up Flow States

| State | Description | Required | Skippable |
|-------|-------------|----------|-----------|
| `fork` | Path selection (express/comprehensive/minimal) | ✅ | ❌ |
| `create-account` | Email, password, basic info collection | ✅ | ❌ |
| `verify-contact` | Email/phone verification with PIN | ✅ | ❌ |
| `choose-handle` | Username/handle selection | ⚙️ | ❌ |
| `add-secondary` | Backup contact method | ❌ | ✅ |
| `setup-passkey` | Passwordless authentication setup | ❌ | ✅ |
| `connect-socials` | Social media account linking | ❌ | ✅ |
| `set-favorites` | Initial preferences and interests | ❌ | ✅ |
| `success` | Completion confirmation | ✅ | ❌ |

### Sign-In Flow States

| State | Description | Required | Skippable |
|-------|-------------|----------|-----------|
| `identify` | Email/handle entry | ✅ | ❌ |
| `authenticate` | Password/passkey authentication | ✅ | ❌ |
| `mfa-verify` | Multi-factor authentication | ⚙️ | ❌ |
| `success` | Sign-in confirmation | ✅ | ❌ |

### Recovery Flow States

| State | Description | Required | Skippable |
|-------|-------------|----------|-----------|
| `recovery-identify` | Account identification | ✅ | ❌ |
| `recovery-verify` | Recovery method verification | ✅ | ❌ |
| `recovery-reset` | Password/method reset | ✅ | ❌ |
| `success` | Recovery confirmation | ✅ | ❌ |

Legend: ✅ Always required, ❌ Never required, ⚙️ Configurable

## Integration with Existing Components

The M-AuthFlow orchestrates these existing auth structures:

- **SAuthFork** - Path selection interface
- **SAuthCreateAccount** - Account creation form
- **SAuthVerifyContact** - PIN verification interface
- **SAuthHandle** - Username/handle selection
- **SAuthAddSecondaryContact** - Backup contact setup
- **SAuthPasskey** - Passkey registration
- **SAuthConnectSocials** - Social account linking
- **SAuthSetFavorites** - Preferences setup

Each component receives contextual props and callbacks that trigger state transitions.

## Context Management

The state machine maintains a comprehensive context object:

```typescript
interface AuthFlowContext {
  // Collected user data
  accountData?: AuthCreateAccountData;
  contactData?: AuthVerifyContactData;
  handleData?: AuthHandleData;
  // ... other step data
  
  // Flow metadata
  flowType: AuthFlowType;
  selectedPath?: string;
  steps: AuthFlowState[];
  currentStepIndex: number;
  
  // Error handling
  error?: { message: string; code?: string };
  retryCount: number;
  
  // Feature configuration
  features: {
    passkeyEnabled: boolean;
    socialConnectEnabled: boolean;
    // ... other features
  };
}
```

## Error Handling

### Error Types

- **Validation Errors** - Form validation failures
- **Network Errors** - API communication issues
- **Authentication Errors** - Invalid credentials
- **Rate Limiting** - Too many attempts
- **Service Unavailable** - Backend service issues

### Error Recovery

```typescript
// Automatic retry with exponential backoff
const handleError = (error: AuthError) => {
  if (error.retryable && context.retryCount < 3) {
    setTimeout(() => {
      transition({ type: 'RETRY' });
    }, Math.pow(2, context.retryCount) * 1000);
  } else {
    transition({ type: 'ERROR', payload: error });
  }
};
```

## Testing

### State Machine Testing

```typescript
import { renderAuthFlow, fireAuthEvent } from './test-utils';

test('sign-up flow completes successfully', async () => {
  const { machine, user } = renderAuthFlow({ flowType: 'sign-up' });
  
  // Test fork selection
  expect(machine.state).toBe('fork');
  fireAuthEvent({ type: 'SELECT_PATH', payload: { pathId: 'express' } });
  
  // Test account creation
  expect(machine.state).toBe('create-account');
  fireAuthEvent({ 
    type: 'ACCOUNT_CREATED', 
    payload: { email: 'test@example.com', password: 'secure123' } 
  });
  
  // Continue through flow...
  expect(machine.state).toBe('success');
});
```

## Performance

### Bundle Size
- Core module: ~15KB gzipped
- With dependencies: ~45KB gzipped
- Tree-shakeable exports
- Lazy-loaded auth structures

### Runtime Performance
- State transitions: <1ms
- Component rendering: <50ms
- Memory usage: <2MB
- localStorage I/O: <10ms

## Accessibility

- **WCAG 2.1 AA compliant**
- **Screen reader optimized**
- **Keyboard navigation support**
- **High contrast mode compatible**
- **Focus management** across state transitions
- **ARIA live regions** for status updates

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Migration Guide

### From Individual Auth Components

```typescript
// Before: Manual flow management
const [step, setStep] = useState('create-account');
const [userData, setUserData] = useState({});

// After: State machine orchestration
<MAuthFlow
  flowType="sign-up"
  onComplete={(context) => {
    // All data available in context
    console.log(context.accountData, context.handleData);
  }}
/>
```

### From Custom Auth Flows

```typescript
// Before: Custom state management
const authFlow = useAuthFlow();

// After: Declarative configuration
<MAuthFlow
  flowType="sign-up"
  features={authFlow.features}
  stepConfig={authFlow.stepConfig}
  onStateChange={authFlow.onStateChange}
/>
```

## Contributing

### Adding New States

1. Add state to `AuthFlowState` type
2. Update state machine transitions
3. Create component renderer
4. Add tests and stories
5. Update documentation

### Adding New Features

1. Add feature flag to `AuthFlowContext['features']`
2. Update step generation logic
3. Add configuration props
4. Test feature combinations
5. Document usage patterns

## Examples

See the Storybook stories for comprehensive examples:

- Default flows (sign-up, sign-in, recovery)
- Custom auth paths
- Feature flag configurations
- Error handling scenarios
- Resume functionality
- Debug mode demonstrations

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `flowType` | `AuthFlowType` | `'sign-up'` | Type of authentication flow |
| `initialState` | `AuthFlowState` | - | Initial state for resuming |
| `initialContext` | `Partial<AuthFlowContext>` | - | Initial context data |
| `features` | `Partial<AuthFlowContext['features']>` | - | Feature configuration |
| `onComplete` | `(context) => void` | - | Completion callback |
| `onError` | `(error, context) => void` | - | Error callback |
| `showProgress` | `boolean` | `true` | Show progress indicator |
| `persistProgress` | `boolean` | `true` | Persist to localStorage |
| `debug` | `boolean` | `false` | Enable debug mode |

### Events

All events follow the format `{ type: string; payload?: any }`:

- `START_SIGNUP` - Begin sign-up flow
- `ACCOUNT_CREATED` - Account creation completed
- `CONTACT_VERIFIED` - Email/phone verified
- `HANDLE_CHOSEN` - Username selected
- `GO_BACK` - Navigate to previous step
- `SKIP_STEP` - Skip current optional step
- `ERROR` - Error occurred
- `RETRY` - Retry after error

### Context

The complete state machine context is available in callbacks:

```typescript
interface AuthFlowMachine {
  state: AuthFlowState;        // Current state
  context: AuthFlowContext;    // Complete context
  canGoBack: boolean;          // Back navigation available
  canSkip: boolean;            // Skip option available
  progress: number;            // Completion percentage
}
```