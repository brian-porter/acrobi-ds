import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import {
  SecHead,
  type SecHeadProps,
  type SecHeadAction,
} from '../structures/sec-head';
import { List } from '../primitives/list';
import { ListGrid, type ListGridProps } from '../structures/list-grid';
import { EmptyState } from '../structures/empty-state';

const secListVariants = cva('w-full space-y-6', {
  variants: {
    variant: {
      default: '',
      card: 'p-6 bg-card border border-border rounded-lg',
      section: 'py-8',
      contained: 'p-4 bg-muted/50 rounded-lg',
    },
    spacing: {
      none: 'space-y-0',
      sm: 'space-y-3',
      md: 'space-y-6',
      lg: 'space-y-8',
      xl: 'space-y-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    spacing: 'md',
  },
});

export interface SecListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof secListVariants> {
  /**
   * Section title
   */
  title: string;
  /**
   * Section subtitle
   */
  subtitle?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Header actions
   */
  actions?: SecHeadAction[];
  /**
   * List items to display
   */
  items: React.ReactNode[];
  /**
   * Whether to use grid layout instead of list
   */
  useGrid?: boolean;
  /**
   * Grid configuration (only used when useGrid is true)
   */
  gridProps?: Omit<ListGridProps, 'children'>;
  /**
   * Section variant style
   * @default "default"
   */
  variant?: 'default' | 'card' | 'section' | 'contained';
  /**
   * Spacing between header and content
   * @default "md"
   */
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Empty state configuration
   */
  emptyState?: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  /**
   * Whether to show the section header
   * @default true
   */
  showHeader?: boolean;
  /**
   * Header variant
   */
  headerVariant?: SecHeadProps['variant'];
  /**
   * Header size
   */
  headerSize?: SecHeadProps['size'];
  /**
   * Maximum number of items to show initially
   */
  maxItems?: number;
  /**
   * Text for "show more" button
   */
  showMoreText?: string;
  /**
   * Text for "show less" button
   */
  showLessText?: string;
  /**
   * Whether to show loading state
   */
  loading?: boolean;
  /**
   * Loading placeholder count
   */
  loadingCount?: number;
  /**
   * Custom loading component
   */
  loadingComponent?: React.ReactNode;
}

const SecList = React.forwardRef<HTMLDivElement, SecListProps>(
  (
    {
      className,
      title,
      subtitle,
      description,
      actions = [],
      items = [],
      useGrid = false,
      gridProps,
      variant,
      spacing,
      emptyState,
      showHeader = true,
      headerVariant = 'default',
      headerSize = 'md',
      maxItems,
      showMoreText = 'Show more',
      showLessText = 'Show less',
      loading = false,
      loadingCount = 3,
      loadingComponent,
      ...props
    },
    ref
  ) => {
    const [showAll, setShowAll] = React.useState(false);

    const hasItems = items.length > 0;
    const hasMaxItems = maxItems && maxItems < items.length;
    const displayItems = React.useMemo(() => {
      if (loading) {
        return Array.from(
          { length: loadingCount },
          (_, index) =>
            loadingComponent || (
              <div key={`loading-${index}`} className='animate-pulse'>
                <div className='h-16 bg-muted rounded-md' />
              </div>
            )
        );
      }

      if (!hasMaxItems || showAll) {
        return items;
      }

      return items.slice(0, maxItems);
    }, [
      items,
      maxItems,
      showAll,
      hasMaxItems,
      loading,
      loadingCount,
      loadingComponent,
    ]);

    const showMoreButton = hasMaxItems && !showAll && !loading;
    const showLessButton = hasMaxItems && showAll && !loading;

    const headerActions = React.useMemo(() => {
      const allActions = [...actions];

      if (showMoreButton || showLessButton) {
        allActions.push({
          children: showMoreButton ? showMoreText : showLessText,
          onClick: () => setShowAll(!showAll),
          variant: 'ghost' as const,
        });
      }

      return allActions;
    }, [
      actions,
      showMoreButton,
      showLessButton,
      showMoreText,
      showLessText,
      showAll,
    ]);

    // Show empty state if no items and not loading
    if (!loading && !hasItems && emptyState) {
      return (
        <div
          ref={ref}
          className={cn(secListVariants({ variant, spacing }), className)}
          {...props}
        >
          {showHeader && (
            <SecHead
              title={title}
              subtitle={subtitle}
              description={description}
              actions={actions}
              variant={headerVariant}
              size={headerSize}
            />
          )}

          <EmptyState
            title={emptyState.title}
            description={emptyState.description}
            icon={emptyState.icon}
            actions={emptyState.action ? [emptyState.action] : undefined}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(secListVariants({ variant, spacing }), className)}
        {...props}
      >
        {showHeader && (
          <SecHead
            title={title}
            subtitle={subtitle}
            description={description}
            actions={headerActions}
            variant={headerVariant}
            size={headerSize}
          />
        )}

        <div className='w-full'>
          {useGrid ? (
            <ListGrid {...gridProps}>{displayItems}</ListGrid>
          ) : (
            <List className='space-y-2'>{displayItems}</List>
          )}
        </div>
      </div>
    );
  }
);
SecList.displayName = 'SecList';

export { SecList, secListVariants };
