import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from './hero';

const meta: Meta<typeof Hero> = {
  title: 'Modules/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Welcome to Acrobi Design System',
    subtitle:
      'Build beautiful, accessible interfaces with our comprehensive component library',
    actions: [
      {
        label: 'Get Started',
        variant: 'primary',
        onClick: () => console.log('Get started clicked'),
      },
      {
        label: 'View Components',
        variant: 'outline',
        onClick: () => console.log('View components clicked'),
      },
    ],
  },
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    title: 'Simple Hero',
    subtitle: 'Clean and minimal hero section',
  },
};

export const Centered: Story = {
  args: {
    variant: 'centered',
    title: 'Centered Layout',
    subtitle: 'Perfect for landing pages and announcements',
    actions: [
      {
        label: 'Learn More',
        variant: 'primary',
        onClick: () => console.log('Learn more clicked'),
      },
    ],
  },
};

export const WithBadge: Story = {
  args: {
    title: 'New Features Available',
    subtitle:
      'Discover the latest updates and improvements to our design system',
    badge: {
      text: 'v1.0.0',
      variant: 'success',
    },
    actions: [
      {
        label: 'Explore Updates',
        variant: 'primary',
        onClick: () => console.log('Explore clicked'),
      },
      {
        label: 'Release Notes',
        variant: 'ghost',
        onClick: () => console.log('Release notes clicked'),
      },
    ],
  },
};

export const ProductLaunch: Story = {
  args: {
    variant: 'full',
    title: 'Introducing the Future of Design',
    subtitle:
      'Our most advanced design system yet, built for modern applications with accessibility, performance, and developer experience in mind.',
    badge: {
      text: '🚀 Now Available',
      variant: 'default',
    },
    actions: [
      {
        label: 'Start Building',
        variant: 'primary',
        size: 'lg',
        onClick: () => console.log('Start building clicked'),
      },
      {
        label: 'View Documentation',
        variant: 'outline',
        size: 'lg',
        onClick: () => console.log('View docs clicked'),
      },
    ],
  },
};
