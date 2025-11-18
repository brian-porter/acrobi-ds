import type { Meta, StoryObj } from '@storybook/react-vite';
import { RdoGrpCtrl } from './rdo-grp-ctrl';
import { useState } from 'react';

const meta: Meta<typeof RdoGrpCtrl> = {
  title: 'Primitives/RdoGrpCtrl',
  component: RdoGrpCtrl,
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
    fieldExampleRdoCtrl: {
      control: { type: 'boolean' },
      description: 'Show example radio control',
    },
    fieldItmTxtSrc: {
      control: { type: 'text' },
      description: 'Example radio field item text',
    },
    fieldItmName: {
      control: { type: 'text' },
      description: 'Radio group name',
    },
    fieldItmValue: {
      control: { type: 'text' },
      description: 'Radio value',
    },
    fieldFbk: {
      control: { type: 'boolean' },
      description: 'Show feedback for example radio',
    },
    fieldFbkTxtSrc: {
      control: { type: 'text' },
      description: 'Feedback text for example radio',
    },
    fieldAlign: {
      control: { type: 'select' },
      options: ['l', 'c', 'r'],
      description: 'Radio alignment',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'ghost', 'separated'],
      description: 'Component variant',
    },
    groupLabel: {
      control: { type: 'text' },
      description: 'Group label for accessibility',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fieldExampleRdoCtrl: true,
    fieldItmTxtSrc: 'Select this option',
    fieldItmName: 'choice',
    fieldItmValue: 'option1',
    fieldAlign: 'l',
    groupLabel: 'Choice Options',
  },
};

export const NoExample: Story = {
  args: {
    fieldExampleRdoCtrl: false,
    groupLabel: 'Empty Group',
  },
};

export const WithFeedback: Story = {
  args: {
    fieldExampleRdoCtrl: true,
    fieldItmTxtSrc: 'Required Option',
    fieldItmName: 'required',
    fieldItmValue: 'yes',
    fieldFbk: true,
    fieldFbkTxtSrc: 'This option is required',
    fieldFbkClr: 'fd500',
    groupLabel: 'Required Selection',
  },
};

export const ModernAPI: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('weekly');

    const items = [
      { id: 'daily', label: 'Daily Notifications', value: 'daily' },
      { id: 'weekly', label: 'Weekly Summary', value: 'weekly' },
      { id: 'monthly', label: 'Monthly Report', value: 'monthly' },
      { id: 'never', label: 'Never', value: 'never' },
    ];

    const handleValueChange = (value: string, item: any) => {
      setSelectedValue(value);
      console.log(`Radio changed to: ${value} (${item.label})`);
    };

    return (
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Notification Frequency</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Choose how often you'd like to receive notifications.
          </p>

          <RdoGrpCtrl
            name='frequency'
            items={items}
            value={selectedValue}
            onValueChange={handleValueChange}
            groupLabel='Notification Frequency'
          />
        </div>

        <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
          <h4 className='font-medium text-gray-800 mb-2'>Current Selection</h4>
          <p className='text-sm text-gray-600'>
            Selected:{' '}
            <span className='font-medium text-gray-800'>{selectedValue}</span>
          </p>
        </div>
      </div>
    );
  },
};

export const WithFeedbackMessages: Story = {
  render: () => {
    const [plan, setPlan] = useState('');

    const items = [
      {
        label: 'Free Plan',
        value: 'free',
        feedback: true,
        feedbackText: 'Limited features available',
        feedbackColor: 'n500' as const,
      },
      {
        label: 'Pro Plan',
        value: 'pro',
        feedback: true,
        feedbackText: 'Most popular choice',
        feedbackColor: 'f500' as const,
      },
      {
        label: 'Enterprise Plan',
        value: 'enterprise',
        feedback: true,
        feedbackText: 'Full feature access',
        feedbackColor: 'p500' as const,
      },
    ];

    const handleValueChange = (value: string) => {
      setPlan(value);
    };

    return (
      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Choose Your Plan</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Select the plan that best fits your needs.
          </p>

          <RdoGrpCtrl
            name='plan'
            items={items}
            value={plan}
            onValueChange={handleValueChange}
            groupLabel='Subscription Plans'
          />
        </div>
      </div>
    );
  },
};

export const Alignment: Story = {
  render: () => {
    const [alignment, setAlignment] = useState('left');

    const items = [
      { label: 'Left Aligned', value: 'left' },
      { label: 'Center Aligned', value: 'center' },
      { label: 'Right Aligned', value: 'right' },
    ];

    return (
      <div className='space-y-8'>
        <div>
          <h3 className='text-lg font-semibold mb-4'>Alignment Options</h3>

          <div className='space-y-6'>
            <div>
              <h4 className='font-medium mb-2'>Left Aligned (Default)</h4>
              <RdoGrpCtrl
                name='align-left'
                items={items}
                value={alignment}
                onValueChange={setAlignment}
                fieldAlign='l'
                groupLabel='Left Aligned Options'
              />
            </div>

            <div>
              <h4 className='font-medium mb-2'>Center Aligned</h4>
              <RdoGrpCtrl
                name='align-center'
                items={items.map(item => ({
                  ...item,
                  value: `${item.value}-center`,
                }))}
                fieldAlign='c'
                groupLabel='Center Aligned Options'
              />
            </div>

            <div>
              <h4 className='font-medium mb-2'>Right Aligned</h4>
              <RdoGrpCtrl
                name='align-right'
                items={items.map(item => ({
                  ...item,
                  value: `${item.value}-right`,
                }))}
                fieldAlign='r'
                groupLabel='Right Aligned Options'
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const DisabledStates: Story = {
  render: () => {
    const [selection, setSelection] = useState('option1');

    const items = [
      { label: 'Available Option', value: 'option1', disabled: false },
      { label: 'Disabled Option', value: 'option2', disabled: true },
      { label: 'Premium Option (Disabled)', value: 'option3', disabled: true },
      { label: 'Another Available Option', value: 'option4', disabled: false },
    ];

    return (
      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Feature Selection</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Some options may be disabled based on your subscription.
          </p>

          <RdoGrpCtrl
            name='features'
            items={items}
            value={selection}
            onValueChange={setSelection}
            groupLabel='Feature Selection'
          />
        </div>
      </div>
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      theme: 'light',
      language: 'en',
      timezone: 'auto',
    });

    const themeItems = [
      { label: 'Light Theme', value: 'light', name: 'theme' },
      { label: 'Dark Theme', value: 'dark', name: 'theme' },
      { label: 'Auto (System)', value: 'auto', name: 'theme' },
    ];

    const languageItems = [
      { label: 'English', value: 'en', name: 'language' },
      { label: 'Spanish', value: 'es', name: 'language' },
      { label: 'French', value: 'fr', name: 'language' },
      { label: 'German', value: 'de', name: 'language' },
    ];

    const timezoneItems = [
      { label: 'Auto-detect', value: 'auto', name: 'timezone' },
      { label: 'UTC', value: 'utc', name: 'timezone' },
      { label: 'Pacific Time', value: 'pst', name: 'timezone' },
      { label: 'Eastern Time', value: 'est', name: 'timezone' },
    ];

    const handleThemeChange = (value: string) => {
      setFormData(prev => ({ ...prev, theme: value }));
    };

    const handleLanguageChange = (value: string) => {
      setFormData(prev => ({ ...prev, language: value }));
    };

    const handleTimezoneChange = (value: string) => {
      setFormData(prev => ({ ...prev, timezone: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form data:', formData);
      alert('Settings saved! Check the console for form data.');
    };

    return (
      <div className='space-y-6'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold mb-4'>User Preferences</h3>

            <div className='space-y-6'>
              <div>
                <h4 className='font-medium mb-2'>Theme Preference</h4>
                <RdoGrpCtrl
                  name='theme'
                  items={themeItems}
                  value={formData.theme}
                  onValueChange={handleThemeChange}
                  groupLabel='Theme Preference'
                />
              </div>

              <div>
                <h4 className='font-medium mb-2'>Language</h4>
                <RdoGrpCtrl
                  name='language'
                  items={languageItems}
                  value={formData.language}
                  onValueChange={handleLanguageChange}
                  groupLabel='Language Selection'
                />
              </div>

              <div>
                <h4 className='font-medium mb-2'>Timezone</h4>
                <RdoGrpCtrl
                  name='timezone'
                  items={timezoneItems}
                  value={formData.timezone}
                  onValueChange={handleTimezoneChange}
                  groupLabel='Timezone Selection'
                />
              </div>
            </div>
          </div>

          <div className='flex gap-3 pt-4 border-t border-gray-200'>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
            >
              Save Preferences
            </button>
            <button
              type='button'
              className='px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors'
              onClick={() =>
                setFormData({
                  theme: 'light',
                  language: 'en',
                  timezone: 'auto',
                })
              }
            >
              Reset to Defaults
            </button>
          </div>
        </form>

        <div className='p-4 bg-gray-50 rounded-lg'>
          <h4 className='font-medium text-gray-800 mb-2'>Current Form State</h4>
          <pre className='text-xs text-gray-600'>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [devlinkSelection, setDevlinkSelection] = useState('');
    const [modernSelection, setModernSelection] = useState('option2');

    const handleExampleClick = () => {
      console.log('Example radio clicked via devlink API');
    };

    const handleModernChange = (value: string, item: any) => {
      setModernSelection(value);
      console.log(`Modern API - Radio changed to: ${value} (${item.label})`);
    };

    return (
      <div className='space-y-8'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Interactive Examples</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Open the browser console to see radio interactions.
          </p>
        </div>

        <div>
          <h4 className='font-medium mb-3'>Devlink API Example</h4>
          <RdoGrpCtrl
            fieldExampleRdoCtrl={true}
            fieldItmTxtSrc='Click me (Devlink API)'
            fieldItmName='devlink-example'
            fieldItmValue='devlink-option'
            fieldItmClick={{ onClick: handleExampleClick }}
            groupLabel='Devlink API Example'
          />
        </div>

        <div>
          <h4 className='font-medium mb-3'>Modern API Example</h4>
          <RdoGrpCtrl
            name='modern-example'
            items={[
              { label: 'Option 1 (Modern API)', value: 'option1' },
              { label: 'Option 2 (Modern API)', value: 'option2' },
              { label: 'Option 3 (Modern API)', value: 'option3' },
            ]}
            value={modernSelection}
            onValueChange={handleModernChange}
            groupLabel='Modern API Example'
          />
        </div>
      </div>
    );
  },
};

export const AllVariations: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-lg font-semibold mb-3'>Single Radio (Default)</h3>
        <RdoGrpCtrl
          fieldExampleRdoCtrl={true}
          fieldItmTxtSrc='Enable feature'
          fieldItmName='single'
          fieldItmValue='enabled'
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>Multiple Radio Options</h3>
        <RdoGrpCtrl
          name='multiple'
          items={[
            { label: 'Option A', value: 'a' },
            { label: 'Option B', value: 'b' },
            { label: 'Option C', value: 'c' },
          ]}
          value='b'
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>With Feedback Messages</h3>
        <RdoGrpCtrl
          name='feedback'
          items={[
            {
              label: 'Free tier',
              value: 'free',
              feedback: true,
              feedbackText: 'Limited to 100 requests/month',
              feedbackColor: 'n500',
            },
            {
              label: 'Pro tier',
              value: 'pro',
              feedback: true,
              feedbackText: 'Unlimited requests included',
              feedbackColor: 'f500',
            },
          ]}
          value='pro'
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>Mixed States</h3>
        <RdoGrpCtrl
          name='mixed'
          items={[
            { label: 'Available Option', value: 'available', disabled: false },
            { label: 'Premium Option', value: 'premium', disabled: true },
            { label: 'Selected Option', value: 'selected', disabled: false },
            { label: 'Locked Option', value: 'locked', disabled: true },
          ]}
          value='selected'
        />
      </div>
    </div>
  ),
};
