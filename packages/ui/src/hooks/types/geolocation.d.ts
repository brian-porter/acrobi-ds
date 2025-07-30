/**
 * Extended TypeScript definitions for Epic 42 - AAE Advanced Geolocation & Mapping
 *
 * This file provides comprehensive type definitions for the enhanced useGeolocation hook
 * and associated utilities, ensuring full type safety for geolocation operations.
 */

// Core geolocation types
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

// Geofencing types
export interface GeofenceOptions {
  center: Coordinates;
  radius: number;
  onEnter?: (position: GeolocationPosition) => void;
  onExit?: (position: GeolocationPosition) => void;
  id?: string;
}

export interface GeofenceEvent {
  type: 'enter' | 'exit';
  geofenceId: string;
  position: GeolocationPosition;
  timestamp: number;
}

// Hook configuration types
export interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watch?: boolean;
  trackingInterval?: number;
  onPositionChange?: (position: GeolocationPosition) => void;
  onError?: (error: GeolocationPositionError) => void;
}

// Hook return type
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

// Utility function types
export type DistanceCalculator = (
  pos1: Coordinates,
  pos2: Coordinates
) => number;
export type BearingCalculator = (
  pos1: Coordinates,
  pos2: Coordinates
) => number;
export type CoordinateConverter = (
  coords: Coordinates,
  system: 'WGS84' | 'UTM'
) => Coordinates;
export type GeofenceChecker = (
  point: Coordinates,
  center: Coordinates,
  radius: number
) => boolean;
export type PolygonChecker = (
  point: Coordinates,
  polygon: Coordinates[]
) => boolean;

// Coordinate system types
export type CoordinateSystem = 'WGS84' | 'UTM';

export interface UTMCoordinates {
  easting: number;
  northing: number;
  zone: number;
  hemisphere: 'N' | 'S';
}

// Movement analysis types
export interface MovementMetrics {
  totalDistance: number;
  averageSpeed: number;
  maxSpeed: number;
  duration: number;
  waypoints: number;
}

export interface TrackingSession {
  id: string;
  startTime: number;
  endTime?: number;
  positions: GeolocationPosition[];
  metrics?: MovementMetrics;
}

// Error types
export interface GeolocationError extends Error {
  code: number;
  PERMISSION_DENIED: 1;
  POSITION_UNAVAILABLE: 2;
  TIMEOUT: 3;
}

// Offline support types
export interface QueuedLocationUpdate {
  data: any;
  timestamp: number;
  retryCount?: number;
}

export interface LocationCache {
  position: GeolocationPosition;
  expiry: number;
}

// Permission types (extended from Web API)
export type GeolocationPermissionState = 'granted' | 'denied' | 'prompt';

export interface GeolocationPermissionDescriptor {
  name: 'geolocation';
}

// Hook factory types
export interface GeolocationHookFactory {
  (options?: GeolocationOptions): UseGeolocationReturn;
}

// Configuration types for advanced features
export interface AdvancedGeolocationConfig {
  enableGeofencing?: boolean;
  enablePositionHistory?: boolean;
  maxHistorySize?: number;
  enableOfflineSupport?: boolean;
  cacheExpiry?: number;
  enableMovementAnalysis?: boolean;
}

// Event handler types
export type PositionChangeHandler = (position: GeolocationPosition) => void;
export type GeofenceEventHandler = (event: GeofenceEvent) => void;
export type ErrorHandler = (error: GeolocationPositionError) => void;

// Constants
export const GEOLOCATION_ERRORS = {
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
} as const;

export const DEFAULT_GEOLOCATION_OPTIONS: Required<GeolocationOptions> = {
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: 0,
  watch: false,
  trackingInterval: 5000,
  onPositionChange: () => {},
  onError: () => {},
} as const;

// Helper type guards
export const isGeolocationSupported = (): boolean => {
  return typeof navigator !== 'undefined' && 'geolocation' in navigator;
};

export const isGeolocationError = (
  error: any
): error is GeolocationPositionError => {
  return (
    error &&
    typeof error.code === 'number' &&
    error.code >= 1 &&
    error.code <= 3
  );
};

export const isValidCoordinates = (coords: any): coords is Coordinates => {
  return (
    coords &&
    typeof coords.lat === 'number' &&
    typeof coords.lng === 'number' &&
    coords.lat >= -90 &&
    coords.lat <= 90 &&
    coords.lng >= -180 &&
    coords.lng <= 180
  );
};

// Re-export core Web API types for convenience
export type {
  GeolocationPosition as NativeGeolocationPosition,
  GeolocationPositionError,
  GeolocationCoordinates as NativeGeolocationCoordinates,
  PositionOptions,
} from 'lib.dom';

declare global {
  interface Navigator {
    geolocation: Geolocation;
    permissions?: {
      query(descriptor: GeolocationPermissionDescriptor): Promise<{
        state: GeolocationPermissionState;
      }>;
    };
  }
}
