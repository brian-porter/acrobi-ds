# Getting Started with Acrobi Design System

Welcome to the Acrobi Design System! This guide will help you get up and running quickly with our comprehensive React component library.

## 🚀 Quick Start

### Installation

Choose your preferred method to add the Acrobi Design System to your project:

#### Option 1: Install the Full Library

```bash
npm install @acrobi/ui
# or
yarn add @acrobi/ui
# or  
pnpm add @acrobi/ui
```

#### Option 2: Use the CLI (Recommended)

The CLI allows you to install only the components you need:

```bash
# Install CLI globally
npm install -g @acrobi/cli

# Initialize design system in your project
npx @acrobi/cli init

# Add specific components
npx @acrobi/cli add button card text-field
```

### Basic Setup

#### 1. Add Tailwind CSS

The design system is built with Tailwind CSS. Add our preset to your `tailwind.config.js`:

```js
module.exports = {
  presets: [require('@acrobi/ui/tailwind')],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@acrobi/ui/**/*.{js,ts,jsx,tsx}',
  ],
};
```

#### 2. Import CSS

Add the design system styles to your main CSS file or `_app.tsx`:

```css
@import '@acrobi/ui/styles';
```

#### 3. Start Using Components

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

## 🏗️ Project Structure

After installation, your project structure should look like this:

```
your-project/
├── src/
│   ├── components/
│   │   └── ui/                 # CLI-installed components (if using CLI)
│   └── lib/
│       └── utils.ts           # Utility functions
├── tailwind.config.js         # With Acrobi preset
└── package.json              # With @acrobi/ui dependency
```

## 📚 Architecture Overview

The Acrobi Design System follows a three-tier architecture:

### 1. Primitive Components (24 components)
**Foundation building blocks** - Simple, focused components that handle core functionality.

```tsx
import { Button, Input, Card, Avatar } from '@acrobi/ui';

// Basic primitives
<Button variant="default" size="md">Click me</Button>
<Input placeholder="Enter text" />
<Card>Content here</Card>
<Avatar src="/avatar.jpg" fallback="JD" />
```

**Categories:**
- **Interactive**: Button, Switch, Checkbox, Radio, Slider
- **Typography**: Headline, Paragraph, Text, Label
- **Layout**: Card, Avatar, Badge, Banner, Progress
- **Form**: Input, Textarea, Select, Accordion, Dialog
- **Navigation**: Breadcrumb, List, Tooltip, Tag, Chip

### 2. Structure Components (22 components)
**Complete solutions** - Higher-level compositions built from primitives for complex use cases.

```tsx
import { TextField, DataTable, ButtonGroup, UploadField } from '@acrobi/ui';

// Complete form field with label, validation, helper text
<TextField 
  label="Email" 
  error="Email is required" 
  helperText="We'll never share your email"
  required 
/>

// Full-featured data table
<DataTable
  data={users}
  columns={columns}
  selectable
  sorting
  pagination={{page: 1, pageSize: 10, total: 100}}
/>

// Segmented control
<ButtonGroup 
  options={[
    {value: 'grid', label: 'Grid'},
    {value: 'list', label: 'List'}
  ]} 
/>
```

**Categories:**
- **Form Structures**: Complete form fields with validation
- **Grouping Structures**: Content and action organization
- **Data Display**: Information presentation and tables
- **Advanced Input**: File uploads and specialized inputs

### 3. PWA Hooks (3 hooks)
**Device integration** - Progressive web app capabilities for modern device features.

```tsx
import { useGeolocation, useCamera, useBarcodeScanner } from '@acrobi/ui';

// Location services
const { coordinates, getCurrentPosition } = useGeolocation();

// Camera access
const { stream, startCamera, capturePhoto } = useCamera();

// Barcode scanning
const { isScanning, lastResult, startScanning } = useBarcodeScanner();
```

> 📖 **Learn More**: See our comprehensive [PWA documentation](../../../docs/pwa/) for detailed implementation guides on geolocation, QR/barcode scanning, and more device capabilities.

## 🎨 Theming System

The design system includes a flexible theming system with CSS custom properties:

### Using Built-in Themes

```tsx
import { themes, themeToCSSProperties } from '@acrobi/ui';

// Apply the default Acrobi theme
const acrobiTheme = themes.acrobi;
const cssProperties = themeToCSSProperties(acrobiTheme);

// Apply to your app root
<div style={cssProperties}>
  <App />
</div>
```

### Creating Custom Themes

```tsx
import { Theme } from '@acrobi/ui';

const customTheme: Theme = {
  name: 'custom',
  tokens: {
    colors: {
      primary: { 
        light: '220 100% 50%', 
        dark: '220 100% 60%' 
      },
      secondary: { 
        light: '160 100% 45%', 
        dark: '160 100% 55%' 
      },
      // ... other colors
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    // ... other tokens
  },
};
```

### CSS Custom Properties

Theme tokens are automatically converted to CSS custom properties:

```css
/* Generated CSS custom properties */
:root {
  --color-primary: 220 100% 50%;
  --color-primary-dark: 220 100% 60%;
  --spacing-md: 1rem;
  --radius-md: 0.375rem;
  /* ... */
}
```

## 📖 Examples by Use Case

### 1. Building a Form

```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  TextField,
  SelectField,
  CheckboxField,
  ButtonPanel
} from '@acrobi/ui';

function ContactForm() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TextField
          label="Full Name"
          placeholder="Enter your name"
          required
        />
        
        <TextField
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
        
        <SelectField
          label="Subject"
          options={[
            { value: 'support', label: 'Support' },
            { value: 'sales', label: 'Sales' },
            { value: 'general', label: 'General Inquiry' }
          ]}
          required
        />
        
        <TextField
          label="Message"
          placeholder="How can we help?"
          required
        />
        
        <CheckboxField
          label="Subscribe to newsletter"
          helperText="Get updates about new features and releases"
        />
        
        <ButtonPanel
          buttons={[
            { label: 'Send Message', type: 'submit' },
            { label: 'Clear', variant: 'outline', type: 'reset' }
          ]}
        />
      </CardContent>
    </Card>
  );
}
```

### 2. Creating a Data Dashboard

```tsx
import { 
  Card,
  CardHeader, 
  CardTitle,
  HeadlineStructure,
  DataTable,
  FilterBar,
  EmptyState,
  Badge
} from '@acrobi/ui';

function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});
  
  const columns = [
    { 
      key: 'name', 
      header: 'Name', 
      sortable: true,
      cell: ({ value, row }) => (
        <div className="flex items-center gap-2">
          <Avatar src={row.avatar} fallback={row.name[0]} />
          <span>{value}</span>
        </div>
      )
    },
    { key: 'email', header: 'Email', filterable: true },
    { 
      key: 'status', 
      header: 'Status',
      cell: ({ value }) => (
        <Badge variant={value === 'active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    { key: 'lastActive', header: 'Last Active', sortable: true }
  ];

  return (
    <div className="space-y-6">
      <HeadlineStructure
        title="User Management"
        subtitle="Manage your team members and permissions"
        actions={[
          { label: 'Add User', onClick: () => setShowAddUser(true) }
        ]}
      />
      
      <Card>
        <CardHeader>
          <FilterBar
            showSearch
            fields={[
              {
                key: 'status',
                label: 'Status',
                type: 'select',
                options: [
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' }
                ]
              },
              {
                key: 'role',
                label: 'Role',
                type: 'select',
                options: roles
              }
            ]}
            onFiltersChange={setFilters}
          />
        </CardHeader>
        
        {users.length > 0 ? (
          <DataTable
            data={users}
            columns={columns}
            selectable
            sorting
            pagination={{
              page: 1,
              pageSize: 10,
              total: users.length,
              onPageChange: handlePageChange
            }}
            actions={[
              { label: 'Edit', onClick: editUser },
              { label: 'Delete', onClick: deleteUser, variant: 'destructive' }
            ]}
          />
        ) : (
          <EmptyState
            title="No users found"
            description="Get started by adding your first team member"
            actions={[
              { label: 'Add User', onClick: () => setShowAddUser(true) }
            ]}
          />
        )}
      </Card>
    </div>
  );
}
```

### 3. Progressive Web App Features

```tsx
import { 
  useGeolocation, 
  useCamera, 
  useBarcodeScanner,
  GrantPermissions,
  Card,
  Button,
  Text
} from '@acrobi/ui';

function PWAFeatures() {
  // Location services
  const { coordinates, getCurrentPosition, error: locationError } = useGeolocation();
  
  // Camera access
  const { stream, startCamera, capturePhoto, error: cameraError } = useCamera();
  
  // Barcode scanning
  const { isScanning, lastResult, startScanning } = useBarcodeScanner({
    onResult: (result) => {
      console.log('Scanned:', result.text);
    }
  });

  // Permission management
  const permissions = [
    {
      key: 'location',
      name: 'Location Services',
      description: 'Find nearby stores and services',
      required: false
    },
    {
      key: 'camera',
      name: 'Camera Access',
      description: 'Scan QR codes and take photos',
      required: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Permission Management */}
      <Card>
        <GrantPermissions
          permissions={permissions}
          showIndividualControls
          onGrantAll={(granted) => console.log('All permissions:', granted)}
        />
      </Card>

      {/* Location Services */}
      <Card>
        <CardHeader>
          <CardTitle>Location Services</CardTitle>
        </CardHeader>
        <CardContent>
          {coordinates ? (
            <Text>
              Current location: {coordinates.latitude.toFixed(6)}, {coordinates.longitude.toFixed(6)}
            </Text>
          ) : (
            <Button onClick={getCurrentPosition} disabled={!!locationError}>
              Get My Location
            </Button>
          )}
          {locationError && <Text variant="error">{locationError.message}</Text>}
        </CardContent>
      </Card>

      {/* Camera & Scanning */}
      <Card>
        <CardHeader>
          <CardTitle>Camera & Scanning</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={startCamera} disabled={!!cameraError}>
              Start Camera
            </Button>
            <Button onClick={capturePhoto} disabled={!stream}>
              Take Photo
            </Button>
            <Button onClick={startScanning} disabled={isScanning}>
              {isScanning ? 'Scanning...' : 'Start Scanning'}
            </Button>
          </div>
          
          {lastResult && (
            <Text>Last scan: {lastResult.text}</Text>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

> 📖 **Deep Dive**: For complete PWA implementation guides including advanced features like background sync, push notifications, and offline caching, see our [PWA documentation](../../../docs/pwa/).

## 🛠️ Development Workflow

### Using the CLI

The Acrobi CLI provides the most efficient development workflow:

```bash
# List all available components
npx @acrobi/cli list

# Add components with dependencies
npx @acrobi/cli add data-table  # Automatically includes primitives

# Add multiple components
npx @acrobi/cli add button card text-field avatar

# Check for updates
npx @acrobi/cli update

# View component documentation
npx @acrobi/cli docs button
```

### Component Discovery

Components are organized by complexity and use case:

1. **Start with primitives** for basic UI elements
2. **Use structures** for complete, validated solutions  
3. **Add PWA hooks** for device integration

### TypeScript Support

All components include comprehensive TypeScript definitions:

```tsx
import { ButtonProps, TextFieldProps, DataTableColumn } from '@acrobi/ui';

// Component props are fully typed
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};

// Complex types like DataTable columns
const columns: DataTableColumn<User>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    cell: ({ value, row }) => <strong>{value}</strong>
  }
];
```

## ♿ Accessibility

All components are built with accessibility as a first-class citizen:

### Built-in Features

- **WCAG 2.1 AA compliance** - Meets international accessibility standards
- **Semantic HTML** - Proper use of HTML elements and ARIA attributes
- **Keyboard navigation** - Full keyboard accessibility for all interactive elements
- **Screen reader support** - Comprehensive ARIA labels and descriptions
- **Focus management** - Visible focus indicators and logical tab order
- **Color contrast** - All color combinations meet WCAG AA standards

### Usage Example

```tsx
// Accessibility features are automatic
<TextField
  label="Email Address"           // Automatically linked with aria-labelledby
  error="Email is required"       // Automatically linked with aria-describedby
  required                        // Adds aria-required and visual indicator
  helperText="We'll never share"  // Linked with aria-describedby
/>

// Screen reader announcements
<DataTable
  data={users}
  columns={columns}
  aria-label="User management table"  // Custom ARIA label
  // Sorting changes are announced automatically
  // Row selection is announced automatically
/>
```

## 🔧 Customization

### Component Customization

All components accept standard HTML props and custom styling:

```tsx
// Using className for custom styles
<Button className="my-custom-styles bg-purple-500 hover:bg-purple-600">
  Custom Button
</Button>

// Using CSS-in-JS or styled-components
const StyledCard = styled(Card)`
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  border-radius: 12px;
`;

// Variant customization through CVA
<Button variant="outline" size="lg" className="border-2">
  Large Outline Button
</Button>
```

### Theme Customization

```tsx
// Override specific design tokens
const customTheme: Partial<Theme> = {
  tokens: {
    colors: {
      primary: { 
        light: '270 100% 60%',  // Purple primary
        dark: '270 100% 70%' 
      }
    },
    borderRadius: {
      md: '8px',  // More rounded corners
      lg: '12px'
    }
  }
};
```

## 📱 Mobile & Responsive Design

All components are mobile-first and fully responsive:

```tsx
// Responsive variants built-in
<ButtonPanel 
  orientation="vertical"      // Mobile: stack vertically
  className="md:orientation-horizontal"  // Desktop: horizontal
  buttons={actions}
/>

// Mobile-optimized interactions
<DataTable
  data={data}
  columns={columns}
  // Automatically responsive - stacks on mobile
  // Touch-friendly interactions
  // Swipe gestures supported
/>

// PWA-specific mobile features
const { coordinates } = useGeolocation({
  enableHighAccuracy: true,  // Use GPS on mobile
  timeout: 10000
});
```

## 📊 Performance

The design system is optimized for performance:

### Tree Shaking

Only import what you use - unused components are automatically excluded:

```tsx
// ✅ Good - only Button code is included
import { Button } from '@acrobi/ui';

// ❌ Avoid - imports entire library
import * as AcrobiUI from '@acrobi/ui';
```

### Bundle Size

| Component Type | Typical Size | Example |
|---------------|--------------|---------|
| **Primitives** | 2-5KB | Button, Input, Card |
| **Structures** | 5-15KB | TextField, DataTable |
| **PWA Hooks** | 3-8KB | useGeolocation, useCamera |

### Code Splitting

```tsx
// Lazy load heavy components
const DataTable = lazy(() => import('@acrobi/ui').then(m => ({ default: m.DataTable })));

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataTable data={data} columns={columns} />
    </Suspense>
  );
}
```

## 🧪 Testing

Components are designed to be easily testable:

```tsx
import { render, fireEvent, screen } from '@testing-library/react';
import { Button, TextField } from '@acrobi/ui';

// Testing interactions
test('button handles click', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});

// Testing form components
test('text field shows validation error', () => {
  render(<TextField label="Email" error="Invalid email" />);
  
  expect(screen.getByText('Invalid email')).toBeInTheDocument();
  expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
});
```

## 🔗 Next Steps

Now that you're set up, explore these resources:

### 📚 Documentation
- [Component Documentation](./components/) - Complete API reference
- [PWA Guides](./pwa/) - Device integration tutorials
- [Theming Guide](./theming.md) - Customization and branding
- [Accessibility Guide](./accessibility.md) - WCAG compliance details

### 🎯 Examples
- [Form Examples](./examples/forms.md) - Complete form implementations
- [Dashboard Examples](./examples/dashboards.md) - Data visualization patterns
- [PWA Examples](./examples/pwa.md) - Progressive web app features

### 🛠️ Tools
- [CLI Reference](./cli-reference.md) - Complete CLI documentation
- [Migration Guide](./migration.md) - Upgrading from legacy systems
- [Changelog](./CHANGELOG.md) - Latest updates and breaking changes

### 💬 Community
- **GitHub Issues**: [Report bugs](https://github.com/acrobi/design-system/issues)
- **Discussions**: [Ask questions](https://github.com/acrobi/design-system/discussions)
- **Discord**: [Join our community](https://discord.gg/acrobi-design)

## 🆘 Common Issues

### Tailwind Not Working
```bash
# Make sure you have the preset configured
# Check tailwind.config.js includes @acrobi/ui preset and content paths
```

### Components Not Styling
```css
/* Ensure you've imported the CSS */
@import '@acrobi/ui/styles';
```

### TypeScript Errors
```bash
# Install type definitions
npm install @types/react @types/react-dom
```

### PWA Features Not Working
```bash
# PWA features require HTTPS in production
# Check browser permissions in Settings > Site Settings
```

---

**Ready to build amazing experiences?** Start with our [component examples](./examples/) or dive into the [complete API reference](./components/api-reference.md).

*Need help? [Join our Discord community](https://discord.gg/acrobi-design) for real-time support!*