/**
 * Video Recorder Hook Stories
 * Epic 44 - AAE Video Recording
 *
 * Comprehensive Storybook stories demonstrating video recording capabilities
 * with different configurations and use cases.
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useVideoRecorder } from './use-video-recorder';
import { VideoRecorderOptions } from './types/video-recorder';

const meta: Meta = {
  title: 'Hooks/useVideoRecorder',
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive video recording hook with MediaRecorder API integration, camera management, and real-time preview capabilities.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Video Recorder Component for Stories
const VideoRecorderDemo: React.FC<{ options?: VideoRecorderOptions }> = ({
  options,
}) => {
  const {
    state,
    error,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,
    getAvailableDevices,
    switchCamera,
    switchToFrontCamera,
    switchToBackCamera,
    captureFrame,
    generateThumbnail,
    previewRef,
    videoBlob,
    videoUrl,
    clearRecording,
    downloadRecording,
    formatDuration,
    setQuality,
    isNetworkAvailable,
    keyboardShortcuts,
  } = useVideoRecorder(options);

  const [devices, setDevices] = useState<any[]>([]);
  const [capturedFrame, setCapturedFrame] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    getAvailableDevices().then(setDevices);
  }, [getAvailableDevices]);

  const handleCaptureFrame = () => {
    const frame = captureFrame();
    setCapturedFrame(frame);
  };

  const handleGenerateThumbnail = () => {
    const thumb = generateThumbnail();
    setThumbnail(thumb);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>Video Recorder Demo</h2>

      {/* Status Display */}
      <div
        style={{
          padding: '10px',
          backgroundColor: state.isRecording ? '#e8f5e8' : '#f5f5f5',
          border: `2px solid ${state.isRecording ? '#4caf50' : '#ddd'}`,
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h3>Status</h3>
        <p>
          <strong>Recording:</strong> {state.isRecording ? '🔴 Yes' : '⚫ No'}
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
          <strong>Resolution:</strong> {state.currentResolution.width}x
          {state.currentResolution.height}
        </p>
        <p>
          <strong>Frame Rate:</strong> {state.currentFrameRate} fps
        </p>
        <p>
          <strong>Permissions:</strong>
          Camera: {state.hasCameraPermission ? '✅' : '❌'}, Microphone:{' '}
          {state.hasMicrophonePermission ? '✅' : '❌'}
        </p>
        <p>
          <strong>Network:</strong>{' '}
          {isNetworkAvailable ? '🌐 Online' : '📴 Offline'}
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div
          style={{
            padding: '10px',
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
        </div>
      )}

      {/* Video Preview */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Live Preview</h3>
        <video
          ref={previewRef}
          autoPlay
          muted
          playsInline
          style={{
            width: '100%',
            maxWidth: '400px',
            height: 'auto',
            border: '2px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#000',
          }}
        />
      </div>

      {/* Recording Controls */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Recording Controls</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={startRecording}
            disabled={state.isRecording}
            style={{
              padding: '10px 20px',
              backgroundColor: state.isRecording ? '#ccc' : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: state.isRecording ? 'not-allowed' : 'pointer',
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
            ⏹️ Stop
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

      {/* Camera Controls */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Camera Controls</h3>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '10px',
          }}
        >
          <button
            onClick={switchToFrontCamera}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🤳 Front Camera
          </button>

          <button
            onClick={switchToBackCamera}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            📷 Back Camera
          </button>

          <button
            onClick={handleCaptureFrame}
            style={{
              padding: '10px 20px',
              backgroundColor: '#9c27b0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            📸 Capture Frame
          </button>

          <button
            onClick={handleGenerateThumbnail}
            style={{
              padding: '10px 20px',
              backgroundColor: '#9c27b0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🖼️ Generate Thumbnail
          </button>
        </div>

        {/* Device Selection */}
        {devices.length > 0 && (
          <div>
            <label htmlFor='device-select' style={{ marginRight: '10px' }}>
              Camera Device:
            </label>
            <select
              id='device-select'
              onChange={e => switchCamera(e.target.value)}
              style={{ padding: '5px 10px' }}
            >
              <option value=''>Select Camera</option>
              {devices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label} {device.facingMode && `(${device.facingMode})`}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Quality Controls */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Quality Controls</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['low', 'medium', 'high', 'ultra'].map(quality => (
            <button
              key={quality}
              onClick={() => setQuality(quality as any)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#607d8b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {quality} Quality
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Keyboard Shortcuts</h3>
        <ul>
          {Object.entries(keyboardShortcuts).map(([key, action]) => (
            <li key={key}>
              <strong>{key}:</strong> {action}
            </li>
          ))}
        </ul>
      </div>

      {/* Captured Content */}
      {(capturedFrame || thumbnail) && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Captured Content</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {capturedFrame && (
              <div>
                <h4>Captured Frame</h4>
                <img
                  src={capturedFrame}
                  alt='Captured frame'
                  style={{ maxWidth: '200px', border: '1px solid #ddd' }}
                />
              </div>
            )}
            {thumbnail && (
              <div>
                <h4>Thumbnail</h4>
                <img
                  src={thumbnail}
                  alt='Thumbnail'
                  style={{ maxWidth: '150px', border: '1px solid #ddd' }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recorded Video */}
      {videoUrl && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Recorded Video</h3>
          <video
            src={videoUrl}
            controls
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              border: '2px solid #4caf50',
              borderRadius: '8px',
            }}
          />
          <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
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
              💾 Download
            </button>
            <button
              onClick={clearRecording}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🗑️ Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Basic Video Recorder Story
export const BasicVideoRecorder: Story = {
  render: () => <VideoRecorderDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic video recorder with default settings. Includes recording controls, live preview, and playback capabilities.',
      },
    },
  },
};

// High Quality Video Recorder Story
export const HighQualityVideoRecorder: Story = {
  render: () => (
    <VideoRecorderDemo
      options={{
        width: 1920,
        height: 1080,
        frameRate: 60,
        videoBitsPerSecond: 5000000,
        mimeType: 'video/webm;codecs=vp9,opus',
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'High quality video recorder with 1080p resolution, 60fps frame rate, and high bitrate for professional recording.',
      },
    },
  },
};

// Mobile Video Recorder Story
export const MobileVideoRecorder: Story = {
  render: () => (
    <VideoRecorderDemo
      options={{
        width: 720,
        height: 1280,
        frameRate: 30,
        facingMode: 'environment',
        aspectRatio: 9 / 16,
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Mobile-optimized video recorder with portrait orientation and back camera default for mobile recording scenarios.',
      },
    },
  },
};

// Audio-Free Video Recorder Story
export const AudioFreeVideoRecorder: Story = {
  render: () => (
    <VideoRecorderDemo
      options={{
        includeAudio: false,
        width: 1280,
        height: 720,
        frameRate: 30,
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Video recorder without audio capture, useful for silent recording scenarios or when audio permissions are not available.',
      },
    },
  },
};

// Low Quality Video Recorder Story
export const LowQualityVideoRecorder: Story = {
  render: () => (
    <VideoRecorderDemo
      options={{
        width: 480,
        height: 360,
        frameRate: 15,
        videoBitsPerSecond: 500000,
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Low quality video recorder optimized for bandwidth-constrained environments or storage-limited scenarios.',
      },
    },
  },
};

// Custom Configuration Video Recorder Story
export const CustomConfigurationVideoRecorder: Story = {
  render: () => (
    <VideoRecorderDemo
      options={{
        maxDuration: 30000, // 30 seconds
        mimeType: 'video/mp4',
        onRecordingComplete: blob => {
          console.log('Recording completed:', blob);
        },
        onError: error => {
          console.error('Recording error:', error);
        },
        onPermissionDenied: () => {
          console.warn('Permission denied');
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Video recorder with custom configuration including time limits, MP4 format, and event handlers for advanced integration scenarios.',
      },
    },
  },
};
