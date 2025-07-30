# Alert (V1)

Alert component for displaying important messages with various states and visual styles.

## Overview

The Alert component is used to communicate important information to users, including error messages, warnings, success confirmations, and general information. It supports multiple variants with semantic coloring and can include icons, titles, and descriptions.

## Features

- **5 Semantic Variants**: Default, destructive, warning, success, info
- **Flexible Content**: Support for titles, descriptions, and icons
- **Accessibility**: Built with proper ARIA roles and semantic HTML
- **Theme Support**: Full dark/light mode compatibility
- **TypeScript**: Complete type safety with variant props

## Basic Usage

```tsx
import { Alert, AlertTitle, AlertDescription } from '@acrobi/ui';

// Simple alert
<Alert variant="info">
  <AlertDescription>
    This is an informational message.
  </AlertDescription>
</Alert>

// Alert with title and description
<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>
    Your changes have been saved successfully.
  </AlertDescription>
</Alert>
```

## Variants

### Default
Basic alert for general information.

```tsx
<Alert variant="default">
  <AlertTitle>Notice</AlertTitle>
  <AlertDescription>
    Please review the information below.
  </AlertDescription>
</Alert>
```

### Destructive (Error)
For error messages and critical issues.

```tsx
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Something went wrong. Please try again.
  </AlertDescription>
</Alert>
```

### Warning
For cautionary messages and important notices.

```tsx
<Alert variant="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>
    This action cannot be undone.
  </AlertDescription>
</Alert>
```

### Success
For positive confirmations and successful actions.

```tsx
<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>
    Operation completed successfully!
  </AlertDescription>
</Alert>
```

### Info
For informational messages and helpful tips.

```tsx
<Alert variant="info">
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    Here's some helpful information.
  </AlertDescription>
</Alert>
```

## With Icons

Add visual icons to enhance the alert message:

```tsx
<Alert variant="warning">
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
  <AlertTitle>System Maintenance</AlertTitle>
  <AlertDescription>
    Scheduled maintenance tonight from 2-4 AM EST.
  </AlertDescription>
</Alert>
```

## API Reference

### Alert Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'warning' \| 'success' \| 'info'` | `'default'` | Visual style variant |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Alert content (title, description, icons) |

### AlertTitle Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Title content |

### AlertDescription Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Description content |

## Best Practices

### When to Use
- **Errors**: Form validation errors, API failures, system errors
- **Warnings**: Destructive actions, unsaved changes, important notices
- **Success**: Successful form submissions, saved changes, completed actions
- **Info**: Helpful tips, feature announcements, general information

### Accessibility
- Uses `role="alert"` for screen reader announcements
- Semantic color coding with sufficient contrast ratios
- Support for keyboard navigation and focus management

### Content Guidelines
- Keep messages concise and actionable
- Use clear, non-technical language
- Provide next steps when appropriate
- Include icons for better visual scanning

## Examples

### Form Validation
```tsx
<Alert variant="destructive">
  <AlertTitle>Validation Error</AlertTitle>
  <AlertDescription>
    Please correct the following fields: Email address is required.
  </AlertDescription>
</Alert>
```

### Success Confirmation
```tsx
<Alert variant="success">
  <AlertTitle>Profile Updated</AlertTitle>
  <AlertDescription>
    Your profile information has been successfully updated.
  </AlertDescription>
</Alert>
```

### System Status
```tsx
<Alert variant="info">
  <AlertTitle>New Feature Available</AlertTitle>
  <AlertDescription>
    Check out our new dashboard widgets in the settings panel.
  </AlertDescription>
</Alert>
```

## Version History

- **V1.0.0**: Initial implementation with 5 semantic variants
- Added comprehensive TypeScript support
- Included dark mode compatibility
- Built with class-variance-authority for style variants