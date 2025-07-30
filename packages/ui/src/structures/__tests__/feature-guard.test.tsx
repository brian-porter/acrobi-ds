import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { FeatureGuard, withFeatureGuard, useFeatureGuards } from '../feature-guard';
import * as featureDetectionHook from '../../hooks/use-feature-detection';

// Mock the feature detection hook
const mockUseFeatureDetection = jest.mocked(featureDetectionHook.useFeatureDetection);

// Mock component for testing
const TestComponent = () => <div>Feature Supported Component</div>;
const FallbackComponent = () => <div>Fallback Component</div>;

describe('FeatureGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Feature Detection States', () => {
    it('should show loading state when not ready', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: false,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webShare">
          <TestComponent />
        </FeatureGuard>
      );

      expect(screen.getByText('Checking feature support...')).toBeInTheDocument();
      expect(screen.queryByText('Feature Supported Component')).not.toBeInTheDocument();
    });

    it('should render children when feature is supported', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: true,
        isReady: true,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webShare">
          <TestComponent />
        </FeatureGuard>
      );

      expect(screen.getByText('Feature Supported Component')).toBeInTheDocument();
      expect(screen.queryByText('Checking feature support...')).not.toBeInTheDocument();
    });

    it('should render fallback when feature is not supported', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: true,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webShare" fallback={<FallbackComponent />}>
          <TestComponent />
        </FeatureGuard>
      );

      expect(screen.getByText('Fallback Component')).toBeInTheDocument();
      expect(screen.queryByText('Feature Supported Component')).not.toBeInTheDocument();
    });
  });

  describe('Default Fallback Messages', () => {
    it('should show default fallback message for webShare', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: true,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webShare">
          <TestComponent />
        </FeatureGuard>
      );

      expect(screen.getByText('Sharing not available. You can copy the link instead.')).toBeInTheDocument();
    });

    it('should show default fallback message for camera', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: true,
        error: undefined,
      });

      render(
        <FeatureGuard feature="camera">
          <TestComponent />
        </FeatureGuard>
      );

      expect(screen.getByText('Camera access not available. Please upload an image file.')).toBeInTheDocument();
    });

    it('should show generic message for unknown features', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: true,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webGL">
          <TestComponent />
        </FeatureGuard>
      );

      expect(screen.getByText('This feature (webGL) is not supported in your browser.')).toBeInTheDocument();
    });

    it('should show custom fallback message when provided', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: true,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webShare" fallbackMessage="Custom fallback message">
          <TestComponent />
        </FeatureGuard>
      );

      expect(screen.getByText('Custom fallback message')).toBeInTheDocument();
    });
  });

  describe('Fallback Styles', () => {
    it('should apply warning style', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: true,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webShare" fallbackStyle="warning">
          <TestComponent />
        </FeatureGuard>
      );

      const fallbackElement = screen.getByText('Sharing not available. You can copy the link instead.').closest('div');
      expect(fallbackElement).toHaveClass('bg-yellow-50', 'border-yellow-200', 'text-yellow-800');
    });

    it('should apply error style', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: true,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webShare" fallbackStyle="error">
          <TestComponent />
        </FeatureGuard>
      );

      const fallbackElement = screen.getByText('Sharing not available. You can copy the link instead.').closest('div');
      expect(fallbackElement).toHaveClass('bg-red-50', 'border-red-200', 'text-red-800');
    });

    it('should apply minimal style', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: true,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webShare" fallbackStyle="minimal">
          <TestComponent />
        </FeatureGuard>
      );

      const fallbackElement = screen.getByText('Sharing not available. You can copy the link instead.');
      expect(fallbackElement).toHaveClass('text-gray-600', 'text-sm');
    });

    it('should render nothing with none style', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: true,
        error: undefined,
      });

      const { container } = render(
        <FeatureGuard feature="webShare" fallbackStyle="none">
          <TestComponent />
        </FeatureGuard>
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('Loading Styles', () => {
    it('should show spinner loading style', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: false,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webShare" loadingStyle="spinner">
          <TestComponent />
        </FeatureGuard>
      );

      expect(screen.getByText('Checking feature support...')).toBeInTheDocument();
      // Check for spinner element
      expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('should show skeleton loading style', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: false,
        error: undefined,
      });

      const { container } = render(
        <FeatureGuard feature="webShare" loadingStyle="skeleton">
          <TestComponent />
        </FeatureGuard>
      );

      const skeletonElement = container.firstChild as HTMLElement;
      expect(skeletonElement).toHaveClass('bg-gray-200', 'animate-pulse', 'h-16');
    });

    it('should show minimal loading style', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: false,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webShare" loadingStyle="minimal">
          <TestComponent />
        </FeatureGuard>
      );

      const loadingElement = screen.getByText('Checking feature support...');
      expect(loadingElement).toHaveClass('text-gray-400', 'text-sm');
    });

    it('should render nothing with none loading style', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: false,
        error: undefined,
      });

      const { container } = render(
        <FeatureGuard feature="webShare" loadingStyle="none">
          <TestComponent />
        </FeatureGuard>
      );

      expect(container.firstChild).toBeNull();
    });

    it('should show custom loading content', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: false,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webShare" loading={<div>Custom Loading...</div>}>
          <TestComponent />
        </FeatureGuard>
      );

      expect(screen.getByText('Custom Loading...')).toBeInTheDocument();
    });
  });

  describe('Props and Behaviors', () => {
    it('should not show loading when showLoading is false', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: false,
        error: undefined,
      });

      const { container } = render(
        <FeatureGuard feature="webShare" showLoading={false}>
          <TestComponent />
        </FeatureGuard>
      );

      expect(container.firstChild).toBeNull();
    });

    it('should not show default fallback when showDefaultFallback is false', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: true,
        error: undefined,
      });

      const { container } = render(
        <FeatureGuard feature="webShare" showDefaultFallback={false}>
          <TestComponent />
        </FeatureGuard>
      );

      expect(container.firstChild).toBeNull();
    });

    it('should call onFeatureCheck callback when ready', async () => {
      const onFeatureCheck = jest.fn();

      mockUseFeatureDetection.mockReturnValue({
        isSupported: true,
        isReady: true,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webShare" onFeatureCheck={onFeatureCheck}>
          <TestComponent />
        </FeatureGuard>
      );

      await waitFor(() => {
        expect(onFeatureCheck).toHaveBeenCalledWith('webShare', true);
      });
    });

    it('should log unsupported features when logUnsupported is true', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: true,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webShare" logUnsupported={true}>
          <TestComponent />
        </FeatureGuard>
      );

      expect(consoleSpy).toHaveBeenCalledWith("Feature 'webShare' is not supported in this browser");
      
      consoleSpy.mockRestore();
    });

    it('should show error details when error exists', () => {
      const testError = new Error('Test error message');

      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: true,
        error: testError,
      });

      render(
        <FeatureGuard feature="webShare">
          <TestComponent />
        </FeatureGuard>
      );

      expect(screen.getByText('Technical details')).toBeInTheDocument();
      expect(screen.getByText('Test error message')).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('should apply custom className to fallback', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: true,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webShare" className="custom-class">
          <TestComponent />
        </FeatureGuard>
      );

      const fallbackElement = screen.getByText('Sharing not available. You can copy the link instead.').closest('div');
      expect(fallbackElement).toHaveClass('custom-class');
    });

    it('should apply custom className to loading state', () => {
      mockUseFeatureDetection.mockReturnValue({
        isSupported: false,
        isReady: false,
        error: undefined,
      });

      render(
        <FeatureGuard feature="webShare" className="custom-loading-class">
          <TestComponent />
        </FeatureGuard>
      );

      const loadingElement = screen.getByText('Checking feature support...').closest('div');
      expect(loadingElement).toHaveClass('custom-loading-class');
    });
  });
});

describe('withFeatureGuard HOC', () => {
  it('should wrap component with feature guard', () => {
    mockUseFeatureDetection.mockReturnValue({
      isSupported: true,
      isReady: true,
      error: undefined,
    });

    const WrappedComponent = withFeatureGuard(TestComponent, 'webShare', FallbackComponent);

    render(<WrappedComponent />);

    expect(screen.getByText('Feature Supported Component')).toBeInTheDocument();
  });

  it('should show fallback component when feature not supported', () => {
    mockUseFeatureDetection.mockReturnValue({
      isSupported: false,
      isReady: true,
      error: undefined,
    });

    const WrappedComponent = withFeatureGuard(TestComponent, 'webShare', FallbackComponent);

    render(<WrappedComponent />);

    expect(screen.getByText('Fallback Component')).toBeInTheDocument();
    expect(screen.queryByText('Feature Supported Component')).not.toBeInTheDocument();
  });

  it('should have correct display name', () => {
    const WrappedComponent = withFeatureGuard(TestComponent, 'webShare');
    expect(WrappedComponent.displayName).toBe('withFeatureGuard(TestComponent)');
  });
});

describe('useFeatureGuards hook', () => {
  // Mock the hook implementation
  const mockUseFeatureGuards = jest.fn();
  
  beforeEach(() => {
    // Mock multiple useFeatureDetection calls
    mockUseFeatureDetection
      .mockReturnValueOnce({ isSupported: true, isReady: true, error: undefined })
      .mockReturnValueOnce({ isSupported: false, isReady: true, error: undefined })
      .mockReturnValueOnce({ isSupported: true, isReady: true, error: undefined });
  });

  it('should be tested via integration', () => {
    // This would require a more complex setup to test the actual implementation
    // since it uses multiple hook calls internally
    expect(useFeatureGuards).toBeDefined();
  });
});