import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Stelle sicher, dass der Alias korrekt auf das "src"-Verzeichnis zeigt
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Optional: Entfernt Typenüberprüfungen beim Build
    rollupOptions: {
      output: {
        // Verhindert doppelte Pfade oder falsche Auflösungen
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
      },
    },
  },
});
