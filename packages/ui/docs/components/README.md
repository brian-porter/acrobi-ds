# Component Documentation

This directory contains comprehensive documentation for all Acrobi Design System components, automatically generated from the component registry.

## 📚 Documentation Structure

### [Primitive Components](./primitives/) (24 Components)
Core building blocks that form the foundation of the design system:

- **Interactive Components** - Button, Switch, Checkbox, Radio, Slider
- **Typography Components** - Headline, Paragraph, Text, Label
- **Layout Components** - Card, Avatar, Badge, Banner, Progress
- **Form Components** - Input, Textarea, Select, Accordion, Dialog
- **Navigation Components** - Breadcrumb, List, Tooltip, Tag, Chip

### [Structure Components](./structures/) (22 Components)
Advanced compositions built from primitives for complex use cases:

- **Form Structures** - TextField, SelectField, CheckboxField, RadioField, etc.
- **Grouping Structures** - ButtonPanel, ButtonGroup, ObjectGroup, CheckboxGroup
- **Data Display Structures** - DataTable, FilterBar, EmptyState, Breadcrumb
- **Advanced Input Structures** - UploadField, GrantPermissions

### [PWA Hooks](./hooks/) (3 Hooks)
Progressive web app capabilities for modern device integration:

- **useGeolocation** - Access user location services
- **useCamera** - Camera access and photo capture
- **useBarcodeScanner** - QR code and barcode scanning

## 🎯 Quick Reference

### By Category

| Category | Count | Examples |
|----------|-------|----------|
| **Primitives** | 24 | Button, Input, Card, Dialog |
| **Structures** | 22 | DataTable, TextField, ButtonGroup |
| **Hooks** | 3 | useGeolocation, useCamera, useBarcodeScanner |

### By Use Case

| Use Case | Components |
|----------|------------|
| **Forms** | TextField, SelectField, CheckboxField, RadioField, SliderField, SwitchField, TextareaField |
| **Data Display** | DataTable, EmptyState, FilterBar, Progress, Banner |
| **Navigation** | Breadcrumb, List, Tooltip |
| **Layout** | Card, ObjectGroup, ButtonPanel |
| **Interactive** | Button, Switch, Checkbox, Radio, Slider, ButtonGroup |
| **Typography** | Headline, Paragraph, Text, Label |
| **Media** | Avatar, UploadField, useCamera |
| **PWA** | GrantPermissions, useGeolocation, useBarcodeScanner |

## 📖 How to Read Component Documentation

Each component page includes:

1. **Overview** - Purpose and use cases
2. **Installation** - How to add via CLI or npm
3. **Basic Usage** - Simple examples
4. **API Reference** - Complete props documentation
5. **Examples** - Real-world implementations
6. **Accessibility** - WCAG compliance details
7. **Related Components** - Suggested combinations

## 🛠️ Using Components

### Installation

```bash
# Install specific component
npx @acrobi/cli add button card text-field

# Install with dependencies
npx @acrobi/cli add data-table

# Install entire library
npm install @acrobi/ui
```

### Basic Import Pattern

```tsx
import { Button, Card, TextField } from '@acrobi/ui';

function MyComponent() {
  return (
    <Card>
      <TextField label="Name" placeholder="Enter your name" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## 🎨 Design Principles

All components follow these core principles:

### 1. **Accessibility First**
- WCAG 2.1 AA compliant
- Proper semantic HTML
- ARIA attributes
- Keyboard navigation

### 2. **TypeScript Native**
- Full type safety
- IntelliSense support
- Generic type support
- Runtime type checking

### 3. **Composable Architecture**
- Primitives as building blocks
- Structures as compositions
- Flexible prop interfaces
- Consistent patterns

### 4. **Responsive Design**
- Mobile-first approach
- Flexible layouts
- Adaptive breakpoints
- Touch-friendly interactions

### 5. **Themeable System**
- CSS custom properties
- Light/dark mode support
- Brand customization
- Runtime theme switching

## 🔗 Related Resources

- [Getting Started Guide](../getting-started.md)
- [Theming Documentation](../theming.md)
- [Accessibility Guide](../accessibility.md)
- [Migration Guide](../migration.md)
- [Component Registry](../../packages/ui/registry.json)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/acrobi/design-system/issues)
- **Discussions**: [GitHub Discussions](https://github.com/acrobi/design-system/discussions)
- **Documentation**: [Design System Docs](../)

---

*Documentation auto-generated from registry v1.0.0*