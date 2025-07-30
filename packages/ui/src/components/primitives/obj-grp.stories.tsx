import type { Meta, StoryObj } from '@storybook/react';
import { ObjGrp } from './obj-grp';

const meta: Meta<typeof ObjGrp> = {
  title: 'Primitives/ObjGrp',
  component: ObjGrp,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The ObjGrp component creates visual clusters of overlapping objects (Avatars, AdaptIcons, Images) using authentic Acrobi Design System styling.

## Key Features
- **Overlapping Layout**: Objects display with slight overlap creating visual cluster effect
- **Mixed Content Types**: Supports Avatar, Icon, and Image objects
- **Individual Props**: Up to 10 objects via Obj1Src, Obj2Src, etc.
- **Size Control**: GrpSz prop (XS, S, M, L)  
- **Shape Control**: GrpShp prop (C: Circle, S: Square, R: Rectangle, B: Rounded Rectangle)
- **Overflow Handling**: Shows remaining count (+N) when objects exceed maxVisible
- **Hover Effects**: Objects scale and elevate on hover for interaction feedback

## Usage
Perfect for showing groups of users, teams, related items, or any collection where visual clustering is desired.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l'],
      description: 'Group size using Acrobi sizing system',
    },
    shape: {
      control: { type: 'select' },
      options: ['c', 's', 'r', 'b'],
      description:
        'Group shape (c: Circle, s: Square, r: Rectangle, b: Rounded Rectangle)',
    },
    obj1Src: {
      control: { type: 'text' },
      description:
        'Object 1 source - Avatar image URL, Icon name, or Image URL',
    },
    obj1Type: {
      control: { type: 'select' },
      options: ['avatar', 'icon', 'image'],
      description: 'Object 1 type',
    },
    overlapAmount: {
      control: { type: 'range', min: 0, max: 30, step: 2 },
      description: 'Overlap amount in pixels',
    },
    maxVisible: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum number of visible objects',
    },
    showRemainingCount: {
      control: { type: 'boolean' },
      description: 'Show remaining count when objects exceed maxVisible',
    },
    visible: {
      control: { type: 'boolean' },
      description: 'Show/hide the entire group',
    },
  },
  args: {
    visible: true,
    size: 'm',
    shape: 'c',
    overlapAmount: 12,
    maxVisible: 10,
    showRemainingCount: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample avatar URLs for consistent examples
const avatarUrls = [
  'https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
];

const iconNames = ['star', 'heart', 'bookmark', 'flag', 'bell'];

/**
 * Default ObjGrp with three overlapping avatars
 */
export const Default: Story = {
  args: {
    obj1Src: avatarUrls[0],
    obj1Type: 'avatar',
    obj2Src: avatarUrls[1],
    obj2Type: 'avatar',
    obj3Src: avatarUrls[2],
    obj3Type: 'avatar',
  },
};

/**
 * Different sizes showcase
 */
export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-8'>
      <div className='text-center'>
        <ObjGrp
          size='xs'
          obj1Src={avatarUrls[0]}
          obj2Src={avatarUrls[1]}
          obj3Src={avatarUrls[2]}
        />
        <p className='mt-2 text-sm'>Extra Small (xs)</p>
      </div>
      <div className='text-center'>
        <ObjGrp
          size='s'
          obj1Src={avatarUrls[0]}
          obj2Src={avatarUrls[1]}
          obj3Src={avatarUrls[2]}
        />
        <p className='mt-2 text-sm'>Small (s)</p>
      </div>
      <div className='text-center'>
        <ObjGrp
          size='m'
          obj1Src={avatarUrls[0]}
          obj2Src={avatarUrls[1]}
          obj3Src={avatarUrls[2]}
        />
        <p className='mt-2 text-sm'>Medium (m)</p>
      </div>
      <div className='text-center'>
        <ObjGrp
          size='l'
          obj1Src={avatarUrls[0]}
          obj2Src={avatarUrls[1]}
          obj3Src={avatarUrls[2]}
        />
        <p className='mt-2 text-sm'>Large (l)</p>
      </div>
    </div>
  ),
};

/**
 * Different shapes showcase
 */
export const Shapes: Story = {
  render: () => (
    <div className='flex items-center gap-8'>
      <div className='text-center'>
        <ObjGrp
          shape='c'
          obj1Src={avatarUrls[0]}
          obj2Src={avatarUrls[1]}
          obj3Src={avatarUrls[2]}
        />
        <p className='mt-2 text-sm'>Circle (c)</p>
      </div>
      <div className='text-center'>
        <ObjGrp
          shape='s'
          obj1Src={avatarUrls[0]}
          obj2Src={avatarUrls[1]}
          obj3Src={avatarUrls[2]}
        />
        <p className='mt-2 text-sm'>Square (s)</p>
      </div>
      <div className='text-center'>
        <ObjGrp
          shape='r'
          obj1Src={avatarUrls[0]}
          obj2Src={avatarUrls[1]}
          obj3Src={avatarUrls[2]}
        />
        <p className='mt-2 text-sm'>Rectangle (r)</p>
      </div>
      <div className='text-center'>
        <ObjGrp
          shape='b'
          obj1Src={avatarUrls[0]}
          obj2Src={avatarUrls[1]}
          obj3Src={avatarUrls[2]}
        />
        <p className='mt-2 text-sm'>Rounded Rectangle (b)</p>
      </div>
    </div>
  ),
};

/**
 * Mixed content types - avatars, icons, and images
 */
export const MixedContent: Story = {
  args: {
    obj1Src: avatarUrls[0],
    obj1Type: 'avatar',
    obj2Src: 'star',
    obj2Type: 'icon',
    obj3Src: avatarUrls[1],
    obj3Type: 'avatar',
    obj4Src: 'heart',
    obj4Type: 'icon',
    obj5Src: avatarUrls[2],
    obj5Type: 'avatar',
  },
};

/**
 * Large team with all 10 objects
 */
export const LargeTeam: Story = {
  args: {
    obj1Src: avatarUrls[0],
    obj2Src: avatarUrls[1],
    obj3Src: avatarUrls[2],
    obj4Src: avatarUrls[3],
    obj5Src: avatarUrls[4],
    obj6Src: avatarUrls[0],
    obj7Src: avatarUrls[1],
    obj8Src: avatarUrls[2],
    obj9Src: avatarUrls[3],
    obj10Src: avatarUrls[4],
  },
};

/**
 * Overflow with remaining count indicator
 */
export const WithOverflow: Story = {
  args: {
    obj1Src: avatarUrls[0],
    obj2Src: avatarUrls[1],
    obj3Src: avatarUrls[2],
    obj4Src: avatarUrls[3],
    obj5Src: avatarUrls[4],
    obj6Src: avatarUrls[0],
    obj7Src: avatarUrls[1],
    obj8Src: avatarUrls[2],
    maxVisible: 3,
    showRemainingCount: true,
  },
};

/**
 * Custom overlap amount
 */
export const CustomOverlap: Story = {
  render: () => (
    <div className='flex items-center gap-8'>
      <div className='text-center'>
        <ObjGrp
          obj1Src={avatarUrls[0]}
          obj2Src={avatarUrls[1]}
          obj3Src={avatarUrls[2]}
          obj4Src={avatarUrls[3]}
          overlapAmount={4}
        />
        <p className='mt-2 text-sm'>Light Overlap (4px)</p>
      </div>
      <div className='text-center'>
        <ObjGrp
          obj1Src={avatarUrls[0]}
          obj2Src={avatarUrls[1]}
          obj3Src={avatarUrls[2]}
          obj4Src={avatarUrls[3]}
          overlapAmount={12}
        />
        <p className='mt-2 text-sm'>Default Overlap (12px)</p>
      </div>
      <div className='text-center'>
        <ObjGrp
          obj1Src={avatarUrls[0]}
          obj2Src={avatarUrls[1]}
          obj3Src={avatarUrls[2]}
          obj4Src={avatarUrls[3]}
          overlapAmount={20}
        />
        <p className='mt-2 text-sm'>Heavy Overlap (20px)</p>
      </div>
    </div>
  ),
};

/**
 * Single object (no overlap)
 */
export const SingleObject: Story = {
  args: {
    obj1Src: avatarUrls[0],
    obj1Type: 'avatar',
  },
};

/**
 * Icons only group
 */
export const IconsOnly: Story = {
  args: {
    obj1Src: 'star',
    obj1Type: 'icon',
    obj2Src: 'heart',
    obj2Type: 'icon',
    obj3Src: 'bookmark',
    obj3Type: 'icon',
    obj4Src: 'flag',
    obj4Type: 'icon',
    obj5Src: 'bell',
    obj5Type: 'icon',
    size: 'l',
  },
};

/**
 * Different overlap amounts for different sizes
 */
export const ResponsiveOverlap: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='text-center'>
        <ObjGrp
          size='xs'
          obj1Src={avatarUrls[0]}
          obj2Src={avatarUrls[1]}
          obj3Src={avatarUrls[2]}
          obj4Src={avatarUrls[3]}
          overlapAmount={8}
        />
        <p className='mt-2 text-sm'>XS with 8px overlap</p>
      </div>
      <div className='text-center'>
        <ObjGrp
          size='s'
          obj1Src={avatarUrls[0]}
          obj2Src={avatarUrls[1]}
          obj3Src={avatarUrls[2]}
          obj4Src={avatarUrls[3]}
          overlapAmount={10}
        />
        <p className='mt-2 text-sm'>S with 10px overlap</p>
      </div>
      <div className='text-center'>
        <ObjGrp
          size='m'
          obj1Src={avatarUrls[0]}
          obj2Src={avatarUrls[1]}
          obj3Src={avatarUrls[2]}
          obj4Src={avatarUrls[3]}
          overlapAmount={12}
        />
        <p className='mt-2 text-sm'>M with 12px overlap</p>
      </div>
      <div className='text-center'>
        <ObjGrp
          size='l'
          obj1Src={avatarUrls[0]}
          obj2Src={avatarUrls[1]}
          obj3Src={avatarUrls[2]}
          obj4Src={avatarUrls[3]}
          overlapAmount={16}
        />
        <p className='mt-2 text-sm'>L with 16px overlap</p>
      </div>
    </div>
  ),
};

/**
 * Interactive playground for testing all props
 */
export const Playground: Story = {
  args: {
    size: 'm',
    shape: 'c',
    obj1Src: avatarUrls[0],
    obj1Type: 'avatar',
    obj2Src: avatarUrls[1],
    obj2Type: 'avatar',
    obj3Src: avatarUrls[2],
    obj3Type: 'avatar',
    obj4Src: avatarUrls[3],
    obj4Type: 'avatar',
    obj5Src: 'star',
    obj5Type: 'icon',
    overlapAmount: 12,
    maxVisible: 10,
    showRemainingCount: false,
    visible: true,
  },
};
