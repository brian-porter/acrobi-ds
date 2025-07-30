import type { Meta, StoryObj } from '@storybook/react';
import { BannerStructure } from './banner';

const meta: Meta<typeof BannerStructure> = {
  title: 'Structures/Banner',
  component: BannerStructure,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Banner overlay component with flexible positioning, sizing, and theming options. Banners can be positioned in different locations and support dismissible functionality.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: 'Banner size affecting height and padding',
    },
    color: {
      control: 'select',
      options: ['n', 'p', 'success', 'warning', 'error'],
      description: 'Banner color theme',
    },
    location: {
      control: 'select',
      options: ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br'],
      description:
        'Banner position on screen (top/middle/bottom + left/center/right)',
    },
    visible: {
      control: 'boolean',
      description: 'Show or hide the banner',
    },
    dismissible: {
      control: 'boolean',
      description: 'Allow banner to be dismissed with close button',
    },
    iconName: {
      control: 'text',
      description: 'Icon name from BQ-Icons font',
    },
    text: {
      control: 'text',
      description: 'Banner message text',
    },
    position: {
      control: 'select',
      options: ['inline', 'sticky', 'fixed'],
      description: 'Banner positioning method',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BannerStructure>;

// Size Variants
export const Small: Story = {
  args: {
    size: 's',
    text: 'Small banner with compact sizing',
    iconName: 'info',
    color: 'n',
    location: 'bl',
  },
};

export const Medium: Story = {
  args: {
    size: 'm',
    text: 'Medium banner with default sizing',
    iconName: 'info',
    color: 'n',
    location: 'bl',
  },
};

export const Large: Story = {
  args: {
    size: 'l',
    text: 'Large banner with expanded sizing',
    iconName: 'info',
    color: 'n',
    location: 'bl',
  },
};

// Color Variants
export const Neutral: Story = {
  args: {
    size: 'm',
    text: 'Neutral banner message',
    iconName: 'info',
    color: 'n',
    location: 'bl',
  },
};

export const Primary: Story = {
  args: {
    size: 'm',
    text: 'Primary action or information',
    iconName: 'star',
    color: 'p',
    location: 'bl',
  },
};

export const Success: Story = {
  args: {
    size: 'm',
    text: 'Operation completed successfully',
    iconName: 'check',
    color: 'success',
    location: 'bl',
  },
};

export const Warning: Story = {
  args: {
    size: 'm',
    text: 'Warning: please review this action',
    iconName: 'warning',
    color: 'warning',
    location: 'bl',
  },
};

export const Error: Story = {
  args: {
    size: 'm',
    text: 'Error: operation failed',
    iconName: 'error',
    color: 'error',
    location: 'bl',
  },
};

// Location Variants
export const TopLeft: Story = {
  args: {
    size: 'm',
    text: 'Top Left positioned banner',
    iconName: 'info',
    color: 'p',
    location: 'tl',
  },
};

export const TopCenter: Story = {
  args: {
    size: 'm',
    text: 'Top Center positioned banner',
    iconName: 'info',
    color: 'p',
    location: 'tc',
  },
};

export const TopRight: Story = {
  args: {
    size: 'm',
    text: 'Top Right positioned banner',
    iconName: 'info',
    color: 'p',
    location: 'tr',
  },
};

export const MiddleLeft: Story = {
  args: {
    size: 'm',
    text: 'Middle Left positioned banner',
    iconName: 'info',
    color: 'p',
    location: 'ml',
  },
};

export const MiddleCenter: Story = {
  args: {
    size: 'm',
    text: 'Middle Center positioned banner',
    iconName: 'info',
    color: 'p',
    location: 'mc',
  },
};

export const MiddleRight: Story = {
  args: {
    size: 'm',
    text: 'Middle Right positioned banner',
    iconName: 'info',
    color: 'p',
    location: 'mr',
  },
};

export const BottomLeft: Story = {
  args: {
    size: 'm',
    text: 'Bottom Left positioned banner',
    iconName: 'info',
    color: 'p',
    location: 'bl',
  },
};

export const BottomCenter: Story = {
  args: {
    size: 'm',
    text: 'Bottom Center positioned banner',
    iconName: 'info',
    color: 'p',
    location: 'bc',
  },
};

export const BottomRight: Story = {
  args: {
    size: 'm',
    text: 'Bottom Right positioned banner',
    iconName: 'info',
    color: 'p',
    location: 'br',
  },
};

// Dismissible Functionality
export const Dismissible: Story = {
  args: {
    size: 'm',
    text: 'Click the X to dismiss this banner',
    iconName: 'info',
    color: 'p',
    location: 'bl',
    dismissible: true,
    onDismiss: () => alert('Banner dismissed!'),
  },
};

export const DismissibleWithoutIcon: Story = {
  args: {
    size: 'm',
    text: 'Dismissible banner without primary icon',
    color: 'warning',
    location: 'tc',
    dismissible: true,
    onDismiss: () => alert('Banner dismissed!'),
  },
};

// Position Variants
export const InlinePosition: Story = {
  args: {
    size: 'm',
    text: 'Inline positioned banner',
    iconName: 'info',
    color: 'n',
    location: 'bl',
    position: 'inline',
  },
};

export const StickyPosition: Story = {
  args: {
    size: 'm',
    text: 'Sticky positioned banner',
    iconName: 'info',
    color: 'warning',
    location: 'tc',
    position: 'sticky',
  },
};

export const FixedPosition: Story = {
  args: {
    size: 'm',
    text: 'Fixed positioned banner',
    iconName: 'info',
    color: 'success',
    location: 'tr',
    position: 'fixed',
  },
};

// Complex Examples
export const LongMessage: Story = {
  args: {
    size: 'l',
    text: 'This is a longer banner message that demonstrates how the component handles extended text content while maintaining proper layout and readability.',
    iconName: 'info',
    color: 'p',
    location: 'bc',
    dismissible: true,
  },
};

export const MinimalBanner: Story = {
  args: {
    size: 's',
    text: 'Minimal',
    color: 'n',
    location: 'br',
  },
};

// Showcase all variants in one view
export const AllSizes: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='text-lg font-semibold'>Banner Sizes</div>
      <BannerStructure
        size='s'
        text='Small Banner'
        iconName='info'
        color='n'
        location='bl'
      />
      <BannerStructure
        size='m'
        text='Medium Banner'
        iconName='info'
        color='n'
        location='bl'
      />
      <BannerStructure
        size='l'
        text='Large Banner'
        iconName='info'
        color='n'
        location='bl'
      />
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='text-lg font-semibold'>Banner Colors</div>
      <BannerStructure
        size='m'
        text='Neutral Color'
        iconName='info'
        color='n'
        location='bl'
      />
      <BannerStructure
        size='m'
        text='Primary Color'
        iconName='star'
        color='p'
        location='bl'
      />
      <BannerStructure
        size='m'
        text='Success Color'
        iconName='check'
        color='success'
        location='bl'
      />
      <BannerStructure
        size='m'
        text='Warning Color'
        iconName='warning'
        color='warning'
        location='bl'
      />
      <BannerStructure
        size='m'
        text='Error Color'
        iconName='error'
        color='error'
        location='bl'
      />
    </div>
  ),
};

// Backward Compatibility Examples (using deprecated props)
export const BackwardCompatible: Story = {
  name: 'Backward Compatible (Deprecated Props)',
  args: {
    // Using deprecated props to ensure backward compatibility
    bnr: true,
    bnrTxtSrc: 'Using deprecated props',
    bnrIcnSrc: 'warning',
    bnrSz: 'm',
    bnrLoc: 'tc',
    bnrClr: 'warning',
  },
};
