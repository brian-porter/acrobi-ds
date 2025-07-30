import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { useSheet } from '../providers/sheet-provider';
import { SecHead } from '../structures/sec-head';
import { Button } from '../primitives/button';
import { Badge } from '../primitives/badge';

const captureVariants = cva('w-full h-full flex flex-col', {
  variants: {
    mode: {
      camera: 'min-h-[500px]',
      scanner: 'min-h-[400px]',
      upload: 'min-h-[300px]',
    },
  },
  defaultVariants: {
    mode: 'camera',
  },
});

export type CaptureMode = 'camera' | 'scanner' | 'upload';
export type CaptureType = 'photo' | 'video' | 'qr' | 'barcode' | 'document';

export interface CaptureResult {
  type: CaptureType;
  data: string; // base64 data or URL
  metadata?: {
    width?: number;
    height?: number;
    size?: number;
    format?: string;
    timestamp?: string;
    location?: { lat: number; lng: number };
  };
}

export interface CaptureProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof captureVariants> {
  /**
   * Capture mode
   * @default "camera"
   */
  mode?: CaptureMode;
  /**
   * Allowed capture types
   * @default ["photo"]
   */
  allowedTypes?: CaptureType[];
  /**
   * Callback when capture is completed
   */
  onCapture?: (result: CaptureResult) => void;
  /**
   * Custom title
   */
  title?: string;
  /**
   * Whether flash is available
   * @default true
   */
  hasFlash?: boolean;
  /**
   * Whether camera switching is available
   * @default true
   */
  canSwitchCamera?: boolean;
  /**
   * Custom result slot for displaying captured content
   */
  resultSlot?: React.ReactNode;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Error message
   */
  error?: string;
}

const Capture = React.forwardRef<HTMLDivElement, CaptureProps>(
  (
    {
      className,
      mode = 'camera',
      allowedTypes = ['photo'],
      onCapture,
      title = 'Capture',
      hasFlash = true,
      canSwitchCamera = true,
      resultSlot,
      loading = false,
      error,
      ...props
    },
    ref
  ) => {
    const { closeSheet } = useSheet();

    // State
    const [isCapturing, setIsCapturing] = React.useState(false);
    const [flashEnabled, setFlashEnabled] = React.useState(false);
    const [currentCamera, setCurrentCamera] = React.useState<'front' | 'back'>(
      'back'
    );
    const [capturedResult, setCapturedResult] =
      React.useState<CaptureResult | null>(null);

    // Mock capture function (in real implementation, would use camera APIs)
    const handleCapture = React.useCallback(
      async (type: CaptureType) => {
        setIsCapturing(true);

        try {
          // Mock capture delay
          await new Promise(resolve => setTimeout(resolve, 500));

          const mockResult: CaptureResult = {
            type,
            data: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...', // Mock base64
            metadata: {
              width: 1920,
              height: 1080,
              size: 2048576,
              format: 'jpeg',
              timestamp: new Date().toISOString(),
            },
          };

          setCapturedResult(mockResult);
          onCapture?.(mockResult);
        } catch (error) {
          console.error('Capture failed:', error);
        } finally {
          setIsCapturing(false);
        }
      },
      [onCapture]
    );

    // Handle retake
    const handleRetake = React.useCallback(() => {
      setCapturedResult(null);
    }, []);

    // Handle close
    const handleClose = React.useCallback(() => {
      closeSheet();
    }, [closeSheet]);

    // Render capture controls
    const renderCaptureControls = () => (
      <div className='flex items-center justify-center gap-8 p-6'>
        {/* Flash control */}
        {hasFlash && (
          <Button
            variant='ghost'
            size='lg'
            onClick={() => setFlashEnabled(!flashEnabled)}
            className={cn(
              'rounded-full w-12 h-12 p-0',
              flashEnabled && 'bg-yellow-100 text-yellow-600'
            )}
          >
            {flashEnabled ? '⚡' : '🔦'}
          </Button>
        )}

        {/* Capture button */}
        <Button
          size='lg'
          onClick={() => handleCapture(allowedTypes[0])}
          disabled={isCapturing || loading}
          className='rounded-full w-16 h-16 p-0 bg-white border-4 border-primary hover:bg-gray-50'
        >
          {isCapturing ? (
            <div className='w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin' />
          ) : (
            <div className='w-8 h-8 bg-primary rounded-full' />
          )}
        </Button>

        {/* Camera switch */}
        {canSwitchCamera && (
          <Button
            variant='ghost'
            size='lg'
            onClick={() =>
              setCurrentCamera(currentCamera === 'front' ? 'back' : 'front')
            }
            className='rounded-full w-12 h-12 p-0'
          >
            🔄
          </Button>
        )}
      </div>
    );

    // Render camera view
    const renderCameraView = () => (
      <div className='flex-1 bg-black rounded-lg relative overflow-hidden'>
        {error ? (
          <div className='flex items-center justify-center h-full text-white'>
            <div className='text-center'>
              <span className='text-4xl mb-4 block'>📷</span>
              <p className='text-lg'>Camera Error</p>
              <p className='text-sm opacity-75'>{error}</p>
            </div>
          </div>
        ) : loading ? (
          <div className='flex items-center justify-center h-full text-white'>
            <div className='text-center'>
              <div className='w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4' />
              <p>Loading camera...</p>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center h-full text-white'>
            <div className='text-center'>
              <span className='text-6xl mb-4 block'>📷</span>
              <p className='text-lg'>Camera View</p>
              <p className='text-sm opacity-75'>Using {currentCamera} camera</p>
              {flashEnabled && (
                <Badge color='n500' text='Flash On' className='mt-2' />
              )}
            </div>
          </div>
        )}

        {/* Capture type indicators */}
        <div className='absolute top-4 left-4'>
          <div className='flex gap-2'>
            {allowedTypes.map(type => (
              <Badge
                key={type}
                color='n500'
                text={type.toUpperCase()}
                className='text-xs'
              />
            ))}
          </div>
        </div>
      </div>
    );

    // Render result view
    const renderResultView = () => (
      <div className='flex-1 space-y-4'>
        <div className='bg-muted rounded-lg p-4 text-center'>
          <span className='text-4xl mb-2 block'>📸</span>
          <p className='font-medium'>Capture Complete!</p>
          <p className='text-sm text-muted-foreground'>
            {capturedResult?.type.toUpperCase()} •{' '}
            {capturedResult?.metadata?.format?.toUpperCase()}
          </p>
        </div>

        {/* Custom result slot */}
        {resultSlot}

        {/* Metadata */}
        {capturedResult?.metadata && (
          <div className='text-xs text-muted-foreground space-y-1'>
            <p>
              Size: {capturedResult.metadata.width} ×{' '}
              {capturedResult.metadata.height}
            </p>
            <p>
              File size:{' '}
              {Math.round((capturedResult.metadata.size || 0) / 1024)} KB
            </p>
            <p>
              Captured:{' '}
              {new Date(
                capturedResult.metadata.timestamp || ''
              ).toLocaleString()}
            </p>
          </div>
        )}

        {/* Result actions */}
        <div className='flex gap-3'>
          <Button variant='outline' onClick={handleRetake} className='flex-1'>
            Retake
          </Button>
          <Button onClick={handleClose} className='flex-1'>
            Use This
          </Button>
        </div>
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(captureVariants({ mode }), className)}
        {...props}
      >
        {/* Header */}
        <SecHead
          title={title}
          titleIcon='📷'
          size='lg'
          actions={[
            {
              children: '✕',
              onClick: handleClose,
              variant: 'ghost',
            },
          ]}
        />

        {/* Content */}
        {capturedResult ? (
          renderResultView()
        ) : (
          <>
            {renderCameraView()}
            {renderCaptureControls()}
          </>
        )}
      </div>
    );
  }
);

Capture.displayName = 'Capture';

export { Capture, captureVariants };
