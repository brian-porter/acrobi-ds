# Primitive Components

Primitive components are the core building blocks of the Acrobi Design System. They provide essential functionality and serve as the foundation for more complex structure components.

## 🎯 Overview

The primitive layer contains **24 components** across 5 categories:

- **Interactive** (5) - User interaction elements
- **Typography** (4) - Text display and formatting
- **Layout** (5) - Visual organization and structure
- **Form** (6) - Input and data collection
- **Navigation** (4) - Wayfinding and hierarchical display

## 📦 Interactive Components

### [Button](./button.md)
A foundational interactive element that triggers actions when clicked.

```tsx
<Button variant="default" size="md">Click me</Button>
<Button variant="outline">Outline Button</Button>
```

**Use cases**: Form submission, navigation, actions
**Tags**: primitive, interactive, form

### [Switch](./switch.md) 
A toggle switch component for binary choices with labels and descriptions.

```tsx
<Switch />
<Switch label="Enable notifications" description="Get notified of important updates" />
```

**Use cases**: Settings, preferences, binary choices
**Tags**: primitive, form, switch, toggle

### [Checkbox](./checkbox.md)
A checkbox input component with labels, descriptions, and indeterminate state.

```tsx
<Checkbox label="Accept terms and conditions" />
<Checkbox indeterminate label="Select all" />
```

**Use cases**: Multi-selection, agreement confirmation
**Tags**: primitive, form, checkbox, input

### [Radio](./radio.md)
Radio button and radio group components for single-choice selections.

```tsx
<RadioGroup name="size" options={[
  {value: 'sm', label: 'Small'}, 
  {value: 'lg', label: 'Large'}
]} />
```

**Use cases**: Single selection from options
**Tags**: primitive, form, radio, input

### [Slider](./slider.md)
A slider input component for selecting values from a range with visual feedback.

```tsx
<Slider defaultValue={[50]} max={100} />
<Slider defaultValue={[20, 80]} showLabels />
```

**Use cases**: Value selection, range input, settings
**Tags**: primitive, form, slider, range

## 📝 Typography Components

### [Headline](./headline.md)
A semantic heading component with typography variants and styling options.

```tsx
<Headline level="h1">Welcome to Acrobi</Headline>
<Headline level="h2" color="accent" align="center">Featured Content</Headline>
```

**Use cases**: Page titles, section headers, content hierarchy
**Tags**: primitive, typography, heading

### [Paragraph](./paragraph.md)
A typography component for displaying paragraph text with various styling options.

```tsx
<Paragraph>This is a paragraph of text with default styling.</Paragraph>
<Paragraph size="lg" color="muted" align="center">Large, muted, centered text.</Paragraph>
```

**Use cases**: Body text, descriptions, content blocks
**Tags**: primitive, typography, text, paragraph

### [Text](./text.md)
A flexible text component with polymorphic rendering and comprehensive styling options.

```tsx
<Text size="md" variant="default">Default text</Text>
<Text as="span" weight="bold" color="accent">Emphasized text</Text>
```

**Use cases**: Inline text, labels, styled content
**Tags**: primitive, typography, text, polymorphic

### [Label](./label.md)
A versatile labeling component for status indicators, tags, and metadata.

```tsx
<Label>Featured</Label>
<Label variant="success" icon={<CheckIcon />}>Completed</Label>
```

**Use cases**: Status indicators, metadata, categorization
**Tags**: primitive, label, status, tag

## 🏗️ Layout Components

### [Card](./card.md)
A flexible container component for grouping and displaying content.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

**Use cases**: Content containers, information grouping
**Tags**: primitive, layout, container

### [Avatar](./avatar.md)
A user avatar component with automatic fallback support.

```tsx
<Avatar>
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

**Use cases**: User profiles, identity display
**Tags**: primitive, media, user

### [Badge](./badge.md)
A small status indicator or label component for displaying metadata.

```tsx
<Badge>New</Badge>
<Badge variant="success">Success</Badge>
```

**Use cases**: Status indicators, notifications, counts
**Tags**: primitive, status, label

### [Banner](./banner.md)
An informational banner component for displaying messages and alerts.

```tsx
<Banner variant="info" title="Information">This is an info message</Banner>
<Banner variant="warning" dismissible onDismiss={() => {}}>Warning message</Banner>
```

**Use cases**: Alerts, notifications, announcements
**Tags**: primitive, banner, alert, notification

### [Progress](./progress.md)
A progress bar component for showing task completion and loading states.

```tsx
<Progress value={60} />
<Progress value={80} showValue variant="success" />
```

**Use cases**: Loading states, completion tracking
**Tags**: primitive, progress, loading, indicator

## 📝 Form Components

### [Input](./input.md)
A form input component for collecting user data with validation states.

```tsx
<Input placeholder="Enter your name" />
<Input variant="error" placeholder="Error state" />
```

**Use cases**: Text input, form fields
**Tags**: primitive, form, input

### [Textarea](./textarea.md)
A textarea input component for multi-line text with validation and character counting.

```tsx
<Textarea placeholder="Enter your message..." />
<Textarea showCount maxLength={200} placeholder="Max 200 characters" />
```

**Use cases**: Multi-line text input, comments, descriptions
**Tags**: primitive, form, input, textarea

### [Select](./select.md)
A select dropdown component with search functionality and custom styling.

```tsx
<Select options={[
  {value: '1', label: 'Option 1'}, 
  {value: '2', label: 'Option 2'}
]} />
<Select searchable options={options} placeholder="Search options..." />
```

**Use cases**: Option selection, dropdowns
**Tags**: primitive, form, select, dropdown

### [Accordion](./accordion.md)
A collapsible content component for organizing information in expandable sections.

```tsx
<Accordion items={[{id: '1', title: 'Section 1', content: 'Content here'}]} />
<Accordion multiple items={items} />
```

**Use cases**: FAQ sections, collapsible content
**Tags**: primitive, interactive, collapsible, accordion

### [Dialog](./dialog.md)
A modal dialog component for displaying content that requires user interaction.

```tsx
<Dialog open={true} title="Confirm Action" onOpenChange={setOpen}>
  Are you sure?
</Dialog>
<Dialog open={true} footer={<Button>Save</Button>}>Content here</Dialog>
```

**Use cases**: Modals, confirmations, forms
**Tags**: primitive, interactive, modal, dialog

### [Tooltip](./tooltip.md)
A tooltip component for displaying contextual information on hover.

```tsx
<Tooltip content="Helpful information">
  <Button>Hover me</Button>
</Tooltip>
```

**Use cases**: Help text, additional information
**Tags**: primitive, tooltip, overlay, help

## 🧭 Navigation Components

### [Breadcrumb](./breadcrumb.md)
A navigation component that shows the user's location within a hierarchy.

```tsx
<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem active>Current</BreadcrumbItem>
</Breadcrumb>
```

**Use cases**: Navigation hierarchy, location indication
**Tags**: primitive, navigation, hierarchy

### [List](./list.md)
A flexible list component for displaying ordered and unordered content.

```tsx
<List>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
</List>
<List>
  <ListItem variant="interactive" onSelect={() => {}}>Clickable Item</ListItem>
</List>
```

**Use cases**: Content lists, navigation menus
**Tags**: primitive, list, content, navigation

### [Tag](./tag.md)
A tag component for labeling, categorizing, and filtering content.

```tsx
<Tag>Featured</Tag>
<Tag removable onRemove={() => {}}>React</Tag>
```

**Use cases**: Categories, filters, labels
**Tags**: primitive, tag, filter, category

### [Chip](./chip.md)
A compact element for displaying information, tags, or interactive selections.

```tsx
<Chip>Technology</Chip>
<Chip removable onRemove={() => {}}>Removable</Chip>
```

**Use cases**: Tags, filters, selections
**Tags**: primitive, interactive, chip, tag

## 🎨 Design Patterns

### Variant System
All primitives use consistent variant patterns:

```tsx
// Size variants
<Button size="sm" | "default" | "lg">

// Visual variants  
<Button variant="default" | "outline" | "ghost" | "destructive">

// State variants
<Input variant="default" | "error" | "success">
```

### Composition Patterns
Primitives are designed to compose together:

```tsx
<Card>
  <CardHeader>
    <Avatar>
      <AvatarImage src="/user.jpg" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <Headline level="h2">John Doe</Headline>
    <Badge variant="success">Online</Badge>
  </CardHeader>
  <CardContent>
    <Paragraph>User profile information...</Paragraph>
  </CardContent>
</Card>
```

## ♿ Accessibility Features

All primitive components include:

- **Semantic HTML** - Proper element usage
- **ARIA Attributes** - Screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Proper focus indicators
- **Color Contrast** - WCAG AA compliant colors

## 🔗 Related Resources

- [Structure Components](../structures/) - Advanced compositions
- [PWA Hooks](../hooks/) - Device integration capabilities
- [Component API Reference](../../api/) - Detailed prop documentation
- [Examples](../../examples/) - Real-world usage examples

---

*Documentation auto-generated from registry v1.0.0*