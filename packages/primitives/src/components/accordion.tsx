import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { AcrdItm } from './acrd-itm';
import { AcrdSec } from './acrd-sec';
import { AcrdSecSub } from './acrd-sec-sub';

/**
 * Accordion (Acrd) variant styles using authentic Acrobi classes
 * This matches the devlink Acrd component pattern using Finsweet Accordion
 * where styling is controlled via specific CSS classes and Finsweet attributes
 */
const accordionVariants = cva(
  // Base styles - using authentic Acrobi accordion wrapper class
  'acrdn_wrap',
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

// Accordion main container using authentic Acrobi patterns
const accordionMainVariants = cva('acrdn_main', {
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

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  // === Devlink-compatible API ===
  /**
   * Finsweet element type (Webflow attribute)
   */
  element?: string;
  /**
   * Initial open item (Webflow attribute)
   */
  initial?: string;
  /**
   * Single item mode (Webflow attribute)
   */
  single?: string;
  /**
   * Custom accordion items mapping content
   */
  acrdItmMap?: React.ReactNode;
  /**
   * Accordion variant
   */
  variant?: 'default' | 'ghost' | 'separated';

  // === Legacy API (backward compatibility) ===
  /**
   * @deprecated Use acrdItmMap instead
   */
  items?: AccordionItem[];
  /**
   * @deprecated Use element instead
   */
  multiple?: boolean;
  /**
   * @deprecated Use initial instead
   */
  defaultValue?: string | string[];
  /**
   * @deprecated Use controlled state externally
   */
  value?: string | string[];
  /**
   * @deprecated Use controlled state externally
   */
  onValueChange?: (value: string | string[]) => void;
  /**
   * @deprecated Use single="false" instead
   */
  collapsible?: boolean;
  /**
   * @deprecated Configure via AcrdItm components
   */
  titleSize?:
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
   * @deprecated Configure via AcrdItm components
   */
  bodyTextColor?:
    | 'fd500'
    | 'fw500'
    | 'f500'
    | 'p500'
    | 'n500'
    | 'n300'
    | 'n700'
    | 'n999'
    | 'inherit';
  /**
   * @deprecated Use devlink API
   */
  visible?: boolean;
}

// Legacy interface for backward compatibility
export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: string;
  showIcon?: boolean;
  disabled?: boolean;
}

// Convert legacy items to AcrdItm components for backward compatibility
const renderLegacyItems = (items: AccordionItem[]) => {
  return items.map((item, index) => (
    <AcrdItm
      key={item.id}
      acrdItm={true}
      icn={item.showIcon || false}
      icnSrc={item.icon || 'default'}
      titleTxtSrc={item.title}
      body={true}
      bodySrc={
        typeof item.content === 'string' ? item.content : 'Custom content'
      }
      itemIndex={index + 1}
      acrdItmMap={typeof item.content !== 'string' ? item.content : undefined}
    />
  ));
};

/**
 * Accordion (Acrd) component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink Acrd component.
 * Based on the Finsweet Accordion system.
 *
 * Key features:
 * - Uses .acrdn_wrap and .acrdn_main classes for authentic styling
 * - Uses Finsweet Accordion attributes for functionality (fs-accordion-*)
 * - Integrates with AcrdItm, AcrdSec, AcrdSecSub components
 * - Supports interactive animations and state management
 * - Maintains backward compatibility with legacy API
 *
 * @example
 * ```tsx
 * // Devlink API
 * <Accordion
 *   element="group"
 *   initial="1"
 *   single="true"
 *   acrdItmMap={
 *     <>
 *       <AcrdItm titleTxtSrc="Item 1" body={true} bodySrc="Content 1" />
 *       <AcrdItm titleTxtSrc="Item 2" body={true} bodySrc="Content 2" />
 *     </>
 *   }
 * />
 *
 * // Legacy API (backward compatible)
 * <Accordion
 *   items={[
 *     { id: '1', title: 'Item 1', content: 'Content 1' },
 *     { id: '2', title: 'Item 2', content: 'Content 2' }
 *   ]}
 * />
 * ```
 */
const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      // Devlink API
      element = 'group',
      initial = '1',
      single = 'true',
      acrdItmMap,
      variant = 'default',
      // Legacy API (backward compatibility)
      items,
      visible = true,
      multiple = false,
      defaultValue,
      value,
      onValueChange,
      collapsible = true,
      titleSize = 'r1',
      bodyTextColor = 'inherit',
      ...props
    },
    ref
  ) => {
    // Handle backward compatibility - convert legacy props
    const finalSingle =
      typeof single === 'string' ? single : single ? 'true' : 'false';

    // Handle legacy items for backward compatibility
    const renderContent = () => {
      if (acrdItmMap) {
        return acrdItmMap;
      }

      if (items && items.length > 0) {
        console.warn(
          'Accordion: Using legacy items prop. Consider migrating to acrdItmMap with AcrdItm components.'
        );
        return renderLegacyItems(items);
      }

      // Default content
      return (
        <>
          <AcrdItm titleTxtSrc='Title' />
          <AcrdItm titleTxtSrc='Title' />
        </>
      );
    };

    // Don't render if not visible (legacy support)
    if (visible === false) return null;

    return (
      <div
        className={cn(accordionVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        {/* Finsweet Accordion Script */}
        <div
          className='hide'
          dangerouslySetInnerHTML={{
            __html:
              '%3C!--%20%5BFinsweet%20Attributes%5D%20Accordion%20--%3E%0A%3Cscript%3E(()%3D%3E%7Bvar%20t%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2F%40finsweet%2Fattributes-accordion%401%2Faccordion.js%22%2Ce%3Ddocument.querySelector(%60script%5Bsrc%3D%22%24%7Bt%7D%22%5D%60)%3Be%7C%7C(e%3Ddocument.createElement(%22script%22)%2Ce.async%3D!0%2Ce.src%3Dt%2Cdocument.head.append(e))%3B%7D)()%3B%3C%2Fscript%3E',
          }}
        />

        <div
          className={cn(accordionMainVariants({ variant }))}
          {...{
            'fs-accordion-element': element,
            'fs-accordion-initial': initial,
            'fs-accordion-single': finalSingle,
          }}
        >
          {renderContent()}
        </div>
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';

export { Accordion, accordionVariants, accordionMainVariants };
export type { AccordionItem };

// Re-export child components for convenience
export { AcrdItm } from './acrd-itm';
export { AcrdSec } from './acrd-sec';
export { AcrdSecSub } from './acrd-sec-sub';
