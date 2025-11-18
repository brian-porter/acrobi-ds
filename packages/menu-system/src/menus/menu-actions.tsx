import * as React from 'react';
import {
  Menu,
  type MenuProps,
  type MenuAction,
  type MenuSection,
} from './menu';

export interface MenuActionsProps
  extends Omit<MenuProps, 'sections' | 'actions'> {
  /**
   * Subject of the actions (person, item, group, etc.)
   */
  subject?: {
    id: string;
    name: string;
    type: 'person' | 'item' | 'group' | 'brand' | 'post' | 'message';
  };
  /**
   * Current user's relationship to subject
   */
  relationship?: {
    isConnected?: boolean;
    isBlocked?: boolean;
    isMuted?: boolean;
    isBookmarked?: boolean;
    canDirectMessage?: boolean;
    canCall?: boolean;
    hasAdminRights?: boolean;
  };
  /**
   * Available action handlers
   */
  onSearch?: () => void;
  onAdd?: () => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onDirectMessage?: () => void;
  onCall?: () => void;
  onComment?: () => void;
  onBookmark?: () => void;
  onUnbookmark?: () => void;
  onAssign?: () => void;
  onShare?: () => void;
  onPrint?: () => void;
  onMove?: () => void;
  onCopy?: () => void;
  onReorder?: () => void;
  onArchive?: () => void;
  onMute?: () => void;
  onUnmute?: () => void;
  onBlock?: () => void;
  onUnblock?: () => void;
  onNoInterest?: () => void;
  onDelete?: () => void;
  onFeedback?: () => void;
  onReport?: () => void;
  /**
   * Which actions to show (if not provided, shows contextual defaults)
   */
  visibleActions?: string[];
  /**
   * Which actions to hide
   */
  hiddenActions?: string[];
}

const MenuActions = React.forwardRef<HTMLDivElement, MenuActionsProps>(
  (
    {
      subject,
      relationship = {},
      onSearch,
      onAdd,
      onConnect,
      onDisconnect,
      onDirectMessage,
      onCall,
      onComment,
      onBookmark,
      onUnbookmark,
      onAssign,
      onShare,
      onPrint,
      onMove,
      onCopy,
      onReorder,
      onArchive,
      onMute,
      onUnmute,
      onBlock,
      onUnblock,
      onNoInterest,
      onDelete,
      onFeedback,
      onReport,
      visibleActions,
      hiddenActions = [],
      ...props
    },
    ref
  ) => {
    const isConnected = relationship.isConnected || false;
    const isBlocked = relationship.isBlocked || false;
    const isMuted = relationship.isMuted || false;
    const isBookmarked = relationship.isBookmarked || false;

    // Generate actions based on context and relationship
    const allActions: MenuAction[] = React.useMemo(
      () => [
        // Primary actions (bottom section - most common)
        {
          id: 'search',
          label: 'Search',
          icon: '🔍',
          group: 'primary',
          onSelect: onSearch,
          visible: !!onSearch,
        },
        {
          id: 'add',
          label: 'Add',
          icon: '➕',
          group: 'primary',
          onSelect: onAdd,
          visible: !!onAdd,
        },
        {
          id: 'connect',
          label:
            subject?.type === 'group'
              ? 'Join Group'
              : isConnected
                ? 'Disconnect'
                : 'Connect',
          icon: isConnected ? '🔗❌' : '🔗',
          variant: isConnected ? 'warning' : 'default',
          group: 'primary',
          onSelect: isConnected ? onDisconnect : onConnect,
          visible: !!(isConnected ? onDisconnect : onConnect),
        },

        // Communication actions
        {
          id: 'direct-message',
          label: 'Direct Message',
          icon: '💬',
          group: 'communication',
          onSelect: onDirectMessage,
          visible: !!onDirectMessage && relationship.canDirectMessage,
          disabled: isBlocked,
        },
        {
          id: 'call',
          label: 'Call',
          icon: '📞',
          group: 'communication',
          onSelect: onCall,
          visible: !!onCall && relationship.canCall,
          disabled: isBlocked,
        },

        // Content actions
        {
          id: 'comment',
          label: 'Comment',
          icon: '💭',
          group: 'content',
          onSelect: onComment,
          visible: !!onComment,
        },
        {
          id: 'bookmark',
          label: isBookmarked ? 'Unbookmark' : 'Bookmark',
          icon: isBookmarked ? '⭐️' : '⭐',
          group: 'content',
          onSelect: isBookmarked ? onUnbookmark : onBookmark,
          visible: !!(isBookmarked ? onUnbookmark : onBookmark),
        },

        // Organization actions
        {
          id: 'assign',
          label: 'Assign',
          icon: '👤',
          group: 'organization',
          onSelect: onAssign,
          visible: !!onAssign,
        },
        {
          id: 'share',
          label: 'Share',
          icon: '📤',
          group: 'organization',
          onSelect: onShare,
          visible: !!onShare,
        },
        {
          id: 'print',
          label: 'Print',
          icon: '🖨️',
          group: 'organization',
          onSelect: onPrint,
          visible: !!onPrint,
        },

        // Management actions
        {
          id: 'move',
          label: 'Move',
          icon: '📋',
          group: 'management',
          onSelect: onMove,
          visible: !!onMove,
        },
        {
          id: 'copy',
          label: 'Copy',
          icon: '📄',
          group: 'management',
          onSelect: onCopy,
          visible: !!onCopy,
        },
        {
          id: 'reorder',
          label: 'Reorder',
          icon: '↕️',
          group: 'management',
          onSelect: onReorder,
          visible: !!onReorder,
        },
        {
          id: 'archive',
          label: 'Archive',
          icon: '📦',
          variant: 'warning',
          group: 'management',
          onSelect: onArchive,
          visible: !!onArchive,
        },

        // Moderation actions
        {
          id: 'mute',
          label: isMuted ? 'Unmute' : 'Mute',
          icon: isMuted ? '🔊' : '🔇',
          variant: 'warning',
          group: 'moderation',
          onSelect: isMuted ? onUnmute : onMute,
          visible: !!(isMuted ? onUnmute : onMute),
        },
        {
          id: 'block',
          label: isBlocked ? 'Unblock' : 'Block',
          icon: isBlocked ? '🚫❌' : '🚫',
          variant: 'warning',
          group: 'moderation',
          onSelect: isBlocked ? onUnblock : onBlock,
          visible: !!(isBlocked ? onUnblock : onBlock),
        },
        {
          id: 'no-interest',
          label: 'No Interest',
          icon: '👎',
          variant: 'warning',
          group: 'moderation',
          onSelect: onNoInterest,
          visible: !!onNoInterest,
        },

        // Destructive actions
        {
          id: 'delete',
          label: 'Delete',
          icon: '🗑️',
          variant: 'destructive',
          group: 'destructive',
          onSelect: onDelete,
          visible: !!onDelete,
        },

        // Feedback actions
        {
          id: 'feedback',
          label: 'Feedback',
          icon: '💭',
          group: 'feedback',
          onSelect: onFeedback,
          visible: !!onFeedback,
        },
        {
          id: 'report',
          label: 'Report',
          icon: '🚨',
          variant: 'warning',
          group: 'feedback',
          onSelect: onReport,
          visible: !!onReport,
        },
      ],
      [
        subject,
        isConnected,
        isBlocked,
        isMuted,
        isBookmarked,
        relationship.canDirectMessage,
        relationship.canCall,
        onSearch,
        onAdd,
        onConnect,
        onDisconnect,
        onDirectMessage,
        onCall,
        onComment,
        onBookmark,
        onUnbookmark,
        onAssign,
        onShare,
        onPrint,
        onMove,
        onCopy,
        onReorder,
        onArchive,
        onMute,
        onUnmute,
        onBlock,
        onUnblock,
        onNoInterest,
        onDelete,
        onFeedback,
        onReport,
      ]
    );

    // Filter actions based on visibility settings
    const filteredActions = React.useMemo(() => {
      return allActions.filter(action => {
        // Hide if in hiddenActions list
        if (hiddenActions.includes(action.id)) return false;

        // If visibleActions is specified, only show those
        if (visibleActions && !visibleActions.includes(action.id)) return false;

        // Use action's own visibility
        return action.visible !== false;
      });
    }, [allActions, visibleActions, hiddenActions]);

    // Group actions into sections with proper ordering
    const sections: MenuSection[] = React.useMemo(() => {
      const groupedActions: Record<string, MenuAction[]> = {};

      filteredActions.forEach(action => {
        const group = action.group || 'default';
        if (!groupedActions[group]) {
          groupedActions[group] = [];
        }
        groupedActions[group].push(action);
      });

      // Define section order (most common at bottom, per documentation)
      const sectionOrder = [
        'feedback',
        'destructive',
        'moderation',
        'management',
        'organization',
        'content',
        'communication',
        'primary',
      ];

      return sectionOrder
        .filter(groupName => groupedActions[groupName]?.length > 0)
        .map(groupName => ({
          id: groupName,
          actions: groupedActions[groupName],
          bordered: true,
        }));
    }, [filteredActions]);

    return (
      <Menu
        ref={ref}
        title={subject ? `${subject.name} Actions` : 'Actions'}
        sections={sections}
        showSectionBorders={true}
        {...props}
      />
    );
  }
);

MenuActions.displayName = 'MenuActions';

export { MenuActions };
