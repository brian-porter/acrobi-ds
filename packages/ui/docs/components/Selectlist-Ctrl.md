# Selectlist Control

The Selectlist Control component provides a dropdown selection interface with Acrobi Design System styling.

## Usage

```tsx
import { SelectlistCtrl } from '@acrobi/ui';

function MyComponent() {
  return (
    <SelectlistCtrl
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ]}
      placeholder="Select an option..."
      onChange={(value) => console.log('Selected:', value)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `Array<{value: string, label: string}>` | `[]` | Available options |
| `placeholder` | `string` | `"Select..."` | Placeholder text |
| `onChange` | `(value: string) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disable the control |

## Examples

### Basic Usage

```tsx
<SelectlistCtrl
  options={[
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' }
  ]}
/>
```

### With Default Value

```tsx
<SelectlistCtrl
  options={options}
  defaultValue="green"
/>
```