import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/wakatime': {
        target: 'https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=waka_3bb68930-d951-481e-961e-e1506a95ffbf',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/wakatime/, '')
      }
    }
  }
})