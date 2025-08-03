import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from './primitives/button';

const meta: Meta = {
  title: 'BlueQueue Theme/Webflow Matching Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'BlueQueue theme components styled to exactly match the Webflow design system at https://bluequeue.webflow.io/ds/c1. Select "BlueQueue (Webflow)" theme from the toolbar to see the exact match.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BlueQueueButtonShowcase: Story = {
  render: () => (
    <div data-theme="bluequeue" style={{ padding: '32px', minHeight: '100vh', backgroundColor: 'rgb(255, 254, 255)' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '400', 
          fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
          color: 'rgb(29, 28, 26)',
          marginBottom: '16px',
          lineHeight: '1.2'
        }}>
          BlueQueue Design System
        </h1>
        <p style={{ 
          fontSize: '14px', 
          fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
          color: 'rgb(109, 109, 109)',
          marginBottom: '8px',
          lineHeight: '1.4'
        }}>
          Exact match to Webflow components at https://bluequeue.webflow.io/ds/c1
        </p>
        <p style={{ 
          fontSize: '12px', 
          fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
          color: 'rgb(109, 109, 109)',
          lineHeight: '1.4'
        }}>
          💡 Select "BlueQueue (Webflow)" theme from the Storybook toolbar to see the styling
        </p>
      </div>

      {/* Button Types */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '400',
          fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
          color: 'rgb(29, 28, 26)',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          Button Types
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
          gap: '24px', 
          marginBottom: '32px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <button className="btn" data-btn-style="pf" data-btn-size="m">
              Prime Filled
            </button>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)',
              marginTop: '8px',
              lineHeight: '1.4'
            }}>
              Primary Button
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button className="btn" data-btn-style="pl" data-btn-size="m">
              Prime Line
            </button>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)',
              marginTop: '8px',
              lineHeight: '1.4'
            }}>
              Primary Outline
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button className="btn" data-btn-style="pt" data-btn-size="m">
              Prime Text
            </button>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)',
              marginTop: '8px',
              lineHeight: '1.4'
            }}>
              Primary Text
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button className="btn" data-btn-style="nf" data-btn-size="m">
              Neutral Filled
            </button>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)',
              marginTop: '8px',
              lineHeight: '1.4'
            }}>
              Neutral Button
            </div>
          </div>
        </div>
      </div>

      {/* Button Sizes */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '400',
          fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
          color: 'rgb(29, 28, 26)',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          Button Sizes
        </h3>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '16px', 
          flexWrap: 'wrap',
          marginBottom: '16px'
        }}>
          <button className="btn" data-btn-style="pf" data-btn-size="xs">
            Extra Small
          </button>
          <button className="btn" data-btn-style="pf" data-btn-size="s">
            Small
          </button>
          <button className="btn" data-btn-style="pf" data-btn-size="m">
            Medium
          </button>
          <button className="btn" data-btn-style="pf" data-btn-size="l">
            Large
          </button>
        </div>
        
        <div style={{ 
          fontSize: '12px', 
          fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
          color: 'rgb(109, 109, 109)',
          lineHeight: '1.4'
        }}>
          24px • 32px • 36px • 48px heights
        </div>
      </div>

      {/* Color Palette */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '400',
          fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
          color: 'rgb(29, 28, 26)',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          Color Palette
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
              borderRadius: '8px',
              margin: '0 auto 8px auto',
              border: '1px solid rgb(240, 240, 240)'
            }}></div>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(29, 28, 26)',
              fontWeight: '500',
              marginBottom: '4px'
            }}>
              Primary
            </div>
            <div style={{ 
              fontSize: '11px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)'
            }}>
              rgb(48, 47, 44)
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: 'rgb(196, 196, 196)', 
              borderRadius: '8px',
              margin: '0 auto 8px auto',
              border: '1px solid rgb(240, 240, 240)'
            }}></div>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(29, 28, 26)',
              fontWeight: '500',
              marginBottom: '4px'
            }}>
              Neutral
            </div>
            <div style={{ 
              fontSize: '11px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)'
            }}>
              rgb(196, 196, 196)
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: 'rgb(255, 254, 255)', 
              borderRadius: '8px',
              margin: '0 auto 8px auto',
              border: '1px solid rgb(196, 196, 196)'
            }}></div>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(29, 28, 26)',
              fontWeight: '500',
              marginBottom: '4px'
            }}>
              Background
            </div>
            <div style={{ 
              fontSize: '11px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)'
            }}>
              rgb(255, 254, 255)
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: 'rgb(25, 117, 240)', 
              borderRadius: '8px',
              margin: '0 auto 8px auto',
              border: '1px solid rgb(240, 240, 240)'
            }}></div>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(29, 28, 26)',
              fontWeight: '500',
              marginBottom: '4px'
            }}>
              Accent
            </div>
            <div style={{ 
              fontSize: '11px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)'
            }}>
              rgb(25, 117, 240)
            </div>
          </div>
        </div>
      </div>

      {/* Typography Scale */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '400',
          fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
          color: 'rgb(29, 28, 26)',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          Typography
        </h3>
        
        <div style={{ marginBottom: '16px' }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '400',
            fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
            color: 'rgb(29, 28, 26)',
            marginBottom: '8px',
            lineHeight: '1.2'
          }}>
            Heading 32px
          </h1>
          <div style={{ 
            fontSize: '12px', 
            fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
            color: 'rgb(109, 109, 109)'
          }}>
            Inter, 32px, 400 weight
          </div>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <p style={{ 
            fontSize: '14px', 
            fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
            color: 'rgb(29, 28, 26)',
            marginBottom: '8px',
            lineHeight: '1.4'
          }}>
            Body text 14px - The quick brown fox jumps over the lazy dog
          </p>
          <div style={{ 
            fontSize: '12px', 
            fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
            color: 'rgb(109, 109, 109)'
          }}>
            Inter, 14px, 400 weight
          </div>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <span style={{ 
            fontSize: '12px', 
            fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
            color: 'rgb(29, 28, 26)',
            marginBottom: '8px',
            lineHeight: '1.4'
          }}>
            Button text 12px - Click here
          </span>
          <div style={{ 
            fontSize: '12px', 
            fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
            color: 'rgb(109, 109, 109)'
          }}>
            Inter, 12px, 400 weight
          </div>
        </div>
      </div>

      {/* Form Elements */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '400',
          fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
          color: 'rgb(29, 28, 26)',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          Form Elements
        </h3>
        
        <div style={{ maxWidth: '300px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block',
              fontSize: '12px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(29, 28, 26)',
              marginBottom: '4px',
              lineHeight: '1.4'
            }}>
              Text Input
            </label>
            <input 
              type="text" 
              placeholder="Enter text here..."
              style={{
                width: '100%',
                fontSize: '16px',
                fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
                padding: '8px 12px',
                border: '1px solid rgb(196, 196, 196)',
                borderRadius: '4px',
                backgroundColor: 'rgb(255, 254, 255)',
                color: 'rgb(29, 28, 26)',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block',
              fontSize: '12px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(29, 28, 26)',
              marginBottom: '4px',
              lineHeight: '1.4'
            }}>
              Textarea
            </label>
            <textarea 
              placeholder="Enter multiple lines..."
              rows={3}
              style={{
                width: '100%',
                fontSize: '16px',
                fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
                padding: '8px 12px',
                border: '1px solid rgb(196, 196, 196)',
                borderRadius: '4px',
                backgroundColor: 'rgb(255, 254, 255)',
                color: 'rgb(29, 28, 26)',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '400',
          fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
          color: 'rgb(29, 28, 26)',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          Card Components
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px'
        }}>
          <div style={{
            backgroundColor: 'rgb(255, 254, 255)',
            border: '1px solid rgb(240, 240, 240)',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
          }}>
            <h4 style={{ 
              fontSize: '16px', 
              fontWeight: '400',
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(29, 28, 26)',
              marginBottom: '8px',
              lineHeight: '1.2'
            }}>
              Card Title
            </h4>
            <p style={{ 
              fontSize: '14px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)',
              marginBottom: '16px',
              lineHeight: '1.4'
            }}>
              Card description text that explains the content.
            </p>
            <button className="btn" data-btn-style="pl" data-btn-size="s">
              Action
            </button>
          </div>
          
          <div style={{
            backgroundColor: 'rgb(255, 254, 255)',
            border: '1px solid rgb(240, 240, 240)',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
          }}>
            <h4 style={{ 
              fontSize: '16px', 
              fontWeight: '400',
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(29, 28, 26)',
              marginBottom: '8px',
              lineHeight: '1.2'
            }}>
              Another Card
            </h4>
            <p style={{ 
              fontSize: '14px', 
              fontFamily: '"Inter", "SF Pro", Arial, sans-serif',
              color: 'rgb(109, 109, 109)',
              marginBottom: '16px',
              lineHeight: '1.4'
            }}>
              More card content with consistent styling.
            </p>
            <button className="btn" data-btn-style="pf" data-btn-size="s">
              Primary
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    theme: {
      default: 'bluequeue-light'
    }
  }
};