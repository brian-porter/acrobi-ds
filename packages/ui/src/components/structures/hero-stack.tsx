import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Icon } from '../primitives/icon';
import { Headline } from '../primitives/headline';
import { Button } from '../primitives/button';

/**
 * HeroStack variant styles using Acrobi Design System classes
 * This matches the devlink HeroStack component pattern using authentic
 * Acrobi styling with specific CSS classes
 */
const heroStackVariants = cva(
  // Base styles - using authentic Acrobi hero wrapper class
  'hero-wrap',
  {
    variants: {
      variant: {
        default: '',
        centered: '',
        compact: '',
      },
      size: {
        sm: '',
        default: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Hero image styling using authentic Acrobi patterns
const heroImageVariants = cva('hero-img', {
  variants: {
    visible: {
      true: '',
      false: 'hidden',
    },
  },
  defaultVariants: {
    visible: true,
  },
});

// Hero icon styling
const heroIconVariants = cva('hero-icn', {
  variants: {
    visible: {
      true: '',
      false: 'hidden',
    },
  },
  defaultVariants: {
    visible: true,
  },
});

// Hero back button styling
const heroBackButtonVariants = cva('hero-backbtn', {
  variants: {
    visible: {
      true: '',
      false: 'hidden',
    },
  },
  defaultVariants: {
    visible: true,
  },
});

export interface HeroStackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof heroStackVariants> {
  /**
   * Show image (img in Webflow)
   */
  showImage?: boolean;
  /**
   * Show icon (icn in Webflow)
   */
  showIcon?: boolean;
  /**
   * Show subtitle text (subtxt in Webflow)
   */
  showSubtitle?: boolean;
  /**
   * Show back button (backBtn in Webflow)
   */
  showBackButton?: boolean;
  /**
   * Image content for custom image mapping (imgMap in Webflow)
   */
  imageMap?: React.ReactNode;
  /**
   * Image source URL (imgSrc in Webflow)
   */
  imageSrc?: string;
  /**
   * Image size (imgSz in Webflow)
   */
  imageSize?: string;
  /**
   * Icon name (icnSrc in Webflow)
   */
  iconName?: string;
  /**
   * Icon color (derived from Icon component)
   */
  iconColor?: 'p500' | 'n700' | 'n500' | 'n300' | 'inherit';
  /**
   * Icon size (derived from Icon component)
   */
  iconSize?: 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl';
  /**
   * Headline text (headlineSrc in Webflow)
   */
  headlineText?: string;
  /**
   * Subtitle text (subtxtSrc in Webflow)
   */
  subtitleText?: string;
  /**
   * Headline size (titleSz in Webflow)
   */
  headlineSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Text alignment (align in Webflow)
   */
  align?: 'l' | 'c' | 'r';
  /**
   * Back button click handler (backClick in Webflow)
   */
  onBackClick?: () => void;
  /**
   * Back button text
   */
  backButtonText?: string;
  /**
   * Back button icon
   */
  backButtonIcon?: string;
  /**
   * @deprecated Use showImage prop instead
   */
  img?: boolean;
  /**
   * @deprecated Use showIcon prop instead
   */
  icn?: boolean;
  /**
   * @deprecated Use showSubtitle prop instead
   */
  subtxt?: boolean;
  /**
   * @deprecated Use showBackButton prop instead
   */
  backBtn?: boolean;
  /**
   * @deprecated Use headlineText prop instead
   */
  title?: string;
  /**
   * @deprecated Use subtitleText prop instead
   */
  description?: string;
  /**
   * @deprecated Use iconName prop instead
   */
  icon?: string;
  /**
   * @deprecated Use iconSize prop instead
   */
  iconSize?: 'sm' | 'default' | 'lg';
  /**
   * Additional content to render below description
   */
  children?: React.ReactNode;
}

// Map icon size from legacy to Acrobi values
const getIconSize = (
  size: string | null | undefined
): 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' => {
  const sizeMap: Record<string, 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl'> = {
    sm: 'l',
    default: 'xl',
    lg: '2xl',
  };
  return sizeMap[size || 'default'] || 'xl';
};

// Map headline size values
const getHeadlineSize = (
  size: string | null | undefined
): 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' => {
  const sizeMap: Record<string, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
    sm: 'h5',
    default: 'h4',
    lg: 'h3',
  };
  return sizeMap[size || 'default'] || 'h4';
};

/**
 * HeroStack component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink HeroStack component.
 *
 * Key features:
 * - Uses .hero-wrap class for authentic styling
 * - Uses .hero-img, .hero-icn, .hero-backbtn for component sections
 * - Integrates with Icon, Headline, and Button components
 * - Supports conditional rendering of image, icon, subtitle, and back button
 * - Uses data attributes for image sizing
 *
 * @example
 * ```tsx
 * <HeroStack
 *   showImage={true}
 *   imageSrc="/hero-image.jpg"
 *   showIcon={true}
 *   iconName="home"
 *   headlineText="Welcome"
 *   subtitleText="Get started here"
 *   showBackButton={true}
 *   onBackClick={() => navigate(-1)}
 * />
 * ```
 */
const HeroStack = React.forwardRef<HTMLDivElement, HeroStackProps>(
  (
    {
      className,
      variant,
      size,
      showImage = true,
      showIcon = false,
      showSubtitle = true,
      showBackButton = false,
      imageMap,
      imageSrc = 'https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg',
      imageSize,
      iconName = 'default',
      iconColor = 'p500',
      iconSize = '2xl',
      headlineText = 'Headline Here',
      subtitleText = 'Short description goes here',
      headlineSize = 'h4',
      align = 'c',
      onBackClick,
      backButtonText = 'Back',
      backButtonIcon = 'nav_left',
      // Deprecated props for backward compatibility
      img,
      icn,
      subtxt,
      backBtn,
      title,
      description,
      icon,
      iconSize: legacyIconSize,
      children,
      ...props
    },
    ref
  ) => {
    // Handle backward compatibility
    const actualShowImage = img !== undefined ? img : showImage;
    const actualShowIcon = icn !== undefined ? icn : showIcon;
    const actualShowSubtitle = subtxt !== undefined ? subtxt : showSubtitle;
    const actualShowBackButton =
      backBtn !== undefined ? backBtn : showBackButton;
    const actualHeadlineText = title || headlineText;
    const actualSubtitleText = description || subtitleText;
    const actualIconName = icon || iconName;
    const actualIconSize = legacyIconSize
      ? getIconSize(legacyIconSize)
      : iconSize;
    const actualHeadlineSize = size ? getHeadlineSize(size) : headlineSize;

    return (
      <div
        ref={ref}
        className={cn(heroStackVariants({ variant, size }), className)}
        {...props}
      >
        {/* Hero Image */}
        {actualShowImage && (
          <div className={cn(heroImageVariants())}>
            {imageMap || (
              <img
                className='image-hero-sq'
                width='auto'
                height='auto'
                loading='lazy'
                data-obj-size={imageSize}
                alt=''
                src={imageSrc}
              />
            )}
          </div>
        )}

        {/* Hero Icon */}
        {actualShowIcon && (
          <div className={cn(heroIconVariants())}>
            <Icon
              name={actualIconName}
              color={iconColor}
              size={actualIconSize}
            />
          </div>
        )}

        {/* Headline with subtitle */}
        <Headline
          title={actualHeadlineText}
          subtitle={actualSubtitleText}
          showSubtitle={actualShowSubtitle}
          titleSize={actualHeadlineSize}
          align={align}
        />

        {/* Back Button */}
        {actualShowBackButton && (
          <div className={cn(heroBackButtonVariants())} data-form='back-btn'>
            <Button
              onClick={onBackClick}
              variant='ghost'
              size='l'
              showText={false}
              text={backButtonText}
              showIcon={true}
              icon={backButtonIcon}
            />
          </div>
        )}

        {children}
      </div>
    );
  }
);

HeroStack.displayName = 'HeroStack';

export {
  HeroStack,
  heroStackVariants,
  heroImageVariants,
  heroIconVariants,
  heroBackButtonVariants,
};
