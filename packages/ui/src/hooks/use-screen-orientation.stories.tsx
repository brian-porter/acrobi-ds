/**
 * @fileoverview Screen Orientation Hook Stories for Epic 63
 * Interactive demonstrations of screen orientation management
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useScreenOrientation, OrientationLockType } from './use-screen-orientation';

const meta: Meta = {
  title: "Hooks/useScreenOrientation',"
  parameters: {
    docs: {
      description: {
        component: 'Hook for managing screen orientation with lock/unlock capabilities. Enables orientation-aware layouts and features using the Screen Orientation API.'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Basic Screen Orientation Demo
const BasicOrientationDemo: React.FC = () => {
  const {
    state,
    error,
    lock,
    unlock,
    isSupported,
    clearError,
    getCurrentOrientation
  } = useScreenOrientation({
    debug: true,
    onChange: (orientation) => {
      console.log('Orientation changed:', orientation);
    },
    onLockSuccess: (orientation) => {
      console.log('Orientation locked to:', orientation);
    },
    onLockError: (error) => {
      console.error('Lock failed:', error);
    }
  });

  const [selectedLock, setSelectedLock] = useState<OrientationLockType>('portrait');

  const lockOptions: { value: OrientationLockType; label: string }[] = [
    { value: 'any', label: 'Any Orientation' },
    { value: 'natural', label: 'Natural' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'landscape', label: 'Landscape' },
    { value: 'portrait-primary', label: 'Portrait Primary' },
    { value: 'portrait-secondary', label: 'Portrait Secondary' },
    { value: 'landscape-primary', label: 'Landscape Primary' },
    { value: 'landscape-secondary', label: 'Landscape Secondary' }
  ];

  const handleLock = async () => {
    const success = await lock(selectedLock);
    if (!success) {
      console.error('Failed to lock orientation');
    }
  };

  const handleUnlock = async () => {
    const success = await unlock();
    if (!success) {
      console.error('Failed to unlock orientation');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Screen Orientation Control</h2>
      
      {!isSupported && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          ⚠️ Screen Orientation API is not supported in this browser
        </div>
      )}

      {error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <strong>Error:</strong> {error.message}
          <button 
            onClick={clearError}
            style={{ 
              marginLeft: '10px', 
              padding: '4px 8px',
              backgroundColor: '#f44',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Current State */}
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h3>Current State</h3>
          <div style={{ marginBottom: '10px' }}>
            <strong>Supported:</strong> {isSupported ? '✅ Yes' : '❌ No'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Type:</strong> {state.type || 'Unknown'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Angle:</strong> {state.angle}°
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Is Portrait:</strong> {state.isPortrait ? '✅' : '❌'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Is Landscape:</strong> {state.isLandscape ? '✅' : '❌'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Is Locked:</strong> {state.isLocked ? '🔒 Yes' : '🔓 No'}
          </div>
        </div>

        {/* Controls */}
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h3>Orientation Controls</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Lock Orientation:
            </label>
            <select 
              value={selectedLock}
              onChange={(e) => setSelectedLock(e.target.value as OrientationLockType)}
              style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '4px', 
                border: '1px solid #ccc',
                marginBottom: '10px'
              }}
            >
              {lockOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <button
              onClick={handleLock}
              disabled={!isSupported}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: isSupported ? '#007bff' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSupported ? 'pointer' : 'not-allowed',
                marginBottom: '10px'
              }}
            >
              🔒 Lock Orientation
            </button>
            
            <button
              onClick={handleUnlock}
              disabled={!isSupported}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: isSupported ? '#28a745' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSupported ? 'pointer' : 'not-allowed'
              }}
            >
              🔓 Unlock Orientation
            </button>
          </div>

          <div style={{ fontSize: '12px', color: '#666' }}>
            <strong>Note:</strong> Orientation lock may require fullscreen mode on some browsers.
            Try entering fullscreen (F11) before locking orientation.
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#f0f8ff', 
        borderRadius: '8px',
        border: '1px solid #b6d7ff'
      }}>
        <h3>Visual Orientation Indicator</h3>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '200px'
        }}>
          <div style={{
            width: state.isLandscape ? '200px' : '120px',
            height: state.isLandscape ? '120px' : '200px',
            backgroundColor: state.isLocked ? '#28a745' : '#007bff',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            position: 'relative'
          }}>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>
                📱
              </div>
              <div>{state.type}</div>
              <div>{state.angle}°</div>
              {state.isLocked && (
                <div style={{ 
                  position: 'absolute', 
                  top: '5px', 
                  right: '5px',
                  fontSize: '16px'
                }}>
                  🔒
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Orientation Change Listener Demo
const OrientationListenerDemo: React.FC = () => {
  const [events, setEvents] = useState<Array<{
    timestamp: number;
    type: string;
    angle: number;
    isPortrait: boolean;
    isLandscape: boolean;
  }>>([]);

  const { state, isSupported } = useScreenOrientation({
    debug: false,
    onChange: (orientation) => {
      setEvents(prev => [{
        timestamp: Date.now(),
        type: orientation.type || 'unknown',
        angle: orientation.angle,
        isPortrait: orientation.isPortrait,
        isLandscape: orientation.isLandscape
      }, ...prev.slice(0, 9)]); // Keep last 10 events
    }
  });

  const clearEvents = () => setEvents([]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Orientation Change Events</h2>
      
      {!isSupported && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          ⚠️ Screen Orientation API is not supported in this browser
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={clearEvents}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Events
        </button>
      </div>

      <div style={{ 
        maxHeight: '400px', 
        overflowY: 'auto',
        border: '1px solid #ddd',
        borderRadius: '4px'
      }}>
        {events.length === 0 ? (
          <div style={{ 
            padding: '20px', 
            textAlign: 'center', 
            color: '#666' 
          }}>
            Rotate your device to see orientation change events
          </div>
        ) : (
          events.map((event, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                borderBottom: index < events.length - 1 ? '1px solid #eee' : 'none',
                backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{event.type}</strong> ({event.angle}°)
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {new Date(event.timestamp).toLocaleTimeString()}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                Portrait: {event.isPortrait ? '✅' : '❌'} | 
                Landscape: {event.isLandscape ? '✅' : '❌'}
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#e7f3ff', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <strong>Instructions:</strong> Rotate your device or browser window to trigger orientation changes.
        On desktop, you can simulate this by opening browser dev tools and using device emulation.
      </div>
    </div>
  );
};

// Responsive Layout Demo
const ResponsiveLayoutDemo: React.FC = () => {
  const { state, isSupported } = useScreenOrientation({
    debug: false
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Responsive Layout Based on Orientation</h2>
      
      {!isSupported && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          ⚠️ Screen Orientation API is not supported in this browser
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: state.isLandscape ? '1fr 1fr 1fr' : '1fr',
        gap: '20px',
        marginTop: '20px'
      }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            style={{
              padding: '20px',
              backgroundColor: state.isPortrait ? '#e8f5e8' : '#fff3cd',
              border: `2px solid ${state.isPortrait ? '#28a745' : '#ffc107'}`,
              borderRadius: '8px',
              textAlign: 'center',
              minHeight: state.isLandscape ? '150px' : '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>
                {state.isPortrait ? '📱' : '💻'}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                Card {i + 1}
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                {state.isPortrait ? 'Portrait Mode' : 'Landscape Mode'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>Layout Information</h3>
        <div>
          <strong>Current Layout:</strong> {state.isPortrait ? 'Single Column (Portrait)' : 'Three Columns (Landscape)'}
        </div>
        <div>
          <strong>Orientation:</strong> {state.type} ({state.angle}°)
        </div>
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          This layout automatically adapts based on device orientation, showing a single column in portrait mode 
          and three columns in landscape mode.
        </div>
      </div>
    </div>
  );
};

export const BasicDemo: Story = {
  render: () => <BasicOrientationDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Basic screen orientation control with lock/unlock functionality. Shows current orientation state and provides controls to lock orientation to specific values.'
      }
    }
  }
};

export const OrientationEvents: Story = {
  render: () => <OrientationListenerDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates orientation change event listening. Rotate your device to see real-time orientation change events.'
      }
    }
  }
};

export const ResponsiveLayout: Story = {
  render: () => <ResponsiveLayoutDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Shows how to create responsive layouts that adapt to device orientation changes. Layout switches between single column (portrait) and multi-column (landscape) automatically.'
      }
    }
  }
};