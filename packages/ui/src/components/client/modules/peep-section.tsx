import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { SecHead, type SecHeadAction } from '../../structures/sec-head';
import { PeepCard, type PeepCardProps } from '../structures/peep-card';
import { Button } from '../../primitives/button';

const peepSectionVariants = cva('w-full space-y-4', {
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

export interface PeepSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof peepSectionVariants> {
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
   * Stats visibility at bottom
   * @default true
   */
  stats?: boolean;
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
   * Peeps data array
   */
  peeps?: PeepCardProps[];
  /**
   * Stats data (numbered stats as per docs)
   */
  statsData?: Array<{
    label: string;
    value: string | number;
    visible?: boolean;
  }>;
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

const PeepSection = React.forwardRef<HTMLDivElement, PeepSectionProps>(
  (
    {
      className,
      sec = true,
      secHead = true,
      stats = true,
      headTitleIcn = true,
      headAct1 = true,
      headTitleIcnSrc = '👥',
      headTitleSrc = 'People',
      headAct1TxtSrc = 'View All',
      headAct1Click,
      sideFade = true,
      cellMap,
      exampleCell = false,
      peeps = [],
      statsData = [],
      empty = false,
      emptyIcnSrc = '👤',
      emptyHlineSrc = 'No People Yet',
      emptySubTxtSrc = 'Connect with people to see them here',
      emptyCtaTxtSrc = 'Find People',
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

    const renderPeepCard = (peepData: PeepCardProps, index: number) => {
      return <PeepCard key={peepData.cardId || index} {...peepData} />;
    };

    const renderExampleCell = () => (
      <PeepCard
        titleSrc='John Doe'
        avtrSrc=''
        avtrAlt='John Doe'
        avtrBdgClr='green-500'
        listQty={12}
        listAdaptIcons={[
          { src: '🎁', bgColor: 'red-500', shape: 'c', size: 'm' },
          { src: '📝', bgColor: 'blue-500', shape: 'c', size: 'm' },
          { src: '🛒', bgColor: 'green-500', shape: 'c', size: 'm' },
        ]}
        peepQty={85}
        peepAvtrSources={[
          '/avatars/user1.jpg',
          '/avatars/user2.jpg',
          '/avatars/user3.jpg',
        ]}
        calQty={3}
        calAdaptIcons={[
          { src: '🎂', bgColor: 'purple-500', shape: 'c', size: 'm' },
          { src: '🎉', bgColor: 'orange-500', shape: 'c', size: 'm' },
        ]}
        chatBtnClick={() => console.log('Chat with John')}
        profClick={() => console.log("View John's profile")}
        moreBtnClick={() => console.log('More actions for John')}
      />
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

    const hasContent = peeps.length > 0 || exampleCell || cellMap;

    return (
      <div
        ref={ref}
        className={cn(peepSectionVariants({ variant }), className)}
        {...props}
      >
        {secHead && (
          <SecHead
            title={headTitleSrc || ''}
            titleIcon={headTitleIcn ? headTitleIcnSrc : undefined}
            actions={headerActions}
            size='sm'
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
              {/* Mapped peeps */}
              {peeps.map(renderPeepCard)}

              {/* Example cell */}
              {exampleCell && renderExampleCell()}

              {/* Custom cell mapping */}
              {cellMap}
            </div>
          </div>
        )}

        {/* Stats */}
        {stats && statsData.length > 0 && (
          <div className='flex justify-between pt-4 border-t border-border'>
            {statsData.map(
              (stat, index) =>
                stat.visible !== false && (
                  <div key={index} className='text-center'>
                    <div className='text-lg font-semibold text-foreground'>
                      {stat.value}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      {stat.label}
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    );
  }
);

PeepSection.displayName = 'PeepSection';

export { PeepSection, peepSectionVariants };
