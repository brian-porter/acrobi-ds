# useQRScanner Hook

Enhanced QR and barcode scanner hook with ZXing integration for comprehensive format support and improved performance.

## Overview

The `useQRScanner` hook provides advanced barcode scanning capabilities using the ZXing library. It supports multiple barcode formats, real-time scanning, camera management, and comprehensive error handling.

## Features

- **ZXing Integration**: Professional-grade barcode detection
- **Multiple Formats**: Support for QR, EAN, Code 128, Code 39, PDF417, Data Matrix, Aztec, and more
- **Camera Management**: Front/back camera switching, stream control
- **Real-time Scanning**: Continuous or single-shot scanning modes
- **Error Handling**: Comprehensive error detection and recovery
- **TypeScript Support**: Full type definitions included
- **Performance Optimized**: Efficient scanning with configurable intervals

## Installation

The hook is available as part of the `@acrobi/ui` package with ZXing dependencies:

```bash
npm install @acrobi/ui @zxing/library @zxing/browser
```

## Basic Usage

```tsx
import { useQRScanner, BarcodeFormat } from '@acrobi/ui';

function Scanner() {
  const scanner = useQRScanner({
    continuous: true,
    formats: [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13],
    onResult: (result) => {
      console.log('Scanned:', result.text, result.formatName);
    },
  });

  return (
    <div>
      <video 
        ref={videoRef}
        autoPlay 
        playsInline 
        muted 
        style={{ width: '100%', height: '400px' }}
      />
      
      <button 
        onClick={scanner.isScanning ? scanner.stopScanning : scanner.startScanning}
        disabled={scanner.isLoading}
      >
        {scanner.isScanning ? 'Stop' : 'Start'} Scanning
      </button>
      
      {scanner.lastResult && (
        <div>
          <strong>{scanner.lastResult.formatName}:</strong> {scanner.lastResult.text}
        </div>
      )}
    </div>
  );
}
```

## API Reference

### Options

```typescript
interface QRScannerOptions {
  continuous?: boolean;           // Continue scanning after detection (default: true)
  scanInterval?: number;          // Scan interval in ms (default: 300)
  formats?: BarcodeFormat[];      // Barcode formats to detect
  tryHarder?: boolean;           // More thorough scanning (default: true)
  enabledDecoders?: string[];    // Specific decoders to enable
  onResult?: (result: BarcodeResult) => void;  // Result callback
  onError?: (error: string) => void;           // Error callback
  
  // Camera options
  width?: number;                // Camera width (default: 1280)
  height?: number;               // Camera height (default: 720)
  facingMode?: 'user' | 'environment';  // Camera direction
  audio?: boolean;               // Include audio track
}
```

### Return Value

```typescript
interface UseQRScannerReturn {
  // Camera functionality
  stream: MediaStream | null;
  isStreaming: boolean;
  isLoading: boolean;
  error: string | null;
  isSupported: boolean;
  startScanning: () => Promise<void>;
  stopScanning: () => void;
  
  // QR/Barcode scanning
  isScanning: boolean;
  lastResult: BarcodeResult | null;
  results: BarcodeResult[];      // History of all results
  clearResults: () => void;
  
  // Scanner controls
  switchCamera: () => Promise<void>;
  captureFrame: () => Promise<string | null>;
  
  // Format management
  supportedFormats: BarcodeFormat[];
  enabledFormats: BarcodeFormat[];
  setEnabledFormats: (formats: BarcodeFormat[]) => void;
}
```

### BarcodeResult Interface

```typescript
interface BarcodeResult {
  text: string;                  // Decoded text content
  format: BarcodeFormat;         // ZXing format enum
  formatName: string;            // Human-readable format name
  timestamp: number;             // Detection timestamp
  confidence?: number;           // Detection confidence (if available)
  boundingBox?: {               // Bounding box coordinates
    x: number;
    y: number;
    width: number;
    height: number;
  };
  metadata?: Record<string, any>; // Additional metadata
}
```

## Supported Formats

The hook supports all major barcode formats through ZXing:

- **2D Codes**: QR Code, Data Matrix, PDF417, Aztec, MaxiCode
- **Linear Codes**: EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, Code 93, Codabar, ITF
- **RSS Codes**: RSS-14, RSS Expanded

```typescript
import { BarcodeFormat } from '@zxing/library';

const scanner = useQRScanner({
  formats: [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.PDF_417,
  ],
});
```

## Advanced Examples

### Retail Barcode Scanner

```tsx
function RetailScanner() {
  const scanner = useQRScanner({
    continuous: false,  // Single-shot mode
    formats: [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
    ],
    onResult: (result) => {
      // Process retail barcode
      lookupProduct(result.text);
    },
  });

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted />
      <button onClick={scanner.startScanning}>
        Scan Product Barcode
      </button>
    </div>
  );
}
```

### QR Code URL Scanner

```tsx
function URLScanner() {
  const scanner = useQRScanner({
    formats: [BarcodeFormat.QR_CODE],
    onResult: (result) => {
      // Validate and open URLs
      if (result.text.startsWith('http')) {
        window.open(result.text, '_blank');
      }
    },
  });

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted />
      {scanner.lastResult?.text.startsWith('http') && (
        <a href={scanner.lastResult.text} target="_blank">
          Open: {scanner.lastResult.text}
        </a>
      )}
    </div>
  );
}
```

### Multi-format Scanner with History

```tsx
function MultiFormatScanner() {
  const scanner = useQRScanner({
    continuous: true,
    formats: [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.EAN_13,
      BarcodeFormat.CODE_128,
      BarcodeFormat.PDF_417,
    ],
  });

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted />
      
      <div>
        <h3>Scan History ({scanner.results.length})</h3>
        {scanner.results.map((result, index) => (
          <div key={index}>
            <strong>{result.formatName}:</strong> {result.text}
            <small> ({new Date(result.timestamp).toLocaleTimeString()})</small>
          </div>
        ))}
      </div>
      
      <button onClick={scanner.clearResults}>Clear History</button>
    </div>
  );
}
```

## Performance Considerations

- **Scan Interval**: Lower intervals (100-200ms) provide faster detection but use more CPU
- **Format Selection**: Limit formats to only what you need for better performance
- **Try Harder**: Disable `tryHarder` for faster scanning of high-quality codes
- **Camera Resolution**: Lower resolutions scan faster but may miss small codes

## Error Handling

The hook provides comprehensive error handling:

```tsx
const scanner = useQRScanner({
  onError: (error) => {
    console.error('Scanner error:', error);
    
    if (error.includes('Camera access denied')) {
      // Handle permission denied
    } else if (error.includes('No camera device found')) {
      // Handle no camera
    }
  },
});

// Check for errors
if (scanner.error) {
  return <div>Error: {scanner.error}</div>;
}
```

## Browser Compatibility

- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: iOS 14.3+ (with some limitations)
- **Edge**: Full support
- **Mobile**: Requires HTTPS for camera access

## Migration from useBarcodeScanner

The legacy `useBarcodeScanner` hook is still available but deprecated. To migrate:

```tsx
// Old (deprecated)
import { useBarcodeScanner } from '@acrobi/ui';
const scanner = useBarcodeScanner({
  formats: ['qr_code', 'ean_13'],
});

// New (recommended)
import { useQRScanner, BarcodeFormat } from '@acrobi/ui';
const scanner = useQRScanner({
  formats: [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13],
});
```

## Related Components

- [`ScannerView`](../modules/scanner-view.md) - Complete scanner UI component
- [`useCamera`](./use-camera.md) - Camera management hook
- [`useBarcodeScanner`](./use-barcode-scanner.md) - Legacy scanner hook

## Examples

See the [Storybook stories](../../src/hooks/use-qr-scanner.stories.tsx) for interactive examples and the [ScannerView component](../modules/scanner-view.md) for a complete implementation.