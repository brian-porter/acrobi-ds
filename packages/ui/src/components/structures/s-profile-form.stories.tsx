import type { Meta, StoryObj } from '@storybook/react';
import { SProfileForm } from './s-profile-form';

const meta = {
  title: 'Structures/Account/S-ProfileForm',
  component: SProfileForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Form layout structure for profile page editing with multiple sections, field types, and avatar management.',
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
} satisfies Meta<typeof SProfileForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSections = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: 'Update your basic profile information',
    fields: [
      {
        name: 'displayName',
        label: 'Display Name',
        type: 'text' as const,
        value: 'John Doe',
        required: true,
        placeholder: 'Enter your display name'
      },
      {
        name: 'username',
        label: 'Username',
        type: 'text' as const,
        value: 'johndoe',
        required: true,
        placeholder: 'Choose a unique username'
      },
      {
        name: 'bio',
        label: 'Bio',
        type: 'textarea' as const,
        value: 'Software developer passionate about creating amazing user experiences.',
        placeholder: 'Tell us about yourself'
      }
    ]
  },
  {
    id: 'contact',
    title: 'Contact Information',
    description: 'Manage your contact details',
    fields: [
      {
        name: 'email',
        label: 'Email Address',
        type: 'email' as const,
        value: 'john@example.com',
        required: true,
        placeholder: 'Enter your email address'
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel' as const,
        value: '+1 (555) 123-4567',
        placeholder: 'Enter your phone number'
      },
      {
        name: 'website',
        label: 'Website',
        type: 'url' as const,
        value: 'https://johndoe.dev',
        placeholder: 'Enter your website URL'
      }
    ]
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Configure your account preferences',
    variant: 'bordered' as const,
    fields: [
      {
        name: 'timezone',
        label: 'Timezone',
        type: 'select' as const,
        value: 'America/New_York',
        required: true,
        options: [
          { label: 'Eastern Time (ET)', value: 'America/New_York' },
          { label: 'Central Time (CT)', value: 'America/Chicago' },
          { label: 'Mountain Time (MT)', value: 'America/Denver' },
          { label: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
        ]
      },
      {
        name: 'language',
        label: 'Language',
        type: 'select' as const,
        value: 'en',
        options: [
          { label: 'English', value: 'en' },
          { label: 'Spanish', value: 'es' },
          { label: 'French', value: 'fr' },
          { label: 'German', value: 'de' },
        ]
      }
    ]
  }
];

const sampleAvatar = {
  src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  fallback: 'JD',
  editable: true
};

const sampleBadges = [
  { label: 'Verified', variant: 'secondary' as const, icon: '✓' },
  { label: 'Premium', variant: 'default' as const }
];

const sampleActions = [
  { label: 'Cancel', variant: 'outline' as const },
  { label: 'Save Changes', type: 'submit' as const, variant: 'default' as const }
];

export const Default: Story = {
  args: {
    sections: sampleSections,
    avatar: sampleAvatar,
    badges: sampleBadges,
    actions: sampleActions,
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
    avatar: undefined,
    badges: [],
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

export const WithoutAvatar: Story = {
  args: {
    ...Default.args,
    avatar: undefined,
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
      displayName: 'Display name is required',
      email: 'Please enter a valid email address',
      username: 'Username is already taken',
    },
  },
};

export const CollapsibleSections: Story = {
  args: {
    ...Default.args,
    sections: sampleSections.map(section => ({
      ...section,
      collapsible: true,
      defaultCollapsed: section.id === 'preferences',
    })),
  },
};

export const CenterAligned: Story = {
  args: {
    ...Default.args,
    actionsAlignment: 'center',
    size: 'sm',
  },
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    size: 'full',
    layout: 'horizontal',
  },
};

export const SingleSection: Story = {
  args: {
    sections: [sampleSections[0]],
    avatar: sampleAvatar,
    badges: sampleBadges,
    actions: sampleActions,
    variant: 'card',
  },
};