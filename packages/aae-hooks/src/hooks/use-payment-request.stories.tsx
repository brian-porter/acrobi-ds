/**
 * Payment Request Hook Stories
 * Epic 62 - AAE Payment Requests & 3rd Party Integration
 *
 * Comprehensive Storybook stories demonstrating payment request functionality
 * with various payment methods and integration patterns.
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  usePaymentRequest,
  PaymentRequestUtils,
  PaymentMethodData,
  PaymentDetailsInit,
} from './use-payment-request';

const meta: Meta = {
  title: 'Hooks/usePaymentRequest',
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive payment request hook that provides native-like checkout experiences using the Payment Request API with support for various payment methods and 3rd party integrations.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock shopping cart items
const mockCartItems = [
  { label: 'Wireless Headphones', amount: 199.99 },
  { label: 'Phone Case', amount: 29.99 },
  { label: 'Screen Protector', amount: 14.99 },
];

// Payment Request Component for Stories
const PaymentRequestDemo: React.FC<{ options?: any }> = ({ options }) => {
  const {
    state,
    show,
    canMakePayment,
    abort,
    complete,
    isSupported,
    clearError,
    retry,
    createBasicCardMethod,
    createGooglePayMethod,
    createApplePayMethod,
  } = usePaymentRequest(options);

  const [cartItems, setCartItems] = useState(mockCartItems);
  const [shipping, setShipping] = useState(9.99);
  const [tax, setTax] = useState(0);
  const [selectedMethods, setSelectedMethods] = useState<string[]>([
    'basic-card',
  ]);
  const [paymentHistory, setPaymentHistory] = useState<
    Array<{
      timestamp: string;
      status: string;
      amount: string;
      method: string;
      id?: string;
    }>
  >([]);

  // Calculate tax (8.5% for demo)
  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.amount, 0);
    setTax(Math.round(subtotal * 0.085 * 100) / 100);
  }, [cartItems]);

  // Track payment attempts
  useEffect(() => {
    if (state.response || state.error) {
      const entry = {
        timestamp: new Date().toLocaleTimeString(),
        status: state.response ? 'Success' : 'Failed',
        amount: PaymentRequestUtils.formatCurrency(
          cartItems.reduce((sum, item) => sum + item.amount, 0) + shipping + tax
        ),
        method: selectedMethods.join(', '),
        id: state.lastPaymentId || undefined,
      };

      setPaymentHistory(prev => [entry, ...prev.slice(0, 9)]); // Keep last 10 entries
    }
  }, [
    state.response,
    state.error,
    cartItems,
    shipping,
    tax,
    selectedMethods,
    state.lastPaymentId,
  ]);

  const handlePayment = async () => {
    const paymentMethods: PaymentMethodData[] = [];

    // Add selected payment methods
    if (selectedMethods.includes('basic-card')) {
      paymentMethods.push(
        createBasicCardMethod(['visa', 'mastercard', 'amex', 'discover'])
      );
    }

    if (selectedMethods.includes('google-pay')) {
      paymentMethods.push(
        createGooglePayMethod({
          merchantName: 'Demo Store',
          merchantId: '12345678901234567890',
        })
      );
    }

    if (selectedMethods.includes('apple-pay')) {
      paymentMethods.push(
        createApplePayMethod({
          merchantIdentifier: 'merchant.demo.store',
        })
      );
    }

    const paymentDetails = PaymentRequestUtils.createPaymentDetails(
      cartItems,
      'USD',
      shipping,
      tax
    );

    const paymentOptions = {
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: false,
      requestShipping: true,
      shippingType: 'shipping' as const,
    };

    await show(paymentMethods, paymentDetails, paymentOptions);
  };

  const handleCompletePayment = async (result: 'success' | 'fail') => {
    await complete(result);

    if (result === 'success') {
      alert('Payment completed successfully! 🎉');
    } else {
      alert('Payment failed. Please try again.');
    }
  };

  const handleCanMakePaymentCheck = async () => {
    const paymentMethods: PaymentMethodData[] = [];

    if (selectedMethods.includes('basic-card')) {
      paymentMethods.push(createBasicCardMethod());
    }

    if (selectedMethods.includes('google-pay')) {
      paymentMethods.push(
        createGooglePayMethod({
          merchantName: 'Demo Store',
          merchantId: '12345678901234567890',
        })
      );
    }

    const canPay = await canMakePayment(paymentMethods);
    alert(`Can make payment: ${canPay ? 'Yes ✅' : 'No ❌'}`);
  };

  const updateCartItem = (index: number, amount: number) => {
    setCartItems(prev =>
      prev.map((item, i) => (i === index ? { ...item, amount } : item))
    );
  };

  const addCartItem = () => {
    const newItem = {
      label: `Product ${cartItems.length + 1}`,
      amount: Math.round(Math.random() * 100 * 100) / 100,
    };
    setCartItems(prev => [...prev, newItem]);
  };

  const removeCartItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.amount, 0);
  const total = subtotal + shipping + tax;

  const browserSupport = PaymentRequestUtils.getBrowserSupport();
  const commonMethods = PaymentRequestUtils.getCommonPaymentMethods();
  const securityPractices = PaymentRequestUtils.getSecurityBestPractices();

  return (
    <div style={{ padding: '20px', maxWidth: '1000px' }}>
      <h2>Payment Request Demo</h2>

      {/* Browser Support Warning */}
      {!isSupported && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#ffeb3b',
            border: '2px solid #ff9800',
            borderRadius: '8px',
            marginBottom: '20px',
            fontWeight: 'bold',
            color: '#e65100',
          }}
        >
          ⚠️ Payment Request API is not supported in this browser.
        </div>
      )}

      {/* Current Status */}
      <div
        style={{
          padding: '20px',
          backgroundColor: isSupported ? '#e8f5e8' : '#fff3e0',
          border: `2px solid ${isSupported ? '#4caf50' : '#ff9800'}`,
          borderRadius: '12px',
          marginBottom: '20px',
        }}
      >
        <h3 style={{ margin: '0 0 15px 0' }}>💳 Payment Status</h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minWidth(200px, 1fr))',
            gap: '15px',
          }}
        >
          <div>
            <strong>API Supported:</strong>
            <br />
            <span
              style={{
                color: isSupported ? '#4caf50' : '#ff9800',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              {isSupported ? '✅ Yes' : '❌ No'}
            </span>
          </div>

          <div>
            <strong>Processing:</strong>
            <br />
            <span
              style={{
                color: state.isProcessing ? '#ff9800' : '#4caf50',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              {state.isProcessing ? '⏳ Yes' : '✅ No'}
            </span>
          </div>

          <div>
            <strong>Can Make Payment:</strong>
            <br />
            <span style={{ fontFamily: 'monospace', fontSize: '16px' }}>
              {state.canMakePayment === null
                ? '❓ Unknown'
                : state.canMakePayment
                  ? '✅ Yes'
                  : '❌ No'}
            </span>
          </div>

          <div>
            <strong>Has Response:</strong>
            <br />
            <span style={{ fontFamily: 'monospace', fontSize: '16px' }}>
              {state.response ? '📄 Yes' : '⭕ No'}
            </span>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {state.error && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#ffebee',
            border: '2px solid #f44336',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <h3>❌ Error</h3>
          <p>
            <strong>Type:</strong> {state.error.type}
          </p>
          <p>
            <strong>Message:</strong> {state.error.message}
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={clearError}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Clear Error
            </button>
            <button
              onClick={retry}
              style={{
                padding: '8px 16px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🔄 Retry Payment
            </button>
          </div>
        </div>
      )}

      {/* Shopping Cart */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🛒 Shopping Cart</h3>
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        >
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '15px',
                borderBottom:
                  index < cartItems.length - 1 ? '1px solid #eee' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: 1 }}>
                <strong>{item.label}</strong>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
              >
                <input
                  type='number'
                  value={item.amount}
                  onChange={e =>
                    updateCartItem(index, parseFloat(e.target.value) || 0)
                  }
                  style={{
                    width: '80px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                  step='0.01'
                  min='0'
                />
                <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                  {PaymentRequestUtils.formatCurrency(item.amount)}
                </span>
                <button
                  onClick={() => removeCartItem(index)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <div style={{ padding: '15px', borderTop: '1px solid #eee' }}>
            <button
              onClick={addCartItem}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ➕ Add Item
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div
          style={{
            marginTop: '15px',
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <h4>Order Summary</h4>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '5px',
            }}
          >
            <span>Subtotal:</span>
            <span style={{ fontFamily: 'monospace' }}>
              {PaymentRequestUtils.formatCurrency(subtotal)}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '5px',
            }}
          >
            <span>Shipping:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type='number'
                value={shipping}
                onChange={e => setShipping(parseFloat(e.target.value) || 0)}
                style={{
                  width: '60px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '12px',
                }}
                step='0.01'
                min='0'
              />
              <span style={{ fontFamily: 'monospace' }}>
                {PaymentRequestUtils.formatCurrency(shipping)}
              </span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '5px',
            }}
          >
            <span>Tax (8.5%):</span>
            <span style={{ fontFamily: 'monospace' }}>
              {PaymentRequestUtils.formatCurrency(tax)}
            </span>
          </div>
          <hr style={{ margin: '10px 0' }} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            <span>Total:</span>
            <span style={{ fontFamily: 'monospace', color: '#2196f3' }}>
              {PaymentRequestUtils.formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div style={{ marginBottom: '20px' }}>
        <h3>💳 Payment Methods</h3>
        <div
          style={{
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
            marginBottom: '15px',
          }}
        >
          {Object.entries(commonMethods).map(([method, description]) => {
            const methodKey =
              method === 'basic-card'
                ? 'basic-card'
                : method.includes('google')
                  ? 'google-pay'
                  : method.includes('apple')
                    ? 'apple-pay'
                    : 'other';

            return (
              <label
                key={method}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type='checkbox'
                  checked={selectedMethods.includes(methodKey)}
                  onChange={e => {
                    if (e.target.checked) {
                      setSelectedMethods(prev => [...prev, methodKey]);
                    } else {
                      setSelectedMethods(prev =>
                        prev.filter(m => m !== methodKey)
                      );
                    }
                  }}
                  style={{ marginRight: '8px' }}
                />
                <div>
                  <div style={{ fontWeight: 'bold' }}>
                    {method === 'basic-card'
                      ? 'Credit/Debit Cards'
                      : method.includes('google')
                        ? 'Google Pay'
                        : method.includes('apple')
                          ? 'Apple Pay'
                          : 'Other'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {description}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Payment Actions */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🔄 Payment Actions</h3>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={handleCanMakePaymentCheck}
            disabled={!isSupported || selectedMethods.length === 0}
            style={{
              padding: '10px 20px',
              backgroundColor:
                !isSupported || selectedMethods.length === 0
                  ? '#ccc'
                  : '#9c27b0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !isSupported || selectedMethods.length === 0
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            🔍 Check Payment Methods
          </button>

          <button
            onClick={handlePayment}
            disabled={
              !isSupported ||
              state.isProcessing ||
              selectedMethods.length === 0 ||
              cartItems.length === 0
            }
            style={{
              padding: '10px 20px',
              backgroundColor:
                !isSupported ||
                state.isProcessing ||
                selectedMethods.length === 0 ||
                cartItems.length === 0
                  ? '#ccc'
                  : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !isSupported ||
                state.isProcessing ||
                selectedMethods.length === 0 ||
                cartItems.length === 0
                  ? 'not-allowed'
                  : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            {state.isProcessing ? '⏳ Processing...' : '💳 Pay Now'}
          </button>

          <button
            onClick={abort}
            disabled={!state.isProcessing}
            style={{
              padding: '10px 20px',
              backgroundColor: !state.isProcessing ? '#ccc' : '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !state.isProcessing ? 'not-allowed' : 'pointer',
            }}
          >
            ⏹️ Cancel Payment
          </button>
        </div>
      </div>

      {/* Payment Response */}
      {state.response && (
        <div style={{ marginBottom: '20px' }}>
          <h3>📄 Payment Response</h3>
          <div
            style={{
              padding: '15px',
              backgroundColor: '#e8f5e8',
              border: '2px solid #4caf50',
              borderRadius: '8px',
              marginBottom: '15px',
            }}
          >
            <h4>✅ Payment Information Received</h4>
            <div style={{ fontSize: '14px', fontFamily: 'monospace' }}>
              <div>
                <strong>Request ID:</strong> {state.response.requestId}
              </div>
              <div>
                <strong>Method Name:</strong> {state.response.methodName}
              </div>
              <div>
                <strong>Payer Details:</strong>
              </div>
              <div style={{ marginLeft: '20px' }}>
                {state.response.payerName && (
                  <div>Name: {state.response.payerName}</div>
                )}
                {state.response.payerEmail && (
                  <div>Email: {state.response.payerEmail}</div>
                )}
                {state.response.payerPhone && (
                  <div>Phone: {state.response.payerPhone}</div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button
                onClick={() => handleCompletePayment('success')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                ✅ Complete (Success)
              </button>

              <button
                onClick={() => handleCompletePayment('fail')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                ❌ Complete (Fail)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment History */}
      <div style={{ marginBottom: '20px' }}>
        <h3>📊 Payment History</h3>
        <div
          style={{
            maxHeight: '250px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        >
          {paymentHistory.map((entry, index) => (
            <div
              key={index}
              style={{
                padding: '12px',
                borderBottom:
                  index < paymentHistory.length - 1 ? '1px solid #eee' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              <div>
                <strong>{entry.timestamp}</strong> - {entry.status}
                {entry.id && (
                  <span style={{ color: '#666' }}> (ID: {entry.id})</span>
                )}
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
              >
                <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                  {entry.amount}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    backgroundColor: '#fff',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  {entry.method}
                </span>
              </div>
            </div>
          ))}

          {paymentHistory.length === 0 && (
            <div
              style={{
                padding: '20px',
                textAlign: 'center',
                color: '#666',
                fontStyle: 'italic',
              }}
            >
              No payment attempts yet. Try making a payment!
            </div>
          )}
        </div>
      </div>

      {/* Browser Support */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🌐 Browser Support</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minWidth(250px, 1fr))',
            gap: '10px',
          }}
        >
          {Object.entries(browserSupport).map(([browser, support]) => (
            <div
              key={browser}
              style={{
                padding: '10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              <strong style={{ textTransform: 'capitalize' }}>
                {browser}:
              </strong>
              <br />
              {support}
            </div>
          ))}
        </div>
      </div>

      {/* Security Best Practices */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🔒 Security Best Practices</h3>
        <div
          style={{
            fontSize: '14px',
            backgroundColor: '#fff3e0',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #ff9800',
          }}
        >
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {securityPractices.map((practice, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                {practice}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Technical Details */}
      <div>
        <h3>🔧 Technical Details</h3>
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <strong>API Support:</strong>{' '}
            {isSupported ? '✅ Available' : '❌ Not Available'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Selected Methods:</strong>{' '}
            {selectedMethods.join(', ') || 'None'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Cart Items:</strong> {cartItems.length}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Total Amount:</strong>{' '}
            {PaymentRequestUtils.formatCurrency(total)}
          </div>
          <div>
            <strong>Can Make Payment:</strong>{' '}
            {state.canMakePayment === null
              ? 'Unknown'
              : state.canMakePayment.toString()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Basic Payment Request Story
export const BasicPaymentRequest: Story = {
  render: () => <PaymentRequestDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic payment request functionality with shopping cart management, multiple payment methods, and comprehensive payment flow handling.',
      },
    },
  },
};

// Stripe Integration Demo Story
export const StripeIntegrationDemo: Story = {
  render: () => {
    const StripeDemo: React.FC = () => {
      const paymentRequest = usePaymentRequest({
        debug: true,
        onPaymentSuccess: response => {
          console.log('Payment successful, would send to Stripe:', response);
        },
        onPaymentError: error => {
          console.error('Payment error:', error);
        },
      });

      const [merchantInfo] = useState({
        merchantName: 'Demo Store',
        country: 'US',
        currency: 'USD',
      });

      const handleStripePayment = async () => {
        // In real implementation, you would:
        // 1. Create PaymentIntent on your backend
        // 2. Get client_secret
        // 3. Use that in payment method data

        const paymentMethods = [
          paymentRequest.createBasicCardMethod(['visa', 'mastercard', 'amex']),
          paymentRequest.createGooglePayMethod({
            merchantName: merchantInfo.merchantName,
            merchantId: '12345678901234567890',
          }),
        ];

        const paymentDetails = PaymentRequestUtils.createPaymentDetails(
          [{ label: 'Subscription Plan', amount: 29.99 }],
          merchantInfo.currency
        );

        await paymentRequest.show(paymentMethods, paymentDetails, {
          requestPayerEmail: true,
          requestPayerName: true,
        });
      };

      return (
        <div style={{ padding: '20px', maxWidth: '800px' }}>
          <h3>💳 Stripe Integration Demo</h3>

          <div style={{ marginBottom: '20px' }}>
            <h4>Merchant Configuration</h4>
            <div
              style={{
                padding: '15px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '14px',
              }}
            >
              <div>
                <strong>Merchant:</strong> {merchantInfo.merchantName}
              </div>
              <div>
                <strong>Country:</strong> {merchantInfo.country}
              </div>
              <div>
                <strong>Currency:</strong> {merchantInfo.currency}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4>Integration Flow</h4>
            <div
              style={{
                padding: '15px',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            >
              <ol style={{ margin: 0, paddingLeft: '20px' }}>
                <li>User clicks "Pay with Stripe"</li>
                <li>PaymentRequest API shows native payment UI</li>
                <li>User selects payment method and enters details</li>
                <li>Payment data is sent to your backend</li>
                <li>Backend creates Stripe PaymentIntent</li>
                <li>Payment is processed securely by Stripe</li>
                <li>Response is sent back to complete the payment</li>
              </ol>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4>Backend Integration Example</h4>
            <pre
              style={{
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
                fontSize: '12px',
                overflow: 'auto',
              }}
            >{`// Backend API route (Node.js/Express + Stripe)
app.post('/api/payments/stripe', async (req, res) => {
  try {
    const { paymentData, amount } = req.body;
    
    // Create PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      payment_method_data: {
        type: 'card',
        card: {
          token: paymentData.details.id // From PaymentRequest
        }
      },
      confirm: true
    });
    
    if (paymentIntent.status === 'succeeded') {
      res.json({ success: true, paymentIntent });
    } else {
      res.json({ success: false, error: 'Payment failed' });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});`}</pre>
          </div>

          <button
            onClick={handleStripePayment}
            disabled={!paymentRequest.isSupported}
            style={{
              padding: '15px 30px',
              backgroundColor: !paymentRequest.isSupported ? '#ccc' : '#635bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: !paymentRequest.isSupported ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            💳 Pay with Stripe
          </button>

          {paymentRequest.state.response && (
            <div
              style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#e8f5e8',
                borderRadius: '8px',
                border: '2px solid #4caf50',
              }}
            >
              <h4>✅ Payment Response (would be sent to Stripe)</h4>
              <pre
                style={{
                  backgroundColor: '#fff',
                  padding: '10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  overflow: 'auto',
                }}
              >
                {JSON.stringify(
                  {
                    methodName: paymentRequest.state.response.methodName,
                    details: 'Payment details (tokenized)',
                    payerEmail: paymentRequest.state.response.payerEmail,
                    payerName: paymentRequest.state.response.payerName,
                    amount: 29.99,
                  },
                  null,
                  2
                )}
              </pre>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  onClick={() => paymentRequest.complete('success')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  ✅ Complete Payment
                </button>
              </div>
            </div>
          )}
        </div>
      );
    };

    return <StripeDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates Stripe integration pattern with PaymentRequest API, showing the complete flow from frontend to backend processing.',
      },
    },
  },
};

// Error Handling Story
export const ErrorHandlingPaymentRequest: Story = {
  render: () => {
    const ErrorDemo: React.FC = () => {
      const [errorScenario, setErrorScenario] = useState<string>('none');
      const [simulatedErrors, setSimulatedErrors] = useState<string[]>([]);

      const paymentRequest = usePaymentRequest({
        debug: true,
        onPaymentError: error => {
          setSimulatedErrors(prev => [
            `${new Date().toLocaleTimeString()}: ${error.type} - ${error.message}`,
            ...prev.slice(0, 4),
          ]);
        },
        onPaymentCancel: () => {
          setSimulatedErrors(prev => [
            `${new Date().toLocaleTimeString()}: Payment cancelled by user`,
            ...prev.slice(0, 4),
          ]);
        },
      });

      const handleErrorScenario = async () => {
        switch (errorScenario) {
          case 'invalid-methods':
            await paymentRequest.show([], {
              total: {
                label: 'Test',
                amount: { currency: 'USD', value: '1.00' },
              },
            });
            break;

          case 'invalid-details':
            await paymentRequest.show(
              [paymentRequest.createBasicCardMethod()],
              {} as any
            );
            break;

          case 'network-error':
            // Simulate network error during payment processing
            setSimulatedErrors(prev => [
              `${new Date().toLocaleTimeString()}: network_error - Failed to process payment due to network issues`,
              ...prev.slice(0, 4),
            ]);
            break;

          default:
            await paymentRequest.show(
              [paymentRequest.createBasicCardMethod()],
              PaymentRequestUtils.createPaymentDetails([
                { label: 'Test Product', amount: 9.99 },
              ])
            );
        }
      };

      const errorScenarios = [
        {
          value: 'none',
          label: 'Normal Payment',
          description: 'Standard payment flow',
        },
        {
          value: 'invalid-methods',
          label: 'Invalid Payment Methods',
          description: 'Empty payment methods array',
        },
        {
          value: 'invalid-details',
          label: 'Invalid Payment Details',
          description: 'Missing required payment details',
        },
        {
          value: 'network-error',
          label: 'Network Error',
          description: 'Simulated network failure',
        },
      ];

      return (
        <div style={{ padding: '20px', maxWidth: '800px' }}>
          <h3>⚠️ Error Handling Demo</h3>

          <div style={{ marginBottom: '20px' }}>
            <h4>Error Scenarios</h4>
            <div style={{ marginBottom: '15px' }}>
              {errorScenarios.map(scenario => (
                <label
                  key={scenario.value}
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type='radio'
                    value={scenario.value}
                    checked={errorScenario === scenario.value}
                    onChange={e => setErrorScenario(e.target.value)}
                    style={{ marginRight: '8px' }}
                  />
                  <strong>{scenario.label}</strong> - {scenario.description}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleErrorScenario}
            disabled={!paymentRequest.isSupported}
            style={{
              padding: '12px 24px',
              backgroundColor: !paymentRequest.isSupported ? '#ccc' : '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: !paymentRequest.isSupported ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            🧪 Test {errorScenarios.find(s => s.value === errorScenario)?.label}
          </button>

          {paymentRequest.state.error && (
            <div
              style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#ffebee',
                border: '2px solid #f44336',
                borderRadius: '8px',
              }}
            >
              <h4>❌ Current Error</h4>
              <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                <div>
                  <strong>Type:</strong> {paymentRequest.state.error.type}
                </div>
                <div>
                  <strong>Message:</strong> {paymentRequest.state.error.message}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  onClick={paymentRequest.clearError}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Clear Error
                </button>

                <button
                  onClick={paymentRequest.retry}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#2196f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  🔄 Retry
                </button>
              </div>
            </div>
          )}

          <div style={{ marginTop: '20px' }}>
            <h4>📋 Error Log</h4>
            <div
              style={{
                minHeight: '150px',
                maxHeight: '200px',
                overflowY: 'auto',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                padding: '10px',
              }}
            >
              {simulatedErrors.map((error, index) => (
                <div
                  key={index}
                  style={{
                    padding: '8px',
                    marginBottom: '5px',
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    border: '1px solid #eee',
                    color: '#d32f2f',
                  }}
                >
                  {error}
                </div>
              ))}

              {simulatedErrors.length === 0 && (
                <div
                  style={{
                    padding: '20px',
                    textAlign: 'center',
                    color: '#666',
                    fontStyle: 'italic',
                  }}
                >
                  No errors yet. Try testing different error scenarios!
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4>🛡️ Error Handling Best Practices</h4>
            <div
              style={{
                fontSize: '14px',
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
              }}
            >
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Graceful Degradation:</strong> Always provide fallback
                  payment methods
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Clear Error Messages:</strong> Show user-friendly
                  error descriptions
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Retry Mechanisms:</strong> Allow users to retry failed
                  payments
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Logging:</strong> Log errors for debugging and
                  monitoring
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Validation:</strong> Validate payment data before API
                  calls
                </li>
                <li>
                  <strong>Timeout Handling:</strong> Handle network timeouts
                  appropriately
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    };

    return <ErrorDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates comprehensive error handling patterns for payment requests, including validation errors, network issues, and user cancellations.',
      },
    },
  },
};
