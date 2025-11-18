import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { useDeviceOrientation } from './use-device-orientation';

// Demo component that uses the device orientation hook
const DeviceOrientationDemo: React.FC<{
  enableMotionDetection?: boolean;
  enableShakeDetection?: boolean;
  enableGestureRecognition?: boolean;
  trackScreenOrientation?: boolean;
  enableCalibration?: boolean;
  frequencyHz?: number;
}> = ({
  enableMotionDetection = true,
  enableShakeDetection = true,
  enableGestureRecognition = true,
  trackScreenOrientation = true,
  enableCalibration = true,
  frequencyHz = 60,
}) => {
  const [events, setEvents] = useState<string[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  const addEvent = (event: string) => {
    setEvents(prev => [event, ...prev.slice(0, 9)]); // Keep last 10 events
  };

  const deviceOrientation = useDeviceOrientation({
    enableMotionDetection,
    enableShakeDetection,
    enableGestureRecognition,
    trackScreenOrientation,
    enableCalibration,
    frequencyHz,
    onOrientationChange: orientation => {
      addEvent(
        `Orientation: α=${orientation.alpha?.toFixed(1)}° β=${orientation.beta?.toFixed(1)}° γ=${orientation.gamma?.toFixed(1)}°`
      );
    },
    onMotionDetected: motion => {
      if (motion.isMoving) {
        addEvent(`Motion: ${motion.totalAcceleration.toFixed(2)} m/s²`);
      }
    },
    onShakeDetected: shake => {
      addEvent(
        `🔥 SHAKE detected! Intensity: ${(shake.intensity * 100).toFixed(0)}%`
      );
    },
    onGestureDetected: gesture => {
      addEvent(
        `👋 Gesture: ${gesture.type} (${(gesture.intensity * 100).toFixed(0)}%)`
      );
    },
    onScreenOrientationChange: orientation => {
      addEvent(`📱 Screen: ${orientation.type} (${orientation.angle}°)`);
    },
    onCalibrationComplete: calibration => {
      addEvent(
        `🎯 Calibration complete (${(calibration.calibrationAccuracy * 100).toFixed(0)}% accuracy)`
      );
    },
    onError: error => {
      addEvent(`❌ Error: ${error.message}`);
    },
  });

  const handleStart = async () => {
    const started = await deviceOrientation.start();
    setIsStarted(started);
    if (started) {
      addEvent('✅ Device orientation tracking started');
    }
  };

  const handleStop = () => {
    deviceOrientation.stop();
    setIsStarted(false);
    addEvent('⏹️ Device orientation tracking stopped');
  };

  const handleCalibrate = async () => {
    if (isStarted) {
      addEvent('🎯 Starting calibration...');
      await deviceOrientation.calibrate();
    }
  };

  const handleRequestPermissions = async () => {
    addEvent('🔐 Requesting permissions...');
    const granted = await deviceOrientation.requestPermissions();
    if (granted) {
      addEvent('✅ Permissions granted');
    } else {
      addEvent('❌ Permissions denied');
    }
  };

  // Format angle values
  const formatAngle = (angle: number | null) =>
    angle !== null ? `${angle.toFixed(1)}°` : 'N/A';

  const formatAcceleration = (acc: {
    x: number | null;
    y: number | null;
    z: number | null;
  }) =>
    `x:${(acc.x || 0).toFixed(2)} y:${(acc.y || 0).toFixed(2)} z:${(acc.z || 0).toFixed(2)}`;

  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        🧭 Device Orientation & Motion Toolkit
      </h1>

      {/* Controls */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <h2>Controls</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleRequestPermissions}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007AFF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Request Permissions
          </button>

          {!isStarted ? (
            <button
              onClick={handleStart}
              style={{
                padding: '8px 16px',
                backgroundColor: '#34C759',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Start Tracking
            </button>
          ) : (
            <button
              onClick={handleStop}
              style={{
                padding: '8px 16px',
                backgroundColor: '#FF3B30',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Stop Tracking
            </button>
          )}

          {isStarted && (
            <button
              onClick={handleCalibrate}
              style={{
                padding: '8px 16px',
                backgroundColor: '#FF9500',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Calibrate
            </button>
          )}
        </div>
      </div>

      {/* Status */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <h2>Status</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
          }}
        >
          <div>
            <strong>Support:</strong>
            <div>
              📱 Orientation:{' '}
              {deviceOrientation.state.isOrientationSupported ? '✅' : '❌'}
            </div>
            <div>
              🏃 Motion:{' '}
              {deviceOrientation.state.isMotionSupported ? '✅' : '❌'}
            </div>
            <div>
              🧭 Compass:{' '}
              {deviceOrientation.state.isCompassSupported ? '✅' : '❌'}
            </div>
          </div>

          <div>
            <strong>Permissions:</strong>
            <div>
              📱 Orientation:{' '}
              {deviceOrientation.state.hasOrientationPermission ? '✅' : '❌'}
            </div>
            <div>
              🏃 Motion:{' '}
              {deviceOrientation.state.hasMotionPermission ? '✅' : '❌'}
            </div>
          </div>

          <div>
            <strong>State:</strong>
            <div>
              🔄 Active: {deviceOrientation.state.isActive ? '✅' : '❌'}
            </div>
            <div>
              🎯 Calibrated:{' '}
              {deviceOrientation.state.isCalibrated ? '✅' : '❌'}
            </div>
            <div>📊 Accuracy: {deviceOrientation.state.sensorAccuracy}</div>
          </div>
        </div>
      </div>

      {/* Current Data */}
      {isStarted && (
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h2>Current Data</h2>

          {/* Orientation */}
          {deviceOrientation.state.orientation && (
            <div style={{ marginBottom: '15px' }}>
              <strong>🧭 Orientation:</strong>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '10px',
                  marginTop: '5px',
                }}
              >
                <div>
                  Alpha (Z):{' '}
                  {formatAngle(deviceOrientation.state.orientation.alpha)}
                </div>
                <div>
                  Beta (X):{' '}
                  {formatAngle(deviceOrientation.state.orientation.beta)}
                </div>
                <div>
                  Gamma (Y):{' '}
                  {formatAngle(deviceOrientation.state.orientation.gamma)}
                </div>
                <div>
                  Heading:{' '}
                  {formatAngle(deviceOrientation.state.orientation.heading)}
                </div>
                <div>
                  Tilt: {formatAngle(deviceOrientation.state.orientation.tilt)}
                </div>
              </div>
            </div>
          )}

          {/* Motion */}
          {deviceOrientation.state.motion && (
            <div style={{ marginBottom: '15px' }}>
              <strong>🏃 Motion:</strong>
              <div style={{ marginTop: '5px' }}>
                <div>
                  Acceleration:{' '}
                  {formatAcceleration(
                    deviceOrientation.state.motion.acceleration
                  )}
                </div>
                <div>
                  Total:{' '}
                  {deviceOrientation.state.motion.totalAcceleration.toFixed(2)}{' '}
                  m/s²
                </div>
                <div>
                  Moving:{' '}
                  {deviceOrientation.state.motion.isMoving ? '✅' : '❌'}
                </div>
              </div>
            </div>
          )}

          {/* Screen Orientation */}
          {deviceOrientation.state.screenOrientation && (
            <div>
              <strong>📱 Screen:</strong>
              <div style={{ marginTop: '5px' }}>
                <div>
                  Type: {deviceOrientation.state.screenOrientation.type}
                </div>
                <div>
                  Angle: {deviceOrientation.state.screenOrientation.angle}°
                </div>
                <div>
                  Portrait:{' '}
                  {deviceOrientation.state.screenOrientation.isPortrait
                    ? '✅'
                    : '❌'}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Utility Functions */}
      {isStarted && (
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h2>Device State</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '10px',
            }}
          >
            <div>📱 Flat: {deviceOrientation.isDeviceFlat() ? '✅' : '❌'}</div>
            <div>
              📱 Upright: {deviceOrientation.isDeviceUpright() ? '✅' : '❌'}
            </div>
            <div>
              🧭 Compass Accurate:{' '}
              {deviceOrientation.isCompassAccurate() ? '✅' : '❌'}
            </div>
            <div>
              🏃 Movement: {deviceOrientation.getMovementIntensity().toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {/* Events Log */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <h2>Events Log</h2>
        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '4px',
            maxHeight: '300px',
            overflowY: 'auto',
            fontFamily: 'Monaco, Consolas, monospace',
            fontSize: '12px',
          }}
        >
          {events.length === 0 ? (
            <div style={{ color: '#666' }}>
              No events yet. Start tracking to see device orientation data.
            </div>
          ) : (
            events.map((event, index) => (
              <div
                key={index}
                style={{ marginBottom: '4px', opacity: 1 - index * 0.1 }}
              >
                {event}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Instructions */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <h2>Instructions</h2>
        <ol style={{ paddingLeft: '20px' }}>
          <li>
            Click "Request Permissions" to enable device sensors (required on
            iOS)
          </li>
          <li>
            Click "Start Tracking" to begin monitoring device orientation and
            motion
          </li>
          <li>Tilt, rotate, or shake your device to see real-time data</li>
          <li>
            Try these gestures:
            <ul>
              <li>Tilt left/right/forward/backward</li>
              <li>Rotate clockwise/counterclockwise</li>
              <li>Shake the device</li>
              <li>Flip the device 180°</li>
            </ul>
          </li>
          <li>Use "Calibrate" to improve compass accuracy</li>
        </ol>

        <div
          style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#e3f2fd',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          <strong>Note:</strong> This demo works best on mobile devices with
          built-in accelerometers and gyroscopes. On desktop browsers, you may
          see limited functionality.
        </div>
      </div>
    </div>
  );
};

// Gesture Recognition Demo
const GestureDemo: React.FC = () => {
  const [detectedGestures, setDetectedGestures] = useState<string[]>([]);
  const [activeGestures, setActiveGestures] = useState<string[]>([]);

  const deviceOrientation = useDeviceOrientation({
    enableGestureRecognition: true,
    tiltThreshold: 25,
    rotationThreshold: 45,
    onGestureDetected: gesture => {
      const gestureText = `${gesture.type} (${(gesture.intensity * 100).toFixed(0)}% intensity)`;
      setDetectedGestures(prev => [gestureText, ...prev.slice(0, 9)]);
    },
  });

  useEffect(() => {
    setActiveGestures(deviceOrientation.getActiveGestures());
  }, [deviceOrientation]);

  const toggleGesture = (gesture: string) => {
    if (activeGestures.includes(gesture)) {
      deviceOrientation.disableGesture(gesture);
    } else {
      deviceOrientation.enableGesture(gesture);
    }
    setActiveGestures(deviceOrientation.getActiveGestures());
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h2>👋 Gesture Recognition Demo</h2>

      <button
        onClick={() => deviceOrientation.start()}
        style={{
          padding: '10px 20px',
          backgroundColor: '#34C759',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          marginBottom: '20px',
        }}
      >
        Start Gesture Detection
      </button>

      <h3>Available Gestures</h3>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        {[
          'tilt-left',
          'tilt-right',
          'tilt-forward',
          'tilt-backward',
          'rotate-cw',
          'rotate-ccw',
          'flip',
        ].map(gesture => (
          <button
            key={gesture}
            onClick={() => toggleGesture(gesture)}
            style={{
              padding: '8px 12px',
              backgroundColor: activeGestures.includes(gesture)
                ? '#007AFF'
                : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {gesture}
          </button>
        ))}
      </div>

      <h3>Detected Gestures</h3>
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '15px',
          borderRadius: '4px',
          minHeight: '200px',
          fontFamily: 'monospace',
        }}
      >
        {detectedGestures.length === 0 ? (
          <div>Perform gestures to see detection results...</div>
        ) : (
          detectedGestures.map((gesture, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              {gesture}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Motion Tracking Demo
const MotionDemo: React.FC = () => {
  const [motionData, setMotionData] = useState<any>(null);
  const [shakeCount, setShakeCount] = useState(0);

  const deviceOrientation = useDeviceOrientation({
    enableMotionDetection: true,
    enableShakeDetection: true,
    motionThreshold: 1.0,
    shakeThreshold: 12.0,
    onMotionDetected: motion => {
      setMotionData(motion);
    },
    onShakeDetected: shake => {
      setShakeCount(prev => prev + 1);
    },
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h2>🏃 Motion Tracking Demo</h2>

      <button
        onClick={() => deviceOrientation.start()}
        style={{
          padding: '10px 20px',
          backgroundColor: '#34C759',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          marginBottom: '20px',
        }}
      >
        Start Motion Tracking
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <h3>Current Motion</h3>
          {motionData ? (
            <div>
              <div>
                Total Acceleration: {motionData.totalAcceleration.toFixed(2)}{' '}
                m/s²
              </div>
              <div>Is Moving: {motionData.isMoving ? '✅' : '❌'}</div>
              <div>X: {(motionData.acceleration.x || 0).toFixed(2)}</div>
              <div>Y: {(motionData.acceleration.y || 0).toFixed(2)}</div>
              <div>Z: {(motionData.acceleration.z || 0).toFixed(2)}</div>
            </div>
          ) : (
            <div>No motion data yet...</div>
          )}
        </div>

        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <h3>Shake Detection</h3>
          <div
            style={{ fontSize: '48px', textAlign: 'center', margin: '20px 0' }}
          >
            {shakeCount}
          </div>
          <div style={{ textAlign: 'center' }}>Shakes Detected</div>
          <button
            onClick={() => setShakeCount(0)}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#FF3B30',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              marginTop: '10px',
            }}
          >
            Reset Count
          </button>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof DeviceOrientationDemo> = {
  title: 'Hooks/useDeviceOrientation',
  component: DeviceOrientationDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The \`useDeviceOrientation\` hook provides comprehensive device orientation and motion detection capabilities for Acrobi's Advanced Experienceslications. 

## Features

- **Device Orientation**: Track device rotation (alpha, beta, gamma) with compass heading
- **Motion Detection**: Monitor acceleration and movement with configurable thresholds  
- **Shake Detection**: Recognize shake gestures with intensity and duration tracking
- **Gesture Recognition**: Detect tilt, rotation, and flip gestures
- **Screen Orientation**: Monitor screen orientation changes and control orientation lock
- **Calibration**: Improve sensor accuracy with calibration routines
- **Permission Management**: Handle iOS 13+ permission requirements
- **Noise Filtering**: Reduce sensor noise with configurable filters
- **Error Handling**: Comprehensive error handling with detailed error types

## Usage

This hook is particularly useful for:
- Interactive games and applications
- Augmented reality experiences  
- Motion-controlled interfaces
- Compass and navigation apps
- Shake-to-refresh functionality
- Device orientation-aware layouts

## Browser Support

- Chrome 31+ (full support)
- Firefox 6+ (partial support)
- Safari 4.2+ (iOS permission required)
- Edge 12+ (full support)

**Note**: This demo works best on mobile devices with built-in sensors.
        `,
      },
    },
  },
  argTypes: {
    enableMotionDetection: {
      control: 'boolean',
      description: 'Enable motion detection and acceleration tracking',
    },
    enableShakeDetection: {
      control: 'boolean',
      description: 'Enable shake gesture detection',
    },
    enableGestureRecognition: {
      control: 'boolean',
      description: 'Enable tilt and rotation gesture recognition',
    },
    trackScreenOrientation: {
      control: 'boolean',
      description: 'Track screen orientation changes',
    },
    enableCalibration: {
      control: 'boolean',
      description: 'Enable sensor calibration capabilities',
    },
    frequencyHz: {
      control: { type: 'range', min: 1, max: 60, step: 1 },
      description: 'Update frequency in Hz (1-60)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DeviceOrientationDemo>;

export const Default: Story = {
  args: {
    enableMotionDetection: true,
    enableShakeDetection: true,
    enableGestureRecognition: true,
    trackScreenOrientation: true,
    enableCalibration: true,
    frequencyHz: 60,
  },
};

export const BasicOrientation: Story = {
  args: {
    enableMotionDetection: false,
    enableShakeDetection: false,
    enableGestureRecognition: false,
    trackScreenOrientation: true,
    enableCalibration: true,
    frequencyHz: 30,
  },
};

export const MotionOnly: Story = {
  args: {
    enableMotionDetection: true,
    enableShakeDetection: true,
    enableGestureRecognition: false,
    trackScreenOrientation: false,
    enableCalibration: false,
    frequencyHz: 60,
  },
};

export const GesturesOnly: Story = {
  args: {
    enableMotionDetection: false,
    enableShakeDetection: false,
    enableGestureRecognition: true,
    trackScreenOrientation: false,
    enableCalibration: false,
    frequencyHz: 30,
  },
};

export const LowFrequency: Story = {
  args: {
    enableMotionDetection: true,
    enableShakeDetection: true,
    enableGestureRecognition: true,
    trackScreenOrientation: true,
    enableCalibration: true,
    frequencyHz: 10,
  },
};

// Additional component stories
export const GestureRecognition: StoryObj<typeof GestureDemo> = {
  render: () => <GestureDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive gesture recognition demo. Enable/disable specific gestures and see real-time detection results.',
      },
    },
  },
};

export const MotionTracking: StoryObj<typeof MotionDemo> = {
  render: () => <MotionDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Motion tracking and shake detection demo. Monitor device acceleration and shake gestures.',
      },
    },
  },
};
