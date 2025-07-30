import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button, type ButtonProps } from '../primitives/button';
import { Spacer } from '../primitives/spacer';

const btnBarVariants = cva('flex items-center', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    alignment: {
      start: '',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    spacing: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  compoundVariants: [
    // Vertical alignment adjustments
    {
      orientation: 'vertical',
      alignment: 'start',
      class: 'items-start justify-start',
    },
    {
      orientation: 'vertical',
      alignment: 'center',
      class: 'items-center justify-center',
    },
    {
      orientation: 'vertical',
      alignment: 'end',
      class: 'items-end justify-start',
    },
    {
      orientation: 'vertical',
      alignment: 'between',
      class: 'items-stretch justify-between',
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    alignment: 'start',
    spacing: 'md',
    wrap: false,
  },
});

export interface BtnBarButton {
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * Button click handler
   */
  onClick?: ButtonProps['onClick'];
  /**
   * Button variant
   */
  variant?: ButtonProps['variant'];
  /**
   * Button size
   */
  size?: ButtonProps['size'];
  /**
   * Whether button is disabled
   */
  disabled?: boolean;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Additional button props
   */
  buttonProps?: Omit<
    ButtonProps,
    'children' | 'onClick' | 'variant' | 'size' | 'disabled' | 'type'
  >;
}

export interface BtnBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof btnBarVariants> {
  /**
   * Array of buttons to display
   */
  buttons: BtnBarButton[];
  /**
   * Layout orientation
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Button alignment
   * @default "start"
   */
  alignment?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /**
   * Spacing between buttons
   * @default "md"
   */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Whether buttons can wrap to next line
   * @default false
   */
  wrap?: boolean;
  /**
   * Default size for all buttons
   */
  defaultSize?: ButtonProps['size'];
  /**
   * Default variant for all buttons
   */
  defaultVariant?: ButtonProps['variant'];
}

const BtnBar = React.forwardRef<HTMLDivElement, BtnBarProps>(
  (
    {
      className,
      buttons = [],
      orientation,
      alignment,
      spacing,
      wrap,
      defaultSize = 'default',
      defaultVariant = 'default',
      ...props
    },
    ref
  ) => {
    if (buttons.length === 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          btnBarVariants({ orientation, alignment, spacing, wrap }),
          className
        )}
        role='group'
        {...props}
      >
        {buttons.map((button, index) => (
          <Button
            key={index}
            type={button.type || 'button'}
            variant={button.variant || defaultVariant}
            size={button.size || defaultSize}
            disabled={button.disabled}
            onClick={button.onClick}
            {...button.buttonProps}
          >
            {button.children}
          </Button>
        ))}
      </div>
    );
  }
);
BtnBar.displayName = 'BtnBar';

export { BtnBar, btnBarVariants };
