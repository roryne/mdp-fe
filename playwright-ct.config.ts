import { defineConfig, devices } from '@playwright/experimental-ct-react'
import viteConfig from './vite.config'

export default defineConfig({
  testDir: 'src/components',
  testIgnore: ['**/__tests__/*.{test,stories}.{ts,tsx}'],
  timeout: 2 * 1000,
  expect: {
    timeout: 1 * 1000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.1
    }
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 2,
  reporter: process.env.CI ? [['github', 'html']] : 'dot',
  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{testName}{ext}',
  use: {
    baseURL: 'http://localhost:3100',
    ctPort: 3100,
    ctViteConfig: {
      resolve: {
        ...viteConfig.resolve
      }
    },
    launchOptions: {
      args: ['--font-render-hinting=none']
    },
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
})
