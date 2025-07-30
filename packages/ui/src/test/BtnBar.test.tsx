import { render, screen, fireEvent } from '@testing-library/react';
import { BtnBar } from '../components/structures/btn-bar';

describe('BtnBar', () => {
  const mockButtons = [
    { children: 'Save', onClick: vi.fn() },
    { children: 'Cancel', onClick: vi.fn() },
    { children: 'Delete', variant: 'destructive' as const },
  ];

  it('renders all buttons correctly', () => {
    render(<BtnBar buttons={mockButtons} />);

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('handles button clicks correctly', () => {
    render(<BtnBar buttons={mockButtons} />);

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(mockButtons[0].onClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockButtons[1].onClick).toHaveBeenCalledTimes(1);
  });

  it('applies horizontal orientation by default', () => {
    render(<BtnBar buttons={mockButtons} data-testid='btn-bar' />);

    expect(screen.getByTestId('btn-bar')).toHaveClass('flex-row');
  });

  it('applies vertical orientation correctly', () => {
    render(
      <BtnBar
        buttons={mockButtons}
        orientation='vertical'
        data-testid='btn-bar'
      />
    );

    expect(screen.getByTestId('btn-bar')).toHaveClass('flex-col');
  });

  it('applies different alignment options', () => {
    const { rerender } = render(
      <BtnBar buttons={mockButtons} alignment='center' data-testid='btn-bar' />
    );
    expect(screen.getByTestId('btn-bar')).toHaveClass('justify-center');

    rerender(
      <BtnBar buttons={mockButtons} alignment='end' data-testid='btn-bar' />
    );
    expect(screen.getByTestId('btn-bar')).toHaveClass('justify-end');

    rerender(
      <BtnBar buttons={mockButtons} alignment='between' data-testid='btn-bar' />
    );
    expect(screen.getByTestId('btn-bar')).toHaveClass('justify-between');
  });

  it('applies different spacing options', () => {
    const { rerender } = render(
      <BtnBar buttons={mockButtons} spacing='sm' data-testid='btn-bar' />
    );
    expect(screen.getByTestId('btn-bar')).toHaveClass('gap-2');

    rerender(
      <BtnBar buttons={mockButtons} spacing='lg' data-testid='btn-bar' />
    );
    expect(screen.getByTestId('btn-bar')).toHaveClass('gap-6');
  });

  it('applies wrap option correctly', () => {
    render(<BtnBar buttons={mockButtons} wrap data-testid='btn-bar' />);

    expect(screen.getByTestId('btn-bar')).toHaveClass('flex-wrap');
  });

  it('applies default variant and size to all buttons', () => {
    render(
      <BtnBar
        buttons={[{ children: 'Button 1' }, { children: 'Button 2' }]}
        defaultVariant='outline'
        defaultSize='lg'
      />
    );

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('border-input'); // outline variant class
      expect(button).toHaveClass('h-11'); // lg size class
    });
  });

  it('allows individual button variants to override defaults', () => {
    render(
      <BtnBar
        buttons={[
          { children: 'Default' },
          { children: 'Custom', variant: 'destructive' },
        ]}
        defaultVariant='outline'
      />
    );

    expect(screen.getByRole('button', { name: 'Default' })).toHaveClass(
      'border-input'
    );
    expect(screen.getByRole('button', { name: 'Custom' })).toHaveClass(
      'bg-destructive'
    );
  });

  it('handles disabled buttons correctly', () => {
    render(
      <BtnBar
        buttons={[
          { children: 'Enabled' },
          { children: 'Disabled', disabled: true },
        ]}
      />
    );

    expect(screen.getByRole('button', { name: 'Enabled' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });

  it('renders nothing when no buttons provided', () => {
    const { container } = render(<BtnBar buttons={[]} />);

    expect(container.firstChild).toBeNull();
  });

  it('applies role="group" for accessibility', () => {
    render(<BtnBar buttons={mockButtons} data-testid='btn-bar' />);

    expect(screen.getByTestId('btn-bar')).toHaveAttribute('role', 'group');
  });
});
