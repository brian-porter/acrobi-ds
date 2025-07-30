# useBarcodeScanner

React hook for scanning QR codes and barcodes using the device camera.

## Overview

The `useBarcodeScanner` hook provides an easy-to-use interface for scanning various types of barcodes and QR codes. It combines camera access with barcode detection capabilities, handling permissions, scanning states, and result processing.

## Basic Usage

```tsx
import { useBarcodeScanner } from '@acrobi/ui';

function BarcodeScanner() {
  const { 
    isScanning, 
    lastResult, 
    startScanning, 
    stopScanning, 
    error 
  } = useBarcodeScanner({
    onResult: (result) => {
      console.log('Scanned:', result.text);
      alert(`Scanned: ${result.text}`);
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button 
          onClick={startScanning}
          disabled={isScanning}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {isScanning ? 'Scanning...' : 'Start Scanning'}
        </button>
        
        <button 
          onClick={stopScanning}
          disabled={!isScanning}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Stop Scanning
        </button>
      </div>

      {lastResult && (
        <div className="p-4 bg-green-50 rounded">
          <h3 className="font-semibold text-green-700">Last Scan Result</h3>
          <p className="font-mono text-sm mt-1">{lastResult.text}</p>
          <p className="text-xs text-green-600 mt-1">
            Format: {lastResult.format} • 
            Confidence: {Math.round(lastResult.confidence * 100)}%
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 rounded">
          <p className="text-red-700">Error: {error.message}</p>
        </div>
      )}
    </div>
  );
}
```

## API Reference

### Return Value

```tsx
interface UseBarcodeScannerReturn {
  isScanning: boolean;
  lastResult: ScanResult | null;
  results: ScanResult[];
  startScanning: () => Promise<void>;
  stopScanning: () => void;
  clearResults: () => void;
  error: Error | null;
  isSupported: boolean;
  cameraStream: RefObject<HTMLVideoElement>;
}

interface ScanResult {
  text: string;
  format: string;
  confidence: number;
  timestamp: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
```

### Options

```tsx
interface UseBarcodeScannerOptions {
  onResult?: (result: ScanResult) => void;
  onError?: (error: Error) => void;
  formats?: BarcodeFormat[];
  continuous?: boolean;
  facingMode?: 'user' | 'environment';
  width?: number;
  height?: number;
  scanInterval?: number;
}

type BarcodeFormat = 
  | 'qr_code'
  | 'code_128'
  | 'code_39'
  | 'ean_13'
  | 'ean_8'
  | 'upc_a'
  | 'upc_e'
  | 'data_matrix'
  | 'pdf417'
  | 'aztec';
```

## Examples

### QR Code Scanner

```tsx
function QRCodeScanner() {
  const [scannedCodes, setScannedCodes] = useState([]);
  
  const { 
    isScanning, 
    startScanning, 
    stopScanning, 
    cameraStream,
    error 
  } = useBarcodeScanner({
    formats: ['qr_code'],
    continuous: true,
    facingMode: 'environment', // Use back camera
    onResult: (result) => {
      setScannedCodes(prev => {
        // Avoid duplicates
        if (prev.some(code => code.text === result.text)) {
          return prev;
        }
        return [...prev, result];
      });
    }
  });

  const clearHistory = () => {
    setScannedCodes([]);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="relative">
        <video 
          ref={cameraStream}
          autoPlay
          playsInline
          muted
          className="w-full rounded-lg"
        />
        
        {isScanning && (
          <div className="absolute inset-0 border-2 border-blue-500 rounded-lg">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-48 h-48 border-2 border-white rounded-lg opacity-50"></div>
            </div>
            <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded text-sm">
              Scanning for QR codes...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button 
          onClick={startScanning}
          disabled={isScanning}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {isScanning ? 'Scanning...' : 'Start QR Scanner'}
        </button>
        
        {isScanning && (
          <button 
            onClick={stopScanning}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Stop
          </button>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 rounded">
          <p className="text-red-700 text-sm">Error: {error.message}</p>
        </div>
      )}

      {scannedCodes.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Scanned QR Codes ({scannedCodes.length})</h3>
            <button 
              onClick={clearHistory}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {scannedCodes.map((code, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded text-sm">
                <p className="font-mono break-all">{code.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(code.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Product Barcode Scanner

```tsx
function ProductScanner() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const { 
    isScanning, 
    startScanning, 
    stopScanning, 
    lastResult,
    cameraStream 
  } = useBarcodeScanner({
    formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'],
    onResult: async (result) => {
      setLoading(true);
      try {
        // Lookup product information
        const response = await fetch(`/api/products/${result.text}`);
        const productData = await response.json();
        setProduct(productData);
        stopScanning(); // Stop after successful scan
      } catch (error) {
        console.error('Product lookup failed:', error);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold">Product Scanner</h2>
        <p className="text-gray-600">Scan a product barcode to get information</p>
      </div>

      <div className="relative">
        <video 
          ref={cameraStream}
          autoPlay
          playsInline
          muted
          className="w-full rounded-lg"
        />
        
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-32 border-2 border-white rounded opacity-75"></div>
          </div>
        )}
      </div>

      <button 
        onClick={isScanning ? stopScanning : startScanning}
        disabled={loading}
        className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg disabled:opacity-50"
      >
        {loading ? 'Looking up product...' : 
         isScanning ? 'Stop Scanner' : 'Start Barcode Scanner'}
      </button>

      {lastResult && !product && !loading && (
        <div className="p-3 bg-yellow-50 rounded">
          <p className="text-yellow-700">
            Scanned: {lastResult.text}
          </p>
          <p className="text-yellow-600 text-sm">
            Product not found in database
          </p>
        </div>
      )}

      {product && (
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-700">Product Found!</h3>
          <div className="mt-2 space-y-1">
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Barcode:</strong> {product.barcode}</p>
          </div>
          <button 
            onClick={() => setProduct(null)}
            className="mt-3 px-3 py-1 bg-green-500 text-white rounded text-sm"
          >
            Scan Another
          </button>
        </div>
      )}
    </div>
  );
}
```

### Multi-Format Scanner

```tsx
function MultiFormatScanner() {
  const [selectedFormats, setSelectedFormats] = useState(['qr_code', 'code_128']);
  const [scanHistory, setScanHistory] = useState([]);

  const { 
    isScanning, 
    startScanning, 
    stopScanning, 
    cameraStream,
    clearResults 
  } = useBarcodeScanner({
    formats: selectedFormats,
    continuous: true,
    onResult: (result) => {
      setScanHistory(prev => [{
        ...result,
        id: Date.now()
      }, ...prev.slice(0, 9)]); // Keep last 10 results
    }
  });

  const formatOptions = [
    { value: 'qr_code', label: 'QR Code' },
    { value: 'code_128', label: 'Code 128' },
    { value: 'code_39', label: 'Code 39' },
    { value: 'ean_13', label: 'EAN-13' },
    { value: 'ean_8', label: 'EAN-8' },
    { value: 'upc_a', label: 'UPC-A' },
    { value: 'upc_e', label: 'UPC-E' },
    { value: 'data_matrix', label: 'Data Matrix' }
  ];

  const handleFormatChange = (format) => {
    setSelectedFormats(prev => 
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold">Multi-Format Barcode Scanner</h2>
      </div>

      {/* Format Selection */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Scan Formats</h3>
        <div className="grid grid-cols-2 gap-2">
          {formatOptions.map(option => (
            <label key={option.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedFormats.includes(option.value)}
                onChange={() => handleFormatChange(option.value)}
                disabled={isScanning}
                className="rounded"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="relative">
        <video 
          ref={cameraStream}
          autoPlay
          playsInline
          muted
          className="w-full rounded-lg"
        />
        
        {isScanning && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            Scanning: {selectedFormats.join(', ')}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button 
          onClick={startScanning}
          disabled={isScanning || selectedFormats.length === 0}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Start Scanning
        </button>
        
        <button 
          onClick={stopScanning}
          disabled={!isScanning}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Stop
        </button>
        
        <button 
          onClick={() => setScanHistory([])}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Clear History
        </button>
      </div>

      {scanHistory.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">Scan History ({scanHistory.length})</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {scanHistory.map((result) => (
              <div key={result.id} className="p-3 bg-white border rounded">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-mono text-sm break-all">{result.text}</p>
                    <div className="flex gap-4 text-xs text-gray-500 mt-1">
                      <span>Format: {result.format}</span>
                      <span>Confidence: {Math.round(result.confidence * 100)}%</span>
                      <span>{new Date(result.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText(result.text)}
                    className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Scanner with Overlay

```tsx
function ScannerWithOverlay() {
  const [scanResult, setScanResult] = useState(null);
  const [showOverlay, setShowOverlay] = useState(true);

  const { 
    isScanning, 
    startScanning, 
    stopScanning, 
    cameraStream 
  } = useBarcodeScanner({
    onResult: (result) => {
      setScanResult(result);
      setShowOverlay(false);
      // Auto-stop after successful scan
      setTimeout(stopScanning, 100);
    }
  });

  const resetScanner = () => {
    setScanResult(null);
    setShowOverlay(true);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
        <video 
          ref={cameraStream}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        
        {/* Scanning Overlay */}
        {isScanning && showOverlay && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Dark overlay with transparent center */}
            <div className="absolute inset-0 bg-black bg-opacity-50">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48">
                <div className="w-full h-full border-2 border-white rounded-lg relative">
                  {/* Corner indicators */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-400"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-400"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-400"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-400"></div>
                  
                  {/* Scanning line animation */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-400 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-center">
              <p className="text-lg font-semibold">Scan QR Code</p>
              <p className="text-sm opacity-75">Position code within the frame</p>
            </div>
          </div>
        )}
        
        {/* Result Overlay */}
        {scanResult && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 m-4 max-w-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Scan Successful!</h3>
                <p className="text-sm text-gray-600 mb-4 font-mono break-all">{scanResult.text}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigator.clipboard.writeText(scanResult.text)}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Copy
                  </button>
                  <button 
                    onClick={resetScanner}
                    className="flex-1 px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Scan Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        {!isScanning && !scanResult && (
          <button 
            onClick={startScanning}
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg"
          >
            Start Scanner
          </button>
        )}
        
        {isScanning && (
          <button 
            onClick={stopScanning}
            className="w-full px-4 py-3 bg-red-500 text-white rounded-lg"
          >
            Stop Scanner
          </button>
        )}
      </div>
    </div>
  );
}
```

## Browser Support

Barcode scanning support varies by browser and requires:

- **Camera API**: For video stream access
- **Canvas API**: For image processing
- **WebAssembly**: For barcode detection algorithms

### Support Matrix

- ✅ Chrome 87+ (with BarcodeDetector API)
- ✅ Firefox 82+ (with polyfill)
- ✅ Safari 14+ (with polyfill)
- ✅ Edge 87+ (with BarcodeDetector API)

## Security Requirements

- **HTTPS Required**: Camera access only works on secure origins
- **User Permission**: Requires camera permission
- **Privacy**: Camera stream should be handled securely

## Performance Tips

1. **Limit scan frequency** - Don't scan every frame
2. **Use appropriate resolution** - Higher resolution = slower processing
3. **Stop when not needed** - Release camera resources
4. **Debounce results** - Avoid duplicate scans
5. **Choose specific formats** - Scanning fewer formats is faster

## Best Practices

1. **Provide clear instructions** - Show users how to position codes
2. **Handle permissions gracefully** - Guide users through permission setup
3. **Give visual feedback** - Show scanning state and results clearly
4. **Support manual entry** - Provide fallback for typing codes
5. **Test on real devices** - Camera behavior varies across devices
6. **Handle poor lighting** - Provide tips for better scanning conditions

## Related Hooks

- [useCamera](./use-camera) - Camera access hook
- [useGeolocation](./use-geolocation) - Location access hook
- [usePlatform](./use-platform) - Platform detection hook