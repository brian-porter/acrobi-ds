# DataTable

Full-featured table component with sorting, filtering, pagination, and selection capabilities.

## Overview

DataTable is a comprehensive structure component for displaying tabular data with advanced features like sorting, filtering, pagination, row selection, and custom cell rendering. It's designed for complex data management interfaces.

## Basic Usage

```tsx
import { DataTable } from '@acrobi/ui';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      key: 'name',
      header: 'Name',
      sortable: true
    },
    {
      key: 'email',
      header: 'Email',
      filterable: true
    },
    {
      key: 'role',
      header: 'Role'
    },
    {
      key: 'status',
      header: 'Status',
      cell: ({ value }) => (
        <Badge variant={value === 'active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      )
    }
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      loading={loading}
      pagination={{
        page: 1,
        pageSize: 10,
        total: users.length
      }}
    />
  );
}
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array<Record<string, any>>` | `[]` | Table data array |
| `columns` | `ColumnConfig[]` | `[]` | Column configuration |
| `loading` | `boolean` | `false` | Loading state |
| `error` | `string` | - | Error message |
| `emptyMessage` | `string` | `'No data available'` | Empty state message |

### Selection Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectable` | `boolean` | `false` | Enable row selection |
| `selectedRows` | `string[]` | `[]` | Selected row IDs |
| `onSelectionChange` | `function` | - | Selection change handler |
| `selectMode` | `'single' \| 'multiple'` | `'multiple'` | Selection mode |

### Pagination Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pagination` | `PaginationConfig` | - | Pagination configuration |
| `onPageChange` | `function` | - | Page change handler |
| `onPageSizeChange` | `function` | - | Page size change handler |

### Sorting & Filtering Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sorting` | `boolean` | `false` | Enable sorting |
| `onSortChange` | `function` | - | Sort change handler |
| `filtering` | `boolean` | `false` | Enable filtering |
| `onFilterChange` | `function` | - | Filter change handler |

## Column Configuration

```tsx
interface ColumnConfig {
  key: string;
  header: string;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  cell?: (props: CellProps) => ReactNode;
  headerCell?: (props: HeaderProps) => ReactNode;
  align?: 'left' | 'center' | 'right';
  sticky?: 'left' | 'right';
}

interface CellProps {
  value: any;
  row: Record<string, any>;
  column: ColumnConfig;
  rowIndex: number;
  columnIndex: number;
}
```

## Examples

### Basic Table

```tsx
const columns = [
  { key: 'id', header: 'ID', width: 80 },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', filterable: true },
  { key: 'createdAt', header: 'Created', sortable: true }
];

<DataTable
  data={users}
  columns={columns}
/>
```

### With Custom Cell Rendering

```tsx
const columns = [
  {
    key: 'avatar',
    header: '',
    width: 60,
    cell: ({ row }) => (
      <Avatar src={row.avatar} fallback={row.name[0]} size="sm" />
    )
  },
  {
    key: 'name',
    header: 'User',
    cell: ({ value, row }) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-gray-500">{row.email}</div>
      </div>
    )
  },
  {
    key: 'status',
    header: 'Status',
    cell: ({ value }) => (
      <Badge variant={value === 'active' ? 'success' : 'warning'}>
        {value}
      </Badge>
    )
  },
  {
    key: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <ButtonPanel
        size="sm"
        buttons={[
          { label: 'Edit', onClick: () => editUser(row.id) },
          { label: 'Delete', onClick: () => deleteUser(row.id), variant: 'destructive' }
        ]}
      />
    )
  }
];
```

### With Selection

```tsx
function SelectableTable() {
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <DataTable
      data={users}
      columns={columns}
      selectable
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
      selectMode="multiple"
    />
  );
}
```

### With Sorting and Filtering

```tsx
function SortableFilterableTable() {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({});

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
    // Apply sorting logic
  };

  const handleFilter = (key, value) => {
    setFilters({ ...filters, [key]: value });
    // Apply filtering logic
  };

  return (
    <DataTable
      data={filteredAndSortedUsers}
      columns={columns}
      sorting
      onSortChange={handleSort}
      filtering
      onFilterChange={handleFilter}
    />
  );
}
```

### With Pagination

```tsx
function PaginatedTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  return (
    <DataTable
      data={users}
      columns={columns}
      pagination={{
        page: currentPage,
        pageSize: pageSize,
        total: totalItems,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: [10, 20, 50, 100]
      }}
      onPageChange={setCurrentPage}
      onPageSizeChange={setPageSize}
    />
  );
}
```

### Sticky Columns

```tsx
const columns = [
  {
    key: 'name',
    header: 'Name',
    sticky: 'left',
    width: 200
  },
  { key: 'email', header: 'Email' },
  { key: 'department', header: 'Department' },
  { key: 'role', header: 'Role' },
  { key: 'salary', header: 'Salary' },
  {
    key: 'actions',
    header: 'Actions',
    sticky: 'right',
    width: 120
  }
];

<DataTable
  data={employees}
  columns={columns}
  className="max-w-4xl"
/>
```

### Loading and Error States

```tsx
function StatefulTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loading}
      error={error}
      emptyMessage="No users found"
      loadingMessage="Loading users..."
    />
  );
}
```

### Expandable Rows

```tsx
const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  {
    key: 'expand',
    header: '',
    width: 50,
    cell: ({ row, expanded, onToggle }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
      >
        {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>
    )
  }
];

<DataTable
  data={users}
  columns={columns}
  expandable
  renderExpandedRow={(row) => (
    <div className="p-4 bg-gray-50">
      <h4 className="font-medium mb-2">Additional Details</h4>
      <p>Phone: {row.phone}</p>
      <p>Address: {row.address}</p>
      <p>Notes: {row.notes}</p>
    </div>
  )}
/>
```

## Advanced Features

### Virtual Scrolling

For large datasets:

```tsx
<DataTable
  data={largeDataset}
  columns={columns}
  virtualScrolling
  rowHeight={50}
  containerHeight={400}
/>
```

### Column Resizing

```tsx
const columns = [
  {
    key: 'name',
    header: 'Name',
    resizable: true,
    minWidth: 100,
    maxWidth: 300
  },
  // ... other columns
];

<DataTable
  data={data}
  columns={columns}
  columnResizing
  onColumnResize={(key, width) => {
    // Save column width preferences
  }}
/>
```

### Row Actions

```tsx
<DataTable
  data={users}
  columns={columns}
  rowActions={[
    {
      label: 'Edit',
      onClick: (row) => editUser(row.id),
      icon: <EditIcon />
    },
    {
      label: 'Delete',
      onClick: (row) => deleteUser(row.id),
      icon: <DeleteIcon />,
      variant: 'destructive',
      confirm: {
        title: 'Delete User',
        message: 'Are you sure you want to delete this user?'
      }
    }
  ]}
/>
```

### Bulk Actions

```tsx
function TableWithBulkActions() {
  const [selectedRows, setSelectedRows] = useState([]);

  const bulkActions = [
    {
      label: 'Export Selected',
      onClick: (rows) => exportUsers(rows),
      icon: <DownloadIcon />
    },
    {
      label: 'Delete Selected',
      onClick: (rows) => deleteUsers(rows),
      icon: <TrashIcon />,
      variant: 'destructive'
    }
  ];

  return (
    <div>
      {selectedRows.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-700">
            {selectedRows.length} rows selected
          </span>
          <ButtonPanel
            buttons={bulkActions.map(action => ({
              ...action,
              onClick: () => action.onClick(selectedRows)
            }))}
            size="sm"
            className="ml-4"
          />
        </div>
      )}
      
      <DataTable
        data={users}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
      />
    </div>
  );
}
```

## Accessibility

DataTable provides comprehensive accessibility support:

### ARIA Attributes

- `role="table"` - Table semantics
- `aria-label` - Table description
- `aria-sort` - Column sort state
- `aria-selected` - Row selection state
- `aria-expanded` - Expandable row state

### Keyboard Navigation

- **Tab** - Navigate between interactive elements
- **Arrow keys** - Navigate table cells
- **Space** - Select/deselect rows
- **Enter** - Activate row actions
- **Home/End** - Jump to first/last column
- **Page Up/Down** - Navigate pages

### Screen Reader Support

- Column headers are properly announced
- Sort states are communicated
- Selection changes are announced
- Loading and error states are announced

## Performance Optimization

### Memoization

```tsx
const columns = useMemo(() => [
  // Column definitions
], []);

const memoizedData = useMemo(() => 
  processData(rawData, filters, sorting), 
  [rawData, filters, sorting]
);

<DataTable
  data={memoizedData}
  columns={columns}
/>
```

### Virtualization

```tsx
<DataTable
  data={largeDataset}
  columns={columns}
  virtualScrolling={{
    enabled: true,
    rowHeight: 50,
    overscan: 5
  }}
/>
```

## Styling

### Custom Styling

```tsx
<DataTable
  data={data}
  columns={columns}
  className="custom-table"
  headerClassName="bg-gray-100"
  rowClassName={(row, index) => 
    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
  }
  cellClassName="px-4 py-2"
/>
```

### CSS Custom Properties

```css
.data-table {
  --table-border-color: hsl(var(--border));
  --table-header-background: hsl(var(--muted));
  --table-row-hover: hsl(var(--accent));
  --table-selected-background: hsl(var(--primary) / 0.1);
}
```

## Best Practices

1. **Limit visible columns** - Use horizontal scrolling for many columns
2. **Provide loading states** - Show skeleton or spinner during data fetch
3. **Handle empty states** - Show helpful messages when no data
4. **Use pagination** - Don't load thousands of rows at once
5. **Make actions discoverable** - Use clear icons and labels
6. **Maintain selection state** - Preserve selections across page changes
7. **Optimize for mobile** - Consider responsive column hiding

## Related Components

- [Table](../Table) - Basic table primitive
- [FilterBar](./filter-bar) - Table filtering controls
- [Pagination](./pagination) - Pagination component
- [EmptyState](./empty-state) - Empty state component