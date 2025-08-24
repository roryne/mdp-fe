import type { Page } from 'playwright/test'

/**
 * Check if the global window loading flag is set
 */
export async function isWindowLoading(page: Page): Promise<boolean> {
  const result = await page.evaluate(() => window.__isLoading)
  return result
}

/**
 * Extract a title string from props, with optional filtering
 */
export function getTitleFromCases({
  props,
  ignoredKeys,
  keysFromPartialMatch,
  returnKeys
}: {
  props: Record<string, unknown>
  ignoredKeys?: string[]
  keysFromPartialMatch?: string[]
  returnKeys?: string[]
}): string {
  return Object.entries(props)
    .map(([key, value]) => {
      if (ignoredKeys?.includes(key)) return null

      const shouldReturnKey =
        returnKeys?.includes(key) ??
        keysFromPartialMatch?.some((partial) =>
          key.toLowerCase().includes(partial.toLowerCase())
        )

      if (shouldReturnKey) return key

      return value
    })
    .filter(Boolean)
    .join('-')
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
