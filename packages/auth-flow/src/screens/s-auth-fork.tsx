import * as React from 'react';
import { cva, type VariantProps } from '@acrobi/primitives';
import { cn } from '@acrobi/primitives';
import { Button } from '@acrobi/primitives';
import { Text } from '@acrobi/primitives';
import { Card } from '@acrobi/primitives';
import { Badge } from '@acrobi/primitives';

/**
 * S-AuthFork variant styles using Acrobi Design System classes
 * Authentication flow selection structure for onboarding paths
 */
const authForkVariants = cva(
  'auth-fork w-full max-w-lg mx-auto space-y-6',
  {
    variants: {
      layout: {
        default: '',
        compact: 'space-y-4',
        spacious: 'space-y-8',
      },
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      orientation: {
        vertical: 'space-y-4',
        horizontal: 'space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4',
      },
    },
    defaultVariants: {
      layout: 'default',
      alignment: 'center',
      orientation: 'vertical',
    },
  }
);

const authHeaderVariants = cva(
  'auth-header space-y-2',
  {
    variants: {
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      alignment: 'center',
    },
  }
);

const forkPathCardVariants = cva(
  'fork-path-card p-6 rounded-lg border transition-all duration-200 cursor-pointer group',
  {
    variants: {
      selected: {
        true: 'border-primary bg-primary/5 shadow-md',
        false: 'border-border hover:border-primary/50 hover:shadow-sm',
      },
      recommended: {
        true: 'ring-2 ring-primary/20',
        false: '',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
      recommended: false,
      disabled: false,
    },
  }
);

const pathIconVariants = cva(
  'path-icon w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors',
  {
    variants: {
      variant: {
        express: 'bg-green-100 text-green-600',
        comprehensive: 'bg-blue-100 text-blue-600',
        minimal: 'bg-gray-100 text-gray-600',
        advanced: 'bg-purple-100 text-purple-600',
      },
      selected: {
        true: 'ring-2 ring-current',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'express',
      selected: false,
    },
  }
);

export interface AuthForkPath {
  id: string;
  title: string;
  description: string;
  features: string[];
  estimatedTime: string;
  icon: React.ReactNode;
  recommended?: boolean;
  badge?: string;
  steps?: string[];
}

export interface AuthForkData {
  selectedPath: string | null;
  userProfile?: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface AuthForkProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof authForkVariants> {
  /**
   * Current fork selection data
   */
  data?: Partial<AuthForkData>;
  /**
   * Available authentication paths
   */
  paths?: AuthForkPath[];
  /**
   * Callback when path selection changes
   */
  onChange?: (data: Partial<AuthForkData>) => void;
  /**
   * Callback when path is confirmed
   */
  onConfirm?: (pathId: string, data: AuthForkData) => void | Promise<void>;
  /**
   * Whether form is in loading state
   */
  loading?: boolean;
  /**
   * Custom header content
   */
  header?: React.ReactNode;
  /**
   * Custom footer content
   */
  footer?: React.ReactNode;
  /**
   * Whether to show path comparison
   */
  showComparison?: boolean;
  /**
   * Whether to auto-select recommended path
   */
  autoSelectRecommended?: boolean;
  /**
   * Custom recommendation logic
   */
  getRecommendedPath?: (userProfile?: any) => string;
}

/**
 * S-AuthFork - Authentication flow selection structure
 *
 * This structure allows users to choose their preferred onboarding path based
 * on their needs and time availability. It provides clear comparisons between
 * different authentication setup options.
 *
 * Key features:
 * - Multiple onboarding path options
 * - Clear feature comparison and time estimates
 * - Recommended path highlighting
 * - Responsive card-based selection UI
 * - Auto-selection based on user profile
 * - Step-by-step preview for each path
 * - Accessibility-first design
 * - Flexible path configuration
 *
 * @example
 * ```tsx
 * <SAuthFork
 *   data={forkData}
 *   onChange={setForkData}
 *   onConfirm={handlePathSelection}
 *   loading={isSubmitting}
 *   showComparison
 *   autoSelectRecommended
 *   getRecommendedPath={(profile) => profile?.advanced ? 'comprehensive' : 'express'}
 *   orientation="horizontal"
 *   paths={[
 *     {
 *       id: 'express',
 *       title: 'Quick Setup',
 *       description: 'Get started in under 2 minutes',
 *       features: ['Basic profile', 'Email verification'],
 *       estimatedTime: '2 min',
 *       recommended: true
 *     }
 *   ]}
 * />
 * ```
 */
const SAuthFork = React.forwardRef<HTMLDivElement, AuthForkProps>(
  (
    {
      className,
      data = {},
      paths: customPaths,
      onChange,
      onConfirm,
      loading = false,
      header,
      footer,
      showComparison = true,
      autoSelectRecommended = false,
      getRecommendedPath,
      layout = 'default',
      alignment = 'center',
      orientation = 'vertical',
      ...props
    },
    ref
  ) => {
    // Default paths if none provided
    const defaultPaths: AuthForkPath[] = [
      {
        id: 'express',
        title: 'Quick Setup',
        description: 'Get started fast with essential features only',
        features: [
          'Basic account creation',
          'Email verification',
          'Simple profile setup'
        ],
        estimatedTime: '2 min',
        recommended: true,
        badge: 'Most Popular',
        icon: (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        steps: ['Create account', 'Verify email', 'Basic profile']
      },
      {
        id: 'comprehensive',
        title: 'Complete Setup',
        description: 'Full onboarding with all security features',
        features: [
          'Account creation with backup contact',
          'Passkey setup for passwordless login',
          'Full profile with preferences',
          'Security settings configuration'
        ],
        estimatedTime: '8 min',
        badge: 'Recommended for Security',
        icon: (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        steps: ['Create account', 'Add backup contact', 'Set up passkey', 'Complete profile', 'Configure preferences']
      },
      {
        id: 'minimal',
        title: 'Basic Account',
        description: 'Minimal setup to start using the platform',
        features: [
          'Account creation only',
          'Skip optional features',
          'Quick access to platform'
        ],
        estimatedTime: '1 min',
        icon: (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
        steps: ['Create account', 'Start using platform']
      }
    ];

    const paths = customPaths || defaultPaths;

    const [formData, setFormData] = React.useState<Partial<AuthForkData>>({
      selectedPath: null,
      ...data,
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Auto-select recommended path if enabled
    React.useEffect(() => {
      if (autoSelectRecommended && !formData.selectedPath) {
        let recommendedPathId: string;
        
        if (getRecommendedPath) {
          recommendedPathId = getRecommendedPath(formData.userProfile);
        } else {
          const recommendedPath = paths.find(path => path.recommended);
          recommendedPathId = recommendedPath?.id || paths[0]?.id;
        }
        
        if (recommendedPathId) {
          updateField('selectedPath', recommendedPathId);
        }
      }
    }, [autoSelectRecommended, formData.userProfile, paths, getRecommendedPath, formData.selectedPath]);

    // Update form data when data prop changes
    React.useEffect(() => {
      setFormData(prev => ({ ...prev, ...data }));
    }, [data]);

    // Update parent component when form data changes
    const updateField = (field: keyof AuthForkData, value: any) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);
      onChange?.(newData);
    };

    // Handle path selection
    const handlePathSelect = (pathId: string) => {
      updateField('selectedPath', pathId);
    };

    // Handle form submission
    const handleConfirm = async () => {
      if (!formData.selectedPath) return;
      
      setIsSubmitting(true);
      
      try {
        await onConfirm?.(formData.selectedPath, formData as AuthForkData);
      } catch (error) {
        console.error('Path confirmation failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const actualLoading = loading || isSubmitting;
    const canSubmit = formData.selectedPath && !actualLoading;

    // Get path variant for styling
    const getPathVariant = (pathId: string): 'express' | 'comprehensive' | 'minimal' | 'advanced' => {
      if (pathId.includes('express') || pathId.includes('quick')) return 'express';
      if (pathId.includes('comprehensive') || pathId.includes('complete')) return 'comprehensive';
      if (pathId.includes('advanced')) return 'advanced';
      return 'minimal';
    };

    return (
      <div
        ref={ref}
        className={cn(authForkVariants({ layout, alignment, orientation }), className)}
        {...props}
      >
        {/* Header */}
        {header || (
          <div className={cn(authHeaderVariants({ alignment }))}>
            <h1 className="text-2xl font-bold text-foreground">Choose Your Setup Path</h1>
            <p className="text-muted-foreground">
              Select the onboarding experience that works best for you
            </p>
          </div>
        )}

        {/* Path Selection Cards */}
        <div className={cn(
          'space-y-4',
          orientation === 'horizontal' && 'md:space-y-0 md:grid md:grid-cols-2 md:gap-4'
        )}>
          {paths.map((path) => (
            <div
              key={path.id}
              className={cn(forkPathCardVariants({
                selected: formData.selectedPath === path.id,
                recommended: path.recommended,
                disabled: actualLoading,
              }))}
              onClick={() => !actualLoading && handlePathSelect(path.id)}
            >
              {/* Path Badge */}
              {path.badge && (
                <div className="flex justify-between items-start mb-2">
                  <Badge 
                    variant={path.recommended ? "default" : "secondary"} 
                    className="text-xs"
                  >
                    {path.badge}
                  </Badge>
                  {formData.selectedPath === path.id && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <svg className="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              )}

              {/* Path Icon */}
              <div className={cn(pathIconVariants({
                variant: getPathVariant(path.id),
                selected: formData.selectedPath === path.id,
              }))}>
                {path.icon}
              </div>

              {/* Path Info */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {path.title}
                    </h3>
                    <Text size="sm" color="muted" className="font-medium">
                      {path.estimatedTime}
                    </Text>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {path.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-2">
                  <Text size="sm" weight="medium" color="foreground">
                    What's included:
                  </Text>
                  <ul className="space-y-1">
                    {path.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <svg className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps Preview */}
                {path.steps && showComparison && (
                  <div className="space-y-2 pt-2 border-t border-border/50">
                    <Text size="sm" weight="medium" color="foreground">
                      Steps ({path.steps.length}):
                    </Text>
                    <div className="flex flex-wrap gap-1">
                      {path.steps.map((step, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {index + 1}. {step}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Note */}
        {showComparison && (
          <div className="text-center space-y-2 pt-4 border-t border-border/50">
            <Text size="sm" color="muted">
              💡 Don't worry - you can always add more features later in your account settings
            </Text>
          </div>
        )}

        {/* Action Button */}
        <div className="space-y-4">
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!canSubmit}
            loading={actualLoading}
            className="w-full"
            size="lg"
          >
            {actualLoading ? 'Starting Setup...' : 
             formData.selectedPath ? `Start ${paths.find(p => p.id === formData.selectedPath)?.title} →` :
             'Select a Path'}
          </Button>

          {/* Selected Path Summary */}
          {formData.selectedPath && (
            <div className="text-center">
              <Text size="sm" color="muted">
                You selected: <span className="font-medium text-foreground">
                  {paths.find(p => p.id === formData.selectedPath)?.title}
                </span>
                {' '}({paths.find(p => p.id === formData.selectedPath)?.estimatedTime})
              </Text>
            </div>
          )}
        </div>

        {/* Footer */}
        {footer}
      </div>
    );
  }
);

SAuthFork.displayName = 'SAuthFork';

export { SAuthFork, authForkVariants, authHeaderVariants, forkPathCardVariants, pathIconVariants };
export type { AuthForkData, AuthForkPath };