import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './slider';
import { useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: 'Primitives/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='w-80 p-4'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'dual'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    start: 50,
    min: 0,
    max: 100,
  },
};

export const WithLabels: Story = {
  args: {
    label: 'Sample Label',
    start: 25,
    min: 0,
    max: 100,
    showLabels: true,
  },
};

export const Range: Story = {
  args: {
    label: 'Range Slider',
    type: 'dual',
    start: 25,
    start2: 75,
    min: 0,
    max: 100,
    showLabels: true,
  },
};

export const CustomRange: Story = {
  args: {
    label: 'Price Range',
    start: 2500,
    min: 1000,
    max: 5000,
    step: 100,
    showLabels: true,
    formatLabel: value => `$${value}`,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Slider',
    start: 30,
    showLabels: true,
  },
};

export const Large: Story = {
  args: {
    label: 'Large Slider',
    start: 70,
    showLabels: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Slider',
    start: 40,
    disabled: true,
    showLabels: true,
  },
};

export const Vertical: Story = {
  render: () => (
    <div className='h-48 flex justify-center'>
      <Slider label='Vertical Slider' start={60} showLabels={true} />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState([50]);

    return (
      <div className='space-y-4'>
        <Slider
          label='Interactive Slider'
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          showLabels={true}
        />

        <div className='text-sm text-muted-foreground p-3 bg-muted rounded'>
          Current value: {value[0]}
        </div>
      </div>
    );
  },
};

export const PriceRange: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState([200, 800]);

    return (
      <div className='space-y-4'>
        <Slider
          label='Price Range'
          type='dual'
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={1000}
          step={50}
          showLabels={true}
          formatLabel={value => `$${value}`}
        />

        <div className='text-sm text-muted-foreground'>
          Selected range: ${priceRange[0]} - ${priceRange[1]}
        </div>
      </div>
    );
  },
};

export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = useState([75]);

    return (
      <div className='space-y-4'>
        <div className='flex items-center space-x-3'>
          <span className='text-2xl'>🔊</span>
          <Slider value={volume} onValueChange={setVolume} min={0} max={100} />
          <span className='text-sm font-mono w-8'>{volume[0]}</span>
        </div>
      </div>
    );
  },
};

export const BrightnessControl: Story = {
  render: () => {
    const [brightness, setBrightness] = useState([60]);

    return (
      <div className='space-y-4'>
        <div className='flex items-center space-x-3'>
          <span className='text-2xl'>☀️</span>
          <Slider
            value={brightness}
            onValueChange={setBrightness}
            min={0}
            max={100}
          />
          <span className='text-sm font-mono w-8'>{brightness[0]}%</span>
        </div>

        <div
          className='h-16 rounded-lg transition-all duration-200'
          style={{
            backgroundColor: `hsl(45, 100%, ${20 + brightness[0] * 0.6}%)`,
          }}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='space-y-8'>
      <Slider label='Small' start={25} showLabels />
      <Slider label='Medium (Default)' start={50} showLabels />
      <Slider label='Large' start={75} showLabels />
    </div>
  ),
};

export const AgeRange: Story = {
  render: () => {
    const [ageRange, setAgeRange] = useState([25, 45]);

    return (
      <div className='space-y-4'>
        <Slider
          label='Age Range'
          type='dual'
          value={ageRange}
          onValueChange={setAgeRange}
          min={18}
          max={65}
          step={1}
          showLabels={true}
          formatLabel={value => `${value} years`}
        />

        <div className='text-sm text-muted-foreground p-3 bg-muted rounded'>
          Looking for people aged {ageRange[0]} to {ageRange[1]} years old
        </div>
      </div>
    );
  },
};

// QA TEST: Screenshot Match - This should exactly match the Webflow screenshot
export const ScreenshotMatch: Story = {
  render: () => {
    return (
      <div className='w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg'>
        <h2 className='text-xl font-normal mb-8 text-gray-900'>Sample</h2>

        <Slider
          label='Label'
          type='single'
          min={0}
          max={100}
          start={30}
          showInputs={false}
          visible={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story exactly matches the Webflow screenshot: Label positioned above blue slider track with circular blue handle at 30% position.',
      },
    },
  },
};

// QA TEST: Acrobi Styling Test - Test authentic Acrobi classes
export const AcrobiStylingTest: Story = {
  render: () => {
    return (
      <div className='space-y-6'>
        <Slider
          label='Single Handle Slider (Acrobi Classes)'
          type='single'
          min={0}
          max={100}
          start={25}
          wrapperId='test-wrapper'
          trackId='test-track'
          handleId='test-handle'
          fillId='test-fill'
        />

        <Slider
          label='Dual Handle Slider (Acrobi Classes)'
          type='dual'
          min={0}
          max={1000}
          start={200}
          start2={800}
          showLabels={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tests authentic Acrobi CSS classes: .slider, .slider_wrapper, .slider_track, .slider_handle, .slider_fill with proper field structure and blue color scheme.',
      },
    },
  },
};

export const TemperatureControl: Story = {
  render: () => {
    const [temperature, setTemperature] = useState([72]);

    const getTemperatureColor = (temp: number) => {
      if (temp < 60) return 'hsl(240, 100%, 70%)'; // Blue for cold
      if (temp < 70) return 'hsl(180, 100%, 70%)'; // Cyan for cool
      if (temp < 75) return 'hsl(120, 100%, 70%)'; // Green for comfortable
      if (temp < 80) return 'hsl(60, 100%, 70%)'; // Yellow for warm
      return 'hsl(0, 100%, 70%)'; // Red for hot
    };

    return (
      <div className='space-y-4'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm font-medium'>Thermostat</span>
          <span
            className='text-lg font-bold px-2 py-1 rounded'
            style={{ color: getTemperatureColor(temperature[0]) }}
          >
            {temperature[0]}°F
          </span>
        </div>

        <Slider
          value={temperature}
          onValueChange={setTemperature}
          min={55}
          max={85}
          step={1}
          showLabels={true}
          formatLabel={value => `${value}°F`}
        />

        <div className='text-xs text-muted-foreground text-center'>
          {temperature[0] < 60 && '🥶 Too cold'}
          {temperature[0] >= 60 && temperature[0] < 70 && '❄️ Cool'}
          {temperature[0] >= 70 && temperature[0] < 75 && '😌 Perfect'}
          {temperature[0] >= 75 && temperature[0] < 80 && '🌡️ Warm'}
          {temperature[0] >= 80 && '🔥 Hot'}
        </div>
      </div>
    );
  },
};
