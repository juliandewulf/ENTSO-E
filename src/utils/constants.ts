import { Country } from '../types';

export const COUNTRIES: Country[] = [
  {
    code: 'IT',
    name: 'Italy',
    entsoeCode: '10YIT-GRTN-----B',
  },
  {
    code: 'DE',
    name: 'Germany',
    entsoeCode: '10Y1001A1001A83F',
  },
  {
    code: 'FR',
    name: 'France',
    entsoeCode: '10YFR-RTE------C',
  },
];

export const DEFAULT_COUNTRY = COUNTRIES[0]; // Italy

export const GENERATION_TYPE_COLORS: Record<string, string> = {
  Nuclear: '#FF6B6B',
  Lignite: '#8B4513',
  'Hard coal': '#2F2F2F',
  'Natural Gas': '#4ECDC4',
  Oil: '#45B7D1',
  Hydro: '#96CEB4',
  Wind: '#FFEAA7',
  Solar: '#FDCB6E',
  Geothermal: '#E17055',
  Biomass: '#74B9FF',
  Waste: '#A29BFE',
  Other: '#DCDDE1',
};

export const RENEWABLE_TYPES = [
  'Hydro',
  'Wind',
  'Solar',
  'Geothermal',
  'Biomass',
];

export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_ENTSOE_API_BASE_URL || 'https://web-api.tp.entsoe.eu',
  TOKEN: import.meta.env.VITE_ENTSOE_API_TOKEN,
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true',
  ENDPOINTS: {
    GENERATION: '/api',
  },
};
