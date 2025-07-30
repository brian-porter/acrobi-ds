import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputWBtns } from './input-w-btns';

const meta: Meta<typeof InputWBtns> = {
  title: 'Structures/InputWBtns',
  component: InputWBtns,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='w-96'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchWithButton: Story = {
  args: {
    placeholder: 'Search...',
    buttons: [
      {
        children: '🔍',
        variant: 'default',
        onClick: () => console.log('Search clicked'),
      },
    ],
  },
};

export const EmailSubscription: Story = {
  args: {
    placeholder: 'Enter your email...',
    buttons: [
      {
        children: 'Subscribe',
        variant: 'primary',
        onClick: () => console.log('Subscribe clicked'),
      },
    ],
  },
};

export const MultipleActions: Story = {
  args: {
    placeholder: 'Enter message...',
    buttons: [
      {
        children: '📎',
        variant: 'ghost',
        size: 'sm',
        onClick: () => console.log('Attach clicked'),
      },
      {
        children: 'Send',
        variant: 'primary',
        onClick: () => console.log('Send clicked'),
      },
    ],
  },
};

export const CopyField: Story = {
  args: {
    value: 'https://example.com/shared-link-123456',
    readOnly: true,
    buttons: [
      {
        children: 'Copy',
        variant: 'outline',
        onClick: () => console.log('Copy clicked'),
      },
    ],
  },
};

export const WithClearButton: Story = {
  args: {
    value: 'Some text to clear',
    placeholder: 'Type something...',
    buttons: [
      {
        children: '✕',
        variant: 'ghost',
        size: 'sm',
        onClick: () => console.log('Clear clicked'),
      },
    ],
  },
};
