import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Switch } from './switch';
import { Label } from './label';

/**
 * SwitchGrpCtrl (Switch Group Control) variant styles using authentic Acrobi classes
 * This matches the devlink SwitchGrpCtrl component for grouped toggle controls
 */
const switchGrpCtrlVariants = cva(
  // Base authentic Acrobi toggle group class
  'tgl_grp',
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

// Group options styling
const grpOptsVariants = cva('grp-opts', {
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

// Example wrapper styling
const exampleVariants = cva('example', {
  variants: {
    visible: {
      true: '',
      false: 'hidden',
    },
  },
  defaultVariants: {
    visible: true,
  },
});

// Toggle item wrapper styling (for TglItm compatibility)
const toggleWrapVariants = cva('toggle_wrap', {
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

// Toggle main styling
const toggleMainVariants = cva('toggle_main', {
  variants: {
    align: {
      left: '',
      right: '',
      center: '',
    },
  },
  defaultVariants: {
    align: 'left',
  },
});

export interface ToggleItem {
  id?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  feedback?: boolean;
  feedbackText?: string;
  feedbackIcon?: string;
  feedbackColor?: string;
  align?: 'l' | 'r' | 'c';
  onClick?: React.HTMLAttributes<HTMLDivElement>;
  onRowClick?: React.HTMLAttributes<HTMLAnchorElement>;
  toggleId?: string;
  toggleName?: string;
  toggleValue?: string;
  tabOrder?: number;
}

export interface SwitchGrpCtrlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof switchGrpCtrlVariants> {
  /**
   * Custom toggle mapping content
   */
  tglMap?: React.ReactNode;
  /**
   * Show example toggle group
   */
  exampleToggleGroup?: boolean;
  /**
   * Example toggle label source
   */
  exampleTglLableSrc?: string;
  /**
   * Example toggle click handler
   */
  exampleTglClick?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * Component variant
   */
  variant?: 'default' | 'ghost' | 'separated';
  /**
   * Modern API - array of toggle items
   */
  items?: ToggleItem[];
  /**
   * Callback when any toggle changes (modern approach)
   */
  onToggleChange?: (index: number, checked: boolean, item: ToggleItem) => void;
  /**
   * Group label for accessibility
   */
  groupLabel?: string;
}

/**
 * SwitchGrpCtrl (Switch Group Control) component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink SwitchGrpCtrl component.
 *
 * Key features:
 * - Uses .tgl_grp and .grp-opts classes for authentic styling
 * - Uses .toggle_wrap and .toggle_main for individual toggle styling
 * - Integrates with existing Switch component for toggle controls
 * - Supports custom toggle mapping or example toggle items
 * - Provides modern items array API as alternative to custom mapping
 * - Supports alignment, feedback, and interaction handlers
 *
 * @example
 * ```tsx
 * // Devlink API
 * <SwitchGrpCtrl
 *   exampleToggleGroup={true}
 *   exampleTglLableSrc="Enable Feature"
 * />
 *
 * // Custom mapping
 * <SwitchGrpCtrl
 *   tglMap={
 *     <>
 *       <TglItm label="Feature 1" checked={true} />
 *       <TglItm label="Feature 2" checked={false} />
 *     </>
 *   }
 * />
 *
 * // Modern API
 * <SwitchGrpCtrl
 *   items={[
 *     { label: "Notifications", checked: true },
 *     { label: "Marketing emails", checked: false },
 *     { label: "Product updates", checked: true }
 *   ]}
 *   onToggleChange={(index, checked, item) => console.log(index, checked, item)}
 * />
 * ```
 */
const SwitchGrpCtrl = React.forwardRef<HTMLDivElement, SwitchGrpCtrlProps>(
  (
    {
      className,
      tglMap,
      exampleToggleGroup = true,
      exampleTglLableSrc = 'Label',
      exampleTglClick = {},
      variant = 'default',
      // Modern API
      items,
      onToggleChange,
      groupLabel,
      ...props
    },
    ref
  ) => {
    // Modern API implementation
    if (items) {
      return (
        <div
          ref={ref}
          className={cn(switchGrpCtrlVariants({ variant }), className)}
          role='group'
          aria-label={groupLabel}
          {...props}
        >
          <div className={cn(grpOptsVariants({ variant }))}>
            {items.map((item, index) => (
              <div
                key={item.id || index}
                className={cn(toggleWrapVariants({ variant }))}
              >
                <div
                  className={cn(
                    toggleMainVariants({
                      align:
                        item.align === 'l'
                          ? 'left'
                          : item.align === 'r'
                            ? 'right'
                            : 'center',
                    })
                  )}
                  data-input-align={item.align || 'l'}
                  {...item.onRowClick}
                >
                  <Switch
                    label={item.label}
                    checked={item.checked || false}
                    disabled={item.disabled || false}
                    feedback={item.feedback ? item.feedbackText : undefined}
                    toggleId={item.toggleId}
                    toggleName={item.toggleName}
                    toggleValue={item.toggleValue}
                    tabOrder={item.tabOrder}
                    onCheckedChange={checked => {
                      onToggleChange?.(index, checked, item);
                      item.onClick?.onClick?.({} as any);
                    }}
                    {...item.onClick}
                  />

                  {/* Additional feedback styling for TglItm compatibility */}
                  {item.feedback && (
                    <div className='itm_fbk'>
                      <Label
                        color={item.feedbackColor || 'fd500'}
                        text={item.feedbackText || 'Feedback message'}
                        icon={item.feedbackIcon || 'act_clearcirc'}
                        showText={true}
                        showIcon={true}
                        iconLocation='r'
                        size='r3'
                        visible={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Devlink API implementation
    return (
      <div
        ref={ref}
        className={cn(switchGrpCtrlVariants({ variant }), className)}
        role='group'
        aria-label={groupLabel}
        {...props}
      >
        <div className={cn(grpOptsVariants({ variant }))}>
          {tglMap ??
            (exampleToggleGroup ? (
              <div className={cn(exampleVariants({ visible: true }))}>
                <div className={cn(toggleWrapVariants({ variant }))}>
                  <div
                    className={cn(toggleMainVariants({ align: 'left' }))}
                    data-input-align='l'
                  >
                    <Switch
                      label={exampleTglLableSrc}
                      checked={false}
                      onCheckedChange={checked => {
                        console.log('Example toggle changed:', checked);
                        exampleTglClick?.onClick?.({} as any);
                      }}
                      {...exampleTglClick}
                    />
                  </div>
                </div>
              </div>
            ) : null)}
        </div>
      </div>
    );
  }
);

SwitchGrpCtrl.displayName = 'SwitchGrpCtrl';

export {
  SwitchGrpCtrl,
  switchGrpCtrlVariants,
  grpOptsVariants,
  exampleVariants,
  toggleWrapVariants,
  toggleMainVariants,
};
