import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Avatar } from '../../primitives/avatar';
import { Badge } from '../../primitives/badge';
import { Button, type ButtonProps } from '../../primitives/button';
import { Tooltip } from '../../primitives/tooltip';

const assetHeaderVariants = cva(
  'w-full bg-card border border-border rounded-lg overflow-hidden',
  {
    variants: {
      variant: {
        default: '',
        minimal: 'border-0 bg-transparent',
        outlined: 'border-2',
        elevated: 'shadow-lg border-0',
      },
      size: {
        sm: '',
        default: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const assetHeaderContentVariants = cva('relative', {
  variants: {
    size: {
      sm: 'p-4',
      default: 'p-6',
      lg: 'p-8',
    },
    layout: {
      stacked: 'space-y-4',
      split: 'flex items-start justify-between gap-6',
      centered: 'flex flex-col items-center text-center space-y-4',
    },
  },
  defaultVariants: {
    size: 'default',
    layout: 'stacked',
  },
});

export interface AssetHeaderAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  disabled?: boolean;
  tooltip?: string;
  primary?: boolean;
}

export interface AssetHeaderBreadcrumb {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface AssetHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof assetHeaderVariants> {
  /**
   * Asset title
   */
  title: string;
  /**
   * Asset subtitle
   */
  subtitle?: string;
  /**
   * Asset description
   */
  description?: string;
  /**
   * Cover/hero image URL
   */
  coverImage?: string;
  /**
   * Asset avatar/icon
   */
  avatar?: string;
  /**
   * Avatar fallback text
   */
  avatarFallback?: string;
  /**
   * Status badge
   */
  status?: string;
  /**
   * Status badge variant
   */
  statusVariant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'success'
    | 'warning';
  /**
   * Asset category/type
   */
  category?: string;
  /**
   * Asset metadata
   */
  metadata?: Array<{
    label: string;
    value: string | React.ReactNode;
    icon?: React.ReactNode;
    tooltip?: string;
  }>;
  /**
   * Tags or labels
   */
  tags?: string[];
  /**
   * Breadcrumb navigation
   */
  breadcrumbs?: AssetHeaderBreadcrumb[];
  /**
   * Action buttons
   */
  actions?: AssetHeaderAction[];
  /**
   * Header variant
   * @default "default"
   */
  variant?: 'default' | 'minimal' | 'outlined' | 'elevated';
  /**
   * Header size
   * @default "default"
   */
  size?: 'sm' | 'default' | 'lg';
  /**
   * Content layout
   * @default "stacked"
   */
  layout?: 'stacked' | 'split' | 'centered';
  /**
   * Whether to show avatar
   * @default true
   */
  showAvatar?: boolean;
  /**
   * Whether to show status
   * @default true
   */
  showStatus?: boolean;
  /**
   * Whether to show actions
   * @default true
   */
  showActions?: boolean;
  /**
   * Avatar size
   */
  avatarSize?: 'sm' | 'default' | 'lg' | 'xl';
  /**
   * Cover image height
   */
  coverHeight?: 'sm' | 'default' | 'lg' | 'xl';
  /**
   * Custom content overlay on cover image
   */
  coverOverlay?: React.ReactNode;
  /**
   * Whether cover image should be blurred for text overlay
   */
  blurCover?: boolean;
  /**
   * Maximum number of tags to show
   */
  maxTags?: number;
  /**
   * Custom content instead of default layout
   */
  children?: React.ReactNode;
  /**
   * Additional classes for different sections
   */
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  actionsClassName?: string;
}

const AssetHeader = React.forwardRef<HTMLDivElement, AssetHeaderProps>(
  (
    {
      className,
      title,
      subtitle,
      description,
      coverImage,
      avatar,
      avatarFallback,
      status,
      statusVariant = 'default',
      category,
      metadata = [],
      tags = [],
      breadcrumbs = [],
      actions = [],
      variant,
      size,
      layout,
      showAvatar = true,
      showStatus = true,
      showActions = true,
      avatarSize,
      coverHeight = 'default',
      coverOverlay,
      blurCover = false,
      maxTags = 5,
      children,
      titleClassName,
      subtitleClassName,
      descriptionClassName,
      actionsClassName,
      ...props
    },
    ref
  ) => {
    const [showAllTags, setShowAllTags] = React.useState(false);

    const displayTags = React.useMemo(() => {
      if (showAllTags || tags.length <= maxTags) {
        return tags;
      }
      return tags.slice(0, maxTags);
    }, [tags, maxTags, showAllTags]);

    const remainingTagsCount = tags.length - maxTags;
    const hasMoreTags = remainingTagsCount > 0 && !showAllTags;

    const getCoverHeightClass = () => {
      switch (coverHeight) {
        case 'sm':
          return 'h-32';
        case 'default':
          return 'h-48';
        case 'lg':
          return 'h-64';
        case 'xl':
          return 'h-80';
        default:
          return 'h-48';
      }
    };

    const getAvatarSize = () => {
      if (avatarSize) return avatarSize;
      return size === 'sm' ? 'default' : size === 'lg' ? 'xl' : 'lg';
    };

    const primaryActions = actions.filter(action => action.primary);
    const secondaryActions = actions.filter(action => !action.primary);

    if (children) {
      return (
        <div
          ref={ref}
          className={cn(assetHeaderVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(assetHeaderVariants({ variant, size }), className)}
        {...props}
      >
        {/* Cover Image */}
        {coverImage && (
          <div
            className={cn('relative overflow-hidden', getCoverHeightClass())}
          >
            <img
              src={coverImage}
              alt={title}
              className={cn(
                'w-full h-full object-cover',
                blurCover && 'filter blur-sm'
              )}
            />
            {blurCover && <div className='absolute inset-0 bg-black/20' />}
            {coverOverlay && (
              <div className='absolute inset-0 flex items-end p-6'>
                {coverOverlay}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn(assetHeaderContentVariants({ size, layout }))}>
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className='flex items-center space-x-1 text-sm text-muted-foreground'>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {crumb.href || crumb.onClick ? (
                    <button
                      onClick={crumb.onClick}
                      className='hover:text-foreground transition-colors'
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <svg
                      className='w-3 h-3'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          {/* Main Content Area */}
          <div className={cn(layout === 'split' ? 'flex-1' : 'w-full')}>
            {/* Title Section */}
            <div
              className={cn(
                'space-y-2',
                layout === 'centered' && 'text-center'
              )}
            >
              {/* Category */}
              {category && (
                <div className='text-sm text-muted-foreground uppercase tracking-wide'>
                  {category}
                </div>
              )}

              {/* Title and Avatar */}
              <div
                className={cn(
                  'flex items-start gap-4',
                  layout === 'centered' && 'flex-col items-center gap-2'
                )}
              >
                {/* Avatar */}
                {showAvatar && avatar && (
                  <Avatar
                    src={avatar}
                    alt={title}
                    fallback={avatarFallback}
                    size={getAvatarSize()}
                    className='shrink-0'
                  />
                )}

                {/* Title and Status */}
                <div
                  className={cn(
                    'flex-1 min-w-0',
                    layout === 'centered' && 'text-center'
                  )}
                >
                  <div
                    className={cn(
                      'flex items-start gap-3',
                      layout === 'centered' && 'justify-center'
                    )}
                  >
                    <h1
                      className={cn(
                        'font-bold text-foreground',
                        size === 'sm' && 'text-xl',
                        size === 'default' && 'text-2xl',
                        size === 'lg' && 'text-3xl',
                        titleClassName
                      )}
                    >
                      {title}
                    </h1>
                    {showStatus && status && (
                      <Badge
                        color={
                          statusVariant === 'default'
                            ? 'p500'
                            : statusVariant === 'secondary'
                              ? 'n500'
                              : statusVariant === 'destructive'
                                ? 'fd500'
                                : statusVariant === 'success'
                                  ? 'f500'
                                  : statusVariant === 'warning'
                                    ? 'fw500'
                                    : 'p500'
                        }
                        text={status}
                      />
                    )}
                  </div>

                  {/* Subtitle */}
                  {subtitle && (
                    <p
                      className={cn(
                        'text-muted-foreground mt-1',
                        size === 'sm' && 'text-base',
                        size === 'default' && 'text-lg',
                        size === 'lg' && 'text-xl',
                        subtitleClassName
                      )}
                    >
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              {description && (
                <p
                  className={cn(
                    'text-muted-foreground',
                    size === 'sm' && 'text-sm',
                    size === 'default' && 'text-base',
                    size === 'lg' && 'text-lg',
                    descriptionClassName
                  )}
                >
                  {description}
                </p>
              )}
            </div>

            {/* Metadata */}
            {metadata.length > 0 && (
              <div
                className={cn(
                  'flex flex-wrap gap-4 pt-4',
                  layout === 'centered' && 'justify-center'
                )}
              >
                {metadata.map((item, index) => (
                  <div key={index} className='flex items-center gap-1 text-sm'>
                    {item.icon && (
                      <span className='text-muted-foreground'>{item.icon}</span>
                    )}
                    <span className='text-muted-foreground'>{item.label}:</span>
                    {item.tooltip ? (
                      <Tooltip content={item.tooltip}>
                        <span className='text-foreground font-medium'>
                          {item.value}
                        </span>
                      </Tooltip>
                    ) : (
                      <span className='text-foreground font-medium'>
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div
                className={cn(
                  'flex flex-wrap gap-2 pt-4',
                  layout === 'centered' && 'justify-center'
                )}
              >
                {displayTags.map((tag, index) => (
                  <Badge key={index} color='n500' text={tag} />
                ))}
                {hasMoreTags && (
                  <button
                    onClick={() => setShowAllTags(true)}
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    +{remainingTagsCount} more
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          {showActions && actions.length > 0 && (
            <div
              className={cn(
                'flex flex-wrap gap-3',
                layout === 'split' ? 'shrink-0' : 'pt-6',
                layout === 'centered' && 'justify-center',
                actionsClassName
              )}
            >
              {/* Primary actions first */}
              {primaryActions.map((action, index) => (
                <div key={`primary-${index}`}>
                  {action.tooltip ? (
                    <Tooltip content={action.tooltip}>
                      <Button
                        variant={action.variant || 'default'}
                        size={action.size || 'default'}
                        disabled={action.disabled}
                        onClick={action.onClick}
                      >
                        {action.icon && (
                          <span className='mr-2'>{action.icon}</span>
                        )}
                        {action.label}
                      </Button>
                    </Tooltip>
                  ) : (
                    <Button
                      variant={action.variant || 'default'}
                      size={action.size || 'default'}
                      disabled={action.disabled}
                      onClick={action.onClick}
                    >
                      {action.icon && (
                        <span className='mr-2'>{action.icon}</span>
                      )}
                      {action.label}
                    </Button>
                  )}
                </div>
              ))}

              {/* Secondary actions */}
              {secondaryActions.map((action, index) => (
                <div key={`secondary-${index}`}>
                  {action.tooltip ? (
                    <Tooltip content={action.tooltip}>
                      <Button
                        variant={action.variant || 'outline'}
                        size={action.size || 'default'}
                        disabled={action.disabled}
                        onClick={action.onClick}
                      >
                        {action.icon && (
                          <span className='mr-2'>{action.icon}</span>
                        )}
                        {action.label}
                      </Button>
                    </Tooltip>
                  ) : (
                    <Button
                      variant={action.variant || 'outline'}
                      size={action.size || 'default'}
                      disabled={action.disabled}
                      onClick={action.onClick}
                    >
                      {action.icon && (
                        <span className='mr-2'>{action.icon}</span>
                      )}
                      {action.label}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

AssetHeader.displayName = 'AssetHeader';

export { AssetHeader, assetHeaderVariants };
