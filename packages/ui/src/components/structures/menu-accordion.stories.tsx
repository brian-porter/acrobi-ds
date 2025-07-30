import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

// Temporary mock types and component while we fix dependencies
interface CategoryNode {
  id: string;
  name: string;
  icon?: string;
  children?: CategoryNode[];
  selectable?: boolean;
  data?: Record<string, any>;
}

const MenuAccordion = ({
  categories,
  selectedId,
  onSelect,
  className,
  ...props
}: any) => (
  <div className={`space-y-2 ${className || ''}`}>
    <div className='text-sm text-muted-foreground mb-2'>
      MenuAccordion - Dependency loading...
    </div>
    {categories?.map((category: CategoryNode) => (
      <div
        key={category.id}
        className='p-2 border rounded cursor-pointer hover:bg-accent'
        onClick={() => onSelect?.(category)}
      >
        {category.icon} {category.name}
        {category.children && (
          <span className='text-xs text-muted-foreground ml-2'>
            ({category.children.length} items)
          </span>
        )}
      </div>
    ))}
  </div>
);

const meta: Meta<typeof MenuAccordion> = {
  title: 'Structures/MenuAccordion',
  component: MenuAccordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='w-96 bg-background border rounded-lg p-4'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCategories: CategoryNode[] = [
  {
    id: 'photos',
    name: 'Photos',
    icon: '📸',
    children: [
      {
        id: 'portraits',
        name: 'Portraits',
        icon: '👤',
        children: [
          { id: 'family', name: 'Family Photos', icon: '👨‍👩‍👧‍👦' },
          { id: 'professional', name: 'Professional Headshots', icon: '💼' },
          { id: 'events', name: 'Event Photos', icon: '🎉' },
        ],
      },
      {
        id: 'landscapes',
        name: 'Landscapes',
        icon: '🏞️',
        children: [
          { id: 'mountains', name: 'Mountain Views', icon: '⛰️' },
          { id: 'oceans', name: 'Ocean Scenes', icon: '🌊' },
          { id: 'forests', name: 'Forest Paths', icon: '🌲' },
        ],
      },
      {
        id: 'travel',
        name: 'Travel',
        icon: '✈️',
        children: [
          { id: 'europe', name: 'Europe', icon: '🏰' },
          { id: 'asia', name: 'Asia', icon: '🏯' },
          { id: 'americas', name: 'Americas', icon: '🗽' },
        ],
      },
    ],
  },
  {
    id: 'documents',
    name: 'Documents',
    icon: '📄',
    children: [
      {
        id: 'work',
        name: 'Work Documents',
        icon: '💼',
        children: [
          { id: 'contracts', name: 'Contracts', icon: '📝' },
          { id: 'invoices', name: 'Invoices', icon: '🧾' },
          { id: 'reports', name: 'Reports', icon: '📊' },
        ],
      },
      {
        id: 'personal',
        name: 'Personal Documents',
        icon: '🏠',
        children: [
          { id: 'identification', name: 'ID Documents', icon: '🆔' },
          { id: 'medical', name: 'Medical Records', icon: '🏥' },
          { id: 'financial', name: 'Financial Records', icon: '💳' },
        ],
      },
    ],
  },
  {
    id: 'music',
    name: 'Music',
    icon: '🎵',
    children: [
      {
        id: 'genres',
        name: 'By Genre',
        icon: '🎶',
        children: [
          { id: 'rock', name: 'Rock', icon: '🎸' },
          { id: 'jazz', name: 'Jazz', icon: '🎷' },
          { id: 'classical', name: 'Classical', icon: '🎼' },
          { id: 'electronic', name: 'Electronic', icon: '🎛️' },
        ],
      },
      {
        id: 'playlists',
        name: 'Playlists',
        icon: '📋',
        children: [
          { id: 'workout', name: 'Workout Mix', icon: '💪' },
          { id: 'study', name: 'Study Focus', icon: '📚' },
          { id: 'party', name: 'Party Time', icon: '🎉' },
        ],
      },
    ],
  },
];

const flatCategories: CategoryNode[] = [
  { id: 'home', name: 'Home', icon: '🏠' },
  { id: 'work', name: 'Work', icon: '💼' },
  { id: 'personal', name: 'Personal', icon: '👤' },
  { id: 'shared', name: 'Shared', icon: '👥' },
];

export const Default: Story = {
  args: {
    categories: mockCategories,
    onSelect: category => console.log('Selected:', category),
  },
};

export const WithSelection: Story = {
  render: args => {
    const [selectedId, setSelectedId] = useState<string>('portraits');

    return (
      <MenuAccordion
        {...args}
        categories={mockCategories}
        selectedId={selectedId}
        onSelect={category => {
          setSelectedId(category.id);
          console.log('Selected:', category);
        }}
      />
    );
  },
};

export const ControlledExpansion: Story = {
  render: args => {
    const [selectedId, setSelectedId] = useState<string>();
    const [expandedIds, setExpandedIds] = useState<string[]>([
      'photos',
      'portraits',
    ]);

    return (
      <div className='space-y-4'>
        <div className='text-sm text-muted-foreground'>
          Expanded: {expandedIds.join(', ') || 'None'}
        </div>
        <MenuAccordion
          {...args}
          categories={mockCategories}
          selectedId={selectedId}
          expandedIds={expandedIds}
          onSelect={category => {
            setSelectedId(category.id);
            console.log('Selected:', category);
          }}
          onExpandedChange={setExpandedIds}
        />
      </div>
    );
  },
};

export const FlatList: Story = {
  args: {
    categories: flatCategories,
    onSelect: category => console.log('Selected:', category),
  },
};

export const NoAutoExpand: Story = {
  args: {
    categories: mockCategories,
    autoExpand: false,
    onSelect: category => console.log('Selected:', category),
  },
};

export const LimitedDepth: Story = {
  args: {
    categories: mockCategories,
    maxDepth: 2,
    onSelect: category => console.log('Selected:', category),
  },
};

export const CustomExpandDelay: Story = {
  args: {
    categories: mockCategories,
    expandDelay: 1000,
    onSelect: category => console.log('Selected:', category),
  },
};

export const EmptyState: Story = {
  args: {
    categories: [],
    emptyMessage: 'No categories found. Try creating one!',
    onSelect: category => console.log('Selected:', category),
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    categories: [],
    emptyMessage: '🔍 Search for categories or create a new one',
    onSelect: category => console.log('Selected:', category),
  },
};

export const NonSelectableItems: Story = {
  args: {
    categories: [
      {
        id: 'header1',
        name: 'Photos (Header Only)',
        icon: '📸',
        selectable: false,
        children: [
          { id: 'portraits', name: 'Portraits', icon: '👤' },
          { id: 'landscapes', name: 'Landscapes', icon: '🏞️' },
        ],
      },
      {
        id: 'header2',
        name: 'Documents (Header Only)',
        icon: '📄',
        selectable: false,
        children: [
          { id: 'work-docs', name: 'Work Documents', icon: '💼' },
          { id: 'personal-docs', name: 'Personal Documents', icon: '🏠' },
        ],
      },
    ],
    onSelect: category => console.log('Selected:', category),
  },
};

export const DeepNesting: Story = {
  args: {
    categories: [
      {
        id: 'level1',
        name: 'Level 1',
        icon: '1️⃣',
        children: [
          {
            id: 'level2',
            name: 'Level 2',
            icon: '2️⃣',
            children: [
              {
                id: 'level3',
                name: 'Level 3',
                icon: '3️⃣',
                children: [
                  {
                    id: 'level4',
                    name: 'Level 4 (Max Depth)',
                    icon: '4️⃣',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    maxDepth: 4,
    onSelect: category => console.log('Selected:', category),
  },
};
