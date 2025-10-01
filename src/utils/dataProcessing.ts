import { GenerationData, GenerationType } from '../types';
import { GENERATION_TYPE_COLORS } from './constants';

export const parseGenerationData = (
  _xmlData: string,
  countryCode: string,
  date: string
): GenerationData => {
  // This would parse the XML response from ENTSO-E API
  // For now, returning mock data structure
  // In real implementation, this would parse XML and extract generation values

  const mockGenerationTypes: GenerationType[] = [
    {
      type: 'Natural Gas',
      displayName: 'Natural Gas',
      value: 15000,
      unit: 'MW',
      isRenewable: false,
      color: GENERATION_TYPE_COLORS['Natural Gas'],
    },
    {
      type: 'Nuclear',
      displayName: 'Nuclear',
      value: 12000,
      unit: 'MW',
      isRenewable: false,
      color: GENERATION_TYPE_COLORS['Nuclear'],
    },
  ];

  const totalGeneration = mockGenerationTypes.reduce(
    (sum, type) => sum + type.value,
    0
  );

  const renewableGeneration = mockGenerationTypes
    .filter((type) => type.isRenewable)
    .reduce((sum, type) => sum + type.value, 0);

  const renewablePercentage = (renewableGeneration / totalGeneration) * 100;

  const topSources = mockGenerationTypes
    .sort((a, b) => b.value - a.value)
    .slice(0, 2);

  return {
    country: countryCode,
    date,
    generationByType: mockGenerationTypes,
    totalGeneration,
    renewablePercentage,
    topSources,
  };
};

export const aggregateGenerationByRenewable = (
  generationTypes: GenerationType[]
): { renewable: number; nonRenewable: number } => {
  const renewable = generationTypes
    .filter((type) => type.isRenewable)
    .reduce((sum, type) => sum + type.value, 0);

  const nonRenewable = generationTypes
    .filter((type) => !type.isRenewable)
    .reduce((sum, type) => sum + type.value, 0);

  return { renewable, nonRenewable };
};

export const formatPowerValue = (value: number, unit = 'MW'): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)} G${unit}`;
  }
  return `${value.toFixed(0)} ${unit}`;
};

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Number(((value / total) * 100).toFixed(1));
};

export const sortGenerationByValue = (
  generationTypes: GenerationType[]
): GenerationType[] => {
  return [...generationTypes].sort((a, b) => b.value - a.value);
};
