import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { LiveThemeSwitcher } from '../components/theme-demo/LiveThemeSwitcher';
import { ThemeProvider } from '../providers/ThemeProvider';

const meta: Meta<typeof LiveThemeSwitcher> = {
  title: 'Theming/Live Theme Switcher',
  component: LiveThemeSwitcher,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Live Theme Switcher

An interactive demonstration of the Acrobi Design System's advanced theming capabilities.

## Features

- **Multi-Theme Support**: Switch between Light, Dark, High Contrast, and Sepia themes
- **Dynamic Assets**: Interactive audio, haptic, and motion token testing
- **Theme Inheritance**: Visualization of how themes extend base themes
- **Scoped Theming**: Demonstration of section-specific theme application
- **Real-time Updates**: All components update instantly when themes change

## Usage

The Live Theme Switcher showcases the complete theming system and can be used as:

1. **Documentation**: Understanding theme structure and capabilities
2. **Testing**: Validating theme implementations across components
3. **Development**: Rapid theme prototyping and validation
4. **Integration**: Example of complex theme switching in applications

## Advanced Features

### Dynamic Assets
- **Audio Tokens**: Sound feedback for interactions (click, hover, success, error)
- **Haptic Tokens**: Vibration patterns for mobile devices (light, medium, heavy)
- **Motion Tokens**: Animation demonstrations with easing curves

### Theme Inheritance
- Visual representation of theme inheritance chains
- Token count display showing inherited vs. overridden tokens
- Performance optimization through CSS cascade

### Accessibility
- High contrast mode for WCAG AAA compliance
- Reduced motion support respecting user preferences
- Keyboard navigation and screen reader compatibility
        `,
      },
    },
  },
  argTypes: {
    showInheritance: {
      control: 'boolean',
      description: 'Show theme inheritance visualization',
    },
    enableDynamicAssets: {
      control: 'boolean', 
      description: 'Enable audio, haptic, and motion demos',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiveThemeSwitcher>;

export const Default: Story = {
  args: {
    showInheritance: true,
    enableDynamicAssets: true,
  },
  render: (args) => (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <LiveThemeSwitcher {...args} />
    </div>
  ),
};

export const WithoutInheritance: Story = {
  args: {
    showInheritance: false,
    enableDynamicAssets: true,
  },
  render: (args) => (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <LiveThemeSwitcher {...args} />
    </div>
  ),
};

export const StaticAssetsOnly: Story = {
  args: {
    showInheritance: true,
    enableDynamicAssets: false,
  },
  render: (args) => (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <LiveThemeSwitcher {...args} />
    </div>
  ),
};

export const ScopedThemeDemo: Story = {
  render: () => (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <h2>Scoped Theme Demonstration</h2>
      <p>Different sections using different themes simultaneously:</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Light Theme Section */}
        <ThemeProvider theme="acrobi-light" enableScoping>
          <div style={{
            padding: '1.5rem',
            border: '2px solid rgb(var(--color-border))',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'rgb(var(--color-background))',
            color: 'rgb(var(--color-foreground))',
          }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Light Theme Section</h3>
            <p style={{ marginBottom: '1rem' }}>This section uses the light theme with scoped theming.</p>
            <button style={{
              backgroundColor: 'rgb(var(--color-primary))',
              color: 'rgb(var(--color-primary-foreground))',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              cursor: 'pointer',
            }}>
              Light Button
            </button>
          </div>
        </ThemeProvider>

        {/* Dark Theme Section */}
        <ThemeProvider theme="acrobi-dark" enableScoping>
          <div style={{
            padding: '1.5rem',
            border: '2px solid rgb(var(--color-border))',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'rgb(var(--color-background))',
            color: 'rgb(var(--color-foreground))',
          }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Dark Theme Section</h3>
            <p style={{ marginBottom: '1rem' }}>This section uses the dark theme with scoped theming.</p>
            <button style={{
              backgroundColor: 'rgb(var(--color-primary))',
              color: 'rgb(var(--color-primary-foreground))',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              cursor: 'pointer',
            }}>
              Dark Button
            </button>
          </div>
        </ThemeProvider>

        {/* High Contrast Section */}
        <ThemeProvider theme="acrobi-high-contrast" enableScoping>
          <div style={{
            padding: '1.5rem',
            border: '2px solid rgb(var(--color-border))',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'rgb(var(--color-background))',
            color: 'rgb(var(--color-foreground))',
          }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>High Contrast Section</h3>
            <p style={{ marginBottom: '1rem' }}>This section uses high contrast for accessibility.</p>
            <button style={{
              backgroundColor: 'rgb(var(--color-primary))',
              color: 'rgb(var(--color-primary-foreground))',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              cursor: 'pointer',
            }}>
              Accessible Button
            </button>
          </div>
        </ThemeProvider>

        {/* Sepia Theme Section */}
        <ThemeProvider theme="acrobi-sepia" enableScoping>
          <div style={{
            padding: '1.5rem',
            border: '2px solid rgb(var(--color-border))',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'rgb(var(--color-background))',
            color: 'rgb(var(--color-foreground))',
          }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Sepia Theme Section</h3>
            <p style={{ marginBottom: '1rem' }}>This section uses warm sepia tones for comfort.</p>
            <button style={{
              backgroundColor: 'rgb(var(--color-primary))',
              color: 'rgb(var(--color-primary-foreground))',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              cursor: 'pointer',
            }}>
              Sepia Button
            </button>
          </div>
        </ThemeProvider>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates scoped theming where different sections of the same page use different themes simultaneously. Each section is wrapped in its own ThemeProvider with \`enableScoping={true}\`, allowing independent theme management.

**Key Features:**
- Independent theme contexts for each section
- CSS custom properties scoped to specific containers
- No conflicts between different theme sections
- Maintains theme inheritance and token structure
        `,
      },
    },
  },
};

export const ThemeTokenShowcase: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <ThemeProvider theme="acrobi-light" enableScoping>
        <div style={{
          backgroundColor: 'rgb(var(--color-background))',
          color: 'rgb(var(--color-foreground))',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgb(var(--color-border))',
        }}>
          <h2>Theme Token Showcase</h2>
          
          {/* Color Tokens */}
          <section style={{ marginBottom: '2rem' }}>
            <h3>Color Tokens</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {[
                'primary', 'secondary', 'accent', 'destructive', 
                'muted', 'card', 'background', 'border'
              ].map((color) => (
                <div key={color} style={{
                  padding: '1rem',
                  backgroundColor: `rgb(var(--color-${color}))`,
                  color: color.includes('background') || color.includes('card') || color.includes('muted')
                    ? 'rgb(var(--color-foreground))'
                    : `rgb(var(--color-${color}-foreground))`,
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  border: color.includes('background') ? '1px solid rgb(var(--color-border))' : 'none',
                }}>
                  {color}
                </div>
              ))}
            </div>
          </section>

          {/* Spacing Tokens */}
          <section style={{ marginBottom: '2rem' }}>
            <h3>Spacing Tokens</h3>
            <div style={{ display: 'flex', alignItems: 'end', gap: '0.5rem' }}>
              {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
                <div key={size} style={{
                  width: `var(--spacing-${size})`,
                  height: `var(--spacing-${size})`,
                  backgroundColor: 'rgb(var(--color-primary))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgb(var(--color-primary-foreground))',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  minWidth: '2rem',
                  minHeight: '2rem',
                }}>
                  {size}
                </div>
              ))}
            </div>
          </section>

          {/* Border Radius Tokens */}
          <section style={{ marginBottom: '2rem' }}>
            <h3>Border Radius Tokens</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['sm', 'md', 'lg', 'full'].map((radius) => (
                <div key={radius} style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: 'rgb(var(--color-accent))',
                  borderRadius: `var(--radius-${radius})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgb(var(--color-accent-foreground))',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                }}>
                  {radius}
                </div>
              ))}
            </div>
          </section>

          {/* Typography Showcase */}
          <section>
            <h3>Typography</h3>
            <div style={{ fontFamily: 'var(--font-sans)' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: '600', margin: '0.5rem 0' }}>
                Large Heading - var(--font-sans)
              </p>
              <p style={{ fontSize: '1rem', margin: '0.5rem 0' }}>
                Body text with normal weight and readable line spacing.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'rgb(var(--color-muted-foreground))', margin: '0.5rem 0' }}>
                Small text in muted color for secondary information.
              </p>
              <code style={{
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'rgb(var(--color-muted))',
                color: 'rgb(var(--color-muted-foreground))',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.875rem',
              }}>
                Monospace code text
              </code>
            </div>
          </section>
        </div>
      </ThemeProvider>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
This story showcases all the available theme tokens in action:

**Color Tokens:**
- Primary, secondary, accent colors with proper contrast
- Background, foreground, and muted colors
- Destructive colors for error states
- Border and card colors for layout

**Spacing Tokens:**
- Five-step spacing scale (xs, sm, md, lg, xl)
- Consistent spacing across all components

**Border Radius Tokens:**
- Four radius options from subtle to fully rounded
- Semantic naming for different use cases

**Typography:**
- Font family tokens for sans, serif, and mono
- Proper font stacks with fallbacks
        `,
      },
    },
  },
};