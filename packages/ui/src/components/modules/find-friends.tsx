import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';
import { Input } from '../primitives/input';
import { PeepCard } from '../client/structures/peep-card';
import { EmptyState } from '../structures/empty-state';

const findFriendsVariants = cva('w-full max-w-2xl mx-auto space-y-6', {
  variants: {
    variant: {
      default: '',
      compact: 'space-y-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface FindFriendsContact {
  id: string;
  name: string;
  avatar?: string;
  phone?: string;
  email?: string;
  isConnected: boolean;
  isInvited: boolean;
}

export interface FindFriendsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof findFriendsVariants> {
  /**
   * List of contacts from device
   */
  contacts?: FindFriendsContact[];
  /**
   * Loading state for contacts
   */
  isLoading?: boolean;
  /**
   * Permission state for contacts access
   */
  permissionState?: 'granted' | 'denied' | 'prompt';
  /**
   * Search query for filtering contacts
   */
  searchQuery?: string;
  /**
   * Search query change handler
   */
  onSearchChange?: (query: string) => void;
  /**
   * Request contacts permission handler
   */
  onRequestPermission?: () => void;
  /**
   * Connect with contact handler
   */
  onConnect?: (contact: FindFriendsContact) => void;
  /**
   * Invite contact handler
   */
  onInvite?: (contact: FindFriendsContact) => void;
}

const FindFriends = React.forwardRef<HTMLDivElement, FindFriendsProps>(
  (
    {
      className,
      variant,
      contacts = [],
      isLoading = false,
      permissionState = 'prompt',
      searchQuery = '',
      onSearchChange,
      onRequestPermission,
      onConnect,
      onInvite,
      ...props
    },
    ref
  ) => {
    const filteredContacts = React.useMemo(() => {
      if (!searchQuery) return contacts;
      return contacts.filter(
        contact =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phone?.includes(searchQuery)
      );
    }, [contacts, searchQuery]);

    const renderPermissionPrompt = () => (
      <EmptyState
        icon='👥'
        title='Find Your Friends'
        description="Connect with friends from your contacts to see what they're up to."
        action={<Button onClick={onRequestPermission}>Access Contacts</Button>}
      />
    );

    const renderPermissionDenied = () => (
      <EmptyState
        icon='🚫'
        title='Contacts Access Denied'
        description='To find friends from your contacts, please enable contacts access in your device settings.'
        action={
          <Button variant='outline' onClick={onRequestPermission}>
            Try Again
          </Button>
        }
      />
    );

    const renderEmptyContacts = () => (
      <EmptyState
        icon='📱'
        title='No Contacts Found'
        description="We couldn't find any contacts on your device. Try adding some contacts first."
      />
    );

    const renderNoResults = () => (
      <EmptyState
        icon='🔍'
        title='No Results'
        description={`No contacts found matching "${searchQuery}"`}
      />
    );

    const renderContactsList = () => (
      <div className='space-y-4'>
        {/* Search Input */}
        <div className='relative'>
          <Input
            type='text'
            placeholder='Search contacts...'
            value={searchQuery}
            onChange={e => onSearchChange?.(e.target.value)}
            className='pl-10'
          />
          <svg
            className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>

        {/* Results */}
        {filteredContacts.length === 0 ? (
          searchQuery ? (
            renderNoResults()
          ) : (
            renderEmptyContacts()
          )
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filteredContacts.map(contact => (
              <div key={contact.id} className='relative'>
                <PeepCard
                  titleSrc={contact.name}
                  avtrSrc={contact.avatar}
                  avtrAlt={contact.name}
                  size='sm'
                />

                {/* Action Button Overlay */}
                <div className='absolute bottom-3 left-3 right-3'>
                  {contact.isConnected ? (
                    <Button
                      variant='secondary'
                      size='sm'
                      disabled
                      className='w-full'
                    >
                      Connected
                    </Button>
                  ) : contact.isInvited ? (
                    <Button
                      variant='outline'
                      size='sm'
                      disabled
                      className='w-full'
                    >
                      Invited
                    </Button>
                  ) : (
                    <div className='flex gap-2'>
                      <Button
                        variant='default'
                        size='sm'
                        onClick={() => onConnect?.(contact)}
                        className='flex-1'
                      >
                        Connect
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => onInvite?.(contact)}
                        className='flex-1'
                      >
                        Invite
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );

    const renderContent = () => {
      if (isLoading) {
        return (
          <div className='flex items-center justify-center py-12'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
          </div>
        );
      }

      switch (permissionState) {
        case 'prompt':
          return renderPermissionPrompt();
        case 'denied':
          return renderPermissionDenied();
        case 'granted':
          return renderContactsList();
        default:
          return renderPermissionPrompt();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(findFriendsVariants({ variant }), className)}
        {...props}
      >
        {renderContent()}
      </div>
    );
  }
);

FindFriends.displayName = 'FindFriends';

export { FindFriends, findFriendsVariants };
