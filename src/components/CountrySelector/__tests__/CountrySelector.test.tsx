import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import CountrySelector from '@/components/CountrySelector/CountrySelector';
import { COUNTRIES } from '@/utils/constants';

const mockOnCountryChange = vi.fn();

const defaultProps = {
  selectedCountry: COUNTRIES[0], // Italy
  onCountryChange: mockOnCountryChange,
};

describe('CountrySelector', () => {
  beforeEach(() => {
    mockOnCountryChange.mockClear();
  });

  it('renders with selected country', () => {
    render(<CountrySelector {...defaultProps} />);

    const selector = screen.getByTestId('country-selector');
    expect(selector).toBeInTheDocument();
    expect(screen.getByDisplayValue('IT')).toBeInTheDocument();
  });

  it('displays all available countries as options', async () => {
    const user = userEvent.setup();
    render(<CountrySelector {...defaultProps} />);

    // Open the select dropdown by clicking on it
    const selector = screen.getByRole('combobox');
    await user.click(selector);

    // Wait for the dropdown to open and check that all countries are present
    await waitFor(() => {
      COUNTRIES.forEach((country) => {
        expect(
          screen.getByTestId(`country-option-${country.code}`)
        ).toBeInTheDocument();
      });
    });
  });

  it('calls onCountryChange when a different country is selected', async () => {
    const user = userEvent.setup();
    render(<CountrySelector {...defaultProps} />);

    // Open the select dropdown
    const selector = screen.getByRole('combobox');
    await user.click(selector);

    // Wait for the dropdown to open, then select Germany
    await waitFor(() => {
      expect(screen.getByTestId('country-option-DE')).toBeInTheDocument();
    });
    
    const germanyOption = screen.getByTestId('country-option-DE');
    await user.click(germanyOption);

    expect(mockOnCountryChange).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'DE',
        name: 'Germany',
      })
    );
  });

  it('can be disabled', () => {
    render(<CountrySelector {...defaultProps} disabled />);

    const selector = screen.getByRole('combobox');
    expect(selector).toBeInTheDocument();
    expect(selector).toHaveAttribute('aria-disabled', 'true');
  });

  it('displays the correct label', () => {
    render(<CountrySelector {...defaultProps} />);

    expect(screen.getByLabelText('Country')).toBeInTheDocument();
  });

  it('does not call onCountryChange when the same country is selected', async () => {
    const user = userEvent.setup();
    render(<CountrySelector {...defaultProps} />);

    // Open the select dropdown
    const selector = screen.getByRole('combobox');
    await user.click(selector);

    // Wait for the dropdown to open, then select the already selected country (Italy)
    await waitFor(() => {
      expect(screen.getByTestId('country-option-IT')).toBeInTheDocument();
    });
    
    const italyOption = screen.getByTestId('country-option-IT');
    await user.click(italyOption);

    // Material-UI Select doesn't fire onChange when selecting the same value
    expect(mockOnCountryChange).not.toHaveBeenCalled();
  });

  it('renders with accessibility attributes', () => {
    render(<CountrySelector {...defaultProps} />);

    const selector = screen.getByRole('combobox');
    expect(selector).toHaveAttribute('aria-labelledby');

    const label = screen.getByLabelText('Country');
    expect(label).toBeInTheDocument();
  });
});
