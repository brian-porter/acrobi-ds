import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Label } from './label';
import { gsap } from 'gsap';

/**
 * Dialog variant styles using Acrobi Design System classes
 * This matches the devlink Dialog component pattern with authentic
 * Acrobi styling using specific CSS classes and data attributes
 */
const dialogVariants = cva(
  // Base styles - using authentic Acrobi dialog wrapper class
  'dialog_wrap fixed inset-0 z-50 flex items-center justify-center',
  {
    variants: {
      state: {
        open: 'opacity-100',
        closed: 'opacity-0 pointer-events-none',
      },
    },
    defaultVariants: {
      state: 'closed',
    },
  }
);

// Dialog background/overlay using authentic Acrobi patterns
const dialogBackgroundVariants = cva(
  'dialog_bg absolute inset-0 bg-black/50 backdrop-blur-sm',
  {
    variants: {
      scrim: {
        '10': '',
        '20': '',
        '30': '',
        '40': '',
        '50': '',
        '60': '',
        '70': '',
        '80': '',
        '90': '',
      },
      blur: {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
      },
    },
    defaultVariants: {
      scrim: '70',
      blur: '3',
    },
  }
);

// Dialog box/content container styling
const dialogBoxVariants = cva(
  'dialog_box relative bg-background rounded-lg max-w-lg w-full mx-4',
  {
    variants: {
      type: {
        modal: '',
        popup: '',
        alert: '',
        confirm: '',
      },
      shadow: {
        xs: '',
        s: '',
        m: '',
        l: '',
        xl: '',
      },
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw] max-h-[95vh]',
      },
    },
    defaultVariants: {
      type: 'modal',
      shadow: 'xl',
      size: 'md',
    },
  }
);

// Dialog content area styling
const dialogContentVariants = cva('dialog_content p-6', {
  variants: {
    variant: {
      default: '',
      compact: 'p-4',
      spacious: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// Dialog button styling
const dialogButtonVariants = cva(
  'absolute top-4 p-2 cursor-pointer transition-opacity hover:opacity-70',
  {
    variants: {
      type: {
        close: 'right-4',
        prev: 'left-4',
      },
    },
    defaultVariants: {
      type: 'close',
    },
  }
);

export interface DialogProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogBoxVariants> {
  /**
   * Dialog component visibility toggle (dialog in Webflow)
   */
  visible?: boolean;
  /**
   * Whether the dialog is open
   */
  open?: boolean;
  /**
   * Callback when dialog open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Show previous button (prevBtn in Webflow)
   */
  showPrevButton?: boolean;
  /**
   * Show close button (closeBtn in Webflow)
   */
  showCloseButton?: boolean;
  /**
   * Background click handler (bgClick in Webflow)
   */
  onBackgroundClick?: () => void;
  /**
   * Previous button click handler (prevClick in Webflow)
   */
  onPrevClick?: () => void;
  /**
   * Close button click handler (closeClick in Webflow)
   */
  onCloseClick?: () => void;
  /**
   * Dialog type (type in Webflow)
   */
  type?: 'modal' | 'popup' | 'alert' | 'confirm';
  /**
   * Background scrim opacity (scrim in Webflow)
   */
  scrim?: '10' | '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90';
  /**
   * Background blur amount (blur in Webflow)
   */
  blur?: '0' | '1' | '2' | '3' | '4' | '5';
  /**
   * Box shadow size (shdw in Webflow)
   */
  shadow?: 'xs' | 's' | 'm' | 'l' | 'xl';
  /**
   * Dialog content
   */
  children?: React.ReactNode;
  /**
   * Show scrim background
   */
  showScrim?: boolean;
  /**
   * Modal behavior
   */
  modal?: boolean;
  /**
   * Dialog type (alternative naming)
   */
  dialogType?: string;
  /**
   * Position anchor (anchor in Webflow)
   */
  anchor?: string;
  /**
   * Dialog size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /**
   * Whether clicking overlay closes dialog
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether pressing escape closes dialog
   */
  closeOnEscape?: boolean;

  // Legacy devlink API props for full backward compatibility
  /**
   * Dialog visibility (exact devlink API)
   */
  dialog?: boolean;
  /**
   * Show previous button (exact devlink API)
   */
  prevBtn?: boolean;
  /**
   * Show close button (exact devlink API)
   */
  closeBtn?: boolean;
  /**
   * Background click props (exact devlink API)
   */
  bgClick?: Record<string, any>;
  /**
   * Previous click props (exact devlink API)
   */
  prevClick?: Record<string, any>;
  /**
   * Close click props (exact devlink API)
   */
  closeClick?: Record<string, any>;
  /**
   * Shadow configuration (exact devlink API)
   */
  shdw?: 'xs' | 's' | 'm' | 'l' | 'xl';
  /**
   * Dialog content mapping (exact devlink API)
   */
  dialogMap?: React.ReactNode;

  /**
   * @deprecated Use showCloseButton prop instead
   */
  showCloseBtn?: boolean;
  /**
   * @deprecated Use children prop instead
   */
  title?: string;
  /**
   * @deprecated Use children prop instead
   */
  description?: string;
  /**
   * @deprecated Use children prop instead
   */
  footer?: React.ReactNode;
}

// Map scrim values to data attributes
const getScrimValue = (scrim: string | null | undefined): string => {
  const scrimMap: Record<string, string> = {
    '10': '10',
    '20': '20',
    '30': '30',
    '40': '40',
    '50': '50',
    '60': '60',
    '70': '70',
    '80': '80',
    '90': '90',
  };
  return scrimMap[scrim || '70'] || '70';
};

// Map blur values to data attributes
const getBlurValue = (blur: string | null | undefined): string => {
  const blurMap: Record<string, string> = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
  };
  return blurMap[blur || '3'] || '3';
};

// Map shadow values to data attributes
const getShadowValue = (shadow: string | null | undefined): string => {
  const shadowMap: Record<string, string> = {
    xs: 'xs',
    s: 's',
    m: 'm',
    l: 'l',
    xl: 'xl',
  };
  return shadowMap[shadow || 'xl'] || 'xl';
};

/**
 * Dialog component using authentic Acrobi Design System styling
 *
 * This component provides full backward compatibility with the devlink Dialog API
 * while offering modern React patterns and TypeScript support. It uses CSS classes
 * that map directly to the Acrobi design system for authentic styling.
 *
 * Key features:
 * - Uses .dialog_wrap, .dialog_bg, .dialog_box classes for authentic styling
 * - Uses .dialog_content for content area styling
 * - Uses data attributes for styling (data-scrim, data-blur, data-bs, data-type)
 * - Full devlink API compatibility (dialog, prevBtn, closeBtn, bgClick, etc.)
 * - Integrates with Label component for button styling using legacy props
 * - Supports interactive animations and state management
 * - Uses Webflow interaction system for show/hide animations
 * - Modern React patterns with state management and TypeScript
 *
 * @example
 * ```tsx
 * // Modern API
 * <Dialog
 *   open={true}
 *   type="modal"
 *   scrim="70"
 *   blur="3"
 *   shadow="xl"
 *   showCloseButton={true}
 *   onCloseClick={() => setOpen(false)}
 * >
 *   <div>Dialog content goes here</div>
 * </Dialog>
 *
 * // Legacy devlink API (fully supported)
 * <Dialog
 *   dialog={true}
 *   prevBtn={true}
 *   closeBtn={true}
 *   type="modal"
 *   scrim="70"
 *   blur="3"
 *   shdw="xl"
 *   bgClick={{ onClick: () => setOpen(false) }}
 *   closeClick={{ onClick: () => setOpen(false) }}
 *   dialogMap={<div>Content here</div>}
 * />
 * ```
 */
const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      className,
      visible = true,
      open = false,
      onOpenChange,
      showPrevButton = false,
      showCloseButton = true,
      onBackgroundClick,
      onPrevClick,
      onCloseClick,
      type = 'modal',
      scrim = '70',
      blur = '3',
      shadow = 'xl',
      size = 'md',
      children,
      anchor,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      // Legacy devlink API props
      dialog,
      prevBtn,
      closeBtn,
      bgClick,
      prevClick,
      closeClick,
      shdw,
      dialogMap,
      // Deprecated props for backward compatibility
      title,
      description,
      footer,
      ...props
    },
    ref
  ) => {
    // Handle legacy devlink API props with priority over modern props
    const actualVisible = dialog !== undefined ? dialog : visible;
    const actualOpen = dialog !== undefined ? dialog : open;
    const actualShowPrevButton =
      prevBtn !== undefined ? prevBtn : showPrevButton;
    const actualShowCloseButton =
      closeBtn !== undefined ? closeBtn : showCloseButton;
    const actualShadow = shdw || shadow;
    const actualContent = dialogMap || children;
    // Don't render if not visible
    if (!actualVisible) return null;

    const dialogRef = React.useRef<HTMLDivElement>(null);
    const dialogBoxRef = React.useRef<HTMLDivElement>(null);
    const backgroundRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => dialogRef.current!, []);

    // GSAP animations for "fade and grow" entry/exit
    React.useEffect(() => {
      if (!dialogRef.current || !dialogBoxRef.current || !backgroundRef.current) return;

      const dialog = dialogRef.current;
      const dialogBox = dialogBoxRef.current;
      const background = backgroundRef.current;

      if (actualOpen) {
        // Entry animation: "fade and grow"
        gsap.set(dialog, { display: 'flex' });
        gsap.set(background, { opacity: 0 });
        gsap.set(dialogBox, { opacity: 0, scale: 0.8 });

        const tl = gsap.timeline();
        tl.to(background, { 
          opacity: 1, 
          duration: 0.2, 
          ease: 'power2.out' 
        })
        .to(dialogBox, { 
          opacity: 1, 
          scale: 1, 
          duration: 0.3, 
          ease: 'back.out(1.7)' 
        }, 0.1);
      } else {
        // Exit animation: reverse "fade and grow"
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(dialog, { display: 'none' });
          }
        });
        tl.to(dialogBox, { 
          opacity: 0, 
          scale: 0.8, 
          duration: 0.2, 
          ease: 'power2.in' 
        })
        .to(background, { 
          opacity: 0, 
          duration: 0.15, 
          ease: 'power2.in' 
        }, 0.1);
      }
    }, [actualOpen]);

    // Handle escape key
    React.useEffect(() => {
      if (!actualOpen || !closeOnEscape) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onOpenChange?.(false);
          onCloseClick?.();
          // Support legacy devlink closeClick props
          if (closeClick?.onClick) {
            closeClick.onClick();
          }
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [actualOpen, closeOnEscape, onOpenChange, onCloseClick, closeClick]);

    // Handle body scroll lock
    React.useEffect(() => {
      if (actualOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [actualOpen]);

    // Focus management
    React.useEffect(() => {
      if (actualOpen && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        firstElement?.focus();
      }
    }, [actualOpen]);

    const handleBackgroundClick = () => {
      if (closeOnOverlayClick) {
        onOpenChange?.(false);
      }
      onBackgroundClick?.();
      // Support legacy devlink bgClick props
      if (bgClick?.onClick) {
        bgClick.onClick();
      }
    };

    const handleCloseClick = () => {
      onOpenChange?.(false);
      onCloseClick?.();
      // Support legacy devlink closeClick props
      if (closeClick?.onClick) {
        closeClick.onClick();
      }
    };

    const handlePrevClick = () => {
      onPrevClick?.();
      // Support legacy devlink prevClick props
      if (prevClick?.onClick) {
        prevClick.onClick();
      }
    };

    // Always render but let GSAP control visibility
    return (
      <div
        className={cn(
          'dialog_wrap fixed inset-0 z-50 items-center justify-center',
          className
        )}
        style={{ display: 'none' }} // Initially hidden, GSAP will show it
        data-w-id='cd25656a-27bc-2427-e81d-4e8f34f13922'
        ref={dialogRef}
        {...props}
      >
        {/* Dialog Background/Overlay */}
        <div
          ref={backgroundRef}
          className={cn(dialogBackgroundVariants({ scrim, blur }))}
          data-scrim={getScrimValue(scrim)}
          data-blur={getBlurValue(blur)}
          onClick={handleBackgroundClick}
          {...bgClick}
        />

        {/* Dialog Box */}
        <div
          ref={dialogBoxRef}
          className={cn(
            dialogBoxVariants({ type, shadow: actualShadow, size })
          )}
          data-bs={getShadowValue(actualShadow)}
          data-type={type}
          {...(anchor && { 'position-anchor': anchor })}
          role='dialog'
          aria-modal='true'
          onClick={e => e.stopPropagation()}
        >
          {/* Previous Button */}
          {actualShowPrevButton && (
            <div
              className={cn(
                dialogButtonVariants({ type: 'prev' }),
                'dialog_prev-btn'
              )}
              onClick={handlePrevClick}
              {...prevClick}
            >
              <Label
                txt={false}
                txtSrc='Previous'
                icnSrc='Nav_left'
                lblSz='r1'
                lblShad='y'
                lblClr='n700'
              />
            </div>
          )}

          {/* Close Button */}
          {actualShowCloseButton && (
            <div
              className={cn(
                dialogButtonVariants({ type: 'close' }),
                'dialog_close-btn'
              )}
              id='closeModalLink'
              onClick={handleCloseClick}
              {...closeClick}
            >
              <Label
                txt={false}
                txtSrc='Close'
                icnSrc='Close'
                lblSz='r1'
                lblShad='y'
                lblClr='n700'
              />
            </div>
          )}

          {/* Dialog Content */}
          <div className={cn(dialogContentVariants())}>
            {/* Backward compatibility for legacy props */}
            {title && (
              <h2 id='dialog-title' className='text-lg font-semibold mb-2'>
                {title}
              </h2>
            )}
            {description && (
              <p
                id='dialog-description'
                className='text-sm text-muted-foreground mb-4'
              >
                {description}
              </p>
            )}

            {actualContent}

            {/* Backward compatibility for footer */}
            {footer && (
              <div className='flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4'>
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Dialog.displayName = 'Dialog';

export { Dialog, dialogContentVariants };
