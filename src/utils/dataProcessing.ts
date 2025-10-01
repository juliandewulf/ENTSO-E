import { GenerationData, GenerationType } from '@/types';
import { GENERATION_TYPE_COLORS, RENEWABLE_TYPES } from './constants';

const ENTSO_E_PSR_TYPE_MAPPING: Record<string, string> = {
  A03: 'Mixed',
  A04: 'Generation',
  A05: 'Load',
  B01: 'Biomass',
  B02: 'Fossil Brown coal/Lignite',
  B03: 'Fossil Coal-derived gas',
  B04: 'Fossil Gas',
  B05: 'Fossil Hard coal',
  B06: 'Fossil Oil',
  B07: 'Fossil Oil shale',
  B08: 'Fossil Peat',
  B09: 'Geothermal',
  B10: 'Hydro Pumped Storage',
  B11: 'Hydro Run-of-river and poundage',
  B12: 'Hydro Water Reservoir',
  B13: 'Marine',
  B14: 'Nuclear',
  B15: 'Other renewable',
  B16: 'Solar',
  B17: 'Waste',
  B18: 'Wind Offshore',
  B19: 'Wind Onshore',
  B20: 'Other',
  B21: 'AC Link',
  B22: 'DC Link',
  B23: 'Substation',
  B24: 'Transformer',
  B25: 'Battery',
};

const getSimplifiedGenerationType = (fullType: string): string => {
  if (fullType.includes('Solar')) return 'Solar';
  if (fullType.includes('Wind')) return 'Wind';
  if (fullType.includes('Hydro')) return 'Hydro';
  if (fullType.includes('Nuclear')) return 'Nuclear';
  if (fullType.includes('Biomass')) return 'Biomass';
  if (fullType.includes('Geothermal')) return 'Geothermal';
  if (fullType.includes('Gas')) return 'Natural Gas';
  if (fullType.includes('Coal') || fullType.includes('Lignite')) return 'Hard coal';
  if (fullType.includes('Oil')) return 'Oil';
  if (fullType.includes('Waste')) return 'Waste';
  if (fullType.includes('Battery')) return 'Battery';
  return 'Other';
};

export const parseGenerationData = (
  xmlData: string,
  countryCode: string,
  date: string
): GenerationData => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    
    const timeSeries = xmlDoc.querySelectorAll('TimeSeries');
    const generationByType = new Map<string, number>();
    
    timeSeries.forEach((series) => {
      const psrTypeElement = series.querySelector('MktPSRType > psrType');
      const psrTypeCode = psrTypeElement?.textContent?.trim();
      
      if (!psrTypeCode) return;
      
      const fullGenerationType = ENTSO_E_PSR_TYPE_MAPPING[psrTypeCode] || 'Other';
      const generationType = getSimplifiedGenerationType(fullGenerationType);
      
      const points = series.querySelectorAll('Point');
      let totalQuantity = 0;
      
      points.forEach((point) => {
        const quantity = parseFloat(point.querySelector('quantity')?.textContent || '0');
        totalQuantity += quantity;
      });
      
      const averageQuantity = points.length > 0 ? totalQuantity / points.length : 0;
      
      if (generationByType.has(generationType)) {
        generationByType.set(generationType, generationByType.get(generationType)! + averageQuantity);
      } else {
        generationByType.set(generationType, averageQuantity);
      }
    });
    
    const parsedGenerationTypes: GenerationType[] = Array.from(generationByType.entries())
      .filter(([_, value]) => value > 0)
      .map(([type, value]) => ({
        type,
        displayName: type,
        value: Math.round(value),
        unit: 'MW',
        isRenewable: RENEWABLE_TYPES.includes(type),
        color: GENERATION_TYPE_COLORS[type] || GENERATION_TYPE_COLORS['Other'],
      }));

    const totalGeneration = parsedGenerationTypes.reduce(
      (sum, type) => sum + type.value,
      0
    );

    const renewableGeneration = parsedGenerationTypes
      .filter((type) => type.isRenewable)
      .reduce((sum, type) => sum + type.value, 0);

    const renewablePercentage = totalGeneration > 0 ? (renewableGeneration / totalGeneration) * 100 : 0;

    const topSources = parsedGenerationTypes
      .sort((a, b) => b.value - a.value)
      .slice(0, 2);


    return {
      country: countryCode,
      date,
      generationByType: parsedGenerationTypes,
      totalGeneration,
      renewablePercentage,
      topSources,
    };
  } catch (error) {
    console.error('Error parsing XML data:', error);
    
    return {
      country: countryCode,
      date,
      generationByType: [],
      totalGeneration: 0,
      renewablePercentage: 0,
      topSources: [],
    };
  }
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
    const convertedUnit = unit === 'MW' ? 'GW' : `G${unit}`;
    return `${(value / 1000).toFixed(1)} ${convertedUnit}`;
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
