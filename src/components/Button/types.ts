import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref
} from 'react'

import type { TTheme } from '@/theme/types'

import type { TDecorativeIcon, TIconTheme } from '../Icon/types'

export type TButtonCustomProps = {
  text: string
  disabled?: boolean | undefined
  fill?: TTheme['fill'] | undefined
  iconLeft?:
    | ReactElement<HTMLSpanElement, 'span'> // for testing
    | ReactElement<TDecorativeIcon>
    | undefined
  iconRight?:
    | ReactElement<HTMLSpanElement, 'span'> // for testing
    | ReactElement<TDecorativeIcon>
    | undefined
  isLoading?: boolean | undefined
  palette?: TTheme['palette'] | undefined
  ref?: Ref<HTMLButtonElement> | undefined
  size?: TTheme['size'] | undefined
  theme?: TIconTheme
}

export type TButtonProps = ButtonHTMLAttributes<
  Omit<HTMLButtonElement, 'style'>
> &
  TButtonCustomProps

export type TButtonIconProps = Readonly<{
  className?: string
  icon: ReactNode
}>

export type TButtonSpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  shouldShow: boolean
}
