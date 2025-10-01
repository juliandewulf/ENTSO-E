import { describe, it, expect } from 'vitest';
import { getMockGenerationData, MOCK_GENERATION_DATA } from '../mockData';

describe('mockData service', () => {
  describe('getMockGenerationData', () => {
    it('should return mock data for Italy', async () => {
      const result = await getMockGenerationData('IT', '2023-12-01');

      expect(result.country).toBe('IT');
      expect(result.date).toBe('2023-12-01');
      expect(result.generationByType).toBeDefined();
      expect(result.totalGeneration).toBeGreaterThan(0);
      expect(result.renewablePercentage).toBeGreaterThan(0);
      expect(result.topSources).toHaveLength(2);
    });

    it('should return mock data for Germany', async () => {
      const result = await getMockGenerationData('DE', '2023-12-01');

      expect(result.country).toBe('DE');
      expect(result.date).toBe('2023-12-01');
      expect(result.generationByType).toBeDefined();
      expect(result.totalGeneration).toBeGreaterThan(0);
    });

    it('should return mock data for France', async () => {
      const result = await getMockGenerationData('FR', '2023-12-01');

      expect(result.country).toBe('FR');
      expect(result.date).toBe('2023-12-01');
      expect(result.generationByType).toBeDefined();
      expect(result.totalGeneration).toBeGreaterThan(0);
    });

    it('should reject for unknown country', async () => {
      await expect(getMockGenerationData('XX', '2023-12-01')).rejects.toThrow(
        'No data available for country: XX'
      );
    });

    it('should update the date in returned data', async () => {
      const testDate = '2023-11-15';
      const result = await getMockGenerationData('IT', testDate);

      expect(result.date).toBe(testDate);
    });

    it('should simulate API delay', async () => {
      const startTime = Date.now();
      await getMockGenerationData('IT', '2023-12-01');
      const endTime = Date.now();

      expect(endTime - startTime).toBeGreaterThanOrEqual(400); // Allow some margin
    });
  });

  describe('MOCK_GENERATION_DATA', () => {
    it('should have data for all supported countries', () => {
      expect(MOCK_GENERATION_DATA.IT).toBeDefined();
      expect(MOCK_GENERATION_DATA.DE).toBeDefined();
      expect(MOCK_GENERATION_DATA.FR).toBeDefined();
    });

    it('should have proper structure for Italy data', () => {
      const italyData = MOCK_GENERATION_DATA.IT;

      expect(italyData.country).toBe('IT');
      expect(italyData.generationByType).toBeInstanceOf(Array);
      expect(italyData.totalGeneration).toBeGreaterThan(0);
      expect(italyData.renewablePercentage).toBeGreaterThan(0);
      expect(italyData.topSources).toHaveLength(2);
    });

    it('should have renewable and non-renewable sources', () => {
      const italyData = MOCK_GENERATION_DATA.IT;
      const hasRenewable = italyData.generationByType.some(
        (type) => type.isRenewable
      );
      const hasNonRenewable = italyData.generationByType.some(
        (type) => !type.isRenewable
      );

      expect(hasRenewable).toBe(true);
      expect(hasNonRenewable).toBe(true);
    });

    it('should have consistent data structure across countries', () => {
      Object.values(MOCK_GENERATION_DATA).forEach((countryData) => {
        expect(countryData.country).toBeDefined();
        expect(countryData.date).toBeDefined();
        expect(countryData.generationByType).toBeInstanceOf(Array);
        expect(countryData.totalGeneration).toBeGreaterThan(0);
        expect(countryData.renewablePercentage).toBeGreaterThanOrEqual(0);
        expect(countryData.renewablePercentage).toBeLessThanOrEqual(100);
        expect(countryData.topSources).toHaveLength(2);

        countryData.generationByType.forEach((type) => {
          expect(type.type).toBeDefined();
          expect(type.displayName).toBeDefined();
          expect(type.value).toBeGreaterThanOrEqual(0);
          expect(type.unit).toBe('MW');
          expect(typeof type.isRenewable).toBe('boolean');
          expect(type.color).toBeDefined();
        });
      });
    });
  });
});
