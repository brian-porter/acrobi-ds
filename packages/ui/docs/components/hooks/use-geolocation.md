# useGeolocation

React hook for accessing device location with permission management and error handling.

## Overview

The `useGeolocation` hook provides a simple interface for accessing the browser's Geolocation API. It handles permissions, error states, and provides both one-time position requests and continuous position watching.

## Basic Usage

```tsx
import { useGeolocation } from '@acrobi/ui';

function LocationComponent() {
  const { coordinates, getCurrentPosition, error, loading } = useGeolocation();

  return (
    <div>
      <button onClick={getCurrentPosition} disabled={loading}>
        {loading ? 'Getting location...' : 'Get My Location'}
      </button>
      
      {coordinates && (
        <div>
          <p>Latitude: {coordinates.latitude}</p>
          <p>Longitude: {coordinates.longitude}</p>
          <p>Accuracy: {coordinates.accuracy}m</p>
        </div>
      )}
      
      {error && (
        <p className="text-red-500">Error: {error.message}</p>
      )}
    </div>
  );
}
```

## API Reference

### Return Value

```tsx
interface UseGeolocationReturn {
  coordinates: GeolocationCoordinates | null;
  getCurrentPosition: () => void;
  watchPosition: () => void;
  clearWatch: () => void;
  error: GeolocationError | null;
  loading: boolean;
  permission: 'granted' | 'denied' | 'prompt' | 'unknown';
  isSupported: boolean;
}
```

### Options

```tsx
interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watch?: boolean;
  immediate?: boolean;
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableHighAccuracy` | `boolean` | `false` | Use GPS for higher accuracy |
| `timeout` | `number` | `10000` | Timeout in milliseconds |
| `maximumAge` | `number` | `300000` | Max age of cached position (ms) |
| `watch` | `boolean` | `false` | Continuously watch position |
| `immediate` | `boolean` | `false` | Get position on mount |

## Examples

### Basic Location Request

```tsx
function BasicLocation() {
  const { coordinates, getCurrentPosition, loading, error } = useGeolocation();

  return (
    <div className="space-y-4">
      <button 
        onClick={getCurrentPosition}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Getting location...' : 'Get Location'}
      </button>

      {coordinates && (
        <div className="p-4 bg-green-50 rounded">
          <h3 className="font-semibold">Current Location</h3>
          <p>Lat: {coordinates.latitude.toFixed(6)}</p>
          <p>Lng: {coordinates.longitude.toFixed(6)}</p>
          <p>Accuracy: ±{Math.round(coordinates.accuracy)}m</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 rounded">
          <p className="text-red-700">Error: {error.message}</p>
        </div>
      )}
    </div>
  );
}
```

### High Accuracy GPS

```tsx
function HighAccuracyLocation() {
  const { coordinates, getCurrentPosition, loading } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 60000 // 1 minute
  });

  return (
    <div>
      <button onClick={getCurrentPosition} disabled={loading}>
        Get Precise Location (GPS)
      </button>
      
      {coordinates && (
        <div>
          <p>High-accuracy coordinates:</p>
          <p>Lat: {coordinates.latitude}</p>
          <p>Lng: {coordinates.longitude}</p>
          <p>Accuracy: {coordinates.accuracy}m</p>
          {coordinates.altitude && (
            <p>Altitude: {coordinates.altitude}m</p>
          )}
        </div>
      )}
    </div>
  );
}
```

### Continuous Position Watching

```tsx
function LocationTracker() {
  const { 
    coordinates, 
    watchPosition, 
    clearWatch, 
    loading,
    error 
  } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 10000
  });

  const [isWatching, setIsWatching] = useState(false);
  const [positions, setPositions] = useState([]);

  const startTracking = () => {
    watchPosition();
    setIsWatching(true);
  };

  const stopTracking = () => {
    clearWatch();
    setIsWatching(false);
  };

  useEffect(() => {
    if (coordinates) {
      setPositions(prev => [...prev, {
        ...coordinates,
        timestamp: Date.now()
      }]);
    }
  }, [coordinates]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button 
          onClick={startTracking}
          disabled={isWatching || loading}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Start Tracking
        </button>
        
        <button 
          onClick={stopTracking}
          disabled={!isWatching}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Stop Tracking
        </button>
      </div>

      {isWatching && (
        <div className="p-3 bg-blue-50 rounded">
          <p className="text-blue-700">📍 Tracking your location...</p>
        </div>
      )}

      {coordinates && (
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">Current Position</h3>
          <p>Lat: {coordinates.latitude.toFixed(6)}</p>
          <p>Lng: {coordinates.longitude.toFixed(6)}</p>
          <p>Speed: {coordinates.speed ? `${coordinates.speed} m/s` : 'Unknown'}</p>
          <p>Heading: {coordinates.heading ? `${coordinates.heading}°` : 'Unknown'}</p>
        </div>
      )}

      {positions.length > 0 && (
        <div>
          <h3 className="font-semibold">Position History ({positions.length})</h3>
          <div className="max-h-40 overflow-y-auto">
            {positions.slice(-5).map((pos, index) => (
              <div key={index} className="text-sm p-2 border-b">
                {new Date(pos.timestamp).toLocaleTimeString()}: 
                {pos.latitude.toFixed(4)}, {pos.longitude.toFixed(4)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Permission Handling

```tsx
function LocationWithPermissions() {
  const { 
    coordinates, 
    getCurrentPosition, 
    permission, 
    error,
    isSupported 
  } = useGeolocation();

  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-50 rounded">
        <p className="text-yellow-700">
          Geolocation is not supported by this browser.
        </p>
      </div>
    );
  }

  const getPermissionMessage = () => {
    switch (permission) {
      case 'granted':
        return { message: 'Location access granted', color: 'green' };
      case 'denied':
        return { message: 'Location access denied', color: 'red' };
      case 'prompt':
        return { message: 'Location permission required', color: 'yellow' };
      default:
        return { message: 'Checking location permissions...', color: 'gray' };
    }
  };

  const { message, color } = getPermissionMessage();

  return (
    <div className="space-y-4">
      <div className={`p-3 bg-${color}-50 rounded`}>
        <p className={`text-${color}-700`}>{message}</p>
      </div>

      {permission === 'denied' && (
        <div className="p-4 bg-red-50 rounded">
          <h3 className="font-semibold text-red-700">Location Access Denied</h3>
          <p className="text-red-600 mt-2">
            To use location features, please:
          </p>
          <ol className="list-decimal list-inside mt-2 text-red-600">
            <li>Click the location icon in your browser's address bar</li>
            <li>Select "Allow" for location access</li>
            <li>Refresh the page</li>
          </ol>
        </div>
      )}

      {permission !== 'denied' && (
        <button 
          onClick={getCurrentPosition}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Get Location
        </button>
      )}

      {coordinates && (
        <div className="p-4 bg-green-50 rounded">
          <h3 className="font-semibold">Location Found!</h3>
          <p>Latitude: {coordinates.latitude}</p>
          <p>Longitude: {coordinates.longitude}</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 rounded">
          <p className="text-red-700">Error: {error.message}</p>
        </div>
      )}
    </div>
  );
}
```

### Integration with Maps

```tsx
function LocationMap() {
  const { coordinates, getCurrentPosition, loading } = useGeolocation({
    enableHighAccuracy: true
  });

  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default to London

  useEffect(() => {
    if (coordinates) {
      setMapCenter([coordinates.latitude, coordinates.longitude]);
    }
  }, [coordinates]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button 
          onClick={getCurrentPosition}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? 'Finding location...' : 'Center on My Location'}
        </button>
        
        {coordinates && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>📍</span>
            <span>
              {coordinates.latitude.toFixed(4)}, {coordinates.longitude.toFixed(4)}
            </span>
          </div>
        )}
      </div>

      <div className="h-96 bg-gray-200 rounded flex items-center justify-center">
        {/* Replace with your preferred map component */}
        <div className="text-center">
          <p className="text-gray-600">Map Component</p>
          <p className="text-sm">Center: {mapCenter[0].toFixed(4)}, {mapCenter[1].toFixed(4)}</p>
        </div>
      </div>
    </div>
  );
}
```

### Distance Calculation

```tsx
function LocationDistance() {
  const { coordinates, getCurrentPosition } = useGeolocation();
  const [savedLocation, setSavedLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  // Haversine formula for calculating distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const saveCurrentLocation = () => {
    if (coordinates) {
      setSavedLocation({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        timestamp: Date.now()
      });
      setDistance(null);
    }
  };

  useEffect(() => {
    if (coordinates && savedLocation) {
      const dist = calculateDistance(
        savedLocation.latitude,
        savedLocation.longitude,
        coordinates.latitude,
        coordinates.longitude
      );
      setDistance(dist);
    }
  }, [coordinates, savedLocation]);

  return (
    <div className="space-y-4">
      <button 
        onClick={getCurrentPosition}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Get Current Location
      </button>

      {coordinates && (
        <div className="space-y-2">
          <button 
            onClick={saveCurrentLocation}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Save This Location
          </button>

          {savedLocation && (
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-semibold">Saved Location</h3>
              <p>Lat: {savedLocation.latitude.toFixed(6)}</p>
              <p>Lng: {savedLocation.longitude.toFixed(6)}</p>
              <p>Saved: {new Date(savedLocation.timestamp).toLocaleString()}</p>
            </div>
          )}

          {distance !== null && (
            <div className="p-4 bg-blue-50 rounded">
              <h3 className="font-semibold">Distance from Saved Location</h3>
              <p className="text-2xl font-bold text-blue-600">
                {distance < 1 
                  ? `${Math.round(distance * 1000)}m`
                  : `${distance.toFixed(2)}km`
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

## Error Handling

Common error types and how to handle them:

```tsx
function LocationErrorHandling() {
  const { coordinates, getCurrentPosition, error } = useGeolocation();

  const getErrorMessage = (error) => {
    if (!error) return null;

    switch (error.code) {
      case 1: // PERMISSION_DENIED
        return {
          title: 'Location Access Denied',
          message: 'Please enable location access in your browser settings.',
          action: 'Enable Location'
        };
      case 2: // POSITION_UNAVAILABLE
        return {
          title: 'Location Unavailable',
          message: 'Your location could not be determined. Please try again.',
          action: 'Retry'
        };
      case 3: // TIMEOUT
        return {
          title: 'Location Timeout',
          message: 'Location request timed out. Please try again.',
          action: 'Try Again'
        };
      default:
        return {
          title: 'Location Error',
          message: error.message || 'An unknown error occurred.',
          action: 'Retry'
        };
    }
  };

  const errorInfo = getErrorMessage(error);

  return (
    <div className="space-y-4">
      <button 
        onClick={getCurrentPosition}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Get Location
      </button>

      {errorInfo && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="font-semibold text-red-700">{errorInfo.title}</h3>
          <p className="text-red-600 mt-1">{errorInfo.message}</p>
          <button 
            onClick={getCurrentPosition}
            className="mt-3 px-3 py-1 bg-red-500 text-white rounded text-sm"
          >
            {errorInfo.action}
          </button>
        </div>
      )}

      {coordinates && (
        <div className="p-4 bg-green-50 rounded">
          <h3 className="font-semibold text-green-700">Location Found</h3>
          <p>Lat: {coordinates.latitude.toFixed(6)}</p>
          <p>Lng: {coordinates.longitude.toFixed(6)}</p>
        </div>
      )}
    </div>
  );
}
```

## Browser Support

The Geolocation API is supported in all modern browsers:

- ✅ Chrome 5+
- ✅ Firefox 3.5+
- ✅ Safari 5+
- ✅ Edge 12+
- ✅ iOS Safari 3.2+
- ✅ Android Browser 2.1+

## Security Requirements

- **HTTPS Required**: Geolocation only works on secure origins (HTTPS) in production
- **User Permission**: Always requires explicit user permission
- **Privacy**: Location data should be handled securely and not stored unnecessarily

## Best Practices

1. **Always check support** - Verify geolocation is available
2. **Handle permissions gracefully** - Provide clear messaging for denied access
3. **Set appropriate timeouts** - Don't leave users waiting indefinitely
4. **Use appropriate accuracy** - High accuracy drains battery faster
5. **Respect privacy** - Only request location when necessary
6. **Provide fallbacks** - Allow manual location entry as backup
7. **Cache wisely** - Use maximumAge to avoid repeated requests

## Related Hooks

- [useCamera](./use-camera) - Camera access hook
- [useBarcodeScanner](./use-barcode-scanner) - Barcode scanning hook
- [usePlatform](./use-platform) - Platform detection hook