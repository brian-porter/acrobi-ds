import * as React from 'react';
import {
  Menu,
  type MenuProps,
  type MenuAction,
  type MenuSection,
} from '../structures/menu';

export interface MenuPostsProps
  extends Omit<MenuProps, 'sections' | 'actions'> {
  /**
   * Post details
   */
  post?: {
    id: string;
    authorId: string;
    authorName: string;
    isOwnPost?: boolean;
    isLiked?: boolean;
    isBookmarked?: boolean;
    isFollowing?: boolean;
  };
  /**
   * Current user permissions
   */
  permissions?: {
    canEdit?: boolean;
    canDelete?: boolean;
    canReport?: boolean;
    canShare?: boolean;
    canHide?: boolean;
  };
  /**
   * Action handlers
   */
  onLike?: () => void;
  onUnlike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onUnbookmark?: () => void;
  onFollow?: () => void;
  onUnfollow?: () => void;
  onCopyLink?: () => void;
  onEmbed?: () => void;
  onEdit?: () => void;
  onHide?: () => void;
  onMute?: () => void;
  onBlock?: () => void;
  onReport?: () => void;
  onDelete?: () => void;
  onNotInterested?: () => void;
  onSaveToCollection?: () => void;
  /**
   * Which actions to show
   */
  visibleActions?: string[];
  /**
   * Which actions to hide
   */
  hiddenActions?: string[];
}

const MenuPosts = React.forwardRef<HTMLDivElement, MenuPostsProps>(
  (
    {
      post,
      permissions = {},
      onLike,
      onUnlike,
      onComment,
      onShare,
      onBookmark,
      onUnbookmark,
      onFollow,
      onUnfollow,
      onCopyLink,
      onEmbed,
      onEdit,
      onHide,
      onMute,
      onBlock,
      onReport,
      onDelete,
      onNotInterested,
      onSaveToCollection,
      visibleActions,
      hiddenActions = [],
      ...props
    },
    ref
  ) => {
    const isOwnPost = post?.isOwnPost || false;
    const isLiked = post?.isLiked || false;
    const isBookmarked = post?.isBookmarked || false;
    const isFollowing = post?.isFollowing || false;

    // Generate post-specific actions
    const allActions: MenuAction[] = React.useMemo(
      () => [
        // Engagement actions (primary)
        {
          id: 'like',
          label: isLiked ? 'Unlike' : 'Like',
          icon: isLiked ? '❤️' : '🤍',
          group: 'engagement',
          onSelect: isLiked ? onUnlike : onLike,
          visible: !!(isLiked ? onUnlike : onLike),
        },
        {
          id: 'comment',
          label: 'Comment',
          icon: '💬',
          group: 'engagement',
          onSelect: onComment,
          visible: !!onComment,
        },
        {
          id: 'share',
          label: 'Share',
          icon: '📤',
          group: 'engagement',
          onSelect: onShare,
          visible: !!onShare && permissions.canShare,
        },

        // Save actions
        {
          id: 'bookmark',
          label: isBookmarked ? 'Remove Bookmark' : 'Bookmark',
          icon: isBookmarked ? '⭐️' : '⭐',
          group: 'save',
          onSelect: isBookmarked ? onUnbookmark : onBookmark,
          visible: !!(isBookmarked ? onUnbookmark : onBookmark),
        },
        {
          id: 'save-to-collection',
          label: 'Save to Collection',
          icon: '📋',
          group: 'save',
          onSelect: onSaveToCollection,
          visible: !!onSaveToCollection,
        },

        // Author actions (if not own post)
        {
          id: 'follow',
          label: isFollowing ? 'Unfollow' : 'Follow',
          icon: isFollowing ? '👤❌' : '👤➕',
          group: 'author',
          onSelect: isFollowing ? onUnfollow : onFollow,
          visible: !isOwnPost && !!(isFollowing ? onUnfollow : onFollow),
        },

        // Sharing/Export actions
        {
          id: 'copy-link',
          label: 'Copy Link',
          icon: '🔗',
          group: 'sharing',
          onSelect: onCopyLink,
          visible: !!onCopyLink,
        },
        {
          id: 'embed',
          label: 'Embed',
          icon: '🔗',
          group: 'sharing',
          onSelect: onEmbed,
          visible: !!onEmbed,
        },

        // Management actions (own posts)
        {
          id: 'edit',
          label: 'Edit Post',
          icon: '✏️',
          group: 'management',
          onSelect: onEdit,
          visible: isOwnPost && !!onEdit && permissions.canEdit,
        },

        // Control actions
        {
          id: 'hide',
          label: 'Hide Post',
          icon: '👁️❌',
          variant: 'warning',
          group: 'control',
          onSelect: onHide,
          visible: !!onHide && permissions.canHide,
        },
        {
          id: 'not-interested',
          label: 'Not Interested',
          icon: '👎',
          variant: 'warning',
          group: 'control',
          onSelect: onNotInterested,
          visible: !isOwnPost && !!onNotInterested,
        },

        // Moderation actions (other people's posts)
        {
          id: 'mute',
          label: `Mute ${post?.authorName || 'Author'}`,
          icon: '🔇',
          variant: 'warning',
          group: 'moderation',
          onSelect: onMute,
          visible: !isOwnPost && !!onMute,
        },
        {
          id: 'block',
          label: `Block ${post?.authorName || 'Author'}`,
          icon: '🚫',
          variant: 'warning',
          group: 'moderation',
          onSelect: onBlock,
          visible: !isOwnPost && !!onBlock,
        },

        // Reporting/Destructive actions
        {
          id: 'report',
          label: 'Report Post',
          icon: '🚨',
          variant: 'destructive',
          group: 'report',
          onSelect: onReport,
          visible: !isOwnPost && !!onReport && permissions.canReport,
        },
        {
          id: 'delete',
          label: 'Delete Post',
          icon: '🗑️',
          variant: 'destructive',
          group: 'report',
          onSelect: onDelete,
          visible: isOwnPost && !!onDelete && permissions.canDelete,
        },
      ],
      [
        post,
        isOwnPost,
        isLiked,
        isBookmarked,
        isFollowing,
        permissions,
        onLike,
        onUnlike,
        onComment,
        onShare,
        onBookmark,
        onUnbookmark,
        onFollow,
        onUnfollow,
        onCopyLink,
        onEmbed,
        onEdit,
        onHide,
        onMute,
        onBlock,
        onReport,
        onDelete,
        onNotInterested,
        onSaveToCollection,
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

      // Section order for posts (most common at bottom)
      const sectionOrder = [
        'report',
        'moderation',
        'control',
        'management',
        'sharing',
        'author',
        'save',
        'engagement',
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
        title='Post Options'
        sections={sections}
        showSectionBorders={true}
        {...props}
      />
    );
  }
);

MenuPosts.displayName = 'MenuPosts';

export { MenuPosts };
