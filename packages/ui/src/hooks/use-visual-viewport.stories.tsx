import type { Meta, StoryObj } from '@storybook/react';
import {
  useVisualViewport,
  useVisualViewportMobile,
  isLikelyMobileDevice,
} from './use-visual-viewport';
import React, { useState } from 'react';

const meta: Meta = {
  title: 'Hooks/useVisualViewport',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Hook for detecting on-screen keyboard presence using the Visual Viewport API. Essential for AAEs that need to adapt layout when mobile keyboard appears.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Visual Viewport Demo Component
const VisualViewportDemo = () => {
  const [debugEnabled, setDebugEnabled] = useState(false);
  const [customThreshold, setCustomThreshold] = useState(150);

  const {
    isKeyboardOpen,
    keyboardHeight,
    viewportHeight,
    viewportWidth,
    scale,
    offsetTop,
    offsetLeft,
    isSupported,
    refresh,
  } = useVisualViewport({
    keyboardThreshold: customThreshold,
    debug: debugEnabled,
  });

  const isMobile = isLikelyMobileDevice();

  if (!isSupported) {
    return (
      <div
        style={{
          padding: '20px',
          border: '2px solid #ff6b35',
          borderRadius: '8px',
          backgroundColor: '#fff4e6',
        }}
      >
        <h3>⚠️ Visual Viewport API Not Supported</h3>
        <p>This browser doesn't support the Visual Viewport API.</p>
        <p>
          <strong>Supported browsers:</strong> Chrome 61+, Firefox 91+, Safari
          13+
        </p>
        <p>
          <strong>Current device type:</strong>{' '}
          {isMobile ? 'Mobile' : 'Desktop'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>📱 Visual Viewport API Demo</h3>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          Try opening the on-screen keyboard by focusing on inputs below (mobile
          devices only).
        </p>
      </div>

      {/* Status Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '20px',
        }}
      >
        {/* API Support */}
        <div
          style={{
            border: '1px solid #e0e0e0',
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: isSupported ? '#f0f9ff' : '#fef2f2',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            🔧 API Support
          </h4>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <div>Visual Viewport: {isSupported ? '✅ Yes' : '❌ No'}</div>
            <div>Mobile Device: {isMobile ? '✅ Yes' : '❌ No'}</div>
          </div>
        </div>

        {/* Keyboard Status */}
        <div
          style={{
            border: '1px solid #e0e0e0',
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: isKeyboardOpen ? '#f0fdf0' : '#fafafa',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            ⌨️ Keyboard Status
          </h4>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <div>Status: {isKeyboardOpen ? '🟢 Open' : '⚪ Closed'}</div>
            <div>Height: {keyboardHeight}px</div>
          </div>
        </div>

        {/* Viewport Info */}
        <div
          style={{
            border: '1px solid #e0e0e0',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            📐 Viewport Info
          </h4>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <div>
              Size: {viewportWidth}×{viewportHeight}
            </div>
            <div>Scale: {scale.toFixed(2)}x</div>
          </div>
        </div>

        {/* Offset Info */}
        <div
          style={{
            border: '1px solid #e0e0e0',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>📍 Position</h4>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <div>Top: {offsetTop}px</div>
            <div>Left: {offsetLeft}px</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          border: '1px solid #e0e0e0',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>🎛️ Controls</h4>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '14px',
            }}
          >
            <input
              type='checkbox'
              checked={debugEnabled}
              onChange={e => setDebugEnabled(e.target.checked)}
            />
            Debug Mode
          </label>

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '14px',
            }}
          >
            Threshold:
            <input
              type='number'
              value={customThreshold}
              onChange={e => setCustomThreshold(Number(e.target.value))}
              min='50'
              max='500'
              step='10'
              style={{ width: '70px', padding: '2px 5px' }}
            />
            px
          </label>

          <button
            onClick={refresh}
            style={{
              padding: '5px 10px',
              backgroundColor: '#007acc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Test Inputs */}
      <div
        style={{
          border: '1px solid #e0e0e0',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
          📝 Test Inputs
        </h4>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
          Focus on these inputs to trigger the on-screen keyboard:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type='text'
            placeholder='Type here to open keyboard...'
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px', // Prevents zoom on iOS
            }}
          />

          <input
            type='email'
            placeholder='Email input'
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
            }}
          />

          <textarea
            placeholder='Textarea for longer text...'
            rows={3}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical',
            }}
          />
        </div>
      </div>

      {/* Real-time Data */}
      <div
        style={{
          border: '1px solid #e0e0e0',
          padding: '15px',
          borderRadius: '8px',
          backgroundColor: isKeyboardOpen ? '#f0fdf0' : '#fafafa',
        }}
      >
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
          📊 Real-time Data
        </h4>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '12px',
            backgroundColor: '#f8f9fa',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #e9ecef',
          }}
        >
          <div>
            isKeyboardOpen: <strong>{isKeyboardOpen.toString()}</strong>
          </div>
          <div>
            keyboardHeight: <strong>{keyboardHeight}px</strong>
          </div>
          <div>
            viewportHeight: <strong>{viewportHeight}px</strong>
          </div>
          <div>
            viewportWidth: <strong>{viewportWidth}px</strong>
          </div>
          <div>
            scale: <strong>{scale}</strong>
          </div>
          <div>
            offsetTop: <strong>{offsetTop}px</strong>
          </div>
          <div>
            offsetLeft: <strong>{offsetLeft}px</strong>
          </div>
          <div>
            windowHeight:{' '}
            <strong>
              {typeof window !== 'undefined' ? window.innerHeight : 0}px
            </strong>
          </div>
          <div>
            windowWidth:{' '}
            <strong>
              {typeof window !== 'undefined' ? window.innerWidth : 0}px
            </strong>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
        }}
      >
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
          💡 Usage Instructions
        </h4>
        <ul
          style={{
            fontSize: '12px',
            color: '#666',
            margin: 0,
            paddingLeft: '20px',
          }}
        >
          <li>
            This demo works best on mobile devices with on-screen keyboards
          </li>
          <li>Focus on the input fields above to trigger the keyboard</li>
          <li>Watch the real-time data update as the viewport changes</li>
          <li>Try rotating your device to see scale and offset changes</li>
          <li>Enable debug mode to see console logging</li>
        </ul>
      </div>
    </div>
  );
};

// Mobile-only demo
const MobileOnlyDemo = () => {
  const mobileViewport = useVisualViewportMobile();
  const regularViewport = useVisualViewport();
  const isMobile = isLikelyMobileDevice();

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h3>📱 Mobile-Only Hook Demo</h3>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
        The <code>useVisualViewportMobile</code> hook only activates on mobile
        devices.
      </p>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
      >
        {/* Mobile Hook */}
        <div
          style={{
            border: '1px solid #e0e0e0',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
            📱 Mobile Hook
          </h4>
          <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>
            <div>Device Type: {isMobile ? 'Mobile' : 'Desktop'}</div>
            <div>Supported: {mobileViewport.isSupported ? 'Yes' : 'No'}</div>
            <div>
              Keyboard Open: {mobileViewport.isKeyboardOpen ? 'Yes' : 'No'}
            </div>
            <div>Height: {mobileViewport.keyboardHeight}px</div>
          </div>
        </div>

        {/* Regular Hook */}
        <div
          style={{
            border: '1px solid #e0e0e0',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
            💻 Regular Hook
          </h4>
          <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>
            <div>Supported: {regularViewport.isSupported ? 'Yes' : 'No'}</div>
            <div>
              Keyboard Open: {regularViewport.isKeyboardOpen ? 'Yes' : 'No'}
            </div>
            <div>Height: {regularViewport.keyboardHeight}px</div>
            <div>
              Viewport: {regularViewport.viewportWidth}×
              {regularViewport.viewportHeight}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <input
          type='text'
          placeholder='Test input for mobile keyboard detection'
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        />
      </div>
    </div>
  );
};

export const BasicUsage: Story = {
  render: () => <VisualViewportDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive demo of the useVisualViewport hook showing real-time keyboard detection and viewport information. Works best on mobile devices.',
      },
    },
  },
};

export const MobileOnly: Story = {
  render: () => <MobileOnlyDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the useVisualViewportMobile hook which only activates on mobile devices, providing better performance for desktop applications.',
      },
    },
  },
};
