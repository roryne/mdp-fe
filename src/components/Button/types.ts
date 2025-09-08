import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  Ref
} from 'react'

import { EButton } from './enums'
import type { TDecorativeIcon, TIconTheme } from '../Icon/types'

export type TButtonCustomProps = {
  label: string
  disabled?: boolean | undefined
  fill?: 'outlined' | 'solid'
  iconLeft?:
    | ReactElement<HTMLSpanElement, 'span'> // for testing
    | ReactElement<TDecorativeIcon>
    | undefined
  iconRight?:
    | ReactElement<HTMLSpanElement, 'span'> // for testing
    | ReactElement<TDecorativeIcon>
    | undefined
  isLoading?: boolean
  palette?: (typeof EButton.Palette)[keyof typeof EButton.Palette]
  ref?: Ref<HTMLButtonElement> | undefined
  size?: (typeof EButton.Size)[keyof typeof EButton.Size]
  theme?: TIconTheme
}

export type TButtonProps = ButtonHTMLAttributes<
  Omit<HTMLButtonElement, 'style'>
> &
  TButtonCustomProps

export type TButtonSpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  shouldShow: boolean
}
