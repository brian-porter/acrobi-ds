/**
 * Haptic Feedback Hook Stories
 * Epic 61 - AAE Haptic Feedback System
 *
 * Comprehensive Storybook stories demonstrating theme-aware haptic feedback
 * with predefined patterns and custom vibration capabilities.
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  useHaptics,
  HapticUtils,
  HapticTokens,
  HapticPattern,
} from './use-haptics';

const meta: Meta = {
  title: 'Hooks/useHaptics',
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive haptic feedback hook that provides theme-aware tactile feedback using the Vibration API with predefined patterns and custom vibration capabilities.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Haptic Feedback Component for Stories
const HapticFeedbackDemo: React.FC<{ options?: any }> = ({ options }) => {
  const {
    state,
    trigger,
    triggerPattern,
    cancel,
    isSupported,
    getAvailableTokens,
    getPatternForToken,
    testPattern,
    refreshThemePatterns,
  } = useHaptics(options);

  const [customPattern, setCustomPattern] = useState<string>('10,30,10');
  const [selectedToken, setSelectedToken] =
    useState<keyof HapticTokens>('click');
  const [hapticHistory, setHapticHistory] = useState<
    Array<{
      timestamp: string;
      type: string;
      pattern: HapticPattern;
      token?: string;
    }>
  >([]);

  const [debugMode, setDebugMode] = useState(false);
  const [respectReducedMotion, setRespectReducedMotion] = useState(true);

  // Track haptic triggers
  useEffect(() => {
    if (state.lastTriggered || state.lastPattern) {
      const entry = {
        timestamp: new Date().toLocaleTimeString(),
        type: state.lastTriggered ? 'Token' : 'Pattern',
        pattern: state.lastPattern || [],
        token: state.lastTriggered || undefined,
      };

      setHapticHistory(prev => [entry, ...prev.slice(0, 9)]); // Keep last 10 entries
    }
  }, [state.lastTriggered, state.lastPattern, state.triggeredCount]);

  const tokens = getAvailableTokens();
  const browserSupport = HapticUtils.getBrowserSupport();
  const recommendations = HapticUtils.getUsageRecommendations();
  const accessibilityGuidelines = HapticUtils.getAccessibilityGuidelines();

  const handleCustomPatternTrigger = () => {
    try {
      const pattern = HapticUtils.parsePattern(customPattern);
      if (HapticUtils.isValidPattern(pattern)) {
        testPattern(pattern);
      } else {
        alert(
          'Invalid pattern format. Use numbers separated by commas (e.g., "10,30,10")'
        );
      }
    } catch (error) {
      alert('Failed to parse pattern: ' + error);
    }
  };

  const getTokenPatternDisplay = (token: keyof HapticTokens) => {
    const pattern = getPatternForToken(token);
    return pattern ? HapticUtils.formatPattern(pattern) : 'Not available';
  };

  const getVibrationIcon = () => {
    if (!isSupported) return '🚫';
    if (state.isVibrating) return '📳';
    return '📱';
  };

  const getStatusColor = () => {
    if (!isSupported) return '#f44336';
    if (state.isVibrating) return '#ff9800';
    return '#4caf50';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px' }}>
      <h2>Haptic Feedback Demo</h2>

      {/* Browser Support Warning */}
      {!isSupported && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#ffeb3b',
            border: '2px solid #ff9800',
            borderRadius: '8px',
            marginBottom: '20px',
            fontWeight: 'bold',
            color: '#e65100',
          }}
        >
          ⚠️ Haptic feedback (Vibration API) is not supported in this browser or
          device.
        </div>
      )}

      {/* Current Status */}
      <div
        style={{
          padding: '20px',
          backgroundColor: getStatusColor() + '20',
          border: `2px solid ${getStatusColor()}`,
          borderRadius: '12px',
          marginBottom: '20px',
        }}
      >
        <h3
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '0 0 15px 0',
          }}
        >
          {getVibrationIcon()} Haptic Status
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
          }}
        >
          <div>
            <strong>Supported:</strong>
            <br />
            <span
              style={{
                color: getStatusColor(),
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              {isSupported ? '✅ Yes' : '❌ No'}
            </span>
          </div>

          <div>
            <strong>Currently Vibrating:</strong>
            <br />
            <span
              style={{
                color: state.isVibrating ? '#ff9800' : '#4caf50',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              {state.isVibrating ? '📳 Yes' : '⭕ No'}
            </span>
          </div>

          <div>
            <strong>Last Triggered:</strong>
            <br />
            <span style={{ fontFamily: 'monospace', fontSize: '16px' }}>
              {state.lastTriggered || 'None'}
            </span>
          </div>

          <div>
            <strong>Total Triggered:</strong>
            <br />
            <span style={{ fontFamily: 'monospace', fontSize: '16px' }}>
              {state.triggeredCount}
            </span>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div style={{ marginBottom: '20px' }}>
        <h3>⚙️ Settings</h3>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <label
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <input
              type='checkbox'
              checked={debugMode}
              onChange={e => setDebugMode(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            Debug Mode
          </label>

          <label
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <input
              type='checkbox'
              checked={respectReducedMotion}
              onChange={e => setRespectReducedMotion(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            Respect Reduced Motion
          </label>

          <button
            onClick={refreshThemePatterns}
            style={{
              padding: '8px 16px',
              backgroundColor: '#9c27b0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🔄 Refresh Theme Patterns
          </button>

          <button
            onClick={cancel}
            disabled={!state.isVibrating}
            style={{
              padding: '8px 16px',
              backgroundColor: !state.isVibrating ? '#ccc' : '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !state.isVibrating ? 'not-allowed' : 'pointer',
            }}
          >
            ⏹️ Cancel Vibration
          </button>
        </div>
      </div>

      {/* Haptic Tokens */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🎯 Haptic Tokens</h3>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          Predefined haptic patterns from the theme system. Click to trigger
          each pattern.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
          }}
        >
          {tokens.map(token => (
            <div
              key={token}
              style={{
                padding: '15px',
                border:
                  selectedToken === token
                    ? '2px solid #2196f3'
                    : '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor:
                  selectedToken === token ? '#e3f2fd' : '#f9f9f9',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedToken(token as keyof HapticTokens)}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <strong style={{ textTransform: 'capitalize' }}>{token}</strong>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  {getTokenPatternDisplay(token as keyof HapticTokens)}
                </span>
              </div>

              <button
                onClick={e => {
                  e.stopPropagation();
                  trigger(token as keyof HapticTokens);
                }}
                disabled={!isSupported}
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  backgroundColor: !isSupported ? '#ccc' : '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: !isSupported ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                }}
              >
                📳 Trigger {token}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Patterns */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🎨 Custom Patterns</h3>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          Create and test custom vibration patterns. Enter comma-separated
          numbers (vibration durations in milliseconds).
        </p>

        <div
          style={{
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
              }}
            >
              Pattern (e.g., "10,30,10" for short-pause-short):
            </label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type='text'
                value={customPattern}
                onChange={e => setCustomPattern(e.target.value)}
                placeholder='10,30,10'
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontFamily: 'monospace',
                }}
              />
              <button
                onClick={handleCustomPatternTrigger}
                disabled={!isSupported || !customPattern.trim()}
                style={{
                  padding: '8px 16px',
                  backgroundColor:
                    !isSupported || !customPattern.trim() ? '#ccc' : '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor:
                    !isSupported || !customPattern.trim()
                      ? 'not-allowed'
                      : 'pointer',
                }}
              >
                🧪 Test Pattern
              </button>
            </div>
          </div>

          <div style={{ fontSize: '14px', color: '#666' }}>
            <strong>Examples:</strong>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li>
                <code>50</code> - Single 50ms vibration
              </li>
              <li>
                <code>10,30,10</code> - Short-pause-short pattern
              </li>
              <li>
                <code>100,50,100,50,100</code> - Pulse pattern
              </li>
              <li>
                <code>200</code> - Long vibration
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pattern History */}
      <div style={{ marginBottom: '20px' }}>
        <h3>📊 Haptic History</h3>
        <div
          style={{
            maxHeight: '250px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        >
          {hapticHistory.map((entry, index) => (
            <div
              key={index}
              style={{
                padding: '12px',
                borderBottom:
                  index < hapticHistory.length - 1 ? '1px solid #eee' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              <div>
                <strong>{entry.timestamp}</strong> - {entry.type}
                {entry.token && (
                  <span style={{ color: '#2196f3' }}> ({entry.token})</span>
                )}
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: '#666',
                  backgroundColor: '#fff',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                {HapticUtils.formatPattern(entry.pattern)}
              </div>
            </div>
          ))}

          {hapticHistory.length === 0 && (
            <div
              style={{
                padding: '20px',
                textAlign: 'center',
                color: '#666',
                fontStyle: 'italic',
              }}
            >
              No haptic feedback triggered yet. Try clicking the buttons above!
            </div>
          )}
        </div>
      </div>

      {/* Browser Support */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🌐 Browser Support</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '10px',
          }}
        >
          {Object.entries(browserSupport).map(([browser, support]) => (
            <div
              key={browser}
              style={{
                padding: '10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              <strong style={{ textTransform: 'capitalize' }}>
                {browser}:
              </strong>
              <br />
              {support}
            </div>
          ))}
        </div>
      </div>

      {/* Usage Recommendations */}
      <div style={{ marginBottom: '20px' }}>
        <h3>💡 Usage Recommendations</h3>
        <div
          style={{
            fontSize: '14px',
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {recommendations.map((tip, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Accessibility Guidelines */}
      <div style={{ marginBottom: '20px' }}>
        <h3>♿ Accessibility Guidelines</h3>
        <div
          style={{
            fontSize: '14px',
            backgroundColor: '#fff3e0',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #ff9800',
          }}
        >
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {accessibilityGuidelines.map((guideline, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                {guideline}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Technical Details */}
      <div>
        <h3>🔧 Technical Details</h3>
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <strong>API Support:</strong>{' '}
            {isSupported ? '✅ Available' : '❌ Not Available'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Reduced Motion:</strong>{' '}
            {HapticUtils.prefersReducedMotion() ? '⚠️ Enabled' : '✅ Disabled'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Available Tokens:</strong> {tokens.length}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Pattern Validation:</strong>{' '}
            {HapticUtils.isValidPattern([10, 30, 10])
              ? '✅ Working'
              : '❌ Failed'}
          </div>
          <div>
            <strong>Default Patterns:</strong>
            <pre
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {JSON.stringify(HapticUtils.getDefaultPatterns(), null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// Basic Haptic Feedback Story
export const BasicHapticFeedback: Story = {
  render: () => <HapticFeedbackDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic haptic feedback functionality with predefined patterns, custom pattern testing, and comprehensive device compatibility checking.',
      },
    },
  },
};

// Interactive Haptic Patterns Story
export const InteractiveHapticPatterns: Story = {
  render: () => {
    const InteractiveDemo: React.FC = () => {
      const haptics = useHaptics({
        debug: true,
        respectReducedMotion: true,
      });

      const [feedback, setFeedback] = useState<string>('');
      const [intensity, setIntensity] = useState<
        'subtle' | 'medium' | 'strong'
      >('medium');

      const presetPatterns = {
        subtle: {
          success: [10, 20, 10],
          error: [30, 10, 30],
          click: [5],
          notification: [15, 10, 15],
        },
        medium: {
          success: [20, 30, 20],
          error: [50, 20, 50, 20, 50],
          click: [10],
          notification: [30, 20, 30],
        },
        strong: {
          success: [50, 40, 50],
          error: [100, 30, 100, 30, 100],
          click: [25],
          notification: [60, 30, 60],
        },
      };

      const handlePatternTrigger = (patternType: string) => {
        const patterns = presetPatterns[intensity];
        const pattern = patterns[patternType as keyof typeof patterns];

        if (pattern) {
          haptics.triggerPattern(pattern);
          setFeedback(
            `Triggered ${intensity} ${patternType} pattern: [${pattern.join(', ')}]`
          );
        }
      };

      const interactionDemos = [
        {
          name: 'Button Click',
          pattern: 'click',
          icon: '👆',
          description: 'Light tap for button interactions',
        },
        {
          name: 'Success Action',
          pattern: 'success',
          icon: '✅',
          description: 'Positive feedback for completed actions',
        },
        {
          name: 'Error Alert',
          pattern: 'error',
          icon: '❌',
          description: 'Alert pattern for errors and warnings',
        },
        {
          name: 'Notification',
          pattern: 'notification',
          icon: '🔔',
          description: 'Pattern for incoming notifications',
        },
      ];

      return (
        <div style={{ padding: '20px', maxWidth: '800px' }}>
          <h3>🎮 Interactive Haptic Patterns</h3>

          {!haptics.isSupported && (
            <div
              style={{
                padding: '15px',
                backgroundColor: '#ffebee',
                border: '2px solid #f44336',
                borderRadius: '8px',
                marginBottom: '20px',
                color: '#c62828',
              }}
            >
              <strong>📵 Haptic feedback not available:</strong> This
              device/browser doesn't support the Vibration API.
            </div>
          )}

          {/* Intensity Selector */}
          <div style={{ marginBottom: '20px' }}>
            <h4>⚡ Intensity Level:</h4>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              {(['subtle', 'medium', 'strong'] as const).map(level => (
                <button
                  key={level}
                  onClick={() => setIntensity(level)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor:
                      intensity === level ? '#2196f3' : '#f5f5f5',
                    color: intensity === level ? 'white' : '#333',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    fontWeight: intensity === level ? 'bold' : 'normal',
                  }}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Interaction Demos */}
          <div style={{ marginBottom: '20px' }}>
            <h4>🎯 UI Interaction Demos:</h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px',
              }}
            >
              {interactionDemos.map(demo => (
                <div
                  key={demo.name}
                  style={{
                    padding: '15px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                    {demo.icon}
                  </div>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {demo.name}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#666',
                      marginBottom: '10px',
                    }}
                  >
                    {demo.description}
                  </div>
                  <button
                    onClick={() => handlePatternTrigger(demo.pattern)}
                    disabled={!haptics.isSupported}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      backgroundColor: !haptics.isSupported
                        ? '#ccc'
                        : '#4caf50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: !haptics.isSupported ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    Feel {demo.name}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Display */}
          {feedback && (
            <div
              style={{
                padding: '15px',
                backgroundColor: '#e8f5e8',
                border: '1px solid #4caf50',
                borderRadius: '8px',
                marginBottom: '20px',
              }}
            >
              <h5>📳 Last Action:</h5>
              <p
                style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px' }}
              >
                {feedback}
              </p>
            </div>
          )}

          {/* Current State */}
          <div
            style={{
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            <h5>📊 Current State:</h5>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '10px',
              }}
            >
              <div>
                <strong>Intensity:</strong> {intensity}
              </div>
              <div>
                <strong>Vibrating:</strong>{' '}
                {haptics.state.isVibrating ? '📳 Yes' : '⭕ No'}
              </div>
              <div>
                <strong>Total Triggers:</strong> {haptics.state.triggeredCount}
              </div>
              <div>
                <strong>Last Pattern:</strong>{' '}
                {haptics.state.lastPattern
                  ? HapticUtils.formatPattern(haptics.state.lastPattern)
                  : 'None'}
              </div>
            </div>
          </div>
        </div>
      );
    };

    return <InteractiveDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demonstration of haptic patterns with intensity levels and UI interaction scenarios.',
      },
    },
  },
};

// Accessibility & Reduced Motion Story
export const AccessibilityAndReducedMotion: Story = {
  render: () => {
    const AccessibilityDemo: React.FC = () => {
      const [respectReducedMotion, setRespectReducedMotion] = useState(true);
      const [showVisualFeedback, setShowVisualFeedback] = useState(true);
      const [feedbackMessages, setFeedbackMessages] = useState<string[]>([]);

      const haptics = useHaptics({
        respectReducedMotion,
        debug: true,
      });

      const addFeedbackMessage = (message: string) => {
        setFeedbackMessages(prev => [
          `${new Date().toLocaleTimeString()}: ${message}`,
          ...prev.slice(0, 4), // Keep last 5 messages
        ]);
      };

      const handleAccessibleAction = (
        actionType: string,
        hapticToken: keyof HapticTokens
      ) => {
        // Trigger haptic feedback
        haptics.trigger(hapticToken);

        // Show visual feedback
        if (showVisualFeedback) {
          addFeedbackMessage(
            `${actionType} completed ${haptics.isSupported ? '(with haptic feedback)' : '(visual feedback only)'}`
          );
        }

        // Could also trigger audio feedback here
        // playAudioFeedback(actionType);
      };

      const testActions = [
        {
          name: 'Save Document',
          token: 'success',
          icon: '💾',
          color: '#4caf50',
        },
        { name: 'Delete Item', token: 'error', icon: '🗑️', color: '#f44336' },
        {
          name: 'Send Message',
          token: 'notification',
          icon: '📤',
          color: '#2196f3',
        },
        {
          name: 'Toggle Setting',
          token: 'click',
          icon: '⚙️',
          color: '#9c27b0',
        },
      ];

      return (
        <div style={{ padding: '20px', maxWidth: '800px' }}>
          <h3>♿ Accessibility & Reduced Motion</h3>

          <div style={{ marginBottom: '20px' }}>
            <h4>🔧 Accessibility Settings:</h4>
            <div
              style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '15px',
                flexWrap: 'wrap',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type='checkbox'
                  checked={respectReducedMotion}
                  onChange={e => setRespectReducedMotion(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Respect Reduced Motion Preference
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type='checkbox'
                  checked={showVisualFeedback}
                  onChange={e => setShowVisualFeedback(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Show Visual Feedback
              </label>
            </div>
          </div>

          {/* Current Motion Preference */}
          <div
            style={{
              padding: '15px',
              backgroundColor: HapticUtils.prefersReducedMotion()
                ? '#fff3e0'
                : '#e8f5e8',
              border: `2px solid ${HapticUtils.prefersReducedMotion() ? '#ff9800' : '#4caf50'}`,
              borderRadius: '8px',
              marginBottom: '20px',
            }}
          >
            <h4>🎭 Motion Preference Detection:</h4>
            <p>
              <strong>System Preference:</strong>{' '}
              {HapticUtils.prefersReducedMotion() ? (
                <span style={{ color: '#ff9800' }}>⚠️ Reduce Motion</span>
              ) : (
                <span style={{ color: '#4caf50' }}>✅ Allow Motion</span>
              )}
            </p>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              {HapticUtils.prefersReducedMotion()
                ? 'User has enabled reduced motion preference. Haptic feedback will be disabled when "Respect Reduced Motion" is enabled.'
                : 'User allows motion and animations. Haptic feedback is available when supported.'}
            </p>
          </div>

          {/* Accessible Action Buttons */}
          <div style={{ marginBottom: '20px' }}>
            <h4>🎯 Accessible Actions with Multi-Modal Feedback:</h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px',
              }}
            >
              {testActions.map(action => (
                <button
                  key={action.name}
                  onClick={() =>
                    handleAccessibleAction(action.name, action.token)
                  }
                  style={{
                    padding: '15px',
                    backgroundColor: action.color,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  aria-label={`${action.name} - Provides haptic and visual feedback`}
                >
                  <span style={{ fontSize: '24px' }}>{action.icon}</span>
                  {action.name}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Log */}
          {showVisualFeedback && (
            <div style={{ marginBottom: '20px' }}>
              <h4>📋 Visual Feedback Log:</h4>
              <div
                style={{
                  minHeight: '120px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                  padding: '10px',
                }}
              >
                {feedbackMessages.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '8px',
                      marginBottom: '5px',
                      backgroundColor: '#fff',
                      borderRadius: '4px',
                      fontSize: '14px',
                      border: '1px solid #eee',
                    }}
                  >
                    {message}
                  </div>
                ))}

                {feedbackMessages.length === 0 && (
                  <div
                    style={{
                      padding: '20px',
                      textAlign: 'center',
                      color: '#666',
                      fontStyle: 'italic',
                    }}
                  >
                    Visual feedback messages will appear here...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Accessibility Guidelines */}
          <div style={{ marginBottom: '20px' }}>
            <h4>📚 Implemented Accessibility Features:</h4>
            <div
              style={{
                fontSize: '14px',
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
              }}
            >
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Reduced Motion Respect:</strong> Haptic feedback is
                  disabled when user prefers reduced motion
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Visual Alternatives:</strong> All actions provide
                  visual feedback alongside haptic feedback
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Graceful Degradation:</strong> Actions work fully even
                  when haptic feedback is unavailable
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>ARIA Labels:</strong> Buttons include descriptive
                  labels for screen readers
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>User Control:</strong> Users can toggle accessibility
                  features on/off
                </li>
                <li>
                  <strong>Multi-Modal Feedback:</strong> Combines haptic,
                  visual, and semantic feedback patterns
                </li>
              </ul>
            </div>
          </div>

          {/* Status Summary */}
          <div
            style={{
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            <h5>📊 Current Accessibility Status:</h5>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px',
              }}
            >
              <div>
                <strong>Haptic Support:</strong>{' '}
                {haptics.isSupported ? '✅ Available' : '❌ Not Available'}
              </div>
              <div>
                <strong>Reduced Motion:</strong>{' '}
                {HapticUtils.prefersReducedMotion()
                  ? '⚠️ Enabled'
                  : '✅ Disabled'}
              </div>
              <div>
                <strong>Respecting Preference:</strong>{' '}
                {respectReducedMotion ? '✅ Yes' : '❌ No'}
              </div>
              <div>
                <strong>Visual Feedback:</strong>{' '}
                {showVisualFeedback ? '✅ Enabled' : '❌ Disabled'}
              </div>
            </div>
          </div>
        </div>
      );
    };

    return <AccessibilityDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates accessibility features including reduced motion support, visual feedback alternatives, and multi-modal interaction patterns.',
      },
    },
  },
};

// Theme Integration Story
export const ThemeIntegration: Story = {
  render: () => {
    const ThemeDemo: React.FC = () => {
      const [currentTheme, setCurrentTheme] = useState<'acrobi' | 'custom'>(
        'acrobi'
      );
      const [customPatterns, setCustomPatterns] = useState({
        click: '15',
        success: '20,40,20',
        error: '80,30,80,30,80',
        warning: '40,25,40',
        notification: '25,15,25,15,25',
      });

      const haptics = useHaptics({ debug: true });

      // Apply custom theme patterns via CSS
      const applyCustomTheme = () => {
        const root = document.documentElement;
        Object.entries(customPatterns).forEach(([token, pattern]) => {
          root.style.setProperty(`--haptic-${token}`, pattern);
        });
        haptics.refreshThemePatterns();
      };

      // Reset to default theme
      const resetToDefaultTheme = () => {
        const root = document.documentElement;
        Object.keys(customPatterns).forEach(token => {
          root.style.removeProperty(`--haptic-${token}`);
        });
        haptics.refreshThemePatterns();
      };

      useEffect(() => {
        if (currentTheme === 'custom') {
          applyCustomTheme();
        } else {
          resetToDefaultTheme();
        }
      }, [currentTheme, customPatterns]);

      const handlePatternChange = (token: string, pattern: string) => {
        setCustomPatterns(prev => ({
          ...prev,
          [token]: pattern,
        }));
      };

      return (
        <div style={{ padding: '20px', maxWidth: '800px' }}>
          <h3>🎨 Theme Integration Demo</h3>

          <div style={{ marginBottom: '20px' }}>
            <h4>🎯 Theme Selection:</h4>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <button
                onClick={() => setCurrentTheme('acrobi')}
                style={{
                  padding: '10px 20px',
                  backgroundColor:
                    currentTheme === 'acrobi' ? '#2196f3' : '#f5f5f5',
                  color: currentTheme === 'acrobi' ? 'white' : '#333',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Default Acrobi Theme
              </button>
              <button
                onClick={() => setCurrentTheme('custom')}
                style={{
                  padding: '10px 20px',
                  backgroundColor:
                    currentTheme === 'custom' ? '#2196f3' : '#f5f5f5',
                  color: currentTheme === 'custom' ? 'white' : '#333',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Custom Theme
              </button>
            </div>
          </div>

          {/* Custom Theme Editor */}
          {currentTheme === 'custom' && (
            <div style={{ marginBottom: '20px' }}>
              <h4>⚙️ Custom Pattern Editor:</h4>
              <div
                style={{
                  padding: '15px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                }}
              >
                {Object.entries(customPatterns).map(([token, pattern]) => (
                  <div
                    key={token}
                    style={{
                      marginBottom: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                    }}
                  >
                    <label
                      style={{
                        minWidth: '100px',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {token}:
                    </label>
                    <input
                      type='text'
                      value={pattern}
                      onChange={e => handlePatternChange(token, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        fontFamily: 'monospace',
                      }}
                      placeholder='e.g., 10,30,10'
                    />
                    <button
                      onClick={() =>
                        haptics.trigger(token as keyof HapticTokens)
                      }
                      disabled={!haptics.isSupported}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: !haptics.isSupported
                          ? '#ccc'
                          : '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: !haptics.isSupported
                          ? 'not-allowed'
                          : 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      Test
                    </button>
                  </div>
                ))}

                <div
                  style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}
                >
                  <strong>Pattern Format:</strong> Use comma-separated numbers
                  for vibration durations in milliseconds.
                  <br />
                  <strong>Examples:</strong> "50" (single), "10,30,10"
                  (pattern), "100,50,100,50,100" (pulse)
                </div>
              </div>
            </div>
          )}

          {/* Theme Comparison */}
          <div style={{ marginBottom: '20px' }}>
            <h4>🔍 Current Theme Patterns:</h4>
            <div
              style={{
                padding: '15px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            >
              {Object.keys(customPatterns).map(token => {
                const pattern = haptics.getPatternForToken(
                  token as keyof HapticTokens
                );
                return (
                  <div
                    key={token}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 0',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {token}:
                    </span>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        color: '#666',
                      }}
                    >
                      {pattern
                        ? HapticUtils.formatPattern(pattern)
                        : 'Not available'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CSS Variables Display */}
          <div style={{ marginBottom: '20px' }}>
            <h4>🔧 CSS Custom Properties:</h4>
            <div
              style={{
                padding: '15px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
            >
              <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                Current CSS Variables:
              </div>
              {Object.keys(customPatterns).map(token => {
                const cssVar = `--haptic-${token}`;
                const value = getComputedStyle(document.documentElement)
                  .getPropertyValue(cssVar)
                  .trim();
                return (
                  <div key={token} style={{ marginBottom: '5px' }}>
                    <span style={{ color: '#9c27b0' }}>{cssVar}</span>:
                    <span style={{ color: '#2196f3', marginLeft: '8px' }}>
                      {value || 'not set'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Integration Example */}
          <div>
            <h4>💡 Theme Integration Example:</h4>
            <div
              style={{
                padding: '15px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            >
              <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                CSS Theme Definition:
              </div>
              <pre
                style={{
                  backgroundColor: '#fff',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  overflow: 'auto',
                }}
              >{`[data-theme="acrobi"] {
  --haptic-click: 10;
  --haptic-success: 10,30,10;
  --haptic-error: 50,20,50,20,50;
  --haptic-warning: 30,20,30;
  --haptic-notification: 20,10,20,10,20;
}

[data-theme="gentle"] {
  --haptic-click: 5;
  --haptic-success: 8,15,8;
  --haptic-error: 25,10,25,10,25;
  --haptic-warning: 15,10,15;
  --haptic-notification: 10,5,10,5,10;
}`}</pre>

              <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                React Usage:
              </div>
              <pre
                style={{
                  backgroundColor: '#fff',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  overflow: 'auto',
                }}
              >{`const { trigger } = useHaptics();

// Triggers theme-defined pattern
trigger('success');`}</pre>
            </div>
          </div>
        </div>
      );
    };

    return <ThemeDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates theme integration with CSS custom properties, allowing haptic patterns to be defined at the theme level and customizable by users.',
      },
    },
  },
};
