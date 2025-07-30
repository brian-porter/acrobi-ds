# Acrobi Design System

A comprehensive, production-ready React component library built with TypeScript, Tailwind CSS, and accessibility-first principles.

[![Version](https://img.shields.io/npm/v/@acrobi/ui.svg)](https://www.npmjs.com/package/@acrobi/ui)
[![License](https://img.shields.io/npm/l/@acrobi/ui.svg)](https://github.com/acrobi/design-system/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## 🎯 Overview

The Acrobi Design System provides a complete set of components for building modern web applications. It includes 49 carefully crafted components across three categories:

- **24 Primitive Components** - Core building blocks (buttons, inputs, cards, etc.)
- **22 Structure Components** - Advanced compositions (data tables, upload fields, etc.)
- **3 AAE Hooks** - Acrobi's Advanced Experiences capabilities (geolocation, camera, barcode scanning)

## ✨ Features

- **🔧 TypeScript First** - Full type safety and IntelliSense support
- **🎨 Themeable** - Built-in theme system with CSS custom properties
- **♿ Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- **📱 Responsive** - Mobile-first design with responsive variants
- **🎭 Customizable** - Class Variance Authority (CVA) for flexible styling
- **⚡ Tree Shakeable** - Import only what you need
- **🔌 CLI Support** - Easy component scaffolding and installation

## 🚀 Quick Start

### Installation

```bash
npm install @acrobi/ui
```

### Basic Usage

```tsx
import { Button, Card, TextField } from '@acrobi/ui';

function App() {
  return (
    <Card>
      <TextField label='Email' type='email' placeholder='Enter your email' />
      <Button>Submit</Button>
    </Card>
  );
}
```

### With Tailwind CSS

Add our preset to your `tailwind.config.js`:

```js
module.exports = {
  presets: [require('@acrobi/ui/tailwind')],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@acrobi/ui/**/*.{js,ts,jsx,tsx}',
  ],
};
```

## 📚 Component Categories

### Primitive Components

Core building blocks for your application:

- **Interactive**: Button, Switch, Checkbox, Radio, Slider
- **Typography**: Headline, Paragraph, Text, Label
- **Layout**: Card, Avatar, Badge, Banner, Progress
- **Form**: Input, Textarea, Select, Accordion, Dialog
- **Navigation**: Breadcrumb, List, Tooltip, Tag, Chip

### Structure Components

Advanced compositions built from primitives:

- **Form Structures**: TextField, SelectField, CheckboxField, etc.
- **Grouping**: ButtonPanel, ButtonGroup, ObjectGroup, CheckboxGroup
- **Data Display**: DataTable, FilterBar, EmptyState, Breadcrumb
- **Advanced Input**: UploadField, GrantPermissions

### AAE Hooks

Acrobi's Advanced Experiences capabilities:

- `useGeolocation` - Access user location
- `useCamera` - Camera access and photo capture
- `useBarcodeScanner` - QR code and barcode scanning

## 🎨 Theming

The design system includes a flexible theming system:

```tsx
import { themes, themeToCSSProperties } from '@acrobi/ui';

// Apply theme
const acrobiTheme = themes.acrobi;
const cssProperties = themeToCSSProperties(acrobiTheme);
```

### Custom Theme

```tsx
import { Theme } from '@acrobi/ui';

const customTheme: Theme = {
  name: 'custom',
  tokens: {
    colors: {
      primary: { light: '220 100% 50%', dark: '220 100% 60%' },
      // ... other colors
    },
    // ... other tokens
  },
};
```

## 🏗️ Advanced Components

### DataTable

Comprehensive data table with sorting, filtering, and pagination:

```tsx
import { DataTable } from '@acrobi/ui';

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', filterable: true },
  { key: 'status', header: 'Status' },
];

<DataTable
  data={users}
  columns={columns}
  selectable
  pagination={{ page: 1, pageSize: 10, total: 100 }}
/>;
```

### UploadField

Advanced file upload with drag & drop:

```tsx
import { UploadField } from '@acrobi/ui';

<UploadField
  label='Upload Images'
  accept='image/*'
  multiple
  maxSize={10485760} // 10MB
  showPreviews
  onFilesChange={handleFiles}
/>;
```

### GrantPermissions

AAE permissions management:

```tsx
import { GrantPermissions } from '@acrobi/ui';

const permissions = [
  {
    key: 'notifications',
    name: 'Notifications',
    description: 'Get important updates',
    required: true,
  },
];

<GrantPermissions permissions={permissions} onGrantAll={handleGrantAll} />;
```

## 🛠️ CLI Usage

Install components using our CLI:

```bash
# Install specific component
npx @acrobi/cli add button

# Install with dependencies
npx @acrobi/cli add data-table

# List available components
npx @acrobi/cli list
```

## 📖 Component Props

All components are fully typed with TypeScript. Use your IDE's IntelliSense for complete prop documentation, or refer to our [component documentation](./docs/components/).

### Common Patterns

Most components follow these patterns:

```tsx
// Size variants
<Button size="sm" | "default" | "lg">

// Visual variants
<Button variant="default" | "outline" | "ghost" | "destructive">

// Disabled state
<Button disabled>

// Custom styling
<Button className="custom-class">
```

## ♿ Accessibility

All components are built with accessibility in mind:

- **Semantic HTML** - Proper element usage and structure
- **ARIA Attributes** - Screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Proper focus indicators and management
- **Color Contrast** - WCAG AA compliant color combinations

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Local Development

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build components
npm run build
```

### Building Components

```bash
# Type check
npm run type-check

# Build library
npm run build

# Build Component Documentation
npm run build-storybook
```

## 📁 Project Structure

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── primitives/     # Core components
│   │   └── structures/     # Advanced components
│   ├── hooks/              # AAE hooks
│   ├── themes/             # Theme definitions
│   ├── styles/             # Global styles
│   └── lib/                # Utilities
├── registry.json           # Component registry
└── package.json
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Component Development

1. **Primitives** go in `src/components/primitives/`
2. **Structures** go in `src/components/structures/`
3. Follow our [Component Guidelines](./docs/component-guidelines.md)
4. Add comprehensive TypeScript types
5. Include accessibility features
6. Add to the component registry

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

Built with:

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Class Variance Authority](https://cva.style/) - Component variants
- [Radix UI](https://www.radix-ui.com/) - Accessibility primitives

## 📞 Support

- **Documentation**: [Design System Docs](./docs/)
- **Issues**: [GitHub Issues](https://github.com/acrobi/design-system/issues)
- **Discussions**: [GitHub Discussions](https://github.com/acrobi/design-system/discussions)

---

Made with ❤️ by the Acrobi team
