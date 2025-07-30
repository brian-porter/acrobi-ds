import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Headline, type HeadlineProps } from '../primitives/headline';
import { Paragraph } from '../primitives/paragraph';
import { Button, type ButtonProps } from '../primitives/button';

const secHeadVariants = cva('flex flex-col space-y-2', {
  variants: {
    variant: {
      default: '',
      hero: 'text-center space-y-4',
      section: 'border-b border-border pb-4 space-y-3',
      card: 'p-4 bg-card border border-border rounded-lg space-y-3',
    },
    size: {
      sm: 'space-y-1',
      md: 'space-y-2',
      lg: 'space-y-3',
      xl: 'space-y-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const actionsVariants = cva('flex items-center', {
  variants: {
    position: {
      bottom: 'mt-4',
      top: 'order-first mb-2',
      inline: 'flex-row-reverse justify-between items-start',
    },
    alignment: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    },
    spacing: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    },
  },
  defaultVariants: {
    position: 'bottom',
    alignment: 'start',
    spacing: 'sm',
  },
});

export interface SecHeadAction {
  /**
   * Action content (text or icon)
   */
  children: React.ReactNode;
  /**
   * Action click handler
   */
  onClick?: ButtonProps['onClick'];
  /**
   * Button variant
   */
  variant?: ButtonProps['variant'];
  /**
   * Button size
   */
  size?: ButtonProps['size'];
  /**
   * Whether action is disabled
   */
  disabled?: boolean;
  /**
   * Additional button props
   */
  buttonProps?: Omit<
    ButtonProps,
    'children' | 'onClick' | 'variant' | 'size' | 'disabled'
  >;
}

export interface SecHeadProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof secHeadVariants> {
  /**
   * Main heading text
   */
  title: string;
  /**
   * Optional title icon
   */
  titleIcon?: string;
  /**
   * Optional subtitle or description
   */
  subtitle?: string;
  /**
   * Additional description content
   */
  description?: string;
  /**
   * Heading level (1-6)
   * @default 2
   */
  level?: HeadlineProps['level'];
  /**
   * Section variant style
   * @default "default"
   */
  variant?: 'default' | 'hero' | 'section' | 'card';
  /**
   * Size variant
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Action buttons
   */
  actions?: SecHeadAction[];
  /**
   * Action buttons position
   * @default "bottom"
   */
  actionsPosition?: 'bottom' | 'top' | 'inline';
  /**
   * Action buttons alignment
   * @default "start"
   */
  actionsAlignment?: 'start' | 'center' | 'end';
  /**
   * Spacing between action buttons
   * @default "sm"
   */
  actionsSpacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  /**
   * Custom content to render after the title/description
   */
  children?: React.ReactNode;
}

const SecHead = React.forwardRef<HTMLDivElement, SecHeadProps>(
  (
    {
      className,
      title,
      titleIcon,
      subtitle,
      description,
      level = 2,
      variant,
      size,
      actions = [],
      actionsPosition = 'bottom',
      actionsAlignment = 'start',
      actionsSpacing = 'sm',
      children,
      ...props
    },
    ref
  ) => {
    const hasActions = actions.length > 0;
    const isInlineActions = actionsPosition === 'inline';

    return (
      <div
        ref={ref}
        className={cn(
          secHeadVariants({ variant, size }),
          isInlineActions && 'flex-row items-start justify-between',
          className
        )}
        {...props}
      >
        {hasActions && actionsPosition === 'top' && (
          <div
            className={cn(
              actionsVariants({
                position: 'top',
                alignment: actionsAlignment,
                spacing: actionsSpacing,
              })
            )}
          >
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'outline'}
                size={action.size || 'sm'}
                disabled={action.disabled}
                onClick={action.onClick}
                {...action.buttonProps}
              >
                {action.children}
              </Button>
            ))}
          </div>
        )}

        <div
          className={cn(
            'flex flex-col',
            isInlineActions ? 'flex-1 pr-4' : '',
            variant === 'hero' ? 'text-center' : '',
            size === 'sm'
              ? 'space-y-1'
              : size === 'lg'
                ? 'space-y-3'
                : size === 'xl'
                  ? 'space-y-4'
                  : 'space-y-2'
          )}
        >
          <div className='flex items-center gap-2'>
            {titleIcon && (
              <span className='text-2xl' aria-hidden='true'>
                {titleIcon}
              </span>
            )}
            <Headline
              level={level}
              className={cn(
                'font-semibold leading-tight',
                variant === 'hero' && 'text-4xl lg:text-5xl',
                variant === 'section' && 'text-2xl',
                size === 'sm' && 'text-lg',
                size === 'lg' && 'text-3xl',
                size === 'xl' && 'text-4xl'
              )}
            >
              {title}
            </Headline>
          </div>

          {subtitle && (
            <Paragraph
              className={cn(
                'text-muted-foreground font-medium',
                size === 'sm' && 'text-sm',
                size === 'lg' && 'text-lg',
                size === 'xl' && 'text-xl'
              )}
            >
              {subtitle}
            </Paragraph>
          )}

          {description && (
            <Paragraph
              className={cn(
                'text-muted-foreground',
                size === 'sm' && 'text-sm',
                size === 'lg' && 'text-base',
                size === 'xl' && 'text-lg'
              )}
            >
              {description}
            </Paragraph>
          )}

          {children}
        </div>

        {hasActions && actionsPosition === 'inline' && (
          <div
            className={cn(
              actionsVariants({
                position: 'inline',
                alignment: actionsAlignment,
                spacing: actionsSpacing,
              })
            )}
          >
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'outline'}
                size={action.size || 'sm'}
                disabled={action.disabled}
                onClick={action.onClick}
                {...action.buttonProps}
              >
                {action.children}
              </Button>
            ))}
          </div>
        )}

        {hasActions && actionsPosition === 'bottom' && (
          <div
            className={cn(
              actionsVariants({
                position: 'bottom',
                alignment: actionsAlignment,
                spacing: actionsSpacing,
              })
            )}
          >
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'outline'}
                size={action.size || 'sm'}
                disabled={action.disabled}
                onClick={action.onClick}
                {...action.buttonProps}
              >
                {action.children}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
SecHead.displayName = 'SecHead';

export { SecHead, secHeadVariants };
