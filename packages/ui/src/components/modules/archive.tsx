import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { useSheet } from '../providers/sheet-provider';
import { SecHead } from '../structures/sec-head';
import { TextField } from '../structures/text-field';
import { Button } from '../primitives/button';
import { Badge } from '../primitives/badge';
import { Alert } from '../primitives/alert';

const archiveVariants = cva('w-full space-y-6', {
  variants: {
    size: {
      sm: 'max-w-sm',
      default: 'max-w-md',
      lg: 'max-w-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface ArchivableObject {
  id: string;
  name: string;
  type: string;
  icon?: string;
  preview?: {
    image?: string;
    avatar?: string;
    description?: string;
    itemCount?: number;
    size?: string;
    lastActivity?: string;
  };
  sensitive?: boolean;
}

export interface ArchiveProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof archiveVariants> {
  /**
   * Object being archived
   */
  object: ArchivableObject;
  /**
   * Whether password confirmation is required
   * Automatically enabled for sensitive objects
   */
  requirePassword?: boolean;
  /**
   * Custom warning message
   */
  warningMessage?: string;
  /**
   * Callback when archiving is confirmed
   */
  onArchive?: (confirmation?: {
    password?: string;
    confirmed: boolean;
  }) => void;
  /**
   * Custom title
   */
  title?: string;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Show archive benefits information
   * @default true
   */
  showArchiveInfo?: boolean;
  /**
   * Archive location/folder name
   */
  archiveLocation?: string;
}

const Archive = React.forwardRef<HTMLDivElement, ArchiveProps>(
  (
    {
      className,
      object,
      requirePassword,
      warningMessage,
      onArchive,
      title,
      loading = false,
      showArchiveInfo = true,
      archiveLocation = 'Archive',
      size,
      ...props
    },
    ref
  ) => {
    const { closeSheet } = useSheet();

    // State
    const [password, setPassword] = React.useState('');
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    // Determine if password is required
    const needsPassword = requirePassword || object.sensitive;

    // Default messages
    const defaultTitle = title || `Archive ${object.type}`;
    const defaultWarningMessage =
      warningMessage ||
      `This ${object.type.toLowerCase()} will be moved to your ${archiveLocation} where it will be safely stored but hidden from your main workspace.`;

    // Validation
    const isValidPassword = !needsPassword || password.length > 0;
    const canArchive = isValidPassword && !isProcessing && !loading;

    // Handle archive
    const handleArchive = React.useCallback(async () => {
      if (!canArchive) return;

      setIsProcessing(true);

      try {
        const confirmation = {
          password: needsPassword ? password : undefined,
          confirmed: true,
        };

        await onArchive?.(confirmation);
        closeSheet();
      } catch (error) {
        console.error('Failed to archive object:', error);
      } finally {
        setIsProcessing(false);
      }
    }, [canArchive, needsPassword, password, onArchive, closeSheet]);

    // Handle cancel
    const handleCancel = React.useCallback(() => {
      closeSheet();
    }, [closeSheet]);

    return (
      <div
        ref={ref}
        className={cn(archiveVariants({ size }), className)}
        {...props}
      >
        {/* Header */}
        <div className='space-y-3'>
          <div className='flex items-center gap-3'>
            <SecHead title={defaultTitle} titleIcon='📦' size='lg' />
            {object.sensitive && <Badge color='fw500' text='Sensitive' />}
          </div>
        </div>

        {/* Object preview */}
        <div className='p-4 bg-muted/30 rounded-lg border border-orange-200'>
          <div className='flex items-center gap-3'>
            {object.preview?.image ? (
              <img
                src={object.preview.image}
                alt={object.name}
                className='w-12 h-12 object-cover rounded'
              />
            ) : object.preview?.avatar ? (
              <img
                src={object.preview.avatar}
                alt={object.name}
                className='w-12 h-12 object-cover rounded-full'
              />
            ) : object.icon ? (
              <span className='text-3xl' aria-hidden='true'>
                {object.icon}
              </span>
            ) : (
              <div className='w-12 h-12 bg-muted rounded flex items-center justify-center'>
                <span className='text-lg'>📄</span>
              </div>
            )}

            <div className='flex-1 min-w-0'>
              <h4 className='font-semibold text-lg truncate'>{object.name}</h4>
              <div className='text-sm text-muted-foreground space-y-1'>
                <p className='capitalize'>{object.type}</p>
                {object.preview?.description && (
                  <p>{object.preview.description}</p>
                )}
                {object.preview?.itemCount && (
                  <p>{object.preview.itemCount} items</p>
                )}
                {object.preview?.size && <p>{object.preview.size}</p>}
                {object.preview?.lastActivity && (
                  <p>Last activity: {object.preview.lastActivity}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Warning message */}
        <Alert variant='warning'>
          <span className='text-lg'>📦</span>
          <div>
            <h4 className='font-semibold mb-1'>Archive {object.type}</h4>
            <p className='text-sm'>{defaultWarningMessage}</p>
          </div>
        </Alert>

        {/* Archive information */}
        {showArchiveInfo && (
          <div className='text-sm text-muted-foreground bg-blue-50 border border-blue-200 rounded-lg p-3'>
            <div className='flex items-start gap-2'>
              <span className='text-blue-600'>ℹ️</span>
              <div className='space-y-2'>
                <p className='font-medium text-blue-900'>
                  What happens when you archive?
                </p>
                <ul className='text-blue-700 space-y-1 text-xs'>
                  <li>• Moved to your {archiveLocation} folder</li>
                  <li>• Hidden from main workspace and searches</li>
                  <li>• Can be restored anytime</li>
                  <li>• All data and settings preserved</li>
                  <li>• Shared access maintained for collaborators</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Password confirmation for sensitive objects */}
        {needsPassword && (
          <div className='space-y-4'>
            <TextField
              type={showPassword ? 'text' : 'password'}
              label='Enter your password to confirm'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Your password'
              variant={isValidPassword ? 'success' : 'warning'}
              helperText='Required for sensitive content'
              rightAction={
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => setShowPassword(!showPassword)}
                  className='text-xs'
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              }
            />
          </div>
        )}

        {/* Archive preview */}
        <div className='p-3 bg-orange-50 border border-orange-200 rounded-lg'>
          <div className='flex items-center gap-3'>
            <span className='text-2xl'>📁</span>
            <div>
              <p className='font-medium text-orange-900'>{archiveLocation}</p>
              <p className='text-sm text-orange-700'>
                "{object.name}" will be moved here
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='flex gap-3 pt-4'>
          <Button
            variant='outline'
            onClick={handleCancel}
            disabled={isProcessing || loading}
            className='flex-1'
          >
            Cancel
          </Button>
          <Button
            variant='secondary'
            onClick={handleArchive}
            disabled={!canArchive}
            className='flex-1 bg-orange-600 hover:bg-orange-700 text-white'
          >
            {isProcessing || loading ? 'Archiving...' : 'Archive'}
          </Button>
        </div>
      </div>
    );
  }
);

Archive.displayName = 'Archive';

export { Archive, archiveVariants };
