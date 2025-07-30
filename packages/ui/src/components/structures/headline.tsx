import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Headline as HeadlinePrimitive } from '../primitives/headline';

const headlineStructureVariants = cva('space-y-2', {
  variants: {
    spacing: {
      none: 'space-y-0',
      sm: 'space-y-1',
      default: 'space-y-2',
      lg: 'space-y-3',
      xl: 'space-y-4',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    spacing: 'default',
    align: 'left',
  },
});

export interface HeadlineAction {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'ghost' | 'link';
  disabled?: boolean;
}

export interface HeadlineStructureProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof headlineStructureVariants> {
  /**
   * Main headline text
   */
  title: React.ReactNode;
  /**
   * Subtitle text
   */
  subtitle?: React.ReactNode;
  /**
   * Description text
   */
  description?: React.ReactNode;
  /**
   * Headline level (inherited from primitive)
   */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Headline color (inherited from primitive)
   */
  color?: 'default' | 'muted' | 'accent' | 'destructive';
  /**
   * Headline weight (inherited from primitive)
   */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /**
   * Leading content (e.g., icon, avatar)
   */
  leading?: React.ReactNode;
  /**
   * Trailing content (e.g., badge, actions)
   */
  trailing?: React.ReactNode;
  /**
   * Action buttons
   */
  actions?: HeadlineAction[];
  /**
   * Whether actions are shown on hover only
   */
  showActionsOnHover?: boolean;
  /**
   * Optional badge or status indicator
   */
  badge?: React.ReactNode;
  /**
   * Custom subtitle styling
   */
  subtitleClassName?: string;
  /**
   * Custom description styling
   */
  descriptionClassName?: string;
  /**
   * Layout variant
   */
  layout?: 'default' | 'hero' | 'section';
}

const HeadlineStructure = React.forwardRef<
  HTMLDivElement,
  HeadlineStructureProps
>(
  (
    {
      className,
      spacing,
      align,
      title,
      subtitle,
      description,
      level = 'h2',
      color = 'default',
      weight = 'semibold',
      leading,
      trailing,
      actions,
      showActionsOnHover = false,
      badge,
      subtitleClassName,
      descriptionClassName,
      layout = 'default',
      ...props
    },
    ref
  ) => {
    const isHero = layout === 'hero';
    const isSection = layout === 'section';

    return (
      <div
        className={cn(
          headlineStructureVariants({ spacing, align }),
          'group',
          {
            'py-12 md:py-20': isHero,
            'py-8 border-b border-border': isSection,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        <div
          className={cn(
            'flex items-start',
            align === 'center' && 'justify-center',
            align === 'right' && 'justify-end'
          )}
        >
          {leading && !isHero && (
            <div className='flex-shrink-0 mr-4'>{leading}</div>
          )}

          <div
            className={cn(
              'flex-1 min-w-0',
              align === 'center' && 'text-center'
            )}
          >
            <div className='flex items-start justify-between'>
              <div
                className={cn(
                  'flex-1 min-w-0',
                  align === 'center' && 'flex flex-col items-center'
                )}
              >
                <div className='flex items-center gap-3'>
                  <HeadlinePrimitive
                    level={level}
                    color={color}
                    weight={weight}
                    align={align || 'left'}
                    className={cn(
                      isHero &&
                        level === 'h1' &&
                        'text-5xl md:text-6xl lg:text-7xl',
                      isHero &&
                        level === 'h2' &&
                        'text-4xl md:text-5xl lg:text-6xl'
                    )}
                  >
                    {title}
                  </HeadlinePrimitive>

                  {badge && <div className='flex-shrink-0'>{badge}</div>}
                </div>

                {subtitle && (
                  <div
                    className={cn(
                      'text-lg text-muted-foreground font-medium',
                      isHero && 'text-xl md:text-2xl mt-4',
                      subtitleClassName
                    )}
                  >
                    {subtitle}
                  </div>
                )}

                {description && (
                  <div
                    className={cn(
                      'text-muted-foreground',
                      isHero && 'text-lg md:text-xl mt-6 max-w-3xl',
                      !isHero && subtitle && 'mt-1',
                      !isHero && !subtitle && 'mt-2',
                      descriptionClassName
                    )}
                  >
                    {description}
                  </div>
                )}

                {actions && actions.length > 0 && (
                  <div
                    className={cn(
                      'flex items-center gap-3',
                      isHero && 'mt-8',
                      !isHero && 'mt-4',
                      showActionsOnHover &&
                        !isHero &&
                        'opacity-0 group-hover:opacity-100 transition-opacity',
                      align === 'center' && 'justify-center',
                      align === 'right' && 'justify-end'
                    )}
                  >
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        type='button'
                        onClick={action.onClick}
                        disabled={action.disabled}
                        className={cn(
                          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                          {
                            'h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90':
                              action.variant === 'default' || !action.variant,
                            'h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground':
                              action.variant === 'ghost',
                            'text-primary underline-offset-4 hover:underline':
                              action.variant === 'link',
                          },
                          isHero && 'h-12 px-6 text-base'
                        )}
                      >
                        {action.icon && (
                          <span className='mr-2 h-4 w-4'>{action.icon}</span>
                        )}
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {(trailing || (actions && !isHero && showActionsOnHover)) && (
                <div className='flex-shrink-0 ml-4'>{trailing}</div>
              )}
            </div>
          </div>
        </div>

        {isHero && leading && (
          <div className='flex justify-center mt-12'>{leading}</div>
        )}
      </div>
    );
  }
);

HeadlineStructure.displayName = 'HeadlineStructure';

export { HeadlineStructure, headlineStructureVariants };
