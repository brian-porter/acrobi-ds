# Examples

Real-world implementation examples using the Acrobi Design System. These examples demonstrate best practices, common patterns, and complete implementations.

## 📚 Available Examples

### 🏗️ Basic Examples
- [**Simple Form**](./simple-form.md) - Contact form with validation
- [**Card Layout**](./card-layout.md) - Content cards with actions
- [**Navigation**](./navigation.md) - Breadcrumbs and navigation patterns

### 📊 Data & Forms
- [**Advanced Forms**](./advanced-forms.md) - Multi-step forms with complex validation
- [**Data Tables**](./data-tables.md) - Sortable, filterable data grids
- [**Search & Filter**](./search-filter.md) - Advanced search interfaces

### 📱 PWA Features
- [**Location Services**](./location-services.md) - Geolocation integration
- [**Camera & Scanning**](./camera-scanning.md) - Photo capture and QR codes
- [**Permissions Management**](./permissions.md) - PWA permission handling

### 🎨 Theming & Customization
- [**Custom Theme**](./custom-theme.md) - Creating and applying custom themes
- [**Component Variants**](./component-variants.md) - Customizing component appearance
- [**Responsive Design**](./responsive-design.md) - Mobile-first responsive patterns

### 🏢 Complete Applications
- [**Dashboard App**](./dashboard-app.md) - Full admin dashboard implementation
- [**E-commerce Product Page**](./ecommerce-product.md) - Product display with interactions
- [**User Profile Management**](./user-profile.md) - Complete user management interface

## 🚀 Quick Start Examples

### Basic Component Usage

```tsx
import { Button, Card, TextField } from '@acrobi/ui';

function QuickExample() {
  return (
    <Card className="max-w-md mx-auto p-6">
      <TextField 
        label="Email" 
        type="email" 
        placeholder="Enter your email" 
        required 
      />
      <Button className="w-full mt-4">
        Sign Up
      </Button>
    </Card>
  );
}
```

### Form with Validation

```tsx
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  TextField,
  SelectField,
  ButtonPanel 
} from '@acrobi/ui';
import { useState } from 'react';

function FormExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: ''
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            error={errors.name}
            required
          />
          
          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            error={errors.email}
            required
          />
          
          <SelectField
            label="Category"
            value={formData.category}
            onValueChange={(value) => setFormData({...formData, category: value})}
            options={[
              { value: 'support', label: 'Support' },
              { value: 'sales', label: 'Sales' },
              { value: 'general', label: 'General' }
            ]}
            error={errors.category}
            required
          />
          
          <ButtonPanel
            buttons={[
              { label: 'Submit', type: 'submit' },
              { label: 'Reset', variant: 'outline', type: 'reset' }
            ]}
          />
        </form>
      </CardContent>
    </Card>
  );
}
```

### Data Table with Actions

```tsx
import { DataTable, FilterBar, EmptyState } from '@acrobi/ui';
import { useState } from 'react';

function DataTableExample() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});
  
  const columns = [
    { 
      key: 'name', 
      header: 'Name', 
      sortable: true 
    },
    { 
      key: 'email', 
      header: 'Email', 
      filterable: true 
    },
    { 
      key: 'status', 
      header: 'Status',
      cell: ({ value }) => (
        <Badge variant={value === 'active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      )
    }
  ];

  const handleEdit = (user) => {
    console.log('Edit user:', user);
  };

  const handleDelete = (user) => {
    console.log('Delete user:', user);
  };

  return (
    <div className="space-y-4">
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
          }
        ]}
        onFiltersChange={setFilters}
      />
      
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
            onPageChange: (page) => console.log('Page:', page)
          }}
          actions={[
            { label: 'Edit', onClick: handleEdit },
            { label: 'Delete', onClick: handleDelete, variant: 'destructive' }
          ]}
        />
      ) : (
        <EmptyState
          title="No users found"
          description="Get started by adding your first user"
          actions={[
            { label: 'Add User', onClick: () => console.log('Add user') }
          ]}
        />
      )}
    </div>
  );
}
```

### PWA Integration

```tsx
import { 
  useGeolocation, 
  useCamera, 
  useBarcodeScanner,
  Card,
  Button,
  Text,
  GrantPermissions 
} from '@acrobi/ui';

function PWAExample() {
  const { coordinates, getCurrentPosition } = useGeolocation();
  const { stream, startCamera, capturePhoto } = useCamera();
  const { isScanning, lastResult, startScanning } = useBarcodeScanner({
    onResult: (result) => {
      console.log('Scanned:', result.text);
    }
  });

  const permissions = [
    {
      key: 'location',
      name: 'Location Services',
      description: 'Find nearby locations',
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
      <GrantPermissions
        permissions={permissions}
        showIndividualControls
        onGrantAll={(granted) => console.log('Permissions:', granted)}
      />

      <Card>
        <CardHeader>
          <CardTitle>Location Services</CardTitle>
        </CardHeader>
        <CardContent>
          {coordinates ? (
            <Text>
              Location: {coordinates.latitude.toFixed(6)}, {coordinates.longitude.toFixed(6)}
            </Text>
          ) : (
            <Button onClick={getCurrentPosition}>
              Get My Location
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Camera & Scanning</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={startCamera}>Start Camera</Button>
            <Button onClick={capturePhoto} disabled={!stream}>
              Take Photo
            </Button>
            <Button onClick={startScanning}>
              {isScanning ? 'Scanning...' : 'Start Scanner'}
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

## 📁 File Structure

Each example includes:

```
example-name/
├── README.md          # Overview and instructions
├── index.tsx         # Main implementation
├── components/       # Additional components (if needed)
├── styles.css       # Custom styles (if needed)
└── package.json     # Dependencies and scripts
```

## 🛠️ Running Examples

### Prerequisites

```bash
# Install dependencies
npm install @acrobi/ui
npm install react react-dom
npm install -D tailwindcss postcss autoprefixer
```

### Setup

1. **Configure Tailwind CSS**:
```js
// tailwind.config.js
module.exports = {
  presets: [require('@acrobi/ui/tailwind')],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@acrobi/ui/**/*.{js,ts,jsx,tsx}',
  ],
};
```

2. **Import Styles**:
```css
/* styles.css */
@import '@acrobi/ui/styles';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. **Use Components**:
```tsx
// Copy any example code and modify as needed
```

## 📖 How to Use Examples

### 1. Copy and Paste
Most examples are self-contained and can be copied directly into your project.

### 2. Customize
Modify the examples to fit your specific use case:
- Change styling with `className` props
- Adjust component props
- Add your business logic

### 3. Extend
Build upon the examples:
- Add more complex validation
- Integrate with your data layer
- Add custom theming

## 🎯 Best Practices Demonstrated

### Component Composition
Examples show how to effectively combine primitives and structures:

```tsx
// ✅ Good: Using structures for complete solutions
<TextField label="Email" error={errors.email} />

// ❌ Avoid: Recreating structure functionality
<div>
  <label>Email</label>
  <Input />
  <span className="error">{errors.email}</span>
</div>
```

### Accessibility
All examples include proper accessibility patterns:

```tsx
// Screen reader support
<DataTable aria-label="User management table" />

// Keyboard navigation
<ButtonPanel buttons={actions} />  // Handles tab order automatically

// Form associations
<TextField label="Password" />  // Automatically links label and input
```

### Performance
Examples demonstrate performance best practices:

```tsx
// Lazy loading for heavy components
const DataTable = lazy(() => import('@acrobi/ui').then(m => ({ default: m.DataTable })));

// Memoization for expensive calculations
const expensiveData = useMemo(() => processLargeDataset(rawData), [rawData]);
```

## 🔗 Related Resources

- [Getting Started Guide](../getting-started.md) - Basic setup and installation
- [Component Documentation](../components/) - Complete API reference
- [PWA Documentation](../pwa/) - Progressive web app guides
- [Theming Guide](../theming.md) - Customization and branding

## 💬 Community Examples

Have a great example to share? Contribute to our community examples:

1. **Fork the repository**
2. **Add your example** to the `docs/examples/community/` folder
3. **Submit a pull request** with description and screenshots
4. **Get featured** in our community showcase

### Contribution Guidelines

- Include complete, working code
- Add comprehensive README with setup instructions
- Follow accessibility best practices
- Include TypeScript types
- Test on mobile devices

---

*Ready to explore? Start with [Simple Form](./simple-form.md) or jump to [Advanced Forms](./advanced-forms.md) for complex patterns.*