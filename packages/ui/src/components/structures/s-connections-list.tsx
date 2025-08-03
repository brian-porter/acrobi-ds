import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';
import { Badge } from '../primitives/badge';
import { Icon } from '../primitives/icon';
import { Avatar } from '../primitives/avatar';

/**
 * S-ConnectionsList variant styles using Acrobi Design System classes
 * Structure for displaying social media connections list
 */
const sConnectionsListVariants = cva(
  'connections-list space-y-0',
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
        grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
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

const sConnectionItemVariants = cva(
  'connection-item flex items-center justify-between p-4 border border-border rounded-lg transition-colors',
  {
    variants: {
      status: {
        connected: 'bg-green-50/50 border-green-200',
        disconnected: 'bg-gray-50/50 border-gray-200',
        error: 'bg-red-50/50 border-red-200',
        pending: 'bg-yellow-50/50 border-yellow-200',
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
      status: 'disconnected',
      interactive: false,
      size: 'default',
    },
  }
);

const sConnectionIconVariants = cva(
  'connection-icon flex items-center justify-center rounded-full',
  {
    variants: {
      size: {
        sm: 'w-8 h-8 text-sm',
        default: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
      },
      provider: {
        facebook: 'bg-blue-500 text-white',
        twitter: 'bg-sky-500 text-white',
        instagram: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white',
        linkedin: 'bg-blue-600 text-white',
        youtube: 'bg-red-500 text-white',
        tiktok: 'bg-black text-white',
        github: 'bg-gray-900 text-white',
        discord: 'bg-indigo-500 text-white',
        slack: 'bg-green-500 text-white',
        google: 'bg-red-500 text-white',
        apple: 'bg-black text-white',
        spotify: 'bg-green-500 text-white',
        default: 'bg-gray-500 text-white',
      },
    },
    defaultVariants: {
      size: 'default',
      provider: 'default',
    },
  }
);

export interface SocialConnection {
  /**
   * Connection identifier
   */
  id: string;
  /**
   * Provider name
   */
  provider: string;
  /**
   * Provider display name
   */
  displayName: string;
  /**
   * Provider icon (emoji or icon name)
   */
  icon?: string;
  /**
   * Provider color scheme
   */
  providerType?: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'github' | 'discord' | 'slack' | 'google' | 'apple' | 'spotify' | 'default';
  /**
   * Connection status
   */
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  /**
   * Connected account username/handle
   */
  username?: string;
  /**
   * Connected account display name
   */
  accountName?: string;
  /**
   * Connected account avatar
   */
  avatarUrl?: string;
  /**
   * Connection description
   */
  description?: string;
  /**
   * Last sync/activity timestamp
   */
  lastSync?: Date;
  /**
   * Number of followers/connections
   */
  followerCount?: number;
  /**
   * Connection permissions/scopes
   */
  permissions?: string[];
  /**
   * Whether connection is required
   */
  required?: boolean;
  /**
   * Whether connection is loading
   */
  loading?: boolean;
  /**
   * Connection error message
   */
  error?: string;
  /**
   * Additional metadata
   */
  metadata?: Record<string, any>;
}

export interface ConnectionAction {
  /**
   * Action label
   */
  label: string;
  /**
   * Action type
   */
  type: 'connect' | 'disconnect' | 'reconnect' | 'configure' | 'sync' | 'custom';
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
  onClick?: (connection: SocialConnection) => void;
}

export interface SConnectionsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sConnectionsListVariants> {
  /**
   * List of social connections
   */
  connections: SocialConnection[];
  /**
   * Available connection actions
   */
  actions?: ConnectionAction[];
  /**
   * Item size
   */
  itemSize?: 'sm' | 'default' | 'lg';
  /**
   * Whether items are interactive
   */
  interactive?: boolean;
  /**
   * Whether to show connection stats
   */
  showStats?: boolean;
  /**
   * Whether to show last sync time
   */
  showLastSync?: boolean;
  /**
   * Whether to show connection permissions
   */
  showPermissions?: boolean;
  /**
   * Whether to show avatars for connected accounts
   */
  showAvatars?: boolean;
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
   * Connection click handler
   */
  onConnectionClick?: (connection: SocialConnection) => void;
  /**
   * Connection status change handler
   */
  onStatusChange?: (connectionId: string, status: SocialConnection['status']) => void;
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
 * S-ConnectionsList - Structure for displaying social media connections list
 *
 * This structure provides a comprehensive interface for managing social media
 * and service connections. It displays connection status, account information,
 * and provides actions for connecting, disconnecting, and managing connections.
 *
 * Key features:
 * - Support for major social media platforms with branded styling
 * - Connection status indicators (connected, disconnected, error, pending)
 * - Account information display (username, avatar, follower count)
 * - Flexible actions (connect, disconnect, configure, sync)
 * - Last sync timestamps and permission listings
 * - Multiple layout options (list, grid, compact)
 * - Loading and empty states
 * - Interactive connection management
 * - Responsive design with proper spacing
 * - Accessibility support with proper labels and ARIA attributes
 *
 * @example
 * ```tsx
 * <SConnectionsList
 *   connections={[
 *     {
 *       id: "facebook",
 *       provider: "facebook",
 *       displayName: "Facebook",
 *       providerType: "facebook",
 *       status: "connected",
 *       username: "john.doe",
 *       accountName: "John Doe",
 *       avatarUrl: "/facebook-avatar.jpg",
 *       description: "Share updates and connect with friends",
 *       lastSync: new Date(),
 *       followerCount: 342,
 *       permissions: ["profile", "posts", "friends"]
 *     },
 *     {
 *       id: "twitter",
 *       provider: "twitter",
 *       displayName: "Twitter",
 *       providerType: "twitter",
 *       status: "disconnected",
 *       description: "Share thoughts and engage with communities",
 *       required: false
 *     }
 *   ]}
 *   actions={[
 *     {
 *       label: "Connect",
 *       type: "connect",
 *       variant: "default",
 *       onClick: (conn) => console.log("Connect", conn.provider)
 *     },
 *     {
 *       label: "Disconnect",
 *       type: "disconnect",
 *       variant: "destructive",
 *       onClick: (conn) => console.log("Disconnect", conn.provider)
 *     }
 *   ]}
 *   showStats={true}
 *   showLastSync={true}
 *   showAvatars={true}
 *   interactive={true}
 *   onConnectionClick={(conn) => console.log("Clicked", conn.provider)}
 * />
 * ```
 */
const SConnectionsList = React.forwardRef<HTMLDivElement, SConnectionsListProps>(
  (
    {
      className,
      connections = [],
      actions = [],
      itemSize = 'default',
      interactive = false,
      showStats = false,
      showLastSync = false,
      showPermissions = false,
      showAvatars = true,
      loading = false,
      showEmpty = true,
      emptyMessage = 'No connections available',
      emptyAction,
      onConnectionClick,
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
    const formatLastSync = React.useCallback((date: Date) => {
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

    const formatFollowerCount = React.useCallback((count: number) => {
      if (count < 1000) return count.toString();
      if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
      return `${(count / 1000000).toFixed(1)}M`;
    }, []);

    const getActionForConnection = React.useCallback((connection: SocialConnection) => {
      return actions.find(action => {
        switch (action.type) {
          case 'connect':
            return connection.status === 'disconnected';
          case 'disconnect':
            return connection.status === 'connected';
          case 'reconnect':
            return connection.status === 'error';
          case 'sync':
            return connection.status === 'connected';
          default:
            return true;
        }
      });
    }, [actions]);

    const getStatusBadge = React.useCallback((status: SocialConnection['status']) => {
      switch (status) {
        case 'connected':
          return { text: 'Connected', variant: 'default' as const, icon: '✓' };
        case 'disconnected':
          return { text: 'Not Connected', variant: 'outline' as const, icon: '○' };
        case 'error':
          return { text: 'Error', variant: 'destructive' as const, icon: '⚠' };
        case 'pending':
          return { text: 'Connecting...', variant: 'secondary' as const, icon: '⏳' };
        default:
          return { text: 'Unknown', variant: 'outline' as const, icon: '?' };
      }
    }, []);

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(sConnectionsListVariants({ variant, size, layout }), className)}
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

    if (connections.length === 0 && showEmpty) {
      return (
        <div
          ref={ref}
          className={cn(sConnectionsListVariants({ variant, size, layout }), className)}
          {...props}
        >
          {header}
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-4xl mb-3">🔗</div>
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

    return (
      <div
        ref={ref}
        className={cn(sConnectionsListVariants({ variant, size, layout }), className)}
        {...props}
      >
        {header}

        <div className={cn(
          layout === 'grid' && 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
          layout === 'list' && 'space-y-3',
          layout === 'compact' && 'space-y-2'
        )}>
          {connections.map((connection) => {
            const statusBadge = getStatusBadge(connection.status);
            const primaryAction = getActionForConnection(connection);
            const isInteractive = interactive || Boolean(onConnectionClick);

            return (
              <div
                key={connection.id}
                className={cn(
                  sConnectionItemVariants({
                    status: connection.status,
                    interactive: isInteractive,
                    size: itemSize,
                  })
                )}
                onClick={isInteractive ? () => onConnectionClick?.(connection) : undefined}
                role={isInteractive ? 'button' : undefined}
                tabIndex={isInteractive ? 0 : undefined}
                onKeyDown={
                  isInteractive
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onConnectionClick?.(connection);
                        }
                      }
                    : undefined
                }
              >
                {/* Connection Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Provider Icon */}
                  <div className={cn(
                    sConnectionIconVariants({
                      size: itemSize,
                      provider: connection.providerType || 'default',
                    })
                  )}>
                    {connection.icon || connection.provider.charAt(0).toUpperCase()}
                  </div>

                  {/* Connection Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">
                        {connection.displayName}
                      </h4>
                      <Badge
                        variant={statusBadge.variant}
                        className="text-xs flex-shrink-0"
                      >
                        <span className="mr-1">{statusBadge.icon}</span>
                        {statusBadge.text}
                      </Badge>
                      {connection.required && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                    </div>

                    {/* Account Info */}
                    {connection.status === 'connected' && (connection.username || connection.accountName) && (
                      <div className="flex items-center gap-2 mb-1">
                        {showAvatars && connection.avatarUrl && (
                          <Avatar
                            src={connection.avatarUrl}
                            fallback={connection.accountName?.charAt(0) || connection.username?.charAt(0) || '?'}
                            size="xs"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          {connection.accountName && (
                            <div className="text-xs font-medium truncate">
                              {connection.accountName}
                            </div>
                          )}
                          {connection.username && (
                            <div className="text-xs text-muted-foreground truncate">
                              @{connection.username}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    {connection.description && (
                      <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                        {connection.description}
                      </p>
                    )}

                    {/* Stats and Info */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {showStats && connection.followerCount !== undefined && (
                        <span>👥 {formatFollowerCount(connection.followerCount)}</span>
                      )}
                      {showLastSync && connection.lastSync && connection.status === 'connected' && (
                        <span>🔄 {formatLastSync(connection.lastSync)}</span>
                      )}
                      {showPermissions && connection.permissions && connection.permissions.length > 0 && (
                        <span>🔑 {connection.permissions.length} permissions</span>
                      )}
                    </div>

                    {/* Error Message */}
                    {connection.error && connection.status === 'error' && (
                      <div className="text-xs text-red-600 mt-1">
                        {connection.error}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  {connection.loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                  )}
                  
                  {primaryAction && !connection.loading && (
                    <Button
                      variant={primaryAction.variant || 'outline'}
                      size={primaryAction.size || 'sm'}
                      disabled={primaryAction.disabled || connection.loading}
                      loading={primaryAction.loading}
                      onClick={(e) => {
                        e.stopPropagation();
                        primaryAction.onClick?.(connection);
                      }}
                    >
                      {primaryAction.icon && (
                        <span className="mr-1 text-xs">{primaryAction.icon}</span>
                      )}
                      {primaryAction.label}
                    </Button>
                  )}

                  {/* Additional Actions */}
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
          })}
        </div>

        {footer}
      </div>
    );
  }
);

SConnectionsList.displayName = 'SConnectionsList';

export { SConnectionsList, sConnectionsListVariants };
export type { SocialConnection, ConnectionAction };