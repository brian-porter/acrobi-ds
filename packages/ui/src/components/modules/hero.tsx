import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { SecHead, type SecHeadProps } from '../structures/sec-head';
import { Button, type ButtonProps } from '../primitives/button';
import { Badge } from '../primitives/badge';

const heroVariants = cva('relative w-full', {
  variants: {
    variant: {
      default: 'py-12 px-4',
      minimal: 'py-8 px-4',
      full: 'min-h-screen flex items-center justify-center px-4',
      split: 'py-16 px-4',
      centered: 'py-16 px-4 text-center',
    },
    background: {
      none: '',
      gradient: 'bg-gradient-to-br from-background to-muted',
      image: 'bg-cover bg-center bg-no-repeat',
      video: 'overflow-hidden',
      solid: 'bg-muted',
    },
    overlay: {
      none: '',
      light: 'before:absolute before:inset-0 before:bg-black/20 before:z-10',
      medium: 'before:absolute before:inset-0 before:bg-black/40 before:z-10',
      dark: 'before:absolute before:inset-0 before:bg-black/60 before:z-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    background: 'none',
    overlay: 'none',
  },
});

const heroContentVariants = cva('relative z-20 w-full max-w-7xl mx-auto', {
  variants: {
    layout: {
      default: 'space-y-8',
      split: 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
      stacked: 'space-y-12',
      minimal: 'space-y-6',
    },
    alignment: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    layout: 'default',
    alignment: 'left',
  },
});

export interface HeroAction {
  /**
   * Action content (text or icon)
   */
  children: React.ReactNode;
  /**
   * Action click handler
   */
  onClick?: ButtonProps['onClick'];
  /**
   * Button variant
   */
  variant?: ButtonProps['variant'];
  /**
   * Button size
   */
  size?: ButtonProps['size'];
  /**
   * Whether action is disabled
   */
  disabled?: boolean;
  /**
   * Additional button props
   */
  buttonProps?: Omit<
    ButtonProps,
    'children' | 'onClick' | 'variant' | 'size' | 'disabled'
  >;
}

export interface HeroProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof heroVariants> {
  /**
   * Hero title
   */
  title: string;
  /**
   * Hero subtitle
   */
  subtitle?: string;
  /**
   * Hero description
   */
  description?: string;
  /**
   * Badge text to display above title
   */
  badge?: string;
  /**
   * Badge variant
   */
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  /**
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Background video URL
   */
  backgroundVideo?: string;
  /**
   * Hero variant style
   * @default "default"
   */
  variant?: 'default' | 'minimal' | 'full' | 'split' | 'centered';
  /**
   * Background type
   * @default "none"
   */
  background?: 'none' | 'gradient' | 'image' | 'video' | 'solid';
  /**
   * Overlay opacity for background images/videos
   * @default "none"
   */
  overlay?: 'none' | 'light' | 'medium' | 'dark';
  /**
   * Content layout
   * @default "default"
   */
  layout?: 'default' | 'split' | 'stacked' | 'minimal';
  /**
   * Text alignment
   * @default "left"
   */
  alignment?: 'left' | 'center' | 'right';
  /**
   * Primary action button
   */
  primaryAction?: HeroAction;
  /**
   * Secondary action button
   */
  secondaryAction?: HeroAction;
  /**
   * Additional action buttons
   */
  actions?: HeroAction[];
  /**
   * Media content (image, video, etc.)
   */
  media?: React.ReactNode;
  /**
   * Custom content to render in the hero
   */
  children?: React.ReactNode;
  /**
   * Whether to show a fade overlay at the bottom
   */
  fadeBottom?: boolean;
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  (
    {
      className,
      title,
      subtitle,
      description,
      badge,
      badgeVariant = 'default',
      backgroundImage,
      backgroundVideo,
      variant,
      background,
      overlay,
      layout,
      alignment,
      primaryAction,
      secondaryAction,
      actions = [],
      media,
      children,
      fadeBottom = false,
      style,
      ...props
    },
    ref
  ) => {
    const hasActions = primaryAction || secondaryAction || actions.length > 0;
    const allActions = React.useMemo(() => {
      const actionList: HeroAction[] = [];
      if (primaryAction) actionList.push(primaryAction);
      if (secondaryAction) actionList.push(secondaryAction);
      return [...actionList, ...actions];
    }, [primaryAction, secondaryAction, actions]);

    const heroStyle = React.useMemo(() => {
      const baseStyle = { ...style };

      if (background === 'image' && backgroundImage) {
        baseStyle.backgroundImage = `url(${backgroundImage})`;
      }

      return baseStyle;
    }, [style, background, backgroundImage]);

    const isSplitLayout = layout === 'split';

    return (
      <div
        ref={ref}
        className={cn(
          heroVariants({ variant, background, overlay }),
          className
        )}
        style={heroStyle}
        {...props}
      >
        {background === 'video' && backgroundVideo && (
          <video
            className='absolute inset-0 w-full h-full object-cover z-0'
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={backgroundVideo} type='video/mp4' />
          </video>
        )}

        <div className={cn(heroContentVariants({ layout, alignment }))}>
          {!isSplitLayout ? (
            // Standard layouts
            <>
              <div className='max-w-4xl mx-auto space-y-6'>
                {badge && (
                  <div
                    className={cn(
                      'flex',
                      alignment === 'center' && 'justify-center',
                      alignment === 'right' && 'justify-end'
                    )}
                  >
                    <Badge
                      color={
                        badgeVariant === 'default'
                          ? 'p500'
                          : badgeVariant === 'secondary'
                            ? 'n500'
                            : badgeVariant === 'destructive'
                              ? 'fd500'
                              : 'p500'
                      }
                      text={badge}
                    />
                  </div>
                )}

                <SecHead
                  title={title}
                  subtitle={subtitle}
                  description={description}
                  variant={variant === 'full' ? 'hero' : 'default'}
                  size={
                    variant === 'minimal'
                      ? 'sm'
                      : variant === 'full'
                        ? 'xl'
                        : 'lg'
                  }
                  className={cn(
                    alignment === 'center' && 'text-center',
                    alignment === 'right' && 'text-right'
                  )}
                />

                {children}
              </div>

              {media && <div className='flex justify-center'>{media}</div>}

              {hasActions && (
                <div
                  className={cn(
                    'flex flex-wrap gap-4',
                    alignment === 'center' && 'justify-center',
                    alignment === 'right' && 'justify-end'
                  )}
                >
                  {allActions.map((action, index) => (
                    <Button
                      key={index}
                      variant={
                        action.variant || (index === 0 ? 'primary' : 'outline')
                      }
                      size={action.size || 'lg'}
                      disabled={action.disabled}
                      onClick={action.onClick}
                      {...action.buttonProps}
                    >
                      {action.children}
                    </Button>
                  ))}
                </div>
              )}
            </>
          ) : (
            // Split layout
            <>
              <div className='space-y-6'>
                {badge && (
                  <Badge
                    color={
                      badgeVariant === 'default'
                        ? 'p500'
                        : badgeVariant === 'secondary'
                          ? 'n500'
                          : badgeVariant === 'destructive'
                            ? 'fd500'
                            : 'p500'
                    }
                    text={badge}
                  />
                )}

                <SecHead
                  title={title}
                  subtitle={subtitle}
                  description={description}
                  variant='default'
                  size='lg'
                />

                {hasActions && (
                  <div className='flex flex-wrap gap-4'>
                    {allActions.map((action, index) => (
                      <Button
                        key={index}
                        variant={
                          action.variant ||
                          (index === 0 ? 'primary' : 'outline')
                        }
                        size={action.size || 'lg'}
                        disabled={action.disabled}
                        onClick={action.onClick}
                        {...action.buttonProps}
                      >
                        {action.children}
                      </Button>
                    ))}
                  </div>
                )}

                {children}
              </div>

              {media && (
                <div className='flex justify-center lg:justify-end'>
                  {media}
                </div>
              )}
            </>
          )}
        </div>

        {fadeBottom && (
          <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent z-10' />
        )}
      </div>
    );
  }
);
Hero.displayName = 'Hero';

export { Hero, heroVariants };
