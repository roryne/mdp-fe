import { expect, test } from '@playwright/experimental-ct-react'

import { assertAxeScan } from '@/utils/test/axe'

import Button from '..'
import { handleClickSpy, scenarios, spy } from './common'

const text = 'Button'
const tags = ['@component', '@button', '@a11y']

test.use({ viewport: { height: 120, width: 200 } })

test.beforeEach(() => {
  spy.reset()
})

test.describe('ARIA snapshots', { tag: [...tags, '@aria'] }, () => {
  for (const scenario of scenarios.all) {
    test(`aria ${scenario.title}`, async ({ mount, page }) => {
      const disabledTag = scenario.props.disabled ? '[disabled]' : ''

      await mount(
        <main>
          <h1>Button</h1>
          <section style={{ padding: '1rem 2rem' }}>
            <Button {...scenario.props} text={text} />
          </section>
        </main>
      )

      await expect(page.getByRole('button')).toMatchAriaSnapshot(`
          - button "${text}" ${disabledTag}
        `)
    })
  }
})

test.describe('Axe', { tag: [...tags, '@axe'] }, () => {
  for (const scenario of scenarios.all) {
    test(`axe ${scenario.title}`, async ({ mount, page }) => {
      await mount(
        <main>
          <h1>Button</h1>
          <section style={{ padding: '1rem 2rem' }}>
            <Button {...scenario.props} text={text} />
          </section>
        </main>
      )

      await assertAxeScan(page)
    })

    test(`axe (focus) ${scenario.title}`, async ({ mount, page }) => {
      await mount(
        <main>
          <h1>Button</h1>
          <section style={{ padding: '1rem 2rem' }}>
            <Button {...scenario.props} text={text} />
          </section>
        </main>
      )

      await page.getByRole('button').focus()
      await assertAxeScan(page)
    })

    test(`axe (hover) ${scenario.title}`, async ({ mount, page }) => {
      await mount(
        <main>
          <h1>Button</h1>
          <section style={{ padding: '1rem 2rem' }}>
            <Button {...scenario.props} text={text} />
          </section>
        </main>
      )

      await page
        .getByRole('button')
        .hover({ force: Boolean(scenario.props.disabled) })
      await assertAxeScan(page)
    })
  }
})

test.describe('Keyboard', { tag: tags }, () => {
  test('focuses via Tab when enabled', async ({ mount, page }) => {
    await mount(<Button text={text} />)

    const button = page.getByRole('button')

    await page.keyboard.press('Tab')
    await expect(button).toBeFocused()
  })

  test('skips disabled button when tabbing', async ({ mount, page }) => {
    await mount(
      <>
        <Button disabled text="Disabled" />
        <Button text="Last" />
      </>
    )

    const disabled = page.getByRole('button', { name: 'Disabled' })
    const last = page.getByRole('button', { name: 'Last' })

    await page.keyboard.press('Tab')

    await expect(disabled).not.toBeFocused()
    await expect(last).toBeFocused()
  })

  test('activates on Enter', async ({ mount, page }) => {
    await mount(<Button onClick={handleClickSpy} text={text} />)

    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')

    expect(spy.callCount).toBe(1)
  })

  test('activates on Space', async ({ mount, page }) => {
    await mount(<Button onClick={handleClickSpy} text={text} />)

    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')

    expect(spy.callCount).toBe(1)
  })
})

test('has accessible name when text is visible', async ({ mount, page }) => {
  await mount(<Button text={text} />)

  await expect(page.getByRole('button')).toHaveAccessibleName(text)
})

test('has accessible name when text is hidden', async ({ mount, page }) => {
  await mount(<Button isLoading={true} text={text} />)

  await expect(page.getByRole('button')).toHaveAccessibleName(text)
})
