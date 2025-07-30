import * as React from 'react';
import { Drawer } from 'vaul';

// Sheet context interface
interface SheetContextValue {
  openSheet: (content: React.ReactNode, options?: SheetOptions) => void;
  closeSheet: () => void;
  isOpen: boolean;
}

// Sheet configuration options
export interface SheetOptions {
  /**
   * Whether the sheet can be dismissed by clicking outside
   * @default true
   */
  dismissible?: boolean;
  /**
   * Snap points for the sheet (percentage values)
   * @default undefined
   */
  snapPoints?: (string | number)[];
  /**
   * Default snap point index
   * @default undefined
   */
  activeSnapPoint?: string | number;
  /**
   * Custom CSS class for the overlay
   */
  overlayClassName?: string;
  /**
   * Custom CSS class for the content
   */
  contentClassName?: string;
  /**
   * Whether to show the drag handle
   * @default true
   */
  showHandle?: boolean;
  /**
   * Callback when sheet is opened
   */
  onOpen?: () => void;
  /**
   * Callback when sheet is closed
   */
  onClose?: () => void;
  /**
   * Modal mode - prevents interaction with background
   * @default true
   */
  modal?: boolean;
}

// Default options
const defaultOptions: SheetOptions = {
  dismissible: true,
  showHandle: true,
  modal: true,
};

// Create context
const SheetContext = React.createContext<SheetContextValue | undefined>(
  undefined
);

// Custom hook to use sheet context
export function useSheet(): SheetContextValue {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error('useSheet must be used within a SheetProvider');
  }
  return context;
}

// Sheet provider props
interface SheetProviderProps {
  children: React.ReactNode;
}

/**
 * Global Sheet Provider using Vaul library
 * Provides bottom sheet functionality throughout the application
 */
export function SheetProvider({ children }: SheetProviderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState<React.ReactNode>(null);
  const [options, setOptions] = React.useState<SheetOptions>(defaultOptions);

  const openSheet = React.useCallback(
    (sheetContent: React.ReactNode, sheetOptions?: SheetOptions) => {
      const mergedOptions = { ...defaultOptions, ...sheetOptions };
      setContent(sheetContent);
      setOptions(mergedOptions);
      setIsOpen(true);
      mergedOptions.onOpen?.();
    },
    []
  );

  const closeSheet = React.useCallback(() => {
    setIsOpen(false);
    options.onClose?.();
    // Clear content after animation completes
    setTimeout(() => {
      setContent(null);
    }, 200);
  }, [options]);

  const contextValue: SheetContextValue = React.useMemo(
    () => ({
      openSheet,
      closeSheet,
      isOpen,
    }),
    [openSheet, closeSheet, isOpen]
  );

  return (
    <SheetContext.Provider value={contextValue}>
      {children}

      <Drawer.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        dismissible={options.dismissible}
        snapPoints={options.snapPoints}
        activeSnapPoint={options.activeSnapPoint}
        modal={options.modal}
        onClose={closeSheet}
      >
        <Drawer.Portal>
          <Drawer.Overlay
            className={`fixed inset-0 bg-black/40 ${options.overlayClassName || ''}`}
          />
          <Drawer.Content
            className={`
              bg-background flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 h-[96%] max-h-[96%]
              ${options.contentClassName || ''}
            `}
          >
            {options.showHandle && (
              <div className='p-4 pb-0'>
                <div className='w-12 h-1.5 bg-muted rounded-full mx-auto' />
              </div>
            )}

            <div className='flex-1 overflow-auto p-4'>{content}</div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </SheetContext.Provider>
  );
}

// Export sheet components for custom usage
export { Drawer };
