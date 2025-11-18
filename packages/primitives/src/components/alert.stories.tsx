import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, AlertTitle, AlertDescription } from './alert';

const meta: Meta<typeof Alert> = {
  title: 'Primitives/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Alert component with Acrobi Design System styling, using SF Pro Display typography and authentic design tokens. Supports multiple styles, types, and dismissible functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    styling: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined', 'minimal'],
      description: 'Alert visual style',
    },
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'danger'],
      description: 'Alert semantic type',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Alert size',
    },
    icon: {
      control: { type: 'text' },
      description: 'Icon name from BQ-Icons font',
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Show close button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'info',
    children: (
      <>
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          This is an informational alert message to notify users about something
          important.
        </AlertDescription>
      </>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    type: 'success',
    icon: 'check',
    children: (
      <>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your changes have been saved successfully!
        </AlertDescription>
      </>
    ),
  },
};

export const Dismissible: Story = {
  args: {
    type: 'warning',
    icon: 'default',
    dismissible: true,
    onClose: () => alert('Alert dismissed'),
    children: (
      <>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This action cannot be undone. Please proceed with caution.
        </AlertDescription>
      </>
    ),
  },
};

// Alert Types with 32px spacing
export const AlertTypes: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Alert Types
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-col' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Alert type='info' icon='default'>
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                Here's some helpful information for you.
              </AlertDescription>
            </Alert>
            <div className='acrobi-showcase-item-label'>Info</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Alert type='success' icon='check'>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Operation completed successfully!
              </AlertDescription>
            </Alert>
            <div className='acrobi-showcase-item-label'>Success</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Alert type='warning' icon='default'>
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Please review this action carefully.
              </AlertDescription>
            </Alert>
            <div className='acrobi-showcase-item-label'>Warning</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Alert type='danger' icon='close'>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Something went wrong. Please try again.
              </AlertDescription>
            </Alert>
            <div className='acrobi-showcase-item-label'>Danger</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Alert Styles with 32px spacing
export const AlertStyles: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Alert Styles
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-col' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Alert style='default' type='info' icon='default'>
              <AlertTitle>Default Style</AlertTitle>
              <AlertDescription>Standard alert appearance</AlertDescription>
            </Alert>
            <div className='acrobi-showcase-item-label'>Default</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Alert style='filled' type='success' icon='check'>
              <AlertTitle>Filled Style</AlertTitle>
              <AlertDescription>Alert with filled background</AlertDescription>
            </Alert>
            <div className='acrobi-showcase-item-label'>Filled</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Alert style='outlined' type='warning' icon='default'>
              <AlertTitle>Outlined Style</AlertTitle>
              <AlertDescription>Alert with prominent border</AlertDescription>
            </Alert>
            <div className='acrobi-showcase-item-label'>Outlined</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Alert style='minimal' type='info' icon='default'>
              <AlertTitle>Minimal Style</AlertTitle>
              <AlertDescription>Clean, minimal alert design</AlertDescription>
            </Alert>
            <div className='acrobi-showcase-item-label'>Minimal</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Alert Sizes with 32px spacing
export const AlertSizes: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Alert Sizes
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-col' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Alert size='sm' type='info' icon='default'>
              <AlertTitle>Small Alert</AlertTitle>
              <AlertDescription>Compact alert size</AlertDescription>
            </Alert>
            <div className='acrobi-showcase-item-label'>Small</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Alert size='default' type='info' icon='default'>
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>Standard alert size</AlertDescription>
            </Alert>
            <div className='acrobi-showcase-item-label'>Default</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Alert size='lg' type='info' icon='default'>
              <AlertTitle>Large Alert</AlertTitle>
              <AlertDescription>
                Spacious alert size for important messages
              </AlertDescription>
            </Alert>
            <div className='acrobi-showcase-item-label'>Large</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Comprehensive Alert Showcase
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
          Alert Component Showcase
        </h1>
        <p data-fs='r2' className='text-muted-foreground max-w-2xl mx-auto'>
          Comprehensive showcase of alert types, styles, sizes, and
          functionality with 32px spacing.
        </p>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Interactive Examples</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <Alert type='success' icon='check' dismissible style='filled'>
            <AlertTitle>Payment Successful</AlertTitle>
            <AlertDescription>
              Your payment has been processed successfully. You will receive a
              confirmation email shortly.
            </AlertDescription>
          </Alert>
          <Alert type='warning' icon='default' dismissible style='outlined'>
            <AlertTitle>Account Verification Required</AlertTitle>
            <AlertDescription>
              Please verify your email address to continue using all features of
              your account.
            </AlertDescription>
          </Alert>
          <Alert type='danger' icon='close' dismissible>
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>
              Unable to connect to the server. Please check your internet
              connection and try again.
            </AlertDescription>
          </Alert>
          <Alert type='info' icon='default' style='minimal'>
            <AlertTitle>New Feature Available</AlertTitle>
            <AlertDescription>
              We've added new collaboration tools to help you work more
              efficiently with your team.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
