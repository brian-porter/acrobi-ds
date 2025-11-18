import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Icon } from './icon';

/**
 * Snackbar variant styles using Acrobi Design System data attributes
 * This approach matches the authentic Acrobi component pattern
 * where styling is controlled via data attributes that map to CSS selectors
 */
const snackbarVariants = cva(
  'snackbar fixed z-50 pointer-events-auto max-w-sm bg-background text-foreground rounded-lg shadow-lg border transition-all duration-300 ease-in-out',
  {
    variants: {
      // Snackbar type variants (semantic colors)
      type: {
        info: '',
        success: '',
        warning: '',
        error: '',
      },
      // Snackbar position variants
      position: {
        'top-left': 'top-4 left-4',
        'top-center': 'top-4 left-1/2 -translate-x-1/2',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
        'bottom-right': 'bottom-4 right-4',
      },
      // Snackbar size variants
      size: {
        sm: '',
        default: '',
        lg: '',
      },
      // Animation state
      state: {
        entering: 'animate-in slide-in-from-bottom-2 fade-in-0',
        entered: '',
        exiting: 'animate-out slide-out-to-bottom-2 fade-out-0',
        exited: 'opacity-0 pointer-events-none',
      },
    },
    defaultVariants: {
      type: 'info',
      position: 'bottom-right',
      size: 'default',
      state: 'entered',
    },
  }
);

export interface SnackbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof snackbarVariants>, 'state'> {
  /**
   * Snackbar content
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
   * Action button configuration
   */
  action?: {
    label: string;
    onClick: () => void;
  };
  /**
   * Auto-dismiss timeout in milliseconds (0 disables auto-dismiss)
   */
  autoHideDuration?: number;
  /**
   * Whether the snackbar is visible
   */
  open?: boolean;
  /**
   * Callback when snackbar requests to be closed
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Z-index for stacking multiple snackbars
   */
  zIndex?: number;
}

// Map type to Acrobi data attributes
const getSnackbarType = (type: string | null | undefined): string => {
  const typeMap: Record<string, string> = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
  };
  return typeMap[type || 'info'] || 'info';
};

// Map size to Acrobi data attributes
const getSnackbarSize = (size: string | null | undefined): string => {
  const sizeMap: Record<string, string> = {
    sm: 'sm',
    default: 'md',
    lg: 'lg',
  };
  return sizeMap[size || 'default'] || 'md';
};

// Map position to data attributes
const getSnackbarPosition = (position: string | null | undefined): string => {
  const positionMap: Record<string, string> = {
    'top-left': 'tl',
    'top-center': 'tc',
    'top-right': 'tr',
    'bottom-left': 'bl',
    'bottom-center': 'bc',
    'bottom-right': 'br',
  };
  return positionMap[position || 'bottom-right'] || 'br';
};

// Get default icon for type
const getDefaultIcon = (type: string): string => {
  const iconMap: Record<string, string> = {
    info: 'info',
    success: 'check',
    warning: 'warning',
    error: 'error',
  };
  return iconMap[type] || 'info';
};

/**
 * Snackbar component using authentic Acrobi Design System styling
 *
 * This component provides non-intrusive user feedback with support for:
 * - Multiple semantic types (info, success, warning, error)
 * - Flexible positioning (6 position options)
 * - Auto-dismiss functionality with configurable timeout
 * - Action button support (undo, retry, etc.)
 * - Dismissible close button
 * - Stacking support for multiple snackbars
 * - Full accessibility support with ARIA attributes
 *
 * Key features:
 * - Uses data-snackbar-type for semantic colors
 * - Uses data-snackbar-size for sizing
 * - Uses data-snackbar-position for positioning
 * - Supports BQ-Icons font system
 * - Auto-dismiss with customizable duration
 * - Action button integration
 * - Smooth enter/exit animations
 * - Screen reader announcements
 *
 * @example
 * ```tsx
 * <Snackbar 
 *   type="success" 
 *   open={true}
 *   onOpenChange={setOpen}
 *   autoHideDuration={5000}
 *   action={{ label: "Undo", onClick: handleUndo }}
 *   dismissible
 * >
 *   <SnackbarMessage>Changes saved successfully!</SnackbarMessage>
 * </Snackbar>
 * ```
 */
const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      className,
      type = 'info',
      position = 'bottom-right',
      size = 'default',
      style, // Extract style prop to prevent it from being passed to DOM
      icon,
      dismissible = true,
      onClose,
      action,
      autoHideDuration = 0,
      open = false,
      onOpenChange,
      zIndex = 50,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(open);
    const [animationState, setAnimationState] = React.useState<
      'entering' | 'entered' | 'exiting' | 'exited'
    >('exited');
    const timeoutRef = React.useRef<NodeJS.Timeout>();
    const snackbarRef = React.useRef<HTMLDivElement>(null);

    // Handle visibility changes
    React.useEffect(() => {
      if (open && !isVisible) {
        setIsVisible(true);
        setAnimationState('entering');
        
        // Transition to entered state after animation
        const enterTimeout = setTimeout(() => {
          setAnimationState('entered');
        }, 150);

        return () => clearTimeout(enterTimeout);
      } else if (!open && isVisible) {
        setAnimationState('exiting');
        
        // Hide after exit animation
        const exitTimeout = setTimeout(() => {
          setIsVisible(false);
          setAnimationState('exited');
        }, 150);

        return () => clearTimeout(exitTimeout);
      }
    }, [open, isVisible]);

    // Handle auto-dismiss
    React.useEffect(() => {
      if (isVisible && animationState === 'entered' && autoHideDuration > 0) {
        timeoutRef.current = setTimeout(() => {
          handleClose();
        }, autoHideDuration);

        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };
      }
    }, [isVisible, animationState, autoHideDuration]);

    // Clear timeout on unmount
    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const handleClose = React.useCallback(() => {
      onClose?.();
      onOpenChange?.(false);
    }, [onClose, onOpenChange]);

    const handleAction = React.useCallback(() => {
      action?.onClick();
      // Don't auto-close on action - let the action handler decide
    }, [action]);

    // Don't render if not visible
    if (!isVisible) {
      return null;
    }

    const iconToShow = icon || getDefaultIcon(type);

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          snackbarVariants({ type, position, size, state: animationState }),
          className
        )}
        style={{ 
          ...style, 
          zIndex: zIndex + 50, // Base z-index plus stacking offset
        }}
        data-snackbar-type={getSnackbarType(type)}
        data-snackbar-size={getSnackbarSize(size)}
        data-snackbar-position={getSnackbarPosition(position)}
        data-snackbar-dismissible={dismissible ? 'true' : 'false'}
        data-snackbar-has-action={action ? 'true' : 'false'}
        {...props}
      >
        <div className="snackbar-content flex items-start gap-3 p-4">
          {/* Icon */}
          {iconToShow && (
            <div className="snackbar-icon flex-shrink-0 mt-0.5">
              <Icon name={iconToShow} size="sm" color="inherit" />
            </div>
          )}

          {/* Message content */}
          <div className="snackbar-message flex-1 min-w-0">
            {children}
          </div>

          {/* Action and close buttons */}
          <div className="snackbar-actions flex items-center gap-2 flex-shrink-0">
            {/* Action button */}
            {action && (
              <button
                className="snackbar-action text-sm font-medium underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current"
                onClick={handleAction}
                type="button"
              >
                {action.label}
              </button>
            )}

            {/* Close button */}
            {dismissible && (
              <button
                className="snackbar-close p-1 rounded hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current"
                onClick={handleClose}
                aria-label="Close notification"
                type="button"
              >
                <Icon name="close" size="xs" color="inherit" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);
Snackbar.displayName = 'Snackbar';

const SnackbarMessage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('snackbar-message-content', className)}
    data-fs="r2"
    data-clr="inherit"
    {...props}
  />
));
SnackbarMessage.displayName = 'SnackbarMessage';

const SnackbarTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h6
    ref={ref}
    className={cn('snackbar-title', className)}
    data-fs="r2b"
    data-clr="inherit"
    {...props}
  />
));
SnackbarTitle.displayName = 'SnackbarTitle';

const SnackbarDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('snackbar-description', className)}
    data-fs="r3"
    data-clr="inherit"
    {...props}
  />
));
SnackbarDescription.displayName = 'SnackbarDescription';

export { 
  Snackbar, 
  SnackbarMessage, 
  SnackbarTitle, 
  SnackbarDescription, 
  snackbarVariants 
};