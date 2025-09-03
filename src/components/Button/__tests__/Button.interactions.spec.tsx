import { test, expect } from '@playwright/experimental-ct-react'

import { isWindowLoading, setupLoadingTimer } from '@/utils/test/pageHelpers'
import { Spy } from '@/utils/test/spy'

import Button from '..'
import { defaultProps } from './common'

const spy = new Spy()
const handleOnClickSpy = spy.fn

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

test.describe(
  'Component/Button',
  {
    tag: ['@component', '@button', '@interaction']
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
            const button = await mount(
              <Button label={defaultProps.label} onClick={handleOnClickSpy} />
            )

            await button.click()
            expect(spy.called).toBe(true)
          })

          test('fires onClick when activated by Enter/Space via keyboard', async ({
            mount
          }) => {
            const button = await mount(
              <Button label={defaultProps.label} onClick={handleOnClickSpy} />
            )

            await button.focus()
            await button.press('Enter')

            expect(spy.callCount).toBe(1)

            await button.focus()
            await button.press(' ')

            expect(spy.callCount).toBe(2)
          })

          test('focuses/blurs via keyboard tab navigation', async ({
            mount,
            page
          }) => {
            const button = await mount(<Button label={defaultProps.label} />)

            await expect(button).not.toBeFocused()

            // First Tab → should move focus to button
            await page.keyboard.press('Tab')
            await expect(button).toBeFocused()

            // Second Tab → should move focus away from button
            await page.keyboard.press('Tab')
            await expect(button).not.toBeFocused()
          })

          test('loses focuses when entering loading state', async ({
            mount
          }) => {
            const button = await mount(<Button label={defaultProps.label} />)

            await button.focus()
            await button.press('Enter')

            // Updating component props simulates transition to loading
            await button.update(
              <Button isLoading={true} label={defaultProps.label} />
            )

            // Button should drop focus once it becomes loading
            await expect(button).not.toBeFocused()
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
            const button = await mount(
              <Button
                disabled
                label={defaultProps.label}
                onClick={handleOnClickSpy}
              />
            )

            await expect(button).toBeDisabled()

            // `force: true` bypasses Playwright’s default disabled check;
            // verifies our component itself blocks the click
            await button.click({ force: true })

            expect(spy.called).toBe(false)
          })

          test('does not fire onClick when loading and clicked', async ({
            mount,
            page
          }) => {
            let isLoading = true

            // Mock out time in browser context (deterministic async)
            await page.clock.install({ time: 0 })

            // Set up a page-side variable that flips after timeout
            await setupLoadingTimer(page)

            // Initial mount: isLoading = true
            const button = await mount(
              <Button
                isLoading={isLoading}
                label={defaultProps.label}
                onClick={handleOnClickSpy}
              />
            )

            await expect(button).toBeDisabled()

            // Click forced while disabled → should not fire
            await button.click({ force: true })
            expect(spy.called).toBe(false)

            // Advance time: still loading after 500ms
            await page.clock.runFor(500)
            isLoading = await isWindowLoading(page)

            await button.update(
              <Button isLoading={isLoading} label={defaultProps.label} />
            )
            await expect(button).toBeDisabled()

            // Advance time until timeout → loading ends
            await page.clock.runFor(1000)
            isLoading = await isWindowLoading(page)

            // Re-render with updated state (now enabled)
            await button.update(
              <Button isLoading={isLoading} label={defaultProps.label} />
            )

            // Button should now be enabled; subsequent clicks fire
            await expect(button).not.toBeDisabled()
          })

          test('does not focus via keyboard when disabled', async ({
            mount,
            page
          }) => {
            const button = await mount(
              <Button disabled={true} label={defaultProps.label} />
            )

            await page.keyboard.press('Tab')
            await expect(button).not.toBeFocused()

            // Explicit .focus() call is ignored when disabled
            await button.focus()
            await expect(button).not.toBeFocused()
          })

          test('does not focus via keyboard when loading', async ({
            mount,
            page
          }) => {
            const button = await mount(
              <Button isLoading={true} label={defaultProps.label} />
            )

            await page.keyboard.press('Tab')
            await expect(button).not.toBeFocused()

            // Explicit .focus() call is ignored when loading
            await button.focus()
            await expect(button).not.toBeFocused()
          })
        }
      )
    })
  }
)
