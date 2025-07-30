import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from './primitives/button';
import { Card } from './primitives/card';
import { Input } from './primitives/input';
import { Badge } from './primitives/badge';
import { Icon } from './primitives/icon';
import { Label } from './primitives/label';
import { HeroStack } from './structures/hero-stack';
import { BtnPanel } from './structures/btn-panel';
import { EmptyState } from './structures/empty-state';

// Comprehensive Acrobi Design System showcase
const AcrobiShowcase = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size--48px)',
        padding: 'var(--size--32px)',
        maxWidth: '96rem',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div
        className='text-center'
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--size--16px)',
        }}
      >
        <h1 data-fs='h1' className='text-foreground'>
          Acrobi Design System
        </h1>
        <p data-fs='r1' className='text-muted-foreground max-w-2xl mx-auto'>
          A comprehensive showcase of the Acrobi Design System components with
          authentic styling, colors, and typography using SF Pro Display as the
          default font.
        </p>
      </div>

      {/* Hero Stack Examples */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--size--24px)',
        }}
      >
        <h2 data-fs='h2' className='text-foreground'>
          Hero Stack Components
        </h2>
        <div
          className='grid grid-cols-1 md:grid-cols-3'
          style={{ gap: 'var(--size--32px)' }}
        >
          <HeroStack
            icon='🎉'
            title='Welcome'
            description='Get started with the Acrobi Design System'
            variant='centered'
          />
          <HeroStack
            icon='⚡'
            title='Fast Setup'
            description='Quick and easy component integration'
            variant='compact'
          />
          <HeroStack
            icon='🎨'
            title='Beautiful Design'
            description='Authentic Acrobi styling and colors'
            variant='default'
          />
        </div>
      </section>

      {/* Button Panel Examples */}
      <section className='space-y-6'>
        <h2 data-fs='h2' className='text-foreground'>
          Button Panels
        </h2>
        <div className='space-y-4'>
          <div
            className='bg-card p-6 rounded-lg border border-border'
            data-corner-radius='8'
          >
            <h3 data-fs='h4' className='text-card-foreground mb-4'>
              Horizontal Button Panel
            </h3>
            <BtnPanel
              buttons={[
                { label: 'Primary Action', variant: 'default' },
                { label: 'Secondary', variant: 'outline' },
                { label: 'Cancel', variant: 'ghost' },
              ]}
              orientation='horizontal'
            />
          </div>

          <div
            className='bg-card p-6 rounded-lg border border-border'
            data-corner-radius='8'
          >
            <h3 data-fs='h4' className='text-card-foreground mb-4'>
              Vertical Full Width
            </h3>
            <BtnPanel
              buttons={[
                { label: 'Save Changes', variant: 'default' },
                { label: 'Save as Draft', variant: 'outline' },
                { label: 'Discard', variant: 'destructive' },
              ]}
              orientation='vertical'
              variant='full'
            />
          </div>
        </div>
      </section>

      {/* Card Examples */}
      <section className='space-y-6'>
        <h2 data-fs='h2' className='text-foreground'>
          Card Components
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card className='p-6' data-corner-radius='8' data-bs='s'>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <h3 data-fs='h4' className='text-card-foreground'>
                  Project Alpha
                </h3>
                <Badge color='p500' text='Active' />
              </div>
              <p data-fs='r3' className='text-muted-foreground'>
                A comprehensive project management solution with real-time
                collaboration.
              </p>
              <div className='flex gap-2 pt-2'>
                <Button size='sm' variant='default'>
                  View
                </Button>
                <Button size='sm' variant='outline'>
                  Edit
                </Button>
              </div>
            </div>
          </Card>

          <Card className='p-6' data-corner-radius='8' data-bs='s'>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <h3 data-fs='h4' className='text-card-foreground'>
                  Analytics Dashboard
                </h3>
                <Badge color='n500' text='Beta' />
              </div>
              <p data-fs='r3' className='text-muted-foreground'>
                Advanced analytics and reporting tools for data-driven insights.
              </p>
              <div className='flex gap-2 pt-2'>
                <Button size='sm' variant='default'>
                  Launch
                </Button>
                <Button size='sm' variant='outline'>
                  Settings
                </Button>
              </div>
            </div>
          </Card>

          <Card className='p-6' data-corner-radius='8' data-bs='s'>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <h3 data-fs='h4' className='text-card-foreground'>
                  Team Workspace
                </h3>
                <Badge color='fd500' text='Archived' />
              </div>
              <p data-fs='r3' className='text-muted-foreground'>
                Collaborative workspace for team projects and communication.
              </p>
              <div className='flex gap-2 pt-2'>
                <Button size='sm' variant='outline'>
                  Restore
                </Button>
                <Button size='sm' variant='ghost'>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Form Examples */}
      <section className='space-y-6'>
        <h2 data-fs='h2' className='text-foreground'>
          Form Components
        </h2>
        <div
          className='bg-card p-6 rounded-lg border border-border max-w-md'
          data-corner-radius='8'
        >
          <form className='space-y-4'>
            <div>
              <label
                data-fs='r3'
                className='block text-foreground font-medium mb-2'
              >
                Project Name
              </label>
              <Input placeholder='Enter project name' className='w-full' />
            </div>

            <div>
              <label
                data-fs='r3'
                className='block text-foreground font-medium mb-2'
              >
                Description
              </label>
              <textarea
                className='w-full px-3 py-2 border border-input bg-background text-foreground rounded focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground resize-none'
                placeholder='Project description...'
                rows={3}
                data-corner-radius='8'
              />
            </div>

            <div className='flex gap-3 pt-2'>
              <Button variant='default' className='flex-1'>
                Create Project
              </Button>
              <Button variant='outline'>Cancel</Button>
            </div>
          </form>
        </div>
      </section>

      {/* Empty States */}
      <section className='space-y-6'>
        <h2 data-fs='h2' className='text-foreground'>
          Empty States
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div
            className='bg-card p-8 rounded-lg border border-border'
            data-corner-radius='8'
          >
            <EmptyState
              icon='📁'
              title='No Projects Yet'
              description='Create your first project to get started with the Acrobi platform.'
              action={<Button variant='default'>Create Project</Button>}
            />
          </div>

          <div
            className='bg-card p-8 rounded-lg border border-border'
            data-corner-radius='8'
          >
            <EmptyState
              icon='👥'
              title='No Team Members'
              description='Invite team members to collaborate on your projects.'
              action={<Button variant='outline'>Invite Members</Button>}
            />
          </div>
        </div>
      </section>

      {/* Typography & Icons */}
      <section className='space-y-6'>
        <h2 data-fs='h2' className='text-foreground'>
          Typography & Icons
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div
            className='bg-card p-6 rounded-lg border border-border'
            data-corner-radius='8'
          >
            <h3 data-fs='h4' className='text-card-foreground mb-4'>
              SF Pro Display Typography
            </h3>
            <div className='space-y-3'>
              <Label size='h1'>Heading 1</Label>
              <Label size='h2'>Heading 2</Label>
              <Label size='h3'>Heading 3</Label>
              <Label size='r1'>Regular Text (R1)</Label>
              <Label size='r2'>Regular Text (R2)</Label>
              <Label size='r3'>Regular Text (R3)</Label>
              <Label size='r4'>Regular Text (R4)</Label>
            </div>
          </div>

          <div
            className='bg-card p-6 rounded-lg border border-border'
            data-corner-radius='8'
          >
            <h3 data-fs='h4' className='text-card-foreground mb-4'>
              BQ-Icons Font System
            </h3>
            <div className='grid grid-cols-4 gap-4'>
              <div className='text-center'>
                <Icon name='default' size='xl' />
                <Label size='r4' className='mt-1'>
                  default
                </Label>
              </div>
              <div className='text-center'>
                <Icon name='close' size='xl' />
                <Label size='r4' className='mt-1'>
                  close
                </Label>
              </div>
              <div className='text-center'>
                <Icon name='check' size='xl' />
                <Label size='r4' className='mt-1'>
                  check
                </Label>
              </div>
              <div className='text-center'>
                <Icon name='arrow' size='xl' />
                <Label size='r4' className='mt-1'>
                  arrow
                </Label>
              </div>
              <div className='text-center'>
                <Icon name='plus' size='xl' />
                <Label size='r4' className='mt-1'>
                  plus
                </Label>
              </div>
              <div className='text-center'>
                <Icon name='search' size='xl' />
                <Label size='r4' className='mt-1'>
                  search
                </Label>
              </div>
              <div className='text-center'>
                <Icon name='home' size='xl' />
                <Label size='r4' className='mt-1'>
                  home
                </Label>
              </div>
              <div className='text-center'>
                <Icon name='settings' size='xl' />
                <Label size='r4' className='mt-1'>
                  settings
                </Label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette Reference */}
      <section className='space-y-6'>
        <h2 data-fs='h2' className='text-foreground'>
          Acrobi Color System
        </h2>
        <div
          className='bg-card p-6 rounded-lg border border-border'
          data-corner-radius='8'
        >
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='text-center'>
              <div
                className='w-16 h-16 rounded-full mx-auto mb-2 border-2 border-border'
                style={{ backgroundColor: 'var(--color--p500)' }}
              ></div>
              <Label size='r4' color='n999'>
                Primary
              </Label>
              <Label size='r4' color='n700'>
                #1975f0
              </Label>
            </div>

            <div className='text-center'>
              <div
                className='w-16 h-16 rounded-full mx-auto mb-2 border-2 border-border'
                style={{ backgroundColor: 'var(--color--fd500)' }}
              ></div>
              <Label size='r4' color='n999'>
                Danger
              </Label>
              <Label size='r4' color='n700'>
                #ed1c24
              </Label>
            </div>

            <div className='text-center'>
              <div
                className='w-16 h-16 rounded-full mx-auto mb-2 border-2 border-border'
                style={{ backgroundColor: 'var(--color--fs500)' }}
              ></div>
              <Label size='r4' color='n999'>
                Success
              </Label>
              <Label size='r4' color='n700'>
                #00b400
              </Label>
            </div>

            <div className='text-center'>
              <div
                className='w-16 h-16 rounded-full mx-auto mb-2 border-2 border-border'
                style={{ backgroundColor: 'var(--color--fw500)' }}
              ></div>
              <Label size='r4' color='n999'>
                Warning
              </Label>
              <Label size='r4' color='n700'>
                #ff8000
              </Label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const meta: Meta<typeof AcrobiShowcase> = {
  title: 'Sections/Design System Showcase',
  component: AcrobiShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Comprehensive showcase of the Acrobi Design System with authentic styling, SF Pro Display typography, and proper spacing.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AcrobiShowcase>;

export const Complete: Story = {
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
