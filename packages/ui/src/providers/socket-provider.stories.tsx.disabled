import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import {
  SocketProvider,
  useSocket,
  useSocketEvent,
  useSocketStatus,
  useSocketRoom,
  SocketUtils,
} from './socket-provider';

const meta: Meta = {
  title: 'Providers/SocketProvider',
  parameters: {
    docs: {
      description: {
        component:
          'Socket.IO Provider for real-time communication. Manages a singleton Socket.IO connection with automatic reconnection, error handling, and connection status management. Perfect for applications that need real-time features like chat, notifications, or live updates.',
      },
    },
  },
  argTypes: {
    url: {
      control: 'text',
      description: 'Socket.IO server URL',
    },
    autoConnect: {
      control: 'boolean',
      description: 'Whether to connect automatically on mount',
    },
    reconnectAttempts: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Number of reconnection attempts',
    },
    reconnectDelay: {
      control: { type: 'number', min: 100, max: 5000, step: 100 },
      description: 'Delay between reconnection attempts (ms)',
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock Socket.IO server for demonstration
const MOCK_SOCKET_URL = 'wss://socketio-chat-h9jt.herokuapp.com';
const LOCAL_SOCKET_URL = 'http://localhost:3001';

// Demo component that uses Socket.IO
const SocketDemo = ({
  url = MOCK_SOCKET_URL,
  autoConnect = true,
  reconnectAttempts = 5,
  reconnectDelay = 1000,
}: {
  url?: string;
  autoConnect?: boolean;
  reconnectAttempts?: number;
  reconnectDelay?: number;
}) => {
  return (
    <SocketProvider
      url={url}
      autoConnect={autoConnect}
      reconnectAttempts={reconnectAttempts}
      reconnectDelay={reconnectDelay}
      onConnect={socket => console.log('Socket connected:', socket.id)}
      onDisconnect={reason => console.log('Socket disconnected:', reason)}
      onError={error => console.error('Socket error:', error)}
      onReconnect={attemptNumber =>
        console.log('Socket reconnected after', attemptNumber, 'attempts')
      }
    >
      <SocketDemoContent />
    </SocketProvider>
  );
};

// Main demo content component
const SocketDemoContent = () => {
  const { emit, isConnected, connectionId, latency } = useSocket();
  const status = useSocketStatus();
  const [messages, setMessages] = useState<
    { id: string; text: string; timestamp: Date; user: string }[]
  >([]);
  const [messageText, setMessageText] = useState('');
  const [username, setUsername] = useState(
    `User_${Math.random().toString(36).substr(2, 6)}`
  );
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [
      `${new Date().toLocaleTimeString()}: ${message}`,
      ...prev.slice(0, 9),
    ]);
  };

  // Handle incoming messages
  useSocketEvent(
    'message',
    (data: { id: string; text: string; user: string; timestamp: string }) => {
      setMessages(prev => [
        ...prev,
        {
          ...data,
          timestamp: new Date(data.timestamp),
        },
      ]);
      addLog(`Message received from ${data.user}: ${data.text}`);
    }
  );

  // Handle user joined/left events
  useSocketEvent('user joined', (data: { user: string }) => {
    addLog(`${data.user} joined the chat`);
  });

  useSocketEvent('user left', (data: { user: string }) => {
    addLog(`${data.user} left the chat`);
  });

  // Send a message
  const sendMessage = () => {
    if (messageText.trim() && isConnected) {
      const message = {
        id: `msg_${Date.now()}`,
        text: messageText.trim(),
        user: username,
        timestamp: new Date().toISOString(),
      };

      emit('message', message);
      addLog(`Message sent: ${message.text}`);
      setMessageText('');
    }
  };

  // Send typing indicator
  const handleTyping = () => {
    if (isConnected) {
      emit('typing', { user: username });
    }
  };

  // Join/leave events
  useEffect(() => {
    if (isConnected) {
      emit('user joined', { user: username });
      addLog('Joined the chat');
    }

    return () => {
      if (isConnected) {
        emit('user left', { user: username });
      }
    };
  }, [isConnected, username, emit]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '800px',
      }}
    >
      <h2 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>
        🔌 Socket.IO Real-Time Demo
      </h2>

      {/* Connection Status */}
      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: status.isConnected
            ? '#f0fdf4'
            : status.hasError
              ? '#fef2f2'
              : '#fef3c7',
          borderRadius: '8px',
          border: `1px solid ${status.isConnected ? '#bbf7d0' : status.hasError ? '#fecaca' : '#fed7aa'}`,
        }}
      >
        <h3
          style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#374151' }}
        >
          Connection Status
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '10px',
            fontSize: '14px',
          }}
        >
          <div>
            <strong>Status:</strong>
            <span
              style={{
                marginLeft: '8px',
                color: status.isConnected
                  ? '#059669'
                  : status.hasError
                    ? '#dc2626'
                    : '#d97706',
              }}
            >
              {SocketUtils.formatConnectionStatus(
                status.status,
                status.latency
              )}
            </span>
          </div>
          <div>
            <strong>Connection ID:</strong>
            <span
              style={{
                marginLeft: '8px',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
            >
              {connectionId || 'N/A'}
            </span>
          </div>
          <div>
            <strong>Latency:</strong>
            <span style={{ marginLeft: '8px' }}>
              {latency ? `${latency}ms` : 'N/A'}
            </span>
          </div>
          <div>
            <strong>Last Activity:</strong>
            <span style={{ marginLeft: '8px' }}>
              {status.lastMessageTime
                ? status.lastMessageTime.toLocaleTimeString()
                : 'N/A'}
            </span>
          </div>
        </div>

        {status.connectionError && (
          <div
            style={{
              marginTop: '10px',
              padding: '8px',
              backgroundColor: '#fef2f2',
              borderRadius: '4px',
              color: '#dc2626',
              fontSize: '12px',
            }}
          >
            <strong>Error:</strong> {status.connectionError}
          </div>
        )}
      </div>

      {/* Username Input */}
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '5px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Username:
        </label>
        <input
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            width: '200px',
          }}
          placeholder='Enter your username'
        />
      </div>

      {/* Chat Interface */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: '20px',
        }}
      >
        {/* Messages */}
        <div>
          <h3
            style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#374151' }}
          >
            Chat Messages
          </h3>
          <div
            style={{
              height: '300px',
              overflowY: 'auto',
              padding: '15px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              marginBottom: '15px',
            }}
          >
            {messages.length === 0 ? (
              <div
                style={{
                  color: '#6b7280',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  marginTop: '50px',
                }}
              >
                No messages yet. Send the first message!
              </div>
            ) : (
              messages.map(message => (
                <div
                  key={message.id}
                  style={{
                    marginBottom: '12px',
                    padding: '8px',
                    backgroundColor:
                      message.user === username ? '#dbeafe' : 'white',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      marginBottom: '2px',
                    }}
                  >
                    <strong>{message.user}</strong> •{' '}
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                  <div style={{ fontSize: '14px' }}>{message.text}</div>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type='text'
              value={messageText}
              onChange={e => {
                setMessageText(e.target.value);
                handleTyping();
              }}
              onKeyPress={handleKeyPress}
              placeholder='Type a message...'
              disabled={!isConnected}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: !isConnected ? '#f3f4f6' : 'white',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!isConnected || !messageText.trim()}
              style={{
                padding: '8px 16px',
                backgroundColor:
                  !isConnected || !messageText.trim() ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor:
                  !isConnected || !messageText.trim()
                    ? 'not-allowed'
                    : 'pointer',
                fontSize: '14px',
              }}
            >
              Send
            </button>
          </div>
        </div>

        {/* Activity Log */}
        <div>
          <h3
            style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#374151' }}
          >
            Activity Log
          </h3>
          <div
            style={{
              height: '300px',
              overflowY: 'auto',
              padding: '12px',
              backgroundColor: '#111827',
              borderRadius: '6px',
              color: '#f9fafb',
              fontSize: '12px',
              fontFamily: 'monospace',
            }}
          >
            {logs.length === 0 ? (
              <div style={{ color: '#6b7280' }}>No activity yet...</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} style={{ marginBottom: '4px' }}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Test Actions */}
      <div style={{ marginTop: '20px' }}>
        <h3
          style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#374151' }}
        >
          Test Actions
        </h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => emit('ping', { timestamp: Date.now() })}
            disabled={!isConnected}
            style={{
              padding: '8px 16px',
              backgroundColor: !isConnected ? '#9ca3af' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: !isConnected ? 'not-allowed' : 'pointer',
              fontSize: '14px',
            }}
          >
            📡 Send Ping
          </button>

          <button
            onClick={() =>
              emit('heartbeat', { user: username, timestamp: Date.now() })
            }
            disabled={!isConnected}
            style={{
              padding: '8px 16px',
              backgroundColor: !isConnected ? '#9ca3af' : '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: !isConnected ? 'not-allowed' : 'pointer',
              fontSize: '14px',
            }}
          >
            💓 Send Heartbeat
          </button>

          <button
            onClick={() => {
              const testMessage = `Test message from ${username} at ${new Date().toLocaleTimeString()}`;
              emit('broadcast', { message: testMessage, user: username });
              addLog(`Broadcast sent: ${testMessage}`);
            }}
            disabled={!isConnected}
            style={{
              padding: '8px 16px',
              backgroundColor: !isConnected ? '#9ca3af' : '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: !isConnected ? 'not-allowed' : 'pointer',
              fontSize: '14px',
            }}
          >
            📢 Broadcast Test
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#eff6ff',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#1e40af',
        }}
      >
        <strong>Instructions:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>This demo connects to a public Socket.IO test server</li>
          <li>Type messages in the input field and press Enter to send</li>
          <li>Open multiple browser tabs to test real-time communication</li>
          <li>Try the test actions to send different types of events</li>
          <li>Watch the activity log for connection events and messages</li>
        </ul>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#6366f1' }}>
          <strong>Note:</strong> If the demo server is unavailable, try changing
          the URL to a local Socket.IO server or any other public Socket.IO
          endpoint.
        </p>
      </div>
    </div>
  );
};

// Socket.IO Room Demo
const SocketRoomDemo = () => {
  const { isConnected } = useSocket();
  const [currentRoom, setCurrentRoom] = useState('general');
  const room = useSocketRoom(currentRoom, { autoJoin: true, autoLeave: true });

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h3 style={{ margin: '0 0 15px 0' }}>🏠 Socket.IO Rooms Demo</h3>

      <div style={{ marginBottom: '15px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '5px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Current Room:
        </label>
        <select
          value={currentRoom}
          onChange={e => setCurrentRoom(e.target.value)}
          disabled={!isConnected}
          style={{
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        >
          <option value='general'>General</option>
          <option value='tech'>Tech Talk</option>
          <option value='random'>Random</option>
          <option value='gaming'>Gaming</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <div style={{ fontSize: '14px' }}>
          <strong>Room Status:</strong>{' '}
          {room.isInRoom ? '✅ Joined' : '❌ Not in room'}
        </div>
        <div style={{ fontSize: '14px' }}>
          <strong>Members:</strong>{' '}
          {room.roomMembers.length > 0
            ? room.roomMembers.join(', ')
            : 'No members visible'}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={room.joinRoom}
          disabled={!isConnected || room.isInRoom}
          style={{
            padding: '8px 16px',
            backgroundColor:
              !isConnected || room.isInRoom ? '#9ca3af' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: !isConnected || room.isInRoom ? 'not-allowed' : 'pointer',
            fontSize: '14px',
          }}
        >
          Join Room
        </button>

        <button
          onClick={room.leaveRoom}
          disabled={!isConnected || !room.isInRoom}
          style={{
            padding: '8px 16px',
            backgroundColor:
              !isConnected || !room.isInRoom ? '#9ca3af' : '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: !isConnected || !room.isInRoom ? 'not-allowed' : 'pointer',
            fontSize: '14px',
          }}
        >
          Leave Room
        </button>
      </div>
    </div>
  );
};

// Hook usage example
const HookUsageExample = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h3>Socket.IO Integration Example</h3>
      <pre
        style={{
          backgroundColor: '#f8fafc',
          padding: '15px',
          borderRadius: '6px',
          fontSize: '14px',
          overflow: 'auto',
        }}
      >
        {`// 1. Wrap your app with SocketProvider
import { SocketProvider } from '@acrobi/ui';

function App() {
  return (
    <SocketProvider
      url="ws://localhost:3001"
      autoConnect={true}
      reconnectAttempts={5}
      onConnect={(socket) => console.log('Connected:', socket.id)}
      onError={(error) => console.error('Socket error:', error)}
    >
      <MyComponent />
    </SocketProvider>
  );
}

// 2. Use Socket.IO in your components
import { useSocket, useSocketEvent } from '@acrobi/ui';

function MyComponent() {
  const { emit, isConnected } = useSocket();
  const [messages, setMessages] = useState([]);

  // Listen for events
  useSocketEvent('message', (data) => {
    setMessages(prev => [...prev, data]);
  });

  // Send events
  const sendMessage = (text) => {
    if (isConnected) {
      emit('message', { text, user: 'me', timestamp: Date.now() });
    }
  };

  return (
    <div>
      <div>Status: {isConnected ? 'Connected' : 'Disconnected'}</div>
      <button onClick={() => sendMessage('Hello!')}>
        Send Message
      </button>
    </div>
  );
}`}
      </pre>
    </div>
  );
};

// Stories
export const Default: Story = {
  render: () => <SocketDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Default Socket.IO provider with real-time chat demo. Connects to a public test server to demonstrate real-time communication features.',
      },
    },
  },
};

export const AutoConnect: Story = {
  render: () => <SocketDemo autoConnect={true} />,
  parameters: {
    docs: {
      description: {
        story:
          'Socket.IO provider with auto-connect enabled. Connection is established automatically when the component mounts.',
      },
    },
  },
};

export const ManualConnect: Story = {
  render: () => <SocketDemo autoConnect={false} />,
  parameters: {
    docs: {
      description: {
        story:
          'Socket.IO provider with manual connection. You need to trigger the connection manually.',
      },
    },
  },
};

export const LocalServer: Story = {
  render: () => <SocketDemo url={LOCAL_SOCKET_URL} />,
  parameters: {
    docs: {
      description: {
        story:
          'Socket.IO provider configured for local development server (localhost:3001).',
      },
    },
  },
};

export const CustomReconnection: Story = {
  render: () => <SocketDemo reconnectAttempts={3} reconnectDelay={2000} />,
  parameters: {
    docs: {
      description: {
        story:
          'Socket.IO provider with custom reconnection settings - 3 attempts with 2 second delays.',
      },
    },
  },
};

export const RoomsDemo: Story = {
  render: () => (
    <SocketProvider url={MOCK_SOCKET_URL} autoConnect={true}>
      <SocketRoomDemo />
    </SocketProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of Socket.IO rooms functionality with the useSocketRoom hook.',
      },
    },
  },
};

export const HookUsage: Story = {
  render: () => <HookUsageExample />,
  parameters: {
    docs: {
      description: {
        story:
          'Example code showing how to integrate Socket.IO with your React application using the provider and hooks.',
      },
    },
  },
};
