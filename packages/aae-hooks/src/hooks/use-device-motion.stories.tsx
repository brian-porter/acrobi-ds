/**
 * @fileoverview Device Motion Hook Stories for Epic 63
 * Interactive demonstrations of device motion sensor access
 */

import React, { useState, useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useDeviceMotion, DeviceMotionData } from './use-device-motion';

const meta: Meta = {
  title: 'Hooks/useDeviceMotion',
  parameters: {
    docs: {
      description: {
        component:
          'Hook for accessing device motion sensors (accelerometer and gyroscope). Provides raw sensor data for building custom motion-based interactions.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Basic Device Motion Demo
const BasicMotionDemo: React.FC = () => {
  const {
    state,
    error,
    requestPermission,
    start,
    stop,
    isSupported,
    clearError,
    getAccelerationMagnitude,
    getRotationMagnitude,
    isStationary,
  } = useDeviceMotion({
    debug: true,
    throttle: 50, // 20fps for demo
    onMotionUpdate: data => {
      // Log every 100th update to avoid spam
      if (Date.now() % 1000 < 50) {
        console.log('Motion update:', data);
      }
    },
    onPermissionGranted: () => {
      console.log('Device motion permission granted');
    },
    onPermissionDenied: () => {
      console.log('Device motion permission denied');
    },
  });

  const [motionHistory, setMotionHistory] = useState<DeviceMotionData[]>([]);

  // Store motion history for visualization
  useEffect(() => {
    if (state.data) {
      setMotionHistory(prev => [state.data!, ...prev.slice(0, 49)]); // Keep last 50 readings
    }
  }, [state.data]);

  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    if (granted) {
      start();
    }
  };

  const clearHistory = () => {
    setMotionHistory([]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Device Motion Sensor Data</h2>

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

      {error && (
        <div
          style={{
            padding: '10px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
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
              cursor: 'pointer',
            }}
          >
            Clear
          </button>
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
            <strong>Permission:</strong>{' '}
            {state.hasPermission === null
              ? '❓ Unknown'
              : state.hasPermission
                ? '✅ Granted'
                : '❌ Denied'}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Active:</strong> {state.isActive ? '🟢 Yes' : '🔴 No'}
          </div>

          {!state.hasPermission && (
            <button
              onClick={handleRequestPermission}
              disabled={!isSupported}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: isSupported ? '#007bff' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSupported ? 'pointer' : 'not-allowed',
                marginBottom: '10px',
              }}
            >
              Request Permission & Start
            </button>
          )}

          {state.hasPermission && !state.isActive && (
            <button
              onClick={() => start()}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '10px',
              }}
            >
              Start Motion Tracking
            </button>
          )}

          {state.isActive && (
            <button
              onClick={stop}
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
              Stop Motion Tracking
            </button>
          )}

          <button
            onClick={clearHistory}
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
            Clear History
          </button>
        </div>

        {/* Current State */}
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <h3>Current Readings</h3>
          <div style={{ marginBottom: '10px' }}>
            <strong>Frequency:</strong> {state.frequency} Hz
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Acceleration Magnitude:</strong>{' '}
            {getAccelerationMagnitude().toFixed(2)} m/s²
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Rotation Magnitude:</strong>{' '}
            {getRotationMagnitude().toFixed(2)} °/s
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Stationary:</strong> {isStationary() ? '✅ Yes' : '❌ No'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Last Update:</strong>{' '}
            {state.lastUpdate
              ? new Date(state.lastUpdate).toLocaleTimeString()
              : 'Never'}
          </div>
        </div>
      </div>

      {/* Raw Data Display */}
      {state.data && (
        <div
          style={{
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #dee2e6',
          }}
        >
          <h3>Raw Sensor Data</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '15px',
            }}
          >
            <div>
              <h4>Acceleration (m/s²)</h4>
              <div>X: {state.data.acceleration.x?.toFixed(3) ?? 'null'}</div>
              <div>Y: {state.data.acceleration.y?.toFixed(3) ?? 'null'}</div>
              <div>Z: {state.data.acceleration.z?.toFixed(3) ?? 'null'}</div>
            </div>
            <div>
              <h4>Accel + Gravity (m/s²)</h4>
              <div>
                X:{' '}
                {state.data.accelerationIncludingGravity.x?.toFixed(3) ??
                  'null'}
              </div>
              <div>
                Y:{' '}
                {state.data.accelerationIncludingGravity.y?.toFixed(3) ??
                  'null'}
              </div>
              <div>
                Z:{' '}
                {state.data.accelerationIncludingGravity.z?.toFixed(3) ??
                  'null'}
              </div>
            </div>
            <div>
              <h4>Rotation Rate (°/s)</h4>
              <div>
                α: {state.data.rotationRate.alpha?.toFixed(3) ?? 'null'}
              </div>
              <div>β: {state.data.rotationRate.beta?.toFixed(3) ?? 'null'}</div>
              <div>
                γ: {state.data.rotationRate.gamma?.toFixed(3) ?? 'null'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Motion History Chart */}
      {motionHistory.length > 0 && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f0f8ff',
            borderRadius: '8px',
            border: '1px solid #b6d7ff',
          }}
        >
          <h3>Motion History (Last 50 readings)</h3>
          <div
            style={{
              height: '200px',
              position: 'relative',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <svg width='100%' height='100%' style={{ display: 'block' }}>
              {motionHistory.map((data, index) => {
                const x = (index / Math.max(motionHistory.length - 1, 1)) * 100;
                const accelMag = Math.sqrt(
                  (data.acceleration.x || 0) ** 2 +
                    (data.acceleration.y || 0) ** 2 +
                    (data.acceleration.z || 0) ** 2
                );
                const y = Math.max(0, Math.min(100, 100 - accelMag * 5));

                return (
                  <circle
                    key={index}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r='2'
                    fill={
                      accelMag > 10
                        ? '#dc3545'
                        : accelMag > 5
                          ? '#ffc107'
                          : '#28a745'
                    }
                  />
                );
              })}
            </svg>
            <div
              style={{
                position: 'absolute',
                bottom: '5px',
                left: '5px',
                fontSize: '12px',
                backgroundColor: 'rgba(255,255,255,0.8)',
                padding: '2px 4px',
                borderRadius: '2px',
              }}
            >
              🟢 Low 🟡 Medium 🔴 High Motion
            </div>
          </div>
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
          <strong>Instructions:</strong> Grant permission and start motion
          tracking, then move your device to see sensor data. On desktop
          browsers, motion sensors may not be available.
        </div>
      )}
    </div>
  );
};

// Motion Analysis Demo
const MotionAnalysisDemo: React.FC = () => {
  const [motionEvents, setMotionEvents] = useState<
    Array<{
      timestamp: number;
      type: 'movement' | 'shake' | 'tilt' | 'rotation';
      intensity: number;
      data: DeviceMotionData;
    }>
  >([]);

  const {
    state,
    start,
    stop,
    requestPermission,
    isSupported,
    getAccelerationMagnitude,
    getRotationMagnitude,
  } = useDeviceMotion({
    debug: false,
    throttle: 100, // 10fps for analysis
    onMotionUpdate: data => {
      const accelMag = Math.sqrt(
        (data.acceleration.x || 0) ** 2 +
          (data.acceleration.y || 0) ** 2 +
          (data.acceleration.z || 0) ** 2
      );

      const rotationMag = Math.sqrt(
        (data.rotationRate.alpha || 0) ** 2 +
          (data.rotationRate.beta || 0) ** 2 +
          (data.rotationRate.gamma || 0) ** 2
      );

      let eventType: 'movement' | 'shake' | 'tilt' | 'rotation' = 'movement';
      if (accelMag > 15) eventType = 'shake';
      else if (rotationMag > 200) eventType = 'rotation';
      else if (accelMag > 5) eventType = 'tilt';

      if (accelMag > 2 || rotationMag > 10) {
        setMotionEvents(prev => [
          {
            timestamp: Date.now(),
            type: eventType,
            intensity: Math.max(accelMag, rotationMag / 20),
            data,
          },
          ...prev.slice(0, 19),
        ]); // Keep last 20 events
      }
    },
  });

  const handleStart = async () => {
    if (state.hasPermission === null) {
      const granted = await requestPermission();
      if (!granted) return;
    }
    start();
  };

  const clearEvents = () => setMotionEvents([]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'shake':
        return '🤳';
      case 'tilt':
        return '📱';
      case 'rotation':
        return '🔄';
      default:
        return '📋';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'shake':
        return '#dc3545';
      case 'tilt':
        return '#ffc107';
      case 'rotation':
        return '#007bff';
      default:
        return '#28a745';
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Motion Pattern Analysis</h2>

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
              marginRight: '10px',
            }}
          >
            Start Analysis
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
              marginRight: '10px',
            }}
          >
            Stop Analysis
          </button>
        )}

        <button
          onClick={clearEvents}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Clear Events
        </button>
      </div>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
      >
        {/* Current Analysis */}
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <h3>Current Motion</h3>
          {state.isActive ? (
            <>
              <div style={{ marginBottom: '10px' }}>
                <strong>Acceleration:</strong>{' '}
                {getAccelerationMagnitude().toFixed(2)} m/s²
                <div
                  style={{
                    width: '100%',
                    height: '10px',
                    backgroundColor: '#e9ecef',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    marginTop: '5px',
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(100, (getAccelerationMagnitude() / 20) * 100)}%`,
                      height: '100%',
                      backgroundColor:
                        getAccelerationMagnitude() > 15
                          ? '#dc3545'
                          : getAccelerationMagnitude() > 5
                            ? '#ffc107'
                            : '#28a745',
                      transition: 'all 0.2s ease',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <strong>Rotation:</strong> {getRotationMagnitude().toFixed(2)}{' '}
                °/s
                <div
                  style={{
                    width: '100%',
                    height: '10px',
                    backgroundColor: '#e9ecef',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    marginTop: '5px',
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(100, (getRotationMagnitude() / 300) * 100)}%`,
                      height: '100%',
                      backgroundColor:
                        getRotationMagnitude() > 200
                          ? '#dc3545'
                          : getRotationMagnitude() > 50
                            ? '#ffc107'
                            : '#28a745',
                      transition: 'all 0.2s ease',
                    }}
                  />
                </div>
              </div>

              <div style={{ fontSize: '12px', color: '#666' }}>
                Move your device to see motion analysis
              </div>
            </>
          ) : (
            <div style={{ color: '#666', fontStyle: 'italic' }}>
              Start analysis to see motion data
            </div>
          )}
        </div>

        {/* Event Statistics */}
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <h3>Event Statistics</h3>
          {motionEvents.length > 0 ? (
            <>
              <div style={{ marginBottom: '10px' }}>
                <strong>Total Events:</strong> {motionEvents.length}
              </div>
              {['shake', 'tilt', 'rotation', 'movement'].map(type => {
                const count = motionEvents.filter(e => e.type === type).length;
                const percentage = (count / motionEvents.length) * 100;

                return (
                  <div key={type} style={{ marginBottom: '8px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>
                        {getEventIcon(type)} {type}
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
                          backgroundColor: getEventColor(type),
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div style={{ color: '#666', fontStyle: 'italic' }}>
              No motion events detected yet
            </div>
          )}
        </div>
      </div>

      {/* Event History */}
      <div
        style={{
          marginTop: '20px',
          maxHeight: '300px',
          overflowY: 'auto',
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
          }}
        >
          Motion Events History
        </div>

        {motionEvents.length === 0 ? (
          <div
            style={{
              padding: '20px',
              textAlign: 'center',
              color: '#666',
            }}
          >
            Move your device to generate motion events
          </div>
        ) : (
          motionEvents.map((event, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                borderBottom:
                  index < motionEvents.length - 1 ? '1px solid #eee' : 'none',
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
                <div>
                  {getEventIcon(event.type)} <strong>{event.type}</strong>
                  <span
                    style={{
                      marginLeft: '10px',
                      padding: '2px 6px',
                      backgroundColor: getEventColor(event.type),
                      color: 'white',
                      borderRadius: '10px',
                      fontSize: '10px',
                    }}
                  >
                    {event.intensity.toFixed(1)}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {new Date(event.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const BasicDemo: Story = {
  render: () => <BasicMotionDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic device motion sensor access with raw accelerometer and gyroscope data. Shows permission handling and real-time sensor readings.',
      },
    },
  },
};

export const MotionAnalysis: Story = {
  render: () => <MotionAnalysisDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Advanced motion pattern analysis that categorizes device movements into different types (shake, tilt, rotation). Includes event statistics and history.',
      },
    },
  },
};
