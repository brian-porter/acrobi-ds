/**
 * NFC Type Definitions
 * Epic 48 - AAE Web NFC Integration
 *
 * Comprehensive TypeScript interfaces for Web NFC API integration,
 * NDEF message handling, and NFC tag operations.
 */

// Web NFC API Types (extending browser APIs)
export interface NFCReader {
  scan(options?: NFCReaderOptions): Promise<void>;
  addEventListener(
    type: 'reading' | 'readingerror',
    listener: EventListener
  ): void;
  removeEventListener(
    type: 'reading' | 'readingerror',
    listener: EventListener
  ): void;
}

export interface NFCWriter {
  write(
    data: string | ArrayBuffer | NDEFMessage,
    options?: NFCWriterOptions
  ): Promise<void>;
}

export interface NFCReaderOptions {
  signal?: AbortSignal;
}

export interface NFCWriterOptions {
  overwrite?: boolean;
  signal?: AbortSignal;
}

// NDEF Message and Record Types
export interface NDEFMessage {
  records: NDEFRecord[];
}

export interface NDEFRecord {
  recordType: string;
  mediaType?: string;
  id?: string;
  data?: any;
  encoding?: string;
  lang?: string;
}

export interface NDEFReadingEvent extends Event {
  message: NDEFMessage;
  serialNumber: string;
}

// Application-specific NFC Types
export interface NFCOptions {
  // Reader configuration
  ignoreRead?: boolean;
  signal?: AbortSignal;

  // Writer configuration
  overwrite?: boolean;

  // Data format options
  textEncoding?: 'utf-8' | 'utf-16';
  languageCode?: string;

  // Security options
  validateData?: boolean;
  allowedDomains?: string[];
  maxDataSize?: number;

  // Background monitoring
  backgroundScan?: boolean;
  scanInterval?: number;

  // Callbacks
  onTagRead?: (data: NFCData) => void;
  onTagWrite?: (success: boolean) => void;
  onError?: (error: NFCError) => void;
  onPermissionChange?: (granted: boolean) => void;
}

export interface NFCState {
  isSupported: boolean;
  isPermissionGranted: boolean;
  isScanning: boolean;
  isWriting: boolean;
  lastReadData: NFCData | null;
  lastWriteResult: boolean | null;
  connectedTag: NFCTag | null;
  scanHistory: NFCData[];
}

export interface NFCData {
  id: string;
  timestamp: number;
  records: NDEFRecordData[];
  rawData?: ArrayBuffer;
  tagInfo?: NFCTag;
  metadata: {
    recordCount: number;
    totalSize: number;
    encoding?: string;
    language?: string;
  };
}

export interface NDEFRecordData {
  recordType:
    | 'text'
    | 'url'
    | 'wifi'
    | 'contact'
    | 'mime'
    | 'absolute-url'
    | 'external'
    | 'unknown';
  data: any;
  id?: string;
  mediaType?: string;
  lang?: string;
  encoding?: 'utf-8' | 'utf-16';
}

export interface NFCTag {
  id: string;
  type: string;
  maxSize?: number;
  writable: boolean;
  formatted: boolean;
  canMakeReadOnly: boolean;
}

export interface NFCError {
  type:
    | 'permission'
    | 'not-supported'
    | 'not-readable'
    | 'not-writable'
    | 'invalid-data'
    | 'security'
    | 'network';
  message: string;
  originalError?: Error;
  tagId?: string;
}

// Format-specific data interfaces
export interface WiFiCredentials {
  ssid: string;
  password?: string;
  security: 'OPEN' | 'WEP' | 'WPA' | 'WPA2' | 'WPA3';
  hidden?: boolean;
}

export interface ContactInfo {
  name?: string;
  phone?: string;
  email?: string;
  organization?: string;
  url?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
}

// Hook return interface
export interface UseNFCReturn {
  // State
  state: NFCState;
  error: NFCError | null;

  // Permission management
  requestPermission: () => Promise<boolean>;
  checkPermission: () => Promise<boolean>;

  // Reading operations
  startScanning: (options?: Partial<NFCOptions>) => Promise<void>;
  stopScanning: () => void;
  readTag: () => Promise<NFCData | null>;

  // Writing operations
  writeText: (
    text: string,
    options?: { language?: string; encoding?: 'utf-8' | 'utf-16' }
  ) => Promise<boolean>;
  writeUrl: (url: string) => Promise<boolean>;
  writeWiFi: (credentials: WiFiCredentials) => Promise<boolean>;
  writeContact: (contact: ContactInfo) => Promise<boolean>;
  writeCustom: (records: NDEFRecordData[]) => Promise<boolean>;

  // Data parsing utilities
  parseNDEFMessage: (message: NDEFMessage) => NFCData;
  createNDEFMessage: (records: NDEFRecordData[]) => NDEFMessage;
  validateNDEFData: (data: any) => boolean;

  // Format-specific parsers
  parseTextRecord: (record: any) => {
    text: string;
    language: string;
    encoding: string;
  };
  parseUrlRecord: (record: any) => {
    url: string;
    type: 'absolute' | 'well-known';
  };
  parseWiFiRecord: (record: any) => WiFiCredentials;
  parseContactRecord: (record: any) => ContactInfo;

  // History and management
  getScanHistory: () => NFCData[];
  clearHistory: () => void;
  exportData: (format: 'json' | 'csv') => string;

  // Integration points
  isNetworkAvailable: boolean;
  keyboardShortcuts: Record<string, string>;
  backgroundSync: boolean;
}

// NDEF Record Type Constants
export const NDEF_RECORD_TYPES = {
  TEXT: 'text',
  URL: 'url',
  ABSOLUTE_URL: 'absolute-url',
  MIME: 'mime',
  WIFI: 'wifi',
  CONTACT: 'contact',
  EXTERNAL: 'external',
  UNKNOWN: 'unknown',
} as const;

// WiFi Security Types
export const WIFI_SECURITY_TYPES = {
  OPEN: 'OPEN',
  WEP: 'WEP',
  WPA: 'WPA',
  WPA2: 'WPA2',
  WPA3: 'WPA3',
} as const;

// Text Encodings
export const TEXT_ENCODINGS = {
  UTF8: 'utf-8',
  UTF16: 'utf-16',
} as const;

// NFC Error Types
export const NFC_ERROR_TYPES = {
  PERMISSION: 'permission',
  NOT_SUPPORTED: 'not-supported',
  NOT_READABLE: 'not-readable',
  NOT_WRITABLE: 'not-writable',
  INVALID_DATA: 'invalid-data',
  SECURITY: 'security',
  NETWORK: 'network',
} as const;

// Browser compatibility types
export interface NFCBrowserSupport {
  isNDEFSupported: boolean;
  isReaderSupported: boolean;
  isWriterSupported: boolean;
  browserName: string;
  browserVersion: string;
  platform: string;
}

declare global {
  interface Window {
    NDEFReader?: new () => NFCReader;
    NDEFWriter?: new () => NFCWriter;
  }
}
