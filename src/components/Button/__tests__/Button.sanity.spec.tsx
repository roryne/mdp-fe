import { expect, test } from '@playwright/experimental-ct-react'

import { stripClasses } from '@/utils/html'

import Button from '..'
import { scenarios } from './common'

const text = 'Button'
const tags = ['@component', '@button', '@sanity']

test.use({ viewport: { height: 120, width: 200 } })

test.describe('Sanity', { tag: [...tags] }, () => {
  for (const scenario of scenarios.all) {
    test(`mounts | ${scenario.title}`, async ({ mount, page }) => {
      await mount(<Button {...scenario.props} text={text} />)

      await expect(page.getByRole('button')).toBeAttached()
      await expect(page.getByRole('button')).toBeVisible()
    })

    test(`DOM snapshot | ${scenario.title}`, async ({ mount }) => {
      const button = await mount(<Button {...scenario.props} text={text} />)
      const domSnapshot = await button.evaluate(stripClasses)

      expect(domSnapshot).toMatchSnapshot(`button-dom-${scenario.title}.html`)
    })
  }
})
