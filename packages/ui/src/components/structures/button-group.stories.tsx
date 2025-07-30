import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup } from './button-group';
// Removed Button import to avoid cross-component dependencies
import { useState } from 'react';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Structures/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

const textFormatOptions = [
  { value: 'bold', label: 'B', icon: <strong>B</strong> },
  { value: 'italic', label: 'I', icon: <em>I</em> },
  { value: 'underline', label: 'U', icon: <u>U</u> },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    value: 'center',
  },
};

export const WithIcons: Story = {
  args: {
    options: textFormatOptions,
    value: 'bold',
  },
};

export const Multiple: Story = {
  args: {
    options: textFormatOptions,
    multiple: true,
    values: ['bold', 'italic'],
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    value: 'option2',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    options: basicOptions,
    value: 'left',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    options: basicOptions,
    value: 'right',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    options: basicOptions,
    value: 'center',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Available' },
      { value: 'option2', label: 'Disabled', disabled: true },
      { value: 'option3', label: 'Available' },
    ],
    value: 'option1',
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    value: 'center',
    disabled: true,
  },
};

export const CustomChildren: Story = {
  render: () => (
    <ButtonGroup>
      <button className='px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50'>
        First
      </button>
      <button className='px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50'>
        Second
      </button>
      <button className='px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50'>
        Third
      </button>
    </ButtonGroup>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [alignment, setAlignment] = useState('left');

    const alignmentOptions = [
      { value: 'left', label: '←', icon: '←' },
      { value: 'center', label: '↔', icon: '↔' },
      { value: 'right', label: '→', icon: '→' },
      { value: 'justify', label: '⟷', icon: '⟷' },
    ];

    return (
      <div className='space-y-4'>
        <div>
          <label className='text-sm font-medium'>Text Alignment</label>
          <ButtonGroup
            options={alignmentOptions}
            value={alignment}
            onValueChange={setAlignment}
            variant='outline'
          />
        </div>

        <div className='p-4 border rounded-lg'>
          <p
            className={`text-sm transition-all ${
              alignment === 'left'
                ? 'text-left'
                : alignment === 'center'
                  ? 'text-center'
                  : alignment === 'right'
                    ? 'text-right'
                    : 'text-justify'
            }`}
          >
            This text alignment will change based on your selection above. The
            current alignment is: <strong>{alignment}</strong>
          </p>
        </div>
      </div>
    );
  },
};

export const TextFormatting: Story = {
  render: () => {
    const [formats, setFormats] = useState(['bold']);

    const formatOptions = [
      { value: 'bold', label: 'Bold' },
      { value: 'italic', label: 'Italic' },
      { value: 'underline', label: 'Underline' },
      { value: 'strikethrough', label: 'Strike' },
    ];

    return (
      <div className='space-y-4'>
        <div>
          <label className='text-sm font-medium'>Text Formatting</label>
          <ButtonGroup
            options={formatOptions}
            values={formats}
            onValuesChange={setFormats}
            multiple
            size='sm'
          />
        </div>

        <div className='p-4 border rounded-lg'>
          <p
            className={`transition-all ${
              formats.includes('bold') ? 'font-bold' : ''
            } ${formats.includes('italic') ? 'italic' : ''} ${
              formats.includes('underline') ? 'underline' : ''
            } ${formats.includes('strikethrough') ? 'line-through' : ''}`}
          >
            Sample text with formatting applied: {formats.join(', ') || 'none'}
          </p>
        </div>
      </div>
    );
  },
};

export const ViewModes: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState('grid');

    const viewOptions = [
      { value: 'list', label: '☰', icon: '☰' },
      { value: 'grid', label: '⊞', icon: '⊞' },
      { value: 'card', label: '⊡', icon: '⊡' },
    ];

    return (
      <div className='space-y-4'>
        <div className='flex justify-between items-center'>
          <label className='text-sm font-medium'>View Mode</label>
          <ButtonGroup
            options={viewOptions}
            value={viewMode}
            onValueChange={setViewMode}
            size='sm'
            variant='ghost'
          />
        </div>

        <div className='p-6 border rounded-lg min-h-32'>
          {viewMode === 'list' && (
            <div className='space-y-2'>
              <div className='p-2 bg-muted rounded'>List Item 1</div>
              <div className='p-2 bg-muted rounded'>List Item 2</div>
              <div className='p-2 bg-muted rounded'>List Item 3</div>
            </div>
          )}

          {viewMode === 'grid' && (
            <div className='grid grid-cols-2 gap-3'>
              <div className='p-4 bg-muted rounded'>Grid Item 1</div>
              <div className='p-4 bg-muted rounded'>Grid Item 2</div>
              <div className='p-4 bg-muted rounded'>Grid Item 3</div>
              <div className='p-4 bg-muted rounded'>Grid Item 4</div>
            </div>
          )}

          {viewMode === 'card' && (
            <div className='flex space-x-3'>
              <div className='p-4 bg-muted rounded-lg flex-1'>Card 1</div>
              <div className='p-4 bg-muted rounded-lg flex-1'>Card 2</div>
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <label className='text-sm font-medium'>Small</label>
        <ButtonGroup size='sm' options={basicOptions} value='left' />
      </div>
      <div>
        <label className='text-sm font-medium'>Default</label>
        <ButtonGroup size='default' options={basicOptions} value='center' />
      </div>
      <div>
        <label className='text-sm font-medium'>Large</label>
        <ButtonGroup size='lg' options={basicOptions} value='right' />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <label className='text-sm font-medium'>Default</label>
        <ButtonGroup variant='default' options={basicOptions} value='left' />
      </div>
      <div>
        <label className='text-sm font-medium'>Outline</label>
        <ButtonGroup variant='outline' options={basicOptions} value='center' />
      </div>
      <div>
        <label className='text-sm font-medium'>Ghost</label>
        <ButtonGroup variant='ghost' options={basicOptions} value='right' />
      </div>
    </div>
  ),
};
