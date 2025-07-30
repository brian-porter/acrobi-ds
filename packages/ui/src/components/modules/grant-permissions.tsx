import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';
import { HeroStack } from '../structures/hero-stack';
import { BtnPanel } from '../structures/btn-panel';

const grantPermissionsVariants = cva('w-full max-w-md mx-auto', {
  variants: {
    variant: {
      default: '',
      compact: 'max-w-sm',
      full: 'max-w-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type PermissionType =
  | 'camera'
  | 'microphone'
  | 'location'
  | 'contacts'
  | 'notifications'
  | 'storage';

export interface PermissionConfig {
  type: PermissionType;
  title: string;
  description: string;
  icon: string;
  required?: boolean;
}

export interface GrantPermissionsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof grantPermissionsVariants> {
  /**
   * Permission configuration
   */
  permission: PermissionConfig;
  /**
   * Current permission state
   */
  permissionState?: 'prompt' | 'granted' | 'denied';
  /**
   * Loading state
   */
  isLoading?: boolean;
  /**
   * Grant permission handler
   */
  onGrant?: () => void;
  /**
   * Skip permission handler (for optional permissions)
   */
  onSkip?: () => void;
  /**
   * Open settings handler (for denied permissions)
   */
  onOpenSettings?: () => void;
  /**
   * Continue handler (after permission granted)
   */
  onContinue?: () => void;
}

const GrantPermissions = React.forwardRef<
  HTMLDivElement,
  GrantPermissionsProps
>(
  (
    {
      className,
      variant,
      permission,
      permissionState = 'prompt',
      isLoading = false,
      onGrant,
      onSkip,
      onOpenSettings,
      onContinue,
      ...props
    },
    ref
  ) => {
    const getPermissionContent = () => {
      switch (permissionState) {
        case 'granted':
          return {
            title: 'Permission Granted',
            description: `Great! You've granted ${permission.title.toLowerCase()} access.`,
            icon: '✅',
            buttons: [
              {
                label: 'Continue',
                variant: 'default' as const,
                onClick: onContinue,
              },
            ],
          };

        case 'denied':
          return {
            title: 'Permission Denied',
            description: `To use this feature, please enable ${permission.title.toLowerCase()} access in your device settings.`,
            icon: '🚫',
            buttons: [
              {
                label: 'Open Settings',
                variant: 'default' as const,
                onClick: onOpenSettings,
              },
              ...(permission.required
                ? []
                : [
                    {
                      label: 'Skip for Now',
                      variant: 'outline' as const,
                      onClick: onSkip,
                    },
                  ]),
            ],
          };

        default: // 'prompt'
          return {
            title: permission.title,
            description: permission.description,
            icon: permission.icon,
            buttons: [
              {
                label: isLoading ? 'Requesting...' : 'Allow',
                variant: 'default' as const,
                onClick: onGrant,
                disabled: isLoading,
              },
              ...(permission.required
                ? []
                : [
                    {
                      label: 'Not Now',
                      variant: 'outline' as const,
                      onClick: onSkip,
                      disabled: isLoading,
                    },
                  ]),
            ],
          };
      }
    };

    const content = getPermissionContent();

    return (
      <div
        ref={ref}
        className={cn(grantPermissionsVariants({ variant }), className)}
        {...props}
      >
        <HeroStack
          icon={content.icon}
          title={content.title}
          description={content.description}
          variant='centered'
        />

        <div className='mt-8'>
          <BtnPanel
            buttons={content.buttons}
            orientation='vertical'
            variant='full'
          />
        </div>
      </div>
    );
  }
);

GrantPermissions.displayName = 'GrantPermissions';

export {
  GrantPermissions,
  grantPermissionsVariants,
  type PermissionType,
  type PermissionConfig,
};
