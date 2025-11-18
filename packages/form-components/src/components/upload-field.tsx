import * as React from 'react';
import { cva, type VariantProps, cn, Text } from '@acrobi/primitives';

const uploadFieldVariants = cva('space-y-2', {
  variants: {
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const uploadZoneVariants = cva(
  'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors',
  {
    variants: {
      variant: {
        default: 'border-border bg-background hover:bg-accent/50',
        primary: 'border-primary/50 bg-primary/5 hover:bg-primary/10',
        success:
          'border-green-500/50 bg-green-50 hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-900',
        error: 'border-destructive/50 bg-destructive/5 hover:bg-destructive/10',
      },
      size: {
        sm: 'p-4 min-h-[80px]',
        default: 'p-6 min-h-[120px]',
        lg: 'p-8 min-h-[160px]',
      },
      state: {
        idle: '',
        dragOver: 'border-primary bg-primary/10 scale-[1.02]',
        uploading: 'border-blue-500/50 bg-blue-50 dark:bg-blue-950',
        success: 'border-green-500 bg-green-50 dark:bg-green-950',
        error: 'border-destructive bg-destructive/10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'idle',
    },
  }
);

export interface UploadedFile {
  file: File;
  id: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
  url?: string;
  preview?: string;
}

export interface UploadFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof uploadFieldVariants> {
  /**
   * Field label
   */
  label?: React.ReactNode;
  /**
   * Help text or description
   */
  description?: React.ReactNode;
  /**
   * Error message
   */
  error?: React.ReactNode;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Whether the field is disabled
   */
  disabled?: boolean;
  /**
   * Accepted file types (MIME types or extensions)
   */
  accept?: string;
  /**
   * Whether to allow multiple files
   */
  multiple?: boolean;
  /**
   * Maximum file size in bytes
   */
  maxSize?: number;
  /**
   * Maximum number of files (when multiple is true)
   */
  maxFiles?: number;
  /**
   * Upload zone variant
   */
  variant?: 'default' | 'primary' | 'success' | 'error';
  /**
   * Upload zone size
   */
  zoneSize?: 'sm' | 'default' | 'lg';
  /**
   * Custom upload zone content
   */
  children?: React.ReactNode;
  /**
   * Uploaded files
   */
  files?: UploadedFile[];
  /**
   * File upload handler
   */
  onFilesChange?: (files: UploadedFile[]) => void;
  /**
   * Custom file upload function
   */
  onUpload?: (files: File[]) => Promise<void>;
  /**
   * File removal handler
   */
  onRemove?: (fileId: string) => void;
  /**
   * Whether to show file previews for images
   */
  showPreviews?: boolean;
  /**
   * Whether to show upload progress
   */
  showProgress?: boolean;
  /**
   * Custom drag and drop text
   */
  dragText?: string;
  /**
   * Custom browse button text
   */
  browseText?: string;
  /**
   * Custom file type hint
   */
  typeHint?: string;
  /**
   * Additional styling for label
   */
  labelClassName?: string;
  /**
   * Additional styling for description
   */
  descriptionClassName?: string;
  /**
   * Additional styling for error
   */
  errorClassName?: string;
}

const UploadField = React.forwardRef<HTMLDivElement, UploadFieldProps>(
  (
    {
      className,
      size,
      label,
      description,
      error,
      required = false,
      disabled = false,
      accept,
      multiple = false,
      maxSize,
      maxFiles,
      variant = 'default',
      zoneSize,
      children,
      files = [],
      onFilesChange,
      onUpload,
      onRemove,
      showPreviews = true,
      showProgress = true,
      dragText = 'Drag and drop files here',
      browseText = 'Browse files',
      typeHint,
      labelClassName,
      descriptionClassName,
      errorClassName,
      ...props
    },
    ref
  ) => {
    const [dragState, setDragState] = React.useState<'idle' | 'dragOver'>(
      'idle'
    );
    const [uploadState, setUploadState] = React.useState<
      'idle' | 'uploading' | 'success' | 'error'
    >('idle');
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const dropZoneRef = React.useRef<HTMLDivElement>(null);

    // Generate unique ID for the field
    const fieldId = React.useId();

    // Handle file validation
    const validateFiles = (
      fileList: File[]
    ): { valid: File[]; errors: string[] } => {
      const valid: File[] = [];
      const errors: string[] = [];

      for (const file of fileList) {
        // Check file size
        if (maxSize && file.size > maxSize) {
          errors.push(
            `${file.name} is too large (max ${formatFileSize(maxSize)})`
          );
          continue;
        }

        // Check file type
        if (accept) {
          const acceptedTypes = accept.split(',').map(type => type.trim());
          const isAccepted = acceptedTypes.some(type => {
            if (type.startsWith('.')) {
              return file.name.toLowerCase().endsWith(type.toLowerCase());
            }
            return file.type.includes(type.replace('*', ''));
          });

          if (!isAccepted) {
            errors.push(`${file.name} is not an accepted file type`);
            continue;
          }
        }

        valid.push(file);
      }

      // Check total file count
      if (maxFiles && files.length + valid.length > maxFiles) {
        const excess = files.length + valid.length - maxFiles;
        errors.push(`Too many files. Maximum ${maxFiles} files allowed.`);
        valid.splice(valid.length - excess);
      }

      return { valid, errors };
    };

    // Handle file selection
    const handleFiles = async (fileList: File[]) => {
      if (disabled) return;

      const { valid, errors } = validateFiles(fileList);

      if (errors.length > 0) {
        console.warn('File validation errors:', errors);
        setUploadState('error');
        return;
      }

      // Create uploaded file objects
      const newUploadedFiles: UploadedFile[] = valid.map(file => ({
        file,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        status: 'pending',
        progress: 0,
        preview:
          showPreviews && file.type.startsWith('image/')
            ? URL.createObjectURL(file)
            : undefined,
      }));

      // Update files list
      const updatedFiles = multiple
        ? [...files, ...newUploadedFiles]
        : newUploadedFiles;
      onFilesChange?.(updatedFiles);

      // Handle upload
      if (onUpload) {
        setUploadState('uploading');

        // Update file status to uploading
        const uploadingFiles = updatedFiles.map(f =>
          newUploadedFiles.find(nf => nf.id === f.id)
            ? { ...f, status: 'uploading' as const }
            : f
        );
        onFilesChange?.(uploadingFiles);

        try {
          await onUpload(valid);

          // Update file status to success
          const successFiles = updatedFiles.map(f =>
            newUploadedFiles.find(nf => nf.id === f.id)
              ? { ...f, status: 'success' as const, progress: 100 }
              : f
          );
          onFilesChange?.(successFiles);
          setUploadState('success');

          // Reset to idle after a delay
          setTimeout(() => setUploadState('idle'), 2000);
        } catch (uploadError) {
          // Update file status to error
          const errorFiles = updatedFiles.map(f =>
            newUploadedFiles.find(nf => nf.id === f.id)
              ? { ...f, status: 'error' as const, error: 'Upload failed' }
              : f
          );
          onFilesChange?.(errorFiles);
          setUploadState('error');
        }
      } else {
        // Mark as success if no upload handler
        const successFiles = updatedFiles.map(f =>
          newUploadedFiles.find(nf => nf.id === f.id)
            ? { ...f, status: 'success' as const }
            : f
        );
        onFilesChange?.(successFiles);
      }
    };

    // Drag and drop handlers
    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setDragState('dragOver');
      }
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Only reset drag state if leaving the drop zone entirely
      if (
        dropZoneRef.current &&
        !dropZoneRef.current.contains(e.relatedTarget as Node)
      ) {
        setDragState('idle');
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragState('idle');

      if (disabled) return;

      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFiles(droppedFiles);
    };

    // File input change handler
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      handleFiles(selectedFiles);

      // Reset input value so same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    // Remove file handler
    const handleRemove = (fileId: string) => {
      if (disabled) return;

      const updatedFiles = files.filter(f => f.id !== fileId);
      onFilesChange?.(updatedFiles);
      onRemove?.(fileId);
    };

    // Format file size helper
    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Determine current state for styling
    const currentState = uploadState !== 'idle' ? uploadState : dragState;
    const hasError = error || uploadState === 'error';

    return (
      <div
        className={cn(uploadFieldVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        {/* Label */}
        {label && (
          <label
            htmlFor={fieldId}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              required &&
                'after:content-["*"] after:ml-0.5 after:text-destructive',
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        {/* Description */}
        {description && (
          <Text variant='muted' size={size} className={descriptionClassName}>
            {description}
          </Text>
        )}

        {/* Upload Zone */}
        <div
          ref={dropZoneRef}
          className={cn(
            uploadZoneVariants({
              variant: hasError ? 'error' : variant,
              size: zoneSize || size,
              state: currentState,
            }),
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          tabIndex={disabled ? -1 : 0}
          role='button'
          aria-label='Upload files'
          onKeyDown={e => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <input
            ref={fileInputRef}
            id={fieldId}
            type='file'
            accept={accept}
            multiple={multiple}
            onChange={handleInputChange}
            disabled={disabled}
            className='sr-only'
          />

          {children || (
            <>
              {/* Upload Icon */}
              <div
                className={cn(
                  'mb-3 rounded-full p-3',
                  currentState === 'dragOver' && 'bg-primary/20',
                  currentState === 'uploading' &&
                    'bg-blue-100 dark:bg-blue-900',
                  currentState === 'success' &&
                    'bg-green-100 dark:bg-green-900',
                  currentState === 'error' && 'bg-destructive/20'
                )}
              >
                {currentState === 'uploading' ? (
                  <div className='h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent' />
                ) : currentState === 'success' ? (
                  <svg
                    className='h-6 w-6 text-green-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                ) : currentState === 'error' ? (
                  <svg
                    className='h-6 w-6 text-destructive'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                ) : (
                  <svg
                    className='h-6 w-6 text-muted-foreground'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                    />
                  </svg>
                )}
              </div>

              {/* Upload Text */}
              <div className='text-center space-y-1'>
                <p className='font-medium text-foreground'>{dragText}</p>
                <p className='text-muted-foreground'>
                  or{' '}
                  <span className='text-primary underline cursor-pointer'>
                    {browseText}
                  </span>
                </p>
                {typeHint && (
                  <p className='text-xs text-muted-foreground'>{typeHint}</p>
                )}
                {maxSize && (
                  <p className='text-xs text-muted-foreground'>
                    Max file size: {formatFileSize(maxSize)}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className='space-y-2'>
            {files.map(uploadedFile => (
              <div
                key={uploadedFile.id}
                className='flex items-center gap-3 p-3 bg-muted/50 rounded-lg'
              >
                {/* File Preview/Icon */}
                <div className='flex-shrink-0'>
                  {uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview}
                      alt='Preview'
                      className='h-10 w-10 rounded object-cover'
                    />
                  ) : (
                    <div className='h-10 w-10 rounded bg-muted flex items-center justify-center'>
                      <svg
                        className='h-5 w-5 text-muted-foreground'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-foreground truncate'>
                    {uploadedFile.file.name}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {formatFileSize(uploadedFile.file.size)}
                  </p>

                  {/* Progress Bar */}
                  {showProgress && uploadedFile.status === 'uploading' && (
                    <div className='mt-1'>
                      <div className='w-full bg-muted rounded-full h-1.5'>
                        <div
                          className='bg-primary h-1.5 rounded-full transition-all duration-300'
                          style={{ width: `${uploadedFile.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {uploadedFile.status === 'error' && uploadedFile.error && (
                    <p className='text-xs text-destructive mt-1'>
                      {uploadedFile.error}
                    </p>
                  )}
                </div>

                {/* Status Icon */}
                <div className='flex-shrink-0'>
                  {uploadedFile.status === 'uploading' && (
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent' />
                  )}
                  {uploadedFile.status === 'success' && (
                    <svg
                      className='h-4 w-4 text-green-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  )}
                  {uploadedFile.status === 'error' && (
                    <svg
                      className='h-4 w-4 text-destructive'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  )}
                </div>

                {/* Remove Button */}
                {!disabled && (
                  <button
                    type='button'
                    onClick={() => handleRemove(uploadedFile.id)}
                    className='flex-shrink-0 p-1 text-muted-foreground hover:text-destructive transition-colors'
                    aria-label={`Remove ${uploadedFile.file.name}`}
                  >
                    <svg
                      className='h-4 w-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <Text variant='destructive' size={size} className={errorClassName}>
            {error}
          </Text>
        )}
      </div>
    );
  }
);

UploadField.displayName = 'UploadField';

export { UploadField, uploadFieldVariants };
