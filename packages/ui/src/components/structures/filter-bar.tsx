import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const filterBarVariants = cva(
  'flex items-center gap-2 p-4 bg-background border border-border rounded-lg',
  {
    variants: {
      size: {
        sm: 'gap-1.5 p-3 text-xs',
        default: 'gap-2 p-4 text-sm',
        lg: 'gap-3 p-5 text-base',
      },
      variant: {
        default: 'bg-background',
        card: 'bg-card shadow-sm',
        ghost: 'bg-transparent border-none p-0',
      },
      orientation: {
        horizontal: 'flex-row flex-wrap',
        vertical: 'flex-col items-stretch',
        stacked: 'flex-col sm:flex-row sm:items-center',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      orientation: 'horizontal',
    },
  }
);

export interface FilterField {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number' | 'boolean' | 'range';
  placeholder?: string;
  options?: { label: string; value: any }[];
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export interface FilterValue {
  field: string;
  value: any;
  operator?:
    | 'equals'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'gt'
    | 'lt'
    | 'gte'
    | 'lte'
    | 'between';
}

export interface FilterBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof filterBarVariants> {
  /**
   * Available filter fields
   */
  fields: FilterField[];
  /**
   * Current filter values
   */
  values?: FilterValue[];
  /**
   * Filter change handler
   */
  onFiltersChange?: (filters: FilterValue[]) => void;
  /**
   * Show clear all button
   */
  showClearAll?: boolean;
  /**
   * Clear all button text
   */
  clearAllText?: string;
  /**
   * Clear all handler
   */
  onClearAll?: () => void;
  /**
   * Show search input
   */
  showSearch?: boolean;
  /**
   * Search placeholder
   */
  searchPlaceholder?: string;
  /**
   * Search value
   */
  searchValue?: string;
  /**
   * Search change handler
   */
  onSearchChange?: (value: string) => void;
  /**
   * Additional actions (buttons)
   */
  actions?: React.ReactNode;
  /**
   * Whether to show filter count
   */
  showCount?: boolean;
  /**
   * Custom count text format
   */
  countText?: (count: number) => string;
  /**
   * Whether filters are collapsible
   */
  collapsible?: boolean;
  /**
   * Whether filters are initially collapsed
   */
  defaultCollapsed?: boolean;
  /**
   * Collapse toggle text
   */
  collapseText?: {
    show: string;
    hide: string;
  };
}

const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  (
    {
      className,
      size,
      variant,
      orientation,
      fields,
      values = [],
      onFiltersChange,
      showClearAll = true,
      clearAllText = 'Clear all',
      onClearAll,
      showSearch = false,
      searchPlaceholder = 'Search...',
      searchValue = '',
      onSearchChange,
      actions,
      showCount = false,
      countText = count => `${count} filter${count !== 1 ? 's' : ''} applied`,
      collapsible = false,
      defaultCollapsed = false,
      collapseText = { show: 'Show filters', hide: 'Hide filters' },
      ...props
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const [localSearchValue, setLocalSearchValue] = React.useState(searchValue);

    // Sync external search value
    React.useEffect(() => {
      setLocalSearchValue(searchValue);
    }, [searchValue]);

    // Get filter value helper
    const getFilterValue = (fieldKey: string) => {
      return values.find(v => v.field === fieldKey)?.value;
    };

    // Update filter value
    const updateFilter = (
      fieldKey: string,
      value: any,
      operator?: FilterValue['operator']
    ) => {
      if (!onFiltersChange) return;

      const existingFilterIndex = values.findIndex(v => v.field === fieldKey);
      let newFilters = [...values];

      if (
        value === undefined ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      ) {
        // Remove filter if value is empty
        if (existingFilterIndex >= 0) {
          newFilters.splice(existingFilterIndex, 1);
        }
      } else {
        // Add or update filter
        const newFilter: FilterValue = {
          field: fieldKey,
          value,
          operator: operator || 'equals',
        };

        if (existingFilterIndex >= 0) {
          newFilters[existingFilterIndex] = newFilter;
        } else {
          newFilters.push(newFilter);
        }
      }

      onFiltersChange(newFilters);
    };

    // Clear all filters
    const handleClearAll = () => {
      if (onClearAll) {
        onClearAll();
      } else if (onFiltersChange) {
        onFiltersChange([]);
      }

      if (onSearchChange) {
        onSearchChange('');
      }
    };

    // Search change handler
    const handleSearchChange = (value: string) => {
      setLocalSearchValue(value);
      onSearchChange?.(value);
    };

    // Render filter field
    const renderFilterField = (field: FilterField) => {
      const currentValue = getFilterValue(field.key);

      switch (field.type) {
        case 'text':
          return (
            <div key={field.key} className='flex flex-col gap-1'>
              <label className='text-xs font-medium text-muted-foreground'>
                {field.label}
              </label>
              <input
                type='text'
                value={currentValue || ''}
                onChange={e =>
                  updateFilter(field.key, e.target.value, 'contains')
                }
                placeholder={field.placeholder}
                disabled={field.disabled}
                className='h-8 px-3 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              />
            </div>
          );

        case 'select':
          return (
            <div key={field.key} className='flex flex-col gap-1'>
              <label className='text-xs font-medium text-muted-foreground'>
                {field.label}
              </label>
              <select
                value={currentValue || ''}
                onChange={e => updateFilter(field.key, e.target.value)}
                disabled={field.disabled}
                className='h-8 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              >
                <option value=''>{field.placeholder || 'Select...'}</option>
                {field.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );

        case 'date':
          return (
            <div key={field.key} className='flex flex-col gap-1'>
              <label className='text-xs font-medium text-muted-foreground'>
                {field.label}
              </label>
              <input
                type='date'
                value={currentValue || ''}
                onChange={e => updateFilter(field.key, e.target.value)}
                disabled={field.disabled}
                className='h-8 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              />
            </div>
          );

        case 'number':
          return (
            <div key={field.key} className='flex flex-col gap-1'>
              <label className='text-xs font-medium text-muted-foreground'>
                {field.label}
              </label>
              <input
                type='number'
                value={currentValue || ''}
                onChange={e =>
                  updateFilter(
                    field.key,
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                step={field.step}
                disabled={field.disabled}
                className='h-8 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              />
            </div>
          );

        case 'boolean':
          return (
            <div key={field.key} className='flex items-center gap-2'>
              <input
                type='checkbox'
                id={`filter-${field.key}`}
                checked={Boolean(currentValue)}
                onChange={e => updateFilter(field.key, e.target.checked)}
                disabled={field.disabled}
                className='h-4 w-4 rounded border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              />
              <label
                htmlFor={`filter-${field.key}`}
                className='text-sm font-medium text-foreground cursor-pointer'
              >
                {field.label}
              </label>
            </div>
          );

        case 'range':
          const rangeValue = currentValue || {};
          return (
            <div key={field.key} className='flex flex-col gap-1'>
              <label className='text-xs font-medium text-muted-foreground'>
                {field.label}
              </label>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  value={rangeValue.min || ''}
                  onChange={e =>
                    updateFilter(
                      field.key,
                      {
                        ...rangeValue,
                        min: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      },
                      'between'
                    )
                  }
                  placeholder='Min'
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  disabled={field.disabled}
                  className='h-8 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-20'
                />
                <span className='text-muted-foreground'>–</span>
                <input
                  type='number'
                  value={rangeValue.max || ''}
                  onChange={e =>
                    updateFilter(
                      field.key,
                      {
                        ...rangeValue,
                        max: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      },
                      'between'
                    )
                  }
                  placeholder='Max'
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  disabled={field.disabled}
                  className='h-8 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-20'
                />
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    const hasActiveFilters = values.length > 0 || localSearchValue.length > 0;

    return (
      <div
        className={cn(
          filterBarVariants({ size, variant, orientation }),
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Search */}
        {showSearch && (
          <div className='flex-shrink-0'>
            <div className='relative'>
              <svg
                className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
              <input
                type='text'
                value={localSearchValue}
                onChange={e => handleSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className='h-8 pl-9 pr-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-64'
              />
            </div>
          </div>
        )}

        {/* Collapse toggle */}
        {collapsible && (
          <button
            type='button'
            onClick={() => setIsCollapsed(!isCollapsed)}
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-3'
          >
            <svg
              className={cn(
                'h-4 w-4 mr-2 transition-transform',
                isCollapsed && 'rotate-180'
              )}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
            {isCollapsed ? collapseText.show : collapseText.hide}
          </button>
        )}

        {/* Filter fields */}
        {(!collapsible || !isCollapsed) && <>{fields.map(renderFilterField)}</>}

        {/* Count */}
        {showCount && values.length > 0 && (
          <div className='flex-shrink-0 text-sm text-muted-foreground'>
            {countText(values.length)}
          </div>
        )}

        {/* Clear all */}
        {showClearAll && hasActiveFilters && (
          <button
            type='button'
            onClick={handleClearAll}
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-3'
          >
            <svg
              className='h-4 w-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
            {clearAllText}
          </button>
        )}

        {/* Actions */}
        {actions && <div className='flex-shrink-0 ml-auto'>{actions}</div>}
      </div>
    );
  }
);

FilterBar.displayName = 'FilterBar';

export { FilterBar, filterBarVariants };
