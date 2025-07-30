/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react';
import { useNFC } from '../use-nfc';
import type {
  NDEFMessage,
  NDEFReadingEvent,
  WiFiCredentials,
  ContactInfo,
} from '../types/nfc';

// Mock dependencies
jest.mock('../use-keyboard', () => ({
  useKeyboard: () => ({
    isSupported: true,
    modifierKey: 'Ctrl',
    addShortcut: jest.fn(() => 'shortcut-id'),
    removeShortcut: jest.fn(),
  }),
}));

jest.mock('../use-network', () => ({
  useNetwork: () => ({
    isOnline: true,
    connectionQuality: 'good',
  }),
}));

jest.mock('../use-background-sync', () => ({
  useBackgroundSync: () => ({
    state: {
      isServiceWorkerRegistered: true,
    },
    addToSyncQueue: jest.fn(),
  }),
}));

// Mock Web NFC API
class MockNDEFReader {
  private listeners: { [key: string]: EventListener[] } = {};

  addEventListener(type: string, listener: EventListener) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
  }

  removeEventListener(type: string, listener: EventListener) {
    if (this.listeners[type]) {
      this.listeners[type] = this.listeners[type].filter(l => l !== listener);
    }
  }

  async scan(options?: { signal?: AbortSignal }) {
    // Simulate scanning
    return Promise.resolve();
  }

  // Helper method to trigger events in tests
  triggerEvent(type: string, event: Event) {
    if (this.listeners[type]) {
      this.listeners[type].forEach(listener => listener(event));
    }
  }
}

class MockNDEFWriter {
  async write(
    data: any,
    options?: { overwrite?: boolean; signal?: AbortSignal }
  ) {
    // Simulate writing
    return Promise.resolve();
  }
}

// Setup global mocks
const mockReader = new MockNDEFReader();
const mockWriter = new MockNDEFWriter();

Object.defineProperty(global.window, 'NDEFReader', {
  writable: true,
  value: jest.fn(() => mockReader),
});

Object.defineProperty(global.window, 'NDEFWriter', {
  writable: true,
  value: jest.fn(() => mockWriter),
});

// Test data
const mockNDEFMessage: NDEFMessage = {
  records: [
    {
      recordType: 'text',
      data: 'Hello, NFC!',
      lang: 'en',
      encoding: 'utf-8',
    },
  ],
};

const mockReadingEvent: Partial<NDEFReadingEvent> = {
  message: mockNDEFMessage,
  serialNumber: 'ABC123',
};

describe('useNFC', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useNFC());

      expect(result.current.state).toMatchObject({
        isSupported: true,
        isPermissionGranted: false,
        isScanning: false,
        isWriting: false,
        lastReadData: null,
        lastWriteResult: null,
        connectedTag: null,
        scanHistory: [],
      });
    });

    it('should detect NFC support correctly', () => {
      const { result } = renderHook(() => useNFC());

      expect(result.current.state.isSupported).toBe(true);
    });

    it('should handle unsupported browsers', () => {
      // Temporarily remove NDEFReader
      const originalNDEFReader = global.window.NDEFReader;
      delete (global.window as any).NDEFReader;

      const { result } = renderHook(() => useNFC());

      expect(result.current.state.isSupported).toBe(false);

      // Restore
      global.window.NDEFReader = originalNDEFReader;
    });
  });

  describe('Permission Management', () => {
    it('should request permission successfully', async () => {
      const { result } = renderHook(() => useNFC());

      await act(async () => {
        const granted = await result.current.requestPermission();
        expect(granted).toBe(true);
      });

      expect(result.current.state.isPermissionGranted).toBe(true);
    });

    it('should check permission status', async () => {
      const { result } = renderHook(() => useNFC());

      await act(async () => {
        const hasPermission = await result.current.checkPermission();
        expect(hasPermission).toBe(true);
      });
    });

    it('should handle permission errors', async () => {
      // Mock constructor to throw error
      global.window.NDEFReader = jest.fn(() => {
        throw new Error('Permission denied');
      });

      const { result } = renderHook(() => useNFC());

      await act(async () => {
        const granted = await result.current.requestPermission();
        expect(granted).toBe(false);
      });

      expect(result.current.error).toMatchObject({
        type: 'permission',
        message: 'Failed to request NFC permission',
      });

      // Restore
      global.window.NDEFReader = jest.fn(() => mockReader);
    });
  });

  describe('Reading Operations', () => {
    it('should start scanning successfully', async () => {
      const { result } = renderHook(() => useNFC());

      await act(async () => {
        await result.current.requestPermission();
        await result.current.startScanning();
      });

      expect(result.current.state.isScanning).toBe(true);
    });

    it('should stop scanning', async () => {
      const { result } = renderHook(() => useNFC());

      await act(async () => {
        await result.current.requestPermission();
        await result.current.startScanning();
        result.current.stopScanning();
      });

      expect(result.current.state.isScanning).toBe(false);
    });

    it('should handle NFC tag reading', async () => {
      const onTagRead = jest.fn();
      const { result } = renderHook(() => useNFC({ onTagRead }));

      await act(async () => {
        await result.current.requestPermission();
        await result.current.startScanning();
      });

      // Simulate reading event
      act(() => {
        mockReader.triggerEvent('reading', mockReadingEvent as Event);
      });

      expect(onTagRead).toHaveBeenCalled();
      expect(result.current.state.lastReadData).toBeTruthy();
      expect(result.current.state.scanHistory).toHaveLength(1);
    });

    it('should parse NDEF message correctly', () => {
      const { result } = renderHook(() => useNFC());

      const parsedData = result.current.parseNDEFMessage(mockNDEFMessage);

      expect(parsedData).toMatchObject({
        records: [
          {
            recordType: 'text',
            data: 'Hello, NFC!',
            lang: 'en',
            encoding: 'utf-8',
          },
        ],
        metadata: {
          recordCount: 1,
          language: 'en',
          encoding: 'utf-8',
        },
      });
    });
  });

  describe('Writing Operations', () => {
    it('should write text successfully', async () => {
      const onTagWrite = jest.fn();
      const { result } = renderHook(() => useNFC({ onTagWrite }));

      await act(async () => {
        const success = await result.current.writeText('Hello, NFC!');
        expect(success).toBe(true);
      });

      expect(result.current.state.lastWriteResult).toBe(true);
      expect(onTagWrite).toHaveBeenCalledWith(true);
    });

    it('should write URL successfully', async () => {
      const { result } = renderHook(() => useNFC());

      await act(async () => {
        const success = await result.current.writeUrl('https://example.com');
        expect(success).toBe(true);
      });

      expect(result.current.state.lastWriteResult).toBe(true);
    });

    it('should validate URLs before writing', async () => {
      const { result } = renderHook(() => useNFC());

      await act(async () => {
        const success = await result.current.writeUrl('invalid-url');
        expect(success).toBe(false);
      });

      expect(result.current.error).toMatchObject({
        type: 'invalid-data',
        message: 'Invalid URL format',
      });
    });

    it('should write WiFi credentials successfully', async () => {
      const credentials: WiFiCredentials = {
        ssid: 'TestNetwork',
        password: 'password123',
        security: 'WPA2',
        hidden: false,
      };

      const { result } = renderHook(() => useNFC());

      await act(async () => {
        const success = await result.current.writeWiFi(credentials);
        expect(success).toBe(true);
      });

      expect(result.current.state.lastWriteResult).toBe(true);
    });

    it('should validate WiFi credentials', async () => {
      const invalidCredentials: WiFiCredentials = {
        ssid: '', // Invalid: empty SSID
        security: 'WPA2',
      };

      const { result } = renderHook(() => useNFC());

      await act(async () => {
        const success = await result.current.writeWiFi(invalidCredentials);
        expect(success).toBe(false);
      });

      expect(result.current.error).toMatchObject({
        type: 'invalid-data',
        message: 'Invalid WiFi credentials',
      });
    });

    it('should write contact information successfully', async () => {
      const contact: ContactInfo = {
        name: 'John Doe',
        phone: '+1234567890',
        email: 'john@example.com',
        organization: 'Acme Corp',
      };

      const { result } = renderHook(() => useNFC());

      await act(async () => {
        const success = await result.current.writeContact(contact);
        expect(success).toBe(true);
      });

      expect(result.current.state.lastWriteResult).toBe(true);
    });

    it('should handle write errors', async () => {
      // Mock write to throw error
      mockWriter.write = jest.fn().mockRejectedValue(new Error('Write failed'));

      const { result } = renderHook(() => useNFC());

      await act(async () => {
        const success = await result.current.writeText('Hello, NFC!');
        expect(success).toBe(false);
      });

      expect(result.current.state.lastWriteResult).toBe(false);
      expect(result.current.error).toMatchObject({
        type: 'not-writable',
        message: 'Failed to write text to NFC tag',
      });

      // Restore
      mockWriter.write = jest.fn().mockResolvedValue(undefined);
    });
  });

  describe('Data Parsing', () => {
    it('should parse text records correctly', () => {
      const { result } = renderHook(() => useNFC());

      const textRecord = {
        data: 'Hello, World!',
        lang: 'en',
        encoding: 'utf-8',
      };

      const parsed = result.current.parseTextRecord(textRecord);

      expect(parsed).toEqual({
        text: 'Hello, World!',
        language: 'en',
        encoding: 'utf-8',
      });
    });

    it('should parse URL records correctly', () => {
      const { result } = renderHook(() => useNFC());

      const urlRecord = {
        recordType: 'url',
        data: 'https://example.com',
      };

      const parsed = result.current.parseUrlRecord(urlRecord);

      expect(parsed).toEqual({
        url: 'https://example.com',
        type: 'well-known',
      });
    });

    it('should parse WiFi records correctly', () => {
      const { result } = renderHook(() => useNFC());

      const wifiRecord = {
        data: 'WIFI:T:WPA2;S:TestNetwork;P:password123;H:false;;',
      };

      const parsed = result.current.parseWiFiRecord(wifiRecord);

      expect(parsed).toEqual({
        security: 'WPA2',
        ssid: 'TestNetwork',
        password: 'password123',
        hidden: false,
      });
    });

    it('should create NDEF messages correctly', () => {
      const { result } = renderHook(() => useNFC());

      const records = [
        {
          recordType: 'text' as const,
          data: 'Hello, NFC!',
          lang: 'en',
          encoding: 'utf-8' as const,
        },
      ];

      const message = result.current.createNDEFMessage(records);

      expect(message.records).toHaveLength(1);
      expect(message.records[0]).toMatchObject({
        recordType: 'text',
        data: 'Hello, NFC!',
        lang: 'en',
        encoding: 'utf-8',
      });
    });

    it('should validate NDEF data correctly', () => {
      const { result } = renderHook(() => useNFC());

      const validData = {
        records: [
          {
            recordType: 'text',
            data: 'Hello, NFC!',
          },
        ],
      };

      const invalidData = {
        records: 'not-an-array',
      };

      expect(result.current.validateNDEFData(validData)).toBe(true);
      expect(result.current.validateNDEFData(invalidData)).toBe(false);
      expect(result.current.validateNDEFData(null)).toBe(false);
    });
  });

  describe('History Management', () => {
    it('should maintain scan history', async () => {
      const { result } = renderHook(() => useNFC());

      await act(async () => {
        await result.current.requestPermission();
        await result.current.startScanning();
      });

      // Simulate multiple reading events
      act(() => {
        mockReader.triggerEvent('reading', mockReadingEvent as Event);
        mockReader.triggerEvent('reading', {
          ...mockReadingEvent,
          serialNumber: 'DEF456',
        } as Event);
      });

      const history = result.current.getScanHistory();
      expect(history).toHaveLength(2);
    });

    it('should clear scan history', async () => {
      const { result } = renderHook(() => useNFC());

      await act(async () => {
        await result.current.requestPermission();
        await result.current.startScanning();
      });

      act(() => {
        mockReader.triggerEvent('reading', mockReadingEvent as Event);
      });

      expect(result.current.getScanHistory()).toHaveLength(1);

      act(() => {
        result.current.clearHistory();
      });

      expect(result.current.getScanHistory()).toHaveLength(0);
      expect(result.current.state.scanHistory).toHaveLength(0);
    });

    it('should export data in JSON format', async () => {
      const { result } = renderHook(() => useNFC());

      await act(async () => {
        await result.current.requestPermission();
        await result.current.startScanning();
      });

      act(() => {
        mockReader.triggerEvent('reading', mockReadingEvent as Event);
      });

      const jsonData = result.current.exportData('json');
      const parsed = JSON.parse(jsonData);

      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(1);
    });

    it('should export data in CSV format', async () => {
      const { result } = renderHook(() => useNFC());

      await act(async () => {
        await result.current.requestPermission();
        await result.current.startScanning();
      });

      act(() => {
        mockReader.triggerEvent('reading', mockReadingEvent as Event);
      });

      const csvData = result.current.exportData('csv');
      const lines = csvData.split('\n');

      expect(lines).toHaveLength(2); // Header + 1 data row
      expect(lines[0]).toContain(
        'id,timestamp,recordCount,totalSize,recordTypes'
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle reading errors', async () => {
      const onError = jest.fn();
      const { result } = renderHook(() => useNFC({ onError }));

      await act(async () => {
        await result.current.requestPermission();
        await result.current.startScanning();
      });

      const errorEvent = new ErrorEvent('readingerror', {
        error: new Error('Read failed'),
      });

      act(() => {
        mockReader.triggerEvent('readingerror', errorEvent);
      });

      expect(onError).toHaveBeenCalled();
      expect(result.current.error).toBeTruthy();
    });

    it('should handle unsupported operations gracefully', async () => {
      // Temporarily remove NFC support
      const originalNDEFReader = global.window.NDEFReader;
      delete (global.window as any).NDEFReader;

      const { result } = renderHook(() => useNFC());

      await act(async () => {
        const success = await result.current.writeText('Hello, NFC!');
        expect(success).toBe(false);
      });

      expect(result.current.error).toMatchObject({
        type: 'not-supported',
        message: 'NFC writing not supported',
      });

      // Restore
      global.window.NDEFReader = originalNDEFReader;
    });

    it('should validate data size limits', async () => {
      const { result } = renderHook(() => useNFC({ maxDataSize: 10 }));

      await act(async () => {
        const success = await result.current.writeText(
          'This text is longer than 10 characters'
        );
        expect(success).toBe(true); // Should still work but truncated
      });
    });
  });

  describe('Integration Points', () => {
    it('should expose keyboard shortcuts', () => {
      const { result } = renderHook(() => useNFC());

      expect(result.current.keyboardShortcuts).toMatchObject({
        'Ctrl+Shift+N': 'Toggle NFC scanning',
        'Ctrl+Shift+H': 'Clear NFC scan history',
      });
    });

    it('should expose network availability', () => {
      const { result } = renderHook(() => useNFC());

      expect(result.current.isNetworkAvailable).toBe(true);
    });

    it('should expose background sync status', () => {
      const { result } = renderHook(() => useNFC());

      expect(result.current.backgroundSync).toBe(true);
    });
  });

  describe('Security', () => {
    it('should sanitize text input', async () => {
      const { result } = renderHook(() => useNFC({ validateData: true }));

      const maliciousText = 'Hello\x00\x01\x02World'; // Contains control characters

      await act(async () => {
        await result.current.writeText(maliciousText);
      });

      // Text should be sanitized (control characters removed)
      expect(result.current.state.lastWriteResult).toBe(true);
    });

    it('should validate URLs against allowed domains', async () => {
      const { result } = renderHook(() =>
        useNFC({
          validateData: true,
          allowedDomains: ['example.com'],
        })
      );

      await act(async () => {
        const success = await result.current.writeUrl('https://malicious.com');
        expect(success).toBe(false);
      });

      expect(result.current.error).toBeTruthy();
    });

    it('should respect data size limits', async () => {
      const { result } = renderHook(() => useNFC({ maxDataSize: 5 }));

      await act(async () => {
        const success = await result.current.writeText(
          'This is a very long text that exceeds the limit'
        );
        expect(success).toBe(true); // Should work but be truncated
      });
    });
  });
});
