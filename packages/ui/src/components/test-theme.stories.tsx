import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Test component to verify theme application
const ThemeTest = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size--32px)',
        padding: 'var(--size--24px)',
        maxWidth: '64rem',
      }}
    >
      <div className='space-y-4'>
        <h1 data-fs='h1' className='text-foreground'>
          Acrobi Design System
        </h1>
        <p data-fs='r2' className='text-muted-foreground'>
          Authentic Acrobi theme with real design system colors, SF Pro Display
          typography, and proper spacing.
        </p>
      </div>

      {/* Acrobi Color Palette */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--size--24px)',
        }}
      >
        <h2 data-fs='h3' className='text-foreground'>
          Acrobi Color Palette
        </h2>

        {/* Neutrals */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--size--12px)',
          }}
        >
          <h3 data-fs='h5' className='text-foreground'>
            Neutrals
          </h3>
          <div
            className='grid grid-cols-4'
            style={{ gap: 'var(--size--32px)' }}
          >
            <div
              style={{ backgroundColor: 'var(--color--n000)' }}
              className='p-4 rounded'
              data-corner-radius='8'
            >
              <div className='text-white font-medium text-sm'>n000</div>
              <div className='text-white/80 text-xs'>#111111</div>
            </div>
            <div
              style={{ backgroundColor: 'var(--color--n300)' }}
              className='p-4 rounded'
              data-corner-radius='8'
            >
              <div className='text-white font-medium text-sm'>n300</div>
              <div className='text-white/80 text-xs'>#9a9a9a</div>
            </div>
            <div
              style={{ backgroundColor: 'var(--color--n700)' }}
              className='p-4 rounded'
              data-corner-radius='8'
            >
              <div className='text-black font-medium text-sm'>n700</div>
              <div className='text-black/80 text-xs'>#e5e5e5</div>
            </div>
            <div
              style={{ backgroundColor: 'var(--color--n999)' }}
              className='p-4 rounded border'
              data-corner-radius='8'
            >
              <div className='text-black font-medium text-sm'>n999</div>
              <div className='text-black/80 text-xs'>#FFFFFF</div>
            </div>
          </div>
        </div>

        {/* Primary Colors */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--size--12px)',
          }}
        >
          <h3 data-fs='h5' className='text-foreground'>
            Primary (Acrobi Blue)
          </h3>
          <div
            className='grid grid-cols-4'
            style={{ gap: 'var(--size--32px)' }}
          >
            <div
              style={{ backgroundColor: 'var(--color--p100)' }}
              className='p-4 rounded'
              data-corner-radius='8'
            >
              <div className='text-white font-medium text-sm'>p100</div>
              <div className='text-white/80 text-xs'>#072348</div>
            </div>
            <div
              style={{ backgroundColor: 'var(--color--p300)' }}
              className='p-4 rounded'
              data-corner-radius='8'
            >
              <div className='text-white font-medium text-sm'>p300</div>
              <div className='text-white/80 text-xs'>#1975f0</div>
            </div>
            <div
              style={{ backgroundColor: 'var(--color--p500)' }}
              className='p-4 rounded'
              data-corner-radius='8'
            >
              <div className='text-white font-medium text-sm'>p500</div>
              <div className='text-white/80 text-xs'>#5e9ef5</div>
            </div>
            <div
              style={{ backgroundColor: 'var(--color--p700)' }}
              className='p-4 rounded'
              data-corner-radius='8'
            >
              <div className='text-black font-medium text-sm'>p700</div>
              <div className='text-black/80 text-xs'>#e8f1fe</div>
            </div>
          </div>
        </div>

        {/* Focus Colors */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--size--12px)',
          }}
        >
          <h3 data-fs='h5' className='text-foreground'>
            Focus & Status Colors
          </h3>
          <div
            className='grid grid-cols-4'
            style={{ gap: 'var(--size--32px)' }}
          >
            <div
              style={{ backgroundColor: 'var(--color--f500)' }}
              className='p-4 rounded'
              data-corner-radius='8'
            >
              <div className='text-white font-medium text-sm'>Focus</div>
              <div className='text-white/80 text-xs'>#00abd2</div>
            </div>
            <div
              style={{ backgroundColor: 'var(--color--fd500)' }}
              className='p-4 rounded'
              data-corner-radius='8'
            >
              <div className='text-white font-medium text-sm'>Danger</div>
              <div className='text-white/80 text-xs'>#ed1c24</div>
            </div>
            <div
              style={{ backgroundColor: 'var(--color--fw500)' }}
              className='p-4 rounded'
              data-corner-radius='8'
            >
              <div className='text-white font-medium text-sm'>Warning</div>
              <div className='text-white/80 text-xs'>#ff8000</div>
            </div>
            <div
              style={{ backgroundColor: 'var(--color--fs500)' }}
              className='p-4 rounded'
              data-corner-radius='8'
            >
              <div className='text-white font-medium text-sm'>Success</div>
              <div className='text-white/80 text-xs'>#00b400</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind Semantic Colors */}
      <div className='space-y-4'>
        <h2 data-fs='h3' className='text-foreground'>
          Tailwind Integration
        </h2>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <div
              className='bg-background border border-border p-4 rounded-lg'
              data-corner-radius='8'
            >
              <div className='text-foreground font-medium'>Background</div>
              <div className='text-muted-foreground text-sm'>
                bg-background / text-foreground
              </div>
            </div>

            <div
              className='bg-card border border-border p-4 rounded-lg'
              data-corner-radius='8'
            >
              <div className='text-card-foreground font-medium'>Card</div>
              <div className='text-muted-foreground text-sm'>
                bg-card / text-card-foreground
              </div>
            </div>

            <div
              className='bg-primary text-primary-foreground p-4 rounded-lg'
              data-corner-radius='8'
            >
              <div className='font-medium'>Primary (Acrobi Blue)</div>
              <div className='opacity-80 text-sm'>
                bg-primary / text-primary-foreground
              </div>
            </div>

            <div
              className='bg-secondary text-secondary-foreground p-4 rounded-lg'
              data-corner-radius='8'
            >
              <div className='font-medium'>Secondary</div>
              <div className='opacity-80 text-sm'>
                bg-secondary / text-secondary-foreground
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <div
              className='bg-accent text-accent-foreground p-4 rounded-lg'
              data-corner-radius='8'
            >
              <div className='font-medium'>Accent</div>
              <div className='opacity-80 text-sm'>
                bg-accent / text-accent-foreground
              </div>
            </div>

            <div
              className='bg-muted text-muted-foreground p-4 rounded-lg'
              data-corner-radius='8'
            >
              <div className='font-medium'>Muted</div>
              <div className='text-sm'>bg-muted / text-muted-foreground</div>
            </div>

            <div
              className='bg-destructive text-destructive-foreground p-4 rounded-lg'
              data-corner-radius='8'
            >
              <div className='font-medium'>Destructive (Acrobi Red)</div>
              <div className='opacity-80 text-sm'>
                bg-destructive / text-destructive-foreground
              </div>
            </div>

            <div
              className='border-2 border-border p-4 rounded-lg bg-background'
              data-corner-radius='8'
            >
              <div className='text-foreground font-medium'>Border</div>
              <div className='text-muted-foreground text-sm'>border-border</div>
            </div>
          </div>
        </div>
      </div>

      {/* Acrobi Typography Scale */}
      <div className='space-y-4'>
        <h2 data-fs='h3' className='text-foreground'>
          Acrobi Typography Scale
        </h2>
        <div className='space-y-3'>
          <div data-fs='h1' className='text-foreground'>
            Heading 1 (h1) - 2.5rem
          </div>
          <div data-fs='h2' className='text-foreground'>
            Heading 2 (h2) - 2rem
          </div>
          <div data-fs='h3' className='text-foreground'>
            Heading 3 (h3) - 1.75rem
          </div>
          <div data-fs='h4' className='text-foreground'>
            Heading 4 (h4) - 1.5rem
          </div>
          <div data-fs='h5' className='text-foreground'>
            Heading 5 (h5) - 1.25rem
          </div>
          <div data-fs='r1' className='text-foreground'>
            Regular 1 (r1) - 1.125rem
          </div>
          <div data-fs='r2' className='text-foreground'>
            Regular 2 (r2) - 1rem
          </div>
          <div data-fs='r3' className='text-muted-foreground'>
            Regular 3 (r3) - 0.875rem - Muted
          </div>
        </div>
      </div>

      {/* Interactive Elements with Acrobi Styling */}
      <div className='space-y-4'>
        <h2 data-fs='h3' className='text-foreground'>
          Interactive Elements
        </h2>
        <div className='space-y-4'>
          {/* Acrobi Button Styles */}
          <div className='space-y-3'>
            <h3 data-fs='h5' className='text-foreground'>
              Acrobi Button Styles
            </h3>
            <div className='flex flex-wrap gap-3'>
              <button
                className='bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded transition-colors font-medium'
                data-corner-radius='8'
              >
                Primary Button
              </button>

              <button
                className='border border-primary text-primary hover:bg-primary/10 px-4 py-2 rounded transition-colors font-medium'
                data-corner-radius='8'
              >
                Primary Outline
              </button>

              <button
                className='bg-destructive text-destructive-foreground hover:bg-destructive/90 px-4 py-2 rounded transition-colors font-medium'
                data-corner-radius='8'
              >
                Destructive
              </button>

              <button
                className='bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded transition-colors font-medium'
                data-corner-radius='8'
              >
                Secondary
              </button>
            </div>
          </div>

          {/* Form Elements */}
          <div className='space-y-3'>
            <h3 data-fs='h5' className='text-foreground'>
              Form Elements
            </h3>
            <div className='space-y-3 max-w-md'>
              <input
                className='w-full px-3 py-2 border border-input bg-background text-foreground rounded focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground'
                placeholder='Input with Acrobi styling'
                data-corner-radius='8'
              />

              <textarea
                className='w-full px-3 py-2 border border-input bg-background text-foreground rounded focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground resize-none'
                placeholder='Textarea with Acrobi styling'
                rows={3}
                data-corner-radius='8'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Box Shadows */}
      <div className='space-y-4'>
        <h2 data-fs='h3' className='text-foreground'>
          Acrobi Box Shadows
        </h2>
        <div className='grid grid-cols-3 gap-4'>
          <div
            className='bg-card p-4 rounded'
            data-corner-radius='8'
            data-bs='xs'
          >
            <div className='text-card-foreground font-medium'>Extra Small</div>
            <div className='text-muted-foreground text-sm'>data-bs="xs"</div>
          </div>

          <div
            className='bg-card p-4 rounded'
            data-corner-radius='8'
            data-bs='s'
          >
            <div className='text-card-foreground font-medium'>Small</div>
            <div className='text-muted-foreground text-sm'>data-bs="s"</div>
          </div>

          <div
            className='bg-card p-4 rounded'
            data-corner-radius='8'
            data-bs='m'
          >
            <div className='text-card-foreground font-medium'>Medium</div>
            <div className='text-muted-foreground text-sm'>data-bs="m"</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof ThemeTest> = {
  title: 'Theming/Styles',
  component: ThemeTest,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Visual test to verify that the Acrobi theme CSS variables, SF Pro Display typography, and authentic design tokens are properly applied.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeTest>;

export const LightTheme: Story = {
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
