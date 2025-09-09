import { test } from '@playwright/experimental-ct-react'

import { assertAxeScan } from '@/utils/test/axe'

import Button from '..'
import { scenarios } from './common'

const label = 'Button'
const tags = ['@component', '@button', '@a11y']

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

test.describe('Axe', { tag: [...tags, '@axe'] }, () => {
  for (const scenario of scenarios.all) {
    test(`axe ${scenario.title}`, async ({ mount, page }) => {
      await mount(
        <main>
          <h1>Button</h1>
          <section style={{ padding: '1rem 2rem' }}>
            <Button {...scenario.props} label={label} />
          </section>
        </main>
      )

      await assertAxeScan(page)
    })
  }

  for (const scenario of scenarios.all) {
    test(`axe (focus) ${scenario.title}`, async ({ mount, page }) => {
      await mount(
        <main>
          <h1>Button</h1>
          <section style={{ padding: '1rem 2rem' }}>
            <Button {...scenario.props} label={label} />
          </section>
        </main>
      )

      await page.getByRole('button').focus()

      await assertAxeScan(page)
    })
  }

  for (const scenario of scenarios.all) {
    // Cannot hover in these states so tests will fail without early return
    if (scenario.props.disabled || scenario.props.isLoading) return

    test(`axe (hover) ${scenario.title}`, async ({ mount, page }) => {
      await mount(
        <main>
          <h1>Button</h1>
          <section style={{ padding: '1rem 2rem' }}>
            <Button {...scenario.props} label={label} />
          </section>
        </main>
      )

      await page.getByRole('button').hover()

      await assertAxeScan(page)
    })
  }
})
