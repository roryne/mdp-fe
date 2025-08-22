import { defineConfig, devices } from '@playwright/experimental-ct-react'
import viteConfig from './vite.config'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: 'src/components',
  testIgnore: ['**\/__tests__/*.{test,stories}.{ts,tsx}'],
  timeout: 3 * 1000,
  expect: {
    timeout: 1 * 1000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05
    }
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'dot',
  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{testName}{ext}',
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
