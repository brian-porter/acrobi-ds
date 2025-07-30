# useGeolocation Hook (Epic 42)

## Overview

The `useGeolocation` hook provides comprehensive geolocation and mapping capabilities for Progressive Web Applications. It includes advanced features like geofencing, position tracking, coordinate system conversions, and offline support with robust error handling and privacy management.

## Features

- ✅ **Advanced Geolocation**: High-accuracy positioning with configurable options
- ✅ **Position Watching**: Continuous position tracking with start/stop controls
- ✅ **Position History**: Track and manage position history over time
- ✅ **Geofencing**: Create geographic boundaries with enter/exit detection
- ✅ **Permission Management**: Handle location permissions transparently
- ✅ **Offline Support**: Cache positions and queue updates for offline use
- ✅ **Utilities**: Distance, bearing calculations and coordinate conversions
- ✅ **Legacy Compatibility**: Backwards compatible with older geolocation APIs
- ✅ **TypeScript Support**: Full type safety with comprehensive interfaces

## Installation

```bash
npm install @acrobi/ui
```

## Basic Usage

```tsx
import { useGeolocation } from '@acrobi/ui';

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
      <p>Latitude: {position.coords.latitude}</p>
      <p>Longitude: {position.coords.longitude}</p>
      <p>Accuracy: ±{position.coords.accuracy}m</p>
      <button onClick={() => getCurrentPosition()}>
        Refresh Location
      </button>
      <button onClick={startWatching}>Start Watching</button>
      <button onClick={stopWatching}>Stop Watching</button>
    </div>
  );
}
```

## Advanced Features

### Position Watching & History

```tsx
function TrackingComponent() {
  const { 
    positions, 
    isWatching, 
    clearHistory 
  } = useGeolocation({
    watch: true, // Auto-start watching
    trackingInterval: 5000, // Update every 5 seconds
    onPositionChange: (position) => {
      console.log('New position:', position);
    }
  });

  return (
    <div>
      <p>Tracking: {isWatching ? 'Active' : 'Stopped'}</p>
      <p>Positions tracked: {positions.length}</p>
      <button onClick={clearHistory}>Clear History</button>
      
      {positions.slice(-5).map((pos, index) => (
        <div key={pos.timestamp}>
          Position {index + 1}: {pos.coords.latitude.toFixed(6)}, {pos.coords.longitude.toFixed(6)}
          <small> - {new Date(pos.timestamp).toLocaleTimeString()}</small>
        </div>
      ))}
    </div>
  );
}
```

### Geofencing

```tsx
function GeofencingComponent() {
  const { 
    position,
    addGeofence, 
    removeGeofence, 
    getActiveGeofences 
  } = useGeolocation({ watch: true });

  const createGeofence = () => {
    if (!position) return;

    const geofenceId = addGeofence({
      center: { 
        lat: position.coords.latitude, 
        lng: position.coords.longitude 
      },
      radius: 1000, // 1km radius
      onEnter: (position) => {
        console.log('Entered geofence!', position);
        // Show notification, trigger action, etc.
      },
      onExit: (position) => {
        console.log('Left geofence!', position);
        // Handle exit logic
      }
    });

    console.log('Created geofence:', geofenceId);
  };

  return (
    <div>
      <button onClick={createGeofence} disabled={!position}>
        Create Geofence Here
      </button>
      <p>Active geofences: {getActiveGeofences().length}</p>
    </div>
  );
}
```

### Permission Management

```tsx
function PermissionComponent() {
  const { 
    permission, 
    isSupported, 
    requestPermission 
  } = useGeolocation();

  if (!isSupported) {
    return <div>Geolocation is not supported in this browser</div>;
  }

  return (
    <div>
      <p>Permission status: {permission}</p>
      
      {permission === 'prompt' && (
        <button onClick={requestPermission}>
          Request Location Permission
        </button>
      )}
      
      {permission === 'denied' && (
        <div>
          <p>Location access denied. Please enable in browser settings.</p>
        </div>
      )}
      
      {permission === 'granted' && (
        <p>Location access granted ✅</p>
      )}
    </div>
  );
}
```

### Offline Support

```tsx
function OfflineComponent() {
  const { 
    getCachedPosition, 
    queueLocationUpdate,
    position 
  } = useGeolocation();

  const handleOfflineAction = () => {
    // Get last known position when offline
    const lastKnownPosition = getCachedPosition();
    
    if (lastKnownPosition) {
      console.log('Using cached position:', lastKnownPosition);
      
      // Queue update for when connection returns
      queueLocationUpdate({
        userId: 123,
        action: 'checkin',
        position: lastKnownPosition,
        timestamp: Date.now()
      });
    }
  };

  return (
    <div>
      <p>Current position: {position ? 'Available' : 'Not available'}</p>
      <p>Cached position: {getCachedPosition() ? 'Available' : 'None'}</p>
      <button onClick={handleOfflineAction}>
        Perform Offline Action
      </button>
    </div>
  );
}
```

### Utility Functions

```tsx
import { 
  calculateDistance, 
  calculateBearing,
  isPointInCircle 
} from '@acrobi/ui';

function UtilitiesExample() {
  const sanFrancisco = { lat: 37.7749, lng: -122.4194 };
  const newYork = { lat: 40.7128, lng: -74.0060 };

  const distance = calculateDistance(sanFrancisco, newYork); // meters
  const bearing = calculateBearing(sanFrancisco, newYork); // degrees
  
  const isNearby = isPointInCircle(
    newYork, 
    sanFrancisco, 
    1000000 // 1000km radius
  ); // false

  return (
    <div>
      <p>Distance SF to NYC: {(distance / 1000).toFixed(0)}km</p>
      <p>Bearing SF to NYC: {bearing.toFixed(0)}°</p>
      <p>Is NYC near SF (1000km): {isNearby ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

## API Reference

### Hook Options

```typescript
interface GeolocationOptions {
  enableHighAccuracy?: boolean;  // Default: false
  timeout?: number;              // Default: 10000ms
  maximumAge?: number;           // Default: 0ms
  watch?: boolean;               // Default: false
  trackingInterval?: number;     // Default: 5000ms
  onPositionChange?: (position: GeolocationPosition) => void;
  onError?: (error: GeolocationPositionError) => void;
}
```

### Return Value

```typescript
interface UseGeolocationReturn {
  // Current state
  position: GeolocationPosition | null;
  error: GeolocationPositionError | null;
  loading: boolean;
  
  // Permission state
  permission: 'granted' | 'denied' | 'prompt' | 'unknown';
  isSupported: boolean;
  
  // Position tracking
  positions: GeolocationPosition[];
  isWatching: boolean;
  
  // Actions
  getCurrentPosition: () => Promise<GeolocationPosition>;
  startWatching: () => void;
  stopWatching: () => void;
  clearHistory: () => void;
  requestPermission: () => Promise<PermissionState>;
  
  // Geofencing
  addGeofence: (options: GeofenceOptions) => string;
  removeGeofence: (id: string) => void;
  getActiveGeofences: () => GeofenceOptions[];
  
  // Utilities
  calculateDistance: (pos1: Coordinates, pos2: Coordinates) => number;
  calculateBearing: (pos1: Coordinates, pos2: Coordinates) => number;
  convertCoordinates: (coords: Coordinates, system: 'WGS84' | 'UTM') => Coordinates;
  
  // Offline support
  getCachedPosition: () => GeolocationPosition | null;
  queueLocationUpdate: (data: any) => void;

  // Legacy compatibility
  coordinates: LegacyCoordinates | null;
  isLoading: boolean;
  clearWatch: () => void;
}
```

### Geofencing Options

```typescript
interface GeofenceOptions {
  center: Coordinates;           // Center point
  radius: number;                // Radius in meters
  onEnter?: (position: GeolocationPosition) => void;
  onExit?: (position: GeolocationPosition) => void;
  id?: string;                   // Optional custom ID
}
```

## Performance Considerations

### Battery Optimization

```tsx
// Battery-optimized configuration
const { position } = useGeolocation({
  enableHighAccuracy: false,    // Use network/WiFi positioning
  timeout: 30000,               // Longer timeout
  maximumAge: 300000,           // Cache for 5 minutes
  trackingInterval: 30000       // Update every 30 seconds
});
```

### High Accuracy Mode

```tsx
// High accuracy for critical applications
const { position } = useGeolocation({
  enableHighAccuracy: true,     // Use GPS
  timeout: 15000,               // Shorter timeout
  maximumAge: 0,                // Always fresh
  trackingInterval: 1000        // Update every second
});
```

## Error Handling

The hook provides comprehensive error handling:

```tsx
function ErrorHandlingExample() {
  const { error, permission } = useGeolocation({
    onError: (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log('User denied location access');
          break;
        case error.POSITION_UNAVAILABLE:
          console.log('Location information unavailable');
          break;
        case error.TIMEOUT:
          console.log('Location request timed out');
          break;
        default:
          console.log('Unknown location error');
      }
    }
  });

  // Handle different permission states
  if (permission === 'denied') {
    return <div>Please enable location access in browser settings</div>;
  }

  if (error) {
    return <div>Location error: {error.message}</div>;
  }

  return <div>Location services working properly ✅</div>;
}
```

## Browser Support

- ✅ **Chrome**: Full support including high accuracy
- ✅ **Firefox**: Full support with permission API
- ✅ **Safari**: Basic support (limited permission API)
- ✅ **Edge**: Full support
- ⚠️ **Mobile Safari**: Some limitations with background tracking
- ❌ **IE**: Not supported (use polyfill if needed)

## Security & Privacy

- Requests user permission before accessing location
- Respects browser privacy settings
- Caches minimal location data
- Provides permission status transparency
- Supports permission revocation handling

## Testing

The hook includes comprehensive tests covering:

- Basic position retrieval
- Permission management
- Error handling
- Position watching
- Geofencing logic
- Offline capabilities
- Utility functions

```bash
npm test use-geolocation
```

## Related Hooks

- `useNetwork` (Epic 41) - Network status for offline handling
- `useCamera` - Camera integration with location metadata
- `useKeyboard` (Epic 40) - Keyboard shortcuts for location actions

## Examples

Check out the Storybook stories for interactive examples:

```bash
npm run storybook
```

Navigate to "Hooks > useGeolocation" to see all examples in action.

## Migration Guide

### From Basic Geolocation

```tsx
// Before (basic geolocation)
navigator.geolocation.getCurrentPosition(
  (position) => setPosition(position),
  (error) => setError(error)
);

// After (useGeolocation hook)
const { position, error, getCurrentPosition } = useGeolocation();
```

### Legacy Compatibility

The hook maintains backwards compatibility:

```tsx
const { 
  coordinates,    // Legacy coordinates format
  isLoading,      // Legacy loading state
  clearWatch      // Legacy method name
} = useGeolocation();
```

## Contributing

When contributing to the geolocation hook:

1. Ensure all tests pass
2. Update TypeScript definitions
3. Add Storybook examples for new features
4. Document any breaking changes
5. Consider battery and privacy implications

## Changelog

### v1.0.0 (Epic 42)
- ✅ Initial implementation with full Epic 42 requirements
- ✅ Advanced geolocation with high accuracy options
- ✅ Position watching and history tracking
- ✅ Geofencing with circular boundaries
- ✅ Permission management
- ✅ Offline support and caching
- ✅ Distance and bearing calculations
- ✅ Comprehensive error handling
- ✅ TypeScript support
- ✅ Storybook documentation
- ✅ Unit tests with >90% coverage