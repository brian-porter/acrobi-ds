import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { useSheet } from '../providers/sheet-provider';
import { SecHead } from '../structures/sec-head';
import { InputWBtns } from '../structures/input-w-btns';
import { SwitchField } from '../structures/switch-field';
import { Button } from '../primitives/button';

const copyVariants = cva('w-full space-y-6', {
  variants: {
    size: {
      sm: 'max-w-sm',
      default: 'max-w-md',
      lg: 'max-w-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface CopyableObject {
  id: string;
  name: string;
  type: string;
  icon?: string;
  hasSettings?: boolean;
  settingsPreservable?: boolean;
}

export interface CopyOptions {
  /**
   * New name for the copied object
   */
  name: string;
  /**
   * Whether to clear original settings
   */
  clearSettings: boolean;
  /**
   * Additional copy options
   */
  [key: string]: any;
}

export interface CopyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onCopy'>,
    VariantProps<typeof copyVariants> {
  /**
   * Object being copied
   */
  object: CopyableObject;
  /**
   * Initial copy name (defaults to "{OriginalName} Copy")
   */
  initialName?: string;
  /**
   * Whether clear settings is enabled by default
   * @default true
   */
  defaultClearSettings?: boolean;
  /**
   * Whether to show the clear settings option
   * @default true
   */
  showClearSettings?: boolean;
  /**
   * Additional copy options to display
   */
  additionalOptions?: Array<{
    key: string;
    label: string;
    description?: string;
    type: 'switch' | 'select';
    defaultValue?: any;
    options?: Array<{ label: string; value: any }>;
  }>;
  /**
   * Callback when copy is confirmed
   */
  onCopy?: (copyOptions: CopyOptions) => void;
  /**
   * Custom placeholder for name input
   */
  namePlaceholder?: string;
  /**
   * Custom title
   */
  title?: string;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Whether to auto-focus the name input
   * @default true
   */
  autoFocus?: boolean;
}

const Copy = React.forwardRef<HTMLDivElement, CopyProps>(
  (
    {
      className,
      object,
      initialName,
      defaultClearSettings = true,
      showClearSettings = true,
      additionalOptions = [],
      onCopy,
      namePlaceholder,
      title,
      loading = false,
      autoFocus = true,
      size,
      ...props
    },
    ref
  ) => {
    const { closeSheet } = useSheet();

    // Generate default copy name
    const defaultCopyName = React.useMemo(() => {
      return initialName || `${object.name} Copy`;
    }, [initialName, object.name]);

    // Form state
    const [copyName, setCopyName] = React.useState(defaultCopyName);
    const [clearSettings, setClearSettings] =
      React.useState(defaultClearSettings);
    const [additionalValues, setAdditionalValues] = React.useState<
      Record<string, any>
    >(() => {
      const initial: Record<string, any> = {};
      additionalOptions.forEach(option => {
        initial[option.key] = option.defaultValue;
      });
      return initial;
    });
    const [isProcessing, setIsProcessing] = React.useState(false);

    const displayTitle = title || `Copy ${object.type}`;
    const displayPlaceholder = namePlaceholder || `${object.type} name`;

    // Handle additional option change
    const handleAdditionalValueChange = React.useCallback(
      (key: string, value: any) => {
        setAdditionalValues(prev => ({ ...prev, [key]: value }));
      },
      []
    );

    // Handle copy
    const handleCopy = React.useCallback(async () => {
      if (!copyName.trim()) return;

      setIsProcessing(true);

      try {
        const copyOptions: CopyOptions = {
          name: copyName.trim(),
          clearSettings,
          ...additionalValues,
        };

        await onCopy?.(copyOptions);
        closeSheet();
      } catch (error) {
        console.error('Failed to copy object:', error);
      } finally {
        setIsProcessing(false);
      }
    }, [copyName, clearSettings, additionalValues, onCopy, closeSheet]);

    // Handle cancel
    const handleCancel = React.useCallback(() => {
      closeSheet();
    }, [closeSheet]);

    return (
      <div
        ref={ref}
        className={cn(copyVariants({ size }), className)}
        {...props}
      >
        {/* Header */}
        <SecHead
          title={displayTitle}
          titleIcon={object.icon || '📋'}
          size='lg'
        />

        {/* Original object preview */}
        <div className='p-4 bg-muted/30 rounded-lg border'>
          <div className='flex items-center gap-3'>
            {object.icon && (
              <span className='text-2xl' aria-hidden='true'>
                {object.icon}
              </span>
            )}
            <div>
              <h4 className='font-medium'>{object.name}</h4>
              <p className='text-sm text-muted-foreground capitalize'>
                {object.type}
              </p>
            </div>
          </div>
        </div>

        {/* Copy form */}
        <div className='space-y-4'>
          {/* Name input */}
          <div>
            <label className='text-sm font-medium block mb-2'>Copy Name</label>
            <InputWBtns
              value={copyName}
              onChange={e => setCopyName(e.target.value)}
              placeholder={displayPlaceholder}
              leftIcon='📋'
              autoFocus={autoFocus}
              buttons={[]}
            />
          </div>

          {/* Clear settings option */}
          {showClearSettings && object.settingsPreservable !== false && (
            <SwitchField
              label='Clear original settings'
              description='When enabled, the copy will have fresh settings and permissions'
              checked={clearSettings}
              onCheckedChange={setClearSettings}
            />
          )}

          {/* Additional options */}
          {additionalOptions.map(option => (
            <div key={option.key}>
              {option.type === 'switch' ? (
                <SwitchField
                  label={option.label}
                  description={option.description}
                  checked={additionalValues[option.key] || false}
                  onCheckedChange={checked =>
                    handleAdditionalValueChange(option.key, checked)
                  }
                />
              ) : null}
            </div>
          ))}
        </div>

        {/* Copy info */}
        <div className='text-sm text-muted-foreground bg-blue-50 border border-blue-200 rounded-lg p-3'>
          <div className='flex items-start gap-2'>
            <span className='text-blue-600'>ℹ️</span>
            <div>
              <p>
                This will create a copy of "{object.name}" with the name "
                {copyName}".
              </p>
              {clearSettings && object.hasSettings && (
                <p className='mt-1'>
                  Original settings will be cleared and you can configure new
                  ones.
                </p>
              )}
              {!clearSettings && object.hasSettings && (
                <p className='mt-1'>
                  All original settings and permissions will be preserved.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='flex gap-3 pt-4'>
          <Button
            variant='outline'
            onClick={handleCancel}
            disabled={isProcessing || loading}
            className='flex-1'
          >
            Cancel
          </Button>
          <Button
            onClick={handleCopy}
            disabled={!copyName.trim() || isProcessing || loading}
            className='flex-1'
          >
            {isProcessing || loading ? 'Copying...' : 'Create Copy'}
          </Button>
        </div>
      </div>
    );
  }
);

Copy.displayName = 'Copy';

export { Copy, copyVariants };
