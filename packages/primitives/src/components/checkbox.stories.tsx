import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Checkbox component with Acrobi Design System styling. Supports various alignments, labels, links, and feedback states. Features authentic form input styling with data attribute control.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: { type: 'select' },
      options: ['l', 'c', 'r'],
      description: 'Checkbox alignment using Acrobi alignment system',
    },
    itemLabelText: {
      control: { type: 'text' },
      description: 'Checkbox label text',
    },
    itemLabelSize: {
      control: { type: 'select' },
      options: ['r4', 'r3', 'r2', 'r1', 'h5', 'h4', 'h3', 'h2', 'h1'],
      description: 'Label text size using Acrobi typography system',
    },
    itemActive: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is checked',
    },
    showText: {
      control: { type: 'boolean' },
      description: 'Show label text',
    },
    showLink: {
      control: { type: 'boolean' },
      description: 'Show associated link',
    },
    showFeedback: {
      control: { type: 'boolean' },
      description: 'Show feedback message',
    },
    feedbackColor: {
      control: { type: 'select' },
      options: ['fd500', 'fw500', 'f500', 'p500', 'n500'],
      description: 'Feedback message color',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Accept terms and conditions',
    checked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Enable notifications',
    description: 'Receive email notifications about updates and changes.',
    checked: false,
  },
};

export const WithError: Story = {
  args: {
    label: 'Required field',
    error: 'This field is required',
    variant: 'error',
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    checked: true,
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small checkbox',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large checkbox',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='space-y-4'>
      <Checkbox size='sm' label='Small checkbox' />
      <Checkbox size='md' label='Medium checkbox (default)' />
      <Checkbox size='lg' label='Large checkbox' />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        label='Interactive checkbox'
        description='Click to toggle state'
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};

export const Group: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const items = [
      { id: 'item1', label: 'Newsletter subscription' },
      { id: 'item2', label: 'Marketing emails' },
      { id: 'item3', label: 'Product updates' },
    ];

    const handleItemChange = (itemId: string, checked: boolean) => {
      if (checked) {
        setSelectedItems(prev => [...prev, itemId]);
      } else {
        setSelectedItems(prev => prev.filter(id => id !== itemId));
      }
    };

    return (
      <div className='space-y-3'>
        <h3 className='font-medium'>Email preferences</h3>
        {items.map(item => (
          <Checkbox
            key={item.id}
            label={item.label}
            checked={selectedItems.includes(item.id)}
            onCheckedChange={checked => handleItemChange(item.id, checked)}
          />
        ))}
      </div>
    );
  },
};

export const WithSelectAll: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const items = [
      { id: 'read', label: 'Read access' },
      { id: 'write', label: 'Write access' },
      { id: 'delete', label: 'Delete access' },
    ];

    const allSelected = selectedItems.length === items.length;
    const someSelected =
      selectedItems.length > 0 && selectedItems.length < items.length;

    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        setSelectedItems(items.map(item => item.id));
      } else {
        setSelectedItems([]);
      }
    };

    const handleItemChange = (itemId: string, checked: boolean) => {
      if (checked) {
        setSelectedItems(prev => [...prev, itemId]);
      } else {
        setSelectedItems(prev => prev.filter(id => id !== itemId));
      }
    };

    return (
      <div className='space-y-3'>
        <Checkbox
          label='Select all permissions'
          checked={allSelected}
          indeterminate={someSelected}
          onCheckedChange={handleSelectAll}
        />
        <div className='ml-6 space-y-2'>
          {items.map(item => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={selectedItems.includes(item.id)}
              onCheckedChange={checked => handleItemChange(item.id, checked)}
            />
          ))}
        </div>
      </div>
    );
  },
};
