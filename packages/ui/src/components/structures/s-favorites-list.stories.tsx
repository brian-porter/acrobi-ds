import type { Meta, StoryObj } from '@storybook/react';
import { SFavoritesList } from './s-favorites-list';

const meta: Meta<typeof SFavoritesList> = {
  title: 'Structures/SFavoritesList',
  component: SFavoritesList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'List layout for displaying favorited items in a vertical format with detailed information. Ideal for showing more comprehensive item details compared to grid layout.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'card', 'bordered', 'minimal'],
      description: 'Visual variant of the list',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Text size of the list',
    },
    spacing: {
      control: 'select',
      options: ['tight', 'default', 'loose'],
      description: 'Spacing between items',
    },
    itemVariant: {
      control: 'select',
      options: ['default', 'compact', 'spacious', 'minimal'],
      description: 'Visual variant of individual items',
    },
    itemInteractive: {
      control: 'boolean',
      description: 'Whether items are interactive/clickable',
    },
    showType: {
      control: 'boolean',
      description: 'Show item type',
    },
    showMetadata: {
      control: 'boolean',
      description: 'Show item metadata',
    },
    showFavoritedDate: {
      control: 'boolean',
      description: 'Show when item was favorited',
    },
    showFeatured: {
      control: 'boolean',
      description: 'Show featured badge',
    },
    selectionMode: {
      control: 'select',
      options: ['none', 'single', 'multiple'],
      description: 'Selection mode',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    contentAlignment: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Content alignment',
    },
    actionsAlignment: {
      control: 'select',
      options: ['start', 'end', 'center'],
      description: 'Actions alignment',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SFavoritesList>;

const sampleItems = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    description: 'Collection of advanced React patterns and techniques including render props, compound components, and custom hooks for building scalable applications.',
    type: 'snippet',
    avatarUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&h=150&fit=crop',
    badges: [
      { text: 'React', variant: 'secondary' as const },
      { text: 'TypeScript', variant: 'outline' as const },
      { text: 'Advanced', variant: 'default' as const },
    ],
    metadata: [
      { label: 'Views', value: '2.3K', icon: '👁️' },
      { label: 'Forks', value: '45', icon: '🔗' },
      { label: 'Stars', value: '189', icon: '⭐' },
    ],
    favoritedAt: new Date('2024-03-15'),
    featured: true,
  },
  {
    id: '2',
    title: 'CSS Grid Mastery Guide',
    description: 'Complete guide to mastering CSS Grid with practical examples, responsive patterns, and real-world use cases.',
    type: 'tutorial',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=150&h=150&fit=crop',
    badges: [
      { text: 'CSS', variant: 'secondary' as const },
      { text: 'Layout', variant: 'outline' as const },
    ],
    metadata: [
      { label: 'Readers', value: '1.8K', icon: '📖' },
      { label: 'Saves', value: '234', icon: '💾' },
    ],
    favoritedAt: new Date('2024-03-12'),
  },
  {
    id: '3',
    title: 'Sarah Johnson',
    description: 'Senior UX Designer with 10+ years of experience in user research, interaction design, and accessibility. Currently leading design at a Fortune 500 company.',
    type: 'profile',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b72df40f?w=150&h=150&fit=crop&crop=face',
    avatarFallback: 'SJ',
    badges: [
      { text: 'Verified', variant: 'secondary' as const },
      { text: 'UX Expert', variant: 'default' as const },
    ],
    metadata: [
      { label: 'Followers', value: '3.2K', icon: '👥' },
      { label: 'Articles', value: '89', icon: '📝' },
      { label: 'Designs', value: '156', icon: '🎨' },
    ],
    favoritedAt: new Date('2024-03-10'),
    featured: true,
  },
  {
    id: '4',
    title: 'Node.js API Best Practices',
    description: 'Comprehensive guide covering authentication, validation, error handling, testing, and deployment strategies for production-ready APIs.',
    type: 'guide',
    icon: 'server',
    iconColor: 'n700' as const,
    badges: [
      { text: 'Node.js', variant: 'secondary' as const },
      { text: 'API', variant: 'outline' as const },
      { text: 'Backend', variant: 'outline' as const },
    ],
    metadata: [
      { label: 'Examples', value: '47', icon: '💡' },
      { label: 'Downloads', value: '5.6K', icon: '⬇️' },
    ],
    favoritedAt: new Date('2024-03-08'),
  },
  {
    id: '5',
    title: 'Design System Documentation',
    description: 'Complete design system documentation including component library, design tokens, usage guidelines, and accessibility standards.',
    type: 'docs',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=150&h=150&fit=crop',
    badges: [
      { text: 'Design System', variant: 'default' as const },
      { text: 'Documentation', variant: 'outline' as const },
    ],
    metadata: [
      { label: 'Components', value: '127', icon: '🧩' },
      { label: 'Tokens', value: '89', icon: '🎨' },
      { label: 'Pages', value: '234', icon: '📄' },
    ],
    favoritedAt: new Date('2024-03-05'),
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const WithActions: Story = {
  args: {
    items: sampleItems,
    actions: [
      { label: 'Share', icon: '🔗', variant: 'ghost' },
      { label: 'Remove', icon: '❌', variant: 'ghost' },
    ],
  },
};

export const WithSelection: Story = {
  args: {
    items: sampleItems,
    selectionMode: 'multiple',
    selectedIds: ['1', '3'],
  },
};

export const CompactVariant: Story = {
  args: {
    items: sampleItems,
    itemVariant: 'compact',
    size: 'sm',
  },
};

export const SpaciousVariant: Story = {
  args: {
    items: sampleItems,
    itemVariant: 'spacious',
    spacing: 'loose',
  },
};

export const CardVariant: Story = {
  args: {
    items: sampleItems,
    variant: 'card',
    header: (
      <div className="mb-4">
        <h2 className="text-xl font-bold">My Favorites</h2>
        <p className="text-muted-foreground">Items you've saved for later</p>
      </div>
    ),
  },
};

export const ShowFavoritedDate: Story = {
  args: {
    items: sampleItems,
    showFavoritedDate: true,
  },
};

export const HideFeatured: Story = {
  args: {
    items: sampleItems,
    showFeatured: false,
  },
};

export const HideMetadata: Story = {
  args: {
    items: sampleItems,
    showMetadata: false,
  },
};

export const CenteredContent: Story = {
  args: {
    items: sampleItems,
    contentAlignment: 'center',
  },
};

export const ActionsAtStart: Story = {
  args: {
    items: sampleItems,
    actionsAlignment: 'start',
    actions: [
      { label: 'Edit', icon: '✏️', variant: 'outline' },
      { label: 'Delete', icon: '🗑️', variant: 'destructive' },
    ],
  },
};

export const NonInteractive: Story = {
  args: {
    items: sampleItems,
    itemInteractive: false,
    actions: [
      { label: 'View', icon: '👁️', variant: 'outline' },
      { label: 'Share', icon: '🔗', variant: 'ghost' },
    ],
  },
};

export const Loading: Story = {
  args: {
    items: [],
    loading: true,
    loadingCount: 5,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    showEmpty: true,
    emptyMessage: 'No favorites yet',
    emptyDescription: 'Start favoriting content to see it here',
    emptyAction: {
      label: 'Browse Content',
      onClick: () => alert('Browse content clicked'),
    },
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    items: sampleItems,
    variant: 'bordered',
    header: (
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Favorites Collection</h2>
            <p className="text-sm text-muted-foreground">{sampleItems.length} items saved</p>
          </div>
          <div className="flex gap-2">
            <button className="text-sm text-muted-foreground hover:text-foreground">Sort</button>
            <button className="text-sm text-muted-foreground hover:text-foreground">Filter</button>
          </div>
        </div>
      </div>
    ),
    footer: (
      <div className="p-4 border-t border-border text-center">
        <button className="text-sm text-primary hover:underline">Load more favorites</button>
      </div>
    ),
  },
};

export const MinimalVariant: Story = {
  args: {
    items: sampleItems.slice(0, 3),
    variant: 'minimal',
    itemVariant: 'minimal',
  },
};

export const ProfilesOnly: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'David Kim',
        description: 'Senior Software Architect specializing in distributed systems and microservices. Currently building next-gen cloud infrastructure.',
        type: 'profile',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        avatarFallback: 'DK',
        badges: [
          { text: 'Architect', variant: 'default' as const },
          { text: 'Verified', variant: 'secondary' as const },
        ],
        metadata: [
          { label: 'Experience', value: '12+ years', icon: '💼' },
          { label: 'Projects', value: '89', icon: '📦' },
          { label: 'Teams', value: '15', icon: '👥' },
        ],
        favoritedAt: new Date('2024-03-14'),
        featured: true,
      },
      {
        id: '2',
        title: 'Maria Rodriguez',
        description: 'Product Designer focused on creating inclusive and accessible digital experiences. Passionate about user research and data-driven design.',
        type: 'profile',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        avatarFallback: 'MR',
        badges: [
          { text: 'Designer', variant: 'secondary' as const },
          { text: 'Accessibility Expert', variant: 'outline' as const },
        ],
        metadata: [
          { label: 'Designs', value: '156', icon: '🎨' },
          { label: 'Research', value: '23', icon: '🔍' },
          { label: 'Awards', value: '7', icon: '🏆' },
        ],
        favoritedAt: new Date('2024-03-11'),
      },
      {
        id: '3',
        title: 'Alex Thompson',
        description: 'Full-stack developer and open source contributor. Building tools that make developers more productive and happy.',
        type: 'profile',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        avatarFallback: 'AT',
        badges: [
          { text: 'Open Source', variant: 'outline' as const },
          { text: 'Full-stack', variant: 'secondary' as const },
        ],
        metadata: [
          { label: 'Repos', value: '234', icon: '📁' },
          { label: 'Stars', value: '12.5K', icon: '⭐' },
          { label: 'Followers', value: '3.8K', icon: '👥' },
        ],
        favoritedAt: new Date('2024-03-09'),
      },
    ],
    showFeatured: true,
    actions: [
      { label: 'Message', icon: '💬', variant: 'outline' },
      { label: 'Follow', icon: '👥', variant: 'ghost' },
    ],
  },
};

export const SingleSelection: Story = {
  args: {
    items: sampleItems,
    selectionMode: 'single',
    selectedIds: ['2'],
    actions: [
      { label: 'View Selected', icon: '👁️', variant: 'default' },
      { label: 'Share', icon: '🔗', variant: 'ghost' },
    ],
  },
};