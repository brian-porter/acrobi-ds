import React, { useState, useCallback, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';
import { Dialog } from '../primitives/dialog';
import { Icon } from '../primitives/icon';
import { Badge } from '../primitives/badge';
import { Switch } from '../primitives/switch';
import { Progress } from '../primitives/progress';

// Module: M-Grant - Device permissions request dialog
// PRD v11 Account Interface Module for comprehensive device permission management

const grantVariants = cva(
  'bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md',
  {
    variants: {
      state: {
        request: 'border border-gray-200',
        checking: 'border border-blue-200 bg-blue-50',
        granted: 'border border-green-200 bg-green-50',
        denied: 'border border-red-200 bg-red-50',
        error: 'border border-red-200 bg-red-50',
      },
    },
    defaultVariants: {
      state: 'request',
    },
  }
);

const permissionCardVariants = cva(
  'flex items-start gap-4 p-4 rounded-lg border transition-all duration-200',
  {
    variants: {
      status: {
        pending: 'bg-gray-50 border-gray-200',
        granted: 'bg-green-50 border-green-200',
        denied: 'bg-red-50 border-red-200',
        error: 'bg-red-50 border-red-200',
        checking: 'bg-blue-50 border-blue-200',
      },
      required: {
        true: 'ring-2 ring-blue-100',
        false: '',
      },
    },
    defaultVariants: {
      status: 'pending',
      required: false,
    },
  }
);

const permissionIconVariants = cva(
  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
  {
    variants: {
      type: {
        camera: 'bg-blue-100 text-blue-600',
        microphone: 'bg-purple-100 text-purple-600',
        location: 'bg-green-100 text-green-600',
        notifications: 'bg-orange-100 text-orange-600',
        contacts: 'bg-indigo-100 text-indigo-600',
        photos: 'bg-pink-100 text-pink-600',
        storage: 'bg-gray-100 text-gray-600',
        bluetooth: 'bg-cyan-100 text-cyan-600',
        sensors: 'bg-teal-100 text-teal-600',
        calendar: 'bg-yellow-100 text-yellow-600',
      },
    },
  }
);

export type PermissionType = 
  | 'camera' 
  | 'microphone' 
  | 'location' 
  | 'notifications' 
  | 'contacts' 
  | 'photos' 
  | 'storage' 
  | 'bluetooth' 
  | 'sensors' 
  | 'calendar';

export type PermissionStatus = 'pending' | 'granted' | 'denied' | 'error' | 'checking';

export interface Permission {
  id: string;
  type: PermissionType;
  name: string;
  description: string;
  reason: string;
  required: boolean;
  status: PermissionStatus;
  icon: string;
  browserApi?: string; // Browser API name for web permissions
  details?: string;
}

export interface MGrant {
  isOpen: boolean;
  onClose: () => void;
  onGrant: (permissions: Permission[]) => Promise<{ granted: string[]; denied: string[] }>;
  permissions: Permission[];
  title?: string;
  description?: string;
  allowIndividualControl?: boolean;
  showDetails?: boolean;
  autoRequest?: boolean;
  className?: string;
}

const defaultPermissions: Permission[] = [
  {
    id: 'camera',
    type: 'camera',
    name: 'Camera',
    description: 'Take photos and record videos',
    reason: 'To capture and share moments with your friends',
    required: false,
    status: 'pending',
    icon: 'camera',
    browserApi: 'camera',
    details: 'Access to your device camera for photo capture and video recording',
  },
  {
    id: 'microphone',
    type: 'microphone',
    name: 'Microphone',
    description: 'Record audio and voice messages',
    reason: 'To send voice messages and make audio calls',
    required: false,
    status: 'pending',
    icon: 'mic',
    browserApi: 'microphone',
    details: 'Access to your device microphone for voice recording',
  },
  {
    id: 'location',
    type: 'location',
    name: 'Location',
    description: 'Access your current location',
    reason: 'To show nearby content and location-based features',
    required: false,
    status: 'pending',
    icon: 'map-pin',
    browserApi: 'geolocation',
    details: 'Access to your geographic location for personalized content',
  },
  {
    id: 'notifications',
    type: 'notifications',
    name: 'Notifications',
    description: 'Send you push notifications',
    reason: 'To keep you updated with important information',
    required: true,
    status: 'pending',
    icon: 'bell',
    browserApi: 'notifications',
    details: 'Permission to display notifications even when the app is closed',
  },
];

export interface MGrant extends VariantProps<typeof grantVariants> {
  isOpen: boolean;
  onClose: () => void;
  onGrant: (permissions: Permission[]) => Promise<{ granted: string[]; denied: string[] }>;
  permissions?: Permission[];
  title?: string;
  description?: string;
  allowIndividualControl?: boolean;
  showDetails?: boolean;
  autoRequest?: boolean;
  className?: string;
}

export const MGrant = React.forwardRef<HTMLDivElement, MGrant>(
  ({
    isOpen,
    onClose,
    onGrant,
    permissions = defaultPermissions,
    title = 'Enable Permissions',
    description = 'This app would like to access the following features on your device.',
    allowIndividualControl = true,
    showDetails = true,
    autoRequest = false,
    state,
    className,
  }, ref) => {
    const [currentState, setCurrentState] = useState<'request' | 'checking' | 'granted' | 'denied' | 'error'>('request');
    const [permissionStates, setPermissionStates] = useState<Permission[]>(permissions);
    const [progress, setProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [detailsVisible, setDetailsVisible] = useState(false);

    // Reset state when dialog opens
    useEffect(() => {
      if (isOpen) {
        setCurrentState('request');
        setPermissionStates(permissions.map(p => ({ ...p, status: 'pending' })));
        setProgress(0);
        setErrorMessage('');
        setDetailsVisible(false);
      }
    }, [isOpen, permissions]);

    // Auto-request permissions if enabled
    useEffect(() => {
      if (isOpen && autoRequest && currentState === 'request') {
        handleGrantAll();
      }
    }, [isOpen, autoRequest, currentState]);

    const requiredPermissions = permissionStates.filter(p => p.required);
    const optionalPermissions = permissionStates.filter(p => !p.required);
    const grantedCount = permissionStates.filter(p => p.status === 'granted').length;
    const deniedCount = permissionStates.filter(p => p.status === 'denied').length;
    const allRequiredGranted = requiredPermissions.every(p => p.status === 'granted');

    const updatePermissionStatus = useCallback((id: string, status: PermissionStatus) => {
      setPermissionStates(prev => 
        prev.map(p => p.id === id ? { ...p, status } : p)
      );
    }, []);

    const requestBrowserPermission = async (permission: Permission): Promise<boolean> => {
      try {
        switch (permission.browserApi) {
          case 'camera':
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            return true;
          
          case 'microphone':
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioStream.getTracks().forEach(track => track.stop());
            return true;
          
          case 'geolocation':
            return new Promise((resolve) => {
              navigator.geolocation.getCurrentPosition(
                () => resolve(true),
                () => resolve(false),
                { timeout: 5000 }
              );
            });
          
          case 'notifications':
            if ('Notification' in window) {
              const result = await Notification.requestPermission();
              return result === 'granted';
            }
            return false;
          
          default:
            return true; // Assume granted for unsupported APIs
        }
      } catch (error) {
        console.error(`Failed to request ${permission.type} permission:`, error);
        return false;
      }
    };

    const handleRequestPermission = useCallback(async (permission: Permission) => {
      updatePermissionStatus(permission.id, 'checking');
      
      try {
        const granted = await requestBrowserPermission(permission);
        updatePermissionStatus(permission.id, granted ? 'granted' : 'denied');
        return granted;
      } catch (error) {
        updatePermissionStatus(permission.id, 'error');
        return false;
      }
    }, [updatePermissionStatus]);

    const handleGrantAll = useCallback(async () => {
      setCurrentState('checking');
      setProgress(0);

      const totalPermissions = permissionStates.length;
      let processedCount = 0;

      try {
        const results: { granted: string[]; denied: string[] } = {
          granted: [],
          denied: [],
        };

        for (const permission of permissionStates) {
          updatePermissionStatus(permission.id, 'checking');
          
          const granted = await handleRequestPermission(permission);
          
          if (granted) {
            results.granted.push(permission.id);
          } else {
            results.denied.push(permission.id);
          }

          processedCount++;
          setProgress((processedCount / totalPermissions) * 100);
        }

        // Call the onGrant callback with results
        await onGrant(permissionStates);

        // Determine final state
        if (results.denied.length === 0) {
          setCurrentState('granted');
        } else if (allRequiredGranted) {
          setCurrentState('granted');
        } else {
          setCurrentState('denied');
        }

      } catch (error) {
        setCurrentState('error');
        setErrorMessage(error instanceof Error ? error.message : 'Failed to request permissions');
        console.error('Permission request failed:', error);
      }
    }, [permissionStates, handleRequestPermission, onGrant, allRequiredGranted, updatePermissionStatus]);

    const handleGrantIndividual = useCallback(async (permission: Permission) => {
      const granted = await handleRequestPermission(permission);
      
      // Update the overall state if needed
      if (granted && requiredPermissions.length > 0 && allRequiredGranted) {
        setCurrentState('granted');
      }
    }, [handleRequestPermission, requiredPermissions, allRequiredGranted]);

    const handleClose = useCallback(() => {
      onClose();
    }, [onClose]);

    const handleContinue = useCallback(() => {
      if (allRequiredGranted || requiredPermissions.length === 0) {
        handleClose();
      } else {
        setErrorMessage('Required permissions must be granted to continue.');
      }
    }, [allRequiredGranted, requiredPermissions, handleClose]);

    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <div ref={ref} className={cn(grantVariants({ state: currentState }), className)}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                currentState === 'checking' ? 'bg-blue-100' :
                currentState === 'granted' ? 'bg-green-100' :
                currentState === 'denied' || currentState === 'error' ? 'bg-red-100' :
                'bg-gray-100'
              )}>
                <Icon 
                  name={
                    currentState === 'checking' ? 'settings' :
                    currentState === 'granted' ? 'check' :
                    currentState === 'denied' || currentState === 'error' ? 'x' :
                    'shield'
                  } 
                  className={cn(
                    'h-4 w-4',
                    currentState === 'checking' ? 'text-blue-600 animate-spin' :
                    currentState === 'granted' ? 'text-green-600' :
                    currentState === 'denied' || currentState === 'error' ? 'text-red-600' :
                    'text-gray-600'
                  )} 
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                {currentState === 'request' && title}
                {currentState === 'checking' && 'Requesting Permissions...'}
                {currentState === 'granted' && 'Permissions Granted'}
                {currentState === 'denied' && 'Some Permissions Denied'}
                {currentState === 'error' && 'Permission Error'}
              </h2>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <Icon name="x" className="h-4 w-4" />
            </Button>
          </div>

          {/* Request State */}
          {currentState === 'request' && (
            <div className="p-6 space-y-6">
              <p className="text-gray-600">{description}</p>

              {/* Required Permissions */}
              {requiredPermissions.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-sm font-medium text-gray-900">Required Permissions</h3>
                    <Badge variant="destructive" size="sm">Required</Badge>
                  </div>
                  <div className="space-y-3">
                    {requiredPermissions.map(permission => (
                      <div key={permission.id} className={cn(permissionCardVariants({ 
                        status: permission.status, 
                        required: permission.required 
                      }))}>
                        <div className={cn(permissionIconVariants({ type: permission.type }))}>
                          <Icon name={permission.icon as any} className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{permission.name}</h4>
                            {allowIndividualControl && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleGrantIndividual(permission)}
                                disabled={permission.status === 'checking'}
                              >
                                {permission.status === 'checking' && <Icon name="loader" className="h-3 w-3 mr-1 animate-spin" />}
                                {permission.status === 'granted' ? 'Granted' : 
                                 permission.status === 'denied' ? 'Denied' : 
                                 'Grant'}
                              </Button>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{permission.reason}</p>
                          {showDetails && detailsVisible && permission.details && (
                            <p className="text-xs text-gray-400 mt-2 p-2 bg-gray-50 rounded">
                              {permission.details}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Permissions */}
              {optionalPermissions.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-sm font-medium text-gray-900">Optional Permissions</h3>
                    <Badge variant="secondary" size="sm">Optional</Badge>
                  </div>
                  <div className="space-y-3">
                    {optionalPermissions.map(permission => (
                      <div key={permission.id} className={cn(permissionCardVariants({ 
                        status: permission.status 
                      }))}>
                        <div className={cn(permissionIconVariants({ type: permission.type }))}>
                          <Icon name={permission.icon as any} className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{permission.name}</h4>
                            {allowIndividualControl && (
                              <Switch
                                checked={permission.status === 'granted'}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    handleGrantIndividual(permission);
                                  } else {
                                    updatePermissionStatus(permission.id, 'denied');
                                  }
                                }}
                                disabled={permission.status === 'checking'}
                              />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{permission.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {showDetails && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDetailsVisible(!detailsVisible)}
                  className="w-full text-gray-500"
                >
                  <Icon name={detailsVisible ? 'chevron-up' : 'chevron-down'} className="h-4 w-4 mr-2" />
                  {detailsVisible ? 'Hide Details' : 'Show Details'}
                </Button>
              )}

              {errorMessage && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                  {errorMessage}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={handleClose}>
                  {requiredPermissions.length > 0 ? 'Not Now' : 'Cancel'}
                </Button>
                {!allowIndividualControl && (
                  <Button onClick={handleGrantAll}>
                    Grant All Permissions
                  </Button>
                )}
                {allowIndividualControl && (
                  <Button onClick={handleContinue} disabled={!allRequiredGranted && requiredPermissions.length > 0}>
                    Continue
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Checking State */}
          {currentState === 'checking' && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Icon name="settings" className="h-6 w-6 text-blue-600 animate-spin" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Requesting Permissions...</h3>
              <div className="max-w-xs mx-auto mb-4">
                <Progress value={progress} className="w-full" />
              </div>
              <p className="text-sm text-gray-500">
                Please respond to the permission prompts from your browser
              </p>
            </div>
          )}

          {/* Granted State */}
          {currentState === 'granted' && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Icon name="check" className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">All Set!</h3>
              <p className="text-sm text-gray-500 mb-4">
                {grantedCount} of {permissionStates.length} permissions granted. 
                {deniedCount > 0 && ` ${deniedCount} permission${deniedCount !== 1 ? 's' : ''} ${deniedCount === 1 ? 'was' : 'were'} denied.`}
              </p>
              <Button onClick={handleClose}>
                Continue
              </Button>
            </div>
          )}

          {/* Denied State */}
          {currentState === 'denied' && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Icon name="x" className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Some Permissions Denied</h3>
              <p className="text-sm text-gray-500 mb-4">
                {deniedCount} permission{deniedCount !== 1 ? 's were' : ' was'} denied. 
                Some features may not work as expected.
              </p>
              <div className="flex items-center justify-center gap-3">
                <Button variant="outline" onClick={handleClose}>
                  Continue Anyway
                </Button>
                <Button onClick={() => setCurrentState('request')}>
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Error State */}
          {currentState === 'error' && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Icon name="alert-circle" className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Permission Error</h3>
              <p className="text-sm text-gray-500 mb-4">{errorMessage}</p>
              <div className="flex items-center justify-center gap-3">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={() => setCurrentState('request')}>
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

MGrant.displayName = 'MGrant';