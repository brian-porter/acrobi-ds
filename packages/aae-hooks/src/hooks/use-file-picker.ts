/**
 * @fileoverview File Picker Hook for AAE File System Interaction (Epic 45)
 * Provides easy-to-use file picking capabilities with FileReader API integration,
 * multiple read formats, and comprehensive error handling.
 */

import { useState, useRef, useCallback, useEffect } from 'react';

// Types
export interface FilePickerOptions {
  /** Accepted file types (MIME types or file extensions) */
  accept?: string;
  /** Whether to allow multiple file selection */
  multiple?: boolean;
  /** How to read the file content */
  readAs?: 'text' | 'dataURL' | 'arrayBuffer' | 'binaryString';
  /** Text encoding for text reading */
  encoding?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Callback when files are selected */
  onFilesSelected?: (files: FileList) => void;
  /** Callback when file content is read */
  onFileRead?: (result: FilePickerResult) => void;
  /** Callback when error occurs */
  onError?: (error: FilePickerError) => void;
}

export interface FilePickerResult {
  file: File;
  content: string | ArrayBuffer | null;
  size: number;
  type: string;
  lastModified: number;
  name: string;
}

export interface FilePickerError {
  type: 'size' | 'type' | 'read' | 'browser' | 'cancelled';
  message: string;
  file?: File;
  originalError?: Error;
}

export interface FilePickerState {
  isSupported: boolean;
  isLoading: boolean;
  isOpen: boolean;
  selectedFiles: File[];
  results: FilePickerResult[];
  error: FilePickerError | null;
}

export interface UseFilePickerReturn {
  // State
  state: FilePickerState;

  // Actions
  openFilePicker: () => void;
  clearFiles: () => void;
  readFile: (
    file: File,
    readAs?: FilePickerOptions['readAs']
  ) => Promise<FilePickerResult>;

  // Utilities
  isFileTypeAccepted: (file: File) => boolean;
  formatFileSize: (bytes: number) => string;
  getFileExtension: (filename: string) => string;
  isImageFile: (file: File) => boolean;
  isTextFile: (file: File) => boolean;
  validateFile: (file: File) => FilePickerError | null;

  // Drag & Drop support
  dragProps: {
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
  };
  isDragging: boolean;
}

// Utility functions
const isFilePickerSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    'File' in window &&
    'FileReader' in window &&
    'FileList' in window
  );
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

const isTextFile = (file: File): boolean => {
  return (
    file.type.startsWith('text/') ||
    file.type === 'application/json' ||
    file.type === 'application/xml' ||
    /\.(txt|md|csv|json|xml|html|css|js|ts|jsx|tsx|py|java|cpp|c|h)$/i.test(
      file.name
    )
  );
};

/**
 * File Picker Hook for AAE File System Interaction
 * Provides comprehensive file picking capabilities with FileReader integration
 */
export function useFilePicker(
  options: FilePickerOptions = {}
): UseFilePickerReturn {
  const {
    accept = '*/*',
    multiple = false,
    readAs = 'text',
    encoding = 'UTF-8',
    maxSize = 10 * 1024 * 1024, // 10MB default
    onFilesSelected,
    onFileRead,
    onError,
  } = options;

  // State
  const [state, setState] = useState<FilePickerState>({
    isSupported: isFilePickerSupported(),
    isLoading: false,
    isOpen: false,
    selectedFiles: [],
    results: [],
    error: null,
  });

  const [isDragging, setIsDragging] = useState(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dragCounterRef = useRef(0);

  // Error handler
  const handleError = useCallback(
    (
      type: FilePickerError['type'],
      message: string,
      file?: File,
      originalError?: Error
    ) => {
      const error: FilePickerError = { type, message, file, originalError };
      setState(prev => ({ ...prev, error, isLoading: false }));
      onError?.(error);
    },
    [onError]
  );

  // Validate file
  const validateFile = useCallback(
    (file: File): FilePickerError | null => {
      // Check file size
      if (maxSize && file.size > maxSize) {
        return {
          type: 'size',
          message: `File size (${formatFileSize(file.size)}) exceeds maximum allowed size (${formatFileSize(maxSize)})`,
          file,
        };
      }

      // Check file type if accept filter is specified
      if (accept !== '*/*') {
        const acceptedTypes = accept.split(',').map(type => type.trim());
        const isAccepted = acceptedTypes.some(acceptedType => {
          if (acceptedType.startsWith('.')) {
            // File extension check
            return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
          } else if (acceptedType.includes('*')) {
            // MIME type wildcard check
            const pattern = acceptedType.replace('*', '.*');
            return new RegExp(pattern).test(file.type);
          } else {
            // Exact MIME type check
            return file.type === acceptedType;
          }
        });

        if (!isAccepted) {
          return {
            type: 'type',
            message: `File type "${file.type}" is not accepted. Accepted types: ${accept}`,
            file,
          };
        }
      }

      return null;
    },
    [accept, maxSize]
  );

  // Check if file type is accepted
  const isFileTypeAccepted = useCallback(
    (file: File): boolean => {
      return validateFile(file) === null;
    },
    [validateFile]
  );

  // Read file content
  const readFile = useCallback(
    async (
      file: File,
      format: FilePickerOptions['readAs'] = readAs
    ): Promise<FilePickerResult> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = event => {
          const result: FilePickerResult = {
            file,
            content: event.target?.result || null,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            name: file.name,
          };

          onFileRead?.(result);
          resolve(result);
        };

        reader.onerror = () => {
          const error = new Error('Failed to read file');
          reject(error);
        };

        // Read file based on format
        switch (format) {
          case 'text':
            reader.readAsText(file, encoding);
            break;
          case 'dataURL':
            reader.readAsDataURL(file);
            break;
          case 'arrayBuffer':
            reader.readAsArrayBuffer(file);
            break;
          case 'binaryString':
            reader.readAsBinaryString(file);
            break;
          default:
            reader.readAsText(file, encoding);
        }
      });
    },
    [readAs, encoding, onFileRead]
  );

  // Process selected files
  const processFiles = useCallback(
    async (files: FileList) => {
      if (!files.length) return;

      setState(prev => ({
        ...prev,
        isLoading: true,
        error: null,
        selectedFiles: Array.from(files),
      }));

      onFilesSelected?.(files);

      try {
        const results: FilePickerResult[] = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          // Validate file
          const validationError = validateFile(file);
          if (validationError) {
            handleError(validationError.type, validationError.message, file);
            continue;
          }

          try {
            const result = await readFile(file);
            results.push(result);
          } catch (error) {
            handleError(
              'read',
              `Failed to read file: ${file.name}`,
              file,
              error as Error
            );
          }
        }

        setState(prev => ({
          ...prev,
          results,
          isLoading: false,
        }));
      } catch (error) {
        handleError(
          'read',
          'Failed to process files',
          undefined,
          error as Error
        );
      }
    },
    [validateFile, readFile, handleError, onFilesSelected]
  );

  // Open file picker
  const openFilePicker = useCallback(() => {
    if (!state.isSupported) {
      handleError('browser', 'File picker is not supported in this browser');
      return;
    }

    // Create file input if it doesn't exist
    if (!fileInputRef.current) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;
      input.multiple = multiple;
      input.style.display = 'none';

      input.addEventListener('change', event => {
        const target = event.target as HTMLInputElement;
        if (target.files) {
          processFiles(target.files);
        }
        setState(prev => ({ ...prev, isOpen: false }));
        // Reset input value to allow selecting the same file again
        target.value = '';
      });

      fileInputRef.current = input;
      document.body.appendChild(input);
    }

    setState(prev => ({ ...prev, isOpen: true, error: null }));
    fileInputRef.current.click();
  }, [state.isSupported, accept, multiple, processFiles, handleError]);

  // Clear files
  const clearFiles = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedFiles: [],
      results: [],
      error: null,
    }));
  }, []);

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current++;
      if (!isDragging) {
        setIsDragging(true);
      }
    },
    [isDragging]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounterRef.current = 0;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        if (!multiple && files.length > 1) {
          handleError('type', 'Multiple files not allowed');
          return;
        }
        processFiles(files);
      }
    },
    [multiple, processFiles, handleError]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fileInputRef.current) {
        document.body.removeChild(fileInputRef.current);
        fileInputRef.current = null;
      }
    };
  }, []);

  return {
    // State
    state,

    // Actions
    openFilePicker,
    clearFiles,
    readFile,

    // Utilities
    isFileTypeAccepted,
    formatFileSize,
    getFileExtension,
    isImageFile,
    isTextFile,
    validateFile,

    // Drag & Drop
    dragProps: {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
    isDragging,
  };
}

// Export utility functions as standalone
export const FilePickerUtils = {
  formatFileSize,
  getFileExtension,
  isImageFile,
  isTextFile,
  isFilePickerSupported,

  /**
   * Convert file to base64 data URL
   */
  fileToDataURL: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  /**
   * Convert file to text
   */
  fileToText: (file: File, encoding = 'UTF-8'): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file, encoding);
    });
  },

  /**
   * Convert file to array buffer
   */
  fileToArrayBuffer: (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  },

  /**
   * Create file from text content
   */
  createTextFile: (
    content: string,
    filename: string,
    type = 'text/plain'
  ): File => {
    return new File([content], filename, { type });
  },

  /**
   * Create file from blob
   */
  createFileFromBlob: (blob: Blob, filename: string): File => {
    return new File([blob], filename, { type: blob.type });
  },

  /**
   * Get file icon based on file type
   */
  getFileIcon: (file: File): string => {
    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type.startsWith('video/')) return '🎥';
    if (file.type.startsWith('audio/')) return '🎵';
    if (file.type.startsWith('text/')) return '📄';
    if (file.type === 'application/pdf') return '📕';
    if (file.type.includes('zip') || file.type.includes('archive')) return '📦';
    if (file.type.includes('json')) return '🔧';
    if (file.type.includes('xml')) return '🏷️';
    return '📎';
  },

  /**
   * Check if file is readable as text
   */
  isTextReadable: (file: File): boolean => {
    return (
      file.type.startsWith('text/') ||
      file.type === 'application/json' ||
      file.type === 'application/xml' ||
      /\.(txt|md|csv|json|xml|html|css|js|ts|jsx|tsx|py|java|cpp|c|h|log)$/i.test(
        file.name
      )
    );
  },
};

export default useFilePicker;
