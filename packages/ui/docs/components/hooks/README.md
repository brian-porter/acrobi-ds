# PWA Hooks

PWA (Progressive Web App) hooks provide React hooks for accessing modern device capabilities. These hooks handle permissions, error states, and provide clean interfaces for complex browser APIs.

## 🎯 Overview

The PWA hooks layer contains **6 hooks** for device integration and advanced functionality:

- **useKeyboard** - Advanced keyboard management and shortcuts (Epic 40)
- **useGeolocation** - Location services and positioning
- **useCamera** - Camera access and photo capture
- **useBarcodeScanner** - QR code and barcode scanning
- **useBluetooth** - Bluetooth device connectivity
- **useWebBluetooth** - Web Bluetooth API integration

## ⌨️ Keyboard Management

### [useKeyboard](./use-keyboard.md)
React hook for advanced keyboard management with shortcut handling, key combinations, and cross-platform compatibility.

```tsx
import { useKeyboard } from '@acrobi/ui';

function KeyboardApp() {
  const { 
    pressedKeys, 
    lastKeyPressed, 
    addShortcut,
    isMac,
    modifierKey 
  } = useKeyboard({
    shortcuts: [
      {
        keys: 'Escape',
        callback: () => closeModal(),
        description: 'Close modal'
      },
      {
        keys: '$mod+s',
        callback: () => save(),
        preventDefault: true,
        description: 'Save document'
      }
    ]
  });

  return (
    <div>
      <p>Platform: {isMac ? 'Mac' : 'PC'}</p>
      <p>Modifier: {modifierKey}</p>
      <p>Last Key: {lastKeyPressed}</p>
      <p>Active Keys: {Array.from(pressedKeys).join(', ')}</p>
    </div>
  );
}
```

**Features:**
- Single keys and key combinations
- Platform-agnostic shortcuts ($mod)
- Key sequence detection
- Dynamic shortcut management
- Cross-platform compatibility
- Accessibility integration
- Real-time key tracking

**Use cases**: Keyboard shortcuts, hotkeys, accessibility navigation, gaming controls
**Tags**: hook, pwa, keyboard, shortcuts, accessibility, epic-40

### API Reference

```tsx
interface KeyboardShortcut {
  keys: string | string[];
  callback: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  enabled?: boolean;
  global?: boolean;
  description?: string;
}

interface UseKeyboardReturn {
  addShortcut: (shortcut: KeyboardShortcut) => string;
  removeShortcut: (id: string) => void;
  clearShortcuts: () => void;
  pressedKeys: Set<string>;
  lastKeyPressed: string | null;
  isSequenceActive: boolean;
  isKeyPressed: (key: string) => boolean;
  isKeyComboPressed: (combo: string) => boolean;
  isMac: boolean;
  modifierKey: 'Cmd' | 'Ctrl';
  isSupported: boolean;
}

function useKeyboard(options?: KeyboardOptions): UseKeyboardReturn;
```

## 📍 Location Services

### [useGeolocation](./use-geolocation.md)
React hook for accessing user's current location with permissions handling.

```tsx
import { useGeolocation } from '@acrobi/ui';

function LocationComponent() {
  const { coordinates, isLoading, error, getCurrentPosition } = useGeolocation();

  if (isLoading) return <div>Getting your location...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {coordinates ? (
        <p>
          Latitude: {coordinates.latitude}<br/>
          Longitude: {coordinates.longitude}<br/>
          Accuracy: {coordinates.accuracy}m
        </p>
      ) : (
        <button onClick={getCurrentPosition}>
          Get Current Location
        </button>
      )}
    </div>
  );
}
```

**Features:**
- Automatic permission handling
- Error state management
- Loading states
- Position accuracy information
- Watch position capability
- Timeout and maximum age options

**Use cases**: Store locators, delivery apps, location-based services
**Tags**: hook, pwa, location, geolocation

### API Reference

```tsx
interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watch?: boolean;
}

interface UseGeolocationReturn {
  coordinates: GeolocationCoordinates | null;
  isLoading: boolean;
  error: Error | null;
  getCurrentPosition: () => void;
  watchPosition: () => void;
  clearWatch: () => void;
  isSupported: boolean;
}

function useGeolocation(options?: UseGeolocationOptions): UseGeolocationReturn;
```

## 📷 Camera Access

### [useCamera](./use-camera.md)
React hook for accessing device cameras with photo capture capabilities.

```tsx
import { useCamera } from '@acrobi/ui';

function CameraComponent() {
  const { 
    stream, 
    isStreaming, 
    error,
    startCamera, 
    stopCamera,
    capturePhoto,
    switchCamera
  } = useCamera();

  return (
    <div>
      <video 
        ref={stream ? (video) => {
          if (video) video.srcObject = stream;
        } : undefined}
        autoPlay
        playsInline
        style={{ width: '100%', maxWidth: '400px' }}
      />
      
      <div>
        {!isStreaming ? (
          <button onClick={startCamera}>Start Camera</button>
        ) : (
          <>
            <button onClick={capturePhoto}>Take Photo</button>
            <button onClick={switchCamera}>Switch Camera</button>
            <button onClick={stopCamera}>Stop Camera</button>
          </>
        )}
      </div>
      
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

**Features:**
- Front/back camera switching
- Photo capture with blob return
- Stream management
- Permission handling
- Error state management
- Camera constraints configuration

**Use cases**: Profile photos, document scanning, AR experiences
**Tags**: hook, pwa, camera, photo

### API Reference

```tsx
interface UseCameraOptions {
  facingMode?: 'user' | 'environment';
  width?: number;
  height?: number;
  audio?: boolean;
}

interface UseCameraReturn {
  stream: MediaStream | null;
  isStreaming: boolean;
  error: Error | null;
  startCamera: (options?: UseCameraOptions) => Promise<void>;
  stopCamera: () => void;
  capturePhoto: () => Promise<Blob | null>;
  switchCamera: () => Promise<void>;
  isSupported: boolean;
}

function useCamera(options?: UseCameraOptions): UseCameraReturn;
```

## 🔍 Barcode Scanning

### [useBarcodeScanner](./use-barcode-scanner.md)
React hook for scanning QR codes and barcodes using device cameras.

```tsx
import { useBarcodeScanner } from '@acrobi/ui';

function BarcodeScannerComponent() {
  const { 
    isScanning, 
    lastResult, 
    error,
    startScanning, 
    stopScanning 
  } = useBarcodeScanner({
    onResult: (result) => {
      console.log('Scanned:', result.text);
      // Handle the scanned result
    }
  });

  return (
    <div>
      <div>
        {!isScanning ? (
          <button onClick={startScanning}>Start Scanning</button>
        ) : (
          <button onClick={stopScanning}>Stop Scanning</button>
        )}
      </div>
      
      {lastResult && (
        <div>
          <h3>Last Scanned:</h3>
          <p>Type: {lastResult.format}</p>
          <p>Text: {lastResult.text}</p>
        </div>
      )}
      
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

**Features:**
- QR code and barcode detection
- Multiple format support
- Real-time scanning
- Result callbacks
- Camera integration
- Error handling

**Use cases**: Inventory management, ticket scanning, contact sharing
**Tags**: hook, pwa, barcode, qr-code, scanner

### API Reference

```tsx
interface BarcodeScanResult {
  text: string;
  format: string;
  timestamp: number;
}

interface UseBarcodeScannerOptions {
  onResult?: (result: BarcodeScanResult) => void;
  continuous?: boolean;
  facingMode?: 'user' | 'environment';
}

interface UseBarcodeScannerReturn {
  isScanning: boolean;
  lastResult: BarcodeScanResult | null;
  error: Error | null;
  startScanning: () => Promise<void>;
  stopScanning: () => void;
  isSupported: boolean;
}

function useBarcodeScanner(options?: UseBarcodeScannerOptions): UseBarcodeScannerReturn;
```

## 🎨 Usage Patterns

### Permission Management
All PWA hooks handle permissions gracefully:

```tsx
function PWAFeature() {
  const { coordinates, error, getCurrentPosition, isSupported } = useGeolocation();
  
  // Check for browser support
  if (!isSupported) {
    return <div>Geolocation is not supported in this browser.</div>;
  }
  
  // Handle permission errors
  if (error?.message.includes('denied')) {
    return (
      <div>
        <p>Location access was denied. Please enable location permissions.</p>
        <button onClick={() => window.location.reload()}>
          Refresh to try again
        </button>
      </div>
    );
  }
  
  return <LocationDisplay coordinates={coordinates} />;
}
```

### Combined Hook Usage
Hooks can be combined for complex PWA features:

```tsx
function DocumentScanner() {
  const { stream, startCamera, capturePhoto } = useCamera();
  const { isScanning, startScanning, lastResult } = useBarcodeScanner({
    onResult: (result) => {
      // Automatically capture photo when barcode is detected
      capturePhoto().then(blob => {
        // Save document with barcode data
        saveDocument(blob, result.text);
      });
    }
  });
  
  return (
    <div>
      <button onClick={() => {
        startCamera();
        startScanning();
      }}>
        Start Document Scanning
      </button>
      {/* Camera and scanning UI */}
    </div>
  );
}
```

### Error Handling Pattern
Consistent error handling across all hooks:

```tsx
function PWAErrorBoundary({ children, hookError }) {
  if (hookError) {
    switch (hookError.name) {
      case 'NotAllowedError':
        return <PermissionDenied />;
      case 'NotFoundError':
        return <DeviceNotFound />;
      case 'NotSupportedError':
        return <FeatureNotSupported />;
      default:
        return <GenericError error={hookError} />;
    }
  }
  
  return children;
}
```

## 🔧 Advanced Configuration

### Geolocation Options
```tsx
const { coordinates } = useGeolocation({
  enableHighAccuracy: true,  // Use GPS when available
  timeout: 10000,           // Wait up to 10 seconds
  maximumAge: 300000,       // Cache position for 5 minutes
  watch: true               // Continuously track position
});
```

### Camera Constraints
```tsx
const { startCamera } = useCamera();

// Start with specific constraints
startCamera({
  facingMode: 'environment',  // Use back camera
  width: 1920,               // Preferred width
  height: 1080,              // Preferred height
  audio: false               // Video only
});
```

### Scanner Configuration
```tsx
const { startScanning } = useBarcodeScanner({
  continuous: true,          // Keep scanning after first result
  facingMode: 'environment', // Use back camera
  onResult: (result) => {
    // Handle each scanned result
    if (result.format === 'QR_CODE') {
      handleQRCode(result.text);
    }
  }
});
```

## 🛡️ Security Considerations

### HTTPS Requirement
All PWA hooks require HTTPS in production:

```tsx
function PWAWrapper({ children }) {
  const isSecure = window.location.protocol === 'https:' || 
                   window.location.hostname === 'localhost';
  
  if (!isSecure) {
    return (
      <div>
        <h2>HTTPS Required</h2>
        <p>PWA features require a secure connection (HTTPS).</p>
      </div>
    );
  }
  
  return children;
}
```

### Permission Prompts
Handle permission prompts user-friendly:

```tsx
function LocationPrompt() {
  const [hasPrompted, setHasPrompted] = useState(false);
  const { coordinates, getCurrentPosition } = useGeolocation();
  
  const handleLocationRequest = () => {
    setHasPrompted(true);
    getCurrentPosition();
  };
  
  if (!hasPrompted) {
    return (
      <div>
        <h3>Enable Location Services</h3>
        <p>We need your location to find nearby stores.</p>
        <button onClick={handleLocationRequest}>
          Enable Location
        </button>
      </div>
    );
  }
  
  return <LocationDisplay coordinates={coordinates} />;
}
```

## ♿ Accessibility Features

### Screen Reader Support
PWA hooks provide accessible feedback:

```tsx
function AccessibleScanner() {
  const { isScanning, lastResult, startScanning } = useBarcodeScanner();
  
  return (
    <div>
      <button 
        onClick={startScanning}
        aria-label={isScanning ? "Stop barcode scanning" : "Start barcode scanning"}
      >
        {isScanning ? "Stop Scanning" : "Start Scanning"}
      </button>
      
      {lastResult && (
        <div role="status" aria-live="polite">
          Scanned: {lastResult.text}
        </div>
      )}
    </div>
  );
}
```

### Keyboard Navigation
Ensure PWA features are keyboard accessible:

```tsx
function KeyboardAccessibleCamera() {
  const { isStreaming, startCamera, capturePhoto } = useCamera();
  
  return (
    <div>
      <button 
        onKeyDown={(e) => e.key === 'Enter' && startCamera()}
        onClick={startCamera}
      >
        Start Camera
      </button>
      
      {isStreaming && (
        <button 
          onKeyDown={(e) => e.key === ' ' && capturePhoto()}
          onClick={capturePhoto}
        >
          Capture Photo (Space)
        </button>
      )}
    </div>
  );
}
```

## 🔗 Related Resources

- [GrantPermissions Structure](../structures/grant-permissions.md) - UI for permission management
- [PWA Best Practices Guide](../../guides/pwa.md) - Implementation recommendations
- [Browser Support Guide](../../guides/browser-support.md) - Compatibility information
- [Security Guidelines](../../guides/security.md) - Safe PWA development

## 📱 Browser Support

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| **Geolocation** | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Camera Access** | ✅ Full | ✅ iOS 11+ | ✅ 63+ | ✅ Full |
| **Barcode Scanner** | ✅ 83+ | ⚠️ Polyfill | ⚠️ Polyfill | ✅ 83+ |

**Note**: Barcode scanning uses the BarcodeDetector API where available, with fallback to canvas-based detection.

---

*Documentation auto-generated from registry v1.0.0*