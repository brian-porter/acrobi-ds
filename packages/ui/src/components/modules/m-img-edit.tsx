import React, { useState, useRef, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';
import { Dialog } from '../primitives/dialog';
import { Input } from '../primitives/input';
import { Textarea } from '../primitives/textarea';
import { Progress } from '../primitives/progress';
import { Icon } from '../primitives/icon';
import { Badge } from '../primitives/badge';

// Module: M-ImgEdit/M-FileAdd - Image uploading and editing workflow
// PRD v11 Account Interface Module for comprehensive image management

const imgEditVariants = cva(
  'relative flex flex-col bg-white rounded-lg shadow-lg overflow-hidden',
  {
    variants: {
      size: {
        sm: 'w-80 max-h-96',
        md: 'w-96 max-h-[500px]',
        lg: 'w-[500px] max-h-[600px]',
        xl: 'w-[600px] max-h-[700px]',
      },
      state: {
        upload: 'border-2 border-dashed border-gray-300',
        editing: 'border border-gray-200',
        processing: 'border border-blue-200 bg-blue-50',
        complete: 'border border-green-200 bg-green-50',
        error: 'border border-red-200 bg-red-50',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'upload',
    },
  }
);

const cropOverlayVariants = cva(
  'absolute inset-0 cursor-crosshair',
  {
    variants: {
      active: {
        true: 'bg-black bg-opacity-30',
        false: 'pointer-events-none',
      },
    },
  }
);

const toolbarVariants = cva(
  'flex items-center gap-2 p-3 bg-gray-50 border-t border-gray-200',
  {
    variants: {
      position: {
        top: 'border-t-0 border-b',
        bottom: 'border-b-0 border-t',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  }
);

export interface ImageEditFile {
  id: string;
  file: File;
  preview: string;
  originalSize: {
    width: number;
    height: number;
  };
  cropData?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  filters?: {
    brightness: number;
    contrast: number;
    saturation: number;
    rotation: number;
  };
  metadata?: {
    title?: string;
    description?: string;
    tags?: string[];
  };
}

export interface MImgEditProps extends VariantProps<typeof imgEditVariants> {
  isOpen: boolean;
  onClose: () => void;
  onSave: (files: ImageEditFile[]) => Promise<void>;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  allowedTypes?: string[];
  enableCrop?: boolean;
  enableFilters?: boolean;
  enableMetadata?: boolean;
  cropAspectRatio?: number | 'free';
  className?: string;
}

export const MImgEdit = React.forwardRef<HTMLDivElement, MImgEditProps>(
  ({
    isOpen,
    onClose,
    onSave,
    maxFiles = 5,
    maxFileSize = 10 * 1024 * 1024, // 10MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    enableCrop = true,
    enableFilters = true,
    enableMetadata = true,
    cropAspectRatio = 'free',
    size,
    state,
    className,
  }, ref) => {
    const [currentState, setCurrentState] = useState<'upload' | 'editing' | 'processing' | 'complete' | 'error'>('upload');
    const [files, setFiles] = useState<ImageEditFile[]>([]);
    const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isDragOver, setIsDragOver] = useState(false);
    const [cropMode, setCropMode] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const selectedFile = files[selectedFileIndex];

    const handleFileSelect = useCallback((fileList: FileList | null) => {
      if (!fileList) return;

      const validFiles = Array.from(fileList).filter(file => {
        if (!allowedTypes.includes(file.type)) return false;
        if (file.size > maxFileSize) return false;
        return true;
      });

      if (validFiles.length === 0) {
        setCurrentState('error');
        return;
      }

      const newFiles: ImageEditFile[] = validFiles.slice(0, maxFiles).map((file, index) => ({
        id: `file-${Date.now()}-${index}`,
        file,
        preview: URL.createObjectURL(file),
        originalSize: { width: 0, height: 0 }, // Will be set when image loads
        filters: {
          brightness: 100,
          contrast: 100,
          saturation: 100,
          rotation: 0,
        },
      }));

      setFiles(newFiles);
      setCurrentState('editing');
    }, [allowedTypes, maxFileSize, maxFiles]);

    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFileSelect(e.dataTransfer.files);
    }, [handleFileSelect]);

    const handleFilterChange = useCallback((filterName: keyof ImageEditFile['filters'], value: number) => {
      if (!selectedFile) return;

      const updatedFiles = [...files];
      updatedFiles[selectedFileIndex] = {
        ...selectedFile,
        filters: {
          ...selectedFile.filters!,
          [filterName]: value,
        },
      };
      setFiles(updatedFiles);
    }, [files, selectedFile, selectedFileIndex]);

    const handleMetadataChange = useCallback((field: keyof ImageEditFile['metadata'], value: string | string[]) => {
      if (!selectedFile) return;

      const updatedFiles = [...files];
      updatedFiles[selectedFileIndex] = {
        ...selectedFile,
        metadata: {
          ...selectedFile.metadata,
          [field]: value,
        },
      };
      setFiles(updatedFiles);
    }, [files, selectedFile, selectedFileIndex]);

    const handleCropToggle = useCallback(() => {
      setCropMode(!cropMode);
    }, [cropMode]);

    const handleSave = useCallback(async () => {
      if (files.length === 0) return;

      setCurrentState('processing');
      setUploadProgress(0);

      try {
        // Simulate processing progress
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 90) {
              clearInterval(interval);
              return 90;
            }
            return prev + 10;
          });
        }, 200);

        await onSave(files);

        clearInterval(interval);
        setUploadProgress(100);
        setCurrentState('complete');

        // Auto-close after success
        setTimeout(() => {
          onClose();
          setFiles([]);
          setCurrentState('upload');
          setUploadProgress(0);
        }, 1500);
      } catch (error) {
        setCurrentState('error');
        console.error('Failed to save images:', error);
      }
    }, [files, onSave, onClose]);

    const handleRemoveFile = useCallback((index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      
      if (updatedFiles.length === 0) {
        setCurrentState('upload');
      } else if (selectedFileIndex >= updatedFiles.length) {
        setSelectedFileIndex(updatedFiles.length - 1);
      }
    }, [files, selectedFileIndex]);

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <div
          ref={ref}
          className={cn(imgEditVariants({ size, state: currentState }), className)}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {currentState === 'upload' && 'Upload Images'}
              {currentState === 'editing' && 'Edit Images'}
              {currentState === 'processing' && 'Processing...'}
              {currentState === 'complete' && 'Upload Complete'}
              {currentState === 'error' && 'Upload Error'}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="x" className="h-4 w-4" />
            </Button>
          </div>

          {/* Upload State */}
          {currentState === 'upload' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className={`p-8 rounded-full ${isDragOver ? 'bg-blue-100' : 'bg-gray-100'} mb-4`}>
                <Icon name="upload" className={`h-8 w-8 ${isDragOver ? 'text-blue-600' : 'text-gray-400'}`} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {isDragOver ? 'Drop your images here' : 'Upload images'}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Drag and drop up to {maxFiles} images, or click to browse
              </p>
              <Button onClick={() => fileInputRef.current?.click()}>
                Choose Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={allowedTypes.join(',')}
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
              <div className="mt-4 text-xs text-gray-400">
                Supported: {allowedTypes.map(type => type.split('/')[1]).join(', ')} • 
                Max size: {Math.round(maxFileSize / 1024 / 1024)}MB each
              </div>
            </div>
          )}

          {/* Editing State */}
          {currentState === 'editing' && selectedFile && (
            <>
              {/* File Tabs */}
              {files.length > 1 && (
                <div className="flex items-center gap-2 p-2 bg-gray-50 border-b border-gray-200 overflow-x-auto">
                  {files.map((file, index) => (
                    <button
                      key={file.id}
                      onClick={() => setSelectedFileIndex(index)}
                      className={cn(
                        'flex items-center gap-2 px-3 py-1.5 rounded text-sm whitespace-nowrap',
                        index === selectedFileIndex
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      )}
                    >
                      <img
                        src={file.preview}
                        alt=""
                        className="w-4 h-4 rounded object-cover"
                      />
                      {file.file.name.substring(0, 15)}
                      {file.file.name.length > 15 && '...'}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile(index);
                        }}
                        className="ml-1 text-gray-400 hover:text-red-500"
                      >
                        <Icon name="x" className="h-3 w-3" />
                      </button>
                    </button>
                  ))}
                </div>
              )}

              {/* Image Preview */}
              <div className="flex-1 flex">
                <div className="flex-1 relative bg-gray-100 flex items-center justify-center">
                  <img
                    src={selectedFile.preview}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain"
                    style={{
                      filter: selectedFile.filters ? `
                        brightness(${selectedFile.filters.brightness}%) 
                        contrast(${selectedFile.filters.contrast}%) 
                        saturate(${selectedFile.filters.saturation}%)
                      ` : undefined,
                      transform: selectedFile.filters ? `rotate(${selectedFile.filters.rotation}deg)` : undefined,
                    }}
                  />
                  
                  {/* Crop Overlay */}
                  {cropMode && enableCrop && (
                    <div className={cn(cropOverlayVariants({ active: true }))}>
                      <div className="absolute inset-4 border-2 border-white border-dashed">
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-gray-400"></div>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-gray-400"></div>
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-gray-400"></div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-gray-400"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Editing Panel */}
                <div className="w-64 bg-gray-50 border-l border-gray-200 overflow-y-auto">
                  <div className="p-4 space-y-6">
                    {/* Crop Tools */}
                    {enableCrop && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Crop</h4>
                        <div className="space-y-2">
                          <Button
                            variant={cropMode ? "default" : "outline"}
                            size="sm"
                            onClick={handleCropToggle}
                            className="w-full"
                          >
                            <Icon name="crop" className="h-4 w-4 mr-2" />
                            {cropMode ? 'Apply Crop' : 'Crop Image'}
                          </Button>
                          {cropAspectRatio !== 'free' && (
                            <div className="text-xs text-gray-500">
                              Aspect ratio: {cropAspectRatio === 1 ? '1:1' : `${cropAspectRatio}:1`}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Filter Controls */}
                    {enableFilters && selectedFile.filters && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Filters</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="text-xs text-gray-600 mb-1 block">Brightness</label>
                            <input
                              type="range"
                              min="0"
                              max="200"
                              value={selectedFile.filters.brightness}
                              onChange={(e) => handleFilterChange('brightness', parseInt(e.target.value))}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="text-xs text-gray-500 text-center">{selectedFile.filters.brightness}%</div>
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 mb-1 block">Contrast</label>
                            <input
                              type="range"
                              min="0"
                              max="200"
                              value={selectedFile.filters.contrast}
                              onChange={(e) => handleFilterChange('contrast', parseInt(e.target.value))}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="text-xs text-gray-500 text-center">{selectedFile.filters.contrast}%</div>
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 mb-1 block">Saturation</label>
                            <input
                              type="range"
                              min="0"
                              max="200"
                              value={selectedFile.filters.saturation}
                              onChange={(e) => handleFilterChange('saturation', parseInt(e.target.value))}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="text-xs text-gray-500 text-center">{selectedFile.filters.saturation}%</div>
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 mb-1 block">Rotation</label>
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleFilterChange('rotation', (selectedFile.filters!.rotation - 90) % 360)}
                                className="flex-1"
                              >
                                <Icon name="rotate-ccw" className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleFilterChange('rotation', (selectedFile.filters!.rotation + 90) % 360)}
                                className="flex-1"
                              >
                                <Icon name="rotate-cw" className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Metadata */}
                    {enableMetadata && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Details</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-gray-600 mb-1 block">Title</label>
                            <Input
                              size="sm"
                              placeholder="Image title..."
                              value={selectedFile.metadata?.title || ''}
                              onChange={(e) => handleMetadataChange('title', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 mb-1 block">Description</label>
                            <Textarea
                              placeholder="Image description..."
                              value={selectedFile.metadata?.description || ''}
                              onChange={(e) => handleMetadataChange('description', e.target.value)}
                              className="text-xs"
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 mb-1 block">Tags</label>
                            <Input
                              size="sm"
                              placeholder="tag1, tag2, tag3..."
                              value={selectedFile.metadata?.tags?.join(', ') || ''}
                              onChange={(e) => handleMetadataChange('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className={cn(toolbarVariants())}>
                <div className="flex items-center gap-2 flex-1">
                  <Badge variant="secondary">{files.length} file{files.length !== 1 ? 's' : ''}</Badge>
                  <div className="text-xs text-gray-500">
                    {Math.round(files.reduce((sum, f) => sum + f.file.size, 0) / 1024 / 1024 * 100) / 100}MB total
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    Save {files.length} Image{files.length !== 1 ? 's' : ''}
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Processing State */}
          {currentState === 'processing' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Icon name="upload" className="h-6 w-6 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Processing Images...</h3>
              <div className="w-full max-w-xs mb-4">
                <Progress value={uploadProgress} className="w-full" />
              </div>
              <p className="text-sm text-gray-500">{uploadProgress}% complete</p>
            </div>
          )}

          {/* Complete State */}
          {currentState === 'complete' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Icon name="check" className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Complete!</h3>
              <p className="text-sm text-gray-500">Your images have been successfully uploaded.</p>
            </div>
          )}

          {/* Error State */}
          {currentState === 'error' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Icon name="alert-circle" className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Failed</h3>
              <p className="text-sm text-gray-500 mb-4">Please check your files and try again.</p>
              <Button onClick={() => setCurrentState('upload')}>
                Try Again
              </Button>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </Dialog>
    );
  }
);

MImgEdit.displayName = 'MImgEdit';