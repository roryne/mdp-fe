import { expect, test } from '@playwright/experimental-ct-react'

import { Spy } from '@/utils/test/spy'

import { makeWrappedTextInput, props } from './common'

const spy = new Spy()
const handleOnChangeSpy = spy.fn

const tags = ['@component', '@input.text', '@sanity']

test.use({ viewport: { height: 400, width: 400 } })

test.beforeEach(async ({ page }) => {
  spy.reset()
  await page.addStyleTag({
    content: `
      * {
        font-family: sans-serif !important;
      }
    `
  })
})

test.describe('Adornments', { tag: tags }, () => {
  test('renders start node correctly', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({
        label: props.label,
        startNode: 'start'
      })
    )

    const icon = page.getByText('start')

    await expect(icon).toBeVisible()
  })

  test('renders end node correctly', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({
        endNode: 'end',
        label: props.label
      })
    )

    const icon = page.getByText('end')

    await expect(icon).toBeVisible()
  })

  test('renders both nodes correctly', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({
        endNode: 'end',
        label: props.label,
        startNode: 'start'
      })
    )

    const endNode = page.getByText('end')
    const startNode = page.getByText('start')

    await expect(endNode).toBeVisible()
    await expect(startNode).toBeVisible()
  })
})

test.describe('Interactions', { tag: tags }, () => {
  test('calls onChange when user types', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({
        label: props.label,
        onChange: handleOnChangeSpy
      })
    )

    const inputField = page.getByRole('textbox')

    await inputField.focus()
    await page.keyboard.type(props.value)

    expect(spy.called).toBe(true)
  })
})

test.describe('Label', { tag: tags }, () => {
  test('generates unique ids for multiple inputs', async ({ mount, page }) => {
    await mount(
      <div>
        {makeWrappedTextInput({ label: `${props.label} 1` })}
        {makeWrappedTextInput({ label: `${props.label} 2` })}
      </div>
    )

    const inputs = page.getByRole('textbox')
    const ids = await Promise.all(
      (await inputs.all()).map(async (locator) => locator.getAttribute('id'))
    )

    expect(ids[0]).not.toBe(ids[1])
  })

  test('renders with label and default props', async ({ mount, page }) => {
    await mount(makeWrappedTextInput({ label: props.label }))

    const input = page.getByTestId('wrapped-input')

    await expect(input).toContainText(props.label)
  })

  test('renders with label when shouldShowLabel={true}', async ({
    mount,
    page
  }) => {
    await mount(
      makeWrappedTextInput({
        label: props.label,
        shouldShowLabel: true
      })
    )

    const input = page.getByTestId('wrapped-input')

    await expect(input).toContainText(props.label)
  })

  test('renders without label when shouldShowLabel={false}', async ({
    mount,
    page
  }) => {
    await mount(
      makeWrappedTextInput({
        label: props.label,
        shouldShowLabel: false
      })
    )

    const label = page.locator('label')

    await expect(label).not.toBeVisible()
  })

  test('associates label and input via id / htmlFor', async ({
    mount,
    page
  }) => {
    await mount(makeWrappedTextInput({ label: props.label }))

    const input = page.locator('input')
    const label = page.locator('label')

    // 1️⃣ Check that label has htmlFor pointing to input id
    const inputId = await input.getAttribute('id')
    const htmlFor = await label.getAttribute('for')

    expect(htmlFor).toBe(inputId)
  })

  test('toggling shouldShowLabel correctly updates state', async ({
    mount,
    page
  }) => {
    const component = await mount(
      makeWrappedTextInput({
        label: props.label,
        shouldShowLabel: false
      })
    )

    const label = page.locator('label')

    await expect(label).not.toBeVisible()

    await component.update(
      makeWrappedTextInput({
        label: props.label,
        shouldShowLabel: true
      })
    )

    await expect(label).toBeVisible()
  })
})

test.describe('Messages', { tag: tags }, () => {
  test('renders error message', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({
        label: props.label,
        message: { error: 'error text' }
      })
    )

    await expect(page.getByText('error text')).toBeVisible()
  })

  test('renders info message', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({
        label: props.label,
        message: { info: 'info text' }
      })
    )

    await expect(page.getByText('info text')).toBeVisible()
  })

  test('renders success message', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({
        label: props.label,
        message: { success: 'success text' }
      })
    )

    await expect(page.getByText('success text')).toBeVisible()
  })

  test('re-render toggling message shows/removes from DOM', async ({
    mount,
    page
  }) => {
    const component = await mount(
      makeWrappedTextInput({
        label: props.label,
        message: { info: 'info' }
      })
    )

    const messageText = page.getByText('info')
    await expect(messageText).toContainText('info')

    await component.update(
      makeWrappedTextInput({ label: props.label, message: {} })
    )
    await expect(messageText).not.toBeAttached()
    await expect(messageText).not.toBeVisible()
  })
})

test.describe('Props/State', { tag: tags }, () => {
  test('renders disabled input', async ({ mount, page }) => {
    await mount(makeWrappedTextInput({ disabled: true, label: props.label }))

    const input = page.getByRole('textbox')
    await expect(input).toBeDisabled()
  })

  test('renders readonly input', async ({ mount, page }) => {
    await mount(makeWrappedTextInput({ label: props.label, readOnly: true }))

    const input = page.getByRole('textbox')
    await expect(input).toHaveAttribute('readonly')
  })

  test('renders value prop when passed', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({ label: props.label, value: props.value })
    )

    const inputField = page.getByRole('textbox')

    await expect(inputField).toHaveValue(props.value)
  })
})

test.describe('Visual', { tag: tags }, () => {
  test('renders filled variant correctly', async ({ mount, page }) => {
    await mount(
      <main>
        <h1>Input.Text</h1>
        {makeWrappedTextInput({ label: props.label, variant: 'filled' })}
      </main>
    )

    const container = page.locator('#root')
    await expect(container).toHaveScreenshot({ animations: 'disabled' })
  })

  test('renders outline variant correctly', async ({ mount, page }) => {
    await mount(
      <main>
        <h1>Input.Text</h1>
        {makeWrappedTextInput({ label: props.label })}
      </main>
    )

    const container = page.locator('#root')
    await expect(container).toHaveScreenshot({ animations: 'disabled' })
  })
})
