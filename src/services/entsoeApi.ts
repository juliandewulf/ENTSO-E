import axios, { AxiosResponse } from 'axios';
import { GenerationData, ApiError } from '../types';
import { API_CONFIG } from '../utils/constants';
import { getMockGenerationData } from './mockData';
import { parseGenerationData } from '../utils/dataProcessing';

class EntsoeApiService {
  private baseURL: string;
  private token: string;
  private useMockData: boolean;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.token = API_CONFIG.TOKEN || '';
    this.useMockData = API_CONFIG.USE_MOCK_DATA;
  }

  private async mockAuth(): Promise<boolean> {
    // Mock authentication endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('[MOCK] Authentication successful');
        resolve(true);
      }, 200);
    });
  }

  private async mockAuthz(action: string): Promise<boolean> {
    // Mock authorization endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[MOCK] Authorization successful for action: ${action}`);
        resolve(true);
      }, 100);
    });
  }

  private async authenticate(): Promise<void> {
    if (this.useMockData) {
      await this.mockAuth();
      return;
    }

    if (!this.token) {
      throw new Error('API token is required');
    }
  }

  private async authorize(action: string): Promise<void> {
    if (this.useMockData) {
      await this.mockAuthz(action);
      return;
    }

    // In real implementation, this would check permissions
    // For ENTSO-E, authorization is typically handled via the token
  }

  async getGenerationData(
    countryCode: string,
    date: string
  ): Promise<GenerationData> {
    try {
      // Authenticate and authorize
      await this.authenticate();
      await this.authorize('read:generation-data');

      if (this.useMockData) {
        console.log(
          `[MOCK] Fetching generation data for ${countryCode} on ${date}`
        );
        return await getMockGenerationData(countryCode, date);
      }

      // Real API call to ENTSO-E
      const startDateTime = `${date}T00:00:00Z`;
      const endDateTime = `${date}T23:59:59Z`;

      const params = {
        securityToken: this.token,
        documentType: 'A75', // Actual generation per type
        processType: 'A16', // Realised
        in_Domain: this.getAreaCode(countryCode),
        periodStart: startDateTime.replace(/[-:]/g, '').replace('Z', ''),
        periodEnd: endDateTime.replace(/[-:]/g, '').replace('Z', ''),
      };

      const response: AxiosResponse = await axios.get(
        `${this.baseURL}${API_CONFIG.ENDPOINTS.GENERATION}`,
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
      // Simple ping to check if API is accessible
      await axios.get(`${this.baseURL}/ping`, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

export const entsoeApi = new EntsoeApiService();
