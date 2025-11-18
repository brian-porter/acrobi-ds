import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { 
  Snackbar, 
  SnackbarMessage, 
  SnackbarTitle, 
  SnackbarDescription 
} from './snackbar';
import { Button } from './button';

const meta: Meta<typeof Snackbar> = {
  title: 'Primitives/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Snackbar component provides non-intrusive user feedback following the Acrobi Design System patterns.

## Features

- **Multiple Types**: info, success, warning, error with appropriate semantic colors
- **Flexible Positioning**: 6 position options (top/bottom + left/center/right)
- **Auto-dismiss**: Configurable timeout with hover-to-pause functionality
- **Action Support**: Optional action button for undo, retry, etc.
- **Dismissible**: Optional close button
- **Stacking**: Support for multiple snackbars with z-index management
- **Accessibility**: Full ARIA support with screen reader announcements
- **Animations**: Smooth enter/exit transitions

## Usage

\`\`\`tsx
import { Snackbar, SnackbarMessage } from '@acrobi/ui';

function MyComponent() {
  const [open, setOpen] = React.useState(false);

  return (
    <Snackbar 
      type="success" 
      open={open}
      onOpenChange={setOpen}
      autoHideDuration={5000}
      action={{ label: "Undo", onClick: handleUndo }}
      dismissible
    >
      <SnackbarMessage>Changes saved successfully!</SnackbarMessage>
    </Snackbar>
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Semantic type affecting color and default icon',
    },
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center', 
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right'
      ],
      description: 'Position of the snackbar on screen',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size variant of the snackbar',
    },
    open: {
      control: 'boolean',
      description: 'Whether the snackbar is visible',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show close button',
    },
    autoHideDuration: {
      control: 'number',
      description: 'Auto-dismiss timeout in milliseconds (0 disables)',
    },
    icon: {
      control: 'text',
      description: 'Custom icon name (overrides default type icon)',
    },
  },
  args: {
    type: 'info',
    position: 'bottom-right',
    size: 'default',
    open: true,
    dismissible: true,
    autoHideDuration: 0, // Disabled for stories
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

// Demo wrapper component for interactive stories
const SnackbarDemo = ({ 
  children, 
  triggerLabel = "Show Snackbar",
  ...props 
}: any) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)} type="filled" styling="prime">
        {triggerLabel}
      </Button>
      
      <Snackbar
        {...props}
        open={open}
        onOpenChange={setOpen}
        onClose={() => setOpen(false)}
      >
        {children}
      </Snackbar>
    </div>
  );
};

// Basic Examples
export const Default: Story = {
  render: (args) => (
    <SnackbarDemo {...args}>
      <SnackbarMessage>This is a default info snackbar</SnackbarMessage>
    </SnackbarDemo>
  ),
};

export const Success: Story = {
  args: {
    type: 'success',
  },
  render: (args) => (
    <SnackbarDemo {...args} triggerLabel="Show Success">
      <SnackbarMessage>Changes saved successfully!</SnackbarMessage>
    </SnackbarDemo>
  ),
};

export const Warning: Story = {
  args: {
    type: 'warning',
  },
  render: (args) => (
    <SnackbarDemo {...args} triggerLabel="Show Warning">
      <SnackbarMessage>Please check your internet connection</SnackbarMessage>
    </SnackbarDemo>
  ),
};

export const Error: Story = {
  args: {
    type: 'error',
  },
  render: (args) => (
    <SnackbarDemo {...args} triggerLabel="Show Error">
      <SnackbarMessage>Failed to save changes. Please try again.</SnackbarMessage>
    </SnackbarDemo>
  ),
};

// With Action Button
export const WithAction: Story = {
  args: {
    type: 'success',
    action: {
      label: 'Undo',
      onClick: () => console.log('Action clicked!'),
    },
  },
  render: (args) => (
    <SnackbarDemo {...args} triggerLabel="Show with Action">
      <SnackbarMessage>Item deleted</SnackbarMessage>
    </SnackbarDemo>
  ),
};

// Auto-dismiss
export const AutoDismiss: Story = {
  args: {
    type: 'info',
    autoHideDuration: 3000,
  },
  render: (args) => (
    <SnackbarDemo {...args} triggerLabel="Auto-dismiss in 3s">
      <SnackbarMessage>This will disappear in 3 seconds</SnackbarMessage>
    </SnackbarDemo>
  ),
};

// Not Dismissible
export const NotDismissible: Story = {
  args: {
    type: 'warning',
    dismissible: false,
    autoHideDuration: 5000,
  },
  render: (args) => (
    <SnackbarDemo {...args} triggerLabel="No Close Button">
      <SnackbarMessage>This snackbar has no close button (auto-dismiss in 5s)</SnackbarMessage>
    </SnackbarDemo>
  ),
};

// With Title and Description
export const WithTitleAndDescription: Story = {
  args: {
    type: 'success',
  },
  render: (args) => (
    <SnackbarDemo {...args} triggerLabel="Title + Description">
      <SnackbarTitle>Upload Complete</SnackbarTitle>
      <SnackbarDescription>
        Your file has been uploaded successfully to the cloud storage.
      </SnackbarDescription>
    </SnackbarDemo>
  ),
};

// Custom Icon
export const CustomIcon: Story = {
  args: {
    type: 'info',
    icon: 'star',
  },
  render: (args) => (
    <SnackbarDemo {...args} triggerLabel="Custom Icon">
      <SnackbarMessage>You earned a new achievement!</SnackbarMessage>
    </SnackbarDemo>
  ),
};

// Different Sizes
export const SmallSize: Story = {
  args: {
    type: 'info',
    size: 'sm',
  },
  render: (args) => (
    <SnackbarDemo {...args} triggerLabel="Small Size">
      <SnackbarMessage>Compact snackbar</SnackbarMessage>
    </SnackbarDemo>
  ),
};

export const LargeSize: Story = {
  args: {
    type: 'info',
    size: 'lg',
  },
  render: (args) => (
    <SnackbarDemo {...args} triggerLabel="Large Size">
      <SnackbarTitle>Large Snackbar</SnackbarTitle>
      <SnackbarDescription>
        This is a larger snackbar with more space for content.
      </SnackbarDescription>
    </SnackbarDemo>
  ),
};

// Position Examples
export const TopLeft: Story = {
  args: {
    type: 'info',
    position: 'top-left',
  },
  render: (args) => (
    <SnackbarDemo {...args} triggerLabel="Top Left">
      <SnackbarMessage>Positioned at top-left</SnackbarMessage>
    </SnackbarDemo>
  ),
};

export const TopCenter: Story = {
  args: {
    type: 'success',
    position: 'top-center',
  },
  render: (args) => (
    <SnackbarDemo {...args} triggerLabel="Top Center">
      <SnackbarMessage>Positioned at top-center</SnackbarMessage>
    </SnackbarDemo>
  ),
};

export const BottomCenter: Story = {
  args: {
    type: 'warning',
    position: 'bottom-center',
  },
  render: (args) => (
    <SnackbarDemo {...args} triggerLabel="Bottom Center">
      <SnackbarMessage>Positioned at bottom-center</SnackbarMessage>
    </SnackbarDemo>
  ),
};

// Multiple Snackbars (Stacking)
export const MultipleSnackbars: Story = {
  render: () => {
    const [snackbars, setSnackbars] = React.useState<Array<{
      id: number;
      type: 'info' | 'success' | 'warning' | 'error';
      message: string;
      open: boolean;
    }>>([]);

    const addSnackbar = (type: 'info' | 'success' | 'warning' | 'error') => {
      const messages = {
        info: 'This is an info message',
        success: 'Operation completed successfully',
        warning: 'Please review your settings',
        error: 'An error occurred',
      };

      const newSnackbar = {
        id: Date.now(),
        type,
        message: messages[type],
        open: true,
      };

      setSnackbars(prev => [...prev, newSnackbar]);
    };

    const removeSnackbar = (id: number) => {
      setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
    };

    return (
      <div className="p-8 space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => addSnackbar('info')} size="sm">Info</Button>
          <Button onClick={() => addSnackbar('success')} size="sm" styling="focus">Success</Button>
          <Button onClick={() => addSnackbar('warning')} size="sm" styling="warn">Warning</Button>
          <Button onClick={() => addSnackbar('error')} size="sm" styling="danger">Error</Button>
        </div>

        {snackbars.map((snackbar, index) => (
          <Snackbar
            key={snackbar.id}
            type={snackbar.type}
            position="bottom-right"
            open={snackbar.open}
            onOpenChange={(open) => !open && removeSnackbar(snackbar.id)}
            autoHideDuration={5000}
            zIndex={50 + index} // Stack them
            style={{ 
              bottom: `${16 + index * 80}px` // Offset each snackbar
            }}
          >
            <SnackbarMessage>{snackbar.message}</SnackbarMessage>
          </Snackbar>
        ))}
      </div>
    );
  },
};

// Complex Example with All Features
export const ComplexExample: Story = {
  render: () => {
    const [snackbarState, setSnackbarState] = React.useState({
      open: false,
      type: 'success' as const,
      title: 'File Uploaded',
      message: 'Your document has been uploaded to the cloud storage.',
    });

    const showSnackbar = () => {
      setSnackbarState(prev => ({ ...prev, open: true }));
    };

    const handleUndo = () => {
      console.log('Undo action triggered');
      setSnackbarState(prev => ({ ...prev, open: false }));
    };

    return (
      <div className="p-8">
        <Button onClick={showSnackbar} type="filled" styling="prime" size="lg">
          Upload File (Demo)
        </Button>

        <Snackbar
          type={snackbarState.type}
          position="bottom-center"
          size="lg"
          open={snackbarState.open}
          onOpenChange={(open) => setSnackbarState(prev => ({ ...prev, open }))}
          autoHideDuration={8000}
          dismissible
          action={{
            label: 'Undo',
            onClick: handleUndo,
          }}
        >
          <SnackbarTitle>{snackbarState.title}</SnackbarTitle>
          <SnackbarDescription>{snackbarState.message}</SnackbarDescription>
        </Snackbar>
      </div>
    );
  },
};

// Always Visible (for design review)
export const AlwaysVisible: Story = {
  args: {
    type: 'info',
    position: 'bottom-right',
    open: true,
  },
  render: (args) => (
    <div className="p-8">
      <p className="mb-4 text-sm text-gray-600">
        This snackbar is always visible for design review purposes.
      </p>
      <Snackbar {...args}>
        <SnackbarMessage>This is always visible for design review</SnackbarMessage>
      </Snackbar>
    </div>
  ),
};