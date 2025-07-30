import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Label } from './label';

/**
 * Select variant styles using Acrobi Design System data attributes
 * This matches the devlink SelectlistCtrl component pattern where styling
 * is controlled via data attributes that map to CSS selectors
 */
const selectVariants = cva(
  // Base styles - minimal classes, let .selectlist_main class handle most styling
  'selectlist_main w-full',
  {
    variants: {
      // Border color variants mapped to data-field-brd
      borderColor: {
        default: '',
        danger: '',
        warning: '',
        success: '',
      },
    },
    defaultVariants: {
      borderColor: 'default',
    },
  }
);

// Dropdown content styling using Acrobi patterns
const selectContentVariants = cva(
  'selectlist-drop absolute z-50 w-full bg-background border border-input shadow-lg',
  {
    variants: {
      position: {
        top: '',
        bottom: '',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  }
);

// Select item styling using Acrobi selectitem class
const selectItemVariants = cva(
  'selectitem w-full cursor-pointer border-b border-input last:border-b-0',
  {
    variants: {
      selected: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
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

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  /**
   * Select component visibility toggle (fldSelect in Webflow)
   */
  visible?: boolean;
  /**
   * Feedback visibility toggle (fbk in Webflow)
   */
  showFeedback?: boolean;
  /**
   * Select options
   */
  options: SelectOption[];
  /**
   * Selected value
   */
  value?: string;
  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void;
  /**
   * Placeholder text source (pHoldSrc in Webflow)
   */
  placeholderText?: string;
  /**
   * Placeholder color (pHoldClr in Webflow)
   */
  placeholderColor?: 'n500' | 'n300' | 'n700' | 'n999';
  /**
   * Field border color (fldBrdClr in Webflow)
   */
  fieldBorderColor?: 'd' | 'w' | 's';
  /**
   * Field ID (fldId in Webflow)
   */
  fieldId?: string;
  /**
   * Feedback text visibility (fbkFbkTxt in Webflow)
   */
  feedbackText?: boolean;
  /**
   * Feedback icon visibility (fbkFbkIcn in Webflow)
   */
  feedbackIcon?: boolean;
  /**
   * Feedback text source (fbkFbkTxtSrc in Webflow)
   */
  feedbackTextSrc?: string;
  /**
   * Feedback icon source (fbkFbkIcnSrc in Webflow)
   */
  feedbackIconSrc?: string;
  /**
   * Feedback color (fbkFbkClr in Webflow)
   */
  feedbackColor?: 'fd500' | 'fw500' | 'f500' | 'p500' | 'n500';
  /**
   * Whether to show search functionality
   */
  searchable?: boolean;
  /**
   * Search placeholder text
   */
  searchPlaceholder?: string;
  /**
   * @deprecated Use placeholderText prop instead
   */
  placeholder?: string;
  /**
   * @deprecated Use feedbackTextSrc and showFeedback props instead
   */
  error?: string;
  /**
   * @deprecated Use feedbackTextSrc prop instead
   */
  helperText?: string;
  /**
   * @deprecated Use fieldBorderColor and showFeedback props instead
   */
  variant?: 'default' | 'error' | 'success';
  /**
   * @deprecated Size is handled by CSS classes
   */
  size?: 'sm' | 'md' | 'lg';
}

// Map border color names to Acrobi data-field-brd values
const getFieldBorderColor = (
  borderColor: string | null | undefined,
  variant?: string | null | undefined
): string => {
  // Handle backward compatibility
  if (variant) {
    const variantMap: Record<string, string> = {
      error: 'd',
      success: 's',
      default: '',
    };
    return variantMap[variant] || '';
  }

  const borderMap: Record<string, string> = {
    d: 'd', // danger
    w: 'w', // warning
    s: 's', // success
  };
  return borderMap[borderColor || ''] || '';
};

// Map placeholder color names to Acrobi values
const getPlaceholderColor = (color: string | null | undefined): string => {
  const colorMap: Record<string, string> = {
    n500: 'n500',
    n300: 'n300',
    n700: 'n700',
    n999: 'n999',
  };
  return colorMap[color || 'n500'] || 'n500';
};

/**
 * Select component using authentic Acrobi Design System styling
 *
 * This component uses data attributes that map directly to the CSS selectors
 * in the Acrobi design system, ensuring authentic styling that matches the
 * original devlink SelectlistCtrl component.
 *
 * Key features:
 * - Uses data-field-brd for border color styling (d, w, s)
 * - Uses authentic selectlist styling with .selectlist_main class
 * - Uses Label component for placeholder and feedback text
 * - Supports icon display in options through selectitem structure
 * - Maintains dropdown functionality with proper Acrobi styling
 *
 * @example
 * ```tsx
 * <Select
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2', subtitle: 'With subtitle' }
 *   ]}
 *   placeholderText="Choose an option"
 *   fieldBorderColor="d"
 *   showFeedback={true}
 *   feedbackTextSrc="Please select an option"
 *   feedbackColor="fd500"
 * />
 * ```
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      visible = true,
      showFeedback = false,
      options,
      value,
      onValueChange,
      placeholderText = 'Select an option...',
      placeholderColor = 'n500',
      fieldBorderColor,
      fieldId = 'select',
      feedbackText = true,
      feedbackIcon = false,
      feedbackTextSrc = 'Feedback text',
      feedbackIconSrc = 'act_check_circle',
      feedbackColor = 'fd500',
      searchable = false,
      searchPlaceholder = 'Search...',
      disabled,
      // Deprecated props for backward compatibility
      placeholder,
      error,
      helperText,
      variant,
      size,
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!visible) return null;

    const [isOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');

    // Handle backward compatibility
    const actualPlaceholderText = placeholder || placeholderText;
    const actualFieldBorderColor = getFieldBorderColor(
      fieldBorderColor,
      variant
    );
    const actualPlaceholderColor = getPlaceholderColor(placeholderColor);
    const actualShowFeedback = error || helperText ? true : showFeedback;
    const actualFeedbackText = error || helperText || feedbackTextSrc;
    const actualFeedbackColor = variant === 'error' ? 'fd500' : feedbackColor;

    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchTerm) return options;
      return options.filter(
        option =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (option.subtitle &&
            option.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }, [options, searchTerm, searchable]);

    const selectedOption = options.find(option => option.value === value);

    const handleSelect = (optionValue: string) => {
      onValueChange?.(optionValue);
      setIsOpen(false);
      setSearchTerm('');
    };

    return (
      <div className='selectlist_wrap relative w-full'>
        <div
          className={cn(selectVariants(), className)}
          data-field-brd={actualFieldBorderColor}
          id={fieldId}
        >
          {/* Select Toggle */}
          <button
            type='button'
            className='a_selectlist-tgl w-full flex items-center justify-between cursor-pointer'
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            aria-haspopup='listbox'
            aria-expanded={isOpen}
          >
            {/* Dropdown Arrow */}
            <span
              className='a_selectlist-arw icon transition-transform duration-300'
              style={{
                fontFamily: 'var(--_typography---icn1)',
                transform: isOpen ? 'rotate(180deg)' : 'none',
              }}
            >
              ꭜ
            </span>

            {/* Selected Item Display */}
            <div className='selecteditem flex-1 flex items-center'>
              <div className='si-lead' />
              <div className='si-primary flex-1'>
                <Label
                  text={
                    selectedOption
                      ? selectedOption.label
                      : actualPlaceholderText
                  }
                  color={selectedOption ? 'n999' : actualPlaceholderColor}
                  iconLocation='l'
                  icon={selectedOption?.icon || 'default'}
                  showIcon={false}
                  size='r3'
                />
              </div>
            </div>
          </button>

          {/* Dropdown Content */}
          {isOpen && (
            <div className={cn(selectContentVariants({ position: 'bottom' }))}>
              {searchable && (
                <div className='p-2 border-b border-input'>
                  <input
                    type='text'
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='w-full px-2 py-1 text-sm border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary'
                  />
                </div>
              )}

              <div className='max-h-60 overflow-auto'>
                {filteredOptions.length === 0 ? (
                  <div className='py-6 text-center text-sm text-muted-foreground'>
                    No options found
                  </div>
                ) : (
                  filteredOptions.map(option => (
                    <div
                      key={option.value}
                      className={cn(
                        selectItemVariants({
                          selected: value === option.value,
                        }),
                        option.disabled && 'opacity-50 cursor-not-allowed'
                      )}
                      onClick={() =>
                        !option.disabled && handleSelect(option.value)
                      }
                    >
                      {/* Leading Icon */}
                      <div className='si-lead' data-div='y'>
                        {option.icon && (
                          <div className='sic-lead-icn'>
                            <span
                              className='icon'
                              data-icn-size='sm'
                              data-clr='inherit'
                              style={{
                                fontFamily: 'var(--_typography---icn1)',
                              }}
                            >
                              {option.icon}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Primary Content */}
                      <div className='si-primary flex-1' data-div='y'>
                        <Label
                          text={option.label}
                          size='r3'
                          color='inherit'
                          iconLocation='l'
                          showIcon={false}
                        />
                        {option.subtitle && (
                          <Label
                            text={option.subtitle}
                            showIcon={false}
                            iconLocation='t'
                            size='r3'
                            color='n700'
                          />
                        )}
                      </div>

                      {/* Trailing Selected Indicator */}
                      <div className='si-trail' data-div='y'>
                        {value === option.value && (
                          <div className='sic-trail-select'>
                            <span
                              className='icon'
                              data-icn-size='s'
                              data-clr='p500'
                              style={{
                                fontFamily: 'var(--_typography---icn1)',
                              }}
                            >
                              ✓
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Feedback */}
          {actualShowFeedback && (
            <div className='a_feedback-txt-sel mt-2'>
              <Label
                text={actualFeedbackText}
                showText={feedbackText}
                icon={feedbackIconSrc}
                showIcon={feedbackIcon}
                color={actualFeedbackColor}
                iconLocation='r'
                size='r3'
              />
            </div>
          )}
        </div>

        {/* Hidden select for form compatibility */}
        <select
          ref={ref}
          value={value || ''}
          onChange={e => onValueChange?.(e.target.value)}
          className='sr-only'
          disabled={disabled}
          {...props}
        >
          <option value='' disabled>
            {actualPlaceholderText}
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

        {/* Close indicator (Webflow requirement) */}
        <div className='_w-icon-dropdown-toggle-close' />
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select, selectVariants };
