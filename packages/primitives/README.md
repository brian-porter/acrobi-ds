# @acrobi/primitives

Core UI building blocks for Acrobi applications. This package provides 50+ primitive React components including buttons, inputs, cards, badges, and form controls.

## Installation

```bash
npm install @acrobi/primitives
# or
pnpm add @acrobi/primitives
# or
yarn add @acrobi/primitives
```

## Usage

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@acrobi/primitives';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter your name" />
        <Button variant="prime">Submit</Button>
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
