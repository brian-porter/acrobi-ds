/**
 * @fileoverview Socket.IO Hook for Real-Time Communication (Epic 44)
 * Provides easy-to-use hooks for Socket.IO integration with automatic cleanup,
 * event handling, and connection management.
 */

import { useEffect, useCallback, useState, useRef } from 'react';
import {
  useSocket,
  useSocketEvent,
  useSocketEmit,
  useSocketStatus,
} from '../providers/socket-provider';

// Re-export the main hooks from provider for convenience
export {
  useSocket,
  useSocketEvent,
  useSocketEmit,
  useSocketStatus,
} from '../providers/socket-provider';

// Types
export interface SocketEventHandler<T = any> {
  event: string;
  handler: (data: T) => void;
  once?: boolean;
}

export interface SocketEmitOptions {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export interface UseSocketEventsOptions {
  autoCleanup?: boolean;
  namespace?: string;
}

export interface UseSocketRoomOptions {
  autoJoin?: boolean;
  autoLeave?: boolean;
}

export interface SocketMessage<T = any> {
  id: string;
  event: string;
  data: T;
  timestamp: Date;
  acknowledged?: boolean;
}

export interface UseSocketMessagesOptions {
  maxMessages?: number;
  persistMessages?: boolean;
  filterEvents?: string[];
}

/**
 * Advanced hook for managing multiple Socket.IO events with automatic cleanup
 */
export function useSocketEvents<T = any>(
  events: SocketEventHandler<T>[],
  options: UseSocketEventsOptions = {}
): void {
  const { autoCleanup = true, namespace } = options;
  const { on, off } = useSocket();
  const handlersRef = useRef<Map<string, Set<(...args: any[]) => void>>>(
    new Map()
  );

  useEffect(() => {
    // Register all event handlers
    events.forEach(({ event, handler, once = false }) => {
      const eventKey = namespace ? `${namespace}:${event}` : event;

      if (once) {
        // For 'once' events, wrap the handler to ensure cleanup
        const onceHandler = (...args: any[]) => {
          handler(...args);
          // Remove from tracking
          handlersRef.current.get(eventKey)?.delete(onceHandler);
        };

        on(eventKey, onceHandler);

        // Track handler for cleanup
        if (!handlersRef.current.has(eventKey)) {
          handlersRef.current.set(eventKey, new Set());
        }
        handlersRef.current.get(eventKey)!.add(onceHandler);
      } else {
        on(eventKey, handler);

        // Track handler for cleanup
        if (!handlersRef.current.has(eventKey)) {
          handlersRef.current.set(eventKey, new Set());
        }
        handlersRef.current.get(eventKey)!.add(handler);
      }
    });

    // Cleanup function
    return () => {
      if (autoCleanup) {
        handlersRef.current.forEach((handlers, eventKey) => {
          handlers.forEach(handler => {
            off(eventKey, handler);
          });
        });
        handlersRef.current.clear();
      }
    };
  }, [
    events.map(e => `${e.event}:${e.once}`).join(','),
    namespace,
    autoCleanup,
    on,
    off,
  ]);
}

/**
 * Hook for emitting events with retry logic and acknowledgment support
 */
export function useSocketEmitWithRetry() {
  const { emit, isConnected } = useSocket();
  const retryTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const emitWithRetry = useCallback(
    async (
      event: string,
      data?: any,
      options: SocketEmitOptions = {}
    ): Promise<boolean> => {
      const { timeout = 5000, retries = 3, retryDelay = 1000 } = options;

      if (!isConnected) {
        return false;
      }

      return new Promise(resolve => {
        let attempts = 0;
        const messageId = `${event}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const attemptEmit = () => {
          attempts++;

          const timeoutId = setTimeout(() => {
            if (attempts < retries) {
              // Retry after delay
              setTimeout(attemptEmit, retryDelay * attempts);
            } else {
              // Max retries reached
              retryTimeoutsRef.current.delete(messageId);
              resolve(false);
            }
          }, timeout);

          retryTimeoutsRef.current.set(messageId, timeoutId);

          // Emit with acknowledgment
          emit(event, { ...data, _messageId: messageId }, (response: any) => {
            // Clear timeout on acknowledgment
            const timeoutId = retryTimeoutsRef.current.get(messageId);
            if (timeoutId) {
              clearTimeout(timeoutId);
              retryTimeoutsRef.current.delete(messageId);
            }
            resolve(true);
          });
        };

        attemptEmit();
      });
    },
    [emit, isConnected]
  );

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      retryTimeoutsRef.current.forEach(timeoutId => {
        clearTimeout(timeoutId);
      });
      retryTimeoutsRef.current.clear();
    };
  }, []);

  return emitWithRetry;
}

/**
 * Hook for managing Socket.IO rooms with automatic join/leave
 */
export function useSocketRoom(
  roomName: string,
  options: UseSocketRoomOptions = {}
): {
  isInRoom: boolean;
  joinRoom: () => void;
  leaveRoom: () => void;
  roomMembers: string[];
} {
  const { autoJoin = true, autoLeave = true } = options;
  const { emit, on, off } = useSocket();
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomMembers, setRoomMembers] = useState<string[]>([]);

  const joinRoom = useCallback(() => {
    emit('join-room', { room: roomName });
  }, [emit, roomName]);

  const leaveRoom = useCallback(() => {
    emit('leave-room', { room: roomName });
    setIsInRoom(false);
    setRoomMembers([]);
  }, [emit, roomName]);

  useEffect(() => {
    // Room event handlers
    const handleRoomJoined = (data: { room: string; members: string[] }) => {
      if (data.room === roomName) {
        setIsInRoom(true);
        setRoomMembers(data.members || []);
      }
    };

    const handleRoomLeft = (data: { room: string }) => {
      if (data.room === roomName) {
        setIsInRoom(false);
        setRoomMembers([]);
      }
    };

    const handleRoomMembersUpdate = (data: {
      room: string;
      members: string[];
    }) => {
      if (data.room === roomName) {
        setRoomMembers(data.members || []);
      }
    };

    // Register event handlers
    on('room-joined', handleRoomJoined);
    on('room-left', handleRoomLeft);
    on('room-members-update', handleRoomMembersUpdate);

    // Auto-join if enabled
    if (autoJoin) {
      joinRoom();
    }

    // Cleanup
    return () => {
      off('room-joined', handleRoomJoined);
      off('room-left', handleRoomLeft);
      off('room-members-update', handleRoomMembersUpdate);

      if (autoLeave && isInRoom) {
        leaveRoom();
      }
    };
  }, [roomName, autoJoin, autoLeave, on, off, joinRoom, leaveRoom, isInRoom]);

  return {
    isInRoom,
    joinRoom,
    leaveRoom,
    roomMembers,
  };
}

/**
 * Hook for tracking Socket.IO message history
 */
export function useSocketMessages<T = any>(
  options: UseSocketMessagesOptions = {}
): {
  messages: SocketMessage<T>[];
  addMessage: (event: string, data: T) => void;
  clearMessages: () => void;
  getMessagesByEvent: (event: string) => SocketMessage<T>[];
  getUnacknowledgedMessages: () => SocketMessage<T>[];
  markMessageAcknowledged: (messageId: string) => void;
} {
  const {
    maxMessages = 100,
    persistMessages = false,
    filterEvents = [],
  } = options;
  const [messages, setMessages] = useState<SocketMessage<T>[]>([]);
  const { on, off } = useSocket();

  // Load persisted messages on mount
  useEffect(() => {
    if (persistMessages && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('socket-messages');
        if (stored) {
          const parsed = JSON.parse(stored);
          setMessages(
            parsed.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            }))
          );
        }
      } catch (error) {
        console.warn(
          '[useSocketMessages] Failed to load persisted messages:',
          error
        );
      }
    }
  }, [persistMessages]);

  // Persist messages when they change
  useEffect(() => {
    if (persistMessages && typeof window !== 'undefined') {
      try {
        localStorage.setItem('socket-messages', JSON.stringify(messages));
      } catch (error) {
        console.warn('[useSocketMessages] Failed to persist messages:', error);
      }
    }
  }, [messages, persistMessages]);

  const addMessage = useCallback(
    (event: string, data: T) => {
      // Skip if event is filtered out
      if (filterEvents.length > 0 && !filterEvents.includes(event)) {
        return;
      }

      const message: SocketMessage<T> = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        event,
        data,
        timestamp: new Date(),
        acknowledged: false,
      };

      setMessages(prev => {
        const newMessages = [message, ...prev];
        // Trim to max messages
        return newMessages.slice(0, maxMessages);
      });
    },
    [filterEvents, maxMessages]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    if (persistMessages && typeof window !== 'undefined') {
      localStorage.removeItem('socket-messages');
    }
  }, [persistMessages]);

  const getMessagesByEvent = useCallback(
    (event: string) => {
      return messages.filter(msg => msg.event === event);
    },
    [messages]
  );

  const getUnacknowledgedMessages = useCallback(() => {
    return messages.filter(msg => !msg.acknowledged);
  }, [messages]);

  const markMessageAcknowledged = useCallback((messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, acknowledged: true } : msg
      )
    );
  }, []);

  // Listen for all socket events if no filter is specified
  useEffect(() => {
    if (filterEvents.length === 0) {
      const handleAnyEvent = (event: string) => (data: T) => {
        addMessage(event, data);
      };

      // This is a simplified approach - in a real implementation,
      // you might need a way to listen to all events
      const commonEvents = ['message', 'notification', 'update', 'data'];
      const handlers = commonEvents.map(event => {
        const handler = handleAnyEvent(event);
        on(event, handler);
        return { event, handler };
      });

      return () => {
        handlers.forEach(({ event, handler }) => {
          off(event, handler);
        });
      };
    }
  }, [filterEvents, addMessage, on, off]);

  return {
    messages,
    addMessage,
    clearMessages,
    getMessagesByEvent,
    getUnacknowledgedMessages,
    markMessageAcknowledged,
  };
}

/**
 * Hook for Socket.IO connection health monitoring
 */
export function useSocketHealth(): {
  isHealthy: boolean;
  lastPing: Date | null;
  averageLatency: number;
  reconnectCount: number;
  uptime: number;
} {
  const { isConnected, latency, lastMessageTime } = useSocketStatus();
  const [lastPing, setLastPing] = useState<Date | null>(null);
  const [reconnectCount, setReconnectCount] = useState(0);
  const [connectionStartTime] = useState(new Date());
  const latencyHistoryRef = useRef<number[]>([]);
  const { on, off } = useSocket();

  // Track reconnections
  useEffect(() => {
    const handleReconnect = () => {
      setReconnectCount(prev => prev + 1);
    };

    const handlePing = () => {
      setLastPing(new Date());
    };

    on('reconnect', handleReconnect);
    on('ping', handlePing);

    return () => {
      off('reconnect', handleReconnect);
      off('ping', handlePing);
    };
  }, [on, off]);

  // Track latency history
  useEffect(() => {
    if (latency > 0) {
      latencyHistoryRef.current.push(latency);
      // Keep only last 10 measurements
      if (latencyHistoryRef.current.length > 10) {
        latencyHistoryRef.current.shift();
      }
    }
  }, [latency]);

  const averageLatency =
    latencyHistoryRef.current.length > 0
      ? latencyHistoryRef.current.reduce((sum, l) => sum + l, 0) /
        latencyHistoryRef.current.length
      : 0;

  const uptime = isConnected ? Date.now() - connectionStartTime.getTime() : 0;

  const isHealthy =
    isConnected &&
    averageLatency < 1000 && // Less than 1 second average latency
    (!lastMessageTime || Date.now() - lastMessageTime.getTime() < 60000); // Recent activity

  return {
    isHealthy,
    lastPing,
    averageLatency,
    reconnectCount,
    uptime,
  };
}

/**
 * Utility functions for Socket.IO
 */
export const SocketHookUtils = {
  /**
   * Create a debounced emit function
   */
  createDebouncedEmit: (
    emitFn: (event: string, data?: any) => void,
    delay: number = 300
  ) => {
    let timeoutId: NodeJS.Timeout | null = null;

    return (event: string, data?: any) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        emitFn(event, data);
      }, delay);
    };
  },

  /**
   * Create a throttled emit function
   */
  createThrottledEmit: (
    emitFn: (event: string, data?: any) => void,
    interval: number = 100
  ) => {
    let lastEmit = 0;

    return (event: string, data?: any) => {
      const now = Date.now();
      if (now - lastEmit >= interval) {
        lastEmit = now;
        emitFn(event, data);
      }
    };
  },

  /**
   * Generate a unique event ID
   */
  generateEventId: (): string => {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Format bytes for message size display
   */
  formatBytes: (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  /**
   * Check if data can be serialized for Socket.IO
   */
  canSerialize: (data: any): boolean => {
    try {
      JSON.stringify(data);
      return true;
    } catch {
      return false;
    }
  },
};

export default useSocket;
