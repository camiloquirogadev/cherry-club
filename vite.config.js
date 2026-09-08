import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// En build (GitHub Pages) sirve bajo /cherry-club/; en dev bajo /.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/cherry-club/' : '/',
  plugins: [react()],
}));
