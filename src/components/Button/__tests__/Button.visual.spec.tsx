import { expect, test } from '@playwright/experimental-ct-react'

import Button from '..'
import { scenarios } from './common'

const label = 'Button'
const tags = ['@component', '@button', '@visual']

// Set default viewport for all tests in this file
test.use({ viewport: { height: 144, width: 288 } })

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({
    content: `
      * {
        font-family: sans-serif !important;
        text-rendering: geometricPrecision;
        -webkit-font-smoothing: antialiased;
      }
    `
  })

  await page.evaluateHandle(async () => document.fonts.ready)
})

test.describe('Visual', () => {
  for (const scenario of scenarios.all) {
    test(
      `default | ${scenario.title}`,
      { tag: tags },
      async ({ mount, page }) => {
        await mount(
          <main>
            <h1>Button</h1>
            <section style={{ padding: '1rem 2rem' }}>
              <Button {...scenario.props} label={label} />
            </section>
          </main>
        )

        if (scenario.props.iconLeft !== undefined) {
          await expect(page.getByTestId('icon-left')).toBeVisible()
        }

        if (scenario.props.iconRight !== undefined) {
          await expect(page.getByTestId('icon-right')).toBeVisible()
        }

        await expect(page.locator('body')).toHaveScreenshot({
          animations: 'disabled'
        })
      }
    )
  }

  for (const scenario of scenarios.all) {
    // Cannot focus in these states so tests are useless
    if (scenario.props.disabled || scenario.props.isLoading) return

    test(
      `focus | ${scenario.title}`,
      { tag: tags },
      async ({ mount, page }) => {
        await mount(
          <main>
            <h1>Button</h1>
            <section style={{ padding: '1rem 2rem' }}>
              <Button {...scenario.props} label={label} />
            </section>
          </main>
        )

        await page.getByRole('button').focus()

        if (scenario.props.iconLeft !== undefined) {
          await expect(page.getByTestId('icon-left')).toBeVisible()
        }

        if (scenario.props.iconRight !== undefined) {
          await expect(page.getByTestId('icon-right')).toBeVisible()
        }

        await expect(page.locator('body')).toHaveScreenshot({
          animations: 'disabled'
        })
      }
    )
  }

  for (const scenario of scenarios.all) {
    // Cannot hover in these states so tests are useless
    if (scenario.props.disabled || scenario.props.isLoading) return

    test(
      `hover | ${scenario.title}`,
      { tag: tags },
      async ({ mount, page }) => {
        await mount(
          <main>
            <h1>Button</h1>
            <section style={{ padding: '1rem 2rem' }}>
              <Button {...scenario.props} label={label} />
            </section>
          </main>
        )

        await page.getByRole('button').hover()

        if (scenario.props.iconLeft !== undefined) {
          await expect(page.getByTestId('icon-left')).toBeVisible()
        }

        if (scenario.props.iconRight !== undefined) {
          await expect(page.getByTestId('icon-right')).toBeVisible()
        }

        await expect(page.locator('body')).toHaveScreenshot({
          animations: 'disabled'
        })
      }
    )
  }
})
