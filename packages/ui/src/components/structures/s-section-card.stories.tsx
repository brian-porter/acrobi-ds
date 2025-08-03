import type { Meta, StoryObj } from '@storybook/react';
import { SSectionCard } from './s-section-card';

const meta: Meta<typeof SSectionCard> = {
  title: 'Structures/SSectionCard',
  component: SSectionCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Reusable card component for Snippet page sections with header, content, and actions. Provides flexible layout for organizing content into sections.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'flat', 'outlined', 'ghost'],
      description: 'Visual variant of the card',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the card padding',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card is interactive/clickable',
    },
    title: {
      control: 'text',
      description: 'Card title',
    },
    subtitle: {
      control: 'text',
      description: 'Card subtitle or description',
    },
    icon: {
      control: 'text',
      description: 'Card icon name',
    },
    iconColor: {
      control: 'select',
      options: ['p500', 'n700', 'n500', 'n300', 'inherit'],
      description: 'Icon color',
    },
    iconSize: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl', '2xl'],
      description: 'Icon size',
    },
    spacing: {
      control: 'select',
      options: ['tight', 'default', 'loose'],
      description: 'Content spacing',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    showDivider: {
      control: 'boolean',
      description: 'Show divider between header and content',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SSectionCard>;

export const Default: Story = {
  args: {
    title: 'Code Snippet',
    subtitle: 'JavaScript utility functions',
    children: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          This card contains a collection of useful JavaScript utility functions
          that can be used across different projects.
        </p>
        <div className="bg-muted/50 p-3 rounded font-mono text-xs">
          <code>
            {`function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`}
          </code>
        </div>
      </div>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    title: 'React Components',
    subtitle: 'Reusable UI components built with React and TypeScript',
    icon: 'code',
    iconColor: 'p500',
    iconSize: 'l',
    children: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          A comprehensive collection of React components following modern best practices
          and accessibility guidelines.
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted/50 p-2 rounded">Button</div>
          <div className="bg-muted/50 p-2 rounded">Input</div>
          <div className="bg-muted/50 p-2 rounded">Modal</div>
          <div className="bg-muted/50 p-2 rounded">Card</div>
        </div>
      </div>
    ),
  },
};

export const WithBadges: Story = {
  args: {
    title: 'API Integration Guide',
    subtitle: 'Complete guide for integrating third-party APIs',
    icon: 'api',
    badges: [
      { text: 'Guide', variant: 'secondary' },
      { text: 'REST API', variant: 'outline' },
      { text: 'TypeScript', variant: 'default' },
    ],
    children: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Learn how to properly integrate external APIs into your applications
          with proper error handling and type safety.
        </p>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• Authentication strategies</li>
          <li>• Rate limiting and retries</li>
          <li>• Type generation from OpenAPI</li>
          <li>• Testing API integrations</li>
        </ul>
      </div>
    ),
  },
};

export const WithHeaderActions: Story = {
  args: {
    title: 'Database Schema',
    subtitle: 'PostgreSQL schema for user management system',
    icon: 'database',
    iconColor: 'n700',
    badges: [
      { text: 'PostgreSQL', variant: 'secondary' },
      { text: 'Schema', variant: 'outline' },
    ],
    headerActions: [
      { label: 'Edit', icon: '✏️', variant: 'ghost', size: 'sm' },
      { label: 'Copy', icon: '📋', variant: 'ghost', size: 'sm' },
      { label: 'More', icon: '⋯', variant: 'ghost', size: 'sm' },
    ],
    children: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Complete database schema including tables, relationships, and indexes
          for a scalable user management system.
        </p>
        <div className="bg-muted/50 p-3 rounded font-mono text-xs">
          <code>
            {`CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`}
          </code>
        </div>
      </div>
    ),
  },
};

export const WithFooterActions: Story = {
  args: {
    title: 'CSS Grid Layout',
    subtitle: 'Modern responsive layout patterns using CSS Grid',
    icon: 'layout',
    iconColor: 'p500',
    badges: [
      { text: 'CSS', variant: 'secondary' },
      { text: 'Layout', variant: 'outline' },
    ],
    footerActions: [
      { label: 'View Demo', variant: 'default' },
      { label: 'Copy Code', variant: 'outline' },
      { label: 'Save', variant: 'ghost', icon: '❤️' },
    ],
    children: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Learn how to create flexible and responsive layouts using CSS Grid
          with practical examples and best practices.
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-primary/10 p-3 rounded text-center">Header</div>
          <div className="bg-primary/10 p-3 rounded text-center">Main</div>
          <div className="bg-primary/10 p-3 rounded text-center">Sidebar</div>
        </div>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    title: 'Docker Configuration',
    subtitle: 'Production-ready Docker setup for Node.js applications',
    icon: 'container',
    iconColor: 'n700',
    badges: [
      { text: 'Docker', variant: 'secondary' },
      { text: 'DevOps', variant: 'outline' },
    ],
    headerActions: [
      { label: 'Download', icon: '⬇️', variant: 'ghost', size: 'sm' },
    ],
    footerActions: [
      { label: 'Use Template', variant: 'default' },
      { label: 'View Source', variant: 'outline' },
    ],
    children: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Complete Docker configuration including multi-stage builds,
          security best practices, and optimization techniques.
        </p>
        <div className="bg-muted/50 p-3 rounded font-mono text-xs">
          <code>
            {`FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production`}
          </code>
        </div>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    title: 'React Hooks Cheatsheet',
    subtitle: 'Quick reference for commonly used React hooks',
    icon: 'bookmark',
    iconColor: 'p500',
    badges: [
      { text: 'React', variant: 'secondary' },
      { text: 'Cheatsheet', variant: 'outline' },
    ],
    onCardClick: () => alert('Card clicked!'),
    children: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Click this card to view the complete React hooks reference guide
          with examples and use cases.
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted/50 p-2 rounded">useState</div>
          <div className="bg-muted/50 p-2 rounded">useEffect</div>
          <div className="bg-muted/50 p-2 rounded">useContext</div>
          <div className="bg-muted/50 p-2 rounded">useCallback</div>
        </div>
      </div>
    ),
  },
};

export const Loading: Story = {
  args: {
    title: 'Loading Content',
    subtitle: 'Please wait while we load the content...',
    loading: true,
  },
};

export const Error: Story = {
  args: {
    title: 'Failed to Load',
    subtitle: 'There was an error loading this content',
    error: true,
    errorMessage: 'Network connection failed. Please try again.',
    footerActions: [
      { label: 'Retry', variant: 'default' },
      { label: 'Report Issue', variant: 'outline' },
    ],
  },
};

export const WithDivider: Story = {
  args: {
    title: 'API Documentation',
    subtitle: 'Complete REST API reference with examples',
    icon: 'book',
    iconColor: 'p500',
    showDivider: true,
    badges: [
      { text: 'Documentation', variant: 'secondary' },
      { text: 'REST API', variant: 'outline' },
    ],
    headerActions: [
      { label: 'Share', icon: '🔗', variant: 'ghost', size: 'sm' },
      { label: 'Print', icon: '🖨️', variant: 'ghost', size: 'sm' },
    ],
    children: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Comprehensive API documentation with interactive examples,
          authentication guides, and error handling.
        </p>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between p-2 bg-muted/50 rounded">
            <span>GET /api/users</span>
            <span className="text-green-600">200 OK</span>
          </div>
          <div className="flex justify-between p-2 bg-muted/50 rounded">
            <span>POST /api/users</span>
            <span className="text-blue-600">201 Created</span>
          </div>
        </div>
      </div>
    ),
  },
};

export const Minimal: Story = {
  args: {
    variant: 'ghost',
    size: 'sm',
    spacing: 'tight',
    title: 'Quick Note',
    children: (
      <p className="text-sm text-muted-foreground">
        This is a minimal card variant with minimal styling and tight spacing.
        Perfect for simple content blocks.
      </p>
    ),
  },
};