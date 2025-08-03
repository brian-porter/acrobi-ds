// V4 Modules
export { Hero, type HeroProps, type HeroAction } from './hero';
export { SecList, type SecListProps } from './sec-list';
export {
  ProductGrid,
  type ProductGridProps,
  type ProductGridProduct,
} from './product-grid';

// V7 Workflow Modules
export {
  AddCollection,
  type AddCollectionProps,
  type CollectionData,
  type CollectionType,
} from './add-collection';

export {
  AssignTo,
  type AssignToProps,
  type Person,
  type Group,
} from './assign-to';

export {
  Copy,
  type CopyProps,
  type CopyableObject,
  type CopyOptions,
} from './copy';

export {
  Delete,
  type DeleteProps,
  type DeletableObject,
  type SecurityLevel,
} from './delete';

export { Archive, type ArchiveProps, type ArchivableObject } from './archive';

export {
  Capture,
  type CaptureProps,
  type CaptureResult,
  type CaptureMode,
  type CaptureType,
} from './capture';

export { TextEditor, type EditorProps, type EditorMode } from './editor';

// V7 Menu System Modules
export { MenuActions, type MenuActionsProps } from './menu-actions';

export { MenuPosts, type MenuPostsProps } from './menu-posts';

export { MenuAdmin, type MenuAdminProps } from './menu-admin';

export {
  MenuViewStyle,
  type MenuViewStyleProps,
  type ViewStyle,
  type ViewStyleOption,
  defaultViewStyles,
} from './menu-view-style';

export {
  MenuSortStyle,
  type MenuSortStyleProps,
  type SortDirection,
  type SortField,
  type SortOption,
  type SortState,
  defaultSortOptions,
} from './menu-sort-style';

export {
  MenuSearch,
  type MenuSearchProps,
  type SearchFilter,
  type SearchSuggestion,
  type SearchScope,
} from './menu-search';

export {
  MenuPrivacy,
  type MenuPrivacyProps,
  type PrivacyLevel,
  type PrivacyOption,
  type PrivacySetting,
  defaultPrivacyOptions,
} from './menu-privacy';

// V8 AAE Modules
export {
  FindFriends,
  type FindFriendsProps,
  type Contact,
  type ContactPermission,
  type ConnectionStatus,
} from './find-friends';

export { GrantPermissions } from './grant-permissions';

// Enhanced AAE Scanner Module (Epic 41)
export { Scanner, type ScannerProps } from '../../modules/scanner';

// PRD v11 Account Interface Module components
// M-ImgEdit/M-FileAdd - Image uploading and editing workflow
export { MImgEdit } from './m-img-edit';
export type { ImageEditFile, MImgEditProps } from './m-img-edit';

// M-PasswordEdit - Change password dialog
export { MPasswordEdit } from './m-password-edit';
export type { MPasswordEditProps } from './m-password-edit';

// M-DeleteAccount - Multi-state delete/recover account dialog
export { MDeleteAccount } from './m-delete-account';
export type { AccountData, MDeleteAccountProps } from './m-delete-account';

// M-Grant - Device permissions request dialog
export { MGrant } from './m-grant';
export type { Permission, PermissionType, PermissionStatus, MGrant as MGrantProps } from './m-grant';

// M-SearchDialog - Search and favorite items dialog
export { MSearchDialog } from './m-search-dialog';
export type { 
  SearchItem, 
  SearchItemType, 
  SearchCategory, 
  SearchFilters, 
  MSearchDialogProps 
} from './m-search-dialog';

// PRD v12 Epic 88 - M-AuthFlow state machine module
export { MAuthFlow } from './m-auth-flow';
export type { 
  AuthFlowProps,
  AuthFlowState,
  AuthFlowType,
  AuthFlowEvent,
  AuthFlowContext,
  AuthFlowMachine
} from './m-auth-flow';
