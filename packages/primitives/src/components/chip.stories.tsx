import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './chip';

const meta: Meta<typeof Chip> = {
  title: 'Primitives/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='p-4'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    visible: {
      control: { type: 'boolean' },
    },
    active: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    styling: {
      control: { type: 'select' },
      options: ['nl', 'outlined', 'filled'],
    },
    textSize: {
      control: { type: 'select' },
      options: ['inherit', 'r4', 'r4b', 'r3', 'r3b', 'r2', 'r2b', 'r1', 'r1b'],
    },
    showBase: {
      control: { type: 'boolean' },
    },
    showAvatar: {
      control: { type: 'boolean' },
    },
    showIcon: {
      control: { type: 'boolean' },
    },
    showText: {
      control: { type: 'boolean' },
    },
    showTrail: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Default Chip',
    showIcon: true,
    iconName: 'star',
  },
};

export const BasicChip: Story = {
  args: {
    showBase: true,
    showAvatar: false,
    text: 'Basic Chip',
    showIcon: true,
    iconName: 'tag',
    showText: true,
    styling: 'nl',
  },
};

export const AvatarChip: Story = {
  args: {
    showBase: false,
    showAvatar: true,
    avatarSrc:
      'https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif',
    avatarText: 'John Doe',
    showAvatarBadge: true,
    avatarBadgeIcon: 'Admin',
    avatarBadgeColor: 'yellow-700',
  },
};

export const WithTrail: Story = {
  args: {
    text: 'Removable Chip',
    showIcon: true,
    iconName: 'tag',
    showTrail: true,
    trailIcon: 'clearcirc',
  },
};

export const Active: Story = {
  args: {
    text: 'Active Chip',
    showIcon: true,
    iconName: 'check',
    active: true,
  },
};

export const Disabled: Story = {
  args: {
    text: 'Disabled Chip',
    showIcon: true,
    iconName: 'tag',
    disabled: true,
  },
};

export const DifferentStyles: Story = {
  render: () => (
    <div className='flex flex-wrap gap-3'>
      <Chip text='Neutral Style' styling='nl' showIcon={true} iconName='info' />
      <Chip
        text='Outlined Style'
        styling='outlined'
        showIcon={true}
        iconName='outline'
      />
      <Chip
        text='Filled Style'
        styling='filled'
        showIcon={true}
        iconName='filled'
      />
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-3'>
      <Chip text='Small' textSize='r4' showIcon={true} iconName='star' />
      <Chip text='Regular' textSize='r3' showIcon={true} iconName='star' />
      <Chip text='Large' textSize='r2' showIcon={true} iconName='star' />
    </div>
  ),
};

export const CategoryTags: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Chip text='Technology' showIcon={true} iconName='tech' styling='nl' />
      <Chip text='Design' showIcon={true} iconName='design' styling='nl' />
      <Chip text='Business' showIcon={true} iconName='business' styling='nl' />
      <Chip
        text='Marketing'
        showIcon={true}
        iconName='marketing'
        styling='nl'
      />
    </div>
  ),
};

export const StatusChips: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Chip
        text='Active'
        showIcon={true}
        iconName='check'
        active={true}
        styling='filled'
      />
      <Chip
        text='Pending'
        showIcon={true}
        iconName='clock'
        styling='outlined'
      />
      <Chip
        text='Completed'
        showIcon={true}
        iconName='checkmark'
        styling='nl'
      />
      <Chip text='Cancelled' showIcon={true} iconName='close' disabled={true} />
    </div>
  ),
};

export const FilterChips: Story = {
  render: () => (
    <div className='space-y-4'>
      <div>
        <h4 className='text-sm font-medium mb-2'>Filter by Category</h4>
        <div className='flex flex-wrap gap-2'>
          <Chip text='All' active={true} showIcon={false} />
          <Chip
            text='Electronics'
            showIcon={true}
            iconName='electronics'
            showTrail={true}
          />
          <Chip text='Clothing' showIcon={true} iconName='clothing' />
          <Chip text='Books' showIcon={true} iconName='book' />
        </div>
      </div>

      <div>
        <h4 className='text-sm font-medium mb-2'>Price Range</h4>
        <div className='flex flex-wrap gap-2'>
          <Chip
            text='Under $25'
            showIcon={true}
            iconName='dollar'
            active={true}
            showTrail={true}
          />
          <Chip text='$25 - $50' showIcon={true} iconName='dollar' />
          <Chip text='Over $50' showIcon={true} iconName='dollar' />
        </div>
      </div>
    </div>
  ),
};

export const TeamMembers: Story = {
  render: () => (
    <div className='space-y-4'>
      <h4 className='text-sm font-medium'>Project Team</h4>
      <div className='flex flex-wrap gap-3'>
        <Chip
          showAvatar={true}
          avatarSrc='https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif'
          avatarText='Sarah Johnson'
          showAvatarBadge={true}
          avatarBadgeIcon='Admin'
          avatarBadgeColor='yellow-700'
          showTrail={true}
          avatarTrailIcon='clearcirc'
        />
        <Chip
          showAvatar={true}
          avatarSrc='https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif'
          avatarText='Mike Chen'
          showAvatarBadge={true}
          avatarBadgeIcon='User'
          avatarBadgeColor='blue-500'
        />
        <Chip
          showAvatar={true}
          avatarSrc='https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif'
          avatarText='Emily Davis'
          showAvatarBadge={false}
          showTrail={true}
          avatarTrailIcon='clearcirc'
        />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const handleChipClick = (chipName: string) => {
      console.log(`Chip clicked: ${chipName}`);
      alert(`You clicked on: ${chipName}`);
    };

    return (
      <div className='space-y-4'>
        <p className='text-sm text-muted-foreground'>
          Click on chips to see interaction examples.
        </p>

        <div className='flex flex-wrap gap-3'>
          <Chip
            text='Clickable Chip'
            showIcon={true}
            iconName='click'
            onChipClick={() => handleChipClick('Clickable Chip')}
          />
          <Chip
            text='Remove Me'
            showIcon={true}
            iconName='tag'
            showTrail={true}
            trailIcon='clearcirc'
            onChipClick={() => handleChipClick('Remove Me')}
          />
          <Chip
            showAvatar={true}
            avatarText='Click Avatar'
            showTrail={true}
            onChipClick={() => handleChipClick('Avatar Chip')}
          />
        </div>
      </div>
    );
  },
};

export const ScreenshotExamples: Story = {
  name: 'Screenshot Examples',
  render: () => (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold mb-4'>Chip Types from Screenshot</h3>
      <div className='flex gap-3'>
        <Chip
          text='AssistName'
          showIcon={true}
          iconName='calendar'
          showBase={true}
          showAvatar={false}
        />
        <Chip
          text='FilterName'
          showIcon={true}
          iconName='tag'
          showTrail={true}
          trailIcon='select_arrrow'
          showBase={true}
          showAvatar={false}
        />
        <Chip
          showAvatar={true}
          avatarText='FName LI'
          showBase={false}
          showAvatarBadge={false}
        />
        <Chip
          text='Suggestion'
          showIcon={false}
          showBase={true}
          showAvatar={false}
        />
      </div>
    </div>
  ),
};

export const AllVariations: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Basic Chips</h3>
        <div className='flex flex-wrap gap-2'>
          <Chip text='Default' />
          <Chip text='With Icon' showIcon={true} iconName='star' />
          <Chip text='Active' active={true} />
          <Chip text='Disabled' disabled={true} />
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Chip Styles</h3>
        <div className='flex flex-wrap gap-2'>
          <Chip text='Neutral' styling='nl' />
          <Chip text='Outlined' styling='outlined' />
          <Chip text='Filled' styling='filled' />
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>With Trail Icons</h3>
        <div className='flex flex-wrap gap-2'>
          <Chip text='Removable' showTrail={true} trailIcon='clearcirc' />
          <Chip text='Dropdown' showTrail={true} trailIcon='select_arrrow' />
          <Chip text='Custom Trail' showTrail={true} trailIcon='nav_right' />
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Avatar Chips</h3>
        <div className='flex flex-wrap gap-3'>
          <Chip
            showAvatar={true}
            avatarText='John Doe'
            showAvatarBadge={true}
          />
          <Chip
            showAvatar={true}
            avatarText='Jane Smith'
            showAvatarBadge={false}
            showTrail={true}
          />
        </div>
      </div>
    </div>
  ),
};
