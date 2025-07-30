/**
 * @fileoverview AAE Types for App Shortcuts and Web App Manifest (Epic 50)
 * TypeScript interfaces for Acrobi's Advanced Experiences configuration including
 * app shortcuts, manifest configuration, and related AAE capabilities.
 */

/**
 * Icon definition for use in shortcuts and manifest
 */
export interface ManifestIcon {
  /** Icon source URL */
  src: string;
  /** Icon sizes (e.g., "192x192") */
  sizes?: string;
  /** Icon MIME type */
  type?: string;
  /** Icon purpose (maskable, any, monochrome) */
  purpose?: 'maskable' | 'any' | 'monochrome' | string;
}

/**
 * Screenshot definition for app store listings
 */
export interface ManifestScreenshot {
  /** Screenshot source URL */
  src: string;
  /** Screenshot sizes (e.g., "1280x720") */
  sizes?: string;
  /** Screenshot MIME type */
  type?: string;
  /** Form factor (narrow, wide) */
  form_factor?: 'narrow' | 'wide';
  /** Screenshot label/description */
  label?: string;
}

/**
 * Related application definition
 */
export interface RelatedApplication {
  /** Platform identifier (play, itunes, windows, webapp, chrome_web_store, etc.) */
  platform: string;
  /** Application URL or identifier */
  url?: string;
  /** Platform-specific application ID */
  id?: string;
  /** Minimum version required */
  min_version?: string;
  /** Application fingerprints for verification */
  fingerprints?: Array<{
    type: string;
    value: string;
  }>;
}

/**
 * Parameters for the share target
 * Maps shared data to query parameters or form fields
 */
export interface ShareTargetParams {
  /** Query parameter name for title */
  title?: string;
  /** Query parameter name for text */
  text?: string;
  /** Query parameter name for URL */
  url?: string;
}

/**
 * File configuration for share target
 * Defines how files are accepted when shared to the AAE
 */
export interface ShareTargetFile {
  /** File input name */
  name: string;
  /** Accepted MIME types or file extensions */
  accept: string | string[];
}

/**
 * Web Share Target configuration
 * Enables the AAE to receive shared content from other applications
 */
export interface ShareTarget {
  /** URL to handle shared content - must be within the app's scope */
  action: string;
  /** HTTP method for the share request */
  method?: 'GET' | 'POST';
  /** Parameters mapping for shared data */
  params?: ShareTargetParams;
  /** Content encoding type for POST requests */
  enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data';
  /** File sharing configuration */
  files?: ShareTargetFile[];
}

/**
 * Shared data received by the AAE
 * Represents the data passed to the share target handler
 */
export interface SharedData {
  /** Shared title */
  title?: string;
  /** Shared text content */
  text?: string;
  /** Shared URL */
  url?: string;
  /** Shared files */
  files?: File[];
}

/**
 * Share target handler options
 * Configuration for processing shared content
 */
export interface ShareTargetHandlerOptions {
  /** Custom parameter names mapping */
  paramMapping?: ShareTargetParams;
  /** File processing options */
  fileOptions?: {
    maxFileSize?: number;
    allowedTypes?: string[];
    maxFiles?: number;
  };
  /** URL validation options */
  urlValidation?: {
    allowedDomains?: string[];
    requireHttps?: boolean;
  };
}

/**
 * Share target validation result
 * Result of validating share target configuration
 */
export interface ShareTargetValidation {
  /** Whether the share target configuration is valid */
  valid: boolean;
  /** Validation errors */
  errors: string[];
  /** Validation warnings */
  warnings: string[];
}

/**
 * Share target browser support information
 * Information about browser support for Web Share Target API
 */
export interface ShareTargetSupport {
  /** Whether share target is supported */
  isSupported: boolean;
  /** Browser information */
  browserInfo: string;
  /** Support limitations */
  limitations: string[];
  /** Required features */
  requirements: string[];
}

/**
 * App shortcut definition for quick access to specific app functions
 * Provides users with quick access to key tasks within your app
 */
export interface ShortcutItem {
  /**
   * The name of the shortcut as displayed to the user
   * Should be concise and descriptive (max ~25 characters recommended)
   */
  name: string;

  /**
   * Optional shorter version of the name for constrained spaces
   * Recommended when name is longer than ~12 characters
   */
  short_name?: string;

  /**
   * Detailed description of what the shortcut does
   * Useful for accessibility and context
   */
  description?: string;

  /**
   * The URL that the shortcut should navigate to when activated
   * Should be a valid path within your application (e.g., "/profile", "/new-task")
   * Must be within the scope of your AAE
   */
  url: string;

  /**
   * Array of icons for the shortcut
   * Recommended sizes: 96x96, 192x192, 256x256, 512x512
   * At least one icon is recommended for better UX
   */
  icons?: ManifestIcon[];
}

/**
 * Complete Web App Manifest interface
 * Defines metadata and configuration for Acrobi's Advanced Experiencess
 */
export interface WebAppManifest {
  /** Application name as displayed to users */
  name: string;

  /** Short name for spaces where full name may be too long */
  short_name?: string;

  /** Description of the application */
  description?: string;

  /** Start URL when the app is launched */
  start_url?: string;

  /** Scope of the application - which URLs are considered part of the app */
  scope?: string;

  /** Display mode (fullscreen, standalone, minimal-ui, browser) */
  display?: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';

  /** Screen orientation preference */
  orientation?:
    | 'any'
    | 'natural'
    | 'landscape'
    | 'portrait'
    | 'portrait-primary'
    | 'portrait-secondary'
    | 'landscape-primary'
    | 'landscape-secondary';

  /** Theme color for browser UI */
  theme_color?: string;

  /** Background color shown while app is loading */
  background_color?: string;

  /** Application category */
  categories?: string[];

  /** Application icons for various sizes and purposes */
  icons?: ManifestIcon[];

  /** Screenshots for app store listings and installation prompts */
  screenshots?: ManifestScreenshot[];

  /** Language tag for the manifest */
  lang?: string;

  /** Text direction (ltr, rtl, auto) */
  dir?: 'ltr' | 'rtl' | 'auto';

  /**
   * App shortcuts for quick access to key functionality
   * Maximum of 4 shortcuts recommended for best UX
   * Each shortcut provides direct access to specific app features
   */
  shortcuts?: ShortcutItem[];

  /** Related applications on other platforms */
  related_applications?: RelatedApplication[];

  /** Whether to prefer related applications over this web app */
  prefer_related_applications?: boolean;

  /** Application ID for identification */
  id?: string;

  /** Installation prompt handling */
  iarc_rating_id?: string;

  /** Custom protocol handlers */
  protocol_handlers?: Array<{
    protocol: string;
    url: string;
  }>;

  /** File handlers for opening specific file types */
  file_handlers?: Array<{
    action: string;
    accept: Record<string, string[]>;
    icons?: ManifestIcon[];
    launch_type?: 'single-client' | 'multiple-clients';
  }>;

  /** Share target configuration for receiving shared content */
  share_target?: ShareTarget;

  /** Edge-specific pinned sites configuration */
  ms_pinned_sites?: {
    application_name: string;
    msapplication_tooltip?: string;
    msapplication_window?: string;
    msapplication_task?: Array<{
      name: string;
      action_uri: string;
      icon_uri: string;
    }>;
  };
}

/**
 * Utility type for common shortcut categories
 * Use these predefined shortcuts for consistent UX across Acrobi apps
 */
export const CommonShortcuts = {
  /** User profile/account management */
  PROFILE: {
    name: 'Profile',
    description: 'View and edit your profile',
    url: '/profile',
  },

  /** Create new content */
  CREATE: {
    name: 'New',
    short_name: 'New',
    description: 'Create new content',
    url: '/new',
  },

  /** Search functionality */
  SEARCH: {
    name: 'Search',
    description: 'Search content and users',
    url: '/search',
  },

  /** Settings/preferences */
  SETTINGS: {
    name: 'Settings',
    description: 'App settings and preferences',
    url: '/settings',
  },

  /** Notifications/messages */
  NOTIFICATIONS: {
    name: 'Notifications',
    short_name: 'Notes',
    description: 'View notifications and messages',
    url: '/notifications',
  },

  /** Dashboard/home */
  DASHBOARD: {
    name: 'Dashboard',
    description: 'Main dashboard view',
    url: '/dashboard',
  },
} as const;

/**
 * Helper type for extracting shortcut templates
 */
export type CommonShortcutKey = keyof typeof CommonShortcuts;

/**
 * Validation utilities for AAE manifest and shortcuts
 */
export class AAEValidationUtils {
  /**
   * Validate a shortcut item
   */
  static validateShortcut(shortcut: ShortcutItem): string[] {
    const errors: string[] = [];

    if (!shortcut.name || shortcut.name.trim().length === 0) {
      errors.push('Shortcut name is required');
    }

    if (shortcut.name && shortcut.name.length > 25) {
      errors.push('Shortcut name should be 25 characters or less');
    }

    if (!shortcut.url || shortcut.url.trim().length === 0) {
      errors.push('Shortcut URL is required');
    }

    if (shortcut.url && !shortcut.url.startsWith('/')) {
      errors.push('Shortcut URL should be a relative path starting with /');
    }

    if (shortcut.short_name && shortcut.short_name.length > 12) {
      errors.push('Shortcut short_name should be 12 characters or less');
    }

    return errors;
  }

  /**
   * Validate shortcuts array
   */
  static validateShortcuts(shortcuts: ShortcutItem[]): string[] {
    const errors: string[] = [];

    if (shortcuts.length > 4) {
      errors.push('Maximum of 4 shortcuts recommended for best UX');
    }

    const urls = new Set<string>();
    const names = new Set<string>();

    shortcuts.forEach((shortcut, index) => {
      const shortcutErrors = this.validateShortcut(shortcut);
      shortcutErrors.forEach(error => {
        errors.push(`Shortcut ${index + 1}: ${error}`);
      });

      if (urls.has(shortcut.url)) {
        errors.push(`Duplicate shortcut URL: ${shortcut.url}`);
      }
      urls.add(shortcut.url);

      if (names.has(shortcut.name)) {
        errors.push(`Duplicate shortcut name: ${shortcut.name}`);
      }
      names.add(shortcut.name);
    });

    return errors;
  }

  /**
   * Validate share target configuration
   */
  static validateShareTarget(shareTarget: ShareTarget): ShareTargetValidation {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate action URL
    if (!shareTarget.action || shareTarget.action.trim().length === 0) {
      errors.push('Share target action URL is required');
    } else if (!shareTarget.action.startsWith('/')) {
      errors.push(
        'Share target action should be a relative path starting with /'
      );
    }

    // Validate method
    if (shareTarget.method && !['GET', 'POST'].includes(shareTarget.method)) {
      errors.push('Share target method must be GET or POST');
    }

    // Validate enctype for POST requests
    if (shareTarget.method === 'POST') {
      if (!shareTarget.enctype) {
        warnings.push('enctype recommended for POST requests');
      } else if (
        !['application/x-www-form-urlencoded', 'multipart/form-data'].includes(
          shareTarget.enctype
        )
      ) {
        errors.push(
          'enctype must be application/x-www-form-urlencoded or multipart/form-data'
        );
      }

      // Files require multipart/form-data
      if (
        shareTarget.files &&
        shareTarget.files.length > 0 &&
        shareTarget.enctype !== 'multipart/form-data'
      ) {
        errors.push('File sharing requires enctype: multipart/form-data');
      }
    }

    // Validate files configuration
    if (shareTarget.files) {
      shareTarget.files.forEach((file, index) => {
        if (!file.name || file.name.trim().length === 0) {
          errors.push(`File ${index + 1}: name is required`);
        }

        if (
          !file.accept ||
          (Array.isArray(file.accept) && file.accept.length === 0)
        ) {
          errors.push(`File ${index + 1}: accept types are required`);
        }
      });
    }

    // Validate params
    if (shareTarget.params) {
      const paramNames = Object.values(shareTarget.params).filter(Boolean);
      if (paramNames.length === 0) {
        warnings.push('At least one parameter mapping recommended');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Get share target browser support information
   */
  static getShareTargetSupport(): ShareTargetSupport {
    const isSupported = 'navigator' in globalThis && 'share' in navigator;

    let browserInfo = 'Unknown browser';
    const limitations: string[] = [];
    const requirements: string[] = [];

    if (typeof navigator !== 'undefined') {
      const userAgent = navigator.userAgent;

      if (userAgent.includes('Chrome')) {
        browserInfo = 'Chrome';
        if (!isSupported) {
          limitations.push(
            'Requires Chrome 89+ for full Web Share Target support'
          );
        }
        requirements.push('AAE must be installed');
        requirements.push('HTTPS connection required');
      } else if (userAgent.includes('Firefox')) {
        browserInfo = 'Firefox';
        limitations.push('Limited Web Share Target support in Firefox');
      } else if (userAgent.includes('Safari')) {
        browserInfo = 'Safari';
        limitations.push('Web Share Target not fully supported in Safari');
      } else if (userAgent.includes('Edge')) {
        browserInfo = 'Edge';
        if (!isSupported) {
          limitations.push('Requires Edge 89+ for Web Share Target support');
        }
        requirements.push('AAE must be installed');
      }
    }

    requirements.push('Valid web app manifest');
    requirements.push('Service worker registration');

    return {
      isSupported,
      browserInfo,
      limitations,
      requirements,
    };
  }

  /**
   * Validate web app manifest
   */
  static validateManifest(manifest: WebAppManifest): string[] {
    const errors: string[] = [];

    if (!manifest.name || manifest.name.trim().length === 0) {
      errors.push('Manifest name is required');
    }

    if (!manifest.start_url) {
      errors.push('Manifest start_url is recommended');
    }

    if (!manifest.icons || manifest.icons.length === 0) {
      errors.push('At least one icon is required');
    }

    if (manifest.shortcuts) {
      const shortcutErrors = this.validateShortcuts(manifest.shortcuts);
      errors.push(...shortcutErrors);
    }

    if (manifest.share_target) {
      const shareTargetValidation = this.validateShareTarget(
        manifest.share_target
      );
      errors.push(...shareTargetValidation.errors);
    }

    return errors;
  }
}

/**
 * Helper functions for creating share targets
 */
export class ShareTargetHelpers {
  /**
   * Create a basic text/URL share target
   */
  static createTextShareTarget(
    action: string,
    method: 'GET' | 'POST' = 'GET'
  ): ShareTarget {
    return {
      action,
      method,
      params: {
        title: 'title',
        text: 'text',
        url: 'url',
      },
    };
  }

  /**
   * Create a file share target
   */
  static createFileShareTarget(
    action: string,
    fileConfig: ShareTargetFile[]
  ): ShareTarget {
    return {
      action,
      method: 'POST',
      enctype: 'multipart/form-data',
      files: fileConfig,
      params: {
        title: 'title',
        text: 'text',
      },
    };
  }

  /**
   * Create an image share target
   */
  static createImageShareTarget(action: string): ShareTarget {
    return this.createFileShareTarget(action, [
      {
        name: 'images',
        accept: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      },
    ]);
  }

  /**
   * Create a comprehensive share target that accepts both text and files
   */
  static createUniversalShareTarget(action: string): ShareTarget {
    return {
      action,
      method: 'POST',
      enctype: 'multipart/form-data',
      params: {
        title: 'title',
        text: 'text',
        url: 'url',
      },
      files: [
        {
          name: 'files',
          accept: [
            'image/*',
            'video/*',
            'audio/*',
            'text/plain',
            'application/pdf',
          ],
        },
      ],
    };
  }

  /**
   * Common share target configurations
   */
  static readonly COMMON_TARGETS = {
    /** Basic text and URL sharing */
    TEXT_ONLY: {
      action: '/share',
      method: 'GET' as const,
      params: {
        title: 'title',
        text: 'text',
        url: 'url',
      },
    },

    /** Image sharing */
    IMAGES: {
      action: '/share/images',
      method: 'POST' as const,
      enctype: 'multipart/form-data' as const,
      files: [
        {
          name: 'images',
          accept: ['image/*'],
        },
      ],
    },

    /** Document sharing */
    DOCUMENTS: {
      action: '/share/documents',
      method: 'POST' as const,
      enctype: 'multipart/form-data' as const,
      files: [
        {
          name: 'documents',
          accept: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
          ],
        },
      ],
    },
  } as const;
}

/**
 * Helper functions for creating shortcuts
 */
export class ShortcutHelpers {
  /**
   * Create a shortcut from a common template
   */
  static fromTemplate(
    key: CommonShortcutKey,
    overrides?: Partial<ShortcutItem>
  ): ShortcutItem {
    return { ...CommonShortcuts[key], ...overrides };
  }

  /**
   * Create a shortcut with proper icon paths
   */
  static createWithIcons(
    shortcut: Omit<ShortcutItem, 'icons'>,
    iconBasePath: string = '/icons/shortcuts'
  ): ShortcutItem {
    const iconName = shortcut.name.toLowerCase().replace(/\s+/g, '-');

    return {
      ...shortcut,
      icons: [
        {
          src: `${iconBasePath}/${iconName}-96.png`,
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: `${iconBasePath}/${iconName}-192.png`,
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: `${iconBasePath}/${iconName}-256.png`,
          sizes: '256x256',
          type: 'image/png',
        },
      ],
    };
  }

  /**
   * Generate shortcuts for common Acrobi app patterns
   */
  static generateAcrobiDefaults(basePath: string = ''): ShortcutItem[] {
    return [
      this.createWithIcons({
        ...CommonShortcuts.PROFILE,
        url: `${basePath}/profile`,
      }),
      this.createWithIcons({
        ...CommonShortcuts.CREATE,
        url: `${basePath}/new`,
      }),
      this.createWithIcons({
        ...CommonShortcuts.SEARCH,
        url: `${basePath}/search`,
      }),
      this.createWithIcons({
        ...CommonShortcuts.NOTIFICATIONS,
        url: `${basePath}/notifications`,
      }),
    ];
  }
}

// Export all types for easy importing
export type {
  ManifestIcon,
  ManifestScreenshot,
  RelatedApplication,
  ShareTargetParams,
  ShareTargetFile,
  ShareTarget,
  SharedData,
  ShareTargetHandlerOptions,
  ShareTargetValidation,
  ShareTargetSupport,
  ShortcutItem,
  WebAppManifest,
};

// Export utilities
export {
  AAEValidationUtils,
  ShareTargetHelpers,
  ShortcutHelpers,
  CommonShortcuts,
};

// Default export for convenience
export default {
  AAEValidationUtils,
  ShareTargetHelpers,
  ShortcutHelpers,
  CommonShortcuts,
  validateShortcut: AAEValidationUtils.validateShortcut,
  validateShortcuts: AAEValidationUtils.validateShortcuts,
  validateShareTarget: AAEValidationUtils.validateShareTarget,
  validateManifest: AAEValidationUtils.validateManifest,
  getShareTargetSupport: AAEValidationUtils.getShareTargetSupport,
  createTextShareTarget: ShareTargetHelpers.createTextShareTarget,
  createFileShareTarget: ShareTargetHelpers.createFileShareTarget,
  createImageShareTarget: ShareTargetHelpers.createImageShareTarget,
  createUniversalShareTarget: ShareTargetHelpers.createUniversalShareTarget,
  fromTemplate: ShortcutHelpers.fromTemplate,
  createWithIcons: ShortcutHelpers.createWithIcons,
  generateAcrobiDefaults: ShortcutHelpers.generateAcrobiDefaults,
};
