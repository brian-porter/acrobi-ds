# @acrobi/primitives

**Foundation UI Component Library for Acrobi Design System**

Core UI building blocks for Acrobi applications. This package provides 50+ accessible, type-safe React components built with Tailwind CSS and Radix UI primitives. It serves as the foundational layer with **zero dependencies on other @acrobi packages**.

## 📦 Installation

```bash
# Using pnpm (recommended for monorepo)
pnpm add @acrobi/primitives

# Using npm
npm install @acrobi/primitives

# Using yarn
yarn add @acrobi/primitives
```

## 🎯 Key Features

- ✅ **50+ Components** - Comprehensive component library covering all UI needs
- ✅ **TypeScript First** - Full type safety with detailed prop types and interfaces
- ✅ **WCAG 2.1 Compliant** - Fully accessible, keyboard navigable components
- ✅ **Dark Mode Ready** - Built-in theme support with CSS custom properties
- ✅ **Tree-Shakeable** - Import only what you need, minimal bundle impact
- ✅ **CVA Variants** - Powerful variant system with Class Variance Authority
- ✅ **Zero @acrobi deps** - Foundation package, no circular dependencies
- ✅ **Framework Integration** - Native Acrobi Framework extension support

## 🚀 Quick Start

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@acrobi/primitives';

function LoginForm() {
  return (
    <Card className="w-96 p-6">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="email" placeholder="Email address" />
        <Input type="password" placeholder="Password" />
        <Button variant="prime" className="w-full">Sign In</Button>
      </CardContent>
    </Card>
  );
}
```

## Components

### Interactive Components
- **Button** - Multi-variant button with filled, line, text styles
- **Switch** - Toggle switch control
- **Checkbox** - Checkbox input with indeterminate support
- **Radio** - Radio button control
- **Slider** - Range slider input

### Typography Components
- **Headline** - Heading component (h1-h6)
- **Paragraph** - Paragraph text
- **Text** - Generic text component
- **Label** - Form label component

### Layout Components
- **Card** - Container with Header, Title, Description, Content, Footer
- **Avatar** - User avatar with Image and Fallback
- **Badge** - Status badge/pill
- **Banner** - Notification banner
- **Progress** - Progress indicator

### Form Primitives
- **Input** - Text input field
- **Textarea** - Multi-line text input
- **Select** - Dropdown select
- **Accordion** - Collapsible sections
- **Dialog** - Modal dialog
- **Alert** - Alert/notification component
- **Chip** - Removable tag/chip
- **Chiclet** - Small interactive chip

### Control Components
All advanced form controls including:
- CboxCtrl, RdoCtrl, SwitchCtrl
- TextfieldCtrl, TextareaCtrl, UploadCtrl
- SliderCtrl, RateCtrl, SelectlistCtrl
- SegBtnCtrl, SwitchGrpCtrl, CboxGrpCtrl, RdoGrpCtrl

## Acrobi Framework Integration

This package is an Acrobi Framework extension and can be activated in the framework:

```typescript
import { activate } from '@acrobi/primitives';

// Framework will call activate automatically
await activate(context);
```

## Theming

Components support theming via CSS custom properties. Use with `@acrobi/theme-system` for advanced theming.

## License

MIT © Acrobi
