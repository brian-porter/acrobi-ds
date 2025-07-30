import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from './dialog';
import { Button } from './button';
import { useState } from 'react';

const meta: Meta<typeof Dialog> = {
  title: 'Primitives/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
    },
    modal: {
      control: { type: 'boolean' },
    },
    showScrim: {
      control: { type: 'boolean' },
    },
    blur: {
      control: { type: 'boolean' },
    },
    shadow: {
      control: { type: 'boolean' },
    },
    dialogType: {
      control: { type: 'select' },
      options: ['default', 'alert', 'confirm', 'custom'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <div className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>Dialog Title</h2>
            <p className='text-muted-foreground mb-6'>
              This is a basic dialog with some content. You can put any content
              here.
            </p>
            <div className='flex justify-end gap-2'>
              <Button variant='ghost' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>OK</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const WithScrim: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog with Scrim</Button>

        <Dialog open={open} onOpenChange={setOpen} showScrim={true}>
          <div className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>Dialog with Scrim</h2>
            <p className='text-muted-foreground mb-6'>
              This dialog has a background scrim that dims the content behind
              it.
            </p>
            <div className='flex justify-end gap-2'>
              <Button variant='ghost' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>OK</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const WithBlur: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Blurred Dialog</Button>

        <Dialog open={open} onOpenChange={setOpen} blur='4' showScrim={true}>
          <div className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>Blurred Dialog</h2>
            <p className='text-muted-foreground mb-6'>
              This dialog has a blur effect applied to the background content.
            </p>
            <div className='flex justify-end gap-2'>
              <Button variant='ghost' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>OK</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const WithShadow: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog with Shadow</Button>

        <Dialog open={open} onOpenChange={setOpen} shadow='m' showScrim={true}>
          <div className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>Dialog with Shadow</h2>
            <p className='text-muted-foreground mb-6'>
              This dialog has a prominent shadow effect.
            </p>
            <div className='flex justify-end gap-2'>
              <Button variant='ghost' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>OK</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const AlertDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant='destructive' onClick={() => setOpen(true)}>
          Delete Item
        </Button>

        <Dialog
          open={open}
          onOpenChange={setOpen}
          dialogType='alert'
          showScrim={true}
          modal={true}
        >
          <div className='p-6'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 rounded-full bg-red-100 flex items-center justify-center'>
                <svg
                  className='w-5 h-5 text-red-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
              </div>
              <h2 className='text-lg font-semibold'>Delete Item</h2>
            </div>
            <p className='text-muted-foreground mb-6'>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <div className='flex justify-end gap-2'>
              <Button variant='ghost' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant='destructive' onClick={() => setOpen(false)}>
                Delete
              </Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const ConfirmDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Save Changes</Button>

        <Dialog
          open={open}
          onOpenChange={setOpen}
          dialogType='confirm'
          showScrim={true}
          modal={true}
        >
          <div className='p-6'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center'>
                <svg
                  className='w-5 h-5 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h2 className='text-lg font-semibold'>Confirm Changes</h2>
            </div>
            <p className='text-muted-foreground mb-6'>
              Do you want to save the changes you made to this document?
            </p>
            <div className='flex justify-end gap-2'>
              <Button variant='ghost' onClick={() => setOpen(false)}>
                Don't Save
              </Button>
              <Button variant='outline' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const FormDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Add New User</Button>

        <Dialog
          open={open}
          onOpenChange={setOpen}
          showScrim={true}
          modal={true}
        >
          <div className='p-6 w-96'>
            <h2 className='text-lg font-semibold mb-4'>Add New User</h2>

            <form className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>Name</label>
                <input
                  type='text'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter full name'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>Email</label>
                <input
                  type='email'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter email address'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>Role</label>
                <select className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                  <option>Select a role</option>
                  <option>Admin</option>
                  <option>User</option>
                  <option>Moderator</option>
                </select>
              </div>

              <div className='flex justify-end gap-2 pt-4'>
                <Button variant='ghost' onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setOpen(false)}>Add User</Button>
              </div>
            </form>
          </div>
        </Dialog>
      </>
    );
  },
};

export const NonModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Non-Modal Dialog</Button>

        <Dialog
          open={open}
          onOpenChange={setOpen}
          modal={false}
          showScrim={false}
        >
          <div className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>Non-Modal Dialog</h2>
            <p className='text-muted-foreground mb-6'>
              This dialog is non-modal, so you can still interact with the
              background content.
            </p>
            <div className='flex justify-end'>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const AllVariations: Story = {
  render: () => {
    const [basicOpen, setBasicOpen] = useState(false);
    const [scrimOpen, setScrimOpen] = useState(false);
    const [blurOpen, setBlurOpen] = useState(false);
    const [shadowOpen, setShadowOpen] = useState(false);

    return (
      <div className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <Button onClick={() => setBasicOpen(true)}>Basic Dialog</Button>
          <Button onClick={() => setScrimOpen(true)}>With Scrim</Button>
          <Button onClick={() => setBlurOpen(true)}>With Blur</Button>
          <Button onClick={() => setShadowOpen(true)}>With Shadow</Button>
        </div>

        {/* Basic Dialog */}
        <Dialog open={basicOpen} onOpenChange={setBasicOpen}>
          <div className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>Basic Dialog</h2>
            <p className='text-muted-foreground mb-4'>
              Simple dialog without effects.
            </p>
            <Button onClick={() => setBasicOpen(false)}>Close</Button>
          </div>
        </Dialog>

        {/* Scrim Dialog */}
        <Dialog open={scrimOpen} onOpenChange={setScrimOpen} showScrim={true}>
          <div className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>Dialog with Scrim</h2>
            <p className='text-muted-foreground mb-4'>
              Dialog with background scrim.
            </p>
            <Button onClick={() => setScrimOpen(false)}>Close</Button>
          </div>
        </Dialog>

        {/* Blur Dialog */}
        <Dialog
          open={blurOpen}
          onOpenChange={setBlurOpen}
          blur='4'
          showScrim={true}
        >
          <div className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>Blurred Dialog</h2>
            <p className='text-muted-foreground mb-4'>
              Dialog with background blur effect.
            </p>
            <Button onClick={() => setBlurOpen(false)}>Close</Button>
          </div>
        </Dialog>

        {/* Shadow Dialog */}
        <Dialog
          open={shadowOpen}
          onOpenChange={setShadowOpen}
          shadow='m'
          showScrim={true}
        >
          <div className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>Dialog with Shadow</h2>
            <p className='text-muted-foreground mb-4'>
              Dialog with prominent shadow.
            </p>
            <Button onClick={() => setShadowOpen(false)}>Close</Button>
          </div>
        </Dialog>
      </div>
    );
  },
};

export const DevlinkAPI: Story = {
  render: () => {
    const [devlinkOpen, setDevlinkOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setDevlinkOpen(true)}>
          Open Devlink API Dialog
        </Button>

        <Dialog
          dialog={devlinkOpen}
          prevBtn={true}
          closeBtn={true}
          type='modal'
          scrim='70'
          blur='3'
          shdw='xl'
          bgClick={{
            onClick: () => setDevlinkOpen(false),
          }}
          prevClick={{
            onClick: () => console.log('Previous clicked'),
          }}
          closeClick={{
            onClick: () => setDevlinkOpen(false),
          }}
          dialogMap={
            <div className='p-6'>
              <h2 className='text-lg font-semibold mb-4'>Devlink API Dialog</h2>
              <p className='text-muted-foreground mb-6'>
                This dialog uses the exact devlink API props: dialog, prevBtn,
                closeBtn, bgClick, prevClick, closeClick, and dialogMap.
              </p>
              <div className='space-y-2 text-sm'>
                <p>
                  <strong>dialog:</strong> {devlinkOpen ? 'true' : 'false'}
                </p>
                <p>
                  <strong>prevBtn:</strong> true
                </p>
                <p>
                  <strong>closeBtn:</strong> true
                </p>
                <p>
                  <strong>type:</strong> modal
                </p>
                <p>
                  <strong>scrim:</strong> 70
                </p>
                <p>
                  <strong>blur:</strong> 3
                </p>
                <p>
                  <strong>shdw:</strong> xl
                </p>
              </div>
              <div className='flex justify-end gap-2 mt-4'>
                <Button variant='ghost' onClick={() => setDevlinkOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setDevlinkOpen(false)}>OK</Button>
              </div>
            </div>
          }
        />
      </>
    );
  },
};

export const DevlinkCompatibility: Story = {
  render: () => {
    const [legacyOpen, setLegacyOpen] = useState(false);
    const [modernOpen, setModernOpen] = useState(false);

    return (
      <div className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <Button onClick={() => setLegacyOpen(true)}>
            Legacy Devlink API
          </Button>
          <Button onClick={() => setModernOpen(true)}>Modern API</Button>
        </div>

        {/* Legacy Devlink API */}
        <Dialog
          dialog={legacyOpen}
          prevBtn={false}
          closeBtn={true}
          type='modal'
          scrim='80'
          blur='2'
          shdw='l'
          bgClick={{
            onClick: () => setLegacyOpen(false),
          }}
          closeClick={{
            onClick: () => setLegacyOpen(false),
          }}
          dialogMap={
            <div className='p-6'>
              <h2 className='text-lg font-semibold mb-4'>Legacy Devlink API</h2>
              <p className='text-muted-foreground mb-4'>
                This dialog demonstrates backward compatibility with the
                original devlink component API.
              </p>
              <Button onClick={() => setLegacyOpen(false)}>Close</Button>
            </div>
          }
        />

        {/* Modern API */}
        <Dialog
          open={modernOpen}
          onOpenChange={setModernOpen}
          showPrevButton={false}
          showCloseButton={true}
          type='modal'
          scrim='80'
          blur='2'
          shadow='l'
          closeOnOverlayClick={true}
        >
          <div className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>Modern API</h2>
            <p className='text-muted-foreground mb-4'>
              This dialog uses the modern React patterns with proper state
              management and TypeScript support.
            </p>
            <Button onClick={() => setModernOpen(false)}>Close</Button>
          </div>
        </Dialog>
      </div>
    );
  },
};
