import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

import RightChevronWhite from '@/assets/chevron/right-chevron-white.svg'
import { getTitleFromCases } from '@/utils/test/pageHelpers'

import Button from '..'
import { allCases, defaultProps } from './common'

test.describe(
  'Component/Button',
  {
    tag: ['@component', '@button', '@a11y']
  },
  () => {
    test.describe('a11y', () => {
      test('applies aria-busy when loading', async ({ mount }) => {
        const button = await mount(<Button isLoading label="Busy" />)

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
            iconRight={
              <img alt="Right chevron" src={RightChevronWhite} width={16} />
            }
            label={defaultProps.label}
          />
        )

        const button = page.getByRole('button', { name: ariaLabel })

        await expect(button).toHaveText(defaultProps.label)
      })

      test('aria-hidden buttons are not in accessibility tree', async ({
        mount,
        page
      }) => {
        await mount(<Button aria-hidden="true" label={defaultProps.label} />)

        // aria-hidden should fully remove the element from the a11y tree,
        // so role query must return nothing
        await expect(
          page.getByRole('button', { name: defaultProps.label })
        ).toHaveCount(0)
      })

      test('loading button exposes busy state', async ({ mount, page }) => {
        await mount(<Button isLoading label={defaultProps.label} />)

        const button = page.getByRole('button', { name: defaultProps.label })
        await expect(button).toHaveAttribute('aria-busy', 'true')
      })

      test(
        'button remains visible in high contrast mode',
        { tag: ['@visual'] },
        async ({ mount, page }) => {
          await mount(<Button label={defaultProps.label} />)

          // Forces Windows "high contrast" media feature
          await page.emulateMedia({ contrast: 'more' })

          const button = page.getByRole('button', { name: defaultProps.label })

          await expect(button).toHaveScreenshot({ animations: 'disabled' })
        }
      )

      // Run axe-core a11y checks across all prop combinations
      for (const props of allCases) {
        const title = getTitleFromCases({
          ignoredKeys: ['label'],
          keysFromPartialMatch: ['icon'],
          props,
          returnKeys: ['disabled', 'isLoading']
        })

        test(`axe (default) - ${title}`, async ({ mount, page }) => {
          await mount(<Button {...props} label={defaultProps.label} />)

          // Restrict to WCAG 2 A/AA rules only
          const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa'])
            .analyze()

          expect(results.violations).toEqual([])
        })
      }

      // Same axe checks, but after focusing the button
      for (const props of allCases) {
        const title = getTitleFromCases({
          ignoredKeys: ['label'],
          keysFromPartialMatch: ['icon'],
          props,
          returnKeys: ['disabled', 'isLoading']
        })

        test(`axe (focused) - ${title}`, async ({ mount, page }) => {
          // Disabled/loading buttons cannot receive focus → skip them
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

      // Same axe checks, but after hovering the button
      for (const props of allCases) {
        const title = getTitleFromCases({
          ignoredKeys: ['label'],
          keysFromPartialMatch: ['icon'],
          props,
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
