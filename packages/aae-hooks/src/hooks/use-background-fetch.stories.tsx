/**
 * @fileoverview Background Fetch Stories for Epic 69
 * Interactive demonstrations of background fetch functionality
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  useBackgroundFetch,
  BackgroundFetchUtils,
  BackgroundFetchRequest,
} from './use-background-fetch';

const meta: Meta = {
  title: 'AAE/Background Fetch/useBackgroundFetch',
  parameters: {
    docs: {
      description: {
        component:
          'Background fetch hook for initiating large background downloads. Provides reliable file downloading that continues even when the app is closed or backgrounded.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Hook Status Demo
const BackgroundFetchStatusDemo: React.FC = () => {
  const backgroundFetch = useBackgroundFetch({
    onFetchComplete: (tag, successful, failed) => {
      console.log(
        `Background fetch "${tag}" completed: ${successful} successful, ${failed} failed`
      );
    },
    onFetchSuccess: (tag, id) => {
      console.log(`Background fetch "${tag}" succeeded with ID: ${id}`);
    },
    onFetchFail: (tag, id) => {
      console.error(`Background fetch "${tag}" failed with ID: ${id}`);
    },
    onFetchAbort: (tag, id) => {
      console.log(`Background fetch "${tag}" aborted with ID: ${id}`);
    },
  });

  const getStatusColor = (status: boolean | undefined) => {
    return status ? '#28a745' : '#dc3545';
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Background Fetch Status</h2>

      {!backgroundFetch.isSupported && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          ⚠️ Background Fetch is not supported in this browser
          <div style={{ fontSize: '14px', marginTop: '8px', color: '#666' }}>
            Background Fetch is currently supported in Chrome 74+ and Edge 79+.
            It's still experimental in other browsers.
          </div>
        </div>
      )}

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
        <h3>Background Fetch Capabilities</h3>

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
                backgroundColor: getStatusColor(backgroundFetch.isSupported),
              }}
            />
            <span>
              <strong>Supported:</strong>{' '}
              {backgroundFetch.isSupported ? 'Yes' : 'No'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(!!backgroundFetch.registration),
              }}
            />
            <span>
              <strong>SW Registered:</strong>{' '}
              {backgroundFetch.registration ? 'Yes' : 'No'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: backgroundFetch.isFetching
                  ? '#ffc107'
                  : '#6c757d',
              }}
            />
            <span>
              <strong>Fetching:</strong>{' '}
              {backgroundFetch.isFetching ? 'Yes' : 'No'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor:
                  backgroundFetch.activeFetches.size > 0
                    ? '#28a745'
                    : '#6c757d',
              }}
            />
            <span>
              <strong>Active:</strong> {backgroundFetch.activeFetches.size}
            </span>
          </div>
        </div>

        {backgroundFetch.error && (
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
            <strong>Error:</strong> {backgroundFetch.error}
            <button
              onClick={backgroundFetch.clearError}
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

      {/* Active Downloads */}
      {backgroundFetch.activeFetches.size > 0 && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#e7f3ff',
            borderRadius: '8px',
            border: '1px solid #b3d7ff',
            marginBottom: '20px',
          }}
        >
          <h3>Active Background Fetches</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {backgroundFetch.getActive().map(id => (
              <div
                key={id}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>📥 {id}</span>
                <button
                  onClick={() => backgroundFetch.abort(id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px',
                    padding: '2px 4px',
                    borderRadius: '2px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  Abort
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Browser Compatibility */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f0f8ff',
          borderRadius: '8px',
          border: '1px solid #b6d7ff',
        }}
      >
        <h3>Browser Compatibility</h3>
        <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <div>
            <strong>✅ Supported:</strong> Chrome 74+, Edge 79+
          </div>
          <div>
            <strong>🚧 Experimental:</strong> Firefox (behind flag), Safari (not
            supported)
          </div>
          <div>
            <strong>📱 Mobile:</strong> Chrome Android 74+, Samsung Internet
            11.0+
          </div>

          <div
            style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: 'rgba(255, 193, 7, 0.1)',
              borderRadius: '4px',
              color: '#856404',
            }}
          >
            <strong>Note:</strong> Background Fetch is still an experimental
            API. Always check for support before using and provide fallbacks for
            unsupported browsers.
          </div>
        </div>
      </div>
    </div>
  );
};

// File Download Demo
const FileDownloadDemo: React.FC = () => {
  const backgroundFetch = useBackgroundFetch();
  const [downloadUrls, setDownloadUrls] = useState([
    'https://httpbin.org/bytes/1048576', // 1MB file
    'https://httpbin.org/bytes/2097152', // 2MB file
    'https://httpbin.org/bytes/3145728', // 3MB file
  ]);
  const [customUrl, setCustomUrl] = useState('');
  const [downloadTitle, setDownloadTitle] = useState('Demo File Downloads');

  const handleAddUrl = () => {
    if (customUrl && BackgroundFetchUtils.isValidUrl(customUrl)) {
      setDownloadUrls(prev => [...prev, customUrl]);
      setCustomUrl('');
    } else {
      alert('Please enter a valid URL');
    }
  };

  const handleRemoveUrl = (index: number) => {
    setDownloadUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleStartDownload = async () => {
    if (downloadUrls.length === 0) {
      alert('Please add at least one URL to download');
      return;
    }

    const requests =
      BackgroundFetchUtils.createFileDownloadRequests(downloadUrls);
    const validation = BackgroundFetchUtils.validateRequests(requests);

    if (!validation.valid) {
      alert(`Invalid requests: ${validation.errors.join(', ')}`);
      return;
    }

    const totalBytes = BackgroundFetchUtils.estimateDownloadSize(requests);
    const options = BackgroundFetchUtils.createOptions(
      downloadTitle,
      totalBytes
    );

    const downloadId = `download-${Date.now()}`;
    const success = await backgroundFetch.fetch(downloadId, requests, options);

    if (!success) {
      alert('Failed to start background download');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Background File Downloads</h2>

      <div
        style={{
          padding: '15px',
          backgroundColor: '#e7f3ff',
          borderRadius: '8px',
          border: '1px solid #b3d7ff',
          marginBottom: '20px',
        }}
      >
        <strong>Try this:</strong> Start a background download and then close
        your browser tab or minimize the app. The download will continue in the
        background and you'll get a notification when it completes.
      </div>

      {/* Download Configuration */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '20px',
        }}
      >
        <h3>Download Configuration</h3>

        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
            }}
          >
            Download Title:
          </label>
          <input
            type='text'
            value={downloadTitle}
            onChange={e => setDownloadTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
            placeholder='Enter download title'
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
            }}
          >
            Add Custom URL:
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type='url'
              value={customUrl}
              onChange={e => setCustomUrl(e.target.value)}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
              placeholder='https://example.com/file.zip'
            />
            <button
              onClick={handleAddUrl}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: 'bold',
            }}
          >
            URLs to Download ({downloadUrls.length}):
          </label>
          {downloadUrls.length === 0 ? (
            <div style={{ color: '#666', fontStyle: 'italic' }}>
              No URLs added yet
            </div>
          ) : (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
              {downloadUrls.map((url, index) => (
                <div
                  key={index}
                  style={{
                    padding: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '14px',
                  }}
                >
                  <span style={{ fontFamily: 'monospace' }}>{url}</span>
                  <button
                    onClick={() => handleRemoveUrl(index)}
                    style={{
                      padding: '2px 6px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Download Actions */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '1px solid #90caf9',
          marginBottom: '20px',
        }}
      >
        <h3>Download Actions</h3>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button
            onClick={handleStartDownload}
            disabled={
              !backgroundFetch.isSupported ||
              downloadUrls.length === 0 ||
              backgroundFetch.isFetching
            }
            style={{
              padding: '10px 20px',
              backgroundColor:
                !backgroundFetch.isSupported ||
                downloadUrls.length === 0 ||
                backgroundFetch.isFetching
                  ? '#ccc'
                  : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !backgroundFetch.isSupported ||
                downloadUrls.length === 0 ||
                backgroundFetch.isFetching
                  ? 'not-allowed'
                  : 'pointer',
              fontSize: '16px',
            }}
          >
            {backgroundFetch.isFetching
              ? 'Starting Download...'
              : '📥 Start Background Download'}
          </button>
        </div>

        <div style={{ fontSize: '12px', color: '#666' }}>
          💡 <strong>How it works:</strong> Background downloads continue even
          when your app is closed. You'll receive a system notification when the
          download completes, fails, or is aborted.
        </div>
      </div>

      {/* Estimated Download Info */}
      {downloadUrls.length > 0 && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#f0f8ff',
            borderRadius: '8px',
            border: '1px solid #b6d7ff',
          }}
        >
          <h3>Download Estimation</h3>
          <div style={{ fontSize: '14px' }}>
            <div>
              <strong>Files:</strong> {downloadUrls.length}
            </div>
            <div>
              <strong>Estimated Size:</strong>{' '}
              {(
                BackgroundFetchUtils.estimateDownloadSize(
                  BackgroundFetchUtils.createFileDownloadRequests(downloadUrls)
                ) /
                (1024 * 1024)
              ).toFixed(1)}{' '}
              MB
            </div>
            <div>
              <strong>Support:</strong>{' '}
              {backgroundFetch.isSupported
                ? '✅ Available'
                : '❌ Not supported'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Large Content Demo
const LargeContentDemo: React.FC = () => {
  const backgroundFetch = useBackgroundFetch();
  const [contentTypes, setContentTypes] = useState({
    images: true,
    videos: false,
    documents: true,
    datasets: false,
  });

  const contentUrls = {
    images: [
      'https://picsum.photos/1920/1080.jpg',
      'https://picsum.photos/2560/1440.jpg',
      'https://picsum.photos/3840/2160.jpg',
    ],
    videos: [
      'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
    ],
    documents: [
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    ],
    datasets: ['https://httpbin.org/json'],
  };

  const handleStartContentDownload = async () => {
    const selectedUrls: string[] = [];

    Object.entries(contentTypes).forEach(([type, selected]) => {
      if (selected) {
        selectedUrls.push(...contentUrls[type as keyof typeof contentUrls]);
      }
    });

    if (selectedUrls.length === 0) {
      alert('Please select at least one content type');
      return;
    }

    const requests =
      BackgroundFetchUtils.createFileDownloadRequests(selectedUrls);
    const totalBytes = BackgroundFetchUtils.estimateDownloadSize(
      requests,
      5 * 1024 * 1024
    ); // 5MB per file
    const options = BackgroundFetchUtils.createOptions(
      'Content Download',
      totalBytes,
      [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ]
    );

    const downloadId = `content-${Date.now()}`;
    const success = await backgroundFetch.fetch(downloadId, requests, options);

    if (!success) {
      alert('Failed to start background content download');
    }
  };

  const handleContentTypeChange = (type: string, checked: boolean) => {
    setContentTypes(prev => ({ ...prev, [type]: checked }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Large Content Downloads</h2>

      <div
        style={{
          padding: '15px',
          backgroundColor: '#d4edda',
          borderRadius: '8px',
          border: '1px solid #c3e6cb',
          marginBottom: '20px',
        }}
      >
        <strong>Use Case:</strong> Background fetch is perfect for downloading
        large content like image galleries, video files, or datasets that would
        otherwise time out or fail on slower connections.
      </div>

      {/* Content Type Selection */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '20px',
        }}
      >
        <h3>Select Content to Download</h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
          }}
        >
          {Object.entries(contentTypes).map(([type, selected]) => (
            <label
              key={type}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px',
                backgroundColor: selected ? '#e7f3ff' : 'white',
                border: `1px solid ${selected ? '#007bff' : '#dee2e6'}`,
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              <input
                type='checkbox'
                checked={selected}
                onChange={e => handleContentTypeChange(type, e.target.checked)}
                style={{ margin: 0 }}
              />
              <div>
                <div
                  style={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                >
                  {type} ({contentUrls[type as keyof typeof contentUrls].length}
                  )
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {type === 'images' && 'High-resolution images (5-10 MB each)'}
                  {type === 'videos' && 'Sample video files (10-50 MB each)'}
                  {type === 'documents' &&
                    'PDF and document files (1-5 MB each)'}
                  {type === 'datasets' &&
                    'JSON datasets and APIs (1-10 MB each)'}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Download Actions */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '1px solid #90caf9',
          marginBottom: '20px',
        }}
      >
        <h3>Download Large Content</h3>

        <button
          onClick={handleStartContentDownload}
          disabled={
            !backgroundFetch.isSupported ||
            Object.values(contentTypes).every(v => !v) ||
            backgroundFetch.isFetching
          }
          style={{
            padding: '12px 24px',
            backgroundColor:
              !backgroundFetch.isSupported ||
              Object.values(contentTypes).every(v => !v) ||
              backgroundFetch.isFetching
                ? '#ccc'
                : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor:
              !backgroundFetch.isSupported ||
              Object.values(contentTypes).every(v => !v) ||
              backgroundFetch.isFetching
                ? 'not-allowed'
                : 'pointer',
            fontSize: '16px',
            marginBottom: '15px',
          }}
        >
          {backgroundFetch.isFetching
            ? 'Starting Download...'
            : '🚀 Download Selected Content'}
        </button>

        <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.5' }}>
          <div>
            📱 <strong>Mobile-friendly:</strong> Downloads continue even when
            the app is backgrounded
          </div>
          <div>
            🔋 <strong>Battery-efficient:</strong> Uses native download manager
            for optimal power usage
          </div>
          <div>
            📊 <strong>Progress tracking:</strong> System notifications show
            download progress and completion
          </div>
        </div>
      </div>

      {/* Current Selection Info */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f0f8ff',
          borderRadius: '8px',
          border: '1px solid #b6d7ff',
        }}
      >
        <h3>Selection Summary</h3>

        {Object.values(contentTypes).every(v => !v) ? (
          <div style={{ fontStyle: 'italic', color: '#666' }}>
            No content types selected
          </div>
        ) : (
          <div style={{ fontSize: '14px' }}>
            {Object.entries(contentTypes)
              .filter(([, selected]) => selected)
              .map(([type]) => (
                <div key={type} style={{ marginBottom: '4px' }}>
                  <strong>
                    {type.charAt(0).toUpperCase() + type.slice(1)}:
                  </strong>{' '}
                  {contentUrls[type as keyof typeof contentUrls].length} files
                </div>
              ))}
            <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
              Total Files:{' '}
              {Object.entries(contentTypes)
                .filter(([, selected]) => selected)
                .reduce(
                  (total, [type]) =>
                    total +
                    contentUrls[type as keyof typeof contentUrls].length,
                  0
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const BackgroundFetchStatus: Story = {
  render: () => <BackgroundFetchStatusDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Shows the current status of background fetch capabilities, browser compatibility information, and active download monitoring.',
      },
    },
  },
};

export const FileDownload: Story = {
  render: () => <FileDownloadDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how to configure and start background file downloads. Downloads continue even when the app is closed or backgrounded.',
      },
    },
  },
};

export const LargeContent: Story = {
  render: () => <LargeContentDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Shows how to download large content like image galleries, videos, and datasets using background fetch for improved reliability on slow or unstable connections.',
      },
    },
  },
};
