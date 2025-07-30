# SelectField

Complete dropdown selection component with search, validation, and accessibility features.

## Overview

SelectField is a structure component that provides a full-featured dropdown selection interface. It includes search functionality, validation, error handling, and proper accessibility support for complex selection scenarios.

## Basic Usage

```tsx
import { SelectField } from '@acrobi/ui';

function UserForm() {
  const [country, setCountry] = useState('');
  
  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' }
  ];

  return (
    <SelectField
      label="Country"
      options={countries}
      value={country}
      onChange={setCountry}
      placeholder="Select a country"
      required
    />
  );
}
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Field label text |
| `options` | `Array<{value: string, label: string}>` | `[]` | Selection options |
| `value` | `string \| string[]` | - | Current selected value(s) |
| `onChange` | `function` | - | Change handler function |
| `placeholder` | `string` | - | Placeholder text |
| `required` | `boolean` | `false` | Whether field is required |
| `disabled` | `boolean` | `false` | Whether field is disabled |

### Selection Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `multiple` | `boolean` | `false` | Allow multiple selections |
| `searchable` | `boolean` | `false` | Enable search functionality |
| `clearable` | `boolean` | `false` | Allow clearing selection |
| `maxSelections` | `number` | - | Max selections (multiple mode) |

### Validation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `string` | - | Error message to display |
| `helperText` | `string` | - | Helper text below field |
| `validate` | `function` | - | Custom validation function |

### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `styling` | `'default' \| 'filled' \| 'outlined'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Field size |
| `fullWidth` | `boolean` | `false` | Whether to take full width |

## Examples

### Basic Select

```tsx
const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' }
];

<SelectField
  label="Status"
  options={statusOptions}
  value={status}
  onChange={setStatus}
  required
/>
```

### Searchable Select

```tsx
const userOptions = [
  { value: '1', label: 'John Doe' },
  { value: '2', label: 'Jane Smith' },
  { value: '3', label: 'Bob Johnson' },
  { value: '4', label: 'Alice Brown' }
];

<SelectField
  label="Assign To"
  options={userOptions}
  value={assignee}
  onChange={setAssignee}
  searchable
  placeholder="Search users..."
  helperText="Type to search for users"
/>
```

### Multiple Selection

```tsx
const skillOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'typescript', label: 'TypeScript' }
];

<SelectField
  label="Skills"
  options={skillOptions}
  value={selectedSkills}
  onChange={setSelectedSkills}
  multiple
  searchable
  maxSelections={3}
  helperText="Select up to 3 skills"
/>
```

### Grouped Options

```tsx
const groupedOptions = [
  {
    label: 'Frontend',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' }
    ]
  },
  {
    label: 'Backend',
    options: [
      { value: 'node', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' }
    ]
  }
];

<SelectField
  label="Technology"
  options={groupedOptions}
  value={technology}
  onChange={setTechnology}
  searchable
/>
```

### Custom Option Rendering

```tsx
const userOptions = [
  { 
    value: '1', 
    label: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatars/john.jpg'
  },
  { 
    value: '2', 
    label: 'Jane Smith',
    email: 'jane@example.com',
    avatar: '/avatars/jane.jpg'
  }
];

<SelectField
  label="Team Member"
  options={userOptions}
  value={member}
  onChange={setMember}
  renderOption={(option) => (
    <div className="flex items-center gap-3">
      <Avatar src={option.avatar} fallback={option.label[0]} size="sm" />
      <div>
        <div className="font-medium">{option.label}</div>
        <div className="text-sm text-gray-500">{option.email}</div>
      </div>
    </div>
  )}
  renderValue={(option) => (
    <div className="flex items-center gap-2">
      <Avatar src={option.avatar} fallback={option.label[0]} size="xs" />
      {option.label}
    </div>
  )}
/>
```

### Async Options Loading

```tsx
function AsyncSelectField() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadOptions = async (search = '') => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users?search=${search}`);
      const users = await response.json();
      setOptions(users.map(user => ({
        value: user.id,
        label: user.name,
        email: user.email
      })));
    } catch (error) {
      console.error('Failed to load options:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOptions(searchTerm);
  }, [searchTerm]);

  return (
    <SelectField
      label="User"
      options={options}
      value={selectedUser}
      onChange={setSelectedUser}
      searchable
      onSearchChange={setSearchTerm}
      loading={loading}
      placeholder={loading ? 'Loading...' : 'Search users...'}
    />
  );
}
```

## Validation

### Required Field Validation

```tsx
<SelectField
  label="Priority"
  options={priorityOptions}
  value={priority}
  onChange={setPriority}
  required
  error={!priority ? 'Priority is required' : ''}
/>
```

### Custom Validation

```tsx
<SelectField
  label="Team Size"
  options={teamSizeOptions}
  value={teamSize}
  onChange={setTeamSize}
  validate={(value) => {
    if (!value) return 'Team size is required';
    if (parseInt(value) > 50) return 'Team size cannot exceed 50 members';
    return '';
  }}
/>
```

### Multiple Selection Validation

```tsx
<SelectField
  label="Required Skills"
  options={skillOptions}
  value={skills}
  onChange={setSkills}
  multiple
  validate={(values) => {
    if (!values || values.length === 0) return 'At least one skill is required';
    if (values.length > 5) return 'Maximum 5 skills allowed';
    return '';
  }}
/>
```

## Accessibility

SelectField provides comprehensive accessibility support:

### ARIA Attributes

- `aria-labelledby` - Links label to select
- `aria-describedby` - Links helper text and errors
- `aria-expanded` - Indicates dropdown state
- `aria-selected` - Indicates selected options
- `aria-activedescendant` - Tracks focused option

### Keyboard Navigation

- **Space/Enter** - Open/close dropdown
- **Arrow Up/Down** - Navigate options
- **Home/End** - Jump to first/last option
- **Escape** - Close dropdown
- **Type to search** - Filter options (when searchable)

### Screen Reader Support

- Announces selected values
- Reads option count and position
- Communicates loading states
- Announces validation errors

## Styling

### Style Variants

```tsx
<div className="space-y-4">
  <SelectField
    label="Default Style"
    styling="default"
    options={options}
  />
  
  <SelectField
    label="Filled Style"
    styling="filled"
    options={options}
  />
  
  <SelectField
    label="Outlined Style"
    styling="outlined"
    options={options}
  />
</div>
```

### Custom Styling

```tsx
<SelectField
  label="Custom Select"
  options={options}
  className="my-select"
  dropdownClassName="custom-dropdown"
  optionClassName="custom-option"
/>
```

### CSS Custom Properties

```css
.select-field {
  --select-border-color: hsl(var(--border));
  --select-background: hsl(var(--background));
  --select-text-color: hsl(var(--foreground));
  --select-placeholder-color: hsl(var(--muted-foreground));
  --select-focus-color: hsl(var(--ring));
  --select-option-hover: hsl(var(--accent));
}
```

## Integration

### With React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';

function FormWithSelect() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="category"
        control={control}
        rules={{ required: 'Category is required' }}
        render={({ field, fieldState: { error } }) => (
          <SelectField
            {...field}
            label="Category"
            options={categoryOptions}
            error={error?.message}
            required
          />
        )}
      />
    </form>
  );
}
```

### With Form Libraries

```tsx
// Works with any form library that provides field props
<SelectField
  {...field}
  label="Department"
  options={departments}
  error={fieldState.error?.message}
/>
```

## Performance

### Large Option Lists

For large datasets, consider:

```tsx
// Virtual scrolling for 1000+ options
<SelectField
  label="City"
  options={cities}
  virtualizeOptions
  optionHeight={40}
  maxVisibleOptions={10}
/>

// Async loading with pagination
<SelectField
  label="Product"
  loadOptions={loadProducts}
  pagination={{
    pageSize: 50,
    loadMore: true
  }}
/>
```

## Best Practices

1. **Use clear labels** - Make the purpose obvious
2. **Provide search for long lists** - 7+ options should be searchable
3. **Group related options** - Use option groups for categorization
4. **Show loading states** - Indicate when options are being fetched
5. **Handle empty states** - Show helpful messages when no options
6. **Validate appropriately** - Provide clear error messages
7. **Consider mobile UX** - Ensure touch-friendly interactions

## Related Components

- [TextField](./text-field) - Text input field
- [CheckboxField](./checkbox-field) - Multiple choice field
- [RadioField](./radio-field) - Single choice field
- [ComboBox](./combo-box) - Editable dropdown field