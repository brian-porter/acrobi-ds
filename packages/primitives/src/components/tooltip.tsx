import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const tooltipVariants = cva('relative inline-block', {
  variants: {},
  defaultVariants: {},
});

const tooltipContentVariants = cva(
  'absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-lg opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap dark:bg-gray-700',
  {
    variants: {
      placement: {
        top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-1',
        bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-1',
        left: 'right-full top-1/2 transform -translate-y-1/2 mr-1',
        right: 'left-full top-1/2 transform -translate-y-1/2 ml-1',
      },
    },
    defaultVariants: {
      placement: 'top',
    },
  }
);

const tooltipArrowVariants = cva(
  'absolute w-2 h-2 bg-gray-900 transform rotate-45 dark:bg-gray-700',
  {
    variants: {
      placement: {
        top: 'top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        bottom:
          'bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2',
        left: 'left-full top-1/2 transform -translate-y-1/2 -translate-x-1/2',
        right: 'right-full top-1/2 transform -translate-y-1/2 translate-x-1/2',
      },
    },
    defaultVariants: {
      placement: 'top',
    },
  }
);

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof tooltipVariants> {
  /**
   * The content to show in the tooltip
   */
  content: React.ReactNode;
  /**
   * Tooltip placement relative to trigger
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * The trigger element
   */
  children: React.ReactNode;
  /**
   * Whether to show arrow
   */
  showArrow?: boolean;
  /**
   * Delay before showing tooltip (ms)
   */
  delay?: number;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      content,
      placement = 'top',
      children,
      showArrow = true,
      delay = 200,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout>();

    const showTooltip = () => {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    const hideTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <div
        className={cn(tooltipVariants({ className }))}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        ref={ref}
        {...props}
      >
        {children}
        <div
          className={cn(
            tooltipContentVariants({ placement }),
            isVisible && 'opacity-100 pointer-events-auto'
          )}
          role='tooltip'
        >
          {content}
          {showArrow && (
            <div className={cn(tooltipArrowVariants({ placement }))} />
          )}
        </div>
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export { Tooltip, tooltipVariants };
