import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './text-field';
import { useState } from 'react';
import { Button } from '../primitives/button';

const meta: Meta<typeof TextField> = {
  title: 'Structures/TextField Enhanced',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the field is required',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the field is disabled',
    },
    validateOnChange: {
      control: { type: 'boolean' },
      description: 'Whether to validate as user types',
    },
    hideValidationOnFocus: {
      control: { type: 'boolean' },
      description: 'Hide validation messages when focused',
    },
    showValidationLoader: {
      control: { type: 'boolean' },
      description: 'Show loading indicator during async validation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicValidation: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <div className="w-80 space-y-4">
        <TextField
          label="Username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          validationRules={{
            minLength: 3,
            maxLength: 20,
            pattern: /^[a-zA-Z0-9_]+$/,
          }}
          helperText="3-20 characters, letters, numbers, and underscores only"
          placeholder="Enter username"
        />
        <p className="text-sm text-gray-600">Current value: "{value}"</p>
      </div>
    );
  },
};

export const HandleAvailabilityCheck: Story = {
  render: () => {
    const [handle, setHandle] = useState('');
    const [isValid, setIsValid] = useState<boolean | null>(null);
    
    // Simulate API call to check handle availability
    const checkHandleAvailability = async (value: string): Promise<string | null> => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const unavailableHandles = ['admin', 'user', 'test', 'demo', 'api'];
      
      if (unavailableHandles.includes(value.toLowerCase())) {
        return 'This handle is not available';
      }
      
      return null; // Available
    };
    
    return (
      <div className="w-80 space-y-4">
        <h3 className="text-lg font-semibold">Create Your Handle</h3>
        <TextField
          label="Handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          required
          validationRules={{
            minLength: 3,
            maxLength: 15,
            pattern: /^[a-zA-Z0-9_]+$/,
          }}
          validateAsync={checkHandleAvailability}
          validationDelay={800}
          onValidationChange={setIsValid}
          helperText="3-15 characters, letters, numbers, and underscores only"
          placeholder="@yourhandle"
        />
        
        <div className="text-sm">
          <p className="text-gray-600">Try these handles:</p>
          <p className="text-red-600">• Unavailable: admin, user, test, demo, api</p>
          <p className="text-green-600">• Available: myhandle, uniquename, anything else</p>
        </div>
        
        {isValid !== null && (
          <div className={`text-sm font-medium ${isValid ? 'text-green-600' : 'text-red-600'}`}>
            Validation: {isValid ? 'Valid ✓' : 'Invalid ✗'}
          </div>
        )}
      </div>
    );
  },
};

export const EmailValidation: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    
    const validateEmail = (value: string): string | null => {
      if (!value) return null;
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
      
      return null;
    };
    
    // Simulate checking if email is already registered
    const checkEmailExists = async (value: string): Promise<string | null> => {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const existingEmails = ['admin@example.com', 'user@test.com', 'demo@acrobi.com'];
      
      if (existingEmails.includes(value.toLowerCase())) {
        return 'An account with this email already exists';
      }
      
      return null;
    };
    
    return (
      <div className="w-80 space-y-4">
        <h3 className="text-lg font-semibold">Account Registration</h3>
        <TextField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          validate={validateEmail}
          validateAsync={checkEmailExists}
          helperText="We'll send a verification email to this address"
          placeholder="your.email@example.com"
        />
        
        <div className="text-sm">
          <p className="text-gray-600">Try these emails:</p>
          <p className="text-red-600">• Existing: admin@example.com, user@test.com</p>
          <p className="text-green-600">• Available: any other valid email</p>
        </div>
      </div>
    );
  },
};

export const PasswordStrength: Story = {
  render: () => {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);
    
    const validatePasswordStrength = (value: string): string | null => {
      if (!value) return null;
      
      let score = 0;
      const requirements = [];
      
      if (value.length >= 8) score++;
      else requirements.push('at least 8 characters');
      
      if (/[a-z]/.test(value)) score++;
      else requirements.push('lowercase letter');
      
      if (/[A-Z]/.test(value)) score++;
      else requirements.push('uppercase letter');
      
      if (/\d/.test(value)) score++;
      else requirements.push('number');
      
      if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) score++;
      else requirements.push('special character');
      
      setStrength(score);
      
      if (score < 3) {
        return `Weak password. Missing: ${requirements.join(', ')}`;
      }
      
      return null;
    };
    
    const getStrengthColor = () => {
      if (strength < 2) return 'bg-red-500';
      if (strength < 4) return 'bg-yellow-500';
      return 'bg-green-500';
    };
    
    const getStrengthText = () => {
      if (strength < 2) return 'Weak';
      if (strength < 4) return 'Medium';
      return 'Strong';
    };
    
    return (
      <div className="w-80 space-y-4">
        <h3 className="text-lg font-semibold">Create Password</h3>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          validate={validatePasswordStrength}
          validateOnChange
          hideValidationOnFocus={false}
          helperText="Must include uppercase, lowercase, number, and special character"
          placeholder="Enter secure password"
        />
        
        {password && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Strength:</span>
              <span className={`text-sm font-medium ${
                strength < 2 ? 'text-red-600' : 
                strength < 4 ? 'text-yellow-600' : 
                'text-green-600'
              }`}>
                {getStrengthText()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                style={{ width: `${(strength / 5) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const FocusBlurBehavior: Story = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    
    return (
      <div className="w-80 space-y-6">
        <h3 className="text-lg font-semibold">Focus/Blur Validation Behavior</h3>
        
        <TextField
          label="Hide validation on focus (default)"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          required
          validationRules={{ minLength: 5 }}
          hideValidationOnFocus={true}
          helperText="Validation messages hide when you focus this field"
          placeholder="Type something short and focus/blur"
        />
        
        <TextField
          label="Always show validation"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          required
          validationRules={{ minLength: 5 }}
          hideValidationOnFocus={false}
          helperText="Validation messages always visible"
          placeholder="Type something short"
        />
      </div>
    );
  },
};

export const CustomValidation: Story = {
  render: () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    
    const validateName = (value: string): string | null => {
      if (!value) return null;
      if (value.length < 2) return 'Name must be at least 2 characters';
      if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name can only contain letters and spaces';
      return null;
    };
    
    const validateAge = (value: string): string | null => {
      if (!value) return null;
      const num = parseInt(value);
      if (isNaN(num)) return 'Age must be a number';
      if (num < 13) return 'Must be at least 13 years old';
      if (num > 120) return 'Age must be realistic';
      return null;
    };
    
    return (
      <div className="w-80 space-y-4">
        <h3 className="text-lg font-semibold">User Profile</h3>
        
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          validate={validateName}
          placeholder="John"
        />
        
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          validate={validateName}
          placeholder="Doe"
        />
        
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          validate={validateAge}
          placeholder="25"
        />
      </div>
    );
  },
};

export const AuthenticationForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      email: '',
      handle: '',
      password: '',
      confirmPassword: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationStates, setValidationStates] = useState<Record<string, boolean>>({});
    
    const updateField = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };
    
    const updateValidation = (field: string, isValid: boolean) => {
      setValidationStates(prev => ({ ...prev, [field]: isValid }));
    };
    
    const validateEmail = (value: string): string | null => {
      if (!value) return null;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : 'Please enter a valid email';
    };
    
    const checkEmailExists = async (value: string): Promise<string | null> => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const existing = ['admin@example.com', 'user@test.com'];
      return existing.includes(value) ? 'Email already registered' : null;
    };
    
    const checkHandleAvailability = async (value: string): Promise<string | null> => {
      await new Promise(resolve => setTimeout(resolve, 600));
      const unavailable = ['admin', 'user', 'test'];
      return unavailable.includes(value.toLowerCase()) ? 'Handle not available' : null;
    };
    
    const validatePassword = (value: string): string | null => {
      if (!value) return null;
      if (value.length < 8) return 'Password must be at least 8 characters';
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return 'Must contain uppercase, lowercase, and number';
      }
      return null;
    };
    
    const validateConfirmPassword = (value: string): string | null => {
      if (!value) return null;
      return value === formData.password ? null : 'Passwords do not match';
    };
    
    const handleSubmit = async () => {
      const allValid = Object.values(validationStates).every(Boolean);
      if (!allValid) {
        alert('Please fix validation errors before submitting');
        return;
      }
      
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Account created successfully!');
      setIsSubmitting(false);
    };
    
    const canSubmit = Object.keys(validationStates).length === 4 && 
                     Object.values(validationStates).every(Boolean) &&
                     Object.values(formData).every(v => v.trim());
    
    return (
      <div className="w-96 space-y-4">
        <h3 className="text-xl font-semibold">Create Account</h3>
        
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          required
          validate={validateEmail}
          validateAsync={checkEmailExists}
          onValidationChange={(isValid) => updateValidation('email', isValid)}
          placeholder="your.email@example.com"
        />
        
        <TextField
          label="Handle"
          value={formData.handle}
          onChange={(e) => updateField('handle', e.target.value)}
          required
          validationRules={{
            minLength: 3,
            maxLength: 15,
            pattern: /^[a-zA-Z0-9_]+$/,
          }}
          validateAsync={checkHandleAvailability}
          onValidationChange={(isValid) => updateValidation('handle', isValid)}
          placeholder="@yourhandle"
        />
        
        <TextField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => updateField('password', e.target.value)}
          required
          validate={validatePassword}
          onValidationChange={(isValid) => updateValidation('password', isValid)}
          placeholder="Create secure password"
        />
        
        <TextField
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => updateField('confirmPassword', e.target.value)}
          required
          validate={validateConfirmPassword}
          onValidationChange={(isValid) => updateValidation('confirmPassword', isValid)}
          placeholder="Confirm your password"
        />
        
        <Button 
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>
        
        <div className="text-xs text-gray-500">
          <p>Try existing email: admin@example.com</p>
          <p>Try unavailable handle: admin, user, test</p>
        </div>
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    label: 'Text Field',
    placeholder: 'Enter text...',
    helperText: 'This is helper text',
    required: false,
    disabled: false,
    orientation: 'vertical',
    validateOnChange: true,
    hideValidationOnFocus: true,
    showValidationLoader: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    
    return (
      <div className="w-80">
        <TextField
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          validationRules={{
            minLength: 3,
            maxLength: 20,
          }}
        />
      </div>
    );
  },
};