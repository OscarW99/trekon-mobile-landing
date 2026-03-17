import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // Use a cache dir outside the OneDrive-synced folder to avoid EPERM errors on Windows
  cacheDir: path.resolve(__dirname, '../.vite-cache/trekon-mobile'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
