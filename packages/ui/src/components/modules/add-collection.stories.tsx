import type { Meta, StoryObj } from '@storybook/react-vite';
import { AddCollection } from './add-collection';

const meta: Meta<typeof AddCollection> = {
  title: 'Modules/AddCollection',
  component: AddCollection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCollectionTypes = [
  {
    id: 'photos',
    name: 'Photos',
    description: 'Share your favorite images',
    icon: '📸',
    children: [
      {
        id: 'portraits',
        name: 'Portraits',
        description: 'People photos',
        icon: '👤',
      },
      {
        id: 'landscapes',
        name: 'Landscapes',
        description: 'Nature and scenery',
        icon: '🏞️',
      },
      {
        id: 'events',
        name: 'Events',
        description: 'Special occasions',
        icon: '🎉',
      },
    ],
  },
  {
    id: 'documents',
    name: 'Documents',
    description: 'Organize important files',
    icon: '📄',
    children: [
      {
        id: 'work',
        name: 'Work Documents',
        description: 'Professional files',
        icon: '💼',
      },
      {
        id: 'personal',
        name: 'Personal Documents',
        description: 'Personal paperwork',
        icon: '🏠',
      },
    ],
  },
  {
    id: 'music',
    name: 'Music',
    description: 'Share your playlists',
    icon: '🎵',
    children: [
      {
        id: 'rock',
        name: 'Rock',
        description: 'Rock music collection',
        icon: '🎸',
      },
      { id: 'jazz', name: 'Jazz', description: 'Jazz recordings', icon: '🎷' },
      {
        id: 'classical',
        name: 'Classical',
        description: 'Classical compositions',
        icon: '🎼',
      },
    ],
  },
];

export const Default: Story = {
  args: {
    availableTypes: mockCollectionTypes,
    onSubmit: data => {
      console.log('Collection created:', data);
      alert(
        `Created collection: ${data.name} (${data.type.name}) - Privacy: ${data.privacy}`
      );
    },
  },
};

export const MinimalTypes: Story = {
  args: {
    availableTypes: [
      {
        id: 'simple',
        name: 'Simple Collection',
        description: 'Basic collection type',
        icon: '📁',
      },
    ],
    onSubmit: data => {
      console.log('Simple collection created:', data);
    },
  },
};
