import { test, expect } from '@playwright/experimental-ct-react'
import { TestUtils } from '@/utils'
import Button from '..'
import { defaultProps } from './common'

test.describe(
  'Component/Button',
  {
    tag: ['@component', '@button']
  },
  () => {
    test.describe('Interactions', () => {
      test.describe(
        'Happy Paths',
        {
          tag: ['@happy']
        },
        () => {
          test('fires onClick when clicked', async ({ mount }) => {
            let clicked = false
            const button = await mount(
              <Button
                label={defaultProps.label}
                onClick={() => (clicked = true)}
              />
            )

            await button.click()

            expect(clicked).toBe(true)
          })

          test('fires onClick when activated by Enter/Space via keyboard', async ({
            mount
          }) => {
            let clicked = false
            const button = await mount(
              <Button
                label={defaultProps.label}
                onClick={() => (clicked = true)}
              />
            )

            await button.focus()
            await button.press('Enter')

            expect(clicked).toBe(true)

            clicked = false

            await button.focus()
            await button.press(' ')

            expect(clicked).toBe(true)
          })

          test('focuses/blurs via keyboard tab navigation', async ({
            mount,
            page
          }) => {
            const button = await mount(<Button label={defaultProps.label} />)

            await expect(button).not.toBeFocused()

            await page.keyboard.press('Tab')

            await expect(button).toBeFocused()

            await page.keyboard.press('Tab')

            await expect(button).not.toBeFocused()
          })

          test('loses focuses when entering loading state', async ({
            mount
          }) => {
            const button = await mount(<Button label={defaultProps.label} />)

            await button.focus()
            await button.press('Enter')

            await button.update(
              <Button isLoading={true} label={defaultProps.label} />
            )

            expect(button).not.toBeFocused()
          })
        }
      )

      test.describe(
        'Unhappy Paths',
        {
          tag: ['@unhappy']
        },
        () => {
          test('does not fire onClick when disabled and clicked', async ({
            mount
          }) => {
            let clicked = false

            const button = await mount(
              <Button
                disabled
                label={defaultProps.label}
                onClick={() => (clicked = true)}
              />
            )

            await expect(button).toBeDisabled()

            await button.click({ force: true })

            expect(clicked).toBe(false)
          })

          test('does not fire onClick when loading and clicked', async ({
            mount,
            page
          }) => {
            let clicked = false
            let isLoading = true

            // Control timers in the browser context
            await page.clock.install({ time: 0 })

            // Create a page-side mutable flag managed by a page-side timer
            await TestUtils.setupLoadingTimer(page)

            // Initial mount with current page-side value (will be true at t=0)
            const button = await mount(
              <Button
                isLoading={isLoading}
                label={defaultProps.label}
                onClick={() => (clicked = true)}
              />
            )

            await expect(button).toBeDisabled()

            await button.click({ force: true })

            expect(clicked).toBe(false)

            // still loading -> still disabled
            await page.clock.runFor(500)

            isLoading = await TestUtils.getIsLoading(page)

            await button.update(
              <Button isLoading={isLoading} label={defaultProps.label} />
            )

            await expect(button).toBeDisabled()

            // timeout fires -> loading ends
            await page.clock.runFor(1000)

            isLoading = await TestUtils.getIsLoading(page)

            await button.update(
              <Button
                isLoading={isLoading}
                label={defaultProps.label}
                onClick={() => (clicked = true)}
              />
            )

            // Now enabled; click should fire
            await expect(button).not.toBeDisabled()
          })

          test('does not focus via keyboard when disabled or loading', async ({
            mount,
            page
          }) => {
            const button = await mount(
              <Button disabled={true} label={defaultProps.label} />
            )

            await page.keyboard.press('Tab')

            await expect(button).not.toBeFocused()

            await button.focus()

            await expect(button).not.toBeFocused()

            await button.update(
              <Button
                disabled={false}
                isLoading={true}
                label={defaultProps.label}
              />
            )

            await page.keyboard.press('Tab')

            await expect(button).not.toBeFocused()

            await button.focus()

            await expect(button).not.toBeFocused()
          })
        }
      )
    })
  }
)
