import legacy from '@vitejs/plugin-legacy';
import { defineConfig } from 'vite';
import { million } from 'million/vite-plugin-million';

export default defineConfig({
  plugins: [
    million({ importSource: 'million/jsx-runtime', react: true }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
});
