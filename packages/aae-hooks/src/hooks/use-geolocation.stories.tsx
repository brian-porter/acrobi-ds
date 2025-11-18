import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  useGeolocation,
  type GeofenceOptions,
  type Coordinates,
} from './use-geolocation';

const meta: Meta = {
  title: 'Hooks/useGeolocation',
  parameters: {
    docs: {
      description: {
        component: `
# useGeolocation Hook (Epic 42)

Advanced geolocation hook for Acrobi's Advanced Experienceslications with comprehensive features:

## Features

- **Current Position**: Get current device location with configurable accuracy
- **Position Watching**: Continuous position tracking with start/stop controls  
- **Position History**: Track and manage position history over time
- **Geofencing**: Create geographic boundaries with enter/exit detection
- **Permission Management**: Handle location permissions transparently
- **Offline Support**: Cache positions and queue updates for offline use
- **Utilities**: Distance, bearing calculations and coordinate conversions
- **Legacy Compatibility**: Backwards compatible with older geolocation APIs

## Basic Usage

\`\`\`tsx
import { useGeolocation } from '@/hooks/use-geolocation';

function LocationComponent() {
  const {
    position,
    error,
    loading,
    permission,
    getCurrentPosition,
    startWatching,
    stopWatching
  } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 10000
  });

  if (loading) return <div>Getting location...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!position) return <div>Location not available</div>;

  return (
    <div>
      <p>Lat: {position.coords.latitude}</p>
      <p>Lng: {position.coords.longitude}</p>
      <p>Accuracy: {position.coords.accuracy}m</p>
      <button onClick={() => getCurrentPosition()}>
        Refresh Location
      </button>
      <button onClick={startWatching}>Start Watching</button>
      <button onClick={stopWatching}>Stop Watching</button>
    </div>
  );
}
\`\`\`

## Advanced Features

### Geofencing

\`\`\`tsx
const { addGeofence, removeGeofence } = useGeolocation();

// Add a geofence around a location
const geofenceId = addGeofence({
  center: { lat: 37.7749, lng: -122.4194 },
  radius: 1000, // 1km radius
  onEnter: (position) => console.log('Entered geofence!'),
  onExit: (position) => console.log('Left geofence!')
});
\`\`\`

### Position History & Tracking

\`\`\`tsx
const { positions, clearHistory, isWatching } = useGeolocation({
  watch: true, // Auto-start watching
  trackingInterval: 5000 // Update every 5 seconds
});

// positions array contains all tracked positions
console.log(\`Tracked \${positions.length} positions\`);
\`\`\`

### Offline Support

\`\`\`tsx
const { getCachedPosition, queueLocationUpdate } = useGeolocation();

// Get last cached position when offline
const lastKnownPosition = getCachedPosition();

// Queue updates for when connection returns
queueLocationUpdate({ userId: 123, action: 'checkin' });
\`\`\`

### Utilities

\`\`\`tsx
const { calculateDistance, calculateBearing } = useGeolocation();

const pos1 = { lat: 37.7749, lng: -122.4194 }; // San Francisco
const pos2 = { lat: 40.7128, lng: -74.0060 };  // New York

const distance = calculateDistance(pos1, pos2); // meters
const bearing = calculateBearing(pos1, pos2);   // degrees
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Basic geolocation demo component
const GeolocationDemo: React.FC<{ options?: any }> = ({ options = {} }) => {
  const {
    position,
    error,
    loading,
    permission,
    isSupported,
    positions,
    isWatching,
    getCurrentPosition,
    startWatching,
    stopWatching,
    clearHistory,
    requestPermission,
    calculateDistance,
    calculateBearing,
  } = useGeolocation(options);

  const [lastTwoPositions, setLastTwoPositions] = useState<{
    pos1: Coordinates | null;
    pos2: Coordinates | null;
  }>({
    pos1: null,
    pos2: null,
  });

  // Update last two positions when positions change
  useEffect(() => {
    if (positions.length >= 2) {
      const latest = positions[positions.length - 1];
      const previous = positions[positions.length - 2];
      setLastTwoPositions({
        pos1: { lat: previous.coords.latitude, lng: previous.coords.longitude },
        pos2: { lat: latest.coords.latitude, lng: latest.coords.longitude },
      });
    }
  }, [positions]);

  const distance =
    lastTwoPositions.pos1 && lastTwoPositions.pos2
      ? calculateDistance(lastTwoPositions.pos1, lastTwoPositions.pos2)
      : null;

  const bearing =
    lastTwoPositions.pos1 && lastTwoPositions.pos2
      ? calculateBearing(lastTwoPositions.pos1, lastTwoPositions.pos2)
      : null;

  if (!isSupported) {
    return (
      <div className='p-4 border border-red-200 rounded-lg bg-red-50'>
        <h3 className='text-red-800 font-semibold'>
          Geolocation Not Supported
        </h3>
        <p className='text-red-600'>
          Your browser doesn't support geolocation.
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-4 p-4 border rounded-lg'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Geolocation Status</h3>
        <span
          className={`px-2 py-1 rounded text-sm font-medium ${
            permission === 'granted'
              ? 'bg-green-100 text-green-800'
              : permission === 'denied'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {permission}
        </span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Current Position */}
        <div className='space-y-2'>
          <h4 className='font-medium'>Current Position</h4>
          {loading && <p className='text-blue-600'>Getting location...</p>}
          {error && (
            <div className='p-2 bg-red-50 border border-red-200 rounded'>
              <p className='text-red-800 text-sm'>Error: {error.message}</p>
              <p className='text-red-600 text-xs'>Code: {error.code}</p>
            </div>
          )}
          {position && (
            <div className='space-y-1 text-sm'>
              <p>
                <strong>Latitude:</strong> {position.coords.latitude.toFixed(6)}
              </p>
              <p>
                <strong>Longitude:</strong>{' '}
                {position.coords.longitude.toFixed(6)}
              </p>
              <p>
                <strong>Accuracy:</strong> ±
                {position.coords.accuracy.toFixed(0)}m
              </p>
              {position.coords.altitude && (
                <p>
                  <strong>Altitude:</strong>{' '}
                  {position.coords.altitude.toFixed(0)}m
                </p>
              )}
              {position.coords.speed && (
                <p>
                  <strong>Speed:</strong>{' '}
                  {(position.coords.speed * 3.6).toFixed(1)} km/h
                </p>
              )}
              {position.coords.heading && (
                <p>
                  <strong>Heading:</strong> {position.coords.heading.toFixed(0)}
                  °
                </p>
              )}
              <p className='text-gray-500'>
                <strong>Updated:</strong>{' '}
                {new Date(position.timestamp).toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>

        {/* Position History */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h4 className='font-medium'>Position History</h4>
            <span
              className={`px-2 py-1 rounded text-xs ${
                isWatching
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isWatching ? 'Watching' : 'Stopped'}
            </span>
          </div>
          <div className='text-sm'>
            <p>
              <strong>Tracked:</strong> {positions.length} positions
            </p>
            {distance !== null && (
              <p>
                <strong>Last Movement:</strong> {distance.toFixed(1)}m
              </p>
            )}
            {bearing !== null && (
              <p>
                <strong>Direction:</strong> {bearing.toFixed(0)}° (
                {getDirectionName(bearing)})
              </p>
            )}
          </div>
          {positions.length > 0 && (
            <div className='max-h-32 overflow-y-auto text-xs space-y-1'>
              {positions
                .slice(-5)
                .reverse()
                .map((pos, index) => (
                  <div key={pos.timestamp} className='p-1 bg-gray-50 rounded'>
                    <span>
                      {new Date(pos.timestamp).toLocaleTimeString()}:{' '}
                    </span>
                    <span>
                      {pos.coords.latitude.toFixed(4)},{' '}
                      {pos.coords.longitude.toFixed(4)}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className='flex flex-wrap gap-2'>
        <button
          onClick={() => getCurrentPosition()}
          disabled={loading}
          className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 text-sm'
        >
          {loading ? 'Getting...' : 'Get Position'}
        </button>

        <button
          onClick={isWatching ? stopWatching : startWatching}
          className={`px-3 py-1 rounded text-sm ${
            isWatching
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isWatching ? 'Stop Watching' : 'Start Watching'}
        </button>

        <button
          onClick={clearHistory}
          disabled={positions.length === 0}
          className='px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 text-sm'
        >
          Clear History ({positions.length})
        </button>

        {permission !== 'granted' && (
          <button
            onClick={() => requestPermission()}
            className='px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm'
          >
            Request Permission
          </button>
        )}
      </div>
    </div>
  );
};

// Geofencing demo component
const GeofencingDemo: React.FC = () => {
  const { position, addGeofence, removeGeofence, getActiveGeofences } =
    useGeolocation({ watch: true });

  const [geofences, setGeofences] = useState<string[]>([]);
  const [events, setEvents] = useState<
    Array<{ type: string; time: string; position: Coordinates }>
  >([]);

  const addSampleGeofence = () => {
    if (!position) return;

    const id = addGeofence({
      center: { lat: position.coords.latitude, lng: position.coords.longitude },
      radius: 100, // 100 meter radius
      onEnter: pos => {
        setEvents(prev => [
          ...prev,
          {
            type: 'ENTER',
            time: new Date().toLocaleTimeString(),
            position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          },
        ]);
      },
      onExit: pos => {
        setEvents(prev => [
          ...prev,
          {
            type: 'EXIT',
            time: new Date().toLocaleTimeString(),
            position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          },
        ]);
      },
    });

    setGeofences(prev => [...prev, id]);
  };

  const removeSampleGeofence = (id: string) => {
    removeGeofence(id);
    setGeofences(prev => prev.filter(gId => gId !== id));
  };

  return (
    <div className='space-y-4 p-4 border rounded-lg'>
      <h3 className='text-lg font-semibold'>Geofencing Demo</h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <h4 className='font-medium mb-2'>
            Active Geofences ({geofences.length})
          </h4>
          <div className='space-y-2'>
            {geofences.map(id => (
              <div
                key={id}
                className='flex items-center justify-between p-2 bg-blue-50 rounded'
              >
                <span className='text-sm font-mono'>{id.slice(0, 15)}...</span>
                <button
                  onClick={() => removeSampleGeofence(id)}
                  className='px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600'
                >
                  Remove
                </button>
              </div>
            ))}
            {geofences.length === 0 && (
              <p className='text-gray-500 text-sm'>No active geofences</p>
            )}
          </div>

          <button
            onClick={addSampleGeofence}
            disabled={!position}
            className='mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 text-sm'
          >
            Add Geofence Here (100m)
          </button>
        </div>

        <div>
          <h4 className='font-medium mb-2'>
            Geofence Events ({events.length})
          </h4>
          <div className='max-h-40 overflow-y-auto space-y-1'>
            {events
              .slice(-10)
              .reverse()
              .map((event, index) => (
                <div
                  key={index}
                  className={`p-2 rounded text-sm ${
                    event.type === 'ENTER'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  } border`}
                >
                  <div className='flex items-center justify-between'>
                    <span
                      className={`font-medium ${
                        event.type === 'ENTER'
                          ? 'text-green-800'
                          : 'text-red-800'
                      }`}
                    >
                      {event.type}
                    </span>
                    <span className='text-xs text-gray-500'>{event.time}</span>
                  </div>
                  <p className='text-xs text-gray-600 font-mono'>
                    {event.position.lat.toFixed(6)},{' '}
                    {event.position.lng.toFixed(6)}
                  </p>
                </div>
              ))}
            {events.length === 0 && (
              <p className='text-gray-500 text-sm'>No events yet</p>
            )}
          </div>
        </div>
      </div>

      {!position && (
        <div className='p-3 bg-yellow-50 border border-yellow-200 rounded'>
          <p className='text-yellow-800 text-sm'>
            Position required to create geofences. Please allow location access.
          </p>
        </div>
      )}
    </div>
  );
};

// Helper function to get direction name from bearing
function getDirectionName(bearing: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(bearing / 45) % 8;
  return directions[index];
}

// Stories
export const Default: Story = {
  render: () => <GeolocationDemo />,
};

export const HighAccuracy: Story = {
  render: () => (
    <GeolocationDemo
      options={{
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'High accuracy mode provides more precise location data but may consume more battery.',
      },
    },
  },
};

export const WatchingMode: Story = {
  render: () => (
    <GeolocationDemo
      options={{
        watch: true,
        trackingInterval: 3000,
        enableHighAccuracy: false,
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Automatically starts position watching for continuous location updates.',
      },
    },
  },
};

export const GeofencingExample: Story = {
  render: () => <GeofencingDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates geofencing capabilities with enter/exit event detection.',
      },
    },
  },
};

export const BatteryOptimized: Story = {
  render: () => (
    <GeolocationDemo
      options={{
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 300000, // 5 minutes
        trackingInterval: 10000, // 10 seconds
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Battery-optimized configuration with longer intervals and cached positions.',
      },
    },
  },
};
