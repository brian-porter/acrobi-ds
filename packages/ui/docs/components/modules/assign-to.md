# AssignTo

User assignment workflow module with search, permissions, and role-based access control.

## Overview

AssignTo is a comprehensive module for assigning tasks, projects, or items to users. It includes user search, permission validation, role-based restrictions, and activity logging.

## Basic Usage

```tsx
import { AssignTo } from '@acrobi/ui';

function TaskAssignment() {
  const teamMembers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'developer' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'designer' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'manager' }
  ];

  const handleAssign = (userId, user) => {
    console.log('Assigned to:', user);
    // Update your backend
    updateTaskAssignment(taskId, userId);
  };

  return (
    <AssignTo
      users={teamMembers}
      currentAssignee={task.assignedTo}
      onAssign={handleAssign}
      showPermissions
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `users` | `User[]` | `[]` | Available users for assignment |
| `currentAssignee` | `string` | - | Currently assigned user ID |
| `onAssign` | `function` | - | Assignment change handler |
| `allowMultiple` | `boolean` | `false` | Allow multiple assignments |
| `showPermissions` | `boolean` | `false` | Show user permissions |
| `roleRestrictions` | `string[]` | - | Allowed roles for assignment |

## Examples

### Multiple Assignment

```tsx
function MultipleAssignment() {
  const [assignees, setAssignees] = useState([]);

  return (
    <AssignTo
      users={users}
      currentAssignee={assignees}
      onAssign={(userIds) => setAssignees(userIds)}
      allowMultiple
      maxAssignees={3}
    />
  );
}
```

### Role-Based Assignment

```tsx
<AssignTo
  users={users}
  onAssign={handleAssign}
  roleRestrictions={['manager', 'lead']}
  showRoleInfo
/>
```