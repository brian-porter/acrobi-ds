import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Icon } from './icon';
import { Label } from './label';

/**
 * SelectlistCtrl variant styles using authentic Acrobi classes
 * This matches the devlink SelectlistCtrl component structure
 */
const selectlistCtrlVariants = cva(
  // Base authentic Acrobi selectlist wrapper class
  'selectlist_wrap',
  {
    variants: {
      variant: {
        default: '',
        error: '',
        success: '',
        warning: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Selectlist main container styling
const selectlistMainVariants = cva('selectlist_main', {
  variants: {
    hasTopLabel: {
      true: '',
      false: '',
    },
    hasHelperText: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    hasTopLabel: false,
    hasHelperText: false,
  },
});

// Selectlist toggle styling
const selectlistToggleVariants = cva('a_selectlist-tgl', {
  variants: {
    variant: {
      default: '',
      error: '',
      success: '',
      warning: '',
    },
    disabled: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    disabled: false,
  },
});

// Dropdown content styling
const selectContentVariants = cva(
  'selectlist-drop absolute z-50 w-full bg-background border border-input shadow-lg rounded-md overflow-hidden',
  {
    variants: {
      position: {
        top: 'bottom-full mb-1',
        bottom: 'top-full mt-1',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  }
);

// Select item styling using Acrobi selectitem class
const selectItemVariants = cva(
  'selectitem w-full cursor-pointer border-b border-input last:border-b-0 hover:bg-muted/50 transition-colors',
  {
    variants: {
      selected: {
        true: 'bg-primary/5',
        false: '',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  subtitle?: string;
  icon?: string;
  disabled?: boolean;
}

export interface SelectlistCtrlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof selectlistCtrlVariants> {
  /**
   * Show selectlist component
   */
  fldSelect?: boolean;
  /**
   * Show top label
   */
  topLbl?: boolean;
  /**
   * Show helper text
   */
  helperTxt?: boolean;
  /**
   * Show feedback
   */
  fbk?: boolean;
  /**
   * Field ID
   */
  fldId?: string;
  /**
   * Top label text source
   */
  topLblSrc?: string;
  /**
   * Top label size
   */
  topLblSz?: 'r1' | 'r2' | 'r3' | 'r4';
  /**
   * Top label color
   */
  topLblClr?: 'fd500' | 'fw500' | 'f500' | 'p500' | 'n500' | 'fs500' | 'n999';
  /**
   * Placeholder source text
   */
  pHoldSrc?: string;
  /**
   * Placeholder color
   */
  pHoldClr?: 'n500' | 'n300' | 'n700' | 'n999';
  /**
   * Field border color
   */
  fldBrdClr?: 'd' | 'w' | 's';
  /**
   * Helper text source
   */
  helperTxtSrc?: string;
  /**
   * Helper text size
   */
  helperTxtSz?: 'r1' | 'r2' | 'r3' | 'r4';
  /**
   * Helper text color
   */
  helperTxtClr?:
    | 'fd500'
    | 'fw500'
    | 'f500'
    | 'p500'
    | 'n500'
    | 'fs500'
    | 'n999';
  /**
   * Feedback text visibility
   */
  fbkFbkTxt?: boolean;
  /**
   * Feedback icon visibility
   */
  fbkFbkIcn?: boolean;
  /**
   * Feedback text source
   */
  fbkFbkTxtSrc?: string;
  /**
   * Feedback icon source
   */
  fbkFbkIcnSrc?: string;
  /**
   * Feedback color
   */
  fbkFbkClr?: 'fd500' | 'fw500' | 'f500' | 'p500' | 'n500' | 'fs500';
  /**
   * Dropdown arrow icon source
   */
  slctArwSrc?: string;
  /**
   * Auto complete attribute
   */
  autoComp?: string;
  /**
   * Tab order
   */
  tabOrder?: string | number;
  /**
   * Required field
   */
  required?: boolean;
  /**
   * Select name for form integration
   */
  selectName?: string;
  /**
   * Select value
   */
  value?: string;
  /**
   * Default value
   */
  defaultValue?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Select options
   */
  options: SelectOption[];
  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void;
  /**
   * Show search functionality
   */
  searchable?: boolean;
  /**
   * Search placeholder text
   */
  searchPlaceholder?: string;
  /**
   * Multiple selection mode
   */
  multiple?: boolean;
  /**
   * Component variant
   */
  variant?: 'default' | 'error' | 'success' | 'warning';
  /**
   * Close on select (default: true)
   */
  closeOnSelect?: boolean;
  /**
   * Custom render function for options
   */
  renderOption?: (option: SelectOption, isSelected: boolean) => React.ReactNode;
  /**
   * Max height for dropdown
   */
  maxDropdownHeight?: string;
  /**
   * Dropdown position preference
   */
  dropdownPosition?: 'top' | 'bottom' | 'auto';
}

/**
 * SelectlistCtrl component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink SelectlistCtrl component.
 *
 * Key features:
 * - Uses .selectlist_wrap and .selectlist_main classes for authentic styling
 * - Uses .a_selectlist-tgl class for toggle button styling
 * - Supports top labels, helper text, and feedback messages
 * - Integrates with existing Icon and Label components
 * - Supports all standard select attributes and form integration
 * - Custom dropdown with keyboard navigation
 * - Hidden native select for form compatibility
 *
 * @example
 * ```tsx
 * // Basic selectlist
 * <SelectlistCtrl
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' }
 *   ]}
 *   pHoldSrc="Choose an option"
 *   selectName="choice"
 * />
 *
 * // With top label and feedback
 * <SelectlistCtrl
 *   options={options}
 *   topLbl={true}
 *   topLblSrc="Select Country"
 *   helperTxt={true}
 *   helperTxtSrc="Choose your country"
 *   fbk={true}
 *   fbkFbkTxtSrc="Please select a country"
 *   required={true}
 * />
 *
 * // With search functionality
 * <SelectlistCtrl
 *   options={options}
 *   searchable={true}
 *   searchPlaceholder="Search countries..."
 *   pHoldSrc="Type to search or select"
 * />
 * ```
 */
const SelectlistCtrl = React.forwardRef<HTMLSelectElement, SelectlistCtrlProps>(
  (
    {
      className,
      fldSelect = true,
      topLbl = false,
      helperTxt = false,
      fbk = false,
      fldId = 'selectlist',
      topLblSrc = 'Label',
      topLblSz = 'r3',
      topLblClr = 'n999',
      pHoldSrc = 'Select an option...',
      pHoldClr = 'n500',
      fldBrdClr,
      helperTxtSrc = 'Helper text',
      helperTxtSz = 'r3',
      helperTxtClr = 'n500',
      fbkFbkTxt = true,
      fbkFbkIcn = false,
      fbkFbkTxtSrc = 'Feedback here',
      fbkFbkIcnSrc = 'check_circle',
      fbkFbkClr = 'fd500',
      slctArwSrc = 'keyboard_arrow_down',
      autoComp = 'off',
      tabOrder,
      required = false,
      selectName,
      value,
      defaultValue,
      disabled = false,
      options,
      onChange,
      searchable = false,
      searchPlaceholder = 'Search...',
      multiple = false,
      variant = 'default',
      closeOnSelect = true,
      renderOption,
      maxDropdownHeight = '240px',
      dropdownPosition = 'auto',
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [internalValue, setInternalValue] = React.useState(
      value || defaultValue || ''
    );
    const [dropdownPos, setDropdownPos] = React.useState<'top' | 'bottom'>(
      'bottom'
    );

    const selectRef = React.useRef<HTMLSelectElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => selectRef.current!, []);

    // Don't render if not visible
    if (!fldSelect) return null;

    // Update internal value when prop changes
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    // Auto-position dropdown
    React.useEffect(() => {
      if (isOpen && wrapperRef.current && dropdownPosition === 'auto') {
        const rect = wrapperRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        if (spaceBelow < 200 && spaceAbove > spaceBelow) {
          setDropdownPos('top');
        } else {
          setDropdownPos('bottom');
        }
      } else if (dropdownPosition !== 'auto') {
        setDropdownPos(dropdownPosition);
      }
    }, [isOpen, dropdownPosition]);

    // Filter options based on search term
    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchTerm) return options;
      return options.filter(
        option =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (option.subtitle &&
            option.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }, [options, searchTerm, searchable]);

    const selectedOption = options.find(
      option => option.value === internalValue
    );

    // Handle option selection
    const handleSelect = (optionValue: string) => {
      setInternalValue(optionValue);
      onChange?.(optionValue);

      if (closeOnSelect && !multiple) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          setIsOpen(!isOpen);
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          }
          break;
      }
    };

    // Close dropdown on outside click
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
          document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    return (
      <div
        ref={wrapperRef}
        className={cn(selectlistCtrlVariants({ variant }), className)}
        data-field-brd={fldBrdClr}
        {...props}
      >
        {/* Top Label */}
        {topLbl && (
          <div className='selectlist_top-lbl mb-2'>
            <Label
              text={topLblSrc}
              size={topLblSz}
              color={topLblClr}
              showIcon={false}
              htmlFor={fldId}
            />
          </div>
        )}

        {/* Main Selectlist Container */}
        <div
          className={cn(
            selectlistMainVariants({
              hasTopLabel: topLbl,
              hasHelperText: helperTxt,
            })
          )}
        >
          {/* Selectlist Toggle Button */}
          <button
            type='button'
            className={cn(selectlistToggleVariants({ variant, disabled }))}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-haspopup='listbox'
            aria-expanded={isOpen}
            aria-required={required}
            tabIndex={
              typeof tabOrder === 'string' ? parseInt(tabOrder) : tabOrder
            }
            id={fldId}
          >
            {/* Dropdown Arrow */}
            <div className='a_selectlist-arw'>
              <Icon
                icon={slctArwSrc}
                color='n500'
                size='sm'
                className={cn(
                  'transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </div>

            {/* Selected Item Display */}
            <div className='selecteditem flex-1 text-left'>
              <div className='si-primary'>
                <Label
                  text={selectedOption ? selectedOption.label : pHoldSrc}
                  color={selectedOption ? 'n999' : pHoldClr}
                  size='r3'
                  showIcon={!!selectedOption?.icon}
                  icon={selectedOption?.icon}
                  iconLocation='l'
                />
              </div>
            </div>
          </button>

          {/* Dropdown Content */}
          {isOpen && (
            <div
              ref={dropdownRef}
              className={cn(selectContentVariants({ position: dropdownPos }))}
              style={{ maxHeight: maxDropdownHeight }}
            >
              {/* Search Input */}
              {searchable && (
                <div className='p-3 border-b border-input'>
                  <input
                    type='text'
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='w-full px-3 py-2 text-sm border border-input bg-background rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
                    autoFocus
                  />
                </div>
              )}

              {/* Options List */}
              <div className='max-h-full overflow-auto'>
                {filteredOptions.length === 0 ? (
                  <div className='py-8 text-center text-sm text-muted-foreground'>
                    No options found
                  </div>
                ) : (
                  filteredOptions.map(option => (
                    <div
                      key={option.value}
                      className={cn(
                        selectItemVariants({
                          selected: internalValue === option.value,
                          disabled: option.disabled,
                        })
                      )}
                      onClick={() =>
                        !option.disabled && handleSelect(option.value)
                      }
                    >
                      {renderOption ? (
                        renderOption(option, internalValue === option.value)
                      ) : (
                        <>
                          {/* Leading Icon */}
                          <div className='si-lead p-3' data-div='y'>
                            {option.icon && (
                              <div className='sic-lead-icn'>
                                <Icon
                                  icon={option.icon}
                                  size='sm'
                                  color='inherit'
                                />
                              </div>
                            )}
                          </div>

                          {/* Primary Content */}
                          <div className='si-primary flex-1 p-3' data-div='y'>
                            <Label
                              text={option.label}
                              size='r3'
                              color='inherit'
                              showIcon={false}
                            />
                            {option.subtitle && (
                              <div className='mt-1'>
                                <Label
                                  text={option.subtitle}
                                  size='r3'
                                  color='n700'
                                  showIcon={false}
                                />
                              </div>
                            )}
                          </div>

                          {/* Trailing Selected Indicator */}
                          <div className='si-trail p-3' data-div='y'>
                            {internalValue === option.value && (
                              <div className='sic-trail-select'>
                                <Icon icon='check' size='sm' color='p500' />
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Helper Text */}
        {helperTxt && (
          <div className='selectlist_helper-txt mt-1'>
            <Label
              text={helperTxtSrc}
              size={helperTxtSz}
              color={helperTxtClr}
              showIcon={false}
            />
          </div>
        )}

        {/* Feedback */}
        {fbk && (
          <div className='selectlist_feedback mt-1'>
            <Label
              text={fbkFbkTxtSrc}
              showText={fbkFbkTxt}
              icon={fbkFbkIcnSrc}
              showIcon={fbkFbkIcn}
              color={fbkFbkClr}
              iconLocation='r'
              size='r3'
            />
          </div>
        )}

        {/* Hidden Native Select for Form Compatibility */}
        <select
          ref={selectRef}
          name={selectName}
          value={internalValue}
          onChange={e => handleSelect(e.target.value)}
          className='sr-only'
          disabled={disabled}
          required={required}
          autoComplete={autoComp}
          multiple={multiple}
        >
          <option value='' disabled>
            {pHoldSrc}
          </option>
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

SelectlistCtrl.displayName = 'SelectlistCtrl';

export {
  SelectlistCtrl,
  selectlistCtrlVariants,
  selectlistMainVariants,
  selectlistToggleVariants,
  selectContentVariants,
  selectItemVariants,
};
