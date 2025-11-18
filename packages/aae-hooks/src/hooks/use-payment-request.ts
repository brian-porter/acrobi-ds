/**
 * @fileoverview Payment Request Hook for Epic 62 - AAE Payment Requests & 3rd Party Integration
 * Provides comprehensive payment request management using the Payment Request API.
 * Enables native-like checkout experiences with support for various payment methods.
 */

import { useState, useCallback, useRef, useEffect } from 'react';

// Payment Request types
export interface PaymentMethodData {
  supportedMethods: string | string[];
  data?: any;
}

export interface PaymentDetailsInit {
  id?: string;
  total: PaymentItem;
  displayItems?: PaymentItem[];
  shippingOptions?: PaymentShippingOption[];
  modifiers?: PaymentDetailsModifier[];
}

export interface PaymentItem {
  label: string;
  amount: PaymentCurrencyAmount;
  pending?: boolean;
}

export interface PaymentCurrencyAmount {
  currency: string;
  value: string;
}

export interface PaymentShippingOption {
  id: string;
  label: string;
  amount: PaymentCurrencyAmount;
  selected?: boolean;
}

export interface PaymentDetailsModifier {
  supportedMethods: string | string[];
  total?: PaymentItem;
  additionalDisplayItems?: PaymentItem[];
  data?: any;
}

export interface PaymentOptions {
  requestPayerName?: boolean;
  requestPayerEmail?: boolean;
  requestPayerPhone?: boolean;
  requestShipping?: boolean;
  shippingType?: 'shipping' | 'delivery' | 'pickup';
}

export interface PaymentRequestState {
  isSupported: boolean;
  isProcessing: boolean;
  canMakePayment: boolean | null;
  response: PaymentResponse | null;
  error: PaymentRequestError | null;
  lastPaymentId: string | null;
}

export interface PaymentRequestError {
  type:
    | 'not_supported'
    | 'security_error'
    | 'abort_error'
    | 'invalid_state'
    | 'unknown_error'
    | 'network_error'
    | 'validation_error';
  message: string;
  originalError?: Error;
}

export interface PaymentRequestOptions {
  /** Auto-check if payment methods can be used */
  autoCheckCanMakePayment?: boolean;
  /** Enable debug logging */
  debug?: boolean;
  /** Callback when payment is successfully completed */
  onPaymentSuccess?: (response: PaymentResponse) => void;
  /** Callback when payment fails */
  onPaymentError?: (error: PaymentRequestError) => void;
  /** Callback when payment is cancelled */
  onPaymentCancel?: () => void;
  /** Callback when shipping address changes */
  onShippingAddressChange?: (event: PaymentRequestUpdateEvent) => void;
  /** Callback when shipping option changes */
  onShippingOptionChange?: (event: PaymentRequestUpdateEvent) => void;
}

export interface UsePaymentRequestReturn {
  // State
  state: PaymentRequestState;

  // Actions
  show: (
    paymentMethods: PaymentMethodData[],
    paymentDetails: PaymentDetailsInit,
    paymentOptions?: PaymentOptions
  ) => Promise<void>;
  canMakePayment: (paymentMethods: PaymentMethodData[]) => Promise<boolean>;
  abort: () => void;
  complete: (result: PaymentComplete) => Promise<void>;

  // Utilities
  isSupported: boolean;
  clearError: () => void;
  retry: () => Promise<void>;

  // Payment method helpers
  createBasicCardMethod: (networks?: string[]) => PaymentMethodData;
  createGooglePayMethod: (merchantInfo: any) => PaymentMethodData;
  createApplePayMethod: (merchantInfo: any) => PaymentMethodData;
}

export type PaymentComplete = 'success' | 'fail' | 'unknown';

// Check if Payment Request API is supported
const isPaymentRequestSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    'PaymentRequest' in window && typeof window.PaymentRequest === 'function'
  );
};

// Validate payment methods
const validatePaymentMethods = (methods: PaymentMethodData[]): boolean => {
  return (
    methods.length > 0 &&
    methods.every(
      method =>
        method.supportedMethods &&
        (typeof method.supportedMethods === 'string' ||
          Array.isArray(method.supportedMethods))
    )
  );
};

// Validate payment details
const validatePaymentDetails = (details: PaymentDetailsInit): boolean => {
  return !!(
    details.total &&
    details.total.label &&
    details.total.amount &&
    details.total.amount.currency &&
    details.total.amount.value
  );
};

/**
 * Payment Request Hook
 * Manages the entire lifecycle of payment requests using the Payment Request API
 */
export function usePaymentRequest(
  hookOptions: PaymentRequestOptions = {}
): UsePaymentRequestReturn {
  const {
    autoCheckCanMakePayment = true,
    debug = false,
    onPaymentSuccess,
    onPaymentError,
    onPaymentCancel,
    onShippingAddressChange,
    onShippingOptionChange,
  } = hookOptions;

  // State
  const [state, setState] = useState<PaymentRequestState>({
    isSupported: isPaymentRequestSupported(),
    isProcessing: false,
    canMakePayment: null,
    response: null,
    error: null,
    lastPaymentId: null,
  });

  // Refs
  const paymentRequestRef = useRef<PaymentRequest | null>(null);
  const lastPaymentMethodsRef = useRef<PaymentMethodData[]>([]);
  const lastPaymentDetailsRef = useRef<PaymentDetailsInit | null>(null);
  const lastPaymentOptionsRef = useRef<PaymentOptions | null>(null);

  // Error handling
  const handleError = useCallback(
    (
      type: PaymentRequestError['type'],
      message: string,
      originalError?: Error
    ) => {
      const paymentError: PaymentRequestError = {
        type,
        message,
        originalError,
      };
      setState(prev => ({ ...prev, error: paymentError, isProcessing: false }));
      onPaymentError?.(paymentError);

      if (debug) {
        console.error('Payment Request Error:', paymentError);
      }
    },
    [onPaymentError, debug]
  );

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Check if payment methods can be used
  const canMakePayment = useCallback(
    async (paymentMethods: PaymentMethodData[]): Promise<boolean> => {
      if (!state.isSupported) {
        if (debug) {
          console.warn('Payment Request API not supported');
        }
        return false;
      }

      if (!validatePaymentMethods(paymentMethods)) {
        handleError('validation_error', 'Invalid payment methods provided');
        return false;
      }

      try {
        // Create a temporary payment request to check availability
        const tempDetails: PaymentDetailsInit = {
          total: {
            label: 'Availability Check',
            amount: { currency: 'USD', value: '0.01' },
          },
        };

        const tempRequest = new PaymentRequest(paymentMethods, tempDetails);
        const canPay = await tempRequest.canMakePayment();

        setState(prev => ({ ...prev, canMakePayment: canPay }));

        if (debug) {
          console.log('Can make payment:', canPay);
        }

        return canPay;
      } catch (error) {
        handleError(
          'unknown_error',
          `Failed to check payment availability: ${error}`,
          error as Error
        );
        return false;
      }
    },
    [state.isSupported, debug, handleError]
  );

  // Show payment request
  const show = useCallback(
    async (
      paymentMethods: PaymentMethodData[],
      paymentDetails: PaymentDetailsInit,
      paymentOptions: PaymentOptions = {}
    ): Promise<void> => {
      if (!state.isSupported) {
        handleError(
          'not_supported',
          'Payment Request API is not supported in this browser'
        );
        return;
      }

      if (!validatePaymentMethods(paymentMethods)) {
        handleError('validation_error', 'Invalid payment methods provided');
        return;
      }

      if (!validatePaymentDetails(paymentDetails)) {
        handleError('validation_error', 'Invalid payment details provided');
        return;
      }

      clearError();
      setState(prev => ({
        ...prev,
        isProcessing: true,
        response: null,
        lastPaymentId: paymentDetails.id || `payment-${Date.now()}`,
      }));

      try {
        // Store payment info for retry
        lastPaymentMethodsRef.current = paymentMethods;
        lastPaymentDetailsRef.current = paymentDetails;
        lastPaymentOptionsRef.current = paymentOptions;

        // Create payment request
        const paymentRequest = new PaymentRequest(
          paymentMethods,
          paymentDetails,
          paymentOptions
        );
        paymentRequestRef.current = paymentRequest;

        // Add event listeners
        if (onShippingAddressChange) {
          paymentRequest.addEventListener(
            'shippingaddresschange',
            onShippingAddressChange
          );
        }

        if (onShippingOptionChange) {
          paymentRequest.addEventListener(
            'shippingoptionchange',
            onShippingOptionChange
          );
        }

        if (debug) {
          console.log('Showing payment request:', {
            paymentMethods,
            paymentDetails,
            paymentOptions,
          });
        }

        // Show the payment request
        const response = await paymentRequest.show();

        setState(prev => ({
          ...prev,
          response,
          isProcessing: false,
        }));

        onPaymentSuccess?.(response);

        if (debug) {
          console.log('Payment response received:', response);
        }
      } catch (error: any) {
        setState(prev => ({ ...prev, isProcessing: false }));

        if (error.name === 'AbortError') {
          if (debug) {
            console.log('Payment request was cancelled by user');
          }
          onPaymentCancel?.();
        } else if (error.name === 'SecurityError') {
          handleError(
            'security_error',
            'Payment request blocked by security policy'
          );
        } else if (error.name === 'InvalidStateError') {
          handleError(
            'invalid_state',
            'Payment request is in an invalid state'
          );
        } else {
          handleError(
            'unknown_error',
            `Payment request failed: ${error.message}`,
            error
          );
        }
      }
    },
    [
      state.isSupported,
      handleError,
      clearError,
      onPaymentSuccess,
      onPaymentCancel,
      onShippingAddressChange,
      onShippingOptionChange,
      debug,
    ]
  );

  // Abort payment request
  const abort = useCallback(() => {
    if (paymentRequestRef.current) {
      try {
        paymentRequestRef.current.abort();
        setState(prev => ({ ...prev, isProcessing: false }));

        if (debug) {
          console.log('Payment request aborted');
        }
      } catch (error) {
        console.warn('Failed to abort payment request:', error);
      }
    }
  }, [debug]);

  // Complete payment
  const complete = useCallback(
    async (result: PaymentComplete): Promise<void> => {
      if (!state.response) {
        console.warn('No payment response to complete');
        return;
      }

      try {
        await state.response.complete(result);

        if (debug) {
          console.log('Payment completed with result:', result);
        }

        // Clear response after completion
        setState(prev => ({ ...prev, response: null }));
      } catch (error) {
        console.error('Failed to complete payment:', error);
        handleError(
          'unknown_error',
          `Failed to complete payment: ${error}`,
          error as Error
        );
      }
    },
    [state.response, debug, handleError]
  );

  // Retry last payment
  const retry = useCallback(async (): Promise<void> => {
    if (!lastPaymentMethodsRef.current || !lastPaymentDetailsRef.current) {
      handleError('invalid_state', 'No previous payment request to retry');
      return;
    }

    await show(
      lastPaymentMethodsRef.current,
      lastPaymentDetailsRef.current,
      lastPaymentOptionsRef.current || {}
    );
  }, [show, handleError]);

  // Helper: Create basic card payment method
  const createBasicCardMethod = useCallback(
    (
      networks: string[] = ['visa', 'mastercard', 'amex']
    ): PaymentMethodData => {
      return {
        supportedMethods: 'basic-card',
        data: {
          supportedNetworks: networks,
          supportedTypes: ['debit', 'credit'],
        },
      };
    },
    []
  );

  // Helper: Create Google Pay method
  const createGooglePayMethod = useCallback(
    (merchantInfo: any): PaymentMethodData => {
      return {
        supportedMethods: 'https://google.com/pay',
        data: {
          environment: 'TEST', // or 'PRODUCTION'
          apiVersion: 2,
          apiVersionMinor: 0,
          merchantInfo,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGatewayMerchantId',
                },
              },
            },
          ],
        },
      };
    },
    []
  );

  // Helper: Create Apple Pay method
  const createApplePayMethod = useCallback(
    (merchantInfo: any): PaymentMethodData => {
      return {
        supportedMethods: 'https://apple.com/apple-pay',
        data: {
          version: 3,
          merchantIdentifier: merchantInfo.merchantIdentifier,
          merchantCapabilities: ['supports3DS'],
          supportedNetworks: ['visa', 'masterCard', 'amex'],
          countryCode: 'US',
        },
      };
    },
    []
  );

  // Auto-check payment availability
  useEffect(() => {
    if (autoCheckCanMakePayment && state.isSupported) {
      // Check for basic card support by default
      const basicCardMethod = createBasicCardMethod();
      canMakePayment([basicCardMethod]);
    }
  }, [
    autoCheckCanMakePayment,
    state.isSupported,
    canMakePayment,
    createBasicCardMethod,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (paymentRequestRef.current) {
        try {
          paymentRequestRef.current.abort();
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  return {
    // State
    state,

    // Actions
    show,
    canMakePayment,
    abort,
    complete,

    // Utilities
    isSupported: state.isSupported,
    clearError,
    retry,

    // Payment method helpers
    createBasicCardMethod,
    createGooglePayMethod,
    createApplePayMethod,
  };
}

// Utility functions
export const PaymentRequestUtils = {
  isSupported: isPaymentRequestSupported,

  /**
   * Create payment details from cart items
   */
  createPaymentDetails: (
    items: Array<{ label: string; amount: number }>,
    currency: string = 'USD',
    shipping?: number,
    tax?: number
  ): PaymentDetailsInit => {
    const displayItems = items.map(item => ({
      label: item.label,
      amount: {
        currency,
        value: item.amount.toFixed(2),
      },
    }));

    if (shipping) {
      displayItems.push({
        label: 'Shipping',
        amount: {
          currency,
          value: shipping.toFixed(2),
        },
      });
    }

    if (tax) {
      displayItems.push({
        label: 'Tax',
        amount: {
          currency,
          value: tax.toFixed(2),
        },
      });
    }

    const total =
      items.reduce((sum, item) => sum + item.amount, 0) +
      (shipping || 0) +
      (tax || 0);

    return {
      total: {
        label: 'Total',
        amount: {
          currency,
          value: total.toFixed(2),
        },
      },
      displayItems,
    };
  },

  /**
   * Format currency amount
   */
  formatCurrency: (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  },

  /**
   * Get browser support information
   */
  getBrowserSupport: () => ({
    chrome: 'Full support since Chrome 61',
    firefox: 'No support',
    safari: 'Full support since Safari 11.1',
    edge: 'Full support since Edge 79',
    mobile: 'Chrome Android, Safari iOS 11.2+',
  }),

  /**
   * Get common payment methods
   */
  getCommonPaymentMethods: () => ({
    'basic-card': 'Basic card payments (Visa, Mastercard, etc.)',
    'https://google.com/pay': 'Google Pay',
    'https://apple.com/apple-pay': 'Apple Pay',
    'https://samsung.com/pay': 'Samsung Pay',
  }),

  /**
   * Validate payment method data
   */
  validatePaymentMethod: (method: PaymentMethodData): boolean => {
    return validatePaymentMethods([method]);
  },

  /**
   * Validate payment details
   */
  validatePaymentDetails: (details: PaymentDetailsInit): boolean => {
    return validatePaymentDetails(details);
  },

  /**
   * Get security best practices
   */
  getSecurityBestPractices: () => [
    'Always validate payment data on the server',
    'Use HTTPS for all payment-related requests',
    'Implement proper CSRF protection',
    'Validate payment amounts on the backend',
    'Log payment attempts for security monitoring',
    'Use proper authentication and authorization',
    'Implement rate limiting for payment endpoints',
  ],

  /**
   * Get integration recommendations
   */
  getIntegrationRecommendations: () => [
    'Always provide fallback payment methods',
    'Test on actual mobile devices',
    'Handle network failures gracefully',
    'Provide clear error messages to users',
    'Implement proper loading states',
    'Support multiple currencies when applicable',
    'Follow accessibility guidelines',
  ],
};

export default usePaymentRequest;
