import type { Meta, StoryObj } from '@storybook/react';
import { BtnPanel } from './btn-panel';

const meta: Meta<typeof BtnPanel> = {
  title: 'Structures/BtnPanel',
  component: BtnPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Panel of buttons with flexible layout and styling options.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['default', 'full', 'centered'],
    },
    spacing: {
      control: 'select',
      options: ['tight', 'default', 'loose'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BtnPanel>;

const defaultButtons = [
  {
    label: 'Primary Action',
    variant: 'default' as const,
    onClick: () => console.log('Primary clicked'),
  },
  {
    label: 'Secondary',
    variant: 'outline' as const,
    onClick: () => console.log('Secondary clicked'),
  },
];

const actionButtons = [
  {
    label: 'Save',
    variant: 'default' as const,
    onClick: () => console.log('Save clicked'),
  },
  {
    label: 'Cancel',
    variant: 'outline' as const,
    onClick: () => console.log('Cancel clicked'),
  },
  {
    label: 'Delete',
    variant: 'destructive' as const,
    onClick: () => console.log('Delete clicked'),
  },
];

export const Horizontal: Story = {
  args: {
    buttons: defaultButtons,
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    buttons: defaultButtons,
    orientation: 'vertical',
  },
};

export const FullWidth: Story = {
  args: {
    buttons: defaultButtons,
    orientation: 'vertical',
    variant: 'full',
  },
};

export const Centered: Story = {
  args: {
    buttons: defaultButtons,
    orientation: 'horizontal',
    variant: 'centered',
  },
};

export const ThreeButtons: Story = {
  args: {
    buttons: actionButtons,
    orientation: 'horizontal',
  },
};

export const VerticalActions: Story = {
  args: {
    buttons: actionButtons,
    orientation: 'vertical',
    variant: 'full',
  },
};

export const WithLoading: Story = {
  args: {
    buttons: [
      {
        label: 'Loading...',
        variant: 'default' as const,
        loading: true,
        disabled: true,
      },
      {
        label: 'Cancel',
        variant: 'outline' as const,
        onClick: () => console.log('Cancel clicked'),
      },
    ],
    orientation: 'horizontal',
  },
};
