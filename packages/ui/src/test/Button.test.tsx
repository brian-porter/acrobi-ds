import { render, screen } from '@testing-library/react';
import { Button } from '../components/primitives/button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies variant classes correctly', () => {
    render(<Button variant='outline'>Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-input');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
