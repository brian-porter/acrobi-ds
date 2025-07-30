# FeatureGuard Component

The `FeatureGuard` component provides declarative feature detection and graceful fallback rendering for modern web APIs, enabling progressive enhancement with minimal code.

## Overview

Building web applications that work across diverse browsers and devices requires careful feature detection and fallback strategies. The `FeatureGuard` component simplifies this by automatically detecting Web API availability and conditionally rendering appropriate content based on browser capabilities.

## Key Features

- **Declarative API**: Wrap components to enable progressive enhancement
- **Automatic Detection**: Checks 40+ Web APIs including Service Workers, Camera, Bluetooth, NFC
- **Graceful Fallbacks**: Multiple fallback strategies from styled messages to custom components
- **Loading States**: Configurable loading indicators during feature detection
- **Flexible Styling**: Built-in visual styles for different contexts
- **Performance Optimized**: Efficient detection with minimal overhead
- **TypeScript Support**: Full type safety for all supported features

## Installation

```bash
npm install @acrobi/ui
```

## Basic Usage

```tsx
import { FeatureGuard } from '@acrobi/ui';

function ShareExample() {
  return (
    <FeatureGuard feature="webShare">
      <button onClick={() => navigator.share({ title: 'Check this out!' })}>
        📤 Share Content
      </button>
    </FeatureGuard>
  );
}
```

When Web Share isn't available, FeatureGuard automatically shows:
```
🔧 Feature Unavailable
Sharing not available. You can copy the link instead.
```

## Custom Fallbacks

Provide custom fallback components for better user experience:

```tsx
function CameraWithFallback() {
  return (
    <FeatureGuard 
      feature="camera"
      fallback={<FileUploadButton />}
    >
      <CameraButton />
    </FeatureGuard>
  );
}

function FileUploadButton() {
  return (
    <input 
      type="file" 
      accept="image/*"
      className="file-upload-button"
    />
  );
}
```

## Styled Fallbacks

Use built-in styles for different contexts:

```tsx
function StyledFallbacks() {
  return (
    <div className="space-y-4">
      {/* Warning style for important features */}
      <FeatureGuard 
        feature="geolocation" 
        fallbackStyle="warning"
        fallbackMessage="Location access required for this feature"
      >
        <LocationBasedContent />
      </FeatureGuard>
      
      {/* Error style for critical features */}
      <FeatureGuard 
        feature="webAuthn" 
        fallbackStyle="error"
        fallbackMessage="Biometric authentication not available"
      >
        <BiometricLogin />
      </FeatureGuard>
      
      {/* Info style for additional features */}
      <FeatureGuard 
        feature="wakeLock" 
        fallbackStyle="info"
        fallbackMessage="Screen will sleep normally"
      >
        <KeepAwakeToggle />
      </FeatureGuard>
      
      {/* Minimal style for subtle feedback */}
      <FeatureGuard 
        feature="vibration" 
        fallbackStyle="minimal"
        fallbackMessage="Haptic feedback not available"
      >
        <HapticButton />
      </FeatureGuard>
    </div>
  );
}
```

### Available Fallback Styles

- `default` - Standard gray container with icon
- `warning` - Yellow-themed warning style  
- `error` - Red-themed error style
- `info` - Blue-themed informational style
- `minimal` - Simple text message
- `none` - No visual styling (hidden)

## Loading States

Control loading behavior during feature detection:

```tsx
function LoadingExamples() {
  return (
    <div className="grid gap-4">
      {/* Spinner loading */}
      <FeatureGuard 
        feature="bluetooth"
        loadingStyle="spinner"
      >
        <BluetoothPairing />
      </FeatureGuard>
      
      {/* Skeleton loading */}
      <FeatureGuard 
        feature="nfc"
        loadingStyle="skeleton"
      >
        <NFCReader />
      </FeatureGuard>
      
      {/* Custom loading */}
      <FeatureGuard 
        feature="camera"
        loading={<div className="pulse">Checking camera access...</div>}
      >
        <CameraCapture />
      </FeatureGuard>
      
      {/* No loading indicator */}
      <FeatureGuard 
        feature="webShare"
        showLoading={false}
      >
        <ShareButton />
      </FeatureGuard>
    </div>
  );
}
```

### Available Loading Styles

- `default` - Skeleton with animated placeholders
- `spinner` - Loading spinner with text
- `skeleton` - Gray skeleton block
- `minimal` - Simple text message
- `none` - No loading indicator

## Advanced Examples

### Authentication Flow

Progressive authentication with multiple fallback methods:

```tsx
function AuthenticationFlow() {
  return (
    <div className="auth-methods">
      {/* Try biometric first */}
      <FeatureGuard 
        feature="webAuthn"
        fallback={
          /* Fall back to credential manager */
          <FeatureGuard 
            feature="credentialManagement"
            fallback={<PasswordLogin />}
          >
            <SavedCredentialsLogin />
          </FeatureGuard>
        }
      >
        <BiometricLogin />
      </FeatureGuard>
    </div>
  );
}
```

### Media Capture Options

Provide multiple capture methods based on device capabilities:

```tsx
function MediaCapture() {
  return (
    <div className="capture-options">
      <h3>Add Media</h3>
      
      {/* Camera capture */}
      <FeatureGuard 
        feature="camera"
        fallback={
          <label className="upload-button">
            📁 Upload Photo
            <input type="file" accept="image/*" hidden />
          </label>
        }
      >
        <button className="camera-button">
          📷 Take Photo
        </button>
      </FeatureGuard>
      
      {/* Screen recording */}
      <FeatureGuard 
        feature="screenCapture"
        fallbackStyle="minimal"
        fallbackMessage="Screen recording not available"
      >
        <button className="screen-record-button">
          🖥️ Record Screen
        </button>
      </FeatureGuard>
    </div>
  );
}
```

### PWA Feature Detection

Check for PWA capabilities and show appropriate install prompts:

```tsx
function PWAFeatures() {
  return (
    <div className="pwa-features">
      {/* Service Worker features */}
      <FeatureGuard 
        feature="serviceWorker"
        fallbackStyle="warning"
        fallbackMessage="Offline functionality not available in this browser"
      >
        <OfflineCapabilities />
      </FeatureGuard>
      
      {/* Push notifications */}
      <FeatureGuard 
        feature="pushManager"
        fallback={<EmailNotificationSettings />}
      >
        <PushNotificationSettings />
      </FeatureGuard>
      
      {/* App badging */}
      <FeatureGuard 
        feature="badging"
        showDefaultFallback={false}
      >
        <AppBadgeSettings />
      </FeatureGuard>
    </div>
  );
}
```

## Higher-Order Component Pattern

Create reusable components with built-in feature detection:

```tsx
import { withFeatureGuard } from '@acrobi/ui';

// Create enhanced components
const SafeShareButton = withFeatureGuard(
  ShareButton, 
  'webShare', 
  CopyLinkButton
);

const SafeCameraButton = withFeatureGuard(
  CameraButton,
  'camera',
  FileUploadButton
);

function App() {
  return (
    <div>
      <SafeShareButton />
      <SafeCameraButton />
    </div>
  );
}
```

## Multiple Feature Detection

Use the `useFeatureGuards` hook for complex feature requirements:

```tsx
import { useFeatureGuards } from '@acrobi/ui';

function AdvancedFeatureDemo() {
  const {
    supportedFeatures,
    unsupportedFeatures,
    supportPercentage,
    isAllReady
  } = useFeatureGuards([
    'camera',
    'webShare',
    'geolocation',
    'webAuthn',
    'bluetooth',
    'nfc'
  ]);
  
  if (!isAllReady) {
    return <div>Checking capabilities...</div>;
  }
  
  return (
    <div>
      <div className="capability-summary">
        <h3>Browser Capabilities</h3>
        <div className="progress-bar">
          <div 
            style={{ width: `${supportPercentage}%` }}
            className="progress-fill"
          />
        </div>
        <p>{supportPercentage}% of advanced features supported</p>
      </div>
      
      <div className="feature-list">
        <h4>Available Features ({supportedFeatures.length})</h4>
        {supportedFeatures.map(feature => (
          <div key={feature} className="feature-item available">
            ✅ {feature}
          </div>
        ))}
        
        <h4>Unavailable Features ({unsupportedFeatures.length})</h4>
        {unsupportedFeatures.map(feature => (
          <div key={feature} className="feature-item unavailable">
            ❌ {feature}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Callbacks and Logging

Monitor feature detection for analytics or debugging:

```tsx
function MonitoredFeatures() {
  const handleFeatureCheck = (feature, isSupported) => {
    // Send analytics
    analytics.track('feature_check', {
      feature,
      supported: isSupported,
      userAgent: navigator.userAgent
    });
  };
  
  return (
    <div>
      <FeatureGuard
        feature="webShare"
        onFeatureCheck={handleFeatureCheck}
        logUnsupported={process.env.NODE_ENV === 'development'}
      >
        <ShareButton />
      </FeatureGuard>
      
      <FeatureGuard
        feature="camera"
        onFeatureCheck={handleFeatureCheck}
      >
        <CameraButton />
      </FeatureGuard>
    </div>
  );
}
```

## Props Reference

### FeatureGuardProps

```tsx
interface FeatureGuardProps {
  /** The Web API feature to check for support */
  feature: 'webShare' | 'camera' | 'bluetooth' | /* 37 more... */;
  
  /** Content to render when feature is supported */
  children: React.ReactNode;
  
  /** Content to render when feature is not supported */
  fallback?: React.ReactNode;
  
  /** Content to render while checking feature support */
  loading?: React.ReactNode;
  
  /** Visual style for fallback messages */
  fallbackStyle?: 'default' | 'minimal' | 'warning' | 'error' | 'info' | 'none';
  
  /** Visual style for loading states */
  loadingStyle?: 'default' | 'minimal' | 'skeleton' | 'spinner' | 'none';
  
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
  onFeatureCheck?: (feature: string, isSupported: boolean) => void;
}
```

## Best Practices

### Progressive Enhancement

Use FeatureGuard to enhance experiences, not gate content:

```tsx
// ✅ Good: Enhancement with fallback
<FeatureGuard feature="webShare" fallback={<CopyButton />}>
  <ShareButton />
</FeatureGuard>

// ❌ Avoid: Gating core functionality
<FeatureGuard feature="camera" showDefaultFallback={false}>
  <AppRequiresCamera />
</FeatureGuard>
```

### Performance Optimization

Minimize the number of feature checks per component:

```tsx
// ✅ Good: Single check, pass down result
function App() {
  return (
    <FeatureGuard feature="camera">
      <CameraFeatures />
    </FeatureGuard>
  );
}

// ❌ Avoid: Multiple checks for same feature
function BadExample() {
  return (
    <div>
      <FeatureGuard feature="camera"><CameraButton /></FeatureGuard>
      <FeatureGuard feature="camera"><CameraSettings /></FeatureGuard>
      <FeatureGuard feature="camera"><CameraGallery /></FeatureGuard>
    </div>
  );
}
```

### User Experience

Provide helpful fallback messages:

```tsx
// ✅ Good: Helpful, actionable message
<FeatureGuard 
  feature="geolocation"
  fallbackMessage="Location access needed for nearby results. Please enable in browser settings or enter address manually."
>
  <LocationPicker />
</FeatureGuard>

// ❌ Avoid: Technical or vague message
<FeatureGuard 
  feature="geolocation"
  fallbackMessage="Geolocation API not supported"
>
  <LocationPicker />
</FeatureGuard>
```

## TypeScript Support

Full TypeScript definitions with autocomplete for supported features:

```tsx
import { FeatureGuard, withFeatureGuard, useFeatureGuards } from '@acrobi/ui';
import type { FeatureGuardProps, FeatureAPI } from '@acrobi/ui';

// Autocomplete for all supported features
const feature: FeatureAPI = 'webShare';

// Type-safe props
const props: FeatureGuardProps = {
  feature: 'camera',
  children: <div>Camera component</div>,
  fallbackStyle: 'warning',
  onFeatureCheck: (feature, supported) => {
    console.log(`${feature}: ${supported}`);
  }
};
```

## Browser Support

FeatureGuard works in all modern browsers and handles:
- **Server-side rendering**: Safe defaults, client-side detection
- **Old browsers**: Graceful error handling
- **Restricted contexts**: Proper permission handling
- **Secure contexts**: Respects HTTPS requirements for sensitive APIs

## Related Components

- [`useFeatureDetection`](../hooks/use-feature-detection) - The underlying detection hook
- [`usePlatform`](../hooks/use-platform) - Platform and device detection
- [`useGeolocation`](../hooks/use-geolocation) - Location services with fallbacks
- [`useCamera`](../hooks/use-camera) - Camera access with device detection

## Examples in Storybook

Explore interactive examples and test different scenarios:

- [Basic Feature Guard](/?path=/story/structures-featureguard--default)
- [Custom Fallbacks](/?path=/story/structures-featureguard--with-custom-fallback) 
- [Styled Fallbacks](/?path=/story/structures-featureguard--styled-fallbacks)
- [Loading States](/?path=/story/structures-featureguard--loading-states)
- [Multiple Features](/?path=/story/structures-featureguard--multiple-features)
- [Real-World Examples](/?path=/story/structures-featureguard--real-world-examples)