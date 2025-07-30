# MenuActions

Global action menu system with keyboard shortcuts and context awareness.

## Overview

MenuActions provides a comprehensive menu system for application-wide actions. It includes keyboard shortcuts, action grouping, search functionality, and context-aware visibility.

## Basic Usage

```tsx
import { MenuActions } from '@acrobi/ui';

function AppHeader() {
  const actions = [
    {
      id: 'new',
      label: 'New',
      icon: 'plus',
      shortcut: 'Cmd+N',
      onClick: handleNew
    },
    {
      id: 'search',
      label: 'Search',
      icon: 'search',
      shortcut: 'Cmd+K',
      onClick: handleSearch
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      onClick: handleSettings
    }
  ];

  return (
    <MenuActions
      actions={actions}
      showShortcuts
      groupByCategory
      searchable
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `Action[]` | `[]` | Menu actions |
| `showShortcuts` | `boolean` | `true` | Display keyboard shortcuts |
| `groupByCategory` | `boolean` | `false` | Group actions by category |
| `searchable` | `boolean` | `false` | Enable action search |
| `contextual` | `boolean` | `false` | Show context-aware actions |

## Action Interface

```tsx
interface Action {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  category?: string;
  onClick: () => void;
  disabled?: boolean;
  visible?: boolean;
  badge?: string;
}
```

## Examples

### Grouped Actions

```tsx
const actions = [
  // File actions
  { id: 'new', label: 'New File', category: 'File', shortcut: 'Cmd+N' },
  { id: 'open', label: 'Open', category: 'File', shortcut: 'Cmd+O' },
  { id: 'save', label: 'Save', category: 'File', shortcut: 'Cmd+S' },
  
  // Edit actions
  { id: 'undo', label: 'Undo', category: 'Edit', shortcut: 'Cmd+Z' },
  { id: 'redo', label: 'Redo', category: 'Edit', shortcut: 'Cmd+Shift+Z' },
  
  // View actions
  { id: 'zoom-in', label: 'Zoom In', category: 'View', shortcut: 'Cmd+Plus' },
  { id: 'zoom-out', label: 'Zoom Out', category: 'View', shortcut: 'Cmd+Minus' }
];

<MenuActions
  actions={actions}
  groupByCategory
  showShortcuts
  searchable
/>
```

### Context-Aware Menu

```tsx
function ContextualMenu({ selectedItems, userRole }) {
  const actions = [
    {
      id: 'edit',
      label: 'Edit',
      visible: selectedItems.length === 1 && userRole === 'editor',
      onClick: handleEdit
    },
    {
      id: 'delete',
      label: 'Delete',
      visible: selectedItems.length > 0 && userRole === 'admin',
      onClick: handleDelete
    }
  ];

  return (
    <MenuActions
      actions={actions}
      contextual
    />
  );
}
```