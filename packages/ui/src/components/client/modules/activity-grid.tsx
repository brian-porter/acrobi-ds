import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { SecHead, type SecHeadAction } from '../../structures/sec-head';
import { PeepCard, type PeepCardProps } from '../structures/peep-card';
import { Button } from '../../primitives/button';

const activityGridVariants = cva('w-full space-y-4', {
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

export interface ActivityGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof activityGridVariants> {
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
   * Cell mapping slot for grid items
   */
  cellMap?: React.ReactNode;
  /**
   * Example cell visibility
   * @default false
   */
  exampleCell?: boolean;
  /**
   * People activities data array (using Card-Peep-Data component)
   */
  activities?: PeepCardProps[];
  /**
   * Empty state visibility
   * @default false
   */
  empty?: boolean;
  /**
   * Secondary button visibility in empty state
   * @default false
   */
  secBtn?: boolean;
  /**
   * Tertiary button visibility in empty state
   * @default false
   */
  tirBtn?: boolean;
  /**
   * Bottom dock visibility in empty state
   * @default false
   */
  btmDoc?: boolean;
  /**
   * Empty state icon
   */
  icnSrc?: string;
  /**
   * Empty state headline
   */
  headlineSrc?: string;
  /**
   * Empty state subtext
   */
  subtxtSrc?: string;
  /**
   * Secondary button text
   */
  secBtnTxtSrc?: string;
  /**
   * Tertiary button text
   */
  tirBtnTxtSrc?: string;
  /**
   * Primary button text
   */
  primeBtnTxtSrc?: string;
  /**
   * Primary button style variant
   */
  primeBtnStyl?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  /**
   * Secondary button click handler
   */
  secBtnClick?: () => void;
  /**
   * Tertiary button click handler
   */
  tirBtnClick?: () => void;
  /**
   * Primary button click handler
   */
  primeBtnClick?: () => void;
  /**
   * Component variant
   */
  variant?: 'default' | 'card';
}

const ActivityGrid = React.forwardRef<HTMLDivElement, ActivityGridProps>(
  (
    {
      className,
      sec = true,
      secHead = true,
      headTitleIcn = true,
      headAct1 = true,
      headTitleIcnSrc = '📊',
      headTitleSrc = 'Activity',
      headAct1TxtSrc = 'View All',
      headAct1Click,
      cellMap,
      exampleCell = false,
      activities = [],
      empty = false,
      secBtn = false,
      tirBtn = false,
      btmDoc = false,
      icnSrc = '📊',
      headlineSrc = 'No Activity',
      subtxtSrc = 'There is no activity to display at this time',
      secBtnTxtSrc = 'Refresh',
      tirBtnTxtSrc = 'Settings',
      primeBtnTxtSrc = 'Get Started',
      primeBtnStyl = 'default',
      secBtnClick,
      tirBtnClick,
      primeBtnClick,
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

    const renderActivityCard = (activityData: PeepCardProps, index: number) => {
      return <PeepCard key={activityData.cardId || index} {...activityData} />;
    };

    const renderExampleCell = () => (
      <PeepCard
        titleSrc='Sarah Wilson'
        avtrSrc=''
        avtrAlt='Sarah Wilson'
        avtrBdgClr='blue-500'
        listQty={8}
        listAdaptIcons={[
          { src: '🎁', bgColor: 'red-500', shape: 'c', size: 'm' },
          { src: '📝', bgColor: 'blue-500', shape: 'c', size: 'm' },
        ]}
        peepQty={42}
        peepAvtrSources={[
          '/avatars/user1.jpg',
          '/avatars/user2.jpg',
          '/avatars/user3.jpg',
        ]}
        calQty={2}
        calAdaptIcons={[
          { src: '🎉', bgColor: 'purple-500', shape: 'c', size: 'm' },
        ]}
        chatBtnClick={() => console.log('Chat with Sarah')}
        profClick={() => console.log("View Sarah's profile")}
        moreBtnClick={() => console.log('More actions for Sarah')}
      />
    );

    const renderEmptyState = () => (
      <div className='text-center py-12'>
        <div className='text-6xl mb-6' aria-hidden='true'>
          {icnSrc}
        </div>
        <h3 className='text-xl font-semibold text-foreground mb-3'>
          {headlineSrc}
        </h3>
        <p className='text-sm text-muted-foreground mb-6 max-w-md mx-auto'>
          {subtxtSrc}
        </p>

        {/* Action Buttons */}
        <div className='space-y-3'>
          {/* Secondary and Tertiary buttons */}
          {(secBtn || tirBtn) && (
            <div className='flex justify-center gap-3'>
              {secBtn && secBtnTxtSrc && (
                <Button variant='outline' onClick={secBtnClick}>
                  {secBtnTxtSrc}
                </Button>
              )}

              {tirBtn && tirBtnTxtSrc && (
                <Button variant='ghost' onClick={tirBtnClick}>
                  {tirBtnTxtSrc}
                </Button>
              )}
            </div>
          )}

          {/* Bottom dock with primary button */}
          {btmDoc && primeBtnTxtSrc && (
            <div className='pt-3 border-t border-border'>
              <Button variant={primeBtnStyl} onClick={primeBtnClick} size='lg'>
                {primeBtnTxtSrc}
              </Button>
            </div>
          )}

          {/* Simple primary button if no bottom dock */}
          {!btmDoc && primeBtnTxtSrc && !secBtn && !tirBtn && (
            <Button variant={primeBtnStyl} onClick={primeBtnClick}>
              {primeBtnTxtSrc}
            </Button>
          )}
        </div>
      </div>
    );

    const hasContent = activities.length > 0 || exampleCell || cellMap;

    return (
      <div
        ref={ref}
        className={cn(activityGridVariants({ variant }), className)}
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
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {/* Mapped activities (Card-Peep-Data components) */}
            {activities.map(renderActivityCard)}

            {/* Example cell */}
            {exampleCell && renderExampleCell()}

            {/* Custom cell mapping */}
            {cellMap}
          </div>
        )}
      </div>
    );
  }
);

ActivityGrid.displayName = 'ActivityGrid';

export { ActivityGrid, activityGridVariants };
