import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Checkbox } from './checkbox';
import { Label } from './label';

/**
 * CboxGrpCtrl (Checkbox Group Control) variant styles using authentic Acrobi classes
 * This matches the devlink CboxGrpCtrl component for grouped checkbox controls
 */
const cboxGrpCtrlVariants = cva(
  // Base authentic Acrobi checkbox group wrapper class
  'grp_wrap',
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

// Group main content styling
const grpMainVariants = cva('grp_main', {
  variants: {
    align: {
      left: '',
      center: '',
      right: '',
    },
  },
  defaultVariants: {
    align: 'left',
  },
});

export interface CheckboxItem {
  id?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  feedback?: boolean;
  feedbackText?: string;
  feedbackIcon?: string;
  feedbackColor?: 'fd500' | 'fw500' | 'f500' | 'p500' | 'n500';
  feedbackIconLocation?: 'l' | 'r';
  link?: boolean;
  linkText?: string;
  linkHref?: string;
  onClick?: React.HTMLAttributes<HTMLInputElement>;
  tabOrder?: string;
}

export interface CboxGrpCtrlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cboxGrpCtrlVariants> {
  /**
   * Custom checkbox mapping content
   */
  cboxCtrlMap?: React.ReactNode;
  /**
   * Show example checkbox control
   */
  exampleCboxCtrl?: boolean;
  /**
   * Group alignment
   */
  align?: 'l' | 'c' | 'r';
  /**
   * Example checkbox field item text source
   */
  fieldItmTxtSrc?: string;
  /**
   * Example checkbox field item name
   */
  fieldItmName?: string;
  /**
   * Example checkbox field item value
   */
  fieldItmValue?: string;
  /**
   * Example checkbox field item active state
   */
  fieldItmActive?: string | boolean;
  /**
   * Example checkbox field item click handler
   */
  fieldItmClick?: React.HTMLAttributes<HTMLInputElement>;
  /**
   * Example checkbox field link visibility
   */
  fieldLink?: boolean;
  /**
   * Example checkbox field link text source
   */
  fieldLinkTxtSrc?: string;
  /**
   * Example checkbox field link click handler
   */
  fieldLinkClick?: React.HTMLAttributes<HTMLAnchorElement>;
  /**
   * Example checkbox field feedback visibility
   */
  fieldFbk?: boolean;
  /**
   * Example checkbox field feedback text source
   */
  fieldFbkTxtSrc?: string;
  /**
   * Example checkbox field feedback icon source
   */
  fieldFbkIcnSrc?: string;
  /**
   * Example checkbox field feedback color
   */
  fieldFbkClr?: 'fd500' | 'fw500' | 'f500' | 'p500' | 'n500';
  /**
   * Example checkbox field feedback icon location
   */
  fieldFbkIcnLoc?: 'l' | 'r';
  /**
   * Component variant
   */
  variant?: 'default' | 'ghost' | 'separated';
  /**
   * Modern API - array of checkbox items
   */
  items?: CheckboxItem[];
  /**
   * Callback when any checkbox changes (modern approach)
   */
  onCheckboxChange?: (
    index: number,
    checked: boolean,
    item: CheckboxItem
  ) => void;
  /**
   * Group label for accessibility
   */
  groupLabel?: string;
}

/**
 * CboxGrpCtrl (Checkbox Group Control) component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink CboxGrpCtrl component.
 *
 * Key features:
 * - Uses .grp_wrap and .grp_main classes for authentic styling
 * - Integrates with existing Checkbox component for checkbox controls
 * - Supports custom checkbox mapping or example checkbox items
 * - Provides modern items array API as alternative to custom mapping
 * - Supports alignment, feedback, links, and interaction handlers
 *
 * @example
 * ```tsx
 * // Devlink API
 * <CboxGrpCtrl
 *   exampleCboxCtrl={true}
 *   fieldItmTxtSrc="Accept Terms"
 *   fieldFbk={true}
 *   fieldFbkTxtSrc="Required field"
 * />
 *
 * // Custom mapping
 * <CboxGrpCtrl
 *   cboxCtrlMap={
 *     <>
 *       <Checkbox itemLabelText="Option 1" checked={true} />
 *       <Checkbox itemLabelText="Option 2" checked={false} />
 *     </>
 *   }
 * />
 *
 * // Modern API
 * <CboxGrpCtrl
 *   items={[
 *     { label: "Email notifications", checked: true },
 *     { label: "SMS updates", checked: false },
 *     { label: "Marketing communications", checked: true }
 *   ]}
 *   onCheckboxChange={(index, checked, item) => console.log(index, checked, item)}
 * />
 * ```
 */
const CboxGrpCtrl = React.forwardRef<HTMLDivElement, CboxGrpCtrlProps>(
  (
    {
      className,
      cboxCtrlMap,
      exampleCboxCtrl = false,
      align = 'l',
      fieldItmTxtSrc = 'Label',
      fieldItmName = 'cbox',
      fieldItmValue,
      fieldItmActive = 'False',
      fieldItmClick = {},
      fieldLink = false,
      fieldLinkTxtSrc = 'Link here',
      fieldLinkClick = {},
      fieldFbk = false,
      fieldFbkTxtSrc = 'Feedback message',
      fieldFbkIcnSrc = 'clearcirc',
      fieldFbkClr = 'fd500',
      fieldFbkIcnLoc = 'r',
      variant = 'default',
      // Modern API
      items,
      onCheckboxChange,
      groupLabel,
      ...props
    },
    ref
  ) => {
    // Convert fieldItmActive string to boolean for compatibility
    const getActiveState = (active: string | boolean): boolean => {
      if (typeof active === 'boolean') return active;
      return active === 'True' || active === 'true' || active === true;
    };

    // Modern API implementation
    if (items) {
      return (
        <div
          ref={ref}
          className={cn(cboxGrpCtrlVariants({ variant }), className)}
          role='group'
          aria-label={groupLabel}
          {...props}
        >
          <div
            className={cn(
              grpMainVariants({
                align:
                  align === 'l' ? 'left' : align === 'c' ? 'center' : 'right',
              })
            )}
            data-input-align={align}
          >
            {items.map((item, index) => (
              <Checkbox
                key={item.id || index}
                itemLabelText={item.label}
                checked={item.checked || false}
                disabled={item.disabled || false}
                itemName={item.name}
                itemValue={item.value}
                showFeedback={item.feedback || false}
                feedbackTextSrc={item.feedbackText}
                feedbackIconSrc={item.feedbackIcon}
                feedbackColor={item.feedbackColor}
                feedbackIconLocation={item.feedbackIconLocation}
                showLink={item.link || false}
                linkText={item.linkText}
                linkHref={item.linkHref}
                tabOrder={item.tabOrder}
                align={align}
                onCheckedChange={checked => {
                  onCheckboxChange?.(index, checked, item);
                  item.onClick?.onClick?.({} as any);
                }}
                {...item.onClick}
              />
            ))}
          </div>
        </div>
      );
    }

    // Devlink API implementation
    return (
      <div
        ref={ref}
        className={cn(cboxGrpCtrlVariants({ variant }), className)}
        role='group'
        aria-label={groupLabel}
        {...props}
      >
        <div
          className={cn(
            grpMainVariants({
              align:
                align === 'l' ? 'left' : align === 'c' ? 'center' : 'right',
            })
          )}
          data-input-align={align}
        >
          {cboxCtrlMap ??
            (exampleCboxCtrl ? (
              <div>
                <Checkbox
                  itemLabelText={fieldItmTxtSrc}
                  showFeedback={fieldFbk}
                  feedbackTextSrc={fieldFbkTxtSrc}
                  feedbackIconSrc={fieldFbkIcnSrc}
                  feedbackColor={fieldFbkClr}
                  feedbackIconLocation={fieldFbkIcnLoc}
                  itemName={fieldItmName}
                  itemValue={fieldItmValue}
                  linkText={fieldLinkTxtSrc}
                  showLink={fieldLink}
                  itemActive={getActiveState(fieldItmActive)}
                  checked={getActiveState(fieldItmActive)}
                  align={align}
                  onCheckedChange={checked => {
                    console.log('Example checkbox changed:', checked);
                    fieldItmClick?.onClick?.({} as any);
                  }}
                  {...fieldItmClick}
                />

                {/* Second example checkbox to match devlink pattern */}
                <Checkbox
                  itemLabelText={fieldItmTxtSrc}
                  showFeedback={fieldFbk}
                  feedbackTextSrc={fieldFbkTxtSrc}
                  feedbackIconSrc={fieldFbkIcnSrc}
                  feedbackColor={fieldFbkClr}
                  feedbackIconLocation={fieldFbkIcnLoc}
                  itemName={fieldItmName}
                  itemValue={fieldItmValue}
                  showLink={false}
                  itemActive={false}
                  checked={false}
                  align={align}
                  onCheckedChange={checked => {
                    console.log('Example checkbox 2 changed:', checked);
                    fieldItmClick?.onClick?.({} as any);
                  }}
                  {...fieldItmClick}
                />
              </div>
            ) : null)}
        </div>
      </div>
    );
  }
);

CboxGrpCtrl.displayName = 'CboxGrpCtrl';

export { CboxGrpCtrl, cboxGrpCtrlVariants, grpMainVariants };
