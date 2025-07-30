import type { Meta, StoryObj } from '@storybook/react';
import { RateCtrl } from './rate-ctrl';

const meta = {
  title: 'Primitives/RateCtrl',
  component: RateCtrl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
RateCtrl (Rating Control) component using authentic Acrobi Design System styling.

This component supports both the original devlink API (individual rate points) and a modern React API (rating value).

**Key Features:**
- Uses authentic Acrobi CSS classes: \`.rating_wrap\`, \`.rating_main\`, \`.rpoint\`
- Integrates with Finsweet star rating system via \`fs-starrating-element\`
- Supports both devlink API (individual rate controls) and modern API (rating value)
- Interactive rating with hover effects and click handlers
- Displays current rating value with authentic styling

**CSS Classes Used:**
- \`.rating_wrap\` - Main rating container
- \`.rating_main\` - Rating stars container  
- \`.rpoint\` - Individual star wrapper
- \`.rating_rdobtn\` - Hidden radio button for form compatibility
- \`.rating_bg\` - Star background/icon container
- \`.rating_on\` - Active state label
- \`.label_wrap\` - Rating value display container
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Rating value (0-5) - devlink API',
    },
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: 'Current rating value - modern API',
    },
    maxRating: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Maximum rating (1-10) - modern API',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether rating is interactive - modern API',
    },
    showValue: {
      control: 'boolean',
      description: 'Show rating value as text - modern API',
    },
    starSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Star size - modern API',
    },
    variant: {
      control: 'select',
      options: ['default', 'interactive', 'readonly'],
      description: 'Component variant',
    },
    rate1: {
      control: 'boolean',
      description: 'Enable rate point 1 - devlink API',
    },
    rate2: {
      control: 'boolean',
      description: 'Enable rate point 2 - devlink API',
    },
    rate3: {
      control: 'boolean',
      description: 'Enable rate point 3 - devlink API',
    },
    rate4: {
      control: 'boolean',
      description: 'Enable rate point 4 - devlink API',
    },
    rate5: {
      control: 'boolean',
      description: 'Enable rate point 5 - devlink API',
    },
  },
} satisfies Meta<typeof RateCtrl>;

export default meta;
type Story = StoryObj<typeof meta>;

// Modern API Stories

export const InteractiveRating: Story = {
  args: {
    rating: 3,
    maxRating: 5,
    interactive: true,
    showValue: true,
    starSize: 'md',
    variant: 'interactive',
    onRatingChange: (rating: number) => console.log('Rating changed:', rating),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive rating using modern API. Click stars to change rating.',
      },
    },
  },
};

export const ReadOnlyRating: Story = {
  args: {
    rating: 4,
    maxRating: 5,
    interactive: false,
    showValue: true,
    starSize: 'md',
    variant: 'readonly',
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only rating display using modern API.',
      },
    },
  },
};

export const LargeRating: Story = {
  args: {
    rating: 5,
    maxRating: 5,
    interactive: true,
    showValue: true,
    starSize: 'lg',
    variant: 'interactive',
    onRatingChange: (rating: number) => console.log('Rating changed:', rating),
  },
  parameters: {
    docs: {
      description: {
        story: 'Large interactive rating using modern API.',
      },
    },
  },
};

export const SmallRating: Story = {
  args: {
    rating: 2,
    maxRating: 5,
    interactive: true,
    showValue: true,
    starSize: 'sm',
    variant: 'interactive',
    onRatingChange: (rating: number) => console.log('Rating changed:', rating),
  },
  parameters: {
    docs: {
      description: {
        story: 'Small interactive rating using modern API.',
      },
    },
  },
};

export const TenStarRating: Story = {
  args: {
    rating: 7,
    maxRating: 10,
    interactive: true,
    showValue: true,
    starSize: 'md',
    variant: 'interactive',
    onRatingChange: (rating: number) => console.log('Rating changed:', rating),
  },
  parameters: {
    docs: {
      description: {
        story: 'Ten-star rating system using modern API.',
      },
    },
  },
};

export const NoValueDisplay: Story = {
  args: {
    rating: 3,
    maxRating: 5,
    interactive: true,
    showValue: false,
    starSize: 'md',
    variant: 'interactive',
    onRatingChange: (rating: number) => console.log('Rating changed:', rating),
  },
  parameters: {
    docs: {
      description: {
        story: 'Rating without value display using modern API.',
      },
    },
  },
};

// Devlink API Stories

export const DevlinkThreeStars: Story = {
  args: {
    value: '3',
    rate1: true,
    rate2: true,
    rate3: true,
    rate4: false,
    rate5: false,
    rate1State: 'Star',
    rate2State: 'Star',
    rate3State: 'Star',
    rate4State: 'Star',
    rate5State: 'Star',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Three-star rating using original devlink API with individual rate controls.',
      },
    },
  },
};

export const DevlinkFiveStars: Story = {
  args: {
    value: '5',
    rate1: true,
    rate2: true,
    rate3: true,
    rate4: true,
    rate5: true,
    rate1State: 'Excellent',
    rate2State: 'Great',
    rate3State: 'Good',
    rate4State: 'Very Good',
    rate5State: 'Perfect',
  },
  parameters: {
    docs: {
      description: {
        story: 'Five-star rating using devlink API with custom state labels.',
      },
    },
  },
};

export const DevlinkPartialRating: Story = {
  args: {
    value: '2',
    rate1: true,
    rate2: true,
    rate3: false,
    rate4: false,
    rate5: false,
    rate1State: 'Star',
    rate2State: 'Star',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Partial rating using devlink API with only first two stars enabled.',
      },
    },
  },
};

export const DevlinkZeroRating: Story = {
  args: {
    value: '0',
    rate1: false,
    rate2: false,
    rate3: false,
    rate4: false,
    rate5: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Zero rating using devlink API with no stars enabled.',
      },
    },
  },
};

export const DevlinkWithHoverHandlers: Story = {
  args: {
    value: '4',
    rate1: true,
    rate2: true,
    rate3: true,
    rate4: true,
    rate5: false,
    rate1Over: { onMouseEnter: () => console.log('Hover star 1') },
    rate2Over: { onMouseEnter: () => console.log('Hover star 2') },
    rate3Over: { onMouseEnter: () => console.log('Hover star 3') },
    rate4Over: { onMouseEnter: () => console.log('Hover star 4') },
  },
  parameters: {
    docs: {
      description: {
        story: 'Devlink API with hover handlers for individual stars.',
      },
    },
  },
};

// Comparison Stories

export const APIComparison: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Modern API (Recommended)</h3>
        <div className='space-y-4'>
          <RateCtrl
            rating={4}
            maxRating={5}
            interactive={true}
            showValue={true}
            starSize='md'
            variant='interactive'
            onRatingChange={rating => console.log('Modern API Rating:', rating)}
          />
          <p className='text-sm text-gray-600'>
            Uses modern React patterns with rating prop and onRatingChange
            callback
          </p>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>
          Devlink API (Backward Compatibility)
        </h3>
        <div className='space-y-4'>
          <RateCtrl
            value='4'
            rate1={true}
            rate2={true}
            rate3={true}
            rate4={true}
            rate5={false}
            rate1State='Star'
            rate2State='Star'
            rate3State='Star'
            rate4State='Star'
          />
          <p className='text-sm text-gray-600'>
            Uses individual rate props for backward compatibility with devlink
            API
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison between modern API and devlink API approaches.',
      },
    },
  },
};

// Edge Cases

export const EmptyRating: Story = {
  args: {
    rating: 0,
    maxRating: 5,
    interactive: true,
    showValue: true,
    starSize: 'md',
    variant: 'interactive',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty rating state (0 stars selected).',
      },
    },
  },
};

export const DisabledRating: Story = {
  args: {
    rating: 3,
    maxRating: 5,
    interactive: false,
    showValue: true,
    starSize: 'md',
    variant: 'readonly',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled/readonly rating that cannot be changed.',
      },
    },
  },
};

export const WithCustomId: Story = {
  args: {
    rating: 3,
    maxRating: 5,
    interactive: true,
    showValue: true,
    rateId: 'custom-rating-id',
    starSize: 'md',
    variant: 'interactive',
  },
  parameters: {
    docs: {
      description: {
        story: 'Rating with custom ID for form integration.',
      },
    },
  },
};
