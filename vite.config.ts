import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ensure assets are properly handled during build
    assetsDir: 'assets',
    // Copy assets from public directory
    copyPublicDir: true,
  },
  // Properly resolve asset paths
  resolve: {
    alias: {
      '@': '/src',
    },
  }
})
