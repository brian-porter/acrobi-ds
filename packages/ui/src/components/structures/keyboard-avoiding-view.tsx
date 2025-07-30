import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { useVisualViewport } from '../../hooks/use-visual-viewport';

// Types
export interface KeyboardAvoidingViewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Children to render inside the keyboard avoiding view */
  children?: React.ReactNode;
  /** Whether to use padding or margin for avoidance (default: 'padding') */
  avoidanceType?: 'padding' | 'margin';
  /** Whether to enable smooth transitions (default: true) */
  enableTransitions?: boolean;
  /** Transition duration in milliseconds (default: 300) */
  transitionDuration?: number;
  /** Additional offset to add to keyboard height (default: 0) */
  extraOffset?: number;
  /** Whether to only apply avoidance on mobile devices (default: true) */
  mobileOnly?: boolean;
  /** Custom easing function for transitions (default: 'ease-in-out') */
  transitionEasing?: string;
  /** Whether to show debug information (default: false) */
  debug?: boolean;
  /** Minimum keyboard height to trigger avoidance (default: 50) */
  minKeyboardHeight?: number;
}

/**
 * KeyboardAvoidingView - A container component that automatically adjusts its layout
 * when the on-screen keyboard appears, preventing content from being hidden.
 *
 * This component is essential for AAEs that need to provide a native-like experience
 * when users interact with form inputs on mobile devices.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <KeyboardAvoidingView>
 *   <form>
 *     <input placeholder="Your name" />
 *     <input placeholder="Your email" />
 *     <button>Submit</button>
 *   </form>
 * </KeyboardAvoidingView>
 *
 * // With custom settings
 * <KeyboardAvoidingView
 *   avoidanceType="margin"
 *   extraOffset={20}
 *   transitionDuration={500}
 * >
 *   <div>Content that needs to stay visible</div>
 * </KeyboardAvoidingView>
 * ```
 */
export const KeyboardAvoidingView = forwardRef<
  HTMLDivElement,
  KeyboardAvoidingViewProps
>(
  (
    {
      children,
      className,
      style,
      avoidanceType = 'padding',
      enableTransitions = true,
      transitionDuration = 300,
      extraOffset = 0,
      mobileOnly = true,
      transitionEasing = 'ease-in-out',
      debug = false,
      minKeyboardHeight = 50,
      ...props
    },
    ref
  ) => {
    const {
      isKeyboardOpen,
      keyboardHeight,
      isSupported,
      viewportHeight,
      viewportWidth,
    } = useVisualViewport({
      keyboardThreshold: minKeyboardHeight,
      debug,
    });

    // Calculate avoidance offset
    const shouldAvoid = isKeyboardOpen && keyboardHeight >= minKeyboardHeight;
    const avoidanceOffset = shouldAvoid ? keyboardHeight + extraOffset : 0;

    // Apply mobile-only logic
    const isLikelyMobile =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth <= 768);

    const shouldApplyAvoidance = mobileOnly ? isLikelyMobile : true;
    const finalOffset = shouldApplyAvoidance ? avoidanceOffset : 0;

    // Build dynamic styles
    const dynamicStyles: React.CSSProperties = {
      ...style,
      ...(avoidanceType === 'padding' && { paddingBottom: finalOffset }),
      ...(avoidanceType === 'margin' && { marginBottom: finalOffset }),
      ...(enableTransitions && {
        transition: `${avoidanceType}-bottom ${transitionDuration}ms ${transitionEasing}`,
      }),
    };

    // Debug information
    const debugInfo = debug && (
      <div
        style={{
          position: 'fixed',
          top: 10,
          right: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          fontFamily: 'monospace',
          zIndex: 9999,
          lineHeight: 1.3,
        }}
      >
        <div>
          <strong>KeyboardAvoidingView Debug</strong>
        </div>
        <div>API Supported: {isSupported ? '✅' : '❌'}</div>
        <div>Mobile Device: {isLikelyMobile ? '✅' : '❌'}</div>
        <div>Keyboard Open: {isKeyboardOpen ? '✅' : '❌'}</div>
        <div>Keyboard Height: {keyboardHeight}px</div>
        <div>
          Viewport: {viewportWidth}×{viewportHeight}
        </div>
        <div>Avoidance Offset: {finalOffset}px</div>
        <div>Avoidance Type: {avoidanceType}</div>
      </div>
    );

    return (
      <>
        <div
          ref={ref}
          className={cn(
            'keyboard-avoiding-view',
            // Add data attributes for CSS targeting
            shouldAvoid && 'keyboard-avoiding-view--active',
            !isSupported && 'keyboard-avoiding-view--unsupported',
            className
          )}
          style={dynamicStyles}
          data-keyboard-open={isKeyboardOpen}
          data-keyboard-height={keyboardHeight}
          data-avoidance-offset={finalOffset}
          {...props}
        >
          {children}
        </div>
        {debugInfo}
      </>
    );
  }
);

KeyboardAvoidingView.displayName = 'KeyboardAvoidingView';

// Export additional utilities
export const keyboardAvoidingViewStyles = {
  /**
   * CSS class that can be used to style the keyboard avoiding view
   */
  container: 'keyboard-avoiding-view',
  active: 'keyboard-avoiding-view--active',
  unsupported: 'keyboard-avoiding-view--unsupported',
};

/**
 * Higher-order component version of KeyboardAvoidingView
 *
 * @example
 * ```tsx
 * const MyFormWithKeyboardAvoidance = withKeyboardAvoidance(MyForm);
 * ```
 */
export function withKeyboardAvoidance<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  avoidanceProps?: Partial<KeyboardAvoidingViewProps>
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const WithKeyboardAvoidanceComponent = (props: P) => (
    <KeyboardAvoidingView {...avoidanceProps}>
      <WrappedComponent {...props} />
    </KeyboardAvoidingView>
  );

  WithKeyboardAvoidanceComponent.displayName = `withKeyboardAvoidance(${displayName})`;

  return WithKeyboardAvoidanceComponent;
}

/**
 * React hook to get keyboard avoidance styles directly
 * Useful when you need to apply the styles to existing components
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const avoidanceStyles = useKeyboardAvoidanceStyles({ extraOffset: 20 });
 *
 *   return (
 *     <div style={avoidanceStyles}>
 *       Content that needs keyboard avoidance
 *     </div>
 *   );
 * }
 * ```
 */
export function useKeyboardAvoidanceStyles(
  options: {
    avoidanceType?: 'padding' | 'margin';
    extraOffset?: number;
    enableTransitions?: boolean;
    transitionDuration?: number;
    transitionEasing?: string;
    mobileOnly?: boolean;
    minKeyboardHeight?: number;
  } = {}
): React.CSSProperties {
  const {
    avoidanceType = 'padding',
    extraOffset = 0,
    enableTransitions = true,
    transitionDuration = 300,
    transitionEasing = 'ease-in-out',
    mobileOnly = true,
    minKeyboardHeight = 50,
  } = options;

  const { isKeyboardOpen, keyboardHeight } = useVisualViewport({
    keyboardThreshold: minKeyboardHeight,
  });

  const shouldAvoid = isKeyboardOpen && keyboardHeight >= minKeyboardHeight;
  const avoidanceOffset = shouldAvoid ? keyboardHeight + extraOffset : 0;

  const isLikelyMobile =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth <= 768);

  const shouldApplyAvoidance = mobileOnly ? isLikelyMobile : true;
  const finalOffset = shouldApplyAvoidance ? avoidanceOffset : 0;

  return {
    ...(avoidanceType === 'padding' && { paddingBottom: finalOffset }),
    ...(avoidanceType === 'margin' && { marginBottom: finalOffset }),
    ...(enableTransitions && {
      transition: `${avoidanceType}-bottom ${transitionDuration}ms ${transitionEasing}`,
    }),
  };
}
