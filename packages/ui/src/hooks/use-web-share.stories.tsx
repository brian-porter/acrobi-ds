/**
 * Web Share Hook Stories
 * Epic 56 - AAE Web Share
 *
 * Comprehensive Storybook stories demonstrating web share capabilities
 * with native OS sharing and fallback mechanisms.
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useWebShare, WebShareUtils } from './use-web-share';
import { WebShareOptions, ShareData } from './use-web-share';

const meta: Meta = {
  title: 'Hooks/useWebShare',
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive web share hook for native OS sharing. Provides access to the Web Share API with fallback mechanisms for unsupported browsers.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Web Share Component for Stories
const WebShareDemo: React.FC<{ options?: WebShareOptions }> = ({ options }) => {
  const {
    state,
    error,
    share,
    canShare,
    shareUrl,
    shareText,
    shareFiles,
    isSupported,
    getShareableUrl,
    generateShareData,
    copyToClipboard,
    openMailto,
    clearError,
  } = useWebShare(options);

  const [shareResult, setShareResult] = useState<string | null>(null);
  const [customShareData, setCustomShareData] = useState<ShareData>({
    title: 'Check out this awesome component library!',
    text: 'Acrobi Design System provides comprehensive AAE capabilities including native OS sharing.',
    url: '',
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  // Set current URL on mount
  useEffect(() => {
    setCustomShareData(prev => ({
      ...prev,
      url: getShareableUrl(),
    }));
  }, [getShareableUrl]);

  const handleShare = async (shareData: ShareData) => {
    clearError();
    setShareResult(null);

    const success = await share(shareData);
    if (success) {
      setShareResult('✅ Content shared successfully!');
    } else if (error) {
      setShareResult(`❌ Share failed: ${error.message}`);
    }
  };

  const handleQuickShare = async (type: 'page' | 'selection' | 'custom') => {
    const shareData = generateShareData(
      type,
      type === 'custom' ? customShareData : undefined
    );
    await handleShare(shareData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleFileShare = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const files = Array.from(selectedFiles);
    const success = await shareFiles(files, 'Shared files from Acrobi DS');

    if (success) {
      setShareResult('✅ Files shared successfully!');
    } else if (error) {
      setShareResult(`❌ File share failed: ${error.message}`);
    }
  };

  const testFallbacks = async () => {
    const testData: ShareData = {
      title: 'Fallback Test',
      text: 'Testing fallback mechanisms',
      url: getShareableUrl(),
    };

    // Test clipboard fallback
    const clipboardSuccess = await copyToClipboard(testData);
    if (clipboardSuccess) {
      setShareResult('✅ Content copied to clipboard!');
    } else {
      // Test mailto fallback
      openMailto(testData);
      setShareResult('📧 Opened mailto as fallback');
    }
  };

  const capabilities = WebShareUtils.getCapabilities();
  const browserSupport = WebShareUtils.getBrowserSupport();
  const socialLinks = WebShareUtils.createSocialLinks(customShareData);

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>Web Share Demo</h2>

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
          ⚠️ Web Share API is not supported in this browser. Fallback mechanisms
          will be used.
        </div>
      )}

      {/* Firefox/Safari Warning */}
      {(navigator.userAgent.includes('Firefox') ||
        navigator.userAgent.includes('Safari')) &&
        !navigator.userAgent.includes('Chrome') && (
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
            <strong>Browser Note:</strong> Web Share API has limited support in
            Firefox and Safari. Best experience is on Chrome, Edge, and mobile
            browsers.
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
        <h3>Share Status</h3>
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
            <strong>Sharing:</strong>{' '}
            {state.isSharing ? '⏳ In Progress' : '✅ Ready'}
          </p>
          <p>
            <strong>Can Share Files:</strong>{' '}
            {state.canShareFiles ? '✅ Yes' : '❌ No'}
          </p>
          <p>
            <strong>Share Count:</strong> {state.shareCount}
          </p>
          <p>
            <strong>Best Method:</strong> {WebShareUtils.detectBestMethod()}
          </p>
        </div>

        {state.lastSharedData && (
          <div
            style={{
              marginTop: '10px',
              padding: '10px',
              backgroundColor: 'rgba(0,0,0,0.05)',
              borderRadius: '4px',
            }}
          >
            <strong>Last Shared:</strong>{' '}
            {state.lastSharedData.title || 'No title'}
          </div>
        )}
      </div>

      {/* Capabilities Display */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#f5f5f5',
          border: '2px solid #ddd',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h3>Platform Capabilities</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '10px',
          }}
        >
          {Object.entries(capabilities).map(([capability, supported]) => (
            <div
              key={capability}
              style={{
                padding: '8px',
                backgroundColor: supported ? '#e8f5e8' : '#ffebee',
                border: `1px solid ${supported ? '#4caf50' : '#f44336'}`,
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '14px',
              }}
            >
              <strong style={{ textTransform: 'capitalize' }}>
                {capability}:
              </strong>
              <br />
              {supported ? '✅ Yes' : '❌ No'}
            </div>
          ))}
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

      {/* Result Display */}
      {shareResult && (
        <div
          style={{
            padding: '15px',
            backgroundColor: shareResult.includes('✅') ? '#e8f5e8' : '#ffebee',
            border: `2px solid ${shareResult.includes('✅') ? '#4caf50' : '#f44336'}`,
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <h3>Share Result</h3>
          <p>{shareResult}</p>
          <button
            onClick={() => setShareResult(null)}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Clear Result
          </button>
        </div>
      )}

      {/* Quick Share Options */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Quick Share Options</h3>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={() => handleQuickShare('page')}
            disabled={state.isSharing}
            style={{
              padding: '10px 20px',
              backgroundColor: state.isSharing ? '#ccc' : '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: state.isSharing ? 'not-allowed' : 'pointer',
            }}
          >
            📄 Share Current Page
          </button>

          <button
            onClick={() => handleQuickShare('selection')}
            disabled={state.isSharing}
            style={{
              padding: '10px 20px',
              backgroundColor: state.isSharing ? '#ccc' : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: state.isSharing ? 'not-allowed' : 'pointer',
            }}
          >
            ✂️ Share Selection
          </button>

          <button
            onClick={() =>
              shareUrl(
                'https://github.com/acrobi/design-system',
                'Acrobi Design System'
              )
            }
            disabled={state.isSharing}
            style={{
              padding: '10px 20px',
              backgroundColor: state.isSharing ? '#ccc' : '#9c27b0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: state.isSharing ? 'not-allowed' : 'pointer',
            }}
          >
            🔗 Share URL
          </button>

          <button
            onClick={() =>
              shareText('Check out this amazing design system!', 'Acrobi DS')
            }
            disabled={state.isSharing}
            style={{
              padding: '10px 20px',
              backgroundColor: state.isSharing ? '#ccc' : '#ff5722',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: state.isSharing ? 'not-allowed' : 'pointer',
            }}
          >
            💬 Share Text
          </button>
        </div>
      </div>

      {/* Custom Share Data */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Custom Share Data</h3>
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            marginBottom: '15px',
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
              }}
            >
              Title:
            </label>
            <input
              type='text'
              value={customShareData.title || ''}
              onChange={e =>
                setCustomShareData(prev => ({ ...prev, title: e.target.value }))
              }
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
              placeholder='Share title'
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
              }}
            >
              Text:
            </label>
            <textarea
              value={customShareData.text || ''}
              onChange={e =>
                setCustomShareData(prev => ({ ...prev, text: e.target.value }))
              }
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                minHeight: '60px',
                resize: 'vertical',
              }}
              placeholder='Share description'
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
              }}
            >
              URL:
            </label>
            <input
              type='url'
              value={customShareData.url || ''}
              onChange={e =>
                setCustomShareData(prev => ({ ...prev, url: e.target.value }))
              }
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
              placeholder='https://example.com'
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleShare(customShareData)}
              disabled={state.isSharing || !canShare(customShareData)}
              style={{
                padding: '10px 20px',
                backgroundColor:
                  state.isSharing || !canShare(customShareData)
                    ? '#ccc'
                    : '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor:
                  state.isSharing || !canShare(customShareData)
                    ? 'not-allowed'
                    : 'pointer',
              }}
            >
              {state.isSharing ? '⏳ Sharing...' : '🚀 Share Custom Data'}
            </button>

            <button
              onClick={() => setCustomShareData(generateShareData('page'))}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🔄 Reset to Page Data
            </button>
          </div>
        </div>
      </div>

      {/* File Sharing */}
      {state.canShareFiles && (
        <div style={{ marginBottom: '20px' }}>
          <h3>File Sharing</h3>
          <div
            style={{
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              marginBottom: '15px',
            }}
          >
            <div style={{ marginBottom: '15px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                }}
              >
                Select Files:
              </label>
              <input
                type='file'
                multiple
                onChange={handleFileChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </div>

            {selectedFiles && selectedFiles.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                <strong>Selected Files:</strong>
                <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                  {Array.from(selectedFiles).map((file, index) => (
                    <li key={index} style={{ fontSize: '14px' }}>
                      {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleFileShare}
              disabled={
                !selectedFiles || selectedFiles.length === 0 || state.isSharing
              }
              style={{
                padding: '10px 20px',
                backgroundColor:
                  !selectedFiles ||
                  selectedFiles.length === 0 ||
                  state.isSharing
                    ? '#ccc'
                    : '#9c27b0',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor:
                  !selectedFiles ||
                  selectedFiles.length === 0 ||
                  state.isSharing
                    ? 'not-allowed'
                    : 'pointer',
              }}
            >
              📎 Share Files
            </button>
          </div>
        </div>
      )}

      {/* Fallback Testing */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Fallback Mechanisms</h3>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={testFallbacks}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🔄 Test Fallbacks
          </button>

          <button
            onClick={() => copyToClipboard(customShareData)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#607d8b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            📋 Copy to Clipboard
          </button>

          <button
            onClick={() => openMailto(customShareData)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#795548',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            📧 Open Mailto
          </button>
        </div>
      </div>

      {/* Social Sharing Links (Fallback) */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Social Sharing (Fallback)</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
          When Web Share API is not available, these platform-specific links
          provide sharing alternatives.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '10px',
          }}
        >
          {Object.entries(socialLinks).map(([platform, url]) => (
            <button
              key={platform}
              onClick={() => window.open(url, '_blank', 'width=600,height=400')}
              style={{
                padding: '8px 12px',
                backgroundColor: '#3f51b5',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                textTransform: 'capitalize',
              }}
            >
              {platform === 'email'
                ? '📧'
                : platform === 'whatsapp'
                  ? '💬'
                  : '🔗'}{' '}
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Templates */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Share Templates</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() =>
              setCustomShareData(WebShareUtils.getTemplates().currentPage())
            }
            style={{
              padding: '8px 16px',
              backgroundColor: '#00bcd4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            📄 Current Page
          </button>

          <button
            onClick={() =>
              setCustomShareData(
                WebShareUtils.getTemplates().article(
                  'Amazing Component Library',
                  'A comprehensive design system for modern web applications'
                )
              )
            }
            style={{
              padding: '8px 16px',
              backgroundColor: '#00bcd4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            📰 Article
          </button>

          <button
            onClick={() =>
              setCustomShareData(
                WebShareUtils.getTemplates().quote(
                  'Design is not just what it looks like and feels like. Design is how it works.',
                  'Steve Jobs'
                )
              )
            }
            style={{
              padding: '8px 16px',
              backgroundColor: '#00bcd4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            💭 Quote
          </button>

          <button
            onClick={() =>
              setCustomShareData(
                WebShareUtils.getTemplates().product(
                  'Acrobi Design System',
                  'Comprehensive AAE components',
                  'Free'
                )
              )
            }
            style={{
              padding: '8px 16px',
              backgroundColor: '#00bcd4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            🛍️ Product
          </button>
        </div>
      </div>

      {/* Browser Support Info */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Browser Support</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
            <strong>API:</strong> Web Share API (navigator.share)
          </p>
          <p>
            <strong>User Activation:</strong> Requires user gesture to activate
          </p>
          <p>
            <strong>HTTPS Required:</strong> Must be served over HTTPS in
            production
          </p>
          <p>
            <strong>File Sharing:</strong> Supported on compatible browsers with
            navigator.canShare
          </p>
          <p>
            <strong>Fallbacks:</strong> Clipboard API, mailto links, social
            platform URLs
          </p>
        </div>
      </div>
    </div>
  );
};

// Basic Web Share Story
export const BasicWebShare: Story = {
  render: () => <WebShareDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic web share functionality with native OS sharing and fallback mechanisms.',
      },
    },
  },
};

// Web Share with Custom Fallback Story
export const CustomFallbackWebShare: Story = {
  render: () => (
    <WebShareDemo
      options={{
        fallbackBehavior: 'custom',
        customFallback: async data => {
          console.log('Custom fallback triggered with:', data);
          const formatted = `${data.title}\n\n${data.text}\n\n${data.url}`;

          // Custom sharing logic - could be your own modal, API call, etc.
          const confirmed = confirm(
            `Custom Share:\n\n${formatted}\n\nProceed with custom sharing?`
          );
          if (confirmed) {
            // Simulate custom sharing (e.g., API call)
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Content shared via custom mechanism!');
            return true;
          }
          return false;
        },
        onSuccess: data => {
          console.log('Share successful:', data);
        },
        onError: error => {
          console.error('Share error:', error);
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Web share with custom fallback mechanism when native sharing is not available.',
      },
    },
  },
};

// Clipboard Fallback Web Share Story
export const ClipboardFallbackWebShare: Story = {
  render: () => (
    <WebShareDemo
      options={{
        fallbackBehavior: 'clipboard',
        onSuccess: data => {
          console.log('Share successful:', data);
          alert('Content shared successfully!');
        },
        onAbort: () => {
          console.log('Share was cancelled by user');
          alert('Share cancelled');
        },
        onError: error => {
          console.error('Share error:', error);
          alert(`Share failed: ${error.message}`);
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Web share with clipboard fallback when native sharing is not supported.',
      },
    },
  },
};

// Mailto Fallback Web Share Story
export const MailtoFallbackWebShare: Story = {
  render: () => (
    <WebShareDemo
      options={{
        fallbackBehavior: 'mailto',
        onSuccess: data => {
          console.log('Share successful:', data);
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Web share with mailto fallback for email sharing when native API is not available.',
      },
    },
  },
};

// No Fallback Web Share Story
export const NoFallbackWebShare: Story = {
  render: () => (
    <WebShareDemo
      options={{
        fallbackBehavior: 'none',
        onError: error => {
          console.error('Share error:', error);
          if (error.type === 'not_supported') {
            alert(
              'Web Share API is not supported in this browser and no fallback is configured.'
            );
          }
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Web share with no fallback mechanism - only works when native Web Share API is supported.',
      },
    },
  },
};
