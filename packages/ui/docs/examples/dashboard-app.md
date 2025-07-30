# Dashboard App Example

A complete admin dashboard implementation showcasing data visualization, user management, and responsive design using the Acrobi Design System.

## Overview

This example demonstrates how to build a comprehensive admin dashboard with the Acrobi Design System. It includes data tables, charts, statistics cards, navigation, and user management features.

## Features

- **Responsive Layout** - Mobile-first design with sidebar navigation
- **Data Visualization** - Statistics cards and interactive charts
- **User Management** - Complete CRUD operations with data tables
- **Search & Filtering** - Advanced filtering and search capabilities
- **Real-time Updates** - Live data updates and notifications
- **Accessibility** - Full keyboard navigation and screen reader support

## Complete Implementation

### Main Dashboard Layout

```tsx
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  DataTable,
  FilterBar,
  SecHead,
  Button,
  Badge,
  Avatar,
  Progress,
  Alert,
  AlertDescription
} from '@acrobi/ui';
import { useState, useEffect } from 'react';

function DashboardApp() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Simulated data loading
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalUsers: 1234,
        activeUsers: 987,
        revenue: 45678,
        growth: 12.5
      });
      
      setUsers([
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Admin',
          status: 'active',
          lastActive: '2024-01-15',
          avatar: '/avatars/john.jpg'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'User',
          status: 'inactive',
          lastActive: '2024-01-10',
          avatar: '/avatars/jane.jpg'
        },
        // ... more users
      ]);
      
      setLoading(false);
    };

    loadDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="lg:pl-64">
        <DashboardHeader />
        
        <main className="p-6">
          {/* Dashboard Stats */}
          <DashboardStats stats={stats} loading={loading} />
          
          {/* User Management Section */}
          <UserManagementSection 
            users={users}
            filters={filters}
            onFiltersChange={setFilters}
            selectedUsers={selectedUsers}
            onSelectionChange={setSelectedUsers}
            loading={loading}
          />
          
          {/* Recent Activity */}
          <RecentActivitySection />
        </main>
      </div>
    </div>
  );
}
```

### Dashboard Statistics Cards

```tsx
function DashboardStats({ stats, loading }) {
  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers?.toLocaleString() || '0',
      change: '+12%',
      changeType: 'positive',
      icon: 'users'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers?.toLocaleString() || '0',
      change: '+8%',
      changeType: 'positive',
      icon: 'user-check'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue?.toLocaleString() || '0'}`,
      change: '+15%',
      changeType: 'positive',
      icon: 'dollar-sign'
    },
    {
      title: 'Growth Rate',
      value: `${stats.growth || 0}%`,
      change: '+2.1%',
      changeType: 'positive',
      icon: 'trending-up'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className={`text-sm ${
                  stat.changeType === 'positive' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Icon name={stat.icon} className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

### User Management Section

```tsx
function UserManagementSection({ 
  users, 
  filters, 
  onFiltersChange, 
  selectedUsers, 
  onSelectionChange,
  loading 
}) {
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const columns = [
    {
      key: 'user',
      header: 'User',
      sortable: true,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Avatar 
            src={row.avatar} 
            fallback={row.name.split(' ').map(n => n[0]).join('')}
            size="sm"
          />
          <div>
            <div className="font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      cell: ({ value }) => (
        <Badge variant={value === 'Admin' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      filterable: true,
      cell: ({ value }) => (
        <Badge variant={value === 'active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      sortable: true,
      cell: ({ value }) => new Date(value).toLocaleDateString()
    }
  ];

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleDeleteUsers = (userIds) => {
    if (confirm(`Delete ${userIds.length} user(s)?`)) {
      // Handle deletion
      console.log('Deleting users:', userIds);
    }
  };

  const filterFields = [
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
      options: [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
        { value: 'Manager', label: 'Manager' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <SecHead
        title="User Management"
        description="Manage team members and their permissions"
        actions={[
          {
            label: 'Add User',
            onClick: () => setShowAddUser(true),
            icon: 'plus'
          }
        ]}
      />

      <Card>
        <CardHeader>
          <FilterBar
            showSearch
            searchPlaceholder="Search users..."
            fields={filterFields}
            onFiltersChange={onFiltersChange}
            selectedCount={selectedUsers.length}
            onClearSelection={() => onSelectionChange([])}
          />
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center space-x-4">
                  <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : users.length > 0 ? (
            <DataTable
              data={users}
              columns={columns}
              selectable
              selectedRows={selectedUsers}
              onSelectionChange={onSelectionChange}
              sorting
              pagination={{
                page: 1,
                pageSize: 10,
                total: users.length,
                onPageChange: (page) => console.log('Page:', page)
              }}
              actions={[
                {
                  label: 'Edit',
                  onClick: handleEditUser,
                  icon: 'edit'
                },
                {
                  label: 'Delete',
                  onClick: (user) => handleDeleteUsers([user.id]),
                  variant: 'destructive',
                  icon: 'trash'
                }
              ]}
              bulkActions={[
                {
                  label: 'Delete Selected',
                  onClick: () => handleDeleteUsers(selectedUsers.map(u => u.id)),
                  variant: 'destructive',
                  icon: 'trash'
                }
              ]}
            />
          ) : (
            <EmptyState
              title="No users found"
              description="Get started by adding your first team member"
              actions={[
                {
                  label: 'Add User',
                  onClick: () => setShowAddUser(true),
                  icon: 'plus'
                }
              ]}
            />
          )}
        </CardContent>
      </Card>

      {/* Add User Modal */}
      {showAddUser && (
        <AddUserModal
          onClose={() => setShowAddUser(false)}
          onSave={(userData) => {
            // Handle user creation
            console.log('Creating user:', userData);
            setShowAddUser(false);
          }}
        />
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={(userData) => {
            // Handle user update
            console.log('Updating user:', userData);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
}
```

### Dashboard Sidebar Navigation

```tsx
function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'home', current: true },
    { name: 'Users', href: '/users', icon: 'users', current: false },
    { name: 'Analytics', href: '/analytics', icon: 'bar-chart', current: false },
    { name: 'Settings', href: '/settings', icon: 'settings', current: false },
    { name: 'Reports', href: '/reports', icon: 'file-text', current: false }
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-center h-16 px-4 bg-gray-900">
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                  ${item.current
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon 
                  name={item.icon} 
                  className={`
                    mr-3 h-5 w-5 transition-colors
                    ${item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'}
                  `}
                />
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-40 p-2 rounded-md bg-gray-900 text-white"
        >
          <Icon name="menu" className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}
```

### Dashboard Header

```tsx
function DashboardHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-600">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Icon name="bell" className="h-5 w-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 text-xs"
                >
                  3
                </Badge>
              </Button>
              
              {showNotifications && (
                <NotificationsDropdown 
                  onClose={() => setShowNotifications(false)} 
                />
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2"
              >
                <Avatar 
                  src="/current-user.jpg" 
                  fallback="JD" 
                  size="sm"
                />
                <span className="hidden md:block">John Doe</span>
                <Icon name="chevron-down" className="h-4 w-4" />
              </Button>
              
              {showProfile && (
                <ProfileDropdown 
                  onClose={() => setShowProfile(false)} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
```

### Recent Activity Section

```tsx
function RecentActivitySection() {
  const activities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'created a new project',
      target: 'Website Redesign',
      time: '2 hours ago',
      avatar: '/avatars/john.jpg'
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'updated user permissions for',
      target: 'Mike Johnson',
      time: '4 hours ago',
      avatar: '/avatars/jane.jpg'
    },
    {
      id: 3,
      user: 'System',
      action: 'backup completed successfully',
      target: 'Database',
      time: '6 hours ago',
      avatar: null
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <Avatar 
                src={activity.avatar} 
                fallback={activity.user[0]}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span>
                  {' '}{activity.action}{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Button variant="outline" className="w-full">
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Add User Modal

```tsx
function AddUserModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'active'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.role) newErrors.role = 'Role is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(formData);
    } catch (error) {
      setErrors({ submit: 'Failed to create user' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account with appropriate permissions.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Full Name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            error={errors.name}
            required
          />
          
          <TextField
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            error={errors.email}
            required
          />
          
          <SelectField
            label="Role"
            placeholder="Select role"
            value={formData.role}
            onValueChange={(value) => setFormData({...formData, role: value})}
            error={errors.role}
            options={[
              { value: 'Admin', label: 'Administrator' },
              { value: 'Manager', label: 'Manager' },
              { value: 'User', label: 'User' }
            ]}
            required
          />
          
          <SelectField
            label="Status"
            value={formData.status}
            onValueChange={(value) => setFormData({...formData, status: value})}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]}
          />
          
          {errors.submit && (
            <Alert variant="destructive">
              <AlertDescription>{errors.submit}</AlertDescription>
            </Alert>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

## Key Features Explained

### Responsive Design
- **Mobile-first approach** with collapsible sidebar
- **Flexible grid layouts** that adapt to screen size
- **Touch-friendly interactions** for mobile devices

### Data Management
- **Real-time updates** with loading states
- **Advanced filtering** and search capabilities
- **Bulk operations** for efficient management
- **Pagination** for large datasets

### User Experience
- **Loading states** for all async operations
- **Error handling** with user-friendly messages
- **Confirmation dialogs** for destructive actions
- **Keyboard navigation** throughout the interface

### Performance Optimization
- **Lazy loading** for heavy components
- **Memoization** for expensive calculations
- **Virtual scrolling** for large lists
- **Optimistic updates** for better perceived performance

## Customization Options

### Theming
```tsx
// Custom theme for dashboard
const dashboardTheme = {
  colors: {
    primary: 'hsl(221, 83%, 53%)',
    secondary: 'hsl(210, 40%, 98%)',
    accent: 'hsl(210, 40%, 96%)',
    // ... other colors
  }
};

<div data-theme="dashboard">
  <DashboardApp />
</div>
```

### Layout Variations
```tsx
// Top navigation layout
<div className="min-h-screen bg-gray-50">
  <DashboardTopNav />
  <main className="pt-16">
    <DashboardContent />
  </main>
</div>

// Tabbed layout
<div className="min-h-screen">
  <DashboardTabs />
  <DashboardContent />
</div>
```

## Testing Strategy

### Component Testing
```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DashboardApp from './DashboardApp';

test('loads and displays dashboard stats', async () => {
  render(<DashboardApp />);
  
  // Check loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  // Wait for data to load
  await waitFor(() => {
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });
});

test('filters users correctly', async () => {
  render(<DashboardApp />);
  
  // Apply filter
  fireEvent.change(screen.getByLabelText(/status/i), {
    target: { value: 'active' }
  });
  
  await waitFor(() => {
    expect(screen.queryByText('inactive')).not.toBeInTheDocument();
  });
});
```

### Integration Testing
```tsx
test('user creation flow works correctly', async () => {
  render(<DashboardApp />);
  
  // Open add user modal
  fireEvent.click(screen.getByText(/add user/i));
  
  // Fill form
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: 'New User' }
  });
  
  // Submit form
  fireEvent.click(screen.getByText(/create user/i));
  
  // Verify user was added
  await waitFor(() => {
    expect(screen.getByText('New User')).toBeInTheDocument();
  });
});
```

## Deployment Considerations

### Performance
- Implement code splitting for route-based chunks
- Use React.lazy for heavy components
- Optimize images and assets
- Enable gzip compression

### Security
- Implement proper authentication
- Validate all user inputs
- Use HTTPS in production
- Implement CSRF protection

### Monitoring
- Add error tracking (Sentry, Bugsnag)
- Implement analytics (Google Analytics, Mixpanel)
- Monitor performance metrics
- Set up health checks

## Related Examples

- [User Management](./user-management.md) - Detailed user CRUD operations
- [Data Visualization](./data-visualization.md) - Charts and analytics
- [Real-time Updates](./real-time-updates.md) - WebSocket integration

## Next Steps

- Add real-time notifications
- Implement advanced analytics
- Add export functionality
- Create mobile app version
- Add multi-tenant support