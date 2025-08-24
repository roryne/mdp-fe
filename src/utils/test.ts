import type { Page } from 'playwright/test'

declare global {
  // Augment the global Window interface
  // eslint-disable-next-line
  interface Window {
    __isLoading: boolean
  }
}

export default class TestUtils {
  static async setupLoadingTimer(page: Page, ms = 1000) {
    await page.evaluate((duration) => {
      window.__isLoading = true

      setTimeout(() => {
        window.__isLoading = false
      }, duration)
    }, ms)
  }

  static async getIsLoading(page: Page) {
    return await page.evaluate(() => window.__isLoading)
  }

  static getTitleFromCases({
    props,
    ignoredKeys,
    keysFromPartialMatch,
    returnKeys
  }: {
    props: Record<string, any>
    ignoredKeys?: string[]
    keysFromPartialMatch?: string[]
    returnKeys?: string[]
  }) {
    return Object.entries(props)
      .map(([key, value]) => {
        if (ignoredKeys?.includes(key)) return null

        const shouldReturnKey =
          returnKeys?.includes(key) ||
          keysFromPartialMatch?.some((partial) =>
            key.toLowerCase().includes(partial.toLowerCase())
          )

        if (shouldReturnKey) return key

        return value
      })
      .filter(Boolean) // remove null/undefined/falsy
      .join('-')
  }
}
