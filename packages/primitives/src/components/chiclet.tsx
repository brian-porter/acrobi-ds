import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Label } from './label';

/**
 * Chiclet variant styles using authentic Acrobi classes
 * This matches the devlink Chiclet component with authentic styling
 */
const chicletVariants = cva(
  // Base authentic Acrobi chiclet class
  'bbc_l2-btn',
  {
    variants: {
      variant: {
        default: '',
        ghost: '',
        separated: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Chiclet label space styling
const chicletLabelSpaceVariants = cva('chiclet-lbl-sp', {
  variants: {
    variant: {
      default: '',
      ghost: '',
      separated: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// Link block styling
const chicletLinkVariants = cva('link-block-2', {
  variants: {
    variant: {
      default: '',
      ghost: '',
      separated: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ChicletProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chicletVariants> {
  /**
   * Chiclet visibility toggle
   */
  chiclet?: boolean;
  /**
   * Show label
   */
  lbl?: boolean;
  /**
   * Chiclet ID
   */
  chicId?: string;
  /**
   * Multi-select mode
   */
  chicMulti?: string;
  /**
   * Chiclet style
   */
  chicStyl?: string;
  /**
   * Chiclet size
   */
  chicSz?: string;
  /**
   * Show label icon
   */
  lblIcn?: boolean;
  /**
   * Show label text
   */
  lblTxt?: boolean;
  /**
   * Label icon source
   */
  lblIcnSrc?: string;
  /**
   * Label text source
   */
  lblTxtSrc?: string;
  /**
   * Label size
   */
  lblSz?:
    | 'inherit'
    | 'r4'
    | 'r4b'
    | 'r3'
    | 'r3b'
    | 'r2'
    | 'r2b'
    | 'r1'
    | 'r1b'
    | 'h5'
    | 'h5b'
    | 'h4'
    | 'h4b'
    | 'h3'
    | 'h3b'
    | 'h2'
    | 'h2b'
    | 'h1'
    | 'h1b';
  /**
   * Label color
   */
  lblClr?:
    | 'fd500'
    | 'fw500'
    | 'f500'
    | 'p500'
    | 'n500'
    | 'n300'
    | 'n700'
    | 'n999'
    | 'inherit'
    | 'in';
  /**
   * Chiclet click handler
   */
  chicClick?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * Link configuration
   */
  link?: {
    href?: string;
    target?: string;
  };
  /**
   * Chiclet variant
   */
  variant?: 'default' | 'ghost' | 'separated';
}

/**
 * Chiclet component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink Chiclet component.
 *
 * Key features:
 * - Uses .bbc_l2-btn class for authentic styling
 * - Uses .chiclet-lbl-sp for label spacing
 * - Uses data attributes for styling (data-chic-size, data-chic-style, etc.)
 * - Integrates with Label component for content
 * - Supports click handlers and link functionality
 * - Supports multi-select and active states
 *
 * @example
 * ```tsx
 * <Chiclet
 *   chiclet={true}
 *   lbl={true}
 *   lblIcn={true}
 *   lblTxt={true}
 *   lblIcnSrc="Nav_left"
 *   lblTxtSrc="Navigation"
 *   chicSz="l"
 *   chicStyl="nl"
 *   lblSz="r3"
 *   lblClr="n700"
 * />
 * ```
 */
const Chiclet = React.forwardRef<HTMLDivElement, ChicletProps>(
  (
    {
      className,
      chiclet = true,
      lbl = true,
      chicId,
      chicMulti,
      chicStyl = 'nl',
      chicSz = 'l',
      lblIcn = true,
      lblTxt = false,
      lblIcnSrc = 'Nav_left',
      lblTxtSrc = '',
      lblSz = 'r3',
      lblClr = 'n700',
      chicClick = {},
      link = { href: '#' },
      variant = 'default',
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!chiclet) return null;

    return (
      <div
        ref={ref}
        className={cn(chicletVariants({ variant }), className)}
        data-chic-size={chicSz}
        data-chic-style={chicStyl}
        role='button'
        x-disabled='false'
        data-chic-active='false'
        data-chic-multi={chicMulti}
        {...chicClick}
        {...props}
      >
        {/* Chiclet Label Space */}
        <div className={cn(chicletLabelSpaceVariants({ variant }))}>
          <Label
            icon={lblIcnSrc}
            size={lblSz}
            color={lblClr === 'in' ? 'inherit' : lblClr}
            visible={lbl}
            text={lblTxtSrc}
            showIcon={lblIcn}
            showText={lblTxt}
            iconLocation='l'
            shadow='n'
            gap='4'
          />
        </div>

        {/* Hidden Link Block */}
        <a
          className={cn(chicletLinkVariants({ variant }))}
          id={chicId}
          href={link?.href || '#'}
          target={link?.target}
          tabIndex={-1}
          aria-hidden='true'
        />
      </div>
    );
  }
);

Chiclet.displayName = 'Chiclet';

export {
  Chiclet,
  chicletVariants,
  chicletLabelSpaceVariants,
  chicletLinkVariants,
};
