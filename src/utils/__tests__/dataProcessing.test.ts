import { describe, it, expect } from 'vitest';
import {
  aggregateGenerationByRenewable,
  formatPowerValue,
  calculatePercentage,
  sortGenerationByValue,
} from '../dataProcessing';
import { GenerationType } from '../../types';

const mockGenerationTypes: GenerationType[] = [
  {
    type: 'Wind',
    displayName: 'Wind',
    value: 1000,
    unit: 'MW',
    isRenewable: true,
    color: '#FFEAA7',
  },
  {
    type: 'Nuclear',
    displayName: 'Nuclear',
    value: 2000,
    unit: 'MW',
    isRenewable: false,
    color: '#FF6B6B',
  },
  {
    type: 'Solar',
    displayName: 'Solar',
    value: 500,
    unit: 'MW',
    isRenewable: true,
    color: '#FDCB6E',
  },
  {
    type: 'Natural Gas',
    displayName: 'Natural Gas',
    value: 1500,
    unit: 'MW',
    isRenewable: false,
    color: '#4ECDC4',
  },
];

describe('dataProcessing utilities', () => {
  describe('aggregateGenerationByRenewable', () => {
    it('should correctly aggregate renewable and non-renewable sources', () => {
      const result = aggregateGenerationByRenewable(mockGenerationTypes);

      expect(result.renewable).toBe(1500); // Wind (1000) + Solar (500)
      expect(result.nonRenewable).toBe(3500); // Nuclear (2000) + Natural Gas (1500)
    });

    it('should handle empty array', () => {
      const result = aggregateGenerationByRenewable([]);

      expect(result.renewable).toBe(0);
      expect(result.nonRenewable).toBe(0);
    });

    it('should handle only renewable sources', () => {
      const renewableOnly = mockGenerationTypes.filter(
        (type) => type.isRenewable
      );
      const result = aggregateGenerationByRenewable(renewableOnly);

      expect(result.renewable).toBe(1500);
      expect(result.nonRenewable).toBe(0);
    });

    it('should handle only non-renewable sources', () => {
      const nonRenewableOnly = mockGenerationTypes.filter(
        (type) => !type.isRenewable
      );
      const result = aggregateGenerationByRenewable(nonRenewableOnly);

      expect(result.renewable).toBe(0);
      expect(result.nonRenewable).toBe(3500);
    });
  });

  describe('formatPowerValue', () => {
    it('should format values under 1000 as MW', () => {
      expect(formatPowerValue(500)).toBe('500 MW');
      expect(formatPowerValue(999)).toBe('999 MW');
      expect(formatPowerValue(0)).toBe('0 MW');
    });

    it('should format values 1000 and above as GW', () => {
      expect(formatPowerValue(1000)).toBe('1.0 GW');
      expect(formatPowerValue(1500)).toBe('1.5 GW');
      expect(formatPowerValue(2250)).toBe('2.3 GW');
    });

    it('should handle custom units', () => {
      expect(formatPowerValue(500, 'kW')).toBe('500 kW');
      expect(formatPowerValue(1000, 'kW')).toBe('1.0 GkW');
    });

    it('should handle decimal values correctly', () => {
      expect(formatPowerValue(1234.56)).toBe('1.2 GW');
      expect(formatPowerValue(999.9)).toBe('1000 MW');
    });
  });

  describe('calculatePercentage', () => {
    it('should calculate percentage correctly', () => {
      expect(calculatePercentage(25, 100)).toBe(25);
      expect(calculatePercentage(1, 3)).toBe(33.3);
      expect(calculatePercentage(2, 3)).toBe(66.7);
    });

    it('should handle zero total', () => {
      expect(calculatePercentage(10, 0)).toBe(0);
    });

    it('should handle zero value', () => {
      expect(calculatePercentage(0, 100)).toBe(0);
    });

    it('should handle equal value and total', () => {
      expect(calculatePercentage(100, 100)).toBe(100);
    });

    it('should round to one decimal place', () => {
      expect(calculatePercentage(1, 6)).toBe(16.7);
      expect(calculatePercentage(1, 7)).toBe(14.3);
    });
  });

  describe('sortGenerationByValue', () => {
    it('should sort generation types by value in descending order', () => {
      const sorted = sortGenerationByValue(mockGenerationTypes);

      expect(sorted[0].type).toBe('Nuclear'); // 2000
      expect(sorted[1].type).toBe('Natural Gas'); // 1500
      expect(sorted[2].type).toBe('Wind'); // 1000
      expect(sorted[3].type).toBe('Solar'); // 500
    });

    it('should not mutate the original array', () => {
      const original = [...mockGenerationTypes];
      sortGenerationByValue(mockGenerationTypes);

      expect(mockGenerationTypes).toEqual(original);
    });

    it('should handle empty array', () => {
      const result = sortGenerationByValue([]);
      expect(result).toEqual([]);
    });

    it('should handle array with one element', () => {
      const singleItem = [mockGenerationTypes[0]];
      const result = sortGenerationByValue(singleItem);

      expect(result).toEqual(singleItem);
    });

    it('should handle equal values', () => {
      const equalValues: GenerationType[] = [
        { ...mockGenerationTypes[0], value: 1000 },
        { ...mockGenerationTypes[1], value: 1000 },
      ];

      const result = sortGenerationByValue(equalValues);
      expect(result).toHaveLength(2);
      expect(result[0].value).toBe(1000);
      expect(result[1].value).toBe(1000);
    });
  });
});
