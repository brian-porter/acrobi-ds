# @acrobi/cli

The official CLI for the Acrobi Design System. Add components to your project as source code, giving you full control and customization capabilities.

## Installation

Install globally via npm:

```bash
npm install -g @acrobi/cli
```

Or use directly with npx:

```bash
npx @acrobi/cli list
```

## Quick Start

```bash
# List all available components
acrobi list

# Add a component to your project
acrobi add button

# Add a component with custom path
acrobi add button --path components

# Preview changes without making them
acrobi add button --dry-run
```

## Commands

### `acrobi list [options]`

List all available components with descriptions and metadata.

**Options:**

- `--category <category>` - Filter by category (primitive, structure, hook)
- `--tag <tag>` - Filter by tag (form, aae, interactive, etc.)

**Examples:**

```bash
acrobi list
acrobi list --category primitive
acrobi list --tag form
```

### `acrobi add <component> [options]`

Add a component to your project as source code.

**Options:**

- `--path <path>` - Target directory (default: src)
- `--force` - Overwrite existing files
- `--dry-run` - Preview changes without making them

**Examples:**

```bash
acrobi add button
acrobi add use-geolocation --path lib
acrobi add card --force
```

## Available Components

### Primitive Components

- **button** - Interactive element for triggering actions
- **card** - Flexible container for grouping content
- **input** - Form input with validation states
- **avatar** - User avatar with fallback support
- **badge** - Status indicator and label component

### Hook Components

- **use-geolocation** - Access user location with permissions
- **use-camera** - Device camera access and photo capture
- **use-barcode-scanner** - QR code and barcode scanning

## How It Works

The CLI copies components as source code directly to your project:

1. **Component Selection** - Choose from our curated component library
2. **Dependency Check** - Automatically identifies required packages
3. **File Copying** - Copies TypeScript/React source files to your project
4. **Smart Overwrites** - Protects existing files unless forced

## Project Structure

After using the CLI, your project structure will look like:

```
your-project/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   ├── hooks/
│   │   ├── use-geolocation.ts
│   │   ├── use-camera.ts
│   │   └── use-barcode-scanner.ts
│   └── lib/
│       └── utils.ts
└── package.json
```

## Integration

### Next.js

```bash
# In your Next.js project
npx create-next-app@latest my-app --typescript --tailwind
cd my-app

# Add components
acrobi add button
acrobi add card
acrobi add use-geolocation

# Use in your app
```

```tsx
// app/page.tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui';
import { useGeolocation } from '@/hooks/use-geolocation';

export default function Home() {
  const { coordinates, getCurrentPosition } = useGeolocation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={getCurrentPosition}>Get Location</Button>
        {coordinates && (
          <p>
            Lat: {coordinates.latitude}, Lng: {coordinates.longitude}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
```

### Vite + React

```bash
# In your Vite project
npm create vite@latest my-app -- --template react-ts
cd my-app

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Add components
acrobi add button
acrobi add input
```

## Dependencies

Components may require additional packages:

- **class-variance-authority** - Component variant management
- **clsx** - Conditional class names
- **tailwind-merge** - Tailwind class merging
- **React 18+** - React framework
- **TypeScript** - Type safety

The CLI will prompt to install missing dependencies automatically.

## Benefits

### ✅ Full Source Code Control

- Components copied as source code, not packaged dependencies
- Complete customization capabilities
- No black box dependencies
- Easy debugging and modification

### ✅ Minimal Bundle Size

- Only includes components you actually use
- No unused code in your bundle
- Tree-shaking friendly

### ✅ Framework Agnostic

- Works with any React framework
- No specific build requirements
- Standard TypeScript/JavaScript files

### ✅ Version Control Friendly

- All code in your repository
- Easy to track changes and modifications
- No external dependency issues

## Troubleshooting

### CLI Not Found

```bash
npm install -g @acrobi/cli
# or use npx
npx @acrobi/cli list
```

### Permission Errors

```bash
sudo npm install -g @acrobi/cli
# or use npx to avoid global installation
```

### Component Not Found

Use exact component names from `acrobi list`:

```bash
# ✅ Correct
acrobi add use-geolocation

# ❌ Incorrect
acrobi add useGeolocation
```

### Missing Dependencies

Install manually if auto-installation fails:

```bash
npm install class-variance-authority clsx tailwind-merge
```

## Requirements

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm
- React 18+
- TypeScript (recommended)
- Tailwind CSS (for styling)

## License

MIT License - see LICENSE file for details.

## Support

- 📖 [Documentation](https://acrobi-design-system.vercel.app)
- 🐛 [Report Issues](https://github.com/acrobi/acrobi-design-system/issues)
- 💬 [Discussions](https://github.com/acrobi/acrobi-design-system/discussions)
