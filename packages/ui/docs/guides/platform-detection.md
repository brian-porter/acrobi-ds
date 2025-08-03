# Platform Detection & Feature Detection Guide

This comprehensive guide covers platform detection, feature detection, and adaptive experiences in modern web applications using the Acrobi Design System.

## Table of Contents

- [Overview](#overview)
- [Platform Detection](#platform-detection)
- [Feature Detection](#feature-detection)
- [Feature Guard Component](#feature-guard-component)
- [Best Practices](#best-practices)
- [Integration Patterns](#integration-patterns)
- [Live Examples](#live-examples)
- [Advanced Techniques](#advanced-techniques)
- [Troubleshooting](#troubleshooting)

## Overview

Platform detection and feature detection are essential for creating adaptive web experiences that work seamlessly across different devices, operating systems, and browsers. The Acrobi Design System provides robust hooks and components for detecting platform capabilities and conditionally rendering content.

### Key Components

- **`usePlatform`** - Detects OS, browser, device type, and PWA status
- **`useFeatureDetection`** - Checks for Web API support
- **`FeatureGuard`** - Conditionally renders content based on feature support
- **Platform utilities** - Helper functions for advanced platform detection

## Platform Detection

The `usePlatform` hook provides comprehensive information about the user's platform environment.

### Basic Usage

```tsx
import { usePlatform } from '@acrobi/ui';

function MyComponent() {
  const { platform, isReady } = usePlatform();

  if (!isReady) {
    return <div>Detecting platform...</div>;
  }

  return (
    <div>
      <p>OS: {platform.os}</p>
      <p>Browser: {platform.browser}</p>
      <p>Device: {platform.deviceType}</p>
      <p>PWA: {platform.isPWA ? 'Yes' : 'No'}</p>
      <p>Touch: {platform.hasTouch ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

### Platform Information

The `platform` object contains:

```tsx
interface PlatformInfo {
  os: 'iOS' | 'Android' | 'Windows' | 'macOS' | 'Linux' | 'Unknown';
  browser: 'Chrome' | 'Safari' | 'Firefox' | 'Edge' | 'Unknown';
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  isPWA: boolean;
  hasTouch: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  userAgent: string;
}
```

### Platform-Specific Adaptations

```tsx
function AdaptiveInterface() {
  const { platform } = usePlatform();

  return (
    <div className={`app ${platform.deviceType}`}>
      {/* Mobile-optimized layout */}
      {platform.isMobile && (
        <div className="mobile-nav">
          <TouchNavigation />
        </div>
      )}

      {/* Desktop-enhanced features */}
      {platform.isDesktop && (
        <div className="desktop-features">
          <KeyboardShortcuts />
          <ContextMenus />
        </div>
      )}

      {/* PWA-specific features */}
      {platform.isPWA && (
        <div className="pwa-features">
          <OfflineIndicator />
          <InstallPrompt />
        </div>
      )}
    </div>
  );
}
```

### Platform Utilities

```tsx
import { PlatformUtils } from '@acrobi/ui';

function AdvancedPlatformFeatures() {
  const { platform } = usePlatform();

  // Check specific platform combinations
  const isIOSSafari = PlatformUtils.matches(
    { os: 'iOS', browser: 'Safari' },
    platform
  );

  // Get CSS classes for styling
  const platformClasses = PlatformUtils.getCSSClasses(platform);

  // Check API support
  const hasServiceWorker = PlatformUtils.supportsAPI('serviceWorker');

  // Get installation instructions
  const installMethod = PlatformUtils.getInstallMethod(platform);

  return (
    <div className={platformClasses.join(' ')}>
      {isIOSSafari && <IOSSpecificFeature />}
      {hasServiceWorker && <OfflineCapability />}
      <div className="install-instructions">
        {installMethod}
      </div>
    </div>
  );
}
```

## Feature Detection

The `useFeatureDetection` hook checks for specific Web API support.

### Basic Usage

```tsx
import { useFeatureDetection } from '@acrobi/ui';

function ShareButton() {
  const { isSupported, isReady } = useFeatureDetection('webShare');

  if (!isReady) {
    return <div>Checking share support...</div>;
  }

  return isSupported ? (
    <button onClick={handleWebShare}>Share</button>
  ) : (
    <button onClick={handleFallbackShare}>Copy Link</button>
  );
}
```

### Multiple Feature Detection

```tsx
import { useMultipleFeatureDetection } from '@acrobi/ui';

function MediaCapture() {
  const features = useMultipleFeatureDetection(['camera', 'microphone', 'mediaRecorder']);

  const canRecordVideo = features.camera.isSupported && 
                          features.microphone.isSupported && 
                          features.mediaRecorder.isSupported;

  return (
    <div>
      {canRecordVideo ? (
        <VideoRecorder />
      ) : (
        <div>
          <p>Video recording requires:</p>
          <ul>
            <li>Camera: {features.camera.isSupported ? '✅' : '❌'}</li>
            <li>Microphone: {features.microphone.isSupported ? '✅' : '❌'}</li>
            <li>MediaRecorder: {features.mediaRecorder.isSupported ? '✅' : '❌'}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
```

### Feature Detection Utilities

```tsx
import { FeatureDetectionUtils } from '@acrobi/ui';

function BrowserCapabilities() {
  // Check multiple features at once
  const features = FeatureDetectionUtils.checkFeatures([
    'serviceWorker',
    'pushManager',
    'webShare',
    'camera'
  ]);

  // Get all supported features
  const supportedFeatures = FeatureDetectionUtils.getSupportedFeatures();

  // Get feature support score
  const supportScore = FeatureDetectionUtils.getFeatureSupportScore();

  // Check if browser is modern
  const isModern = FeatureDetectionUtils.isModernBrowser();

  // Get detailed capabilities
  const capabilities = FeatureDetectionUtils.getBrowserCapabilities();

  return (
    <div>
      <h3>Browser Support Score: {supportScore}%</h3>
      <p>Modern Browser: {isModern ? 'Yes' : 'No'}</p>
      
      <h4>Supported Features:</h4>
      <ul>
        {supportedFeatures.map(feature => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <h4>Capabilities by Category:</h4>
      {Object.entries(capabilities).map(([category, info]) => (
        <div key={category}>
          <h5>{category}: {info.supported}/{info.total}</h5>
          <ul>
            {Object.entries(info.features).map(([feature, supported]) => (
              <li key={feature}>
                {feature}: {supported ? '✅' : '❌'}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

## Feature Guard Component

The `FeatureGuard` component provides declarative conditional rendering based on feature support.

### Basic Feature Guard

```tsx
import { FeatureGuard } from '@acrobi/ui';

function MyApp() {
  return (
    <div>
      {/* Only show if Web Share is supported */}
      <FeatureGuard feature="webShare">
        <ShareButton />
      </FeatureGuard>

      {/* Show different content based on support */}
      <FeatureGuard 
        feature="webShare"
        fallback={<CopyLinkButton />}
      >
        <NativeShareButton />
      </FeatureGuard>

      {/* Custom loading state */}
      <FeatureGuard 
        feature="camera"
        loadingComponent={<Spinner text="Checking camera..." />}
      >
        <CameraComponent />
      </FeatureGuard>
    </div>
  );
}
```

### Multiple Feature Guard

```tsx
import { MultipleFeatureGuard } from '@acrobi/ui';

function AdvancedFeatures() {
  return (
    <div>
      {/* Require ALL features (AND logic) */}
      <MultipleFeatureGuard 
        features={['camera', 'mediaRecorder']} 
        mode="all"
        fallback={<div>Video recording not available</div>}
      >
        <VideoRecorderComponent />
      </MultipleFeatureGuard>

      {/* Require ANY feature (OR logic) */}
      <MultipleFeatureGuard 
        features={['webShare', 'clipboard']} 
        mode="any"
        fallback={<div>No sharing options available</div>}
      >
        <ShareOptionsComponent />
      </MultipleFeatureGuard>
    </div>
  );
}
```

### Inverted Feature Guard

```tsx
function LegacyBrowserWarning() {
  return (
    <FeatureGuard 
      feature="serviceWorker"
      invert
      fallback={<div>Service Worker is available</div>}
    >
      <div className="warning">
        <h3>Browser Not Supported</h3>
        <p>This app requires a modern browser with Service Worker support.</p>
        <a href="/browser-support">Learn more</a>
      </div>
    </FeatureGuard>
  );
}
```

### Higher-Order Component Pattern

```tsx
import { withFeatureGuard } from '@acrobi/ui';

// Wrap component with feature guard
const EnhancedCameraComponent = withFeatureGuard(CameraComponent, {
  feature: 'camera',
  fallback: <div>Camera not available</div>
});

function App() {
  return (
    <div>
      <EnhancedCameraComponent />
    </div>
  );
}
```

### Feature Detection Provider

```tsx
import { FeatureDetectionProvider, useFeatureDetectionContext } from '@acrobi/ui';

function ChildComponent() {
  const { checkFeature, getSupportedFeatures } = useFeatureDetectionContext();
  
  const hasCamera = checkFeature('camera');
  const supported = getSupportedFeatures();

  return (
    <div>
      <p>Camera: {hasCamera ? 'Available' : 'Not available'}</p>
      <p>Supported features: {supported.join(', ')}</p>
    </div>
  );
}

function App() {
  return (
    <FeatureDetectionProvider features={['camera', 'webShare', 'bluetooth']}>
      <ChildComponent />
    </FeatureDetectionProvider>
  );
}
```

## Best Practices

### 1. Progressive Enhancement

Always design with progressive enhancement in mind:

```tsx
function ProgressiveComponent() {
  const { platform } = usePlatform();
  const { isSupported: hasWebShare } = useFeatureDetection('webShare');

  return (
    <div>
      {/* Base functionality that works everywhere */}
      <BasicContent />

      {/* Enhanced functionality for capable platforms */}
      {platform.hasTouch && <TouchGestures />}
      {hasWebShare && <NativeSharing />}
      {platform.isPWA && <OfflineFeatures />}
    </div>
  );
}
```

### 2. Graceful Degradation

Provide meaningful fallbacks:

```tsx
function RobustFeature() {
  return (
    <FeatureGuard 
      feature="geolocation"
      fallback={
        <div>
          <p>Location access not available</p>
          <input 
            type="text" 
            placeholder="Enter your location manually"
          />
        </div>
      }
    >
      <LocationPicker />
    </FeatureGuard>
  );
}
```

### 3. Performance Optimization

Cache feature detection results:

```tsx
function OptimizedApp() {
  // Pre-load commonly used features
  const features = ['camera', 'webShare', 'clipboard', 'geolocation'];
  
  return (
    <FeatureDetectionProvider features={features}>
      <AppContent />
    </FeatureDetectionProvider>
  );
}
```

### 4. User Communication

Clearly communicate capabilities and limitations:

```tsx
function TransparentFeature() {
  const { isSupported, isReady, error } = useFeatureDetection('bluetooth');

  if (!isReady) {
    return <div>Checking Bluetooth support...</div>;
  }

  if (error) {
    return <div>Unable to check Bluetooth support</div>;
  }

  return isSupported ? (
    <BluetoothComponent />
  ) : (
    <div>
      <p>Bluetooth is not supported in your browser</p>
      <details>
        <summary>What can I do?</summary>
        <ul>
          <li>Use a Chromium-based browser (Chrome, Edge)</li>
          <li>Enable experimental web platform features</li>
          <li>Use the mobile app for full Bluetooth support</li>
        </ul>
      </details>
    </div>
  );
}
```

## Integration Patterns

### 1. Layout Adaptation

```tsx
function AdaptiveLayout() {
  const { platform } = usePlatform();

  return (
    <div className={`layout layout--${platform.deviceType}`}>
      {platform.isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
}
```

### 2. Input Method Adaptation

```tsx
function AdaptiveInput() {
  const { platform } = usePlatform();
  const { isSupported: hasSpeech } = useFeatureDetection('speechRecognition');

  return (
    <div>
      <input type="text" placeholder="Type your message..." />
      
      {platform.hasTouch && (
        <button className="touch-optimized">
          Touch Input
        </button>
      )}
      
      {hasSpeech && (
        <button className="voice-input">
          🎤 Voice Input
        </button>
      )}
    </div>
  );
}
```

### 3. Feature-Based Navigation

```tsx
function AdaptiveNavigation() {
  const { platform } = usePlatform();
  const capabilities = FeatureDetectionUtils.getBrowserCapabilities();

  const showAdvancedFeatures = capabilities['Hardware'].supported > 0;

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/basic">Basic Features</Link>
      
      {showAdvancedFeatures && (
        <Link to="/advanced">Advanced Features</Link>
      )}
      
      {platform.isPWA && (
        <Link to="/offline">Offline Mode</Link>
      )}
    </nav>
  );
}
```

## Live Examples

### Example 1: Adaptive Media Capture

```tsx
function MediaCaptureExample() {
  const { platform } = usePlatform();
  const camera = useFeatureDetection('camera');
  const microphone = useFeatureDetection('microphone');
  const mediaRecorder = useFeatureDetection('mediaRecorder');

  const canRecordVideo = camera.isSupported && microphone.isSupported && mediaRecorder.isSupported;
  const canTakePhoto = camera.isSupported;

  return (
    <div className="media-capture">
      <h3>Media Capture Options</h3>
      
      {canRecordVideo && (
        <button onClick={startVideoRecording}>
          📹 Record Video
        </button>
      )}
      
      {canTakePhoto && (
        <button onClick={takePhoto}>
          📷 Take Photo
        </button>
      )}
      
      {!canTakePhoto && !canRecordVideo && (
        <div>
          <p>Media capture not available</p>
          <input type="file" accept="image/*,video/*" />
        </div>
      )}
      
      {platform.isMobile && (
        <p>Tip: Use the volume button as a shutter on mobile</p>
      )}
    </div>
  );
}
```

### Example 2: Smart Sharing Component

```tsx
function SmartSharingExample() {
  const webShare = useFeatureDetection('webShare');
  const clipboard = useFeatureDetection('clipboard');

  const shareData = {
    title: 'Check out this article',
    text: 'Great content here!',
    url: window.location.href
  };

  const handleShare = async () => {
    if (webShare.isSupported) {
      await navigator.share(shareData);
    } else if (clipboard.isSupported) {
      await navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard!');
    } else {
      // Fallback to manual copy
      prompt('Copy this link:', shareData.url);
    }
  };

  return (
    <div className="smart-sharing">
      <button onClick={handleShare}>
        {webShare.isSupported 
          ? '📤 Share' 
          : clipboard.isSupported 
            ? '📋 Copy Link' 
            : '🔗 Get Link'}
      </button>
    </div>
  );
}
```

### Example 3: Offline-First App

```tsx
function OfflineFirstExample() {
  const { platform } = usePlatform();
  const serviceWorker = useFeatureDetection('serviceWorker');
  const backgroundSync = useFeatureDetection('backgroundSync');
  
  return (
    <div className="offline-app">
      <header>
        <h1>Offline-First App</h1>
        {platform.isPWA && <PWAIndicator />}
      </header>

      <FeatureGuard 
        feature="serviceWorker"
        fallback={
          <div className="warning">
            ⚠️ Offline functionality not available
          </div>
        }
      >
        <OfflineContent />
        
        <FeatureGuard feature="backgroundSync">
          <BackgroundSyncFeatures />
        </FeatureGuard>
      </FeatureGuard>
    </div>
  );
}
```

## Advanced Techniques

### 1. Custom Feature Detection

```tsx
// Create custom feature detectors
const customDetectors = {
  // Check for specific CSS support
  cssGridSupport: () => CSS.supports('display', 'grid'),
  
  // Check for modern JavaScript features
  asyncAwaitSupport: () => {
    try {
      eval('(async () => {})');
      return true;
    } catch {
      return false;
    }
  },
  
  // Check for specific vendor APIs
  chromeFileSystemAccess: () => 'showOpenFilePicker' in window,
};

function CustomFeatureCheck() {
  const [hasGridSupport, setHasGridSupport] = React.useState(false);
  
  React.useEffect(() => {
    setHasGridSupport(customDetectors.cssGridSupport());
  }, []);

  return (
    <div className={hasGridSupport ? 'grid-layout' : 'flex-layout'}>
      {/* Adaptive layout based on CSS support */}
    </div>
  );
}
```

### 2. Performance Monitoring

```tsx
function PerformanceAwareFeatures() {
  const { platform } = usePlatform();
  const [connectionSpeed, setConnectionSpeed] = React.useState('unknown');

  React.useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      setConnectionSpeed(connection.effectiveType);
    }
  }, []);

  // Adapt features based on device performance
  const showHighQuality = platform.isDesktop && connectionSpeed !== 'slow-2g';

  return (
    <div>
      {showHighQuality ? (
        <HighQualityContent />
      ) : (
        <OptimizedContent />
      )}
    </div>
  );
}
```

### 3. Context-Aware Adaptation

```tsx
function ContextAwareApp() {
  const { platform } = usePlatform();
  const [isLowPowerMode, setIsLowPowerMode] = React.useState(false);

  React.useEffect(() => {
    // Detect power saving mode
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setIsLowPowerMode(battery.level < 0.2);
      });
    }
  }, []);

  return (
    <div className={`app ${isLowPowerMode ? 'power-saving' : ''}`}>
      {isLowPowerMode ? (
        <LowPowerInterface />
      ) : (
        <FullFeaturedInterface />
      )}
    </div>
  );
}
```

## Troubleshooting

### Common Issues

#### 1. Feature Detection False Positives

Some browsers report API support but don't actually implement it properly:

```tsx
function SafeFeatureDetection() {
  const [actualSupport, setActualSupport] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    async function testFeature() {
      if ('serviceWorker' in navigator) {
        try {
          // Actually test the API
          const registration = await navigator.serviceWorker.register('/test-sw.js');
          await registration.unregister();
          setActualSupport(true);
        } catch {
          setActualSupport(false);
        }
      } else {
        setActualSupport(false);
      }
    }

    testFeature();
  }, []);

  if (actualSupport === null) {
    return <div>Testing feature support...</div>;
  }

  return actualSupport ? (
    <ServiceWorkerFeatures />
  ) : (
    <div>Service Worker not fully supported</div>
  );
}
```

#### 2. Platform Detection Edge Cases

```tsx
function RobustPlatformDetection() {
  const { platform } = usePlatform();
  const [actualPlatform, setActualPlatform] = React.useState(platform);

  React.useEffect(() => {
    // Additional checks for edge cases
    const enhanced = {
      ...platform,
      // Detect iPad running desktop Safari
      isTablet: platform.deviceType === 'tablet' || 
                (platform.os === 'macOS' && 'ontouchend' in document),
      // Detect PWA more accurately
      isPWA: platform.isPWA || 
             window.matchMedia('(display-mode: standalone)').matches ||
             (window.navigator as any).standalone === true
    };

    setActualPlatform(enhanced);
  }, [platform]);

  return <AdaptiveInterface platform={actualPlatform} />;
}
```

#### 3. SSR Compatibility

```tsx
function SSRSafeComponent() {
  const { platform, isReady } = usePlatform();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Show neutral content during SSR
  if (!isClient || !isReady) {
    return <UniversalContent />;
  }

  // Show platform-specific content only on client
  return (
    <div>
      {platform.isMobile ? <MobileContent /> : <DesktopContent />}
    </div>
  );
}
```

### Debugging Tips

1. **Use browser dev tools** to inspect feature detection results
2. **Test on real devices** as emulators may not accurately reflect API support
3. **Monitor console warnings** for feature detection failures
4. **Use feature flags** to gradually roll out platform-specific features
5. **Implement analytics** to track feature usage across different platforms

### Testing Strategy

```tsx
// Mock platform detection for testing
const mockPlatform = {
  os: 'iOS',
  browser: 'Safari',
  deviceType: 'mobile',
  isPWA: true,
  hasTouch: true,
  isMobile: true,
  isDesktop: false,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
};

// Test component with different platform configurations
test('renders mobile interface on iOS', () => {
  jest.mock('@acrobi/ui', () => ({
    usePlatform: () => ({ platform: mockPlatform, isReady: true })
  }));

  render(<AdaptiveComponent />);
  expect(screen.getByTestId('mobile-interface')).toBeInTheDocument();
});
```

## Conclusion

Platform detection and feature detection are powerful tools for creating adaptive, inclusive web experiences. By using the Acrobi Design System's hooks and components, you can build applications that gracefully adapt to different devices, browsers, and capabilities while maintaining a consistent user experience.

Remember to always:
- Design with progressive enhancement
- Provide meaningful fallbacks
- Test on real devices
- Monitor feature usage
- Keep user privacy and performance in mind

For more information, see the [API documentation](../components/hooks/use-platform) and [component examples](../components/structures/feature-guard).