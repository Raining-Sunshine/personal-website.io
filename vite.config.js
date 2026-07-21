import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

const githubPagesFallback = () => ({
  name: 'github-pages-fallback',
  closeBundle() {
    copyFileSync(resolve('dist/index.html'), resolve('dist/404.html'))
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), githubPagesFallback()],
  server: {
    port: 3000,
    host: "0.0.0.0",
    allowedHosts: true
  }
})
