import type { Meta, StoryObj } from '@storybook/react';
import { SFavoritesGrid } from './s-favorites-grid';

const meta: Meta<typeof SFavoritesGrid> = {
  title: 'Structures/SFavoritesGrid',
  component: SFavoritesGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Grid layout for displaying favorited items in a responsive card-based format. Perfect for showcasing collections of snippets, profiles, or any favorited content.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'spacious', 'masonry'],
      description: 'Grid layout variant',
    },
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Number of columns (responsive)',
    },
    cardVariant: {
      control: 'select',
      options: ['default', 'elevated', 'flat', 'outlined'],
      description: 'Visual variant of cards',
    },
    cardSize: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of cards',
    },
    cardInteractive: {
      control: 'boolean',
      description: 'Whether cards are interactive/clickable',
    },
    showType: {
      control: 'boolean',
      description: 'Show item type badges',
    },
    showMetadata: {
      control: 'boolean',
      description: 'Show item metadata',
    },
    showFavoritedDate: {
      control: 'boolean',
      description: 'Show when item was favorited',
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
      description: 'Content alignment within cards',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SFavoritesGrid>;

const sampleItems = [
  {
    id: '1',
    title: 'React Hooks Cheatsheet',
    description: 'Comprehensive guide to React hooks with practical examples and best practices.',
    type: 'snippet',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=150&fit=crop',
    badges: [
      { text: 'React', variant: 'secondary' as const },
      { text: 'JavaScript', variant: 'outline' as const },
    ],
    metadata: [
      { label: 'Views', value: '1.2K', icon: '👁️' },
      { label: 'Stars', value: '89', icon: '⭐' },
      { label: 'Forks', value: '23', icon: '🔗' },
    ],
    favoritedAt: new Date('2024-03-15'),
  },
  {
    id: '2',
    title: 'CSS Grid Layouts',
    description: 'Modern responsive layout patterns using CSS Grid with complete examples.',
    type: 'tutorial',
    icon: 'layout',
    iconColor: 'p500' as const,
    badges: [
      { text: 'CSS', variant: 'secondary' as const },
      { text: 'Layout', variant: 'outline' as const },
    ],
    metadata: [
      { label: 'Reads', value: '2.8K', icon: '📖' },
      { label: 'Saves', value: '156', icon: '💾' },
    ],
    favoritedAt: new Date('2024-03-10'),
  },
  {
    id: '3',
    title: 'John Doe',
    description: 'Senior Frontend Developer with 8+ years of experience in modern web technologies.',
    type: 'profile',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    avatarFallback: 'JD',
    badges: [
      { text: 'Verified', variant: 'secondary' as const },
    ],
    metadata: [
      { label: 'Followers', value: '2.3K', icon: '👥' },
      { label: 'Posts', value: '127', icon: '📝' },
    ],
    favoritedAt: new Date('2024-03-08'),
  },
  {
    id: '4',
    title: 'TypeScript Utilities',
    description: 'Collection of useful TypeScript utility types and helper functions.',
    type: 'library',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=200&h=150&fit=crop',
    badges: [
      { text: 'TypeScript', variant: 'default' as const },
      { text: 'Utils', variant: 'outline' as const },
    ],
    metadata: [
      { label: 'Downloads', value: '15.2K', icon: '⬇️' },
      { label: 'Issues', value: '3', icon: '🐛' },
    ],
    favoritedAt: new Date('2024-03-05'),
  },
  {
    id: '5',
    title: 'API Documentation',
    description: 'Complete REST API documentation with interactive examples and authentication guides.',
    type: 'docs',
    icon: 'book',
    iconColor: 'n700' as const,
    badges: [
      { text: 'API', variant: 'secondary' as const },
      { text: 'Documentation', variant: 'outline' as const },
    ],
    metadata: [
      { label: 'Endpoints', value: '47', icon: '🔗' },
      { label: 'Examples', value: '120', icon: '💡' },
    ],
    favoritedAt: new Date('2024-03-01'),
  },
  {
    id: '6',
    title: 'Design System Components',
    description: 'Comprehensive design system with reusable components and design tokens.',
    type: 'design',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&h=150&fit=crop',
    badges: [
      { text: 'Design System', variant: 'default' as const },
      { text: 'Components', variant: 'outline' as const },
    ],
    metadata: [
      { label: 'Components', value: '89', icon: '🧩' },
      { label: 'Tokens', value: '156', icon: '🎨' },
    ],
    favoritedAt: new Date('2024-02-28'),
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const ThreeColumns: Story = {
  args: {
    items: sampleItems,
    columns: 3,
  },
};

export const FourColumns: Story = {
  args: {
    items: sampleItems,
    columns: 4,
  },
};

export const Elevated: Story = {
  args: {
    items: sampleItems,
    cardVariant: 'elevated',
  },
};

export const Compact: Story = {
  args: {
    items: sampleItems,
    variant: 'compact',
    cardSize: 'sm',
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

export const ShowFavoritedDate: Story = {
  args: {
    items: sampleItems,
    showFavoritedDate: true,
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

export const Loading: Story = {
  args: {
    items: [],
    loading: true,
    loadingCount: 6,
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

export const NonInteractive: Story = {
  args: {
    items: sampleItems,
    cardInteractive: false,
    actions: [
      { label: 'View', icon: '👁️', variant: 'outline' },
      { label: 'Share', icon: '🔗', variant: 'ghost' },
    ],
  },
};

export const LargeCards: Story = {
  args: {
    items: sampleItems,
    cardSize: 'lg',
    variant: 'spacious',
    columns: 2,
  },
};

export const Masonry: Story = {
  args: {
    items: [
      ...sampleItems,
      {
        id: '7',
        title: 'Long Form Content Example',
        description: 'This is an example of content with a much longer description to demonstrate how the masonry layout handles variable content heights. It should flow naturally and create an interesting visual layout without forcing all cards to the same height.',
        type: 'article',
        icon: 'file-text',
        iconColor: 'n500' as const,
        badges: [
          { text: 'Article', variant: 'secondary' as const },
          { text: 'Long Read', variant: 'outline' as const },
        ],
        metadata: [
          { label: 'Read Time', value: '12 min', icon: '⏱️' },
          { label: 'Words', value: '2.8K', icon: '📝' },
        ],
        favoritedAt: new Date('2024-02-25'),
      },
    ],
    variant: 'masonry',
    columns: 3,
  },
};

export const SingleColumn: Story = {
  args: {
    items: sampleItems.slice(0, 3),
    columns: 1,
    cardSize: 'lg',
  },
};

export const ProfilesOnly: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Sarah Johnson',
        description: 'UX Designer specializing in accessibility and user research.',
        type: 'profile',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b72df40f?w=150&h=150&fit=crop&crop=face',
        avatarFallback: 'SJ',
        badges: [
          { text: 'Verified', variant: 'secondary' as const },
          { text: 'Pro', variant: 'default' as const },
        ],
        metadata: [
          { label: 'Followers', value: '1.8K', icon: '👥' },
          { label: 'Designs', value: '89', icon: '🎨' },
        ],
        favoritedAt: new Date('2024-03-12'),
      },
      {
        id: '2',
        title: 'Michael Chen',
        description: 'Full-stack developer with expertise in Node.js and React.',
        type: 'profile',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        avatarFallback: 'MC',
        badges: [
          { text: 'Developer', variant: 'outline' as const },
        ],
        metadata: [
          { label: 'Repos', value: '156', icon: '📁' },
          { label: 'Stars', value: '2.3K', icon: '⭐' },
        ],
        favoritedAt: new Date('2024-03-10'),
      },
      {
        id: '3',
        title: 'Emily Rodriguez',
        description: 'Product manager with a passion for user-centered design.',
        type: 'profile',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        avatarFallback: 'ER',
        badges: [
          { text: 'PM', variant: 'secondary' as const },
        ],
        metadata: [
          { label: 'Products', value: '12', icon: '📦' },
          { label: 'Teams', value: '3', icon: '👥' },
        ],
        favoritedAt: new Date('2024-03-08'),
      },
    ],
    columns: 3,
  },
};