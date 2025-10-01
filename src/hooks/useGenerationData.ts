import { useState, useEffect, useCallback } from 'react';
import { GenerationData, ApiResponse, Country, DateString } from '../types';
import { entsoeApi } from '../services/entsoeApi';

export const useGenerationData = (
  selectedCountry: Country,
  selectedDate: DateString
) => {
  const [data, setData] = useState<ApiResponse<GenerationData>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  const fetchData = useCallback(async () => {
    setData((prev) => ({ ...prev, loading: true, error: undefined }));

    try {
      const generationData = await entsoeApi.getGenerationData(
        selectedCountry.code,
        selectedDate
      );

      setData({
        loading: false,
        data: generationData,
        error: undefined,
      });
    } catch (error) {
      console.error('Failed to fetch generation data:', error);

      const apiError = {
        message: 'Failed to load generation data',
        details: error instanceof Error ? error.message : 'Unknown error',
      };

      setData({
        loading: false,
        data: undefined,
        error: apiError,
      });
    }
  }, [selectedCountry.code, selectedDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...data,
    refetch,
  };
};
