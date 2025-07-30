# API Reference

Complete API documentation for all Acrobi Design System components, hooks, and utilities.

## Overview

This reference provides comprehensive documentation for all components, their props, methods, and usage patterns. Each component includes TypeScript definitions, accessibility information, and examples.

## Component Categories

### Primitives
Core building blocks with focused functionality:

- [Button](#button) - Interactive buttons with variants
- [Input](#input) - Text input fields
- [Card](#card) - Content containers
- [Avatar](#avatar) - Profile images
- [Badge](#badge) - Status indicators
- [Alert](#alert) - Notification messages
- [Dialog](#dialog) - Modal overlays
- [Icon](#icon) - Iconography system
- [Progress](#progress) - Loading indicators
- [Switch](#switch) - Toggle controls
- [Checkbox](#checkbox) - Multi-select controls
- [Radio](#radio) - Single-select controls
- [Select](#select) - Dropdown menus
- [Slider](#slider) - Range inputs
- [Textarea](#textarea) - Multi-line text
- [Tooltip](#tooltip) - Contextual information
- [Breadcrumb](#breadcrumb) - Navigation trails
- [Accordion](#accordion) - Collapsible content
- [Chip](#chip) - Interactive tags

### Structures
Composite components for complete solutions:

- [TextField](#textfield) - Complete form fields
- [SelectField](#selectfield) - Dropdown fields with validation
- [CheckboxField](#checkboxfield) - Checkbox with label
- [RadioField](#radiofield) - Radio with label
- [TextareaField](#textareafield) - Multi-line input field
- [SliderField](#sliderfield) - Range input field
- [SwitchField](#switchfield) - Toggle field
- [UploadField](#uploadfield) - File upload field
- [ButtonPanel](#buttonpanel) - Action button groups
- [ButtonGroup](#buttongroup) - Segmented controls
- [DataTable](#datatable) - Feature-rich tables
- [FilterBar](#filterbar) - Advanced filtering
- [SecHead](#sechead) - Section headers
- [HeroStack](#herostack) - Hero sections
- [EmptyState](#emptystate) - Empty state displays

### Hooks
React hooks for advanced functionality:

- [useGeolocation](#usegeolocation) - Device location
- [useCamera](#usecamera) - Camera access
- [useBarcodeScanner](#usebarcodescanner) - Code scanning
- [useSheet](#usesheet) - Bottom sheet management
- [useDialog](#usedialog) - Dialog state management

---

## Button

Interactive button component with multiple variants and states.

### Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Visual style variant |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | Button size |
| `asChild` | `boolean` | `false` | Render as child element |
| `loading` | `boolean` | `false` | Show loading state |
| `icon` | `string` | - | Icon name from BQ-Icons |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `disabled` | `boolean` | `false` | Disabled state |
| `onClick` | `(event: MouseEvent) => void` | - | Click handler |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Button content |

### Examples

```tsx
// Basic button
<Button>Click me</Button>

// Variant buttons
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Ghost</Button>

// Size variants
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// With icon
<Button icon="plus" iconPosition="left">Add Item</Button>

// Loading state
<Button loading>Saving...</Button>

// As link
<Button asChild>
  <a href="/dashboard">Dashboard</a>
</Button>
```

### Accessibility

- Uses semantic `<button>` element
- Supports keyboard navigation (Enter, Space)
- Includes proper ARIA attributes
- Loading state announced to screen readers
- Focus management with visible indicators

---

## Input

Text input component with validation states and accessibility features.

### Props

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: 'default' | 'sm' | 'lg';
  error?: boolean;
  success?: boolean;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | HTML input type |
| `size` | `'default' \| 'sm' \| 'lg'` | `'default'` | Input size |
| `error` | `boolean` | `false` | Error state styling |
| `success` | `boolean` | `false` | Success state styling |
| `disabled` | `boolean` | `false` | Disabled state |
| `readOnly` | `boolean` | `false` | Read-only state |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | - | Default value |
| `onChange` | `(event: ChangeEvent) => void` | - | Change handler |
| `onFocus` | `(event: FocusEvent) => void` | - | Focus handler |
| `onBlur` | `(event: FocusEvent) => void` | - | Blur handler |
| `className` | `string` | - | Additional CSS classes |

### Examples

```tsx
// Basic input
<Input placeholder="Enter text" />

// Input types
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input type="number" min="0" max="100" />

// Size variants
<Input size="sm" placeholder="Small input" />
<Input size="lg" placeholder="Large input" />

// Validation states
<Input error placeholder="Error state" />
<Input success placeholder="Success state" />

// Controlled input
const [value, setValue] = useState('');
<Input 
  value={value} 
  onChange={(e) => setValue(e.target.value)} 
/>
```

### Accessibility

- Semantic `<input>` element with proper type
- Supports all standard input attributes
- ARIA attributes for validation states
- Keyboard navigation support
- Screen reader compatible

---

## Card

Flexible container component for grouping related content.

### Props

```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
```

### Card Components

| Component | Description |
|-----------|-------------|
| `Card` | Main container |
| `CardHeader` | Header section |
| `CardTitle` | Title component |
| `CardDescription` | Description text |
| `CardContent` | Main content area |
| `CardFooter` | Footer section |

### Examples

```tsx
// Basic card
<Card>
  <CardContent>
    <p>Card content</p>
  </CardContent>
</Card>

// Complete card structure
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Custom title level
<CardTitle as="h2">Section Title</CardTitle>
```

### Accessibility

- Semantic HTML structure
- Proper heading hierarchy with `as` prop
- Keyboard navigation support
- Screen reader friendly

---

## TextField

Complete form field with label, validation, and helper text.

### Props

```typescript
interface TextFieldProps {
  label: string;
  description?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'default' | 'sm' | 'lg';
  inputProps?: InputProps;
  className?: string;
  inputClassName?: string;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Field label (required) |
| `description` | `string` | - | Field description |
| `error` | `string` | - | Error message |
| `helperText` | `string` | - | Helper text |
| `required` | `boolean` | `false` | Required field indicator |
| `disabled` | `boolean` | `false` | Disabled state |
| `size` | `'default' \| 'sm' \| 'lg'` | `'default'` | Field size |
| `inputProps` | `InputProps` | - | Props passed to input |
| `className` | `string` | - | Container CSS classes |
| `inputClassName` | `string` | - | Input CSS classes |

### Examples

```tsx
// Basic text field
<TextField 
  label="Email" 
  placeholder="Enter your email" 
/>

// With validation
<TextField
  label="Password"
  type="password"
  error="Password is required"
  required
/>

// With helper text
<TextField
  label="Username"
  helperText="Must be 3-20 characters"
  description="This will be your public display name"
/>

// Different sizes
<TextField label="Small" size="sm" />
<TextField label="Large" size="lg" />
```

### Accessibility

- Automatic label association with `htmlFor`
- Error messages linked with `aria-describedby`
- Required indicator with `aria-required`
- Proper focus management
- Screen reader announcements

---

## DataTable

Feature-rich data table with sorting, filtering, and selection.

### Props

```typescript
interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (rows: T[]) => void;
  sorting?: boolean;
  defaultSort?: { key: string; direction: 'asc' | 'desc' };
  onSortChange?: (sort: { key: string; direction: 'asc' | 'desc' }) => void;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  actions?: DataTableAction<T>[];
  bulkActions?: DataTableAction<T[]>[];
  loading?: boolean;
  emptyState?: ReactNode;
  className?: string;
}

interface DataTableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  cell?: (props: { value: any; row: T; index: number }) => ReactNode;
}

interface DataTableAction<T> {
  label: string;
  onClick: (item: T) => void;
  icon?: string;
  variant?: 'default' | 'destructive';
  disabled?: (item: T) => boolean;
}
```

### Examples

```tsx
// Basic data table
const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', filterable: true },
  { key: 'status', header: 'Status' }
];

<DataTable data={users} columns={columns} />

// With selection and actions
<DataTable
  data={users}
  columns={columns}
  selectable
  selectedRows={selectedUsers}
  onSelectionChange={setSelectedUsers}
  actions={[
    { label: 'Edit', onClick: editUser, icon: 'edit' },
    { label: 'Delete', onClick: deleteUser, variant: 'destructive' }
  ]}
  bulkActions={[
    { label: 'Delete Selected', onClick: deleteUsers, variant: 'destructive' }
  ]}
/>

// With pagination
<DataTable
  data={users}
  columns={columns}
  pagination={{
    page: currentPage,
    pageSize: 10,
    total: totalUsers,
    onPageChange: setCurrentPage
  }}
/>

// Custom cell rendering
const columns = [
  {
    key: 'user',
    header: 'User',
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Avatar src={row.avatar} fallback={row.name[0]} />
        <span>{row.name}</span>
      </div>
    )
  }
];
```

### Accessibility

- Semantic table structure with proper headers
- Keyboard navigation for all interactive elements
- ARIA labels for sorting and selection
- Screen reader announcements for state changes
- Focus management for actions

---

## useGeolocation

React hook for accessing device location services.

### Signature

```typescript
function useGeolocation(options?: GeolocationOptions): {
  coordinates: GeolocationCoordinates | null;
  error: GeolocationPositionError | null;
  isLoading: boolean;
  getCurrentPosition: () => Promise<GeolocationPosition>;
  watchPosition: () => number;
  clearWatch: (watchId: number) => void;
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  immediate?: boolean;
}
```

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `coordinates` | `GeolocationCoordinates \| null` | Current position coordinates |
| `error` | `GeolocationPositionError \| null` | Geolocation error if any |
| `isLoading` | `boolean` | Loading state |
| `getCurrentPosition` | `() => Promise<GeolocationPosition>` | Get current position once |
| `watchPosition` | `() => number` | Start watching position changes |
| `clearWatch` | `(watchId: number) => void` | Stop watching position |

### Examples

```tsx
// Basic usage
function LocationComponent() {
  const { coordinates, error, isLoading, getCurrentPosition } = useGeolocation();

  if (isLoading) return <div>Getting location...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {coordinates ? (
        <p>
          Location: {coordinates.latitude}, {coordinates.longitude}
        </p>
      ) : (
        <button onClick={getCurrentPosition}>Get Location</button>
      )}
    </div>
  );
}

// With options
const { coordinates } = useGeolocation({
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 60000,
  immediate: true // Get location immediately
});

// Watching position changes
function TrackingComponent() {
  const { coordinates, watchPosition, clearWatch } = useGeolocation();
  const [watchId, setWatchId] = useState(null);

  const startTracking = () => {
    const id = watchPosition();
    setWatchId(id);
  };

  const stopTracking = () => {
    if (watchId) {
      clearWatch(watchId);
      setWatchId(null);
    }
  };

  return (
    <div>
      <button onClick={startTracking}>Start Tracking</button>
      <button onClick={stopTracking}>Stop Tracking</button>
      {coordinates && (
        <p>Current: {coordinates.latitude}, {coordinates.longitude}</p>
      )}
    </div>
  );
}
```

### Error Handling

```typescript
// Error codes
enum GeolocationError {
  PERMISSION_DENIED = 1,
  POSITION_UNAVAILABLE = 2,
  TIMEOUT = 3
}

// Handle different error types
const { error } = useGeolocation();

if (error) {
  switch (error.code) {
    case GeolocationError.PERMISSION_DENIED:
      // Handle permission denied
      break;
    case GeolocationError.POSITION_UNAVAILABLE:
      // Handle position unavailable
      break;
    case GeolocationError.TIMEOUT:
      // Handle timeout
      break;
  }
}
```

---

## useCamera

React hook for accessing device camera and capturing photos.

### Signature

```typescript
function useCamera(options?: CameraOptions): {
  stream: MediaStream | null;
  error: Error | null;
  isLoading: boolean;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  capturePhoto: () => Promise<Blob | null>;
  switchCamera: () => Promise<void>;
}

interface CameraOptions {
  facingMode?: 'user' | 'environment';
  width?: number;
  height?: number;
  audio?: boolean;
}
```

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `stream` | `MediaStream \| null` | Camera stream |
| `error` | `Error \| null` | Camera error if any |
| `isLoading` | `boolean` | Loading state |
| `startCamera` | `() => Promise<void>` | Start camera stream |
| `stopCamera` | `() => void` | Stop camera stream |
| `capturePhoto` | `() => Promise<Blob \| null>` | Capture photo as blob |
| `switchCamera` | `() => Promise<void>` | Switch between front/back camera |

### Examples

```tsx
// Basic camera usage
function CameraComponent() {
  const { stream, startCamera, stopCamera, capturePhoto } = useCamera();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleCapture = async () => {
    const photo = await capturePhoto();
    if (photo) {
      // Handle the photo blob
      const url = URL.createObjectURL(photo);
      console.log('Photo URL:', url);
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted />
      <div>
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={stopCamera}>Stop Camera</button>
        <button onClick={handleCapture} disabled={!stream}>
          Take Photo
        </button>
      </div>
    </div>
  );
}

// With options
const { stream, switchCamera } = useCamera({
  facingMode: 'environment', // Back camera
  width: 1280,
  height: 720,
  audio: false
});

// Switch between cameras
<button onClick={switchCamera}>Switch Camera</button>
```

---

## Type Definitions

### Common Types

```typescript
// Size variants used across components
type Size = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

// Color variants
type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

// Icon position
type IconPosition = 'left' | 'right' | 'top' | 'bottom';

// Theme tokens
interface Theme {
  name: string;
  tokens: {
    colors: Record<string, { light: string; dark: string }>;
    spacing: Record<string, string>;
    borderRadius: Record<string, string>;
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
    shadows: Record<string, string>;
  };
}
```

### Event Handlers

```typescript
// Common event handler types
type ClickHandler = (event: MouseEvent<HTMLElement>) => void;
type ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;
type FocusHandler = (event: FocusEvent<HTMLElement>) => void;
type KeyboardHandler = (event: KeyboardEvent<HTMLElement>) => void;

// Form event handlers
type FormSubmitHandler = (event: FormEvent<HTMLFormElement>) => void;
type InputChangeHandler = (value: string) => void;
type SelectChangeHandler = (value: string | string[]) => void;
type CheckboxChangeHandler = (checked: boolean) => void;
```

### Component Refs

```typescript
// Ref types for components
type ButtonRef = HTMLButtonElement;
type InputRef = HTMLInputElement;
type TextareaRef = HTMLTextAreaElement;
type SelectRef = HTMLSelectElement;
type DialogRef = HTMLDivElement;
```

## Styling System

### CSS Custom Properties

All components use CSS custom properties for theming:

```css
:root {
  /* Colors */
  --color-primary: 220 100% 50%;
  --color-secondary: 210 40% 98%;
  --color-destructive: 0 84% 60%;
  --color-success: 142 76% 36%;
  --color-warning: 38 92% 50%;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Border radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  
  /* Typography */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
}
```

### Class Variance Authority (CVA)

Components use CVA for variant management:

```typescript
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

## Migration Guide

### From v0.x to v1.x

Breaking changes and migration steps:

```typescript
// v0.x
<Button color="primary" size="large">Click me</Button>

// v1.x
<Button variant="default" size="lg">Click me</Button>

// v0.x
<Input error="Email is required" />

// v1.x
<TextField label="Email" error="Email is required" />
```

### Component Renames

| v0.x | v1.x |
|------|------|
| `TextInput` | `Input` |
| `FormField` | `TextField` |
| `DropdownMenu` | `Select` |
| `Modal` | `Dialog` |
| `Notification` | `Alert` |

## Contributing

### Adding New Components

1. Create component file in appropriate category
2. Add TypeScript definitions
3. Include Storybook stories
4. Add documentation
5. Update API reference

### Component Guidelines

- Use semantic HTML elements
- Include proper ARIA attributes
- Support keyboard navigation
- Follow naming conventions
- Include comprehensive tests

For detailed contribution guidelines, see [CONTRIBUTING.md](../CONTRIBUTING.md).