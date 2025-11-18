import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

/**
 * Card variant styles using Acrobi Design System data attributes
 * This approach matches the authentic Acrobi component pattern
 * where styling is controlled via data attributes that map to CSS selectors
 */
const cardVariants = cva('card bg-card text-card-foreground', {
  variants: {
    // Card style variants
    style: {
      default: '',
      elevated: '',
      outlined: '',
      filled: '',
    },
    // Card size variants
    size: {
      sm: '',
      default: '',
      lg: '',
      xl: '',
    },
    // Border radius variants
    radius: {
      none: '',
      sm: '',
      default: '',
      lg: '',
      full: '',
    },
    // Shadow variants
    shadow: {
      none: '',
      sm: '',
      default: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    style: 'default',
    size: 'default',
    radius: 'default',
    shadow: 'default',
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof cardVariants>, 'style'> {
  /**
   * Card content
   */
  children?: React.ReactNode;
  /**
   * Card style variant
   */
  styling?: 'default' | 'elevated' | 'outlined' | 'filled';
  /**
   * Card interactive state
   */
  interactive?: boolean;
  /**
   * Card disabled state
   */
  disabled?: boolean;
}

// Map style to Acrobi data attributes
const getCardStyle = (style: string | null | undefined): string => {
  const styleMap: Record<string, string> = {
    default: 'default',
    elevated: 'elevated',
    outlined: 'outlined',
    filled: 'filled',
  };
  return styleMap[style || 'default'] || 'default';
};

// Map size to Acrobi data attributes
const getCardSize = (size: string | null | undefined): string => {
  const sizeMap: Record<string, string> = {
    sm: 'sm',
    default: 'md',
    lg: 'lg',
    xl: 'xl',
  };
  return sizeMap[size || 'default'] || 'md';
};

// Map radius to Acrobi data attributes
const getCardRadius = (radius: string | null | undefined): string => {
  const radiusMap: Record<string, string> = {
    none: '0',
    sm: '4',
    default: '8',
    lg: '16',
    full: 'round',
  };
  return radiusMap[radius || 'default'] || '8';
};

// Map shadow to Acrobi data attributes
const getCardShadow = (shadow: string | null | undefined): string => {
  const shadowMap: Record<string, string> = {
    none: 'n',
    sm: 'xs',
    default: 's',
    md: 'm',
    lg: 'l',
  };
  return shadowMap[shadow || 'default'] || 's';
};

/**
 * Card component using authentic Acrobi Design System styling
 *
 * This component uses data attributes that map directly to the CSS selectors
 * in the Acrobi design system, ensuring authentic styling that matches the
 * original design specifications.
 *
 * Key features:
 * - Uses data-card-style for visual variants
 * - Uses data-card-size for sizing
 * - Uses data-corner-radius for border radius
 * - Uses data-bs for box shadows
 * - Supports interactive and disabled states
 *
 * @example
 * ```tsx
 * <Card style="elevated" size="lg" radius="lg" shadow="md">
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     Card content goes here
 *   </CardContent>
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      styling = 'default',
      size = 'default',
      radius = 'default',
      shadow = 'default',
      interactive = false,
      disabled = false,
      children,
      style, // Extract style prop to prevent it from being passed to DOM
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ style: styling, size, radius, shadow }),
          className
        )}
        data-card-style={getCardStyle(styling)}
        data-card-size={getCardSize(size)}
        data-corner-radius={getCardRadius(radius)}
        data-bs={getCardShadow(shadow)}
        data-interactive={interactive ? 'true' : 'false'}
        data-disabled={disabled ? 'true' : 'false'}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('card-header', className)}
    data-card-section='header'
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('card-title', className)}
    data-fs='h4'
    data-clr='n999'
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('card-description', className)}
    data-fs='r3'
    data-clr='n700'
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('card-content', className)}
    data-card-section='content'
    {...props}
  />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('card-footer', className)}
    data-card-section='footer'
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
