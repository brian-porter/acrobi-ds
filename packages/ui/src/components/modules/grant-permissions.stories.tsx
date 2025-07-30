import type { Meta, StoryObj } from '@storybook/react';
import { GrantPermissions } from './grant-permissions';

const meta: Meta<typeof GrantPermissions> = {
  title: 'Modules/GrantPermissions',
  component: GrantPermissions,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Standardized permission request workflow for device features with authentic Acrobi styling and different states.',
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
      options: ['default', 'compact', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GrantPermissions>;

const cameraPermission = {
  type: 'camera' as const,
  title: 'Camera Access',
  description:
    'We need access to your camera to take photos and scan QR codes.',
  icon: '📷',
  required: true,
};

const locationPermission = {
  type: 'location' as const,
  title: 'Location Access',
  description: 'Allow location access to find nearby friends and events.',
  icon: '📍',
  required: false,
};

const contactsPermission = {
  type: 'contacts' as const,
  title: 'Contacts Access',
  description:
    'Access your contacts to help you find friends who are already using the app.',
  icon: '👥',
  required: false,
};

export const CameraPrompt: Story = {
  args: {
    permission: cameraPermission,
    permissionState: 'prompt',
    onGrant: () => console.log('Camera permission granted'),
    onSkip: () => console.log('Camera permission skipped'),
  },
};

export const LocationPrompt: Story = {
  args: {
    permission: locationPermission,
    permissionState: 'prompt',
    onGrant: () => console.log('Location permission granted'),
    onSkip: () => console.log('Location permission skipped'),
  },
};

export const ContactsPrompt: Story = {
  args: {
    permission: contactsPermission,
    permissionState: 'prompt',
    onGrant: () => console.log('Contacts permission granted'),
    onSkip: () => console.log('Contacts permission skipped'),
  },
};

export const PermissionGranted: Story = {
  args: {
    permission: cameraPermission,
    permissionState: 'granted',
    onContinue: () => console.log('Continue clicked'),
  },
};

export const PermissionDenied: Story = {
  args: {
    permission: cameraPermission,
    permissionState: 'denied',
    onOpenSettings: () => console.log('Open settings clicked'),
    onSkip: () => console.log('Skip clicked'),
  },
};

export const RequiredPermissionDenied: Story = {
  args: {
    permission: cameraPermission,
    permissionState: 'denied',
    onOpenSettings: () => console.log('Open settings clicked'),
  },
};

export const Loading: Story = {
  args: {
    permission: cameraPermission,
    permissionState: 'prompt',
    isLoading: true,
    onGrant: () => console.log('Camera permission granted'),
  },
};
