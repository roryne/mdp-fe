import { defineConfig, devices } from '@playwright/experimental-ct-react'
import viteConfig from './vite.config'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: 'src/components',
  testIgnore: ['**\/__tests__/*.{test,stories}.{ts,tsx}'],
  timeout: 3 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'dot',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'http://localhost:3100',
    ctPort: 3100,
    ctViteConfig: {
      resolve: {
        ...viteConfig.resolve
      }
    },
    trace: 'on-first-retry'
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] }
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] }
    // }
  ]
})
