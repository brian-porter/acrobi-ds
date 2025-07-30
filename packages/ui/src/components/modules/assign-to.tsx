import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { useSheet } from '../providers/sheet-provider';
import { SecHead } from '../structures/sec-head';
import { Button } from '../primitives/button';
import { Input } from '../primitives/input';
import { Avatar } from '../primitives/avatar';
import { Badge } from '../primitives/badge';
import { Chip } from '../primitives/chip';
import { EmptyState } from '../structures/empty-state';

const assignToVariants = cva('w-full h-full flex flex-col', {
  variants: {
    variant: {
      default: '',
      compact: 'max-h-[600px]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface Person {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  role?: string;
  online?: boolean;
}

export interface Group {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
  memberCount?: number;
  privacy?: 'public' | 'private';
}

type AssignableItem = Person | Group;
type TabType = 'people' | 'groups';

export interface AssignToProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof assignToVariants> {
  /**
   * Available people to assign to
   */
  people?: Person[];
  /**
   * Available groups to assign to
   */
  groups?: Group[];
  /**
   * Currently selected people/groups
   */
  selected?: string[];
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selected: string[]) => void;
  /**
   * Callback when assignment is confirmed
   */
  onAssign?: (selectedIds: string[], selectedItems: AssignableItem[]) => void;
  /**
   * Active tab
   * @default "people"
   */
  activeTab?: TabType;
  /**
   * Callback when tab changes
   */
  onTabChange?: (tab: TabType) => void;
  /**
   * Maximum number of selections allowed
   */
  maxSelections?: number;
  /**
   * Whether to show search functionality
   * @default true
   */
  showSearch?: boolean;
  /**
   * Search placeholder text
   */
  searchPlaceholder?: string;
  /**
   * Custom title
   */
  title?: string;
  /**
   * Whether multi-selection is enabled
   * @default true
   */
  multiSelect?: boolean;
  /**
   * Loading state
   */
  loading?: boolean;
}

const AssignTo = React.forwardRef<HTMLDivElement, AssignToProps>(
  (
    {
      className,
      people = [],
      groups = [],
      selected = [],
      onSelectionChange,
      onAssign,
      activeTab = 'people',
      onTabChange,
      maxSelections,
      showSearch = true,
      searchPlaceholder,
      title = 'Assign To',
      multiSelect = true,
      loading = false,
      variant,
      ...props
    },
    ref
  ) => {
    const { closeSheet } = useSheet();

    const [internalTab, setInternalTab] = React.useState<TabType>(activeTab);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [internalSelected, setInternalSelected] =
      React.useState<string[]>(selected);

    const isControlledTab = onTabChange !== undefined;
    const isControlledSelection = onSelectionChange !== undefined;

    const currentTab = isControlledTab ? activeTab : internalTab;
    const currentSelected = isControlledSelection ? selected : internalSelected;

    // Filter items based on search
    const filteredPeople = React.useMemo(() => {
      if (!searchQuery) return people;
      const query = searchQuery.toLowerCase();
      return people.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.email?.toLowerCase().includes(query) ||
          person.role?.toLowerCase().includes(query)
      );
    }, [people, searchQuery]);

    const filteredGroups = React.useMemo(() => {
      if (!searchQuery) return groups;
      const query = searchQuery.toLowerCase();
      return groups.filter(
        group =>
          group.name.toLowerCase().includes(query) ||
          group.description?.toLowerCase().includes(query)
      );
    }, [groups, searchQuery]);

    const currentItems =
      currentTab === 'people' ? filteredPeople : filteredGroups;
    const currentSearchPlaceholder =
      searchPlaceholder ||
      `Search ${currentTab === 'people' ? 'people' : 'groups'}...`;

    // Get selected items for display
    const selectedItems = React.useMemo(() => {
      const allItems = [...people, ...groups];
      return currentSelected
        .map(id => allItems.find(item => item.id === id))
        .filter(Boolean) as AssignableItem[];
    }, [currentSelected, people, groups]);

    // Handle tab change
    const handleTabChange = React.useCallback(
      (tab: TabType) => {
        if (isControlledTab) {
          onTabChange?.(tab);
        } else {
          setInternalTab(tab);
        }
      },
      [isControlledTab, onTabChange]
    );

    // Handle selection
    const handleSelect = React.useCallback(
      (id: string) => {
        let newSelected: string[];

        if (multiSelect) {
          if (currentSelected.includes(id)) {
            newSelected = currentSelected.filter(
              selectedId => selectedId !== id
            );
          } else {
            newSelected =
              maxSelections && currentSelected.length >= maxSelections
                ? currentSelected
                : [...currentSelected, id];
          }
        } else {
          newSelected = currentSelected.includes(id) ? [] : [id];
        }

        if (isControlledSelection) {
          onSelectionChange?.(newSelected);
        } else {
          setInternalSelected(newSelected);
        }
      },
      [
        currentSelected,
        multiSelect,
        maxSelections,
        isControlledSelection,
        onSelectionChange,
      ]
    );

    // Handle assign
    const handleAssign = React.useCallback(() => {
      onAssign?.(currentSelected, selectedItems);
      closeSheet();
    }, [currentSelected, selectedItems, onAssign, closeSheet]);

    // Handle cancel
    const handleCancel = React.useCallback(() => {
      closeSheet();
    }, [closeSheet]);

    // Render item
    const renderItem = React.useCallback(
      (item: AssignableItem) => {
        const isSelected = currentSelected.includes(item.id);
        const isPerson = 'email' in item;

        return (
          <button
            key={item.id}
            type='button'
            className={cn(
              'w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left',
              'hover:bg-accent hover:border-accent-foreground/20',
              isSelected && 'bg-primary/10 border-primary'
            )}
            onClick={() => handleSelect(item.id)}
          >
            <Avatar
              src={item.avatar}
              alt={item.name}
              fallback={item.name.charAt(0).toUpperCase()}
              size='sm'
            />

            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2'>
                <span className='font-medium truncate'>{item.name}</span>
                {isPerson && (item as Person).online && (
                  <div className='w-2 h-2 bg-green-500 rounded-full' />
                )}
              </div>

              {isPerson ? (
                <div className='text-sm text-muted-foreground'>
                  {(item as Person).email || (item as Person).role}
                </div>
              ) : (
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <span>{(item as Group).memberCount} members</span>
                  {(item as Group).privacy === 'private' && (
                    <Badge color='n500' text='Private' className='text-xs' />
                  )}
                </div>
              )}
            </div>

            {isSelected && (
              <div className='w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center'>
                <span className='text-xs'>✓</span>
              </div>
            )}
          </button>
        );
      },
      [currentSelected, handleSelect]
    );

    // Render empty state
    const renderEmptyState = React.useCallback(() => {
      const hasSearch = searchQuery.length > 0;
      const itemType = currentTab === 'people' ? 'people' : 'groups';

      return (
        <EmptyState
          icon={hasSearch ? '🔍' : currentTab === 'people' ? '👤' : '👥'}
          title={
            hasSearch ? `No ${itemType} found` : `No ${itemType} available`
          }
          description={
            hasSearch
              ? `Try adjusting your search terms`
              : `There are no ${itemType} to assign to`
          }
        />
      );
    }, [searchQuery, currentTab]);

    return (
      <div
        ref={ref}
        className={cn(assignToVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className='pb-4 border-b'>
          <SecHead title={title} titleIcon='👥' size='lg' />

          {/* Selected chips */}
          {currentSelected.length > 0 && (
            <div className='mt-4 space-y-2'>
              <p className='text-sm font-medium'>
                Selected ({currentSelected.length}):
              </p>
              <div className='flex flex-wrap gap-2'>
                {selectedItems.map(item => (
                  <Chip
                    key={item.id}
                    variant='secondary'
                    onRemove={() => handleSelect(item.id)}
                  >
                    {item.name}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className='flex border-b'>
          <button
            type='button'
            className={cn(
              'flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors',
              currentTab === 'people'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
            onClick={() => handleTabChange('people')}
          >
            People ({people.length})
          </button>
          <button
            type='button'
            className={cn(
              'flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors',
              currentTab === 'groups'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
            onClick={() => handleTabChange('groups')}
          >
            Groups ({groups.length})
          </button>
        </div>

        {/* Search */}
        {showSearch && (
          <div className='p-4 border-b'>
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={currentSearchPlaceholder}
              leftIcon='🔍'
            />
          </div>
        )}

        {/* Content */}
        <div className='flex-1 overflow-auto p-4'>
          {loading ? (
            <div className='space-y-3'>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className='flex items-center gap-3 p-3'>
                  <div className='w-8 h-8 bg-muted rounded-full animate-pulse' />
                  <div className='flex-1 space-y-2'>
                    <div className='h-4 bg-muted rounded animate-pulse' />
                    <div className='h-3 bg-muted rounded w-2/3 animate-pulse' />
                  </div>
                </div>
              ))}
            </div>
          ) : currentItems.length === 0 ? (
            renderEmptyState()
          ) : (
            <div className='space-y-2'>{currentItems.map(renderItem)}</div>
          )}
        </div>

        {/* Actions */}
        <div className='p-4 border-t flex gap-3'>
          <Button variant='outline' onClick={handleCancel} className='flex-1'>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={currentSelected.length === 0}
            className='flex-1'
          >
            Assign ({currentSelected.length})
          </Button>
        </div>
      </div>
    );
  }
);

AssignTo.displayName = 'AssignTo';

export { AssignTo, assignToVariants };
