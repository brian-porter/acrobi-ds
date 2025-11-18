import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { useAudioRecorder, AUDIO_FORMATS } from './use-audio-recorder';

// Story wrapper component
const AudioRecorderDemo = ({
  showAdvanced = false,
  enableKeyboardShortcuts = true,
  ...options
}: {
  showAdvanced?: boolean;
  enableKeyboardShortcuts?: boolean;
  [key: string]: any;
}) => {
  const recorder = useAudioRecorder(options);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [availableDevices, setAvailableDevices] = useState<any[]>([]);

  useEffect(() => {
    recorder.getAvailableDevices().then(setAvailableDevices);
  }, []);

  useEffect(() => {
    recorder.enableKeyboardShortcuts(enableKeyboardShortcuts);
  }, [enableKeyboardShortcuts, recorder]);

  const handleDeviceChange = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    recorder.switchDevice(deviceId);
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h2>AAE Audio Recorder - Epic 43</h2>

      {/* Status Display */}
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h3>Recording Status</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
          }}
        >
          <div>
            <strong>State:</strong>{' '}
            {recorder.state.isRecording
              ? recorder.state.isPaused
                ? '⏸️ Paused'
                : '🔴 Recording'
              : '⏹️ Stopped'}
          </div>
          <div>
            <strong>Duration:</strong>{' '}
            {recorder.formatDuration(recorder.state.duration)}
          </div>
          <div>
            <strong>Audio Level:</strong>{' '}
            {Math.round(recorder.state.audioLevel * 100)}%
          </div>
          <div>
            <strong>Recording Size:</strong>{' '}
            {formatSize(recorder.state.recordingSize)}
          </div>
          <div>
            <strong>Permission:</strong>{' '}
            {recorder.state.hasPermission ? '✅ Granted' : '❌ Not granted'}
          </div>
          <div>
            <strong>Supported:</strong>{' '}
            {recorder.state.isSupported ? '✅ Yes' : '❌ No'}
          </div>
        </div>
      </div>

      {/* Epic 41 - Network Status */}
      <div
        style={{
          backgroundColor: '#e3f2fd',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h3>Epic 41 - Network Status</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
          }}
        >
          <div>
            <strong>Online:</strong>{' '}
            {recorder.isNetworkAvailable ? '🟢 Online' : '🔴 Offline'}
          </div>
          <div>
            <strong>Quality:</strong>{' '}
            {recorder.networkQuality === 'excellent'
              ? '🟢 Excellent'
              : recorder.networkQuality === 'good'
                ? '🟡 Good'
                : recorder.networkQuality === 'poor'
                  ? '🔴 Poor'
                  : '❓ Unknown'}
          </div>
        </div>
      </div>

      {/* Epic 40 - Keyboard Shortcuts */}
      <div
        style={{
          backgroundColor: '#f3e5f5',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h3>Epic 40 - Keyboard Shortcuts</h3>
        <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
          {Object.entries(recorder.keyboardShortcuts).map(
            ([key, description]) => (
              <div key={key} style={{ marginBottom: '5px' }}>
                <kbd
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                    padding: '2px 6px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                >
                  {key}
                </kbd>{' '}
                - {description}
              </div>
            )
          )}
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>
            <input
              type='checkbox'
              checked={enableKeyboardShortcuts}
              onChange={e => recorder.enableKeyboardShortcuts(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            Enable keyboard shortcuts
          </label>
        </div>
      </div>

      {/* Recording Controls */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={recorder.startRecording}
          disabled={recorder.state.isRecording}
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: recorder.state.isRecording ? 'not-allowed' : 'pointer',
            opacity: recorder.state.isRecording ? 0.6 : 1,
          }}
        >
          🔴 Start Recording
        </button>

        <button
          onClick={recorder.pauseRecording}
          disabled={!recorder.state.isRecording || recorder.state.isPaused}
          style={{
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor:
              !recorder.state.isRecording || recorder.state.isPaused
                ? 'not-allowed'
                : 'pointer',
            opacity:
              !recorder.state.isRecording || recorder.state.isPaused ? 0.6 : 1,
          }}
        >
          ⏸️ Pause
        </button>

        <button
          onClick={recorder.resumeRecording}
          disabled={!recorder.state.isPaused}
          style={{
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: !recorder.state.isPaused ? 'not-allowed' : 'pointer',
            opacity: !recorder.state.isPaused ? 0.6 : 1,
          }}
        >
          ▶️ Resume
        </button>

        <button
          onClick={recorder.stopRecording}
          disabled={!recorder.state.isRecording}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: !recorder.state.isRecording ? 'not-allowed' : 'pointer',
            opacity: !recorder.state.isRecording ? 0.6 : 1,
          }}
        >
          ⏹️ Stop
        </button>

        <button
          onClick={recorder.cancelRecording}
          disabled={!recorder.state.isRecording}
          style={{
            backgroundColor: '#9e9e9e',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: !recorder.state.isRecording ? 'not-allowed' : 'pointer',
            opacity: !recorder.state.isRecording ? 0.6 : 1,
          }}
        >
          ❌ Cancel
        </button>
      </div>

      {/* Audio Visualization */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Audio Visualization</h3>

        {/* Audio Level Meter */}
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}
          >
            Audio Level: {Math.round(recorder.state.audioLevel * 100)}%
          </label>
          <div
            style={{
              width: '100%',
              height: '20px',
              backgroundColor: '#e0e0e0',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${recorder.state.audioLevel * 100}%`,
                height: '100%',
                backgroundColor:
                  recorder.state.audioLevel > 0.8
                    ? '#f44336'
                    : recorder.state.audioLevel > 0.5
                      ? '#ff9800'
                      : '#4caf50',
                transition: 'width 0.1s ease',
              }}
            />
          </div>
        </div>

        {/* Audio Levels History */}
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}
          >
            Audio Levels History (Last 100 samples)
          </label>
          <div
            style={{
              width: '100%',
              height: '60px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'end',
              padding: '5px',
              gap: '1px',
            }}
          >
            {recorder.audioLevels.slice(-100).map((level, index) => (
              <div
                key={index}
                style={{
                  width: '2px',
                  height: `${Math.max(level * 50, 1)}px`,
                  backgroundColor:
                    level > 0.8
                      ? '#f44336'
                      : level > 0.5
                        ? '#ff9800'
                        : '#4caf50',
                  borderRadius: '1px',
                }}
              />
            ))}
          </div>
        </div>

        {/* Waveform Visualization */}
        <div>
          <label
            style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}
          >
            Frequency Spectrum
          </label>
          <div
            style={{
              width: '100%',
              height: '80px',
              backgroundColor: '#000',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'end',
              padding: '5px',
              gap: '1px',
            }}
          >
            {recorder.waveformData.slice(0, 128).map((value, index) => (
              <div
                key={index}
                style={{
                  width: '3px',
                  height: `${Math.max((value / 255) * 70, 1)}px`,
                  backgroundColor: `hsl(${(value / 255) * 240}, 100%, 50%)`,
                  borderRadius: '1px',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Device Selection */}
      {showAdvanced && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Device Selection</h3>
          <select
            value={selectedDeviceId}
            onChange={e => handleDeviceChange(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '100%',
              maxWidth: '300px',
            }}
          >
            <option value=''>Select audio device...</option>
            {availableDevices.map(device => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Device ${device.deviceId.slice(0, 8)}`}
              </option>
            ))}
          </select>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            Current device: {recorder.state.currentDeviceId || 'Default'}
          </div>
        </div>
      )}

      {/* Audio Playback */}
      {recorder.audioUrl && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Recorded Audio</h3>
          <audio
            controls
            src={recorder.audioUrl}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => recorder.downloadRecording()}
              style={{
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              💾 Download
            </button>
            <button
              onClick={recorder.clearRecording}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🗑️ Clear
            </button>
          </div>
        </div>
      )}

      {/* Error Display */}
      {recorder.error && (
        <div
          style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '15px',
            borderRadius: '4px',
            marginBottom: '20px',
            border: '1px solid #ffcdd2',
          }}
        >
          <strong>Error ({recorder.error.type}):</strong>{' '}
          {recorder.error.message}
        </div>
      )}

      {/* Audio Format Information */}
      {showAdvanced && (
        <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
          <h3>Supported Audio Formats</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '10px',
            }}
          >
            {Object.entries(AUDIO_FORMATS).map(([key, format]) => (
              <div
                key={key}
                style={{
                  backgroundColor: '#f9f9f9',
                  padding: '10px',
                  borderRadius: '4px',
                }}
              >
                <strong>{key.toUpperCase()}</strong>
                <br />
                MIME: {format.mimeType}
                <br />
                Quality: {format.quality}
                <br />
                Compression: {format.compression}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const meta: Meta<typeof AudioRecorderDemo> = {
  title: 'Hooks/useAudioRecorder',
  component: AudioRecorderDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Epic 43 - AAE Audio Recording

The \`useAudioRecorder\` hook provides comprehensive audio recording capabilities for Acrobi's Advanced Experienceslications, featuring:

## Epic Dependencies Integration
- **Epic 40**: Keyboard shortcuts for recording controls
- **Epic 41**: Network awareness for quality optimization

## Core Features
- MediaRecorder API integration with multiple format support
- Real-time audio visualization and level monitoring
- Device enumeration and switching
- Recording controls (start, pause, resume, stop, cancel)
- Audio blob generation and download capabilities
- Error handling and permission management

## Audio Formats Supported
- WebM with Opus codec (preferred)
- MP4 with AAC codec
- OGG with Opus codec  
- WAV (uncompressed)

## Keyboard Shortcuts (Epic 40)
- **Space**: Toggle recording (start/pause/resume)
- **Escape**: Stop recording
- **Ctrl/Cmd + S**: Download recording
- **Ctrl/Cmd + Delete**: Clear recording

## Network Integration (Epic 41)
- Automatic quality adjustment based on connection speed
- Upload capability assessment
- Bandwidth-aware recording settings

## Browser Support
- Chrome/Chromium (full support)
- Firefox (full support)
- Safari (limited format support)
- Edge (full support)
        `,
      },
    },
  },
  argTypes: {
    showAdvanced: {
      control: 'boolean',
      description:
        'Show advanced features like device selection and format info',
    },
    enableKeyboardShortcuts: {
      control: 'boolean',
      description: 'Enable keyboard shortcuts (Epic 40 integration)',
    },
    mimeType: {
      control: 'select',
      options: [
        'audio/webm;codecs=opus',
        'audio/mp4;codecs=mp4a.40.2',
        'audio/ogg;codecs=opus',
        'audio/wav',
      ],
      description: 'Audio recording format',
    },
    audioBitsPerSecond: {
      control: { type: 'range', min: 32000, max: 320000, step: 16000 },
      description: 'Audio bitrate (bps)',
    },
    channelCount: {
      control: 'select',
      options: [1, 2],
      description: 'Number of audio channels',
    },
    sampleRate: {
      control: 'select',
      options: [22050, 44100, 48000],
      description: 'Sample rate (Hz)',
    },
    echoCancellation: {
      control: 'boolean',
      description: 'Enable echo cancellation',
    },
    noiseSuppression: {
      control: 'boolean',
      description: 'Enable noise suppression',
    },
    autoGainControl: {
      control: 'boolean',
      description: 'Enable automatic gain control',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AudioRecorderDemo>;

export const BasicRecorder: Story = {
  args: {
    showAdvanced: false,
    enableKeyboardShortcuts: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic audio recorder with simple controls and Epic 40/41 integration.',
      },
    },
  },
};

export const AdvancedRecorder: Story = {
  args: {
    showAdvanced: true,
    enableKeyboardShortcuts: true,
    mimeType: 'audio/webm;codecs=opus',
    audioBitsPerSecond: 128000,
    channelCount: 1,
    sampleRate: 44100,
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Advanced recorder with device selection, format configuration, and full Epic integration.',
      },
    },
  },
};

export const HighQualityRecording: Story = {
  args: {
    showAdvanced: true,
    enableKeyboardShortcuts: true,
    mimeType: 'audio/wav',
    audioBitsPerSecond: 320000,
    channelCount: 2,
    sampleRate: 48000,
    echoCancellation: false,
    noiseSuppression: false,
    autoGainControl: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'High-quality stereo recording configuration for professional use cases.',
      },
    },
  },
};

export const LowBandwidthMode: Story = {
  args: {
    showAdvanced: true,
    enableKeyboardShortcuts: true,
    mimeType: 'audio/webm;codecs=opus',
    audioBitsPerSecond: 64000,
    channelCount: 1,
    sampleRate: 22050,
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Optimized for slow network connections with Epic 41 network awareness.',
      },
    },
  },
};

export const KeyboardShortcutsDisabled: Story = {
  args: {
    showAdvanced: false,
    enableKeyboardShortcuts: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Audio recorder with keyboard shortcuts disabled (Epic 40 feature toggle).',
      },
    },
  },
};
