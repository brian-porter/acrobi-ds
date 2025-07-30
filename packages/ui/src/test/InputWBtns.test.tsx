import { render, screen, fireEvent } from '@testing-library/react';
import { InputWBtns } from '../components/structures/input-w-btns';

describe('InputWBtns', () => {
  it('renders input with right button by default', () => {
    const mockClick = vi.fn();
    render(
      <InputWBtns
        placeholder='Search...'
        buttons={[{ children: 'Search', onClick: mockClick }]}
      />
    );

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('handles button clicks correctly', () => {
    const mockClick = vi.fn();
    render(
      <InputWBtns
        placeholder='Search...'
        buttons={[{ children: 'Search', onClick: mockClick }]}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('renders multiple buttons in correct positions', () => {
    render(
      <InputWBtns
        placeholder='Search...'
        buttons={[
          { children: 'Clear', position: 'left' },
          { children: 'Filter', position: 'middle' },
          { children: 'Search', position: 'right' },
        ]}
      />
    );

    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filter' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('disables all buttons and input when disabled', () => {
    render(
      <InputWBtns
        placeholder='Search...'
        disabled
        buttons={[{ children: 'Search' }]}
      />
    );

    expect(screen.getByPlaceholderText('Search...')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled();
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(
      <InputWBtns
        placeholder='Search...'
        size='sm'
        buttons={[{ children: 'Go' }]}
      />
    );

    let container = screen.getByPlaceholderText('Search...').parentElement;
    expect(container).toHaveClass('text-sm');

    rerender(
      <InputWBtns
        placeholder='Search...'
        size='lg'
        buttons={[{ children: 'Go' }]}
      />
    );

    container = screen.getByPlaceholderText('Search...').parentElement;
    expect(container).toHaveClass('text-lg');
  });

  it('applies variant styles correctly', () => {
    render(
      <InputWBtns
        placeholder='Search...'
        variant='filled'
        buttons={[{ children: 'Go' }]}
        containerClassName='test-container'
      />
    );

    const container = screen.getByPlaceholderText('Search...').parentElement;
    expect(container).toHaveClass('bg-muted');
  });

  it('handles individual button disabled state', () => {
    render(
      <InputWBtns
        placeholder='Search...'
        buttons={[
          { children: 'Clear', disabled: true },
          { children: 'Search', disabled: false },
        ]}
      />
    );

    expect(screen.getByRole('button', { name: 'Clear' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Search' })).not.toBeDisabled();
  });

  it('passes through input props correctly', () => {
    render(
      <InputWBtns
        placeholder='Enter text...'
        value='test value'
        readOnly
        buttons={[{ children: 'Submit' }]}
      />
    );

    const input = screen.getByPlaceholderText('Enter text...');
    expect(input).toHaveValue('test value');
    expect(input).toHaveAttribute('readonly');
  });
});
