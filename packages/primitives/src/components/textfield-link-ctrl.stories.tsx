import type { Meta, StoryObj } from '@storybook/react';
import { TextfieldLinkCtrl } from './textfield-link-ctrl';

const meta = {
  title: 'Primitives/TextfieldLinkCtrl',
  component: TextfieldLinkCtrl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
TextfieldLinkCtrl component using authentic Acrobi Design System styling.

This component provides text field-style links that integrate seamlessly with form elements and input fields.

**Key Features:**
- Uses authentic Acrobi CSS classes: \`.textfield-link\`, \`.r2\`
- Supports both devlink API (fldLinkTxtSrc, fldLink) and modern API (text, href)
- Integrates with text field designs and form elements
- Flexible typography sizing with Acrobi classes (r1, r2, r3, r4)
- Optional external link indicator
- Loading and disabled states
- Accessibility features with proper ARIA attributes

**CSS Classes Used:**
- \`.textfield-link\` - Main text field link container
- \`.r2\` - Acrobi typography class (default size)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fldLinkTxtSrc: {
      control: 'text',
      description: 'Field link text source - devlink API',
    },
    fldLink: {
      control: 'object',
      description: 'Field link configuration - devlink API',
    },
    text: {
      control: 'text',
      description: 'Link text - modern API',
    },
    href: {
      control: 'text',
      description: 'Link href - modern API',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Link target - modern API',
    },
    textSize: {
      control: 'select',
      options: ['r1', 'r2', 'r3', 'r4'],
      description: 'Text size using Acrobi typography',
    },
    textColor: {
      control: 'select',
      options: ['default', 'muted', 'destructive', 'success'],
      description: 'Text color variant',
    },
    underline: {
      control: 'select',
      options: ['none', 'hover', 'always'],
      description: 'Underline behavior',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    showExternalIcon: {
      control: 'boolean',
      description: 'Show external link icon',
    },
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'prominent'],
      description: 'Component variant',
    },
  },
} satisfies Meta<typeof TextfieldLinkCtrl>;

export default meta;
type Story = StoryObj<typeof meta>;

// Devlink API Stories

export const DevlinkBasic: Story = {
  args: {
    fldLinkTxtSrc: 'Edit profile',
    fldLink: { href: '/profile/edit' },
    fldClick: e => console.log('Devlink link clicked:', e),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic textfield link using devlink API.',
      },
    },
  },
};

export const DevlinkExternal: Story = {
  args: {
    fldLinkTxtSrc: 'View documentation',
    fldLink: {
      href: 'https://docs.example.com',
      target: '_blank',
      rel: 'noopener',
    },
    showExternalIcon: true,
    fldClick: e => console.log('External devlink clicked:', e),
  },
  parameters: {
    docs: {
      description: {
        story: 'External textfield link using devlink API with external icon.',
      },
    },
  },
};

// Modern API Stories

export const ModernBasic: Story = {
  args: {
    text: 'Forgot password?',
    href: '/reset-password',
    textColor: 'default',
    underline: 'hover',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic textfield link using modern React API.',
      },
    },
  },
};

export const ModernExternal: Story = {
  args: {
    text: 'Help & Support',
    href: 'https://support.example.com',
    target: '_blank',
    showExternalIcon: true,
    textColor: 'muted',
  },
  parameters: {
    docs: {
      description: {
        story: 'External textfield link using modern API with icon.',
      },
    },
  },
};

// Text Size Variants

export const SizeR1: Story = {
  args: {
    text: 'Small link (r1)',
    href: '#',
    textSize: 'r1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield link with r1 text size (smallest).',
      },
    },
  },
};

export const SizeR2: Story = {
  args: {
    text: 'Default link (r2)',
    href: '#',
    textSize: 'r2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield link with r2 text size (default).',
      },
    },
  },
};

export const SizeR3: Story = {
  args: {
    text: 'Medium link (r3)',
    href: '#',
    textSize: 'r3',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield link with r3 text size.',
      },
    },
  },
};

export const SizeR4: Story = {
  args: {
    text: 'Large link (r4)',
    href: '#',
    textSize: 'r4',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield link with r4 text size (largest).',
      },
    },
  },
};

// Color Variants

export const ColorDefault: Story = {
  args: {
    text: 'Default color link',
    href: '#',
    textColor: 'default',
    underline: 'hover',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield link with default color (primary).',
      },
    },
  },
};

export const ColorMuted: Story = {
  args: {
    text: 'Muted color link',
    href: '#',
    textColor: 'muted',
    underline: 'hover',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield link with muted color.',
      },
    },
  },
};

export const ColorDestructive: Story = {
  args: {
    text: 'Delete account',
    href: '/delete-account',
    textColor: 'destructive',
    underline: 'hover',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield link with destructive color for dangerous actions.',
      },
    },
  },
};

export const ColorSuccess: Story = {
  args: {
    text: 'Verify email',
    href: '/verify-email',
    textColor: 'success',
    underline: 'hover',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield link with success color.',
      },
    },
  },
};

// Underline Variants

export const UnderlineNone: Story = {
  args: {
    text: 'No underline',
    href: '#',
    underline: 'none',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield link with no underline.',
      },
    },
  },
};

export const UnderlineHover: Story = {
  args: {
    text: 'Underline on hover',
    href: '#',
    underline: 'hover',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield link with underline on hover.',
      },
    },
  },
};

export const UnderlineAlways: Story = {
  args: {
    text: 'Always underlined',
    href: '#',
    underline: 'always',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield link with permanent underline.',
      },
    },
  },
};

// State Variants

export const LoadingState: Story = {
  args: {
    text: 'Loading link',
    href: '#',
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield link in loading state with spinner.',
      },
    },
  },
};

export const DisabledState: Story = {
  args: {
    text: 'Disabled link',
    href: '#',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield link in disabled state.',
      },
    },
  },
};

// Form Integration Examples

export const FormLinks: Story = {
  render: () => (
    <div className='space-y-6 p-4 border rounded-lg max-w-md'>
      <h3 className='text-lg font-semibold'>Login Form</h3>

      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>Email</label>
          <input
            type='email'
            placeholder='Enter your email'
            className='w-full px-3 py-2 border border-input rounded-md'
          />
        </div>

        <div>
          <label className='block text-sm font-medium mb-1'>Password</label>
          <input
            type='password'
            placeholder='Enter your password'
            className='w-full px-3 py-2 border border-input rounded-md'
          />
          <div className='mt-1 text-right'>
            <TextfieldLinkCtrl
              text='Forgot password?'
              href='/reset-password'
              textSize='r3'
              textColor='muted'
              underline='hover'
            />
          </div>
        </div>

        <button className='w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Sign In
        </button>

        <div className='text-center'>
          <span className='text-sm text-gray-600'>Don't have an account? </span>
          <TextfieldLinkCtrl
            text='Sign up here'
            href='/register'
            textSize='r3'
            underline='hover'
          />
        </div>

        <div className='text-center'>
          <TextfieldLinkCtrl
            text='Need help?'
            href='https://support.example.com'
            target='_blank'
            textSize='r3'
            textColor='muted'
            showExternalIcon={true}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textfield links integrated into a login form.',
      },
    },
  },
};

export const ProfileLinks: Story = {
  render: () => (
    <div className='space-y-4 p-4 border rounded-lg max-w-md'>
      <h3 className='text-lg font-semibold'>Profile Settings</h3>

      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>Profile Picture</span>
          <TextfieldLinkCtrl
            text='Change'
            href='/profile/picture'
            textSize='r3'
            underline='hover'
          />
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm'>Email Address</span>
          <TextfieldLinkCtrl
            text='Update'
            href='/profile/email'
            textSize='r3'
            underline='hover'
          />
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm'>Password</span>
          <TextfieldLinkCtrl
            text='Change'
            href='/profile/password'
            textSize='r3'
            underline='hover'
          />
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm'>Two-Factor Auth</span>
          <TextfieldLinkCtrl
            text='Enable'
            href='/profile/2fa'
            textSize='r3'
            textColor='success'
            underline='hover'
          />
        </div>

        <hr className='my-4' />

        <div className='flex items-center justify-between'>
          <span className='text-sm'>Export Data</span>
          <TextfieldLinkCtrl
            text='Download'
            href='/profile/export'
            textSize='r3'
            textColor='muted'
            underline='hover'
          />
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm text-red-600'>Delete Account</span>
          <TextfieldLinkCtrl
            text='Delete'
            href='/profile/delete'
            textSize='r3'
            textColor='destructive'
            underline='hover'
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textfield links in a profile settings interface.',
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
        <div className='space-y-4 p-4 border rounded'>
          <TextfieldLinkCtrl
            fldLinkTxtSrc='Devlink API link'
            fldLink={{ href: '/devlink-example' }}
            fldClick={e => console.log('Devlink clicked:', e)}
          />
          <p className='text-sm text-gray-600'>
            Uses fldLinkTxtSrc, fldLink object, and fldClick handler
          </p>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Modern API (Recommended)</h3>
        <div className='space-y-4 p-4 border rounded'>
          <TextfieldLinkCtrl
            text='Modern API link'
            href='/modern-example'
            textColor='default'
            underline='hover'
            onClick={e => console.log('Modern clicked:', e)}
          />
          <p className='text-sm text-gray-600'>
            Uses text, href, and modern styling props
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

// Interactive Examples

export const InteractiveStates: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);

    const handleAsyncAction = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
      alert('Action completed!');
    };

    return (
      <div className='space-y-4 p-4 border rounded-lg'>
        <h3 className='text-lg font-semibold'>Interactive Link States</h3>

        <div className='space-y-3'>
          <div className='flex items-center gap-4'>
            <TextfieldLinkCtrl
              text={loading ? 'Processing...' : 'Async Action'}
              href='#'
              loading={loading}
              onClick={e => {
                e.preventDefault();
                handleAsyncAction();
              }}
            />
            <span className='text-sm text-gray-600'>
              {loading ? 'Loading...' : 'Click to trigger async action'}
            </span>
          </div>

          <div className='flex items-center gap-4'>
            <TextfieldLinkCtrl
              text='Conditional Link'
              href='/conditional'
              disabled={disabled}
            />
            <label className='flex items-center gap-2 text-sm'>
              <input
                type='checkbox'
                checked={disabled}
                onChange={e => setDisabled(e.target.checked)}
              />
              Disable link
            </label>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive examples showing loading and disabled states.',
      },
    },
  },
};
