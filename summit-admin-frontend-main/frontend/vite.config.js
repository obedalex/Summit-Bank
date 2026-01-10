import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from "@tailwindcss/vite"
 
export default defineConfig({
  
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
  manifest: {
    name: 'Summit Investment Bank - Admin',
    short_name: 'SI-Admin',
    description: 'Number reliable banking for everyone',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#181a1b', // blue school-theme
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
})

  ]
})