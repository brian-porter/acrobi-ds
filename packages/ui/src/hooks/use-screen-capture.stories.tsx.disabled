/**
 * Screen Capture Hook Stories
 * Epic 54 - AAE Screen Capture
 *
 * Comprehensive Storybook stories demonstrating screen capture and recording capabilities
 * with different configurations and use cases.
 */

import React, { useState, useRef, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useScreenCapture, ScreenCaptureUtils } from './use-screen-capture';
import { ScreenCaptureOptions } from './use-screen-capture';

const meta: Meta = {
  title: 'Hooks/useScreenCapture',
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive screen capture hook with getDisplayMedia and MediaRecorder integration, screen sharing, recording states, and video file generation for screen recording workflows.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Screen Capture Component for Stories
const ScreenCaptureDemo: React.FC<{ options?: ScreenCaptureOptions }> = ({
  options,
}) => {
  const {
    state,
    error,
    mediaStream,
    recordingBlob,
    recordingUrl,
    screenshotBlob,
    startScreenCapture,
    stopScreenCapture,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,
    takeScreenshot,
    downloadRecording,
    downloadScreenshot,
    getRecordingDuration,
    formatDuration,
    getAvailableDisplays,
    getCurrentDisplay,
    keyboardShortcuts,
    isNetworkAvailable,
    networkQuality,
    enableKeyboardShortcuts,
  } = useScreenCapture(options);

  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const playbackVideoRef = useRef<HTMLVideoElement>(null);
  const [displays, setDisplays] = useState<any[]>([]);
  const [shortcutsEnabled, setShortcutsEnabled] = useState(true);

  // Set up video preview
  useEffect(() => {
    if (previewVideoRef.current && mediaStream) {
      previewVideoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  // Get available displays on mount
  useEffect(() => {
    getAvailableDisplays().then(setDisplays);
  }, [getAvailableDisplays]);

  // Handle keyboard shortcuts toggle
  const handleShortcutsToggle = (enabled: boolean) => {
    setShortcutsEnabled(enabled);
    enableKeyboardShortcuts(enabled);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px' }}>
      <h2>Screen Capture Demo</h2>

      {/* Browser Support Warning */}
      {!state.isSupported && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#ffeb3b',
            border: '2px solid #ff9800',
            borderRadius: '8px',
            marginBottom: '20px',
            fontWeight: 'bold',
            color: '#e65100',
          }}
        >
          ⚠️ Screen capture is not supported in this browser. Please use Chrome,
          Firefox, or Edge.
        </div>
      )}

      {/* iOS Warning */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#ffebee',
          border: '2px solid #f44336',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '14px',
        }}
      >
        <strong>Important:</strong> Screen capture is not supported on iOS
        devices (iPhone/iPad). This feature works on desktop browsers and
        Android devices only.
      </div>

      {/* Status Display */}
      <div
        style={{
          padding: '15px',
          backgroundColor: state.isCapturing ? '#e8f5e8' : '#f5f5f5',
          border: `2px solid ${state.isCapturing ? '#4caf50' : '#ddd'}`,
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h3>Status</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
          }}
        >
          <p>
            <strong>Capturing:</strong>{' '}
            {state.isCapturing ? '🟢 Active' : '⚫ Inactive'}
          </p>
          <p>
            <strong>Recording:</strong>{' '}
            {state.isRecording ? '🔴 Recording' : '⚫ Stopped'}
          </p>
          <p>
            <strong>Paused:</strong> {state.isPaused ? '⏸️ Yes' : '▶️ No'}
          </p>
          <p>
            <strong>Duration:</strong> {formatDuration(state.duration)}
          </p>
          <p>
            <strong>Size:</strong>{' '}
            {(state.recordingSize / 1024 / 1024).toFixed(2)} MB
          </p>
          <p>
            <strong>Permission:</strong>{' '}
            {state.hasPermission ? '✅ Granted' : '❌ Not Granted'}
          </p>
          <p>
            <strong>Network:</strong>{' '}
            {isNetworkAvailable
              ? `🌐 Online (${networkQuality})`
              : '📴 Offline'}
          </p>
          <p>
            <strong>Displays:</strong> {displays.length} detected
          </p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#ffebee',
            border: '2px solid #f44336',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <h3>Error</h3>
          <p>
            <strong>Type:</strong> {error.type}
          </p>
          <p>
            <strong>Message:</strong> {error.message}
          </p>
          {error.originalError && (
            <p>
              <strong>Details:</strong> {error.originalError.message}
            </p>
          )}
        </div>
      )}

      {/* Live Preview */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Live Preview</h3>
        <video
          ref={previewVideoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: '100%',
            maxWidth: '600px',
            height: 'auto',
            border: '2px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#000',
            display: state.isCapturing ? 'block' : 'none',
          }}
        />
        {!state.isCapturing && (
          <div
            style={{
              width: '100%',
              maxWidth: '600px',
              height: '300px',
              border: '2px dashed #ddd',
              borderRadius: '8px',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              fontSize: '18px',
            }}
          >
            Start screen capture to see preview
          </div>
        )}
      </div>

      {/* Capture Controls */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Screen Capture Controls</h3>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={startScreenCapture}
            disabled={state.isCapturing || !state.isSupported}
            style={{
              padding: '10px 20px',
              backgroundColor:
                state.isCapturing || !state.isSupported ? '#ccc' : '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                state.isCapturing || !state.isSupported
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            🖥️ Start Capture
          </button>

          <button
            onClick={stopScreenCapture}
            disabled={!state.isCapturing}
            style={{
              padding: '10px 20px',
              backgroundColor: !state.isCapturing ? '#ccc' : '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !state.isCapturing ? 'not-allowed' : 'pointer',
            }}
          >
            ⏹️ Stop Capture
          </button>

          <button
            onClick={takeScreenshot}
            disabled={!state.isCapturing}
            style={{
              padding: '10px 20px',
              backgroundColor: !state.isCapturing ? '#ccc' : '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !state.isCapturing ? 'not-allowed' : 'pointer',
            }}
          >
            📸 Screenshot
          </button>
        </div>

        {/* Display Selection */}
        {displays.length > 0 && (
          <div style={{ marginBottom: '15px' }}>
            <h4>Available Displays</h4>
            {displays.map(display => (
              <div
                key={display.id}
                style={{
                  padding: '10px',
                  backgroundColor: display.primary ? '#e3f2fd' : '#f5f5f5',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  marginBottom: '5px',
                }}
              >
                <strong>{display.label}</strong>
                {display.primary && (
                  <span style={{ color: '#1976d2', marginLeft: '10px' }}>
                    (Primary)
                  </span>
                )}
                <br />
                <small>
                  {display.bounds.width}×{display.bounds.height}px, Scale:{' '}
                  {display.scaleFactor}x
                </small>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recording Controls */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Recording Controls</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={startRecording}
            disabled={state.isRecording || !state.isSupported}
            style={{
              padding: '10px 20px',
              backgroundColor:
                state.isRecording || !state.isSupported ? '#ccc' : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                state.isRecording || !state.isSupported
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            🔴 Start Recording
          </button>

          <button
            onClick={pauseRecording}
            disabled={!state.isRecording || state.isPaused}
            style={{
              padding: '10px 20px',
              backgroundColor:
                !state.isRecording || state.isPaused ? '#ccc' : '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !state.isRecording || state.isPaused
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            ⏸️ Pause
          </button>

          <button
            onClick={resumeRecording}
            disabled={!state.isRecording || !state.isPaused}
            style={{
              padding: '10px 20px',
              backgroundColor:
                !state.isRecording || !state.isPaused ? '#ccc' : '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !state.isRecording || !state.isPaused
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            ▶️ Resume
          </button>

          <button
            onClick={stopRecording}
            disabled={!state.isRecording}
            style={{
              padding: '10px 20px',
              backgroundColor: !state.isRecording ? '#ccc' : '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !state.isRecording ? 'not-allowed' : 'pointer',
            }}
          >
            ⏹️ Stop Recording
          </button>

          <button
            onClick={cancelRecording}
            disabled={!state.isRecording}
            style={{
              padding: '10px 20px',
              backgroundColor: !state.isRecording ? '#ccc' : '#9e9e9e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !state.isRecording ? 'not-allowed' : 'pointer',
            }}
          >
            ❌ Cancel
          </button>
        </div>
      </div>

      {/* Recorded Video Playback */}
      {recordingUrl && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Recorded Video</h3>
          <video
            ref={playbackVideoRef}
            src={recordingUrl}
            controls
            style={{
              width: '100%',
              maxWidth: '600px',
              height: 'auto',
              border: '2px solid #4caf50',
              borderRadius: '8px',
            }}
          />
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => downloadRecording()}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              💾 Download Recording
            </button>
            <div
              style={{
                padding: '10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              Duration: {formatDuration(getRecordingDuration())} | Size:{' '}
              {recordingBlob
                ? (recordingBlob.size / 1024 / 1024).toFixed(2)
                : 0}{' '}
              MB
            </div>
          </div>
        </div>
      )}

      {/* Screenshot Display */}
      {screenshotBlob && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Screenshot</h3>
          <img
            src={URL.createObjectURL(screenshotBlob)}
            alt='Screenshot'
            style={{
              maxWidth: '100%',
              maxHeight: '400px',
              border: '2px solid #ff9800',
              borderRadius: '8px',
            }}
          />
          <div style={{ marginTop: '10px' }}>
            <button
              onClick={() => downloadScreenshot()}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ff9800',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              💾 Download Screenshot
            </button>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '10px',
          }}
        >
          <h3 style={{ margin: 0 }}>Keyboard Shortcuts</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type='checkbox'
              checked={shortcutsEnabled}
              onChange={e => handleShortcutsToggle(e.target.checked)}
            />
            Enable shortcuts
          </label>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '10px',
          }}
        >
          {Object.entries(keyboardShortcuts).map(([key, description]) => (
            <div
              key={key}
              style={{
                padding: '8px 12px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              <code
                style={{
                  backgroundColor: '#e0e0e0',
                  padding: '2px 6px',
                  borderRadius: '3px',
                }}
              >
                {key}
              </code>
              <span style={{ marginLeft: '10px' }}>{description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Format Support Info */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Browser Support Info</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '10px',
          }}
        >
          <div
            style={{
              padding: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
            }}
          >
            <strong>Screen Capture:</strong>{' '}
            {state.isSupported ? '✅ Supported' : '❌ Not Supported'}
          </div>
          <div
            style={{
              padding: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
            }}
          >
            <strong>Media Recording:</strong>{' '}
            {typeof MediaRecorder !== 'undefined'
              ? '✅ Supported'
              : '❌ Not Supported'}
          </div>
          <div
            style={{
              padding: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
            }}
          >
            <strong>Network Quality:</strong> {networkQuality}
          </div>
          <div
            style={{
              padding: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
            }}
          >
            <strong>High Quality:</strong>{' '}
            {ScreenCaptureUtils.supportsHighQuality()
              ? '✅ Available'
              : '❌ Limited'}
          </div>
        </div>
      </div>
    </div>
  );
};

// Basic Screen Capture Story
export const BasicScreenCapture: Story = {
  render: () => <ScreenCaptureDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic screen capture with default settings. Includes screen sharing, recording controls, screenshot capabilities, and keyboard shortcuts.',
      },
    },
  },
};

// High Quality Screen Capture Story
export const HighQualityScreenCapture: Story = {
  render: () => (
    <ScreenCaptureDemo
      options={{
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 60 },
          displaySurface: 'monitor',
        },
        audio: {
          systemAudio: 'include',
          echoCancellation: false,
          noiseSuppression: false,
        },
        mimeType: 'video/webm;codecs=vp9,opus',
        videoBitsPerSecond: 5000000, // 5 Mbps
        audioBitsPerSecond: 192000, // 192 kbps
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'High quality screen capture with 1080p@60fps recording, VP9 codec, and high bitrate for professional screen recording.',
      },
    },
  },
};

// Audio-Free Screen Capture Story
export const AudioFreeScreenCapture: Story = {
  render: () => (
    <ScreenCaptureDemo
      options={{
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        },
        audio: {
          systemAudio: 'exclude',
        },
        videoBitsPerSecond: 2000000,
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Screen capture without audio recording, useful for silent demonstrations or when audio permissions are not available.',
      },
    },
  },
};

// Low Bandwidth Screen Capture Story
export const LowBandwidthScreenCapture: Story = {
  render: () => (
    <ScreenCaptureDemo
      options={{
        video: {
          width: { ideal: 854 },
          height: { ideal: 480 },
          frameRate: { ideal: 15 },
        },
        audio: {
          systemAudio: 'include',
        },
        videoBitsPerSecond: 500000, // 500 Kbps
        audioBitsPerSecond: 64000, // 64 Kbps
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Low bandwidth screen capture optimized for slow internet connections with reduced resolution and bitrate.',
      },
    },
  },
};

// Window Capture Story
export const WindowCapture: Story = {
  render: () => (
    <ScreenCaptureDemo
      options={{
        video: {
          mediaSource: 'window',
          displaySurface: 'window',
          cursor: 'motion',
        },
        audio: {
          systemAudio: 'exclude',
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Window-specific capture for recording individual application windows with motion-based cursor visibility.',
      },
    },
  },
};

// Custom Event Handling Screen Capture Story
export const CustomEventHandlingScreenCapture: Story = {
  render: () => (
    <ScreenCaptureDemo
      options={{
        maxDuration: 60, // 1 minute limit
        onStreamStart: stream => {
          console.log('Screen capture started:', stream);
        },
        onStreamEnd: () => {
          console.log('Screen capture ended');
        },
        onRecordingComplete: blob => {
          console.log('Recording completed:', {
            size: `${(blob.size / 1024 / 1024).toFixed(2)}MB`,
            type: blob.type,
          });
        },
        onError: error => {
          console.error('Screen capture error:', error);
        },
        onPermissionDenied: () => {
          console.warn('Screen capture permission denied');
          alert(
            'Screen capture permission was denied. Please allow screen sharing to use this feature.'
          );
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Screen capture with comprehensive event handling including time limits, stream management, and error callbacks for advanced integration scenarios.',
      },
    },
  },
};
