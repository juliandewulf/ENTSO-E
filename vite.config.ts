import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/entsoe': {
        target: 'https://web-api.tp.entsoe.eu',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/entsoe/, ''),
        headers: {
          'User-Agent': 'Zaphiro Energy Dashboard',
        },
      },
    },
  },
  // @ts-expect-error - Vitest config
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
