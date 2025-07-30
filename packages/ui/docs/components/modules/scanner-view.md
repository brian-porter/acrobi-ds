# Scanner Component

A comprehensive QR and barcode scanner component with camera preview, format selection, and result history.

## Overview

The `Scanner` component provides a complete barcode scanning interface built on top of the `useQRScanner` hook. It includes camera preview, scanning controls, format selection, and result display - everything needed for professional barcode scanning applications.

## Features

- **Complete UI**: Camera preview, controls, and result display
- **Format Selection**: Interactive barcode format selector
- **Scan History**: Built-in result history with timestamps
- **Error Handling**: User-friendly error messages and recovery
- **Customizable**: Flexible overlay system and styling options
- **Mobile Optimized**: Responsive design for mobile devices
- **Accessibility**: ARIA labels and keyboard navigation

## Installation

```bash
npm install @acrobi/ui @zxing/library @zxing/browser
```

## Basic Usage

```tsx
import { Scanner } from '@acrobi/ui';
import { BarcodeFormat } from '@zxing/library';

function App() {
  const handleResult = (result) => {
    console.log('Scanned:', result.text, result.formatName);
  };

  return (
    <Scanner
      onResult={handleResult}
      formats={[BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13]}
      showHistory={true}
      showFormatSelector={true}
    />
  );
}
```

## Props

```typescript
interface ScannerProps {
  className?: string;                    // Additional CSS classes
  continuous?: boolean;                  // Continue scanning after detection (default: true)
  formats?: BarcodeFormat[];            // Barcode formats to detect
  onResult?: (result: BarcodeResult) => void;    // Result callback
  onError?: (error: string) => void;             // Error callback
  showHistory?: boolean;                 // Show scan result history (default: true)
  showFormatSelector?: boolean;          // Show format selector (default: true)
  autoStart?: boolean;                   // Auto-start scanning (default: false)
  overlay?: React.ReactNode;            // Custom overlay content
  width?: number;                       // Scanner viewport width (default: 640)
  height?: number;                      // Scanner viewport height (default: 480)
}
```

## Examples

### QR Code Scanner

```tsx
<Scanner
  formats={[BarcodeFormat.QR_CODE]}
  showFormatSelector={false}
  onResult={(result) => {
    if (result.text.startsWith('http')) {
      window.open(result.text, '_blank');
    }
  }}
/>
```

### Retail Barcode Scanner

```tsx
<Scanner
  formats={[
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
  ]}
  continuous={false}  // Single-shot mode
  onResult={(result) => {
    lookupProduct(result.text);
  }}
/>
```

### Compact Mobile Scanner

```tsx
<Scanner
  width={320}
  height={240}
  showHistory={false}
  showFormatSelector={false}
  autoStart={true}
  className="mobile-scanner"
/>
```

### Scanner with Custom Overlay

```tsx
<Scanner
  overlay={
    <div className="flex items-center justify-center">
      <div className="border-2 border-white border-dashed w-48 h-48 rounded-lg flex items-center justify-center">
        <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded">
          Align barcode here
        </span>
      </div>
    </div>
  }
/>
```

## Styling

The component uses Tailwind CSS classes and can be customized:

```tsx
<ScannerView
  className="max-w-md mx-auto"
  // Individual sections can be styled via CSS
/>
```

### CSS Classes

```css
/* Scanner container */
.scanner-view {
  /* Base styling */
}

/* Video preview */
.scanner-view video {
  /* Camera preview styling */
}

/* Controls */
.scanner-view .controls {
  /* Control buttons styling */
}

/* Format selector */
.scanner-view .format-selector {
  /* Format selection styling */
}

/* Result display */
.scanner-view .result-display {
  /* Result and history styling */
}
```

## Component Structure

```tsx
<div className="scanner-view">
  {/* Camera Preview */}
  <div className="camera-container">
    <video />
    <div className="overlay">
      {/* Custom overlay content */}
      {/* Detection bounding box */}
      {/* Status indicators */}
    </div>
  </div>
  
  {/* Controls */}
  <div className="controls">
    <button>Start/Stop</button>
    <button>Switch Camera</button>
    <button>Clear History</button>
  </div>
  
  {/* Format Selector */}
  {showFormatSelector && (
    <div className="format-selector">
      {/* Format toggle buttons */}
    </div>
  )}
  
  {/* Last Result */}
  {lastResult && (
    <div className="last-result">
      {/* Recent scan display */}
    </div>
  )}
  
  {/* Scan History */}
  {showHistory && (
    <div className="scan-history">
      {/* Results list */}
    </div>
  )}
</div>
```

## Advanced Usage

### Conditional Rendering

```tsx
function ConditionalScanner() {
  const [showScanner, setShowScanner] = useState(false);
  
  return (
    <div>
      {showScanner ? (
        <ScannerView
          autoStart={true}
          onResult={(result) => {
            processResult(result);
            setShowScanner(false);  // Hide after scan
          }}
        />
      ) : (
        <button onClick={() => setShowScanner(true)}>
          Start Scanning
        </button>
      )}
    </div>
  );
}
```

### Integration with Forms

```tsx
function FormWithScanner() {
  const [barcode, setBarcode] = useState('');
  
  return (
    <form>
      <input 
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="Enter or scan barcode"
      />
      
      <ScannerView
        width={300}
        height={200}
        continuous={false}
        onResult={(result) => {
          setBarcode(result.text);
        }}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Multiple Scanner Types

```tsx
function MultiScanner() {
  const [scannerType, setScannerType] = useState('qr');
  
  const getFormats = () => {
    switch (scannerType) {
      case 'qr': return [BarcodeFormat.QR_CODE];
      case 'retail': return [BarcodeFormat.EAN_13, BarcodeFormat.UPC_A];
      case 'all': return undefined; // Use all formats
      default: return [BarcodeFormat.QR_CODE];
    }
  };
  
  return (
    <div>
      <div>
        <button onClick={() => setScannerType('qr')}>QR Codes</button>
        <button onClick={() => setScannerType('retail')}>Retail</button>
        <button onClick={() => setScannerType('all')}>All Formats</button>
      </div>
      
      <ScannerView
        key={scannerType}  // Remount on type change
        formats={getFormats()}
        showFormatSelector={scannerType === 'all'}
      />
    </div>
  );
}
```

## Error Handling

The component provides built-in error handling with user-friendly messages:

```tsx
<ScannerView
  onError={(error) => {
    // Custom error handling
    if (error.includes('Camera access denied')) {
      alert('Please allow camera access to scan barcodes');
    }
  }}
/>
```

## Accessibility

The component includes accessibility features:

- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode compatibility
- Focus management

## Performance Tips

1. **Limit Formats**: Only enable needed barcode formats
2. **Conditional Rendering**: Mount/unmount when not in use
3. **Scan Interval**: Adjust based on use case
4. **Camera Resolution**: Lower resolution for faster scanning

```tsx
<ScannerView
  formats={[BarcodeFormat.QR_CODE]}  // Only QR codes
  continuous={false}                  // Single-shot mode
  width={320}                        // Lower resolution
  height={240}
/>
```

## Browser Support

- **Chrome**: Full support
- **Firefox**: Full support  
- **Safari**: iOS 14.3+ (with limitations)
- **Edge**: Full support
- **HTTPS Required**: Camera access requires secure context

## Related Hooks

- [`useQRScanner`](../hooks/use-qr-scanner.md) - Underlying scanner hook
- [`useCamera`](../hooks/use-camera.md) - Camera management
- [`useBarcodeScanner`](../hooks/use-barcode-scanner.md) - Legacy scanner

## Examples

See the [Storybook stories](../../src/components/modules/scanner-view.stories.tsx) for interactive examples and live demonstrations.