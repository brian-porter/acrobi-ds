import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
// import { action } from '@storybook/addon-actions';
import { expect, within, userEvent, waitFor } from '@storybook/test';
import { SAuthCreateAccount } from './s-auth-create-account';

/**
 * PRD v12 Auth Create Account Validation Tests
 * 
 * Comprehensive test suite for the account creation structure validating:
 * - Form validation and error handling
 * - Terms/Privacy navigation with data preservation
 * - Field focus management and accessibility
 * - Different configuration options
 * - Real-time validation feedback
 * - Async email validation
 */

const meta: Meta<typeof SAuthCreateAccount> = {
  title: 'Structures/Auth/SAuthCreateAccount Tests',
  component: SAuthCreateAccount,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Auth Create Account Validation Tests

This test suite validates the SAuthCreateAccount structure according to PRD v12:

## Test Coverage
- ✅ Form validation (email, password, names, phone)
- ✅ Real-time validation feedback
- ✅ Async email uniqueness checking
- ✅ Terms/Privacy navigation with data preservation
- ✅ Focus management (auto-focus first field)
- ✅ Accessibility compliance (ARIA labels, roles)
- ✅ Different configuration options
- ✅ Error handling and recovery
- ✅ Loading states and disabled interactions

## Validation Rules Tested
- Email format and uniqueness
- Password strength requirements
- Name validation (2+ chars, valid characters)
- Phone number format
- Required field validation
- Terms agreement requirement
        `,
      },
    },
  },
  argTypes: {
    collectPhone: {
      control: 'boolean',
      description: 'Whether to collect phone number',
    },
    collectName: {
      control: 'boolean', 
      description: 'Whether to collect first/last name',
    },
    showNewsletterOption: {
      control: 'boolean',
      description: 'Whether to show newsletter subscription option',
    },
    validateEmailUnique: {
      control: 'boolean',
      description: 'Whether to validate email uniqueness',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SAuthCreateAccount>;

/**
 * Default Configuration Test
 * Tests the component with standard settings
 */
export const DefaultConfiguration: Story = {
  args: {
    collectPhone: true,
    collectName: true,
    showNewsletterOption: true,
    validateEmailUnique: true,
    onSubmit: action('form-submitted'),
    onChange: action('form-changed'),
    onTermsClick: action('terms-clicked'),
    onPrivacyClick: action('privacy-clicked'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test 1: First field should have focus
    const firstNameInput = await canvas.findByLabelText(/first name/i);
    await waitFor(() => {
      expect(firstNameInput).toHaveFocus();
    });
    
    // Test 2: All expected fields are present
    expect(canvas.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(canvas.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(canvas.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(canvas.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(canvas.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(canvas.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(canvas.getByLabelText(/newsletter/i)).toBeInTheDocument();
    expect(canvas.getByLabelText(/terms of service/i)).toBeInTheDocument();
  },
};

/**
 * Form Validation Test
 * Tests all validation rules and error messages
 */
export const FormValidation: Story = {
  args: {
    collectPhone: true,
    collectName: true,
    validateEmailUnique: true,
    onSubmit: action('form-submitted'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test 1: Submit empty form - should prevent submission
    const submitButton = await canvas.findByRole('button', { name: /create account/i });
    expect(submitButton).toBeDisabled(); // Should be disabled without terms agreement
    
    // Test 2: Invalid email validation
    const emailInput = canvas.getByLabelText(/email address/i);
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.tab(); // Trigger validation
    
    await waitFor(() => {
      expect(canvas.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });
    
    // Test 3: Fix email and test async validation
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'admin@example.com'); // This should trigger "exists" error
    await userEvent.tab();
    
    await waitFor(() => {
      expect(canvas.getByText(/account with this email already exists/i)).toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Test 4: Password validation
    const passwordInput = canvas.getByLabelText(/^password$/i);
    await userEvent.type(passwordInput, 'weak');
    await userEvent.tab();
    
    await waitFor(() => {
      expect(canvas.getByText(/password must contain/i)).toBeInTheDocument();
    });
    
    // Test 5: Password mismatch
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'StrongPass123!');
    
    const confirmInput = canvas.getByLabelText(/confirm password/i);
    await userEvent.type(confirmInput, 'DifferentPass123!');
    await userEvent.tab();
    
    await waitFor(() => {
      expect(canvas.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
    
    // Test 6: Name validation (too short)
    const firstNameInput = canvas.getByLabelText(/first name/i);
    await userEvent.type(firstNameInput, 'A');
    await userEvent.tab();
    
    await waitFor(() => {
      expect(canvas.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    });
    
    // Test 7: Phone validation
    const phoneInput = canvas.getByLabelText(/phone number/i);
    await userEvent.type(phoneInput, '123');
    await userEvent.tab();
    
    await waitFor(() => {
      expect(canvas.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
    });
  },
};

/**
 * Terms Navigation Test  
 * Tests that clicking Terms/Privacy preserves form data
 */
export const TermsNavigation: Story = {
  args: {
    collectName: true,
    onTermsClick: action('terms-clicked'),
    onPrivacyClick: action('privacy-clicked'),
  },
  render: (args) => {
    const [modalOpen, setModalOpen] = React.useState<'terms' | 'privacy' | null>(null);
    const [formData, setFormData] = React.useState({});
    
    const handleTermsClick = () => {
      setModalOpen('terms');
      args.onTermsClick?.();
    };
    
    const handlePrivacyClick = () => {
      setModalOpen('privacy');
      args.onPrivacyClick?.();
    };
    
    const closeModal = () => {
      setModalOpen(null);
    };
    
    return (
      <div className="relative">
        <SAuthCreateAccount
          {...args}
          data={formData}
          onChange={setFormData}
          onTermsClick={handleTermsClick}
          onPrivacyClick={handlePrivacyClick}
        />
        
        {/* Modal Simulation */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h2 className="text-xl font-bold mb-4">
                {modalOpen === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                This is a simulated modal. Form data should be preserved when returning.
              </p>
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Close and Return
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test 1: Fill form with data
    await userEvent.type(canvas.getByLabelText(/first name/i), 'John');
    await userEvent.type(canvas.getByLabelText(/last name/i), 'Doe');
    await userEvent.type(canvas.getByLabelText(/email address/i), 'john@test.com');
    await userEvent.type(canvas.getByLabelText(/^password$/i), 'SecurePass123!');
    
    // Test 2: Click Terms link
    const termsLink = canvas.getByText(/terms of service/i);
    await userEvent.click(termsLink);
    
    // Test 3: Modal should appear
    await waitFor(() => {
      expect(canvas.getByText(/terms of service/i)).toBeInTheDocument();
    });
    
    // Test 4: Close modal and verify data persisted
    const closeButton = canvas.getByText(/close and return/i);
    await userEvent.click(closeButton);
    
    await waitFor(() => {
      expect(canvas.getByLabelText(/first name/i)).toHaveValue('John');
      expect(canvas.getByLabelText(/last name/i)).toHaveValue('Doe');
      expect(canvas.getByLabelText(/email address/i)).toHaveValue('john@test.com');
      expect(canvas.getByLabelText(/^password$/i)).toHaveValue('SecurePass123!');
    });
    
    // Test 5: Same test for Privacy Policy
    const privacyLink = canvas.getByText(/privacy policy/i);
    await userEvent.click(privacyLink);
    
    await waitFor(() => {
      expect(canvas.getByText(/privacy policy/i)).toBeInTheDocument();
    });
    
    await userEvent.click(canvas.getByText(/close and return/i));
    
    // Data should still be preserved
    await waitFor(() => {
      expect(canvas.getByLabelText(/first name/i)).toHaveValue('John');
    });
  },
};

/**
 * Accessibility Test
 * Tests keyboard navigation, focus management, and ARIA compliance
 */
export const AccessibilityCompliance: Story = {
  args: {
    collectName: true,
    collectPhone: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test 1: Focus management
    const firstField = await canvas.findByLabelText(/first name/i);
    await waitFor(() => {
      expect(firstField).toHaveFocus();
    });
    
    // Test 2: Tab navigation through form
    await userEvent.tab();
    expect(canvas.getByLabelText(/last name/i)).toHaveFocus();
    
    await userEvent.tab();
    expect(canvas.getByLabelText(/email address/i)).toHaveFocus();
    
    await userEvent.tab();
    expect(canvas.getByLabelText(/phone number/i)).toHaveFocus();
    
    // Test 3: Required field attributes
    expect(canvas.getByLabelText(/email address/i)).toHaveAttribute('required');
    expect(canvas.getByLabelText(/^password$/i)).toHaveAttribute('required');
    expect(canvas.getByLabelText(/confirm password/i)).toHaveAttribute('required');
    
    // Test 4: Proper input types
    expect(canvas.getByLabelText(/email address/i)).toHaveAttribute('type', 'email');
    expect(canvas.getByLabelText(/phone number/i)).toHaveAttribute('type', 'tel');
    expect(canvas.getByLabelText(/^password$/i)).toHaveAttribute('type', 'password');
    
    // Test 5: Error message accessibility
    await userEvent.type(canvas.getByLabelText(/email address/i), 'invalid');
    await userEvent.tab();
    
    await waitFor(() => {
      const errorMessage = canvas.getByText(/please enter a valid email/i);
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });
  },
};

/**
 * Loading States Test
 * Tests form behavior during loading/submission
 */
export const LoadingStates: Story = {
  args: {
    loading: true,
    data: {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'TestPass123!',
      confirmPassword: 'TestPass123!',
      agreeToTerms: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test 1: All form fields should be disabled during loading
    await waitFor(() => {
      expect(canvas.getByLabelText(/first name/i)).toBeDisabled();
      expect(canvas.getByLabelText(/email address/i)).toBeDisabled();
      expect(canvas.getByLabelText(/^password$/i)).toBeDisabled();
    });
    
    // Test 2: Submit button should show loading state
    const submitButton = canvas.getByRole('button', { name: /creating account/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  },
};

/**
 * Minimal Configuration Test
 * Tests component with minimal required fields only
 */
export const MinimalConfiguration: Story = {
  args: {
    collectPhone: false,
    collectName: false,
    showNewsletterOption: false,
    validateEmailUnique: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test 1: Only essential fields should be present
    expect(canvas.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(canvas.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(canvas.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(canvas.getByLabelText(/terms of service/i)).toBeInTheDocument();
    
    // Test 2: Optional fields should not be present
    expect(canvas.queryByLabelText(/first name/i)).not.toBeInTheDocument();
    expect(canvas.queryByLabelText(/phone number/i)).not.toBeInTheDocument();
    expect(canvas.queryByLabelText(/newsletter/i)).not.toBeInTheDocument();
    
    // Test 3: First field focus should be email (since no name fields)
    await waitFor(() => {
      expect(canvas.getByLabelText(/email address/i)).toHaveFocus();
    });
  },
};

/**
 * Success Flow Test
 * Tests successful form completion and submission
 */
export const SuccessFlow: Story = {
  args: {
    collectName: true,
    onSubmit: action('form-submitted'),
    onChange: action('form-changed'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Fill out form with valid data
    await userEvent.type(canvas.getByLabelText(/first name/i), 'John');
    await userEvent.type(canvas.getByLabelText(/last name/i), 'Doe');
    await userEvent.type(canvas.getByLabelText(/email address/i), 'john.doe@test.com');
    await userEvent.type(canvas.getByLabelText(/^password$/i), 'SecurePass123!');
    await userEvent.type(canvas.getByLabelText(/confirm password/i), 'SecurePass123!');
    
    // Agree to terms
    await userEvent.click(canvas.getByLabelText(/terms of service/i));
    
    // Submit should now be enabled
    const submitButton = canvas.getByRole('button', { name: /create account/i });
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
    
    // Submit form
    await userEvent.click(submitButton);
  },
};