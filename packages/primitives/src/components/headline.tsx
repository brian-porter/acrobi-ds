import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const headlineVariants = cva('font-semibold tracking-tight', {
  variants: {
    level: {
      h1: 'text-4xl lg:text-5xl font-bold',
      h2: 'text-3xl lg:text-4xl',
      h3: 'text-2xl lg:text-3xl',
      h4: 'text-xl lg:text-2xl',
      h5: 'text-lg lg:text-xl',
      h6: 'text-base lg:text-lg',
    },
    color: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-accent-foreground',
      destructive: 'text-destructive',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    level: 'h2',
    color: 'default',
    align: 'left',
    weight: 'semibold',
  },
});

export interface HeadlineProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headlineVariants> {
  /**
   * The heading level and size
   */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Text color variant
   */
  color?: 'default' | 'muted' | 'accent' | 'destructive';
  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Font weight
   */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /**
   * The headline text content
   */
  children: React.ReactNode;
}

const Headline = React.forwardRef<HTMLHeadingElement, HeadlineProps>(
  (
    { className, level = 'h2', color, align, weight, children, ...props },
    ref
  ) => {
    const HeadingComponent = level as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    return React.createElement(
      HeadingComponent,
      {
        className: cn(
          headlineVariants({ level, color, align, weight, className })
        ),
        ref,
        ...props,
      },
      children
    );
  }
);

Headline.displayName = 'Headline';

export { Headline, headlineVariants };
