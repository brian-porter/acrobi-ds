import type { Meta, StoryObj } from '@storybook/react';
import { CboxCtrl } from './cbox-ctrl';
import { useState } from 'react';

const meta = {
  title: 'Primitives/CboxCtrl',
  component: CboxCtrl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
CboxCtrl component using authentic Acrobi Design System styling.

This component provides individual checkbox functionality with optional label, link, and feedback elements.

**Key Features:**
- Uses authentic Acrobi CSS classes: \`.itm_ctrl\`, \`.cbox\`, \`.cbox-label\`
- Supports both devlink API (itmActive, itmClick) and modern API (checked, onCheckedChange)
- Optional label text, link, and feedback message
- Form integration via name, value, and change handlers
- Flexible alignment (left/right) and sizing options
- Accessibility features with proper labeling and keyboard support

**CSS Classes Used:**
- \`.itm_ctrl\` - Main item control container
- \`.cbox\` - Checkbox input element
- \`.cbox-label\` - Checkbox label
- \`.cbox-link\` - Optional link element
- \`.itm_fbk\` - Feedback container
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    comp: {
      control: 'boolean',
      description: 'Show component - devlink API',
    },
    txt: {
      control: 'boolean',
      description: 'Show text label - devlink API',
    },
    link: {
      control: 'boolean',
      description: 'Show link element - devlink API',
    },
    fbk: {
      control: 'boolean',
      description: 'Show feedback - devlink API',
    },
    itmLblSrc: {
      control: 'text',
      description: 'Item label source text - devlink API',
    },
    itmActive: {
      control: 'text',
      description: 'Item active state (True/False) - devlink API',
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
      description: 'Checkbox size - modern API',
    },
  },
} satisfies Meta<typeof CboxCtrl>;

export default meta;
type Story = StoryObj<typeof meta>;

// Devlink API Stories

export const DevlinkBasic: Story = {
  args: {
    comp: true,
    txt: true,
    id: 'basic-checkbox',
    itmName: 'agreement',
    itmValue: 'agreed',
    itmActive: 'False',
    itmLblSrc: 'I agree to the terms and conditions',
    itmLblSz: 'r3',
    align: 'l',
    itmClick: e => console.log('Devlink checkbox clicked:', e),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic checkbox using devlink API with form integration.',
      },
    },
  },
};

export const DevlinkChecked: Story = {
  args: {
    comp: true,
    txt: true,
    id: 'checked-checkbox',
    itmName: 'notifications',
    itmValue: 'enabled',
    itmActive: 'True',
    itmLblSrc: 'Enable email notifications',
    itmLblSz: 'r3',
    align: 'l',
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox in checked state using devlink API.',
      },
    },
  },
};

export const DevlinkWithLink: Story = {
  args: {
    comp: true,
    txt: true,
    link: true,
    id: 'terms-checkbox',
    itmName: 'terms',
    itmValue: 'accepted',
    itmActive: 'False',
    itmLblSrc: 'I agree to the',
    linkTxtSrc: 'Terms of Service',
    linkSrc: { href: '/terms', target: '_blank' },
    linkClick: e => console.log('Terms link clicked:', e),
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox with link element using devlink API.',
      },
    },
  },
};

export const DevlinkWithFeedback: Story = {
  args: {
    comp: true,
    txt: true,
    fbk: true,
    id: 'error-checkbox',
    itmName: 'required_field',
    itmValue: 'checked',
    itmActive: 'False',
    itmLblSrc: 'This field is required',
    fbkFbkTxt: true,
    fbkFbkIcn: true,
    fbkFbkTxtSrc: 'Please check this box to continue',
    fbkFbkIcnSrc: 'clearcirc',
    fbkFbkClr: 'fd500',
    fbkFbkIcnLoc: 'r',
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox with error feedback using devlink API.',
      },
    },
  },
};

export const DevlinkRightAligned: Story = {
  args: {
    comp: true,
    txt: true,
    id: 'right-checkbox',
    itmName: 'newsletter',
    itmValue: 'subscribe',
    itmActive: 'False',
    itmLblSrc: 'Subscribe to newsletter',
    align: 'r',
    itmLblSz: 'r2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Right-aligned checkbox using devlink API.',
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
    itmLblSrc: 'Enable feature',
    id: 'modern-checkbox',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic checkbox using modern React API.',
      },
    },
  },
};

export const ModernChecked: Story = {
  args: {
    checked: true,
    onCheckedChange: (checked: boolean) =>
      console.log('Modern API checked:', checked),
    itmLblSrc: 'Feature enabled',
    id: 'modern-checked',
  },
  parameters: {
    docs: {
      description: {
        story: 'Checked checkbox using modern React API.',
      },
    },
  },
};

export const ModernWithHelper: Story = {
  args: {
    checked: false,
    onCheckedChange: (checked: boolean) =>
      console.log('Modern API checked:', checked),
    itmLblSrc: 'Send me updates',
    helperText: 'You can change this setting at any time',
    id: 'helper-checkbox',
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox with helper text using modern API.',
      },
    },
  },
};

export const ModernError: Story = {
  args: {
    checked: false,
    onCheckedChange: (checked: boolean) =>
      console.log('Modern API checked:', checked),
    itmLblSrc: 'I agree to the terms',
    error: true,
    helperText: 'You must agree to continue',
    id: 'error-checkbox',
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox in error state using modern API.',
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
    id: 'disabled-checkbox',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled checkbox using modern API.',
      },
    },
  },
};

// Size Variants

export const SmallSize: Story = {
  args: {
    checked: false,
    itmLblSrc: 'Small checkbox',
    size: 'sm',
    itmLblSz: 'r4',
    id: 'small-checkbox',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size checkbox.',
      },
    },
  },
};

export const MediumSize: Story = {
  args: {
    checked: true,
    itmLblSrc: 'Medium checkbox',
    size: 'md',
    itmLblSz: 'r3',
    id: 'medium-checkbox',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium size checkbox (default).',
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    checked: false,
    itmLblSrc: 'Large checkbox',
    size: 'lg',
    itmLblSz: 'r2',
    id: 'large-checkbox',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size checkbox.',
      },
    },
  },
};

// Interactive Examples

export const ControlledCheckbox: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <div className='space-y-4'>
        <CboxCtrl
          checked={isChecked}
          onCheckedChange={setIsChecked}
          itmLblSrc='Subscribe to newsletter'
          id='controlled-checkbox'
        />

        <p className='text-sm text-gray-600'>
          Subscription: <strong>{isChecked ? 'Active' : 'Inactive'}</strong>
        </p>

        <button
          onClick={() => setIsChecked(!isChecked)}
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
        story: 'Controlled checkbox with external state management.',
      },
    },
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      terms: false,
      newsletter: false,
      marketing: false,
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
        <h3 className='text-lg font-semibold'>Registration Form</h3>

        <div className='space-y-4'>
          <CboxCtrl
            itmName='terms'
            itmValue='accepted'
            checked={formData.terms}
            onCheckedChange={checked =>
              setFormData(prev => ({ ...prev, terms: checked }))
            }
            itmLblSrc='I agree to the'
            link={true}
            linkTxtSrc='Terms of Service'
            linkSrc={{ href: '/terms', target: '_blank' }}
            id='terms-form'
            required
          />

          <CboxCtrl
            itmName='newsletter'
            itmValue='subscribed'
            checked={formData.newsletter}
            onCheckedChange={checked =>
              setFormData(prev => ({ ...prev, newsletter: checked }))
            }
            itmLblSrc='Subscribe to newsletter'
            helperText='Get weekly updates about new features'
            id='newsletter-form'
          />

          <CboxCtrl
            itmName='marketing'
            itmValue='allowed'
            checked={formData.marketing}
            onCheckedChange={checked =>
              setFormData(prev => ({ ...prev, marketing: checked }))
            }
            itmLblSrc='Allow marketing communications'
            helperText='Receive promotional offers and product updates'
            id='marketing-form'
          />
        </div>

        <button
          type='submit'
          disabled={!formData.terms}
          className='w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Register
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
          'Checkboxes integrated into a registration form with validation.',
      },
    },
  },
};

export const ValidationExample: Story = {
  render: () => {
    const [agreed, setAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const hasError = submitted && !agreed;

    const handleSubmit = () => {
      setSubmitted(true);
      if (agreed) {
        alert('Success! Terms accepted.');
      }
    };

    return (
      <div className='space-y-4 p-4 border rounded-lg max-w-md'>
        <h3 className='text-lg font-semibold'>Terms Validation</h3>

        <CboxCtrl
          checked={agreed}
          onCheckedChange={setAgreed}
          itmLblSrc='I agree to the Terms and Conditions'
          link={true}
          linkTxtSrc='Read full terms'
          linkSrc={{ href: '/terms' }}
          fbk={hasError}
          fbkFbkTxt={true}
          fbkFbkIcn={true}
          fbkFbkTxtSrc='You must agree to the terms to continue'
          fbkFbkIcnSrc='clearcirc'
          fbkFbkClr='fd500'
          error={hasError}
          id='validation-checkbox'
        />

        <button
          onClick={handleSubmit}
          className='w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Submit
        </button>

        {hasError && (
          <div className='text-sm text-red-600 bg-red-50 p-2 rounded'>
            Please accept the terms and conditions to proceed.
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox with validation and error feedback.',
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
          <CboxCtrl
            comp={true}
            txt={true}
            itmName='devlink_example'
            itmValue='checked'
            itmActive='False'
            itmLblSrc='Devlink API checkbox'
            itmClick={e => console.log('Devlink clicked:', e)}
            id='devlink-api'
          />
          <p className='text-sm text-gray-600'>
            Uses itmActive (True/False), itmClick handler, and form attributes
          </p>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Modern API (Recommended)</h3>
        <div className='space-y-4'>
          <CboxCtrl
            checked={false}
            onCheckedChange={checked => console.log('Modern API:', checked)}
            itmLblSrc='Modern API checkbox'
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
