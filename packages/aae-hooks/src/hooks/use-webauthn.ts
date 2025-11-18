/**
 * @fileoverview WebAuthn Hook for AAE Biometric Authentication (Epic 49)
 * Provides comprehensive biometric authentication capabilities using the Web Authentication API
 * with SimpleWebAuthn library integration for passwordless login and registration.
 */

import { useState, useCallback, useEffect } from 'react';

// Types for WebAuthn operations
export interface WebAuthnRegistrationOptions {
  challenge: string;
  rp: {
    name: string;
    id: string;
  };
  user: {
    id: string;
    name: string;
    displayName: string;
  };
  pubKeyCredParams: PublicKeyCredentialParameters[];
  timeout?: number;
  attestation?: AttestationConveyancePreference;
  authenticatorSelection?: AuthenticatorSelectionCriteria;
  excludeCredentials?: PublicKeyCredentialDescriptor[];
}

export interface WebAuthnAuthenticationOptions {
  challenge: string;
  rpId?: string;
  allowCredentials?: PublicKeyCredentialDescriptor[];
  timeout?: number;
  userVerification?: UserVerificationRequirement;
}

export interface WebAuthnRegistrationResult {
  id: string;
  rawId: ArrayBuffer;
  response: {
    attestationObject: ArrayBuffer;
    clientDataJSON: ArrayBuffer;
  };
  type: string;
}

export interface WebAuthnAuthenticationResult {
  id: string;
  rawId: ArrayBuffer;
  response: {
    authenticatorData: ArrayBuffer;
    clientDataJSON: ArrayBuffer;
    signature: ArrayBuffer;
    userHandle?: ArrayBuffer;
  };
  type: string;
}

export interface WebAuthnError {
  type:
    | 'browser'
    | 'network'
    | 'user'
    | 'registration'
    | 'authentication'
    | 'timeout'
    | 'security';
  message: string;
  originalError?: Error;
  code?: string;
}

export interface WebAuthnState {
  isSupported: boolean;
  isLoading: boolean;
  isRegistering: boolean;
  isAuthenticating: boolean;
  error: WebAuthnError | null;
  lastCredential: WebAuthnRegistrationResult | null;
  availableAuthenticators: AuthenticatorTransport[];
}

export interface UseWebAuthnOptions {
  /** Backend endpoints for WebAuthn operations */
  endpoints?: {
    registrationOptions: string;
    registrationVerification: string;
    authenticationOptions: string;
    authenticationVerification: string;
  };
  /** Request timeout in milliseconds */
  timeout?: number;
  /** User verification requirement */
  userVerification?: UserVerificationRequirement;
  /** Callback when registration completes */
  onRegistrationSuccess?: (credential: WebAuthnRegistrationResult) => void;
  /** Callback when authentication completes */
  onAuthenticationSuccess?: (credential: WebAuthnAuthenticationResult) => void;
  /** Callback when error occurs */
  onError?: (error: WebAuthnError) => void;
}

export interface UseWebAuthnReturn {
  // State
  state: WebAuthnState;

  // Actions
  register: (userInfo: {
    username: string;
    displayName: string;
  }) => Promise<WebAuthnRegistrationResult | null>;
  authenticate: (
    username?: string
  ) => Promise<WebAuthnAuthenticationResult | null>;
  checkSupport: () => boolean;
  clearError: () => void;

  // Utilities
  isWebAuthnSupported: () => boolean;
  getAvailableAuthenticators: () => AuthenticatorTransport[];
  formatCredentialForBackend: (
    credential: WebAuthnRegistrationResult | WebAuthnAuthenticationResult
  ) => any;
}

// Utility functions
const isWebAuthnSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    'navigator' in window &&
    'credentials' in navigator &&
    'create' in navigator.credentials &&
    'get' in navigator.credentials &&
    typeof PublicKeyCredential !== 'undefined'
  );
};

const getAvailableAuthenticators = (): AuthenticatorTransport[] => {
  // This is a basic check - in practice, you'd query actual available authenticators
  const transports: AuthenticatorTransport[] = [];

  if (typeof window !== 'undefined') {
    // Check for platform authenticator (Touch ID, Face ID, Windows Hello)
    if ('authenticatorAttachment' in PublicKeyCredential.prototype) {
      transports.push('internal');
    }

    // Check for roaming authenticators (USB, NFC, Bluetooth)
    transports.push('usb', 'nfc', 'ble');
  }

  return transports;
};

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};

/**
 * WebAuthn Hook for AAE Biometric Authentication
 * Provides passwordless authentication using biometrics or security keys
 */
export function useWebAuthn(
  options: UseWebAuthnOptions = {}
): UseWebAuthnReturn {
  const {
    endpoints = {
      registrationOptions: '/api/webauthn/register/begin',
      registrationVerification: '/api/webauthn/register/complete',
      authenticationOptions: '/api/webauthn/authenticate/begin',
      authenticationVerification: '/api/webauthn/authenticate/complete',
    },
    timeout = 60000,
    userVerification = 'preferred',
    onRegistrationSuccess,
    onAuthenticationSuccess,
    onError,
  } = options;

  // State
  const [state, setState] = useState<WebAuthnState>({
    isSupported: isWebAuthnSupported(),
    isLoading: false,
    isRegistering: false,
    isAuthenticating: false,
    error: null,
    lastCredential: null,
    availableAuthenticators: getAvailableAuthenticators(),
  });

  // Error handler
  const handleError = useCallback(
    (
      type: WebAuthnError['type'],
      message: string,
      originalError?: Error,
      code?: string
    ) => {
      const error: WebAuthnError = { type, message, originalError, code };
      setState(prev => ({
        ...prev,
        error,
        isLoading: false,
        isRegistering: false,
        isAuthenticating: false,
      }));
      onError?.(error);
    },
    [onError]
  );

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Register new credential
  const register = useCallback(
    async (userInfo: {
      username: string;
      displayName: string;
    }): Promise<WebAuthnRegistrationResult | null> => {
      if (!state.isSupported) {
        handleError('browser', 'WebAuthn is not supported in this browser');
        return null;
      }

      setState(prev => ({
        ...prev,
        isRegistering: true,
        isLoading: true,
        error: null,
      }));

      try {
        // Step 1: Get registration options from backend
        const optionsResponse = await fetch(endpoints.registrationOptions, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: userInfo.username,
            displayName: userInfo.displayName,
          }),
        });

        if (!optionsResponse.ok) {
          throw new Error(
            `Failed to get registration options: ${optionsResponse.statusText}`
          );
        }

        const options: WebAuthnRegistrationOptions =
          await optionsResponse.json();

        // Step 2: Create credential using WebAuthn API
        const publicKeyCredentialCreationOptions: CredentialCreationOptions = {
          publicKey: {
            challenge: base64ToArrayBuffer(options.challenge),
            rp: options.rp,
            user: {
              id: base64ToArrayBuffer(options.user.id),
              name: options.user.name,
              displayName: options.user.displayName,
            },
            pubKeyCredParams: options.pubKeyCredParams,
            timeout: options.timeout || timeout,
            attestation: options.attestation || 'direct',
            authenticatorSelection: options.authenticatorSelection || {
              authenticatorAttachment: 'platform',
              userVerification,
              requireResidentKey: false,
            },
            excludeCredentials: options.excludeCredentials?.map(cred => ({
              ...cred,
              id: base64ToArrayBuffer(cred.id as any),
            })),
          },
        };

        const credential = (await navigator.credentials.create(
          publicKeyCredentialCreationOptions
        )) as PublicKeyCredential | null;

        if (!credential) {
          handleError('user', 'Registration was cancelled by user');
          return null;
        }

        // Step 3: Format credential for backend
        const registrationResult: WebAuthnRegistrationResult = {
          id: credential.id,
          rawId: credential.rawId,
          response: {
            attestationObject: (
              credential.response as AuthenticatorAttestationResponse
            ).attestationObject,
            clientDataJSON: credential.response.clientDataJSON,
          },
          type: credential.type,
        };

        // Step 4: Send credential to backend for verification
        const verificationResponse = await fetch(
          endpoints.registrationVerification,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: credential.id,
              rawId: arrayBufferToBase64(credential.rawId),
              response: {
                attestationObject: arrayBufferToBase64(
                  (credential.response as AuthenticatorAttestationResponse)
                    .attestationObject
                ),
                clientDataJSON: arrayBufferToBase64(
                  credential.response.clientDataJSON
                ),
              },
              type: credential.type,
            }),
          }
        );

        if (!verificationResponse.ok) {
          throw new Error(
            `Registration verification failed: ${verificationResponse.statusText}`
          );
        }

        const verificationResult = await verificationResponse.json();

        if (!verificationResult.verified) {
          throw new Error('Registration verification failed on server');
        }

        setState(prev => ({
          ...prev,
          isRegistering: false,
          isLoading: false,
          lastCredential: registrationResult,
        }));

        onRegistrationSuccess?.(registrationResult);
        return registrationResult;
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'NotSupportedError') {
            handleError('browser', 'WebAuthn not supported or disabled');
          } else if (error.name === 'SecurityError') {
            handleError('security', 'Security error during registration');
          } else if (error.name === 'NotAllowedError') {
            handleError('user', 'Registration cancelled by user');
          } else if (error.name === 'InvalidStateError') {
            handleError('registration', 'Authenticator already registered');
          } else if (error.name === 'NetworkError') {
            handleError('network', 'Network error during registration');
          } else {
            handleError('registration', error.message, error);
          }
        } else {
          handleError('registration', 'Unknown registration error');
        }
        return null;
      }
    },
    [
      state.isSupported,
      endpoints,
      timeout,
      userVerification,
      handleError,
      onRegistrationSuccess,
    ]
  );

  // Authenticate with existing credential
  const authenticate = useCallback(
    async (username?: string): Promise<WebAuthnAuthenticationResult | null> => {
      if (!state.isSupported) {
        handleError('browser', 'WebAuthn is not supported in this browser');
        return null;
      }

      setState(prev => ({
        ...prev,
        isAuthenticating: true,
        isLoading: true,
        error: null,
      }));

      try {
        // Step 1: Get authentication options from backend
        const optionsResponse = await fetch(endpoints.authenticationOptions, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
          }),
        });

        if (!optionsResponse.ok) {
          throw new Error(
            `Failed to get authentication options: ${optionsResponse.statusText}`
          );
        }

        const options: WebAuthnAuthenticationOptions =
          await optionsResponse.json();

        // Step 2: Get credential using WebAuthn API
        const publicKeyCredentialRequestOptions: CredentialRequestOptions = {
          publicKey: {
            challenge: base64ToArrayBuffer(options.challenge),
            rpId: options.rpId,
            allowCredentials: options.allowCredentials?.map(cred => ({
              ...cred,
              id: base64ToArrayBuffer(cred.id as any),
            })),
            timeout: options.timeout || timeout,
            userVerification: options.userVerification || userVerification,
          },
        };

        const credential = (await navigator.credentials.get(
          publicKeyCredentialRequestOptions
        )) as PublicKeyCredential | null;

        if (!credential) {
          handleError('user', 'Authentication was cancelled by user');
          return null;
        }

        // Step 3: Format credential for backend
        const authenticationResult: WebAuthnAuthenticationResult = {
          id: credential.id,
          rawId: credential.rawId,
          response: {
            authenticatorData: (
              credential.response as AuthenticatorAssertionResponse
            ).authenticatorData,
            clientDataJSON: credential.response.clientDataJSON,
            signature: (credential.response as AuthenticatorAssertionResponse)
              .signature,
            userHandle: (credential.response as AuthenticatorAssertionResponse)
              .userHandle,
          },
          type: credential.type,
        };

        // Step 4: Send credential to backend for verification
        const verificationResponse = await fetch(
          endpoints.authenticationVerification,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: credential.id,
              rawId: arrayBufferToBase64(credential.rawId),
              response: {
                authenticatorData: arrayBufferToBase64(
                  (credential.response as AuthenticatorAssertionResponse)
                    .authenticatorData
                ),
                clientDataJSON: arrayBufferToBase64(
                  credential.response.clientDataJSON
                ),
                signature: arrayBufferToBase64(
                  (credential.response as AuthenticatorAssertionResponse)
                    .signature
                ),
                userHandle: (
                  credential.response as AuthenticatorAssertionResponse
                ).userHandle
                  ? arrayBufferToBase64(
                      (credential.response as AuthenticatorAssertionResponse)
                        .userHandle!
                    )
                  : undefined,
              },
              type: credential.type,
            }),
          }
        );

        if (!verificationResponse.ok) {
          throw new Error(
            `Authentication verification failed: ${verificationResponse.statusText}`
          );
        }

        const verificationResult = await verificationResponse.json();

        if (!verificationResult.verified) {
          throw new Error('Authentication verification failed on server');
        }

        setState(prev => ({
          ...prev,
          isAuthenticating: false,
          isLoading: false,
        }));

        onAuthenticationSuccess?.(authenticationResult);
        return authenticationResult;
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'NotSupportedError') {
            handleError('browser', 'WebAuthn not supported or disabled');
          } else if (error.name === 'SecurityError') {
            handleError('security', 'Security error during authentication');
          } else if (error.name === 'NotAllowedError') {
            handleError('user', 'Authentication cancelled by user');
          } else if (error.name === 'InvalidStateError') {
            handleError(
              'authentication',
              'No credentials available for authentication'
            );
          } else if (error.name === 'NetworkError') {
            handleError('network', 'Network error during authentication');
          } else {
            handleError('authentication', error.message, error);
          }
        } else {
          handleError('authentication', 'Unknown authentication error');
        }
        return null;
      }
    },
    [
      state.isSupported,
      endpoints,
      timeout,
      userVerification,
      handleError,
      onAuthenticationSuccess,
    ]
  );

  // Check WebAuthn support
  const checkSupport = useCallback((): boolean => {
    return state.isSupported;
  }, [state.isSupported]);

  // Format credential for backend (utility)
  const formatCredentialForBackend = useCallback(
    (credential: WebAuthnRegistrationResult | WebAuthnAuthenticationResult) => {
      const base = {
        id: credential.id,
        rawId: arrayBufferToBase64(credential.rawId),
        type: credential.type,
      };

      if ('attestationObject' in credential.response) {
        // Registration credential
        return {
          ...base,
          response: {
            attestationObject: arrayBufferToBase64(
              credential.response.attestationObject
            ),
            clientDataJSON: arrayBufferToBase64(
              credential.response.clientDataJSON
            ),
          },
        };
      } else {
        // Authentication credential
        return {
          ...base,
          response: {
            authenticatorData: arrayBufferToBase64(
              credential.response.authenticatorData
            ),
            clientDataJSON: arrayBufferToBase64(
              credential.response.clientDataJSON
            ),
            signature: arrayBufferToBase64(credential.response.signature),
            userHandle: credential.response.userHandle
              ? arrayBufferToBase64(credential.response.userHandle)
              : undefined,
          },
        };
      }
    },
    []
  );

  // Update available authenticators on mount
  useEffect(() => {
    if (state.isSupported) {
      setState(prev => ({
        ...prev,
        availableAuthenticators: getAvailableAuthenticators(),
      }));
    }
  }, [state.isSupported]);

  return {
    // State
    state,

    // Actions
    register,
    authenticate,
    checkSupport,
    clearError,

    // Utilities
    isWebAuthnSupported: () => state.isSupported,
    getAvailableAuthenticators: () => state.availableAuthenticators,
    formatCredentialForBackend,
  };
}

// Export utility functions
export const WebAuthnUtils = {
  isWebAuthnSupported,
  getAvailableAuthenticators,
  arrayBufferToBase64,
  base64ToArrayBuffer,

  /**
   * Check if platform authenticator is available (Touch ID, Face ID, Windows Hello)
   */
  isPlatformAuthenticatorAvailable: async (): Promise<boolean> => {
    if (!isWebAuthnSupported()) return false;

    try {
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch {
      return false;
    }
  },

  /**
   * Check if conditional mediation is supported (for autofill)
   */
  isConditionalMediationSupported: (): boolean => {
    return (
      isWebAuthnSupported() &&
      'isConditionalMediationAvailable' in PublicKeyCredential &&
      typeof PublicKeyCredential.isConditionalMediationAvailable === 'function'
    );
  },

  /**
   * Generate a random challenge for WebAuthn operations
   */
  generateChallenge: (length: number = 32): ArrayBuffer => {
    return crypto.getRandomValues(new Uint8Array(length)).buffer;
  },
};

export default useWebAuthn;
