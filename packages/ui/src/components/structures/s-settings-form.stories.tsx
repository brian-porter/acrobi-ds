import type { Meta, StoryObj } from '@storybook/react';
import { SSettingsForm } from './s-settings-form';

const meta = {
  title: 'Structures/Account/S-SettingsForm',
  component: SSettingsForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Form layout structure for general settings page with various field types and section organization.',
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
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'mixed'],
    },
    actionsAlignment: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
} satisfies Meta<typeof SSettingsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSections = [
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Customize how the application looks and feels',
    icon: 'palette',
    fields: [
      {
        id: 'theme',
        label: 'Theme',
        description: 'Choose your preferred color theme',
        type: 'select' as const,
        value: 'dark',
        icon: 'sun',
        options: [
          { label: 'Light', value: 'light', icon: '☀️' },
          { label: 'Dark', value: 'dark', icon: '🌙' },
          { label: 'Auto', value: 'auto', icon: '🌓' }
        ]
      },
      {
        id: 'animations',
        label: 'Animations',
        description: 'Enable interface animations and transitions',
        type: 'toggle' as const,
        value: true,
        icon: 'zap'
      },
      {
        id: 'fontSize',
        label: 'Font Size',
        description: 'Adjust the text size throughout the app',
        type: 'slider' as const,
        value: 16,
        icon: 'type',
        slider: {
          min: 12,
          max: 24,
          step: 1,
          unit: 'px'
        }
      }
    ]
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Control how and when you receive notifications',
    icon: 'bell',
    variant: 'bordered' as const,
    fields: [
      {
        id: 'emailNotifications',
        label: 'Email Notifications',
        description: 'Receive notifications via email',
        type: 'toggle' as const,
        value: true,
        icon: 'mail'
      },
      {
        id: 'pushNotifications',
        label: 'Push Notifications',
        description: 'Receive push notifications on your device',
        type: 'toggle' as const,
        value: false,
        icon: 'smartphone',
        badge: {
          text: 'Requires permission',
          variant: 'secondary' as const
        }
      },
      {
        id: 'notificationVolume',
        label: 'Notification Volume',
        description: 'Control the volume of notification sounds',
        type: 'slider' as const,
        value: 75,
        icon: 'volume-2',
        slider: {
          min: 0,
          max: 100,
          step: 5,
          unit: '%'
        }
      },
      {
        id: 'quietHours',
        label: 'Quiet Hours',
        description: 'Set hours when notifications are muted',
        type: 'action' as const,
        icon: 'moon',
        action: {
          label: 'Configure',
          variant: 'outline' as const
        }
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy & Data',
    description: 'Manage your privacy settings and data preferences',
    icon: 'shield',
    variant: 'highlighted' as const,
    fields: [
      {
        id: 'dataCollection',
        label: 'Analytics Data Collection',
        description: 'Help improve the app by sharing anonymous usage data',
        type: 'toggle' as const,
        value: true,
        icon: 'bar-chart'
      },
      {
        id: 'crashReports',
        label: 'Crash Reports',
        description: 'Automatically send crash reports to help fix issues',
        type: 'toggle' as const,
        value: true,
        icon: 'alert-circle'
      },
      {
        id: 'dataExport',
        label: 'Export Data',
        description: 'Download a copy of your personal data',
        type: 'action' as const,
        icon: 'download',
        action: {
          label: 'Export',
          variant: 'outline' as const
        }
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Settings',
    description: 'Advanced configuration options for power users',
    icon: 'settings',
    collapsible: true,
    defaultCollapsed: true,
    fields: [
      {
        id: 'developerMode',
        label: 'Developer Mode',
        description: 'Enable advanced debugging and developer tools',
        type: 'toggle' as const,
        value: false,
        icon: 'code',
        badge: {
          text: 'Experimental',
          variant: 'destructive' as const
        }
      },
      {
        id: 'apiEndpoint',
        label: 'API Endpoint',
        description: 'Custom API endpoint for advanced users',
        type: 'text' as const,
        value: 'https://api.example.com',
        placeholder: 'Enter API endpoint URL',
        icon: 'server'
      },
      {
        id: 'cacheSize',
        label: 'Cache Size',
        description: 'Maximum cache size in MB',
        type: 'number' as const,
        value: 100,
        placeholder: 'Enter cache size',
        icon: 'database'
      },
      {
        id: 'resetSettings',
        label: 'Reset All Settings',
        description: 'Reset all settings to their default values',
        type: 'action' as const,
        icon: 'refresh-ccw',
        action: {
          label: 'Reset',
          variant: 'destructive' as const
        }
      }
    ]
  }
];

const sampleValues = {
  theme: 'dark',
  animations: true,
  fontSize: 16,
  emailNotifications: true,
  pushNotifications: false,
  notificationVolume: 75,
  dataCollection: true,
  crashReports: true,
  developerMode: false,
  apiEndpoint: 'https://api.example.com',
  cacheSize: 100
};

export const Default: Story = {
  args: {
    sections: sampleSections,
    values: sampleValues,
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
  },
};

export const Compact: Story = {
  args: {
    ...Default.args,
    variant: 'compact',
    sections: [sampleSections[0]],
  },
};

export const HorizontalLayout: Story = {
  args: {
    ...Default.args,
    layout: 'horizontal',
    size: 'lg',
  },
};

export const WithActions: Story = {
  args: {
    ...Default.args,
    showActions: true,
    onSave: (values) => console.log('Save values:', values),
    onReset: () => console.log('Reset values'),
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
      apiEndpoint: 'Invalid URL format',
      cacheSize: 'Cache size must be between 10 and 1000 MB',
    },
  },
};

export const CollapsibleSections: Story = {
  args: {
    ...Default.args,
    sections: sampleSections.map(section => ({
      ...section,
      collapsible: true,
      defaultCollapsed: section.id !== 'appearance',
    })),
  },
};

export const CenterAligned: Story = {
  args: {
    ...Default.args,
    actionsAlignment: 'center',
    showActions: true,
  },
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    size: 'full',
    layout: 'horizontal',
  },
};

export const AppearanceOnly: Story = {
  args: {
    sections: [sampleSections[0]],
    values: sampleValues,
    variant: 'card',
    showActions: true,
  },
};

export const NotificationsOnly: Story = {
  args: {
    sections: [sampleSections[1]],
    values: sampleValues,
    variant: 'bordered',
    showActions: true,
  },
};

export const AdvancedSettings: Story = {
  args: {
    sections: [sampleSections[3]],
    values: sampleValues,
    variant: 'card',
    showActions: true,
  },
};

export const WithSectionActions: Story = {
  args: {
    ...Default.args,
    sections: sampleSections.map(section => ({
      ...section,
      actions: section.id === 'privacy' ? [
        {
          label: 'Learn More',
          variant: 'ghost' as const,
          icon: 'info',
          onClick: () => console.log('Learn more about privacy')
        }
      ] : undefined
    })),
  },
};