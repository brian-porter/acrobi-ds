import * as React from 'react';
import {
  Menu,
  type MenuProps,
  type MenuAction,
  type MenuSection,
} from '../structures/menu';

export interface MenuAdminProps
  extends Omit<MenuProps, 'sections' | 'actions'> {
  /**
   * Subject being administered
   */
  subject?: {
    id: string;
    name: string;
    type: 'user' | 'group' | 'post' | 'content' | 'system';
    status?: 'active' | 'suspended' | 'pending' | 'archived';
  };
  /**
   * Current admin permissions
   */
  permissions?: {
    canEdit?: boolean;
    canDelete?: boolean;
    canSuspend?: boolean;
    canRestore?: boolean;
    canViewAudit?: boolean;
    canManageUsers?: boolean;
    canManageContent?: boolean;
    canManageSettings?: boolean;
    canExport?: boolean;
    canViewReports?: boolean;
    canManageReports?: boolean;
  };
  /**
   * Admin action handlers
   */
  onEdit?: () => void;
  onDuplicate?: () => void;
  onSuspend?: () => void;
  onRestore?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  onPermanentDelete?: () => void;
  onViewAuditLog?: () => void;
  onViewReports?: () => void;
  onManagePermissions?: () => void;
  onExportData?: () => void;
  onViewAnalytics?: () => void;
  onRefresh?: () => void;
  onSettings?: () => void;
  onBackup?: () => void;
  onRestore?: () => void;
  onForceSync?: () => void;
  onRunMaintenance?: () => void;
  onClearCache?: () => void;
  /**
   * Which actions to show
   */
  visibleActions?: string[];
  /**
   * Which actions to hide
   */
  hiddenActions?: string[];
}

const MenuAdmin = React.forwardRef<HTMLDivElement, MenuAdminProps>(
  (
    {
      subject,
      permissions = {},
      onEdit,
      onDuplicate,
      onSuspend,
      onRestore: onRestoreSubject,
      onArchive,
      onDelete,
      onPermanentDelete,
      onViewAuditLog,
      onViewReports,
      onManagePermissions,
      onExportData,
      onViewAnalytics,
      onRefresh,
      onSettings,
      onBackup,
      onRestore: onRestoreSystem,
      onForceSync,
      onRunMaintenance,
      onClearCache,
      visibleActions,
      hiddenActions = [],
      ...props
    },
    ref
  ) => {
    const isSuspended = subject?.status === 'suspended';
    const isArchived = subject?.status === 'archived';

    // Generate admin-specific actions
    const allActions: MenuAction[] = React.useMemo(
      () => [
        // Quick actions
        {
          id: 'refresh',
          label: 'Refresh',
          icon: '🔄',
          group: 'quick',
          onSelect: onRefresh,
          visible: !!onRefresh,
        },
        {
          id: 'view-analytics',
          label: 'View Analytics',
          icon: '📊',
          group: 'quick',
          onSelect: onViewAnalytics,
          visible: !!onViewAnalytics,
        },

        // Management actions
        {
          id: 'edit',
          label: 'Edit',
          icon: '✏️',
          group: 'management',
          onSelect: onEdit,
          visible: !!onEdit && permissions.canEdit,
        },
        {
          id: 'duplicate',
          label: 'Duplicate',
          icon: '📄',
          group: 'management',
          onSelect: onDuplicate,
          visible: !!onDuplicate,
        },
        {
          id: 'manage-permissions',
          label: 'Manage Permissions',
          icon: '🔐',
          group: 'management',
          onSelect: onManagePermissions,
          visible: !!onManagePermissions && permissions.canManageUsers,
        },
        {
          id: 'export-data',
          label: 'Export Data',
          icon: '📤',
          group: 'management',
          onSelect: onExportData,
          visible: !!onExportData && permissions.canExport,
        },

        // Status actions
        {
          id: 'suspend',
          label: isSuspended ? 'Unsuspend' : 'Suspend',
          icon: isSuspended ? '✅' : '⏸️',
          variant: isSuspended ? 'success' : 'warning',
          group: 'status',
          onSelect: isSuspended ? onRestoreSubject : onSuspend,
          visible:
            !!(isSuspended ? onRestoreSubject : onSuspend) &&
            permissions.canSuspend,
        },
        {
          id: 'archive',
          label: isArchived ? 'Unarchive' : 'Archive',
          icon: isArchived ? '📂' : '📦',
          variant: isArchived ? 'success' : 'warning',
          group: 'status',
          onSelect: isArchived ? onRestoreSubject : onArchive,
          visible: !!(isArchived ? onRestoreSubject : onArchive),
        },

        // Monitoring actions
        {
          id: 'view-audit-log',
          label: 'View Audit Log',
          icon: '📋',
          group: 'monitoring',
          onSelect: onViewAuditLog,
          visible: !!onViewAuditLog && permissions.canViewAudit,
        },
        {
          id: 'view-reports',
          label: 'View Reports',
          icon: '🚨',
          group: 'monitoring',
          onSelect: onViewReports,
          visible: !!onViewReports && permissions.canViewReports,
        },

        // System actions
        {
          id: 'settings',
          label: 'Settings',
          icon: '⚙️',
          group: 'system',
          onSelect: onSettings,
          visible: !!onSettings && permissions.canManageSettings,
        },
        {
          id: 'backup',
          label: 'Backup',
          icon: '💾',
          group: 'system',
          onSelect: onBackup,
          visible: !!onBackup,
        },
        {
          id: 'restore-system',
          label: 'Restore',
          icon: '🔄',
          variant: 'warning',
          group: 'system',
          onSelect: onRestoreSystem,
          visible: !!onRestoreSystem,
        },
        {
          id: 'force-sync',
          label: 'Force Sync',
          icon: '🔄',
          variant: 'warning',
          group: 'system',
          onSelect: onForceSync,
          visible: !!onForceSync,
        },
        {
          id: 'run-maintenance',
          label: 'Run Maintenance',
          icon: '🔧',
          variant: 'warning',
          group: 'system',
          onSelect: onRunMaintenance,
          visible: !!onRunMaintenance,
        },
        {
          id: 'clear-cache',
          label: 'Clear Cache',
          icon: '🗑️',
          variant: 'warning',
          group: 'system',
          onSelect: onClearCache,
          visible: !!onClearCache,
        },

        // Destructive actions
        {
          id: 'delete',
          label: 'Delete',
          icon: '🗑️',
          variant: 'destructive',
          group: 'destructive',
          onSelect: onDelete,
          visible: !!onDelete && permissions.canDelete,
        },
        {
          id: 'permanent-delete',
          label: 'Permanent Delete',
          icon: '🗑️❌',
          variant: 'destructive',
          group: 'destructive',
          onSelect: onPermanentDelete,
          visible: !!onPermanentDelete && permissions.canDelete,
        },
      ],
      [
        subject,
        isSuspended,
        isArchived,
        permissions,
        onEdit,
        onDuplicate,
        onSuspend,
        onRestoreSubject,
        onArchive,
        onDelete,
        onPermanentDelete,
        onViewAuditLog,
        onViewReports,
        onManagePermissions,
        onExportData,
        onViewAnalytics,
        onRefresh,
        onSettings,
        onBackup,
        onRestoreSystem,
        onForceSync,
        onRunMaintenance,
        onClearCache,
      ]
    );

    // Filter actions based on visibility settings
    const filteredActions = React.useMemo(() => {
      return allActions.filter(action => {
        if (hiddenActions.includes(action.id)) return false;
        if (visibleActions && !visibleActions.includes(action.id)) return false;
        return action.visible !== false;
      });
    }, [allActions, visibleActions, hiddenActions]);

    // Group actions into sections
    const sections: MenuSection[] = React.useMemo(() => {
      const groupedActions: Record<string, MenuAction[]> = {};

      filteredActions.forEach(action => {
        const group = action.group || 'default';
        if (!groupedActions[group]) {
          groupedActions[group] = [];
        }
        groupedActions[group].push(action);
      });

      // Section order for admin (dangerous actions at top)
      const sectionOrder = [
        'destructive',
        'system',
        'monitoring',
        'status',
        'management',
        'quick',
      ];

      return sectionOrder
        .filter(groupName => groupedActions[groupName]?.length > 0)
        .map(groupName => ({
          id: groupName,
          title:
            groupName === 'destructive'
              ? 'Danger Zone'
              : groupName === 'system'
                ? 'System'
                : groupName === 'monitoring'
                  ? 'Monitoring'
                  : groupName === 'status'
                    ? 'Status'
                    : groupName === 'management'
                      ? 'Management'
                      : undefined,
          actions: groupedActions[groupName],
          bordered: true,
        }));
    }, [filteredActions]);

    return (
      <Menu
        ref={ref}
        title='Admin Actions'
        subtitle={subject?.name}
        sections={sections}
        showSectionBorders={true}
        {...props}
      />
    );
  }
);

MenuAdmin.displayName = 'MenuAdmin';

export { MenuAdmin };
