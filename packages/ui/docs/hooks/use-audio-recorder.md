# useAudioRecorder Hook

A comprehensive React hook for recording audio in Progressive Web Applications with MediaRecorder API integration, real-time visualization, and device management.

## Overview

The `useAudioRecorder` hook provides a complete solution for audio recording in modern web applications. It offers:

- **MediaRecorder API Integration**: Native browser audio recording
- **Real-time Visualization**: Audio levels and waveform display
- **Device Management**: Microphone enumeration and selection
- **Format Support**: Multiple audio formats (WebM, MP4, OGG, WAV)
- **Permission Handling**: Graceful microphone permission management
- **Error Recovery**: Comprehensive error handling and recovery
- **PWA Integration**: Network awareness and keyboard shortcuts

## Basic Usage

```tsx
import { useAudioRecorder } from '@acrobi-ds/ui';

function AudioRecorderComponent() {
  const {
    state,
    startRecording,
    stopRecording,
    audioUrl,
    formatDuration
  } = useAudioRecorder();

  return (
    <div>
      <div>Status: {state.isRecording ? 'Recording' : 'Stopped'}</div>
      <div>Duration: {formatDuration(state.duration)}</div>
      
      <button onClick={startRecording} disabled={state.isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!state.isRecording}>
        Stop Recording
      </button>
      
      {audioUrl && <audio controls src={audioUrl} />}
    </div>
  );
}
```

## Advanced Usage

### With Device Selection and Format Options

```tsx
import { useAudioRecorder, AUDIO_FORMATS } from '@acrobi-ds/ui';

function AdvancedRecorder() {
  const [selectedDevice, setSelectedDevice] = useState('');
  const [devices, setDevices] = useState([]);

  const {
    state,
    error,
    startRecording,
    stopRecording,
    getAvailableDevices,
    switchDevice,
    audioUrl,
    audioLevels,
    downloadRecording
  } = useAudioRecorder({
    mimeType: AUDIO_FORMATS.webm.mimeType,
    deviceId: selectedDevice,
    audioBitsPerSecond: 128000,
    echoCancellation: true,
    noiseSuppression: true,
    onRecordingComplete: (blob) => {
      console.log('Recording completed:', blob.size, 'bytes');
    },
    onError: (error) => {
      console.error('Recording error:', error);
    }
  });

  useEffect(() => {
    getAvailableDevices().then(setDevices);
  }, []);

  return (
    <div>
      {/* Device Selection */}
      <select 
        value={selectedDevice} 
        onChange={(e) => setSelectedDevice(e.target.value)}
      >
        <option value="">Default Device</option>
        {devices.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>

      {/* Recording Controls */}
      <button onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>Stop</button>
      
      {/* Real-time Audio Level */}
      <div>
        Audio Level: {(state.audioLevel * 100).toFixed(0)}%
      </div>
      
      {/* Error Display */}
      {error && (
        <div style={{ color: 'red' }}>
          Error: {error.message}
        </div>
      )}
      
      {/* Download Button */}
      {audioUrl && (
        <button onClick={() => downloadRecording('my-recording.webm')}>
          Download Recording
        </button>
      )}
    </div>
  );
}
```

### With Real-time Visualization

```tsx
function RecorderWithVisualization() {
  const { 
    state, 
    audioLevels, 
    waveformData,
    startRecording,
    stopRecording 
  } = useAudioRecorder();

  // Render audio level bars
  const renderAudioLevels = () => (
    <div style={{ display: 'flex', alignItems: 'end', height: '60px' }}>
      {audioLevels.slice(-50).map((level, index) => (
        <div
          key={index}
          style={{
            width: '4px',
            height: `${Math.max(2, level * 60)}px`,
            backgroundColor: level > 0.7 ? '#ff4444' : level > 0.3 ? '#ffaa00' : '#44ff44',
            marginRight: '2px'
          }}
        />
      ))}
    </div>
  );

  // Render frequency spectrum
  const renderWaveform = () => (
    <svg width="400" height="100">
      {waveformData.map((value, index) => (
        <rect
          key={index}
          x={index * (400 / waveformData.length)}
          y={100 - (value / 255) * 100}
          width={400 / waveformData.length - 1}
          height={(value / 255) * 100}
          fill={`hsl(${(value / 255) * 240}, 70%, 50%)`}
        />
      ))}
    </svg>
  );

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      
      {state.isRecording && (
        <div>
          <h4>Audio Levels:</h4>
          {renderAudioLevels()}
          
          <h4>Frequency Spectrum:</h4>
          {renderWaveform()}
        </div>
      )}
    </div>
  );
}
```

## API Reference

### Hook Signature

```tsx
function useAudioRecorder(options?: AudioRecorderOptions): UseAudioRecorderReturn
```

### AudioRecorderOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mimeType` | `string` | `'audio/webm;codecs=opus'` | Audio format MIME type |
| `audioBitsPerSecond` | `number` | `128000` | Audio bitrate in bits per second |
| `sampleRate` | `number` | `44100` | Audio sample rate in Hz |
| `channelCount` | `1 \| 2` | `1` | Number of audio channels (mono/stereo) |
| `deviceId` | `string` | `undefined` | Specific microphone device ID |
| `echoCancellation` | `boolean` | `true` | Enable echo cancellation |
| `noiseSuppression` | `boolean` | `true` | Enable noise suppression |
| `autoGainControl` | `boolean` | `true` | Enable automatic gain control |
| `maxDuration` | `number` | `3600` | Maximum recording duration in seconds |
| `silenceThreshold` | `number` | `0.01` | Silence detection threshold |
| `onDataAvailable` | `(chunk: Blob) => void` | `undefined` | Callback for each data chunk |
| `onRecordingComplete` | `(audioBlob: Blob) => void` | `undefined` | Callback when recording completes |
| `onError` | `(error: AudioRecorderError) => void` | `undefined` | Error callback |
| `onPermissionDenied` | `() => void` | `undefined` | Permission denied callback |

### UseAudioRecorderReturn

#### State Properties

| Property | Type | Description |
|----------|------|-------------|
| `state` | `AudioRecorderState` | Current recorder state |
| `error` | `AudioRecorderError \| null` | Current error state |
| `audioBlob` | `Blob \| null` | Recorded audio blob |
| `audioUrl` | `string \| null` | Blob URL for playback |
| `audioChunks` | `Blob[]` | Array of audio chunks |
| `audioLevels` | `number[]` | Real-time audio levels |
| `waveformData` | `number[]` | Frequency spectrum data |

#### Control Methods

| Method | Type | Description |
|--------|------|-------------|
| `startRecording` | `() => Promise<boolean>` | Start audio recording |
| `stopRecording` | `() => Promise<Blob \| null>` | Stop recording and return blob |
| `pauseRecording` | `() => void` | Pause active recording |
| `resumeRecording` | `() => void` | Resume paused recording |
| `cancelRecording` | `() => void` | Cancel and discard recording |

#### Device Management

| Method | Type | Description |
|--------|------|-------------|
| `getAvailableDevices` | `() => Promise<AudioDeviceInfo[]>` | Get available microphones |
| `switchDevice` | `(deviceId: string) => Promise<boolean>` | Switch recording device |

#### Utility Methods

| Method | Type | Description |
|--------|------|-------------|
| `clearRecording` | `() => void` | Clear current recording data |
| `downloadRecording` | `(filename?: string) => void` | Download recording as file |
| `getRecordingDuration` | `() => number` | Get current duration in seconds |
| `formatDuration` | `(seconds: number) => string` | Format duration as HH:MM:SS |

#### Integration Properties

| Property | Type | Description |
|----------|------|-------------|
| `isNetworkAvailable` | `boolean` | Network status (Epic 41 integration) |
| `keyboardShortcuts` | `Record<string, string>` | Available shortcuts (Epic 40 integration) |

### AudioRecorderState

```tsx
interface AudioRecorderState {
  isRecording: boolean;        // Currently recording
  isPaused: boolean;           // Recording is paused
  isSupported: boolean;        // MediaRecorder supported
  hasPermission: boolean;      // Microphone permission granted
  duration: number;            // Recording duration in seconds
  audioLevel: number;          // Current audio level (0-1)
  recordingSize: number;       // Recording size in bytes
  currentDeviceId: string | null; // Active device ID
}
```

### AudioRecorderError

```tsx
interface AudioRecorderError {
  type: 'permission' | 'device' | 'recording' | 'format' | 'network';
  message: string;
  originalError?: Error;
}
```

### AudioDeviceInfo

```tsx
interface AudioDeviceInfo {
  deviceId: string;   // Unique device identifier
  label: string;      // Human-readable device name
  kind: 'audioinput'; // Device type
  groupId: string;    // Device group identifier
}
```

## Audio Format Support

The hook supports multiple audio formats with automatic fallback:

```tsx
import { AUDIO_FORMATS } from '@acrobi-ds/ui';

// Available formats
const formats = {
  webm: AUDIO_FORMATS.webm,  // Opus codec, excellent compression
  mp4: AUDIO_FORMATS.mp4,    // AAC codec, good compatibility
  ogg: AUDIO_FORMATS.ogg,    // Opus codec, open source
  wav: AUDIO_FORMATS.wav     // Uncompressed, highest quality
};
```

### Format Selection Guide

- **WebM (Opus)**: Best choice for web applications (high quality, small size)
- **MP4 (AAC)**: Good for broader compatibility and mobile devices
- **OGG (Opus)**: Open-source alternative to WebM
- **WAV**: Use when uncompressed audio is required

## Error Handling

The hook provides comprehensive error handling:

```tsx
function RecorderWithErrorHandling() {
  const { error, startRecording } = useAudioRecorder({
    onError: (error) => {
      switch (error.type) {
        case 'permission':
          alert('Microphone permission required');
          break;
        case 'device':
          alert('No microphone found');
          break;
        case 'recording':
          alert('Recording failed');
          break;
        case 'format':
          alert('Audio format not supported');
          break;
        case 'network':
          alert('Network error occurred');
          break;
      }
    },
    onPermissionDenied: () => {
      // Show permission instructions
      showPermissionGuide();
    }
  });

  return (
    <div>
      {error && (
        <div className="error-banner">
          <strong>Error ({error.type}):</strong> {error.message}
        </div>
      )}
      <button onClick={startRecording}>Start Recording</button>
    </div>
  );
}
```

## Browser Compatibility

The hook automatically detects browser support and gracefully degrades:

- **Chrome/Edge**: Full support with all features
- **Firefox**: Full support with all features  
- **Safari**: Limited format support (use MP4/WAV)
- **Mobile browsers**: Device-dependent support

### Feature Detection

```tsx
const { state } = useAudioRecorder();

if (!state.isSupported) {
  return <div>Audio recording not supported in this browser</div>;
}
```

## Performance Considerations

### Memory Management

The hook automatically manages memory and cleans up resources:

```tsx
// Automatic cleanup on unmount
useEffect(() => {
  return () => {
    // All resources cleaned up automatically
  };
}, []);
```

### Optimization Tips

1. **Limit visualization updates**: Adjust update frequency for performance
2. **Choose appropriate bitrates**: Lower bitrates for voice, higher for music
3. **Use device-specific settings**: Optimize for target devices
4. **Handle large recordings**: Consider chunked processing for long recordings

## Integration with PWA Features

### Keyboard Shortcuts (Epic 40)

The hook integrates with keyboard shortcuts:

```tsx
const { keyboardShortcuts } = useAudioRecorder();

// Available shortcuts:
// - Space: Toggle recording
// - Escape: Stop recording
// - Ctrl+S: Download recording
```

### Network Awareness (Epic 41)

Network status integration for upload features:

```tsx
const { isNetworkAvailable } = useAudioRecorder();

if (!isNetworkAvailable) {
  // Show offline mode or queue uploads
}
```

## Testing

The hook includes comprehensive test coverage. Run tests with:

```bash
npm test use-audio-recorder.test.ts
```

### Mocking for Tests

```tsx
// Mock MediaRecorder for testing
Object.defineProperty(global, 'MediaRecorder', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    stop: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn()
  }))
});
```

## Accessibility

The hook supports accessibility features:

- **Screen reader compatibility**: State announcements
- **Keyboard navigation**: Full keyboard control
- **High contrast support**: Visual indicators
- **Voice control**: Compatible with voice commands

## Common Patterns

### Voice Memo App

```tsx
function VoiceMemoApp() {
  const [memos, setMemos] = useState([]);
  
  const { startRecording, stopRecording, audioUrl } = useAudioRecorder({
    onRecordingComplete: (blob) => {
      const memo = {
        id: Date.now(),
        url: URL.createObjectURL(blob),
        date: new Date()
      };
      setMemos(prev => [memo, ...prev]);
    }
  });

  return (
    <div>
      <button onClick={startRecording}>Record Memo</button>
      <button onClick={stopRecording}>Stop</button>
      
      {memos.map(memo => (
        <div key={memo.id}>
          <audio controls src={memo.url} />
          <span>{memo.date.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
```

### Interview Recorder

```tsx
function InterviewRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  
  const {
    state,
    startRecording,
    stopRecording,
    formatDuration,
    downloadRecording
  } = useAudioRecorder({
    mimeType: AUDIO_FORMATS.wav.mimeType, // High quality for interviews
    audioBitsPerSecond: 256000
  });

  const handleStartStop = async () => {
    if (state.isRecording) {
      await stopRecording();
      setIsRecording(false);
    } else {
      const success = await startRecording();
      setIsRecording(success);
    }
  };

  return (
    <div>
      <h2>Interview Recorder</h2>
      <div>Duration: {formatDuration(state.duration)}</div>
      
      <button onClick={handleStartStop}>
        {state.isRecording ? 'Stop Interview' : 'Start Interview'}
      </button>
      
      <button 
        onClick={() => downloadRecording('interview.wav')}
        disabled={!audioUrl}
      >
        Save Interview
      </button>
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Permission Denied**
   - Ensure HTTPS (required for getUserMedia)
   - Check browser permission settings
   - Provide clear permission instructions

2. **No Audio Devices**
   - Verify microphone is connected
   - Check device permissions
   - Test with other applications

3. **Recording Not Starting**
   - Check MediaRecorder support
   - Verify audio format compatibility
   - Ensure stable network connection

4. **Poor Audio Quality**
   - Increase audioBitsPerSecond
   - Enable noise suppression
   - Check microphone quality

### Debug Mode

Enable debug logging:

```tsx
const recorder = useAudioRecorder({
  onError: (error) => {
    console.error('Recording error:', error);
  },
  onDataAvailable: (chunk) => {
    console.log('Data chunk:', chunk.size, 'bytes');
  }
});
```

## Migration Guide

### From v1.x to v2.x

Key changes in v2.x:

- Added real-time visualization
- Improved error handling
- Enhanced device management
- PWA integration features

### Breaking Changes

- `recordingData` renamed to `audioChunks`
- Error callback signature changed
- Device switching now async

## Support

For additional support:

- [GitHub Issues](https://github.com/acrobi/ui/issues)
- [Documentation](https://ui.acrobi.com/docs)
- [Epic 43 Specification](/docs/epics/epic-43.md)

---

*Part of Epic 43 - PWA Audio Recording implementation. See [Epic 43](/docs/epics/epic-43.md) for complete specification.*