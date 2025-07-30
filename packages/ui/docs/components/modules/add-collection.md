# AddCollection

Complete workflow module for creating and organizing collections with templates, categories, and validation.

## Overview

AddCollection is a comprehensive module that provides a full collection creation workflow. It includes category management, template selection, validation, and accessibility features, making it easy to add structured collection functionality to your application.

## Basic Usage

```tsx
import { AddCollection } from '@acrobi/ui';

function CollectionManager() {
  const handleCollectionCreate = (collection) => {
    console.log('New collection created:', collection);
    // Save to your backend
    saveCollection(collection);
  };

  return (
    <AddCollection
      onCollectionCreate={handleCollectionCreate}
      categories={['Work', 'Personal', 'Projects']}
      allowCustomCategories
    />
  );
}
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onCollectionCreate` | `function` | - | Called when collection is created |
| `onCancel` | `function` | - | Called when creation is cancelled |
| `categories` | `string[]` | `[]` | Available category options |
| `templates` | `Template[]` | `[]` | Collection templates |
| `allowCustomCategories` | `boolean` | `false` | Allow custom category creation |

### Template Interface

```tsx
interface Template {
  id: string;
  name: string;
  description: string;
  category?: string;
  fields: TemplateField[];
  preview?: string;
}

interface TemplateField {
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect';
  required?: boolean;
  options?: string[];
  defaultValue?: any;
}
```

### Validation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `validation` | `ValidationConfig` | - | Custom validation rules |
| `required` | `string[]` | `['name']` | Required field names |
| `maxNameLength` | `number` | `100` | Maximum name length |
| `maxDescriptionLength` | `number` | `500` | Maximum description length |

### UI Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showTemplates` | `boolean` | `true` | Show template selection |
| `showPreview` | `boolean` | `true` | Show collection preview |
| `compactMode` | `boolean` | `false` | Use compact layout |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Basic Collection Creation

```tsx
function BasicCollectionCreator() {
  const [collections, setCollections] = useState([]);

  const handleCreate = (newCollection) => {
    setCollections(prev => [...prev, {
      ...newCollection,
      id: Date.now(),
      createdAt: new Date(),
      itemCount: 0
    }]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AddCollection
        onCollectionCreate={handleCreate}
        categories={['Work', 'Personal', 'Hobbies', 'Learning']}
        allowCustomCategories
      />
      
      {collections.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Your Collections</h3>
          <div className="grid gap-4">
            {collections.map(collection => (
              <div key={collection.id} className="p-4 border rounded-lg">
                <h4 className="font-medium">{collection.name}</h4>
                <p className="text-sm text-gray-600">{collection.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {collection.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {collection.itemCount} items
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### With Templates

```tsx
function TemplatedCollectionCreator() {
  const templates = [
    {
      id: 'book-collection',
      name: 'Book Collection',
      description: 'Track your personal library',
      category: 'Personal',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'author', type: 'text', required: true },
        { name: 'genre', type: 'select', options: ['Fiction', 'Non-fiction', 'Biography', 'Science'] },
        { name: 'rating', type: 'number', defaultValue: 5 },
        { name: 'dateRead', type: 'date' }
      ]
    },
    {
      id: 'recipe-collection',
      name: 'Recipe Collection',
      description: 'Organize your favorite recipes',
      category: 'Personal',
      fields: [
        { name: 'recipeName', type: 'text', required: true },
        { name: 'cuisine', type: 'select', options: ['Italian', 'Mexican', 'Asian', 'American'] },
        { name: 'difficulty', type: 'select', options: ['Easy', 'Medium', 'Hard'] },
        { name: 'cookingTime', type: 'number' },
        { name: 'ingredients', type: 'multiselect' }
      ]
    },
    {
      id: 'project-tracker',
      name: 'Project Tracker',
      description: 'Manage work projects and tasks',
      category: 'Work',
      fields: [
        { name: 'projectName', type: 'text', required: true },
        { name: 'status', type: 'select', options: ['Planning', 'In Progress', 'Review', 'Complete'] },
        { name: 'priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
        { name: 'dueDate', type: 'date' },
        { name: 'assignee', type: 'text' }
      ]
    }
  ];

  return (
    <AddCollection
      onCollectionCreate={(collection) => {
        console.log('Created collection:', collection);
      }}
      categories={['Work', 'Personal', 'Hobbies']}
      templates={templates}
      showTemplates
      showPreview
    />
  );
}
```

### Custom Validation

```tsx
function ValidatedCollectionCreator() {
  const customValidation = {
    name: (value) => {
      if (!value) return 'Collection name is required';
      if (value.length < 3) return 'Name must be at least 3 characters';
      if (value.length > 50) return 'Name must be less than 50 characters';
      if (!/^[a-zA-Z0-9\s-_]+$/.test(value)) return 'Name contains invalid characters';
      return '';
    },
    description: (value) => {
      if (value && value.length > 200) return 'Description must be less than 200 characters';
      return '';
    },
    category: (value) => {
      if (!value) return 'Please select a category';
      return '';
    }
  };

  const handleCreate = async (collection) => {
    try {
      // Additional server-side validation
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collection)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create collection');
      }
      
      const savedCollection = await response.json();
      console.log('Collection saved:', savedCollection);
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  return (
    <AddCollection
      onCollectionCreate={handleCreate}
      categories={['Work', 'Personal', 'Projects']}
      validation={customValidation}
      required={['name', 'category']}
      maxNameLength={50}
      maxDescriptionLength={200}
    />
  );
}
```

### Modal Integration

```tsx
function ModalCollectionCreator() {
  const [showModal, setShowModal] = useState(false);
  const [collections, setCollections] = useState([]);

  const handleCreate = (collection) => {
    setCollections(prev => [...prev, collection]);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Collections</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          New Collection
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection, index) => (
          <div key={index} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">{collection.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{collection.description}</p>
            <div className="flex justify-between items-center">
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                {collection.category}
              </span>
              <span className="text-sm text-gray-500">0 items</span>
            </div>
          </div>
        ))}
        
        {collections.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 mb-4">No collections yet</p>
            <button 
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg"
            >
              Create Your First Collection
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Create New Collection</h2>
                <button 
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <AddCollection
                onCollectionCreate={handleCreate}
                onCancel={handleCancel}
                categories={['Work', 'Personal', 'Hobbies', 'Learning']}
                allowCustomCategories
                compactMode
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### With Async Operations

```tsx
function AsyncCollectionCreator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async (collection) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Validate on server
      const response = await fetch('/api/collections/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collection)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Validation failed');
      }
      
      // Create collection
      const createResponse = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collection)
      });
      
      if (!createResponse.ok) {
        throw new Error('Failed to create collection');
      }
      
      const newCollection = await createResponse.json();
      console.log('Collection created successfully:', newCollection);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <AddCollection
        onCollectionCreate={handleCreate}
        categories={['Work', 'Personal', 'Projects']}
        allowCustomCategories
        disabled={loading}
      />
      
      {loading && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            <p className="text-blue-700">Creating collection...</p>
          </div>
        </div>
      )}
    </div>
  );
}
```

## Customization

### Custom Fields

```tsx
const customFields = [
  {
    name: 'tags',
    label: 'Tags',
    type: 'multiselect',
    options: ['Important', 'Urgent', 'Review', 'Archive'],
    placeholder: 'Select tags...'
  },
  {
    name: 'color',
    label: 'Color Theme',
    type: 'select',
    options: ['Blue', 'Green', 'Purple', 'Orange', 'Red'],
    defaultValue: 'Blue'
  },
  {
    name: 'isPublic',
    label: 'Make Public',
    type: 'boolean',
    defaultValue: false
  }
];

<AddCollection
  onCollectionCreate={handleCreate}
  categories={categories}
  customFields={customFields}
/>
```

### Styling

```tsx
<AddCollection
  onCollectionCreate={handleCreate}
  categories={categories}
  className="custom-collection-creator"
  styling={{
    container: 'bg-gray-50 p-6 rounded-xl',
    header: 'text-2xl font-bold text-gray-800',
    form: 'space-y-6',
    buttons: 'flex gap-3 justify-end'
  }}
/>
```

## Accessibility

AddCollection is built with accessibility in mind:

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and descriptions
- **Focus Management**: Logical tab order
- **Error Handling**: Clear error messages
- **Form Validation**: Real-time validation feedback

## Integration

### With State Management

```tsx
function ReduxCollectionCreator() {
  const dispatch = useDispatch();
  const { categories, templates, loading } = useSelector(state => state.collections);

  const handleCreate = (collection) => {
    dispatch(createCollection(collection));
  };

  return (
    <AddCollection
      onCollectionCreate={handleCreate}
      categories={categories}
      templates={templates}
      loading={loading}
    />
  );
}
```

### With Form Libraries

```tsx
import { useForm } from 'react-hook-form';

function FormLibraryIntegration() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  return (
    <AddCollection
      control={control}
      onSubmit={handleSubmit}
      errors={errors}
      categories={categories}
    />
  );
}
```

## Best Practices

1. **Provide clear categories** - Help users organize collections
2. **Use templates wisely** - Offer common collection types
3. **Validate early** - Check inputs as user types
4. **Show progress** - Indicate loading states for async operations
5. **Handle errors gracefully** - Provide clear error messages
6. **Support customization** - Allow users to personalize collections
7. **Consider mobile** - Ensure touch-friendly interface

## Related Components

- [EditCollection](./edit-collection) - Collection editing module
- [CollectionList](./collection-list) - Collection display component
- [TextField](../structures/text-field) - Form input component
- [SelectField](../structures/select-field) - Dropdown selection