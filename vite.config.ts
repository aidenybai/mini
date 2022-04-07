import legacy from '@vitejs/plugin-legacy';
import { readdir } from 'fs/promises';
import { dirname } from 'path';
import { defineConfig } from 'vite';
import { million } from 'million/vite-plugin-million';

const generateInputs = async (path: string = '.') => {
  const files = await readdir(dirname(path));
  const htmlFiles = files.filter((name) => name.endsWith('html'));
  return Object.fromEntries(
    htmlFiles.map((file) => [
      file.replace('.html', ''),
      new URL(file, import.meta.url).pathname,
    ])
  );
};

export default defineConfig({
  plugins: [
    million(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: await generateInputs(),
    },
  },
});
