import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MSearchDialog, type SearchItem, type SearchCategory, type SearchFilters } from './m-search-dialog';
import { Button } from '../primitives/button';

const meta: Meta<typeof MSearchDialog> = {
  title: 'Modules/M-SearchDialog',
  component: MSearchDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'PRD v11 Account Interface Module - Comprehensive search dialog with category filtering, favorites management, multi-select support, and advanced search capabilities.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Search input placeholder text',
    },
    multiSelect: {
      control: 'boolean',
      description: 'Allow multiple item selection',
    },
    showFavorites: {
      control: 'boolean',
      description: 'Show favorites functionality',
    },
    showCategories: {
      control: 'boolean',
      description: 'Show category tabs',
    },
    showFilters: {
      control: 'boolean',
      description: 'Show advanced filters',
    },
    maxResults: {
      control: 'number',
      description: 'Maximum number of search results',
    },
    searchDelay: {
      control: 'number',
      description: 'Search debounce delay in milliseconds',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for stories
const sampleItems: SearchItem[] = [
  {
    id: 'user-1',
    type: 'user',
    title: 'John Doe',
    subtitle: '@johndoe',
    description: 'Software Engineer at TechCorp',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    isFavorite: true,
    tags: ['engineer', 'javascript', 'react'],
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'user-2',
    type: 'user',
    title: 'Jane Smith',
    subtitle: '@janesmith',
    description: 'Product Designer & UX Specialist',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612c2a7?w=32&h=32&fit=crop&crop=face',
    isFavorite: false,
    tags: ['design', 'ux', 'figma'],
    createdAt: new Date('2024-02-10'),
  },
  {
    id: 'content-1',
    type: 'content',
    title: 'Building React Components',
    subtitle: 'Tutorial',
    description: 'A comprehensive guide to building reusable React components',
    isFavorite: true,
    tags: ['react', 'components', 'tutorial'],
    createdAt: new Date('2024-03-01'),
  },
  {
    id: 'content-2',
    type: 'content',
    title: 'Design Systems Best Practices',
    subtitle: 'Article',
    description: 'How to create and maintain effective design systems',
    isFavorite: false,
    tags: ['design-system', 'design', 'components'],
    createdAt: new Date('2024-03-15'),
  },
  {
    id: 'collection-1',
    type: 'collection',
    title: 'Frontend Development',
    subtitle: '24 items',
    description: 'Resources for modern frontend development',
    isFavorite: true,
    tags: ['frontend', 'development', 'resources'],
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 'group-1',
    type: 'group',
    title: 'React Developers',
    subtitle: '1,234 members',
    description: 'Community for React developers to share knowledge',
    isFavorite: false,
    tags: ['react', 'community', 'development'],
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'file-1',
    type: 'file',
    title: 'Project Proposal.pdf',
    subtitle: '2.4 MB',
    description: 'Q1 2024 Project Proposal Document',
    isFavorite: false,
    tags: ['document', 'proposal', 'q1'],
    createdAt: new Date('2024-01-05'),
  },
  {
    id: 'event-1',
    type: 'event',
    title: 'React Conference 2024',
    subtitle: 'March 25, 2024',
    description: 'Annual React conference with industry experts',
    isFavorite: true,
    tags: ['react', 'conference', 'event'],
    createdAt: new Date('2024-01-20'),
  },
];

const customCategories: SearchCategory[] = [
  { id: 'all', name: 'All', icon: 'search', count: 0 },
  { id: 'users', name: 'People', icon: 'users', count: 0, color: 'blue' },
  { id: 'content', name: 'Posts', icon: 'file-text', count: 0, color: 'green' },
  { id: 'collections', name: 'Collections', icon: 'folder', count: 0, color: 'purple' },
  { id: 'groups', name: 'Groups', icon: 'users', count: 0, color: 'orange' },
  { id: 'files', name: 'Files', icon: 'paperclip', count: 0, color: 'gray' },
  { id: 'events', name: 'Events', icon: 'calendar', count: 0, color: 'red' },
];

// Template component for interactive stories
const InteractiveTemplate = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState<SearchItem[]>(
    sampleItems.filter(item => item.isFavorite)
  );

  const handleSearch = async (query: string, filters?: SearchFilters): Promise<SearchItem[]> => {
    console.log('Searching for:', query, 'with filters:', filters);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!query.trim()) return [];
    
    // Simple search simulation
    const results = sampleItems.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    return results;
  };

  const handleSelect = (items: SearchItem[]) => {
    console.log('Selected items:', items);
  };

  const handleFavorite = async (item: SearchItem, isFavorite: boolean) => {
    console.log('Toggling favorite:', item.title, isFavorite);
    
    // Update favorites list
    if (isFavorite) {
      setFavoriteItems(prev => [...prev, { ...item, ieFavorite: true }]);
    } else {
      setFavoriteItems(prev => prev.filter(fav => fav.id !== item.id));
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        Open Search Dialog
      </Button>
      <MSearchDialog
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSearch={handleSearch}
        onSelect={handleSelect}
        onFavorite={handleFavorite}
        categories={customCategories}
      />
    </div>
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    placeholder: 'Search for anything...',
    multiSelect: false,
    showFavorites: true,
    showCategories: true,
    showFilters: false,
    maxResults: 50,
    searchDelay: 300,
  },
};

export const MultiSelect: Story = {
  render: InteractiveTemplate,
  args: {
    placeholder: 'Search and select multiple items...',
    multiSelect: true,
    showFavorites: true,
    showCategories: true,
    showFilters: false,
    maxResults: 50,
    searchDelay: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select mode allows users to select multiple search results.',
      },
    },
  },
};

export const NoCategories: Story = {
  render: InteractiveTemplate,
  args: {
    placeholder: 'Simple search...',
    multiSelect: false,
    showFavorites: true,
    showCategories: false,
    showFilters: false,
    maxResults: 50,
    searchDelay: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Simplified version without category filtering.',
      },
    },
  },
};

export const NoFavorites: Story = {
  render: InteractiveTemplate,
  args: {
    placeholder: 'Search without favorites...',
    multiSelect: false,
    showFavorites: false,
    showCategories: true,
    showFilters: false,
    maxResults: 50,
    searchDelay: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Search dialog without favorites functionality.',
      },
    },
  },
};

export const InstantSearch: Story = {
  render: InteractiveTemplate,
  args: {
    placeholder: 'Instant search (no delay)...',
    multiSelect: false,
    showFavorites: true,
    showCategories: true,
    showFilters: false,
    maxResults: 50,
    searchDelay: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Instant search without debounce delay.',
      },
    },
  },
};

export const LimitedResults: Story = {
  render: InteractiveTemplate,
  args: {
    placeholder: 'Search with limited results...',
    multiSelect: false,
    showFavorites: true,
    showCategories: true,
    showFilters: false,
    maxResults: 3,
    searchDelay: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Limited to 3 search results for performance.',
      },
    },
  },
};

export const SlowSearch: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSlowSearch = async (query: string): Promise<SearchItem[]> => {
      // Simulate slow API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return sampleItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      );
    };

    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>
          Open Slow Search
        </Button>
        <MSearchDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSearch={handleSlowSearch}
          placeholder="Slow search (2s delay)..."
          categories={customCategories}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates loading state with slow search API.',
      },
    },
  },
};

export const SearchError: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleErrorSearch = async (query: string): Promise<SearchItem[]> => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error('Search service is temporarily unavailable');
    };

    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>
          Open Error Search
        </Button>
        <MSearchDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSearch={handleErrorSearch}
          placeholder="Search that will error..."
          categories={customCategories}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates error handling when search fails.',
      },
    },
  },
};

export const EmptyResults: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEmptySearch = async (query: string): Promise<SearchItem[]> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return []; // Always return empty results
    };

    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>
          Open Empty Search
        </Button>
        <MSearchDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSearch={handleEmptySearch}
          placeholder="Search with no results..."
          categories={customCategories}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates empty state when no results are found.',
      },
    },
  },
};

// Search suggestions
export const WithSuggestions: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSearchWithSuggestions = async (query: string): Promise<SearchItem[]> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Add search suggestions if query is short
      if (query.length < 3) {
        return [
          {
            id: 'suggestion-1',
            type: 'hashtag',
            title: `#${query}react`,
            subtitle: 'Popular tag',
            description: 'Find React-related content',
            isFavorite: false,
          },
          {
            id: 'suggestion-2',
            type: 'hashtag',
            title: `#${query}javascript`,
            subtitle: 'Popular tag',
            description: 'Find JavaScript-related content',
            isFavorite: false,
          },
        ] as SearchItem[];
      }
      
      return sampleItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      );
    };

    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>
          Open Search with Suggestions
        </Button>
        <MSearchDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSearch={handleSearchWithSuggestions}
          placeholder="Type 1-2 characters for suggestions..."
          categories={customCategories}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows search suggestions for short queries.',
      },
    },
  },
};

// States demonstration
export const States: Story = {
  render: () => {
    const [searchState, setSearchState] = useState(false);
    const [loadingState, setLoadingState] = useState(false);
    const [resultsState, setResultsState] = useState(false);
    const [emptyState, setEmptyState] = useState(false);

    return (
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-4 gap-4">
          <Button onClick={() => setSearchState(true)}>
            Search State
          </Button>
          <Button onClick={() => setLoadingState(true)}>
            Loading State
          </Button>
          <Button onClick={() => setResultsState(true)}>
            Results State
          </Button>
          <Button onClick={() => setEmptyState(true)}>
            Empty State
          </Button>
        </div>

        <MSearchDialog
          isOpen={searchState}
          onClose={() => setSearchState(false)}
          onSearch={async () => []}
          categories={customCategories}
        />

        <MSearchDialog
          isOpen={loadingState}
          onClose={() => setLoadingState(false)}
          onSearch={async () => {
            await new Promise(resolve => setTimeout(resolve, 5000));
            return sampleItems;
          }}
          categories={customCategories}
        />

        <MSearchDialog
          isOpen={resultsState}
          onClose={() => setResultsState(false)}
          onSearch={async () => sampleItems}
          categories={customCategories}
        />

        <MSearchDialog
          isOpen={emptyState}
          onClose={() => setEmptyState(false)}
          onSearch={async () => []}
          categories={customCategories}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different states of the search dialog.',
      },
    },
  },
};

// Content-specific search
export const ContentSearch: Story = {
  render: InteractiveTemplate,
  args: {
    placeholder: 'Search articles and tutorials...',
    multiSelect: true,
    showFavorites: true,
    showCategories: false,
    showFilters: false,
    maxResults: 20,
    searchDelay: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'Optimized for content/article search with multi-select.',
      },
    },
  },
};

// People search
export const PeopleSearch: Story = {
  render: InteractiveTemplate,
  args: {
    placeholder: 'Find people...',
    multiSelect: false,
    showFavorites: true,
    showCategories: false,
    showFilters: false,
    maxResults: 10,
    searchDelay: 400,
  },
  parameters: {
    docs: {
      description: {
        story: 'Optimized for finding and selecting people.',
      },
    },
  },
};

// Playground story
export const Playground: Story = {
  render: InteractiveTemplate,
  args: {
    placeholder: 'Search for anything...',
    multiSelect: false,
    showFavorites: true,
    showCategories: true,
    showFilters: false,
    maxResults: 50,
    searchDelay: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different search configurations. Try searching for: "react", "john", "design", "frontend".',
      },
    },
  },
};