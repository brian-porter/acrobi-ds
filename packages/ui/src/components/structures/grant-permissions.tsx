import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';
import { Text } from '../primitives/text';
import { Headline } from '../primitives/headline';

const grantPermissionsVariants = cva(
  'rounded-lg border border-border bg-card p-6 shadow-sm',
  {
    variants: {
      size: {
        sm: 'p-4 space-y-3',
        default: 'p-6 space-y-4',
        lg: 'p-8 space-y-6',
      },
      variant: {
        default: 'bg-card',
        primary: 'bg-primary/5 border-primary/20',
        warning:
          'bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800',
        info: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
      },
      layout: {
        default: 'text-center',
        horizontal: 'text-left',
        minimal: 'border-none shadow-none bg-transparent p-0',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      layout: 'default',
    },
  }
);

export type PermissionStatus =
  | 'prompt'
  | 'granted'
  | 'denied'
  | 'unsupported'
  | 'checking';

export interface Permission {
  key: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
  required?: boolean;
  status?: PermissionStatus;
  reason?: string;
}

export interface GrantPermissionsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof grantPermissionsVariants> {
  /**
   * Title of the permissions request
   */
  title?: React.ReactNode;
  /**
   * Description or explanation
   */
  description?: React.ReactNode;
  /**
   * List of permissions to request
   */
  permissions: Permission[];
  /**
   * Permission status change handler
   */
  onPermissionChange?: (permission: string, status: PermissionStatus) => void;
  /**
   * Grant all permissions handler
   */
  onGrantAll?: () => void;
  /**
   * Individual permission grant handler
   */
  onGrantPermission?: (permission: string) => void;
  /**
   * Skip/cancel handler
   */
  onSkip?: () => void;
  /**
   * Settings redirect handler
   */
  onOpenSettings?: () => void;
  /**
   * Whether to show individual permission controls
   */
  showIndividualControls?: boolean;
  /**
   * Whether to show skip option
   */
  showSkip?: boolean;
  /**
   * Whether to show settings link for denied permissions
   */
  showSettings?: boolean;
  /**
   * Custom button text
   */
  buttonText?: {
    grantAll?: string;
    grant?: string;
    skip?: string;
    settings?: string;
    granted?: string;
    denied?: string;
    checking?: string;
  };
  /**
   * Whether the component is in loading state
   */
  loading?: boolean;
  /**
   * Custom icon for the main title
   */
  icon?: React.ReactNode;
  /**
   * Whether to hide granted permissions
   */
  hideGranted?: boolean;
  /**
   * Whether to group permissions by status
   */
  groupByStatus?: boolean;
}

// Default permission icons
const defaultPermissionIcons = {
  notifications: (
    <svg
      className='h-5 w-5'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M15 17h5l-5 5v-5zM4.828 4.828A4 4 0 015.5 4H9v1H5.5a3 3 0 00-2.121.879l-.707.707A3 3 0 002 8.5V12a3 3 0 003 3h3.5v1H5a4 4 0 01-4-4V8.5a4 4 0 011.172-2.828z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
      />
    </svg>
  ),
  camera: (
    <svg
      className='h-5 w-5'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
      />
    </svg>
  ),
  microphone: (
    <svg
      className='h-5 w-5'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
      />
    </svg>
  ),
  location: (
    <svg
      className='h-5 w-5'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
      />
    </svg>
  ),
  storage: (
    <svg
      className='h-5 w-5'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4'
      />
    </svg>
  ),
  default: (
    <svg
      className='h-5 w-5'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
      />
    </svg>
  ),
};

const GrantPermissions = React.forwardRef<
  HTMLDivElement,
  GrantPermissionsProps
>(
  (
    {
      className,
      size,
      variant,
      layout,
      title = 'Permissions Required',
      description,
      permissions,
      onPermissionChange,
      onGrantAll,
      onGrantPermission,
      onSkip,
      onOpenSettings,
      showIndividualControls = true,
      showSkip = true,
      showSettings = true,
      buttonText = {
        grantAll: 'Grant All Permissions',
        grant: 'Grant',
        skip: 'Skip',
        settings: 'Open Settings',
        granted: 'Granted',
        denied: 'Denied',
        checking: 'Checking...',
      },
      loading = false,
      icon,
      hideGranted = false,
      groupByStatus = false,
      ...props
    },
    ref
  ) => {
    // Get permission icon
    const getPermissionIcon = (permission: Permission) => {
      if (permission.icon) return permission.icon;

      const iconKey = permission.key.toLowerCase();
      return (
        defaultPermissionIcons[
          iconKey as keyof typeof defaultPermissionIcons
        ] || defaultPermissionIcons.default
      );
    };

    // Get status color and icon
    const getStatusDisplay = (status: PermissionStatus) => {
      switch (status) {
        case 'granted':
          return {
            color: 'text-green-600',
            icon: (
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
                  d='M5 13l4 4L19 7'
                />
              </svg>
            ),
            text: buttonText.granted,
          };
        case 'denied':
          return {
            color: 'text-destructive',
            icon: (
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
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ),
            text: buttonText.denied,
          };
        case 'checking':
          return {
            color: 'text-muted-foreground',
            icon: (
              <div className='h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent' />
            ),
            text: buttonText.checking,
          };
        case 'unsupported':
          return {
            color: 'text-muted-foreground',
            icon: (
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
                  d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728'
                />
              </svg>
            ),
            text: 'Not supported',
          };
        default:
          return {
            color: 'text-muted-foreground',
            icon: null,
            text: 'Not requested',
          };
      }
    };

    // Group permissions by status if needed
    const processedPermissions = React.useMemo(() => {
      let filtered = hideGranted
        ? permissions.filter(p => p.status !== 'granted')
        : permissions;

      if (!groupByStatus) return filtered;

      const grouped = filtered.reduce(
        (acc, permission) => {
          const status = permission.status || 'prompt';
          if (!acc[status]) acc[status] = [];
          acc[status].push(permission);
          return acc;
        },
        {} as Record<PermissionStatus, Permission[]>
      );

      return grouped;
    }, [permissions, hideGranted, groupByStatus]);

    // Check if all permissions are granted
    const allGranted = permissions.every(p => p.status === 'granted');
    const hasRequired = permissions.some(p => p.required);
    const requiredGranted = permissions
      .filter(p => p.required)
      .every(p => p.status === 'granted');
    const hasDenied = permissions.some(p => p.status === 'denied');

    // Render permission item
    const renderPermission = (permission: Permission) => {
      const statusDisplay = getStatusDisplay(permission.status || 'prompt');
      const isHorizontal = layout === 'horizontal';

      return (
        <div
          key={permission.key}
          className={cn(
            'flex gap-3 p-3 rounded-lg border border-border/50',
            isHorizontal ? 'items-center' : 'items-start',
            permission.status === 'granted' &&
              'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
            permission.status === 'denied' &&
              'bg-destructive/5 border-destructive/20'
          )}
        >
          {/* Permission Icon */}
          <div
            className={cn(
              'flex-shrink-0 p-2 rounded-full',
              permission.status === 'granted' &&
                'bg-green-100 text-green-600 dark:bg-green-900',
              permission.status === 'denied' &&
                'bg-destructive/10 text-destructive',
              (!permission.status || permission.status === 'prompt') &&
                'bg-muted text-muted-foreground'
            )}
          >
            {getPermissionIcon(permission)}
          </div>

          {/* Permission Info */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-start justify-between gap-2'>
              <div className='min-w-0'>
                <h4 className='font-medium text-foreground flex items-center gap-2'>
                  {permission.name}
                  {permission.required && (
                    <span className='text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded'>
                      Required
                    </span>
                  )}
                </h4>
                <p className='text-sm text-muted-foreground mt-1'>
                  {permission.description}
                </p>
                {permission.reason && (
                  <p className='text-xs text-muted-foreground mt-1 italic'>
                    {permission.reason}
                  </p>
                )}
              </div>

              {/* Status/Actions */}
              <div className='flex-shrink-0'>
                {permission.status === 'granted' ||
                permission.status === 'denied' ||
                permission.status === 'checking' ||
                permission.status === 'unsupported' ? (
                  <div
                    className={cn(
                      'flex items-center gap-1 text-xs font-medium',
                      statusDisplay.color
                    )}
                  >
                    {statusDisplay.icon}
                    <span>{statusDisplay.text}</span>
                  </div>
                ) : showIndividualControls ? (
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => onGrantPermission?.(permission.key)}
                    disabled={loading}
                  >
                    {buttonText.grant}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      );
    };

    // Render permission groups
    const renderPermissions = () => {
      if (
        groupByStatus &&
        typeof processedPermissions === 'object' &&
        !Array.isArray(processedPermissions)
      ) {
        const statusOrder: PermissionStatus[] = [
          'checking',
          'prompt',
          'denied',
          'granted',
          'unsupported',
        ];

        return statusOrder.map(status => {
          const statusPermissions = processedPermissions[status];
          if (!statusPermissions || statusPermissions.length === 0) return null;

          const statusDisplay = getStatusDisplay(status);

          return (
            <div key={status} className='space-y-3'>
              <h3
                className={cn(
                  'text-sm font-medium flex items-center gap-2',
                  statusDisplay.color
                )}
              >
                {statusDisplay.icon}
                {status.charAt(0).toUpperCase() + status.slice(1)} Permissions
                <span className='text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full'>
                  {statusPermissions.length}
                </span>
              </h3>
              <div className='space-y-2'>
                {statusPermissions.map(renderPermission)}
              </div>
            </div>
          );
        });
      }

      return (
        <div className='space-y-2'>
          {(processedPermissions as Permission[]).map(renderPermission)}
        </div>
      );
    };

    return (
      <div
        className={cn(
          grantPermissionsVariants({ size, variant, layout }),
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Header */}
        <div
          className={cn(
            'space-y-2',
            layout === 'default' && 'text-center',
            layout === 'minimal' && 'space-y-3'
          )}
        >
          {icon && layout !== 'minimal' && (
            <div
              className={cn(
                'mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary',
                layout === 'horizontal' && 'mx-0'
              )}
            >
              {icon}
            </div>
          )}

          <Headline
            level='h3'
            align={layout === 'default' ? 'center' : 'left'}
            className={cn(
              size === 'sm' && 'text-base',
              size === 'lg' && 'text-xl'
            )}
          >
            {title}
          </Headline>

          {description && (
            <Text
              variant='muted'
              size={size}
              align={layout === 'default' ? 'center' : 'left'}
            >
              {description}
            </Text>
          )}
        </div>

        {/* Permissions List */}
        {permissions.length > 0 && (
          <div className='space-y-4'>{renderPermissions()}</div>
        )}

        {/* Actions */}
        <div
          className={cn(
            'flex gap-3',
            layout === 'default' && 'justify-center',
            layout === 'horizontal' && 'justify-start',
            layout === 'minimal' && 'justify-start'
          )}
        >
          {/* Grant All Button */}
          {!allGranted && onGrantAll && (
            <Button
              onClick={onGrantAll}
              disabled={loading || (hasRequired && !requiredGranted)}
              size={size === 'lg' ? 'lg' : 'default'}
            >
              {loading && (
                <div className='h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent' />
              )}
              {buttonText.grantAll}
            </Button>
          )}

          {/* Settings Button for denied permissions */}
          {hasDenied && showSettings && onOpenSettings && (
            <Button
              variant='outline'
              onClick={onOpenSettings}
              size={size === 'lg' ? 'lg' : 'default'}
            >
              <svg
                className='h-4 w-4 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
              {buttonText.settings}
            </Button>
          )}

          {/* Skip Button */}
          {showSkip && onSkip && !allGranted && (
            <Button
              variant='ghost'
              onClick={onSkip}
              size={size === 'lg' ? 'lg' : 'default'}
            >
              {buttonText.skip}
            </Button>
          )}
        </div>

        {/* Success State */}
        {allGranted && (
          <div className='flex items-center justify-center gap-2 p-3 bg-green-50 text-green-600 rounded-lg dark:bg-green-950'>
            <svg
              className='h-5 w-5'
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
            <span className='font-medium'>All permissions granted!</span>
          </div>
        )}
      </div>
    );
  }
);

GrantPermissions.displayName = 'GrantPermissions';

export { GrantPermissions, grantPermissionsVariants };
