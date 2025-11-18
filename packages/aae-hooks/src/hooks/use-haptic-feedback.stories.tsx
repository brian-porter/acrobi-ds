import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { Button } from '../components/primitives/button';
import { Card } from '../components/primitives/card';
import {
  useHapticFeedback,
  HapticFeedbackOptions,
} from './use-haptic-feedback';

const meta: Meta = {
  title: 'Hooks/useHapticFeedback',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# useHapticFeedback Hook

A comprehensive React hook for implementing haptic feedback in Acrobi's Advanced Experienceslications using the Vibration API.

## Features

- **Vibration API Integration**: Full browser Vibration API support with capability detection
- **Pattern Library**: Predefined haptic patterns for common UI feedback scenarios
- **Battery Awareness**: Automatic vibration control based on device battery level
- **Custom Patterns**: Create and manage custom vibration sequences
- **Rate Limiting**: Prevents excessive vibration that could impact performance
- **Device Detection**: Automatic mobile/tablet/desktop device type detection
- **TypeScript Support**: Full TypeScript interfaces and type safety

## Usage

\`\`\`tsx
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';

function MyComponent() {
  const { 
    state, 
    success, 
    error, 
    warning,
    vibrate,
    playPattern,
    setIntensity 
  } = useHapticFeedback({
    enabled: true,
    intensity: 0.8,
    respectBatteryLevel: true,
    onVibrationStart: (pattern, duration) => {
      console.log(\`Started \${pattern} for \${duration}ms\`);
    }
  });

  return (
    <div>
      <Button onClick={success}>Success Feedback</Button>
      <Button onClick={error}>Error Feedback</Button>
      <Button onClick={() => vibrate([100, 50, 100])}>Custom Pattern</Button>
    </div>
  );
}
\`\`\`

**Note**: Haptic feedback requires a mobile device or browser that supports the Vibration API. On desktop browsers or unsupported devices, the buttons will still function but no vibration will occur.
        `,
      },
    },
  },
};

export default meta;

// Demo component for haptic feedback
function HapticFeedbackDemo({
  options = {},
}: {
  options?: HapticFeedbackOptions;
}) {
  const {
    state,
    error,
    vibrate,
    stop,
    patterns,
    playPattern,
    createPattern,
    removePattern,
    success,
    error: errorFeedback,
    warning,
    notification,
    light,
    medium,
    heavy,
    impact,
    selection,
    setIntensity,
    enable,
    disable,
    toggle,
    getBatteryInfo,
    isRateLimited,
    getRemainingCooldown,
  } = useHapticFeedback(options);

  const [batteryInfo, setBatteryInfo] = useState<{
    level: number;
    charging: boolean;
  } | null>(null);
  const [customPatternName, setCustomPatternName] = useState('');
  const [customPatternValue, setCustomPatternValue] = useState('100,50,100');
  const [intensityValue, setIntensityValue] = useState(1);

  useEffect(() => {
    const updateBatteryInfo = async () => {
      const info = await getBatteryInfo();
      setBatteryInfo(info);
    };
    updateBatteryInfo();
  }, [getBatteryInfo]);

  const handleCustomPattern = () => {
    if (customPatternName && customPatternValue) {
      try {
        const pattern = customPatternValue
          .split(',')
          .map(n => parseInt(n.trim()));
        createPattern(customPatternName, pattern);
        playPattern(customPatternName);
      } catch (err) {
        console.error('Invalid pattern format');
      }
    }
  };

  const handleIntensityChange = (value: number) => {
    setIntensityValue(value);
    setIntensity(value);
  };

  return (
    <div style={{ maxWidth: '800px', padding: '20px' }}>
      {/* Status Card */}
      <Card style={{ marginBottom: '20px', padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Haptic Feedback Status</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
          }}
        >
          <div>
            <strong>Support:</strong>{' '}
            {state.isSupported ? '✅ Supported' : '❌ Not Supported'}
          </div>
          <div>
            <strong>Enabled:</strong>{' '}
            {state.isEnabled ? '✅ Enabled' : '❌ Disabled'}
          </div>
          <div>
            <strong>Device:</strong> {state.deviceType}
          </div>
          <div>
            <strong>Can Vibrate:</strong>{' '}
            {state.canVibrate ? '✅ Yes' : '❌ No'}
          </div>
          <div>
            <strong>Vibrating:</strong>{' '}
            {state.isVibrating ? '🔄 Active' : '⭕ Inactive'}
          </div>
          <div>
            <strong>Count:</strong> {state.vibrationCount}
          </div>
          {batteryInfo && (
            <>
              <div>
                <strong>Battery:</strong> {Math.round(batteryInfo.level * 100)}%
              </div>
              <div>
                <strong>Charging:</strong>{' '}
                {batteryInfo.charging ? '🔌 Yes' : '🔋 No'}
              </div>
            </>
          )}
          {state.isLowBattery && (
            <div style={{ color: 'orange' }}>
              <strong>⚠️ Low Battery Mode Active</strong>
            </div>
          )}
          <div>
            <strong>Rate Limited:</strong>{' '}
            {isRateLimited() ? '⚠️ Yes' : '✅ No'}
          </div>
          <div>
            <strong>Cooldown:</strong> {getRemainingCooldown()}ms
          </div>
        </div>
        {error && (
          <div
            style={{
              marginTop: '12px',
              padding: '8px',
              backgroundColor: '#fee',
              border: '1px solid #fcc',
              borderRadius: '4px',
              color: '#c00',
            }}
          >
            <strong>Error:</strong> {error.message} ({error.type})
          </div>
        )}
      </Card>

      {/* Controls */}
      <Card style={{ marginBottom: '20px', padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Controls</h3>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '16px',
          }}
        >
          <Button onClick={enable} variant='outline' size='sm'>
            Enable
          </Button>
          <Button onClick={disable} variant='outline' size='sm'>
            Disable
          </Button>
          <Button onClick={toggle} variant='outline' size='sm'>
            Toggle
          </Button>
          <Button onClick={stop} variant='destructive' size='sm'>
            Stop All
          </Button>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            <strong>Intensity: {intensityValue.toFixed(1)}</strong>
          </label>
          <input
            type='range'
            min='0'
            max='1'
            step='0.1'
            value={intensityValue}
            onChange={e => handleIntensityChange(parseFloat(e.target.value))}
            style={{ width: '200px' }}
          />
        </div>
      </Card>

      {/* Basic Feedback */}
      <Card style={{ marginBottom: '20px', padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Basic Feedback</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button onClick={light} variant='outline'>
            Light (50ms)
          </Button>
          <Button onClick={medium} variant='outline'>
            Medium (100ms)
          </Button>
          <Button onClick={heavy} variant='outline'>
            Heavy (200ms)
          </Button>
        </div>
      </Card>

      {/* UI Feedback */}
      <Card style={{ marginBottom: '20px', padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>UI Feedback</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button onClick={success} variant='default'>
            ✅ Success
          </Button>
          <Button onClick={errorFeedback} variant='destructive'>
            ❌ Error
          </Button>
          <Button onClick={warning} variant='outline'>
            ⚠️ Warning
          </Button>
          <Button onClick={notification} variant='secondary'>
            🔔 Notification
          </Button>
        </div>
      </Card>

      {/* Game Feedback */}
      <Card style={{ marginBottom: '20px', padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Game Feedback</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button onClick={impact} variant='outline'>
            💥 Impact
          </Button>
          <Button onClick={selection} variant='outline'>
            👆 Selection
          </Button>
          <Button onClick={() => playPattern('heartbeat')} variant='outline'>
            💓 Heartbeat
          </Button>
          <Button
            onClick={() => playPattern('explosion')}
            variant='destructive'
          >
            💣 Explosion
          </Button>
        </div>
      </Card>

      {/* Communication Feedback */}
      <Card style={{ marginBottom: '20px', padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Communication Feedback</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button onClick={() => playPattern('incoming')} variant='default'>
            📞 Incoming
          </Button>
          <Button onClick={() => playPattern('outgoing')} variant='outline'>
            📤 Outgoing
          </Button>
          <Button onClick={() => playPattern('typing')} variant='outline'>
            ⌨️ Typing
          </Button>
          <Button onClick={() => playPattern('pulse')} variant='secondary'>
            📳 Pulse
          </Button>
        </div>
      </Card>

      {/* Custom Patterns */}
      <Card style={{ marginBottom: '20px', padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Custom Patterns</h3>
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '8px',
              flexWrap: 'wrap',
            }}
          >
            <input
              type='text'
              placeholder='Pattern name'
              value={customPatternName}
              onChange={e => setCustomPatternName(e.target.value)}
              style={{
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                minWidth: '120px',
              }}
            />
            <input
              type='text'
              placeholder='Pattern (e.g., 100,50,100)'
              value={customPatternValue}
              onChange={e => setCustomPatternValue(e.target.value)}
              style={{
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                minWidth: '200px',
              }}
            />
            <Button onClick={handleCustomPattern} size='sm'>
              Create & Test
            </Button>
          </div>
          <small style={{ color: '#666' }}>
            Enter comma-separated millisecond values (e.g., "100,50,100" for
            vibrate 100ms, pause 50ms, vibrate 100ms)
          </small>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button onClick={() => vibrate(100)} variant='outline' size='sm'>
            Simple (100ms)
          </Button>
          <Button
            onClick={() => vibrate([200, 100, 200])}
            variant='outline'
            size='sm'
          >
            Double Tap
          </Button>
          <Button
            onClick={() => vibrate([50, 50, 50, 50, 50])}
            variant='outline'
            size='sm'
          >
            Rapid Fire
          </Button>
          <Button
            onClick={() => vibrate([300, 200, 100, 100, 50])}
            variant='outline'
            size='sm'
          >
            Descending
          </Button>
        </div>
      </Card>

      {/* Pattern Library */}
      <Card style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Pattern Library</h3>
        <div style={{ fontSize: '14px', fontFamily: 'monospace' }}>
          {Object.entries(patterns).map(([name, pattern]) => (
            <div
              key={name}
              style={{
                marginBottom: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>{name}:</strong> [{pattern.join(', ')}]
                <span style={{ color: '#666', marginLeft: '8px' }}>
                  ({pattern.reduce((sum, dur) => sum + dur, 0)}ms total)
                </span>
              </div>
              <Button
                onClick={() => playPattern(name)}
                variant='ghost'
                size='sm'
                style={{ marginLeft: '8px' }}
              >
                Test
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

type Story = StoryObj<typeof HapticFeedbackDemo>;

export const Default: Story = {
  render: () => <HapticFeedbackDemo />,
  parameters: {
    docs: {
      description: {
        story: `
### Default Configuration

The default haptic feedback configuration with all features enabled. This story demonstrates:

- **Device capability detection** - Shows whether your device/browser supports haptic feedback
- **Status monitoring** - Real-time feedback state and battery information
- **Basic controls** - Enable/disable, intensity adjustment, and stop functionality
- **Pattern library** - All predefined haptic patterns organized by category
- **Custom patterns** - Create and test your own vibration sequences

**Mobile Testing**: This works best on mobile devices. On desktop browsers, you'll see the interface but no actual vibration will occur.
        `,
      },
    },
  },
};

export const BatteryAware: Story = {
  render: () => (
    <HapticFeedbackDemo
      options={{
        respectBatteryLevel: true,
        minBatteryLevel: 0.3,
        onBatteryLow: level => {
          console.log(`Battery low: ${Math.round(level * 100)}%`);
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Battery-Aware Haptic Feedback

This configuration demonstrates battery-aware haptic feedback that automatically disables vibration when the device battery is low:

- **Battery monitoring** - Continuously monitors device battery level
- **Low battery protection** - Disables haptic feedback when battery drops below 30%
- **Automatic adjustment** - Reduces vibration intensity based on battery level
- **User notification** - Alerts when entering low battery mode

**Features:**
- \`respectBatteryLevel: true\` - Enable battery awareness
- \`minBatteryLevel: 0.3\` - Disable haptics below 30% battery
- \`onBatteryLow\` callback - Handle low battery events

This helps preserve device battery life during critical low-power situations.
        `,
      },
    },
  },
};

export const ReducedIntensity: Story = {
  render: () => (
    <HapticFeedbackDemo
      options={{
        intensity: 0.5,
        maxFrequency: 5,
        cooldownTime: 200,
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Reduced Intensity & Rate Limited

This story demonstrates performance-optimized haptic feedback with reduced intensity and rate limiting:

- **50% intensity** - All vibrations are at half strength
- **Rate limiting** - Maximum 5 vibrations per second
- **Cooldown period** - 200ms minimum between vibrations
- **Performance optimized** - Prevents excessive vibration that could impact performance

**Use Cases:**
- Accessibility considerations for users sensitive to strong vibrations
- Performance-critical applications where haptic feedback should be subtle
- Battery-conscious implementations
- Games requiring frequent but gentle haptic feedback

Try rapidly clicking buttons to see the rate limiting in action.
        `,
      },
    },
  },
};

export const CustomPatterns: Story = {
  render: () => (
    <HapticFeedbackDemo
      options={{
        defaultPatterns: {
          success: [150, 75, 150], // Stronger success feedback
          error: [300, 150, 300, 150, 300], // More pronounced error
        },
        customPatterns: {
          morse_sos: [
            100, 100, 100, 100, 100, 300, 300, 100, 300, 100, 300, 300, 100,
            100, 100, 100, 100,
          ],
          heartbeat_fast: [80, 80, 80, 200],
          doorbell: [200, 200, 200, 200, 200],
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Custom Pattern Library

This story showcases custom haptic patterns including overridden defaults and completely custom sequences:

**Modified Default Patterns:**
- **Success**: Stronger feedback with 150ms vibrations
- **Error**: More pronounced error pattern

**Custom Patterns:**
- **Morse SOS**: A full SOS distress signal in Morse code
- **Fast Heartbeat**: Rapid heartbeat simulation
- **Doorbell**: Traditional doorbell chime pattern

**Pattern Format:**
Patterns are arrays of millisecond values where:
- **Odd indices** (1st, 3rd, 5th, etc.) = Vibration duration
- **Even indices** (2nd, 4th, 6th, etc.) = Pause duration

Example: \`[100, 50, 100]\` = Vibrate 100ms, pause 50ms, vibrate 100ms

Use the custom pattern creator to experiment with your own sequences!
        `,
      },
    },
  },
};

export const GameFeedback: Story = {
  render: () => {
    const [score, setScore] = useState(0);
    const [health, setHealth] = useState(100);

    const {
      playPattern,
      createPattern,
      success,
      impact,
      error: errorFeedback,
    } = useHapticFeedback({
      customPatterns: {
        level_up: [50, 25, 75, 25, 100, 25, 125],
        power_up: [25, 25, 50, 25, 75, 25, 100, 25, 125],
        hit_damage: [200, 100, 150, 50, 100],
        game_over: [500, 200, 500, 200, 500],
        coin_collect: [25, 25, 50],
        jump: [30],
        landing: [60, 30, 30],
      },
    });

    const handleAction = async (action: string) => {
      switch (action) {
        case 'jump':
          await playPattern('jump');
          break;
        case 'land':
          await playPattern('landing');
          break;
        case 'collect':
          setScore(score + 10);
          await playPattern('coin_collect');
          break;
        case 'powerup':
          await playPattern('power_up');
          break;
        case 'damage':
          const newHealth = Math.max(0, health - 20);
          setHealth(newHealth);
          if (newHealth === 0) {
            await playPattern('game_over');
          } else {
            await playPattern('hit_damage');
          }
          break;
        case 'levelup':
          await playPattern('level_up');
          break;
        case 'reset':
          setScore(0);
          setHealth(100);
          await success();
          break;
      }
    };

    return (
      <div style={{ maxWidth: '600px', padding: '20px' }}>
        <Card style={{ padding: '16px', marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 16px 0' }}>Game Feedback Demo</h3>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div>
              <strong>Score:</strong> {score}
            </div>
            <div>
              <strong>Health:</strong>
              <span
                style={{
                  color: health > 50 ? 'green' : health > 20 ? 'orange' : 'red',
                }}
              >
                {health}%
              </span>
            </div>
          </div>
        </Card>

        <Card style={{ padding: '16px', marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Movement Actions</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button onClick={() => handleAction('jump')} variant='outline'>
              🦘 Jump
            </Button>
            <Button onClick={() => handleAction('land')} variant='outline'>
              🛬 Land
            </Button>
          </div>
        </Card>

        <Card style={{ padding: '16px', marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Collection Actions</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button onClick={() => handleAction('collect')} variant='default'>
              🪙 Collect Coin (+10)
            </Button>
            <Button onClick={() => handleAction('powerup')} variant='secondary'>
              ⭐ Power Up
            </Button>
          </div>
        </Card>

        <Card style={{ padding: '16px', marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Combat Actions</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              onClick={() => handleAction('damage')}
              variant='destructive'
            >
              💥 Take Damage (-20)
            </Button>
          </div>
        </Card>

        <Card style={{ padding: '16px', marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Game Events</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button onClick={() => handleAction('levelup')} variant='default'>
              🎉 Level Up
            </Button>
            <Button onClick={() => handleAction('reset')} variant='outline'>
              🔄 Reset Game
            </Button>
          </div>
        </Card>

        <HapticFeedbackDemo />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### Game Haptic Feedback

This story demonstrates immersive haptic feedback patterns designed for gaming experiences:

**Game Patterns:**
- **Jump**: Quick 30ms tap for jump actions
- **Landing**: Double tap (60ms + 30ms) for landing feedback
- **Coin Collect**: Light triple tap for item collection
- **Power Up**: Ascending pattern for power-up feedback
- **Damage**: Strong descending pattern for taking damage
- **Level Up**: Complex ascending celebration pattern
- **Game Over**: Heavy triple vibration for defeat

**Interactive Elements:**
- Score tracking with haptic feedback on coin collection
- Health system with damage feedback
- Different patterns based on game state

This demonstrates how haptic feedback can enhance game immersion by providing tactile responses to in-game actions and events.
        `,
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <HapticFeedbackDemo
      options={{
        enabled: false,
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Disabled State

This story shows the hook behavior when haptic feedback is disabled by default:

- All vibration functions return \`false\`
- No actual vibration occurs
- State correctly reflects disabled status
- Can be re-enabled using the Enable button

**Use Cases:**
- User preference settings to disable haptics
- Accessibility considerations
- Testing non-haptic fallback behaviors
- Performance-critical scenarios where haptics should be off by default

The interface remains fully functional, allowing users to enable haptics when desired.
        `,
      },
    },
  },
};
