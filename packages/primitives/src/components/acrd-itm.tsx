import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Label } from './label';
import { Paragraph } from './paragraph';
import { ListItmCtrl } from './list-itm-ctrl';

/**
 * AcrdItm variant styles using authentic Acrobi classes
 * This matches the devlink AcrdItm component with Finsweet Accordion integration
 */
const acrdItmVariants = cva(
  // Base authentic Acrobi accordion item class
  'acrd-itm_main',
  {
    variants: {
      state: {
        closed: '',
        open: 'is-active-accordion',
      },
    },
    defaultVariants: {
      state: 'closed',
    },
  }
);

// Accordion item header styling
const acrdItmHeadVariants = cva('acrd-itm_head', {
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

// Accordion item body styling
const acrdItmBodyVariants = cva('acrd-itm_body', {
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

// Accordion arrow styling
const acrdArrowVariants = cva('acrd_arrow-icon', {
  variants: {
    state: {
      closed: '',
      open: 'is-active-accordion',
    },
  },
  defaultVariants: {
    state: 'closed',
  },
});

export interface AcrdItmProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof acrdItmVariants> {
  /**
   * Accordion item visibility toggle
   */
  acrdItm?: boolean;
  /**
   * Show icon in title
   */
  icn?: boolean;
  /**
   * Icon source
   */
  icnSrc?: string;
  /**
   * Title text source
   */
  titleTxtSrc?: string;
  /**
   * Show body content
   */
  body?: boolean;
  /**
   * Body text source
   */
  bodySrc?: string;
  /**
   * Custom accordion item mapping content
   */
  acrdItmMap?: React.ReactNode;
  /**
   * Show example list item
   */
  exampleListItem?: boolean;
  /**
   * Accordion item state
   */
  state?: 'closed' | 'open';
  /**
   * Item variant
   */
  variant?: 'default' | 'ghost' | 'separated';
  /**
   * Aria controls for accessibility
   */
  ariaControls?: string;
  /**
   * Aria expanded state
   */
  ariaExpanded?: boolean;
  /**
   * Aria labelledby for content
   */
  ariaLabelledBy?: string;
  /**
   * Item index for unique IDs
   */
  itemIndex?: number;
  /**
   * Click handler for header
   */
  onHeaderClick?: () => void;
}

/**
 * AcrdItm component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink AcrdItm component.
 * Based on the Finsweet Accordion system.
 *
 * Key features:
 * - Uses .acrd-itm_main, .acrd-itm_head, .acrd-itm_body classes for authentic styling
 * - Uses Finsweet Accordion attributes for functionality
 * - Integrates with Label and Paragraph components for content
 * - Supports interactive animations and state management
 * - Includes ListItmCtrl for complex list items
 *
 * @example
 * ```tsx
 * <AcrdItm
 *   acrdItm={true}
 *   icn={true}
 *   icnSrc="expand_more"
 *   titleTxtSrc="Accordion Item Title"
 *   body={true}
 *   bodySrc="This is the accordion item content"
 *   state="open"
 *   onHeaderClick={() => console.log('header clicked')}
 * />
 * ```
 */
const AcrdItm = React.forwardRef<HTMLDivElement, AcrdItmProps>(
  (
    {
      className,
      acrdItm = true,
      icn = false,
      icnSrc = 'default',
      titleTxtSrc = 'Title for the accordion item',
      body = false,
      bodySrc = 'Body copy here lorem ipsum dolor sit amet, consectetur',
      acrdItmMap,
      exampleListItem = false,
      state = 'closed',
      variant = 'default',
      ariaControls,
      ariaExpanded,
      ariaLabelledBy,
      itemIndex = 1,
      onHeaderClick,
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!acrdItm) return null;

    const finalAriaControls =
      ariaControls || `accordion-${itemIndex}-content-${itemIndex}`;
    const finalAriaLabelledBy =
      ariaLabelledBy || `accordion-${itemIndex}-header-${itemIndex}`;
    const finalAriaExpanded = ariaExpanded ?? state === 'open';

    return (
      <div
        ref={ref}
        className={cn(acrdItmVariants({ state }), className)}
        {...{ 'fs-accordion-element': 'accordion' }}
        {...props}
      >
        {/* Accordion Item Header */}
        <div
          className={cn(acrdItmHeadVariants({ variant }))}
          tabIndex={0}
          role='button'
          aria-controls={finalAriaControls}
          aria-expanded={finalAriaExpanded}
          {...{ 'fs-accordion-element': 'trigger' }}
          onClick={onHeaderClick}
        >
          <Label
            text={titleTxtSrc}
            showIcon={icn}
            icon={icnSrc}
            size='r1'
            visible={true}
          />

          {/* Accordion Arrow */}
          <div
            className={cn(acrdArrowVariants({ state }))}
            {...{ 'fs-accordion-element': 'arrow' }}
            dangerouslySetInnerHTML={{
              __html:
                '%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22currentColor%22%3E%3Cpath%20d%3D%22M11.9999%2013.1714L16.9497%208.22168L18.3639%209.63589L11.9999%2015.9999L5.63599%209.63589L7.0502%208.22168L11.9999%2013.1714Z%22%2F%3E%3C%2Fsvg%3E',
            }}
          />
        </div>

        {/* Accordion Item Body */}
        <div
          className={cn(acrdItmBodyVariants({ variant }))}
          aria-labelledby={finalAriaLabelledBy}
          {...{ 'fs-accordion-element': 'content' }}
        >
          {acrdItmMap ?? (
            <>
              <Paragraph text={bodySrc} visible={body} fontColor='inherit' />
              <ListItmCtrl
                visible={exampleListItem}
                lLIcn={true}
                pPSubtxt={false}
              />
            </>
          )}
        </div>
      </div>
    );
  }
);

AcrdItm.displayName = 'AcrdItm';

export {
  AcrdItm,
  acrdItmVariants,
  acrdItmHeadVariants,
  acrdItmBodyVariants,
  acrdArrowVariants,
};
