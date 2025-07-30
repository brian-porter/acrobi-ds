# Acrobi Design System

A comprehensive, production-ready React component library and design system monorepo built with TypeScript, Tailwind CSS, and accessibility-first principles.

[![Version](https://img.shields.io/npm/v/@acrobi/ui.svg)](https://www.npmjs.com/package/@acrobi/ui)
[![License](https://img.shields.io/npm/l/@acrobi/ui.svg)](https://github.com/acrobi/design-system/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## 🎯 Project Overview

The Acrobi Design System is a monorepo containing a complete ecosystem for building modern web applications. It provides a unified design language, comprehensive component library, CLI tooling, and documentation system.

### What's Included

- **🎨 Component Library** (`@acrobi/ui`) - 49 production-ready React components
- **🛠️ CLI Tools** (`@acrobi/cli`) - Component scaffolding and installation
- **📚 Documentation** - Comprehensive guides and API references
- **🎭 Theming System** - Flexible, CSS-custom-property-based themes
- **♿ Accessibility** - WCAG 2.1 AA compliant components

## 🚀 Quick Start

### Installation

```bash
# Install the component library
npm install @acrobi/ui

# Or use the CLI to scaffold components
npx @acrobi/cli init
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

## 📦 Packages

### @acrobi/ui

The core component library containing 49 components across three categories:

- **24 Primitive Components** - Core building blocks (buttons, inputs, cards, etc.)
- **22 Structure Components** - Advanced compositions (data tables, upload fields, etc.)
- **3 AAE Hooks** - Acrobi's Advanced Experiences capabilities (geolocation, camera, barcode scanning)

[View UI Package Documentation →](./packages/ui/README.md)

### @acrobi/cli

Command-line interface for working with the design system:

```bash
# Add components to your project
npx @acrobi/cli add button card

# List available components
npx @acrobi/cli list

# Initialize design system in project
npx @acrobi/cli init
```

## 🏗️ Monorepo Structure

```
acrobi-ds/
├── packages/
│   ├── ui/                 # Component library (@acrobi/ui)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── primitives/    # 24 core components
│   │   │   │   └── structures/    # 22 advanced components
│   │   │   ├── hooks/             # 3 AAE hooks
│   │   │   ├── themes/            # Theme definitions
│   │   │   └── lib/               # Utilities
│   │   └── registry.json          # Component registry
│   └── cli/                # CLI tools (@acrobi/cli)
├── docs/                   # Documentation and guides
│   ├── v3/                # V1.0.0 implementation docs
│   └── components/        # Legacy reference docs
├── examples/              # Usage examples
└── tools/                # Build and development tools
```

## ✨ Key Features

### 🔧 Developer Experience

- **TypeScript First** - Full type safety and IntelliSense support
- **Tree Shakeable** - Import only what you need
- **CLI Support** - Easy component scaffolding and installation
- **Hot Reload** - Fast development with instant feedback

### 🎨 Design & Theming

- **Consistent Design Language** - Unified visual system
- **Flexible Theming** - CSS custom properties with light/dark mode
- **Component Variants** - Class Variance Authority (CVA) for styling
- **Responsive Design** - Mobile-first approach

### ♿ Accessibility & Quality

- **WCAG 2.1 AA Compliant** - Comprehensive accessibility testing
- **Semantic HTML** - Proper element usage and structure
- **ARIA Attributes** - Full screen reader support
- **Keyboard Navigation** - Complete keyboard accessibility
- **Focus Management** - Proper focus indicators and behavior

### 📱 Acrobi's Advanced Experiences

- **AAE Hooks** - Geolocation, camera, barcode scanning
- **Offline Support** - Service worker integration patterns
- **Mobile Optimization** - Touch-friendly components
- **Permission Management** - User-friendly permission requests

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Git

### Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd acrobi-ds

# Install dependencies
pnpm install

# Start development
pnpm dev

# Run tests
pnpm test

# Build all packages
pnpm build
```

### Development Commands

```bash
# Development server
pnpm dev                    # Start development for all packages
pnpm dev:ui                 # Start UI package development
pnpm dev:cli                # Start CLI development

# Testing
pnpm test                   # Run all tests
pnpm test:ui                # Test UI components
pnpm test:e2e               # End-to-end tests

# Building
pnpm build                  # Build all packages
pnpm build:ui               # Build UI package only
pnpm build:cli              # Build CLI package only

# Code Quality
pnpm lint                   # Lint all packages
pnpm type-check             # TypeScript type checking
pnpm format                 # Format code with Prettier
```

## 📚 Documentation

### Component Documentation

- [UI Package README](./packages/ui/README.md) - Complete component library documentation
- [Getting Started Guide](./packages/ui/docs/getting-started.md) - Setup and implementation guide
- [Component API Reference](./packages/ui/docs/components/) - Detailed prop documentation
- [Usage Examples](./packages/ui/docs/examples/) - Real-world implementation examples

### Development Guides

- [Contributing Guide](./CONTRIBUTING.md) - How to contribute to the project
- [Component Guidelines](./packages/ui/docs/component-guidelines.md) - Standards for building components
- [Release Process](./RELEASE.md) - How releases are managed

### Design Resources

- [Design Tokens](./packages/ui/src/themes/) - Color, spacing, and typography tokens
- [Component Registry](./packages/ui/registry.json) - Complete component catalog

## 🎯 Version 1.0.0 Features

This release represents our first public version and includes:

### Core Components (24 Primitives)

- **Interactive**: Button, Switch, Checkbox, Radio, Slider
- **Typography**: Headline, Paragraph, Text, Label
- **Layout**: Card, Avatar, Badge, Banner, Progress
- **Form**: Input, Textarea, Select, Accordion, Dialog
- **Navigation**: Breadcrumb, List, Tooltip, Tag, Chip

### Advanced Components (22 Structures)

- **Form Structures**: TextField, SelectField, CheckboxField, RadioField, etc.
- **Grouping**: ButtonPanel, ButtonGroup, ObjectGroup, CheckboxGroup
- **Data Display**: DataTable, FilterBar, EmptyState, Breadcrumb
- **Advanced Input**: UploadField, GrantPermissions

### AAE Capabilities (3 Hooks)

- `useGeolocation` - Location services
- `useCamera` - Photo capture
- `useBarcodeScanner` - QR/barcode scanning

### Developer Tools

- Complete TypeScript definitions
- Comprehensive CLI tooling
- Component registry system
- Automated testing suite
- Accessibility validation

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Setting up the development environment
- Component development standards
- Testing requirements
- Pull request process
- Code review guidelines

### Component Development Process

1. **Design Review** - Align with design system principles
2. **Implementation** - Build with TypeScript, accessibility, and tests
3. **Testing** - Unit tests, accessibility tests, visual regression
4. **Documentation** - Update registry, add examples, write docs
5. **Review** - Code review and design system team approval

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

Built with modern tools and libraries:

- [React](https://reactjs.org/) - UI library foundation
- [TypeScript](https://www.typescriptlang.org/) - Type safety and developer experience
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Class Variance Authority](https://cva.style/) - Component variant system
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager

## 📞 Support & Community

- **📖 Documentation**: [Design System Docs](./packages/ui/docs/)
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/acrobi/design-system/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/acrobi/design-system/discussions)
- **📧 Contact**: [design-system@acrobi.com](mailto:design-system@acrobi.com)

## 🗺️ Roadmap

- **v1.1** - Enhanced theming capabilities and design tokens
- **v1.2** - Advanced data visualization components
- **v1.3** - Mobile-specific components and patterns
- **v2.0** - Next.js integration and server components

---

**Made with ❤️ by the Acrobi Design System Team**

_Empowering developers to build beautiful, accessible, and consistent user experiences._
