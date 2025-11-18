import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { MenuItem } from './menu-item';

/**
 * AcrdSecSub variant styles using authentic Acrobi classes
 * This matches the devlink AcrdSecSub component
 */
const acrdSecSubVariants = cva(
  // Base authentic Acrobi accordion section sub class
  'acrd_sec-sub',
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

export interface AcrdSecSubProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof acrdSecSubVariants> {
  /**
   * Section sub-item visibility toggle
   */
  secSub?: boolean;
  /**
   * Section sub-item icon
   */
  secSubIcn?: string;
  /**
   * Section sub-item name
   */
  secSubName?: string;
  /**
   * Section sub-item click handler
   */
  secSubClick?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * Section sub-item selected state
   */
  secSubOn?: boolean;
  /**
   * Item variant
   */
  variant?: 'default' | 'ghost' | 'separated';
}

/**
 * AcrdSecSub component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink AcrdSecSub component.
 *
 * Key features:
 * - Uses .acrd_sec-sub class for authentic styling
 * - Integrates with MenuItem component for interactive elements
 * - Supports selection states and click handlers
 * - Simple wrapper component for accordion sub-sections
 *
 * @example
 * ```tsx
 * <AcrdSecSub
 *   secSub={true}
 *   secSubIcn="subfolder"
 *   secSubName="Sub-Section Title"
 *   secSubOn={true}
 * />
 * ```
 */
const AcrdSecSub = React.forwardRef<HTMLDivElement, AcrdSecSubProps>(
  (
    {
      className,
      secSub = true,
      secSubIcn = 'default',
      secSubName = 'Sub-Section',
      secSubClick = {},
      secSubOn = false,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!secSub) return null;

    return (
      <div
        ref={ref}
        className={cn(acrdSecSubVariants({ variant }), className)}
        {...props}
      >
        <MenuItem
          pTitleSrc={secSubName}
          lIcnSrc={secSubIcn}
          menuItmClick={secSubClick}
          tSelected={secSubOn}
          lIcn={true}
          menuItm={true}
        />
      </div>
    );
  }
);

AcrdSecSub.displayName = 'AcrdSecSub';

export { AcrdSecSub, acrdSecSubVariants };
