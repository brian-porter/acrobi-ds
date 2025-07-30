/**
 * Speech Recognition Hook Stories
 * Epic 59 - AAE Speech Recognition
 *
 * Comprehensive Storybook stories demonstrating speech-to-text capabilities
 * with voice recognition controls and language support.
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  useSpeechRecognition,
  SpeechRecognitionUtils,
} from './use-speech-recognition';
import {
  SpeechRecognitionHookOptions,
  SpeechRecognitionResult,
} from './use-speech-recognition';

const meta: Meta = {
  title: 'Hooks/useSpeechRecognition',
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive speech recognition hook for voice-to-text conversion. Manages the Web Speech API with advanced controls, multi-language support, and real-time transcription capabilities.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Speech Recognition Component for Stories
const SpeechRecognitionDemo: React.FC<{
  options?: SpeechRecognitionHookOptions;
}> = ({ options }) => {
  const {
    state,
    error,
    startListening,
    stopListening,
    abortListening,
    restartListening,
    setLanguage,
    setContinuous,
    setInterimResults,
    isSupported,
    getLanguages,
    clearResults,
    clearError,
    resetSession,
    exportResults,
    getStatistics,
    testMicrophone,
  } = useSpeechRecognition(options);

  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [microphoneAccess, setMicrophoneAccess] = useState<boolean | null>(
    null
  );
  const [exportFormat, setExportFormat] = useState<'text' | 'json' | 'srt'>(
    'text'
  );
  const [showStatistics, setShowStatistics] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Test microphone access on mount
  useEffect(() => {
    testMicrophone().then(setMicrophoneAccess);
  }, [testMicrophone]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setLanguage(language);
  };

  const handleTestMicrophone = async () => {
    const hasAccess = await testMicrophone();
    setMicrophoneAccess(hasAccess);
    if (!hasAccess) {
      alert('Microphone access denied. Please check browser permissions.');
    } else {
      alert('Microphone access granted!');
    }
  };

  const handleExport = () => {
    const exported = exportResults(exportFormat);

    // Create download
    const blob = new Blob([exported], {
      type: exportFormat === 'json' ? 'application/json' : 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `speech-recognition.${exportFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const languages = getLanguages();
  const commonLanguages = SpeechRecognitionUtils.getCommonLanguages();
  const browserSupport = SpeechRecognitionUtils.getBrowserSupport();
  const usageTips = SpeechRecognitionUtils.getUsageTips();
  const privacyGuidelines = SpeechRecognitionUtils.getPrivacyGuidelines();
  const statistics = getStatistics();

  const processedTranscript = SpeechRecognitionUtils.processTranscript(
    state.finalResult
  );
  const wordCount = SpeechRecognitionUtils.getWordCount(state.finalResult);
  const formattedDuration = SpeechRecognitionUtils.formatDuration(
    state.duration
  );

  return (
    <div style={{ padding: '20px', maxWidth: '900px' }}>
      <h2>Speech Recognition Demo</h2>

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
          ⚠️ Speech Recognition API is not supported in this browser.
        </div>
      )}

      {/* Microphone Access Status */}
      <div
        style={{
          padding: '15px',
          backgroundColor:
            microphoneAccess === null
              ? '#fff3e0'
              : microphoneAccess
                ? '#e8f5e8'
                : '#ffebee',
          border: `2px solid ${microphoneAccess === null ? '#ff9800' : microphoneAccess ? '#4caf50' : '#f44336'}`,
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h3>Microphone Access</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <p>
            <strong>Status:</strong>{' '}
            {microphoneAccess === null
              ? '⏳ Testing...'
              : microphoneAccess
                ? '✅ Granted'
                : '❌ Denied'}
          </p>
          <button
            onClick={handleTestMicrophone}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🎤 Test Microphone
          </button>
        </div>
      </div>

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
        <h3>Recognition Status</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
          }}
        >
          <p>
            <strong>Supported:</strong> {isSupported ? '✅ Yes' : '❌ No'}
          </p>
          <p>
            <strong>Listening:</strong> {state.isListening ? '🎤 Yes' : '🔇 No'}
          </p>
          <p>
            <strong>Starting:</strong> {state.isStarting ? '⏳ Yes' : '✅ No'}
          </p>
          <p>
            <strong>Language:</strong>{' '}
            {commonLanguages[state.language] || state.language}
          </p>
          <p>
            <strong>Sessions:</strong> {state.sessionCount}
          </p>
          <p>
            <strong>Words:</strong> {state.wordCount}
          </p>
          <p>
            <strong>Duration:</strong> {formattedDuration}
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

      {/* Language Selection */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Language Settings</h3>
        <div
          style={{
            display: 'flex',
            gap: '15px',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
              }}
            >
              Recognition Language:
            </label>
            <select
              value={selectedLanguage}
              onChange={e => handleLanguageChange(e.target.value)}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                minWidth: '200px',
              }}
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {commonLanguages[lang as keyof typeof commonLanguages] ||
                    lang}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#9c27b0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ⚙️ {showSettings ? 'Hide' : 'Show'} Settings
          </button>
        </div>

        {showSettings && (
          <div
            style={{
              padding: '15px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px',
              marginBottom: '15px',
            }}
          >
            <h4>Advanced Settings</h4>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type='checkbox'
                  defaultChecked={options?.continuous || false}
                  onChange={e => setContinuous(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Continuous Recognition
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type='checkbox'
                  defaultChecked={options?.interimResults !== false}
                  onChange={e => setInterimResults(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Show Interim Results
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Controls</h3>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={() => startListening({ lang: selectedLanguage })}
            disabled={
              !isSupported || state.isListening || microphoneAccess === false
            }
            style={{
              padding: '10px 20px',
              backgroundColor:
                !isSupported || state.isListening || microphoneAccess === false
                  ? '#ccc'
                  : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !isSupported || state.isListening || microphoneAccess === false
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            🎤 Start Listening
          </button>

          <button
            onClick={stopListening}
            disabled={!state.isListening}
            style={{
              padding: '10px 20px',
              backgroundColor: !state.isListening ? '#ccc' : '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !state.isListening ? 'not-allowed' : 'pointer',
            }}
          >
            ⏸️ Stop
          </button>

          <button
            onClick={abortListening}
            disabled={!state.isListening && !state.isStarting}
            style={{
              padding: '10px 20px',
              backgroundColor:
                !state.isListening && !state.isStarting ? '#ccc' : '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !state.isListening && !state.isStarting
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            ⏹️ Abort
          </button>

          <button
            onClick={restartListening}
            disabled={!isSupported || microphoneAccess === false}
            style={{
              padding: '10px 20px',
              backgroundColor:
                !isSupported || microphoneAccess === false ? '#ccc' : '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !isSupported || microphoneAccess === false
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            🔄 Restart
          </button>
        </div>
      </div>

      {/* Results Display */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Recognition Results</h3>

        {/* Interim Results */}
        {state.interimResult && (
          <div style={{ marginBottom: '15px' }}>
            <h4>Interim (Live):</h4>
            <div
              style={{
                padding: '15px',
                backgroundColor: '#fff3e0',
                border: '2px solid #ff9800',
                borderRadius: '8px',
                fontStyle: 'italic',
                color: '#e65100',
              }}
            >
              {state.interimResult || 'Listening...'}
            </div>
          </div>
        )}

        {/* Final Results */}
        <div style={{ marginBottom: '15px' }}>
          <h4>Final Transcript:</h4>
          <textarea
            value={processedTranscript}
            readOnly
            style={{
              width: '100%',
              minHeight: '150px',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              backgroundColor: '#f9f9f9',
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              lineHeight: '1.5',
              resize: 'vertical',
            }}
            placeholder='Your speech will appear here as you speak...'
          />
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={clearResults}
            disabled={!state.finalResult}
            style={{
              padding: '8px 16px',
              backgroundColor: !state.finalResult ? '#ccc' : '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !state.finalResult ? 'not-allowed' : 'pointer',
            }}
          >
            🗑️ Clear Results
          </button>

          <button
            onClick={resetSession}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🔄 Reset Session
          </button>

          <button
            onClick={() => setShowStatistics(!showStatistics)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#607d8b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            📊 {showStatistics ? 'Hide' : 'Show'} Statistics
          </button>
        </div>
      </div>

      {/* Statistics */}
      {showStatistics && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Session Statistics</h3>
          <div
            style={{
              padding: '15px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px',
              }}
            >
              <p>
                <strong>Total Sessions:</strong> {statistics.totalSessions}
              </p>
              <p>
                <strong>Total Words:</strong> {statistics.totalWords}
              </p>
              <p>
                <strong>Average Confidence:</strong>{' '}
                {(statistics.averageConfidence * 100).toFixed(1)}%
              </p>
              <p>
                <strong>Words Per Minute:</strong>{' '}
                {statistics.wordsPerMinute.toFixed(1)}
              </p>
              <p>
                <strong>Success Rate:</strong>{' '}
                {statistics.successRate.toFixed(1)}%
              </p>
              <p>
                <strong>Total Duration:</strong>{' '}
                {SpeechRecognitionUtils.formatDuration(
                  statistics.totalDuration
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Export Options */}
      {state.finalResult && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Export Results</h3>
          <div
            style={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center',
              marginBottom: '15px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                }}
              >
                Export Format:
              </label>
              <select
                value={exportFormat}
                onChange={e =>
                  setExportFormat(e.target.value as 'text' | 'json' | 'srt')
                }
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
              >
                <option value='text'>Plain Text</option>
                <option value='json'>JSON with Metadata</option>
                <option value='srt'>SRT Subtitle Format</option>
              </select>
            </div>

            <button
              onClick={handleExport}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '20px',
              }}
            >
              💾 Export
            </button>
          </div>
        </div>
      )}

      {/* Recent Results */}
      {state.allResults.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Recent Recognition Results</h3>
          <div
            style={{
              maxHeight: '200px',
              overflowY: 'auto',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f9f9f9',
            }}
          >
            {state.allResults
              .slice(-10)
              .reverse()
              .map((result, index) => (
                <div
                  key={index}
                  style={{
                    padding: '10px',
                    borderBottom:
                      index < Math.min(state.allResults.length, 10) - 1
                        ? '1px solid #eee'
                        : 'none',
                    backgroundColor: result.isFinal ? '#e8f5e8' : '#fff3e0',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{ fontWeight: result.isFinal ? 'bold' : 'normal' }}
                    >
                      {result.transcript}
                    </span>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#666',
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      <span>{result.isFinal ? '✅ Final' : '⏳ Interim'}</span>
                      <span>
                        {SpeechRecognitionUtils.getConfidenceLevel(
                          result.confidence
                        )}
                      </span>
                      <span>{(result.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Usage Tips */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Usage Tips</h3>
        <div
          style={{
            fontSize: '14px',
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {usageTips.map((tip, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Privacy Guidelines */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Privacy Guidelines</h3>
        <div
          style={{
            fontSize: '14px',
            backgroundColor: '#fff3e0',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {privacyGuidelines.map((guideline, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>
                {guideline}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Browser Support */}
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
            <strong>API:</strong> Web Speech API (SpeechRecognition)
          </p>
          <p>
            <strong>Languages:</strong> {languages.length}+ supported languages
          </p>
          <p>
            <strong>Recognition:</strong> Real-time with interim and final
            results
          </p>
          <p>
            <strong>Accuracy:</strong> Varies by accent, noise, and language
          </p>
          <p>
            <strong>Processing:</strong> Browser-dependent (local or cloud)
          </p>
          <p>
            <strong>Microphone:</strong> Requires getUserMedia permission
          </p>
        </div>
      </div>
    </div>
  );
};

// Basic Speech Recognition Story
export const BasicSpeechRecognition: Story = {
  render: () => <SpeechRecognitionDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic speech recognition functionality with language selection, real-time transcription, and result management.',
      },
    },
  },
};

// Continuous Recognition Story
export const ContinuousSpeechRecognition: Story = {
  render: () => (
    <SpeechRecognitionDemo
      options={{
        continuous: true,
        interimResults: true,
        onStart: () => console.log('Continuous recognition started'),
        onEnd: () => console.log('Continuous recognition ended'),
        onResult: result => console.log('Recognition result:', result),
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Continuous speech recognition with real-time interim results and extended listening sessions.',
      },
    },
  },
};

// Multi-Language Recognition Story
export const MultiLanguageSpeechRecognition: Story = {
  render: () => {
    const MultiLanguageDemo: React.FC = () => {
      const speechRecognition = useSpeechRecognition({
        defaultLanguage: 'en-US',
        interimResults: true,
        onResult: result => {
          console.log(
            `${result.isFinal ? 'Final' : 'Interim'} result:`,
            result.transcript
          );
        },
      });

      const [quickLanguage, setQuickLanguage] = useState('en-US');
      const [languageText, setLanguageText] = useState('');

      const quickLanguages = [
        { code: 'en-US', name: 'English (US)', sample: 'Hello, how are you?' },
        { code: 'es-ES', name: 'Spanish', sample: 'Hola, ¿cómo estás?' },
        {
          code: 'fr-FR',
          name: 'French',
          sample: 'Bonjour, comment allez-vous?',
        },
        { code: 'de-DE', name: 'German', sample: 'Hallo, wie geht es dir?' },
        { code: 'it-IT', name: 'Italian', sample: 'Ciao, come stai?' },
        { code: 'pt-BR', name: 'Portuguese', sample: 'Olá, como você está?' },
      ];

      const handleQuickStart = (languageCode: string) => {
        speechRecognition.setLanguage(languageCode);
        speechRecognition.startListening({ lang: languageCode });
        setQuickLanguage(languageCode);
      };

      return (
        <div style={{ padding: '20px' }}>
          <h3>Multi-Language Speech Recognition</h3>

          <div style={{ marginBottom: '20px' }}>
            <h4>Quick Language Selection:</h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '10px',
              }}
            >
              {quickLanguages.map(lang => (
                <div
                  key={lang.code}
                  style={{
                    padding: '15px',
                    border:
                      quickLanguage === lang.code
                        ? '2px solid #2196f3'
                        : '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor:
                      quickLanguage === lang.code ? '#e3f2fd' : '#f9f9f9',
                    cursor: 'pointer',
                  }}
                  onClick={() => setQuickLanguage(lang.code)}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {lang.name}
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '10px',
                    }}
                  >
                    "{lang.sample}"
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleQuickStart(lang.code);
                    }}
                    disabled={speechRecognition.state.isListening}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: speechRecognition.state.isListening
                        ? '#ccc'
                        : '#4caf50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: speechRecognition.state.isListening
                        ? 'not-allowed'
                        : 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    🎤 Start in {lang.name}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <SpeechRecognitionDemo
            options={{
              defaultLanguage: quickLanguage,
              interimResults: true,
              onResult: result => {
                if (result.isFinal) {
                  setLanguageText(prev => prev + ' ' + result.transcript);
                }
              },
            }}
          />

          {languageText && (
            <div style={{ marginTop: '20px' }}>
              <h4>Multi-Language Text Collection:</h4>
              <div
                style={{
                  padding: '15px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  fontFamily: 'Georgia, serif',
                  fontSize: '16px',
                  lineHeight: '1.6',
                }}
              >
                {languageText}
              </div>
              <button
                onClick={() => setLanguageText('')}
                style={{
                  marginTop: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#ff9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Clear Text
              </button>
            </div>
          )}
        </div>
      );
    };

    return <MultiLanguageDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multi-language speech recognition with quick language switching and sample phrases for testing different languages.',
      },
    },
  },
};

// Advanced Features Story
export const AdvancedSpeechRecognition: Story = {
  render: () => {
    const AdvancedDemo: React.FC = () => {
      const speechRecognition = useSpeechRecognition({
        continuous: true,
        interimResults: true,
        timeout: 30000, // 30 seconds
        onStart: () => console.log('🎤 Speech recognition started'),
        onEnd: () => console.log('🏁 Speech recognition ended'),
        onResult: result => console.log('📝 Result:', result),
        onSpeechStart: () => console.log('🗣️ Speech detected'),
        onSpeechEnd: () => console.log('🤫 Speech ended'),
        onNoSpeech: () => console.log('🔇 No speech detected'),
      });

      const [commands, setCommands] = useState<string[]>([]);
      const [isCommandMode, setIsCommandMode] = useState(false);

      // Voice command processing
      const processVoiceCommand = (transcript: string) => {
        const lowerTranscript = transcript.toLowerCase();

        if (lowerTranscript.includes('clear text')) {
          speechRecognition.clearResults();
          setCommands(prev => [...prev, '🗑️ Cleared text']);
        } else if (lowerTranscript.includes('stop listening')) {
          speechRecognition.stopListening();
          setCommands(prev => [...prev, '⏹️ Stopped listening']);
        } else if (lowerTranscript.includes('start listening')) {
          speechRecognition.startListening();
          setCommands(prev => [...prev, '🎤 Started listening']);
        } else if (lowerTranscript.includes('export results')) {
          const exported = speechRecognition.exportResults('json');
          console.log('Exported:', exported);
          setCommands(prev => [...prev, '💾 Exported results']);
        } else if (lowerTranscript.includes('show statistics')) {
          const stats = speechRecognition.getStatistics();
          console.log('Statistics:', stats);
          setCommands(prev => [...prev, '📊 Showed statistics']);
        }
      };

      // Enhanced recognition with command processing
      const enhancedRecognition = useSpeechRecognition({
        continuous: true,
        interimResults: true,
        onResult: result => {
          if (result.isFinal && isCommandMode) {
            processVoiceCommand(result.transcript);
          }
        },
      });

      return (
        <div style={{ padding: '20px' }}>
          <h3>Advanced Speech Recognition Features</h3>

          <div style={{ marginBottom: '20px' }}>
            <h4>Voice Command Mode</h4>
            <div style={{ marginBottom: '15px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type='checkbox'
                  checked={isCommandMode}
                  onChange={e => setIsCommandMode(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Enable Voice Commands
              </label>
            </div>

            {isCommandMode && (
              <div
                style={{
                  padding: '15px',
                  backgroundColor: '#e3f2fd',
                  border: '1px solid #2196f3',
                  borderRadius: '8px',
                  marginBottom: '15px',
                }}
              >
                <h5>Available Voice Commands:</h5>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  <li>"Clear text" - Clear all recognition results</li>
                  <li>"Stop listening" - Stop speech recognition</li>
                  <li>"Start listening" - Start speech recognition</li>
                  <li>"Export results" - Export current results</li>
                  <li>"Show statistics" - Display session statistics</li>
                </ul>
              </div>
            )}

            {commands.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                <h5>Command History:</h5>
                <div
                  style={{
                    padding: '10px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    maxHeight: '100px',
                    overflowY: 'auto',
                  }}
                >
                  {commands.map((command, index) => (
                    <div
                      key={index}
                      style={{ fontSize: '14px', marginBottom: '2px' }}
                    >
                      {command}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setCommands([])}
                  style={{
                    marginTop: '5px',
                    padding: '4px 8px',
                    backgroundColor: '#ff9800',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  Clear Command History
                </button>
              </div>
            )}
          </div>

          <SpeechRecognitionDemo
            options={{
              continuous: true,
              interimResults: true,
              timeout: 30000,
              onSpeechStart: () => console.log('🗣️ Speech started'),
              onSpeechEnd: () => console.log('🤫 Speech ended'),
              onSoundStart: () => console.log('🔊 Sound detected'),
              onSoundEnd: () => console.log('🔇 Sound ended'),
            }}
          />
        </div>
      );
    };

    return <AdvancedDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Advanced speech recognition features including voice commands, event callbacks, timeout handling, and enhanced processing.',
      },
    },
  },
};

// Error Handling Story
export const ErrorHandlingSpeechRecognition: Story = {
  render: () => (
    <SpeechRecognitionDemo
      options={{
        onError: error => {
          console.error('Speech Recognition Error:', error);

          switch (error.type) {
            case 'not_supported':
              alert('Speech recognition is not supported in this browser');
              break;
            case 'permission_denied':
              alert(
                'Microphone permission denied. Please check browser settings.'
              );
              break;
            case 'network':
              alert(
                'Network error during speech recognition. Check your connection.'
              );
              break;
            case 'no_speech':
              alert(
                'No speech was detected. Please try speaking closer to the microphone.'
              );
              break;
            case 'aborted':
              alert('Speech recognition was aborted. Try again.');
              break;
            case 'audio_capture':
              alert('Audio capture failed. Check microphone settings.');
              break;
            case 'service_not_allowed':
              alert('Speech recognition service not allowed.');
              break;
            case 'bad_grammar':
              alert('Grammar not recognized. Please try again.');
              break;
            case 'language_not_supported':
              alert(
                'Selected language is not supported for speech recognition.'
              );
              break;
            default:
              alert(`Speech recognition error: ${error.message}`);
          }
        },
        onStart: () => {
          console.log('✅ Speech recognition started successfully');
        },
        onEnd: () => {
          console.log('🏁 Speech recognition ended');
        },
        onNoSpeech: () => {
          console.log('🔇 No speech detected in the current session');
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Speech recognition with comprehensive error handling for all possible error scenarios and user feedback.',
      },
    },
  },
};
