import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';

const btnPanelVariants = cva('flex gap-3', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    variant: {
      default: '',
      full: 'w-full',
      centered: 'justify-center',
    },
    spacing: {
      tight: 'gap-2',
      default: 'gap-3',
      loose: 'gap-4',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'default',
    spacing: 'default',
  },
});

export interface BtnPanelButton {
  label: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
}

export interface BtnPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof btnPanelVariants> {
  /**
   * Array of button configurations
   */
  buttons: BtnPanelButton[];
  /**
   * Button size override for all buttons
   */
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
}

const BtnPanel = React.forwardRef<HTMLDivElement, BtnPanelProps>(
  (
    { className, orientation, variant, spacing, buttons, buttonSize, ...props },
    ref
  ) => {
    const isVertical = orientation === 'vertical';
    const isFull = variant === 'full';

    return (
      <div
        ref={ref}
        className={cn(
          btnPanelVariants({ orientation, variant, spacing }),
          className
        )}
        {...props}
      >
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant={button.variant || 'default'}
            size={buttonSize || button.size || 'default'}
            disabled={button.disabled || button.loading}
            onClick={button.onClick}
            className={cn(
              isVertical && isFull && 'w-full',
              !isVertical && isFull && 'flex-1'
            )}
          >
            {button.loading && (
              <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2' />
            )}
            {button.icon && !button.loading && (
              <span className='mr-2'>{button.icon}</span>
            )}
            {button.label}
          </Button>
        ))}
      </div>
    );
  }
);

BtnPanel.displayName = 'BtnPanel';

export { BtnPanel, btnPanelVariants, type BtnPanelButton };
