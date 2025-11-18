import * as React from 'react';
import { cva, type VariantProps } from '@acrobi/primitives';
import { cn } from '@acrobi/primitives';
import { Button } from '@acrobi/primitives';
import { Text } from '@acrobi/primitives';
import { Card } from '@acrobi/primitives';
import { Badge } from '@acrobi/primitives';
import { Checkbox } from '@acrobi/primitives';

/**
 * S-AuthSetFavorites variant styles using Acrobi Design System classes
 * User preferences and favorites selection structure
 */
const authSetFavoritesVariants = cva(
  'auth-set-favorites w-full max-w-lg mx-auto space-y-6',
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
      selectionStyle: {
        cards: '',
        list: '',
        grid: '',
      },
    },
    defaultVariants: {
      layout: 'default',
      alignment: 'center',
      selectionStyle: 'cards',
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

const favoritesCategoryVariants = cva(
  'favorites-category space-y-3',
  {
    variants: {
      layout: {
        default: '',
        compact: 'space-y-2',
        spacious: 'space-y-4',
      },
    },
    defaultVariants: {
      layout: 'default',
    },
  }
);

const favoriteItemCardVariants = cva(
  'favorite-item-card p-4 rounded-lg border transition-all duration-200 cursor-pointer',
  {
    variants: {
      selected: {
        true: 'border-primary bg-primary/5 shadow-sm',
        false: 'border-border hover:border-primary/30 hover:shadow-sm',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: '',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-5',
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
      size: 'md',
    },
  }
);

const favoriteItemIconVariants = cva(
  'favorite-item-icon w-8 h-8 rounded-full flex items-center justify-center mb-2',
  {
    variants: {
      category: {
        technology: 'bg-blue-100 text-blue-600',
        design: 'bg-purple-100 text-purple-600',
        business: 'bg-green-100 text-green-600',
        science: 'bg-orange-100 text-orange-600',
        arts: 'bg-pink-100 text-pink-600',
        sports: 'bg-red-100 text-red-600',
        health: 'bg-teal-100 text-teal-600',
        education: 'bg-indigo-100 text-indigo-600',
        travel: 'bg-yellow-100 text-yellow-600',
        food: 'bg-orange-100 text-orange-600',
        entertainment: 'bg-purple-100 text-purple-600',
        lifestyle: 'bg-gray-100 text-gray-600',
      },
    },
    defaultVariants: {
      category: 'technology',
    },
  }
);

export interface FavoriteItem {
  id: string;
  name: string;
  description?: string;
  category: string;
  icon?: React.ReactNode;
  color?: string;
  popular?: boolean;
  trending?: boolean;
  recommended?: boolean;
  tags?: string[];
}

export interface FavoriteCategory {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  items: FavoriteItem[];
  minSelection?: number;
  maxSelection?: number;
  required?: boolean;
}

export interface AuthSetFavoritesData {
  selectedFavorites: Record<string, string[]>; // categoryId -> itemIds[]
  categories: string[];
  skipFavorites?: boolean;
  notificationPreferences?: {
    newContent: boolean;
    recommendations: boolean;
    trending: boolean;
    social: boolean;
  };
}

export interface AuthSetFavoritesProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof authSetFavoritesVariants> {
  /**
   * Current favorites data
   */
  data?: Partial<AuthSetFavoritesData>;
  /**
   * Available favorite categories and items
   */
  categories?: FavoriteCategory[];
  /**
   * Callback when favorites data changes
   */
  onChange?: (data: Partial<AuthSetFavoritesData>) => void;
  /**
   * Callback when user confirms selections
   */
  onConfirm?: (data: AuthSetFavoritesData) => void | Promise<void>;
  /**
   * Callback when user chooses to skip
   */
  onSkip?: () => void;
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
   * Whether to allow skipping this step
   */
  allowSkip?: boolean;
  /**
   * Whether to show notification preferences
   */
  showNotificationPrefs?: boolean;
  /**
   * Minimum total selections required
   */
  minTotalSelections?: number;
  /**
   * Maximum total selections allowed
   */
  maxTotalSelections?: number;
  /**
   * Custom intro text
   */
  introText?: string;
  /**
   * Whether to show popular/trending badges
   */
  showBadges?: boolean;
}

/**
 * S-AuthSetFavorites - User preferences and favorites selection structure
 *
 * This structure allows users to select their interests, topics, and preferences
 * to personalize their experience. It supports multiple categories with flexible
 * selection limits and provides notification preferences.
 *
 * Key features:
 * - Multi-category favorite selection
 * - Flexible selection limits per category
 * - Popular and trending item highlighting
 * - Notification preferences configuration
 * - Responsive card-based selection UI
 * - Category-based organization
 * - Option to skip preferences setup
 * - Accessibility-first design
 * - Real-time validation feedback
 *
 * @example
 * ```tsx
 * <SAuthSetFavorites
 *   data={favoritesData}
 *   onChange={setFavoritesData}
 *   onConfirm={handleConfirm}
 *   onSkip={handleSkip}
 *   loading={isSubmitting}
 *   allowSkip
 *   showNotificationPrefs
 *   showBadges
 *   minTotalSelections={3}
 *   maxTotalSelections={15}
 *   categories={[
 *     {
 *       id: 'technology',
 *       name: 'Technology',
 *       items: [
 *         {
 *           id: 'ai',
 *           name: 'Artificial Intelligence',
 *           category: 'technology',
 *           popular: true
 *         }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 */
const SAuthSetFavorites = React.forwardRef<HTMLDivElement, AuthSetFavoritesProps>(
  (
    {
      className,
      data = {},
      categories: customCategories,
      onChange,
      onConfirm,
      onSkip,
      loading = false,
      header,
      footer,
      allowSkip = true,
      showNotificationPrefs = true,
      minTotalSelections = 3,
      maxTotalSelections,
      introText = 'Choose your interests to get personalized content and recommendations',
      showBadges = true,
      layout = 'default',
      alignment = 'center',
      selectionStyle = 'cards',
      ...props
    },
    ref
  ) => {
    // Default categories if none provided
    const defaultCategories: FavoriteCategory[] = [
      {
        id: 'technology',
        name: 'Technology',
        description: 'Programming, AI, gadgets, and tech trends',
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        items: [
          { id: 'ai', name: 'Artificial Intelligence', category: 'technology', popular: true },
          { id: 'web-dev', name: 'Web Development', category: 'technology', trending: true },
          { id: 'mobile-dev', name: 'Mobile Development', category: 'technology' },
          { id: 'blockchain', name: 'Blockchain', category: 'technology', trending: true },
          { id: 'cybersecurity', name: 'Cybersecurity', category: 'technology' },
          { id: 'data-science', name: 'Data Science', category: 'technology', popular: true },
        ],
        minSelection: 1,
        maxSelection: 4,
      },
      {
        id: 'design',
        name: 'Design',
        description: 'UI/UX, graphic design, and visual arts',
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
          </svg>
        ),
        items: [
          { id: 'ui-ux', name: 'UI/UX Design', category: 'design', popular: true },
          { id: 'graphic-design', name: 'Graphic Design', category: 'design' },
          { id: 'product-design', name: 'Product Design', category: 'design', trending: true },
          { id: 'branding', name: 'Branding', category: 'design' },
          { id: 'illustration', name: 'Illustration', category: 'design' },
        ],
        maxSelection: 3,
      },
      {
        id: 'business',
        name: 'Business',
        description: 'Entrepreneurship, marketing, and finance',
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        ),
        items: [
          { id: 'entrepreneurship', name: 'Entrepreneurship', category: 'business', popular: true },
          { id: 'marketing', name: 'Marketing', category: 'business', trending: true },
          { id: 'finance', name: 'Finance', category: 'business' },
          { id: 'startups', name: 'Startups', category: 'business', popular: true },
          { id: 'leadership', name: 'Leadership', category: 'business' },
        ],
        maxSelection: 3,
      },
    ];

    const categories = customCategories || defaultCategories;

    const [formData, setFormData] = React.useState<Partial<AuthSetFavoritesData>>({
      selectedFavorites: {},
      categories: [],
      skipFavorites: false,
      notificationPreferences: {
        newContent: true,
        recommendations: true,
        trending: false,
        social: false,
      },
      ...data,
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Update form data when data prop changes
    React.useEffect(() => {
      setFormData(prev => ({ ...prev, ...data }));
    }, [data]);

    // Update parent component when form data changes
    const updateField = (field: keyof AuthSetFavoritesData, value: any) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);
      onChange?.(newData);
    };

    // Handle item selection
    const handleItemToggle = (categoryId: string, itemId: string) => {
      const currentSelections = formData.selectedFavorites || {};
      const categorySelections = currentSelections[categoryId] || [];
      const category = categories.find(c => c.id === categoryId);
      
      let newSelections: string[];
      
      if (categorySelections.includes(itemId)) {
        // Remove item
        newSelections = categorySelections.filter(id => id !== itemId);
      } else {
        // Add item (check max selection)
        const maxSelection = category?.maxSelection;
        if (maxSelection && categorySelections.length >= maxSelection) {
          // Replace oldest selection if at max
          newSelections = [...categorySelections.slice(1), itemId];
        } else {
          newSelections = [...categorySelections, itemId];
        }
      }
      
      updateField('selectedFavorites', {
        ...currentSelections,
        [categoryId]: newSelections,
      });
    };

    // Handle notification preference change
    const handleNotificationPrefChange = (key: keyof NonNullable<AuthSetFavoritesData['notificationPreferences']>, value: boolean) => {
      updateField('notificationPreferences', {
        ...formData.notificationPreferences,
        [key]: value,
      });
    };

    // Get total selections count
    const getTotalSelections = () => {
      const selections = formData.selectedFavorites || {};
      return Object.values(selections).reduce((total, items) => total + items.length, 0);
    };

    // Check if category requirements are met
    const isCategoryValid = (category: FavoriteCategory) => {
      const selections = formData.selectedFavorites?.[category.id] || [];
      const minMet = !category.minSelection || selections.length >= category.minSelection;
      const maxMet = !category.maxSelection || selections.length <= category.maxSelection;
      return minMet && maxMet;
    };

    // Check if all requirements are met
    const isFormValid = () => {
      const totalSelections = getTotalSelections();
      const minTotalMet = totalSelections >= minTotalSelections;
      const maxTotalMet = !maxTotalSelections || totalSelections <= maxTotalSelections;
      const requiredCategoriesMet = categories.filter(c => c.required).every(c => isCategoryValid(c));
      
      return minTotalMet && maxTotalMet && requiredCategoriesMet;
    };

    // Handle form submission
    const handleConfirm = async () => {
      if (!isFormValid()) return;
      
      setIsSubmitting(true);
      
      try {
        await onConfirm?.(formData as AuthSetFavoritesData);
      } catch (error) {
        console.error('Favorites confirmation failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    // Handle skip
    const handleSkip = () => {
      updateField('skipFavorites', true);
      onSkip?.();
    };

    // Get item icon variant
    const getItemIconVariant = (category: string): keyof typeof favoriteItemIconVariants.variants.category => {
      return (favoriteItemIconVariants.variants.category as any)[category] ? category as any : 'technology';
    };

    const actualLoading = loading || isSubmitting;
    const totalSelections = getTotalSelections();
    const canSubmit = isFormValid() && !actualLoading;

    return (
      <div
        ref={ref}
        className={cn(authSetFavoritesVariants({ layout, alignment, selectionStyle }), className)}
        {...props}
      >
        {/* Header */}
        {header || (
          <div className={cn(authHeaderVariants({ alignment }))}>
            <h1 className="text-2xl font-bold text-foreground">Set Your Interests</h1>
            <p className="text-muted-foreground">
              {introText}
            </p>
          </div>
        )}

        {/* Selection Progress */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
          <Text size="sm" color="foreground">
            Selected: <span className="font-medium">{totalSelections}</span>
            {maxTotalSelections && <span className="text-muted-foreground"> / {maxTotalSelections}</span>}
          </Text>
          <Text size="sm" color="muted">
            {minTotalSelections > totalSelections 
              ? `${minTotalSelections - totalSelections} more needed`
              : 'Looking good!'}
          </Text>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {categories.map((category) => {
            const categorySelections = formData.selectedFavorites?.[category.id] || [];
            const isValid = isCategoryValid(category);
            
            return (
              <div key={category.id} className={cn(favoritesCategoryVariants({ layout }))}>
                {/* Category Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {category.icon && (
                      <div className={cn(favoriteItemIconVariants({ category: getItemIconVariant(category.id) }))}>
                        {category.icon}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <Text size="lg" weight="semibold" color="foreground">
                          {category.name}
                        </Text>
                        {category.required && (
                          <Badge variant="destructive" className="text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                      {category.description && (
                        <Text size="sm" color="muted">
                          {category.description}
                        </Text>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Text size="sm" color="foreground">
                      {categorySelections.length}
                      {category.maxSelection && ` / ${category.maxSelection}`}
                    </Text>
                    {category.minSelection && (
                      <Text size="xs" color={isValid ? "muted" : "destructive"}>
                        Min: {category.minSelection}
                      </Text>
                    )}
                  </div>
                </div>

                {/* Category Items */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {category.items.map((item) => {
                    const isSelected = categorySelections.includes(item.id);
                    
                    return (
                      <div
                        key={item.id}
                        className={cn(favoriteItemCardVariants({
                          selected: isSelected,
                          disabled: actualLoading,
                          size: 'sm',
                        }))}
                        onClick={() => !actualLoading && handleItemToggle(category.id, item.id)}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <Text size="sm" weight="medium" color="foreground" className="flex-1">
                              {item.name}
                            </Text>
                            {isSelected && (
                              <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center flex-shrink-0 ml-2">
                                <svg className="h-2.5 w-2.5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </div>
                          
                          {item.description && (
                            <Text size="xs" color="muted">
                              {item.description}
                            </Text>
                          )}
                          
                          {showBadges && (item.popular || item.trending || item.recommended) && (
                            <div className="flex gap-1">
                              {item.popular && (
                                <Badge variant="secondary" className="text-xs">
                                  Popular
                                </Badge>
                              )}
                              {item.trending && (
                                <Badge variant="outline" className="text-xs">
                                  Trending
                                </Badge>
                              )}
                              {item.recommended && (
                                <Badge variant="default" className="text-xs">
                                  Recommended
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Notification Preferences */}
        {showNotificationPrefs && (
          <div className="space-y-4 p-4 rounded-lg border bg-muted/20">
            <Text size="sm" weight="medium" color="foreground">
              Notification Preferences
            </Text>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Text size="sm" color="foreground">New content in your interests</Text>
                  <Text size="xs" color="muted">Get notified about fresh content</Text>
                </div>
                <Checkbox
                  checked={formData.notificationPreferences?.newContent || false}
                  onCheckedChange={(checked) => handleNotificationPrefChange('newContent', checked)}
                  disabled={actualLoading}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Text size="sm" color="foreground">Personalized recommendations</Text>
                  <Text size="xs" color="muted">AI-powered content suggestions</Text>
                </div>
                <Checkbox
                  checked={formData.notificationPreferences?.recommendations || false}
                  onCheckedChange={(checked) => handleNotificationPrefChange('recommendations', checked)}
                  disabled={actualLoading}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Text size="sm" color="foreground">Trending topics</Text>
                  <Text size="xs" color="muted">Popular content in your areas</Text>
                </div>
                <Checkbox
                  checked={formData.notificationPreferences?.trending || false}
                  onCheckedChange={(checked) => handleNotificationPrefChange('trending', checked)}
                  disabled={actualLoading}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Text size="sm" color="foreground">Social activity</Text>
                  <Text size="xs" color="muted">Comments, likes, and follows</Text>
                </div>
                <Checkbox
                  checked={formData.notificationPreferences?.social || false}
                  onCheckedChange={(checked) => handleNotificationPrefChange('social', checked)}
                  disabled={actualLoading}
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!canSubmit}
            loading={actualLoading}
            className="w-full"
          >
            {actualLoading ? 'Saving Preferences...' : 
             `Continue with ${totalSelections} interest${totalSelections !== 1 ? 's' : ''}`}
          </Button>

          {allowSkip && (
            <button
              type="button"
              onClick={handleSkip}
              disabled={actualLoading}
              className="w-full text-sm text-muted-foreground hover:text-foreground underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Skip for now
            </button>
          )}
        </div>

        {/* Requirements Note */}
        {!canSubmit && totalSelections > 0 && (
          <div className="text-center">
            <Text size="xs" color="muted">
              {totalSelections < minTotalSelections
                ? `Select at least ${minTotalSelections - totalSelections} more interests to continue`
                : maxTotalSelections && totalSelections > maxTotalSelections
                ? `Please remove ${totalSelections - maxTotalSelections} selections`
                : 'Please check category requirements above'}
            </Text>
          </div>
        )}

        {/* Footer */}
        {footer}
      </div>
    );
  }
);

SAuthSetFavorites.displayName = 'SAuthSetFavorites';

export { SAuthSetFavorites, authSetFavoritesVariants, authHeaderVariants, favoritesCategoryVariants, favoriteItemCardVariants, favoriteItemIconVariants };
export type { AuthSetFavoritesData, FavoriteCategory, FavoriteItem };