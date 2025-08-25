import type * as React from 'react'

import { EButton } from './enums'

export type TButtonBaseProps = {
  disabled?: boolean | undefined
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  isLoading?: boolean
  size?: (typeof EButton.Size)[keyof typeof EButton.Size]
  label: string
  variant?: (typeof EButton.Variant)[keyof typeof EButton.Variant]
}

export type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  TButtonBaseProps

export type TButtonIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  icon: React.ReactNode
  isHidden: boolean
}

export type TButtonSpinnerProps = React.HTMLAttributes<HTMLSpanElement> & {
  shouldShow: boolean
}

export type TButton = React.ForwardRefExoticComponent<
  React.RefAttributes<HTMLButtonElement> & TButtonProps
> & {
  Icon: React.FC<TButtonIconProps>
  Spinner: React.FC<TButtonSpinnerProps>
}

export type TTestTitleProps = {
  props: TButtonBaseProps
  ignoredKeys?: string[]
  // ignoredKeys?: (keyof TButtonBaseProps)[]
  keysFromPartialMatch?: string[]
  // keysFromPartialMatch?: string[]
  returnKeys?: string[]
  // returnKeys?: (keyof TButtonBaseProps)[]
}
