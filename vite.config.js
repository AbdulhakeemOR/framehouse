import { defineConfig } from 'vite';
import { cpSync } from 'node:fs';

export default defineConfig({
  base: './',
  plugins: [{
    name: 'preserve-framehouse-assets',
    closeBundle() {
      cpSync('assets', 'dist/assets', { recursive: true });
    }
  }]
});
