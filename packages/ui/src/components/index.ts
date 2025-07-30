// Export primitive components
export * from './primitives';

// Export V7 providers
export * from './providers';

// Export structure components (with specific naming to avoid conflicts)
export {
  // V2 Form Structures
  TextField,
  TextareaField,
  SelectField,
  CheckboxField,
  SwitchField,
  RadioField,
  SliderField,

  // V3 Grouping & List Structures
  ButtonPanel,
  ButtonGroup,
  ObjectGroup,
  CheckboxGroup,
  RadioGroup as RadioGroupStructure,
  List as ListStructure,
  ListItem as ListItemStructure,

  // V3 Informational & Data Display Structures
  BannerStructure,
  HeadlineStructure,
  BreadcrumbStructure,
  EmptyState,
  EmptyCollection,
  EmptySearch,
  EmptyFilter,
  EmptyError,
  DataTable,
  FilterBar,

  // V3 Advanced Input & AAE Structures
  UploadField,

  // V8 Structures
  HeroStack,
  BtnPanel,
  EmptyState,

  // V4 High-Level Structures
  InputWBtns,
  BtnBar,
  SecHead,
  ListGrid,
  ChipGroup,
  ListItmContent,

  // V7 Editor Structures
  ColorPalette,
  NavEditor,
} from './structures';

// Export modules
export {
  Hero,
  SecList,
  ProductGrid,
  // V7 Workflow Modules
  AddCollection,
  AssignTo,
  Copy,
  Delete,
  Archive,
  Capture,
  TextEditor,

  // V7 Menu System Modules
  MenuActions,
  MenuPosts,
  MenuAdmin,
  MenuViewStyle,
  MenuSortStyle,
  MenuSearch,
  MenuPrivacy,

  // V8 Modules
  FindFriends,
  GrantPermissions,

  // Enhanced AAE Modules (Epic 41)
  Scanner,
} from './modules';

// Export structure types
export type {
  // V2 Form Structures
  TextFieldProps,
  TextareaFieldProps,
  SelectFieldProps,
  CheckboxFieldProps,
  SwitchFieldProps,
  RadioFieldProps,
  SliderFieldProps,

  // V3 Grouping & List Structures
  ButtonPanelProps,
  ButtonGroupProps,
  ButtonGroupOption,
  ObjectGroupProps,
  CheckboxGroupProps,
  CheckboxGroupOption,
  RadioGroupProps as RadioGroupStructureProps,
  RadioGroupOption as RadioGroupStructureOption,
  ListProps as ListStructureProps,
  ListAction as ListStructureAction,
  ListItemProps as ListItemStructureProps,
  ListItemAction as ListItemStructureAction,

  // V3 Informational & Data Display Structures
  BannerStructureProps,
  HeadlineStructureProps,
  HeadlineAction,
  BreadcrumbStructureProps,
  BreadcrumbItem as BreadcrumbStructureItem,
  EmptyStateProps,
  EmptyStateAction,
  DataTableProps,
  DataTableColumn,
  DataTableSort,
  DataTableFilter,
  DataTablePagination,
  DataTableAction,
  FilterBarProps,
  FilterField,
  FilterValue,

  // V3 Advanced Input & AAE Structures
  UploadFieldProps,
  UploadedFile,
  GrantPermissionsProps,
  Permission,
  PermissionStatus,

  // V4 High-Level Structures
  InputWBtnsProps,
  InputWBtnsButton,
  BtnBarProps,
  BtnBarButton,
  SecHeadProps,
  SecHeadAction,
  ListGridProps,
  ChipGroupProps,
  ChipGroupChip,
  ListItmContentProps,
  ListItmContentAction,

  // V7 Editor Structure Types
  ColorPaletteProps,
  ColorOption,
  NavEditorProps,
  NavEditorState,
  NavEditorAction,
} from './structures';

// Export module types
export type {
  HeroProps,
  HeroAction,
  SecListProps,
  ProductGridProps,
  ProductGridProduct,
  // V7 Workflow Module Types
  AddCollectionProps,
  CollectionData,
  CollectionType,
  AssignToProps,
  Person,
  Group,
  CopyProps,
  CopyableObject,
  CopyOptions,
  DeleteProps,
  DeletableObject,
  SecurityLevel,
  ArchiveProps,
  ArchivableObject,
  CaptureProps,
  CaptureResult,
  CaptureMode,
  CaptureType,
  EditorProps,
  EditorMode,

  // V7 Menu System Module Types
  MenuActionsProps,
  MenuPostsProps,
  MenuAdminProps,
  MenuViewStyleProps,
  ViewStyle,
  ViewStyleOption,
  MenuSortStyleProps,
  SortDirection,
  SortField,
  SortOption,
  SortState,
  MenuSearchProps,
  SearchFilter,
  SearchSuggestion,
  SearchScope,
  MenuPrivacyProps,
  PrivacyLevel,
  PrivacyOption,
  PrivacySetting,

  // Enhanced AAE Module Types (Epic 41)
  ScannerProps,
} from './modules';

// NOTE: Client-specific components are available separately
// Import from '@acrobi/ui/client' for domain-specific components
// These are NOT part of the core design system
