import { expect, test } from '@playwright/experimental-ct-react'

import Button from '..'
import { handleClickSpy, scenarios, spy } from './common'

const text = 'Button'
const tags = ['@component', '@button', '@interactions']

test.use({ viewport: { height: 120, width: 200 } })

test.beforeEach(() => {
  spy.reset()
})

test.describe('Mouse Interactions (Enabled)', { tag: tags }, () => {
  for (const scenario of scenarios.primarySolidRegEnabled) {
    test(`enabled Button onClick fires | ${scenario.title}`, async ({
      mount,
      page
    }) => {
      await mount(
        <Button {...scenario.props} onClick={handleClickSpy} text={text} />
      )

      await page.getByRole('button').click()
      expect(spy.called).toBe(true)
    })

    test(`enabled Button double click fires twice | ${scenario.title}`, async ({
      mount,
      page
    }) => {
      await mount(
        <Button {...scenario.props} onClick={handleClickSpy} text={text} />
      )

      await page
        .getByRole('button')
        .dblclick({ force: Boolean(scenario.props.disabled) })

      expect(spy.callCount).toBe(2)
    })

    test(`dragging off enabled Button does not fire | ${scenario.title}`, async ({
      mount,
      page
    }) => {
      await mount(
        <>
          <Button {...scenario.props} onClick={handleClickSpy} text="1" />
          <Button {...scenario.props} onClick={handleClickSpy} text="2" />
        </>
      )

      await page.locator('button:has-text("1")').hover()
      await page.mouse.down()
      await page.locator('button:has-text("2")').hover()
      await page.mouse.up()

      expect(spy.called).toBe(false)
    })

    test(`does not fire onClick when right click pressed | ${scenario.title}`, async ({
      mount,
      page
    }) => {
      await mount(
        <Button {...scenario.props} onClick={handleClickSpy} text={text} />
      )

      await page
        .getByRole('button')
        .click({ button: 'right', force: Boolean(scenario.props.disabled) })

      expect(spy.called).toBe(false)
    })

    test(`does not fire onClick when middle click pressed | ${scenario.title}`, async ({
      mount,
      page
    }) => {
      await mount(
        <Button {...scenario.props} onClick={handleClickSpy} text={text} />
      )

      await page
        .getByRole('button')
        .click({ button: 'middle', force: Boolean(scenario.props.disabled) })

      expect(spy.called).toBe(false)
    })

    test(`mouse click has no focus ring | ${scenario.title}`, async ({
      mount,
      page
    }) => {
      await mount(
        <Button {...scenario.props} onClick={handleClickSpy} text={text} />
      )

      const button = page.getByRole('button')

      await button.click({ force: Boolean(scenario.props.disabled) })
      await expect(button).toHaveCSS('outline', 'rgb(255, 255, 255) none 0px')
    })
  }
})

test.describe('Mouse Interactions (Disabled)', { tag: tags }, () => {
  for (const scenario of scenarios.primarySolidRegIconsDisabled) {
    test(`disabled Button onClick does not fire | ${scenario.title}`, async ({
      mount,
      page
    }) => {
      await mount(
        <Button {...scenario.props} onClick={handleClickSpy} text={text} />
      )

      const button = page.getByRole('button')

      await button.click({ force: true })
      expect(spy.called).toBe(false)
    })

    test(`disabled icon onClick does not bubble | ${scenario.title}`, async ({
      mount,
      page
    }) => {
      await mount(
        <Button {...scenario.props} onClick={handleClickSpy} text={text} />
      )

      const iconLeft = page.getByTestId('icon-left')
      const iconRight = page.getByTestId('icon-right')

      if (scenario.props.iconLeft) {
        await iconLeft.click({ force: true })
      }
      if (scenario.props.iconRight) {
        await iconRight.click({ force: true })
      }

      expect(spy.callCount).toBe(0)
    })
  }
})

test.describe('Mouse Interactions (Loading)', { tag: tags }, () => {
  for (const scenario of scenarios.primarySolidRegLoading) {
    test(`loading Button onClick does not fire | ${scenario.title}`, async ({
      mount,
      page
    }) => {
      await mount(
        <Button {...scenario.props} onClick={handleClickSpy} text={text} />
      )

      await page.getByRole('button').click({ force: true })
      expect(spy.called).toBe(false)
    })
  }
})

test.describe('Mouse Interactions (Icon + Enabled)', { tag: tags }, () => {
  for (const scenario of scenarios.primarySolidRegIconsEnabled) {
    test(`enabled icon onClick bubbles | ${scenario.title}`, async ({
      mount,
      page
    }) => {
      await mount(
        <Button {...scenario.props} onClick={handleClickSpy} text={text} />
      )

      const iconLeft = page.getByTestId('icon-left')
      const iconRight = page.getByTestId('icon-right')

      if (scenario.props.iconLeft) {
        await iconLeft.click()
      }
      if (scenario.props.iconRight) {
        await iconRight.click()
      }

      expect(spy.callCount).toBeGreaterThan(0)
    })
  }
})
