/**
 * @fileoverview useFileSystem Hook for PWA File System Access API (Epic 72)
 * Provides a simple interface for advanced file operations with graceful fallbacks
 */

import { useState, useCallback, useRef } from 'react';

/**
 * File system access support detection
 */
interface FileSystemSupport {
  hasFileSystemAccess: boolean;
  canOpenFiles: boolean;
  canSaveFiles: boolean;
  canAccessDirectories: boolean;
  isSupported: boolean;
}

/**
 * File opening options
 */
interface OpenFileOptions {
  types?: Array<{
    description?: string;
    accept: Record<string, string[]>;
  }>;
  multiple?: boolean;
  excludeAcceptAllOption?: boolean;
}

/**
 * File saving options  
 */
interface SaveFileOptions {
  suggestedName?: string;
  types?: Array<{
    description?: string;
    accept: Record<string, string[]>;
  }>;
}

/**
 * Custom hook for advanced file system operations
 */
export function useFileSystem() {
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer | null>(null);
  const [fileHandle, setFileHandle] = useState<any>(null);
  const [directoryHandle, setDirectoryHandle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const support: FileSystemSupport = {
    hasFileSystemAccess: typeof window !== 'undefined' && 'showOpenFilePicker' in window,
    canOpenFiles: typeof window !== 'undefined' && 'showOpenFilePicker' in window,
    canSaveFiles: typeof window !== 'undefined' && 'showSaveFilePicker' in window,
    canAccessDirectories: typeof window !== 'undefined' && 'showDirectoryPicker' in window,
    isSupported: typeof window !== 'undefined' && 'showOpenFilePicker' in window,
  };

  const createFileInput = useCallback((options: OpenFileOptions = {}) => {
    if (!fileInputRef.current) {
      fileInputRef.current = document.createElement('input');
      fileInputRef.current.type = 'file';
      fileInputRef.current.style.display = 'none';
      document.body.appendChild(fileInputRef.current);
    }

    const input = fileInputRef.current;
    input.multiple = options.multiple || false;
    
    if (options.types && options.types.length > 0) {
      const acceptTypes: string[] = [];
      options.types.forEach(type => {
        Object.entries(type.accept).forEach(([mimeType, extensions]) => {
          acceptTypes.push(mimeType);
          acceptTypes.push(...extensions);
        });
      });
      input.accept = acceptTypes.join(',');
    } else {
      input.accept = '';
    }

    return input;
  }, []);

  const openFile = useCallback(async (options: OpenFileOptions = {}): Promise<File[]> => {
    setIsLoading(true);
    setError(null);

    try {
      if (support.canOpenFiles) {
        const fileHandles = await (window as any).showOpenFilePicker({
          multiple: options.multiple,
          types: options.types,
          excludeAcceptAllOption: options.excludeAcceptAllOption,
        });

        const files: File[] = [];
        for (const handle of fileHandles) {
          const file = await handle.getFile();
          files.push(file);
          
          if (files.length === 1) {
            setFileHandle(handle);
            setFile(file);
          }
        }

        return files;
      } else {
        return new Promise((resolve) => {
          const input = createFileInput(options);
          
          const handleChange = () => {
            const files = Array.from(input.files || []);
            if (files.length > 0) {
              setFile(files[0]);
              setFileHandle(null);
            }
            resolve(files);
            cleanup();
          };

          const cleanup = () => {
            input.removeEventListener('change', handleChange);
          };

          input.addEventListener('change', handleChange);
          input.click();
        });
      }
    } catch (err) {
      setError(`Failed to open file: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [support.canOpenFiles, createFileInput]);

  const saveFile = useCallback(async (
    content: string | ArrayBuffer | Blob, 
    options: SaveFileOptions = {}
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      if (support.canSaveFiles) {
        const fileHandle = await (window as any).showSaveFilePicker({
          suggestedName: options.suggestedName,
          types: options.types,
        });

        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
        
        setFileHandle(fileHandle);
        return true;
      } else {
        let blob: Blob;
        
        if (content instanceof Blob) {
          blob = content;
        } else if (content instanceof ArrayBuffer) {
          blob = new Blob([content]);
        } else {
          blob = new Blob([content], { type: 'text/plain' });
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = options.suggestedName || 'download';
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        return true;
      }
    } catch (err) {
      setError(`Failed to save file: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [support.canSaveFiles]);

  const readAsText = useCallback(async (targetFile?: File): Promise<string> => {
    const fileToRead = targetFile || file;
    if (!fileToRead) {
      throw new Error('No file selected');
    }

    setIsLoading(true);
    setError(null);

    try {
      const text = await fileToRead.text();
      setContent(text);
      return text;
    } catch (err) {
      setError(`Failed to read file: ${err instanceof Error ? err.message : 'Unknown error'}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [file]);

  const readAsArrayBuffer = useCallback(async (targetFile?: File): Promise<ArrayBuffer> => {
    const fileToRead = targetFile || file;
    if (!fileToRead) {
      throw new Error('No file selected');
    }

    setIsLoading(true);
    setError(null);

    try {
      const buffer = await fileToRead.arrayBuffer();
      setArrayBuffer(buffer);
      return buffer;
    } catch (err) {
      setError(`Failed to read file: ${err instanceof Error ? err.message : 'Unknown error'}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [file]);

  const openDirectory = useCallback(async (): Promise<any> => {
    if (!support.canAccessDirectories) {
      setError('Directory access not supported in this browser');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const dirHandle = await (window as any).showDirectoryPicker();
      setDirectoryHandle(dirHandle);
      return dirHandle;
    } catch (err) {
      setError(`Failed to open directory: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [support.canAccessDirectories]);

  const clearFile = useCallback(() => {
    setFile(null);
    setContent(null);
    setArrayBuffer(null);
    setFileHandle(null);
    setDirectoryHandle(null);
    setError(null);
  }, []);

  return {
    support,
    file,
    content,
    arrayBuffer,
    fileHandle,
    directoryHandle,
    isLoading,
    error,
    openFile,
    saveFile,
    readAsText,
    readAsArrayBuffer,
    openDirectory,
    clearFile,
  };
}

export default useFileSystem;