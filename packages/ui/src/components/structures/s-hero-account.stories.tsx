import type { Meta, StoryObj } from '@storybook/react';
import { SHeroAccount } from './s-hero-account';

const meta: Meta<typeof SHeroAccount> = {
  title: 'Structures/SHeroAccount',
  component: SHeroAccount,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Main hero section for account pages with user avatar, name, and actions. Provides a prominent display area for user account information.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'premium', 'verified', 'compact'],
      description: 'Visual variant of the hero section',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the hero section',
    },
    alignment: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Content alignment',
    },
    displayName: {
      control: 'text',
      description: 'User display name',
    },
    username: {
      control: 'text',
      description: 'User username/handle',
    },
    bio: {
      control: 'text',
      description: 'User bio or description',
    },
    showPattern: {
      control: 'boolean',
      description: 'Whether to show background pattern',
    },
    actionsOrientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of action buttons',
    },
    spacing: {
      control: 'select',
      options: ['tight', 'default', 'loose'],
      description: 'Content spacing',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SHeroAccount>;

export const Default: Story = {
  args: {
    displayName: 'Alex Johnson',
    username: '@alexjohnson',
    bio: 'Frontend developer passionate about creating beautiful and accessible user interfaces.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    avatarFallback: 'AJ',
  },
};

export const WithStats: Story = {
  args: {
    displayName: 'Sarah Chen',
    username: '@sarahchen',
    bio: 'UX Designer and React enthusiast. Building the future of web applications.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b72df40f?w=150&h=150&fit=crop&crop=face',
    avatarFallback: 'SC',
    stats: [
      { label: 'Posts', value: 127 },
      { label: 'Followers', value: '2.3K' },
      { label: 'Following', value: 89 },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    displayName: 'Jordan Smith',
    username: '@jordan_dev',
    bio: 'Full-stack developer with 8+ years of experience in modern web technologies.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    avatarFallback: 'JS',
    badges: [
      { label: 'Verified', variant: 'secondary', icon: '✓' },
      { label: 'Premium', variant: 'default' },
      { label: 'Pro Developer', variant: 'outline' },
    ],
  },
};

export const WithActions: Story = {
  args: {
    displayName: 'Maria Rodriguez',
    username: '@mariarod',
    bio: 'Product designer focused on user-centered design and accessibility.',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    avatarFallback: 'MR',
    actions: [
      { label: 'Edit Profile', variant: 'outline' },
      { label: 'Settings', variant: 'ghost', icon: '⚙️' },
      { label: 'Share', variant: 'ghost', icon: '🔗' },
    ],
  },
};

export const Premium: Story = {
  args: {
    displayName: 'David Kim',
    username: '@davidkim_pro',
    bio: 'Senior software architect specializing in scalable cloud solutions and microservices.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    avatarFallback: 'DK',
    variant: 'premium',
    badges: [
      { label: 'Premium', variant: 'default', icon: '👑' },
      { label: 'Verified', variant: 'secondary', icon: '✓' },
    ],
    stats: [
      { label: 'Projects', value: 43 },
      { label: 'Stars', value: '12.5K' },
      { label: 'Contributions', value: '2.1K' },
    ],
    actions: [
      { label: 'Message', variant: 'default' },
      { label: 'Follow', variant: 'outline' },
      { label: 'More', variant: 'ghost', icon: '⋯' },
    ],
    showPattern: true,
  },
};

export const Verified: Story = {
  args: {
    displayName: 'Lisa Thompson',
    username: '@lisathompson',
    bio: 'Open source contributor and community leader. Building tools that make developers more productive.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    avatarFallback: 'LT',
    variant: 'verified',
    badges: [
      { label: 'Verified', variant: 'secondary', icon: '✓' },
      { label: 'Core Team', variant: 'outline' },
    ],
    stats: [
      { label: 'Repositories', value: 156 },
      { label: 'Followers', value: '8.9K' },
      { label: 'Contributions', value: '5.2K' },
    ],
    actions: [
      { label: 'Sponsor', variant: 'default', icon: '❤️' },
      { label: 'Follow', variant: 'outline' },
    ],
  },
};

export const Centered: Story = {
  args: {
    displayName: 'Michael Brown',
    username: '@michaelbrown',
    bio: 'Creative developer and digital artist exploring the intersection of code and design.',
    avatarUrl: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
    avatarFallback: 'MB',
    alignment: 'center',
    badges: [
      { label: 'Creative', variant: 'outline' },
      { label: 'Artist', variant: 'secondary' },
    ],
    stats: [
      { label: 'Artworks', value: 78, icon: '🎨' },
      { label: 'Likes', value: '3.4K', icon: '❤️' },
      { label: 'Views', value: '15.2K', icon: '👁️' },
    ],
    actions: [
      { label: 'View Portfolio', variant: 'default' },
      { label: 'Contact', variant: 'outline' },
    ],
  },
};

export const Compact: Story = {
  args: {
    displayName: 'Emily Wilson',
    username: '@emilywilson',
    bio: 'Technical writer and documentation specialist.',
    avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    avatarFallback: 'EW',
    variant: 'compact',
    size: 'sm',
    badges: [
      { label: 'Writer', variant: 'outline' },
    ],
    actions: [
      { label: 'Contact', variant: 'outline', size: 'sm' },
      { label: 'Follow', variant: 'ghost', size: 'sm' },
    ],
  },
};

export const VerticalActions: Story = {
  args: {
    displayName: 'Robert Taylor',
    username: '@roberttaylor',
    bio: 'Backend engineer and API specialist with expertise in distributed systems.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    avatarFallback: 'RT',
    badges: [
      { label: 'Backend Expert', variant: 'secondary' },
      { label: 'API Specialist', variant: 'outline' },
    ],
    actionsOrientation: 'vertical',
    actions: [
      { label: 'View Profile', variant: 'default' },
      { label: 'Send Message', variant: 'outline' },
      { label: 'Add to Team', variant: 'ghost' },
    ],
  },
};

export const WithBackgroundImage: Story = {
  args: {
    displayName: 'Jessica Lee',
    username: '@jessicalee',
    bio: 'Designer and photographer capturing moments through code and lens.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b72df40f?w=150&h=150&fit=crop&crop=face',
    avatarFallback: 'JL',
    backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    badges: [
      { label: 'Photographer', variant: 'secondary' },
      { label: 'Designer', variant: 'outline' },
    ],
    stats: [
      { label: 'Photos', value: 234 },
      { label: 'Designs', value: 67 },
      { label: 'Awards', value: 12 },
    ],
    actions: [
      { label: 'View Work', variant: 'default' },
      { label: 'Hire Me', variant: 'outline' },
    ],
    showPattern: true,
  },
};

export const Loading: Story = {
  args: {
    displayName: 'Loading User',
    username: '@loading',
    bio: 'This profile is loading...',
    avatarFallback: 'L',
    actions: [
      { label: 'Loading...', variant: 'outline', loading: true, disabled: true },
      { label: 'Please wait', variant: 'ghost', disabled: true },
    ],
  },
};