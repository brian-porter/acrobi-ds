# @acrobi/aae-hooks

Advanced Acrobi Experience (AAE) hooks - 50+ React hooks for accessing modern web platform APIs including camera, GPS, Bluetooth, NFC, WebAuthn, and more.

## Installation

```bash
npm install @acrobi/aae-hooks
# or
pnpm add @acrobi/aae-hooks
# or
yarn add @acrobi/aae-hooks
```

## Usage

```tsx
import { useGeolocation, useCamera, useBluetooth } from '@acrobi/aae-hooks';

function MyComponent() {
  const { position, error } = useGeolocation();
  const { capturePhoto } = useCamera();
  const { scan, devices } = useBluetooth();

  return (
    <div>
      <p>Location: {position?.coords.latitude}, {position?.coords.longitude}</p>
      <button onClick={capturePhoto}>Take Photo</button>
      <button onClick={scan}>Scan Bluetooth</button>
    </div>
  );
}
```

## Available Hooks

### Media Capture (6 hooks)
- **useCamera** - Access device camera
- **useAudioRecorder** - Record audio
- **useVideoRecorder** - Record video
- **useImageLoader** - Load and process images
- **useScreenCapture** - Capture screen content
- **useBarcodeScanner** - Scan barcodes/QR codes

### Geolocation & Sensors (5 hooks)
- **useGeolocation** - GPS location tracking
- **useDeviceMotion** - Accelerometer and gyroscope
- **useDeviceOrientation** - Device orientation
- **useCompassHeading** - Compass direction
- **useShake** - Shake gesture detection

### Connectivity (4 hooks)
- **useBluetooth** - Bluetooth device communication
- **useWebBluetooth** - Web Bluetooth API
- **useNFC** - Near Field Communication
- **useNetwork** - Network information and status

### Authentication & Security (2 hooks)
- **useWebAuthn** - WebAuthn/passkey authentication
- **usePushNotifications** - Push notification management

### Input Methods (3 hooks)
- **useKeyboard** - Keyboard shortcuts
- **useKeyboardAAE** - On-screen keyboard detection
- **useVisualViewport** - Visual viewport for mobile keyboards

### File & Storage (5 hooks)
- **useFilePicker** - File picker dialog
- **useFileSystem** - File System Access API
- **useLocalStorage** - Local storage with React state
- **useCachedApi** - Offline-first API caching
- **usePersistentForm** - Form state persistence

### Communication (9 hooks)
- **useSocket** - Socket.IO connection
- **useSocketEvent** - Listen to socket events
- **useSocketEmit** - Emit socket events
- **useSocketStatus** - Socket connection status
- **useSocketEvents** - Multiple event listeners
- **useSocketRoom** - Socket.IO room management
- **useSocketMessages** - Message queue management
- **useSocketHealth** - Connection health monitoring
- **useWebShare** - Native OS sharing

### Voice & Audio (2 hooks)
- **useTTS** - Text-to-speech synthesis
- **useSpeechRecognition** - Speech-to-text recognition

### Display & Screen (4 hooks)
- **useAAEDisplay** - AAE display mode detection
- **usePWADisplay** - PWA display mode
- **useScreenOrientation** - Screen orientation management
- **useWakeLock** - Prevent screen sleep

### User Interaction (2 hooks)
- **useHaptics** - Haptic feedback/vibration
- **useContactPicker** - Privacy-preserving contact access

### Payment (1 hook)
- **usePaymentRequest** - Payment Request API

### Background APIs (3 hooks)
- **useBackgroundSync** - Background synchronization
- **useBackgroundFetch** - Large file background downloads
- **usePeriodicSync** - Periodic background sync

### Platform Detection (3 hooks)
- **usePlatform** - Platform/OS detection
- **useNative** - Capacitor/native platform detection
- **useFeatureDetection** - Feature availability checking
- **useWindowManager** - Multi-window management

## Feature Detection

The package includes automatic feature detection:

```tsx
import { useFeatureDetection } from '@acrobi/aae-hooks';

function App() {
  const { supported, error } = useFeatureDetection('bluetooth');

  if (!supported) {
    return <p>Bluetooth not supported</p>;
  }

  return <BluetoothComponent />;
}
```

## Acrobi Framework Integration

This package is an Acrobi Framework extension:

```typescript
import { activate } from '@acrobi/aae-hooks';

// Framework will call activate automatically
await activate(context);
```

### Hooks Available
- `aae:checkFeature` - Check if a platform feature is available
- `aae:featuresDetected` - Emitted when feature detection completes
- `aae:requestPermission` - Request platform permissions

## TypeScript Support

All hooks include full TypeScript definitions with types for:
- Hook options
- Return values
- State objects
- Error types

## Browser Support

Most hooks require modern browsers with support for the corresponding Web APIs. Feature detection is built-in to gracefully handle unsupported browsers.

## License

MIT © Acrobi
