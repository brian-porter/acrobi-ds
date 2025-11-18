import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

/**
 * SliderCtrl variant styles using authentic Acrobi classes
 * This matches the devlink SliderCtrl component structure for range sliders
 */
const sliderCtrlVariants = cva(
  // Base authentic Acrobi slider class
  'slider',
  {
    variants: {
      variant: {
        default: '',
        compact: '',
        expanded: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Slider wrapper styling
const sliderWrapperVariants = cva('slider_wrapper', {
  variants: {
    mode: {
      single: '',
      dual: '',
    },
  },
  defaultVariants: {
    mode: 'single',
  },
});

// Slider track styling
const sliderTrackVariants = cva(
  'slider_track relative bg-gray-200 rounded-full cursor-pointer',
  {
    variants: {
      size: {
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// Slider handle styling
const sliderHandleVariants = cva(
  'slider_handle absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white border-2 border-primary rounded-full cursor-grab active:cursor-grabbing shadow-lg',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
      },
      state: {
        default: '',
        active: 'scale-110',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
);

// Slider fill styling
const sliderFillVariants = cva(
  'slider_fill absolute top-0 h-full bg-primary rounded-full pointer-events-none',
  {
    variants: {
      variant: {
        default: '',
        gradient: 'bg-gradient-to-r from-primary to-primary-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface SliderCtrlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sliderCtrlVariants> {
  /**
   * Enable single slider mode
   */
  single?: boolean;
  /**
   * Enable dual slider mode (range)
   */
  dual?: boolean;
  /**
   * Wrapper ID for Finsweet integration
   */
  wrapperId?: string;
  /**
   * Track ID for Finsweet integration
   */
  trackId?: string;
  /**
   * Handle ID for Finsweet integration
   */
  handleId?: string;
  /**
   * Fill ID for Finsweet integration
   */
  fillId?: string;
  /**
   * Minimum value
   */
  min?: number | string;
  /**
   * Maximum value
   */
  max?: number | string;
  /**
   * Step increment
   */
  step?: number | string;
  /**
   * Start value for single slider or first handle in dual mode
   */
  start?: number | string;
  /**
   * Start value for second handle in dual mode
   */
  start2?: number | string;
  /**
   * Display value text
   */
  value?: string;
  /**
   * Current value(s) - modern API
   */
  values?: number[];
  /**
   * Value change handler - modern API
   */
  onValueChange?: (values: number[]) => void;
  /**
   * Show value labels on handles
   */
  showValueLabels?: boolean;
  /**
   * Show min/max labels
   */
  showMinMaxLabels?: boolean;
  /**
   * Show input fields for direct value entry
   */
  showInputs?: boolean;
  /**
   * Format function for value display
   */
  formatValue?: (value: number) => string;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Slider size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * CMS filter field for Finsweet integration
   */
  cmsFilterField?: string;
}

/**
 * SliderCtrl component using authentic Acrobi Design System styling
 *
 * This component uses CSS classes that map directly to the Acrobi design system,
 * ensuring authentic styling that matches the original devlink SliderCtrl component.
 *
 * Key features:
 * - Uses .slider, .slider_wrapper, .slider_track classes for authentic styling
 * - Supports both single and dual (range) slider modes
 * - Integrates with Finsweet Range Slider via fs-rangeslider-element attributes
 * - Provides modern React API alongside devlink compatibility
 * - Includes input fields for direct value entry
 * - CMS filter integration for price filtering
 *
 * @example
 * ```tsx
 * // Single slider (devlink API)
 * <SliderCtrl
 *   single={true}
 *   min="0"
 *   max="100"
 *   start="25"
 *   step="1"
 * />
 *
 * // Range slider (devlink API)
 * <SliderCtrl
 *   dual={true}
 *   min="0"
 *   max="1000"
 *   start="100"
 *   start2="800"
 *   step="10"
 * />
 *
 * // Modern API
 * <SliderCtrl
 *   values={[25, 75]}
 *   min={0}
 *   max={100}
 *   onValueChange={(values) => console.log('Values:', values)}
 *   showValueLabels={true}
 * />
 * ```
 */
const SliderCtrl = React.forwardRef<HTMLDivElement, SliderCtrlProps>(
  (
    {
      className,
      single = true,
      dual = false,
      wrapperId = 'wrapper',
      trackId = 'track',
      handleId = 'handle',
      fillId = 'fill',
      min = 0,
      max = 100,
      step = 1,
      start = 0,
      start2 = 100,
      value = 'display-value',
      values,
      onValueChange,
      showValueLabels = false,
      showMinMaxLabels = false,
      showInputs = true,
      formatValue = val => val.toString(),
      disabled = false,
      size = 'md',
      cmsFilterField = 'price',
      variant = 'default',
      ...props
    },
    ref
  ) => {
    // Convert string props to numbers for internal calculations
    const minNum = typeof min === 'string' ? parseFloat(min) : min;
    const maxNum = typeof max === 'string' ? parseFloat(max) : max;
    const stepNum = typeof step === 'string' ? parseFloat(step) : step;
    const startNum = typeof start === 'string' ? parseFloat(start) : start;
    const start2Num = typeof start2 === 'string' ? parseFloat(start2) : start2;

    // Determine if using modern API or devlink API
    const usingModernAPI = values !== undefined || onValueChange !== undefined;

    // Initialize state based on API mode
    const initialValues = usingModernAPI
      ? values || [startNum]
      : dual
        ? [startNum, start2Num]
        : [startNum];

    const [internalValues, setInternalValues] =
      React.useState<number[]>(initialValues);
    const [isDragging, setIsDragging] = React.useState<number | null>(null);
    const [inputValues, setInputValues] = React.useState<string[]>(
      initialValues.map(v => v.toString())
    );

    const trackRef = React.useRef<HTMLDivElement>(null);

    // Update internal values when values prop changes
    React.useEffect(() => {
      if (values) {
        setInternalValues(values);
        setInputValues(values.map(v => v.toString()));
      }
    }, [values]);

    const currentValues = values || internalValues;
    const isRange = dual || currentValues.length > 1;

    // Calculate handle positions as percentages
    const getHandlePosition = (value: number) => {
      return ((value - minNum) / (maxNum - minNum)) * 100;
    };

    // Calculate fill width and position
    const getFillStyle = () => {
      if (isRange && currentValues.length >= 2) {
        const leftPos = getHandlePosition(Math.min(...currentValues));
        const rightPos = getHandlePosition(Math.max(...currentValues));
        return {
          left: `${leftPos}%`,
          width: `${rightPos - leftPos}%`,
        };
      } else {
        return {
          left: '0%',
          width: `${getHandlePosition(currentValues[0] || 0)}%`,
        };
      }
    };

    // Handle mouse/touch events for dragging
    const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(index);
    };

    const handleMouseMove = React.useCallback(
      (e: MouseEvent) => {
        if (isDragging === null || !trackRef.current || disabled) return;

        const rect = trackRef.current.getBoundingClientRect();
        const percentage = Math.max(
          0,
          Math.min(1, (e.clientX - rect.left) / rect.width)
        );
        const newValue = minNum + percentage * (maxNum - minNum);
        const steppedValue = Math.round(newValue / stepNum) * stepNum;
        const clampedValue = Math.max(minNum, Math.min(maxNum, steppedValue));

        const newValues = [...currentValues];
        newValues[isDragging] = clampedValue;

        // For range sliders, ensure proper ordering
        if (isRange && newValues.length >= 2) {
          if (isDragging === 0 && clampedValue > newValues[1]) {
            newValues[0] = newValues[1];
          } else if (isDragging === 1 && clampedValue < newValues[0]) {
            newValues[1] = newValues[0];
          }
        }

        setInternalValues(newValues);
        setInputValues(newValues.map(v => v.toString()));
        onValueChange?.(newValues);
      },
      [
        isDragging,
        currentValues,
        minNum,
        maxNum,
        stepNum,
        disabled,
        isRange,
        onValueChange,
      ]
    );

    const handleMouseUp = React.useCallback(() => {
      setIsDragging(null);
    }, []);

    // Track click to set value
    const handleTrackClick = (e: React.MouseEvent) => {
      if (disabled || isDragging !== null) return;

      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;

      const percentage = (e.clientX - rect.left) / rect.width;
      const newValue = minNum + percentage * (maxNum - minNum);
      const steppedValue = Math.round(newValue / stepNum) * stepNum;
      const clampedValue = Math.max(minNum, Math.min(maxNum, steppedValue));

      let newValues: number[];

      if (isRange && currentValues.length >= 2) {
        // For range sliders, update the closest handle
        const distances = currentValues.map(val =>
          Math.abs(val - clampedValue)
        );
        const closestIndex = distances.indexOf(Math.min(...distances));
        newValues = [...currentValues];
        newValues[closestIndex] = clampedValue;
      } else {
        newValues = [clampedValue];
      }

      setInternalValues(newValues);
      setInputValues(newValues.map(v => v.toString()));
      onValueChange?.(newValues);
    };

    // Input change handlers
    const handleInputChange =
      (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = e.target.value;
        setInputValues(newInputValues);

        const numValue = parseFloat(e.target.value);
        if (!isNaN(numValue)) {
          const clampedValue = Math.max(minNum, Math.min(maxNum, numValue));
          const newValues = [...currentValues];
          newValues[index] = clampedValue;
          setInternalValues(newValues);
          onValueChange?.(newValues);
        }
      };

    // Mouse event listeners
    React.useEffect(() => {
      if (isDragging !== null) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const renderSlider = (mode: 'single' | 'dual') => (
      <div
        className={cn(sliderWrapperVariants({ mode }))}
        // Finsweet attributes for devlink compatibility
        fs-rangeslider-element={wrapperId}
        fs-rangeslider-min={min.toString()}
        fs-rangeslider-max={max.toString()}
        fs-rangeslider-step={step?.toString()}
        fs-rangeslider-formatdisplay='true'
      >
        {/* Slider Track */}
        <div
          ref={trackRef}
          className={cn(sliderTrackVariants({ size }))}
          fs-rangeslider-element={trackId}
          onClick={handleTrackClick}
        >
          {/* Slider Fill */}
          <div
            className={cn(sliderFillVariants())}
            fs-rangeslider-element={fillId}
            style={getFillStyle()}
          />

          {/* Slider Handles */}
          {currentValues.map((val, index) => (
            <div
              key={index}
              className={cn(
                sliderHandleVariants({
                  size,
                  state: disabled
                    ? 'disabled'
                    : isDragging === index
                      ? 'active'
                      : 'default',
                })
              )}
              fs-rangeslider-element={handleId}
              fs-rangeslider-start={
                mode === 'dual' && index === 1 ? start2 : start
              }
              style={{ left: `${getHandlePosition(val)}%` }}
              onMouseDown={handleMouseDown(index)}
            >
              {showValueLabels && (
                <div
                  className='slider_handle-value absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap'
                  data-fs='r3'
                >
                  {formatValue(val)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Fields */}
        {showInputs && (
          <>
            <input
              className='slider_input mt-2 px-3 py-2 border border-input rounded-md text-sm'
              type='text'
              value={inputValues[0] || ''}
              onChange={handleInputChange(0)}
              placeholder={mode === 'dual' ? 'From' : 'Value'}
              disabled={disabled}
              fs-cmsfilter-field={cmsFilterField}
              fs-cmsfilter-range='from'
            />

            {mode === 'dual' && (
              <input
                className='slider_input mt-2 px-3 py-2 border border-input rounded-md text-sm'
                type='text'
                value={inputValues[1] || ''}
                onChange={handleInputChange(1)}
                placeholder='To'
                disabled={disabled}
                fs-cmsfilter-field={cmsFilterField}
                fs-cmsfilter-range='to'
              />
            )}
          </>
        )}

        {/* Value Display for Dual Mode */}
        {mode === 'dual' && showMinMaxLabels && (
          <div
            className='slider_values flex justify-between mt-2 text-sm text-gray-600'
            data-fs='r3'
          >
            <div>{formatValue(Math.min(...currentValues))}</div>
            <div>{formatValue(Math.max(...currentValues))}</div>
          </div>
        )}
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(sliderCtrlVariants({ variant }), className)}
        {...props}
      >
        {/* Finsweet Comment */}
        <div className='code-embed-2 sr-only'>
          {/* This component is based off of the Finsweet Range Slider. Documentation here: https://finsweet.com/attributes/range-slider */}
        </div>

        {/* Render based on mode */}
        {single && !usingModernAPI && renderSlider('single')}
        {dual && !usingModernAPI && renderSlider('dual')}
        {usingModernAPI && renderSlider(isRange ? 'dual' : 'single')}

        {/* Min/Max Labels */}
        {showMinMaxLabels && (
          <div className='flex justify-between mt-1 text-xs text-gray-500'>
            <span>{formatValue(minNum)}</span>
            <span>{formatValue(maxNum)}</span>
          </div>
        )}
      </div>
    );
  }
);

SliderCtrl.displayName = 'SliderCtrl';

export {
  SliderCtrl,
  sliderCtrlVariants,
  sliderWrapperVariants,
  sliderTrackVariants,
  sliderHandleVariants,
  sliderFillVariants,
};
