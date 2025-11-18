/**
 * Image Loader Hook Stories
 * Epic 53 - AAE Image Editing
 *
 * Comprehensive Storybook stories demonstrating image loading capabilities
 * with different configurations and use cases.
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useImageLoader, ImageLoaderUtils } from './use-image-loader';
import { ImageLoaderOptions } from './use-image-loader';

const meta: Meta = {
  title: 'Hooks/useImageLoader',
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive image loading hook with FileReader API integration, validation, optimization, and file picker support for image editing workflows.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Image Loader Component for Stories
const ImageLoaderDemo: React.FC<{ options?: ImageLoaderOptions }> = ({
  options,
}) => {
  const {
    state,
    image,
    imageUrl,
    file,
    openImagePicker,
    loadFromFile,
    loadFromUrl,
    clearImage,
    downloadImage,
    getImageDataUrl,
    validateImage,
    optimizeImage,
  } = useImageLoader(options);

  const [urlInput, setUrlInput] = useState('');
  const [optimizedImage, setOptimizedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [customFile, setCustomFile] = useState<File | null>(null);

  const handleLoadFromUrl = async () => {
    if (urlInput.trim()) {
      await loadFromUrl(urlInput);
    }
  };

  const handleOptimizeImage = async () => {
    const optimized = await optimizeImage(800, 600, 0.8);
    setOptimizedImage(optimized);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setCustomFile(selectedFile);
      loadFromFile(selectedFile);
    }
  };

  const handleValidateCustomFile = async () => {
    if (customFile) {
      const isValid = await validateImage(customFile);
      alert(isValid ? 'File is valid!' : 'File validation failed!');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px' }}>
      <h2>Image Loader Demo</h2>

      {/* Status Display */}
      <div
        style={{
          padding: '15px',
          backgroundColor: state.hasImage ? '#e8f5e8' : '#f5f5f5',
          border: `2px solid ${state.hasImage ? '#4caf50' : '#ddd'}`,
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h3>Status</h3>
        <p>
          <strong>Supported:</strong> {state.isSupported ? '✅ Yes' : '❌ No'}
        </p>
        <p>
          <strong>Loading:</strong> {state.isLoading ? '⏳ Yes' : '✅ No'}
        </p>
        <p>
          <strong>Has Image:</strong> {state.hasImage ? '🖼️ Yes' : '❌ No'}
        </p>

        {state.metadata && (
          <div
            style={{
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#f0f8ff',
              borderRadius: '4px',
            }}
          >
            <h4>Image Metadata</h4>
            <p>
              <strong>Filename:</strong> {state.metadata.fileName}
            </p>
            <p>
              <strong>Dimensions:</strong> {state.metadata.width} ×{' '}
              {state.metadata.height}px
            </p>
            <p>
              <strong>Aspect Ratio:</strong>{' '}
              {state.metadata.aspectRatio.toFixed(2)}
            </p>
            <p>
              <strong>File Size:</strong>{' '}
              {ImageLoaderUtils.formatFileSize(state.metadata.fileSize)}
            </p>
            <p>
              <strong>File Type:</strong> {state.metadata.fileType}
            </p>
            <p>
              <strong>Last Modified:</strong>{' '}
              {new Date(state.metadata.lastModified).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      {/* Error Display */}
      {state.error && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#ffebee',
            border: '2px solid #f44336',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <h3>Error</h3>
          <p>
            <strong>Type:</strong> {state.error.type}
          </p>
          <p>
            <strong>Message:</strong> {state.error.message}
          </p>
          {state.error.originalError && (
            <p>
              <strong>Details:</strong> {state.error.originalError.message}
            </p>
          )}
        </div>
      )}

      {/* Image Loading Controls */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Load Image</h3>

        {/* File Picker */}
        <div style={{ marginBottom: '15px' }}>
          <button
            onClick={openImagePicker}
            disabled={state.isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor: state.isLoading ? '#ccc' : '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: state.isLoading ? 'not-allowed' : 'pointer',
              marginRight: '10px',
            }}
          >
            {state.isLoading ? '⏳ Loading...' : '📁 Choose File'}
          </button>

          <button
            onClick={clearImage}
            disabled={!state.hasImage}
            style={{
              padding: '10px 20px',
              backgroundColor: !state.hasImage ? '#ccc' : '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !state.hasImage ? 'not-allowed' : 'pointer',
            }}
          >
            🗑️ Clear Image
          </button>
        </div>

        {/* Custom File Input */}
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
            }}
          >
            Direct File Input:
          </label>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileInput}
            style={{ marginRight: '10px' }}
          />
          <button
            onClick={handleValidateCustomFile}
            disabled={!customFile}
            style={{
              padding: '5px 15px',
              backgroundColor: !customFile ? '#ccc' : '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !customFile ? 'not-allowed' : 'pointer',
            }}
          >
            ✅ Validate File
          </button>
        </div>

        {/* URL Input */}
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
            }}
          >
            Load from URL:
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type='url'
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              placeholder='https://example.com/image.jpg'
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
            <button
              onClick={handleLoadFromUrl}
              disabled={!urlInput.trim() || state.isLoading}
              style={{
                padding: '8px 16px',
                backgroundColor:
                  !urlInput.trim() || state.isLoading ? '#ccc' : '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor:
                  !urlInput.trim() || state.isLoading
                    ? 'not-allowed'
                    : 'pointer',
              }}
            >
              🌐 Load URL
            </button>
          </div>
        </div>
      </div>

      {/* Image Display */}
      {imageUrl && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Loaded Image</h3>
          <img
            src={imageUrl}
            alt='Loaded image'
            style={{
              maxWidth: '100%',
              maxHeight: '400px',
              border: '2px solid #4caf50',
              borderRadius: '8px',
              display: 'block',
              marginBottom: '10px',
            }}
          />

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => downloadImage()}
              style={{
                padding: '8px 16px',
                backgroundColor: '#9c27b0',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              💾 Download
            </button>

            <button
              onClick={() => downloadImage('custom-name.png', 'image/png')}
              style={{
                padding: '8px 16px',
                backgroundColor: '#9c27b0',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              💾 Download as PNG
            </button>

            <button
              onClick={() =>
                downloadImage('custom-name.jpg', 'image/jpeg', 0.9)
              }
              style={{
                padding: '8px 16px',
                backgroundColor: '#9c27b0',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              💾 Download as JPEG
            </button>

            <button
              onClick={handleOptimizeImage}
              style={{
                padding: '8px 16px',
                backgroundColor: '#ff5722',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🔧 Optimize (800×600)
            </button>
          </div>
        </div>
      )}

      {/* Optimized Image Display */}
      {optimizedImage && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Optimized Image</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <h4>Original</h4>
              <img
                src={imageUrl!}
                alt='Original'
                style={{ maxWidth: '300px', border: '1px solid #ddd' }}
              />
              {state.metadata && (
                <p style={{ fontSize: '12px', color: '#666' }}>
                  {state.metadata.width}×{state.metadata.height}px
                </p>
              )}
            </div>
            <div>
              <h4>Optimized</h4>
              <img
                src={optimizedImage.src}
                alt='Optimized'
                style={{ maxWidth: '300px', border: '1px solid #4caf50' }}
              />
              <p style={{ fontSize: '12px', color: '#666' }}>
                {optimizedImage.naturalWidth}×{optimizedImage.naturalHeight}px
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Utility Functions Demo */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Utility Functions</h3>
        <div
          style={{
            fontSize: '14px',
            color: '#666',
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '4px',
          }}
        >
          <p>
            <strong>Format File Size:</strong>{' '}
            {ImageLoaderUtils.formatFileSize(5242880)} (5MB example)
          </p>
          <p>
            <strong>Get Format from Extension:</strong>{' '}
            {ImageLoaderUtils.getFormatFromExtension('photo.jpg')}
          </p>
          <p>
            <strong>Calculate Optimal Dimensions:</strong>
            {JSON.stringify(
              ImageLoaderUtils.calculateOptimalDimensions(1920, 1080, 800, 600)
            )}
          </p>
          <p>
            <strong>Is Image Format:</strong> image/jpeg →{' '}
            {ImageLoaderUtils.isImageFormat('image/jpeg') ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Calculate Aspect Ratio:</strong> 1920×1080 →{' '}
            {ImageLoaderUtils.calculateAspectRatio(1920, 1080).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

// Basic Image Loader Story
export const BasicImageLoader: Story = {
  render: () => <ImageLoaderDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic image loader with default settings. Supports file picker, URL loading, validation, and download capabilities.',
      },
    },
  },
};

// High Resolution Image Loader Story
export const HighResolutionImageLoader: Story = {
  render: () => (
    <ImageLoaderDemo
      options={{
        maxFileSize: 50 * 1024 * 1024, // 50MB
        maxWidth: 8192,
        maxHeight: 8192,
        acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
        autoOptimize: true,
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'High resolution image loader supporting up to 8K images with 50MB file size limit and automatic optimization.',
      },
    },
  },
};

// Restricted Image Loader Story
export const RestrictedImageLoader: Story = {
  render: () => (
    <ImageLoaderDemo
      options={{
        maxFileSize: 2 * 1024 * 1024, // 2MB
        maxWidth: 1200,
        maxHeight: 800,
        acceptedFormats: ['image/jpeg', 'image/png'],
        onImageLoad: (image, file) => {
          console.log('Image loaded:', {
            width: image.naturalWidth,
            height: image.naturalHeight,
            file: file.name,
          });
        },
        onError: error => {
          console.error('Image loader error:', error);
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Restricted image loader with 2MB limit, maximum 1200×800px dimensions, and only JPEG/PNG support with event callbacks.',
      },
    },
  },
};

// Mobile Optimized Image Loader Story
export const MobileOptimizedImageLoader: Story = {
  render: () => (
    <ImageLoaderDemo
      options={{
        maxFileSize: 5 * 1024 * 1024, // 5MB
        maxWidth: 1920,
        maxHeight: 1080,
        autoOptimize: true,
        acceptedFormats: ['image/jpeg', 'image/webp'], // Optimized formats for mobile
        onImageLoad: (image, file) => {
          // Auto-optimize for mobile
          console.log('Mobile image loaded, consider optimization');
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Mobile-optimized image loader with automatic optimization, WebP support, and mobile-friendly file size limits.',
      },
    },
  },
};

// Development Image Loader Story
export const DevelopmentImageLoader: Story = {
  render: () => (
    <ImageLoaderDemo
      options={{
        maxFileSize: 100 * 1024 * 1024, // 100MB for development
        acceptedFormats: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
          'image/bmp',
          'image/svg+xml',
        ],
        onImageLoad: (image, file) => {
          console.log('Dev: Image loaded', {
            dimensions: `${image.naturalWidth}×${image.naturalHeight}`,
            size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
            type: file.type,
          });
        },
        onError: error => {
          console.error('Dev: Image error', error);
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Development image loader with relaxed limits, all image format support, and comprehensive logging for debugging.',
      },
    },
  },
};
