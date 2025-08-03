/**
 * @fileoverview File System Access Stories for Epic 72
 * Interactive demonstrations of advanced file system access functionality
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useFileSystem } from './use-file-system';

// Mock FileSystemUtils for story compatibility
const FileSystemUtils = {
  getBrowserCompatibility: () => ({
    browserInfo: navigator.userAgent,
    isSupported: 'showOpenFilePicker' in window,
    limitations: [
      'File System Access API is experimental',
      'Only supported in Chromium-based browsers',
      'Requires user gesture to open files'
    ]
  }),
  FILE_TYPES: {
    TEXT: [{ description: 'Text files', accept: { 'text/*': ['.txt', '.md'] } }],
    IMAGES: [{ description: 'Images', accept: { 'image/*': ['.png', '.jpg', '.jpeg'] } }],
    JSON: [{ description: 'JSON files', accept: { 'application/json': ['.json'] } }]
  }
};

const meta: Meta = {
  title: 'AAE/File System Access/useFileSystem',
  parameters: {
    docs: {
      description: {
        component:
          'Advanced file system access hook using the modern File System Access API with graceful fallback to traditional methods. Provides native-like file open/save experience.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// File System Status Demo
const FileSystemStatusDemo: React.FC = () => {
  const fileSystem = useFileSystem({
    readAs: 'text',
    autoRead: true,
    onFileOpen: (file, handle) => {
      console.log(
        'File opened:',
        file.name,
        handle ? 'with handle' : 'without handle'
      );
    },
    onFileRead: content => {
      console.log(
        'File content read:',
        typeof content,
        content?.toString().slice(0, 100)
      );
    },
    onFileSave: (success, fileName) => {
      console.log('File save result:', success, fileName);
    },
    onError: error => {
      console.error('File system error:', error);
    },
  });

  const [browserCompat, setBrowserCompat] = useState(
    FileSystemUtils.getBrowserCompatibility()
  );

  const getStatusColor = (status: boolean | undefined) => {
    return status ? '#28a745' : '#dc3545';
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>File System Access Status</h2>

      {/* API Support Warning */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        ⚠️ <strong>Experimental API:</strong> File System Access API is
        currently only supported in Chromium-based browsers (Chrome 86+, Edge
        86+). Other browsers will use traditional file input/download fallbacks.
      </div>

      {/* Status Overview */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '20px',
        }}
      >
        <h3>File System Capabilities</h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(fileSystem.isSupported),
              }}
            />
            <span>
              <strong>Native API:</strong>{' '}
              {fileSystem.isSupported ? 'Supported' : 'Not Supported'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(!!fileSystem.file),
              }}
            />
            <span>
              <strong>File Loaded:</strong> {fileSystem.file ? 'Yes' : 'No'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(!!fileSystem.fileHandle),
              }}
            />
            <span>
              <strong>File Handle:</strong>{' '}
              {fileSystem.fileHandle ? 'Available' : 'None'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: fileSystem.isLoading ? '#ffc107' : '#6c757d',
              }}
            />
            <span>
              <strong>Loading:</strong> {fileSystem.isLoading ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        {fileSystem.error && (
          <div
            style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c6cb',
              borderRadius: '4px',
              color: '#721c24',
            }}
          >
            <strong>Error:</strong> {fileSystem.error}
            <button
              onClick={fileSystem.clearError}
              style={{
                marginLeft: '10px',
                padding: '2px 8px',
                fontSize: '12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Browser Compatibility */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#e7f3ff',
          borderRadius: '8px',
          border: '1px solid #b3d7ff',
          marginBottom: '20px',
        }}
      >
        <h3>Browser Compatibility</h3>

        <div style={{ marginBottom: '15px' }}>
          <strong>Current Browser:</strong> {browserCompat.browserInfo}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <strong>Native API Status:</strong>{' '}
          {browserCompat.isSupported
            ? '✅ Supported'
            : '❌ Not Supported (using fallback)'}
        </div>

        {browserCompat.limitations.length > 0 && (
          <div>
            <strong>Limitations:</strong>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              {browserCompat.limitations.map((limitation, index) => (
                <li
                  key={index}
                  style={{ marginBottom: '4px', fontSize: '14px' }}
                >
                  {limitation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Current File Info */}
      {fileSystem.file && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#d4edda',
            borderRadius: '8px',
            border: '1px solid #c3e6cb',
            marginBottom: '20px',
          }}
        >
          <h3>Current File</h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '10px',
            }}
          >
            <div>
              <strong>Name:</strong> {fileSystem.file.name}
            </div>
            <div>
              <strong>Size:</strong> {Math.round(fileSystem.file.size / 1024)}{' '}
              KB
            </div>
            <div>
              <strong>Type:</strong> {fileSystem.file.type || 'Unknown'}
            </div>
            <div>
              <strong>Last Modified:</strong>{' '}
              {new Date(fileSystem.file.lastModified).toLocaleString()}
            </div>
            <div>
              <strong>Using Native API:</strong>{' '}
              {fileSystem.usingNativeAPI ? 'Yes' : 'No'}
            </div>
          </div>

          {fileSystem.content && (
            <div style={{ marginTop: '15px' }}>
              <strong>Content Preview:</strong>
              <div
                style={{
                  marginTop: '8px',
                  padding: '10px',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  maxHeight: '200px',
                  overflow: 'auto',
                }}
              >
                {typeof fileSystem.content === 'string'
                  ? fileSystem.content.slice(0, 1000) +
                    (fileSystem.content.length > 1000 ? '...' : '')
                  : `[${fileSystem.content.constructor.name}] ${fileSystem.content.byteLength} bytes`}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// File Operations Demo
const FileOperationsDemo: React.FC = () => {
  const fileSystem = useFileSystem({
    autoRead: false,
    onFileOpen: (file, handle) => {
      console.log('File opened:', file.name);
    },
    onFileSave: (success, fileName) => {
      console.log('File saved:', success, fileName);
    },
  });

  const [textContent, setTextContent] = useState(
    'Hello, World!\n\nThis is sample content that you can edit and save to a file.'
  );
  const [readFormat, setReadFormat] = useState<
    'text' | 'dataURL' | 'arrayBuffer'
  >('text');

  const handleOpenTextFile = async () => {
    await fileSystem.openFile({
      types: FileSystemUtils.FILE_TYPES.TEXT,
      startIn: 'documents',
    });
  };

  const handleOpenImageFile = async () => {
    await fileSystem.openFile({
      types: FileSystemUtils.FILE_TYPES.IMAGES,
      startIn: 'pictures',
    });
  };

  const handleOpenAnyFile = async () => {
    await fileSystem.openFile();
  };

  const handleReadFile = async () => {
    const content = await fileSystem.readFile(readFormat);
    if (content && typeof content === 'string') {
      setTextContent(content);
    }
  };

  const handleSaveAsText = async () => {
    await fileSystem.saveFile(textContent, {
      types: FileSystemUtils.FILE_TYPES.TEXT,
      suggestedName: 'document.txt',
      startIn: 'documents',
    });
  };

  const handleSaveAsJson = async () => {
    const jsonData = {
      content: textContent,
      timestamp: new Date().toISOString(),
      metadata: {
        length: textContent.length,
        lines: textContent.split('\n').length,
      },
    };

    await fileSystem.saveFile(JSON.stringify(jsonData, null, 2), {
      types: FileSystemUtils.FILE_TYPES.JSON,
      suggestedName: 'data.json',
      startIn: 'documents',
    });
  };

  const handleWriteToFile = async () => {
    if (fileSystem.fileHandle) {
      await fileSystem.writeFile(textContent);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>File Operations Demo</h2>

      {/* File Opening Section */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '20px',
        }}
      >
        <h3>Open Files</h3>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleOpenTextFile}
            disabled={fileSystem.isLoading}
            style={{
              padding: '10px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: fileSystem.isLoading ? 'not-allowed' : 'pointer',
              opacity: fileSystem.isLoading ? 0.6 : 1,
            }}
          >
            📄 Open Text File
          </button>

          <button
            onClick={handleOpenImageFile}
            disabled={fileSystem.isLoading}
            style={{
              padding: '10px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: fileSystem.isLoading ? 'not-allowed' : 'pointer',
              opacity: fileSystem.isLoading ? 0.6 : 1,
            }}
          >
            🖼️ Open Image File
          </button>

          <button
            onClick={handleOpenAnyFile}
            disabled={fileSystem.isLoading}
            style={{
              padding: '10px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: fileSystem.isLoading ? 'not-allowed' : 'pointer',
              opacity: fileSystem.isLoading ? 0.6 : 1,
            }}
          >
            📁 Open Any File
          </button>
        </div>
      </div>

      {/* File Reading Section */}
      {fileSystem.file && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#e7f3ff',
            borderRadius: '8px',
            border: '1px solid #b3d7ff',
            marginBottom: '20px',
          }}
        >
          <h3>Read File Content</h3>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
              }}
            >
              Read Format:
            </label>
            <select
              value={readFormat}
              onChange={e => setReadFormat(e.target.value as any)}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
            >
              <option value='text'>Text</option>
              <option value='dataURL'>Data URL</option>
              <option value='arrayBuffer'>Array Buffer</option>
            </select>
          </div>

          <button
            onClick={handleReadFile}
            disabled={fileSystem.isLoading}
            style={{
              padding: '10px 16px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: fileSystem.isLoading ? 'not-allowed' : 'pointer',
              opacity: fileSystem.isLoading ? 0.6 : 1,
            }}
          >
            📖 Read File
          </button>
        </div>
      )}

      {/* Content Editor */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fff8dc',
          borderRadius: '8px',
          border: '1px solid #ffeaa7',
          marginBottom: '20px',
        }}
      >
        <h3>Content Editor</h3>

        <textarea
          value={textContent}
          onChange={e => setTextContent(e.target.value)}
          style={{
            width: '100%',
            height: '200px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px',
            fontFamily: 'monospace',
            resize: 'vertical',
          }}
          placeholder='Enter or edit content here...'
        />

        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Length: {textContent.length} characters,{' '}
          {textContent.split('\n').length} lines
        </div>
      </div>

      {/* File Saving Section */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#d4edda',
          borderRadius: '8px',
          border: '1px solid #c3e6cb',
          marginBottom: '20px',
        }}
      >
        <h3>Save Files</h3>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={handleSaveAsText}
            disabled={fileSystem.isLoading}
            style={{
              padding: '10px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: fileSystem.isLoading ? 'not-allowed' : 'pointer',
              opacity: fileSystem.isLoading ? 0.6 : 1,
            }}
          >
            💾 Save as Text
          </button>

          <button
            onClick={handleSaveAsJson}
            disabled={fileSystem.isLoading}
            style={{
              padding: '10px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: fileSystem.isLoading ? 'not-allowed' : 'pointer',
              opacity: fileSystem.isLoading ? 0.6 : 1,
            }}
          >
            📋 Save as JSON
          </button>
        </div>

        {fileSystem.fileHandle && (
          <div>
            <button
              onClick={handleWriteToFile}
              disabled={fileSystem.isLoading}
              style={{
                padding: '10px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: fileSystem.isLoading ? 'not-allowed' : 'pointer',
                opacity: fileSystem.isLoading ? 0.6 : 1,
              }}
            >
              ✏️ Write to Current File
            </button>
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
              This will overwrite the currently opened file
            </div>
          </div>
        )}
      </div>

      {/* Clear Section */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
        }}
      >
        <h3>Actions</h3>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={fileSystem.clearFile}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🗑️ Clear File
          </button>

          {fileSystem.error && (
            <button
              onClick={fileSystem.clearError}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ❌ Clear Error
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Permission Demo
const PermissionDemo: React.FC = () => {
  const fileSystem = useFileSystem();
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionState | null>(null);

  const handleRequestPermission = async (mode: 'read' | 'readwrite') => {
    const status = await fileSystem.requestPermission(mode);
    setPermissionStatus(status);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>File Handle Permissions</h2>

      <div
        style={{
          padding: '15px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        ℹ️ <strong>Note:</strong> File handle permissions only apply when using
        the native File System Access API. Open a file first to see permission
        options.
      </div>

      {!fileSystem.fileHandle ? (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #dee2e6',
            textAlign: 'center',
          }}
        >
          <p>
            No file handle available. Open a file using the native API to test
            permissions.
          </p>
          <button
            onClick={() => fileSystem.openFile()}
            style={{
              padding: '10px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Open File
          </button>
        </div>
      ) : (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#e7f3ff',
            borderRadius: '8px',
            border: '1px solid #b3d7ff',
          }}
        >
          <h3>File Handle Available</h3>

          <div style={{ marginBottom: '15px' }}>
            <strong>File:</strong> {fileSystem.file?.name}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button
              onClick={() => handleRequestPermission('read')}
              style={{
                padding: '10px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Request Read Permission
            </button>

            <button
              onClick={() => handleRequestPermission('readwrite')}
              style={{
                padding: '10px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Request Read/Write Permission
            </button>
          </div>

          {permissionStatus && (
            <div
              style={{
                padding: '10px',
                backgroundColor:
                  permissionStatus === 'granted' ? '#d4edda' : '#f8d7da',
                border: `1px solid ${permissionStatus === 'granted' ? '#c3e6cb' : '#f5c6cb'}`,
                borderRadius: '4px',
              }}
            >
              <strong>Permission Status:</strong> {permissionStatus}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const FileSystemStatus: Story = {
  render: () => <FileSystemStatusDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Shows the current status of File System Access API support, browser compatibility, and file system capabilities.',
      },
    },
  },
};

export const FileOperations: Story = {
  render: () => <FileOperationsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo for opening, reading, editing, and saving files with both native API and fallback methods.',
      },
    },
  },
};

export const Permissions: Story = {
  render: () => <PermissionDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates file handle permission management for read and write access when using the native File System Access API.',
      },
    },
  },
};
