import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Primitives/Breadcrumb',
  component: Breadcrumb,
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
    itemColor: {
      control: { type: 'select' },
      options: ['n700', 'n500', 'n300', 'inherit'],
    },
    itemSize: {
      control: { type: 'select' },
      options: [
        'inherit',
        'r4',
        'r4b',
        'r3',
        'r3b',
        'r2',
        'r2b',
        'r1',
        'r1b',
        'h5',
        'h5b',
        'h4',
        'h4b',
        'h3',
        'h3b',
        'h2',
        'h2b',
        'h1',
        'h1b',
      ],
    },
    showHomeIcon: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { id: 'home', text: 'Home', icon: 'home2' },
  { id: 'products', text: 'Products', href: '/products' },
  { id: 'category', text: 'Electronics', href: '/products/electronics' },
  { id: 'current', text: 'Smartphones' },
];

export const Default: Story = {
  args: {
    items: basicItems,
    showHomeIcon: true,
  },
};

export const WithoutHomeIcon: Story = {
  args: {
    items: basicItems,
    showHomeIcon: false,
  },
};

export const ShortPath: Story = {
  args: {
    items: [
      { id: 'home', text: 'Home', icon: 'home2' },
      { id: 'current', text: 'Dashboard' },
    ],
    showHomeIcon: true,
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { id: 'home', text: 'Home', icon: 'home2' },
      { id: 'company', text: 'Company', href: '/company' },
      { id: 'departments', text: 'Departments', href: '/company/departments' },
      {
        id: 'engineering',
        text: 'Engineering',
        href: '/company/departments/engineering',
      },
      {
        id: 'teams',
        text: 'Teams',
        href: '/company/departments/engineering/teams',
      },
      {
        id: 'frontend',
        text: 'Frontend',
        href: '/company/departments/engineering/teams/frontend',
      },
      { id: 'current', text: 'Projects' },
    ],
    showHomeIcon: true,
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <label className='text-sm font-medium mb-2 block'>Small (r4)</label>
        <Breadcrumb items={basicItems} itemSize='r4' showHomeIcon={true} />
      </div>

      <div>
        <label className='text-sm font-medium mb-2 block'>Regular (r3)</label>
        <Breadcrumb items={basicItems} itemSize='r3' showHomeIcon={true} />
      </div>

      <div>
        <label className='text-sm font-medium mb-2 block'>Large (r2)</label>
        <Breadcrumb items={basicItems} itemSize='r2' showHomeIcon={true} />
      </div>
    </div>
  ),
};

export const DifferentColors: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <label className='text-sm font-medium mb-2 block'>Dark (n700)</label>
        <Breadcrumb items={basicItems} itemColor='n700' showHomeIcon={true} />
      </div>

      <div>
        <label className='text-sm font-medium mb-2 block'>Medium (n500)</label>
        <Breadcrumb items={basicItems} itemColor='n500' showHomeIcon={true} />
      </div>

      <div>
        <label className='text-sm font-medium mb-2 block'>Light (n300)</label>
        <Breadcrumb items={basicItems} itemColor='n300' showHomeIcon={true} />
      </div>
    </div>
  ),
};

export const WithCustomIcons: Story = {
  args: {
    items: [
      { id: 'home', text: 'Dashboard', icon: 'dashboard' },
      { id: 'users', text: 'Users', icon: 'user', href: '/users' },
      {
        id: 'profile',
        text: 'Profile',
        icon: 'person',
        href: '/users/profile',
      },
      { id: 'current', text: 'Settings', icon: 'settings' },
    ],
    showHomeIcon: true,
    homeIcon: 'dashboard',
  },
};

export const ECommercePath: Story = {
  args: {
    items: [
      { id: 'home', text: 'Store', icon: 'home2' },
      { id: 'category', text: 'Fashion', href: '/fashion' },
      { id: 'subcategory', text: 'Shoes', href: '/fashion/shoes' },
      { id: 'brand', text: 'Nike', href: '/fashion/shoes/nike' },
      { id: 'current', text: 'Air Max 90' },
    ],
    showHomeIcon: true,
  },
};

export const AdminPath: Story = {
  args: {
    items: [
      { id: 'home', text: 'Admin', icon: 'admin' },
      { id: 'management', text: 'User Management', href: '/admin/users' },
      { id: 'roles', text: 'Roles & Permissions', href: '/admin/users/roles' },
      { id: 'current', text: 'Edit Role' },
    ],
    showHomeIcon: true,
    homeIcon: 'admin',
  },
};

export const DocumentationPath: Story = {
  args: {
    items: [
      { id: 'home', text: 'Docs', icon: 'docs' },
      { id: 'guides', text: 'Guides', href: '/docs/guides' },
      { id: 'components', text: 'Components', href: '/docs/guides/components' },
      {
        id: 'primitives',
        text: 'Primitives',
        href: '/docs/guides/components/primitives',
      },
      { id: 'current', text: 'Breadcrumb' },
    ],
    showHomeIcon: true,
    homeIcon: 'docs',
  },
};

export const Interactive: Story = {
  render: () => {
    const handleHomeClick = () => {
      console.log('Home clicked');
      alert('Navigating to home page');
    };

    const handleItemClick = (id: string, text: string) => {
      console.log(`Breadcrumb item clicked: ${id} - ${text}`);
      alert(`Navigating to: ${text}`);
    };

    return (
      <div className='space-y-4'>
        <p className='text-sm text-muted-foreground'>
          Click on breadcrumb items to see interaction examples.
        </p>

        <Breadcrumb
          items={[
            {
              id: 'home',
              text: 'Home',
              icon: 'home2',
              onClick: () => handleItemClick('home', 'Home'),
            },
            {
              id: 'section',
              text: 'Section',
              href: '/section',
              onClick: () => handleItemClick('section', 'Section'),
            },
            {
              id: 'current',
              text: 'Current Page',
              onClick: () => handleItemClick('current', 'Current Page'),
            },
          ]}
          onHomeClick={handleHomeClick}
          showHomeIcon={true}
        />
      </div>
    );
  },
};

export const AllVariations: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Basic Navigation</h3>
        <Breadcrumb items={basicItems} showHomeIcon={true} />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Without Home Icon</h3>
        <Breadcrumb items={basicItems} showHomeIcon={false} />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>
          Long Path with Truncation
        </h3>
        <Breadcrumb
          items={[
            { id: 'home', text: 'Home', icon: 'home2' },
            {
              id: 'very-long-section-name',
              text: 'Very Long Section Name That Might Get Truncated',
            },
            { id: 'another-long-name', text: 'Another Very Long Name' },
            { id: 'current', text: 'Current Page With Long Title' },
          ]}
          showHomeIcon={true}
        />
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Single Level</h3>
        <Breadcrumb
          items={[{ id: 'home', text: 'Dashboard', icon: 'dashboard' }]}
          showHomeIcon={true}
          homeIcon='dashboard'
        />
      </div>
    </div>
  ),
};
