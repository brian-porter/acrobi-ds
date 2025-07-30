# LocationMap Structure (Epic 42)

## Overview

The `LocationMap` structure provides an interactive mapping solution using Leaflet and OpenStreetMap for displaying locations, markers, and geographic data. It's designed for AAE applications that need to display geolocation results, interactive mapping features, and location-based visualizations.

## Features

- ✅ **Interactive Mapping**: Full-featured maps with pan, zoom, and click interactions
- ✅ **OpenStreetMap Integration**: Uses OSM tiles by default with multiple variants
- ✅ **Custom Markers**: Support for multiple markers with popups and custom icons
- ✅ **Geolocation Integration**: Works seamlessly with the `useGeolocation` hook
- ✅ **Multiple Map Styles**: Default, minimal, and satellite view options
- ✅ **Responsive Design**: Configurable dimensions and responsive behavior
- ✅ **Error Handling**: Graceful handling of invalid coordinates and loading states
- ✅ **SSR Safe**: Dynamic imports prevent server-side rendering issues
- ✅ **TypeScript Support**: Full type safety with comprehensive interfaces
- ✅ **Accessibility**: Keyboard navigation and screen reader support

## Installation

```bash
npm install @acrobi/ui react-leaflet leaflet @types/leaflet
```

## Basic Usage

```tsx
import { LocationMap } from '@acrobi/ui';

function BasicMapExample() {
  return (
    <LocationMap
      latitude={40.7128}
      longitude={-74.0060}
      zoom={13}
      height={400}
      width="100%"
    />
  );
}
```

## With Geolocation Hook

```tsx
import { useGeolocation, LocationMap } from '@acrobi/ui';

function GeolocationMapExample() {
  const { position, loading, error } = useGeolocation({
    enableHighAccuracy: true
  });

  if (loading) return <div>Getting location...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <LocationMap
      latitude={position?.coords.latitude || 40.7128}
      longitude={position?.coords.longitude || -74.0060}
      zoom={15}
      height={400}
      markers={position ? [{
        id: 'current-location',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        popup: (
          <div>
            <h3>📍 Your Location</h3>
            <p>Accuracy: ±{Math.round(position.coords.accuracy)}m</p>
          </div>
        )
      }] : []}
      enableGeolocation
    />
  );
}
```

## Multiple Markers with Popups

```tsx
function MultipleMarkersExample() {
  const markers = [
    {
      id: 'marker-1',
      latitude: 40.7128,
      longitude: -74.0060,
      popup: (
        <div>
          <h3>New York City</h3>
          <p>The Big Apple</p>
        </div>
      )
    },
    {
      id: 'marker-2',
      latitude: 34.0522,
      longitude: -118.2437,
      popup: (
        <div>
          <h3>Los Angeles</h3>
          <p>City of Angels</p>
        </div>
      )
    }
  ];

  return (
    <LocationMap
      latitude={37.0902}  // Center between markers
      longitude={-95.7129}
      zoom={4}
      height={500}
      markers={markers}
      fitBounds={true}  // Auto-zoom to fit all markers
      onMarkerClick={(marker) => {
        console.log('Clicked marker:', marker.id);
      }}
    />
  );
}
```

## Map Variants

### Satellite View

```tsx
<LocationMap
  latitude={48.8566}
  longitude={2.3522}
  zoom={14}
  variant="satellite"
  height={400}
/>
```

### Minimal Style

```tsx
<LocationMap
  latitude={51.5074}
  longitude={-0.1278}
  zoom={12}
  variant="minimal"
  showZoomControls={false}
  showAttribution={false}
  height={400}
/>
```

## Interactive Features

```tsx
function InteractiveMapExample() {
  const [clickedLocation, setClickedLocation] = useState(null);

  return (
    <LocationMap
      latitude={37.7749}
      longitude={-122.4194}
      zoom={13}
      height={400}
      onMapClick={({ latitude, longitude }) => {
        setClickedLocation({ latitude, longitude });
        console.log('Map clicked at:', latitude, longitude);
      }}
      markers={clickedLocation ? [{
        id: 'clicked-marker',
        latitude: clickedLocation.latitude,
        longitude: clickedLocation.longitude,
        popup: (
          <div>
            <h3>📌 Clicked Location</h3>
            <p>{clickedLocation.latitude.toFixed(4)}, {clickedLocation.longitude.toFixed(4)}</p>
          </div>
        )
      }] : []}
      enableGeolocation
    />
  );
}
```

## Loading and Error States

```tsx
function StateHandlingExample() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <>
      {/* Loading state */}
      <LocationMap
        latitude={40.7128}
        longitude={-74.0060}
        loading={loading}
        height={300}
      />

      {/* Error state */}
      <LocationMap
        latitude={40.7128}
        longitude={-74.0060}
        error="Failed to load map tiles. Please check your internet connection."
        height={300}
      />

      {/* Invalid coordinates */}
      <LocationMap
        latitude={NaN}
        longitude={undefined}
        height={300}
      />
    </>
  );
}
```

## API Reference

### Props

```typescript
interface LocationMapProps {
  // Positioning
  latitude?: number;                    // Map center latitude
  longitude?: number;                   // Map center longitude
  zoom?: number;                        // Zoom level (1-20)
  
  // Dimensions
  width?: number | string;              // Map width
  height?: number | string;             // Map height
  
  // Markers
  markers?: LocationMapMarker[];        // Array of markers to display
  
  // Map controls
  showZoomControls?: boolean;           // Show zoom controls
  showAttribution?: boolean;            // Show map attribution
  interactive?: boolean;                // Map is interactive
  enableGeolocation?: boolean;          // Show geolocation button
  
  // Styling
  variant?: 'default' | 'minimal' | 'satellite';  // Map style
  tileLayerUrl?: string;                // Custom tile layer URL
  tileLayerAttribution?: string;        // Custom attribution
  
  // Behavior
  fitBounds?: boolean;                  // Fit bounds to markers
  
  // States
  loading?: boolean;                    // Loading state
  error?: string;                       // Error message
  
  // Event handlers
  onMapClick?: (event: { latitude: number; longitude: number }) => void;
  onMarkerClick?: (marker: LocationMapMarker) => void;
}
```

### Marker Interface

```typescript
interface LocationMapMarker {
  id?: string;                          // Unique identifier
  latitude: number;                     // Marker latitude
  longitude: number;                    // Marker longitude
  popup?: React.ReactNode;              // Popup content
  title?: string;                       // Marker title
  icon?: any;                           // Custom Leaflet icon
}
```

### Utility Functions

The component exports utility functions for coordinate manipulation:

```typescript
import { locationMapUtils } from '@acrobi/ui';

// Check if coordinates are valid
const isValid = locationMapUtils.isValidCoordinates(lat, lng);

// Calculate center point of multiple coordinates
const center = locationMapUtils.getCenterOfCoordinates([
  { latitude: 40.7128, longitude: -74.0060 },
  { latitude: 34.0522, longitude: -118.2437 }
]);

// Get appropriate zoom level for a set of coordinates
const zoom = locationMapUtils.getZoomForBounds(coordinates);
```

## Configuration

### Tile Layer Options

The component supports multiple tile layer providers:

```tsx
// OpenStreetMap (default)
<LocationMap variant="default" />

// Humanitarian OSM (minimal style)
<LocationMap variant="minimal" />

// Esri Satellite Imagery
<LocationMap variant="satellite" />

// Custom tile layer
<LocationMap
  tileLayerUrl="https://tiles.example.com/{z}/{x}/{y}.png"
  tileLayerAttribution="© Custom Provider"
/>
```

### Leaflet Icon Configuration

For custom marker icons, you can configure Leaflet icons:

```tsx
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: '/images/custom-marker.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

<LocationMap
  markers={[{
    latitude: 40.7128,
    longitude: -74.0060,
    icon: customIcon
  }]}
/>
```

## Performance Considerations

### Marker Optimization

For large numbers of markers, consider:

```tsx
// Use marker clustering for many markers
import MarkerClusterGroup from 'react-leaflet-markercluster';

// Virtualize markers outside viewport
const visibleMarkers = markers.filter(marker => 
  isMarkerInBounds(marker, mapBounds)
);
```

### Memory Management

```tsx
// Clean up map instances
useEffect(() => {
  return () => {
    if (mapRef.current) {
      mapRef.current.remove();
    }
  };
}, []);
```

## Browser Support

- ✅ **Chrome**: Full support with hardware acceleration
- ✅ **Firefox**: Full support with WebGL
- ✅ **Safari**: Good support (some performance limitations)
- ✅ **Edge**: Full support
- ⚠️ **Mobile Safari**: Some touch gesture limitations
- ❌ **IE**: Not supported (requires polyfills)

## Accessibility

The component includes accessibility features:

- Keyboard navigation support
- Screen reader compatibility
- Focus management
- ARIA labels for controls

## Security Considerations

- Uses HTTPS tile providers by default
- Validates coordinate inputs
- Sanitizes user-provided content in popups
- Prevents XSS in custom tile layer URLs

## Testing

The component includes comprehensive tests:

```bash
npm test location-map
```

Test coverage includes:
- Basic rendering
- Marker display and interaction
- Error state handling
- Utility function validation
- Accessibility compliance

## Integration with useGeolocation

The LocationMap works seamlessly with the `useGeolocation` hook:

```tsx
function IntegratedExample() {
  const {
    position,
    positions,
    addGeofence,
    isWatching,
    startWatching,
    stopWatching
  } = useGeolocation({ watch: true });

  const createGeofence = () => {
    if (position) {
      addGeofence({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        radius: 1000,
        onEnter: () => console.log('Entered area'),
        onExit: () => console.log('Left area')
      });
    }
  };

  return (
    <div>
      <div>
        <button onClick={isWatching ? stopWatching : startWatching}>
          {isWatching ? 'Stop Tracking' : 'Start Tracking'}
        </button>
        <button onClick={createGeofence} disabled={!position}>
          Create Geofence
        </button>
      </div>
      
      <LocationMap
        latitude={position?.coords.latitude || 40.7128}
        longitude={position?.coords.longitude || -74.0060}
        zoom={15}
        height={500}
        markers={[
          // Current position
          ...(position ? [{
            id: 'current',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            popup: <div>📍 Current Location</div>
          }] : []),
          
          // Position history trail
          ...positions.slice(-10).map((pos, index) => ({
            id: `trail-${index}`,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            popup: <div>📍 Position {index + 1}</div>
          }))
        ]}
        enableGeolocation
        onMapClick={({ latitude, longitude }) => {
          console.log('Map clicked at:', latitude, longitude);
        }}
      />
    </div>
  );
}
```

## Related Components

- **useGeolocation Hook** - Core geolocation functionality
- **Grant Permissions Structure** - Location permission UI
- **Banner Structure** - Location-based notifications

## Examples

Check out the Storybook stories for interactive examples:

```bash
npm run storybook
```

Navigate to "Structures > LocationMap" to see all examples in action.

## Migration Guide

### From Basic Leaflet

```tsx
// Before (basic Leaflet)
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

<MapContainer center={[lat, lng]} zoom={13}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <Marker position={[lat, lng]} />
</MapContainer>

// After (LocationMap)
<LocationMap
  latitude={lat}
  longitude={lng}
  zoom={13}
  markers={[{ latitude: lat, longitude: lng }]}
/>
```

## Contributing

When contributing to the LocationMap component:

1. Ensure Leaflet dependencies are properly handled
2. Test across different map providers
3. Validate coordinate edge cases
4. Update TypeScript definitions
5. Add Storybook examples for new features
6. Consider performance implications for many markers

## Changelog

### v1.0.0 (Epic 42)
- ✅ Initial implementation with Epic 42 requirements
- ✅ OpenStreetMap integration with react-leaflet  
- ✅ Multiple marker support with popups
- ✅ Map style variants (default, minimal, satellite)
- ✅ Interactive features (click handlers, geolocation control)
- ✅ Error handling and loading states
- ✅ SSR-safe dynamic imports
- ✅ Utility functions for coordinate manipulation
- ✅ TypeScript support with comprehensive interfaces
- ✅ Storybook documentation with interactive examples
- ✅ Integration with useGeolocation hook
- ✅ Accessibility and performance optimizations