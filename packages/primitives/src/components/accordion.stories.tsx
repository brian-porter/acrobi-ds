import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Primitives/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='w-96'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    visible: {
      control: { type: 'boolean' },
    },
    accordionId: {
      control: { type: 'text' },
    },
    items: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: 'item1',
    trigger: 'Section 1',
    content:
      'This is the content for section 1. It contains important information about the first topic.',
  },
  {
    id: 'item2',
    trigger: 'Section 2',
    content:
      'This is the content for section 2. Here you can find details about the second topic with more extensive information.',
  },
  {
    id: 'item3',
    trigger: 'Section 3',
    content:
      'This is the content for section 3. The final section contains concluding remarks and additional resources.',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      {
        id: 'single',
        trigger: 'Click to expand',
        content:
          'This accordion has only one item with some important content inside.',
      },
    ],
  },
};

export const WithCustomId: Story = {
  args: {
    items: sampleItems,
    accordionId: 'custom-accordion',
  },
};

export const FAQExample: Story = {
  args: {
    items: [
      {
        id: 'faq1',
        trigger: 'What is the Acrobi Design System?',
        content:
          'The Acrobi Design System is a comprehensive collection of reusable components, design patterns, and guidelines that help teams build consistent and accessible user interfaces.',
      },
      {
        id: 'faq2',
        trigger: 'How do I install the components?',
        content:
          'You can install the Acrobi Design System components using npm or yarn. Run "npm install @acrobi/ui" to get started with all the components and utilities.',
      },
      {
        id: 'faq3',
        trigger: 'Are the components accessible?',
        content:
          'Yes, all Acrobi components are built with accessibility in mind. They follow WCAG guidelines and include proper ARIA attributes, keyboard navigation, and screen reader support.',
      },
      {
        id: 'faq4',
        trigger: 'Can I customize the styling?',
        content:
          'Absolutely! The design system is built with CSS custom properties and supports both light and dark themes. You can override the default styles or create your own theme variations.',
      },
    ],
  },
};

export const ProductFeatures: Story = {
  args: {
    items: [
      {
        id: 'features1',
        trigger: '🚀 Performance',
        content:
          'Built with modern web technologies for optimal performance. Components are tree-shakeable and optimized for production builds.',
      },
      {
        id: 'features2',
        trigger: '🎨 Customizable',
        content:
          'Extensive theming capabilities with CSS custom properties. Support for light/dark modes and custom brand colors.',
      },
      {
        id: 'features3',
        trigger: '♿ Accessible',
        content:
          'WCAG 2.1 AA compliant with full keyboard navigation, screen reader support, and focus management.',
      },
      {
        id: 'features4',
        trigger: '📱 Responsive',
        content:
          'Mobile-first responsive design that works beautifully across all device sizes and orientations.',
      },
    ],
  },
};

export const NestedContent: Story = {
  args: {
    items: [
      {
        id: 'nested1',
        trigger: 'Getting Started',
        content: `
          <div>
            <h4 style="margin: 0 0 8px 0; font-weight: 600;">Installation Steps:</h4>
            <ol style="margin: 0; padding-left: 20px;">
              <li>Install the package: <code>npm install @acrobi/ui</code></li>
              <li>Import the CSS: <code>import '@acrobi/ui/styles.css'</code></li>
              <li>Start using components in your React app</li>
            </ol>
          </div>
        `,
      },
      {
        id: 'nested2',
        trigger: 'Advanced Configuration',
        content: `
          <div>
            <p style="margin: 0 0 12px 0;">For advanced use cases, you can customize the following:</p>
            <ul style="margin: 0; padding-left: 20px;">
              <li><strong>Theme Variables:</strong> Override CSS custom properties</li>
              <li><strong>Component Props:</strong> Use TypeScript interfaces for type safety</li>
              <li><strong>Custom Styling:</strong> Apply your own CSS classes and styles</li>
            </ul>
          </div>
        `,
      },
    ],
  },
};

export const AllVariations: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Basic Accordion</h3>
        <Accordion items={sampleItems} />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>FAQ Style</h3>
        <Accordion
          items={[
            {
              id: 'q1',
              trigger: 'Question: How does this work?',
              content:
                'Answer: This accordion uses the Finsweet Accordion system with authentic Acrobi styling for consistent behavior across your application.',
            },
            {
              id: 'q2',
              trigger: 'Question: Is it customizable?',
              content:
                'Answer: Yes, you can customize the accordion through CSS custom properties and data attributes that control the visual appearance.',
            },
          ]}
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Content with Icons</h3>
        <Accordion
          items={[
            {
              id: 'icon1',
              trigger: '📊 Analytics Dashboard',
              content:
                'Track your application performance with real-time analytics and detailed reporting features.',
            },
            {
              id: 'icon2',
              trigger: '🔒 Security Features',
              content:
                'Advanced security measures including encryption, authentication, and access controls to protect your data.',
            },
          ]}
        />
      </div>
    </div>
  ),
};

export const MultipleMode: Story = {
  args: {
    element: 'group',
    initial: '1',
    single: 'false', // Multiple items can be open
    acrdItmMap: (
      <>
        <AcrdItm
          titleTxtSrc='Analytics Dashboard'
          body={true}
          bodySrc='Track your application performance with real-time analytics and detailed reporting features.'
        />
        <AcrdItm
          titleTxtSrc='Security Features'
          body={true}
          bodySrc='Advanced security measures including encryption, authentication, and access controls to protect your data.'
        />
        <AcrdItm
          titleTxtSrc='Integration Options'
          body={true}
          bodySrc='Connect with popular third-party services and APIs to extend your application functionality.'
        />
      </>
    ),
  },
};

// Legacy API example for backward compatibility
export const LegacyAPI: Story = {
  args: {
    items: sampleItems,
  },
};
