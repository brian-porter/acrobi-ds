import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const spacerVariants = cva('', {
  variants: {
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
      '2xl': '',
      '3xl': '',
      '4xl': '',
    },
    axis: {
      horizontal: 'inline-block',
      vertical: 'block w-full',
    },
  },
  compoundVariants: [
    // Horizontal spacing variants
    {
      axis: 'horizontal',
      size: 'xs',
      class: 'w-1',
    },
    {
      axis: 'horizontal',
      size: 'sm',
      class: 'w-2',
    },
    {
      axis: 'horizontal',
      size: 'md',
      class: 'w-4',
    },
    {
      axis: 'horizontal',
      size: 'lg',
      class: 'w-6',
    },
    {
      axis: 'horizontal',
      size: 'xl',
      class: 'w-8',
    },
    {
      axis: 'horizontal',
      size: '2xl',
      class: 'w-12',
    },
    {
      axis: 'horizontal',
      size: '3xl',
      class: 'w-16',
    },
    {
      axis: 'horizontal',
      size: '4xl',
      class: 'w-20',
    },
    // Vertical spacing variants
    {
      axis: 'vertical',
      size: 'xs',
      class: 'h-1',
    },
    {
      axis: 'vertical',
      size: 'sm',
      class: 'h-2',
    },
    {
      axis: 'vertical',
      size: 'md',
      class: 'h-4',
    },
    {
      axis: 'vertical',
      size: 'lg',
      class: 'h-6',
    },
    {
      axis: 'vertical',
      size: 'xl',
      class: 'h-8',
    },
    {
      axis: 'vertical',
      size: '2xl',
      class: 'h-12',
    },
    {
      axis: 'vertical',
      size: '3xl',
      class: 'h-16',
    },
    {
      axis: 'vertical',
      size: '4xl',
      class: 'h-20',
    },
  ],
  defaultVariants: {
    size: 'md',
    axis: 'vertical',
  },
});

export interface SpacerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacerVariants> {
  /**
   * The spacing size
   * @default "md"
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  /**
   * The axis direction for spacing
   * @default "vertical"
   */
  axis?: 'horizontal' | 'vertical';
}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size, axis, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spacerVariants({ size, axis }), className)}
        aria-hidden='true'
        {...props}
      />
    );
  }
);
Spacer.displayName = 'Spacer';

export { Spacer, spacerVariants };
