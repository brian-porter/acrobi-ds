import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextfieldCtrl } from './textfield-ctrl';
import { useState } from 'react';

const meta: Meta<typeof TextfieldCtrl> = {
  title: 'Primitives/TextfieldCtrl',
  component: TextfieldCtrl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='p-6 min-w-96'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    fldTxt: {
      control: { type: 'boolean' },
      description: 'Show textfield component',
    },
    fldIcn: {
      control: { type: 'boolean' },
      description: 'Show field icon',
    },
    fldBtn: {
      control: { type: 'boolean' },
      description: 'Show field button',
    },
    fbk: {
      control: { type: 'boolean' },
      description: 'Show feedback message',
    },
    fldPholdSrc: {
      control: { type: 'text' },
      description: 'Field placeholder text',
    },
    fldIcnSrc: {
      control: { type: 'text' },
      description: 'Field icon name',
    },
    fbkFbkTxtSrc: {
      control: { type: 'text' },
      description: 'Feedback message text',
    },
    fbkFbkClr: {
      control: { type: 'select' },
      options: ['fd500', 'fw500', 'f500', 'p500', 'n500', 'fs500'],
      description: 'Feedback message color',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'Component variant',
    },
    inpType: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'tel', 'url', 'search'],
      description: 'Input type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fldTxt: true,
    fldPholdSrc: 'Enter your message',
    inpType: 'text',
    inpName: 'message',
  },
};

export const WithIcon: Story = {
  args: {
    fldTxt: true,
    fldIcn: true,
    fldIcnSrc: 'search',
    fldPholdSrc: 'Search...',
    inpType: 'search',
    inpName: 'search',
  },
};

export const WithButton: Story = {
  args: {
    fldTxt: true,
    fldBtn: true,
    fldBtnIcnSrc: 'mic',
    fldBtnIcnAlt: 'Voice input',
    fldPholdSrc: 'Speak or type your message',
    inpName: 'voice-input',
  },
};

export const WithFeedback: Story = {
  args: {
    fldTxt: true,
    fbk: true,
    fbkFbkTxtSrc: 'This field is required',
    fbkFbkClr: 'fd500',
    fldPholdSrc: 'Required field',
    required: true,
    inpName: 'required-field',
  },
};

export const WithIconAndButton: Story = {
  args: {
    fldTxt: true,
    fldIcn: true,
    fldIcnSrc: 'search',
    fldBtn: true,
    fldBtnIcnSrc: 'mic',
    fldBtnIcnAlt: 'Voice search',
    fldPholdSrc: 'Search or speak your query',
    inpType: 'search',
    inpName: 'advanced-search',
  },
};

export const EmailInput: Story = {
  args: {
    fldTxt: true,
    fldIcn: true,
    fldIcnSrc: 'mail',
    fldPholdSrc: 'Enter your email address',
    inpType: 'email',
    inpName: 'email',
    required: true,
    fbk: true,
    fbkFbkTxtSrc: "We'll never share your email",
    fbkFbkClr: 'n500',
  },
};

export const PasswordInput: Story = {
  args: {
    fldTxt: true,
    fldIcn: true,
    fldIcnSrc: 'lock',
    fldBtn: true,
    fldBtnIcnSrc: 'visibility',
    fldBtnIcnAlt: 'Toggle password visibility',
    fldPholdSrc: 'Enter your password',
    inpType: 'password',
    inpName: 'password',
    required: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [values, setValues] = useState({
      basic: '',
      search: '',
      email: '',
      password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [searchFeedback, setSearchFeedback] = useState('');

    const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues(prev => ({ ...prev, basic: e.target.value }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValues(prev => ({ ...prev, search: value }));

      if (value.length > 0 && value.length < 3) {
        setSearchFeedback('Enter at least 3 characters');
      } else if (value.length >= 3) {
        setSearchFeedback(
          `Found ${Math.floor(Math.random() * 50) + 1} results`
        );
      } else {
        setSearchFeedback('');
      }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues(prev => ({ ...prev, email: e.target.value }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues(prev => ({ ...prev, password: e.target.value }));
    };

    const handlePasswordToggle = () => {
      setShowPassword(!showPassword);
    };

    const handleVoiceInput = () => {
      alert('Voice input would be triggered here');
    };

    return (
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold mb-4'>
            Interactive Text Fields
          </h3>
          <p className='text-sm text-gray-600 mb-6'>
            Try typing in the fields below to see real-time interactions.
          </p>
        </div>

        <div className='space-y-4'>
          <div>
            <h4 className='font-medium mb-2'>Basic Text Input</h4>
            <TextfieldCtrl
              fldPholdSrc='Type something here...'
              value={values.basic}
              onChange={handleBasicChange}
              inpName='basic-input'
            />
            {values.basic && (
              <p className='text-xs text-gray-500 mt-1'>
                Character count: {values.basic.length}
              </p>
            )}
          </div>

          <div>
            <h4 className='font-medium mb-2'>Search with Feedback</h4>
            <TextfieldCtrl
              fldIcn={true}
              fldIcnSrc='search'
              fldBtn={true}
              fldBtnIcnSrc='mic'
              fldBtnIcnAlt='Voice search'
              fldBtnClick={{ onClick: handleVoiceInput }}
              fldPholdSrc='Search products...'
              value={values.search}
              onChange={handleSearchChange}
              inpType='search'
              inpName='search-input'
              fbk={!!searchFeedback}
              fbkFbkTxtSrc={searchFeedback}
              fbkFbkClr={
                values.search.length < 3 && values.search.length > 0
                  ? 'fw500'
                  : 'f500'
              }
            />
          </div>

          <div>
            <h4 className='font-medium mb-2'>Email Validation</h4>
            <TextfieldCtrl
              fldIcn={true}
              fldIcnSrc='mail'
              fldPholdSrc='Enter your email'
              value={values.email}
              onChange={handleEmailChange}
              inpType='email'
              inpName='email-input'
              required={true}
              fbk={values.email.length > 0}
              fbkFbkTxtSrc={
                values.email.includes('@')
                  ? 'Valid email format'
                  : values.email.length > 0
                    ? 'Please enter a valid email'
                    : ''
              }
              fbkFbkClr={values.email.includes('@') ? 'fs500' : 'fd500'}
              fbkFbkIcn={true}
              fbkFbkIcnSrc={
                values.email.includes('@') ? 'check_circle' : 'error'
              }
            />
          </div>

          <div>
            <h4 className='font-medium mb-2'>Password with Toggle</h4>
            <TextfieldCtrl
              fldIcn={true}
              fldIcnSrc='lock'
              fldBtn={true}
              fldBtnIcnSrc={showPassword ? 'visibility_off' : 'visibility'}
              fldBtnIcnAlt={showPassword ? 'Hide password' : 'Show password'}
              fldBtnClick={{ onClick: handlePasswordToggle }}
              fldPholdSrc='Enter secure password'
              value={values.password}
              onChange={handlePasswordChange}
              inpType={showPassword ? 'text' : 'password'}
              inpName='password-input'
              fbk={values.password.length > 0}
              fbkFbkTxtSrc={
                values.password.length < 8
                  ? 'Password must be at least 8 characters'
                  : 'Password strength: Good'
              }
              fbkFbkClr={values.password.length < 8 ? 'fw500' : 'fs500'}
            />
          </div>
        </div>

        <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
          <h4 className='font-medium text-gray-800 mb-2'>Current Values</h4>
          <pre className='text-xs text-gray-600'>
            {JSON.stringify(values, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange =
      (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));

        // Clear error when user starts typing
        if (errors[field]) {
          setErrors(prev => ({ ...prev, [field]: '' }));
        }
      };

    const validateForm = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.firstName.trim())
        newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim())
        newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!formData.email.includes('@'))
        newErrors.email = 'Please enter a valid email';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.message.trim()) newErrors.message = 'Message is required';

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (validateForm()) {
        console.log('Form submitted:', formData);
        alert('Form submitted successfully! Check console for data.');
      }
    };

    return (
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Contact Form</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Fill out all required fields to submit the form.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <TextfieldCtrl
                fldIcn={true}
                fldIcnSrc='person'
                fldPholdSrc='First Name'
                value={formData.firstName}
                onChange={handleChange('firstName')}
                inpName='firstName'
                required={true}
                fbk={!!errors.firstName}
                fbkFbkTxtSrc={errors.firstName}
                fbkFbkClr='fd500'
                variant={errors.firstName ? 'error' : 'default'}
              />
            </div>

            <div>
              <TextfieldCtrl
                fldIcn={true}
                fldIcnSrc='person'
                fldPholdSrc='Last Name'
                value={formData.lastName}
                onChange={handleChange('lastName')}
                inpName='lastName'
                required={true}
                fbk={!!errors.lastName}
                fbkFbkTxtSrc={errors.lastName}
                fbkFbkClr='fd500'
                variant={errors.lastName ? 'error' : 'default'}
              />
            </div>
          </div>

          <div>
            <TextfieldCtrl
              fldIcn={true}
              fldIcnSrc='mail'
              fldPholdSrc='Email Address'
              value={formData.email}
              onChange={handleChange('email')}
              inpType='email'
              inpName='email'
              required={true}
              fbk={!!errors.email}
              fbkFbkTxtSrc={errors.email}
              fbkFbkClr='fd500'
              variant={errors.email ? 'error' : 'default'}
            />
          </div>

          <div>
            <TextfieldCtrl
              fldIcn={true}
              fldIcnSrc='phone'
              fldPholdSrc='Phone Number'
              value={formData.phone}
              onChange={handleChange('phone')}
              inpType='tel'
              inpName='phone'
              required={true}
              fbk={!!errors.phone}
              fbkFbkTxtSrc={errors.phone}
              fbkFbkClr='fd500'
              variant={errors.phone ? 'error' : 'default'}
            />
          </div>

          <div>
            <TextfieldCtrl
              fldIcn={true}
              fldIcnSrc='business'
              fldPholdSrc='Company (Optional)'
              value={formData.company}
              onChange={handleChange('company')}
              inpName='company'
            />
          </div>

          <div>
            <TextfieldCtrl
              fldIcn={true}
              fldIcnSrc='edit'
              fldPholdSrc='Your message...'
              value={formData.message}
              onChange={handleChange('message')}
              inpName='message'
              required={true}
              fbk={!!errors.message}
              fbkFbkTxtSrc={errors.message}
              fbkFbkClr='fd500'
              variant={errors.message ? 'error' : 'default'}
            />
          </div>

          <div className='flex gap-3 pt-4'>
            <button
              type='submit'
              className='px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
            >
              Send Message
            </button>
            <button
              type='button'
              className='px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors'
              onClick={() => {
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  company: '',
                  message: '',
                });
                setErrors({});
              }}
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    );
  },
};

export const VariantShowcase: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Input Variants</h3>
      </div>

      <div className='space-y-4'>
        <div>
          <h4 className='font-medium mb-2'>Default State</h4>
          <TextfieldCtrl fldPholdSrc='Default input' variant='default' />
        </div>

        <div>
          <h4 className='font-medium mb-2'>Error State</h4>
          <TextfieldCtrl
            fldPholdSrc='Error input'
            variant='error'
            fbk={true}
            fbkFbkTxtSrc='This field has an error'
            fbkFbkClr='fd500'
            fbkFbkIcn={true}
            fbkFbkIcnSrc='error'
          />
        </div>

        <div>
          <h4 className='font-medium mb-2'>Success State</h4>
          <TextfieldCtrl
            fldPholdSrc='Success input'
            variant='success'
            value='Valid input value'
            fbk={true}
            fbkFbkTxtSrc='This field is valid'
            fbkFbkClr='fs500'
            fbkFbkIcn={true}
            fbkFbkIcnSrc='check_circle'
          />
        </div>

        <div>
          <h4 className='font-medium mb-2'>Warning State</h4>
          <TextfieldCtrl
            fldPholdSrc='Warning input'
            variant='warning'
            fbk={true}
            fbkFbkTxtSrc='This field needs attention'
            fbkFbkClr='fw500'
            fbkFbkIcn={true}
            fbkFbkIcnSrc='warning'
          />
        </div>

        <div>
          <h4 className='font-medium mb-2'>Disabled State</h4>
          <TextfieldCtrl
            fldPholdSrc='Disabled input'
            disabled={true}
            value='Cannot edit this'
          />
        </div>

        <div>
          <h4 className='font-medium mb-2'>Read Only State</h4>
          <TextfieldCtrl
            fldPholdSrc='Read only input'
            readOnly={true}
            value='Read only value'
            fbk={true}
            fbkFbkTxtSrc='This field is read-only'
            fbkFbkClr='n500'
          />
        </div>
      </div>
    </div>
  ),
};

export const AllFeatures: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-lg font-semibold mb-3'>Basic Input</h3>
        <TextfieldCtrl fldPholdSrc='Simple text input' />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>With Icon</h3>
        <TextfieldCtrl
          fldIcn={true}
          fldIcnSrc='search'
          fldPholdSrc='Search with icon'
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>With Button</h3>
        <TextfieldCtrl
          fldBtn={true}
          fldBtnIcnSrc='send'
          fldBtnIcnAlt='Send message'
          fldPholdSrc='Message with send button'
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>With Feedback</h3>
        <TextfieldCtrl
          fldPholdSrc='Input with feedback'
          fbk={true}
          fbkFbkTxtSrc='Helpful feedback message'
          fbkFbkClr='f500'
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>All Features Combined</h3>
        <TextfieldCtrl
          fldIcn={true}
          fldIcnSrc='search'
          fldBtn={true}
          fldBtnIcnSrc='mic'
          fldBtnIcnAlt='Voice input'
          fldPholdSrc='Search or speak your query'
          fbk={true}
          fbkFbkTxtSrc='Use voice or type to search'
          fbkFbkClr='p500'
          fbkFbkIcn={true}
          fbkFbkIcnSrc='info'
        />
      </div>
    </div>
  ),
};
