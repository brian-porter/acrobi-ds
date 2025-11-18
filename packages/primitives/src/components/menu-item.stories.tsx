import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuItem } from './menu-item';

const meta: Meta<typeof MenuItem> = {
  title: 'Primitives/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'warning', 'success', 'disabled'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
    },
    badgeVariant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'success', 'warning'],
    },
  },
  decorators: [
    Story => (
      <div className='w-80 bg-background border rounded-lg p-2'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Menu Item',
    onSelect: () => console.log('Menu item selected'),
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Settings',
    icon: '⚙️',
    onSelect: () => console.log('Settings selected'),
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Account Settings',
    icon: '👤',
    description: 'Manage your account preferences',
    onSelect: () => console.log('Account settings selected'),
  },
};

export const WithBadge: Story = {
  args: {
    label: 'Messages',
    icon: '💬',
    badge: '3',
    badgeVariant: 'destructive',
    onSelect: () => console.log('Messages selected'),
  },
};

export const WithShortcut: Story = {
  args: {
    label: 'Save File',
    icon: '💾',
    shortcut: '⌘S',
    onSelect: () => console.log('Save file selected'),
  },
};

export const Selected: Story = {
  args: {
    label: 'Current Page',
    icon: '📄',
    selected: true,
    onSelect: () => console.log('Current page selected'),
  },
};

export const Loading: Story = {
  args: {
    label: 'Syncing...',
    loading: true,
    onSelect: () => console.log('Sync selected'),
  },
};

export const Destructive: Story = {
  args: {
    label: 'Delete Account',
    icon: '🗑️',
    variant: 'destructive',
    onSelect: () => console.log('Delete account selected'),
  },
};

export const Warning: Story = {
  args: {
    label: 'Reset Settings',
    icon: '⚠️',
    variant: 'warning',
    description: 'This will reset all your preferences',
    onSelect: () => console.log('Reset settings selected'),
  },
};

export const Success: Story = {
  args: {
    label: 'Backup Complete',
    icon: '✅',
    variant: 'success',
    badge: 'Done',
    badgeVariant: 'success',
    onSelect: () => console.log('Backup complete selected'),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Action',
    icon: '🚫',
    disabled: true,
    description: 'This action is not available',
    onSelect: () => console.log('This should not fire'),
  },
};

export const Small: Story = {
  args: {
    label: 'Small Item',
    icon: '🔍',
    size: 'sm',
    onSelect: () => console.log('Small item selected'),
  },
};

export const Large: Story = {
  args: {
    label: 'Large Item',
    icon: '📊',
    size: 'lg',
    description: 'This is a larger menu item with more space',
    badge: 'New',
    badgeVariant: 'success',
    shortcut: '⌘L',
    onSelect: () => console.log('Large item selected'),
  },
};

export const ComplexItem: Story = {
  args: {
    label: 'Complex Menu Item',
    icon: '🎯',
    description: 'This item has all features enabled',
    badge: '99+',
    badgeVariant: 'warning',
    shortcut: '⌘K',
    onSelect: () => console.log('Complex item selected'),
  },
};

export const CustomContent: Story = {
  args: {
    onSelect: () => console.log('Custom content selected'),
    children: (
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold'>
            JD
          </div>
          <div>
            <div className='font-medium'>John Doe</div>
            <div className='text-sm text-muted-foreground'>
              john@example.com
            </div>
          </div>
        </div>
        <div className='text-xs text-muted-foreground'>Online</div>
      </div>
    ),
  },
};
