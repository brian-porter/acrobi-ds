import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './select';
import { useState } from 'react';

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='w-80'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
];

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select a fruit...',
  },
};

export const WithValue: Story = {
  args: {
    options: basicOptions,
    value: 'apple',
    placeholder: 'Select a fruit...',
  },
};

export const WithError: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select a fruit...',
    error: 'Please select a fruit',
    variant: 'error',
  },
};

export const WithHelperText: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select a fruit...',
    helperText: 'Choose your favorite fruit from the list',
  },
};

export const Success: Story = {
  args: {
    options: basicOptions,
    value: 'apple',
    placeholder: 'Select a fruit...',
    variant: 'success',
    helperText: 'Great choice!',
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select a fruit...',
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  args: {
    options: basicOptions,
    value: 'apple',
    placeholder: 'Select a fruit...',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    options: basicOptions,
    size: 'sm',
    placeholder: 'Small select...',
  },
};

export const Large: Story = {
  args: {
    options: basicOptions,
    size: 'lg',
    placeholder: 'Large select...',
  },
};

export const Searchable: Story = {
  args: {
    options: countryOptions,
    searchable: true,
    placeholder: 'Select a country...',
    searchPlaceholder: 'Search countries...',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'available1', label: 'Available Option 1' },
      { value: 'disabled1', label: 'Disabled Option 1', disabled: true },
      { value: 'available2', label: 'Available Option 2' },
      { value: 'disabled2', label: 'Disabled Option 2', disabled: true },
      { value: 'available3', label: 'Available Option 3' },
    ],
    placeholder: 'Select an option...',
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');

    return (
      <div className='space-y-4'>
        <Select
          options={basicOptions}
          value={value}
          onValueChange={setValue}
          placeholder='Select a fruit...'
          helperText={
            value
              ? `You selected: ${basicOptions.find(opt => opt.value === value)?.label}`
              : 'No selection made'
          }
        />

        <div className='text-sm text-muted-foreground'>
          Current value: {value || 'None'}
        </div>
      </div>
    );
  },
};

export const SearchableCountries: Story = {
  render: () => {
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    return (
      <Select
        options={countryOptions}
        value={selectedCountry}
        onValueChange={setSelectedCountry}
        searchable
        placeholder='Select your country...'
        searchPlaceholder='Search countries...'
        helperText='Start typing to search for a country'
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='space-y-4'>
      <div>
        <label className='text-sm font-medium'>Small</label>
        <Select
          options={basicOptions}
          size='sm'
          placeholder='Small select...'
        />
      </div>
      <div>
        <label className='text-sm font-medium'>Medium (Default)</label>
        <Select
          options={basicOptions}
          size='md'
          placeholder='Medium select...'
        />
      </div>
      <div>
        <label className='text-sm font-medium'>Large</label>
        <Select
          options={basicOptions}
          size='lg'
          placeholder='Large select...'
        />
      </div>
    </div>
  ),
};
