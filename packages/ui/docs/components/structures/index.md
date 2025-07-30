# Structures Overview

Structure components are higher-level compositions built from primitives for complex use cases. They provide complete, validated solutions for common interface patterns.

## Form Structures

### TextField
Complete form field with label, validation, and helper text.

```tsx
<TextField
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  error="Email is required"
  helperText="We'll never share your email"
  required
/>
```

### SelectField
Dropdown selection with search and validation.

```tsx
<SelectField
  label="Country"
  options={countries}
  placeholder="Select a country"
  searchable
  required
/>
```

### CheckboxField
Checkbox with integrated label and description.

```tsx
<CheckboxField
  label="Subscribe to newsletter"
  description="Get updates about new features"
  checked={subscribed}
  onCheckedChange={setSubscribed}
/>
```

## Grouping Structures

### ButtonPanel
Organized collection of related actions.

```tsx
<ButtonPanel
  buttons={[
    { label: 'Save', variant: 'default', onClick: handleSave },
    { label: 'Cancel', variant: 'outline', onClick: handleCancel }
  ]}
  orientation="horizontal"
/>
```

### ButtonGroup
Segmented control for mutually exclusive options.

```tsx
<ButtonGroup
  options={[
    { value: 'grid', label: 'Grid View' },
    { value: 'list', label: 'List View' }
  ]}
  value={viewMode}
  onValueChange={setViewMode}
/>
```

## Data Display

### DataTable
Full-featured table with sorting, filtering, and pagination.

```tsx
<DataTable
  data={users}
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', filterable: true },
    { key: 'status', header: 'Status' }
  ]}
  selectable
  pagination={{
    page: 1,
    pageSize: 10,
    total: 100
  }}
/>
```

### HeadlineStructure
Page header with title, subtitle, and actions.

```tsx
<HeadlineStructure
  title="User Management"
  subtitle="Manage your team members and permissions"
  actions={[
    { label: 'Add User', onClick: handleAddUser },
    { label: 'Export', variant: 'outline', onClick: handleExport }
  ]}
/>
```

## Advanced Input

### UploadField
File upload with drag-and-drop and preview.

```tsx
<UploadField
  label="Profile Picture"
  accept="image/*"
  maxSize={5 * 1024 * 1024} // 5MB
  onUpload={handleUpload}
  preview
/>
```

### RichTextEditor
WYSIWYG editor with formatting tools.

```tsx
<RichTextEditor
  value={content}
  onChange={setContent}
  placeholder="Start writing..."
  tools={['bold', 'italic', 'link', 'list']}
/>
```

## Layout Structures

### FilterBar
Search and filter controls for data views.

```tsx
<FilterBar
  showSearch
  searchPlaceholder="Search users..."
  fields={[
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: statusOptions
    },
    {
      key: 'role',
      label: 'Role',
      type: 'select',
      options: roleOptions
    }
  ]}
  onFiltersChange={handleFiltersChange}
/>
```

### EmptyState
Placeholder for empty data states.

```tsx
<EmptyState
  title="No users found"
  description="Get started by adding your first team member"
  actions={[
    { label: 'Add User', onClick: handleAddUser }
  ]}
  illustration="users"
/>
```

## Design Principles

Structure components follow these principles:

1. **Complete Solutions** - Handle entire use cases, not just UI
2. **Built-in Validation** - Form validation and error handling included
3. **Accessibility First** - WCAG compliance with proper ARIA labels
4. **Responsive Design** - Mobile-first and touch-friendly
5. **Customizable** - Flexible styling and behavior options

## When to Use Structures

- ✅ Building forms with validation
- ✅ Displaying tabular data
- ✅ Creating consistent page layouts
- ✅ Implementing common UI patterns
- ✅ Need accessibility out-of-the-box

## When to Use Primitives Instead

- ❌ Need maximum customization
- ❌ Building unique, one-off interfaces
- ❌ Performance is critical (smaller bundle)
- ❌ Integrating with existing form libraries

## Performance Considerations

Structure components are larger than primitives but provide more functionality:

- **TextField**: ~8KB (includes validation, accessibility)
- **DataTable**: ~15KB (includes sorting, filtering, pagination)
- **RichTextEditor**: ~25KB (includes TipTap editor)

Use code splitting for heavy components:

```tsx
const DataTable = lazy(() => import('@acrobi/ui').then(m => ({ 
  default: m.DataTable 
})));
```

## Next Steps

- [Browse all structure components](../api-reference)
- [View form examples](../../examples/forms)
- [Learn about modules](../modules/)