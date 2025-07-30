import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';
import { Badge } from '../primitives/badge';

const navEditorVariants = cva(
  'flex items-center justify-between p-2 border-b border-input bg-muted/30',
  {
    variants: {
      variant: {
        default: '',
        compact: 'px-1 py-1',
        full: 'px-4 py-3',
      },
      state: {
        editing: 'bg-blue-50 border-blue-200',
        formatting: 'bg-purple-50 border-purple-200',
        inserting: 'bg-green-50 border-green-200',
        viewing: 'bg-gray-50 border-gray-200',
      },
    },
    defaultVariants: {
      variant: 'default',
      state: 'editing',
    },
  }
);

export type NavEditorState = 'editing' | 'formatting' | 'inserting' | 'viewing';

export interface NavEditorAction {
  /**
   * Action identifier
   */
  id: string;
  /**
   * Action label
   */
  label: string;
  /**
   * Action icon (emoji or text)
   */
  icon?: string;
  /**
   * Action click handler
   */
  onClick?: () => void;
  /**
   * Whether action is active
   */
  active?: boolean;
  /**
   * Whether action is disabled
   */
  disabled?: boolean;
  /**
   * Badge to show on action
   */
  badge?: string | number;
  /**
   * Action group (for organization)
   */
  group?: string;
}

export interface NavEditorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navEditorVariants> {
  /**
   * Current navigation state
   */
  state: NavEditorState;
  /**
   * Callback when state changes
   */
  onStateChange?: (state: NavEditorState) => void;
  /**
   * Available actions for current state
   */
  actions?: NavEditorAction[];
  /**
   * Whether to show state indicator
   * @default true
   */
  showStateIndicator?: boolean;
  /**
   * Custom title for current state
   */
  stateTitle?: string;
  /**
   * Whether to show back button
   * @default false
   */
  showBackButton?: boolean;
  /**
   * Back button click handler
   */
  onBack?: () => void;
  /**
   * Whether to show done button
   * @default false
   */
  showDoneButton?: boolean;
  /**
   * Done button click handler
   */
  onDone?: () => void;
  /**
   * Additional toolbar content
   */
  children?: React.ReactNode;
}

// Default action sets for different states
const defaultActionSets: Record<NavEditorState, NavEditorAction[]> = {
  editing: [
    { id: 'bold', label: 'Bold', icon: 'B', group: 'format' },
    { id: 'italic', label: 'Italic', icon: 'I', group: 'format' },
    { id: 'link', label: 'Link', icon: '🔗', group: 'insert' },
    { id: 'image', label: 'Image', icon: '🖼️', group: 'insert' },
    { id: 'format', label: 'Format', icon: '🎨', group: 'tools' },
  ],
  formatting: [
    { id: 'heading1', label: 'Heading 1', icon: 'H1', group: 'headings' },
    { id: 'heading2', label: 'Heading 2', icon: 'H2', group: 'headings' },
    { id: 'paragraph', label: 'Paragraph', icon: 'P', group: 'blocks' },
    { id: 'quote', label: 'Quote', icon: '❝', group: 'blocks' },
    { id: 'list', label: 'List', icon: '•', group: 'blocks' },
    { id: 'color', label: 'Color', icon: '🎨', group: 'style' },
  ],
  inserting: [
    { id: 'image', label: 'Image', icon: '🖼️', group: 'media' },
    { id: 'video', label: 'Video', icon: '🎥', group: 'media' },
    { id: 'link', label: 'Link', icon: '🔗', group: 'content' },
    { id: 'table', label: 'Table', icon: '📊', group: 'content' },
    { id: 'code', label: 'Code', icon: '💻', group: 'content' },
    { id: 'emoji', label: 'Emoji', icon: '😀', group: 'content' },
  ],
  viewing: [
    { id: 'edit', label: 'Edit', icon: '✏️', group: 'actions' },
    { id: 'share', label: 'Share', icon: '📤', group: 'actions' },
    { id: 'export', label: 'Export', icon: '💾', group: 'actions' },
    { id: 'print', label: 'Print', icon: '🖨️', group: 'actions' },
  ],
};

// State configuration
const stateConfig = {
  editing: {
    title: 'Editing',
    icon: '✏️',
    color: 'blue',
  },
  formatting: {
    title: 'Formatting',
    icon: '🎨',
    color: 'purple',
  },
  inserting: {
    title: 'Insert',
    icon: '➕',
    color: 'green',
  },
  viewing: {
    title: 'Preview',
    icon: '👁️',
    color: 'gray',
  },
};

const NavEditor = React.forwardRef<HTMLDivElement, NavEditorProps>(
  (
    {
      className,
      state,
      onStateChange,
      actions,
      showStateIndicator = true,
      stateTitle,
      showBackButton = false,
      onBack,
      showDoneButton = false,
      onDone,
      children,
      variant,
      ...props
    },
    ref
  ) => {
    const currentActions = actions || defaultActionSets[state];
    const config = stateConfig[state];
    const displayTitle = stateTitle || config.title;

    // Group actions by their group property
    const groupedActions = React.useMemo(() => {
      const groups: Record<string, NavEditorAction[]> = {};
      currentActions.forEach(action => {
        const group = action.group || 'default';
        if (!groups[group]) {
          groups[group] = [];
        }
        groups[group].push(action);
      });
      return groups;
    }, [currentActions]);

    const handleActionClick = React.useCallback((action: NavEditorAction) => {
      if (action.disabled) return;
      action.onClick?.();
    }, []);

    const renderAction = React.useCallback(
      (action: NavEditorAction) => {
        return (
          <Button
            key={action.id}
            type='button'
            variant={action.active ? 'default' : 'ghost'}
            size='sm'
            onClick={() => handleActionClick(action)}
            disabled={action.disabled}
            className={cn(
              'relative h-8 min-w-8',
              action.icon && !action.label && 'w-8 p-0',
              action.label && 'px-3'
            )}
            title={action.label}
          >
            {action.icon && (
              <span className={cn(action.label && 'mr-1', 'text-sm')}>
                {action.icon}
              </span>
            )}
            {action.label && (
              <span className='text-xs font-medium'>{action.label}</span>
            )}
            {action.badge && (
              <Badge
                variant='secondary'
                className='absolute -top-1 -right-1 text-xs min-w-4 h-4 p-0 flex items-center justify-center'
              >
                {action.badge}
              </Badge>
            )}
          </Button>
        );
      },
      [handleActionClick]
    );

    const renderActionGroup = React.useCallback(
      (groupName: string, groupActions: NavEditorAction[]) => {
        return (
          <div key={groupName} className='flex items-center gap-1'>
            {groupActions.map(renderAction)}
          </div>
        );
      },
      [renderAction]
    );

    return (
      <div
        ref={ref}
        className={cn(navEditorVariants({ variant, state }), className)}
        {...props}
      >
        {/* Left section */}
        <div className='flex items-center gap-2'>
          {/* Back button */}
          {showBackButton && (
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={onBack}
              className='w-8 h-8 p-0'
            >
              ←
            </Button>
          )}

          {/* State indicator */}
          {showStateIndicator && (
            <div className='flex items-center gap-2'>
              <span className='text-lg'>{config.icon}</span>
              <span className='text-sm font-medium'>{displayTitle}</span>
            </div>
          )}

          {/* State navigation buttons */}
          <div className='flex items-center gap-1 ml-2'>
            {Object.entries(stateConfig).map(([stateName, stateConf]) => (
              <Button
                key={stateName}
                type='button'
                variant={state === stateName ? 'default' : 'ghost'}
                size='sm'
                onClick={() => onStateChange?.(stateName as NavEditorState)}
                className='w-8 h-8 p-0'
                title={stateConf.title}
              >
                {stateConf.icon}
              </Button>
            ))}
          </div>
        </div>

        {/* Center section - Actions */}
        <div className='flex items-center gap-3 flex-1 justify-center'>
          {Object.entries(groupedActions).map(([groupName, groupActions]) => (
            <React.Fragment key={groupName}>
              {renderActionGroup(groupName, groupActions)}
              {Object.keys(groupedActions).indexOf(groupName) <
                Object.keys(groupedActions).length - 1 && (
                <div className='w-px h-6 bg-border' />
              )}
            </React.Fragment>
          ))}

          {/* Custom children */}
          {children}
        </div>

        {/* Right section */}
        <div className='flex items-center gap-2'>
          {/* Done button */}
          {showDoneButton && (
            <Button
              type='button'
              variant='default'
              size='sm'
              onClick={onDone}
              className='px-3'
            >
              Done
            </Button>
          )}
        </div>
      </div>
    );
  }
);

NavEditor.displayName = 'NavEditor';

export { NavEditor, navEditorVariants, defaultActionSets, stateConfig };
