import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Country } from '@/types';
import { COUNTRIES } from '@/utils/constants';

interface CountrySelectorProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  disabled?: boolean;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onCountryChange,
  disabled = false,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const countryCode = event.target.value;
    const country = COUNTRIES.find((c) => c.code === countryCode);
    if (country) {
      onCountryChange(country);
    }
  };

  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id="country-select-label">Country</InputLabel>
      <Select
        labelId="country-select-label"
        id="country-select"
        value={selectedCountry.code}
        label="Country"
        onChange={handleChange}
        data-testid="country-selector"
      >
        {COUNTRIES.map((country) => (
          <MenuItem
            key={country.code}
            value={country.code}
            data-testid={`country-option-${country.code}`}
          >
            {country.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountrySelector;
