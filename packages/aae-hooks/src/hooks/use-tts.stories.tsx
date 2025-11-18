/**
 * Text-to-Speech Hook Stories
 * Epic 58 - AAE Text-to-Speech (TTS)
 *
 * Comprehensive Storybook stories demonstrating text-to-speech capabilities
 * with voice synthesis controls and cross-browser compatibility.
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useTTS, TTSUtils } from './use-tts';
import { TTSHookOptions, TTSVoice, TTSOptions } from './use-tts';

const meta: Meta = {
  title: 'Hooks/useTTS',
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive text-to-speech hook for voice synthesis. Manages the Web Speech API with advanced voice controls, multi-language support, and cross-browser compatibility.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// TTS Component for Stories
const TTSDemo: React.FC<{ options?: TTSHookOptions }> = ({ options }) => {
  const {
    state,
    error,
    speak,
    stop,
    pause,
    resume,
    getVoices,
    getVoicesByLanguage,
    findVoice,
    setDefaultVoice,
    isSupported,
    getLanguages,
    testVoice,
    speakSentences,
    speakWithHighlight,
    estimateDuration,
    normalizeText,
    clearError,
  } = useTTS(options);

  const [textToSpeak, setTextToSpeak] = useState(
    'Hello! This is a demonstration of the text-to-speech functionality. You can adjust the voice, rate, pitch, and volume to customize the speech output.'
  );
  const [selectedVoice, setSelectedVoice] = useState<TTSVoice | null>(null);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [speechVolume, setSpeechVolume] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [highlightedWord, setHighlightedWord] = useState<{
    word: string;
    index: number;
  } | null>(null);
  const [chunks, setChunks] = useState<string[]>([]);
  const [currentChunk, setCurrentChunk] = useState(-1);

  // Load voices and set default
  useEffect(() => {
    if (isSupported) {
      getVoices().then(voices => {
        if (voices.length > 0 && !selectedVoice) {
          const defaultVoice = voices.find(v => v.default) || voices[0];
          setSelectedVoice(defaultVoice);
        }
      });
    }
  }, [isSupported, getVoices, selectedVoice]);

  // Calculate text chunks for demonstration
  useEffect(() => {
    if (textToSpeak) {
      const textChunks = TTSUtils.chunkText(textToSpeak, 100);
      setChunks(textChunks);
    }
  }, [textToSpeak]);

  const handleSpeak = async () => {
    if (!selectedVoice) return;

    const success = await speak({
      text: textToSpeak,
      voice: selectedVoice,
      rate: speechRate,
      pitch: speechPitch,
      volume: speechVolume,
    });

    if (success) {
      console.log('Speech started successfully');
    }
  };

  const handleSpeakWithHighlight = async () => {
    setHighlightedWord(null);

    await speakWithHighlight(textToSpeak, (word, index) => {
      setHighlightedWord({ word, index });
      setTimeout(() => setHighlightedWord(null), 500);
    });
  };

  const handleSpeakSentences = async () => {
    setCurrentChunk(-1);

    for (let i = 0; i < chunks.length; i++) {
      setCurrentChunk(i);

      const success = await speak({
        text: chunks[i],
        voice: selectedVoice,
        rate: speechRate,
        pitch: speechPitch,
        volume: speechVolume,
      });

      if (!success) break;

      // Wait for speech to complete
      while (state.isSpeaking) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    setCurrentChunk(-1);
  };

  const handleTestVoice = async (voice: TTSVoice) => {
    await testVoice(voice, 'This is how this voice sounds.');
  };

  const filteredVoices = selectedLanguage
    ? getVoicesByLanguage(selectedLanguage)
    : state.voices;

  const languages = getLanguages();
  const commonLanguages = TTSUtils.getCommonLanguages();
  const browserSupport = TTSUtils.getBrowserSupport();
  const speakingTips = TTSUtils.getSpeakingTips();

  const estimatedDuration = estimateDuration(textToSpeak, speechRate);
  const normalizedText = normalizeText(textToSpeak);

  return (
    <div style={{ padding: '20px', maxWidth: '900px' }}>
      <h2>Text-to-Speech Demo</h2>

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
          ⚠️ Speech Synthesis API is not supported in this browser.
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
        <h3>TTS Status</h3>
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
            <strong>Speaking:</strong> {state.isSpeaking ? '🔊 Yes' : '🔇 No'}
          </p>
          <p>
            <strong>Paused:</strong> {state.isPaused ? '⏸️ Yes' : '▶️ No'}
          </p>
          <p>
            <strong>Pending:</strong> {state.isPending ? '⏳ Yes' : '✅ No'}
          </p>
          <p>
            <strong>Available Voices:</strong> {state.voices.length}
          </p>
          <p>
            <strong>Speech Count:</strong> {state.speechCount}
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

      {/* Text Input */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Text to Speak</h3>
        <textarea
          value={textToSpeak}
          onChange={e => setTextToSpeak(e.target.value)}
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontFamily: 'monospace',
            fontSize: '14px',
            resize: 'vertical',
          }}
          placeholder='Enter text to speak...'
        />

        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          <p>
            <strong>Estimated Duration:</strong>{' '}
            {(estimatedDuration / 1000).toFixed(1)} seconds
          </p>
          <p>
            <strong>Word Count:</strong>{' '}
            {textToSpeak.trim().split(/\s+/).length}
          </p>
          <p>
            <strong>Character Count:</strong> {textToSpeak.length}
          </p>
        </div>

        {normalizedText !== textToSpeak && (
          <details style={{ marginTop: '10px' }}>
            <summary style={{ cursor: 'pointer', color: '#666' }}>
              Normalized Text
            </summary>
            <div
              style={{
                marginTop: '5px',
                padding: '10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              {normalizedText}
            </div>
          </details>
        )}
      </div>

      {/* Voice Selection */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Voice Selection</h3>
        <div
          style={{
            display: 'flex',
            gap: '15px',
            marginBottom: '15px',
            flexWrap: 'wrap',
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
              Filter by Language:
            </label>
            <select
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value)}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            >
              <option value=''>All Languages</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {commonLanguages[lang as keyof typeof commonLanguages] ||
                    lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          style={{
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
          }}
        >
          {filteredVoices.length > 0 ? (
            filteredVoices.map((voice, index) => (
              <div
                key={voice.voiceURI}
                style={{
                  padding: '10px',
                  borderBottom:
                    index < filteredVoices.length - 1
                      ? '1px solid #eee'
                      : 'none',
                  backgroundColor:
                    selectedVoice?.voiceURI === voice.voiceURI
                      ? '#e3f2fd'
                      : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onClick={() => setSelectedVoice(voice)}
              >
                <div>
                  <div style={{ fontWeight: 'bold' }}>
                    {voice.name}
                    {voice.default && (
                      <span style={{ color: '#4caf50' }}> (Default)</span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {voice.lang} • {voice.localService ? 'Local' : 'Remote'} •
                    Quality: {TTSUtils.getVoiceQuality(voice)}/10
                  </div>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleTestVoice(voice);
                  }}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#2196f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  Test
                </button>
              </div>
            ))
          ) : (
            <div
              style={{ padding: '20px', textAlign: 'center', color: '#666' }}
            >
              No voices available for the selected language
            </div>
          )}
        </div>
      </div>

      {/* Speech Controls */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Speech Controls</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
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
              Rate: {speechRate} ({TTSUtils.formatRate(speechRate)})
            </label>
            <input
              type='range'
              min='0.1'
              max='3'
              step='0.1'
              value={speechRate}
              onChange={e => setSpeechRate(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
              }}
            >
              Pitch: {speechPitch} ({TTSUtils.formatPitch(speechPitch)})
            </label>
            <input
              type='range'
              min='0'
              max='2'
              step='0.1'
              value={speechPitch}
              onChange={e => setSpeechPitch(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
              }}
            >
              Volume: {speechVolume}
            </label>
            <input
              type='range'
              min='0'
              max='1'
              step='0.1'
              value={speechVolume}
              onChange={e => setSpeechVolume(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Actions</h3>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={handleSpeak}
            disabled={!isSupported || !selectedVoice || state.isSpeaking}
            style={{
              padding: '10px 20px',
              backgroundColor:
                !isSupported || !selectedVoice || state.isSpeaking
                  ? '#ccc'
                  : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !isSupported || !selectedVoice || state.isSpeaking
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            🔊 Speak
          </button>

          <button
            onClick={pause}
            disabled={!state.isSpeaking || state.isPaused}
            style={{
              padding: '10px 20px',
              backgroundColor:
                !state.isSpeaking || state.isPaused ? '#ccc' : '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !state.isSpeaking || state.isPaused ? 'not-allowed' : 'pointer',
            }}
          >
            ⏸️ Pause
          </button>

          <button
            onClick={resume}
            disabled={!state.isPaused}
            style={{
              padding: '10px 20px',
              backgroundColor: !state.isPaused ? '#ccc' : '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !state.isPaused ? 'not-allowed' : 'pointer',
            }}
          >
            ▶️ Resume
          </button>

          <button
            onClick={stop}
            disabled={!state.isSpeaking && !state.isPending}
            style={{
              padding: '10px 20px',
              backgroundColor:
                !state.isSpeaking && !state.isPending ? '#ccc' : '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !state.isSpeaking && !state.isPending
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            ⏹️ Stop
          </button>
        </div>
      </div>

      {/* Advanced Features */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Advanced Features</h3>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '15px',
          }}
        >
          <button
            onClick={handleSpeakWithHighlight}
            disabled={!isSupported || !selectedVoice || state.isSpeaking}
            style={{
              padding: '10px 20px',
              backgroundColor:
                !isSupported || !selectedVoice || state.isSpeaking
                  ? '#ccc'
                  : '#9c27b0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !isSupported || !selectedVoice || state.isSpeaking
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            ✨ Speak with Highlight
          </button>

          <button
            onClick={handleSpeakSentences}
            disabled={!isSupported || !selectedVoice || state.isSpeaking}
            style={{
              padding: '10px 20px',
              backgroundColor:
                !isSupported || !selectedVoice || state.isSpeaking
                  ? '#ccc'
                  : '#607d8b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor:
                !isSupported || !selectedVoice || state.isSpeaking
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            📝 Speak by Chunks
          </button>
        </div>

        {highlightedWord && (
          <div
            style={{
              padding: '10px',
              backgroundColor: '#fff3e0',
              border: '2px solid #ff9800',
              borderRadius: '8px',
              marginBottom: '15px',
            }}
          >
            <strong>Highlighted Word:</strong> "{highlightedWord.word}" (Index:{' '}
            {highlightedWord.index})
          </div>
        )}

        {chunks.length > 1 && (
          <div style={{ marginBottom: '15px' }}>
            <h4>Text Chunks:</h4>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
            >
              {chunks.map((chunk, index) => (
                <div
                  key={index}
                  style={{
                    padding: '8px',
                    backgroundColor:
                      currentChunk === index ? '#e3f2fd' : '#f5f5f5',
                    border:
                      currentChunk === index
                        ? '2px solid #2196f3'
                        : '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  <strong>Chunk {index + 1}:</strong> {chunk}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Current Voice Info */}
      {selectedVoice && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Selected Voice Information</h3>
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
                <strong>Name:</strong> {selectedVoice.name}
              </p>
              <p>
                <strong>Language:</strong> {selectedVoice.lang}
              </p>
              <p>
                <strong>Type:</strong>{' '}
                {selectedVoice.localService ? 'Local' : 'Remote'}
              </p>
              <p>
                <strong>Default:</strong> {selectedVoice.default ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Quality Score:</strong>{' '}
                {TTSUtils.getVoiceQuality(selectedVoice)}/10
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Speaking Tips */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Speaking Tips</h3>
        <div
          style={{
            fontSize: '14px',
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {speakingTips.map((tip, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>
                {tip}
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
            <strong>API:</strong> Web Speech API (SpeechSynthesis)
          </p>
          <p>
            <strong>Voices:</strong> Platform-dependent, includes local and
            remote voices
          </p>
          <p>
            <strong>Rate Range:</strong> 0.1 to 10 (words per minute multiplier)
          </p>
          <p>
            <strong>Pitch Range:</strong> 0 to 2 (frequency multiplier)
          </p>
          <p>
            <strong>Volume Range:</strong> 0 to 1 (amplitude)
          </p>
          <p>
            <strong>Text Limits:</strong> Varies by platform, typically 32KB
            maximum
          </p>
        </div>
      </div>
    </div>
  );
};

// Basic TTS Story
export const BasicTTS: Story = {
  render: () => <TTSDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Basic text-to-speech functionality with voice selection, speech controls, and comprehensive configuration options.',
      },
    },
  },
};

// Multi-Language TTS Story
export const MultiLanguageTTS: Story = {
  render: () => (
    <TTSDemo
      options={{
        defaultVoice: 'en-US',
        onStart: () => console.log('Speech started'),
        onEnd: () => console.log('Speech ended'),
        onError: error => console.error('TTS Error:', error),
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Text-to-speech with multi-language support and voice filtering capabilities.',
      },
    },
  },
};

// Advanced TTS Features Story
export const AdvancedTTSFeatures: Story = {
  render: () => {
    const AdvancedTTSDemo: React.FC = () => {
      const tts = useTTS({
        autoLoadVoices: true,
        onBoundary: event => {
          console.log('Boundary event:', event.name, event.charIndex);
        },
      });

      const [selectedText, setSelectedText] = useState('');
      const [ssmlText, setSSMLText] = useState(
        '<prosody rate="slow">This is slow speech.</prosody> <break time="500ms"/> <emphasis level="strong">This is emphasized.</emphasis>'
      );

      const handleSSMLSpeak = async () => {
        const parsedText = TTSUtils.parseSSML(ssmlText);
        await tts.speak(parsedText);
      };

      const handleReadSelection = async () => {
        const selection = window.getSelection()?.toString();
        if (selection) {
          setSelectedText(selection);
          await tts.speak(selection);
        } else {
          alert('Please select some text on the page first');
        }
      };

      return (
        <div style={{ padding: '20px' }}>
          <h3>Advanced TTS Features</h3>

          <div style={{ marginBottom: '20px' }}>
            <h4>SSML-like Text Processing</h4>
            <textarea
              value={ssmlText}
              onChange={e => setSSMLText(e.target.value)}
              style={{
                width: '100%',
                minHeight: '80px',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontFamily: 'monospace',
                fontSize: '14px',
              }}
            />
            <button
              onClick={handleSSMLSpeak}
              disabled={!tts.isSupported}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#9c27b0',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Speak SSML Text
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4>Read Selected Text</h4>
            <button
              onClick={handleReadSelection}
              disabled={!tts.isSupported}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📖 Read Selected Text
            </button>
            {selectedText && (
              <div
                style={{
                  marginTop: '10px',
                  padding: '10px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
                <strong>Last Selected:</strong> {selectedText}
              </div>
            )}
          </div>

          <TTSDemo />
        </div>
      );
    };

    return <AdvancedTTSDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Advanced TTS features including SSML parsing, text selection reading, and boundary event handling.',
      },
    },
  },
};

// Custom Voice TTS Story
export const CustomVoiceTTS: Story = {
  render: () => (
    <TTSDemo
      options={{
        defaultVoice: 'Microsoft David Desktop - English (United States)',
        defaultRate: 0.8,
        defaultPitch: 1.2,
        defaultVolume: 0.9,
        onStart: () => {
          console.log('Custom voice speech started');
        },
        onEnd: () => {
          console.log('Custom voice speech ended');
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'TTS with custom voice selection and pre-configured speech parameters.',
      },
    },
  },
};

// Error Handling TTS Story
export const ErrorHandlingTTS: Story = {
  render: () => (
    <TTSDemo
      options={{
        onError: error => {
          console.error('TTS Error:', error);

          switch (error.type) {
            case 'not_supported':
              alert('Text-to-speech is not supported in this browser');
              break;
            case 'network':
              alert('Network error occurred during speech synthesis');
              break;
            case 'not_allowed':
              alert('Speech synthesis permission denied');
              break;
            case 'interrupted':
              alert('Speech was interrupted');
              break;
            case 'synthesis_failed':
              alert('Speech synthesis failed');
              break;
            default:
              alert(`TTS error: ${error.message}`);
          }
        },
        onStart: () => {
          console.log('✅ Speech synthesis started successfully');
        },
        onEnd: () => {
          console.log('🏁 Speech synthesis completed');
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'TTS with comprehensive error handling for all possible error scenarios and user feedback.',
      },
    },
  },
};
