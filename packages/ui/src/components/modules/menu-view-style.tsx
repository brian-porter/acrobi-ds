import * as React from 'react';
import {
  Menu,
  type MenuProps,
  type MenuAction,
  type MenuSection,
} from '../structures/menu';

export type ViewStyle =
  | 'list'
  | 'grid'
  | 'card'
  | 'table'
  | 'gallery'
  | 'timeline'
  | 'compact'
  | 'detailed';

export interface ViewStyleOption {
  id: ViewStyle;
  label: string;
  icon: string;
  description?: string;
  available?: boolean;
}

export interface MenuViewStyleProps
  extends Omit<MenuProps, 'sections' | 'actions'> {
  /**
   * Currently selected view style
   */
  currentView?: ViewStyle;
  /**
   * Available view styles
   */
  viewStyles?: ViewStyleOption[];
  /**
   * Whether to show descriptions
   * @default true
   */
  showDescriptions?: boolean;
  /**
   * Callback when view style changes
   */
  onViewStyleChange?: (viewStyle: ViewStyle) => void;
  /**
   * Additional view options
   */
  onToggleDensity?: () => void;
  onToggleImages?: () => void;
  onTogglePreview?: () => void;
  onResetView?: () => void;
  /**
   * Current option states
   */
  options?: {
    density?: 'compact' | 'normal' | 'comfortable';
    showImages?: boolean;
    showPreview?: boolean;
  };
}

// Default view style options
const defaultViewStyles: ViewStyleOption[] = [
  {
    id: 'list',
    label: 'List View',
    icon: '📋',
    description: 'Simple list with essential information',
    available: true,
  },
  {
    id: 'grid',
    label: 'Grid View',
    icon: '⚏',
    description: 'Grid layout with thumbnails',
    available: true,
  },
  {
    id: 'card',
    label: 'Card View',
    icon: '🃏',
    description: 'Card-based layout with rich previews',
    available: true,
  },
  {
    id: 'table',
    label: 'Table View',
    icon: '📊',
    description: 'Detailed table with sortable columns',
    available: true,
  },
  {
    id: 'gallery',
    label: 'Gallery View',
    icon: '🖼️',
    description: 'Image-focused gallery layout',
    available: true,
  },
  {
    id: 'timeline',
    label: 'Timeline View',
    icon: '📅',
    description: 'Chronological timeline layout',
    available: false,
  },
  {
    id: 'compact',
    label: 'Compact View',
    icon: '📏',
    description: 'Dense layout with minimal spacing',
    available: true,
  },
  {
    id: 'detailed',
    label: 'Detailed View',
    icon: '📄',
    description: 'Expanded view with full information',
    available: true,
  },
];

const MenuViewStyle = React.forwardRef<HTMLDivElement, MenuViewStyleProps>(
  (
    {
      currentView = 'list',
      viewStyles = defaultViewStyles,
      showDescriptions = true,
      onViewStyleChange,
      onToggleDensity,
      onToggleImages,
      onTogglePreview,
      onResetView,
      options = {},
      ...props
    },
    ref
  ) => {
    // Generate view style actions
    const viewStyleActions: MenuAction[] = React.useMemo(() => {
      return viewStyles
        .filter(style => style.available !== false)
        .map(style => ({
          id: style.id,
          label: style.label,
          icon: style.icon,
          description: showDescriptions ? style.description : undefined,
          selected: currentView === style.id,
          onSelect: () => onViewStyleChange?.(style.id),
          disabled: style.available === false,
        }));
    }, [viewStyles, currentView, showDescriptions, onViewStyleChange]);

    // Generate view option actions
    const viewOptionActions: MenuAction[] = React.useMemo(() => {
      const actions: MenuAction[] = [];

      if (onToggleDensity) {
        const densityIcon =
          options.density === 'compact'
            ? '📏'
            : options.density === 'comfortable'
              ? '📐'
              : '📋';
        const densityLabel =
          options.density === 'compact'
            ? 'Compact Density'
            : options.density === 'comfortable'
              ? 'Comfortable Density'
              : 'Normal Density';

        actions.push({
          id: 'toggle-density',
          label: densityLabel,
          icon: densityIcon,
          description: 'Change spacing and item size',
          onSelect: onToggleDensity,
        });
      }

      if (onToggleImages) {
        actions.push({
          id: 'toggle-images',
          label: options.showImages ? 'Hide Images' : 'Show Images',
          icon: options.showImages ? '🖼️❌' : '🖼️',
          description: 'Toggle image thumbnails',
          onSelect: onToggleImages,
        });
      }

      if (onTogglePreview) {
        actions.push({
          id: 'toggle-preview',
          label: options.showPreview ? 'Hide Preview' : 'Show Preview',
          icon: options.showPreview ? '👁️❌' : '👁️',
          description: 'Toggle content preview',
          onSelect: onTogglePreview,
        });
      }

      return actions;
    }, [options, onToggleDensity, onToggleImages, onTogglePreview]);

    // Generate sections
    const sections: MenuSection[] = React.useMemo(() => {
      const result: MenuSection[] = [];

      // View styles section
      if (viewStyleActions.length > 0) {
        result.push({
          id: 'view-styles',
          title: 'View Style',
          actions: viewStyleActions,
          bordered: true,
        });
      }

      // View options section
      if (viewOptionActions.length > 0) {
        result.push({
          id: 'view-options',
          title: 'Display Options',
          actions: viewOptionActions,
          bordered: true,
        });
      }

      // Reset section
      if (onResetView) {
        result.push({
          id: 'reset',
          actions: [
            {
              id: 'reset-view',
              label: 'Reset to Default',
              icon: '🔄',
              description: 'Reset view to default settings',
              variant: 'secondary',
              onSelect: onResetView,
            },
          ],
          bordered: false,
        });
      }

      return result;
    }, [viewStyleActions, viewOptionActions, onResetView]);

    return (
      <Menu
        ref={ref}
        title='View Options'
        sections={sections}
        showSectionBorders={true}
        {...props}
      />
    );
  }
);

MenuViewStyle.displayName = 'MenuViewStyle';

export { MenuViewStyle, defaultViewStyles };
export type { ViewStyleOption };
