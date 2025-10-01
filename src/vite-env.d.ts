/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENTSOE_API_TOKEN: string;
  readonly VITE_ENTSOE_API_BASE_URL: string;
  readonly VITE_USE_MOCK_DATA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}