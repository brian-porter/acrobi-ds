import type { Meta, StoryObj } from '@storybook/react';
import { SelectlistCtrl } from './selectlist-ctrl';
import { useState } from 'react';

const meta: Meta<typeof SelectlistCtrl> = {
  title: 'Primitives/SelectlistCtrl',
  component: SelectlistCtrl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The SelectlistCtrl component is an authentic Acrobi Design System form control that provides a custom dropdown interface with advanced features like search, keyboard navigation, and comprehensive form integration.

## Features

- **Authentic Acrobi Styling**: Uses \`.selectlist_wrap\`, \`.selectlist_main\`, and \`.a_selectlist-tgl\` classes
- **32+ Configuration Props**: Full Webflow/devlink API compatibility
- **Form Integration**: Hidden native select for perfect form compatibility
- **Search Functionality**: Optional search/filter capabilities
- **Keyboard Navigation**: Full accessibility support
- **Top Labels & Helper Text**: Complete form field structure
- **Feedback System**: Error, warning, and success states
- **Custom Rendering**: Flexible option rendering with icons and subtitles

## Authentic CSS Classes

This component uses authentic Acrobi CSS classes that map directly to the design system:

- \`.selectlist_wrap\` - Main container wrapper
- \`.selectlist_main\` - Primary selectlist container
- \`.a_selectlist-tgl\` - Toggle button with dropdown arrow
- \`.a_selectlist-arw\` - Dropdown arrow icon container
- \`.selecteditem\` - Selected item display area
- \`.si-primary\` - Primary content area for selected text
- \`.selectitem\` - Individual dropdown option styling
- \`.si-lead\`, \`.si-trail\` - Leading and trailing content areas

## Data Attributes

The component uses data attributes for styling control:

- \`data-field-brd\` - Controls border color (d=danger, w=warning, s=success)
- \`data-div\` - Controls visibility and layout states
        `,
      },
    },
  },
  argTypes: {
    fldSelect: {
      control: 'boolean',
      description: 'Show selectlist component',
      table: { defaultValue: { summary: 'true' } },
    },
    topLbl: {
      control: 'boolean',
      description: 'Show top label',
      table: { defaultValue: { summary: 'false' } },
    },
    helperTxt: {
      control: 'boolean',
      description: 'Show helper text',
      table: { defaultValue: { summary: 'false' } },
    },
    fbk: {
      control: 'boolean',
      description: 'Show feedback',
      table: { defaultValue: { summary: 'false' } },
    },
    topLblSrc: {
      control: 'text',
      description: 'Top label text source',
      table: { defaultValue: { summary: '"Label"' } },
    },
    pHoldSrc: {
      control: 'text',
      description: 'Placeholder source text',
      table: { defaultValue: { summary: '"Select an option..."' } },
    },
    fldBrdClr: {
      control: 'select',
      options: ['d', 'w', 's'],
      description: 'Field border color (d=danger, w=warning, s=success)',
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
      description: 'Component variant',
      table: { defaultValue: { summary: 'default' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Required field',
      table: { defaultValue: { summary: 'false' } },
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options for stories
const basicOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
];

const countryOptions = [
  { value: 'us', label: 'United States', icon: '🇺🇸' },
  { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
  { value: 'ca', label: 'Canada', icon: '🇨🇦' },
  { value: 'au', label: 'Australia', icon: '🇦🇺' },
  { value: 'de', label: 'Germany', icon: '🇩🇪' },
  { value: 'fr', label: 'France', icon: '🇫🇷' },
  { value: 'jp', label: 'Japan', icon: '🇯🇵' },
  { value: 'cn', label: 'China', icon: '🇨🇳' },
];

const detailedOptions = [
  {
    value: 'basic',
    label: 'Basic Plan',
    subtitle: '$9/month • Up to 5 users',
    icon: 'person',
  },
  {
    value: 'pro',
    label: 'Pro Plan',
    subtitle: '$29/month • Up to 25 users',
    icon: 'business',
  },
  {
    value: 'enterprise',
    label: 'Enterprise Plan',
    subtitle: '$99/month • Unlimited users',
    icon: 'corporate_fare',
  },
];

/**
 * Basic selectlist with minimal configuration
 */
export const Default: Story = {
  args: {
    options: basicOptions,
    pHoldSrc: 'Select an option...',
    fldId: 'basic-select',
  },
};

/**
 * Selectlist with top label and helper text
 */
export const WithLabelsAndHelper: Story = {
  args: {
    options: countryOptions,
    topLbl: true,
    topLblSrc: 'Country',
    helperTxt: true,
    helperTxtSrc: 'Choose your country of residence',
    pHoldSrc: 'Select country...',
    fldId: 'country-select',
  },
};

/**
 * Selectlist with search functionality
 */
export const Searchable: Story = {
  args: {
    options: countryOptions,
    topLbl: true,
    topLblSrc: 'Country',
    searchable: true,
    searchPlaceholder: 'Search countries...',
    pHoldSrc: 'Type to search or select...',
    fldId: 'searchable-select',
  },
};

/**
 * Selectlist with detailed options (icons and subtitles)
 */
export const WithDetailedOptions: Story = {
  args: {
    options: detailedOptions,
    topLbl: true,
    topLblSrc: 'Subscription Plan',
    helperTxt: true,
    helperTxtSrc: 'Choose the plan that best fits your needs',
    pHoldSrc: 'Select a plan...',
    fldId: 'plan-select',
  },
};

/**
 * Error state with feedback
 */
export const ErrorState: Story = {
  args: {
    options: basicOptions,
    topLbl: true,
    topLblSrc: 'Required Field',
    variant: 'error',
    fldBrdClr: 'd',
    fbk: true,
    fbkFbkTxt: true,
    fbkFbkTxtSrc: 'This field is required',
    fbkFbkClr: 'fd500',
    fbkFbkIcn: true,
    fbkFbkIcnSrc: 'error',
    required: true,
    pHoldSrc: 'Please select an option',
    fldId: 'error-select',
  },
};

/**
 * Success state with feedback
 */
export const SuccessState: Story = {
  args: {
    options: basicOptions,
    topLbl: true,
    topLblSrc: 'Selection Complete',
    variant: 'success',
    fldBrdClr: 's',
    fbk: true,
    fbkFbkTxt: true,
    fbkFbkTxtSrc: 'Great choice!',
    fbkFbkClr: 'fs500',
    fbkFbkIcn: true,
    fbkFbkIcnSrc: 'check_circle',
    value: '2',
    pHoldSrc: 'Select an option...',
    fldId: 'success-select',
  },
};

/**
 * Warning state with feedback
 */
export const WarningState: Story = {
  args: {
    options: basicOptions,
    topLbl: true,
    topLblSrc: 'Review Selection',
    variant: 'warning',
    fldBrdClr: 'w',
    fbk: true,
    fbkFbkTxt: true,
    fbkFbkTxtSrc: 'Please review your selection',
    fbkFbkClr: 'fw500',
    fbkFbkIcn: true,
    fbkFbkIcnSrc: 'warning',
    pHoldSrc: 'Select an option...',
    fldId: 'warning-select',
  },
};

/**
 * Disabled selectlist
 */
export const Disabled: Story = {
  args: {
    options: basicOptions,
    topLbl: true,
    topLblSrc: 'Disabled Field',
    disabled: true,
    value: '1',
    pHoldSrc: 'Not available',
    fldId: 'disabled-select',
  },
};

/**
 * Interactive example with controlled state
 */
export const Controlled: Story = {
  render: args => {
    const [value, setValue] = useState('');

    return (
      <div className='w-full max-w-md'>
        <SelectlistCtrl {...args} value={value} onChange={setValue} />
        <div className='mt-4 p-3 bg-muted rounded'>
          <p className='text-sm font-medium'>Selected Value:</p>
          <p className='text-sm text-muted-foreground'>
            {value || 'None selected'}
          </p>
        </div>
      </div>
    );
  },
  args: {
    options: countryOptions,
    topLbl: true,
    topLblSrc: 'Controlled Select',
    helperTxt: true,
    helperTxtSrc: 'This selectlist is controlled by React state',
    searchable: true,
    pHoldSrc: 'Search or select country...',
    fldId: 'controlled-select',
  },
};

/**
 * Form integration example
 */
export const FormIntegration: Story = {
  render: args => {
    const [formData, setFormData] = useState({
      country: '',
      plan: '',
      category: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Form submitted:\n${JSON.stringify(formData, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit} className='w-full max-w-md space-y-6'>
        <SelectlistCtrl
          options={countryOptions}
          topLbl={true}
          topLblSrc='Country *'
          selectName='country'
          value={formData.country}
          onChange={value => setFormData(prev => ({ ...prev, country: value }))}
          required={true}
          searchable={true}
          pHoldSrc='Select country...'
          fldId='form-country'
        />

        <SelectlistCtrl
          options={detailedOptions}
          topLbl={true}
          topLblSrc='Subscription Plan *'
          selectName='plan'
          value={formData.plan}
          onChange={value => setFormData(prev => ({ ...prev, plan: value }))}
          required={true}
          pHoldSrc='Select plan...'
          fldId='form-plan'
        />

        <SelectlistCtrl
          options={basicOptions}
          topLbl={true}
          topLblSrc='Category'
          selectName='category'
          value={formData.category}
          onChange={value =>
            setFormData(prev => ({ ...prev, category: value }))
          }
          pHoldSrc='Optional selection...'
          fldId='form-category'
        />

        <button
          type='submit'
          className='w-full bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors'
        >
          Submit Form
        </button>

        <div className='p-3 bg-muted rounded'>
          <p className='text-sm font-medium mb-2'>Form Data:</p>
          <pre className='text-xs text-muted-foreground'>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </form>
    );
  },
  args: {},
};

/**
 * All label sizes and colors
 */
export const LabelVariations: Story = {
  render: () => (
    <div className='w-full max-w-md space-y-4'>
      <SelectlistCtrl
        options={basicOptions}
        topLbl={true}
        topLblSrc='Size R1 - Danger Color'
        topLblSz='r1'
        topLblClr='fd500'
        pHoldSrc='Select...'
        fldId='label-r1'
      />

      <SelectlistCtrl
        options={basicOptions}
        topLbl={true}
        topLblSrc='Size R2 - Warning Color'
        topLblSz='r2'
        topLblClr='fw500'
        pHoldSrc='Select...'
        fldId='label-r2'
      />

      <SelectlistCtrl
        options={basicOptions}
        topLbl={true}
        topLblSrc='Size R3 - Success Color'
        topLblSz='r3'
        topLblClr='fs500'
        pHoldSrc='Select...'
        fldId='label-r3'
      />

      <SelectlistCtrl
        options={basicOptions}
        topLbl={true}
        topLblSrc='Size R4 - Primary Color'
        topLblSz='r4'
        topLblClr='p500'
        pHoldSrc='Select...'
        fldId='label-r4'
      />
    </div>
  ),
  args: {},
};

/**
 * Custom dropdown positioning
 */
export const DropdownPositioning: Story = {
  render: () => (
    <div className='w-full max-w-md space-y-8 py-8'>
      <SelectlistCtrl
        options={countryOptions}
        topLbl={true}
        topLblSrc='Dropdown Above (Auto)'
        dropdownPosition='top'
        pHoldSrc='Opens uaaerd...'
        fldId='dropdown-top'
      />

      <div className='h-20' />

      <SelectlistCtrl
        options={countryOptions}
        topLbl={true}
        topLblSrc='Dropdown Below (Auto)'
        dropdownPosition='bottom'
        pHoldSrc='Opens downward...'
        fldId='dropdown-bottom'
      />

      <SelectlistCtrl
        options={countryOptions}
        topLbl={true}
        topLblSrc='Smart Positioning'
        dropdownPosition='auto'
        pHoldSrc='Auto-positions based on space...'
        fldId='dropdown-auto'
      />
    </div>
  ),
  args: {},
};
