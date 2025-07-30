import type { Meta, StoryObj } from '@storybook/react';
import { useKeyboard } from './use-keyboard';
import React, { useState, useEffect } from 'react';

const meta: Meta = {
  title: 'Hooks/useKeyboard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Advanced keyboard management hook for AAE applications with shortcut handling, key combinations, and cross-platform compatibility.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Basic keyboard demo component
const BasicKeyboardDemo = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [shortcutCount, setShortcutCount] = useState(0);

  const addLog = (message: string) => {
    setLogs(prev => [
      ...prev.slice(-9),
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const {
    pressedKeys,
    lastKeyPressed,
    isSequenceActive,
    addShortcut,
    removeShortcut,
    isKeyPressed,
    isMac,
    modifierKey,
    isSupported,
  } = useKeyboard({
    shortcuts: [
      {
        keys: 'Escape',
        callback: () => {
          addLog('Escape key pressed - Clearing logs');
          setLogs([]);
        },
        description: 'Clear logs',
      },
      {
        keys: '$mod+k',
        callback: () => {
          addLog(`${modifierKey}+K pressed - Universal shortcut`);
        },
        description: 'Universal shortcut (Cmd on Mac, Ctrl elsewhere)',
      },
      {
        keys: 'Alt+Shift+d',
        callback: event => {
          addLog('Alt+Shift+D - Debug shortcut with modifiers');
          console.log('Debug event:', event);
        },
        preventDefault: true,
        description: 'Debug shortcut with event prevention',
      },
    ],
  });

  const addDynamicShortcut = () => {
    const shortcutId = addShortcut({
      keys: `${shortcutCount + 1}`,
      callback: () => addLog(`Dynamic shortcut ${shortcutCount + 1} executed!`),
      description: `Dynamic shortcut ${shortcutCount + 1}`,
    });

    setShortcutCount(prev => prev + 1);
    addLog(`Added dynamic shortcut: Press '${shortcutCount + 1}'`);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      removeShortcut(shortcutId);
      addLog(`Dynamic shortcut '${shortcutCount}' removed`);
    }, 10000);
  };

  if (!isSupported) {
    return (
      <div
        style={{
          padding: '20px',
          border: '2px solid red',
          borderRadius: '8px',
        }}
      >
        <h3>⚠️ Keyboard API not supported</h3>
        <p>This browser doesn't support the required keyboard APIs.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
      >
        {/* Platform Info */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <h3>🖥️ Platform Info</h3>
          <p>
            <strong>Platform:</strong> {isMac ? 'Mac' : 'PC'}
          </p>
          <p>
            <strong>Modifier Key:</strong> {modifierKey}
          </p>
          <p>
            <strong>Supported:</strong> {isSupported ? '✅ Yes' : '❌ No'}
          </p>
        </div>

        {/* Current State */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <h3>⌨️ Current State</h3>
          <p>
            <strong>Last Key:</strong> {lastKeyPressed || 'None'}
          </p>
          <p>
            <strong>Sequence Active:</strong>{' '}
            {isSequenceActive ? '🟡 Yes' : '⚪ No'}
          </p>
          <p>
            <strong>Keys Pressed:</strong> {pressedKeys.size}
          </p>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {Array.from(pressedKeys).join(', ') || 'None'}
          </div>
        </div>
      </div>

      {/* Built-in Shortcuts */}
      <div
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px',
        }}
      >
        <h3>🎯 Built-in Shortcuts</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            ⌨️ <code>Escape</code> - Clear logs
          </li>
          <li>
            ⌨️ <code>{modifierKey}+K</code> - Universal shortcut
          </li>
          <li>
            ⌨️ <code>Alt+Shift+D</code> - Debug with event prevention
          </li>
        </ul>
      </div>

      {/* Dynamic Shortcuts */}
      <div
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px',
        }}
      >
        <h3>🔄 Dynamic Shortcuts</h3>
        <button
          onClick={addDynamicShortcut}
          style={{
            padding: '8px 16px',
            margin: '5px',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add Temporary Shortcut ({shortcutCount + 1})
        </button>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Creates a shortcut that auto-removes after 10 seconds
        </p>
      </div>

      {/* Key Detection */}
      <div
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px',
        }}
      >
        <h3>🔍 Key Detection</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '5px',
          }}
        >
          {['a', 's', 'd', 'f', 'Space', 'Enter', 'Shift', 'Ctrl'].map(key => (
            <div
              key={key}
              style={{
                padding: '8px',
                backgroundColor: isKeyPressed(key) ? '#4CAF50' : '#f0f0f0',
                color: isKeyPressed(key) ? 'white' : 'black',
                textAlign: 'center',
                borderRadius: '4px',
                fontSize: '12px',
                border: '1px solid #ccc',
              }}
            >
              {key}
            </div>
          ))}
        </div>
      </div>

      {/* Event Log */}
      <div
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px',
        }}
      >
        <h3>📝 Event Log</h3>
        <div
          style={{
            height: '200px',
            overflowY: 'auto',
            backgroundColor: '#f8f8f8',
            padding: '10px',
            fontSize: '12px',
            borderRadius: '4px',
          }}
        >
          {logs.length === 0 ? (
            <div style={{ color: '#666', fontStyle: 'italic' }}>
              Press any key or use shortcuts to see events...
            </div>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '2px' }}>
                {log}
              </div>
            ))
          )}
        </div>
        <button
          onClick={() => setLogs([])}
          style={{
            marginTop: '10px',
            padding: '4px 8px',
            fontSize: '12px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Clear Log
        </button>
      </div>
    </div>
  );
};

// Sequence detection demo
const SequenceDemo = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [konami, setKonami] = useState(false);

  const addLog = (message: string) => {
    setLogs(prev => [
      ...prev.slice(-7),
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const { isSequenceActive } = useKeyboard({
    enableSequences: true,
    sequenceTimeout: 2000,
    shortcuts: [
      {
        keys: ['Ctrl+k', 'Ctrl+s'],
        callback: () => {
          addLog('🎯 Sequence detected: Ctrl+K, Ctrl+S - VS Code save!');
        },
        description: 'VS Code style save sequence',
      },
      {
        keys: ['g', 'g'],
        callback: () => {
          addLog('🎯 Sequence detected: G, G - Vim go to top!');
        },
        description: 'Vim style navigation',
      },
      {
        keys: [
          'ArrowUp',
          'ArrowUp',
          'ArrowDown',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'ArrowLeft',
          'ArrowRight',
          'b',
          'a',
        ],
        callback: () => {
          addLog('🎮 KONAMI CODE ACTIVATED! ⬆⬆⬇⬇⬅➡⬅➡BA');
          setKonami(true);
          setTimeout(() => setKonami(false), 3000);
        },
        description: 'The legendary Konami Code',
      },
    ],
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      {konami && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ff6b35',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            fontSize: '24px',
            fontWeight: 'bold',
            zIndex: 1000,
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          🎮 KONAMI CODE! 🎮
          <br />
          <div style={{ fontSize: '14px', marginTop: '10px' }}>
            30 lives unlocked!
          </div>
        </div>
      )}

      <h3>🎹 Keyboard Sequence Detection</h3>

      <div
        style={{
          border: '2px solid' + (isSequenceActive ? '#ff9500' : '#ccc'),
          padding: '15px',
          borderRadius: '8px',
          backgroundColor: isSequenceActive ? '#fff4e6' : 'white',
          marginBottom: '20px',
        }}
      >
        <h4>
          Sequence Status:{' '}
          {isSequenceActive ? '🟡 Active (2s timeout)' : '⚪ Inactive'}
        </h4>
        <p style={{ fontSize: '14px', color: '#666' }}>
          A sequence is active when you start typing a multi-key pattern.
        </p>
      </div>

      <div
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '8px',
        }}
      >
        <h4>📋 Available Sequences</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '8px' }}>
            ⌨️ <code>Ctrl+K</code> then <code>Ctrl+S</code> - VS Code save
          </li>
          <li style={{ marginBottom: '8px' }}>
            ⌨️ <code>G</code> then <code>G</code> - Vim go to top
          </li>
          <li style={{ marginBottom: '8px' }}>
            ⌨️ <code>↑↑↓↓←→←→BA</code> - Konami Code 🎮
          </li>
        </ul>
      </div>

      <div
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px',
        }}
      >
        <h4>📝 Sequence Log</h4>
        <div
          style={{
            height: '150px',
            overflowY: 'auto',
            backgroundColor: '#f8f8f8',
            padding: '10px',
            fontSize: '12px',
            borderRadius: '4px',
          }}
        >
          {logs.length === 0 ? (
            <div style={{ color: '#666', fontStyle: 'italic' }}>
              Try the sequences above to see them detected...
            </div>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '2px' }}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Accessibility demo
const AccessibilityDemo = () => {
  const [focusedElement, setFocusedElement] = useState<string>('button1');
  const [announcements, setAnnouncements] = useState<string[]>([]);

  const addAnnouncement = (message: string) => {
    setAnnouncements(prev => [...prev.slice(-4), message]);
  };

  useKeyboard({
    shortcuts: [
      {
        keys: 'Tab',
        callback: event => {
          // Don't prevent default Tab behavior
          addAnnouncement('Tab navigation detected');
        },
        preventDefault: false,
        description: 'Tab navigation',
      },
      {
        keys: 'ArrowRight',
        callback: () => {
          setFocusedElement(prev => {
            const elements = ['button1', 'button2', 'button3'];
            const currentIndex = elements.indexOf(prev);
            const nextIndex = (currentIndex + 1) % elements.length;
            const nextElement = elements[nextIndex];
            addAnnouncement(`Focused: ${nextElement}`);
            return nextElement;
          });
        },
        description: 'Move focus right',
      },
      {
        keys: 'ArrowLeft',
        callback: () => {
          setFocusedElement(prev => {
            const elements = ['button1', 'button2', 'button3'];
            const currentIndex = elements.indexOf(prev);
            const nextIndex =
              currentIndex === 0 ? elements.length - 1 : currentIndex - 1;
            const nextElement = elements[nextIndex];
            addAnnouncement(`Focused: ${nextElement}`);
            return nextElement;
          });
        },
        description: 'Move focus left',
      },
      {
        keys: 'Enter',
        callback: () => {
          addAnnouncement(`Activated: ${focusedElement}`);
        },
        description: 'Activate focused element',
      },
    ],
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h3>♿ Accessibility Features</h3>

      <div
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h4>⌨️ Keyboard Navigation</h4>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
          Use Arrow keys to navigate, Enter to activate, Tab for standard
          navigation.
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          {['button1', 'button2', 'button3'].map(id => (
            <button
              key={id}
              style={{
                padding: '10px 20px',
                backgroundColor: focusedElement === id ? '#007acc' : '#f0f0f0',
                color: focusedElement === id ? 'white' : 'black',
                border:
                  focusedElement === id
                    ? '2px solid #005a9e'
                    : '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                outline: focusedElement === id ? '2px solid #ff9500' : 'none',
                outlineOffset: '2px',
              }}
              aria-label={`Button ${id.slice(-1)}`}
              tabIndex={focusedElement === id ? 0 : -1}
            >
              {id.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '12px', color: '#666' }}>
          <strong>Instructions:</strong>
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            <li>← → Arrow keys to move focus</li>
            <li>Enter to activate focused button</li>
            <li>Tab for standard browser navigation</li>
          </ul>
        </div>
      </div>

      {/* Screen reader announcements */}
      <div
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '8px',
        }}
      >
        <h4>📢 Screen Reader Announcements</h4>
        <div
          role='status'
          aria-live='polite'
          style={{
            height: '100px',
            overflowY: 'auto',
            backgroundColor: '#f8f8f8',
            padding: '10px',
            fontSize: '12px',
            borderRadius: '4px',
          }}
        >
          {announcements.length === 0 ? (
            <div style={{ color: '#666', fontStyle: 'italic' }}>
              Use keyboard navigation to see announcements...
            </div>
          ) : (
            announcements.map((announcement, index) => (
              <div key={index} style={{ marginBottom: '2px' }}>
                {announcement}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const BasicUsage: Story = {
  render: () => <BasicKeyboardDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic keyboard shortcut handling with real-time key detection and dynamic shortcut management.',
      },
    },
  },
};

export const SequenceDetection: Story = {
  render: () => <SequenceDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Advanced sequence detection including VS Code shortcuts, Vim commands, and the famous Konami Code.',
      },
    },
  },
};

export const AccessibilityFeatures: Story = {
  render: () => <AccessibilityDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard navigation patterns for accessibility, including focus management and screen reader support.',
      },
    },
  },
};
