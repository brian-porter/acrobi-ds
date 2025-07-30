import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Label } from './label';
import { Icon } from './icon';
import { Avatar } from './avatar';
import { Badge } from './badge';
// Note: CSS module imports would be:
// import _styles from '../../../devlink/Chip.module.css';
// import * as _utils from '../../../devlink/utils.js';
// Commented out for build compatibility during development

/**
 * Chip variant styles using Acrobi Design System classes
 * This matches the devlink Chip component pattern using authentic
 * Acrobi styling with specific CSS classes and data attributes
 */
const chipVariants = cva(
  // Base styles - using authentic Acrobi chip wrapper class with pill styling
  'chip_wrap inline-flex items-center justify-center h-8 min-w-12 px-0 border border-gray-300 rounded-full cursor-pointer transition-colors hover:bg-gray-100 active:bg-blue-100 focus:border-blue-500',
  {
    variants: {
      variant: {
        default: '',
        secondary: '',
        outline: '',
        ghost: '',
        success: '',
        warning: '',
        error: '',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
      active: {
        true: '',
        false: '',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      active: false,
      disabled: false,
    },
  }
);

// Chip base styling (for basic chip content)
const chipBaseVariants = cva('chip-base flex items-center gap-1 px-2 py-1', {
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

// Chip avatar styling (for chip with avatar)
const chipAvatarVariants = cva('chip-avtr', {
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

// Chip avatar wrapper styling
const chipAvatarWrapVariants = cva('chip-avtr-wrap');

// Chip avatar trail styling
const chipAvatarTrailVariants = cva('chip-avtr-trail', {
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

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  /**
   * Show chip (chip in Webflow)
   */
  visible?: boolean;
  /**
   * Show base chip content (base in Webflow)
   */
  showBase?: boolean;
  /**
   * Show avatar version (avtr in Webflow)
   */
  showAvatar?: boolean;
  /**
   * Chip active state (chipActive in Webflow)
   */
  active?: boolean;
  /**
   * Show chip icon (chipIcn in Webflow)
   */
  showIcon?: boolean;
  /**
   * Show chip text (chipTxt in Webflow)
   */
  showText?: boolean;
  /**
   * Chip icon name (chipIcnSrc in Webflow)
   */
  iconName?: string;
  /**
   * Chip text content (chipTxtSrc in Webflow)
   */
  text?: string;
  /**
   * Chip style (chipStyle in Webflow)
   */
  styling?: 'nl' | 'outlined' | 'filled';
  /**
   * Chip text size (chipTxtSz in Webflow)
   */
  textSize?:
    | 'inherit'
    | 'r4'
    | 'r4b'
    | 'r3'
    | 'r3b'
    | 'r2'
    | 'r2b'
    | 'r1'
    | 'r1b';
  /**
   * Show trail icon (chipTrail in Webflow)
   */
  showTrail?: boolean;
  /**
   * Trail icon name (chipTrailSrc in Webflow)
   */
  trailIcon?: string;
  /**
   * Chip disabled state (chipDisabled in Webflow)
   */
  disabled?: boolean;
  /**
   * Avatar source URL (avtrSrc in Webflow)
   */
  avatarSrc?: string;
  /**
   * Show avatar badge (avtrBdg in Webflow)
   */
  showAvatarBadge?: boolean;
  /**
   * Avatar badge icon (avtrBdgIcnSrc in Webflow)
   */
  avatarBadgeIcon?: string;
  /**
   * Avatar badge color (avtrBdgClr in Webflow)
   */
  avatarBadgeColor?: string;
  /**
   * Avatar text (avtrTxtSrc in Webflow)
   */
  avatarText?: string;
  /**
   * Avatar trail icon (avtrTrailSrc in Webflow)
   */
  avatarTrailIcon?: string;
  /**
   * Chip ID (chipId in Webflow)
   */
  chipId?: string;
  /**
   * Chip click handler (chipClick in Webflow)
   */
  onChipClick?: () => void;
  /**
   * @deprecated Use visible prop instead
   */
  chip?: boolean;
  /**
   * @deprecated Use showBase prop instead
   */
  base?: boolean;
  /**
   * @deprecated Use showAvatar prop instead
   */
  avtr?: boolean;
  /**
   * @deprecated Use active prop instead
   */
  chipActive?: string;
  /**
   * @deprecated Use showIcon prop instead
   */
  chipIcn?: boolean;
  /**
   * @deprecated Use showText prop instead
   */
  chipTxt?: boolean;
  /**
   * @deprecated Use iconName prop instead
   */
  chipIcnSrc?: string;
  /**
   * @deprecated Use text prop instead
   */
  chipTxtSrc?: string;
  /**
   * @deprecated Use showTrail prop instead
   */
  chipTrail?: boolean;
  /**
   * @deprecated Use trailIcon prop instead
   */
  chipTrailSrc?: string;
  /**
   * @deprecated Use avatarSrc prop instead
   */
  avtrSrc?: string;
  /**
   * @deprecated Use showAvatarBadge prop instead
   */
  avtrBdg?: boolean;
  /**
   * @deprecated Use avatarBadgeIcon prop instead
   */
  avtrBdgIcnSrc?: string;
  /**
   * @deprecated Use avatarBadgeColor prop instead
   */
  avtrBdgClr?: string;
  /**
   * @deprecated Use avatarText prop instead
   */
  avtrTxtSrc?: string;
  /**
   * @deprecated Use avatarTrailIcon prop instead
   */
  avtrTrailSrc?: string;
  /**
   * @deprecated Use chipId prop instead
   */
  chipIdLegacy?: string;
  /**
   * @deprecated Use onChipClick prop instead
   */
  chipClick?: () => void;
  /**
   * @deprecated Use text prop instead
   */
  children?: React.ReactNode;
  /**
   * @deprecated Use showIcon and iconName props instead
   */
  icon?: React.ReactNode;
  /**
   * @deprecated Use showAvatar and avatarSrc props instead
   */
  avatar?: React.ReactNode;
  /**
   * @deprecated Use active prop instead
   */
  selected?: boolean;
  /**
   * @deprecated Use onChipClick prop instead
   */
  onSelect?: () => void;
  /**
   * @deprecated Use showTrail and onChipClick props instead
   */
  removable?: boolean;
  /**
   * @deprecated Use onChipClick prop instead
   */
  onRemove?: () => void;
  /**
   * @deprecated Use onChipClick prop instead
   */
  interactive?: boolean;
}

// Map chip style to Acrobi data attributes
const getChipStyle = (style: string | null | undefined): string => {
  const styleMap: Record<string, string> = {
    nl: 'nl',
    outlined: 'outlined',
    filled: 'filled',
  };
  return styleMap[style || 'nl'] || 'nl';
};

// Map active state to string for data attributes
const getActiveState = (
  active: boolean | string | null | undefined
): string => {
  if (typeof active === 'string') return active;
  return active ? 'true' : 'false';
};

/**
 * Chip component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink Chip component.
 *
 * Key features:
 * - Uses .chip_wrap class for authentic styling
 * - Uses .chip-base and .chip-avtr for different chip types
 * - Uses data attributes for styling (data-chip-style, data-chip-active)
 * - Integrates with Label, Icon, Avatar, and Badge components
 * - Supports both basic and avatar chip variants
 *
 * @example
 * ```tsx
 * <Chip
 *   text="Basic Chip"
 *   showIcon={true}
 *   iconName="star"
 *   styling="nl"
 *   active={false}
 * />
 *
 * <Chip
 *   showAvatar={true}
 *   avatarSrc="/avatar.jpg"
 *   avatarText="John Doe"
 *   showAvatarBadge={true}
 *   avatarBadgeIcon="Admin"
 * />
 * ```
 */
const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      visible = true,
      showBase = true,
      showAvatar = false,
      active = false,
      showIcon = true,
      showText = true,
      iconName = 'calendar',
      text = 'Chip',
      styling = 'nl',
      textSize = 'r3',
      showTrail = false,
      trailIcon = 'select_arrrow',
      disabled = false,
      avatarSrc = 'https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif',
      showAvatarBadge = false,
      avatarBadgeIcon = 'Admin',
      avatarBadgeColor = 'yellow-700',
      avatarText = 'FName LI',
      avatarTrailIcon = 'clearcirc',
      chipId = 'chip',
      onChipClick,
      // Deprecated props for backward compatibility
      chip,
      base,
      avtr,
      chipActive,
      chipIcn,
      chipTxt,
      chipIcnSrc,
      chipTxtSrc,
      chipTrail,
      chipTrailSrc,
      avtrSrc,
      avtrBdg,
      avtrBdgIcnSrc,
      avtrBdgClr,
      avtrTxtSrc,
      avtrTrailSrc,
      chipIdLegacy,
      chipClick,
      children,
      icon,
      avatar,
      selected,
      onSelect,
      removable,
      onRemove,
      interactive,
      onClick,
      ...props
    },
    ref
  ) => {
    // Handle backward compatibility
    const actualVisible = chip !== undefined ? chip : visible;
    const actualShowBase = base !== undefined ? base : showBase;
    const actualShowAvatar = avtr !== undefined ? avtr : showAvatar;
    const actualActive = chipActive !== undefined ? chipActive : active;
    const actualShowIcon = chipIcn !== undefined ? chipIcn : showIcon;
    const actualShowText = chipTxt !== undefined ? chipTxt : showText;
    const actualIconName = chipIcnSrc || iconName;
    const actualText = children ? children.toString() : chipTxtSrc || text;
    const actualShowTrail =
      chipTrail !== undefined ? chipTrail : removable || showTrail;
    const actualTrailIcon = chipTrailSrc || trailIcon;
    const actualAvatarSrc = avtrSrc || avatarSrc;
    const actualShowAvatarBadge =
      avtrBdg !== undefined ? avtrBdg : showAvatarBadge;
    const actualAvatarBadgeIcon = avtrBdgIcnSrc || avatarBadgeIcon;
    const actualAvatarBadgeColor = avtrBdgClr || avatarBadgeColor;
    const actualAvatarText = avtrTxtSrc || avatarText;
    const actualAvatarTrailIcon = avtrTrailSrc || avatarTrailIcon;
    const actualChipId = chipIdLegacy || chipId;
    const actualOnChipClick = chipClick || onChipClick || onSelect || onRemove;
    const actualSelected = selected || actualActive;

    // Don't render if not visible
    if (!actualVisible) return null;

    const handleClick = () => {
      if (!disabled) {
        actualOnChipClick?.();
        onClick?.({} as any);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          // _utils.cx(_styles, "chip_wrap"), // Authentic Acrobi CSS class
          'chip_wrap', // Fallback for development
          chipVariants({
            active: actualSelected,
            disabled,
          }),
          className
        )}
        data-chip-style={getChipStyle(styling)}
        data-shape='pill'
        data-chip-active={getActiveState(actualActive)}
        x-disabled={disabled}
        id={actualChipId}
        onClick={handleClick}
        {...props}
      >
        {/* Base Chip Content */}
        {actualShowBase && (
          <div className={cn('chip-base', chipBaseVariants())}>
            <Label
              text={actualText}
              showIcon={actualShowIcon}
              showText={actualShowText}
              icon={actualIconName}
              size={textSize}
            />
            <Icon
              name={actualTrailIcon}
              visible={actualShowTrail}
              size='xs'
              color='n500'
            />
          </div>
        )}

        {/* Avatar Chip Content */}
        {actualShowAvatar && (
          <div className={cn('chip-avtr', chipAvatarVariants())}>
            <div className={cn('chip-avtr-wrap', chipAvatarWrapVariants())}>
              <Avatar
                src={actualAvatarSrc}
                size='s'
                visible={true}
                badge={false}
                badgeText={undefined}
                badgeIcon={'Admin'}
                badgeColor='fw500'
                badgeSize='m'
              />
              <Badge
                icon={actualAvatarBadgeIcon}
                color={actualAvatarBadgeColor}
                visible={actualShowAvatarBadge}
                textVisible={false}
                iconVisible={true}
                iconSize='r4'
                content={true}
              />
            </div>
            <Label
              text={actualAvatarText}
              gap='4'
              iconPosition='Left'
              icon='default'
              size='r3'
              iconVisible={false}
            />
            {actualShowTrail && (
              <div className={cn('chip-avtr-trail', chipAvatarTrailVariants())}>
                <Icon name={actualAvatarTrailIcon} size='xs' color='n500' />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Chip.displayName = 'Chip';

export {
  Chip,
  chipVariants,
  chipBaseVariants,
  chipAvatarVariants,
  chipAvatarWrapVariants,
  chipAvatarTrailVariants,
};
