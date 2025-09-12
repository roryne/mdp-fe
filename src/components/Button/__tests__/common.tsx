/* eslint-disable sort-keys */
import { getColorVar } from '@/components/Icon/common'
import { ETheme } from '@/theme/enums'
import { cartesianProductWithProps } from '@/utils/test/scenarios'
import { Spy } from '@/utils/test/spy'

import type { TButtonProps } from '../types'

type TTestButtonProps = Partial<TButtonProps>
type TTestButtonScenarioProps = Readonly<{
  meta: string
}> &
  TTestButtonProps

export const spy = new Spy()
export const handleClickSpy = spy.fn

const iconTheme = {
  default: getColorVar('bw-900'),
  focus: getColorVar('bw-1000'),
  hover: getColorVar('bw-900')
}

export const defaultProps = {
  disabled: false,
  iconLeft: undefined,
  iconRight: undefined,
  isLoading: false,
  onClick: handleClickSpy,
  palette: ETheme.Palette.Primary,
  size: ETheme.Size.Component.Regular,
  spy,
  theme: iconTheme
} satisfies TTestButtonProps & { spy: Spy }

const fillVariants = [
  { meta: 'solid', fill: 'solid' },
  { meta: 'outlined', fill: 'outlined' }
] satisfies TTestButtonScenarioProps[]

const iconVariants = [
  {
    meta: 'icon-none',
    iconLeft: undefined,
    iconRight: undefined
  },
  {
    meta: 'icon-left',
    iconLeft: <span data-testid="icon-left">Left</span>,
    iconRight: undefined
  },
  {
    meta: 'icon-right',
    iconLeft: undefined,
    iconRight: <span data-testid="icon-right">Right</span>
  },
  {
    meta: 'icon-both',
    iconLeft: <span data-testid="icon-left">Left</span>,
    iconRight: <span data-testid="icon-right">Right</span>
  }
] satisfies TTestButtonScenarioProps[]

const paletteVariants = [
  { meta: 'primary', palette: ETheme.Palette.Primary },
  { meta: 'warning', palette: ETheme.Palette.Warning }
] satisfies TTestButtonScenarioProps[]

const sizeVariants = [
  { meta: 'compact', size: ETheme.Size.Component.Compact },
  { meta: 'regular', size: ETheme.Size.Component.Regular }
] satisfies TTestButtonScenarioProps[]

const stateVariants = [
  {
    meta: 'enabled-no-loading',
    disabled: false,
    isLoading: false
  },
  {
    meta: 'disabled-no-loading',
    disabled: true,
    isLoading: false
  },
  {
    meta: 'disabled-loading',
    disabled: true,
    isLoading: true
  }
] satisfies TTestButtonScenarioProps[]

const allScenarios = cartesianProductWithProps<TTestButtonScenarioProps>([
  fillVariants,
  iconVariants,
  paletteVariants,
  sizeVariants,
  stateVariants
])

const primarySolidRegOnlyScenarios: {
  props: Partial<TTestButtonScenarioProps>
  title: string
}[] = allScenarios.filter(
  ({ props: { fill, palette, size } }) =>
    palette === 'primary' && fill === 'solid' && size === 'rg'
)

const primarySolidRegIconsOnlyScenarios: {
  props: Partial<TTestButtonScenarioProps>
  title: string
}[] = primarySolidRegOnlyScenarios.filter(
  ({ props: { iconLeft, iconRight } }) =>
    Boolean(iconLeft) || Boolean(iconRight)
)

export const scenarios = {
  all: allScenarios,
  primarySolidReg: primarySolidRegOnlyScenarios,
  primarySolidRegEnabled: primarySolidRegOnlyScenarios.filter(
    ({ props: { disabled } }) => !disabled
  ),
  primarySolidRegLoading: primarySolidRegOnlyScenarios.filter(
    ({ props: { disabled, isLoading } }) =>
      Boolean(disabled) && Boolean(isLoading)
  ),
  primarySolidRegIcons: primarySolidRegIconsOnlyScenarios,
  primarySolidRegIconsDisabled: primarySolidRegIconsOnlyScenarios.filter(
    ({ props: { disabled, isLoading } }) => Boolean(disabled) && !isLoading
  ),
  primarySolidRegIconsEnabled: primarySolidRegIconsOnlyScenarios.filter(
    ({ props: { disabled } }) => !disabled
  )
} as const
