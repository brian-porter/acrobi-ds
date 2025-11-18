import * as React from 'react';
import { cva, type VariantProps } from '@acrobi/primitives';
import { cn } from '@acrobi/primitives';

const listGridVariants = cva('grid w-full', {
  variants: {
    variant: {
      default: 'gap-4',
      compact: 'gap-2',
      spacious: 'gap-6',
      cards: 'gap-4 p-4 bg-background border border-border rounded-lg',
    },
    columns: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
      auto: 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
      'auto-sm': 'grid-cols-[repeat(auto-fit,minmax(200px,1fr))]',
      'auto-lg': 'grid-cols-[repeat(auto-fit,minmax(300px,1fr))]',
    },
    alignment: {
      start: 'justify-items-start',
      center: 'justify-items-center',
      end: 'justify-items-end',
      stretch: 'justify-items-stretch',
    },
  },
  defaultVariants: {
    variant: 'default',
    columns: 'auto',
    alignment: 'stretch',
  },
});

export interface ListGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listGridVariants> {
  /**
   * Grid items to render
   */
  children: React.ReactNode;
  /**
   * Grid variant style
   * @default "default"
   */
  variant?: 'default' | 'compact' | 'spacious' | 'cards';
  /**
   * Number of columns or auto-sizing
   * @default "auto"
   */
  columns?: '1' | '2' | '3' | '4' | '5' | '6' | 'auto' | 'auto-sm' | 'auto-lg';
  /**
   * Item alignment within grid cells
   * @default "stretch"
   */
  alignment?: 'start' | 'center' | 'end' | 'stretch';
  /**
   * Custom minimum width for auto columns (in px)
   */
  minWidth?: number;
  /**
   * Whether to maintain aspect ratio for items
   */
  aspectRatio?: '1:1' | '16:9' | '4:3' | '3:2';
}

const ListGrid = React.forwardRef<HTMLDivElement, ListGridProps>(
  (
    {
      className,
      children,
      variant,
      columns,
      alignment,
      minWidth,
      aspectRatio,
      style,
      ...props
    },
    ref
  ) => {
    const gridStyle = React.useMemo(() => {
      const baseStyle = { ...style };

      if (minWidth && columns?.startsWith('auto')) {
        baseStyle.gridTemplateColumns = `repeat(auto-fit, minmax(${minWidth}px, 1fr))`;
      }

      return baseStyle;
    }, [style, minWidth, columns]);

    const itemClass = React.useMemo(() => {
      if (!aspectRatio) return '';

      switch (aspectRatio) {
        case '1:1':
          return '[&>*]:aspect-square';
        case '16:9':
          return '[&>*]:aspect-video';
        case '4:3':
          return '[&>*]:aspect-[4/3]';
        case '3:2':
          return '[&>*]:aspect-[3/2]';
        default:
          return '';
      }
    }, [aspectRatio]);

    return (
      <div
        ref={ref}
        className={cn(
          listGridVariants({ variant, columns, alignment }),
          itemClass,
          className
        )}
        style={gridStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ListGrid.displayName = 'ListGrid';

export { ListGrid, listGridVariants };
