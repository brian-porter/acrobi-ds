# TextField

Complete form field component with label, validation, helper text, and accessibility features built-in.

## Overview

TextField is a structure component that combines a label, input field, validation messaging, and helper text into a single, accessible form control. It handles all the complexity of proper form field implementation including ARIA attributes, error states, and responsive design.

## Basic Usage

```tsx
import { TextField } from '@acrobi/ui';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  return (
    <TextField
      label="Email Address"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      error={error}
      helperText="We'll never share your email with anyone"
      required
    />
  );
}
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Field label text |
| `type` | `string` | `'text'` | Input type (text, email, password, etc.) |
| `value` | `string` | - | Current field value |
| `onChange` | `function` | - | Change handler function |
| `placeholder` | `string` | - | Placeholder text |
| `required` | `boolean` | `false` | Whether field is required |
| `disabled` | `boolean` | `false` | Whether field is disabled |

### Validation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `string` | - | Error message to display |
| `helperText` | `string` | - | Helper text below field |
| `validate` | `function` | - | Custom validation function |
| `validateOn` | `'change' \| 'blur' \| 'submit'` | `'blur'` | When to run validation |

### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `styling` | `'default' \| 'filled' \| 'outlined' \| 'underlined'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Field size |
| `fullWidth` | `boolean` | `false` | Whether to take full width |

## Examples

### Basic Text Field

```tsx
<TextField
  label="Full Name"
  placeholder="Enter your full name"
  required
/>
```

### Email Field with Validation

```tsx
function EmailField() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError(validateEmail(value));
  };

  return (
    <TextField
      label="Email Address"
      type="email"
      value={email}
      onChange={handleChange}
      error={error}
      helperText="We'll send confirmation to this email"
      required
    />
  );
}
```

### Password Field

```tsx
function PasswordField() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      label="Password"
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      helperText="Must be at least 8 characters"
      endAdornment={
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Hide' : 'Show'}
        </Button>
      }
      required
    />
  );
}
```

### Different Styles

```tsx
<div className="space-y-4">
  <TextField
    label="Default Style"
    styling="default"
    placeholder="Default styling"
  />
  
  <TextField
    label="Filled Style"
    styling="filled"
    placeholder="Filled background"
  />
  
  <TextField
    label="Outlined Style"
    styling="outlined"
    placeholder="Outlined border"
  />
  
  <TextField
    label="Underlined Style"
    styling="underlined"
    placeholder="Bottom border only"
  />
</div>
```

### Sizes

```tsx
<div className="space-y-4">
  <TextField
    label="Small"
    size="sm"
    placeholder="Small field"
  />
  
  <TextField
    label="Medium (Default)"
    size="md"
    placeholder="Medium field"
  />
  
  <TextField
    label="Large"
    size="lg"
    placeholder="Large field"
  />
</div>
```

## Validation

TextField supports multiple validation approaches:

### Built-in HTML5 Validation

```tsx
<TextField
  label="Email"
  type="email"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  title="Please enter a valid email address"
/>
```

### Custom Validation Function

```tsx
<TextField
  label="Username"
  validate={(value) => {
    if (value.length < 3) return 'Username must be at least 3 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
    return '';
  }}
  validateOn="change"
/>
```

### Async Validation

```tsx
function UsernameField() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const checkUsername = async (value) => {
    if (value.length < 3) return;
    
    setIsValidating(true);
    try {
      const response = await fetch(`/api/check-username?username=${value}`);
      const data = await response.json();
      
      if (!data.available) {
        setError('Username is already taken');
      } else {
        setError('');
      }
    } catch (err) {
      setError('Unable to check username availability');
    } finally {
      setIsValidating(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setError('');
    
    // Debounce the async validation
    const timeoutId = setTimeout(() => checkUsername(value), 500);
    return () => clearTimeout(timeoutId);
  };

  return (
    <TextField
      label="Username"
      value={username}
      onChange={handleChange}
      error={error}
      helperText={isValidating ? 'Checking availability...' : 'Choose a unique username'}
      endAdornment={isValidating && <Spinner size="sm" />}
    />
  );
}
```

## Accessibility

TextField is built with accessibility as a priority:

### ARIA Attributes

- `aria-labelledby` - Links label to input
- `aria-describedby` - Links helper text and errors
- `aria-invalid` - Indicates validation state
- `aria-required` - Indicates required fields

### Keyboard Navigation

- **Tab** - Move focus to/from field
- **Enter** - Submit form (when in form)
- **Escape** - Clear field (when clearable)

### Screen Reader Support

- Label is properly announced
- Helper text is read after label
- Error messages are announced when they appear
- Required state is communicated

## Styling

### CSS Custom Properties

```css
.text-field {
  --text-field-border-color: hsl(var(--border));
  --text-field-border-radius: var(--radius);
  --text-field-background: hsl(var(--background));
  --text-field-text-color: hsl(var(--foreground));
  --text-field-placeholder-color: hsl(var(--muted-foreground));
  --text-field-focus-color: hsl(var(--ring));
  --text-field-error-color: hsl(var(--destructive));
}
```

### Custom Styling

```tsx
<TextField
  label="Custom Styled"
  className="my-custom-field"
  inputClassName="text-lg font-medium"
  labelClassName="text-blue-600"
  helperClassName="text-xs"
/>
```

## Integration

### With React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';

function FormWithValidation() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format'
          }
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            type="email"
            error={errors.email?.message}
            required
          />
        )}
      />
    </form>
  );
}
```

### With Formik

```tsx
import { Formik, Field } from 'formik';

function FormikForm() {
  return (
    <Formik
      initialValues={{ email: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Email is required';
        }
        return errors;
      }}
    >
      {({ errors, touched }) => (
        <Field name="email">
          {({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              error={errors.email && touched.email ? errors.email : ''}
            />
          )}
        </Field>
      )}
    </Formik>
  );
}
```

## Best Practices

1. **Always provide labels** - Never use placeholder as the only label
2. **Use appropriate input types** - email, tel, url, etc. for better UX
3. **Provide helpful error messages** - Be specific about what's wrong
4. **Use helper text wisely** - Explain format requirements or provide context
5. **Validate on blur** - Don't interrupt typing with validation errors
6. **Group related fields** - Use fieldsets for logical groupings

## Related Components

- [Input](../Input) - Basic input primitive
- [Label](../Label) - Standalone label component
- [SelectField](./select-field) - Dropdown selection field
- [TextareaField](./textarea-field) - Multi-line text field