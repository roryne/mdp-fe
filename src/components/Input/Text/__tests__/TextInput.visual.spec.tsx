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
      const endNode = page.getByTestId('end-node')
      await expect(endNode).toBeVisible()
      await expect(endNode).toContainText('end node')
    }

    if (scenario.props.startNode !== null) {
      const startNode = page.getByTestId('start-node')
      await expect(startNode).toBeVisible()
      await expect(startNode).toContainText('start node')
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
      const endNode = page.getByTestId('end-node')
      await expect(endNode).toBeVisible()
      await expect(endNode).toContainText('end node')
    }

    if (scenario.props.startNode !== null) {
      const startNode = page.getByTestId('start-node')
      await expect(startNode).toBeVisible()
      await expect(startNode).toContainText('start node')
    }

    await page.getByRole('textbox').focus()

    const container = page.locator('#root')

    await expect(container).toHaveScreenshot({ animations: 'disabled' })
  })
}

for (const scenario of scenarios.filled) {
  test(scenario.title, { tag: tags }, async ({ mount, page }) => {
    await mount(
      <main style={{ backgroundColor: '#1a1a1a' }}>
        <h1 style={{ color: '#f2f2f2' }}>Input.Text</h1>
        {makeWrappedTextInput({ ...scenario.props, label: props.label })}
      </main>
    )

    if (scenario.props.endNode !== null) {
      const endNode = page.getByTestId('end-node')
      await expect(endNode).toBeVisible()
      await expect(endNode).toContainText('end node')
    }

    if (scenario.props.startNode !== null) {
      const startNode = page.getByTestId('start-node')
      await expect(startNode).toBeVisible()
      await expect(startNode).toContainText('start node')
    }

    const container = page.locator('#root')
    await expect(container).toHaveScreenshot({ animations: 'disabled' })
  })
}

for (const scenario of scenarios.filled) {
  test(`(focus) ${scenario.title}`, { tag: tags }, async ({ mount, page }) => {
    await mount(
      <main style={{ backgroundColor: '#1a1a1a' }}>
        <h1 style={{ color: '#f2f2f2' }}>Input.Text</h1>
        {makeWrappedTextInput({ ...scenario.props, label: props.label })}
      </main>
    )

    if (scenario.props.endNode !== null) {
      const endNode = page.getByTestId('end-node')
      await expect(endNode).toBeVisible()
      await expect(endNode).toContainText('end node')
    }

    if (scenario.props.startNode !== null) {
      const startNode = page.getByTestId('start-node')
      await expect(startNode).toBeVisible()
      await expect(startNode).toContainText('start node')
    }

    await page.getByRole('textbox').focus()

    const container = page.locator('#root')
    await expect(container).toHaveScreenshot({ animations: 'disabled' })
  })
}
