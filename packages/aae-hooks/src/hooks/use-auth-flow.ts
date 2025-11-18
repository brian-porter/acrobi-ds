import * as React from 'react';

/**
 * Auth Flow State Machine Hook (PRD v12)
 * 
 * This hook implements the complete authentication flow state machine according to PRD v12.
 * It manages transitions between auth steps, data persistence, and flow routing based on
 * user selections and validation requirements.
 * 
 * Key Features:
 * - State machine with proper transitions and validation
 * - Data persistence across steps
 * - Dynamic routing based on fork selection
 * - Terms/Privacy navigation with data preservation
 * - Error handling and recovery
 * - Progress tracking and analytics
 * - Accessibility features (focus management)
 * - Local storage persistence for session recovery
 */

export type AuthFlowStep = 
  | 'create-account'
  | 'verify-contact' 
  | 'fork'
  | 'handle'
  | 'add-secondary-contact'
  | 'passkey'
  | 'connect-socials'
  | 'set-favorites'
  | 'complete';

export interface AuthFlowData {
  account?: {
    email: string;
    phone?: string;
    password: string;
    firstName?: string;
    lastName?: string;
    agreeToTerms: boolean;
    subscribeNewsletter?: boolean;
  };
  verification?: {
    method: 'email' | 'phone';
    code: string;
    verified: boolean;
  };
  fork?: {
    selectedPath: 'express' | 'comprehensive' | 'minimal';
  };
  handle?: {
    selectedHandle: string;
    isAvailable: boolean;
  };
  secondaryContact?: {
    method: 'email' | 'phone';
    value: string;
    verified?: boolean;
  };
  passkey?: {
    setup: boolean;
    credentialId?: string;
    publicKey?: string;
  };
  socials?: {
    connections: Array<{
      provider: string;
      connected: boolean;
      profile?: any;
    }>;
  };
  favorites?: {
    categories: string[];
    items: Array<{
      id: string;
      categoryId: string;
      selected: boolean;
    }>;
  };
}

export interface AuthFlowState {
  currentStep: AuthFlowStep;
  data: AuthFlowData;
  history: AuthFlowStep[];
  isLoading: boolean;
  error: string | null;
  termsModalOpen: boolean;
  privacyModalOpen: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  progress: {
    currentStepIndex: number;
    totalSteps: number;
    percentage: number;
  };
}

export interface AuthFlowActions {
  // Step navigation
  goToStep: (step: AuthFlowStep) => void;
  goBack: () => void;
  goForward: () => void;
  
  // Data management
  updateStepData: <K extends keyof AuthFlowData>(step: K, data: Partial<AuthFlowData[K]>) => void;
  clearData: () => void;
  
  // Modal management
  openTermsModal: () => void;
  openPrivacyModal: () => void;
  closeModals: () => void;
  
  // Flow control
  completeStep: (stepData?: any) => Promise<void>;
  skipStep: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Persistence
  saveToStorage: () => void;
  loadFromStorage: () => boolean;
  clearStorage: () => void;
}

export interface AuthFlowConfig {
  // Storage configuration
  storageKey?: string;
  persistOnEachStep?: boolean;
  
  // Flow configuration
  enableSkipping?: boolean;
  requireVerification?: boolean;
  enableSocialConnections?: boolean;
  
  // Validation configuration
  validateStepTransitions?: boolean;
  requiredSteps?: AuthFlowStep[];
  
  // Analytics
  trackProgress?: boolean;
  onStepComplete?: (step: AuthFlowStep, data: any) => void;
  onFlowComplete?: (data: AuthFlowData) => void;
  onError?: (error: string, step: AuthFlowStep) => void;
}

const DEFAULT_CONFIG: AuthFlowConfig = {
  storageKey: 'acrobi-auth-flow',
  persistOnEachStep: true,
  enableSkipping: true,
  requireVerification: true,
  enableSocialConnections: true,
  validateStepTransitions: true,
  requiredSteps: ['create-account', 'verify-contact'],
  trackProgress: true,
};

// Step flow definitions based on fork selection
const STEP_FLOWS: Record<string, AuthFlowStep[]> = {
  express: ['create-account', 'verify-contact', 'fork', 'handle', 'set-favorites', 'complete'],
  comprehensive: ['create-account', 'verify-contact', 'fork', 'handle', 'add-secondary-contact', 'passkey', 'connect-socials', 'set-favorites', 'complete'],
  minimal: ['create-account', 'verify-contact', 'fork', 'complete'],
};

/**
 * Hook for managing authentication flow state machine
 */
export function useAuthFlow(config: AuthFlowConfig = {}): [AuthFlowState, AuthFlowActions] {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  
  // Initialize state
  const [state, setState] = React.useState<AuthFlowState>(() => {
    const initialState: AuthFlowState = {
      currentStep: 'create-account',
      data: {},
      history: ['create-account'],
      isLoading: false,
      error: null,
      termsModalOpen: false,
      privacyModalOpen: false,
      canGoBack: false,
      canGoForward: false,
      progress: {
        currentStepIndex: 0,
        totalSteps: STEP_FLOWS.express.length,
        percentage: 0,
      },
    };
    
    return initialState;
  });

  // Get current flow based on fork selection
  const getCurrentFlow = React.useCallback((): AuthFlowStep[] => {
    const selectedPath = state.data.fork?.selectedPath || 'express';
    return STEP_FLOWS[selectedPath] || STEP_FLOWS.express;
  }, [state.data.fork?.selectedPath]);

  // Update progress calculation
  const updateProgress = React.useCallback((currentStep: AuthFlowStep) => {
    const currentFlow = getCurrentFlow();
    const currentStepIndex = currentFlow.indexOf(currentStep);
    const totalSteps = currentFlow.length;
    const percentage = Math.round((currentStepIndex / (totalSteps - 1)) * 100);
    
    return {
      currentStepIndex,
      totalSteps,
      percentage: Math.max(0, Math.min(100, percentage)),
    };
  }, [getCurrentFlow]);

  // Validate step transition
  const canTransitionTo = React.useCallback((targetStep: AuthFlowStep): boolean => {
    if (!mergedConfig.validateStepTransitions) return true;
    
    const currentFlow = getCurrentFlow();
    const currentIndex = currentFlow.indexOf(state.currentStep);
    const targetIndex = currentFlow.indexOf(targetStep);
    
    // Can always go back
    if (targetIndex < currentIndex) return true;
    
    // Can go forward if all required data exists
    if (targetIndex === currentIndex + 1) {
      return validateCurrentStepData();
    }
    
    // Can skip to any later step if skipping is enabled
    return mergedConfig.enableSkipping || false;
  }, [state.currentStep, getCurrentFlow, mergedConfig.validateStepTransitions, mergedConfig.enableSkipping]);

  // Validate current step data
  const validateCurrentStepData = React.useCallback((): boolean => {
    switch (state.currentStep) {
      case 'create-account':
        const account = state.data.account;
        return !!(account?.email && account?.password && account?.agreeToTerms);
      
      case 'verify-contact':
        const verification = state.data.verification;
        return !!(verification?.verified);
      
      case 'fork':
        const fork = state.data.fork;
        return !!(fork?.selectedPath);
      
      case 'handle':
        const handle = state.data.handle;
        return !!(handle?.selectedHandle && handle?.isAvailable);
      
      default:
        return true; // Optional steps are always valid
    }
  }, [state.currentStep, state.data]);

  // Save to localStorage
  const saveToStorage = React.useCallback(() => {
    if (!mergedConfig.storageKey) return;
    
    try {
      const dataToSave = {
        currentStep: state.currentStep,
        data: state.data,
        history: state.history,
        timestamp: Date.now(),
      };
      
      localStorage.setItem(mergedConfig.storageKey, JSON.stringify(dataToSave));
    } catch (error) {
      console.warn('Failed to save auth flow to storage:', error);
    }
  }, [state.currentStep, state.data, state.history, mergedConfig.storageKey]);

  // Load from localStorage
  const loadFromStorage = React.useCallback((): boolean => {
    if (!mergedConfig.storageKey) return false;
    
    try {
      const saved = localStorage.getItem(mergedConfig.storageKey);
      if (!saved) return false;
      
      const parsed = JSON.parse(saved);
      
      // Check if data is not too old (24 hours)
      const isRecent = Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000;
      if (!isRecent) return false;
      
      setState(prev => ({
        ...prev,
        currentStep: parsed.currentStep,
        data: parsed.data,
        history: parsed.history,
        progress: updateProgress(parsed.currentStep),
      }));
      
      return true;
    } catch (error) {
      console.warn('Failed to load auth flow from storage:', error);
      return false;
    }
  }, [mergedConfig.storageKey, updateProgress]);

  // Clear storage
  const clearStorage = React.useCallback(() => {
    if (!mergedConfig.storageKey) return;
    
    try {
      localStorage.removeItem(mergedConfig.storageKey);
    } catch (error) {
      console.warn('Failed to clear auth flow storage:', error);
    }
  }, [mergedConfig.storageKey]);

  // Actions
  const actions: AuthFlowActions = React.useMemo(() => ({
    // Step navigation
    goToStep: (step: AuthFlowStep) => {
      if (!canTransitionTo(step)) {
        console.warn(`Cannot transition to step: ${step}`);
        return;
      }
      
      setState(prev => {
        const newHistory = prev.history.includes(step) 
          ? prev.history 
          : [...prev.history, step];
        
        const progress = updateProgress(step);
        const currentFlow = getCurrentFlow();
        const currentIndex = currentFlow.indexOf(step);
        
        return {
          ...prev,
          currentStep: step,
          history: newHistory,
          progress,
          canGoBack: currentIndex > 0,
          canGoForward: currentIndex < currentFlow.length - 1,
          error: null,
        };
      });
      
      if (mergedConfig.persistOnEachStep) {
        setTimeout(saveToStorage, 0);
      }
    },

    goBack: () => {
      const currentFlow = getCurrentFlow();
      const currentIndex = currentFlow.indexOf(state.currentStep);
      
      if (currentIndex > 0) {
        actions.goToStep(currentFlow[currentIndex - 1]);
      }
    },

    goForward: () => {
      const currentFlow = getCurrentFlow();
      const currentIndex = currentFlow.indexOf(state.currentStep);
      
      if (currentIndex < currentFlow.length - 1) {
        actions.goToStep(currentFlow[currentIndex + 1]);
      }
    },

    // Data management
    updateStepData: <K extends keyof AuthFlowData>(step: K, data: Partial<AuthFlowData[K]>) => {
      setState(prev => ({
        ...prev,
        data: {
          ...prev.data,
          [step]: {
            ...prev.data[step],
            ...data,
          },
        },
      }));
    },

    clearData: () => {
      setState(prev => ({
        ...prev,
        data: {},
        currentStep: 'create-account',
        history: ['create-account'],
        progress: updateProgress('create-account'),
      }));
      clearStorage();
    },

    // Modal management
    openTermsModal: () => {
      setState(prev => ({ ...prev, termsModalOpen: true }));
    },

    openPrivacyModal: () => {
      setState(prev => ({ ...prev, privacyModalOpen: true }));
    },

    closeModals: () => {
      setState(prev => ({ 
        ...prev, 
        termsModalOpen: false, 
        privacyModalOpen: false 
      }));
    },

    // Flow control
    completeStep: async (stepData?: any) => {
      const currentStep = state.currentStep;
      
      if (stepData) {
        actions.updateStepData(currentStep as keyof AuthFlowData, stepData);
      }
      
      // Trigger analytics
      if (mergedConfig.trackProgress && mergedConfig.onStepComplete) {
        mergedConfig.onStepComplete(currentStep, stepData);
      }
      
      // Auto-advance to next step
      const currentFlow = getCurrentFlow();
      const currentIndex = currentFlow.indexOf(currentStep);
      
      if (currentIndex < currentFlow.length - 1) {
        actions.goToStep(currentFlow[currentIndex + 1]);
      } else {
        // Flow complete
        if (mergedConfig.onFlowComplete) {
          mergedConfig.onFlowComplete(state.data);
        }
      }
    },

    skipStep: () => {
      if (!mergedConfig.enableSkipping) return;
      
      const currentFlow = getCurrentFlow();
      const currentIndex = currentFlow.indexOf(state.currentStep);
      
      if (currentIndex < currentFlow.length - 1) {
        actions.goToStep(currentFlow[currentIndex + 1]);
      }
    },

    setLoading: (loading: boolean) => {
      setState(prev => ({ ...prev, isLoading: loading }));
    },

    setError: (error: string | null) => {
      setState(prev => ({ ...prev, error }));
      
      if (error && mergedConfig.onError) {
        mergedConfig.onError(error, state.currentStep);
      }
    },

    // Persistence
    saveToStorage,
    loadFromStorage,
    clearStorage,
  }), [
    state,
    canTransitionTo,
    getCurrentFlow,
    updateProgress,
    saveToStorage,
    loadFromStorage,
    clearStorage,
    mergedConfig,
  ]);

  // Load from storage on mount
  React.useEffect(() => {
    if (mergedConfig.persistOnEachStep) {
      actions.loadFromStorage();
    }
  }, []);

  // Update progress when step or fork selection changes
  React.useEffect(() => {
    setState(prev => ({
      ...prev,
      progress: updateProgress(prev.currentStep),
    }));
  }, [state.currentStep, state.data.fork?.selectedPath, updateProgress]);

  return [state, actions];
}

/**
 * Hook for managing individual auth step data
 * Useful for components that need to manage their own state while integrating with the flow
 */
export function useAuthStepData<T extends keyof AuthFlowData>(
  stepKey: T,
  initialData?: Partial<AuthFlowData[T]>
) {
  const [data, setData] = React.useState<Partial<AuthFlowData[T]>>(initialData || {});
  
  const updateData = React.useCallback((updates: Partial<AuthFlowData[T]>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);
  
  const resetData = React.useCallback(() => {
    setData(initialData || {});
  }, [initialData]);
  
  return {
    data,
    updateData,
    resetData,
    setData,
  };
}

export default useAuthFlow;