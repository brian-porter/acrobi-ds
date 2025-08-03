# PWA File System Access Guide

This guide demonstrates how to implement advanced file system operations in your Acrobi PWA using the File System Access API with graceful fallbacks for unsupported browsers.

## ⚠️ Experimental API Warning

**The File System Access API is experimental and has limited browser support:**

- **Chrome/Edge 86+**: Full support with security restrictions
- **Firefox**: Not supported (uses fallback)
- **Safari**: Not supported (uses fallback)
- **Mobile browsers**: Limited or no support

Always provide fallbacks for production applications.

## Overview

The File System Access API enables PWAs to:

- Open files with native OS file picker
- Save files directly to user's file system
- Access directories and their contents
- Maintain file handles for repeated access
- Provide native-like file management experience

## Browser Support

- **Native API**: Chrome/Edge 86+ only
- **Fallbacks**: Traditional file input and blob downloads
- **Progressive Enhancement**: Automatically detects and uses best available method

## Installation

The `useFileSystem` hook is available in the Acrobi UI package:

```typescript
import { useFileSystem } from '@acrobi/ui/hooks';
```

## Basic Usage

### Simple File Operations

```typescript
import { useFileSystem } from '@acrobi/ui/hooks';

function FileManager() {
  const { 
    support, 
    file, 
    content, 
    isLoading,
    error,
    openFile, 
    saveFile, 
    readAsText,
    clearFile 
  } = useFileSystem();

  const handleOpenFile = async () => {
    const files = await openFile({
      types: [{
        description: 'Text files',
        accept: {
          'text/plain': ['.txt'],
          'text/markdown': ['.md']
        }
      }],
      multiple: false
    });

    if (files.length > 0) {
      await readAsText(files[0]);
    }
  };

  const handleSaveFile = async () => {
    if (content) {
      await saveFile(content, {
        suggestedName: 'document.txt',
        types: [{
          description: 'Text files',
          accept: { 'text/plain': ['.txt'] }
        }]
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button 
          onClick={handleOpenFile}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Opening...' : 'Open File'}
        </button>
        
        <button 
          onClick={handleSaveFile}
          disabled={!content || isLoading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Saving...' : 'Save File'}
        </button>
        
        <button 
          onClick={clearFile}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear
        </button>
      </div>

      {/* Support Information */}
      <div className="p-3 bg-gray-100 rounded">
        <p className="text-sm">
          <strong>File System Access:</strong> {support.isSupported ? '✅ Supported' : '❌ Using fallback'}
        </p>
        <p className="text-sm">
          <strong>Mode:</strong> {support.hasFileSystemAccess ? 'Native OS integration' : 'Traditional file input'}
        </p>
      </div>

      {/* File Information */}
      {file && (
        <div className="p-3 border rounded">
          <h3 className="font-semibold mb-2">Current File</h3>
          <p><strong>Name:</strong> {file.name}</p>
          <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
          <p><strong>Type:</strong> {file.type || 'Unknown'}</p>
          <p><strong>Modified:</strong> {new Date(file.lastModified).toLocaleString()}</p>
        </div>
      )}

      {/* Content Display */}
      {content && (
        <div className="space-y-2">
          <h3 className="font-semibold">File Content</h3>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-40 p-3 border rounded font-mono text-sm"
            placeholder="File content will appear here..."
          />
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 rounded">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}
    </div>
  );
}
```

### Advanced File Editor

```typescript
import { useFileSystem } from '@acrobi/ui/hooks';
import { useState, useEffect } from 'react';

function AdvancedFileEditor() {
  const { 
    support,
    file, 
    content, 
    fileHandle,
    openFile, 
    saveFile, 
    readAsText,
    error 
  } = useFileSystem();
  
  const [editorContent, setEditorContent] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  // Track content changes
  useEffect(() => {
    if (content !== null) {
      setEditorContent(content);
      setIsDirty(false);
    }
  }, [content]);

  const handleContentChange = (newContent: string) => {
    setEditorContent(newContent);
    setIsDirty(newContent !== content);
  };

  const handleNewFile = () => {
    setEditorContent('');
    setIsDirty(false);
  };

  const handleOpenFile = async () => {
    const files = await openFile({
      types: [{
        description: 'Text and code files',
        accept: {
          'text/plain': ['.txt'],
          'text/markdown': ['.md'],
          'application/json': ['.json'],
          'text/javascript': ['.js'],
          'text/typescript': ['.ts'],
          'text/html': ['.html'],
          'text/css': ['.css']
        }
      }]
    });

    if (files.length > 0) {
      await readAsText(files[0]);
    }
  };

  const handleSave = async () => {
    const success = await saveFile(editorContent, {
      suggestedName: file?.name || 'untitled.txt'
    });

    if (success) {
      setIsDirty(false);
    }
  };

  const handleSaveAs = async () => {
    const success = await saveFile(editorContent, {
      suggestedName: file?.name || 'untitled.txt',
      types: [{
        description: 'Text files',
        accept: { 'text/plain': ['.txt'] }
      }]
    });

    if (success) {
      setIsDirty(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Menu Bar */}
      <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
        <button onClick={handleNewFile} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
          New
        </button>
        <button onClick={handleOpenFile} className="px-3 py-1 bg-green-500 text-white rounded text-sm">
          Open
        </button>
        <button 
          onClick={handleSave} 
          disabled={!isDirty}
          className="px-3 py-1 bg-purple-500 text-white rounded text-sm disabled:bg-gray-400"
        >
          Save
        </button>
        <button onClick={handleSaveAs} className="px-3 py-1 bg-orange-500 text-white rounded text-sm">
          Save As
        </button>
        
        <div className="ml-auto text-sm text-gray-600">
          {file ? `${file.name}${isDirty ? ' *' : ''}` : 'Untitled'}
          {support.hasFileSystemAccess && fileHandle && ' (Native)'}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        <textarea 
          value={editorContent}
          onChange={(e) => handleContentChange(e.target.value)}
          className="flex-1 p-4 font-mono text-sm border-none outline-none resize-none"
          placeholder="Start typing or open a file..."
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-2 border-t bg-gray-50 text-sm text-gray-600">
        <div>
          {file && `${file.size} bytes | ${file.type || 'Unknown type'}`}
        </div>
        <div>
          Lines: {editorContent.split('\n').length} | 
          Characters: {editorContent.length}
          {isDirty && ' | Modified'}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-2 bg-red-100 border-t border-red-400 text-red-700 text-sm">
          Error: {error}
        </div>
      )}
    </div>
  );
}
```

## Hook API Reference

### Return Values

```typescript
interface UseFileSystemReturn {
  support: FileSystemSupport;           // Browser support information
  file: File | null;                    // Currently selected file
  content: string | null;               // File content as text
  arrayBuffer: ArrayBuffer | null;      // File content as binary
  fileHandle: FileSystemFileHandle | null;  // File handle (native API)
  directoryHandle: FileSystemDirectoryHandle | null;  // Directory handle
  isLoading: boolean;                   // Loading state
  error: string | null;                 // Error message
  openFile: (options?: OpenFileOptions) => Promise<File[]>;
  saveFile: (content: string | ArrayBuffer | Blob, options?: SaveFileOptions) => Promise<boolean>;
  readAsText: (file?: File) => Promise<string>;
  readAsArrayBuffer: (file?: File) => Promise<ArrayBuffer>;
  openDirectory: () => Promise<FileSystemDirectoryHandle | null>;
  clearFile: () => void;
}
```

### File Type Definitions

```typescript
interface OpenFileOptions {
  types?: Array<{
    description?: string;
    accept: Record<string, string[]>;
  }>;
  multiple?: boolean;
  excludeAcceptAllOption?: boolean;
}

interface SaveFileOptions {
  suggestedName?: string;
  types?: Array<{
    description?: string;
    accept: Record<string, string[]>;
  }>;
}
```

## Advanced Patterns

### Multiple File Types

```typescript
function MultiTypeFileManager() {
  const { openFile, saveFile } = useFileSystem();

  const fileTypes = {
    images: {
      description: 'Image files',
      accept: {
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/gif': ['.gif'],
        'image/webp': ['.webp']
      }
    },
    documents: {
      description: 'Document files',
      accept: {
        'application/pdf': ['.pdf'],
        'text/plain': ['.txt'],
        'application/msword': ['.doc'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
      }
    },
    code: {
      description: 'Code files',
      accept: {
        'text/javascript': ['.js'],
        'text/typescript': ['.ts'],
        'text/html': ['.html'],
        'text/css': ['.css'],
        'application/json': ['.json']
      }
    }
  };

  const handleOpenByType = async (type: keyof typeof fileTypes) => {
    const files = await openFile({
      types: [fileTypes[type]],
      multiple: true
    });
    
    console.log(`Opened ${files.length} ${type} files`);
  };

  return (
    <div className="space-y-2">
      <button onClick={() => handleOpenByType('images')}>Open Images</button>
      <button onClick={() => handleOpenByType('documents')}>Open Documents</button>
      <button onClick={() => handleOpenByType('code')}>Open Code Files</button>
    </div>
  );
}
```

### Directory Operations

```typescript
function DirectoryExplorer() {
  const { support, openDirectory, directoryHandle, error } = useFileSystem();
  const [files, setFiles] = useState<string[]>([]);

  const handleOpenDir = async () => {
    const dirHandle = await openDirectory();
    
    if (dirHandle) {
      const fileList: string[] = [];
      
      for await (const [name, handle] of dirHandle.entries()) {
        fileList.push(`${handle.kind}: ${name}`);
      }
      
      setFiles(fileList);
    }
  };

  if (!support.canAccessDirectories) {
    return (
      <div className="p-4 bg-yellow-100 rounded">
        <p>Directory access not supported in this browser.</p>
        <p>This feature requires Chrome/Edge 86+ with the File System Access API.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button 
        onClick={handleOpenDir}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Directory
      </button>

      {directoryHandle && (
        <div>
          <h3 className="font-semibold">Directory: {directoryHandle.name}</h3>
          <ul className="mt-2 space-y-1">
            {files.map((file, index) => (
              <li key={index} className="text-sm font-mono">{file}</li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 rounded">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}
    </div>
  );
}
```

### Binary File Handling

```typescript
function BinaryFileManager() {
  const { 
    file, 
    arrayBuffer, 
    openFile, 
    saveFile, 
    readAsArrayBuffer 
  } = useFileSystem();

  const handleOpenBinary = async () => {
    const files = await openFile({
      types: [{
        description: 'Image files',
        accept: {
          'image/jpeg': ['.jpg', '.jpeg'],
          'image/png': ['.png'],
          'image/gif': ['.gif']
        }
      }]
    });

    if (files.length > 0) {
      await readAsArrayBuffer(files[0]);
    }
  };

  const handleProcessAndSave = async () => {
    if (!arrayBuffer) return;

    // Example: Add simple watermark or processing
    const processedBuffer = arrayBuffer.slice(); // Clone buffer
    
    // Create new blob with processed data
    const blob = new Blob([processedBuffer], { 
      type: file?.type || 'application/octet-stream' 
    });

    await saveFile(blob, {
      suggestedName: `processed_${file?.name || 'file'}`,
      types: [{
        description: 'Image files',
        accept: { 'image/jpeg': ['.jpg'] }
      }]
    });
  };

  return (
    <div className="space-y-4">
      <button onClick={handleOpenBinary}>Open Image File</button>
      
      {file && arrayBuffer && (
        <div className="space-y-2">
          <p>File: {file.name} ({arrayBuffer.byteLength} bytes)</p>
          <button 
            onClick={handleProcessAndSave}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Process & Save
          </button>
        </div>
      )}
    </div>
  );
}
```

### File Validation

```typescript
function ValidatedFileUploader() {
  const { openFile, error } = useFileSystem();
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    // Size validation (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return 'File size must be less than 5MB';
    }

    // Type validation
    const allowedTypes = ['text/plain', 'application/json', 'text/markdown'];
    if (!allowedTypes.includes(file.type)) {
      return 'File type not allowed. Please select a text, JSON, or Markdown file.';
    }

    // Name validation
    if (file.name.includes('..') || file.name.startsWith('.')) {
      return 'Invalid file name';
    }

    return null;
  };

  const handleOpenWithValidation = async () => {
    setValidationError(null);

    const files = await openFile({
      types: [{
        description: 'Text files',
        accept: {
          'text/plain': ['.txt'],
          'application/json': ['.json'],
          'text/markdown': ['.md']
        }
      }]
    });

    if (files.length > 0) {
      const file = files[0];
      const validation = validateFile(file);
      
      if (validation) {
        setValidationError(validation);
        return;
      }

      // File is valid, proceed with processing
      console.log('File validated successfully:', file.name);
    }
  };

  return (
    <div className="space-y-4">
      <button onClick={handleOpenWithValidation}>
        Open & Validate File
      </button>

      {(error || validationError) && (
        <div className="p-3 bg-red-100 border border-red-400 rounded">
          <p className="text-red-700">
            {validationError || error}
          </p>
        </div>
      )}
    </div>
  );
}
```

## Security Considerations

### User Gesture Requirement

```typescript
// ✅ Good - called from user interaction
function handleUserClick() {
  openFile(); // Will work
}

<button onClick={handleUserClick}>Open File</button>

// ❌ Bad - called without user gesture
useEffect(() => {
  openFile(); // Will fail in most browsers
}, []);
```

### File Type Restrictions

```typescript
// Restrict dangerous file types
const safeFileTypes = {
  description: 'Safe file types',
  accept: {
    'text/plain': ['.txt'],
    'application/json': ['.json'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png']
    // Never allow: .exe, .bat, .sh, .js (for execution)
  }
};
```

### Content Validation

```typescript
const validateFileContent = async (file: File): Promise<boolean> => {
  if (file.type === 'application/json') {
    try {
      const text = await file.text();
      JSON.parse(text); // Validate JSON structure
      return true;
    } catch {
      return false;
    }
  }
  
  // Add other validations as needed
  return true;
};
```

## Performance Considerations

### Large File Handling

```typescript
function LargeFileHandler() {
  const { openFile, readAsArrayBuffer } = useFileSystem();
  const [progress, setProgress] = useState(0);

  const handleLargeFile = async () => {
    const files = await openFile();
    if (files.length === 0) return;

    const file = files[0];
    
    // For very large files, consider streaming
    if (file.size > 50 * 1024 * 1024) { // 50MB
      await processFileInChunks(file);
    } else {
      await readAsArrayBuffer(file);
    }
  };

  const processFileInChunks = async (file: File) => {
    const chunkSize = 1024 * 1024; // 1MB chunks
    const totalChunks = Math.ceil(file.size / chunkSize);
    
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      
      // Process chunk
      await chunk.arrayBuffer();
      
      setProgress((i + 1) / totalChunks * 100);
    }
  };

  return (
    <div>
      <button onClick={handleLargeFile}>Process Large File</button>
      {progress > 0 && (
        <div className="mt-2">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm mt-1">Progress: {progress.toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
}
```

### Memory Management

```typescript
function MemoryEfficientFileProcessor() {
  const { openFile } = useFileSystem();
  const fileReaderRef = useRef<FileReader | null>(null);

  const processFileStream = async (file: File) => {
    // Cancel previous operation if running
    if (fileReaderRef.current) {
      fileReaderRef.current.abort();
    }

    const reader = new FileReader();
    fileReaderRef.current = reader;

    return new Promise<void>((resolve, reject) => {
      reader.onload = (event) => {
        // Process result
        const result = event.target?.result;
        
        // Clear reference to free memory
        fileReaderRef.current = null;
        resolve();
      };

      reader.onerror = () => {
        fileReaderRef.current = null;
        reject(new Error('Failed to read file'));
      };

      reader.readAsArrayBuffer(file);
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fileReaderRef.current) {
        fileReaderRef.current.abort();
      }
    };
  }, []);
}
```

## Testing

### Unit Testing

```typescript
// test/use-file-system.test.ts
import { renderHook, act } from '@testing-library/react';
import { useFileSystem } from '@acrobi/ui/hooks';

// Mock File System Access API
const mockShowOpenFilePicker = jest.fn();
const mockShowSaveFilePicker = jest.fn();

Object.defineProperty(window, 'showOpenFilePicker', {
  value: mockShowOpenFilePicker,
  writable: true
});

Object.defineProperty(window, 'showSaveFilePicker', {
  value: mockShowSaveFilePicker,
  writable: true
});

describe('useFileSystem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should detect File System Access API support', () => {
    const { result } = renderHook(() => useFileSystem());
    
    expect(result.current.support.isSupported).toBe(true);
    expect(result.current.support.canOpenFiles).toBe(true);
    expect(result.current.support.canSaveFiles).toBe(true);
  });

  it('should open file using native API', async () => {
    const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const mockHandle = {
      getFile: () => Promise.resolve(mockFile)
    };
    
    mockShowOpenFilePicker.mockResolvedValue([mockHandle]);

    const { result } = renderHook(() => useFileSystem());
    
    await act(async () => {
      const files = await result.current.openFile();
      expect(files).toHaveLength(1);
      expect(files[0]).toBe(mockFile);
    });

    expect(mockShowOpenFilePicker).toHaveBeenCalled();
  });

  it('should save file using native API', async () => {
    const mockHandle = {
      createWritable: () => Promise.resolve({
        write: jest.fn().mockResolvedValue(undefined),
        close: jest.fn().mockResolvedValue(undefined)
      })
    };
    
    mockShowSaveFilePicker.mockResolvedValue(mockHandle);

    const { result } = renderHook(() => useFileSystem());
    
    await act(async () => {
      const success = await result.current.saveFile('test content');
      expect(success).toBe(true);
    });

    expect(mockShowSaveFilePicker).toHaveBeenCalled();
  });
});
```

### Integration Testing

```typescript
// test/file-system-integration.test.ts
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileManager from '../components/FileManager';

describe('FileManager Integration', () => {
  it('should handle complete file workflow', async () => {
    // Mock file content
    const mockFile = new File(['Hello World'], 'test.txt', { type: 'text/plain' });
    
    render(<FileManager />);
    
    // Test file opening
    const openButton = screen.getByText('Open File');
    fireEvent.click(openButton);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('Hello World')).toBeInTheDocument();
    });
    
    // Test content editing
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Hello World Updated' } });
    
    // Test file saving
    const saveButton = screen.getByText('Save File');
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Error:')).not.toBeInTheDocument();
    });
  });
});
```

## Troubleshooting

### Common Issues

1. **API not available**: Check browser support and enable experimental features if needed
2. **User gesture required**: File operations must be triggered by user interaction
3. **Security restrictions**: Some file types may be blocked by browser security policies
4. **Cross-origin issues**: File System Access API has strict origin requirements

### Debug Tips

```typescript
function debugFileSystemOperation(operation: string, data?: any) {
  console.log('File System Debug:', {
    operation,
    data,
    support: {
      hasAPI: 'showOpenFilePicker' in window,
      userAgent: navigator.userAgent,
      origin: window.location.origin
    }
  });
}

// Use in your operations
const debugOpenFile = async () => {
  debugFileSystemOperation('openFile', { timestamp: Date.now() });
  await openFile();
};
```

## Conclusion

The File System Access API provides powerful native file system integration for PWAs. By implementing proper fallbacks and following security best practices, you can create robust file management experiences that work across all browsers while providing enhanced functionality on supported platforms.

Remember to always test thoroughly across different browsers and provide clear feedback to users about the available functionality in their environment.