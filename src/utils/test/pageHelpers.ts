import type { Page } from 'playwright/test'

export const EViewports = [
  { height: 900, name: 'desktop-large', width: 1440 },
  { height: 768, name: 'desktop-small', width: 1024 },
  { height: 1024, name: 'tablet-portrait', width: 768 },
  { height: 812, name: 'mobile-portrait', width: 375 }
]

/**
 * Check if the global window loading flag is set
 */
export async function isWindowLoading(page: Page): Promise<boolean> {
  const result = await page.evaluate(() => window.__isLoading)
  return result
}

/**
 * Set a temporary loading flag on window for a duration
 */
export async function setupLoadingTimer(page: Page, ms = 1000): Promise<void> {
  await page.evaluate((duration) => {
    window.__isLoading = true
    setTimeout(() => {
      window.__isLoading = false
    }, duration)
  }, ms)
}
