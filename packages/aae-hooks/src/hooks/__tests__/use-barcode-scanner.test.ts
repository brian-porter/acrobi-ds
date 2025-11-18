import { renderHook } from '@testing-library/react';
import { BarcodeFormat } from '@zxing/library';
import { useBarcodeScanner } from '../use-barcode-scanner';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the useQRScanner hook
const mockUseQRScanner = vi.fn();

vi.mock('../use-qr-scanner', () => ({
  useQRScanner: mockUseQRScanner,
}));

describe('useBarcodeScanner (Legacy)', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementation
    mockUseQRScanner.mockReturnValue({
      stream: null,
      isStreaming: false,
      isLoading: false,
      error: null,
      isSupported: true,
      startScanning: vi.fn(),
      stopScanning: vi.fn(),
      isScanning: false,
      lastResult: null,
      results: [],
      clearResults: vi.fn(),
      switchCamera: vi.fn(),
      captureFrame: vi.fn(),
      supportedFormats: [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13],
      enabledFormats: [BarcodeFormat.QR_CODE],
      setEnabledFormats: vi.fn(),
    });
  });

  it('should initialize with default legacy options', () => {
    const { result } = renderHook(() => useBarcodeScanner());

    expect(mockUseQRScanner).toHaveBeenCalledWith({
      continuous: true,
      scanInterval: 500,
      formats: [
        BarcodeFormat.QR_CODE,
        BarcodeFormat.CODE_128,
        BarcodeFormat.CODE_39,
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
      ],
    });

    expect(result.current.isSupported).toBe(true);
    expect(result.current.isScanning).toBe(false);
  });

  it('should convert legacy format strings to BarcodeFormat enums', () => {
    renderHook(() =>
      useBarcodeScanner({
        formats: ['qr_code', 'ean_13', 'code_128'],
        continuous: false,
        scanInterval: 300,
      })
    );

    expect(mockUseQRScanner).toHaveBeenCalledWith({
      continuous: false,
      scanInterval: 300,
      formats: [
        BarcodeFormat.QR_CODE,
        BarcodeFormat.EAN_13,
        BarcodeFormat.CODE_128,
      ],
    });
  });

  it('should convert enhanced results to legacy format', () => {
    const mockEnhancedResult = {
      text: 'TEST_BARCODE',
      format: BarcodeFormat.QR_CODE,
      formatName: 'QR Code',
      timestamp: 1234567890,
      boundingBox: { x: 10, y: 20, width: 100, height: 80 },
      metadata: { key: 'value' },
    };

    mockUseQRScanner.mockReturnValue({
      stream: null,
      isStreaming: false,
      isLoading: false,
      error: null,
      isSupported: true,
      startScanning: vi.fn(),
      stopScanning: vi.fn(),
      isScanning: false,
      lastResult: mockEnhancedResult,
      results: [mockEnhancedResult],
      clearResults: vi.fn(),
      switchCamera: vi.fn(),
      captureFrame: vi.fn(),
      supportedFormats: [BarcodeFormat.QR_CODE],
      enabledFormats: [BarcodeFormat.QR_CODE],
      setEnabledFormats: vi.fn(),
    });

    const { result } = renderHook(() => useBarcodeScanner());

    expect(result.current.lastResult).toEqual({
      text: 'TEST_BARCODE',
      format: 'qr_code',
      timestamp: 1234567890,
      boundingBox: { x: 10, y: 20, width: 100, height: 80 },
    });

    expect(result.current.results).toEqual([
      {
        text: 'TEST_BARCODE',
        format: 'qr_code',
        timestamp: 1234567890,
        boundingBox: { x: 10, y: 20, width: 100, height: 80 },
      },
    ]);
  });

  it('should handle unknown format gracefully', () => {
    const mockEnhancedResult = {
      text: 'UNKNOWN_FORMAT',
      format: 999 as BarcodeFormat, // Unknown format
      formatName: 'Unknown Format',
      timestamp: 1234567890,
    };

    mockUseQRScanner.mockReturnValue({
      stream: null,
      isStreaming: false,
      isLoading: false,
      error: null,
      isSupported: true,
      startScanning: vi.fn(),
      stopScanning: vi.fn(),
      isScanning: false,
      lastResult: mockEnhancedResult,
      results: [mockEnhancedResult],
      clearResults: vi.fn(),
      switchCamera: vi.fn(),
      captureFrame: vi.fn(),
      supportedFormats: [BarcodeFormat.QR_CODE],
      enabledFormats: [BarcodeFormat.QR_CODE],
      setEnabledFormats: vi.fn(),
    });

    const { result } = renderHook(() => useBarcodeScanner());

    expect(result.current.lastResult?.format).toBe('unknown_format');
  });

  it('should pass through camera options correctly', () => {
    renderHook(() =>
      useBarcodeScanner({
        width: 1920,
        height: 1080,
        facingMode: 'user',
        audio: true,
      })
    );

    expect(mockUseQRScanner).toHaveBeenCalledWith({
      continuous: true,
      scanInterval: 500,
      formats: [
        BarcodeFormat.QR_CODE,
        BarcodeFormat.CODE_128,
        BarcodeFormat.CODE_39,
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
      ],
      width: 1920,
      height: 1080,
      facingMode: 'user',
      audio: true,
    });
  });

  it('should filter out invalid format strings', () => {
    renderHook(() =>
      useBarcodeScanner({
        formats: ['qr_code', 'invalid_format', 'ean_13'],
      })
    );

    expect(mockUseQRScanner).toHaveBeenCalledWith({
      continuous: true,
      scanInterval: 500,
      formats: [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13],
    });
  });

  it('should handle null lastResult', () => {
    mockUseQRScanner.mockReturnValue({
      stream: null,
      isStreaming: false,
      isLoading: false,
      error: null,
      isSupported: true,
      startScanning: vi.fn(),
      stopScanning: vi.fn(),
      isScanning: false,
      lastResult: null,
      results: [],
      clearResults: vi.fn(),
      switchCamera: vi.fn(),
      captureFrame: vi.fn(),
      supportedFormats: [BarcodeFormat.QR_CODE],
      enabledFormats: [BarcodeFormat.QR_CODE],
      setEnabledFormats: vi.fn(),
    });

    const { result } = renderHook(() => useBarcodeScanner());

    expect(result.current.lastResult).toBe(null);
    expect(result.current.results).toEqual([]);
  });
});
