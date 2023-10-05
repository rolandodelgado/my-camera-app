import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mediapipe': '/node_modules/@mediapipe', // Ruta a la carpeta de MediaPipe en tu proyecto
    },
  },
});
