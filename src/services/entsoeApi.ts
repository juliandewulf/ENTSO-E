import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { addDays, format, parse } from 'date-fns';
import { GenerationData, ApiError, DateString } from '@/types';
import { API_CONFIG } from '@/utils/constants';
import { getMockGenerationData } from './mockData';
import { parseGenerationData } from '@/utils/dataProcessing';

class EntsoeApiService {
  private axiosInstance: AxiosInstance;
  private useMockData: boolean;

  constructor() {
    this.useMockData = API_CONFIG.USE_MOCK_DATA;
    
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/xml',
        'Accept': 'application/xml',
      },
      params: {
        securityToken: API_CONFIG.TOKEN,
      },
    });
  }


  async getGenerationData(
    countryCode: string,
    date: DateString
  ): Promise<GenerationData> {
    try {
      if (this.useMockData) {
        console.log(
          `[MOCK] Fetching generation data for ${countryCode} on ${date}`
        );
        return await getMockGenerationData(countryCode, date);
      }
      const startDateTime = `${date}0000`;
      const nextDay = addDays(parse(date, "yyyyMMdd", new Date()), 1);
      const endDateTime = `${format(nextDay, 'yyyyMMdd')}0000`;


      const params = {
        documentType: 'A75', // Actual generation per type
        processType: 'A16', // Realised
        in_Domain: this.getAreaCode(countryCode),
        periodStart: startDateTime,
        periodEnd: endDateTime,
      };

      const response: AxiosResponse = await this.axiosInstance.get(
        API_CONFIG.ENDPOINTS.GENERATION,
        { params }
      );

      return parseGenerationData(response.data, countryCode, date);
    } catch (error) {
      console.error('Error fetching generation data:', error);

      const apiError: ApiError = {
        message: 'Failed to fetch generation data',
        code: 'FETCH_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error',
      };

      throw apiError;
    }
  }

  private getAreaCode(countryCode: string): string {
    const areaCodes: Record<string, string> = {
      IT: '10YIT-GRTN-----B',
      DE: '10Y1001A1001A83F',
      FR: '10YFR-RTE------C',
    };

    return areaCodes[countryCode] || countryCode;
  }

  async healthCheck(): Promise<boolean> {
    if (this.useMockData) {
      console.log('[MOCK] Health check successful');
      return true;
    }

    try {
      await this.axiosInstance.get('/ping', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

export const entsoeApi = new EntsoeApiService();
