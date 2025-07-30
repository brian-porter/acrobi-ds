import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Avatar component with Acrobi Design System styling. Supports various sizes, shapes, shadows, badges, and states. Features authentic image loading with fallback support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
      description: 'Avatar size using Acrobi sizing system',
    },
    shape: {
      control: { type: 'select' },
      options: ['c', 'r', 's'],
      description: 'Avatar shape (Circle, Rounded, Square)',
    },
    shadow: {
      control: { type: 'select' },
      options: ['n', 'xs', 's', 'm', 'l', 'xl'],
      description: 'Avatar drop shadow',
    },
    src: {
      control: { type: 'text' },
      description: 'Avatar image source URL',
    },
    alt: {
      control: { type: 'text' },
      description: 'Avatar image alt text',
    },
    badge: {
      control: { type: 'boolean' },
      description: 'Show badge overlay',
    },
    badgeText: {
      control: { type: 'text' },
      description: 'Badge text content',
    },
    badgeColor: {
      control: { type: 'select' },
      options: ['fd500', 'fw500', 'f500', 'p500', 'n500'],
      description: 'Badge color',
    },
    badgeLocation: {
      control: { type: 'select' },
      options: ['tl', 'tr', 'bl', 'br'],
      description: 'Badge position',
    },
    online: {
      control: { type: 'boolean' },
      description: 'Show online/active state',
    },
    group: {
      control: { type: 'boolean' },
      description: 'Enable group overlap styling',
    },
    link: {
      control: { type: 'boolean' },
      description: 'Enable link styling',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    alt: 'Avatar',
    size: 'm',
    shape: 'c',
  },
};

export const WithBadge: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108755-2616b6e5c07a?w=64&h=64&fit=crop&crop=face',
    alt: 'Avatar with badge',
    size: 'l',
    badge: true,
    badgeText: '3',
    badgeColor: 'fd500',
    badgeLocation: 'br',
  },
};

export const OnlineStatus: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    alt: 'Online user',
    size: 'l',
    online: true,
    badge: true,
    badgeColor: 'f500',
    badgeLocation: 'br',
  },
};

// Avatar Sizes with 32px spacing
export const AvatarSizes: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Avatar Sizes
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex items-center' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='xs'
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face'
              alt='Extra Small'
            />
            <div className='acrobi-showcase-item-label'>XS</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='s'
              src='https://images.unsplash.com/photo-1494790108755-2616b6e5c07a?w=32&h=32&fit=crop&crop=face'
              alt='Small'
            />
            <div className='acrobi-showcase-item-label'>Small</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='m'
              src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
              alt='Medium'
            />
            <div className='acrobi-showcase-item-label'>Medium</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              src='https://images.unsplash.com/photo-1517841905240-472988babdf9?w=48&h=48&fit=crop&crop=face'
              alt='Large'
            />
            <div className='acrobi-showcase-item-label'>Large</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='xl'
              src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
              alt='Extra Large'
            />
            <div className='acrobi-showcase-item-label'>XL</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='xxl'
              src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face'
              alt='Extra Extra Large'
            />
            <div className='acrobi-showcase-item-label'>XXL</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Avatar Shapes with 32px spacing
export const AvatarShapes: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Avatar Shapes
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex items-center' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              shape='c'
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'
              alt='Circle'
            />
            <div className='acrobi-showcase-item-label'>Circle</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              shape='r'
              src='https://images.unsplash.com/photo-1494790108755-2616b6e5c07a?w=48&h=48&fit=crop&crop=face'
              alt='Rounded'
            />
            <div className='acrobi-showcase-item-label'>Rounded</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              shape='s'
              src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face'
              alt='Square'
            />
            <div className='acrobi-showcase-item-label'>Square</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Avatar Shadows with 32px spacing
export const AvatarShadows: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Avatar Shadows
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex items-center' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              shadow='n'
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'
              alt='No shadow'
            />
            <div className='acrobi-showcase-item-label'>None</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              shadow='s'
              src='https://images.unsplash.com/photo-1494790108755-2616b6e5c07a?w=48&h=48&fit=crop&crop=face'
              alt='Small shadow'
            />
            <div className='acrobi-showcase-item-label'>Small</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              shadow='m'
              src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face'
              alt='Medium shadow'
            />
            <div className='acrobi-showcase-item-label'>Medium</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              shadow='l'
              src='https://images.unsplash.com/photo-1517841905240-472988babdf9?w=48&h=48&fit=crop&crop=face'
              alt='Large shadow'
            />
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

// Avatar with Badges
export const AvatarBadges: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Avatar Badges
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex items-center' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'
              alt='Notification badge'
              badge={true}
              badgeText='3'
              badgeColor='fd500'
              badgeLocation='br'
            />
            <div className='acrobi-showcase-item-label'>Notification</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              src='https://images.unsplash.com/photo-1494790108755-2616b6e5c07a?w=48&h=48&fit=crop&crop=face'
              alt='Online status'
              badge={true}
              badgeColor='f500'
              badgeLocation='br'
              online={true}
            />
            <div className='acrobi-showcase-item-label'>Online</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face'
              alt='Warning badge'
              badge={true}
              badgeText='!'
              badgeColor='fw500'
              badgeLocation='tr'
            />
            <div className='acrobi-showcase-item-label'>Warning</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              src='https://images.unsplash.com/photo-1517841905240-472988babdf9?w=48&h=48&fit=crop&crop=face'
              alt='Primary badge'
              badge={true}
              badgeText='99+'
              badgeColor='p500'
              badgeLocation='tl'
            />
            <div className='acrobi-showcase-item-label'>Primary</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Avatar States
export const AvatarStates: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Avatar States
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex items-center' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'
              alt='Normal state'
            />
            <div className='acrobi-showcase-item-label'>Normal</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              src='https://images.unsplash.com/photo-1494790108755-2616b6e5c07a?w=48&h=48&fit=crop&crop=face'
              alt='Online state'
              online={true}
              badge={true}
              badgeColor='f500'
              badgeLocation='br'
            />
            <div className='acrobi-showcase-item-label'>Online</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face'
              alt='Link state'
              link={true}
            />
            <div className='acrobi-showcase-item-label'>Link</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              src='https://images.unsplash.com/photo-1517841905240-472988babdf9?w=48&h=48&fit=crop&crop=face'
              alt='Group state'
              group={true}
            />
            <div className='acrobi-showcase-item-label'>Group</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Avatar Group Example
export const AvatarGroup: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Avatar Group
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex -space-x-2'>
          <Avatar
            size='m'
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
            alt='User 1'
            group={true}
            className='border-2 border-background'
          />
          <Avatar
            size='m'
            src='https://images.unsplash.com/photo-1494790108755-2616b6e5c07a?w=40&h=40&fit=crop&crop=face'
            alt='User 2'
            group={true}
            className='border-2 border-background'
          />
          <Avatar
            size='m'
            src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
            alt='User 3'
            group={true}
            className='border-2 border-background'
          />
          <Avatar
            size='m'
            src='https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face'
            alt='User 4'
            group={true}
            className='border-2 border-background'
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Comprehensive Avatar Showcase
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
          Avatar Component Showcase
        </h1>
        <p data-fs='r2' className='text-muted-foreground max-w-2xl mx-auto'>
          Comprehensive showcase of avatar variants, sizes, shapes, shadows,
          badges, and states with 32px spacing.
        </p>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Avatar Sizes</h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <div className='acrobi-showcase-item'>
            <Avatar
              size='xs'
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face'
              alt='XS'
            />
            <div className='acrobi-showcase-item-label'>XS</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='s'
              src='https://images.unsplash.com/photo-1494790108755-2616b6e5c07a?w=32&h=32&fit=crop&crop=face'
              alt='Small'
            />
            <div className='acrobi-showcase-item-label'>Small</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='m'
              src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
              alt='Medium'
            />
            <div className='acrobi-showcase-item-label'>Medium</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              src='https://images.unsplash.com/photo-1517841905240-472988babdf9?w=48&h=48&fit=crop&crop=face'
              alt='Large'
            />
            <div className='acrobi-showcase-item-label'>Large</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='xl'
              src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
              alt='XL'
            />
            <div className='acrobi-showcase-item-label'>XL</div>
          </div>
        </div>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Avatar Shapes</h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              shape='c'
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'
              alt='Circle'
            />
            <div className='acrobi-showcase-item-label'>Circle</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              shape='r'
              src='https://images.unsplash.com/photo-1494790108755-2616b6e5c07a?w=48&h=48&fit=crop&crop=face'
              alt='Rounded'
            />
            <div className='acrobi-showcase-item-label'>Rounded</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              shape='s'
              src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face'
              alt='Square'
            />
            <div className='acrobi-showcase-item-label'>Square</div>
          </div>
        </div>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Avatar with Badges</h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'
              alt='Notification'
              badge={true}
              badgeText='3'
              badgeColor='fd500'
              badgeLocation='br'
            />
            <div className='acrobi-showcase-item-label'>Notification</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              src='https://images.unsplash.com/photo-1494790108755-2616b6e5c07a?w=48&h=48&fit=crop&crop=face'
              alt='Online'
              badge={true}
              badgeColor='f500'
              badgeLocation='br'
              online={true}
            />
            <div className='acrobi-showcase-item-label'>Online</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Avatar
              size='l'
              src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face'
              alt='Warning'
              badge={true}
              badgeText='!'
              badgeColor='fw500'
              badgeLocation='tr'
            />
            <div className='acrobi-showcase-item-label'>Warning</div>
          </div>
        </div>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Avatar Group</h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <div className='flex -space-x-2'>
            <Avatar
              size='m'
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
              alt='User 1'
              group={true}
              className='border-2 border-background'
            />
            <Avatar
              size='m'
              src='https://images.unsplash.com/photo-1494790108755-2616b6e5c07a?w=40&h=40&fit=crop&crop=face'
              alt='User 2'
              group={true}
              className='border-2 border-background'
            />
            <Avatar
              size='m'
              src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
              alt='User 3'
              group={true}
              className='border-2 border-background'
            />
            <Avatar
              size='m'
              src='https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face'
              alt='User 4'
              group={true}
              className='border-2 border-background'
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
