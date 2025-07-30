# Component Style Props Pattern

## Critical Rule: Avoid HTML `style` Prop Conflicts

**NEVER use `style` as a prop name for design system style variants in React components.**

## The Problem

React's HTML `style` prop expects a CSS object like `{ marginTop: '10px' }`, but design system components often need string-based style variants like `'prime'`, `'neutral'`, `'danger'`.

When a component prop named `style` receives a string value, React throws this error:

```
Error: The `style` prop expects a mapping from style properties to values, not a string.
```

## The Solution

**Always use `styling` for design system style variants:**

```tsx
// ✅ CORRECT - Use 'styling' for design system variants
<Button styling="prime" type="filled">Click me</Button>
<Card styling="elevated">Content</Card>
<Alert styling="filled" type="success">Message</Alert>

// ✅ CORRECT - Use 'style' for CSS objects
<Button style={{ marginTop: '10px' }}>Click me</Button>

// ❌ WRONG - Never use 'style' for string variants
<Button style="prime">Click me</Button>  // This causes React error!
```

## Component Implementation Pattern

When creating components with style variants:

1. **Use `styling` prop for design system variants:**

```tsx
interface ButtonProps {
  styling?: 'prime' | 'neutral' | 'danger' | 'warn';
  // ... other props
}

const Button = ({ styling = 'prime', style, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ style: styling }))}
      style={style} // CSS style object
      {...props}
    />
  );
};
```

2. **Extract `style` prop to prevent conflicts:**

```tsx
const Component = ({ styling, style, ...props }) => {
  // Extract style prop explicitly to prevent string values from being passed through ...props
  return <div style={style} {...props} />;
};
```

3. **Update TypeScript interfaces:**

```tsx
// Remove 'style' from omitted props to allow CSS style objects
interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  // Don't omit 'style'
  styling?: 'variant1' | 'variant2'; // Use 'styling' for variants
}
```

## Storybook Stories Pattern

In Storybook stories, always use the correct prop names:

```tsx
// ✅ CORRECT
export const Default: Story = {
  args: {
    styling: 'prime',  // Design system variant
    children: 'Button',
  },
};

// ✅ CORRECT - argTypes
argTypes: {
  styling: {  // Not 'style'
    control: { type: 'select' },
    options: ['prime', 'neutral', 'danger'],
  },
}
```

## Components Updated

The following components have been updated to use this pattern:

- `Button`: `styling` prop for variants ('prime', 'neutral', 'danger', 'warn', 'focus'), sizes: xs (24px), sm (32px), md (36px), lg (48px), dy (dynamic - auto height, grows with content)
- `Card`: `styling` prop for variants ('default', 'elevated', 'outlined', 'filled')
- `Input`: `styling` prop for variants ('default', 'filled', 'outlined', 'underlined')
- `Alert`: `styling` prop for variants ('default', 'filled', 'outlined', 'minimal')
- `Progress`: `styling` prop for variants ('prime', 'neutral', 'focus', 'danger', 'warn', 'success')
- `Chip`: `styling` prop for variants ('nl', 'outlined', 'filled')

## Quick Fix Commands

If you encounter this error, use these commands to fix it:

```bash
# Fix component stories
sed -i '' 's/style="/styling="/g' packages/ui/src/components/**/*.stories.tsx
sed -i '' 's/styling={{/style={{/g' packages/ui/src/components/**/*.stories.tsx

# Fix component implementations
sed -i '' 's/buttonStyle=/styling=/g' packages/ui/src/components/**/*.tsx
sed -i '' 's/cardStyle=/styling=/g' packages/ui/src/components/**/*.tsx
sed -i '' 's/inputStyle=/styling=/g' packages/ui/src/components/**/*.tsx
sed -i '' 's/chipStyle=/styling=/g' packages/ui/src/components/**/*.tsx
```

## Remember

- `styling` = Design system variants (strings like 'prime', 'danger')
- `style` = CSS style objects (like `{ marginTop: '10px' }`)
- Never mix these two concepts in the same prop!
