import type { Meta, StoryObj } from '@storybook/react-vite';
import { OlBtn } from './ol-btn';

const meta: Meta<typeof OlBtn> = {
  title: 'Primitives/OlBtn',
  component: OlBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='relative w-80 h-60 bg-gray-100 border border-gray-300 rounded-lg p-4'>
        <p className='text-sm text-gray-600 mb-4'>
          Overlay buttons are positioned relative to their container.
        </p>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    btn: {
      control: { type: 'boolean' },
      description: 'Button visibility toggle',
    },
    btnIcn: {
      control: { type: 'boolean' },
      description: 'Show button icon',
    },
    btnTxt: {
      control: { type: 'boolean' },
      description: 'Show button text',
    },
    btnIcnSrc: {
      control: { type: 'text' },
      description: 'Button icon source',
    },
    btnTxtSrc: {
      control: { type: 'text' },
      description: 'Button text source',
    },
    btnSz: {
      control: { type: 'select' },
      options: ['s', 'm', 'l', 'xl'],
      description: 'Button size',
    },
    btnStyl: {
      control: { type: 'select' },
      options: ['pf', 'outline', 'ghost', 'text'],
      description: 'Button style',
    },
    btnLoc: {
      control: { type: 'select' },
      options: ['tl', 'tr', 'bl', 'br', 'tc', 'bc', 'ml', 'mr'],
      description: 'Button location/position',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'ghost', 'separated'],
      description: 'Overlay button variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    btn: true,
    btnIcn: true,
    btnTxt: false,
    btnIcnSrc: 'edit',
    btnTxtSrc: 'Edit',
    btnSz: 'l',
    btnStyl: 'pf',
    btnLoc: 'br',
  },
};

export const WithText: Story = {
  args: {
    btn: true,
    btnIcn: true,
    btnTxt: true,
    btnIcnSrc: 'add',
    btnTxtSrc: 'Add Item',
    btnSz: 'l',
    btnStyl: 'pf',
    btnLoc: 'br',
  },
};

export const IconOnly: Story = {
  args: {
    btn: true,
    btnIcn: true,
    btnTxt: false,
    btnIcnSrc: 'settings',
    btnTxtSrc: 'Settings',
    btnSz: 'm',
    btnStyl: 'pf',
    btnLoc: 'tr',
  },
};

export const TextOnly: Story = {
  args: {
    btn: true,
    btnIcn: false,
    btnTxt: true,
    btnIcnSrc: 'default',
    btnTxtSrc: 'Save Changes',
    btnSz: 'l',
    btnStyl: 'pf',
    btnLoc: 'bc',
  },
};

export const Positions: Story = {
  render: () => (
    <div className='relative w-full h-full'>
      {/* Top positions */}
      <OlBtn btnIcnSrc='notification' btnLoc='tl' btnSz='s' btnStyl='pf' />
      <OlBtn btnIcnSrc='search' btnLoc='tc' btnSz='s' btnStyl='pf' />
      <OlBtn btnIcnSrc='user' btnLoc='tr' btnSz='s' btnStyl='pf' />

      {/* Middle positions */}
      <OlBtn btnIcnSrc='menu' btnLoc='ml' btnSz='s' btnStyl='pf' />
      <OlBtn btnIcnSrc='close' btnLoc='mr' btnSz='s' btnStyl='pf' />

      {/* Bottom positions */}
      <OlBtn btnIcnSrc='like' btnLoc='bl' btnSz='s' btnStyl='pf' />
      <OlBtn btnIcnSrc='share' btnLoc='bc' btnSz='s' btnStyl='pf' />
      <OlBtn btnIcnSrc='bookmark' btnLoc='br' btnSz='s' btnStyl='pf' />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-8'>
      <div className='relative w-20 h-20 bg-gray-100 border border-gray-300 rounded'>
        <OlBtn btnIcnSrc='star' btnSz='s' btnLoc='br' />
      </div>
      <div className='relative w-24 h-24 bg-gray-100 border border-gray-300 rounded'>
        <OlBtn btnIcnSrc='star' btnSz='m' btnLoc='br' />
      </div>
      <div className='relative w-28 h-28 bg-gray-100 border border-gray-300 rounded'>
        <OlBtn btnIcnSrc='star' btnSz='l' btnLoc='br' />
      </div>
      <div className='relative w-32 h-32 bg-gray-100 border border-gray-300 rounded'>
        <OlBtn btnIcnSrc='star' btnSz='xl' btnLoc='br' />
      </div>
    </div>
  ),
};

export const Styles: Story = {
  render: () => (
    <div className='flex items-center gap-8'>
      <div className='relative w-24 h-24 bg-gray-100 border border-gray-300 rounded'>
        <OlBtn
          btnIcnSrc='heart'
          btnTxtSrc='Primary'
          btnTxt={true}
          btnStyl='pf'
          btnLoc='br'
        />
      </div>
      <div className='relative w-24 h-24 bg-gray-100 border border-gray-300 rounded'>
        <OlBtn
          btnIcnSrc='heart'
          btnTxtSrc='Outline'
          btnTxt={true}
          btnStyl='outline'
          btnLoc='br'
        />
      </div>
      <div className='relative w-24 h-24 bg-gray-100 border border-gray-300 rounded'>
        <OlBtn
          btnIcnSrc='heart'
          btnTxtSrc='Ghost'
          btnTxt={true}
          btnStyl='ghost'
          btnLoc='br'
        />
      </div>
      <div className='relative w-24 h-24 bg-gray-100 border border-gray-300 rounded'>
        <OlBtn
          btnIcnSrc='heart'
          btnTxtSrc='Text'
          btnTxt={true}
          btnStyl='text'
          btnLoc='br'
        />
      </div>
    </div>
  ),
};

export const FloatingActionButton: Story = {
  render: () => (
    <div className='relative w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg'>
      <div className='p-6'>
        <h3 className='text-lg font-semibold text-gray-800 mb-2'>
          Content Area
        </h3>
        <p className='text-gray-600 mb-4'>
          This represents a content area where the floating action button
          provides quick access to primary actions.
        </p>
        <div className='space-y-2'>
          <div className='h-4 bg-gray-200 rounded w-3/4'></div>
          <div className='h-4 bg-gray-200 rounded w-1/2'></div>
          <div className='h-4 bg-gray-200 rounded w-2/3'></div>
        </div>
      </div>

      {/* Primary FAB */}
      <OlBtn btnIcnSrc='add' btnSz='l' btnStyl='pf' btnLoc='br' />

      {/* Secondary actions */}
      <OlBtn btnIcnSrc='edit' btnSz='m' btnStyl='outline' btnLoc='tr' />
    </div>
  ),
};

export const MediaControls: Story = {
  render: () => (
    <div className='relative w-full h-full bg-black rounded-lg overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
      <div className='p-4 text-white'>
        <h3 className='text-lg font-semibold mb-1'>Video Title</h3>
        <p className='text-sm text-gray-300'>
          Playing video content with overlay controls
        </p>
      </div>

      {/* Play/Pause */}
      <OlBtn btnIcnSrc='play' btnSz='xl' btnStyl='pf' btnLoc='bc' />

      {/* Settings */}
      <OlBtn btnIcnSrc='settings' btnSz='m' btnStyl='ghost' btnLoc='tr' />

      {/* Full screen */}
      <OlBtn btnIcnSrc='fullscreen' btnSz='m' btnStyl='ghost' btnLoc='br' />

      {/* Volume */}
      <OlBtn btnIcnSrc='volume' btnSz='m' btnStyl='ghost' btnLoc='bl' />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const handleAction = (action: string) => {
      console.log(`Overlay button action: ${action}`);
    };

    return (
      <div className='space-y-4'>
        <p className='text-sm text-gray-600'>
          Open the browser console to see button interactions.
        </p>

        <div className='relative w-full h-32 bg-gray-50 border border-gray-300 rounded-lg'>
          <div className='p-4'>
            <h4 className='font-medium text-gray-800'>Interactive Card</h4>
            <p className='text-sm text-gray-600'>
              Click the overlay buttons to see actions.
            </p>
          </div>

          <OlBtn
            btnIcnSrc='like'
            btnSz='m'
            btnStyl='pf'
            btnLoc='tr'
            btnClick={{ onClick: () => handleAction('like') }}
          />

          <OlBtn
            btnIcnSrc='share'
            btnSz='m'
            btnStyl='outline'
            btnLoc='br'
            btnClick={{ onClick: () => handleAction('share') }}
          />

          <OlBtn
            btnIcnSrc='bookmark'
            btnSz='m'
            btnStyl='ghost'
            btnLoc='bl'
            btnClick={{ onClick: () => handleAction('bookmark') }}
          />
        </div>
      </div>
    );
  },
};
