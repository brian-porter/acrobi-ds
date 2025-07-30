import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useAudioRecorder, AUDIO_FORMATS } from './use-audio-recorder';

// Mock MediaRecorder
class MockMediaRecorder {
  public state: RecordingState = 'inactive';
  public ondataavailable: ((event: BlobEvent) => void) | null = null;
  public onstop: (() => void) | null = null;
  public onerror: ((event: MediaRecorderErrorEvent) => void) | null = null;
  public stream: MediaStream;
  public static isTypeSupported = vi.fn().mockReturnValue(true);

  constructor(stream: MediaStream, options?: MediaRecorderOptions) {
    this.stream = stream;
  }

  start(timeslice?: number) {
    this.state = 'recording';
    // Simulate data available
    setTimeout(() => {
      if (this.ondataavailable) {
        const blob = new Blob(['audio data'], { type: 'audio/webm' });
        this.ondataavailable({ data: blob } as BlobEvent);
      }
    }, 100);
  }

  stop() {
    this.state = 'inactive';
    if (this.onstop) {
      this.onstop();
    }
  }

  pause() {
    this.state = 'paused';
  }

  resume() {
    this.state = 'recording';
  }
}

// Mock AudioContext
class MockAudioContext {
  public destination: any = {};
  public createAnalyser = vi.fn().mockReturnValue({
    fftSize: 256,
    smoothingTimeConstant: 0.8,
    frequencyBinCount: 128,
    getByteFrequencyData: vi.fn().mockImplementation(array => {
      // Fill with mock frequency data
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.random() * 255;
      }
    }),
  });
  public createMediaStreamSource = vi.fn().mockReturnValue({
    connect: vi.fn(),
  });
  public close = vi.fn();
}

// Mock getUserMedia
const mockGetUserMedia = vi.fn();
const mockEnumerateDevices = vi.fn();

// Setup global mocks
beforeAll(() => {
  global.MediaRecorder = MockMediaRecorder as any;
  global.AudioContext = MockAudioContext as any;
  (global as any).webkitAudioContext = MockAudioContext;

  Object.defineProperty(global.navigator, 'mediaDevices', {
    writable: true,
    value: {
      getUserMedia: mockGetUserMedia,
      enumerateDevices: mockEnumerateDevices,
    },
  });

  // Mock URL.createObjectURL and revokeObjectURL
  global.URL.createObjectURL = vi.fn().mockReturnValue('blob:mock-url');
  global.URL.revokeObjectURL = vi.fn();

  // Mock Blob
  global.Blob = vi.fn().mockImplementation((parts, options) => ({
    size: parts.reduce(
      (sum: number, part: any) => sum + (part.length || 10),
      0
    ),
    type: options?.type || 'audio/webm',
  })) as any;
});

beforeEach(() => {
  vi.clearAllMocks();

  // Default mock implementations
  mockGetUserMedia.mockResolvedValue({
    getTracks: vi.fn().mockReturnValue([{ stop: vi.fn() }]),
  });

  mockEnumerateDevices.mockResolvedValue([
    {
      deviceId: 'device1',
      label: 'Default Microphone',
      kind: 'audioinput',
      groupId: 'group1',
    },
    {
      deviceId: 'device2',
      label: 'USB Microphone',
      kind: 'audioinput',
      groupId: 'group2',
    },
  ]);
});

describe('useAudioRecorder', () => {
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
      });

      expect(result.current.error).toBeNull();
      expect(result.current.audioBlob).toBeNull();
      expect(result.current.audioUrl).toBeNull();
      expect(result.current.audioChunks).toEqual([]);
    });

    it('should detect MediaRecorder support', () => {
      const { result } = renderHook(() => useAudioRecorder());
      expect(result.current.state.isSupported).toBe(true);
    });

    it('should use provided options', () => {
      const options = {
        mimeType: 'audio/mp4',
        audioBitsPerSecond: 64000,
        channelCount: 2 as const,
      };

      const { result } = renderHook(() => useAudioRecorder(options));
      expect(result.current.state.isSupported).toBe(true);
    });
  });

  describe('Device Management', () => {
    it('should get available audio devices', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      let devices: any[];
      await act(async () => {
        devices = await result.current.getAvailableDevices();
      });

      expect(devices!).toEqual([
        {
          deviceId: 'device1',
          label: 'Default Microphone',
          kind: 'audioinput',
          groupId: 'group1',
        },
        {
          deviceId: 'device2',
          label: 'USB Microphone',
          kind: 'audioinput',
          groupId: 'group2',
        },
      ]);
    });

    it('should handle device enumeration errors', async () => {
      mockEnumerateDevices.mockRejectedValueOnce(
        new Error('Device access denied')
      );

      const { result } = renderHook(() => useAudioRecorder());

      let devices: any[];
      await act(async () => {
        devices = await result.current.getAvailableDevices();
      });

      expect(devices!).toEqual([]);
      expect(result.current.error).toEqual({
        type: 'device',
        message: 'Failed to enumerate audio devices',
        originalError: expect.any(Error),
      });
    });
  });

  describe('Recording Controls', () => {
    it('should start recording successfully', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      let success: boolean;
      await act(async () => {
        success = await result.current.startRecording();
      });

      expect(success!).toBe(true);
      expect(result.current.state.isRecording).toBe(true);
      expect(result.current.state.hasPermission).toBe(true);
      expect(mockGetUserMedia).toHaveBeenCalledWith({
        audio: {
          deviceId: undefined,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
          channelCount: 1,
        },
      });
    });

    it('should handle permission denied', async () => {
      const onPermissionDenied = vi.fn();
      const permissionError = new Error('NotAllowedError');
      (permissionError as any).name = 'NotAllowedError';
      mockGetUserMedia.mockRejectedValueOnce(permissionError);

      const { result } = renderHook(() =>
        useAudioRecorder({ onPermissionDenied })
      );

      let success: boolean;
      await act(async () => {
        success = await result.current.startRecording();
      });

      expect(success!).toBe(false);
      expect(result.current.error?.type).toBe('permission');
      expect(onPermissionDenied).toHaveBeenCalled();
    });

    it('should stop recording and return blob', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      // Start recording first
      await act(async () => {
        await result.current.startRecording();
      });

      // Stop recording
      let blob: Blob | null;
      await act(async () => {
        blob = await result.current.stopRecording();
      });

      expect(blob!).toBeDefined();
      expect(result.current.state.isRecording).toBe(false);
      expect(result.current.audioBlob).toBeDefined();
      expect(result.current.audioUrl).toBe('blob:mock-url');
    });

    it('should pause and resume recording', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      // Start recording
      await act(async () => {
        await result.current.startRecording();
      });

      // Pause recording
      act(() => {
        result.current.pauseRecording();
      });

      expect(result.current.state.isPaused).toBe(true);

      // Resume recording
      act(() => {
        result.current.resumeRecording();
      });

      expect(result.current.state.isPaused).toBe(false);
    });

    it('should cancel recording', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      // Start recording
      await act(async () => {
        await result.current.startRecording();
      });

      // Cancel recording
      act(() => {
        result.current.cancelRecording();
      });

      expect(result.current.audioBlob).toBeNull();
      expect(result.current.audioUrl).toBeNull();
    });
  });

  describe('Audio Data Management', () => {
    it('should handle data available events', async () => {
      const onDataAvailable = vi.fn();
      const { result } = renderHook(() =>
        useAudioRecorder({ onDataAvailable })
      );

      await act(async () => {
        await result.current.startRecording();
      });

      // Wait for data available event
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 150));
      });

      expect(onDataAvailable).toHaveBeenCalled();
      expect(result.current.audioChunks.length).toBeGreaterThan(0);
    });

    it('should clear recording data', () => {
      const { result } = renderHook(() => useAudioRecorder());

      act(() => {
        result.current.clearRecording();
      });

      expect(result.current.audioBlob).toBeNull();
      expect(result.current.audioUrl).toBeNull();
      expect(result.current.audioChunks).toEqual([]);
    });

    it('should download recording', async () => {
      // Mock document and createElement
      const mockA = {
        href: '',
        download: '',
        click: vi.fn(),
      };

      vi.spyOn(document, 'createElement').mockReturnValue(mockA as any);
      vi.spyOn(document.body, 'appendChild').mockImplementation(
        () => mockA as any
      );
      vi.spyOn(document.body, 'removeChild').mockImplementation(
        () => mockA as any
      );

      const { result } = renderHook(() => useAudioRecorder());

      // Start and stop recording to get a blob
      await act(async () => {
        await result.current.startRecording();
      });

      await act(async () => {
        await result.current.stopRecording();
      });

      // Download recording
      act(() => {
        result.current.downloadRecording('test-recording.webm');
      });

      expect(mockA.download).toBe('test-recording.webm');
      expect(mockA.click).toHaveBeenCalled();
    });
  });

  describe('Duration and Time Formatting', () => {
    it('should format duration correctly', () => {
      const { result } = renderHook(() => useAudioRecorder());

      expect(result.current.formatDuration(0)).toBe('0:00');
      expect(result.current.formatDuration(30)).toBe('0:30');
      expect(result.current.formatDuration(90)).toBe('1:30');
      expect(result.current.formatDuration(3661)).toBe('1:01:01');
    });

    it('should get recording duration', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      expect(result.current.getRecordingDuration()).toBe(0);

      // Start recording and check duration updates
      await act(async () => {
        await result.current.startRecording();
      });

      // Wait a bit for duration to update
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
      });

      expect(result.current.getRecordingDuration()).toBeGreaterThan(0);
    });
  });

  describe('Audio Format Support', () => {
    it('should have correct audio format configurations', () => {
      expect(AUDIO_FORMATS.webm).toEqual({
        mimeType: 'audio/webm;codecs=opus',
        extension: '.webm',
        quality: 'high',
        compression: 'excellent',
      });

      expect(AUDIO_FORMATS.mp4).toEqual({
        mimeType: 'audio/mp4;codecs=mp4a.40.2',
        extension: '.mp4',
        quality: 'high',
        compression: 'good',
      });
    });

    it('should check mime type support', () => {
      expect(MockMediaRecorder.isTypeSupported).toBeDefined();
    });
  });

  describe('Device Switching', () => {
    it('should switch devices successfully', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      let success: boolean;
      await act(async () => {
        success = await result.current.switchDevice('device2');
      });

      expect(success!).toBe(true);
      expect(result.current.state.currentDeviceId).toBe('device2');
    });

    it('should restart recording when switching devices during recording', async () => {
      const { result } = renderHook(() => useAudioRecorder());

      // Start recording
      await act(async () => {
        await result.current.startRecording();
      });

      expect(result.current.state.isRecording).toBe(true);

      // Switch device
      let success: boolean;
      await act(async () => {
        success = await result.current.switchDevice('device2');
      });

      expect(success!).toBe(true);
      expect(result.current.state.currentDeviceId).toBe('device2');
      expect(result.current.state.isRecording).toBe(true);
    });
  });

  describe('Integration Features', () => {
    it('should provide keyboard shortcuts', () => {
      const { result } = renderHook(() => useAudioRecorder());

      expect(result.current.keyboardShortcuts).toEqual({
        Space: 'Toggle recording',
        Escape: 'Stop recording',
        'Ctrl+S': 'Download recording',
      });
    });

    it('should provide network availability status', () => {
      const { result } = renderHook(() => useAudioRecorder());

      expect(result.current.isNetworkAvailable).toBe(true);
    });
  });

  describe('Cleanup', () => {
    it('should cleanup resources on unmount', async () => {
      const { result, unmount } = renderHook(() => useAudioRecorder());

      // Start recording
      await act(async () => {
        await result.current.startRecording();
      });

      // Unmount component
      unmount();

      expect(global.URL.revokeObjectURL).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle MediaRecorder errors', async () => {
      const onError = vi.fn();
      const { result } = renderHook(() => useAudioRecorder({ onError }));

      await act(async () => {
        await result.current.startRecording();
      });

      // Simulate MediaRecorder error
      const mockRecorder = (global.MediaRecorder as any).mock.instances[0];
      act(() => {
        if (mockRecorder.onerror) {
          mockRecorder.onerror({ error: new Error('Recording failed') });
        }
      });

      expect(onError).toHaveBeenCalledWith({
        type: 'recording',
        message: 'MediaRecorder error occurred',
        originalError: expect.any(Error),
      });
    });

    it('should handle device not found errors', async () => {
      const notFoundError = new Error('Device not found');
      (notFoundError as any).name = 'NotFoundError';
      mockGetUserMedia.mockRejectedValueOnce(notFoundError);

      const { result } = renderHook(() => useAudioRecorder());

      let success: boolean;
      await act(async () => {
        success = await result.current.startRecording();
      });

      expect(success!).toBe(false);
      expect(result.current.error?.type).toBe('device');
      expect(result.current.error?.message).toBe(
        'No audio input devices found'
      );
    });
  });
});
