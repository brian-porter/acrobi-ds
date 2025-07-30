// Export all AAE hooks
export {
  useGeolocation,
  calculateDistance,
  calculateBearing,
  convertCoordinates,
  isPointInCircle,
  isPointInPolygon,
} from './use-geolocation';
export type {
  GeolocationPosition,
  Coordinates,
  GeofenceOptions,
  GeolocationOptions,
  UseGeolocationReturn,
} from './use-geolocation';

export { useCamera } from './use-camera';
export type {
  CameraOptions,
  CapturedPhoto,
  UseCameraReturn,
} from './use-camera';

export { useBarcodeScanner } from './use-barcode-scanner';
export type {
  BarcodeResult,
  BarcodeScannerOptions,
  UseBarcodeScannerReturn,
} from './use-barcode-scanner';

export { useBluetooth } from './use-bluetooth';
export type {
  BluetoothDevice,
  BluetoothScanOptions,
  BluetoothNotificationData,
  BluetoothPlatformInfo,
  UseBluetoothReturn,
} from './use-bluetooth';

export { useWebBluetooth } from './use-web-bluetooth';
export type {
  BluetoothDeviceInfo,
  UseWebBluetoothReturn,
} from './use-web-bluetooth';

// Native platform detection for Capacitor integration
export { useNative, NativeUtils } from './use-native';
export type { NativePlatformInfo, UseNativeReturn } from './use-native';

// Audio recording for AAE media capture
export {
  useAudioRecorder,
  AudioRecorderUtils,
  AUDIO_FORMATS,
} from './use-audio-recorder';
export type {
  AudioRecorderOptions,
  AudioRecorderError,
  AudioRecorderState,
  UseAudioRecorderReturn,
} from './use-audio-recorder';

export { useKeyboard } from './use-keyboard';
export type {
  KeyboardShortcut,
  KeyboardOptions,
  UseKeyboardReturn,
} from './use-keyboard';

// Epic 40: AAE Keyboard Management - On-screen keyboard detection
export {
  useKeyboard as useKeyboardAAE,
  isKeyboardDetectionSupported,
  getKeyboardHeight,
  isKeyboardOpen as isKeyboardOpenAAE,
} from './use-keyboard-aae';
export type {
  KeyboardState,
  UseKeyboardOptions as UseKeyboardAAEOptions,
  UseKeyboardReturn as UseKeyboardAAEReturn,
} from './use-keyboard-aae';

// Visual Viewport API for on-screen keyboard detection
export {
  useVisualViewport,
  useVisualViewportMobile,
  isLikelyMobileDevice,
} from './use-visual-viewport';
export type {
  VisualViewportState,
  UseVisualViewportOptions,
  UseVisualViewportReturn,
} from './use-visual-viewport';

// Push Notifications API for AAE push messaging
export { usePushNotifications } from './use-push-notifications';
export type {
  PushNotificationOptions,
  PushNotificationState,
  PushSubscriptionData,
  PushNotificationError,
  NotificationData,
  UsePushNotificationsReturn,
} from './use-push-notifications';

// Socket.IO hooks for real-time communication
export {
  useSocket,
  useSocketEvent,
  useSocketEmit,
  useSocketStatus,
  useSocketEvents,
  useSocketEmitWithRetry,
  useSocketRoom,
  useSocketMessages,
  useSocketHealth,
  SocketHookUtils,
} from './use-socket';
export type {
  SocketEventHandler,
  SocketEmitOptions,
  UseSocketEventsOptions,
  UseSocketRoomOptions,
  SocketMessage,
  UseSocketMessagesOptions,
} from './use-socket';

// File System hooks for AAE file interaction
export { useFilePicker, FilePickerUtils } from './use-file-picker';
export type {
  FilePickerOptions,
  FilePickerResult,
  FilePickerError,
  FilePickerState,
  UseFilePickerReturn,
} from './use-file-picker';

// WebAuthn biometric authentication for AAE security
export { useWebAuthn, WebAuthnUtils } from './use-webauthn';
export type {
  WebAuthnRegistrationOptions,
  WebAuthnAuthenticationOptions,
  WebAuthnRegistrationResult,
  WebAuthnAuthenticationResult,
  WebAuthnError,
  WebAuthnState,
  UseWebAuthnOptions,
  UseWebAuthnReturn,
} from './use-webauthn';

// Video recording for AAE media capture
export { useVideoRecorder } from './use-video-recorder';
export type {
  VideoRecorderOptions,
  VideoRecorderState,
  VideoRecorderError,
  VideoDeviceInfo,
  UseVideoRecorderReturn,
  CameraConstraints,
} from './types/video-recorder';

// Image editing for AAE image manipulation
export { useImageLoader, ImageLoaderUtils } from './use-image-loader';
export type {
  ImageLoaderOptions,
  ImageLoaderError,
  ImageMetadata,
  ImageLoaderState,
  UseImageLoaderReturn,
} from './use-image-loader';

// Screen capture for AAE screen recording
export { useScreenCapture, SCREEN_FORMATS } from './use-screen-capture';
export type {
  ScreenCaptureOptions,
  ScreenCaptureState,
  DisplayInfo,
  ScreenCaptureError,
  AnnotationType,
  AnnotationData,
  UseScreenCaptureReturn,
} from './use-screen-capture';

// Wake lock for AAE screen wake management
export { useWakeLock, WakeLockUtils } from './use-wake-lock';
export type {
  WakeLockOptions,
  WakeLockError,
  WakeLockState,
  UseWakeLockReturn,
} from './use-wake-lock';

// Web Share for AAE native OS sharing
export { useWebShare, WebShareUtils } from './use-web-share';
export type {
  ShareData,
  WebShareOptions,
  WebShareError,
  WebShareState,
  FallbackOptions,
  UseWebShareReturn,
} from './use-web-share';

// Contact Picker for AAE privacy-preserving contact access
export { useContactPicker, ContactPickerUtils } from './use-contact-picker';
export type {
  ContactInfo,
  ContactAddress,
  ContactPickerOptions,
  ContactPickerError,
  ContactPickerState,
  ContactPickerFilters,
  UseContactPickerReturn,
} from './use-contact-picker';

// Text-to-Speech for AAE voice synthesis
export { useTTS, TTSUtils } from './use-tts';
export type {
  TTSVoice,
  TTSOptions,
  TTSState,
  TTSError,
  TTSHookOptions,
  UseTTSReturn,
} from './use-tts';

// Speech Recognition for AAE voice-to-text
export {
  useSpeechRecognition,
  SpeechRecognitionUtils,
} from './use-speech-recognition';
export type {
  SpeechRecognitionOptions,
  SpeechRecognitionResult,
  SpeechRecognitionState,
  SpeechRecognitionError,
  SpeechRecognitionHookOptions,
  SpeechRecognitionStatistics,
  UseSpeechRecognitionReturn,
} from './use-speech-recognition';

// Network Information for AAE network awareness
export { useNetwork } from './use-network';
export type {
  NetworkInfo,
  NetworkOptions,
  UseNetworkReturn,
} from './use-network';

// Haptic Feedback for AAE tactile feedback
export { useHaptics, HapticUtils } from './use-haptics';
export type {
  HapticPattern,
  HapticTokens,
  HapticOptions,
  HapticState,
  UseHapticsReturn,
} from './use-haptics';

// Payment Request for AAE native checkout experiences
export { usePaymentRequest, PaymentRequestUtils } from './use-payment-request';
export type {
  PaymentMethodData,
  PaymentDetailsInit,
  PaymentItem,
  PaymentCurrencyAmount,
  PaymentShippingOption,
  PaymentOptions,
  PaymentRequestState,
  PaymentRequestError,
  PaymentRequestOptions,
  UsePaymentRequestReturn,
  PaymentComplete,
} from './use-payment-request';

// Screen Orientation for AAE orientation management
export {
  useScreenOrientation,
  ScreenOrientationUtils,
} from './use-screen-orientation';
export type {
  OrientationType,
  OrientationLockType,
  ScreenOrientationState,
  ScreenOrientationError,
  ScreenOrientationOptions,
  UseScreenOrientationReturn,
} from './use-screen-orientation';

// Device Motion for AAE motion sensor access
export { useDeviceMotion, DeviceMotionUtils } from './use-device-motion';
export type {
  AccelerationData,
  RotationRateData,
  DeviceMotionData,
  DeviceMotionState,
  DeviceMotionError,
  DeviceMotionOptions,
  UseDeviceMotionReturn,
} from './use-device-motion';

// Compass Heading for AAE navigation
export { useCompassHeading, CompassUtils } from './use-compass-heading';
export type {
  CompassHeadingData,
  CompassState,
  CompassError,
  CompassOptions,
  UseCompassHeadingReturn,
} from './use-compass-heading';

// Shake Gesture for AAE interaction patterns
export { useShake, ShakeUtils } from './use-shake';
export type {
  ShakeEvent,
  ShakeState,
  ShakeDetectionOptions,
  ShakeCallbacks,
  UseShakeOptions,
  UseShakeReturn,
} from './use-shake';

// Local Storage for AAE state persistence
export { useLocalStorage, LocalStorageUtils } from './use-local-storage';
export type {
  LocalStorageOptions,
  LocalStorageError,
  UseLocalStorageReturn,
} from './use-local-storage';

// Cached API for AAE offline-first data loading
export { useCachedApi, CachedApiUtils } from './use-cached-api';
export type {
  CachedApiOptions,
  CachedApiState,
  CachedApiError,
  CachedData,
  UseCachedApiReturn,
} from './use-cached-api';

// Persistent Form for AAE form state persistence
export { usePersistentForm, PersistentFormUtils } from './use-persistent-form';
export type {
  PersistentFormOptions,
  PersistentFormState,
  PersistentFormActions,
  UsePersistentFormReturn,
} from './use-persistent-form';

// NFC for AAE Near Field Communication
export { useNFC } from './use-nfc';
export type {
  NFCOptions,
  NFCState,
  NFCData,
  NFCTag,
  NFCError,
  NDEFRecordData,
  NDEFMessage,
  WiFiCredentials,
  ContactInfo,
  UseNFCReturn,
  NFCReader,
  NFCWriter,
  NDEFReadingEvent,
  NFCBrowserSupport,
} from './types/nfc';

// AAE Display for AAE display mode detection
export { useAAEDisplay, AAEDisplayUtils } from './use-aae-display';
export type {
  AAEDisplayMode,
  AAEDisplayState,
  UseAAEDisplayOptions,
  UseAAEDisplayReturn,
} from './use-aae-display';

// Background Sync for AAE offline-first functionality
export {
  useBackgroundSync,
  BackgroundSyncUtils,
  SYNC_TAGS,
  saveForSync,
  getPendingSyncData,
} from './use-background-sync';
export type {
  BackgroundSyncState,
  UseBackgroundSyncOptions,
  UseBackgroundSyncReturn,
  SyncTag,
} from './use-background-sync';

// Background Fetch for AAE large file downloads
export {
  useBackgroundFetch,
  BackgroundFetchUtils,
} from './use-background-fetch';
export type {
  BackgroundFetchState,
  BackgroundFetchRequest,
  UseBackgroundFetchOptions,
  BackgroundFetchOptions,
  UseBackgroundFetchReturn,
  BackgroundFetchRegistration,
  BackgroundFetchRecord,
} from './use-background-fetch';

// Periodic Sync for AAE regular background data updates
export {
  usePeriodicSync,
  PeriodicSyncUtils,
  PERIODIC_SYNC_TAGS,
} from './use-periodic-sync';
export type {
  PeriodicSyncState,
  PeriodicSyncOptions,
  UsePeriodicSyncOptions,
  UsePeriodicSyncReturn,
  PeriodicSyncTag,
} from './use-periodic-sync';

// File System Access for AAE advanced file operations
export { useFileSystem, FileSystemUtils } from './use-file-system';
export type {
  FileSystemState,
  FileSystemOptions,
  UseFileSystemReturn,
  FileSystemFileHandle,
  ShowOpenFilePickerOptions,
  ShowSaveFilePickerOptions,
  FilePickerAcceptType,
  WellKnownDirectory,
} from './use-file-system';

// Window Management for AAE multi-window functionality
export { useWindowManager, WindowManagerUtils } from './use-window-manager';
export type {
  PwaWindow,
  WindowManagerState,
  WindowOpenOptions,
  WindowManagerOptions,
  UseWindowManagerReturn,
} from './use-window-manager';

// Platform Detection for AAE adaptive experiences
export { usePlatform, PlatformUtils } from './use-platform';
export type {
  PlatformInfo,
  UsePlatformReturn,
} from './use-platform';

// Feature Detection for AAE capability checking
export { 
  useFeatureDetection, 
  useMultipleFeatureDetection, 
  FeatureDetectionUtils 
} from './use-feature-detection';
export type {
  FeatureAPI,
  UseFeatureDetectionReturn,
} from './use-feature-detection';
