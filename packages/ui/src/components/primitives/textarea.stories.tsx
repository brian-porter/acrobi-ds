import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './textarea';
import { useState } from 'react';

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
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
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'This is some sample text in the textarea.',
    placeholder: 'Enter your message...',
  },
};

export const WithHelperText: Story = {
  args: {
    placeholder: 'Describe your issue...',
    helperText: 'Please provide as much detail as possible',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter required information...',
    error: 'This field is required',
    variant: 'error',
  },
};

export const Success: Story = {
  args: {
    value: 'Thank you for your detailed feedback!',
    variant: 'success',
    helperText: 'Message looks good',
  },
};

export const WithCharacterCount: Story = {
  args: {
    placeholder: 'Write your review (max 280 characters)...',
    showCount: true,
    maxLength: 280,
    helperText: 'Share your thoughts about this product',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small textarea...',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large textarea for longer content...',
  },
};

export const ResizeNone: Story = {
  args: {
    resize: 'none',
    placeholder: 'This textarea cannot be resized...',
    helperText: 'Resize is disabled',
  },
};

export const ResizeHorizontal: Story = {
  args: {
    resize: 'horizontal',
    placeholder: 'This textarea can be resized horizontally...',
    helperText: 'Try dragging the bottom-right corner horizontally',
  },
};

export const ResizeBoth: Story = {
  args: {
    resize: 'both',
    placeholder: 'This textarea can be resized in both directions...',
    helperText: 'Try dragging the bottom-right corner',
  },
};

export const Disabled: Story = {
  args: {
    value: 'This textarea is disabled',
    disabled: true,
    helperText: 'This field cannot be edited',
  },
};

export const ReadOnly: Story = {
  args: {
    value: 'This content is read-only and cannot be modified.',
    readOnly: true,
    helperText: 'Read-only content',
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [charCount, setCharCount] = useState(0);
    const maxLength = 200;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      setCharCount(newValue.length);
    };

    return (
      <Textarea
        value={value}
        onChange={handleChange}
        placeholder='Start typing to see character count...'
        showCount={true}
        maxLength={maxLength}
        helperText='Interactive character counting'
        error={charCount > maxLength ? 'Character limit exceeded' : undefined}
      />
    );
  },
};

export const ContactForm: Story = {
  render: () => {
    const [message, setMessage] = useState('');

    return (
      <div className='space-y-4'>
        <div>
          <label className='text-sm font-medium'>Message *</label>
          <Textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder='Please describe your inquiry in detail...'
            showCount={true}
            maxLength={500}
            error={message.length === 0 ? 'Message is required' : undefined}
            helperText='Tell us how we can help you'
          />
        </div>

        <div className='text-xs text-muted-foreground'>
          Characters used: {message.length}/500
        </div>
      </div>
    );
  },
};

export const FeedbackForm: Story = {
  render: () => {
    const [feedback, setFeedback] = useState(
      'Great product! Really enjoying the new features.'
    );

    return (
      <div className='space-y-2'>
        <label htmlFor='feedback' className='text-sm font-medium'>
          Your Feedback
        </label>
        <Textarea
          id='feedback'
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          variant='success'
          size='lg'
          resize='vertical'
          helperText='Thank you for taking the time to share your thoughts'
        />
      </div>
    );
  },
};
