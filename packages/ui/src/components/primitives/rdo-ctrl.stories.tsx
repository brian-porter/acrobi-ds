import type { Meta, StoryObj } from '@storybook/react';
import { RdoCtrl } from './rdo-ctrl';
import { useState } from 'react';

const meta = {
  title: 'Primitives/RdoCtrl',
  component: RdoCtrl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
RdoCtrl component using authentic Acrobi Design System styling.

This component provides individual radio button functionality with optional feedback element.

**Key Features:**
- Uses authentic Acrobi CSS classes: \`.rdo_ctrl\`, \`.rdo\`, \`.label\`
- Supports both devlink API (itmClick, onChange) and modern API (checked, onCheckedChange)
- Optional feedback message with icon and text
- Form integration via name, value, and change handlers
- Flexible alignment (left/right) and sizing options
- Accessibility features with proper labeling and keyboard support

**CSS Classes Used:**
- \`.rdo_ctrl\` - Main radio control container
- \`.rdo\` - Radio input element
- \`.label\` - Radio label
- \`.itm_fbk\` - Feedback container
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fbk: {
      control: 'boolean',
      description: 'Show feedback - devlink API',
    },
    itmLblSrc: {
      control: 'text',
      description: 'Item label source text - devlink API',
    },
    itmName: {
      control: 'text',
      description: 'Item name for form integration - devlink API',
    },
    itmValue: {
      control: 'text',
      description: 'Item value for form integration - devlink API',
    },
    align: {
      control: 'select',
      options: ['l', 'r'],
      description: 'Alignment (l = left, r = right) - devlink API',
    },
    itmLblSz: {
      control: 'select',
      options: ['r1', 'r2', 'r3', 'r4'],
      description: 'Item label size - devlink API',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state - modern API',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    error: {
      control: 'boolean',
      description: 'Error state - modern API',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Radio size - modern API',
    },
  },
} satisfies Meta<typeof RdoCtrl>;

export default meta;
type Story = StoryObj<typeof meta>;

// Devlink API Stories

export const DevlinkBasic: Story = {
  args: {
    id: 'basic-radio',
    itmName: 'choice',
    itmValue: 'option1',
    itmLblSrc: 'Option 1',
    itmLblSz: 'r3',
    align: 'l',
    itmClick: e => console.log('Devlink radio clicked:', e),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic radio button using devlink API with form integration.',
      },
    },
  },
};

export const DevlinkWithFeedback: Story = {
  args: {
    id: 'feedback-radio',
    itmName: 'setting',
    itmValue: 'enabled',
    itmLblSrc: 'Enable this feature',
    fbk: true,
    fbkFbkTxt: true,
    fbkFbkIcn: true,
    fbkFbkTxtSrc: 'This option requires additional permissions',
    fbkFbkIcnSrc: 'info',
    fbkFbkClr: 'p500',
    fbkFbkIcnLoc: 'l',
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio button with feedback message using devlink API.',
      },
    },
  },
};

export const DevlinkError: Story = {
  args: {
    id: 'error-radio',
    itmName: 'required_choice',
    itmValue: 'selected',
    itmLblSrc: 'Required selection',
    fbk: true,
    fbkFbkTxt: true,
    fbkFbkIcn: true,
    fbkFbkTxtSrc: 'Please select this option to continue',
    fbkFbkIcnSrc: 'clearcirc',
    fbkFbkClr: 'fd500',
    fbkFbkIcnLoc: 'r',
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio button with error feedback using devlink API.',
      },
    },
  },
};

export const DevlinkRightAligned: Story = {
  args: {
    id: 'right-radio',
    itmName: 'alignment',
    itmValue: 'right',
    itmLblSrc: 'Right-aligned option',
    align: 'r',
    itmLblSz: 'r2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Right-aligned radio button using devlink API.',
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
    itmLblSrc: 'Modern option',
    name: 'modern_choice',
    value: 'option1',
    id: 'modern-radio',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic radio button using modern React API.',
      },
    },
  },
};

export const ModernChecked: Story = {
  args: {
    checked: true,
    onCheckedChange: (checked: boolean) =>
      console.log('Modern API checked:', checked),
    itmLblSrc: 'Selected option',
    name: 'modern_choice',
    value: 'option2',
    id: 'modern-checked',
  },
  parameters: {
    docs: {
      description: {
        story: 'Checked radio button using modern React API.',
      },
    },
  },
};

export const ModernWithHelper: Story = {
  args: {
    checked: false,
    onCheckedChange: (checked: boolean) =>
      console.log('Modern API checked:', checked),
    itmLblSrc: 'Advanced option',
    helperText: 'This option enables additional features',
    name: 'features',
    value: 'advanced',
    id: 'helper-radio',
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio button with helper text using modern API.',
      },
    },
  },
};

export const ModernError: Story = {
  args: {
    checked: false,
    onCheckedChange: (checked: boolean) =>
      console.log('Modern API checked:', checked),
    itmLblSrc: 'Required option',
    error: true,
    helperText: 'This selection is required',
    name: 'required',
    value: 'must_select',
    id: 'error-radio',
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio button in error state using modern API.',
      },
    },
  },
};

export const ModernDisabled: Story = {
  args: {
    checked: false,
    disabled: true,
    itmLblSrc: 'Disabled option',
    helperText: 'This option is not available',
    name: 'disabled',
    value: 'unavailable',
    id: 'disabled-radio',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled radio button using modern API.',
      },
    },
  },
};

// Size Variants

export const SmallSize: Story = {
  args: {
    checked: false,
    itmLblSrc: 'Small radio',
    size: 'sm',
    itmLblSz: 'r4',
    name: 'size',
    value: 'small',
    id: 'small-radio',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size radio button.',
      },
    },
  },
};

export const MediumSize: Story = {
  args: {
    checked: true,
    itmLblSrc: 'Medium radio',
    size: 'md',
    itmLblSz: 'r3',
    name: 'size',
    value: 'medium',
    id: 'medium-radio',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium size radio button (default).',
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    checked: false,
    itmLblSrc: 'Large radio',
    size: 'lg',
    itmLblSz: 'r2',
    name: 'size',
    value: 'large',
    id: 'large-radio',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size radio button.',
      },
    },
  },
};

// Interactive Examples

export const RadioGroup: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('option1');

    const options = [
      { value: 'option1', label: 'First Option' },
      { value: 'option2', label: 'Second Option' },
      { value: 'option3', label: 'Third Option' },
    ];

    return (
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Choose an option:</h3>

        <div className='space-y-2'>
          {options.map(option => (
            <RdoCtrl
              key={option.value}
              checked={selectedValue === option.value}
              onCheckedChange={checked =>
                checked && setSelectedValue(option.value)
              }
              itmLblSrc={option.label}
              name='radio_group'
              value={option.value}
              id={`option-${option.value}`}
            />
          ))}
        </div>

        <p className='text-sm text-gray-600'>
          Selected: <strong>{selectedValue}</strong>
        </p>

        <button
          onClick={() => setSelectedValue('option2')}
          className='px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Select Option 2
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio button group with controlled state management.',
      },
    },
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      plan: '',
      billing: '',
      notifications: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      alert(`Form data: ${JSON.stringify(formData, null, 2)}`);
    };

    return (
      <form
        onSubmit={handleSubmit}
        className='space-y-6 p-4 border rounded-lg max-w-md'
      >
        <h3 className='text-lg font-semibold'>Subscription Settings</h3>

        <div className='space-y-4'>
          <div>
            <h4 className='font-medium mb-2'>Choose a plan:</h4>
            <div className='space-y-2'>
              <RdoCtrl
                checked={formData.plan === 'basic'}
                onCheckedChange={checked =>
                  checked && setFormData(prev => ({ ...prev, plan: 'basic' }))
                }
                itmLblSrc='Basic Plan - $9/month'
                name='plan'
                value='basic'
                id='plan-basic'
              />
              <RdoCtrl
                checked={formData.plan === 'pro'}
                onCheckedChange={checked =>
                  checked && setFormData(prev => ({ ...prev, plan: 'pro' }))
                }
                itmLblSrc='Pro Plan - $19/month'
                name='plan'
                value='pro'
                id='plan-pro'
              />
              <RdoCtrl
                checked={formData.plan === 'enterprise'}
                onCheckedChange={checked =>
                  checked &&
                  setFormData(prev => ({ ...prev, plan: 'enterprise' }))
                }
                itmLblSrc='Enterprise Plan - $49/month'
                name='plan'
                value='enterprise'
                id='plan-enterprise'
              />
            </div>
          </div>

          <div>
            <h4 className='font-medium mb-2'>Billing cycle:</h4>
            <div className='space-y-2'>
              <RdoCtrl
                checked={formData.billing === 'monthly'}
                onCheckedChange={checked =>
                  checked &&
                  setFormData(prev => ({ ...prev, billing: 'monthly' }))
                }
                itmLblSrc='Monthly billing'
                name='billing'
                value='monthly'
                id='billing-monthly'
              />
              <RdoCtrl
                checked={formData.billing === 'yearly'}
                onCheckedChange={checked =>
                  checked &&
                  setFormData(prev => ({ ...prev, billing: 'yearly' }))
                }
                itmLblSrc='Yearly billing (save 20%)'
                name='billing'
                value='yearly'
                id='billing-yearly'
              />
            </div>
          </div>

          <div>
            <h4 className='font-medium mb-2'>Notifications:</h4>
            <div className='space-y-2'>
              <RdoCtrl
                checked={formData.notifications === 'all'}
                onCheckedChange={checked =>
                  checked &&
                  setFormData(prev => ({ ...prev, notifications: 'all' }))
                }
                itmLblSrc='All notifications'
                name='notifications'
                value='all'
                id='notifications-all'
              />
              <RdoCtrl
                checked={formData.notifications === 'important'}
                onCheckedChange={checked =>
                  checked &&
                  setFormData(prev => ({ ...prev, notifications: 'important' }))
                }
                itmLblSrc='Important only'
                name='notifications'
                value='important'
                id='notifications-important'
              />
              <RdoCtrl
                checked={formData.notifications === 'none'}
                onCheckedChange={checked =>
                  checked &&
                  setFormData(prev => ({ ...prev, notifications: 'none' }))
                }
                itmLblSrc='No notifications'
                name='notifications'
                value='none'
                id='notifications-none'
              />
            </div>
          </div>
        </div>

        <button
          type='submit'
          disabled={!formData.plan || !formData.billing}
          className='w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Save Settings
        </button>

        <div className='text-xs text-gray-500 bg-gray-50 p-2 rounded'>
          <strong>Form state:</strong>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Radio buttons integrated into a subscription form with multiple groups.',
      },
    },
  },
};

export const ValidationExample: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const hasError = submitted && !selectedOption;

    const handleSubmit = () => {
      setSubmitted(true);
      if (selectedOption) {
        alert(`Success! Selected: ${selectedOption}`);
      }
    };

    return (
      <div className='space-y-4 p-4 border rounded-lg max-w-md'>
        <h3 className='text-lg font-semibold'>Required Selection</h3>

        <div className='space-y-2'>
          <RdoCtrl
            checked={selectedOption === 'yes'}
            onCheckedChange={checked => checked && setSelectedOption('yes')}
            itmLblSrc='Yes, I agree'
            name='agreement'
            value='yes'
            id='agree-yes'
            error={hasError}
          />
          <RdoCtrl
            checked={selectedOption === 'no'}
            onCheckedChange={checked => checked && setSelectedOption('no')}
            itmLblSrc='No, I disagree'
            name='agreement'
            value='no'
            id='agree-no'
            error={hasError}
          />
        </div>

        {hasError && (
          <RdoCtrl
            fbk={true}
            fbkFbkTxt={true}
            fbkFbkIcn={true}
            fbkFbkTxtSrc='Please make a selection to continue'
            fbkFbkIcnSrc='clearcirc'
            fbkFbkClr='fd500'
            itmLblSrc=''
            className='border-none'
          />
        )}

        <button
          onClick={handleSubmit}
          className='w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Submit
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons with validation and error feedback.',
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
          <RdoCtrl
            itmName='devlink_example'
            itmValue='option1'
            itmLblSrc='Devlink API radio'
            itmClick={e => console.log('Devlink clicked:', e)}
            id='devlink-api'
          />
          <p className='text-sm text-gray-600'>
            Uses itmClick handler and form attributes
          </p>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Modern API (Recommended)</h3>
        <div className='space-y-4'>
          <RdoCtrl
            checked={false}
            onCheckedChange={checked => console.log('Modern API:', checked)}
            itmLblSrc='Modern API radio'
            name='modern_example'
            value='option1'
            id='modern-api'
          />
          <p className='text-sm text-gray-600'>
            Uses checked boolean and onCheckedChange callback
          </p>
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
