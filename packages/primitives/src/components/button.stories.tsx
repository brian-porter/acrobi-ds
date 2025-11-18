import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button component with Acrobi Design System styling. Uses separate `type` (Filled, Line, Text) and `styling` (Prime, Neutral, Focus, Danger, Warn) properties for maximum flexibility. Available sizes: xs (24px), sm (32px), md (36px), lg (48px), dy (dynamic - auto height, grows with content, normally has top icon). Features SF Pro Display typography and authentic color tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['filled', 'line', 'text'],
      description: 'Button type (Filled, Line, Text)',
    },
    styling: {
      control: { type: 'select' },
      options: ['prime', 'neutral', 'focus', 'danger', 'warn'],
      description: 'Button style (Prime, Neutral, Focus, Danger, Warn)',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'dy'],
      description:
        'Button size (xs=24px, sm=32px, md=36px, lg=48px, dy=dynamic)',
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['Left', 'Right', 'Top', 'Bottom'],
      description: 'Icon position relative to text',
    },
    icon: {
      control: { type: 'text' },
      description: 'Icon name from BQ-Icons font',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'filled',
    styling: 'prime',
    children: 'Button',
  },
};

export const PrimeFilled: Story = {
  args: {
    type: 'filled',
    styling: 'prime',
    children: 'Prime Filled',
  },
};

export const PrimeLine: Story = {
  args: {
    type: 'line',
    styling: 'prime',
    children: 'Prime Line',
  },
};

export const PrimeText: Story = {
  args: {
    type: 'text',
    styling: 'prime',
    children: 'Prime Text',
  },
};

export const NeutralFilled: Story = {
  args: {
    type: 'filled',
    styling: 'neutral',
    children: 'Neutral Filled',
  },
};

export const DangerFilled: Story = {
  args: {
    type: 'filled',
    styling: 'danger',
    children: 'Danger Filled',
  },
};

// Button with BQ-Icons showcase
export const ButtonWithBQIcons: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Buttons with BQ-Icons
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-wrap' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Left'
            >
              Home
            </Button>
            <div className='acrobi-showcase-item-label'>home</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Left'
            >
              Search
            </Button>
            <div className='acrobi-showcase-item-label'>search</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Left'
            >
              Settings
            </Button>
            <div className='acrobi-showcase-item-label'>settings</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Left'
            >
              Profile
            </Button>
            <div className='acrobi-showcase-item-label'>user</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Left'
            >
              Add
            </Button>
            <div className='acrobi-showcase-item-label'>plus</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='danger'
              icon='default'
              iconPosition='Left'
            >
              Delete
            </Button>
            <div className='acrobi-showcase-item-label'>close</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='focus'
              icon='default'
              iconPosition='Left'
            >
              Confirm
            </Button>
            <div className='acrobi-showcase-item-label'>check</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Right'
            >
              Next
            </Button>
            <div className='acrobi-showcase-item-label'>arrow</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Dynamic: Story = {
  args: {
    size: 'dy',
    icon: 'default',
    iconPosition: 'Top',
    children: 'Dynamic Button',
  },
};

export const Medium: Story = {
  args: {
    type: 'filled',
    styling: 'prime',
    size: 'md',
    children: 'Medium Button',
  },
};

export const Icon: Story = {
  args: {
    type: 'filled',
    styling: 'prime',
    size: 'md',
    icon: 'default',
    children: 'With Icon',
  },
};

export const IconBottom: Story = {
  args: {
    type: 'filled',
    styling: 'prime',
    size: 'md',
    icon: 'default',
    iconPosition: 'Bottom',
    children: 'Bottom Icon',
  },
};

// Button Types (Filled, Line, Text) with 32px spacing
export const ButtonTypes: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Button Types
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-wrap' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Button type='filled' styling='prime'>
              BtnFill
            </Button>
            <div className='acrobi-showcase-item-label'>Filled</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button type='line' styling='prime'>
              BtnLine
            </Button>
            <div className='acrobi-showcase-item-label'>Line</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button type='text' styling='prime'>
              BtnTxt
            </Button>
            <div className='acrobi-showcase-item-label'>Text</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Button Styles (Prime, Neutral, Focus, Danger, Warn) with 32px spacing
export const ButtonStyles: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Button Styles
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-wrap' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Button type='filled' styling='prime'>
              Prime
            </Button>
            <div className='acrobi-showcase-item-label'>Prime</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button type='filled' styling='neutral'>
              Neutral
            </Button>
            <div className='acrobi-showcase-item-label'>Neutral</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button type='filled' styling='focus'>
              Focus
            </Button>
            <div className='acrobi-showcase-item-label'>Focus</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button type='filled' styling='danger'>
              Danger
            </Button>
            <div className='acrobi-showcase-item-label'>Danger</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button type='filled' styling='warn'>
              Warn
            </Button>
            <div className='acrobi-showcase-item-label'>Warn</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Complete Type × Style Matrix
export const ButtonMatrix: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Complete Button Matrix (Type × Style)
      </h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--size--24px)',
        }}
      >
        {/* Prime Style Row */}
        <div>
          <h4
            data-fs='h5'
            className='text-foreground'
            style={{ marginBottom: 'var(--size--12px)' }}
          >
            Prime Style
          </h4>
          <div className='flex flex-wrap' style={{ gap: 'var(--size--32px)' }}>
            <div className='acrobi-showcase-item'>
              <Button type='filled' styling='prime'>
                Prime Filled
              </Button>
              <div className='acrobi-showcase-item-label'>Filled</div>
            </div>
            <div className='acrobi-showcase-item'>
              <Button type='line' styling='prime'>
                Prime Line
              </Button>
              <div className='acrobi-showcase-item-label'>Line</div>
            </div>
            <div className='acrobi-showcase-item'>
              <Button type='text' styling='prime'>
                Prime Text
              </Button>
              <div className='acrobi-showcase-item-label'>Text</div>
            </div>
          </div>
        </div>

        {/* Neutral Style Row */}
        <div>
          <h4
            data-fs='h5'
            className='text-foreground'
            style={{ marginBottom: 'var(--size--12px)' }}
          >
            Neutral Style
          </h4>
          <div className='flex flex-wrap' style={{ gap: 'var(--size--32px)' }}>
            <div className='acrobi-showcase-item'>
              <Button type='filled' styling='neutral'>
                Neutral Filled
              </Button>
              <div className='acrobi-showcase-item-label'>Filled</div>
            </div>
            <div className='acrobi-showcase-item'>
              <Button type='line' styling='neutral'>
                Neutral Line
              </Button>
              <div className='acrobi-showcase-item-label'>Line</div>
            </div>
            <div className='acrobi-showcase-item'>
              <Button type='text' styling='neutral'>
                Neutral Text
              </Button>
              <div className='acrobi-showcase-item-label'>Text</div>
            </div>
          </div>
        </div>

        {/* Focus Style Row */}
        <div>
          <h4
            data-fs='h5'
            className='text-foreground'
            style={{ marginBottom: 'var(--size--12px)' }}
          >
            Focus Style
          </h4>
          <div className='flex flex-wrap' style={{ gap: 'var(--size--32px)' }}>
            <div className='acrobi-showcase-item'>
              <Button type='filled' styling='focus'>
                Focus Filled
              </Button>
              <div className='acrobi-showcase-item-label'>Filled</div>
            </div>
            <div className='acrobi-showcase-item'>
              <Button type='line' styling='focus'>
                Focus Line
              </Button>
              <div className='acrobi-showcase-item-label'>Line</div>
            </div>
            <div className='acrobi-showcase-item'>
              <Button type='text' styling='focus'>
                Focus Text
              </Button>
              <div className='acrobi-showcase-item-label'>Text</div>
            </div>
          </div>
        </div>

        {/* Danger Style Row */}
        <div>
          <h4
            data-fs='h5'
            className='text-foreground'
            style={{ marginBottom: 'var(--size--12px)' }}
          >
            Danger Style
          </h4>
          <div className='flex flex-wrap' style={{ gap: 'var(--size--32px)' }}>
            <div className='acrobi-showcase-item'>
              <Button type='filled' styling='danger'>
                Danger Filled
              </Button>
              <div className='acrobi-showcase-item-label'>Filled</div>
            </div>
            <div className='acrobi-showcase-item'>
              <Button type='line' styling='danger'>
                Danger Line
              </Button>
              <div className='acrobi-showcase-item-label'>Line</div>
            </div>
            <div className='acrobi-showcase-item'>
              <Button type='text' styling='danger'>
                Danger Text
              </Button>
              <div className='acrobi-showcase-item-label'>Text</div>
            </div>
          </div>
        </div>

        {/* Warn Style Row */}
        <div>
          <h4
            data-fs='h5'
            className='text-foreground'
            style={{ marginBottom: 'var(--size--12px)' }}
          >
            Warn Style
          </h4>
          <div className='flex flex-wrap' style={{ gap: 'var(--size--32px)' }}>
            <div className='acrobi-showcase-item'>
              <Button type='filled' styling='warn'>
                Warn Filled
              </Button>
              <div className='acrobi-showcase-item-label'>Filled</div>
            </div>
            <div className='acrobi-showcase-item'>
              <Button type='line' styling='warn'>
                Warn Line
              </Button>
              <div className='acrobi-showcase-item-label'>Line</div>
            </div>
            <div className='acrobi-showcase-item'>
              <Button type='text' styling='warn'>
                Warn Text
              </Button>
              <div className='acrobi-showcase-item-label'>Text</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Button Sizes with 32px spacing
export const ButtonSizes: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Button Sizes
      </h3>
      <div className='acrobi-variant-group'>
        <div
          className='flex flex-wrap items-center'
          style={{ gap: 'var(--size--32px)' }}
        >
          <div className='acrobi-showcase-item'>
            <Button size='xs'>Extra Small</Button>
            <div className='acrobi-showcase-item-label'>XS (24px)</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button size='sm'>Small</Button>
            <div className='acrobi-showcase-item-label'>SM (32px)</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button size='md'>Medium</Button>
            <div className='acrobi-showcase-item-label'>MD (36px)</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button size='lg'>Large</Button>
            <div className='acrobi-showcase-item-label'>LG (48px)</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button size='dy'>Dynamic</Button>
            <div className='acrobi-showcase-item-label'>DY (Auto)</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Button States with 32px spacing
export const ButtonStates: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Button States
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-wrap' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Button>Normal</Button>
            <div className='acrobi-showcase-item-label'>Normal</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button disabled>Disabled</Button>
            <div className='acrobi-showcase-item-label'>Disabled</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button className='hover:bg-primary/90'>Hover State</Button>
            <div className='acrobi-showcase-item-label'>Hover</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button className='focus:ring-2 focus:ring-ring'>
              Focus State
            </Button>
            <div className='acrobi-showcase-item-label'>Focus</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Button Icon Positions (Left, Right, Top, Bottom)
export const ButtonIconPositions: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Button Icon Positions
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-wrap' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Left'
            >
              Left Icon
            </Button>
            <div className='acrobi-showcase-item-label'>Left</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Right'
            >
              Right Icon
            </Button>
            <div className='acrobi-showcase-item-label'>Right</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Top'
            >
              Top Icon
            </Button>
            <div className='acrobi-showcase-item-label'>Top</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Bottom'
            >
              Bottom Icon
            </Button>
            <div className='acrobi-showcase-item-label'>Bottom</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Button with Text and Icons (based on Webflow properties)
export const ButtonWithContent: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Button Content Variations
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-wrap' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Button type='filled' styling='prime'>
              Text Only
            </Button>
            <div className='acrobi-showcase-item-label'>Text Only</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Left'
            >
              With Icon
            </Button>
            <div className='acrobi-showcase-item-label'>Icon + Text</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              size='sm'
              icon='default'
            ></Button>
            <div className='acrobi-showcase-item-label'>Icon Only</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Right'
            >
              Save
            </Button>
            <div className='acrobi-showcase-item-label'>Text + Icon</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Comprehensive Button Showcase
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
          Button Component Showcase
        </h1>
        <p data-fs='r2' className='text-muted-foreground max-w-2xl mx-auto'>
          Comprehensive showcase of button variants, sizes, states, and content
          variations with 32px spacing.
        </p>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Button Types</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <div className='acrobi-showcase-item'>
            <Button type='filled' styling='prime'>
              BtnFill
            </Button>
            <div className='acrobi-showcase-item-label'>Filled</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button type='line' styling='prime'>
              BtnLine
            </Button>
            <div className='acrobi-showcase-item-label'>Line</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button type='text' styling='prime'>
              BtnTxt
            </Button>
            <div className='acrobi-showcase-item-label'>Text</div>
          </div>
        </div>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Button Styles</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <div className='acrobi-showcase-item'>
            <Button type='filled' styling='prime'>
              Prime
            </Button>
            <div className='acrobi-showcase-item-label'>Prime</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button type='filled' styling='neutral'>
              Neutral
            </Button>
            <div className='acrobi-showcase-item-label'>Neutral</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button type='filled' styling='focus'>
              Focus
            </Button>
            <div className='acrobi-showcase-item-label'>Focus</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button type='filled' styling='danger'>
              Danger
            </Button>
            <div className='acrobi-showcase-item-label'>Danger</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button type='filled' styling='warn'>
              Warn
            </Button>
            <div className='acrobi-showcase-item-label'>Warn</div>
          </div>
        </div>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Button Sizes</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <div className='acrobi-showcase-item'>
            <Button size='xs'>Extra Small</Button>
            <div className='acrobi-showcase-item-label'>XS</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button size='sm'>Small</Button>
            <div className='acrobi-showcase-item-label'>Small</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button size='md'>Medium</Button>
            <div className='acrobi-showcase-item-label'>MD (36px)</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button size='lg'>Large</Button>
            <div className='acrobi-showcase-item-label'>Large</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button size='dy'>Dynamic</Button>
            <div className='acrobi-showcase-item-label'>DY (Auto)</div>
          </div>
        </div>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Button States</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <div className='acrobi-showcase-item'>
            <Button>Normal</Button>
            <div className='acrobi-showcase-item-label'>Normal</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button disabled>Disabled</Button>
            <div className='acrobi-showcase-item-label'>Disabled</div>
          </div>
        </div>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Icon Positions</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Left'
            >
              Left Icon
            </Button>
            <div className='acrobi-showcase-item-label'>Left</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Right'
            >
              Right Icon
            </Button>
            <div className='acrobi-showcase-item-label'>Right</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Top'
            >
              Top Icon
            </Button>
            <div className='acrobi-showcase-item-label'>Top</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Bottom'
            >
              Bottom Icon
            </Button>
            <div className='acrobi-showcase-item-label'>Bottom</div>
          </div>
        </div>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Content Variations</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <div className='acrobi-showcase-item'>
            <Button type='filled' styling='prime'>
              Text Only
            </Button>
            <div className='acrobi-showcase-item-label'>Text Only</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Left'
            >
              With Icon
            </Button>
            <div className='acrobi-showcase-item-label'>Icon + Text</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              size='sm'
              icon='default'
            ></Button>
            <div className='acrobi-showcase-item-label'>Icon Only</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Button
              type='filled'
              styling='prime'
              icon='default'
              iconPosition='Right'
            >
              Save
            </Button>
            <div className='acrobi-showcase-item-label'>Text + Icon</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
