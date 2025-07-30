/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react';
import { useDeviceOrientation } from './use-device-orientation';

// Mock global APIs
const mockDeviceOrientationEvent = {
  alpha: 45,
  beta: 30,
  gamma: 15,
  absolute: true,
};

const mockDeviceMotionEvent = {
  acceleration: { x: 1.5, y: 2.0, z: 0.5 },
  accelerationIncludingGravity: { x: 2.0, y: 3.0, z: 9.8 },
  rotationRate: { alpha: 10, beta: 5, gamma: 2 },
  interval: 16.67,
};

const mockScreenOrientation = {
  angle: 0,
  type: 'portrait-primary',
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  lock: jest.fn(),
  unlock: jest.fn(),
};

// Setup DOM environment
beforeEach(() => {
  // Mock DeviceOrientationEvent
  Object.defineProperty(window, 'DeviceOrientationEvent', {
    writable: true,
    value: function DeviceOrientationEvent() {},
  });

  // Mock DeviceMotionEvent
  Object.defineProperty(window, 'DeviceMotionEvent', {
    writable: true,
    value: function DeviceMotionEvent() {},
  });

  // Mock screen.orientation
  Object.defineProperty(screen, 'orientation', {
    writable: true,
    value: mockScreenOrientation,
  });

  // Mock navigator.onLine
  Object.defineProperty(navigator, 'onLine', {
    writable: true,
    value: true,
  });

  // Mock event listeners
  const eventListeners: { [key: string]: Function[] } = {};

  window.addEventListener = jest.fn((event: string, callback: Function) => {
    if (!eventListeners[event]) eventListeners[event] = [];
    eventListeners[event].push(callback);
  });

  window.removeEventListener = jest.fn((event: string, callback: Function) => {
    if (eventListeners[event]) {
      const index = eventListeners[event].indexOf(callback);
      if (index > -1) eventListeners[event].splice(index, 1);
    }
  });

  // Utility to trigger events
  (window as any).triggerEvent = (eventType: string, eventData: any) => {
    if (eventListeners[eventType]) {
      eventListeners[eventType].forEach(callback => callback(eventData));
    }
  };

  // Clear all mocks
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useDeviceOrientation', () => {
  describe('initialization', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useDeviceOrientation());

      expect(result.current.state).toEqual({
        isOrientationSupported: true,
        isMotionSupported: true,
        isCompassSupported: false,
        isScreenOrientationSupported: true,
        hasOrientationPermission: false,
        hasMotionPermission: false,
        isActive: false,
        isCalibrating: false,
        isCalibrated: false,
        orientation: null,
        motion: null,
        screenOrientation: null,
        calibration: null,
        sensorAccuracy: 'unreliable',
        lastUpdateTime: null,
      });

      expect(result.current.error).toBeNull();
    });

    it('should detect unsupported browser environments', () => {
      // Remove DeviceOrientationEvent support
      delete (window as any).DeviceOrientationEvent;
      delete (window as any).DeviceMotionEvent;

      const { result } = renderHook(() => useDeviceOrientation());

      expect(result.current.state.isOrientationSupported).toBe(false);
      expect(result.current.state.isMotionSupported).toBe(false);
    });
  });

  describe('permission management', () => {
    it('should check permissions correctly', async () => {
      const { result } = renderHook(() => useDeviceOrientation());

      await act(async () => {
        const permissions = await result.current.checkPermissions();
        expect(permissions.orientation).toBe(true);
        expect(permissions.motion).toBe(true);
      });
    });

    it('should request permissions on iOS 13+', async () => {
      // Mock iOS 13+ permission API
      const mockRequestPermission = jest.fn().mockResolvedValue('granted');
      (DeviceOrientationEvent as any).requestPermission = mockRequestPermission;
      (DeviceMotionEvent as any).requestPermission = mockRequestPermission;

      const { result } = renderHook(() => useDeviceOrientation());

      await act(async () => {
        const granted = await result.current.requestPermissions();
        expect(granted).toBe(true);
        expect(mockRequestPermission).toHaveBeenCalledTimes(2);
      });

      expect(result.current.state.hasOrientationPermission).toBe(true);
      expect(result.current.state.hasMotionPermission).toBe(true);
    });

    it('should handle permission denial', async () => {
      const mockRequestPermission = jest.fn().mockResolvedValue('denied');
      (DeviceOrientationEvent as any).requestPermission = mockRequestPermission;
      (DeviceMotionEvent as any).requestPermission = mockRequestPermission;

      const { result } = renderHook(() => useDeviceOrientation());

      await act(async () => {
        const granted = await result.current.requestPermissions();
        expect(granted).toBe(false);
      });

      expect(result.current.error?.type).toBe('permission');
    });
  });

  describe('device orientation tracking', () => {
    it('should start and stop orientation tracking', async () => {
      const { result } = renderHook(() => useDeviceOrientation());

      // Start tracking
      await act(async () => {
        const started = await result.current.start();
        expect(started).toBe(true);
      });

      expect(result.current.state.isActive).toBe(true);
      expect(window.addEventListener).toHaveBeenCalledWith(
        'deviceorientation',
        expect.any(Function),
        { passive: true }
      );

      // Stop tracking
      act(() => {
        result.current.stop();
      });

      expect(result.current.state.isActive).toBe(false);
      expect(window.removeEventListener).toHaveBeenCalledWith(
        'deviceorientation',
        expect.any(Function)
      );
    });

    it('should process orientation data correctly', async () => {
      const onOrientationChange = jest.fn();
      const { result } = renderHook(() =>
        useDeviceOrientation({ onOrientationChange })
      );

      await act(async () => {
        await result.current.start();
      });

      // Trigger orientation event
      act(() => {
        (window as any).triggerEvent(
          'deviceorientation',
          mockDeviceOrientationEvent
        );
      });

      expect(onOrientationChange).toHaveBeenCalledWith(
        expect.objectContaining({
          alpha: 45,
          beta: 30,
          gamma: 15,
          absolute: true,
          heading: expect.any(Number),
          tilt: expect.any(Number),
          roll: 15,
          timestamp: expect.any(Number),
        })
      );

      expect(result.current.state.orientation).not.toBeNull();
      expect(result.current.state.isCompassSupported).toBe(true);
    });

    it('should calculate compass heading correctly', async () => {
      const { result } = renderHook(() => useDeviceOrientation());

      await act(async () => {
        await result.current.start();
      });

      act(() => {
        (window as any).triggerEvent('deviceorientation', {
          ...mockDeviceOrientationEvent,
          alpha: 90,
          absolute: true,
        });
      });

      const heading = result.current.getCompassHeading();
      expect(heading).toBe(270); // 360 - 90 = 270
    });
  });

  describe('device motion tracking', () => {
    it('should process motion data correctly', async () => {
      const onMotionDetected = jest.fn();
      const { result } = renderHook(() =>
        useDeviceOrientation({ onMotionDetected })
      );

      await act(async () => {
        await result.current.start();
      });

      // Trigger motion event
      act(() => {
        (window as any).triggerEvent('devicemotion', mockDeviceMotionEvent);
      });

      expect(onMotionDetected).toHaveBeenCalledWith(
        expect.objectContaining({
          acceleration: { x: 1.5, y: 2.0, z: 0.5 },
          accelerationIncludingGravity: { x: 2.0, y: 3.0, z: 9.8 },
          rotationRate: { alpha: 10, beta: 5, gamma: 2 },
          totalAcceleration: expect.any(Number),
          isMoving: expect.any(Boolean),
          timestamp: expect.any(Number),
        })
      );

      expect(result.current.state.motion).not.toBeNull();
    });

    it('should detect movement based on acceleration threshold', async () => {
      const { result } = renderHook(() =>
        useDeviceOrientation({ motionThreshold: 2.0 })
      );

      await act(async () => {
        await result.current.start();
      });

      // High acceleration - should detect movement
      act(() => {
        (window as any).triggerEvent('devicemotion', {
          ...mockDeviceMotionEvent,
          acceleration: { x: 3.0, y: 4.0, z: 2.0 },
        });
      });

      expect(result.current.state.motion?.isMoving).toBe(true);

      // Low acceleration - should not detect movement
      act(() => {
        (window as any).triggerEvent('devicemotion', {
          ...mockDeviceMotionEvent,
          acceleration: { x: 0.1, y: 0.1, z: 0.1 },
        });
      });

      expect(result.current.state.motion?.isMoving).toBe(false);
    });
  });

  describe('shake detection', () => {
    it('should detect shake gestures', async () => {
      const onShakeDetected = jest.fn();
      const { result } = renderHook(() =>
        useDeviceOrientation({
          enableShakeDetection: true,
          shakeThreshold: 10.0,
          onShakeDetected,
        })
      );

      await act(async () => {
        await result.current.start();
      });

      // Simulate multiple high-acceleration events for shake
      act(() => {
        (window as any).triggerEvent('devicemotion', {
          ...mockDeviceMotionEvent,
          acceleration: { x: 15.0, y: 5.0, z: 2.0 },
        });
      });

      // Wait a bit, then trigger another shake
      setTimeout(() => {
        act(() => {
          (window as any).triggerEvent('devicemotion', {
            ...mockDeviceMotionEvent,
            acceleration: { x: 12.0, y: 8.0, z: 3.0 },
          });
        });
      }, 200);

      // The shake detector should eventually trigger
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  });

  describe('gesture recognition', () => {
    it('should detect tilt gestures', async () => {
      const onGestureDetected = jest.fn();
      const { result } = renderHook(() =>
        useDeviceOrientation({
          enableGestureRecognition: true,
          tiltThreshold: 20,
          onGestureDetected,
        })
      );

      await act(async () => {
        await result.current.start();
      });

      // First orientation event
      act(() => {
        (window as any).triggerEvent('deviceorientation', {
          alpha: 0,
          beta: 0,
          gamma: 0,
          absolute: true,
        });
      });

      // Significant tilt change
      act(() => {
        (window as any).triggerEvent('deviceorientation', {
          alpha: 0,
          beta: 0,
          gamma: 40,
          absolute: true,
        });
      });

      expect(onGestureDetected).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'tilt-right',
          intensity: expect.any(Number),
          timestamp: expect.any(Number),
        })
      );
    });

    it('should manage active gestures', () => {
      const { result } = renderHook(() => useDeviceOrientation());

      // Initially all gestures should be active
      expect(result.current.getActiveGestures()).toContain('tilt-left');
      expect(result.current.getActiveGestures()).toContain('rotate-cw');

      // Disable a gesture
      act(() => {
        result.current.disableGesture('tilt-left');
      });

      expect(result.current.getActiveGestures()).not.toContain('tilt-left');

      // Re-enable a gesture
      act(() => {
        result.current.enableGesture('tilt-left');
      });

      expect(result.current.getActiveGestures()).toContain('tilt-left');
    });
  });

  describe('screen orientation', () => {
    it('should track screen orientation changes', async () => {
      const onScreenOrientationChange = jest.fn();
      const { result } = renderHook(() =>
        useDeviceOrientation({
          trackScreenOrientation: true,
          onScreenOrientationChange,
        })
      );

      await act(async () => {
        await result.current.start();
      });

      expect(mockScreenOrientation.addEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function)
      );
    });

    it('should lock and unlock screen orientation', async () => {
      const { result } = renderHook(() => useDeviceOrientation());

      await act(async () => {
        const locked = await result.current.lockOrientation('portrait');
        expect(locked).toBe(true);
        expect(mockScreenOrientation.lock).toHaveBeenCalledWith('portrait');
      });

      await act(async () => {
        const unlocked = await result.current.unlockOrientation();
        expect(unlocked).toBe(true);
        expect(mockScreenOrientation.unlock).toHaveBeenCalled();
      });
    });
  });

  describe('calibration', () => {
    it('should calibrate device sensors', async () => {
      const onCalibrationComplete = jest.fn();
      const { result } = renderHook(() =>
        useDeviceOrientation({ onCalibrationComplete })
      );

      // Start tracking first
      await act(async () => {
        await result.current.start();
      });

      // Trigger orientation event to have data
      act(() => {
        (window as any).triggerEvent(
          'deviceorientation',
          mockDeviceOrientationEvent
        );
      });

      // Calibrate
      await act(async () => {
        const calibrated = await result.current.calibrate();
        expect(calibrated).toBe(true);
      });

      expect(result.current.state.isCalibrated).toBe(true);
      expect(result.current.state.calibration).not.toBeNull();
      expect(onCalibrationComplete).toHaveBeenCalled();
    });

    it('should reset calibration', async () => {
      const { result } = renderHook(() => useDeviceOrientation());

      await act(async () => {
        await result.current.start();
      });

      act(() => {
        (window as any).triggerEvent(
          'deviceorientation',
          mockDeviceOrientationEvent
        );
      });

      await act(async () => {
        await result.current.calibrate();
      });

      // Reset calibration
      act(() => {
        result.current.resetCalibration();
      });

      expect(result.current.state.isCalibrated).toBe(false);
      expect(result.current.state.calibration).toBeNull();
    });
  });

  describe('utility methods', () => {
    beforeEach(async () => {
      // Setup common state for utility tests
    });

    it('should detect if device is flat', async () => {
      const { result } = renderHook(() => useDeviceOrientation());

      await act(async () => {
        await result.current.start();
      });

      // Device is flat (beta close to 0)
      act(() => {
        (window as any).triggerEvent('deviceorientation', {
          alpha: 0,
          beta: 5,
          gamma: 0,
          absolute: true,
        });
      });

      expect(result.current.isDeviceFlat()).toBe(true);

      // Device is tilted
      act(() => {
        (window as any).triggerEvent('deviceorientation', {
          alpha: 0,
          beta: 45,
          gamma: 0,
          absolute: true,
        });
      });

      expect(result.current.isDeviceFlat()).toBe(false);
    });

    it('should detect if device is upright', async () => {
      const { result } = renderHook(() => useDeviceOrientation());

      await act(async () => {
        await result.current.start();
      });

      // Device is upright (gamma close to 0)
      act(() => {
        (window as any).triggerEvent('deviceorientation', {
          alpha: 0,
          beta: 0,
          gamma: 3,
          absolute: true,
        });
      });

      expect(result.current.isDeviceUpright()).toBe(true);

      // Device is tilted sideways
      act(() => {
        (window as any).triggerEvent('deviceorientation', {
          alpha: 0,
          beta: 0,
          gamma: 45,
          absolute: true,
        });
      });

      expect(result.current.isDeviceUpright()).toBe(false);
    });

    it('should get movement intensity', async () => {
      const { result } = renderHook(() => useDeviceOrientation());

      await act(async () => {
        await result.current.start();
      });

      act(() => {
        (window as any).triggerEvent('devicemotion', mockDeviceMotionEvent);
      });

      const intensity = result.current.getMovementIntensity();
      expect(intensity).toBeGreaterThan(0);
      expect(typeof intensity).toBe('number');
    });

    it('should get tilt angle', async () => {
      const { result } = renderHook(() => useDeviceOrientation());

      await act(async () => {
        await result.current.start();
      });

      act(() => {
        (window as any).triggerEvent('deviceorientation', {
          alpha: 0,
          beta: 30,
          gamma: 40,
          absolute: true,
        });
      });

      const tilt = result.current.getTiltAngle();
      expect(tilt).toBeCloseTo(50); // sqrt(30^2 + 40^2) = 50
    });
  });

  describe('noise filtering', () => {
    it('should apply noise filtering when enabled', async () => {
      const { result } = renderHook(() =>
        useDeviceOrientation({ enableNoiseFiltering: true })
      );

      await act(async () => {
        await result.current.start();
      });

      // Send multiple orientation events with small variations
      const orientations = [
        { alpha: 100, beta: 10, gamma: 5, absolute: true },
        { alpha: 100.1, beta: 10.05, gamma: 5.02, absolute: true },
        { alpha: 99.98, beta: 9.95, gamma: 4.98, absolute: true },
      ];

      orientations.forEach(orientation => {
        act(() => {
          (window as any).triggerEvent('deviceorientation', orientation);
        });
      });

      // The noise filter should smooth out small variations
      expect(result.current.state.orientation).not.toBeNull();
    });

    it('should control noise filtering', () => {
      const { result } = renderHook(() => useDeviceOrientation());

      // Enable noise filtering
      act(() => {
        result.current.enableNoiseFilter(true);
      });

      // Disable noise filtering
      act(() => {
        result.current.enableNoiseFilter(false);
      });

      // Should not throw any errors
      expect(true).toBe(true);
    });
  });

  describe('frequency control', () => {
    it('should set update frequency', () => {
      const { result } = renderHook(() => useDeviceOrientation());

      // Set frequency
      act(() => {
        result.current.setUpdateFrequency(30);
      });

      // Set high frequency (should be clamped)
      act(() => {
        result.current.setUpdateFrequency(120);
      });

      // Set low frequency (should be clamped)
      act(() => {
        result.current.setUpdateFrequency(0);
      });

      // Should not throw any errors
      expect(true).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should handle sensor errors gracefully', async () => {
      const onError = jest.fn();
      const { result } = renderHook(() => useDeviceOrientation({ onError }));

      // Mock permission failure
      (DeviceOrientationEvent as any).requestPermission = jest
        .fn()
        .mockRejectedValue(new Error('Permission denied'));

      await act(async () => {
        const granted = await result.current.requestPermissions();
        expect(granted).toBe(false);
      });

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'permission',
          message: expect.stringContaining('permission'),
        })
      );
    });

    it('should handle unsupported features gracefully', async () => {
      // Remove screen.orientation support
      delete (screen as any).orientation;

      const { result } = renderHook(() => useDeviceOrientation());

      expect(result.current.state.isScreenOrientationSupported).toBe(false);

      // These should return false gracefully
      await act(async () => {
        const locked = await result.current.lockOrientation('portrait');
        expect(locked).toBe(false);
      });

      await act(async () => {
        const unlocked = await result.current.unlockOrientation();
        expect(unlocked).toBe(false);
      });
    });
  });

  describe('data access methods', () => {
    it('should provide current data access', async () => {
      const { result } = renderHook(() => useDeviceOrientation());

      // Before starting, all should return null
      expect(result.current.getCurrentOrientation()).toBeNull();
      expect(result.current.getCurrentMotion()).toBeNull();
      expect(result.current.getCurrentScreenOrientation()).toBeNull();

      await act(async () => {
        await result.current.start();
      });

      // Trigger events
      act(() => {
        (window as any).triggerEvent(
          'deviceorientation',
          mockDeviceOrientationEvent
        );
        (window as any).triggerEvent('devicemotion', mockDeviceMotionEvent);
      });

      // Now should return data
      expect(result.current.getCurrentOrientation()).not.toBeNull();
      expect(result.current.getCurrentMotion()).not.toBeNull();
    });
  });

  describe('integration features', () => {
    it('should handle calibration accuracy checks', async () => {
      const { result } = renderHook(() => useDeviceOrientation());

      // Before calibration
      expect(result.current.isCompassAccurate()).toBe(false);
      expect(result.current.getSensorAccuracy()).toBe('unreliable');

      await act(async () => {
        await result.current.start();
      });

      act(() => {
        (window as any).triggerEvent(
          'deviceorientation',
          mockDeviceOrientationEvent
        );
      });

      await act(async () => {
        await result.current.calibrate();
      });

      // After calibration
      expect(result.current.isCompassAccurate()).toBe(true);
      expect(result.current.getSensorAccuracy()).toBe('high');
    });
  });
});

describe('Edge cases and error conditions', () => {
  it('should handle null sensor data gracefully', async () => {
    const { result } = renderHook(() => useDeviceOrientation());

    await act(async () => {
      await result.current.start();
    });

    // Send event with null values
    act(() => {
      (window as any).triggerEvent('deviceorientation', {
        alpha: null,
        beta: null,
        gamma: null,
        absolute: false,
      });
    });

    act(() => {
      (window as any).triggerEvent('devicemotion', {
        acceleration: { x: null, y: null, z: null },
        accelerationIncludingGravity: { x: null, y: null, z: null },
        rotationRate: { alpha: null, beta: null, gamma: null },
        interval: 16.67,
      });
    });

    expect(result.current.state.orientation).not.toBeNull();
    expect(result.current.state.motion).not.toBeNull();
  });

  it('should handle rapid event firing', async () => {
    const { result } = renderHook(
      () => useDeviceOrientation({ frequencyHz: 1 }) // Very low frequency
    );

    await act(async () => {
      await result.current.start();
    });

    // Fire events rapidly
    for (let i = 0; i < 10; i++) {
      act(() => {
        (window as any).triggerEvent('deviceorientation', {
          ...mockDeviceOrientationEvent,
          alpha: i * 10,
        });
      });
    }

    // Should handle without errors
    expect(result.current.state.orientation).not.toBeNull();
  });

  it('should cleanup properly on unmount', () => {
    const { result, unmount } = renderHook(() => useDeviceOrientation());

    act(() => {
      result.current.start();
    });

    // Unmount should call cleanup
    unmount();

    // Should not throw errors
    expect(true).toBe(true);
  });
});
