export interface Country {
  code: string;
  name: string;
  entsoeCode: string;
}

export interface GenerationData {
  country: string;
  date: string;
  generationByType: GenerationType[];
  totalGeneration: number;
  renewablePercentage: number;
  topSources: GenerationType[];
}

export interface GenerationType {
  type: string;
  displayName: string;
  value: number;
  unit: string;
  isRenewable: boolean;
  color: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  loading: boolean;
}

export type DateString = string; // ISO date string (yyyyMMdd)

export interface ChartDataPoint {
  label: string;
  value: number;
  color: string;
  isRenewable: boolean;
}
