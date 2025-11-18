/**
 * @fileoverview Contact Picker Hook for Epic 57 - AAE Contact Picker
 * Provides comprehensive contact picker capabilities using the Contact Picker API.
 * Handles contact selection with privacy-preserving mechanisms and graceful error handling.
 */

import { useState, useCallback, useRef } from 'react';

// Contact picker types
export interface ContactInfo {
  /** Contact's display name */
  name?: string[];
  /** Contact's email addresses */
  email?: string[];
  /** Contact's phone numbers */
  tel?: string[];
  /** Contact's addresses */
  address?: ContactAddress[];
  /** Contact's avatars/icons */
  icon?: Blob[];
}

export interface ContactAddress {
  /** Address line 1 */
  addressLine?: string[];
  /** City */
  city?: string;
  /** Country */
  country?: string;
  /** Dependent locality */
  dependentLocality?: string;
  /** Language code */
  languageCode?: string;
  /** Organization */
  organization?: string;
  /** Phone number */
  phone?: string;
  /** Postal code */
  postalCode?: string;
  /** Recipient name */
  recipient?: string;
  /** Region/state */
  region?: string;
  /** Sorting code */
  sortingCode?: string;
}

export interface ContactPickerOptions {
  /** Allow multiple contact selection */
  multiple?: boolean;
  /** Callback when contacts are successfully selected */
  onSuccess?: (contacts: ContactInfo[]) => void;
  /** Callback when selection is cancelled */
  onCancel?: () => void;
  /** Callback when error occurs */
  onError?: (error: ContactPickerError) => void;
}

export interface ContactPickerError {
  type:
    | 'not_supported'
    | 'permission_denied'
    | 'not_allowed'
    | 'abort'
    | 'general';
  message: string;
  originalError?: Error;
}

export interface ContactPickerState {
  isSupported: boolean;
  isLoading: boolean;
  selectedContacts: ContactInfo[];
  lastError: ContactPickerError | null;
  selectionCount: number;
}

export interface ContactPickerFilters {
  /** Filter contacts that have names */
  hasName?: boolean;
  /** Filter contacts that have email addresses */
  hasEmail?: boolean;
  /** Filter contacts that have phone numbers */
  hasPhone?: boolean;
  /** Filter contacts that have addresses */
  hasAddress?: boolean;
}

export interface UseContactPickerReturn {
  // State
  state: ContactPickerState;
  error: ContactPickerError | null;

  // Actions
  openPicker: (
    properties: string[],
    options?: ContactPickerOptions
  ) => Promise<ContactInfo[]>;
  openPickerForEmails: (
    options?: ContactPickerOptions
  ) => Promise<ContactInfo[]>;
  openPickerForPhones: (
    options?: ContactPickerOptions
  ) => Promise<ContactInfo[]>;
  openPickerForAll: (options?: ContactPickerOptions) => Promise<ContactInfo[]>;

  // Utilities
  isSupported: boolean;
  getAvailableProperties: () => Promise<string[]>;
  filterContacts: (
    contacts: ContactInfo[],
    filters: ContactPickerFilters
  ) => ContactInfo[];
  formatContact: (
    contact: ContactInfo,
    format?: 'full' | 'name' | 'email' | 'phone'
  ) => string;
  clearError: () => void;
  clearContacts: () => void;
}

// Check if Contact Picker API is supported
const isContactPickerSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    'navigator' in window &&
    'contacts' in navigator &&
    'select' in (navigator as any).contacts &&
    typeof (navigator as any).contacts.select === 'function'
  );
};

// Utility functions
const formatContactName = (contact: ContactInfo): string => {
  if (contact.name && contact.name.length > 0) {
    return contact.name.join(' ');
  }
  return 'Unknown Contact';
};

const formatContactEmail = (contact: ContactInfo): string => {
  if (contact.email && contact.email.length > 0) {
    return contact.email[0];
  }
  return '';
};

const formatContactPhone = (contact: ContactInfo): string => {
  if (contact.tel && contact.tel.length > 0) {
    return contact.tel[0];
  }
  return '';
};

const validateProperties = (properties: string[]): boolean => {
  const validProperties = ['name', 'email', 'tel', 'address', 'icon'];
  return (
    properties.length > 0 &&
    properties.every(prop => validProperties.includes(prop))
  );
};

const sanitizeProperties = (properties: string[]): string[] => {
  const validProperties = ['name', 'email', 'tel', 'address', 'icon'];
  return properties.filter(prop => validProperties.includes(prop));
};

/**
 * Contact Picker Hook
 * Manages contact selection using the Contact Picker API with privacy-preserving access
 */
export function useContactPicker(
  defaultOptions: ContactPickerOptions = {}
): UseContactPickerReturn {
  const { multiple = false, onSuccess, onCancel, onError } = defaultOptions;

  // State
  const [state, setState] = useState<ContactPickerState>({
    isSupported: isContactPickerSupported(),
    isLoading: false,
    selectedContacts: [],
    lastError: null,
    selectionCount: 0,
  });

  const [error, setError] = useState<ContactPickerError | null>(null);

  // Refs for cleanup
  const abortControllerRef = useRef<AbortController | null>(null);

  // Error handling
  const handleError = useCallback(
    (
      type: ContactPickerError['type'],
      message: string,
      originalError?: Error
    ) => {
      const contactPickerError: ContactPickerError = {
        type,
        message,
        originalError,
      };
      setError(contactPickerError);
      setState(prev => ({
        ...prev,
        lastError: contactPickerError,
        isLoading: false,
      }));
      onError?.(contactPickerError);
    },
    [onError]
  );

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
    setState(prev => ({ ...prev, lastError: null }));
  }, []);

  // Clear contacts
  const clearContacts = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedContacts: [],
      selectionCount: 0,
    }));
  }, []);

  // Get available properties
  const getAvailableProperties = useCallback(async (): Promise<string[]> => {
    if (!state.isSupported) {
      return [];
    }

    try {
      const navigator = window.navigator as any;
      if (navigator.contacts.getProperties) {
        return await navigator.contacts.getProperties();
      }

      // Fallback to standard properties
      return ['name', 'email', 'tel', 'address', 'icon'];
    } catch (err) {
      console.warn('Failed to get available contact properties:', err);
      return ['name', 'email', 'tel'];
    }
  }, [state.isSupported]);

  // Filter contacts
  const filterContacts = useCallback(
    (contacts: ContactInfo[], filters: ContactPickerFilters): ContactInfo[] => {
      return contacts.filter(contact => {
        if (filters.hasName && (!contact.name || contact.name.length === 0)) {
          return false;
        }
        if (
          filters.hasEmail &&
          (!contact.email || contact.email.length === 0)
        ) {
          return false;
        }
        if (filters.hasPhone && (!contact.tel || contact.tel.length === 0)) {
          return false;
        }
        if (
          filters.hasAddress &&
          (!contact.address || contact.address.length === 0)
        ) {
          return false;
        }
        return true;
      });
    },
    []
  );

  // Format contact
  const formatContact = useCallback(
    (
      contact: ContactInfo,
      format: 'full' | 'name' | 'email' | 'phone' = 'full'
    ): string => {
      switch (format) {
        case 'name':
          return formatContactName(contact);

        case 'email':
          return formatContactEmail(contact);

        case 'phone':
          return formatContactPhone(contact);

        case 'full':
        default:
          const name = formatContactName(contact);
          const email = formatContactEmail(contact);
          const phone = formatContactPhone(contact);

          const parts = [name];
          if (email) parts.push(email);
          if (phone) parts.push(phone);

          return parts.join(' • ');
      }
    },
    []
  );

  // Main contact picker function
  const openPicker = useCallback(
    async (
      properties: string[],
      options: ContactPickerOptions = {}
    ): Promise<ContactInfo[]> => {
      if (!state.isSupported) {
        handleError(
          'not_supported',
          'Contact Picker API is not supported in this browser'
        );
        return [];
      }

      if (!validateProperties(properties)) {
        handleError(
          'general',
          'Invalid properties specified. Use: name, email, tel, address, icon'
        );
        return [];
      }

      clearError();
      setState(prev => ({ ...prev, isLoading: true }));

      // Abort previous picker if still in progress
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      try {
        const navigator = window.navigator as any;
        const sanitizedProperties = sanitizeProperties(properties);
        const pickerOptions = {
          multiple:
            options.multiple !== undefined ? options.multiple : multiple,
        };

        // Select contacts
        const selectedContacts: ContactInfo[] = await navigator.contacts.select(
          sanitizedProperties,
          pickerOptions
        );

        // Success
        setState(prev => ({
          ...prev,
          isLoading: false,
          selectedContacts,
          selectionCount: prev.selectionCount + selectedContacts.length,
        }));

        // Call callbacks
        options.onSuccess?.(selectedContacts) || onSuccess?.(selectedContacts);

        return selectedContacts;
      } catch (err) {
        const error = err as Error;

        setState(prev => ({ ...prev, isLoading: false }));

        if (error.name === 'AbortError') {
          // User cancelled the picker
          options.onCancel?.() || onCancel?.();
          return [];
        } else if (error.name === 'NotAllowedError') {
          handleError(
            'permission_denied',
            'Contact access permission denied or picker requires user gesture'
          );
          return [];
        } else if (error.name === 'NotSupportedError') {
          handleError('not_supported', 'Contact Picker API is not supported');
          return [];
        } else {
          handleError(
            'general',
            `Contact picker failed: ${error.message}`,
            error
          );
          return [];
        }
      }
    },
    [state.isSupported, multiple, handleError, clearError, onSuccess, onCancel]
  );

  // Convenience function for picking email contacts
  const openPickerForEmails = useCallback(
    async (options?: ContactPickerOptions): Promise<ContactInfo[]> => {
      return openPicker(['name', 'email'], options);
    },
    [openPicker]
  );

  // Convenience function for picking phone contacts
  const openPickerForPhones = useCallback(
    async (options?: ContactPickerOptions): Promise<ContactInfo[]> => {
      return openPicker(['name', 'tel'], options);
    },
    [openPicker]
  );

  // Convenience function for picking all contact info
  const openPickerForAll = useCallback(
    async (options?: ContactPickerOptions): Promise<ContactInfo[]> => {
      return openPicker(['name', 'email', 'tel', 'address'], options);
    },
    [openPicker]
  );

  return {
    // State
    state,
    error,

    // Actions
    openPicker,
    openPickerForEmails,
    openPickerForPhones,
    openPickerForAll,

    // Utilities
    isSupported: state.isSupported,
    getAvailableProperties,
    filterContacts,
    formatContact,
    clearError,
    clearContacts,
  };
}

// Utility functions
export const ContactPickerUtils = {
  isSupported: isContactPickerSupported,
  validateProperties,
  sanitizeProperties,

  /**
   * Get browser support information
   */
  getBrowserSupport: () => ({
    chrome: 'Supported since Chrome 80 (Android only)',
    firefox: 'Not supported',
    safari: 'Not supported (including iOS)',
    edge: 'Supported since Edge 80 (Android only)',
    mobile: 'Android Chrome/Edge only - iOS Safari not supported',
  }),

  /**
   * Format multiple contacts as a readable list
   */
  formatContactList: (
    contacts: ContactInfo[],
    separator: string = ', '
  ): string => {
    return contacts.map(contact => formatContactName(contact)).join(separator);
  },

  /**
   * Extract specific property from all contacts
   */
  extractProperty: (
    contacts: ContactInfo[],
    property: 'name' | 'email' | 'tel'
  ): string[] => {
    const results: string[] = [];

    contacts.forEach(contact => {
      switch (property) {
        case 'name':
          if (contact.name) results.push(...contact.name);
          break;
        case 'email':
          if (contact.email) results.push(...contact.email);
          break;
        case 'tel':
          if (contact.tel) results.push(...contact.tel);
          break;
      }
    });

    return [...new Set(results)]; // Remove duplicates
  },

  /**
   * Get contact statistics
   */
  getContactStats: (contacts: ContactInfo[]) => ({
    total: contacts.length,
    withNames: contacts.filter(c => c.name && c.name.length > 0).length,
    withEmails: contacts.filter(c => c.email && c.email.length > 0).length,
    withPhones: contacts.filter(c => c.tel && c.tel.length > 0).length,
    withAddresses: contacts.filter(c => c.address && c.address.length > 0)
      .length,
  }),

  /**
   * Convert contacts to common formats
   */
  exportContacts: (
    contacts: ContactInfo[],
    format: 'csv' | 'json' | 'vcard'
  ) => {
    switch (format) {
      case 'csv':
        const headers = 'Name,Email,Phone';
        const rows = contacts.map(contact => {
          const name = formatContactName(contact);
          const email = formatContactEmail(contact);
          const phone = formatContactPhone(contact);
          return `"${name}","${email}","${phone}"`;
        });
        return [headers, ...rows].join('\n');

      case 'json':
        return JSON.stringify(contacts, null, 2);

      case 'vcard':
        return contacts
          .map(contact => {
            const name = formatContactName(contact);
            const email = formatContactEmail(contact);
            const phone = formatContactPhone(contact);

            let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
            vcard += `FN:${name}\n`;
            if (email) vcard += `EMAIL:${email}\n`;
            if (phone) vcard += `TEL:${phone}\n`;
            vcard += 'END:VCARD';

            return vcard;
          })
          .join('\n\n');

      default:
        return '';
    }
  },

  /**
   * Common property combinations
   */
  getPropertyCombinations: () => ({
    basic: ['name'],
    email: ['name', 'email'],
    phone: ['name', 'tel'],
    full: ['name', 'email', 'tel', 'address'],
    minimal: ['name', 'email'],
    business: ['name', 'email', 'tel', 'address'],
  }),

  /**
   * Privacy considerations for contact access
   */
  getPrivacyGuidelines: () => [
    'Only request the minimum contact properties needed for your use case',
    'Clearly explain to users why you need access to their contacts',
    'Respect user choice - handle cancellation gracefully',
    'Do not store contact data unless absolutely necessary',
    'Implement secure data handling if contact data must be stored',
    'Consider implementing a fallback for unsupported browsers',
    'The Contact Picker API is privacy-preserving - contacts are not exposed to your app until explicitly selected',
  ],

  /**
   * Get usage recommendations
   */
  getUsageRecommendations: () => ({
    whenToUse: [
      'Sharing content with specific contacts',
      'Inviting contacts to events or applications',
      'Populating forms with contact information',
      'Creating contact-based features (messaging, calling)',
      'Building social features that connect users with their contacts',
    ],
    whenNotToUse: [
      'Bulk contact harvesting or data mining',
      'Building contact databases without explicit user consent',
      'Any use case that violates user privacy expectations',
      'On platforms where the API is not supported (iOS, desktop browsers)',
    ],
    bestPractices: [
      'Always check for API support before offering contact picker features',
      'Provide clear UI indicators about what contact data will be accessed',
      'Implement graceful fallbacks for unsupported browsers',
      'Use the most specific property combination for your use case',
      'Handle errors gracefully and provide helpful error messages',
      'Respect the multiple option - only request multiple contacts if needed',
    ],
  }),
};

export default useContactPicker;
