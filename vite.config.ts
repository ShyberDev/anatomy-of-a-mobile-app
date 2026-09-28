import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Relative asset URLs rather than an absolute '/'. GitHub Pages serves this
  // from a subpath (/anatomy-of-a-mobile-app/), and a relative base also keeps
  // `npm run dev` at the site root instead of forcing a prefixed path. There is
  // no router here, so nothing depends on the base being absolute.
  base: './',
})
