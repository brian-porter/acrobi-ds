import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ListItem } from './list-item';
import { Icon } from '../primitives/icon';

const menuAccordionVariants = cva('w-full space-y-1', {
  variants: {
    variant: {
      default: '',
      nested: 'pl-4 border-l border-border',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface CategoryNode {
  /**
   * Unique identifier for the category
   */
  id: string;
  /**
   * Display name for the category
   */
  name: string;
  /**
   * Optional icon for the category
   */
  icon?: string;
  /**
   * Child categories
   */
  children?: CategoryNode[];
  /**
   * Whether this category is selectable
   * @default true
   */
  selectable?: boolean;
  /**
   * Custom data associated with the category
   */
  data?: Record<string, any>;
}

export interface MenuAccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof menuAccordionVariants> {
  /**
   * Hierarchical category structure
   */
  categories: CategoryNode[];
  /**
   * Currently selected category ID
   */
  selectedId?: string;
  /**
   * Callback when a category is selected
   */
  onSelect?: (category: CategoryNode) => void;
  /**
   * Expanded category IDs
   */
  expandedIds?: string[];
  /**
   * Callback when category expansion changes
   */
  onExpandedChange?: (expandedIds: string[]) => void;
  /**
   * Delay before revealing next step
   * @default 250
   */
  expandDelay?: number;
  /**
   * Maximum nesting level to display
   * @default 3
   */
  maxDepth?: number;
  /**
   * Whether to auto-expand on selection
   * @default true
   */
  autoExpand?: boolean;
  /**
   * Custom empty state message
   */
  emptyMessage?: string;
}

const MenuAccordion = React.forwardRef<HTMLDivElement, MenuAccordionProps>(
  (
    {
      className,
      categories = [],
      selectedId,
      onSelect,
      expandedIds = [],
      onExpandedChange,
      expandDelay = 250,
      maxDepth = 3,
      autoExpand = true,
      emptyMessage = 'No categories available',
      variant,
      ...props
    },
    ref
  ) => {
    const [internalExpandedIds, setInternalExpandedIds] =
      React.useState<string[]>(expandedIds);

    const isControlled = onExpandedChange !== undefined;
    const currentExpandedIds = isControlled ? expandedIds : internalExpandedIds;

    const toggleExpanded = React.useCallback(
      (categoryId: string) => {
        const newExpandedIds = currentExpandedIds.includes(categoryId)
          ? currentExpandedIds.filter(id => id !== categoryId)
          : [...currentExpandedIds, categoryId];

        if (isControlled) {
          onExpandedChange?.(newExpandedIds);
        } else {
          setInternalExpandedIds(newExpandedIds);
        }
      },
      [currentExpandedIds, isControlled, onExpandedChange]
    );

    const handleSelect = React.useCallback(
      (category: CategoryNode) => {
        if (category.selectable !== false) {
          onSelect?.(category);

          // Auto-expand if category has children
          if (autoExpand && category.children && category.children.length > 0) {
            setTimeout(() => {
              toggleExpanded(category.id);
            }, expandDelay);
          }
        }
      },
      [onSelect, autoExpand, expandDelay, toggleExpanded]
    );

    const renderCategory = React.useCallback(
      (category: CategoryNode, depth: number = 0): React.ReactNode => {
        if (depth >= maxDepth) return null;

        const hasChildren = category.children && category.children.length > 0;
        const isExpanded = currentExpandedIds.includes(category.id);
        const isSelected = selectedId === category.id;

        return (
          <div key={category.id} className='space-y-1'>
            <ListItem
              className={cn(
                'cursor-pointer transition-colors',
                depth > 0 && 'ml-4',
                isSelected && 'bg-accent text-accent-foreground'
              )}
              onClick={() => handleSelect(category)}
              prefix={
                category.icon ? (
                  <span className='text-lg' aria-hidden='true'>
                    {category.icon}
                  </span>
                ) : undefined
              }
              suffix={
                hasChildren ? (
                  <button
                    type='button'
                    className='p-1 hover:bg-accent rounded transition-colors'
                    onClick={e => {
                      e.stopPropagation();
                      toggleExpanded(category.id);
                    }}
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    <Icon
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size='sm'
                    />
                  </button>
                ) : isSelected ? (
                  <Icon name='check' size='sm' className='text-green-600' />
                ) : undefined
              }
            >
              {category.name}
            </ListItem>

            {hasChildren && isExpanded && (
              <div
                className={cn(
                  menuAccordionVariants({ variant: 'nested' }),
                  'animate-in slide-in-from-top-2 duration-200'
                )}
              >
                {category.children?.map(child =>
                  renderCategory(child, depth + 1)
                )}
              </div>
            )}
          </div>
        );
      },
      [maxDepth, currentExpandedIds, selectedId, handleSelect, toggleExpanded]
    );

    if (categories.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(menuAccordionVariants({ variant }), className)}
          {...props}
        >
          <div className='text-center py-8 text-muted-foreground'>
            {emptyMessage}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(menuAccordionVariants({ variant }), className)}
        {...props}
      >
        {categories.map(category => renderCategory(category))}
      </div>
    );
  }
);

MenuAccordion.displayName = 'MenuAccordion';

export { MenuAccordion, menuAccordionVariants };
