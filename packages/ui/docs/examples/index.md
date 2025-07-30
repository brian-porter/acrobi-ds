# Examples Overview

Explore practical examples of how to use the Acrobi Design System components in real-world applications. These examples demonstrate best practices, common patterns, and advanced techniques.

## 🚀 Quick Start Examples

### [Simple Form](./simple-form)
Basic form implementation using structure components.

```tsx
import { Card, TextField, Button } from '@acrobi/ui';

function ContactForm() {
  return (
    <Card className="max-w-md mx-auto">
      <form className="space-y-4">
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
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Card>
  );
}
```

### [Card Layout](./card-layout)
Responsive card grid using layout primitives.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@acrobi/ui';

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{product.description}</p>
            <p className="font-bold">${product.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

## 📊 Dashboard Examples

### [Dashboard App](./dashboard-app)
Complete dashboard with data visualization and controls.

**Features:**
- Real-time data updates
- Interactive charts
- Filtering and search
- Responsive design
- Dark/light mode

**Components Used:**
- DataTable
- FilterBar
- HeadlineStructure
- Card layouts
- Progress indicators

## 📱 Progressive Web App Examples

### PWA Features
Comprehensive PWA implementation with device integration.

```tsx
import { 
  useGeolocation, 
  useCamera, 
  useBarcodeScanner,
  GrantPermissions 
} from '@acrobi/ui';

function PWAApp() {
  const { coordinates, getCurrentPosition } = useGeolocation();
  const { startCamera, capturePhoto } = useCamera();
  const { startScanning, lastResult } = useBarcodeScanner();

  return (
    <div className="space-y-6">
      <GrantPermissions
        permissions={[
          { key: 'location', name: 'Location', required: false },
          { key: 'camera', name: 'Camera', required: true }
        ]}
      />
      
      {/* Location features */}
      <Card>
        <CardHeader>
          <CardTitle>Location Services</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={getCurrentPosition}>
            Get My Location
          </Button>
          {coordinates && (
            <p>Lat: {coordinates.latitude}, Lng: {coordinates.longitude}</p>
          )}
        </CardContent>
      </Card>

      {/* Camera features */}
      <Card>
        <CardHeader>
          <CardTitle>Camera & Scanning</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button onClick={startCamera}>Start Camera</Button>
          <Button onClick={capturePhoto}>Take Photo</Button>
          <Button onClick={startScanning}>Scan QR Code</Button>
          {lastResult && <p>Scanned: {lastResult.text}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
```

## 🎨 Theming Examples

### Custom Theme Implementation

```tsx
import { themes, themeToCSSProperties } from '@acrobi/ui';

// Create custom theme
const brandTheme = {
  ...themes.acrobi,
  tokens: {
    ...themes.acrobi.tokens,
    colors: {
      ...themes.acrobi.tokens.colors,
      primary: { 
        light: '220 100% 50%', 
        dark: '220 100% 60%' 
      },
      secondary: { 
        light: '160 100% 45%', 
        dark: '160 100% 55%' 
      }
    }
  }
};

function ThemedApp() {
  const cssProperties = themeToCSSProperties(brandTheme);
  
  return (
    <div style={cssProperties}>
      <Button variant="default">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </div>
  );
}
```

## 🏗️ Complex Form Examples

### Multi-Step Form with Validation

```tsx
import { 
  Card, 
  TextField, 
  SelectField, 
  CheckboxField,
  ButtonPanel,
  Progress 
} from '@acrobi/ui';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  
  const steps = [
    { title: 'Personal Info', component: PersonalInfoStep },
    { title: 'Preferences', component: PreferencesStep },
    { title: 'Review', component: ReviewStep }
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <Progress value={(step / steps.length) * 100} />
        <CardTitle>{steps[step - 1].title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        {React.createElement(steps[step - 1].component, {
          data: formData,
          onChange: setFormData
        })}
      </CardContent>
      
      <CardFooter>
        <ButtonPanel
          buttons={[
            { 
              label: 'Previous', 
              variant: 'outline',
              onClick: () => setStep(step - 1),
              disabled: step === 1
            },
            { 
              label: step === steps.length ? 'Submit' : 'Next',
              onClick: () => setStep(step + 1),
              disabled: step === steps.length
            }
          ]}
        />
      </CardFooter>
    </Card>
  );
}
```

## 📋 Data Management Examples

### Advanced Data Table

```tsx
import { DataTable, FilterBar, EmptyState } from '@acrobi/ui';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      key: 'avatar',
      header: '',
      width: 60,
      cell: ({ row }) => (
        <Avatar src={row.avatar} fallback={row.name[0]} />
      )
    },
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      cell: ({ value, row }) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Role',
      filterable: true,
      cell: ({ value }) => (
        <Badge variant={value === 'admin' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      cell: ({ value }) => (
        <Badge variant={value === 'active' ? 'success' : 'warning'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <ButtonPanel
          size="sm"
          buttons={[
            { label: 'Edit', onClick: () => editUser(row.id) },
            { label: 'Delete', variant: 'destructive', onClick: () => deleteUser(row.id) }
          ]}
        />
      )
    }
  ];

  return (
    <div className="space-y-6">
      <HeadlineStructure
        title="User Management"
        subtitle="Manage team members and permissions"
        actions={[
          { label: 'Add User', onClick: handleAddUser },
          { label: 'Export', variant: 'outline', onClick: handleExport }
        ]}
      />

      <Card>
        <CardHeader>
          <FilterBar
            showSearch
            searchPlaceholder="Search users..."
            fields={[
              {
                key: 'role',
                label: 'Role',
                type: 'select',
                options: [
                  { value: 'admin', label: 'Admin' },
                  { value: 'user', label: 'User' },
                  { value: 'viewer', label: 'Viewer' }
                ]
              },
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
        </CardHeader>

        {users.length > 0 ? (
          <DataTable
            data={users}
            columns={columns}
            loading={loading}
            selectable
            sorting
            pagination={{
              page: 1,
              pageSize: 10,
              total: users.length,
              onPageChange: handlePageChange
            }}
            onSelectionChange={handleSelectionChange}
          />
        ) : (
          <EmptyState
            title="No users found"
            description="Get started by adding your first team member"
            actions={[
              { label: 'Add User', onClick: handleAddUser }
            ]}
          />
        )}
      </Card>
    </div>
  );
}
```

## 🎯 Module Examples

### Collection Management

```tsx
import { AddCollection, EditCollection, MenuActions } from '@acrobi/ui';

function CollectionApp() {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Collections
            </h1>
            <MenuActions
              actions={[
                {
                  id: 'add',
                  label: 'New Collection',
                  icon: 'plus',
                  onClick: () => setShowAddModal(true)
                },
                {
                  id: 'import',
                  label: 'Import',
                  icon: 'upload',
                  onClick: handleImport
                }
              ]}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map(collection => (
            <Card 
              key={collection.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedCollection(collection)}
            >
              <CardHeader>
                <CardTitle>{collection.name}</CardTitle>
                <Badge variant="secondary">{collection.category}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{collection.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {collection.itemCount} items
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Add Collection Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl">
          <AddCollection
            onCollectionCreate={(collection) => {
              setCollections([...collections, collection]);
              setShowAddModal(false);
            }}
            onCancel={() => setShowAddModal(false)}
            categories={['Work', 'Personal', 'Projects']}
            allowCustomCategories
          />
        </DialogContent>
      </Dialog>

      {/* Edit Collection Modal */}
      <Dialog 
        open={!!selectedCollection} 
        onOpenChange={() => setSelectedCollection(null)}
      >
        <DialogContent className="max-w-2xl">
          {selectedCollection && (
            <EditCollection
              collection={selectedCollection}
              onSave={(updated) => {
                setCollections(collections.map(c => 
                  c.id === updated.id ? updated : c
                ));
                setSelectedCollection(null);
              }}
              onDelete={(id) => {
                setCollections(collections.filter(c => c.id !== id));
                setSelectedCollection(null);
              }}
              onCancel={() => setSelectedCollection(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

## 🧪 Testing Examples

### Component Testing

```tsx
import { render, fireEvent, screen } from '@testing-library/react';
import { TextField, Button } from '@acrobi/ui';

describe('Form Components', () => {
  test('TextField shows validation error', () => {
    render(
      <TextField 
        label="Email" 
        error="Invalid email format" 
        value="invalid-email"
      />
    );
    
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  test('Button handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### PWA Hook Testing

```tsx
import { renderHook, act } from '@testing-library/react';
import { useGeolocation } from '@acrobi/ui';

// Mock geolocation API
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;

describe('useGeolocation', () => {
  test('requests current position', async () => {
    const { result } = renderHook(() => useGeolocation());
    
    act(() => {
      result.current.getCurrentPosition();
    });
    
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
  });
});
```

## 📚 Learning Path

### Beginner
1. Start with [Simple Form](./simple-form)
2. Try [Card Layout](./card-layout)
3. Explore primitive components

### Intermediate
1. Build a [Dashboard App](./dashboard-app)
2. Implement custom theming
3. Add form validation

### Advanced
1. Create PWA features
2. Build custom modules
3. Implement real-time features

## 🔗 Additional Resources

- [Component API Reference](../components/api-reference)
- [Storybook Documentation](https://storybook.acrobi.com)
- [GitHub Repository](https://github.com/acrobi/design-system)
- [Community Discord](https://discord.gg/acrobi-design)

## 💡 Tips for Success

1. **Start Small** - Begin with simple components and build up
2. **Use TypeScript** - Take advantage of full type safety
3. **Follow Patterns** - Use established patterns from examples
4. **Test Early** - Write tests as you build components
5. **Performance First** - Use code splitting for large applications

---

Ready to start building? Pick an example that matches your use case and dive in!