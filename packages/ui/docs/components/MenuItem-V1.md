# MenuItem (V1)

Individual menu item component with icon, label, and action support for building interactive menus.

## Overview

The MenuItem component is a versatile building block for creating interactive menu systems. It supports various states, includes accessibility features, and can display icons, descriptions, badges, and keyboard shortcuts.

## Features

- **Multiple Variants**: Default, destructive, warning, success, disabled
- **Flexible Content**: Icons, descriptions, badges, keyboard shortcuts
- **State Management**: Selected, loading, and disabled states
- **Size Options**: Small, default, and large sizes
- **Custom Content**: Support for completely custom item layouts
- **Accessibility**: Full keyboard navigation and screen reader support

## Basic Usage

```tsx
import { MenuItem } from '@acrobi/ui';

// Simple menu item
<MenuItem
  label="Settings"
  onSelect={() => console.log('Settings clicked')}
/>

// With icon
<MenuItem
  label="Profile"
  icon="👤"
  onSelect={() => console.log('Profile clicked')}
/>
```

## Variants

### Default
Standard menu item for regular actions.

```tsx
<MenuItem
  label="Dashboard"
  icon="📊"
  onSelect={() => navigate('/dashboard')}
/>
```

### Destructive
For dangerous or irreversible actions.

```tsx
<MenuItem
  label="Delete Account"
  icon="🗑️"
  variant="destructive"
  onSelect={() => confirmDelete()}
/>
```

### Warning
For actions that require caution.

```tsx
<MenuItem
  label="Reset Settings"
  icon="⚠️"
  variant="warning"
  description="This will reset all preferences"
  onSelect={() => confirmReset()}
/>
```

### Success
For positive or completed actions.

```tsx
<MenuItem
  label="Backup Complete"
  icon="✅"
  variant="success"
  badge="Done"
  badgeVariant="success"
  onSelect={() => viewBackup()}
/>
```

## Sizes

### Small
Compact menu items for dense layouts.

```tsx
<MenuItem
  label="Quick Action"
  icon="⚡"
  size="sm"
  onSelect={() => quickAction()}
/>
```

### Large
Spacious menu items with more visual prominence.

```tsx
<MenuItem
  label="Important Action"
  icon="⭐"
  size="lg"
  description="This is a primary action"
  onSelect={() => importantAction()}
/>
```

## Features

### With Description
Add contextual information below the main label.

```tsx
<MenuItem
  label="Account Settings"
  icon="👤"
  description="Manage your profile and preferences"
  onSelect={() => openSettings()}
/>
```

### With Badge
Show status indicators or counts.

```tsx
<MenuItem
  label="Messages"
  icon="💬"
  badge="5"
  badgeVariant="destructive"
  onSelect={() => openMessages()}
/>
```

### With Keyboard Shortcut
Display keyboard shortcuts for power users.

```tsx
<MenuItem
  label="Save File"
  icon="💾"
  shortcut="⌘S"
  onSelect={() => saveFile()}
/>
```

### Selected State
Indicate the currently active item.

```tsx
<MenuItem
  label="Current Page"
  icon="📄"
  selected={true}
  onSelect={() => {}}
/>
```

### Loading State
Show loading spinner during async operations.

```tsx
<MenuItem
  label="Syncing..."
  loading={true}
  onSelect={() => {}}
/>
```

### Disabled State
Prevent interaction for unavailable actions.

```tsx
<MenuItem
  label="Premium Feature"
  icon="💎"
  disabled={true}
  description="Upgrade to access this feature"
/>
```

## Custom Content

For complex layouts, you can provide custom children:

```tsx
<MenuItem onSelect={() => selectUser()}>
  <div className="flex items-center justify-between w-full">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
        JD
      </div>
      <div>
        <div className="font-medium">John Doe</div>
        <div className="text-sm text-muted-foreground">john@example.com</div>
      </div>
    </div>
    <div className="text-xs text-muted-foreground">Online</div>
  </div>
</MenuItem>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **Required.** Menu item label text |
| `icon` | `string` | - | Optional icon (emoji or text) |
| `description` | `string` | - | Optional description text |
| `badge` | `string \| number` | - | Optional badge content |
| `badgeVariant` | `'default' \| 'secondary' \| 'destructive' \| 'success' \| 'warning'` | `'secondary'` | Badge color variant |
| `shortcut` | `string` | - | Keyboard shortcut display |
| `variant` | `'default' \| 'destructive' \| 'warning' \| 'success' \| 'disabled'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size variant |
| `selected` | `boolean` | `false` | Whether item is selected/active |
| `loading` | `boolean` | `false` | Whether item is in loading state |
| `disabled` | `boolean` | `false` | Whether item is disabled |
| `onSelect` | `() => void` | - | Click handler function |
| `children` | `ReactNode` | - | Custom content (overrides default layout) |

## Accessibility

### Keyboard Navigation
- **Enter/Space**: Activate menu item
- **Tab**: Move to next focusable element
- **Shift+Tab**: Move to previous focusable element

### Screen Reader Support
- Uses `role="menuitem"` for proper semantics
- Disabled items are announced as unavailable
- Loading state is communicated to assistive technology

### Focus Management
- Clear focus indicators
- Proper tab order
- Focus trapped within menu contexts

## Best Practices

### Content Guidelines
- Keep labels concise and action-oriented
- Use descriptions for additional context, not repetition
- Choose appropriate icons that reinforce the action
- Use badges sparingly for important status information

### Interaction Design
- Group related items together
- Use separators to create logical sections
- Provide keyboard shortcuts for frequently used actions
- Give immediate feedback for actions that take time

### Visual Hierarchy
- Use variants to indicate action importance
- Size items based on their prominence in the interface
- Maintain consistent spacing and alignment

## Examples

### Navigation Menu
```tsx
<div className="menu">
  <MenuItem label="Dashboard" icon="📊" selected={currentPage === 'dashboard'} onSelect={() => navigate('/dashboard')} />
  <MenuItem label="Analytics" icon="📈" onSelect={() => navigate('/analytics')} />
  <MenuItem label="Settings" icon="⚙️" onSelect={() => navigate('/settings')} />
</div>
```

### Context Menu
```tsx
<div className="context-menu">
  <MenuItem label="Copy" icon="📋" shortcut="⌘C" onSelect={() => copy()} />
  <MenuItem label="Paste" icon="📄" shortcut="⌘V" disabled={!canPaste} onSelect={() => paste()} />
  <MenuItem label="Delete" icon="🗑️" variant="destructive" shortcut="Del" onSelect={() => delete()} />
</div>
```

### User Menu
```tsx
<div className="user-menu">
  <MenuItem label="Profile" icon="👤" onSelect={() => openProfile()} />
  <MenuItem label="Messages" icon="💬" badge={unreadCount} badgeVariant="destructive" onSelect={() => openMessages()} />
  <MenuItem label="Sign Out" icon="🚪" variant="warning" onSelect={() => signOut()} />
</div>
```

## Version History

- **V1.0.0**: Initial implementation as part of the menu system
- Added comprehensive variant system
- Included loading and selected states
- Built with accessibility-first approach