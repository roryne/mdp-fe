import { expect, test } from '@playwright/experimental-ct-react'

import { Spy } from '@/utils/test/spy'

import { makeWrappedTextInput, props } from './common'

const spy = new Spy()
const handleOnChangeSpy = spy.fn

test.use({ viewport: { height: 400, width: 400 } })

test.describe(
  'Component/Input.Text',
  { tag: ['@component', '@input.text', '@sanity'] },
  () => {
    test.describe('Sanity', () => {
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

      test.describe('Happy Paths', () => {
        test('renders value prop when passed', async ({ mount, page }) => {
          await mount(
            makeWrappedTextInput({ label: props.label, value: props.value })
          )

          const inputField = page.getByRole('textbox')

          await expect(inputField).toHaveValue(props.value)
        })

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

      test.describe('Label', () => {
        test.describe('Happy Paths', () => {
          test('renders with label and default props', async ({
            mount,
            page
          }) => {
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
      })

      test.describe('Adornments', () => {
        test.describe('Happy Paths', () => {
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
      })

      test.describe('Messages', () => {
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

      test.describe('Visual', () => {
        test('renders filled variant correctly', async ({ mount }) => {
          const component = await mount(
            makeWrappedTextInput({ label: props.label, variant: 'filled' })
          )

          await expect(component).toHaveScreenshot({ animations: 'disabled' })
        })

        test('renders outline variant correctly', async ({ mount }) => {
          const component = await mount(
            makeWrappedTextInput({ label: props.label })
          )

          await expect(component).toHaveScreenshot({ animations: 'disabled' })
        })
      })
    })
  }
)
