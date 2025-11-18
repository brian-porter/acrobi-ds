/**
 * @acrobi/aae-hooks
 * Advanced Acrobi Experience (AAE) hooks for modern web platform APIs
 * 50+ React hooks for camera, GPS, Bluetooth, NFC, and more
 */

// Export all hooks
export * from './hooks';

// Acrobi Framework Extension Integration
export interface ExtensionContext {
  extensionId: string;
  config: Record<string, any>;
  storage: Map<string, any>;
  logger: {
    info: (message: string, meta?: any) => void;
    debug: (message: string, meta?: any) => void;
    warn: (message: string, meta?: any) => void;
    error: (message: string, error?: any) => void;
  };
  hooks: {
    addAction: (name: string, handler: Function, priority?: number) => void;
    addFilter: (name: string, handler: Function, priority?: number) => void;
    doAction: (name: string, ...args: any[]) => Promise<void>;
  };
  shells?: {
    get: (name: string) => any;
  };
}

/**
 * Detect available platform features
 */
async function detectFeatures(): Promise<Record<string, boolean>> {
  const features: Record<string, boolean> = {
    // Media Capture
    camera: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    microphone: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    screenCapture: 'mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices,

    // Geolocation & Sensors
    geolocation: 'geolocation' in navigator,
    deviceMotion: 'DeviceMotionEvent' in window,
    deviceOrientation: 'DeviceOrientationEvent' in window,

    // Connectivity
    bluetooth: 'bluetooth' in navigator,
    nfc: 'NDEFReader' in window,

    // Authentication
    webauthn: 'credentials' in navigator && 'create' in navigator.credentials,

    // Storage & Files
    fileSystem: 'showOpenFilePicker' in window,

    // Communication
    webShare: 'share' in navigator,
    contactPicker: 'contacts' in navigator && 'ContactsManager' in window,

    // Background APIs
    backgroundSync: 'sync' in ServiceWorkerRegistration.prototype,
    backgroundFetch: 'BackgroundFetchManager' in window,
    periodicBackgroundSync: 'periodicSync' in ServiceWorkerRegistration.prototype,

    // Display
    wakeLock: 'wakeLock' in navigator,
    screenOrientation: 'screen' in window && 'orientation' in window.screen,

    // Audio/Speech
    speechRecognition: 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window,
    speechSynthesis: 'speechSynthesis' in window,

    // Haptics
    vibration: 'vibrate' in navigator,

    // Payment
    paymentRequest: 'PaymentRequest' in window,

    // Network
    networkInformation: 'connection' in navigator,

    // Push Notifications
    pushNotifications: 'PushManager' in window && 'Notification' in window,
  };

  return features;
}

/**
 * Activation function for Acrobi Framework
 * Called when the extension is loaded
 */
export async function activate(context: ExtensionContext): Promise<void> {
  // Detect available platform features
  const features = await detectFeatures();

  // Store in extension context
  context.storage.set('aae:features', features);

  // Register feature check hook
  context.hooks.addFilter('aae:checkFeature', (featureName: string) => {
    return features[featureName] || false;
  });

  // Register permission request hook
  context.hooks.addAction('aae:requestPermission', async (permission: string) => {
    context.logger.info('Permission requested', { permission });
    // Permission handling will be done by individual hooks
  });

  // Log available features
  const availableFeatures = Object.keys(features).filter(k => features[k]);
  context.logger.info('AAE Hooks activated', {
    version: '1.0.0-alpha.1',
    totalHooks: 50,
    availableFeatures: availableFeatures.length,
    features: availableFeatures
  });

  // Emit features detected event
  await context.hooks.doAction('aae:featuresDetected', features);
}

/**
 * Deactivation function for Acrobi Framework
 * Called when the extension is being unloaded
 */
export async function deactivate(): Promise<void> {
  // Cleanup: release any held resources
  // Individual hooks handle their own cleanup through useEffect cleanup functions

  // Note: Active camera streams, geolocation watches, etc. will be cleaned up
  // by React's useEffect cleanup when components unmount
}
