# @acrobi/theme-system

Dynamic theming system with CSS custom properties for Acrobi applications. Supports light/dark modes and multiple theme presets.

## Installation

```bash
npm install @acrobi/theme-system
# or
pnpm add @acrobi/theme-system
# or
yarn add @acrobi/theme-system
```

## Usage

### Basic Usage

```tsx
import { acrobi } from '@acrobi/theme-system';

// Apply Acrobi theme
const theme = acrobi;
```

### With React

```tsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Apply theme on mount
    document.documentElement.setAttribute('data-theme', 'acrobi');
  }, []);

  return <div>Your App</div>;
}
```

### Dark Mode

```tsx
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}
```

## Available Themes

- **acrobi** - Default Acrobi light theme
- **acrobi-dark** - Acrobi dark theme

## Theme Structure

Each theme includes:

- **Colors**: Primary, semantic, neutral, surface, and text colors
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent 4px-based spacing scale
- **Motion**: Animation durations and easings
- **Audio**: Sound effect tokens
- **Haptics**: Vibration patterns

## Acrobi Framework Integration

This package is an Acrobi Framework extension and can be activated in the framework:

```typescript
import { activate } from '@acrobi/theme-system';

// Framework will call activate automatically
await activate(context);
```

## CSS Custom Properties

The theme system generates CSS custom properties that can be used in your styles:

```css
.my-component {
  background-color: var(--color-primary-500);
  color: var(--color-text-primary);
  padding: var(--spacing-4);
}
```

## License

MIT © Acrobi
