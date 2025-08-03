import type { Meta, StoryObj } from '@storybook/react';
import { SConnectionsList } from './s-connections-list';

const meta = {
  title: 'Structures/Account/S-ConnectionsList',
  component: SConnectionsList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Structure for displaying and managing social media connections with status indicators and actions.',
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
} satisfies Meta<typeof SConnectionsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleConnections = [
  {
    id: 'facebook',
    provider: 'facebook',
    displayName: 'Facebook',
    providerType: 'facebook' as const,
    status: 'connected' as const,
    username: 'john.doe',
    accountName: 'John Doe',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    description: 'Connect with friends and share updates',
    lastSync: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    followerCount: 342,
    permissions: ['profile', 'posts', 'friends']
  },
  {
    id: 'twitter',
    provider: 'twitter',
    displayName: 'Twitter',
    providerType: 'twitter' as const,
    status: 'connected' as const,
    username: 'johndoe',
    accountName: 'John Doe',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    description: 'Share thoughts and engage with communities',
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    followerCount: 1250,
    permissions: ['profile', 'tweets', 'followers']
  },
  {
    id: 'instagram',
    provider: 'instagram',
    displayName: 'Instagram',
    providerType: 'instagram' as const,
    status: 'error' as const,
    username: 'johndoe',
    description: 'Share photos and stories',
    error: 'Connection expired. Please reconnect.',
    followerCount: 892,
    permissions: ['profile', 'media']
  },
  {
    id: 'linkedin',
    provider: 'linkedin',
    displayName: 'LinkedIn',
    providerType: 'linkedin' as const,
    status: 'disconnected' as const,
    description: 'Professional networking and career updates',
    required: false
  },
  {
    id: 'github',
    provider: 'github',
    displayName: 'GitHub',
    providerType: 'github' as const,
    status: 'connected' as const,
    username: 'johndoe',
    accountName: 'John Doe',
    description: 'Connect your development projects',
    lastSync: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    followerCount: 45,
    permissions: ['profile', 'repos']
  },
  {
    id: 'spotify',
    provider: 'spotify',
    displayName: 'Spotify',
    providerType: 'spotify' as const,
    status: 'pending' as const,
    description: 'Share your music taste and listening habits',
    loading: true
  },
  {
    id: 'discord',
    provider: 'discord',
    displayName: 'Discord',
    providerType: 'discord' as const,
    status: 'disconnected' as const,
    description: 'Connect with gaming and community servers'
  },
  {
    id: 'youtube',
    provider: 'youtube',
    displayName: 'YouTube',
    providerType: 'youtube' as const,
    status: 'connected' as const,
    username: 'johndoe',
    accountName: 'John Doe',
    description: 'Share and discover video content',
    lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    followerCount: 156,
    permissions: ['profile', 'videos', 'subscriptions']
  }
];

const sampleActions = [
  {
    label: 'Connect',
    type: 'connect' as const,
    variant: 'default' as const,
    onClick: (conn) => console.log('Connect', conn.provider)
  },
  {
    label: 'Disconnect',
    type: 'disconnect' as const,
    variant: 'destructive' as const,
    onClick: (conn) => console.log('Disconnect', conn.provider)
  },
  {
    label: 'Reconnect',
    type: 'reconnect' as const,
    variant: 'outline' as const,
    onClick: (conn) => console.log('Reconnect', conn.provider)
  },
  {
    label: 'Sync Now',
    type: 'sync' as const,
    variant: 'ghost' as const,
    icon: '🔄',
    onClick: (conn) => console.log('Sync', conn.provider)
  }
];

export const Default: Story = {
  args: {
    connections: sampleConnections,
    actions: sampleActions,
    showStats: true,
    showLastSync: true,
    showAvatars: true,
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
    showStats: false,
    showLastSync: false,
    showAvatars: false,
  },
};

export const GridLayout: Story = {
  args: {
    ...Default.args,
    layout: 'grid',
    variant: 'bordered',
  },
};

export const CompactLayout: Story = {
  args: {
    ...Default.args,
    layout: 'compact',
    itemSize: 'sm',
  },
};

export const LargeItems: Story = {
  args: {
    ...Default.args,
    itemSize: 'lg',
    variant: 'card',
  },
};

export const ConnectedOnly: Story = {
  args: {
    connections: sampleConnections.filter(conn => conn.status === 'connected'),
    actions: sampleActions,
    showStats: true,
    showLastSync: true,
    showAvatars: true,
  },
};

export const DisconnectedOnly: Story = {
  args: {
    connections: sampleConnections.filter(conn => conn.status === 'disconnected'),
    actions: sampleActions,
    showStats: false,
    showLastSync: false,
    showAvatars: false,
  },
};

export const WithErrors: Story = {
  args: {
    connections: sampleConnections.filter(conn => conn.status === 'error' || conn.status === 'connected'),
    actions: sampleActions,
    showStats: true,
    showLastSync: true,
    variant: 'bordered',
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
    connections: [],
    actions: sampleActions,
    emptyMessage: 'No social connections found',
    emptyAction: {
      label: 'Add Connection',
      onClick: () => console.log('Add connection')
    },
  },
};

export const WithoutStats: Story = {
  args: {
    ...Default.args,
    showStats: false,
    showLastSync: false,
  },
};

export const WithoutAvatars: Story = {
  args: {
    ...Default.args,
    showAvatars: false,
  },
};

export const WithPermissions: Story = {
  args: {
    ...Default.args,
    showPermissions: true,
    connections: sampleConnections.slice(0, 4), // Show fewer for better display
  },
};

export const PopularPlatforms: Story = {
  args: {
    connections: [
      sampleConnections[0], // Facebook
      sampleConnections[1], // Twitter
      sampleConnections[2], // Instagram
      sampleConnections[4], // GitHub
    ],
    actions: sampleActions,
    showStats: true,
    showLastSync: true,
    showAvatars: true,
    variant: 'card',
    layout: 'grid',
  },
};

export const InteractiveDemo: Story = {
  args: {
    ...Default.args,
    onConnectionClick: (conn) => console.log('Clicked connection:', conn.displayName),
    onStatusChange: (id, status) => console.log('Status changed:', id, status),
  },
};