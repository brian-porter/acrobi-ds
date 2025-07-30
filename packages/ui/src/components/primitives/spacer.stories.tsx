import type { Meta, StoryObj } from '@storybook/react';
import { Spacer } from './spacer';

const meta: Meta<typeof Spacer> = {
  title: 'Primitives/Spacer',
  component: Spacer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    axis: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spacer>;

export const Vertical: Story = {
  args: {
    axis: 'vertical',
    size: 'md',
  },
  render: args => (
    <div className='border border-dashed border-gray-300 p-4'>
      <div className='bg-primary text-primary-foreground p-2 rounded'>
        Above
      </div>
      <Spacer {...args} />
      <div className='bg-secondary text-secondary-foreground p-2 rounded'>
        Below
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    axis: 'horizontal',
    size: 'md',
  },
  render: args => (
    <div className='border border-dashed border-gray-300 p-4 flex items-center'>
      <div className='bg-primary text-primary-foreground p-2 rounded'>Left</div>
      <Spacer {...args} />
      <div className='bg-secondary text-secondary-foreground p-2 rounded'>
        Right
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className='space-y-4'>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const).map(
        size => (
          <div key={size} className='border border-dashed border-gray-300 p-4'>
            <div className='text-sm text-muted-foreground mb-2'>
              Size: {size}
            </div>
            <div className='bg-primary text-primary-foreground p-2 rounded inline-block'>
              Above
            </div>
            <Spacer axis='vertical' size={size} />
            <div className='bg-secondary text-secondary-foreground p-2 rounded inline-block'>
              Below
            </div>
          </div>
        )
      )}
    </div>
  ),
};
