import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';
import { Dialog } from '../primitives/dialog';
import { Input } from '../primitives/input';
import { Icon } from '../primitives/icon';
import { Badge } from '../primitives/badge';
import { Checkbox } from '../primitives/checkbox';

// Module: M-SearchDialog - Search and favorite items dialog
// PRD v11 Account Interface Module for comprehensive search and favorites management

const searchDialogVariants = cva(
  'bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-2xl max-h-[600px] flex flex-col',
  {
    variants: {
      state: {
        search: 'border border-gray-200',
        loading: 'border border-blue-200',
        results: 'border border-gray-200',
        empty: 'border border-gray-200',
        error: 'border border-red-200 bg-red-50',
      },
    },
    defaultVariants: {
      state: 'search',
    },
  }
);

const searchResultVariants = cva(
  'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm',
  {
    variants: {
      selected: {
        true: 'bg-blue-50 border-blue-200 ring-1 ring-blue-200',
        false: 'bg-white border-gray-200 hover:bg-gray-50',
      },
      favorited: {
        true: 'ring-1 ring-yellow-200',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
      favorited: false,
    },
  }
);

const categoryTabVariants = cva(
  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
  {
    variants: {
      active: {
        true: 'bg-blue-100 text-blue-700',
        false: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export type SearchItemType = 
  | 'user' 
  | 'content' 
  | 'collection' 
  | 'group' 
  | 'event' 
  | 'place' 
  | 'hashtag' 
  | 'file';

export interface SearchItem {
  id: string;
  type: SearchItemType;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  url?: string;
  metadata?: Record<string, any>;
  category?: string;
  tags?: string[];
  isFavorite: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SearchCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  color?: string;
}

export interface MSearchDialogProps extends VariantProps<typeof searchDialogVariants> {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string, filters?: SearchFilters) => Promise<SearchItem[]>;
  onSelect?: (items: SearchItem[]) => void;
  onFavorite?: (item: SearchItem, isFavorite: boolean) => Promise<void>;
  placeholder?: string;
  multiSelect?: boolean;
  showFavorites?: boolean;
  showCategories?: boolean;
  showFilters?: boolean;
  maxResults?: number;
  categories?: SearchCategory[];
  searchDelay?: number;
  className?: string;
}

export interface SearchFilters {
  category?: string;
  type?: SearchItemType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  favorites?: boolean;
}

const defaultCategories: SearchCategory[] = [
  { id: 'all', name: 'All', icon: 'search', count: 0 },
  { id: 'users', name: 'People', icon: 'users', count: 0, color: 'blue' },
  { id: 'content', name: 'Posts', icon: 'file-text', count: 0, color: 'green' },
  { id: 'collections', name: 'Collections', icon: 'folder', count: 0, color: 'purple' },
  { id: 'groups', name: 'Groups', icon: 'users', count: 0, color: 'orange' },
  { id: 'files', name: 'Files', icon: 'paperclip', count: 0, color: 'gray' },
];

export const MSearchDialog = React.forwardRef<HTMLDivElement, MSearchDialogProps>(
  ({
    isOpen,
    onClose,
    onSearch,
    onSelect,
    onFavorite,
    placeholder = 'Search for anything...',
    multiSelect = false,
    showFavorites = true,
    showCategories = true,
    showFilters = false,
    maxResults = 50,
    categories = defaultCategories,
    searchDelay = 300,
    state,
    className,
  }, ref) => {
    const [currentState, setCurrentState] = useState<'search' | 'loading' | 'results' | 'empty' | 'error'>('search');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<SearchItem[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [favoriteItems, setFavoriteItems] = useState<SearchItem[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

    // Update category counts based on results
    const updatedCategories = useMemo(() => {
      const counts: Record<string, number> = {};
      
      results.forEach(item => {
        const categoryKey = item.type + 's'; // Convert type to plural category key
        counts[categoryKey] = (counts[categoryKey] || 0) + 1;
        counts['all'] = (counts['all'] || 0) + 1;
      });

      return categories.map(cat => ({
        ...cat,
        count: counts[cat.id] || 0,
      }));
    }, [categories, results]);

    // Filter results based on active category
    const filteredResults = useMemo(() => {
      if (activeCategory === 'all') return results;
      
      const categoryTypeMap: Record<string, SearchItemType[]> = {
        users: ['user'],
        content: ['content'],
        collections: ['collection'],
        groups: ['group'],
        files: ['file'],
      };

      const allowedTypes = categoryTypeMap[activeCategory] || [];
      return results.filter(item => allowedTypes.includes(item.type));
    }, [results, activeCategory]);

    // Reset state when dialog opens/closes
    useEffect(() => {
      if (isOpen) {
        setCurrentState('search');
        setQuery('');
        setResults([]);
        setSelectedItems([]);
        setActiveCategory('all');
        setErrorMessage('');
      }
    }, [isOpen]);

    // Debounced search function
    const performSearch = useCallback(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setCurrentState('search');
        setResults([]);
        return;
      }

      setCurrentState('loading');

      try {
        const searchResults = await onSearch(searchQuery, searchFilters);
        const limitedResults = searchResults.slice(0, maxResults);
        
        setResults(limitedResults);
        setCurrentState(limitedResults.length > 0 ? 'results' : 'empty');

        // Add to recent searches
        setRecentSearches(prev => {
          const updated = [searchQuery, ...prev.filter(q => q !== searchQuery)];
          return updated.slice(0, 5); // Keep only 5 recent searches
        });
      } catch (error) {
        setCurrentState('error');
        setErrorMessage(error instanceof Error ? error.message : 'Search failed');
        console.error('Search error:', error);
      }
    }, [onSearch, searchFilters, maxResults]);

    // Handle search with debouncing
    const handleSearch = useCallback((searchQuery: string) => {
      setQuery(searchQuery);

      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      const timeout = setTimeout(() => {
        performSearch(searchQuery);
      }, searchDelay);

      setSearchTimeout(timeout);
    }, [performSearch, searchDelay, searchTimeout]);

    // Handle item selection
    const handleItemSelect = useCallback((item: SearchItem) => {
      if (multiSelect) {
        setSelectedItems(prev => {
          const isSelected = prev.some(selected => selected.id === item.id);
          if (isSelected) {
            return prev.filter(selected => selected.id !== item.id);
          } else {
            return [...prev, item];
          }
        });
      } else {
        setSelectedItems([item]);
        if (onSelect) {
          onSelect([item]);
        }
        onClose();
      }
    }, [multiSelect, onSelect, onClose]);

    // Handle favorite toggle
    const handleFavoriteToggle = useCallback(async (item: SearchItem, event: React.MouseEvent) => {
      event.stopPropagation();
      
      if (!onFavorite) return;

      try {
        const newFavoriteStatus = !item.isFavorite;
        await onFavorite(item, newFavoriteStatus);

        // Update the item in results
        setResults(prev => prev.map(result => 
          result.id === item.id 
            ? { ...result, isFavorite: newFavoriteStatus }
            : result
        ));

        // Update favorites list
        if (newFavoriteStatus) {
          setFavoriteItems(prev => [...prev, { ...item, isFavorite: true }]);
        } else {
          setFavoriteItems(prev => prev.filter(fav => fav.id !== item.id));
        }
      } catch (error) {
        console.error('Failed to toggle favorite:', error);
      }
    }, [onFavorite]);

    const handleCategoryChange = useCallback((categoryId: string) => {
      setActiveCategory(categoryId);
    }, []);

    const handleClose = useCallback(() => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      onClose();
    }, [onClose, searchTimeout]);

    const handleSelectAll = useCallback(() => {
      if (multiSelect) {
        onSelect?.(selectedItems);
        onClose();
      }
    }, [multiSelect, selectedItems, onSelect, onClose]);

    const getItemIcon = (type: SearchItemType): string => {
      const iconMap: Record<SearchItemType, string> = {
        user: 'user',
        content: 'file-text',
        collection: 'folder',
        group: 'users',
        event: 'calendar',
        place: 'map-pin',
        hashtag: 'hash',
        file: 'paperclip',
      };
      return iconMap[type] || 'circle';
    };

    const getTypeColor = (type: SearchItemType): string => {
      const colorMap: Record<SearchItemType, string> = {
        user: 'bg-blue-100 text-blue-600',
        content: 'bg-green-100 text-green-600',
        collection: 'bg-purple-100 text-purple-600',
        group: 'bg-orange-100 text-orange-600',
        event: 'bg-red-100 text-red-600',
        place: 'bg-yellow-100 text-yellow-600',
        hashtag: 'bg-pink-100 text-pink-600',
        file: 'bg-gray-100 text-gray-600',
      };
      return colorMap[type] || 'bg-gray-100 text-gray-600';
    };

    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <div ref={ref} className={cn(searchDialogVariants({ state: currentState }), className)}>
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Icon 
                  name={currentState === 'loading' ? 'loader' : 'search'} 
                  className={cn(
                    'h-4 w-4 text-gray-400',
                    currentState === 'loading' && 'animate-spin'
                  )} 
                />
              </div>
              <Input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={placeholder}
                className="pl-10 pr-4"
                autoFocus
              />
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <Icon name="x" className="h-4 w-4" />
            </Button>
          </div>

          {/* Categories */}
          {showCategories && (
            <div className="flex items-center gap-2 p-4 border-b border-gray-200 overflow-x-auto">
              {updatedCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(categoryTabVariants({ active: activeCategory === category.id }))}
                >
                  <div className="flex items-center gap-2">
                    <Icon name={category.icon as any} className="h-4 w-4" />
                    <span>{category.name}</span>
                    {category.count > 0 && (
                      <Badge variant="secondary" size="sm">{category.count}</Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {/* Search State - Recent searches and favorites */}
            {currentState === 'search' && (
              <div className="p-4 space-y-6">
                {recentSearches.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Searches</h3>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="flex items-center gap-3 w-full p-2 text-left rounded-lg hover:bg-gray-50"
                        >
                          <Icon name="clock" className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {showFavorites && favoriteItems.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Favorites</h3>
                    <div className="space-y-2">
                      {favoriteItems.slice(0, 5).map(item => (
                        <button
                          key={item.id}
                          onClick={() => handleItemSelect(item)}
                          className="flex items-center gap-3 w-full p-2 text-left rounded-lg hover:bg-gray-50"
                        >
                          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', getTypeColor(item.type))}>
                            <Icon name={getItemIcon(item.type) as any} className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">{item.title}</div>
                            {item.subtitle && (
                              <div className="text-sm text-gray-500 truncate">{item.subtitle}</div>
                            )}
                          </div>
                          <Icon name="star" className="h-4 w-4 text-yellow-500 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {recentSearches.length === 0 && favoriteItems.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <Icon name="search" className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Start searching</h3>
                    <p className="text-sm text-gray-500">
                      Enter a search term to find content, people, and more
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Loading State */}
            {currentState === 'loading' && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Icon name="loader" className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
                  <p className="text-sm text-gray-500">Searching...</p>
                </div>
              </div>
            )}

            {/* Results State */}
            {currentState === 'results' && (
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600">
                      {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} 
                      {activeCategory !== 'all' && ` in ${updatedCategories.find(c => c.id === activeCategory)?.name}`}
                    </div>
                    {multiSelect && selectedItems.length > 0 && (
                      <Badge variant="default">{selectedItems.length} selected</Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    {filteredResults.map(item => {
                      const isSelected = selectedItems.some(selected => selected.id === item.id);
                      
                      return (
                        <div
                          key={item.id}
                          className={cn(searchResultVariants({ 
                            selected: isSelected,
                            favorited: item.isFavorite 
                          }))}
                          onClick={() => handleItemSelect(item)}
                        >
                          {multiSelect && (
                            <Checkbox
                              checked={isSelected}
                              onChange={() => handleItemSelect(item)}
                              className="flex-shrink-0"
                            />
                          )}
                          
                          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', getTypeColor(item.type))}>
                            {item.image ? (
                              <img src={item.image} alt="" className="w-full h-full rounded-lg object-cover" />
                            ) : (
                              <Icon name={getItemIcon(item.type) as any} className="h-5 w-5" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-gray-900 truncate">{item.title}</h4>
                              <Badge variant="outline" size="sm">{item.type}</Badge>
                            </div>
                            {item.subtitle && (
                              <p className="text-sm text-gray-600 truncate mt-1">{item.subtitle}</p>
                            )}
                            {item.description && (
                              <p className="text-xs text-gray-500 truncate mt-1">{item.description}</p>
                            )}
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex gap-1 mt-2">
                                {item.tags.slice(0, 3).map(tag => (
                                  <Badge key={tag} variant="secondary" size="sm">#{tag}</Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          {showFavorites && onFavorite && (
                            <button
                              onClick={(e) => handleFavoriteToggle(item, e)}
                              className="flex-shrink-0 p-1 rounded hover:bg-gray-100"
                            >
                              <Icon 
                                name="star" 
                                className={cn(
                                  'h-4 w-4',
                                  item.isFavorite 
                                    ? 'text-yellow-500 fill-current' 
                                    : 'text-gray-400 hover:text-yellow-500'
                                )} 
                              />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {currentState === 'empty' && (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Icon name="search" className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your search or using different keywords
                </p>
              </div>
            )}

            {/* Error State */}
            {currentState === 'error' && (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <Icon name="alert-circle" className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Search Error</h3>
                <p className="text-sm text-gray-500 mb-4">{errorMessage}</p>
                <Button onClick={() => performSearch(query)}>
                  Try Again
                </Button>
              </div>
            )}
          </div>

          {/* Footer */}
          {multiSelect && selectedItems.length > 0 && (
            <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setSelectedItems([])}>
                  Clear
                </Button>
                <Button onClick={handleSelectAll}>
                  Select All
                </Button>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    );
  }
);

MSearchDialog.displayName = 'MSearchDialog';