// Web Bluetooth API Type Definitions
// These types extend the base DOM types for Web Bluetooth support

declare global {
  // Web Bluetooth API types
  type BluetoothServiceUUID = string | number;
  type BluetoothCharacteristicUUID = string | number;

  interface BluetoothLEScanFilter {
    name?: string;
    namePrefix?: string;
    services?: BluetoothServiceUUID[];
    manufacturerData?: object;
    serviceData?: object;
  }

  interface RequestDeviceOptions {
    filters?: BluetoothLEScanFilter[];
    optionalServices?: BluetoothServiceUUID[];
    acceptAllDevices?: boolean;
  }

  interface BluetoothDevice {
    readonly id: string;
    readonly name?: string;
    readonly gatt?: BluetoothRemoteGATTServer;
    addEventListener(
      type: 'gattserverdisconnected',
      listener: (this: this, ev: Event) => any,
      useCapture?: boolean
    ): void;
    removeEventListener(
      type: 'gattserverdisconnected',
      listener: (this: this, ev: Event) => any,
      useCapture?: boolean
    ): void;
  }

  interface BluetoothRemoteGATTServer {
    readonly device: BluetoothDevice;
    readonly connected: boolean;
    connect(): Promise<BluetoothRemoteGATTServer>;
    disconnect(): void;
    getPrimaryService(
      service: BluetoothServiceUUID
    ): Promise<BluetoothRemoteGATTService>;
  }

  interface BluetoothRemoteGATTService {
    readonly device: BluetoothDevice;
    readonly uuid: string;
    readonly isPrimary: boolean;
    getCharacteristic(
      characteristic: BluetoothCharacteristicUUID
    ): Promise<BluetoothRemoteGATTCharacteristic>;
    getCharacteristics(
      characteristic?: BluetoothCharacteristicUUID
    ): Promise<BluetoothRemoteGATTCharacteristic[]>;
  }

  interface BluetoothRemoteGATTCharacteristic {
    readonly service: BluetoothRemoteGATTService;
    readonly uuid: string;
    readonly properties: BluetoothCharacteristicProperties;
    readonly value?: DataView;
    readValue(): Promise<DataView>;
    writeValue(value: BufferSource): Promise<void>;
    startNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
    stopNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
    addEventListener(
      type: 'characteristicvaluechanged',
      listener: (this: this, ev: Event) => any,
      useCapture?: boolean
    ): void;
    removeEventListener(
      type: 'characteristicvaluechanged',
      listener: (this: this, ev: Event) => any,
      useCapture?: boolean
    ): void;
  }

  interface BluetoothCharacteristicProperties {
    readonly broadcast: boolean;
    readonly read: boolean;
    readonly writeWithoutResponse: boolean;
    readonly write: boolean;
    readonly notify: boolean;
    readonly indicate: boolean;
    readonly authenticatedSignedWrites: boolean;
    readonly reliableWrite: boolean;
    readonly writableAuxiliaries: boolean;
  }

  interface Bluetooth {
    requestDevice(options: RequestDeviceOptions): Promise<BluetoothDevice>;
    getAvailability(): Promise<boolean>;
    addEventListener(
      type: 'availabilitychanged',
      listener: (this: this, ev: Event) => any,
      useCapture?: boolean
    ): void;
    removeEventListener(
      type: 'availabilitychanged',
      listener: (this: this, ev: Event) => any,
      useCapture?: boolean
    ): void;
  }

  interface Navigator {
    bluetooth?: Bluetooth;
  }
}

export {};
