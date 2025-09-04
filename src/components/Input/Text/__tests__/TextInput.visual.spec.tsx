import { expect, test } from '@playwright/experimental-ct-react'

import { makeWrappedTextInput, props, scenarios } from './common'

const tags = ['@component', '@input.text', '@visual']

test.use({ viewport: { height: 400, width: 400 } })

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({
    content: `
      * {
        font-family: sans-serif !important;
      }
    `
  })
})

for (const scenario of scenarios.outline) {
  test(scenario.title, { tag: tags }, async ({ mount }) => {
    const component = await mount(
      <main>
        <h1>Input.Text</h1>
        {makeWrappedTextInput({ ...scenario.props, label: props.label })}
      </main>
    )

    await expect(component).toHaveScreenshot({ animations: 'disabled' })
  })
}

for (const scenario of scenarios.outline) {
  test(`(focus) ${scenario.title}`, { tag: tags }, async ({ mount, page }) => {
    const component = await mount(
      <main>
        <h1>Input.Text</h1>
        {makeWrappedTextInput({ ...scenario.props, label: props.label })}
      </main>
    )

    await page.getByRole('textbox').focus()

    await expect(component).toHaveScreenshot({ animations: 'disabled' })
  })
}

for (const scenario of scenarios.filled) {
  test(scenario.title, { tag: tags }, async ({ mount, page }) => {
    await page.evaluate(() => {
      const node = document.querySelector<HTMLElement>('#my-node')
      if (node) node.style.backgroundColor = 'black'
    })

    const component = await mount(
      <main
        style={{
          backgroundColor: '#1a1a1a'
        }}
      >
        <h1
          style={{
            color: '#f2f2f2'
          }}
        >
          Input.Text
        </h1>
        {makeWrappedTextInput({ ...scenario.props, label: props.label })}
      </main>
    )

    await expect(component).toHaveScreenshot({ animations: 'disabled' })
  })
}

for (const scenario of scenarios.filled) {
  test(`(focus) ${scenario.title}`, { tag: tags }, async ({ mount, page }) => {
    const component = await mount(
      <main
        style={{
          backgroundColor: '#1a1a1a'
        }}
      >
        <h1
          style={{
            color: '#f2f2f2'
          }}
        >
          Input.Text
        </h1>
        {makeWrappedTextInput({ ...scenario.props, label: props.label })}
      </main>
    )

    await page.getByRole('textbox').focus()

    await expect(component).toHaveScreenshot({ animations: 'disabled' })
  })
}
