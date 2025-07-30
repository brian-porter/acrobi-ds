import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextareaCtrl } from './textarea-ctrl';
import { useState } from 'react';

const meta: Meta<typeof TextareaCtrl> = {
  title: 'Primitives/TextareaCtrl',
  component: TextareaCtrl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='p-6 min-w-96'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    fbk: {
      control: { type: 'boolean' },
      description: 'Show feedback message',
    },
    fldPholdSrc: {
      control: { type: 'text' },
      description: 'Textarea placeholder text',
    },
    fldName: {
      control: { type: 'text' },
      description: 'Textarea name attribute',
    },
    fldHeight: {
      control: { type: 'text' },
      description: 'Custom height for textarea',
    },
    fbkFbkTxtSrc: {
      control: { type: 'text' },
      description: 'Feedback message text',
    },
    fbkFbkClr: {
      control: { type: 'select' },
      options: ['fd500', 'fw500', 'f500', 'p500', 'n500', 'fs500'],
      description: 'Feedback message color',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'Component variant',
    },
    rows: {
      control: { type: 'number' },
      description: 'Number of visible text lines',
    },
    maxLength: {
      control: { type: 'number' },
      description: 'Maximum character length',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fldPholdSrc: 'Enter your message here...',
    fldName: 'message',
    rows: 4,
  },
};

export const WithFeedback: Story = {
  args: {
    fldPholdSrc: 'Describe your issue in detail...',
    fldName: 'issue-description',
    rows: 5,
    fbk: true,
    fbkFbkTxtSrc: 'Please provide as much detail as possible',
    fbkFbkClr: 'n500',
  },
};

export const WithError: Story = {
  args: {
    fldPholdSrc: 'Required field',
    fldName: 'required-field',
    rows: 3,
    required: true,
    variant: 'error',
    fbk: true,
    fbkFbkTxtSrc: 'This field is required',
    fbkFbkClr: 'fd500',
    fbkFbkIcn: true,
    fbkFbkIcnSrc: 'error',
  },
};

export const WithSuccess: Story = {
  args: {
    fldPholdSrc: 'Your feedback...',
    fldName: 'feedback',
    rows: 4,
    value: 'Thank you for the excellent service!',
    variant: 'success',
    fbk: true,
    fbkFbkTxtSrc: 'Feedback submitted successfully',
    fbkFbkClr: 'fs500',
    fbkFbkIcn: true,
    fbkFbkIcnSrc: 'check_circle',
  },
};

export const CustomHeight: Story = {
  args: {
    fldPholdSrc: 'Write a longer message...',
    fldName: 'long-message',
    fldHeight: '200px',
    maxLength: 1000,
    fbk: true,
    fbkFbkTxtSrc: 'Maximum 1000 characters',
    fbkFbkClr: 'n500',
  },
};

export const Interactive: Story = {
  render: () => {
    const [values, setValues] = useState({
      basic: '',
      feedback: '',
      review: '',
      comments: '',
    });

    const [charCounts, setCharCounts] = useState({
      basic: 0,
      feedback: 0,
      review: 0,
      comments: 0,
    });

    const handleChange =
      (field: string, maxLength?: number) =>
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setValues(prev => ({ ...prev, [field]: value }));
        setCharCounts(prev => ({ ...prev, [field]: value.length }));
      };

    return (
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold mb-4'>Interactive Textareas</h3>
          <p className='text-sm text-gray-600 mb-6'>
            Try typing in the textareas below to see real-time character
            counting and validation.
          </p>
        </div>

        <div className='space-y-6'>
          <div>
            <h4 className='font-medium mb-2'>Basic Message</h4>
            <TextareaCtrl
              fldPholdSrc='Share your thoughts...'
              fldName='basic-message'
              rows={3}
              value={values.basic}
              onChange={handleChange('basic')}
              fbk={values.basic.length > 0}
              fbkFbkTxtSrc={`${charCounts.basic} characters`}
              fbkFbkClr='n500'
            />
          </div>

          <div>
            <h4 className='font-medium mb-2'>Feedback Form (Max 500 chars)</h4>
            <TextareaCtrl
              fldPholdSrc='Tell us about your experience...'
              fldName='feedback'
              rows={4}
              maxLength={500}
              value={values.feedback}
              onChange={handleChange('feedback', 500)}
              fbk={true}
              fbkFbkTxtSrc={`${charCounts.feedback}/500 characters ${charCounts.feedback > 450 ? '(almost full)' : ''}`}
              fbkFbkClr={charCounts.feedback > 450 ? 'fw500' : 'n500'}
              variant={charCounts.feedback > 500 ? 'error' : 'default'}
            />
          </div>

          <div>
            <h4 className='font-medium mb-2'>Product Review (Required)</h4>
            <TextareaCtrl
              fldPholdSrc='Write your review...'
              fldName='review'
              rows={5}
              required={true}
              value={values.review}
              onChange={handleChange('review')}
              fbk={true}
              fbkFbkTxtSrc={
                values.review.length === 0
                  ? 'Review is required'
                  : values.review.length < 20
                    ? 'Please write at least 20 characters'
                    : 'Great review!'
              }
              fbkFbkClr={
                values.review.length === 0 || values.review.length < 20
                  ? 'fd500'
                  : 'fs500'
              }
              fbkFbkIcn={values.review.length >= 20}
              fbkFbkIcnSrc={
                values.review.length >= 20 ? 'check_circle' : 'error'
              }
              variant={
                values.review.length === 0 || values.review.length < 20
                  ? 'error'
                  : 'success'
              }
            />
          </div>

          <div>
            <h4 className='font-medium mb-2'>Additional Comments (Optional)</h4>
            <TextareaCtrl
              fldPholdSrc='Any additional comments...'
              fldName='comments'
              fldHeight='120px'
              value={values.comments}
              onChange={handleChange('comments')}
              fbk={values.comments.length > 0}
              fbkFbkTxtSrc={`Optional field - ${charCounts.comments} characters`}
              fbkFbkClr='p500'
            />
          </div>
        </div>

        <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
          <h4 className='font-medium text-gray-800 mb-2'>Current Values</h4>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <strong>Basic:</strong> {values.basic.length} chars
            </div>
            <div>
              <strong>Feedback:</strong> {values.feedback.length}/500 chars
            </div>
            <div>
              <strong>Review:</strong> {values.review.length} chars
            </div>
            <div>
              <strong>Comments:</strong> {values.comments.length} chars
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      description: '',
      experience: '',
      suggestions: '',
      additionalInfo: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange =
      (field: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));

        // Clear error when user starts typing
        if (errors[field]) {
          setErrors(prev => ({ ...prev, [field]: '' }));
        }
      };

    const validateForm = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      } else if (formData.description.length < 50) {
        newErrors.description = 'Description must be at least 50 characters';
      }

      if (!formData.experience.trim()) {
        newErrors.experience = 'Experience feedback is required';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (validateForm()) {
        console.log('Form submitted:', formData);
        alert('Form submitted successfully! Check console for data.');
      }
    };

    return (
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Support Ticket Form</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Please fill out the required fields to submit your support request.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Issue Description *
            </label>
            <TextareaCtrl
              fldPholdSrc='Describe your issue in detail (minimum 50 characters)...'
              fldName='description'
              rows={4}
              maxLength={1000}
              required={true}
              value={formData.description}
              onChange={handleChange('description')}
              fbk={!!errors.description || formData.description.length > 0}
              fbkFbkTxtSrc={
                errors.description ||
                (formData.description.length > 0 &&
                formData.description.length < 50
                  ? `${50 - formData.description.length} more characters needed`
                  : `${formData.description.length}/1000 characters`)
              }
              fbkFbkClr={errors.description ? 'fd500' : 'n500'}
              variant={errors.description ? 'error' : 'default'}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Your Experience *
            </label>
            <TextareaCtrl
              fldPholdSrc='How has this issue affected your workflow?'
              fldName='experience'
              rows={3}
              required={true}
              value={formData.experience}
              onChange={handleChange('experience')}
              fbk={!!errors.experience}
              fbkFbkTxtSrc={errors.experience}
              fbkFbkClr='fd500'
              variant={errors.experience ? 'error' : 'default'}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Suggestions for Improvement
            </label>
            <TextareaCtrl
              fldPholdSrc='Any suggestions on how we could improve? (optional)'
              fldName='suggestions'
              rows={3}
              value={formData.suggestions}
              onChange={handleChange('suggestions')}
              fbk={formData.suggestions.length > 0}
              fbkFbkTxtSrc='Thank you for your suggestions!'
              fbkFbkClr='p500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Additional Information
            </label>
            <TextareaCtrl
              fldPholdSrc='Any other relevant information...'
              fldName='additionalInfo'
              fldHeight='150px'
              value={formData.additionalInfo}
              onChange={handleChange('additionalInfo')}
              fbk={formData.additionalInfo.length > 100}
              fbkFbkTxtSrc='Detailed information helps us resolve your issue faster'
              fbkFbkClr='fs500'
              fbkFbkIcn={true}
              fbkFbkIcnSrc='info'
            />
          </div>

          <div className='flex gap-3 pt-4 border-t border-gray-200'>
            <button
              type='submit'
              className='px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
            >
              Submit Ticket
            </button>
            <button
              type='button'
              className='px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors'
              onClick={() => {
                setFormData({
                  description: '',
                  experience: '',
                  suggestions: '',
                  additionalInfo: '',
                });
                setErrors({});
              }}
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    );
  },
};

export const VariantShowcase: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Textarea Variants</h3>
      </div>

      <div className='space-y-4'>
        <div>
          <h4 className='font-medium mb-2'>Default State</h4>
          <TextareaCtrl
            fldPholdSrc='Default textarea'
            rows={3}
            variant='default'
          />
        </div>

        <div>
          <h4 className='font-medium mb-2'>Error State</h4>
          <TextareaCtrl
            fldPholdSrc='Error textarea'
            rows={3}
            variant='error'
            fbk={true}
            fbkFbkTxtSrc='This field has an error'
            fbkFbkClr='fd500'
            fbkFbkIcn={true}
            fbkFbkIcnSrc='error'
          />
        </div>

        <div>
          <h4 className='font-medium mb-2'>Success State</h4>
          <TextareaCtrl
            fldPholdSrc='Success textarea'
            rows={3}
            variant='success'
            value='This is a valid input'
            fbk={true}
            fbkFbkTxtSrc='Input is valid'
            fbkFbkClr='fs500'
            fbkFbkIcn={true}
            fbkFbkIcnSrc='check_circle'
          />
        </div>

        <div>
          <h4 className='font-medium mb-2'>Warning State</h4>
          <TextareaCtrl
            fldPholdSrc='Warning textarea'
            rows={3}
            variant='warning'
            fbk={true}
            fbkFbkTxtSrc='This field needs attention'
            fbkFbkClr='fw500'
            fbkFbkIcn={true}
            fbkFbkIcnSrc='warning'
          />
        </div>

        <div>
          <h4 className='font-medium mb-2'>Disabled State</h4>
          <TextareaCtrl
            fldPholdSrc='Disabled textarea'
            rows={3}
            disabled={true}
            value='This textarea is disabled'
          />
        </div>

        <div>
          <h4 className='font-medium mb-2'>Read Only State</h4>
          <TextareaCtrl
            fldPholdSrc='Read only textarea'
            rows={3}
            readOnly={true}
            value='This content cannot be edited'
            fbk={true}
            fbkFbkTxtSrc='This field is read-only'
            fbkFbkClr='n500'
          />
        </div>
      </div>
    </div>
  ),
};

export const SizeVariations: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Size Variations</h3>
      </div>

      <div className='space-y-4'>
        <div>
          <h4 className='font-medium mb-2'>Small (2 rows)</h4>
          <TextareaCtrl fldPholdSrc='Small textarea' rows={2} fldName='small' />
        </div>

        <div>
          <h4 className='font-medium mb-2'>Medium (4 rows)</h4>
          <TextareaCtrl
            fldPholdSrc='Medium textarea'
            rows={4}
            fldName='medium'
          />
        </div>

        <div>
          <h4 className='font-medium mb-2'>Large (8 rows)</h4>
          <TextareaCtrl fldPholdSrc='Large textarea' rows={8} fldName='large' />
        </div>

        <div>
          <h4 className='font-medium mb-2'>Custom Height (150px)</h4>
          <TextareaCtrl
            fldPholdSrc='Custom height textarea'
            fldHeight='150px'
            fldName='custom'
          />
        </div>

        <div>
          <h4 className='font-medium mb-2'>Extra Large (300px)</h4>
          <TextareaCtrl
            fldPholdSrc='Extra large textarea for long content...'
            fldHeight='300px'
            fldName='extra-large'
            fbk={true}
            fbkFbkTxtSrc='Perfect for detailed descriptions'
            fbkFbkClr='p500'
          />
        </div>
      </div>
    </div>
  ),
};
