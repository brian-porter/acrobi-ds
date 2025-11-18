import * as React from 'react';
import { cva, type VariantProps } from '@acrobi/primitives';
import { cn } from '@acrobi/primitives';
import { Button } from '@acrobi/primitives';
import { Text } from '@acrobi/primitives';
import { Card } from '@acrobi/primitives';
import { Badge } from '@acrobi/primitives';
import { Switch } from '@acrobi/primitives';

/**
 * S-AuthConnectSocials variant styles using Acrobi Design System classes
 * Social media connection structure for account linking
 */
const authConnectSocialsVariants = cva(
  'auth-connect-socials w-full max-w-md mx-auto space-y-6',
  {
    variants: {
      layout: {
        default: '',
        compact: 'space-y-4',
        spacious: 'space-y-8',
      },
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      layout: 'default',
      alignment: 'center',
    },
  }
);

const authHeaderVariants = cva(
  'auth-header space-y-2',
  {
    variants: {
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      alignment: 'center',
    },
  }
);

const socialProviderCardVariants = cva(
  'social-provider-card p-4 rounded-lg border transition-all duration-200',
  {
    variants: {
      status: {
        available: 'border-border hover:border-primary/50 hover:shadow-sm',
        connected: 'border-green-200 bg-green-50',
        connecting: 'border-primary bg-primary/5',
        error: 'border-destructive bg-destructive/5',
        disabled: 'border-border bg-muted/30 opacity-60',
      },
    },
    defaultVariants: {
      status: 'available',
    },
  }
);

const socialIconVariants = cva(
  'social-icon w-8 h-8 rounded-full flex items-center justify-center',
  {
    variants: {
      provider: {
        google: 'bg-red-100 text-red-600',
        facebook: 'bg-blue-100 text-blue-600',
        twitter: 'bg-sky-100 text-sky-600',
        github: 'bg-gray-100 text-gray-800',
        linkedin: 'bg-blue-100 text-blue-700',
        apple: 'bg-gray-100 text-gray-800',
        discord: 'bg-indigo-100 text-indigo-600',
        microsoft: 'bg-blue-100 text-blue-600',
      },
    },
    defaultVariants: {
      provider: 'google',
    },
  }
);

export interface SocialProvider {
  id: string;
  name: string;
  displayName: string;
  icon: React.ReactNode;
  color: string;
  description?: string;
  benefits?: string[];
  enabled?: boolean;
  required?: boolean;
  comingSoon?: boolean;
}

export interface SocialConnection {
  providerId: string;
  connected: boolean;
  connecting?: boolean;
  error?: string;
  accountInfo?: {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
  };
}

export interface AuthConnectSocialsData {
  connections: Record<string, SocialConnection>;
  shareProfile?: boolean;
  importContacts?: boolean;
  syncData?: boolean;
  skipSocials?: boolean;
}

export interface AuthConnectSocialsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof authConnectSocialsVariants> {
  /**
   * Current social connections data
   */
  data?: Partial<AuthConnectSocialsData>;
  /**
   * Available social providers
   */
  providers?: SocialProvider[];
  /**
   * Callback when connections data changes
   */
  onChange?: (data: Partial<AuthConnectSocialsData>) => void;
  /**
   * Callback when connecting to a provider
   */
  onConnect?: (providerId: string) => void | Promise<void>;
  /**
   * Callback when disconnecting from a provider
   */
  onDisconnect?: (providerId: string) => void | Promise<void>;
  /**
   * Callback when user chooses to continue
   */
  onContinue?: (data: AuthConnectSocialsData) => void | Promise<void>;
  /**
   * Callback when user chooses to skip
   */
  onSkip?: () => void;
  /**
   * Whether form is in loading state
   */
  loading?: boolean;
  /**
   * Custom header content
   */
  header?: React.ReactNode;
  /**
   * Custom footer content
   */
  footer?: React.ReactNode;
  /**
   * Whether to allow skipping this step
   */
  allowSkip?: boolean;
  /**
   * Whether to show privacy settings
   */
  showPrivacySettings?: boolean;
  /**
   * Custom benefits text
   */
  benefitsText?: string[];
  /**
   * Whether to show connection benefits for each provider
   */
  showProviderBenefits?: boolean;
}

/**
 * S-AuthConnectSocials - Social media connection structure
 *
 * This structure allows users to connect their social media accounts for
 * enhanced functionality like importing contacts, sharing profiles, and
 * simplified authentication. It provides clear privacy controls and benefits.
 *
 * Key features:
 * - Multiple social provider support
 * - OAuth connection flow integration
 * - Privacy settings and data control
 * - Connection status management
 * - Provider-specific benefits messaging
 * - Option to skip social connections
 * - Responsive card-based provider list
 * - Accessibility-first design
 * - Error handling for failed connections
 *
 * @example
 * ```tsx
 * <SAuthConnectSocials
 *   data={socialsData}
 *   onChange={setSocialsData}
 *   onConnect={handleConnect}
 *   onDisconnect={handleDisconnect}
 *   onContinue={handleContinue}
 *   onSkip={handleSkip}
 *   loading={isConnecting}
 *   allowSkip
 *   showPrivacySettings
 *   showProviderBenefits
 *   providers={[
 *     {
 *       id: 'google',
 *       name: 'Google',
 *       displayName: 'Google Account',
 *       benefits: ['Import contacts', 'Sync calendar'],
 *       enabled: true
 *     }
 *   ]}
 * />
 * ```
 */
const SAuthConnectSocials = React.forwardRef<HTMLDivElement, AuthConnectSocialsProps>(
  (
    {
      className,
      data = {},
      providers: customProviders,
      onChange,
      onConnect,
      onDisconnect,
      onContinue,
      onSkip,
      loading = false,
      header,
      footer,
      allowSkip = true,
      showPrivacySettings = true,
      benefitsText = [
        'Import contacts to find friends and colleagues',
        'Share your profile and achievements',
        'Sign in faster with existing accounts',
        'Sync data across platforms'
      ],
      showProviderBenefits = true,
      layout = 'default',
      alignment = 'center',
      ...props
    },
    ref
  ) => {
    // Default providers if none provided
    const defaultProviders: SocialProvider[] = [
      {
        id: 'google',
        name: 'google',
        displayName: 'Google',
        color: '#db4437',
        description: 'Connect with your Google account',
        benefits: ['Import Gmail contacts', 'Sync Google Calendar', 'Use Google Drive'],
        enabled: true,
        icon: (
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        ),
      },
      {
        id: 'facebook',
        name: 'facebook',
        displayName: 'Facebook',
        color: '#1877f2',
        description: 'Connect with your Facebook account',
        benefits: ['Import Facebook friends', 'Share achievements', 'Find mutual connections'],
        enabled: true,
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        ),
      },
      {
        id: 'twitter',
        name: 'twitter',
        displayName: 'Twitter',
        color: '#1da1f2',
        description: 'Connect with your Twitter account',
        benefits: ['Import Twitter followers', 'Share posts and achievements', 'Cross-platform engagement'],
        enabled: true,
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        ),
      },
      {
        id: 'github',
        name: 'github',
        displayName: 'GitHub',
        color: '#333',
        description: 'Connect with your GitHub account',
        benefits: ['Import repositories', 'Share coding projects', 'Developer networking'],
        enabled: true,
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        ),
      },
    ];

    const providers = customProviders || defaultProviders;

    const [formData, setFormData] = React.useState<Partial<AuthConnectSocialsData>>({
      connections: {},
      shareProfile: false,
      importContacts: false,
      syncData: false,
      skipSocials: false,
      ...data,
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Initialize connections for all providers
    React.useEffect(() => {
      const initialConnections: Record<string, SocialConnection> = {};
      providers.forEach(provider => {
        initialConnections[provider.id] = {
          providerId: provider.id,
          connected: false,
          connecting: false,
          ...formData.connections?.[provider.id]
        };
      });
      
      if (Object.keys(formData.connections || {}).length === 0) {
        updateField('connections', initialConnections);
      }
    }, [providers]);

    // Update form data when data prop changes
    React.useEffect(() => {
      setFormData(prev => ({ ...prev, ...data }));
    }, [data]);

    // Update parent component when form data changes
    const updateField = (field: keyof AuthConnectSocialsData, value: any) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);
      onChange?.(newData);
    };

    // Handle provider connection
    const handleConnect = async (providerId: string) => {
      const currentConnections = formData.connections || {};
      
      // Set connecting state
      updateField('connections', {
        ...currentConnections,
        [providerId]: {
          ...currentConnections[providerId],
          connecting: true,
          error: undefined,
        }
      });

      try {
        await onConnect?.(providerId);
        
        // Simulate successful connection (in real app this would be handled by callback)
        setTimeout(() => {
          updateField('connections', {
            ...formData.connections,
            [providerId]: {
              ...currentConnections[providerId],
              connected: true,
              connecting: false,
              accountInfo: {
                id: `${providerId}_user_123`,
                name: `User via ${providers.find(p => p.id === providerId)?.displayName}`,
                email: `user@${providerId}.com`,
              }
            }
          });
        }, 1000);
        
      } catch (error) {
        // Handle connection error
        updateField('connections', {
          ...currentConnections,
          [providerId]: {
            ...currentConnections[providerId],
            connecting: false,
            error: 'Connection failed. Please try again.',
          }
        });
      }
    };

    // Handle provider disconnection
    const handleDisconnect = async (providerId: string) => {
      const currentConnections = formData.connections || {};
      
      try {
        await onDisconnect?.(providerId);
        
        updateField('connections', {
          ...currentConnections,
          [providerId]: {
            ...currentConnections[providerId],
            connected: false,
            accountInfo: undefined,
          }
        });
      } catch (error) {
        console.error('Disconnection failed:', error);
      }
    };

    // Handle continue
    const handleContinue = async () => {
      setIsSubmitting(true);
      
      try {
        await onContinue?.(formData as AuthConnectSocialsData);
      } catch (error) {
        console.error('Continue failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    // Handle skip
    const handleSkip = () => {
      updateField('skipSocials', true);
      onSkip?.();
    };

    // Get connection status for styling
    const getConnectionStatus = (providerId: string) => {
      const connection = formData.connections?.[providerId];
      if (!connection) return 'available';
      if (connection.connecting) return 'connecting';
      if (connection.error) return 'error';
      if (connection.connected) return 'connected';
      return 'available';
    };

    // Get provider icon variant
    const getProviderVariant = (providerId: string): keyof typeof socialIconVariants.variants.provider => {
      return (socialIconVariants.variants.provider as any)[providerId] ? providerId as any : 'google';
    };

    const actualLoading = loading || isSubmitting;
    const connectedCount = Object.values(formData.connections || {}).filter(c => c.connected).length;

    return (
      <div
        ref={ref}
        className={cn(authConnectSocialsVariants({ layout, alignment }), className)}
        {...props}
      >
        {/* Header */}
        {header || (
          <div className={cn(authHeaderVariants({ alignment }))}>
            <h1 className="text-2xl font-bold text-foreground">Connect Your Accounts</h1>
            <p className="text-muted-foreground">
              Link your social accounts for a richer experience
            </p>
          </div>
        )}

        {/* Benefits Section */}
        <div className="space-y-4">
          <Text size="sm" weight="medium" color="foreground">
            Why connect your accounts?
          </Text>
          <ul className="space-y-2">
            {benefitsText.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <svg className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Providers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Text size="sm" weight="medium" color="foreground">
              Available Connections
            </Text>
            {connectedCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {connectedCount} connected
              </Badge>
            )}
          </div>
          
          <div className="space-y-3">
            {providers.map((provider) => {
              const connection = formData.connections?.[provider.id];
              const status = getConnectionStatus(provider.id);
              
              return (
                <div
                  key={provider.id}
                  className={cn(socialProviderCardVariants({ status }))}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(socialIconVariants({ provider: getProviderVariant(provider.id) }))}>
                        {provider.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Text size="sm" weight="medium" color="foreground">
                            {provider.displayName}
                          </Text>
                          {connection?.connected && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              Connected
                            </Badge>
                          )}
                          {provider.comingSoon && (
                            <Badge variant="outline" className="text-xs">
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                        {provider.description && (
                          <Text size="xs" color="muted">
                            {provider.description}
                          </Text>
                        )}
                        {connection?.accountInfo && (
                          <Text size="xs" color="muted">
                            Connected as {connection.accountInfo.name}
                          </Text>
                        )}
                        {connection?.error && (
                          <Text size="xs" color="destructive">
                            {connection.error}
                          </Text>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {connection?.connecting && (
                        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                      )}
                      
                      {connection?.connected ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDisconnect(provider.id)}
                          disabled={actualLoading}
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button
                          variant={provider.comingSoon ? "outline" : "default"}
                          size="sm"
                          onClick={() => handleConnect(provider.id)}
                          disabled={actualLoading || provider.comingSoon || !provider.enabled}
                          loading={connection?.connecting}
                        >
                          {provider.comingSoon ? 'Soon' : 'Connect'}
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Provider Benefits */}
                  {showProviderBenefits && provider.benefits && provider.benefits.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <div className="flex flex-wrap gap-1">
                        {provider.benefits.map((benefit, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Privacy Settings */}
        {showPrivacySettings && (
          <div className="space-y-4 p-4 rounded-lg border bg-muted/20">
            <Text size="sm" weight="medium" color="foreground">
              Privacy Settings
            </Text>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Text size="sm" color="foreground">Import contacts</Text>
                  <Text size="xs" color="muted">Find friends and colleagues</Text>
                </div>
                <Switch
                  checked={formData.importContacts || false}
                  onCheckedChange={(checked) => updateField('importContacts', checked)}
                  disabled={actualLoading}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Text size="sm" color="foreground">Share profile</Text>
                  <Text size="xs" color="muted">Allow others to find you</Text>
                </div>
                <Switch
                  checked={formData.shareProfile || false}
                  onCheckedChange={(checked) => updateField('shareProfile', checked)}
                  disabled={actualLoading}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Text size="sm" color="foreground">Sync data</Text>
                  <Text size="xs" color="muted">Keep information up to date</Text>
                </div>
                <Switch
                  checked={formData.syncData || false}
                  onCheckedChange={(checked) => updateField('syncData', checked)}
                  disabled={actualLoading}
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            onClick={handleContinue}
            disabled={actualLoading}
            loading={actualLoading}
            className="w-full"
          >
            {actualLoading ? 'Saving...' : 
             connectedCount > 0 ? `Continue with ${connectedCount} connection${connectedCount > 1 ? 's' : ''}` :
             'Continue without connections'}
          </Button>

          {allowSkip && (
            <button
              type="button"
              onClick={handleSkip}
              disabled={actualLoading}
              className="w-full text-sm text-muted-foreground hover:text-foreground underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Skip for now
            </button>
          )}
        </div>

        {/* Privacy Note */}
        <div className="text-center">
          <Text size="xs" color="muted">
            🔒 Your privacy is important. You can disconnect any account at any time in your settings.
          </Text>
        </div>

        {/* Footer */}
        {footer}
      </div>
    );
  }
);

SAuthConnectSocials.displayName = 'SAuthConnectSocials';

export { SAuthConnectSocials, authConnectSocialsVariants, authHeaderVariants, socialProviderCardVariants, socialIconVariants };
export type { AuthConnectSocialsData, SocialProvider, SocialConnection };