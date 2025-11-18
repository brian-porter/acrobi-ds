import type { Meta, StoryObj } from '@storybook/react-vite';
import { SwitchGrpCtrl } from './switch-grp-ctrl';
import { useState } from 'react';

const meta: Meta<typeof SwitchGrpCtrl> = {
  title: 'Primitives/SwitchGrpCtrl',
  component: SwitchGrpCtrl,
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
    exampleToggleGroup: {
      control: { type: 'boolean' },
      description: 'Show example toggle group',
    },
    exampleTglLableSrc: {
      control: { type: 'text' },
      description: 'Example toggle label source',
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
    exampleToggleGroup: true,
    exampleTglLableSrc: 'Enable Feature',
    groupLabel: 'Feature Settings',
  },
};

export const NoExample: Story = {
  args: {
    exampleToggleGroup: false,
    groupLabel: 'Empty Group',
  },
};

export const CustomLabel: Story = {
  args: {
    exampleToggleGroup: true,
    exampleTglLableSrc: 'Dark Mode',
    groupLabel: 'Appearance Settings',
  },
};

export const ModernAPI: Story = {
  render: () => {
    const [toggleStates, setToggleStates] = useState([
      true,
      false,
      true,
      false,
    ]);

    const items = [
      {
        id: 'notifications',
        label: 'Push Notifications',
        checked: toggleStates[0],
      },
      { id: 'emails', label: 'Email Updates', checked: toggleStates[1] },
      {
        id: 'marketing',
        label: 'Marketing Communications',
        checked: toggleStates[2],
      },
      {
        id: 'analytics',
        label: 'Analytics Tracking',
        checked: toggleStates[3],
      },
    ];

    const handleToggleChange = (index: number, checked: boolean) => {
      const newStates = [...toggleStates];
      newStates[index] = checked;
      setToggleStates(newStates);
      console.log(
        `Toggle ${index} (${items[index].label}) changed to:`,
        checked
      );
    };

    return (
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>User Preferences</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Control your notification and privacy settings.
          </p>

          <SwitchGrpCtrl
            items={items}
            onToggleChange={handleToggleChange}
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

export const WithFeedback: Story = {
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
        feedbackText: 'Security feature enabled',
        feedbackColor: 'f500' as const,
      },
      {
        label: 'Password Expiry',
        checked: settings[1].checked,
        feedback: settings[1].hasError,
        feedbackText: 'Password expires in 3 days',
        feedbackColor: 'fw500' as const,
      },
      {
        label: 'Account Recovery',
        checked: settings[2].checked,
        feedback: settings[2].hasError,
        feedbackText: 'Backup email configured',
        feedbackColor: 'f500' as const,
      },
    ];

    const handleToggleChange = (index: number, checked: boolean) => {
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

          <SwitchGrpCtrl
            items={items}
            onToggleChange={handleToggleChange}
            groupLabel='Security Settings'
          />
        </div>
      </div>
    );
  },
};

export const Alignment: Story = {
  render: () => {
    const items = [
      { label: 'Left Aligned (Default)', align: 'l' as const, checked: true },
      { label: 'Right Aligned', align: 'r' as const, checked: false },
      { label: 'Center Aligned', align: 'c' as const, checked: true },
    ];

    return (
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold mb-4'>Alignment Options</h3>

          <SwitchGrpCtrl items={items} groupLabel='Alignment Examples' />
        </div>
      </div>
    );
  },
};

export const DisabledStates: Story = {
  render: () => {
    const items = [
      { label: 'Active Feature', checked: true, disabled: false },
      { label: 'Disabled Feature (Checked)', checked: true, disabled: true },
      { label: 'Disabled Feature (Unchecked)', checked: false, disabled: true },
      { label: 'Available Feature', checked: false, disabled: false },
    ];

    return (
      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Feature Controls</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Some features may be disabled based on your subscription plan.
          </p>

          <SwitchGrpCtrl items={items} groupLabel='Feature Controls' />
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
    });

    const items = [
      {
        label: 'Newsletter Subscription',
        checked: formData.newsletter,
        toggleName: 'newsletter',
        toggleValue: 'yes',
        toggleId: 'newsletter-toggle',
      },
      {
        label: 'Promotional Offers',
        checked: formData.promotions,
        toggleName: 'promotions',
        toggleValue: 'yes',
        toggleId: 'promotions-toggle',
      },
      {
        label: 'Product Updates',
        checked: formData.updates,
        toggleName: 'updates',
        toggleValue: 'yes',
        toggleId: 'updates-toggle',
      },
      {
        label: 'User Surveys',
        checked: formData.surveys,
        toggleName: 'surveys',
        toggleValue: 'yes',
        toggleId: 'surveys-toggle',
      },
    ];

    const handleToggleChange = (index: number, checked: boolean, item: any) => {
      setFormData(prev => ({
        ...prev,
        [item.toggleName]: checked,
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
            <h3 className='text-lg font-semibold mb-2'>Email Preferences</h3>
            <p className='text-sm text-gray-600 mb-4'>
              Choose which emails you'd like to receive from us.
            </p>

            <SwitchGrpCtrl
              items={items}
              onToggleChange={handleToggleChange}
              groupLabel='Email Preferences'
            />
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
                  newsletter: false,
                  promotions: false,
                  updates: false,
                  surveys: false,
                })
              }
            >
              Disable All
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
      console.log('Example toggle clicked via devlink API');
    };

    const handleModernToggle = (index: number, checked: boolean, item: any) => {
      console.log(
        `Modern API - Toggle ${index} (${item.label}) changed to:`,
        checked
      );
    };

    return (
      <div className='space-y-8'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Interactive Examples</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Open the browser console to see toggle interactions.
          </p>
        </div>

        <div>
          <h4 className='font-medium mb-3'>Devlink API Example</h4>
          <SwitchGrpCtrl
            exampleToggleGroup={true}
            exampleTglLableSrc='Click me (Devlink API)'
            exampleTglClick={{ onClick: handleExampleClick }}
            groupLabel='Devlink API Example'
          />
        </div>

        <div>
          <h4 className='font-medium mb-3'>Modern API Example</h4>
          <SwitchGrpCtrl
            items={[
              { label: 'Option 1 (Modern API)', checked: false },
              { label: 'Option 2 (Modern API)', checked: true },
            ]}
            onToggleChange={handleModernToggle}
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
        <h3 className='text-lg font-semibold mb-3'>Single Toggle (Default)</h3>
        <SwitchGrpCtrl
          exampleToggleGroup={true}
          exampleTglLableSrc='Enable notifications'
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>Multiple Toggles</h3>
        <SwitchGrpCtrl
          items={[
            { label: 'Feature A', checked: true },
            { label: 'Feature B', checked: false },
            { label: 'Feature C', checked: true },
          ]}
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>With Feedback Messages</h3>
        <SwitchGrpCtrl
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
        <h3 className='text-lg font-semibold mb-3'>Mixed States</h3>
        <SwitchGrpCtrl
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
