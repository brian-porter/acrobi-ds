import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const paragraphVariants = cva('leading-relaxed', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    color: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-accent-foreground',
      destructive: 'text-destructive',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    spacing: {
      tight: 'leading-tight',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
    weight: 'normal',
    align: 'left',
    spacing: 'relaxed',
  },
});

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  /**
   * Text size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Text color
   */
  color?:
    | 'default'
    | 'muted'
    | 'accent'
    | 'destructive'
    | 'success'
    | 'warning';
  /**
   * Font weight
   */
  weight?: 'normal' | 'medium' | 'semibold';
  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right' | 'justify';
  /**
   * Line height
   */
  spacing?: 'tight' | 'normal' | 'relaxed' | 'loose';
  /**
   * Paragraph content
   */
  children: React.ReactNode;
  /**
   * Whether to truncate text with ellipsis
   */
  truncate?: boolean;
  /**
   * Number of lines to show before truncating
   */
  clamp?: number;
}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  (
    {
      className,
      size,
      color,
      weight,
      align,
      spacing,
      children,
      truncate = false,
      clamp,
      ...props
    },
    ref
  ) => {
    const truncateClass = truncate ? 'truncate' : '';
    const clampClass = clamp ? `line-clamp-${clamp}` : '';

    return (
      <p
        className={cn(
          paragraphVariants({ size, color, weight, align, spacing }),
          truncateClass,
          clampClass,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Paragraph.displayName = 'Paragraph';

export { Paragraph, paragraphVariants };
