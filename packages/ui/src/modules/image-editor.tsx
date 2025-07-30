/**
 * @fileoverview ImageEditor Module for Epic 53 - AAE Image Editing
 * A comprehensive image editing module with canvas-based manipulation capabilities.
 * Provides scaling, rotation, cropping controls with real-time preview and save functionality.
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useImageLoader } from '../hooks/use-image-loader';
import { Button } from '../primitives/button';
import { Slider } from '../primitives/slider';

// Image editor interfaces
export interface ImageEditingTransforms {
  scale: number;
  rotation: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  brightness: number;
  contrast: number;
  saturation: number;
}

export interface ImageEditorOptions {
  /** Maximum canvas dimensions */
  maxCanvasWidth?: number;
  maxCanvasHeight?: number;
  /** Default image quality for exports */
  defaultQuality?: number;
  /** Enable undo/redo functionality */
  enableHistory?: boolean;
  /** Maximum history states */
  maxHistoryStates?: number;
  /** Callback when image is edited */
  onImageEdit?: (transforms: ImageEditingTransforms) => void;
  /** Callback when image is saved */
  onImageSave?: (blob: Blob, filename: string) => void;
  /** Enable keyboard shortcuts */
  enableKeyboardShortcuts?: boolean;
}

export interface HistoryState {
  transforms: ImageEditingTransforms;
  timestamp: number;
  id: string;
}

export interface ImageEditorProps extends ImageEditorOptions {
  /** CSS class name */
  className?: string;
  /** Component style */
  style?: React.CSSProperties;
  /** Disable all controls */
  disabled?: boolean;
  /** Show advanced controls */
  showAdvancedControls?: boolean;
}

// Default transform values
const DEFAULT_TRANSFORMS: ImageEditingTransforms = {
  scale: 1,
  rotation: 0,
  flipHorizontal: false,
  flipVertical: false,
  brightness: 100,
  contrast: 100,
  saturation: 100,
};

// Default options
const DEFAULT_OPTIONS: Partial<ImageEditorOptions> = {
  maxCanvasWidth: 1920,
  maxCanvasHeight: 1080,
  defaultQuality: 0.92,
  enableHistory: true,
  maxHistoryStates: 20,
  enableKeyboardShortcuts: true,
};

/**
 * ImageEditor Module Component
 * Comprehensive image editing with canvas-based transformations
 */
export const ImageEditor: React.FC<ImageEditorProps> = ({
  className,
  style,
  disabled = false,
  showAdvancedControls = true,
  maxCanvasWidth = 1920,
  maxCanvasHeight = 1080,
  defaultQuality = 0.92,
  enableHistory = true,
  maxHistoryStates = 20,
  enableKeyboardShortcuts = true,
  onImageEdit,
  onImageSave,
}) => {
  // Image loader integration
  const imageLoader = useImageLoader({
    maxFileSize: 20 * 1024 * 1024, // 20MB
    maxWidth: maxCanvasWidth,
    maxHeight: maxCanvasHeight,
    autoOptimize: true,
  });

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Transform state
  const [transforms, setTransforms] =
    useState<ImageEditingTransforms>(DEFAULT_TRANSFORMS);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);

  // UI state
  const [exportFormat, setExportFormat] = useState<'png' | 'jpeg' | 'webp'>(
    'png'
  );
  const [exportQuality, setExportQuality] = useState(defaultQuality);
  const [showGrid, setShowGrid] = useState(false);

  // Add to history
  const addToHistory = useCallback(
    (newTransforms: ImageEditingTransforms) => {
      if (!enableHistory) return;

      const historyState: HistoryState = {
        transforms: { ...newTransforms },
        timestamp: Date.now(),
        id: Math.random().toString(36).substr(2, 9),
      };

      setHistory(prev => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(historyState);

        // Limit history size
        if (newHistory.length > maxHistoryStates) {
          newHistory.shift();
          return newHistory;
        }

        return newHistory;
      });

      setHistoryIndex(prev => Math.min(prev + 1, maxHistoryStates - 1));
    },
    [enableHistory, historyIndex, maxHistoryStates]
  );

  // Update transforms with history
  const updateTransforms = useCallback(
    (newTransforms: Partial<ImageEditingTransforms>) => {
      const updatedTransforms = { ...transforms, ...newTransforms };
      setTransforms(updatedTransforms);
      addToHistory(updatedTransforms);
      onImageEdit?.(updatedTransforms);
      setIsEditing(true);
    },
    [transforms, addToHistory, onImageEdit]
  );

  // Reset transforms
  const resetTransforms = useCallback(() => {
    setTransforms(DEFAULT_TRANSFORMS);
    addToHistory(DEFAULT_TRANSFORMS);
    setIsEditing(false);
  }, [addToHistory]);

  // Undo/Redo functionality
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setTransforms(history[newIndex].transforms);
      setIsEditing(true);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setTransforms(history[newIndex].transforms);
      setIsEditing(true);
    }
  }, [history, historyIndex]);

  // Apply image filters using CSS filters
  const getImageFilters = useCallback(() => {
    const { brightness, contrast, saturation } = transforms;
    return `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
  }, [transforms]);

  // Render image on canvas with transforms
  const renderImageOnCanvas = useCallback(
    (
      canvas: HTMLCanvasElement,
      image: HTMLImageElement,
      transforms: ImageEditingTransforms
    ) => {
      const ctx = canvas.getContext('2d');
      if (!ctx || !image) return;

      const { scale, rotation, flipHorizontal, flipVertical } = transforms;

      // Calculate canvas dimensions
      const imageWidth = image.naturalWidth;
      const imageHeight = image.naturalHeight;
      const scaledWidth = imageWidth * scale;
      const scaledHeight = imageHeight * scale;

      // Set canvas size
      canvas.width = Math.max(scaledWidth, imageWidth);
      canvas.height = Math.max(scaledHeight, imageHeight);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Save context state
      ctx.save();

      // Move to center for transformations
      ctx.translate(canvas.width / 2, canvas.height / 2);

      // Apply rotation
      if (rotation !== 0) {
        ctx.rotate((rotation * Math.PI) / 180);
      }

      // Apply flips
      if (flipHorizontal || flipVertical) {
        ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
      }

      // Apply scale
      if (scale !== 1) {
        ctx.scale(scale, scale);
      }

      // Draw image centered
      ctx.drawImage(
        image,
        -imageWidth / 2,
        -imageHeight / 2,
        imageWidth,
        imageHeight
      );

      // Restore context state
      ctx.restore();

      // Draw grid if enabled
      if (showGrid) {
        drawGrid(ctx, canvas.width, canvas.height);
      }
    },
    [showGrid]
  );

  // Draw grid overlay
  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const gridSize = 20;

      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.restore();
    },
    []
  );

  // Export image with current transforms
  const exportImage = useCallback(
    (
      filename?: string,
      format: 'png' | 'jpeg' | 'webp' = exportFormat,
      quality: number = exportQuality
    ) => {
      if (!canvasRef.current || !imageLoader.image) return;

      // Create final export canvas
      const exportCanvas = document.createElement('canvas');
      renderImageOnCanvas(exportCanvas, imageLoader.image, transforms);

      // Convert to blob
      const mimeType = `image/${format}`;
      exportCanvas.toBlob(
        blob => {
          if (!blob) return;

          const exportFilename =
            filename || `edited-image-${Date.now()}.${format}`;

          // Download file
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = exportFilename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);

          onImageSave?.(blob, exportFilename);
        },
        mimeType,
        quality
      );
    },
    [
      canvasRef,
      imageLoader.image,
      transforms,
      exportFormat,
      exportQuality,
      renderImageOnCanvas,
      onImageSave,
    ]
  );

  // Keyboard shortcuts
  useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'z':
            event.preventDefault();
            if (event.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 's':
            event.preventDefault();
            exportImage();
            break;
          case 'r':
            event.preventDefault();
            resetTransforms();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardShortcuts, undo, redo, exportImage, resetTransforms]);

  // Update canvas when image or transforms change
  useEffect(() => {
    if (imageLoader.image && canvasRef.current) {
      renderImageOnCanvas(canvasRef.current, imageLoader.image, transforms);
    }
  }, [imageLoader.image, transforms, renderImageOnCanvas]);

  // Initialize history on first image load
  useEffect(() => {
    if (imageLoader.image && history.length === 0) {
      addToHistory(DEFAULT_TRANSFORMS);
    }
  }, [imageLoader.image, history.length, addToHistory]);

  return (
    <div className={className} style={style}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Image Editor</h2>
        <p>Load an image and apply transformations using the controls below.</p>
      </div>

      {/* Image Loading Section */}
      <div
        style={{
          marginBottom: '20px',
          padding: '20px',
          border: '2px dashed #ddd',
          borderRadius: '8px',
        }}
      >
        <h3>Load Image</h3>

        {imageLoader.state.error && (
          <div
            style={{
              padding: '10px',
              backgroundColor: '#ffebee',
              border: '1px solid #f44336',
              borderRadius: '4px',
              marginBottom: '10px',
              color: '#d32f2f',
            }}
          >
            <strong>Error:</strong> {imageLoader.state.error.message}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button
            onClick={imageLoader.openImagePicker}
            disabled={disabled || imageLoader.state.isLoading}
            variant='primary'
          >
            {imageLoader.state.isLoading ? '📤 Loading...' : '📁 Choose Image'}
          </Button>

          <Button
            onClick={imageLoader.clearImage}
            disabled={disabled || !imageLoader.state.hasImage}
            variant='secondary'
          >
            🗑️ Clear Image
          </Button>
        </div>

        {imageLoader.state.metadata && (
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            <p>
              <strong>File:</strong> {imageLoader.state.metadata.fileName}
            </p>
            <p>
              <strong>Dimensions:</strong> {imageLoader.state.metadata.width} ×{' '}
              {imageLoader.state.metadata.height}px
            </p>
            <p>
              <strong>Size:</strong>{' '}
              {(imageLoader.state.metadata.fileSize / (1024 * 1024)).toFixed(2)}{' '}
              MB
            </p>
          </div>
        )}
      </div>

      {/* Image Editor Interface */}
      {imageLoader.state.hasImage && imageLoader.image && (
        <div>
          {/* Canvas Display */}
          <div style={{ marginBottom: '20px' }}>
            <h3>Preview</h3>
            <div
              style={{
                border: '2px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                backgroundColor: '#fafafa',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <canvas
                ref={canvasRef}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  filter: getImageFilters(),
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />

              <div
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '14px',
                  }}
                >
                  <input
                    type='checkbox'
                    checked={showGrid}
                    onChange={e => setShowGrid(e.target.checked)}
                  />
                  Show Grid
                </label>
              </div>
            </div>
          </div>

          {/* Transform Controls */}
          <div style={{ marginBottom: '20px' }}>
            <h3>Transform Controls</h3>

            {/* Scale Control */}
            <div style={{ marginBottom: '15px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                }}
              >
                Scale: {transforms.scale.toFixed(2)}x
              </label>
              <Slider
                value={[transforms.scale]}
                onValueChange={([value]) => updateTransforms({ scale: value })}
                min={0.1}
                max={3}
                step={0.1}
                disabled={disabled}
                style={{ width: '100%' }}
              />
            </div>

            {/* Rotation Control */}
            <div style={{ marginBottom: '15px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                }}
              >
                Rotation: {transforms.rotation}°
              </label>
              <Slider
                value={[transforms.rotation]}
                onValueChange={([value]) =>
                  updateTransforms({ rotation: value })
                }
                min={-180}
                max={180}
                step={1}
                disabled={disabled}
                style={{ width: '100%' }}
              />
            </div>

            {/* Flip Controls */}
            <div style={{ marginBottom: '15px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                }}
              >
                Flip
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button
                  onClick={() =>
                    updateTransforms({
                      flipHorizontal: !transforms.flipHorizontal,
                    })
                  }
                  variant={transforms.flipHorizontal ? 'primary' : 'secondary'}
                  disabled={disabled}
                  size='sm'
                >
                  ↔️ Horizontal
                </Button>
                <Button
                  onClick={() =>
                    updateTransforms({ flipVertical: !transforms.flipVertical })
                  }
                  variant={transforms.flipVertical ? 'primary' : 'secondary'}
                  disabled={disabled}
                  size='sm'
                >
                  ↕️ Vertical
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Controls */}
          {showAdvancedControls && (
            <div style={{ marginBottom: '20px' }}>
              <h3>Color Adjustments</h3>

              {/* Brightness Control */}
              <div style={{ marginBottom: '15px' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                  }}
                >
                  Brightness: {transforms.brightness}%
                </label>
                <Slider
                  value={[transforms.brightness]}
                  onValueChange={([value]) =>
                    updateTransforms({ brightness: value })
                  }
                  min={0}
                  max={200}
                  step={1}
                  disabled={disabled}
                  style={{ width: '100%' }}
                />
              </div>

              {/* Contrast Control */}
              <div style={{ marginBottom: '15px' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                  }}
                >
                  Contrast: {transforms.contrast}%
                </label>
                <Slider
                  value={[transforms.contrast]}
                  onValueChange={([value]) =>
                    updateTransforms({ contrast: value })
                  }
                  min={0}
                  max={200}
                  step={1}
                  disabled={disabled}
                  style={{ width: '100%' }}
                />
              </div>

              {/* Saturation Control */}
              <div style={{ marginBottom: '15px' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                  }}
                >
                  Saturation: {transforms.saturation}%
                </label>
                <Slider
                  value={[transforms.saturation]}
                  onValueChange={([value]) =>
                    updateTransforms({ saturation: value })
                  }
                  min={0}
                  max={200}
                  step={1}
                  disabled={disabled}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          )}

          {/* Action Controls */}
          <div style={{ marginBottom: '20px' }}>
            <h3>Actions</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Button
                onClick={resetTransforms}
                disabled={disabled || !isEditing}
                variant='secondary'
              >
                🔄 Reset
              </Button>

              <Button
                onClick={undo}
                disabled={disabled || historyIndex <= 0}
                variant='secondary'
              >
                ↶ Undo
              </Button>

              <Button
                onClick={redo}
                disabled={disabled || historyIndex >= history.length - 1}
                variant='secondary'
              >
                ↷ Redo
              </Button>

              <Button
                onClick={() => exportImage()}
                disabled={disabled}
                variant='primary'
              >
                💾 Save Image
              </Button>
            </div>
          </div>

          {/* Export Settings */}
          <div style={{ marginBottom: '20px' }}>
            <h3>Export Settings</h3>
            <div
              style={{
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                  }}
                >
                  Format
                </label>
                <select
                  value={exportFormat}
                  onChange={e =>
                    setExportFormat(e.target.value as 'png' | 'jpeg' | 'webp')
                  }
                  disabled={disabled}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                >
                  <option value='png'>PNG</option>
                  <option value='jpeg'>JPEG</option>
                  <option value='webp'>WebP</option>
                </select>
              </div>

              {exportFormat === 'jpeg' && (
                <div>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '5px',
                      fontWeight: 'bold',
                    }}
                  >
                    Quality: {Math.round(exportQuality * 100)}%
                  </label>
                  <Slider
                    value={[exportQuality]}
                    onValueChange={([value]) => setExportQuality(value)}
                    min={0.1}
                    max={1}
                    step={0.01}
                    disabled={disabled}
                    style={{ width: '150px' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Keyboard Shortcuts Info */}
          {enableKeyboardShortcuts && (
            <div style={{ fontSize: '12px', color: '#666', marginTop: '20px' }}>
              <strong>Keyboard shortcuts:</strong> Ctrl+Z (Undo), Ctrl+Shift+Z
              (Redo), Ctrl+S (Save), Ctrl+R (Reset)
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
