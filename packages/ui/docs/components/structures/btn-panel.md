# ButtonPanel

Organized collection of related action buttons with consistent spacing and alignment.

## Overview

ButtonPanel is a structure component that manages groups of related buttons, providing consistent spacing, alignment, and responsive behavior. It's perfect for form actions, dialog controls, and toolbar buttons.

## Basic Usage

```tsx
import { ButtonPanel } from '@acrobi/ui';

function FormActions() {
  return (
    <ButtonPanel
      buttons={[
        { 
          label: 'Save', 
          onClick: handleSave,
          variant: 'default'
        },
        { 
          label: 'Cancel', 
          onClick: handleCancel,
          variant: 'outline'
        }
      ]}
    />
  );
}
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttons` | `ButtonConfig[]` | `[]` | Array of button configurations |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Button layout direction |
| `alignment` | `'start' \| 'center' \| 'end' \| 'space-between'` | `'end'` | Button alignment |
| `spacing` | `'sm' \| 'md' \| 'lg'` | `'md'` | Space between buttons |
| `fullWidth` | `boolean` | `false` | Whether buttons take full width |

### ButtonConfig Interface

```tsx
interface ButtonConfig {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
```

### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `styling` | `'default' \| 'compact' \| 'spaced'` | `'default'` | Visual style variant |
| `responsive` | `boolean` | `true` | Enable responsive behavior |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Form Actions

```tsx
function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitForm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      {/* Form fields */}
      
      <ButtonPanel
        buttons={[
          {
            label: 'Submit',
            onClick: handleSubmit,
            type: 'submit',
            loading: loading,
            variant: 'default'
          },
          {
            label: 'Save Draft',
            onClick: handleSaveDraft,
            variant: 'outline',
            disabled: loading
          },
          {
            label: 'Cancel',
            onClick: handleCancel,
            variant: 'ghost',
            disabled: loading
          }
        ]}
        alignment="end"
      />
    </form>
  );
}
```

### Dialog Actions

```tsx
function ConfirmDialog({ onConfirm, onCancel }) {
  return (
    <Dialog>
      <DialogContent>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this item? This action cannot be undone.
        </DialogDescription>
        
        <ButtonPanel
          buttons={[
            {
              label: 'Delete',
              onClick: onConfirm,
              variant: 'destructive'
            },
            {
              label: 'Cancel',
              onClick: onCancel,
              variant: 'outline'
            }
          ]}
          alignment="end"
          className="mt-6"
        />
      </DialogContent>
    </Dialog>
  );
}
```

### Toolbar Actions

```tsx
function DocumentToolbar() {
  return (
    <div className="border-b p-4">
      <ButtonPanel
        buttons={[
          {
            label: 'New',
            onClick: handleNew,
            icon: <PlusIcon />,
            variant: 'default'
          },
          {
            label: 'Open',
            onClick: handleOpen,
            icon: <FolderIcon />,
            variant: 'outline'
          },
          {
            label: 'Save',
            onClick: handleSave,
            icon: <SaveIcon />,
            variant: 'outline'
          }
        ]}
        alignment="start"
        spacing="sm"
      />
    </div>
  );
}
```

### Vertical Layout

```tsx
<ButtonPanel
  buttons={[
    { label: 'Edit Profile', onClick: handleEdit },
    { label: 'Change Password', onClick: handlePassword },
    { label: 'Privacy Settings', onClick: handlePrivacy },
    { label: 'Delete Account', onClick: handleDelete, variant: 'destructive' }
  ]}
  orientation="vertical"
  alignment="start"
  fullWidth
/>
```

### Responsive Behavior

```tsx
<ButtonPanel
  buttons={[
    { label: 'Primary Action', onClick: handlePrimary },
    { label: 'Secondary', onClick: handleSecondary, variant: 'outline' },
    { label: 'Tertiary', onClick: handleTertiary, variant: 'ghost' }
  ]}
  responsive
  // Automatically stacks vertically on mobile
  className="md:justify-end"
/>
```

### With Icons and Loading States

```tsx
function ActionPanel() {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <ButtonPanel
      buttons={[
        {
          label: 'Save Changes',
          onClick: handleSave,
          icon: <SaveIcon />,
          loading: saving,
          variant: 'default'
        },
        {
          label: 'Export Data',
          onClick: handleExport,
          icon: <DownloadIcon />,
          variant: 'outline'
        },
        {
          label: 'Delete',
          onClick: handleDelete,
          icon: <TrashIcon />,
          loading: deleting,
          variant: 'destructive'
        }
      ]}
      spacing="md"
    />
  );
}
```

## Alignment Options

### Start Alignment

```tsx
<ButtonPanel
  buttons={buttons}
  alignment="start"
  // Buttons align to the left
/>
```

### Center Alignment

```tsx
<ButtonPanel
  buttons={buttons}
  alignment="center"
  // Buttons center in container
/>
```

### End Alignment (Default)

```tsx
<ButtonPanel
  buttons={buttons}
  alignment="end"
  // Buttons align to the right
/>
```

### Space Between

```tsx
<ButtonPanel
  buttons={[
    { label: 'Back', onClick: handleBack, variant: 'outline' },
    { label: 'Next', onClick: handleNext }
  ]}
  alignment="space-between"
  // Buttons spread across full width
/>
```

## Styling Variants

### Default Style

```tsx
<ButtonPanel
  styling="default"
  buttons={buttons}
  // Standard spacing and styling
/>
```

### Compact Style

```tsx
<ButtonPanel
  styling="compact"
  buttons={buttons}
  // Reduced spacing for tight layouts
/>
```

### Spaced Style

```tsx
<ButtonPanel
  styling="spaced"
  buttons={buttons}
  // Increased spacing for emphasis
/>
```

## Conditional Buttons

```tsx
function ConditionalActions({ user, canEdit, canDelete }) {
  const buttons = [
    // Always show view button
    {
      label: 'View Details',
      onClick: () => viewUser(user.id),
      variant: 'outline'
    },
    
    // Conditionally show edit button
    ...(canEdit ? [{
      label: 'Edit',
      onClick: () => editUser(user.id),
      variant: 'default'
    }] : []),
    
    // Conditionally show delete button
    ...(canDelete ? [{
      label: 'Delete',
      onClick: () => deleteUser(user.id),
      variant: 'destructive'
    }] : [])
  ];

  return <ButtonPanel buttons={buttons} />;
}
```

## Accessibility

ButtonPanel maintains accessibility for all contained buttons:

### Keyboard Navigation

- **Tab** - Navigate between buttons
- **Enter/Space** - Activate focused button
- **Arrow keys** - Navigate in vertical orientation

### Screen Reader Support

- Each button maintains its individual accessibility
- Loading states are announced
- Disabled states are communicated
- Button roles and labels are preserved

### Focus Management

```tsx
<ButtonPanel
  buttons={buttons}
  autoFocus="first" // Focus first button on mount
  // or autoFocus="primary" to focus primary action
/>
```

## Integration

### With Forms

```tsx
function FormWithActions() {
  const { handleSubmit, formState: { isSubmitting, isDirty } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      
      <ButtonPanel
        buttons={[
          {
            label: 'Save',
            type: 'submit',
            loading: isSubmitting,
            disabled: !isDirty
          },
          {
            label: 'Reset',
            type: 'reset',
            variant: 'outline',
            disabled: isSubmitting
          }
        ]}
      />
    </form>
  );
}
```

### With State Management

```tsx
function StatefulActions() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.ui);

  const buttons = [
    {
      label: 'Retry',
      onClick: () => dispatch(retryAction()),
      disabled: loading,
      variant: error ? 'default' : 'outline'
    },
    {
      label: 'Cancel',
      onClick: () => dispatch(cancelAction()),
      disabled: loading,
      variant: 'ghost'
    }
  ];

  return <ButtonPanel buttons={buttons} />;
}
```

## Custom Button Rendering

```tsx
<ButtonPanel
  buttons={buttons}
  renderButton={(config, index) => (
    <CustomButton
      key={index}
      {...config}
      analytics={{
        event: 'button_click',
        properties: { button_label: config.label }
      }}
    />
  )}
/>
```

## Best Practices

1. **Limit button count** - Keep to 2-4 buttons for clarity
2. **Use consistent variants** - Primary action should stand out
3. **Order by importance** - Most important action on the right (LTR)
4. **Handle loading states** - Show progress for async actions
5. **Provide clear labels** - Use action verbs, not generic terms
6. **Consider mobile** - Ensure touch-friendly sizing
7. **Group related actions** - Use multiple panels for different contexts

## Related Components

- [Button](../Button) - Individual button component
- [ButtonGroup](./button-group) - Segmented button control
- [Toolbar](./toolbar) - Application toolbar component
- [ActionMenu](./action-menu) - Dropdown action menu