import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MImgEdit, type ImageEditFile } from './m-img-edit';
import { Button } from '../primitives/button';

const meta: Meta<typeof MImgEdit> = {
  title: 'Modules/M-ImgEdit',
  component: MImgEdit,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'PRD v11 Account Interface Module - Image uploading and editing workflow with comprehensive features including crop, filters, metadata, and multi-file support.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the image edit dialog',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files that can be uploaded',
    },
    maxFileSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
    allowedTypes: {
      control: 'object',
      description: 'Array of allowed MIME types',
    },
    enableCrop: {
      control: 'boolean',
      description: 'Enable image cropping functionality',
    },
    enableFilters: {
      control: 'boolean',
      description: 'Enable image filters (brightness, contrast, etc.)',
    },
    enableMetadata: {
      control: 'boolean',
      description: 'Enable metadata editing (title, description, tags)',
    },
    cropAspectRatio: {
      control: 'select',
      options: ['free', 1, 1.5, 16/9],
      description: 'Crop aspect ratio constraint',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template component for interactive stories
const InteractiveTemplate = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async (files: ImageEditFile[]) => {
    console.log('Saving files:', files);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        Open Image Editor
      </Button>
      <MImgEdit
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    size: 'md',
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    enableCrop: true,
    enableFilters: true,
    enableMetadata: true,
    cropAspectRatio: 'free',
  },
};

export const SingleImage: Story = {
  render: InteractiveTemplate,
  args: {
    ...Default.args,
    maxFiles: 1,
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration for single image upload with smaller dialog size.',
      },
    },
  },
};

export const CropOnly: Story = {
  render: InteractiveTemplate,
  args: {
    ...Default.args,
    enableFilters: false,
    enableMetadata: false,
    cropAspectRatio: 1, // Square crop
  },
  parameters: {
    docs: {
      description: {
        story: 'Simplified version with only cropping functionality enabled.',
      },
    },
  },
};

export const FiltersOnly: Story = {
  render: InteractiveTemplate,
  args: {
    ...Default.args,
    enableCrop: false,
    enableMetadata: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration focused on image filters and adjustments.',
      },
    },
  },
};

export const MetadataOnly: Story = {
  render: InteractiveTemplate,
  args: {
    ...Default.args,
    enableCrop: false,
    enableFilters: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple upload with metadata editing capabilities only.',
      },
    },
  },
};

export const LargeFiles: Story = {
  render: InteractiveTemplate,
  args: {
    ...Default.args,
    maxFiles: 10,
    maxFileSize: 50 * 1024 * 1024, // 50MB
    size: 'xl',
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration for handling larger files and more uploads.',
      },
    },
  },
};

export const RestrictedTypes: Story = {
  render: InteractiveTemplate,
  args: {
    ...Default.args,
    allowedTypes: ['image/jpeg', 'image/png'],
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },
  parameters: {
    docs: {
      description: {
        story: 'Limited to specific image formats with smaller file size limit.',
      },
    },
  },
};

export const AspectRatioFixed: Story = {
  render: InteractiveTemplate,
  args: {
    ...Default.args,
    cropAspectRatio: 16/9, // Widescreen
    enableFilters: false,
    enableMetadata: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed aspect ratio crop for consistent image dimensions.',
      },
    },
  },
};

// Documentation story showing different states
export const States: Story = {
  render: () => {
    const [uploadState, setUploadState] = useState(false);
    const [editingState, setEditingState] = useState(false);
    const [processingState, setProcessingState] = useState(false);

    return (
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-3 gap-4">
          <Button onClick={() => setUploadState(true)}>
            Upload State
          </Button>
          <Button onClick={() => setEditingState(true)}>
            Editing State
          </Button>
          <Button onClick={() => setProcessingState(true)}>
            Processing State
          </Button>
        </div>

        <MImgEdit
          isOpen={uploadState}
          onClose={() => setUploadState(false)}
          onSave={async () => {}}
          size="md"
        />

        <MImgEdit
          isOpen={editingState}
          onClose={() => setEditingState(false)}
          onSave={async () => {}}
          size="md"
          // This would normally have files pre-loaded in editing state
        />

        <MImgEdit
          isOpen={processingState}
          onClose={() => setProcessingState(false)}
          onSave={async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
          }}
          size="md"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different states of the image editor dialog.',
      },
    },
  },
};

// Playground story
export const Playground: Story = {
  render: InteractiveTemplate,
  args: {
    size: 'lg',
    maxFiles: 3,
    maxFileSize: 20 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    enableCrop: true,
    enableFilters: true,
    enableMetadata: true,
    cropAspectRatio: 'free',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different configurations.',
      },
    },
  },
};