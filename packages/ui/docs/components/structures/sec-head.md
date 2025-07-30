# SecHead (Section Header)

Page section header component with title, subtitle, and action buttons.

## Overview

SecHead is a structure component that provides a consistent header layout for page sections. It combines a title, optional subtitle, and action buttons in a responsive layout that works well across different screen sizes.

## Basic Usage

```tsx
import { SecHead } from '@acrobi/ui';

function UserManagement() {
  return (
    <div>
      <SecHead
        title="User Management"
        subtitle="Manage team members and their permissions"
        actions={[
          {
            label: 'Add User',
            onClick: handleAddUser,
            variant: 'default'
          },
          {
            label: 'Import Users',
            onClick: handleImport,
            variant: 'outline'
          }
        ]}
      />
      
      {/* Section content */}
    </div>
  );
}
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Main section title |
| `subtitle` | `string` | - | Optional subtitle/description |
| `actions` | `ActionConfig[]` | `[]` | Action buttons |
| `breadcrumbs` | `BreadcrumbConfig[]` | - | Navigation breadcrumbs |

### ActionConfig Interface

```tsx
interface ActionConfig {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
}
```

### Layout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alignment` | `'start' \| 'center' \| 'between'` | `'between'` | Content alignment |
| `spacing` | `'sm' \| 'md' \| 'lg'` | `'md'` | Vertical spacing |
| `responsive` | `boolean` | `true` | Enable responsive behavior |

### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `styling` | `'default' \| 'compact' \| 'prominent'` | `'default'` | Visual style variant |
| `divider` | `boolean` | `false` | Show bottom divider |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Basic Section Header

```tsx
<SecHead
  title="Dashboard"
  subtitle="Overview of your account activity"
/>
```

### With Actions

```tsx
<SecHead
  title="Projects"
  subtitle="Manage your active projects"
  actions={[
    {
      label: 'New Project',
      onClick: handleNewProject,
      icon: <PlusIcon />
    },
    {
      label: 'Import',
      onClick: handleImport,
      variant: 'outline',
      icon: <UploadIcon />
    }
  ]}
/>
```

### With Breadcrumbs

```tsx
<SecHead
  title="Project Settings"
  subtitle="Configure project preferences and permissions"
  breadcrumbs={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Projects', href: '/projects' },
    { label: 'My Project', href: '/projects/123' },
    { label: 'Settings', current: true }
  ]}
  actions={[
    {
      label: 'Save Changes',
      onClick: handleSave,
      variant: 'default'
    }
  ]}
/>
```

### Different Alignments

```tsx
{/* Start alignment - everything left-aligned */}
<SecHead
  title="Team Members"
  subtitle="Manage your team"
  alignment="start"
  actions={[
    { label: 'Add Member', onClick: handleAdd }
  ]}
/>

{/* Center alignment - centered content */}
<SecHead
  title="Welcome"
  subtitle="Get started with your new account"
  alignment="center"
  actions={[
    { label: 'Get Started', onClick: handleStart }
  ]}
/>

{/* Between alignment (default) - title left, actions right */}
<SecHead
  title="Settings"
  subtitle="Manage your preferences"
  alignment="between"
  actions={[
    { label: 'Reset', onClick: handleReset, variant: 'outline' },
    { label: 'Save', onClick: handleSave }
  ]}
/>
```

### Style Variants

```tsx
{/* Default style */}
<SecHead
  styling="default"
  title="Standard Header"
  subtitle="Regular section header"
/>

{/* Compact style - reduced spacing */}
<SecHead
  styling="compact"
  title="Compact Header"
  subtitle="Less vertical space"
/>

{/* Prominent style - larger text and spacing */}
<SecHead
  styling="prominent"
  title="Important Section"
  subtitle="Emphasized header for key sections"
/>
```

### With Divider

```tsx
<SecHead
  title="User Profile"
  subtitle="Manage your personal information"
  divider
  actions={[
    { label: 'Edit Profile', onClick: handleEdit }
  ]}
/>
```

### Loading States

```tsx
function DynamicSecHead() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  return (
    <SecHead
      title="Document Editor"
      subtitle="Edit your document content"
      actions={[
        {
          label: 'Save',
          onClick: handleSave,
          loading: saving,
          disabled: loading
        },
        {
          label: 'Publish',
          onClick: handlePublish,
          variant: 'outline',
          disabled: loading || saving
        }
      ]}
    />
  );
}
```

### Conditional Actions

```tsx
function ConditionalSecHead({ user, canEdit, canDelete }) {
  const actions = [
    // Always show view action
    {
      label: 'View Details',
      onClick: () => viewUser(user.id),
      variant: 'outline'
    },
    
    // Conditionally show edit
    ...(canEdit ? [{
      label: 'Edit User',
      onClick: () => editUser(user.id),
      icon: <EditIcon />
    }] : []),
    
    // Conditionally show delete
    ...(canDelete ? [{
      label: 'Delete',
      onClick: () => deleteUser(user.id),
      variant: 'destructive',
      icon: <TrashIcon />
    }] : [])
  ];

  return (
    <SecHead
      title={`User: ${user.name}`}
      subtitle={`Role: ${user.role} • Last active: ${user.lastActive}`}
      actions={actions}
    />
  );
}
```

### With Custom Content

```tsx
<SecHead
  title="Analytics Dashboard"
  subtitle="Track your key metrics and performance"
  actions={[
    { label: 'Export Report', onClick: handleExport }
  ]}
  customContent={
    <div className="flex items-center gap-4 mt-2">
      <Badge variant="success">Live Data</Badge>
      <span className="text-sm text-gray-500">
        Last updated: {lastUpdated}
      </span>
    </div>
  }
/>
```

### Responsive Behavior

```tsx
<SecHead
  title="Mobile-Friendly Header"
  subtitle="Adapts to different screen sizes"
  actions={[
    { label: 'Primary', onClick: handlePrimary },
    { label: 'Secondary', onClick: handleSecondary, variant: 'outline' }
  ]}
  responsive
  // On mobile: actions stack vertically below title
  // On desktop: actions align to the right
/>
```

## Integration Examples

### With Page Layout

```tsx
function ProjectPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <SecHead
          title="Project Dashboard"
          subtitle="Monitor project progress and team activity"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: 'Current Project', current: true }
          ]}
          actions={[
            { label: 'Settings', onClick: handleSettings, variant: 'outline' },
            { label: 'New Task', onClick: handleNewTask }
          ]}
          divider
        />
        
        <div className="mt-8">
          {/* Page content */}
        </div>
      </div>
    </div>
  );
}
```

### With Data Loading

```tsx
function DataDrivenSecHead() {
  const { data: project, loading, error } = useProject(projectId);

  if (loading) {
    return (
      <SecHead
        title="Loading..."
        subtitle="Fetching project details"
      />
    );
  }

  if (error) {
    return (
      <SecHead
        title="Error"
        subtitle="Failed to load project"
        actions={[
          { label: 'Retry', onClick: handleRetry }
        ]}
      />
    );
  }

  return (
    <SecHead
      title={project.name}
      subtitle={`${project.description} • Created ${formatDate(project.createdAt)}`}
      actions={[
        { label: 'Edit', onClick: () => editProject(project.id) },
        { label: 'Share', onClick: () => shareProject(project.id), variant: 'outline' }
      ]}
    />
  );
}
```

### With State Management

```tsx
function StatefulSecHead() {
  const dispatch = useDispatch();
  const { currentProject, permissions } = useSelector(state => state.projects);

  const handleAction = (action) => {
    dispatch(projectActions[action](currentProject.id));
  };

  return (
    <SecHead
      title={currentProject.name}
      subtitle={currentProject.description}
      actions={[
        ...(permissions.canEdit ? [{
          label: 'Edit',
          onClick: () => handleAction('edit')
        }] : []),
        ...(permissions.canDelete ? [{
          label: 'Delete',
          onClick: () => handleAction('delete'),
          variant: 'destructive'
        }] : [])
      ]}
    />
  );
}
```

## Accessibility

SecHead maintains proper accessibility:

### Semantic Structure

- Uses proper heading hierarchy (`h1`, `h2`, etc.)
- Maintains logical document outline
- Provides clear section boundaries

### Keyboard Navigation

- All actions are keyboard accessible
- Proper tab order maintained
- Focus indicators visible

### Screen Reader Support

- Headings are properly announced
- Action buttons have clear labels
- Breadcrumb navigation is accessible

## Styling

### CSS Custom Properties

```css
.sec-head {
  --sec-head-title-color: hsl(var(--foreground));
  --sec-head-subtitle-color: hsl(var(--muted-foreground));
  --sec-head-divider-color: hsl(var(--border));
  --sec-head-spacing: var(--spacing-md);
}
```

### Custom Styling

```tsx
<SecHead
  title="Custom Styled"
  subtitle="With custom CSS classes"
  className="my-section-header"
  titleClassName="text-2xl font-bold text-blue-600"
  subtitleClassName="text-gray-600"
  actionsClassName="gap-2"
/>
```

## Best Practices

1. **Use descriptive titles** - Make the section purpose clear
2. **Keep subtitles concise** - Provide context without overwhelming
3. **Limit actions** - 2-3 primary actions maximum
4. **Order actions by importance** - Most important action first
5. **Use consistent styling** - Maintain visual hierarchy
6. **Consider mobile** - Ensure responsive behavior works well
7. **Provide breadcrumbs** - Help users understand navigation context

## Related Components

- [Breadcrumb](../Breadcrumb) - Navigation breadcrumbs
- [ButtonPanel](./btn-panel) - Action button groups
- [Headline](../Headline) - Basic heading component
- [PageHeader](./page-header) - Full page header component