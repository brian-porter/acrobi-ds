import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonPanelVariants = cva('flex items-center', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    align: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-2',
      default: 'gap-3',
      lg: 'gap-4',
      xl: 'gap-6',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    align: 'start',
    gap: 'default',
    wrap: false,
  },
  compoundVariants: [
    {
      orientation: 'vertical',
      align: ['start', 'center', 'end'],
      className: 'items-stretch',
    },
    {
      orientation: 'vertical',
      align: 'start',
      className: 'items-start',
    },
    {
      orientation: 'vertical',
      align: 'center',
      className: 'items-center',
    },
    {
      orientation: 'vertical',
      align: 'end',
      className: 'items-end',
    },
  ],
});

export interface ButtonPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonPanelVariants> {
  /**
   * The buttons to display in the panel
   */
  children: React.ReactNode;
  /**
   * Whether the panel should have a border
   */
  bordered?: boolean;
  /**
   * Whether the panel should have a background
   */
  background?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const ButtonPanel = React.forwardRef<HTMLDivElement, ButtonPanelProps>(
  (
    {
      className,
      orientation,
      align,
      gap,
      wrap,
      bordered = false,
      background = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          buttonPanelVariants({ orientation, align, gap, wrap }),
          {
            'border border-border rounded-lg': bordered,
            'bg-card p-4': background && bordered,
            'bg-card p-3': background && !bordered,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonPanel.displayName = 'ButtonPanel';

export { ButtonPanel, buttonPanelVariants };
