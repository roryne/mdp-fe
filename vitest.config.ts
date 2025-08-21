///<reference types="vitest/config" />
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig({
  plugins: viteConfig.plugins,
  resolve: { ...viteConfig.resolve },
  test: {
    environment: 'jsdom',
    exclude: ['src/**/*.{spec,stories}.{ts,tsx}'],
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['src/setupVitest.ts'],
    testTimeout: 3 * 1000
  }
})
