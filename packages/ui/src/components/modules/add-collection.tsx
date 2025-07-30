import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { useSheet } from '../providers/sheet-provider';
import { MenuAccordion, type CategoryNode } from '../structures/menu-accordion';
import { PrivacyMenu, type PrivacyLevel } from '../structures/privacy-menu';
import { InputWBtns } from '../structures/input-w-btns';
import { SecHead } from '../structures/sec-head';
import { Button } from '../primitives/button';
import { Spacer } from '../primitives/spacer';

const addCollectionVariants = cva('w-full space-y-6', {
  variants: {
    step: {
      find: 'min-h-[400px]',
      select: 'min-h-[300px]',
      name: 'min-h-[200px]',
    },
  },
  defaultVariants: {
    step: 'find',
  },
});

export type CollectionType =
  | 'list'
  | 'group'
  | 'recipe'
  | 'post'
  | 'place'
  | 'section'
  | 'connections'
  | 'brands';

export interface CollectionData {
  type: CollectionType;
  name: string;
  privacy: PrivacyLevel;
  category?: CategoryNode;
  id?: string;
}

export interface AddCollectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof addCollectionVariants> {
  /**
   * Type of collection being created
   * @default "list"
   */
  collectionType?: CollectionType;
  /**
   * Hierarchical category structure
   */
  categoryTree?: CategoryNode[];
  /**
   * Default privacy setting
   * @default "confidential"
   */
  defaultPrivacy?: PrivacyLevel;
  /**
   * Placeholder text for name input
   */
  placeholderText?: string;
  /**
   * Whether to auto-generate names
   * @default true
   */
  autoGenerateName?: boolean;
  /**
   * Callback when collection is created
   */
  onCollectionCreated?: (collection: CollectionData) => void;
  /**
   * Whether to use progressive reveal UX
   * @default true
   */
  showProgressiveReveal?: boolean;
  /**
   * Delay before revealing next step
   * @default 250
   */
  accordionExpandDelay?: number;
  /**
   * Whether to enable keyboard avoidance
   * @default true
   */
  enableKeyboardAvoid?: boolean;
  /**
   * Custom title for the sheet
   */
  title?: string;
  /**
   * Whether to show the component (for programmatic control)
   * @default true
   */
  show?: boolean;
}

// Collection type icons and labels
const collectionTypeConfig = {
  list: { icon: '📝', label: 'List' },
  group: { icon: '👥', label: 'Group' },
  recipe: { icon: '🍳', label: 'Recipe' },
  post: { icon: '📄', label: 'Post' },
  place: { icon: '📍', label: 'Place' },
  section: { icon: '📂', label: 'Section' },
  connections: { icon: '🤝', label: 'Connections' },
  brands: { icon: '🏷️', label: 'Brands' },
};

type ProgressiveStep = 'find' | 'select' | 'name';

const AddCollection = React.forwardRef<HTMLDivElement, AddCollectionProps>(
  (
    {
      className,
      collectionType = 'list',
      categoryTree = [],
      defaultPrivacy = 'confidential',
      placeholderText,
      autoGenerateName = true,
      onCollectionCreated,
      showProgressiveReveal = true,
      accordionExpandDelay = 250,
      enableKeyboardAvoid = true,
      title,
      show = true,
      ...props
    },
    ref
  ) => {
    const { closeSheet } = useSheet();

    // Progressive reveal state
    const [currentStep, setCurrentStep] =
      React.useState<ProgressiveStep>('find');
    const [selectedCategory, setSelectedCategory] = React.useState<
      CategoryNode | undefined
    >();
    const [privacy, setPrivacy] = React.useState<PrivacyLevel>(defaultPrivacy);
    const [collectionName, setCollectionName] = React.useState('');
    const [isCreating, setIsCreating] = React.useState(false);

    // Collection type configuration
    const typeConfig = collectionTypeConfig[collectionType];
    const displayTitle = title || `Add ${typeConfig.label}`;
    const inputPlaceholder =
      placeholderText || `Enter ${typeConfig.label.toLowerCase()} name`;

    // Auto-generate collection name
    const generateCollectionName = React.useCallback(
      (category?: CategoryNode): string => {
        if (!autoGenerateName || !category) return '';
        const baseName = `${category.name} ${typeConfig.label}`;
        return `${baseName} 1`; // In real implementation, would check for existing names
      },
      [autoGenerateName, typeConfig.label]
    );

    // Handle category selection
    const handleCategorySelect = React.useCallback(
      (category: CategoryNode) => {
        setSelectedCategory(category);

        if (showProgressiveReveal) {
          // Delay before moving to next step
          setTimeout(() => {
            setCurrentStep('select');

            // Auto-generate name if enabled
            if (autoGenerateName) {
              setCollectionName(generateCollectionName(category));
            }

            // Move to name step after another delay
            setTimeout(() => {
              setCurrentStep('name');
            }, accordionExpandDelay);
          }, accordionExpandDelay);
        }
      },
      [
        showProgressiveReveal,
        accordionExpandDelay,
        autoGenerateName,
        generateCollectionName,
      ]
    );

    // Handle collection creation
    const handleCreate = React.useCallback(async () => {
      if (!selectedCategory && showProgressiveReveal) return;

      setIsCreating(true);

      try {
        const finalName =
          collectionName.trim() || generateCollectionName(selectedCategory);

        const collectionData: CollectionData = {
          type: collectionType,
          name: finalName,
          privacy,
          category: selectedCategory,
          id: `${collectionType}_${Date.now()}`, // Simple ID generation
        };

        await onCollectionCreated?.(collectionData);
        closeSheet();
      } catch (error) {
        console.error('Failed to create collection:', error);
      } finally {
        setIsCreating(false);
      }
    }, [
      selectedCategory,
      showProgressiveReveal,
      collectionName,
      generateCollectionName,
      collectionType,
      privacy,
      onCollectionCreated,
      closeSheet,
    ]);

    // Handle cancel
    const handleCancel = React.useCallback(() => {
      closeSheet();
    }, [closeSheet]);

    if (!show) return null;

    return (
      <div
        ref={ref}
        className={cn(addCollectionVariants({ step: currentStep }), className)}
        {...props}
      >
        {/* Header */}
        <SecHead title={displayTitle} titleIcon={typeConfig.icon} size='lg' />

        {/* Step 1: Find Category */}
        {(currentStep === 'find' || !showProgressiveReveal) &&
          categoryTree.length > 0 && (
            <div className='space-y-4'>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Choose Category</h3>
                <p className='text-sm text-muted-foreground'>
                  Select where this {typeConfig.label.toLowerCase()} should be
                  organized
                </p>
              </div>

              <MenuAccordion
                categories={categoryTree}
                selectedId={selectedCategory?.id}
                onSelect={handleCategorySelect}
                expandDelay={accordionExpandDelay}
                autoExpand={showProgressiveReveal}
              />
            </div>
          )}

        {/* Step 2: Privacy Settings (shown after category selection in progressive mode) */}
        {(currentStep === 'select' ||
          (!showProgressiveReveal && selectedCategory)) && (
          <div className='space-y-4 animate-in slide-in-from-top-2 duration-300'>
            <div>
              <h3 className='text-lg font-semibold mb-2'>Privacy Settings</h3>
              <p className='text-sm text-muted-foreground'>
                Choose who can see this {typeConfig.label.toLowerCase()}
              </p>
            </div>

            <PrivacyMenu
              value={privacy}
              onValueChange={setPrivacy}
              layout='vertical'
              size='default'
            />
          </div>
        )}

        {/* Step 3: Name & Create (shown last in progressive mode) */}
        {(currentStep === 'name' || !showProgressiveReveal) && (
          <div className='space-y-6 animate-in slide-in-from-top-2 duration-300'>
            <div>
              <h3 className='text-lg font-semibold mb-2'>
                Name Your {typeConfig.label}
              </h3>
              <p className='text-sm text-muted-foreground'>
                Give your {typeConfig.label.toLowerCase()} a memorable name
              </p>
            </div>

            <InputWBtns
              value={collectionName}
              onChange={e => setCollectionName(e.target.value)}
              placeholder={inputPlaceholder}
              leftIcon={typeConfig.icon}
              buttons={[
                {
                  children: 'Cancel',
                  onClick: handleCancel,
                  disabled: isCreating,
                  buttonProps: { variant: 'outline' },
                },
                {
                  children: isCreating ? 'Creating...' : 'Create',
                  onClick: handleCreate,
                  disabled:
                    isCreating || (!collectionName.trim() && !autoGenerateName),
                  buttonProps: { variant: 'default' },
                },
              ]}
            />

            {selectedCategory && (
              <div className='text-sm text-muted-foreground flex items-center gap-2'>
                <span>📂</span>
                <span>Category: {selectedCategory.name}</span>
              </div>
            )}
          </div>
        )}

        {/* Non-progressive mode: Show all at once */}
        {!showProgressiveReveal && (
          <div className='flex gap-4 pt-4'>
            <Button
              variant='outline'
              onClick={handleCancel}
              disabled={isCreating}
              className='flex-1'
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={
                isCreating || (!collectionName.trim() && !autoGenerateName)
              }
              className='flex-1'
            >
              {isCreating ? 'Creating...' : `Create ${typeConfig.label}`}
            </Button>
          </div>
        )}
      </div>
    );
  }
);

AddCollection.displayName = 'AddCollection';

export { AddCollection, addCollectionVariants };
