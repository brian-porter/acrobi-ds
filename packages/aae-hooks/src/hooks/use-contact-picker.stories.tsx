/**
 * Contact Picker Hook Stories
 * Epic 57 - AAE Contact Picker
 *
 * Comprehensive Storybook stories demonstrating contact picker capabilities
 * with privacy-preserving contact selection and graceful error handling.
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useContactPicker, ContactPickerUtils } from './use-contact-picker';
import {
  ContactPickerOptions,
  ContactInfo,
  ContactPickerFilters,
} from './use-contact-picker';

const meta: Meta = {
  title: 'Hooks/useContactPicker',
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive contact picker hook for privacy-preserving access to user contacts. Manages the Contact Picker API with graceful error handling and flexible contact selection options.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Contact Picker Component for Stories
const ContactPickerDemo: React.FC<{ options?: ContactPickerOptions }> = ({
  options,
}) => {
  const {
    state,
    error,
    openPicker,
    openPickerForEmails,
    openPickerForPhones,
    openPickerForAll,
    isSupported,
    getAvailableProperties,
    filterContacts,
    formatContact,
    clearError,
    clearContacts,
  } = useContactPicker(options);

  const [availableProperties, setAvailableProperties] = useState<string[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([
    'name',
    'email',
  ]);
  const [multipleSelection, setMultipleSelection] = useState(false);
  const [contactFilters, setContactFilters] = useState<ContactPickerFilters>(
    {}
  );
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'vcard'>(
    'json'
  );

  // Load available properties
  useEffect(() => {
    if (isSupported) {
      getAvailableProperties().then(setAvailableProperties);
    }
  }, [isSupported, getAvailableProperties]);

  const handlePropertyToggle = (property: string) => {
    setSelectedProperties(prev =>
      prev.includes(property)
        ? prev.filter(p => p !== property)
        : [...prev, property]
    );
  };

  const handleCustomPicker = async () => {
    if (selectedProperties.length === 0) {
      alert('Please select at least one property');
      return;
    }

    await openPicker(selectedProperties, {
      multiple: multipleSelection,
      onSuccess: contacts => {
        console.log('Contacts selected:', contacts);
      },
      onCancel: () => {
        console.log('Contact selection cancelled');
      },
      onError: error => {
        console.error('Contact picker error:', error);
      },
    });
  };

  const filteredContacts =
    contactFilters && Object.keys(contactFilters).length > 0
      ? filterContacts(state.selectedContacts, contactFilters)
      : state.selectedContacts;

  const contactStats = ContactPickerUtils.getContactStats(
    state.selectedContacts
  );
  const browserSupport = ContactPickerUtils.getBrowserSupport();
  const propertyCombinations = ContactPickerUtils.getPropertyCombinations();

  const handleExport = () => {
    if (state.selectedContacts.length === 0) {
      alert('No contacts to export');
      return;
    }

    const exported = ContactPickerUtils.exportContacts(
      state.selectedContacts,
      exportFormat
    );

    // Create downloadable file
    const blob = new Blob([exported], {
      type: exportFormat === 'json' ? 'application/json' : 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts.${exportFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px' }}>
      <h2>Contact Picker Demo</h2>

      {/* Browser Support Warning */}
      {!isSupported && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#ffeb3b',
            border: '2px solid #ff9800',
            borderRadius: '8px',
            marginBottom: '20px',
            fontWeight: 'bold',
            color: '#e65100',
          }}
        >
          ⚠️ Contact Picker API is not supported in this browser. This feature
          works only on Chrome/Edge Android.
        </div>
      )}

      {/* iOS/Desktop Warning */}
      {(navigator.userAgent.includes('iPhone') ||
        navigator.userAgent.includes('iPad') ||
        !navigator.userAgent.includes('Mobile')) && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#ffebee',
            border: '2px solid #f44336',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
          }}
        >
          <strong>Platform Note:</strong> Contact Picker API is only supported
          on Android devices with Chrome or Edge. It is not available on iOS,
          desktop browsers, or mobile Safari.
        </div>
      )}

      {/* Status Display */}
      <div
        style={{
          padding: '15px',
          backgroundColor: isSupported ? '#e8f5e8' : '#fff3e0',
          border: `2px solid ${isSupported ? '#4caf50' : '#ff9800'}`,
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h3>Contact Picker Status</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
          }}
        >
          <p>
            <strong>API Supported:</strong> {isSupported ? '✅ Yes' : '❌ No'}
          </p>
          <p>
            <strong>Loading:</strong> {state.isLoading ? '⏳ Yes' : '✅ No'}
          </p>
          <p>
            <strong>Contacts Selected:</strong> {state.selectedContacts.length}
          </p>
          <p>
            <strong>Total Selections:</strong> {state.selectionCount}
          </p>
          <p>
            <strong>Available Properties:</strong>{' '}
            {availableProperties.length > 0
              ? availableProperties.join(', ')
              : 'Loading...'}
          </p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#ffebee',
            border: '2px solid #f44336',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <h3>Error</h3>
          <p>
            <strong>Type:</strong> {error.type}
          </p>
          <p>
            <strong>Message:</strong> {error.message}
          </p>
          {error.originalError && (
            <p>
              <strong>Details:</strong> {error.originalError.message}
            </p>
          )}
          <button
            onClick={clearError}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Clear Error
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Quick Actions</h3>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={() => openPickerForEmails()}
            disabled={!isSupported || state.isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor:
                !isSupported || state.isLoading ? '#ccc' : '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !isSupported || state.isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            📧 Select Email Contacts
          </button>

          <button
            onClick={() => openPickerForPhones()}
            disabled={!isSupported || state.isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor:
                !isSupported || state.isLoading ? '#ccc' : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !isSupported || state.isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            📞 Select Phone Contacts
          </button>

          <button
            onClick={() => openPickerForAll({ multiple: true })}
            disabled={!isSupported || state.isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor:
                !isSupported || state.isLoading ? '#ccc' : '#9c27b0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !isSupported || state.isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            👥 Select All Contact Info
          </button>

          <button
            onClick={clearContacts}
            disabled={state.selectedContacts.length === 0}
            style={{
              padding: '10px 20px',
              backgroundColor:
                state.selectedContacts.length === 0 ? '#ccc' : '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                state.selectedContacts.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            🗑️ Clear Contacts
          </button>
        </div>
      </div>

      {/* Custom Picker Configuration */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Custom Contact Picker</h3>
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            marginBottom: '15px',
          }}
        >
          <div style={{ marginBottom: '15px' }}>
            <h4>Select Properties to Request:</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['name', 'email', 'tel', 'address', 'icon'].map(property => (
                <label
                  key={property}
                  style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  <input
                    type='checkbox'
                    checked={selectedProperties.includes(property)}
                    onChange={() => handlePropertyToggle(property)}
                  />
                  <span style={{ textTransform: 'capitalize' }}>
                    {property}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <input
                type='checkbox'
                checked={multipleSelection}
                onChange={e => setMultipleSelection(e.target.checked)}
              />
              Allow multiple contact selection
            </label>
          </div>

          <button
            onClick={handleCustomPicker}
            disabled={
              !isSupported || state.isLoading || selectedProperties.length === 0
            }
            style={{
              padding: '10px 20px',
              backgroundColor:
                !isSupported ||
                state.isLoading ||
                selectedProperties.length === 0
                  ? '#ccc'
                  : '#ff5722',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !isSupported ||
                state.isLoading ||
                selectedProperties.length === 0
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            {state.isLoading ? '⏳ Opening Picker...' : '🎯 Open Custom Picker'}
          </button>
        </div>
      </div>

      {/* Property Combinations */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Common Property Combinations</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {Object.entries(propertyCombinations).map(([name, properties]) => (
            <button
              key={name}
              onClick={() => setSelectedProperties(properties)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#607d8b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                textTransform: 'capitalize',
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Contact Statistics */}
      {state.selectedContacts.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Contact Statistics</h3>
          <div
            style={{
              padding: '15px',
              backgroundColor: '#e3f2fd',
              border: '2px solid #2196f3',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '10px',
              }}
            >
              <p>
                <strong>Total:</strong> {contactStats.total}
              </p>
              <p>
                <strong>With Names:</strong> {contactStats.withNames}
              </p>
              <p>
                <strong>With Emails:</strong> {contactStats.withEmails}
              </p>
              <p>
                <strong>With Phones:</strong> {contactStats.withPhones}
              </p>
              <p>
                <strong>With Addresses:</strong> {contactStats.withAddresses}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contact Filtering */}
      {state.selectedContacts.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Filter Contacts</h3>
          <div
            style={{
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              marginBottom: '15px',
            }}
          >
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <label
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <input
                  type='checkbox'
                  checked={contactFilters.hasName || false}
                  onChange={e =>
                    setContactFilters(prev => ({
                      ...prev,
                      hasName: e.target.checked || undefined,
                    }))
                  }
                />
                Has Name
              </label>
              <label
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <input
                  type='checkbox'
                  checked={contactFilters.hasEmail || false}
                  onChange={e =>
                    setContactFilters(prev => ({
                      ...prev,
                      hasEmail: e.target.checked || undefined,
                    }))
                  }
                />
                Has Email
              </label>
              <label
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <input
                  type='checkbox'
                  checked={contactFilters.hasPhone || false}
                  onChange={e =>
                    setContactFilters(prev => ({
                      ...prev,
                      hasPhone: e.target.checked || undefined,
                    }))
                  }
                />
                Has Phone
              </label>
              <label
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <input
                  type='checkbox'
                  checked={contactFilters.hasAddress || false}
                  onChange={e =>
                    setContactFilters(prev => ({
                      ...prev,
                      hasAddress: e.target.checked || undefined,
                    }))
                  }
                />
                Has Address
              </label>
            </div>
            <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              Showing {filteredContacts.length} of{' '}
              {state.selectedContacts.length} contacts
            </p>
          </div>
        </div>
      )}

      {/* Selected Contacts Display */}
      {filteredContacts.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Selected Contacts ({filteredContacts.length})</h3>
          <div
            style={{
              maxHeight: '300px',
              overflowY: 'auto',
              border: '2px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#f9f9f9',
            }}
          >
            {filteredContacts.map((contact, index) => (
              <div
                key={index}
                style={{
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  marginBottom: '10px',
                  border: '1px solid #e0e0e0',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '10px',
                  }}
                >
                  <div>
                    <strong>Full:</strong> {formatContact(contact, 'full')}
                  </div>
                  <div>
                    <strong>Name:</strong> {formatContact(contact, 'name')}
                  </div>
                  <div>
                    <strong>Email:</strong>{' '}
                    {formatContact(contact, 'email') || 'N/A'}
                  </div>
                  <div>
                    <strong>Phone:</strong>{' '}
                    {formatContact(contact, 'phone') || 'N/A'}
                  </div>
                </div>

                {/* Raw contact data (collapsed by default) */}
                <details style={{ marginTop: '10px' }}>
                  <summary style={{ cursor: 'pointer', color: '#666' }}>
                    Raw Contact Data
                  </summary>
                  <pre
                    style={{
                      backgroundColor: '#f5f5f5',
                      padding: '10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      overflow: 'auto',
                      marginTop: '5px',
                    }}
                  >
                    {JSON.stringify(contact, null, 2)}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export Contacts */}
      {state.selectedContacts.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Export Contacts</h3>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <select
              value={exportFormat}
              onChange={e =>
                setExportFormat(e.target.value as 'csv' | 'json' | 'vcard')
              }
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            >
              <option value='json'>JSON</option>
              <option value='csv'>CSV</option>
              <option value='vcard'>vCard</option>
            </select>

            <button
              onClick={handleExport}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📥 Export as {exportFormat.toUpperCase()}
            </button>
          </div>
        </div>
      )}

      {/* Browser Support Info */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Browser Support</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '10px',
          }}
        >
          {Object.entries(browserSupport).map(([browser, support]) => (
            <div
              key={browser}
              style={{
                padding: '10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              <strong style={{ textTransform: 'capitalize' }}>
                {browser}:
              </strong>
              <br />
              {support}
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Guidelines */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Privacy Guidelines</h3>
        <div
          style={{
            fontSize: '14px',
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {ContactPickerUtils.getPrivacyGuidelines().map(
              (guideline, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>
                  {guideline}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Technical Details */}
      <div>
        <h3>Technical Details</h3>
        <div
          style={{
            fontSize: '14px',
            color: '#666',
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <p>
            <strong>API:</strong> Contact Picker API (navigator.contacts.select)
          </p>
          <p>
            <strong>User Activation:</strong> Requires user gesture to activate
          </p>
          <p>
            <strong>Privacy-Preserving:</strong> Contacts are not exposed until
            explicitly selected by user
          </p>
          <p>
            <strong>Platform Support:</strong> Android Chrome/Edge only - not
            available on iOS or desktop
          </p>
          <p>
            <strong>Data Access:</strong> Only requested properties of selected
            contacts are accessible
          </p>
        </div>
      </div>
    </div>
  );
};

// Basic Contact Picker Story
export const BasicContactPicker: Story = {
  render: () => <ContactPickerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic contact picker functionality with privacy-preserving contact selection and comprehensive error handling.',
      },
    },
  },
};

// Multiple Contact Selection Story
export const MultipleContactSelection: Story = {
  render: () => (
    <ContactPickerDemo
      options={{
        multiple: true,
        onSuccess: contacts => {
          console.log('Multiple contacts selected:', contacts);
          alert(`Selected ${contacts.length} contacts`);
        },
        onCancel: () => {
          console.log('Contact selection cancelled');
          alert('Contact selection was cancelled');
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Contact picker configured for multiple contact selection with success and cancellation callbacks.',
      },
    },
  },
};

// Email-Only Contact Picker Story
export const EmailContactPicker: Story = {
  render: () => {
    const EmailContactDemo: React.FC = () => {
      const contactPicker = useContactPicker({
        onSuccess: contacts => {
          const emails = ContactPickerUtils.extractProperty(contacts, 'email');
          console.log('Email addresses extracted:', emails);

          if (emails.length > 0) {
            alert(
              `Extracted ${emails.length} email addresses: ${emails.join(', ')}`
            );
          }
        },
        onError: error => {
          if (error.type === 'not_supported') {
            alert('Contact Picker is only supported on Android Chrome/Edge');
          } else {
            alert(`Error: ${error.message}`);
          }
        },
      });

      return (
        <div style={{ padding: '20px' }}>
          <h3>Email Contact Picker</h3>
          <p>
            This demo focuses on selecting contacts specifically for their email
            addresses.
          </p>

          <button
            onClick={() =>
              contactPicker.openPickerForEmails({ multiple: true })
            }
            disabled={
              !contactPicker.isSupported || contactPicker.state.isLoading
            }
            style={{
              padding: '12px 24px',
              backgroundColor: contactPicker.isSupported ? '#4caf50' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: contactPicker.isSupported ? 'pointer' : 'not-allowed',
              fontSize: '16px',
            }}
          >
            📧 Select Email Contacts
          </button>

          {contactPicker.state.selectedContacts.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4>Selected Email Contacts:</h4>
              <ul>
                {contactPicker.state.selectedContacts.map((contact, index) => (
                  <li key={index}>
                    {contactPicker.formatContact(contact, 'name')} -{' '}
                    {contactPicker.formatContact(contact, 'email')}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {contactPicker.error && (
            <div style={{ marginTop: '20px', color: 'red' }}>
              Error: {contactPicker.error.message}
            </div>
          )}
        </div>
      );
    };

    return <EmailContactDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Contact picker specifically configured for email contact selection with email extraction utilities.',
      },
    },
  },
};

// Phone Contact Picker Story
export const PhoneContactPicker: Story = {
  render: () => {
    const PhoneContactDemo: React.FC = () => {
      const contactPicker = useContactPicker({
        onSuccess: contacts => {
          const phones = ContactPickerUtils.extractProperty(contacts, 'tel');
          console.log('Phone numbers extracted:', phones);

          if (phones.length > 0) {
            alert(
              `Extracted ${phones.length} phone numbers: ${phones.join(', ')}`
            );
          }
        },
      });

      return (
        <div style={{ padding: '20px' }}>
          <h3>Phone Contact Picker</h3>
          <p>
            This demo focuses on selecting contacts specifically for their phone
            numbers.
          </p>

          <button
            onClick={() =>
              contactPicker.openPickerForPhones({ multiple: true })
            }
            disabled={
              !contactPicker.isSupported || contactPicker.state.isLoading
            }
            style={{
              padding: '12px 24px',
              backgroundColor: contactPicker.isSupported ? '#2196f3' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: contactPicker.isSupported ? 'pointer' : 'not-allowed',
              fontSize: '16px',
            }}
          >
            📞 Select Phone Contacts
          </button>

          {contactPicker.state.selectedContacts.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4>Selected Phone Contacts:</h4>
              <ul>
                {contactPicker.state.selectedContacts.map((contact, index) => (
                  <li key={index}>
                    {contactPicker.formatContact(contact, 'name')} -{' '}
                    {contactPicker.formatContact(contact, 'phone')}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    };

    return <PhoneContactDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Contact picker specifically configured for phone contact selection with phone number extraction utilities.',
      },
    },
  },
};

// Error Handling Contact Picker Story
export const ErrorHandlingContactPicker: Story = {
  render: () => (
    <ContactPickerDemo
      options={{
        onError: error => {
          console.error('Contact picker error:', error);

          switch (error.type) {
            case 'not_supported':
              alert(
                'Contact Picker API is not supported in this browser. Please use Chrome or Edge on Android.'
              );
              break;
            case 'permission_denied':
              alert(
                'Contact access permission was denied. Please check your browser settings.'
              );
              break;
            case 'not_allowed':
              alert(
                'Contact picker requires user interaction. Please try clicking the button again.'
              );
              break;
            case 'abort':
              alert('Contact selection was cancelled.');
              break;
            default:
              alert(`Contact picker error: ${error.message}`);
          }
        },
        onCancel: () => {
          console.log('User cancelled contact selection');
          alert('Contact selection was cancelled by the user');
        },
        onSuccess: contacts => {
          console.log('Contact selection successful:', contacts);
          alert(`Successfully selected ${contacts.length} contact(s)`);
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Contact picker with comprehensive error handling for all possible error scenarios and user feedback.',
      },
    },
  },
};
