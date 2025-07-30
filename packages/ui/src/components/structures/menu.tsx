import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { MenuItem, type MenuItemProps } from '../primitives/menu-item';

const menuVariants = cva(
  'flex flex-col min-w-[200px] max-w-[320px] bg-background border border-input rounded-md shadow-md overflow-hidden',
  {
    variants: {
      size: {
        sm: 'min-w-[160px] max-w-[240px]',
        default: 'min-w-[200px] max-w-[320px]',
        lg: 'min-w-[240px] max-w-[400px]',
      },
      variant: {
        default: 'bg-background border-input',
        elevated: 'bg-background border-input shadow-lg',
        popover: 'bg-popover border-border shadow-md',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

const menuHeaderVariants = cva('px-3 py-2 border-b border-input bg-muted/30', {
  variants: {
    size: {
      sm: 'px-2 py-1',
      default: 'px-3 py-2',
      lg: 'px-4 py-3',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const menuSectionVariants = cva('py-1', {
  variants: {
    bordered: {
      true: 'border-b border-input last:border-b-0',
      false: '',
    },
  },
  defaultVariants: {
    bordered: false,
  },
});

export interface MenuAction extends Omit<MenuItemProps, 'label'> {
  /**
   * Unique identifier for the action
   */
  id: string;
  /**
   * Action label
   */
  label: string;
  /**
   * Action group for organization
   */
  group?: string;
  /**
   * Whether action is visible
   * @default true
   */
  visible?: boolean;
}

export interface MenuSection {
  /**
   * Section identifier
   */
  id: string;
  /**
   * Optional section title
   */
  title?: string;
  /**
   * Section actions
   */
  actions: MenuAction[];
  /**
   * Whether section should have a border
   * @default false
   */
  bordered?: boolean;
}

export interface MenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof menuVariants> {
  /**
   * Menu title
   */
  title?: string;
  /**
   * Menu subtitle or description
   */
  subtitle?: string;
  /**
   * Menu sections
   */
  sections?: MenuSection[];
  /**
   * Flat list of actions (alternative to sections)
   */
  actions?: MenuAction[];
  /**
   * Whether to show section borders
   * @default true
   */
  showSectionBorders?: boolean;
  /**
   * Maximum height before scrolling
   */
  maxHeight?: string;
  /**
   * Callback when action is selected
   */
  onActionSelect?: (actionId: string, action: MenuAction) => void;
  /**
   * Custom header content
   */
  headerContent?: React.ReactNode;
  /**
   * Custom footer content
   */
  footerContent?: React.ReactNode;
}

const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      className,
      size,
      variant,
      title,
      subtitle,
      sections,
      actions,
      showSectionBorders = true,
      maxHeight = '400px',
      onActionSelect,
      headerContent,
      footerContent,
      children,
      ...props
    },
    ref
  ) => {
    // Convert flat actions to sections if provided
    const menuSections = React.useMemo(() => {
      if (sections) return sections;
      if (actions) {
        return [
          {
            id: 'default',
            actions: actions.filter(action => action.visible !== false),
          },
        ];
      }
      return [];
    }, [sections, actions]);

    const handleActionSelect = React.useCallback(
      (actionId: string, action: MenuAction) => {
        onActionSelect?.(actionId, action);
      },
      [onActionSelect]
    );

    const renderSection = React.useCallback(
      (section: MenuSection, index: number) => {
        const visibleActions = section.actions.filter(
          action => action.visible !== false
        );

        if (visibleActions.length === 0) return null;

        return (
          <div
            key={section.id}
            className={cn(
              menuSectionVariants({
                bordered: showSectionBorders && section.bordered !== false,
              })
            )}
          >
            {/* Section title */}
            {section.title && (
              <div className='px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                {section.title}
              </div>
            )}

            {/* Section actions */}
            {visibleActions.map(action => {
              const { id, label, group, visible, ...itemProps } = action;
              return (
                <MenuItem
                  key={id}
                  label={label}
                  {...itemProps}
                  onSelect={() => handleActionSelect(id, action)}
                />
              );
            })}
          </div>
        );
      },
      [size, showSectionBorders, handleActionSelect]
    );

    return (
      <div
        ref={ref}
        className={cn(menuVariants({ size, variant }), className)}
        role='menu'
        {...props}
      >
        {/* Header */}
        {(title || subtitle || headerContent) && (
          <div className={cn(menuHeaderVariants({ size }))}>
            {headerContent || (
              <div>
                {title && (
                  <div
                    className={cn(
                      'font-semibold',
                      size === 'sm'
                        ? 'text-sm'
                        : size === 'lg'
                          ? 'text-base'
                          : 'text-sm'
                    )}
                  >
                    {title}
                  </div>
                )}
                {subtitle && (
                  <div
                    className={cn(
                      'text-muted-foreground mt-0.5',
                      size === 'sm' ? 'text-xs' : 'text-xs'
                    )}
                  >
                    {subtitle}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Menu content */}
        <div className='flex-1 overflow-y-auto' style={{ maxHeight }}>
          {children || menuSections.map(renderSection)}
        </div>

        {/* Footer */}
        {footerContent && (
          <div
            className={cn(menuHeaderVariants({ size }), 'border-t border-b-0')}
          >
            {footerContent}
          </div>
        )}
      </div>
    );
  }
);

Menu.displayName = 'Menu';

export { Menu, menuVariants, menuHeaderVariants, menuSectionVariants };
export type { MenuAction, MenuSection };
