import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Chip, type ChipProps } from '../primitives/chip';

const chipGroupVariants = cva('flex flex-wrap items-center', {
  variants: {
    variant: {
      default: 'gap-2',
      compact: 'gap-1',
      spacious: 'gap-3',
      bordered: 'gap-2 p-3 border border-border rounded-lg',
    },
    alignment: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col items-start',
    },
  },
  defaultVariants: {
    variant: 'default',
    alignment: 'start',
    orientation: 'horizontal',
  },
});

export interface ChipGroupChip {
  /**
   * Chip content
   */
  children: React.ReactNode;
  /**
   * Chip value for selection handling
   */
  value?: string;
  /**
   * Whether chip is selected (for selectable groups)
   */
  selected?: boolean;
  /**
   * Click handler for the chip
   */
  onClick?: (value?: string) => void;
  /**
   * Whether chip is disabled
   */
  disabled?: boolean;
  /**
   * Chip variant
   */
  variant?: ChipProps['variant'];
  /**
   * Additional chip props
   */
  chipProps?: Omit<ChipProps, 'children' | 'onClick' | 'disabled' | 'variant'>;
}

export interface ChipGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipGroupVariants> {
  /**
   * Array of chips to display
   */
  chips: ChipGroupChip[];
  /**
   * Group variant style
   * @default "default"
   */
  variant?: 'default' | 'compact' | 'spacious' | 'bordered';
  /**
   * Chip alignment
   * @default "start"
   */
  alignment?: 'start' | 'center' | 'end';
  /**
   * Layout orientation
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Whether chips are selectable
   */
  selectable?: boolean;
  /**
   * Whether multiple chips can be selected
   */
  multiple?: boolean;
  /**
   * Selected chip values (controlled)
   */
  selectedValues?: string[];
  /**
   * Default selected values (uncontrolled)
   */
  defaultSelectedValues?: string[];
  /**
   * Selection change handler
   */
  onSelectionChange?: (selectedValues: string[]) => void;
  /**
   * Default variant for all chips
   */
  defaultVariant?: ChipProps['variant'];
  /**
   * Maximum number of chips to display
   */
  maxVisible?: number;
  /**
   * Text to show when chips are collapsed
   */
  moreText?: string;
}

const ChipGroup = React.forwardRef<HTMLDivElement, ChipGroupProps>(
  (
    {
      className,
      chips = [],
      variant,
      alignment,
      orientation,
      selectable = false,
      multiple = false,
      selectedValues,
      defaultSelectedValues = [],
      onSelectionChange,
      defaultVariant = 'default',
      maxVisible,
      moreText = 'more',
      ...props
    },
    ref
  ) => {
    const [internalSelectedValues, setInternalSelectedValues] = React.useState<
      string[]
    >(selectedValues || defaultSelectedValues);
    const [showAll, setShowAll] = React.useState(false);

    const currentSelectedValues = selectedValues || internalSelectedValues;

    React.useEffect(() => {
      if (selectedValues !== undefined) {
        setInternalSelectedValues(selectedValues);
      }
    }, [selectedValues]);

    const handleChipClick = (chip: ChipGroupChip) => {
      if (!selectable || chip.disabled) return;

      const value = chip.value || '';
      let newSelectedValues: string[];

      if (multiple) {
        if (currentSelectedValues.includes(value)) {
          newSelectedValues = currentSelectedValues.filter(v => v !== value);
        } else {
          newSelectedValues = [...currentSelectedValues, value];
        }
      } else {
        newSelectedValues = currentSelectedValues.includes(value)
          ? []
          : [value];
      }

      if (selectedValues === undefined) {
        setInternalSelectedValues(newSelectedValues);
      }

      onSelectionChange?.(newSelectedValues);
      chip.onClick?.(value);
    };

    const visibleChips = React.useMemo(() => {
      if (!maxVisible || maxVisible >= chips.length || showAll) {
        return chips;
      }
      return chips.slice(0, maxVisible);
    }, [chips, maxVisible, showAll]);

    const hasMore = maxVisible && chips.length > maxVisible && !showAll;

    if (chips.length === 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          chipGroupVariants({ variant, alignment, orientation }),
          className
        )}
        role={selectable ? 'group' : undefined}
        aria-label={selectable ? 'Selectable chip group' : undefined}
        {...props}
      >
        {visibleChips.map((chip, index) => {
          const isSelected =
            selectable &&
            chip.value &&
            currentSelectedValues.includes(chip.value);
          const chipVariant = isSelected
            ? 'selected'
            : chip.variant || defaultVariant;

          return (
            <Chip
              key={chip.value || index}
              variant={chipVariant}
              disabled={chip.disabled}
              onClick={selectable ? () => handleChipClick(chip) : chip.onClick}
              className={cn(
                selectable && 'cursor-pointer hover:opacity-80',
                selectable && isSelected && 'ring-2 ring-ring ring-offset-2'
              )}
              {...chip.chipProps}
            >
              {chip.children}
            </Chip>
          );
        })}

        {hasMore && (
          <Chip
            variant='outline'
            onClick={() => setShowAll(true)}
            className='cursor-pointer hover:opacity-80'
          >
            +{chips.length - maxVisible} {moreText}
          </Chip>
        )}
      </div>
    );
  }
);
ChipGroup.displayName = 'ChipGroup';

export { ChipGroup, chipGroupVariants };
