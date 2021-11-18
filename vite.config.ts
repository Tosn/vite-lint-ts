import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '@c': path.resolve(__dirname, '/src/components'),
    },
  },
  server: {
    proxy: {
      '/dev-api': {
        target: 'http://businesscard.webeye.cn/api',
        changeOrigin: true,
        rewrite: (_path) => _path.replace(/^\/dev-api/, ''),
      },
    },
  },
});
