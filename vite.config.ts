import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { viteSingleFile } from 'vite-plugin-singlefile';
export default defineConfig({
  test: {
    coverage: {
      provider: 'c8', // or 'c8'
    },
  },
  plugins: [react(), viteSingleFile()],
  build: {
    emptyOutDir: true,
    outDir: './dist',
  },
});
