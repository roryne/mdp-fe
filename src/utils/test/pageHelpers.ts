import type { Page } from 'playwright/test'

import type { TTestTitleProps } from '@/components/Button/types'

/**
 * Check if the global window loading flag is set
 */
export async function isWindowLoading(page: Page): Promise<boolean> {
  const result = await page.evaluate(() => window.__isLoading)
  return result
}

const hasTextMatchWithKey = (
  targetKey: string,
  keysFromPartialMatch: string[] = []
): boolean =>
  keysFromPartialMatch.some((partial) =>
    targetKey.toLowerCase().includes(partial.toLowerCase())
  )

/**
 * Extract a title string from props, with optional filtering
 */
export function getTitleFromCases({
  props,
  ignoredKeys = [],
  keysFromPartialMatch = [],
  returnKeys = []
}: TTestTitleProps): string {
  return Object.entries(props)
    .map(([key, value]): string | null => {
      if (ignoredKeys.includes(key)) return null

      // return the key if explicitly requested or partially matched
      const shouldReturnKey =
        returnKeys.includes(key) ||
        hasTextMatchWithKey(key, keysFromPartialMatch)

      if (shouldReturnKey) return key

      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        return String(value)
      }

      // ReactNode / JSX / objects are ignored
      return null
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
