# Hooks & Providers Overview

React hooks and providers for Progressive Web App (PWA) capabilities and device integration. These hooks enable modern web applications to access native device features.

## Location Services

### [useGeolocation](./use-geolocation)
Access device location with permission management.

```tsx
import { useGeolocation } from '@acrobi/ui';

function LocationComponent() {
  const { coordinates, getCurrentPosition, error } = useGeolocation();
  
  return (
    <div>
      {coordinates ? (
        <p>Location: {coordinates.latitude}, {coordinates.longitude}</p>
      ) : (
        <button onClick={getCurrentPosition}>Get Location</button>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

**Features:**
- Real-time position tracking
- Permission management
- Error handling
- High accuracy mode
- Background location updates

## Camera & Media

### [useCamera](./use-camera)
Access device camera for photo and video capture.

```tsx
import { useCamera } from '@acrobi/ui';

function CameraComponent() {
  const { stream, startCamera, capturePhoto, error } = useCamera();
  
  return (
    <div>
      <video ref={stream} autoPlay />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={capturePhoto}>Take Photo</button>
    </div>
  );
}
```

**Features:**
- Front/back camera selection
- Photo capture
- Video recording
- Stream management
- Permission handling

### [useBarcodeScanner](./use-barcode-scanner)
Scan QR codes and barcodes using device camera.

```tsx
import { useBarcodeScanner } from '@acrobi/ui';

function ScannerComponent() {
  const { isScanning, lastResult, startScanning, stopScanning } = useBarcodeScanner({
    onResult: (result) => {
      console.log('Scanned:', result.text);
    }
  });
  
  return (
    <div>
      <button onClick={isScanning ? stopScanning : startScanning}>
        {isScanning ? 'Stop Scanning' : 'Start Scanning'}
      </button>
      {lastResult && <p>Last scan: {lastResult.text}</p>}
    </div>
  );
}
```

**Features:**
- QR code detection
- Barcode scanning (UPC, EAN, Code 128)
- Real-time scanning
- Result callbacks
- Multiple format support

## Platform Detection

### [usePlatform](./use-platform)
Detect device capabilities and platform information.

```tsx
import { usePlatform } from '@acrobi/ui';

function PlatformComponent() {
  const { 
    isMobile, 
    isIOS, 
    isAndroid, 
    isPWA, 
    canInstall,
    installPrompt 
  } = usePlatform();
  
  return (
    <div>
      <p>Mobile: {isMobile ? 'Yes' : 'No'}</p>
      <p>Platform: {isIOS ? 'iOS' : isAndroid ? 'Android' : 'Desktop'}</p>
      {canInstall && (
        <button onClick={installPrompt}>Install App</button>
      )}
    </div>
  );
}
```

**Features:**
- Device type detection
- Operating system identification
- PWA installation prompts
- Feature capability detection
- Responsive breakpoint helpers

### [useFeatureDetection](./use-feature-detection)
Detect browser and device feature support.

```tsx
import { useFeatureDetection } from '@acrobi/ui';

function FeatureComponent() {
  const features = useFeatureDetection([
    'geolocation',
    'camera',
    'notifications',
    'serviceWorker',
    'webShare'
  ]);
  
  return (
    <div>
      {features.geolocation && <LocationButton />}
      {features.camera && <CameraButton />}
      {features.notifications && <NotificationButton />}
    </div>
  );
}
```

**Features:**
- Progressive enhancement
- Feature-based rendering
- Graceful degradation
- Performance optimization
- Accessibility considerations

## Permission Management

### GrantPermissions Component
Unified permission request interface.

```tsx
import { GrantPermissions } from '@acrobi/ui';

function App() {
  const permissions = [
    {
      key: 'location',
      name: 'Location Services',
      description: 'Find nearby stores and services',
      required: false
    },
    {
      key: 'camera',
      name: 'Camera Access',
      description: 'Scan QR codes and take photos',
      required: true
    }
  ];

  return (
    <GrantPermissions
      permissions={permissions}
      showIndividualControls
      onGrantAll={(granted) => console.log('Permissions:', granted)}
    />
  );
}
```

## PWA Integration

### Service Worker Management

```tsx
import { useServiceWorker } from '@acrobi/ui';

function PWAComponent() {
  const { 
    isSupported, 
    isRegistered, 
    register, 
    update,
    showUpdatePrompt 
  } = useServiceWorker();
  
  return (
    <div>
      {isSupported && !isRegistered && (
        <button onClick={register}>Enable Offline Mode</button>
      )}
      {showUpdatePrompt && (
        <button onClick={update}>Update Available</button>
      )}
    </div>
  );
}
```

### Push Notifications

```tsx
import { useNotifications } from '@acrobi/ui';

function NotificationComponent() {
  const { 
    permission, 
    requestPermission, 
    sendNotification,
    subscribe 
  } = useNotifications();
  
  const handleNotify = () => {
    sendNotification('Hello!', {
      body: 'This is a test notification',
      icon: '/icon-192.png'
    });
  };
  
  return (
    <div>
      {permission === 'default' && (
        <button onClick={requestPermission}>
          Enable Notifications
        </button>
      )}
      {permission === 'granted' && (
        <button onClick={handleNotify}>
          Send Test Notification
        </button>
      )}
    </div>
  );
}
```

## Best Practices

### Permission Handling
- Always check permissions before using features
- Provide clear explanations for why permissions are needed
- Gracefully handle permission denials
- Offer alternative flows for unsupported features

### Performance
- Use feature detection to avoid loading unnecessary code
- Implement lazy loading for heavy features
- Cache results when appropriate
- Clean up resources (streams, listeners) on unmount

### Accessibility
- Provide keyboard alternatives for touch interactions
- Include proper ARIA labels for dynamic content
- Support screen readers with status announcements
- Ensure features work without JavaScript when possible

### Error Handling
- Always handle permission errors gracefully
- Provide meaningful error messages to users
- Implement retry mechanisms for transient failures
- Log errors for debugging while respecting privacy

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Geolocation | ✅ | ✅ | ✅ | ✅ |
| Camera API | ✅ | ✅ | ✅ | ✅ |
| Barcode Detection | ✅ | ❌ | ❌ | ✅ |
| Service Workers | ✅ | ✅ | ✅ | ✅ |
| Push Notifications | ✅ | ✅ | ✅ | ✅ |
| Web Share API | ✅ | ❌ | ✅ | ✅ |

## Security Considerations

- All PWA features require HTTPS in production
- Permissions are origin-specific
- Camera/microphone access shows browser indicators
- Location data should be handled with care
- Implement proper content security policies

## Next Steps

- [View hook examples](../../examples/pwa)
- [Learn about modules](../modules/)
- [Read the PWA guide](../../guides/pwa-guide)