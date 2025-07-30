import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon';

const meta: Meta<typeof Icon> = {
  title: 'Primitives/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Icon component using the BQ-Icons font system. Renders scalable icons with consistent sizing and theming support.',
      },
    },
  },
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Icon name from BQ-Icons font',
    },
    size: {
      control: { type: 'select' },
      options: ['xxs', 'xs', 's', 'sm', 'm', 'ml', 'l', 'xl', '2xl'],
    },
    color: {
      control: { type: 'select' },
      options: [
        'inherit',
        'n000',
        'n100',
        'n200',
        'n300',
        'n500',
        'n700',
        'n900',
        'n999',
        'p500',
        'fd500',
        'fw500',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'default',
    size: 'xl',
    color: 'inherit',
  },
};

export const IconSizes: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Icon Sizes
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex items-center' style={{ gap: 'var(--size--32px)' }}>
          <div className='flex flex-col items-center gap-1'>
            <Icon name='default' size='xxs' />
            <span className='text-xs'>XXS</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Icon name='default' size='xs' />
            <span className='text-xs'>XS</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Icon name='default' size='s' />
            <span className='text-xs'>S</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Icon name='default' size='sm' />
            <span className='text-xs'>SM</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Icon name='default' size='m' />
            <span className='text-xs'>M</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Icon name='default' size='ml' />
            <span className='text-xs'>ML</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Icon name='default' size='l' />
            <span className='text-xs'>L</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Icon name='default' size='xl' />
            <span className='text-xs'>XL</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Icon name='default' size='2xl' />
            <span className='text-xs'>2XL</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const IconNames: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Available Icons
      </h3>
      <div className='acrobi-variant-group'>
        <div className='grid grid-cols-4' style={{ gap: 'var(--size--32px)' }}>
          <div className='flex flex-col items-center gap-2 p-3 border border-border rounded'>
            <Icon name='default' size='l' />
            <span className='text-xs'>default</span>
          </div>
          <div className='flex flex-col items-center gap-2 p-3 border border-border rounded'>
            <Icon name='close' size='l' />
            <span className='text-xs'>close</span>
          </div>
          <div className='flex flex-col items-center gap-2 p-3 border border-border rounded'>
            <Icon name='check' size='l' />
            <span className='text-xs'>check</span>
          </div>
          <div className='flex flex-col items-center gap-2 p-3 border border-border rounded'>
            <Icon name='arrow' size='l' />
            <span className='text-xs'>arrow</span>
          </div>
          <div className='flex flex-col items-center gap-2 p-3 border border-border rounded'>
            <Icon name='plus' size='l' />
            <span className='text-xs'>plus</span>
          </div>
          <div className='flex flex-col items-center gap-2 p-3 border border-border rounded'>
            <Icon name='minus' size='l' />
            <span className='text-xs'>minus</span>
          </div>
          <div className='flex flex-col items-center gap-2 p-3 border border-border rounded'>
            <Icon name='search' size='l' />
            <span className='text-xs'>search</span>
          </div>
          <div className='flex flex-col items-center gap-2 p-3 border border-border rounded'>
            <Icon name='menu' size='l' />
            <span className='text-xs'>menu</span>
          </div>
          <div className='flex flex-col items-center gap-2 p-3 border border-border rounded'>
            <Icon name='home' size='l' />
            <span className='text-xs'>home</span>
          </div>
          <div className='flex flex-col items-center gap-2 p-3 border border-border rounded'>
            <Icon name='user' size='l' />
            <span className='text-xs'>user</span>
          </div>
          <div className='flex flex-col items-center gap-2 p-3 border border-border rounded'>
            <Icon name='settings' size='l' />
            <span className='text-xs'>settings</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Color Variants
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-wrap' style={{ gap: 'var(--size--32px)' }}>
          <div className='flex flex-col items-center gap-1'>
            <Icon name='default' size='l' color='inherit' />
            <span className='text-xs'>inherit</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Icon name='default' size='l' color='p500' />
            <span className='text-xs'>primary</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Icon name='default' size='l' color='fd500' />
            <span className='text-xs'>danger</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Icon name='default' size='l' color='fw500' />
            <span className='text-xs'>warning</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Icon name='default' size='l' color='f500' />
            <span className='text-xs'>focus</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Icon name='default' size='l' color='n500' />
            <span className='text-xs'>neutral</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Icons in Context
      </h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--size--32px)',
        }}
      >
        {/* In text */}
        <p className='text-base'>
          This is text with an inline icon{' '}
          <Icon name='default' size='sm' color='p500' /> in the middle.
        </p>

        {/* In buttons */}
        <div className='flex gap-2'>
          <button className='btn' data-btn-style='pf' data-btn-size='m'>
            <Icon name='plus' size='sm' color='inherit' />
            <span className='ml-2'>Add Item</span>
          </button>
          <button className='btn' data-btn-style='df' data-btn-size='m'>
            <Icon name='close' size='sm' color='inherit' />
            <span className='ml-2'>Delete</span>
          </button>
        </div>

        {/* In cards */}
        <div className='card p-4'>
          <div className='flex items-center gap-2 mb-2'>
            <Icon name='check' size='m' color='p500' />
            <span className='font-medium'>Task Completed</span>
          </div>
          <p className='text-sm text-muted-foreground'>
            This task has been successfully completed.
          </p>
        </div>

        {/* In navigation */}
        <nav className='flex gap-4'>
          <a
            href='#'
            className='flex items-center gap-2 text-primary hover:text-primary/80'
          >
            <Icon name='home' size='sm' />
            <span>Home</span>
          </a>
          <a
            href='#'
            className='flex items-center gap-2 text-primary hover:text-primary/80'
          >
            <Icon name='user' size='sm' />
            <span>Profile</span>
          </a>
          <a
            href='#'
            className='flex items-center gap-2 text-primary hover:text-primary/80'
          >
            <Icon name='settings' size='sm' />
            <span>Settings</span>
          </a>
        </nav>
      </div>
    </div>
  ),
};
