import type { Meta, StoryObj } from '@storybook/react';
import { SInfoList } from './s-info-list';

const meta: Meta<typeof SInfoList> = {
  title: 'Structures/SInfoList',
  component: SInfoList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Structure for displaying labeled data rows with consistent formatting. Perfect for settings, metadata, and key-value pairs.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'card', 'bordered', 'minimal'],
      description: 'Visual variant of the info list',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Text size of the info list',
    },
    spacing: {
      control: 'select',
      options: ['tight', 'default', 'loose'],
      description: 'Spacing between items',
    },
    itemVariant: {
      control: 'select',
      options: ['default', 'compact', 'spacious', 'minimal'],
      description: 'Visual variant of individual items',
    },
    itemAlignment: {
      control: 'select',
      options: ['top', 'center', 'bottom'],
      description: 'Vertical alignment of items',
    },
    labelSize: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of labels',
    },
    valueSize: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of values',
    },
    valueAlignment: {
      control: 'select',
      options: ['left', 'right', 'center'],
      description: 'Alignment of values',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    showEmpty: {
      control: 'boolean',
      description: 'Show empty state when no items',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SInfoList>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Name', value: 'John Doe' },
      { label: 'Email', value: 'john.doe@example.com' },
      { label: 'Phone', value: '+1 (555) 123-4567' },
      { label: 'Location', value: 'San Francisco, CA' },
      { label: 'Joined', value: 'March 15, 2023' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { 
        label: 'Account Type', 
        value: 'Premium', 
        icon: 'crown',
        iconColor: 'p500',
        badge: { text: 'Active', variant: 'secondary' }
      },
      { 
        label: 'Email', 
        value: 'user@example.com', 
        icon: 'mail',
        iconColor: 'n500' 
      },
      { 
        label: 'Phone', 
        value: '+1 (555) 987-6543', 
        icon: 'phone',
        iconColor: 'n500' 
      },
      { 
        label: 'Location', 
        value: 'New York, NY', 
        icon: 'location',
        iconColor: 'n500' 
      },
      { 
        label: 'Last Login', 
        value: '2 hours ago', 
        icon: 'clock',
        iconColor: 'n300' 
      },
    ],
  },
};

export const WithActions: Story = {
  args: {
    items: [
      { 
        label: 'Email', 
        value: 'john.doe@example.com',
        icon: 'mail',
        actions: [
          { label: 'Edit', icon: '✏️', variant: 'ghost', size: 'sm' },
          { label: 'Verify', icon: '✓', variant: 'ghost', size: 'sm' },
        ]
      },
      { 
        label: 'Password', 
        value: '••••••••••••',
        icon: 'lock',
        actions: [
          { label: 'Change', icon: '🔑', variant: 'ghost', size: 'sm' },
        ]
      },
      { 
        label: 'Two-Factor Auth', 
        value: 'Enabled',
        icon: 'shield',
        badge: { text: 'Secure', variant: 'secondary' },
        actions: [
          { label: 'Configure', icon: '⚙️', variant: 'ghost', size: 'sm' },
        ]
      },
      { 
        label: 'API Key', 
        value: 'sk_live_••••••••••••3x7z',
        icon: 'key',
        actions: [
          { label: 'Regenerate', icon: '🔄', variant: 'ghost', size: 'sm' },
          { label: 'Copy', icon: '📋', variant: 'ghost', size: 'sm' },
        ]
      },
    ],
  },
};

export const Interactive: Story = {
  args: {
    items: [
      { 
        label: 'Profile Views', 
        value: '1,234',
        icon: 'eye',
        interactive: true,
        onClick: () => alert('View profile analytics')
      },
      { 
        label: 'Total Posts', 
        value: '89',
        icon: 'file',
        interactive: true,
        onClick: () => alert('View all posts')
      },
      { 
        label: 'Followers', 
        value: '2.3K',
        icon: 'users',
        interactive: true,
        onClick: () => alert('View followers')
      },
      { 
        label: 'Following', 
        value: '145',
        icon: 'user-plus',
        interactive: true,
        onClick: () => alert('View following')
      },
    ],
  },
};

export const CardVariant: Story = {
  args: {
    variant: 'card',
    items: [
      { 
        label: 'Plan', 
        value: 'Professional',
        icon: 'star',
        iconColor: 'p500',
        badge: { text: 'Current', variant: 'default' }
      },
      { 
        label: 'Billing Cycle', 
        value: 'Monthly',
        icon: 'calendar',
        iconColor: 'n500'
      },
      { 
        label: 'Next Payment', 
        value: 'April 15, 2024',
        icon: 'credit-card',
        iconColor: 'n500'
      },
      { 
        label: 'Amount', 
        value: '$29.99',
        icon: 'dollar-sign',
        iconColor: 'n500'
      },
    ],
    header: (
      <div className="mb-4 pb-4 border-b border-border">
        <h3 className="font-semibold text-lg">Billing Information</h3>
        <p className="text-sm text-muted-foreground">Manage your subscription and billing details</p>
      </div>
    ),
  },
};

export const WithBadges: Story = {
  args: {
    items: [
      { 
        label: 'Status', 
        value: 'Active',
        icon: 'check-circle',
        iconColor: 'p500',
        badge: { text: 'Verified', variant: 'secondary' }
      },
      { 
        label: 'Role', 
        value: 'Administrator',
        icon: 'shield',
        iconColor: 'n700',
        badge: { text: 'Full Access', variant: 'default' }
      },
      { 
        label: 'Department', 
        value: 'Engineering',
        icon: 'briefcase',
        iconColor: 'n500',
        badge: { text: 'Tech', variant: 'outline' }
      },
      { 
        label: 'Level', 
        value: 'Senior',
        icon: 'award',
        iconColor: 'p500',
        badge: { text: 'L5', variant: 'secondary' }
      },
    ],
  },
};

export const CompactVariant: Story = {
  args: {
    itemVariant: 'compact',
    size: 'sm',
    spacing: 'tight',
    items: [
      { label: 'ID', value: '12345' },
      { label: 'Created', value: '2024-03-15' },
      { label: 'Modified', value: '2024-03-20' },
      { label: 'Version', value: '1.2.3' },
      { label: 'Size', value: '2.4 MB' },
      { label: 'Type', value: 'Document' },
    ],
  },
};

export const LeftAligned: Story = {
  args: {
    valueAlignment: 'left',
    items: [
      { 
        label: 'Name', 
        value: 'Sarah Johnson',
        icon: 'user'
      },
      { 
        label: 'Bio', 
        value: 'Frontend developer passionate about creating beautiful and accessible user interfaces. Love working with React, TypeScript, and modern CSS.',
        icon: 'info'
      },
      { 
        label: 'Skills', 
        value: 'React, TypeScript, CSS, Node.js, GraphQL',
        icon: 'code'
      },
      { 
        label: 'Location', 
        value: 'Portland, Oregon, United States',
        icon: 'map-pin'
      },
    ],
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    showEmpty: true,
    emptyMessage: 'No information available',
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    variant: 'bordered',
    items: [
      { 
        label: 'CPU Usage', 
        value: '23%',
        icon: 'cpu',
        iconColor: 'p500'
      },
      { 
        label: 'Memory', 
        value: '4.2 GB / 16 GB',
        icon: 'memory',
        iconColor: 'n500'
      },
      { 
        label: 'Disk Space', 
        value: '128 GB / 512 GB',
        icon: 'hard-drive',
        iconColor: 'n500'
      },
      { 
        label: 'Network', 
        value: '1.2 MB/s',
        icon: 'network',
        iconColor: 'n500'
      },
    ],
    header: (
      <div className="mb-4">
        <h3 className="font-semibold text-lg">System Resources</h3>
        <p className="text-sm text-muted-foreground">Current system resource usage</p>
      </div>
    ),
    footer: (
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">Last updated: 2 minutes ago</p>
      </div>
    ),
  },
};

export const MinimalVariant: Story = {
  args: {
    variant: 'minimal',
    itemVariant: 'minimal',
    spacing: 'tight',
    items: [
      { label: 'Version', value: 'v2.1.0' },
      { label: 'Release Date', value: 'March 20, 2024' },
      { label: 'License', value: 'MIT' },
      { label: 'Author', value: 'Acrobi Team' },
    ],
  },
};

export const LargeSizeVariant: Story = {
  args: {
    size: 'lg',
    labelSize: 'lg',
    valueSize: 'lg',
    spacing: 'loose',
    items: [
      { 
        label: 'Company', 
        value: 'Acrobi Technologies',
        icon: 'building',
        iconColor: 'p500'
      },
      { 
        label: 'Position', 
        value: 'Senior Software Engineer',
        icon: 'briefcase',
        iconColor: 'n500'
      },
      { 
        label: 'Experience', 
        value: '8+ years',
        icon: 'calendar',
        iconColor: 'n500'
      },
      { 
        label: 'Specialization', 
        value: 'Full-stack Development',
        icon: 'code',
        iconColor: 'n500'
      },
    ],
  },
};