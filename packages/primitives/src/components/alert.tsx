import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Icon } from './icon';

/**
 * Alert variant styles using Acrobi Design System data attributes
 * This approach matches the authentic Acrobi component pattern
 * where styling is controlled via data attributes that map to CSS selectors
 */
const alertVariants = cva('alert w-full bg-background text-foreground', {
  variants: {
    // Alert style variants
    style: {
      default: '',
      filled: '',
      outlined: '',
      minimal: '',
    },
    // Alert type variants (semantic colors)
    type: {
      info: '',
      success: '',
      warning: '',
      danger: '',
    },
    // Alert size variants
    size: {
      sm: '',
      default: '',
      lg: '',
    },
  },
  defaultVariants: {
    style: 'default',
    type: 'info',
    size: 'default',
  },
});

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof alertVariants>, 'style'> {
  /**
   * Alert content
   */
  children?: React.ReactNode;
  /**
   * Icon name from BQ-Icons font
   */
  icon?: string;
  /**
   * Show close button
   */
  dismissible?: boolean;
  /**
   * Close button callback
   */
  onClose?: () => void;
  /**
   * Alert style variant
   */
  styling?: 'default' | 'filled' | 'outlined' | 'minimal';
  /**
   * @deprecated Use styling and type props instead
   */
  variant?: 'default' | 'destructive' | 'warning' | 'success' | 'info';
}

// Map style to Acrobi data attributes
const getAlertStyle = (style: string | null | undefined): string => {
  const styleMap: Record<string, string> = {
    default: 'default',
    filled: 'filled',
    outlined: 'outlined',
    minimal: 'minimal',
  };
  return styleMap[style || 'default'] || 'default';
};

// Map type to Acrobi data attributes
const getAlertType = (type: string | null | undefined): string => {
  const typeMap: Record<string, string> = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
  };
  return typeMap[type || 'info'] || 'info';
};

// Map size to Acrobi data attributes
const getAlertSize = (size: string | null | undefined): string => {
  const sizeMap: Record<string, string> = {
    sm: 'sm',
    default: 'md',
    lg: 'lg',
  };
  return sizeMap[size || 'default'] || 'md';
};

/**
 * Alert component using authentic Acrobi Design System styling
 *
 * This component uses data attributes that map directly to the CSS selectors
 * in the Acrobi design system, ensuring authentic styling that matches the
 * original design specifications.
 *
 * Key features:
 * - Uses data-alert-style for visual variants
 * - Uses data-alert-type for semantic colors
 * - Uses data-alert-size for sizing
 * - Supports BQ-Icons font system
 * - Dismissible functionality
 *
 * @example
 * ```tsx
 * <Alert styling="filled" type="success" icon="check" dismissible>
 *   <AlertTitle>Success!</AlertTitle>
 *   <AlertDescription>Your changes have been saved.</AlertDescription>
 * </Alert>
 * ```
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      styling = 'default',
      type = 'info',
      size = 'default',
      style, // Extract style prop to prevent it from being passed to DOM
      icon,
      dismissible = false,
      onClose,
      variant, // deprecated
      children,
      ...props
    },
    ref
  ) => {
    // Handle backward compatibility
    const currentType = variant
      ? variant === 'destructive'
        ? 'danger'
        : variant === 'default'
          ? 'info'
          : variant
      : type;

    return (
      <div
        ref={ref}
        role='alert'
        className={cn(
          alertVariants({ style: styling, type: currentType, size }),
          className
        )}
        data-alert-style={getAlertStyle(styling)}
        data-alert-type={getAlertType(currentType)}
        data-alert-size={getAlertSize(size)}
        data-dismissible={dismissible ? 'true' : 'false'}
        style={style}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <div className='alert-icon'>
            <Icon name={icon} size='sm' color='inherit' />
          </div>
        )}

        {/* Content */}
        <div className='alert-content'>{children}</div>

        {/* Close button */}
        {dismissible && (
          <button
            className='alert-close'
            onClick={onClose}
            aria-label='Close alert'
          >
            <Icon name='close' size='xs' color='inherit' />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('alert-title', className)}
    data-fs='r2b'
    data-clr='inherit'
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('alert-description', className)}
    data-fs='r3'
    data-clr='inherit'
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription, alertVariants };
