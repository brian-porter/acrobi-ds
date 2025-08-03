import type { Meta, StoryObj } from '@storybook/react';
import { SListItemSwitch } from './s-list-item-switch';

const meta = {
  title: 'Structures/Account/S-ListItemSwitch',
  component: SListItemSwitch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive list item structure with switch toggle for settings and preferences.',
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
    iconSize: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
    },
    switchSize: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
} satisfies Meta<typeof SListItemSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Push Notifications',
    description: 'Receive notifications on your device',
    icon: 'bell',
    checked: true,
    onCheckedChange: (checked) => console.log('Notifications:', checked),
  },
};

export const WithBadge: Story = {
  args: {
    title: 'Dark Mode',
    description: 'Use dark theme throughout the app',
    icon: 'moon',
    iconColor: 'primary',
    checked: false,
    badge: {
      text: 'Beta',
      variant: 'secondary'
    },
    metadata: 'Saves battery on OLED screens',
    onCheckedChange: (checked) => console.log('Dark mode:', checked),
  },
};

export const WithAvatar: Story = {
  args: {
    title: 'Profile Visibility',
    description: 'Make your profile visible to others',
    avatar: {
      src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      fallback: 'JD',
      size: 'md'
    },
    checked: true,
    metadata: 'Affects search results and recommendations',
    onCheckedChange: (checked) => console.log('Profile visibility:', checked),
  },
};

export const ItemClickable: Story = {
  args: {
    title: 'Two-Factor Authentication',
    description: 'Add extra security to your account',
    icon: 'shield',
    checked: false,
    itemClickable: true,
    badge: {
      text: 'Recommended',
      variant: 'default'
    },
    onCheckedChange: (checked) => console.log('2FA:', checked),
    onItemClick: () => console.log('Item clicked - toggle 2FA'),
  },
};

export const ElevatedVariant: Story = {
  args: {
    title: 'Location Services',
    description: 'Allow location-based features',
    icon: 'map-pin',
    variant: 'elevated',
    checked: false,
    badge: {
      text: 'Privacy',
      variant: 'destructive'
    },
    metadata: 'Used for weather and local recommendations',
    onCheckedChange: (checked) => console.log('Location:', checked),
  },
};

export const BorderedVariant: Story = {
  args: {
    title: 'Email Notifications',
    description: 'Receive updates via email',
    icon: 'mail',
    variant: 'bordered',
    checked: true,
    onCheckedChange: (checked) => console.log('Email notifications:', checked),
  },
};

export const GhostVariant: Story = {
  args: {
    title: 'Auto-Sync',
    description: 'Automatically sync data across devices',
    icon: 'sync',
    variant: 'ghost',
    checked: true,
    onCheckedChange: (checked) => console.log('Auto-sync:', checked),
  },
};

export const SmallSize: Story = {
  args: {
    title: 'Compact Mode',
    description: 'Use smaller interface elements',
    icon: 'minimize',
    size: 'sm',
    switchSize: 'sm',
    checked: false,
    onCheckedChange: (checked) => console.log('Compact mode:', checked),
  },
};

export const LargeSize: Story = {
  args: {
    title: 'Accessibility Features',
    description: 'Enable enhanced accessibility options for better usability',
    icon: 'accessibility',
    size: 'lg',
    switchSize: 'lg',
    checked: true,
    metadata: 'Includes high contrast, larger text, and screen reader support',
    onCheckedChange: (checked) => console.log('Accessibility:', checked),
  },
};

export const ExtraLargeSize: Story = {
  args: {
    title: 'Data Saver Mode',
    description: 'Reduce data usage by limiting background sync and image quality',
    icon: 'wifi-off',
    size: 'xl',
    checked: false,
    metadata: 'Recommended for limited data plans',
    badge: {
      text: 'Saves Data',
      variant: 'secondary'
    },
    onCheckedChange: (checked) => console.log('Data saver:', checked),
  },
};

export const WithMetadata: Story = {
  args: {
    title: 'Background Refresh',
    description: 'Allow apps to refresh content in background',
    icon: 'refresh-cw',
    checked: true,
    metadata: 'Last updated: 2 minutes ago',
    onCheckedChange: (checked) => console.log('Background refresh:', checked),
  },
};

export const LoadingState: Story = {
  args: {
    title: 'Cloud Backup',
    description: 'Backup your data to the cloud',
    icon: 'cloud',
    checked: true,
    loading: true,
    onCheckedChange: (checked) => console.log('Cloud backup:', checked),
  },
};

export const DisabledState: Story = {
  args: {
    title: 'Premium Features',
    description: 'Access to premium functionality',
    icon: 'star',
    checked: false,
    disabled: true,
    badge: {
      text: 'Pro Only',
      variant: 'outline'
    },
    onCheckedChange: (checked) => console.log('Premium features:', checked),
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'Marketing Emails',
    description: 'Receive promotional and marketing emails',
    checked: false,
    onCheckedChange: (checked) => console.log('Marketing emails:', checked),
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'Sound Effects',
    icon: 'volume-2',
    checked: true,
    onCheckedChange: (checked) => console.log('Sound effects:', checked),
  },
};

export const CenterAligned: Story = {
  args: {
    title: 'Centered Toggle',
    description: 'This toggle is center-aligned',
    icon: 'align-center',
    contentAlignment: 'center',
    alignment: 'center',
    checked: false,
    onCheckedChange: (checked) => console.log('Centered toggle:', checked),
  },
};

export const CustomTrailingContent: Story = {
  args: {
    title: 'Custom Status',
    description: 'Item with custom trailing content',
    icon: 'settings',
    checked: true,
    trailingContent: (
      <div className="flex items-center gap-2">
        <span className="text-xs text-green-600 font-medium">Active</span>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
    ),
  },
};

export const SettingsPanel: Story = {
  render: () => (
    <div className="w-96 space-y-1 p-4 bg-card border border-border rounded-lg">
      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Notification Settings</h3>
      
      <SListItemSwitch
        title="Push Notifications"
        description="Receive notifications on this device"
        icon="bell"
        checked={true}
        itemClickable={true}
        onCheckedChange={(checked) => console.log('Push notifications:', checked)}
      />
      
      <SListItemSwitch
        title="Email Notifications"
        description="Receive notifications via email"
        icon="mail"
        checked={true}
        badge={{ text: 'Daily digest', variant: 'secondary' }}
        onCheckedChange={(checked) => console.log('Email notifications:', checked)}
      />
      
      <SListItemSwitch
        title="Sound Alerts"
        description="Play sound for new notifications"
        icon="volume-2"
        checked={false}
        onCheckedChange={(checked) => console.log('Sound alerts:', checked)}
      />
      
      <SListItemSwitch
        title="Marketing Updates"
        description="Receive promotional content"
        icon="megaphone"
        checked={false}
        metadata="You can unsubscribe anytime"
        onCheckedChange={(checked) => console.log('Marketing updates:', checked)}
      />
      
      <div className="border-t border-border pt-3 mt-4">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">Privacy</h4>
        
        <SListItemSwitch
          title="Analytics"
          description="Help improve the app with usage data"
          icon="bar-chart"
          checked={true}
          badge={{ text: 'Anonymous', variant: 'outline' }}
          onCheckedChange={(checked) => console.log('Analytics:', checked)}
        />
        
        <SListItemSwitch
          title="Crash Reports"
          description="Automatically send crash reports"
          icon="alert-triangle"
          checked={true}
          onCheckedChange={(checked) => console.log('Crash reports:', checked)}
        />
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const [settings, setSettings] = React.useState({
      notifications: true,
      darkMode: false,
      autoSync: true,
      location: false,
    });

    const handleToggle = (key: string, value: boolean) => {
      setSettings(prev => ({ ...prev, [key]: value }));
      console.log(`${key}:`, value);
    };

    return (
      <div className="w-80 space-y-2 p-4 bg-card border border-border rounded-lg">
        <h3 className="font-semibold text-base mb-3">App Settings</h3>
        
        <SListItemSwitch
          title="Notifications"
          description="Receive app notifications"
          icon="bell"
          checked={settings.notifications}
          itemClickable={true}
          onCheckedChange={(checked) => handleToggle('notifications', checked)}
        />
        
        <SListItemSwitch
          title="Dark Mode"
          description="Use dark theme"
          icon="moon"
          checked={settings.darkMode}
          badge={{ text: 'Beta', variant: 'secondary' }}
          itemClickable={true}
          onCheckedChange={(checked) => handleToggle('darkMode', checked)}
        />
        
        <SListItemSwitch
          title="Auto-Sync"
          description="Sync data automatically"
          icon="sync"
          checked={settings.autoSync}
          onCheckedChange={(checked) => handleToggle('autoSync', checked)}
        />
        
        <SListItemSwitch
          title="Location Services"
          description="Allow location access"
          icon="map-pin"
          checked={settings.location}
          badge={{ text: 'Privacy', variant: 'destructive' }}
          onCheckedChange={(checked) => handleToggle('location', checked)}
        />
      </div>
    );
  },
};