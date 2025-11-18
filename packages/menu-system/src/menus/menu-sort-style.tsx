import * as React from 'react';
import {
  Menu,
  type MenuProps,
  type MenuAction,
  type MenuSection,
} from './menu';

export type SortDirection = 'asc' | 'desc';
export type SortField = string;

export interface SortOption {
  id: SortField;
  label: string;
  icon?: string;
  description?: string;
  available?: boolean;
  defaultDirection?: SortDirection;
}

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

export interface MenuSortStyleProps
  extends Omit<MenuProps, 'sections' | 'actions'> {
  /**
   * Current sort state
   */
  currentSort?: SortState;
  /**
   * Available sort options
   */
  sortOptions?: SortOption[];
  /**
   * Whether to show descriptions
   * @default true
   */
  showDescriptions?: boolean;
  /**
   * Whether to allow direction toggle for current field
   * @default true
   */
  allowDirectionToggle?: boolean;
  /**
   * Callback when sort changes
   */
  onSortChange?: (sort: SortState) => void;
  /**
   * Additional sort actions
   */
  onClearSort?: () => void;
  onRandomize?: () => void;
  onSaveSort?: () => void;
  onManageSort?: () => void;
  /**
   * Group sort options by category
   */
  groupSortOptions?: boolean;
}

// Default sort options for common use cases
const defaultSortOptions: SortOption[] = [
  // Common sorting
  {
    id: 'name',
    label: 'Name',
    icon: '🔤',
    description: 'Sort alphabetically by name',
    available: true,
    defaultDirection: 'asc',
  },
  {
    id: 'date',
    label: 'Date',
    icon: '📅',
    description: 'Sort by date created or modified',
    available: true,
    defaultDirection: 'desc',
  },
  {
    id: 'modified',
    label: 'Last Modified',
    icon: '🕒',
    description: 'Sort by last modification date',
    available: true,
    defaultDirection: 'desc',
  },
  {
    id: 'size',
    label: 'Size',
    icon: '📏',
    description: 'Sort by file or item size',
    available: true,
    defaultDirection: 'desc',
  },

  // Engagement sorting
  {
    id: 'popularity',
    label: 'Popularity',
    icon: '🔥',
    description: 'Sort by engagement or popularity',
    available: true,
    defaultDirection: 'desc',
  },
  {
    id: 'rating',
    label: 'Rating',
    icon: '⭐',
    description: 'Sort by user ratings',
    available: true,
    defaultDirection: 'desc',
  },
  {
    id: 'views',
    label: 'Views',
    icon: '👁️',
    description: 'Sort by view count',
    available: true,
    defaultDirection: 'desc',
  },
  {
    id: 'comments',
    label: 'Comments',
    icon: '💬',
    description: 'Sort by number of comments',
    available: true,
    defaultDirection: 'desc',
  },

  // Content sorting
  {
    id: 'author',
    label: 'Author',
    icon: '👤',
    description: 'Sort alphabetically by author',
    available: true,
    defaultDirection: 'asc',
  },
  {
    id: 'category',
    label: 'Category',
    icon: '📂',
    description: 'Sort by category or type',
    available: true,
    defaultDirection: 'asc',
  },
  {
    id: 'status',
    label: 'Status',
    icon: '🏷️',
    description: 'Sort by status or state',
    available: true,
    defaultDirection: 'asc',
  },
  {
    id: 'priority',
    label: 'Priority',
    icon: '📌',
    description: 'Sort by priority level',
    available: true,
    defaultDirection: 'desc',
  },
];

const MenuSortStyle = React.forwardRef<HTMLDivElement, MenuSortStyleProps>(
  (
    {
      currentSort = { field: 'date', direction: 'desc' },
      sortOptions = defaultSortOptions,
      showDescriptions = true,
      allowDirectionToggle = true,
      onSortChange,
      onClearSort,
      onRandomize,
      onSaveSort,
      onManageSort,
      groupSortOptions = false,
      ...props
    },
    ref
  ) => {
    const handleSortSelect = React.useCallback(
      (optionId: string, option: SortOption) => {
        const isCurrentField = currentSort.field === optionId;
        let newDirection: SortDirection;

        if (isCurrentField && allowDirectionToggle) {
          // Toggle direction if same field
          newDirection = currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
          // Use default direction for new field
          newDirection = option.defaultDirection || 'asc';
        }

        onSortChange?.({
          field: optionId,
          direction: newDirection,
        });
      },
      [currentSort, allowDirectionToggle, onSortChange]
    );

    // Generate sort option actions
    const sortOptionActions: MenuAction[] = React.useMemo(() => {
      return sortOptions
        .filter(option => option.available !== false)
        .map(option => {
          const isSelected = currentSort.field === option.id;
          const directionIcon = isSelected
            ? currentSort.direction === 'asc'
              ? '↑'
              : '↓'
            : '';

          return {
            id: option.id,
            label: option.label,
            icon: option.icon,
            description: showDescriptions ? option.description : undefined,
            selected: isSelected,
            badge: directionIcon,
            onSelect: () => handleSortSelect(option.id, option),
            disabled: option.available === false,
          };
        });
    }, [sortOptions, currentSort, showDescriptions, handleSortSelect]);

    // Generate direction toggle action if applicable
    const directionToggleAction: MenuAction[] = React.useMemo(() => {
      if (!allowDirectionToggle || !currentSort.field) return [];

      const currentOption = sortOptions.find(
        opt => opt.id === currentSort.field
      );
      if (!currentOption) return [];

      return [
        {
          id: 'toggle-direction',
          label: `${currentSort.direction === 'asc' ? 'Descending' : 'Ascending'} Order`,
          icon: currentSort.direction === 'asc' ? '↓' : '↑',
          description: `Switch to ${currentSort.direction === 'asc' ? 'descending' : 'ascending'} order`,
          onSelect: () =>
            onSortChange?.({
              field: currentSort.field,
              direction: currentSort.direction === 'asc' ? 'desc' : 'asc',
            }),
        },
      ];
    }, [allowDirectionToggle, currentSort, sortOptions, onSortChange]);

    // Generate additional actions
    const additionalActions: MenuAction[] = React.useMemo(() => {
      const actions: MenuAction[] = [];

      if (onRandomize) {
        actions.push({
          id: 'randomize',
          label: 'Randomize',
          icon: '🎲',
          description: 'Shuffle items randomly',
          onSelect: onRandomize,
        });
      }

      if (onSaveSort) {
        actions.push({
          id: 'save-sort',
          label: 'Save Sort',
          icon: '💾',
          description: 'Save current sort as default',
          onSelect: onSaveSort,
        });
      }

      if (onManageSort) {
        actions.push({
          id: 'manage-sort',
          label: 'Manage Sorting',
          icon: '⚙️',
          description: 'Configure sort options',
          onSelect: onManageSort,
        });
      }

      return actions;
    }, [onRandomize, onSaveSort, onManageSort]);

    // Group sort options if requested
    const groupedSortOptions = React.useMemo(() => {
      if (!groupSortOptions) return { default: sortOptionActions };

      const groups: Record<string, MenuAction[]> = {
        common: [],
        engagement: [],
        content: [],
        other: [],
      };

      sortOptionActions.forEach(action => {
        const option = sortOptions.find(opt => opt.id === action.id);
        if (['name', 'date', 'modified', 'size'].includes(action.id)) {
          groups.common.push(action);
        } else if (
          ['popularity', 'rating', 'views', 'comments'].includes(action.id)
        ) {
          groups.engagement.push(action);
        } else if (
          ['author', 'category', 'status', 'priority'].includes(action.id)
        ) {
          groups.content.push(action);
        } else {
          groups.other.push(action);
        }
      });

      // Remove empty groups
      Object.keys(groups).forEach(key => {
        if (groups[key].length === 0) {
          delete groups[key];
        }
      });

      return groups;
    }, [groupSortOptions, sortOptionActions, sortOptions]);

    // Generate sections
    const sections: MenuSection[] = React.useMemo(() => {
      const result: MenuSection[] = [];

      // Sort options sections
      if (groupSortOptions) {
        const groupNames = Object.keys(groupedSortOptions);
        const groupTitles: Record<string, string> = {
          common: 'Common',
          engagement: 'Engagement',
          content: 'Content',
          other: 'Other',
        };

        groupNames.forEach(groupName => {
          result.push({
            id: `sort-${groupName}`,
            title: groupTitles[groupName],
            actions: groupedSortOptions[groupName],
            bordered: true,
          });
        });
      } else {
        result.push({
          id: 'sort-options',
          title: 'Sort By',
          actions: sortOptionActions,
          bordered: true,
        });
      }

      // Direction toggle section
      if (directionToggleAction.length > 0) {
        result.push({
          id: 'direction',
          title: 'Order',
          actions: directionToggleAction,
          bordered: true,
        });
      }

      // Additional actions section
      if (additionalActions.length > 0) {
        result.push({
          id: 'additional',
          actions: additionalActions,
          bordered: true,
        });
      }

      // Clear/reset section
      if (onClearSort) {
        result.push({
          id: 'reset',
          actions: [
            {
              id: 'clear-sort',
              label: 'Clear Sort',
              icon: '🔄',
              description: 'Remove all sorting',
              variant: 'secondary',
              onSelect: onClearSort,
            },
          ],
          bordered: false,
        });
      }

      return result;
    }, [
      groupSortOptions,
      groupedSortOptions,
      sortOptionActions,
      directionToggleAction,
      additionalActions,
      onClearSort,
    ]);

    return (
      <Menu
        ref={ref}
        title='Sort Options'
        subtitle={`Currently: ${currentSort.field} (${currentSort.direction === 'asc' ? 'A-Z' : 'Z-A'})`}
        sections={sections}
        showSectionBorders={true}
        {...props}
      />
    );
  }
);

MenuSortStyle.displayName = 'MenuSortStyle';

export { MenuSortStyle, defaultSortOptions };
export type { SortOption, SortState };
