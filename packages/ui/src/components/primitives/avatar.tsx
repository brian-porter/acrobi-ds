import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Badge } from './badge';

/**
 * Avatar variant styles using Acrobi Design System data attributes
 * This matches the devlink Avatar component pattern where styling
 * is controlled via data attributes that map to CSS selectors
 */
const avatarVariants = cva(
  // Base styles - minimal classes, let .avtr_wrap class handle most styling
  'avtr_wrap relative inline-flex shrink-0',
  {
    variants: {
      // These map to data-obj-size values in Acrobi CSS
      size: {
        xs: '', // extra small
        s: '', // small
        m: '', // medium (default)
        l: '', // large
        xl: '', // extra large
        xxl: '', // extra extra large
      },
      // These map to data-shape values in Acrobi CSS
      shape: {
        c: '', // circle (default)
        r: '', // rounded rectangle
        s: '', // square
      },
      // These map to data-bs values for box shadow
      shadow: {
        n: '', // none
        xs: '',
        s: '',
        m: '',
        l: '',
        xl: '',
      },
    },
    defaultVariants: {
      size: 'm',
      shape: 'c',
      shadow: 'n',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /**
   * Avatar image source (AvtrSrc in Webflow)
   */
  src?: string;
  /**
   * Avatar image alt text (AvtrAlt in Webflow)
   */
  alt?: string;
  /**
   * Avatar size using Acrobi sizing system (AvtrSz in Webflow)
   */
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  /**
   * Avatar shape (AvtrShape in Webflow)
   */
  shape?: 'c' | 'r' | 's';
  /**
   * Avatar drop shadow (AvtrDrpShdw in Webflow)
   */
  shadow?: 'n' | 'xs' | 's' | 'm' | 'l' | 'xl';
  /**
   * Avatar visibility toggle (Avtr in Webflow)
   */
  visible?: boolean;
  /**
   * Avatar group overlap setting (AvtrGroup in Webflow)
   */
  group?: boolean;
  /**
   * Avatar link styling (AvtrLink in Webflow)
   */
  link?: boolean;
  /**
   * Avatar active/online state (AvtrOn in Webflow)
   */
  online?: boolean;
  /**
   * Badge visibility toggle (Bdg in Webflow)
   */
  badge?: boolean;
  /**
   * Badge text content (BdgTxtSrc in Webflow)
   */
  badgeText?: string;
  /**
   * Badge icon name (BdgIcnSrc in Webflow)
   */
  badgeIcon?: string;
  /**
   * Badge color (BdgClr in Webflow)
   */
  badgeColor?: 'fd500' | 'fw500' | 'f500' | 'p500' | 'n500';
  /**
   * Badge size (BdgSz in Webflow)
   */
  badgeSize?: 'xs' | 's' | 'm' | 'l';
  /**
   * Badge location (BdgLoc in Webflow)
   */
  badgeLocation?: 'tl' | 'tr' | 'bl' | 'br';
  /**
   * Fallback text or component when image fails to load
   */
  fallback?: React.ReactNode;
  /**
   * @deprecated Use size prop instead
   */
  variant?: 'sm' | 'default' | 'lg' | 'xl';
}

// Map size names to Acrobi data-obj-size values
const getAvatarSize = (
  size: string | null | undefined,
  variant?: string | null | undefined
): string => {
  // Handle backward compatibility with old variant prop
  if (variant) {
    const legacySizeMap: Record<string, string> = {
      sm: 's',
      default: 'm',
      lg: 'l',
      xl: 'xl',
    };
    return legacySizeMap[variant] || 'm';
  }

  const sizeMap: Record<string, string> = {
    xs: 'xs',
    s: 's',
    m: 'm',
    l: 'l',
    xl: 'xl',
    xxl: 'xxl',
  };
  return sizeMap[size || 'm'] || 'm';
};

// Map shadow names to Acrobi data-bs values
const getAvatarShadow = (shadow: string | null | undefined): string => {
  const shadowMap: Record<string, string> = {
    n: 'n',
    xs: 'xs',
    s: 's',
    m: 'm',
    l: 'l',
    xl: 'xl',
  };
  return shadowMap[shadow || 'n'] || 'n';
};

/**
 * Avatar component using authentic Acrobi Design System styling
 *
 * This component uses data attributes that map directly to the CSS selectors
 * in the Acrobi design system, ensuring authentic styling that matches the
 * original devlink Avatar component.
 *
 * Key features:
 * - Uses data-obj-size for sizing (xs, s, m, l, xl, xxl)
 * - Uses data-shape for shape control (c, r, s)
 * - Uses data-bs for box shadows (n, xs, s, m, l, xl)
 * - Uses data-overlap for group overlapping
 * - Uses data-obj-link for link styling
 * - Uses data-obj-on for online/active states
 * - Supports Badge component for notifications
 *
 * @example
 * ```tsx
 * <Avatar
 *   src="https://example.com/avatar.jpg"
 *   alt="User Avatar"
 *   size="l"
 *   shape="c"
 *   badge={true}
 *   badgeText="3"
 *   badgeColor="fd500"
 *   badgeLocation="br"
 * />
 * ```
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt = '',
      size = 'm',
      variant, // deprecated, for backward compatibility
      shape = 'c',
      shadow = 'n',
      visible = true,
      group = false,
      link = false,
      online = false,
      badge = false,
      badgeText,
      badgeIcon,
      badgeColor = 'fd500',
      badgeSize = 'm',
      badgeLocation = 'br',
      fallback,
      children,
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!visible) return null;

    // Handle image loading error
    const [imageError, setImageError] = React.useState(false);
    const [imageSrc, setImageSrc] = React.useState(src);

    React.useEffect(() => {
      setImageSrc(src);
      setImageError(false);
    }, [src]);

    const handleImageError = () => {
      setImageError(true);
    };

    const avatarSize = getAvatarSize(size, variant);
    const defaultSrc =
      'https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif';

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, shape, shadow }), className)}
        data-obj-size={avatarSize}
        data-shape={shape}
        data-overlap={group ? 'true' : undefined}
        data-obj-link={link ? 'true' : undefined}
        data-obj-on={online ? 'true' : undefined}
        {...props}
      >
        {!imageError && imageSrc ? (
          <img
            className='avtr-img'
            src={imageSrc}
            alt={alt}
            loading='lazy'
            width='auto'
            height='auto'
            data-shape={shape}
            data-obj-asp='1-1'
            data-bs={getAvatarShadow(shadow)}
            onError={handleImageError}
          />
        ) : (
          <img
            className='avtr-img'
            src={defaultSrc}
            alt={alt || 'Avatar'}
            loading='lazy'
            width='auto'
            height='auto'
            data-shape={shape}
            data-obj-asp='1-1'
            data-bs={getAvatarShadow(shadow)}
          />
        )}

        {badge && (
          <Badge
            visible={badge}
            text={badgeText}
            icon={badgeIcon}
            textVisible={!!badgeText}
            iconVisible={!!badgeIcon}
            color={badgeColor}
            size={badgeSize}
            location={badgeLocation}
            content={true}
          />
        )}

        {/* Support for children/custom content */}
        {children}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// Legacy exports for backward compatibility
const AvatarImage = ({
  src,
  alt,
  ...props
}: {
  src?: string;
  alt?: string;
  [key: string]: any;
}) => <img src={src} alt={alt} {...props} />;

const AvatarFallback = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
  [key: string]: any;
}) => <div {...props}>{children}</div>;

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
export type { AvatarProps };
export type AvatarImageProps = {
  src?: string;
  alt?: string;
  [key: string]: any;
};
export type AvatarFallbackProps = {
  children?: React.ReactNode;
  [key: string]: any;
};
