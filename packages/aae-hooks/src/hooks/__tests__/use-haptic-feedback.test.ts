import { renderHook, act } from '@testing-library/react';
import { useHapticFeedback } from '../use-haptic-feedback';

// Mock Navigator API
const mockVibrate = jest.fn();
const mockGetBattery = jest.fn();

Object.defineProperty(global.navigator, 'vibrate', {
  value: mockVibrate,
  writable: true,
});

Object.defineProperty(global.navigator, 'getBattery', {
  value: mockGetBattery,
  writable: true,
});

// Mock battery manager
const createMockBattery = (level = 1, charging = false) => ({
  level,
  charging,
  chargingTime: Infinity,
  dischargingTime: Infinity,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
});

// Mock user agent for device detection
const originalUserAgent = navigator.userAgent;

describe('useHapticFeedback', () => {
  beforeEach(() => {
    mockVibrate.mockClear();
    mockGetBattery.mockClear();
    mockVibrate.mockReturnValue(true);
    mockGetBattery.mockResolvedValue(createMockBattery());

    // Set default user agent to mobile
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    });
  });

  describe('Initialization', () => {
    it('should initialize with correct default state', async () => {
      const { result } = renderHook(() => useHapticFeedback());

      expect(result.current.state.isSupported).toBe(true);
      expect(result.current.state.isEnabled).toBe(true);
      expect(result.current.state.deviceType).toBe('mobile');
      expect(result.current.state.isVibrating).toBe(false);
      expect(result.current.state.vibrationCount).toBe(0);
      expect(result.current.error).toBe(null);
    });

    it('should detect device types correctly', () => {
      // Test mobile detection
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        configurable: true,
      });
      let { result } = renderHook(() => useHapticFeedback());
      expect(result.current.state.deviceType).toBe('mobile');

      // Test tablet detection
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)',
        configurable: true,
      });
      ({ result } = renderHook(() => useHapticFeedback()));
      expect(result.current.state.deviceType).toBe('tablet');

      // Test desktop detection
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        configurable: true,
      });
      ({ result } = renderHook(() => useHapticFeedback()));
      expect(result.current.state.deviceType).toBe('desktop');
    });

    it('should handle missing vibration API', () => {
      // @ts-ignore
      delete navigator.vibrate;

      const { result } = renderHook(() => useHapticFeedback());
      expect(result.current.state.isSupported).toBe(false);
      expect(result.current.state.canVibrate).toBe(false);
    });
  });

  describe('Basic Vibration', () => {
    it('should vibrate with number pattern', async () => {
      const { result } = renderHook(() => useHapticFeedback());

      await act(async () => {
        const success = await result.current.vibrate(100);
        expect(success).toBe(true);
      });

      expect(mockVibrate).toHaveBeenCalledWith(100);
      expect(result.current.state.isVibrating).toBe(true);
      expect(result.current.state.vibrationCount).toBe(1);
    });

    it('should vibrate with array pattern', async () => {
      const { result } = renderHook(() => useHapticFeedback());
      const pattern = [100, 50, 100];

      await act(async () => {
        const success = await result.current.vibrate(pattern);
        expect(success).toBe(true);
      });

      expect(mockVibrate).toHaveBeenCalledWith(pattern);
    });

    it('should stop vibration', () => {
      const { result } = renderHook(() => useHapticFeedback());

      act(() => {
        result.current.stop();
      });

      expect(mockVibrate).toHaveBeenCalledWith(0);
    });

    it('should handle vibration failure', async () => {
      mockVibrate.mockReturnValue(false);
      const { result } = renderHook(() => useHapticFeedback());

      await act(async () => {
        const success = await result.current.vibrate(100);
        expect(success).toBe(false);
      });
    });
  });

  describe('Pattern Management', () => {
    it('should include all default patterns', () => {
      const { result } = renderHook(() => useHapticFeedback());

      expect(result.current.patterns).toHaveProperty('light');
      expect(result.current.patterns).toHaveProperty('medium');
      expect(result.current.patterns).toHaveProperty('heavy');
      expect(result.current.patterns).toHaveProperty('success');
      expect(result.current.patterns).toHaveProperty('error');
      expect(result.current.patterns).toHaveProperty('warning');
      expect(result.current.patterns).toHaveProperty('notification');
      expect(result.current.patterns).toHaveProperty('impact');
      expect(result.current.patterns).toHaveProperty('selection');
      expect(result.current.patterns).toHaveProperty('heartbeat');
      expect(result.current.patterns).toHaveProperty('explosion');
      expect(result.current.patterns).toHaveProperty('incoming');
      expect(result.current.patterns).toHaveProperty('outgoing');
      expect(result.current.patterns).toHaveProperty('typing');
      expect(result.current.patterns).toHaveProperty('pulse');
    });

    it('should play predefined patterns', async () => {
      const { result } = renderHook(() => useHapticFeedback());

      await act(async () => {
        const success = await result.current.playPattern('success');
        expect(success).toBe(true);
      });

      expect(mockVibrate).toHaveBeenCalledWith([100, 50, 100]);
    });

    it('should create custom patterns', () => {
      const { result } = renderHook(() => useHapticFeedback());
      const customPattern = [50, 25, 50, 25, 100];

      act(() => {
        result.current.createPattern('custom', customPattern);
      });

      // Custom patterns are stored internally and can be played
      act(async () => {
        result.current.playPattern('custom');
      });
    });

    it('should remove custom patterns', () => {
      const { result } = renderHook(() => useHapticFeedback());

      act(() => {
        result.current.createPattern('temp', [100]);
      });

      act(() => {
        const removed = result.current.removePattern('temp');
        expect(removed).toBe(true);
      });

      act(() => {
        const removedAgain = result.current.removePattern('temp');
        expect(removedAgain).toBe(false);
      });
    });
  });

  describe('Predefined Feedback Methods', () => {
    it('should execute success feedback', async () => {
      const { result } = renderHook(() => useHapticFeedback());

      await act(async () => {
        await result.current.success();
      });

      expect(mockVibrate).toHaveBeenCalledWith([100, 50, 100]);
    });

    it('should execute error feedback', async () => {
      const { result } = renderHook(() => useHapticFeedback());

      await act(async () => {
        await result.current.error();
      });

      expect(mockVibrate).toHaveBeenCalledWith([200, 100, 200, 100, 200]);
    });

    it('should execute warning feedback', async () => {
      const { result } = renderHook(() => useHapticFeedback());

      await act(async () => {
        await result.current.warning();
      });

      expect(mockVibrate).toHaveBeenCalledWith([150, 75, 150]);
    });

    it('should execute notification feedback', async () => {
      const { result } = renderHook(() => useHapticFeedback());

      await act(async () => {
        await result.current.notification();
      });

      expect(mockVibrate).toHaveBeenCalledWith([100, 100, 100]);
    });

    it('should execute basic intensity feedbacks', async () => {
      const { result } = renderHook(() => useHapticFeedback());

      await act(async () => {
        await result.current.light();
      });
      expect(mockVibrate).toHaveBeenCalledWith([50]);

      await act(async () => {
        await result.current.medium();
      });
      expect(mockVibrate).toHaveBeenCalledWith([100]);

      await act(async () => {
        await result.current.heavy();
      });
      expect(mockVibrate).toHaveBeenCalledWith([200]);
    });

    it('should execute game feedback methods', async () => {
      const { result } = renderHook(() => useHapticFeedback());

      await act(async () => {
        await result.current.impact();
      });
      expect(mockVibrate).toHaveBeenCalledWith([10, 10, 50]);

      await act(async () => {
        await result.current.selection();
      });
      expect(mockVibrate).toHaveBeenCalledWith([25]);
    });
  });

  describe('Intensity Control', () => {
    it('should adjust vibration intensity', async () => {
      const { result } = renderHook(() => useHapticFeedback());

      act(() => {
        result.current.setIntensity(0.5);
      });

      await act(async () => {
        await result.current.vibrate(100);
      });

      expect(mockVibrate).toHaveBeenCalledWith(50);
    });

    it('should handle zero intensity', async () => {
      const { result } = renderHook(() => useHapticFeedback());

      act(() => {
        result.current.setIntensity(0);
      });

      await act(async () => {
        await result.current.vibrate(100);
      });

      expect(mockVibrate).toHaveBeenCalledWith([]);
    });

    it('should clamp intensity values', () => {
      const { result } = renderHook(() => useHapticFeedback());

      act(() => {
        result.current.setIntensity(-0.5);
      });

      act(async () => {
        await result.current.vibrate(100);
      });
      expect(mockVibrate).toHaveBeenCalledWith([]);

      act(() => {
        result.current.setIntensity(1.5);
      });

      act(async () => {
        await result.current.vibrate(100);
      });
      expect(mockVibrate).toHaveBeenCalledWith(100);
    });
  });

  describe('Enable/Disable Control', () => {
    it('should enable and disable vibration', () => {
      const { result } = renderHook(() => useHapticFeedback());

      act(() => {
        result.current.disable();
      });
      expect(result.current.state.isEnabled).toBe(false);
      expect(result.current.state.canVibrate).toBe(false);

      act(() => {
        result.current.enable();
      });
      expect(result.current.state.isEnabled).toBe(true);
    });

    it('should toggle vibration state', () => {
      const { result } = renderHook(() => useHapticFeedback());

      const initialState = result.current.state.isEnabled;

      act(() => {
        result.current.toggle();
      });
      expect(result.current.state.isEnabled).toBe(!initialState);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.state.isEnabled).toBe(initialState);
    });

    it('should not vibrate when disabled', async () => {
      const { result } = renderHook(() => useHapticFeedback());

      act(() => {
        result.current.disable();
      });

      await act(async () => {
        const success = await result.current.vibrate(100);
        expect(success).toBe(false);
      });

      expect(mockVibrate).not.toHaveBeenCalled();
    });
  });

  describe('Battery Integration', () => {
    it('should handle battery information', async () => {
      const mockBattery = createMockBattery(0.5, true);
      mockGetBattery.mockResolvedValue(mockBattery);

      const { result } = renderHook(() => useHapticFeedback());

      await act(async () => {
        const batteryInfo = await result.current.getBatteryInfo();
        expect(batteryInfo).toEqual({ level: 0.5, charging: true });
      });
    });

    it('should respect low battery level', async () => {
      const mockBattery = createMockBattery(0.1, false); // Low battery
      mockGetBattery.mockResolvedValue(mockBattery);

      const onBatteryLow = jest.fn();
      const { result } = renderHook(() =>
        useHapticFeedback({
          respectBatteryLevel: true,
          minBatteryLevel: 0.2,
          onBatteryLow,
        })
      );

      // Wait for battery info to be loaded
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      await act(async () => {
        const success = await result.current.vibrate(100);
        expect(success).toBe(false);
      });

      expect(result.current.state.isLowBattery).toBe(true);
      expect(result.current.error?.type).toBe('battery_low');
      expect(onBatteryLow).toHaveBeenCalledWith(0.1);
    });

    it('should handle missing battery API', async () => {
      // @ts-ignore
      delete navigator.getBattery;

      const { result } = renderHook(() => useHapticFeedback());

      await act(async () => {
        const batteryInfo = await result.current.getBatteryInfo();
        expect(batteryInfo).toBe(null);
      });
    });
  });

  describe('Rate Limiting', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should rate limit excessive vibrations', async () => {
      const { result } = renderHook(() =>
        useHapticFeedback({ maxFrequency: 2 })
      );

      // First two vibrations should succeed
      await act(async () => {
        await result.current.vibrate(10);
        await result.current.vibrate(10);
      });

      expect(mockVibrate).toHaveBeenCalledTimes(2);

      // Third vibration should be rate limited
      await act(async () => {
        const success = await result.current.vibrate(10);
        expect(success).toBe(false);
      });

      expect(result.current.error?.type).toBe('rate_limited');
    });

    it('should respect cooldown time', async () => {
      const { result } = renderHook(() =>
        useHapticFeedback({ cooldownTime: 100 })
      );

      await act(async () => {
        await result.current.vibrate(10);
      });

      // Immediate second vibration should fail
      await act(async () => {
        const success = await result.current.vibrate(10);
        expect(success).toBe(false);
      });

      // After cooldown, should succeed
      act(() => {
        jest.advanceTimersByTime(100);
      });

      await act(async () => {
        const success = await result.current.vibrate(10);
        expect(success).toBe(true);
      });
    });

    it('should report remaining cooldown time', async () => {
      const { result } = renderHook(() =>
        useHapticFeedback({ cooldownTime: 100 })
      );

      await act(async () => {
        await result.current.vibrate(10);
      });

      expect(result.current.getRemainingCooldown()).toBeGreaterThan(0);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      expect(result.current.getRemainingCooldown()).toBe(0);
    });
  });

  describe('Pattern Validation', () => {
    it('should validate number patterns', async () => {
      const { result } = renderHook(() => useHapticFeedback());

      // Valid pattern
      await act(async () => {
        const success = await result.current.vibrate(100);
        expect(success).toBe(true);
      });

      // Invalid negative pattern
      await act(async () => {
        const success = await result.current.vibrate(-100);
        expect(success).toBe(false);
      });

      expect(result.current.error?.type).toBe('invalid_pattern');
    });

    it('should validate array patterns', async () => {
      const { result } = renderHook(() => useHapticFeedback());

      // Valid array pattern
      await act(async () => {
        const success = await result.current.vibrate([100, 50, 100]);
        expect(success).toBe(true);
      });

      // Invalid array with negative values
      await act(async () => {
        const success = await result.current.vibrate([100, -50, 100]);
        expect(success).toBe(false);
      });

      expect(result.current.error?.type).toBe('invalid_pattern');
    });

    it('should enforce maximum duration', async () => {
      const { result } = renderHook(() =>
        useHapticFeedback({ maxDuration: 1000 })
      );

      await act(async () => {
        const success = await result.current.vibrate(2000); // Exceeds max
        expect(success).toBe(false);
      });

      expect(result.current.error?.type).toBe('invalid_pattern');
      expect(result.current.error?.message).toContain('exceeds maximum');
    });
  });

  describe('Callbacks', () => {
    it('should call vibration start callback', async () => {
      const onVibrationStart = jest.fn();
      const { result } = renderHook(() =>
        useHapticFeedback({ onVibrationStart })
      );

      await act(async () => {
        await result.current.playPattern('success');
      });

      expect(onVibrationStart).toHaveBeenCalledWith('success', 250); // 100+50+100
    });

    it('should call vibration end callback', async () => {
      jest.useFakeTimers();

      const onVibrationEnd = jest.fn();
      const { result } = renderHook(() =>
        useHapticFeedback({ onVibrationEnd })
      );

      await act(async () => {
        await result.current.vibrate(100);
      });

      act(() => {
        jest.advanceTimersByTime(100);
      });

      expect(onVibrationEnd).toHaveBeenCalledWith('custom');

      jest.useRealTimers();
    });

    it('should call error callback', async () => {
      const onError = jest.fn();
      const { result } = renderHook(() => useHapticFeedback({ onError }));

      await act(async () => {
        await result.current.vibrate(-100); // Invalid pattern
      });

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'invalid_pattern',
          message: expect.any(String),
        })
      );
    });
  });

  describe('Custom Configuration', () => {
    it('should use custom default patterns', () => {
      const customPatterns = {
        success: [200, 100, 200],
      };

      const { result } = renderHook(() =>
        useHapticFeedback({ defaultPatterns: customPatterns })
      );

      expect(result.current.patterns.success).toEqual([200, 100, 200]);
    });

    it('should initialize with custom patterns', async () => {
      const customPatterns = {
        myPattern: [50, 25, 50],
      };

      const { result } = renderHook(() =>
        useHapticFeedback({ customPatterns })
      );

      await act(async () => {
        const success = await result.current.playPattern('myPattern');
        expect(success).toBe(true);
      });

      expect(mockVibrate).toHaveBeenCalledWith([50, 25, 50]);
    });

    it('should initialize with disabled state', () => {
      const { result } = renderHook(() =>
        useHapticFeedback({ enabled: false })
      );

      expect(result.current.state.isEnabled).toBe(false);
      expect(result.current.state.canVibrate).toBe(false);
    });
  });
});
