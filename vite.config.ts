import * as path from 'path';
import svgrPlugin from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  plugins: [
    react(),
    svgrPlugin({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'default',
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
