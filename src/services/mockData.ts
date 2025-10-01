import { GenerationData, GenerationType } from '@/types';
import { GENERATION_TYPE_COLORS, RENEWABLE_TYPES } from '@/utils/constants';

const createGenerationType = (
  type: string,
  value: number,
  displayName?: string
): GenerationType => ({
  type,
  displayName: displayName || type,
  value,
  unit: 'MW',
  isRenewable: RENEWABLE_TYPES.includes(type),
  color: GENERATION_TYPE_COLORS[type] || '#DCDDE1',
});

export const MOCK_GENERATION_DATA: Record<string, GenerationData> = {
  IT: {
    country: 'IT',
    date: new Date().toISOString().split('T')[0],
    generationByType: [
      createGenerationType('Natural Gas', 18500),
      createGenerationType('Hydro', 12300),
      createGenerationType('Nuclear', 0), // Italy has no nuclear
      createGenerationType('Solar', 8900),
      createGenerationType('Wind', 6200),
      createGenerationType('Coal', 4100),
      createGenerationType('Oil', 2800),
      createGenerationType('Biomass', 2100),
      createGenerationType('Geothermal', 900),
      createGenerationType('Other', 800),
    ],
    totalGeneration: 56600,
    renewablePercentage: 53.2,
    topSources: [
      createGenerationType('Natural Gas', 18500),
      createGenerationType('Hydro', 12300),
    ],
  },
  DE: {
    country: 'DE',
    date: new Date().toISOString().split('T')[0],
    generationByType: [
      createGenerationType('Wind', 28400),
      createGenerationType('Natural Gas', 22100),
      createGenerationType('Nuclear', 18900),
      createGenerationType('Lignite', 15600),
      createGenerationType('Solar', 12800),
      createGenerationType('Hard coal', 8900),
      createGenerationType('Hydro', 7200),
      createGenerationType('Biomass', 6800),
      createGenerationType('Oil', 1200),
      createGenerationType('Other', 900),
    ],
    totalGeneration: 122900,
    renewablePercentage: 45.8,
    topSources: [
      createGenerationType('Wind', 28400),
      createGenerationType('Natural Gas', 22100),
    ],
  },
  FR: {
    country: 'FR',
    date: new Date().toISOString().split('T')[0],
    generationByType: [
      createGenerationType('Nuclear', 42800),
      createGenerationType('Hydro', 14200),
      createGenerationType('Natural Gas', 8900),
      createGenerationType('Wind', 7600),
      createGenerationType('Solar', 4100),
      createGenerationType('Coal', 2800),
      createGenerationType('Oil', 1900),
      createGenerationType('Biomass', 1600),
      createGenerationType('Other', 1000),
    ],
    totalGeneration: 84900,
    renewablePercentage: 32.1,
    topSources: [
      createGenerationType('Nuclear', 42800),
      createGenerationType('Hydro', 14200),
    ],
  },
};

export const getMockGenerationData = (
  countryCode: string,
  date: string
): Promise<GenerationData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = MOCK_GENERATION_DATA[countryCode];
      if (data) {
        // Update the date in the mock data
        resolve({
          ...data,
          date,
        });
      } else {
        reject(new Error(`No data available for country: ${countryCode}`));
      }
    }, 500); // Simulate API delay
  });
};
