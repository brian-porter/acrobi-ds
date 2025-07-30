import type { Meta, StoryObj } from '@storybook/react-vite';
import { CboxGrpCtrl } from './cbox-grp-ctrl';
import { useState } from 'react';

const meta: Meta<typeof CboxGrpCtrl> = {
  title: 'Primitives/CboxGrpCtrl',
  component: CboxGrpCtrl,
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
    exampleCboxCtrl: {
      control: { type: 'boolean' },
      description: 'Show example checkbox controls',
    },
    fieldItmTxtSrc: {
      control: { type: 'text' },
      description: 'Example checkbox field item text',
    },
    fieldFbk: {
      control: { type: 'boolean' },
      description: 'Show feedback for example checkboxes',
    },
    fieldFbkTxtSrc: {
      control: { type: 'text' },
      description: 'Feedback text for example checkboxes',
    },
    align: {
      control: { type: 'select' },
      options: ['l', 'c', 'r'],
      description: 'Group alignment',
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
    exampleCboxCtrl: true,
    fieldItmTxtSrc: 'Accept Terms and Conditions',
    fieldFbk: false,
    align: 'l',
    groupLabel: 'Agreement Options',
  },
};

export const NoExample: Story = {
  args: {
    exampleCboxCtrl: false,
    groupLabel: 'Empty Group',
  },
};

export const WithFeedback: Story = {
  args: {
    exampleCboxCtrl: true,
    fieldItmTxtSrc: 'Required Field',
    fieldFbk: true,
    fieldFbkTxtSrc: 'This field is required',
    fieldFbkClr: 'fd500',
    groupLabel: 'Required Options',
  },
};

export const WithLinks: Story = {
  args: {
    exampleCboxCtrl: true,
    fieldItmTxtSrc: 'Accept Terms',
    fieldLink: true,
    fieldLinkTxtSrc: 'Read full terms',
    groupLabel: 'Terms Agreement',
  },
};

export const ModernAPI: Story = {
  render: () => {
    const [checkboxStates, setCheckboxStates] = useState([
      true,
      false,
      true,
      false,
    ]);

    const items = [
      {
        id: 'notifications',
        label: 'Email Notifications',
        checked: checkboxStates[0],
      },
      {
        id: 'marketing',
        label: 'Marketing Communications',
        checked: checkboxStates[1],
      },
      { id: 'updates', label: 'Product Updates', checked: checkboxStates[2] },
      {
        id: 'analytics',
        label: 'Analytics Tracking',
        checked: checkboxStates[3],
      },
    ];

    const handleCheckboxChange = (index: number, checked: boolean) => {
      const newStates = [...checkboxStates];
      newStates[index] = checked;
      setCheckboxStates(newStates);
      console.log(
        `Checkbox ${index} (${items[index].label}) changed to:`,
        checked
      );
    };

    return (
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>User Preferences</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Choose which communications you'd like to receive.
          </p>

          <CboxGrpCtrl
            items={items}
            onCheckboxChange={handleCheckboxChange}
            groupLabel='User Preferences'
          />
        </div>

        <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
          <h4 className='font-medium text-gray-800 mb-2'>Current Settings</h4>
          <div className='space-y-1 text-sm'>
            {items.map((item, index) => (
              <div key={item.id} className='flex justify-between'>
                <span>{item.label}:</span>
                <span
                  className={item.checked ? 'text-green-600' : 'text-gray-500'}
                >
                  {item.checked ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const WithFeedbackAndLinks: Story = {
  render: () => {
    const [settings, setSettings] = useState([
      { checked: true, hasError: false },
      { checked: false, hasError: true },
      { checked: true, hasError: false },
    ]);

    const items = [
      {
        label: 'Two-Factor Authentication',
        checked: settings[0].checked,
        feedback: settings[0].hasError,
        feedbackText: 'Security feature is active',
        feedbackColor: 'f500' as const,
        link: true,
        linkText: 'Learn more',
        linkHref: '#security',
      },
      {
        label: 'Password Auto-Expiry',
        checked: settings[1].checked,
        feedback: settings[1].hasError,
        feedbackText: 'Your password expires in 3 days',
        feedbackColor: 'fw500' as const,
        link: true,
        linkText: 'Change password',
        linkHref: '#password',
      },
      {
        label: 'Account Recovery Email',
        checked: settings[2].checked,
        feedback: settings[2].hasError,
        feedbackText: 'Backup email is configured',
        feedbackColor: 'f500' as const,
        link: true,
        linkText: 'Update email',
        linkHref: '#recovery',
      },
    ];

    const handleCheckboxChange = (index: number, checked: boolean) => {
      const newSettings = [...settings];
      newSettings[index].checked = checked;
      setSettings(newSettings);
    };

    return (
      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Security Settings</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Configure your account security preferences.
          </p>

          <CboxGrpCtrl
            items={items}
            onCheckboxChange={handleCheckboxChange}
            groupLabel='Security Settings'
          />
        </div>
      </div>
    );
  },
};

export const Alignment: Story = {
  render: () => {
    const leftItems = [
      { label: 'Left Aligned Option 1', checked: true },
      { label: 'Left Aligned Option 2', checked: false },
    ];

    const centerItems = [
      { label: 'Center Aligned Option 1', checked: true },
      { label: 'Center Aligned Option 2', checked: false },
    ];

    const rightItems = [
      { label: 'Right Aligned Option 1', checked: false },
      { label: 'Right Aligned Option 2', checked: true },
    ];

    return (
      <div className='space-y-8'>
        <div>
          <h3 className='text-lg font-semibold mb-4'>Alignment Options</h3>

          <div className='space-y-6'>
            <div>
              <h4 className='font-medium mb-2'>Left Aligned (Default)</h4>
              <CboxGrpCtrl
                items={leftItems}
                align='l'
                groupLabel='Left Aligned Options'
              />
            </div>

            <div>
              <h4 className='font-medium mb-2'>Center Aligned</h4>
              <CboxGrpCtrl
                items={centerItems}
                align='c'
                groupLabel='Center Aligned Options'
              />
            </div>

            <div>
              <h4 className='font-medium mb-2'>Right Aligned</h4>
              <CboxGrpCtrl
                items={rightItems}
                align='r'
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
    const items = [
      { label: 'Active Option', checked: true, disabled: false },
      { label: 'Disabled Option (Checked)', checked: true, disabled: true },
      { label: 'Disabled Option (Unchecked)', checked: false, disabled: true },
      { label: 'Available Option', checked: false, disabled: false },
    ];

    return (
      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Feature Controls</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Some features may be disabled based on your subscription plan.
          </p>

          <CboxGrpCtrl items={items} groupLabel='Feature Controls' />
        </div>
      </div>
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      newsletter: true,
      promotions: false,
      updates: true,
      surveys: false,
      terms: false,
    });

    const items = [
      {
        label: 'Newsletter Subscription',
        checked: formData.newsletter,
        name: 'newsletter',
        value: 'yes',
        id: 'newsletter-checkbox',
      },
      {
        label: 'Promotional Offers',
        checked: formData.promotions,
        name: 'promotions',
        value: 'yes',
        id: 'promotions-checkbox',
      },
      {
        label: 'Product Updates',
        checked: formData.updates,
        name: 'updates',
        value: 'yes',
        id: 'updates-checkbox',
      },
      {
        label: 'User Surveys',
        checked: formData.surveys,
        name: 'surveys',
        value: 'yes',
        id: 'surveys-checkbox',
      },
      {
        label: 'I agree to the Terms of Service',
        checked: formData.terms,
        name: 'terms',
        value: 'accepted',
        id: 'terms-checkbox',
        feedback: !formData.terms,
        feedbackText: 'You must accept the terms to continue',
        feedbackColor: 'fd500' as const,
        link: true,
        linkText: 'Read terms',
        linkHref: '#terms',
      },
    ];

    const handleCheckboxChange = (
      index: number,
      checked: boolean,
      item: any
    ) => {
      setFormData(prev => ({
        ...prev,
        [item.name]: checked,
      }));
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
            <h3 className='text-lg font-semibold mb-2'>
              Email & Communication Preferences
            </h3>
            <p className='text-sm text-gray-600 mb-4'>
              Choose which communications you'd like to receive from us.
            </p>

            <CboxGrpCtrl
              items={items}
              onCheckboxChange={handleCheckboxChange}
              groupLabel='Communication Preferences'
            />
          </div>

          <div className='flex gap-3 pt-4 border-t border-gray-200'>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300'
              disabled={!formData.terms}
            >
              Save Preferences
            </button>
            <button
              type='button'
              className='px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors'
              onClick={() =>
                setFormData({
                  newsletter: false,
                  promotions: false,
                  updates: false,
                  surveys: false,
                  terms: false,
                })
              }
            >
              Clear All
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
    const handleExampleClick = () => {
      console.log('Example checkbox clicked via devlink API');
    };

    const handleModernCheckbox = (
      index: number,
      checked: boolean,
      item: any
    ) => {
      console.log(
        `Modern API - Checkbox ${index} (${item.label}) changed to:`,
        checked
      );
    };

    return (
      <div className='space-y-8'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Interactive Examples</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Open the browser console to see checkbox interactions.
          </p>
        </div>

        <div>
          <h4 className='font-medium mb-3'>Devlink API Example</h4>
          <CboxGrpCtrl
            exampleCboxCtrl={true}
            fieldItmTxtSrc='Click me (Devlink API)'
            fieldItmClick={{ onClick: handleExampleClick }}
            groupLabel='Devlink API Example'
          />
        </div>

        <div>
          <h4 className='font-medium mb-3'>Modern API Example</h4>
          <CboxGrpCtrl
            items={[
              { label: 'Option 1 (Modern API)', checked: false },
              { label: 'Option 2 (Modern API)', checked: true },
            ]}
            onCheckboxChange={handleModernCheckbox}
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
        <h3 className='text-lg font-semibold mb-3'>
          Single Checkbox (Default)
        </h3>
        <CboxGrpCtrl
          exampleCboxCtrl={true}
          fieldItmTxtSrc='Enable notifications'
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>Multiple Checkboxes</h3>
        <CboxGrpCtrl
          items={[
            { label: 'Feature A', checked: true },
            { label: 'Feature B', checked: false },
            { label: 'Feature C', checked: true },
          ]}
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>With Feedback Messages</h3>
        <CboxGrpCtrl
          items={[
            {
              label: 'Auto-save',
              checked: true,
              feedback: true,
              feedbackText: 'Changes are saved automatically',
              feedbackColor: 'f500',
            },
            {
              label: 'Sync across devices',
              checked: false,
              feedback: true,
              feedbackText: 'Requires premium subscription',
              feedbackColor: 'fw500',
            },
          ]}
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>With Links</h3>
        <CboxGrpCtrl
          items={[
            {
              label: 'Accept Terms of Service',
              checked: false,
              link: true,
              linkText: 'Read full terms',
              linkHref: '#terms',
            },
            {
              label: 'Subscribe to Privacy Policy updates',
              checked: true,
              link: true,
              linkText: 'View policy',
              linkHref: '#privacy',
            },
          ]}
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>Mixed States</h3>
        <CboxGrpCtrl
          items={[
            { label: 'Available Feature', checked: false, disabled: false },
            { label: 'Premium Feature', checked: false, disabled: true },
            { label: 'Active Feature', checked: true, disabled: false },
            { label: 'Legacy Feature', checked: true, disabled: true },
          ]}
        />
      </div>
    </div>
  ),
};
