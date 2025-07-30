import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './switch';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
  },
};

export const Checked: Story = {
  args: {
    label: 'Label',
    checked: true,
  },
};

export const WithFeedback: Story = {
  args: {
    label: 'Label',
    feedback: 'Feedback message',
  },
};

export const WithFeedbackChecked: Story = {
  args: {
    label: 'Label',
    feedback: 'Feedback message',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Label',
    checked: true,
    disabled: true,
  },
};

// Story that exactly matches the screenshot
export const ScreenshotMatch: Story = {
  render: () => (
    <div className='p-8 bg-gray-50 space-y-8'>
      <div>
        <h2 className='text-2xl font-bold mb-2'>Toggle - Field</h2>
        <p className='text-gray-600 mb-8'>
          Ah, the Toggle Field - it's like the cool and edgy cousin of the radio
          field, with the toggle getting all the attention along toggle to the
          left or right, giving it the spotlight it deserves while keeping
          things slick and stylish.
        </p>
      </div>

      <div className='bg-white p-6 rounded-lg border border-gray-200'>
        <h3 className='text-lg font-medium mb-6'>Sample</h3>

        <div className='space-y-6'>
          <Switch label='Label' feedback='Feedback message' />
          <Switch label='Label' feedback='Feedback message' checked={true} />
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false);

    return (
      <div className='space-y-4'>
        <Switch
          label='Interactive toggle'
          feedback='Click to toggle state'
          checked={enabled}
          onCheckedChange={setEnabled}
        />

        <div className='text-sm text-gray-600'>
          Status: {enabled ? 'Enabled' : 'Disabled'}
        </div>
      </div>
    );
  },
};

export const SettingsGroup: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
    });

    const updateSetting = (key: keyof typeof settings, value: boolean) => {
      setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
      <div className='space-y-6 w-80'>
        <h3 className='font-medium'>Application Settings</h3>

        <div className='space-y-6'>
          <Switch
            label='Push notifications'
            feedback='Receive push notifications on this device'
            checked={settings.notifications}
            onCheckedChange={checked => updateSetting('notifications', checked)}
          />

          <Switch
            label='Dark mode'
            feedback='Switch to dark theme appearance'
            checked={settings.darkMode}
            onCheckedChange={checked => updateSetting('darkMode', checked)}
          />

          <Switch
            label='Auto-save'
            feedback='Automatically save your work'
            checked={settings.autoSave}
            onCheckedChange={checked => updateSetting('autoSave', checked)}
          />

          <Switch
            label='Analytics'
            feedback='Help improve our product with usage data'
            checked={settings.analytics}
            onCheckedChange={checked => updateSetting('analytics', checked)}
          />
        </div>

        <div className='text-xs text-gray-600 p-3 bg-gray-100 rounded'>
          <strong>Current settings:</strong>
          <pre className='mt-1'>{JSON.stringify(settings, null, 2)}</pre>
        </div>
      </div>
    );
  },
};

export const CompactList: Story = {
  render: () => {
    const [preferences, setPreferences] = useState({
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
    });

    return (
      <div className='space-y-3 w-64'>
        <h4 className='font-medium'>Notification Preferences</h4>

        <div className='space-y-4'>
          <div className='flex flex-col space-y-2'>
            <span className='text-sm font-medium'>Email</span>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={checked =>
                setPreferences(prev => ({
                  ...prev,
                  emailNotifications: checked,
                }))
              }
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <span className='text-sm font-medium'>SMS</span>
            <Switch
              checked={preferences.smsNotifications}
              onCheckedChange={checked =>
                setPreferences(prev => ({ ...prev, smsNotifications: checked }))
              }
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <span className='text-sm font-medium'>Push</span>
            <Switch
              checked={preferences.pushNotifications}
              onCheckedChange={checked =>
                setPreferences(prev => ({
                  ...prev,
                  pushNotifications: checked,
                }))
              }
            />
          </div>
        </div>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-8 p-6'>
      <div className='space-y-6'>
        <h4 className='font-semibold text-lg'>Normal States</h4>

        <Switch label='Unchecked' checked={false} />

        <Switch label='Checked' checked={true} />

        <Switch
          label='With feedback'
          feedback='This is a feedback message'
          checked={false}
        />

        <Switch
          label='Checked with feedback'
          feedback='This toggle is enabled'
          checked={true}
        />
      </div>

      <div className='space-y-6'>
        <h4 className='font-semibold text-lg'>Disabled States</h4>

        <Switch label='Disabled unchecked' checked={false} disabled={true} />

        <Switch label='Disabled checked' checked={true} disabled={true} />

        <Switch
          label='Disabled with feedback'
          feedback='This toggle is disabled'
          checked={false}
          disabled={true}
        />

        <Switch
          label='Disabled checked with feedback'
          feedback='This disabled toggle is enabled'
          checked={true}
          disabled={true}
        />
      </div>
    </div>
  ),
};
