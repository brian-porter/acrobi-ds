import { renderHook, act, waitFor } from '@testing-library/react';
import { useScreenCapture, SCREEN_FORMATS } from './use-screen-capture';

// Mock dependencies
jest.mock('./use-keyboard', () => ({
  useKeyboard: () => ({
    isSupported: true,
    modifierKey: 'Ctrl',
    addShortcut: jest.fn(() => 'shortcut-id'),
    removeShortcut: jest.fn()
  })
}));

jest.mock('./use-network', () => ({
  useNetwork: () => ({
    isOnline: true,
    connectionQuality: 'good',
    getSuggestedQuality: () => 'medium'
  })
}));

jest.mock('./use-audio-recorder', () => ({
  useAudioRecorder: () => ({
    isSupported: true
  })
}));

// Mock MediaRecorder
class MockMediaRecorder {
  state: 'inactive' | 'recording' | 'paused' = 'inactive';
  ondataavailable: ((event: any) => void) | null = null;
  onstop: (() => void) | null = null;
  onerror: ((event: any) => void) | null = null;

  constructor(stream: MediaStream, options?: any) {
    // Mock constructor
  }

  start(timeslice?: number) {
    this.state = 'recording';
    // Simulate data available
    setTimeout(() => {
      if (this.ondataavailable) {
        this.ondataavailable({
          data: new Blob(['mock-data'], { type: 'video/webm' })
        });
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

  static isTypeSupported(mimeType: string): boolean {
    return mimeType === 'video/webm;codecs=vp9' || mimeType === 'video/mp4;codecs=h264';
  }
}

// Mock MediaStream
class MockMediaStream {
  id = 'mock-stream-id';
  active = true;
  tracks: any[] = [];

  constructor() {
    this.tracks = [
      {
        kind: 'video',
        id: 'video-track-id',
        enabled: true,
        stop: jest.fn(),
        addEventListener: jest.fn()
      },
      {
        kind: 'audio',
        id: 'audio-track-id',
        enabled: true,
        stop: jest.fn(),
        addEventListener: jest.fn()
      }
    ];
  }

  getTracks() {
    return this.tracks;
  }

  getVideoTracks() {
    return this.tracks.filter(track => track.kind === 'video');
  }

  getAudioTracks() {
    return this.tracks.filter(track => track.kind === 'audio');
  }

  addTrack(track: any) {
    this.tracks.push(track);
  }

  removeTrack(track: any) {
    const index = this.tracks.indexOf(track);
    if (index > -1) {
      this.tracks.splice(index, 1);
    }
  }
}

// Mock getDisplayMedia
const mockGetDisplayMedia = jest.fn();

// Setup mocks
beforeAll(() => {
  global.MediaRecorder = MockMediaRecorder as any;
  global.URL.createObjectURL = jest.fn(() => 'mock-url');
  global.URL.revokeObjectURL = jest.fn();
  
  // Mock navigator.mediaDevices.getDisplayMedia
  Object.defineProperty(global.navigator, 'mediaDevices', {
    value: {
      getDisplayMedia: mockGetDisplayMedia
    },
    writable: true
  });

  // Mock screen API
  Object.defineProperty(global.window, 'screen', {
    value: {
      width: 1920,
      height: 1080
    },
    writable: true
  });

  // Mock devicePixelRatio
  Object.defineProperty(global.window, 'devicePixelRatio', {
    value: 1,
    writable: true
  });

  // Mock canvas and video elements
  const mockCanvas = {
    getContext: jest.fn(() => ({
      drawImage: jest.fn()
    })),
    toBlob: jest.fn((callback) => {
      callback(new Blob(['mock-image'], { type: 'image/png' }));
    }),
    width: 1920,
    height: 1080
  };

  const mockVideo = {
    srcObject: null,
    play: jest.fn(() => Promise.resolve()),
    addEventListener: jest.fn((event, callback) => {
      if (event === 'loadedmetadata') {
        setTimeout(callback, 0);
      }
    }),
    videoWidth: 1920,
    videoHeight: 1080
  };

  jest.spyOn(document, 'createElement').mockImplementation((tagName) => {
    if (tagName === 'canvas') return mockCanvas as any;
    if (tagName === 'video') return mockVideo as any;
    if (tagName === 'a') return { 
      href: '', 
      download: '', 
      click: jest.fn(),
      style: {}
    } as any;
    return {} as any;
  });

  jest.spyOn(document.body, 'appendChild').mockImplementation((node: Node) => node);
  jest.spyOn(document.body, 'removeChild').mockImplementation((node: Node) => node);
});

beforeEach(() => {
  jest.clearAllMocks();
  mockGetDisplayMedia.mockResolvedValue(new MockMediaStream());
});

afterEach(() => {
  jest.clearAllTimers();
});

describe('useScreenCapture', () => {
  describe('Initialization', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useScreenCapture());

      expect(result.current.state).toEqual({
        isCapturing: false,
        isRecording: false,
        isPaused: false,
        isSupported: true,
        hasPermission: false,
        duration: 0,
        recordingSize: 0,
        activeDisplays: [],
        currentStream: null
      });

      expect(result.current.error).toBeNull();
      expect(result.current.mediaStream).toBeNull();
      expect(result.current.recordingBlob).toBeNull();
    });

    it('should detect browser support correctly', () => {
      const { result } = renderHook(() => useScreenCapture());
      expect(result.current.state.isSupported).toBe(true);
    });

    it('should load available displays on mount', async () => {
      const { result } = renderHook(() => useScreenCapture());

      await waitFor(() => {
        expect(result.current.state.activeDisplays).toHaveLength(1);
        expect(result.current.state.activeDisplays[0]).toEqual({
          id: 'primary',
          label: 'Primary Display',
          primary: true,
          bounds: {
            x: 0,
            y: 0,
            width: 1920,
            height: 1080
          },
          scaleFactor: 1
        });
      });
    });
  });

  describe('Screen Capture', () => {
    it('should start screen capture successfully', async () => {
      const onStreamStart = jest.fn();
      const { result } = renderHook(() => useScreenCapture({ onStreamStart }));

      let stream: MediaStream | null = null;
      await act(async () => {
        stream = await result.current.startScreenCapture();
      });

      expect(stream).toBeInstanceOf(MockMediaStream);
      expect(result.current.state.isCapturing).toBe(true);
      expect(result.current.state.hasPermission).toBe(true);
      expect(result.current.mediaStream).toBe(stream);
      expect(onStreamStart).toHaveBeenCalledWith(stream);
    });

    it('should handle permission denied error', async () => {
      const onPermissionDenied = jest.fn();
      const onError = jest.fn();
      mockGetDisplayMedia.mockRejectedValue(new Error('NotAllowedError'));
      (Error.prototype as any).name = 'NotAllowedError';

      const { result } = renderHook(() => useScreenCapture({ 
        onPermissionDenied, 
        onError 
      }));

      let stream: MediaStream | null = null;
      await act(async () => {
        stream = await result.current.startScreenCapture();
      });

      expect(stream).toBeNull();
      expect(result.current.state.isCapturing).toBe(false);
      expect(onPermissionDenied).toHaveBeenCalled();
      expect(onError).toHaveBeenCalledWith({
        type: 'permission',
        message: 'Screen capture permission denied',
        originalError: expect.any(Error)
      });
    });

    it('should stop screen capture', async () => {
      const onStreamEnd = jest.fn();
      const { result } = renderHook(() => useScreenCapture({ onStreamEnd }));

      // Start screen capture first
      await act(async () => {
        await result.current.startScreenCapture();
      });

      expect(result.current.state.isCapturing).toBe(true);

      // Stop screen capture
      act(() => {
        result.current.stopScreenCapture();
      });

      expect(result.current.state.isCapturing).toBe(false);
      expect(result.current.mediaStream).toBeNull();
      expect(onStreamEnd).toHaveBeenCalled();
    });

    it('should switch display', async () => {
      const { result } = renderHook(() => useScreenCapture());

      // Start screen capture first
      await act(async () => {
        await result.current.startScreenCapture();
      });

      // Switch display
      let success = false;
      await act(async () => {
        success = await result.current.switchDisplay('secondary');
      });

      expect(success).toBe(true);
    });
  });

  describe('Recording', () => {
    it('should start recording successfully', async () => {
      const onRecordingComplete = jest.fn();
      const { result } = renderHook(() => useScreenCapture({ onRecordingComplete }));

      // Start screen capture first
      await act(async () => {
        await result.current.startScreenCapture();
      });

      // Start recording
      let success = false;
      await act(async () => {
        success = await result.current.startRecording();
      });

      expect(success).toBe(true);
      expect(result.current.state.isRecording).toBe(true);
      expect(result.current.state.isPaused).toBe(false);
    });

    it('should stop recording and create blob', async () => {
      const { result } = renderHook(() => useScreenCapture());

      // Start screen capture and recording
      await act(async () => {
        await result.current.startScreenCapture();
        await result.current.startRecording();
      });

      // Stop recording
      let blob: Blob | null = null;
      await act(async () => {
        blob = await result.current.stopRecording();
      });

      expect(blob).toBeInstanceOf(Blob);
      expect(result.current.state.isRecording).toBe(false);
      expect(result.current.recordingBlob).toBeInstanceOf(Blob);
      expect(result.current.recordingUrl).toBe('mock-url');
    });

    it('should pause and resume recording', async () => {
      const { result } = renderHook(() => useScreenCapture());

      // Start screen capture and recording
      await act(async () => {
        await result.current.startScreenCapture();
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
      const { result } = renderHook(() => useScreenCapture());

      // Start screen capture and recording
      await act(async () => {
        await result.current.startScreenCapture();
        await result.current.startRecording();
      });

      // Cancel recording
      act(() => {
        result.current.cancelRecording();
      });

      expect(result.current.state.isRecording).toBe(false);
      expect(result.current.recordingBlob).toBeNull();
    });

    it('should track recording duration', async () => {
      jest.useFakeTimers();
      
      const { result } = renderHook(() => useScreenCapture());

      // Start screen capture and recording
      await act(async () => {
        await result.current.startScreenCapture();
        await result.current.startRecording();
      });

      // Fast forward time
      act(() => {
        jest.advanceTimersByTime(5000); // 5 seconds
      });

      expect(result.current.state.duration).toBeGreaterThan(0);
      
      jest.useRealTimers();
    });
  });

  describe('Screenshots', () => {
    it('should take screenshot successfully', async () => {
      const { result } = renderHook(() => useScreenCapture());

      // Start screen capture first
      await act(async () => {
        await result.current.startScreenCapture();
      });

      // Take screenshot
      let blob: Blob | null = null;
      await act(async () => {
        blob = await result.current.takeScreenshot();
      });

      expect(blob).toBeInstanceOf(Blob);
      expect(result.current.screenshotBlob).toBeInstanceOf(Blob);
    });

    it('should take screenshot with different formats', async () => {
      const { result } = renderHook(() => useScreenCapture());

      // Start screen capture first
      await act(async () => {
        await result.current.startScreenCapture();
      });

      // Test different formats
      const formats: ('png' | 'jpeg' | 'webp')[] = ['png', 'jpeg', 'webp'];
      
      for (const format of formats) {
        let blob: Blob | null = null;
        await act(async () => {
          blob = await result.current.takeScreenshot(format);
        });

        expect(blob).toBeInstanceOf(Blob);
      }
    });

    it('should capture specific area', async () => {
      const { result } = renderHook(() => useScreenCapture());

      // Start screen capture first
      await act(async () => {
        await result.current.startScreenCapture();
      });

      // Capture area
      let blob: Blob | null = null;
      await act(async () => {
        blob = await result.current.captureArea(0, 0, 100, 100);
      });

      expect(blob).toBeInstanceOf(Blob);
    });

    it('should handle screenshot error when no stream available', async () => {
      const { result } = renderHook(() => useScreenCapture());

      // Try to take screenshot without starting capture
      let blob: Blob | null = null;
      await act(async () => {
        blob = await result.current.takeScreenshot();
      });

      expect(blob).toBeNull();
      expect(result.current.error?.type).toBe('recording');
    });
  });

  describe('Annotations', () => {
    it('should enable and disable annotations', () => {
      const { result } = renderHook(() => useScreenCapture());

      // Enable annotations
      act(() => {
        result.current.enableAnnotation();
      });

      // Disable annotations
      act(() => {
        result.current.disableAnnotation();
      });

      // Should not throw errors
    });

    it('should add and clear annotations', () => {
      const { result } = renderHook(() => useScreenCapture());

      // Enable annotations
      act(() => {
        result.current.enableAnnotation();
      });

      // Add annotation
      act(() => {
        result.current.addAnnotation(
          { type: 'rectangle' }, 
          { position: { x: 10, y: 10 } }
        );
      });

      // Clear annotations
      act(() => {
        result.current.clearAnnotations();
      });

      // Should not throw errors
    });
  });

  describe('Display Management', () => {
    it('should get available displays', async () => {
      const { result } = renderHook(() => useScreenCapture());

      let displays: any[] = [];
      await act(async () => {
        displays = await result.current.getAvailableDisplays();
      });

      expect(displays).toHaveLength(1);
      expect(displays[0].id).toBe('primary');
    });

    it('should get current display', async () => {
      const { result } = renderHook(() => useScreenCapture());

      // Wait for displays to load
      await waitFor(() => {
        expect(result.current.state.activeDisplays).toHaveLength(1);
      });

      const currentDisplay = result.current.getCurrentDisplay();
      expect(currentDisplay?.id).toBe('primary');
      expect(currentDisplay?.primary).toBe(true);
    });
  });

  describe('Download Functions', () => {
    it('should download recording', async () => {
      const { result } = renderHook(() => useScreenCapture());

      // Start screen capture and recording
      await act(async () => {
        await result.current.startScreenCapture();
        await result.current.startRecording();
        await result.current.stopRecording();
      });

      // Download recording
      act(() => {
        result.current.downloadRecording('test-recording.webm');
      });

      expect(document.createElement).toHaveBeenCalledWith('a');
    });

    it('should download screenshot', async () => {
      const { result } = renderHook(() => useScreenCapture());

      // Start screen capture and take screenshot
      await act(async () => {
        await result.current.startScreenCapture();
        await result.current.takeScreenshot();
      });

      // Download screenshot
      act(() => {
        result.current.downloadScreenshot('test-screenshot.png');
      });

      expect(document.createElement).toHaveBeenCalledWith('a');
    });
  });

  describe('Utility Functions', () => {
    it('should get recording duration', async () => {
      jest.useFakeTimers();
      
      const { result } = renderHook(() => useScreenCapture());

      // Start recording
      await act(async () => {
        await result.current.startScreenCapture();
        await result.current.startRecording();
      });

      // Fast forward time
      act(() => {
        jest.advanceTimersByTime(5000);
      });

      const duration = result.current.getRecordingDuration();
      expect(duration).toBeGreaterThan(0);
      
      jest.useRealTimers();
    });

    it('should format duration correctly', () => {
      const { result } = renderHook(() => useScreenCapture());

      expect(result.current.formatDuration(65)).toBe('1:05');
      expect(result.current.formatDuration(3661)).toBe('1:01:01');
      expect(result.current.formatDuration(30)).toBe('0:30');
    });
  });

  describe('Integration', () => {
    it('should provide keyboard shortcuts', () => {
      const { result } = renderHook(() => useScreenCapture());

      expect(result.current.keyboardShortcuts).toEqual({
        'F12': 'Take screenshot or start screen capture',
        'Ctrl+Shift+R': 'Start/stop screen recording',
        'Space': 'Pause/resume recording',
        'Escape': 'Stop capture/recording',
        'Ctrl+S': 'Download recording or screenshot'
      });
    });

    it('should enable/disable keyboard shortcuts', () => {
      const { result } = renderHook(() => useScreenCapture());

      act(() => {
        result.current.enableKeyboardShortcuts(false);
      });

      act(() => {
        result.current.enableKeyboardShortcuts(true);
      });

      // Should not throw errors
    });

    it('should provide network integration', () => {
      const { result } = renderHook(() => useScreenCapture());

      expect(result.current.isNetworkAvailable).toBe(true);
      expect(result.current.networkQuality).toBe('good');
    });

    it('should provide audio recorder integration', () => {
      const { result } = renderHook(() => useScreenCapture());

      expect(result.current.audioRecorder).toBeDefined();
      expect(result.current.audioRecorder.isSupported).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle getDisplayMedia errors', async () => {
      const onError = jest.fn();
      mockGetDisplayMedia.mockRejectedValue(new Error('Test error'));

      const { result } = renderHook(() => useScreenCapture({ onError }));

      await act(async () => {
        await result.current.startScreenCapture();
      });

      expect(onError).toHaveBeenCalledWith({
        type: 'recording',
        message: 'Failed to start screen capture',
        originalError: expect.any(Error)
      });
    });

    it('should handle MediaRecorder errors', async () => {
      const onError = jest.fn();
      const { result } = renderHook(() => useScreenCapture({ onError }));

      // Start screen capture and recording
      await act(async () => {
        await result.current.startScreenCapture();
        await result.current.startRecording();
      });

      // Simulate MediaRecorder error
      act(() => {
        const mockRecorder = MediaRecorder as any;
        const instance = mockRecorder.mock.instances[0];
        if (instance?.onerror) {
          instance.onerror({ error: new Error('Recording error') });
        }
      });

      expect(onError).toHaveBeenCalledWith({
        type: 'recording',
        message: 'MediaRecorder error occurred',
        originalError: expect.any(Error)
      });
    });
  });

  describe('Format Support', () => {
    it('should provide correct format configurations', () => {
      expect(SCREEN_FORMATS.webm.video).toBe('video/webm;codecs=vp9');
      expect(SCREEN_FORMATS.mp4.video).toBe('video/mp4;codecs=h264');
      expect(SCREEN_FORMATS.png.mimeType).toBe('image/png');
      expect(SCREEN_FORMATS.jpeg.mimeType).toBe('image/jpeg');
      expect(SCREEN_FORMATS.webp.mimeType).toBe('image/webp');
    });

    it('should detect best supported video mime type', () => {
      const { result } = renderHook(() => useScreenCapture());
      
      // Based on our mock, webm should be supported
      expect(result.current.state.isSupported).toBe(true);
    });
  });

  describe('Cleanup', () => {
    it('should cleanup resources on unmount', async () => {
      const { result, unmount } = renderHook(() => useScreenCapture());

      // Start screen capture and recording
      await act(async () => {
        await result.current.startScreenCapture();
        await result.current.startRecording();
      });

      // Unmount component
      unmount();

      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });
  });
});