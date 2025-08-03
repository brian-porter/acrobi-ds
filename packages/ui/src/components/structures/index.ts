// Export all structure components

// V2 Form Structures
export { TextField } from './text-field';
export type { TextFieldProps } from './text-field';

export { TextareaField } from './textarea-field';
export type { TextareaFieldProps } from './textarea-field';

export { SelectField } from './select-field';
export type { SelectFieldProps } from './select-field';

export { CheckboxField } from './checkbox-field';
export type { CheckboxFieldProps } from './checkbox-field';

export { SwitchField } from './switch-field';
export type { SwitchFieldProps } from './switch-field';

export { RadioField } from './radio-field';
export type { RadioFieldProps } from './radio-field';

export { SliderField } from './slider-field';
export type { SliderFieldProps } from './slider-field';

// V3 Grouping & List Structures
export { ButtonPanel } from './button-panel';
export type { ButtonPanelProps } from './button-panel';

export { ButtonGroup } from './button-group';
export type { ButtonGroupProps, ButtonGroupOption } from './button-group';

export { ObjectGroup as ContainerGroup } from './container-group';
export type { ObjectGroupProps as ContainerGroupProps } from './container-group';

export { CheckboxGroup } from './checkbox-group';
export type { CheckboxGroupProps, CheckboxGroupOption } from './checkbox-group';

export { RadioGroup } from './radio-group';
export type { RadioGroupProps, RadioGroupOption } from './radio-group';

export { List } from './list';
export type { ListProps, ListAction } from './list';

export { ListItem } from './list-item';
export type { ListItemProps, ListItemAction } from './list-item';

// V3 Informational & Data Display Structures
export { BannerStructure } from './banner';
export type { BannerStructureProps } from './banner';

export { HeadlineStructure } from './headline';
export type { HeadlineStructureProps, HeadlineAction } from './headline';

export { BreadcrumbStructure } from './breadcrumb';
export type { BreadcrumbStructureProps, BreadcrumbItem } from './breadcrumb';

export {
  EmptyState,
  EmptyCollection,
  EmptySearch,
  EmptyFilter,
  EmptyError,
} from './empty-state';
export type { EmptyStateProps, EmptyStateAction } from './empty-state';

export { DataTable } from './data-table';
export type {
  DataTableProps,
  DataTableColumn,
  DataTableSort,
  DataTableFilter,
  DataTablePagination,
  DataTableAction,
} from './data-table';

export { FilterBar } from './filter-bar';
export type { FilterBarProps, FilterField, FilterValue } from './filter-bar';

// V3 Advanced Input & AAE Structures
export { UploadField } from './upload-field';
export type { UploadFieldProps, UploadedFile } from './upload-field';

export { GrantPermissions } from './grant-permissions';
export type {
  GrantPermissionsProps,
  Permission,
  PermissionStatus,
} from './grant-permissions';

// V4 High-Level Structures
export { InputWBtns } from './input-w-btns';
export type { InputWBtnsProps, InputWBtnsButton } from './input-w-btns';

export { BtnBar } from './btn-bar';
export type { BtnBarProps, BtnBarButton } from './btn-bar';

export { SecHead } from './sec-head';
export type { SecHeadProps, SecHeadAction } from './sec-head';

export { ListGrid } from './list-grid';
export type { ListGridProps } from './list-grid';

export { ChipGroup } from './chip-group';
export type { ChipGroupProps, ChipGroupChip } from './chip-group';

export { ListItmContent } from './list-itm-content';
export type {
  ListItmContentProps,
  ListItmContentAction,
} from './list-itm-content';

// V7 Supporting Structures
export {
  MenuAccordion,
  type MenuAccordionProps,
  type CategoryNode,
} from './menu-accordion';
export {
  PrivacyMenu,
  type PrivacyMenuProps,
  type PrivacyLevel,
  type PrivacyOption,
} from './privacy-menu';
export {
  ColorPalette,
  type ColorPaletteProps,
  type ColorOption,
} from './color-palette';
export {
  NavEditor,
  type NavEditorProps,
  type NavEditorState,
  type NavEditorAction,
} from './nav-editor';
export {
  Menu,
  type MenuProps,
  type MenuAction,
  type MenuSection,
} from './menu';

// AAE Structures
export {
  KeyboardAvoidingView,
  withKeyboardAvoidance,
  useKeyboardAvoidanceStyles,
  keyboardAvoidingViewStyles,
} from './keyboard-avoiding-view';
export type { KeyboardAvoidingViewProps } from './keyboard-avoiding-view';

export { LocationMap, locationMapUtils } from './location-map';
export type { LocationMapProps, LocationMapMarker } from './location-map';

// Authentication Flow Structures (PRD v12)
export { SAuthCreateAccount, authCreateAccountVariants, authHeaderVariants } from './s-auth-create-account';
export type { AuthCreateAccountData, AuthCreateAccountProps } from './s-auth-create-account';

export { SAuthVerifyContact, authVerifyContactVariants, verificationInfoVariants } from './s-auth-verify-contact';
export type { AuthVerifyContactData, AuthVerifyContactProps } from './s-auth-verify-contact';

export { SAuthAddSecondaryContact, authAddSecondaryContactVariants, contactMethodCardVariants } from './s-auth-add-secondary-contact';
export type { AuthAddSecondaryContactData, AuthAddSecondaryContactProps } from './s-auth-add-secondary-contact';

export { SAuthPasskey, authPasskeyVariants, passkeyFeatureCardVariants, passkeyStepIndicatorVariants } from './s-auth-passkey';
export type { AuthPasskeyData, AuthPasskeyProps, PasskeyCredential } from './s-auth-passkey';

export { SAuthHandle, authHandleVariants, handlePreviewVariants, handleSuggestionVariants } from './s-auth-handle';
export type { AuthHandleData, AuthHandleProps, HandleSuggestion } from './s-auth-handle';

export { SAuthFork, authForkVariants, forkPathCardVariants, pathIconVariants } from './s-auth-fork';
export type { AuthForkData, AuthForkProps, AuthForkPath } from './s-auth-fork';

export { SAuthConnectSocials, authConnectSocialsVariants, socialProviderCardVariants, socialIconVariants } from './s-auth-connect-socials';
export type { AuthConnectSocialsData, AuthConnectSocialsProps, SocialProvider, SocialConnection } from './s-auth-connect-socials';

export { SAuthSetFavorites, authSetFavoritesVariants, favoritesCategoryVariants, favoriteItemCardVariants, favoriteItemIconVariants } from './s-auth-set-favorites';
export type { AuthSetFavoritesData, AuthSetFavoritesProps, FavoriteCategory, FavoriteItem } from './s-auth-set-favorites';

// Platform Detection & Feature Detection Structures (Epic 81)
export { 
  FeatureGuard, 
  MultipleFeatureGuard,
  FeatureDetectionProvider,
  useFeatureDetectionContext,
  withFeatureGuard 
} from './feature-guard';
export type { 
  FeatureGuardProps, 
  MultipleFeatureGuardProps,
  FeatureDetectionProviderProps,
  FeatureDetectionContextValue 
} from './feature-guard';

// Account Management Structures (PRD v11)
export { SProfileForm, sProfileFormVariants } from './s-profile-form';
export type { ProfileFormField, ProfileFormSection, ProfileFormAction } from './s-profile-form';

export { SSecurityForm, sSecurityFormVariants } from './s-security-form';
export type { SecurityDevice, SecuritySetting, SecuritySection } from './s-security-form';

export { SSettingsForm, sSettingsFormVariants } from './s-settings-form';
export type { SettingField, SettingOption, SettingsSection } from './s-settings-form';

export { SConnectionsList, sConnectionsListVariants } from './s-connections-list';
export type { SocialConnection, ConnectionAction } from './s-connections-list';

export { SPermissionsList, sPermissionsListVariants } from './s-permissions-list';
export type { DevicePermission, PermissionAction, PermissionStatus, PermissionRisk, PermissionType } from './s-permissions-list';

export { SListItemLink, sListItemLinkVariants } from './s-list-item-link';
export type { ListItemLinkProps } from './s-list-item-link';

export { SListItemSwitch, sListItemSwitchVariants } from './s-list-item-switch';
export type { ListItemSwitchProps } from './s-list-item-switch';
