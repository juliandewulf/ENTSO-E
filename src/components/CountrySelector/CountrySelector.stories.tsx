import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import CountrySelector from './CountrySelector';
import { COUNTRIES } from '@/utils/constants';

const meta: Meta<typeof CountrySelector> = {
  title: 'Components/CountrySelector',
  component: CountrySelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A dropdown selector for choosing between supported European countries.',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the selector is disabled',
    },
    onCountryChange: {
      description: 'Callback fired when a country is selected',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedCountry: COUNTRIES[0], // Italy
    onCountryChange: fn(),
  },
};

export const GermanySelected: Story = {
  args: {
    selectedCountry: COUNTRIES[1], // Germany
    onCountryChange: fn(),
  },
};

export const FranceSelected: Story = {
  args: {
    selectedCountry: COUNTRIES[2], // France
    onCountryChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    selectedCountry: COUNTRIES[0],
    onCountryChange: fn(),
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The country selector in a disabled state, typically shown during data loading.',
      },
    },
  },
};
