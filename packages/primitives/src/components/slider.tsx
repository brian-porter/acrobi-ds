import * as React from 'react';
import { cn } from '../lib/utils';
import { Label } from './label';

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Field label text (positioned above slider)
   */
  label?: string;
  /**
   * Slider type - single or dual handle
   */
  type?: 'single' | 'dual';
  /**
   * Minimum value
   */
  min?: number;
  /**
   * Maximum value
   */
  max?: number;
  /**
   * Step increment
   */
  step?: number;
  /**
   * Starting value for first handle
   */
  start?: number;
  /**
   * Starting value for second handle (dual mode only)
   */
  start2?: number;
  /**
   * Current value(s) for controlled component
   */
  value?: number[];
  /**
   * Callback when value changes
   */
  onValueChange?: (value: number[]) => void;
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean;
  /**
   * Whether to show value labels
   */
  showLabels?: boolean;
  /**
   * Custom label formatter
   */
  formatLabel?: (value: number) => string;
  /**
   * Wrapper ID for Finsweet attributes
   */
  wrapperId?: string;
  /**
   * Track ID for Finsweet attributes
   */
  trackId?: string;
  /**
   * Handle ID for Finsweet attributes
   */
  handleId?: string;
  /**
   * Fill ID for Finsweet attributes
   */
  fillId?: string;
  /**
   * Whether to show input fields (hidden by default)
   */
  showInputs?: boolean;
  /**
   * Component visibility toggle
   */
  visible?: boolean;
}

/**
 * Slider component using authentic Acrobi Design System styling
 *
 * This component matches the devlink SliderCtrl component exactly,
 * using authentic CSS classes from the Acrobi design system.
 * Based on the Finsweet Range Slider system.
 *
 * Key features:
 * - Field structure with label positioned above slider
 * - Uses authentic .slider, .slider_wrapper, .slider_track classes
 * - Blue color scheme matching Acrobi design (var(--color--p500))
 * - Circular handle with proper positioning
 * - Supports single and dual handle configurations
 * - Finsweet Range Slider integration for functionality
 *
 * @example
 * ```tsx
 * <Slider
 *   label="Price Range"
 *   type="single"
 *   min={0}
 *   max={100}
 *   start={30}
 * />
 *
 * <Slider
 *   label="Age Range"
 *   type="dual"
 *   min={18}
 *   max={65}
 *   start={25}
 *   start2={45}
 *   showLabels={true}
 * />
 * ```
 */
const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      label,
      type = 'single',
      min = 0,
      max = 100,
      step = 1,
      start = 0,
      start2 = 100,
      value,
      onValueChange,
      disabled = false,
      showLabels = false,
      formatLabel = value => value.toString(),
      wrapperId = 'wrapper',
      trackId = 'track',
      handleId = 'handle',
      fillId = 'fill',
      showInputs = false,
      visible = true,
      ...props
    },
    ref
  ) => {
    // Don't render if not visible
    if (!visible) return null;

    const [internalValue, setInternalValue] = React.useState<number[]>(
      value || [start, start2]
    );

    const currentValue = value || internalValue;
    const single = type === 'single';
    const dual = type === 'dual';

    const handleValueChange = (newValue: number[]) => {
      if (!value) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <div className={cn('field-wrapper', className)} {...props} ref={ref}>
        {/* Field Label (positioned above slider like in screenshot) */}
        {label && (
          <label className='block text-sm font-normal text-gray-900 mb-3'>
            {label}
          </label>
        )}

        {/* Slider Container */}
        <div className='slider'>
          {/* Finsweet Range Slider Documentation Comment */}
          <div
            className='code-embed-2'
            style={{ display: 'none' }}
            dangerouslySetInnerHTML={{
              __html:
                '<!-- This component is based off of the Finsweet Range Slider. Documentation here: https://finsweet.com/attributes/range-slider -->',
            }}
          />

          {/* Single Handle Slider */}
          {single && (
            <div
              className='slider_wrapper'
              {...{
                'fs-rangeslider-element': wrapperId,
                'fs-rangeslider-min': min.toString(),
                'fs-rangeslider-max': max.toString(),
                'fs-rangeslider-step': step?.toString(),
                'fs-rangeslider-formatdisplay': 'true',
              }}
            >
              <div
                className='slider_track'
                {...{ 'fs-rangeslider-element': trackId }}
              >
                <div
                  className='slider_handle'
                  {...{ 'fs-rangeslider-element': handleId }}
                >
                  <div className='slider_handle-value' data-fs='r3' />
                </div>
                <div
                  className='slider_fill'
                  {...{ 'fs-rangeslider-element': fillId }}
                />
              </div>

              {showInputs && (
                <input
                  className='slider_input'
                  autoFocus={false}
                  maxLength={256}
                  name='slider-value'
                  placeholder='From'
                  type='text'
                  disabled={disabled}
                  required={false}
                />
              )}
            </div>
          )}

          {/* Dual Handle Slider */}
          {dual && (
            <div
              className='slider_wrapper'
              {...{
                'fs-rangeslider-element': wrapperId,
                'fs-rangeslider-min': min.toString(),
                'fs-rangeslider-max': max.toString(),
                'fs-rangeslider-formatdisplay': 'true',
                'fs-rangeslider-step': step?.toString(),
              }}
            >
              <div
                className='slider_track'
                {...{ 'fs-rangeslider-element': trackId }}
              >
                <div
                  className='slider_handle'
                  {...{
                    'fs-rangeslider-element': handleId,
                    'fs-rangeslider-start': start.toString(),
                  }}
                />
                <div
                  className='slider_handle'
                  {...{
                    'fs-rangeslider-element': handleId,
                    'fs-rangeslider-start': start2.toString(),
                  }}
                />
                <div
                  className='slider_fill'
                  {...{ 'fs-rangeslider-element': fillId }}
                />
              </div>

              {showInputs && (
                <>
                  <input
                    className='slider_input'
                    autoFocus={false}
                    maxLength={256}
                    name='slider-from'
                    placeholder='From'
                    type='text'
                    disabled={disabled}
                    required={false}
                  />
                  <input
                    className='slider_input'
                    autoFocus={false}
                    maxLength={256}
                    name='slider-to'
                    placeholder='To'
                    type='text'
                    disabled={disabled}
                    required={false}
                  />
                </>
              )}

              {/* Slider Values Display */}
              {showLabels && (
                <div className='slider_values' data-fs='r3'>
                  <div>{formatLabel(Math.min(...currentValue))}</div>
                  <div>{formatLabel(Math.max(...currentValue))}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
