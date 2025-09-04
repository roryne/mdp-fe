import { expect, test } from '@playwright/experimental-ct-react'

import { makeWrappedTextInput, props, scenarios } from './common'

const tags = ['@component', '@input.text', '@visual']

test.use({ viewport: { height: 400, width: 400 } })

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

for (const scenario of scenarios.outline) {
  test(scenario.title, { tag: tags }, async ({ mount, page }) => {
    await mount(
      <main>
        <h1>Input.Text</h1>
        {makeWrappedTextInput({ ...scenario.props, label: props.label })}
      </main>
    )

    if (scenario.props.endNode !== null) {
      await expect(page.getByTestId('end-node')).toBeVisible()
    }

    if (scenario.props.startNode !== null) {
      await expect(page.getByTestId('start-node')).toBeVisible()
    }

    const container = page.locator('#root')
    await expect(container).toHaveScreenshot({ animations: 'disabled' })
  })
}

for (const scenario of scenarios.outline) {
  test(`(focus) ${scenario.title}`, { tag: tags }, async ({ mount, page }) => {
    await mount(
      <main>
        <h1>Input.Text</h1>
        {makeWrappedTextInput({ ...scenario.props, label: props.label })}
      </main>
    )

    if (scenario.props.endNode !== null) {
      await expect(page.getByTestId('end-node')).toBeVisible()
    }

    if (scenario.props.startNode !== null) {
      await expect(page.getByTestId('start-node')).toBeVisible()
    }

    await page.getByRole('textbox').focus()

    const container = page.locator('#root')
    await expect(container).toHaveScreenshot({ animations: 'disabled' })
  })
}
