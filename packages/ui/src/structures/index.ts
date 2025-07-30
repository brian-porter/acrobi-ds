// Acrobi Design System - Structures Export File

// Re-export existing auth structures from components folder
export { default as SAuthCreateAccount } from '../components/structures/s-auth-create-account';
export { default as SAuthVerifyContact } from '../components/structures/s-auth-verify-contact';
export { default as SAuthAddSecondaryContact } from '../components/structures/s-auth-add-secondary-contact';
export { default as SAuthPasskey } from '../components/structures/s-auth-passkey';
export { default as SAuthHandle } from '../components/structures/s-auth-handle';
export { default as SAuthFork } from '../components/structures/s-auth-fork';
export { default as SAuthConnectSocials } from '../components/structures/s-auth-connect-socials';
export { default as SAuthSetFavorites } from '../components/structures/s-auth-set-favorites';

// Epic 81: Platform Detection & Feature Guard - Progressive enhancement components
export { FeatureGuard, withFeatureGuard, useFeatureGuards } from './feature-guard';
export type { FeatureGuardProps } from './feature-guard';