import type { Meta, StoryObj } from '@storybook/react';
import { UploadCtrl } from './upload-ctrl';
import { useState } from 'react';

const meta = {
  title: 'Primitives/UploadCtrl',
  component: UploadCtrl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
UploadCtrl component using authentic Acrobi Design System styling.

This component provides comprehensive file upload functionality with drag-and-drop, multiple upload options, and file management.

**Key Features:**
- Uses authentic Acrobi CSS classes: \`.upload_wrap\`, \`.upload_main\`, \`.upload_opt\`
- Drag-and-drop file upload with visual feedback
- Multiple upload options: Camera, Library, Unsplash, URL
- File preview with progress tracking and error handling
- URL modal for link-based uploads
- File validation (size, type, count limits)

**CSS Classes Used:**
- \`.upload_wrap\` - Main upload container
- \`.upload_main\` - Main upload area
- \`.upload_opt\` - Upload options panel
- \`.filedrop_wrap\` - Drop zone container
- \`.upld_opt-url\` - URL modal container
- \`.upld_url-modal\` - URL modal content
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    upldDzIcn: {
      control: 'boolean',
      description: 'Enable drop zone icon display',
    },
    upldDzIcnSrc: {
      control: 'text',
      description: 'Drop zone icon source',
    },
    upldDzIcnSz: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl', '2xl'],
      description: 'Drop zone icon size',
    },
    upldDzTxtSrc: {
      control: 'text',
      description: 'Drop zone text source',
    },
    upldOpt: {
      control: 'boolean',
      description: 'Show upload options panel',
    },
    optOptCamera: {
      control: 'boolean',
      description: 'Enable camera option',
    },
    optOptLib: {
      control: 'boolean',
      description: 'Enable library option',
    },
    optOptUnsplash: {
      control: 'boolean',
      description: 'Enable Unsplash option',
    },
    optOptUrl: {
      control: 'boolean',
      description: 'Enable URL option',
    },
    optUrlModal: {
      control: 'boolean',
      description: 'Show URL modal',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    accept: {
      control: 'text',
      description: 'Accepted file types',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'expanded'],
      description: 'Component variant',
    },
  },
} satisfies Meta<typeof UploadCtrl>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Upload Stories

export const BasicUpload: Story = {
  args: {
    upldDzIcn: true,
    upldDzIcnSrc: 'upload',
    upldDzIcnSz: '2xl',
    upldDzTxtSrc: 'Tap to add or drop a file here',
    upldExampleFile: false,
    multiple: false,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic file upload with drag-and-drop functionality.',
      },
    },
  },
};

export const MultipleFiles: Story = {
  args: {
    upldDzIcn: true,
    upldDzIcnSrc: 'upload',
    upldDzIcnSz: '2xl',
    upldDzTxtSrc: 'Drop multiple files here or click to upload',
    multiple: true,
    maxFiles: 5,
    upldFileCapt: true,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload multiple files with file count limit and captions.',
      },
    },
  },
};

export const ImageUpload: Story = {
  args: {
    upldDzImg: true,
    upldDzImgSrc:
      'https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg',
    upldDzImgAlt: 'Upload image',
    upldDzTxtSrc: 'Drop images here or click to upload',
    accept: 'image/*',
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5MB
    upldFileCapt: true,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Image-specific upload with preview and size limits.',
      },
    },
  },
};

export const AvatarUpload: Story = {
  args: {
    upldDzAvtr: true,
    upldDzAvtrSrc:
      'https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif',
    upldDzAvtrAlt: 'Default avatar',
    upldDzTxtSrc: 'Upload your avatar',
    accept: 'image/*',
    multiple: false,
    maxSize: 2 * 1024 * 1024, // 2MB
    variant: 'compact',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar upload with circular preview.',
      },
    },
  },
};

// Upload Options Stories

export const WithUploadOptions: Story = {
  args: {
    upldDzIcn: true,
    upldDzIcnSrc: 'upload',
    upldDzTxtSrc: 'Choose your upload method',
    upldOpt: true,
    optOptCamera: true,
    optOptLib: true,
    optOptUnsplash: false,
    optOptUrl: false,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload with camera and library options.',
      },
    },
  },
};

export const AllUploadOptions: Story = {
  args: {
    upldDzIcn: true,
    upldDzIcnSrc: 'upload',
    upldDzTxtSrc: 'Choose from multiple upload sources',
    upldOpt: true,
    optOptCamera: true,
    optOptLib: true,
    optOptUnsplash: true,
    optOptUrl: true,
    variant: 'expanded',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Upload with all available options: Camera, Library, Unsplash, and URL.',
      },
    },
  },
};

// URL Modal Stories

export const URLModal: Story = {
  args: {
    upldDzIcn: true,
    upldDzIcnSrc: 'upload',
    upldDzTxtSrc: 'Upload from URL',
    optUrlModal: true,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'URL upload modal for link-based file uploads.',
      },
    },
  },
};

// Interactive Examples

export const InteractiveUpload: Story = {
  render: () => {
    const [files, setFiles] = useState([]);
    const [showUrlModal, setShowUrlModal] = useState(false);

    return (
      <div className='w-full max-w-2xl'>
        <UploadCtrl
          upldDzIcn={true}
          upldDzIcnSrc='upload'
          upldDzTxtSrc='Drop files here or click to upload'
          multiple={true}
          maxFiles={10}
          maxSize={10 * 1024 * 1024} // 10MB
          files={files}
          onFilesChange={setFiles}
          onFileRemove={fileId => {
            setFiles(files.filter(f => f.id !== fileId));
          }}
          onError={error => {
            console.error('Upload error:', error);
            alert(error);
          }}
          upldOpt={true}
          optOptCamera={true}
          optOptLib={true}
          optOptUrl={true}
          optOptUrlClick={() => setShowUrlModal(true)}
          optUrlModal={showUrlModal}
          optUrlCloseClick={() => setShowUrlModal(false)}
          optUrlGetClick={() => setShowUrlModal(false)}
          upldFileCapt={true}
        />

        <div className='mt-4 text-sm text-gray-600'>
          <p>Files uploaded: {files.length}</p>
          <p>
            Total size:{' '}
            {(files.reduce((sum, f) => sum + f.size, 0) / 1024).toFixed(1)} KB
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Fully interactive upload with state management, file limits, and all options.',
      },
    },
  },
};

export const FileValidation: Story = {
  render: () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');

    return (
      <div className='w-full max-w-2xl space-y-4'>
        <UploadCtrl
          upldDzIcn={true}
          upldDzIcnSrc='upload'
          upldDzTxtSrc='PDF files only, max 5MB each, max 3 files'
          accept='.pdf'
          multiple={true}
          maxFiles={3}
          maxSize={5 * 1024 * 1024} // 5MB
          files={files}
          onFilesChange={setFiles}
          onFileRemove={fileId => {
            setFiles(files.filter(f => f.id !== fileId));
          }}
          onError={error => {
            setError(error);
            setTimeout(() => setError(''), 5000);
          }}
          upldFileCapt={true}
        />

        {error && (
          <div className='p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm'>
            {error}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Upload with file validation (type, size, count) and error handling.',
      },
    },
  },
};

export const ProgressTracking: Story = {
  render: () => {
    const [files, setFiles] = useState([]);

    const simulateUpload = newFiles => {
      const filesWithProgress = newFiles.map(file => ({
        ...file,
        uploadProgress: 0,
      }));
      setFiles(prev => [...prev, ...filesWithProgress]);

      // Simulate upload progress
      filesWithProgress.forEach((file, index) => {
        const interval = setInterval(
          () => {
            setFiles(prev =>
              prev.map(f => {
                if (f.id === file.id) {
                  const newProgress = f.uploadProgress + 10;
                  if (newProgress >= 100) {
                    clearInterval(interval);
                    return { ...f, uploadProgress: 100 };
                  }
                  return { ...f, uploadProgress: newProgress };
                }
                return f;
              })
            );
          },
          200 + index * 100
        );
      });
    };

    return (
      <div className='w-full max-w-2xl'>
        <UploadCtrl
          upldDzIcn={true}
          upldDzIcnSrc='upload'
          upldDzTxtSrc='Drop files to see upload progress'
          multiple={true}
          files={files}
          onFilesChange={simulateUpload}
          onFileRemove={fileId => {
            setFiles(files.filter(f => f.id !== fileId));
          }}
          upldFileCapt={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload with simulated progress tracking for each file.',
      },
    },
  },
};

// Edge Cases

export const EmptyState: Story = {
  args: {
    upldDzIcn: true,
    upldDzIcnSrc: 'upload',
    upldDzTxtSrc: 'No files uploaded yet',
    upldExampleFile: false,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty upload state without example files.',
      },
    },
  },
};

export const DisabledUpload: Story = {
  args: {
    upldDzIcn: true,
    upldDzIcnSrc: 'upload',
    upldDzTxtSrc: 'Upload disabled',
    className: 'opacity-50 pointer-events-none',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled upload state.',
      },
    },
  },
};

export const CompactVariant: Story = {
  args: {
    upldDzIcn: true,
    upldDzIcnSrc: 'upload',
    upldDzIcnSz: 'm',
    upldDzTxtSrc: 'Quick upload',
    variant: 'compact',
    upldOpt: true,
    optOptCamera: true,
    optOptLib: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant for smaller spaces.',
      },
    },
  },
};
