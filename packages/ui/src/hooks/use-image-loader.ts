/**
 * @fileoverview Image Loader Hook for Epic 53 - AAE Image Editing
 * Provides image loading capabilities using FileReader API and file picker integration.
 * Handles image validation, loading states, and error management for image editing workflows.
 */

import { useState, useCallback, useEffect } from 'react';
import { useFilePicker } from './use-file-picker';

// Image loader types
export interface ImageLoaderOptions {
  /** Maximum file size in bytes */
  maxFileSize?: number;
  /** Accepted image formats */
  acceptedFormats?: string[];
  /** Maximum image dimensions */
  maxWidth?: number;
  maxHeight?: number;
  /** Callback when image loads successfully */
  onImageLoad?: (image: HTMLImageElement, file: File) => void;
  /** Callback when error occurs */
  onError?: (error: ImageLoaderError) => void;
  /** Enable automatic image optimization */
  autoOptimize?: boolean;
}

export interface ImageLoaderError {
  type: 'format' | 'size' | 'dimensions' | 'loading' | 'validation';
  message: string;
  originalError?: Error;
}

export interface ImageMetadata {
  width: number;
  height: number;
  aspectRatio: number;
  fileSize: number;
  fileName: string;
  fileType: string;
  lastModified: number;
}

export interface ImageLoaderState {
  isLoading: boolean;
  isSupported: boolean;
  hasImage: boolean;
  error: ImageLoaderError | null;
  metadata: ImageMetadata | null;
}

export interface UseImageLoaderReturn {
  // State
  state: ImageLoaderState;

  // Image data
  image: HTMLImageElement | null;
  imageUrl: string | null;
  file: File | null;

  // Actions
  openImagePicker: () => void;
  loadFromFile: (file: File) => Promise<boolean>;
  loadFromUrl: (url: string) => Promise<boolean>;
  clearImage: () => void;

  // Utilities
  downloadImage: (filename?: string, format?: string, quality?: number) => void;
  getImageDataUrl: (format?: string, quality?: number) => string | null;
  validateImage: (file: File) => Promise<boolean>;
  optimizeImage: (
    maxWidth?: number,
    maxHeight?: number,
    quality?: number
  ) => Promise<HTMLImageElement | null>;
}

// Default configuration
const DEFAULT_OPTIONS: Partial<ImageLoaderOptions> = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  acceptedFormats: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
  ],
  maxWidth: 4096,
  maxHeight: 4096,
  autoOptimize: false,
};

// Utility functions
const isImageFormat = (type: string): boolean => {
  return type.startsWith('image/');
};

const calculateAspectRatio = (width: number, height: number): number => {
  return width / height;
};

const createImageMetadata = (
  image: HTMLImageElement,
  file: File
): ImageMetadata => {
  return {
    width: image.naturalWidth,
    height: image.naturalHeight,
    aspectRatio: calculateAspectRatio(image.naturalWidth, image.naturalHeight),
    fileSize: file.size,
    fileName: file.name,
    fileType: file.type,
    lastModified: file.lastModified,
  };
};

/**
 * Image Loader Hook
 * Handles image loading, validation, and processing for image editing workflows
 */
export function useImageLoader(
  options: ImageLoaderOptions = {}
): UseImageLoaderReturn {
  const config = { ...DEFAULT_OPTIONS, ...options };

  // File picker integration
  const filePicker = useFilePicker({
    accept: config.acceptedFormats?.join(',') || 'image/*',
    multiple: false,
    maxFileSize: config.maxFileSize,
  });

  // State
  const [state, setState] = useState<ImageLoaderState>({
    isLoading: false,
    isSupported:
      typeof FileReader !== 'undefined' && typeof Image !== 'undefined',
    hasImage: false,
    error: null,
    metadata: null,
  });

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Error handling
  const handleError = useCallback(
    (
      type: ImageLoaderError['type'],
      message: string,
      originalError?: Error
    ) => {
      const error: ImageLoaderError = { type, message, originalError };
      setState(prev => ({ ...prev, error, isLoading: false }));
      config.onError?.(error);
    },
    [config]
  );

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Validate image file
  const validateImage = useCallback(
    async (file: File): Promise<boolean> => {
      clearError();

      // Check if it's an image
      if (!isImageFormat(file.type)) {
        handleError(
          'format',
          `Invalid file format: ${file.type}. Please select an image file.`
        );
        return false;
      }

      // Check accepted formats
      if (
        config.acceptedFormats &&
        !config.acceptedFormats.includes(file.type)
      ) {
        handleError(
          'format',
          `File format ${file.type} is not supported. Accepted formats: ${config.acceptedFormats.join(', ')}`
        );
        return false;
      }

      // Check file size
      if (config.maxFileSize && file.size > config.maxFileSize) {
        const maxSizeMB = (config.maxFileSize / (1024 * 1024)).toFixed(1);
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
        handleError(
          'size',
          `File size (${fileSizeMB}MB) exceeds maximum allowed size (${maxSizeMB}MB)`
        );
        return false;
      }

      return true;
    },
    [config.acceptedFormats, config.maxFileSize, handleError, clearError]
  );

  // Load image from file
  const loadFromFile = useCallback(
    async (file: File): Promise<boolean> => {
      if (!state.isSupported) {
        handleError(
          'loading',
          'Image loading is not supported in this browser'
        );
        return false;
      }

      // Validate file
      const isValid = await validateImage(file);
      if (!isValid) return false;

      setState(prev => ({ ...prev, isLoading: true, error: null }));

      return new Promise(resolve => {
        const reader = new FileReader();

        reader.onload = event => {
          const result = event.target?.result;
          if (typeof result !== 'string') {
            handleError('loading', 'Failed to read image file');
            resolve(false);
            return;
          }

          const img = new Image();

          img.onload = () => {
            // Check dimensions
            if (config.maxWidth && img.naturalWidth > config.maxWidth) {
              handleError(
                'dimensions',
                `Image width (${img.naturalWidth}px) exceeds maximum allowed width (${config.maxWidth}px)`
              );
              resolve(false);
              return;
            }

            if (config.maxHeight && img.naturalHeight > config.maxHeight) {
              handleError(
                'dimensions',
                `Image height (${img.naturalHeight}px) exceeds maximum allowed height (${config.maxHeight}px)`
              );
              resolve(false);
              return;
            }

            // Success - update state
            const metadata = createImageMetadata(img, file);

            setImage(img);
            setImageUrl(result);
            setFile(file);
            setState(prev => ({
              ...prev,
              isLoading: false,
              hasImage: true,
              metadata,
            }));

            config.onImageLoad?.(img, file);
            resolve(true);
          };

          img.onerror = () => {
            handleError(
              'loading',
              'Failed to load image. The file may be corrupted.'
            );
            resolve(false);
          };

          img.src = result;
        };

        reader.onerror = () => {
          handleError('loading', 'Failed to read image file');
          resolve(false);
        };

        reader.readAsDataURL(file);
      });
    },
    [state.isSupported, validateImage, config, handleError]
  );

  // Load image from URL
  const loadFromUrl = useCallback(
    async (url: string): Promise<boolean> => {
      if (!state.isSupported) {
        handleError(
          'loading',
          'Image loading is not supported in this browser'
        );
        return false;
      }

      setState(prev => ({ ...prev, isLoading: true, error: null }));

      return new Promise(resolve => {
        const img = new Image();

        img.onload = () => {
          // Create synthetic metadata
          const metadata: ImageMetadata = {
            width: img.naturalWidth,
            height: img.naturalHeight,
            aspectRatio: calculateAspectRatio(
              img.naturalWidth,
              img.naturalHeight
            ),
            fileSize: 0, // Unknown for URLs
            fileName: url.split('/').pop() || 'image',
            fileType: 'image/unknown',
            lastModified: Date.now(),
          };

          setImage(img);
          setImageUrl(url);
          setFile(null); // No file for URL loads
          setState(prev => ({
            ...prev,
            isLoading: false,
            hasImage: true,
            metadata,
          }));

          resolve(true);
        };

        img.onerror = () => {
          handleError(
            'loading',
            'Failed to load image from URL. Check the URL and try again.'
          );
          resolve(false);
        };

        // Enable CORS for cross-origin images
        img.crossOrigin = 'anonymous';
        img.src = url;
      });
    },
    [state.isSupported, handleError]
  );

  // Open image picker
  const openImagePicker = useCallback(() => {
    filePicker.openFilePicker();
  }, [filePicker]);

  // Clear current image
  const clearImage = useCallback(() => {
    if (imageUrl && imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
    }

    setImage(null);
    setImageUrl(null);
    setFile(null);
    setState(prev => ({
      ...prev,
      hasImage: false,
      metadata: null,
      error: null,
    }));
  }, [imageUrl]);

  // Get image as data URL
  const getImageDataUrl = useCallback(
    (format: string = 'image/png', quality: number = 0.92): string | null => {
      if (!image) return null;

      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        ctx.drawImage(image, 0, 0);

        return canvas.toDataURL(format, quality);
      } catch (error) {
        handleError('loading', 'Failed to get image data URL', error as Error);
        return null;
      }
    },
    [image, handleError]
  );

  // Download image
  const downloadImage = useCallback(
    (
      filename?: string,
      format: string = 'image/png',
      quality: number = 0.92
    ) => {
      const dataUrl = getImageDataUrl(format, quality);
      if (!dataUrl) return;

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename || `image-${Date.now()}.${format.split('/')[1]}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [getImageDataUrl]
  );

  // Optimize image
  const optimizeImage = useCallback(
    async (
      maxWidth: number = 1920,
      maxHeight: number = 1080,
      quality: number = 0.8
    ): Promise<HTMLImageElement | null> => {
      if (!image) return null;

      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        // Calculate new dimensions
        let { width, height } = image;

        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;

          if (width > height) {
            width = Math.min(width, maxWidth);
            height = width / aspectRatio;
          } else {
            height = Math.min(height, maxHeight);
            width = height * aspectRatio;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Apply image smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(image, 0, 0, width, height);

        // Convert to optimized image
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        const optimizedImg = new Image();

        return new Promise(resolve => {
          optimizedImg.onload = () => resolve(optimizedImg);
          optimizedImg.onerror = () => resolve(null);
          optimizedImg.src = dataUrl;
        });
      } catch (error) {
        handleError('loading', 'Failed to optimize image', error as Error);
        return null;
      }
    },
    [image, handleError]
  );

  // Handle file picker selection
  useEffect(() => {
    if (filePicker.selectedFiles.length > 0) {
      const selectedFile = filePicker.selectedFiles[0];
      loadFromFile(selectedFile);
    }
  }, [filePicker.selectedFiles, loadFromFile]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return {
    // State
    state,

    // Image data
    image,
    imageUrl,
    file,

    // Actions
    openImagePicker,
    loadFromFile,
    loadFromUrl,
    clearImage,

    // Utilities
    downloadImage,
    getImageDataUrl,
    validateImage,
    optimizeImage,
  };
}

// Export utility functions
export const ImageLoaderUtils = {
  isImageFormat,
  calculateAspectRatio,
  createImageMetadata,

  /**
   * Convert file size to human readable format
   */
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  /**
   * Get image format from file extension
   */
  getFormatFromExtension: (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'webp':
        return 'image/webp';
      case 'bmp':
        return 'image/bmp';
      default:
        return 'image/png';
    }
  },

  /**
   * Calculate optimal dimensions maintaining aspect ratio
   */
  calculateOptimalDimensions: (
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } => {
    const aspectRatio = originalWidth / originalHeight;

    let width = originalWidth;
    let height = originalHeight;

    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    return { width: Math.round(width), height: Math.round(height) };
  },
};

export default useImageLoader;
