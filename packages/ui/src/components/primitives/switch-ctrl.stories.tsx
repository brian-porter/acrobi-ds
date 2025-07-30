import type { Meta, StoryObj } from '@storybook/react';
import { SwitchCtrl } from './switch-ctrl';
import { useState } from 'react';

const meta = {
  title: 'Primitives/SwitchCtrl',
  component: SwitchCtrl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
SwitchCtrl component using authentic Acrobi Design System styling.

This component provides toggle switch functionality with both devlink compatibility and modern React patterns.

**Key Features:**
- Uses authentic Acrobi CSS classes: \`.toggle-ctrl\`, \`.toggletrack\`, \`.toggledrag\`
- Supports both devlink API (toglClick, onChange) and modern API (checked, onCheckedChange)
- Smooth toggle animations matching Webflow interactions
- Form integration via data attributes and hidden input
- Keyboard navigation support (Space and Enter keys)
- Accessibility features with ARIA attributes
- Multiple size variants and disabled state

**CSS Classes Used:**
- \`.toggle-ctrl\` - Main toggle container
- \`.toggletrack\` - Toggle track background
- \`.toggledrag\` - Draggable toggle handle
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    toglId: {
      control: 'text',
      description: 'Toggle ID for form integration - devlink API',
    },
    toglName: {
      control: 'text',
      description: 'Toggle name for form integration - devlink API',
    },
    toglValue: {
      control: 'text',
      description: 'Toggle value for form integration - devlink API',
    },
    tabOrder: {
      control: 'number',
      description: 'Tab order for keyboard navigation - devlink API',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state - modern API',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state - modern API',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Switch size',
    },
    showFocusRing: {
      control: 'boolean',
      description: 'Show focus ring for accessibility',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'large'],
      description: 'Component variant',
    },
  },
} satisfies Meta<typeof SwitchCtrl>;

export default meta;
type Story = StoryObj<typeof meta>;

// Devlink API Stories

export const DevlinkBasic: Story = {
  args: {
    toglId: 'switch1',
    toglName: 'notifications',
    toglValue: 'enabled',
    tabOrder: 1,
    toglClick: e => console.log('Toggle clicked (devlink API):', e),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic toggle switch using devlink API with form integration.',
      },
    },
  },
};

export const DevlinkWithForm: Story = {
  args: {
    toglId: 'privacy-setting',
    toglName: 'privacy',
    toglValue: 'public',
    tabOrder: 0,
    toglClick: e => console.log('Privacy setting toggled:', e),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Toggle switch configured for form submission with privacy settings.',
      },
    },
  },
};

// Modern API Stories

export const ModernBasic: Story = {
  args: {
    checked: false,
    onCheckedChange: (checked: boolean) =>
      console.log('Modern API checked:', checked),
    'aria-label': 'Enable notifications',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic toggle switch using modern React API with accessibility.',
      },
    },
  },
};

export const ModernChecked: Story = {
  args: {
    checked: true,
    onCheckedChange: (checked: boolean) =>
      console.log('Modern API checked:', checked),
    'aria-label': 'Dark mode enabled',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle switch in checked state using modern API.',
      },
    },
  },
};

// Size Variants

export const SmallSwitch: Story = {
  args: {
    checked: false,
    onCheckedChange: (checked: boolean) =>
      console.log('Small switch:', checked),
    size: 'sm',
    'aria-label': 'Small toggle switch',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size toggle switch.',
      },
    },
  },
};

export const MediumSwitch: Story = {
  args: {
    checked: true,
    onCheckedChange: (checked: boolean) =>
      console.log('Medium switch:', checked),
    size: 'md',
    'aria-label': 'Medium toggle switch',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium size toggle switch (default).',
      },
    },
  },
};

export const LargeSwitch: Story = {
  args: {
    checked: false,
    onCheckedChange: (checked: boolean) =>
      console.log('Large switch:', checked),
    size: 'lg',
    'aria-label': 'Large toggle switch',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size toggle switch.',
      },
    },
  },
};

// State Variants

export const DisabledOff: Story = {
  args: {
    checked: false,
    disabled: true,
    'aria-label': 'Disabled toggle switch (off)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled toggle switch in off state.',
      },
    },
  },
};

export const DisabledOn: Story = {
  args: {
    checked: true,
    disabled: true,
    'aria-label': 'Disabled toggle switch (on)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled toggle switch in on state.',
      },
    },
  },
};

// Interactive Examples

export const ControlledSwitch: Story = {
  render: () => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
      <div className='space-y-4'>
        <SwitchCtrl
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
          aria-label='Notifications'
        />

        <p className='text-sm text-gray-600'>
          Notifications are{' '}
          <strong>{isEnabled ? 'enabled' : 'disabled'}</strong>
        </p>

        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className='px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Toggle Programmatically
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled toggle switch with external state management.',
      },
    },
  },
};

export const UncontrolledSwitch: Story = {
  args: {
    defaultChecked: true,
    onCheckedChange: (checked: boolean) =>
      console.log('Uncontrolled switch changed:', checked),
    'aria-label': 'Auto-save setting',
  },
  parameters: {
    docs: {
      description: {
        story: 'Uncontrolled toggle switch with default checked state.',
      },
    },
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      notifications: false,
      darkMode: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      alert(`Form data: ${JSON.stringify(formData, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit} className='space-y-6 p-4 border rounded-lg'>
        <h3 className='text-lg font-semibold'>Settings</h3>

        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <label
              htmlFor='notifications-switch'
              className='text-sm font-medium'
            >
              Enable Notifications
            </label>
            <SwitchCtrl
              toglId='notifications-switch'
              toglName='notifications'
              toglValue='enabled'
              checked={formData.notifications}
              onCheckedChange={checked =>
                setFormData(prev => ({ ...prev, notifications: checked }))
              }
              aria-labelledby='notifications-label'
            />
          </div>

          <div className='flex items-center justify-between'>
            <label htmlFor='darkmode-switch' className='text-sm font-medium'>
              Dark Mode
            </label>
            <SwitchCtrl
              toglId='darkmode-switch'
              toglName='darkMode'
              toglValue='enabled'
              checked={formData.darkMode}
              onCheckedChange={checked =>
                setFormData(prev => ({ ...prev, darkMode: checked }))
              }
              aria-labelledby='darkmode-label'
            />
          </div>
        </div>

        <button
          type='submit'
          className='w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Save Settings
        </button>

        <div className='text-xs text-gray-500 bg-gray-50 p-2 rounded'>
          <strong>Current values:</strong>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle switches integrated into a form with state management.',
      },
    },
  },
};

export const AccessibilityExample: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Accessibility Features</h3>

        <div className='space-y-4'>
          <div className='flex items-center justify-between p-3 border rounded'>
            <div>
              <div className='font-medium'>Keyboard Navigation</div>
              <div className='text-sm text-gray-600'>
                Use Space or Enter to toggle
              </div>
            </div>
            <SwitchCtrl
              defaultChecked={false}
              aria-label='Keyboard navigation demo'
              showFocusRing={true}
            />
          </div>

          <div className='flex items-center justify-between p-3 border rounded'>
            <div>
              <div id='screen-reader-label' className='font-medium'>
                Screen Reader Support
              </div>
              <div className='text-sm text-gray-600'>
                Properly announced to screen readers
              </div>
            </div>
            <SwitchCtrl
              defaultChecked={true}
              aria-labelledby='screen-reader-label'
              aria-describedby='screen-reader-desc'
            />
            <div id='screen-reader-desc' className='sr-only'>
              This toggle controls screen reader announcements
            </div>
          </div>

          <div className='flex items-center justify-between p-3 border rounded'>
            <div>
              <div className='font-medium'>Focus Ring</div>
              <div className='text-sm text-gray-600'>
                Visual focus indicator for keyboard users
              </div>
            </div>
            <SwitchCtrl
              defaultChecked={false}
              aria-label='Focus ring demonstration'
              showFocusRing={true}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of accessibility features including keyboard navigation, screen reader support, and focus management.',
      },
    },
  },
};

// Size Comparison

export const SizeComparison: Story = {
  render: () => (
    <div className='space-y-6'>
      <h3 className='text-lg font-semibold'>Size Variants</h3>

      <div className='space-y-4'>
        <div className='flex items-center justify-between p-3 border rounded'>
          <span className='font-medium'>Small (sm)</span>
          <SwitchCtrl
            size='sm'
            defaultChecked={false}
            aria-label='Small switch'
          />
        </div>

        <div className='flex items-center justify-between p-3 border rounded'>
          <span className='font-medium'>Medium (md) - Default</span>
          <SwitchCtrl
            size='md'
            defaultChecked={true}
            aria-label='Medium switch'
          />
        </div>

        <div className='flex items-center justify-between p-3 border rounded'>
          <span className='font-medium'>Large (lg)</span>
          <SwitchCtrl
            size='lg'
            defaultChecked={false}
            aria-label='Large switch'
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different switch sizes.',
      },
    },
  },
};

// API Comparison

export const APIComparison: Story = {
  render: () => (
    <div className='space-y-8 w-full max-w-2xl'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>
          Devlink API (Backward Compatibility)
        </h3>
        <div className='space-y-4'>
          <div className='flex items-center justify-between p-3 border rounded'>
            <div>
              <div className='font-medium'>Basic Toggle</div>
              <div className='text-sm text-gray-600'>
                Uses toglClick handler and form attributes
              </div>
            </div>
            <SwitchCtrl
              toglId='devlink-example'
              toglName='setting'
              toglValue='enabled'
              toglClick={e => console.log('Devlink API clicked:', e)}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Modern API (Recommended)</h3>
        <div className='space-y-4'>
          <div className='flex items-center justify-between p-3 border rounded'>
            <div>
              <div className='font-medium'>Controlled Toggle</div>
              <div className='text-sm text-gray-600'>
                Uses checked state and onCheckedChange callback
              </div>
            </div>
            <SwitchCtrl
              checked={true}
              onCheckedChange={checked =>
                console.log('Modern API changed:', checked)
              }
              aria-label='Modern API example'
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison between devlink API and modern React API approaches.',
      },
    },
  },
};
