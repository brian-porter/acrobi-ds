import type { Meta, StoryObj } from '@storybook/react';
import { SListItemLink } from './s-list-item-link';

const meta = {
  title: 'Structures/Account/S-ListItemLink',
  component: SListItemLink,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive list item structure with link behavior for navigation and selection interfaces.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'subtle', 'bordered', 'elevated'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
    },
    spacing: {
      control: 'select',
      options: ['tight', 'default', 'loose'],
    },
    alignment: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    contentAlignment: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    metaAlignment: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    iconSize: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof SListItemLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Account Settings',
    description: 'Manage your account preferences and configuration',
    icon: 'settings',
    onClick: () => console.log('Navigate to account settings'),
  },
};

export const WithBadge: Story = {
  args: {
    title: 'Notifications',
    description: 'Configure notification preferences',
    icon: 'bell',
    badge: {
      text: '3',
      variant: 'default',
      count: true
    },
    onClick: () => console.log('Navigate to notifications'),
  },
};

export const WithAvatar: Story = {
  args: {
    title: 'John Doe',
    description: 'View and edit your profile information',
    avatar: {
      src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      fallback: 'JD',
      size: 'md'
    },
    badge: {
      text: 'Premium',
      variant: 'secondary'
    },
    metadata: 'Last updated 2h ago',
    onClick: () => console.log('Navigate to profile'),
  },
};

export const ExternalLink: Story = {
  args: {
    title: 'Help Documentation',
    description: 'View our comprehensive help documentation',
    icon: 'book',
    href: 'https://docs.example.com',
    external: true,
    target: '_blank',
  },
};

export const ElevatedVariant: Story = {
  args: {
    title: 'Security Settings',
    description: 'Manage passwords, 2FA, and security preferences',
    icon: 'shield',
    variant: 'elevated',
    badge: {
      text: 'Important',
      variant: 'destructive'
    },
    onClick: () => console.log('Navigate to security'),
  },
};

export const BorderedVariant: Story = {
  args: {
    title: 'Privacy Settings',
    description: 'Control your privacy and data sharing preferences',
    icon: 'eye-off',
    variant: 'bordered',
    onClick: () => console.log('Navigate to privacy'),
  },
};

export const GhostVariant: Story = {
  args: {
    title: 'App Preferences',
    description: 'Customize app behavior and appearance',
    icon: 'sliders',
    variant: 'ghost',
    onClick: () => console.log('Navigate to preferences'),
  },
};

export const SmallSize: Story = {
  args: {
    title: 'Language',
    description: 'Change app language',
    icon: 'globe',
    size: 'sm',
    onClick: () => console.log('Navigate to language settings'),
  },
};

export const LargeSize: Story = {
  args: {
    title: 'Billing & Subscription',
    description: 'Manage your subscription and payment methods',
    icon: 'credit-card',
    size: 'lg',
    badge: {
      text: 'Pro',
      variant: 'default'
    },
    metadata: 'Next billing: March 15, 2024',
    onClick: () => console.log('Navigate to billing'),
  },
};

export const ExtraLargeSize: Story = {
  args: {
    title: 'Data & Storage',
    description: 'Manage your data usage, storage limits, and backup settings',
    icon: 'database',
    size: 'xl',
    metadata: '2.3 GB used of 10 GB',
    onClick: () => console.log('Navigate to data settings'),
  },
};

export const WithMetadata: Story = {
  args: {
    title: 'Connected Devices',
    description: 'Manage devices that have access to your account',
    icon: 'smartphone',
    metadata: '3 active devices',
    badge: {
      text: 'Review',
      variant: 'secondary'
    },
    onClick: () => console.log('Navigate to devices'),
  },
};

export const LoadingState: Story = {
  args: {
    title: 'Sync Settings',
    description: 'Configure data synchronization',
    icon: 'refresh-cw',
    loading: true,
    onClick: () => console.log('Navigate to sync settings'),
  },
};

export const SelectedState: Story = {
  args: {
    title: 'Current Page',
    description: 'This item represents the current page',
    icon: 'check-circle',
    selected: true,
    onClick: () => console.log('Already on this page'),
  },
};

export const DisabledState: Story = {
  args: {
    title: 'Advanced Features',
    description: 'Premium features require subscription',
    icon: 'star',
    disabled: true,
    badge: {
      text: 'Premium',
      variant: 'outline'
    },
    onClick: () => console.log('Feature disabled'),
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'Simple List Item',
    description: 'A basic list item without an icon',
    onClick: () => console.log('Navigate to simple page'),
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'Quick Settings',
    icon: 'zap',
    onClick: () => console.log('Navigate to quick settings'),
  },
};

export const CenterAligned: Story = {
  args: {
    title: 'Centered Content',
    description: 'This content is center-aligned',
    icon: 'align-center',
    contentAlignment: 'center',
    alignment: 'center',
    onClick: () => console.log('Center aligned item'),
  },
};

export const RightAligned: Story = {
  args: {
    title: 'Right Aligned',
    description: 'This content is right-aligned',
    icon: 'align-right',
    contentAlignment: 'end',
    metaAlignment: 'start',
    onClick: () => console.log('Right aligned item'),
  },
};

export const CustomTrailingContent: Story = {
  args: {
    title: 'Custom Trailing',
    description: 'Item with custom trailing content',
    icon: 'settings',
    trailingContent: (
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Enabled</span>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
    ),
    onClick: () => console.log('Custom trailing content'),
  },
};

export const NavigationMenu: Story = {
  render: () => (
    <div className="w-80 space-y-1 p-4 bg-card border border-border rounded-lg">
      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Account Settings</h3>
      <SListItemLink
        title="Profile"
        description="Edit your profile information"
        icon="user"
        onClick={() => console.log('Profile')}
      />
      <SListItemLink
        title="Security"
        description="Password and security settings"
        icon="shield"
        badge={{ text: '!', variant: 'destructive' }}
        onClick={() => console.log('Security')}
      />
      <SListItemLink
        title="Notifications"
        description="Manage notification preferences"
        icon="bell"
        badge={{ text: '5', variant: 'secondary', count: true }}
        onClick={() => console.log('Notifications')}
      />
      <SListItemLink
        title="Privacy"
        description="Control your privacy settings"
        icon="eye-off"
        onClick={() => console.log('Privacy')}
      />
      <SListItemLink
        title="Billing"
        description="Subscription and payment"
        icon="credit-card"
        metadata="Pro Plan"
        onClick={() => console.log('Billing')}
      />
      <SListItemLink
        title="Help & Support"
        description="Get help and contact support"
        icon="help-circle"
        href="https://help.example.com"
        external
      />
    </div>
  ),
};