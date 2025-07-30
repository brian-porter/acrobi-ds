---
layout: home

hero:
  name: "Acrobi Design System"
  text: "V1.0.0"
  tagline: "Complete primitives, structures, workflow modules, menu system, and client components"
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: View Components
      link: /components/

features:
  - title: 🎨 Primitives
    details: 26 core building blocks including buttons, inputs, dialogs, and more
  - title: 🏗️ Structures  
    details: 28 composite components for forms, layouts, and data presentation
  - title: ⚡ Workflow Modules
    details: 20 complete workflow solutions for common tasks like collections, menus, and editing
  - title: 🔧 Hooks & Providers
    details: 4 React hooks and providers for camera, geolocation, sheets, and more
  - title: 📱 PWA Ready
    details: Built-in support for progressive web app features and mobile-first design
  - title: 🎯 TypeScript First
    details: Fully typed components with excellent IDE support and autocomplete
---

## What's New in V1?

### 🚀 Major Features

- **Complete Menu System** - Global actions, posts, admin, view styles, sorting, search, and privacy menus
- **Rich Text Editor** - TipTap-based editor with multiple modes and emoji support  
- **Workflow Modules** - AddCollection, AssignTo, Copy, Delete, Archive, and Capture workflows
- **Global Sheet Manager** - Bottom sheet system using Vaul library
- **Enhanced Color System** - Color palette components for text formatting

### 📊 Component Statistics

- **Total Components**: 66
- **Primitives**: 26 core building blocks
- **Structures**: 28 composite components  
- **Modules**: 20 workflow solutions
- **Hooks**: 4 React hooks
- **Providers**: 1 global provider
- **Client Components**: 8 (domain-specific)

### 🎯 Quick Start

```bash
# Install the CLI
npm install -g @acrobi/cli

# Add components to your project
acrobi add button
acrobi add add-collection
acrobi add menu-actions

# Install the UI package
npm install @acrobi/ui
```

### 🏗️ Architecture

The Acrobi Design System follows a layered architecture:

1. **Primitives** - Basic UI elements (Button, Input, Dialog)
2. **Structures** - Composite components (Forms, Lists, Navigation) 
3. **Modules** - Complete workflows (AddCollection, MenuSystem)
4. **Providers** - Global state management (SheetProvider)
5. **Client** - Domain-specific components (separate from core)

### 🎨 Design Tokens

Built on a comprehensive design token system with:

- **Colors** - Semantic color palette with dark/light mode support
- **Typography** - Responsive text scales and font families
- **Spacing** - Consistent spacing scale across all components
- **Breakpoints** - Mobile-first responsive design system
- **Shadows** - Elevation system for depth and hierarchy

---

Ready to build something amazing? [Get started →](/getting-started)