import type { Meta, StoryObj } from '@storybook/react';
import {
  KeyboardAvoidingView,
  withKeyboardAvoidance,
  useKeyboardAvoidanceStyles,
} from './keyboard-avoiding-view';
import React, { useState } from 'react';

const meta: Meta<typeof KeyboardAvoidingView> = {
  title: '4. Structures/KeyboardAvoidingView',
  component: KeyboardAvoidingView,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A container component that automatically adjusts its layout when the on-screen keyboard appears, preventing content from being hidden behind the keyboard.',
      },
    },
  },
  argTypes: {
    avoidanceType: {
      control: 'radio',
      options: ['padding', 'margin'],
      description: 'Whether to use padding or margin for keyboard avoidance',
    },
    enableTransitions: {
      control: 'boolean',
      description:
        'Whether to enable smooth transitions when keyboard appears/disappears',
    },
    transitionDuration: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: 'Transition duration in milliseconds',
    },
    extraOffset: {
      control: { type: 'number', min: 0, max: 100, step: 5 },
      description: 'Additional offset to add to keyboard height',
    },
    mobileOnly: {
      control: 'boolean',
      description: 'Whether to only apply avoidance on mobile devices',
    },
    debug: {
      control: 'boolean',
      description: 'Whether to show debug information overlay',
    },
    minKeyboardHeight: {
      control: { type: 'number', min: 20, max: 200, step: 10 },
      description: 'Minimum keyboard height to trigger avoidance',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KeyboardAvoidingView>;

// Sample form component for demos
const SampleForm = ({ title = 'Contact Form' }: { title?: string }) => (
  <div
    style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      maxWidth: '400px',
      margin: '0 auto',
    }}
  >
    <h3 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>{title}</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '5px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Name
        </label>
        <input
          type='text'
          placeholder='Enter your name'
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px', // Prevents zoom on iOS
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '5px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Email
        </label>
        <input
          type='email'
          placeholder='Enter your email'
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '5px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Phone
        </label>
        <input
          type='tel'
          placeholder='Enter your phone number'
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '5px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Message
        </label>
        <textarea
          placeholder='Enter your message'
          rows={4}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box',
            resize: 'vertical',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button
          type='button'
          style={{
            flex: 1,
            padding: '12px 20px',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
        <button
          type='button'
          style={{
            flex: 1,
            padding: '12px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

// Demo with instructions
const KeyboardAvoidingDemo = (props: any) => (
  <div
    style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
    }}
  >
    {/* Instructions */}
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '14px',
      }}
    >
      <h4 style={{ margin: '0 0 10px 0' }}>📱 Instructions for Testing</h4>
      <ul style={{ margin: 0, paddingLeft: '20px' }}>
        <li>This demo works best on mobile devices with on-screen keyboards</li>
        <li>Tap on any input field below to bring up the keyboard</li>
        <li>Notice how the form automatically adjusts to stay visible</li>
        <li>Try different settings in the Controls panel</li>
      </ul>
    </div>

    <KeyboardAvoidingView {...props}>
      <SampleForm title='Keyboard Avoiding Form' />
    </KeyboardAvoidingView>
  </div>
);

// Comparison demo showing with and without keyboard avoidance
const ComparisonDemo = () => {
  const [showAvoidance, setShowAvoidance] = useState(true);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        padding: '20px',
      }}
    >
      {/* Toggle */}
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <input
            type='checkbox'
            checked={showAvoidance}
            onChange={e => setShowAvoidance(e.target.checked)}
          />
          <span>Enable Keyboard Avoidance</span>
        </label>
        <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#666' }}>
          Toggle to see the difference with and without keyboard avoidance
        </p>
      </div>

      {showAvoidance ? (
        <KeyboardAvoidingView
          debug={true}
          extraOffset={10}
          style={{
            border: '2px solid #4CAF50',
            borderRadius: '8px',
            padding: '10px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <span
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              ✅ WITH KEYBOARD AVOIDANCE
            </span>
          </div>
          <SampleForm title='Protected Form' />
        </KeyboardAvoidingView>
      ) : (
        <div
          style={{
            border: '2px solid #f44336',
            borderRadius: '8px',
            padding: '10px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <span
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              ❌ WITHOUT KEYBOARD AVOIDANCE
            </span>
          </div>
          <SampleForm title='Unprotected Form' />
        </div>
      )}
    </div>
  );
};

// HOC Demo
const HOCDemo = () => {
  const EnhancedForm = withKeyboardAvoidance(SampleForm, {
    extraOffset: 20,
    transitionDuration: 500,
    debug: true,
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '14px',
        }}
      >
        <h4 style={{ margin: '0 0 10px 0' }}>🔧 Higher-Order Component Demo</h4>
        <p style={{ margin: 0 }}>
          This form is wrapped with <code>withKeyboardAvoidance()</code> HOC for
          automatic keyboard handling.
        </p>
      </div>

      <EnhancedForm title='HOC Enhanced Form' />
    </div>
  );
};

// Hook Usage Demo
const HookStylesDemo = () => {
  const [avoidanceType, setAvoidanceType] = useState<'padding' | 'margin'>(
    'padding'
  );
  const [extraOffset, setExtraOffset] = useState(15);

  const avoidanceStyles = useKeyboardAvoidanceStyles({
    avoidanceType,
    extraOffset,
    enableTransitions: true,
    transitionDuration: 400,
    transitionEasing: 'ease-out',
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        padding: '20px',
      }}
    >
      {/* Controls */}
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h4 style={{ margin: '0 0 15px 0' }}>🎛️ Hook Styles Controls</h4>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
            alignItems: 'center',
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            Avoidance Type:
            <select
              value={avoidanceType}
              onChange={e =>
                setAvoidanceType(e.target.value as 'padding' | 'margin')
              }
              style={{ padding: '4px 8px' }}
            >
              <option value='padding'>Padding</option>
              <option value='margin'>Margin</option>
            </select>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            Extra Offset:
            <input
              type='range'
              min='0'
              max='50'
              value={extraOffset}
              onChange={e => setExtraOffset(Number(e.target.value))}
              style={{ width: '100px' }}
            />
            <span style={{ minWidth: '30px', fontSize: '12px' }}>
              {extraOffset}px
            </span>
          </label>
        </div>
      </div>

      {/* Form with hook styles */}
      <div style={avoidanceStyles}>
        <SampleForm title='Hook Styles Form' />
      </div>
    </div>
  );
};

// Story definitions
export const Default: Story = {
  render: args => <KeyboardAvoidingDemo {...args} />,
  args: {
    avoidanceType: 'padding',
    enableTransitions: true,
    transitionDuration: 300,
    extraOffset: 0,
    mobileOnly: true,
    debug: false,
    minKeyboardHeight: 50,
  },
};

export const WithMarginAvoidance: Story = {
  render: args => <KeyboardAvoidingDemo {...args} />,
  args: {
    avoidanceType: 'margin',
    enableTransitions: true,
    transitionDuration: 300,
    extraOffset: 10,
    mobileOnly: true,
    debug: true,
  },
};

export const SlowTransitions: Story = {
  render: args => <KeyboardAvoidingDemo {...args} />,
  args: {
    avoidanceType: 'padding',
    enableTransitions: true,
    transitionDuration: 800,
    extraOffset: 20,
    transitionEasing: 'ease-in-out',
    debug: true,
  },
};

export const ComparisonView: Story = {
  render: () => <ComparisonDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive comparison showing the difference between forms with and without keyboard avoidance.',
      },
    },
  },
};

export const HigherOrderComponent: Story = {
  render: () => <HOCDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of the withKeyboardAvoidance HOC for wrapping existing components.',
      },
    },
  },
};

export const HookStyles: Story = {
  render: () => <HookStylesDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Using the useKeyboardAvoidanceStyles hook to apply keyboard avoidance styles directly to existing components.',
      },
    },
  },
};
