import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { SecHead, type SecHeadAction } from '../../structures/sec-head';
import { Card } from '../../primitives/card';
import { Avatar } from '../../primitives/avatar';
import { Button } from '../../primitives/button';

const groupSectionVariants = cva('w-full space-y-4', {
  variants: {
    variant: {
      default: '',
      card: 'bg-card border border-border rounded-lg p-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const groupItemVariants = cva(
  'relative rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md',
  {
    variants: {
      view: {
        simple: 'bg-card border border-border p-4',
        cover: 'bg-card border border-border',
      },
      size: {
        sm: 'w-48',
        default: 'w-56',
        lg: 'w-64',
      },
    },
    defaultVariants: {
      view: 'simple',
      size: 'default',
    },
  }
);

export interface GroupData {
  /**
   * Simple view (opposite of cover)
   * @default true
   */
  simple?: boolean;
  /**
   * Cover view
   * @default false
   */
  cover?: boolean;
  /**
   * Avatar visibility controls
   */
  avtr1?: boolean;
  avtr2?: boolean;
  avtr3?: boolean;
  /**
   * Avatar sources for group members/admins
   */
  avtr1Src?: string;
  avtr2Src?: string;
  avtr3Src?: string;
  /**
   * Cover image source
   */
  vizSrc?: string;
  /**
   * Cover image alt text (group name)
   */
  vizAlt?: string;
  /**
   * Group title/name
   */
  titleSrc: string;
  /**
   * Profile click handler
   */
  profClick?: () => void;
  /**
   * Chat button click handler
   */
  chatBtnClick?: () => void;
  /**
   * More button click handler
   */
  moreBtnClick?: () => void;
  /**
   * Stats section visibility
   * @default true
   */
  stats?: boolean;
  /**
   * Individual stat visibility
   */
  stat1?: boolean;
  stat2?: boolean;
  stat3?: boolean;
  /**
   * Stat values
   */
  stat1Src?: string;
  stat2Src?: string;
  stat3Src?: string;
  /**
   * Example room visibility
   * @default false
   */
  exampleRoom?: boolean;
  /**
   * Example gallery visibility
   * @default false
   */
  exampleGallery?: boolean;
  /**
   * Mapping slots for different content types
   */
  roomMap?: React.ReactNode;
  galMap?: React.ReactNode;
  atchMap?: React.ReactNode;
  pplMap?: React.ReactNode;
}

export interface GroupSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof groupSectionVariants> {
  /**
   * Section visibility control
   * @default true
   */
  sec?: boolean;
  /**
   * Section header visibility
   * @default true
   */
  secHead?: boolean;
  /**
   * Header title icon visibility
   * @default true
   */
  headTitleIcn?: boolean;
  /**
   * Header action 1 visibility
   * @default true
   */
  headAct1?: boolean;
  /**
   * Header title icon source
   */
  headTitleIcnSrc?: string;
  /**
   * Header title text
   */
  headTitleSrc?: string;
  /**
   * Header action 1 text
   */
  headAct1TxtSrc?: string;
  /**
   * Header action 1 click handler
   */
  headAct1Click?: () => void;
  /**
   * Side fade visibility
   * @default true
   */
  sideFade?: boolean;
  /**
   * Cell mapping slot
   */
  cellMap?: React.ReactNode;
  /**
   * Example cell visibility
   * @default false
   */
  exampleCell?: boolean;
  /**
   * Groups data array
   */
  groups?: GroupData[];
  /**
   * Empty state visibility
   * @default false
   */
  empty?: boolean;
  /**
   * Empty state icon
   */
  emptyIcnSrc?: string;
  /**
   * Empty state headline
   */
  emptyHlineSrc?: string;
  /**
   * Empty state subtext
   */
  emptySubTxtSrc?: string;
  /**
   * Empty state CTA text
   */
  emptyCtaTxtSrc?: string;
  /**
   * Empty state click handler
   */
  emptyClick?: () => void;
  /**
   * Component variant
   */
  variant?: 'default' | 'card';
}

const GroupSection = React.forwardRef<HTMLDivElement, GroupSectionProps>(
  (
    {
      className,
      sec = true,
      secHead = true,
      headTitleIcn = true,
      headAct1 = true,
      headTitleIcnSrc = '👥',
      headTitleSrc = 'Groups',
      headAct1TxtSrc = 'View All',
      headAct1Click,
      sideFade = true,
      cellMap,
      exampleCell = false,
      groups = [],
      empty = false,
      emptyIcnSrc = '🏢',
      emptyHlineSrc = 'No Groups Yet',
      emptySubTxtSrc = 'Join or create groups to connect with others',
      emptyCtaTxtSrc = 'Explore Groups',
      emptyClick,
      variant,
      ...props
    },
    ref
  ) => {
    if (!sec) return null;

    const headerActions: SecHeadAction[] = [];
    if (headAct1 && headAct1TxtSrc) {
      headerActions.push({
        children: headAct1TxtSrc,
        onClick: headAct1Click || (() => {}),
        variant: 'ghost',
      });
    }

    const renderGroupItem = (group: GroupData, index: number) => {
      const avatars = [
        { visible: group.avtr1, src: group.avtr1Src },
        { visible: group.avtr2, src: group.avtr2Src },
        { visible: group.avtr3, src: group.avtr3Src },
      ].filter(avtr => avtr.visible && avtr.src);

      const stats = [
        { visible: group.stat1, value: group.stat1Src },
        { visible: group.stat2, value: group.stat2Src },
        { visible: group.stat3, value: group.stat3Src },
      ].filter(stat => stat.visible && stat.value);

      return (
        <Card
          key={index}
          className={cn(
            groupItemVariants({
              view: group.cover ? 'cover' : 'simple',
              size: 'default',
            })
          )}
        >
          {/* Cover View */}
          {group.cover && group.vizSrc && (
            <div className='relative h-32 overflow-hidden'>
              <img
                src={group.vizSrc}
                alt={group.vizAlt || group.titleSrc}
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />

              {/* Avatars overlay on cover */}
              {avatars.length > 0 && (
                <div className='absolute top-2 right-2 flex -space-x-2'>
                  {avatars.slice(0, 3).map((avatar, i) => (
                    <Avatar
                      key={i}
                      src={avatar.src}
                      alt={`Member ${i + 1}`}
                      size='s'
                      className='border-2 border-white'
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className={cn('p-4', group.cover && 'relative -mt-8 z-10')}>
            {/* Simple view avatars */}
            {group.simple && avatars.length > 0 && (
              <div className='flex -space-x-2 mb-3'>
                {avatars.slice(0, 3).map((avatar, i) => (
                  <Avatar
                    key={i}
                    src={avatar.src}
                    alt={`Member ${i + 1}`}
                    size='s'
                    className='border-2 border-background'
                  />
                ))}
              </div>
            )}

            {/* Title */}
            <div className='mb-3'>
              {group.profClick ? (
                <button
                  className={cn(
                    'text-base font-semibold hover:text-primary transition-colors text-left',
                    group.cover ? 'text-white' : 'text-foreground'
                  )}
                  onClick={group.profClick}
                >
                  {group.titleSrc}
                </button>
              ) : (
                <h3
                  className={cn(
                    'text-base font-semibold',
                    group.cover ? 'text-white' : 'text-foreground'
                  )}
                >
                  {group.titleSrc}
                </h3>
              )}
            </div>

            {/* Action Buttons */}
            <div className='flex justify-center gap-2 mb-3'>
              {group.chatBtnClick && (
                <Button
                  variant='outline'
                  size='s'
                  onClick={group.chatBtnClick}
                  className='flex-1'
                >
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                    />
                  </svg>
                  Chat
                </Button>
              )}

              {group.moreBtnClick && (
                <Button variant='ghost' size='s' onClick={group.moreBtnClick}>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                    />
                  </svg>
                </Button>
              )}
            </div>

            {/* Stats */}
            {group.stats && stats.length > 0 && (
              <div className='flex justify-between pt-3 border-t border-border'>
                {stats.map((stat, i) => (
                  <div key={i} className='text-center'>
                    <div
                      className={cn(
                        'text-sm font-medium',
                        group.cover ? 'text-white' : 'text-foreground'
                      )}
                    >
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Content Mapping Areas */}
            {group.roomMap && <div className='mt-3'>{group.roomMap}</div>}
            {group.galMap && <div className='mt-3'>{group.galMap}</div>}
            {group.atchMap && <div className='mt-3'>{group.atchMap}</div>}
            {group.pplMap && <div className='mt-3'>{group.pplMap}</div>}

            {/* Example Content */}
            {group.exampleRoom && (
              <div className='mt-3 p-2 bg-muted rounded text-xs text-muted-foreground'>
                🏠 Example Room
              </div>
            )}
            {group.exampleGallery && (
              <div className='mt-3 p-2 bg-muted rounded text-xs text-muted-foreground'>
                🖼️ Example Gallery
              </div>
            )}
          </div>
        </Card>
      );
    };

    const renderExampleCell = () => (
      <Card
        className={cn(groupItemVariants({ view: 'simple', size: 'default' }))}
      >
        <div className='p-4'>
          <div className='flex -space-x-2 mb-3'>
            <Avatar
              src=''
              alt='Example Member 1'
              size='s'
              className='border-2 border-background bg-blue-500'
            />
            <Avatar
              src=''
              alt='Example Member 2'
              size='s'
              className='border-2 border-background bg-green-500'
            />
            <Avatar
              src=''
              alt='Example Member 3'
              size='s'
              className='border-2 border-background bg-purple-500'
            />
          </div>

          <div className='mb-3'>
            <h3 className='text-base font-semibold text-foreground'>
              Example Group
            </h3>
          </div>

          <div className='flex justify-center gap-2 mb-3'>
            <Button variant='outline' size='s' className='flex-1'>
              <svg
                className='w-4 h-4 mr-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
              Chat
            </Button>
            <Button variant='ghost' size='s'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                />
              </svg>
            </Button>
          </div>

          <div className='flex justify-between pt-3 border-t border-border'>
            <div className='text-center'>
              <div className='text-sm font-medium text-foreground'>12</div>
              <div className='text-xs text-muted-foreground'>Members</div>
            </div>
            <div className='text-center'>
              <div className='text-sm font-medium text-foreground'>8</div>
              <div className='text-xs text-muted-foreground'>Posts</div>
            </div>
            <div className='text-center'>
              <div className='text-sm font-medium text-foreground'>3</div>
              <div className='text-xs text-muted-foreground'>Events</div>
            </div>
          </div>
        </div>
      </Card>
    );

    const renderEmptyState = () => (
      <div className='text-center py-8'>
        <div className='text-4xl mb-4' aria-hidden='true'>
          {emptyIcnSrc}
        </div>
        <h3 className='text-lg font-semibold text-foreground mb-2'>
          {emptyHlineSrc}
        </h3>
        <p className='text-sm text-muted-foreground mb-4'>{emptySubTxtSrc}</p>
        {emptyCtaTxtSrc && (
          <Button variant='outline' onClick={emptyClick}>
            {emptyCtaTxtSrc}
          </Button>
        )}
      </div>
    );

    const hasContent = groups.length > 0 || exampleCell || cellMap;

    return (
      <div
        ref={ref}
        className={cn(groupSectionVariants({ variant }), className)}
        {...props}
      >
        {secHead && (
          <SecHead
            title={headTitleSrc || ''}
            titleIcon={headTitleIcn ? headTitleIcnSrc : undefined}
            actions={headerActions}
            size='s'
          />
        )}

        {/* Content or Empty State */}
        {empty || !hasContent ? (
          renderEmptyState()
        ) : (
          <div className={cn('relative', sideFade && 'overflow-hidden')}>
            {/* Fade gradients */}
            {sideFade && hasContent && (
              <>
                <div className='absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none' />
                <div className='absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none' />
              </>
            )}

            {/* Scrollable content */}
            <div className='flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-1'>
              {/* Mapped groups */}
              {groups.map(renderGroupItem)}

              {/* Example cell */}
              {exampleCell && renderExampleCell()}

              {/* Custom cell mapping */}
              {cellMap}
            </div>
          </div>
        )}
      </div>
    );
  }
);

GroupSection.displayName = 'GroupSection';

export { GroupSection, groupSectionVariants, type GroupData };
