import * as React from 'react';
import {
  Menu,
  type MenuProps,
  type MenuAction,
  type MenuSection,
} from './menu';

export type PrivacyLevel = 'public' | 'friends' | 'private' | 'custom';

export interface PrivacyOption {
  id: PrivacyLevel;
  label: string;
  icon: string;
  description: string;
  available?: boolean;
}

export interface PrivacySetting {
  id: string;
  label: string;
  description?: string;
  currentLevel: PrivacyLevel;
  availableLevels?: PrivacyLevel[];
  icon?: string;
}

export interface MenuPrivacyProps
  extends Omit<MenuProps, 'sections' | 'actions'> {
  /**
   * Privacy context (what is being shared)
   */
  context?: {
    type:
      | 'post'
      | 'profile'
      | 'content'
      | 'activity'
      | 'location'
      | 'collection';
    name?: string;
  };
  /**
   * Current privacy level
   */
  currentLevel?: PrivacyLevel;
  /**
   * Available privacy options
   */
  privacyOptions?: PrivacyOption[];
  /**
   * Individual privacy settings
   */
  privacySettings?: PrivacySetting[];
  /**
   * Whether to show descriptions
   * @default true
   */
  showDescriptions?: boolean;
  /**
   * Callbacks
   */
  onPrivacyChange?: (level: PrivacyLevel) => void;
  onSettingChange?: (settingId: string, level: PrivacyLevel) => void;
  onManagePrivacy?: () => void;
  onViewAudience?: () => void;
  onCreateCustom?: () => void;
  onPrivacyHelp?: () => void;
  /**
   * Quick actions
   */
  onMakePublic?: () => void;
  onMakePrivate?: () => void;
  onShareWithFriends?: () => void;
}

// Default privacy options
const defaultPrivacyOptions: PrivacyOption[] = [
  {
    id: 'public',
    label: 'Public',
    icon: '🌍',
    description: 'Anyone can see this',
    available: true,
  },
  {
    id: 'friends',
    label: 'Friends Only',
    icon: '👥',
    description: 'Only your friends can see this',
    available: true,
  },
  {
    id: 'private',
    label: 'Only Me',
    icon: '🔒',
    description: 'Only you can see this',
    available: true,
  },
  {
    id: 'custom',
    label: 'Custom',
    icon: '⚙️',
    description: 'Choose specific people or groups',
    available: true,
  },
];

const MenuPrivacy = React.forwardRef<HTMLDivElement, MenuPrivacyProps>(
  (
    {
      context,
      currentLevel = 'friends',
      privacyOptions = defaultPrivacyOptions,
      privacySettings = [],
      showDescriptions = true,
      onPrivacyChange,
      onSettingChange,
      onManagePrivacy,
      onViewAudience,
      onCreateCustom,
      onPrivacyHelp,
      onMakePublic,
      onMakePrivate,
      onShareWithFriends,
      ...props
    },
    ref
  ) => {
    // Generate privacy level actions
    const privacyLevelActions: MenuAction[] = React.useMemo(() => {
      return privacyOptions
        .filter(option => option.available !== false)
        .map(option => ({
          id: option.id,
          label: option.label,
          icon: option.icon,
          description: showDescriptions ? option.description : undefined,
          selected: currentLevel === option.id,
          onSelect: () => {
            if (option.id === 'custom' && onCreateCustom) {
              onCreateCustom();
            } else {
              onPrivacyChange?.(option.id);
            }
          },
          disabled: option.available === false,
        }));
    }, [
      privacyOptions,
      currentLevel,
      showDescriptions,
      onPrivacyChange,
      onCreateCustom,
    ]);

    // Generate individual setting actions
    const settingActions: MenuAction[] = React.useMemo(() => {
      return privacySettings.map(setting => {
        const currentOption = privacyOptions.find(
          opt => opt.id === setting.currentLevel
        );

        return {
          id: setting.id,
          label: setting.label,
          icon: setting.icon || currentOption?.icon || '⚙️',
          description: setting.description,
          badge: currentOption?.label,
          badgeVariant: 'secondary' as const,
          onSelect: () => {
            // For now, just toggle between common levels
            // In a real implementation, this would open a submenu
            const availableLevels = setting.availableLevels || [
              'public',
              'friends',
              'private',
            ];
            const currentIndex = availableLevels.indexOf(setting.currentLevel);
            const nextIndex = (currentIndex + 1) % availableLevels.length;
            const nextLevel = availableLevels[nextIndex] as PrivacyLevel;
            onSettingChange?.(setting.id, nextLevel);
          },
        };
      });
    }, [privacySettings, privacyOptions, onSettingChange]);

    // Generate quick action buttons
    const quickActions: MenuAction[] = React.useMemo(() => {
      const actions: MenuAction[] = [];

      if (onMakePublic && currentLevel !== 'public') {
        actions.push({
          id: 'make-public',
          label: 'Make Public',
          icon: '🌍',
          description: 'Share with everyone',
          onSelect: onMakePublic,
        });
      }

      if (onShareWithFriends && currentLevel !== 'friends') {
        actions.push({
          id: 'share-friends',
          label: 'Share with Friends',
          icon: '👥',
          description: 'Share with friends only',
          onSelect: onShareWithFriends,
        });
      }

      if (onMakePrivate && currentLevel !== 'private') {
        actions.push({
          id: 'make-private',
          label: 'Make Private',
          icon: '🔒',
          description: 'Keep to yourself',
          onSelect: onMakePrivate,
        });
      }

      return actions;
    }, [currentLevel, onMakePublic, onShareWithFriends, onMakePrivate]);

    // Generate management actions
    const managementActions: MenuAction[] = React.useMemo(() => {
      const actions: MenuAction[] = [];

      if (onViewAudience) {
        actions.push({
          id: 'view-audience',
          label: 'View Audience',
          icon: '👁️',
          description: 'See who can view this',
          onSelect: onViewAudience,
        });
      }

      if (onManagePrivacy) {
        actions.push({
          id: 'manage-privacy',
          label: 'Privacy Settings',
          icon: '⚙️',
          description: 'Manage all privacy settings',
          onSelect: onManagePrivacy,
        });
      }

      if (onCreateCustom && currentLevel !== 'custom') {
        actions.push({
          id: 'create-custom',
          label: 'Create Custom Setting',
          icon: '➕',
          description: 'Set up custom privacy rules',
          onSelect: onCreateCustom,
        });
      }

      if (onPrivacyHelp) {
        actions.push({
          id: 'privacy-help',
          label: 'Privacy Help',
          icon: '❓',
          description: 'Learn about privacy options',
          onSelect: onPrivacyHelp,
        });
      }

      return actions;
    }, [
      onViewAudience,
      onManagePrivacy,
      onCreateCustom,
      onPrivacyHelp,
      currentLevel,
    ]);

    // Generate sections
    const sections: MenuSection[] = React.useMemo(() => {
      const result: MenuSection[] = [];

      // Privacy levels section
      if (privacyLevelActions.length > 0) {
        result.push({
          id: 'privacy-levels',
          title: 'Who can see this?',
          actions: privacyLevelActions,
          bordered: true,
        });
      }

      // Individual settings section
      if (settingActions.length > 0) {
        result.push({
          id: 'privacy-settings',
          title: 'Privacy Settings',
          actions: settingActions,
          bordered: true,
        });
      }

      // Quick actions section
      if (quickActions.length > 0) {
        result.push({
          id: 'quick-actions',
          title: 'Quick Actions',
          actions: quickActions,
          bordered: true,
        });
      }

      // Management section
      if (managementActions.length > 0) {
        result.push({
          id: 'management',
          actions: managementActions,
          bordered: false,
        });
      }

      return result;
    }, [privacyLevelActions, settingActions, quickActions, managementActions]);

    // Generate subtitle based on context
    const subtitle = React.useMemo(() => {
      if (!context) return undefined;

      const currentOption = privacyOptions.find(opt => opt.id === currentLevel);
      const levelLabel = currentOption?.label || 'Unknown';

      if (context.name) {
        return `${context.name} • ${levelLabel}`;
      }

      const contextLabels = {
        post: 'Post',
        profile: 'Profile',
        content: 'Content',
        activity: 'Activity',
        location: 'Location',
        collection: 'Collection',
      };

      return `${contextLabels[context.type] || 'Item'} • ${levelLabel}`;
    }, [context, currentLevel, privacyOptions]);

    return (
      <Menu
        ref={ref}
        title='Privacy Settings'
        subtitle={subtitle}
        sections={sections}
        showSectionBorders={true}
        {...props}
      />
    );
  }
);

MenuPrivacy.displayName = 'MenuPrivacy';

export { MenuPrivacy, defaultPrivacyOptions };
export type { PrivacyOption, PrivacySetting };
