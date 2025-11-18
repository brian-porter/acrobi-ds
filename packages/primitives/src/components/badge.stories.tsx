import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge component with Acrobi Design System styling. Supports various sizes, colors, positions, and can display text or icons. Perfect for notifications, status indicators, and counts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    visible: {
      control: { type: 'boolean' },
      description: 'Badge visibility toggle (Bdg in Webflow)',
    },
    color: {
      control: { type: 'select' },
      options: [
        'fd500',
        'fw500',
        'f500',
        'p500',
        'n500',
        'n000',
        'n999',
        'd',
        'w',
        's',
        'p',
        'n',
        'on',
        'off',
        'busy',
      ],
      description: 'Badge color using Acrobi color system (BdgClr in Webflow)',
    },
    size: {
      control: { type: 'select' },
      options: ['xl', 'l', 'm', 'sm', 's'],
      description: 'Badge size using Acrobi sizing system (BdgSz in Webflow)',
    },
    content: {
      control: { type: 'boolean' },
      description: 'Badge content visibility (BdgCont in Webflow)',
    },
    textVisible: {
      control: { type: 'boolean' },
      description: 'Badge text visibility (BdgTxt in Webflow)',
    },
    text: {
      control: { type: 'text' },
      description: 'Badge text content (BdgTxtSrc in Webflow)',
    },
    iconVisible: {
      control: { type: 'boolean' },
      description: 'Badge icon visibility (BdgIcn in Webflow)',
    },
    icon: {
      control: { type: 'text' },
      description: 'Badge icon name (BdgIcnSrc in Webflow)',
    },
    iconSize: {
      control: { type: 'select' },
      options: ['r4', 'r3', 'r2', 'r1'],
      description: 'Badge icon size (BdgIcnSz in Webflow)',
    },
    location: {
      control: { type: 'select' },
      options: ['tl', 'tr', 'bl', 'br'],
      description: 'Badge location (BdgLoc in Webflow)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '3',
    color: 'p500',
    size: 'm',
    visible: true,
    content: true,
    textVisible: true,
  },
};

export const WithIcon: Story = {
  args: {
    icon: 'check',
    color: 'f500',
    size: 'm',
    visible: true,
    content: true,
    iconVisible: true,
    textVisible: false,
  },
};

export const Dot: Story = {
  args: {
    color: 'fd500',
    size: 's',
    visible: true,
    content: false,
  },
};

export const Number: Story = {
  args: {
    text: '99+',
    color: 'fd500',
    size: 'm',
    visible: true,
    content: true,
    textVisible: true,
  },
};

// Badge Sizes with 32px spacing
export const BadgeSizes: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Badge Sizes
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex items-center' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Badge size='xs' text='XS' type='primary' />
            <div className='acrobi-showcase-item-label'>XS</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge size='sm' text='SM' type='primary' />
            <div className='acrobi-showcase-item-label'>Small</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge size='default' text='MD' type='primary' />
            <div className='acrobi-showcase-item-label'>Default</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge size='lg' text='LG' type='primary' />
            <div className='acrobi-showcase-item-label'>Large</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge size='xl' text='XL' type='primary' />
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

// Badge Types with 32px spacing
export const BadgeTypes: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Badge Types
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex items-center' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Badge text='5' type='primary' />
            <div className='acrobi-showcase-item-label'>Primary</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge text='✓' type='success' />
            <div className='acrobi-showcase-item-label'>Success</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge text='!' type='warning' />
            <div className='acrobi-showcase-item-label'>Warning</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge text='3' type='danger' />
            <div className='acrobi-showcase-item-label'>Danger</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge text='2' type='neutral' />
            <div className='acrobi-showcase-item-label'>Neutral</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Badge Styles with 32px spacing
export const BadgeStyles: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Badge Styles
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex items-center' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Badge text='3' style='filled' type='primary' />
            <div className='acrobi-showcase-item-label'>Filled</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge text='3' style='outlined' type='primary' />
            <div className='acrobi-showcase-item-label'>Outlined</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge text='3' style='minimal' type='primary' />
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

// Badge with Icons
export const BadgeIcons: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Badge with Icons
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex items-center' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Badge icon='close' type='danger' />
            <div className='acrobi-showcase-item-label'>Close</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge icon='check' type='success' />
            <div className='acrobi-showcase-item-label'>Check</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge icon='plus' type='primary' />
            <div className='acrobi-showcase-item-label'>Plus</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge icon='minus' type='warning' />
            <div className='acrobi-showcase-item-label'>Minus</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Badge Positions (would typically be shown on a parent element)
export const BadgePositions: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Badge Positions
      </h3>
      <div className='acrobi-variant-group'>
        <div
          className='grid grid-cols-4 gap-8'
          style={{ gap: 'var(--size--32px)' }}
        >
          <div className='acrobi-showcase-item'>
            <div className='relative w-16 h-16 bg-muted rounded border border-border flex items-center justify-center'>
              <Badge
                text='TL'
                color='p500'
                location='tl'
                className='absolute -top-1 -left-1'
              />
              <span className='text-xs'>Element</span>
            </div>
            <div className='acrobi-showcase-item-label'>Top Left</div>
          </div>
          <div className='acrobi-showcase-item'>
            <div className='relative w-16 h-16 bg-muted rounded border border-border flex items-center justify-center'>
              <Badge
                text='TR'
                color='p500'
                location='tr'
                className='absolute -top-1 -right-1'
              />
              <span className='text-xs'>Element</span>
            </div>
            <div className='acrobi-showcase-item-label'>Top Right</div>
          </div>
          <div className='acrobi-showcase-item'>
            <div className='relative w-16 h-16 bg-muted rounded border border-border flex items-center justify-center'>
              <Badge
                text='BL'
                color='p500'
                location='bl'
                className='absolute -bottom-1 -left-1'
              />
              <span className='text-xs'>Element</span>
            </div>
            <div className='acrobi-showcase-item-label'>Bottom Left</div>
          </div>
          <div className='acrobi-showcase-item'>
            <div className='relative w-16 h-16 bg-muted rounded border border-border flex items-center justify-center'>
              <Badge
                text='BR'
                color='p500'
                location='br'
                className='absolute -bottom-1 -right-1'
              />
              <span className='text-xs'>Element</span>
            </div>
            <div className='acrobi-showcase-item-label'>Bottom Right</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Badge Use Cases
export const BadgeUseCases: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Badge Use Cases
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-col' style={{ gap: 'var(--size--32px)' }}>
          <div className='flex items-center gap-4'>
            <div className='relative'>
              <div className='w-10 h-10 bg-muted rounded-full border border-border'></div>
              <Badge
                text='3'
                color='fd500'
                size='s'
                className='absolute -top-1 -right-1'
              />
            </div>
            <span className='text-sm'>Notification count on avatar</span>
          </div>

          <div className='flex items-center gap-4'>
            <div className='relative'>
              <button className='px-4 py-2 bg-primary text-primary-foreground rounded'>
                Messages
              </button>
              <Badge
                text='12'
                color='fd500'
                size='s'
                className='absolute -top-1 -right-1'
              />
            </div>
            <span className='text-sm'>Unread count on button</span>
          </div>

          <div className='flex items-center gap-4'>
            <div className='relative'>
              <div className='w-8 h-8 bg-muted rounded border border-border flex items-center justify-center'>
                <span className='text-xs'>📄</span>
              </div>
              <Badge
                icon='check'
                color='f500'
                size='xs'
                className='absolute -top-1 -right-1'
              />
            </div>
            <span className='text-sm'>Status indicator on file</span>
          </div>

          <div className='flex items-center gap-4'>
            <span className='text-sm'>Status</span>
            <Badge text='Online' color='f500' size='s' />
            <Badge text='Offline' color='n500' size='s' />
            <Badge text='Error' color='fd500' size='s' />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Comprehensive Badge Showcase
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
          Badge Component Showcase
        </h1>
        <p data-fs='r2' className='text-muted-foreground max-w-2xl mx-auto'>
          Comprehensive showcase of badge variants, sizes, colors, positions,
          and use cases with 32px spacing.
        </p>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Badge Sizes</h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <div className='acrobi-showcase-item'>
            <Badge size='xs' text='XS' color='p500' />
            <div className='acrobi-showcase-item-label'>XS</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge size='s' text='S' color='p500' />
            <div className='acrobi-showcase-item-label'>Small</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge size='m' text='M' color='p500' />
            <div className='acrobi-showcase-item-label'>Medium</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge size='l' text='L' color='p500' />
            <div className='acrobi-showcase-item-label'>Large</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge size='xl' text='XL' color='p500' />
            <div className='acrobi-showcase-item-label'>XL</div>
          </div>
        </div>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Badge Colors</h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <div className='acrobi-showcase-item'>
            <Badge text='3' color='fd500' />
            <div className='acrobi-showcase-item-label'>Danger</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge text='!' color='fw500' />
            <div className='acrobi-showcase-item-label'>Warning</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge text='✓' color='f500' />
            <div className='acrobi-showcase-item-label'>Focus</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge text='5' color='p500' />
            <div className='acrobi-showcase-item-label'>Primary</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge text='2' color='n500' />
            <div className='acrobi-showcase-item-label'>Neutral</div>
          </div>
        </div>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Badge with Icons</h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <div className='acrobi-showcase-item'>
            <Badge icon='close' color='fd500' />
            <div className='acrobi-showcase-item-label'>Close</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge icon='check' color='f500' />
            <div className='acrobi-showcase-item-label'>Check</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge icon='plus' color='p500' />
            <div className='acrobi-showcase-item-label'>Plus</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Badge icon='minus' color='fw500' />
            <div className='acrobi-showcase-item-label'>Minus</div>
          </div>
        </div>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Badge Use Cases</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--size--24px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <div className='flex items-center gap-4'>
            <div className='relative'>
              <div className='w-10 h-10 bg-muted rounded-full border border-border'></div>
              <Badge
                text='3'
                color='fd500'
                size='s'
                className='absolute -top-1 -right-1'
              />
            </div>
            <span className='text-sm'>Notification count on avatar</span>
          </div>

          <div className='flex items-center gap-4'>
            <div className='relative'>
              <button className='px-4 py-2 bg-primary text-primary-foreground rounded'>
                Messages
              </button>
              <Badge
                text='12'
                color='fd500'
                size='s'
                className='absolute -top-1 -right-1'
              />
            </div>
            <span className='text-sm'>Unread count on button</span>
          </div>

          <div className='flex items-center gap-4'>
            <span className='text-sm'>Status indicators:</span>
            <Badge text='Online' color='f500' size='s' />
            <Badge text='Error' color='fd500' size='s' />
            <Badge text='Warning' color='fw500' size='s' />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
