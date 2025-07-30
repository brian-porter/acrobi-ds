import type { Meta, StoryObj } from '@storybook/react-vite';

// Temporary mock component while we fix dependencies
const Delete = ({
  object,
  securityLevel,
  onDelete,
  title,
  description,
  className,
  ...props
}: any) => (
  <div className={`p-4 space-y-4 ${className || ''}`}>
    <div className='text-sm text-muted-foreground'>
      Delete Workflow ({securityLevel} level) - Dependency loading...
    </div>
    <div className='border rounded p-3'>
      <div className='flex items-center gap-2 mb-2'>
        <span className='text-lg'>{object?.icon}</span>
        <div>
          <div className='font-medium'>{object?.name}</div>
          <div className='text-sm text-muted-foreground'>{object?.type}</div>
        </div>
      </div>
      {object?.size && (
        <div className='text-xs text-muted-foreground'>Size: {object.size}</div>
      )}
    </div>
    <div className='space-y-2'>
      <h3 className='font-medium text-destructive'>{title || 'Delete Item'}</h3>
      <p className='text-sm text-muted-foreground'>
        {description ||
          `Are you sure you want to delete "${object?.name}"? This action cannot be undone.`}
      </p>
      {securityLevel === 'critical' && (
        <input
          className='w-full p-2 border rounded'
          placeholder='Type DELETE to confirm'
        />
      )}
    </div>
    <div className='flex gap-2'>
      <button className='px-4 py-2 bg-secondary rounded'>Cancel</button>
      <button
        className='px-4 py-2 bg-destructive text-destructive-foreground rounded'
        onClick={() => onDelete?.()}
      >
        Delete
      </button>
    </div>
  </div>
);

const meta: Meta<typeof Delete> = {
  title: 'Modules/Delete',
  component: Delete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    securityLevel: {
      control: { type: 'select' },
      options: ['simple', 'base', 'critical'],
    },
  },
  decorators: [
    Story => (
      <div className='w-96 bg-background border rounded-lg p-4'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleDelete: Story = {
  args: {
    object: {
      id: 'photo-123',
      name: 'vacation-photo.jpg',
      type: 'Photo',
      icon: '📸',
    },
    securityLevel: 'simple',
    onDelete: () => {
      console.log('Photo deleted');
      alert('Photo deleted successfully!');
    },
  },
};

export const BaseDelete: Story = {
  args: {
    object: {
      id: 'document-456',
      name: 'Important Report.docx',
      type: 'Document',
      icon: '📄',
      size: '2.5 MB',
      modified: '2 hours ago',
    },
    securityLevel: 'base',
    onDelete: () => {
      console.log('Document deleted');
      alert('Document deleted successfully!');
    },
  },
};

export const CriticalDelete: Story = {
  args: {
    object: {
      id: 'project-789',
      name: 'Client Project Alpha',
      type: 'Project',
      icon: '📁',
      itemCount: 147,
      collaborators: ['John Doe', 'Jane Smith', '3 others'],
    },
    securityLevel: 'critical',
    onDelete: () => {
      console.log('Project deleted');
      alert('Project deleted successfully!');
    },
  },
};

export const UserAccountDelete: Story = {
  args: {
    object: {
      id: 'user-account',
      name: 'john.doe@example.com',
      type: 'User Account',
      icon: '👤',
      joinDate: 'March 2022',
      dataPoints: '1,247 items',
    },
    securityLevel: 'critical',
    title: 'Delete Account',
    description:
      'This action will permanently delete your account and all associated data. This cannot be undone.',
    confirmText: 'DELETE ACCOUNT',
    onDelete: () => {
      console.log('Account deleted');
      alert('Account deletion initiated. You will be logged out shortly.');
    },
  },
};

export const DatabaseDelete: Story = {
  args: {
    object: {
      id: 'database-prod',
      name: 'production-database',
      type: 'Database',
      icon: '🗄️',
      records: '2.3M records',
      size: '45 GB',
      lastBackup: '6 hours ago',
    },
    securityLevel: 'critical',
    title: 'Delete Database',
    description:
      'WARNING: You are about to delete the production database. This will permanently destroy all data and cannot be reversed.',
    warningText: 'This action affects live production systems.',
    confirmText: 'DELETE DATABASE',
    onDelete: () => {
      console.log('Database deletion confirmed');
      alert('Database deletion scheduled for execution.');
    },
  },
};

export const FileDelete: Story = {
  args: {
    object: {
      id: 'temp-file',
      name: 'temp-backup.zip',
      type: 'Archive',
      icon: '📦',
      size: '156 MB',
    },
    securityLevel: 'simple',
    title: 'Delete File',
    onDelete: () => {
      console.log('File deleted');
    },
  },
};

export const MultipleItemsDelete: Story = {
  args: {
    object: {
      id: 'selected-items',
      name: '23 selected items',
      type: 'Multiple Items',
      icon: '📋',
      breakdown: '15 photos, 5 documents, 3 folders',
    },
    securityLevel: 'base',
    title: 'Delete Selected Items',
    description:
      'Are you sure you want to delete these 23 items? Some items may contain important data.',
    onDelete: () => {
      console.log('Multiple items deleted');
      alert('23 items deleted successfully!');
    },
  },
};

export const SharedFolderDelete: Story = {
  args: {
    object: {
      id: 'shared-folder',
      name: 'Team Resources',
      type: 'Shared Folder',
      icon: '👥',
      collaborators: ['5 team members'],
      contents: '89 files',
    },
    securityLevel: 'critical',
    title: 'Delete Shared Folder',
    description:
      'This folder is shared with your team. Deleting it will remove access for all collaborators.',
    warningText: 'Team members will lose access to all files in this folder.',
    confirmText: 'DELETE SHARED FOLDER',
    onDelete: () => {
      console.log('Shared folder deleted');
      alert('Shared folder deleted. Team members have been notified.');
    },
  },
};

export const WithCustomMessages: Story = {
  args: {
    object: {
      id: 'custom-item',
      name: 'Custom Item',
      type: 'Special Item',
      icon: '⭐',
    },
    securityLevel: 'base',
    title: 'Remove Item',
    description:
      'This item will be moved to trash and can be restored within 30 days.',
    submitLabel: 'Move to Trash',
    cancelLabel: 'Keep Item',
    onDelete: () => {
      console.log('Item moved to trash');
      alert('Item moved to trash successfully!');
    },
  },
};

export const NoConfirmationNeeded: Story = {
  args: {
    object: {
      id: 'draft-note',
      name: 'Untitled Draft',
      type: 'Draft Note',
      icon: '📝',
      lastSaved: 'Never',
    },
    securityLevel: 'simple',
    title: 'Discard Draft',
    description: 'This draft has not been saved. It will be permanently lost.',
    showConfirmationInput: false,
    onDelete: () => {
      console.log('Draft discarded');
      alert('Draft discarded.');
    },
  },
};

export const SystemDelete: Story = {
  args: {
    object: {
      id: 'system-logs',
      name: 'System Logs (Last 30 Days)',
      type: 'System Data',
      icon: '📊',
      size: '2.1 GB',
      entries: '450,000 log entries',
    },
    securityLevel: 'critical',
    title: 'Purge System Logs',
    description:
      'This will permanently delete all system logs from the last 30 days. This action is irreversible and may affect debugging capabilities.',
    warningText:
      'System administrators recommend keeping logs for compliance reasons.',
    confirmText: 'PURGE SYSTEM LOGS',
    onDelete: () => {
      console.log('System logs purged');
      alert('System logs have been purged successfully.');
    },
  },
};
