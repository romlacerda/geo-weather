import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // it seems we need to proxy the geocoding API because somehow it's blocked by CORS
  server: {
    proxy: {
      '/api/geocode': {
        target: 'https://geocoding.geo.census.gov',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/geocode/, '/geocoder/locations/onelineaddress'),
        secure: true,
      }
    }
  }
})
