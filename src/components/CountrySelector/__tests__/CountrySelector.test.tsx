import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('displays all available countries as options', () => {
    render(<CountrySelector {...defaultProps} />);

    // Open the select dropdown
    const selector = screen.getByTestId('country-selector');
    fireEvent.mouseDown(selector);

    // Check that all countries are present
    COUNTRIES.forEach((country) => {
      expect(
        screen.getByTestId(`country-option-${country.code}`)
      ).toBeInTheDocument();
      expect(screen.getByText(country.name)).toBeInTheDocument();
    });
  });

  it('calls onCountryChange when a different country is selected', () => {
    render(<CountrySelector {...defaultProps} />);

    // Open the select dropdown
    const selector = screen.getByTestId('country-selector');
    fireEvent.mouseDown(selector);

    // Select Germany
    const germanyOption = screen.getByTestId('country-option-DE');
    fireEvent.click(germanyOption);

    expect(mockOnCountryChange).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'DE',
        name: 'Germany',
      })
    );
  });

  it('can be disabled', () => {
    render(<CountrySelector {...defaultProps} disabled />);

    const selector = screen.getByTestId('country-selector');
    expect(selector).toHaveAttribute('aria-disabled', 'true');
  });

  it('displays the correct label', () => {
    render(<CountrySelector {...defaultProps} />);

    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('handles selection of the same country', () => {
    render(<CountrySelector {...defaultProps} />);

    // Open the select dropdown
    const selector = screen.getByTestId('country-selector');
    fireEvent.mouseDown(selector);

    // Select the already selected country (Italy)
    const italyOption = screen.getByTestId('country-option-IT');
    fireEvent.click(italyOption);

    expect(mockOnCountryChange).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'IT',
        name: 'Italy',
      })
    );
  });

  it('renders with accessibility attributes', () => {
    render(<CountrySelector {...defaultProps} />);

    const selector = screen.getByTestId('country-selector');
    expect(selector).toHaveAttribute('aria-labelledby');

    const label = screen.getByText('Country');
    expect(label).toBeInTheDocument();
  });
});
