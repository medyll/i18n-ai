// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/main.ts', // Remplacez par le chemin de votre point d'entrée
      name: '@medyll/i18n-ai', // Nom de votre librairie
    },
    rollupOptions: {
    },
  },
});
