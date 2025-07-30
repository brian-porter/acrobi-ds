import type { Meta, StoryObj } from '@storybook/react';
import { HeroStack } from './hero-stack';
import { Button } from '../primitives/button';

const meta: Meta<typeof HeroStack> = {
  title: 'Structures/HeroStack',
  component: HeroStack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Hero stack component with image, icon, headline, and optional back button using authentic Acrobi Design System styling.',
      },
    },
  },
  decorators: [
    Story => (
      <div className='w-96'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'centered', 'compact'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    showImage: {
      control: { type: 'boolean' },
    },
    showIcon: {
      control: { type: 'boolean' },
    },
    showSubtitle: {
      control: { type: 'boolean' },
    },
    showBackButton: {
      control: { type: 'boolean' },
    },
    iconSize: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl', '2xl'],
    },
    iconColor: {
      control: 'select',
      options: ['p500', 'n700', 'n500', 'n300', 'inherit'],
    },
    headlineSize: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    align: {
      control: 'select',
      options: ['l', 'c', 'r'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroStack>;

export const Default: Story = {
  args: {
    showImage: true,
    imageSrc:
      'https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg',
    headlineText: 'Welcome to Acrobi',
    subtitleText: 'Get started by exploring the design system components.',
    showSubtitle: true,
  },
};

export const WithIcon: Story = {
  args: {
    showImage: false,
    showIcon: true,
    iconName: 'star',
    iconColor: 'p500',
    iconSize: '2xl',
    headlineText: 'Featured Content',
    subtitleText: 'This hero stack showcases an icon instead of an image.',
    showSubtitle: true,
  },
};

export const WithBackButton: Story = {
  args: {
    showImage: true,
    headlineText: 'Settings Updated',
    subtitleText: 'Your preferences have been saved successfully.',
    showSubtitle: true,
    showBackButton: true,
    backButtonText: 'Back to Settings',
    backButtonIcon: 'nav_left',
    onBackClick: () => console.log('Back button clicked'),
  },
};

export const ImageOnly: Story = {
  args: {
    showImage: true,
    imageSize: 'large',
    headlineText: 'Visual Impact',
    subtitleText: 'Sometimes an image says it all.',
    showSubtitle: true,
    showIcon: false,
  },
};

export const IconOnly: Story = {
  args: {
    showImage: false,
    showIcon: true,
    iconName: 'checkmark',
    iconColor: 'p500',
    iconSize: '2xl',
    headlineText: 'Task Completed',
    subtitleText: 'Your action was successful.',
    showSubtitle: true,
  },
};

export const TextOnly: Story = {
  args: {
    showImage: false,
    showIcon: false,
    headlineText: 'Simple Message',
    subtitleText: 'Clean and minimal hero stack with just text.',
    showSubtitle: true,
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Small Headline</h3>
        <HeroStack
          showIcon={true}
          iconName='star'
          headlineText='Small Hero'
          headlineSize='h5'
          subtitleText='Compact version with smaller text.'
          showSubtitle={true}
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>
          Medium Headline (Default)
        </h3>
        <HeroStack
          showIcon={true}
          iconName='star'
          headlineText='Medium Hero'
          headlineSize='h4'
          subtitleText='Standard size for most use cases.'
          showSubtitle={true}
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Large Headline</h3>
        <HeroStack
          showIcon={true}
          iconName='star'
          headlineText='Large Hero'
          headlineSize='h3'
          subtitleText='Prominent display for important content.'
          showSubtitle={true}
        />
      </div>
    </div>
  ),
};

export const DifferentAlignments: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Left Aligned</h3>
        <HeroStack
          showIcon={true}
          iconName='align_left'
          headlineText='Left Aligned Hero'
          subtitleText='Content aligned to the left side.'
          showSubtitle={true}
          align='l'
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Center Aligned (Default)</h3>
        <HeroStack
          showIcon={true}
          iconName='align_center'
          headlineText='Center Aligned Hero'
          subtitleText='Content centered horizontally.'
          showSubtitle={true}
          align='c'
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Right Aligned</h3>
        <HeroStack
          showIcon={true}
          iconName='align_right'
          headlineText='Right Aligned Hero'
          subtitleText='Content aligned to the right side.'
          showSubtitle={true}
          align='r'
        />
      </div>
    </div>
  ),
};

export const WithCustomContent: Story = {
  args: {
    showImage: true,
    headlineText: 'Get Started Today',
    subtitleText: 'Join thousands of users who trust our platform.',
    showSubtitle: true,
  },
  render: args => (
    <HeroStack {...args}>
      <div className='flex gap-3 mt-6'>
        <Button variant='default' size='m'>
          Get Started
        </Button>
        <Button variant='outline' size='m'>
          Learn More
        </Button>
      </div>
    </HeroStack>
  ),
};

export const EmptyState: Story = {
  args: {
    showImage: false,
    showIcon: true,
    iconName: 'empty_folder',
    iconColor: 'n500',
    iconSize: '2xl',
    headlineText: 'No Items Found',
    subtitleText: 'Try adjusting your search criteria or create a new item.',
    showSubtitle: true,
  },
  render: args => (
    <HeroStack {...args}>
      <div className='mt-6'>
        <Button variant='default' size='m'>
          Create New Item
        </Button>
      </div>
    </HeroStack>
  ),
};

export const SuccessState: Story = {
  args: {
    showImage: false,
    showIcon: true,
    iconName: 'checkmark',
    iconColor: 'p500',
    iconSize: '2xl',
    headlineText: 'Success!',
    subtitleText: 'Your account has been created successfully.',
    showSubtitle: true,
    showBackButton: true,
    backButtonText: 'Continue',
    backButtonIcon: 'nav_right',
  },
};

export const AllVariations: Story = {
  render: () => (
    <div className='space-y-12'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>With Image</h3>
        <HeroStack
          showImage={true}
          headlineText='Image Hero'
          subtitleText='Hero stack with a prominent image.'
          showSubtitle={true}
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>With Icon</h3>
        <HeroStack
          showIcon={true}
          iconName='heart'
          iconColor='p500'
          iconSize='2xl'
          headlineText='Icon Hero'
          subtitleText='Hero stack with an icon instead of image.'
          showSubtitle={true}
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>With Back Button</h3>
        <HeroStack
          showIcon={true}
          iconName='settings'
          headlineText='Settings Saved'
          subtitleText='Your preferences have been updated.'
          showSubtitle={true}
          showBackButton={true}
          backButtonText='Back'
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Minimal Text Only</h3>
        <HeroStack
          showImage={false}
          showIcon={false}
          headlineText='Simple Hero'
          subtitleText='Clean and minimal design.'
          showSubtitle={true}
        />
      </div>
    </div>
  ),
};
