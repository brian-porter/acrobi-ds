import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from './radio';
import { useState } from 'react';

const meta: Meta<typeof Radio> = {
  title: 'Primitives/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default radio',
    name: 'default',
    value: 'default',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked radio',
    name: 'checked',
    value: 'checked',
    checked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Premium Plan',
    description: 'Access to all features and priority support',
    name: 'plan',
    value: 'premium',
  },
};

export const WithError: Story = {
  args: {
    label: 'Required option',
    error: 'Please select an option',
    variant: 'error',
    name: 'required',
    value: 'required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled radio',
    name: 'disabled',
    value: 'disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    name: 'disabled-checked',
    value: 'disabled-checked',
    checked: true,
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small radio',
    name: 'small',
    value: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large radio',
    name: 'large',
    value: 'large',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='space-y-4'>
      <Radio size='sm' label='Small radio' name='sizes' value='sm' />
      <Radio size='md' label='Medium radio (default)' name='sizes' value='md' />
      <Radio size='lg' label='Large radio' name='sizes' value='lg' />
    </div>
  ),
};

// RadioGroup Stories
const radioGroupMeta: Meta<typeof RadioGroup> = {
  title: 'Primitives/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'error'],
    },
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
  },
};

type RadioGroupStory = StoryObj<typeof radioGroupMeta>;

export const BasicGroup: RadioGroupStory = {
  args: {
    name: 'plan',
    options: [
      { value: 'free', label: 'Free Plan' },
      { value: 'pro', label: 'Pro Plan' },
      { value: 'enterprise', label: 'Enterprise Plan' },
    ],
    value: 'pro',
  },
};

export const WithDescriptions: RadioGroupStory = {
  args: {
    name: 'subscription',
    options: [
      {
        value: 'monthly',
        label: 'Monthly Subscription',
        description: '$9.99/month - Cancel anytime',
      },
      {
        value: 'yearly',
        label: 'Yearly Subscription',
        description: '$99.99/year - Save 17%',
      },
      {
        value: 'lifetime',
        label: 'Lifetime Access',
        description: '$299.99 one-time - Never pay again',
      },
    ],
    value: 'yearly',
  },
};

export const HorizontalGroup: RadioGroupStory = {
  args: {
    name: 'size',
    orientation: 'horizontal',
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
    ],
    value: 'medium',
  },
};

export const WithDisabledOptions: RadioGroupStory = {
  args: {
    name: 'features',
    options: [
      { value: 'basic', label: 'Basic Features' },
      { value: 'advanced', label: 'Advanced Features', disabled: true },
      { value: 'premium', label: 'Premium Features', disabled: true },
    ],
    value: 'basic',
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('medium');

    const options = [
      { value: 'small', label: 'Small', description: 'Compact size' },
      { value: 'medium', label: 'Medium', description: 'Standard size' },
      { value: 'large', label: 'Large', description: 'Spacious size' },
    ];

    return (
      <div className='space-y-4'>
        <RadioGroup
          name='interactive'
          options={options}
          value={selectedValue}
          onValueChange={setSelectedValue}
        />

        <div className='text-sm text-muted-foreground p-3 bg-muted rounded'>
          Selected: {selectedValue}
        </div>
      </div>
    );
  },
};

export const PaymentMethod: Story = {
  render: () => {
    const [paymentMethod, setPaymentMethod] = useState('credit-card');

    const paymentOptions = [
      {
        value: 'credit-card',
        label: 'Credit Card',
        description: 'Visa, Mastercard, American Express',
      },
      {
        value: 'paypal',
        label: 'PayPal',
        description: 'Pay with your PayPal account',
      },
      {
        value: 'bank-transfer',
        label: 'Bank Transfer',
        description: 'Direct bank transfer (3-5 business days)',
      },
      {
        value: 'crypto',
        label: 'Cryptocurrency',
        description: 'Bitcoin, Ethereum, and more',
        disabled: true,
      },
    ];

    return (
      <div className='w-80 space-y-4'>
        <h3 className='font-medium'>Choose Payment Method</h3>

        <RadioGroup
          name='payment'
          options={paymentOptions}
          value={paymentMethod}
          onValueChange={setPaymentMethod}
        />

        <div className='text-xs text-muted-foreground p-3 bg-muted rounded'>
          <strong>Selected method:</strong>{' '}
          {paymentOptions.find(option => option.value === paymentMethod)?.label}
        </div>
      </div>
    );
  },
};

export const Survey: Story = {
  render: () => {
    const [satisfaction, setSatisfaction] = useState('');
    const [frequency, setFrequency] = useState('');

    const satisfactionOptions = [
      { value: 'very-satisfied', label: 'Very Satisfied' },
      { value: 'satisfied', label: 'Satisfied' },
      { value: 'neutral', label: 'Neutral' },
      { value: 'dissatisfied', label: 'Dissatisfied' },
      { value: 'very-dissatisfied', label: 'Very Dissatisfied' },
    ];

    const frequencyOptions = [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
      { value: 'rarely', label: 'Rarely' },
    ];

    return (
      <div className='w-80 space-y-6'>
        <div>
          <h4 className='font-medium mb-3'>
            How satisfied are you with our service?
          </h4>
          <RadioGroup
            name='satisfaction'
            options={satisfactionOptions}
            value={satisfaction}
            onValueChange={setSatisfaction}
            size='sm'
          />
        </div>

        <div>
          <h4 className='font-medium mb-3'>
            How often do you use our product?
          </h4>
          <RadioGroup
            name='frequency'
            options={frequencyOptions}
            value={frequency}
            onValueChange={setFrequency}
            orientation='horizontal'
            size='sm'
          />
        </div>
      </div>
    );
  },
};
