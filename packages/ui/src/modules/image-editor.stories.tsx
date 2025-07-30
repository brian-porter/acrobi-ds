/**
 * Image Editor Module Stories
 * Epic 53 - AAE Image Editing
 *
 * Comprehensive Storybook stories demonstrating image editing capabilities
 * with different configurations and use cases.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ImageEditor } from './image-editor';
import { ImageEditorProps } from './image-editor';

const meta: Meta<ImageEditorProps> = {
  title: '6. Modules/ImageEditor',
  component: ImageEditor,
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive image editing module with canvas-based manipulation capabilities including scaling, rotation, color adjustments, and export functionality.',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable all editor controls',
    },
    showAdvancedControls: {
      control: 'boolean',
      description: 'Show advanced color adjustment controls',
    },
    maxCanvasWidth: {
      control: { type: 'number', min: 500, max: 4000, step: 100 },
      description: 'Maximum canvas width in pixels',
    },
    maxCanvasHeight: {
      control: { type: 'number', min: 500, max: 4000, step: 100 },
      description: 'Maximum canvas height in pixels',
    },
    defaultQuality: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
      description: 'Default export quality for JPEG images',
    },
    enableHistory: {
      control: 'boolean',
      description: 'Enable undo/redo functionality',
    },
    maxHistoryStates: {
      control: { type: 'number', min: 5, max: 50, step: 5 },
      description: 'Maximum number of history states',
    },
    enableKeyboardShortcuts: {
      control: 'boolean',
      description: 'Enable keyboard shortcuts for common actions',
    },
  },
};

export default meta;
type Story = StoryObj<ImageEditorProps>;

// Basic Image Editor Story
export const BasicImageEditor: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Basic image editor with all default settings. Load an image and use the transform controls to edit it. Includes scaling, rotation, flips, and color adjustments.',
      },
    },
  },
};

// Advanced Image Editor Story
export const AdvancedImageEditor: Story = {
  args: {
    showAdvancedControls: true,
    enableHistory: true,
    maxHistoryStates: 30,
    enableKeyboardShortcuts: true,
    maxCanvasWidth: 2048,
    maxCanvasHeight: 1536,
    defaultQuality: 0.95,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Advanced image editor with all features enabled including extended history, high-resolution support, and premium export quality.',
      },
    },
  },
};

// Simple Image Editor Story
export const SimpleImageEditor: Story = {
  args: {
    showAdvancedControls: false,
    enableHistory: false,
    enableKeyboardShortcuts: false,
    maxCanvasWidth: 1200,
    maxCanvasHeight: 800,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Simplified image editor with basic controls only. Perfect for simple image transformations without advanced features.',
      },
    },
  },
};

// Mobile Image Editor Story
export const MobileImageEditor: Story = {
  args: {
    showAdvancedControls: true,
    enableHistory: true,
    maxHistoryStates: 10,
    enableKeyboardShortcuts: false, // Disabled for mobile
    maxCanvasWidth: 1080,
    maxCanvasHeight: 1920,
    defaultQuality: 0.85,
    style: {
      maxWidth: '100%',
      margin: '0 auto',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Mobile-optimized image editor with touch-friendly controls, reduced history states, and mobile-appropriate canvas dimensions.',
      },
    },
  },
};

// High Performance Image Editor Story
export const HighPerformanceImageEditor: Story = {
  args: {
    showAdvancedControls: true,
    enableHistory: true,
    maxHistoryStates: 50,
    enableKeyboardShortcuts: true,
    maxCanvasWidth: 4096,
    maxCanvasHeight: 4096,
    defaultQuality: 1.0,
    onImageEdit: transforms => {
      console.log('Image edited:', transforms);
    },
    onImageSave: (blob, filename) => {
      console.log('Image saved:', { filename, size: blob.size });
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'High-performance image editor for professional use with 4K support, maximum quality settings, and comprehensive event callbacks.',
      },
    },
  },
};

// Constrained Image Editor Story
export const ConstrainedImageEditor: Story = {
  args: {
    showAdvancedControls: false,
    enableHistory: true,
    maxHistoryStates: 5,
    enableKeyboardShortcuts: true,
    maxCanvasWidth: 800,
    maxCanvasHeight: 600,
    defaultQuality: 0.7,
    style: {
      border: '2px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: '#fafafa',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Constrained image editor with limited canvas size, reduced quality, and minimal history for resource-limited environments.',
      },
    },
  },
};

// Disabled Image Editor Story
export const DisabledImageEditor: Story = {
  args: {
    disabled: true,
    showAdvancedControls: true,
    enableHistory: true,
    enableKeyboardShortcuts: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Disabled image editor demonstrating the disabled state. All controls are non-interactive but the interface remains visible.',
      },
    },
  },
};

// Custom Styled Image Editor Story
export const CustomStyledImageEditor: Story = {
  args: {
    showAdvancedControls: true,
    enableHistory: true,
    enableKeyboardShortcuts: true,
    className: 'custom-image-editor',
    style: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      border: '3px solid #007bff',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom styled image editor with custom CSS class and inline styles for integration into themed applications.',
      },
    },
  },
};

// Event Handling Image Editor Story
export const EventHandlingImageEditor: Story = {
  args: {
    showAdvancedControls: true,
    enableHistory: true,
    enableKeyboardShortcuts: true,
    onImageEdit: transforms => {
      // Log all transform changes
      console.log('Transform Update:', {
        scale: transforms.scale,
        rotation: transforms.rotation,
        flips: {
          horizontal: transforms.flipHorizontal,
          vertical: transforms.flipVertical,
        },
        colors: {
          brightness: transforms.brightness,
          contrast: transforms.contrast,
          saturation: transforms.saturation,
        },
      });
    },
    onImageSave: (blob, filename) => {
      // Handle image save
      console.log('Image Export:', {
        filename,
        size: `${(blob.size / (1024 * 1024)).toFixed(2)}MB`,
        type: blob.type,
        timestamp: new Date().toISOString(),
      });

      // Could upload to server, show success message, etc.
      alert(
        `Image saved: ${filename} (${(blob.size / (1024 * 1024)).toFixed(2)}MB)`
      );
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Image editor with comprehensive event handling demonstrating how to respond to image edits and save operations.',
      },
    },
  },
};
