import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/wakatime': {
        target: 'https://wakatime.com/api/v1/users/current/stats/last_7_days',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/wakatime/, ''),
        headers: {
          'Authorization': `Basic ${Buffer.from('waka_cec9d646-871e-4ab8-bfdb-bd26807d7302').toString('base64')}`
        }
      }
    }
  }
})