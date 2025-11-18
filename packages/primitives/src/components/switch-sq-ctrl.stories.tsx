import type { Meta, StoryObj } from '@storybook/react';
import { SwitchSqCtrl } from './switch-sq-ctrl';
import { useState } from 'react';

const meta = {
  title: 'Primitives/SwitchSqCtrl',
  component: SwitchSqCtrl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
SwitchSqCtrl (Square Switch Control) component using authentic Acrobi Design System styling.

This component provides square-shaped toggle switch functionality with both devlink compatibility and modern React patterns.

**Key Features:**
- Uses authentic Acrobi CSS classes: \`.togglesq-ctrl\`, \`.toggletracksq\`, \`.toggledragsq\`
- Square-shaped toggle design (unlike the rounded SwitchCtrl)
- Supports both devlink API (toglClick, onChange) and modern API (checked, onCheckedChange)
- Smooth toggle animations matching Webflow interactions
- Form integration via data attributes and hidden input
- Keyboard navigation support (Space and Enter keys)
- Accessibility features with ARIA attributes
- Multiple size variants and disabled state

**CSS Classes Used:**
- \`.togglesq-ctrl\` - Main square toggle container
- \`.toggletracksq\` - Square toggle track background
- \`.toggledragsq\` - Square draggable toggle handle
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
} satisfies Meta<typeof SwitchSqCtrl>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories

export const Default: Story = {
  args: {
    toglClick: e => console.log('Square toggle clicked:', e),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default square toggle switch.',
      },
    },
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    onCheckedChange: (checked: boolean) =>
      console.log('Square toggle changed:', checked),
  },
  parameters: {
    docs: {
      description: {
        story: 'Square toggle switch in checked state.',
      },
    },
  },
};

// Devlink API Stories

export const DevlinkBasic: Story = {
  args: {
    toglId: 'square-switch1',
    toglName: 'square_notifications',
    toglValue: 'enabled',
    tabOrder: 1,
    toglClick: e => console.log('Devlink square toggle clicked:', e),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic square toggle switch using devlink API with form integration.',
      },
    },
  },
};

export const DevlinkWithForm: Story = {
  args: {
    toglId: 'square-privacy-setting',
    toglName: 'square_privacy',
    toglValue: 'public',
    tabOrder: 0,
    toglClick: e => console.log('Square privacy setting toggled:', e),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Square toggle switch configured for form submission with privacy settings.',
      },
    },
  },
};

// Modern API Stories

export const ModernBasic: Story = {
  args: {
    checked: false,
    onCheckedChange: (checked: boolean) =>
      console.log('Modern API square checked:', checked),
    'aria-label': 'Enable square notifications',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic square toggle switch using modern React API with accessibility.',
      },
    },
  },
};

export const ModernChecked: Story = {
  args: {
    checked: true,
    onCheckedChange: (checked: boolean) =>
      console.log('Modern API square checked:', checked),
    'aria-label': 'Square dark mode enabled',
  },
  parameters: {
    docs: {
      description: {
        story: 'Square toggle switch in checked state using modern API.',
      },
    },
  },
};

// Size Variants

export const SmallSquareSwitch: Story = {
  args: {
    checked: false,
    onCheckedChange: (checked: boolean) =>
      console.log('Small square switch:', checked),
    size: 'sm',
    'aria-label': 'Small square toggle switch',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size square toggle switch.',
      },
    },
  },
};

export const MediumSquareSwitch: Story = {
  args: {
    checked: true,
    onCheckedChange: (checked: boolean) =>
      console.log('Medium square switch:', checked),
    size: 'md',
    'aria-label': 'Medium square toggle switch',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium size square toggle switch (default).',
      },
    },
  },
};

export const LargeSquareSwitch: Story = {
  args: {
    checked: false,
    onCheckedChange: (checked: boolean) =>
      console.log('Large square switch:', checked),
    size: 'lg',
    'aria-label': 'Large square toggle switch',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size square toggle switch.',
      },
    },
  },
};

// State Variants

export const DisabledOff: Story = {
  args: {
    checked: false,
    disabled: true,
    'aria-label': 'Disabled square toggle switch (off)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled square toggle switch in off state.',
      },
    },
  },
};

export const DisabledOn: Story = {
  args: {
    checked: true,
    disabled: true,
    'aria-label': 'Disabled square toggle switch (on)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled square toggle switch in on state.',
      },
    },
  },
};

// Interactive Examples

export const ControlledSquareSwitch: Story = {
  render: () => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
      <div className='space-y-4'>
        <SwitchSqCtrl
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
          aria-label='Square notifications'
        />

        <p className='text-sm text-gray-600'>
          Square notifications are{' '}
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
        story:
          'Controlled square toggle switch with external state management.',
      },
    },
  },
};

export const UncontrolledSquareSwitch: Story = {
  args: {
    defaultChecked: true,
    onCheckedChange: (checked: boolean) =>
      console.log('Uncontrolled square switch changed:', checked),
    'aria-label': 'Square auto-save setting',
  },
  parameters: {
    docs: {
      description: {
        story: 'Uncontrolled square toggle switch with default checked state.',
      },
    },
  },
};

export const SquareFormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      squareNotifications: false,
      squareDarkMode: true,
      squareAutoSave: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Square form submitted:', formData);
      alert(`Square form data: ${JSON.stringify(formData, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit} className='space-y-6 p-4 border rounded-lg'>
        <h3 className='text-lg font-semibold'>Square Settings</h3>

        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <label
              htmlFor='square-notifications-switch'
              className='text-sm font-medium'
            >
              Enable Square Notifications
            </label>
            <SwitchSqCtrl
              toglId='square-notifications-switch'
              toglName='squareNotifications'
              toglValue='enabled'
              checked={formData.squareNotifications}
              onCheckedChange={checked =>
                setFormData(prev => ({ ...prev, squareNotifications: checked }))
              }
              aria-labelledby='square-notifications-label'
            />
          </div>

          <div className='flex items-center justify-between'>
            <label
              htmlFor='square-darkmode-switch'
              className='text-sm font-medium'
            >
              Square Dark Mode
            </label>
            <SwitchSqCtrl
              toglId='square-darkmode-switch'
              toglName='squareDarkMode'
              toglValue='enabled'
              checked={formData.squareDarkMode}
              onCheckedChange={checked =>
                setFormData(prev => ({ ...prev, squareDarkMode: checked }))
              }
              aria-labelledby='square-darkmode-label'
            />
          </div>

          <div className='flex items-center justify-between'>
            <label
              htmlFor='square-autosave-switch'
              className='text-sm font-medium'
            >
              Square Auto-save
            </label>
            <SwitchSqCtrl
              toglId='square-autosave-switch'
              toglName='squareAutoSave'
              toglValue='enabled'
              checked={formData.squareAutoSave}
              onCheckedChange={checked =>
                setFormData(prev => ({ ...prev, squareAutoSave: checked }))
              }
              aria-labelledby='square-autosave-label'
            />
          </div>
        </div>

        <button
          type='submit'
          className='w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Save Square Settings
        </button>

        <div className='text-xs text-gray-500 bg-gray-50 p-2 rounded'>
          <strong>Current square values:</strong>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Square toggle switches integrated into a form with state management.',
      },
    },
  },
};

export const AccessibilityExample: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>
          Square Switch Accessibility Features
        </h3>

        <div className='space-y-4'>
          <div className='flex items-center justify-between p-3 border rounded'>
            <div>
              <div className='font-medium'>Square Keyboard Navigation</div>
              <div className='text-sm text-gray-600'>
                Use Space or Enter to toggle
              </div>
            </div>
            <SwitchSqCtrl
              defaultChecked={false}
              aria-label='Square keyboard navigation demo'
              showFocusRing={true}
            />
          </div>

          <div className='flex items-center justify-between p-3 border rounded'>
            <div>
              <div id='square-screen-reader-label' className='font-medium'>
                Square Screen Reader Support
              </div>
              <div className='text-sm text-gray-600'>
                Properly announced to screen readers
              </div>
            </div>
            <SwitchSqCtrl
              defaultChecked={true}
              aria-labelledby='square-screen-reader-label'
              aria-describedby='square-screen-reader-desc'
            />
            <div id='square-screen-reader-desc' className='sr-only'>
              This square toggle controls screen reader announcements
            </div>
          </div>

          <div className='flex items-center justify-between p-3 border rounded'>
            <div>
              <div className='font-medium'>Square Focus Ring</div>
              <div className='text-sm text-gray-600'>
                Visual focus indicator for keyboard users
              </div>
            </div>
            <SwitchSqCtrl
              defaultChecked={false}
              aria-label='Square focus ring demonstration'
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
          'Demonstration of square switch accessibility features including keyboard navigation, screen reader support, and focus management.',
      },
    },
  },
};

// Size Comparison

export const SizeComparison: Story = {
  render: () => (
    <div className='space-y-6'>
      <h3 className='text-lg font-semibold'>Square Switch Size Variants</h3>

      <div className='space-y-4'>
        <div className='flex items-center justify-between p-3 border rounded'>
          <span className='font-medium'>Small Square (sm)</span>
          <SwitchSqCtrl
            size='sm'
            defaultChecked={false}
            aria-label='Small square switch'
          />
        </div>

        <div className='flex items-center justify-between p-3 border rounded'>
          <span className='font-medium'>Medium Square (md) - Default</span>
          <SwitchSqCtrl
            size='md'
            defaultChecked={true}
            aria-label='Medium square switch'
          />
        </div>

        <div className='flex items-center justify-between p-3 border rounded'>
          <span className='font-medium'>Large Square (lg)</span>
          <SwitchSqCtrl
            size='lg'
            defaultChecked={false}
            aria-label='Large square switch'
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different square switch sizes.',
      },
    },
  },
};

// Comparison with Regular Switch

export const SwitchComparison: Story = {
  render: () => (
    <div className='space-y-8 w-full max-w-2xl'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Square vs Regular Switch</h3>
        <div className='space-y-4'>
          <div className='flex items-center justify-between p-3 border rounded'>
            <div>
              <div className='font-medium'>Square Switch</div>
              <div className='text-sm text-gray-600'>
                Uses square handles and design
              </div>
            </div>
            <SwitchSqCtrl
              checked={true}
              onCheckedChange={checked =>
                console.log('Square switch:', checked)
              }
              aria-label='Square switch example'
            />
          </div>

          <div className='text-sm text-gray-600 bg-gray-50 p-3 rounded'>
            <strong>Square Switch Features:</strong>
            <ul className='mt-2 list-disc list-inside space-y-1'>
              <li>Square-shaped toggle handle</li>
              <li>Angular design aesthetic</li>
              <li>
                Uses .togglesq-ctrl, .toggletracksq, .toggledragsq classes
              </li>
              <li>
                Same functionality as regular switch but different visual style
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison between square switch and regular switch designs.',
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
              <div className='font-medium'>Basic Square Toggle</div>
              <div className='text-sm text-gray-600'>
                Uses toglClick handler and form attributes
              </div>
            </div>
            <SwitchSqCtrl
              toglId='devlink-square-example'
              toglName='square_setting'
              toglValue='enabled'
              toglClick={e => console.log('Devlink square API clicked:', e)}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Modern API (Recommended)</h3>
        <div className='space-y-4'>
          <div className='flex items-center justify-between p-3 border rounded'>
            <div>
              <div className='font-medium'>Controlled Square Toggle</div>
              <div className='text-sm text-gray-600'>
                Uses checked state and onCheckedChange callback
              </div>
            </div>
            <SwitchSqCtrl
              checked={true}
              onCheckedChange={checked =>
                console.log('Modern square API changed:', checked)
              }
              aria-label='Modern square API example'
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
          'Comparison between devlink API and modern React API approaches for square switches.',
      },
    },
  },
};
