import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Card } from '../../primitives/card';
import { Avatar } from '../../primitives/avatar';
import { Badge } from '../../primitives/badge';
import { Button } from '../../primitives/button';

const peepCardVariants = cva(
  'group/peep-card bg-card border border-border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md',
  {
    variants: {
      mode: {
        peep: '[data-peep-mode="person"]', // Default for person objects
        group: '[data-peep-mode="group"]', // For non-person objects (brand, group, place, etc.)
      },
      size: {
        sm: 'w-48 [data-peep-size="sm"]',
        default: 'w-56 [data-peep-size="default"]',
        lg: 'w-64 [data-peep-size="lg"]',
      },
    },
    defaultVariants: {
      mode: 'peep',
      size: 'default',
    },
  }
);

const adaptIconVariants = cva(
  'w-6 h-6 rounded flex items-center justify-center text-white text-xs font-medium',
  {
    variants: {
      shape: {
        c: 'rounded-full', // circle
        r: 'rounded-md', // rounded corner
        b: 'rounded-none', // box
        s: 'rounded-lg', // squircle
      },
      size: {
        s: 'w-4 h-4 text-xs',
        m: 'w-6 h-6 text-xs',
        l: 'w-8 h-8 text-sm',
        xl: 'w-10 h-10 text-base',
      },
    },
    defaultVariants: {
      shape: 'c',
      size: 'm',
    },
  }
);

export interface AdaptIcon {
  src: string; // Icon name/source
  bgColor: string; // Background color (e.g., 'red-500', 'blue-300')
  shape?: 'c' | 'r' | 'b' | 's';
  size?: 's' | 'm' | 'l' | 'xl';
}

export interface PeepCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof peepCardVariants> {
  /**
   * Card visibility control
   * @default true
   */
  card?: boolean;
  /**
   * Card identifier
   */
  cardId?: string;
  /**
   * Mode for person objects
   * @default true
   */
  peep?: boolean;
  /**
   * Mode for non-person objects (brand, group, place, etc.)
   * @default false
   */
  group?: boolean;
  /**
   * Avatar image source
   */
  avtrSrc?: string;
  /**
   * Avatar alt text (usually the name)
   */
  avtrAlt?: string;
  /**
   * Badge color for avatar status indicator
   */
  avtrBdgClr?: string;
  /**
   * Main title (name of the object)
   */
  titleSrc: string;
  /**
   * Profile link href
   */
  profLink?: string;
  /**
   * Profile click handler
   */
  profClick?: () => void;
  /**
   * Chat link href
   */
  chatLink?: string;
  /**
   * Chat button click handler
   */
  chatBtnClick?: () => void;
  /**
   * More actions link href
   */
  moreLink?: string;
  /**
   * More button click handler
   */
  moreBtnClick?: () => void;
  /**
   * Lists quantity
   */
  listQty?: number;
  /**
   * List adapt icons (up to 3)
   */
  listAdaptIcons?: AdaptIcon[];
  /**
   * Lists link href
   */
  listLink?: string;
  /**
   * Lists click handler
   */
  listClick?: () => void;
  /**
   * People/connections quantity
   */
  peepQty?: number;
  /**
   * People avatar sources (top 3 most interacted)
   */
  peepAvtrSources?: string[];
  /**
   * People link href
   */
  peepLink?: string;
  /**
   * People click handler
   */
  peepClick?: () => void;
  /**
   * Calendar events quantity
   */
  calQty?: number;
  /**
   * Calendar adapt icons (up to 3)
   */
  calAdaptIcons?: AdaptIcon[];
  /**
   * Calendar link href
   */
  calLink?: string;
  /**
   * Calendar click handler
   */
  calClick?: () => void;
  /**
   * Card mode (peep or group)
   */
  mode?: 'peep' | 'group';
  /**
   * Card size
   */
  size?: 'sm' | 'default' | 'lg';
}

const PeepCard = React.forwardRef<HTMLDivElement, PeepCardProps>(
  (
    {
      className,
      card = true,
      cardId,
      peep = true,
      group = false,
      avtrSrc,
      avtrAlt,
      avtrBdgClr,
      titleSrc,
      profLink,
      profClick,
      chatLink,
      chatBtnClick,
      moreLink,
      moreBtnClick,
      listQty,
      listAdaptIcons = [],
      listLink,
      listClick,
      peepQty,
      peepAvtrSources = [],
      peepLink,
      peepClick,
      calQty,
      calAdaptIcons = [],
      calLink,
      calClick,
      mode,
      size,
      ...props
    },
    ref
  ) => {
    const actualMode = mode || (group ? 'group' : 'peep');

    const renderAdaptIcon = (adaptIcon: AdaptIcon, index: number) => {
      return (
        <div
          key={index}
          className={cn(
            adaptIconVariants({ shape: adaptIcon.shape, size: adaptIcon.size }),
            `bg-${adaptIcon.bgColor}`
          )}
        >
          {adaptIcon.src}
        </div>
      );
    };

    const renderStatSection = (
      type: 'list' | 'peep' | 'cal',
      qty?: number,
      adaptIcons?: AdaptIcon[],
      avtrSources?: string[],
      link?: string,
      clickHandler?: () => void
    ) => {
      if (qty === undefined) return null;

      const handleClick = () => {
        if (clickHandler) {
          clickHandler();
        }
      };

      const isClickable = Boolean(link || clickHandler);
      const Component = isClickable ? 'button' : 'div';

      return (
        <Component
          className={cn(
            'flex items-center justify-between p-3 border-t border-border',
            isClickable && 'hover:bg-accent/50 transition-colors cursor-pointer'
          )}
          onClick={isClickable ? handleClick : undefined}
        >
          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium text-foreground'>{qty}</span>
            <span className='text-xs text-muted-foreground'>
              {type === 'list' && 'Lists'}
              {type === 'peep' && 'People'}
              {type === 'cal' && 'Events'}
            </span>
          </div>

          {/* Icons section */}
          <div className='flex items-center gap-1'>
            {type === 'peep' && avtrSources && (
              <div className='flex -space-x-2'>
                {avtrSources.slice(0, 3).map((src, index) => (
                  <Avatar
                    key={index}
                    src={src}
                    alt={`Connection ${index + 1}`}
                    size='sm'
                    className='border-2 border-background'
                  />
                ))}
              </div>
            )}

            {(type === 'list' || type === 'cal') && adaptIcons && (
              <div className='flex gap-1'>
                {adaptIcons.slice(0, 3).map(renderAdaptIcon)}
              </div>
            )}
          </div>
        </Component>
      );
    };

    if (!card) return null;

    return (
      <Card
        ref={ref}
        className={cn(peepCardVariants({ mode: actualMode, size }), className)}
        id={cardId}
        {...props}
      >
        {/* Header Section */}
        <div className='p-4 text-center'>
          <div className='relative inline-block'>
            <Avatar
              src={avtrSrc}
              alt={avtrAlt || titleSrc}
              size='lg'
              className='mx-auto'
            />
            {avtrBdgClr && (
              <div
                className={cn(
                  'absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background',
                  `bg-${avtrBdgClr}`
                )}
              />
            )}
          </div>

          <div className='mt-3 space-y-1'>
            {profLink || profClick ? (
              <button
                className='text-base font-semibold text-foreground hover:text-primary transition-colors'
                onClick={profClick}
              >
                {titleSrc}
              </button>
            ) : (
              <h3 className='text-base font-semibold text-foreground'>
                {titleSrc}
              </h3>
            )}
          </div>

          {/* Action Buttons */}
          <div className='flex justify-center gap-2 mt-3'>
            {(chatLink || chatBtnClick) && (
              <Button
                variant='outline'
                size='sm'
                onClick={chatBtnClick}
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

            {(moreLink || moreBtnClick) && (
              <Button variant='ghost' size='sm' onClick={moreBtnClick}>
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
        </div>

        {/* Stats Sections */}
        <div className='border-t border-border'>
          {renderStatSection(
            'list',
            listQty,
            listAdaptIcons,
            undefined,
            listLink,
            listClick
          )}
          {renderStatSection(
            'peep',
            peepQty,
            undefined,
            peepAvtrSources,
            peepLink,
            peepClick
          )}
          {renderStatSection(
            'cal',
            calQty,
            calAdaptIcons,
            undefined,
            calLink,
            calClick
          )}
        </div>
      </Card>
    );
  }
);

PeepCard.displayName = 'PeepCard';

export { PeepCard, peepCardVariants, type AdaptIcon };
