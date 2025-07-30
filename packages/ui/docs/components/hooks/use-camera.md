# useCamera

React hook for accessing device camera with photo capture and video recording capabilities.

## Overview

The `useCamera` hook provides a comprehensive interface for working with the device camera. It handles permissions, stream management, photo capture, and video recording with proper cleanup and error handling.

## Basic Usage

```tsx
import { useCamera } from '@acrobi/ui';

function CameraComponent() {
  const { 
    stream, 
    startCamera, 
    stopCamera, 
    capturePhoto, 
    isActive, 
    error 
  } = useCamera();

  return (
    <div className="space-y-4">
      <div className="relative">
        <video 
          ref={stream} 
          autoPlay 
          playsInline 
          muted
          className="w-full max-w-md rounded-lg"
        />
        {!isActive && (
          <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Camera not active</p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button 
          onClick={startCamera}
          disabled={isActive}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Start Camera
        </button>
        
        <button 
          onClick={stopCamera}
          disabled={!isActive}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Stop Camera
        </button>
        
        <button 
          onClick={capturePhoto}
          disabled={!isActive}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          Take Photo
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 rounded">
          <p className="text-red-700">Error: {error.message}</p>
        </div>
      )}
    </div>
  );
}
```

## API Reference

### Return Value

```tsx
interface UseCameraReturn {
  stream: RefObject<HTMLVideoElement>;
  startCamera: (constraints?: MediaStreamConstraints) => Promise<void>;
  stopCamera: () => void;
  capturePhoto: () => Promise<string | null>;
  startRecording: () => void;
  stopRecording: () => Promise<Blob | null>;
  switchCamera: () => Promise<void>;
  isActive: boolean;
  isRecording: boolean;
  error: Error | null;
  permission: 'granted' | 'denied' | 'prompt' | 'unknown';
  devices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo | null;
}
```

### Options

```tsx
interface UseCameraOptions {
  facingMode?: 'user' | 'environment';
  width?: number;
  height?: number;
  audio?: boolean;
  autoStart?: boolean;
  onPhoto?: (dataUrl: string) => void;
  onRecording?: (blob: Blob) => void;
  onError?: (error: Error) => void;
}
```

## Examples

### Photo Capture

```tsx
function PhotoCapture() {
  const { 
    stream, 
    startCamera, 
    capturePhoto, 
    isActive 
  } = useCamera({
    facingMode: 'environment', // Use back camera
    width: 1920,
    height: 1080
  });

  const [photos, setPhotos] = useState([]);

  const handleCapture = async () => {
    const photoDataUrl = await capturePhoto();
    if (photoDataUrl) {
      setPhotos(prev => [...prev, {
        id: Date.now(),
        dataUrl: photoDataUrl,
        timestamp: new Date()
      }]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <video 
          ref={stream} 
          autoPlay 
          playsInline 
          muted
          className="w-full max-w-lg rounded-lg shadow-lg"
        />
        
        {isActive && (
          <button
            onClick={handleCapture}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-gray-300 hover:border-gray-400 transition-colors"
          >
            <div className="w-full h-full bg-red-500 rounded-full"></div>
          </button>
        )}
      </div>

      {!isActive && (
        <button 
          onClick={startCamera}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Start Camera
        </button>
      )}

      {photos.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Captured Photos ({photos.length})</h3>
          <div className="grid grid-cols-2 gap-2">
            {photos.map(photo => (
              <div key={photo.id} className="relative">
                <img 
                  src={photo.dataUrl} 
                  alt="Captured photo"
                  className="w-full h-32 object-cover rounded"
                />
                <div className="absolute bottom-1 left-1 text-xs text-white bg-black bg-opacity-50 px-1 rounded">
                  {photo.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Video Recording

```tsx
function VideoRecorder() {
  const { 
    stream, 
    startCamera, 
    startRecording, 
    stopRecording, 
    isActive, 
    isRecording 
  } = useCamera({
    audio: true, // Include audio in recording
    facingMode: 'user'
  });

  const [recordings, setRecordings] = useState([]);
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = async () => {
    const blob = await stopRecording();
    if (blob) {
      const url = URL.createObjectURL(blob);
      setRecordings(prev => [...prev, {
        id: Date.now(),
        url,
        blob,
        duration: recordingTime,
        timestamp: new Date()
      }]);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <video 
          ref={stream} 
          autoPlay 
          playsInline 
          muted
          className="w-full max-w-lg rounded-lg"
        />
        
        {isRecording && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-mono">{formatTime(recordingTime)}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        {!isActive && (
          <button 
            onClick={startCamera}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Start Camera
          </button>
        )}
        
        {isActive && !isRecording && (
          <button 
            onClick={handleStartRecording}
            className="px-6 py-3 bg-red-500 text-white rounded-full"
          >
            Start Recording
          </button>
        )}
        
        {isRecording && (
          <button 
            onClick={handleStopRecording}
            className="px-6 py-3 bg-gray-500 text-white rounded-full"
          >
            Stop Recording
          </button>
        )}
      </div>

      {recordings.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Recordings ({recordings.length})</h3>
          <div className="space-y-2">
            {recordings.map(recording => (
              <div key={recording.id} className="p-3 border rounded">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    {recording.timestamp.toLocaleString()}
                  </span>
                  <span className="text-sm font-mono">
                    {formatTime(recording.duration)}
                  </span>
                </div>
                <video 
                  src={recording.url} 
                  controls 
                  className="w-full max-w-xs rounded"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Camera Switching

```tsx
function CameraSwitcher() {
  const { 
    stream, 
    startCamera, 
    switchCamera, 
    devices, 
    currentDevice, 
    isActive 
  } = useCamera();

  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  const handleDeviceChange = async (deviceId) => {
    setSelectedDeviceId(deviceId);
    if (isActive) {
      await startCamera({
        video: { deviceId: { exact: deviceId } }
      });
    }
  };

  return (
    <div className="space-y-4">
      <video 
        ref={stream} 
        autoPlay 
        playsInline 
        muted
        className="w-full max-w-md rounded-lg"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Select Camera:
        </label>
        <select 
          value={selectedDeviceId}
          onChange={(e) => handleDeviceChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Default Camera</option>
          {devices
            .filter(device => device.kind === 'videoinput')
            .map(device => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId.slice(0, 8)}`}
              </option>
            ))
          }
        </select>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={startCamera}
          disabled={isActive}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Start Camera
        </button>
        
        <button 
          onClick={switchCamera}
          disabled={!isActive}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          Switch Camera
        </button>
      </div>

      {currentDevice && (
        <div className="p-3 bg-gray-50 rounded">
          <p className="text-sm">
            <strong>Current Camera:</strong> {currentDevice.label || 'Unknown Camera'}
          </p>
        </div>
      )}
    </div>
  );
}
```

### Permission Handling

```tsx
function CameraPermissions() {
  const { 
    startCamera, 
    permission, 
    error, 
    isActive 
  } = useCamera();

  const getPermissionStatus = () => {
    switch (permission) {
      case 'granted':
        return { message: 'Camera access granted', color: 'green' };
      case 'denied':
        return { message: 'Camera access denied', color: 'red' };
      case 'prompt':
        return { message: 'Camera permission required', color: 'yellow' };
      default:
        return { message: 'Checking camera permissions...', color: 'gray' };
    }
  };

  const { message, color } = getPermissionStatus();

  return (
    <div className="space-y-4">
      <div className={`p-3 bg-${color}-50 rounded`}>
        <p className={`text-${color}-700`}>{message}</p>
      </div>

      {permission === 'denied' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="font-semibold text-red-700">Camera Access Denied</h3>
          <p className="text-red-600 mt-2">
            To use camera features, please:
          </p>
          <ol className="list-decimal list-inside mt-2 text-red-600">
            <li>Click the camera icon in your browser's address bar</li>
            <li>Select "Allow" for camera access</li>
            <li>Refresh the page if needed</li>
          </ol>
        </div>
      )}

      {permission !== 'denied' && (
        <button 
          onClick={startCamera}
          disabled={isActive}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {isActive ? 'Camera Active' : 'Start Camera'}
        </button>
      )}

      {error && (
        <div className="p-4 bg-red-50 rounded">
          <p className="text-red-700">Error: {error.message}</p>
        </div>
      )}
    </div>
  );
}
```

## Error Handling

Common camera errors and solutions:

```tsx
function CameraErrorHandling() {
  const { startCamera, error } = useCamera({
    onError: (err) => {
      console.error('Camera error:', err);
    }
  });

  const getErrorInfo = (error) => {
    if (!error) return null;

    if (error.name === 'NotAllowedError') {
      return {
        title: 'Camera Access Denied',
        message: 'Please allow camera access to continue.',
        solution: 'Check browser permissions and try again.'
      };
    }

    if (error.name === 'NotFoundError') {
      return {
        title: 'No Camera Found',
        message: 'No camera device was detected.',
        solution: 'Connect a camera and refresh the page.'
      };
    }

    if (error.name === 'NotReadableError') {
      return {
        title: 'Camera In Use',
        message: 'Camera is already being used by another application.',
        solution: 'Close other apps using the camera and try again.'
      };
    }

    if (error.name === 'OverconstrainedError') {
      return {
        title: 'Camera Constraints Not Supported',
        message: 'The requested camera settings are not supported.',
        solution: 'Try with different camera settings.'
      };
    }

    return {
      title: 'Camera Error',
      message: error.message || 'An unknown camera error occurred.',
      solution: 'Please try again or contact support.'
    };
  };

  const errorInfo = getErrorInfo(error);

  return (
    <div className="space-y-4">
      <button 
        onClick={startCamera}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Start Camera
      </button>

      {errorInfo && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="font-semibold text-red-700">{errorInfo.title}</h3>
          <p className="text-red-600 mt-1">{errorInfo.message}</p>
          <p className="text-red-500 text-sm mt-2">{errorInfo.solution}</p>
        </div>
      )}
    </div>
  );
}
```

## Browser Support

Camera API support varies by browser:

- ✅ Chrome 53+
- ✅ Firefox 36+
- ✅ Safari 11+
- ✅ Edge 12+
- ✅ iOS Safari 11+
- ✅ Android Chrome 53+

## Security Requirements

- **HTTPS Required**: Camera access only works on secure origins (HTTPS)
- **User Permission**: Always requires explicit user permission
- **Privacy Indicators**: Browsers show camera usage indicators
- **Secure Context**: Must be served from a secure context

## Best Practices

1. **Always handle permissions** - Check and request camera access gracefully
2. **Provide fallbacks** - Allow file upload as alternative
3. **Clean up resources** - Stop camera streams when not needed
4. **Handle errors gracefully** - Provide clear error messages
5. **Respect privacy** - Only access camera when necessary
6. **Optimize for mobile** - Consider device orientation and performance
7. **Test across devices** - Different cameras have different capabilities

## Related Hooks

- [useGeolocation](./use-geolocation) - Location access hook
- [useBarcodeScanner](./use-barcode-scanner) - Barcode scanning hook
- [usePlatform](./use-platform) - Platform detection hook