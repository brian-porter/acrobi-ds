import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectlistCtrl } from './selectlist-ctrl';
import type { SelectOption } from './selectlist-ctrl';

// Mock data
const basicOptions: SelectOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

const optionsWithIcons: SelectOption[] = [
  { value: 'us', label: 'United States', icon: 'flag' },
  { value: 'uk', label: 'United Kingdom', icon: 'flag' },
  { value: 'ca', label: 'Canada', icon: 'flag' },
];

const optionsWithSubtitles: SelectOption[] = [
  { value: 'basic', label: 'Basic Plan', subtitle: '$9/month' },
  { value: 'pro', label: 'Pro Plan', subtitle: '$29/month' },
  { value: 'enterprise', label: 'Enterprise Plan', subtitle: '$99/month' },
];

describe('SelectlistCtrl', () => {
  describe('Basic Functionality', () => {
    it('renders with default props', () => {
      render(<SelectlistCtrl options={basicOptions} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Select an option...')).toBeInTheDocument();
    });

    it('does not render when fldSelect is false', () => {
      render(<SelectlistCtrl options={basicOptions} fldSelect={false} />);

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders with custom placeholder', () => {
      render(
        <SelectlistCtrl options={basicOptions} pHoldSrc='Choose something...' />
      );

      expect(screen.getByText('Choose something...')).toBeInTheDocument();
    });

    it('applies custom field ID', () => {
      render(<SelectlistCtrl options={basicOptions} fldId='custom-select' />);

      expect(screen.getByRole('button')).toHaveAttribute('id', 'custom-select');
    });

    it('applies CSS classes correctly', () => {
      const { container } = render(
        <SelectlistCtrl options={basicOptions} className='custom-class' />
      );

      const wrapper = container.querySelector('.selectlist_wrap');
      expect(wrapper).toHaveClass('selectlist_wrap', 'custom-class');
    });
  });

  describe('Top Label', () => {
    it('renders top label when enabled', () => {
      render(
        <SelectlistCtrl
          options={basicOptions}
          topLbl={true}
          topLblSrc='Select Country'
          fldId='country-select'
        />
      );

      expect(screen.getByText('Select Country')).toBeInTheDocument();
      expect(screen.getByLabelText('Select Country')).toBeInTheDocument();
    });

    it('does not render top label when disabled', () => {
      render(
        <SelectlistCtrl
          options={basicOptions}
          topLbl={false}
          topLblSrc='Should not appear'
        />
      );

      expect(screen.queryByText('Should not appear')).not.toBeInTheDocument();
    });

    it('applies label color and size correctly', () => {
      render(
        <SelectlistCtrl
          options={basicOptions}
          topLbl={true}
          topLblSrc='Styled Label'
          topLblSz='r2'
          topLblClr='p500'
        />
      );

      expect(screen.getByText('Styled Label')).toBeInTheDocument();
    });
  });

  describe('Helper Text', () => {
    it('renders helper text when enabled', () => {
      render(
        <SelectlistCtrl
          options={basicOptions}
          helperTxt={true}
          helperTxtSrc='This is helper text'
        />
      );

      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('does not render helper text when disabled', () => {
      render(
        <SelectlistCtrl
          options={basicOptions}
          helperTxt={false}
          helperTxtSrc='Should not appear'
        />
      );

      expect(screen.queryByText('Should not appear')).not.toBeInTheDocument();
    });
  });

  describe('Feedback System', () => {
    it('renders feedback when enabled', () => {
      render(
        <SelectlistCtrl
          options={basicOptions}
          fbk={true}
          fbkFbkTxt={true}
          fbkFbkTxtSrc='Feedback message'
        />
      );

      expect(screen.getByText('Feedback message')).toBeInTheDocument();
    });

    it('does not render feedback when disabled', () => {
      render(
        <SelectlistCtrl
          options={basicOptions}
          fbk={false}
          fbkFbkTxtSrc='Should not appear'
        />
      );

      expect(screen.queryByText('Should not appear')).not.toBeInTheDocument();
    });

    it('applies feedback colors correctly', () => {
      render(
        <SelectlistCtrl
          options={basicOptions}
          fbk={true}
          fbkFbkTxt={true}
          fbkFbkTxtSrc='Error message'
          fbkFbkClr='fd500'
        />
      );

      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  describe('Dropdown Interaction', () => {
    it('opens dropdown when clicked', async () => {
      const user = userEvent.setup();
      render(<SelectlistCtrl options={basicOptions} />);

      const toggle = screen.getByRole('button');
      await user.click(toggle);

      expect(toggle).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('closes dropdown when clicking outside', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <SelectlistCtrl options={basicOptions} />
          <div data-testid='outside'>Outside element</div>
        </div>
      );

      const toggle = screen.getByRole('button');
      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-expanded', 'true');

      await user.click(screen.getByTestId('outside'));
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });

    it('selects option when clicked', async () => {
      const user = userEvent.setup();
      const onChangeMock = jest.fn();

      render(<SelectlistCtrl options={basicOptions} onChange={onChangeMock} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Option 2'));

      expect(onChangeMock).toHaveBeenCalledWith('2');
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('shows selected option after selection', async () => {
      const user = userEvent.setup();

      render(<SelectlistCtrl options={basicOptions} value='2' />);

      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('handles disabled state correctly', async () => {
      const user = userEvent.setup();

      render(<SelectlistCtrl options={basicOptions} disabled={true} />);

      const toggle = screen.getByRole('button');
      expect(toggle).toBeDisabled();

      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Keyboard Navigation', () => {
    it('opens dropdown with Enter key', async () => {
      const user = userEvent.setup();
      render(<SelectlistCtrl options={basicOptions} />);

      const toggle = screen.getByRole('button');
      await user.type(toggle, '{Enter}');

      expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });

    it('opens dropdown with Space key', async () => {
      const user = userEvent.setup();
      render(<SelectlistCtrl options={basicOptions} />);

      const toggle = screen.getByRole('button');
      await user.type(toggle, ' ');

      expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });

    it('closes dropdown with Escape key', async () => {
      const user = userEvent.setup();
      render(<SelectlistCtrl options={basicOptions} />);

      const toggle = screen.getByRole('button');
      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-expanded', 'true');

      await user.type(toggle, '{Escape}');
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });

    it('opens dropdown with Arrow Down key', async () => {
      const user = userEvent.setup();
      render(<SelectlistCtrl options={basicOptions} />);

      const toggle = screen.getByRole('button');
      await user.type(toggle, '{ArrowDown}');

      expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Search Functionality', () => {
    it('renders search input when searchable is true', async () => {
      const user = userEvent.setup();

      render(
        <SelectlistCtrl
          options={basicOptions}
          searchable={true}
          searchPlaceholder='Search options...'
        />
      );

      await user.click(screen.getByRole('button'));

      expect(
        screen.getByPlaceholderText('Search options...')
      ).toBeInTheDocument();
    });

    it('filters options based on search term', async () => {
      const user = userEvent.setup();

      render(<SelectlistCtrl options={basicOptions} searchable={true} />);

      await user.click(screen.getByRole('button'));
      const searchInput = screen.getByPlaceholderText('Search...');

      await user.type(searchInput, '2');

      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
    });

    it('shows "No options found" when search yields no results', async () => {
      const user = userEvent.setup();

      render(<SelectlistCtrl options={basicOptions} searchable={true} />);

      await user.click(screen.getByRole('button'));
      const searchInput = screen.getByPlaceholderText('Search...');

      await user.type(searchInput, 'nonexistent');

      expect(screen.getByText('No options found')).toBeInTheDocument();
    });

    it('clears search when dropdown closes', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <SelectlistCtrl options={basicOptions} searchable={true} />
          <div data-testid='outside'>Outside</div>
        </div>
      );

      await user.click(screen.getByRole('button'));
      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'test');

      await user.click(screen.getByTestId('outside'));
      await user.click(screen.getByRole('button'));

      const newSearchInput = screen.getByPlaceholderText('Search...');
      expect(newSearchInput).toHaveValue('');
    });
  });

  describe('Form Integration', () => {
    it('renders hidden native select with correct attributes', () => {
      render(
        <SelectlistCtrl
          options={basicOptions}
          selectName='test-select'
          value='2'
          required={true}
          disabled={false}
        />
      );

      const hiddenSelect = screen.getByRole('combobox', { hidden: true });
      expect(hiddenSelect).toHaveAttribute('name', 'test-select');
      expect(hiddenSelect).toHaveValue('2');
      expect(hiddenSelect).toBeRequired();
      expect(hiddenSelect).not.toBeDisabled();
    });

    it('syncs hidden select with component state', async () => {
      const user = userEvent.setup();

      render(
        <SelectlistCtrl options={basicOptions} selectName='test-select' />
      );

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Option 2'));

      const hiddenSelect = screen.getByRole('combobox', { hidden: true });
      expect(hiddenSelect).toHaveValue('2');
    });

    it('handles form submission correctly', () => {
      const onSubmitMock = jest.fn(e => e.preventDefault());

      render(
        <form onSubmit={onSubmitMock}>
          <SelectlistCtrl
            options={basicOptions}
            selectName='test-select'
            value='2'
          />
          <button type='submit'>Submit</button>
        </form>
      );

      fireEvent.click(screen.getByText('Submit'));
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });

  describe('Options with Icons and Subtitles', () => {
    it('renders options with icons', async () => {
      const user = userEvent.setup();

      render(<SelectlistCtrl options={optionsWithIcons} />);

      await user.click(screen.getByRole('button'));

      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('United Kingdom')).toBeInTheDocument();
      expect(screen.getByText('Canada')).toBeInTheDocument();
    });

    it('renders options with subtitles', async () => {
      const user = userEvent.setup();

      render(<SelectlistCtrl options={optionsWithSubtitles} />);

      await user.click(screen.getByRole('button'));

      expect(screen.getByText('Basic Plan')).toBeInTheDocument();
      expect(screen.getByText('$9/month')).toBeInTheDocument();
      expect(screen.getByText('Pro Plan')).toBeInTheDocument();
      expect(screen.getByText('$29/month')).toBeInTheDocument();
    });

    it('searches in subtitles when searchable', async () => {
      const user = userEvent.setup();

      render(
        <SelectlistCtrl options={optionsWithSubtitles} searchable={true} />
      );

      await user.click(screen.getByRole('button'));
      const searchInput = screen.getByPlaceholderText('Search...');

      await user.type(searchInput, '$29');

      expect(screen.getByText('Pro Plan')).toBeInTheDocument();
      expect(screen.queryByText('Basic Plan')).not.toBeInTheDocument();
      expect(screen.queryByText('Enterprise Plan')).not.toBeInTheDocument();
    });
  });

  describe('Disabled Options', () => {
    const optionsWithDisabled: SelectOption[] = [
      { value: '1', label: 'Available Option' },
      { value: '2', label: 'Disabled Option', disabled: true },
      { value: '3', label: 'Another Available Option' },
    ];

    it('renders disabled options with correct styling', async () => {
      const user = userEvent.setup();

      render(<SelectlistCtrl options={optionsWithDisabled} />);

      await user.click(screen.getByRole('button'));

      const disabledOption = screen
        .getByText('Disabled Option')
        .closest('.selectitem');
      expect(disabledOption).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('prevents selection of disabled options', async () => {
      const user = userEvent.setup();
      const onChangeMock = jest.fn();

      render(
        <SelectlistCtrl options={optionsWithDisabled} onChange={onChangeMock} />
      );

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Disabled Option'));

      expect(onChangeMock).not.toHaveBeenCalled();
    });
  });

  describe('Border Color Variants', () => {
    it('applies danger border color', () => {
      const { container } = render(
        <SelectlistCtrl options={basicOptions} fldBrdClr='d' />
      );

      const wrapper = container.querySelector('.selectlist_wrap');
      expect(wrapper).toHaveAttribute('data-field-brd', 'd');
    });

    it('applies warning border color', () => {
      const { container } = render(
        <SelectlistCtrl options={basicOptions} fldBrdClr='w' />
      );

      const wrapper = container.querySelector('.selectlist_wrap');
      expect(wrapper).toHaveAttribute('data-field-brd', 'w');
    });

    it('applies success border color', () => {
      const { container } = render(
        <SelectlistCtrl options={basicOptions} fldBrdClr='s' />
      );

      const wrapper = container.querySelector('.selectlist_wrap');
      expect(wrapper).toHaveAttribute('data-field-brd', 's');
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<SelectlistCtrl options={basicOptions} />);

      const toggle = screen.getByRole('button');
      expect(toggle).toHaveAttribute('aria-haspopup', 'listbox');
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates aria-expanded when dropdown opens', async () => {
      const user = userEvent.setup();
      render(<SelectlistCtrl options={basicOptions} />);

      const toggle = screen.getByRole('button');
      await user.click(toggle);

      expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });

    it('has correct tab order', () => {
      render(<SelectlistCtrl options={basicOptions} tabOrder='5' />);

      const toggle = screen.getByRole('button');
      expect(toggle).toHaveAttribute('tabindex', '5');
    });

    it('marks required field correctly', () => {
      render(<SelectlistCtrl options={basicOptions} required={true} />);

      const toggle = screen.getByRole('button');
      expect(toggle).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Custom Rendering', () => {
    it('uses custom render function when provided', async () => {
      const user = userEvent.setup();
      const customRender = (option: SelectOption, isSelected: boolean) => (
        <div data-testid={`custom-${option.value}`}>
          Custom: {option.label} {isSelected ? '(Selected)' : ''}
        </div>
      );

      render(
        <SelectlistCtrl
          options={basicOptions}
          value='2'
          renderOption={customRender}
        />
      );

      await user.click(screen.getByRole('button'));

      expect(screen.getByTestId('custom-1')).toHaveTextContent(
        'Custom: Option 1'
      );
      expect(screen.getByTestId('custom-2')).toHaveTextContent(
        'Custom: Option 2 (Selected)'
      );
      expect(screen.getByTestId('custom-3')).toHaveTextContent(
        'Custom: Option 3'
      );
    });
  });

  describe('Dropdown Positioning', () => {
    it('applies dropdown position class', async () => {
      const user = userEvent.setup();

      render(<SelectlistCtrl options={basicOptions} dropdownPosition='top' />);

      await user.click(screen.getByRole('button'));

      const dropdown = document.querySelector('.selectlist-drop');
      expect(dropdown).toHaveClass('bottom-full', 'mb-1');
    });
  });
});
