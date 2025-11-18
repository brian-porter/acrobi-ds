/**
 * useVideoRecorder Hook Tests
 * Epic 44 - AAE Video Recording
 *
 * Comprehensive test suite for video recording functionality
 * with MediaRecorder API integration and camera management.
 */

import { renderHook, act } from '@testing-library/react';
import { useVideoRecorder } from './use-video-recorder';
import { VideoRecorderOptions } from './types/video-recorder';

// Mock MediaRecorder API
const mockMediaRecorder = {
  start: jest.fn(),
  stop: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  requestData: jest.fn(),
  state: 'inactive',
  mimeType: 'video/webm;codecs=vp9,opus',
  stream: null,
  ondataavailable: null,
  onstop: null,
  onerror: null,
  onstart: null,
  onpause: null,
  onresume: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
};

const mockMediaStream = {
  getTracks: jest.fn(() => [
    { stop: jest.fn(), kind: 'video', enabled: true },
    { stop: jest.fn(), kind: 'audio', enabled: true },
  ]),
  getVideoTracks: jest.fn(() => [
    { stop: jest.fn(), kind: 'video', enabled: true },
  ]),
  getAudioTracks: jest.fn(() => [
    { stop: jest.fn(), kind: 'audio', enabled: true },
  ]),
  active: true,
  id: 'mock-stream-id',
};

// Mock getUserMedia
const mockGetUserMedia = jest.fn(() => Promise.resolve(mockMediaStream));

// Mock device enumeration
const mockEnumerateDevices = jest.fn(() =>
  Promise.resolve([
    {
      deviceId: 'camera1',
      label: 'Front Camera',
      kind: 'videoinput',
      groupId: 'group1',
    },
    {
      deviceId: 'camera2',
      label: 'Back Camera',
      kind: 'videoinput',
      groupId: 'group2',
    },
  ])
);

// Mock permissions API
const mockPermissions = {
  query: jest.fn(() => Promise.resolve({ state: 'granted' })),
};

// Setup global mocks
beforeAll(() => {
  global.MediaRecorder = jest.fn(() => mockMediaRecorder) as any;
  global.MediaRecorder.isTypeSupported = jest.fn(() => true);

  global.navigator = {
    ...global.navigator,
    mediaDevices: {
      getUserMedia: mockGetUserMedia,
      enumerateDevices: mockEnumerateDevices,
    },
    permissions: mockPermissions,
    onLine: true,
  } as any;

  global.URL = {
    ...global.URL,
    createObjectURL: jest.fn(() => 'mock-object-url'),
    revokeObjectURL: jest.fn(),
  } as any;

  // Mock canvas for frame capture
  global.HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    drawImage: jest.fn(),
    getImageData: jest.fn(),
  })) as any;

  global.HTMLCanvasElement.prototype.toDataURL = jest.fn(
    () => 'data:image/png;base64,mock-image-data'
  );
});

describe('useVideoRecorder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockMediaRecorder.state = 'inactive';
  });

  describe('Initialization', () => {
    test('should initialize with default state', () => {
      const { result } = renderHook(() => useVideoRecorder());

      expect(result.current.state.isRecording).toBe(false);
      expect(result.current.state.isPaused).toBe(false);
      expect(result.current.state.isSupported).toBe(true);
      expect(result.current.state.duration).toBe(0);
      expect(result.current.state.recordingSize).toBe(0);
      expect(result.current.videoBlob).toBeNull();
      expect(result.current.videoUrl).toBeNull();
      expect(result.current.error).toBeNull();
    });

    test('should accept custom options', () => {
      const options: VideoRecorderOptions = {
        width: 1920,
        height: 1080,
        frameRate: 60,
        mimeType: 'video/mp4',
        facingMode: 'environment',
      };

      const { result } = renderHook(() => useVideoRecorder(options));

      expect(result.current.state.currentResolution.width).toBe(1920);
      expect(result.current.state.currentResolution.height).toBe(1080);
      expect(result.current.state.currentFrameRate).toBe(60);
    });

    test('should detect MediaRecorder support', () => {
      const { result } = renderHook(() => useVideoRecorder());
      expect(result.current.state.isSupported).toBe(true);
    });

    test('should handle unsupported MediaRecorder', () => {
      // Temporarily remove MediaRecorder
      const originalMediaRecorder = global.MediaRecorder;
      delete (global as any).MediaRecorder;

      const { result } = renderHook(() => useVideoRecorder());
      expect(result.current.state.isSupported).toBe(false);

      // Restore MediaRecorder
      global.MediaRecorder = originalMediaRecorder;
    });
  });

  describe('Device Management', () => {
    test('should get available devices', async () => {
      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        const devices = await result.current.getAvailableDevices();
        expect(devices).toHaveLength(2);
        expect(devices[0]).toEqual({
          deviceId: 'camera1',
          label: 'Front Camera',
          kind: 'videoinput',
          facingMode: 'user',
          groupId: 'group1',
        });
      });

      expect(mockEnumerateDevices).toHaveBeenCalled();
    });

    test('should handle device enumeration errors', async () => {
      mockEnumerateDevices.mockRejectedValueOnce(
        new Error('Device access denied')
      );

      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        const devices = await result.current.getAvailableDevices();
        expect(devices).toHaveLength(0);
        expect(result.current.error?.type).toBe('device');
      });
    });

    test('should switch camera devices', async () => {
      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        const success = await result.current.switchCamera('camera2');
        expect(success).toBe(true);
        expect(mockGetUserMedia).toHaveBeenCalledWith(
          expect.objectContaining({
            video: expect.objectContaining({
              deviceId: { exact: 'camera2' },
            }),
          })
        );
      });
    });

    test('should switch to front camera', async () => {
      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        const success = await result.current.switchToFrontCamera();
        expect(success).toBe(true);
      });
    });

    test('should switch to back camera', async () => {
      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        const success = await result.current.switchToBackCamera();
        expect(success).toBe(false); // No back camera in mock data
      });
    });
  });

  describe('Permission Management', () => {
    test('should check camera permissions', async () => {
      const { result } = renderHook(() => useVideoRecorder());

      // Permissions should be checked during device enumeration
      await act(async () => {
        await result.current.getAvailableDevices();
      });

      expect(mockPermissions.query).toHaveBeenCalledWith({ name: 'camera' });
    });

    test('should handle permission denial', async () => {
      mockGetUserMedia.mockRejectedValueOnce(
        Object.assign(new Error('Permission denied'), {
          name: 'NotAllowedError',
        })
      );

      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        const success = await result.current.startRecording();
        expect(success).toBe(false);
        expect(result.current.error?.type).toBe('permission');
      });
    });

    test('should handle device not found error', async () => {
      mockGetUserMedia.mockRejectedValueOnce(
        Object.assign(new Error('Device not found'), { name: 'NotFoundError' })
      );

      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        const success = await result.current.startRecording();
        expect(success).toBe(false);
        expect(result.current.error?.type).toBe('device');
      });
    });
  });

  describe('Recording Controls', () => {
    test('should start recording', async () => {
      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        const success = await result.current.startRecording();
        expect(success).toBe(true);
        expect(result.current.state.isRecording).toBe(true);
        expect(mockMediaRecorder.start).toHaveBeenCalledWith(1000);
      });
    });

    test('should stop recording', async () => {
      const { result } = renderHook(() => useVideoRecorder());

      // Start recording first
      await act(async () => {
        await result.current.startRecording();
      });

      await act(async () => {
        const blob = await result.current.stopRecording();
        expect(mockMediaRecorder.stop).toHaveBeenCalled();
      });
    });

    test('should pause recording', async () => {
      const { result } = renderHook(() => useVideoRecorder());

      // Start recording first
      await act(async () => {
        await result.current.startRecording();
      });

      act(() => {
        result.current.pauseRecording();
        expect(mockMediaRecorder.pause).toHaveBeenCalled();
      });
    });

    test('should resume recording', async () => {
      const { result } = renderHook(() => useVideoRecorder());

      // Start and pause recording first
      await act(async () => {
        await result.current.startRecording();
      });

      act(() => {
        result.current.pauseRecording();
        result.current.resumeRecording();
        expect(mockMediaRecorder.resume).toHaveBeenCalled();
      });
    });

    test('should cancel recording', async () => {
      const { result } = renderHook(() => useVideoRecorder());

      // Start recording first
      await act(async () => {
        await result.current.startRecording();
      });

      act(() => {
        result.current.cancelRecording();
        expect(mockMediaRecorder.stop).toHaveBeenCalled();
        expect(result.current.state.isRecording).toBe(false);
        expect(result.current.state.duration).toBe(0);
      });
    });

    test('should handle recording without MediaRecorder support', async () => {
      // Temporarily remove MediaRecorder
      const originalMediaRecorder = global.MediaRecorder;
      delete (global as any).MediaRecorder;

      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        const success = await result.current.startRecording();
        expect(success).toBe(false);
        expect(result.current.error?.type).toBe('recording');
      });

      // Restore MediaRecorder
      global.MediaRecorder = originalMediaRecorder;
    });
  });

  describe('Video Data Handling', () => {
    test('should handle data available events', async () => {
      const mockBlob = new Blob(['video data'], { type: 'video/webm' });
      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        await result.current.startRecording();
      });

      // Simulate data available event
      act(() => {
        if (mockMediaRecorder.ondataavailable) {
          mockMediaRecorder.ondataavailable({ data: mockBlob } as BlobEvent);
        }
      });

      expect(result.current.state.recordingSize).toBeGreaterThan(0);
    });

    test('should handle recording stop events', async () => {
      const mockBlob = new Blob(['video data'], { type: 'video/webm' });
      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        await result.current.startRecording();
      });

      // Add data chunk first
      act(() => {
        if (mockMediaRecorder.ondataavailable) {
          mockMediaRecorder.ondataavailable({ data: mockBlob } as BlobEvent);
        }
      });

      // Simulate stop event
      act(() => {
        if (mockMediaRecorder.onstop) {
          mockMediaRecorder.onstop(new Event('stop'));
        }
      });

      expect(result.current.videoBlob).toBeTruthy();
      expect(result.current.videoUrl).toBe('mock-object-url');
      expect(result.current.state.isRecording).toBe(false);
    });

    test('should clear recording data', () => {
      const { result } = renderHook(() => useVideoRecorder());

      act(() => {
        result.current.clearRecording();
        expect(result.current.videoBlob).toBeNull();
        expect(result.current.videoUrl).toBeNull();
        expect(result.current.state.duration).toBe(0);
      });
    });

    test('should download recording', () => {
      const mockBlob = new Blob(['video data'], { type: 'video/webm' });
      const { result } = renderHook(() => useVideoRecorder());

      // Mock blob in state
      act(() => {
        // Simulate having a recording
        if (mockMediaRecorder.ondataavailable) {
          mockMediaRecorder.ondataavailable({ data: mockBlob } as BlobEvent);
        }
        if (mockMediaRecorder.onstop) {
          mockMediaRecorder.onstop(new Event('stop'));
        }
      });

      // Mock DOM elements for download
      const mockAnchor = {
        href: '',
        download: '',
        click: jest.fn(),
      };
      jest.spyOn(document, 'createElement').mockReturnValue(mockAnchor as any);
      jest.spyOn(document.body, 'appendChild').mockImplementation();
      jest.spyOn(document.body, 'removeChild').mockImplementation();

      act(() => {
        result.current.downloadRecording('test-video.webm');
        expect(mockAnchor.download).toBe('test-video.webm');
        expect(mockAnchor.click).toHaveBeenCalled();
      });
    });
  });

  describe('Video Quality and Settings', () => {
    test('should set video resolution', async () => {
      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        const success = await result.current.setResolution(1920, 1080);
        expect(success).toBe(true);
        expect(result.current.state.currentResolution.width).toBe(1920);
        expect(result.current.state.currentResolution.height).toBe(1080);
      });
    });

    test('should set frame rate', async () => {
      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        const success = await result.current.setFrameRate(60);
        expect(success).toBe(true);
        expect(result.current.state.currentFrameRate).toBe(60);
      });
    });

    test('should set quality presets', async () => {
      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        const success = await result.current.setQuality('high');
        expect(success).toBe(true);
        expect(result.current.state.currentResolution.width).toBe(1280);
        expect(result.current.state.currentResolution.height).toBe(720);
        expect(result.current.state.currentFrameRate).toBe(30);
      });
    });

    test('should handle invalid quality preset', async () => {
      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        const success = await result.current.setQuality('invalid' as any);
        expect(success).toBe(false);
      });
    });
  });

  describe('Frame Capture and Thumbnails', () => {
    test('should capture frame from video preview', () => {
      const { result } = renderHook(() => useVideoRecorder());

      // Mock video element
      const mockVideoElement = {
        videoWidth: 640,
        videoHeight: 480,
      };

      if (result.current.previewRef.current) {
        Object.assign(result.current.previewRef.current, mockVideoElement);
      }

      act(() => {
        const frame = result.current.captureFrame();
        expect(frame).toBe('data:image/png;base64,mock-image-data');
      });
    });

    test('should generate thumbnail', () => {
      const { result } = renderHook(() => useVideoRecorder());

      // Mock video element
      const mockVideoElement = {
        videoWidth: 640,
        videoHeight: 480,
      };

      if (result.current.previewRef.current) {
        Object.assign(result.current.previewRef.current, mockVideoElement);
      }

      act(() => {
        const thumbnail = result.current.generateThumbnail();
        expect(thumbnail).toBe('data:image/png;base64,mock-image-data');
      });
    });

    test('should handle frame capture errors', () => {
      const { result } = renderHook(() => useVideoRecorder());

      // Mock canvas context to return null
      global.HTMLCanvasElement.prototype.getContext = jest.fn(() => null);

      act(() => {
        const frame = result.current.captureFrame();
        expect(frame).toBeNull();
        expect(result.current.error?.type).toBe('recording');
      });
    });
  });

  describe('Duration and Formatting', () => {
    test('should get recording duration', () => {
      const { result } = renderHook(() => useVideoRecorder());

      const duration = result.current.getRecordingDuration();
      expect(duration).toBe(0);
    });

    test('should format duration correctly', () => {
      const { result } = renderHook(() => useVideoRecorder());

      expect(result.current.formatDuration(0)).toBe('00:00');
      expect(result.current.formatDuration(65)).toBe('01:05');
      expect(result.current.formatDuration(3661)).toBe('01:01:01');
    });
  });

  describe('Integration Features', () => {
    test('should provide keyboard shortcuts', () => {
      const { result } = renderHook(() => useVideoRecorder());

      expect(result.current.keyboardShortcuts).toEqual({
        spacebar: 'Toggle recording',
        escape: 'Stop recording',
        p: 'Pause/Resume recording',
        c: 'Capture frame',
        s: 'Switch camera',
      });
    });

    test('should report network availability', () => {
      const { result } = renderHook(() => useVideoRecorder());

      expect(result.current.isNetworkAvailable).toBe(true);
    });

    test('should handle max duration limit', async () => {
      const options: VideoRecorderOptions = {
        maxDuration: 5000, // 5 seconds
      };

      const { result } = renderHook(() => useVideoRecorder(options));

      await act(async () => {
        await result.current.startRecording();
      });

      // Simulate time passing
      jest.useFakeTimers();

      act(() => {
        jest.advanceTimersByTime(6000); // 6 seconds
      });

      expect(mockMediaRecorder.stop).toHaveBeenCalled();

      jest.useRealTimers();
    });
  });

  describe('Error Handling', () => {
    test('should handle MediaRecorder errors', async () => {
      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        await result.current.startRecording();
      });

      // Simulate recording error
      act(() => {
        if (mockMediaRecorder.onerror) {
          mockMediaRecorder.onerror(new Event('error'));
        }
      });

      expect(result.current.error?.type).toBe('recording');
    });

    test('should handle stream access errors', async () => {
      mockGetUserMedia.mockRejectedValueOnce(new Error('Stream access failed'));

      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        const success = await result.current.startRecording();
        expect(success).toBe(false);
        expect(result.current.error?.type).toBe('stream');
      });
    });

    test('should clear errors', async () => {
      mockGetUserMedia.mockRejectedValueOnce(new Error('Test error'));

      const { result } = renderHook(() => useVideoRecorder());

      await act(async () => {
        await result.current.startRecording();
        expect(result.current.error).toBeTruthy();
      });

      // Errors should be cleared on successful operations
      await act(async () => {
        await result.current.getAvailableDevices();
        expect(result.current.error).toBeNull();
      });
    });
  });

  describe('Cleanup and Resource Management', () => {
    test('should cleanup resources on unmount', () => {
      const { result, unmount } = renderHook(() => useVideoRecorder());

      // Start recording to create resources
      act(async () => {
        await result.current.startRecording();
      });

      unmount();

      // Verify cleanup
      expect(mockMediaStream.getTracks()[0].stop).toHaveBeenCalled();
      expect(global.URL.revokeObjectURL).toHaveBeenCalled();
    });

    test('should stop active recording on unmount', () => {
      const { result, unmount } = renderHook(() => useVideoRecorder());

      act(async () => {
        await result.current.startRecording();
      });

      unmount();

      expect(mockMediaRecorder.stop).toHaveBeenCalled();
    });
  });

  describe('MIME Type Support', () => {
    test('should detect supported MIME types', () => {
      // Mock different support levels
      global.MediaRecorder.isTypeSupported = jest.fn(type => {
        return type === 'video/webm;codecs=vp9,opus' || type === 'video/webm';
      });

      const { result } = renderHook(() => useVideoRecorder());

      // The hook should use the most supported format
      expect(global.MediaRecorder.isTypeSupported).toHaveBeenCalledWith(
        'video/webm;codecs=vp9,opus'
      );
    });

    test('should fallback to basic webm format', () => {
      // Mock no advanced codec support
      global.MediaRecorder.isTypeSupported = jest.fn(type => {
        return type === 'video/webm';
      });

      const { result } = renderHook(() => useVideoRecorder());

      expect(global.MediaRecorder.isTypeSupported).toHaveBeenCalledWith(
        'video/webm'
      );
    });
  });

  describe('Callback Handling', () => {
    test('should call onRecordingComplete callback', async () => {
      const onRecordingComplete = jest.fn();
      const options: VideoRecorderOptions = {
        onRecordingComplete,
      };

      const { result } = renderHook(() => useVideoRecorder(options));

      await act(async () => {
        await result.current.startRecording();
      });

      // Simulate recording completion
      const mockBlob = new Blob(['video data'], { type: 'video/webm' });
      act(() => {
        if (mockMediaRecorder.ondataavailable) {
          mockMediaRecorder.ondataavailable({ data: mockBlob } as BlobEvent);
        }
        if (mockMediaRecorder.onstop) {
          mockMediaRecorder.onstop(new Event('stop'));
        }
      });

      expect(onRecordingComplete).toHaveBeenCalledWith(expect.any(Blob));
    });

    test('should call onError callback', async () => {
      const onError = jest.fn();
      const options: VideoRecorderOptions = {
        onError,
      };

      mockGetUserMedia.mockRejectedValueOnce(new Error('Test error'));

      const { result } = renderHook(() => useVideoRecorder(options));

      await act(async () => {
        await result.current.startRecording();
      });

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'stream',
          message: expect.any(String),
        })
      );
    });

    test('should call onPermissionDenied callback', async () => {
      const onPermissionDenied = jest.fn();
      const options: VideoRecorderOptions = {
        onPermissionDenied,
      };

      mockGetUserMedia.mockRejectedValueOnce(
        Object.assign(new Error('Permission denied'), {
          name: 'NotAllowedError',
        })
      );

      const { result } = renderHook(() => useVideoRecorder(options));

      await act(async () => {
        await result.current.startRecording();
      });

      expect(onPermissionDenied).toHaveBeenCalled();
    });

    test('should call onDataAvailable callback', async () => {
      const onDataAvailable = jest.fn();
      const options: VideoRecorderOptions = {
        onDataAvailable,
      };

      const { result } = renderHook(() => useVideoRecorder(options));

      await act(async () => {
        await result.current.startRecording();
      });

      // Simulate data available
      const mockBlob = new Blob(['video data'], { type: 'video/webm' });
      act(() => {
        if (mockMediaRecorder.ondataavailable) {
          mockMediaRecorder.ondataavailable({ data: mockBlob } as BlobEvent);
        }
      });

      expect(onDataAvailable).toHaveBeenCalledWith(mockBlob);
    });
  });
});
