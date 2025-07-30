import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { useSheet } from '../providers/sheet-provider';
import { SecHead } from '../structures/sec-head';
import { TextField } from '../structures/text-field';
import { Button } from '../primitives/button';
import { Badge } from '../primitives/badge';
import { Alert } from '../primitives/alert';

const deleteVariants = cva('w-full space-y-6', {
  variants: {
    securityLevel: {
      simple: 'max-w-md',
      base: 'max-w-md',
      critical: 'max-w-lg',
    },
  },
  defaultVariants: {
    securityLevel: 'base',
  },
});

export type SecurityLevel = 'simple' | 'base' | 'critical';

export interface DeletableObject {
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
  };
  recoverable?: boolean;
  recoveryPeriod?: string; // e.g., "30 days"
}

export interface DeleteProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof deleteVariants> {
  /**
   * Object being deleted
   */
  object: DeletableObject;
  /**
   * Security level for deletion
   * @default "base"
   */
  securityLevel?: SecurityLevel;
  /**
   * Whether password confirmation is required
   * Automatically enabled for critical deletions
   */
  requirePassword?: boolean;
  /**
   * Custom warning message title
   */
  warningTitle?: string;
  /**
   * Custom warning message body
   */
  warningMessage?: string;
  /**
   * Custom confirmation text for base/critical deletions
   */
  confirmationText?: string;
  /**
   * Callback when deletion is confirmed
   */
  onDelete?: (confirmation?: { password?: string; confirmed: boolean }) => void;
  /**
   * Custom title
   */
  title?: string;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Show recovery information
   * @default true
   */
  showRecoveryInfo?: boolean;
}

const Delete = React.forwardRef<HTMLDivElement, DeleteProps>(
  (
    {
      className,
      object,
      securityLevel = 'base',
      requirePassword,
      warningTitle,
      warningMessage,
      confirmationText,
      onDelete,
      title,
      loading = false,
      showRecoveryInfo = true,
      ...props
    },
    ref
  ) => {
    const { closeSheet } = useSheet();

    // State
    const [password, setPassword] = React.useState('');
    const [confirmationInput, setConfirmationInput] = React.useState('');
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    // Determine if password is required
    const needsPassword = requirePassword || securityLevel === 'critical';
    const needsConfirmation =
      securityLevel === 'base' || securityLevel === 'critical';

    // Default messages based on security level
    const defaultTitle = title || `Delete ${object.type}`;
    const defaultWarningTitle =
      warningTitle ||
      `Are you sure? You're about to delete this ${object.type.toLowerCase()}`;

    const defaultWarningMessage =
      warningMessage ||
      (securityLevel === 'critical'
        ? `This action is permanent and cannot be reversed. All data, settings, and access will be lost forever.`
        : object.recoverable
          ? `This action can be reversed within ${object.recoveryPeriod || '30 days'}.`
          : `This cannot be reversed. Continue and you'll remove this ${object.type.toLowerCase()} and its contents forever.`);

    const expectedConfirmation = confirmationText || object.name;

    // Validation
    const isValidConfirmation =
      !needsConfirmation ||
      confirmationInput.trim().toLowerCase() ===
        expectedConfirmation.toLowerCase();
    const isValidPassword = !needsPassword || password.length > 0;
    const canDelete =
      isValidConfirmation && isValidPassword && !isProcessing && !loading;

    // Handle delete
    const handleDelete = React.useCallback(async () => {
      if (!canDelete) return;

      setIsProcessing(true);

      try {
        const confirmation = {
          password: needsPassword ? password : undefined,
          confirmed: true,
        };

        await onDelete?.(confirmation);
        closeSheet();
      } catch (error) {
        console.error('Failed to delete object:', error);
      } finally {
        setIsProcessing(false);
      }
    }, [canDelete, needsPassword, password, onDelete, closeSheet]);

    // Handle cancel
    const handleCancel = React.useCallback(() => {
      closeSheet();
    }, [closeSheet]);

    // Get security badge
    const getSecurityBadge = () => {
      switch (securityLevel) {
        case 'simple':
          return <Badge color='n500' text='Simple' />;
        case 'base':
          return <Badge color='fw500' text='Base Security' />;
        case 'critical':
          return <Badge color='fd500' text='Critical Security' />;
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(deleteVariants({ securityLevel }), className)}
        {...props}
      >
        {/* Header */}
        <div className='space-y-3'>
          <div className='flex items-center gap-3'>
            <SecHead title={defaultTitle} titleIcon='🗑️' size='lg' />
            {getSecurityBadge()}
          </div>
        </div>

        {/* Object preview */}
        <div className='p-4 bg-muted/30 rounded-lg border border-destructive/20'>
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
              </div>
            </div>
          </div>
        </div>

        {/* Warning message */}
        <Alert variant='destructive'>
          <span className='text-lg'>⚠️</span>
          <div>
            <h4 className='font-semibold mb-1'>{defaultWarningTitle}</h4>
            <p className='text-sm'>{defaultWarningMessage}</p>
          </div>
        </Alert>

        {/* Recovery information */}
        {showRecoveryInfo &&
          object.recoverable &&
          securityLevel !== 'critical' && (
            <div className='text-sm text-muted-foreground bg-blue-50 border border-blue-200 rounded-lg p-3'>
              <div className='flex items-start gap-2'>
                <span className='text-blue-600'>ℹ️</span>
                <div>
                  <p className='font-medium text-blue-900'>
                    Recovery Available
                  </p>
                  <p className='text-blue-700'>
                    This {object.type.toLowerCase()} can be recovered within{' '}
                    {object.recoveryPeriod || '30 days'}
                    if deleted by mistake.
                  </p>
                </div>
              </div>
            </div>
          )}

        {/* Confirmation fields */}
        <div className='space-y-4'>
          {/* Base/Critical confirmation */}
          {needsConfirmation && (
            <TextField
              label={`Type "${expectedConfirmation}" to confirm`}
              value={confirmationInput}
              onChange={e => setConfirmationInput(e.target.value)}
              placeholder={expectedConfirmation}
              variant={isValidConfirmation ? 'success' : 'destructive'}
              helperText={
                confirmationInput.length > 0 && !isValidConfirmation
                  ? 'Confirmation text does not match'
                  : undefined
              }
            />
          )}

          {/* Critical password confirmation */}
          {needsPassword && (
            <TextField
              type={showPassword ? 'text' : 'password'}
              label='Enter your password to confirm'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Your password'
              variant={isValidPassword ? 'success' : 'destructive'}
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
          )}
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
            variant='destructive'
            onClick={handleDelete}
            disabled={!canDelete}
            className='flex-1'
          >
            {isProcessing || loading
              ? 'Deleting...'
              : securityLevel === 'critical'
                ? 'Delete Forever'
                : 'Delete'}
          </Button>
        </div>
      </div>
    );
  }
);

Delete.displayName = 'Delete';

export { Delete, deleteVariants };
