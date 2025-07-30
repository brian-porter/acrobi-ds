# useFeatureDetection Hook

The `useFeatureDetection` hook provides reliable Web API detection for building progressive enhancement experiences that gracefully handle browser capability differences.

## Overview

Modern web applications use advanced APIs like Web Share, Camera access, Bluetooth, and NFC. However, support varies widely across browsers and platforms. The `useFeatureDetection` hook solves this by providing accurate, real-time feature availability checking with built-in fallback strategies.

## Key Features

- **40+ API Detection**: Supports Service Workers, Media APIs, Hardware APIs, and more
- **Real-time Checking**: Instant availability detection without performance overhead
- **Batch Detection**: Check multiple features simultaneously
- **Error Handling**: Graceful degradation when detection fails
- **SSR Safe**: Works correctly during server-side rendering
- **TypeScript Support**: Full type safety for all supported APIs

## Installation

```bash
npm install @acrobi/ui
```

## Basic Usage

```tsx
import { useFeatureDetection } from '@acrobi/ui';

function ShareButton() {
  const { isSupported, isReady } = useFeatureDetection('webShare');
  
  if (!isReady) {
    return <div>Checking...</div>;
  }
  
  if (isSupported) {
    return (
      <button onClick={() => navigator.share({ title: 'Check this out!' })}>
        📤 Share
      </button>
    );
  }
  
  return (
    <button onClick={() => navigator.clipboard?.writeText(window.location.href)}>
      📋 Copy Link
    </button>
  );
}
```

## Supported APIs

The hook detects 40+ Web APIs across multiple categories:

### Service Worker APIs
- `serviceWorker` - Service Worker support
- `pushManager` - Push notification support
- `backgroundSync` - Background synchronization
- `periodicBackgroundSync` - Periodic background sync
- `backgroundFetch` - Background downloads

### Media APIs
- `camera` - Camera access via getUserMedia
- `microphone` - Microphone access
- `mediaRecorder` - Media recording capabilities
- `screenCapture` - Screen recording/sharing
- `displayCapture` - Display media capture

### Hardware APIs
- `bluetooth` - Web Bluetooth support
- `nfc` - Near Field Communication
- `vibration` - Device vibration control
- `gamepad` - Gamepad/controller input
- `webHID` - Human Interface Device access
- `webSerial` - Serial port communication
- `webUSB` - USB device access

### File System APIs
- `fileSystemAccess` - Native file system access
- `fileHandling` - File association handling
- `clipboard` - Clipboard read access
- `clipboardWrite` - Clipboard write access

### Authentication & Security
- `webAuthn` - WebAuthn/FIDO2 biometric auth
- `credentialManagement` - Credential Management API

### App Integration APIs
- `badging` - App badge notifications
- `wakeLock` - Screen wake lock
- `webShare` - Native sharing
- `webShareTarget` - Receive shared content
- `paymentRequest` - Native payment methods
- `contactPicker` - Privacy-preserving contact access

### Graphics & Compute APIs
- `webGL` - WebGL graphics support
- `webGL2` - WebGL 2.0 support
- `webGPU` - WebGPU compute shaders
- `webCodecs` - Hardware-accelerated codecs
- `offscreenCanvas` - Background canvas rendering

### And more...
- `geolocation` - Location services
- `deviceMotion` - Motion sensors
- `speechRecognition` - Voice input
- `speechSynthesis` - Text-to-speech
- `eyeDropper` - Color picker tool
- `launchQueue` - App launch handling

## Progressive Enhancement

Use feature detection to enhance experiences progressively:

```tsx
function CameraCapture() {
  const { isSupported: hasCamera } = useFeatureDetection('camera');
  const { isSupported: hasFileAccess } = useFeatureDetection('fileSystemAccess');
  
  if (hasCamera) {
    return <LiveCameraCapture />;
  }
  
  if (hasFileAccess) {
    return <AdvancedFileUpload />;
  }
  
  return <BasicFileUpload />;
}
```

## Multiple Feature Detection

Check multiple features simultaneously for complex feature requirements:

```tsx
import { useMultipleFeatureDetection } from '@acrobi/ui';

function AdvancedMediaApp() {
  const features = useMultipleFeatureDetection([
    'camera',
    'microphone', 
    'mediaRecorder',
    'screenCapture'
  ]);
  
  const canRecordVideo = features.camera.isSupported && 
                        features.microphone.isSupported && 
                        features.mediaRecorder.isSupported;
  
  const canRecordScreen = features.screenCapture.isSupported && 
                         features.mediaRecorder.isSupported;
  
  return (
    <div>
      {canRecordVideo && <VideoRecordingButton />}
      {canRecordScreen && <ScreenRecordingButton />}
      {!canRecordVideo && !canRecordScreen && <UploadOnlyMode />}
    </div>
  );
}
```

## Feature Detection Utilities

### Batch Feature Checking

Check multiple features synchronously:

```tsx
import { FeatureDetectionUtils } from '@acrobi/ui';

function CapabilityDashboard() {
  const [capabilities, setCaps] = useState({});
  
  useEffect(() => {
    const caps = FeatureDetectionUtils.checkFeatures([
      'webShare',
      'clipboard',
      'camera',
      'geolocation',
      'webAuthn'
    ]);
    setCaps(caps);
  }, []);
  
  return (
    <div>
      {Object.entries(capabilities).map(([feature, supported]) => (
        <div key={feature}>
          {feature}: {supported ? '✅' : '❌'}
        </div>
      ))}
    </div>
  );
}
```

### Browser Modernity Assessment

Check if browser supports modern web capabilities:

```tsx
function ModernBrowserCheck() {
  const isModern = FeatureDetectionUtils.isModernBrowser();
  const supportScore = FeatureDetectionUtils.getFeatureSupportScore();
  
  if (!isModern) {
    return (
      <div className="browser-warning">
        <h3>Browser Update Recommended</h3>
        <p>Your browser supports {supportScore}% of modern web features.</p>
        <p>Please consider updating for the best experience.</p>
      </div>
    );
  }
  
  return <ModernWebApp />;
}
```

### Capability Categories

Get organized view of browser capabilities:

```tsx
function CapabilityOverview() {
  const [capabilities, setCaps] = useState({});
  
  useEffect(() => {
    const caps = FeatureDetectionUtils.getBrowserCapabilities();
    setCaps(caps);
  }, []);
  
  return (
    <div>
      {Object.entries(capabilities).map(([category, data]) => (
        <div key={category}>
          <h3>{category}</h3>
          <div>Support: {data.supported}/{data.total}</div>
          <ul>
            {Object.entries(data.features).map(([feature, supported]) => (
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

## Error Handling

Handle detection errors gracefully:

```tsx
function RobustFeatureCheck() {
  const { isSupported, isReady, error } = useFeatureDetection('bluetooth');
  
  if (!isReady) {
    return <div>Checking Bluetooth support...</div>;
  }
  
  if (error) {
    console.warn('Bluetooth detection failed:', error);
    return <div>Unable to check Bluetooth support</div>;
  }
  
  return isSupported ? <BluetoothPairing /> : <BluetoothUnavailable />;
}
```

## Real-World Examples

### Authentication Options

Provide multiple authentication methods based on capability:

```tsx
function AuthenticationMethods() {
  const { isSupported: hasWebAuthn } = useFeatureDetection('webAuthn');
  const { isSupported: hasCredentials } = useFeatureDetection('credentialManagement');
  
  return (
    <div className="auth-methods">
      {hasWebAuthn && (
        <button className="auth-biometric">
          🔐 Sign in with Biometrics
        </button>
      )}
      
      {hasCredentials && (
        <button className="auth-saved">
          🔑 Use Saved Credentials
        </button>
      )}
      
      <button className="auth-password">
        🔒 Sign in with Password
      </button>
    </div>
  );
}
```

### Media Capture Options

Offer appropriate media capture based on device capabilities:

```tsx
function MediaCapture() {
  const { isSupported: hasCamera } = useFeatureDetection('camera');
  const { isSupported: hasScreenCapture } = useFeatureDetection('screenCapture');
  const { isSupported: hasFileAccess } = useFeatureDetection('fileSystemAccess');
  
  return (
    <div className="media-options">
      {hasCamera && (
        <button onClick={captureCamera}>
          📷 Take Photo
        </button>
      )}
      
      {hasScreenCapture && (
        <button onClick={captureScreen}>
          🖥️ Capture Screen
        </button>
      )}
      
      {hasFileAccess ? (
        <button onClick={openAdvancedFilePicker}>
          📁 Browse Files
        </button>
      ) : (
        <input type="file" accept="image/*" />
      )}
    </div>
  );
}
```

### PWA Installation Detection

Check for PWA installation capabilities:

```tsx
function PWAInstallPrompt() {
  const { isSupported: hasServiceWorker } = useFeatureDetection('serviceWorker');
  const { isSupported: hasBadging } = useFeatureDetection('badging');
  const [installPrompt, setInstallPrompt] = useState(null);
  
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      setInstallPrompt(e);
    });
  }, []);
  
  if (!hasServiceWorker) {
    return (
      <div className="pwa-unavailable">
        <p>App installation not available in this browser.</p>
      </div>
    );
  }
  
  return (
    <div className="pwa-install">
      <h3>Install This App</h3>
      <ul>
        <li>✅ Offline functionality</li>
        <li>✅ Faster loading</li>
        {hasBadging && <li>✅ Notification badges</li>}
      </ul>
      
      {installPrompt && (
        <button onClick={() => installPrompt.prompt()}>
          📱 Install App
        </button>
      )}
    </div>
  );
}
```

## Best Practices

### Feature Detection Over Browser Detection

✅ **Good**: Check for actual capability
```tsx
const { isSupported } = useFeatureDetection('webShare');
```

❌ **Avoid**: Assume based on user agent
```tsx
const isMobile = /Android|iPhone/.test(navigator.userAgent);
```

### Graceful Degradation

Always provide fallbacks:

```tsx
function ShareContent() {
  const { isSupported: hasWebShare } = useFeatureDetection('webShare');
  const { isSupported: hasClipboard } = useFeatureDetection('clipboard');
  
  const handleShare = async () => {
    if (hasWebShare) {
      await navigator.share({ title: 'Content', url: location.href });
    } else if (hasClipboard) {
      await navigator.clipboard.writeText(location.href);
      showToast('Link copied!');
    } else {
      showModal('Copy this link: ' + location.href);
    }
  };
  
  return <button onClick={handleShare}>Share</button>;
}
```

### Performance Optimization

Cache detection results when checking the same feature multiple times:

```tsx
// ✅ Good: Single hook call, reuse result
function App() {
  const { isSupported: hasCamera } = useFeatureDetection('camera');
  
  return (
    <div>
      <Header hasCamera={hasCamera} />
      <MainContent hasCamera={hasCamera} />
      <Footer hasCamera={hasCamera} />
    </div>
  );
}
```

## TypeScript Support

Full TypeScript definitions with autocomplete for all supported APIs:

```tsx
import { 
  FeatureAPI, 
  UseFeatureDetectionReturn,
  FeatureDetectionUtils 
} from '@acrobi/ui';

// Autocomplete for all 40+ supported APIs
const feature: FeatureAPI = 'webShare';

const result: UseFeatureDetectionReturn = {
  isSupported: true,
  isReady: true,
  error: undefined
};

// Type-safe batch checking
const capabilities: Record<FeatureAPI, boolean> = 
  FeatureDetectionUtils.checkFeatures(['camera', 'bluetooth']);
```

## Browser Support

The hook works in all modern browsers and gracefully handles:
- **Server-side rendering**: Returns safe defaults
- **Old browsers**: Catches detection errors
- **Restricted contexts**: Handles permission-based APIs
- **Secure contexts**: Respects HTTPS requirements

## Related Components

- [`FeatureGuard`](../structures/feature-guard) - Conditional rendering based on features
- [`usePlatform`](./use-platform) - Platform and device detection
- [`useGeolocation`](./use-geolocation) - Geolocation with fallbacks
- [`useCamera`](./use-camera) - Camera access with graceful degradation

## Examples in Storybook

Explore interactive examples and test feature detection:

- [Basic Feature Detection](/?path=/story/hooks-usefeaturedetection--default)
- [Multiple Features](/?path=/story/hooks-usefeaturedetection--multiple-features)
- [Progressive Enhancement](/?path=/story/hooks-usefeaturedetection--progressive-enhancement)
- [Browser Capabilities](/?path=/story/hooks-usefeaturedetection--browser-capabilities)