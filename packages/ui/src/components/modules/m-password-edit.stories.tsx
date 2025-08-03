import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MPasswordEdit } from './m-password-edit';
import { Button } from '../primitives/button';

const meta: Meta<typeof MPasswordEdit> = {
  title: 'Modules/M-PasswordEdit',
  component: MPasswordEdit,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'PRD v11 Account Interface Module - Secure password change dialog with strength validation, requirements checking, and comprehensive security features.',
      },
    },
  },
  argTypes: {
    requireCurrentPassword: {
      control: 'boolean',
      description: 'Whether current password is required for change',
    },
    minLength: {
      control: 'number',
      description: 'Minimum password length requirement',
    },
    requireUppercase: {
      control: 'boolean',
      description: 'Require at least one uppercase letter',
    },
    requireLowercase: {
      control: 'boolean',
      description: 'Require at least one lowercase letter',
    },
    requireNumbers: {
      control: 'boolean',
      description: 'Require at least one number',
    },
    requireSymbols: {
      control: 'boolean',
      description: 'Require at least one special character',
    },
    checkCommonPasswords: {
      control: 'boolean',
      description: 'Check against common password lists',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template component for interactive stories
const InteractiveTemplate = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async (data: { currentPassword: string; newPassword: string }) => {
    console.log('Saving password change:', { ...data, currentPassword: '[REDACTED]', newPassword: '[REDACTED]' });
    
    // Simulate validation
    if (data.currentPassword === 'wrongpassword') {
      throw new Error('Current password is incorrect');
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        Change Password
      </Button>
      <MPasswordEdit
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    requireCurrentPassword: true,
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    checkCommonPasswords: true,
  },
};

export const BasicSecurity: Story = {
  render: InteractiveTemplate,
  args: {
    requireCurrentPassword: true,
    minLength: 6,
    requireUppercase: false,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: false,
    checkCommonPasswords: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic security requirements with minimal password complexity.',
      },
    },
  },
};

export const HighSecurity: Story = {
  render: InteractiveTemplate,
  args: {
    requireCurrentPassword: true,
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    checkCommonPasswords: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'High security requirements with strict password complexity.',
      },
    },
  },
};

export const NoCurrentPassword: Story = {
  render: InteractiveTemplate,
  args: {
    requireCurrentPassword: false,
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: false,
    checkCommonPasswords: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Password reset scenario where current password is not required.',
      },
    },
  },
};

export const MinimalRequirements: Story = {
  render: InteractiveTemplate,
  args: {
    requireCurrentPassword: true,
    minLength: 4,
    requireUppercase: false,
    requireLowercase: false,
    requireNumbers: false,
    requireSymbols: false,
    checkCommonPasswords: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal security requirements for testing or development.',
      },
    },
  },
};

// Error simulation story
export const WithError: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSaveWithError = async (data: { currentPassword: string; newPassword: string }) => {
      // Always throw an error for demonstration
      throw new Error('Current password is incorrect. Please try again.');
    };

    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>
          Change Password (Will Error)
        </Button>
        <MPasswordEdit
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleSaveWithError}
          requireCurrentPassword={true}
          minLength={8}
          requireUppercase={true}
          requireLowercase={true}
          requireNumbers={true}
          requireSymbols={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates error handling when password change fails.',
      },
    },
  },
};

// States demonstration
export const States: Story = {
  render: () => {
    const [formState, setFormState] = useState(false);
    const [validatingState, setValidatingState] = useState(false);
    const [successState, setSuccessState] = useState(false);
    const [errorState, setErrorState] = useState(false);

    return (
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-4 gap-4">
          <Button onClick={() => setFormState(true)}>
            Form State
          </Button>
          <Button onClick={() => setValidatingState(true)}>
            Validating State
          </Button>
          <Button onClick={() => setSuccessState(true)}>
            Success State
          </Button>
          <Button onClick={() => setErrorState(true)}>
            Error State
          </Button>
        </div>

        <MPasswordEdit
          isOpen={formState}
          onClose={() => setFormState(false)}
          onSave={async () => {}}
        />

        <MPasswordEdit
          isOpen={validatingState}
          onClose={() => setValidatingState(false)}
          onSave={async () => {
            await new Promise(resolve => setTimeout(resolve, 5000));
          }}
        />

        <MPasswordEdit
          isOpen={successState}
          onClose={() => setSuccessState(false)}
          onSave={async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }}
        />

        <MPasswordEdit
          isOpen={errorState}
          onClose={() => setErrorState(false)}
          onSave={async () => {
            throw new Error('Failed to update password');
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different states of the password change dialog.',
      },
    },
  },
};

// Strength demonstration
export const PasswordStrength: Story = {
  render: InteractiveTemplate,
  args: {
    requireCurrentPassword: false, // Easier for testing strength
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    checkCommonPasswords: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Test password strength meter with different password combinations:\n\n' +
               '- "weak" → Very Weak\n' +
               '- "Password1" → Weak\n' +
               '- "Password1!" → Fair\n' +
               '- "MySecureP@ssw0rd" → Good\n' +
               '- "MyVerySecureP@ssw0rd2023!" → Strong',
      },
    },
  },
};

// Playground story
export const Playground: Story = {
  render: InteractiveTemplate,
  args: {
    requireCurrentPassword: true,
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    checkCommonPasswords: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different password requirements.',
      },
    },
  },
};