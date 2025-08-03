import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';
import { Badge } from '../primitives/badge';
import { Icon } from '../primitives/icon';
import { SwitchField } from './switch-field';

/**
 * S-PermissionsList variant styles using Acrobi Design System classes
 * Structure for displaying device permissions list
 */
const sPermissionsListVariants = cva(
  'permissions-list space-y-0',
  {
    variants: {
      variant: {
        default: '',
        card: 'bg-card border border-border rounded-lg p-4',
        bordered: 'border border-border rounded-lg',
        minimal: 'space-y-1',
      },
      size: {
        sm: 'text-sm',
        default: '',
        lg: 'text-base',
      },
      layout: {
        list: 'space-y-2',
        grid: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
        compact: 'space-y-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      layout: 'list',
    },
  }
);

const sPermissionItemVariants = cva(
  'permission-item flex items-start justify-between p-4 border border-border rounded-lg transition-colors',
  {
    variants: {
      status: {
        granted: 'bg-green-50/50 border-green-200',
        denied: 'bg-red-50/50 border-red-200',
        prompt: 'bg-yellow-50/50 border-yellow-200',
        unknown: 'bg-gray-50/50 border-gray-200',
      },
      risk: {
        low: '',
        medium: 'border-yellow-300',
        high: 'border-red-300',
        critical: 'border-red-500 bg-red-50',
      },
      interactive: {
        true: 'hover:bg-accent/50 cursor-pointer',
        false: '',
      },
      size: {
        sm: 'p-3',
        default: 'p-4',
        lg: 'p-5',
      },
    },
    defaultVariants: {
      status: 'unknown',
      risk: 'low',
      interactive: false,
      size: 'default',
    },
  }
);

const sPermissionIconVariants = cva(
  'permission-icon flex items-center justify-center rounded-full',
  {
    variants: {
      size: {
        sm: 'w-8 h-8 text-sm',
        default: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
      },
      type: {
        camera: 'bg-blue-100 text-blue-600',
        microphone: 'bg-red-100 text-red-600',
        location: 'bg-green-100 text-green-600',
        notifications: 'bg-purple-100 text-purple-600',
        storage: 'bg-orange-100 text-orange-600',
        contacts: 'bg-indigo-100 text-indigo-600',
        calendar: 'bg-pink-100 text-pink-600',
        photos: 'bg-teal-100 text-teal-600',
        bluetooth: 'bg-cyan-100 text-cyan-600',
        usb: 'bg-gray-100 text-gray-600',
        screen: 'bg-yellow-100 text-yellow-600',
        clipboard: 'bg-emerald-100 text-emerald-600',
        sensors: 'bg-violet-100 text-violet-600',
        default: 'bg-gray-100 text-gray-600',
      },
    },
    defaultVariants: {
      size: 'default',
      type: 'default',
    },
  }
);

export type PermissionStatus = 'granted' | 'denied' | 'prompt' | 'unknown';
export type PermissionRisk = 'low' | 'medium' | 'high' | 'critical';
export type PermissionType = 'camera' | 'microphone' | 'location' | 'notifications' | 'storage' | 'contacts' | 'calendar' | 'photos' | 'bluetooth' | 'usb' | 'screen' | 'clipboard' | 'sensors' | 'default';

export interface DevicePermission {
  /**
   * Permission identifier
   */
  id: string;
  /**
   * Permission name
   */
  name: string;
  /**
   * Permission display name
   */
  displayName: string;
  /**
   * Permission description
   */
  description: string;
  /**
   * Permission type for icon/styling
   */
  type: PermissionType;
  /**
   * Current permission status
   */
  status: PermissionStatus;
  /**
   * Permission risk level
   */
  risk: PermissionRisk;
  /**
   * Custom permission icon
   */
  icon?: string;
  /**
   * Whether permission is required for app functionality
   */
  required?: boolean;
  /**
   * Whether permission is toggleable
   */
  toggleable?: boolean;
  /**
   * Whether permission is currently loading/changing
   */
  loading?: boolean;
  /**
   * Last granted/denied timestamp
   */
  lastChanged?: Date;
  /**
   * Permission purpose/justification
   */
  purpose?: string;
  /**
   * App/service that requested the permission
   */
  requestedBy?: string;
  /**
   * Additional usage details
   */
  usage?: {
    frequency?: 'always' | 'frequent' | 'occasional' | 'rare';
    lastUsed?: Date;
    usageCount?: number;
  };
  /**
   * Additional metadata
   */
  metadata?: Record<string, any>;
}

export interface PermissionAction {
  /**
   * Action label
   */
  label: string;
  /**
   * Action type
   */
  type: 'grant' | 'deny' | 'revoke' | 'configure' | 'details' | 'custom';
  /**
   * Button variant
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /**
   * Button size
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /**
   * Action icon
   */
  icon?: string;
  /**
   * Whether action is disabled
   */
  disabled?: boolean;
  /**
   * Whether action is loading
   */
  loading?: boolean;
  /**
   * Action click handler
   */
  onClick?: (permission: DevicePermission) => void;
}

export interface SPermissionsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sPermissionsListVariants> {
  /**
   * List of device permissions
   */
  permissions: DevicePermission[];
  /**
   * Available permission actions
   */
  actions?: PermissionAction[];
  /**
   * Item size
   */
  itemSize?: 'sm' | 'default' | 'lg';
  /**
   * Whether items are interactive
   */
  interactive?: boolean;
  /**
   * Whether to show risk indicators
   */
  showRisk?: boolean;
  /**
   * Whether to show last changed time
   */
  showLastChanged?: boolean;
  /**
   * Whether to show usage information
   */
  showUsage?: boolean;
  /**
   * Whether to show purpose/justification
   */
  showPurpose?: boolean;
  /**
   * Whether to show toggles for toggleable permissions
   */
  showToggles?: boolean;
  /**
   * Whether to group permissions by status
   */
  groupByStatus?: boolean;
  /**
   * Whether to group permissions by risk
   */
  groupByRisk?: boolean;
  /**
   * Whether form is in loading state
   */
  loading?: boolean;
  /**
   * Whether to show empty state
   */
  showEmpty?: boolean;
  /**
   * Empty state message
   */
  emptyMessage?: string;
  /**
   * Empty state action
   */
  emptyAction?: {
    label: string;
    onClick: () => void;
  };
  /**
   * Permission click handler
   */
  onPermissionClick?: (permission: DevicePermission) => void;
  /**
   * Permission toggle handler
   */
  onPermissionToggle?: (permissionId: string, granted: boolean) => void;
  /**
   * Permission status change handler
   */
  onStatusChange?: (permissionId: string, status: PermissionStatus) => void;
  /**
   * Additional header content
   */
  header?: React.ReactNode;
  /**
   * Additional footer content
   */
  footer?: React.ReactNode;
}

/**
 * S-PermissionsList - Structure for displaying device permissions list
 *
 * This structure provides a comprehensive interface for managing device permissions
 * such as camera, microphone, location, notifications, and more. It shows permission
 * status, risk levels, usage information, and provides controls for granting/denying
 * permissions.
 *
 * Key features:
 * - Support for various permission types with appropriate icons and styling
 * - Permission status indicators (granted, denied, prompt, unknown)
 * - Risk level indicators (low, medium, high, critical)
 * - Permission toggles for easy management
 * - Usage statistics and last changed timestamps
 * - Purpose and justification display
 * - Grouping by status or risk level
 * - Multiple layout options (list, grid, compact)
 * - Loading and empty states
 * - Interactive permission management
 * - Responsive design with proper spacing
 * - Accessibility support with proper labels and ARIA attributes
 *
 * @example
 * ```tsx
 * <SPermissionsList
 *   permissions={[
 *     {
 *       id: "camera",
 *       name: "camera",
 *       displayName: "Camera",
 *       description: "Access to device camera for taking photos and videos",
 *       type: "camera",
 *       status: "granted",
 *       risk: "medium",
 *       required: true,
 *       toggleable: true,
 *       purpose: "Profile photos and document scanning",
 *       requestedBy: "Acrobi App",
 *       usage: {
 *         frequency: "occasional",
 *         lastUsed: new Date(),
 *         usageCount: 15
 *       }
 *     },
 *     {
 *       id: "location",
 *       name: "geolocation",
 *       displayName: "Location",
 *       description: "Access to device location for location-based features",
 *       type: "location",
 *       status: "denied",
 *       risk: "high",
 *       required: false,
 *       toggleable: true,
 *       purpose: "Location-based recommendations and services"
 *     }
 *   ]}
 *   actions={[
 *     {
 *       label: "Grant",
 *       type: "grant",
 *       variant: "default",
 *       onClick: (perm) => console.log("Grant", perm.name)
 *     },
 *     {
 *       label: "Deny",
 *       type: "deny",
 *       variant: "destructive",
 *       onClick: (perm) => console.log("Deny", perm.name)
 *     }
 *   ]}
 *   showRisk={true}
 *   showUsage={true}
 *   showPurpose={true}
 *   showToggles={true}
 *   interactive={true}
 *   onPermissionToggle={(id, granted) => console.log("Toggle", id, granted)}
 * />
 * ```
 */
const SPermissionsList = React.forwardRef<HTMLDivElement, SPermissionsListProps>(
  (
    {
      className,
      permissions = [],
      actions = [],
      itemSize = 'default',
      interactive = false,
      showRisk = true,
      showLastChanged = false,
      showUsage = false,
      showPurpose = true,
      showToggles = true,
      groupByStatus = false,
      groupByRisk = false,
      loading = false,
      showEmpty = true,
      emptyMessage = 'No permissions found',
      emptyAction,
      onPermissionClick,
      onPermissionToggle,
      onStatusChange,
      header,
      footer,
      variant,
      size,
      layout,
      ...props
    },
    ref
  ) => {
    const formatLastChanged = React.useCallback((date: Date) => {
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (minutes < 1) return 'Just now';
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      return `${days}d ago`;
    }, []);

    const getStatusBadge = React.useCallback((status: PermissionStatus) => {
      switch (status) {
        case 'granted':
          return { text: 'Granted', variant: 'default' as const, icon: '✓' };
        case 'denied':
          return { text: 'Denied', variant: 'destructive' as const, icon: '✗' };
        case 'prompt':
          return { text: 'Ask when needed', variant: 'secondary' as const, icon: '?' };
        case 'unknown':
          return { text: 'Unknown', variant: 'outline' as const, icon: '○' };
        default:
          return { text: 'Unknown', variant: 'outline' as const, icon: '?' };
      }
    }, []);

    const getRiskBadge = React.useCallback((risk: PermissionRisk) => {
      switch (risk) {
        case 'low':
          return { text: 'Low Risk', variant: 'secondary' as const, color: 'text-green-600' };
        case 'medium':
          return { text: 'Medium Risk', variant: 'secondary' as const, color: 'text-yellow-600' };
        case 'high':
          return { text: 'High Risk', variant: 'destructive' as const, color: 'text-red-600' };
        case 'critical':
          return { text: 'Critical Risk', variant: 'destructive' as const, color: 'text-red-700' };
        default:
          return { text: 'Unknown Risk', variant: 'outline' as const, color: 'text-gray-600' };
      }
    }, []);

    const getActionForPermission = React.useCallback((permission: DevicePermission) => {
      return actions.find(action => {
        switch (action.type) {
          case 'grant':
            return permission.status !== 'granted';
          case 'deny':
            return permission.status === 'granted' || permission.status === 'prompt';
          case 'revoke':
            return permission.status === 'granted';
          default:
            return true;
        }
      });
    }, [actions]);

    const getPermissionIcon = React.useCallback((permission: DevicePermission) => {
      if (permission.icon) return permission.icon;
      
      switch (permission.type) {
        case 'camera': return '📷';
        case 'microphone': return '🎤';
        case 'location': return '📍';
        case 'notifications': return '🔔';
        case 'storage': return '💾';
        case 'contacts': return '👥';
        case 'calendar': return '📅';
        case 'photos': return '🖼️';
        case 'bluetooth': return '📶';
        case 'usb': return '🔌';
        case 'screen': return '🖥️';
        case 'clipboard': return '📋';
        case 'sensors': return '📡';
        default: return '🔐';
      }
    }, []);

    const groupedPermissions = React.useMemo(() => {
      if (groupByStatus) {
        return permissions.reduce((groups, permission) => {
          const status = permission.status;
          if (!groups[status]) groups[status] = [];
          groups[status].push(permission);
          return groups;
        }, {} as Record<string, DevicePermission[]>);
      }
      
      if (groupByRisk) {
        return permissions.reduce((groups, permission) => {
          const risk = permission.risk;
          if (!groups[risk]) groups[risk] = [];
          groups[risk].push(permission);
          return groups;
        }, {} as Record<string, DevicePermission[]>);
      }
      
      return { all: permissions };
    }, [permissions, groupByStatus, groupByRisk]);

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(sPermissionsListVariants({ variant, size, layout }), className)}
          {...props}
        >
          {header}
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
          </div>
          {footer}
        </div>
      );
    }

    if (permissions.length === 0 && showEmpty) {
      return (
        <div
          ref={ref}
          className={cn(sPermissionsListVariants({ variant, size, layout }), className)}
          {...props}
        >
          {header}
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-4xl mb-3">🔐</div>
            <p className="text-muted-foreground text-sm mb-4">{emptyMessage}</p>
            {emptyAction && (
              <Button
                variant="outline"
                size="sm"
                onClick={emptyAction.onClick}
              >
                {emptyAction.label}
              </Button>
            )}
          </div>
          {footer}
        </div>
      );
    }

    const renderPermission = (permission: DevicePermission) => {
      const statusBadge = getStatusBadge(permission.status);
      const riskBadge = getRiskBadge(permission.risk);
      const primaryAction = getActionForPermission(permission);
      const isInteractive = interactive || Boolean(onPermissionClick);

      return (
        <div
          key={permission.id}
          className={cn(
            sPermissionItemVariants({
              status: permission.status,
              risk: permission.risk,
              interactive: isInteractive,
              size: itemSize,
            })
          )}
          onClick={isInteractive ? () => onPermissionClick?.(permission) : undefined}
          role={isInteractive ? 'button' : undefined}
          tabIndex={isInteractive ? 0 : undefined}
          onKeyDown={
            isInteractive
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onPermissionClick?.(permission);
                  }
                }
              : undefined
          }
        >
          {/* Permission Info */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Permission Icon */}
            <div className={cn(
              sPermissionIconVariants({
                size: itemSize,
                type: permission.type,
              })
            )}>
              {getPermissionIcon(permission)}
            </div>

            {/* Permission Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm truncate">
                  {permission.displayName}
                </h4>
                <Badge
                  variant={statusBadge.variant}
                  className="text-xs flex-shrink-0"
                >
                  <span className="mr-1">{statusBadge.icon}</span>
                  {statusBadge.text}
                </Badge>
                {permission.required && (
                  <Badge variant="outline" className="text-xs">Required</Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {permission.description}
              </p>

              {/* Purpose */}
              {showPurpose && permission.purpose && (
                <div className="text-xs text-muted-foreground mb-2">
                  <span className="font-medium">Purpose:</span> {permission.purpose}
                </div>
              )}

              {/* Additional Info */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {showRisk && (
                  <span className={cn('font-medium', riskBadge.color)}>
                    {riskBadge.text}
                  </span>
                )}
                {permission.requestedBy && (
                  <span>📱 {permission.requestedBy}</span>
                )}
                {showLastChanged && permission.lastChanged && (
                  <span>🕒 {formatLastChanged(permission.lastChanged)}</span>
                )}
                {showUsage && permission.usage?.lastUsed && (
                  <span>
                    🔄 Last used {formatLastChanged(permission.usage.lastUsed)}
                  </span>
                )}
                {showUsage && permission.usage?.usageCount && (
                  <span>📊 Used {permission.usage.usageCount} times</span>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            {permission.loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
            )}
            
            {/* Toggle Switch */}
            {showToggles && permission.toggleable && !permission.loading && (
              <SwitchField
                checked={permission.status === 'granted'}
                disabled={permission.loading}
                onChange={(checked) => {
                  onPermissionToggle?.(permission.id, checked);
                  onStatusChange?.(permission.id, checked ? 'granted' : 'denied');
                }}
                hideLabel
              />
            )}
            
            {/* Action Button */}
            {primaryAction && !permission.toggleable && !permission.loading && (
              <Button
                variant={primaryAction.variant || 'outline'}
                size={primaryAction.size || 'sm'}
                disabled={primaryAction.disabled || permission.loading}
                loading={primaryAction.loading}
                onClick={(e) => {
                  e.stopPropagation();
                  primaryAction.onClick?.(permission);
                }}
              >
                {primaryAction.icon && (
                  <span className="mr-1 text-xs">{primaryAction.icon}</span>
                )}
                {primaryAction.label}
              </Button>
            )}

            {/* Additional Actions Menu */}
            {actions.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  // Could open a menu with additional actions
                }}
              >
                ⋯
              </Button>
            )}
          </div>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(sPermissionsListVariants({ variant, size, layout }), className)}
        {...props}
      >
        {header}

        <div className="space-y-6">
          {Object.entries(groupedPermissions).map(([groupKey, groupPermissions]) => (
            <div key={groupKey}>
              {/* Group Header */}
              {(groupByStatus || groupByRisk) && groupKey !== 'all' && (
                <div className="mb-3">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    {groupByStatus ? getStatusBadge(groupKey as PermissionStatus).text : getRiskBadge(groupKey as PermissionRisk).text}
                  </h3>
                  <Badge variant="outline" className="text-xs ml-2">
                    {groupPermissions.length}
                  </Badge>
                </div>
              )}

              {/* Group Permissions */}
              <div className={cn(
                layout === 'grid' && 'grid grid-cols-1 sm:grid-cols-2 gap-4',
                layout === 'list' && 'space-y-3',
                layout === 'compact' && 'space-y-2'
              )}>
                {groupPermissions.map(renderPermission)}
              </div>
            </div>
          ))}
        </div>

        {footer}
      </div>
    );
  }
);

SPermissionsList.displayName = 'SPermissionsList';

export { SPermissionsList, sPermissionsListVariants };
export type { DevicePermission, PermissionAction, PermissionStatus, PermissionRisk, PermissionType };