import type * as React from 'react'

import { EButton } from './enums'

export type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  isLoading?: boolean
  size?: (typeof EButton.Size)[keyof typeof EButton.Size]
  label: string
  variant?: (typeof EButton.Variant)[keyof typeof EButton.Variant]
}

export type TButtonIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly icon: React.ReactNode
  readonly isHidden: boolean
}

export type TButtonSpinnerProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly shouldShow: boolean
}

export type TButton = React.ForwardRefExoticComponent<
  React.RefAttributes<HTMLButtonElement> & TButtonProps
> & {
  Icon: React.FC<TButtonIconProps>
  Spinner: React.FC<TButtonSpinnerProps>
}
