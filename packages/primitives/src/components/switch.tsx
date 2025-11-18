import * as React from 'react';
import { cn } from '../lib/utils';
import { Label } from './label';

// Import CSS styles to ensure proper Acrobi styling
import './switch.css';

export interface SwitchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Label text for the switch field
   */
  label?: string;
  /**
   * Whether the switch is checked
   */
  checked?: boolean;
  /**
   * Callback when switch state changes
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;
  /**
   * Feedback message to show below the toggle
   */
  feedback?: string;
  /**
   * Toggle ID for form integration
   */
  toggleId?: string;
  /**
   * Toggle name for form integration
   */
  toggleName?: string;
  /**
   * Toggle value for form integration
   */
  toggleValue?: string;
  /**
   * Tab order
   */
  tabOrder?: number;
}

/**
 * Switch component following Acrobi Design System field pattern
 *
 * This component matches the Webflow Toggle Field implementation:
 * - Vertical field layout: label above, toggle control, feedback below
 * - Uses authentic Acrobi CSS classes (.toggle-ctrl, .toggletrack, .toggledrag)
 * - Clean minimal design with proper form integration
 * - Supports ON/OFF toggle states with visual feedback
 *
 * @example
 * ```tsx
 * <Switch
 *   label="Enable notifications"
 *   checked={true}
 *   onCheckedChange={setChecked}
 * />
 *
 * <Switch
 *   label="Marketing emails"
 *   feedback="This setting controls email preferences"
 *   checked={false}
 *   disabled={true}
 * />
 * ```
 */
const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(
  (
    {
      className,
      label,
      checked = false,
      onCheckedChange,
      disabled = false,
      feedback,
      toggleId = 'switch',
      toggleName = 'switch',
      toggleValue = 'on',
      tabOrder = 0,
      onClick,
      ...props
    },
    ref
  ) => {
    const fieldRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => fieldRef.current!, []);

    const handleToggleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;

      onCheckedChange?.(!checked);
      onClick?.(event);
    };

    const handleLabelClick = () => {
      if (disabled) return;
      onCheckedChange?.(!checked);
    };

    return (
      <div ref={fieldRef} className={cn('switch-field', className)} {...props}>
        {/* Field Label */}
        {label && (
          <Label
            text={label}
            size='r3'
            color={disabled ? 'n500' : 'n999'}
            showIcon={false}
            className='switch-field-label cursor-pointer'
            onClick={handleLabelClick}
          />
        )}

        {/* Toggle Control */}
        <div className='toggle-wrapper'>
          <div
            className='toggle-ctrl'
            tabIndex={tabOrder}
            data-togl-id={toggleId}
            data-togl-value={toggleValue}
            data-togl-name={toggleName}
            role='switch'
            aria-checked={checked}
            aria-disabled={disabled}
            onClick={handleToggleClick}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
          >
            {/* Hidden input for form compatibility */}
            <input
              type='checkbox'
              name={toggleName}
              value={toggleValue}
              checked={checked}
              onChange={() => {}} // Handled by onClick
              className='sr-only'
              disabled={disabled}
            />

            {/* Toggle Track */}
            <div className='toggletrack'>
              {/* Toggle Thumb/Drag */}
              <div
                className='toggledrag'
                style={{
                  transform: checked ? 'translateX(24px)' : 'translateX(0px)',
                  transition: 'transform 0.2s ease',
                }}
              />
            </div>
          </div>
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div className='switch-feedback'>
            <Label text={feedback} size='r3' color='fd500' showIcon={false} />
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export { Switch };
