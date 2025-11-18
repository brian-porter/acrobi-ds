import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useCallback } from 'react';
import { useWebAuthn, WebAuthnUtils } from './use-webauthn';

const meta: Meta = {
  title: 'Hooks/useWebAuthn',
  parameters: {
    docs: {
      description: {
        component:
          'WebAuthn hook for AAE biometric authentication. Provides passwordless authentication using biometrics (Touch ID, Face ID, Windows Hello) or security keys with full backend integration support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Main WebAuthn demo
const WebAuthnDemo = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [users, setUsers] = useState<
    Array<{ username: string; displayName: string; registered: boolean }>
  >([
    {
      username: 'demo@example.com',
      displayName: 'Demo User',
      registered: false,
    },
    {
      username: 'test@example.com',
      displayName: 'Test User',
      registered: false,
    },
    {
      username: 'admin@example.com',
      displayName: 'Admin User',
      registered: false,
    },
  ]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [customUser, setCustomUser] = useState({
    username: '',
    displayName: '',
  });
  const [mockBackend, setMockBackend] = useState(true);

  const addLog = (
    message: string,
    type: 'info' | 'success' | 'error' = 'info'
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    setLogs(prev => [`${timestamp} ${emoji} ${message}`, ...prev.slice(0, 19)]);
  };

  // Mock backend endpoints
  const mockEndpoints = {
    registrationOptions: async (userInfo: any) => {
      addLog(
        `Mock backend: Generating registration options for ${userInfo.username}`
      );
      return {
        challenge: btoa(crypto.getRandomValues(new Uint8Array(32)).toString()),
        rp: { name: 'Acrobi Demo', id: 'localhost' },
        user: {
          id: btoa(userInfo.username),
          name: userInfo.username,
          displayName: userInfo.displayName,
        },
        pubKeyCredParams: [
          { alg: -7, type: 'public-key' },
          { alg: -257, type: 'public-key' },
        ],
        timeout: 60000,
        attestation: 'direct' as const,
        authenticatorSelection: {
          authenticatorAttachment: 'platform' as const,
          userVerification: 'preferred' as const,
          requireResidentKey: false,
        },
      };
    },
    registrationVerification: async (credential: any) => {
      addLog('Mock backend: Verifying registration credential');
      // Simulate backend verification
      return { verified: true, credentialID: credential.id };
    },
    authenticationOptions: async (username: string) => {
      addLog(
        `Mock backend: Generating authentication options for ${username || 'any user'}`
      );
      return {
        challenge: btoa(crypto.getRandomValues(new Uint8Array(32)).toString()),
        rpId: 'localhost',
        timeout: 60000,
        userVerification: 'preferred' as const,
        allowCredentials: username
          ? [
              {
                id: btoa(`credential-${username}`),
                type: 'public-key' as const,
                transports: ['internal'],
              },
            ]
          : undefined,
      };
    },
    authenticationVerification: async (credential: any) => {
      addLog('Mock backend: Verifying authentication credential');
      return { verified: true, user: { username: 'demo@example.com' } };
    },
  };

  const webauthn = useWebAuthn({
    endpoints: mockBackend
      ? {
          registrationOptions: '/mock/register/begin',
          registrationVerification: '/mock/register/complete',
          authenticationOptions: '/mock/authenticate/begin',
          authenticationVerification: '/mock/authenticate/complete',
        }
      : undefined,
    onRegistrationSuccess: credential => {
      addLog(
        `Registration successful! Credential ID: ${credential.id.slice(0, 20)}...`,
        'success'
      );
      setUsers(prev =>
        prev.map((user, index) =>
          index === selectedUser ? { ...user, registered: true } : user
        )
      );
    },
    onAuthenticationSuccess: credential => {
      addLog(
        `Authentication successful! Credential ID: ${credential.id.slice(0, 20)}...`,
        'success'
      );
    },
    onError: error => {
      addLog(`${error.type}: ${error.message}`, 'error');
    },
  });

  const {
    state,
    register,
    authenticate,
    checkSupport,
    clearError,
    isWebAuthnSupported,
    getAvailableAuthenticators,
    formatCredentialForBackend,
  } = webauthn;

  // Mock fetch for demo
  React.useEffect(() => {
    if (!mockBackend) return;

    const originalFetch = window.fetch;
    window.fetch = async (url: string, options: any) => {
      if (typeof url === 'string' && url.includes('/mock/')) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

        const body = options?.body ? JSON.parse(options.body) : {};

        if (url.includes('/register/begin')) {
          return new Response(
            JSON.stringify(await mockEndpoints.registrationOptions(body))
          );
        } else if (url.includes('/register/complete')) {
          return new Response(
            JSON.stringify(await mockEndpoints.registrationVerification(body))
          );
        } else if (url.includes('/authenticate/begin')) {
          return new Response(
            JSON.stringify(
              await mockEndpoints.authenticationOptions(body.username)
            )
          );
        } else if (url.includes('/authenticate/complete')) {
          return new Response(
            JSON.stringify(await mockEndpoints.authenticationVerification(body))
          );
        }
      }
      return originalFetch(url, options);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [mockBackend]);

  const handleRegister = async () => {
    const user = users[selectedUser];
    if (!user.username || !user.displayName) {
      addLog('Please provide username and display name', 'error');
      return;
    }

    addLog(`Starting registration for ${user.displayName}`);
    await register(user);
  };

  const handleAuthenticate = async () => {
    const user = users[selectedUser];
    addLog(`Starting authentication for ${user.username}`);
    await authenticate(user.username);
  };

  const handleCustomRegister = async () => {
    if (!customUser.username || !customUser.displayName) {
      addLog('Please fill in custom user details', 'error');
      return;
    }

    addLog(`Starting custom registration for ${customUser.displayName}`);
    await register(customUser);
  };

  const handleCheckPlatformAuthenticator = async () => {
    addLog('Checking platform authenticator availability...');
    const available = await WebAuthnUtils.isPlatformAuthenticatorAvailable();
    addLog(
      `Platform authenticator available: ${available}`,
      available ? 'success' : 'info'
    );
  };

  const handleCheckConditionalMediation = () => {
    const supported = WebAuthnUtils.isConditionalMediationSupported();
    addLog(
      `Conditional mediation supported: ${supported}`,
      supported ? 'success' : 'info'
    );
  };

  const handleGenerateChallenge = () => {
    const challenge = WebAuthnUtils.generateChallenge();
    const base64Challenge = WebAuthnUtils.arrayBufferToBase64(challenge);
    addLog(`Generated challenge: ${base64Challenge.slice(0, 20)}...`);
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '1000px',
      }}
    >
      <h2 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>
        🔐 WebAuthn Biometric Authentication Demo
      </h2>

      {/* Support Status */}
      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: state.isSupported ? '#f0f9ff' : '#fef2f2',
          borderRadius: '8px',
          border: `1px solid ${state.isSupported ? '#bae6fd' : '#fecaca'}`,
        }}
      >
        <h3
          style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#374151' }}
        >
          WebAuthn Support Status
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            fontSize: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '24px', marginRight: '10px' }}>
              {state.isSupported ? '✅' : '❌'}
            </span>
            <div>
              <strong>WebAuthn API:</strong>
              <div style={{ color: state.isSupported ? '#059669' : '#dc2626' }}>
                {state.isSupported ? 'Supported' : 'Not Supported'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '24px', marginRight: '10px' }}>
              {state.availableAuthenticators.length > 0 ? '🔑' : '🚫'}
            </span>
            <div>
              <strong>Authenticators:</strong>
              <div style={{ color: '#6b7280' }}>
                {state.availableAuthenticators.join(', ') || 'None detected'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '24px', marginRight: '10px' }}>
              {state.isLoading ? '⏳' : state.error ? '❌' : '✅'}
            </span>
            <div>
              <strong>Status:</strong>
              <div style={{ color: state.error ? '#dc2626' : '#059669' }}>
                {state.isLoading
                  ? 'Loading...'
                  : state.error
                    ? state.error.message
                    : 'Ready'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Selection */}
      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <h3
          style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#374151' }}
        >
          User Management
        </h3>

        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Select User:
          </label>
          <select
            value={selectedUser}
            onChange={e => setSelectedUser(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
            }}
          >
            {users.map((user, index) => (
              <option key={index} value={index}>
                {user.displayName} ({user.username}){' '}
                {user.registered ? '✅ Registered' : '⭕ Not Registered'}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '10px',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={handleRegister}
            disabled={
              !state.isSupported ||
              state.isLoading ||
              users[selectedUser]?.registered
            }
            style={{
              padding: '10px 16px',
              backgroundColor: users[selectedUser]?.registered
                ? '#9ca3af'
                : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: users[selectedUser]?.registered
                ? 'not-allowed'
                : 'pointer',
              fontSize: '14px',
              opacity: !state.isSupported || state.isLoading ? 0.6 : 1,
            }}
          >
            {state.isRegistering ? '⏳ Registering...' : '📝 Register User'}
          </button>

          <button
            onClick={handleAuthenticate}
            disabled={
              !state.isSupported ||
              state.isLoading ||
              !users[selectedUser]?.registered
            }
            style={{
              padding: '10px 16px',
              backgroundColor: !users[selectedUser]?.registered
                ? '#9ca3af'
                : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: !users[selectedUser]?.registered
                ? 'not-allowed'
                : 'pointer',
              fontSize: '14px',
              opacity: !state.isSupported || state.isLoading ? 0.6 : 1,
            }}
          >
            {state.isAuthenticating
              ? '⏳ Authenticating...'
              : '🔐 Authenticate'}
          </button>
        </div>

        {/* Custom User Registration */}
        <div
          style={{
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            marginTop: '15px',
          }}
        >
          <h4
            style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#374151' }}
          >
            Custom User Registration
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto',
              gap: '10px',
              alignItems: 'end',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '12px',
                  color: '#6b7280',
                }}
              >
                Username (Email):
              </label>
              <input
                type='email'
                value={customUser.username}
                onChange={e =>
                  setCustomUser(prev => ({ ...prev, username: e.target.value }))
                }
                placeholder='user@example.com'
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '12px',
                  color: '#6b7280',
                }}
              >
                Display Name:
              </label>
              <input
                type='text'
                value={customUser.displayName}
                onChange={e =>
                  setCustomUser(prev => ({
                    ...prev,
                    displayName: e.target.value,
                  }))
                }
                placeholder='Full Name'
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                }}
              />
            </div>
            <button
              onClick={handleCustomRegister}
              disabled={
                !state.isSupported ||
                state.isLoading ||
                !customUser.username ||
                !customUser.displayName
              }
              style={{
                padding: '7px 12px',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                opacity:
                  !customUser.username || !customUser.displayName ? 0.6 : 1,
              }}
            >
              ➕ Register
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <h3
          style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#374151' }}
        >
          Advanced WebAuthn Features
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
          }}
        >
          <button
            onClick={handleCheckPlatformAuthenticator}
            style={{
              padding: '8px 12px',
              backgroundColor: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            🔍 Check Platform Auth
          </button>

          <button
            onClick={handleCheckConditionalMediation}
            style={{
              padding: '8px 12px',
              backgroundColor: '#06b6d4',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            🔄 Check Conditional UI
          </button>

          <button
            onClick={handleGenerateChallenge}
            style={{
              padding: '8px 12px',
              backgroundColor: '#84cc16',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            🎲 Generate Challenge
          </button>

          <button
            onClick={clearError}
            disabled={!state.error}
            style={{
              padding: '8px 12px',
              backgroundColor: state.error ? '#ef4444' : '#9ca3af',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: state.error ? 'pointer' : 'not-allowed',
              fontSize: '14px',
            }}
          >
            🗑️ Clear Error
          </button>
        </div>
      </div>

      {/* Configuration */}
      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <h3
          style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#374151' }}
        >
          Demo Configuration
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label
            style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}
          >
            <input
              type='checkbox'
              checked={mockBackend}
              onChange={e => setMockBackend(e.target.checked)}
              style={{ marginRight: '6px' }}
            />
            Use Mock Backend (enables demo in Storybook)
          </label>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            {mockBackend
              ? '✅ Mock endpoints active'
              : '⚠️ Real endpoints required'}
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#374151' }}
        >
          Activity Log
        </h3>
        <div
          style={{
            height: '200px',
            overflowY: 'auto',
            padding: '12px',
            backgroundColor: '#111827',
            borderRadius: '6px',
            color: '#f9fafb',
            fontSize: '12px',
            fontFamily: 'monospace',
          }}
        >
          {logs.length === 0 ? (
            <div style={{ color: '#6b7280' }}>
              No activity yet. Try registering or authenticating a user...
            </div>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                style={{ marginBottom: '4px', wordBreak: 'break-word' }}
              >
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Current State */}
      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <h3
          style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#374151' }}
        >
          Current WebAuthn State
        </h3>
        <pre
          style={{
            margin: 0,
            fontSize: '12px',
            color: '#374151',
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto',
          }}
        >
          {JSON.stringify(
            {
              isSupported: state.isSupported,
              isLoading: state.isLoading,
              isRegistering: state.isRegistering,
              isAuthenticating: state.isAuthenticating,
              hasError: !!state.error,
              errorType: state.error?.type,
              errorMessage: state.error?.message,
              lastCredentialId: state.lastCredential?.id?.slice(0, 20) + '...',
              availableAuthenticators: state.availableAuthenticators,
              registeredUsers: users.filter(u => u.registered).length,
            },
            null,
            2
          )}
        </pre>
      </div>

      {/* Instructions */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#eff6ff',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#1e40af',
        }}
      >
        <strong>WebAuthn Instructions:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>
            <strong>Registration:</strong> Select a user and click "Register
            User" to create a new credential
          </li>
          <li>
            <strong>Authentication:</strong> After registration, use
            "Authenticate" to verify with biometrics
          </li>
          <li>
            <strong>Platform Support:</strong> Works best on devices with Touch
            ID, Face ID, or Windows Hello
          </li>
          <li>
            <strong>Mock Backend:</strong> Demo uses simulated backend responses
            for Storybook compatibility
          </li>
          <li>
            <strong>Security Keys:</strong> Also supports external
            authenticators (USB, NFC, Bluetooth)
          </li>
          <li>
            <strong>Production:</strong> Replace mock endpoints with real
            backend WebAuthn implementation
          </li>
        </ul>
        <div
          style={{
            marginTop: '10px',
            padding: '8px',
            backgroundColor: '#dbeafe',
            borderRadius: '4px',
          }}
        >
          <strong>Note:</strong> This demo requires HTTPS in production. Some
          browsers may require user gesture for WebAuthn operations.
        </div>
      </div>
    </div>
  );
};

// Hook usage example
const HookUsageExample = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h3>WebAuthn Hook Usage Example</h3>
      <pre
        style={{
          backgroundColor: '#f8fafc',
          padding: '15px',
          borderRadius: '6px',
          fontSize: '14px',
          overflow: 'auto',
        }}
      >
        {`// WebAuthn Hook Usage
import { useWebAuthn, WebAuthnUtils } from '@acrobi/ui';

function BiometricAuthComponent() {
  const {
    state,
    register,
    authenticate,
    clearError,
    isWebAuthnSupported,
    getAvailableAuthenticators
  } = useWebAuthn({
    endpoints: {
      registrationOptions: '/api/webauthn/register/begin',
      registrationVerification: '/api/webauthn/register/complete',
      authenticationOptions: '/api/webauthn/authenticate/begin',
      authenticationVerification: '/api/webauthn/authenticate/complete'
    },
    onRegistrationSuccess: (credential) => {
      console.log('Registration successful:', credential.id);
      // Store credential info, update UI, etc.
    },
    onAuthenticationSuccess: (credential) => {
      console.log('Authentication successful:', credential.id);
      // Handle successful login
    },
    onError: (error) => {
      console.error('WebAuthn error:', error.message);
      // Handle errors appropriately
    }
  });

  const handleRegister = async () => {
    const result = await register({
      username: 'user@example.com',
      displayName: 'John Doe'
    });
    
    if (result) {
      console.log('Registration complete:', result.id);
    }
  };

  const handleAuthenticate = async () => {
    const result = await authenticate('user@example.com');
    
    if (result) {
      console.log('Authentication complete:', result.id);
    }
  };

  if (!state.isSupported) {
    return (
      <div>
        <p>WebAuthn is not supported in this browser</p>
        <p>Try using a modern browser with biometric support</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Biometric Authentication</h2>
      
      {state.error && (
        <div className="error">
          <p>Error: {state.error.message}</p>
          <button onClick={clearError}>Clear Error</button>
        </div>
      )}
      
      <div>
        <button 
          onClick={handleRegister}
          disabled={state.isLoading}
        >
          {state.isRegistering ? 'Registering...' : 'Register Biometric'}
        </button>
        
        <button 
          onClick={handleAuthenticate}
          disabled={state.isLoading}
        >
          {state.isAuthenticating ? 'Authenticating...' : 'Authenticate'}
        </button>
      </div>
      
      <div>
        <p>Available authenticators: {state.availableAuthenticators.join(', ')}</p>
        {state.lastCredential && (
          <p>Last credential: {state.lastCredential.id.slice(0, 20)}...</p>
        )}
      </div>
    </div>
  );
}

// Using utility functions
function WebAuthnUtilities() {
  const checkFeatures = async () => {
    // Check basic support
    const isSupported = WebAuthnUtils.isWebAuthnSupported();
    console.log('WebAuthn supported:', isSupported);
    
    // Check platform authenticator (Touch ID, Face ID, etc.)
    const platformAuth = await WebAuthnUtils.isPlatformAuthenticatorAvailable();
    console.log('Platform authenticator:', platformAuth);
    
    // Check conditional mediation (autofill UI)
    const conditionalUI = WebAuthnUtils.isConditionalMediationSupported();
    console.log('Conditional mediation:', conditionalUI);
    
    // Generate secure challenge
    const challenge = WebAuthnUtils.generateChallenge();
    const base64Challenge = WebAuthnUtils.arrayBufferToBase64(challenge);
    console.log('Generated challenge:', base64Challenge);
    
    // Get available authenticator types
    const authenticators = WebAuthnUtils.getAvailableAuthenticators();
    console.log('Available authenticators:', authenticators);
  };
  
  return (
    <button onClick={checkFeatures}>
      Check WebAuthn Features
    </button>
  );
}

// Backend integration example
function BackendIntegration() {
  const webauthn = useWebAuthn({
    endpoints: {
      registrationOptions: '/api/webauthn/register/begin',
      registrationVerification: '/api/webauthn/register/complete',
      authenticationOptions: '/api/webauthn/authenticate/begin',
      authenticationVerification: '/api/webauthn/authenticate/complete'
    },
    timeout: 120000, // 2 minutes
    userVerification: 'required'
  });

  // Format credential for backend storage
  const handleCredentialReceived = (credential) => {
    const formattedCredential = webauthn.formatCredentialForBackend(credential);
    
    // Send to your backend for storage/verification
    fetch('/api/credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedCredential)
    });
  };

  return (
    <div>
      <p>Backend integration with proper credential formatting</p>
      <p>Supports SimpleWebAuthn, @webauthn/server, and custom backends</p>
    </div>
  );
}`}
      </pre>
    </div>
  );
};

// Stories
export const Default: Story = {
  render: () => <WebAuthnDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive WebAuthn demo showing biometric authentication, user registration, and security key support with mock backend integration.',
      },
    },
  },
};

export const HookUsage: Story = {
  render: () => <HookUsageExample />,
  parameters: {
    docs: {
      description: {
        story:
          'Example code showing how to use the WebAuthn hook for passwordless authentication with biometrics and backend integration.',
      },
    },
  },
};
