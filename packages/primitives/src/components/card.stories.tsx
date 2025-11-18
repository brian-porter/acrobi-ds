import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card';
import { Button } from './button';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card component with Acrobi Design System styling, using SF Pro Display typography and authentic design tokens. Supports multiple styles, sizes, and interactive states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    styling: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined', 'filled'],
      description: 'Card visual style',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Card size',
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'default', 'lg', 'full'],
      description: 'Border radius',
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'default', 'md', 'lg'],
      description: 'Box shadow',
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Interactive hover state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
  },
  decorators: [
    Story => (
      <div className='w-96'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    styling: 'default',
    size: 'default',
    radius: 'default',
    shadow: 'default',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>
            This is a description of the card content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content area of the card.</p>
        </CardContent>
      </>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Project Setup</CardTitle>
          <CardDescription>
            Configure your project settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Choose your project configuration options below.</p>
        </CardContent>
        <CardFooter className='justify-between'>
          <Button type='line' styling='neutral' size='sm'>
            Cancel
          </Button>
          <Button type='filled' styling='prime' size='sm'>
            Save Changes
          </Button>
        </CardFooter>
      </>
    ),
  },
};

export const Simple: Story = {
  args: {
    children: (
      <CardContent>
        <p>A simple card with just content.</p>
      </CardContent>
    ),
  },
};

export const HeaderOnly: Story = {
  args: {
    children: (
      <CardHeader>
        <CardTitle>Notification</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
    ),
  },
};

export const FullCard: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Complete Example</CardTitle>
          <CardDescription>
            This card shows all available sections working together.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <h4 data-fs='r3b' className='text-foreground'>
                Features
              </h4>
              <ul
                data-fs='r3'
                className='text-muted-foreground list-disc list-inside mt-1'
              >
                <li>Header with title and description</li>
                <li>Content area for main information</li>
                <li>Footer for actions</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex-col items-start space-y-2'>
          <div className='flex w-full justify-between'>
            <Button type='line' styling='neutral' size='xs'>
              Learn More
            </Button>
            <Button type='filled' styling='prime' size='xs'>
              Get Started
            </Button>
          </div>
          <p data-fs='r4' className='text-muted-foreground'>
            Updated 2 hours ago
          </p>
        </CardFooter>
      </>
    ),
  },
};

// Card Styles with 32px spacing
export const CardStyles: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Card Styles
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-wrap' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Card styling='default'>
              <CardHeader>
                <CardTitle>Default</CardTitle>
                <CardDescription>Standard card style</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Default card content</p>
              </CardContent>
            </Card>
            <div className='acrobi-showcase-item-label'>Default</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Card styling='elevated'>
              <CardHeader>
                <CardTitle>Elevated</CardTitle>
                <CardDescription>Elevated card style</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Elevated card content</p>
              </CardContent>
            </Card>
            <div className='acrobi-showcase-item-label'>Elevated</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Card styling='outlined'>
              <CardHeader>
                <CardTitle>Outlined</CardTitle>
                <CardDescription>Outlined card style</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Outlined card content</p>
              </CardContent>
            </Card>
            <div className='acrobi-showcase-item-label'>Outlined</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Card styling='filled'>
              <CardHeader>
                <CardTitle>Filled</CardTitle>
                <CardDescription>Filled card style</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Filled card content</p>
              </CardContent>
            </Card>
            <div className='acrobi-showcase-item-label'>Filled</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Card Sizes with 32px spacing
export const CardSizes: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Card Sizes
      </h3>
      <div className='acrobi-variant-group'>
        <div
          className='flex flex-wrap items-start'
          style={{ gap: 'var(--size--32px)' }}
        >
          <div className='acrobi-showcase-item'>
            <Card size='sm'>
              <CardHeader>
                <CardTitle>Small</CardTitle>
                <CardDescription>Small card</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Small content</p>
              </CardContent>
            </Card>
            <div className='acrobi-showcase-item-label'>Small</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Card size='default'>
              <CardHeader>
                <CardTitle>Default</CardTitle>
                <CardDescription>Default card size</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Default content</p>
              </CardContent>
            </Card>
            <div className='acrobi-showcase-item-label'>Default</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Card size='lg'>
              <CardHeader>
                <CardTitle>Large</CardTitle>
                <CardDescription>Large card size</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Large content</p>
              </CardContent>
            </Card>
            <div className='acrobi-showcase-item-label'>Large</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Card size='xl'>
              <CardHeader>
                <CardTitle>Extra Large</CardTitle>
                <CardDescription>Extra large card</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Extra large content</p>
              </CardContent>
            </Card>
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

// Card States with 32px spacing
export const CardStates: Story = {
  render: () => (
    <div className='acrobi-variant-spacing'>
      <h3
        data-fs='h4'
        className='text-foreground'
        style={{ marginBottom: 'var(--size--16px)' }}
      >
        Card States
      </h3>
      <div className='acrobi-variant-group'>
        <div className='flex flex-wrap' style={{ gap: 'var(--size--32px)' }}>
          <div className='acrobi-showcase-item'>
            <Card>
              <CardHeader>
                <CardTitle>Normal</CardTitle>
                <CardDescription>Normal card state</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Normal card content</p>
              </CardContent>
            </Card>
            <div className='acrobi-showcase-item-label'>Normal</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Card interactive>
              <CardHeader>
                <CardTitle>Interactive</CardTitle>
                <CardDescription>Interactive hover state</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Hover to see effect</p>
              </CardContent>
            </Card>
            <div className='acrobi-showcase-item-label'>Interactive</div>
          </div>
          <div className='acrobi-showcase-item'>
            <Card disabled>
              <CardHeader>
                <CardTitle>Disabled</CardTitle>
                <CardDescription>Disabled card state</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Disabled card content</p>
              </CardContent>
            </Card>
            <div className='acrobi-showcase-item-label'>Disabled</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Comprehensive Card Showcase
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
          Card Component Showcase
        </h1>
        <p data-fs='r2' className='text-muted-foreground max-w-2xl mx-auto'>
          Comprehensive showcase of card styles, sizes, states, and content
          variations with 32px spacing.
        </p>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Card Styles</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <Card styling='default'>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Standard card appearance</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the default card style with standard styling.</p>
            </CardContent>
            <CardFooter>
              <Button type='filled' styling='prime' size='sm'>
                Action
              </Button>
            </CardFooter>
          </Card>
          <Card styling='elevated'>
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Card with enhanced shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has an elevated appearance with enhanced shadows.</p>
            </CardContent>
            <CardFooter>
              <Button type='filled' styling='prime' size='sm'>
                Action
              </Button>
            </CardFooter>
          </Card>
          <Card styling='outlined'>
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
              <CardDescription>Card with prominent border</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card emphasizes the border for clear definition.</p>
            </CardContent>
            <CardFooter>
              <Button type='filled' styling='prime' size='sm'>
                Action
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className='acrobi-showcase-section'>
        <h2>Interactive Examples</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--size--32px)',
            marginBottom: 'var(--size--24px)',
          }}
        >
          <Card interactive styling='elevated'>
            <CardHeader>
              <CardTitle>Project Alpha</CardTitle>
              <CardDescription>Active development project</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Click or hover to interact with this card.</p>
            </CardContent>
            <CardFooter>
              <Button
                variant='filled'
                style={{ backgroundColor: 'var(--color-prime)' }}
                size='sm'
              >
                View Project
              </Button>
              <Button
                variant='outline'
                style={{ color: 'var(--color-neutral)' }}
                size='sm'
              >
                Settings
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>View your metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span>Users</span>
                  <span className='font-semibold'>1,234</span>
                </div>
                <div className='flex justify-between'>
                  <span>Sessions</span>
                  <span className='font-semibold'>5,678</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant='filled'
                style={{ backgroundColor: 'var(--color-focus)' }}
                size='sm'
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    children: (
      <>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>
            This card responds to hover interactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Hover over this card to see the interactive effect.</p>
        </CardContent>
      </>
    ),
  },
};
