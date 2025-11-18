import { BarcodeFormat } from '@zxing/library';
import {
  useQRScanner,
  type BarcodeResult as QRBarcodeResult,
  type QRScannerOptions,
  type UseQRScannerReturn,
} from './use-qr-scanner';

// Legacy interface for backward compatibility - maps to enhanced QR scanner
export interface BarcodeResult {
  text: string;
  format: string;
  timestamp: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface BarcodeScannerOptions {
  continuous?: boolean;
  scanInterval?: number;
  formats?: string[];
  width?: number;
  height?: number;
  facingMode?: 'user' | 'environment';
  audio?: boolean;
}

export interface UseBarcodeScannerReturn {
  // Camera functionality
  stream: MediaStream | null;
  isStreaming: boolean;
  isLoading: boolean;
  error: string | null;
  isSupported: boolean;
  startScanning: () => Promise<void>;
  stopScanning: () => void;

  // Barcode scanning
  isScanning: boolean;
  lastResult: BarcodeResult | null;
  results: BarcodeResult[];
  clearResults: () => void;
}

// Legacy format string to BarcodeFormat mapping
const formatStringToBarcodeFormat: Record<string, BarcodeFormat> = {
  qr_code: BarcodeFormat.QR_CODE,
  ean_13: BarcodeFormat.EAN_13,
  ean_8: BarcodeFormat.EAN_8,
  code_128: BarcodeFormat.CODE_128,
  code_39: BarcodeFormat.CODE_39,
  code_93: BarcodeFormat.CODE_93,
  codabar: BarcodeFormat.CODABAR,
  itf: BarcodeFormat.ITF,
  pdf_417: BarcodeFormat.PDF_417,
  data_matrix: BarcodeFormat.DATA_MATRIX,
  aztec: BarcodeFormat.AZTEC,
  upc_a: BarcodeFormat.UPC_A,
  upc_e: BarcodeFormat.UPC_E,
};

// BarcodeFormat to legacy string mapping
const barcodeFormatToString: Record<BarcodeFormat, string> = {
  [BarcodeFormat.QR_CODE]: 'qr_code',
  [BarcodeFormat.EAN_13]: 'ean_13',
  [BarcodeFormat.EAN_8]: 'ean_8',
  [BarcodeFormat.CODE_128]: 'code_128',
  [BarcodeFormat.CODE_39]: 'code_39',
  [BarcodeFormat.CODE_93]: 'code_93',
  [BarcodeFormat.CODABAR]: 'codabar',
  [BarcodeFormat.ITF]: 'itf',
  [BarcodeFormat.PDF_417]: 'pdf_417',
  [BarcodeFormat.DATA_MATRIX]: 'data_matrix',
  [BarcodeFormat.AZTEC]: 'aztec',
  [BarcodeFormat.UPC_A]: 'upc_a',
  [BarcodeFormat.UPC_E]: 'upc_e',
  [BarcodeFormat.RSS_14]: 'rss_14',
  [BarcodeFormat.RSS_EXPANDED]: 'rss_expanded',
  [BarcodeFormat.MAXICODE]: 'maxicode',
};

/**
 * Legacy barcode scanner hook - wraps the enhanced useQRScanner for backward compatibility
 * @deprecated Use useQRScanner directly for enhanced functionality
 */
export function useBarcodeScanner(
  options: BarcodeScannerOptions = {}
): UseBarcodeScannerReturn {
  const {
    continuous = true,
    scanInterval = 500,
    formats = ['qr_code', 'code_128', 'code_39', 'ean_13', 'ean_8'],
    ...otherOptions
  } = options;

  // Convert legacy format strings to BarcodeFormat enums
  const barcodeFormats = formats
    .map(format => formatStringToBarcodeFormat[format])
    .filter(Boolean);

  // Use the enhanced QR scanner with converted options
  const qrScannerOptions: QRScannerOptions = {
    continuous,
    scanInterval,
    formats: barcodeFormats,
    ...otherOptions,
  };

  const qrScanner = useQRScanner(qrScannerOptions);

  // Convert results from enhanced format to legacy format
  const convertResult = (
    result: QRBarcodeResult | null
  ): BarcodeResult | null => {
    if (!result) return null;

    return {
      text: result.text,
      format:
        barcodeFormatToString[result.format] ||
        result.formatName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      timestamp: result.timestamp,
      boundingBox: result.boundingBox,
    };
  };

  const convertResults = (results: QRBarcodeResult[]): BarcodeResult[] => {
    return results.map(result => convertResult(result)!).filter(Boolean);
  };

  return {
    // Camera functionality
    stream: qrScanner.stream,
    isStreaming: qrScanner.isStreaming,
    isLoading: qrScanner.isLoading,
    error: qrScanner.error,
    isSupported: qrScanner.isSupported,
    startScanning: qrScanner.startScanning,
    stopScanning: qrScanner.stopScanning,

    // Barcode scanning (converted from enhanced format)
    isScanning: qrScanner.isScanning,
    lastResult: convertResult(qrScanner.lastResult),
    results: convertResults(qrScanner.results),
    clearResults: qrScanner.clearResults,
  };
}
