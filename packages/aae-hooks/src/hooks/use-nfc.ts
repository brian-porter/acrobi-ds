/**
 * useNFC Hook
 * Epic 48 - AAE Web NFC Integration
 *
 * Comprehensive NFC hook with Web NFC API integration, NDEF message handling,
 * NFC tag reading/writing, and security validation.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useKeyboard } from './use-keyboard';
import { useNetwork } from './use-network';
import { useBackgroundSync } from './use-background-sync';
import type {
  NFCOptions,
  NFCState,
  NFCData,
  NFCTag,
  NFCError,
  NDEFRecordData,
  NDEFMessage,
  WiFiCredentials,
  ContactInfo,
  UseNFCReturn,
  NFCReader,
  NFCWriter,
  NDEFReadingEvent,
  NFCBrowserSupport,
} from './types/nfc';

// Default configuration
const DEFAULT_OPTIONS: Required<
  Omit<
    NFCOptions,
    'signal' | 'onTagRead' | 'onTagWrite' | 'onError' | 'onPermissionChange'
  >
> = {
  ignoreRead: false,
  overwrite: false,
  textEncoding: 'utf-8',
  languageCode: 'en',
  validateData: true,
  allowedDomains: [],
  maxDataSize: 8192, // 8KB default limit
  backgroundScan: false,
  scanInterval: 1000,
};

// Utility functions
const isNFCSupported = (): boolean => {
  return typeof window !== 'undefined' && 'NDEFReader' in window;
};

const generateId = (): string => {
  return `nfc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getBrowserSupport = (): NFCBrowserSupport => {
  if (typeof window === 'undefined') {
    return {
      isNDEFSupported: false,
      isReaderSupported: false,
      isWriterSupported: false,
      browserName: 'unknown',
      browserVersion: 'unknown',
      platform: 'unknown',
    };
  }

  const userAgent = navigator.userAgent;
  const isChrome = /Chrome/.test(userAgent);
  const isSamsung = /SamsungBrowser/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);

  return {
    isNDEFSupported: 'NDEFReader' in window,
    isReaderSupported: 'NDEFReader' in window,
    isWriterSupported: 'NDEFWriter' in window,
    browserName: isSamsung
      ? 'Samsung Internet'
      : isChrome
        ? 'Chrome'
        : 'unknown',
    browserVersion: 'unknown',
    platform: isAndroid ? 'Android' : 'unknown',
  };
};

// NDEF Message utilities
const createTextRecord = (
  text: string,
  lang: string = 'en',
  encoding: 'utf-8' | 'utf-16' = 'utf-8'
): NDEFRecordData => ({
  recordType: 'text',
  data: text,
  lang,
  encoding,
});

const createUrlRecord = (url: string): NDEFRecordData => ({
  recordType: 'url',
  data: url,
});

const createWiFiRecord = (credentials: WiFiCredentials): NDEFRecordData => ({
  recordType: 'wifi',
  data: credentials,
});

const createContactRecord = (contact: ContactInfo): NDEFRecordData => ({
  recordType: 'contact',
  data: contact,
  mediaType: 'text/vcard',
});

// Data validation utilities
const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const validateWiFiCredentials = (credentials: WiFiCredentials): boolean => {
  if (!credentials.ssid || credentials.ssid.trim().length === 0) {
    return false;
  }

  const validSecurityTypes = ['OPEN', 'WEP', 'WPA', 'WPA2', 'WPA3'];
  if (!validSecurityTypes.includes(credentials.security)) {
    return false;
  }

  // Password required for non-open networks
  if (
    credentials.security !== 'OPEN' &&
    (!credentials.password || credentials.password.length === 0)
  ) {
    return false;
  }

  return true;
};

const validateContactInfo = (contact: ContactInfo): boolean => {
  // At least one field must be present
  return !!(
    contact.name ||
    contact.phone ||
    contact.email ||
    contact.organization ||
    contact.url
  );
};

// Data sanitization
const sanitizeText = (text: string, maxLength: number = 1000): string => {
  return text.slice(0, maxLength).replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, '');
};

const sanitizeUrl = (url: string, allowedDomains: string[] = []): string => {
  try {
    const urlObj = new URL(url);

    // Check allowed domains if specified
    if (allowedDomains.length > 0) {
      const isAllowed = allowedDomains.some(
        domain =>
          urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
      );
      if (!isAllowed) {
        throw new Error('Domain not in allowed list');
      }
    }

    // Only allow HTTP/HTTPS protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      throw new Error('Invalid protocol');
    }

    return urlObj.toString();
  } catch (error) {
    throw new Error(
      `Invalid URL: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

// vCard generation for contacts
const generateVCard = (contact: ContactInfo): string => {
  let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';

  if (contact.name) {
    vcard += `FN:${contact.name}\n`;
  }

  if (contact.phone) {
    vcard += `TEL:${contact.phone}\n`;
  }

  if (contact.email) {
    vcard += `EMAIL:${contact.email}\n`;
  }

  if (contact.organization) {
    vcard += `ORG:${contact.organization}\n`;
  }

  if (contact.url) {
    vcard += `URL:${contact.url}\n`;
  }

  if (contact.address) {
    const addr = contact.address;
    const addressStr = [
      addr.street || '',
      addr.city || '',
      addr.state || '',
      addr.postalCode || '',
      addr.country || '',
    ]
      .filter(Boolean)
      .join(';');

    if (addressStr) {
      vcard += `ADR:;;${addressStr}\n`;
    }
  }

  vcard += 'END:VCARD';
  return vcard;
};

// WiFi record generation
const generateWiFiRecord = (credentials: WiFiCredentials): string => {
  const { ssid, password = '', security, hidden = false } = credentials;
  return `WIFI:T:${security};S:${ssid};P:${password};H:${hidden ? 'true' : 'false'};;`;
};

export function useNFC(options: NFCOptions = {}): UseNFCReturn {
  const config = { ...DEFAULT_OPTIONS, ...options };

  // Epic integrations
  const keyboard = useKeyboard();
  const network = useNetwork();
  const backgroundSync = useBackgroundSync();

  // State
  const [state, setState] = useState<NFCState>(() => {
    const browserSupport = getBrowserSupport();
    return {
      isSupported: browserSupport.isNDEFSupported,
      isPermissionGranted: false,
      isScanning: false,
      isWriting: false,
      lastReadData: null,
      lastWriteResult: null,
      connectedTag: null,
      scanHistory: [],
    };
  });

  const [error, setError] = useState<NFCError | null>(null);

  // Refs
  const readerRef = useRef<NFCReader | null>(null);
  const writerRef = useRef<NFCWriter | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const keyboardShortcutIds = useRef<string[]>([]);
  const scanHistoryRef = useRef<NFCData[]>([]);

  // Error handling
  const handleError = useCallback(
    (
      type: NFCError['type'],
      message: string,
      originalError?: Error,
      tagId?: string
    ) => {
      const nfcError: NFCError = { type, message, originalError, tagId };
      setError(nfcError);
      options.onError?.(nfcError);
    },
    [options]
  );

  // Permission management
  const checkPermission = useCallback(async (): Promise<boolean> => {
    if (!state.isSupported) {
      return false;
    }

    try {
      // Web NFC doesn't have explicit permission API, we check by attempting to create a reader
      const reader = new window.NDEFReader!();
      return true;
    } catch (error) {
      handleError(
        'permission',
        'Failed to check NFC permission',
        error as Error
      );
      return false;
    }
  }, [state.isSupported, handleError]);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!state.isSupported) {
      handleError('not-supported', 'NFC is not supported in this browser');
      return false;
    }

    try {
      setError(null);

      // Create reader to trigger permission request
      const reader = new window.NDEFReader!();
      readerRef.current = reader;

      setState(prev => ({ ...prev, isPermissionGranted: true }));
      options.onPermissionChange?.(true);

      return true;
    } catch (error) {
      handleError(
        'permission',
        'Failed to request NFC permission',
        error as Error
      );
      setState(prev => ({ ...prev, isPermissionGranted: false }));
      options.onPermissionChange?.(false);
      return false;
    }
  }, [state.isSupported, options, handleError]);

  // Reading operations
  const startScanning = useCallback(
    async (scanOptions: Partial<NFCOptions> = {}): Promise<void> => {
      if (!state.isSupported || !state.isPermissionGranted) {
        const hasPermission = await requestPermission();
        if (!hasPermission) {
          return;
        }
      }

      if (state.isScanning) {
        return;
      }

      try {
        setError(null);

        // Create abort controller for this scan session
        abortControllerRef.current = new AbortController();

        const reader = readerRef.current || new window.NDEFReader!();
        readerRef.current = reader;

        // Set up event listeners
        const handleReading = (event: Event) => {
          const readingEvent = event as NDEFReadingEvent;
          const nfcData = parseNDEFMessage(readingEvent.message);
          nfcData.tagInfo = {
            id: readingEvent.serialNumber,
            type: 'unknown',
            writable: true,
            formatted: true,
            canMakeReadOnly: false,
          };

          setState(prev => ({
            ...prev,
            lastReadData: nfcData,
            connectedTag: nfcData.tagInfo || null,
          }));

          // Add to history
          scanHistoryRef.current = [
            nfcData,
            ...scanHistoryRef.current.slice(0, 99),
          ]; // Keep last 100
          setState(prev => ({
            ...prev,
            scanHistory: [...scanHistoryRef.current],
          }));

          options.onTagRead?.(nfcData);

          // Background sync if enabled
          if (
            config.backgroundScan &&
            backgroundSync.state.isServiceWorkerRegistered
          ) {
            backgroundSync.addToSyncQueue({
              type: 'nfc-data',
              data: nfcData,
              priority: 'medium',
              maxRetries: 3,
            });
          }
        };

        const handleError = (event: Event) => {
          const errorEvent = event as ErrorEvent;
          handleError(
            'not-readable',
            'Failed to read NFC tag',
            errorEvent.error
          );
        };

        reader.addEventListener('reading', handleReading);
        reader.addEventListener('readingerror', handleError);

        // Start scanning
        await reader.scan({
          signal: scanOptions.signal || abortControllerRef.current.signal,
        });

        setState(prev => ({ ...prev, isScanning: true }));
      } catch (error) {
        handleError(
          'not-readable',
          'Failed to start NFC scanning',
          error as Error
        );
      }
    },
    [
      state.isSupported,
      state.isPermissionGranted,
      state.isScanning,
      requestPermission,
      options,
      config.backgroundScan,
      backgroundSync,
      handleError,
    ]
  );

  const stopScanning = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setState(prev => ({
      ...prev,
      isScanning: false,
      connectedTag: null,
    }));
  }, []);

  const readTag = useCallback(async (): Promise<NFCData | null> => {
    return new Promise(resolve => {
      const originalCallback = options.onTagRead;

      // Temporarily override callback to capture read data
      const tempOptions = {
        ...options,
        onTagRead: (data: NFCData) => {
          originalCallback?.(data);
          resolve(data);
        },
      };

      startScanning(tempOptions).catch(() => resolve(null));

      // Timeout after 10 seconds
      setTimeout(() => resolve(null), 10000);
    });
  }, [options, startScanning]);

  // Writing operations
  const writeText = useCallback(
    async (
      text: string,
      writeOptions: { language?: string; encoding?: 'utf-8' | 'utf-16' } = {}
    ): Promise<boolean> => {
      if (!state.isSupported) {
        handleError('not-supported', 'NFC writing not supported');
        return false;
      }

      if (!text || text.trim().length === 0) {
        handleError('invalid-data', 'Text cannot be empty');
        return false;
      }

      try {
        setError(null);
        setState(prev => ({ ...prev, isWriting: true }));

        const sanitizedText = config.validateData
          ? sanitizeText(text, config.maxDataSize)
          : text;
        const record = createTextRecord(
          sanitizedText,
          writeOptions.language || config.languageCode,
          writeOptions.encoding || config.textEncoding
        );

        const message = createNDEFMessage([record]);

        const writer = new window.NDEFWriter!();
        await writer.write(message, { overwrite: config.overwrite });

        setState(prev => ({
          ...prev,
          isWriting: false,
          lastWriteResult: true,
        }));

        options.onTagWrite?.(true);
        return true;
      } catch (error) {
        setState(prev => ({
          ...prev,
          isWriting: false,
          lastWriteResult: false,
        }));

        handleError(
          'not-writable',
          'Failed to write text to NFC tag',
          error as Error
        );
        options.onTagWrite?.(false);
        return false;
      }
    },
    [state.isSupported, config, options, handleError]
  );

  const writeUrl = useCallback(
    async (url: string): Promise<boolean> => {
      if (!state.isSupported) {
        handleError('not-supported', 'NFC writing not supported');
        return false;
      }

      if (!validateUrl(url)) {
        handleError('invalid-data', 'Invalid URL format');
        return false;
      }

      try {
        setError(null);
        setState(prev => ({ ...prev, isWriting: true }));

        const sanitizedUrl = config.validateData
          ? sanitizeUrl(url, config.allowedDomains)
          : url;
        const record = createUrlRecord(sanitizedUrl);
        const message = createNDEFMessage([record]);

        const writer = new window.NDEFWriter!();
        await writer.write(message, { overwrite: config.overwrite });

        setState(prev => ({
          ...prev,
          isWriting: false,
          lastWriteResult: true,
        }));

        options.onTagWrite?.(true);
        return true;
      } catch (error) {
        setState(prev => ({
          ...prev,
          isWriting: false,
          lastWriteResult: false,
        }));

        handleError(
          'not-writable',
          'Failed to write URL to NFC tag',
          error as Error
        );
        options.onTagWrite?.(false);
        return false;
      }
    },
    [state.isSupported, config, options, handleError]
  );

  const writeWiFi = useCallback(
    async (credentials: WiFiCredentials): Promise<boolean> => {
      if (!state.isSupported) {
        handleError('not-supported', 'NFC writing not supported');
        return false;
      }

      if (!validateWiFiCredentials(credentials)) {
        handleError('invalid-data', 'Invalid WiFi credentials');
        return false;
      }

      try {
        setError(null);
        setState(prev => ({ ...prev, isWriting: true }));

        const wifiString = generateWiFiRecord(credentials);
        const record = createTextRecord(wifiString, 'en', 'utf-8');
        const message = createNDEFMessage([record]);

        const writer = new window.NDEFWriter!();
        await writer.write(message, { overwrite: config.overwrite });

        setState(prev => ({
          ...prev,
          isWriting: false,
          lastWriteResult: true,
        }));

        options.onTagWrite?.(true);
        return true;
      } catch (error) {
        setState(prev => ({
          ...prev,
          isWriting: false,
          lastWriteResult: false,
        }));

        handleError(
          'not-writable',
          'Failed to write WiFi credentials to NFC tag',
          error as Error
        );
        options.onTagWrite?.(false);
        return false;
      }
    },
    [state.isSupported, config, options, handleError]
  );

  const writeContact = useCallback(
    async (contact: ContactInfo): Promise<boolean> => {
      if (!state.isSupported) {
        handleError('not-supported', 'NFC writing not supported');
        return false;
      }

      if (!validateContactInfo(contact)) {
        handleError('invalid-data', 'Invalid contact information');
        return false;
      }

      try {
        setError(null);
        setState(prev => ({ ...prev, isWriting: true }));

        const vcard = generateVCard(contact);
        const record: NDEFRecordData = {
          recordType: 'mime',
          mediaType: 'text/vcard',
          data: vcard,
        };

        const message = createNDEFMessage([record]);

        const writer = new window.NDEFWriter!();
        await writer.write(message, { overwrite: config.overwrite });

        setState(prev => ({
          ...prev,
          isWriting: false,
          lastWriteResult: true,
        }));

        options.onTagWrite?.(true);
        return true;
      } catch (error) {
        setState(prev => ({
          ...prev,
          isWriting: false,
          lastWriteResult: false,
        }));

        handleError(
          'not-writable',
          'Failed to write contact to NFC tag',
          error as Error
        );
        options.onTagWrite?.(false);
        return false;
      }
    },
    [state.isSupported, config, options, handleError]
  );

  const writeCustom = useCallback(
    async (records: NDEFRecordData[]): Promise<boolean> => {
      if (!state.isSupported) {
        handleError('not-supported', 'NFC writing not supported');
        return false;
      }

      if (!records || records.length === 0) {
        handleError('invalid-data', 'No records provided');
        return false;
      }

      try {
        setError(null);
        setState(prev => ({ ...prev, isWriting: true }));

        const message = createNDEFMessage(records);

        const writer = new window.NDEFWriter!();
        await writer.write(message, { overwrite: config.overwrite });

        setState(prev => ({
          ...prev,
          isWriting: false,
          lastWriteResult: true,
        }));

        options.onTagWrite?.(true);
        return true;
      } catch (error) {
        setState(prev => ({
          ...prev,
          isWriting: false,
          lastWriteResult: false,
        }));

        handleError(
          'not-writable',
          'Failed to write custom records to NFC tag',
          error as Error
        );
        options.onTagWrite?.(false);
        return false;
      }
    },
    [state.isSupported, config, options, handleError]
  );

  // Data parsing utilities
  const parseNDEFMessage = useCallback((message: NDEFMessage): NFCData => {
    const records: NDEFRecordData[] = message.records.map((record, index) => {
      let recordType: NDEFRecordData['recordType'] = 'unknown';
      let data: any = record.data;

      // Determine record type and parse data
      switch (record.recordType) {
        case 'text':
          recordType = 'text';
          if (record.data instanceof ArrayBuffer) {
            const decoder = new TextDecoder(record.encoding || 'utf-8');
            data = decoder.decode(record.data);
          }
          break;

        case 'url':
        case 'absolute-url':
          recordType = 'url';
          if (record.data instanceof ArrayBuffer) {
            const decoder = new TextDecoder();
            data = decoder.decode(record.data);
          }
          break;

        case 'mime':
          if (record.mediaType === 'text/vcard') {
            recordType = 'contact';
          } else {
            recordType = 'mime';
          }
          break;

        default:
          recordType = 'unknown';
      }

      return {
        recordType,
        data,
        id: record.id || `record_${index}`,
        mediaType: record.mediaType,
        lang: record.lang,
        encoding: record.encoding as 'utf-8' | 'utf-16' | undefined,
      };
    });

    const totalSize = message.records.reduce((size, record) => {
      if (record.data instanceof ArrayBuffer) {
        return size + record.data.byteLength;
      }
      return size + (typeof record.data === 'string' ? record.data.length : 0);
    }, 0);

    return {
      id: generateId(),
      timestamp: Date.now(),
      records,
      metadata: {
        recordCount: records.length,
        totalSize,
        encoding: records[0]?.encoding,
        language: records[0]?.lang,
      },
    };
  }, []);

  const createNDEFMessage = useCallback(
    (records: NDEFRecordData[]): NDEFMessage => {
      const ndefRecords = records.map(record => ({
        recordType: record.recordType,
        data: record.data,
        id: record.id,
        mediaType: record.mediaType,
        lang: record.lang,
        encoding: record.encoding,
      }));

      return { records: ndefRecords };
    },
    []
  );

  const validateNDEFData = useCallback((data: any): boolean => {
    if (!data || typeof data !== 'object') {
      return false;
    }

    if (!Array.isArray(data.records)) {
      return false;
    }

    return data.records.every((record: any) => {
      return (
        record &&
        typeof record === 'object' &&
        record.recordType &&
        record.data !== undefined
      );
    });
  }, []);

  // Format-specific parsers
  const parseTextRecord = useCallback((record: any) => {
    const text = typeof record.data === 'string' ? record.data : '';
    const language = record.lang || 'en';
    const encoding = record.encoding || 'utf-8';

    return { text, language, encoding };
  }, []);

  const parseUrlRecord = useCallback((record: any) => {
    const url = typeof record.data === 'string' ? record.data : '';
    const type =
      record.recordType === 'absolute-url' ? 'absolute' : 'well-known';

    return { url, type };
  }, []);

  const parseWiFiRecord = useCallback((record: any): WiFiCredentials => {
    const data = typeof record.data === 'string' ? record.data : '';

    // Parse WIFI: format string
    const wifiMatch = data.match(
      /WIFI:T:([^;]*);S:([^;]*);P:([^;]*);H:([^;]*);/
    );

    if (!wifiMatch) {
      throw new Error('Invalid WiFi record format');
    }

    return {
      security: wifiMatch[1] as WiFiCredentials['security'],
      ssid: wifiMatch[2],
      password: wifiMatch[3] || undefined,
      hidden: wifiMatch[4] === 'true',
    };
  }, []);

  const parseContactRecord = useCallback((record: any): ContactInfo => {
    const vcard = typeof record.data === 'string' ? record.data : '';
    const contact: ContactInfo = {};

    // Parse vCard format
    const lines = vcard.split('\n');

    for (const line of lines) {
      const [key, value] = line.split(':', 2);
      if (!value) continue;

      switch (key) {
        case 'FN':
          contact.name = value;
          break;
        case 'TEL':
          contact.phone = value;
          break;
        case 'EMAIL':
          contact.email = value;
          break;
        case 'ORG':
          contact.organization = value;
          break;
        case 'URL':
          contact.url = value;
          break;
        case 'ADR':
          // Simple address parsing - in real implementation, this would be more sophisticated
          const addressParts = value.split(';');
          contact.address = {
            street: addressParts[2] || undefined,
            city: addressParts[3] || undefined,
            state: addressParts[4] || undefined,
            postalCode: addressParts[5] || undefined,
            country: addressParts[6] || undefined,
          };
          break;
      }
    }

    return contact;
  }, []);

  // History and management
  const getScanHistory = useCallback(() => {
    return [...scanHistoryRef.current];
  }, []);

  const clearHistory = useCallback(() => {
    scanHistoryRef.current = [];
    setState(prev => ({ ...prev, scanHistory: [] }));
  }, []);

  const exportData = useCallback(
    (format: 'json' | 'csv'): string => {
      const history = getScanHistory();

      if (format === 'json') {
        return JSON.stringify(history, null, 2);
      }

      // CSV format
      const headers = [
        'id',
        'timestamp',
        'recordCount',
        'totalSize',
        'recordTypes',
      ];
      const rows = history.map(data => [
        data.id,
        new Date(data.timestamp).toISOString(),
        data.metadata.recordCount,
        data.metadata.totalSize,
        data.records.map(r => r.recordType).join('|'),
      ]);

      return [headers, ...rows].map(row => row.join(',')).join('\n');
    },
    [getScanHistory]
  );

  // Keyboard shortcuts integration
  useEffect(() => {
    if (!keyboard.isSupported) return;

    // Clear existing shortcuts
    keyboardShortcutIds.current.forEach(id => keyboard.removeShortcut(id));
    keyboardShortcutIds.current = [];

    // Add NFC shortcuts
    const shortcuts = [
      {
        keys: '$mod+Shift+N',
        callback: (event: KeyboardEvent) => {
          event.preventDefault();
          if (state.isScanning) {
            stopScanning();
          } else {
            startScanning();
          }
        },
        description: 'Toggle NFC scanning',
      },
      {
        keys: '$mod+Shift+H',
        callback: (event: KeyboardEvent) => {
          event.preventDefault();
          clearHistory();
        },
        description: 'Clear NFC scan history',
      },
    ];

    shortcuts.forEach(shortcut => {
      const id = keyboard.addShortcut(shortcut);
      keyboardShortcutIds.current.push(id);
    });

    return () => {
      keyboardShortcutIds.current.forEach(id => keyboard.removeShortcut(id));
      keyboardShortcutIds.current = [];
    };
  }, [keyboard, state.isScanning, startScanning, stopScanning, clearHistory]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);

  return {
    // State
    state,
    error,

    // Permission management
    requestPermission,
    checkPermission,

    // Reading operations
    startScanning,
    stopScanning,
    readTag,

    // Writing operations
    writeText,
    writeUrl,
    writeWiFi,
    writeContact,
    writeCustom,

    // Data parsing utilities
    parseNDEFMessage,
    createNDEFMessage,
    validateNDEFData,

    // Format-specific parsers
    parseTextRecord,
    parseUrlRecord,
    parseWiFiRecord,
    parseContactRecord,

    // History and management
    getScanHistory,
    clearHistory,
    exportData,

    // Integration points
    isNetworkAvailable: network.isOnline,
    keyboardShortcuts: {
      [`${keyboard.modifierKey}+Shift+N`]: 'Toggle NFC scanning',
      [`${keyboard.modifierKey}+Shift+H`]: 'Clear NFC scan history',
    },
    backgroundSync: backgroundSync.state.isServiceWorkerRegistered,
  };
}
