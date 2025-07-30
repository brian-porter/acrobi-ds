# Primitives Overview

Primitive components are the foundation building blocks of the Acrobi Design System. These simple, focused components handle core functionality and can be composed together to create more complex interfaces.

## Interactive Components

### [Button](../Button)
Primary action component with multiple variants and sizes.

```tsx
<Button variant="default" size="md">Click me</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Subtle</Button>
```

### [Switch](../Switch-Ctrl)
Toggle control for binary choices.

```tsx
<Switch checked={enabled} onCheckedChange={setEnabled} />
```

### [Checkbox](../Cbox-Ctrl)
Multi-selection input control.

```tsx
<Checkbox checked={selected} onCheckedChange={setSelected} />
```

## Typography Components

### [Headline](../Headline)
Primary heading component with semantic levels.

```tsx
<Headline level={1}>Main Title</Headline>
<Headline level={2}>Section Title</Headline>
```

### [Paragraph](../Paragraph)
Body text component with size variants.

```tsx
<Paragraph size="lg">Large body text</Paragraph>
<Paragraph>Default body text</Paragraph>
```

### [Label](../Label)
Form label component with required indicators.

```tsx
<Label htmlFor="email" required>Email Address</Label>
```

## Layout Components

### [Card](../Card)
Container component for grouping related content.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

### [Avatar](../Avatar)
User profile image with fallback support.

```tsx
<Avatar src="/avatar.jpg" fallback="JD" />
```

### [Badge](../Badge)
Status indicator with color variants.

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
```

## Form Components

### [Input](../Input)
Basic text input with validation states.

```tsx
<Input placeholder="Enter text" />
<Input error="This field is required" />
```

### [Dialog](../Dialog)
Modal overlay for important interactions.

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogTitle>Confirm Action</DialogTitle>
    <DialogDescription>
      Are you sure you want to continue?
    </DialogDescription>
  </DialogContent>
</Dialog>
```

## Navigation Components

### [Tooltip](../Tooltip)
Contextual information overlay.

```tsx
<Tooltip content="Additional information">
  <Button>Hover me</Button>
</Tooltip>
```

### [Chip](../Chip)
Compact element for tags and filters.

```tsx
<Chip>Tag</Chip>
<Chip variant="outlined">Filter</Chip>
```

## Design Principles

Primitive components follow these key principles:

1. **Single Responsibility** - Each component has one clear purpose
2. **Composability** - Can be combined to create complex interfaces
3. **Accessibility** - Built-in WCAG 2.1 AA compliance
4. **Consistency** - Shared design tokens and patterns
5. **Flexibility** - Customizable through props and CSS

## Usage Guidelines

- Use primitives as building blocks for custom components
- Combine multiple primitives to create application-specific interfaces
- Prefer structures over primitives for common patterns
- Maintain consistent spacing and typography scales

## Next Steps

- [View all primitive components](../api-reference)
- [Learn about structures](../structures/)
- [See examples](../../examples/)