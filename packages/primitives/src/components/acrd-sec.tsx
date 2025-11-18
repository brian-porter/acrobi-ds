import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { MenuItem } from './menu-item';
import { AcrdSecSub } from './acrd-sec-sub';

/**
 * AcrdSec variant styles using authentic Acrobi classes
 * This matches the devlink AcrdSec component with Finsweet Accordion integration
 */
const acrdSecVariants = cva(
  // Base authentic Acrobi accordion section class
  'acrd-sec_main',
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

// Accordion section trigger styling
const acrdSecTrigVariants = cva('acrd-sec-trig', {
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

// Accordion section body styling
const acrdSecBodyVariants = cva('acrd-sec-body', {
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

export interface AcrdSecProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof acrdSecVariants> {
  /**
   * Accordion section visibility toggle
   */
  acrdSec?: boolean;
  /**
   * Section icon source
   */
  secIcn?: string;
  /**
   * Section name/title
   */
  secName?: string;
  /**
   * Section click handler
   */
  secClick?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * Custom section sub-items mapping content
   */
  secSubMap?: React.ReactNode;
  /**
   * Show example section sub-item
   */
  exampleSecSub?: boolean;
  /**
   * Section variant
   */
  variant?: 'default' | 'ghost' | 'separated';
  /**
   * Section index for unique IDs
   */
  sectionIndex?: number;
  /**
   * Aria controls for accessibility
   */
  ariaControls?: string;
  /**
   * Aria expanded state
   */
  ariaExpanded?: boolean;
  /**
   * Header ID for accessibility
   */
  headerId?: string;
}

/**
 * AcrdSec component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink AcrdSec component.
 * Based on the Finsweet Accordion system with complex interactions.
 *
 * Key features:
 * - Uses .acrd-sec_main, .acrd-sec-trig, .acrd-sec-body classes for authentic styling
 * - Uses Finsweet Accordion attributes for functionality
 * - Integrates with MenuItem component for section headers
 * - Supports AcrdSecSub components for sub-sections
 * - Includes complex interaction patterns for accordion behavior
 *
 * @example
 * ```tsx
 * <AcrdSec
 *   acrdSec={true}
 *   secIcn="folder"
 *   secName="Section Title"
 *   exampleSecSub={true}
 *   sectionIndex={2}
 * />
 * ```
 */
const AcrdSec = React.forwardRef<HTMLDivElement, AcrdSecProps>(
  (
    {
      className,
      acrdSec = true,
      secIcn = 'default',
      secName = 'Section',
      secClick = {},
      secSubMap,
      exampleSecSub = false,
      variant = 'default',
      sectionIndex = 2,
      ariaControls,
      ariaExpanded = false,
      headerId,
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!acrdSec) return null;

    const finalAriaControls = ariaControls || `acc-content-${sectionIndex}`;
    const finalHeaderId = headerId || `acc-sechead-${sectionIndex}`;

    return (
      <div
        ref={ref}
        className={cn(acrdSecVariants({ variant }), className)}
        {...{ 'fs-accordion-element': 'accordion' }}
        {...props}
      >
        {/* Accordion Section Trigger */}
        <div
          className={cn(acrdSecTrigVariants({ variant }))}
          tabIndex={0}
          role='button'
          aria-controls={finalAriaControls}
          aria-expanded={ariaExpanded}
          id={finalHeaderId}
        >
          <MenuItem
            pTitleSrc={secName}
            lIcnSrc={secIcn}
            menuItmClick={secClick}
            lIcn={true}
            tAcrdArrw={true}
            menuItm={true}
          />
        </div>

        {/* Accordion Section Body */}
        <div
          className={cn(acrdSecBodyVariants({ variant }))}
          id={finalAriaControls}
        >
          {secSubMap ?? <AcrdSecSub secSub={exampleSecSub} secSubOn={false} />}
        </div>
      </div>
    );
  }
);

AcrdSec.displayName = 'AcrdSec';

export { AcrdSec, acrdSecVariants, acrdSecTrigVariants, acrdSecBodyVariants };
