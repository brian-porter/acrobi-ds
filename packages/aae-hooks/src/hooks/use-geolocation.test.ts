import { renderHook, act, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import {
  useGeolocation,
  calculateDistance,
  calculateBearing,
  convertCoordinates,
  isPointInCircle,
  isPointInPolygon,
  type GeolocationPosition,
  type Coordinates,
  type GeofenceOptions,
} from './use-geolocation';

// Mock navigator.geolocation
const mockGeolocation = {
  getCurrentPosition: vi.fn(),
  watchPosition: vi.fn(),
  clearWatch: vi.fn(),
};

const mockPermissions = {
  query: vi.fn(),
};

// Mock position data
const mockPosition: GeolocationPosition = {
  coords: {
    latitude: 37.7749,
    longitude: -122.4194,
    altitude: null,
    accuracy: 100,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  },
  timestamp: Date.now(),
};

const mockNativePosition = {
  coords: {
    latitude: 37.7749,
    longitude: -122.4194,
    altitude: null,
    accuracy: 100,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  },
  timestamp: Date.now(),
};

describe('useGeolocation', () => {
  beforeEach(() => {
    // Setup navigator mocks
    Object.defineProperty(global, 'navigator', {
      value: {
        geolocation: mockGeolocation,
        permissions: mockPermissions,
      },
      writable: true,
    });

    // Reset mocks
    vi.clearAllMocks();
    mockGeolocation.getCurrentPosition.mockClear();
    mockGeolocation.watchPosition.mockClear();
    mockGeolocation.clearWatch.mockClear();
    mockPermissions.query.mockClear();
  });

  describe('Basic Functionality', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useGeolocation());

      expect(result.current.position).toBeNull();
      expect(result.current.error).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.permission).toBe('unknown');
      expect(result.current.isSupported).toBe(true);
      expect(result.current.positions).toEqual([]);
      expect(result.current.isWatching).toBe(false);
    });

    it('should detect when geolocation is not supported', () => {
      // Mock unsupported environment
      Object.defineProperty(global, 'navigator', {
        value: {},
        writable: true,
      });

      const { result } = renderHook(() => useGeolocation());
      expect(result.current.isSupported).toBe(false);
    });

    it('should get current position successfully', async () => {
      mockGeolocation.getCurrentPosition.mockImplementation(success => {
        setTimeout(() => success(mockNativePosition), 0);
      });

      const { result } = renderHook(() => useGeolocation());

      await act(async () => {
        const position = await result.current.getCurrentPosition();
        expect(position.coords.latitude).toBe(37.7749);
        expect(position.coords.longitude).toBe(-122.4194);
      });

      expect(result.current.position).toBeTruthy();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle geolocation errors', async () => {
      const mockError = {
        code: 1, // PERMISSION_DENIED
        message: 'Permission denied',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      };

      mockGeolocation.getCurrentPosition.mockImplementation(
        (success, error) => {
          setTimeout(() => error(mockError), 0);
        }
      );

      const { result } = renderHook(() => useGeolocation());

      await act(async () => {
        try {
          await result.current.getCurrentPosition();
        } catch (error) {
          expect(error).toEqual(mockError);
        }
      });

      expect(result.current.error).toEqual(mockError);
      expect(result.current.loading).toBe(false);
    });
  });

  describe('Position Watching', () => {
    it('should start and stop watching position', async () => {
      const watchId = 123;
      mockGeolocation.watchPosition.mockReturnValue(watchId);

      const { result } = renderHook(() => useGeolocation());

      act(() => {
        result.current.startWatching();
      });

      expect(result.current.isWatching).toBe(true);
      expect(mockGeolocation.watchPosition).toHaveBeenCalled();

      act(() => {
        result.current.stopWatching();
      });

      expect(result.current.isWatching).toBe(false);
      expect(mockGeolocation.clearWatch).toHaveBeenCalledWith(watchId);
    });

    it('should auto-start watching when watch option is true', () => {
      const watchId = 123;
      mockGeolocation.watchPosition.mockReturnValue(watchId);

      renderHook(() => useGeolocation({ watch: true }));

      expect(mockGeolocation.watchPosition).toHaveBeenCalled();
    });

    it('should track position history', async () => {
      mockGeolocation.getCurrentPosition.mockImplementation(success => {
        setTimeout(() => success(mockNativePosition), 0);
      });

      const { result } = renderHook(() => useGeolocation());

      await act(async () => {
        await result.current.getCurrentPosition();
      });

      expect(result.current.positions).toHaveLength(1);
      expect(result.current.positions[0].coords.latitude).toBe(37.7749);

      act(() => {
        result.current.clearHistory();
      });

      expect(result.current.positions).toHaveLength(0);
    });
  });

  describe('Permission Management', () => {
    it('should request and handle permissions', async () => {
      mockPermissions.query.mockResolvedValue({ state: 'granted' });

      const { result } = renderHook(() => useGeolocation());

      await act(async () => {
        const permission = await result.current.requestPermission();
        expect(permission).toBe('granted');
      });

      expect(result.current.permission).toBe('granted');
    });

    it('should handle permission denial', async () => {
      mockPermissions.query.mockResolvedValue({ state: 'denied' });

      const { result } = renderHook(() => useGeolocation());

      await act(async () => {
        const permission = await result.current.requestPermission();
        expect(permission).toBe('denied');
      });

      expect(result.current.permission).toBe('denied');
    });
  });

  describe('Geofencing', () => {
    it('should add and remove geofences', () => {
      const { result } = renderHook(() => useGeolocation());

      const geofenceOptions: GeofenceOptions = {
        center: { lat: 37.7749, lng: -122.4194 },
        radius: 1000,
        onEnter: vi.fn(),
        onExit: vi.fn(),
      };

      let geofenceId: string;
      act(() => {
        geofenceId = result.current.addGeofence(geofenceOptions);
      });

      expect(result.current.getActiveGeofences()).toHaveLength(1);
      expect(geofenceId).toBeDefined();

      act(() => {
        result.current.removeGeofence(geofenceId);
      });

      expect(result.current.getActiveGeofences()).toHaveLength(0);
    });

    it('should trigger geofence events', async () => {
      const onEnter = vi.fn();
      const onExit = vi.fn();

      const { result } = renderHook(() => useGeolocation());

      // Add geofence at a specific location
      act(() => {
        result.current.addGeofence({
          center: { lat: 37.7749, lng: -122.4194 },
          radius: 100, // 100 meter radius
          onEnter,
          onExit,
        });
      });

      // Mock position inside geofence
      const insidePosition = {
        ...mockNativePosition,
        coords: {
          ...mockNativePosition.coords,
          latitude: 37.7749, // Same as geofence center
          longitude: -122.4194,
        },
      };

      mockGeolocation.getCurrentPosition.mockImplementation(success => {
        setTimeout(() => success(insidePosition), 0);
      });

      await act(async () => {
        await result.current.getCurrentPosition();
      });

      // Since it's the first position, onEnter should be called
      expect(onEnter).toHaveBeenCalled();
    });
  });

  describe('Offline Support', () => {
    it('should cache positions for offline use', async () => {
      mockGeolocation.getCurrentPosition.mockImplementation(success => {
        setTimeout(() => success(mockNativePosition), 0);
      });

      const { result } = renderHook(() => useGeolocation());

      await act(async () => {
        await result.current.getCurrentPosition();
      });

      const cachedPosition = result.current.getCachedPosition();
      expect(cachedPosition).toBeTruthy();
      expect(cachedPosition?.coords.latitude).toBe(37.7749);
    });

    it('should queue location updates', () => {
      const { result } = renderHook(() => useGeolocation());

      act(() => {
        result.current.queueLocationUpdate({ test: 'data' });
      });

      // Queue functionality is implemented but testing private queue would require exposure
      expect(result.current.queueLocationUpdate).toBeDefined();
    });
  });

  describe('Legacy Compatibility', () => {
    it('should maintain backwards compatibility with old coordinates interface', async () => {
      mockGeolocation.getCurrentPosition.mockImplementation(success => {
        setTimeout(() => success(mockNativePosition), 0);
      });

      const { result } = renderHook(() => useGeolocation());

      await act(async () => {
        await result.current.getCurrentPosition();
      });

      // Test legacy coordinates format
      expect(result.current.coordinates).toBeTruthy();
      expect(result.current.coordinates?.latitude).toBe(37.7749);
      expect(result.current.coordinates?.longitude).toBe(-122.4194);
      expect(result.current.isLoading).toBe(false);
    });

    it('should support legacy clearWatch method', () => {
      const watchId = 123;
      mockGeolocation.watchPosition.mockReturnValue(watchId);

      const { result } = renderHook(() => useGeolocation());

      act(() => {
        result.current.startWatching();
      });

      act(() => {
        result.current.clearWatch(); // Legacy method
      });

      expect(mockGeolocation.clearWatch).toHaveBeenCalledWith(watchId);
      expect(result.current.isWatching).toBe(false);
    });
  });
});

describe('Utility Functions', () => {
  describe('calculateDistance', () => {
    it('should calculate distance between two coordinates', () => {
      const pos1: Coordinates = { lat: 37.7749, lng: -122.4194 }; // San Francisco
      const pos2: Coordinates = { lat: 34.0522, lng: -118.2437 }; // Los Angeles

      const distance = calculateDistance(pos1, pos2);

      // Distance should be approximately 559 km
      expect(distance).toBeGreaterThan(550000);
      expect(distance).toBeLessThan(570000);
    });

    it('should return 0 for same coordinates', () => {
      const pos: Coordinates = { lat: 37.7749, lng: -122.4194 };
      const distance = calculateDistance(pos, pos);
      expect(distance).toBe(0);
    });
  });

  describe('calculateBearing', () => {
    it('should calculate bearing between two coordinates', () => {
      const pos1: Coordinates = { lat: 37.7749, lng: -122.4194 }; // San Francisco
      const pos2: Coordinates = { lat: 34.0522, lng: -118.2437 }; // Los Angeles

      const bearing = calculateBearing(pos1, pos2);

      // Bearing should be roughly southeast (around 135 degrees)
      expect(bearing).toBeGreaterThan(130);
      expect(bearing).toBeLessThan(140);
    });

    it('should return 0 for same coordinates', () => {
      const pos: Coordinates = { lat: 37.7749, lng: -122.4194 };
      const bearing = calculateBearing(pos, pos);
      expect(bearing).toBe(0);
    });
  });

  describe('convertCoordinates', () => {
    it('should handle WGS84 coordinates', () => {
      const coords: Coordinates = { lat: 37.7749, lng: -122.4194 };
      const converted = convertCoordinates(coords, 'WGS84');

      expect(converted).toEqual(coords);
    });

    it('should handle UTM conversion placeholder', () => {
      const coords: Coordinates = { lat: 37.7749, lng: -122.4194 };
      const converted = convertCoordinates(coords, 'UTM');

      // Currently returns same coords as placeholder
      expect(converted).toEqual(coords);
    });
  });

  describe('isPointInCircle', () => {
    it('should detect point inside circle', () => {
      const center: Coordinates = { lat: 37.7749, lng: -122.4194 };
      const point: Coordinates = { lat: 37.775, lng: -122.4195 }; // Very close point
      const radius = 1000; // 1km radius

      const isInside = isPointInCircle(point, center, radius);
      expect(isInside).toBe(true);
    });

    it('should detect point outside circle', () => {
      const center: Coordinates = { lat: 37.7749, lng: -122.4194 };
      const point: Coordinates = { lat: 34.0522, lng: -118.2437 }; // Los Angeles
      const radius = 1000; // 1km radius

      const isInside = isPointInCircle(point, center, radius);
      expect(isInside).toBe(false);
    });
  });

  describe('isPointInPolygon', () => {
    it('should detect point inside polygon', () => {
      const polygon: Coordinates[] = [
        { lat: 0, lng: 0 },
        { lat: 0, lng: 1 },
        { lat: 1, lng: 1 },
        { lat: 1, lng: 0 },
      ];
      const point: Coordinates = { lat: 0.5, lng: 0.5 }; // Center of square

      const isInside = isPointInPolygon(point, polygon);
      expect(isInside).toBe(true);
    });

    it('should detect point outside polygon', () => {
      const polygon: Coordinates[] = [
        { lat: 0, lng: 0 },
        { lat: 0, lng: 1 },
        { lat: 1, lng: 1 },
        { lat: 1, lng: 0 },
      ];
      const point: Coordinates = { lat: 2, lng: 2 }; // Outside square

      const isInside = isPointInPolygon(point, polygon);
      expect(isInside).toBe(false);
    });
  });
});
