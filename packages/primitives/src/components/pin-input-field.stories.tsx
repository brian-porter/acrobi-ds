import type { Meta, StoryObj } from '@storybook/react-vite';
import { PinInputField } from './pin-input-field';
import { useState } from 'react';
import { Button } from './button';

const meta: Meta<typeof PinInputField> = {
  title: 'Primitives/PinInputField',
  component: PinInputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: { type: 'number', min: 2, max: 10 },
      description: 'Number of digits in the PIN',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input fields',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outline'],
      description: 'Visual style variant',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'disabled'],
      description: 'Input state',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'numeric', 'alphanumeric'],
      description: 'Input type restriction',
    },
    mask: {
      control: { type: 'boolean' },
      description: 'Hide digits with dots for security',
    },
    autoFocus: {
      control: { type: 'boolean' },
      description: 'Auto-focus first input on mount',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable all inputs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <div className="space-y-4">
        <PinInputField
          length={6}
          value={value}
          onChange={setValue}
          onComplete={(pin) => alert(`PIN completed: ${pin}`)}
        />
        <p className="text-sm text-gray-600">Current value: {value}</p>
      </div>
    );
  },
};

export const VerificationCode: Story = {
  render: () => {
    const [code, setCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState('');
    
    const handleComplete = async (verificationCode: string) => {
      setIsVerifying(true);
      setError('');
      
      // Simulate API call
      setTimeout(() => {
        if (verificationCode === '123456') {
          alert('Verification successful!');
          setError('');
        } else {
          setError('Invalid verification code. Please try again.');
          setCode(''); // Clear the input
        }
        setIsVerifying(false);
      }, 1000);
    };
    
    return (
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Verify your phone</h2>
          <p className="text-gray-600 mb-4">
            Enter the 6-digit code sent to your phone
          </p>
        </div>
        
        <PinInputField
          length={6}
          type="numeric"
          value={code}
          onChange={setCode}
          onComplete={handleComplete}
          state={error ? 'error' : 'default'}
          error={error}
          disabled={isVerifying}
          autoFocus
          aria-label="Verification code"
        />
        
        <div className="flex justify-between items-center text-sm">
          <button 
            className="text-blue-600 hover:text-blue-700"
            onClick={() => alert('Resending code...')}
          >
            Resend code
          </button>
          <span className="text-gray-500">Try: 123456</span>
        </div>
      </div>
    );
  },
};

export const SecurePIN: Story = {
  render: () => {
    const [pin, setPin] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    
    return (
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Create PIN</h2>
          <p className="text-gray-600 mb-4">
            Enter a 4-digit PIN for secure access
          </p>
        </div>
        
        <PinInputField
          length={4}
          type="numeric"
          mask
          value={pin}
          onChange={setPin}
          onComplete={(pinValue) => {
            setConfirmed(true);
            setTimeout(() => setConfirmed(false), 2000);
          }}
          state={confirmed ? 'success' : 'default'}
          success={confirmed ? 'PIN created successfully!' : undefined}
          autoFocus
          aria-label="Security PIN"
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [smallValue, setSmallValue] = useState('');
    const [mediumValue, setMediumValue] = useState('');
    const [largeValue, setLargeValue] = useState('');
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Small</h3>
          <PinInputField
            length={4}
            size="sm"
            value={smallValue}
            onChange={setSmallValue}
            placeholder="0"
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Medium</h3>
          <PinInputField
            length={4}
            size="md"
            value={mediumValue}
            onChange={setMediumValue}
            placeholder="0"
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Large</h3>
          <PinInputField
            length={4}
            size="lg"
            value={largeValue}
            onChange={setLargeValue}
            placeholder="0"
          />
        </div>
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [defaultValue, setDefaultValue] = useState('');
    const [filledValue, setFilledValue] = useState('');
    const [outlineValue, setOutlineValue] = useState('');
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Default</h3>
          <PinInputField
            length={4}
            variant="default"
            value={defaultValue}
            onChange={setDefaultValue}
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Filled</h3>
          <PinInputField
            length={4}
            variant="filled"
            value={filledValue}
            onChange={setFilledValue}
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Outline</h3>
          <PinInputField
            length={4}
            variant="outline"
            value={outlineValue}
            onChange={setOutlineValue}
          />
        </div>
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const [defaultValue, setDefaultValue] = useState('');
    const [errorValue, setErrorValue] = useState('1234');
    const [successValue, setSuccessValue] = useState('5678');
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Default</h3>
          <PinInputField
            length={4}
            state="default"
            value={defaultValue}
            onChange={setDefaultValue}
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Error</h3>
          <PinInputField
            length={4}
            state="error"
            value={errorValue}
            onChange={setErrorValue}
            error="Invalid PIN. Please try again."
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Success</h3>
          <PinInputField
            length={4}
            state="success"
            value={successValue}
            onChange={setSuccessValue}
            success="PIN verified successfully!"
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Disabled</h3>
          <PinInputField
            length={4}
            disabled
            value="1234"
          />
        </div>
      </div>
    );
  },
};

export const InputTypes: Story = {
  render: () => {
    const [numericValue, setNumericValue] = useState('');
    const [alphanumericValue, setAlphanumericValue] = useState('');
    const [textValue, setTextValue] = useState('');
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Numeric Only</h3>
          <PinInputField
            length={4}
            type="numeric"
            value={numericValue}
            onChange={setNumericValue}
            placeholder="0"
          />
          <p className="text-sm text-gray-600 mt-2">Only numbers allowed</p>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Alphanumeric</h3>
          <PinInputField
            length={4}
            type="alphanumeric"
            value={alphanumericValue}
            onChange={setAlphanumericValue}
            placeholder="A"
          />
          <p className="text-sm text-gray-600 mt-2">Letters and numbers allowed</p>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Text (Any Character)</h3>
          <PinInputField
            length={4}
            type="text"
            value={textValue}
            onChange={setTextValue}
            placeholder="?"
          />
          <p className="text-sm text-gray-600 mt-2">Any character allowed</p>
        </div>
      </div>
    );
  },
};

export const AuthenticationFlow: Story = {
  render: () => {
    const [step, setStep] = useState<'phone' | 'verify' | 'pin' | 'success'>('phone');
    const [phone, setPhone] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    
    const handlePhoneSubmit = () => {
      if (phone.length >= 10) {
        setStep('verify');
        setError('');
      } else {
        setError('Please enter a valid phone number');
      }
    };
    
    const handleVerification = (code: string) => {
      if (code === '123456') {
        setStep('pin');
        setError('');
      } else {
        setError('Invalid verification code');
        setVerificationCode('');
      }
    };
    
    const handlePinCreation = (pinCode: string) => {
      setStep('success');
    };
    
    const reset = () => {
      setStep('phone');
      setPhone('');
      setVerificationCode('');
      setPin('');
      setError('');
    };
    
    return (
      <div className="w-full max-w-md space-y-6">
        {step === 'phone' && (
          <>
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Enter Phone Number</h2>
              <p className="text-gray-600 mb-4">We'll send you a verification code</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button onClick={handlePhoneSubmit} className="w-full">
                Send Code
              </Button>
            </div>
          </>
        )}
        
        {step === 'verify' && (
          <>
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Verify Phone</h2>
              <p className="text-gray-600 mb-4">
                Enter the code sent to {phone}
              </p>
            </div>
            
            <PinInputField
              length={6}
              type="numeric"
              value={verificationCode}
              onChange={setVerificationCode}
              onComplete={handleVerification}
              state={error ? 'error' : 'default'}
              error={error}
              autoFocus
            />
            
            <div className="text-center">
              <button 
                onClick={() => setStep('phone')}
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                ← Back to phone number
              </button>
              <p className="text-sm text-gray-500 mt-2">Try: 123456</p>
            </div>
          </>
        )}
        
        {step === 'pin' && (
          <>
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Create PIN</h2>
              <p className="text-gray-600 mb-4">
                Choose a 4-digit PIN for secure access
              </p>
            </div>
            
            <PinInputField
              length={4}
              type="numeric"
              mask
              value={pin}
              onChange={setPin}
              onComplete={handlePinCreation}
              autoFocus
            />
          </>
        )}
        
        {step === 'success' && (
          <>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Account Created!</h2>
              <p className="text-gray-600 mb-4">
                Your account has been set up successfully
              </p>
            </div>
            
            <Button onClick={reset} className="w-full">
              Try Again
            </Button>
          </>
        )}
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    length: 6,
    size: 'md',
    variant: 'outline',
    state: 'default',
    type: 'numeric',
    mask: false,
    autoFocus: true,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    
    return (
      <div className="space-y-4">
        <PinInputField
          {...args}
          value={value}
          onChange={setValue}
          onComplete={(pin) => alert(`Completed: ${pin}`)}
        />
        <p className="text-sm text-gray-600">Value: {value}</p>
      </div>
    );
  },
};