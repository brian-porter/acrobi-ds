import type { Meta, StoryObj } from '@storybook/react';

// Type definitions
type ActionSelectHandler = (actionId: string, action: any) => void;

// Helper function for consistent action handling
const createActionHandler =
  (context: string): ActionSelectHandler =>
  (actionId: string, action: any) => {
    console.log(`${context} action:`, actionId, action);
    alert(`Action: ${action.label}`);
  };

// Temporary mock component while we fix dependencies
const MenuActions = ({
  subject,
  relationship,
  onActionSelect,
  className,
}: any) => (
  <div className={`p-2 space-y-1 ${className || ''}`}>
    <div className='text-xs text-muted-foreground px-2 py-1'>
      MenuActions ({relationship?.type}) - Dependency loading...
    </div>

    {/* Primary Actions */}
    <div className='space-y-1'>
      {relationship?.canMessage && (
        <button
          className='w-full text-left px-3 py-2 hover:bg-accent rounded text-sm'
          onClick={() => onActionSelect?.('message', { label: 'Send Message' })}
        >
          💬 Send Message
        </button>
      )}
      {relationship?.canCall && (
        <button
          className='w-full text-left px-3 py-2 hover:bg-accent rounded text-sm'
          onClick={() => onActionSelect?.('call', { label: 'Start Call' })}
        >
          📞 Start Call
        </button>
      )}
      {relationship?.canShare && (
        <button
          className='w-full text-left px-3 py-2 hover:bg-accent rounded text-sm'
          onClick={() => onActionSelect?.('share', { label: 'Share' })}
        >
          📤 Share
        </button>
      )}
    </div>

    {/* Separator */}
    <div className='border-t my-1'></div>

    {/* Secondary Actions */}
    <div className='space-y-1'>
      {relationship?.canFollow && (
        <button
          className='w-full text-left px-3 py-2 hover:bg-accent rounded text-sm'
          onClick={() => onActionSelect?.('follow', { label: 'Follow' })}
        >
          ➕ Follow
        </button>
      )}
      {relationship?.canBlock && (
        <button
          className='w-full text-left px-3 py-2 hover:bg-accent rounded text-sm text-destructive'
          onClick={() => onActionSelect?.('block', { label: 'Block' })}
        >
          🚫 Block
        </button>
      )}
      {relationship?.canReport && (
        <button
          className='w-full text-left px-3 py-2 hover:bg-accent rounded text-sm text-destructive'
          onClick={() => onActionSelect?.('report', { label: 'Report' })}
        >
          ⚠️ Report
        </button>
      )}
    </div>
  </div>
);

const meta: Meta<typeof MenuActions> = {
  title: 'Modules/MenuActions',
  component: MenuActions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className='w-80 bg-background border rounded-lg shadow-lg'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockUser = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '👨‍💼',
  isOnline: true,
  mutualConnections: 12,
  location: 'San Francisco, CA',
};

const mockGroup = {
  id: 'group-456',
  name: 'Design Team',
  description: 'UI/UX designers and researchers',
  memberCount: 24,
  isPublic: false,
  category: 'team',
};

const mockPost = {
  id: 'post-789',
  title: 'New Design System Components',
  author: 'Jane Smith',
  createdAt: '2 hours ago',
  likes: 15,
  comments: 8,
  isLiked: false,
  isBookmarked: true,
};

const mockItem = {
  id: 'item-101',
  name: 'Project Proposal.pdf',
  type: 'document',
  size: '2.3 MB',
  owner: 'Alice Johnson',
  sharedWith: 5,
};

// User relationships
const friendRelationship = {
  type: 'friend',
  status: 'connected',
  canMessage: true,
  canCall: true,
  canShare: true,
  canBlock: true,
  isFollowing: true,
  isMuted: false,
};

const strangerRelationship = {
  type: 'stranger',
  status: 'none',
  canMessage: false,
  canCall: false,
  canShare: true,
  canBlock: true,
  canFollow: true,
  canReport: true,
};

const blockedRelationship = {
  type: 'blocked',
  status: 'blocked',
  canUnblock: true,
  canReport: true,
};

// Group relationships
const memberRelationship = {
  type: 'member',
  role: 'member',
  canLeave: true,
  canInvite: true,
  canPost: true,
  canModerate: false,
};

const adminRelationship = {
  type: 'admin',
  role: 'admin',
  canLeave: true,
  canInvite: true,
  canPost: true,
  canModerate: true,
  canManage: true,
  canDelete: true,
};

const nonMemberRelationship = {
  type: 'non-member',
  canJoin: true,
  canRequest: false,
  canReport: true,
};

export const UserFriend: Story = {
  args: {
    subject: mockUser,
    relationship: friendRelationship,
    onActionSelect: createActionHandler('User Friend'),
  },
};

export const UserStranger: Story = {
  args: {
    subject: mockUser,
    relationship: strangerRelationship,
    onActionSelect: createActionHandler('User Stranger'),
  },
};

export const UserBlocked: Story = {
  args: {
    subject: { ...mockUser, name: 'Blocked User' },
    relationship: blockedRelationship,
    onActionSelect: createActionHandler('User Blocked'),
  },
};

export const GroupMember: Story = {
  args: {
    subject: mockGroup,
    relationship: memberRelationship,
    onActionSelect: createActionHandler('Group Member'),
  },
};

export const GroupAdmin: Story = {
  args: {
    subject: mockGroup,
    relationship: adminRelationship,
    onActionSelect: createActionHandler('Group Admin'),
  },
};

export const GroupNonMember: Story = {
  args: {
    subject: { ...mockGroup, name: 'Public Design Group', isPublic: true },
    relationship: nonMemberRelationship,
    onActionSelect: createActionHandler('Group Non-Member'),
  },
};

export const PostActions: Story = {
  args: {
    subject: mockPost,
    relationship: {
      type: 'post',
      canLike: true,
      canComment: true,
      canShare: true,
      canBookmark: true,
      canReport: true,
      canEdit: false,
      canDelete: false,
    },
    onActionSelect: createActionHandler('Post Actions'),
  },
};

export const OwnPost: Story = {
  args: {
    subject: { ...mockPost, author: 'You', isOwn: true },
    relationship: {
      type: 'post',
      canLike: false,
      canComment: true,
      canShare: true,
      canBookmark: true,
      canEdit: true,
      canDelete: true,
      canPromote: true,
      canAnalytics: true,
    },
    onActionSelect: createActionHandler('Own Post'),
  },
};

export const DocumentActions: Story = {
  args: {
    subject: mockItem,
    relationship: {
      type: 'item',
      canView: true,
      canDownload: true,
      canShare: true,
      canCopy: true,
      canMove: true,
      canRename: false,
      canDelete: false,
      permission: 'viewer',
    },
    onActionSelect: createActionHandler('Document Actions'),
  },
};

export const OwnDocument: Story = {
  args: {
    subject: { ...mockItem, owner: 'You', isOwn: true },
    relationship: {
      type: 'item',
      canView: true,
      canDownload: true,
      canShare: true,
      canCopy: true,
      canMove: true,
      canRename: true,
      canDelete: true,
      canManageAccess: true,
      permission: 'owner',
    },
    onActionSelect: createActionHandler('Own Document'),
  },
};

export const LimitedActions: Story = {
  args: {
    subject: { ...mockUser, name: 'Limited User' },
    relationship: {
      type: 'limited',
      canView: true,
      canReport: true,
      // Very limited actions
    },
    onActionSelect: createActionHandler('Limited Actions'),
  },
};

export const ModeratorView: Story = {
  args: {
    subject: mockPost,
    relationship: {
      type: 'post',
      canLike: true,
      canComment: true,
      canShare: true,
      canBookmark: true,
      canReport: true,
      canModerate: true,
      canPin: true,
      canFeature: true,
      canRemove: true,
      canBan: true,
      role: 'moderator',
    },
    onActionSelect: createActionHandler('Moderator View'),
  },
};

export const ContextualActions: Story = {
  args: {
    subject: {
      ...mockUser,
      context: 'birthday',
      birthday: 'today',
    },
    relationship: {
      ...friendRelationship,
      contextualActions: [
        { id: 'wish-birthday', label: '🎂 Wish Happy Birthday', icon: '🎉' },
        { id: 'send-gift', label: '🎁 Send Gift', icon: '💝' },
      ],
    },
    onActionSelect: (actionId: string, action: any) => {
      console.log('Contextual action:', actionId, action);
      alert(`Contextual Action: ${action.label}`);
    },
  },
};

export const BusinessProfile: Story = {
  args: {
    subject: {
      id: 'business-123',
      name: 'Acme Design Studio',
      type: 'business',
      category: 'Design Agency',
      verified: true,
      website: 'acme-design.com',
      followers: 2847,
    },
    relationship: {
      type: 'business',
      isFollowing: false,
      canFollow: true,
      canMessage: true,
      canReview: true,
      canShare: true,
      canReport: true,
      canVisitWebsite: true,
    },
    onActionSelect: (actionId: string, action: any) => {
      console.log('Business action:', actionId, action);
      alert(`Business Action: ${action.label}`);
    },
  },
};
