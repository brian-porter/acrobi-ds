import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { useFilePicker, FilePickerUtils } from './use-file-picker';
import {
  saveTextFile,
  saveJsonFile,
  saveCsvFile,
  FileSaverUtils,
} from '../lib/file-saver';

const meta: Meta = {
  title: '2. Hooks/useFilePicker',
  parameters: {
    docs: {
      description: {
        component:
          'File Picker hook for AAE file system interaction. Provides easy-to-use file picking capabilities with FileReader API integration, multiple read formats, drag & drop support, and comprehensive error handling.',
      },
    },
  },
  argTypes: {
    accept: {
      control: 'text',
      description: 'Accepted file types (MIME types or extensions)',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    readAs: {
      control: 'select',
      options: ['text', 'dataURL', 'arrayBuffer', 'binaryString'],
      description: 'How to read file content',
    },
    maxSize: {
      control: {
        type: 'number',
        min: 1024,
        max: 100 * 1024 * 1024,
        step: 1024,
      },
      description: 'Maximum file size in bytes',
    },
  },
};

export default meta;
type Story = StoryObj;

// Main file picker demo
const FilePickerDemo = ({
  accept = '*/*',
  multiple = false,
  readAs = 'text' as const,
  maxSize = 10 * 1024 * 1024,
}: {
  accept?: string;
  multiple?: boolean;
  readAs?: 'text' | 'dataURL' | 'arrayBuffer' | 'binaryString';
  maxSize?: number;
}) => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [
      `${new Date().toLocaleTimeString()}: ${message}`,
      ...prev.slice(0, 9),
    ]);
  };

  const filePicker = useFilePicker({
    accept,
    multiple,
    readAs,
    maxSize,
    onFilesSelected: files => {
      addLog(`${files.length} file(s) selected`);
    },
    onFileRead: result => {
      addLog(
        `File read: ${result.name} (${FilePickerUtils.formatFileSize(result.size)})`
      );
    },
    onError: error => {
      addLog(`Error: ${error.message}`);
    },
  });

  const {
    state,
    openFilePicker,
    clearFiles,
    formatFileSize,
    getFileExtension,
    isImageFile,
    isTextFile,
    dragProps,
    isDragging,
  } = filePicker;

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '800px',
      }}
    >
      <h2 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>
        📂 File Picker Demo
      </h2>

      {/* Status */}
      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <h3
          style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#374151' }}
        >
          Status
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '10px',
            fontSize: '14px',
          }}
        >
          <div>
            <strong>Supported:</strong>
            <span
              style={{
                color: state.isSupported ? '#059669' : '#dc2626',
                marginLeft: '8px',
              }}
            >
              {state.isSupported ? '✅ Yes' : '❌ No'}
            </span>
          </div>
          <div>
            <strong>Loading:</strong>
            <span
              style={{
                color: state.isLoading ? '#d97706' : '#6b7280',
                marginLeft: '8px',
              }}
            >
              {state.isLoading ? '⏳ Yes' : '✅ No'}
            </span>
          </div>
          <div>
            <strong>Files Selected:</strong>
            <span style={{ marginLeft: '8px' }}>
              {state.selectedFiles.length}
            </span>
          </div>
          <div>
            <strong>Results:</strong>
            <span style={{ marginLeft: '8px' }}>{state.results.length}</span>
          </div>
        </div>

        {/* Configuration */}
        <div
          style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#e0f2fe',
            borderRadius: '6px',
          }}
        >
          <div style={{ fontSize: '12px', color: '#0369a1' }}>
            <strong>Configuration:</strong>
            <br />• Accept: {accept}
            <br />• Multiple: {multiple ? 'Yes' : 'No'}
            <br />• Read as: {readAs}
            <br />• Max size: {formatFileSize(maxSize)}
          </div>
        </div>
      </div>

      {/* Error Display */}
      {state.error && (
        <div
          style={{
            marginBottom: '20px',
            padding: '12px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            color: '#dc2626',
            fontSize: '14px',
          }}
        >
          <strong>Error ({state.error.type}):</strong> {state.error.message}
          {state.error.file && (
            <div style={{ marginTop: '5px', fontSize: '12px' }}>
              File: {state.error.file.name}
            </div>
          )}
        </div>
      )}

      {/* Drag & Drop Area */}
      <div
        {...dragProps}
        onDragEnter={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        style={{
          marginBottom: '20px',
          padding: '40px',
          border: `2px dashed ${isDragging ? '#3b82f6' : '#d1d5db'}`,
          borderRadius: '12px',
          backgroundColor: isDragging ? '#eff6ff' : '#f9fafb',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onClick={openFilePicker}
      >
        <div style={{ fontSize: '48px', marginBottom: '15px' }}>
          {isDragging ? '⬇️' : '📁'}
        </div>
        <div
          style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '8px',
            color: '#374151',
          }}
        >
          {isDragging
            ? 'Drop files here'
            : 'Click to select files or drag & drop'}
        </div>
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          {accept === '*/*' ? 'Any file type' : `Accepts: ${accept}`}
          {multiple && ' • Multiple files allowed'}
          <br />
          Max size: {formatFileSize(maxSize)}
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={openFilePicker}
          disabled={state.isLoading}
          style={{
            padding: '8px 16px',
            backgroundColor: state.isLoading ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: state.isLoading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
          }}
        >
          {state.isLoading ? '⏳ Processing...' : '📂 Select Files'}
        </button>

        <button
          onClick={clearFiles}
          disabled={state.results.length === 0}
          style={{
            padding: '8px 16px',
            backgroundColor: state.results.length === 0 ? '#9ca3af' : '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: state.results.length === 0 ? 'not-allowed' : 'pointer',
            fontSize: '14px',
          }}
        >
          🗑️ Clear Files
        </button>
      </div>

      {/* File Results */}
      {state.results.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#374151' }}
          >
            File Results
          </h3>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {state.results.map((result, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '15px',
                  padding: '15px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* File Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <span style={{ fontSize: '24px', marginRight: '10px' }}>
                    {FilePickerUtils.getFileIcon(result.file)}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#111827',
                      }}
                    >
                      {result.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {result.type || 'Unknown type'} •{' '}
                      {formatFileSize(result.size)} •
                      {new Date(result.lastModified).toLocaleString()}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {isImageFile(result.file) && (
                      <span
                        style={{
                          padding: '2px 6px',
                          backgroundColor: '#dbeafe',
                          color: '#1e40af',
                          borderRadius: '4px',
                          fontSize: '10px',
                        }}
                      >
                        IMAGE
                      </span>
                    )}
                    {isTextFile(result.file) && (
                      <span
                        style={{
                          padding: '2px 6px',
                          backgroundColor: '#dcfce7',
                          color: '#166534',
                          borderRadius: '4px',
                          fontSize: '10px',
                        }}
                      >
                        TEXT
                      </span>
                    )}
                  </div>
                </div>

                {/* File Content Preview */}
                <div
                  style={{
                    padding: '10px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    maxHeight: '200px',
                    overflowY: 'auto',
                  }}
                >
                  {readAs === 'dataURL' && isImageFile(result.file) ? (
                    <img
                      src={result.content as string}
                      alt={result.name}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '150px',
                        objectFit: 'contain',
                      }}
                    />
                  ) : readAs === 'text' && isTextFile(result.file) ? (
                    <pre
                      style={{
                        margin: 0,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}
                    >
                      {typeof result.content === 'string'
                        ? result.content.slice(0, 500)
                        : 'Cannot display content'}
                      {typeof result.content === 'string' &&
                        result.content.length > 500 &&
                        '...'}
                    </pre>
                  ) : readAs === 'arrayBuffer' ? (
                    <div>
                      ArrayBuffer (
                      {(result.content as ArrayBuffer)?.byteLength || 0} bytes)
                      <br />
                      <span style={{ color: '#6b7280' }}>
                        Binary data cannot be displayed as text
                      </span>
                    </div>
                  ) : (
                    <div style={{ color: '#6b7280' }}>
                      Content format: {readAs}
                      <br />
                      {typeof result.content === 'string'
                        ? `${result.content.length} characters`
                        : 'Binary data'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Log */}
      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#374151' }}
        >
          Activity Log
        </h3>
        <div
          style={{
            height: '150px',
            overflowY: 'auto',
            padding: '12px',
            backgroundColor: '#111827',
            borderRadius: '6px',
            color: '#f9fafb',
            fontSize: '12px',
            fontFamily: 'monospace',
          }}
        >
          {logs.length === 0 ? (
            <div style={{ color: '#6b7280' }}>No activity yet...</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '4px' }}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Instructions */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#eff6ff',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#1e40af',
        }}
      >
        <strong>Instructions:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>
            Click the file picker area or "Select Files" button to choose files
          </li>
          <li>Drag and drop files directly onto the file picker area</li>
          <li>
            View file information and content previews in the results section
          </li>
          <li>Try different file types and sizes to test validation</li>
          <li>Use the controls above to change file picker behavior</li>
        </ul>
      </div>
    </div>
  );
};

// File Saver Demo
const FileSaverDemo = () => {
  const [textContent, setTextContent] = useState(
    'Hello, World!\nThis is a sample text file.\n\nYou can edit this content and save it as a file.'
  );
  const [filename, setFilename] = useState('sample-file.txt');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [
      `${new Date().toLocaleTimeString()}: ${message}`,
      ...prev.slice(0, 9),
    ]);
  };

  const handleSaveText = () => {
    const success = saveTextFile(filename, textContent, {
      onSave: savedFilename => addLog(`Text file saved: ${savedFilename}`),
      onError: error => addLog(`Error saving file: ${error.message}`),
    });

    if (!success) {
      addLog('Failed to save text file');
    }
  };

  const handleSaveJson = () => {
    const data = {
      timestamp: new Date().toISOString(),
      content: textContent,
      metadata: {
        length: textContent.length,
        lines: textContent.split('\n').length,
        words: textContent.split(/\s+/).filter(word => word.length > 0).length,
      },
    };

    const jsonFilename = filename.replace(/\.[^/.]+$/, '.json');
    const success = saveJsonFile(jsonFilename, data, {
      onSave: savedFilename => addLog(`JSON file saved: ${savedFilename}`),
      onError: error => addLog(`Error saving JSON: ${error.message}`),
    });

    if (!success) {
      addLog('Failed to save JSON file');
    }
  };

  const handleSaveCsv = () => {
    const lines = textContent.split('\n');
    const csvData = [
      ['Line Number', 'Content', 'Length'],
      ...lines.map((line, index) => [
        (index + 1).toString(),
        line,
        line.length.toString(),
      ]),
    ];

    const csvFilename = filename.replace(/\.[^/.]+$/, '.csv');
    const success = saveCsvFile(csvFilename, csvData, {
      onSave: savedFilename => addLog(`CSV file saved: ${savedFilename}`),
      onError: error => addLog(`Error saving CSV: ${error.message}`),
    });

    if (!success) {
      addLog('Failed to save CSV file');
    }
  };

  const handleGenerateTimestamped = () => {
    const baseName = filename.replace(/\.[^/.]+$/, '');
    const extension = FileSaverUtils.getExtensionForMimeType('text/plain');
    const timestampedName = FileSaverUtils.generateTimestampedFilename(
      baseName,
      extension
    );
    setFilename(timestampedName);
    addLog(`Generated timestamped filename: ${timestampedName}`);
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '600px',
      }}
    >
      <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>
        💾 File Saver Demo
      </h3>

      {/* File Settings */}
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '5px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Filename:
        </label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type='text'
            value={filename}
            onChange={e => setFilename(e.target.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
            }}
            placeholder='Enter filename'
          />
          <button
            onClick={handleGenerateTimestamped}
            style={{
              padding: '8px 12px',
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            🕒 Add Timestamp
          </button>
        </div>

        <label
          style={{
            display: 'block',
            marginBottom: '5px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Content:
        </label>
        <textarea
          value={textContent}
          onChange={e => setTextContent(e.target.value)}
          rows={8}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'monospace',
            resize: 'vertical',
          }}
          placeholder='Enter content to save'
        />
      </div>

      {/* Save Actions */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleSaveText}
            disabled={!textContent.trim() || !filename.trim()}
            style={{
              padding: '8px 16px',
              backgroundColor:
                !textContent.trim() || !filename.trim() ? '#9ca3af' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor:
                !textContent.trim() || !filename.trim()
                  ? 'not-allowed'
                  : 'pointer',
              fontSize: '14px',
            }}
          >
            📄 Save as Text
          </button>

          <button
            onClick={handleSaveJson}
            disabled={!textContent.trim() || !filename.trim()}
            style={{
              padding: '8px 16px',
              backgroundColor:
                !textContent.trim() || !filename.trim() ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor:
                !textContent.trim() || !filename.trim()
                  ? 'not-allowed'
                  : 'pointer',
              fontSize: '14px',
            }}
          >
            🔧 Save as JSON
          </button>

          <button
            onClick={handleSaveCsv}
            disabled={!textContent.trim() || !filename.trim()}
            style={{
              padding: '8px 16px',
              backgroundColor:
                !textContent.trim() || !filename.trim() ? '#9ca3af' : '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor:
                !textContent.trim() || !filename.trim()
                  ? 'not-allowed'
                  : 'pointer',
              fontSize: '14px',
            }}
          >
            📊 Save as CSV
          </button>
        </div>
      </div>

      {/* Activity Log */}
      <div>
        <h4
          style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#374151' }}
        >
          Activity Log
        </h4>
        <div
          style={{
            height: '120px',
            overflowY: 'auto',
            padding: '10px',
            backgroundColor: '#111827',
            borderRadius: '6px',
            color: '#f9fafb',
            fontSize: '12px',
            fontFamily: 'monospace',
          }}
        >
          {logs.length === 0 ? (
            <div style={{ color: '#6b7280' }}>No saves yet...</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '3px' }}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Hook usage example
const HookUsageExample = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h3>File System Integration Example</h3>
      <pre
        style={{
          backgroundColor: '#f8fafc',
          padding: '15px',
          borderRadius: '6px',
          fontSize: '14px',
          overflow: 'auto',
        }}
      >
        {`// File Picker Hook Usage
import { useFilePicker, FilePickerUtils } from '@acrobi/ui';

function FileUploader() {
  const filePicker = useFilePicker({
    accept: 'image/*,.pdf,.txt',
    multiple: true,
    readAs: 'dataURL',
    maxSize: 5 * 1024 * 1024, // 5MB
    onFileRead: (result) => {
      console.log('File loaded:', result.name);
    },
    onError: (error) => {
      console.error('File error:', error.message);
    }
  });

  const { state, openFilePicker, dragProps, isDragging } = filePicker;

  return (
    <div 
      {...dragProps}
      onClick={openFilePicker}
      style={{ 
        border: isDragging ? '2px dashed blue' : '2px dashed gray',
        padding: '20px',
        textAlign: 'center'
      }}
    >
      {state.isLoading ? 'Processing...' : 'Click or drag files here'}
      
      {state.results.map((result, index) => (
        <div key={index}>
          {result.name} - {FilePickerUtils.formatFileSize(result.size)}
        </div>
      ))}
    </div>
  );
}

// File Saver Usage
import { saveTextFile, saveJsonFile, FileSaverUtils } from '@acrobi/ui';

function DataExporter() {
  const exportData = () => {
    const data = { users: [], timestamp: Date.now() };
    
    // Save as JSON
    saveJsonFile('export.json', data, {
      onSave: (filename) => console.log('Saved:', filename),
      onError: (error) => console.error('Save failed:', error)
    });
    
    // Save as text with timestamp
    const filename = FileSaverUtils.generateTimestampedFilename(
      'export', 'txt'
    );
    saveTextFile(filename, JSON.stringify(data, null, 2));
  };

  return (
    <button onClick={exportData}>
      Export Data
    </button>
  );
}`}
      </pre>
    </div>
  );
};

// Stories
export const Default: Story = {
  render: () => <FilePickerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Default file picker with text reading and basic configuration. Supports drag & drop and file validation.',
      },
    },
  },
};

export const ImagePicker: Story = {
  render: () => (
    <FilePickerDemo
      accept='image/*'
      readAs='dataURL'
      maxSize={5 * 1024 * 1024}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'File picker configured for images only, reading as data URLs for preview display.',
      },
    },
  },
};

export const MultiplePicker: Story = {
  render: () => (
    <FilePickerDemo multiple={true} accept='.txt,.json,.csv' readAs='text' />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'File picker that allows multiple text-based file selection with text content reading.',
      },
    },
  },
};

export const BinaryPicker: Story = {
  render: () => (
    <FilePickerDemo
      accept='.bin,.exe,.zip'
      readAs='arrayBuffer'
      maxSize={50 * 1024 * 1024}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'File picker for binary files, reading content as ArrayBuffer for processing.',
      },
    },
  },
};

export const FileSaver: Story = {
  render: () => <FileSaverDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of file saving utilities with multiple formats (text, JSON, CSV) and timestamped filenames.',
      },
    },
  },
};

export const HookUsage: Story = {
  render: () => <HookUsageExample />,
  parameters: {
    docs: {
      description: {
        story:
          'Example code showing how to integrate file picker and file saver utilities in your components.',
      },
    },
  },
};
