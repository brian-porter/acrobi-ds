import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';

const meta: Meta<typeof Label> = {
  title: 'Primitives/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Label component using Acrobi design system styling with SF Pro Display typography and BQ-Icons font support.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [
        'inherit',
        'r4',
        'r4b',
        'r3',
        'r3b',
        'r2',
        'r2b',
        'r1',
        'r1b',
        'h5',
        'h5b',
        'h4',
        'h4b',
        'h3',
        'h3b',
        'h2',
        'h2b',
        'h1',
        'h1b',
      ],
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
    iconPosition: {
      control: { type: 'select' },
      options: ['Left', 'Right', 'Top', 'Bottom'],
    },
    gap: {
      control: { type: 'select' },
      options: ['4', '8', '16'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label Text',
    size: 'r2',
    color: 'inherit',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Label with Icon',
    icon: 'default',
    size: 'r2',
    color: 'inherit',
    iconPosition: 'Left',
  },
};

export const LabelSizes: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Label Sizes
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-col' style={{ gap: 'var(--size--32px)' }}>
          <Label size='r4' icon='default'>
            R4 - Regular
          </Label>
          <Label size='r4b' icon='default'>
            R4B - Regular Bold
          </Label>
          <Label size='r3' icon='default'>
            R3 - Regular
          </Label>
          <Label size='r3b' icon='default'>
            R3B - Regular Bold
          </Label>
          <Label size='r2' icon='default'>
            R2 - Regular
          </Label>
          <Label size='r2b' icon='default'>
            R2B - Regular Bold
          </Label>
          <Label size='r1' icon='default'>
            R1 - Regular
          </Label>
          <Label size='r1b' icon='default'>
            R1B - Regular Bold
          </Label>
          <Label size='h5' icon='default'>
            H5 - Heading
          </Label>
          <Label size='h5b' icon='default'>
            H5B - Heading Bold
          </Label>
          <Label size='h4' icon='default'>
            H4 - Heading
          </Label>
          <Label size='h4b' icon='default'>
            H4B - Heading Bold
          </Label>
          <Label size='h3' icon='default'>
            H3 - Heading
          </Label>
          <Label size='h3b' icon='default'>
            H3B - Heading Bold
          </Label>
          <Label size='h2' icon='default'>
            H2 - Heading
          </Label>
          <Label size='h2b' icon='default'>
            H2B - Heading Bold
          </Label>
          <Label size='h1' icon='default'>
            H1 - Heading
          </Label>
          <Label size='h1b' icon='default'>
            H1B - Heading Bold
          </Label>
        </div>
      </div>
    </div>
  ),
};

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
        <div className='flex flex-wrap' style={{ gap: 'var(--size--32px)' }}>
          <Label icon='default' iconPosition='Left'>
            Left Icon
          </Label>
          <Label icon='default' iconPosition='Right'>
            Right Icon
          </Label>
          <Label icon='default' iconPosition='Top'>
            Top Icon
          </Label>
          <Label icon='default' iconPosition='Bottom'>
            Bottom Icon
          </Label>
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
          <Label color='inherit' icon='default'>
            Inherit
          </Label>
          <Label color='p500' icon='default'>
            Primary
          </Label>
          <Label color='fd500' icon='default'>
            Danger
          </Label>
          <Label color='fw500' icon='default'>
            Warning
          </Label>
          <Label color='f500' icon='default'>
            Focus
          </Label>
          <Label color='n500' icon='default'>
            Neutral
          </Label>
        </div>
      </div>
    </div>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Gap Variants
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-col' style={{ gap: 'var(--size--32px)' }}>
          <Label icon='default' gap='4'>
            Gap 4px
          </Label>
          <Label icon='default' gap='8'>
            Gap 8px (default)
          </Label>
          <Label icon='default' gap='16'>
            Gap 16px
          </Label>
        </div>
      </div>
    </div>
  ),
};

export const FormLabel: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Form Labels
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-col' style={{ gap: 'var(--size--32px)' }}>
          <Label htmlFor='email' size='r3' color='n700'>
            Email Address
          </Label>
          <input
            id='email'
            type='email'
            className='input'
            placeholder='Enter your email'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <Label
            htmlFor='password'
            size='r3'
            color='n700'
            icon='default'
            iconPosition='Left'
          >
            Password
          </Label>
          <input
            id='password'
            type='password'
            className='input'
            placeholder='Enter your password'
          />
        </div>
      </div>
    </div>
  ),
};

export const NestedInComponents: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Nested in Other Components
      </h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--size--32px)',
        }}
      >
        {/* Card with label */}
        <div className='card p-4'>
          <Label
            size='h4'
            color='p500'
            icon='default'
            iconPosition='Left'
            className='mb-2'
          >
            Card Title
          </Label>
          <Label size='r3' color='n700'>
            This is a card with nested labels showing how they can be composed.
          </Label>
        </div>

        {/* Custom button-like component */}
        <div
          className='btn'
          style={{
            background: 'var(--color--p500)',
            color: 'var(--color--n000)',
          }}
        >
          <Label size='r2' color='inherit' icon='check' iconPosition='Left'>
            Custom Component
          </Label>
        </div>

        {/* List item */}
        <div className='flex items-center p-3 border border-border rounded'>
          <Label
            size='r2'
            icon='default'
            iconPosition='Left'
            className='flex-1'
          >
            List Item with Label
          </Label>
          <Label size='r4' color='n500'>
            Status
          </Label>
        </div>
      </div>
    </div>
  ),
};
