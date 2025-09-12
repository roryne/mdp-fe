import { expect, test } from '@playwright/experimental-ct-react'

import { Spy } from '@/utils/test/spy'

import { makeWrappedTextInput, props } from './common'

const spy = new Spy()
const handleOnBlurSpy = spy.fn
const handleOnChangeSpy = spy.fn
const handleOnFocusSpy = spy.fn

const tags = ['@component', '@input.text', '@interactions']

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
  test('calls onClick when end node clicked', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({
        endNode: props.endNodeInteractive,
        label: props.label
      })
    )

    const endNode = page.getByTestId('end-node')

    await endNode.click()
    expect(props.spy.called).toBe(true)
  })

  test('calls onClick when start node clicked', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({
        label: props.label,
        startNode: props.startNodeInteractive
      })
    )

    const startNode = page.getByTestId('start-node')

    await startNode.click()
    expect(props.spy.called).toBe(true)
  })
})

test.describe('Props/State', { tag: tags }, () => {
  test('controlled input reflects updated value prop', async ({
    mount,
    page
  }) => {
    const component = await mount(
      makeWrappedTextInput({ label: props.label, value: 'initial' })
    )

    let input = page.getByRole('textbox')
    expect(await input.inputValue()).toBe('initial')

    // update component with new value
    await component.update(
      makeWrappedTextInput({ label: props.label, value: 'updated' })
    )
    input = page.getByRole('textbox')
    expect(await input.inputValue()).toBe('updated')
  })

  test('uncontrolled input ignores defaultValue updates after mount', async ({
    mount,
    page
  }) => {
    const component = await mount(
      makeWrappedTextInput({ defaultValue: 'initial', label: props.label })
    )

    const input = page.getByRole('textbox')
    expect(await input.inputValue()).toBe('initial')

    // user types new value
    await input.fill('typed')
    expect(await input.inputValue()).toBe('typed')

    // update defaultValue after mount
    await component.update(
      makeWrappedTextInput({ defaultValue: 'updated', label: props.label })
    )
    expect(await input.inputValue()).toBe('typed') // still typed, not 'updated'
  })
})

test.describe('Typing/Editing', { tag: tags }, () => {
  test('calls onChange when typing', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({ label: props.label, onChange: handleOnChangeSpy })
    )

    const inputField = page.getByRole('textbox')

    await inputField.fill(props.value)
    expect(spy.called).toBe(true)
  })

  test('does not allow typing when disabled', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({
        disabled: true,
        label: props.label,
        onChange: handleOnChangeSpy
      })
    )

    const inputField = page.getByRole('textbox')

    // Can't actually fill if disabled is set properly, so force fill
    await inputField.fill(props.value, { force: true })

    const inputFieldValue = await inputField.inputValue()
    expect(inputFieldValue).toBeFalsy()
  })

  test('does not allow typing when readOnly', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({
        label: props.label,
        onChange: handleOnChangeSpy,
        readOnly: true
      })
    )

    const inputField = page.getByRole('textbox')

    // Can't actually fill if readonly is set properly, so force fill
    await inputField.fill(props.value, { force: true })

    const inputFieldValue = await inputField.inputValue()
    expect(inputFieldValue).toBeFalsy()
  })

  test('renders defaultValue when passed', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({
        defaultValue: props.defaultValue,
        label: props.label
      })
    )

    const inputField = page.getByRole('textbox')
    const inputFieldValue = await inputField.inputValue()

    expect(inputFieldValue).toBe(props.defaultValue)
  })

  test('updates defaultValue when typing', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({
        defaultValue: props.defaultValue,
        label: props.label
      })
    )

    const inputField = page.getByRole('textbox')

    await inputField.clear()
    await inputField.fill(props.value)

    const inputFieldValue = await inputField.inputValue()
    expect(inputFieldValue).toBe(props.value)
  })

  test('updates value when typing', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({ label: props.label, onChange: handleOnChangeSpy })
    )

    const inputField = page.getByRole('textbox')

    await inputField.fill(props.value)

    const inputFieldValue = await inputField.inputValue()
    expect(inputFieldValue).toBe(props.value)
  })
})

test.describe('Focus Management', { tag: tags }, () => {
  test('fires onBlur when unfocused', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({ label: props.label, onBlur: handleOnBlurSpy })
    )

    await page.getByRole('textbox').focus()
    await page.getByRole('textbox').blur()

    expect(spy.called).toBe(true)
  })

  test('fires onFocus when focused', async ({ mount, page }) => {
    await mount(
      makeWrappedTextInput({ label: props.label, onFocus: handleOnFocusSpy })
    )

    await page.getByRole('textbox').focus()

    expect(spy.called).toBe(true)
  })

  test('focuses input on label click', async ({ mount, page }) => {
    await mount(makeWrappedTextInput({ label: props.label }))

    const label = page.getByLabel(props.label)

    await label.click()
    await expect(label).toBeFocused()
  })

  test('focuses input on click', async ({ mount, page }) => {
    await mount(makeWrappedTextInput({ label: props.label }))

    const inputField = page.getByRole('textbox')

    await inputField.click()
    await expect(inputField).toBeFocused()
  })
})
