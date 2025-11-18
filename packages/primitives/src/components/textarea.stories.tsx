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
    warningThreshold: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Warning threshold as a percentage (0-1)',
    },
    errorThreshold: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Error threshold as a percentage (0-1)',
    },
    showCounterFeedback: {
      control: { type: 'boolean' },
      description: 'Show visual feedback indicators for character count status',
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

export const CharacterCounterWarning: Story = {
  args: {
    value: 'This is a long message that will demonstrate the warning state when approaching the character limit. We need to write enough text to trigger the warning threshold.',
    placeholder: 'Enter your message...',
    showCount: true,
    maxLength: 200,
    warningThreshold: 0.8,
    showCounterFeedback: true,
    helperText: 'Warning threshold set to 80%',
  },
};

export const CharacterCounterError: Story = {
  args: {
    value: 'This is a very long message that exceeds the maximum character limit to demonstrate the error state. This text is intentionally longer than the allowed 150 characters to show how the component handles overflow situations with visual feedback.',
    placeholder: 'Enter your message...',
    showCount: true,
    maxLength: 150,
    errorThreshold: 1.0,
    showCounterFeedback: true,
    helperText: 'Character limit exceeded',
    variant: 'error',
  },
};

export const CustomThresholds: Story = {
  args: {
    placeholder: 'Custom warning at 70%, error at 90%...',
    showCount: true,
    maxLength: 100,
    warningThreshold: 0.7,
    errorThreshold: 0.9,
    showCounterFeedback: true,
    helperText: 'Custom thresholds: Warning at 70%, Error at 90%',
  },
};

export const CounterWithoutFeedback: Story = {
  args: {
    value: 'This textarea shows character count but no visual feedback indicators.',
    placeholder: 'No visual feedback...',
    showCount: true,
    maxLength: 100,
    showCounterFeedback: false,
    helperText: 'Character counter without visual feedback',
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
    const maxLength = 200;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    };

    return (
      <Textarea
        value={value}
        onChange={handleChange}
        placeholder='Start typing to see enhanced character counting...'
        showCount={true}
        maxLength={maxLength}
        warningThreshold={0.8}
        errorThreshold={1.0}
        showCounterFeedback={true}
        helperText='Interactive enhanced character counting with visual feedback'
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
            warningThreshold={0.8}
            showCounterFeedback={true}
            error={message.length === 0 ? 'Message is required' : undefined}
            helperText='Tell us how we can help you'
          />
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
          showCount={true}
          maxLength={1000}
          warningThreshold={0.8}
          showCounterFeedback={true}
          helperText='Thank you for taking the time to share your thoughts'
        />
      </div>
    );
  },
};

export const AccessibilityDemo: Story = {
  render: () => {
    const [content, setContent] = useState('');

    return (
      <div className='space-y-4'>
        <div>
          <label htmlFor='accessible-textarea' className='text-sm font-medium'>
            Accessible Textarea with Enhanced Character Counter
          </label>
          <p className='text-xs text-muted-foreground mt-1 mb-2'>
            This textarea demonstrates enhanced accessibility features including ARIA live regions for character count announcements.
          </p>
          <Textarea
            id='accessible-textarea'
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder='Type to hear character count updates...'
            showCount={true}
            maxLength={250}
            warningThreshold={0.75}
            errorThreshold={1.0}
            showCounterFeedback={true}
            helperText='Screen readers will announce character count status changes'
            aria-describedby='textarea-help'
          />
          <p id='textarea-help' className='text-xs text-muted-foreground mt-2'>
            Character count and status changes are announced to screen readers via ARIA live regions.
          </p>
        </div>
      </div>
    );
  },
};
