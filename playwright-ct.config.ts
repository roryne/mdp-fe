import { defineConfig, devices } from '@playwright/experimental-ct-react'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : (
    path.dirname(fileURLToPath(import.meta.url))
  )

export default defineConfig({
  testDir: 'src/components',
  testIgnore: ['**/__tests__/*.{test,stories}.{ts,tsx}'],
  timeout: 1000,
  expect: {
    timeout: 500,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.03
    }
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  outputDir: './test-results',
  retries: 0,
  reporter: process.env.CI ? [['html', 'github']] : 'dot',
  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{testName}{ext}',
  use: {
    baseURL: 'http://localhost:3100',
    ctPort: 3100,
    ctViteConfig: {
      assetsInclude: ['**/*.svg?react'],
      css: {
        postcss: './postcss.config.mts'
      },
      resolve: {
        alias: {
          '@': path.resolve(dirname, 'src')
        }
      }
    },
    launchOptions: {
      args: ['--font-render-hinting=none']
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
})
