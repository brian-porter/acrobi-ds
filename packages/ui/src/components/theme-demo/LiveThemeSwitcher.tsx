import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '../../providers/ThemeProvider';

interface LiveThemeSwitcherProps {
  className?: string;
  showInheritance?: boolean;
  enableDynamicAssets?: boolean;
}

const AVAILABLE_THEMES = [
  {
    name: 'acrobi-light',
    label: '☀️ Acrobi Light',
    description: 'Clean, accessible light theme',
    colors: { primary: '#1975f0', bg: '#fafafa' },
  },
  {
    name: 'acrobi-dark', 
    label: '🌙 Acrobi Dark',
    description: 'Optimized for low-light environments',
    colors: { primary: '#1975f0', bg: '#1a1a1a' },
  },
  {
    name: 'acrobi-high-contrast',
    label: '🎯 High Contrast',
    description: 'WCAG AAA compliance for accessibility',
    colors: { primary: '#0000ff', bg: '#ffffff' },
  },
  {
    name: 'acrobi-sepia',
    label: '📜 Sepia',
    description: 'Warm tones for reduced eye strain',
    colors: { primary: '#8b4513', bg: '#f7f3e8' },
  },
];

const SAMPLE_COMPONENTS = [
  { type: 'button', label: 'Primary Button' },
  { type: 'card', label: 'Content Card' },
  { type: 'input', label: 'Text Input' },
  { type: 'badge', label: 'Status Badge' },
];

export function LiveThemeSwitcher({ 
  className = '',
  showInheritance = true,
  enableDynamicAssets = true 
}: LiveThemeSwitcherProps) {
  const [selectedTheme, setSelectedTheme] = useState('acrobi-light');
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [activeAsset, setActiveAsset] = useState<string | null>(null);

  return (
    <div className={`live-theme-switcher ${className}`}>
      {/* Theme Selection */}
      <div className="theme-controls">
        <h3>🎨 Theme Selection</h3>
        <div className="theme-options">
          {AVAILABLE_THEMES.map((theme) => (
            <button
              key={theme.name}
              className={`theme-option ${selectedTheme === theme.name ? 'active' : ''}`}
              onClick={() => setSelectedTheme(theme.name)}
              style={{
                backgroundColor: theme.colors.bg,
                borderColor: theme.colors.primary,
                color: theme.name.includes('dark') ? '#ffffff' : '#000000',
              }}
            >
              <span className="theme-label">{theme.label}</span>
              <span className="theme-description">{theme.description}</span>
              <div 
                className="theme-preview" 
                style={{ backgroundColor: theme.colors.primary }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Live Demo Area */}
      <ThemeProvider theme={selectedTheme} enableScoping>
        <div className="demo-area">
          <h3>🚀 Live Demo</h3>
          
          {/* Component Samples */}
          <div className="component-showcase">
            <SampleButton />
            <SampleCard />
            <SampleInput />
            <SampleBadge />
          </div>

          {/* Dynamic Assets Demo */}
          {enableDynamicAssets && (
            <div className="assets-demo">
              <h4>🎵 Dynamic Assets</h4>
              <div className="assets-controls">
                <AudioDemo activeAsset={activeAsset} setActiveAsset={setActiveAsset} />
                <HapticDemo activeAsset={activeAsset} setActiveAsset={setActiveAsset} />
                <MotionDemo isDemoPlaying={isDemoPlaying} setIsDemoPlaying={setIsDemoPlaying} />
              </div>
            </div>
          )}

          {/* Theme Information */}
          <div className="theme-info">
            <h4>📊 Theme Details</h4>
            <ThemeInformation />
          </div>
        </div>
      </ThemeProvider>

      {/* Inheritance Visualization */}
      {showInheritance && (
        <div className="inheritance-demo">
          <h3>🔗 Theme Inheritance</h3>
          <InheritanceVisualization selectedTheme={selectedTheme} />
        </div>
      )}
    </div>
  );
}

// Sample Components
function SampleButton() {
  const { toggleDarkMode, isDark } = useTheme();
  
  return (
    <button 
      className="sample-button primary"
      onClick={toggleDarkMode}
      style={{
        backgroundColor: 'rgb(var(--color-primary))',
        color: 'rgb(var(--color-primary-foreground))',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        fontFamily: 'var(--font-sans)',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      Toggle Mode {isDark ? '☀️' : '🌙'}
    </button>
  );
}

function SampleCard() {
  return (
    <div 
      className="sample-card"
      style={{
        backgroundColor: 'rgb(var(--color-card))',
        color: 'rgb(var(--color-card-foreground))',
        border: '1px solid rgb(var(--color-border))',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-md)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <h4 style={{ margin: '0 0 var(--spacing-sm) 0', fontSize: '1.125rem' }}>
        Sample Card
      </h4>
      <p style={{ margin: '0', color: 'rgb(var(--color-muted-foreground))' }}>
        This card demonstrates theme colors and spacing tokens.
      </p>
    </div>
  );
}

function SampleInput() {
  return (
    <input
      type="text"
      placeholder="Sample input..."
      className="sample-input"
      style={{
        backgroundColor: 'rgb(var(--color-background))',
        color: 'rgb(var(--color-foreground))',
        border: '1px solid rgb(var(--color-input))',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.875rem',
        outline: 'none',
        transition: 'border-color 0.2s ease',
      }}
      onFocus={(e) => {
        e.target.style.borderColor = 'rgb(var(--color-ring))';
        e.target.style.boxShadow = '0 0 0 2px rgba(var(--color-ring), 0.2)';
      }}
      onBlur={(e) => {
        e.target.style.borderColor = 'rgb(var(--color-input))';
        e.target.style.boxShadow = 'none';
      }}
    />
  );
}

function SampleBadge() {
  return (
    <span
      className="sample-badge"
      style={{
        backgroundColor: 'rgb(var(--color-secondary))',
        color: 'rgb(var(--color-secondary-foreground))',
        borderRadius: 'var(--radius-full)',
        padding: 'calc(var(--spacing-xs) / 2) var(--spacing-sm)',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.75rem',
        fontWeight: '500',
        display: 'inline-block',
      }}
    >
      Active
    </span>
  );
}

// Dynamic Assets Demos
function AudioDemo({ activeAsset, setActiveAsset }: { 
  activeAsset: string | null; 
  setActiveAsset: (asset: string | null) => void; 
}) {
  const playAudioToken = (tokenName: string) => {
    setActiveAsset(tokenName);
    
    // Simulate audio playback
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for different interactions
    const frequencies: Record<string, number> = {
      click: 800,
      hover: 600,
      success: 1000,
      error: 400,
    };
    
    oscillator.frequency.setValueAtTime(frequencies[tokenName] || 800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
    
    setTimeout(() => setActiveAsset(null), 100);
  };

  return (
    <div className="audio-demo">
      <h5>🎵 Audio Tokens</h5>
      <div className="audio-controls">
        {['click', 'hover', 'success', 'error'].map((token) => (
          <button
            key={token}
            className={`audio-button ${activeAsset === token ? 'playing' : ''}`}
            onClick={() => playAudioToken(token)}
            style={{
              backgroundColor: activeAsset === token ? 'rgb(var(--color-primary))' : 'rgb(var(--color-secondary))',
              color: activeAsset === token ? 'rgb(var(--color-primary-foreground))' : 'rgb(var(--color-secondary-foreground))',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--spacing-xs) var(--spacing-sm)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {token}
          </button>
        ))}
      </div>
    </div>
  );
}

function HapticDemo({ activeAsset, setActiveAsset }: { 
  activeAsset: string | null; 
  setActiveAsset: (asset: string | null) => void; 
}) {
  const triggerHaptic = (intensity: string) => {
    setActiveAsset(intensity);
    
    // Trigger haptic feedback if available
    if (navigator.vibrate) {
      const durations: Record<string, number> = {
        light: 50,
        medium: 100,
        heavy: 200,
      };
      navigator.vibrate(durations[intensity] || 100);
    }
    
    setTimeout(() => setActiveAsset(null), 200);
  };

  return (
    <div className="haptic-demo">
      <h5>📳 Haptic Tokens</h5>
      <div className="haptic-controls">
        {['light', 'medium', 'heavy'].map((intensity) => (
          <button
            key={intensity}
            className={`haptic-button ${activeAsset === intensity ? 'active' : ''}`}
            onClick={() => triggerHaptic(intensity)}
            style={{
              backgroundColor: activeAsset === intensity ? 'rgb(var(--color-accent))' : 'rgb(var(--color-muted))',
              color: activeAsset === intensity ? 'rgb(var(--color-accent-foreground))' : 'rgb(var(--color-muted-foreground))',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--spacing-xs) var(--spacing-sm)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {intensity}
          </button>
        ))}
      </div>
    </div>
  );
}

function MotionDemo({ isDemoPlaying, setIsDemoPlaying }: { 
  isDemoPlaying: boolean; 
  setIsDemoPlaying: (playing: boolean) => void; 
}) {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (isDemoPlaying) {
      const interval = setInterval(() => {
        setAnimationPhase((prev) => (prev + 1) % 4);
      }, 1000);
      
      const timeout = setTimeout(() => {
        setIsDemoPlaying(false);
        setAnimationPhase(0);
      }, 4000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isDemoPlaying, setIsDemoPlaying]);

  return (
    <div className="motion-demo">
      <h5>🎬 Motion Tokens</h5>
      <button
        onClick={() => setIsDemoPlaying(!isDemoPlaying)}
        style={{
          backgroundColor: isDemoPlaying ? 'rgb(var(--color-destructive))' : 'rgb(var(--color-primary))',
          color: isDemoPlaying ? 'rgb(var(--color-destructive-foreground))' : 'rgb(var(--color-primary-foreground))',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          padding: 'var(--spacing-xs) var(--spacing-sm)',
          fontSize: '0.75rem',
          cursor: 'pointer',
        }}
      >
        {isDemoPlaying ? 'Stop' : 'Play'} Animation
      </button>
      
      <div className="motion-showcase">
        {['fadeIn', 'slideIn', 'bounce', 'scale'].map((animation, index) => (
          <div
            key={animation}
            className={`motion-sample ${isDemoPlaying && animationPhase === index ? 'animating' : ''}`}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: 'rgb(var(--color-primary))',
              borderRadius: 'var(--radius-sm)',
              margin: '4px',
              opacity: isDemoPlaying && animationPhase === index ? 1 : 0.3,
              transform: isDemoPlaying && animationPhase === index 
                ? `scale(1.2) ${animation === 'slideIn' ? 'translateX(10px)' : ''}`
                : 'scale(1)',
              transition: 'all 0.3s ease-in-out',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Theme Information Display
function ThemeInformation() {
  const { theme, themeName, isDark, isScoped, scopeId } = useTheme();
  
  return (
    <div className="theme-information">
      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">Theme:</span>
          <span className="info-value">{themeName}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Mode:</span>
          <span className="info-value">{isDark ? 'Dark' : 'Light'}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Scoped:</span>
          <span className="info-value">{isScoped ? 'Yes' : 'No'}</span>
        </div>
        {scopeId && (
          <div className="info-item">
            <span className="info-label">Scope ID:</span>
            <span className="info-value">{scopeId}</span>
          </div>
        )}
        {theme?.metadata && (
          <>
            <div className="info-item">
              <span className="info-label">Version:</span>
              <span className="info-value">{theme.metadata.version}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Author:</span>
              <span className="info-value">{theme.metadata.author}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Inheritance Visualization
function InheritanceVisualization({ selectedTheme }: { selectedTheme: string }) {
  const inheritanceChain = getInheritanceChain(selectedTheme);
  
  return (
    <div className="inheritance-visualization">
      <div className="inheritance-chain">
        {inheritanceChain.map((theme, index) => (
          <React.Fragment key={theme.name}>
            <div 
              className={`inheritance-node ${theme.name === selectedTheme ? 'active' : ''}`}
              style={{
                backgroundColor: theme.name === selectedTheme 
                  ? 'rgb(var(--color-primary))' 
                  : 'rgb(var(--color-muted))',
                color: theme.name === selectedTheme 
                  ? 'rgb(var(--color-primary-foreground))' 
                  : 'rgb(var(--color-muted-foreground))',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgb(var(--color-border))',
              }}
            >
              <div className="node-name">{theme.name}</div>
              <div className="node-details">{theme.tokens} tokens</div>
            </div>
            {index < inheritanceChain.length - 1 && (
              <div className="inheritance-arrow">→</div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="inheritance-stats">
        <div className="stat">
          <span className="stat-label">Total Tokens:</span>
          <span className="stat-value">
            {inheritanceChain.reduce((sum, theme) => sum + theme.tokens, 0)}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Inherited:</span>
          <span className="stat-value">
            {inheritanceChain.length > 1 ? inheritanceChain[0].tokens : 0}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Overrides:</span>
          <span className="stat-value">
            {inheritanceChain.length > 1 ? inheritanceChain[inheritanceChain.length - 1].tokens : 0}
          </span>
        </div>
      </div>
    </div>
  );
}

// Helper function to get inheritance chain
function getInheritanceChain(themeName: string) {
  const chains: Record<string, Array<{ name: string; tokens: number }>> = {
    'acrobi-light': [
      { name: 'acrobi-base', tokens: 150 },
      { name: 'acrobi-light', tokens: 5 },
    ],
    'acrobi-dark': [
      { name: 'acrobi-base', tokens: 150 },
      { name: 'acrobi-dark', tokens: 8 },
    ],
    'acrobi-high-contrast': [
      { name: 'acrobi-base', tokens: 150 },
      { name: 'acrobi-high-contrast', tokens: 12 },
    ],
    'acrobi-sepia': [
      { name: 'acrobi-base', tokens: 150 },
      { name: 'acrobi-sepia', tokens: 10 },
    ],
  };

  return chains[themeName] || [{ name: themeName, tokens: 155 }];
}

export default LiveThemeSwitcher;