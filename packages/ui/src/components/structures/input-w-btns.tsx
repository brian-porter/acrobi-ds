import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Input, type InputProps } from '../primitives/input';
import { Button, type ButtonProps } from '../primitives/button';

const inputWBtnsVariants = cva(
  'flex items-stretch overflow-hidden rounded-md border border-input',
  {
    variants: {
      variant: {
        default: 'bg-background',
        filled: 'bg-muted',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const inputInnerVariants = cva(
  'flex-1 border-none bg-transparent focus:ring-0 focus:ring-offset-0',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-sm',
        md: 'h-10 px-3 text-base',
        lg: 'h-12 px-4 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const buttonInnerVariants = cva(
  'rounded-none border-none bg-transparent hover:bg-muted/50',
  {
    variants: {
      position: {
        left: 'border-r border-border',
        right: 'border-l border-border',
        middle: 'border-x border-border',
      },
      size: {
        sm: 'h-8 px-2 text-sm',
        md: 'h-10 px-3 text-base',
        lg: 'h-12 px-4 text-lg',
      },
    },
    defaultVariants: {
      position: 'right',
      size: 'md',
    },
  }
);

export interface InputWBtnsButton {
  /**
   * Button content (text or icon)
   */
  children: React.ReactNode;
  /**
   * Button click handler
   */
  onClick?: ButtonProps['onClick'];
  /**
   * Button position relative to input
   */
  position?: 'left' | 'right' | 'middle';
  /**
   * Whether button is disabled
   */
  disabled?: boolean;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Additional button props
   */
  buttonProps?: Omit<ButtonProps, 'children' | 'onClick' | 'disabled' | 'type'>;
}

export interface InputWBtnsProps
  extends Omit<InputProps, 'size'>,
    VariantProps<typeof inputWBtnsVariants> {
  /**
   * Array of buttons to attach to the input
   */
  buttons: InputWBtnsButton[];
  /**
   * Size of the input and buttons
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Input container className
   */
  containerClassName?: string;
}

const InputWBtns = React.forwardRef<HTMLInputElement, InputWBtnsProps>(
  (
    {
      className,
      containerClassName,
      variant,
      size,
      buttons = [],
      disabled,
      ...props
    },
    ref
  ) => {
    // Separate buttons by position
    const leftButtons = buttons.filter(btn => btn.position === 'left');
    const rightButtons = buttons.filter(
      btn => btn.position === 'right' || !btn.position
    );
    const middleButtons = buttons.filter(btn => btn.position === 'middle');

    return (
      <div
        className={cn(
          inputWBtnsVariants({ variant, size }),
          disabled && 'opacity-50 cursor-not-allowed',
          containerClassName
        )}
      >
        {/* Left buttons */}
        {leftButtons.map((button, index) => (
          <Button
            key={`left-${index}`}
            type={button.type || 'button'}
            disabled={disabled || button.disabled}
            onClick={button.onClick}
            className={cn(
              buttonInnerVariants({
                position:
                  leftButtons.length === 1
                    ? 'left'
                    : index === 0
                      ? 'left'
                      : 'middle',
                size,
              })
            )}
            {...button.buttonProps}
          >
            {button.children}
          </Button>
        ))}

        {/* Input field */}
        <Input
          ref={ref}
          disabled={disabled}
          className={cn(inputInnerVariants({ size }), className)}
          {...props}
        />

        {/* Middle buttons (if any) */}
        {middleButtons.map((button, index) => (
          <Button
            key={`middle-${index}`}
            type={button.type || 'button'}
            disabled={disabled || button.disabled}
            onClick={button.onClick}
            className={cn(buttonInnerVariants({ position: 'middle', size }))}
            {...button.buttonProps}
          >
            {button.children}
          </Button>
        ))}

        {/* Right buttons */}
        {rightButtons.map((button, index) => (
          <Button
            key={`right-${index}`}
            type={button.type || 'button'}
            disabled={disabled || button.disabled}
            onClick={button.onClick}
            className={cn(
              buttonInnerVariants({
                position:
                  rightButtons.length === 1
                    ? 'right'
                    : index === rightButtons.length - 1
                      ? 'right'
                      : 'middle',
                size,
              })
            )}
            {...button.buttonProps}
          >
            {button.children}
          </Button>
        ))}
      </div>
    );
  }
);
InputWBtns.displayName = 'InputWBtns';

export { InputWBtns, inputWBtnsVariants };
