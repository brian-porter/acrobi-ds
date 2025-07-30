/**
 * @fileoverview Local Storage Hook Stories for Epic 64
 * Interactive demonstrations of localStorage state persistence
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useLocalStorage, LocalStorageUtils } from './use-local-storage';

const meta: Meta = {
  title: "Hooks/useLocalStorage',"
  parameters: {
    docs: {
      description: {
        component: 'Hook that provides useState-like functionality with automatic localStorage persistence. Safely handles SSR and provides JSON serialization/deserialization.'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Basic Local Storage Demo
const BasicLocalStorageDemo: React.FC = () => {
  const {
    value: name,
    setValue: setName,
    remove: removeName,
    clear: clearAll,
    isSupported,
    error,
    clearError
  } = useLocalStorage('demo_name', '', {
    debug: true,
    syncAcrossTabs: true,
    onChange: (key, newValue, oldValue) => {
      console.log(`LocalStorage "${key}" changed from "${oldValue}" to "${newValue}"`);
    }
  });

  const {
    value: preferences,
    setValue: setPreferences
  } = useLocalStorage('demo_preferences', {
    theme: 'light',
    notifications: true,
    language: 'en'
  }, {
    debug: true
  });

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Basic Local Storage</h2>
      
      {!isSupported && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          ⚠️ LocalStorage is not supported in this browser
        </div>
      )}

      {error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <strong>Error:</strong> {error.message}
          <button 
            onClick={clearError}
            style={{ 
              marginLeft: '10px', 
              padding: '4px 8px',
              backgroundColor: '#f44',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* String Storage */}
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h3>String Storage</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Your Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginBottom: '10px'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong>Stored Value:</strong> "{name}"
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => removeName()}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Remove
            </button>
            
            <button
              onClick={() => setName('John Doe')}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Set Default
            </button>
          </div>
        </div>

        {/* Object Storage */}
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h3>Object Storage</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Theme:
            </label>
            <select
              value={preferences.theme}
              onChange={(e) => handlePreferenceChange('theme', e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginBottom: '10px'
              }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              Enable Notifications
            </label>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Language:
            </label>
            <select
              value={preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div style={{ 
            padding: '10px',
            backgroundColor: '#e7f3ff',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            <strong>Stored Object:</strong>
            <pre style={{ margin: '5px 0 0 0', fontSize: '11px' }}>
              {JSON.stringify(preferences, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {/* Global Actions */}
      <div style={{ 
        marginTop: '20px',
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>Global Actions</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => clearAll()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear All localStorage
          </button>
          
          <button
            onClick={() => {
              setName('Demo User');
              setPreferences({ theme: 'dark', notifications: false, language: 'en' });
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset to Defaults
          </button>
        </div>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#e7f3ff', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <strong>Instructions:</strong> Changes are automatically saved to localStorage. 
        Open this page in another tab to see cross-tab synchronization in action.
        Refresh the page to see data persistence.
      </div>
    </div>
  );
};

// Storage Management Demo
const StorageManagementDemo: React.FC = () => {
  const [storageInfo, setStorageInfo] = useState(LocalStorageUtils.getStorageInfo());
  const [allKeys, setAllKeys] = useState(LocalStorageUtils.getAllKeys());

  const {
    value: shoppingCart,
    setValue: setShoppingCart
  } = useLocalStorage('demo_shopping_cart', [], {
    debug: true
  });

  const refreshStorageInfo = () => {
    setStorageInfo(LocalStorageUtils.getStorageInfo());
    setAllKeys(LocalStorageUtils.getAllKeys());
  };

  const addToCart = () => {
    const newItem = {
      id: Date.now(),
      name: `Product ${shoppingCart.length + 1}`,
      price: Math.round(Math.random() * 100 + 10),
      quantity: 1
    };
    setShoppingCart(prev => [...prev, newItem]);
    refreshStorageInfo();
  };

  const removeFromCart = (id: number) => {
    setShoppingCart(prev => prev.filter(item => item.id !== id));
    refreshStorageInfo();
  };

  const clearCart = () => {
    setShoppingCart([]);
    refreshStorageInfo();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Storage Management</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Storage Statistics */}
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h3>Storage Statistics</h3>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Used:</strong> {(storageInfo.used / 1024).toFixed(2)} KB
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Available:</strong> {(storageInfo.available / 1024).toFixed(2)} KB
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Usage:</strong> {storageInfo.usage.toFixed(2)}%
          </div>
          
          <div style={{
            width: '100%',
            height: '20px',
            backgroundColor: '#e9ecef',
            borderRadius: '10px',
            overflow: 'hidden',
            marginTop: '10px'
          }}>
            <div style={{
              width: `${Math.min(100, storageInfo.usage)}%`,
              height: '100%',
              backgroundColor: storageInfo.usage > 80 ? '#dc3545' : 
                             storageInfo.usage > 60 ? '#ffc107' : '#28a745',
              transition: 'width 0.3s ease'
            }} />
          </div>

          <button
            onClick={refreshStorageInfo}
            style={{
              marginTop: '15px',
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Stats
          </button>
        </div>

        {/* All Storage Keys */}
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h3>All Storage Keys ({allKeys.length})</h3>
          
          <div style={{ 
            maxHeight: '200px', 
            overflowY: 'auto',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '10px'
          }}>
            {allKeys.length === 0 ? (
              <div style={{ color: '#666', fontStyle: 'italic' }}>
                No localStorage keys found
              </div>
            ) : (
              allKeys.map((key, index) => (
                <div
                  key={key}
                  style={{
                    padding: '4px 0',
                    borderBottom: index < allKeys.length - 1 ? '1px solid #eee' : 'none',
                    fontSize: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontFamily: 'monospace' }}>{key}</span>
                  <span style={{ color: '#666' }}>
                    {LocalStorageUtils.getKeySize(key)} bytes
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Shopping Cart Demo */}
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#f0f8ff', 
        borderRadius: '8px',
        border: '1px solid #b6d7ff'
      }}>
        <h3>Demo Shopping Cart ({shoppingCart.length} items)</h3>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button
            onClick={addToCart}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add Item to Cart
          </button>
          
          <button
            onClick={clearCart}
            disabled={shoppingCart.length === 0}
            style={{
              padding: '8px 16px',
              backgroundColor: shoppingCart.length === 0 ? '#ccc' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: shoppingCart.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Clear Cart
          </button>
        </div>

        <div style={{ 
          maxHeight: '200px', 
          overflowY: 'auto'
        }}>
          {shoppingCart.length === 0 ? (
            <div style={{ 
              padding: '20px', 
              textAlign: 'center', 
              color: '#666',
              fontStyle: 'italic'
            }}>
              Your cart is empty
            </div>
          ) : (
            shoppingCart.map((item, index) => (
              <div
                key={item.id}
                style={{
                  padding: '10px',
                  marginBottom: '8px',
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    ${item.price} × {item.quantity}
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {shoppingCart.length > 0 && (
          <div style={{ 
            marginTop: '15px',
            padding: '10px',
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderRadius: '4px',
            textAlign: 'right'
          }}>
            <strong>
              Total: ${shoppingCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
            </strong>
          </div>
        )}
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#fff3cd', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <strong>Storage Demo:</strong> This shopping cart persists across page refreshes and browser sessions.
        The storage statistics show real-time usage of your browser's localStorage.
      </div>
    </div>
  );
};

// Advanced Features Demo
const AdvancedFeaturesDemo: React.FC = () => {
  const [dateValue, setDateValue] = useState(new Date());

  // Date serialization example
  const {
    value: scheduledEvent,
    setValue: setScheduledEvent
  } = useLocalStorage('demo_scheduled_event', {
    title: 'Meeting',
    date: new Date(),
    attendees: []
  }, {
    serializer: LocalStorageUtils.dateSerializer,
    debug: true
  });

  // Custom validation example  
  const {
    value: userProfile,
    setValue: setUserProfile,
    error: profileError
  } = useLocalStorage('demo_user_profile', {
    username: '',
    email: '',
    age: 0
  }, {
    debug: true,
    onChange: (key, newValue, oldValue) => {
      console.log('Profile updated:', { key, newValue, oldValue });
    }
  });

  const updateProfile = (field: string, value: any) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const batchUpdate = () => {
    const batchData = {
      'batch_item_1': { name: 'Item 1', value: 100 },
      'batch_item_2': { name: 'Item 2', value: 200 },
      'batch_item_3': { name: 'Item 3', value: 300 }
    };

    const result = LocalStorageUtils.batchSet(batchData);
    alert(`Batch operation: ${result.success.length} succeeded, ${result.failed.length} failed`);
  };

  const exportData = () => {
    const data = LocalStorageUtils.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'localStorage_export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Advanced Features</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Date Serialization */}
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h3>Date Serialization</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Event Title:
            </label>
            <input
              type="text"
              value={scheduledEvent.title}
              onChange={(e) => setScheduledEvent(prev => ({ ...prev, title: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginBottom: '10px'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Event Date:
            </label>
            <input
              type="datetime-local"
              value={scheduledEvent.date.toISOString().slice(0, 16)}
              onChange={(e) => setScheduledEvent(prev => ({ ...prev, date: new Date(e.target.value) }))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>

          <div style={{ 
            padding: '10px',
            backgroundColor: '#e7f3ff',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            <strong>Stored Event:</strong>
            <div>Title: {scheduledEvent.title}</div>
            <div>Date: {scheduledEvent.date.toLocaleString()}</div>
            <div>Type: {scheduledEvent.date instanceof Date ? 'Date Object' : 'String'}</div>
          </div>
        </div>

        {/* User Profile with Validation */}
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h3>Profile with Change Tracking</h3>
          
          {profileError && (
            <div style={{ 
              padding: '8px', 
              backgroundColor: '#fee', 
              border: '1px solid #fcc',
              borderRadius: '4px',
              marginBottom: '10px',
              fontSize: '12px'
            }}>
              Error: {profileError.message}
            </div>
          )}

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>
              Username:
            </label>
            <input
              type="text"
              value={userProfile.username}
              onChange={(e) => updateProfile('username', e.target.value)}
              style={{
                width: '100%',
                padding: '6px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '12px'
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>
              Email:
            </label>
            <input
              type="email"
              value={userProfile.email}
              onChange={(e) => updateProfile('email', e.target.value)}
              style={{
                width: '100%',
                padding: '6px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '12px'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>
              Age:
            </label>
            <input
              type="number"
              value={userProfile.age}
              onChange={(e) => updateProfile('age', parseInt(e.target.value) || 0)}
              style={{
                width: '100%',
                padding: '6px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '12px'
              }}
            />
          </div>

          <div style={{ 
            padding: '8px',
            backgroundColor: '#e7f3ff',
            borderRadius: '4px',
            fontSize: '10px'
          }}>
            <strong>Change tracking enabled</strong><br/>
            Check console for change events
          </div>
        </div>
      </div>

      {/* Utility Functions */}
      <div style={{ 
        marginTop: '20px',
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>Utility Functions</h3>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={batchUpdate}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Batch Set Items
          </button>
          
          <button
            onClick={exportData}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Export Data
          </button>
          
          <button
            onClick={() => {
              const removed = LocalStorageUtils.clearByPrefix('demo_');
              alert(`Removed ${removed.length} demo keys`);
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear Demo Data
          </button>
          
          <button
            onClick={() => {
              const stats = LocalStorageUtils.getStorageInfo();
              alert(`Storage: ${(stats.used/1024).toFixed(2)}KB used (${stats.usage.toFixed(1)}%)`);
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Show Stats
          </button>
        </div>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#d1ecf1', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <strong>Advanced Features:</strong> Date serialization preserves Date objects across storage.
        Batch operations allow efficient bulk updates. Change tracking logs all modifications.
        Export/import enables data portability.
      </div>
    </div>
  );
};

export const BasicDemo: Story = {
  render: () => <BasicLocalStorageDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Basic localStorage functionality with string and object storage. Shows automatic serialization, cross-tab sync, and error handling.'
      }
    }
  }
};

export const StorageManagement: Story = {
  render: () => <StorageManagementDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Storage management utilities with real-time statistics, key listing, and shopping cart demo showing practical persistence usage.'
      }
    }
  }
};

export const AdvancedFeatures: Story = {
  render: () => <AdvancedFeaturesDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Advanced features including date serialization, change tracking, batch operations, and data export/import functionality.'
      }
    }
  }
};