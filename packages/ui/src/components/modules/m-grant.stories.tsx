import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MGrant, type Permission } from './m-grant';
import { Button } from '../primitives/button';

const meta: Meta<typeof MGrant> = {
  title: 'Modules/M-Grant',
  component: MGrant,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'PRD v11 Account Interface Module - Device permissions request dialog with comprehensive permission management, browser API integration, and user-friendly explanations.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Dialog title',
    },
    description: {
      control: 'text',
      description: 'Dialog description',
    },
    allowIndividualControl: {
      control: 'boolean',
      description: 'Allow individual permission control',
    },
    showDetails: {
      control: 'boolean',
      description: 'Show detailed permission information',
    },
    autoRequest: {
      control: 'boolean',
      description: 'Automatically request permissions on open',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample permissions for stories
const defaultPermissions: Permission[] = [
  {
    id: 'camera',
    type: 'camera',
    name: 'Camera',
    description: 'Take photos and record videos',
    reason: 'To capture and share moments with your friends',
    required: false,
    status: 'pending',
    icon: 'camera',
    browserApi: 'camera',
    details: 'Access to your device camera for photo capture and video recording',
  },
  {
    id: 'microphone',
    type: 'microphone',
    name: 'Microphone',
    description: 'Record audio and voice messages',
    reason: 'To send voice messages and make audio calls',
    required: false,
    status: 'pending',
    icon: 'mic',
    browserApi: 'microphone',
    details: 'Access to your device microphone for voice recording',
  },
  {
    id: 'location',
    type: 'location',
    name: 'Location',
    description: 'Access your current location',
    reason: 'To show nearby content and location-based features',
    required: false,
    status: 'pending',
    icon: 'map-pin',
    browserApi: 'geolocation',
    details: 'Access to your geographic location for personalized content',
  },
  {
    id: 'notifications',
    type: 'notifications',
    name: 'Notifications',
    description: 'Send you push notifications',
    reason: 'To keep you updated with important information',
    required: true,
    status: 'pending',
    icon: 'bell',
    browserApi: 'notifications',
    details: 'Permission to display notifications even when the app is closed',
  },
];

const mediaPermissions: Permission[] = [
  {
    id: 'camera',
    type: 'camera',
    name: 'Camera',
    description: 'Take photos and record videos',
    reason: 'Essential for photo and video capture',
    required: true,
    status: 'pending',
    icon: 'camera',
    browserApi: 'camera',
    details: 'Required for all photo and video features',
  },
  {
    id: 'microphone',
    type: 'microphone',
    name: 'Microphone',
    description: 'Record audio and voice messages',
    reason: 'Required for audio recording and video calls',
    required: true,
    status: 'pending',
    icon: 'mic',
    browserApi: 'microphone',
    details: 'Needed for audio capture in videos and voice messages',
  },
];

const socialPermissions: Permission[] = [
  {
    id: 'contacts',
    type: 'contacts',
    name: 'Contacts',
    description: 'Access your contact list',
    reason: 'To help you find friends who are already using the app',
    required: false,
    status: 'pending',
    icon: 'users',
    browserApi: 'contacts',
    details: 'Read-only access to find existing friends',
  },
  {
    id: 'location',
    type: 'location',
    name: 'Location',
    description: 'Access your current location',
    reason: 'To show nearby friends and events',
    required: false,
    status: 'pending',
    icon: 'map-pin',
    browserApi: 'geolocation',
    details: 'Approximate location for social features',
  },
  {
    id: 'notifications',
    type: 'notifications',
    name: 'Notifications',
    description: 'Send you push notifications',
    reason: 'To notify you about messages and social activity',
    required: true,
    status: 'pending',
    icon: 'bell',
    browserApi: 'notifications',
    details: 'Essential for staying connected with friends',
  },
];

// Template component for interactive stories
const InteractiveTemplate = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleGrant = async (permissions: Permission[]) => {
    console.log('Granting permissions:', permissions);
    
    // Simulate permission requests
    const results = { granted: [], denied: [] };
    
    for (const permission of permissions) {
      // Simulate browser permission API
      const granted = Math.random() > 0.3; // 70% grant rate for demo
      if (granted) {
        results.granted.push(permission.id);
      } else {
        results.denied.push(permission.id);
      }
    }
    
    console.log('Permission results:', results);
    return results;
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        Request Permissions
      </Button>
      <MGrant
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onGrant={handleGrant}
      />
    </div>
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    permissions: defaultPermissions,
    title: 'Enable Permissions',
    description: 'This app would like to access the following features on your device.',
    allowIndividualControl: true,
    showDetails: true,
    autoRequest: false,
  },
};

export const MediaApp: Story = {
  render: InteractiveTemplate,
  args: {
    permissions: mediaPermissions,
    title: 'Camera & Microphone Access',
    description: 'To create photos and videos, we need access to your camera and microphone.',
    allowIndividualControl: false,
    showDetails: true,
    autoRequest: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration for media apps requiring camera and microphone access.',
      },
    },
  },
};

export const SocialApp: Story = {
  render: InteractiveTemplate,
  args: {
    permissions: socialPermissions,
    title: 'Connect with Friends',
    description: 'Help us personalize your experience and connect you with friends.',
    allowIndividualControl: true,
    showDetails: true,
    autoRequest: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration for social apps with contacts and location features.',
      },
    },
  },
};

export const NotificationsOnly: Story = {
  render: InteractiveTemplate,
  args: {
    permissions: [
      {
        id: 'notifications',
        type: 'notifications',
        name: 'Push Notifications',
        description: 'Receive important updates and messages',
        reason: 'Stay informed about important events and messages',
        required: true,
        status: 'pending',
        icon: 'bell',
        browserApi: 'notifications',
        details: 'We promise to only send relevant and important notifications',
      },
    ],
    title: 'Stay Updated',
    description: 'Enable notifications to receive important updates.',
    allowIndividualControl: false,
    showDetails: false,
    autoRequest: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple notification permission request.',
      },
    },
  },
};

export const AllOptional: Story = {
  render: InteractiveTemplate,
  args: {
    permissions: defaultPermissions.map(p => ({ ...p, required: false })),
    title: 'Optional Permissions',
    description: 'These permissions are optional but will enhance your experience.',
    allowIndividualControl: true,
    showDetails: true,
    autoRequest: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'All permissions are optional - user can pick and choose.',
      },
    },
  },
};

export const AllRequired: Story = {
  render: InteractiveTemplate,
  args: {
    permissions: defaultPermissions.map(p => ({ ...p, required: true })),
    title: 'Required Permissions',
    description: 'These permissions are required for the app to function properly.',
    allowIndividualControl: true,
    showDetails: true,
    autoRequest: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'All permissions are required - user must grant all to continue.',
      },
    },
  },
};

export const AutoRequest: Story = {
  render: InteractiveTemplate,
  args: {
    permissions: [
      {
        id: 'notifications',
        type: 'notifications',
        name: 'Notifications',
        description: 'Receive updates',
        reason: 'Stay informed',
        required: true,
        status: 'pending',
        icon: 'bell',
        browserApi: 'notifications',
      },
    ],
    title: 'Quick Setup',
    description: 'Setting up your permissions...',
    allowIndividualControl: false,
    showDetails: false,
    autoRequest: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Automatically requests permissions when dialog opens.',
      },
    },
  },
};

export const NoIndividualControl: Story = {
  render: InteractiveTemplate,
  args: {
    permissions: defaultPermissions,
    title: 'All or Nothing',
    description: 'Grant all permissions to continue, or skip for limited functionality.',
    allowIndividualControl: false,
    showDetails: true,
    autoRequest: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Users must grant all permissions at once - no individual control.',
      },
    },
  },
};

// Simulation stories
export const AlwaysGrant: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleAlwaysGrant = async (permissions: Permission[]) => {
      // Always grant all permissions
      return {
        granted: permissions.map(p => p.id),
        denied: [],
      };
    };

    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>
          Request Permissions (Always Grant)
        </Button>
        <MGrant
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onGrant={handleAlwaysGrant}
          permissions={defaultPermissions}
          allowIndividualControl={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Simulates always granting permissions for testing success states.',
      },
    },
  },
};

export const AlwaysDeny: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleAlwaysDeny = async (permissions: Permission[]) => {
      // Always deny all permissions
      return {
        granted: [],
        denied: permissions.map(p => p.id),
      };
    };

    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>
          Request Permissions (Always Deny)
        </Button>
        <MGrant
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onGrant={handleAlwaysDeny}
          permissions={defaultPermissions}
          allowIndividualControl={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Simulates always denying permissions for testing denial states.',
      },
    },
  },
};

// Error simulation
export const WithError: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleGrantWithError = async () => {
      throw new Error('Permission request failed. Please try again.');
    };

    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>
          Request Permissions (Will Error)
        </Button>
        <MGrant
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onGrant={handleGrantWithError}
          permissions={defaultPermissions}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates error handling when permission requests fail.',
      },
    },
  },
};

// States demonstration
export const States: Story = {
  render: () => {
    const [requestState, setRequestState] = useState(false);
    const [checkingState, setCheckingState] = useState(false);
    const [grantedState, setGrantedState] = useState(false);
    const [deniedState, setDeniedState] = useState(false);

    return (
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-4 gap-4">
          <Button onClick={() => setRequestState(true)}>
            Request State
          </Button>
          <Button onClick={() => setCheckingState(true)}>
            Checking State
          </Button>
          <Button onClick={() => setGrantedState(true)}>
            Granted State
          </Button>
          <Button onClick={() => setDeniedState(true)}>
            Denied State
          </Button>
        </div>

        <MGrant
          isOpen={requestState}
          onClose={() => setRequestState(false)}
          onGrant={async () => ({ granted: [], denied: [] })}
          permissions={defaultPermissions}
        />

        <MGrant
          isOpen={checkingState}
          onClose={() => setCheckingState(false)}
          onGrant={async () => {
            await new Promise(resolve => setTimeout(resolve, 5000));
            return { granted: ['notifications'], denied: ['camera', 'microphone', 'location'] };
          }}
          permissions={defaultPermissions}
        />

        <MGrant
          isOpen={grantedState}
          onClose={() => setGrantedState(false)}
          onGrant={async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { granted: defaultPermissions.map(p => p.id), denied: [] };
          }}
          permissions={defaultPermissions}
        />

        <MGrant
          isOpen={deniedState}
          onClose={() => setDeniedState(false)}
          onGrant={async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { granted: [], denied: defaultPermissions.map(p => p.id) };
          }}
          permissions={defaultPermissions}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different states of the permissions dialog.',
      },
    },
  },
};

// Playground story
export const Playground: Story = {
  render: InteractiveTemplate,
  args: {
    permissions: defaultPermissions,
    title: 'Permission Request',
    description: 'We need these permissions to provide the best experience.',
    allowIndividualControl: true,
    showDetails: true,
    autoRequest: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different permission configurations.',
      },
    },
  },
};