import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Button } from './button';
import { Label } from './label';
import { Icon } from './icon';

/**
 * UploadCtrl variant styles using authentic Acrobi classes
 * This matches the devlink UploadCtrl component structure for file uploads
 */
const uploadCtrlVariants = cva(
  // Base authentic Acrobi upload wrapper class
  'upload_wrap',
  {
    variants: {
      variant: {
        default: '',
        compact: '',
        expanded: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Upload main container styling
const uploadMainVariants = cva('upload_main', {
  variants: {
    layout: {
      vertical: '',
      horizontal: '',
    },
  },
  defaultVariants: {
    layout: 'vertical',
  },
});

// Upload options panel styling
const uploadOptVariants = cva('upload_opt', {
  variants: {
    orientation: {
      horizontal: '',
      vertical: '',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

// File drop zone styling
const fileDropVariants = cva(
  'filedrop_wrap cursor-pointer border-2 border-dashed transition-colors',
  {
    variants: {
      dragState: {
        idle: 'border-input hover:border-primary',
        dragOver: 'border-primary bg-primary/5',
        error: 'border-destructive',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      dragState: 'idle',
      size: 'md',
    },
  }
);

// Upload file item interface
export interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  preview?: string;
  uploadProgress?: number;
  error?: string;
}

export interface UploadCtrlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof uploadCtrlVariants> {
  // Drop zone props (matching devlink API)
  /**
   * Enable drop zone icon display
   */
  upldDzIcn?: boolean;
  /**
   * Enable drop zone avatar display
   */
  upldDzAvtr?: boolean;
  /**
   * Enable drop zone image display
   */
  upldDzImg?: boolean;
  /**
   * Drop zone icon source
   */
  upldDzIcnSrc?: string;
  /**
   * Drop zone icon size
   */
  upldDzIcnSz?: 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl';
  /**
   * Drop zone image source
   */
  upldDzImgSrc?: string;
  /**
   * Drop zone image alt text
   */
  upldDzImgAlt?: string;
  /**
   * Drop zone avatar source
   */
  upldDzAvtrSrc?: string;
  /**
   * Drop zone avatar alt text
   */
  upldDzAvtrAlt?: string;
  /**
   * Drop zone text source
   */
  upldDzTxtSrc?: string;
  /**
   * Drop zone change handler
   */
  upldDzChange?: (files: FileList | null) => void;
  /**
   * Drop zone click handler
   */
  upldDzClick?: React.MouseEventHandler<HTMLDivElement>;

  // File display props
  /**
   * File map for uploaded files display
   */
  upldFileMap?: React.ReactNode;
  /**
   * Show example file
   */
  upldExampleFile?: boolean;
  /**
   * Uploaded file image source
   */
  upldFileImgSrc?: string;
  /**
   * Uploaded file image alt text
   */
  upldFileImgAlt?: string;
  /**
   * Show file caption
   */
  upldFileCapt?: boolean;
  /**
   * Uploaded file title source
   */
  upldFileTitleSrc?: string;
  /**
   * Uploaded file click handler
   */
  upldFileClick?: React.MouseEventHandler<HTMLDivElement>;

  // Upload options props
  /**
   * Show upload options panel
   */
  upldOpt?: boolean;
  /**
   * Enable camera option
   */
  optOptCamera?: boolean;
  /**
   * Enable library option
   */
  optOptLib?: boolean;
  /**
   * Enable Unsplash option
   */
  optOptUnsplash?: boolean;
  /**
   * Enable URL option
   */
  optOptUrl?: boolean;
  /**
   * Camera option click handler
   */
  optOptCameraClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Library option click handler
   */
  optOptLibClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Unsplash option click handler
   */
  optOptUnsplashClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * URL option click handler
   */
  optOptUrlClick?: React.MouseEventHandler<HTMLButtonElement>;

  // URL modal props
  /**
   * Show URL modal
   */
  optUrlModal?: boolean;
  /**
   * URL field change handler
   */
  optUrlFldChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * URL field click handler
   */
  optUrlFldClick?: React.MouseEventHandler<HTMLInputElement>;
  /**
   * URL get click handler
   */
  optUrlGetClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * URL close click handler
   */
  optUrlCloseClick?: React.MouseEventHandler<HTMLButtonElement>;

  // Additional props
  /**
   * Show file bar
   */
  fileBar?: boolean;
  /**
   * Accepted file types
   */
  accept?: string;
  /**
   * Allow multiple file selection
   */
  multiple?: boolean;
  /**
   * Maximum file size in bytes
   */
  maxSize?: number;
  /**
   * Maximum number of files
   */
  maxFiles?: number;
  /**
   * Uploaded files list
   */
  files?: UploadFile[];
  /**
   * File upload handler
   */
  onFilesChange?: (files: UploadFile[]) => void;
  /**
   * File remove handler
   */
  onFileRemove?: (fileId: string) => void;
  /**
   * Upload progress handler
   */
  onUploadProgress?: (fileId: string, progress: number) => void;
  /**
   * Error handler
   */
  onError?: (error: string) => void;
}

/**
 * FileDrop component for drag and drop functionality
 */
const FileDrop: React.FC<{
  onDrop: (files: FileList | null) => void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  accept?: string;
  multiple?: boolean;
  iconSrc?: string;
  iconSize?: string;
  textSrc?: string;
  showIcon?: boolean;
  showImage?: boolean;
  showAvatar?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  className?: string;
}> = ({
  onDrop,
  onClick,
  accept,
  multiple = false,
  iconSrc = 'upload',
  iconSize = '2xl',
  textSrc = 'Tap to add or drop a file here',
  showIcon = true,
  showImage = false,
  showAvatar = false,
  imageSrc,
  imageAlt,
  avatarSrc,
  avatarAlt,
  className,
}) => {
  const [dragState, setDragState] = React.useState<
    'idle' | 'dragOver' | 'error'
  >('idle');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragState('dragOver');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragState('idle');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragState('idle');
    onDrop(e.dataTransfer.files);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    fileInputRef.current?.click();
    onClick?.(e);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDrop(e.target.files);
  };

  return (
    <div
      className={cn(fileDropVariants({ dragState }), className)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type='file'
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        className='sr-only'
      />

      <div className='filedrop_main flex flex-col items-center justify-center text-center space-y-4'>
        {showAvatar && avatarSrc && (
          <div className='filedrop_avtr'>
            <img
              src={avatarSrc}
              alt={avatarAlt}
              className='w-16 h-16 rounded-full object-cover'
            />
          </div>
        )}

        {showImage && imageSrc && (
          <div className='filedrop_img'>
            <img
              src={imageSrc}
              alt={imageAlt}
              className='w-24 h-24 object-cover'
            />
          </div>
        )}

        {showIcon && (
          <div className='filedrop_icn'>
            <Icon
              name={iconSrc}
              size={iconSize as any}
              className='text-muted-foreground'
            />
          </div>
        )}

        <div className='filedrop_txt'>
          <Label text={textSrc} size='r3' color='n700' showIcon={false} />
        </div>
      </div>
    </div>
  );
};

/**
 * FilePreview component for displaying uploaded files
 */
const FilePreview: React.FC<{
  file: UploadFile;
  onRemove?: (fileId: string) => void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  showCaption?: boolean;
  imagePreview?: boolean;
}> = ({
  file,
  onRemove,
  onClick,
  showCaption = false,
  imagePreview = true,
}) => {
  const isImage = file.type.startsWith('image/');

  return (
    <div
      className='file-preview-item border rounded-lg p-3 space-y-2'
      onClick={onClick}
    >
      {imagePreview && isImage && file.preview && (
        <div className='file-preview-img'>
          <img
            src={file.preview}
            alt={file.name}
            className='w-full h-32 object-cover rounded'
          />
        </div>
      )}

      <div className='file-preview-info space-y-1'>
        <div className='flex items-center justify-between'>
          <Label text={file.name} size='r3' color='n999' showIcon={false} />
          {onRemove && (
            <Button
              variant='ghost'
              size='sm'
              onClick={e => {
                e.stopPropagation();
                onRemove(file.id);
              }}
              className='h-6 w-6 p-0'
            >
              <Icon name='close' size='xs' />
            </Button>
          )}
        </div>

        {showCaption && (
          <Label
            text={`${(file.size / 1024).toFixed(1)} KB`}
            size='r3'
            color='n500'
            showIcon={false}
          />
        )}

        {file.uploadProgress !== undefined && file.uploadProgress < 100 && (
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div
              className='bg-primary h-2 rounded-full transition-all duration-300'
              style={{ width: `${file.uploadProgress}%` }}
            />
          </div>
        )}

        {file.error && (
          <Label text={file.error} size='r3' color='fd500' showIcon={false} />
        )}
      </div>
    </div>
  );
};

/**
 * UploadCtrl component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink UploadCtrl component.
 *
 * Key features:
 * - Uses .upload_wrap and .upload_main classes for authentic styling
 * - Integrates FileDrop component with drag-and-drop functionality
 * - Supports multiple upload options (Camera, Library, Unsplash, URL)
 * - Displays uploaded files with preview and progress
 * - URL modal for URL-based uploads
 * - Comprehensive file management with progress and error states
 *
 * @example
 * ```tsx
 * // Basic usage
 * <UploadCtrl
 *   upldDzIcn={true}
 *   upldDzIcnSrc="upload"
 *   upldDzTxtSrc="Drop files here or click to upload"
 *   upldOpt={true}
 *   optOptCamera={true}
 *   optOptLib={true}
 *   onFilesChange={(files) => console.log('Files:', files)}
 * />
 *
 * // With URL modal
 * <UploadCtrl
 *   optUrlModal={true}
 *   optUrlFldChange={(e) => console.log('URL:', e.target.value)}
 *   optUrlGetClick={() => console.log('Get URL')}
 * />
 * ```
 */
const UploadCtrl = React.forwardRef<HTMLDivElement, UploadCtrlProps>(
  (
    {
      className,
      // Drop zone props
      upldDzIcn = true,
      upldDzAvtr = false,
      upldDzImg = false,
      upldDzIcnSrc = 'upload',
      upldDzIcnSz = '2xl',
      upldDzImgSrc,
      upldDzImgAlt,
      upldDzAvtrSrc,
      upldDzAvtrAlt,
      upldDzTxtSrc = 'Tap to add or drop a file here',
      upldDzChange,
      upldDzClick,
      // File display props
      upldFileMap,
      upldExampleFile = true,
      upldFileImgSrc,
      upldFileImgAlt,
      upldFileCapt = false,
      upldFileTitleSrc = 'DocName',
      upldFileClick,
      // Upload options props
      upldOpt = false,
      optOptCamera = true,
      optOptLib = true,
      optOptUnsplash = false,
      optOptUrl = false,
      optOptCameraClick,
      optOptLibClick,
      optOptUnsplashClick,
      optOptUrlClick,
      // URL modal props
      optUrlModal = false,
      optUrlFldChange,
      optUrlFldClick,
      optUrlGetClick,
      optUrlCloseClick,
      // Additional props
      fileBar = false,
      accept,
      multiple = false,
      maxSize,
      maxFiles,
      files = [],
      onFilesChange,
      onFileRemove,
      onUploadProgress,
      onError,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const [urlValue, setUrlValue] = React.useState('');
    const [internalFiles, setInternalFiles] =
      React.useState<UploadFile[]>(files);

    // Update internal files when files prop changes
    React.useEffect(() => {
      setInternalFiles(files);
    }, [files]);

    const handleFileDrop = (fileList: FileList | null) => {
      if (!fileList) return;

      const newFiles: UploadFile[] = Array.from(fileList).map(
        (file, index) => ({
          id: `file-${Date.now()}-${index}`,
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith('image/')
            ? URL.createObjectURL(file)
            : undefined,
          uploadProgress: 0,
        })
      );

      // Validate file size
      if (maxSize) {
        const oversizedFiles = newFiles.filter(file => file.size > maxSize);
        if (oversizedFiles.length > 0) {
          onError?.(
            `Files exceed maximum size of ${(maxSize / 1024 / 1024).toFixed(1)}MB`
          );
          return;
        }
      }

      // Validate file count
      if (maxFiles && internalFiles.length + newFiles.length > maxFiles) {
        onError?.(`Cannot upload more than ${maxFiles} files`);
        return;
      }

      const updatedFiles = [...internalFiles, ...newFiles];
      setInternalFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
      upldDzChange?.(fileList);
    };

    const handleFileRemove = (fileId: string) => {
      const updatedFiles = internalFiles.filter(file => file.id !== fileId);
      setInternalFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
      onFileRemove?.(fileId);
    };

    const handleUrlSubmit = () => {
      if (urlValue.trim()) {
        const urlFile: UploadFile = {
          id: `url-${Date.now()}`,
          name: urlValue.split('/').pop() || 'URL File',
          size: 0,
          type: 'url',
          url: urlValue,
        };

        const updatedFiles = [...internalFiles, urlFile];
        setInternalFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
        setUrlValue('');
      }
      optUrlGetClick?.({} as any);
    };

    return (
      <div
        ref={ref}
        className={cn(uploadCtrlVariants({ variant }), className)}
        {...props}
      >
        <div className={cn(uploadMainVariants())}>
          {/* File Drop Zone */}
          <FileDrop
            onDrop={handleFileDrop}
            onClick={upldDzClick}
            accept={accept}
            multiple={multiple}
            iconSrc={upldDzIcnSrc}
            iconSize={upldDzIcnSz}
            textSrc={upldDzTxtSrc}
            showIcon={upldDzIcn}
            showImage={upldDzImg}
            showAvatar={upldDzAvtr}
            imageSrc={upldDzImgSrc}
            imageAlt={upldDzImgAlt}
            avatarSrc={upldDzAvtrSrc}
            avatarAlt={upldDzAvtrAlt}
          />

          {/* File Display */}
          {(upldFileMap || internalFiles.length > 0 || upldExampleFile) && (
            <div className='uploaded-files mt-4 space-y-2'>
              {upldFileMap || (
                <>
                  {upldExampleFile && internalFiles.length === 0 && (
                    <FilePreview
                      file={{
                        id: 'example',
                        name: upldFileTitleSrc,
                        size: 0,
                        type: 'image',
                        preview: upldFileImgSrc,
                      }}
                      onClick={upldFileClick}
                      showCaption={upldFileCapt}
                    />
                  )}

                  {internalFiles.map(file => (
                    <FilePreview
                      key={file.id}
                      file={file}
                      onRemove={handleFileRemove}
                      onClick={upldFileClick}
                      showCaption={upldFileCapt}
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Upload Options */}
        {upldOpt && (
          <div className={cn(uploadOptVariants())} data-btnpan-ori='h'>
            {optOptCamera && (
              <Button
                variant='outline'
                size='md'
                onClick={optOptCameraClick}
                className='upload-opt-btn'
              >
                <Icon name='photo' size='sm' className='mr-2' />
                Camera
              </Button>
            )}

            {optOptLib && (
              <Button
                variant='outline'
                size='md'
                onClick={optOptLibClick}
                className='upload-opt-btn'
              >
                <Icon name='gallery' size='sm' className='mr-2' />
                Library
              </Button>
            )}

            {optOptUnsplash && (
              <Button
                variant='outline'
                size='md'
                onClick={optOptUnsplashClick}
                className='upload-opt-btn'
              >
                <Icon name='image' size='sm' className='mr-2' />
                Unsplash
              </Button>
            )}

            {optOptUrl && (
              <Button
                variant='outline'
                size='md'
                onClick={optOptUrlClick}
                className='upload-opt-btn'
              >
                <Icon name='link' size='sm' className='mr-2' />
                URL
              </Button>
            )}
          </div>
        )}

        {/* URL Modal */}
        {optUrlModal && (
          <div className='upld_opt-url fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div
              className='upld_url-modal bg-background border rounded-lg p-6 max-w-md w-full mx-4'
              data-bs='s'
            >
              {/* Close Button */}
              <div className='upld_url-close flex justify-end mb-4'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={optUrlCloseClick}
                  className='h-8 w-8 p-0'
                >
                  <Icon name='close' size='xs' />
                </Button>
              </div>

              {/* URL Input Field */}
              <div className='space-y-4'>
                <div>
                  <Label
                    text='URL Link'
                    size='r3'
                    color='n999'
                    showIcon={false}
                  />
                  <div className='mt-2 relative'>
                    <Icon
                      name='link'
                      size='sm'
                      className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'
                    />
                    <input
                      type='url'
                      placeholder='https://'
                      value={urlValue}
                      onChange={e => {
                        setUrlValue(e.target.value);
                        optUrlFldChange?.(e);
                      }}
                      onClick={optUrlFldClick}
                      className='w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                      name='url'
                    />
                  </div>
                  <div className='mt-1'>
                    <Label
                      text='Link to the file'
                      size='r3'
                      color='n500'
                      showIcon={false}
                    />
                  </div>
                </div>

                {/* Get Button */}
                <div className='upld_url-btn-shift flex justify-end'>
                  <Button variant='default' size='md' onClick={handleUrlSubmit}>
                    Get It
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

UploadCtrl.displayName = 'UploadCtrl';

export {
  UploadCtrl,
  uploadCtrlVariants,
  uploadMainVariants,
  uploadOptVariants,
  fileDropVariants,
};
