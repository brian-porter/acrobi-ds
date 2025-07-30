import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const textVariants = cva('leading-relaxed', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      default: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-accent-foreground',
      destructive: 'text-destructive',
      success: 'text-green-600 dark:text-green-400',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
    weight: 'normal',
    align: 'left',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  /**
   * Text content
   */
  children: React.ReactNode;
  /**
   * HTML element to render
   */
  as?: 'p' | 'span' | 'div' | 'label';
}

const Text = React.forwardRef<any, TextProps>(
  (
    { className, size, variant, weight, align, as = 'p', children, ...props },
    ref
  ) => {
    const Component = as;

    return (
      <Component
        className={cn(
          textVariants({ size, variant, weight, align }),
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

export { Text, textVariants };
