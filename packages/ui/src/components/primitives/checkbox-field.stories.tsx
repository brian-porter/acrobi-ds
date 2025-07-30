import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxField } from './checkbox-field';
import { useState } from 'react';
import { Button } from './button';
import { Dialog } from './dialog';

const meta: Meta<typeof CheckboxField> = {
  title: 'Primitives/CheckboxField',
  component: CheckboxField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox and text',
    },
    alignment: {
      control: { type: 'select' },
      options: ['start', 'center', 'top'],
      description: 'Vertical alignment of checkbox and label',
    },
    spacing: {
      control: { type: 'select' },
      options: ['tight', 'normal', 'loose'],
      description: 'Space between checkbox and label',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'disabled'],
      description: 'Visual state of the field',
    },
    checkboxSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox itself',
    },
    labelWeight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold'],
      description: 'Font weight of the label text',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is required',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <CheckboxField
        label="I agree to receive marketing emails"
        checked={checked}
        onChange={setChecked}
      />
    );
  },
};

export const TermsOfService: Story = {
  render: () => {
    const [agreed, setAgreed] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [error, setError] = useState('');
    
    const handleSubmit = () => {
      if (!agreed) {
        setError('You must agree to the Terms of Service and Privacy Policy to continue');
      } else {
        setError('');
        alert('Form submitted successfully!');
      }
    };
    
    return (
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Create Account</h2>
        
        <CheckboxField
          label="I agree to the Terms of Service and Privacy Policy"
          links={[
            {
              text: "Terms of Service",
              onClick: () => setShowTerms(true),
              variant: "primary",
              "aria-label": "Open Terms of Service"
            },
            {
              text: "Privacy Policy",
              onClick: () => setShowPrivacy(true),
              variant: "primary",
              "aria-label": "Open Privacy Policy"
            }
          ]}
          checked={agreed}
          onChange={(checked) => {
            setAgreed(checked);
            if (checked) setError('');
          }}
          required
          error={error}
          helpText="By checking this box, you confirm that you have read and understood our policies"
        />
        
        <Button onClick={handleSubmit} className="w-full">
          Create Account
        </Button>
        
        {/* Terms of Service Modal */}
        <Dialog
          open={showTerms}
          onOpenChange={setShowTerms}
          size="lg"
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Terms of Service</h2>
            <div className="max-h-96 overflow-y-auto text-sm space-y-4">
              <p>
                <strong>1. Acceptance of Terms</strong><br />
                By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <p>
                <strong>2. Use License</strong><br />
                Permission is granted to temporarily download one copy of the materials on this website for personal, non-commercial transitory viewing only.
              </p>
              <p>
                <strong>3. Disclaimer</strong><br />
                The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p>
                <strong>4. Limitations</strong><br />
                In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.
              </p>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowTerms(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setShowTerms(false);
                setAgreed(true);
                setError('');
              }}>
                Accept Terms
              </Button>
            </div>
          </div>
        </Dialog>
        
        {/* Privacy Policy Modal */}
        <Dialog
          open={showPrivacy}
          onOpenChange={setShowPrivacy}
          size="lg"
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
            <div className="max-h-96 overflow-y-auto text-sm space-y-4">
              <p>
                <strong>Information We Collect</strong><br />
                We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
              </p>
              <p>
                <strong>How We Use Your Information</strong><br />
                We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
              </p>
              <p>
                <strong>Information Sharing</strong><br />
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
              </p>
              <p>
                <strong>Data Security</strong><br />
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowPrivacy(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setShowPrivacy(false);
                setAgreed(true);
                setError('');
              }}>
                Accept Policy
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  },
};

export const NewsletterSubscription: Story = {
  render: () => {
    const [subscribeNews, setSubscribeNews] = useState(false);
    const [subscribeUpdates, setSubscribeUpdates] = useState(true);
    const [subscribeMarketing, setSubscribeMarketing] = useState(false);
    
    return (
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Email Preferences</h2>
        
        <div className="space-y-3">
          <CheckboxField
            label="Newsletter"
            helpText="Monthly newsletter with company updates and industry insights"
            checked={subscribeNews}
            onChange={setSubscribeNews}
          />
          
          <CheckboxField
            label="Product Updates"
            helpText="Important notifications about new features and improvements"
            checked={subscribeUpdates}
            onChange={setSubscribeUpdates}
          />
          
          <CheckboxField
            label="Marketing Communications"
            helpText="Promotional offers and marketing materials"
            checked={subscribeMarketing}
            onChange={setSubscribeMarketing}
            links={[
              {
                text: "Unsubscribe at any time",
                href: "/unsubscribe",
                variant: "secondary",
                underline: "hover"
              }
            ]}
          />
        </div>
        
        <Button className="w-full">
          Save Preferences
        </Button>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [smallChecked, setSmallChecked] = useState(false);
    const [mediumChecked, setMediumChecked] = useState(false);
    const [largeChecked, setLargeChecked] = useState(false);
    
    return (
      <div className="space-y-6">
        <CheckboxField
          size="sm"
          checkboxSize="sm"
          label="Small checkbox field with small text"
          checked={smallChecked}
          onChange={setSmallChecked}
        />
        
        <CheckboxField
          size="md"
          checkboxSize="md"
          label="Medium checkbox field with medium text"
          checked={mediumChecked}
          onChange={setMediumChecked}
        />
        
        <CheckboxField
          size="lg"
          checkboxSize="lg"
          label="Large checkbox field with large text"
          checked={largeChecked}
          onChange={setLargeChecked}
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const [defaultChecked, setDefaultChecked] = useState(false);
    const [errorChecked, setErrorChecked] = useState(false);
    
    return (
      <div className="space-y-6">
        <CheckboxField
          label="Default state checkbox"
          helpText="This is the normal state"
          checked={defaultChecked}
          onChange={setDefaultChecked}
        />
        
        <CheckboxField
          label="Error state checkbox"
          error="This field is required"
          checked={errorChecked}
          onChange={setErrorChecked}
          required
        />
        
        <CheckboxField
          label="Disabled checkbox"
          helpText="This checkbox cannot be interacted with"
          disabled
          checked={true}
        />
      </div>
    );
  },
};

export const Alignment: Story = {
  render: () => {
    const [startChecked, setStartChecked] = useState(false);
    const [centerChecked, setCenterChecked] = useState(false);
    const [topChecked, setTopChecked] = useState(false);
    
    return (
      <div className="space-y-6">
        <CheckboxField
          alignment="start"
          label="Start aligned - checkbox aligns with the start of the text block. This is useful when you have longer text that wraps to multiple lines."
          checked={startChecked}
          onChange={setStartChecked}
        />
        
        <CheckboxField
          alignment="center"
          label="Center aligned - checkbox centers with the text block"
          checked={centerChecked}
          onChange={setCenterChecked}
        />
        
        <CheckboxField
          alignment="top"
          label="Top aligned - checkbox stays at the top of the text block. Perfect for longer descriptions that span multiple lines and you want the checkbox to stay at the very top."
          checked={topChecked}
          onChange={setTopChecked}
        />
      </div>
    );
  },
};

export const WithExternalLinks: Story = {
  render: () => {
    const [agreed, setAgreed] = useState(false);
    
    return (
      <div className="w-full max-w-md space-y-4">
        <CheckboxField
          label="I have read and agree to the Terms of Service, Privacy Policy, and Cookie Policy"
          links={[
            {
              text: "Terms of Service",
              href: "https://example.com/terms",
              target: "_blank",
              variant: "primary"
            },
            {
              text: "Privacy Policy",
              href: "https://example.com/privacy",
              target: "_blank",
              variant: "primary"
            },
            {
              text: "Cookie Policy",
              href: "https://example.com/cookies",
              target: "_blank",
              variant: "secondary",
              underline: "hover"
            }
          ]}
          checked={agreed}
          onChange={setAgreed}
          required
          helpText="External links will open in a new tab"
        />
      </div>
    );
  },
};

export const AuthenticationFlow: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      agreeTerms: false,
      subscribeNewsletter: false,
      allowTracking: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const handleFieldChange = (field: string, value: boolean) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      // Clear error when user interacts
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };
    
    const handleSubmit = () => {
      const newErrors: Record<string, string> = {};
      
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the Terms of Service to create an account';
      }
      
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length === 0) {
        alert('Account created successfully!');
      }
    };
    
    return (
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Complete Registration</h2>
          <p className="text-gray-600 mt-2">Please review and accept our policies</p>
        </div>
        
        <div className="space-y-4">
          <CheckboxField
            label="I agree to the Terms of Service and Privacy Policy"
            links={[
              {
                text: "Terms of Service",
                onClick: () => alert('Opening Terms of Service...'),
                variant: "primary"
              },
              {
                text: "Privacy Policy",
                onClick: () => alert('Opening Privacy Policy...'),
                variant: "primary"
              }
            ]}
            checked={formData.agreeTerms}
            onChange={(checked) => handleFieldChange('agreeTerms', checked)}
            required
            error={errors.agreeTerms}
          />
          
          <CheckboxField
            label="Subscribe to our newsletter"
            helpText="Get updates about new features and company news"
            checked={formData.subscribeNewsletter}
            onChange={(checked) => handleFieldChange('subscribeNewsletter', checked)}
          />
          
          <CheckboxField
            label="Allow tracking for analytics"
            helpText="Help us improve our service by sharing anonymous usage data"
            links={[
              {
                text: "Learn more about our data practices",
                onClick: () => alert('Opening data practices info...'),
                variant: "secondary",
                underline: "hover"
              }
            ]}
            checked={formData.allowTracking}
            onChange={(checked) => handleFieldChange('allowTracking', checked)}
          />
        </div>
        
        <Button onClick={handleSubmit} className="w-full">
          Create Account
        </Button>
        
        <div className="text-xs text-gray-500 text-center">
          By creating an account, you agree to our policies and terms
        </div>
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    label: "I agree to the terms and conditions",
    size: 'md',
    alignment: 'start',
    spacing: 'normal',
    state: 'default',
    checkboxSize: 'md',
    labelWeight: 'normal',
    checked: false,
    disabled: false,
    required: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    
    return (
      <CheckboxField
        {...args}
        checked={checked}
        onChange={setChecked}
      />
    );
  },
};