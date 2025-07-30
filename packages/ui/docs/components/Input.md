# Input Component

A fundamental text input component for collecting user data with support for various input types, validation states, and accessibility features.

## Overview

The Input component is a primitive text input element that serves as the foundation for more complex form fields. It provides consistent styling, validation states, and accessibility features while remaining flexible and composable.

## Features

- **Multiple Input Types** - Text, email, password, number, search, and more
- **Validation States** - Error, success, and neutral states with visual feedback
- **Accessibility** - Built-in ARIA attributes and keyboard navigation
- **Theme Support** - Full dark/light mode compatibility
- **Size Variants** - Multiple sizes for different use cases
- **Icon Support** - Leading and trailing icons

## Basic Usage

```tsx
import { Input } from '@acrobi/ui';

// Basic text input
<Input placeholder="Enter your name" />

// Email input
<Input type="email" placeholder="Enter your email" />

// Password input
<Input type="password" placeholder="Enter your password" />

// Number input
<Input type="number" placeholder="Enter amount" min="0" max="100" />
```

## Input Types

### Text Input
```tsx
<Input 
  type="text" 
  placeholder="Enter text"
  defaultValue="Default text"
/>
```

### Email Input
```tsx
<Input 
  type="email" 
  placeholder="user@example.com"
  autoComplete="email"
/>
```

### Password Input
```tsx
<Input 
  type="password" 
  placeholder="Enter password"
  autoComplete="current-password"
/>
```

### Number Input
```tsx
<Input 
  type="number" 
  placeholder="0"
  min="0"
  max="100"
  step="1"
/>
```

### Search Input
```tsx
<Input 
  type="search" 
  placeholder="Search..."
  autoComplete="off"
/>
```

### URL Input
```tsx
<Input 
  type="url" 
  placeholder="https://example.com"
  autoComplete="url"
/>
```

### Tel Input
```tsx
<Input 
  type="tel" 
  placeholder="+1 (555) 123-4567"
  autoComplete="tel"
/>
```

## Size Variants

```tsx
// Extra small
<Input size="xs" placeholder="Extra small input" />

// Small
<Input size="sm" placeholder="Small input" />

// Default (medium)
<Input placeholder="Default input" />

// Large
<Input size="lg" placeholder="Large input" />

// Extra large
<Input size="xl" placeholder="Extra large input" />
```

## Validation States

### Error State
```tsx
<Input 
  placeholder="Enter email"
  error
  aria-invalid="true"
  aria-describedby="email-error"
/>
```

### Success State
```tsx
<Input 
  placeholder="Enter email"
  success
  aria-describedby="email-success"
/>
```

### Disabled State
```tsx
<Input 
  placeholder="Disabled input"
  disabled
/>
```

### Read-only State
```tsx
<Input 
  value="Read-only value"
  readOnly
/>
```

## Icons and Adornments

### Leading Icon
```tsx
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <SearchIcon className="h-5 w-5 text-gray-400" />
  </div>
  <Input 
    className="pl-10"
    placeholder="Search..."
    type="search"
  />
</div>
```

### Trailing Icon
```tsx
<div className="relative">
  <Input 
    className="pr-10"
    placeholder="Enter amount"
    type="number"
  />
  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
    <DollarIcon className="h-5 w-5 text-gray-400" />
  </div>
</div>
```

### Both Icons
```tsx
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <SearchIcon className="h-5 w-5 text-gray-400" />
  </div>
  <Input 
    className="pl-10 pr-10"
    placeholder="Search products..."
  />
  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
    <button type="button" className="text-gray-400 hover:text-gray-600">
      <XIcon className="h-5 w-5" />
    </button>
  </div>
</div>
```

## Controlled vs Uncontrolled

### Controlled Input
```tsx
import { useState } from 'react';

function ControlledExample() {
  const [value, setValue] = useState('');

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Controlled input"
    />
  );
}
```

### Uncontrolled Input
```tsx
import { useRef } from 'react';

function UncontrolledExample() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    console.log(inputRef.current?.value);
  };

  return (
    <Input
      ref={inputRef}
      defaultValue="Initial value"
      placeholder="Uncontrolled input"
    />
  );
}
```

## Form Integration

### With Form Libraries
```tsx
import { useForm } from 'react-hook-form';

function FormExample() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('email', { 
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email address'
          }
        })}
        type="email"
        placeholder="Enter your email"
        error={!!errors.email}
        aria-invalid={errors.email ? 'true' : 'false'}
      />
      {errors.email && (
        <span role="alert">{errors.email.message}</span>
      )}
    </form>
  );
}
```

### Native Form Validation
```tsx
<Input
  type="email"
  placeholder="Enter your email"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  title="Please enter a valid email address"
/>
```

## API Reference

### Input Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | HTML input type |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Input size variant |
| `error` | `boolean` | `false` | Error state styling |
| `success` | `boolean` | `false` | Success state styling |
| `disabled` | `boolean` | `false` | Disabled state |
| `readOnly` | `boolean` | `false` | Read-only state |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | - | Default value for uncontrolled |
| `onChange` | `(e: ChangeEvent) => void` | - | Change event handler |
| `onFocus` | `(e: FocusEvent) => void` | - | Focus event handler |
| `onBlur` | `(e: FocusEvent) => void` | - | Blur event handler |
| `className` | `string` | - | Additional CSS classes |
| `id` | `string` | - | HTML id attribute |
| `name` | `string` | - | HTML name attribute |
| `autoComplete` | `string` | - | Autocomplete attribute |
| `autoFocus` | `boolean` | `false` | Auto focus on mount |
| `required` | `boolean` | `false` | Required field |
| `min` | `string \| number` | - | Minimum value (for number/date) |
| `max` | `string \| number` | - | Maximum value (for number/date) |
| `step` | `string \| number` | - | Step value (for number) |
| `pattern` | `string` | - | Validation pattern |
| `maxLength` | `number` | - | Maximum character length |
| `minLength` | `number` | - | Minimum character length |

## Accessibility

### ARIA Attributes
```tsx
<Input
  placeholder="Enter email"
  aria-label="Email address"
  aria-describedby="email-help"
  aria-invalid={hasError ? 'true' : 'false'}
  aria-required="true"
/>
```

### Form Labels
Always associate inputs with labels:

```tsx
<div>
  <label htmlFor="email-input">Email Address</label>
  <Input
    id="email-input"
    type="email"
    placeholder="Enter your email"
  />
</div>
```

### Error Messages
Link error messages with `aria-describedby`:

```tsx
<div>
  <Input
    type="email"
    placeholder="Enter email"
    error
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <div id="email-error" role="alert">
    Please enter a valid email address
  </div>
</div>
```

### Keyboard Navigation
Inputs support standard keyboard navigation:
- **Tab** - Move focus to/from input
- **Shift + Tab** - Move focus backward
- **Enter** - Submit form (in form context)
- **Escape** - Clear input (for search inputs)

## Styling and Customization

### Custom Styling
```tsx
<Input
  className="border-2 border-blue-500 focus:border-blue-700"
  placeholder="Custom styled input"
/>
```

### CSS Variables
The Input component uses CSS custom properties for theming:

```css
.input {
  --input-bg: var(--color-background);
  --input-border: var(--color-border);
  --input-text: var(--color-foreground);
  --input-placeholder: var(--color-muted-foreground);
  --input-focus: var(--color-primary);
  --input-error: var(--color-destructive);
  --input-success: var(--color-success);
}
```

### Size Customization
```css
.input-xs { height: 2rem; font-size: 0.75rem; }
.input-sm { height: 2.25rem; font-size: 0.875rem; }
.input-md { height: 2.5rem; font-size: 1rem; }
.input-lg { height: 2.75rem; font-size: 1.125rem; }
.input-xl { height: 3rem; font-size: 1.25rem; }
```

## Best Practices

### Placeholder Text
- Use descriptive placeholder text
- Don't rely on placeholders as labels
- Keep placeholder text concise

```tsx
// ✅ Good
<Input placeholder="Enter your email address" />

// ❌ Avoid
<Input placeholder="Email" />
```

### Validation
- Provide immediate feedback for validation
- Use appropriate input types for validation
- Include helpful error messages

```tsx
// ✅ Good
<Input
  type="email"
  placeholder="Enter your email"
  error={hasError}
  aria-describedby="email-error"
/>
{hasError && (
  <div id="email-error" role="alert">
    Please enter a valid email address (e.g., user@example.com)
  </div>
)}
```

### Performance
- Use `defaultValue` for uncontrolled inputs when possible
- Debounce onChange handlers for expensive operations
- Consider using `React.memo` for inputs in large forms

```tsx
// Debounced search input
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 300);

<Input
  placeholder="Search..."
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

## Common Patterns

### Search Input
```tsx
<div className="relative">
  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
  <Input
    type="search"
    placeholder="Search..."
    className="pl-10"
    onChange={handleSearch}
  />
</div>
```

### Currency Input
```tsx
<div className="relative">
  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
  <Input
    type="number"
    placeholder="0.00"
    className="pl-8"
    step="0.01"
    min="0"
  />
</div>
```

### Password Input with Toggle
```tsx
function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter password"
        className="pr-10"
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}
```

## Related Components

- **[TextField](./structures/text-field.md)** - Complete form field with label and validation
- **[Label](./Label.md)** - Form labels for inputs
- **[Button](./Button.md)** - For input actions
- **[Icon](./Icon.md)** - For input adornments

## Version History

- **V1.0.0**: Initial implementation with size variants and validation states
- Added comprehensive accessibility support
- Included TypeScript definitions
- Built with theme system integration