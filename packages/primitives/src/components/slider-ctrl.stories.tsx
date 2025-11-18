import type { Meta, StoryObj } from '@storybook/react';
import { SliderCtrl } from './slider-ctrl';
import { useState } from 'react';

const meta = {
  title: 'Primitives/SliderCtrl',
  component: SliderCtrl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
SliderCtrl component using authentic Acrobi Design System styling.

This component provides both single and dual (range) slider functionality with Finsweet integration for CMS filtering.

**Key Features:**
- Uses authentic Acrobi CSS classes: \`.slider\`, \`.slider_wrapper\`, \`.slider_track\`, \`.slider_handle\`, \`.slider_fill\`
- Supports both single slider and dual (range) slider modes
- Integrates with Finsweet Range Slider via \`fs-rangeslider-element\` attributes
- Provides modern React API alongside devlink compatibility
- Interactive drag handles with visual feedback
- Input fields for direct value entry
- CMS filter integration for price filtering
- Customizable value formatting and labels

**CSS Classes Used:**
- \`.slider\` - Main slider container
- \`.slider_wrapper\` - Wrapper for slider functionality
- \`.slider_track\` - Track line
- \`.slider_handle\` - Draggable handles
- \`.slider_fill\` - Filled portion of track
- \`.slider_input\` - Text input for direct value entry
- \`.slider_values\` - Value display container
- \`.slider_handle-value\` - Handle value display
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    single: {
      control: 'boolean',
      description: 'Enable single slider mode - devlink API',
    },
    dual: {
      control: 'boolean',
      description: 'Enable dual slider mode (range) - devlink API',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step increment',
    },
    start: {
      control: 'number',
      description:
        'Start value for single slider or first handle in dual mode - devlink API',
    },
    start2: {
      control: 'number',
      description: 'Start value for second handle in dual mode - devlink API',
    },
    showValueLabels: {
      control: 'boolean',
      description: 'Show value labels on handles - modern API',
    },
    showMinMaxLabels: {
      control: 'boolean',
      description: 'Show min/max labels - modern API',
    },
    showInputs: {
      control: 'boolean',
      description: 'Show input fields for direct value entry',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Slider size',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'expanded'],
      description: 'Component variant',
    },
  },
} satisfies Meta<typeof SliderCtrl>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single Slider Stories (Devlink API)

export const SingleSlider: Story = {
  args: {
    single: true,
    dual: false,
    min: 0,
    max: 100,
    start: 25,
    step: 1,
    showInputs: true,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Single slider using devlink API with one handle and value input.',
      },
    },
  },
};

export const SingleSliderWithLabels: Story = {
  args: {
    single: true,
    dual: false,
    min: 0,
    max: 100,
    start: 50,
    step: 5,
    showInputs: true,
    showValueLabels: true,
    showMinMaxLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Single slider with value labels and min/max display.',
      },
    },
  },
};

export const SingleSliderLarge: Story = {
  args: {
    single: true,
    dual: false,
    min: 0,
    max: 1000,
    start: 250,
    step: 25,
    size: 'lg',
    showValueLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Large single slider for bigger value ranges.',
      },
    },
  },
};

// Dual Slider Stories (Devlink API)

export const DualSlider: Story = {
  args: {
    single: false,
    dual: true,
    min: 0,
    max: 1000,
    start: 200,
    start2: 800,
    step: 10,
    showInputs: true,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dual (range) slider using devlink API with two handles and from/to inputs.',
      },
    },
  },
};

export const DualSliderWithLabels: Story = {
  args: {
    single: false,
    dual: true,
    min: 0,
    max: 500,
    start: 100,
    start2: 400,
    step: 5,
    showInputs: true,
    showValueLabels: true,
    showMinMaxLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dual slider with value labels on handles and min/max display.',
      },
    },
  },
};

export const PriceRangeSlider: Story = {
  args: {
    single: false,
    dual: true,
    min: 0,
    max: 10000,
    start: 1000,
    start2: 7500,
    step: 100,
    showInputs: true,
    showValueLabels: true,
    cmsFilterField: 'price',
    formatValue: (value: number) => `$${value.toLocaleString()}`,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Price range slider with currency formatting and CMS filter integration.',
      },
    },
  },
};

// Modern API Stories

export const ModernSingleSlider: Story = {
  args: {
    values: [30],
    min: 0,
    max: 100,
    step: 1,
    showValueLabels: true,
    showMinMaxLabels: true,
    onValueChange: (values: number[]) => console.log('Values:', values),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Single slider using modern React API with values prop and onValueChange callback.',
      },
    },
  },
};

export const ModernRangeSlider: Story = {
  args: {
    values: [25, 75],
    min: 0,
    max: 100,
    step: 1,
    showValueLabels: true,
    showMinMaxLabels: true,
    onValueChange: (values: number[]) => console.log('Values:', values),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Range slider using modern React API with array values and callback.',
      },
    },
  },
};

// Interactive Examples

export const InteractiveSingleSlider: Story = {
  render: () => {
    const [value, setValue] = useState([42]);

    return (
      <div className='w-full max-w-md space-y-4'>
        <SliderCtrl
          values={value}
          min={0}
          max={100}
          step={1}
          onValueChange={setValue}
          showValueLabels={true}
          showMinMaxLabels={true}
          formatValue={val => `${val}%`}
        />

        <div className='text-sm text-gray-600'>
          Current value: <strong>{value[0]}%</strong>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive single slider with state management and percentage formatting.',
      },
    },
  },
};

export const InteractiveRangeSlider: Story = {
  render: () => {
    const [values, setValues] = useState([20, 80]);

    return (
      <div className='w-full max-w-md space-y-4'>
        <SliderCtrl
          values={values}
          min={0}
          max={100}
          step={1}
          onValueChange={setValues}
          showValueLabels={true}
          showMinMaxLabels={true}
          showInputs={true}
        />

        <div className='text-sm text-gray-600'>
          Range:{' '}
          <strong>
            {values[0]} - {values[1]}
          </strong>
          <br />
          Span: <strong>{values[1] - values[0]}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive range slider with live range calculation and input fields.',
      },
    },
  },
};

export const InteractivePriceSlider: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState([500, 2500]);

    const formatPrice = (value: number) => `$${value.toLocaleString()}`;

    return (
      <div className='w-full max-w-lg space-y-4'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Price Range Filter</h3>
          <SliderCtrl
            values={priceRange}
            min={0}
            max={5000}
            step={50}
            onValueChange={setPriceRange}
            showValueLabels={true}
            showMinMaxLabels={true}
            showInputs={true}
            formatValue={formatPrice}
            cmsFilterField='price'
            size='lg'
          />
        </div>

        <div className='p-4 bg-gray-50 rounded-lg'>
          <div className='text-sm text-gray-600 space-y-1'>
            <div>
              Min Price: <strong>{formatPrice(priceRange[0])}</strong>
            </div>
            <div>
              Max Price: <strong>{formatPrice(priceRange[1])}</strong>
            </div>
            <div>
              Price Range:{' '}
              <strong>{formatPrice(priceRange[1] - priceRange[0])}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Price filter slider with currency formatting, range display, and CMS integration.',
      },
    },
  },
};

// Size Variants

export const SmallSlider: Story = {
  args: {
    values: [40],
    min: 0,
    max: 100,
    step: 1,
    size: 'sm',
    showValueLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size slider variant.',
      },
    },
  },
};

export const MediumSlider: Story = {
  args: {
    values: [50],
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    showValueLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium size slider variant (default).',
      },
    },
  },
};

export const LargeSlider: Story = {
  args: {
    values: [60],
    min: 0,
    max: 100,
    step: 1,
    size: 'lg',
    showValueLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size slider variant.',
      },
    },
  },
};

// Special Cases

export const DisabledSlider: Story = {
  args: {
    values: [30, 70],
    min: 0,
    max: 100,
    step: 1,
    disabled: true,
    showValueLabels: true,
    showInputs: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled slider that cannot be interacted with.',
      },
    },
  },
};

export const SteppedSlider: Story = {
  args: {
    values: [25, 75],
    min: 0,
    max: 100,
    step: 25,
    showValueLabels: true,
    showMinMaxLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with large step increments (25).',
      },
    },
  },
};

export const NoInputsSlider: Story = {
  args: {
    values: [40, 80],
    min: 0,
    max: 100,
    step: 1,
    showInputs: false,
    showValueLabels: true,
    showMinMaxLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider without input fields, handle interaction only.',
      },
    },
  },
};

export const CustomFormattingSlider: Story = {
  args: {
    values: [2.5],
    min: 0,
    max: 5,
    step: 0.1,
    showValueLabels: true,
    showMinMaxLabels: true,
    formatValue: (value: number) => `${value.toFixed(1)} ★`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with custom value formatting (star rating).',
      },
    },
  },
};

// API Comparison

export const APIComparison: Story = {
  render: () => (
    <div className='space-y-8 w-full max-w-2xl'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>
          Devlink API (Backward Compatibility)
        </h3>
        <div className='space-y-4'>
          <div>
            <h4 className='font-medium mb-2'>Single Slider</h4>
            <SliderCtrl
              single={true}
              dual={false}
              min={0}
              max={100}
              start={25}
              step={1}
              showInputs={true}
            />
            <p className='text-sm text-gray-600 mt-2'>
              Uses single/dual props with start/start2 values
            </p>
          </div>

          <div>
            <h4 className='font-medium mb-2'>Dual Slider</h4>
            <SliderCtrl
              single={false}
              dual={true}
              min={0}
              max={100}
              start={25}
              start2={75}
              step={1}
              showInputs={true}
            />
            <p className='text-sm text-gray-600 mt-2'>
              Uses dual=true with start and start2 props
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Modern API (Recommended)</h3>
        <div className='space-y-4'>
          <div>
            <h4 className='font-medium mb-2'>Single Slider</h4>
            <SliderCtrl
              values={[25]}
              min={0}
              max={100}
              step={1}
              onValueChange={values => console.log('Single values:', values)}
              showValueLabels={true}
            />
            <p className='text-sm text-gray-600 mt-2'>
              Uses values array and onValueChange callback
            </p>
          </div>

          <div>
            <h4 className='font-medium mb-2'>Range Slider</h4>
            <SliderCtrl
              values={[25, 75]}
              min={0}
              max={100}
              step={1}
              onValueChange={values => console.log('Range values:', values)}
              showValueLabels={true}
            />
            <p className='text-sm text-gray-600 mt-2'>
              Uses values array with two elements for range
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison between devlink API and modern React API approaches.',
      },
    },
  },
};
