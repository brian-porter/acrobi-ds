import type { Meta, StoryObj } from '@storybook/react';
import { FindFriends } from './find-friends';

const meta: Meta<typeof FindFriends> = {
  title: 'Modules/FindFriends',
  component: FindFriends,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Complete find friends workflow with device contacts integration and permission handling using authentic Acrobi styling.',
      },
    },
  },
  argTypes: {
    permissionState: {
      control: 'select',
      options: ['prompt', 'granted', 'denied'],
    },
    variant: {
      control: 'select',
      options: ['default', 'compact'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FindFriends>;

const mockContacts = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=150&h=150&fit=crop&crop=face',
    email: 'alice@example.com',
    phone: '+1234567890',
    isConnected: false,
    isInvited: false,
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    email: 'bob@example.com',
    phone: '+1234567891',
    isConnected: true,
    isInvited: false,
  },
  {
    id: '3',
    name: 'Carol Davis',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    email: 'carol@example.com',
    phone: '+1234567892',
    isConnected: false,
    isInvited: true,
  },
];

export const PermissionPrompt: Story = {
  args: {
    permissionState: 'prompt',
    onRequestPermission: () => console.log('Request permission clicked'),
  },
};

export const PermissionDenied: Story = {
  args: {
    permissionState: 'denied',
    onRequestPermission: () => console.log('Try again clicked'),
  },
};

export const WithContacts: Story = {
  args: {
    permissionState: 'granted',
    contacts: mockContacts,
    searchQuery: '',
    onSearchChange: (query: string) => console.log('Search:', query),
    onConnect: contact => console.log('Connect:', contact.name),
    onInvite: contact => console.log('Invite:', contact.name),
  },
};

export const WithSearch: Story = {
  args: {
    permissionState: 'granted',
    contacts: mockContacts,
    searchQuery: 'Alice',
    onSearchChange: (query: string) => console.log('Search:', query),
    onConnect: contact => console.log('Connect:', contact.name),
    onInvite: contact => console.log('Invite:', contact.name),
  },
};

export const Loading: Story = {
  args: {
    permissionState: 'granted',
    isLoading: true,
  },
};

export const EmptyContacts: Story = {
  args: {
    permissionState: 'granted',
    contacts: [],
  },
};
