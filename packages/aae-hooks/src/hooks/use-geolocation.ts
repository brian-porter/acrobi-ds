import { useState, useEffect, useCallback, useRef } from 'react';

// Enhanced interfaces for Epic 42
export interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GeofenceOptions {
  center: Coordinates;
  radius: number;
  onEnter?: (position: GeolocationPosition) => void;
  onExit?: (position: GeolocationPosition) => void;
  id?: string;
}

export interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watch?: boolean;
  trackingInterval?: number;
  onPositionChange?: (position: GeolocationPosition) => void;
  onError?: (error: GeolocationPositionError) => void;
}

export interface UseGeolocationReturn {
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
  convertCoordinates: (
    coords: Coordinates,
    system: 'WGS84' | 'UTM'
  ) => Coordinates;

  // Offline support
  getCachedPosition: () => GeolocationPosition | null;
  queueLocationUpdate: (data: any) => void;

  // Legacy compatibility
  coordinates: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude?: number | null;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
  } | null;
  isLoading: boolean;
  clearWatch: () => void;
}

// Utility functions
export function calculateDistance(
  pos1: Coordinates,
  pos2: Coordinates
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (pos1.lat * Math.PI) / 180;
  const φ2 = (pos2.lat * Math.PI) / 180;
  const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
  const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

export function calculateBearing(pos1: Coordinates, pos2: Coordinates): number {
  const φ1 = (pos1.lat * Math.PI) / 180;
  const φ2 = (pos2.lat * Math.PI) / 180;
  const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  const θ = Math.atan2(y, x);
  return ((θ * 180) / Math.PI + 360) % 360; // Bearing in degrees
}

export function convertCoordinates(
  coords: Coordinates,
  system: 'WGS84' | 'UTM'
): Coordinates {
  // Basic implementation - would need proper UTM conversion library for production
  if (system === 'WGS84') {
    return coords; // Already in WGS84
  }
  // Placeholder UTM conversion - implement with proper library
  return coords;
}

export function isPointInCircle(
  point: Coordinates,
  center: Coordinates,
  radius: number
): boolean {
  const distance = calculateDistance(point, center);
  return distance <= radius;
}

export function isPointInPolygon(
  point: Coordinates,
  polygon: Coordinates[]
): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lat,
      yi = polygon[i].lng;
    const xj = polygon[j].lat,
      yj = polygon[j].lng;

    if (
      yi > point.lng !== yj > point.lng &&
      point.lat < ((xj - xi) * (point.lng - yi)) / (yj - yi) + xi
    ) {
      inside = !inside;
    }
  }
  return inside;
}

// Generate unique ID for geofences
const generateGeofenceId = (): string => {
  return `geofence_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export function useGeolocation(
  options: GeolocationOptions = {}
): UseGeolocationReturn {
  const {
    enableHighAccuracy = false,
    timeout = 10000,
    maximumAge = 0,
    watch = false,
    trackingInterval = 5000,
    onPositionChange,
    onError,
  } = options;

  // Enhanced state management
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [positions, setPositions] = useState<GeolocationPosition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [permission, setPermission] = useState<
    'granted' | 'denied' | 'prompt' | 'unknown'
  >('unknown');
  const [isWatching, setIsWatching] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);

  // Refs for geofencing and caching
  const geofencesRef = useRef<Map<string, GeofenceOptions>>(new Map());
  const cachedPositionRef = useRef<GeolocationPosition | null>(null);
  const queueRef = useRef<any[]>([]);
  const previousPositionRef = useRef<GeolocationPosition | null>(null);

  const isSupported =
    typeof navigator !== 'undefined' && 'geolocation' in navigator;

  // Enhanced success handler with geofencing
  const handleSuccess = useCallback(
    (nativePosition: GeolocationPosition) => {
      const enhancedPosition: GeolocationPosition = {
        coords: {
          latitude: nativePosition.coords.latitude,
          longitude: nativePosition.coords.longitude,
          altitude: nativePosition.coords.altitude,
          accuracy: nativePosition.coords.accuracy,
          altitudeAccuracy: nativePosition.coords.altitudeAccuracy,
          heading: nativePosition.coords.heading,
          speed: nativePosition.coords.speed,
        },
        timestamp: nativePosition.timestamp,
      };

      setPosition(enhancedPosition);
      setPositions(prev => [...prev, enhancedPosition]);
      setLoading(false);
      setError(null);

      // Cache position for offline use
      cachedPositionRef.current = enhancedPosition;

      // Call user callback
      onPositionChange?.(enhancedPosition);

      // Check geofences
      checkGeofences(enhancedPosition);
    },
    [onPositionChange]
  );

  // Geofence checking logic
  const checkGeofences = useCallback((currentPosition: GeolocationPosition) => {
    const currentCoords: Coordinates = {
      lat: currentPosition.coords.latitude,
      lng: currentPosition.coords.longitude,
    };

    const previousCoords = previousPositionRef.current
      ? {
          lat: previousPositionRef.current.coords.latitude,
          lng: previousPositionRef.current.coords.longitude,
        }
      : null;

    for (const [id, geofence] of geofencesRef.current.entries()) {
      const wasInside = previousCoords
        ? isPointInCircle(previousCoords, geofence.center, geofence.radius)
        : false;
      const isInside = isPointInCircle(
        currentCoords,
        geofence.center,
        geofence.radius
      );

      if (!wasInside && isInside) {
        // Entered geofence
        geofence.onEnter?.(currentPosition);
      } else if (wasInside && !isInside) {
        // Exited geofence
        geofence.onExit?.(currentPosition);
      }
    }

    previousPositionRef.current = currentPosition;
  }, []);

  // Enhanced error handler
  const handleError = useCallback(
    (positionError: GeolocationPositionError) => {
      setLoading(false);
      setError(positionError);

      // Update permission state based on error
      if (positionError.code === positionError.PERMISSION_DENIED) {
        setPermission('denied');
      }

      // Call user callback
      onError?.(positionError);
    },
    [onError]
  );

  // Enhanced getCurrentPosition with Promise support
  const getCurrentPosition = useCallback((): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!isSupported) {
        const error = new Error(
          'Geolocation is not supported by this browser'
        ) as any;
        error.code = 0;
        reject(error);
        return;
      }

      setLoading(true);
      setError(null);

      const geolocationOptions: PositionOptions = {
        enableHighAccuracy,
        timeout,
        maximumAge,
      };

      navigator.geolocation.getCurrentPosition(
        nativePosition => {
          const enhancedPosition: GeolocationPosition = {
            coords: {
              latitude: nativePosition.coords.latitude,
              longitude: nativePosition.coords.longitude,
              altitude: nativePosition.coords.altitude,
              accuracy: nativePosition.coords.accuracy,
              altitudeAccuracy: nativePosition.coords.altitudeAccuracy,
              heading: nativePosition.coords.heading,
              speed: nativePosition.coords.speed,
            },
            timestamp: nativePosition.timestamp,
          };
          handleSuccess(nativePosition);
          resolve(enhancedPosition);
        },
        error => {
          handleError(error);
          reject(error);
        },
        geolocationOptions
      );
    });
  }, [
    isSupported,
    enableHighAccuracy,
    timeout,
    maximumAge,
    handleSuccess,
    handleError,
  ]);

  // Enhanced watching controls
  const startWatching = useCallback(() => {
    if (!isSupported || isWatching) return;

    setLoading(true);
    setError(null);
    setIsWatching(true);

    const geolocationOptions: PositionOptions = {
      enableHighAccuracy,
      timeout,
      maximumAge,
    };

    const id = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      geolocationOptions
    );

    setWatchId(id);
  }, [
    isSupported,
    isWatching,
    enableHighAccuracy,
    timeout,
    maximumAge,
    handleSuccess,
    handleError,
  ]);

  const stopWatching = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsWatching(false);
    }
  }, [watchId]);

  // Legacy compatibility
  const clearWatch = useCallback(() => {
    stopWatching();
  }, [stopWatching]);

  // Permission management
  const requestPermission = useCallback(async (): Promise<PermissionState> => {
    if (!isSupported) {
      setPermission('denied');
      return 'denied';
    }

    try {
      if ('permissions' in navigator) {
        const result = await navigator.permissions.query({
          name: 'geolocation',
        });
        setPermission(result.state as any);
        return result.state;
      } else {
        // Fallback: try to get position to test permission
        try {
          await getCurrentPosition();
          setPermission('granted');
          return 'granted';
        } catch (error: any) {
          if (error.code === 1) {
            // PERMISSION_DENIED
            setPermission('denied');
            return 'denied';
          }
          setPermission('prompt');
          return 'prompt';
        }
      }
    } catch (error) {
      setPermission('unknown');
      return 'prompt';
    }
  }, [isSupported, getCurrentPosition]);

  // Position history management
  const clearHistory = useCallback(() => {
    setPositions([]);
  }, []);

  // Geofencing methods
  const addGeofence = useCallback((options: GeofenceOptions): string => {
    const id = options.id || generateGeofenceId();
    geofencesRef.current.set(id, { ...options, id });
    return id;
  }, []);

  const removeGeofence = useCallback((id: string): void => {
    geofencesRef.current.delete(id);
  }, []);

  const getActiveGeofences = useCallback((): GeofenceOptions[] => {
    return Array.from(geofencesRef.current.values());
  }, []);

  // Offline support methods
  const getCachedPosition = useCallback((): GeolocationPosition | null => {
    return cachedPositionRef.current;
  }, []);

  const queueLocationUpdate = useCallback((data: any): void => {
    queueRef.current.push({
      data,
      timestamp: Date.now(),
    });
  }, []);

  // Auto-start watching if enabled
  useEffect(() => {
    if (watch && isSupported && !isWatching) {
      startWatching();
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watch, isSupported, isWatching, startWatching, watchId]);

  // Check permission on mount
  useEffect(() => {
    if (isSupported) {
      requestPermission();
    }
  }, [isSupported, requestPermission]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return {
    // Current state
    position,
    error,
    loading,

    // Permission state
    permission,
    isSupported,

    // Position tracking
    positions,
    isWatching,

    // Actions
    getCurrentPosition,
    startWatching,
    stopWatching,
    clearHistory,
    requestPermission,

    // Geofencing
    addGeofence,
    removeGeofence,
    getActiveGeofences,

    // Utilities
    calculateDistance,
    calculateBearing,
    convertCoordinates,

    // Offline support
    getCachedPosition,
    queueLocationUpdate,

    // Legacy compatibility
    coordinates: position
      ? {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
        }
      : null,
    isLoading: loading,
    clearWatch,
  };
}
