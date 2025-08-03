import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { TextField } from './text-field';
import { SwitchField } from './switch-field';
import { Button } from '../primitives/button';
import { Badge } from '../primitives/badge';
import { Icon } from '../primitives/icon';

/**
 * S-SecurityForm variant styles using Acrobi Design System classes
 * Form layout structure for security settings page
 */
const sSecurityFormVariants = cva(
  'security-form space-y-6',
  {
    variants: {
      variant: {
        default: '',
        card: 'bg-card border border-border rounded-lg p-6',
        minimal: 'space-y-4',
        compact: 'space-y-3',
      },
      size: {
        sm: 'max-w-md',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const sSecuritySectionVariants = cva(
  'security-section space-y-4',
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border border-border rounded-lg p-4',
        warning: 'border-2 border-yellow-200 bg-yellow-50/50 rounded-lg p-4',
        danger: 'border-2 border-red-200 bg-red-50/50 rounded-lg p-4',
      },
      spacing: {
        tight: 'space-y-2',
        default: 'space-y-4',
        loose: 'space-y-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      spacing: 'default',
    },
  }
);

const sSecurityItemVariants = cva(
  'security-item flex items-start justify-between p-4 border border-border rounded-lg',
  {
    variants: {
      status: {
        enabled: 'bg-green-50/50 border-green-200',
        disabled: 'bg-gray-50/50 border-gray-200',
        warning: 'bg-yellow-50/50 border-yellow-200',
        error: 'bg-red-50/50 border-red-200',
      },
      interactive: {
        true: 'hover:bg-accent/50 cursor-pointer transition-colors',
        false: '',
      },
    },
    defaultVariants: {
      status: 'disabled',
      interactive: false,
    },
  }
);

export interface SecurityDevice {
  /**
   * Device identifier
   */
  id: string;
  /**
   * Device name
   */
  name: string;
  /**
   * Device type
   */
  type: 'browser' | 'mobile' | 'desktop' | 'tablet' | 'unknown';
  /**
   * Device location
   */
  location?: string;
  /**
   * Last active timestamp
   */
  lastActive: Date;
  /**
   * Whether this is the current device
   */
  current?: boolean;
  /**
   * Device operating system
   */
  os?: string;
  /**
   * Device browser
   */
  browser?: string;
}

export interface SecuritySetting {
  /**
   * Setting identifier
   */
  id: string;
  /**
   * Setting title
   */
  title: string;
  /**
   * Setting description
   */
  description: string;
  /**
   * Setting type
   */
  type: 'toggle' | 'action' | 'info' | 'password';
  /**
   * Current setting value
   */
  value?: boolean | string;
  /**
   * Whether setting is enabled
   */
  enabled?: boolean;
  /**
   * Setting status
   */
  status?: 'enabled' | 'disabled' | 'warning' | 'error';
  /**
   * Setting icon
   */
  icon?: string;
  /**
   * Whether setting is required
   */
  required?: boolean;
  /**
   * Whether setting is loading
   */
  loading?: boolean;
  /**
   * Action button configuration
   */
  action?: {
    label: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    icon?: string;
    loading?: boolean;
    disabled?: boolean;
  };
  /**
   * Setting change handler
   */
  onChange?: (value: boolean | string) => void;
  /**
   * Action click handler
   */
  onAction?: () => void;
}

export interface SecuritySection {
  /**
   * Section identifier
   */
  id: string;
  /**
   * Section title
   */
  title: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Section icon
   */
  icon?: string;
  /**
   * Section variant
   */
  variant?: 'default' | 'bordered' | 'warning' | 'danger';
  /**
   * Section settings
   */
  settings: SecuritySetting[];
  /**
   * Whether section is collapsible
   */
  collapsible?: boolean;
  /**
   * Whether section is initially collapsed
   */
  defaultCollapsed?: boolean;
}

export interface SSecurityFormProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sSecurityFormVariants> {
  /**
   * Security sections to display
   */
  sections: SecuritySection[];
  /**
   * Active devices list
   */
  devices?: SecurityDevice[];
  /**
   * Current password (for password changes)
   */
  currentPassword?: string;
  /**
   * New password (for password changes)
   */
  newPassword?: string;
  /**
   * Confirm password (for password changes)
   */
  confirmPassword?: string;
  /**
   * Form validation errors
   */
  errors?: Record<string, string>;
  /**
   * Whether form is in loading state
   */
  loading?: boolean;
  /**
   * Whether form is disabled
   */
  disabled?: boolean;
  /**
   * Password change handler
   */
  onPasswordChange?: (currentPassword: string, newPassword: string) => void;
  /**
   * Device revoke handler
   */
  onDeviceRevoke?: (deviceId: string) => void;
  /**
   * Two-factor authentication setup handler
   */
  onSetupTwoFactor?: () => void;
  /**
   * Account deletion handler
   */
  onDeleteAccount?: () => void;
  /**
   * Additional header content
   */
  header?: React.ReactNode;
  /**
   * Additional footer content
   */
  footer?: React.ReactNode;
}

/**
 * S-SecurityForm - Form layout structure for security settings page
 *
 * This structure provides a comprehensive interface for managing user security
 * settings including password changes, two-factor authentication, device management,
 * and other security-related configurations.
 *
 * Key features:
 * - Multiple security sections with different priorities (normal, warning, danger)
 * - Password change form with validation
 * - Two-factor authentication management
 * - Active device listing and management
 * - Security setting toggles and actions
 * - Visual status indicators for security levels
 * - Loading and disabled states
 * - Responsive design with proper spacing
 * - Accessibility support with proper labels and ARIA attributes
 *
 * @example
 * ```tsx
 * <SSecurityForm
 *   sections={[
 *     {
 *       id: "authentication",
 *       title: "Authentication",
 *       description: "Manage your login and authentication settings",
 *       icon: "shield",
 *       settings: [
 *         {
 *           id: "twoFactor",
 *           title: "Two-Factor Authentication",
 *           description: "Add an extra layer of security to your account",
 *           type: "action",
 *           status: "disabled",
 *           action: { label: "Setup", variant: "default" },
 *           onAction: () => console.log("Setup 2FA")
 *         }
 *       ]
 *     },
 *     {
 *       id: "privacy",
 *       title: "Privacy Settings",
 *       settings: [
 *         {
 *           id: "profileVisibility",
 *           title: "Profile Visibility",
 *           description: "Control who can see your profile",
 *           type: "toggle",
 *           value: true,
 *           onChange: (value) => console.log("Toggle privacy:", value)
 *         }
 *       ]
 *     }
 *   ]}
 *   devices={[
 *     {
 *       id: "current",
 *       name: "MacBook Pro",
 *       type: "desktop",
 *       location: "San Francisco, CA",
 *       lastActive: new Date(),
 *       current: true,
 *       os: "macOS",
 *       browser: "Chrome"
 *     }
 *   ]}
 *   onPasswordChange={(current, new_) => console.log("Change password")}
 *   onDeviceRevoke={(id) => console.log("Revoke device:", id)}
 * />
 * ```
 */
const SSecurityForm = React.forwardRef<HTMLDivElement, SSecurityFormProps>(
  (
    {
      className,
      sections = [],
      devices = [],
      currentPassword = '',
      newPassword = '',
      confirmPassword = '',
      errors = {},
      loading = false,
      disabled = false,
      onPasswordChange,
      onDeviceRevoke,
      onSetupTwoFactor,
      onDeleteAccount,
      header,
      footer,
      variant,
      size,
      ...props
    },
    ref
  ) => {
    const [collapsedSections, setCollapsedSections] = React.useState<Set<string>>(
      new Set(sections.filter(s => s.defaultCollapsed).map(s => s.id))
    );
    const [passwords, setPasswords] = React.useState({
      current: currentPassword,
      new: newPassword,
      confirm: confirmPassword,
    });

    const toggleSection = React.useCallback((sectionId: string) => {
      setCollapsedSections(prev => {
        const newSet = new Set(prev);
        if (newSet.has(sectionId)) {
          newSet.delete(sectionId);
        } else {
          newSet.add(sectionId);
        }
        return newSet;
      });
    }, []);

    const handlePasswordSubmit = React.useCallback(() => {
      if (passwords.new !== passwords.confirm) {
        return;
      }
      onPasswordChange?.(passwords.current, passwords.new);
    }, [passwords, onPasswordChange]);

    const getDeviceIcon = (type: SecurityDevice['type']) => {
      switch (type) {
        case 'mobile': return '📱';
        case 'tablet': return '📱';
        case 'desktop': return '🖥️';
        case 'browser': return '🌐';
        default: return '🔧';
      }
    };

    const formatLastActive = (date: Date) => {
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (minutes < 1) return 'Just now';
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      return `${days}d ago`;
    };

    return (
      <div
        ref={ref}
        className={cn(sSecurityFormVariants({ variant, size }), className)}
        {...props}
      >
        {header}

        {/* Password Change Section */}
        <div className={cn(sSecuritySectionVariants({ variant: 'bordered' }))}>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="lock" size="s" color="n500" />
            <h3 className="font-semibold text-base">Change Password</h3>
          </div>
          
          <div className="space-y-4">
            <TextField
              label="Current Password"
              type="password"
              value={passwords.current}
              error={errors.currentPassword}
              disabled={disabled || loading}
              onChange={(value) => setPasswords(prev => ({ ...prev, current: value }))}
              required
            />
            <TextField
              label="New Password"
              type="password"
              value={passwords.new}
              error={errors.newPassword}
              disabled={disabled || loading}
              onChange={(value) => setPasswords(prev => ({ ...prev, new: value }))}
              required
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={passwords.confirm}
              error={errors.confirmPassword || (passwords.new !== passwords.confirm ? 'Passwords do not match' : '')}
              disabled={disabled || loading}
              onChange={(value) => setPasswords(prev => ({ ...prev, confirm: value }))}
              required
            />
            <Button
              variant="default"
              onClick={handlePasswordSubmit}
              disabled={disabled || loading || !passwords.current || !passwords.new || passwords.new !== passwords.confirm}
              loading={loading}
            >
              Update Password
            </Button>
          </div>
        </div>

        {/* Security Sections */}
        <div className="space-y-6">
          {sections.map((section) => {
            const isCollapsed = collapsedSections.has(section.id);

            return (
              <div
                key={section.id}
                className={cn(sSecuritySectionVariants({ 
                  variant: section.variant,
                  spacing: 'default'
                }))}
              >
                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {section.icon && (
                      <Icon name={section.icon} size="s" color="n500" />
                    )}
                    <div>
                      <h3 className="font-semibold text-base">{section.title}</h3>
                      {section.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {section.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {section.collapsible && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSection(section.id)}
                      disabled={disabled || loading}
                    >
                      {isCollapsed ? '▼' : '▲'}
                    </Button>
                  )}
                </div>

                {/* Section Settings */}
                {!isCollapsed && (
                  <div className="space-y-3">
                    {section.settings.map((setting) => (
                      <div
                        key={setting.id}
                        className={cn(
                          sSecurityItemVariants({ 
                            status: setting.status,
                            interactive: Boolean(setting.onAction)
                          })
                        )}
                        onClick={setting.onAction}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          {setting.icon && (
                            <Icon name={setting.icon} size="s" color="n500" className="mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-sm">{setting.title}</h4>
                              {setting.required && (
                                <Badge variant="outline" className="text-xs">Required</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {setting.description}
                            </p>
                          </div>
                        </div>

                        {/* Setting Control */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {setting.type === 'toggle' && (
                            <SwitchField
                              checked={Boolean(setting.value)}
                              disabled={disabled || loading || setting.loading}
                              onChange={setting.onChange}
                              hideLabel
                            />
                          )}
                          
                          {setting.type === 'action' && setting.action && (
                            <Button
                              variant={setting.action.variant || 'outline'}
                              size="sm"
                              disabled={disabled || loading || setting.loading || setting.action.disabled}
                              loading={setting.loading || setting.action.loading}
                              onClick={(e) => {
                                e.stopPropagation();
                                setting.onAction?.();
                              }}
                            >
                              {setting.action.icon && (
                                <span className="mr-2">{setting.action.icon}</span>
                              )}
                              {setting.action.label}
                            </Button>
                          )}

                          {setting.type === 'info' && setting.status === 'enabled' && (
                            <Badge variant="secondary" className="text-xs">
                              ✓ Enabled
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active Devices Section */}
        {devices.length > 0 && (
          <div className={cn(sSecuritySectionVariants({ variant: 'bordered' }))}>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="devices" size="s" color="n500" />
              <h3 className="font-semibold text-base">Active Devices</h3>
              <Badge variant="outline" className="text-xs">{devices.length}</Badge>
            </div>

            <div className="space-y-3">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className={cn(
                    'flex items-center justify-between p-3 border border-border rounded-lg',
                    device.current && 'bg-green-50/50 border-green-200'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getDeviceIcon(device.type)}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{device.name}</span>
                        {device.current && (
                          <Badge variant="secondary" className="text-xs">Current</Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {device.location && <span>{device.location} • </span>}
                        {device.os && device.browser && (
                          <span>{device.os}, {device.browser} • </span>
                        )}
                        <span>{formatLastActive(device.lastActive)}</span>
                      </div>
                    </div>
                  </div>

                  {!device.current && (
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={disabled || loading}
                      onClick={() => onDeviceRevoke?.(device.id)}
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Danger Zone */}
        <div className={cn(sSecuritySectionVariants({ variant: 'danger' }))}>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="warning" size="s" color="red" />
            <h3 className="font-semibold text-base text-red-700">Danger Zone</h3>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-sm text-red-700">Delete Account</h4>
              <p className="text-sm text-red-600">
                Permanently delete your account and all associated data.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              disabled={disabled || loading}
              onClick={onDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </div>

        {footer}
      </div>
    );
  }
);

SSecurityForm.displayName = 'SSecurityForm';

export { SSecurityForm, sSecurityFormVariants };
export type { SecurityDevice, SecuritySetting, SecuritySection };