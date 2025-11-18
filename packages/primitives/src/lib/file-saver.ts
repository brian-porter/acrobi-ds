/**
 * @fileoverview File Saver Utility for AAE File System Interaction (Epic 45)
 * Provides simple utilities for saving and downloading files from web applications,
 * supporting various content types and formats.
 */

// Types
export interface SaveFileOptions {
  /** MIME type of the file */
  type?: string;
  /** Whether to automatically revoke the object URL after download */
  autoRevoke?: boolean;
  /** Callback when save is initiated */
  onSave?: (filename: string) => void;
  /** Callback when error occurs */
  onError?: (error: Error) => void;
}

export interface DownloadProgress {
  filename: string;
  size: number;
  timestamp: Date;
}

// Default options
const DEFAULT_OPTIONS: Required<Omit<SaveFileOptions, 'onSave' | 'onError'>> = {
  type: 'application/octet-stream',
  autoRevoke: true,
};

/**
 * Save content as a downloadable file
 * Creates a blob, generates an object URL, and triggers download via temporary anchor element
 */
export function saveFile(
  filename: string,
  content: string | ArrayBuffer | Uint8Array | Blob,
  options: SaveFileOptions = {}
): boolean {
  try {
    const { type, autoRevoke, onSave, onError } = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    // Check browser support
    if (!isSaveFileSupported()) {
      const error = new Error('File saving is not supported in this browser');
      onError?.(error);
      return false;
    }

    // Create blob from content
    let blob: Blob;
    if (content instanceof Blob) {
      blob = content;
    } else if (
      content instanceof ArrayBuffer ||
      content instanceof Uint8Array
    ) {
      blob = new Blob([content], { type });
    } else {
      blob = new Blob([content], { type });
    }

    // Create object URL
    const url = URL.createObjectURL(blob);

    // Create temporary anchor element
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke object URL if auto-revoke is enabled
    if (autoRevoke) {
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    }

    onSave?.(filename);
    return true;
  } catch (error) {
    options.onError?.(error as Error);
    return false;
  }
}

/**
 * Save text content as a text file
 */
export function saveTextFile(
  filename: string,
  content: string,
  options: SaveFileOptions = {}
): boolean {
  return saveFile(filename, content, {
    type: 'text/plain;charset=utf-8',
    ...options,
  });
}

/**
 * Save JSON object as a JSON file
 */
export function saveJsonFile(
  filename: string,
  data: any,
  options: SaveFileOptions = {}
): boolean {
  try {
    const jsonContent = JSON.stringify(data, null, 2);
    return saveFile(filename, jsonContent, {
      type: 'application/json;charset=utf-8',
      ...options,
    });
  } catch (error) {
    options.onError?.(error as Error);
    return false;
  }
}

/**
 * Save CSV data as a CSV file
 */
export function saveCsvFile(
  filename: string,
  data: string[][],
  options: SaveFileOptions = {}
): boolean {
  try {
    const csvContent = data
      .map(row =>
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      )
      .join('\n');

    return saveFile(filename, csvContent, {
      type: 'text/csv;charset=utf-8',
      ...options,
    });
  } catch (error) {
    options.onError?.(error as Error);
    return false;
  }
}

/**
 * Save blob as a file with proper MIME type detection
 */
export function saveBlobFile(
  filename: string,
  blob: Blob,
  options: SaveFileOptions = {}
): boolean {
  return saveFile(filename, blob, {
    type: blob.type || 'application/octet-stream',
    ...options,
  });
}

/**
 * Save canvas content as an image file
 */
export function saveCanvasAsImage(
  canvas: HTMLCanvasElement,
  filename: string,
  format: 'png' | 'jpeg' | 'webp' = 'png',
  quality = 0.92,
  options: SaveFileOptions = {}
): boolean {
  try {
    const mimeType = `image/${format}`;

    canvas.toBlob(
      blob => {
        if (blob) {
          saveBlobFile(filename, blob, {
            type: mimeType,
            ...options,
          });
        } else {
          options.onError?.(new Error('Failed to convert canvas to blob'));
        }
      },
      mimeType,
      quality
    );

    return true;
  } catch (error) {
    options.onError?.(error as Error);
    return false;
  }
}

/**
 * Check if file saving is supported in the current browser
 */
export function isSaveFileSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'Blob' in window &&
    'URL' in window &&
    'createObjectURL' in URL &&
    'revokeObjectURL' in URL
  );
}

/**
 * Generate a filename with timestamp
 */
export function generateTimestampedFilename(
  baseName: string,
  extension: string,
  separator = '_'
): string {
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, '-')
    .replace('T', separator)
    .slice(0, -5); // Remove milliseconds and Z

  return `${baseName}${separator}${timestamp}.${extension}`;
}

/**
 * Get appropriate file extension for MIME type
 */
export function getExtensionForMimeType(mimeType: string): string {
  const mimeToExt: Record<string, string> = {
    'text/plain': 'txt',
    'text/html': 'html',
    'text/css': 'css',
    'text/javascript': 'js',
    'application/javascript': 'js',
    'application/json': 'json',
    'application/xml': 'xml',
    'text/xml': 'xml',
    'text/csv': 'csv',
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'application/pdf': 'pdf',
    'application/zip': 'zip',
    'application/octet-stream': 'bin',
  };

  return mimeToExt[mimeType] || 'bin';
}

/**
 * Sanitize filename for safe saving
 */
export function sanitizeFilename(filename: string): string {
  // Remove or replace unsafe characters
  return filename
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 255); // Limit length
}

/**
 * Advanced file saver class for managing multiple downloads
 */
export class FileSaver {
  private downloads: Map<string, DownloadProgress> = new Map();
  private options: SaveFileOptions;

  constructor(defaultOptions: SaveFileOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...defaultOptions };
  }

  /**
   * Save a file and track the download
   */
  save(
    filename: string,
    content: string | ArrayBuffer | Uint8Array | Blob,
    options?: SaveFileOptions
  ): boolean {
    const finalOptions = { ...this.options, ...options };
    const sanitizedFilename = sanitizeFilename(filename);

    // Track download
    const download: DownloadProgress = {
      filename: sanitizedFilename,
      size: this.getContentSize(content),
      timestamp: new Date(),
    };

    this.downloads.set(sanitizedFilename, download);

    const success = saveFile(sanitizedFilename, content, {
      ...finalOptions,
      onSave: savedFilename => {
        finalOptions.onSave?.(savedFilename);
      },
      onError: error => {
        this.downloads.delete(sanitizedFilename);
        finalOptions.onError?.(error);
      },
    });

    return success;
  }

  /**
   * Save multiple files sequentially
   */
  async saveMultiple(
    files: Array<{
      filename: string;
      content: string | ArrayBuffer | Uint8Array | Blob;
      options?: SaveFileOptions;
    }>,
    delay = 100
  ): Promise<boolean[]> {
    const results: boolean[] = [];

    for (const file of files) {
      const success = this.save(file.filename, file.content, file.options);
      results.push(success);

      // Add delay between downloads to prevent browser blocking
      if (delay > 0 && file !== files[files.length - 1]) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    return results;
  }

  /**
   * Get download history
   */
  getDownloadHistory(): DownloadProgress[] {
    return Array.from(this.downloads.values()).sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  /**
   * Clear download history
   */
  clearHistory(): void {
    this.downloads.clear();
  }

  /**
   * Get total size of all downloads
   */
  getTotalDownloadSize(): number {
    return Array.from(this.downloads.values()).reduce(
      (total, download) => total + download.size,
      0
    );
  }

  private getContentSize(
    content: string | ArrayBuffer | Uint8Array | Blob
  ): number {
    if (content instanceof Blob) {
      return content.size;
    } else if (content instanceof ArrayBuffer) {
      return content.byteLength;
    } else if (content instanceof Uint8Array) {
      return content.length;
    } else {
      return new Blob([content]).size;
    }
  }
}

// Export utilities object
export const FileSaverUtils = {
  saveFile,
  saveTextFile,
  saveJsonFile,
  saveCsvFile,
  saveBlobFile,
  saveCanvasAsImage,
  isSaveFileSupported,
  generateTimestampedFilename,
  getExtensionForMimeType,
  sanitizeFilename,
  FileSaver,
};

export default FileSaver;
