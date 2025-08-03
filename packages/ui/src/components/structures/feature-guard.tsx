import * as React from 'react';
import { cn } from '../../lib/utils';
import { useFeatureDetection, type FeatureAPI } from '../../hooks/use-feature-detection';

/**
 * FeatureGuard Props
 */
export interface FeatureGuardProps {
  /** Feature API to check for support */
  feature: FeatureAPI;
  /** Content to render when feature is supported */
  children: React.ReactNode;
  /** Content to render when feature is not supported (optional) */
  fallback?: React.ReactNode;
  /** Show loading state while checking feature support */
  showLoading?: boolean;
  /** Loading component to display while checking */
  loadingComponent?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Callback when feature support is determined */
  onSupportDetermined?: (isSupported: boolean) => void;
  /** Invert the logic - render children when feature is NOT supported */
  invert?: boolean;
}

/**
 * FeatureGuard Component
 * 
 * Conditionally renders content based on Web API feature support.
 * Uses the useFeatureDetection hook to check for feature availability
 * and renders appropriate content based on support status.
 * 
 * @example
 * ```tsx
 * // Basic usage - only show content if feature is supported
 * <FeatureGuard feature="webShare">
 *   <button onClick={handleShare}>Share</button>
 * </FeatureGuard>
 * 
 * // With fallback content
 * <FeatureGuard 
 *   feature="webShare"
 *   fallback={<button onClick={handleCopyLink}>Copy Link</button>}
 * >
 *   <button onClick={handleShare}>Share</button>
 * </FeatureGuard>
 * 
 * // Show different content when feature is NOT supported
 * <FeatureGuard 
 *   feature="serviceWorker"
 *   invert
 *   fallback={<div>This app requires a modern browser</div>}
 * >
 *   <div>Offline mode not available</div>
 * </FeatureGuard>
 * 
 * // With loading state
 * <FeatureGuard 
 *   feature="camera"
 *   showLoading
 *   loadingComponent={<div>Checking camera support...</div>}
 * >
 *   <CameraComponent />
 * </FeatureGuard>
 * ```
 */
const FeatureGuard = React.forwardRef<HTMLDivElement, FeatureGuardProps>(
  (
    {
      feature,
      children,
      fallback = null,
      showLoading = true,
      loadingComponent = <div>Checking feature support...</div>,
      className,
      onSupportDetermined,
      invert = false,
      ...props
    },
    ref
  ) => {
    const { isSupported, isReady, error } = useFeatureDetection(feature);

    // Notify parent when support is determined
    React.useEffect(() => {
      if (isReady && onSupportDetermined) {
        onSupportDetermined(isSupported);
      }
    }, [isReady, isSupported, onSupportDetermined]);

    // Show loading state while checking feature support
    if (!isReady && showLoading) {
      return (
        <div
          ref={ref}
          className={cn('feature-guard feature-guard--loading', className)}
          data-feature={feature}
          data-state="loading"
          {...props}
        >
          {loadingComponent}
        </div>
      );
    }

    // Don't render anything if not ready and loading is disabled
    if (!isReady) {
      return null;
    }

    // Log error if feature detection failed
    if (error) {
      console.warn(`FeatureGuard: Feature detection failed for ${feature}:`, error);
    }

    // Determine what to render based on support and invert flag
    const shouldRenderChildren = invert ? !isSupported : isSupported;
    const content = shouldRenderChildren ? children : fallback;

    // Don't render anything if no content to show
    if (!content) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'feature-guard',
          isSupported ? 'feature-guard--supported' : 'feature-guard--unsupported',
          invert && 'feature-guard--inverted',
          className
        )}
        data-feature={feature}
        data-supported={isSupported}
        data-state={isReady ? 'ready' : 'loading'}
        data-inverted={invert}
        {...props}
      >
        {content}
      </div>
    );
  }
);

FeatureGuard.displayName = 'FeatureGuard';

/**
 * Multiple Feature Guard Component
 * 
 * Guards content based on multiple feature requirements.
 * Supports AND/OR logic for feature combinations.
 * 
 * @example
 * ```tsx
 * // Require ALL features to be supported (AND logic)
 * <MultipleFeatureGuard 
 *   features={['camera', 'mediaRecorder']} 
 *   mode="all"
 * >
 *   <VideoRecorderComponent />
 * </MultipleFeatureGuard>
 * 
 * // Require ANY feature to be supported (OR logic)
 * <MultipleFeatureGuard 
 *   features={['webShare', 'clipboard']} 
 *   mode="any"
 * >
 *   <ShareComponent />
 * </MultipleFeatureGuard>
 * ```
 */
export interface MultipleFeatureGuardProps extends Omit<FeatureGuardProps, 'feature'> {
  /** Array of features to check */
  features: FeatureAPI[];
  /** Logic mode: 'all' (AND) or 'any' (OR) */
  mode?: 'all' | 'any';
  /** Callback with detailed support information */
  onSupportDetermined?: (supportInfo: {
    supported: FeatureAPI[];
    unsupported: FeatureAPI[];
    allSupported: boolean;
    anySupported: boolean;
  }) => void;
}

const MultipleFeatureGuard = React.forwardRef<HTMLDivElement, MultipleFeatureGuardProps>(
  (
    {
      features,
      mode = 'all',
      children,
      fallback = null,
      showLoading = true,
      loadingComponent = <div>Checking feature support...</div>,
      className,
      onSupportDetermined,
      invert = false,
      ...props
    },
    ref
  ) => {
    const [allReady, setAllReady] = React.useState(false);
    const [supportedFeatures, setSupportedFeatures] = React.useState<FeatureAPI[]>([]);
    const [unsupportedFeatures, setUnsupportedFeatures] = React.useState<FeatureAPI[]>([]);

    // Track feature detection results
    const featureResults = features.map(feature => ({
      feature,
      ...useFeatureDetection(feature)
    }));

    React.useEffect(() => {
      const readyResults = featureResults.filter(result => result.isReady);
      const isAllReady = readyResults.length === features.length;
      
      if (isAllReady) {
        const supported = readyResults.filter(result => result.isSupported).map(r => r.feature);
        const unsupported = readyResults.filter(result => !result.isSupported).map(r => r.feature);
        
        setSupportedFeatures(supported);
        setUnsupportedFeatures(unsupported);
        setAllReady(true);

        if (onSupportDetermined) {
          onSupportDetermined({
            supported,
            unsupported,
            allSupported: supported.length === features.length,
            anySupported: supported.length > 0,
          });
        }
      }
    }, [featureResults, features.length, onSupportDetermined]);

    // Show loading state
    if (!allReady && showLoading) {
      return (
        <div
          ref={ref}
          className={cn('feature-guard feature-guard--loading feature-guard--multiple', className)}
          data-features={features.join(',')}
          data-mode={mode}
          data-state="loading"
          {...props}
        >
          {loadingComponent}
        </div>
      );
    }

    // Don't render if not ready
    if (!allReady) {
      return null;
    }

    // Determine support based on mode
    const isSupported = mode === 'all' 
      ? supportedFeatures.length === features.length
      : supportedFeatures.length > 0;

    const shouldRenderChildren = invert ? !isSupported : isSupported;
    const content = shouldRenderChildren ? children : fallback;

    if (!content) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'feature-guard feature-guard--multiple',
          isSupported ? 'feature-guard--supported' : 'feature-guard--unsupported',
          invert && 'feature-guard--inverted',
          className
        )}
        data-features={features.join(',')}
        data-mode={mode}
        data-supported={isSupported}
        data-supported-count={supportedFeatures.length}
        data-state="ready"
        data-inverted={invert}
        {...props}
      >
        {content}
      </div>
    );
  }
);

MultipleFeatureGuard.displayName = 'MultipleFeatureGuard';

/**
 * Feature Detection Provider
 * 
 * Provides feature detection context to child components.
 * Useful for sharing feature detection results across multiple components.
 */
export interface FeatureDetectionContextValue {
  checkFeature: (feature: FeatureAPI) => boolean;
  isFeatureReady: (feature: FeatureAPI) => boolean;
  getSupportedFeatures: () => FeatureAPI[];
  getUnsupportedFeatures: () => FeatureAPI[];
}

const FeatureDetectionContext = React.createContext<FeatureDetectionContextValue | null>(null);

export interface FeatureDetectionProviderProps {
  /** Features to preload */
  features?: FeatureAPI[];
  /** Child components */
  children: React.ReactNode;
}

export const FeatureDetectionProvider: React.FC<FeatureDetectionProviderProps> = ({
  features = [],
  children,
}) => {
  const featureCache = React.useRef<Map<FeatureAPI, { isSupported: boolean; isReady: boolean }>>(
    new Map()
  );

  // Preload specified features
  const preloadResults = features.map(feature => ({
    feature,
    ...useFeatureDetection(feature)
  }));

  React.useEffect(() => {
    preloadResults.forEach(({ feature, isSupported, isReady }) => {
      if (isReady) {
        featureCache.current.set(feature, { isSupported, isReady });
      }
    });
  }, [preloadResults]);

  const contextValue: FeatureDetectionContextValue = React.useMemo(() => ({
    checkFeature: (feature: FeatureAPI) => {
      const cached = featureCache.current.get(feature);
      return cached?.isSupported ?? false;
    },
    isFeatureReady: (feature: FeatureAPI) => {
      const cached = featureCache.current.get(feature);
      return cached?.isReady ?? false;
    },
    getSupportedFeatures: () => {
      return Array.from(featureCache.current.entries())
        .filter(([, { isSupported, isReady }]) => isReady && isSupported)
        .map(([feature]) => feature);
    },
    getUnsupportedFeatures: () => {
      return Array.from(featureCache.current.entries())
        .filter(([, { isSupported, isReady }]) => isReady && !isSupported)
        .map(([feature]) => feature);
    },
  }), []);

  return (
    <FeatureDetectionContext.Provider value={contextValue}>
      {children}
    </FeatureDetectionContext.Provider>
  );
};

/**
 * Hook to use feature detection context
 */
export const useFeatureDetectionContext = (): FeatureDetectionContextValue => {
  const context = React.useContext(FeatureDetectionContext);
  if (!context) {
    throw new Error('useFeatureDetectionContext must be used within a FeatureDetectionProvider');
  }
  return context;
};

/**
 * Higher-Order Component for feature guarding
 * 
 * @example
 * ```tsx
 * const EnhancedComponent = withFeatureGuard(MyComponent, {
 *   feature: 'webShare',
 *   fallback: <div>Share not available</div>
 * });
 * ```
 */
export function withFeatureGuard<P extends object>(
  Component: React.ComponentType<P>,
  guardProps: Omit<FeatureGuardProps, 'children'>
) {
  const WrappedComponent = React.forwardRef<any, P>((props, ref) => (
    <FeatureGuard {...guardProps}>
      <Component {...props} ref={ref} />
    </FeatureGuard>
  ));

  WrappedComponent.displayName = `withFeatureGuard(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

export { FeatureGuard, MultipleFeatureGuard };