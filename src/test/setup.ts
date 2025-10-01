import '@testing-library/jest-dom';

// Mock environment variables
Object.defineProperty(window, 'import.meta', {
  value: {
    env: {
      VITE_ENTSOE_API_TOKEN: 'test-token',
      VITE_ENTSOE_API_BASE_URL: 'https://web-api.tp.entsoe.eu',
      VITE_USE_MOCK_DATA: 'true',
    },
  },
});

import { vi } from 'vitest';

// Mock Chart.js
vi.mock('react-chartjs-2', () => ({
  Bar: () => '<div data-testid="bar-chart">Bar Chart</div>',
  Pie: () => '<div data-testid="pie-chart">Pie Chart</div>',
}));

// Mock date-fns
vi.mock('date-fns', () => ({
  format: (date: Date) => date.toISOString().split('T')[0],
  isValid: (date: Date) => !isNaN(date.getTime()),
  parseISO: (str: string) => new Date(str),
}));
