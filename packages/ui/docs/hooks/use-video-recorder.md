# useVideoRecorder Hook

The `useVideoRecorder` hook provides comprehensive video recording capabilities for Progressive Web Applications using the MediaRecorder API with advanced camera management and real-time preview features.

## Features

- 📹 **Full Video Recording**: Complete MediaRecorder API integration with video streams
- 📱 **Camera Management**: Front/back camera switching, device enumeration, and selection
- 🎛️ **Recording Controls**: Start, stop, pause, resume, and cancel functionality
- 🖥️ **Real-time Preview**: Live video preview with overlay controls
- 📐 **Quality Control**: Resolution, frame rate, and bitrate management
- 🖼️ **Frame Capture**: Capture frames and generate thumbnails
- 🔧 **Format Support**: Multiple video formats (WebM, MP4, AVI)
- 🔒 **Permission Handling**: Comprehensive camera and microphone permission management
- ⌨️ **Keyboard Integration**: Built-in keyboard shortcuts (Epic 40)
- 🌐 **Network Awareness**: Integration with network status (Epic 41)

## Installation

```bash
npm install @acrobi/ui
```

## Basic Usage

```tsx
import React from 'react';
import { useVideoRecorder } from '@acrobi/ui';

function VideoRecorderComponent() {
  const {
    state,
    error,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    previewRef,
    videoUrl,
    downloadRecording
  } = useVideoRecorder();

  return (
    <div>
      {/* Live Preview */}
      <video
        ref={previewRef}
        autoPlay
        muted
        playsInline
        style={{ width: 400, height: 300 }}
      />

      {/* Recording Controls */}
      <div>
        <button onClick={startRecording} disabled={state.isRecording}>
          Start Recording
        </button>
        <button onClick={pauseRecording} disabled={!state.isRecording || state.isPaused}>
          Pause
        </button>
        <button onClick={resumeRecording} disabled={!state.isPaused}>
          Resume
        </button>
        <button onClick={stopRecording} disabled={!state.isRecording}>
          Stop Recording
        </button>
      </div>

      {/* Status */}
      <div>
        <p>Recording: {state.isRecording ? 'Yes' : 'No'}</p>
        <p>Duration: {Math.floor(state.duration / 60)}:{(state.duration % 60).toString().padStart(2, '0')}</p>
        <p>Size: {(state.recordingSize / 1024 / 1024).toFixed(2)} MB</p>
      </div>

      {/* Recorded Video */}
      {videoUrl && (
        <div>
          <video src={videoUrl} controls style={{ width: 400 }} />
          <button onClick={() => downloadRecording('my-video.webm')}>
            Download
          </button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div style={{ color: 'red' }}>
          Error: {error.message}
        </div>
      )}
    </div>
  );
}
```

## Advanced Usage

### Custom Video Quality

```tsx
import { useVideoRecorder } from '@acrobi/ui';

function HighQualityRecorder() {
  const recorder = useVideoRecorder({
    width: 1920,
    height: 1080,
    frameRate: 60,
    videoBitsPerSecond: 5000000,
    mimeType: 'video/webm;codecs=vp9,opus'
  });

  return (
    <div>
      <video ref={recorder.previewRef} autoPlay muted />
      
      {/* Quality Controls */}
      <div>
        <button onClick={() => recorder.setQuality('low')}>Low Quality</button>
        <button onClick={() => recorder.setQuality('medium')}>Medium Quality</button>
        <button onClick={() => recorder.setQuality('high')}>High Quality</button>
        <button onClick={() => recorder.setQuality('ultra')}>Ultra Quality</button>
      </div>
      
      {/* Resolution Controls */}
      <div>
        <button onClick={() => recorder.setResolution(1280, 720)}>720p</button>
        <button onClick={() => recorder.setResolution(1920, 1080)}>1080p</button>
        <button onClick={() => recorder.setResolution(3840, 2160)}>4K</button>
      </div>
    </div>
  );
}
```

### Camera Management

```tsx
import { useVideoRecorder } from '@acrobi/ui';
import { useState, useEffect } from 'react';

function CameraManagerComponent() {
  const {
    getAvailableDevices,
    switchCamera,
    switchToFrontCamera,
    switchToBackCamera,
    previewRef
  } = useVideoRecorder();

  const [devices, setDevices] = useState([]);

  useEffect(() => {
    getAvailableDevices().then(setDevices);
  }, [getAvailableDevices]);

  return (
    <div>
      <video ref={previewRef} autoPlay muted />
      
      {/* Camera Selection */}
      <select onChange={(e) => switchCamera(e.target.value)}>
        <option value="">Select Camera</option>
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
      
      {/* Quick Camera Switch */}
      <div>
        <button onClick={switchToFrontCamera}>Front Camera</button>
        <button onClick={switchToBackCamera}>Back Camera</button>
      </div>
    </div>
  );
}
```

### Frame Capture and Thumbnails

```tsx
import { useVideoRecorder } from '@acrobi/ui';
import { useState } from 'react';

function FrameCaptureComponent() {
  const { previewRef, captureFrame, generateThumbnail } = useVideoRecorder();
  const [capturedFrame, setCapturedFrame] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleCaptureFrame = () => {
    const frame = captureFrame();
    setCapturedFrame(frame);
  };

  const handleGenerateThumbnail = () => {
    const thumb = generateThumbnail();
    setThumbnail(thumb);
  };

  return (
    <div>
      <video ref={previewRef} autoPlay muted />
      
      <div>
        <button onClick={handleCaptureFrame}>Capture Frame</button>
        <button onClick={handleGenerateThumbnail}>Generate Thumbnail</button>
      </div>
      
      {capturedFrame && (
        <div>
          <h3>Captured Frame</h3>
          <img src={capturedFrame} alt="Captured frame" style={{ maxWidth: 200 }} />
        </div>
      )}
      
      {thumbnail && (
        <div>
          <h3>Thumbnail</h3>
          <img src={thumbnail} alt="Thumbnail" style={{ maxWidth: 150 }} />
        </div>
      )}
    </div>
  );
}
```

### Event Handling

```tsx
import { useVideoRecorder } from '@acrobi/ui';

function EventHandlerComponent() {
  const recorder = useVideoRecorder({
    onRecordingComplete: (videoBlob) => {
      console.log('Recording completed:', videoBlob);
      // Handle completed recording
    },
    onError: (error) => {
      console.error('Recording error:', error);
      // Handle error
    },
    onPermissionDenied: () => {
      console.warn('Camera permission denied');
      // Handle permission denial
    },
    onDataAvailable: (chunk) => {
      console.log('Data chunk available:', chunk.size, 'bytes');
      // Handle real-time data chunks
    }
  });

  return (
    <div>
      <video ref={recorder.previewRef} autoPlay muted />
      
      <div>
        <button onClick={recorder.startRecording}>Start Recording</button>
        <button onClick={recorder.stopRecording}>Stop Recording</button>
      </div>
    </div>
  );
}
```

## API Reference

### Options

```typescript
interface VideoRecorderOptions {
  // Recording configuration
  mimeType?: string;                    // Video MIME type
  videoBitsPerSecond?: number;          // Video bitrate
  audioBitsPerSecond?: number;          // Audio bitrate
  width?: number;                       // Video width
  height?: number;                      // Video height
  frameRate?: number;                   // Frame rate (fps)
  
  // Camera options
  facingMode?: 'user' | 'environment'; // Camera facing mode
  deviceId?: string;                    // Specific camera device ID
  aspectRatio?: number;                 // Video aspect ratio
  
  // Behavior options
  maxDuration?: number;                 // Maximum recording duration (ms)
  includeAudio?: boolean;               // Include audio recording
  
  // Event callbacks
  onDataAvailable?: (chunk: Blob) => void;
  onRecordingComplete?: (videoBlob: Blob) => void;
  onError?: (error: VideoRecorderError) => void;
  onPermissionDenied?: () => void;
}
```

### Return Value

```typescript
interface UseVideoRecorderReturn {
  // State
  state: VideoRecorderState;
  error: VideoRecorderError | null;
  
  // Controls
  startRecording: () => Promise<boolean>;
  stopRecording: () => Promise<Blob | null>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  cancelRecording: () => void;
  
  // Camera management
  getAvailableDevices: () => Promise<VideoDeviceInfo[]>;
  switchCamera: (deviceId?: string) => Promise<boolean>;
  switchToFrontCamera: () => Promise<boolean>;
  switchToBackCamera: () => Promise<boolean>;
  
  // Video data
  videoBlob: Blob | null;
  videoUrl: string | null;
  videoChunks: Blob[];
  previewStream: MediaStream | null;
  
  // Preview and capture
  captureFrame: () => string | null;
  generateThumbnail: () => string | null;
  previewRef: React.RefObject<HTMLVideoElement>;
  
  // Utilities
  clearRecording: () => void;
  downloadRecording: (filename?: string) => void;
  getRecordingDuration: () => number;
  formatDuration: (seconds: number) => string;
  
  // Quality controls
  setResolution: (width: number, height: number) => Promise<boolean>;
  setFrameRate: (fps: number) => Promise<boolean>;
  setQuality: (quality: 'low' | 'medium' | 'high' | 'ultra') => Promise<boolean>;
  
  // Integration features
  isNetworkAvailable: boolean;
  keyboardShortcuts: Record<string, string>;
}
```

### State Object

```typescript
interface VideoRecorderState {
  isRecording: boolean;                 // Currently recording
  isPaused: boolean;                    // Recording is paused
  isSupported: boolean;                 // MediaRecorder supported
  hasPermission: boolean;               // Has camera/mic permissions
  hasCameraPermission: boolean;         // Has camera permission
  hasMicrophonePermission: boolean;     // Has microphone permission
  duration: number;                     // Recording duration (seconds)
  recordingSize: number;                // Recording size (bytes)
  currentDeviceId: string | null;       // Current camera device ID
  currentResolution: {                  // Current video resolution
    width: number;
    height: number;
  };
  currentFrameRate: number;             // Current frame rate
}
```

## Video Formats

The hook supports multiple video formats with automatic browser compatibility detection:

| Format | MIME Type | Quality | Compression | Browser Support |
|--------|-----------|---------|-------------|-----------------|
| WebM | `video/webm;codecs=vp9,opus` | High | Excellent | Chrome, Firefox, Edge |
| MP4 | `video/mp4;codecs=avc1.42E01E,mp4a.40.2` | High | Good | Chrome, Safari, Edge |
| AVI | `video/x-msvideo` | Medium | Fair | Legacy support |

## Quality Presets

Pre-configured quality settings for common use cases:

| Preset | Resolution | Frame Rate | Bitrate |
|--------|------------|------------|---------|
| Low | 480×360 | 15 fps | 500 Kbps |
| Medium | 720×480 | 24 fps | 1 Mbps |
| High | 1280×720 | 30 fps | 2.5 Mbps |
| Ultra | 1920×1080 | 60 fps | 5 Mbps |

## Keyboard Shortcuts

Built-in keyboard shortcuts for recording control (requires Epic 40 integration):

| Key | Action |
|-----|--------|
| Spacebar | Toggle recording |
| Escape | Stop recording |
| P | Pause/Resume recording |
| C | Capture frame |
| S | Switch camera |

## Browser Support

The hook automatically detects browser capabilities and falls back gracefully:

- **Chrome**: Full support for all features
- **Firefox**: Full support with WebM format
- **Safari**: Limited format support, MP4 recommended
- **Edge**: Full support for WebM and MP4
- **Mobile browsers**: Camera switching and mobile-optimized controls

## Error Types

```typescript
interface VideoRecorderError {
  type: 'permission' | 'device' | 'recording' | 'format' | 'network' | 'stream';
  message: string;
  originalError?: Error;
}
```

## Integration

### Epic 40 - Keyboard Shortcuts
Automatic keyboard shortcut integration for recording controls.

### Epic 41 - Network Awareness
Network status integration for upload-aware features.

### Epic 43 - Audio Recording
Compatible with audio recording for synchronized multimedia capture.

## Best Practices

1. **Permission Handling**: Always check permissions before starting recording
2. **Resource Cleanup**: The hook automatically cleans up resources on unmount
3. **Error Handling**: Implement proper error handling for production use
4. **Quality Settings**: Choose appropriate quality settings based on use case
5. **Browser Testing**: Test across different browsers for compatibility
6. **Mobile Optimization**: Use appropriate settings for mobile devices

## Troubleshooting

### Common Issues

**Camera not accessible**
- Check browser permissions
- Ensure HTTPS in production
- Verify camera device availability

**Recording fails to start**
- Check MediaRecorder browser support
- Verify video format compatibility
- Check available disk space

**Poor video quality**
- Adjust bitrate and resolution settings
- Check network conditions for streaming
- Consider device processing capabilities

**Permission denied**
- Use HTTPS for camera access
- Handle permission denial gracefully
- Provide clear user instructions

## License

MIT License - see LICENSE file for details.