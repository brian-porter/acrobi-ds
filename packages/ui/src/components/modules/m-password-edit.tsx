import React, { useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';
import { Dialog } from '../primitives/dialog';
import { Input } from '../primitives/input';
import { Icon } from '../primitives/icon';
import { Badge } from '../primitives/badge';
import { Progress } from '../primitives/progress';

// Module: M-PasswordEdit - Change password dialog
// PRD v11 Account Interface Module for secure password management

const passwordEditVariants = cva(
  'bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md',
  {
    variants: {
      state: {
        form: 'border border-gray-200',
        validating: 'border border-blue-200 bg-blue-50',
        success: 'border border-green-200 bg-green-50',
        error: 'border border-red-200 bg-red-50',
      },
    },
    defaultVariants: {
      state: 'form',
    },
  }
);

const strengthBarVariants = cva(
  'h-2 rounded-full transition-all duration-300',
  {
    variants: {
      strength: {
        0: 'bg-gray-200',
        1: 'bg-red-400',
        2: 'bg-orange-400',
        3: 'bg-yellow-400',
        4: 'bg-green-400',
        5: 'bg-green-600',
      },
    },
  }
);

const requirementVariants = cva(
  'flex items-center gap-2 text-sm',
  {
    variants: {
      status: {
        pending: 'text-gray-500',
        valid: 'text-green-600',
        invalid: 'text-red-500',
      },
    },
  }
);

interface PasswordRequirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
  status: 'pending' | 'valid' | 'invalid';
}

export interface MPasswordEditProps extends VariantProps<typeof passwordEditVariants> {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { currentPassword: string; newPassword: string }) => Promise<void>;
  requireCurrentPassword?: boolean;
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSymbols?: boolean;
  checkCommonPasswords?: boolean;
  className?: string;
}

export const MPasswordEdit = React.forwardRef<HTMLDivElement, MPasswordEditProps>(
  ({
    isOpen,
    onClose,
    onSave,
    requireCurrentPassword = true,
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSymbols = true,
    checkCommonPasswords = true,
    state,
    className,
  }, ref) => {
    const [currentState, setCurrentState] = useState<'form' | 'validating' | 'success' | 'error'>('form');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [progress, setProgress] = useState(0);

    // Password requirements configuration
    const requirements: PasswordRequirement[] = [
      {
        id: 'length',
        label: `At least ${minLength} characters`,
        test: (pwd) => pwd.length >= minLength,
        status: 'pending',
      },
      ...(requireUppercase ? [{
        id: 'uppercase',
        label: 'At least one uppercase letter',
        test: (pwd: string) => /[A-Z]/.test(pwd),
        status: 'pending' as const,
      }] : []),
      ...(requireLowercase ? [{
        id: 'lowercase',
        label: 'At least one lowercase letter',
        test: (pwd: string) => /[a-z]/.test(pwd),
        status: 'pending' as const,
      }] : []),
      ...(requireNumbers ? [{
        id: 'numbers',
        label: 'At least one number',
        test: (pwd: string) => /\d/.test(pwd),
        status: 'pending' as const,
      }] : []),
      ...(requireSymbols ? [{
        id: 'symbols',
        label: 'At least one special character',
        test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        status: 'pending' as const,
      }] : []),
    ];

    // Update requirement statuses based on password
    const updatedRequirements = requirements.map(req => ({
      ...req,
      status: newPassword === '' ? 'pending' : (req.test(newPassword) ? 'valid' : 'invalid') as const,
    }));

    // Calculate password strength (0-5)
    const calculateStrength = useCallback((password: string): number => {
      if (password === '') return 0;
      
      let score = 0;
      
      // Length bonus
      if (password.length >= minLength) score += 1;
      if (password.length >= 12) score += 1;
      
      // Character variety
      if (/[a-z]/.test(password)) score += 0.5;
      if (/[A-Z]/.test(password)) score += 0.5;
      if (/\d/.test(password)) score += 0.5;
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 0.5;
      
      // Additional patterns
      if (password.length >= 16) score += 0.5;
      if (/(.)\1{2,}/.test(password)) score -= 1; // Repeated characters penalty
      
      return Math.min(5, Math.max(0, Math.round(score)));
    }, [minLength]);

    const passwordStrength = calculateStrength(newPassword);
    const strengthLabels = ['', 'Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['gray', 'red', 'orange', 'yellow', 'green', 'green'];

    // Validation checks
    const isCurrentPasswordValid = !requireCurrentPassword || currentPassword.length > 0;
    const isNewPasswordValid = updatedRequirements.every(req => req.status === 'valid');
    const isConfirmPasswordValid = newPassword === confirmPassword && confirmPassword.length > 0;
    const isFormValid = isCurrentPasswordValid && isNewPasswordValid && isConfirmPasswordValid;

    const handleSave = useCallback(async () => {
      if (!isFormValid) return;

      setCurrentState('validating');
      setProgress(0);

      try {
        // Simulate validation progress
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 15;
          });
        }, 200);

        await onSave({
          currentPassword,
          newPassword,
        });

        clearInterval(progressInterval);
        setProgress(100);
        setCurrentState('success');

        // Auto-close after success
        setTimeout(() => {
          onClose();
          handleReset();
        }, 2000);
      } catch (error) {
        setCurrentState('error');
        setErrorMessage(error instanceof Error ? error.message : 'Failed to update password');
        console.error('Password update failed:', error);
      }
    }, [isFormValid, onSave, currentPassword, newPassword, onClose]);

    const handleReset = useCallback(() => {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      setCurrentState('form');
      setErrorMessage('');
      setProgress(0);
    }, []);

    const handleClose = useCallback(() => {
      onClose();
      handleReset();
    }, [onClose, handleReset]);

    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <div ref={ref} className={cn(passwordEditVariants({ state: currentState }), className)}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {currentState === 'form' && 'Change Password'}
              {currentState === 'validating' && 'Updating Password...'}
              {currentState === 'success' && 'Password Updated'}
              {currentState === 'error' && 'Update Failed'}
            </h2>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <Icon name="x" className="h-4 w-4" />
            </Button>
          </div>

          {/* Form State */}
          {currentState === 'form' && (
            <div className="p-6 space-y-6">
              {/* Current Password */}
              {requireCurrentPassword && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter your current password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Icon name={showCurrentPassword ? 'eye-off' : 'eye'} className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon name={showNewPassword ? 'eye-off' : 'eye'} className="h-4 w-4" />
                  </button>
                </div>

                {/* Password Strength */}
                {newPassword && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Password Strength</span>
                      <Badge 
                        variant={passwordStrength >= 4 ? 'default' : passwordStrength >= 2 ? 'secondary' : 'destructive'}
                      >
                        {strengthLabels[passwordStrength]}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(level => (
                        <div
                          key={level}
                          className={cn(
                            'flex-1 h-2 rounded-full',
                            level <= passwordStrength
                              ? strengthBarVariants({ strength: passwordStrength as any })
                              : 'bg-gray-200'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} className="h-4 w-4" />
                  </button>
                </div>
                {confirmPassword && !isConfirmPasswordValid && (
                  <p className="mt-2 text-sm text-red-600">Passwords do not match</p>
                )}
              </div>

              {/* Password Requirements */}
              {updatedRequirements.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Password Requirements</h4>
                  <div className="space-y-2">
                    {updatedRequirements.map(requirement => (
                      <div key={requirement.id} className={cn(requirementVariants({ status: requirement.status }))}>
                        <Icon 
                          name={
                            requirement.status === 'valid' ? 'check' : 
                            requirement.status === 'invalid' ? 'x' : 'minus'
                          } 
                          className="h-4 w-4 flex-shrink-0" 
                        />
                        <span>{requirement.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave} 
                  disabled={!isFormValid}
                  className="min-w-[120px]"
                >
                  Update Password
                </Button>
              </div>
            </div>
          )}

          {/* Validating State */}
          {currentState === 'validating' && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Icon name="lock" className="h-6 w-6 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Updating Password...</h3>
              <div className="max-w-xs mx-auto mb-4">
                <Progress value={progress} className="w-full" />
              </div>
              <p className="text-sm text-gray-500">Securing your new credentials</p>
            </div>
          )}

          {/* Success State */}
          {currentState === 'success' && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Icon name="check" className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Password Updated!</h3>
              <p className="text-sm text-gray-500">Your password has been successfully changed.</p>
            </div>
          )}

          {/* Error State */}
          {currentState === 'error' && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Icon name="alert-circle" className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Update Failed</h3>
              <p className="text-sm text-gray-500 mb-4">{errorMessage}</p>
              <div className="flex items-center justify-center gap-3">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={() => setCurrentState('form')}>
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

MPasswordEdit.displayName = 'MPasswordEdit';