/**
 * @fileoverview Compass Heading Hook Stories for Epic 63
 * Interactive demonstrations of compass navigation and heading detection
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useCompassHeading } from './use-compass-heading';

const meta: Meta = {
  title: 'Hooks/useCompassHeading',
  parameters: {
    docs: {
      description: {
        component:
          'Hook for compass heading detection using the Device Orientation API. Provides normalized compass heading with smoothing and calibration support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Basic Compass Demo
const BasicCompassDemo: React.FC = () => {
  const {
    state,
    error,
    requestPermission,
    start,
    stop,
    calibrate,
    isSupported,
    clearError,
    getHeading,
    getCardinalDirection,
    getCompassDirection,
  } = useCompassHeading({
    debug: true,
    smoothing: 0.1,
    magneticDeclination: 0, // Set to your local declination
    onHeadingUpdate: heading => {
      if (Date.now() % 1000 < 50) {
        // Log occasionally
        console.log('Heading update:', heading);
      }
    },
    onPermissionGranted: () => {
      console.log('Compass permission granted');
    },
    onCalibrationNeeded: () => {
      console.log('Compass calibration needed');
    },
  });

  const [targetHeading, setTargetHeading] = useState<number>(0);

  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    if (granted) {
      start();
    }
  };

  const handleCalibrate = () => {
    calibrate();
  };

  const currentHeading = getHeading();
  const compassDirection = getCompassDirection('detailed');

  // Calculate compass rotation for visual indicator
  const compassRotation = -currentHeading; // Negative to rotate compass, not needle

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Digital Compass</h2>

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
          ⚠️ Device Orientation API is not supported in this browser
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
          {error.type === 'calibration_needed' && (
            <button
              onClick={handleCalibrate}
              style={{
                marginLeft: '10px',
                padding: '4px 8px',
                backgroundColor: '#ffc107',
                color: 'black',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
            >
              Calibrate
            </button>
          )}
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
          <div style={{ marginBottom: '10px' }}>
            <strong>Active:</strong> {state.isActive ? '🟢 Yes' : '🔴 No'}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Calibrated:</strong>{' '}
            {state.isCalibrated ? '✅ Yes' : '⚠️ No'}
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
              Start Compass
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
              Stop Compass
            </button>
          )}

          <button
            onClick={handleCalibrate}
            disabled={!state.isActive}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: state.isActive ? '#ffc107' : '#ccc',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: state.isActive ? 'pointer' : 'not-allowed',
            }}
          >
            Calibrate Compass
          </button>
        </div>

        {/* Current Readings */}
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <h3>Current Heading</h3>
          <div style={{ marginBottom: '10px' }}>
            <strong>Heading:</strong> {currentHeading.toFixed(1)}°
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Direction:</strong> {compassDirection}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Cardinal:</strong> {getCardinalDirection()}
          </div>
          {state.heading && (
            <>
              <div style={{ marginBottom: '10px' }}>
                <strong>Magnetic:</strong>{' '}
                {state.heading.magneticHeading.toFixed(1)}°
              </div>
              {state.heading.accuracy && (
                <div style={{ marginBottom: '10px' }}>
                  <strong>Accuracy:</strong> ±{state.heading.accuracy}°
                </div>
              )}
            </>
          )}
          <div style={{ marginBottom: '10px' }}>
            <strong>Last Update:</strong>{' '}
            {state.lastUpdate
              ? new Date(state.lastUpdate).toLocaleTimeString()
              : 'Never'}
          </div>
        </div>
      </div>

      {/* Visual Compass */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          textAlign: 'center',
        }}
      >
        <h3>Visual Compass</h3>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
          }}
        >
          <div
            style={{
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              border: '4px solid #333',
              position: 'relative',
              backgroundColor: 'white',
              transform: `rotate(${compassRotation}deg)`,
              transition: 'transform 0.3s ease',
            }}
          >
            {/* Compass Rose */}
            {['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'].map(
              (direction, index) => {
                const angle = index * 45;
                const isCardinal = index % 2 === 0;
                const x =
                  Math.sin((angle * Math.PI) / 180) * (isCardinal ? 100 : 90);
                const y =
                  -Math.cos((angle * Math.PI) / 180) * (isCardinal ? 100 : 90);

                return (
                  <div
                    key={direction}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-compassRotation}deg)`,
                      fontSize: isCardinal ? '16px' : '12px',
                      fontWeight: isCardinal ? 'bold' : 'normal',
                      color: direction === 'N' ? '#dc3545' : '#333',
                    }}
                  >
                    {direction}
                  </div>
                );
              }
            )}

            {/* Degree markings */}
            {Array.from({ length: 36 }, (_, i) => i * 10).map(degree => {
              const isMajor = degree % 30 === 0;
              const x =
                Math.sin((degree * Math.PI) / 180) * (isMajor ? 110 : 105);
              const y =
                -Math.cos((degree * Math.PI) / 180) * (isMajor ? 110 : 105);

              return (
                <div
                  key={degree}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-compassRotation}deg)`,
                    fontSize: '10px',
                    color: '#666',
                  }}
                >
                  {isMajor ? degree : '•'}
                </div>
              );
            })}

            {/* Center dot */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#333',
              }}
            />

            {/* North indicator (fixed) */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '10px',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '20px solid #dc3545',
              }}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: state.isCalibrated ? '#333' : '#ffc107',
          }}
        >
          {currentHeading.toFixed(0)}° {compassDirection}
          {!state.isCalibrated && ' ⚠️'}
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
          <strong>Instructions:</strong> Grant permission and start the compass,
          then rotate your device to see the heading change. On desktop
          browsers, device orientation may not be available. Calibration may be
          needed for accurate readings.
        </div>
      )}
    </div>
  );
};

// Navigation Demo
const NavigationDemo: React.FC = () => {
  const [waypoints, setWaypoints] = useState<
    Array<{
      id: number;
      name: string;
      heading: number;
      distance?: number;
    }>
  >([
    { id: 1, name: 'North Tower', heading: 0 },
    { id: 2, name: 'East Building', heading: 90 },
    { id: 3, name: 'South Gate', heading: 180 },
    { id: 4, name: 'West Parking', heading: 270 },
  ]);

  const [selectedWaypoint, setSelectedWaypoint] = useState<number>(1);

  const {
    state,
    start,
    stop,
    requestPermission,
    isSupported,
    getHeading,
    getRelativeDirection,
    getAngularDifference,
    getCompassDirection,
  } = useCompassHeading({
    debug: false,
    smoothing: 0.2, // More smoothing for navigation
  });

  const handleStart = async () => {
    if (state.hasPermission === null) {
      const granted = await requestPermission();
      if (!granted) return;
    }
    start();
  };

  const currentHeading = getHeading();
  const selectedWaypointData = waypoints.find(w => w.id === selectedWaypoint);
  const targetHeading = selectedWaypointData?.heading || 0;
  const relativeDirection = getRelativeDirection(targetHeading);
  const angularDifference = getAngularDifference(targetHeading);

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'left':
        return '⬅️';
      case 'right':
        return '➡️';
      case 'straight':
        return '⬆️';
    }
  };

  const getDirectionColor = (difference: number) => {
    if (difference < 10) return '#28a745';
    if (difference < 30) return '#ffc107';
    return '#dc3545';
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Compass Navigation</h2>

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
          ⚠️ Device Orientation API is not supported in this browser
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
            Start Navigation
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
            Stop Navigation
          </button>
        )}
      </div>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
      >
        {/* Waypoint Selection */}
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <h3>Select Destination</h3>

          {waypoints.map(waypoint => (
            <div
              key={waypoint.id}
              onClick={() => setSelectedWaypoint(waypoint.id)}
              style={{
                padding: '10px',
                marginBottom: '8px',
                backgroundColor:
                  selectedWaypoint === waypoint.id ? '#007bff' : 'white',
                color: selectedWaypoint === waypoint.id ? 'white' : 'black',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{waypoint.name}</span>
              <span>{waypoint.heading}°</span>
            </div>
          ))}

          <div
            style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#e7f3ff',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            <strong>Add Custom Waypoint:</strong>
            <input
              type='text'
              placeholder='Waypoint name'
              style={{
                width: '100%',
                padding: '4px',
                marginTop: '5px',
                marginBottom: '5px',
                border: '1px solid #ccc',
                borderRadius: '3px',
              }}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  const name = input.value.trim();
                  if (name) {
                    const newId = Math.max(...waypoints.map(w => w.id)) + 1;
                    setWaypoints(prev => [
                      ...prev,
                      {
                        id: newId,
                        name,
                        heading: Math.round(currentHeading),
                      },
                    ]);
                    input.value = '';
                  }
                }
              }}
            />
            <div style={{ fontSize: '10px', color: '#666' }}>
              Type name and press Enter to add current heading as waypoint
            </div>
          </div>
        </div>

        {/* Navigation Display */}
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        >
          <h3>Navigation Info</h3>

          {state.isActive ? (
            <>
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Current Heading
                </div>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  {currentHeading.toFixed(0)}° {getCompassDirection()}
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '12px', color: '#666' }}>Target</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  {selectedWaypointData?.name} ({targetHeading}°)
                </div>
              </div>

              <div
                style={{
                  padding: '20px',
                  backgroundColor: getDirectionColor(angularDifference),
                  color: 'white',
                  borderRadius: '8px',
                  textAlign: 'center',
                  marginBottom: '15px',
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '10px' }}>
                  {getDirectionIcon(relativeDirection)}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  {relativeDirection.toUpperCase()}
                </div>
                <div style={{ fontSize: '14px' }}>
                  {angularDifference.toFixed(0)}° off target
                </div>
              </div>

              <div style={{ fontSize: '12px', color: '#666' }}>
                <div>Angular Difference: {angularDifference.toFixed(1)}°</div>
                <div>Relative Direction: {relativeDirection}</div>
                {angularDifference < 5 && (
                  <div
                    style={{
                      color: '#28a745',
                      fontWeight: 'bold',
                      marginTop: '5px',
                    }}
                  >
                    🎯 On target!
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ color: '#666', fontStyle: 'italic' }}>
              Start navigation to see heading information
            </div>
          )}
        </div>
      </div>

      {state.isActive && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f0f8ff',
            borderRadius: '8px',
            border: '1px solid #b6d7ff',
          }}
        >
          <h3>Mini Compass</h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '150px',
            }}
          >
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '2px solid #333',
                position: 'relative',
                backgroundColor: 'white',
              }}
            >
              {/* Current heading needle */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${currentHeading}deg)`,
                  width: '2px',
                  height: '40px',
                  backgroundColor: '#007bff',
                  transformOrigin: 'bottom',
                }}
              />

              {/* Target heading indicator */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${targetHeading}deg)`,
                  width: '4px',
                  height: '35px',
                  backgroundColor: '#dc3545',
                  transformOrigin: 'bottom',
                }}
              />

              {/* Center */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#333',
                }}
              />

              {/* N indicator */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '5px',
                  transform: 'translateX(-50%)',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#dc3545',
                }}
              >
                N
              </div>
            </div>
          </div>

          <div
            style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px' }}
          >
            <span style={{ color: '#007bff' }}>● Current</span>
            {' | '}
            <span style={{ color: '#dc3545' }}>● Target</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const BasicCompass: Story = {
  render: () => <BasicCompassDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic compass functionality with visual compass rose. Shows device heading with calibration support and smooth heading updates.',
      },
    },
  },
};

export const NavigationExample: Story = {
  render: () => <NavigationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Navigation demo that shows how to use compass heading for waypoint navigation. Includes relative direction indicators and angular difference calculations.',
      },
    },
  },
};
