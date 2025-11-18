/**
 * @fileoverview Socket.IO Provider for Real-Time Communication (Epic 44)
 * Provides a singleton Socket.IO connection using React Context with automatic reconnection,
 * error handling, and connection status management.
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import { io, Socket, ManagerOptions, SocketOptions } from 'socket.io-client';

// Types
export interface SocketContextValue {
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectionError: string | null;
  emit: (event: string, data?: any) => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string, callback?: (...args: any[]) => void) => void;
  connect: () => void;
  disconnect: () => void;
  reconnect: () => void;
  connectionId: string | null;
  latency: number;
  lastMessageTime: Date | null;
}

export interface SocketProviderProps {
  children: ReactNode;
  url: string;
  options?: Partial<ManagerOptions & SocketOptions>;
  autoConnect?: boolean;
  reconnectAttempts?: number;
  reconnectDelay?: number;
  onConnect?: (socket: Socket) => void;
  onDisconnect?: (reason: string) => void;
  onError?: (error: Error) => void;
  onReconnect?: (attemptNumber: number) => void;
  onReconnectAttempt?: (attemptNumber: number) => void;
  onReconnectError?: (error: Error) => void;
  onReconnectFailed?: () => void;
}

export interface SocketConfig {
  url: string;
  options?: Partial<ManagerOptions & SocketOptions>;
  autoConnect?: boolean;
  reconnectAttempts?: number;
  reconnectDelay?: number;
}

// Default configuration
const DEFAULT_CONFIG: Required<Omit<SocketConfig, 'url' | 'options'>> = {
  autoConnect: true,
  reconnectAttempts: 5,
  reconnectDelay: 1000,
};

const DEFAULT_SOCKET_OPTIONS: Partial<ManagerOptions & SocketOptions> = {
  transports: ['websocket', 'polling'],
  timeout: 5000,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  maxReconnectionAttempts: 5,
  randomizationFactor: 0.5,
  forceNew: false,
  autoConnect: false, // We handle connection manually
  upgrade: true,
  rememberUpgrade: true,
};

// Create context
const SocketContext = createContext<SocketContextValue | null>(null);

/**
 * Socket.IO Provider Component
 * Manages a singleton Socket.IO connection with automatic reconnection and error handling
 */
export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  url,
  options = {},
  autoConnect = DEFAULT_CONFIG.autoConnect,
  reconnectAttempts = DEFAULT_CONFIG.reconnectAttempts,
  reconnectDelay = DEFAULT_CONFIG.reconnectDelay,
  onConnect,
  onDisconnect,
  onError,
  onReconnect,
  onReconnectAttempt,
  onReconnectError,
  onReconnectFailed,
}) => {
  // State
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [connectionId, setConnectionId] = useState<string | null>(null);
  const [latency, setLatency] = useState(0);
  const [lastMessageTime, setLastMessageTime] = useState<Date | null>(null);

  // Refs
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const eventListenersRef = useRef<Map<string, Set<(...args: any[]) => void>>>(
    new Map()
  );

  // Merge socket options
  const socketOptions: Partial<ManagerOptions & SocketOptions> = {
    ...DEFAULT_SOCKET_OPTIONS,
    ...options,
    reconnectionAttempts: reconnectAttempts,
    reconnectionDelay: reconnectDelay,
  };

  // Clean up timers
  const cleanupTimers = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }
  }, []);

  // Start ping interval for latency monitoring
  const startPingInterval = useCallback((socketInstance: Socket) => {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
    }

    pingIntervalRef.current = setInterval(() => {
      const start = Date.now();
      socketInstance.emit('ping', start);

      socketInstance.once('pong', (timestamp: number) => {
        setLatency(Date.now() - timestamp);
      });
    }, 30000); // Ping every 30 seconds
  }, []);

  // Connect to socket
  const connect = useCallback(() => {
    if (socket?.connected) {
      return;
    }

    setIsConnecting(true);
    setConnectionError(null);

    try {
      const newSocket = io(url, socketOptions);
      setSocket(newSocket);

      // Connection event handlers
      newSocket.on('connect', () => {
        setIsConnected(true);
        setIsConnecting(false);
        setConnectionError(null);
        setConnectionId(newSocket.id);
        reconnectAttemptsRef.current = 0;

        startPingInterval(newSocket);
        onConnect?.(newSocket);
      });

      newSocket.on('disconnect', (reason: string) => {
        setIsConnected(false);
        setConnectionId(null);
        cleanupTimers();
        onDisconnect?.(reason);

        // Auto-reconnect for certain disconnect reasons
        if (
          reason === 'io server disconnect' ||
          reason === 'io client disconnect'
        ) {
          // Server or client initiated disconnect - don't auto-reconnect
          return;
        }

        // Attempt reconnection for other reasons
        if (reconnectAttemptsRef.current < reconnectAttempts) {
          reconnectAttemptsRef.current++;
          onReconnectAttempt?.(reconnectAttemptsRef.current);

          reconnectTimeoutRef.current = setTimeout(
            () => {
              newSocket.connect();
            },
            reconnectDelay * Math.pow(2, reconnectAttemptsRef.current - 1)
          ); // Exponential backoff
        } else {
          onReconnectFailed?.();
        }
      });

      newSocket.on('connect_error', (error: Error) => {
        setIsConnecting(false);
        setConnectionError(error.message);
        onError?.(error);

        if (reconnectAttemptsRef.current < reconnectAttempts) {
          reconnectAttemptsRef.current++;
          onReconnectError?.(error);

          reconnectTimeoutRef.current = setTimeout(
            () => {
              newSocket.connect();
            },
            reconnectDelay * Math.pow(2, reconnectAttemptsRef.current - 1)
          );
        } else {
          onReconnectFailed?.();
        }
      });

      newSocket.on('reconnect', (attemptNumber: number) => {
        setIsConnected(true);
        setIsConnecting(false);
        setConnectionError(null);
        reconnectAttemptsRef.current = 0;
        onReconnect?.(attemptNumber);
      });

      // Handle pong for latency calculation
      newSocket.on('pong', (timestamp: number) => {
        setLatency(Date.now() - timestamp);
      });

      // Track message activity
      const originalEmit = newSocket.emit;
      newSocket.emit = function (...args: any[]) {
        setLastMessageTime(new Date());
        return originalEmit.apply(this, args);
      };

      // Connect if auto-connect is enabled
      if (autoConnect) {
        newSocket.connect();
      }
    } catch (error) {
      setIsConnecting(false);
      setConnectionError((error as Error).message);
      onError?.(error as Error);
    }
  }, [
    url,
    socketOptions,
    autoConnect,
    reconnectAttempts,
    reconnectDelay,
    onConnect,
    onDisconnect,
    onError,
    onReconnect,
    onReconnectAttempt,
    onReconnectError,
    onReconnectFailed,
    startPingInterval,
    cleanupTimers,
  ]);

  // Disconnect from socket
  const disconnect = useCallback(() => {
    if (socket) {
      cleanupTimers();
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
      setConnectionId(null);
    }
  }, [socket, cleanupTimers]);

  // Reconnect socket
  const reconnect = useCallback(() => {
    disconnect();
    setTimeout(connect, 100); // Small delay to ensure cleanup
  }, [disconnect, connect]);

  // Emit event
  const emit = useCallback(
    (event: string, data?: any) => {
      if (socket?.connected) {
        socket.emit(event, data);
        setLastMessageTime(new Date());
      } else {
        console.warn(
          `[SocketProvider] Cannot emit '${event}': socket not connected`
        );
      }
    },
    [socket]
  );

  // Register event listener
  const on = useCallback(
    (event: string, callback: (...args: any[]) => void) => {
      if (socket) {
        socket.on(event, callback);

        // Track listeners for cleanup
        if (!eventListenersRef.current.has(event)) {
          eventListenersRef.current.set(event, new Set());
        }
        eventListenersRef.current.get(event)!.add(callback);
      }
    },
    [socket]
  );

  // Unregister event listener
  const off = useCallback(
    (event: string, callback?: (...args: any[]) => void) => {
      if (socket) {
        if (callback) {
          socket.off(event, callback);
          eventListenersRef.current.get(event)?.delete(callback);
        } else {
          socket.off(event);
          eventListenersRef.current.delete(event);
        }
      }
    },
    [socket]
  );

  // Initialize connection on mount
  useEffect(() => {
    connect();

    return () => {
      cleanupTimers();
      if (socket) {
        // Clean up all tracked event listeners
        eventListenersRef.current.forEach((callbacks, event) => {
          callbacks.forEach(callback => {
            socket.off(event, callback);
          });
        });
        socket.disconnect();
      }
    };
  }, [url]); // Only reconnect when URL changes

  // Context value
  const contextValue: SocketContextValue = {
    socket,
    isConnected,
    isConnecting,
    connectionError,
    emit,
    on,
    off,
    connect,
    disconnect,
    reconnect,
    connectionId,
    latency,
    lastMessageTime,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

/**
 * Hook to access Socket.IO context
 * Must be used within a SocketProvider
 */
export const useSocket = (): SocketContextValue => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
};

/**
 * Hook for simplified event handling with automatic cleanup
 */
export const useSocketEvent = <T = any,>(
  event: string,
  handler: (data: T) => void,
  deps: React.DependencyList = []
): void => {
  const { on, off } = useSocket();

  useEffect(() => {
    on(event, handler);

    return () => {
      off(event, handler);
    };
  }, [event, on, off, ...deps]);
};

/**
 * Hook for emitting events with optional callback
 */
export const useSocketEmit = () => {
  const { emit, isConnected } = useSocket();

  return useCallback(
    (event: string, data?: any, callback?: (...args: any[]) => void) => {
      if (isConnected) {
        if (callback) {
          emit(event, data, callback);
        } else {
          emit(event, data);
        }
        return true;
      }
      return false;
    },
    [emit, isConnected]
  );
};

/**
 * Hook for Socket.IO connection status
 */
export const useSocketStatus = () => {
  const {
    isConnected,
    isConnecting,
    connectionError,
    connectionId,
    latency,
    lastMessageTime,
  } = useSocket();

  return {
    isConnected,
    isConnecting,
    hasError: !!connectionError,
    connectionError,
    connectionId,
    latency,
    lastMessageTime,
    status: isConnecting
      ? 'connecting'
      : isConnected
        ? 'connected'
        : connectionError
          ? 'error'
          : 'disconnected',
  };
};

// Export additional utilities
export const SocketUtils = {
  /**
   * Check if running in browser environment
   */
  isBrowser: typeof window !== 'undefined',

  /**
   * Generate a unique client ID
   */
  generateClientId: (): string => {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Format connection status for display
   */
  formatConnectionStatus: (status: string, latency?: number): string => {
    switch (status) {
      case 'connected':
        return latency ? `Connected (${latency}ms)` : 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'error':
        return 'Connection Error';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  },

  /**
   * Validate Socket.IO URL
   */
  isValidSocketUrl: (url: string): boolean => {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:', 'ws:', 'wss:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  },
};

export default SocketProvider;
