import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const dataTableVariants = cva('w-full', {
  variants: {
    variant: {
      default: '',
      bordered: 'border border-border rounded-lg overflow-hidden',
      striped: '[&_tbody_tr:nth-child(even)]:bg-muted/50',
      compact: '[&_td]:py-2 [&_th]:py-2',
    },
    size: {
      sm: 'text-xs [&_td]:px-2 [&_th]:px-2 [&_td]:py-1.5 [&_th]:py-1.5',
      default: 'text-sm [&_td]:px-4 [&_th]:px-4 [&_td]:py-3 [&_th]:py-3',
      lg: 'text-base [&_td]:px-6 [&_th]:px-6 [&_td]:py-4 [&_th]:py-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type SortDirection = 'asc' | 'desc' | null;

export interface DataTableColumn<T = any> {
  key: string;
  header: React.ReactNode;
  accessorKey?: keyof T;
  accessorFn?: (item: T) => any;
  cell?: (props: {
    value: any;
    row: T;
    column: DataTableColumn<T>;
  }) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  align?: 'left' | 'center' | 'right';
  className?: string;
  headerClassName?: string;
}

export interface DataTableSort {
  column: string;
  direction: SortDirection;
}

export interface DataTableFilter {
  column: string;
  value: any;
  operator?:
    | 'equals'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'gt'
    | 'lt'
    | 'gte'
    | 'lte';
}

export interface DataTablePagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface DataTableAction<T = any> {
  label: string;
  onClick: (row: T) => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'ghost';
  disabled?: (row: T) => boolean;
}

export interface DataTableProps<T = any>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'data'>,
    VariantProps<typeof dataTableVariants> {
  /**
   * Table data
   */
  data: T[];
  /**
   * Column definitions
   */
  columns: DataTableColumn<T>[];
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Loading text
   */
  loadingText?: string;
  /**
   * Empty state content
   */
  emptyContent?: React.ReactNode;
  /**
   * Row selection
   */
  selectable?: boolean;
  /**
   * Selected row keys
   */
  selectedRows?: string[];
  /**
   * Row key accessor
   */
  getRowKey?: (row: T) => string;
  /**
   * Selection change handler
   */
  onSelectionChange?: (selectedRows: string[]) => void;
  /**
   * Row actions
   */
  actions?: DataTableAction<T>[];
  /**
   * Show actions on hover only
   */
  showActionsOnHover?: boolean;
  /**
   * Sorting configuration
   */
  sorting?: DataTableSort[];
  /**
   * Sort change handler
   */
  onSortingChange?: (sorting: DataTableSort[]) => void;
  /**
   * Filtering configuration
   */
  filters?: DataTableFilter[];
  /**
   * Filter change handler
   */
  onFiltersChange?: (filters: DataTableFilter[]) => void;
  /**
   * Pagination configuration
   */
  pagination?: DataTablePagination;
  /**
   * Pagination change handler
   */
  onPaginationChange?: (pagination: DataTablePagination) => void;
  /**
   * Row click handler
   */
  onRowClick?: (row: T) => void;
  /**
   * Custom row className
   */
  rowClassName?: (row: T) => string;
  /**
   * Whether rows are clickable
   */
  rowsClickable?: boolean;
  /**
   * Custom table caption
   */
  caption?: React.ReactNode;
  /**
   * Show table header
   */
  showHeader?: boolean;
  /**
   * Sticky header
   */
  stickyHeader?: boolean;
  /**
   * Table height (for sticky header)
   */
  height?: string | number;
}

const DataTable = <T extends Record<string, any>>({
  className,
  variant,
  size,
  data,
  columns,
  loading = false,
  loadingText = 'Loading...',
  emptyContent,
  selectable = false,
  selectedRows = [],
  getRowKey = (row: T) => row.id?.toString() || JSON.stringify(row),
  onSelectionChange,
  actions,
  showActionsOnHover = false,
  sorting = [],
  onSortingChange,
  filters = [],
  onFiltersChange,
  pagination,
  onPaginationChange,
  onRowClick,
  rowClassName,
  rowsClickable = false,
  caption,
  showHeader = true,
  stickyHeader = false,
  height,
  ...props
}: DataTableProps<T>) => {
  // Get cell value helper
  const getCellValue = (row: T, column: DataTableColumn<T>) => {
    if (column.accessorFn) {
      return column.accessorFn(row);
    }
    if (column.accessorKey) {
      return row[column.accessorKey];
    }
    return row[column.key as keyof T];
  };

  // Handle sorting
  const handleSort = (column: DataTableColumn<T>) => {
    if (!column.sortable || !onSortingChange) return;

    const existingSort = sorting.find(s => s.column === column.key);
    let newSorting: DataTableSort[];

    if (!existingSort) {
      newSorting = [...sorting, { column: column.key, direction: 'asc' }];
    } else if (existingSort.direction === 'asc') {
      newSorting = sorting.map(s =>
        s.column === column.key ? { ...s, direction: 'desc' as const } : s
      );
    } else {
      newSorting = sorting.filter(s => s.column !== column.key);
    }

    onSortingChange(newSorting);
  };

  // Handle row selection
  const handleRowSelection = (rowKey: string, selected: boolean) => {
    if (!onSelectionChange) return;

    const newSelection = selected
      ? [...selectedRows, rowKey]
      : selectedRows.filter(key => key !== rowKey);

    onSelectionChange(newSelection);
  };

  // Handle select all
  const handleSelectAll = (selected: boolean) => {
    if (!onSelectionChange) return;

    const newSelection = selected ? data.map(getRowKey) : [];
    onSelectionChange(newSelection);
  };

  const isAllSelected = data.length > 0 && selectedRows.length === data.length;
  const isIndeterminate =
    selectedRows.length > 0 && selectedRows.length < data.length;

  // Loading state
  if (loading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <div className='flex items-center space-x-2'>
          <div className='h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent' />
          <span className='text-sm text-muted-foreground'>{loadingText}</span>
        </div>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        {emptyContent || (
          <div className='space-y-2'>
            <div className='h-8 w-8 rounded-full bg-muted flex items-center justify-center'>
              <svg
                className='h-4 w-4 text-muted-foreground'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
            </div>
            <p className='text-sm text-muted-foreground'>No data available</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(dataTableVariants({ variant, size }), className)}
      style={{ height }}
      {...props}
    >
      <div
        className={cn('relative', stickyHeader && height && 'overflow-auto')}
      >
        <table className='w-full caption-bottom text-sm'>
          {caption && (
            <caption className='mt-4 text-sm text-muted-foreground'>
              {caption}
            </caption>
          )}

          {showHeader && (
            <thead
              className={cn(
                '[&_tr]:border-b',
                stickyHeader &&
                  'sticky top-0 bg-background z-10 border-b shadow-sm'
              )}
            >
              <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
                {selectable && (
                  <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                    <input
                      type='checkbox'
                      checked={isAllSelected}
                      ref={input => {
                        if (input) input.indeterminate = isIndeterminate;
                      }}
                      onChange={e => handleSelectAll(e.target.checked)}
                      className='h-4 w-4 rounded border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    />
                  </th>
                )}

                {columns.map(column => {
                  const sort = sorting.find(s => s.column === column.key);

                  return (
                    <th
                      key={column.key}
                      className={cn(
                        'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right',
                        column.sortable &&
                          'cursor-pointer select-none hover:text-foreground',
                        column.headerClassName
                      )}
                      style={{
                        width: column.width,
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                      }}
                      onClick={() => handleSort(column)}
                    >
                      <div className='flex items-center space-x-2'>
                        <span>{column.header}</span>
                        {column.sortable && (
                          <div className='flex flex-col'>
                            <svg
                              className={cn(
                                'h-3 w-3 transition-colors',
                                sort?.direction === 'asc'
                                  ? 'text-foreground'
                                  : 'text-muted-foreground/50'
                              )}
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M5 15l7-7 7 7'
                              />
                            </svg>
                            <svg
                              className={cn(
                                'h-3 w-3 -mt-1 transition-colors',
                                sort?.direction === 'desc'
                                  ? 'text-foreground'
                                  : 'text-muted-foreground/50'
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
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}

                {actions && actions.length > 0 && (
                  <th className='h-12 px-4 text-right align-middle font-medium text-muted-foreground'>
                    Actions
                  </th>
                )}
              </tr>
            </thead>
          )}

          <tbody className='[&_tr:last-child]:border-0'>
            {data.map((row, index) => {
              const rowKey = getRowKey(row);
              const isSelected = selectedRows.includes(rowKey);
              const isClickable = rowsClickable || Boolean(onRowClick);

              return (
                <tr
                  key={rowKey}
                  className={cn(
                    'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted group',
                    isClickable && 'cursor-pointer',
                    isSelected && 'bg-muted',
                    rowClassName?.(row)
                  )}
                  onClick={() => onRowClick?.(row)}
                  data-state={isSelected ? 'selected' : undefined}
                >
                  {selectable && (
                    <td className='p-4 align-middle [&:has([role=checkbox])]:pr-0'>
                      <input
                        type='checkbox'
                        checked={isSelected}
                        onChange={e =>
                          handleRowSelection(rowKey, e.target.checked)
                        }
                        onClick={e => e.stopPropagation()}
                        className='h-4 w-4 rounded border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                      />
                    </td>
                  )}

                  {columns.map(column => {
                    const value = getCellValue(row, column);

                    return (
                      <td
                        key={column.key}
                        className={cn(
                          'p-4 align-middle [&:has([role=checkbox])]:pr-0',
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right',
                          column.className
                        )}
                        style={{
                          width: column.width,
                          minWidth: column.minWidth,
                          maxWidth: column.maxWidth,
                        }}
                      >
                        {column.cell
                          ? column.cell({ value, row, column })
                          : value}
                      </td>
                    );
                  })}

                  {actions && actions.length > 0 && (
                    <td className='p-4 align-middle text-right'>
                      <div
                        className={cn(
                          'flex items-center justify-end space-x-2',
                          showActionsOnHover &&
                            'opacity-0 group-hover:opacity-100 transition-opacity'
                        )}
                      >
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            type='button'
                            onClick={e => {
                              e.stopPropagation();
                              action.onClick(row);
                            }}
                            disabled={action.disabled?.(row)}
                            className={cn(
                              'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                              {
                                'h-8 w-8 border border-input bg-background hover:bg-accent hover:text-accent-foreground':
                                  action.variant === 'default' ||
                                  !action.variant,
                                'h-8 w-8 bg-destructive text-destructive-foreground hover:bg-destructive/90':
                                  action.variant === 'destructive',
                                'h-8 w-8 hover:bg-accent hover:text-accent-foreground':
                                  action.variant === 'ghost',
                              }
                            )}
                            title={action.label}
                          >
                            {action.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className='flex items-center justify-between space-x-2 py-4'>
          <div className='text-sm text-muted-foreground'>
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{' '}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)}{' '}
            of {pagination.total} entries
          </div>

          <div className='flex items-center space-x-2'>
            <button
              type='button'
              onClick={() =>
                onPaginationChange?.({
                  ...pagination,
                  page: pagination.page - 1,
                })
              }
              disabled={pagination.page <= 1}
              className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3'
            >
              Previous
            </button>

            <div className='text-sm font-medium'>
              Page {pagination.page} of{' '}
              {Math.ceil(pagination.total / pagination.pageSize)}
            </div>

            <button
              type='button'
              onClick={() =>
                onPaginationChange?.({
                  ...pagination,
                  page: pagination.page + 1,
                })
              }
              disabled={
                pagination.page >=
                Math.ceil(pagination.total / pagination.pageSize)
              }
              className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3'
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

DataTable.displayName = 'DataTable';

export { DataTable, dataTableVariants };
