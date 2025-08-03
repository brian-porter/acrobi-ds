import React, { useState, useCallback, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';
import { Dialog } from '../primitives/dialog';
import { Input } from '../primitives/input';
import { Textarea } from '../primitives/textarea';
import { Icon } from '../primitives/icon';
import { Badge } from '../primitives/badge';
import { Progress } from '../primitives/progress';
import { Checkbox } from '../primitives/checkbox';

// Module: M-DeleteAccount - Multi-state delete/recover account dialog
// PRD v11 Account Interface Module for safe account deletion workflow

const deleteAccountVariants = cva(
  'bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-lg',
  {
    variants: {
      state: {
        warning: 'border border-orange-200',
        confirm: 'border border-red-200',
        deleting: 'border border-red-200 bg-red-50',
        deleted: 'border border-red-200 bg-red-50',
        recovery: 'border border-blue-200 bg-blue-50',
        recovered: 'border border-green-200 bg-green-50',
        error: 'border border-red-200 bg-red-50',
      },
    },
    defaultVariants: {
      state: 'warning',
    },
  }
);

const warningBoxVariants = cva(
  'p-4 rounded-lg border',
  {
    variants: {
      severity: {
        warning: 'bg-orange-50 border-orange-200 text-orange-800',
        danger: 'bg-red-50 border-red-200 text-red-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
      },
    },
  }
);

const dataItemVariants = cva(
  'flex items-center justify-between p-3 rounded-lg border',
  {
    variants: {
      selected: {
        true: 'bg-red-50 border-red-200',
        false: 'bg-gray-50 border-gray-200',
      },
    },
  }
);

export interface AccountData {
  id: string;
  type: 'profile' | 'content' | 'connections' | 'activity' | 'preferences' | 'files';
  label: string;
  description: string;
  count?: number;
  size?: string;
  recoverable: boolean;
  selected: boolean;
}

export interface MDeleteAccountProps extends VariantProps<typeof deleteAccountVariants> {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (data: { password: string; reason?: string; dataTypes: string[]; permanent: boolean }) => Promise<void>;
  onRecover?: (recoveryCode: string) => Promise<void>;
  accountData?: AccountData[];
  gracePeriodDays?: number;
  requirePassword?: boolean;
  allowPartialDeletion?: boolean;
  allowRecovery?: boolean;
  className?: string;
}

const defaultAccountData: AccountData[] = [
  {
    id: 'profile',
    type: 'profile',
    label: 'Profile Information',
    description: 'Name, email, phone, bio, avatar',
    recoverable: true,
    selected: true,
  },
  {
    id: 'content',
    type: 'content',
    label: 'User Content',
    description: 'Posts, comments, uploads, collections',
    count: 1247,
    recoverable: false,
    selected: true,
  },
  {
    id: 'connections',
    type: 'connections',
    label: 'Social Connections',
    description: 'Friends, followers, blocked users',
    count: 156,
    recoverable: true,
    selected: true,
  },
  {
    id: 'activity',
    type: 'activity',
    label: 'Activity History',
    description: 'Login history, views, interactions',
    recoverable: false,
    selected: true,
  },
  {
    id: 'preferences',
    type: 'preferences',
    label: 'Settings & Preferences',
    description: 'Privacy settings, notifications, themes',
    recoverable: true,
    selected: false,
  },
  {
    id: 'files',
    type: 'files',
    label: 'Uploaded Files',
    description: 'Images, documents, media files',
    size: '2.4 GB',
    recoverable: false,
    selected: true,
  },
];

export const MDeleteAccount = React.forwardRef<HTMLDivElement, MDeleteAccountProps>(
  ({
    isOpen,
    onClose,
    onDelete,
    onRecover,
    accountData = defaultAccountData,
    gracePeriodDays = 30,
    requirePassword = true,
    allowPartialDeletion = true,
    allowRecovery = true,
    state,
    className,
  }, ref) => {
    const [currentState, setCurrentState] = useState<'warning' | 'confirm' | 'deleting' | 'deleted' | 'recovery' | 'recovered' | 'error'>('warning');
    const [password, setPassword] = useState('');
    const [reason, setReason] = useState('');
    const [recoveryCode, setRecoveryCode] = useState('');
    const [dataTypes, setDataTypes] = useState<AccountData[]>(accountData);
    const [permanentDeletion, setPermanentDeletion] = useState(false);
    const [progress, setProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [countdown, setCountdown] = useState(10); // Countdown before allowing deletion
    const [canProceed, setCanProceed] = useState(false);

    // Reset state when dialog opens/closes
    useEffect(() => {
      if (isOpen) {
        setCurrentState('warning');
        setPassword('');
        setReason('');
        setRecoveryCode('');
        setDataTypes(accountData);
        setPermanentDeletion(false);
        setProgress(0);
        setErrorMessage('');
        setCountdown(10);
        setCanProceed(false);
      }
    }, [isOpen, accountData]);

    // Countdown timer for safety
    useEffect(() => {
      if (currentState === 'confirm' && countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else if (countdown === 0) {
        setCanProceed(true);
      }
    }, [currentState, countdown]);

    const selectedDataTypes = dataTypes.filter(item => item.selected);
    const unrecoverableSelected = selectedDataTypes.filter(item => !item.recoverable);

    const handleDataTypeToggle = useCallback((id: string) => {
      if (!allowPartialDeletion) return;
      
      setDataTypes(prev => prev.map(item => 
        item.id === id ? { ...item, selected: !item.selected } : item
      ));
    }, [allowPartialDeletion]);

    const handleProceedToConfirm = useCallback(() => {
      if (selectedDataTypes.length === 0) {
        setErrorMessage('Please select at least one data type to delete.');
        return;
      }
      setCurrentState('confirm');
      setCountdown(10);
      setCanProceed(false);
    }, [selectedDataTypes]);

    const handleDelete = useCallback(async () => {
      if (!canProceed) return;
      if (requirePassword && !password) {
        setErrorMessage('Password is required to delete your account.');
        return;
      }

      setCurrentState('deleting');
      setProgress(0);

      try {
        // Simulate deletion progress
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 300);

        await onDelete({
          password,
          reason: reason || undefined,
          dataTypes: selectedDataTypes.map(item => item.id),
          permanent: permanentDeletion,
        });

        clearInterval(progressInterval);
        setProgress(100);
        setCurrentState('deleted');
      } catch (error) {
        setCurrentState('error');
        setErrorMessage(error instanceof Error ? error.message : 'Failed to delete account');
        console.error('Account deletion failed:', error);
      }
    }, [canProceed, requirePassword, password, onDelete, reason, selectedDataTypes, permanentDeletion]);

    const handleRecover = useCallback(async () => {
      if (!onRecover || !recoveryCode) return;

      try {
        await onRecover(recoveryCode);
        setCurrentState('recovered');
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Recovery failed');
        console.error('Account recovery failed:', error);
      }
    }, [onRecover, recoveryCode]);

    const handleClose = useCallback(() => {
      onClose();
    }, [onClose]);

    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <div ref={ref} className={cn(deleteAccountVariants({ state: currentState }), className)}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                currentState === 'warning' ? 'bg-orange-100' :
                currentState === 'recovery' ? 'bg-blue-100' :
                currentState === 'recovered' ? 'bg-green-100' :
                'bg-red-100'
              )}>
                <Icon 
                  name={
                    currentState === 'recovery' ? 'undo' :
                    currentState === 'recovered' ? 'check' :
                    currentState === 'warning' ? 'alert-triangle' :
                    'trash-2'
                  } 
                  className={cn(
                    'h-4 w-4',
                    currentState === 'warning' ? 'text-orange-600' :
                    currentState === 'recovery' ? 'text-blue-600' :
                    currentState === 'recovered' ? 'text-green-600' :
                    'text-red-600'
                  )} 
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                {currentState === 'warning' && 'Delete Account'}
                {currentState === 'confirm' && 'Confirm Deletion'}
                {currentState === 'deleting' && 'Deleting Account...'}
                {currentState === 'deleted' && 'Account Deleted'}
                {currentState === 'recovery' && 'Recover Account'}
                {currentState === 'recovered' && 'Account Recovered'}
                {currentState === 'error' && 'Deletion Failed'}
              </h2>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <Icon name="x" className="h-4 w-4" />
            </Button>
          </div>

          {/* Warning State */}
          {currentState === 'warning' && (
            <div className="p-6 space-y-6">
              <div className={cn(warningBoxVariants({ severity: 'warning' }))}>
                <div className="flex items-start gap-3">
                  <Icon name="alert-triangle" className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Before you continue</h3>
                    <p className="text-sm">
                      Deleting your account is a serious action. Some data cannot be recovered once deleted.
                      {allowRecovery && gracePeriodDays > 0 && (
                        ` You have ${gracePeriodDays} days to recover your account before permanent deletion.`
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">What will be deleted:</h3>
                <div className="space-y-2">
                  {dataTypes.map(item => (
                    <div key={item.id} className={cn(dataItemVariants({ selected: item.selected }))}>
                      <div className="flex-1">
                        {allowPartialDeletion && (
                          <Checkbox
                            checked={item.selected}
                            onChange={(checked) => handleDataTypeToggle(item.id)}
                            className="mr-3"
                          />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{item.label}</span>
                            {!item.recoverable && (
                              <Badge variant="destructive" size="sm">Permanent</Badge>
                            )}
                            {item.count && (
                              <Badge variant="secondary" size="sm">{item.count} items</Badge>
                            )}
                            {item.size && (
                              <Badge variant="secondary" size="sm">{item.size}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {unrecoverableSelected.length > 0 && (
                <div className={cn(warningBoxVariants({ severity: 'danger' }))}>
                  <div className="flex items-start gap-3">
                    <Icon name="alert-circle" className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Permanent Data Loss</h3>
                      <p className="text-sm">
                        {unrecoverableSelected.length} data type{unrecoverableSelected.length !== 1 ? 's' : ''} cannot be recovered once deleted:
                        {' '}{unrecoverableSelected.map(item => item.label).join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for leaving (optional)
                </label>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Help us improve by telling us why you're leaving..."
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleProceedToConfirm}
                  disabled={selectedDataTypes.length === 0}
                >
                  Continue to Delete
                </Button>
              </div>
            </div>
          )}

          {/* Confirm State */}
          {currentState === 'confirm' && (
            <div className="p-6 space-y-6">
              <div className={cn(warningBoxVariants({ severity: 'danger' }))}>
                <div className="flex items-start gap-3">
                  <Icon name="alert-circle" className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Final Confirmation</h3>
                    <p className="text-sm">
                      This action cannot be undone. You are about to permanently delete {selectedDataTypes.length} data type{selectedDataTypes.length !== 1 ? 's' : ''} from your account.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Summary of deletion:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {selectedDataTypes.map(item => (
                    <li key={item.id} className="flex items-center justify-between">
                      <span>• {item.label}</span>
                      {!item.recoverable && (
                        <Badge variant="destructive" size="sm">Permanent</Badge>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {requirePassword && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm with your password
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
              )}

              {allowRecovery && (
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={permanentDeletion}
                    onChange={setPermanentDeletion}
                  />
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Skip recovery period (permanent deletion)
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Account will be deleted immediately without {gracePeriodDays}-day recovery period
                    </p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                  {errorMessage}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={() => setCurrentState('warning')}>
                  Back
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleDelete}
                  disabled={!canProceed || (requirePassword && !password)}
                  className="min-w-[140px]"
                >
                  {countdown > 0 ? `Delete in ${countdown}s` : 'Delete Account'}
                </Button>
              </div>
            </div>
          )}

          {/* Deleting State */}
          {currentState === 'deleting' && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Icon name="trash-2" className="h-6 w-6 text-red-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Deleting Account...</h3>
              <div className="max-w-xs mx-auto mb-4">
                <Progress value={progress} className="w-full" />
              </div>
              <p className="text-sm text-gray-500">Processing deletion request</p>
            </div>
          )}

          {/* Deleted State */}
          {currentState === 'deleted' && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Icon name="check" className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Account Deleted</h3>
              <p className="text-sm text-gray-500 mb-4">
                Your account has been {permanentDeletion ? 'permanently deleted' : `scheduled for deletion in ${gracePeriodDays} days`}.
              </p>
              {allowRecovery && !permanentDeletion && (
                <div className="space-y-4">
                  <div className={cn(warningBoxVariants({ severity: 'info' }))}>
                    <p className="text-sm">
                      You can recover your account within {gracePeriodDays} days using the recovery code sent to your email.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setCurrentState('recovery')}>
                    Recover Account
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Recovery State */}
          {currentState === 'recovery' && allowRecovery && (
            <div className="p-6 space-y-6">
              <div className={cn(warningBoxVariants({ severity: 'info' }))}>
                <div className="flex items-start gap-3">
                  <Icon name="info" className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Account Recovery</h3>
                    <p className="text-sm">
                      Enter the recovery code sent to your email to restore your account.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recovery Code
                </label>
                <Input
                  value={recoveryCode}
                  onChange={(e) => setRecoveryCode(e.target.value)}
                  placeholder="Enter your recovery code"
                  className="font-mono"
                />
              </div>

              {errorMessage && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                  {errorMessage}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleRecover}
                  disabled={!recoveryCode}
                >
                  Recover Account
                </Button>
              </div>
            </div>
          )}

          {/* Recovered State */}
          {currentState === 'recovered' && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Icon name="check" className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Account Recovered!</h3>
              <p className="text-sm text-gray-500 mb-4">
                Your account has been successfully recovered and is now active.
              </p>
              <Button onClick={handleClose}>
                Continue
              </Button>
            </div>
          )}

          {/* Error State */}
          {currentState === 'error' && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Icon name="alert-circle" className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Operation Failed</h3>
              <p className="text-sm text-gray-500 mb-4">{errorMessage}</p>
              <div className="flex items-center justify-center gap-3">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={() => setCurrentState('warning')}>
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    );
  }
);

MDeleteAccount.displayName = 'MDeleteAccount';