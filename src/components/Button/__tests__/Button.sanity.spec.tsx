import { test, expect } from '@playwright/experimental-ct-react'
import type * as React from 'react'

import { EViewports, getTitleFromCases } from '@/utils/test/pageHelpers'

import Button from '../'
import { allCases, defaultProps } from './common'

test.describe(
  'Component/Button',
  {
    tag: ['@component', '@button', '@sanity']
  },
  () => {
    test.describe('Sanity', () => {
      test.beforeEach(async ({ page }) => {
        await page.addStyleTag({
          content: `
                  * {
                    font-family: Arial, sans-serif !important;
                  }
                `
        })
      })

      // Basic render + console error check across multiple viewports
      for (const vp of EViewports) {
        test(`correctly renders ${vp.name} without errors`, async ({
          mount,
          page
        }) => {
          const messages: string[] = []
          const { height, width } = vp

          // Collect all console messages
          page.on('console', (msg) => messages.push(msg.text()))

          await page.setViewportSize({ height, width })

          await mount(<Button label={defaultProps.label} />)

          const button = page.locator('button')
          await expect(button).toHaveCount(1)

          // Fail test if any console message contains "error"
          expect(
            messages.filter((m) => m.toLowerCase().includes('error'))
          ).toHaveLength(0)
        })
      }

      // Render each prop combination to catch warnings/errors
      for (const props of allCases) {
        const title = getTitleFromCases({
          ignoredKeys: ['label'],
          keysFromPartialMatch: ['icon'],
          props,
          returnKeys: ['disabled', 'isLoading']
        })

        test(`renders ${title} without warnings`, async ({ mount, page }) => {
          const errors: string[] = []

          // Capture console errors/warnings during mount
          page.on('console', (msg) => {
            if (msg.type() === 'error' || msg.type() === 'warning') {
              errors.push(msg.text())
            }
          })

          await mount(<Button {...props} />)
          await page.waitForTimeout(50) // brief delay to catch async logs

          expect(errors).toHaveLength(0)
        })
      }

      // Responsive render + screenshot checks
      for (const vp of EViewports) {
        test(`renders correctly at ${vp.width}x${vp.height}`, async ({
          page,
          mount
        }) => {
          await page.setViewportSize(vp)

          const button = await mount(<Button label="Responsive test" />)

          await expect(button).toBeVisible()
          await expect(button).toHaveScreenshot({ animations: 'disabled' })
        })
      }

      // Stress test: render 500 buttons simultaneously
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

        // Ensure no console errors occurred
        expect(
          messages.filter((m) => m.toLowerCase().includes('error'))
        ).toHaveLength(0)
      })

      // Rapid prop changes to verify stability / no console errors
      test('rapid state changes do not throw errors', async ({
        mount,
        page
      }) => {
        const messages: string[] = []

        page.on('console', (msg) => messages.push(msg.text()))

        // Temporary ref object for button
        const btnRef: React.Ref<HTMLButtonElement> | null = { current: null }

        await mount(
          <Button
            disabled={false}
            isLoading={false}
            label={defaultProps.label}
            ref={btnRef}
          />
        )

        // Simulate rapid toggling of loading/disabled states
        for (let i = 0; i < 50; i++) {
          btnRef.current?.setAttribute('data-loading', `${i % 2 === 0}`)
          btnRef.current?.setAttribute('disabled', `${i % 3 === 0}`)
        }

        expect(
          messages.filter((m) => m.toLowerCase().includes('error'))
        ).toHaveLength(0)
      })
    })
  }
)
