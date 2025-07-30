# Delete

Confirmation workflow module with safety checks and impact analysis.

## Overview

Delete provides a comprehensive deletion workflow with confirmation dialogs, safety checks, impact analysis, and undo capabilities.

## Basic Usage

```tsx
import { Delete } from '@acrobi/ui';

function ItemDeletion() {
  const handleDelete = async () => {
    await deleteItem(item.id);
    // Redirect or update UI
  };

  return (
    <Delete
      item={selectedItem}
      onConfirm={handleDelete}
      requireConfirmation
      showImpactAnalysis
      customWarnings={[
        'This will remove all associated data',
        'This action cannot be undone'
      ]}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `item` | `object` | - | Item to be deleted |
| `onConfirm` | `function` | - | Deletion confirmation handler |
| `requireConfirmation` | `boolean` | `true` | Require explicit confirmation |
| `showImpactAnalysis` | `boolean` | `false` | Show deletion impact |
| `customWarnings` | `string[]` | - | Custom warning messages |
| `allowUndo` | `boolean` | `false` | Enable undo functionality |

## Examples

### Bulk Deletion

```tsx
function BulkDelete() {
  return (
    <Delete
      items={selectedItems}
      onConfirm={handleBulkDelete}
      showImpactAnalysis
      requireConfirmation
      confirmationText="DELETE"
    />
  );
}
```

### Soft Delete with Undo

```tsx
<Delete
  item={item}
  onConfirm={handleSoftDelete}
  allowUndo
  undoTimeout={10000}
  onUndo={handleUndo}
/>
```