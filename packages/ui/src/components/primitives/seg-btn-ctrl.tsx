import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Label } from './label';

/**
 * SegBtnCtrl (Segmented Button Control) variant styles using authentic Acrobi classes
 * This matches the devlink SegBtnCtrl component for grouped button controls
 */
const segBtnCtrlVariants = cva(
  // Base authentic Acrobi segmented button wrapper class
  'segbtn_wrap',
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

// Segmented button menu styling
const segBtnMenuVariants = cva('segbtn_menu', {
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

// Individual segmented button styling
const segBtnVariants = cva('segbtn', {
  variants: {
    active: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    active: false,
  },
});

export interface SegBtnItem {
  visible?: boolean;
  showText?: boolean;
  showIcon?: boolean;
  textSrc?: string;
  iconSrc?: string;
  active?: boolean | string;
  onClick?: React.HTMLAttributes<HTMLDivElement>;
}

export interface SegBtnCtrlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof segBtnCtrlVariants> {
  /**
   * Segmented button control visibility toggle
   */
  segBtn?: boolean;
  /**
   * Segmented button color scheme
   */
  segBtnClr?: string;
  /**
   * Button 1 configuration
   */
  btn1?: boolean;
  btn1Btn1Txt?: boolean;
  btn1Btn1Icn?: boolean;
  btn1Btn1TxtSrc?: string;
  btn1Btn1IcnSrc?: string;
  btn1Btn1Actv?: boolean | string;
  btn1Btn1Click?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * Button 2 configuration
   */
  btn2?: boolean;
  btn2Btn2Txt?: boolean;
  btn2Btn2Icn?: boolean;
  btn2Btn2TxtSrc?: string;
  btn2Btn2IcnSrc?: string;
  btn2Btn2Actv?: boolean | string;
  btn2Btn2Click?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * Button 3 configuration
   */
  btn3?: boolean;
  btn3Btn3Txt?: boolean;
  btn3Btn3Icn?: boolean;
  btn3Btn3TxtSrc?: string;
  btn3Btn3IcnSrc?: string;
  btn3Btn3Actv?: boolean | string;
  btn3Btn3Click?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * Button 4 configuration
   */
  btn4?: boolean;
  btn4Btn4Txt?: boolean;
  btn4Btn4Icn?: boolean;
  btn4Btn4TxtSrc?: string;
  btn4Btn4IcnSrc?: string;
  btn4Btn4Actv?: boolean | string;
  btn4Btn4Click?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * Button 5 configuration
   */
  btn5?: boolean;
  btn5Btn5Txt?: boolean;
  btn5Btn5Icn?: boolean;
  btn5Btn5TxtSrc?: string;
  btn5Btn5IcnSrc?: string;
  btn5Btn5Actv?: boolean | string;
  btn5Btn5Click?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * Component variant
   */
  variant?: 'default' | 'ghost' | 'separated';
  /**
   * Alternative API - array of button items (modern approach)
   */
  items?: SegBtnItem[];
  /**
   * Callback when active item changes (modern approach)
   */
  onActiveChange?: (index: number) => void;
  /**
   * Currently active item index (modern approach)
   */
  activeIndex?: number;
}

// Helper to convert boolean/string to data attribute value
const getActiveState = (active: boolean | string | undefined): string => {
  if (typeof active === 'string') return active;
  return active ? 'true' : 'false';
};

/**
 * SegBtnCtrl (Segmented Button Control) component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink SegBtnCtrl component.
 *
 * Key features:
 * - Uses .segbtn_wrap and .segbtn_menu classes for authentic styling
 * - Uses .segbtn class for individual button styling
 * - Uses data-active attribute for active state styling
 * - Integrates with Label component for button content
 * - Supports up to 5 individual buttons with independent configuration
 * - Provides modern items array API as alternative to individual button props
 *
 * @example
 * ```tsx
 * // Devlink API
 * <SegBtnCtrl
 *   segBtn={true}
 *   btn1={true}
 *   btn1Btn1Txt={true}
 *   btn1Btn1TxtSrc="All"
 *   btn1Btn1Actv="false"
 *   btn2={true}
 *   btn2Btn2Icn={true}
 *   btn2Btn2IcnSrc="image"
 *   btn2Btn2Actv="true"
 * />
 *
 * // Modern API
 * <SegBtnCtrl
 *   items={[
 *     { textSrc: "All", active: false },
 *     { iconSrc: "image", active: true },
 *     { textSrc: "Videos", active: false }
 *   ]}
 *   onActiveChange={(index) => console.log(index)}
 * />
 * ```
 */
const SegBtnCtrl = React.forwardRef<HTMLDivElement, SegBtnCtrlProps>(
  (
    {
      className,
      segBtn = true,
      segBtnClr,
      // Button 1
      btn1 = true,
      btn1Btn1Txt = true,
      btn1Btn1Icn = true,
      btn1Btn1TxtSrc = 'SegLbl',
      btn1Btn1IcnSrc = 'default',
      btn1Btn1Actv = 'false',
      btn1Btn1Click = {},
      // Button 2
      btn2 = true,
      btn2Btn2Txt = true,
      btn2Btn2Icn = true,
      btn2Btn2TxtSrc = 'SegLbl',
      btn2Btn2IcnSrc = 'default',
      btn2Btn2Actv = 'true',
      btn2Btn2Click = {},
      // Button 3
      btn3 = true,
      btn3Btn3Txt = true,
      btn3Btn3Icn = true,
      btn3Btn3TxtSrc = 'SegLbl',
      btn3Btn3IcnSrc = 'default',
      btn3Btn3Actv = 'false',
      btn3Btn3Click = {},
      // Button 4
      btn4 = false,
      btn4Btn4Txt = true,
      btn4Btn4Icn = true,
      btn4Btn4TxtSrc = 'SegLbl',
      btn4Btn4IcnSrc = 'default',
      btn4Btn4Actv = 'false',
      btn4Btn4Click = {},
      // Button 5
      btn5 = false,
      btn5Btn5Txt = true,
      btn5Btn5Icn = true,
      btn5Btn5TxtSrc = 'SegLbl',
      btn5Btn5IcnSrc = 'default',
      btn5Btn5Actv = 'false',
      btn5Btn5Click = {},
      variant = 'default',
      // Modern API
      items,
      onActiveChange,
      activeIndex,
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!segBtn) return null;

    // Use modern API if provided
    if (items) {
      return (
        <div
          ref={ref}
          className={cn(segBtnCtrlVariants({ variant }), className)}
          {...props}
        >
          <div className={cn(segBtnMenuVariants({ variant }))}>
            {items.map((item, index) => {
              const isActive =
                activeIndex !== undefined ? activeIndex === index : item.active;

              return item.visible !== false ? (
                <div
                  key={index}
                  className={cn(segBtnVariants({ active: !!isActive }))}
                  data-active={getActiveState(isActive)}
                  onClick={() => {
                    onActiveChange?.(index);
                    item.onClick?.onClick?.({} as any);
                  }}
                  {...item.onClick}
                >
                  <Label
                    showIcon={item.showIcon ?? true}
                    text={item.textSrc || 'SegLbl'}
                    showText={item.showText ?? true}
                    icon={item.iconSrc || 'default'}
                    visible={true}
                  />
                </div>
              ) : null;
            })}
          </div>
        </div>
      );
    }

    // Devlink API
    const buttons = [
      {
        visible: btn1,
        txt: btn1Btn1Txt,
        icn: btn1Btn1Icn,
        txtSrc: btn1Btn1TxtSrc,
        icnSrc: btn1Btn1IcnSrc,
        actv: btn1Btn1Actv,
        click: btn1Btn1Click,
      },
      {
        visible: btn2,
        txt: btn2Btn2Txt,
        icn: btn2Btn2Icn,
        txtSrc: btn2Btn2TxtSrc,
        icnSrc: btn2Btn2IcnSrc,
        actv: btn2Btn2Actv,
        click: btn2Btn2Click,
      },
      {
        visible: btn3,
        txt: btn3Btn3Txt,
        icn: btn3Btn3Icn,
        txtSrc: btn3Btn3TxtSrc,
        icnSrc: btn3Btn3IcnSrc,
        actv: btn3Btn3Actv,
        click: btn3Btn3Click,
      },
      {
        visible: btn4,
        txt: btn4Btn4Txt,
        icn: btn4Btn4Icn,
        txtSrc: btn4Btn4TxtSrc,
        icnSrc: btn4Btn4IcnSrc,
        actv: btn4Btn4Actv,
        click: btn4Btn4Click,
      },
      {
        visible: btn5,
        txt: btn5Btn5Txt,
        icn: btn5Btn5Icn,
        txtSrc: btn5Btn5TxtSrc,
        icnSrc: btn5Btn5IcnSrc,
        actv: btn5Btn5Actv,
        click: btn5Btn5Click,
      },
    ];

    return (
      <div
        ref={ref}
        className={cn(segBtnCtrlVariants({ variant }), className)}
        {...props}
      >
        <div className={cn(segBtnMenuVariants({ variant }))}>
          {buttons.map((button, index) =>
            button.visible ? (
              <div
                key={index}
                className={cn(
                  segBtnVariants({
                    active: button.actv === 'true' || button.actv === true,
                  })
                )}
                data-active={getActiveState(button.actv)}
                {...button.click}
              >
                <Label
                  showIcon={button.icn}
                  text={button.txtSrc}
                  showText={button.txt}
                  icon={button.icnSrc}
                  visible={true}
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  }
);

SegBtnCtrl.displayName = 'SegBtnCtrl';

export { SegBtnCtrl, segBtnCtrlVariants, segBtnMenuVariants, segBtnVariants };
