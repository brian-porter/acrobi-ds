import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Label } from './label';

/**
 * RdoGrpCtrl (Radio Group Control) variant styles using authentic Acrobi classes
 * This matches the devlink RdoGrpCtrl component for grouped radio controls
 */
const rdoGrpCtrlVariants = cva(
  // Base authentic Acrobi radio group wrapper class
  'rdogrp_wrap',
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

// Radio control styling (for RdoCtrl compatibility)
const rdoCtrlVariants = cva('rdo_ctrl', {
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

export interface RadioItem {
  id?: string;
  label?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  feedback?: boolean;
  feedbackText?: string;
  feedbackIcon?: string;
  feedbackColor?: 'fd500' | 'fw500' | 'f500' | 'p500' | 'n500';
  feedbackIconLocation?: 'l' | 'r';
  onClick?: React.HTMLAttributes<HTMLInputElement>;
  tabOrder?: string;
  labelSize?:
    | 'inherit'
    | 'r4'
    | 'r4b'
    | 'r3'
    | 'r3b'
    | 'r2'
    | 'r2b'
    | 'r1'
    | 'r1b';
}

export interface RdoGrpCtrlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rdoGrpCtrlVariants> {
  /**
   * Custom radio mapping content
   */
  fieldRdoCtrlMap?: React.ReactNode;
  /**
   * Show example radio control
   */
  fieldExampleRdoCtrl?: boolean;
  /**
   * Example radio field item text source
   */
  fieldItmTxtSrc?: string;
  /**
   * Example radio field item name
   */
  fieldItmName?: string;
  /**
   * Example radio field item value
   */
  fieldItmValue?: string;
  /**
   * Example radio field alignment
   */
  fieldAlign?: 'l' | 'c' | 'r';
  /**
   * Example radio field item click handler
   */
  fieldItmClick?: React.HTMLAttributes<HTMLInputElement>;
  /**
   * Example radio field feedback visibility
   */
  fieldFbk?: boolean;
  /**
   * Example radio field feedback text source
   */
  fieldFbkTxtSrc?: string;
  /**
   * Example radio field feedback icon source
   */
  fieldFbkIcnSrc?: string;
  /**
   * Example radio field feedback color
   */
  fieldFbkClr?: 'fd500' | 'fw500' | 'f500' | 'p500' | 'n500';
  /**
   * Example radio field feedback icon location
   */
  fieldFbkIcnLoc?: 'l' | 'r';
  /**
   * Component variant
   */
  variant?: 'default' | 'ghost' | 'separated';
  /**
   * Modern API - array of radio items
   */
  items?: RadioItem[];
  /**
   * Selected value for radio group
   */
  value?: string;
  /**
   * Callback when any radio changes (modern approach)
   */
  onValueChange?: (value: string, item: RadioItem) => void;
  /**
   * Radio group name (required for radio functionality)
   */
  name?: string;
  /**
   * Group label for accessibility
   */
  groupLabel?: string;
}

/**
 * Internal RdoCtrl component that matches devlink structure
 */
const RdoCtrl = React.forwardRef<
  HTMLInputElement,
  {
    align?: 'l' | 'c' | 'r';
    fbk?: boolean;
    id?: string;
    itmName?: string;
    itmValue?: string;
    itmLblSrc?: string;
    itmLblSz?: string;
    tabOrder?: string;
    fbkFbkTxt?: boolean;
    fbkFbkIcn?: boolean;
    fbkFbkTxtSrc?: string;
    fbkFbkIcnSrc?: string;
    fbkFbkClr?: string;
    fbkFbkIcnLoc?: 'l' | 'r';
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    itmClick?: React.HTMLAttributes<HTMLInputElement>;
    checked?: boolean;
    disabled?: boolean;
  }
>(
  (
    {
      align = 'l',
      fbk = false,
      id,
      itmName,
      itmValue,
      itmLblSrc = 'Label',
      itmLblSz = 'r3',
      tabOrder,
      fbkFbkTxt = true,
      fbkFbkIcn = true,
      fbkFbkTxtSrc = 'Feedback message',
      fbkFbkIcnSrc = 'clearcirc',
      fbkFbkClr = 'fd500',
      fbkFbkIcnLoc = 'r',
      onChange,
      itmClick = {},
      checked = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          rdoCtrlVariants({
            align: align === 'l' ? 'left' : align === 'c' ? 'center' : 'right',
          })
        )}
        data-input-align={align}
        {...itmClick}
      >
        <input
          type='radio'
          ref={ref}
          className='rdo'
          name={itmName}
          value={itmValue}
          required={false}
          tabIndex={parseInt(tabOrder || '0') || 0}
          onChange={onChange}
          id={id}
          checked={checked}
          disabled={disabled}
          {...props}
          {...itmClick}
        />
        <label className='label' data-lbl-size={itmLblSz} htmlFor={id}>
          {itmLblSrc}
        </label>
        {fbk && (
          <div className='itm_fbk'>
            <Label
              color={fbkFbkClr as any}
              icon={fbkFbkIcnSrc}
              text={fbkFbkTxtSrc}
              showText={fbkFbkTxt}
              showIcon={fbkFbkIcn}
              iconLocation={fbkFbkIcnLoc}
              size='r3'
            />
          </div>
        )}
      </div>
    );
  }
);

RdoCtrl.displayName = 'RdoCtrl';

/**
 * RdoGrpCtrl (Radio Group Control) component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink RdoGrpCtrl component.
 *
 * Key features:
 * - Uses .rdogrp_wrap and .grp_main classes for authentic styling
 * - Uses .rdo_ctrl and .rdo classes for individual radio styling
 * - Supports custom radio mapping or example radio items
 * - Provides modern items array API as alternative to custom mapping
 * - Supports alignment, feedback, and interaction handlers
 * - Maintains proper radio group behavior with name attribute
 *
 * @example
 * ```tsx
 * // Devlink API
 * <RdoGrpCtrl
 *   fieldExampleRdoCtrl={true}
 *   fieldItmTxtSrc="Option 1"
 *   fieldItmName="choice"
 *   fieldItmValue="option1"
 * />
 *
 * // Custom mapping
 * <RdoGrpCtrl
 *   fieldRdoCtrlMap={
 *     <>
 *       <RdoCtrl itmLblSrc="Option 1" itmName="choice" itmValue="1" />
 *       <RdoCtrl itmLblSrc="Option 2" itmName="choice" itmValue="2" />
 *     </>
 *   }
 * />
 *
 * // Modern API
 * <RdoGrpCtrl
 *   name="preferences"
 *   items={[
 *     { label: "Daily", value: "daily" },
 *     { label: "Weekly", value: "weekly" },
 *     { label: "Monthly", value: "monthly" }
 *   ]}
 *   value="weekly"
 *   onValueChange={(value, item) => console.log(value, item)}
 * />
 * ```
 */
const RdoGrpCtrl = React.forwardRef<HTMLDivElement, RdoGrpCtrlProps>(
  (
    {
      className,
      fieldRdoCtrlMap,
      fieldExampleRdoCtrl = false,
      fieldItmTxtSrc = 'Label',
      fieldItmName,
      fieldItmValue,
      fieldAlign = 'l',
      fieldItmClick = {},
      fieldFbk = false,
      fieldFbkTxtSrc = 'Feedback message',
      fieldFbkIcnSrc = 'clearcirc',
      fieldFbkClr = 'fd500',
      fieldFbkIcnLoc = 'r',
      variant = 'default',
      // Modern API
      items,
      value,
      onValueChange,
      name,
      groupLabel,
      ...props
    },
    ref
  ) => {
    // Modern API implementation
    if (items && name) {
      return (
        <div
          ref={ref}
          className={cn(rdoGrpCtrlVariants({ variant }), className)}
          role='radiogroup'
          aria-label={groupLabel}
          {...props}
        >
          <div
            className={cn(grpMainVariants({ align: 'left' }))}
            data-input-align='l'
          >
            {items.map((item, index) => (
              <RdoCtrl
                key={item.id || `${name}-${index}`}
                id={item.id || `${name}-${index}`}
                itmLblSrc={item.label}
                itmName={name}
                itmValue={item.value}
                align={fieldAlign}
                checked={value === item.value}
                disabled={item.disabled || false}
                fbk={item.feedback || false}
                fbkFbkTxtSrc={item.feedbackText}
                fbkFbkIcnSrc={item.feedbackIcon}
                fbkFbkClr={item.feedbackColor}
                fbkFbkIcnLoc={item.feedbackIconLocation}
                itmLblSz={item.labelSize}
                tabOrder={item.tabOrder}
                onChange={e => {
                  if (e.target.checked) {
                    onValueChange?.(item.value!, item);
                    item.onClick?.onClick?.({} as any);
                  }
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
        className={cn(rdoGrpCtrlVariants({ variant }), className)}
        role='radiogroup'
        aria-label={groupLabel}
        {...props}
      >
        <div
          className={cn(grpMainVariants({ align: 'left' }))}
          data-input-align='l'
        >
          {fieldRdoCtrlMap ??
            (fieldExampleRdoCtrl ? (
              <div>
                <RdoCtrl
                  align={fieldAlign}
                  fbk={fieldFbk}
                  itmLblSrc={fieldItmTxtSrc}
                  fbkFbkTxtSrc={fieldFbkTxtSrc}
                  fbkFbkIcnSrc={fieldFbkIcnSrc}
                  fbkFbkClr={fieldFbkClr}
                  fbkFbkIcnLoc={fieldFbkIcnLoc}
                  itmName={fieldItmName}
                  itmValue={fieldItmValue}
                  itmClick={fieldItmClick}
                  onChange={e => {
                    console.log('Example radio changed:', e.target.value);
                    fieldItmClick?.onClick?.({} as any);
                  }}
                />
              </div>
            ) : null)}
        </div>
      </div>
    );
  }
);

RdoGrpCtrl.displayName = 'RdoGrpCtrl';

export {
  RdoGrpCtrl,
  rdoGrpCtrlVariants,
  grpMainVariants,
  rdoCtrlVariants,
  RdoCtrl,
};
