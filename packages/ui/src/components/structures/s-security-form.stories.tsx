import type { Meta, StoryObj } from '@storybook/react';
import { SSecurityForm } from './s-security-form';

const meta = {
  title: 'Structures/Account/S-SecurityForm',
  component: SSecurityForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Form layout structure for security settings page with password management, 2FA, and device controls.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'card', 'minimal', 'compact'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'full'],
    },
  },
} satisfies Meta<typeof SSecurityForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSections = [
  {
    id: 'authentication',
    title: 'Authentication',
    description: 'Manage your login and authentication settings',
    icon: 'shield',
    settings: [
      {
        id: 'twoFactor',
        title: 'Two-Factor Authentication',
        description: 'Add an extra layer of security to your account',
        type: 'action' as const,
        status: 'disabled' as const,
        icon: 'shield-check',
        required: false,
        action: {
          label: 'Setup 2FA',
          variant: 'default' as const,
          icon: '🔐'
        },
        onAction: () => console.log('Setup 2FA')
      },
      {
        id: 'passkeyAuth',
        title: 'Passkey Authentication',
        description: 'Use biometric authentication for secure login',
        type: 'action' as const,
        status: 'enabled' as const,
        icon: 'fingerprint',
        action: {
          label: 'Manage',
          variant: 'outline' as const
        }
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy Settings',
    description: 'Control your privacy and data sharing preferences',
    icon: 'eye-off',
    settings: [
      {
        id: 'profileVisibility',
        title: 'Profile Visibility',
        description: 'Control who can see your profile information',
        type: 'toggle' as const,
        value: true,
        status: 'enabled' as const,
        onChange: (value: boolean) => console.log('Profile visibility:', value)
      },
      {
        id: 'activityStatus',
        title: 'Activity Status',
        description: 'Show when you were last active',
        type: 'toggle' as const,
        value: false,
        status: 'disabled' as const,
        onChange: (value: boolean) => console.log('Activity status:', value)
      },
      {
        id: 'dataDownload',
        title: 'Download Your Data',
        description: 'Request a copy of your personal data',
        type: 'action' as const,
        status: 'unknown' as const,
        icon: 'download',
        action: {
          label: 'Request',
          variant: 'outline' as const
        }
      }
    ]
  },
  {
    id: 'sessions',
    title: 'Session Management',
    description: 'Monitor and control active sessions',
    icon: 'monitor',
    variant: 'warning' as const,
    settings: [
      {
        id: 'sessionTimeout',
        title: 'Session Timeout',
        description: 'Automatically log out after inactivity',
        type: 'toggle' as const,
        value: true,
        status: 'enabled' as const,
        onChange: (value: boolean) => console.log('Session timeout:', value)
      },
      {
        id: 'logoutAllDevices',
        title: 'Sign Out All Devices',
        description: 'Sign out from all other devices and browsers',
        type: 'action' as const,
        status: 'warning' as const,
        icon: 'log-out',
        action: {
          label: 'Sign Out All',
          variant: 'destructive' as const
        }
      }
    ]
  }
];

const sampleDevices = [
  {
    id: 'current',
    name: 'MacBook Pro',
    type: 'desktop' as const,
    location: 'San Francisco, CA',
    lastActive: new Date(),
    current: true,
    os: 'macOS',
    browser: 'Chrome'
  },
  {
    id: 'iphone',
    name: 'iPhone 15 Pro',
    type: 'mobile' as const,
    location: 'San Francisco, CA',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    current: false,
    os: 'iOS',
    browser: 'Safari'
  },
  {
    id: 'tablet',
    name: 'iPad Air',
    type: 'tablet' as const,
    location: 'San Francisco, CA',
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    current: false,
    os: 'iPadOS',
    browser: 'Safari'
  }
];

export const Default: Story = {
  args: {
    sections: sampleSections,
    devices: sampleDevices,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
};

export const CardVariant: Story = {
  args: {
    ...Default.args,
    variant: 'card',
  },
};

export const Minimal: Story = {
  args: {
    ...Default.args,
    variant: 'minimal',
    devices: [],
  },
};

export const Compact: Story = {
  args: {
    ...Default.args,
    variant: 'compact',
    sections: [sampleSections[0]],
    devices: [sampleDevices[0]],
  },
};

export const WithoutDevices: Story = {
  args: {
    ...Default.args,
    devices: [],
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const DisabledState: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const WithErrors: Story = {
  args: {
    ...Default.args,
    errors: {
      currentPassword: 'Current password is incorrect',
      newPassword: 'Password must be at least 8 characters',
      confirmPassword: 'Passwords do not match',
    },
    currentPassword: 'wrong',
    newPassword: '123',
    confirmPassword: '456',
  },
};

export const TwoFactorEnabled: Story = {
  args: {
    ...Default.args,
    sections: [
      {
        ...sampleSections[0],
        settings: [
          {
            ...sampleSections[0].settings[0],
            status: 'enabled' as const,
            action: {
              label: 'Disable 2FA',
              variant: 'destructive' as const,
              icon: '🔓'
            }
          },
          sampleSections[0].settings[1]
        ]
      },
      ...sampleSections.slice(1)
    ],
  },
};

export const DangerousSettings: Story = {
  args: {
    ...Default.args,
    sections: [
      ...sampleSections,
      {
        id: 'danger',
        title: 'Danger Zone',
        description: 'Irreversible and destructive actions',
        icon: 'alert-triangle',
        variant: 'danger' as const,
        settings: [
          {
            id: 'deleteAccount',
            title: 'Delete Account',
            description: 'Permanently delete your account and all data',
            type: 'action' as const,
            status: 'error' as const,
            icon: 'trash',
            action: {
              label: 'Delete Account',
              variant: 'destructive' as const
            }
          }
        ]
      }
    ],
  },
};

export const CollapsibleSections: Story = {
  args: {
    ...Default.args,
    sections: sampleSections.map((section, index) => ({
      ...section,
      collapsible: true,
      defaultCollapsed: index > 0,
    })),
  },
};

export const ManyDevices: Story = {
  args: {
    ...Default.args,
    devices: [
      ...sampleDevices,
      {
        id: 'work-laptop',
        name: 'Work Laptop',
        type: 'desktop' as const,
        location: 'New York, NY',
        lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        current: false,
        os: 'Windows',
        browser: 'Edge'
      },
      {
        id: 'home-desktop',
        name: 'Gaming PC',
        type: 'desktop' as const,
        location: 'San Francisco, CA',
        lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        current: false,
        os: 'Windows',
        browser: 'Chrome'
      }
    ],
  },
};