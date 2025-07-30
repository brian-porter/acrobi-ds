# Components Overview

Welcome to the Acrobi Design System component library! Our components are organized into four main categories:

## 🎨 Primitives (26 components)
**Foundation building blocks** - Simple, focused components that handle core functionality.

- **Interactive**: Button, Switch, Checkbox, Radio, Slider
- **Typography**: Headline, Paragraph, Text, Label  
- **Layout**: Card, Avatar, Badge, Banner, Progress
- **Form**: Input, Textarea, Select, Accordion, Dialog
- **Navigation**: Breadcrumb, List, Tooltip, Tag, Chip

[View all primitives →](./primitives/)

## 🏗️ Structures (28 components)
**Complete solutions** - Higher-level compositions built from primitives for complex use cases.

- **Form Structures**: Complete form fields with validation
- **Grouping Structures**: Content and action organization  
- **Data Display**: Information presentation and tables
- **Advanced Input**: File uploads and specialized inputs

[View all structures →](./structures/)

## ⚡ Hooks & Providers (4 components)
**Device integration** - Progressive web app capabilities for modern device features.

- **Location Services**: Geolocation and mapping
- **Camera Access**: Photo capture and video recording
- **Barcode Scanning**: QR code and barcode detection
- **Platform Detection**: Device and browser capabilities

[View all hooks →](./hooks/)

## 🔧 Modules (20 components)
**Workflow solutions** - Complete workflow modules for common application patterns.

- **Collection Management**: Add, edit, organize collections
- **User Actions**: Assign, delete, archive workflows
- **Content Creation**: Rich text editor and media capture
- **Navigation**: Menu systems and global actions

[View all modules →](./modules/)

## Quick Start

```tsx
import { Button, Card, TextField } from '@acrobi/ui';

function App() {
  return (
    <Card>
      <TextField 
        label="Email" 
        type="email" 
        placeholder="Enter your email" 
      />
      <Button>Get Started</Button>
    </Card>
  );
}
```

## Component Architecture

The design system follows a layered architecture:

1. **Primitives** → Basic UI elements
2. **Structures** → Composite components  
3. **Modules** → Complete workflows
4. **Hooks** → Device integration

Each layer builds upon the previous, ensuring consistency and reusability across your application.

## Next Steps

- [Browse all components](./api-reference)
- [View examples](../examples/)
- [Read the getting started guide](../getting-started)