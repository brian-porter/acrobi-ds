import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * TextfieldLinkCtrl variant styles using authentic Acrobi classes
 * This matches the devlink TextfieldLinkCtrl component structure for textfield-style links
 */
const textfieldLinkCtrlVariants = cva(
  // Base authentic Acrobi textfield link class
  'textfield-link inline-block',
  {
    variants: {
      variant: {
        default: '',
        subtle: '',
        prominent: '',
      },
      state: {
        default: '',
        disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
        loading: 'opacity-70 cursor-wait',
      },
    },
    defaultVariants: {
      variant: 'default',
      state: 'default',
    },
  }
);

// Text content styling using Acrobi typography classes
const textContentVariants = cva('r2 transition-colors', {
  variants: {
    size: {
      r1: 'r1',
      r2: 'r2',
      r3: 'r3',
      r4: 'r4',
    },
    color: {
      default: 'text-primary hover:text-primary-foreground',
      muted: 'text-muted-foreground hover:text-foreground',
      destructive: 'text-destructive hover:text-destructive/80',
      success: 'text-green-600 hover:text-green-700',
    },
  },
  defaultVariants: {
    size: 'r2',
    color: 'default',
  },
});

export interface TextfieldLinkCtrlProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>,
    VariantProps<typeof textfieldLinkCtrlVariants> {
  /**
   * Field link text source
   */
  fldLinkTxtSrc?: string;
  /**
   * Field link configuration
   */
  fldLink?: {
    href: string;
    target?: string;
    rel?: string;
  };
  /**
   * Field click handler
   */
  fldClick?: React.MouseEventHandler<HTMLAnchorElement>;
  /**
   * Modern API - Link text
   */
  text?: string;
  /**
   * Modern API - Link href
   */
  href?: string;
  /**
   * Modern API - Link target
   */
  target?: string;
  /**
   * Modern API - Link rel
   */
  rel?: string;
  /**
   * Text size using Acrobi typography
   */
  textSize?: 'r1' | 'r2' | 'r3' | 'r4';
  /**
   * Text color variant
   */
  textColor?: 'default' | 'muted' | 'destructive' | 'success';
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Show external link icon
   */
  showExternalIcon?: boolean;
  /**
   * Underline behavior
   */
  underline?: 'none' | 'hover' | 'always';
}

/**
 * External link icon component
 */
const ExternalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn('w-3 h-3 ml-1 inline', className)}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
    />
  </svg>
);

/**
 * TextfieldLinkCtrl component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink TextfieldLinkCtrl component.
 *
 * Key features:
 * - Uses .textfield-link and .r2 classes for authentic styling
 * - Supports both devlink API (fldLinkTxtSrc, fldLink) and modern API (text, href)
 * - Integrates with text field designs and form elements
 * - Flexible typography sizing with Acrobi classes
 * - Optional external link indicator
 * - Accessibility features with proper ARIA attributes
 *
 * @example
 * ```tsx
 * // Devlink API
 * <TextfieldLinkCtrl
 *   fldLinkTxtSrc="Edit profile"
 *   fldLink={{ href: "/profile/edit", target: "_blank" }}
 *   fldClick={(e) => console.log('Link clicked')}
 * />
 *
 * // Modern API
 * <TextfieldLinkCtrl
 *   text="Forgot password?"
 *   href="/reset-password"
 *   textColor="muted"
 *   underline="hover"
 * />
 * ```
 */
const TextfieldLinkCtrl = React.forwardRef<
  HTMLAnchorElement,
  TextfieldLinkCtrlProps
>(
  (
    {
      className,
      fldLinkTxtSrc = 'link text',
      fldLink = { href: '#' },
      fldClick,
      // Modern API
      text,
      href,
      target,
      rel,
      textSize = 'r2',
      textColor = 'default',
      loading = false,
      disabled = false,
      showExternalIcon = false,
      underline = 'none',
      variant = 'default',
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    // Determine if using modern API or devlink API
    const usingModernAPI = text !== undefined || href !== undefined;

    // Get final values
    const finalText = text || fldLinkTxtSrc;
    const finalHref = href || fldLink.href;
    const finalTarget = target || fldLink.target;
    const finalRel = rel || fldLink.rel;

    // Determine state
    const state = loading ? 'loading' : disabled ? 'disabled' : 'default';

    // Auto-detect external links
    const isExternal =
      finalTarget === '_blank' ||
      (finalHref && !finalHref.startsWith('/') && !finalHref.startsWith('#'));

    // Handle click
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled || loading) {
        e.preventDefault();
        return;
      }

      onClick?.(e);
      fldClick?.(e);
    };

    // Get underline classes
    const getUnderlineClass = () => {
      switch (underline) {
        case 'always':
          return 'underline';
        case 'hover':
          return 'hover:underline';
        case 'none':
        default:
          return 'no-underline';
      }
    };

    return (
      <a
        ref={ref}
        href={disabled ? undefined : finalHref}
        target={finalTarget}
        rel={finalRel || (isExternal ? 'noopener noreferrer' : undefined)}
        className={cn(
          textfieldLinkCtrlVariants({ variant, state }),
          getUnderlineClass(),
          className
        )}
        onClick={handleClick}
        aria-disabled={disabled}
        {...props}
      >
        <div
          className={cn(
            textContentVariants({ size: textSize, color: textColor })
          )}
        >
          {children || finalText}
          {loading && <span className='ml-1 inline-block animate-spin'>⟳</span>}
          {showExternalIcon && isExternal && !loading && <ExternalIcon />}
        </div>
      </a>
    );
  }
);

TextfieldLinkCtrl.displayName = 'TextfieldLinkCtrl';

export { TextfieldLinkCtrl, textfieldLinkCtrlVariants, textContentVariants };
