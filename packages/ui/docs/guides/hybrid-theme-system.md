# Hybrid Theme System Guide

The Acrobi Design System supports a **hybrid approach** that combines the best of both worlds:
- **Acrobi components** with semantic props (`styling="pf"`, `size="m"`)
- **Tailwind utilities** that automatically respect your themes

## Quick Start

### 1. Install Dependencies

```bash
npm install tailwindcss @tailwindcss/forms
```

### 2. Configure Tailwind

```js
// tailwind.config.js
const { createAcrobiTailwindConfig } = require('@acrobi/ui/dist/styles/tailwind/tailwind-theme-config');

module.exports = createAcrobiTailwindConfig({
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // Add your content paths
  ],
});
```

### 3. Import Semantic Bridge

```css
/* In your main CSS file */
@import '@acrobi/ui/dist/styles/themes/semantic-bridge.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Use Both Systems Together

```tsx
function ProductCard({ product }) {
  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
      {/* Acrobi component with semantic props */}
      <Button styling="pf" size="m">
        Add to Cart
      </Button>
      
      {/* Tailwind utilities that respect the theme */}
      <div className="mt-4 space-y-2">
        <h3 className="text-foreground font-semibold">{product.name}</h3>
        <p className="text-muted-foreground text-sm">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold">${product.price}</span>
          <div className="bg-secondary/10 px-2 py-1 rounded text-xs">
            In Stock
          </div>
        </div>
      </div>
    </div>
  );
}
```

## How It Works

### Semantic Variable Mapping

Your existing Acrobi variables are mapped to standard Tailwind semantic names:

```css
:root {
  /* Acrobi → Tailwind Semantic Mapping */
  --primary: var(--color--p500);         /* Your primary blue */
  --primary-foreground: var(--color--n000); /* White text on primary */
  --background: var(--color--n000);      /* Your background color */
  --foreground: var(--color--n999);      /* Your text color */
  --muted: var(--color--n300);          /* Your muted gray */
  --muted-foreground: var(--color--n700); /* Muted text */
  --border: var(--color--n300);         /* Border color */
  /* ... and many more */
}
```

### Theme Switching

When you switch themes, **both systems update automatically**:

```tsx
function App() {
  const [theme, setTheme] = useState('acrobi');
  
  return (
    <div data-theme={theme}>
      {/* Your component - automatically themed */}
      <Button styling="pf">Acrobi Button</Button>
      
      {/* Tailwind utilities - also automatically themed */}
      <div className="bg-primary text-primary-foreground p-4">
        This div uses the same colors as the button above!
      </div>
    </div>
  );
}
```

## Available Semantic Colors

### Primary Colors
- `bg-primary` / `text-primary` - Your main brand color
- `bg-primary-foreground` / `text-primary-foreground` - Text on primary backgrounds

### Secondary Colors  
- `bg-secondary` / `text-secondary` - Your secondary brand color
- `bg-secondary-foreground` / `text-secondary-foreground` - Text on secondary backgrounds

### Background Colors
- `bg-background` / `text-foreground` - Main background and text
- `bg-card` / `text-card-foreground` - Card backgrounds

### Muted Colors
- `bg-muted` / `text-muted-foreground` - Subtle backgrounds and muted text

### Status Colors
- `bg-destructive` / `text-destructive` - Error/danger states
- `bg-warning` / `text-warning` - Warning states  
- `bg-success` / `text-success` - Success states

### UI Colors
- `border-border` - Default border color
- `bg-input` - Input field backgrounds
- `ring-ring` - Focus ring color

## Theme-Specific Colors

### Acrobi Theme
```css
[data-theme='acrobi'] {
  --primary: #1975f0;           /* Acrobi blue */
  --background: #fefefe;        /* Almost white */
  --foreground: #1d1c1a;        /* Dark text */
}
```

### BlueQueue Theme (Webflow Match)
```css
[data-theme='bluequeue'] {
  --primary: rgb(48, 47, 44);   /* Webflow dark gray */
  --background: rgb(255, 254, 255); /* Webflow white */
  --foreground: rgb(29, 28, 26);    /* Webflow text */
}
```

## Advanced Usage

### Custom Tailwind Config

For more control, use the minimal config:

```js
// tailwind.config.js
const { createMinimalAcrobiConfig } = require('@acrobi/ui/dist/styles/tailwind/tailwind-theme-config');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...createMinimalAcrobiConfig(),
      // Your custom extensions
      colors: {
        brand: 'var(--primary)',
        // Custom colors
      },
    },
  },
};
```

### Framework-Specific Configs

Pre-built configurations for popular frameworks:

```js
// For Next.js
const { prebuiltConfigs } = require('@acrobi/ui/dist/styles/tailwind/tailwind-theme-config');
module.exports = prebuiltConfigs.nextjs();

// For React
module.exports = prebuiltConfigs.react();

// For Vue
module.exports = prebuiltConfigs.vue();
```

### HSL Colors for Advanced Usage

For more advanced color manipulation:

```js
const { getThemeHSLColors } = require('@acrobi/ui/dist/styles/tailwind/tailwind-theme-config');

const acrobiHSL = getThemeHSLColors('acrobi');
const bluequeueHSL = getThemeHSLColors('bluequeue');

// Use in your config
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: `hsl(${acrobiHSL.primary})`,
        // Generate shades
        'primary-50': `hsl(${acrobiHSL.primary} / 0.05)`,
        'primary-100': `hsl(${acrobiHSL.primary} / 0.1)`,
        'primary-500': `hsl(${acrobiHSL.primary})`,
        'primary-900': `hsl(${acrobiHSL.primary} / 0.9)`,
      },
    },
  },
};
```

## Best Practices

### 1. Component Library Usage
Keep using your semantic component props:
```tsx
// ✅ Good - Semantic and stable
<Button styling="pf" size="m">Primary Button</Button>

// ❌ Avoid - Too many utility classes
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
  Primary Button
</button>
```

### 2. Layout and Spacing
Use Tailwind for layout and spacing:
```tsx
// ✅ Good - Tailwind for layout, Acrobi for components
<div className="grid grid-cols-2 gap-4 p-6">
  <Button styling="pf" size="m">Button 1</Button>
  <Button styling="pl" size="m">Button 2</Button>
</div>
```

### 3. Theme-Aware Styling
Let both systems respect the theme:
```tsx
// ✅ Good - Both automatically theme
<div data-theme="bluequeue">
  <div className="bg-primary/10 p-4 rounded-lg">
    <Button styling="pf" size="m">Themed Button</Button>
    <p className="text-muted-foreground mt-2">Themed text</p>
  </div>
</div>
```

### 4. Status and Feedback
Use semantic colors for status states:
```tsx
// ✅ Good - Semantic status colors
<div className="bg-success/10 border border-success/20 text-success p-4 rounded">
  Success message
</div>

<div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded">
  Error message  
</div>
```

## Migration Guide

### From Pure Acrobi
No changes needed! Keep using your components as-is, optionally add Tailwind utilities for layout.

### From Pure Tailwind
Replace hard-coded colors with semantic variables:

```tsx
// Before
<div className="bg-blue-500 text-white">...</div>

// After  
<div className="bg-primary text-primary-foreground">...</div>
```

## Examples

See the complete example in `/src/examples/hybrid-app-example.tsx` for a full demonstration of:
- Product cards with mixed styling approaches
- Forms using both systems
- Theme switching affecting both component and utility styles
- Status indicators with semantic colors

## Troubleshooting

### Colors Not Updating
Make sure you're importing the semantic bridge:
```css
@import '@acrobi/ui/dist/styles/themes/semantic-bridge.css';
```

### Theme Not Switching
Ensure your theme container has the correct attribute:
```tsx
<div data-theme="bluequeue">
  {/* Your app */}
</div>
```

### Missing Utilities
Check that your Tailwind config includes the Acrobi configuration:
```js
const { createAcrobiTailwindConfig } = require('@acrobi/ui/dist/styles/tailwind/tailwind-theme-config');
module.exports = createAcrobiTailwindConfig();
```

## Support

- **Documentation**: This guide and inline code comments
- **Examples**: See `/src/examples/` for complete working examples  
- **Types**: Full TypeScript support for all configuration functions