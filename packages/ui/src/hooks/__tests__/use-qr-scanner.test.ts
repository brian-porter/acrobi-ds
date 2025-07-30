import { renderHook, act } from '@testing-library/react';
import { BarcodeFormat } from '@zxing/library';
import { useQRScanner } from '../use-qr-scanner';
import { vi, describe, it, expect, beforeEach, afterEach, Mock } from 'vitest';

// Mock ZXing library
const mockDecodeFromCanvas = vi.fn();
const mockReset = vi.fn();
const mockSetHints = vi.fn();

vi.mock('@zxing/library', () => ({
  BarcodeFormat: {
    QR_CODE: 0,
    EAN_13: 1,
    EAN_8: 2,
    CODE_128: 3,
    CODE_39: 4,
    CODE_93: 5,
    CODABAR: 6,
    ITF: 7,
    PDF_417: 8,
    DATA_MATRIX: 9,
    AZTEC: 10,
    UPC_A: 11,
    UPC_E: 12,
    RSS_14: 13,
    RSS_EXPANDED: 14,
    MAXICODE: 15,
  },
  BrowserMultiFormatReader: vi.fn(() => ({
    decodeFromCanvas: mockDecodeFromCanvas,
    reset: mockReset,
    setHints: mockSetHints,
  })),
  DecodeHintType: {
    POSSIBLE_FORMATS: 'POSSIBLE_FORMATS',
    TRY_HARDER: 'TRY_HARDER',
    ENABLED_DECODERS: 'ENABLED_DECODERS',
  },
}));

// Mock use-camera hook
const mockStartCamera = vi.fn();
const mockStopCamera = vi.fn();
const mockSwitchCamera = vi.fn();
const mockCapturePhoto = vi.fn();

vi.mock('../use-camera', () => ({
  useCamera: vi.fn(() => ({
    stream: null,
    isStreaming: false,
    isLoading: false,
    error: null,
    isSupported: true,
    startCamera: mockStartCamera,
    stopCamera: mockStopCamera,
    switchCamera: mockSwitchCamera,
    capturePhoto: mockCapturePhoto,
  })),
}));

// Mock DOM elements
const mockVideo = {
  videoWidth: 640,
  videoHeight: 480,
  readyState: 4,
  srcObject: null,
  autoplay: true,
  playsInline: true,
  muted: true,
};

const mockCanvas = {
  width: 0,
  height: 0,
  getContext: vi.fn(() => ({
    drawImage: vi.fn(),
  })),
};

Object.defineProperty(document, 'createElement', {
  writable: true,
  value: vi.fn((tagName: string) => {
    if (tagName === 'video') return mockVideo;
    if (tagName === 'canvas') return mockCanvas;
    return {};
  }),
});

describe('useQRScanner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDecodeFromCanvas.mockClear();
    mockReset.mockClear();
    mockSetHints.mockClear();
    mockStartCamera.mockClear();
    mockStopCamera.mockClear();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should initialize with default options', () => {
    const { result } = renderHook(() => useQRScanner());

    expect(result.current.isSupported).toBe(true);
    expect(result.current.isScanning).toBe(false);
    expect(result.current.isStreaming).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.lastResult).toBe(null);
    expect(result.current.results).toEqual([]);
    expect(result.current.supportedFormats).toContain(BarcodeFormat.QR_CODE);
    expect(result.current.enabledFormats).toContain(BarcodeFormat.QR_CODE);
  });

  it('should start scanning', async () => {
    const { result } = renderHook(() => useQRScanner());

    await act(async () => {
      await result.current.startScanning();
    });

    expect(mockStartCamera).toHaveBeenCalled();
    expect(result.current.isScanning).toBe(true);
  });

  it('should stop scanning', async () => {
    const { result } = renderHook(() => useQRScanner());

    await act(async () => {
      await result.current.startScanning();
    });

    act(() => {
      result.current.stopScanning();
    });

    expect(mockStopCamera).toHaveBeenCalled();
    expect(result.current.isScanning).toBe(false);
  });

  it('should detect QR codes successfully', async () => {
    // Mock successful decode
    const mockResult = {
      getText: () => 'https://example.com',
      getBarcodeFormat: () => BarcodeFormat.QR_CODE,
      getResultPoints: () => [
        { getX: () => 100, getY: () => 100 },
        { getX: () => 200, getY: () => 200 },
      ],
      getResultMetadata: () => new Map([['key', 'value']]),
    };

    mockDecodeFromCanvas.mockResolvedValue(mockResult);

    const onResult = vi.fn();
    const { result } = renderHook(() =>
      useQRScanner({ onResult, scanInterval: 100 })
    );

    // Mock camera streaming
    const { useCamera } = await import('../use-camera');
    (useCamera as Mock).mockReturnValue({
      stream: {},
      isStreaming: true,
      isLoading: false,
      error: null,
      isSupported: true,
      startCamera: mockStartCamera,
      stopCamera: mockStopCamera,
      switchCamera: mockSwitchCamera,
      capturePhoto: mockCapturePhoto,
    });

    await act(async () => {
      await result.current.startScanning();
    });

    // Wait for scanning interval
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    expect(onResult).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'https://example.com',
        format: BarcodeFormat.QR_CODE,
        formatName: 'QR Code',
        boundingBox: {
          x: 100,
          y: 100,
          width: 100,
          height: 100,
        },
      })
    );
  });

  it('should handle decode errors gracefully', async () => {
    mockDecodeFromCanvas.mockRejectedValue(new Error('Decode failed'));

    const onError = vi.fn();
    const { result } = renderHook(() =>
      useQRScanner({ onError, scanInterval: 100 })
    );

    // Mock camera streaming
    const { useCamera } = await import('../use-camera');
    (useCamera as Mock).mockReturnValue({
      stream: {},
      isStreaming: true,
      isLoading: false,
      error: null,
      isSupported: true,
      startCamera: mockStartCamera,
      stopCamera: mockStopCamera,
      switchCamera: mockSwitchCamera,
      capturePhoto: mockCapturePhoto,
    });

    await act(async () => {
      await result.current.startScanning();
    });

    // Wait for scanning interval
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    expect(onError).toHaveBeenCalledWith('Decode failed');
  });

  it('should clear results', () => {
    const { result } = renderHook(() => useQRScanner());

    act(() => {
      result.current.clearResults();
    });

    expect(result.current.results).toEqual([]);
    expect(result.current.lastResult).toBe(null);
  });

  it('should update enabled formats', () => {
    const { result } = renderHook(() => useQRScanner());

    act(() => {
      result.current.setEnabledFormats([BarcodeFormat.EAN_13]);
    });

    expect(result.current.enabledFormats).toEqual([BarcodeFormat.EAN_13]);
    expect(mockSetHints).toHaveBeenCalled();
  });

  it('should capture frame', async () => {
    const { result } = renderHook(() => useQRScanner());

    // Mock canvas toDataURL
    const mockToDataURL = vi.fn(() => 'data:image/jpeg;base64,mock-data');
    mockCanvas.getContext = vi.fn(() => ({
      drawImage: vi.fn(),
    }));
    mockCanvas.toDataURL = mockToDataURL;

    const dataUrl = await act(async () => {
      return await result.current.captureFrame();
    });

    expect(dataUrl).toBe('data:image/jpeg;base64,mock-data');
  });

  it('should prevent duplicate results in continuous mode', async () => {
    const mockResult = {
      getText: () => 'DUPLICATE_CODE',
      getBarcodeFormat: () => BarcodeFormat.QR_CODE,
      getResultPoints: () => [],
      getResultMetadata: () => null,
    };

    mockDecodeFromCanvas.mockResolvedValue(mockResult);

    const { result } = renderHook(() =>
      useQRScanner({ continuous: true, scanInterval: 50 })
    );

    // Mock camera streaming
    const { useCamera } = await import('../use-camera');
    (useCamera as Mock).mockReturnValue({
      stream: {},
      isStreaming: true,
      isLoading: false,
      error: null,
      isSupported: true,
      startCamera: mockStartCamera,
      stopCamera: mockStopCamera,
      switchCamera: mockSwitchCamera,
      capturePhoto: mockCapturePhoto,
    });

    await act(async () => {
      await result.current.startScanning();
    });

    // Wait for multiple scan intervals
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
    });

    // Should only have one result due to duplicate detection
    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].text).toBe('DUPLICATE_CODE');
  });

  it('should stop scanning in single-shot mode after successful scan', async () => {
    const mockResult = {
      getText: () => 'SINGLE_SHOT',
      getBarcodeFormat: () => BarcodeFormat.QR_CODE,
      getResultPoints: () => [],
      getResultMetadata: () => null,
    };

    mockDecodeFromCanvas.mockResolvedValue(mockResult);

    const { result } = renderHook(() =>
      useQRScanner({ continuous: false, scanInterval: 50 })
    );

    // Mock camera streaming
    const { useCamera } = await import('../use-camera');
    (useCamera as Mock).mockReturnValue({
      stream: {},
      isStreaming: true,
      isLoading: false,
      error: null,
      isSupported: true,
      startCamera: mockStartCamera,
      stopCamera: mockStopCamera,
      switchCamera: mockSwitchCamera,
      capturePhoto: mockCapturePhoto,
    });

    await act(async () => {
      await result.current.startScanning();
    });

    expect(result.current.isScanning).toBe(true);

    // Wait for scan interval
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    // Should stop scanning after successful detection
    expect(result.current.isScanning).toBe(false);
    expect(result.current.results).toHaveLength(1);
  });

  it('should cleanup on unmount', () => {
    const { result, unmount } = renderHook(() => useQRScanner());

    act(() => {
      unmount();
    });

    expect(mockStopCamera).toHaveBeenCalled();
    expect(mockReset).toHaveBeenCalled();
  });
});
