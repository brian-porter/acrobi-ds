import * as React from 'react';
import {
  Menu,
  type MenuProps,
  type MenuAction,
  type MenuSection,
} from './menu';
import { Input } from '@acrobi/primitives';
import { Badge } from '@acrobi/primitives';

export interface SearchFilter {
  id: string;
  label: string;
  icon?: string;
  active?: boolean;
  count?: number;
}

export interface SearchSuggestion {
  id: string;
  text: string;
  type?: 'recent' | 'popular' | 'suggestion';
  category?: string;
}

export interface SearchScope {
  id: string;
  label: string;
  icon?: string;
  active?: boolean;
  description?: string;
}

export interface MenuSearchProps
  extends Omit<MenuProps, 'sections' | 'actions'> {
  /**
   * Current search query
   */
  query?: string;
  /**
   * Search placeholder text
   */
  placeholder?: string;
  /**
   * Available search filters
   */
  filters?: SearchFilter[];
  /**
   * Search suggestions/history
   */
  suggestions?: SearchSuggestion[];
  /**
   * Search scope options
   */
  scopes?: SearchScope[];
  /**
   * Whether to show recent searches
   */
  showRecent?: boolean;
  /**
   * Whether to show popular searches
   */
  showPopular?: boolean;
  /**
   * Whether search is loading
   */
  loading?: boolean;
  /**
   * Search callbacks
   */
  onQueryChange?: (query: string) => void;
  onSearch?: (query: string, filters?: string[]) => void;
  onFilterToggle?: (filterId: string) => void;
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  onScopeChange?: (scopeId: string) => void;
  onClearSearch?: () => void;
  onClearHistory?: () => void;
  onAdvancedSearch?: () => void;
  onSaveSearch?: () => void;
  onManageFilters?: () => void;
}

const MenuSearch = React.forwardRef<HTMLDivElement, MenuSearchProps>(
  (
    {
      query = '',
      placeholder = 'Search...',
      filters = [],
      suggestions = [],
      scopes = [],
      showRecent = true,
      showPopular = true,
      loading = false,
      onQueryChange,
      onSearch,
      onFilterToggle,
      onSuggestionSelect,
      onScopeChange,
      onClearSearch,
      onClearHistory,
      onAdvancedSearch,
      onSaveSearch,
      onManageFilters,
      children,
      ...props
    },
    ref
  ) => {
    const [localQuery, setLocalQuery] = React.useState(query);

    // Update local query when prop changes
    React.useEffect(() => {
      setLocalQuery(query);
    }, [query]);

    const handleQueryChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setLocalQuery(newQuery);
        onQueryChange?.(newQuery);
      },
      [onQueryChange]
    );

    const handleSearch = React.useCallback(() => {
      const activeFilters = filters.filter(f => f.active).map(f => f.id);
      onSearch?.(localQuery, activeFilters);
    }, [localQuery, filters, onSearch]);

    const handleKeyPress = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      },
      [handleSearch]
    );

    // Generate scope actions
    const scopeActions: MenuAction[] = React.useMemo(() => {
      if (scopes.length === 0) return [];

      return scopes.map(scope => ({
        id: scope.id,
        label: scope.label,
        icon: scope.icon,
        description: scope.description,
        selected: scope.active,
        onSelect: () => onScopeChange?.(scope.id),
      }));
    }, [scopes, onScopeChange]);

    // Generate filter actions
    const filterActions: MenuAction[] = React.useMemo(() => {
      if (filters.length === 0) return [];

      return filters.map(filter => ({
        id: filter.id,
        label: filter.label,
        icon: filter.icon,
        selected: filter.active,
        badge: filter.count ? String(filter.count) : undefined,
        badgeVariant: filter.active ? 'default' : 'secondary',
        onSelect: () => onFilterToggle?.(filter.id),
      }));
    }, [filters, onFilterToggle]);

    // Generate suggestion actions
    const suggestionActions: MenuAction[] = React.useMemo(() => {
      const recentSuggestions = suggestions.filter(s => s.type === 'recent');
      const popularSuggestions = suggestions.filter(s => s.type === 'popular');
      const otherSuggestions = suggestions.filter(
        s => !s.type || (s.type !== 'recent' && s.type !== 'popular')
      );

      const actions: MenuAction[] = [];

      // Recent searches
      if (showRecent && recentSuggestions.length > 0) {
        recentSuggestions.forEach(suggestion => {
          actions.push({
            id: `recent-${suggestion.id}`,
            label: suggestion.text,
            icon: '🕒',
            description: 'Recent search',
            onSelect: () => onSuggestionSelect?.(suggestion),
          });
        });
      }

      // Popular searches
      if (showPopular && popularSuggestions.length > 0) {
        popularSuggestions.forEach(suggestion => {
          actions.push({
            id: `popular-${suggestion.id}`,
            label: suggestion.text,
            icon: '🔥',
            description: 'Popular search',
            onSelect: () => onSuggestionSelect?.(suggestion),
          });
        });
      }

      // Other suggestions
      otherSuggestions.forEach(suggestion => {
        actions.push({
          id: `suggestion-${suggestion.id}`,
          label: suggestion.text,
          icon: '💡',
          description: suggestion.category,
          onSelect: () => onSuggestionSelect?.(suggestion),
        });
      });

      return actions;
    }, [suggestions, showRecent, showPopular, onSuggestionSelect]);

    // Generate action buttons
    const actionActions: MenuAction[] = React.useMemo(() => {
      const actions: MenuAction[] = [];

      if (onAdvancedSearch) {
        actions.push({
          id: 'advanced-search',
          label: 'Advanced Search',
          icon: '🔍',
          description: 'More search options',
          onSelect: onAdvancedSearch,
        });
      }

      if (onSaveSearch && localQuery.trim()) {
        actions.push({
          id: 'save-search',
          label: 'Save Search',
          icon: '💾',
          description: 'Save current search',
          onSelect: onSaveSearch,
        });
      }

      if (onManageFilters) {
        actions.push({
          id: 'manage-filters',
          label: 'Manage Filters',
          icon: '⚙️',
          description: 'Configure search filters',
          onSelect: onManageFilters,
        });
      }

      return actions;
    }, [onAdvancedSearch, onSaveSearch, onManageFilters, localQuery]);

    // Generate clear actions
    const clearActions: MenuAction[] = React.useMemo(() => {
      const actions: MenuAction[] = [];

      if (onClearSearch && (localQuery.trim() || filters.some(f => f.active))) {
        actions.push({
          id: 'clear-search',
          label: 'Clear Search',
          icon: '🔄',
          description: 'Clear query and filters',
          onSelect: onClearSearch,
        });
      }

      if (onClearHistory && suggestions.some(s => s.type === 'recent')) {
        actions.push({
          id: 'clear-history',
          label: 'Clear History',
          icon: '🗑️',
          variant: 'warning',
          description: 'Clear search history',
          onSelect: onClearHistory,
        });
      }

      return actions;
    }, [onClearSearch, onClearHistory, localQuery, filters, suggestions]);

    // Generate sections
    const sections: MenuSection[] = React.useMemo(() => {
      const result: MenuSection[] = [];

      // Search scope section
      if (scopeActions.length > 0) {
        result.push({
          id: 'search-scope',
          title: 'Search In',
          actions: scopeActions,
          bordered: true,
        });
      }

      // Filters section
      if (filterActions.length > 0) {
        result.push({
          id: 'filters',
          title: 'Filters',
          actions: filterActions,
          bordered: true,
        });
      }

      // Suggestions section
      if (suggestionActions.length > 0) {
        result.push({
          id: 'suggestions',
          title: localQuery.trim() ? 'Suggestions' : 'Recent & Popular',
          actions: suggestionActions,
          bordered: true,
        });
      }

      // Actions section
      if (actionActions.length > 0) {
        result.push({
          id: 'actions',
          actions: actionActions,
          bordered: true,
        });
      }

      // Clear section
      if (clearActions.length > 0) {
        result.push({
          id: 'clear',
          actions: clearActions,
          bordered: false,
        });
      }

      return result;
    }, [
      scopeActions,
      filterActions,
      suggestionActions,
      actionActions,
      clearActions,
      localQuery,
    ]);

    // Custom header with search input
    const headerContent = React.useMemo(
      () => (
        <div className='space-y-3'>
          <div className='relative'>
            <Input
              value={localQuery}
              onChange={handleQueryChange}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className='pr-8'
              disabled={loading}
            />
            {loading && (
              <div className='absolute right-2 top-1/2 -translate-y-1/2'>
                <div className='w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
              </div>
            )}
            {!loading && localQuery.trim() && (
              <button
                onClick={() => {
                  setLocalQuery('');
                  onQueryChange?.('');
                }}
                className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
              >
                ✕
              </button>
            )}
          </div>

          {/* Active filters display */}
          {filters.some(f => f.active) && (
            <div className='flex flex-wrap gap-1'>
              {filters
                .filter(f => f.active)
                .map(filter => (
                  <Badge
                    key={filter.id}
                    color='n500'
                    className='text-xs cursor-pointer hover:bg-muted'
                    onClick={() => onFilterToggle?.(filter.id)}
                    text={`${filter.icon ? filter.icon + ' ' : ''}${filter.label} ✕`}
                  />
                ))}
            </div>
          )}
        </div>
      ),
      [
        localQuery,
        handleQueryChange,
        handleKeyPress,
        placeholder,
        loading,
        filters,
        onQueryChange,
        onFilterToggle,
      ]
    );

    return (
      <Menu
        ref={ref}
        title='Search'
        sections={sections}
        showSectionBorders={true}
        headerContent={headerContent}
        {...props}
      >
        {children}
      </Menu>
    );
  }
);

MenuSearch.displayName = 'MenuSearch';

export { MenuSearch };
export type { SearchFilter, SearchSuggestion, SearchScope };
