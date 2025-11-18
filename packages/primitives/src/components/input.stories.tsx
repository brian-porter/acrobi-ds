import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Input component with Acrobi Design System styling, using SF Pro Display typography and authentic design tokens. Supports icons, labels, helper text, and various states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'default', 'lg', 'xl'],
      description: 'Input size',
    },
    styling: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined', 'underlined'],
      description: 'Input visual style',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning', 'focus'],
      description: 'Input state',
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['Left', 'Right'],
      description: 'Icon position',
    },
    icon: {
      control: { type: 'text' },
      description: 'Icon name from BQ-Icons font',
    },
    label: {
      control: { type: 'text' },
      description: 'Input label',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text below input',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Required field indicator',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state',
    },
  },
  decorators: [
    Story => (
      <div className='w-80'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email...',
    type: 'email',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    icon: 'search',
    iconPosition: 'Left',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password...',
    helperText: 'Must be at least 8 characters',
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name...',
    required: true,
    helperText: 'This field is required',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email...',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username...',
    success: 'Username is available',
    value: 'john_doe',
  },
};

export const Loading: Story = {
  args: {
    label: 'Search',
    placeholder: 'Searching...',
    loading: true,
    icon: 'search',
  },
};

// Input Styles with 32px spacing
export const InputStyles: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Input Styles
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-col' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Input
              styling='default'
              label='Default Style'
              placeholder='Default input...'
            />
            <div className='acrobi-showcase-item-label'>Default</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Input
              styling='filled'
              label='Filled Style'
              placeholder='Filled input...'
            />
            <div className='acrobi-showcase-item-label'>Filled</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Input
              styling='outlined'
              label='Outlined Style'
              placeholder='Outlined input...'
            />
            <div className='acrobi-showcase-item-label'>Outlined</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Input
              styling='underlined'
              label='Underlined Style'
              placeholder='Underlined input...'
            />
            <div className='acrobi-showcase-item-label'>Underlined</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Input Sizes with 32px spacing
export const InputSizes: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Input Sizes
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-col' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Input size='xs' label='Extra Small' placeholder='XS input...' />
            <div className='acrobi-showcase-item-label'>XS</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Input size='sm' label='Small' placeholder='Small input...' />
            <div className='acrobi-showcase-item-label'>Small</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Input
              size='default'
              label='Default'
              placeholder='Default input...'
            />
            <div className='acrobi-showcase-item-label'>Default</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Input size='lg' label='Large' placeholder='Large input...' />
            <div className='acrobi-showcase-item-label'>Large</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Input size='xl' label='Extra Large' placeholder='XL input...' />
            <div className='acrobi-showcase-item-label'>XL</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Input States with 32px spacing
export const InputStates: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Input States
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-col' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Input label='Normal' placeholder='Normal state...' />
            <div className='acrobi-showcase-item-label'>Normal</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Input
              label='Error'
              placeholder='Error state...'
              error='This field has an error'
            />
            <div className='acrobi-showcase-item-label'>Error</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Input
              label='Success'
              placeholder='Success state...'
              success='Input is valid'
            />
            <div className='acrobi-showcase-item-label'>Success</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Input label='Disabled' placeholder='Disabled state...' disabled />
            <div className='acrobi-showcase-item-label'>Disabled</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Input label='Loading' placeholder='Loading state...' loading />
            <div className='acrobi-showcase-item-label'>Loading</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Icon Positions with 32px spacing
export const IconPositions: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Icon Positions
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-col' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Input
              label='Left Icon'
              icon='search'
              iconPosition='Left'
              placeholder='Search...'
            />
            <div className='acrobi-showcase-item-label'>Left</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Input
              label='Right Icon'
              icon='user'
              iconPosition='Right'
              placeholder='Username...'
            />
            <div className='acrobi-showcase-item-label'>Right</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Comprehensive Input Showcase
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size--48px)',
        padding: 'var(--size--32px)',
      }}
    >
      <div
        className='text-center'
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--size--16px)',
        }}
      >
        <h1 data-fs='h1' className='text-foreground'>
          Input Component Showcase
        </h1>
        <p data-fs='r2' className='text-muted-foreground max-w-2xl mx-auto'>
          Comprehensive showcase of input styles, sizes, states, and
          functionality with 32px spacing.
        </p>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Form Examples</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <div className='space-y-4'>
            <Input
              label='Email Address'
              type='email'
              placeholder='john@example.com'
              icon='user'
              iconPosition='Left'
              required
            />
            <Input
              label='Password'
              type='password'
              placeholder='Enter password...'
              helperText='Must be at least 8 characters'
            />
            <Input
              label='Search'
              placeholder='Search products...'
              icon='search'
              iconPosition='Left'
            />
          </div>
          <div className='space-y-4'>
            <Input
              label='Phone Number'
              type='tel'
              placeholder='+1 (555) 123-4567'
              helperText='Include country code'
            />
            <Input
              label='Website'
              type='url'
              placeholder='https://example.com'
              success='Valid URL format'
            />
            <Input
              label='Invalid Email'
              type='email'
              value='invalid-email'
              error='Please enter a valid email address'
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
