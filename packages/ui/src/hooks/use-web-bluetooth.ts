import { useState, useCallback, useRef, useEffect } from 'react';
/// <reference path="./types/bluetooth.d.ts" />

export interface BluetoothDeviceInfo {
  id: string;
  name?: string;
  gatt?: BluetoothRemoteGATTServer;
}

export interface BluetoothScanOptions {
  acceptAllDevices?: boolean;
  filters?: BluetoothLEScanFilter[];
  optionalServices?: BluetoothServiceUUID[];
}

export interface BluetoothCharacteristic {
  service: BluetoothServiceUUID;
  characteristic: BluetoothCharacteristicUUID;
}

export interface BluetoothNotificationData {
  characteristic: BluetoothCharacteristicUUID;
  value: DataView;
  timestamp: number;
}

export interface UseWebBluetoothReturn {
  device: BluetoothDeviceInfo | null;
  isConnected: boolean;
  isScanning: boolean;
  isLoading: boolean;
  error: string | null;
  isSupported: boolean;
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

export function useWebBluetooth(): UseWebBluetoothReturn {
  const [device, setDevice] = useState<BluetoothDeviceInfo | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep track of active notifications for cleanup
  const notificationsRef = useRef<
    Map<string, BluetoothRemoteGATTCharacteristic>
  >(new Map());

  const isSupported =
    typeof navigator !== 'undefined' &&
    'bluetooth' in navigator &&
    navigator.bluetooth &&
    typeof navigator.bluetooth.requestDevice === 'function';

  const handleBluetoothError = useCallback((err: unknown): string => {
    if (err instanceof Error) {
      switch (err.name) {
        case 'NotFoundError':
          return 'No Bluetooth devices found or user cancelled selection';
        case 'SecurityError':
          return 'Bluetooth access blocked due to security restrictions';
        case 'NotSupportedError':
          return 'Bluetooth is not supported on this device';
        case 'InvalidStateError':
          return 'Bluetooth adapter is not available';
        case 'NetworkError':
          return 'Network error occurred during Bluetooth operation';
        case 'NotAllowedError':
          return 'Bluetooth access denied by user';
        case 'AbortError':
          return 'Bluetooth operation was aborted';
        default:
          return `Bluetooth error: ${err.message}`;
      }
    }
    return 'An unknown Bluetooth error occurred';
  }, []);

  const scan = useCallback(
    async (
      options: BluetoothScanOptions = {}
    ): Promise<BluetoothDeviceInfo | null> => {
      if (!isSupported) {
        setError('Web Bluetooth is not supported in this browser');
        return null;
      }

      setIsScanning(true);
      setError(null);

      try {
        const scanOptions: RequestDeviceOptions = {
          acceptAllDevices: options.acceptAllDevices ?? false,
          filters: options.filters ?? [],
          optionalServices: options.optionalServices ?? [],
        };

        // Ensure we have either acceptAllDevices or filters
        if (
          !scanOptions.acceptAllDevices &&
          (!scanOptions.filters || scanOptions.filters.length === 0)
        ) {
          scanOptions.acceptAllDevices = true;
        }

        const bluetoothDevice =
          await navigator.bluetooth!.requestDevice(scanOptions);

        const deviceData: BluetoothDeviceInfo = {
          id: bluetoothDevice.id,
          name: bluetoothDevice.name,
          gatt: bluetoothDevice.gatt,
        };

        setDevice(deviceData);
        setIsScanning(false);
        return deviceData;
      } catch (err) {
        const errorMessage = handleBluetoothError(err);
        setError(errorMessage);
        setIsScanning(false);
        return null;
      }
    },
    [isSupported, handleBluetoothError]
  );

  const connect = useCallback(
    async (deviceToConnect?: BluetoothDeviceInfo): Promise<boolean> => {
      const targetDevice = deviceToConnect || device;

      if (!targetDevice?.gatt) {
        setError('No device available to connect to');
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        const server = await targetDevice.gatt.connect();
        setIsConnected(Boolean(server.connected));
        setIsLoading(false);

        // Update device with connected GATT server
        setDevice(prev => (prev ? { ...prev, gatt: server } : null));

        return Boolean(server.connected);
      } catch (err) {
        const errorMessage = handleBluetoothError(err);
        setError(errorMessage);
        setIsLoading(false);
        setIsConnected(false);
        return false;
      }
    },
    [device, handleBluetoothError]
  );

  const disconnect = useCallback(async (): Promise<void> => {
    if (!device?.gatt) {
      return;
    }

    try {
      // Stop all active notifications before disconnecting
      notificationsRef.current.forEach(async (characteristic, key) => {
        try {
          await characteristic.stopNotifications();
        } catch (err) {
          console.warn(`Failed to stop notifications for ${key}:`, err);
        }
      });
      notificationsRef.current.clear();

      // Disconnect the device
      if (device.gatt.connected) {
        device.gatt.disconnect();
      }

      setIsConnected(false);
      setError(null);
    } catch (err) {
      const errorMessage = handleBluetoothError(err);
      setError(errorMessage);
    }
  }, [device, handleBluetoothError]);

  const readCharacteristic = useCallback(
    async (
      serviceUuid: BluetoothServiceUUID,
      characteristicUuid: BluetoothCharacteristicUUID
    ): Promise<DataView | null> => {
      if (!device?.gatt?.connected) {
        setError('Device is not connected');
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const service = await device.gatt.getPrimaryService(serviceUuid);
        const characteristic =
          await service.getCharacteristic(characteristicUuid);
        const value = await characteristic.readValue();

        setIsLoading(false);
        return value;
      } catch (err) {
        const errorMessage = handleBluetoothError(err);
        setError(errorMessage);
        setIsLoading(false);
        return null;
      }
    },
    [device, handleBluetoothError]
  );

  const writeCharacteristic = useCallback(
    async (
      serviceUuid: BluetoothServiceUUID,
      characteristicUuid: BluetoothCharacteristicUUID,
      value: BufferSource
    ): Promise<boolean> => {
      if (!device?.gatt?.connected) {
        setError('Device is not connected');
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        const service = await device.gatt.getPrimaryService(serviceUuid);
        const characteristic =
          await service.getCharacteristic(characteristicUuid);
        await characteristic.writeValue(value);

        setIsLoading(false);
        return true;
      } catch (err) {
        const errorMessage = handleBluetoothError(err);
        setError(errorMessage);
        setIsLoading(false);
        return false;
      }
    },
    [device, handleBluetoothError]
  );

  const startNotifications = useCallback(
    async (
      serviceUuid: BluetoothServiceUUID,
      characteristicUuid: BluetoothCharacteristicUUID,
      onNotification: (data: BluetoothNotificationData) => void
    ): Promise<boolean> => {
      if (!device?.gatt?.connected) {
        setError('Device is not connected');
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        const service = await device.gatt.getPrimaryService(serviceUuid);
        const characteristic =
          await service.getCharacteristic(characteristicUuid);

        // Add event listener for notifications
        const handleCharacteristicValueChanged = (event: Event) => {
          const target =
            event.target as unknown as BluetoothRemoteGATTCharacteristic;
          if (target.value) {
            onNotification({
              characteristic: characteristicUuid,
              value: target.value,
              timestamp: Date.now(),
            });
          }
        };

        characteristic.addEventListener(
          'characteristicvaluechanged',
          handleCharacteristicValueChanged
        );
        await characteristic.startNotifications();

        // Store the characteristic for cleanup
        const key = `${serviceUuid}-${characteristicUuid}`;
        notificationsRef.current.set(key, characteristic);

        setIsLoading(false);
        return true;
      } catch (err) {
        const errorMessage = handleBluetoothError(err);
        setError(errorMessage);
        setIsLoading(false);
        return false;
      }
    },
    [device, handleBluetoothError]
  );

  const stopNotifications = useCallback(
    async (
      serviceUuid: BluetoothServiceUUID,
      characteristicUuid: BluetoothCharacteristicUUID
    ): Promise<boolean> => {
      const key = `${serviceUuid}-${characteristicUuid}`;
      const characteristic = notificationsRef.current.get(key);

      if (!characteristic) {
        setError('No active notifications found for this characteristic');
        return false;
      }

      try {
        await characteristic.stopNotifications();
        notificationsRef.current.delete(key);
        return true;
      } catch (err) {
        const errorMessage = handleBluetoothError(err);
        setError(errorMessage);
        return false;
      }
    },
    [handleBluetoothError]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  // Handle device disconnection events
  useEffect(() => {
    if (device?.gatt) {
      const handleDisconnected = () => {
        setIsConnected(false);
        notificationsRef.current.clear();
      };

      // Listen for disconnection events
      device.gatt.device.addEventListener(
        'gattserverdisconnected',
        handleDisconnected
      );

      return () => {
        device.gatt?.device.removeEventListener(
          'gattserverdisconnected',
          handleDisconnected
        );
      };
    }
  }, [device]);

  return {
    device,
    isConnected,
    isScanning,
    isLoading,
    error,
    isSupported,
    scan,
    connect,
    disconnect,
    readCharacteristic,
    writeCharacteristic,
    startNotifications,
    stopNotifications,
  };
}
