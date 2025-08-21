import { test, expect } from '@playwright/experimental-ct-react'
import Button from '..'
import { allCases, defaultProps } from './common'
import { TestUtils } from '@/utils'

// Set default viewport for all tests in this file
test.use({ viewport: { width: 200, height: 100 } })

test.describe(
  'Component/Button',
  {
    tag: ['@component', '@button', '@happy', '@visual']
  },
  () => {
    for (const props of allCases) {
      const title = TestUtils.getTitleFromCases({
        props,
        ignoredKeys: ['label'],
        keysFromPartialMatch: ['icon'],
        returnKeys: ['disabled', 'isLoading']
      })

      // Visual tests for all variants, sizes, and icon combinations
      test(title, async ({ mount }) => {
        const button = await mount(<Button {...props} />)

        // Screenshot test: disables animations to avoid flakiness
        await expect(button).toHaveScreenshot({
          animations: 'disabled'
        })
      })
    }

    test('correctly renders disabled button', async ({ mount }) => {
      const button = await mount(
        <Button disabled={true} label={defaultProps.label} />
      )

      await expect(button).toHaveScreenshot({ animations: 'disabled' })
    })

    test('correctly renders loading button', async ({ mount }) => {
      const button = await mount(
        <Button isLoading={true} label={defaultProps.label} />
      )

      await expect(button).toHaveScreenshot({ animations: 'disabled' })
    })

    test('correctly renders focused button', async ({ mount, page }) => {
      const button = await mount(
        <div style={{ padding: '2rem' }}>
          <Button label={defaultProps.label} />
        </div>
      )

      // Use keyboard to focus the button
      await page.keyboard.press('Tab')

      await expect(button).toHaveScreenshot({ animations: 'disabled' })
    })

    // TODO Flakey - Investigate
    test.skip('correctly renders hovered button', async ({ mount }) => {
      const button = await mount(<Button label={defaultProps.label} />)

      // Hover state for visual regression
      await button.hover()

      await expect(button).toHaveScreenshot({ animations: 'disabled' })
    })

    // TODO cannot be tested in Playwright well atm
    test.skip('correctly renders active button', () => {})
  }
)
