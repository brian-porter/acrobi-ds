import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chiclet } from './chiclet';

const meta: Meta<typeof Chiclet> = {
  title: 'Primitives/Chiclet',
  component: Chiclet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='flex flex-wrap gap-4 p-4'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    chiclet: {
      control: { type: 'boolean' },
      description: 'Chiclet visibility toggle',
    },
    lbl: {
      control: { type: 'boolean' },
      description: 'Show label',
    },
    chicSz: {
      control: { type: 'select' },
      options: ['s', 'm', 'l', 'xl'],
      description: 'Chiclet size',
    },
    chicStyl: {
      control: { type: 'select' },
      options: ['nl', 'outlined', 'filled'],
      description: 'Chiclet style',
    },
    lblIcn: {
      control: { type: 'boolean' },
      description: 'Show label icon',
    },
    lblTxt: {
      control: { type: 'boolean' },
      description: 'Show label text',
    },
    lblIcnSrc: {
      control: { type: 'text' },
      description: 'Label icon source',
    },
    lblTxtSrc: {
      control: { type: 'text' },
      description: 'Label text source',
    },
    lblSz: {
      control: { type: 'select' },
      options: ['r4', 'r3', 'r2', 'r1', 'h5', 'h4', 'h3', 'h2', 'h1'],
      description: 'Label size',
    },
    lblClr: {
      control: { type: 'select' },
      options: [
        'fd500',
        'fw500',
        'f500',
        'p500',
        'n500',
        'n300',
        'n700',
        'n999',
        'inherit',
        'in',
      ],
      description: 'Label color',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'ghost', 'separated'],
      description: 'Chiclet variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chiclet: true,
    lbl: true,
    lblIcn: true,
    lblTxt: false,
    lblIcnSrc: 'Nav_left',
    lblTxtSrc: '',
    chicSz: 'l',
    chicStyl: 'nl',
    lblSz: 'r3',
    lblClr: 'n700',
  },
};

export const WithText: Story = {
  args: {
    chiclet: true,
    lbl: true,
    lblIcn: true,
    lblTxt: true,
    lblIcnSrc: 'home',
    lblTxtSrc: 'Home',
    chicSz: 'l',
    chicStyl: 'nl',
    lblSz: 'r3',
    lblClr: 'n700',
  },
};

export const IconOnly: Story = {
  args: {
    chiclet: true,
    lbl: true,
    lblIcn: true,
    lblTxt: false,
    lblIcnSrc: 'search',
    lblTxtSrc: '',
    chicSz: 'm',
    chicStyl: 'nl',
    lblSz: 'r3',
    lblClr: 'p500',
  },
};

export const TextOnly: Story = {
  args: {
    chiclet: true,
    lbl: true,
    lblIcn: false,
    lblTxt: true,
    lblIcnSrc: 'default',
    lblTxtSrc: 'Settings',
    chicSz: 'l',
    chicStyl: 'nl',
    lblSz: 'r3',
    lblClr: 'n700',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Chiclet
        chicSz='s'
        lblIcnSrc='star'
        lblTxtSrc='Small'
        lblTxt={true}
        lblIcn={true}
      />
      <Chiclet
        chicSz='m'
        lblIcnSrc='star'
        lblTxtSrc='Medium'
        lblTxt={true}
        lblIcn={true}
      />
      <Chiclet
        chicSz='l'
        lblIcnSrc='star'
        lblTxtSrc='Large'
        lblTxt={true}
        lblIcn={true}
      />
      <Chiclet
        chicSz='xl'
        lblIcnSrc='star'
        lblTxtSrc='XLarge'
        lblTxt={true}
        lblIcn={true}
      />
    </div>
  ),
};

export const Styles: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Chiclet
        chicStyl='nl'
        lblIcnSrc='heart'
        lblTxtSrc='Neutral'
        lblTxt={true}
        lblIcn={true}
        lblClr='n700'
      />
      <Chiclet
        chicStyl='outlined'
        lblIcnSrc='heart'
        lblTxtSrc='Outlined'
        lblTxt={true}
        lblIcn={true}
        lblClr='p500'
      />
      <Chiclet
        chicStyl='filled'
        lblIcnSrc='heart'
        lblTxtSrc='Filled'
        lblTxt={true}
        lblIcn={true}
        lblClr='fw500'
      />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-2'>
      <Chiclet
        lblIcnSrc='palette'
        lblTxtSrc='Primary'
        lblTxt={true}
        lblIcn={true}
        lblClr='p500'
      />
      <Chiclet
        lblIcnSrc='palette'
        lblTxtSrc='Success'
        lblTxt={true}
        lblIcn={true}
        lblClr='f500'
      />
      <Chiclet
        lblIcnSrc='palette'
        lblTxtSrc='Warning'
        lblTxt={true}
        lblIcn={true}
        lblClr='fw500'
      />
      <Chiclet
        lblIcnSrc='palette'
        lblTxtSrc='Danger'
        lblTxt={true}
        lblIcn={true}
        lblClr='fd500'
      />
      <Chiclet
        lblIcnSrc='palette'
        lblTxtSrc='Neutral'
        lblTxt={true}
        lblIcn={true}
        lblClr='n700'
      />
    </div>
  ),
};

export const NavigationExample: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <Chiclet
        lblIcnSrc='Nav_left'
        lblTxtSrc='Back'
        lblTxt={true}
        lblIcn={true}
        lblClr='n700'
        chicSz='m'
      />
      <Chiclet
        lblIcnSrc='home'
        lblTxtSrc='Home'
        lblTxt={true}
        lblIcn={true}
        lblClr='p500'
        chicSz='m'
      />
      <Chiclet
        lblIcnSrc='Nav_right'
        lblTxtSrc='Next'
        lblTxt={true}
        lblIcn={true}
        lblClr='n700'
        chicSz='m'
      />
    </div>
  ),
};

export const ToolbarExample: Story = {
  render: () => (
    <div className='flex items-center gap-1 p-2 bg-gray-50 rounded-lg'>
      <Chiclet
        lblIcnSrc='edit'
        lblTxt={false}
        lblIcn={true}
        lblClr='n700'
        chicSz='s'
        chicStyl='nl'
      />
      <Chiclet
        lblIcnSrc='copy'
        lblTxt={false}
        lblIcn={true}
        lblClr='n700'
        chicSz='s'
        chicStyl='nl'
      />
      <Chiclet
        lblIcnSrc='share'
        lblTxt={false}
        lblIcn={true}
        lblClr='n700'
        chicSz='s'
        chicStyl='nl'
      />
      <div className='w-px h-4 bg-gray-300 mx-1' />
      <Chiclet
        lblIcnSrc='delete'
        lblTxt={false}
        lblIcn={true}
        lblClr='fd500'
        chicSz='s'
        chicStyl='nl'
      />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const handleClick = (action: string) => {
      console.log(`Chiclet clicked: ${action}`);
    };

    return (
      <div className='space-y-4'>
        <p className='text-sm text-gray-600'>
          Open the browser console to see click events.
        </p>

        <div className='flex items-center gap-2'>
          <Chiclet
            lblIcnSrc='like'
            lblTxtSrc='Like'
            lblTxt={true}
            lblIcn={true}
            lblClr='fd500'
            chicClick={{ onClick: () => handleClick('like') }}
          />
          <Chiclet
            lblIcnSrc='bookmark'
            lblTxtSrc='Save'
            lblTxt={true}
            lblIcn={true}
            lblClr='p500'
            chicClick={{ onClick: () => handleClick('save') }}
          />
          <Chiclet
            lblIcnSrc='share'
            lblTxtSrc='Share'
            lblTxt={true}
            lblIcn={true}
            lblClr='n700'
            chicClick={{ onClick: () => handleClick('share') }}
          />
        </div>
      </div>
    );
  },
};

export const AllVariations: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-3'>Icon Only Chiclets</h3>
        <div className='flex items-center gap-2'>
          <Chiclet lblIcnSrc='user' chicSz='s' />
          <Chiclet lblIcnSrc='settings' chicSz='m' />
          <Chiclet lblIcnSrc='notification' chicSz='l' />
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>Text Only Chiclets</h3>
        <div className='flex items-center gap-2'>
          <Chiclet
            lblIcn={false}
            lblTxt={true}
            lblTxtSrc='Profile'
            chicSz='s'
          />
          <Chiclet
            lblIcn={false}
            lblTxt={true}
            lblTxtSrc='Settings'
            chicSz='m'
          />
          <Chiclet
            lblIcn={false}
            lblTxt={true}
            lblTxtSrc='Notifications'
            chicSz='l'
          />
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>Icon + Text Chiclets</h3>
        <div className='flex items-center gap-2'>
          <Chiclet
            lblIcnSrc='user'
            lblTxt={true}
            lblTxtSrc='Profile'
            chicSz='m'
          />
          <Chiclet
            lblIcnSrc='settings'
            lblTxt={true}
            lblTxtSrc='Settings'
            chicSz='m'
          />
          <Chiclet
            lblIcnSrc='notification'
            lblTxt={true}
            lblTxtSrc='Alerts'
            chicSz='m'
          />
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>Different Styles</h3>
        <div className='flex items-center gap-2'>
          <Chiclet
            lblIcnSrc='star'
            lblTxt={true}
            lblTxtSrc='Neutral'
            chicStyl='nl'
            lblClr='n700'
          />
          <Chiclet
            lblIcnSrc='star'
            lblTxt={true}
            lblTxtSrc='Outlined'
            chicStyl='outlined'
            lblClr='p500'
          />
          <Chiclet
            lblIcnSrc='star'
            lblTxt={true}
            lblTxtSrc='Filled'
            chicStyl='filled'
            lblClr='fw500'
          />
        </div>
      </div>
    </div>
  ),
};
