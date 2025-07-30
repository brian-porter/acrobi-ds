import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useFeatureDetection, type FeatureAPI } from '../hooks/use-feature-detection';
import { cn } from '../lib/utils';

/**
 * FeatureGuard component variants using CVA
 */
const featureGuardVariants = cva(
  'feature-guard transition-all duration-200 ease-in-out',
  {
    variants: {
      fallbackStyle: {
        default: 'bg-gray-50 border border-gray-200 rounded-lg p-4',
        minimal: 'text-gray-600 text-sm',
        warning: 'bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800',
        error: 'bg-red-50 border border-red-200 rounded-lg p-4 text-red-800',
        info: 'bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800',
        none: '',
      },
      loadingStyle: {
        default: 'bg-gray-100 animate-pulse rounded-lg p-4',
        minimal: 'text-gray-400 text-sm',
        skeleton: 'bg-gray-200 animate-pulse rounded-lg h-16',
        spinner: 'flex items-center justify-center p-4',
        none: '',
      },
    },
    defaultVariants: {
      fallbackStyle: 'default',
      loadingStyle: 'default',
    },
  }
);

/**
 * Props for the FeatureGuard component
 */
export interface FeatureGuardProps extends VariantProps<typeof featureGuardVariants> {
  /** The Web API feature to check for support */
  feature: FeatureAPI;
  /** Content to render when feature is supported */
  children: React.ReactNode;
  /** Content to render when feature is not supported */
  fallback?: React.ReactNode;
  /** Content to render while checking feature support */
  loading?: React.ReactNode;
  /** Whether to show default fallback messages */
  showDefaultFallback?: boolean;
  /** Whether to show loading state */
  showLoading?: boolean;
  /** Custom className for the wrapper */
  className?: string;
  /** Custom fallback message */
  fallbackMessage?: string;
  /** Whether to log unsupported features to console */
  logUnsupported?: boolean;
  /** Callback when feature support is determined */
  onFeatureCheck?: (feature: FeatureAPI, isSupported: boolean) => void;
}

/**
 * Default fallback messages for common features
 */
const defaultFallbackMessages: Partial<Record<FeatureAPI, string>> = {
  webShare: 'Sharing not available. You can copy the link instead.',
  camera: 'Camera access not available. Please upload an image file.',
  geolocation: 'Location services not available. Please enter your address manually.',
  bluetooth: 'Bluetooth not supported in this browser.',
  nfc: 'NFC not supported on this device.',
  webAuthn: 'Biometric authentication not available. Please use password login.',
  pushManager: 'Push notifications not supported. Check browser settings.',
  clipboard: 'Clipboard access not available. Please copy manually.',
  wakeLock: 'Screen wake lock not supported. Screen may turn off during use.',
  badging: 'App badge notifications not supported.',
  paymentRequest: 'Native payment methods not available. Use standard checkout.',
  fileSystemAccess: 'Advanced file access not supported. Use file upload instead.',
  backgroundSync: 'Background sync not available. Data will sync when app is open.',
  serviceWorker: 'Offline functionality not available in this browser.',
  mediaRecorder: 'Screen recording not supported in this browser.',
  speechRecognition: 'Voice input not supported. Please type your message.',
  vibration: 'Haptic feedback not available on this device.',
};

/**
 * Loading spinner component
 */
const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('animate-spin h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full', className)} />
);

/**
 * FeatureGuard Component
 * 
 * A React component that conditionally renders its children based on Web API feature support.
 * Provides fallback content and loading states for graceful degradation when features
 * are not available.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <FeatureGuard feature="webShare">
 *   <ShareButton />
 * </FeatureGuard>
 * 
 * // With custom fallback
 * <FeatureGuard 
 *   feature="geolocation"
 *   fallback={<ManualLocationInput />}
 * >
 *   <AutoLocationButton />
 * </FeatureGuard>
 * 
 * // With callback
 * <FeatureGuard
 *   feature="camera"
 *   onFeatureCheck={(feature, supported) => {
 *     analytics.track('feature_check', { feature, supported });
 *   }}
 * >
 *   <CameraCapture />
 * </FeatureGuard>
 * ```
 */
export const FeatureGuard = React.forwardRef<HTMLDivElement, FeatureGuardProps>(
  ({
    feature,
    children,
    fallback,
    loading,
    showDefaultFallback = true,
    showLoading = true,
    fallbackStyle,
    loadingStyle,
    className,
    fallbackMessage,
    logUnsupported = false,
    onFeatureCheck,
    ...props
  }, ref) => {
    const { isSupported, isReady, error } = useFeatureDetection(feature);

    // Call callback when feature check completes
    React.useEffect(() => {
      if (isReady && onFeatureCheck) {
        onFeatureCheck(feature, isSupported);
      }
    }, [isReady, isSupported, feature, onFeatureCheck]);

    // Log unsupported features if requested
    React.useEffect(() => {
      if (isReady && !isSupported && logUnsupported) {
        console.warn(`Feature '${feature}' is not supported in this browser`);
      }
    }, [isReady, isSupported, feature, logUnsupported]);

    // Show loading state while checking feature support
    if (!isReady && showLoading) {
      if (loading) {
        return <div ref={ref} className={className} {...props}>{loading}</div>;
      }

      // Default loading content based on style
      const loadingClasses = featureGuardVariants({ loadingStyle });
      
      if (loadingStyle === 'spinner') {
        return (
          <div ref={ref} className={cn(loadingClasses, className)} {...props}>
            <LoadingSpinner />
            <span className="ml-2 text-sm text-gray-600">Checking feature support...</span>
          </div>
        );
      }

      if (loadingStyle === 'skeleton') {
        return <div ref={ref} className={cn(loadingClasses, className)} {...props} />;
      }

      if (loadingStyle === 'minimal') {
        return (
          <div ref={ref} className={cn(loadingClasses, className)} {...props}>
            Checking feature support...
          </div>
        );
      }

      if (loadingStyle === 'none') {
        return null;
      }

      // Default loading state
      return (
        <div ref={ref} className={cn(loadingClasses, className)} {...props}>
          <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse" />
        </div>
      );
    }

    // Feature is supported - render children
    if (isSupported) {
      return <>{children}</>;
    }

    // Feature is not supported - render fallback
    if (fallback) {
      return <div ref={ref} className={className} {...props}>{fallback}</div>;
    }

    // Show default fallback if enabled
    if (showDefaultFallback) {
      const message = fallbackMessage || defaultFallbackMessages[feature] || 
        `This feature (${feature}) is not supported in your browser.`;
      
      const fallbackClasses = featureGuardVariants({ fallbackStyle });

      if (fallbackStyle === 'none') {
        return null;
      }

      if (fallbackStyle === 'minimal') {
        return (
          <div ref={ref} className={cn(fallbackClasses, className)} {...props}>
            {message}
          </div>
        );
      }

      // Default fallback with styled container
      const iconMap: Partial<Record<typeof fallbackStyle, string>> = {
        warning: '⚠️',
        error: '❌',
        info: 'ℹ️',
        default: '🔧',
      };

      const icon = iconMap[fallbackStyle || 'default'] || '🔧';

      return (
        <div ref={ref} className={cn(fallbackClasses, className)} {...props}>
          <div className="flex items-start space-x-2">
            <span className="text-lg" role="img" aria-label="Feature unavailable">
              {icon}
            </span>
            <div>
              <p className="font-medium">Feature Unavailable</p>
              <p className="text-sm opacity-75">{message}</p>
              {error && (
                <details className="mt-2 text-xs opacity-60">
                  <summary className="cursor-pointer">Technical details</summary>
                  <pre className="mt-1 whitespace-pre-wrap">{error.message}</pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    // No fallback - render nothing
    return null;
  }
);

FeatureGuard.displayName = 'FeatureGuard';

/**
 * Higher-order component version of FeatureGuard
 */
export function withFeatureGuard<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  feature: FeatureAPI,
  fallbackComponent?: React.ComponentType<P>
) {
  const WithFeatureGuardComponent = React.forwardRef<any, P>((props, ref) => (
    <FeatureGuard
      feature={feature}
      fallback={fallbackComponent ? <fallbackComponent {...props} /> : undefined}
    >
      <WrappedComponent {...props} ref={ref} />
    </FeatureGuard>
  ));

  WithFeatureGuardComponent.displayName = `withFeatureGuard(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithFeatureGuardComponent;
}

/**
 * Hook for multiple feature guards
 */
export function useFeatureGuards(features: FeatureAPI[]) {
  const results = features.map(feature => ({
    feature,
    ...useFeatureDetection(feature),
  }));

  const isAllReady = results.every(result => result.isReady);
  const supportedFeatures = results.filter(result => result.isSupported).map(result => result.feature);
  const unsupportedFeatures = results.filter(result => !result.isSupported).map(result => result.feature);

  return {
    results,
    isAllReady,
    supportedFeatures,
    unsupportedFeatures,
    supportCount: supportedFeatures.length,
    totalCount: features.length,
    supportPercentage: Math.round((supportedFeatures.length / features.length) * 100),
  };
}

export default FeatureGuard;