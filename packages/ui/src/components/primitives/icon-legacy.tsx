import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const iconVariants = cva('inline-flex shrink-0', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
      '2xl': 'h-10 w-10',
    },
    color: {
      current: 'text-current',
      primary: 'text-primary',
      secondary: 'text-secondary',
      muted: 'text-muted-foreground',
      accent: 'text-accent',
      destructive: 'text-destructive',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      info: 'text-blue-600 dark:text-blue-400',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'current',
  },
});

export interface IconProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof iconVariants> {
  /**
   * Icon size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /**
   * Icon color
   */
  color?:
    | 'current'
    | 'primary'
    | 'secondary'
    | 'muted'
    | 'accent'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'info';
  /**
   * SVG content or icon component
   */
  children: React.ReactNode;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size, color, children, ...props }, ref) => {
    return (
      <svg
        className={cn(iconVariants({ size, color, className }))}
        fill='currentColor'
        viewBox='0 0 24 24'
        ref={ref}
        {...props}
      >
        {children}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

export { Icon, iconVariants };
