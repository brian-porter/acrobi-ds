import type { Meta, StoryObj } from '@storybook/react';
import { SPermissionsList } from './s-permissions-list';

const meta = {
  title: 'Structures/Account/S-PermissionsList',
  component: SPermissionsList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Structure for displaying and managing device permissions with status indicators, risk levels, and controls.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'card', 'bordered', 'minimal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    layout: {
      control: 'select',
      options: ['list', 'grid', 'compact'],
    },
    itemSize: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
} satisfies Meta<typeof SPermissionsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const samplePermissions = [
  {
    id: 'camera',
    name: 'camera',
    displayName: 'Camera',
    description: 'Access to device camera for taking photos and recording videos',
    type: 'camera' as const,
    status: 'granted' as const,
    risk: 'medium' as const,
    required: true,
    toggleable: true,
    purpose: 'Profile photos, document scanning, and video calls',
    requestedBy: 'Acrobi App',
    lastChanged: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    usage: {
      frequency: 'occasional' as const,
      lastUsed: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      usageCount: 15
    }
  },
  {
    id: 'microphone',
    name: 'microphone',
    displayName: 'Microphone',
    description: 'Access to device microphone for recording audio and voice calls',
    type: 'microphone' as const,
    status: 'granted' as const,
    risk: 'high' as const,
    required: true,
    toggleable: true,
    purpose: 'Voice calls, audio messages, and voice commands',
    requestedBy: 'Acrobi App',
    lastChanged: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    usage: {
      frequency: 'frequent' as const,
      lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      usageCount: 42
    }
  },
  {
    id: 'location',
    name: 'geolocation',
    displayName: 'Location',
    description: 'Access to device location for location-based features and services',
    type: 'location' as const,
    status: 'denied' as const,
    risk: 'high' as const,
    required: false,
    toggleable: true,
    purpose: 'Location-based recommendations, weather, and local content',
    requestedBy: 'Acrobi App',
    lastChanged: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
  },
  {
    id: 'notifications',
    name: 'notifications',
    displayName: 'Notifications',
    description: 'Permission to show notifications and alerts',
    type: 'notifications' as const,
    status: 'granted' as const,
    risk: 'low' as const,
    required: false,
    toggleable: true,
    purpose: 'Important updates, messages, and reminders',
    requestedBy: 'Acrobi App',
    lastChanged: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    usage: {
      frequency: 'always' as const,
      lastUsed: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      usageCount: 128
    }
  },
  {
    id: 'storage',
    name: 'storage',
    displayName: 'Storage',
    description: 'Access to device storage for saving and reading files',
    type: 'storage' as const,
    status: 'granted' as const,
    risk: 'medium' as const,
    required: true,
    toggleable: false,
    purpose: 'Save photos, documents, and app data',
    requestedBy: 'Acrobi App',
    lastChanged: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    usage: {
      frequency: 'always' as const,
      lastUsed: new Date(),
      usageCount: 256
    }
  },
  {
    id: 'contacts',
    name: 'contacts',
    displayName: 'Contacts',
    description: 'Access to device contacts for sharing and communication features',
    type: 'contacts' as const,
    status: 'prompt' as const,
    risk: 'high' as const,
    required: false,
    toggleable: true,
    purpose: 'Find friends, invite contacts, and sync communication',
    requestedBy: 'Acrobi App'
  },
  {
    id: 'calendar',
    name: 'calendar',
    displayName: 'Calendar',
    description: 'Access to device calendar for scheduling and event features',
    type: 'calendar' as const,
    status: 'denied' as const,
    risk: 'medium' as const,
    required: false,
    toggleable: true,
    purpose: 'Schedule meetings, set reminders, and sync events',
    requestedBy: 'Acrobi App'
  },
  {
    id: 'photos',
    name: 'photos',
    displayName: 'Photos',
    description: 'Access to device photo library for sharing and uploading images',
    type: 'photos' as const,
    status: 'granted' as const,
    risk: 'medium' as const,
    required: false,
    toggleable: true,
    purpose: 'Upload profile pictures and share photos',
    requestedBy: 'Acrobi App',
    lastChanged: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    usage: {
      frequency: 'occasional' as const,
      lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      usageCount: 8
    }
  },
  {
    id: 'bluetooth',
    name: 'bluetooth',
    displayName: 'Bluetooth',
    description: 'Access to Bluetooth for device connectivity and data sharing',
    type: 'bluetooth' as const,
    status: 'unknown' as const,
    risk: 'low' as const,
    required: false,
    toggleable: true,
    purpose: 'Connect to wireless devices and accessories',
    requestedBy: 'System'
  },
  {
    id: 'clipboard',
    name: 'clipboard',
    displayName: 'Clipboard',
    description: 'Access to system clipboard for copying and pasting content',
    type: 'clipboard' as const,
    status: 'granted' as const,
    risk: 'critical' as const,
    required: false,
    toggleable: true,
    purpose: 'Copy and paste text, links, and data',
    requestedBy: 'Acrobi App',
    usage: {
      frequency: 'frequent' as const,
      lastUsed: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      usageCount: 67
    }
  }
];

const sampleActions = [
  {
    label: 'Grant',
    type: 'grant' as const,
    variant: 'default' as const,
    onClick: (perm) => console.log('Grant', perm.name)
  },
  {
    label: 'Deny',
    type: 'deny' as const,
    variant: 'destructive' as const,
    onClick: (perm) => console.log('Deny', perm.name)
  },
  {
    label: 'Revoke',
    type: 'revoke' as const,
    variant: 'outline' as const,
    onClick: (perm) => console.log('Revoke', perm.name)
  },
  {
    label: 'Details',
    type: 'details' as const,
    variant: 'ghost' as const,
    icon: 'ℹ️',
    onClick: (perm) => console.log('Show details for', perm.name)
  }
];

export const Default: Story = {
  args: {
    permissions: samplePermissions,
    actions: sampleActions,
    showRisk: true,
    showUsage: true,
    showPurpose: true,
    showToggles: true,
    interactive: true,
  },
};

export const CardVariant: Story = {
  args: {
    ...Default.args,
    variant: 'card',
  },
};

export const BorderedVariant: Story = {
  args: {
    ...Default.args,
    variant: 'bordered',
  },
};

export const Minimal: Story = {
  args: {
    ...Default.args,
    variant: 'minimal',
    showRisk: false,
    showUsage: false,
    showPurpose: false,
  },
};

export const GridLayout: Story = {
  args: {
    ...Default.args,
    layout: 'grid',
    variant: 'bordered',
    permissions: samplePermissions.slice(0, 6), // Show fewer for better grid display
  },
};

export const CompactLayout: Story = {
  args: {
    ...Default.args,
    layout: 'compact',
    itemSize: 'sm',
    showUsage: false,
  },
};

export const LargeItems: Story = {
  args: {
    ...Default.args,
    itemSize: 'lg',
    variant: 'card',
    permissions: samplePermissions.slice(0, 4),
  },
};

export const GrantedPermissions: Story = {
  args: {
    permissions: samplePermissions.filter(perm => perm.status === 'granted'),
    actions: sampleActions,
    showRisk: true,
    showUsage: true,
    showToggles: true,
    variant: 'bordered',
  },
};

export const DeniedPermissions: Story = {
  args: {
    permissions: samplePermissions.filter(perm => perm.status === 'denied'),
    actions: sampleActions,
    showRisk: true,
    showPurpose: true,
    showToggles: true,
  },
};

export const HighRiskPermissions: Story = {
  args: {
    permissions: samplePermissions.filter(perm => perm.risk === 'high' || perm.risk === 'critical'),
    actions: sampleActions,
    showRisk: true,
    showUsage: true,
    showPurpose: true,
    variant: 'bordered',
  },
};

export const GroupedByStatus: Story = {
  args: {
    ...Default.args,
    groupByStatus: true,
    permissions: samplePermissions.slice(0, 8),
  },
};

export const GroupedByRisk: Story = {
  args: {
    ...Default.args,
    groupByRisk: true,
    permissions: samplePermissions.slice(0, 8),
  },
};

export const WithoutToggles: Story = {
  args: {
    ...Default.args,
    showToggles: false,
    permissions: samplePermissions.slice(0, 6),
  },
};

export const WithoutRisk: Story = {
  args: {
    ...Default.args,
    showRisk: false,
  },
};

export const WithoutUsage: Story = {
  args: {
    ...Default.args,
    showUsage: false,
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    permissions: [],
    actions: sampleActions,
    emptyMessage: 'No permissions requested',
    emptyAction: {
      label: 'Refresh Permissions',
      onClick: () => console.log('Refresh permissions')
    },
  },
};

export const RequiredPermissions: Story = {
  args: {
    permissions: samplePermissions.filter(perm => perm.required),
    actions: sampleActions,
    showRisk: true,
    showUsage: true,
    showPurpose: true,
    variant: 'card',
  },
};

export const CriticalPermissions: Story = {
  args: {
    permissions: samplePermissions.filter(perm => perm.risk === 'critical'),
    actions: sampleActions,
    showRisk: true,
    showUsage: true,
    showPurpose: true,
    variant: 'bordered',
  },
};

export const InteractiveDemo: Story = {
  args: {
    ...Default.args,
    onPermissionClick: (perm) => console.log('Clicked permission:', perm.displayName),
    onPermissionToggle: (id, granted) => console.log('Toggle permission:', id, granted),
    onStatusChange: (id, status) => console.log('Status changed:', id, status),
    permissions: samplePermissions.slice(0, 6),
  },
};