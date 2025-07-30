import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './primitives/button';
import { Card, CardContent, CardHeader, CardTitle } from './primitives/card';
import { Input } from './primitives/input';
import { Alert, AlertDescription, AlertTitle } from './primitives/alert';
import { Badge } from './primitives/badge';
import { Chip } from './primitives/chip';

const ThemeModes = () => {
  return (
    <div className='space-y-8 p-6'>
      <div className='space-y-4'>
        <h1 className='text-3xl font-bold'>Theme Mode Testing</h1>
        <p className='text-muted-foreground'>
          Use the theme switcher in the toolbar above to test light and dark
          modes.
        </p>
      </div>

      {/* Buttons Section */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex flex-wrap gap-4'>
            <Button styling='prime' type='filled'>
              Prime Filled
            </Button>
            <Button styling='neutral' type='filled'>
              Neutral Filled
            </Button>
            <Button styling='danger' type='filled'>
              Danger Filled
            </Button>
            <Button styling='focus' type='filled'>
              Focus Filled
            </Button>
          </div>
          <div className='flex flex-wrap gap-4'>
            <Button styling='prime' type='line'>
              Prime Line
            </Button>
            <Button styling='neutral' type='line'>
              Neutral Line
            </Button>
            <Button styling='danger' type='line'>
              Danger Line
            </Button>
            <Button styling='focus' type='line'>
              Focus Line
            </Button>
          </div>
          <div className='flex flex-wrap gap-4'>
            <Button styling='prime' type='text'>
              Prime Text
            </Button>
            <Button styling='neutral' type='text'>
              Neutral Text
            </Button>
            <Button styling='danger' type='text'>
              Danger Text
            </Button>
            <Button styling='focus' type='text'>
              Focus Text
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cards Section */}
      <Card>
        <CardHeader>
          <CardTitle>Cards</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Card styling='default'>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This is a default card style.</p>
              </CardContent>
            </Card>
            <Card styling='elevated'>
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This is an elevated card style.</p>
              </CardContent>
            </Card>
            <Card styling='outlined'>
              <CardHeader>
                <CardTitle>Outlined Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This is an outlined card style.</p>
              </CardContent>
            </Card>
            <Card styling='filled'>
              <CardHeader>
                <CardTitle>Filled Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This is a filled card style.</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Form Elements Section */}
      <Card>
        <CardHeader>
          <CardTitle>Form Elements</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input styling='default' placeholder='Default input' />
            <Input styling='filled' placeholder='Filled input' />
            <Input styling='outlined' placeholder='Outlined input' />
            <Input styling='underlined' placeholder='Underlined input' />
          </div>
        </CardContent>
      </Card>

      {/* Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Alert styling='default' type='info'>
            <AlertTitle>Info Alert</AlertTitle>
            <AlertDescription>
              This is an informational alert message.
            </AlertDescription>
          </Alert>
          <Alert styling='filled' type='success'>
            <AlertTitle>Success Alert</AlertTitle>
            <AlertDescription>
              This is a success alert message.
            </AlertDescription>
          </Alert>
          <Alert styling='outlined' type='warning'>
            <AlertTitle>Warning Alert</AlertTitle>
            <AlertDescription>
              This is a warning alert message.
            </AlertDescription>
          </Alert>
          <Alert styling='minimal' type='danger'>
            <AlertTitle>Danger Alert</AlertTitle>
            <AlertDescription>This is a danger alert message.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Badges and Chips Section */}
      <Card>
        <CardHeader>
          <CardTitle>Badges & Chips</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex flex-wrap gap-4'>
            <Badge variant='default'>Default Badge</Badge>
            <Badge variant='secondary'>Secondary Badge</Badge>
            <Badge variant='destructive'>Destructive Badge</Badge>
            <Badge variant='outline'>Outline Badge</Badge>
          </div>
          <div className='flex flex-wrap gap-4'>
            <Chip styling='nl' text='Neutral Chip' />
            <Chip styling='outlined' text='Outlined Chip' />
            <Chip styling='filled' text='Filled Chip' />
          </div>
        </CardContent>
      </Card>

      {/* Color Palette Section */}
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='space-y-2'>
              <div className='w-full h-16 bg-background border rounded'></div>
              <p className='text-sm'>Background</p>
            </div>
            <div className='space-y-2'>
              <div className='w-full h-16 bg-foreground rounded'></div>
              <p className='text-sm'>Foreground</p>
            </div>
            <div className='space-y-2'>
              <div className='w-full h-16 bg-primary rounded'></div>
              <p className='text-sm'>Primary</p>
            </div>
            <div className='space-y-2'>
              <div className='w-full h-16 bg-secondary rounded'></div>
              <p className='text-sm'>Secondary</p>
            </div>
            <div className='space-y-2'>
              <div className='w-full h-16 bg-accent rounded'></div>
              <p className='text-sm'>Accent</p>
            </div>
            <div className='space-y-2'>
              <div className='w-full h-16 bg-muted rounded'></div>
              <p className='text-sm'>Muted</p>
            </div>
            <div className='space-y-2'>
              <div className='w-full h-16 bg-destructive rounded'></div>
              <p className='text-sm'>Destructive</p>
            </div>
            <div className='space-y-2'>
              <div className='w-full h-16 bg-border border-2 rounded'></div>
              <p className='text-sm'>Border</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const meta: Meta<typeof ThemeModes> = {
  title: 'Theming/Modes',
  component: ThemeModes,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Test all components in light and dark theme modes. Use the theme switcher in the toolbar to toggle between modes.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightAndDark: Story = {
  render: () => <ThemeModes />,
};

export const LightMode: Story = {
  parameters: {
    toolbar: {
      theme: { defaultValue: 'light' },
    },
  },
  render: () => <ThemeModes />,
};

export const DarkMode: Story = {
  parameters: {
    toolbar: {
      theme: { defaultValue: 'dark' },
    },
  },
  render: () => <ThemeModes />,
};
