import AxeBuilder from '@axe-core/playwright'
import { expect, type Page } from 'playwright/test'

export const runAxeScan = async (page: Page) =>
  await new AxeBuilder({ page }).analyze()

export const assertAxeScan = async (page: Page) => {
  const results = await runAxeScan(page)

  expect(results.violations).toEqual([])
}
