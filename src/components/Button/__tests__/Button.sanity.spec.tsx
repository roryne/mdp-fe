import { test, expect } from '@playwright/experimental-ct-react'
import { TestUtils } from '@/utils'
import Button from '../'
import { allCases, defaultProps, viewports } from './common'

const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <div data-mock-theme>{children}</div>
)

test.describe(
  'Component/Button',
  {
    tag: ['@component', '@button', '@sanity']
  },
  () => {
    test.describe('Sanity', () => {
      for (const vp of viewports) {
        test(`correctly renders ${vp.name} without errors`, async ({
          mount,
          page
        }) => {
          const messages: string[] = []
          const { height, width } = vp

          page.on('console', (msg) => messages.push(msg.text()))

          await page.setViewportSize({ width, height })

          await mount(<Button label={defaultProps.label} />)

          const button = page.locator('button')
          await expect(button).toHaveCount(1)

          expect(
            messages.filter((m) => m.toLowerCase().includes('error'))
          ).toHaveLength(0)
        })
      }

      for (const props of allCases) {
        const title = TestUtils.getTitleFromCases({
          props,
          ignoredKeys: ['label'],
          keysFromPartialMatch: ['icon'],
          returnKeys: ['disabled', 'isLoading']
        })

        test(`renders ${title} without warnings`, async ({ mount, page }) => {
          const errors: string[] = []

          // Listen for console messages
          page.on('console', (msg) => {
            if (msg.type() === 'error' || msg.type() === 'warning') {
              errors.push(msg.text())
            }
          })

          await mount(<Button {...props} />)
          await page.waitForTimeout(50)

          expect(errors).toHaveLength(0)
        })
      }

      for (const vp of viewports) {
        test(`renders correctly at ${vp.width}x${vp.height}`, async ({
          page,
          mount
        }) => {
          await page.setViewportSize(vp)

          const button = await mount(<Button label="Responsive test" />)

          // At minimum: should be visible, not clipped, not overflowing
          await expect(button).toBeVisible()
          await expect(button).toHaveScreenshot()
        })
      }

      test('renders a large number of buttons without console errors', async ({
        mount,
        page
      }) => {
        const messages: string[] = []
        page.on('console', (msg) => messages.push(msg.text()))

        const buttons = Array.from({ length: 500 }, (_, i) => (
          <Button key={i} label={`Button ${i}`} />
        ))
        await mount(<div>{buttons}</div>)

        const count = await page.locator('button').count()
        expect(count).toBe(500)

        expect(
          messages.filter((m) => m.toLowerCase().includes('error'))
        ).toHaveLength(0)
      })

      test('rapid state changes do not throw errors', async ({
        mount,
        page
      }) => {
        const messages: string[] = []

        page.on('console', (msg) => messages.push(msg.text()))

        const btnRef: React.Ref<HTMLButtonElement> | null = { current: null }

        await mount(
          <Button
            ref={btnRef}
            label={defaultProps.label}
            isLoading={false}
            disabled={false}
          />
        )

        if (btnRef === null) throw new Error('Button ref not accessible')

        for (let i = 0; i < 50; i++) {
          btnRef.current?.setAttribute('data-loading', `${i % 2 === 0}`)
          btnRef.current?.setAttribute('disabled', `${i % 3 === 0}`)
        }

        expect(
          messages.filter((m) => m.toLowerCase().includes('error'))
        ).toHaveLength(0)
      })

      test.describe('Theme support', { tag: ['@theme'] }, () => {
        // When theming is implemented, expand this matrix
        const themes = ['light', 'dark'] // extend with highContrast, custom, etc.

        for (const theme of themes) {
          test.skip(`renders correctly in ${theme} theme`, async ({
            mount
          }) => {
            // TODO: Replace with real theme provider once implemented
            const button = await mount(
              <ThemeProvider>
                <Button label="Theme test" />
              </ThemeProvider>
            )

            await expect(button).toBeVisible()
            await expect(button).toHaveScreenshot(`button-${theme}.png`)
          })
        }
      })
    })
  }
)
