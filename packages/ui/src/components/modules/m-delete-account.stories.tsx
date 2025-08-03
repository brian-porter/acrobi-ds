import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MDeleteAccount, type AccountData } from './m-delete-account';
import { Button } from '../primitives/button';

const meta: Meta<typeof MDeleteAccount> = {
  title: 'Modules/M-DeleteAccount',
  component: MDeleteAccount,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'PRD v11 Account Interface Module - Multi-state account deletion dialog with recovery options, data selection, and comprehensive safety measures.',
      },
    },
  },
  argTypes: {
    gracePeriodDays: {
      control: 'number',
      description: 'Number of days before permanent deletion',
    },
    requirePassword: {
      control: 'boolean',
      description: 'Whether password is required for deletion',
    },
    allowPartialDeletion: {
      control: 'boolean',
      description: 'Allow users to select which data to delete',
    },
    allowRecovery: {
      control: 'boolean',
      description: 'Allow account recovery within grace period',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample account data for stories
const sampleAccountData: AccountData[] = [
  {
    id: 'profile',
    type: 'profile',
    label: 'Profile Information',
    description: 'Name, email, phone, bio, avatar',
    recoverable: true,
    selected: true,
  },
  {
    id: 'content',
    type: 'content',
    label: 'User Content',
    description: 'Posts, comments, uploads, collections',
    count: 1247,
    recoverable: false,
    selected: true,
  },
  {
    id: 'connections',
    type: 'connections',
    label: 'Social Connections',
    description: 'Friends, followers, blocked users',
    count: 156,
    recoverable: true,
    selected: true,
  },
  {
    id: 'activity',
    type: 'activity',
    label: 'Activity History',
    description: 'Login history, views, interactions',
    recoverable: false,
    selected: true,
  },
  {
    id: 'preferences',
    type: 'preferences',
    label: 'Settings & Preferences',
    description: 'Privacy settings, notifications, themes',
    recoverable: true,
    selected: false,
  },
  {
    id: 'files',
    type: 'files',
    label: 'Uploaded Files',
    description: 'Images, documents, media files',
    size: '2.4 GB',
    recoverable: false,
    selected: true,
  },
];

// Template component for interactive stories
const InteractiveTemplate = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (data: { password: string; reason?: string; dataTypes: string[]; permanent: boolean }) => {
    console.log('Deleting account:', data);
    
    // Simulate password validation
    if (data.password !== 'password123') {
      throw new Error('Invalid password. Please try again.');
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
  };

  const handleRecover = async (recoveryCode: string) => {
    console.log('Recovering account with code:', recoveryCode);
    
    // Simulate recovery validation
    if (recoveryCode !== 'RECOVER123') {
      throw new Error('Invalid recovery code. Please check your email.');
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <div className="p-4">
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        Delete Account
      </Button>
      <MDeleteAccount
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDelete={handleDelete}
        onRecover={handleRecover}
        accountData={sampleAccountData}
      />
    </div>
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    gracePeriodDays: 30,
    requirePassword: true,
    allowPartialDeletion: true,
    allowRecovery: true,
  },
};

export const ImmediateDeletion: Story = {
  render: InteractiveTemplate,
  args: {
    gracePeriodDays: 0,
    requirePassword: true,
    allowPartialDeletion: true,
    allowRecovery: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Immediate permanent deletion with no recovery option.',
      },
    },
  },
};

export const NoPasswordRequired: Story = {
  render: InteractiveTemplate,
  args: {
    gracePeriodDays: 30,
    requirePassword: false,
    allowPartialDeletion: true,
    allowRecovery: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Account deletion without password requirement.',
      },
    },
  },
};

export const AllOrNothing: Story = {
  render: InteractiveTemplate,
  args: {
    gracePeriodDays: 7,
    requirePassword: true,
    allowPartialDeletion: false,
    allowRecovery: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete account deletion only - no partial data selection.',
      },
    },
  },
};

export const MinimalRecovery: Story = {
  render: InteractiveTemplate,
  args: {
    gracePeriodDays: 7,
    requirePassword: true,
    allowPartialDeletion: false,
    allowRecovery: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Short recovery period with minimal options.',
      },
    },
  },
};

export const ExtendedGracePeriod: Story = {
  render: InteractiveTemplate,
  args: {
    gracePeriodDays: 90,
    requirePassword: true,
    allowPartialDeletion: true,
    allowRecovery: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended 90-day grace period for account recovery.',
      },
    },
  },
};

// Error simulation story
export const WithError: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteWithError = async () => {
      throw new Error('Account deletion failed. Please contact support.');
    };

    return (
      <div className="p-4">
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete Account (Will Error)
        </Button>
        <MDeleteAccount
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onDelete={handleDeleteWithError}
          gracePeriodDays={30}
          requirePassword={true}
          allowPartialDeletion={true}
          allowRecovery={true}
          accountData={sampleAccountData}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates error handling when account deletion fails.',
      },
    },
  },
};

// Recovery flow story
export const RecoveryFlow: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async (data: any) => {
      // Simulate successful deletion
      await new Promise(resolve => setTimeout(resolve, 2000));
    };

    const handleRecover = async (recoveryCode: string) => {
      console.log('Recovery code:', recoveryCode);
      if (recoveryCode === 'RECOVER123') {
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        throw new Error('Invalid recovery code');
      }
    };

    return (
      <div className="p-4 space-y-2">
        <p className="text-sm text-gray-600 mb-4">
          Test recovery flow: Use recovery code "RECOVER123"
        </p>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete Account (Recovery Test)
        </Button>
        <MDeleteAccount
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onDelete={handleDelete}
          onRecover={handleRecover}
          gracePeriodDays={30}
          requirePassword={false} // Easier for testing
          allowPartialDeletion={true}
          allowRecovery={true}
          accountData={sampleAccountData}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Test the complete recovery flow. Use "RECOVER123" as the recovery code.',
      },
    },
  },
};

// States demonstration
export const States: Story = {
  render: () => {
    const [warningState, setWarningState] = useState(false);
    const [confirmState, setConfirmState] = useState(false);
    const [deletingState, setDeletingState] = useState(false);
    const [deletedState, setDeletedState] = useState(false);

    return (
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-4 gap-4">
          <Button onClick={() => setWarningState(true)}>
            Warning State
          </Button>
          <Button onClick={() => setConfirmState(true)}>
            Confirm State
          </Button>
          <Button onClick={() => setDeletingState(true)}>
            Deleting State
          </Button>
          <Button onClick={() => setDeletedState(true)}>
            Deleted State
          </Button>
        </div>

        <MDeleteAccount
          isOpen={warningState}
          onClose={() => setWarningState(false)}
          onDelete={async () => {}}
          accountData={sampleAccountData}
        />

        <MDeleteAccount
          isOpen={confirmState}
          onClose={() => setConfirmState(false)}
          onDelete={async () => {}}
          accountData={sampleAccountData}
        />

        <MDeleteAccount
          isOpen={deletingState}
          onClose={() => setDeletingState(false)}
          onDelete={async () => {
            await new Promise(resolve => setTimeout(resolve, 5000));
          }}
          accountData={sampleAccountData}
        />

        <MDeleteAccount
          isOpen={deletedState}
          onClose={() => setDeletedState(false)}
          onDelete={async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }}
          accountData={sampleAccountData}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different states of the account deletion dialog.',
      },
    },
  },
};

// Custom data story
export const CustomAccountData: Story = {
  render: InteractiveTemplate,
  args: {
    gracePeriodDays: 14,
    requirePassword: true,
    allowPartialDeletion: true,
    allowRecovery: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom account data structure with different categories.',
      },
    },
  },
};

// Playground story
export const Playground: Story = {
  render: InteractiveTemplate,
  args: {
    gracePeriodDays: 30,
    requirePassword: true,
    allowPartialDeletion: true,
    allowRecovery: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different deletion configurations. Test password: "password123"',
      },
    },
  },
};