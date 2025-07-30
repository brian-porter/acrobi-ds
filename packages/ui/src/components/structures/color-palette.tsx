import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Button } from '../primitives/button';

const colorPaletteVariants = cva('grid gap-2 p-2', {
  variants: {
    columns: {
      4: 'grid-cols-4',
      6: 'grid-cols-6',
      8: 'grid-cols-8',
      10: 'grid-cols-10',
    },
    size: {
      sm: 'gap-1 p-1',
      default: 'gap-2 p-2',
      lg: 'gap-3 p-3',
    },
  },
  defaultVariants: {
    columns: 8,
    size: 'default',
  },
});

export interface ColorOption {
  /**
   * Color value (hex, rgb, hsl)
   */
  value: string;
  /**
   * Display name for the color
   */
  name?: string;
  /**
   * Whether this color is disabled
   */
  disabled?: boolean;
}

export interface ColorPaletteProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof colorPaletteVariants> {
  /**
   * Array of color options
   */
  colors: ColorOption[];
  /**
   * Currently selected color value
   */
  value?: string;
  /**
   * Callback when color is selected
   */
  onValueChange?: (value: string) => void;
  /**
   * Whether to show color names on hover
   * @default true
   */
  showNames?: boolean;
  /**
   * Custom color button size
   */
  colorSize?: 'sm' | 'default' | 'lg';
  /**
   * Whether to show a "no color" option
   * @default false
   */
  allowNoColor?: boolean;
  /**
   * Label for the "no color" option
   * @default "No Color"
   */
  noColorLabel?: string;
}

// Default color palette - common text and UI colors
const defaultColors: ColorOption[] = [
  // Grays
  { value: '#000000', name: 'Black' },
  { value: '#374151', name: 'Gray 700' },
  { value: '#6B7280', name: 'Gray 500' },
  { value: '#9CA3AF', name: 'Gray 400' },
  { value: '#D1D5DB', name: 'Gray 300' },
  { value: '#F3F4F6', name: 'Gray 100' },
  { value: '#FFFFFF', name: 'White' },
  { value: 'transparent', name: 'Transparent' },

  // Blues
  { value: '#1E40AF', name: 'Blue 800' },
  { value: '#2563EB', name: 'Blue 600' },
  { value: '#3B82F6', name: 'Blue 500' },
  { value: '#60A5FA', name: 'Blue 400' },
  { value: '#93C5FD', name: 'Blue 300' },
  { value: '#DBEAFE', name: 'Blue 100' },
  { value: '#EFF6FF', name: 'Blue 50' },

  // Greens
  { value: '#14532D', name: 'Green 900' },
  { value: '#166534', name: 'Green 800' },
  { value: '#15803D', name: 'Green 700' },
  { value: '#16A34A', name: 'Green 600' },
  { value: '#22C55E', name: 'Green 500' },
  { value: '#4ADE80', name: 'Green 400' },
  { value: '#86EFAC', name: 'Green 300' },
  { value: '#BBF7D0', name: 'Green 200' },

  // Reds
  { value: '#7F1D1D', name: 'Red 900' },
  { value: '#991B1B', name: 'Red 800' },
  { value: '#B91C1C', name: 'Red 700' },
  { value: '#DC2626', name: 'Red 600' },
  { value: '#EF4444', name: 'Red 500' },
  { value: '#F87171', name: 'Red 400' },
  { value: '#FCA5A5', name: 'Red 300' },
  { value: '#FECACA', name: 'Red 200' },

  // Yellows
  { value: '#78350F', name: 'Yellow 900' },
  { value: '#92400E', name: 'Yellow 800' },
  { value: '#B45309', name: 'Yellow 700' },
  { value: '#D97706', name: 'Yellow 600' },
  { value: '#F59E0B', name: 'Yellow 500' },
  { value: '#FBBF24', name: 'Yellow 400' },
  { value: '#FCD34D', name: 'Yellow 300' },
  { value: '#FDE68A', name: 'Yellow 200' },

  // Purples
  { value: '#581C87', name: 'Purple 900' },
  { value: '#6B21A8', name: 'Purple 800' },
  { value: '#7C2D12', name: 'Purple 700' },
  { value: '#8B5CF6', name: 'Purple 500' },
  { value: '#A78BFA', name: 'Purple 400' },
  { value: '#C4B5FD', name: 'Purple 300' },
  { value: '#DDD6FE', name: 'Purple 200' },
  { value: '#EDE9FE', name: 'Purple 100' },
];

const ColorPalette = React.forwardRef<HTMLDivElement, ColorPaletteProps>(
  (
    {
      className,
      colors = defaultColors,
      value,
      onValueChange,
      showNames = true,
      colorSize = 'default',
      allowNoColor = false,
      noColorLabel = 'No Color',
      columns,
      size,
      ...props
    },
    ref
  ) => {
    const [hoveredColor, setHoveredColor] = React.useState<string | null>(null);

    const handleColorSelect = React.useCallback(
      (colorValue: string) => {
        onValueChange?.(colorValue);
      },
      [onValueChange]
    );

    const renderColorButton = React.useCallback(
      (color: ColorOption, index: number) => {
        const isSelected = value === color.value;
        const isTransparent = color.value === 'transparent';

        return (
          <Button
            key={`${color.value}-${index}`}
            type='button'
            variant='outline'
            size='sm'
            className={cn(
              'border-2 rounded-md transition-all duration-200 relative overflow-hidden',
              colorSize === 'sm' && 'w-6 h-6 p-0',
              colorSize === 'default' && 'w-8 h-8 p-0',
              colorSize === 'lg' && 'w-10 h-10 p-0',
              isSelected && 'ring-2 ring-primary ring-offset-2',
              color.disabled && 'opacity-50 cursor-not-allowed',
              !color.disabled && 'hover:scale-110 hover:z-10'
            )}
            style={{
              backgroundColor: isTransparent ? 'transparent' : color.value,
              borderColor: isSelected
                ? 'currentColor'
                : isTransparent
                  ? '#e5e7eb'
                  : color.value,
            }}
            onClick={() => !color.disabled && handleColorSelect(color.value)}
            onMouseEnter={() =>
              showNames && setHoveredColor(color.name || color.value)
            }
            onMouseLeave={() => setHoveredColor(null)}
            disabled={color.disabled}
            title={color.name || color.value}
          >
            {isTransparent && (
              <div className='w-full h-full bg-gradient-to-br from-red-500 via-transparent to-transparent opacity-30' />
            )}
            {isSelected && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div
                  className={cn(
                    'rounded-full',
                    colorSize === 'sm' && 'w-2 h-2',
                    colorSize === 'default' && 'w-3 h-3',
                    colorSize === 'lg' && 'w-4 h-4',
                    // Choose check color based on background brightness
                    isTransparent ||
                      color.value === '#FFFFFF' ||
                      color.value.includes('F')
                      ? 'bg-gray-800'
                      : 'bg-white'
                  )}
                />
              </div>
            )}
          </Button>
        );
      },
      [value, handleColorSelect, showNames, colorSize]
    );

    const allColors = React.useMemo(() => {
      const result = [...colors];
      if (allowNoColor) {
        result.unshift({ value: '', name: noColorLabel });
      }
      return result;
    }, [colors, allowNoColor, noColorLabel]);

    return (
      <div
        ref={ref}
        className={cn(colorPaletteVariants({ columns, size }), className)}
        {...props}
      >
        {allColors.map(renderColorButton)}

        {/* Tooltip for hovered color */}
        {showNames && hoveredColor && (
          <div className='absolute z-50 px-2 py-1 text-xs bg-gray-900 text-white rounded pointer-events-none -mt-8 ml-2'>
            {hoveredColor}
          </div>
        )}
      </div>
    );
  }
);

ColorPalette.displayName = 'ColorPalette';

export { ColorPalette, colorPaletteVariants, defaultColors };
