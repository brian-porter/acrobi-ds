import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from './primitives/button';

const meta: Meta = {
  title: 'Webflow Matching/Component Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Components styled to exactly match the Webflow design system at https://bluequeue.webflow.io/ds/c1. Features SF Pro typography, exact color matching, and identical spacing.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WebflowButtonShowcase: Story = {
  render: () => (
    <div style={{ padding: '32px', fontFamily: '"SF Pro", Arial, sans-serif' }}>
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '400', 
          fontFamily: '"SF Pro", Arial, sans-serif',
          color: 'rgb(29, 28, 26)',
          marginBottom: '16px'
        }}>
          Webflow Design System Match
        </h1>
        <p style={{ 
          fontSize: '14px', 
          fontFamily: '"SF Pro", Arial, sans-serif',
          color: 'rgb(109, 109, 109)',
          marginBottom: '32px'
        }}>
          Components styled to exactly match https://bluequeue.webflow.io/ds/c1
        </p>
      </div>

      {/* Button Types - Exact Webflow Match */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '400',
          fontFamily: '"SF Pro", Arial, sans-serif',
          color: 'rgb(29, 28, 26)',
          marginBottom: '24px'
        }}>
          Button Types (Webflow Exact Match)
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: '32px', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ textAlign: 'center' }}>
            <Button type="filled" styling="prime">
              Prime Filled
            </Button>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)',
              marginTop: '8px'
            }}>
              Primary Filled
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Button type="line" styling="prime">
              Prime Line
            </Button>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)',
              marginTop: '8px'
            }}>
              Primary Line
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Button type="text" styling="prime">
              Prime Text
            </Button>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)',
              marginTop: '8px'
            }}>
              Primary Text
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Button type="filled" styling="neutral">
              Neutral Filled
            </Button>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)',
              marginTop: '8px'
            }}>
              Neutral Filled
            </div>
          </div>
        </div>
      </div>

      {/* Button Sizes - Webflow System */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '400',
          fontFamily: '"SF Pro", Arial, sans-serif',
          color: 'rgb(29, 28, 26)',
          marginBottom: '24px'
        }}>
          Button Sizes (Webflow System)
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: '32px', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ textAlign: 'center' }}>
            <Button size="xs" type="filled" styling="prime">
              XS Button
            </Button>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)',
              marginTop: '8px'
            }}>
              XS (24px)
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Button size="sm" type="filled" styling="prime">
              SM Button
            </Button>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)',
              marginTop: '8px'
            }}>
              SM (32px)
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Button size="md" type="filled" styling="prime">
              MD Button
            </Button>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)',
              marginTop: '8px'
            }}>
              MD (36px)
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Button size="lg" type="filled" styling="prime">
              LG Button
            </Button>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)',
              marginTop: '8px'
            }}>
              LG (48px)
            </div>
          </div>
        </div>
      </div>

      {/* Color System */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '400',
          fontFamily: '"SF Pro", Arial, sans-serif',
          color: 'rgb(29, 28, 26)',
          marginBottom: '24px'
        }}>
          Webflow Color System
        </h3>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '16px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'rgb(48, 47, 44)',
              borderRadius: '4px',
              margin: '0 auto 8px'
            }}></div>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)'
            }}>
              Primary<br/>rgb(48, 47, 44)
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'rgb(196, 196, 196)',
              borderRadius: '4px',
              margin: '0 auto 8px'
            }}></div>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)'
            }}>
              Neutral<br/>rgb(196, 196, 196)
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'rgb(25, 117, 240)',
              borderRadius: '4px',
              margin: '0 auto 8px'
            }}></div>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)'
            }}>
              Accent<br/>rgb(25, 117, 240)
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'rgb(109, 109, 109)',
              borderRadius: '4px',
              margin: '0 auto 8px'
            }}></div>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)'
            }}>
              Muted<br/>rgb(109, 109, 109)
            </div>
          </div>
        </div>
      </div>

      {/* Typography System */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '400',
          fontFamily: '"SF Pro", Arial, sans-serif',
          color: 'rgb(29, 28, 26)',
          marginBottom: '24px'
        }}>
          Typography System (SF Pro)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: '400',
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(29, 28, 26)',
              margin: '0'
            }}>
              Heading (32px SF Pro 400)
            </h1>
          </div>
          
          <div>
            <span style={{ 
              fontSize: '14px', 
              fontWeight: '400',
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(29, 28, 26)'
            }}>
              Body text (14px SF Pro 400)
            </span>
          </div>
          
          <div>
            <span style={{ 
              fontSize: '12px', 
              fontWeight: '400',
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)'
            }}>
              Caption text (12px SF Pro 400)
            </span>
          </div>
        </div>
      </div>

      {/* Form Elements */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '400',
          fontFamily: '"SF Pro", Arial, sans-serif',
          color: 'rgb(29, 28, 26)',
          marginBottom: '24px'
        }}>
          Form Elements (Webflow Style)
        </h3>
        <div style={{ maxWidth: '400px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              fontSize: '12px', 
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(29, 28, 26)',
              display: 'block',
              marginBottom: '4px'
            }}>
              Text Input
            </label>
            <input 
              type="text" 
              placeholder="Enter text here..."
              style={{
                fontFamily: '"SF Pro", Arial, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                padding: '8px 12px',
                border: '1px solid rgb(196, 196, 196)',
                borderRadius: '4px',
                backgroundColor: 'rgb(255, 254, 255)',
                color: 'rgb(29, 28, 26)',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              fontSize: '12px', 
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(29, 28, 26)',
              display: 'block',
              marginBottom: '4px'
            }}>
              Email Input
            </label>
            <input 
              type="email" 
              placeholder="user@example.com"
              style={{
                fontFamily: '"SF Pro", Arial, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                padding: '8px 12px',
                border: '1px solid rgb(196, 196, 196)',
                borderRadius: '4px',
                backgroundColor: 'rgb(255, 254, 255)',
                color: 'rgb(29, 28, 26)',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              fontSize: '12px', 
              fontFamily: '"SF Pro", Arial, sans-serif',
              color: 'rgb(29, 28, 26)',
              display: 'block',
              marginBottom: '4px'
            }}>
              Textarea
            </label>
            <textarea 
              placeholder="Enter longer text here..."
              rows={3}
              style={{
                fontFamily: '"SF Pro", Arial, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                padding: '8px 12px',
                border: '1px solid rgb(196, 196, 196)',
                borderRadius: '4px',
                backgroundColor: 'rgb(255, 254, 255)',
                color: 'rgb(29, 28, 26)',
                width: '100%',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>
        </div>
      </div>

      {/* Card Component */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '400',
          fontFamily: '"SF Pro", Arial, sans-serif',
          color: 'rgb(29, 28, 26)',
          marginBottom: '24px'
        }}>
          Card Component (Webflow Style)
        </h3>
        <div style={{
          backgroundColor: 'rgb(255, 254, 255)',
          border: '1px solid rgb(240, 240, 240)',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          maxWidth: '400px'
        }}>
          <h4 style={{ 
            fontSize: '16px', 
            fontWeight: '400',
            fontFamily: '"SF Pro", Arial, sans-serif',
            color: 'rgb(29, 28, 26)',
            margin: '0 0 8px 0'
          }}>
            Card Title
          </h4>
          <p style={{ 
            fontSize: '14px', 
            fontFamily: '"SF Pro", Arial, sans-serif',
            color: 'rgb(109, 109, 109)',
            margin: '0 0 16px 0'
          }}>
            This is a card component styled to match the Webflow design system exactly.
          </p>
          <Button size="sm" type="filled" styling="prime">
            Action Button
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'webflow',
      values: [
        {
          name: 'webflow',
          value: 'rgb(255, 254, 255)',
        },
      ],
    },
  },
};