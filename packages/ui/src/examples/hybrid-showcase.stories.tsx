import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Button } from '../components/primitives/button';
import HybridAppExample from './hybrid-app-example';

const meta: Meta = {
  title: 'Hybrid System/Theme Integration Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Demonstrates the hybrid approach: Acrobi components + Tailwind utilities working together with automatic theme switching.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Simple demonstration of mixed usage
const SimpleMixedUsage: React.FC = () => {
  const [theme, setTheme] = useState<'acrobi' | 'bluequeue'>('acrobi');

  return (
    <div data-theme={theme} style={{ minHeight: '100vh', padding: '2rem' }}>
      {/* Import semantic bridge styles inline for this demo */}
      <style>{`
        :root {
          --primary: var(--color--p500);
          --primary-foreground: var(--color--n000);
          --background: var(--color--n000);
          --foreground: var(--color--n999);
          --muted: var(--color--n300);
          --muted-foreground: var(--color--n700);
          --border: var(--color--n300);
          --card: var(--color--n000);
          --card-foreground: var(--color--n999);
          --accent: var(--color--f500);
          --accent-foreground: var(--color--n000);
        }
        
        [data-theme='bluequeue'] {
          --primary: rgb(48, 47, 44);
          --primary-foreground: rgb(255, 254, 255);
          --background: rgb(255, 254, 255);
          --foreground: rgb(29, 28, 26);
          --muted: rgb(196, 196, 196);
          --muted-foreground: rgb(109, 109, 109);
          --border: rgb(196, 196, 196);
          --card: rgb(255, 254, 255);
          --card-foreground: rgb(29, 28, 26);
          --accent: rgb(25, 117, 240);
          --accent-foreground: rgb(255, 254, 255);
        }
        
        .bg-primary { background-color: var(--primary); }
        .text-primary-foreground { color: var(--primary-foreground); }
        .bg-background { background-color: var(--background); }
        .text-foreground { color: var(--foreground); }
        .text-muted-foreground { color: var(--muted-foreground); }
        .border-border { border-color: var(--border); }
        .bg-card { background-color: var(--card); }
        .text-card-foreground { color: var(--card-foreground); }
        .bg-accent { background-color: var(--accent); }
        .text-accent-foreground { color: var(--accent-foreground); }
        
        /* Utility classes */
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .mt-4 { margin-top: 1rem; }
        .mb-4 { margin-bottom: 1rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .rounded-lg { border-radius: 0.5rem; }
        .border { border-width: 1px; }
        .text-lg { font-size: 1.125rem; }
        .text-sm { font-size: 0.875rem; }
        .font-semibold { font-weight: 600; }
        .shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
        .transition-colors { transition-property: color, background-color, border-color; }
        .duration-300 { transition-duration: 300ms; }
      `}</style>

      <div className="bg-background text-foreground transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }} className="text-foreground">
              Hybrid Integration Demo
            </h1>
            <p className="text-muted-foreground">
              Current theme: <strong>{theme}</strong>
            </p>
          </div>
          
          <Button
            styling="pl"
            size="m"
            onClick={() => setTheme(theme === 'acrobi' ? 'bluequeue' : 'acrobi')}
          >
            Switch to {theme === 'acrobi' ? 'BlueQueue' : 'Acrobi'}
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Left Column - Acrobi Components */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Acrobi Components (Semantic Props)
            </h2>
            
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-foreground font-semibold mb-4">Button Variants</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button styling="pf" size="m">Primary Filled</Button>
                <Button styling="pl" size="m">Primary Line</Button>
                <Button styling="pt" size="m">Primary Text</Button>
                <Button styling="nf" size="m">Neutral Filled</Button>
              </div>
              <p className="text-muted-foreground text-sm mt-4">
                These use your semantic props: <code>styling="pf"</code>, <code>size="m"</code>
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-foreground font-semibold mb-4">Button Sizes</h3>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Button styling="pf" size="xs">XS</Button>
                <Button styling="pf" size="s">Small</Button>
                <Button styling="pf" size="m">Medium</Button>
                <Button styling="pf" size="l">Large</Button>
              </div>
              <p className="text-muted-foreground text-sm mt-4">
                Same component, different <code>size</code> prop
              </p>
            </div>
          </div>

          {/* Right Column - Tailwind Utilities */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Tailwind Utilities (Semantic Variables)
            </h2>
            
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-foreground font-semibold mb-4">Utility Colors</h3>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <div className="bg-primary text-primary-foreground p-4 rounded-lg">
                  bg-primary + text-primary-foreground
                </div>
                <div className="bg-accent text-accent-foreground p-4 rounded-lg">
                  bg-accent + text-accent-foreground
                </div>
                <div 
                  className="p-4 rounded-lg border border-border"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
                >
                  <span className="text-foreground">bg-primary/10 (10% opacity)</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mt-4">
                These use Tailwind classes: <code>bg-primary</code>, <code>text-primary-foreground</code>
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-foreground font-semibold mb-4">Mixed Usage</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p className="text-foreground font-semibold">Product Name</p>
                  <p className="text-muted-foreground text-sm">Using Tailwind utilities</p>
                </div>
                <Button styling="pf" size="s">
                  Acrobi Button
                </Button>
              </div>
              <p className="text-muted-foreground text-sm mt-4">
                Tailwind for layout, Acrobi for interactive components
              </p>
            </div>
          </div>
        </div>

        {/* Footer demonstration */}
        <div className="mt-4 p-6 bg-card border border-border rounded-lg">
          <h3 className="text-foreground font-semibold mb-4">Key Benefits</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div>
              <h4 className="text-foreground font-semibold text-sm">🎨 Automatic Theme Switching</h4>
              <p className="text-muted-foreground text-sm">
                Both systems use the same semantic variables, so switching themes updates everything
              </p>
            </div>
            <div>
              <h4 className="text-foreground font-semibold text-sm">🚀 Best of Both Worlds</h4>
              <p className="text-muted-foreground text-sm">
                Semantic components for consistency, utilities for rapid development
              </p>
            </div>
            <div>
              <h4 className="text-foreground font-semibold text-sm">🔧 Zero Breaking Changes</h4>
              <p className="text-muted-foreground text-sm">
                Your existing components work exactly the same, utilities are additive
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SimpleIntegration: Story = {
  render: () => <SimpleMixedUsage />,
  parameters: {
    docs: {
      description: {
        story: 'Simple demonstration of mixing Acrobi components with Tailwind utilities. Both systems automatically respect theme changes.',
      },
    },
  },
};

export const FullExample: Story = {
  render: () => <HybridAppExample />,
  parameters: {
    docs: {
      description: {
        story: 'Complete application example showing product cards, forms, status indicators, and theme switching. Demonstrates real-world usage patterns.',
      },
    },
  },
};

// Color mapping demonstration
const ColorMappingDemo: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>Color Variable Mapping</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Acrobi Variables</h3>
          <div style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
            <div>--color--p500 (Primary)</div>
            <div>--color--n000 (Background)</div>
            <div>--color--n999 (Text)</div>
            <div>--color--n300 (Border)</div>
            <div>--color--f500 (Focus)</div>
          </div>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Semantic Bridge</h3>
          <div style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
            <div>--primary</div>
            <div>--background</div>
            <div>--foreground</div>
            <div>--border</div>
            <div>--accent</div>
          </div>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Tailwind Classes</h3>
          <div style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
            <div>bg-primary</div>
            <div>bg-background</div>
            <div>text-foreground</div>
            <div>border-border</div>
            <div>ring-accent</div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '0.5rem' }}>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          <strong>How it works:</strong> The semantic bridge maps your existing Acrobi variables to standard 
          Tailwind semantic names. This allows Tailwind utilities to automatically respect your themes 
          without any configuration changes to your components.
        </p>
      </div>
    </div>
  );
};

export const ColorMapping: Story = {
  render: () => <ColorMappingDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Shows how Acrobi design system variables are mapped to Tailwind semantic variables through the bridge system.',
      },
    },
  },
};