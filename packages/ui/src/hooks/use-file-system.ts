/**
 * @fileoverview File System Access Hook for Epic 72
 * Advanced file system access with native-like experience using File System Access API
 * Falls back gracefully to traditional methods on unsupported browsers
 */

import { useState, useCallback, useRef } from 'react';
import {
  useFilePicker,
  FilePickerOptions,
  FilePickerResult,
} from './use-file-picker';

// File System Access API types
export interface FileSystemFileHandle {
  kind: 'file';
  name: string;
  getFile(): Promise<File>;
  createWritable(
    options?: FileSystemCreateWritableOptions
  ): Promise<FileSystemWritableFileStream>;
  requestPermission(
    descriptor?: FileSystemPermissionDescriptor
  ): Promise<PermissionState>;
  queryPermission(
    descriptor?: FileSystemPermissionDescriptor
  ): Promise<PermissionState>;
}

export interface FileSystemCreateWritableOptions {
  keepExistingData?: boolean;
}

export interface FileSystemWritableFileStream extends WritableStream {
  write(data: FileSystemWriteChunkType): Promise<void>;
  seek(position: number): Promise<void>;
  truncate(size: number): Promise<void>;
}

export type FileSystemWriteChunkType =
  | BufferSource
  | Blob
  | string
  | WriteParams;

export interface WriteParams {
  type: 'write' | 'seek' | 'truncate';
  data?: BufferSource | Blob | string;
  position?: number;
  size?: number;
}

export interface FileSystemPermissionDescriptor {
  mode?: 'read' | 'readwrite';
}

export interface ShowOpenFilePickerOptions {
  multiple?: boolean;
  excludeAcceptAllOption?: boolean;
  types?: FilePickerAcceptType[];
  startIn?: FileSystemHandle | WellKnownDirectory;
}

export interface ShowSaveFilePickerOptions {
  excludeAcceptAllOption?: boolean;
  types?: FilePickerAcceptType[];
  startIn?: FileSystemHandle | WellKnownDirectory;
  suggestedName?: string;
}

export interface FilePickerAcceptType {
  description?: string;
  accept: Record<string, string[]>;
}

export type WellKnownDirectory =
  | 'desktop'
  | 'documents'
  | 'downloads'
  | 'music'
  | 'pictures'
  | 'videos';

// Hook interfaces
export interface FileSystemState {
  /** Whether File System Access API is supported */
  isSupported: boolean;
  /** Current file handle (if using File System Access API) */
  fileHandle: FileSystemFileHandle | null;
  /** Currently opened file */
  file: File | null;
  /** File content */
  content: string | ArrayBuffer | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: string | null;
  /** Whether using native API or fallback */
  usingNativeAPI: boolean;
}

export interface FileSystemOptions {
  /** Default read format */
  readAs?: 'text' | 'dataURL' | 'arrayBuffer' | 'binaryString';
  /** Text encoding for text reading */
  encoding?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Auto-read file content on open */
  autoRead?: boolean;
  /** Callbacks */
  onFileOpen?: (file: File, handle?: FileSystemFileHandle) => void;
  onFileRead?: (content: string | ArrayBuffer | null) => void;
  onFileSave?: (success: boolean, fileName?: string) => void;
  onError?: (error: string) => void;
}

export interface UseFileSystemReturn extends FileSystemState {
  /** Open a file using File System Access API or fallback */
  openFile: (options?: ShowOpenFilePickerOptions) => Promise<File | null>;
  /** Save content to a file */
  saveFile: (
    content: string | ArrayBuffer | Blob,
    options?: ShowSaveFilePickerOptions
  ) => Promise<boolean>;
  /** Read the current file content */
  readFile: (
    format?: 'text' | 'dataURL' | 'arrayBuffer' | 'binaryString'
  ) => Promise<string | ArrayBuffer | null>;
  /** Write content to the current file handle (if available) */
  writeFile: (content: string | ArrayBuffer | Blob) => Promise<boolean>;
  /** Clear current file and state */
  clearFile: () => void;
  /** Clear error state */
  clearError: () => void;
  /** Request permission for file handle */
  requestPermission: (
    mode?: 'read' | 'readwrite'
  ) => Promise<PermissionState | null>;
}

/**
 * Hook for advanced file system access
 */
export function useFileSystem(
  options: FileSystemOptions = {}
): UseFileSystemReturn {
  const {
    readAs = 'text',
    encoding = 'utf-8',
    maxSize,
    autoRead = true,
    onFileOpen,
    onFileRead,
    onFileSave,
    onError,
  } = options;

  const [state, setState] = useState<FileSystemState>({
    isSupported:
      typeof window !== 'undefined' && 'showOpenFilePicker' in window,
    fileHandle: null,
    file: null,
    content: null,
    isLoading: false,
    error: null,
    usingNativeAPI: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize fallback file picker
  const fallbackPicker = useFilePicker({
    readAs,
    maxSize,
    onFileRead: (result: FilePickerResult) => {
      setState(prev => ({
        ...prev,
        file: result.file,
        content: result.content,
        isLoading: false,
      }));
      onFileRead?.(result.content);
    },
    onError: error => {
      setState(prev => ({ ...prev, error: error.message, isLoading: false }));
      onError?.(error.message);
    },
  });

  // Read file content
  const readFile = useCallback(
    async (
      format: 'text' | 'dataURL' | 'arrayBuffer' | 'binaryString' = readAs
    ): Promise<string | ArrayBuffer | null> => {
      if (!state.file) {
        const error = 'No file selected';
        setState(prev => ({ ...prev, error }));
        onError?.(error);
        return null;
      }

      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
          reader.onload = e => {
            const content = e.target?.result || null;
            setState(prev => ({ ...prev, content, isLoading: false }));
            onFileRead?.(content);
            resolve(content);
          };

          reader.onerror = () => {
            const error = `Failed to read file: ${reader.error?.message || 'Unknown error'}`;
            setState(prev => ({ ...prev, error, isLoading: false }));
            onError?.(error);
            reject(new Error(error));
          };

          switch (format) {
            case 'text':
              reader.readAsText(state.file, encoding);
              break;
            case 'dataURL':
              reader.readAsDataURL(state.file);
              break;
            case 'arrayBuffer':
              reader.readAsArrayBuffer(state.file);
              break;
            case 'binaryString':
              reader.readAsBinaryString(state.file);
              break;
            default:
              reader.readAsText(state.file, encoding);
          }
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to read file';
        setState(prev => ({ ...prev, error: errorMessage, isLoading: false }));
        onError?.(errorMessage);
        return null;
      }
    },
    [state.file, readAs, encoding, onFileRead, onError]
  );

  // Open file using File System Access API or fallback
  const openFile = useCallback(
    async (options: ShowOpenFilePickerOptions = {}): Promise<File | null> => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        if (state.isSupported && 'showOpenFilePicker' in window) {
          // Use native File System Access API
          const [fileHandle] = await (window as any).showOpenFilePicker({
            multiple: false,
            ...options,
          });

          const file = await fileHandle.getFile();

          setState(prev => ({
            ...prev,
            fileHandle,
            file,
            isLoading: false,
            usingNativeAPI: true,
          }));

          onFileOpen?.(file, fileHandle);

          if (autoRead) {
            await readFile();
          }

          return file;
        } else {
          // Fallback to traditional file input
          setState(prev => ({ ...prev, usingNativeAPI: false }));

          return new Promise(resolve => {
            if (!fileInputRef.current) {
              // Create hidden file input
              const input = document.createElement('input');
              input.type = 'file';
              input.style.display = 'none';

              if (options.types && options.types.length > 0) {
                const acceptTypes = options.types
                  .flatMap(type => Object.values(type.accept).flat())
                  .join(',');
                input.accept = acceptTypes;
              }

              input.onchange = async e => {
                const target = e.target as HTMLInputElement;
                const files = target.files;

                if (files && files.length > 0) {
                  const file = files[0];

                  setState(prev => ({
                    ...prev,
                    file,
                    fileHandle: null,
                    isLoading: false,
                    usingNativeAPI: false,
                  }));

                  onFileOpen?.(file);

                  if (autoRead) {
                    await readFile();
                  }

                  resolve(file);
                } else {
                  setState(prev => ({ ...prev, isLoading: false }));
                  resolve(null);
                }

                document.body.removeChild(input);
              };

              document.body.appendChild(input);
              input.click();
            }
          });
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to open file';
        setState(prev => ({ ...prev, error: errorMessage, isLoading: false }));
        onError?.(errorMessage);
        return null;
      }
    },
    [state.isSupported, autoRead, readFile, onFileOpen, onError]
  );

  // Save file using File System Access API or fallback
  const saveFile = useCallback(
    async (
      content: string | ArrayBuffer | Blob,
      options: ShowSaveFilePickerOptions = {}
    ): Promise<boolean> => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        if (state.isSupported && 'showSaveFilePicker' in window) {
          // Use native File System Access API
          const fileHandle = await (window as any).showSaveFilePicker(options);
          const writable = await fileHandle.createWritable();

          await writable.write(content);
          await writable.close();

          setState(prev => ({
            ...prev,
            fileHandle,
            isLoading: false,
            usingNativeAPI: true,
          }));

          onFileSave?.(true, fileHandle.name);
          return true;
        } else {
          // Fallback to blob download
          const blob = content instanceof Blob ? content : new Blob([content]);
          const url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = options.suggestedName || 'download.txt';
          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          setState(prev => ({
            ...prev,
            isLoading: false,
            usingNativeAPI: false,
          }));
          onFileSave?.(true, a.download);
          return true;
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to save file';
        setState(prev => ({ ...prev, error: errorMessage, isLoading: false }));
        onError?.(errorMessage);
        return false;
      }
    },
    [state.isSupported, onFileSave, onError]
  );

  // Write to current file handle
  const writeFile = useCallback(
    async (content: string | ArrayBuffer | Blob): Promise<boolean> => {
      if (!state.fileHandle) {
        const error = 'No file handle available for writing';
        setState(prev => ({ ...prev, error }));
        onError?.(error);
        return false;
      }

      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const writable = await state.fileHandle.createWritable();
        await writable.write(content);
        await writable.close();

        setState(prev => ({ ...prev, isLoading: false }));
        return true;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to write file';
        setState(prev => ({ ...prev, error: errorMessage, isLoading: false }));
        onError?.(errorMessage);
        return false;
      }
    },
    [state.fileHandle, onError]
  );

  // Request permission for file handle
  const requestPermission = useCallback(
    async (
      mode: 'read' | 'readwrite' = 'readwrite'
    ): Promise<PermissionState | null> => {
      if (!state.fileHandle) {
        return null;
      }

      try {
        return await state.fileHandle.requestPermission({ mode });
      } catch (error) {
        console.warn('Permission request failed:', error);
        return 'denied';
      }
    },
    [state.fileHandle]
  );

  // Clear file and state
  const clearFile = useCallback(() => {
    setState(prev => ({
      ...prev,
      fileHandle: null,
      file: null,
      content: null,
      error: null,
    }));
  }, []);

  // Clear error state
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    openFile,
    saveFile,
    readFile,
    writeFile,
    clearFile,
    clearError,
    requestPermission,
  };
}

/**
 * File System utilities
 */
export class FileSystemUtils {
  /**
   * Check if File System Access API is supported
   */
  static isSupported(): boolean {
    return typeof window !== 'undefined' && 'showOpenFilePicker' in window;
  }

  /**
   * Get browser compatibility information
   */
  static getBrowserCompatibility(): {
    isSupported: boolean;
    browserInfo: string;
    limitations: string[];
  } {
    const isSupported = this.isSupported();

    let browserInfo = 'Unknown browser';
    const limitations: string[] = [];

    if (typeof navigator !== 'undefined') {
      const userAgent = navigator.userAgent;

      if (userAgent.includes('Chrome')) {
        browserInfo = 'Chrome';
        if (!isSupported) {
          limitations.push('Requires Chrome 86+ for File System Access API');
        } else {
          limitations.push('Requires user interaction to access files');
          limitations.push('Limited to secure contexts (HTTPS)');
        }
      } else if (userAgent.includes('Firefox')) {
        browserInfo = 'Firefox';
        limitations.push(
          'File System Access API not supported - using fallback'
        );
      } else if (userAgent.includes('Safari')) {
        browserInfo = 'Safari';
        limitations.push(
          'File System Access API not supported - using fallback'
        );
      } else if (userAgent.includes('Edge')) {
        browserInfo = 'Edge';
        if (!isSupported) {
          limitations.push('Requires Edge 86+ for File System Access API');
        } else {
          limitations.push('Requires user interaction to access files');
        }
      }
    }

    return {
      isSupported,
      browserInfo,
      limitations,
    };
  }

  /**
   * Create file type filters for File System Access API
   */
  static createFileTypes(
    types: Record<string, string[]>
  ): FilePickerAcceptType[] {
    return Object.entries(types).map(([description, extensions]) => ({
      description,
      accept: { [extensions[0]]: extensions },
    }));
  }

  /**
   * Common file type configurations
   */
  static readonly FILE_TYPES = {
    TEXT: this.createFileTypes({
      'Text files': ['.txt', '.md'],
      'All files': ['*'],
    }),
    IMAGES: this.createFileTypes({
      Images: ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'All files': ['*'],
    }),
    DOCUMENTS: this.createFileTypes({
      Documents: ['.pdf', '.doc', '.docx'],
      'All files': ['*'],
    }),
    JSON: this.createFileTypes({
      'JSON files': ['.json'],
      'All files': ['*'],
    }),
    CSV: this.createFileTypes({
      'CSV files': ['.csv'],
      'All files': ['*'],
    }),
  };

  /**
   * Validate file before processing
   */
  static validateFile(
    file: File,
    options: { maxSize?: number; allowedTypes?: string[] } = {}
  ): { valid: boolean; error?: string } {
    const { maxSize, allowedTypes } = options;

    if (maxSize && file.size > maxSize) {
      return {
        valid: false,
        error: `File size (${Math.round(file.size / 1024)}KB) exceeds maximum allowed size (${Math.round(maxSize / 1024)}KB)`,
      };
    }

    if (allowedTypes && allowedTypes.length > 0) {
      const fileType = file.type || '';
      const fileName = file.name || '';

      const isAllowed = allowedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileName.toLowerCase().endsWith(type.toLowerCase());
        }
        return fileType.match(type.replace('*', '.*'));
      });

      if (!isAllowed) {
        return {
          valid: false,
          error: `File type not allowed. Accepted types: ${allowedTypes.join(', ')}`,
        };
      }
    }

    return { valid: true };
  }
}
