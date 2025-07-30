# Card Component

A flexible container component for grouping related content with consistent styling and spacing.

## Overview

The Card component provides a clean, elevated container for organizing content. It supports various layouts and can be composed with other components to create rich interfaces. Cards are fundamental building blocks for dashboards, forms, and content displays.

## Features

- **Flexible Layout** - Supports header, content, and footer sections
- **Elevation System** - Consistent shadow and border styling
- **Responsive Design** - Adapts to different screen sizes
- **Accessibility** - Proper semantic structure and ARIA support
- **Theme Support** - Full dark/light mode compatibility

## Basic Usage

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@acrobi/ui';

// Simple card
<Card>
  <CardContent>
    <p>This is a basic card with content.</p>
  </CardContent>
</Card>

// Card with header
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>
```

## Card Structure

### Card Components

The Card system consists of several composable components:

- **Card** - Main container component
- **CardHeader** - Header section for titles and actions
- **CardTitle** - Semantic title component
- **CardDescription** - Subtitle or description text
- **CardContent** - Main content area
- **CardFooter** - Footer section for actions

### Complete Example

```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent, 
  CardFooter,
  Button 
} from '@acrobi/ui';

<Card>
  <CardHeader>
    <CardTitle>Project Settings</CardTitle>
    <CardDescription>
      Manage your project configuration and preferences
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Configure your project settings below.</p>
    {/* Form fields or other content */}
  </CardContent>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Save Changes</Button>
  </CardFooter>
</Card>
```

## Variants and Styling

### Basic Styling

```tsx
// Default card
<Card>
  <CardContent>Default card styling</CardContent>
</Card>

// Custom styling with className
<Card className="max-w-md mx-auto">
  <CardContent>Centered card with max width</CardContent>
</Card>

// Interactive card (clickable)
<Card className="cursor-pointer hover:shadow-lg transition-shadow">
  <CardContent>Clickable card</CardContent>
</Card>
```

### Layout Variations

```tsx
// Horizontal layout
<Card className="flex flex-row">
  <div className="flex-shrink-0">
    <img src="/image.jpg" alt="Preview" className="w-24 h-24 object-cover" />
  </div>
  <CardContent className="flex-1">
    <h3>Horizontal Card</h3>
    <p>Content alongside image</p>
  </CardContent>
</Card>

// Grid layout for multiple cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>
    <CardContent>Card 1</CardContent>
  </Card>
  <Card>
    <CardContent>Card 2</CardContent>
  </Card>
  <Card>
    <CardContent>Card 3</CardContent>
  </Card>
</div>
```

## Common Patterns

### Profile Card

```tsx
<Card>
  <CardHeader>
    <div className="flex items-center space-x-4">
      <Avatar src="/avatar.jpg" fallback="JD" />
      <div>
        <CardTitle>John Doe</CardTitle>
        <CardDescription>Software Engineer</CardDescription>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <p>Passionate about building great user experiences.</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">View Profile</Button>
    <Button>Connect</Button>
  </CardFooter>
</Card>
```

### Stats Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Total Users</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold">12,345</div>
    <div className="text-sm text-muted-foreground">
      +20% from last month
    </div>
  </CardContent>
</Card>
```

### Form Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Sign In</CardTitle>
    <CardDescription>
      Enter your credentials to access your account
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <TextField
      label="Email"
      type="email"
      placeholder="Enter your email"
    />
    <TextField
      label="Password"
      type="password"
      placeholder="Enter your password"
    />
  </CardContent>
  <CardFooter>
    <Button className="w-full">Sign In</Button>
  </CardFooter>
</Card>
```

### Action Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Upgrade Plan</CardTitle>
    <CardDescription>
      Get access to premium features
    </CardDescription>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2">
      <li>✓ Unlimited projects</li>
      <li>✓ Advanced analytics</li>
      <li>✓ Priority support</li>
    </ul>
  </CardContent>
  <CardFooter>
    <Button>Upgrade Now</Button>
  </CardFooter>
</Card>
```

## API Reference

### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Card content |

### CardHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Header content |

### CardTitle Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Title content |
| `as` | `ElementType` | `'h3'` | HTML element to render |

### CardDescription Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Description content |

### CardContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Content |

### CardFooter Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Footer content |

## Accessibility

### Semantic Structure
Cards use proper semantic HTML structure:

```tsx
// Semantic card with proper heading hierarchy
<Card>
  <CardHeader>
    <CardTitle as="h2">Section Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content with proper paragraph structure</p>
  </CardContent>
</Card>
```

### Interactive Cards
For clickable cards, ensure proper accessibility:

```tsx
<Card 
  as="button"
  className="text-left cursor-pointer focus:ring-2 focus:ring-primary"
  onClick={handleClick}
  aria-label="Open project details"
>
  <CardContent>
    <h3>Project Name</h3>
    <p>Project description</p>
  </CardContent>
</Card>
```

### Keyboard Navigation
Cards support keyboard navigation when interactive:

```tsx
<Card 
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  <CardContent>Interactive card content</CardContent>
</Card>
```

## Best Practices

### Content Organization
- Use CardHeader for titles and metadata
- Place main content in CardContent
- Use CardFooter for actions and secondary information
- Keep card content focused and related

### Visual Hierarchy
- Use CardTitle for primary headings
- Use CardDescription for secondary information
- Maintain consistent spacing between elements
- Group related actions in the footer

### Responsive Design
```tsx
// Responsive card grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <Card key={item.id}>
      <CardContent>{item.content}</CardContent>
    </Card>
  ))}
</div>

// Responsive card layout
<Card className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
  <CardContent>Responsive card</CardContent>
</Card>
```

### Performance
- Use React.memo for cards in large lists
- Implement virtualization for many cards
- Lazy load card content when appropriate

## Examples

### Dashboard Cards
```tsx
const dashboardCards = [
  { title: 'Revenue', value: '$12,345', change: '+12%' },
  { title: 'Users', value: '1,234', change: '+5%' },
  { title: 'Orders', value: '567', change: '-2%' }
];

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {dashboardCards.map(card => (
    <Card key={card.title}>
      <CardHeader>
        <CardTitle>{card.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{card.value}</div>
        <div className="text-sm text-muted-foreground">{card.change}</div>
      </CardContent>
    </Card>
  ))}
</div>
```

### Product Cards
```tsx
<Card className="max-w-sm">
  <div className="aspect-square overflow-hidden">
    <img 
      src="/product.jpg" 
      alt="Product" 
      className="w-full h-full object-cover"
    />
  </div>
  <CardHeader>
    <CardTitle>Product Name</CardTitle>
    <CardDescription>$99.99</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Product description and features.</p>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Add to Cart</Button>
  </CardFooter>
</Card>
```

## Related Components

- **[Button](./Button.md)** - For card actions
- **[Avatar](./Avatar.md)** - For profile cards
- **[Badge](./Badge.md)** - For status indicators
- **[TextField](./structures/text-field.md)** - For form cards

## Version History

- **V1.0.0**: Initial implementation with composable structure
- Added semantic HTML support
- Included responsive design patterns
- Built with accessibility best practices