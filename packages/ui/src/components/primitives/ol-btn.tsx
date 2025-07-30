import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from './button';

/**
 * OlBtn (Overlay Button) variant styles using authentic Acrobi classes
 * This matches the devlink OlBtn component which is a positioned button overlay
 */
const olBtnVariants = cva(
  // Base authentic Acrobi overlay button class
  'ol-btn--ds-m',
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

export interface OlBtnProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof olBtnVariants> {
  /**
   * Button visibility toggle
   */
  btn?: boolean;
  /**
   * Show button icon
   */
  btnIcn?: boolean;
  /**
   * Show button text
   */
  btnTxt?: boolean;
  /**
   * Button icon source
   */
  btnIcnSrc?: string;
  /**
   * Button text source
   */
  btnTxtSrc?: string;
  /**
   * Button size
   */
  btnSz?: string;
  /**
   * Button style
   */
  btnStyl?: string;
  /**
   * Button location/position
   */
  btnLoc?: string;
  /**
   * Button link configuration
   */
  btnLink?: {
    href?: string;
    target?: string;
  };
  /**
   * Button click handler
   */
  btnClick?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * Button variant
   */
  variant?: 'default' | 'ghost' | 'separated';
}

/**
 * OlBtn (Overlay Button) component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink OlBtn component.
 *
 * Key features:
 * - Uses .ol-btn--ds-m class for authentic overlay button styling
 * - Uses data-loc attribute for positioning control
 * - Wraps the existing Button component with overlay positioning
 * - Supports all standard button properties through Button component
 * - Commonly used for floating action buttons and overlay controls
 *
 * @example
 * ```tsx
 * <OlBtn
 *   btn={true}
 *   btnIcn={true}
 *   btnTxt={false}
 *   btnIcnSrc="edit"
 *   btnTxtSrc="Edit"
 *   btnSz="l"
 *   btnStyl="pf"
 *   btnLoc="br"
 * />
 * ```
 */
const OlBtn = React.forwardRef<HTMLDivElement, OlBtnProps>(
  (
    {
      className,
      btn = true,
      btnIcn = true,
      btnTxt = false,
      btnIcnSrc = 'EWdit',
      btnTxtSrc = 'Edit',
      btnSz = 'l',
      btnStyl = 'pf',
      btnLoc = 'br',
      btnLink = { href: '#' },
      btnClick = {},
      variant = 'default',
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!btn) return null;

    return (
      <div
        ref={ref}
        className={cn(olBtnVariants({ variant }), className)}
        data-loc={btnLoc}
        {...props}
      >
        <Button
          visible={btn}
          showText={btnTxt}
          text={btnTxtSrc}
          icon={btnIcnSrc}
          showIcon={btnIcn}
          size={btnSz}
          variant={btnStyl === 'pf' ? 'default' : 'outline'}
          shadow='l'
          href={btnLink?.href}
          target={btnLink?.target}
          onClick={btnClick?.onClick}
          {...btnClick}
        />
      </div>
    );
  }
);

OlBtn.displayName = 'OlBtn';

export { OlBtn, olBtnVariants };
