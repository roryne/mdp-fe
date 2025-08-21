import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'
import RightChevronWhite from '@/assets/chevron/right-chevron-white.svg'
import Button from '..'
import { allCases, defaultProps } from './common'
import { TestUtils } from '@/utils'

test.describe(
  'Component/Button',
  {
    tag: ['@component', '@button', '@a11y']
  },
  () => {
    test.describe('a11y', () => {
      test('applies aria-busy when loading', async ({ mount }) => {
        const button = await mount(<Button label="Busy" isLoading />)

        await expect(button).toHaveAttribute('aria-busy', 'true')
      })

      test('does not set aria-busy when not loading', async ({ mount }) => {
        const button = await mount(<Button label="Not Busy" />)

        await expect(button).not.toHaveAttribute('aria-busy', 'true')
      })

      test('uses aria-label as accessible name', async ({ mount, page }) => {
        const ariaLabel = 'Close'

        await mount(
          <Button
            aria-label={ariaLabel}
            iconRight={<img src={RightChevronWhite} width={16} />}
            label={defaultProps.label}
          />
        )

        const button = page.getByRole('button', { name: ariaLabel })

        await expect(button).toBeVisible()
      })

      test('aria-hidden buttons are not in accessibility tree', async ({
        mount,
        page
      }) => {
        await mount(<Button label={defaultProps.label} aria-hidden="true" />)

        await expect(
          page.getByRole('button', { name: defaultProps.label })
        ).toHaveCount(0)
      })

      test('loading button exposes busy state', async ({ mount, page }) => {
        await mount(<Button label={defaultProps.label} isLoading />)

        const button = page.getByRole('button', { name: defaultProps.label })
        await expect(button).toHaveAttribute('aria-busy', 'true')
      })

      test(
        'button remains visible in high contrast mode',
        { tag: ['@visual'] },
        async ({ mount, page }) => {
          await mount(<Button label={defaultProps.label} />)
          await page.emulateMedia({ contrast: 'more' })

          const button = page.getByRole('button', { name: defaultProps.label })

          await expect(button).toHaveScreenshot({ animations: 'disabled' })
        }
      )

      for (const props of allCases) {
        const title = TestUtils.getTitleFromCases({
          props,
          ignoredKeys: ['label'],
          keysFromPartialMatch: ['icon'],
          returnKeys: ['disabled', 'isLoading']
        })

        test(`axe (default) - ${title}`, async ({ mount, page }) => {
          await mount(<Button {...props} label={defaultProps.label} />)

          const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa'])
            .analyze()

          // If violations exist, fail the test
          expect(results.violations).toEqual([])
        })
      }

      // Focused state
      for (const props of allCases) {
        const title = TestUtils.getTitleFromCases({
          props,
          ignoredKeys: ['label'],
          keysFromPartialMatch: ['icon'],
          returnKeys: ['disabled', 'isLoading']
        })

        test(`axe (focused) - ${title}`, async ({ mount, page }) => {
          if (props.disabled || props.isLoading) return

          await mount(<Button {...props} label={defaultProps.label} />)
          const button = page.getByRole('button', { name: defaultProps.label })
          await button.focus()

          const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa'])
            .analyze()

          expect(results.violations).toEqual([])
        })
      }

      // Hover state
      for (const props of allCases) {
        const title = TestUtils.getTitleFromCases({
          props,
          ignoredKeys: ['label'],
          keysFromPartialMatch: ['icon'],
          returnKeys: ['disabled', 'isLoading']
        })

        test(`axe (hover) - ${title}`, async ({ mount, page }) => {
          await mount(<Button {...props} label={defaultProps.label} />)
          const button = page.getByRole('button', { name: defaultProps.label })
          await button.hover()

          const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa'])
            .analyze()

          expect(results.violations).toEqual([])
        })
      }
    })
  }
)
