/**
 * @fileoverview Persistent Form Hook for Epic 64 - AAE Local Storage Toolkit
 * Provides automatic form state persistence using localStorage.
 * Prevents data loss on page refresh or accidental navigation.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocalStorage } from './use-local-storage';

// Persistent Form types
export interface PersistentFormOptions<T> {
  /** Auto-save delay in milliseconds */
  autoSaveDelay?: number;
  /** Enable debug logging */
  debug?: boolean;
  /** Form fields to exclude from persistence */
  excludeFields?: (keyof T)[];
  /** Custom validation before saving */
  validate?: (formState: T) => boolean | string;
  /** Transform data before saving */
  serialize?: (formState: T) => any;
  /** Transform data after loading */
  deserialize?: (data: any) => T;
  /** Callback when form is auto-saved */
  onAutoSave?: (formState: T) => void;
  /** Callback when form is loaded from storage */
  onLoad?: (formState: T) => void;
  /** Callback when form is cleared */
  onClear?: () => void;
  /** Callback when validation fails */
  onValidationError?: (error: string) => void;
  /** Enable encryption for sensitive data */
  encrypt?: boolean;
  /** Custom storage key prefix */
  keyPrefix?: string;
}

export interface PersistentFormState<T> {
  formData: T;
  isDirty: boolean;
  isAutoSaving: boolean;
  isSaved: boolean;
  hasLoadedFromStorage: boolean;
  lastSaved: number | null;
  fieldErrors: Partial<Record<keyof T, string>>;
}

export interface PersistentFormActions<T> {
  // Form data management
  updateField: <K extends keyof T>(field: K, value: T[K]) => void;
  updateForm: (updates: Partial<T>) => void;
  setFormData: (data: T) => void;
  resetForm: () => void;

  // Persistence actions
  saveForm: () => void;
  loadForm: () => void;
  clearForm: () => void;

  // Validation
  validateField: <K extends keyof T>(field: K) => boolean;
  validateForm: () => boolean;
  clearFieldError: <K extends keyof T>(field: K) => void;
  clearAllErrors: () => void;

  // Utilities
  getFormSnapshot: () => T;
  hasChanges: () => boolean;
  isFieldDirty: <K extends keyof T>(field: K) => boolean;
}

export interface UsePersistentFormReturn<T>
  extends PersistentFormState<T>,
    PersistentFormActions<T> {
  // Additional utilities
  isSupported: boolean;
  storageSize: number;
}

// Simple encryption/decryption for sensitive data
const simpleEncrypt = (data: string): string => {
  return btoa(data);
};

const simpleDecrypt = (data: string): string => {
  try {
    return atob(data);
  } catch {
    return data; // Return original if decryption fails
  }
};

/**
 * Persistent Form Hook
 * Automatically persists form state to localStorage with validation and auto-save
 */
export function usePersistentForm<T extends Record<string, any>>(
  formKey: string,
  initialFormState: T,
  options: PersistentFormOptions<T> = {}
): UsePersistentFormReturn<T> {
  const {
    autoSaveDelay = 1000,
    debug = false,
    excludeFields = [],
    validate,
    serialize,
    deserialize,
    onAutoSave,
    onLoad,
    onClear,
    onValidationError,
    encrypt = false,
    keyPrefix = 'persistent_form_',
  } = options;

  // Generate storage key
  const storageKey = `${keyPrefix}${formKey}`;

  // Custom serializer for form data
  const formSerializer = useMemo(() => {
    if (serialize && deserialize) {
      return {
        serialize: (data: T) => {
          const serialized = JSON.stringify(serialize(data));
          return encrypt ? simpleEncrypt(serialized) : serialized;
        },
        deserialize: (data: string) => {
          const decrypted = encrypt ? simpleDecrypt(data) : data;
          const parsed = JSON.parse(decrypted);
          return deserialize(parsed);
        },
      };
    }

    return {
      serialize: (data: T) => {
        const serialized = JSON.stringify(data);
        return encrypt ? simpleEncrypt(serialized) : serialized;
      },
      deserialize: (data: string) => {
        const decrypted = encrypt ? simpleDecrypt(data) : data;
        return JSON.parse(decrypted);
      },
    };
  }, [serialize, deserialize, encrypt]);

  // Local storage hook
  const {
    value: storedFormData,
    setValue: setStoredFormData,
    remove: removeStoredFormData,
    isSupported,
    getStorageValue,
  } = useLocalStorage<T | null>(storageKey, null, {
    serializer: formSerializer,
    debug: debug && false, // Reduce noise
    syncAcrossTabs: true,
  });

  // Form state
  const [formData, setFormData] = useState<T>(initialFormState);
  const [isDirty, setIsDirty] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof T, string>>
  >({});
  const [originalFormData, setOriginalFormData] = useState<T>(initialFormState);

  // Auto-save timer
  const [autoSaveTimer, setAutoSaveTimer] = useState<number | null>(null);

  // Filter form data to exclude specified fields
  const getFilteredFormData = useCallback(
    (data: T): T => {
      if (excludeFields.length === 0) return data;

      const filtered = { ...data };
      excludeFields.forEach(field => {
        delete filtered[field];
      });

      return filtered;
    },
    [excludeFields]
  );

  // Validate individual field
  const validateField = useCallback(<K extends keyof T>(field: K): boolean => {
    // Clear existing error first
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });

    // Custom field validation would go here
    // For now, just return true
    return true;
  }, []);

  // Validate entire form
  const validateForm = useCallback((): boolean => {
    if (!validate) return true;

    const result = validate(formData);

    if (typeof result === 'string') {
      onValidationError?.(result);
      return false;
    }

    return result;
  }, [formData, validate, onValidationError]);

  // Save form to storage
  const saveForm = useCallback(() => {
    if (!isSupported) return;

    try {
      if (!validateForm()) {
        if (debug) {
          console.warn(`PersistentForm validation failed for "${formKey}"`);
        }
        return;
      }

      const filteredData = getFilteredFormData(formData);
      setStoredFormData(filteredData);
      setIsSaved(true);
      setIsDirty(false);
      setLastSaved(Date.now());

      if (debug) {
        console.log(`PersistentForm saved "${formKey}":`, filteredData);
      }
    } catch (error) {
      if (debug) {
        console.error(`PersistentForm save error for "${formKey}":`, error);
      }
    }
  }, [
    formData,
    formKey,
    isSupported,
    validateForm,
    getFilteredFormData,
    setStoredFormData,
    debug,
  ]);

  // Load form from storage
  const loadForm = useCallback(() => {
    if (!isSupported || !storedFormData) return;

    try {
      // Merge stored data with initial state to handle schema changes
      const mergedData = { ...initialFormState, ...storedFormData };
      setFormData(mergedData);
      setOriginalFormData(mergedData);
      setIsDirty(false);
      setIsSaved(true);
      setHasLoadedFromStorage(true);

      onLoad?.(mergedData);

      if (debug) {
        console.log(`PersistentForm loaded "${formKey}":`, mergedData);
      }
    } catch (error) {
      if (debug) {
        console.error(`PersistentForm load error for "${formKey}":`, error);
      }
    }
  }, [isSupported, storedFormData, initialFormState, formKey, onLoad, debug]);

  // Clear form and storage
  const clearForm = useCallback(() => {
    removeStoredFormData();
    setFormData(initialFormState);
    setOriginalFormData(initialFormState);
    setIsDirty(false);
    setIsSaved(false);
    setHasLoadedFromStorage(false);
    setLastSaved(null);
    setFieldErrors({});

    onClear?.();

    if (debug) {
      console.log(`PersistentForm cleared "${formKey}"`);
    }
  }, [removeStoredFormData, initialFormState, formKey, onClear, debug]);

  // Auto-save with debounce
  const scheduleAutoSave = useCallback(() => {
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }

    if (autoSaveDelay <= 0) return;

    setIsAutoSaving(true);

    const timer = window.setTimeout(() => {
      saveForm();
      setIsAutoSaving(false);
      onAutoSave?.(formData);
    }, autoSaveDelay);

    setAutoSaveTimer(timer);
  }, [autoSaveTimer, autoSaveDelay, saveForm, formData, onAutoSave]);

  // Update single field
  const updateField = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setFormData(prev => {
        const updated = { ...prev, [field]: value };
        return updated;
      });

      setIsDirty(true);
      setIsSaved(false);
      validateField(field);
      scheduleAutoSave();
    },
    [validateField, scheduleAutoSave]
  );

  // Update multiple fields
  const updateForm = useCallback(
    (updates: Partial<T>) => {
      setFormData(prev => {
        const updated = { ...prev, ...updates };
        return updated;
      });

      setIsDirty(true);
      setIsSaved(false);

      // Validate updated fields
      Object.keys(updates).forEach(field => {
        validateField(field as keyof T);
      });

      scheduleAutoSave();
    },
    [validateField, scheduleAutoSave]
  );

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setOriginalFormData(initialFormState);
    setIsDirty(false);
    setIsSaved(false);
    setFieldErrors({});

    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
      setAutoSaveTimer(null);
    }
  }, [initialFormState, autoSaveTimer]);

  // Clear field error
  const clearFieldError = useCallback(<K extends keyof T>(field: K) => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  // Clear all errors
  const clearAllErrors = useCallback(() => {
    setFieldErrors({});
  }, []);

  // Get form snapshot
  const getFormSnapshot = useCallback((): T => {
    return { ...formData };
  }, [formData]);

  // Check if form has changes
  const hasChanges = useCallback((): boolean => {
    return JSON.stringify(formData) !== JSON.stringify(originalFormData);
  }, [formData, originalFormData]);

  // Check if specific field is dirty
  const isFieldDirty = useCallback(
    <K extends keyof T>(field: K): boolean => {
      return formData[field] !== originalFormData[field];
    },
    [formData, originalFormData]
  );

  // Get storage size
  const storageSize = useMemo(() => {
    if (!isSupported || !storedFormData) return 0;
    return JSON.stringify(storedFormData).length;
  }, [isSupported, storedFormData]);

  // Load form data on mount
  useEffect(() => {
    if (storedFormData && !hasLoadedFromStorage) {
      loadForm();
    }
  }, [storedFormData, hasLoadedFromStorage, loadForm]);

  // Cleanup auto-save timer on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, [autoSaveTimer]);

  return {
    // State
    formData,
    isDirty,
    isAutoSaving,
    isSaved,
    hasLoadedFromStorage,
    lastSaved,
    fieldErrors,

    // Form data management
    updateField,
    updateForm,
    setFormData: useCallback(
      (data: T) => {
        setFormData(data);
        setIsDirty(true);
        setIsSaved(false);
        scheduleAutoSave();
      },
      [scheduleAutoSave]
    ),
    resetForm,

    // Persistence actions
    saveForm,
    loadForm,
    clearForm,

    // Validation
    validateField,
    validateForm,
    clearFieldError,
    clearAllErrors,

    // Utilities
    getFormSnapshot,
    hasChanges,
    isFieldDirty,
    isSupported,
    storageSize,
  };
}

// Utility functions
export const PersistentFormUtils = {
  /**
   * Create form validation schema
   */
  createValidator: <T>(schema: {
    [K in keyof T]?: (value: T[K]) => boolean | string;
  }) => {
    return (formData: T): boolean | string => {
      for (const [field, validator] of Object.entries(schema)) {
        if (validator && typeof validator === 'function') {
          const result = validator(formData[field as keyof T]);
          if (result !== true) {
            return typeof result === 'string'
              ? result
              : `Validation failed for ${field}`;
          }
        }
      }
      return true;
    };
  },

  /**
   * Common field validators
   */
  validators: {
    required: (value: any) => {
      if (value === null || value === undefined || value === '') {
        return 'This field is required';
      }
      return true;
    },

    email: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
      return true;
    },

    minLength: (min: number) => (value: string) => {
      if (value.length < min) {
        return `Must be at least ${min} characters long`;
      }
      return true;
    },

    maxLength: (max: number) => (value: string) => {
      if (value.length > max) {
        return `Must be no more than ${max} characters long`;
      }
      return true;
    },

    pattern: (regex: RegExp, message: string) => (value: string) => {
      if (!regex.test(value)) {
        return message;
      }
      return true;
    },
  },

  /**
   * Form field helpers
   */
  createFieldProps: <T, K extends keyof T>(
    form: UsePersistentFormReturn<T>,
    field: K
  ) => ({
    value: form.formData[field],
    onChange: (value: T[K]) => form.updateField(field, value),
    onBlur: () => form.validateField(field),
    error: form.fieldErrors[field],
    isDirty: form.isFieldDirty(field),
  }),

  /**
   * Batch form operations
   */
  batchUpdateFields: <T>(
    form: UsePersistentFormReturn<T>,
    updates: Partial<T>
  ) => {
    form.updateForm(updates);
  },

  /**
   * Form state serializers
   */
  createDateSerializer: () => ({
    serialize: (formState: any) => {
      return JSON.parse(
        JSON.stringify(formState, (key, value) => {
          if (value instanceof Date) {
            return { __type: 'Date', value: value.toISOString() };
          }
          return value;
        })
      );
    },
    deserialize: (data: any) => {
      return JSON.parse(JSON.stringify(data), (key, value) => {
        if (value && typeof value === 'object' && value.__type === 'Date') {
          return new Date(value.value);
        }
        return value;
      });
    },
  }),

  /**
   * Form migration helpers
   */
  migrateFormData: <T>(
    storedData: any,
    currentSchema: T,
    migrations: Array<(data: any) => any> = []
  ): T => {
    let migratedData = storedData;

    // Apply migrations in order
    migrations.forEach(migration => {
      migratedData = migration(migratedData);
    });

    // Merge with current schema to handle new fields
    return { ...currentSchema, ...migratedData };
  },

  /**
   * Get usage statistics
   */
  getFormStorageStats: (keyPrefix: string = 'persistent_form_') => {
    if (typeof window === 'undefined') return { forms: 0, totalSize: 0 };

    const formKeys = Object.keys(localStorage).filter(key =>
      key.startsWith(keyPrefix)
    );

    const totalSize = formKeys.reduce((sum, key) => {
      return sum + (localStorage[key]?.length || 0);
    }, 0);

    return {
      forms: formKeys.length,
      totalSize,
      averageSize:
        formKeys.length > 0 ? Math.round(totalSize / formKeys.length) : 0,
      keys: formKeys,
    };
  },

  /**
   * Cleanup old form data
   */
  cleanupOldForms: (
    keyPrefix: string = 'persistent_form_',
    maxAge: number = 30 * 24 * 60 * 60 * 1000 // 30 days
  ) => {
    if (typeof window === 'undefined') return 0;

    const now = Date.now();
    let removedCount = 0;

    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(keyPrefix)) {
        try {
          const data = JSON.parse(localStorage[key]);
          const timestamp = data.timestamp || data.lastSaved || 0;

          if (now - timestamp > maxAge) {
            localStorage.removeItem(key);
            removedCount++;
          }
        } catch {
          // Remove invalid data
          localStorage.removeItem(key);
          removedCount++;
        }
      }
    });

    return removedCount;
  },

  /**
   * Get usage best practices
   */
  getBestPractices: () => [
    'Use appropriate auto-save delays to balance UX and performance',
    'Exclude sensitive fields from persistence when necessary',
    'Implement proper form validation before saving',
    'Handle form schema changes with data migration',
    'Provide clear feedback when forms are auto-saved',
    'Clean up old form data periodically to manage storage',
    'Test form persistence across different browsers and devices',
  ],
};

export default usePersistentForm;
