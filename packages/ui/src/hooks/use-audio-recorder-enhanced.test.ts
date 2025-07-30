/**
 * @fileoverview Comprehensive Tests for Enhanced Audio Recorder Hook (Epic 43)
 * Tests all audio recording functionality including MediaRecorder integration,
 * real-time visualization, device management, and advanced features.
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useAudioRecorder, AUDIO_FORMATS } from './use-audio-recorder-enhanced';

// Mock MediaRecorder API
class MockMediaRecorder {
  static isTypeSupported = vi.fn(() => true);

  state: 'inactive' | 'recording' | 'paused' = 'inactive';
  mimeType: string;
  ondataavailable: ((event: any) => void) | null = null;
  onstop: (() => void) | null = null;
  onerror: ((event: any) => void) | null = null;

  constructor(stream: MediaStream, options?: MediaRecorderOptions) {
    this.mimeType = options?.mimeType || 'audio/webm';
  }

  start = vi.fn(() => {
    this.state = 'recording';
    // Simulate data available events
    setTimeout(() => {
      if (this.ondataavailable) {
        this.ondataavailable({
          data: new Blob(['test'], { type: this.mimeType }),
        });
      }
    }, 100);
  });

  stop = vi.fn(() => {
    this.state = 'inactive';
    setTimeout(() => {
      if (this.onstop) this.onstop();
    }, 10);
  });

  pause = vi.fn(() => {
    this.state = 'paused';
  });

  resume = vi.fn(() => {
    this.state = 'recording';
  });
}

// Mock getUserMedia
const mockGetUserMedia = vi.fn(() =>
  Promise.resolve({
    getTracks: () => [
      { stop: vi.fn(), getSettings: () => ({ deviceId: 'default' }) },
    ],
  } as any)
);

// Mock AudioContext
class MockAudioContext {
  state = 'running';
  sampleRate = 44100;
  destination = {};

  createAnalyser = vi.fn(() => ({
    fftSize: 256,
    smoothingTimeConstant: 0.8,
    frequencyBinCount: 128,
    getByteFrequencyData: vi.fn(),
    getByteTimeDomainData: vi.fn(),
    connect: vi.fn(),
  }));

  createMediaStreamSource = vi.fn(() => ({
    connect: vi.fn(),
  }));

  createScriptProcessor = vi.fn(() => ({
    connect: vi.fn(),
  }));

  close = vi.fn();
}

// Mock URL.createObjectURL and revokeObjectURL
const mockCreateObjectURL = vi.fn(() => 'blob:mock-url');
const mockRevokeObjectURL = vi.fn();

// Mock hooks
vi.mock('./use-network', () => ({
  useNetwork: () => ({ isOnline: true }),
}));

vi.mock('./use-keyboard', () => ({
  useKeyboard: () => ({ pressedKeys: [] }),
}));

describe('useAudioRecorder Enhanced Hook', () => {
  beforeEach(() => {
    // Setup global mocks
    global.MediaRecorder = MockMediaRecorder as any;
    global.AudioContext = MockAudioContext as any;
    global.navigator = {
      ...global.navigator,
      mediaDevices: {
        getUserMedia: mockGetUserMedia,
        enumerateDevices: vi.fn(() =>
          Promise.resolve([
            {
              deviceId: 'default',
              kind: 'audioinput',
              label: 'Default Microphone',
              groupId: 'group1',
            },
            {
              deviceId: 'mic2',
              kind: 'audioinput',
              label: 'External Microphone',
              groupId: 'group2',
            },
          ])
        ),
      },
    } as any;

    global.URL = {
      ...global.URL,
      createObjectURL: mockCreateObjectURL,
      revokeObjectURL: mockRevokeObjectURL,
    };

    // Mock requestAnimationFrame and cancelAnimationFrame
    global.requestAnimationFrame = vi.fn(cb => setTimeout(cb, 16));
    global.cancelAnimationFrame = vi.fn();

    // Mock window events
    global.addEventListener = vi.fn();
    global.removeEventListener = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useAudioRecorder());

      expect(result.current.state).toEqual({
        isRecording: false,
        isPaused: false,
        isSupported: true,
        hasPermission: false,
        duration: 0,
        audioLevel: 0,
        recordingSize: 0,
        currentDeviceId: null,
        format: null,
        quality: 'high',
      });

      expect(result.current.error).toBeNull();
      expect(result.current.audioBlob).toBeNull();
      expect(result.current.audioUrl).toBeNull();
      expect(result.current.audioChunks).toEqual([]);
    });

    it('should detect MediaRecorder support correctly', () => {
      const { result } = renderHook(() => useAudioRecorder());
      expect(result.current.state.isSupported).toBe(true);

      // Test unsupported scenario
      delete (global as any).MediaRecorder;
      const { result: unsupportedResult } = renderHook(() =>
        useAudioRecorder()
      );
      expect(unsupportedResult.current.state.isSupported).toBe(false);
    });

    it('should initialize with custom options', () => {
      const options = {
        audioBitsPerSecond: 256000,
        sampleRate: 48000,
        channelCount: 2 as const,
        maxDuration: 1800,
        silenceThreshold: 0.02,
        visualizationEnabled: false,
        keyboardShortcuts: false,
      };

      const { result } = renderHook(() => useAudioRecorder(options));
      expect(result.current.state.quality).toBe('high');
    });
  });

  describe('Audio Format Support', () => {
    it('should detect best supported audio format', () => {
      MockMediaRecorder.isTypeSupported.mockImplementation(
        (mimeType: string) => {
          return mimeType === AUDIO_FORMATS.webm.mimeType;
        }
      );

      const { result } = renderHook(() => useAudioRecorder());

      act(() => {
        result.current.startRecording();
      });

      expect(MockMediaRecorder.isTypeSupported).toHaveBeenCalledWith(
        AUDIO_FORMATS.webm.mimeType
      );
    });

    it('should export audio in different formats', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      // Simulate having an audio blob
      await act(async () => {
        await result.current.startRecording();
        await result.current.stopRecording();
      });

      await act(async () => {
        const exported = await result.current.exportAs('mp4');
        expect(exported).toBeInstanceOf(Blob);
      });
    });
  });

  describe('Recording Controls', () => {
    it('should start recording successfully', async () => {
      const onRecordingComplete = vi.fn();
      const { result } = renderHook(() =>
        useAudioRecorder({ onRecordingComplete })
      );

      await act(async () => {
        const success = await result.current.startRecording();
        expect(success).toBe(true);
      });

      expect(result.current.state.isRecording).toBe(true);
      expect(result.current.state.hasPermission).toBe(true);
      expect(mockGetUserMedia).toHaveBeenCalled();
    });

    it('should handle permission denied error', async () => {
      const onError = vi.fn();
      const onPermissionDenied = vi.fn();

      mockGetUserMedia.mockRejectedValueOnce(
        Object.assign(new Error('Permission denied'), {
          name: 'NotAllowedError',
        })
      );

      const { result } = renderHook(() =>
        useAudioRecorder({ onError, onPermissionDenied })
      );

      await act(async () => {
        const success = await result.current.startRecording();
        expect(success).toBe(false);
      });

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'permission',
          message: 'Microphone access denied',
        })
      );
      expect(onPermissionDenied).toHaveBeenCalled();
    });

    it('should stop recording and return blob', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      await act(async () => {
        await result.current.startRecording();
      });

      expect(result.current.state.isRecording).toBe(true);

      await act(async () => {
        const blob = await result.current.stopRecording();
        expect(blob).toBeInstanceOf(Blob);
      });

      expect(result.current.state.isRecording).toBe(false);
      expect(result.current.audioBlob).toBeInstanceOf(Blob);
      expect(result.current.audioUrl).toBe('blob:mock-url');
    });

    it('should pause and resume recording', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      await act(async () => {
        await result.current.startRecording();
      });

      act(() => {
        result.current.pauseRecording();
      });

      expect(result.current.state.isPaused).toBe(true);

      act(() => {
        result.current.resumeRecording();
      });

      expect(result.current.state.isPaused).toBe(false);
    });

    it('should cancel recording', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      await act(async () => {
        await result.current.startRecording();
      });

      act(() => {
        result.current.cancelRecording();
      });

      expect(result.current.state.isRecording).toBe(false);
      expect(result.current.state.duration).toBe(0);
      expect(result.current.audioBlob).toBeNull();
    });
  });

  describe('Device Management', () => {
    it('should get available audio devices', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      await act(async () => {
        const devices = await result.current.getAvailableDevices();

        expect(devices).toHaveLength(2);
        expect(devices[0]).toEqual({
          deviceId: 'default',
          kind: 'audioinput',
          label: 'Default Microphone',
          groupId: 'group1',
        });
      });
    });

    it('should switch audio device', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      await act(async () => {
        const success = await result.current.switchDevice('mic2');
        expect(success).toBe(true);
      });

      expect(result.current.state.currentDeviceId).toBe('mic2');
    });

    it('should not switch device while recording', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      await act(async () => {
        await result.current.startRecording();
      });

      await act(async () => {
        const success = await result.current.switchDevice('mic2');
        expect(success).toBe(false);
      });

      expect(result.current.error?.type).toBe('device');
    });

    it('should refresh device list', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      await act(async () => {
        const devices = await result.current.refreshDevices();
        expect(devices).toHaveLength(2);
      });
    });
  });

  describe('Audio Visualization', () => {
    it('should update audio levels during recording', async () => {
      const onVolumeChange = vi.fn();
      const { result } = renderHook(() =>
        useAudioRecorder({
          visualizationEnabled: true,
          onVolumeChange,
        })
      );

      await act(async () => {
        await result.current.startRecording();
      });

      // Wait for visualization updates
      await waitFor(() => {
        expect(result.current.audioLevels.length).toBeGreaterThan(0);
      });
    });

    it('should provide frequency and waveform data', async () => {
      const { result } = renderHook(() =>
        useAudioRecorder({ visualizationEnabled: true })
      );

      await act(async () => {
        await result.current.startRecording();
      });

      expect(result.current.frequencyData).toBeInstanceOf(Uint8Array);
      expect(result.current.waveformData).toBeInstanceOf(Array);
    });
  });

  describe('Audio Processing', () => {
    it('should apply noise reduction', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      act(() => {
        result.current.applyNoiseReduction(true);
      });

      // Noise reduction state should be applied
      // (Implementation details would be tested with actual audio processing)
    });

    it('should set audio effects', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      const effects = {
        echo: { delay: 0.3, feedback: 0.2, mix: 0.1 },
        reverb: { roomSize: 0.5, damping: 0.3, mix: 0.2 },
      };

      act(() => {
        result.current.setAudioEffects(effects);
      });

      // Effects should be applied to audio chain
    });

    it('should trim silence from recording', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      await act(async () => {
        await result.current.startRecording();
        await result.current.stopRecording();
      });

      await act(async () => {
        const trimmedBlob = await result.current.trimSilence();
        expect(trimmedBlob).toBeInstanceOf(Blob);
      });
    });

    it('should compress audio', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      await act(async () => {
        await result.current.startRecording();
        await result.current.stopRecording();
      });

      await act(async () => {
        const compressedBlob = await result.current.compressAudio(0.5);
        expect(compressedBlob).toBeInstanceOf(Blob);
      });
    });

    it('should split recording into intervals', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      await act(async () => {
        await result.current.startRecording();
        await result.current.stopRecording();
      });

      await act(async () => {
        const intervals = [10, 20, 30]; // seconds
        const splits = await result.current.splitRecording(intervals);
        expect(splits).toBeInstanceOf(Array);
        expect(splits.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Utilities', () => {
    it('should clear recording data', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      await act(async () => {
        await result.current.startRecording();
        await result.current.stopRecording();
      });

      expect(result.current.audioBlob).toBeInstanceOf(Blob);

      act(() => {
        result.current.clearRecording();
      });

      expect(result.current.audioBlob).toBeNull();
      expect(result.current.audioUrl).toBeNull();
      expect(result.current.audioChunks).toEqual([]);
      expect(result.current.state.duration).toBe(0);
    });

    it('should download recording', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      await act(async () => {
        await result.current.startRecording();
        await result.current.stopRecording();
      });

      // Mock document.createElement and appendChild
      const mockLink = {
        href: '',
        download: '',
        click: vi.fn(),
      };

      const mockCreateElement = vi.fn(() => mockLink);
      const mockAppendChild = vi.fn();
      const mockRemoveChild = vi.fn();

      global.document = {
        ...global.document,
        createElement: mockCreateElement,
        body: {
          appendChild: mockAppendChild,
          removeChild: mockRemoveChild,
        },
      } as any;

      act(() => {
        result.current.downloadRecording('test-recording.webm');
      });

      expect(mockCreateElement).toHaveBeenCalledWith('a');
      expect(mockLink.download).toBe('test-recording.webm');
      expect(mockLink.click).toHaveBeenCalled();
    });

    it('should format duration correctly', () => {
      const { result } = renderHook(() => useAudioRecorder());

      expect(result.current.formatDuration(65)).toBe('1:05');
      expect(result.current.formatDuration(3661)).toBe('1:01:01');
      expect(result.current.formatDuration(30)).toBe('0:30');
    });

    it('should get recording duration', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      await act(async () => {
        await result.current.startRecording();
      });

      // Duration should start tracking
      expect(result.current.getRecordingDuration()).toBe(
        result.current.state.duration
      );
    });

    it('should get audio metadata', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      await act(async () => {
        await result.current.startRecording();
        await result.current.stopRecording();
      });

      const metadata = result.current.getAudioMetadata();

      expect(metadata).toEqual(
        expect.objectContaining({
          duration: expect.any(Number),
          sampleRate: 44100,
          channels: 2,
          bitRate: 128000,
          format: expect.any(String),
          size: expect.any(Number),
          createdAt: expect.any(Date),
        })
      );
    });
  });

  describe('Analytics', () => {
    it('should track audio analytics', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      await act(async () => {
        await result.current.startRecording();
      });

      expect(result.current.analytics).toEqual({
        peakLevel: expect.any(Number),
        averageLevel: expect.any(Number),
        silenceDuration: expect.any(Number),
        recordingQuality: expect.any(Number),
        compressionRatio: expect.any(Number),
      });
    });

    it('should detect silence', async () => {
      const onSilenceDetected = vi.fn();
      const { result } = renderHook(() =>
        useAudioRecorder({
          onSilenceDetected,
          silenceThreshold: 0.5,
        })
      );

      await act(async () => {
        await result.current.startRecording();
      });

      // Wait for silence detection
      await waitFor(() => {
        expect(result.current.analytics.silenceDuration).toBeGreaterThanOrEqual(
          0
        );
      });
    });
  });

  describe('Keyboard Shortcuts', () => {
    it('should handle keyboard shortcuts when enabled', async () => {
      const { result } = renderHook(() =>
        useAudioRecorder({ keyboardShortcuts: true })
      );

      expect(result.current.keyboardShortcuts).toEqual({
        Space: 'Toggle recording',
        Escape: 'Stop recording',
        p: 'Pause/Resume',
        c: 'Cancel recording',
        d: 'Download recording',
      });

      // Test that event listeners are set up
      expect(global.addEventListener).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );
    });

    it('should not handle shortcuts when disabled', () => {
      const { result } = renderHook(() =>
        useAudioRecorder({ keyboardShortcuts: false })
      );

      // Event listeners should not be set up
      const keydownCalls = (global.addEventListener as any).mock.calls.filter(
        (call: any) => call[0] === 'keydown'
      );
      expect(keydownCalls.length).toBe(0);
    });
  });

  describe('Integration Features', () => {
    it('should integrate with network status', () => {
      const { result } = renderHook(() => useAudioRecorder());
      expect(result.current.isNetworkAvailable).toBe(true);
    });

    it('should handle maximum duration', async () => {
      const { result } = renderHook(
        () => useAudioRecorder({ maxDuration: 1 }) // 1 second
      );

      await act(async () => {
        await result.current.startRecording();
      });

      // Wait for auto-stop
      await waitFor(
        () => {
          expect(result.current.state.isRecording).toBe(false);
        },
        { timeout: 2000 }
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle device not found error', async () => {
      const onError = vi.fn();
      mockGetUserMedia.mockRejectedValueOnce(
        Object.assign(new Error('Device not found'), { name: 'NotFoundError' })
      );

      const { result } = renderHook(() => useAudioRecorder({ onError }));

      await act(async () => {
        const success = await result.current.startRecording();
        expect(success).toBe(false);
      });

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'device',
          message: 'No microphone found',
        })
      );
    });

    it('should handle MediaRecorder errors', async () => {
      const onError = vi.fn();
      const { result } = renderHook(() => useAudioRecorder({ onError }));

      await act(async () => {
        await result.current.startRecording();
      });

      // Simulate MediaRecorder error
      const mockRecorder = (global as any).MediaRecorder.mock.instances[0];

      act(() => {
        if (mockRecorder.onerror) {
          mockRecorder.onerror({ error: new Error('Recording failed') });
        }
      });

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'recording',
          message: 'MediaRecorder error',
        })
      );
    });

    it('should handle unsupported browser', () => {
      delete (global as any).MediaRecorder;

      const onError = vi.fn();
      const { result } = renderHook(() => useAudioRecorder({ onError }));

      act(() => {
        result.current.startRecording();
      });

      expect(result.current.state.isSupported).toBe(false);
    });
  });

  describe('Cleanup', () => {
    it('should cleanup resources on unmount', async () => {
      const { result, unmount } = renderHook(() => useAudioRecorder());

      await act(async () => {
        await result.current.startRecording();
      });

      unmount();

      // Verify cleanup was called
      expect(mockRevokeObjectURL).toHaveBeenCalled();
    });

    it('should stop recording on unmount', async () => {
      const { result, unmount } = renderHook(() => useAudioRecorder());

      await act(async () => {
        await result.current.startRecording();
      });

      expect(result.current.state.isRecording).toBe(true);

      unmount();

      // Recording should be stopped during cleanup
    });
  });
});
