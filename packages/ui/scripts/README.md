# Acrobi Theme Build System

A comprehensive theme build script system for the Acrobi Design System that compiles TypeScript theme token files into CSS custom properties, supports multiple themes, and enables theme inheritance.

## Features

- 🎨 **TypeScript Token Files**: Define themes using strongly-typed TypeScript files
- 🧬 **Theme Inheritance**: Create new themes by extending existing ones with `--extends`
- 🌙 **Dark Mode Support**: Automatic light and dark mode CSS generation
- 📦 **Multiple Formats**: Output CSS, JSON, or TypeScript
- 👀 **Watch Mode**: Development mode with automatic rebuilding
- ✅ **Type Validation**: Validates themes against TypeScript interfaces
- 🚀 **CLI Integration**: Easy-to-use command line interface

## Directory Structure

```
packages/ui/
├── scripts/
│   ├── build-themes.js          # Main build script
│   └── README.md               # This documentation
├── src/
│   ├── themes/
│   │   ├── base/               # Base theme definitions
│   │   │   ├── acrobi/         # Base Acrobi theme
│   │   │   │   ├── colors.ts   # Color tokens
│   │   │   │   ├── spacing.ts  # Spacing tokens
│   │   │   │   ├── typography.ts # Typography tokens
│   │   │   │   ├── radius.ts   # Border radius tokens
│   │   │   │   └── index.ts    # Theme export
│   │   │   └── acrobi-dark/    # Example inherited theme
│   │   │       └── index.ts
│   │   ├── acrobi.ts           # Legacy theme definition
│   │   └── index.ts            # Theme registry
│   ├── theme.ts                # TypeScript interfaces
│   └── styles/
│       └── themes/             # Generated CSS output
│           ├── theme-acrobi.css
│           └── theme-acrobi-dark.css
```

## Quick Start

### Build All Themes
```bash
npm run build:themes
```

### Watch Mode (Development)
```bash
npm run build:themes:watch
```

### Create New Theme
```bash
npm run create:theme my-theme
```

### Create Theme with Inheritance
```bash
npm run create:theme my-theme -- --extends acrobi
```

## Command Line Usage

### Basic Usage
```bash
node scripts/build-themes.js [options]
```

### Options

| Option | Short | Description | Example |
|--------|-------|-------------|---------|
| `--watch` | `-w` | Watch for changes and rebuild | `--watch` |
| `--minify` | `-m` | Minify output CSS | `--minify` |
| `--verbose` | `-v` | Verbose logging | `--verbose` |
| `--theme` | `-t` | Build specific theme only | `--theme acrobi` |
| `--output` | `-o` | Output format (css, json, typescript) | `--output json` |
| `--create-theme` | | Create new theme | `--create-theme my-theme` |
| `--extends` | | Extend from existing theme | `--extends acrobi` |
| `--help` | `-h` | Show help | `--help` |

### Examples

#### Build specific theme as JSON
```bash
node scripts/build-themes.js --theme acrobi --output json
```

#### Create new corporate theme extending Acrobi
```bash
node scripts/build-themes.js --create-theme corporate --extends acrobi
```

#### Build all themes in watch mode with verbose logging
```bash
node scripts/build-themes.js --watch --verbose
```

#### Minified CSS output
```bash
node scripts/build-themes.js --minify --output css
```

## Theme Structure

### Base Theme Definition
Each base theme should be organized in the `src/themes/base/` directory:

```typescript
// src/themes/base/my-theme/colors.ts
export const colors: Colors = {
  background: {
    light: '0 0% 100%',
    dark: '222.2 47.4% 11.2%',
  },
  // ... other color definitions
};

// src/themes/base/my-theme/index.ts
import { colors } from './colors';
import { spacing } from './spacing';
import { fontFamily } from './typography';
import { borderRadius } from './radius';

export const myTheme: Theme = {
  name: 'my-theme',
  tokens: { colors, spacing, fontFamily, borderRadius },
};
```

### Theme Inheritance
Create themes that extend others:

```typescript
export const myDarkTheme: Theme = {
  name: 'my-dark-theme',
  extends: 'my-theme', // Parent theme
  tokens: {
    colors: {
      // Override specific colors
      background: {
        light: '29 28 26',
        dark: '17 17 17',
      },
      // Inherit other colors from parent
    },
    // Inherit spacing, fontFamily, borderRadius from parent
  },
};
```

## Generated CSS Output

The build script generates CSS with the following structure:

```css
/* Light mode variables */
[data-theme='acrobi'] {
  --color-background: 254 254 254;
  --color-foreground: 29 28 26;
  --color-primary: 25 117 240;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --font-sans: "SF Pro Display", sans-serif;
  --radius-sm: 0.25rem;
  /* ... */
}

/* Dark mode overrides */
[data-theme='acrobi'].dark {
  --color-background: 29 28 26;
  --color-foreground: 254 254 254;
  /* ... */
}
```

## Integration with Components

Use the generated CSS custom properties in your components:

```tsx
// Using CSS custom properties
<div style={{ 
  backgroundColor: 'rgb(var(--color-background))',
  color: 'rgb(var(--color-foreground))',
  padding: 'var(--spacing-md)',
  borderRadius: 'var(--radius-md)'
}}>
  Themed content
</div>

// Using with Tailwind CSS
<div className="bg-background text-foreground p-md rounded-md">
  Themed content
</div>
```

## Theme Validation

The build script validates themes against the TypeScript interface:

```typescript
interface Theme {
  name: string;
  extends?: string;
  tokens: {
    colors: Colors;
    spacing: Spacing;
    fontFamily: FontFamily;
    borderRadius: BorderRadius;
  };
  metadata?: ThemeMetadata;
}
```

Required token categories:
- **Colors**: 17 required color tokens (background, foreground, primary, etc.)
- **Spacing**: 5 required spacing tokens (xs, sm, md, lg, xl)
- **FontFamily**: 3 required font families (sans, serif, mono)
- **BorderRadius**: 4 required radius tokens (sm, md, lg, full)

## Advanced Features

### Extended Token Sets
Each token category includes extended sets for advanced use cases:

```typescript
import { 
  extendedColors,
  extendedSpacing,
  extendedTypography,
  extendedBorderRadius 
} from './themes/base/acrobi';
```

### Theme Metadata
Add rich metadata to themes:

```typescript
export const myTheme: Theme = {
  name: 'my-theme',
  tokens: { /* ... */ },
  metadata: {
    description: 'A beautiful custom theme',
    version: '1.0.0',
    author: 'Your Name',
    categories: ['corporate', 'modern'],
    supports: {
      darkMode: true,
      highContrast: true,
    },
    features: ['Custom typography', 'Brand colors'],
  },
};
```

### Output Formats

#### CSS (Default)
Generates CSS custom properties for use in stylesheets.

#### JSON
Generates JSON for programmatic theme consumption:
```json
{
  "name": "acrobi",
  "tokens": {
    "colors": {
      "background": {"light": "254 254 254", "dark": "29 28 26"}
    }
  }
}
```

#### TypeScript
Generates TypeScript files for import in other modules:
```typescript
export const acrobi: Theme = {
  name: 'acrobi',
  tokens: { /* ... */ }
};
```

## Development Workflow

1. **Create Theme**: Use `--create-theme` to scaffold new themes
2. **Edit Tokens**: Modify token files in `src/themes/base/`
3. **Watch Mode**: Run build script with `--watch` during development
4. **Validate**: Build script automatically validates against TypeScript interfaces
5. **Test**: Use generated CSS in your components
6. **Build**: Generate production CSS with `--minify`

## Troubleshooting

### Common Issues

**Theme not found**: Ensure theme files are in the correct directory structure.

**Validation errors**: Check that all required token categories are defined.

**CSS not updating**: Clear browser cache or check output directory.

**Watch mode not working**: Ensure `chokidar` is installed as a dev dependency.

### Debug Mode
Use `--verbose` flag for detailed logging:
```bash
node scripts/build-themes.js --verbose
```

## Integration Examples

### With Storybook
```typescript
// .storybook/preview.ts
import '../src/styles/themes/theme-acrobi.css';

export const parameters = {
  backgrounds: {
    values: [
      { name: 'Light', value: 'rgb(var(--color-background))' },
      { name: 'Dark', value: 'rgb(var(--color-background))' },
    ],
  },
};
```

### With Next.js
```tsx
// pages/_document.tsx
export default function Document() {
  return (
    <Html data-theme="acrobi">
      <Head>
        <link rel="stylesheet" href="/themes/theme-acrobi.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### With Vite
```typescript
// vite.config.ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "./src/styles/themes/theme-acrobi.css";`
      }
    }
  }
});
```

## Contributing

When adding new themes or extending the build system:

1. Follow the established directory structure
2. Validate themes against TypeScript interfaces
3. Update this documentation
4. Add tests for new functionality
5. Ensure backward compatibility

## Performance

The build script is optimized for:
- **Fast rebuilds** in watch mode (only changed themes)
- **Parallel processing** of multiple themes
- **Efficient caching** of TypeScript compilation
- **Minimal output** with optional minification

## License

Part of the Acrobi Design System. See main package license for details.