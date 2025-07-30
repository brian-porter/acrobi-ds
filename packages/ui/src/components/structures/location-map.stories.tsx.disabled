import type { Meta, StoryObj } from '@storybook/react';
import { LocationMap, locationMapUtils } from './location-map';
import { useGeolocation } from '../../hooks/use-geolocation';
import React, { useState, useEffect } from 'react';

const meta: Meta<typeof LocationMap> = {
  title: '4. Structures/LocationMap',
  component: LocationMap,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Interactive map component using Leaflet and OpenStreetMap for displaying locations, markers, and geographic data. Perfect for AAE applications with geolocation features.',
      },
    },
  },
  argTypes: {
    latitude: {
      control: { type: 'number', min: -90, max: 90, step: 0.001 },
      description: 'Latitude coordinate for map center',
    },
    longitude: {
      control: { type: 'number', min: -180, max: 180, step: 0.001 },
      description: 'Longitude coordinate for map center',
    },
    zoom: {
      control: { type: 'number', min: 1, max: 20, step: 1 },
      description: 'Zoom level (1-20)',
    },
    width: {
      control: 'text',
      description: 'Map width (CSS value)',
    },
    height: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
      description: 'Map height in pixels',
    },
    variant: {
      control: 'radio',
      options: ['default', 'minimal', 'satellite'],
      description: 'Map style variant',
    },
    showZoomControls: {
      control: 'boolean',
      description: 'Whether to show zoom controls',
    },
    showAttribution: {
      control: 'boolean',
      description: 'Whether to show map attribution',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether map is interactive',
    },
    enableGeolocation: {
      control: 'boolean',
      description: 'Whether to enable geolocation control',
    },
    fitBounds: {
      control: 'boolean',
      description: 'Whether to fit bounds to all markers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LocationMap>;

// Sample locations for demos
const SAMPLE_LOCATIONS = {
  newYork: { latitude: 40.7128, longitude: -74.006, name: 'New York City' },
  london: { latitude: 51.5074, longitude: -0.1278, name: 'London' },
  tokyo: { latitude: 35.6762, longitude: 139.6503, name: 'Tokyo' },
  sydney: { latitude: -33.8688, longitude: 151.2093, name: 'Sydney' },
  paris: { latitude: 48.8566, longitude: 2.3522, name: 'Paris' },
  sanFrancisco: {
    latitude: 37.7749,
    longitude: -122.4194,
    name: 'San Francisco',
  },
};

// Basic usage example
export const Default: Story = {
  args: {
    latitude: SAMPLE_LOCATIONS.newYork.latitude,
    longitude: SAMPLE_LOCATIONS.newYork.longitude,
    zoom: 13,
    height: 400,
    width: '100%',
    showZoomControls: true,
    showAttribution: true,
    interactive: true,
    variant: 'default',
  },
};

// With single marker
export const WithMarker: Story = {
  args: {
    latitude: SAMPLE_LOCATIONS.london.latitude,
    longitude: SAMPLE_LOCATIONS.london.longitude,
    zoom: 12,
    height: 400,
    markers: [
      {
        id: 'london-marker',
        latitude: SAMPLE_LOCATIONS.london.latitude,
        longitude: SAMPLE_LOCATIONS.london.longitude,
        popup: (
          <div className='text-center'>
            <h3 className='font-semibold text-sm'>London</h3>
            <p className='text-xs text-gray-600'>
              Capital of the United Kingdom
            </p>
          </div>
        ),
      },
    ],
  },
};

// Multiple markers with fit bounds
export const MultipleMarkers: Story = {
  args: {
    latitude: 40.7128, // Will be overridden by fitBounds
    longitude: -74.006,
    zoom: 2,
    height: 500,
    fitBounds: true,
    markers: [
      {
        id: 'ny',
        latitude: SAMPLE_LOCATIONS.newYork.latitude,
        longitude: SAMPLE_LOCATIONS.newYork.longitude,
        popup: (
          <div>
            <strong>New York City</strong>
            <br />
            The Big Apple
          </div>
        ),
      },
      {
        id: 'london',
        latitude: SAMPLE_LOCATIONS.london.latitude,
        longitude: SAMPLE_LOCATIONS.london.longitude,
        popup: (
          <div>
            <strong>London</strong>
            <br />
            UK Capital
          </div>
        ),
      },
      {
        id: 'tokyo',
        latitude: SAMPLE_LOCATIONS.tokyo.latitude,
        longitude: SAMPLE_LOCATIONS.tokyo.longitude,
        popup: (
          <div>
            <strong>Tokyo</strong>
            <br />
            Japan Capital
          </div>
        ),
      },
      {
        id: 'sydney',
        latitude: SAMPLE_LOCATIONS.sydney.latitude,
        longitude: SAMPLE_LOCATIONS.sydney.longitude,
        popup: (
          <div>
            <strong>Sydney</strong>
            <br />
            Australia
          </div>
        ),
      },
    ],
  },
};

// Different map variants
export const SatelliteView: Story = {
  args: {
    latitude: SAMPLE_LOCATIONS.paris.latitude,
    longitude: SAMPLE_LOCATIONS.paris.longitude,
    zoom: 14,
    height: 400,
    variant: 'satellite',
    markers: [
      {
        id: 'eiffel-tower',
        latitude: 48.8584,
        longitude: 2.2945,
        popup: (
          <div>
            <strong>Eiffel Tower</strong>
            <br />
            Iconic Paris landmark
          </div>
        ),
      },
    ],
  },
};

export const MinimalStyle: Story = {
  args: {
    latitude: SAMPLE_LOCATIONS.sanFrancisco.latitude,
    longitude: SAMPLE_LOCATIONS.sanFrancisco.longitude,
    zoom: 12,
    height: 400,
    variant: 'minimal',
    showZoomControls: false,
    showAttribution: false,
  },
};

// Interactive demo with geolocation
const GeolocationDemo = () => {
  const { position, loading, error, getCurrentPosition, permission } =
    useGeolocation();
  const [mapMarkers, setMapMarkers] = useState<any[]>([]);
  const [clickedLocation, setClickedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const markers = [];

    // Add current position marker if available
    if (position) {
      markers.push({
        id: 'current-location',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        popup: (
          <div className='text-center'>
            <h3 className='font-semibold text-sm text-blue-600'>
              📍 Your Location
            </h3>
            <p className='text-xs text-gray-600'>
              Accuracy: {Math.round(position.coords.accuracy)}m
            </p>
            <p className='text-xs text-gray-500'>
              {new Date(position.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ),
      });
    }

    // Add clicked location marker if available
    if (clickedLocation) {
      markers.push({
        id: 'clicked-location',
        latitude: clickedLocation.latitude,
        longitude: clickedLocation.longitude,
        popup: (
          <div className='text-center'>
            <h3 className='font-semibold text-sm text-green-600'>
              📌 Clicked Location
            </h3>
            <p className='text-xs text-gray-600'>
              {clickedLocation.latitude.toFixed(4)},{' '}
              {clickedLocation.longitude.toFixed(4)}
            </p>
          </div>
        ),
      });
    }

    setMapMarkers(markers);
  }, [position, clickedLocation]);

  const handleMapClick = ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    setClickedLocation({ latitude, longitude });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>🗺️ Interactive Geolocation Map</h3>
        <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>
          Click "Get Location" to see your current position, then click anywhere
          on the map to add markers.
        </p>

        {/* Controls */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={getCurrentPosition}
            disabled={loading}
            style={{
              padding: '8px 16px',
              backgroundColor: loading ? '#9CA3AF' : '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
            }}
          >
            {loading ? 'Getting Location...' : '📍 Get My Location'}
          </button>

          {clickedLocation && (
            <button
              onClick={() => setClickedLocation(null)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#EF4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              🗑️ Clear Clicked Marker
            </button>
          )}
        </div>

        {/* Status */}
        <div style={{ marginBottom: '15px' }}>
          {error && (
            <div
              style={{
                padding: '8px 12px',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '6px',
                color: '#DC2626',
                fontSize: '14px',
              }}
            >
              ⚠️ {error.message}
            </div>
          )}

          {position && (
            <div
              style={{
                padding: '8px 12px',
                backgroundColor: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: '6px',
                color: '#166534',
                fontSize: '14px',
              }}
            >
              ✅ Location found: {position.coords.latitude.toFixed(4)},{' '}
              {position.coords.longitude.toFixed(4)}
              (±{Math.round(position.coords.accuracy)}m)
            </div>
          )}

          {permission === 'denied' && (
            <div
              style={{
                padding: '8px 12px',
                backgroundColor: '#FEF3C7',
                border: '1px solid #FDE68A',
                borderRadius: '6px',
                color: '#92400E',
                fontSize: '14px',
              }}
            >
              🔒 Location permission denied. Please enable location access in
              your browser.
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <LocationMap
        latitude={
          position?.coords.latitude || SAMPLE_LOCATIONS.newYork.latitude
        }
        longitude={
          position?.coords.longitude || SAMPLE_LOCATIONS.newYork.longitude
        }
        zoom={position ? 15 : 13}
        height={400}
        markers={mapMarkers}
        enableGeolocation
        onMapClick={handleMapClick}
        onMarkerClick={marker => {
          console.log('Marker clicked:', marker);
        }}
        loading={loading && !position}
      />

      {/* Instructions */}
      <div
        style={{
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#F8FAFC',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#475569',
        }}
      >
        <strong>Instructions:</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>
            Click "Get My Location" to center the map on your current position
          </li>
          <li>
            Click anywhere on the map to add a green marker at that location
          </li>
          <li>Click on any marker to see its popup information</li>
          <li>
            Use the location button (📍) in the top-right to re-center on your
            location
          </li>
          <li>Zoom and pan the map to explore different areas</li>
        </ul>
      </div>
    </div>
  );
};

export const GeolocationIntegration: Story = {
  render: () => <GeolocationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo showing LocationMap integration with the useGeolocation hook. Click "Get Location" to see your current position, then click on the map to add markers.',
      },
    },
  },
};

// Loading and error states
export const LoadingState: Story = {
  args: {
    latitude: SAMPLE_LOCATIONS.tokyo.latitude,
    longitude: SAMPLE_LOCATIONS.tokyo.longitude,
    loading: true,
    height: 300,
  },
};

export const ErrorState: Story = {
  args: {
    latitude: SAMPLE_LOCATIONS.sydney.latitude,
    longitude: SAMPLE_LOCATIONS.sydney.longitude,
    error: 'Failed to load map tiles. Please check your internet connection.',
    height: 300,
  },
};

// Invalid coordinates
export const InvalidCoordinates: Story = {
  args: {
    latitude: NaN,
    longitude: undefined as any,
    height: 300,
  },
};

// Utility functions demo
const UtilitiesDemo = () => {
  const coordinates = [
    { latitude: 40.7128, longitude: -74.006 }, // NYC
    { latitude: 34.0522, longitude: -118.2437 }, // LA
    { latitude: 41.8781, longitude: -87.6298 }, // Chicago
  ];

  const center = locationMapUtils.getCenterOfCoordinates(coordinates);
  const zoom = locationMapUtils.getZoomForBounds(coordinates);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h3 style={{ margin: '0 0 15px 0' }}>🛠️ Location Map Utilities</h3>

      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#F1F5F9',
          borderRadius: '8px',
        }}
      >
        <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
          Utility Functions Demo
        </h4>
        <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
          <p>
            <strong>Sample coordinates:</strong>
          </p>
          <ul style={{ marginLeft: '20px' }}>
            <li>
              New York: {coordinates[0].latitude}, {coordinates[0].longitude}
            </li>
            <li>
              Los Angeles: {coordinates[1].latitude}, {coordinates[1].longitude}
            </li>
            <li>
              Chicago: {coordinates[2].latitude}, {coordinates[2].longitude}
            </li>
          </ul>
          <p>
            <strong>Calculated center:</strong> {center.latitude.toFixed(4)},{' '}
            {center.longitude.toFixed(4)}
          </p>
          <p>
            <strong>Recommended zoom:</strong> {zoom}
          </p>
          <p>
            <strong>Valid coordinates check:</strong>{' '}
            {locationMapUtils.isValidCoordinates(40.7128, -74.006)
              ? '✅ Valid'
              : '❌ Invalid'}
          </p>
        </div>
      </div>

      <LocationMap
        latitude={center.latitude}
        longitude={center.longitude}
        zoom={zoom}
        height={400}
        markers={coordinates.map((coord, index) => ({
          id: `city-${index}`,
          latitude: coord.latitude,
          longitude: coord.longitude,
          popup: <div>City {index + 1}</div>,
        }))}
        fitBounds
      />
    </div>
  );
};

export const UtilitiesFunctions: Story = {
  render: () => <UtilitiesDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of the utility functions provided with LocationMap for coordinate calculations and validation.',
      },
    },
  },
};
