import { test, expect } from '@playwright/experimental-ct-react'
import { TestUtils } from '@/utils'
import Button from '..'
import { defaultProps } from './common'

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

            // `force: true` bypasses Playwright’s default disabled check;
            // verifies our component itself blocks the click
            await button.click({ force: true })

            expect(clicked).toBe(false)
          })

          test('does not fire onClick when loading and clicked', async ({
            mount,
            page
          }) => {
            let clicked = false
            let isLoading = true

            // Mock out time in browser context (deterministic async)
            await page.clock.install({ time: 0 })

            // Set up a page-side variable that flips after timeout
            await TestUtils.setupLoadingTimer(page)

            // Initial mount: isLoading = true
            const button = await mount(
              <Button
                isLoading={isLoading}
                label={defaultProps.label}
                onClick={() => (clicked = true)}
              />
            )

            await expect(button).toBeDisabled()

            // Click forced while disabled → should not fire
            await button.click({ force: true })
            expect(clicked).toBe(false)

            // Advance time: still loading after 500ms
            await page.clock.runFor(500)
            isLoading = await TestUtils.getIsLoading(page)
            await button.update(
              <Button isLoading={isLoading} label={defaultProps.label} />
            )
            await expect(button).toBeDisabled()

            // Advance time until timeout → loading ends
            await page.clock.runFor(1000)
            isLoading = await TestUtils.getIsLoading(page)

            // Re-render with updated state (now enabled)
            await button.update(
              <Button
                isLoading={isLoading}
                label={defaultProps.label}
                onClick={() => (clicked = true)}
              />
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
