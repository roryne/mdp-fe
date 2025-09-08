/* eslint-disable sort-keys */
import { getColorVar } from '@/components/Icon/common'
import { cartesianProductWithProps } from '@/utils/test/scenarios'
import { Spy } from '@/utils/test/spy'

import { EButton } from '../enums'
import type { TButtonProps } from '../types'

type TTestButtonProps = Partial<Omit<TButtonProps, 'label'>>
type TTestButtonScenarioProps = Readonly<{
  meta: string
}> &
  TTestButtonProps

const spy = new Spy()
const handleClickSpy = spy.fn

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
  palette: EButton.Palette.Primary,
  size: EButton.Size.Medium,
  spy,
  theme: iconTheme
} satisfies TTestButtonProps & { spy: Spy }

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
  { meta: 'primary', palette: EButton.Palette.Primary },
  { meta: 'warning', palette: EButton.Palette.Warning }
] satisfies TTestButtonScenarioProps[]

const sizeVariants = [
  { meta: 'large', size: EButton.Size.Large },
  { meta: 'medium', size: EButton.Size.Medium },
  { meta: 'small', size: EButton.Size.Small }
] satisfies TTestButtonScenarioProps[]

const stateVariants = [
  {
    meta: 'enabled-no-loading',
    disabled: false,
    isLoading: false
  },
  {
    meta: 'enabled-loading',
    disabled: false,
    isLoading: true
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

const primaryScenarios = cartesianProductWithProps<TTestButtonScenarioProps>([
  iconVariants,
  paletteVariants,
  sizeVariants,
  stateVariants
])

export const scenarios = {
  primary: primaryScenarios
} as const
