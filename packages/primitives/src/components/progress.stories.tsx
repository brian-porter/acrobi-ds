import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './progress';
import { useState, useEffect } from 'react';

const meta: Meta<typeof Progress> = {
  title: 'Primitives/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='w-80'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: { type: 'select' },
      options: ['rounded', 'square'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const WithValue: Story = {
  args: {
    value: 75,
    showValue: true,
  },
};

export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
    showValue: true,
  },
};

export const Warning: Story = {
  args: {
    value: 25,
    variant: 'warning',
    showValue: true,
  },
};

export const Error: Story = {
  args: {
    value: 15,
    variant: 'error',
    showValue: true,
  },
};

export const Small: Story = {
  args: {
    value: 60,
    size: 's',
    showValue: true,
  },
};

export const Large: Story = {
  args: {
    value: 80,
    size: 'l',
    showValue: true,
  },
};

export const ExtraLarge: Story = {
  args: {
    value: 90,
    size: 'xl',
    showValue: true,
  },
};

export const Square: Story = {
  args: {
    value: 45,
    shape: 's',
    showValue: true,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
    showValue: true,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    variant: 'success',
    showValue: true,
  },
};

export const CustomMax: Story = {
  args: {
    value: 7,
    max: 10,
    showValue: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <label className='text-sm font-medium'>Small</label>
        <Progress value={40} size='s' showValue />
      </div>
      <div>
        <label className='text-sm font-medium'>Medium (Default)</label>
        <Progress value={60} size='m' showValue />
      </div>
      <div>
        <label className='text-sm font-medium'>Large</label>
        <Progress value={80} size='l' showValue />
      </div>
      <div>
        <label className='text-sm font-medium'>Extra Large</label>
        <Progress value={95} size='xl' showValue />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <label className='text-sm font-medium'>Default</label>
        <Progress value={50} variant='default' showValue />
      </div>
      <div>
        <label className='text-sm font-medium'>Success</label>
        <Progress value={100} variant='success' showValue />
      </div>
      <div>
        <label className='text-sm font-medium'>Warning</label>
        <Progress value={25} variant='warning' showValue />
      </div>
      <div>
        <label className='text-sm font-medium'>Error</label>
        <Progress value={15} variant='error' showValue />
      </div>
    </div>
  ),
};

export const AnimatedProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            return 0; // Reset to start over
          }
          return prev + 1;
        });
      }, 100);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className='space-y-4'>
        <div>
          <label className='text-sm font-medium'>Animated Progress</label>
          <Progress value={progress} showValue />
        </div>

        <div className='text-xs text-muted-foreground'>
          Progress resets at 100% and starts over
        </div>
      </div>
    );
  },
};

export const FileUpload: Story = {
  render: () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const startUpload = () => {
      setIsUploading(true);
      setUploadProgress(0);

      const timer = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsUploading(false);
            return 100;
          }
          return prev + Math.random() * 15; // Variable speed upload
        });
      }, 200);
    };

    const getVariant = () => {
      if (uploadProgress === 100) return 'success';
      if (uploadProgress > 0) return 'default';
      return 'default';
    };

    return (
      <div className='space-y-4'>
        <div>
          <div className='flex justify-between items-center mb-2'>
            <label className='text-sm font-medium'>File Upload</label>
            <span className='text-xs text-muted-foreground'>
              {uploadProgress === 100
                ? 'Complete!'
                : isUploading
                  ? 'Uploading...'
                  : 'Ready'}
            </span>
          </div>

          <Progress
            value={Math.min(uploadProgress, 100)}
            variant={getVariant()}
            showValue
            size='l'
          />
        </div>

        <button
          onClick={startUpload}
          disabled={isUploading}
          className='px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isUploading
            ? 'Uploading...'
            : uploadProgress === 100
              ? 'Upload Again'
              : 'Start Upload'}
        </button>
      </div>
    );
  },
};

export const SkillProgress: Story = {
  render: () => {
    const skills = [
      { name: 'React', progress: 90, variant: 'success' as const },
      { name: 'TypeScript', progress: 85, variant: 'success' as const },
      { name: 'Node.js', progress: 70, variant: 'default' as const },
      { name: 'GraphQL', progress: 60, variant: 'default' as const },
      { name: 'Docker', progress: 40, variant: 'warning' as const },
      { name: 'Kubernetes', progress: 20, variant: 'error' as const },
    ];

    return (
      <div className='space-y-4'>
        <h3 className='font-medium'>Technical Skills</h3>

        {skills.map(skill => (
          <div key={skill.name}>
            <div className='flex justify-between items-center mb-1'>
              <span className='text-sm font-medium'>{skill.name}</span>
              <span className='text-xs text-muted-foreground'>
                {skill.progress}%
              </span>
            </div>
            <Progress value={skill.progress} variant={skill.variant} size='s' />
          </div>
        ))}
      </div>
    );
  },
};

export const SystemHealth: Story = {
  render: () => {
    const [metrics, setMetrics] = useState({
      cpu: 45,
      memory: 72,
      disk: 28,
      network: 91,
    });

    useEffect(() => {
      const timer = setInterval(() => {
        setMetrics({
          cpu: Math.max(
            0,
            Math.min(100, metrics.cpu + (Math.random() - 0.5) * 10)
          ),
          memory: Math.max(
            0,
            Math.min(100, metrics.memory + (Math.random() - 0.5) * 5)
          ),
          disk: Math.max(
            0,
            Math.min(100, metrics.disk + (Math.random() - 0.5) * 2)
          ),
          network: Math.max(
            0,
            Math.min(100, metrics.network + (Math.random() - 0.5) * 15)
          ),
        });
      }, 2000);

      return () => clearInterval(timer);
    }, [metrics]);

    const getVariant = (value: number) => {
      if (value > 80) return 'error';
      if (value > 60) return 'warning';
      return 'success';
    };

    return (
      <div className='space-y-4'>
        <h3 className='font-medium'>System Health</h3>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <div className='flex justify-between items-center mb-1'>
              <span className='text-sm'>CPU Usage</span>
              <span className='text-xs text-muted-foreground'>
                {Math.round(metrics.cpu)}%
              </span>
            </div>
            <Progress
              value={metrics.cpu}
              variant={getVariant(metrics.cpu)}
              size='s'
            />
          </div>

          <div>
            <div className='flex justify-between items-center mb-1'>
              <span className='text-sm'>Memory</span>
              <span className='text-xs text-muted-foreground'>
                {Math.round(metrics.memory)}%
              </span>
            </div>
            <Progress
              value={metrics.memory}
              variant={getVariant(metrics.memory)}
              size='s'
            />
          </div>

          <div>
            <div className='flex justify-between items-center mb-1'>
              <span className='text-sm'>Disk Usage</span>
              <span className='text-xs text-muted-foreground'>
                {Math.round(metrics.disk)}%
              </span>
            </div>
            <Progress
              value={metrics.disk}
              variant={getVariant(metrics.disk)}
              size='s'
            />
          </div>

          <div>
            <div className='flex justify-between items-center mb-1'>
              <span className='text-sm'>Network</span>
              <span className='text-xs text-muted-foreground'>
                {Math.round(metrics.network)}%
              </span>
            </div>
            <Progress
              value={metrics.network}
              variant={getVariant(metrics.network)}
              size='s'
            />
          </div>
        </div>
      </div>
    );
  },
};
