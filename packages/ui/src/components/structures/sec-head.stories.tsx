import type { Meta, StoryObj } from '@storybook/react-vite';
import { SecHead } from './sec-head';

const meta: Meta<typeof SecHead> = {
  title: 'Structures/SecHead',
  component: SecHead,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='w-full max-w-2xl'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Section Title',
    subtitle: 'This is a subtitle that provides additional context',
  },
};

export const WithActions: Story = {
  args: {
    title: 'My Projects',
    subtitle: 'Manage your active projects and collaborations',
    actions: [
      {
        label: 'New Project',
        variant: 'primary',
        onClick: () => console.log('New project clicked'),
      },
    ],
  },
};

export const WithMultipleActions: Story = {
  args: {
    title: 'Team Members',
    subtitle: '24 active members in your organization',
    actions: [
      {
        label: 'Import',
        variant: 'outline',
        onClick: () => console.log('Import clicked'),
      },
      {
        label: 'Invite',
        variant: 'primary',
        onClick: () => console.log('Invite clicked'),
      },
    ],
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Settings',
    titleIcon: '⚙️',
    subtitle: 'Configure your account preferences',
    actions: [
      {
        label: 'Save Changes',
        variant: 'primary',
        onClick: () => console.log('Save clicked'),
      },
    ],
  },
};

export const Minimal: Story = {
  args: {
    title: 'Simple Section',
  },
};
