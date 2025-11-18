import React, { useEffect, useRef, forwardRef } from 'react';
import { cn } from '@acrobi/primitives';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Types
export interface LocationMapMarker {
  id?: string;
  latitude: number;
  longitude: number;
  popup?: React.ReactNode;
  title?: string;
  icon?: any; // L.Icon
}

export interface LocationMapProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Latitude coordinate for map center */
  latitude?: number;
  /** Longitude coordinate for map center */
  longitude?: number;
  /** Zoom level (1-20) */
  zoom?: number;
  /** Map width */
  width?: number | string;
  /** Map height */
  height?: number | string;
  /** Array of markers to display */
  markers?: LocationMapMarker[];
  /** Whether to show zoom controls */
  showZoomControls?: boolean;
  /** Whether to show map attribution */
  showAttribution?: boolean;
  /** Custom tile layer URL */
  tileLayerUrl?: string;
  /** Custom tile layer attribution */
  tileLayerAttribution?: string;
  /** Whether map is interactive */
  interactive?: boolean;
  /** Custom map style variant */
  variant?: 'default' | 'minimal' | 'satellite';
  /** Whether to fit bounds to all markers */
  fitBounds?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: string;
  /** Callback when map is clicked */
  onMapClick?: (event: { latitude: number; longitude: number }) => void;
  /** Callback when marker is clicked */
  onMarkerClick?: (marker: LocationMapMarker) => void;
  /** Whether to enable geolocation control */
  enableGeolocation?: boolean;
}

// Default configuration
const DEFAULT_CONFIG = {
  latitude: 40.7128,
  longitude: -74.006, // New York City
  zoom: 13,
  width: '100%',
  height: 400,
};

const TILE_LAYERS = {
  default: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  minimal: {
    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
};

/**
 * LocationMap component for displaying interactive maps with markers using OpenStreetMap
 *
 * This component uses Leaflet and react-leaflet to provide a full-featured mapping solution
 * with OpenStreetMap tiles. It's designed for AAE applications that need to display
 * location data, geolocation results, and interactive mapping features.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <LocationMap
 *   latitude={40.7128}
 *   longitude={-74.0060}
 *   zoom={13}
 * />
 *
 * // With markers and geolocation
 * const { position } = useGeolocation();
 *
 * <LocationMap
 *   latitude={position?.coords.latitude}
 *   longitude={position?.coords.longitude}
 *   markers={[
 *     {
 *       id: "current-location",
 *       latitude: position?.coords.latitude || 0,
 *       longitude: position?.coords.longitude || 0,
 *       popup: <div>Your current location</div>
 *     }
 *   ]}
 *   enableGeolocation
 *   onMapClick={({ latitude, longitude }) => {
 *     console.log('Map clicked at:', latitude, longitude);
 *   }}
 * />
 * ```
 */
export const LocationMap = forwardRef<HTMLDivElement, LocationMapProps>(
  (
    {
      latitude = DEFAULT_CONFIG.latitude,
      longitude = DEFAULT_CONFIG.longitude,
      zoom = DEFAULT_CONFIG.zoom,
      width = DEFAULT_CONFIG.width,
      height = DEFAULT_CONFIG.height,
      markers = [],
      showZoomControls = true,
      showAttribution = true,
      tileLayerUrl,
      tileLayerAttribution,
      interactive = true,
      variant = 'default',
      fitBounds = false,
      loading = false,
      error,
      onMapClick,
      onMarkerClick,
      enableGeolocation = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const mapRef = useRef<any>(null);
    const hasInitialized = useRef(false);

    // Configure Leaflet on client side only
    useEffect(() => {
      if (typeof window === 'undefined' || hasInitialized.current) return;

      const initializeLeaflet = async () => {
        try {
          const L = await import('leaflet');

          // Fix for default markers in Webpack/Next.js
          delete (L.Icon.Default.prototype as any)._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          });

          hasInitialized.current = true;
        } catch (err) {
          console.error('Failed to initialize Leaflet:', err);
        }
      };

      initializeLeaflet();
    }, []);

    // Handle map click events
    const handleMapClick = (event: any) => {
      if (onMapClick && event.latlng) {
        onMapClick({
          latitude: event.latlng.lat,
          longitude: event.latlng.lng,
        });
      }
    };

    // Handle marker click events
    const handleMarkerClick = (marker: LocationMapMarker) => {
      if (onMarkerClick) {
        onMarkerClick(marker);
      }
    };

    // Fit bounds to markers if requested
    useEffect(() => {
      if (fitBounds && markers.length > 0 && mapRef.current) {
        const bounds = markers.map(marker => [
          marker.latitude,
          marker.longitude,
        ]);
        mapRef.current.fitBounds(bounds);
      }
    }, [fitBounds, markers]);

    // Get tile layer configuration
    const tileConfig = TILE_LAYERS[variant] || TILE_LAYERS.default;
    const finalTileUrl = tileLayerUrl || tileConfig.url;
    const finalAttribution = tileLayerAttribution || tileConfig.attribution;

    // Loading state
    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg',
            className
          )}
          style={{
            width,
            height,
            ...style,
          }}
          {...props}
        >
          <div className='flex flex-col items-center space-y-2 text-gray-500'>
            <div className='w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin' />
            <span className='text-sm'>Loading map...</span>
          </div>
        </div>
      );
    }

    // Error state
    if (error) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-center bg-red-50 border border-red-200 rounded-lg',
            className
          )}
          style={{
            width,
            height,
            ...style,
          }}
          {...props}
        >
          <div className='flex flex-col items-center space-y-2 text-red-600'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
            <span className='text-sm text-center'>{error}</span>
          </div>
        </div>
      );
    }

    // Check for valid coordinates
    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      isNaN(latitude) ||
      isNaN(longitude)
    ) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-center bg-yellow-50 border border-yellow-200 rounded-lg',
            className
          )}
          style={{
            width,
            height,
            ...style,
          }}
          {...props}
        >
          <div className='flex flex-col items-center space-y-2 text-yellow-700'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            <span className='text-sm text-center'>
              Invalid coordinates
              <br />
              Please provide valid latitude and longitude
            </span>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-lg border border-gray-200',
          className
        )}
        style={{
          width,
          height,
          ...style,
        }}
        {...props}
      >
        {typeof window !== 'undefined' && (
          <MapContainer
            ref={mapRef}
            center={[latitude, longitude]}
            zoom={zoom}
            style={{ width: '100%', height: '100%' }}
            zoomControl={showZoomControls}
            attributionControl={showAttribution}
            scrollWheelZoom={interactive}
            doubleClickZoom={interactive}
            dragging={interactive}
            tap={interactive}
            touchZoom={interactive}
            onClick={handleMapClick}
          >
            <TileLayer
              url={finalTileUrl}
              attribution={showAttribution ? finalAttribution : ''}
            />

            {/* Render markers */}
            {markers.map((marker, index) => {
              const key = marker.id || `marker-${index}`;
              return (
                <Marker
                  key={key}
                  position={[marker.latitude, marker.longitude]}
                  icon={marker.icon}
                  eventHandlers={{
                    click: () => handleMarkerClick(marker),
                  }}
                >
                  {marker.popup && <Popup>{marker.popup}</Popup>}
                </Marker>
              );
            })}
          </MapContainer>
        )}

        {/* Geolocation control overlay */}
        {enableGeolocation && (
          <div className='absolute top-3 right-3 z-[1000]'>
            <button
              className='p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    position => {
                      const { latitude: lat, longitude: lng } = position.coords;
                      if (mapRef.current) {
                        mapRef.current.setView([lat, lng], zoom);
                      }
                    },
                    error => {
                      console.error('Geolocation error:', error);
                    }
                  );
                }
              }}
              title='Center map on current location'
            >
              <svg
                className='w-4 h-4 text-gray-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }
);

LocationMap.displayName = 'LocationMap';

// Export utilities for working with coordinates
export const locationMapUtils = {
  /**
   * Check if coordinates are valid
   */
  isValidCoordinates: (lat: number, lng: number): boolean => {
    return (
      typeof lat === 'number' &&
      typeof lng === 'number' &&
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  },

  /**
   * Calculate the center point of multiple coordinates
   */
  getCenterOfCoordinates: (
    coordinates: { latitude: number; longitude: number }[]
  ): { latitude: number; longitude: number } => {
    if (coordinates.length === 0) {
      return {
        latitude: DEFAULT_CONFIG.latitude,
        longitude: DEFAULT_CONFIG.longitude,
      };
    }

    const sum = coordinates.reduce(
      (acc, coord) => ({
        latitude: acc.latitude + coord.latitude,
        longitude: acc.longitude + coord.longitude,
      }),
      { latitude: 0, longitude: 0 }
    );

    return {
      latitude: sum.latitude / coordinates.length,
      longitude: sum.longitude / coordinates.length,
    };
  },

  /**
   * Calculate appropriate zoom level for a set of coordinates
   */
  getZoomForBounds: (
    coordinates: { latitude: number; longitude: number }[]
  ): number => {
    if (coordinates.length <= 1) return DEFAULT_CONFIG.zoom;

    const latitudes = coordinates.map(c => c.latitude);
    const longitudes = coordinates.map(c => c.longitude);

    const latDiff = Math.max(...latitudes) - Math.min(...latitudes);
    const lngDiff = Math.max(...longitudes) - Math.min(...longitudes);
    const maxDiff = Math.max(latDiff, lngDiff);

    if (maxDiff < 0.01) return 15;
    if (maxDiff < 0.05) return 13;
    if (maxDiff < 0.1) return 11;
    if (maxDiff < 0.5) return 9;
    if (maxDiff < 1) return 7;
    if (maxDiff < 5) return 5;
    return 3;
  },
};
