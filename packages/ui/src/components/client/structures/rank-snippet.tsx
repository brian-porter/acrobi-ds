import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { SecHead, type SecHeadAction } from '../../structures/sec-head';
import { Avatar } from '../../primitives/avatar';
import { type AdaptIcon } from './peep-card';

const rankSnippetVariants = cva('w-full space-y-4', {
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

const adaptIconVariants = cva(
  'flex items-center justify-center text-white text-xs font-medium',
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

export interface RankActivity {
  /**
   * Activity section visibility
   */
  actvSec?: boolean;
  /**
   * Activity section header visibility
   */
  actvSecHead?: boolean;
  /**
   * Activity visual/icon source
   */
  actvVizSrc?: string;
  /**
   * Activity visual alt text
   */
  actvVizAlt?: string;
  /**
   * Activity title/name
   */
  actvTitleSrc?: string;
  /**
   * Activity subtitle (points earned)
   */
  actvSubtxtSrc?: string;
  /**
   * Activity right-aligned text (timestamp)
   */
  actvRTxtSrc?: string;
  /**
   * Activity action visibility
   */
  actvAct?: boolean;
  /**
   * Activity action click handler
   */
  actvActClick?: () => void;
  /**
   * Activity cell click handler
   */
  actvCellClick?: () => void;
}

export interface RankSnippetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rankSnippetVariants> {
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
   * Ranking visual source
   */
  rankVizSrc?: string;
  /**
   * Ranking visual alt text
   */
  rankVizAlt?: string;
  /**
   * Ranking title/level
   */
  rankTitleSrc?: string;
  /**
   * Current year
   */
  rankYrSrc?: string;
  /**
   * Established year (when account was created)
   */
  rankEstYrSrc?: string;
  /**
   * Points earned this year
   */
  rankPtsSrc?: string;
  /**
   * Section 1 mapping (connections/achievements)
   */
  sec1Map?: React.ReactNode;
  /**
   * Example section 1 visibility
   * @default false
   */
  exampleSec1Soon?: boolean;
  /**
   * Activity mapping
   */
  actvMap?: React.ReactNode;
  /**
   * Example activity visibility
   * @default false
   */
  exampleActivity?: boolean;
  /**
   * Section 1 achievements section visibility
   */
  sec1Sec?: boolean;
  /**
   * Section 1 section header visibility
   */
  sec1SecHead?: boolean;
  /**
   * Section 1 achievement adapt icon source
   */
  sec1AchAdptIcnSrc?: string;
  /**
   * Section 1 achievement adapt icon background color
   */
  sec1AchAdptBgClr?: string;
  /**
   * Section 1 achievement adapt icon shape
   */
  sec1AchAdptShape?: 'c' | 'r' | 'b' | 's';
  /**
   * Section 1 adapt icon size
   */
  sec1AdptSz?: 's' | 'm' | 'l' | 'xl';
  /**
   * Section 1 title
   */
  sec1TitleSrc?: string;
  /**
   * Section 1 cell click handler
   */
  sec1CellClick?: () => void;
  /**
   * Activities list
   */
  activities?: RankActivity[];
  /**
   * Stats data
   */
  statsData?: Array<{
    label: string;
    value: string | number;
    visible?: boolean;
  }>;
  /**
   * Component variant
   */
  variant?: 'default' | 'card';
}

const RankSnippet = React.forwardRef<HTMLDivElement, RankSnippetProps>(
  (
    {
      className,
      sec = true,
      secHead = true,
      stats = true,
      headTitleIcn = true,
      headAct1 = true,
      headTitleIcnSrc = '🏆',
      headTitleSrc = 'Rank & Rewards',
      headAct1TxtSrc = 'View All',
      headAct1Click,
      rankVizSrc,
      rankVizAlt,
      rankTitleSrc,
      rankYrSrc,
      rankEstYrSrc,
      rankPtsSrc,
      sec1Map,
      exampleSec1Soon = false,
      actvMap,
      exampleActivity = false,
      sec1Sec = true,
      sec1SecHead = true,
      sec1AchAdptIcnSrc = '⭐',
      sec1AchAdptBgClr = 'yellow-500',
      sec1AchAdptShape = 'c',
      sec1AdptSz = 'm',
      sec1TitleSrc = 'Achievements',
      sec1CellClick,
      activities = [],
      statsData = [],
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

    const renderAdaptIcon = (icon: AdaptIcon) => {
      return (
        <div
          className={cn(
            adaptIconVariants({ shape: icon.shape, size: icon.size }),
            `bg-${icon.bgColor}`
          )}
        >
          {icon.src}
        </div>
      );
    };

    const renderActivity = (activity: RankActivity, index: number) => {
      if (!activity.actvSec) return null;

      return (
        <div
          key={index}
          className={cn(
            'flex items-center gap-3 p-2 rounded-md transition-colors',
            (activity.actvCellClick || activity.actvActClick) &&
              'hover:bg-accent/50 cursor-pointer'
          )}
          onClick={activity.actvCellClick}
        >
          {activity.actvVizSrc && (
            <div className='w-8 h-8 flex items-center justify-center bg-muted rounded'>
              <span className='text-sm'>{activity.actvVizSrc}</span>
            </div>
          )}

          <div className='flex-1 min-w-0'>
            <div className='text-sm font-medium text-foreground truncate'>
              {activity.actvTitleSrc}
            </div>
            {activity.actvSubtxtSrc && (
              <div className='text-xs text-muted-foreground'>
                {activity.actvSubtxtSrc}
              </div>
            )}
          </div>

          {activity.actvRTxtSrc && (
            <div className='text-xs text-muted-foreground'>
              {activity.actvRTxtSrc}
            </div>
          )}

          {activity.actvAct && activity.actvActClick && (
            <button
              className='text-xs text-primary hover:text-primary/80 transition-colors'
              onClick={e => {
                e.stopPropagation();
                activity.actvActClick?.();
              }}
            >
              View
            </button>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(rankSnippetVariants({ variant }), className)}
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

        {/* Main Rank Content */}
        <div className='space-y-4'>
          {/* Rank Visual and Info */}
          <div className='flex items-center gap-4'>
            {rankVizSrc && (
              <div className='w-16 h-16 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full text-white text-2xl font-bold'>
                {rankVizSrc}
              </div>
            )}

            <div className='flex-1'>
              {rankTitleSrc && (
                <h3 className='text-lg font-semibold text-foreground'>
                  {rankTitleSrc}
                </h3>
              )}

              <div className='flex items-center gap-4 text-sm text-muted-foreground mt-1'>
                {rankYrSrc && <span>{rankYrSrc}</span>}
                {rankEstYrSrc && <span>Member since {rankEstYrSrc}</span>}
              </div>

              {rankPtsSrc && (
                <div className='text-sm font-medium text-primary mt-1'>
                  {rankPtsSrc} points this year
                </div>
              )}
            </div>
          </div>

          {/* Section 1 - Achievements */}
          {sec1Sec && (
            <div className='space-y-2'>
              {sec1SecHead && (
                <h4 className='text-sm font-medium text-foreground'>
                  {sec1TitleSrc}
                </h4>
              )}

              <div
                className={cn(
                  'flex items-center gap-3 p-3 rounded-md border border-border transition-colors',
                  sec1CellClick && 'hover:bg-accent/50 cursor-pointer'
                )}
                onClick={sec1CellClick}
              >
                {renderAdaptIcon({
                  src: sec1AchAdptIcnSrc || '⭐',
                  bgColor: sec1AchAdptBgClr || 'yellow-500',
                  shape: sec1AchAdptShape,
                  size: sec1AdptSz,
                })}

                <span className='text-sm text-foreground'>{sec1TitleSrc}</span>
              </div>

              {exampleSec1Soon && (
                <div className='text-xs text-muted-foreground italic'>
                  More achievements coming soon...
                </div>
              )}

              {sec1Map}
            </div>
          )}

          {/* Activities */}
          {(activities.length > 0 || exampleActivity || actvMap) && (
            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-foreground'>
                Recent Activity
              </h4>

              <div className='space-y-1'>
                {activities.map(renderActivity)}

                {exampleActivity && (
                  <div className='flex items-center gap-3 p-2 rounded-md bg-muted/50'>
                    <div className='w-8 h-8 flex items-center justify-center bg-blue-500 rounded text-white text-sm'>
                      📝
                    </div>
                    <div className='flex-1'>
                      <div className='text-sm font-medium text-foreground'>
                        Added a review
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        +10 points
                      </div>
                    </div>
                    <div className='text-xs text-muted-foreground'>2h ago</div>
                  </div>
                )}

                {actvMap}
              </div>
            </div>
          )}
        </div>

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

RankSnippet.displayName = 'RankSnippet';

export { RankSnippet, rankSnippetVariants, type RankActivity };
