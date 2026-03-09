import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Yahan apne BACKEND ka port dalo (8000 ya 3000)
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
