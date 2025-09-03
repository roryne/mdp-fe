import { test, expect } from '@playwright/experimental-ct-react'

import { assertAxeScan } from '@/utils/test/axe'

import { axeScenarios, makeWrappedTextInput, props, spy } from './common'

const tags = ['@component', '@input.text', '@a11y']

test.use({ viewport: { height: 400, width: 400 } })

test.beforeEach(() => {
  spy.reset()
})

test.describe(
  'Adornments',
  {
    tag: tags
  },
  () => {
    test('start adornment is tabbable when interactive', async ({
      mount,
      page
    }) => {
      await mount(
        makeWrappedTextInput({
          label: props.label,
          startNode: props.startNodeInteractive
        })
      )

      const startNode = page.getByTestId('wrapped-input').locator('span')

      await page.keyboard.press('Tab')

      await expect(startNode).toBeFocused()
    })

    test('start adornment is not tabbable when decorational', async ({
      mount,
      page
    }) => {
      await mount(
        makeWrappedTextInput({
          label: props.label,
          startNode: props.startNodeDecorational
        })
      )

      const startNode = page.getByTestId('wrapped-input').locator('span')

      await page.keyboard.press('Tab')

      await expect(startNode).not.toBeFocused()
    })

    test('end adornment is tabbable when interactive', async ({
      mount,
      page
    }) => {
      await mount(
        makeWrappedTextInput({
          endNode: props.endNodeInteractive,
          label: props.label
        })
      )

      const endNode = page.getByTestId('wrapped-input').locator('span')

      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      await expect(endNode).toBeFocused()
    })

    test('end adornment is not tabbable when decorational', async ({
      mount,
      page
    }) => {
      await mount(
        makeWrappedTextInput({
          endNode: props.endNodeDecorational,
          label: props.label
        })
      )

      const endNode = page.getByTestId('wrapped-input').locator('span')

      await page.keyboard.press('Tab')

      await expect(endNode).not.toBeFocused()
    })
  }
)

test.describe('Axe', { tag: [...tags, '@axe'] }, () => {
  for (let i = 0; i < axeScenarios.length; i++) {
    const props = axeScenarios[i]

    test(`axe scan #${i + 1}`, async ({ mount, page }) => {
      await mount(
        <main>
          <h1>Input.Text</h1>
          {makeWrappedTextInput({ ...props })}
        </main>
      )

      if (props.shouldFocus) {
        await page.getByTestId('wrapped-input').focus()
      }

      await assertAxeScan(page)
    })
  }
})

test.describe('Edge', () => {
  test('renders unique id for multiple inputs', async ({ mount, page }) => {
    const inputs = Array.from({ length: 2 }, (_, i) =>
      makeWrappedTextInput({ key: i, label: `${props.label} ${i}` })
    )
    await mount(<div>{inputs}</div>)

    const renderedInputs = page.getByRole('textbox')

    await expect(renderedInputs).toHaveCount(2)

    const inputFieldId1 = await renderedInputs.first().getAttribute('id')
    const inputFieldId2 = await renderedInputs.last().getAttribute('id')

    expect(inputFieldId1).not.toBe(inputFieldId2)
  })
})

test.describe(
  'Keyboard',
  {
    tag: tags
  },
  () => {
    test('focuses input via tab', async ({ mount, page }) => {
      await mount(makeWrappedTextInput({ label: props.label }))

      await page.keyboard.press('Tab')

      const inputField = page.getByRole('textbox')

      await expect(inputField).toBeFocused()
    })

    test('un-focuses input via shift+tab after focused', async ({
      mount,
      page
    }) => {
      await mount(makeWrappedTextInput({ label: props.label }))

      await page.keyboard.press('Tab')
      await page.keyboard.press('Shift+Tab')

      const inputField = page.getByRole('textbox')

      await expect(inputField).not.toBeFocused()
    })

    test('updates field value via keyboard input', async ({ mount, page }) => {
      await mount(makeWrappedTextInput({ label: props.label }))

      const inputField = page.getByRole('textbox')

      await inputField.fill(props.value)
      await expect(inputField).toHaveValue(props.value)
    })
  }
)

test.describe(
  'Labels',
  {
    tag: tags
  },
  () => {
    test('input has accessible name with label visible and no aria-label', async ({
      mount,
      page
    }) => {
      await mount(makeWrappedTextInput({ label: props.label }))

      const inputField = page.getByRole('textbox')

      await expect(inputField).toHaveAccessibleName(props.label)
    })

    test('input has accessible name with label visible and explicit aria-label', async ({
      mount,
      page
    }) => {
      await mount(
        makeWrappedTextInput({
          'aria-label': props['aria-label'],
          label: props.label
        })
      )

      const inputField = page.getByRole('textbox')

      await expect(inputField).toHaveAccessibleName(props['aria-label'])
    })

    test('input has accessible name with label hidden and no aria-label', async ({
      mount,
      page
    }) => {
      await mount(
        makeWrappedTextInput({ label: props.label, shouldShowLabel: false })
      )

      const inputField = page.getByRole('textbox')

      await expect(inputField).toHaveAccessibleName(props.label)
    })

    test('input has accessible name with label hidden and explicit aria-label', async ({
      mount,
      page
    }) => {
      await mount(
        makeWrappedTextInput({
          'aria-label': props['aria-label'],
          label: props.label,
          shouldShowLabel: false
        })
      )

      const inputField = page.getByRole('textbox')

      await expect(inputField).toHaveAccessibleName(props['aria-label'])
    })
  }
)

test.describe('Messages', () => {
  const messageKeys = ['error', 'info', 'success'] as const

  for (const key of messageKeys) {
    test(`has aria-describedby pointed to ${key} message area`, async ({
      mount,
      page
    }) => {
      await mount(
        makeWrappedTextInput({
          label: props.label,
          message: { [key]: props.message[key] }
        })
      )

      const inputField = page.getByRole('textbox')
      const id = await inputField.getAttribute('id')

      await expect(inputField).toHaveAttribute(
        'aria-describedby',
        `${id}-${key}`
      )
    })
  }

  test('updating messages correctly udpates aria-describedby property', async ({
    mount,
    page
  }) => {
    const component = await mount(
      makeWrappedTextInput({
        label: props.label,
        message: { error: props.message.error }
      })
    )

    await component.update(
      makeWrappedTextInput({
        label: props.label,
        message: { success: props.message.success }
      })
    )

    const inputField = page.getByRole('textbox')
    const id = await inputField.getAttribute('id')

    await expect(inputField).toHaveAttribute(
      'aria-describedby',
      `${id}-success`
    )
  })

  test('has correct accessible name with messsage present', async ({
    mount,
    page
  }) => {
    await mount(
      makeWrappedTextInput({
        label: props.label,
        message: { info: props.message.info }
      })
    )

    const inputField = page.getByRole('textbox')

    await expect(inputField).toHaveAccessibleName(props.label)
  })
})

test.describe(
  'States/Variants',
  {
    tag: tags
  },
  () => {
    test('disables the input when disabled attr is true', async ({
      mount,
      page
    }) => {
      await mount(makeWrappedTextInput({ disabled: true, label: props.label }))

      const input = page.getByTestId('wrapped-input')
      const inputField = page.getByRole('textbox')

      await page.keyboard.press('Tab')

      await expect(input).not.toBeFocused()
      await expect(inputField).toBeDisabled()
    })

    test('has readonly when readonly attr is true', async ({ mount, page }) => {
      await mount(makeWrappedTextInput({ label: props.label, readOnly: true }))

      const inputField = page.getByRole('textbox')

      await expect(inputField).toHaveAttribute('readonly')
    })

    test('has aria-readonly when readonly attr is true', async ({
      mount,
      page
    }) => {
      await mount(makeWrappedTextInput({ label: props.label, readOnly: true }))

      const inputField = page.getByRole('textbox')

      await expect(inputField).toHaveAttribute('aria-readonly')
    })
  }
)
