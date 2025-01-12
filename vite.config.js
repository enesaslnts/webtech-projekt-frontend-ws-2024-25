import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Alias für das src-Verzeichnis
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Verbesserte Dateinamenstruktur für Produktions-Build
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
  server: {
    port: 8080, // Render erwartet standardmäßig Port 8080
    proxy: {
      // Proxy für Backend-API-Aufrufe
      '/api': {
        target: process.env.API_URL || 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Entfernt das "/api"-Prefix
      },
    },
  },
});
