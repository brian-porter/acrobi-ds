import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BarcodeFormat } from '@zxing/library';
import { Scanner } from '../scanner';

// Mock the hooks
vi.mock('../../hooks/use-qr-scanner', () => ({
  useQRScanner: vi.fn(() => ({
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
    supportedFormats: [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.EAN_13,
      BarcodeFormat.CODE_128,
    ],
    enabledFormats: [BarcodeFormat.QR_CODE],
    setEnabledFormats: vi.fn(),
  })),
}));

// Mock GrantPermissions component
vi.mock('../../components/modules/grant-permissions', () => ({
  GrantPermissions: vi.fn(({ onGrant }) => (
    <div data-testid='grant-permissions'>
      <button onClick={onGrant}>Grant Permission</button>
    </div>
  )),
}));

// Mock navigator APIs
const mockNavigator = {
  permissions: {
    query: vi.fn(),
  },
  vibrate: vi.fn(),
  clipboard: {
    writeText: vi.fn(),
  },
};

Object.defineProperty(window, 'navigator', {
  value: mockNavigator,
  writable: true,
});

// Mock audio element
const mockAudio = {
  play: vi.fn().mockResolvedValue(undefined),
  pause: vi.fn(),
  currentTime: 0,
  volume: 1,
};

Object.defineProperty(window, 'HTMLAudioElement', {
  value: vi.fn(() => mockAudio),
  writable: true,
});

describe('Scanner', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock permissions API response
    mockNavigator.permissions.query.mockResolvedValue({
      state: 'granted',
      addEventListener: vi.fn(),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('renders default scanner correctly', () => {
      render(<Scanner />);

      expect(
        screen.getByRole('button', { name: /start scanning/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /switch camera/i })
      ).toBeInTheDocument();
    });

    it('renders minimal variant without extra controls', () => {
      render(<Scanner variant='minimal' />);

      expect(
        screen.getByRole('button', { name: /start scanning/i })
      ).toBeInTheDocument();
      expect(screen.queryByText(/barcode formats/i)).not.toBeInTheDocument();
    });

    it('renders embedded variant without visible controls', () => {
      render(<Scanner variant='embedded' />);

      expect(
        screen.queryByRole('button', { name: /start scanning/i })
      ).not.toBeInTheDocument();
    });

    it('renders full variant with all features', () => {
      render(<Scanner variant='full' />);

      expect(
        screen.getByRole('button', { name: /start scanning/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/scanner settings/i)).toBeInTheDocument();
      expect(screen.getByText(/barcode formats/i)).toBeInTheDocument();
    });
  });

  describe('Permission Handling', () => {
    it('shows permission request when needed', async () => {
      // Mock permission denied state
      mockNavigator.permissions.query.mockResolvedValue({
        state: 'denied',
        addEventListener: vi.fn(),
      });

      render(<Scanner showPermissionRequest={true} />);

      await waitFor(() => {
        expect(screen.getByTestId('grant-permissions')).toBeInTheDocument();
      });
    });

    it('handles permission grant successfully', async () => {
      const mockStartScanning = vi.fn();
      const { useQRScanner } = await import('../../hooks/use-qr-scanner');

      (useQRScanner as any).mockReturnValue({
        stream: null,
        isStreaming: false,
        isLoading: false,
        error: null,
        isSupported: true,
        startScanning: mockStartScanning,
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

      mockNavigator.permissions.query.mockResolvedValue({
        state: 'denied',
        addEventListener: vi.fn(),
      });

      render(<Scanner showPermissionRequest={true} />);

      await waitFor(() => {
        expect(screen.getByTestId('grant-permissions')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Grant Permission'));

      expect(mockStartScanning).toHaveBeenCalled();
    });
  });

  describe('Scanner Controls', () => {
    it('starts scanning when start button is clicked', async () => {
      const mockStartScanning = vi.fn();
      const { useQRScanner } = await import('../../hooks/use-qr-scanner');

      (useQRScanner as any).mockReturnValue({
        stream: null,
        isStreaming: false,
        isLoading: false,
        error: null,
        isSupported: true,
        startScanning: mockStartScanning,
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

      render(<Scanner />);

      fireEvent.click(screen.getByRole('button', { name: /start scanning/i }));

      expect(mockStartScanning).toHaveBeenCalled();
    });

    it('stops scanning when stop button is clicked', async () => {
      const mockStopScanning = vi.fn();
      const { useQRScanner } = await import('../../hooks/use-qr-scanner');

      (useQRScanner as any).mockReturnValue({
        stream: null,
        isStreaming: true,
        isLoading: false,
        error: null,
        isSupported: true,
        startScanning: vi.fn(),
        stopScanning: mockStopScanning,
        isScanning: true,
        lastResult: null,
        results: [],
        clearResults: vi.fn(),
        switchCamera: vi.fn(),
        captureFrame: vi.fn(),
        supportedFormats: [BarcodeFormat.QR_CODE],
        enabledFormats: [BarcodeFormat.QR_CODE],
        setEnabledFormats: vi.fn(),
      });

      render(<Scanner />);

      fireEvent.click(screen.getByRole('button', { name: /stop scanning/i }));

      expect(mockStopScanning).toHaveBeenCalled();
    });

    it('switches camera when switch button is clicked', async () => {
      const mockSwitchCamera = vi.fn();
      const { useQRScanner } = await import('../../hooks/use-qr-scanner');

      (useQRScanner as any).mockReturnValue({
        stream: {},
        isStreaming: true,
        isLoading: false,
        error: null,
        isSupported: true,
        startScanning: vi.fn(),
        stopScanning: vi.fn(),
        isScanning: false,
        lastResult: null,
        results: [],
        clearResults: vi.fn(),
        switchCamera: mockSwitchCamera,
        captureFrame: vi.fn(),
        supportedFormats: [BarcodeFormat.QR_CODE],
        enabledFormats: [BarcodeFormat.QR_CODE],
        setEnabledFormats: vi.fn(),
      });

      render(<Scanner />);

      fireEvent.click(screen.getByRole('button', { name: /switch camera/i }));

      expect(mockSwitchCamera).toHaveBeenCalled();
    });

    it('clears results when clear button is clicked', async () => {
      const mockClearResults = vi.fn();
      const { useQRScanner } = await import('../../hooks/use-qr-scanner');

      (useQRScanner as any).mockReturnValue({
        stream: null,
        isStreaming: false,
        isLoading: false,
        error: null,
        isSupported: true,
        startScanning: vi.fn(),
        stopScanning: vi.fn(),
        isScanning: false,
        lastResult: null,
        results: [
          {
            text: 'test-result',
            format: BarcodeFormat.QR_CODE,
            formatName: 'QR Code',
            timestamp: Date.now(),
          },
        ],
        clearResults: mockClearResults,
        switchCamera: vi.fn(),
        captureFrame: vi.fn(),
        supportedFormats: [BarcodeFormat.QR_CODE],
        enabledFormats: [BarcodeFormat.QR_CODE],
        setEnabledFormats: vi.fn(),
      });

      render(<Scanner showHistory={true} />);

      fireEvent.click(screen.getByRole('button', { name: /clear history/i }));

      expect(mockClearResults).toHaveBeenCalled();
    });
  });

  describe('Format Selection', () => {
    it('toggles barcode formats when format buttons are clicked', async () => {
      const { useQRScanner } = await import('../../hooks/use-qr-scanner');

      (useQRScanner as any).mockReturnValue({
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
        supportedFormats: [
          BarcodeFormat.QR_CODE,
          BarcodeFormat.EAN_13,
          BarcodeFormat.CODE_128,
        ],
        enabledFormats: [BarcodeFormat.QR_CODE],
        setEnabledFormats: vi.fn(),
      });

      render(<Scanner showFormatSelector={true} />);

      // Should show format selector
      expect(screen.getByText(/barcode formats/i)).toBeInTheDocument();

      // Should show format buttons
      expect(
        screen.getByRole('button', { name: /qr code/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /ean-13/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /code 128/i })
      ).toBeInTheDocument();
    });
  });

  describe('Result Display', () => {
    it('displays last scan result when available', async () => {
      const mockResult = {
        text: 'https://example.com',
        format: BarcodeFormat.QR_CODE,
        formatName: 'QR Code',
        timestamp: Date.now(),
        boundingBox: { x: 10, y: 20, width: 100, height: 100 },
      };

      const { useQRScanner } = await import('../../hooks/use-qr-scanner');

      (useQRScanner as any).mockReturnValue({
        stream: null,
        isStreaming: false,
        isLoading: false,
        error: null,
        isSupported: true,
        startScanning: vi.fn(),
        stopScanning: vi.fn(),
        isScanning: false,
        lastResult: mockResult,
        results: [mockResult],
        clearResults: vi.fn(),
        switchCamera: vi.fn(),
        captureFrame: vi.fn(),
        supportedFormats: [BarcodeFormat.QR_CODE],
        enabledFormats: [BarcodeFormat.QR_CODE],
        setEnabledFormats: vi.fn(),
      });

      render(<Scanner />);

      expect(screen.getByText('Last Scan Result')).toBeInTheDocument();
      expect(screen.getByText('https://example.com')).toBeInTheDocument();
      expect(screen.getByText('QR Code')).toBeInTheDocument();
    });

    it('displays scan history when available', async () => {
      const mockResults = [
        {
          text: 'Result 1',
          format: BarcodeFormat.QR_CODE,
          formatName: 'QR Code',
          timestamp: Date.now() - 1000,
        },
        {
          text: 'Result 2',
          format: BarcodeFormat.EAN_13,
          formatName: 'EAN-13',
          timestamp: Date.now(),
        },
      ];

      const { useQRScanner } = await import('../../hooks/use-qr-scanner');

      (useQRScanner as any).mockReturnValue({
        stream: null,
        isStreaming: false,
        isLoading: false,
        error: null,
        isSupported: true,
        startScanning: vi.fn(),
        stopScanning: vi.fn(),
        isScanning: false,
        lastResult: null,
        results: mockResults,
        clearResults: vi.fn(),
        switchCamera: vi.fn(),
        captureFrame: vi.fn(),
        supportedFormats: [BarcodeFormat.QR_CODE],
        enabledFormats: [BarcodeFormat.QR_CODE],
        setEnabledFormats: vi.fn(),
      });

      render(<Scanner showHistory={true} />);

      expect(screen.getByText(/scan history/i)).toBeInTheDocument();
      expect(screen.getByText('Result 1')).toBeInTheDocument();
      expect(screen.getByText('Result 2')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('displays error message when scanner error occurs', async () => {
      const { useQRScanner } = await import('../../hooks/use-qr-scanner');

      (useQRScanner as any).mockReturnValue({
        stream: null,
        isStreaming: false,
        isLoading: false,
        error: 'Camera access denied',
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

      render(<Scanner />);

      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Camera access denied')).toBeInTheDocument();
    });

    it('shows unsupported message when scanner is not supported', async () => {
      const { useQRScanner } = await import('../../hooks/use-qr-scanner');

      (useQRScanner as any).mockReturnValue({
        stream: null,
        isStreaming: false,
        isLoading: false,
        error: null,
        isSupported: false,
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

      render(<Scanner />);

      expect(screen.getByText('Camera Not Supported')).toBeInTheDocument();
      expect(
        screen.getByText(/your browser or device doesn't support/i)
      ).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('calls onResult callback when result is received', async () => {
      const onResult = vi.fn();
      const mockResult = {
        text: 'test-result',
        format: BarcodeFormat.QR_CODE,
        formatName: 'QR Code',
        timestamp: Date.now(),
      };

      render(<Scanner onResult={onResult} />);

      // Simulate result callback from hook
      const { useQRScanner } = await import('../../hooks/use-qr-scanner');
      const hookCall = (useQRScanner as any).mock.calls[0][0];

      if (hookCall.onResult) {
        hookCall.onResult(mockResult);
      }

      expect(onResult).toHaveBeenCalledWith(mockResult);
    });

    it('calls onError callback when error occurs', async () => {
      const onError = vi.fn();

      render(<Scanner onError={onError} />);

      // Simulate error callback from hook
      const { useQRScanner } = await import('../../hooks/use-qr-scanner');
      const hookCall = (useQRScanner as any).mock.calls[0][0];

      if (hookCall.onError) {
        hookCall.onError('Test error');
      }

      expect(onError).toHaveBeenCalledWith('Test error');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      render(<Scanner />);

      // Check for proper button roles and accessible names
      expect(
        screen.getByRole('button', { name: /start scanning/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /switch camera/i })
      ).toBeInTheDocument();
    });

    it('provides keyboard navigation support', () => {
      render(<Scanner />);

      const startButton = screen.getByRole('button', {
        name: /start scanning/i,
      });

      // Should be focusable
      startButton.focus();
      expect(document.activeElement).toBe(startButton);
    });
  });

  describe('Settings', () => {
    it('shows settings panel in full variant', () => {
      render(<Scanner variant='full' />);

      expect(screen.getByText(/scanner settings/i)).toBeInTheDocument();
      expect(screen.getByText(/continuous scanning/i)).toBeInTheDocument();
      expect(screen.getByText(/audio feedback/i)).toBeInTheDocument();
      expect(screen.getByText(/haptic feedback/i)).toBeInTheDocument();
    });

    it('enables/disables haptic feedback based on browser support', () => {
      // Test with vibrate support
      render(<Scanner variant='full' />);

      const hapticSwitch = screen.getByRole('switch', {
        name: /haptic feedback/i,
      });
      expect(hapticSwitch).not.toBeDisabled();

      // Test without vibrate support
      const originalVibrate = navigator.vibrate;
      delete (navigator as any).vibrate;

      render(<Scanner variant='full' />);

      const hapticSwitchDisabled = screen
        .getAllByRole('switch')
        .find(
          element =>
            element.getAttribute('aria-label')?.includes('haptic') ||
            element.closest('div')?.textContent?.includes('Haptic Feedback')
        );

      expect(hapticSwitchDisabled).toBeDisabled();

      // Restore
      (navigator as any).vibrate = originalVibrate;
    });
  });
});
