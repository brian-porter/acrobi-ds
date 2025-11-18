import { useState, useCallback, useEffect } from 'react';
import {
  useWebBluetooth,
  type BluetoothDeviceInfo,
  type BluetoothScanOptions,
  type BluetoothNotificationData,
} from './use-web-bluetooth';

export type {
  BluetoothDeviceInfo as BluetoothDevice,
  BluetoothScanOptions,
  BluetoothNotificationData,
};

export interface BluetoothPlatformInfo {
  platform: 'web' | 'capacitor' | 'unsupported';
  isNative: boolean;
  supportsWebBluetooth: boolean;
  requiresNativeApp: boolean;
}

export interface UseBluetoothReturn {
  device: BluetoothDeviceInfo | null;
  isConnected: boolean;
  isScanning: boolean;
  isLoading: boolean;
  error: string | null;
  platformInfo: BluetoothPlatformInfo;
  scan: (options?: BluetoothScanOptions) => Promise<BluetoothDeviceInfo | null>;
  connect: (device?: BluetoothDeviceInfo) => Promise<boolean>;
  disconnect: () => Promise<void>;
  readCharacteristic: (
    serviceUuid: BluetoothServiceUUID,
    characteristicUuid: BluetoothCharacteristicUUID
  ) => Promise<DataView | null>;
  writeCharacteristic: (
    serviceUuid: BluetoothServiceUUID,
    characteristicUuid: BluetoothCharacteristicUUID,
    value: BufferSource
  ) => Promise<boolean>;
  startNotifications: (
    serviceUuid: BluetoothServiceUUID,
    characteristicUuid: BluetoothCharacteristicUUID,
    onNotification: (data: BluetoothNotificationData) => void
  ) => Promise<boolean>;
  stopNotifications: (
    serviceUuid: BluetoothServiceUUID,
    characteristicUuid: BluetoothCharacteristicUUID
  ) => Promise<boolean>;
}

// Platform detection utilities
function detectPlatform(): BluetoothPlatformInfo {
  // Check if we're in a Capacitor environment
  const isCapacitor =
    typeof window !== 'undefined' &&
    window.Capacitor &&
    typeof window.Capacitor.isNativePlatform === 'function' &&
    window.Capacitor.isNativePlatform();

  // Check Web Bluetooth support
  const supportsWebBluetooth =
    typeof navigator !== 'undefined' &&
    'bluetooth' in navigator &&
    navigator.bluetooth &&
    typeof navigator.bluetooth.requestDevice === 'function';

  // Determine platform
  let platform: 'web' | 'capacitor' | 'unsupported';

  if (isCapacitor) {
    platform = 'capacitor';
  } else if (supportsWebBluetooth) {
    platform = 'web';
  } else {
    platform = 'unsupported';
  }

  // Check if this platform requires a native app for Bluetooth
  const requiresNativeApp =
    !supportsWebBluetooth ||
    (typeof navigator !== 'undefined' &&
      /iPad|iPhone|iPod/.test(navigator.userAgent));

  return {
    platform,
    isNative: Boolean(isCapacitor),
    supportsWebBluetooth: Boolean(supportsWebBluetooth),
    requiresNativeApp: Boolean(requiresNativeApp),
  };
}

export function useBluetooth(): UseBluetoothReturn {
  const [platformInfo] = useState<BluetoothPlatformInfo>(() =>
    detectPlatform()
  );
  const [error, setError] = useState<string | null>(null);

  // Use Web Bluetooth hook for web platform
  const webBluetooth = useWebBluetooth();

  // Platform-specific implementations
  const scan = useCallback(
    async (
      options?: BluetoothScanOptions
    ): Promise<BluetoothDeviceInfo | null> => {
      if (platformInfo.platform === 'unsupported') {
        setError(
          'Bluetooth is not supported on this platform. Consider using a native app with Capacitor.'
        );
        return null;
      }

      if (platformInfo.platform === 'capacitor') {
        // TODO: Implement Capacitor native Bluetooth plugin integration
        setError(
          'Native Bluetooth support via Capacitor is not yet implemented. Please refer to the documentation for implementation guidance.'
        );
        return null;
      }

      // Use Web Bluetooth for web platform
      return webBluetooth.scan(options);
    },
    [platformInfo.platform, webBluetooth]
  );

  const connect = useCallback(
    async (device?: BluetoothDeviceInfo): Promise<boolean> => {
      if (platformInfo.platform === 'unsupported') {
        setError(
          'Bluetooth is not supported on this platform. Consider using a native app with Capacitor.'
        );
        return false;
      }

      if (platformInfo.platform === 'capacitor') {
        // TODO: Implement Capacitor native Bluetooth plugin integration
        setError(
          'Native Bluetooth support via Capacitor is not yet implemented. Please refer to the documentation for implementation guidance.'
        );
        return false;
      }

      // Use Web Bluetooth for web platform
      return webBluetooth.connect(device);
    },
    [platformInfo.platform, webBluetooth]
  );

  const disconnect = useCallback(async (): Promise<void> => {
    if (platformInfo.platform === 'unsupported') {
      setError(
        'Bluetooth is not supported on this platform. Consider using a native app with Capacitor.'
      );
      return;
    }

    if (platformInfo.platform === 'capacitor') {
      // TODO: Implement Capacitor native Bluetooth plugin integration
      setError(
        'Native Bluetooth support via Capacitor is not yet implemented. Please refer to the documentation for implementation guidance.'
      );
      return;
    }

    // Use Web Bluetooth for web platform
    return webBluetooth.disconnect();
  }, [platformInfo.platform, webBluetooth]);

  const readCharacteristic = useCallback(
    async (
      serviceUuid: BluetoothServiceUUID,
      characteristicUuid: BluetoothCharacteristicUUID
    ): Promise<DataView | null> => {
      if (platformInfo.platform === 'unsupported') {
        setError(
          'Bluetooth is not supported on this platform. Consider using a native app with Capacitor.'
        );
        return null;
      }

      if (platformInfo.platform === 'capacitor') {
        // TODO: Implement Capacitor native Bluetooth plugin integration
        setError(
          'Native Bluetooth support via Capacitor is not yet implemented. Please refer to the documentation for implementation guidance.'
        );
        return null;
      }

      // Use Web Bluetooth for web platform
      return webBluetooth.readCharacteristic(serviceUuid, characteristicUuid);
    },
    [platformInfo.platform, webBluetooth]
  );

  const writeCharacteristic = useCallback(
    async (
      serviceUuid: BluetoothServiceUUID,
      characteristicUuid: BluetoothCharacteristicUUID,
      value: BufferSource
    ): Promise<boolean> => {
      if (platformInfo.platform === 'unsupported') {
        setError(
          'Bluetooth is not supported on this platform. Consider using a native app with Capacitor.'
        );
        return false;
      }

      if (platformInfo.platform === 'capacitor') {
        // TODO: Implement Capacitor native Bluetooth plugin integration
        setError(
          'Native Bluetooth support via Capacitor is not yet implemented. Please refer to the documentation for implementation guidance.'
        );
        return false;
      }

      // Use Web Bluetooth for web platform
      return webBluetooth.writeCharacteristic(
        serviceUuid,
        characteristicUuid,
        value
      );
    },
    [platformInfo.platform, webBluetooth]
  );

  const startNotifications = useCallback(
    async (
      serviceUuid: BluetoothServiceUUID,
      characteristicUuid: BluetoothCharacteristicUUID,
      onNotification: (data: BluetoothNotificationData) => void
    ): Promise<boolean> => {
      if (platformInfo.platform === 'unsupported') {
        setError(
          'Bluetooth is not supported on this platform. Consider using a native app with Capacitor.'
        );
        return false;
      }

      if (platformInfo.platform === 'capacitor') {
        // TODO: Implement Capacitor native Bluetooth plugin integration
        setError(
          'Native Bluetooth support via Capacitor is not yet implemented. Please refer to the documentation for implementation guidance.'
        );
        return false;
      }

      // Use Web Bluetooth for web platform
      return webBluetooth.startNotifications(
        serviceUuid,
        characteristicUuid,
        onNotification
      );
    },
    [platformInfo.platform, webBluetooth]
  );

  const stopNotifications = useCallback(
    async (
      serviceUuid: BluetoothServiceUUID,
      characteristicUuid: BluetoothCharacteristicUUID
    ): Promise<boolean> => {
      if (platformInfo.platform === 'unsupported') {
        setError(
          'Bluetooth is not supported on this platform. Consider using a native app with Capacitor.'
        );
        return false;
      }

      if (platformInfo.platform === 'capacitor') {
        // TODO: Implement Capacitor native Bluetooth plugin integration
        setError(
          'Native Bluetooth support via Capacitor is not yet implemented. Please refer to the documentation for implementation guidance.'
        );
        return false;
      }

      // Use Web Bluetooth for web platform
      return webBluetooth.stopNotifications(serviceUuid, characteristicUuid);
    },
    [platformInfo.platform, webBluetooth]
  );

  // Aggregate error state from platform-specific implementations
  const aggregatedError = error || webBluetooth.error;

  // For web platform, pass through web bluetooth state
  if (platformInfo.platform === 'web') {
    return {
      device: webBluetooth.device,
      isConnected: webBluetooth.isConnected,
      isScanning: webBluetooth.isScanning,
      isLoading: webBluetooth.isLoading,
      error: aggregatedError,
      platformInfo,
      scan,
      connect,
      disconnect,
      readCharacteristic,
      writeCharacteristic,
      startNotifications,
      stopNotifications,
    };
  }

  // For other platforms, return default/placeholder state
  return {
    device: null,
    isConnected: false,
    isScanning: false,
    isLoading: false,
    error: aggregatedError,
    platformInfo,
    scan,
    connect,
    disconnect,
    readCharacteristic,
    writeCharacteristic,
    startNotifications,
    stopNotifications,
  };
}

// Type augmentation for global Capacitor object
declare global {
  interface Window {
    Capacitor?: {
      isNativePlatform: () => boolean;
      getPlatform: () => string;
    };
  }
}
