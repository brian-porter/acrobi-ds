import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

// Temporary mock component while we fix TipTap dependencies
const TextEditor = ({
  mode,
  content,
  onContentChange,
  placeholder,
  className,
  ...props
}: any) => (
  <div className={`border rounded-lg p-4 ${className || ''}`}>
    <div className='text-sm text-muted-foreground mb-2'>
      TextEditor ({mode} mode) - TipTap dependencies loading...
    </div>
    <textarea
      className='w-full min-h-[200px] p-3 border rounded resize-none'
      placeholder={placeholder}
      value={content?.replace(/<[^>]*>/g, '') || ''}
      onChange={e => onContentChange?.(e.target.value)}
      {...props}
    />
  </div>
);

const meta: Meta<typeof TextEditor> = {
  title: 'Modules/TextEditor',
  component: TextEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['simple', 'rich', 'full'],
    },
  },
  decorators: [
    Story => (
      <div className='w-full max-w-4xl'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleContent = `
<h1>Welcome to the Rich Text Editor</h1>
<p>This is a sample document with <strong>bold text</strong>, <em>italic text</em>, and <u>underlined text</u>.</p>
<h2>Features</h2>
<ul>
  <li>Rich text formatting</li>
  <li>Color customization</li>
  <li>Emoji support 😊</li>
  <li>Multiple editor modes</li>
</ul>
<blockquote>
  "The best way to predict the future is to create it." - Peter Drucker
</blockquote>
`.trim();

export const SimpleMode: Story = {
  render: args => {
    const [content, setContent] = useState('<p>Type something here...</p>');

    return (
      <TextEditor
        {...args}
        mode='simple'
        content={content}
        onContentChange={setContent}
        placeholder='Start typing...'
      />
    );
  },
};

export const RichMode: Story = {
  render: args => {
    const [content, setContent] = useState(sampleContent);

    return (
      <TextEditor
        {...args}
        mode='rich'
        content={content}
        onContentChange={setContent}
        placeholder='Create rich content...'
      />
    );
  },
};

export const FullMode: Story = {
  render: args => {
    const [content, setContent] = useState(sampleContent);

    return (
      <TextEditor
        {...args}
        mode='full'
        content={content}
        onContentChange={setContent}
        placeholder='Full editor experience...'
      />
    );
  },
};

export const EmptyEditor: Story = {
  render: args => {
    const [content, setContent] = useState('');

    return (
      <TextEditor
        {...args}
        mode='rich'
        content={content}
        onContentChange={setContent}
        placeholder='Start creating amazing content...'
      />
    );
  },
};

export const ReadOnlyMode: Story = {
  args: {
    mode: 'rich',
    content: sampleContent,
    readOnly: true,
    onContentChange: () => {},
  },
};

export const CustomPlaceholder: Story = {
  render: args => {
    const [content, setContent] = useState('');

    return (
      <TextEditor
        {...args}
        mode='rich'
        content={content}
        onContentChange={setContent}
        placeholder='✨ Share your thoughts with the world...'
      />
    );
  },
};

export const MinimalHeight: Story = {
  render: args => {
    const [content, setContent] = useState('<p>Compact editor</p>');

    return (
      <div className='space-y-4'>
        <h3>Compact Editor</h3>
        <TextEditor
          {...args}
          mode='simple'
          content={content}
          onContentChange={setContent}
          className='min-h-[100px]'
        />
      </div>
    );
  },
};

export const MaxHeight: Story = {
  render: args => {
    const longContent = `
<h1>Long Document</h1>
${Array.from({ length: 20 }, (_, i) => `<p>This is paragraph ${i + 1} of a very long document that will test the max height and scrolling functionality of the editor.</p>`).join('')}
    `.trim();

    const [content, setContent] = useState(longContent);

    return (
      <div className='space-y-4'>
        <h3>Scrollable Editor (Max Height)</h3>
        <TextEditor
          {...args}
          mode='rich'
          content={content}
          onContentChange={setContent}
          className='max-h-[400px] overflow-auto'
        />
      </div>
    );
  },
};

export const BlogPost: Story = {
  render: args => {
    const blogContent = `
<h1>My First Blog Post</h1>
<p><em>Published on ${new Date().toLocaleDateString()}</em></p>
<p>Welcome to my new blog! I'm excited to share my thoughts and experiences with you.</p>
<h2>What You Can Expect</h2>
<ul>
  <li>Technical tutorials and tips</li>
  <li>Personal reflections on technology</li>
  <li>Product reviews and recommendations</li>
</ul>
<p>Thanks for reading, and don't forget to subscribe! 🚀</p>
    `.trim();

    const [content, setContent] = useState(blogContent);

    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3>Blog Post Editor</h3>
          <div className='flex gap-2'>
            <button className='px-3 py-1 text-sm bg-secondary rounded'>
              Save Draft
            </button>
            <button className='px-3 py-1 text-sm bg-primary text-primary-foreground rounded'>
              Publish
            </button>
          </div>
        </div>
        <TextEditor
          {...args}
          mode='rich'
          content={content}
          onContentChange={setContent}
          placeholder='Write your blog post...'
        />
      </div>
    );
  },
};

export const CommentEditor: Story = {
  render: args => {
    const [content, setContent] = useState('');

    return (
      <div className='space-y-4'>
        <h3>Comment Thread</h3>
        <div className='bg-muted p-4 rounded'>
          <p>
            <strong>@johndoe</strong>: Great article! Really helpful
            information.
          </p>
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Reply to comment</label>
          <TextEditor
            {...args}
            mode='simple'
            content={content}
            onContentChange={setContent}
            placeholder='Write a reply...'
            className='min-h-[80px]'
          />
          <div className='flex justify-end gap-2'>
            <button className='px-3 py-1 text-sm bg-secondary rounded'>
              Cancel
            </button>
            <button className='px-3 py-1 text-sm bg-primary text-primary-foreground rounded'>
              Reply
            </button>
          </div>
        </div>
      </div>
    );
  },
};
