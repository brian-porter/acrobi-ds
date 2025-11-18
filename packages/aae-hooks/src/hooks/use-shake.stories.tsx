/**
 * @fileoverview Shake Gesture Hook Stories for Epic 63
 * Interactive demonstrations of shake gesture detection and patterns
 */

import React, { useState, useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useShake, ShakeEvent, ShakeUtils } from './use-shake';

const meta: Meta = {
  title: 'Hooks/useShake',
  parameters: {
    docs: {
      description: {
        component:
          'Hook for shake gesture detection using device motion sensors. Provides pattern recognition for single, double, triple, and continuous shake gestures.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Basic Shake Demo
const BasicShakeDemo: React.FC = () => {
  const [shakeEvents, setShakeEvents] = useState<ShakeEvent[]>([]);
  const [currentPreset, setCurrentPreset] = useState<
    'normal' | 'gentle' | 'aggressive' | 'gaming'
  >('normal');

  const presets = ShakeUtils.getPresets();

  const {
    state,
    isSupported,
    start,
    stop,
    reset,
    getCurrentIntensity,
    getAverageIntensity,
    isShaking,
    setThreshold,
    setTimeWindow,
  } = useShake({
    ...presets[currentPreset],
    debug: true,
    onShake: event => {
      setShakeEvents(prev => [event, ...prev.slice(0, 19)]); // Keep last 20 events
      console.log('Shake detected:', event);
    },
    onSingleShake: event => {
      console.log('Single shake:', event);
    },
    onDoubleShake: event => {
      console.log('Double shake:', event);
    },
    onTripleShake: event => {
      console.log('Triple shake:', event);
    },
    onContinuousShake: event => {
      console.log('Continuous shake:', event);
    },
    onDetectionStart: () => {
      console.log('Shake detection started');
    },
    onDetectionStop: () => {
      console.log('Shake detection stopped');
    },
  });

  // Update settings when preset changes
  useEffect(() => {
    const preset = presets[currentPreset];
    setThreshold(preset.threshold);
    setTimeWindow(preset.timeWindow);
  }, [currentPreset, setThreshold, setTimeWindow]);

  const handleStart = () => {
    if (!state.isActive) {
      start();
    }
  };

  const handleStop = () => {
    stop();
  };

  const handleReset = () => {
    reset();
    setShakeEvents([]);
  };

  const currentIntensity = getCurrentIntensity();
  const averageIntensity = getAverageIntensity();
  const currentlyShaking = isShaking();

  const getPatternIcon = (pattern: string) => {
    switch (pattern) {
      case 'single':
        return '🤳';
      case 'double':
        return '🤳🤳';
      case 'triple':
        return '🤳🤳🤳';
      case 'continuous':
        return '🌪️';
      default:
        return '📱';
    }
  };

  const getPatternColor = (pattern: string) => {
    switch (pattern) {
      case 'single':
        return '#28a745';
      case 'double':
        return '#ffc107';
      case 'triple':
        return '#fd7e14';
      case 'continuous':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Shake Gesture Detection</h2>

      {!isSupported && (
        <div
          style={{
            padding: '10px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          ⚠️ Device Motion API is not supported in this browser
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        {/* Controls */}
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <h3>Controls</h3>

          <div style={{ marginBottom: '10px' }}>
            <strong>Supported:</strong> {isSupported ? '✅ Yes' : '❌ No'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Active:</strong> {state.isActive ? '🟢 Yes' : '🔴 No'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Detecting:</strong> {state.isDetecting ? '🎯 Yes' : '⭕ No'}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Total Shakes:</strong> {state.totalShakes}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Sensitivity Preset:
            </label>
            <select
              value={currentPreset}
              onChange={e => setCurrentPreset(e.target.value as any)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginBottom: '10px',
              }}
            >
              <option value='gentle'>Gentle (Easy to trigger)</option>
              <option value='normal'>Normal (Balanced)</option>
              <option value='aggressive'>Aggressive (Hard to trigger)</option>
              <option value='gaming'>Gaming (Very responsive)</option>
            </select>
          </div>

          {!state.isActive ? (
            <button
              onClick={handleStart}
              disabled={!isSupported}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: isSupported ? '#28a745' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSupported ? 'pointer' : 'not-allowed',
                marginBottom: '10px',
              }}
            >
              Start Shake Detection
            </button>
          ) : (
            <button
              onClick={handleStop}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '10px',
              }}
            >
              Stop Detection
            </button>
          )}

          <button
            onClick={handleReset}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Reset All Data
          </button>
        </div>

        {/* Current State */}
        <div
          style={{
            padding: '15px',
            backgroundColor: currentlyShaking ? '#fff3cd' : '#f9f9f9',
            borderRadius: '8px',
            border: `1px solid ${currentlyShaking ? '#ffc107' : '#ddd'}`,
            transition: 'all 0.3s ease',
          }}
        >
          <h3>Current Motion</h3>

          <div style={{ marginBottom: '15px' }}>
            <div
              style={{
                fontSize: '48px',
                textAlign: 'center',
                marginBottom: '10px',
                animation: currentlyShaking ? 'shake 0.5s infinite' : 'none',
              }}
            >
              {currentlyShaking ? '🤳' : '📱'}
            </div>
            <div
              style={{
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                color: currentlyShaking ? '#856404' : '#495057',
              }}
            >
              {currentlyShaking ? 'SHAKING!' : 'Idle'}
            </div>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Current Intensity:</strong> {currentIntensity.toFixed(2)}
            <div
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#e9ecef',
                borderRadius: '4px',
                overflow: 'hidden',
                marginTop: '5px',
              }}
            >
              <div
                style={{
                  width: `${Math.min(100, (currentIntensity / 30) * 100)}%`,
                  height: '100%',
                  backgroundColor:
                    currentIntensity > 20
                      ? '#dc3545'
                      : currentIntensity > 10
                        ? '#ffc107'
                        : '#28a745',
                  transition: 'all 0.2s ease',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Average Intensity:</strong> {averageIntensity.toFixed(2)}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Recent Shakes:</strong> {state.shakeCount}
          </div>

          {state.lastShake && (
            <div
              style={{
                marginTop: '15px',
                padding: '10px',
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            >
              <div style={{ fontSize: '12px', color: '#666' }}>Last Shake:</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '5px',
                }}
              >
                <span>
                  {getPatternIcon(state.lastShake.pattern)}{' '}
                  {state.lastShake.pattern}
                </span>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  {state.lastShake.intensity.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Shake Events History */}
      <div
        style={{
          marginBottom: '20px',
          border: '1px solid #ddd',
          borderRadius: '4px',
        }}
      >
        <div
          style={{
            padding: '10px',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #ddd',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>Shake Events History</span>
          <span style={{ fontSize: '12px', color: '#666' }}>
            {shakeEvents.length} events
          </span>
        </div>

        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {shakeEvents.length === 0 ? (
            <div
              style={{
                padding: '20px',
                textAlign: 'center',
                color: '#666',
              }}
            >
              Shake your device to see events appear here
            </div>
          ) : (
            shakeEvents.map((event, index) => (
              <div
                key={`${event.timestamp}-${index}`}
                style={{
                  padding: '10px',
                  borderBottom:
                    index < shakeEvents.length - 1 ? '1px solid #eee' : 'none',
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px' }}>
                      {getPatternIcon(event.pattern)}
                    </span>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>
                        {event.pattern.charAt(0).toUpperCase() +
                          event.pattern.slice(1)}{' '}
                        Shake
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        Direction: {event.direction} | Duration:{' '}
                        {event.duration}ms
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        padding: '2px 8px',
                        backgroundColor: getPatternColor(event.pattern),
                        color: 'white',
                        borderRadius: '10px',
                        fontSize: '11px',
                        marginBottom: '4px',
                      }}
                    >
                      {event.intensity.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '10px', color: '#666' }}>
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pattern Statistics */}
      {shakeEvents.length > 0 && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f0f8ff',
            borderRadius: '8px',
            border: '1px solid #b6d7ff',
          }}
        >
          <h3>Shake Pattern Analysis</h3>

          {(() => {
            const analysis = ShakeUtils.analyzePattern(shakeEvents);
            const patternCounts = shakeEvents.reduce(
              (acc, event) => {
                acc[event.pattern] = (acc[event.pattern] || 0) + 1;
                return acc;
              },
              {} as Record<string, number>
            );

            return (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                }}
              >
                <div>
                  <h4>Statistics</h4>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Average Intensity:</strong>{' '}
                    {analysis.averageIntensity.toFixed(2)}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Average Duration:</strong>{' '}
                    {analysis.averageDuration.toFixed(0)}ms
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Most Common Direction:</strong>{' '}
                    {analysis.mostCommonDirection}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Most Common Pattern:</strong>{' '}
                    {analysis.mostCommonPattern}
                  </div>
                </div>

                <div>
                  <h4>Pattern Distribution</h4>
                  {Object.entries(patternCounts).map(([pattern, count]) => {
                    const percentage = (count / shakeEvents.length) * 100;
                    return (
                      <div key={pattern} style={{ marginBottom: '8px' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span>
                            {getPatternIcon(pattern)} {pattern}
                          </span>
                          <span>
                            {count} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div
                          style={{
                            width: '100%',
                            height: '6px',
                            backgroundColor: '#e9ecef',
                            borderRadius: '3px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${percentage}%`,
                              height: '100%',
                              backgroundColor: getPatternColor(pattern),
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {!state.isActive && (
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#e7f3ff',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          <strong>Instructions:</strong> Start shake detection and shake your
          device to trigger events. Try different shake patterns: single shake,
          double shake (two quick shakes), triple shake, or continuous shaking.
          Adjust sensitivity presets to find what works best for your device.
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </div>
  );
};

// Shake Actions Demo
const ShakeActionsDemo: React.FC = () => {
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [currentContent, setCurrentContent] = useState<string>(
    'Welcome to the shake demo!'
  );
  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [emergencyActivated, setEmergencyActivated] = useState<boolean>(false);

  const { state, isSupported, start, stop } = useShake({
    threshold: 12,
    timeWindow: 1000,
    cooldown: 500,
    debug: false,
    onSingleShake: () => {
      // Undo last action
      if (undoStack.length > 0) {
        const lastContent = undoStack[undoStack.length - 1];
        setCurrentContent(lastContent);
        setUndoStack(prev => prev.slice(0, -1));
      }
    },
    onDoubleShake: () => {
      // Refresh content
      setRefreshCount(prev => prev + 1);
      const newContent = `Content refreshed! Count: ${refreshCount + 1}`;
      setUndoStack(prev => [...prev, currentContent]);
      setCurrentContent(newContent);
    },
    onTripleShake: () => {
      // Emergency action
      setEmergencyActivated(true);
      setUndoStack(prev => [...prev, currentContent]);
      setCurrentContent('🚨 EMERGENCY MODE ACTIVATED! 🚨');

      // Auto-reset after 3 seconds
      setTimeout(() => {
        setEmergencyActivated(false);
      }, 3000);
    },
  });

  const addContent = (content: string) => {
    setUndoStack(prev => [...prev, currentContent]);
    setCurrentContent(content);
  };

  const handleStart = () => {
    if (!state.isActive) {
      start();
    }
  };

  const contentOptions = [
    'This is some sample content.',
    "Here's a different message.",
    'Another piece of text to display.',
    'Something completely different.',
    'Yet another content option.',
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Shake-Controlled Actions</h2>

      {!isSupported && (
        <div
          style={{
            padding: '10px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          ⚠️ Device Motion API is not supported in this browser
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        {!state.isActive ? (
          <button
            onClick={handleStart}
            disabled={!isSupported}
            style={{
              padding: '10px 20px',
              backgroundColor: isSupported ? '#28a745' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isSupported ? 'pointer' : 'not-allowed',
            }}
          >
            Enable Shake Controls
          </button>
        ) : (
          <button
            onClick={stop}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Disable Shake Controls
          </button>
        )}
      </div>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
      >
        {/* Content Area */}
        <div
          style={{
            padding: '20px',
            backgroundColor: emergencyActivated ? '#f8d7da' : '#f8f9fa',
            borderRadius: '8px',
            border: `2px solid ${emergencyActivated ? '#dc3545' : '#dee2e6'}`,
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: emergencyActivated ? '#721c24' : '#495057',
                marginBottom: '10px',
              }}
            >
              {currentContent}
            </div>

            {state.isActive && (
              <div
                style={{
                  fontSize: '12px',
                  color: '#6c757d',
                  marginTop: '15px',
                }}
              >
                Status:{' '}
                {state.isDetecting
                  ? '🎯 Detecting shake...'
                  : '📱 Waiting for shake'}
              </div>
            )}
          </div>
        </div>

        {/* Controls & Actions */}
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <h3>Manual Controls</h3>

          <div style={{ marginBottom: '15px' }}>
            <h4>Add Content:</h4>
            {contentOptions.map((content, index) => (
              <button
                key={index}
                onClick={() => addContent(content)}
                style={{
                  width: '100%',
                  padding: '8px',
                  margin: '4px 0',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Set: "{content.substring(0, 30)}..."
              </button>
            ))}
          </div>

          <div
            style={{
              padding: '10px',
              backgroundColor: '#e7f3ff',
              borderRadius: '4px',
              marginBottom: '15px',
            }}
          >
            <h4>Shake Actions:</h4>
            <div style={{ fontSize: '12px', marginBottom: '8px' }}>
              🤳 <strong>Single Shake:</strong> Undo last action
            </div>
            <div style={{ fontSize: '12px', marginBottom: '8px' }}>
              🤳🤳 <strong>Double Shake:</strong> Refresh content
            </div>
            <div style={{ fontSize: '12px', marginBottom: '8px' }}>
              🤳🤳🤳 <strong>Triple Shake:</strong> Emergency mode
            </div>
          </div>

          <div
            style={{
              padding: '10px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
            }}
          >
            <h4>Statistics:</h4>
            <div style={{ fontSize: '12px', marginBottom: '4px' }}>
              <strong>Undo Stack:</strong> {undoStack.length} items
            </div>
            <div style={{ fontSize: '12px', marginBottom: '4px' }}>
              <strong>Refresh Count:</strong> {refreshCount}
            </div>
            <div style={{ fontSize: '12px', marginBottom: '4px' }}>
              <strong>Total Shakes:</strong> {state.totalShakes}
            </div>
            <div style={{ fontSize: '12px' }}>
              <strong>Emergency Mode:</strong>{' '}
              {emergencyActivated ? '🚨 Active' : '✅ Normal'}
            </div>
          </div>
        </div>
      </div>

      {!state.isActive && (
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#e7f3ff',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          <strong>Instructions:</strong> Enable shake controls and try different
          shake patterns:
          <ul style={{ marginTop: '8px', marginBottom: '0' }}>
            <li>Single shake to undo the last content change</li>
            <li>Double shake (two quick shakes) to refresh content</li>
            <li>
              Triple shake (three quick shakes) to activate emergency mode
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export const BasicDemo: Story = {
  render: () => <BasicShakeDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic shake gesture detection with customizable sensitivity presets. Shows real-time shake detection with pattern recognition and event history.',
      },
    },
  },
};

export const ShakeActions: Story = {
  render: () => <ShakeActionsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Practical demonstration of shake-controlled actions. Single shake for undo, double shake for refresh, and triple shake for emergency mode.',
      },
    },
  },
};
