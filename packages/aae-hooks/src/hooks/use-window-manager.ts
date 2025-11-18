/**
 * @fileoverage useWindowManager Hook for PWA Window Management API (Epic 73)
 * Provides a simple interface for managing multiple PWA windows
 */

import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * PWA Window interface
 */
export interface PwaWindow {
  id: string;
  windowRef?: Window | null;
  url: string;
  name: string;
  features?: string;
  state: 'opening' | 'open' | 'closed' | 'error';
  createdAt: Date;
  updatedAt: Date;
  error?: string;
}

/**
 * Custom hook for managing PWA windows
 */
export function useWindowManager() {
  const [windows, setWindows] = useState<PwaWindow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const windowRefsRef = useRef<Map<string, Window>>(new Map());

  const support = {
    isSupported: typeof window !== 'undefined' && typeof window.open === 'function',
    canOpenWindows: typeof window !== 'undefined' && typeof window.open === 'function',
    hasWindowManagementAPI: typeof window !== 'undefined' && 'getScreenDetails' in window,
    canListWindows: typeof window !== 'undefined' && 'getWindows' in window,
  };

  const generateWindowId = useCallback(() => {
    return `pwa-window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const openWindow = useCallback(async (
    url: string, 
    options: { name?: string; features?: string; id?: string; track?: boolean } = {}
  ) => {
    if (!support.canOpenWindows) {
      setError('Window opening not supported in this browser');
      return null;
    }

    const windowId = options.id || generateWindowId();
    const windowName = options.name || `Window-${windowId}`;
    const features = options.features || 'width=800,height=600,scrollbars=yes,resizable=yes';
    const track = options.track !== false;

    setLoading(true);
    setError(null);

    try {
      const newWindow: PwaWindow = {
        id: windowId,
        url,
        name: windowName,
        features,
        state: 'opening',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      if (track) {
        setWindows(prev => [...prev, newWindow]);
      }

      const windowRef = window.open(url, windowId, features);

      if (!windowRef) {
        setError('Failed to open window - blocked by popup blocker');
        return null;
      }

      windowRefsRef.current.set(windowId, windowRef);

      setTimeout(() => {
        if (track) {
          setWindows(prev => prev.map(window => 
            window.id === windowId 
              ? { ...window, state: 'open', windowRef, updatedAt: new Date() }
              : window
          ));
        }
      }, 100);

      return track ? { ...newWindow, state: 'open', windowRef } : null;

    } catch (err) {
      setError(`Failed to open window: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [support.canOpenWindows, generateWindowId]);

  const closeWindow = useCallback(async (windowId: string) => {
    const windowRef = windowRefsRef.current.get(windowId);
    
    if (windowRef && !windowRef.closed) {
      windowRef.close();
    }

    setWindows(prev => prev.filter(window => window.id !== windowId));
    windowRefsRef.current.delete(windowId);
    
    return true;
  }, []);

  const closeAllWindows = useCallback(async () => {
    windowRefsRef.current.forEach((windowRef) => {
      if (windowRef && !windowRef.closed) {
        windowRef.close();
      }
    });
    
    setWindows([]);
    windowRefsRef.current.clear();
  }, []);

  const refreshWindows = useCallback(async () => {
    setWindows(prev => prev.map(window => {
      const windowRef = windowRefsRef.current.get(window.id);
      
      if (windowRef && windowRef.closed) {
        windowRefsRef.current.delete(window.id);
        return { ...window, state: 'closed' as const, updatedAt: new Date() };
      }
      
      return window;
    }));
  }, []);

  const getWindow = useCallback((windowId: string) => {
    return windows.find(window => window.id === windowId);
  }, [windows]);

  const untrackWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.filter(window => window.id !== windowId));
    windowRefsRef.current.delete(windowId);
  }, []);

  return {
    support,
    windows,
    error,
    loading,
    openWindow,
    closeWindow,
    closeAllWindows,
    refreshWindows,
    getWindow,
    untrackWindow,
  };
}

export default useWindowManager;