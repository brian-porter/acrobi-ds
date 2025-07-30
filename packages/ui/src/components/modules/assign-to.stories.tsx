import type { Meta, StoryObj } from '@storybook/react-vite';

// Temporary mock component while we fix dependencies
const AssignTo = ({ people, groups, onAssign, className, ...props }: any) => (
  <div className={`p-4 space-y-4 ${className || ''}`}>
    <div className='text-sm text-muted-foreground'>
      AssignTo Workflow - Dependency loading...
    </div>
    <div className='space-y-2'>
      <h3 className='font-medium'>People ({people?.length || 0})</h3>
      {people?.slice(0, 3).map((person: any) => (
        <div
          key={person.id}
          className='flex items-center gap-2 p-2 border rounded'
        >
          <span>{person.avatar}</span>
          <span>{person.name}</span>
        </div>
      ))}
    </div>
    <div className='space-y-2'>
      <h3 className='font-medium'>Groups ({groups?.length || 0})</h3>
      {groups?.slice(0, 3).map((group: any) => (
        <div
          key={group.id}
          className='flex items-center gap-2 p-2 border rounded'
        >
          <span>{group.avatar}</span>
          <span>{group.name}</span>
        </div>
      ))}
    </div>
    <button
      className='px-4 py-2 bg-primary text-primary-foreground rounded'
      onClick={() => onAssign?.(['demo-assignment'])}
    >
      Assign
    </button>
  </div>
);

const meta: Meta<typeof AssignTo> = {
  title: 'Modules/AssignTo',
  component: AssignTo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='w-96 bg-background border rounded-lg p-4'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPeople = [
  {
    id: 'john',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '👨‍💼',
    role: 'Developer',
    status: 'online',
  },
  {
    id: 'jane',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: '👩‍💻',
    role: 'Designer',
    status: 'busy',
  },
  {
    id: 'bob',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatar: '👨‍🔧',
    role: 'Manager',
    status: 'away',
  },
  {
    id: 'alice',
    name: 'Alice Brown',
    email: 'alice@example.com',
    avatar: '👩‍🎨',
    role: 'Product Manager',
    status: 'online',
  },
  {
    id: 'charlie',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    avatar: '👨‍💻',
    role: 'DevOps Engineer',
    status: 'offline',
  },
];

const mockGroups = [
  {
    id: 'dev-team',
    name: 'Development Team',
    description: 'Frontend and backend developers',
    avatar: '💻',
    memberCount: 8,
    type: 'team',
  },
  {
    id: 'design-team',
    name: 'Design Team',
    description: 'UI/UX designers and researchers',
    avatar: '🎨',
    memberCount: 5,
    type: 'team',
  },
  {
    id: 'management',
    name: 'Management',
    description: 'Project and product managers',
    avatar: '📊',
    memberCount: 3,
    type: 'leadership',
  },
  {
    id: 'qa-team',
    name: 'QA Team',
    description: 'Quality assurance and testing',
    avatar: '🔍',
    memberCount: 4,
    type: 'team',
  },
  {
    id: 'marketing',
    name: 'Marketing Team',
    description: 'Marketing and communications',
    avatar: '📢',
    memberCount: 6,
    type: 'team',
  },
];

export const Default: Story = {
  args: {
    people: mockPeople,
    groups: mockGroups,
    onAssign: assignments => {
      console.log('Assigned to:', assignments);
      alert(`Task assigned to: ${assignments.join(', ')}`);
    },
  },
};

export const PeopleOnly: Story = {
  args: {
    people: mockPeople,
    groups: [],
    onAssign: assignments => {
      console.log('Assigned to people:', assignments);
    },
  },
};

export const GroupsOnly: Story = {
  args: {
    people: [],
    groups: mockGroups,
    onAssign: assignments => {
      console.log('Assigned to groups:', assignments);
    },
  },
};

export const SmallTeam: Story = {
  args: {
    people: mockPeople.slice(0, 3),
    groups: mockGroups.slice(0, 2),
    onAssign: assignments => {
      console.log('Small team assignment:', assignments);
    },
  },
};

export const LargeOrganization: Story = {
  args: {
    people: [
      ...mockPeople,
      ...Array.from({ length: 15 }, (_, i) => ({
        id: `person-${i}`,
        name: `Person ${i + 1}`,
        email: `person${i + 1}@example.com`,
        avatar: ['👨‍💼', '👩‍💻', '👨‍🔧', '👩‍🎨'][i % 4],
        role: ['Developer', 'Designer', 'Manager', 'Analyst'][i % 4],
        status: ['online', 'busy', 'away', 'offline'][i % 4],
      })),
    ],
    groups: [
      ...mockGroups,
      ...Array.from({ length: 8 }, (_, i) => ({
        id: `group-${i}`,
        name: `Team ${i + 1}`,
        description: `Department ${i + 1} team`,
        avatar: ['🏢', '🚀', '⚡', '🎯'][i % 4],
        memberCount: Math.floor(Math.random() * 20) + 3,
        type: 'team' as const,
      })),
    ],
    onAssign: assignments => {
      console.log('Large org assignment:', assignments);
    },
  },
};

export const EmptyState: Story = {
  args: {
    people: [],
    groups: [],
    onAssign: assignments => {
      console.log('Empty assignment:', assignments);
    },
  },
};

export const PreselectedAssignments: Story = {
  args: {
    people: mockPeople,
    groups: mockGroups,
    initialAssignments: ['john', 'dev-team'],
    onAssign: assignments => {
      console.log('Updated assignments:', assignments);
    },
  },
};

export const SingleSelection: Story = {
  args: {
    people: mockPeople,
    groups: mockGroups,
    multiple: false,
    onAssign: assignments => {
      console.log('Single assignment:', assignments);
    },
  },
};

export const WithPermissions: Story = {
  args: {
    people: mockPeople.map(person => ({
      ...person,
      disabled: person.status === 'offline',
    })),
    groups: mockGroups.map(group => ({
      ...group,
      disabled: group.type === 'leadership',
    })),
    onAssign: assignments => {
      console.log('Permission-based assignment:', assignments);
    },
  },
};

export const QuickAssign: Story = {
  args: {
    people: mockPeople.slice(0, 4),
    groups: [],
    showSearch: false,
    title: 'Quick Assign',
    description: 'Select someone to assign this task to',
    onAssign: assignments => {
      console.log('Quick assignment:', assignments);
    },
  },
};

export const BulkAssignment: Story = {
  args: {
    people: mockPeople,
    groups: mockGroups,
    title: 'Bulk Assignment',
    description: 'Assign this project to multiple people and teams',
    showSelectAll: true,
    onAssign: assignments => {
      console.log('Bulk assignment:', assignments);
      alert(`Assigned to ${assignments.length} people/groups`);
    },
  },
};

export const CustomLabels: Story = {
  args: {
    people: mockPeople,
    groups: mockGroups,
    title: 'Share Document',
    description: 'Choose who can access this document',
    submitLabel: 'Share',
    cancelLabel: 'Keep Private',
    peopleTabLabel: 'Individuals',
    groupsTabLabel: 'Teams',
    onAssign: assignments => {
      console.log('Document shared with:', assignments);
    },
  },
};
