import react from '@vitejs/plugin-react'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : (
    path.dirname(fileURLToPath(import.meta.url))
  )

export default defineConfig({
  css: {
    postcss: './postcss.config.mts'
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src')
    }
  }
})
