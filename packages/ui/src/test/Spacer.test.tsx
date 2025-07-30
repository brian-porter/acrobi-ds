import { render, screen } from '@testing-library/react';
import { Spacer } from '../components/primitives/spacer';

describe('Spacer', () => {
  it('renders with default vertical axis and medium size', () => {
    render(<Spacer data-testid='spacer' />);
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveClass('block', 'w-full', 'h-4');
    expect(spacer).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders with horizontal axis', () => {
    render(<Spacer axis='horizontal' data-testid='spacer' />);
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveClass('inline-block', 'w-4');
    expect(spacer).not.toHaveClass('w-full');
  });

  it('applies correct size classes for vertical spacing', () => {
    render(<Spacer axis='vertical' size='lg' data-testid='spacer' />);
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveClass('h-6');
  });

  it('applies correct size classes for horizontal spacing', () => {
    render(<Spacer axis='horizontal' size='xl' data-testid='spacer' />);
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveClass('w-8');
  });

  it('applies custom className', () => {
    render(<Spacer className='custom-class' data-testid='spacer' />);
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveClass('custom-class');
  });

  it('supports all size variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;
    const expectedVerticalClasses = [
      'h-1',
      'h-2',
      'h-4',
      'h-6',
      'h-8',
      'h-12',
      'h-16',
      'h-20',
    ];

    sizes.forEach((size, index) => {
      const { unmount } = render(
        <Spacer size={size} data-testid={`spacer-${size}`} />
      );
      const spacer = screen.getByTestId(`spacer-${size}`);
      expect(spacer).toHaveClass(expectedVerticalClasses[index]);
      unmount();
    });
  });
});
