import { expect, test } from '@playwright/experimental-ct-react'

import Button from '..'
import { scenarios } from './common'

const text = 'Button'
const tags = ['@component', '@button', '@visual']

test.use({ viewport: { height: 120, width: 240 } })

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
              <Button {...scenario.props} text={text} />
            </section>
          </main>
        )

        if (
          scenario.props.iconLeft !== undefined &&
          scenario.props.isLoading === false
        ) {
          await expect(page.getByTestId('icon-left')).toBeVisible()
        }

        if (
          scenario.props.iconRight !== undefined &&
          scenario.props.isLoading === false
        ) {
          await expect(page.getByTestId('icon-right')).toBeVisible()
        }

        await expect(page.locator('body')).toHaveScreenshot({
          animations: 'disabled'
        })
      }
    )
  }

  for (const scenario of scenarios.all) {
    if (scenario.props.disabled === true) continue
    test(
      `focus | ${scenario.title}`,
      { tag: tags },
      async ({ mount, page }) => {
        await mount(
          <main>
            <h1>Button</h1>
            <section style={{ padding: '1rem 2rem' }}>
              <Button {...scenario.props} text={text} />
            </section>
          </main>
        )

        await page.getByRole('button').focus()

        if (
          scenario.props.iconLeft !== undefined &&
          scenario.props.isLoading === false
        ) {
          await expect(page.getByTestId('icon-left')).toBeVisible()
        }

        if (
          scenario.props.iconRight !== undefined &&
          scenario.props.isLoading === false
        ) {
          await expect(page.getByTestId('icon-right')).toBeVisible()
        }

        await expect(page.locator('body')).toHaveScreenshot({
          animations: 'disabled'
        })
      }
    )
  }

  for (const scenario of scenarios.all) {
    test(
      `hover | ${scenario.title}`,
      { tag: tags },
      async ({ mount, page }) => {
        await mount(
          <main>
            <h1>Button</h1>
            <section style={{ padding: '1rem 2rem' }}>
              <Button {...scenario.props} text={text} />
            </section>
          </main>
        )

        await page.getByRole('button').hover({ force: true })

        if (
          scenario.props.iconLeft !== undefined &&
          scenario.props.isLoading === false
        ) {
          await expect(page.getByTestId('icon-left')).toBeVisible()
        }

        if (
          scenario.props.iconRight !== undefined &&
          scenario.props.isLoading === false
        ) {
          await expect(page.getByTestId('icon-right')).toBeVisible()
        }

        await expect(page.locator('body')).toHaveScreenshot({
          animations: 'disabled'
        })
      }
    )
  }
})
