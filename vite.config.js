import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import importPlugin from 'vite-plugin-importer';

import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    importPlugin({
      libraryName: '@taoyage/react-mobile-ui',
    }),
  ],
  server: {
    host: '0.0.0.0',
    proxy: {
      // 代理所有`/api`的请求
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/variable.scss";
          @import "@/assets/styles/mixin.scss";
        `,
      },
    },
  },
});
