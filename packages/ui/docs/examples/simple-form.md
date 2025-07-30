# Simple Form Example

A basic contact form implementation using Acrobi Design System components with validation and accessibility features.

## Overview

This example demonstrates how to build a simple, accessible contact form using the Acrobi Design System. It includes form validation, error handling, and proper accessibility attributes.

## Features

- **Form Validation** - Client-side validation with error messages
- **Accessibility** - Proper ARIA attributes and keyboard navigation
- **Responsive Design** - Mobile-friendly layout
- **Loading States** - Submit button loading indicator
- **Success Feedback** - Form submission confirmation

## Implementation

### Basic Form Structure

```tsx
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  TextField,
  SelectField,
  TextareaField,
  CheckboxField,
  Button,
  Alert,
  AlertDescription
} from '@acrobi/ui';
import { useState } from 'react';

function SimpleContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    newsletter: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful submission
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        newsletter: false
      });
      setErrors({});
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <Alert variant="success">
            <AlertDescription>
              Thank you for your message! We'll get back to you soon.
            </AlertDescription>
          </Alert>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>
          Send us a message and we'll respond as soon as possible.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.submit && (
            <Alert variant="destructive">
              <AlertDescription>{errors.submit}</AlertDescription>
            </Alert>
          )}

          <TextField
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
            required
          />

          <TextField
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            required
          />

          <SelectField
            label="Subject"
            placeholder="Select a subject"
            value={formData.subject}
            onValueChange={(value) => handleInputChange('subject', value)}
            error={errors.subject}
            options={[
              { value: 'general', label: 'General Inquiry' },
              { value: 'support', label: 'Technical Support' },
              { value: 'sales', label: 'Sales Question' },
              { value: 'feedback', label: 'Feedback' },
              { value: 'other', label: 'Other' }
            ]}
            required
          />

          <TextareaField
            label="Message"
            placeholder="Enter your message here..."
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            error={errors.message}
            rows={4}
            required
          />

          <CheckboxField
            label="Subscribe to newsletter"
            description="Get updates about new features and announcements"
            checked={formData.newsletter}
            onCheckedChange={(checked) => handleInputChange('newsletter', checked)}
          />

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default SimpleContactForm;
```

### Enhanced Version with Real-time Validation

```tsx
import { useEffect } from 'react';

function EnhancedContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    newsletter: false
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Real-time validation
  useEffect(() => {
    const newErrors = {};

    if (touched.name && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (touched.email && !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (touched.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (touched.subject && !formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (touched.message && !formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0 && 
               formData.name && formData.email && formData.subject && formData.message);
  }, [formData, touched]);

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>
          Send us a message and we'll respond as soon as possible.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form className="space-y-4">
          <TextField
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            error={touched.name ? errors.name : ''}
            required
          />

          <TextField
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            error={touched.email ? errors.email : ''}
            required
          />

          <SelectField
            label="Subject"
            placeholder="Select a subject"
            value={formData.subject}
            onValueChange={(value) => handleInputChange('subject', value)}
            onBlur={() => handleBlur('subject')}
            error={touched.subject ? errors.subject : ''}
            options={[
              { value: 'general', label: 'General Inquiry' },
              { value: 'support', label: 'Technical Support' },
              { value: 'sales', label: 'Sales Question' },
              { value: 'feedback', label: 'Feedback' },
              { value: 'other', label: 'Other' }
            ]}
            required
          />

          <TextareaField
            label="Message"
            placeholder="Enter your message here..."
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            error={touched.message ? errors.message : ''}
            rows={4}
            required
          />

          <CheckboxField
            label="Subscribe to newsletter"
            description="Get updates about new features and announcements"
            checked={formData.newsletter}
            onCheckedChange={(checked) => handleInputChange('newsletter', checked)}
          />

          <Button 
            type="submit" 
            className="w-full"
            disabled={!isValid}
          >
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

## Key Features Explained

### Form Validation
The form includes comprehensive validation:
- **Required fields** - Name, email, subject, and message
- **Email format** - Validates email format using regex
- **Minimum length** - Name (2 chars) and message (10 chars)
- **Real-time feedback** - Errors clear as user types

### Accessibility Features
- **Semantic HTML** - Proper form structure with labels
- **ARIA attributes** - Error messages linked with `aria-describedby`
- **Keyboard navigation** - Full keyboard accessibility
- **Screen reader support** - Proper announcements for errors and success

### User Experience
- **Loading states** - Button shows loading during submission
- **Success feedback** - Clear confirmation after submission
- **Error handling** - Graceful error handling with retry options
- **Progressive enhancement** - Works without JavaScript

## Styling and Customization

### Custom Styling
```tsx
<Card className="max-w-lg mx-auto shadow-lg">
  <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
    <CardTitle>Get in Touch</CardTitle>
    <CardDescription className="text-blue-100">
      We'd love to hear from you
    </CardDescription>
  </CardHeader>
  {/* Form content */}
</Card>
```

### Responsive Layout
```tsx
<div className="container mx-auto px-4 py-8">
  <div className="max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
    <Card>
      {/* Form content */}
    </Card>
  </div>
</div>
```

## Testing

### Unit Tests
```tsx
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SimpleContactForm from './SimpleContactForm';

test('validates required fields', async () => {
  render(<SimpleContactForm />);
  
  const submitButton = screen.getByRole('button', { name: /send message/i });
  fireEvent.click(submitButton);
  
  await waitFor(() => {
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });
});

test('submits form with valid data', async () => {
  render(<SimpleContactForm />);
  
  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { value: 'John Doe' }
  });
  
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'john@example.com' }
  });
  
  // ... fill other fields
  
  fireEvent.click(screen.getByRole('button', { name: /send message/i }));
  
  await waitFor(() => {
    expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
  });
});
```

### Integration Tests
```tsx
test('form submission calls API correctly', async () => {
  const mockSubmit = jest.fn();
  
  render(<SimpleContactForm onSubmit={mockSubmit} />);
  
  // Fill form and submit
  
  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'general',
      message: 'Test message',
      newsletter: false
    });
  });
});
```

## Best Practices Demonstrated

1. **Progressive Enhancement** - Form works without JavaScript
2. **Accessibility First** - Proper ARIA attributes and keyboard navigation
3. **User Feedback** - Clear validation messages and loading states
4. **Error Handling** - Graceful error handling with retry options
5. **Performance** - Efficient re-rendering with proper state management

## Related Examples

- [Advanced Forms](./advanced-forms.md) - Multi-step forms with complex validation
- [Form Validation](./form-validation.md) - Advanced validation patterns
- [Responsive Design](./responsive-design.md) - Mobile-first form layouts

## Next Steps

- Add file upload functionality
- Implement multi-step form flow
- Add form analytics and tracking
- Integrate with backend API
- Add internationalization support